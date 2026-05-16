import { Link } from "react-router-dom";
import { MobileShell } from "../components/layout/MobileShell";

export function SuccessPage() {
  return (
    <MobileShell>
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center safe-bottom">
        <span className="flex size-20 items-center justify-center rounded-full bg-burgundy/10 text-4xl">
          ♥
        </span>
        <h1 className="mt-6 font-display text-2xl font-semibold text-ink">
          Welcome to VitaCor
        </h1>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
          Your profile is saved for this demo. Next up: your cardiovascular risk
          dashboard.
        </p>
        <Link
          to="/sign-in"
          className="mt-8 text-sm font-semibold text-burgundy active:underline"
        >
          Back to sign in
        </Link>
      </main>
    </MobileShell>
  );
}
