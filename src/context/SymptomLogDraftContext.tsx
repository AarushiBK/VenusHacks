import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { normalizeCustomSymptom } from "../lib/symptomDisplay";
import type { SymptomLogDraft, SymptomLogKind } from "../types/symptoms";

interface SymptomLogDraftContextValue {
  draft: SymptomLogDraft;
  setKind: (kind: SymptomLogKind) => void;
  setMood: (mood: number) => void;
  toggleSymptom: (id: string) => void;
  setSymptoms: (ids: string[]) => void;
  addCustomSymptom: (text: string) => boolean;
  removeCustomSymptom: (text: string) => void;
  resetDraft: () => void;
}

const defaultDraft: SymptomLogDraft = {
  kind: "moment",
  mood: 50,
  symptomIds: [],
  customSymptoms: [],
};

const SymptomLogDraftContext = createContext<SymptomLogDraftContextValue | undefined>(
  undefined,
);

export function SymptomLogDraftProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<SymptomLogDraft>(defaultDraft);

  const setKind = useCallback((kind: SymptomLogKind) => {
    setDraft((d) => ({ ...d, kind }));
  }, []);

  const setMood = useCallback((mood: number) => {
    setDraft((d) => ({ ...d, mood }));
  }, []);

  const toggleSymptom = useCallback((id: string) => {
    setDraft((d) => ({
      ...d,
      symptomIds: d.symptomIds.includes(id)
        ? d.symptomIds.filter((x) => x !== id)
        : [...d.symptomIds, id],
    }));
  }, []);

  const setSymptoms = useCallback((ids: string[]) => {
    setDraft((d) => ({ ...d, symptomIds: ids }));
  }, []);

  const addCustomSymptom = useCallback((text: string) => {
    const label = normalizeCustomSymptom(text);
    if (!label || label.length > 120) return false;
    let added = false;
    setDraft((d) => {
      const lower = label.toLowerCase();
      const exists = d.customSymptoms.some((c) => c.toLowerCase() === lower);
      if (exists) return d;
      added = true;
      return { ...d, customSymptoms: [...d.customSymptoms, label] };
    });
    return added;
  }, []);

  const removeCustomSymptom = useCallback((text: string) => {
    setDraft((d) => ({
      ...d,
      customSymptoms: d.customSymptoms.filter((c) => c !== text),
    }));
  }, []);

  const resetDraft = useCallback(() => {
    setDraft(defaultDraft);
  }, []);

  const value = useMemo(
    () => ({
      draft,
      setKind,
      setMood,
      toggleSymptom,
      setSymptoms,
      addCustomSymptom,
      removeCustomSymptom,
      resetDraft,
    }),
    [
      draft,
      setKind,
      setMood,
      toggleSymptom,
      setSymptoms,
      addCustomSymptom,
      removeCustomSymptom,
      resetDraft,
    ],
  );

  return (
    <SymptomLogDraftContext.Provider value={value}>{children}</SymptomLogDraftContext.Provider>
  );
}

export function useSymptomLogDraft() {
  const ctx = useContext(SymptomLogDraftContext);
  if (!ctx) {
    throw new Error("useSymptomLogDraft must be used within SymptomLogDraftProvider");
  }
  return ctx;
}
