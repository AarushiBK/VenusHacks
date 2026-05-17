import { useMemo, useState } from "react";
import { MobileHeader } from "../../components/layout/MobileHeader";
import { getSymptomLogs } from "../../lib/symptomLogsStorage";
import { moodHue } from "../../lib/moodLabels";

type Period = "W" | "M" | "6M" | "Y";

const PERIOD_DAYS: Record<Period, number> = {
  W: 7,
  M: 30,
  "6M": 180,
  Y: 365,
};

function filterByPeriod(entries: ReturnType<typeof getSymptomLogs>, period: Period) {
  const cutoff = Date.now() - PERIOD_DAYS[period] * 24 * 60 * 60 * 1000;
  return entries.filter((e) => new Date(e.createdAt).getTime() >= cutoff);
}

function formatRange(entries: ReturnType<typeof getSymptomLogs>) {
  if (entries.length === 0) return "No data yet";
  const dates = entries.map((e) => new Date(e.createdAt));
  const min = new Date(Math.min(...dates.map((d) => d.getTime())));
  const max = new Date(Math.max(...dates.map((d) => d.getTime())));
  const fmt = (d: Date) =>
    d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  return `${fmt(min)} – ${fmt(max)}`;
}

export function SymptomChartsPage() {
  const [period, setPeriod] = useState<Period>("M");
  const all = useMemo(() => getSymptomLogs(), []);
  const filtered = useMemo(() => filterByPeriod(all, period), [all, period]);

  return (
    <>
      <MobileHeader title="Charts" backTo="/symptoms" backLabel="Back to symptoms" />
      <section className="flex flex-1 flex-col gap-4 px-4 pb-6 pt-4">
        <nav className="flex gap-1 rounded-xl bg-cream-dark p-1" aria-label="Time period">
          {(["W", "M", "6M", "Y"] as Period[]).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPeriod(p)}
              className={[
                "flex-1 rounded-lg py-2 text-sm font-semibold transition",
                period === p ? "bg-white text-burgundy shadow-sm" : "text-muted",
              ].join(" ")}
            >
              {p}
            </button>
          ))}
        </nav>
        <p className="text-center text-sm text-ink">
          <span className="font-semibold">{filtered.length}</span> entries
        </p>
        <p className="text-center text-xs text-muted">{formatRange(filtered)}</p>
        <article
          className="relative min-h-[280px] flex-1 rounded-2xl border border-border bg-white p-4"
          aria-label="Symptom mood chart"
        >
          {filtered.length === 0 ? (
            <p className="flex h-full items-center justify-center text-sm text-muted">
              Log symptoms to see your history here.
            </p>
          ) : (
            <ul className="relative h-full min-h-[240px] list-none p-0">
              {filtered.map((entry, i) => {
                const x = 8 + ((i + 1) / (filtered.length + 1)) * 84;
                const y = 92 - (entry.mood / 100) * 80;
                const hue = moodHue(entry.mood);
                return (
                  <li
                    key={entry.id}
                    className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-sm"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      background: `hsl(${hue} 55% 52%)`,
                    }}
                    title={`Mood ${entry.mood} — ${new Date(entry.createdAt).toLocaleString()}`}
                  />
                );
              })}
            </ul>
          )}
        </article>
      </section>
    </>
  );
}
