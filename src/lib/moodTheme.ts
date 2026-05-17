import { getMoodLabel } from "./moodLabels";

export interface MoodTheme {
  label: string;
  /** Interpolated gradient for smooth slider transitions */
  background: string;
  accent: string;
  accentMuted: string;
  ink: string;
  hue: number;
}

type Rgb = [number, number, number];

interface MoodStop {
  at: number;
  gradient: [string, string, string];
  accent: string;
  accentMuted: string;
  ink: string;
  hue: number;
}

/** Unpleasant → pleasant: violet → blue → teal → green → green-yellow → yellow → orange-red */
const MOOD_STOPS: MoodStop[] = [
  {
    at: 0,
    gradient: ["#e2dcf8", "#c4b8f0", "#9a88dc"],
    accent: "#4c3c9e",
    accentMuted: "#7a6cc4",
    ink: "#241e3a",
    hue: 262,
  },
  {
    at: 17,
    gradient: ["#e6eef8", "#c8dcf4", "#aac8ec"],
    accent: "#3a6a9e",
    accentMuted: "#6894c0",
    ink: "#1e2a38",
    hue: 215,
  },
  {
    at: 33,
    gradient: ["#e4f4f4", "#c8eae8", "#acdedc"],
    accent: "#2a8a80",
    accentMuted: "#58b4ac",
    ink: "#1e3230",
    hue: 175,
  },
  {
    at: 50,
    gradient: ["#ecf6e8", "#d4ecc8", "#bce0a8"],
    accent: "#4a8838",
    accentMuted: "#78b064",
    ink: "#243020",
    hue: 115,
  },
  {
    at: 67,
    gradient: ["#f2f6dc", "#e6eeb8", "#d8e894"],
    accent: "#88a828",
    accentMuted: "#b4cc54",
    ink: "#303018",
    hue: 72,
  },
  {
    at: 83,
    gradient: ["#faf6dc", "#f4ecb0", "#ede088"],
    accent: "#c49c1c",
    accentMuted: "#e0c050",
    ink: "#383018",
    hue: 48,
  },
  {
    at: 100,
    gradient: ["#fce8dc", "#f8ccb0", "#f4a888"],
    accent: "#d85020",
    accentMuted: "#e88050",
    ink: "#3a1c10",
    hue: 18,
  },
];

function clampMood(value: number): number {
  return Math.max(0, Math.min(100, value));
}

function hexToRgb(hex: string): Rgb {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function rgbToHex([r, g, b]: Rgb): string {
  return `#${[r, g, b]
    .map((c) => Math.round(c).toString(16).padStart(2, "0"))
    .join("")}`;
}

function lerpHex(a: string, b: string, t: number): string {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  return rgbToHex([ar + (br - ar) * t, ag + (bg - ag) * t, ab + (bb - ab) * t]);
}

function lerpHue(a: number, b: number, t: number): number {
  let delta = b - a;
  if (delta > 180) delta -= 360;
  if (delta < -180) delta += 360;
  let h = a + delta * t;
  if (h < 0) h += 360;
  if (h >= 360) h -= 360;
  return h;
}

function interpolateStops(value: number) {
  const mood = clampMood(value);
  let i = 0;
  while (i < MOOD_STOPS.length - 1 && mood > MOOD_STOPS[i + 1].at) i += 1;

  const start = MOOD_STOPS[i];
  const end = MOOD_STOPS[Math.min(i + 1, MOOD_STOPS.length - 1)];
  const span = end.at - start.at;
  const t = span === 0 ? 0 : (mood - start.at) / span;

  const [top, mid, bottom] = start.gradient.map((color, idx) =>
    lerpHex(color, end.gradient[idx], t),
  ) as [string, string, string];

  return {
    background: `linear-gradient(180deg, ${top} 0%, ${mid} 50%, ${bottom} 100%)`,
    accent: lerpHex(start.accent, end.accent, t),
    accentMuted: lerpHex(start.accentMuted, end.accentMuted, t),
    ink: lerpHex(start.ink, end.ink, t),
    hue: lerpHue(start.hue, end.hue, t),
  };
}

export function getMoodTheme(value: number): MoodTheme {
  return {
    label: getMoodLabel(value),
    ...interpolateStops(value),
  };
}

function moodSpectrumMidColor(mood: number): string {
  const value = clampMood(mood);
  let i = 0;
  while (i < MOOD_STOPS.length - 1 && value > MOOD_STOPS[i + 1].at) i += 1;

  const start = MOOD_STOPS[i];
  const end = MOOD_STOPS[Math.min(i + 1, MOOD_STOPS.length - 1)];
  const span = end.at - start.at;
  const t = span === 0 ? 0 : (value - start.at) / span;

  return lerpHex(start.gradient[1], end.gradient[1], t);
}

/** Full vertical spectrum for charts: pleasant (top) → unpleasant (bottom). */
export function getMoodSpectrumChartBackground(): string {
  const colorStops: { pct: number; color: string }[] = [];

  for (let mood = 0; mood <= 100; mood += 4) {
    colorStops.push({
      pct: 100 - mood,
      color: moodSpectrumMidColor(mood),
    });
  }

  colorStops.sort((a, b) => a.pct - b.pct);

  const stops = colorStops.map(({ color, pct }) => `${color} ${pct}%`).join(", ");
  return `linear-gradient(180deg, ${stops})`;
}
