"use client";

import { useEffect, useMemo, useState } from "react";
import { WellnessSummaryCard } from "@/components/home/WellnessSummaryCard";
import {
  assessFromSymptomsAndVitals,
  fetchScanSummary,
  type WellnessAssessment,
} from "@/lib/demo/wellnessAssessment";
import { getAvgMetrics } from "@/lib/profile";
import { isMetricId, type MetricId } from "@/lib/metricHistory";
import { seedDemoSymptomLogsIfEmpty } from "@/lib/symptomLogsStorage";
import { mockPatient } from "@/lib/vitals";
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
  const [wellness, setWellness] = useState<WellnessAssessment | null>(null);
  const [wellnessLoading, setWellnessLoading] = useState(true);

  useEffect(() => {
    seedDemoSymptomLogsIfEmpty();
    let cancelled = false;
    (async () => {
      const scan = await fetchScanSummary();
      if (cancelled) return;
      setWellness(assessFromSymptomsAndVitals(scan));
      setWellnessLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

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
            <WellnessSummaryCard assessment={wellness} loading={wellnessLoading} />

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
          </div>
        </>
      )}

      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <SendReportPanel open={reportOpen} onClose={() => setReportOpen(false)} />
    </>
  );
}
