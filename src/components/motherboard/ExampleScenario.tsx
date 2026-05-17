import { EXAMPLE_SCENARIO } from "@/lib/motherboard";

export function ExampleScenario() {
  return (
    <section
      className="rounded-2xl border border-blush/80 bg-white p-5 shadow-sm"
      aria-labelledby="example-heading"
    >
      <h2 id="example-heading" className="text-ink text-sm font-semibold uppercase tracking-wide">
        Example
      </h2>
      <p className="text-muted mt-1 text-sm">Pregnancy history, preserved and contextualized years later.</p>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row">
        <div className="flex-1 rounded-xl bg-cream p-4">
          <p className="text-muted text-xs font-semibold uppercase">Recorded</p>
          <ul className="mt-2 flex flex-col gap-2">
            {EXAMPLE_SCENARIO.history.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-2 text-sm">
                <span className="text-ink">{item.label}</span>
                <span className="text-muted shrink-0 text-xs">{item.year}</span>
              </li>
            ))}
          </ul>
        </div>

        <ArrowConnector />

        <YearsLaterCard />
      </div>

      <p className="text-sage mt-4 text-center text-sm font-medium">
        {EXAMPLE_SCENARIO.framing}
      </p>
    </section>
  );
}

function ArrowConnector() {
  return (
    <div className="flex items-center justify-center text-rose-deep sm:w-10" aria-hidden>
      <span className="text-2xl sm:rotate-0 rotate-90">→</span>
    </div>
  );
}

function YearsLaterCard() {
  return (
    <div className="flex-1 rounded-xl border border-sage/30 bg-sage-light p-4">
      <p className="text-sage text-xs font-semibold uppercase">Years later</p>
      <p className="text-ink mt-2 text-sm leading-relaxed font-medium">
        &ldquo;{EXAMPLE_SCENARIO.yearsLater}&rdquo;
      </p>
    </div>
  );
}
