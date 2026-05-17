"use client";

import { useRouter } from "next/navigation";
import { JourneyHeader } from "@/components/symptoms/JourneyHeader";
import { useSymptomLogDraft } from "@/context/SymptomLogDraftContext";

function formatTime() {
  return new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export function SymptomLogTypeScreen() {
  const router = useRouter();
  const { draft, setKind } = useSymptomLogDraft();

  return (
    <section className="symptom-journey-screen symptom-journey-bg-intro flex flex-col">
      <JourneyHeader closeTo="/symptoms" ink="#2a1f24" />
      <div className="flex min-h-0 flex-1 flex-col px-5 pb-8 pt-2">
        <h1 className="font-display text-ink mt-4 text-center text-2xl font-bold">
          Log your symptoms
        </h1>

        <div className="mt-8 space-y-3">
          <button
            type="button"
            onClick={() => setKind("moment")}
            className={[
              "relative w-full rounded-2xl bg-white p-4 text-left shadow-sm transition active:scale-[0.99]",
              draft.kind === "moment" ? "ring-2 ring-burgundy" : "",
            ].join(" ")}
          >
            <span className="text-muted text-xs font-medium uppercase tracking-wide">
              ⏱ Check-in
            </span>
            <span className="text-ink mt-1 block text-lg font-semibold">
              How you feel right now
            </span>
            <span className="text-burgundy mt-2 block text-sm font-medium">{formatTime()}</span>
            {draft.kind === "moment" && (
              <span
                className="text-burgundy absolute right-4 top-1/2 -translate-y-1/2 text-xl"
                aria-hidden
              >
                ✓
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setKind("daily")}
            className={[
              "relative w-full rounded-2xl bg-white p-4 text-left shadow-sm transition active:scale-[0.99]",
              draft.kind === "daily" ? "ring-2 ring-burgundy" : "",
            ].join(" ")}
          >
            <span className="text-muted text-xs font-medium uppercase tracking-wide">
              ☀ Daily
            </span>
            <span className="text-ink mt-1 block text-lg font-semibold">
              How you&apos;ve felt overall today
            </span>
            {draft.kind === "daily" && (
              <span
                className="text-burgundy absolute right-4 top-1/2 -translate-y-1/2 text-xl"
                aria-hidden
              >
                ✓
              </span>
            )}
          </button>
        </div>

        <button
          type="button"
          onClick={() => router.push("/symptoms/log/mood")}
          className="bg-burgundy mt-auto w-full rounded-full py-4 text-base font-semibold text-white shadow-md active:bg-burgundy-dark"
        >
          Next
        </button>
      </div>
    </section>
  );
}
