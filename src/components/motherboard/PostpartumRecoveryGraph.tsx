"use client";

import { RECOVERY_DATA } from "@/lib/motherboard";

const W = 320;
const H = 120;
const PAD = { t: 12, r: 12, b: 24, l: 36 };

function scale(
  values: number[],
  min: number,
  max: number,
  height: number,
): number[] {
  const range = max - min || 1;
  return values.map((v) => PAD.t + height - ((v - min) / range) * height);
}

export function PostpartumRecoveryGraph() {
  const weeks = RECOVERY_DATA.map((d) => d.week);
  const bps = RECOVERY_DATA.map((d) => d.bp);
  const wellness = RECOVERY_DATA.map((d) => d.wellness);

  const chartW = W - PAD.l - PAD.r;
  const chartH = H - PAD.t - PAD.b;

  const bpY = scale(bps, 110, 150, chartH);
  const wellY = scale(wellness, 40, 85, chartH);

  const xStep = chartW / (weeks.length - 1);
  const toPath = (ys: number[]) =>
    ys
      .map((y, i) => `${i === 0 ? "M" : "L"}${PAD.l + i * xStep},${y}`)
      .join(" ");

  return (
    <section
      className="rounded-2xl border border-blush/80 bg-white p-5"
      aria-labelledby="recovery-heading"
    >
      <h2 id="recovery-heading" className="text-ink text-sm font-semibold uppercase tracking-wide">
        Postpartum recovery graph
      </h2>
      <p className="text-muted mt-1 text-xs">BP trend + recovery wellness (demo).</p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-4 w-full"
        role="img"
        aria-label="Postpartum recovery chart showing declining blood pressure and rising wellness over 12 weeks"
      >
        <line
          x1={PAD.l}
          y1={H - PAD.b}
          x2={W - PAD.r}
          y2={H - PAD.b}
          stroke="#e8d4d0"
          strokeWidth="1"
        />
        <path
          d={toPath(bpY)}
          fill="none"
          stroke="#9e4f5a"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d={toPath(wellY)}
          fill="none"
          stroke="#6b8f7a"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="4 3"
        />
        {weeks.map((w, i) => (
          <text
            key={w}
            x={PAD.l + i * xStep}
            y={H - 6}
            textAnchor="middle"
            className="fill-muted text-[9px]"
          >
            w{w}
          </text>
        ))}
      </svg>

      <div className="mt-3 flex gap-4 text-xs">
        <span className="flex items-center gap-1.5">
          <span className="h-0.5 w-4 bg-rose-deep" />
          Systolic BP
        </span>
        <span className="flex items-center gap-1.5 text-muted">
          <span className="h-0.5 w-4 border-t-2 border-dashed border-sage" />
          Recovery wellness
        </span>
      </div>
    </section>
  );
}
