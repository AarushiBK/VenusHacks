/**
 * Wearable & health platform integration stubs.
 * Implement native modules for Apple HealthKit / Google Fit in production builds.
 */

export interface VitalReading {
  type: "heartRate" | "bloodPressure" | "steps" | "sleep";
  value: number | { systolic: number; diastolic: number };
  unit: string;
  timestamp: number;
  source: "apple_health" | "google_fit" | "wearable";
}

export async function fetchRecentVitals(): Promise<VitalReading[]> {
  // TODO: bridge to HealthKit / Health Connect
  return [];
}

export async function syncWearableData(): Promise<{ synced: boolean; count: number }> {
  return { synced: false, count: 0 };
}

export function formatVitalsForContext(vitals: VitalReading[]): string {
  if (vitals.length === 0) return "";
  return vitals
    .map((v) => {
      const val =
        typeof v.value === "object"
          ? `${v.value.systolic}/${v.value.diastolic}`
          : String(v.value);
      return `${v.type}: ${val} ${v.unit} (${v.source})`;
    })
    .join("\n");
}
