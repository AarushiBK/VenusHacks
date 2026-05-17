export interface FamilyContact {
  name: string;
  relation: string;
  phone: string;
}

export interface ProviderContact {
  name: string;
  clinic: string;
  phone: string;
}

export interface EmergencyContactsState {
  family: FamilyContact;
  provider: ProviderContact;
}

export const DEFAULT_EMERGENCY_CONTACTS: EmergencyContactsState = {
  family: {
    name: "Jordan Lee",
    relation: "Partner · emergency contact",
    phone: "(555) 014-8821",
  },
  provider: {
    name: "Dr. Elena Rivera",
    clinic: "Maternal Cardiology · Bayview Women's Health",
    phone: "(555) 014-2200",
  },
};

export const DEFAULT_ACCOUNT_EMAIL = "alex.care@example.com";

const CONTACTS_KEY = "carechain-emergency-contacts";
const EMAIL_KEY = "carechain-account-email";
const PASSWORD_KEY = "carechain-account-password";

function isBrowser() {
  return typeof window !== "undefined";
}

export function loadEmergencyContacts(): EmergencyContactsState {
  if (!isBrowser()) return DEFAULT_EMERGENCY_CONTACTS;
  try {
    const raw = window.localStorage.getItem(CONTACTS_KEY);
    if (!raw) return DEFAULT_EMERGENCY_CONTACTS;
    const parsed = JSON.parse(raw) as EmergencyContactsState;
    if (!parsed?.family?.name || !parsed?.provider?.name) {
      return DEFAULT_EMERGENCY_CONTACTS;
    }
    return parsed;
  } catch {
    return DEFAULT_EMERGENCY_CONTACTS;
  }
}

export function saveEmergencyContacts(contacts: EmergencyContactsState) {
  if (!isBrowser()) return;
  window.localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
}

export function loadAccountEmail(): string {
  if (!isBrowser()) return DEFAULT_ACCOUNT_EMAIL;
  return window.localStorage.getItem(EMAIL_KEY) ?? DEFAULT_ACCOUNT_EMAIL;
}

export function saveAccountEmail(email: string) {
  if (!isBrowser()) return;
  window.localStorage.setItem(EMAIL_KEY, email);
}

export function hasStoredPassword(): boolean {
  if (!isBrowser()) return false;
  return Boolean(window.localStorage.getItem(PASSWORD_KEY));
}

export function verifyPassword(password: string): boolean {
  if (!isBrowser()) return false;
  const stored = window.localStorage.getItem(PASSWORD_KEY);
  if (!stored) return true;
  return stored === password;
}

export function savePassword(password: string) {
  if (!isBrowser()) return;
  window.localStorage.setItem(PASSWORD_KEY, password);
}

export function validateNewPassword(
  newPassword: string,
  confirmPassword: string,
  currentPassword?: string,
): string | null {
  if (hasStoredPassword() && isBrowser()) {
    if (!currentPassword?.trim()) {
      return "Enter your current password.";
    }
    if (!verifyPassword(currentPassword)) {
      return "Current password is incorrect.";
    }
  }
  if (newPassword.length < 8) {
    return "Password must be at least 8 characters.";
  }
  if (newPassword !== confirmPassword) {
    return "Passwords do not match.";
  }
  return null;
}
