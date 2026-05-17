import {
  CONFIDENCE_MIN_TOP_SCORE,
  RETRIEVAL_MIN_SCORE_WEB,
} from "../ragConfig";
import type { SearchResult } from "../vectorSearch";

export interface ScoredResult extends SearchResult {
  rerankScore?: number;
}

export function meetsRetrievalConfidence(results: ScoredResult[]): boolean {
  if (results.length === 0) return false;

  const top = results[0];
  const rerank = top.rerankScore ?? 0;
  const retrieval = top.score;

  if (rerank >= CONFIDENCE_MIN_TOP_SCORE) return true;

  return retrieval >= RETRIEVAL_MIN_SCORE_WEB && rerank >= 0.45;
}

export function getTopConfidenceScore(results: ScoredResult[]): number {
  if (results.length === 0) return 0;
  const top = results[0];
  return Math.max(top.rerankScore ?? 0, top.score);
}
