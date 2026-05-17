import { NextResponse } from "next/server";
import { buildMetricsSnapshot, getLiveVitals, LOCKED_BASELINES } from "@/lib/cardioState";
import { mockPatient } from "@/lib/vitals";

/** Demo API — wire vision/rPPG backend here when ready */
export async function GET() {
  return NextResponse.json({
    patient: mockPatient,
    vitals: getLiveVitals(),
    snapshot: buildMetricsSnapshot(),
    baselines: LOCKED_BASELINES,
    disclaimer: "Synthetic demo data — not for clinical use.",
  });
}
