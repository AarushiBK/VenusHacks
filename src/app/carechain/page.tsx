import { ContinuityGapVisualizer } from "@/components/carechain/ContinuityGapVisualizer";
import { InterpretationDiff } from "@/components/carechain/InterpretationDiff";
import { MissedSignalReplay } from "@/components/carechain/MissedSignalReplay";
import { PreventionCoachDemo } from "@/components/carechain/PreventionCoachDemo";
import { TrajectoryDemo } from "@/components/carechain/TrajectoryDemo";
import { Disclaimer } from "@/components/layout/Disclaimer";
import { PageShell } from "@/components/layout/PageShell";
import Link from "next/link";

const SECTIONS = [
  { id: "signal-replay", label: "Missed signals" },
  { id: "interpretation-diff", label: "Interpretation diff" },
  { id: "trajectory", label: "Trajectory" },
  { id: "continuity", label: "Continuity" },
  { id: "coach", label: "Coaching" },
] as const;

export default function CarechainPage() {
  return (
    <PageShell active="carechain">
      <div className="flex flex-col gap-10">
        <header>
          <h1 className="font-display text-ink text-2xl font-semibold leading-tight tracking-tight">
            Postpartum cardiovascular interpretation
          </h1>
          <p className="text-muted mt-3 text-sm leading-relaxed">
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {SECTIONS.map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={
                  i === 0
                    ? "rounded-full bg-rose-deep px-3.5 py-2 text-xs font-semibold text-white shadow-sm"
                    : "rounded-full border border-blush bg-white px-3.5 py-2 text-xs font-medium text-muted"
                }
              >
                {s.label}
              </a>
            ))}
          </div>

          <blockquote className="mt-6 rounded-2xl border border-blush bg-blush/40 px-4 py-3">
            <p className="text-ink text-sm leading-relaxed italic">
              &ldquo;CARECHAIN transforms pregnancy and postpartum care into a
              lifelong cardiovascular intelligence opportunity by identifying
              interpretation gaps, continuity failures, and contextual risk
              patterns before they become catastrophic.&rdquo;
            </p>
          </blockquote>
        </header>

        <div id="signal-replay" className="demo-panel scroll-mt-24">
          <MissedSignalReplay />
        </div>

        <div id="interpretation-diff" className="demo-panel scroll-mt-24">
          <InterpretationDiff />
        </div>

        <div id="trajectory" className="demo-panel scroll-mt-24">
          <TrajectoryDemo />
        </div>

        <div id="continuity" className="demo-panel scroll-mt-24">
          <ContinuityGapVisualizer />
        </div>

        <div id="coach" className="demo-panel scroll-mt-24">
          <PreventionCoachDemo />
        </div>

        <div className="demo-panel text-center">
          <p className="cc-mono text-xs uppercase text-rose tracking-widest">
            Education, not prediction
          </p>
          <p className="mt-2 text-lg font-semibold text-white">
            Interpretation continuity intelligence
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-muted">
            CARECHAIN does not diagnose or predict disease. It surfaces contextual
            interpretation conflicts and continuity gaps that threshold-based
            systems can miss.
          </p>
          <div className="mt-5 flex flex-col gap-2.5">
            <Link
              href="/motherboard"
              className="rounded-2xl bg-sage px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Motherboard passport →
            </Link>
            <Link
              href="/health"
              className="rounded-2xl border border-slate-border px-5 py-3 text-center text-sm font-medium text-white/70"
            >
              Health overview
            </Link>
          </div>
        </div>

        <Disclaimer />
      </div>
    </PageShell>
  );
}
