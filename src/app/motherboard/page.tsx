import { PageShell } from "@/components/layout/PageShell";
import { Disclaimer } from "@/components/layout/Disclaimer";
import { CardiovascularTimeline } from "@/components/motherboard/CardiovascularTimeline";
import { ExampleScenario } from "@/components/motherboard/ExampleScenario";
import { FeaturesGrid } from "@/components/motherboard/FeaturesGrid";
import { FutureHeartReplay } from "@/components/motherboard/FutureHeartReplay";
import { MotherboardHero } from "@/components/motherboard/MotherboardHero";
import { PostpartumRecoveryGraph } from "@/components/motherboard/PostpartumRecoveryGraph";

export default function MotherboardPage() {
  return (
    <PageShell active="motherboard">
      <div className="flex flex-col gap-10">
        <MotherboardHero />
        <FutureHeartReplay />
        <ExampleScenario />
        <CardiovascularTimeline />
        <PostpartumRecoveryGraph />
        <FeaturesGrid />
        <Disclaimer />
      </div>
    </PageShell>
  );
}
