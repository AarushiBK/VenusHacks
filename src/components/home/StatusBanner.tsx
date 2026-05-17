import type { MetricsSnapshot } from "@/lib/cardioState";

const LEVEL_STYLES = {
  none: "border-sage/30 bg-sage-light/70",
  caution: "border-warning/40 bg-warning-bg/80",
  critical: "border-alert/40 bg-alert-bg/80",
} as const;

export function StatusBanner({ snapshot }: { snapshot: MetricsSnapshot }) {
  return (
    <section
      className={`glass-card border-2 p-4 ${LEVEL_STYLES[snapshot.alertLevel]}`}
      aria-live="polite"
    >
      <p className="text-ink text-sm font-semibold">{snapshot.alertTitle}</p>
      <p className="text-muted mt-1 text-xs leading-relaxed">
        {snapshot.alertMessage}
      </p>
    </section>
  );
}
