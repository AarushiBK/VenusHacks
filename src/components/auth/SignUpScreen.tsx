"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setAuthenticated } from "@/lib/authSession";
import { saveAccountEmail, savePassword } from "@/lib/profileStorage";
import { AuthShell } from "./AuthShell";

const PRONOUNS = ["She/her", "He/him", "They/them", "Prefer not to say"] as const;
const ACTIVITY = [
  { value: "sedentary", label: "Mostly sedentary" },
  { value: "light", label: "Light activity" },
  { value: "moderate", label: "Moderately active" },
  { value: "active", label: "Very active" },
] as const;

const STEPS = 3;

export function SignUpScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [physicalActivity, setPhysicalActivity] = useState("");
  const [familyHeartDisease, setFamilyHeartDisease] = useState(false);
  const [familyDetails, setFamilyDetails] = useState("");

  function validateStep(): boolean {
    setError(null);
    if (step === 1) {
      if (!fullName.trim()) {
        setError("Name is required.");
        return false;
      }
      if (!email.trim()) {
        setError("Email is required.");
        return false;
      }
      if (password.length < 8) {
        setError("Use at least 8 characters for your password.");
        return false;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return false;
      }
    }
    if (step === 2) {
      if (!dateOfBirth) {
        setError("Date of birth is required.");
        return false;
      }
      if (!pronouns) {
        setError("Please select pronouns.");
        return false;
      }
    }
    if (step === 3) {
      if (!physicalActivity) {
        setError("Please select your activity level.");
        return false;
      }
      if (familyHeartDisease && !familyDetails.trim()) {
        setError("Please share family heart history details.");
        return false;
      }
    }
    return true;
  }

  function handleNext() {
    if (!validateStep()) return;
    if (step < STEPS) {
      setStep((s) => s + 1);
      return;
    }
    saveAccountEmail(email.trim());
    savePassword(password);
    const firstName = fullName.trim().split(/\s+/)[0] ?? "Alex";
    setAuthenticated(firstName);
    router.replace("/");
  }

  return (
    <AuthShell>
      <div className="flex flex-1 flex-col px-5 pb-8 pt-6">
        <Link
          href={step === 1 ? "/welcome" : "#"}
          onClick={(e) => {
            if (step > 1) {
              e.preventDefault();
              setStep((s) => s - 1);
              setError(null);
            }
          }}
          className="text-muted hover:text-ink mb-4 inline-flex items-center gap-1 text-sm font-medium"
        >
          <span aria-hidden>‹</span> Back
        </Link>

        <p className="text-muted text-xs font-semibold tracking-wide uppercase">
          Step {step} of {STEPS}
        </p>
        <div className="bg-blush mt-2 h-1.5 overflow-hidden rounded-full">
          <div
            className="bg-rose-deep h-full rounded-full transition-all"
            style={{ width: `${(step / STEPS) * 100}%` }}
          />
        </div>

        <h1 className="font-display text-ink mt-6 text-2xl font-semibold">
          {step === 1 && "Create your account"}
          {step === 2 && "About you"}
          {step === 3 && "Health background"}
        </h1>

        <div className="mt-6 flex flex-col gap-4">
          {error && (
            <p className="border-rose/30 bg-rose/5 text-rose-deep rounded-xl border px-4 py-3 text-sm">
              {error}
            </p>
          )}

          {step === 1 && (
            <>
              <AuthField label="Full name" id="name">
                <input
                  id="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Alex Morgan"
                  className={inputClass}
                />
              </AuthField>
              <AuthField label="Email" id="email">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </AuthField>
              <AuthField label="Password" id="password">
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className={inputClass}
                />
              </AuthField>
              <AuthField label="Confirm password" id="confirm">
                <input
                  id="confirm"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={inputClass}
                />
              </AuthField>
            </>
          )}

          {step === 2 && (
            <>
              <AuthField label="Date of birth" id="dob">
                <input
                  id="dob"
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className={inputClass}
                />
              </AuthField>
              <AuthField label="Pronouns" id="pronouns">
                <select
                  id="pronouns"
                  value={pronouns}
                  onChange={(e) => setPronouns(e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select…</option>
                  {PRONOUNS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </AuthField>
            </>
          )}

          {step === 3 && (
            <>
              <AuthField label="Physical activity" id="activity">
                <select
                  id="activity"
                  value={physicalActivity}
                  onChange={(e) => setPhysicalActivity(e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select…</option>
                  {ACTIVITY.map((a) => (
                    <option key={a.value} value={a.value}>
                      {a.label}
                    </option>
                  ))}
                </select>
              </AuthField>
              <label className="flex items-start gap-3 rounded-xl border border-blush/80 bg-white p-4">
                <input
                  type="checkbox"
                  checked={familyHeartDisease}
                  onChange={(e) => setFamilyHeartDisease(e.target.checked)}
                  className="mt-1"
                />
                <span className="text-ink text-sm">
                  Family history of heart disease
                </span>
              </label>
              {familyHeartDisease && (
                <AuthField label="Details" id="family">
                  <textarea
                    id="family"
                    value={familyDetails}
                    onChange={(e) => setFamilyDetails(e.target.value)}
                    rows={3}
                    placeholder="Which relative and approximate age of diagnosis"
                    className={`${inputClass} resize-none`}
                  />
                </AuthField>
              )}
            </>
          )}

          <button
            type="button"
            onClick={handleNext}
            className="bg-rose-deep mt-2 w-full rounded-2xl py-4 text-base font-semibold text-white shadow-md shadow-rose/20"
          >
            {step < STEPS ? "Continue" : "Get started"}
          </button>
        </div>

        <p className="text-muted mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-rose-deep font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}

const inputClass =
  "border-blush text-ink focus:border-rose-deep w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none";

function AuthField({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-muted mb-1.5 block text-xs font-semibold tracking-wide uppercase">
        {label}
      </span>
      {children}
    </label>
  );
}
