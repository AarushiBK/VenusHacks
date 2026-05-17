import type { AssistantResponse } from "../types";
import { SAFETY_DISCLAIMER } from "../ragConfig";

export interface OutOfScopeResult {
  response: AssistantResponse;
  geminiCalled: false;
}

export function runOutOfScope(userMessage: string, isGreeting: boolean): OutOfScopeResult {
  const text = isGreeting
    ? "Hello! I'm Hera, your women's heart and pregnancy health companion. Ask me about heart health, pregnancy cardiovascular risks, vitals, or say \"show my heart trends.\""
    : "I'm focused on women's cardiovascular and pregnancy-related health, vitals, mood support, and navigating this app. I can't help with that topic, but I'm here for health education and safety guidance.";

  return {
    response: {
      response: `${text} ${SAFETY_DISCLAIMER}`,
      type: "conversational",
      citations: [],
      actions: [],
      voiceTone: "warm",
    },
    geminiCalled: false,
  };
}
