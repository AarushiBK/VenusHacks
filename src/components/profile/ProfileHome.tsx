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
import { useAuth } from "@/context/AuthContext";
import { activateMayaDemoSession, isMayaUser } from "@/lib/demo/mayaDemo";
import { loadAccountEmail } from "@/lib/profileStorage";
import { seedDemoSymptomLogsIfEmpty } from "@/lib/symptomLogsStorage";
import { mockPatient } from "@/lib/vitals";
import { HeartModelDisplay } from "@/components/metrics/HeartModelDisplay";
import { AvgMetricGrid } from "./AvgMetricGrid";
import { HomeHeader } from "./HomeHeader";
import { MetricDetailView } from "./MetricDetailView";
import { SendReportPanel } from "./SendReportPanel";
import { SettingsPanel } from "./SettingsPanel";

export function ProfileHome() {
  const { user, profile } = useAuth();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [selectedMetricId, setSelectedMetricId] = useState<MetricId | null>(null);
  const metrics = useMemo(() => getAvgMetrics(), []);
  const [wellness, setWellness] = useState<WellnessAssessment | null>(null);
  const [wellnessLoading, setWellnessLoading] = useState(true);

  const mayaSession = isMayaUser({
    email: user?.email ?? loadAccountEmail(),
    fullName: profile?.fullName,
    displayName: user?.displayName,
  });

  const patient = mayaSession
    ? mockPatient
    : { ...mockPatient, name: "You", detail: "Personal cardiovascular tracking" };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (mayaSession) {
        await activateMayaDemoSession();
      } else {
        await seedDemoSymptomLogsIfEmpty();
      }
      const scan = await fetchScanSummary();
      if (cancelled) return;
      setWellness(assessFromSymptomsAndVitals(scan));
      setWellnessLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [mayaSession]);

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
            patient={patient}
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
