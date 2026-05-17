import { completeGeminiText, isGeminiFailureResponse } from "../gemini/client";
import {
  SYNTHESIS_SYSTEM_PROMPT,
  buildSynthesisUserPrompt,
} from "../prompts/synthesis";
import { SAFETY_DISCLAIMER } from "../ragConfig";
import type { ScoredResult } from "../retrieval/confidence";
import { resultsToCitations } from "./citationFormatter";
import type { Citation } from "../types";
import {
  isNoContextAnswer,
  isIncompleteAnswer,
  chunksMentionQuestion,
  stripInlineSources,
  ensureSingleDisclaimer,
  buildNoContextOnlyAnswer,
} from "./postProcess";

export interface SynthesisResult {
  answer: string;
  citations: Citation[];
  geminiCalled: boolean;
}

export async function synthesizeAnswer(
  userQuestion: string,
  results: ScoredResult[]
): Promise<SynthesisResult> {
  const citations = resultsToCitations(results);
  const evidenceBlock = buildEvidenceBlock(results);
  const hasRelevantEvidence = chunksMentionQuestion(userQuestion, results);

  const gemini = await completeGeminiText(
    "rag_medical_synthesis",
    SYNTHESIS_SYSTEM_PROMPT,
    buildSynthesisUserPrompt(userQuestion, evidenceBlock),
    0.25,
    900
  );

  const useGemini =
    !isGeminiFailureResponse(gemini) &&
    gemini.length > 80 &&
    !isIncompleteAnswer(gemini) &&
    !(isNoContextAnswer(gemini) && hasRelevantEvidence);

  if (useGemini) {
    let answer = stripInlineSources(gemini);
    answer = ensureSingleDisclaimer(answer);

    if (isNoContextAnswer(answer)) {
      return {
        answer: buildNoContextOnlyAnswer(),
        citations: [],
        geminiCalled: true,
      };
    }

    return {
      answer,
      citations,
      geminiCalled: true,
    };
  }

  if (isNoContextAnswer(gemini ?? "") && !hasRelevantEvidence) {
    return {
      answer: buildNoContextOnlyAnswer(),
      citations: [],
      geminiCalled: !isGeminiFailureResponse(gemini ?? ""),
    };
  }

  console.log("[Hera Gemini] RAG synthesis fallback (incomplete, no-context override, or API off)");
  return {
    answer: fallbackSynthesis(userQuestion, results, citations),
    citations,
    geminiCalled: false,
  };
}

function buildEvidenceBlock(results: ScoredResult[]): string {
  return results
    .slice(0, 4)
    .map(
      (r, i) =>
        `[${i + 1}] ${r.chunk.metadata.source} — ${r.chunk.metadata.title}\n${summarizeChunk(r.chunk.content, 500)}`
    )
    .join("\n\n");
}

function summarizeChunk(content: string, maxLen: number): string {
  const sentences = content.split(/(?<=[.!?])\s+/).filter((s) => s.length > 20);
  let out = "";
  for (const s of sentences) {
    if ((out + s).length > maxLen) break;
    out += (out ? " " : "") + s.trim();
  }
  if (!out) return content.slice(0, maxLen).trim();
  return out;
}

function fallbackSynthesis(
  userQuestion: string,
  results: ScoredResult[],
  citations: Citation[]
): string {
  if (results.length === 0) {
    return buildNoContextOnlyAnswer();
  }

  const terms = extractTerms(userQuestion);
  const sentences: string[] = [];

  for (const r of results.slice(0, 3)) {
    const parts = r.chunk.content.split(/(?<=[.!?])\s+/);
    const relevant = parts.filter((p) => {
      const pl = p.toLowerCase();
      return terms.length === 0 || terms.some((t) => pl.includes(t));
    });
    const pick = (relevant.length ? relevant : parts).slice(0, 2);
    for (const s of pick) {
      const trimmed = s.trim();
      if (trimmed.length > 40 && trimmed.length < 400) sentences.push(trimmed);
    }
  }

  const unique = [...new Set(sentences)].slice(0, 4);
  const body =
    unique.length > 0
      ? unique.join(" ")
      : summarizeChunk(results[0].chunk.content, 550);

  const isDiagnosisAsk = /\b(do i have|could i have|do i have it)\b/i.test(userQuestion);

  const intro = isDiagnosisAsk
    ? "Based on verified medical sources, here is educational information that may relate to your question. Only a clinician can determine whether this applies to you:"
    : "Based on verified medical sources:";

  return (
    `${intro}\n\n${body}\n\n` +
    `Please discuss your symptoms and history with a healthcare provider. ` +
    SAFETY_DISCLAIMER
  );
}

function extractTerms(question: string): string[] {
  const terms: string[] = [];
  const q = question.toLowerCase();
  if (/\bpcos\b/.test(q)) terms.push("pcos", "polycystic", "ovary");
  if (/\bcardiovascular\b/.test(q)) terms.push("cardiovascular", "heart");
  if (/\bheart\b/.test(q)) terms.push("heart", "cardiovascular");
  q.split(/\W+/)
    .filter((w) => w.length > 3)
    .forEach((w) => terms.push(w));
  return [...new Set(terms)];
}
