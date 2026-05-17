import { moodDotFill } from "../../lib/moodChartPlot";
import type { CalendarMonthData } from "../../lib/symptomChartData";

interface SymptomMoodCalendarProps {
  calendar: CalendarMonthData;
}

export function SymptomMoodCalendar({ calendar }: SymptomMoodCalendarProps) {
  const monthHasLogs = calendar.weeks
    .flat()
    .some((d) => d.isCurrentMonth && d.entryCount > 0);

  return (
    <div className="mx-auto w-full max-w-sm flex-col pt-1">
      <div
        className="grid w-full grid-cols-7 gap-y-1 text-center"
        role="grid"
        aria-label={`Mood calendar for ${calendar.monthLabel}`}
      >
        {calendar.weekdayLabels.map((label) => (
          <div
            key={label}
            role="columnheader"
            className="pb-1 text-[10px] font-semibold uppercase tracking-wide text-muted"
          >
            {label}
          </div>
        ))}

        {calendar.weeks.flat().map((day) => {
          const fill =
            day.averageMood !== null ? moodDotFill(day.averageMood) : null;
          const title =
            day.entryCount > 0 && day.averageMood !== null
              ? `${day.dateKey}: avg mood ${day.averageMood} (${day.entryCount} log${day.entryCount === 1 ? "" : "s"})`
              : day.isCurrentMonth
                ? day.dateKey
                : undefined;

          return (
            <div
              key={day.dateKey}
              role="gridcell"
              aria-label={title}
              className={[
                "flex min-h-[44px] flex-col items-center justify-start gap-1 py-0.5",
                !day.isCurrentMonth && "opacity-35",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span
                className={[
                  "flex size-7 items-center justify-center rounded-full text-xs font-medium",
                  day.isToday
                    ? "bg-burgundy text-white"
                    : day.isCurrentMonth
                      ? "text-ink"
                      : "text-muted",
                ].join(" ")}
              >
                {day.dayOfMonth}
              </span>
              <span className="flex h-3.5 items-center justify-center" aria-hidden>
                {fill !== null ? (
                  <span
                    className="size-3 rounded-full ring-2 ring-white shadow-sm"
                    style={{ background: fill }}
                  />
                ) : (
                  <span className="size-3 rounded-full bg-transparent" />
                )}
              </span>
            </div>
          );
        })}
      </div>

      {!monthHasLogs ? (
        <p className="mt-4 text-center text-sm text-muted">No logs this month yet.</p>
      ) : null}
    </div>
  );
}
