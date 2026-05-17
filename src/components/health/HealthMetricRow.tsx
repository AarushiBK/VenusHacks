"use client";

import type { HealthMetricOverview } from "@/lib/healthOverview";
import { formatRecordedAt } from "@/lib/healthOverview";
import { isMetricId } from "@/lib/metricHistory";
import { StatusBadge } from "@/components/vitals/StatusBadge";
import { VitalIcon } from "@/components/vitals/VitalIcon";

export function HealthMetricRow({
  metric,
  onSelect,
}: {
  metric: HealthMetricOverview;
  onSelect?: (metricId: string) => void;
}) {
  const canOpen = metric.metricId && isMetricId(metric.metricId);

  const content = (
    <>
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blush [&_svg]:h-4 [&_svg]:w-4">
          <VitalIcon kind={metric.kind} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-ink text-sm font-semibold">{metric.label}</p>
          <p className="text-muted mt-1 text-xs">
            Latest ·{" "}
            <span className="text-ink font-medium">{metric.currentDisplay}</span>
          </p>
          <p className="text-muted mt-0.5 text-xs">
            {metric.averageCaption} ·{" "}
            <span className="text-ink/90 font-medium">{metric.averageDisplay}</span>
          </p>
          {metric.note && (
            <p className="text-muted mt-1 text-[11px] leading-snug">{metric.note}</p>
          )}
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between gap-2 border-t border-blush/50 pt-2.5 pl-12">
        <p className="text-muted min-w-0 flex-1 text-[10px] leading-snug">
          Last reading · {formatRecordedAt(metric.recordedAt)}
        </p>
        <StatusBadge
          status={metric.status}
          label={metric.statusLabel}
          compact
        />
      </div>
    </>
  );

  if (canOpen && onSelect && metric.metricId) {
    return (
      <button
        type="button"
        onClick={() => onSelect(metric.metricId!)}
        className="w-full rounded-2xl border border-blush/70 bg-white p-4 text-left shadow-sm shadow-rose/5 transition-transform active:scale-[0.99]"
      >
        {content}
      </button>
    );
  }

  return (
    <article className="rounded-2xl border border-blush/70 bg-white p-4 shadow-sm shadow-rose/5">
      {content}
    </article>
  );
}
