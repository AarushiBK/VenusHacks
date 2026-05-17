import { useMemo, useState } from "react";
import { MobileHeader } from "../../components/layout/MobileHeader";
import { SymptomMoodCalendar } from "../../components/symptoms/SymptomMoodCalendar";
import { SymptomMoodChart } from "../../components/symptoms/SymptomMoodChart";
import {
  buildCalendarMonth,
  buildChartBuckets,
  formatBucketRange,
  totalEntriesInBuckets,
  totalEntriesInCalendarMonth,
  type ChartPeriod,
} from "../../lib/symptomChartData";
import { getSymptomLogs } from "../../lib/symptomLogsStorage";

const PERIOD_LABELS: Record<ChartPeriod, string> = {
  W: "Week",
  M: "Month",
  "6M": "6 months",
  Y: "Year",
};

export function SymptomChartsPage() {
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
    <>
      <MobileHeader title="Charts" backTo="/symptoms" backLabel="Back to symptoms" />
      <section className="flex min-h-0 flex-1 flex-col gap-4 px-4 pb-6 pt-4">
        <nav className="flex gap-1 rounded-xl bg-cream-dark p-1" aria-label="Time period">
          {(["W", "M", "6M", "Y"] as ChartPeriod[]).map((p) => (
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
          <span className="font-semibold">{PERIOD_LABELS[period]}</span>
          {" · "}
          <span className="font-semibold">{entryCount}</span>{" "}
          {entryCount === 1 ? "log" : "logs"}
        </p>
        <p className="text-center text-xs text-muted">{rangeLabel}</p>

        <article
          className={[
            "relative flex-1 rounded-2xl border border-border",
            period === "M"
              ? "flex min-h-[300px] flex-1 flex-col items-center justify-center bg-cream p-4 shadow-[0_8px_24px_rgba(42,31,36,0.08)]"
              : "flex min-h-0 flex-1 flex-col border-border bg-cream p-3 shadow-[0_8px_24px_rgba(42,31,36,0.08)]",
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
    </>
  );
}
