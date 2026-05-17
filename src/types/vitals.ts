export type VitalStatus = "normal" | "elevated" | "high";

export type VitalKind =
  | "blood_pressure"
  | "heart_rate"
  | "oxygen"
  | "weight"
  | "temperature";

export interface VitalReading {
  id: string;
  kind: VitalKind;
  label: string;
  unit: string;
  value: string;
  secondaryValue?: string;
  recordedAt: string;
  status: VitalStatus;
  statusLabel: string;
  trend?: "up" | "down" | "stable";
  note?: string;
}

export interface PatientContext {
  name: string;
  phase: "pregnant" | "postpartum";
  detail: string;
}
