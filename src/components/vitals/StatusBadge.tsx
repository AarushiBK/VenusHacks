import type { VitalStatus } from "@/types/vitals";

const styles: Record<VitalStatus, string> = {
  normal: "bg-ok-bg text-ok",
  elevated: "bg-warning-bg text-warning",
  high: "bg-alert-bg text-alert",
};

export function StatusBadge({
  status,
  label,
  compact = false,
  className = "",
}: {
  status: VitalStatus;
  label: string;
  compact?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full font-medium ${styles[status]} ${
        compact ? "px-2 py-0.5 text-[10px] leading-tight" : "px-2.5 py-0.5 text-xs"
      } ${className}`}
    >
      {label}
    </span>
  );
}
