import Link from "next/link";
import type { AlertLevel } from "@/lib/cardioState";
import { heartStatusLabel } from "@/lib/cardioState";

const STATUS_RING: Record<AlertLevel, string> = {
  none: "ring-ok/40 text-ok",
  caution: "ring-warning/50 text-warning",
  critical: "ring-alert/50 text-alert",
};

export function QuickActions({ alertLevel }: { alertLevel: AlertLevel }) {
  const status = heartStatusLabel(alertLevel);

  return (
    <section aria-labelledby="quick-actions-heading" className="flex flex-col gap-3">
      <h2
        id="quick-actions-heading"
        className="text-muted text-xs font-semibold tracking-[0.14em] uppercase"
      >
        Your cardiovascular toolkit
      </h2>

      <Link
        href="/metrics"
        className="glass-card group flex items-center gap-4 p-4 transition-transform active:scale-[0.99]"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-rose/20 to-rose-deep/30 text-rose-deep">
          <HeartPulseIcon />
        </span>
        <ActionText title="The Lifeline" subtitle="3D heart · live pulse · baselines & forecast" />
        <span
          className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ring-2 ${STATUS_RING[alertLevel]}`}
        >
          {status}
        </span>
      </Link>

      <Link
        href="/health"
        className="glass-card flex items-center gap-4 p-4 transition-transform active:scale-[0.99]"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-light text-sage">
          <ChartIcon />
        </span>
        <ActionText title="Health profile" subtitle="Vitals, wearable fusion & translated insights" />
        <span className="text-muted text-lg" aria-hidden>
          ›
        </span>
      </Link>

      <div
        className="glass-card flex items-center gap-4 p-4 opacity-75"
        aria-disabled
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blush/80 text-rose-deep">
          <CameraIcon />
        </span>
        <ActionText
          title="The Mirror"
          subtitle="30s rPPG scan — BPM, HRV, respiratory rate · ethnicity-aware"
        />
        <span className="rounded-full bg-blush px-2.5 py-1 text-[10px] font-semibold text-rose-deep">
          Soon
        </span>
      </div>
    </section>
  );
}

function ActionText({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="min-w-0 flex-1">
      <p className="text-ink font-semibold">{title}</p>
      <p className="text-muted text-xs leading-relaxed">{subtitle}</p>
    </div>
  );
}

function HeartPulseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
      <path
        d="M12 20s-6-4-6-9.5a3.5 3.5 0 016.5-1.5A3.5 3.5 0 0118 10.5C18 16 12 20 12 20z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M4 12h4l1.5-3 2 6 1.5-4 1 2h6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
      <path d="M4 19V5M4 19h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M8 15v-3M12 15V9M16 15v-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
      <path
        d="M4 8.5h2.5l1.5-2h8l1.5 2H20a1.5 1.5 0 011.5 1.5v9A1.5 1.5 0 0120 20.5H4A1.5 1.5 0 012.5 19v-9A1.5 1.5 0 014 8.5z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
