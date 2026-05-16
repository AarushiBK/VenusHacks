export type AuthMode = "signin" | "signup";

export type PhysicalActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "very_active";

export type WearableProvider =
  | "apple_watch"
  | "oura"
  | "fitbit"
  | "garmin"
  | "whoop"
  | "other";

export interface SignUpProfile {
  fullName: string;
  email: string;
  password: string;
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
  medicalDocuments: File[];
}

export const initialSignUpProfile: SignUpProfile = {
  fullName: "",
  email: "",
  password: "",
  dateOfBirth: "",
  pronouns: "",
  ethnicity: "",
  smokes: false,
  vapes: false,
  physicalActivity: "",
  familyHeartDisease: false,
  familyHeartDiseaseDetails: "",
  connectedWearables: [],
  appleHealthImport: false,
  medicalDocuments: [],
};
