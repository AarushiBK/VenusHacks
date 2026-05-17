import { PageShell } from "@/components/layout/PageShell";
import { PassportContent } from "@/components/motherboard/PassportContent";

export default function MotherboardPage() {
  return (
    <PageShell active="motherboard">
      <PassportContent />
    </PageShell>
  );
}
