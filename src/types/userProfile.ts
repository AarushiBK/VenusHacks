import type { PhysicalActivityLevel, WearableProvider } from "./auth";

/** Persisted document reference (filename only; `url` is empty without cloud storage). */
export interface MedicalDocumentMeta {
  name: string;
  url: string;
  uploadedAt: string;
}

export interface UserProfileDocument {
  uid: string;
  email: string;
  fullName: string;
  dateOfBirth: string;
  pronouns: string;
  ethnicity: string;
  smokes: boolean;
  vapes: boolean;
  physicalActivity: PhysicalActivityLevel | "";
  familyHeartDisease: boolean;
  familyHeartDiseaseDetails: string;
  connectedWearables: WearableProvider[];
  appleHealthImport: boolean;
  medicalDocuments: MedicalDocumentMeta[];
  authProvider: "email" | "google";
  createdAt: string;
  updatedAt: string;
}
