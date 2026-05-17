import { TIMELINE_EVENTS } from "@/lib/motherboard";

const statusDot = {
  ok: "bg-sage",
  caution: "bg-warning",
  insight: "bg-rose-deep ring-2 ring-rose/30",
} as const;

export function CardiovascularTimeline() {
  return (
    <section
      className="rounded-2xl border border-blush/80 bg-white p-5"
      aria-labelledby="timeline-heading"
    >
      <h2 id="timeline-heading" className="text-ink text-sm font-semibold uppercase tracking-wide">
        Cardiovascular timeline
      </h2>
      <p className="text-muted mt-1 text-xs">Demo passport — events never discarded.</p>

      <ol className="mt-5 space-y-0">
        {TIMELINE_EVENTS.map((event, i) => (
          <li key={event.id} className="relative flex gap-4 pb-5 last:pb-0">
            {i < TIMELINE_EVENTS.length - 1 && (
              <span
                className="absolute left-[7px] top-4 h-[calc(100%-4px)] w-0.5 bg-blush"
                aria-hidden
              />
            )}
            <span
              className={`relative z-10 mt-1 h-3.5 w-3.5 shrink-0 rounded-full ${statusDot[event.status]}`}
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-1">
                <p className="text-ink text-sm font-medium">{event.label}</p>
                <span className="text-muted text-xs">{event.year}</span>
              </div>
              <p className="text-muted text-xs">{event.phase}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
