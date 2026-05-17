import type { AlertLevel } from "@/lib/cardioState";

export interface HeartPulseProps {
  bpm: number;
  alertLevel: AlertLevel;
}

export function pulseFrequencyHz(bpm: number): number {
  return Math.max(40, Math.min(180, bpm)) / 60;
}

export const HEART_MATERIAL: Record<
  AlertLevel,
  { color: string; emissive: string; emissiveIntensity: number }
> = {
  none: { color: "#c8e0d0", emissive: "#6b8f7a", emissiveIntensity: 0.22 },
  caution: { color: "#e8d4a8", emissive: "#c4843a", emissiveIntensity: 0.3 },
  critical: { color: "#e8a0a8", emissive: "#b84a52", emissiveIntensity: 0.38 },
};
