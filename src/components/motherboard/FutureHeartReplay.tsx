"use client";

import { REPLAY_PATHWAYS } from "@/lib/motherboard";

export function FutureHeartReplay() {
  const source = REPLAY_PATHWAYS[0];
  const paths = REPLAY_PATHWAYS.slice(1);

  return (
    <section
      className="overflow-hidden rounded-2xl border-2 border-rose-deep/20 bg-gradient-to-b from-rose-deep/8 via-white to-sage-light/40 p-5"
      aria-labelledby="replay-heading"
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-rose-deep text-xs font-bold tracking-wide uppercase">
            Replay
          </p>
          <h2 id="replay-heading" className="font-display text-ink mt-1 text-xl font-semibold">
            Future Heart Replay
          </h2>
        </div>
        <span className="rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-bold tracking-wide text-rose-deep uppercase">
          Education, not prediction
        </span>
      </div>

      <p className="text-muted mt-2 text-sm leading-relaxed">
        Education + prevention modeling — how pregnancy events may shape long-term
        cardiovascular awareness.
      </p>

      <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-stretch">
        <div className="rounded-xl border border-rose/20 bg-white p-4 lg:w-[38%]">
          <p className="text-muted text-[11px] font-semibold uppercase">Source</p>
          <p className="text-ink mt-1 font-semibold">{source.label}</p>
          <ul className="mt-3 flex flex-col gap-1.5">
            {source.events?.map((e) => (
              <li key={e} className="text-sm text-ink">
                <span className="text-rose mr-2" aria-hidden>
                  •
                </span>
                {e}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative hidden items-center justify-center lg:flex lg:w-12" aria-hidden>
          <svg viewBox="0 0 48 120" className="h-full w-12 text-rose/50">
            <path
              d="M4 60 H20 M20 20 V100 M20 20 H44 M20 60 H44 M20 100 H44"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="replay-path"
            />
          </svg>
        </div>

        <ul className="flex flex-1 flex-col gap-3">
          {paths.map((path, i) => (
            <li
              key={path.id}
              className="replay-card rounded-xl border border-sage/25 bg-white/90 p-4"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <p className="text-sage text-xs font-semibold uppercase">{path.label}</p>
              <p className="text-ink mt-1 text-sm leading-snug">{path.outcome}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
