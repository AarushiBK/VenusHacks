"use client";

import { PageShell } from "@/components/layout/PageShell";

export function FaceScannerMetrics() {
  return (
    <PageShell active="metrics" showHeader={false} flush>
      <iframe
        src="/scanner/index.html?embed=1"
        title="Face scan and vitals metrics"
        className="block w-full border-0"
        style={{
          minHeight: "calc(100dvh - 5.75rem)",
          background: "#7a304d",
        }}
        allow="camera; microphone"
      />
    </PageShell>
  );
}
