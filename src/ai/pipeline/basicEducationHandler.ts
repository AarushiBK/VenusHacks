import { completeGeminiText, isGeminiFailureResponse } from "../gemini/client";
import { BASIC_EDUCATION_SYSTEM_PROMPT } from "../prompts/basicEducation";
import { SAFETY_DISCLAIMER } from "../ragConfig";
import type { AssistantResponse } from "../types";

export interface BasicEducationResult {
  response: AssistantResponse;
  geminiCalled: boolean;
}

export async function runBasicEducation(userMessage: string): Promise<BasicEducationResult> {
  const text = await completeGeminiText(
    "basic_education",
    BASIC_EDUCATION_SYSTEM_PROMPT,
    userMessage,
    0.3,
    650
  );

  const geminiCalled = !isGeminiFailureResponse(text);

  if (geminiCalled && text.length > 20) {
    return {
      response: {
        response: text.includes(SAFETY_DISCLAIMER) ? text : `${text}\n\n${SAFETY_DISCLAIMER}`,
        type: "educational",
        citations: [],
        actions: [],
        voiceTone: "calm",
      },
      geminiCalled: true,
    };
  }

  return {
    response: {
      response:
        "I can explain basic health topics in simple language, but I'm unable to reach the education service right now. " +
        `Please try again shortly, or ask a more specific question from our verified medical library. ${SAFETY_DISCLAIMER}`,
      type: "educational",
      citations: [],
      actions: [],
      voiceTone: "calm",
    },
    geminiCalled: false,
  };
}
