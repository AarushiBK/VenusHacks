import type { MedicalTopicTag } from "../types";
import type { MedicalIntent } from "../intent/types";
import type { SearchResult } from "../vectorSearch";
import { enrichChunkMetadata, chunkMatchesTopics, isOffTopicForIntent } from "./metadataTags";

export function applyMetadataFilter(
  results: SearchResult[],
  intent: MedicalIntent,
  topics: MedicalTopicTag[],
  userMessage: string
): SearchResult[] {
  const enriched = results.map((r) => ({
    ...r,
    chunk: enrichChunkMetadata(r.chunk),
  }));

  const filtered = enriched.filter((r) => {
    if (isOffTopicForIntent(r.chunk, topics, userMessage)) return false;

    if (intent === "mental_health") return false;

    if (intent === "pcos" || topics.includes("pcos")) {
      const t = r.chunk.metadata.topics ?? [];
      if (t.includes("pcos") || t.includes("hormones")) return true;
      if (/\b(pcos|polycystic|ovarian|androgen|hirsutism|irregular period)\b/i.test(r.chunk.content)) {
        return true;
      }
      return false;
    }

    if (intent === "cardiovascular" || topics.includes("cardiovascular")) {
      const t = r.chunk.metadata.topics ?? [];
      return t.includes("cardiovascular") || t.includes("pregnancy");
    }

    if (topics.length > 0 && !topics.includes("general")) {
      return chunkMatchesTopics(r.chunk, topics) || r.score >= 0.45;
    }

    return true;
  });

  return filtered.length > 0 ? filtered : enriched.slice(0, 5);
}
