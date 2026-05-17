import { useNavigate } from "react-router-dom";
import { JourneyHeader } from "../../components/symptoms/JourneyHeader";
import { MoodFlower } from "../../components/symptoms/MoodFlower";
import { useSymptomLogDraft } from "../../context/SymptomLogDraftContext";
import { getMoodTheme } from "../../lib/moodTheme";

export function SymptomMoodPage() {
  const navigate = useNavigate();
  const { draft, setMood } = useSymptomLogDraft();
  const theme = getMoodTheme(draft.mood);

  const prompt =
    draft.kind === "moment"
      ? "Choose how you're feeling right now"
      : "Choose how you've felt overall today";

  return (
    <section
      className={`flex min-h-full flex-col transition-colors duration-500 ${theme.bgClass}`}
    >
      <JourneyHeader
        title="Symptoms"
        backTo="/symptoms/log"
        closeTo="/symptoms"
        ink={theme.ink}
      />
      <div className="flex flex-1 flex-col px-5 pb-8 pt-4">
        <h1
          className="text-center font-display text-xl font-bold leading-snug"
          style={{ color: theme.ink }}
        >
          {prompt}
        </h1>

        <div className="my-6 flex flex-1 flex-col items-center justify-center">
          <MoodFlower mood={draft.mood} />
          <p
            className="mt-6 font-display text-2xl font-bold"
            style={{ color: theme.ink }}
          >
            {theme.label}
          </p>
        </div>

        <div className="space-y-3">
          <input
            type="range"
            min={0}
            max={100}
            value={draft.mood}
            onChange={(e) => setMood(Number(e.target.value))}
            className="apple-mood-slider w-full"
            aria-label="How pleasant or unpleasant you feel"
            style={{ accentColor: theme.accent }}
          />
          <div
            className="flex justify-between text-[10px] font-semibold uppercase tracking-wide"
            style={{ color: theme.ink, opacity: 0.55 }}
          >
            <span>Very unpleasant</span>
            <span>Very pleasant</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/symptoms/log/select")}
          className={`mt-8 w-full rounded-full py-4 text-base font-semibold shadow-md active:opacity-90 ${theme.buttonClass}`}
        >
          Next
        </button>
      </div>
    </section>
  );
}
