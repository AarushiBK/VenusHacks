"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { FirebaseSetupNotice } from "@/components/FirebaseSetupNotice";
import { useAuth } from "@/context/AuthContext";
import { useGoogleAuth } from "@/hooks/useGoogleAuth";
import { auth, isFirebaseConfigured } from "@/lib/firebase";
import { setAuthenticated } from "@/lib/authSession";
import { saveAccountEmail, savePassword } from "@/lib/profileStorage";
import {
  isGoogleUser,
  signUpWithEmail,
} from "@/services/authService";
import {
  hasCompletedProfile,
  saveUserProfile,
} from "@/services/userProfileService";
import { getAuthErrorMessage } from "@/utils/authErrors";
import { initialSignUpFormState, type SignUpFormState } from "@/types/auth";
import { AuthShell } from "./AuthShell";
import { SignUpForm } from "./SignUpForm";

function SignUpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const completeProfile = searchParams.get("complete") === "1";
  const { user, profile, refreshProfile, loading: authLoading } = useAuth();
  const { signInWithGoogleAccount, googleLoading, googleError } = useGoogleAuth();

  const activeUser = user ?? auth?.currentUser ?? null;
  const skipAccountStep = Boolean(completeProfile && activeUser);

  const [profileData, setProfileData] = useState<SignUpFormState>(
    initialSignUpFormState,
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!activeUser) return;
    setProfileData((prev) => ({
      ...prev,
      email: activeUser.email ?? prev.email,
      fullName: activeUser.displayName ?? prev.fullName,
    }));
  }, [activeUser]);

  useEffect(() => {
    if (submitting) return;
    if (profile && hasCompletedProfile(profile)) {
      router.replace("/");
    }
  }, [profile, router, submitting]);

  useEffect(() => {
    if (!completeProfile || authLoading) return;
    if (!activeUser && isFirebaseConfigured) {
      router.replace("/login");
    }
  }, [completeProfile, authLoading, activeUser, router]);

  function updateProfile(updates: Partial<SignUpFormState>) {
    setProfileData((prev) => ({ ...prev, ...updates }));
  }

  async function handleDemoSignUp(data: SignUpFormState) {
    saveAccountEmail(data.email.trim());
    savePassword(data.password);
    const firstName = data.fullName.trim().split(/\s+/)[0] ?? "Alex";
    setAuthenticated(firstName);
    router.replace("/");
  }

  async function handleSignUp(data: SignUpFormState) {
    if (!isFirebaseConfigured) {
      await handleDemoSignUp(data);
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      let uid: string;
      let authProvider: "email" | "google";

      if (skipAccountStep && activeUser) {
        uid = activeUser.uid;
        authProvider = isGoogleUser(activeUser) ? "google" : "email";
      } else {
        const authUser = await signUpWithEmail(data.email, data.password);
        uid = authUser.uid;
        authProvider = "email";
      }

      await saveUserProfile(
        uid,
        { ...data, email: activeUser?.email ?? data.email },
        authProvider,
      );
      await refreshProfile();
      const name = data.fullName.trim().split(/\s+/)[0] ?? "Alex";
      setAuthenticated(name);
      router.replace("/");
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  const displayError = error ?? googleError;

  if (completeProfile && authLoading && isFirebaseConfigured) {
    return (
      <AuthShell>
        <div className="flex flex-1 items-center justify-center px-5 py-12">
          <p className="text-muted text-sm">Loading your account…</p>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <FirebaseSetupNotice />
      <div className="flex flex-1 flex-col overflow-y-auto px-5 pb-8 pt-6">
        <Link
          href={skipAccountStep ? "/login" : "/welcome"}
          className="text-muted hover:text-ink mb-4 inline-flex items-center gap-1 text-sm font-medium"
        >
          <span aria-hidden>‹</span> Back
        </Link>

        <h1 className="font-display text-ink text-2xl font-semibold">
          {skipAccountStep ? "Complete profile" : "Sign up"}
        </h1>
        {skipAccountStep && (
          <p className="text-muted mt-2 text-sm leading-relaxed">
            You&apos;re signed in. Finish your health profile to get started.
          </p>
        )}

        <div className="mt-4 flex min-h-0 flex-1 flex-col">
          <SignUpForm
            profile={profileData}
            onChange={updateProfile}
            onSubmit={handleSignUp}
            skipAccountStep={skipAccountStep}
            onGoogleSignIn={
              skipAccountStep || !isFirebaseConfigured
                ? undefined
                : signInWithGoogleAccount
            }
            submitting={submitting || googleLoading}
            errorMessage={displayError}
          />
        </div>

      </div>
    </AuthShell>
  );
}

export function SignUpScreen() {
  return (
    <Suspense
      fallback={
        <AuthShell>
          <div className="flex flex-1 items-center justify-center py-12">
            <p className="text-muted text-sm">Loading…</p>
          </div>
        </AuthShell>
      }
    >
      <SignUpContent />
    </Suspense>
  );
}
