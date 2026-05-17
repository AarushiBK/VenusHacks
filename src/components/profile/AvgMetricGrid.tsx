import type { AvgMetricAccent, AvgMetricCard } from "@/lib/profile";
import { isMetricId } from "@/lib/metricHistory";
import { formatRecordedAt, mockVitals } from "@/lib/vitals";
import type { VitalKind } from "@/types/vitals";
import { StatusBadge } from "@/components/vitals/StatusBadge";
import { VitalIcon } from "@/components/vitals/VitalIcon";

const ACCENT_STYLES: Record<
  AvgMetricAccent,
  { border: string; bg: string; value: string }
> = {
  rose: {
    border: "border-rose/50",
    bg: "bg-white",
    value: "text-rose-deep",
  },
  sage: {
    border: "border-sage/45",
    bg: "bg-sage-light/40",
    value: "text-sage",
  },
  amber: {
    border: "border-warning/45",
    bg: "bg-warning-bg/50",
    value: "text-warning",
  },
};

const METRIC_VITAL_KIND: Record<string, VitalKind> = {
  bp: "blood_pressure",
  hr: "heart_rate",
  spo2: "oxygen",
  weight: "weight",
};

function vitalForMetric(metricId: string) {
  const kind = METRIC_VITAL_KIND[metricId];
  if (!kind) return undefined;
  return mockVitals.find((v) => v.kind === kind);
}

function MetricTile({
  metric,
  onSelect,
}: {
  metric: AvgMetricCard;
  onSelect: (id: string) => void;
}) {
  const style = ACCENT_STYLES[metric.accent];
  const canOpen = isMetricId(metric.id);
  const vital = vitalForMetric(metric.id);

  return (
    <button
      type="button"
      disabled={!canOpen}
      onClick={() => canOpen && onSelect(metric.id)}
      className={`flex min-h-[10.5rem] w-full flex-col gap-2.5 rounded-2xl border-2 p-3.5 text-left shadow-sm shadow-rose/5 transition-transform active:scale-[0.98] ${style.border} ${style.bg} ${
        canOpen ? "cursor-pointer" : "cursor-default opacity-60"
      }`}
    >
      <div className="flex items-start gap-2">
        {vital && (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blush [&_svg]:h-4 [&_svg]:w-4">
            <VitalIcon kind={vital.kind} />
          </div>
        )}
        <p className="text-ink min-w-0 flex-1 text-xs leading-snug font-medium">
          {metric.label}
        </p>
      </div>

      <div className="flex flex-1 flex-col justify-center py-0.5">
        <p className={`font-display text-2xl font-semibold tabular-nums ${style.value}`}>
          {metric.value}
        </p>
        {metric.unit && (
          <p className="text-muted mt-0.5 text-[11px]">{metric.unit}</p>
        )}
      </div>

      {vital && (
        <div className="border-blush/50 mt-auto flex items-end justify-between gap-2 border-t pt-2">
          <p className="text-muted min-w-0 flex-1 text-[10px] leading-snug">
            Last reading · {formatRecordedAt(vital.recordedAt)}
          </p>
          <StatusBadge
            status={vital.status}
            label={vital.statusLabel}
            compact
          />
        </div>
      )}
    </button>
  );
}

export function AvgMetricGrid({
  metrics,
  onSelectMetric,
}: {
  metrics: AvgMetricCard[];
  onSelectMetric: (id: string) => void;
}) {
  return (
    <section aria-labelledby="avg-metrics-heading">
      <div className="mb-3 flex items-end justify-between gap-3">
        <h2
          id="avg-metrics-heading"
          className="text-muted text-xs font-semibold tracking-[0.14em] uppercase"
        >
          Avg metrics
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {metrics.map((metric) => (
          <MetricTile key={metric.id} metric={metric} onSelect={onSelectMetric} />
        ))}
      </div>
    </section>
  );
}
