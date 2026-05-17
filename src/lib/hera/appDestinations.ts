import type { AppScreen } from "@/ai/types";

export interface AppDestinationMeta {
  screen: AppScreen;
  href: string;
  label: string;
  description: string;
}

/** VitaCor / VenusHacks routes Hera can navigate to */
export const APP_DESTINATIONS: AppDestinationMeta[] = [
  {
    screen: "Home",
    href: "/",
    label: "Home",
    description:
      "Profile dashboard, wellness summary, 3D heart preview, average metrics, send report, and settings",
  },
  {
    screen: "Motherboard",
    href: "/motherboard",
    label: "Passport",
    description:
      "Cardiovascular passport, body scan hotspots, timeline, postpartum recovery, future heart replay",
  },
  {
    screen: "Symptoms",
    href: "/symptoms",
    label: "Symptoms",
    description: "Symptom home, today's symptoms, mood, and logging entry points",
  },
  {
    screen: "SymptomLog",
    href: "/symptoms/log",
    label: "Log symptoms",
    description: "Start a new symptom or mood log",
  },
  {
    screen: "SymptomCharts",
    href: "/symptoms/charts",
    label: "Symptom charts",
    description: "Charts and trends for logged symptoms",
  },
  {
    screen: "Health",
    href: "/health",
    label: "Health",
    description:
      "Overall health overview, daily recommendations, condition search, and wellness detail",
  },
  {
    screen: "Metrics",
    href: "/metrics",
    label: "Metrics",
    description:
      "Face-scan rPPG hub, heart rate trends, 3D heart model, week forecast, and vitals",
  },
  {
    screen: "Chat",
    href: "/chat",
    label: "Hera chat",
    description: "This AI companion conversation",
  },
  {
    screen: "EmergencyResources",
    href: "/health",
    label: "Health & urgent care",
    description:
      "Health overview, when to seek care, and links to contact your clinician or emergency services",
  },
];

export const SCREEN_ROUTES: Record<AppScreen, string> = Object.fromEntries(
  APP_DESTINATIONS.map((d) => [d.screen, d.href])
) as Record<AppScreen, string>;

export const SCREEN_LABELS: Record<AppScreen, string> = Object.fromEntries(
  APP_DESTINATIONS.map((d) => [d.screen, d.label])
) as Record<AppScreen, string>;

export function getDestination(screen: AppScreen): AppDestinationMeta | undefined {
  return APP_DESTINATIONS.find((d) => d.screen === screen);
}

export function buildAppGuideForPrompt(): string {
  return APP_DESTINATIONS.map(
    (d) => `- ${d.label} (${d.href}): ${d.description}`
  ).join("\n");
}
