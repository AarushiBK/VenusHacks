import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { DocumentChunk, Citation } from "./types";
import { generateEmbeddings } from "./embeddings";
import { cosineSimilarity } from "./embeddings.shared";
import { queryChroma, scoreLocalResults } from "./chromaClient";
import {
  RETRIEVAL_TOP_K,
  RETRIEVAL_MIN_SCORE,
  RETRIEVAL_MIN_SCORE_WEB,
} from "./ragConfig";
import { enrichChunkMetadata } from "./retrieval/metadataTags";

export interface SearchResult {
  chunk: DocumentChunk;
  score: number;
}


const VECTOR_INDEX_KEY = "@hera/vector_index";
let localIndex: DocumentChunk[] = [];
let indexLoaded = false;

export async function ensureVectorIndexLoaded(): Promise<void> {
  if (indexLoaded) return;
  try {
    const raw = await AsyncStorage.getItem(VECTOR_INDEX_KEY);
    if (raw) {
      localIndex = JSON.parse(raw) as DocumentChunk[];
    } else {
      localIndex = await loadBundledIndex();
    }
  } catch {
    localIndex = await loadBundledIndex();
  }

  if (Platform.OS !== "web") {
    await bootstrapEmbeddingsIfNeeded();
  }
  indexLoaded = true;
}

async function loadBundledIndex(): Promise<DocumentChunk[]> {
  try {
    const bundled = require("../../data/vector-index.json") as DocumentChunk[];
    if (Array.isArray(bundled) && bundled.length > 0) {
      console.log(
        `[Hera] Loaded ${bundled.length} chunks from vector-index.json`
      );
      return bundled;
    }
  } catch {
    console.warn("[Hera] Run npm run ingest:pdfs to build vector-index.json");
  }
  return getDefaultKnowledgeBase();
}

async function bootstrapEmbeddingsIfNeeded(): Promise<void> {
  const needsEmbed = localIndex.some((c) => !c.embedding?.length);
  if (!needsEmbed) return;
  try {
    const embeddings = await generateEmbeddings(
      localIndex.map((c) => c.content)
    );
    localIndex = localIndex.map((c, i) => ({
      ...c,
      embedding: embeddings[i],
    }));
    await persistLocalIndex();
  } catch {
    // Native model may still be loading
  }
}

export async function persistLocalIndex(): Promise<void> {
  await AsyncStorage.setItem(VECTOR_INDEX_KEY, JSON.stringify(localIndex));
}

export async function vectorSearch(
  query: string,
  topK = RETRIEVAL_TOP_K
): Promise<SearchResult[]> {
  await ensureVectorIndexLoaded();

  if (Platform.OS === "web") {
    console.log("[Hera] Web retrieval: hybrid keyword + precomputed embeddings");
    const hybrid = webHybridSearch(query, localIndex, topK * 2);
    const filtered = filterByThreshold(hybrid, topK, true);
    if (filtered.length > 0) return filtered;
    return hybrid.sort((a, b) => b.score - a.score).slice(0, topK);
  }

  const queryEmbedding = (await generateEmbeddings([query]))[0];

  const chromaResults = await queryChroma(queryEmbedding, topK);
  if (chromaResults.length > 0) {
    return filterByThreshold(chromaResults, topK);
  }

  const localResults = scoreLocalResults(queryEmbedding, localIndex);
  return filterByThreshold(
    localResults.sort((a, b) => b.score - a.score).slice(0, topK),
    topK
  );
}

/**
 * Web-only: avoids Transformers.js. Uses keyword retrieval + cosine vs ingested vectors.
 */
function webHybridSearch(
  query: string,
  chunks: DocumentChunk[],
  topK: number
): SearchResult[] {
  const q = query.toLowerCase();
  const terms = q.split(/\W+/).filter((t) => t.length > 1);
  const medicalBoost = /\b(heart|chest|pain|pregnancy|cardio|blood|period|stomach|pcos|hair|sad|abdominal)\b/.test(q)
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

function filterByThreshold(
  results: SearchResult[],
  topK: number,
  isWeb = false
): SearchResult[] {
  const min = isWeb ? RETRIEVAL_MIN_SCORE_WEB : RETRIEVAL_MIN_SCORE;
  return results.filter((r) => r.score >= min).slice(0, topK);
}

export function meetsRetrievalThreshold(results: SearchResult[]): boolean {
  if (results.length === 0) return false;
  const min =
    Platform.OS === "web" ? RETRIEVAL_MIN_SCORE_WEB : RETRIEVAL_MIN_SCORE;
  return results[0].score >= min;
}

export function setLocalIndex(chunks: DocumentChunk[]): void {
  localIndex = chunks;
  indexLoaded = true;
}

export function getLocalIndex(): DocumentChunk[] {
  return localIndex;
}

export async function mergeIntoLocalIndex(
  chunks: DocumentChunk[]
): Promise<void> {
  await ensureVectorIndexLoaded();
  const byId = new Map(localIndex.map((c) => [c.id, c]));
  for (const c of chunks) byId.set(c.id, c);
  localIndex = Array.from(byId.values());
  await persistLocalIndex();
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
