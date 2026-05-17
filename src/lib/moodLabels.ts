export type MoodBucket =
  | "very_unpleasant"
  | "unpleasant"
  | "slightly_unpleasant"
  | "neutral"
  | "slightly_pleasant"
  | "pleasant"
  | "very_pleasant";

export function getMoodBucket(value: number): MoodBucket {
  if (value < 15) return "very_unpleasant";
  if (value < 32) return "unpleasant";
  if (value < 48) return "slightly_unpleasant";
  if (value < 55) return "neutral";
  if (value < 68) return "slightly_pleasant";
  if (value < 85) return "pleasant";
  return "very_pleasant";
}

export function isUnpleasantMoodBucket(bucket: MoodBucket): boolean {
  return (
    bucket === "very_unpleasant" ||
    bucket === "unpleasant" ||
    bucket === "slightly_unpleasant"
  );
}

export function getMoodLabel(value: number): string {
  switch (getMoodBucket(value)) {
    case "very_unpleasant":
      return "Very unpleasant";
    case "unpleasant":
      return "Unpleasant";
    case "slightly_unpleasant":
      return "Slightly unpleasant";
    case "neutral":
      return "Neutral";
    case "slightly_pleasant":
      return "Slightly pleasant";
    case "pleasant":
      return "Pleasant";
    case "very_pleasant":
      return "Very pleasant";
  }
}

export function moodHue(value: number): number {
  return Math.round(8 + (value / 100) * 42);
}
