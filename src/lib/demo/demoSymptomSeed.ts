import type { SymptomLogEntry } from "@/types/symptoms";

/** Demo user Maya — symptom trajectory across pregnancy → postpartum */
export const DEMO_SYMPTOM_LOGS: SymptomLogEntry[] = [
  {
    id: "demo-s1",
    kind: "daily",
    mood: 4,
    symptomIds: [],
    createdAt: "2026-03-12T09:00:00.000Z",
  },
  {
    id: "demo-s2",
    kind: "moment",
    mood: 3,
    symptomIds: ["swelling"],
    createdAt: "2026-04-18T14:20:00.000Z",
  },
  {
    id: "demo-s3",
    kind: "daily",
    mood: 3,
    symptomIds: ["headache", "swelling"],
    createdAt: "2026-05-02T08:15:00.000Z",
  },
  {
    id: "demo-s4",
    kind: "moment",
    mood: 2,
    symptomIds: ["headache", "vision"],
    createdAt: "2026-05-14T19:40:00.000Z",
  },
  {
    id: "demo-s5",
    kind: "daily",
    mood: 2,
    symptomIds: ["tiredness"],
    customSymptoms: ["Shortness of breath"],
    createdAt: "2026-05-22T07:50:00.000Z",
  },
  {
    id: "demo-s6",
    kind: "moment",
    mood: 3,
    symptomIds: ["tiredness"],
    createdAt: "2026-06-01T11:10:00.000Z",
  },
  {
    id: "demo-s7",
    kind: "daily",
    mood: 4,
    symptomIds: [],
    createdAt: "2026-06-07T08:30:00.000Z",
  },
];
