"use client";

import dynamic from "next/dynamic";

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

export function HumanBodyDisplay() {
  return (
    <section
      className="overflow-hidden rounded-2xl border border-blush/80 bg-cream shadow-sm"
      aria-label="Human body model"
    >
      <HumanBodyScene />
    </section>
  );
}
