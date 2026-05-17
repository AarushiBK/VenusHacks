import type { IntentClassification } from "../intent/types";
import { rewriteRetrievalQuery } from "./queryRewrite";
import { applyMetadataFilter } from "./metadataFilter";
import { meetsRetrievalConfidence, type ScoredResult } from "./confidence";
import { rerankResults } from "../rerank/reranker";
import { vectorSearch } from "../vectorSearch";
import { RETRIEVAL_CANDIDATE_K } from "../ragConfig";

export interface EvidenceRetrievalResult {
  chunks: ScoredResult[];
  hasStrongEvidence: boolean;
  retrievedChunkIds: string[];
}

/**
 * Retrieve and rerank verified evidence — no response generation.
 */
export async function retrieveMedicalEvidence(
  userMessage: string,
  classification: IntentClassification,
  options: { skipWeak?: boolean } = {}
): Promise<EvidenceRetrievalResult> {
  const retrievalQuery = await rewriteRetrievalQuery(userMessage, classification);

  const candidates = await vectorSearch(retrievalQuery, RETRIEVAL_CANDIDATE_K);
  const filtered = applyMetadataFilter(
    candidates,
    classification.intent,
    classification.topics,
    userMessage
  );

  const reranked = await rerankResults(
    filtered,
    userMessage,
    retrievalQuery,
    classification
  );

  const topChunks = reranked.slice(0, 5);
  const retrievedChunkIds = topChunks.map((r) => r.chunk.id);
  const hasStrongEvidence = meetsRetrievalConfidence(reranked);

  console.log(
    "[Hera RAG] evidence retrieval chunks=",
    topChunks.length,
    "strong=",
    hasStrongEvidence,
    "ids=",
    retrievedChunkIds
  );

  if (options.skipWeak && !hasStrongEvidence) {
    return { chunks: [], hasStrongEvidence: false, retrievedChunkIds };
  }

  return {
    chunks: hasStrongEvidence ? topChunks : topChunks.slice(0, 2),
    hasStrongEvidence,
    retrievedChunkIds,
  };
}
