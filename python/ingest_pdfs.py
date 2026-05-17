#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Ingest PDFs into ChromaDB using LOCAL embeddings only (all-MiniLM-L6-v2)."""

from __future__ import annotations

import json
import logging
import os
import re
import sys
from pathlib import Path

from dotenv import load_dotenv
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(Path(__file__).resolve().parent))

from local_embeddings import MODEL_NAME, encode_texts  # noqa: E402

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
logger = logging.getLogger("vena.ingest")

load_dotenv(ROOT / ".env")

PDF_DIRS = [ROOT / "Data_of_health_heart", ROOT / "data" / "pdfs"]
INDEX_OUT = ROOT / "data" / "vector-index.json"
CHUNK_SIZE = 480
CHUNK_OVERLAP = 80
CHROMA_HOST = (
    os.getenv("CHROMA_URL", "http://localhost:8000")
    .replace("http://", "")
    .replace("https://", "")
)
CHROMA_COLLECTION = os.getenv("EXPO_PUBLIC_CHROMA_COLLECTION", "vena_medical")


def normalize_pdf_key(filename: str) -> str:
    base = re.sub(r"\.pdf$", "", filename, flags=re.I)
    base = re.sub(r"\s*\(\d+\)\s*$", "", base)
    return base.lower()


def collect_pdfs() -> list[Path]:
    seen: set[str] = set()
    files: list[Path] = []
    for directory in PDF_DIRS:
        if not directory.exists():
            continue
        for path in sorted(directory.glob("*.pdf")):
            key = normalize_pdf_key(path.name)
            if key in seen:
                logger.info("(skip duplicate) %s", path.name)
                continue
            seen.add(key)
            files.append(path)
    return files


def extract_text(pdf_path: Path) -> str:
    reader = PdfReader(str(pdf_path))
    parts = [page.extract_text() or "" for page in reader.pages]
    return re.sub(r"\s+", " ", " ".join(parts)).strip()


def chunk_text(text: str, doc_id: str) -> list[dict]:
    chunks = []
    start = 0
    index = 0
    while start < len(text):
        end = min(start + CHUNK_SIZE, len(text))
        content = text[start:end].strip()
        if len(content) > 40:
            chunks.append({"id": f"{doc_id}-chunk-{index}", "content": content})
            index += 1
        start = end - CHUNK_OVERLAP
        if end >= len(text):
            break
    return chunks


TOPIC_RULES: list[tuple[str, str]] = [
    ("pcos", "pcos"),
    ("polycystic", "pcos"),
    ("pregnancy", "pregnancy"),
    ("maternal", "pregnancy"),
    ("postpartum", "pregnancy"),
    ("heart", "cardiovascular"),
    ("cardio", "cardiovascular"),
    ("hypertension", "cardiovascular"),
    ("mental", "mental_health"),
    ("depress", "mental_health"),
    ("anxiety", "mental_health"),
    ("hair", "dermatology"),
    ("thyroid", "hormones"),
    ("hormon", "hormones"),
    ("stomach", "digestive"),
    ("abdominal", "digestive"),
]


def infer_topics(text: str) -> list[str]:
    topics: list[str] = []
    lower = text.lower()
    for needle, tag in TOPIC_RULES:
        if needle in lower and tag not in topics:
            topics.append(tag)
    return topics or ["general"]


def metadata_from_filename(filename: str) -> dict:
    base = re.sub(r"\.pdf$", "", filename, flags=re.I).replace("_", " ")
    upper = base.upper()
    meta: dict = {"title": base, "trustLevel": "uploaded", "topics": infer_topics(base)}
    for src in ["CDC", "NIH", "AHA", "WHO", "ACOG", "PUBMED", "MAYO"]:
        if src in upper:
            meta["source"] = "Mayo Clinic" if src == "MAYO" else src
            meta["topics"] = list(set(meta["topics"] + infer_topics(base)))
            return meta
    if re.search(r"nihms|s41598|PIIS|fcvm|medicina|cureus", filename, re.I):
        meta["source"] = "PubMed"
        return meta
    meta["source"] = "Uploaded"
    return meta


