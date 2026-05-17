import type { ReactNode } from "react";
import type { AlertLevel } from "@/lib/metrics";

function YieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0" aria-hidden>
      <path
        d="M12 3 2 21h20L12 3Z"
        fill="#e8b84a"
        stroke="#c4843a"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path
        d="M12 9v5M12 17h.01"
        stroke="#5c4a12"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ExclamationIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0" aria-hidden>
      <circle cx="12" cy="12" r="10" fill="#b84a52" />
      <path
        d="M12 7v6M12 17h.01"
        stroke="white"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

function OkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0" aria-hidden>
      <circle cx="12" cy="12" r="10" fill="#6b8f7a" />
      <path
        d="M8 12.5 10.5 15 16 9"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

const styles: Record<
  AlertLevel,
  { container: string; icon: ReactNode }
> = {
  none: {
    container: "border-sage/30 bg-sage-light/60",
    icon: <OkIcon />,
  },
  caution: {
    container: "border-warning/40 bg-warning-bg",
    icon: <YieldIcon />,
  },
  critical: {
    container: "border-alert/40 bg-alert-bg",
    icon: <ExclamationIcon />,
  },
};

export function HealthAlert({
  level,
  title,
  message,
}: {
  level: AlertLevel;
  title: string;
  message: string;
}) {
  const { container, icon } = styles[level];

  return (
    <section
      className={`flex gap-3 rounded-2xl border p-4 ${container}`}
      aria-live="polite"
      aria-label={title}
    >
      {icon}
      <div className="min-w-0 flex-1">
        <h2 className="text-ink text-sm font-semibold">{title}</h2>
        <p className="text-muted mt-0.5 text-sm leading-relaxed">{message}</p>
      </div>
    </section>
  );
}
