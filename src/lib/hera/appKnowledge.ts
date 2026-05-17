import type { AppScreen } from "@/ai/types";

export const SCREEN_ROUTES: Record<AppScreen, string> = {
  Home: "/",
  Passport: "/motherboard",
  Symptoms: "/symptoms",
  SymptomsLog: "/symptoms/log",
  SymptomsCharts: "/symptoms/charts",
  Health: "/health",
  Metrics: "/metrics",
  Settings: "/",
  SendReport: "/",
};

export const SCREEN_LABELS: Record<AppScreen, string> = {
  Home: "Home",
  Passport: "Passport",
  Symptoms: "Symptoms",
  SymptomsLog: "Log symptoms",
  SymptomsCharts: "Symptom charts",
  Health: "Health",
  Metrics: "Metrics",
  Settings: "Settings",
  SendReport: "Send report",
};

export function screenToPath(screen: AppScreen): string {
  return SCREEN_ROUTES[screen];
}

/** Injected into Hera prompts so the model knows VitaCor features and tabs. */
export const VITACOR_APP_GUIDE = `
VitaCor app map (use for navigation and feature advice only — not medical diagnosis):

• Home (/) — 3D heart model, wellness summary, avg vitals, awareness tips, settings & send report to provider.
• Passport (/motherboard) — cardiovascular timeline, interactive body with scan dots (pelvic, heart echoes), tap dots for scan images.
• Symptoms (/symptoms) — log daily or momentary symptoms, mood, symptom timeline; charts at /symptoms/charts.
• Health (/health) — health overview, daily recommendations, condition context.
• Metrics (/metrics) — face scanner for heart rate (rPPG), recovery zone, week forecast when API is running.

Navigation: when the user wants to open a section, respond warmly and include a navigation action. Suggest logging symptoms on Symptoms, face scan on Metrics, passport scans on Passport, and send report from Home settings.
`.trim();
