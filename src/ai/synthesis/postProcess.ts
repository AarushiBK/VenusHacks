import { NO_CONTEXT_MESSAGE, LOW_CONFIDENCE_MESSAGE, SAFETY_DISCLAIMER } from "../ragConfig";
import type { ScoredResult } from "../retrieval/confidence";

export function isNoContextAnswer(text: string): boolean {
  return (
    text.includes(NO_CONTEXT_MESSAGE) ||
    text.includes(LOW_CONFIDENCE_MESSAGE)
  );
}

export function isIncompleteAnswer(text: string): boolean {
  const t = text.trim();
  if (t.length < 120) return true;
  if (/^Based on verified medical sources,\s*It sounds/i.test(t) && t.length < 280) {
    return true;
  }
  if (/\b(Based on the information|Based on the evidence),?\s*$/i.test(t)) return true;
  if (/\b(Sources|Source):\s*$/im.test(t)) return true;
  if (t.length < 400 && !/[.!?]\s/.test(t.slice(-80))) return true;
  return false;
}

export function chunksMentionQuestion(
  question: string,
  results: ScoredResult[]
): boolean {
  const terms = extractSearchTerms(question);
  if (terms.length === 0) return results.length > 0;

  return results.some((r) => {
    const blob = `${r.chunk.content} ${r.chunk.metadata.title}`.toLowerCase();
    return terms.some((term) => blob.includes(term));
  });
}

function extractSearchTerms(question: string): string[] {
  const q = question.toLowerCase();
  const terms: string[] = [];

  if (/\bpcos\b/i.test(q)) terms.push("pcos", "polycystic");
  if (/\bcardiovascular\b/i.test(q)) terms.push("cardiovascular", "heart disease");
  if (/\bheart\b/i.test(q)) terms.push("heart", "cardiovascular");
  if (/\bpreeclampsia\b/i.test(q)) terms.push("preeclampsia");
  if (/\bpregnan/i.test(q)) terms.push("pregnancy", "pregnant", "maternal");

  q.split(/\W+/)
    .filter((w) => w.length > 4)
    .forEach((w) => {
      if (!terms.includes(w)) terms.push(w);
    });

  return terms.slice(0, 8);
}

/** Remove inline Sources blocks   UI shows citations separately. */
export function stripInlineSources(text: string): string {
  let out = text.trim();
  out = out.replace(/\n+Sources:\s*\n([\s\S]*?)(?=\n\n|$)/gi, "");
  out = out.replace(/\n+Source:\s*[^\n]+/gi, "");
  return out.replace(/\n{3,}/g, "\n\n").trim();
}

export function ensureSingleDisclaimer(text: string): string {
  let out = stripInlineSources(text);
  out = out.replace(new RegExp(SAFETY_DISCLAIMER.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"), "");
  return `${out.trim()}\n\n${SAFETY_DISCLAIMER}`;
}

export function buildNoContextOnlyAnswer(): string {
  return `${NO_CONTEXT_MESSAGE}\n\n${SAFETY_DISCLAIMER}`;
}
