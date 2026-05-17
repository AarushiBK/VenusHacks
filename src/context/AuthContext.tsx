import {
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { auth, isFirebaseConfigured } from "../lib/firebase";
import { getUserProfile } from "../services/userProfileService";
import type { UserProfileDocument } from "../types/userProfile";

interface AuthContextValue {
  user: User | null;
  profile: UserProfileDocument | null;
  loading: boolean;
  profileLoading: boolean;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfileDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);

  const fetchProfileForUser = useCallback(async (uid: string) => {
    setProfileLoading(true);
    try {
      const doc = await getUserProfile(uid);
      setProfile(doc);
    } catch {
      setProfile(null);
    } finally {
      setProfileLoading(false);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!auth) return;
    const current = auth.currentUser;
    if (!current) {
      setProfile(null);
      return;
    }
    await fetchProfileForUser(current.uid);
  }, [fetchProfileForUser]);

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
        return;
      }

      await fetchProfileForUser(nextUser.uid);
    });

    return unsubscribe;
  }, [fetchProfileForUser]);

  const value = useMemo(
    () => ({
      user,
      profile,
      loading,
      profileLoading,
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
