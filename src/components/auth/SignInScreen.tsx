"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FirebaseSetupNotice } from "@/components/FirebaseSetupNotice";
import { useAuth } from "@/context/AuthContext";
import { useGoogleAuth } from "@/hooks/useGoogleAuth";
import { isFirebaseConfigured } from "@/lib/firebase";
import { setAuthenticated } from "@/lib/authSession";
import {
  loadAccountEmail,
  saveAccountEmail,
  verifyPassword,
} from "@/lib/profileStorage";
import { signInWithEmail } from "@/services/authService";
import {
  getUserProfile,
  hasCompletedProfile,
} from "@/services/userProfileService";
import { getAuthErrorMessage } from "@/utils/authErrors";
import { AuthShell } from "./AuthShell";
import { SignInForm } from "./SignInForm";

export function SignInScreen() {
  const router = useRouter();
  const { refreshProfile } = useAuth();
  const { signInWithGoogleAccount, googleLoading, googleError } = useGoogleAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDemoSignIn(email: string, password: string) {
    const storedEmail = loadAccountEmail();
    if (email.trim().toLowerCase() !== storedEmail.toLowerCase()) {
      setError("Email or password is incorrect.");
      return;
    }
    if (!verifyPassword(password)) {
      setError("Email or password is incorrect.");
      return;
    }
    saveAccountEmail(email.trim());
    const storedName = window.localStorage.getItem("carechain_user_name");
    const fallback = email.trim().split("@")[0] ?? "Alex";
    const display =
      storedName ??
      fallback.charAt(0).toUpperCase() + fallback.slice(1).replace(/[._]/g, " ");
    setAuthenticated(display);
    router.replace("/");
  }

  async function handleSignIn(email: string, password: string) {
    if (!isFirebaseConfigured) {
      await handleDemoSignIn(email, password);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const user = await signInWithEmail(email, password);
      const profile = await getUserProfile(user.uid);
      await refreshProfile();

      const name =
        profile?.fullName?.split(/\s+/)[0] ??
        user.displayName?.split(/\s+/)[0] ??
        "Alex";
      setAuthenticated(name);

      if (hasCompletedProfile(profile)) {
        router.replace("/");
      } else {
        router.replace("/signup?complete=1");
      }
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  const busy = loading || googleLoading;
  const displayError = error ?? googleError;

  return (
    <AuthShell>
      <FirebaseSetupNotice />
      <div className="flex flex-1 flex-col px-5 pb-8 pt-6">
        <Link
          href="/welcome"
          className="text-muted hover:text-ink mb-6 inline-flex items-center gap-1 text-sm font-medium"
        >
          <span aria-hidden>‹</span> Back
        </Link>

        <h1 className="font-display text-ink text-2xl font-semibold">Sign in</h1>
        <p className="text-muted mt-2 text-sm leading-relaxed">
          Welcome back. Sign in to continue tracking your heart health.
        </p>

        <div className="mt-8">
          <SignInForm
            onSubmit={handleSignIn}
            onGoogleSignIn={
              isFirebaseConfigured ? signInWithGoogleAccount : undefined
            }
            loading={busy}
            errorMessage={displayError}
          />
        </div>

        <p className="text-muted mt-8 text-center text-sm">
          New here?{" "}
          <Link href="/signup" className="text-rose-deep font-semibold">
            Create account
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
