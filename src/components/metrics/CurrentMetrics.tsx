import { formatRecordedAt } from "@/lib/vitals";
import type { MetricsSnapshot } from "@/lib/metrics";
import type { VitalReading } from "@/types/vitals";

function MetricPill({ reading }: { reading: VitalReading }) {
  const display =
    reading.secondaryValue != null
      ? `${reading.value}/${reading.secondaryValue}`
      : reading.value;

  const statusDot =
    reading.status === "high"
      ? "bg-alert"
      : reading.status === "elevated"
        ? "bg-warning"
        : "bg-ok";

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1 rounded-xl bg-cream/80 px-3 py-2.5">
      <div className="flex items-center gap-1.5">
        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${statusDot}`} />
        <p className="text-muted truncate text-[11px] font-medium uppercase tracking-wide">
          {reading.label}
        </p>
      </div>
      <p className="font-display text-ink text-xl font-semibold leading-none">
        {display}
        <span className="text-muted ml-1 text-xs font-normal">{reading.unit}</span>
      </p>
    </div>
  );
}

export function CurrentMetrics({ snapshot }: { snapshot: MetricsSnapshot }) {
  return (
    <section aria-labelledby="current-metrics-heading">
      <div className="mb-3 flex items-end justify-between gap-2">
        <h2 id="current-metrics-heading" className="text-ink text-sm font-semibold">
          Current metrics
        </h2>
        <p className="text-muted text-xs">{snapshot.updatedLabel}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <MetricPill reading={snapshot.bloodPressure} />
        <MetricPill reading={snapshot.heartRate} />
        <MetricPill reading={snapshot.oxygen} />
      </div>

      <p className="text-muted mt-2 text-[11px]">
        Last sync · {formatRecordedAt(snapshot.updatedAt)}
      </p>
    </section>
  );
}
