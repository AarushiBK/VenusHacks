import type { AssistantResponse, AppScreen } from "../types";
import { SAFETY_DISCLAIMER } from "../ragConfig";

export interface AppActionResult {
  response: AssistantResponse;
  geminiCalled: false;
}

export function runAppAction(userMessage: string): AppActionResult {
  const lower = userMessage.toLowerCase();
  let screen: AppScreen = "SymptomTracker";
  let action = "log your health data";

  if (/\b(mood|feel|feeling)\b/i.test(lower)) {
    screen = "SymptomTracker";
    action = "log your mood";
  } else if (/\b(bp|blood\s*pressure|heart\s*rate|bpm)\b/i.test(lower)) {
    screen = "HeartDashboard";
    action = "record your vitals";
  } else if (/\b(wearable|watch|apple\s*health|fitbit|sync)\b/i.test(lower)) {
    screen = "Wearables";
    action = "connect your wearable";
  } else if (/\b(medication|medicine)\b/i.test(lower)) {
    screen = "SymptomTracker";
    action = "track your medications";
  } else if (/\b(reminder|notification)\b/i.test(lower)) {
    screen = "Settings";
    action = "set a reminder";
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
