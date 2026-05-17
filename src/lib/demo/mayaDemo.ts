import { setAuthenticated } from "@/lib/authSession";
import { saveAccountEmail, savePassword } from "@/lib/profileStorage";
import { seedMayaSymptomLogs } from "@/lib/symptomLogsStorage";

/** Hackathon demo account — full longitudinal Maya Chen dataset */
export const MAYA_DEMO_EMAIL = "maya.chen@vitacor.demo";
export const MAYA_DEMO_PASSWORD = "MayaDemo2026!";

export function isMayaDemoEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return email.trim().toLowerCase() === MAYA_DEMO_EMAIL;
}

export function isMayaUser(opts?: {
  email?: string | null;
  displayName?: string | null;
  fullName?: string | null;
}): boolean {
  if (opts?.email && isMayaDemoEmail(opts.email)) return true;
  const name = (opts?.fullName ?? opts?.displayName ?? "").toLowerCase();
  return name.includes("maya");
}

/** Ensure server timeline + profile + browser symptoms for Maya demo session */
export async function activateMayaDemoSession(): Promise<void> {
  saveAccountEmail(MAYA_DEMO_EMAIL);
  savePassword(MAYA_DEMO_PASSWORD);
  setAuthenticated("Maya");
  await seedMayaSymptomLogs();
  try {
    await fetch("/api/demo/ensure", { method: "POST" });
    await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phase: "postpartum",
        routine_time: "07:30",
        reference_bpm: 72,
        ethnicity: "Asian",
        ethnicity_calibration_enabled: true,
      }),
    });
  } catch {
    /* API offline — local scan_history.jsonl still works when server restarts */
  }
}
