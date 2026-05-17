import { getMoodLabel } from "./moodLabels";

export interface MoodTheme {
  label: string;
  bgClass: string;
  accent: string;
  accentMuted: string;
  buttonClass: string;
  ink: string;
  hue: number;
}

export function getMoodTheme(value: number): MoodTheme {
  const label = getMoodLabel(value);

  if (value < 15) {
    return {
      label,
      bgClass: "symptom-journey-bg-purple",
      accent: "#5c4a8a",
      accentMuted: "#8b7cb8",
      buttonClass: "bg-[#4a3d72] text-white",
      ink: "#2e2640",
      hue: 270,
    };
  }
  if (value < 32) {
    return {
      label,
      bgClass: "symptom-journey-bg-blue",
      accent: "#7a3046",
      accentMuted: "#b87a88",
      buttonClass: "bg-burgundy text-white",
      ink: "#2a1f24",
      hue: 340,
    };
  }
  if (value < 48) {
    return {
      label,
      bgClass: "symptom-journey-bg-slate",
      accent: "#8f3d55",
      accentMuted: "#c99aaa",
      buttonClass: "bg-burgundy-dark text-white",
      ink: "#2a1f24",
      hue: 330,
    };
  }
  if (value < 55) {
    return {
      label,
      bgClass: "symptom-journey-bg-teal",
      accent: "#4a8a8a",
      accentMuted: "#7ab8b8",
      buttonClass: "bg-[#3d7878] text-white",
      ink: "#243030",
      hue: 175,
    };
  }
  if (value < 68) {
    return {
      label,
      bgClass: "symptom-journey-bg-green",
      accent: "#5a8a4a",
      accentMuted: "#8ab87a",
      buttonClass: "bg-[#4a7840] text-white",
      ink: "#283020",
      hue: 95,
    };
  }
  if (value < 85) {
    return {
      label,
      bgClass: "symptom-journey-bg-gold",
      accent: "#b88a30",
      accentMuted: "#d4b060",
      buttonClass: "bg-[#c4922a] text-white",
      ink: "#3d3018",
      hue: 42,
    };
  }
  return {
    label,
    bgClass: "symptom-journey-bg-peach",
    accent: "#d47840",
    accentMuted: "#e8a070",
    buttonClass: "bg-[#e07030] text-white",
    ink: "#402818",
    hue: 24,
  };
}
