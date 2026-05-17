import type { MedicalTopicTag } from "../types";
import type { MedicalIntent } from "./types";

const SYMPTOM_PATTERNS: { pattern: RegExp; label: string }[] = [
  { pattern: /\bchest\s*pain\b/i, label: "chest pain" },
  { pattern: /\bstomach\s*pain\b|\babdominal\s*pain\b/i, label: "abdominal pain" },
  { pattern: /\bshortness of breath\b|\bcan'?t breathe\b/i, label: "shortness of breath" },
  { pattern: /\bheadache\b/i, label: "headache" },
  { pattern: /\bhair\s*(thin|loss|falling)\b|\bthinning\s*hair\b/i, label: "hair loss" },
  { pattern: /\bperiod\s*pain\b|\bcramps\b/i, label: "menstrual cramps" },
  { pattern: /\bdizzy\b|\bdizziness\b/i, label: "dizziness" },
  { pattern: /\bswelling\b/i, label: "swelling" },
  { pattern: /\bfatigue\b|\btired\b/i, label: "fatigue" },
  { pattern: /\bpalpitations?\b/i, label: "palpitations" },
];

export function extractSymptoms(message: string): string[] {
  const found: string[] = [];
  for (const { pattern, label } of SYMPTOM_PATTERNS) {
    if (pattern.test(message) && !found.includes(label)) found.push(label);
  }
  return found;
}

export function inferTopics(message: string, intent: MedicalIntent): MedicalTopicTag[] {
  const q = message.toLowerCase();
  const topics = new Set<MedicalTopicTag>();

  if (intent === "pcos") topics.add("pcos");
  if (intent === "cardiovascular") topics.add("cardiovascular");
  if (intent === "pregnancy") topics.add("pregnancy");
  if (intent === "mental_health") topics.add("mental_health");
  if (intent === "medication") topics.add("medication");
  if (intent === "symptom_question") topics.add("symptoms");

  if (/\b(pcos|polycystic)\b/i.test(q)) topics.add("pcos");
  if (/\b(heart|chest|cardio|blood pressure|hypertension)\b/i.test(q)) {
    topics.add("cardiovascular");
  }
  if (/\b(pregnan|prenatal|postpartum|maternal)\b/i.test(q)) topics.add("pregnancy");
  if (/\b(stomach|abdominal|nausea|digest|gi\b)\b/i.test(q)) topics.add("digestive");
  if (/\b(hair|skin|acne)\b/i.test(q)) topics.add("dermatology");
  if (/\b(hormon|thyroid|estrogen|progesterone|period|menstrual)\b/i.test(q)) {
    topics.add("hormones");
  }
  if (/\b(sad|depress|anxiet|hopeless|suicid|die\b|dead\b)\b/i.test(q)) {
    topics.add("mental_health");
  }

  if (topics.size === 0) topics.add("general");
  return Array.from(topics);
}
