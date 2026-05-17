import type { PatientContext, VitalReading } from "@/types/vitals";

export const mockPatient: PatientContext = {
  name: "Maya",
  phase: "postpartum",
  detail: "Week 6 postpartum · recovery tracking",
};

export const mockVitals: VitalReading[] = [
  {
    id: "bp-1",
    kind: "blood_pressure",
    label: "Blood pressure",
    unit: "mmHg",
    value: "132",
    secondaryValue: "86",
    recordedAt: "2026-06-08T08:42:00",
    status: "elevated",
    statusLabel: "Improving — still elevated",
    trend: "stable",
    note: "Pregnancy target: below 140/90",
  },
  {
    id: "hr-1",
    kind: "heart_rate",
    label: "Heart rate",
    unit: "bpm",
    value: "71",
    recordedAt: "2026-02-06T07:37:00",
    status: "normal",
    statusLabel: "Near pre-pregnancy baseline",
    trend: "down",
    note: "Mirror scan baseline 72 bpm · latest 71 bpm (postpartum recovery)",
  },
  {
    id: "spo2-1",
    kind: "oxygen",
    label: "Blood oxygen",
    unit: "%",
    value: "98",
    recordedAt: "2026-05-16T08:42:00",
    status: "normal",
    statusLabel: "Healthy",
    trend: "stable",
  },
  {
    id: "wt-1",
    kind: "weight",
    label: "Weight",
    unit: "lbs",
    value: "162",
    recordedAt: "2026-05-16T07:15:00",
    status: "normal",
    statusLabel: "On track",
    trend: "up",
    note: "+12 lbs since pre-pregnancy baseline",
  },
  {
    id: "temp-1",
    kind: "temperature",
    label: "Temperature",
    unit: "°F",
    value: "98.4",
    recordedAt: "2026-05-16T07:15:00",
    status: "normal",
    statusLabel: "Normal",
    trend: "stable",
  },
];

export function formatRecordedAt(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
