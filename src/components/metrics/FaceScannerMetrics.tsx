"use client";

import { useEffect, useMemo, useState } from "react";
import { WeekForecast } from "@/components/metrics/WeekForecast";
import { PageShell } from "@/components/layout/PageShell";
import { useAuth } from "@/context/AuthContext";
import {
  assessFromSymptomsAndVitals,
  fetchScanSummary,
} from "@/lib/demo/wellnessAssessment";
import { buildWeekForecast } from "@/lib/demo/weekForecast";
import { getScannerIframeSrc, syncEthnicityToScannerStorage } from "@/lib/ethnicitySync";

export function FaceScannerMetrics() {
  const { profile } = useAuth();
  const ethnicity = profile?.ethnicity;
  const iframeSrc = useMemo(() => getScannerIframeSrc(ethnicity), [ethnicity]);

  const [forecastLevel, setForecastLevel] = useState<
    "healthy" | "caution" | "critical"
  >("caution");

  useEffect(() => {
    syncEthnicityToScannerStorage(ethnicity);
  }, [ethnicity]);

  useEffect(() => {
    if (ethnicity) return;
    let cancelled = false;
    fetch("/api/profile")
      .then((r) => (r.ok ? r.json() : null))
      .then((p) => {
        if (!cancelled && p?.ethnicity) syncEthnicityToScannerStorage(p.ethnicity);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [ethnicity]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const scan = await fetchScanSummary();
      if (cancelled) return;
      const assessment = assessFromSymptomsAndVitals(scan);
      setForecastLevel(assessment.level);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const forecast = useMemo(() => buildWeekForecast(forecastLevel), [forecastLevel]);

  return (
    <PageShell active="metrics" showHeader={false} flush>
      <div className="flex flex-col">
        <iframe
          key={iframeSrc}
          src={iframeSrc}
          title="Face scan and vitals metrics"
          className="block w-full shrink-0 border-0"
          style={{
            minHeight: "min(72dvh, 640px)",
            background: "#7a304d",
          }}
          allow="camera *; microphone *; autoplay"
        />
        <div className="bg-cream border-t border-blush/40 pt-3 pb-28">
          <WeekForecast days={forecast} />
        </div>
      </div>
    </PageShell>
  );
}
