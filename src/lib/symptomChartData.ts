import { getLocalDateKey, getLogDateKey } from "./symptomLogsStorage";
import type { SymptomLogEntry } from "../types/symptoms";

export type ChartPeriod = "W" | "M" | "6M" | "Y";

export interface ChartBucket {
  id: string;
  label: string;
  /** Mood 0–100 averaged across logs in this bucket; null if no logs */
  averageMood: number | null;
  entryCount: number;
  rangeStart: string;
  rangeEnd?: string;
}

function parseDateKey(key: string): Date {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function averageMood(entries: SymptomLogEntry[]): number | null {
  if (entries.length === 0) return null;
  const sum = entries.reduce((acc, e) => acc + e.mood, 0);
  return Math.round((sum / entries.length) * 10) / 10;
}

/** Sunday 00:00 local for the week containing `date`. */
export function startOfWeekSunday(date: Date): Date {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  d.setDate(d.getDate() - d.getDay());
  return d;
}

function entriesOnDateKey(entries: SymptomLogEntry[], dateKey: string): SymptomLogEntry[] {
  return entries.filter((e) => getLogDateKey(e) === dateKey);
}

function entriesBetweenInclusive(
  entries: SymptomLogEntry[],
  start: Date,
  end: Date,
): SymptomLogEntry[] {
  const startMs = start.getTime();
  const endMs = end.getTime();
  return entries.filter((e) => {
    const t = parseDateKey(getLogDateKey(e)).getTime();
    return t >= startMs && t <= endMs;
  });
}

/** Current calendar week: Sunday → Saturday (7 days), one average per day. */
export function buildWeekBuckets(entries: SymptomLogEntry[]): ChartBucket[] {
  const weekStart = startOfWeekSunday(new Date());
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"] as const;

  return dayLabels.map((label, index) => {
    const day = new Date(weekStart);
    day.setDate(day.getDate() + index);
    const dateKey = getLocalDateKey(day);
    const dayEntries = entriesOnDateKey(entries, dateKey);
    return {
      id: dateKey,
      label,
      averageMood: averageMood(dayEntries),
      entryCount: dayEntries.length,
      rangeStart: dateKey,
    };
  });
}

export interface CalendarDayCell {
  dateKey: string;
  dayOfMonth: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  averageMood: number | null;
  entryCount: number;
}

export interface CalendarMonthData {
  year: number;
  month: number;
  monthLabel: string;
  weekdayLabels: readonly string[];
  weeks: CalendarDayCell[][];
}

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"] as const;

function calendarDayCell(
  date: Date,
  isCurrentMonth: boolean,
  todayKey: string,
  entries: SymptomLogEntry[],
): CalendarDayCell {
  const dateKey = getLocalDateKey(date);
  const dayEntries = entriesOnDateKey(entries, dateKey);
  return {
    dateKey,
    dayOfMonth: date.getDate(),
    isCurrentMonth,
    isToday: dateKey === todayKey,
    averageMood: averageMood(dayEntries),
    entryCount: dayEntries.length,
  };
}

/** Current calendar month as a Sun–Sat grid with one mood dot per day. */
export function buildCalendarMonth(
  entries: SymptomLogEntry[],
  refDate: Date = new Date(),
): CalendarMonthData {
  const year = refDate.getFullYear();
  const month = refDate.getMonth();
  const todayKey = getLocalDateKey(refDate);
  const firstOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leadingEmpty = firstOfMonth.getDay();

  const cells: CalendarDayCell[] = [];

  for (let i = 0; i < leadingEmpty; i += 1) {
    const date = new Date(year, month, 1 - (leadingEmpty - i));
    cells.push(calendarDayCell(date, false, todayKey, entries));
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month, day);
    cells.push(calendarDayCell(date, true, todayKey, entries));
  }

  let trailingDay = 1;
  while (cells.length % 7 !== 0) {
    const date = new Date(year, month + 1, trailingDay);
    trailingDay += 1;
    cells.push(calendarDayCell(date, false, todayKey, entries));
  }

  const weeks: CalendarDayCell[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  return {
    year,
    month,
    monthLabel: firstOfMonth.toLocaleDateString(undefined, {
      month: "long",
      year: "numeric",
    }),
    weekdayLabels: WEEKDAY_LABELS,
    weeks,
  };
}

export function totalEntriesInCalendarMonth(data: CalendarMonthData): number {
  return data.weeks
    .flat()
    .filter((d) => d.isCurrentMonth)
    .reduce((sum, d) => sum + d.entryCount, 0);
}

/** Last 6 calendar months, one average mood dot per month. */
export function buildSixMonthBuckets(entries: SymptomLogEntry[]): ChartBucket[] {
  const buckets: ChartBucket[] = [];
  const now = new Date();

  for (let m = 5; m >= 0; m -= 1) {
    const monthStart = new Date(now.getFullYear(), now.getMonth() - m, 1);
    const monthEnd = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0);
    const monthEntries = entriesBetweenInclusive(entries, monthStart, monthEnd);

    buckets.push({
      id: `${monthStart.getFullYear()}-${String(monthStart.getMonth() + 1).padStart(2, "0")}`,
      label: monthStart.toLocaleDateString(undefined, { month: "short" }).toUpperCase(),
      averageMood: averageMood(monthEntries),
      entryCount: monthEntries.length,
      rangeStart: getLocalDateKey(monthStart),
      rangeEnd: getLocalDateKey(monthEnd),
    });
  }

  return buckets;
}

