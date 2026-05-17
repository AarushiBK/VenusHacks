import type { SymptomLogEntry } from "../types/symptoms";

const STORAGE_KEY = "vitacor_symptom_logs";

/** Calendar day in the user's local timezone (YYYY-MM-DD). */
export function getLocalDateKey(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function getTodayIsoDate(): string {
  return getLocalDateKey();
}

export function getLogDateKey(entry: SymptomLogEntry): string {
  if (entry.dateKey) return entry.dateKey;
  return getLocalDateKey(new Date(entry.createdAt));
}

function readAll(): SymptomLogEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SymptomLogEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAll(entries: SymptomLogEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function getSymptomLogs(): SymptomLogEntry[] {
  return readAll().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function getLogsForDay(dateKey: string): SymptomLogEntry[] {
  return getSymptomLogs().filter((e) => getLogDateKey(e) === dateKey);
}

export function saveSymptomLog(
  entry: Omit<SymptomLogEntry, "id" | "createdAt" | "dateKey">,
): SymptomLogEntry {
  const dateKey = getLocalDateKey();
  const existing = readAll();

  // One daily summary per calendar day; moment check-ins can stack within the day.
  const withoutSameDayDaily =
    entry.kind === "daily"
      ? existing.filter(
          (e) => !(e.kind === "daily" && getLogDateKey(e) === dateKey),
        )
      : existing;

  const full: SymptomLogEntry = {
    ...entry,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    dateKey,
  };
  writeAll([full, ...withoutSameDayDaily]);
  return full;
}
