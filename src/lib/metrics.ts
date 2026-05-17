import type { VitalReading, VitalStatus } from "@/types/vitals";
import { mockPatient, mockVitals } from "@/lib/vitals";

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
      alertTitle: "Attention needed",
      alertMessage:
        "One or more readings are outside safe range. Contact your care team if you have headache, vision changes, or sudden swelling.",
    };
  }

  if (maxSeverity >= 1) {
    return {
      alertLevel: "caution",
      alertTitle: "Worth watching",
      alertMessage:
        "A reading is slightly elevated. Rest, hydrate, and recheck in 30 minutes. Reach out if it persists.",
    };
  }

  return {
    alertLevel: "none",
    alertTitle: "Looking steady",
    alertMessage: "All current readings are within your expected range.",
  };
}

/** Synthetic metrics snapshot — elevated BP scenario for demo caution state */
export const metricsSnapshot: MetricsSnapshot = (() => {
  const heartRate = mockVitals.find((v) => v.kind === "heart_rate")!;
  const oxygen = mockVitals.find((v) => v.kind === "oxygen")!;
  const bloodPressure: VitalReading = {
    ...mockVitals.find((v) => v.kind === "blood_pressure")!,
    value: "138",
    secondaryValue: "88",
    status: "elevated",
    statusLabel: "Slightly elevated",
    recordedAt: new Date().toISOString(),
    note: "Above ideal pregnancy target of 140/90 — monitor closely",
  };

  const coreVitals = [bloodPressure, heartRate, oxygen];
  const alert = deriveAlert(coreVitals);

  return {
    updatedAt: new Date().toISOString(),
    updatedLabel: "Updated just now",
    heartRate,
    bloodPressure,
    oxygen,
    ...alert,
  };
})();

export { mockPatient };
