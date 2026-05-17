import { mockVitals } from "@/lib/vitals";

export type MetricId = "bp" | "hr" | "spo2" | "weight";
export type MetricTimeframe = "D" | "W" | "M" | "6M" | "Y";

export interface MetricHistoryPoint {
  id: string;
  date: Date;
  dateISO: string;
  label: string;
  sublabel?: string;
  value: string;
  numeric: number;
}

export function usesCalendarView(timeframe: MetricTimeframe): boolean {
  return timeframe !== "D";
}

export interface MetricHistoryDetail {
  id: MetricId;
  label: string;
  unit: string;
  accent: "rose" | "sage" | "amber";
  timeframe: MetricTimeframe;
  headline: string;
  headlineSub?: string;
  points: MetricHistoryPoint[];
}

const METRIC_META: Record<
  MetricId,
  { label: string; unit: string; accent: "rose" | "sage" | "amber"; base: number; spread: number }
> = {
  bp: { label: "Blood pressure", unit: "mmHg", accent: "rose", base: 118, spread: 12 },
  hr: { label: "Heart rate", unit: "bpm", accent: "sage", base: 82, spread: 10 },
  spo2: { label: "Blood oxygen", unit: "%", accent: "amber", base: 98, spread: 2 },
  weight: { label: "Weight", unit: "lbs", accent: "amber", base: 162, spread: 4 },
};

function seededNoise(index: number, spread: number): number {
  const wave = Math.sin(index * 1.7) * spread * 0.45;
  const bump = (index % 3) * (spread * 0.12);
  return Math.round(wave + bump);
}

function formatBp(systolic: number): { value: string; numeric: number } {
  const diastolic = Math.max(60, Math.round(systolic * 0.62));
  return { value: `${systolic}/${diastolic}`, numeric: systolic };
}

function formatValue(id: MetricId, n: number): { value: string; numeric: number } {
  if (id === "bp") return formatBp(n);
  if (id === "spo2") return { value: String(Math.min(100, Math.max(92, n))), numeric: n };
  return { value: String(n), numeric: n };
}

function countForTimeframe(tf: MetricTimeframe): number {
  switch (tf) {
    case "D":
      return 1;
    case "W":
      return 7;
    case "M":
      return 30;
    case "6M":
      return 6;
    case "Y":
      return 12;
  }
}

function labelForPoint(
  tf: MetricTimeframe,
  date: Date,
  index: number,
  total: number,
): { label: string; sublabel?: string } {
  if (tf === "D") {
    return {
      label: date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      }),
      sublabel: date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
    };
  }
  if (tf === "W") {
    return {
      label: date.toLocaleDateString("en-US", { weekday: "short" }),
      sublabel: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    };
  }
  if (tf === "M") {
    return {
      label: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      sublabel:
        index === total - 1
          ? "Today"
          : date.toLocaleDateString("en-US", { weekday: "short" }),
    };
  }
  if (tf === "6M") {
    return {
      label: date.toLocaleDateString("en-US", { month: "short" }),
      sublabel: date.toLocaleDateString("en-US", { year: "numeric" }),
    };
  }
  return {
    label: date.toLocaleDateString("en-US", { month: "long" }),
    sublabel: String(date.getFullYear()),
  };
}

function stepDays(tf: MetricTimeframe): number {
  switch (tf) {
    case "D":
      return 0;
    case "W":
      return 1;
    case "M":
      return 1;
    case "6M":
      return 30;
    case "Y":
      return 30;
  }
}

