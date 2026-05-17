import { useEffect, useState } from "react";
import { searchConditions } from "@/services/conditionsApi";
import type { PreExistingCondition } from "@/types/condition";
import { useDebouncedValue } from "./useDebouncedValue";

export function useConditionSearch(query: string) {
  const debouncedQuery = useDebouncedValue(query, 300);
  const [results, setResults] = useState<PreExistingCondition[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (debouncedQuery.trim().length < 2) {
      setResults([]);
      setError(null);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    searchConditions(debouncedQuery, controller.signal)
      .then((items) => {
        if (!controller.signal.aborted) setResults(items);
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setResults([]);
        setError(err instanceof Error ? err.message : "Search failed");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [debouncedQuery]);

  return { results, loading, error };
}
