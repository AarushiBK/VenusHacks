import type { AppScreen, NavigateAction } from "./types";

interface NavigationPattern {
  screen: AppScreen;
  patterns: RegExp[];
}

const NAVIGATION_PATTERNS: NavigationPattern[] = [
  {
    screen: "Home",
    patterns: [/\b(home|main|dashboard)\b/i, /\btake me home\b/i],
  },
  {
    screen: "HeartDashboard",
    patterns: [
      /\bheart\s*(trends?|dashboard|monitor)\b/i,
      /\b(show|open|view)\b.*\b(heart|vitals|bpm)\b/i,
      /\bmy\s+heart\s+data\b/i,
    ],
  },
  {
    screen: "PregnancyInsights",
    patterns: [
      /\b(show|open|go|view)\b.*\bpregnancy\s*(insights?|dashboard)\b/i,
      /\bpregnancy\s*insights\b/i,
    ],
  },
  {
    screen: "SymptomTracker",
    patterns: [
      /\b(show|open|go)\b.*\bsymptom/i,
      /\bsymptom\s*tracker\b/i,
      /\btoday'?s?\s*symptoms?\b/i,
    ],
  },
  {
    screen: "EmergencyResources",
    patterns: [
      /\bemergency\b/i,
      /\burgent\s*care\b/i,
      /\bcrisis\b/i,
      /\b911\b/,
    ],
  },
  {
    screen: "Wearables",
    patterns: [
      /\bwearable(s)?\b/i,
      /\bapple\s*health\b/i,
      /\bgoogle\s*fit\b/i,
      /\bdevice\s*connection(s)?\b/i,
    ],
  },
  {
    screen: "Reports",
    patterns: [
      /\b(show|open|view|go)\b.*\breports?\b/i,
      /\bhealth\s*reports?\b/i,
      /\bexport\s+(my\s+)?report\b/i,
    ],
  },
  {
    screen: "Settings",
    patterns: [/\bsettings?\b/i, /\bpreferences?\b/i, /\baccount\b/i],
  },
  {
    screen: "ChatHistory",
    patterns: [
      /\bchat\s*history\b/i,
      /\bconversation\s*history\b/i,
      /\bpast\s*chats?\b/i,
    ],
  },
  {
    screen: "EducationHub",
    patterns: [
      /\beducation\b/i,
      /\blearn\b/i,
      /\barticles?\b/i,
      /\bresources?\b/i,
    ],
  },
  {
    screen: "RiskScanner",
    patterns: [
      /\brisk\s*(scanner|analysis|score)\b/i,
      /\bmaternal\s*risk\b/i,
      /\bassess(ment)?\b/i,
    ],
  },
  {
    screen: "PostpartumRecovery",
    patterns: [
      /\b(show|open|go)\b.*\bpostpartum\s*recovery\b/i,
      /\bpostpartum\s*recovery\s*(screen|section|page)?\b/i,
    ],
  },
];

const NAVIGATION_VERBS =
  /\b(show|open|go|take|navigate|view|see|display|bring)\s+(me\s+)?(to\s+)?/i;

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
        const score = hasNavVerb ? 0.95 : 0.75;
        if (!bestMatch || score > bestMatch.score) {
          bestMatch = { screen, score };
        }
      }
    }
  }

  if (!bestMatch && hasNavVerb) {
    const fallback = inferScreenFromKeywords(trimmed);
    if (fallback) bestMatch = { screen: fallback, score: 0.65 };
  }

  if (bestMatch && !hasNavVerb && bestMatch.score < 0.85) {
    return { isNavigation: false, confidence: 0 };
  }

  if (!bestMatch) {
    return { isNavigation: false, confidence: 0 };
  }

  return {
    isNavigation: true,
    confidence: bestMatch.score,
    screen: bestMatch.screen,
    action: { type: "navigate", screen: bestMatch.screen },
  };
}

function inferScreenFromKeywords(text: string): AppScreen | null {
  const lower = text.toLowerCase();
  if (lower.includes("heart")) return "HeartDashboard";
  if (lower.includes("pregnancy")) return "PregnancyInsights";
  if (lower.includes("emergency")) return "EmergencyResources";
  if (lower.includes("wearable")) return "Wearables";
  if (lower.includes("symptom")) return "SymptomTracker";
  return null;
}

export function buildNavigationResponse(screen: AppScreen): string {
  const labels: Record<AppScreen, string> = {
    Home: "home",
    HeartDashboard: "your heart health dashboard",
    PregnancyInsights: "pregnancy insights",
    SymptomTracker: "symptom tracker",
    EmergencyResources: "emergency resources",
    Wearables: "wearable connections",
    Reports: "your health reports",
    Settings: "settings",
    ChatHistory: "chat history",
    EducationHub: "the education hub",
    RiskScanner: "risk analysis",
    PostpartumRecovery: "postpartum recovery",
  };
  return `I'll take you to ${labels[screen]}.`;
}
