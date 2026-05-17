import { CONTINUITY_EVENTS, CONTINUITY_INSIGHT } from "@/lib/signalreplay";

const STATUS_STYLES = {
  connected: {
    dot: "bg-sage ring-2 ring-sage/20",
    label: "text-sage cc-mono text-[10px]",
    labelText: "Connected",
  },
  gap: {
    dot: "bg-warning ring-2 ring-warning/30 cc-gap-pulse",
    label: "text-warning cc-mono text-[10px]",
    labelText: "Gap",
  },
  missed: {
    dot: "bg-alert ring-2 ring-alert/30 cc-gap-pulse",
    label: "text-alert cc-mono text-[10px]",
    labelText: "Missed",
  },
  unresolved: {
    dot: "bg-alert ring-4 ring-alert/20 cc-gap-pulse",
    label: "text-alert cc-mono text-[10px] font-bold",
    labelText: "Unresolved",
  },
};

export function ContinuityGapVisualizer() {
  return (
    <section aria-labelledby="continuity-heading">
      <div className="mb-6">
        <p className="text-rose cc-mono text-xs tracking-[0.18em] uppercase">
          Care continuity map
        </p>
        <h2
          id="continuity-heading"
          className="font-display mt-2 text-2xl font-semibold text-white"
        >
          Not one bad moment — a chain of disconnected ones
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-muted">
          CARECHAIN maps the patient journey across providers and surfaces where
          continuity collapsed. No single provider ever saw the full picture.
        </p>
      </div>

      <ol className="relative space-y-4 border-l-2 border-slate-border pl-5">
        {CONTINUITY_EVENTS.map((event) => {
          const s = STATUS_STYLES[event.status];
          const isGapOrWorse =
            event.status === "gap" ||
            event.status === "missed" ||
            event.status === "unresolved";

          return (
            <li key={event.id} className="relative">
              <span
                className={`absolute top-1 -left-[1.65rem] flex h-5 w-5 items-center justify-center rounded-full ${s.dot}`}
                aria-hidden
              />
              <span className={s.label}>{s.labelText}</span>
              <div
                className={`mt-2 rounded-xl border p-3 ${
                  isGapOrWorse
                    ? "border-alert/30 bg-slate-mid"
                    : "border-slate-border bg-slate-mid/50"
                }`}
              >
                <p className="cc-mono text-[10px] text-slate-muted">
                  {event.date} · {event.provider}
                </p>
                <p
                  className={`mt-1 text-xs font-semibold ${
                    isGapOrWorse ? "text-white" : "text-white/80"
                  }`}
                >
                  {event.label}
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-muted">
                  {event.note}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Insight banner */}
      <div className="cc-verdict mt-6 rounded-2xl border border-alert/25 bg-alert/8 p-5">
        <p className="cc-mono text-xs uppercase text-alert tracking-wide">
          CARECHAIN insight
        </p>
        <p className="mt-2 text-base font-semibold text-white leading-snug">
          Potential continuity gap detected
        </p>
        <p className="mt-2 text-sm text-slate-muted leading-relaxed">
          {CONTINUITY_INSIGHT}
        </p>
      </div>
    </section>
  );
}
