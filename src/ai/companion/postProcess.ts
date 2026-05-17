import { COMPANION_DISCLAIMER, SAFETY_DISCLAIMER } from "../ragConfig";

const ROBOTIC_OPENERS = [
  /^Based on verified medical sources,?\s*/i,
  /^Based on the (information|evidence),?\s*/i,
  /^From your verified medical library,?\s*/i,
  /^According to verified medical sources,?\s*/i,
];

const INLINE_SOURCE_BLOCKS =
  /\n+(Sources?|References?):\s*\n([\s\S]*?)(?=\n\n[A-Z]|$)/gi;

export function polishCompanionResponse(text: string): string {
  let out = text.trim();

  for (const pattern of ROBOTIC_OPENERS) {
    out = out.replace(pattern, "");
  }

  out = out.replace(INLINE_SOURCE_BLOCKS, "");
  out = out.replace(/\n+Source:\s*[^\n]+/gi, "");
  out = out.replace(/\n{3,}/g, "\n\n").trim();

  out = ensureCompanionDisclaimer(out);
  return out;
}

export function isIncompleteCompanionAnswer(text: string): boolean {
  const t = text.trim();
  if (t.length < 100) return true;
  if (/\b(Based on the information|Based on the evidence),?\s*$/i.test(t)) {
    return true;
  }
  if (t.length < 350 && !/[.!?]["']?\s*$/.test(t)) return true;
  return false;
}

function ensureCompanionDisclaimer(text: string): string {
  const escaped = COMPANION_DISCLAIMER.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const legacy = SAFETY_DISCLAIMER.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  let out = text
    .replace(new RegExp(escaped, "gi"), "")
    .replace(new RegExp(legacy, "gi"), "")
    .trim();

  return `${out}\n\n${COMPANION_DISCLAIMER}`;
}
