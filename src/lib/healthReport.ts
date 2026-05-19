import { getSymptomById, getSymptomPillLabel } from "@/constants/symptomsCatalog";
import { getAvgMetrics } from "@/lib/profile";
import { metricsSnapshot } from "@/lib/metrics";
import { getSymptomLogs } from "@/lib/symptomLogsStorage";
import { getSymptomLabelsForEntry } from "@/lib/symptomDisplay";
import { getMoodLabel } from "@/lib/moodLabels";
import type { ScanSummary } from "@/lib/demo/wellnessAssessment";
import { mockPatient } from "@/lib/vitals";
import type { SymptomLogEntry } from "@/types/symptoms";

export interface HealthReportOption {
  id: string;
  label: string;
  group: "metrics" | "symptoms";
  detail?: string;
  disabled?: boolean;
}

export function buildHealthReportOptions(
  scan: ScanSummary | null,
): HealthReportOption[] {
  const options: HealthReportOption[] = [];

  for (const m of getAvgMetrics()) {
    options.push({
      id: `metric-${m.id}`,
      label: m.label,
      group: "metrics",
      detail: `${m.value}${m.unit ? ` · ${m.unit}` : ""}`,
    });
  }

  const snap = metricsSnapshot;
  options.push({
    id: "metric-current-vitals",
    label: "Current vitals snapshot",
    group: "metrics",
    detail: `BP ${snap.bloodPressure.value}/${snap.bloodPressure.secondaryValue} mmHg · HR ${snap.heartRate.value} bpm · SpO₂ ${snap.oxygen.value}%`,
  });

  if (snap.alertLevel !== "none") {
    options.push({
      id: "metric-alert",
      label: snap.alertTitle ?? "Health alert",
      group: "metrics",
      detail: snap.alertMessage,
    });
  }

  if (scan && (scan.latestBpm != null || scan.scanCount > 0)) {
    const bpm =
      scan.latestBpm != null ? `${Math.round(scan.latestBpm)} bpm` : "—";
    const delta =
      scan.deltaFromBaseline != null
        ? ` (${scan.deltaFromBaseline >= 0 ? "+" : ""}${Math.round(scan.deltaFromBaseline)} vs baseline)`
        : "";
    options.push({
      id: "metric-face-scan",
      label: "Face scan (Metrics tab)",
      group: "metrics",
      detail: `Latest ${bpm}${delta} · ${scan.scanCount} scan(s)`,
    });
    if (scan.recoveryLabel) {
      options.push({
        id: "metric-recovery-zone",
        label: "Recovery zone",
        group: "metrics",
        detail: `${scan.recoveryLabel}${scan.recoveryDetail ? ` — ${scan.recoveryDetail}` : ""}`,
      });
    }
  }

  const logs = getSymptomLogs();
  const symptomStats = aggregateSymptomStats(logs);

  if (symptomStats.length === 0) {
    options.push({
      id: "symptom-empty",
      label: "No symptoms logged yet",
      group: "symptoms",
      detail: "Log on the Symptoms tab to include them in reports",
      disabled: true,
    });
  } else {
    for (const stat of symptomStats) {
      options.push({
        id: `symptom-${stat.key}`,
        label: stat.label,
        group: "symptoms",
        detail: `Logged ${stat.count} time${stat.count === 1 ? "" : "s"}`,
      });
    }
    options.push({
      id: "symptom-timeline",
      label: "Full symptom log timeline",
      group: "symptoms",
      detail: `${logs.length} entr${logs.length === 1 ? "y" : "ies"}`,
    });
  }

  return options;
}

