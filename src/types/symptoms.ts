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
  /** Local calendar day (YYYY-MM-DD) when the log was saved */
  dateKey?: string;
}

export interface SymptomLogDraft {
  kind: SymptomLogKind;
  mood: number;
  symptomIds: string[];
  customSymptoms: string[];
}
