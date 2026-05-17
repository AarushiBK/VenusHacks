import { formatRecordedAt } from "@/lib/vitals";
import type { VitalReading } from "@/types/vitals";
import { StatusBadge } from "./StatusBadge";
import { VitalIcon } from "./VitalIcon";

function TrendIndicator({ trend }: { trend?: "up" | "down" | "stable" }) {
  if (!trend || trend === "stable") {
    return (
      <span className="text-muted text-xs" aria-label="Stable">
        →
      </span>
    );
  }
  const arrow = trend === "up" ? "↑" : "↓";
  const color = trend === "up" ? "text-warning" : "text-sage";
  return (
    <span className={`text-xs font-medium ${color}`} aria-label={trend}>
      {arrow}
    </span>
  );
}

export function VitalCard({ reading }: { reading: VitalReading }) {
  const isBloodPressure = reading.kind === "blood_pressure";

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-blush/80 bg-white p-5 shadow-sm shadow-rose/5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blush">
            <VitalIcon kind={reading.kind} />
          </div>
          <p className="text-ink text-sm font-medium">{reading.label}</p>
        </div>
        <StatusBadge status={reading.status} label={reading.statusLabel} />
      </div>

      <div className="flex items-end justify-between gap-2">
        <div>
          {isBloodPressure && reading.secondaryValue ? (
            <span className="font-display text-ink text-3xl font-semibold tracking-tight">
              {reading.value}
              <span className="text-muted mx-0.5 text-2xl font-normal">/</span>
              {reading.secondaryValue}
              <span className="text-muted ml-1.5 text-sm font-normal">
                {reading.unit}
              </span>
            </span>
          ) : (
            <span className="font-display text-ink text-3xl font-semibold tracking-tight">
              {reading.value}
              <span className="text-muted ml-1.5 text-sm font-normal">
                {reading.unit}
              </span>
            </span>
          )}
        </div>
        <TrendIndicator trend={reading.trend} />
      </div>

      <footer className="flex flex-col gap-1 border-t border-blush/60 pt-3">
        <p className="text-muted text-xs">
          Last reading · {formatRecordedAt(reading.recordedAt)}
        </p>
        {reading.note && (
          <p className="text-muted text-xs leading-relaxed">{reading.note}</p>
        )}
      </footer>
    </article>
  );
}
