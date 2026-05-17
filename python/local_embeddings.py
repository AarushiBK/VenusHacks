# -*- coding: utf-8 -*-
"""Local embeddings via sentence-transformers (all-MiniLM-L6-v2). No Gemini API."""

from __future__ import annotations

import logging
from typing import Callable, List, Optional

from sentence_transformers import SentenceTransformer

logger = logging.getLogger(__name__)

MODEL_NAME = "all-MiniLM-L6-v2"
EMBEDDING_DIM = 384

_model: Optional[SentenceTransformer] = None


def get_model() -> SentenceTransformer:
    global _model
    if _model is None:
        logger.info(
            "[Hera] Loading LOCAL embedding model: %s (no API)",
            MODEL_NAME,
        )
        _model = SentenceTransformer(MODEL_NAME)
        logger.info("[Hera] Local model ready (dim=%s)", EMBEDDING_DIM)
    return _model


def encode_texts(
    texts: List[str],
    batch_size: int = 32,
    on_progress: Optional[Callable[[int, int], None]] = None,
) -> List[List[float]]:
    if not texts:
        return []

    model = get_model()
    logger.info("[Hera] Encoding %s chunk(s) locally", len(texts))

    all_embeddings: List[List[float]] = []
    for start in range(0, len(texts), batch_size):
        batch = texts[start : start + batch_size]
        vectors = model.encode(
            batch,
            batch_size=batch_size,
            show_progress_bar=False,
            normalize_embeddings=True,
        )
        all_embeddings.extend([vec.tolist() for vec in vectors])
        if on_progress:
            on_progress(len(all_embeddings), len(texts))

    logger.info("[Hera] Local encoding complete: %s vectors", len(all_embeddings))
    return all_embeddings
