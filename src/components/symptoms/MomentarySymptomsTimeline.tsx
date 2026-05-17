import {
  formatMomentaryTime,
  getMomentaryEntryPrimaryLabel,
} from "../../lib/symptomDisplay";
import { getMoodLabel } from "../../lib/moodLabels";
import type { SymptomLogEntry } from "../../types/symptoms";
import { MoodHeart } from "./MoodHeart";

interface MomentarySymptomsTimelineProps {
  entries: SymptomLogEntry[];
}

export function MomentarySymptomsTimeline({ entries }: MomentarySymptomsTimelineProps) {
  if (entries.length === 0) {
    return <p className="mt-2 text-sm text-muted">No entries</p>;
  }

  return (
    <ul className="mt-3 space-y-4" aria-label="Today's momentary symptom check-ins">
      {entries.map((entry) => (
        <li key={entry.id} className="flex items-start gap-3">
          <div className="shrink-0 pt-0.5">
            <MoodHeart mood={entry.mood} size="sm" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <p className="truncate font-semibold text-ink">
                {getMomentaryEntryPrimaryLabel(entry)}
              </p>
              <time
                dateTime={entry.createdAt}
                className="shrink-0 text-sm text-muted tabular-nums"
              >
                {formatMomentaryTime(entry.createdAt)}
              </time>
            </div>
            <p className="mt-0.5 text-sm text-muted">{getMoodLabel(entry.mood)}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
