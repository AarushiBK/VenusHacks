import type { DocumentChunk } from "./types";
import type { SearchResult } from "./vectorSearch";
import { CHROMA_COLLECTION } from "./ragConfig";
import { cosineSimilarity } from "./embeddings.shared";

const CHROMA_URL =
  process.env.EXPO_PUBLIC_CHROMA_URL ?? "http://localhost:8000";

interface ChromaQueryResponse {
  ids?: string[][];
  documents?: string[][];
  metadatas?: Record<string, string>[][];
  distances?: number[][];
}

/**
 * Query ChromaDB via REST API (v1).
 * Distances are L2; we convert to similarity score: 1 / (1 + distance).
 */
export async function queryChroma(
  queryEmbedding: number[],
  topK: number
): Promise<SearchResult[]> {
  const collectionId = await resolveCollectionId();
  if (!collectionId) return [];

  const res = await fetch(
    `${CHROMA_URL}/api/v1/collections/${collectionId}/query`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query_embeddings: [queryEmbedding],
        n_results: topK,
        include: ["documents", "metadatas", "distances"],
      }),
    }
  );

  if (!res.ok) {
    console.warn(`Chroma query failed: ${res.status}`);
    return [];
  }

  const data = (await res.json()) as ChromaQueryResponse;
  const ids = data.ids?.[0] ?? [];
  const documents = data.documents?.[0] ?? [];
  const metadatas = data.metadatas?.[0] ?? [];
  const distances = data.distances?.[0] ?? [];

  return ids.map((id, i) => {
    const distance = distances[i] ?? 1;
    const score = 1 / (1 + distance);
    const meta = metadatas[i] ?? {};
    return {
      chunk: {
        id,
        content: documents[i] ?? "",
        metadata: {
          source: meta.source ?? "Unknown",
          title: meta.title ?? "Untitled",
          url: meta.url,
          page: meta.page ? Number(meta.page) : undefined,
          trustLevel: (meta.trustLevel as "verified" | "uploaded") ?? "verified",
        },
      },
      score,
    };
  });
}

async function resolveCollectionId(): Promise<string | null> {
  try {
    const res = await fetch(`${CHROMA_URL}/api/v1/collections/${CHROMA_COLLECTION}`);
    if (res.ok) {
      const data = (await res.json()) as { id?: string; name?: string };
      return data.id ?? data.name ?? CHROMA_COLLECTION;
    }

    const listRes = await fetch(`${CHROMA_URL}/api/v1/collections`);
    if (!listRes.ok) return null;
    const list = (await listRes.json()) as { name: string; id: string }[];
    const found = list.find((c) => c.name === CHROMA_COLLECTION);
    return found?.id ?? null;
  } catch {
    return null;
  }
}

/** Upsert used by ingest script via shared helper */
export async function upsertChroma(
  chunks: {
    id: string;
    content: string;
    embedding: number[];
    metadata: DocumentChunk["metadata"];
  }[]
): Promise<void> {
  let collectionId = await resolveCollectionId();

  if (!collectionId) {
    const createRes = await fetch(`${CHROMA_URL}/api/v1/collections`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: CHROMA_COLLECTION,
        metadata: { description: "Hera verified medical knowledge" },
      }),
    });
    if (!createRes.ok) {
      throw new Error(`Failed to create Chroma collection: ${createRes.status}`);
    }
    const created = (await createRes.json()) as { id: string };
    collectionId = created.id;
  }

  const BATCH = 80;
  for (let i = 0; i < chunks.length; i += BATCH) {
    const batch = chunks.slice(i, i + BATCH);
    const res = await fetch(
      `${CHROMA_URL}/api/v1/collections/${collectionId}/add`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ids: batch.map((c) => c.id),
          documents: batch.map((c) => c.content),
          embeddings: batch.map((c) => c.embedding),
          metadatas: batch.map((c) => ({
            source: c.metadata.source,
            title: c.metadata.title,
            url: c.metadata.url ?? "",
            page: c.metadata.page?.toString() ?? "",
            trustLevel: c.metadata.trustLevel,
          })),
        }),
      }
    );

    if (!res.ok) {
      throw new Error(`Chroma upsert failed: ${res.status} ${await res.text()}`);
    }
  }
}

export function scoreLocalResults(
  queryEmbedding: number[],
  chunks: DocumentChunk[]
): SearchResult[] {
  return chunks
    .map((chunk) => ({
      chunk,
      score: cosineSimilarity(
        queryEmbedding,
        chunk.embedding ?? []
      ),
    }))
    .filter((r) => r.chunk.embedding?.length);
}
