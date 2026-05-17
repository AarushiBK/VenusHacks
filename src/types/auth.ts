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

/** Fields saved to Firestore (no secrets or local File handles). */
export interface SignUpHealthProfile {
  fullName: string;
  email: string;
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
}

/** Sign-up wizard state: health profile + account password + files pending upload. */
export interface SignUpFormState extends SignUpHealthProfile {
  password: string;
  pendingMedicalFiles: File[];
}

export const initialSignUpFormState: SignUpFormState = {
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
  pendingMedicalFiles: [],
};
