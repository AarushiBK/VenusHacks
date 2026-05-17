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
    screen: "Passport",
    patterns: [
      /\b(passport|motherboard)\b/i,
      /\b(body\s*scan|scan\s*timeline|cardiovascular\s*timeline)\b/i,
      /\b(ultrasound|echo|pelvic|ovary|uterus)\s*scan/i,
      /\b(show|open|go|view)\b.*\b(passport|timeline|body)\b/i,
    ],
  },
  {
    screen: "Symptoms",
    patterns: [
      /\b(show|open|go)\b.*\bsymptom/i,
      /\bsymptom\s*(tracker|tab|page)\b/i,
      /\btoday'?s?\s*symptoms?\b/i,
    ],
  },
  {
    screen: "SymptomsLog",
    patterns: [
      /\b(log|record|add|track)\b.*\bsymptom/i,
      /\bsymptom\s*log\b/i,
      /\blog\s+(my\s+)?(mood|symptoms?)\b/i,
    ],
  },
  {
    screen: "SymptomsCharts",
    patterns: [
      /\bsymptom\s*chart/i,
      /\b(show|view)\b.*\bchart/i,
      /\bsymptom\s*trend/i,
    ],
  },
  {
    screen: "Health",
    patterns: [
      /\b(show|open|go)\b.*\bhealth\b/i,
      /\bhealth\s*(tab|page|overview)\b/i,
      /\bdaily\s*recommendations?\b/i,
    ],
  },
  {
    screen: "Metrics",
    patterns: [
      /\b(show|open|go)\b.*\bmetric/i,
      /\b(face\s*scan|mirror\s*scan|rppg)\b/i,
      /\bheart\s*rate\s*scan\b/i,
      /\b(show|view)\b.*\b(heart|bpm|vitals)\b/i,
      /\bmy\s+heart\s+(trends?|data)\b/i,
    ],
  },
  {
    screen: "SendReport",
    patterns: [
      /\bsend\s+(my\s+)?report\b/i,
      /\b(report|share)\b.*\b(provider|doctor)\b/i,
      /\bprimary\s*(health\s*)?provider\b/i,
    ],
  },
  {
    screen: "Settings",
    patterns: [
      /\bsettings?\b/i,
      /\bpreferences?\b/i,
      /\baccount\b/i,
      /\bemergency\s*contact/i,
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
  userMessage: string,
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
  if (lower.includes("passport") || lower.includes("timeline") || lower.includes("body scan")) {
    return "Passport";
  }
  if (lower.includes("metric") || lower.includes("face scan") || lower.includes("scanner")) {
    return "Metrics";
  }
  if (lower.includes("log") && lower.includes("symptom")) return "SymptomsLog";
  if (lower.includes("chart")) return "SymptomsCharts";
  if (lower.includes("symptom")) return "Symptoms";
  if (lower.includes("health")) return "Health";
  if (lower.includes("report") || lower.includes("provider")) return "SendReport";
  if (lower.includes("setting")) return "Settings";
  if (lower.includes("heart") || lower.includes("bpm")) return "Metrics";
  return null;
}

export function buildNavigationResponse(screen: AppScreen): string {
  const labels: Record<AppScreen, string> = {
    Home: "Home",
    Passport: "your Passport — timeline and body scans",
    Symptoms: "the Symptoms tab",
    SymptomsLog: "symptom logging",
    SymptomsCharts: "symptom charts",
    Health: "Health",
    Metrics: "Metrics — including the face scanner",
    Settings: "Settings",
    SendReport: "Send report (open Settings on Home, then Send report)",
  };
  return `I can take you to ${labels[screen]}. Tap the button below when you're ready.`;
}
