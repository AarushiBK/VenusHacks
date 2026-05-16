import { useState, type FormEvent } from "react";
import {
  ACTIVITY_OPTIONS,
  ETHNICITY_OPTIONS,
  PRONOUN_OPTIONS,
  SIGNUP_STEPS,
  WEARABLE_OPTIONS,
} from "../../constants/formOptions";
import type { SignUpProfile, WearableProvider } from "../../types/auth";
import { Button } from "../ui/Button";
import { FormField, SelectInput, TextInput } from "../ui/FormField";
import { Toggle } from "../ui/Toggle";
import { SignUpProgressBar } from "./SignUpProgressBar";

interface SignUpFormProps {
  profile: SignUpProfile;
  onChange: (updates: Partial<SignUpProfile>) => void;
  onSubmit: (profile: SignUpProfile) => void;
}

type FieldErrors = Partial<Record<keyof SignUpProfile | "confirmPassword", string>>;

export function SignUpForm({ profile, onChange, onSubmit }: SignUpFormProps) {
  const [step, setStep] = useState(1);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [customPronouns, setCustomPronouns] = useState("");
  const [customEthnicity, setCustomEthnicity] = useState("");

  const pronounsValue =
    profile.pronouns === "Prefer to self-describe" ? customPronouns : profile.pronouns;
  const ethnicityValue =
    profile.ethnicity === "Prefer to self-describe" ? customEthnicity : profile.ethnicity;

  function validateStep(): boolean {
    const next: FieldErrors = {};

    if (step === 1) {
      if (!profile.fullName.trim()) next.fullName = "Name is required";
      if (!profile.email.trim()) next.email = "Email is required";
      if (!profile.password || profile.password.length < 8) {
        next.password = "Use at least 8 characters";
      }
      if (profile.password !== confirmPassword) {
        next.confirmPassword = "Passwords do not match";
      }
    }

    if (step === 2) {
      if (!profile.dateOfBirth) next.dateOfBirth = "Date of birth is required";
      if (!profile.pronouns) next.pronouns = "Please select pronouns";
      if (profile.pronouns === "Prefer to self-describe" && !customPronouns.trim()) {
        next.pronouns = "Please enter your pronouns";
      }
      if (!profile.ethnicity) next.ethnicity = "Please select ethnicity";
      if (profile.ethnicity === "Prefer to self-describe" && !customEthnicity.trim()) {
        next.ethnicity = "Please describe your ethnicity";
      }
    }

    if (step === 3) {
      if (!profile.physicalActivity) {
        next.physicalActivity = "Please select your activity level";
      }
    }

    if (step === 4) {
      if (profile.familyHeartDisease && !profile.familyHeartDiseaseDetails.trim()) {
        next.familyHeartDiseaseDetails =
          "Please share which relative and approximate age of diagnosis";
      }
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function goNext() {
    if (!validateStep()) return;
    setStep((s) => Math.min(s + 1, SIGNUP_STEPS.length));
  }

  function goBack() {
    setErrors({});
    setStep((s) => Math.max(s - 1, 1));
  }

  function toggleWearable(id: WearableProvider) {
    const connected = profile.connectedWearables.includes(id)
      ? profile.connectedWearables.filter((w) => w !== id)
      : [...profile.connectedWearables, id];
    onChange({ connectedWearables: connected });
  }

  function handleFiles(files: FileList | null) {
    if (!files) return;
    onChange({ medicalDocuments: [...profile.medicalDocuments, ...Array.from(files)] });
  }

  function removeFile(index: number) {
    onChange({
      medicalDocuments: profile.medicalDocuments.filter((_, i) => i !== index),
    });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (step < SIGNUP_STEPS.length) {
      goNext();
      return;
    }
    onSubmit({
      ...profile,
      pronouns: pronounsValue,
      ethnicity: ethnicityValue,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <SignUpProgressBar currentStep={step} />

      <div className="flex flex-col gap-5 pb-4">
        {step === 1 && (
          <>
            <FormField label="Full name" htmlFor="fullname" required error={errors.fullName}>
              <TextInput
                id="fullname"
                autoComplete="name"
                placeholder="Your name"
                value={profile.fullName}
                onChange={(e) => onChange({ fullName: e.target.value })}
                error={!!errors.fullName}
              />
            </FormField>
            <FormField label="Email" htmlFor="signup-email" required error={errors.email}>
              <TextInput
                id="signup-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={profile.email}
                onChange={(e) => onChange({ email: e.target.value })}
                error={!!errors.email}
              />
            </FormField>
            <FormField label="Password" htmlFor="signup-password" required error={errors.password}>
              <TextInput
                id="signup-password"
                type="password"
                autoComplete="new-password"
                placeholder="At least 8 characters"
                value={profile.password}
                onChange={(e) => onChange({ password: e.target.value })}
                error={!!errors.password}
              />
            </FormField>
            <FormField
              label="Confirm password"
              htmlFor="confirm-password"
              required
              error={errors.confirmPassword}
            >
              <TextInput
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={!!errors.confirmPassword}
              />
            </FormField>
          </>
        )}

        {step === 2 && (
          <>
            <FormField
              label="Date of birth"
              htmlFor="dob"
              required
              hint="Used to personalize cardiovascular risk assessments."
              error={errors.dateOfBirth}
            >
              <TextInput
                id="dob"
                type="date"
                value={profile.dateOfBirth}
                onChange={(e) => onChange({ dateOfBirth: e.target.value })}
                error={!!errors.dateOfBirth}
              />
            </FormField>
            <FormField label="Pronouns" htmlFor="pronouns" required error={errors.pronouns}>
              <SelectInput
                id="pronouns"
                value={profile.pronouns}
                onChange={(e) => onChange({ pronouns: e.target.value })}
                error={!!errors.pronouns}
              >
                <option value="">Select pronouns</option>
                {PRONOUN_OPTIONS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </SelectInput>
            </FormField>
            {profile.pronouns === "Prefer to self-describe" && (
              <FormField label="Your pronouns" htmlFor="custom-pronouns" required>
                <TextInput
                  id="custom-pronouns"
                  placeholder="e.g. xe/xem"
                  value={customPronouns}
                  onChange={(e) => setCustomPronouns(e.target.value)}
                />
              </FormField>
            )}
            <FormField label="Ethnicity" htmlFor="ethnicity" required error={errors.ethnicity}>
              <SelectInput
                id="ethnicity"
                value={profile.ethnicity}
                onChange={(e) => onChange({ ethnicity: e.target.value })}
                error={!!errors.ethnicity}
              >
                <option value="">Select ethnicity</option>
                {ETHNICITY_OPTIONS.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </SelectInput>
            </FormField>
            {profile.ethnicity === "Prefer to self-describe" && (
              <FormField label="Describe your ethnicity" htmlFor="custom-ethnicity" required>
                <TextInput
                  id="custom-ethnicity"
                  value={customEthnicity}
                  onChange={(e) => setCustomEthnicity(e.target.value)}
                />
              </FormField>
            )}
          </>
        )}

        {step === 3 && (
          <>
            <p className="text-sm text-muted">
              Smoking and vaping can increase cardiovascular risk, especially during pregnancy
              and postpartum.
            </p>
            <Toggle
              id="smokes"
              label="I currently smoke cigarettes"
              checked={profile.smokes}
              onChange={(smokes) => onChange({ smokes })}
            />
            <Toggle
              id="vapes"
              label="I currently vape or use e-cigarettes"
              checked={profile.vapes}
              onChange={(vapes) => onChange({ vapes })}
            />
            <fieldset className="space-y-3">
              <legend className="text-sm font-medium text-ink">
                Physical activity level <span className="text-coral">*</span>
              </legend>
              {ACTIVITY_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex cursor-pointer gap-3 rounded-xl border p-4 transition ${
                    profile.physicalActivity === opt.value
                      ? "border-burgundy bg-burgundy/5 ring-2 ring-burgundy/15"
                      : "border-border bg-white hover:border-burgundy/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="activity"
                    value={opt.value}
                    checked={profile.physicalActivity === opt.value}
                    onChange={() => onChange({ physicalActivity: opt.value })}
                    className="mt-1 accent-burgundy"
                  />
                  <span>
                    <span className="block text-sm font-medium text-ink">{opt.label}</span>
                    <span className="block text-xs text-muted">{opt.description}</span>
                  </span>
                </label>
              ))}
              {errors.physicalActivity && (
                <p className="text-xs text-coral">{errors.physicalActivity}</p>
              )}
            </fieldset>
          </>
        )}

        {step === 4 && (
          <>
            <div className="rounded-xl border border-coral/30 bg-coral/5 p-4 text-sm leading-relaxed text-ink">
              <strong className="font-semibold">Why we ask:</strong> You may be at higher risk
              if a close family member (parent or sibling) developed heart disease early in
              life—before age 55 for men or before age 65 for women.
            </div>
            <Toggle
              id="family-heart"
              label="A parent or sibling had early heart disease"
              description="Heart attack, stroke, coronary artery disease, or similar before those ages"
              checked={profile.familyHeartDisease}
              onChange={(familyHeartDisease) => onChange({ familyHeartDisease })}
            />
            {profile.familyHeartDisease && (
              <FormField
                label="Tell us more"
                htmlFor="family-details"
                required
                hint="Who was affected and roughly when (approximate age is fine)."
                error={errors.familyHeartDiseaseDetails}
              >
                <textarea
                  id="family-details"
                  rows={4}
                  className="w-full resize-none rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-burgundy focus:ring-2 focus:ring-burgundy/15"
                  placeholder="e.g. Mother — heart attack at age 52"
                  value={profile.familyHeartDiseaseDetails}
                  onChange={(e) => onChange({ familyHeartDiseaseDetails: e.target.value })}
                />
              </FormField>
            )}
          </>
        )}

        {step === 5 && (
          <>
            <p className="text-sm text-muted">
              All connections are optional. You can add or change these anytime in settings.
            </p>

            <div className="space-y-2">
              <p className="text-sm font-medium text-ink">Connect wearables</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {WEARABLE_OPTIONS.map((w) => {
                  const selected = profile.connectedWearables.includes(w.id);
                  return (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => toggleWearable(w.id)}
                      className={`rounded-xl border p-4 text-left transition ${
                        selected
                          ? "border-burgundy bg-burgundy/5 ring-2 ring-burgundy/15"
                          : "border-border bg-white hover:border-burgundy/30"
                      }`}
                    >
                      <span className="block text-sm font-semibold text-ink">{w.name}</span>
                      <span className="mt-0.5 block text-xs text-muted">{w.description}</span>
                      {selected && (
                        <span className="mt-2 inline-block text-xs font-medium text-sage">
                          Selected — connect after signup
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <Toggle
              id="apple-health"
              label="Import from Apple Health"
              description="Sync heart rate, activity, sleep, and reproductive health data from your iPhone"
              checked={profile.appleHealthImport}
              onChange={(appleHealthImport) => onChange({ appleHealthImport })}
            />

            <div className="space-y-2">
              <p className="text-sm font-medium text-ink">Upload medical records</p>
              <p className="text-xs text-muted">
                Lab results, prenatal records, ECG reports, or other documents (PDF, images).
              </p>
              <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-cream-dark/50 px-6 py-8 transition hover:border-burgundy/40 hover:bg-white">
                <span className="text-2xl" aria-hidden>
                  📄
                </span>
                <span className="text-sm font-medium text-burgundy">
                  Choose files or drag here
                </span>
                <span className="text-xs text-muted">PDF, PNG, JPG up to 25 MB each</span>
                <input
                  type="file"
                  className="sr-only"
                  accept=".pdf,.png,.jpg,.jpeg,.heic"
                  multiple
                  onChange={(e) => handleFiles(e.target.files)}
                />
              </label>
              {profile.medicalDocuments.length > 0 && (
                <ul className="space-y-2">
                  {profile.medicalDocuments.map((file, i) => (
                    <li
                      key={`${file.name}-${i}`}
                      className="flex items-center justify-between rounded-lg border border-border bg-white px-3 py-2 text-sm"
                    >
                      <span className="truncate text-ink">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(i)}
                        className="shrink-0 text-xs font-medium text-coral hover:underline"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>

      <div className="sticky bottom-0 -mx-5 mt-6 flex gap-3 border-t border-border/60 bg-cream px-5 py-4 safe-bottom">
        {step > 1 && (
          <Button type="button" variant="secondary" onClick={goBack} className="flex-1">
            Back
          </Button>
        )}
        <Button type="submit" fullWidth className={step > 1 ? "flex-[2]" : ""}>
          {step < SIGNUP_STEPS.length ? "Continue" : "Create account"}
        </Button>
      </div>
    </form>
  );
}
