import type { AssistantResponse } from "../types";
import { SAFETY_DISCLAIMER } from "../ragConfig";

export interface MoodSupportResult {
  response: AssistantResponse;
  geminiCalled: false;
}

export function runMoodSupport(userMessage: string): MoodSupportResult {
  return {
    response: {
      response:
        "Thank you for sharing how you're feeling. Emotional ups and downs are common, especially with hormones, pregnancy, postpartum changes, and stress.\n\n" +
        "Gentle steps that sometimes help: rest, hydration, a short walk, reaching out to someone you trust, and limiting caffeine if you're anxious. " +
        "If low mood lasts more than two weeks, affects sleep or daily life, or feels overwhelming, consider speaking with your clinician or a therapist.\n\n" +
        "You can log your mood in the app to spot patterns over time. If you ever feel unsafe, use emergency services or call/text **988** in the US. " +
        SAFETY_DISCLAIMER,
      type: "mental_health",
      citations: [],
      actions: [{ type: "navigate", screen: "SymptomTracker" }],
      voiceTone: "reassuring",
    },
    geminiCalled: false,
  };
}
