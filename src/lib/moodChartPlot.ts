import { getMoodTheme } from "./moodTheme";

/** Insets for the dot plot area (% of the plot region, not the day-label row). */
export const MOOD_PLOT = { left: 2, right: 2, top: 4, bottom: 4 };

export function plotMoodX(index: number, count: number): number {
  if (count <= 1) return MOOD_PLOT.left + (100 - MOOD_PLOT.left - MOOD_PLOT.right) / 2;
  const span = 100 - MOOD_PLOT.left - MOOD_PLOT.right;
  return MOOD_PLOT.left + (index / (count - 1)) * span;
}

/** 0 = unpleasant (bottom), 100 = pleasant (top), as % of full plot region height. */
export function plotMoodY(mood: number): number {
  const span = 100 - MOOD_PLOT.top - MOOD_PLOT.bottom;
  return MOOD_PLOT.top + (1 - mood / 100) * span;
}

export function plotMoodXInArea(index: number, count: number): number {
  if (count <= 1) return 50;
  return (index / (count - 1)) * 100;
}

/** Center of each equal column (matches grid-cols-N with centered labels). */
export function plotMoodXColumnCenter(index: number, count: number): number {
  if (count <= 0) return 50;
  return ((index + 0.5) / count) * 100;
}

export function plotMoodYInArea(mood: number): number {
  return (1 - mood / 100) * 100;
}

export function moodDotFill(mood: number): string {
  return getMoodTheme(mood).accent;
}
