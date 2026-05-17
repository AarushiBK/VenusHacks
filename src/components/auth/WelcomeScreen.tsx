import Link from "next/link";
import { AuthShell } from "./AuthShell";

export function WelcomeScreen() {
  return (
    <AuthShell variant="welcome">
      <div className="welcome-screen">
        <div
          className="welcome-sky-gradient welcome-sky-gradient-full pointer-events-none"
          aria-hidden
        />
        <div className="welcome-sky-glow pointer-events-none" aria-hidden />

        <div className="welcome-screen-content">
          <div className="mb-auto">
            <span className="inline-flex size-14 items-center justify-center rounded-[18px] bg-white/15 text-3xl backdrop-blur-md">
              ♥
            </span>
            <h1 className="font-display mt-6 text-4xl font-semibold leading-tight tracking-tight text-white">
              VitaCor
            </h1>
            <p className="mt-3 max-w-[340px] text-[17px] leading-relaxed text-white/88">
              Track symptoms and risk factors to protect your long-term
              cardiovascular health.
            </p>
          </div>

          <div className="mt-8 space-y-3 rounded-[22px] bg-white/95 p-5 shadow-lg shadow-rose-deep/10 backdrop-blur-sm">
            <Link href="/signup" className="ios-btn ios-btn-primary">
              Sign up
            </Link>
            <Link href="/login" className="ios-btn ios-btn-secondary">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </AuthShell>
  );
}
