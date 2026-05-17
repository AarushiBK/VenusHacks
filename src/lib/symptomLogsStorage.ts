import type { SymptomLogEntry } from "../types/symptoms";

const STORAGE_KEY = "vitacor_symptom_logs";
const DEMO_SEEDED_KEY = "vitacor_demo_symptoms_seeded";
const DEMO_SEED_VERSION = "v2";

/** Calendar day in the user's local timezone (YYYY-MM-DD). */
export function getLocalDateKey(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
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

export function saveSymptomLog(
  entry: Omit<SymptomLogEntry, "id" | "createdAt">,
): SymptomLogEntry {
  const full: SymptomLogEntry = {
    ...entry,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    dateKey: getLocalDateKey(),
  };
  writeAll([full, ...readAll()]);
  return full;
}

export function getLogsForDay(isoDate: string): SymptomLogEntry[] {
  return getSymptomLogs().filter((e) => e.createdAt.slice(0, 10) === isoDate);
}

export function getTodayIsoDate(): string {
  return getLocalDateKey();
}

/** Seed Maya demo symptom timeline (~165 entries) for hackathon pitch. */
export async function seedDemoSymptomLogsIfEmpty(): Promise<void> {
  if (typeof window === "undefined") return;
  if (localStorage.getItem(DEMO_SEEDED_KEY) === DEMO_SEED_VERSION) return;
  await seedMayaSymptomLogs();
}

/** Load full Maya symptom timeline (used on Maya sign-in). */
export async function seedMayaSymptomLogs(): Promise<void> {
  if (typeof window === "undefined") return;
  try {
    const res = await fetch("/demo/demo_symptom_logs.json");
    if (!res.ok) return;
    const logs = (await res.json()) as SymptomLogEntry[];
    if (!Array.isArray(logs) || logs.length === 0) return;
    writeAll(logs);
    localStorage.setItem(DEMO_SEEDED_KEY, DEMO_SEED_VERSION);
  } catch {
    /* offline or missing file */
  }
}
