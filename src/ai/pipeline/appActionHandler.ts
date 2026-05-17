import type { AssistantResponse, AppScreen } from "../types";
import { toNavigateAction } from "../navigationIntent";
import { SAFETY_DISCLAIMER } from "../ragConfig";

export interface AppActionResult {
  response: AssistantResponse;
  geminiCalled: false;
}

export function runAppAction(userMessage: string): AppActionResult {
  const lower = userMessage.toLowerCase();
  let screen: AppScreen = "SymptomLog";
  let action = "log your health data";

  if (/\b(mood|feel|feeling)\b/i.test(lower)) {
    screen = "SymptomLog";
    action = "log your mood";
  } else if (/\b(bp|blood\s*pressure|heart\s*rate|bpm|face\s*scan)\b/i.test(lower)) {
    screen = "Metrics";
    action = "record your vitals or run a face scan";
  } else if (/\b(wearable|watch|apple\s*health|fitbit|sync)\b/i.test(lower)) {
    screen = "Metrics";
    action = "connect your wearable in Metrics";
  } else if (/\b(medication|medicine)\b/i.test(lower)) {
    screen = "SymptomLog";
    action = "track your medications";
  } else if (/\b(reminder|notification|settings)\b/i.test(lower)) {
    screen = "Home";
    action = "open settings from Home";
  }

  return {
    response: {
      response: `I'll help you ${action}. Tap Let's go! when you're ready. ${SAFETY_DISCLAIMER}`,
      type: "navigation",
      citations: [],
      actions: [toNavigateAction(screen)],
      voiceTone: "warm",
    },
    geminiCalled: false,
  };
}
