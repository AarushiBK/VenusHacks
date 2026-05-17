"use client";

import { useState } from "react";

const RISK_FACTORS = [
  {
    id: "gesthtn",
    label: "Gestational hypertension",
    weight: 3,
    note: "strongly elevates long-term hypertension and stroke risk",
  },
  {
    id: "preeclampsia",
    label: "Preeclampsia",
    weight: 4,
    note: "significant marker for future cardiovascular events",
  },
  {
    id: "stress",
    label: "Chronic stress",
    weight: 2,
    note: "sustained cortisol elevation affects cardiac remodeling",
  },
  {
    id: "sleep",
    label: "Poor sleep quality",
    weight: 2,
    note: "HRV depression and metabolic disruption compound over time",
  },
  {
    id: "inactivity",
    label: "Inactivity",
    weight: 1,
    note: "modifiable factor with high intervention ROI",
  },
] as const;

type FactorId = (typeof RISK_FACTORS)[number]["id"];

function getFraming(selected: Set<FactorId>): {
  headline: string;
  detail: string;
  priority: "low" | "moderate" | "elevated";
} {
  const total = RISK_FACTORS.filter((f) => selected.has(f.id)).reduce(
    (sum, f) => sum + f.weight,
    0,
  );

  if (total === 0) {
    return {
      headline: "No risk factors selected.",
      detail:
        "Select the factors that apply to this patient to generate contextual monitoring framing.",
      priority: "low",
    };
  }

  if (total <= 2) {
    return {
      headline: "Routine postpartum cardiovascular monitoring is appropriate.",
      detail:
        "Selected factors suggest standard follow-up cadence. Annual BP check and lifestyle review recommended.",
      priority: "low",
    };
  }

  if (total <= 5) {
    return {
      headline:
        "This postpartum profile warrants structured cardiovascular follow-up.",
      detail:
        "The combination of selected factors elevates the monitoring priority beyond routine care. Semi-annual BP tracking and HRV trend review are recommended. Educational framing around long-term risk should be introduced now.",
      priority: "moderate",
    };
  }

  return {
    headline:
      "High-priority cardiovascular monitoring framing indicated by context.",
    detail:
      "This combination of factors — particularly hypertensive pregnancy conditions — reflects a profile where long-term cardiovascular risk warrants meaningful attention. Quarterly BP review, HRV baseline establishment, and proactive care continuity planning are reasonable considerations to raise with a clinician.",
    priority: "elevated",
  };
}

const PRIORITY_STYLES = {
  low: {
    container: "border-sage/30 bg-sage-light/50",
    label: "text-sage",
    badge: "bg-sage-light border-sage/30 text-sage",
    badgeText: "Low monitoring priority",
  },
  moderate: {
    container: "border-warning/30 bg-warning-bg/60",
    label: "text-warning",
    badge: "bg-warning-bg border-warning/30 text-warning",
    badgeText: "Moderate monitoring priority",
  },
  elevated: {
    container: "border-alert/30 bg-alert-bg/60",
    label: "text-alert",
    badge: "bg-alert-bg border-alert/30 text-alert",
    badgeText: "Elevated monitoring priority",
  },
};

export function TrajectoryDemo() {
  const [selected, setSelected] = useState<Set<FactorId>>(new Set());

  function toggle(id: FactorId) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const framing = getFraming(selected);
  const styles = PRIORITY_STYLES[framing.priority];

  return (
    <section aria-labelledby="trajectory-heading">
      <div className="mb-6">
        <p className="text-rose cc-mono text-xs tracking-[0.18em] uppercase">
          Demo · Trajectory Engine
        </p>
        <h2
          id="trajectory-heading"
          className="font-display mt-2 text-2xl font-semibold text-white"
        >
          Contextual monitoring framing
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-muted">
          Select the factors present in this patient&apos;s history. Watch how
          CARECHAIN reframes monitoring priority — not as a diagnosis, but as an
          educational context model.
        </p>
      </div>

      {/* Factor selector */}
      <div className="mb-6 flex flex-col gap-2">
        {RISK_FACTORS.map((factor) => {
          const on = selected.has(factor.id);
          return (
            <button
              key={factor.id}
              onClick={() => toggle(factor.id)}
              aria-pressed={on}
              className={`flex items-start gap-3 rounded-xl border p-3.5 text-left transition-all ${
                on
                  ? "border-rose-deep/50 bg-rose-deep/10"
                  : "border-slate-border bg-slate-mid hover:border-rose-deep/30"
              }`}
            >
              <span
                className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] font-bold transition-colors ${
                  on
                    ? "border-rose-deep bg-rose-deep text-white"
                    : "border-slate-border bg-transparent text-transparent"
                }`}
                aria-hidden
              >
                ✓
              </span>
              <div>
                <p
                  className={`text-sm font-medium ${on ? "text-white" : "text-white/70"}`}
                >
                  {factor.label}
                </p>
                {on && (
                  <p className="cc-mono mt-0.5 text-[11px] text-slate-muted">
                    {factor.note}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Output framing */}
      <div
        className={`rounded-2xl border p-5 transition-all ${styles.container}`}
      >
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <p className="cc-mono text-[10px] uppercase text-slate-muted">
            CARECHAIN framing
          </p>
          <span
            className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${styles.badge}`}
          >
            {styles.badgeText}
          </span>
        </div>
        <p className={`text-base font-semibold leading-snug ${styles.label}`}>
          {framing.headline}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-muted">
          {framing.detail}
        </p>
        <p className="cc-mono mt-4 text-[11px] text-slate-muted/60">
          Not prediction — education and preventative modeling only.
        </p>
      </div>
    </section>
  );
}
