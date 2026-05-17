"use client";

import { useMemo, useState } from "react";
import { getAvgMetrics } from "@/lib/profile";
import { isMetricId, type MetricId } from "@/lib/metricHistory";
import { mockPatient } from "@/lib/vitals";
import { HeartModelDisplay } from "@/components/metrics/HeartModelDisplay";
import { AvgMetricGrid } from "./AvgMetricGrid";
import { HomeHeader } from "./HomeHeader";
import { MetricDetailView } from "./MetricDetailView";
import { SendReportPanel } from "./SendReportPanel";
import { SettingsPanel } from "./SettingsPanel";

export function ProfileHome() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [selectedMetricId, setSelectedMetricId] = useState<MetricId | null>(null);
  const metrics = useMemo(() => getAvgMetrics(), []);

  return (
    <>
      {selectedMetricId ? (
        <MetricDetailView
          metricId={selectedMetricId}
          onBack={() => setSelectedMetricId(null)}
        />
      ) : (
        <>
          <HomeHeader
            patient={mockPatient}
            onOpenSettings={() => setSettingsOpen(true)}
          />

          <div className="flex flex-col gap-6">
            <button
              type="button"
              onClick={() => setReportOpen(true)}
              className="text-rose-deep inline-flex items-center gap-1 self-end text-sm font-semibold tracking-wide"
            >
              Send report
              <span aria-hidden>›</span>
            </button>

            <AvgMetricGrid
              metrics={metrics}
              onSelectMetric={(id) => {
                if (isMetricId(id)) setSelectedMetricId(id);
              }}
            />

            <section aria-label="3D heart model" className="pb-2">
              <HeartModelDisplay />
            </section>
          </div>
        </>
      )}

      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <SendReportPanel open={reportOpen} onClose={() => setReportOpen(false)} />
    </>
  );
}
