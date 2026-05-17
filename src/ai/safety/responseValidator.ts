import {
  COMPANION_DISCLAIMER,
  LOW_CONFIDENCE_MESSAGE,
  SAFETY_DISCLAIMER,
} from "../ragConfig";

const RAW_DUMP_PATTERNS = [
  /From your verified medical library/i,
  /\[Passage \d+\]/i,
  /\(relevance:\s*0\.\d+\)/i,
  /^\s*\d+\.\s+.{200,}/m,
];

const DIAGNOSTIC_PATTERNS = [
  /\byou have\s+(definitely|likely\s+)?(pcos|diabetes|a heart condition)/i,
  /\bi diagnose you\b/i,
  /\byou are diagnosed with\b/i,
];

export function validateMedicalResponse(answer: string): string {
  let text = answer.trim();

  if (RAW_DUMP_PATTERNS.some((p) => p.test(text))) {
    return `${LOW_CONFIDENCE_MESSAGE}\n\n${SAFETY_DISCLAIMER}`;
  }

  for (const pattern of DIAGNOSTIC_PATTERNS) {
    text = text.replace(pattern, (match) =>
      match.replace(/you have/i, "this may be discussed with a clinician regarding")
    );
  }

  const hasDisclaimer =
    text.includes(SAFETY_DISCLAIMER) || text.includes(COMPANION_DISCLAIMER);

  if (!hasDisclaimer) {
    text = `${text}\n\n${COMPANION_DISCLAIMER}`;
  }

  return text;
}

export function looksLikeRawChunkDump(text: string): boolean {
  return RAW_DUMP_PATTERNS.some((p) => p.test(text));
}
