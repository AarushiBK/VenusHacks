import { useNavigate } from "react-router-dom";
import { JourneyHeader } from "../../components/symptoms/JourneyHeader";
import { useSymptomLogDraft } from "../../context/SymptomLogDraftContext";

function formatTime() {
  return new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export function SymptomLogTypePage() {
  const navigate = useNavigate();
  const { draft, setKind } = useSymptomLogDraft();

  return (
    <section className="symptom-journey-screen symptom-journey-bg-intro flex flex-col">
      <JourneyHeader closeTo="/symptoms" ink="#2a1f24" />
      <div className="flex min-h-0 flex-1 flex-col px-5 pb-8 pt-2">
        <h1 className="mt-4 text-center font-display text-2xl font-bold text-ink">
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
            <span className="text-xs font-medium uppercase tracking-wide text-muted">
              ⏱ Check-in
            </span>
            <span className="mt-1 block text-lg font-semibold text-ink">
              How you feel right now
            </span>
            <span className="mt-2 block text-sm font-medium text-burgundy">
              {formatTime()}
            </span>
            {draft.kind === "moment" && (
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-burgundy"
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
            <span className="text-xs font-medium uppercase tracking-wide text-muted">
              ☀ Daily
            </span>
            <span className="mt-1 block text-lg font-semibold text-ink">
              How you&apos;ve felt overall today
            </span>
            {draft.kind === "daily" && (
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-burgundy"
                aria-hidden
              >
                ✓
              </span>
            )}
          </button>
        </div>

        <button
          type="button"
          onClick={() => navigate("/symptoms/log/mood")}
          className="mt-auto w-full rounded-full bg-burgundy py-4 text-base font-semibold text-white shadow-md active:bg-burgundy-dark"
        >
          Next
        </button>
      </div>
    </section>
  );
}
