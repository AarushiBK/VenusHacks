/**
 * Web: no Transformers.js (breaks on import.meta in Expo web bundle).
 * Query embedding is handled in vectorSearch via hybrid keyword + stored vectors.
 */

import { LOCAL_EMBEDDING_MODEL, EMBEDDING_DIM, cosineSimilarity } from "./embeddings.shared";

export { LOCAL_EMBEDDING_MODEL, EMBEDDING_DIM, cosineSimilarity };

export async function generateEmbeddings(
  _texts: string[],
  _onProgress?: (done: number, total: number) => void
): Promise<number[][]> {
  console.log(
    "[Hera Embeddings] Web uses pre-indexed vectors + hybrid search (no Transformers.js)"
  );
  throw new Error(
    "generateEmbeddings is not used on web; vectorSearch uses webHybridSearch"
  );
}
