import type { AssistantResponse, ResponseType, VoiceTone } from "../types";
import type { ChatMode, IntentClassification, ModeClassification } from "../intent/types";
import { assistantMemory } from "../assistantMemory";
import { completeGeminiText, isGeminiFailureResponse } from "../gemini/client";
import {
  COMPANION_SYSTEM_PROMPT,
  buildCompanionUserPrompt,
} from "../prompts/companion";
import { formatConversationHistory } from "../context/formatConversation";
import { formatEvidenceForCompanion } from "../context/formatEvidence";
import { retrieveMedicalEvidence } from "../retrieval/evidenceRetrieval";
import { buildRoutingHints } from "../companion/routingHints";
import {
  polishCompanionResponse,
  isIncompleteCompanionAnswer,
} from "../companion/postProcess";
import { buildCompanionOfflineFallback } from "../companion/fallback";
import { resultsToCitations } from "../synthesis/citationFormatter";
import { validateMedicalResponse } from "../safety/responseValidator";
import { detectNavigationIntent } from "../navigationIntent";

export interface CompanionPipelineResult {
  response: AssistantResponse;
  geminiCalled: boolean;
  ragUsed: boolean;
  chunkCount: number;
  retrievedChunkIds: string[];
}

const MAX_CITATIONS = 2;

/**
 * Primary Hera path: retrieve evidence -> one Gemini call -> conversational reply.
 */
export async function runCompanionPipeline(
  userMessage: string,
  modeClassification: ModeClassification
): Promise<CompanionPipelineResult> {
  const { mode, classification } = modeClassification;

  const shouldRetrieve = shouldRetrieveEvidence(mode, userMessage);
  const evidence = shouldRetrieve
    ? await retrieveMedicalEvidence(userMessage, classification)
    : { chunks: [], hasStrongEvidence: false, retrievedChunkIds: [] as string[] };

  const history = assistantMemory.getRecentMessages(10);
  const conversationBlock = formatConversationHistory(history, userMessage);
  const evidenceBlock = formatEvidenceForCompanion(evidence.chunks);
  const routingHints = buildRoutingHints(mode, classification, userMessage);

  const userPrompt = buildCompanionUserPrompt({
    userMessage,
    conversationBlock,
    evidenceBlock,
    routingHints,
  });

  const geminiRaw = await completeGeminiText(
    "companion_primary",
    COMPANION_SYSTEM_PROMPT,
    userPrompt,
    0.45,
    1200
  );

  const geminiCalled = !isGeminiFailureResponse(geminiRaw);
  let answer: string;

  if (
    geminiCalled &&
    geminiRaw.length > 80 &&
    !isIncompleteCompanionAnswer(geminiRaw)
  ) {
    answer = polishCompanionResponse(geminiRaw);
  } else {
    console.log("[Hera] Gemini unavailable or incomplete - offline fallback");
    answer = buildCompanionOfflineFallback(userMessage, mode, classification);
  }

  answer = validateMedicalResponse(answer);

  const citations =
    evidence.hasStrongEvidence && evidence.chunks.length > 0
      ? resultsToCitations(evidence.chunks).slice(0, MAX_CITATIONS)
      : [];

  const actions = inferActions(userMessage, mode, classification);

  return {
    response: {
      response: answer,
      type: mapResponseType(mode, classification),
      citations,
      actions,
      voiceTone: mapVoiceTone(mode, classification),
    },
    geminiCalled,
    ragUsed: shouldRetrieve && evidence.chunks.length > 0,
    chunkCount: evidence.chunks.length,
    retrievedChunkIds: evidence.retrievedChunkIds,
  };
}

function shouldRetrieveEvidence(mode: ChatMode, message: string): boolean {
  const trimmed = message.trim();
  if (mode === "OUT_OF_SCOPE") {
    if (/^(hi|hello|hey|thanks|thank you)\b/i.test(trimmed)) return false;
    return false;
  }
  if (mode === "APP_ACTION") return false;
  return true;
}

function mapResponseType(
  mode: ChatMode,
  classification: IntentClassification
): ResponseType {
  if (mode === "MOOD_SUPPORT" || classification.intent === "mental_health") {
    return "mental_health";
  }
  if (mode === "BASIC_EDUCATION" || mode === "OUT_OF_SCOPE") {
    return mode === "OUT_OF_SCOPE" ? "conversational" : "educational";
  }
  if (mode === "DOCTOR_PREP") return "educational";
  if (mode === "VITALS_CHECK") return "triage";
  if (mode === "APP_ACTION") return "navigation";
  return "medical";
}

function mapVoiceTone(
  mode: ChatMode,
  classification: IntentClassification
): VoiceTone {
  if (mode === "MOOD_SUPPORT") return "warm";
  if (classification.intent === "symptom_question") return "reassuring";
  return "calm";
}

function inferActions(
  userMessage: string,
  mode: ChatMode,
  classification: IntentClassification
) {
  const nav = detectNavigationIntent(userMessage);
  if (nav.isNavigation && nav.screen && nav.confidence >= 0.65) {
    return [{ type: "navigate" as const, screen: nav.screen }];
  }

  if (mode === "APP_ACTION") {
    if (/\b(symptom|mood)\b/i.test(userMessage)) {
      return [{ type: "navigate" as const, screen: "SymptomsLog" as const }];
    }
    if (/\b(bp|blood pressure|heart|bpm|face scan)\b/i.test(userMessage)) {
      return [{ type: "navigate" as const, screen: "Metrics" as const }];
    }
  }

  if (
    classification.intent === "emergency" ||
    /\b(emergency|911|er)\b/i.test(userMessage)
  ) {
    return [{ type: "navigate" as const, screen: "Health" as const }];
  }

  return [];
}
