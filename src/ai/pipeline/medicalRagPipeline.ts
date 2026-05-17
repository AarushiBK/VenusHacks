import type { RAGResult } from "../types";
import type { IntentClassification } from "../intent/types";
import { retrieveMedicalEvidence } from "../retrieval/evidenceRetrieval";
import { runCompanionPipeline } from "./companionPipeline";
import type { ModeClassification } from "../intent/types";

export interface RagMedicalResult extends RAGResult {
  geminiCalled: boolean;
  retrievedChunkIds: string[];
}

/**
 * @deprecated Use runCompanionPipeline. Kept for compatibility  delegates to companion.
 */
export async function runMedicalRagPipeline(
  userMessage: string,
  classification: IntentClassification
): Promise<RagMedicalResult> {
  const modeClassification: ModeClassification = {
    mode: "RAG_MEDICAL",
    classification,
    reason: "legacy medicalRagPipeline delegate",
  };

  const result = await runCompanionPipeline(userMessage, modeClassification);

  return {
    answer: result.response.response,
    citations: result.response.citations,
    hasSufficientContext: result.ragUsed,
    geminiCalled: result.geminiCalled,
    retrievedChunkIds: result.retrievedChunkIds,
  };
}

/** @deprecated */
export async function retrieveOnly(
  userMessage: string,
  classification: IntentClassification
) {
  return retrieveMedicalEvidence(userMessage, classification);
}
