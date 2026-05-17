import { useId, useMemo, type CSSProperties } from "react";
import { getMoodTheme } from "@/lib/moodTheme";

interface MoodHeartProps {
  mood: number;
  size?: "sm" | "md" | "lg";
}

const SIZE_DIM = { lg: 200, md: 120, sm: 44 } as const;

/** Same silhouette as public/heart.svg */
const HEART_PATH =
  "M16 28s-10-6.5-10-14a5.5 5.5 0 0 1 10-3 5.5 5.5 0 0 1 10 3c0 7.5-10 14-10 14Z";

function heartMaskUri(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="white" d="${HEART_PATH}"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

function heartScale(size: keyof typeof SIZE_DIM): number {
  if (size === "lg") return 0.76;
  if (size === "md") return 0.78;
  return 0.82;
}

function pulseDuration(mood: number): number {
  const pleasantness = mood / 100;
  return 18 - pleasantness * 3;
}

function maskStyle(scale: number): CSSProperties {
  const mask = heartMaskUri();
  const size = `${scale * 100}%`;
  return {
    WebkitMaskImage: mask,
    maskImage: mask,
    WebkitMaskSize: size,
    maskSize: size,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
  };
}

export function MoodHeart({ mood, size = "lg" }: MoodHeartProps) {
  const theme = getMoodTheme(mood);
  const dim = SIZE_DIM[size];
  const animated = size !== "sm";
  const scale = heartScale(size);
  const h = theme.hue;

  const clipId = useId();
  const shineGradId = useId();
  const rimGradId = useId();
  const glowId = useId();

  const mask = useMemo(() => maskStyle(scale), [scale]);
  const svgSize = `${scale * 100}%`;

  return (
    <div
      className="mood-heart relative mx-auto"
      style={
        {
          width: dim,
          height: dim,
          "--mood-hue": theme.hue,
          "--mood-heart-pulse": `${pulseDuration(mood)}s`,
        } as CSSProperties
      }
      aria-hidden
    >
      <div
        className={[
          "mood-heart__stack absolute inset-0",
          animated ? "mood-heart__stack--beat" : "",
        ].join(" ")}
      >
        {animated && (
          <svg
            className="mood-heart__glow pointer-events-none absolute inset-0 m-auto"
            viewBox="0 0 32 32"
            style={{ width: `${scale * 112}%`, height: `${scale * 112}%` }}
          >
            <defs>
              <radialGradient id={glowId} cx="50%" cy="42%" r="58%">
                <stop offset="0%" stopColor={`hsl(${h} 72% 68%)`} stopOpacity="0.45" />
                <stop offset="100%" stopColor={`hsl(${h} 55% 50%)`} stopOpacity="0" />
              </radialGradient>
            </defs>
            <path d={HEART_PATH} fill={`url(#${glowId})`} />
          </svg>
        )}

        {/* Frosted glass body — blurs the mood gradient behind the heart */}
        <div
          className={[
            "mood-heart__glass-pane",
            size === "sm" && "mood-heart__glass-pane--sm",
          ]
            .filter(Boolean)
            .join(" ")}
          style={mask}
        />
        <div className="mood-heart__glass-tint" style={mask} />

        {/* Specular highlights & glass rim */}
        <svg
          className="mood-heart__shine pointer-events-none absolute inset-0 m-auto"
          viewBox="0 0 32 32"
          style={{ width: svgSize, height: svgSize }}
        >
          <defs>
            <clipPath id={clipId}>
              <path d={HEART_PATH} />
            </clipPath>
            <linearGradient
              id={shineGradId}
              x1="9"
              y1="7"
              x2="20"
              y2="18"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.92" />
              <stop offset="40%" stopColor="#ffffff" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id={rimGradId}
              x1="8"
              y1="9"
              x2="24"
              y2="27"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.4" />
              <stop offset="100%" stopColor={`hsl(${h} 50% 40%)`} stopOpacity="0.5" />
            </linearGradient>
          </defs>

          <g clipPath={`url(#${clipId})`}>
            <path d={HEART_PATH} fill={`url(#${shineGradId})`} />
            <ellipse cx="12.8" cy="12.8" rx="5" ry="3.6" fill="white" fillOpacity="0.55" />
            <ellipse cx="11.2" cy="11.5" rx="2.2" ry="1.5" fill="white" fillOpacity="0.75" />
          </g>

          <path
            d={HEART_PATH}
            fill="none"
            stroke={`url(#${rimGradId})`}
            strokeWidth="0.65"
            strokeLinejoin="round"
          />
          <path
            d={HEART_PATH}
            fill="none"
            stroke="white"
            strokeWidth="0.2"
            strokeOpacity="0.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
