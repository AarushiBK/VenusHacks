import type { AssistantResponse } from "../types";
import { SAFETY_DISCLAIMER } from "../ragConfig";
import type { IntentClassification } from "../intent/types";
import { detectEmergency, buildEmergencyResponse } from "../safety/emergencyDetector";
import { toNavigateAction } from "../navigationIntent";
import { buildMentalHealthResponse } from "../safety/mentalHealthHandler";

export interface SafetyTriageResult {
  response: AssistantResponse;
  geminiCalled: false;
}

export function runSafetyTriage(
  userMessage: string,
  classification: IntentClassification
): SafetyTriageResult {
  if (classification.intent === "mental_health") {
    const mental = buildMentalHealthResponse(userMessage, classification);
    return { response: mental, geminiCalled: false };
  }

  const emergency = detectEmergency(userMessage);
  if (emergency.isEmergency) {
    const er = buildEmergencyResponse(emergency);
    return { response: { ...er, type: "triage" }, geminiCalled: false };
  }

  const symptoms = classification.symptoms;
  const symptomNote =
    symptoms.length > 0
      ? ` You mentioned ${symptoms.join(", ")}.`
      : "";

  const response: AssistantResponse = {
    response:
      `I hear that you're dealing with something concerning.${symptomNote}\n\n` +
      "I'm not able to diagnose or tell you what's wrong, but symptoms like these can sometimes need prompt medical attention   especially if they are new, severe, or getting worse.\n\n" +
      "**Red flags to seek urgent care now (call 911 or go to the ER):**\n" +
      "  Chest pain or pressure, especially with shortness of breath, sweating, nausea, or pain in the arm, jaw, or back\n" +
      "  Trouble breathing or feeling faint\n" +
      "  Signs of stroke (sudden weakness, confusion, trouble speaking, facial drooping)\n" +
      "  Heavy bleeding, especially during or after pregnancy\n" +
      "  Severe headache with vision changes during pregnancy\n" +
      "  Very high blood pressure readings (e.g., 160/110 or higher) with symptoms\n\n" +
      "Please contact your clinician, obstetric provider, or emergency services if you feel unsafe or symptoms are severe. " +
      `I'm opening emergency resources in the app. ${SAFETY_DISCLAIMER}`,
    type: "triage",
    citations: [],
    actions: [toNavigateAction("EmergencyResources")],
    voiceTone: "urgent",
  };

  return { response, geminiCalled: false };
}
