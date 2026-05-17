import type { SymptomDefinition } from "../types/symptoms";

export const SYMPTOMS_CATALOG: SymptomDefinition[] = [
  {
    id: "headache",
    label: "Headache that won't go away or gets worse over time",
    icon: "🧠",
    keywords: ["headache", "migraine", "head pain"],
    urgent: true,
  },
  {
    id: "dizziness",
    label: "Dizziness or fainting",
    icon: "😵‍💫",
    keywords: ["dizzy", "faint", "lightheaded", "vertigo"],
    urgent: true,
  },
  {
    id: "vision",
    label: "Changes in your vision",
    icon: "👁️",
    keywords: ["vision", "blurry", "sight", "eyes"],
    urgent: true,
  },
  {
    id: "fever",
    label: "Fever of 100.4° F or higher",
    icon: "🌡️",
    keywords: ["fever", "temperature", "hot"],
    urgent: true,
  },
  {
    id: "swelling",
    label: "Extreme swelling of your hands or face",
    icon: "🤚",
    keywords: ["swelling", "edema", "puffy", "hands", "face"],
    urgent: true,
  },
  {
    id: "harm-thoughts",
    label: "Thoughts of harming yourself or your baby",
    icon: "💭",
    keywords: ["harm", "self-harm", "suicide", "thoughts"],
    urgent: true,
  },
  {
    id: "breathing",
    label: "Trouble breathing",
    icon: "🫁",
    keywords: ["breathing", "breathless", "shortness of breath", "dyspnea", "anxiety"],
    urgent: true,
  },
  {
    id: "chest-pain",
    label: "Chest pain or fast beating heart",
    icon: "💓",
    keywords: ["chest", "heart", "palpitations", "cardiac"],
    urgent: true,
  },
  {
    id: "nausea",
    label: "Severe nausea and throwing up",
    icon: "🤢",
    keywords: ["nausea", "vomit", "sick", "throwing up"],
    urgent: true,
  },
  {
    id: "belly-pain",
    label: "Severe belly pain that doesn't go away",
    icon: "🤰",
    keywords: ["belly", "abdominal", "stomach", "cramping"],
    urgent: true,
  },
  {
    id: "baby-movement",
    label: "Baby's movement stopping or slowing during pregnancy",
    icon: "👣",
    keywords: ["baby", "movement", "kick", "fetal"],
    urgent: true,
  },
  {
    id: "leg-pain",
    label: "Severe swelling, redness or pain of your leg or arm",
    icon: "🦵",
    keywords: ["leg", "arm", "clot", "dvt", "redness"],
    urgent: true,
  },
  {
    id: "bleeding-pregnancy",
    label: "Vaginal bleeding or fluid leaking during pregnancy",
    icon: "🩸",
    keywords: ["bleeding", "pregnancy", "leaking", "fluid"],
    urgent: true,
  },
  {
    id: "bleeding-postpartum",
    label: "Heavy vaginal bleeding or discharge after pregnancy",
    icon: "🩸",
    keywords: ["bleeding", "postpartum", "discharge", "after birth"],
    urgent: true,
  },
  {
    id: "tiredness",
    label: "Overwhelming tiredness",
    icon: "😴",
    keywords: ["tired", "fatigue", "exhausted", "weak"],
    urgent: true,
  },
];

export const POPULAR_SYMPTOM_IDS = ["breathing", "chest-pain", "headache", "swelling", "tiredness", "nausea"] as const;

export function getSymptomById(id: string): SymptomDefinition | undefined {
  return SYMPTOMS_CATALOG.find((s) => s.id === id);
}

const PILL_SHORT: Record<string, string> = {
  "headache": "Headache",
  dizziness: "Dizziness",
  vision: "Vision changes",
  fever: "Fever",
  swelling: "Face/hand swelling",
  "harm-thoughts": "Harm thoughts",
  breathing: "Trouble breathing",
  "chest-pain": "Chest pain",
  nausea: "Severe nausea",
  "belly-pain": "Belly pain",
  "baby-movement": "Baby movement",
  "leg-pain": "Leg/arm pain",
  "bleeding-pregnancy": "Bleeding (pregnancy)",
  "bleeding-postpartum": "Bleeding (postpartum)",
  tiredness: "Overwhelming tiredness",
};

export function getSymptomPillLabel(symptom: SymptomDefinition): string {
  return symptom.shortLabel ?? PILL_SHORT[symptom.id] ?? symptom.label;
}

export function searchSymptoms(query: string): SymptomDefinition[] {
  const q = query.trim().toLowerCase();
  if (!q) return SYMPTOMS_CATALOG;
  return SYMPTOMS_CATALOG.filter(
    (s) =>
      s.label.toLowerCase().includes(q) ||
      s.keywords.some((k) => k.includes(q) || q.includes(k)),
  );
}
