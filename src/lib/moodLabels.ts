export function getMoodLabel(value: number): string {
  if (value < 15) return "Very unpleasant";
  if (value < 32) return "Unpleasant";
  if (value < 48) return "Slightly unpleasant";
  if (value < 55) return "Neutral";
  if (value < 68) return "Slightly pleasant";
  if (value < 85) return "Pleasant";
  return "Very pleasant";
}

export function moodHue(value: number): number {
  return Math.round(8 + (value / 100) * 42);
}
