import { getSymptomLogs } from "@/lib/symptomLogsStorage";
import { mockVitals } from "@/lib/vitals";

export type WellnessLevel = "healthy" | "caution" | "critical";

export interface ScanSummary {
  latestBpm: number | null;
  referenceBpm: number | null;
  scanCount: number;
  deltaFromBaseline: number | null;
  recoveryLabel: string | null;
  recoveryZone: string | null;
  recoveryDetail: string | null;
  phase: string | null;
  rollingMedianBpm: number | null;
}

export interface WellnessAssessment {
  level: WellnessLevel;
  title: string;
  summary: string;
  signals: string[];
  scan: ScanSummary | null;
  symptomCount30d: number;
  urgentSymptomHits: number;
}

const URGENT_IDS = new Set(["headache", "vision", "swelling", "dizziness"]);

export function assessFromSymptomsAndVitals(
  scan: ScanSummary | null,
): WellnessAssessment {
  const logs = getSymptomLogs();
  const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const recent = logs.filter((l) => new Date(l.createdAt).getTime() >= cutoff);
  const urgentHits = recent.reduce((n, log) => {
    return n + log.symptomIds.filter((id) => URGENT_IDS.has(id)).length;
  }, 0);

  const elevatedVitals = mockVitals.some(
    (v) => v.status === "elevated" || v.status === "high",
  );

  let level: WellnessLevel = "healthy";
  const zone = scan?.recoveryZone;
  if (zone === "red" || urgentHits >= 2 || (scan?.deltaFromBaseline ?? 0) >= 18) {
    level = "critical";
  } else if (
    zone === "amber" ||
    urgentHits >= 1 ||
    elevatedVitals ||
    (scan?.deltaFromBaseline ?? 0) >= 12
  ) {
    level = "caution";
  }

  const signals: string[] = [];
  if (scan?.scanCount != null && scan.scanCount > 0) {
    signals.push(`${scan.scanCount} trustworthy mirror scan(s) in your timeline`);
  }
  if (scan?.latestBpm != null && scan.referenceBpm != null) {
    const d = scan.deltaFromBaseline ?? scan.latestBpm - scan.referenceBpm;
    signals.push(
      `Latest mirror scan: ${Math.round(scan.latestBpm)} bpm (${d >= 0 ? "+" : ""}${Math.round(d)} vs locked baseline ${Math.round(scan.referenceBpm)} bpm)`,
    );
  }
  if (scan?.recoveryLabel) {
    signals.push(
      `Recovery zone (${scan.phase ?? "postpartum"}): ${scan.recoveryLabel}${scan.recoveryDetail ? ` — ${scan.recoveryDetail}` : ""}`,
    );
  }
  if (scan?.rollingMedianBpm != null) {
    signals.push(`Rolling median HR from recent scans: ${Math.round(scan.rollingMedianBpm)} bpm`);
  }
  if (recent.length > 0) {
    signals.push(`${recent.length} symptom log(s) in the last 30 days`);
  }
  if (urgentHits > 0) {
    signals.push(`${urgentHits} urgent symptom flag(s) — preeclampsia watch list`);
  }
  const bp = mockVitals.find((v) => v.kind === "blood_pressure");
  if (bp) {
    signals.push(`Wearable BP snapshot: ${bp.value}/${bp.secondaryValue} mmHg (${bp.statusLabel})`);
  }

  const titles: Record<WellnessLevel, string> = {
    healthy: "Recovering — trending toward baseline",
    caution: "Elevated load — monitor closely",
    critical: "High-risk pattern — reach out to care team",
  };

  const summaries: Record<WellnessLevel, string> = {
    healthy:
      "Face scans, symptoms, and vitals are aligning with postpartum recovery. Keep daily scans and log any headache or vision changes.",
    caution:
      "Your heart rate ran higher through late pregnancy; symptoms and BP warrant closer follow-up. This is the stress test data that protects you long-term.",
    critical:
      "Combined mirror-scan elevation and urgent symptoms match patterns your care team should review soon (not a diagnosis).",
  };

  return {
    level,
    title: titles[level],
    summary: summaries[level],
    signals,
    scan,
    symptomCount30d: recent.length,
    urgentSymptomHits: urgentHits,
  };
}

export async function fetchScanSummary(): Promise<ScanSummary | null> {
  try {
    const [latestRes, baselineRes] = await Promise.all([
      fetch("/api/latest", { signal: AbortSignal.timeout(4000) }),
      fetch("/api/baseline?phase=postpartum", { signal: AbortSignal.timeout(4000) }),
    ]);
    if (!latestRes.ok || !baselineRes.ok) return null;

    const latest = (await latestRes.json()) as { bpm?: number };
    const baseline = (await baselineRes.json()) as {
      reference_bpm?: number;
      scan_count?: number;
      phase?: string;
      rolling_median_bpm?: number;
      recovery?: { label?: string; detail?: string; zone?: string };
    };

    const latestBpm = latest.bpm && latest.bpm > 0 ? latest.bpm : null;
    const referenceBpm = baseline.reference_bpm ?? null;
    const deltaFromBaseline =
      latestBpm != null && referenceBpm != null ? latestBpm - referenceBpm : null;

    return {
      latestBpm,
      referenceBpm,
      scanCount: baseline.scan_count ?? 0,
      deltaFromBaseline,
      recoveryLabel: baseline.recovery?.label ?? null,
      recoveryZone: baseline.recovery?.zone ?? null,
      recoveryDetail: baseline.recovery?.detail ?? null,
      phase: baseline.phase ?? null,
      rollingMedianBpm: baseline.rolling_median_bpm ?? null,
    };
  } catch {
    return null;
  }
}
