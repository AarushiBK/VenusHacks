import type { AppScreen, MedicalTopicTag } from "../types";

/** Primary chatbot intent modes (rule-classified, no Gemini). */
export type ChatMode =
  | "SAFETY_TRIAGE"
  | "RAG_MEDICAL"
  | "BASIC_EDUCATION"
  | "VITALS_CHECK"
  | "MOOD_SUPPORT"
  | "DOCTOR_PREP"
  | "NAVIGATION"
  | "APP_ACTION"
  | "OUT_OF_SCOPE";

export type MedicalIntent =
  | "symptom_question"
  | "emergency"
  | "mental_health"
  | "informational"
  | "navigation"
  | "vitals"
  | "mood"
  | "doctor_prep"
  | "app_action"
  | "pregnancy"
  | "medication"
  | "pcos"
  | "cardiovascular"
  | "unknown";

export interface IntentClassification {
  intent: MedicalIntent;
  confidence: number;
  topics: MedicalTopicTag[];
  symptoms: string[];
  secondaryIntents: MedicalIntent[];
  /** Set when mode is NAVIGATION */
  navigationScreen?: AppScreen;
}

export interface ModeClassification {
  mode: ChatMode;
  classification: IntentClassification;
  reason: string;
}

export interface IntentRouteLog {
  intent: ChatMode;
  route: string;
  reason: string;
  ragUsed: boolean;
  chunkCount: number;
  geminiCalled: boolean;
}
