import type { Citation } from "../types";
import type { ScoredResult } from "../retrieval/confidence";

export function resultsToCitations(results: ScoredResult[]): Citation[] {
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

export function formatSourcesFooter(citations: Citation[]): string {
  if (citations.length === 0) return "";
  const names = citations.map((c) => c.source || c.title).filter(Boolean);
  const unique = [...new Set(names)];
  return `\n\nSources:\n${unique.map((s) => `- ${s}`).join("\n")}`;
}
