import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SignUpForm } from "../components/auth/SignUpForm";
import { MobileHeader } from "../components/layout/MobileHeader";
import { MobileShell } from "../components/layout/MobileShell";
import { useAuth } from "../context/AuthContext";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import {
  isGoogleUser,
  signUpWithEmail,
} from "../services/authService";
import {
  hasCompletedProfile,
  saveUserProfile,
} from "../services/userProfileService";
import { getAuthErrorMessage } from "../utils/authErrors";
import { auth, isFirebaseConfigured } from "../lib/firebase";
import { initialSignUpFormState, type SignUpFormState } from "../types/auth";

export function SignUpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile, refreshProfile, loading: authLoading } = useAuth();
  const { signInWithGoogleAccount, googleLoading, googleError } = useGoogleAuth();

  const completeProfile =
    (location.state as { completeProfile?: boolean } | null)?.completeProfile === true;

  const activeUser = user ?? auth?.currentUser ?? null;

  const skipAccountStep = Boolean(completeProfile && activeUser);

  const [profileData, setProfileData] = useState<SignUpFormState>(initialSignUpFormState);
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
      navigate("/success", { replace: true });
    }
  }, [profile, navigate, submitting]);

  useEffect(() => {
    if (!completeProfile || authLoading) return;
    if (!activeUser) {
      navigate("/sign-in", { replace: true });
    }
  }, [completeProfile, authLoading, activeUser, navigate]);

  function updateProfile(updates: Partial<SignUpFormState>) {
    setProfileData((prev) => ({ ...prev, ...updates }));
  }

  async function handleSignUp(data: SignUpFormState) {
    if (!isFirebaseConfigured) {
      setError("Firebase is not configured. Add your .env file and restart the app.");
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
      navigate("/success");
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  const displayError = error ?? googleError;

  if (completeProfile && authLoading) {
    return (
      <MobileShell>
        <MobileHeader title="Complete profile" />
        <main className="flex flex-1 items-center justify-center p-6 text-sm text-muted">
          Loading your account…
        </main>
      </MobileShell>
    );
  }

  return (
    <MobileShell>
      <MobileHeader title={skipAccountStep ? "Complete profile" : "Sign up"} />
      <main className="flex flex-1 flex-col overflow-y-auto px-5 pb-8 pt-2 safe-bottom">
        {skipAccountStep && (
          <p className="mb-4 text-sm leading-relaxed text-muted">
            You&apos;re signed in. Finish your health profile to get started.
          </p>
        )}
        <SignUpForm
          profile={profileData}
          onChange={updateProfile}
          onSubmit={handleSignUp}
          skipAccountStep={skipAccountStep}
          onGoogleSignIn={skipAccountStep ? undefined : signInWithGoogleAccount}
          submitting={submitting || googleLoading}
          errorMessage={displayError}
        />
        {!skipAccountStep && (
          <p className="mt-6 text-center text-sm text-muted">
            Already have an account?{" "}
            <Link to="/sign-in" className="font-semibold text-burgundy">
              Sign in
            </Link>
          </p>
        )}
      </main>
    </MobileShell>
  );
}
