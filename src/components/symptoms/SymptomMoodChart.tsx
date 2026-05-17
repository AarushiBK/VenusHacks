import {
  moodDotFill,
  plotMoodXColumnCenter,
  plotMoodYInArea,
} from "../../lib/moodChartPlot";
import { getMoodLabel } from "../../lib/moodLabels";
import { getMoodSpectrumChartBackground } from "../../lib/moodTheme";
import {
  shouldShowBucketLabel,
  type ChartBucket,
  type ChartPeriod,
} from "../../lib/symptomChartData";

const PLOT_INSET = {
  left: "0.35rem",
  right: "0.35rem",
  top: "0.35rem",
  bottom: "0.35rem",
};

const EMPTY_MESSAGE: Record<Exclude<ChartPeriod, "M">, string> = {
  W: "No logs this week yet.",
  "6M": "No logs in the last 6 months yet.",
  Y: "No logs this year yet.",
};

const ARIA_LABEL: Record<Exclude<ChartPeriod, "M">, string> = {
  W: "Weekly mood chart. Higher means more pleasant.",
  "6M": "Six-month mood chart. Higher means more pleasant.",
  Y: "Yearly mood chart. Higher means more pleasant.",
};

interface SymptomMoodChartProps {
  buckets: ChartBucket[];
  period: ChartPeriod;
}

function MoodDots({
  buckets,
  points,
  hasData,
  emptyMessage,
}: {
  buckets: ChartBucket[];
  points: { bucket: ChartBucket & { averageMood: number }; index: number }[];
  hasData: boolean;
  emptyMessage: string;
}) {
  return (
    <div className="absolute inset-0 z-10" style={PLOT_INSET}>
      {hasData ? (
        <ul className="relative m-0 h-full list-none p-0">
          {points.map(({ bucket, index }) => {
            const x = plotMoodXColumnCenter(index, buckets.length);
            const y = plotMoodYInArea(bucket.averageMood);
            const label = getMoodLabel(bucket.averageMood);
            return (
              <li
                key={bucket.id}
                className="absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-white/90 shadow-md"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  background: moodDotFill(bucket.averageMood),
                }}
                title={`${bucket.label}: ${label} (${bucket.averageMood}) · ${bucket.entryCount} log${bucket.entryCount === 1 ? "" : "s"}`}
              />
            );
          })}
        </ul>
      ) : (
        <p className="absolute inset-0 flex items-center justify-center px-3 text-center text-sm font-medium text-ink/70">
          {emptyMessage}
        </p>
      )}
    </div>
  );
}

function SpectrumMoodChart({
  buckets,
  period,
}: {
  buckets: ChartBucket[];
  period: Exclude<ChartPeriod, "M">;
}) {
  const points = buckets
    .map((bucket, index) => ({ bucket, index }))
    .filter((p) => p.bucket.averageMood !== null) as {
    bucket: ChartBucket & { averageMood: number };
    index: number;
  }[];

  const hasData = points.length > 0;
  const showAllLabels = period === "W" || period === "6M";

  const linePath =
    points.length >= 2
      ? points
          .map((p, i) => {
            const x = plotMoodXColumnCenter(p.index, buckets.length);
            const y = plotMoodYInArea(p.bucket.averageMood);
            return `${i === 0 ? "M" : "L"} ${x} ${y}`;
          })
          .join(" ")
      : "";

  return (
    <div
      className="flex h-full min-h-0 flex-1 flex-col"
      role="img"
      aria-label={ARIA_LABEL[period]}
    >
      <div className="relative min-h-0 flex-1 overflow-hidden rounded-xl border border-ink/10 shadow-sm">
        <div
          className="absolute inset-0"
          style={{ backgroundImage: getMoodSpectrumChartBackground() }}
          aria-hidden
        />

        {linePath ? (
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute z-[5]"
            style={PLOT_INSET}
            aria-hidden
          >
            <path
              d={linePath}
              fill="none"
              stroke="#c4c4c8"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        ) : null}

        <MoodDots
          buckets={buckets}
          points={points}
          hasData={hasData}
          emptyMessage={EMPTY_MESSAGE[period]}
        />
      </div>

      <div
        className="grid shrink-0 gap-0.5 pt-2.5"
        style={{ gridTemplateColumns: `repeat(${buckets.length}, minmax(0, 1fr))` }}
      >
        {buckets.map((bucket, index) => (
          <div key={bucket.id} className="flex min-w-0 items-center justify-center">
            {showAllLabels || shouldShowBucketLabel(index, buckets.length, period) ? (
              <span className="truncate text-[10px] font-bold uppercase tracking-wide text-ink/75">
                {bucket.label}
              </span>
            ) : (
              <span className="size-2.5" aria-hidden />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SymptomMoodChart({ buckets, period }: SymptomMoodChartProps) {
  if (period === "M") return null;
  return <SpectrumMoodChart buckets={buckets} period={period} />;
}
