import type { ChatMode, IntentClassification } from "../intent/types";
import { extractVitals } from "../intent/vitalsExtraction";
import { isNonAcuteEmergencyMention } from "../safety/emergencyContext";
import { VITACOR_APP_GUIDE } from "@/lib/hera/appKnowledge";

/** Maps rule-based mode to companion focus hints (hidden from user). */
export function buildRoutingHints(
  mode: ChatMode,
  classification: IntentClassification,
  userMessage: string
): string {
  const focus = modeToFocus(mode, classification, userMessage);
  const topics =
    classification.topics.length > 0
      ? classification.topics.join(", ")
      : "general women's health";
  const symptoms =
    classification.symptoms.length > 0
      ? classification.symptoms.join(", ")
      : "none noted";

  const vitals = extractVitals(userMessage);
  const vitalsLine = vitals.bloodPressure
    ? `BP mentioned: ${vitals.bloodPressure}`
    : vitals.heartRateBpm
      ? `Heart rate mentioned: ${vitals.heartRateBpm} bpm`
      : "Vitals in message: none ? ask for BP/heart rate if relevant to symptom check";

  const acuteNote = isNonAcuteEmergencyMention(userMessage)
    ? "Context: prevention/hypothetical/emotional ? NOT acute emergency"
    : "Context: assess for acute red flags if symptoms are present now";

  return [
    `Primary focus: ${focus}`,
    `Rule intent: ${classification.intent}`,
    `Topics: ${topics}`,
    `Symptoms mentioned: ${symptoms}`,
    vitalsLine,
    acuteNote,
    `Confidence: ${classification.confidence.toFixed(2)}`,
    "",
    "### VitaCor app (navigation & features)",
    VITACOR_APP_GUIDE,
  ].join("\n");
}

function modeToFocus(
  mode: ChatMode,
  classification: IntentClassification,
  userMessage: string
): string {
  const personal =
    /\b(do i have|could i have|am i at risk|do i have it|think i have)\b/i.test(
      userMessage
    );
  const prevention =
    /\b(prevent|prevention|avoid|at home|what can i do)\b/i.test(userMessage);

  if (prevention && /\b(heart|cardiovascular|attack|stroke)\b/i.test(userMessage)) {
    return "prevention - actionable home steps and screenings; ask what they already do; NOT emergency";
  }

  switch (mode) {
    case "BASIC_EDUCATION":
      return "education - explain clearly with examples";
    case "RAG_MEDICAL":
      return classification.intent === "symptom_question" || personal
        ? "symptom_check - empathize, educate, ask follow-ups, no diagnosis"
        : "education - grounded teaching from evidence";
    case "MOOD_SUPPORT":
      return "emotional_support - validate feelings, gentle coping, offer clinical support if persistent";
    case "DOCTOR_PREP":
      return "prevention / visit prep - help user prepare questions for their clinician";
    case "VITALS_CHECK":
      return "symptom_check / vitals - interpret numbers cautiously, red flags, follow-ups";
    case "APP_ACTION":
      return "app_navigation - briefly help, suggest using app trackers when relevant";
    case "OUT_OF_SCOPE":
      return "conversational - warm greeting or gentle redirect to heart/pregnancy wellness";
    case "SAFETY_TRIAGE":
      return "triage - not used in companion path";
    case "NAVIGATION":
      return "app_navigation";
    default:
      if (classification.intent === "pregnancy") return "pregnancy";
      if (classification.intent === "pcos") return "symptom_check / education";
      if (classification.intent === "cardiovascular") return "education / prevention";
      return "education";
  }
}
