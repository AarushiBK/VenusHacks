"use client";

import { CardiovascularTimeline } from "@/components/motherboard/CardiovascularTimeline";
import { HumanBodyDisplay } from "@/components/motherboard/HumanBodyDisplay";

export function PassportContent() {
  return (
    <div className="flex flex-col gap-5">
      <HumanBodyDisplay />
      <CardiovascularTimeline />
    </div>
  );
}
