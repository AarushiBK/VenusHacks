import type { AssistantResponse, NavigateAction } from "../types";
import { SAFETY_DISCLAIMER } from "../ragConfig";
import {
  hasPresentAcuteSymptoms,
  isNonAcuteEmergencyMention,
} from "./emergencyContext";

interface EmergencyPattern {
  pattern: RegExp;
  severity: "high" | "critical";
  context?: string;
  requiresPresentAcute?: boolean;
}

const EMERGENCY_PATTERNS: EmergencyPattern[] = [
  { pattern: /\bchest\s*pain\b/i, severity: "critical", context: "chest pain" },
  {
    pattern: /\b(pain|hurt|ache).{0,40}\bchest\b/i,
    severity: "critical",
    context: "chest pain",
  },
  { pattern: /\bheart\s*pain\b/i, severity: "critical", context: "heart pain" },
  {
    pattern: /\b(shortness of breath|can'?t breathe|trouble breathing|difficulty breathing)\b/i,
    severity: "critical",
    context: "breathing difficulty",
  },
  {
    pattern: /\b(i\s+think\s+i'?m\s+having|i'?m\s+having|having)\s+(a\s+)?heart\s*attack\b/i,
    severity: "critical",
    context: "possible heart attack",
  },
  {
    pattern: /\b(heart\s*attack)\b/i,
    severity: "critical",
    requiresPresentAcute: true,
  },
  { pattern: /\bstroke\b/i, severity: "critical", requiresPresentAcute: true },
  { pattern: /\bfaint(ing|ed)?\b/i, severity: "critical", context: "fainting" },
  { pattern: /\bheavy\s*bleeding\b/i, severity: "critical", context: "heavy bleeding" },
  { pattern: /\bblue\s*lips?\b/i, severity: "critical" },
  {
    pattern: /\b(severe\s*headache).*(vision|blurr)/i,
    severity: "critical",
    context: "severe headache with vision changes",
  },
  {
    pattern: /\b(pregnan|postpartum).*(bleed|pain|breath)/i,
    severity: "critical",
    context: "pregnancy emergency symptoms",
  },
  {
    pattern: /\b(want to die|kill myself|suicid|end my life)\b/i,
    severity: "critical",
    context: "crisis",
  },
];

export interface EmergencyResult {
  isEmergency: boolean;
  severity: "none" | "high" | "critical";
  matchedContexts: string[];
  action: NavigateAction;
}

export function detectEmergency(userMessage: string): EmergencyResult {
  if (isNonAcuteEmergencyMention(userMessage)) {
    return emptyEmergencyResult();
  }

  const matchedContexts: string[] = [];
  let maxSeverity: "none" | "high" | "critical" = "none";

  const presentAcute = hasPresentAcuteSymptoms(userMessage);

  for (const { pattern, severity, context, requiresPresentAcute } of EMERGENCY_PATTERNS) {
    if (!pattern.test(userMessage)) continue;
    if (requiresPresentAcute && !presentAcute) continue;

    if (context) matchedContexts.push(context);
    if (severity === "critical") maxSeverity = "critical";
    else if (severity === "high" && maxSeverity !== "critical") maxSeverity = "high";
  }

  return {
    isEmergency: maxSeverity !== "none",
    severity: maxSeverity,
    matchedContexts,
    action: { type: "navigate", screen: "Health" },
  };
}

function emptyEmergencyResult(): EmergencyResult {
  return {
    isEmergency: false,
    severity: "none",
    matchedContexts: [],
    action: { type: "navigate", screen: "Health" },
  };
}

export function buildEmergencyResponse(result: EmergencyResult): AssistantResponse {
  const contextNote =
    result.matchedContexts.length > 0
      ? ` You mentioned ${result.matchedContexts.join(" and ")}.`
      : "";

  const urgency =
    result.severity === "critical"
      ? "I may be wrong, but your symptoms could require urgent medical attention. Please contact emergency services (911 in the US) or go to the nearest emergency department now."
      : "What you're describing might need prompt medical attention. Please contact a clinician or emergency services if you feel unsafe.";

  return {
    response: `${urgency}${contextNote}\n\nI'm opening emergency resources for you. ${SAFETY_DISCLAIMER}`,
    type: "emergency",
    citations: [],
    actions: [result.action],
    voiceTone: "urgent",
  };
}
