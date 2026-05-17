"use client";

import { buildPassportTimeline } from "@/lib/passportScans";

const statusDot = {
  ok: "bg-sage",
  caution: "bg-warning",
  insight: "bg-rose-deep ring-2 ring-rose/30",
} as const;

export function CardiovascularTimeline({
  selectedScanId,
  onSelectScan,
}: {
  selectedScanId: string | null;
  onSelectScan: (id: string) => void;
}) {
  const events = buildPassportTimeline();

  return (
    <section
      className="rounded-2xl border border-blush/80 bg-white p-5"
      aria-labelledby="timeline-heading"
    >
      <h2 id="timeline-heading" className="text-ink text-sm font-semibold uppercase tracking-wide">
        Cardiovascular timeline
      </h2>
      <p className="text-muted mt-1 text-xs">
        Demo passport — tap a scan event to jump to the body marker.
      </p>

      <ol className="mt-5 space-y-0">
        {events.map((event, i) => {
          const hasScan = Boolean(event.scanId);
          const active = event.scanId != null && event.scanId === selectedScanId;

          return (
            <li key={event.id} className="relative flex gap-4 pb-5 last:pb-0">
              {i < events.length - 1 && (
                <span
                  className="absolute left-[7px] top-4 h-[calc(100%-4px)] w-0.5 bg-blush"
                  aria-hidden
                />
              )}
              <span
                className={`relative z-10 mt-1 h-3.5 w-3.5 shrink-0 rounded-full ${statusDot[event.status]} ${
                  active ? "ring-2 ring-rose ring-offset-2" : ""
                }`}
              />
              <div className="min-w-0 flex-1">
                {hasScan ? (
                  <button
                    type="button"
                    onClick={() => onSelectScan(event.scanId!)}
                    className={`w-full rounded-lg text-left transition-colors ${
                      active ? "bg-blush/60 -mx-2 px-2 py-1" : "hover:bg-blush/30 -mx-2 px-2 py-1"
                    }`}
                  >
                    <EventContent event={event} hasScan />
                  </button>
                ) : (
                  <EventContent event={event} hasScan={false} />
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function EventContent({
  event,
  hasScan,
}: {
  event: ReturnType<typeof buildPassportTimeline>[number];
  hasScan: boolean;
}) {
  return (
    <>
      <div className="flex flex-wrap items-baseline justify-between gap-1">
        <p className="text-ink text-sm font-medium">{event.label}</p>
        <span className="text-muted text-xs">{event.year}</span>
      </div>
      <p className="text-muted text-xs">
        {event.phase}
        {hasScan && (
          <span className="text-rose-deep ml-1.5 font-medium">· View scan</span>
        )}
      </p>
    </>
  );
}
