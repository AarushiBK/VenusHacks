"use client";

import Link from "next/link";
import { CareSupportActions } from "@/components/care/CareSupportActions";
import type { WellnessAssessment, WellnessLevel } from "@/lib/demo/wellnessAssessment";

const LEVEL_STYLES: Record<
  WellnessLevel,
  { border: string; bg: string; dot: string }
> = {
  healthy: {
    border: "border-sage/35",
    bg: "bg-sage-light/70",
    dot: "bg-ok",
  },
  caution: {
    border: "border-warning/40",
    bg: "bg-warning-bg/80",
    dot: "bg-warning",
  },
  critical: {
    border: "border-alert/40",
    bg: "bg-alert-bg/80",
    dot: "bg-alert",
  },
};

export function WellnessSummaryCard({
  assessment,
  loading,
}: {
  assessment: WellnessAssessment | null;
  loading: boolean;
}) {
  if (loading) {
    return (
      <section className="rounded-2xl border border-blush/70 bg-white/80 p-4">
        <p className="text-muted text-sm">Loading your cardiovascular picture…</p>
      </section>
    );
  }

  if (!assessment) return null;

  const style = LEVEL_STYLES[assessment.level];

  return (
    <section
      className={`rounded-2xl border-2 p-4 ${style.border} ${style.bg}`}
      aria-live="polite"
    >
      <div className="flex items-start gap-2">
        <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${style.dot}`} />
        <div className="min-w-0 flex-1">
          <p className="text-muted text-[10px] font-bold tracking-[0.14em] uppercase">
            Mirror + symptoms + wearables
          </p>
          <h2 className="text-ink mt-0.5 text-sm font-semibold">{assessment.title}</h2>
          <p className="text-muted mt-1 text-xs leading-relaxed">{assessment.summary}</p>
        </div>
      </div>

      <ul className="mt-3 flex flex-col gap-1.5">
        {assessment.signals.map((s) => (
          <li key={s} className="text-ink text-[11px] leading-snug">
            · {s}
          </li>
        ))}
      </ul>

      <CareSupportActions level={assessment.level} compact />

      <div className="mt-3 flex flex-wrap gap-2">
        <Link
          href="/symptoms/log"
          className="rounded-full bg-rose-deep px-3 py-1.5 text-[11px] font-semibold text-white"
        >
          Log symptoms
        </Link>
        <Link
          href="/metrics"
          className="rounded-full border border-rose/30 bg-white/80 px-3 py-1.5 text-[11px] font-semibold text-rose-deep"
        >
          Face scan
        </Link>
        <Link
          href="/symptoms/charts"
          className="rounded-full border border-rose/30 bg-white/80 px-3 py-1.5 text-[11px] font-semibold text-rose-deep"
        >
          Symptom timeline
        </Link>
      </div>

      {assessment.scan && (
        <p className="text-muted mt-3 text-[10px] leading-relaxed">
          <span className="text-ink font-semibold">How this is calculated:</span>{" "}
          We combine your locked pre-pregnancy baseline (
          {assessment.scan.referenceBpm != null
            ? `${Math.round(assessment.scan.referenceBpm)} bpm`
            : "not set"}
          ), latest mirror scan, rolling median HR, recovery zone from the rPPG server, 30-day
          symptoms (preeclampsia watch list), and wearable BP. New scans you take append to this
          timeline.
        </p>
      )}

    </section>
  );
}
