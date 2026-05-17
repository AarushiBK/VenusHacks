import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ShowInChartsLink,
  SymptomSummaryCard,
} from "../../components/symptoms/SymptomSummaryCard";
import {
  getLogsForDay,
  getTodayIsoDate,
} from "../../lib/symptomLogsStorage";
import type { SymptomLogEntry } from "../../types/symptoms";

function formatTodayHeading() {
  const d = new Date();
  const date = d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  return `Today, ${date}`;
}

function partitionLogs(entries: SymptomLogEntry[]) {
  const daily = entries.find((e) => e.kind === "daily");
  const moments = entries
    .filter((e) => e.kind === "moment")
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  return { daily, moments };
}

/** Re-read today's logs when the local calendar day changes (e.g. after midnight). */
function useTodayDateKey() {
  const [todayKey, setTodayKey] = useState(getTodayIsoDate);

  useEffect(() => {
    const sync = () => {
      const next = getTodayIsoDate();
      setTodayKey((prev) => (prev === next ? prev : next));
    };
    const interval = window.setInterval(sync, 60_000);
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("focus", sync);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("focus", sync);
    };
  }, []);

  return todayKey;
}

export function SymptomsHomePage() {
  const location = useLocation();
  const fromLogged = Boolean(
    (location.state as { fromLogged?: boolean } | null)?.fromLogged,
  );
  const [visible, setVisible] = useState(!fromLogged);
  const todayKey = useTodayDateKey();

  useEffect(() => {
    if (!fromLogged) return;
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
    return () => cancelAnimationFrame(frame);
  }, [fromLogged]);

  const enterClass = [
    fromLogged ? "symptoms-home-enter" : "",
    visible ? "is-visible" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const todayLogs = getLogsForDay(todayKey);
  const { daily, moments } = partitionLogs(todayLogs);

  return (
    <div className={`flex min-h-full flex-col bg-cream pb-6 ${enterClass}`}>
      <header className="sticky top-0 z-20 bg-transparent px-4 py-3 safe-top">
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
