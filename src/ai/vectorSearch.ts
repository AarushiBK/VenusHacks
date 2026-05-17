import type { DocumentChunk, Citation } from "./types";
import { cosineSimilarity } from "./embeddings.shared";
import {
  RETRIEVAL_TOP_K,
  RETRIEVAL_MIN_SCORE_WEB,
} from "./ragConfig";
import { enrichChunkMetadata } from "./retrieval/metadataTags";
import vectorIndexBundled from "../../data/vector-index.json";

export interface SearchResult {
  chunk: DocumentChunk;
  score: number;
}

let localIndex: DocumentChunk[] = [];
let indexLoaded = false;

export async function ensureVectorIndexLoaded(): Promise<void> {
  if (indexLoaded) return;
  localIndex = loadBundledIndex();
  indexLoaded = true;
}

function loadBundledIndex(): DocumentChunk[] {
  const bundled = vectorIndexBundled as DocumentChunk[];
  if (Array.isArray(bundled) && bundled.length > 0) {
    console.log(`[Hera] Loaded ${bundled.length} chunks from vector-index.json`);
    return bundled;
  }
  console.warn("[Hera] vector-index.json empty — using default knowledge");
  return getDefaultKnowledgeBase();
}

export async function vectorSearch(
  query: string,
  topK = RETRIEVAL_TOP_K,
): Promise<SearchResult[]> {
  await ensureVectorIndexLoaded();
  const hybrid = webHybridSearch(query, localIndex, topK * 2);
  const filtered = filterByThreshold(hybrid, topK);
  if (filtered.length > 0) return filtered;
  return hybrid.sort((a, b) => b.score - a.score).slice(0, topK);
}

function webHybridSearch(
  query: string,
  chunks: DocumentChunk[],
  topK: number,
): SearchResult[] {
  const q = query.toLowerCase();
  const terms = q.split(/\W+/).filter((t) => t.length > 1);
  const medicalBoost = /\b(heart|chest|pain|pregnancy|cardio|blood|period|stomach|pcos|hair|sad|abdominal)\b/.test(
      q,
    )
    ? 0.12
    : 0;

  const keywordScored = chunks.map((chunk) => {
    const enriched = enrichChunkMetadata(chunk);
    const text = enriched.content.toLowerCase();
    let hits = 0;
    for (const term of terms) {
      if (text.includes(term)) hits++;
    }
    if (q.length > 4 && text.includes(q.slice(0, Math.min(q.length, 50)))) {
      hits += 2;
    }
    const denom = Math.max(terms.length + 2, 1);
    return {
      chunk: enriched,
      score: Math.min(hits / denom + medicalBoost, 1),
    };
  });

  const seed = keywordScored
    .filter((r) => r.score > 0.08 && r.chunk.embedding?.length)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12);

  let semantic: SearchResult[] = [];
  if (seed.length > 0) {
    const dim = seed[0].chunk.embedding!.length;
    const centroid = new Array(dim).fill(0);
    for (const { chunk } of seed) {
      const emb = chunk.embedding!;
      for (let i = 0; i < dim; i++) centroid[i] += emb[i];
    }
    for (let i = 0; i < dim; i++) centroid[i] /= seed.length;
    const norm = Math.sqrt(centroid.reduce((s, v) => s + v * v, 0)) || 1;
    const queryVec = centroid.map((v) => v / norm);
    semantic = scoreLocalResults(queryVec, chunks);
  }

  const byId = new Map<string, SearchResult>();
  for (const r of keywordScored) {
    byId.set(r.chunk.id, r);
  }
  for (const r of semantic) {
    const prev = byId.get(r.chunk.id);
    byId.set(r.chunk.id, {
      chunk: r.chunk,
      score: Math.max(prev?.score ?? 0, r.score),
    });
  }

  return Array.from(byId.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

function scoreLocalResults(
  queryEmbedding: number[],
  chunks: DocumentChunk[],
): SearchResult[] {
  return chunks
    .filter((c) => c.embedding?.length)
    .map((chunk) => ({
      chunk,
      score: cosineSimilarity(queryEmbedding, chunk.embedding!),
    }));
}

function filterByThreshold(results: SearchResult[], topK: number): SearchResult[] {
  return results.filter((r) => r.score >= RETRIEVAL_MIN_SCORE_WEB).slice(0, topK);
}

export function meetsRetrievalThreshold(results: SearchResult[]): boolean {
  if (results.length === 0) return false;
  return results[0].score >= RETRIEVAL_MIN_SCORE_WEB;
}

export async function mergeIntoLocalIndex(
  chunks: DocumentChunk[],
): Promise<void> {
  await ensureVectorIndexLoaded();
  const byId = new Map(localIndex.map((c) => [c.id, c]));
  for (const c of chunks) byId.set(c.id, c);
  localIndex = Array.from(byId.values());
}

export function chunksToCitations(results: SearchResult[]): Citation[] {
  const seen = new Set<string>();
  const citations: Citation[] = [];

  for (const { chunk } of results) {
    const key = `${chunk.metadata.source}:${chunk.metadata.title}`;
    if (seen.has(key)) continue;
    seen.add(key);
    citations.push({
      title: chunk.metadata.title,
      source: chunk.metadata.source,
      url: chunk.metadata.url,
      page: chunk.metadata.page,
    });
  }

  return citations;
}

function getDefaultKnowledgeBase(): DocumentChunk[] {
  return [
    {
      id: "cdc-maternal-1",
      content:
        "Cardiovascular disease is a leading cause of pregnancy-related deaths in the United States. Pregnant and postpartum women should monitor blood pressure, report headaches with vision changes, and seek care for chest pain or shortness of breath.",
      metadata: {
        source: "CDC",
        title: "Maternal Heart Health Report 2025",
        url: "https://www.cdc.gov/reproductivehealth/maternalinfanthealth/pregnancy-complications.html",
        trustLevel: "verified",
      },
      embedding: [],
    },
    {
      id: "acog-preeclampsia-1",
      content:
        "Preeclampsia signs include high blood pressure after 20 weeks, severe headache, vision changes, upper abdominal pain, and sudden swelling. It requires prompt medical evaluation.",
      metadata: {
        source: "ACOG",
        title: "Preeclampsia and High Blood Pressure During Pregnancy",
        url: "https://www.acog.org",
        trustLevel: "verified",
      },
      embedding: [],
    },
  ];
}
