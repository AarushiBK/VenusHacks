import {
  buildAppGuideForPrompt,
  getDestination,
  SCREEN_LABELS,
  SCREEN_ROUTES,
} from "@/lib/hera/appDestinations";
import type { AppScreen, NavigateAction } from "./types";

interface NavigationPattern {
  screen: AppScreen;
  patterns: RegExp[];
}

const NAVIGATION_PATTERNS: NavigationPattern[] = [
  {
    screen: "Home",
    patterns: [
      /\b(home|dashboard|main)\b/i,
      /\btake me home\b/i,
      /\b(send|health)\s+report\b/i,
      /\bsettings\b/i,
    ],
  },
  {
    screen: "Motherboard",
    patterns: [
      /\b(passport|motherboard)\b/i,
      /\b(body\s*scan|scan\s*hotspot)\b/i,
      /\b(timeline|future\s*heart|postpartum\s*recovery)\b/i,
      /\b(pregnan|postpartum).*\b(passport|timeline)\b/i,
    ],
  },
  {
    screen: "Symptoms",
    patterns: [
      /\b(show|open|go|check)\b.*\bsymptoms?\b/i,
      /\bsymptom\s*(tab|tracker|home)\b/i,
      /\btoday'?s?\s*symptoms?\b/i,
    ],
  },
  {
    screen: "SymptomLog",
    patterns: [
      /\b(log|track|record|add)\b.*\bsymptoms?\b/i,
      /\b(log|track)\b.*\bmood\b/i,
      /\bsymptom\s*log\b/i,
    ],
  },
  {
    screen: "SymptomCharts",
    patterns: [
      /\bsymptom\s*(charts?|graphs?|trends?)\b/i,
      /\bcharts?\b.*\bsymptoms?\b/i,
    ],
  },
  {
    screen: "Health",
    patterns: [
      /\b(show|open|go|check)\b.*\bhealth\b/i,
      /\bhealth\s*(overview|tab|page)\b/i,
      /\brecommendations?\b/i,
      /\bcondition\s*search\b/i,
    ],
  },
  {
    screen: "Metrics",
    patterns: [
      /\b(show|open|go|check)\b.*\b(metrics?|vitals?|heart\s*rate|bpm|face\s*scan)\b/i,
      /\bmetrics?\s*tab\b/i,
      /\bheart\s*(model|3d|scan)\b/i,
      /\bface\s*scan\b/i,
      /\b(rppg|wearable|oura|watch)\b/i,
    ],
  },
  {
    screen: "Chat",
    patterns: [/\b(hera|chat|companion)\b/i, /\btalk\s+to\s+hera\b/i],
  },
  {
    screen: "EmergencyResources",
    patterns: [
      /\bemergency\b/i,
      /\burgent\s*care\b/i,
      /\b911\b/,
      /\bcrisis\s*(line|help)\b/i,
    ],
  },
];

const NAVIGATION_VERBS =
  /\b(show|open|go|take|navigate|view|see|display|bring|check|visit)\s+(me\s+)?(to\s+)?/i;

export interface NavigationIntentResult {
  isNavigation: boolean;
  confidence: number;
  screen?: AppScreen;
  action?: NavigateAction;
}

export function detectNavigationIntent(
  userMessage: string
): NavigationIntentResult {
  const trimmed = userMessage.trim();
  const hasNavVerb = NAVIGATION_VERBS.test(trimmed);

  let bestMatch: { screen: AppScreen; score: number } | null = null;

  for (const { screen, patterns } of NAVIGATION_PATTERNS) {
    for (const pattern of patterns) {
      if (pattern.test(trimmed)) {
        const score = hasNavVerb ? 0.95 : 0.78;
        if (!bestMatch || score > bestMatch.score) {
          bestMatch = { screen, score };
        }
      }
    }
  }

  if (!bestMatch && hasNavVerb) {
    const fallback = inferScreenFromKeywords(trimmed);
    if (fallback) bestMatch = { screen: fallback, score: 0.68 };
  }

  if (!bestMatch) {
    return { isNavigation: false, confidence: 0 };
  }

  if (!hasNavVerb && bestMatch.score < 0.85) {
    return { isNavigation: false, confidence: 0 };
  }

  const dest = getDestination(bestMatch.screen);
  if (!dest) {
    return { isNavigation: false, confidence: 0 };
  }
  return {
    isNavigation: true,
    confidence: bestMatch.score,
    screen: bestMatch.screen,
    action: {
      type: "navigate",
      screen: bestMatch.screen,
      href: dest.href,
      label: dest.label,
    },
  };
}

function inferScreenFromKeywords(text: string): AppScreen | null {
  const lower = text.toLowerCase();
  if (lower.includes("passport") || lower.includes("motherboard")) return "Motherboard";
  if (lower.includes("face scan") || lower.includes("metric") || lower.includes("heart rate")) {
    return "Metrics";
  }
  if (lower.includes("log") && lower.includes("symptom")) return "SymptomLog";
  if (lower.includes("chart") && lower.includes("symptom")) return "SymptomCharts";
  if (lower.includes("symptom")) return "Symptoms";
  if (lower.includes("health")) return "Health";
  if (lower.includes("emergency")) return "EmergencyResources";
  if (lower.includes("home")) return "Home";
  return null;
}

export function buildNavigationResponse(screen: AppScreen): string {
  const label = SCREEN_LABELS[screen] ?? screen;
  return `I can take you to ${label}. Tap **Let's go!** when you're ready.`;
}

export function getAppGuideForPrompt(): string {
  return buildAppGuideForPrompt();
}

export function toNavigateAction(screen: AppScreen): NavigateAction {
  const dest = getDestination(screen);
  return {
    type: "navigate",
    screen,
    href: dest?.href ?? "/",
    label: dest?.label ?? screen,
  };
}

export { SCREEN_ROUTES };