export function getMetricHistory(
  metricId: MetricId,
  timeframe: MetricTimeframe,
): MetricHistoryDetail {
  const meta = METRIC_META[metricId];
  const vital = mockVitals.find((v) => {
    if (metricId === "bp") return v.kind === "blood_pressure";
    if (metricId === "hr") return v.kind === "heart_rate";
    if (metricId === "spo2") return v.kind === "oxygen";
    return v.kind === "weight";
  });

  const vitalBase =
    metricId === "bp"
      ? Number(vital?.value ?? meta.base)
      : Number(vital?.value ?? meta.base);

  const now = new Date();
  const points: MetricHistoryPoint[] = [];

  if (timeframe === "M") {
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d, 9, 0, 0, 0);
      const raw = vitalBase + seededNoise(d + month * 31, meta.spread);
      const formatted = formatValue(metricId, raw);
      const dateISO = toDateISO(date);
      points.push({
        id: `${metricId}-M-${dateISO}`,
        date,
        dateISO,
        label: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        sublabel:
          d === daysInMonth
            ? "Today"
            : date.toLocaleDateString("en-US", { weekday: "short" }),
        value: formatted.value,
        numeric: formatted.numeric,
      });
    }
  } else {
    const count = countForTimeframe(timeframe);
    const step = stepDays(timeframe);

    for (let i = 0; i < count; i++) {
      const date = new Date(now);
      if (timeframe === "D") {
        date.setHours(8, 42, 0, 0);
      } else if (timeframe === "Y" || timeframe === "6M") {
        date.setMonth(now.getMonth() - (count - 1 - i));
        date.setDate(1);
        date.setHours(12, 0, 0, 0);
      } else {
        date.setDate(now.getDate() - (count - 1 - i) * step);
        date.setHours(9, 0, 0, 0);
      }

      const raw =
        vitalBase +
        seededNoise(i + count, meta.spread) +
        (i === count - 1 ? 0 : seededNoise(i, 3));
      const formatted = formatValue(metricId, raw);
      const { label, sublabel } = labelForPoint(timeframe, date, i, count);
      const dateISO = toDateISO(date);

      points.push({
        id: `${metricId}-${timeframe}-${dateISO}-${i}`,
        date: new Date(date),
        dateISO,
        label,
        sublabel,
        value: formatted.value,
        numeric: formatted.numeric,
      });
    }
  }

  const numerics = points.map((p) => p.numeric);
  const avg = Math.round(numerics.reduce((a, b) => a + b, 0) / numerics.length);
  const headlineFormatted = formatValue(metricId, avg);

  let headlineSub: string | undefined;
  if (metricId === "bp") {
    if (timeframe === "D") headlineSub = "Avg systolic · today";
    else if (timeframe === "M") headlineSub = "Avg systolic · this month";
    else if (timeframe === "6M") headlineSub = "Avg systolic · past 6 months";
    else headlineSub = `Avg systolic · last ${timeframeLabel(timeframe)}`;
  } else {
    headlineSub =
      timeframe === "D"
        ? "Latest reading"
        : timeframe === "M"
          ? "Average · this month"
          : timeframe === "6M"
            ? "Average · past 6 months"
            : `Average · ${timeframeLabel(timeframe)}`;
  }

  return {
    id: metricId,
    label: meta.label,
    unit: meta.unit,
    accent: meta.accent,
    timeframe,
    headline: headlineFormatted.value,
    headlineSub,
    points: timeframe === "D" ? points.slice(-1) : points,
  };
}

function timeframeLabel(tf: MetricTimeframe): string {
  switch (tf) {
    case "D":
      return "day";
    case "W":
      return "7 days";
    case "M":
      return "this month";
    case "6M":
      return "6 months";
    case "Y":
      return "year";
  }
}

export const METRIC_TIMEFRAMES: MetricTimeframe[] = ["D", "W", "M", "6M", "Y"];

export function isMetricId(id: string): id is MetricId {
  return id === "bp" || id === "hr" || id === "spo2" || id === "weight";
}

export function toDateISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Month key for grouping calendar cells */
export function toMonthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

/** Daily readings for one calendar month (used when drilling from year view). */
export function getDailyPointsForMonth(
  metricId: MetricId,
  year: number,
  month: number,
): MetricHistoryPoint[] {
  const meta = METRIC_META[metricId];
  const vital = mockVitals.find((v) => {
    if (metricId === "bp") return v.kind === "blood_pressure";
    if (metricId === "hr") return v.kind === "heart_rate";
    if (metricId === "spo2") return v.kind === "oxygen";
    return v.kind === "weight";
  });
  const vitalBase =
    metricId === "bp"
      ? Number(vital?.value ?? meta.base)
      : Number(vital?.value ?? meta.base);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const points: MetricHistoryPoint[] = [];

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d, 9, 0, 0, 0);
    const raw = vitalBase + seededNoise(d + month * 31, meta.spread);
    const formatted = formatValue(metricId, raw);
    const dateISO = toDateISO(date);
    points.push({
      id: `${metricId}-day-${dateISO}`,
      date,
      dateISO,
      label: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      sublabel: date.toLocaleDateString("en-US", { weekday: "short" }),
      value: formatted.value,
      numeric: formatted.numeric,
    });
  }

  return points;
}
