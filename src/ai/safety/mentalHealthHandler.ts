import type { AssistantResponse } from "../types";
import { SAFETY_DISCLAIMER } from "../ragConfig";
import type { IntentClassification } from "../intent/types";

const CRISIS =
  /\b(want to die|kill myself|suicid|end my life|better off dead|can'?t go on)\b/i;
const SAD = /\b(sad|depressed|hopeless|empty|numb|anxious|anxiety)\b/i;
const DEAD_ALONE = /\b(^|\s)dead(\s|$|[.!?])/i;

export function isMentalHealthIntent(classification: IntentClassification): boolean {
  return classification.intent === "mental_health";
}

export function buildMentalHealthResponse(
  userMessage: string,
  classification: IntentClassification
): AssistantResponse {
  const crisis = CRISIS.test(userMessage) || DEAD_ALONE.test(userMessage);

  if (crisis) {
    return {
      response:
        "I'm really glad you reached out. What you're feeling sounds incredibly heavy, and you deserve support right now — you don't have to face this alone.\n\n" +
        "If you are in immediate danger or thinking about harming yourself, please contact emergency services (911 in the US) or go to the nearest emergency department.\n\n" +
        "You can also call or text **988** (Suicide & Crisis Lifeline in the US) — free, 24/7.\n\n" +
        "I'm opening support resources in the app. A mental health professional can help you through this. " +
        SAFETY_DISCLAIMER,
      type: "mental_health",
      citations: [],
      actions: [{ type: "navigate", screen: "EmergencyResources" }],
      voiceTone: "reassuring",
    };
  }

  const moodNote = SAD.test(userMessage)
    ? "Feeling sad or low for a while can be exhausting, and it matters that you said something."
    : "Thank you for sharing how you're feeling.";

  return {
    response:
      `${moodNote} I'm not able to diagnose or replace professional mental health care, but I'm here with you.\n\n` +
      "Things that sometimes help in the short term: reaching out to someone you trust, gentle movement, hydration, and rest. " +
      "If low mood lasts more than two weeks, affects sleep or daily life, or feels overwhelming, consider speaking with a primary care clinician or therapist.\n\n" +
      "If you ever feel unsafe, use emergency services or **988** in the US. " +
      SAFETY_DISCLAIMER,
    type: "mental_health",
    citations: [],
    actions: [],
    voiceTone: "reassuring",
  };
}
