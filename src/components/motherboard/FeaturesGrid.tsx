import { FEATURES } from "@/lib/motherboard";

const icons: Record<string, string> = {
  timeline: "◷",
  recovery: "↗",
  education: "◎",
  pathway: "◇",
};

export function FeaturesGrid() {
  return (
    <section aria-labelledby="features-heading">
      <h2 id="features-heading" className="text-ink text-sm font-semibold uppercase tracking-wide">
        Features
      </h2>
      <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {FEATURES.map((feature) => (
          <li
            key={feature.id}
            className="flex gap-3 rounded-xl border border-blush/60 bg-white p-4 transition hover:border-sage/40 hover:shadow-sm"
          >
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sage-light text-lg text-sage"
              aria-hidden
            >
              {icons[feature.id]}
            </span>
            <div>
              <h3 className="text-ink text-sm font-semibold">{feature.title}</h3>
              <p className="text-muted mt-0.5 text-xs leading-relaxed">
                {feature.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
