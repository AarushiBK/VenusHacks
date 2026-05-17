import type { SymptomLogEntry } from "../types/symptoms";

const STORAGE_KEY = "vitacor_symptom_logs";

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

export function saveSymptomLog(
  entry: Omit<SymptomLogEntry, "id" | "createdAt">,
): SymptomLogEntry {
  const full: SymptomLogEntry = {
    ...entry,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  writeAll([full, ...readAll()]);
  return full;
}

export function getLogsForDay(isoDate: string): SymptomLogEntry[] {
  return getSymptomLogs().filter((e) => e.createdAt.slice(0, 10) === isoDate);
}

export function getTodayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}