def chunk_metadata(content: str, doc_meta: dict) -> dict:
    topics = list(set((doc_meta.get("topics") or []) + infer_topics(content)))
    return {
        "source": doc_meta["source"],
        "title": doc_meta["title"],
        "trustLevel": doc_meta["trustLevel"],
        "topics": topics,
    }


def main() -> None:
    logger.info("=== Vena PDF ingest (LOCAL embeddings: %s) ===", MODEL_NAME)
    logger.info("Gemini is NOT used for embeddings.")

    pdf_files = collect_pdfs()
    logger.info("Found %s PDF(s)", len(pdf_files))
    if not pdf_files:
        logger.error("No PDFs in Data_of_health_heart/ or data/pdfs/")
        sys.exit(1)

    all_records: list[dict] = []

    for i, pdf_path in enumerate(pdf_files, 1):
        label = f"[{i}/{len(pdf_files)}]"
        logger.info("%s Parsing: %s", label, pdf_path.name)
        try:
            text = extract_text(pdf_path)
            if not text:
                logger.warning("%s No text extracted - skipped", label)
                continue

            doc_id = re.sub(r"[^\w-]+", "_", pdf_path.stem)
            meta = metadata_from_filename(pdf_path.name)
            text_chunks = chunk_text(text, doc_id)
            if not text_chunks:
                logger.warning("%s Too little text - skipped", label)
                continue

            def progress(done: int, total: int) -> None:
                print(f"\r{label}   Local embed {done}/{total}...", end="", flush=True)

            embeddings = encode_texts(
                [c["content"] for c in text_chunks], on_progress=progress
            )
            print()

            for chunk, embedding in zip(text_chunks, embeddings):
                all_records.append(
                    {
                        "id": chunk["id"],
                        "content": chunk["content"],
                        "embedding": embedding,
                        "metadata": chunk_metadata(chunk["content"], meta),
                    }
                )
            logger.info("%s -> %s chunks", label, len(text_chunks))
        except Exception as e:
            logger.error("%s Failed: %s", label, e)

    logger.info("Total chunks: %s", len(all_records))
    if not all_records:
        sys.exit(1)

    try:
        import chromadb

        host = CHROMA_HOST.split(":")[0]
        port = int(CHROMA_HOST.split(":")[1]) if ":" in CHROMA_HOST else 8000
        client = chromadb.HttpClient(host=host, port=port)
        try:
            client.delete_collection(CHROMA_COLLECTION)
            logger.info("Reset Chroma collection: %s", CHROMA_COLLECTION)
        except Exception:
            pass

        collection = client.create_collection(
            name=CHROMA_COLLECTION,
            metadata={"hnsw:space": "cosine", "embedding_model": MODEL_NAME},
        )
        batch_size = 100
        for start in range(0, len(all_records), batch_size):
            batch = all_records[start : start + batch_size]
            collection.add(
                ids=[r["id"] for r in batch],
                documents=[r["content"] for r in batch],
                embeddings=[r["embedding"] for r in batch],
                metadatas=[
                    {
                        "source": r["metadata"]["source"],
                        "title": r["metadata"]["title"],
                        "trustLevel": r["metadata"]["trustLevel"],
                        "topics": ",".join(r["metadata"].get("topics", [])),
                    }
                    for r in batch
                ],
            )
        logger.info("OK ChromaDB: %s:%s collection=%s", host, port, CHROMA_COLLECTION)
    except Exception as e:
        logger.warning("ChromaDB skipped: %s", e)

    INDEX_OUT.parent.mkdir(parents=True, exist_ok=True)
    with open(INDEX_OUT, "w", encoding="utf-8") as f:
        json.dump(all_records, f)
    size_mb = INDEX_OUT.stat().st_size / 1024 / 1024
    logger.info("OK Wrote %s (%.1f MB)", INDEX_OUT, size_mb)
    logger.info("Done. Restart the app: npm start")


if __name__ == "__main__":
    main()
