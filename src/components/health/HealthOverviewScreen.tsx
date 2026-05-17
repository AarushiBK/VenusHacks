"use client";

import { useMemo, useState } from "react";
import {
  getDailyRecommendations,
  getHealthMetricsOverview,
} from "@/lib/healthOverview";
import { isMetricId, type MetricId } from "@/lib/metricHistory";
import { getDisplayName } from "@/lib/authSession";
import { MetricDetailView } from "@/components/profile/MetricDetailView";
import { DailyRecommendations } from "./DailyRecommendations";
import { HealthMetricRow } from "./HealthMetricRow";
import { PageGreeting } from "@/components/layout/PageGreeting";
import { WireframeSectionTitle } from "./WireframeSectionTitle";

export function HealthOverviewScreen() {
  const [selectedMetricId, setSelectedMetricId] = useState<MetricId | null>(null);
  const metrics = useMemo(() => getHealthMetricsOverview(), []);
  const recommendations = useMemo(() => getDailyRecommendations(), []);

  if (selectedMetricId) {
    return (
      <MetricDetailView
        metricId={selectedMetricId}
        onBack={() => setSelectedMetricId(null)}
      />
    );
  }

  return (
    <>
      <PageGreeting name={getDisplayName()} />

      <section aria-labelledby="overall-health-heading">
        <WireframeSectionTitle id="overall-health-heading">
          Your Overall Health
        </WireframeSectionTitle>
        <p className="text-muted -mt-2 mb-4 text-xs leading-relaxed">
          Latest readings and averages — tap a metric for full history.
        </p>
        <div className="flex flex-col gap-3">
          {metrics.map((metric) => (
            <HealthMetricRow
              key={metric.id}
              metric={metric}
              onSelect={(id) => {
                if (isMetricId(id)) setSelectedMetricId(id);
              }}
            />
          ))}
        </div>
      </section>

      <section aria-labelledby="daily-recs-heading">
        <WireframeSectionTitle id="daily-recs-heading">
          Things To Incorporate Today
        </WireframeSectionTitle>
        <p className="text-muted -mt-2 mb-4 text-xs leading-relaxed">
          AI prompted based on your profile, metrics, and symptoms.
        </p>
        <DailyRecommendations items={recommendations} />
      </section>
    </>
  );
}
