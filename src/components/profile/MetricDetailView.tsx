"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getMetricHistory,
  METRIC_TIMEFRAMES,
  usesCalendarView,
  type MetricHistoryPoint,
  type MetricId,
  type MetricTimeframe,
} from "@/lib/metricHistory";
import { MetricHistoryCalendar } from "./MetricHistoryCalendar";

const ACCENT = {
  rose: {
    border: "border-rose/55",
    tab: "bg-rose-deep text-white",
    value: "text-rose-deep",
    calendar: {
      cell: "border-rose/30 bg-rose/5",
      cellSelected: "border-rose-deep bg-rose/15 ring-2 ring-rose/25",
      dot: "bg-rose-deep",
      value: "text-rose-deep",
    },
  },
  sage: {
    border: "border-sage/50",
    tab: "bg-sage text-white",
    value: "text-sage",
    calendar: {
      cell: "border-sage/35 bg-sage-light/50",
      cellSelected: "border-sage bg-sage-light ring-2 ring-sage/25",
      dot: "bg-sage",
      value: "text-sage",
    },
  },
  amber: {
    border: "border-warning/50",
    tab: "bg-warning text-white",
    value: "text-warning",
    calendar: {
      cell: "border-warning/35 bg-warning-bg/60",
      cellSelected: "border-warning bg-warning-bg ring-2 ring-warning/30",
      dot: "bg-warning",
      value: "text-warning",
    },
  },
} as const;

const TF_LABELS: Record<MetricTimeframe, string> = {
  D: "D",
  W: "W",
  M: "M",
  "6M": "6M",
  Y: "Y",
};

export function MetricDetailView({
  metricId,
  onBack,
}: {
  metricId: MetricId;
  onBack: () => void;
}) {
  const [timeframe, setTimeframe] = useState<MetricTimeframe>("W");
  const [selectedPoint, setSelectedPoint] = useState<MetricHistoryPoint | null>(
    null,
  );

  const detail = useMemo(
    () => getMetricHistory(metricId, timeframe),
    [metricId, timeframe],
  );
  const style = ACCENT[detail.accent];
  const showCalendar = usesCalendarView(timeframe);

  useEffect(() => {
    setSelectedPoint(null);
  }, [timeframe, metricId]);

  const headline = selectedPoint?.value ?? detail.headline;
  const headlineSub = selectedPoint
    ? `${selectedPoint.label}${selectedPoint.sublabel ? ` · ${selectedPoint.sublabel}` : ""}`
    : detail.headlineSub;

  return (
    <div className="opacity-0 animate-[fadeUp_0.35s_ease-out_forwards]">
      <button
        type="button"
        onClick={onBack}
        className="text-muted hover:text-ink mb-4 inline-flex items-center gap-1 text-sm font-medium"
      >
        <span aria-hidden>‹</span> Back
      </button>

      <article
        className={`rounded-3xl border-2 bg-white p-5 shadow-md shadow-rose/10 ${style.border}`}
      >
        <div
          className="flex gap-1 rounded-xl bg-cream p-1"
          role="tablist"
          aria-label="Time range"
        >
          {METRIC_TIMEFRAMES.map((tf) => {
            const active = timeframe === tf;
            return (
              <button
                key={tf}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setTimeframe(tf)}
                className={`flex-1 rounded-lg py-2 text-center text-xs font-semibold tracking-wide transition-colors ${
                  active ? style.tab : "text-muted hover:text-ink"
                }`}
              >
                {TF_LABELS[tf]}
              </button>
            );
          })}
        </div>

        <h2 className="text-ink mt-5 text-center text-sm font-semibold tracking-wide">
          {detail.label}
        </h2>
        <p
          className={`font-display mt-2 text-center text-5xl font-semibold tabular-nums ${style.value}`}
        >
          {headline}
        </p>
        {headlineSub && (
          <p className="text-muted mt-1 text-center text-xs">{headlineSub}</p>
        )}
        <p className="text-muted mt-0.5 text-center text-[11px]">{detail.unit}</p>

        <div className="mt-6 border-t border-blush/60 pt-4">
          {showCalendar ? (
            <>
              {timeframe !== "6M" && (
                <p className="text-muted mb-3 text-[10px] font-semibold tracking-[0.14em] uppercase">
                  Calendar
                </p>
              )}
              <MetricHistoryCalendar
                metricId={metricId}
                timeframe={timeframe}
                points={detail.points}
                accent={style.calendar}
                selectedId={selectedPoint?.id ?? null}
                onSelect={setSelectedPoint}
              />
            </>
          ) : (
            <>
              <p className="text-muted mb-3 text-[10px] font-semibold tracking-[0.14em] uppercase">
                Today
              </p>
              {detail.points.map((point) => (
                <div
                  key={point.id}
                  className="rounded-xl border border-blush/70 bg-cream/50 px-4 py-3 text-center"
                >
                  <p className="text-ink text-sm font-medium">{point.label}</p>
                  {point.sublabel && (
                    <p className="text-muted text-xs">{point.sublabel}</p>
                  )}
                  <p className={`font-display mt-2 text-3xl font-semibold ${style.value}`}>
                    {point.value}
                  </p>
                </div>
              ))}
            </>
          )}
        </div>
      </article>
    </div>
  );
}
