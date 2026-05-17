import { LOCKED_BASELINES } from "@/lib/cardioState";

export function LockedBaselines() {
  return (
    <section aria-labelledby="baselines-heading" className="glass-card p-4">
      <h2 id="baselines-heading" className="text-ink text-sm font-semibold">
        Locked baselines
      </h2>
      <p className="text-muted mt-0.5 text-xs leading-relaxed">
        Pre-conception reference — unchanged during the pregnancy stress test
      </p>
      <ul className="mt-3 flex flex-col gap-2">
        {LOCKED_BASELINES.map((b) => (
          <li
            key={b.id}
            className="flex items-center justify-between gap-3 rounded-xl border border-white/60 bg-white/50 px-3 py-2.5"
          >
            <div className="min-w-0">
              <p className="text-ink text-sm font-medium">{b.label}</p>
              <p className="text-muted text-[11px]">{b.lockedLabel}</p>
            </div>
            <p className="text-ink shrink-0 text-right font-display text-lg font-semibold tabular-nums">
              {b.value}
              <span className="text-muted ml-0.5 text-xs font-normal">{b.unit}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
