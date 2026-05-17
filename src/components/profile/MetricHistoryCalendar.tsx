"use client";

import { useMemo, useState } from "react";
import {
  getDailyPointsForMonth,
  type MetricHistoryPoint,
  type MetricId,
  type MetricTimeframe,
  toDateISO,
} from "@/lib/metricHistory";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"] as const;

export type CalendarAccent = {
  cell: string;
  cellSelected: string;
  dot: string;
  value: string;
};

function buildPointMap(points: MetricHistoryPoint[]) {
  const map = new Map<string, MetricHistoryPoint>();
  for (const p of points) map.set(p.dateISO, p);
  return map;
}

function monthLabel(year: number, month: number) {
  return new Date(year, month, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

function MonthGrid({
  year,
  month,
  pointMap,
  accent,
  selectedId,
  onSelect,
}: {
  year: number;
  month: number;
  pointMap: Map<string, MetricHistoryPoint>;
  accent: CalendarAccent;
  selectedId: string | null;
  onSelect: (point: MetricHistoryPoint) => void;
}) {
  const first = new Date(year, month, 1);
  const startPad = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: Array<{ day: number | null; iso?: string }> = [];

  for (let i = 0; i < startPad; i++) cells.push({ day: null });
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, iso: toDateISO(new Date(year, month, d)) });
  }

  return (
    <div className="space-y-2">
      <p className="text-muted text-center text-xs font-medium">
        {monthLabel(year, month)}
      </p>
      <div className="grid grid-cols-7 gap-1">
        {WEEKDAYS.map((d, i) => (
          <span
            key={`${d}-${i}`}
            className="text-muted text-center text-[9px] font-semibold"
          >
            {d}
          </span>
        ))}
        {cells.map((cell, idx) => {
          if (cell.day === null) {
            return <span key={`empty-${idx}`} className="aspect-square" />;
          }
          const point = cell.iso ? pointMap.get(cell.iso) : undefined;
          const selected = point?.id === selectedId;
          const hasData = Boolean(point);

          return (
            <button
              key={cell.iso ?? idx}
              type="button"
              disabled={!hasData}
              onClick={() => point && onSelect(point)}
              className={`flex aspect-square flex-col items-center justify-center rounded-lg border text-center transition-all ${
                selected
                  ? accent.cellSelected
                  : hasData
                    ? `${accent.cell} hover:scale-[1.04]`
                    : "border-transparent opacity-30"
              } text-[10px]`}
            >
              <span className="text-muted font-medium">{cell.day}</span>
              {hasData && point && (
                <>
                  <span
                    className={`mt-0.5 h-1.5 w-1.5 rounded-full ${accent.dot}`}
                    aria-hidden
                  />
                  <span
                    className={`mt-0.5 max-w-full truncate text-[8px] font-semibold leading-none ${accent.value}`}
                  >
                    {point.value}
                  </span>
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function WeekStrip({
  points,
  accent,
  selectedId,
  onSelect,
}: {
  points: MetricHistoryPoint[];
  accent: CalendarAccent;
  selectedId: string | null;
  onSelect: (point: MetricHistoryPoint) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-7 gap-1.5">
        {WEEKDAYS.map((d, i) => (
          <span
            key={`${d}-${i}`}
            className="text-muted text-center text-[10px] font-semibold"
          >
            {d}
          </span>
        ))}
        {points.map((point) => {
          const selected = point.id === selectedId;
          return (
            <button
              key={point.id}
              type="button"
              onClick={() => onSelect(point)}
              className={`flex min-h-[3.25rem] flex-col items-center justify-center rounded-xl border py-2 transition-all ${
                selected ? accent.cellSelected : `${accent.cell} hover:scale-[1.03]`
              }`}
            >
              <span className="text-muted text-[10px] font-medium">
                {point.date.getDate()}
              </span>
              <span className={`mt-1 text-[10px] font-semibold tabular-nums ${accent.value}`}>
                {point.value}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SixMonthSummary({
  points,
  accent,
  selectedId,
  onSelect,
}: {
  points: MetricHistoryPoint[];
  accent: CalendarAccent;
  selectedId: string | null;
  onSelect: (point: MetricHistoryPoint) => void;
}) {
  return (
    <div className="space-y-3">
      <p className="text-muted text-[10px] font-semibold tracking-[0.14em] uppercase">
        Monthly breakdown
      </p>
      <div className="grid grid-cols-3 gap-2">
        {points.map((point) => {
          const selected = selectedId === point.id;
          return (
            <button
              key={point.id}
              type="button"
              onClick={() => onSelect(point)}
              className={`rounded-xl border px-2 py-3 text-center transition-all ${
                selected ? accent.cellSelected : `${accent.cell} hover:scale-[1.02]`
              }`}
            >
              <p className="text-ink text-xs font-semibold">
                {point.date.toLocaleDateString("en-US", { month: "short" })}
              </p>
              {point.sublabel && (
                <p className="text-muted text-[10px]">{point.sublabel}</p>
              )}
              <p className={`mt-1 text-sm font-semibold tabular-nums ${accent.value}`}>
                {point.value}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MonthPickerCalendar({
  metricId,
  points,
  accent,
  selectedId,
  onSelect,
  columns = 3,
  hint,
}: {
  metricId: MetricId;
  points: MetricHistoryPoint[];
  accent: CalendarAccent;
  selectedId: string | null;
  onSelect: (point: MetricHistoryPoint) => void;
  columns?: 2 | 3;
  hint: string;
}) {
  const [drill, setDrill] = useState<{ year: number; month: number } | null>(null);

  const monthPoints = useMemo(() => {
    if (!drill) return [];
    return getDailyPointsForMonth(metricId, drill.year, drill.month);
  }, [metricId, drill]);

  const monthMap = useMemo(() => buildPointMap(monthPoints), [monthPoints]);

  return (
    <div className="space-y-4">
      <p className="text-muted text-[10px] font-semibold tracking-[0.12em] uppercase">
        {hint}
      </p>
      <div className={`grid gap-2 ${columns === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
        {points.map((point) => {
          const y = point.date.getFullYear();
          const m = point.date.getMonth();
          const selected =
            selectedId === point.id || (drill?.year === y && drill?.month === m);
          return (
            <button
              key={point.id}
              type="button"
              onClick={() => {
                onSelect(point);
                setDrill({ year: y, month: m });
              }}
              className={`rounded-xl border px-2 py-3 text-center transition-all ${
                selected ? accent.cellSelected : `${accent.cell} hover:scale-[1.02]`
              }`}
            >
              <p className="text-ink text-xs font-semibold">
                {point.date.toLocaleDateString("en-US", { month: "short" })}
              </p>
              {point.sublabel && (
                <p className="text-muted text-[10px]">{point.sublabel}</p>
              )}
              <p className={`mt-1 text-sm font-semibold tabular-nums ${accent.value}`}>
                {point.value}
              </p>
            </button>
          );
        })}
      </div>
      {drill && (
        <div className="border-t border-blush/60 pt-4">
          <p className="text-muted mb-2 text-xs font-medium">
            {monthLabel(drill.year, drill.month)} — daily readings
          </p>
          <MonthGrid
            year={drill.year}
            month={drill.month}
            pointMap={monthMap}
            accent={accent}
            selectedId={selectedId}
            onSelect={onSelect}
          />
        </div>
      )}
    </div>
  );
}

export function MetricHistoryCalendar({
  metricId,
  timeframe,
  points,
  accent,
  selectedId,
  onSelect,
}: {
  metricId: MetricId;
  timeframe: MetricTimeframe;
  points: MetricHistoryPoint[];
  accent: CalendarAccent;
  selectedId: string | null;
  onSelect: (point: MetricHistoryPoint) => void;
}) {
  const pointMap = useMemo(() => buildPointMap(points), [points]);

  if (timeframe === "W") {
    return (
      <WeekStrip
        points={points}
        accent={accent}
        selectedId={selectedId}
        onSelect={onSelect}
      />
    );
  }

  if (timeframe === "M") {
    const anchor = points[0]?.date ?? new Date();
    return (
      <MonthGrid
        year={anchor.getFullYear()}
        month={anchor.getMonth()}
        pointMap={pointMap}
        accent={accent}
        selectedId={selectedId}
        onSelect={onSelect}
      />
    );
  }

  if (timeframe === "6M") {
    return (
      <SixMonthSummary
        points={points}
        accent={accent}
        selectedId={selectedId}
        onSelect={onSelect}
      />
    );
  }

  if (timeframe === "Y") {
    return (
      <MonthPickerCalendar
        metricId={metricId}
        points={points}
        accent={accent}
        selectedId={selectedId}
        onSelect={onSelect}
        columns={3}
        hint="Past 12 months · tap a month for daily readings"
      />
    );
  }

  return null;
}
