import type { MoodBucket } from "@/lib/moodLabels";
import { getMoodBucket } from "@/lib/moodLabels";
import type { SymptomDefinition } from "@/types/symptoms";
import { getSymptomById } from "./symptomsCatalog";

export const MOOD_DEFAULT_SYMPTOM_IDS: Record<MoodBucket, readonly string[]> = {
  very_unpleasant: [
    "chest-pain",
    "chest-pressure-squeezing",
    "racing-heart",
    "sudden-shortness-breath",
    "breathing",
    "harm-thoughts",
    "severe-panic",
    "detachment-reality",
    "headache",
    "dizziness-sudden",
    "fainting",
    "vision",
    "fever",
    "belly-pain",
    "swelling-extreme-body",
    "bleeding-pregnancy",
    "baby-movement",
    "bleeding-postpartum",
    "numbness-weakness-sudden",
  ],
  unpleasant: [
    "chest-discomfort-mild",
    "sob-light-activity",
    "swelling-ankles-feet",
    "dizziness-standing",
    "pain-radiating",
    "persistent-sadness",
    "emptiness-hopelessness",
    "constant-worrying",
    "high-anxiety",
    "intense-irritability",
    "anger",
    "insomnia",
    "sleeping-excessively",
    "feeling-overwhelmed",
    "nausea",
    "tiredness",
    "moderate-headache",
  ],
  slightly_unpleasant: [
    "easily-winded",
    "fatigue-routine-tasks",
    "puffiness-mild",
    "heart-flutters-occasional",
    "mild-stress",
    "burned-out",
    "mild-mood-swings",
    "low-motivation",
    "mild-brain-fog",
    "forgetfulness",
    "trouble-concentrating",
    "nausea-mild",
    "decreased-appetite",
    "fatigue-low-grade",
    "sluggishness",
    "muscle-aches-mild",
    "joint-stiffness",
    "tension-headache-mild",
  ],
  neutral: [
    "normal-energy",
    "steady-energy",
    "no-physical-pain",
    "no-physical-discomfort",
    "regular-sleep",
    "normal-appetite",
    "calm-mood",
    "emotionally-balanced",
    "manageable-stress",
    "clear-headedness",
  ],
  slightly_pleasant: [
    "relatively-energetic",
    "feeling-refreshed",
    "good-sleep-quality",
    "minimal-discomfort",
    "no-stiffness",
    "content-mood",
    "mild-optimism",
    "capable-daily-responsibilities",
    "clear-thoughts",
    "steady-mood",
  ],
  pleasant: [
    "high-energy",
    "physically-comfortable",
    "physically-thriving",
    "exercise-easily",
    "no-unusual-fatigue",
    "no-sob-movement",
    "happy",
    "motivated",
    "peaceful",
    "socially-connected",
    "stress-resilience-high",
  ],
  very_pleasant: [
    "peak-vitality",
    "peak-strength",
    "completely-rejuvenated",
    "exceptional-energy",
    "deep-joy",
    "highly-inspired",
    "highly-productive",
    "complete-mental-clarity",
    "excellent-emotional-wellbeing",
  ],
};

export function getDefaultSymptomsForMood(mood: number): SymptomDefinition[] {
  const bucket = getMoodBucket(mood);
  const ids = MOOD_DEFAULT_SYMPTOM_IDS[bucket];
  const seen = new Set<string>();
  const result: SymptomDefinition[] = [];

  for (const id of ids) {
    if (seen.has(id)) continue;
    const symptom = getSymptomById(id);
    if (!symptom) continue;
    seen.add(id);
    result.push(symptom);
  }

  return result;
}
