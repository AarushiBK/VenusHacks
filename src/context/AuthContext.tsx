"use client";

import { onAuthStateChanged, type User } from "firebase/auth";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { auth, isFirebaseConfigured } from "@/lib/firebase";
import {
  clearAuthenticated,
  setAuthenticated,
} from "@/lib/authSession";
import { getUserProfile } from "@/services/userProfileService";
import type { UserProfileDocument } from "@/types/userProfile";

interface AuthContextValue {
  user: User | null;
  profile: UserProfileDocument | null;
  loading: boolean;
  profileLoading: boolean;
  firebaseEnabled: boolean;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfileDocument | null>(null);
  const [loading, setLoading] = useState(isFirebaseConfigured);
  const [profileLoading, setProfileLoading] = useState(false);

  const refreshProfile = useCallback(async () => {
    if (!auth) return;
    const current = auth.currentUser;
    if (!current) {
      setProfile(null);
      return;
    }
    setProfileLoading(true);
    try {
      const doc = await getUserProfile(current.uid);
      setProfile(doc);
      const name =
        doc?.fullName?.split(/\s+/)[0] ??
        current.displayName?.split(/\s+/)[0] ??
        "Alex";
      setAuthenticated(name);
    } finally {
      setProfileLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);
      setLoading(false);

      if (!nextUser) {
        setProfile(null);
        clearAuthenticated();
        return;
      }

      setProfileLoading(true);
      try {
        const doc = await getUserProfile(nextUser.uid);
        setProfile(doc);
        const name =
          doc?.fullName?.split(/\s+/)[0] ??
          nextUser.displayName?.split(/\s+/)[0] ??
          nextUser.email?.split("@")[0] ??
          "Alex";
        setAuthenticated(name);
      } catch {
        setProfile(null);
        const fallback =
          nextUser.displayName?.split(/\s+/)[0] ??
          nextUser.email?.split("@")[0] ??
          "Alex";
        setAuthenticated(fallback);
      } finally {
        setProfileLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = useMemo(
    () => ({
      user,
      profile,
      loading,
      profileLoading,
      firebaseEnabled: isFirebaseConfigured,
      refreshProfile,
    }),
    [user, profile, loading, profileLoading, refreshProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
