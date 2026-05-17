import type { PatientContext, VitalReading } from "@/types/vitals";

export const mockPatient: PatientContext = {
  name: "Alex",
  phase: "pregnant",
  detail: "Week 28 · 3rd trimester",
};

export const mockVitals: VitalReading[] = [
  {
    id: "bp-1",
    kind: "blood_pressure",
    label: "Blood pressure",
    unit: "mmHg",
    value: "118",
    secondaryValue: "76",
    recordedAt: "2026-05-16T08:42:00",
    status: "normal",
    statusLabel: "Within range",
    trend: "stable",
    note: "Pregnancy target: below 140/90",
  },
  {
    id: "hr-1",
    kind: "heart_rate",
    label: "Heart rate",
    unit: "bpm",
    value: "82",
    recordedAt: "2026-05-16T08:42:00",
    status: "normal",
    statusLabel: "Resting",
    trend: "down",
    note: "Typical pregnancy range: 70–90 bpm",
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
