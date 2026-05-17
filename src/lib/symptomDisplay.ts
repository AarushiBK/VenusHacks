import { getSymptomById, getSymptomPillLabel, SYMPTOMS_CATALOG } from "../constants/symptomsCatalog";
import type { SymptomLogEntry } from "../types/symptoms";

export function normalizeCustomSymptom(text: string): string {
  return text.trim().replace(/\s+/g, " ");
}

export function getSymptomLabelsForEntry(entry: Pick<SymptomLogEntry, "symptomIds" | "customSymptoms">): string[] {
  const catalog = entry.symptomIds
    .map((id) => getSymptomById(id))
    .filter(Boolean)
    .map((s) => getSymptomPillLabel(s!));
  const custom = entry.customSymptoms ?? [];
  return [...catalog, ...custom];
}

export function hasAnySymptoms(entry: Pick<SymptomLogEntry, "symptomIds" | "customSymptoms">): boolean {
  return entry.symptomIds.length > 0 || (entry.customSymptoms?.length ?? 0) > 0;
}

/** True if search text exactly matches a catalog symptom (user should pick the pill instead). */
export function catalogHasExactMatch(query: string): boolean {
  const q = normalizeCustomSymptom(query).toLowerCase();
  if (!q) return false;
  return SYMPTOMS_CATALOG.some((s) => {
    const pill = getSymptomPillLabel(s).toLowerCase();
    return (
      s.label.toLowerCase() === q ||
      pill === q ||
      s.id.toLowerCase() === q ||
      s.keywords.some((k) => k.toLowerCase() === q)
    );
  });
}

export function canAddCustomFromSearch(
  query: string,
  customSymptoms: string[],
): boolean {
  const trimmed = normalizeCustomSymptom(query);
  if (!trimmed || trimmed.length > 120) return false;
  if (customSymptoms.some((c) => c.toLowerCase() === trimmed.toLowerCase())) return false;
  if (catalogHasExactMatch(trimmed)) return false;
  return true;
}
