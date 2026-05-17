"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getSymptomLogs } from "@/lib/symptomLogsStorage";
import { moodHue } from "@/lib/moodLabels";

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

export function SymptomChartsScreen() {
  const [period, setPeriod] = useState<Period>("M");
  const all = useMemo(() => getSymptomLogs(), []);
  const filtered = useMemo(() => filterByPeriod(all, period), [all, period]);

  return (
    <div className="flex min-h-full flex-col bg-cream">
      <header className="border-border/70 safe-top flex items-center gap-2 border-b bg-cream/95 px-4 py-3 backdrop-blur-sm">
        <Link
          href="/symptoms"
          className="text-muted hover:text-ink flex items-center gap-1 text-sm font-medium"
        >
          <span aria-hidden>‹</span> Symptoms
        </Link>
        <h1 className="font-display text-ink flex-1 text-center text-lg font-semibold">Charts</h1>
        <span className="w-16" aria-hidden />
      </header>

      <section className="flex flex-1 flex-col gap-4 px-4 pb-6 pt-4">
        <nav className="bg-cream-dark flex gap-1 rounded-xl p-1" aria-label="Time period">
          {(["W", "M", "6M", "Y"] as Period[]).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPeriod(p)}
              className={[
                "flex-1 rounded-lg py-2 text-sm font-semibold transition",
                period === p ? "text-burgundy bg-white shadow-sm" : "text-muted",
              ].join(" ")}
            >
              {p}
            </button>
          ))}
        </nav>
        <p className="text-ink text-center text-sm">
          <span className="font-semibold">{filtered.length}</span> entries
        </p>
        <p className="text-muted text-center text-xs">{formatRange(filtered)}</p>
        <article
          className="border-border relative min-h-[280px] flex-1 rounded-2xl border bg-white p-4"
          aria-label="Symptom mood chart"
        >
          {filtered.length === 0 ? (
            <p className="text-muted flex h-full items-center justify-center text-sm">
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
    </div>
  );
}
