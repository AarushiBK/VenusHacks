import type { WellnessLevel } from "@/lib/demo/wellnessAssessment";

export interface WeekForecastDay {
  day: string;
  strain: "low" | "moderate" | "elevated";
  note: string;
}

export function buildWeekForecast(level: WellnessLevel): WeekForecastDay[] {
  const elevated = level !== "healthy";

  return [
    {
      day: "Today",
      strain: elevated ? "elevated" : "low",
      note: elevated
        ? "Mirror trend + sleep debt suggest higher cardiovascular load."
        : "Stable vs locked baselines — keep daily scans.",
    },
    {
      day: "Tue",
      strain: elevated ? "moderate" : "low",
      note: "Watch BP if headache or vision symptoms appear.",
    },
    {
      day: "Wed",
      strain: "moderate",
      note: "Typical postpartum / late-pregnancy variability window.",
    },
    {
      day: "Thu",
      strain: "low",
      note: "Recovery-friendly if rest and hydration improve.",
    },
    {
      day: "Fri",
      strain: "moderate",
      note: "Activity + weight trend may nudge strain slightly.",
    },
    {
      day: "Sat",
      strain: elevated ? "moderate" : "low",
      note: "Second mirror scan helps confirm pattern vs one-off spike.",
    },
    {
      day: "Sun",
      strain: elevated ? "elevated" : "moderate",
      note: "Weekly review for your care team — education only.",
    },
  ];
}
