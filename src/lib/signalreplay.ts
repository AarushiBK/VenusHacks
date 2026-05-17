export type SignalSeverity = "low" | "moderate" | "elevated" | "critical";
export type SystemResponse = "ignored" | "low" | "monitor" | "moderate" | "elevated" | "critical_context" | "escalating" | "not_asked" | "compounding";

export interface SignalEvent {
  id: string;
  day: number;
  signal: string;
  detail: string;
  urgentCare: { label: string; level: SystemResponse };
  thresholdAI: { label: string; level: SystemResponse };
  carechain: { label: string; level: SystemResponse };
  carechainNote: string;
}

export interface InterpretationRow {
  id: string;
  signal: string;
  urgentCare: { label: string; level: SystemResponse };
  thresholdAI: { label: string; level: SystemResponse };
  carechain: { label: string; level: SystemResponse };
}

export interface ContinuityEvent {
  id: string;
  label: string;
  provider: string;
  date: string;
  note: string;
  status: "connected" | "gap" | "missed" | "unresolved";
}

export const SIGNAL_EVENTS: SignalEvent[] = [
  {
    id: "s1",
    day: 1,
    signal: "Fatigue",
    detail: "Postpartum day 1. Exhaustion noted.",
    urgentCare: { label: "Expected postpartum", level: "low" },
    thresholdAI: { label: "Within normal range", level: "low" },
    carechain: { label: "Noted — baseline established", level: "low" },
    carechainNote: "Establishing physiological context.",
  },
  {
    id: "s2",
    day: 5,
    signal: "Mild dizziness",
    detail: "Reported during routine check. BP 124/80.",
    urgentCare: { label: "Monitor", level: "monitor" },
    thresholdAI: { label: "Monitor symptoms", level: "monitor" },
    carechain: { label: "Postpartum context weighted", level: "moderate" },
    carechainNote: "Dizziness in week 1 postpartum warrants tracking — not isolation.",
  },
  {
    id: "s3",
    day: 8,
    signal: "Sleep disruption",
    detail: "Persistent insomnia, 3–4 hrs/night.",
    urgentCare: { label: "Unrelated — new mother", level: "ignored" },
    thresholdAI: { label: "Not flagged", level: "ignored" },
    carechain: { label: "Compounding factor", level: "elevated" },
    carechainNote: "Chronic sleep disruption elevates cardiovascular signal weight in postpartum window.",
  },
  {
    id: "s4",
    day: 11,
    signal: "Elevated BP",
    detail: "138/90 recorded at home. Headache.",
    urgentCare: { label: "Borderline — recheck", level: "monitor" },
    thresholdAI: { label: "Moderate concern", level: "moderate" },
    carechain: { label: "Escalating trajectory", level: "escalating" },
    carechainNote: "Combined with fatigue, dizziness, sleep disruption in week 2 postpartum — pattern is forming.",
  },
  {
    id: "s5",
    day: 14,
    signal: "Chest discomfort",
    detail: "Brief tightness. Dismissed as anxiety.",
    urgentCare: { label: "Low concern — likely anxiety", level: "low" },
    thresholdAI: { label: "Monitor symptoms", level: "monitor" },
    carechain: { label: "Pattern detected", level: "critical_context" },
    carechainNote: "5-signal escalation over 14 days. Postpartum cardiovascular interpretation trajectory warrants clinical attention.",
  },
];

export const INTERPRETATION_ROWS: InterpretationRow[] = [
  {
    id: "fatigue",
    signal: "Fatigue",
    urgentCare: { label: "Low", level: "low" },
    thresholdAI: { label: "Low", level: "low" },
    carechain: { label: "Moderate (postpartum ctx)", level: "moderate" },
  },
  {
    id: "hrv",
    signal: "HRV irregularity",
    urgentCare: { label: "Ignored", level: "ignored" },
    thresholdAI: { label: "Ignored", level: "ignored" },
    carechain: { label: "Elevated", level: "elevated" },
  },
  {
    id: "postpartum_week",
    signal: "Postpartum week 2",
    urgentCare: { label: "Not asked", level: "not_asked" },
    thresholdAI: { label: "Not factored", level: "ignored" },
    carechain: { label: "Critical context", level: "critical_context" },
  },
  {
    id: "sleep",
    signal: "Sleep disruption",
    urgentCare: { label: "Minimal", level: "low" },
    thresholdAI: { label: "Minimal", level: "low" },
    carechain: { label: "Compounding factor", level: "compounding" },
  },
  {
    id: "trajectory",
    signal: "Symptom trajectory",
    urgentCare: { label: "None modeled", level: "ignored" },
    thresholdAI: { label: "None modeled", level: "ignored" },
    carechain: { label: "Escalating", level: "escalating" },
  },
];

export const SYSTEM_VERDICTS = {
  urgentCare: "Continue monitoring symptoms.",
  thresholdAI: "Monitor symptoms. Recheck BP in 72 hours.",
  carechain: "Interpretation mismatch detected. Contextual escalation pattern warrants cardiovascular follow-up.",
};

export const CONTINUITY_EVENTS: ContinuityEvent[] = [
  {
    id: "c1",
    label: "OB discharge",
    provider: "OB",
    date: "Week 0",
    note: "BP 138/88. Hypertensive disorder noted.",
    status: "connected",
  },
  {
    id: "c2",
    label: "OB 2-week visit",
    provider: "OB",
    date: "Week 2",
    note: "BP 140/90. Referred to PCP.",
    status: "connected",
  },
  {
    id: "c3",
    label: "ER visit",
    provider: "ER",
    date: "Week 3",
    note: "Headache + dizziness. No obstetric history reviewed.",
    status: "gap",
  },
  {
    id: "c4",
    label: "PCP follow-up",
    provider: "PCP",
    date: "Week 6",
    note: "Appointment not attended. No outreach.",
    status: "missed",
  },
  {
    id: "c5",
    label: "Urgent care",
    provider: "Urgent Care",
    date: "Week 8",
    note: "Fatigue + BP 144/92. Postpartum history not flagged.",
    status: "gap",
  },
  {
    id: "c6",
    label: "Symptom recurrence",
    provider: "None",
    date: "Week 12",
    note: "Chest discomfort. No care contact made.",
    status: "unresolved",
  },
];

export const CONTINUITY_INSIGHT =
  "Maternal cardiovascular harm is rarely one bad moment. It is a chain of disconnected moments that no single provider ever sees in full.";
