export type SymptomLogKind = "moment" | "daily";

export interface SymptomDefinition {
  id: string;
  shortLabel?: string;
  label: string;
  icon: string;
  keywords: string[];
  urgent?: boolean;
}

export interface SymptomLogEntry {
  id: string;
  kind: SymptomLogKind;
  mood: number;
  symptomIds: string[];
  /** User-entered symptoms not in the catalog */
  customSymptoms?: string[];
  createdAt: string;
}

export interface SymptomLogDraft {
  kind: SymptomLogKind;
  mood: number;
  symptomIds: string[];
  customSymptoms: string[];
}
