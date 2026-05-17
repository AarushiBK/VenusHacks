import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  type Timestamp,
} from "firebase/firestore";
import { requireDb } from "../lib/firebase";
import type { SignUpFormState, SignUpHealthProfile } from "../types/auth";
import type { MedicalDocumentMeta, UserProfileDocument } from "../types/userProfile";

function profileToDocument(
  uid: string,
  profile: SignUpHealthProfile,
  medicalDocuments: MedicalDocumentMeta[],
  authProvider: "email" | "google",
  existing?: UserProfileDocument,
): Omit<UserProfileDocument, "createdAt" | "updatedAt"> & {
  createdAt?: string;
  updatedAt?: string;
} {
  return {
    uid,
    email: profile.email,
    fullName: profile.fullName,
    dateOfBirth: profile.dateOfBirth,
    pronouns: profile.pronouns,
    ethnicity: profile.ethnicity,
    smokes: profile.smokes,
    vapes: profile.vapes,
    physicalActivity: profile.physicalActivity,
    familyHeartDisease: profile.familyHeartDisease,
    familyHeartDiseaseDetails: profile.familyHeartDiseaseDetails,
    connectedWearables: profile.connectedWearables,
    appleHealthImport: profile.appleHealthImport,
    medicalDocuments: medicalDocuments.length
      ? medicalDocuments
      : (existing?.medicalDocuments ?? []),
    authProvider,
    createdAt: existing?.createdAt,
    updatedAt: new Date().toISOString(),
  };
}

/** Converts local File picks to Firestore-safe metadata (filenames only; no cloud upload). */
export function pendingFilesToDocumentMeta(files: File[]): MedicalDocumentMeta[] {
  return files.map((file) => ({
    name: file.name,
    url: "",
    uploadedAt: new Date().toISOString(),
  }));
}

export async function getUserProfile(
  uid: string,
): Promise<UserProfileDocument | null> {
  const snap = await getDoc(doc(requireDb(), "users", uid));
  if (!snap.exists()) return null;
  const data = snap.data();
  return {
    ...data,
    createdAt: timestampToIso(data.createdAt),
    updatedAt: timestampToIso(data.updatedAt),
  } as UserProfileDocument;
}

export async function saveUserProfile(
  uid: string,
  form: SignUpFormState,
  authProvider: "email" | "google",
): Promise<void> {
  const existing = await getUserProfile(uid);
  const medicalDocuments = pendingFilesToDocumentMeta(form.pendingMedicalFiles);
  const { password: _password, pendingMedicalFiles: _files, ...healthProfile } = form;

  const payload = profileToDocument(
    uid,
    healthProfile,
    medicalDocuments,
    authProvider,
    existing ?? undefined,
  );

  await setDoc(
    doc(requireDb(), "users", uid),
    {
      ...payload,
      createdAt: existing?.createdAt ?? serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
}

function timestampToIso(value: Timestamp | string | undefined): string {
  if (!value) return new Date().toISOString();
  if (typeof value === "string") return value;
  return value.toDate().toISOString();
}

export function hasCompletedProfile(profile: UserProfileDocument | null): boolean {
  if (!profile) return false;
  return Boolean(profile.dateOfBirth && profile.physicalActivity);
}
