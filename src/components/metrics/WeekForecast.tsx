import type { WeekForecastDay } from "@/lib/cardioState";

const STRAIN_STYLES: Record<
  WeekForecastDay["strain"],
  { dot: string; label: string }
> = {
  low: { dot: "bg-ok", label: "Low strain" },
  moderate: { dot: "bg-warning", label: "Moderate" },
  elevated: { dot: "bg-alert", label: "Elevated" },
};

export function WeekForecast({ days }: { days: WeekForecastDay[] }) {
  return (
    <section aria-labelledby="forecast-heading" className="glass-card p-4">
      <h2 id="forecast-heading" className="text-ink text-sm font-semibold">
        AI forecast · next 7 days
      </h2>
      <p className="text-muted mt-0.5 text-xs leading-relaxed">
        Trends from weight, sleep, and skin temp — education only, not a diagnosis
      </p>
      <ul className="mt-3 flex flex-col gap-2">
        {days.map((d) => {
          const style = STRAIN_STYLES[d.strain];
          return (
            <li
              key={d.day}
              className="flex gap-3 rounded-xl border border-white/60 bg-white/45 px-3 py-2.5"
            >
              <span
                className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${style.dot}`}
                aria-hidden
              />
              <div className="min-w-0 flex-1">
                <p className="text-ink text-sm font-medium">{d.day}</p>
                <p className="text-muted text-xs leading-snug">{d.note}</p>
              </div>
              <span className="text-muted shrink-0 self-center text-[10px] font-medium uppercase tracking-wide">
                {style.label}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
