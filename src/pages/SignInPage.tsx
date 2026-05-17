import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignInForm } from "../components/auth/SignInForm";
import { MobileHeader } from "../components/layout/MobileHeader";
import { MobileShell } from "../components/layout/MobileShell";
import { useAuth } from "../context/AuthContext";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { signInWithEmail } from "../services/authService";
import {
  getUserProfile,
  hasCompletedProfile,
} from "../services/userProfileService";
import { getAuthErrorMessage } from "../utils/authErrors";
import { isFirebaseConfigured } from "../lib/firebase";

export function SignInPage() {
  const navigate = useNavigate();
  const { refreshProfile } = useAuth();
  const { signInWithGoogleAccount, googleLoading, googleError } = useGoogleAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignIn(email: string, password: string) {
    if (!isFirebaseConfigured) {
      setError("Firebase is not configured. Add your .env file and restart the app.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const user = await signInWithEmail(email, password);
      const profile = await getUserProfile(user.uid);
      await refreshProfile();

      if (hasCompletedProfile(profile)) {
        navigate("/success");
      } else {
        navigate("/sign-up", { state: { completeProfile: true, uid: user.uid } });
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
    <MobileShell>
      <MobileHeader title="Sign in" />
      <main className="flex flex-1 flex-col px-5 pb-8 pt-2 safe-bottom">
        <p className="mb-6 text-sm leading-relaxed text-muted">
          Welcome back. Sign in to continue tracking your heart health.
        </p>
        <SignInForm
          onSubmit={handleSignIn}
          onGoogleSignIn={signInWithGoogleAccount}
          loading={busy}
          errorMessage={displayError}
        />
        <p className="mt-8 text-center text-sm text-muted">
          New here?{" "}
          <Link to="/sign-up" className="font-semibold text-burgundy">
            Create an account
          </Link>
        </p>
      </main>
    </MobileShell>
  );
}
