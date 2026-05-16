import { Link } from "react-router-dom";
import { MobileShell } from "../components/layout/MobileShell";

export function WelcomePage() {
  return (
    <MobileShell className="overflow-hidden">
      <div className="relative flex flex-1 flex-col">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-burgundy via-burgundy/90 to-cream"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-16 top-24 size-48 rounded-full bg-coral/25 blur-3xl"
          aria-hidden
        />

        <div className="relative z-10 flex flex-1 flex-col px-6 pb-8 pt-14 safe-top">
          <div className="mb-auto">
            <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-white/15 text-3xl backdrop-blur-sm">
              ♥
            </span>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-tight text-white">
              VitaCor
            </h1>
            <p className="mt-3 max-w-[280px] text-base leading-relaxed text-white/85">
              Your heart health hub before, during, and after pregnancy.
            </p>
          </div>

          <div className="mt-10 space-y-4 rounded-3xl bg-white p-6 shadow-lg shadow-burgundy/10">
            <p className="text-center text-sm leading-relaxed text-muted">
              Track symptoms and risk factors to protect your long-term cardiovascular
              health.
            </p>

            <Link
              to="/sign-up"
              className="flex w-full items-center justify-center rounded-2xl bg-burgundy px-6 py-4 text-base font-semibold text-white shadow-lg shadow-burgundy/25 transition active:scale-[0.98] active:bg-burgundy-dark"
            >
              Sign up
            </Link>

            <Link
              to="/sign-in"
              className="flex w-full items-center justify-center rounded-2xl border-2 border-burgundy/20 bg-cream px-6 py-4 text-base font-semibold text-burgundy transition active:scale-[0.98] active:bg-cream-dark"
            >
              Sign in
            </Link>
          </div>

          <p className="mt-6 text-center text-[11px] leading-relaxed text-muted">
            Not a substitute for medical advice. Always consult your care team.
          </p>
        </div>
      </div>
    </MobileShell>
  );
}
