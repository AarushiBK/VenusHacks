import { detectEmergency } from "../safety/emergencyDetector";
import { isNonAcuteEmergencyMention } from "../safety/emergencyContext";
import { detectNavigationIntent } from "../navigationIntent";
import { extractSymptoms, inferTopics } from "./topicExtraction";
import type {
  ChatMode,
  IntentClassification,
  MedicalIntent,
  ModeClassification,
} from "./types";
import type { AppScreen } from "../types";

const CRISIS_MENTAL = [
  /\b(want to|wanna)\s*die\b/i,
  /\b(kill\s*myself|end\s*my\s*life|suicid)\b/i,
  /\b(i'?m|i am)\s*suicidal\b/i,
  /\b(no\s*reason\s*to\s*live|better\s*off\s*dead)\b/i,
  /\bcan'?t\s*go\s*on\b/i,
  /\b(^|\s)dead(\s|$|[.!?])/i,
  /\bself[- ]?harm\b/i,
];

const ACUTE_URGENT =
  /\b(chest\s*pain|chest\s*hurts|heart\s*pain|can'?t\s*breathe|trouble\s*breathing|shortness\s*of\s*breath|faint(ing|ed)?|passed\s*out|stroke|heavy\s*bleeding|severe\s*headache|vision\s*changes|sudden\s*blurr|blurry\s*vision|face\s*drooping|slurred\s*speech|blue\s*lips|severe\s*belly\s*pain|severe\s*abdominal)\b/i;

const EXTREME_SWELLING = /\b(extreme|severe|sudden)\s*swelling\b/i;

const DANGEROUS_BP =
  /\b(bp|blood\s*pressure)\s*(is|was|of|reading|at)?\s*(1[89]\d|2\d{2})\s*\/\s*(1[0-9]\d|2\d{2})\b/i;

const PREGNANCY_DANGER =
  /\b(pregnan|postpartum|prenatal).*\b(bleed|bleeding|pain|breath|swelling|headache|vision|seizure|can'?t\s*feel\s*baby)\b/i;

const PERSONAL_ACUTE =
  /\b(i'?m|i am|i have|my).*\b(chest\s*pain|chest\s*hurts|can'?t\s*breathe|fainting|passed\s*out|heavy\s*bleeding)\b/i;

const APP_ACTION =
  /\b(log|track|record|add|enter|save|sync|connect|pair|start\s+tracking)\b.*\b(symptom|mood|bp|blood\s*pressure|heart\s*rate|bpm|period|weight|medication|wearable|watch|fitbit)\b/i;
const APP_ACTION_ALT =
  /\b(log\s+(my\s+)?symptoms?|track\s+(my\s+)?(bp|mood|heart)|record\s+(my\s+)?(bp|bpm)|set\s+a\s+reminder|enable\s+notifications)\b/i;

const VITALS_QUERY =
  /\b(is|are)\s+(\d{2,3}\s*\/\s*\d{2,3}|\d{2,3}\s*bpm)\s+(normal|high|low|ok|okay)\b/i;
const VITALS_READING =
  /\b(my\s+)?(bp|blood\s*pressure)\s*(is|was|reading|at)?\s*\d{2,3}\s*\/\s*\d{2,3}\b/i;
const VITALS_HR = /\b(my\s+)?(heart\s*rate|pulse|bpm)\s*(is|was)?\s*\d{2,3}\b/i;
const VITALS_TREND =
  /\b(heart\s*rate|bpm|blood\s*pressure|bp)\s*(trend|average|over\s*time|this\s*week)\b/i;
const VITALS_IS_MY =
  /\b(is\s+my\s+(bp|blood\s*pressure)\s+(high|low|normal|ok))\b/i;
const VITALS_NORMAL =
  /\b(is)\s+(a\s+)?(\d{2,3}\s*\/\s*\d{2,3})\s+(a\s+)?(normal)\s+(blood\s*pressure|bp)\b/i;

const MOOD_SUPPORT =
  /\b(i'?m|i am|i feel|feeling)\s*(sad|down|low|anxious|stressed|overwhelmed|worried|lonely|off)\b/i;
const MOOD_GENERAL = /\b(bad\s+day|rough\s+day|not\s+okay|not\s+ok|feel\s+(down|off))\b/i;
const RELATIONSHIP_DISTRESS =
  /\b(broke\s+up|breakup|break\s+up|dumped|left\s+me|heartbroken|ex\s+(boy|girl)friend)\b/i;

const DOCTOR_PREP =
  /\b(ask\s+(my\s+)?(doctor|ob|midwife|provider)|questions?\s+for\s+(my\s+)?(doctor|ob|midwife|visit|appointment)|prepare\s+for\s+(my\s+)?(appointment|visit|cardiology|prenatal)|what\s+(should\s+i\s+)?ask\s+(my\s+)?(ob|doctor)|what\s+to\s+tell\s+my\s+doctor|doctor\s+appointment|visit\s+summary|doctor\s+summary|write\s+a\s+doctor)\b/i;

const DEFINITIONAL =
  /^\s*(what\s+is|what\s+are|define|explain|tell\s+me\s+about|how\s+does)\b/i;

const RAG_TOPIC =
  /\b(pregnan|postpartum|prenatal|maternal|cardio|cardiovascular|heart\s+health|heart\s+disease|preeclampsia|gestational|peripartum|pcos|polycystic|hypertension|cholesterol|lipid|women'?s\s+heart|maternal\s+mortality|postpartum\s+cardio)\b/i;
const RAG_QUESTION =
  /\b(signs\s+of|symptoms\s+of|risk\s+of|how\s+to\s+prevent|what\s+causes|why\s+do\s+women|labs?\s+for|screening\s+for|treatment\s+for|complications?\s+of|symptoms\s+to\s+watch)\b/i;
const RAG_PERSONAL_KB = /\b(do\s+i\s+have|could\s+i\s+have|am\s+i\s+at\s+risk)\b/i;

const OUT_OF_SCOPE =
  /\b(weather|bitcoin|stock\s+market|homework|recipe|cook|football|movie|joke|poem|write\s+code|python\s+script|who\s+is\s+the\s+president)\b/i;

const GREETING = /^(hi|hello|hey|good\s*(morning|afternoon|evening)|thanks|thank\s+you)\b[!.?\s]*$/i;

/** Rule-based only  SAFETY_TRIAGE always evaluated first. */
export function classifyChatMode(message: string): ModeClassification {
  const trimmed = message.trim();
  const lower = trimmed.toLowerCase();

  const safety = checkSafetyTriage(trimmed, lower);
  if (safety) return safety;

  const nav = detectNavigationIntent(trimmed);
  if (nav.isNavigation && nav.confidence >= 0.65 && nav.screen) {
    return wrap("NAVIGATION", "navigation", 0.92, [], [], nav.screen, "app screen navigation");
  }

  if (APP_ACTION.test(lower) || APP_ACTION_ALT.test(lower)) {
    return wrap("APP_ACTION", "app_action", 0.88, inferTopics(trimmed, "unknown"), extractSymptoms(trimmed), undefined, "log/track/sync action");
  }

  const personal = /\b(i'?m|i am|i have|my|am i)\b/i.test(lower);

  if (DEFINITIONAL.test(trimmed) && !personal && !/\b(do i have|could i have)\b/i.test(lower)) {
    return wrap("BASIC_EDUCATION", "informational", 0.8, inferTopics(trimmed, "informational"), [], undefined, "definitional education");
  }

  if (DEFINITIONAL.test(trimmed) && /\b(do i have|could i have)\b/i.test(lower)) {
    return wrap("RAG_MEDICAL", classifyMedicalIntent(trimmed), 0.82, inferTopics(trimmed, "unknown"), extractSymptoms(trimmed), undefined, "what-is plus personal risk question");
  }

  if (
    VITALS_QUERY.test(lower) ||
    VITALS_READING.test(lower) ||
    VITALS_HR.test(lower) ||
    VITALS_TREND.test(lower) ||
    VITALS_IS_MY.test(lower) ||
    VITALS_NORMAL.test(lower) ||
    /\b(is|are)\s+\d{2,3}\s*bpm\s+too\s+(high|low)\b/i.test(lower)
  ) {
    return wrap("VITALS_CHECK", "vitals", 0.86, ["cardiovascular"], extractSymptoms(trimmed), undefined, "vitals interpretation");
  }

  if (
    MOOD_SUPPORT.test(lower) ||
    MOOD_GENERAL.test(lower) ||
    RELATIONSHIP_DISTRESS.test(lower)
  ) {
    return wrap("MOOD_SUPPORT", "mood", 0.84, ["mental_health"], [], undefined, "emotional support");
  }

  if (DOCTOR_PREP.test(lower)) {
    return wrap("DOCTOR_PREP", "doctor_prep", 0.87, inferTopics(trimmed, "unknown"), [], undefined, "appointment preparation");
  }

  if (
    isNonAcuteEmergencyMention(trimmed) &&
    /\b(heart|cardiovascular|heartattack|stroke|attack|pcos|cardio)\b/i.test(lower)
  ) {
    return wrap(
      "RAG_MEDICAL",
      classifyMedicalIntent(trimmed),
      0.8,
      inferTopics(trimmed, "unknown"),
      extractSymptoms(trimmed),
      undefined,
      "prevention or hypothetical cardiovascular question"
    );
  }

  if (GREETING.test(trimmed)) {
    return wrap("OUT_OF_SCOPE", "unknown", 0.9, [], [], undefined, "greeting");
  }

  if (OUT_OF_SCOPE.test(lower)) {
    return wrap("OUT_OF_SCOPE", "unknown", 0.9, [], [], undefined, "non-health topic");
  }

  if (RAG_TOPIC.test(lower) || RAG_QUESTION.test(lower) || RAG_PERSONAL_KB.test(lower)) {
    return wrap("RAG_MEDICAL", classifyMedicalIntent(trimmed), 0.82, inferTopics(trimmed, "unknown"), extractSymptoms(trimmed), undefined, "medical knowledge base");
  }

  const symptoms = extractSymptoms(trimmed);
  if (personal && symptoms.length > 0) {
    return wrap("SAFETY_TRIAGE", "symptom_question", 0.78, inferTopics(trimmed, "symptom_question"), symptoms, undefined, "personal symptom report");
  }

  if (DEFINITIONAL.test(trimmed)) {
    return wrap("BASIC_EDUCATION", "informational", 0.7, [], [], undefined, "definitional with personal framing");
  }

  if (symptoms.length > 0 || RAG_TOPIC.test(lower)) {
    return wrap("RAG_MEDICAL", classifyMedicalIntent(trimmed), 0.65, inferTopics(trimmed, "unknown"), symptoms, undefined, "medical default");
  }

  return wrap("OUT_OF_SCOPE", "unknown", 0.5, [], [], undefined, "unclassified redirect");
}

function isEducationalMedicalQuery(trimmed: string, lower: string): boolean {
  if (DEFINITIONAL.test(trimmed)) return true;
  if (RAG_QUESTION.test(lower)) return true;
  if (isNonAcuteEmergencyMention(trimmed)) return true;
  if (/\b(signs|symptoms|warning)\s+of\b/i.test(lower) && !PERSONAL_ACUTE.test(lower)) {
    return true;
  }
  if (/\bwarning signs\b/i.test(lower) && !/\b(i|my)\s+have\b/i.test(lower)) return true;
  if (/\bwhy\s+do\s+women\b/i.test(lower)) return true;
  if (/\b(things?\s+(to|i\s+can)\s+do|what\s+can\s+i\s+do)\s+at\s+home\b/i.test(lower)) {
    return true;
  }
  return false;
}

function checkSafetyTriage(trimmed: string, lower: string): ModeClassification | null {
  if (CRISIS_MENTAL.some((p) => p.test(trimmed))) {
    return wrap("SAFETY_TRIAGE", "mental_health", 0.98, ["mental_health"], [], undefined, "crisis mental health");
  }

  const educational = isEducationalMedicalQuery(trimmed, lower);
  const emergency = detectEmergency(trimmed);
  if (emergency.isEmergency && !educational) {
    return wrap("SAFETY_TRIAGE", "emergency", 0.97, ["emergency"], [], undefined, "emergency detector");
  }

  if (/\b(pregnan|postpartum)\b/i.test(lower) && /\b(blurr(y|ed)|blurry)\s*vision\b/i.test(lower)) {
    return wrap("SAFETY_TRIAGE", "emergency", 0.94, ["pregnancy", "emergency"], [], undefined, "pregnancy vision red flag");
  }

  if (/\bmy\s+chest\s+hurts\b/i.test(lower) || /\bchest\s+hurts\s+so\s+bad\b/i.test(lower)) {
    return wrap("SAFETY_TRIAGE", "emergency", 0.96, ["emergency"], ["chest pain"], undefined, "chest pain personal");
  }

  if (
    !isNonAcuteEmergencyMention(trimmed) &&
    (ACUTE_URGENT.test(lower) ||
      EXTREME_SWELLING.test(lower) ||
      DANGEROUS_BP.test(lower) ||
      PREGNANCY_DANGER.test(lower) ||
      PERSONAL_ACUTE.test(lower))
  ) {
    return wrap(
      "SAFETY_TRIAGE",
      "emergency",
      0.95,
      ["emergency"],
      extractSymptoms(trimmed),
      undefined,
      "urgent red-flag symptom"
    );
  }

  return null;
}

function classifyMedicalIntent(message: string): MedicalIntent {
  const lower = message.toLowerCase();
  if (/\b(pcos|polycystic)\b/i.test(message)) return "pcos";
  if (/\b(pregnan|postpartum|prenatal)\b/i.test(message)) return "pregnancy";
  if (/\b(heart|cardio|blood pressure|cholesterol)\b/i.test(message)) return "cardiovascular";
  if (/\b(medication|medicine|drug)\b/i.test(message)) return "medication";
  if (/\b(do i have|signs of|symptoms of)\b/i.test(lower)) return "symptom_question";
  return "unknown";
}

function wrap(
  mode: ChatMode,
  intent: MedicalIntent,
  confidence: number,
  topics: IntentClassification["topics"],
  symptoms: string[],
  navigationScreen: AppScreen | undefined,
  reason: string
): ModeClassification {
  return {
    mode,
    reason,
    classification: {
      intent,
      confidence,
      topics: topics.length ? topics : inferTopics("", intent),
      symptoms,
      secondaryIntents: [],
      navigationScreen,
    },
  };
}
