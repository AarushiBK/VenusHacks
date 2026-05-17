export const MOTHERBOARD = {
  name: "MOTHERBOARD",
  tagline: "The Lifelong Cardiovascular Passport",
} as const;

export const CORE_INSIGHT = {
  headline: "Pregnancy is the first cardiovascular stress test of a woman's life.",
  problem: "But healthcare systems discard that data after delivery.",
  punchline: "Motherboard preserves it as long-term cardiovascular memory.",
};

export const TRANSFORMATION = {
  from: ["Pregnancy events", "Postpartum events"],
  to: "Lifelong cardiovascular intelligence",
  system: "A persistent maternal cardiovascular memory system.",
};

export const EXAMPLE_SCENARIO = {
  history: [
    { id: "gh", label: "Gestational hypertension", year: "2022" },
    { id: "bp", label: "Elevated BP", year: "2022–2023" },
    { id: "rec", label: "Poor recovery markers", year: "2023" },
  ],
  yearsLater:
    "These patterns may increase long-term cardiovascular monitoring importance.",
  framing:
    "Pregnancy data → preventive heart-health infrastructure.",
};

export const FEATURES = [
  {
    id: "timeline",
    title: "Cardiovascular timeline",
    description: "Every maternal cardio event, preserved across life stages.",
  },
  {
    id: "recovery",
    title: "Postpartum recovery graph",
    description: "Track BP and recovery trajectories week by week after delivery.",
  },
  {
    id: "education",
    title: "Risk education engine",
    description: "Contextual explainers tied to your history — not generic tips.",
  },
  {
    id: "pathway",
    title: "Personalized prevention pathway",
    description: "Sleep, BP cadence, stress, and follow-up — all contextualized.",
  },
] as const;

export const TIMELINE_EVENTS = [
  { id: "1", label: "First pregnancy", phase: "Pregnancy", year: "2022", status: "ok" as const },
  { id: "2", label: "Gestational hypertension", phase: "Pregnancy", year: "2022", status: "caution" as const },
  { id: "3", label: "Elevated BP — postpartum", phase: "Postpartum", year: "2023", status: "caution" as const },
  { id: "4", label: "Recovery plateau", phase: "Postpartum", year: "2023", status: "caution" as const },
  { id: "5", label: "Cardiovascular profile preserved", phase: "Memory", year: "2023", status: "ok" as const },
  { id: "6", label: "Long-term monitoring relevance", phase: "Years later", year: "2026", status: "insight" as const },
];

export const RECOVERY_DATA = [
  { week: 0, bp: 142, wellness: 45 },
  { week: 2, bp: 138, wellness: 52 },
  { week: 4, bp: 132, wellness: 58 },
  { week: 6, bp: 128, wellness: 65 },
  { week: 8, bp: 124, wellness: 72 },
  { week: 12, bp: 120, wellness: 78 },
];

export const REPLAY_PATHWAYS = [
  { id: "pregnancy", label: "Pregnancy events", events: ["Gestational hypertension", "Elevated BP"] },
  { id: "path1", label: "Long-term monitoring", outcome: "Increased cardiovascular follow-up importance" },
  { id: "path2", label: "Lifestyle framing", outcome: "Sleep, activity & stress patterns matter more" },
  { id: "path3", label: "Preventive education", outcome: "Earlier screening conversations with care team" },
];
