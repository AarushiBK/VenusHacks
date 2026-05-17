import type { AssistantResponse } from "../types";
import { toNavigateAction } from "../navigationIntent";
import { SAFETY_DISCLAIMER } from "../ragConfig";

export interface DoctorPrepResult {
  response: AssistantResponse;
  geminiCalled: false;
}

export function runDoctorPrep(userMessage: string): DoctorPrepResult {
  const lower = userMessage.toLowerCase();
  const pregnancy = /\b(pregnan|postpartum|ob|midwife)\b/i.test(lower);

  const questions = pregnancy
    ? [
        "What is a safe blood pressure range for me right now?",
        "Are any symptoms I'm having warning signs I should watch for?",
        "Should I adjust any medications or supplements?",
        "What postpartum heart symptoms should prompt urgent care?",
        "When should I follow up after delivery?",
      ]
    : [
        "What is my cardiovascular risk based on my history and labs?",
        "Are my blood pressure or heart rate readings concerning?",
        "Should I have any screening tests (lipids, glucose, ECG)?",
        "How do my symptoms relate to my cycle, hormones, or stress?",
        "What lifestyle changes would you recommend first?",
      ];

  const list = questions.map((q, i) => `${i + 1}. ${q}`).join("\n");

  return {
    response: {
      response:
        "Here are questions you can bring to your next visit:\n\n" +
        `${list}\n\n` +
        "Tip: Use Send report on Home to share vitals and symptoms with your provider. " +
        SAFETY_DISCLAIMER,
      type: "medical",
      citations: [],
      actions: [toNavigateAction("Home")],
      voiceTone: "calm",
    },
    geminiCalled: false,
  };
}
