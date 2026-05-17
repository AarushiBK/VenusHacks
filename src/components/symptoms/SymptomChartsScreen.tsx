"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SymptomMoodCalendar } from "@/components/symptoms/SymptomMoodCalendar";
import { SymptomMoodChart } from "@/components/symptoms/SymptomMoodChart";
import {
  buildCalendarMonth,
  buildChartBuckets,
  formatBucketRange,
  totalEntriesInBuckets,
  totalEntriesInCalendarMonth,
  type ChartPeriod,
} from "@/lib/symptomChartData";
import { getSymptomLogs } from "@/lib/symptomLogsStorage";

const PERIOD_LABELS: Record<ChartPeriod, string> = {
  W: "Week",
  M: "Month",
  "6M": "6 months",
  Y: "Year",
};

export function SymptomChartsScreen() {
  const [period, setPeriod] = useState<ChartPeriod>("W");
  const all = useMemo(() => getSymptomLogs(), []);
  const buckets = useMemo(() => buildChartBuckets(all, period), [all, period]);
  const calendar = useMemo(
    () => (period === "M" ? buildCalendarMonth(all) : null),
    [all, period],
  );
  const entryCount = useMemo(() => {
    if (period === "M" && calendar) return totalEntriesInCalendarMonth(calendar);
    return totalEntriesInBuckets(buckets);
  }, [period, calendar, buckets]);
  const rangeLabel = useMemo(() => {
    if (period === "M" && calendar) return calendar.monthLabel;
    return formatBucketRange(buckets, period);
  }, [period, calendar, buckets]);

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

      <section className="flex min-h-0 flex-1 flex-col gap-4 px-4 pb-6 pt-4">
        <nav className="bg-cream-dark flex gap-1 rounded-xl p-1" aria-label="Time period">
          {(["W", "M", "6M", "Y"] as ChartPeriod[]).map((p) => (
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
          <span className="font-semibold">{PERIOD_LABELS[period]}</span>
          {" · "}
          <span className="font-semibold">{entryCount}</span>{" "}
          {entryCount === 1 ? "log" : "logs"}
        </p>
        <p className="text-muted text-center text-xs">{rangeLabel}</p>

        <article
          className={[
            "border-border relative flex-1 rounded-2xl border",
            period === "M"
              ? "bg-cream flex min-h-[300px] flex-1 flex-col items-center justify-center p-4 shadow-[0_8px_24px_rgba(42,31,36,0.08)]"
              : "border-border bg-cream flex min-h-0 flex-1 flex-col p-3 shadow-[0_8px_24px_rgba(42,31,36,0.08)]",
          ].join(" ")}
          aria-label={period === "M" ? "Symptom mood calendar" : "Symptom mood chart"}
        >
          {period === "M" && calendar ? (
            <SymptomMoodCalendar calendar={calendar} />
          ) : (
            <SymptomMoodChart buckets={buckets} period={period} />
          )}
        </article>
      </section>
    </div>
  );
}
