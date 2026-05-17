import { INTERPRETATION_ROWS, SYSTEM_VERDICTS } from "@/lib/signalreplay";
import type { SystemResponse } from "@/lib/signalreplay";

const LABEL_STYLE: Record<SystemResponse, string> = {
  ignored: "text-slate-muted",
  not_asked: "text-slate-muted italic",
  low: "text-slate-muted",
  monitor: "text-warning",
  moderate: "text-warning font-semibold",
  elevated: "text-alert font-semibold",
  compounding: "text-alert font-semibold",
  escalating: "text-alert font-semibold",
  critical_context: "text-alert font-bold",
};

const VERDICT_STYLE = {
  urgentCare:
    "rounded-xl border border-slate-border bg-slate-mid/60 px-4 py-3 text-sm text-slate-muted",
  thresholdAI:
    "rounded-xl border border-slate-border bg-slate-mid/60 px-4 py-3 text-sm text-warning/80",
  carechain:
    "cc-verdict rounded-xl border border-alert/30 bg-alert/10 px-4 py-3 text-sm font-semibold text-white",
};

export function InterpretationDiff() {
  return (
    <section aria-labelledby="diff-heading">
      <div className="mb-6">
        <p className="text-rose cc-mono text-xs tracking-[0.18em] uppercase">
          Interpretation diffing
        </p>
        <h2
          id="diff-heading"
          className="font-display mt-2 text-2xl font-semibold text-white"
        >
          Same patient. Three systems. Three verdicts.
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-muted">
          The same patient signals, interpreted by three different systems.
          Watch how postpartum context re-weights every row.
        </p>
      </div>

      <div className="space-y-3">
        {INTERPRETATION_ROWS.map((row, i) => (
          <div
            key={row.id}
            className={`rounded-xl border border-slate-border p-3 ${
              i % 2 === 0 ? "bg-slate" : "bg-slate-mid/40"
            }`}
          >
            <p className="cc-mono text-xs text-white/90">{row.signal}</p>
            <div className="mt-2 space-y-2 text-sm">
              <div>
                <p className="cc-mono text-[10px] uppercase text-slate-muted">
                  Urgent care
                </p>
                <p className={LABEL_STYLE[row.urgentCare.level]}>
                  {row.urgentCare.label}
                </p>
              </div>
              <div>
                <p className="cc-mono text-[10px] uppercase text-slate-muted">
                  Threshold AI
                </p>
                <p className={LABEL_STYLE[row.thresholdAI.level]}>
                  {row.thresholdAI.label}
                </p>
              </div>
              <div className="cc-diff-carechain rounded-lg px-2 py-1.5">
                <p className="cc-mono text-[10px] uppercase text-rose">CARECHAIN</p>
                <p className={LABEL_STYLE[row.carechain.level]}>
                  {row.carechain.label}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3">
      <div className={VERDICT_STYLE.urgentCare}>
          <p className="cc-mono mb-1.5 text-[10px] uppercase text-slate-muted">
            Urgent care verdict
          </p>
          <p>{SYSTEM_VERDICTS.urgentCare}</p>
        </div>
        <div className={VERDICT_STYLE.thresholdAI}>
          <p className="cc-mono mb-1.5 text-[10px] uppercase text-slate-muted">
            Threshold AI verdict
          </p>
          <p>{SYSTEM_VERDICTS.thresholdAI}</p>
        </div>
        <div className={VERDICT_STYLE.carechain}>
          <p className="cc-mono mb-1.5 text-[10px] uppercase text-alert/80">
            CARECHAIN verdict
          </p>
          <p>{SYSTEM_VERDICTS.carechain}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-muted leading-relaxed">
        The critical row:{" "}
        <span className="text-rose font-medium">Postpartum week 2</span> —
        urgent care doesn&apos;t ask. Threshold AI doesn&apos;t factor it.
        CARECHAIN treats it as critical context for interpreting every other
        signal.
      </p>
    </section>
  );
}
