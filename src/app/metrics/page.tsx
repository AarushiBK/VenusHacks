import { MetricsDashboard } from "@/components/metrics/MetricsDashboard";
import { metricsSnapshot, mockPatient } from "@/lib/metrics";

export default function MetricsPage() {
  return <MetricsDashboard snapshot={metricsSnapshot} patient={mockPatient} />;
}
