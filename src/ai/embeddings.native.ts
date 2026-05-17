/**
 * Native (iOS/Android): local ONNX via Transformers.js.
 * Not loaded on web (avoids import.meta bundle error).
 */

import {
  pipeline,
  type FeatureExtractionPipeline,
} from "@xenova/transformers";
import {
  LOCAL_EMBEDDING_MODEL,
  EMBEDDING_DIM,
  cosineSimilarity,
} from "./embeddings.shared";

export { LOCAL_EMBEDDING_MODEL, EMBEDDING_DIM, cosineSimilarity };

const MODEL_ID = "Xenova/all-MiniLM-L6-v2";

let extractor: FeatureExtractionPipeline | null = null;

async function getExtractor(): Promise<FeatureExtractionPipeline> {
  if (!extractor) {
    console.log(
      `[Hera Embeddings] Loading LOCAL model: ${MODEL_ID} (native, dim=${EMBEDDING_DIM})`
    );
    extractor = await pipeline("feature-extraction", MODEL_ID, {
      quantized: true,
    });
    console.log("[Hera Embeddings] Native local model ready");
  }
  return extractor;
}

export async function generateEmbeddings(
  texts: string[],
  onProgress?: (done: number, total: number) => void
): Promise<number[][]> {
  if (texts.length === 0) return [];

  const pipe = await getExtractor();
  const results: number[][] = [];

  for (let i = 0; i < texts.length; i++) {
    const output = await pipe(texts[i].slice(0, 512), {
      pooling: "mean",
      normalize: true,
    });
    results.push(Array.from(output.data as Float32Array));
    onProgress?.(i + 1, texts.length);
  }

  if (texts.length === 1) {
    console.log(`[Hera Embeddings] Query embedded locally (${EMBEDDING_DIM}d)`);
  }

  return results;
}
