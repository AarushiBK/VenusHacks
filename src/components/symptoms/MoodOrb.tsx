import { createElement, type CSSProperties } from "react";
import { moodHue } from "../../lib/moodLabels";

interface MoodOrbProps {
  mood: number;
}

function ring(sizeClass: string, delay: string, opacity: string, hue: number) {
  return createElement("div", {
    className: `mood-orb-ring absolute ${sizeClass} rounded-full ${opacity}`,
    style: { "--mood-hue": hue, animationDelay: delay } as CSSProperties,
  });
}

export function MoodOrb({ mood }: MoodOrbProps) {
  const hue = moodHue(mood);

  return createElement(
    "div",
    {
      className: "relative mx-auto flex size-52 items-center justify-center",
      "aria-hidden": true,
    },
    ring("size-full", "0s", "opacity-90", hue),
    ring("size-[82%]", "-2.5s", "opacity-75", hue),
    ring("size-[64%]", "-5s", "opacity-60", hue),
    createElement("div", {
      className: "relative size-[38%] rounded-full shadow-inner",
      style: {
        background: `radial-gradient(circle at 35% 30%, hsl(${hue} 65% 72%), hsl(${hue} 45% 48%))`,
      },
    }),
  );
}
