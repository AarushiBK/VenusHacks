"use client";

import { PageShell } from "@/components/layout/PageShell";

export function FaceScannerMetrics() {
  return (
    <PageShell active="metrics" showHeader={false} flush>
      <iframe
        src="/scanner/index.html?embed=1"
        title="Face scan and vitals metrics"
        className="block min-h-[calc(100dvh-5rem)] w-full border-0"
        style={{ background: "#7a304d" }}
        allow="camera; microphone"
      />
    </PageShell>
  );
}
