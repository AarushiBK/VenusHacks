export const BRAND = {
  name: "VitaCore",
  tagline: "The Maternal Cardiovascular Continuity Infrastructure",
} as const;

export const POSITIONING = {
  not: ["A symptom tracker.", "An AI doctor."],
  instead:
    "An intelligence layer that connects fragmented maternal cardiovascular care before deterioration becomes catastrophic.",
};

export const EARLY_WARNING_CONDITIONS = [
  "Gestational hypertension",
  "Preeclampsia",
  "Postpartum BP instability",
  "Chronic inflammation",
  "PCOS / metabolic dysfunction",
];

export const GAPS_FIXED = [
  { id: "interpretation", label: "Interpretation gaps" },
  { id: "followup", label: "Follow-up gaps" },
  { id: "education", label: "Education gaps" },
  { id: "continuity", label: "Continuity gaps" },
  { id: "escalation", label: "Escalation gaps" },
] as const;
