import type { WeekForecastDay } from "@/lib/demo/weekForecast";

const STRAIN_STYLES: Record<
  WeekForecastDay["strain"],
  { dot: string; label: string }
> = {
  low: { dot: "bg-ok", label: "Low" },
  moderate: { dot: "bg-warning", label: "Moderate" },
  elevated: { dot: "bg-alert", label: "Elevated" },
};

export function WeekForecast({ days }: { days: WeekForecastDay[] }) {
  return (
    <section
      aria-labelledby="forecast-heading"
      className="border-rose/15 mx-4 mb-3 rounded-2xl border bg-white/90 p-4 shadow-sm"
    >
      <h2 id="forecast-heading" className="text-ink text-sm font-semibold">
        AI forecast · next 7 days
      </h2>
      <p className="text-muted mt-0.5 text-[11px] leading-relaxed">
        Weight, sleep, skin temp & mirror trends — educational only
      </p>
      <ul className="mt-3 flex flex-col gap-2">
        {days.map((d) => {
          const style = STRAIN_STYLES[d.strain];
          return (
            <li
              key={d.day}
              className="flex gap-2.5 rounded-xl border border-blush/50 bg-cream/60 px-3 py-2"
            >
              <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${style.dot}`} />
              <div className="min-w-0 flex-1">
                <p className="text-ink text-xs font-medium">{d.day}</p>
                <p className="text-muted text-[11px] leading-snug">{d.note}</p>
              </div>
              <span className="text-muted shrink-0 self-center text-[10px] font-medium uppercase">
                {style.label}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
