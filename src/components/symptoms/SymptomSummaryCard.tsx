import { Link } from "react-router-dom";
import { getMoodLabel } from "../../lib/moodLabels";
import { getSymptomLabelsForEntry } from "../../lib/symptomDisplay";
import { getMoodTheme } from "../../lib/moodTheme";
import type { SymptomLogEntry } from "../../types/symptoms";
import { MomentarySymptomsTimeline } from "./MomentarySymptomsTimeline";
import { MoodHeart } from "./MoodHeart";

interface SymptomSummaryCardProps {
  dailyEntry?: SymptomLogEntry;
  momentEntries: SymptomLogEntry[];
}

export function SymptomSummaryCard({ dailyEntry, momentEntries }: SymptomSummaryCardProps) {
  const hasDaily = Boolean(dailyEntry);

  if (!hasDaily) {
    return (
      <article className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-border/60">
        <div className="symptom-card-gradient-empty px-6 pb-8 pt-10 text-center">
          <span className="text-4xl text-muted/40" aria-hidden>
            ✿
          </span>
          <p className="mt-4 text-base font-medium text-muted">No Entry</p>
        </div>
        <section className="border-t border-border/50 px-5 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
            Momentary symptoms
          </p>
          <MomentarySymptomsTimeline entries={momentEntries} />
        </section>
      </article>
    );
  }

  const theme = getMoodTheme(dailyEntry!.mood);
  const symptomNames = getSymptomLabelsForEntry(dailyEntry!);

  return (
    <article className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-border/60">
      <div className="symptom-card-gradient-filled px-5 pb-5 pt-6 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
          Daily symptoms
        </p>
        <div className="my-2 flex justify-center">
          <MoodHeart mood={dailyEntry!.mood} size="md" />
        </div>
        <p className="font-display text-lg font-semibold text-ink">
          {symptomNames.length > 0
            ? symptomNames.slice(0, 3).join(", ") +
              (symptomNames.length > 3 ? ` +${symptomNames.length - 3}` : "")
            : getMoodLabel(dailyEntry!.mood)}
        </p>
        <p className="mt-1 text-sm text-muted">A {theme.label.toLowerCase()} day</p>
      </div>
      <section className="border-t border-border/50 px-5 py-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
          Momentary symptoms
        </p>
        <MomentarySymptomsTimeline entries={momentEntries} />
      </section>
    </article>
  );
}

export function ShowInChartsLink() {
  return (
    <Link
      to="/symptoms/charts"
      className="flex w-full items-center justify-center rounded-full bg-cream-dark py-3.5 text-base font-semibold text-burgundy active:bg-burgundy/10"
    >
      Show in Charts
    </Link>
  );
}
