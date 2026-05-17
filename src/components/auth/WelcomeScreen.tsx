import Link from "next/link";
import { AuthShell } from "./AuthShell";

export function WelcomeScreen() {
  return (
    <AuthShell>
      <div className="relative flex flex-1 flex-col overflow-hidden">
        <div
          className="welcome-sky-gradient welcome-sky-gradient-panel pointer-events-none absolute inset-x-0 z-0"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-20 top-20 size-56 rounded-full bg-rose/15 blur-[80px]"
          aria-hidden
        />

        <div className="relative z-10 flex flex-1 flex-col px-5 pb-10 pt-10">
          <div className="mb-auto">
            <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-white/15 text-3xl backdrop-blur-sm">
              ♥
            </span>
            <h1 className="font-display mt-6 text-4xl font-semibold leading-tight text-white">
              VitaCor
            </h1>
            <p className="mt-3 max-w-[340px] text-base leading-relaxed text-white/85">
              Track symptoms and risk factors to protect your long-term
              cardiovascular health.
            </p>
          </div>

          <div className="mt-10 space-y-3 rounded-3xl bg-white p-6 shadow-lg shadow-rose-deep/10">
            <Link
              href="/signup"
              className="bg-rose-deep flex w-full items-center justify-center rounded-2xl px-6 py-4 text-base font-semibold text-white shadow-lg shadow-rose-deep/25 transition active:scale-[0.98]"
            >
              Sign up
            </Link>
            <Link
              href="/login"
              className="text-rose-deep border-rose/25 flex w-full items-center justify-center rounded-2xl border-2 bg-cream px-6 py-4 text-base font-semibold transition active:scale-[0.98]"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </AuthShell>
  );
}
