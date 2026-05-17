import type { AssistantResponse } from "../types";
import { toNavigateAction } from "../navigationIntent";
import { SAFETY_DISCLAIMER } from "../ragConfig";

export interface VitalsCheckResult {
  response: AssistantResponse;
  geminiCalled: false;
}

export function runVitalsCheck(userMessage: string): VitalsCheckResult {
  const lower = userMessage.toLowerCase();
  const bpMatch = lower.match(/(\d{2,3})\s*\/\s*(\d{2,3})/);
  const hrMatch = lower.match(/\b(\d{2,3})\s*(bpm|beats)\b/) ?? lower.match(/\b(heart\s*rate|pulse)\s*(is|was)?\s*(\d{2,3})\b/);

  let guidance =
    "Vital signs are best interpreted with your full history, medications, pregnancy status, and symptoms.";

  if (bpMatch) {
    const sys = parseInt(bpMatch[1], 10);
    const dia = parseInt(bpMatch[2], 10);
    if (sys >= 160 || dia >= 110) {
      guidance =
        `A reading around ${sys}/${dia} mmHg is quite high. If you have headache, vision changes, chest pain, or shortness of breath, seek urgent care now. Otherwise contact your clinician today.`;
    } else if (sys >= 140 || dia >= 90) {
      guidance =
        `A reading around ${sys}/${dia} mmHg is elevated for many adults. Track repeat readings, reduce salt if advised, and discuss with your clinician   especially during pregnancy or postpartum.`;
    } else if (sys < 90 || dia < 60) {
      guidance =
        `A reading around ${sys}/${dia} mmHg may be on the low side for some people. If you feel dizzy or faint, contact your clinician.`;
    } else {
      guidance =
        `A reading around ${sys}/${dia} mmHg is often in a typical range for many adults, but targets vary by age, pregnancy, and health conditions.`;
    }
  } else if (hrMatch) {
    const hr = parseInt(hrMatch[1] ?? hrMatch[3] ?? "0", 10);
    if (hr > 120) {
      guidance = `A heart rate around ${hr} bpm is elevated at rest for many people. If this is new or you feel unwell, contact your clinician.`;
    } else if (hr < 50) {
      guidance = `A heart rate around ${hr} bpm can be normal for some athletes but worth discussing if you have dizziness or fatigue.`;
    } else {
      guidance = `A resting heart rate around ${hr} bpm is within a common range for many adults. Trends matter more than a single reading.`;
    }
  }

  return {
    response: {
      response:
        `${guidance}\n\n` +
        "Open your heart dashboard to view trends over time. I cannot diagnose or replace a medical device. " +
        SAFETY_DISCLAIMER,
      type: "medical",
      citations: [],
      actions: [toNavigateAction("Metrics")],
      voiceTone: "calm",
    },
    geminiCalled: false,
  };
}