/** Last 12 calendar months, one average per month. */
export function buildYearBuckets(entries: SymptomLogEntry[]): ChartBucket[] {
  const buckets: ChartBucket[] = [];
  const now = new Date();

  for (let m = 11; m >= 0; m -= 1) {
    const monthStart = new Date(now.getFullYear(), now.getMonth() - m, 1);
    const monthEnd = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0);
    const monthEntries = entriesBetweenInclusive(entries, monthStart, monthEnd);

    buckets.push({
      id: `${monthStart.getFullYear()}-${String(monthStart.getMonth() + 1).padStart(2, "0")}`,
      label: monthStart.toLocaleDateString(undefined, { month: "short" }),
      averageMood: averageMood(monthEntries),
      entryCount: monthEntries.length,
      rangeStart: getLocalDateKey(monthStart),
      rangeEnd: getLocalDateKey(monthEnd),
    });
  }

  return buckets;
}

export function buildChartBuckets(
  entries: SymptomLogEntry[],
  period: ChartPeriod,
): ChartBucket[] {
  switch (period) {
    case "W":
      return buildWeekBuckets(entries);
    case "M":
      return [];
    case "6M":
      return buildSixMonthBuckets(entries);
    case "Y":
      return buildYearBuckets(entries);
  }
}

export function formatBucketRange(buckets: ChartBucket[], period: ChartPeriod): string {
  if (buckets.length === 0) return "No data yet";

  const withData = buckets.filter((b) => b.entryCount > 0);
  if (withData.length === 0) {
    const first = parseDateKey(buckets[0]!.rangeStart);
    const lastKey = buckets[buckets.length - 1]!.rangeEnd ?? buckets[buckets.length - 1]!.rangeStart;
    const last = parseDateKey(lastKey);
    return formatSpan(first, last, period);
  }

  const first = parseDateKey(withData[0]!.rangeStart);
  const lastKey =
    withData[withData.length - 1]!.rangeEnd ?? withData[withData.length - 1]!.rangeStart;
  const last = parseDateKey(lastKey);
  return formatSpan(first, last, period);
}

function formatSpan(start: Date, end: Date, period: ChartPeriod): string {
  const opts: Intl.DateTimeFormatOptions =
    period === "Y"
      ? { month: "short", year: "numeric" }
      : { month: "short", day: "numeric", year: period === "6M" ? "numeric" : undefined };

  const fmt = (d: Date) => d.toLocaleDateString(undefined, opts);
  if (start.getTime() === end.getTime()) return fmt(start);
  return `${fmt(start)} – ${fmt(end)}`;
}

export function totalEntriesInBuckets(buckets: ChartBucket[]): number {
  return buckets.reduce((sum, b) => sum + b.entryCount, 0);
}

/** Which x-axis labels to show when buckets are dense */
export function shouldShowBucketLabel(_index: number, total: number, period: ChartPeriod): boolean {
  if (total <= 7) return true;
  if (period === "M") {
    return false;
  }
  if (period === "6M") {
    return true;
  }
  if (period === "Y") {
    return true;
  }
  return true;
}
