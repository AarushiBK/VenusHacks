"use client";

import dynamic from "next/dynamic";

const HeartScene = dynamic(
  () =>
    import("@/components/metrics/HeartScene").then((m) => ({
      default: m.HeartScene,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[280px] items-center justify-center bg-[#141418]">
        <p className="text-sm text-white/50">Loading 3D heart…</p>
      </div>
    ),
  },
);

export function HeartModelDisplay() {
  return (
    <section
      className="overflow-hidden rounded-3xl border border-ink/10 bg-[#1a1a1e] shadow-lg shadow-rose/10"
      aria-label="3D heart model"
    >
      <HeartScene />
    </section>
  );
}
