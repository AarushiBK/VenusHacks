"use client";

import dynamic from "next/dynamic";
import { getScanById } from "@/lib/passportScans";
import { ScanPreviewPopover } from "./ScanPreviewPopover";

const HumanBodyScene = dynamic(
  () =>
    import("@/components/motherboard/HumanBodyScene").then((m) => ({
      default: m.HumanBodyScene,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[400px] items-center justify-center rounded-2xl bg-blush/40">
        <p className="text-muted text-sm">Loading body model…</p>
      </div>
    ),
  },
);

export function HumanBodyDisplay({
  selectedScanId,
  onSelectScan,
}: {
  selectedScanId: string | null;
  onSelectScan: (id: string) => void;
}) {
  const scan = getScanById(selectedScanId);

  return (
    <section
      className="relative rounded-2xl border border-blush/80 bg-cream shadow-sm"
      aria-label="Human body model with scan markers"
    >
      <HumanBodyScene selectedScanId={selectedScanId} onSelectScan={onSelectScan} />
      <ScanPreviewPopover scan={scan ?? null} onClose={() => onSelectScan("")} />
    </section>
  );
}
