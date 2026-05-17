import { Link } from "react-router-dom";
import {
  ShowInChartsLink,
  SymptomSummaryCard,
} from "../../components/symptoms/SymptomSummaryCard";
import { getLogsForDay, getTodayIsoDate } from "../../lib/symptomLogsStorage";
import type { SymptomLogEntry } from "../../types/symptoms";

function formatTodayHeading() {
  const d = new Date();
  const date = d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  return `Today, ${date}`;
}

function partitionLogs(entries: SymptomLogEntry[]) {
  const daily = entries.find((e) => e.kind === "daily");
  const moments = entries.filter((e) => e.kind === "moment");
  return { daily, moments };
}

export function SymptomsHomePage() {
  const today = getTodayIsoDate();
  const todayLogs = getLogsForDay(today);
  const { daily, moments } = partitionLogs(todayLogs);

  return (
    <div className="flex min-h-full flex-col bg-cream pb-6">
      <header className="sticky top-0 z-20 border-b border-border/50 bg-cream/95 px-4 py-3 backdrop-blur-sm safe-top">
        <div className="flex items-center justify-center">
          <h1 className="font-display text-2xl font-bold text-ink">Symptoms</h1>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-5 px-4 pt-4">
        <div className="flex items-end justify-between gap-3">
          <h2 className="font-display text-2xl font-bold text-ink">{formatTodayHeading()}</h2>
          <Link
            to="/symptoms/log"
            className="shrink-0 rounded-full bg-burgundy px-5 py-2 text-sm font-semibold text-white shadow-sm active:bg-burgundy-dark"
          >
            Log
          </Link>
        </div>

        <SymptomSummaryCard dailyEntry={daily} momentEntries={moments} />
        <ShowInChartsLink />

        <section className="mt-2 border-t border-border/60 pt-6">
          <h3 className="font-display text-lg font-semibold text-ink">About Symptoms</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Log how you feel and select warning signs before, during, and after pregnancy.
            VitaCor helps you track patterns that may relate to cardiovascular risk.
          </p>
        </section>
      </div>
    </div>
  );
}
