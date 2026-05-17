"use client";

const ECG_PATH =
  "M0 40 H24 L28 40 L32 18 L36 58 L40 28 L44 48 L48 40 H72 L76 40 L80 22 L84 52 L88 30 L92 44 L96 40 H120 L124 40 L128 16 L132 60 L136 26 L140 46 L144 40 H168 L172 40 L176 20 L180 54 L184 32 L188 42 L192 40 H216 L220 40 L224 14 L228 62 L232 24 L236 50 L240 40 H264 L268 40 L272 18 L276 56 L280 28 L284 44 L288 40 H312 L316 40 L320 22 L324 52 L328 30 L332 44 L336 40 H360 L364 40 L368 16 L372 58 L376 26 L380 46 L384 40 H400";

export function Lifeline({ bpm }: { bpm: number }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-blush/80 bg-white px-4 py-3">
      <div className="mb-2 flex items-baseline justify-between">
        <p className="text-ink text-sm font-semibold">Lifeline</p>
        <p className="text-muted text-xs">
          <span className="text-rose-deep font-semibold">{bpm}</span> bpm · demo
        </p>
      </div>

      <div className="relative h-16 w-full">
        <svg
          viewBox="0 0 400 80"
          className="h-full w-full"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="lifeline-fade" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#c97b84" stopOpacity="0.15" />
              <stop offset="12%" stopColor="#c97b84" stopOpacity="1" />
              <stop offset="88%" stopColor="#9e4f5a" stopOpacity="1" />
              <stop offset="100%" stopColor="#9e4f5a" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          <path
            d={ECG_PATH}
            fill="none"
            stroke="url(#lifeline-fade)"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lifeline-trace"
          />
        </svg>
        <div className="lifeline-sweep pointer-events-none absolute inset-0" aria-hidden />
      </div>
    </div>
  );
}
