import { mockPatient, mockVitals } from "@/lib/vitals";
import type { VitalReading, VitalStatus } from "@/types/vitals";

export type AlertLevel = "none" | "caution" | "critical";

export interface MetricsSnapshot {
  updatedAt: string;
  updatedLabel: string;
  heartRate: VitalReading;
  bloodPressure: VitalReading;
  oxygen: VitalReading;
  alertLevel: AlertLevel;
  alertTitle: string;
  alertMessage: string;
}

export interface LockedBaseline {
  id: string;
  label: string;
  value: string;
  unit: string;
  lockedLabel: string;
}

export interface WeekForecastDay {
  day: string;
  strain: "low" | "moderate" | "elevated";
  note: string;
}

export const LOCKED_BASELINES: LockedBaseline[] = [
  {
    id: "hr-base",
    label: "Resting heart rate",
    value: "72",
    unit: "bpm",
    lockedLabel: "Pre-conception · locked",
  },
  {
    id: "hrv-base",
    label: "HRV",
    value: "48",
    unit: "ms",
    lockedLabel: "Pre-conception · locked",
  },
  {
    id: "rr-base",
    label: "Respiratory rate",
    value: "14",
    unit: "/min",
    lockedLabel: "Mirror scan baseline",
  },
];

function statusToSeverity(status: VitalStatus): number {
  if (status === "high") return 2;
  if (status === "elevated") return 1;
  return 0;
}

function deriveAlert(vitals: VitalReading[]): Pick<
  MetricsSnapshot,
  "alertLevel" | "alertTitle" | "alertMessage"
> {
  const maxSeverity = Math.max(...vitals.map((v) => statusToSeverity(v.status)));

  if (maxSeverity >= 2) {
    return {
      alertLevel: "critical",
      alertTitle: "Action required",
      alertMessage:
        "Readings are outside safe range. Contact your care team if you have headache, vision changes, swelling, or shortness of breath (PPCM can mimic normal fatigue).",
    };
  }

  if (maxSeverity >= 1) {
    return {
      alertLevel: "caution",
      alertTitle: "Elevated — monitor closely",
      alertMessage:
        "Your heart is working harder today — common in the 3rd trimester, but worth a recheck in 30 minutes and logging any symptoms.",
    };
  }

  return {
    alertLevel: "none",
    alertTitle: "Healthy range",
    alertMessage:
      "Current readings align with your pregnancy profile. Locked baselines are unchanged.",
  };
}

/** Single source of truth for demo vitals across Home, Health, and Lifeline */
export function getLiveVitals(): VitalReading[] {
  return mockVitals;
}

export function buildMetricsSnapshot(): MetricsSnapshot {
  const heartRate = mockVitals.find((v) => v.kind === "heart_rate")!;
  const oxygen = mockVitals.find((v) => v.kind === "oxygen")!;
  const bloodPressure = mockVitals.find((v) => v.kind === "blood_pressure")!;
  const coreVitals = [bloodPressure, heartRate, oxygen];
  const alert = deriveAlert(coreVitals);
  const updatedAt = new Date().toISOString();

  return {
    updatedAt,
    updatedLabel: "Updated just now",
    heartRate,
    bloodPressure,
    oxygen,
    ...alert,
  };
}

export function getWeekForecast(): WeekForecastDay[] {
  const snapshot = buildMetricsSnapshot();
  const elevated = snapshot.alertLevel !== "none";

  return [
    {
      day: "Today",
      strain: elevated ? "elevated" : "low",
      note: elevated
        ? "BP trend + sleep debt suggest higher cardiovascular load."
        : "Stable vs locked baselines.",
    },
    { day: "Tue", strain: elevated ? "moderate" : "low", note: "Watch BP if symptoms appear." },
    { day: "Wed", strain: "moderate", note: "Typical 3rd-trimester variability." },
    { day: "Thu", strain: "low", note: "Recovery window if rest improves sleep." },
    { day: "Fri", strain: "moderate", note: "Weight + activity may nudge strain." },
    { day: "Sat", strain: "low", note: "Favorable if vitals recheck normal." },
    { day: "Sun", strain: elevated ? "elevated" : "moderate", note: "Weekly pattern review for care team." },
  ];
}

export function heartStatusLabel(level: AlertLevel): string {
  if (level === "critical") return "Critical";
  if (level === "caution") return "Elevated";
  return "Healthy";
}

export { mockPatient };
