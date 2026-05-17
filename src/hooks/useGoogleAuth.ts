"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { isFirebaseConfigured } from "@/lib/firebase";
import { setAuthenticated } from "@/lib/authSession";
import { signInWithGoogle } from "@/services/authService";
import {
  getUserProfile,
  hasCompletedProfile,
} from "@/services/userProfileService";
import { getAuthErrorMessage } from "@/utils/authErrors";

export function useGoogleAuth() {
  const router = useRouter();
  const { refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signInWithGoogleAccount = useCallback(async () => {
    setLoading(true);
    setError(null);
    if (!isFirebaseConfigured) {
      setError(
        "Firebase is not configured. Add .env.local from .env.example and restart.",
      );
      setLoading(false);
      return;
    }
    try {
      const user = await signInWithGoogle();
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
  }, [router, refreshProfile]);

  return {
    signInWithGoogleAccount,
    googleLoading: loading,
    googleError: error,
    clearGoogleError: () => setError(null),
  };
}
