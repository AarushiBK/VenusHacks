import { formatRecordedAt } from "@/lib/vitals";
import type { VitalReading } from "@/types/vitals";
import { StatusBadge } from "./StatusBadge";

export function BloodPressureHighlight({
  reading,
}: {
  reading: VitalReading;
}) {
  if (reading.kind !== "blood_pressure" || !reading.secondaryValue) {
    return null;
  }

  return (
    <section
      className="rounded-3xl bg-gradient-to-br from-rose-deep to-rose p-6 text-white shadow-lg shadow-rose/25"
      aria-label="Blood pressure summary"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-white/80">Primary focus</p>
          <h2 className="font-display mt-1 text-lg font-semibold">
            Blood pressure
          </h2>
        </div>
        <StatusBadge status={reading.status} label={reading.statusLabel} />
      </div>

      <p className="font-display mt-6 text-5xl font-semibold tracking-tight">
        {reading.value}
        <span className="mx-1 text-3xl font-normal text-white/70">/</span>
        {reading.secondaryValue}
        <span className="ml-2 text-lg font-normal text-white/70">
          {reading.unit}
        </span>
      </p>

      <p className="mt-4 text-sm leading-relaxed text-white/85">
        During pregnancy, contact your care team if readings reach 140/90 or
        higher, or if you have headache, vision changes, or swelling.
      </p>

      <p className="mt-3 text-xs text-white/60">
        Last reading · {formatRecordedAt(reading.recordedAt)}
      </p>
    </section>
  );
}
