import type { DailyRecommendation } from "@/lib/healthOverview";

export function DailyRecommendations({
  items,
}: {
  items: DailyRecommendation[];
}) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li
          key={item.id}
          className="rounded-2xl border border-blush/70 bg-white px-4 py-3.5 shadow-sm shadow-rose/5"
        >
          <p className="text-ink flex items-start gap-2 text-sm font-medium">
            <span className="text-rose-deep mt-0.5 shrink-0" aria-hidden>
              •
            </span>
            {item.text}
          </p>
          <p className="text-muted mt-1.5 pl-4 text-xs leading-relaxed">
            {item.rationale}
          </p>
        </li>
      ))}
    </ul>
  );
}
