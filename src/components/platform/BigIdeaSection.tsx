import { EARLY_WARNING_CONDITIONS, GAPS_FIXED } from "@/lib/carechain";

export function BigIdeaSection() {
  return (
    <section className="flex flex-col gap-8" aria-labelledby="big-idea-heading">
      <div>
        <p className="text-rose-deep text-sm font-semibold tracking-wide uppercase">
          The problem
        </p>
        <h2
          id="big-idea-heading"
          className="font-display text-ink mt-2 text-2xl font-semibold leading-snug"
        >
          Pregnancy is one of the earliest stress tests of a woman&apos;s
          cardiovascular system
        </h2>
        <p className="text-muted mt-3 text-base leading-relaxed">
          Conditions like these are often{" "}
          <strong className="text-ink font-medium">
            early warning signals
          </strong>{" "}
          for lifelong cardiovascular disease — yet healthcare systems treat
          pregnancy as an isolated event. After delivery, continuity collapses.
          That is the system failure this app explores.
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {EARLY_WARNING_CONDITIONS.map((condition) => (
          <li
            key={condition}
            className="rounded-xl border border-blush/80 bg-white px-4 py-3 text-sm text-ink"
          >
            {condition}
          </li>
        ))}
      </ul>

      <div>
        <h3 className="text-ink text-sm font-semibold uppercase tracking-wide">
          What CARECHAIN addresses
        </h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {GAPS_FIXED.map((gap) => (
            <li
              key={gap.id}
              className="rounded-full bg-sage-light px-3.5 py-1.5 text-sm font-medium text-sage"
            >
              {gap.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
