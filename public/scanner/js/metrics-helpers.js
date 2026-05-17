/** Format latest scan + baseline for hub metrics */

export function hrvFromScan(scan) {
  if (!scan) return null;
  if (scan.hrv_rmssd_ms != null) return scan.hrv_rmssd_ms;
  const d = scan.hrv_detail;
  if (d?.rmssd != null) return d.rmssd;
  return null;
}

export function formatHrvDisplay(scan) {
  const ms = hrvFromScan(scan);
  if (ms != null) return `${Math.round(ms)} ms`;
  const sqi = scan?.sqi ?? scan?.confidence;
  if (sqi != null && sqi < 0.55) return "Needs SQI 55%+";
  if (!scan?.engine?.includes?.("open-rppg") && scan?.source !== "iphone_web_open_rppg") {
    return "Face scan only";
  }
  return "—";
}

export function formatBaselineDisplay(scan, baseline) {
  if (!scan?.bpm) return "—";
  const ref = baseline?.reference_bpm;
  if (ref != null) {
    const d = Math.round(scan.bpm - ref);
    if (Math.abs(d) <= 8) return "On baseline";
    return d > 0 ? `+${d} BPM` : `${d} BPM`;
  }
  const roll = baseline?.rolling_median_bpm;
  if (roll != null && baseline?.scan_count >= 2) {
    const d = Math.round(scan.bpm - roll);
    return `~${d >= 0 ? "+" : ""}${d} vs recent`;
  }
  if (baseline?.phase === "pre_pregnancy") return "Lock baseline";
  return "Set reference";
}
