import { COMPANION_DISCLAIMER } from "../ragConfig";
import type { ChatMode, IntentClassification } from "../intent/types";

export function buildCompanionOfflineFallback(
  userMessage: string,
  mode: ChatMode,
  classification: IntentClassification
): string {
  const lower = userMessage.toLowerCase();

  if (mode === "OUT_OF_SCOPE" && /^(hi|hello|hey)\b/i.test(lower)) {
    return (
      "Hi — I'm Vena, your companion for heart and pregnancy wellness. " +
      "You can ask me about symptoms, PCOS, blood pressure, pregnancy risks, or how to prepare for a visit. " +
      "What's on your mind today?\n\n" +
      COMPANION_DISCLAIMER
    );
  }

  if (mode === "MOOD_SUPPORT" || classification.intent === "mental_health") {
    return (
      "I'm really glad you reached out. What you're feeling matters, and you don't have to sort it out alone. " +
      "If sadness or anxiety has been heavy for more than a couple of weeks, or you're struggling to function day to day, " +
      "a clinician or counselor can help — and crisis lines are available 24/7 if you ever feel unsafe.\n\n" +
      "Would it help to talk about what's been weighing on you most lately?\n\n" +
      COMPANION_DISCLAIMER
    );
  }

  if (/\b(do i have|could i have)\b.*\bpcos\b/i.test(lower) || /\bpcos\b/i.test(lower)) {
    return (
      "I can't diagnose PCOS, but I can help you think through whether your experience fits patterns clinicians often evaluate. " +
      "Common themes include irregular periods, acne or oily skin, extra hair growth, weight changes, and sometimes difficulty conceiving. " +
      "Have you noticed irregular cycles, skin changes, or other symptoms that worry you?\n\n" +
      COMPANION_DISCLAIMER
    );
  }

  if (/\bcardiovascular|heart disease\b/i.test(lower)) {
    return (
      "Cardiovascular disease refers to conditions affecting the heart and blood vessels — things like coronary artery disease, " +
      "high blood pressure, and stroke risk. Women can have different symptom patterns than men, especially around pregnancy and menopause. " +
      "I can't tell you whether you have it without a clinical workup, but I can help you understand risk factors and warning signs. " +
      "Are you asking because of specific symptoms, a family history, or general prevention?\n\n" +
      COMPANION_DISCLAIMER
    );
  }

  return (
    "I'm having trouble connecting to my reasoning service right now, so I don't want to guess about your health. " +
    "Please try again in a moment, or talk with your clinician if something feels urgent. " +
    "When I'm back, I can help you explore symptoms, heart and pregnancy topics, and how to prepare for visits.\n\n" +
    COMPANION_DISCLAIMER
  );
}
