import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MobileShell } from "../components/layout/MobileShell";
import { Screen } from "../components/layout/Screen";
import { useAuth } from "../context/AuthContext";
import { signOut } from "../services/authService";

export function SuccessPage() {
  const navigate = useNavigate();
  const { user, loading, profile } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/sign-in", { replace: true });
    }
  }, [user, loading, navigate]);

  async function handleSignOut() {
    await signOut();
    navigate("/", { replace: true });
  }

  if (loading) {
    return (
      <MobileShell>
        <Screen className="flex flex-1 items-center justify-center py-6 text-sm text-muted">
          Loading…
        </Screen>
      </MobileShell>
    );
  }

  return (
    <MobileShell>
      <Screen className="flex flex-1 flex-col items-center justify-center py-12 text-center safe-bottom">
        <span className="flex size-20 items-center justify-center rounded-full bg-burgundy/10 text-4xl">
          ♥
        </span>
        <h1 className="mt-6 font-display text-2xl font-semibold text-ink">
          Welcome{profile?.fullName ? `, ${profile.fullName.split(" ")[0]}` : ""}!
        </h1>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
          Your profile is saved to Firebase. Start tracking symptoms to protect your
          heart health.
        </p>
        <Link
          to="/symptoms"
          className="mt-6 flex min-h-[48px] w-full max-w-xs items-center justify-center rounded-xl bg-burgundy px-5 py-3.5 text-base font-semibold text-white shadow-md shadow-burgundy/20 active:scale-[0.98]"
        >
          Open symptoms
        </Link>
        {user?.email && (
          <p className="mt-2 text-xs text-muted">Signed in as {user.email}</p>
        )}
        <button
          type="button"
          onClick={handleSignOut}
          className="mt-8 text-sm font-semibold text-burgundy active:underline"
        >
          Sign out
        </button>
        <Link
          to="/"
          className="mt-4 text-xs text-muted active:underline"
        >
          Back to home
        </Link>
      </Screen>
    </MobileShell>
  );
}
