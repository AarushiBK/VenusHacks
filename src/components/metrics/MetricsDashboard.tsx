"use client";

import { PageShell } from "@/components/layout/PageShell";
import { CurrentMetrics } from "@/components/metrics/CurrentMetrics";
import { HealthAlert } from "@/components/metrics/HealthAlert";
import { HeartModelDisplay } from "@/components/metrics/HeartModelDisplay";
import { Lifeline } from "@/components/metrics/Lifeline";
import type { MetricsSnapshot } from "@/lib/metrics";
import type { PatientContext } from "@/types/vitals";

export function MetricsDashboard({
  snapshot,
  patient,
}: {
  snapshot: MetricsSnapshot;
  patient: PatientContext;
}) {
  const bpm = Number(snapshot.heartRate.value);

  return (
    <PageShell active="metrics">
      <div className="flex flex-col gap-5">
        <header>
          <h1 className="font-display text-ink text-2xl font-semibold tracking-tight">
            Your heart
          </h1>
          <p className="text-muted mt-1 text-sm">
            {patient.name} · {patient.detail}
          </p>
        </header>

        <HealthAlert
          level={snapshot.alertLevel}
          title={snapshot.alertTitle}
          message={snapshot.alertMessage}
        />

        <HeartModelDisplay />

        <Lifeline bpm={bpm} />

        <CurrentMetrics snapshot={snapshot} />

        <p className="text-muted text-center text-xs leading-relaxed">
          All data shown is synthetic and for demonstration only — not medical
          advice.
        </p>
      </div>
    </PageShell>
  );
}
