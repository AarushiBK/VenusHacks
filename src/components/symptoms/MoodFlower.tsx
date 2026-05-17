import type { CSSProperties } from "react";
import { getMoodTheme } from "../../lib/moodTheme";

interface MoodFlowerProps {
  mood: number;
  size?: "sm" | "md" | "lg";
}

const SIZE_DIM = { lg: 200, md: 120, sm: 44 } as const;

export function MoodFlower({ mood, size = "lg" }: MoodFlowerProps) {
  const theme = getMoodTheme(mood);
  const dim = SIZE_DIM[size];

  return (
    <div
      className="relative mx-auto"
      style={{ width: dim, height: dim }}
      aria-hidden
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="mood-flower-petal absolute left-1/2 top-1/2 origin-center rounded-[40%]"
          style={
            {
              "--petal-hue": theme.hue,
              "--petal-i": i,
              width: size === "lg" ? "72%" : "68%",
              height: size === "lg" ? "72%" : "68%",
              transform: `translate(-50%, -50%) rotate(${i * 72}deg)`,
              opacity: 0.35 + (i % 2) * 0.15,
            } as CSSProperties
          }
        />
      ))}
      <span
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg"
        style={{
          width: size === "lg" ? "28%" : size === "md" ? "32%" : "34%",
          height: size === "lg" ? "28%" : size === "md" ? "32%" : "34%",
          background: `radial-gradient(circle at 35% 30%, hsl(${theme.hue} 75% 72%), hsl(${theme.hue} 55% 48%))`,
          transition: "background 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
    </div>
  );
}
