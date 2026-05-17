"use client";

import { useState } from "react";
import { SIGNAL_EVENTS } from "@/lib/signalreplay";
import type { SystemResponse } from "@/lib/signalreplay";

const LEVEL_STYLES: Record<SystemResponse, string> = {
  ignored: "text-slate-muted cc-mono",
  not_asked: "text-slate-muted cc-mono",
  low: "text-slate-muted cc-mono",
  monitor: "text-warning cc-mono",
  moderate: "text-warning cc-mono font-semibold",
  elevated: "text-alert cc-mono font-semibold",
  compounding: "text-alert cc-mono font-semibold",
  escalating: "text-alert cc-mono font-semibold",
  critical_context: "text-alert cc-mono font-bold",
};

const CC_DOT: Record<SystemResponse, string> = {
  ignored: "bg-slate-border",
  not_asked: "bg-slate-border",
  low: "bg-slate-muted",
  monitor: "bg-warning",
  moderate: "bg-warning",
  elevated: "bg-alert",
  compounding: "bg-alert",
  escalating: "bg-alert",
  critical_context: "bg-alert ring-2 ring-alert/30",
};

export function MissedSignalReplay() {
  const [revealed, setRevealed] = useState(0);
  const showAll = revealed >= SIGNAL_EVENTS.length;

  function advance() {
    if (revealed < SIGNAL_EVENTS.length) setRevealed((n) => n + 1);
  }

  return (
    <section aria-labelledby="replay-heading">
      <div className="mb-6">
        <p className="text-rose cc-mono text-xs tracking-[0.18em] uppercase">
          Demo · Missed Signal Replay
        </p>
        <h2
          id="replay-heading"
          className="font-display mt-2 text-2xl font-semibold text-white"
        >
          If this had been connected earlier…
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-muted">
          Each signal appeared individually low-risk. Watch how CARECHAIN weights
          them differently as postpartum context accumulates.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {SIGNAL_EVENTS.map((event, i) => {
          if (i >= revealed) return null;

          return (
            <div
              key={event.id}
              className="cc-signal-row space-y-3 rounded-xl border border-slate-border bg-slate-mid p-3"
            >
              <div>
                <p className="cc-mono text-xs text-slate-muted">Day {event.day}</p>
                <p className="mt-0.5 text-sm font-semibold text-white">{event.signal}</p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-1.5">
                  <span
                    className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${CC_DOT[event.urgentCare.level]}`}
                  />
                  <div>
                    <p className="cc-mono text-[10px] uppercase text-slate-muted">
                      Urgent care
                    </p>
                    <p className={LEVEL_STYLES[event.urgentCare.level]}>
                      {event.urgentCare.label}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-1.5">
                  <span
                    className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${CC_DOT[event.thresholdAI.level]}`}
                  />
                  <div>
                    <p className="cc-mono text-[10px] uppercase text-slate-muted">
                      Threshold AI
                    </p>
                    <p className={LEVEL_STYLES[event.thresholdAI.level]}>
                      {event.thresholdAI.label}
                    </p>
                  </div>
                </div>
                <div className="cc-diff-carechain rounded-lg px-2.5 py-2">
                  <div className="flex items-start gap-1.5">
                    <span
                      className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${CC_DOT[event.carechain.level]}`}
                    />
                    <div>
                      <p className="cc-mono text-[10px] uppercase text-rose">CARECHAIN</p>
                      <p className={LEVEL_STYLES[event.carechain.level]}>
                        {event.carechain.label}
                      </p>
                    </div>
                  </div>
                  <p className="cc-mono mt-1 text-[11px] leading-relaxed text-rose-deep/80">
                    {event.carechainNote}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {!showAll ? (
        <button
          type="button"
          onClick={advance}
          className="mt-4 rounded-full bg-rose-deep px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-deep/80"
        >
          {revealed === 0
            ? "Start replay →"
            : `Day ${SIGNAL_EVENTS[revealed]?.day}: ${SIGNAL_EVENTS[revealed]?.signal} →`}
        </button>
      ) : (
        <div className="cc-verdict mt-5 rounded-2xl border border-alert/30 bg-alert/10 p-5">
          <p className="cc-mono text-xs uppercase tracking-wide text-alert">
            CARECHAIN — pattern conclusion
          </p>
          <p className="mt-2 text-base leading-snug font-semibold text-white">
            These signals individually appeared low-risk. Together they formed an
            escalating postpartum cardiovascular interpretation trajectory.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-muted">
            Threshold-based systems evaluated each signal in isolation. CARECHAIN
            modeled how interpretation should evolve as postpartum context accumulated.
          </p>
          <button
            type="button"
            onClick={() => setRevealed(0)}
            className="mt-4 text-xs text-slate-muted underline-offset-2 hover:underline"
          >
            Reset replay
          </button>
        </div>
      )}
    </section>
  );
}
