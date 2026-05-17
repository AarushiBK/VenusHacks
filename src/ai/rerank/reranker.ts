import { RERANK_MIN_SCORE } from "../ragConfig";
import type { IntentClassification } from "../intent/types";
import type { ScoredResult } from "../retrieval/confidence";
import type { SearchResult } from "../vectorSearch";
import { enrichChunkMetadata } from "../retrieval/metadataTags";

const WOMENS_HEALTH_BOOST = /\b(women|female|maternal|pregnancy|gynec|obstet)/i;

/** Heuristic rerank only  no Gemini. */
export async function rerankResults(
  results: SearchResult[],
  userMessage: string,
  retrievalQuery: string,
  classification: IntentClassification
): Promise<ScoredResult[]> {
  const ranked = heuristicRerank(results, userMessage, retrievalQuery, classification);

  return ranked
    .filter((r) => (r.rerankScore ?? 0) >= RERANK_MIN_SCORE * 0.85)
    .sort((a, b) => (b.rerankScore ?? 0) - (a.rerankScore ?? 0))
    .slice(0, 5);
}

function heuristicRerank(
  results: SearchResult[],
  userMessage: string,
  retrievalQuery: string,
  classification: IntentClassification
): ScoredResult[] {
  const terms = [...retrievalQuery, ...classification.symptoms.join(" "), userMessage]
    .join(" ")
    .toLowerCase()
    .split(/\W+/)
    .filter((t) => t.length > 2);

  return results.map((r) => {
    const chunk = enrichChunkMetadata(r.chunk);
    const text = chunk.content.toLowerCase();
    let score = r.score * 0.35;

    let termHits = 0;
    for (const term of terms) {
      if (text.includes(term)) termHits++;
    }
    score += Math.min(termHits / Math.max(terms.length, 1), 1) * 0.35;

    for (const topic of classification.topics) {
      if (chunk.metadata.topics?.includes(topic)) score += 0.08;
    }

    if (WOMENS_HEALTH_BOOST.test(text)) score += 0.06;

    if (classification.intent === "pcos" && /\b(pcos|polycystic|ovarian)\b/i.test(text)) {
      score += 0.2;
    }

    if (
      classification.topics.includes("digestive") &&
      /\b(abdominal|stomach|nausea|gi)\b/i.test(text)
    ) {
      score += 0.15;
    }

    if (
      (classification.topics.includes("dermatology") ||
        /\bhair\b/i.test(userMessage)) &&
      /\b(hair|alopecia|thyroid|iron|hormon|pcos)\b/i.test(text)
    ) {
      score += 0.18;
    }

    if (
      /\b(firearm|gun violence|homicide|tuberculosis)\b/i.test(text) &&
      !/\b(firearm|gun|tuberculosis)\b/i.test(userMessage)
    ) {
      score -= 0.45;
    }

    if (
      /\bhealth equity\b/i.test(text) &&
      !/\b(equity|disparit)\b/i.test(userMessage)
    ) {
      score -= 0.25;
    }

    return {
      chunk,
      score: r.score,
      rerankScore: Math.min(Math.max(score, 0), 1),
    };
  });
}
