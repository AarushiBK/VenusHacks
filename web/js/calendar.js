/**
 * Scan history calendar + trend (improving / stable / rising)
 */

import { formatBaselineDisplay } from "./metrics-helpers.js?v=1";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function scanDateKey(scan) {
  const ts = scan.saved_at || scan.timestamp;
  if (!ts) return null;
  const d = typeof ts === "number" ? new Date(ts) : new Date(ts);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 10);
}

function deriveQuality(scan) {
  const existing = scan.quality;
  if (existing && existing !== "unknown" && existing !== "legacy_preview") {
    if (existing === "too_short") return "poor";
    return existing;
  }
  const sqi = scan.sqi ?? scan.confidence;
  if (sqi == null) return "marginal";
  if (sqi >= 0.55) return "good";
  if (sqi >= 0.4) return "marginal";
  return "poor";
}

function qualityLabel(q) {
  if (q === "good") return "Good";
  if (q === "marginal") return "OK";
  if (q === "poor" || q === "too_short") return "Weak";
  return "—";
}

function pickBestScanPerDay(scans) {
  const byDay = new Map();
  for (const s of scans) {
    if (!s.bpm) continue;
    const key = scanDateKey(s);
    if (!key) continue;
    const prev = byDay.get(key);
    const q = deriveQuality(s);
    const score =
      (q === "good" ? 3 : q === "marginal" ? 2 : 1) + (s.sqi ?? s.confidence ?? 0);
    const prevScore = prev
      ? (prev._calScore ?? 0)
      : -1;
    if (score >= prevScore) {
      byDay.set(key, { ...s, quality: q, _calScore: score });
    }
  }
  return byDay;
}

function latestDayKey(byDay) {
  const keys = [...byDay.keys()].sort();
  return keys.length ? keys[keys.length - 1] : null;
}

function computeTrend(scansByDay, phase) {
  const keys = [...scansByDay.keys()].sort();
  const trustworthy = keys
    .map((k) => scansByDay.get(k))
    .filter((s) => s.bpm && deriveQuality(s) !== "poor");
  if (trustworthy.length < 4) {
    return { label: "Building trend", detail: "Need more good daily scans", dir: "neutral" };
  }
  const bpms = trustworthy.map((s) => s.bpm);
  const recent = bpms.slice(-7);
  const prior = bpms.slice(-14, -7);
  if (prior.length < 2) {
    return { label: "Tracking", detail: `${trustworthy.length} scans logged`, dir: "neutral" };
  }
  const avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
  const delta = avg(recent) - avg(prior);
  const thresh = phase === "pregnancy" ? 4 : 3;

  if (delta <= -thresh) {
    return {
      label: "Improving",
      detail: `HR down ~${Math.abs(Math.round(delta))} BPM vs prior week`,
      dir: "down",
    };
  }
  if (delta >= thresh) {
    const note =
      phase === "pregnancy"
        ? "Rising HR can be normal in later pregnancy — discuss if concerned"
        : `HR up ~${Math.round(delta)} BPM vs prior week`;
    return { label: "Rising", detail: note, dir: "up" };
  }
  return {
    label: "Stable",
    detail: "Within your recent range",
    dir: "stable",
  };
}

export function renderCalendar(container, scans, baseline, options = {}) {
  const byDay = pickBestScanPerDay(scans);
  const anchorKey = latestDayKey(byDay);
  const anchorDate = anchorKey
    ? new Date(`${anchorKey}T12:00:00`)
    : options.anchorDate
      ? new Date(options.anchorDate)
      : new Date();
  let year = anchorDate.getFullYear();
  let month = anchorDate.getMonth();

  const trend = computeTrend(byDay, baseline?.phase || "pregnancy");

  function renderMonth() {
    const first = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startPad = first.getDay();
    const monthPrefix = `${year}-${String(month + 1).padStart(2, "0")}`;

    let cells = "";
    for (let i = 0; i < startPad; i++) cells += `<div class="cal-cell cal-empty"></div>`;
    for (let d = 1; d <= daysInMonth; d++) {
      const key = `${monthPrefix}-${String(d).padStart(2, "0")}`;
      const scan = byDay.get(key);
      let cls = "cal-cell cal-day";
      let inner = String(d);
      if (scan) {
        const q = deriveQuality(scan);
        cls += ` cal-has cal-${q}`;
        inner = `<span class="cal-num">${d}</span><span class="cal-bpm">${Math.round(scan.bpm)}</span>`;
      }
      const today = new Date();
      const isToday =
        year === today.getFullYear() && month === today.getMonth() && d === today.getDate();
      if (isToday) cls += " cal-today";
      cells += `<button type="button" class="${cls}" data-day="${key}" ${scan ? "" : "disabled"}>${inner}</button>`;
    }

    container.innerHTML = `
      <div class="cal-header">
        <button type="button" class="cal-nav" data-cal="-1" aria-label="Previous month">‹</button>
        <span class="cal-title">${MONTHS[month]} ${year}</span>
        <button type="button" class="cal-nav" data-cal="1" aria-label="Next month">›</button>
      </div>
      <div class="cal-trend cal-trend-${trend.dir}">
        <span class="cal-trend-label">${trend.label}</span>
        <span class="cal-trend-detail">${trend.detail}</span>
      </div>
      <div class="cal-weekdays">
        <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
      </div>
      <div class="cal-grid">${cells}</div>
      <div class="cal-legend">
        <span><i class="dot good"></i> Good</span>
        <span><i class="dot marginal"></i> OK</span>
        <span><i class="dot poor"></i> Weak</span>
      </div>
      <p id="calDetail" class="cal-detail">Tap a highlighted day · colors from signal quality (SQI)</p>
    `;

    container.querySelectorAll("[data-cal]").forEach((btn) => {
      btn.addEventListener("click", () => {
        month += Number(btn.dataset.cal);
        if (month > 11) {
          month = 0;
          year++;
        }
        if (month < 0) {
          month = 11;
          year--;
        }
        renderMonth();
        bindDayClicks();
      });
    });
  }

  function bindDayClicks() {
    container.querySelectorAll(".cal-day.cal-has").forEach((btn) => {
      btn.addEventListener("click", () => {
        const scan = byDay.get(btn.dataset.day);
        if (!scan) return;
        const el = container.querySelector("#calDetail");
        const sqi = scan.sqi ?? scan.confidence;
        const hrv =
          scan.hrv_rmssd_ms != null
            ? `${Math.round(scan.hrv_rmssd_ms)} ms HRV`
            : sqi < 0.55
              ? "HRV unavailable (low signal)"
              : "No HRV";
        const vs = formatBaselineDisplay(scan, baseline);
        const q = deriveQuality(scan);
        el.textContent = `${btn.dataset.day}: ${Math.round(scan.bpm)} BPM · ${qualityLabel(q)} scan · ${vs} · ${hrv}`;
      });
    });
  }

  renderMonth();
  bindDayClicks();
}

