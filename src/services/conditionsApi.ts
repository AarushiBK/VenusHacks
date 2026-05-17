import type { PreExistingCondition } from "@/types/condition";

const API_ROOT =
  typeof window !== "undefined" && process.env.NODE_ENV === "development"
    ? "/api/clinicaltables"
    : "https://clinicaltables.nlm.nih.gov/api";

type ConditionsSearchResponse = [
  number,
  string[],
  Record<string, (string | null)[]>,
  string[][],
];

export async function searchConditions(
  query: string,
  signal?: AbortSignal,
): Promise<PreExistingCondition[]> {
  const terms = query.trim();
  if (terms.length < 2) return [];

  const params = new URLSearchParams({
    terms,
    maxList: "8",
    df: "consumer_name",
    ef: "ICD10CM,term_icd9_code",
  });

  const res = await fetch(`${API_ROOT}/conditions/v3/search?${params}`, {
    signal,
  });
  if (!res.ok) {
    throw new Error("Could not search conditions. Try again in a moment.");
  }

  const data = (await res.json()) as ConditionsSearchResponse;
  const [, codes, extra, displayRows] = data;

  if (!codes?.length || !displayRows?.length) return [];

  const icd10List = extra.ICD10CM ?? [];
  const icd9List = extra.term_icd9_code ?? [];

  return codes.map((code, i) => ({
    id: code,
    name: displayRows[i]?.[0] ?? code,
    icd10: icd10List[i] ?? icd9List[i] ?? "",
  }));
}
