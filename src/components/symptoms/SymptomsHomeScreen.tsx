"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import {
  ShowInChartsLink,
  SymptomSummaryCard,
} from "@/components/symptoms/SymptomSummaryCard";
import { getLogsForDay, getTodayIsoDate, seedDemoSymptomLogsIfEmpty } from "@/lib/symptomLogsStorage";
import type { SymptomLogEntry } from "@/types/symptoms";

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

function SymptomsHomeContent() {
  const searchParams = useSearchParams();
  const fromLogged = searchParams.get("logged") === "1";
  const [visible, setVisible] = useState(!fromLogged);

  useEffect(() => {
    void seedDemoSymptomLogsIfEmpty();
  }, []);

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

  const today = getTodayIsoDate();
  const todayLogs = getLogsForDay(today);
  const { daily, moments } = partitionLogs(todayLogs);

  return (
    <div className={`flex min-h-full flex-col bg-cream pb-6 ${enterClass}`}>
      <header className="safe-top sticky top-0 z-20 bg-transparent px-4 py-3">
        <div className="flex items-center justify-center">
          <h1 className="font-display text-ink text-2xl font-bold">Symptoms</h1>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-5 px-4 pt-4">
        <div className="flex items-end justify-between gap-3">
          <h2 className="font-display text-ink text-2xl font-bold">{formatTodayHeading()}</h2>
          <Link
            href="/symptoms/log"
            className="bg-burgundy shrink-0 rounded-full px-5 py-2 text-sm font-semibold text-white shadow-sm active:bg-burgundy-dark"
          >
            Log
          </Link>
        </div>

        <SymptomSummaryCard dailyEntry={daily} momentEntries={moments} />
        <ShowInChartsLink />

        <section className="border-border/60 mt-2 border-t pt-6">
          <h3 className="font-display text-ink text-lg font-semibold">About Symptoms</h3>
          <p className="text-muted mt-2 text-sm leading-relaxed">
            Log how you feel and select warning signs before, during, and after pregnancy.
            VitaCore helps you track patterns that may relate to cardiovascular risk.
          </p>
        </section>
      </div>
    </div>
  );
}

export function SymptomsHomeScreen() {
  return (
    <Suspense fallback={<div className="min-h-[40vh] bg-cream" />}>
      <SymptomsHomeContent />
    </Suspense>
  );
}
