import { mockPatient, mockVitals } from "@/lib/vitals";
import { metricsSnapshot } from "@/lib/metrics";

export const profileUser = {
  name: mockPatient.name,
  detail: mockPatient.detail,
  initials: mockPatient.name.slice(0, 1).toUpperCase(),
};

export type AvgMetricAccent = "rose" | "sage" | "amber";

export interface AvgMetricCard {
  id: string;
  label: string;
  value: string;
  unit?: string;
  accent: AvgMetricAccent;
}

function bpDisplay(): string {
  const bp = mockVitals.find((v) => v.kind === "blood_pressure");
  if (!bp?.secondaryValue) return bp?.value ?? "—";
  return `${bp.value}/${bp.secondaryValue}`;
}

export function getAvgMetrics(): AvgMetricCard[] {
  const hr = mockVitals.find((v) => v.kind === "heart_rate");
  const spo2 = mockVitals.find((v) => v.kind === "oxygen");
  const weight = mockVitals.find((v) => v.kind === "weight");

  return [
    {
      id: "bp",
      label: "Blood pressure",
      value: bpDisplay(),
      unit: "mmHg avg",
      accent: "rose",
    },
    {
      id: "hr",
      label: "Heart rate",
      value: hr?.value ?? "—",
      unit: "bpm avg",
      accent: "sage",
    },
    {
      id: "spo2",
      label: "Blood oxygen",
      value: spo2?.value ?? "—",
      unit: "% avg",
      accent: "amber",
    },
    {
      id: "weight",
      label: "Weight",
      value: weight?.value ?? "—",
      unit: "lbs avg",
      accent: "amber",
    },
  ];
}

import { DEFAULT_ACCOUNT_EMAIL, DEFAULT_EMERGENCY_CONTACTS } from "@/lib/profileStorage";

export { DEFAULT_EMERGENCY_CONTACTS as EMERGENCY_CONTACTS };

export const ACCOUNT_SETTINGS = {
  email: DEFAULT_ACCOUNT_EMAIL,
};

export function getProfileHealthSummary(): string[] {
  const snapshot = metricsSnapshot;
  return [
    `${snapshot.bloodPressure.label}: ${snapshot.bloodPressure.value}/${snapshot.bloodPressure.secondaryValue} ${snapshot.bloodPressure.unit}`,
    `${snapshot.heartRate.label}: ${snapshot.heartRate.value} ${snapshot.heartRate.unit}`,
    `${snapshot.oxygen.label}: ${snapshot.oxygen.value}${snapshot.oxygen.unit}`,
  ];
}

export function getProfileAwarenessItems(): string[] {
  const snapshot = metricsSnapshot;
  if (snapshot.alertLevel === "critical") {
    return [snapshot.alertMessage];
  }
  const elevated = mockVitals.filter(
    (v) => v.status === "elevated" || v.status === "high",
  );
  if (elevated.length > 0) {
    return elevated.map((v) => `${v.label.toLowerCase()} — ${v.statusLabel}`);
  }
  return [
    "No urgent patterns in today's vitals.",
    "Continue daily BP checks; log symptoms if headache or vision changes appear.",
  ];
}
