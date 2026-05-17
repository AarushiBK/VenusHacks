import { Link } from "react-router-dom";
import { MobileShell } from "../components/layout/MobileShell";

export function WelcomePage() {
  return (
    <MobileShell className="welcome-gradient bg-transparent">
      <div className="flex min-h-0 flex-1 flex-col px-5 pb-8 pt-10 safe-top safe-bottom">
        <div className="shrink-0">
          <span className="inline-flex size-[52px] items-center justify-center rounded-2xl bg-white/25 backdrop-blur-sm">
            <img src="/heart.svg" alt="" className="size-7" aria-hidden />
          </span>
          <h1 className="mt-8 font-display text-[2.75rem] font-bold leading-[1.1] tracking-tight text-white">
            VitaCor
          </h1>
          <p className="mt-4 max-w-[300px] text-[1.05rem] leading-snug text-white/90">
            Your heart health hub before, during, and after pregnancy.
          </p>
        </div>

        <div className="mt-auto pt-10">
          <div className="rounded-[1.75rem] bg-white px-6 pb-6 pt-7 shadow-[0_8px_32px_rgba(42,31,36,0.08)]">
            <p className="text-center text-sm leading-relaxed text-muted">
              Track symptoms and risk factors to protect your long-term cardiovascular
              health.
            </p>

            <div className="mt-6 space-y-3">
              <Link
                to="/sign-up"
                className="flex w-full items-center justify-center rounded-full bg-burgundy px-6 py-4 text-base font-bold text-white transition active:scale-[0.98] active:bg-burgundy-dark"
              >
                Sign up
              </Link>

              <Link
                to="/sign-in"
                className="flex w-full items-center justify-center rounded-full border border-border bg-cream px-6 py-4 text-base font-bold text-burgundy transition active:scale-[0.98] active:bg-cream-dark"
              >
                Sign in
              </Link>
            </div>
          </div>

          <p className="mt-6 px-2 text-center text-[11px] leading-relaxed text-muted/90">
            Not a substitute for medical advice. Always consult your care team.
          </p>
        </div>
      </div>
    </MobileShell>
  );
}
