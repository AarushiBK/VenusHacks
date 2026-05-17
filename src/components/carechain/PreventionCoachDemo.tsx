"use client";

import { useState } from "react";

const PROFILES = [
  {
    id: "week6",
    label: "Week 6 postpartum",
    context:
      "6 weeks after delivery. BP 138/88. Sleep: 3–4 hrs fragmented. HR elevated. Breastfeeding.",
    coaching: [
      {
        priority: "elevated" as const,
        category: "Blood pressure",
        recommendation:
          "138/88 is outside the normal postpartum range. A follow-up reading within 72 hours is important. Do not wait for your 6-week appointment if headache or visual changes occur.",
        generic: "Reduce sodium. Drink water.",
      },
      {
        priority: "moderate" as const,
        category: "Sleep",
        recommendation:
          "Fragmented sleep at this stage is expected but compounds cardiovascular stress. Prioritize one consolidated 4-hour block where possible. Partner or support-person involvement here is clinically relevant.",
        generic: "Get more sleep.",
      },
      {
        priority: "moderate" as const,
        category: "Activity",
        recommendation:
          "Walking 10–15 min/day is appropriate and cardioprotective at this stage. Avoid high-intensity activity until 12-week clearance.",
        generic: "Exercise regularly.",
      },
      {
        priority: "low" as const,
        category: "Follow-up scheduling",
        recommendation:
          "Schedule a postpartum cardiovascular check at week 8–12 in addition to the standard OB follow-up. BP trend monitoring is clinically indicated given current readings.",
        generic: "See your doctor.",
      },
    ],
  },
  {
    id: "month6",
    label: "6 months postpartum",
    context:
      "6 months after delivery. History: gestational hypertension. BP now 126/82. HR normalized. Sleep improving.",
    coaching: [
      {
        priority: "moderate" as const,
        category: "Blood pressure",
        recommendation:
          "BP has improved but remains borderline. Given gestational hypertension history, annual cardiovascular monitoring is part of your long-term health profile and should continue beyond the postpartum window.",
        generic: "Keep monitoring your BP.",
      },
      {
        priority: "low" as const,
        category: "Activity",
        recommendation:
          "Full cardiovascular exercise is now appropriate. 150 min/week of moderate aerobic activity has strong evidence for reducing long-term hypertension risk in women with gestational hypertension history.",
        generic: "Exercise regularly.",
      },
      {
        priority: "low" as const,
        category: "Long-term risk awareness",
        recommendation:
          "Gestational hypertension increases lifetime cardiovascular risk. This is preserved in your cardiovascular passport so it can inform care decisions years from now. Annual BP review and lipid panel by age 40 are recommended as preventive infrastructure.",
        generic: "Eat healthy.",
      },
      {
        priority: "low" as const,
        category: "Mental health",
        recommendation:
          "Postpartum mental health affects cardiovascular stress pathways. A brief check-in for anxiety or mood patterns at 6 months is medically relevant.",
        generic: "Practice self-care.",
      },
    ],
  },
] as const;

type ProfileId = (typeof PROFILES)[number]["id"];

const PRIORITY_BADGE: Record<
  "elevated" | "moderate" | "low",
  { dot: string; text: string }
> = {
  elevated: { dot: "bg-alert", text: "text-alert" },
  moderate: { dot: "bg-warning", text: "text-warning" },
  low: { dot: "bg-sage", text: "text-slate-muted" },
};

export function PreventionCoachDemo() {
  const [activeId, setActiveId] = useState<ProfileId>("week6");
  const profile = PROFILES.find((p) => p.id === activeId)!;

  return (
    <section aria-labelledby="coach-heading">
      <div className="mb-6">
        <p className="text-rose cc-mono text-xs tracking-[0.18em] uppercase">
          Demo · Prevention Coach
        </p>
        <h2
          id="coach-heading"
          className="font-display mt-2 text-2xl font-semibold text-white"
        >
          Contextual coaching — not generic advice
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-muted">
          The same patient at different points in her postpartum journey receives
          completely different guidance. Context drives everything.
        </p>
      </div>

      {/* Profile switcher */}
      <div
        className="mb-5 inline-flex rounded-xl border border-slate-border bg-slate-mid p-1"
        role="tablist"
        aria-label="Patient timeline"
      >
        {PROFILES.map((p) => (
          <button
            key={p.id}
            role="tab"
            aria-selected={p.id === activeId}
            onClick={() => setActiveId(p.id)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              p.id === activeId
                ? "bg-rose-deep text-white shadow"
                : "text-white/50 hover:text-white"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Patient context */}
      <div className="mb-5 rounded-xl border border-slate-border/60 bg-slate-mid/60 px-4 py-3">
        <p className="cc-mono text-[10px] uppercase text-slate-muted">
          Patient context
        </p>
        <p className="mt-1 text-sm text-white/80">{profile.context}</p>
      </div>

      {/* Coaching recommendations */}
      <div className="flex flex-col gap-3">
        {profile.coaching.map((item) => {
          const badge = PRIORITY_BADGE[item.priority];
          return (
            <div
              key={item.category}
              className="rounded-xl border border-slate-border bg-slate-mid p-4"
            >
              <div className="mb-2 flex items-center gap-2">
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${badge.dot}`}
                  aria-hidden
                />
                <p className="cc-mono text-[10px] uppercase text-slate-muted">
                  {item.category}
                </p>
              </div>

              {/* Side-by-side: generic vs CARECHAIN */}
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div className="rounded-lg border border-slate-border/60 bg-slate/40 px-3 py-2.5">
                  <p className="cc-mono text-[10px] uppercase text-slate-muted">
                    Generic advice
                  </p>
                  <p className="mt-1 text-sm text-white/40 italic">
                    &ldquo;{item.generic}&rdquo;
                  </p>
                </div>
                <div className="rounded-lg border border-rose-deep/25 bg-rose-deep/8 px-3 py-2.5">
                  <p className="cc-mono text-[10px] uppercase text-rose">
                    CARECHAIN
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-white/85">
                    {item.recommendation}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="cc-mono mt-5 text-[11px] text-slate-muted/60">
        Coaching is contextual guidance — not clinical diagnosis or prescription.
      </p>
    </section>
  );
}
