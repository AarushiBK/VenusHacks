import type { AssistantResponse, AppScreen } from "../types";
import { SAFETY_DISCLAIMER } from "../ragConfig";

export interface AppActionResult {
  response: AssistantResponse;
  geminiCalled: false;
}

export function runAppAction(userMessage: string): AppActionResult {
  const lower = userMessage.toLowerCase();
  let screen: AppScreen = "Symptoms";
  let action = "log your health data";

  if (/\b(mood|feel|feeling)\b/i.test(lower)) {
    screen = "SymptomsLog";
    action = "log your mood";
  } else if (/\b(bp|blood\s*pressure|heart\s*rate|bpm|face\s*scan)\b/i.test(lower)) {
    screen = "Metrics";
    action = "check your vitals or run a face scan";
  } else if (/\b(chart|trend)\b/i.test(lower) && /\bsymptom/i.test(lower)) {
    screen = "SymptomsCharts";
    action = "view your symptom charts";
  } else if (/\b(report|provider|doctor)\b/i.test(lower)) {
    screen = "SendReport";
    action = "send a report to your provider";
  } else if (/\b(passport|scan|timeline|body)\b/i.test(lower)) {
    screen = "Passport";
    action = "open your passport scans";
  } else if (/\b(reminder|notification)\b/i.test(lower)) {
    screen = "Settings";
    action = "open settings";
  } else if (/\b(symptom|log|track)\b/i.test(lower)) {
    screen = "SymptomsLog";
    action = "log your symptoms";
  }

  return {
    response: {
      response: `I'll help you ${action}. Opening that section now. ${SAFETY_DISCLAIMER}`,
      type: "navigation",
      citations: [],
      actions: [{ type: "navigate", screen }],
      voiceTone: "warm",
    },
    geminiCalled: false,
  };
}
