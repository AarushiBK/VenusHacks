import { CORE_INSIGHT, MOTHERBOARD, TRANSFORMATION } from "@/lib/motherboard";

export function MotherboardHero() {
  return (
    <header className="flex flex-col gap-6">
      <div>
        <MemoryBadge />
        <h1 className="font-display text-ink mt-3 text-3xl font-semibold leading-tight tracking-tight">
          {MOTHERBOARD.tagline}
        </h1>
      </div>

      <div className="rounded-2xl border border-sage/25 bg-gradient-to-br from-sage-light to-white p-5 shadow-sm shadow-sage/10">
        <p className="font-display text-ink text-lg font-semibold leading-snug">
          {CORE_INSIGHT.headline}
        </p>
        <p className="text-muted mt-3 text-base leading-relaxed">
          {CORE_INSIGHT.problem}
        </p>
        <p className="text-rose-deep mt-2 text-base font-semibold">
          {CORE_INSIGHT.punchline}
        </p>
      </div>

      <div className="rounded-2xl border border-blush/80 bg-white p-5 shadow-sm shadow-rose/5">
        <p className="text-ink text-base font-medium">{TRANSFORMATION.system}</p>
        <div className="mt-4 flex flex-col items-stretch gap-3">
          <ul className="flex flex-wrap gap-2">
            {TRANSFORMATION.from.map((item) => (
              <li
                key={item}
                className="rounded-full bg-blush/80 px-3 py-1 text-sm text-ink"
              >
                {item}
              </li>
            ))}
          </ul>
          <span className="text-rose-deep shrink-0 text-center text-xl font-light" aria-hidden>
            ↓
          </span>
          <p className="rounded-xl bg-sage-light px-4 py-2.5 text-center text-sm font-semibold text-sage">
            {TRANSFORMATION.to}
          </p>
        </div>
      </div>
    </header>
  );
}

function MemoryBadge() {
  return (
    <span className="w-fit rounded-full border border-sage/30 bg-sage-light px-3 py-1 text-[11px] font-semibold tracking-wide text-sage uppercase">
      Persistent cardiovascular memory
    </span>
  );
}
