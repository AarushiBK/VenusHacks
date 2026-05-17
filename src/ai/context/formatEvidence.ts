import type { ScoredResult } from "../retrieval/confidence";

/**
 * Formats retrieved chunks as hidden grounding   excerpted, not full PDF dumps.
 */
export function formatEvidenceForCompanion(results: ScoredResult[]): string {
  if (results.length === 0) return "";

  return results
    .slice(0, 5)
    .map((r, i) => {
      const meta = r.chunk.metadata;
      const excerpt = extractTeachingExcerpt(r.chunk.content, 420);
      const relevance =
        r.rerankScore != null
          ? ` (relevance ${r.rerankScore.toFixed(2)})`
          : "";
      return (
        `[Excerpt ${i + 1}] ${meta.source}   ${meta.title}${relevance}\n` +
        `${excerpt}`
      );
    })
    .join("\n\n");
}

function extractTeachingExcerpt(content: string, maxLen: number): string {
  const sentences = content
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 25);

  let out = "";
  for (const s of sentences) {
    if ((out + " " + s).trim().length > maxLen) break;
    out += (out ? " " : "") + s;
  }

  if (!out) return content.slice(0, maxLen).trim();
  return out;
}
