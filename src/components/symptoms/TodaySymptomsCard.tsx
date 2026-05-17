import Link from "next/link";
import { getMoodLabel } from "../../lib/moodLabels";
import { getSymptomLabelsForEntry } from "../../lib/symptomDisplay";
import type { SymptomLogEntry } from "../../types/symptoms";

interface TodaySymptomsCardProps {
  entries: SymptomLogEntry[];
  dateLabel: string;
}

export function TodaySymptomsCard({ entries, dateLabel }: TodaySymptomsCardProps) {
  const hasEntries = entries.length > 0;
  const latest = entries[0];

  return (
    <section className="rounded-3xl border border-border bg-white p-4 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-muted">{dateLabel}</p>
      <div
        className={[
          "mt-3 rounded-2xl px-4 py-6 text-center text-sm",
          hasEntries
            ? "bg-sage-light text-sage"
            : "bg-sage-light/50 text-muted italic",
        ].join(" ")}
      >
        {hasEntries
          ? `${entries.length} log${entries.length === 1 ? "" : "s"} today`
          : "Empty if you haven't logged today"}
      </div>
      {latest && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-semibold text-ink">
            {latest.kind === "moment" ? "Momentary check-in" : "Overall today"}
          </p>
          <p className="text-sm text-muted">{getMoodLabel(latest.mood)}</p>
          {(() => {
            const labels = getSymptomLabelsForEntry(latest);
            if (labels.length === 0) return null;
            return (
              <ul className="flex flex-wrap gap-1.5">
                {labels.slice(0, 4).map((name) => (
                  <li
                    key={name}
                    className="rounded-full bg-cream-dark px-2.5 py-1 text-[10px] font-medium text-ink"
                  >
                    {name}
                  </li>
                ))}
                {labels.length > 4 && (
                  <li className="rounded-full bg-cream-dark px-2.5 py-1 text-[10px] text-muted">
                    +{labels.length - 4}
                  </li>
                )}
              </ul>
            );
          })()}
          <div
            className="mt-3 h-16 rounded-xl bg-gradient-to-r from-burgundy/20 via-coral/30 to-sage/30"
            aria-hidden
          />
        </div>
      )}
      <Link
        href="/symptoms/charts"
        className="mt-4 flex w-full items-center justify-center rounded-xl border border-burgundy/20 bg-burgundy/5 py-3 text-sm font-semibold text-burgundy active:bg-burgundy/10"
      >
        Show in charts
      </Link>
    </section>
  );
}