function aggregateSymptomStats(logs: SymptomLogEntry[]) {
  const map = new Map<
    string,
    { label: string; count: number; urgent?: boolean }
  >();

  for (const log of logs) {
    for (const id of log.symptomIds) {
      const def = getSymptomById(id);
      const label = def ? getSymptomPillLabel(def) : id;
      const prev = map.get(id);
      if (prev) prev.count += 1;
      else map.set(id, { label, count: 1, urgent: def?.urgent });
    }
    for (const custom of log.customSymptoms ?? []) {
      const key = `custom:${custom.toLowerCase()}`;
      const prev = map.get(key);
      if (prev) prev.count += 1;
      else map.set(key, { label: custom, count: 1 });
    }
  }

  return [...map.entries()]
    .map(([key, v]) => ({ key, ...v }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

export function defaultSelectedReportIds(
  options: HealthReportOption[],
): Set<string> {
  return new Set(
    options.filter((o) => !o.disabled).map((o) => o.id),
  );
}

export function buildReportPreviewLines(
  selectedIds: Set<string>,
  scan: ScanSummary | null,
): string[] {
  const lines: string[] = [];
  const snap = metricsSnapshot;

  if (selectedIds.has("metric-bp")) {
    const m = getAvgMetrics().find((x) => x.id === "bp");
    lines.push(`Blood pressure (avg): ${m?.value ?? "—"} mmHg`);
  }
  if (selectedIds.has("metric-hr")) {
    const m = getAvgMetrics().find((x) => x.id === "hr");
    lines.push(`Heart rate (avg): ${m?.value ?? "—"} bpm`);
  }
  if (selectedIds.has("metric-spo2")) {
    const m = getAvgMetrics().find((x) => x.id === "spo2");
    lines.push(`Blood oxygen (avg): ${m?.value ?? "—"}%`);
  }
  if (selectedIds.has("metric-weight")) {
    const m = getAvgMetrics().find((x) => x.id === "weight");
    lines.push(`Weight (avg): ${m?.value ?? "—"} lbs`);
  }
  if (selectedIds.has("metric-current-vitals")) {
    lines.push(
      `Current vitals: BP ${snap.bloodPressure.value}/${snap.bloodPressure.secondaryValue} mmHg (${snap.bloodPressure.statusLabel}); HR ${snap.heartRate.value} bpm; SpO₂ ${snap.oxygen.value}%`,
    );
  }
  if (selectedIds.has("metric-alert") && snap.alertLevel !== "none") {
    lines.push(`Alert: ${snap.alertMessage}`);
  }
  if (selectedIds.has("metric-face-scan") && scan) {
    if (scan.latestBpm != null) {
      lines.push(
        `Face scan: ${Math.round(scan.latestBpm)} bpm${scan.deltaFromBaseline != null ? ` (${scan.deltaFromBaseline >= 0 ? "+" : ""}${Math.round(scan.deltaFromBaseline)} vs baseline ${scan.referenceBpm != null ? Math.round(scan.referenceBpm) : "—"} bpm)` : ""}`,
      );
    }
    if (scan.scanCount > 0) {
      lines.push(`Trustworthy mirror scans on record: ${scan.scanCount}`);
    }
  }
  if (selectedIds.has("metric-recovery-zone") && scan?.recoveryLabel) {
    lines.push(
      `Recovery zone (${scan.phase ?? "postpartum"}): ${scan.recoveryLabel}${scan.recoveryDetail ? ` — ${scan.recoveryDetail}` : ""}`,
    );
  }

  const logs = getSymptomLogs();
  const stats = aggregateSymptomStats(logs);

  for (const stat of stats) {
    if (selectedIds.has(`symptom-${stat.key}`)) {
      lines.push(
        `Symptom — ${stat.label}: logged ${stat.count} time${stat.count === 1 ? "" : "s"}${stat.urgent ? " (urgent flag)" : ""}`,
      );
    }
  }

  if (selectedIds.has("symptom-timeline") && logs.length > 0) {
    const recent = logs.slice(0, 12);
    lines.push("Symptom log timeline (most recent):");
    for (const log of recent) {
      const labels = getSymptomLabelsForEntry(log);
      const mood = getMoodLabel(log.mood);
      const when = new Date(log.createdAt).toLocaleString([], {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
      const body =
        labels.length > 0 ? labels.join(", ") : `Mood: ${mood}`;
      lines.push(`  · ${when} (${log.kind}): ${body}`);
    }
    if (logs.length > recent.length) {
      lines.push(`  · …and ${logs.length - recent.length} earlier entries`);
    }
  }

  return lines;
}

export function buildReportDocument(params: {
  selectedIds: Set<string>;
  scan: ScanSummary | null;
  note: string;
  recipientName: string;
  recipientClinic: string;
  recipientPhone: string;
}): string {
  const {
    selectedIds,
    scan,
    note,
    recipientName,
    recipientClinic,
    recipientPhone,
  } = params;

  const sections: string[] = [
    "VitaCore maternal cardiovascular care report",
    `Patient: ${mockPatient.name} · ${mockPatient.detail}`,
    `Generated: ${new Date().toLocaleString()}`,
    "",
    "Primary health provider:",
    recipientName,
    recipientClinic,
    recipientPhone,
    "",
    "— Included data —",
    ...buildReportPreviewLines(selectedIds, scan),
  ];

  if (note.trim()) {
    sections.push("", "Patient note:", note.trim());
  }

  sections.push(
    "",
    "Demo transmission — no PHI sent over the network in this build.",
  );

  return sections.join("\n");
}
