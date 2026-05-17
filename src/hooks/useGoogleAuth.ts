import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { isFirebaseConfigured } from "../lib/firebase";
import { signInWithGoogle } from "../services/authService";
import {
  getUserProfile,
  hasCompletedProfile,
} from "../services/userProfileService";
import { getAuthErrorMessage } from "../utils/authErrors";

export function useGoogleAuth() {
  const navigate = useNavigate();
  const { refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signInWithGoogleAccount = useCallback(async () => {
    setLoading(true);
    setError(null);
    if (!isFirebaseConfigured) {
      setError("Firebase is not configured. Add your .env file and restart the app.");
      setLoading(false);
      return;
    }
    try {
      const user = await signInWithGoogle();
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
  }, [navigate, refreshProfile]);

  return {
    signInWithGoogleAccount,
    googleLoading: loading,
    googleError: error,
    clearGoogleError: () => setError(null),
  };
}
