"use client";

import { useCallback, useState } from "react";
import { CardiovascularTimeline } from "@/components/motherboard/CardiovascularTimeline";
import { HumanBodyDisplay } from "@/components/motherboard/HumanBodyDisplay";

export function PassportContent() {
  const [selectedScanId, setSelectedScanId] = useState<string | null>(null);

  const handleSelectScan = useCallback((id: string) => {
    setSelectedScanId((prev) => (id === "" || id === prev ? null : id));
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <HumanBodyDisplay selectedScanId={selectedScanId} onSelectScan={handleSelectScan} />
      <CardiovascularTimeline
        selectedScanId={selectedScanId}
        onSelectScan={handleSelectScan}
      />
    </div>
  );
}
