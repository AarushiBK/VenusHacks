import { PageShell } from "@/components/layout/PageShell";
import { HealthOverviewScreen } from "@/components/health/HealthOverviewScreen";

export default function HealthPage() {
  return (
    <PageShell active="health" showHeader={false}>
      <HealthOverviewScreen />
    </PageShell>
  );
}
