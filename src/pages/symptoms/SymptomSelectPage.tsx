import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { JourneyHeader } from "../../components/symptoms/JourneyHeader";
import { MoodFlower } from "../../components/symptoms/MoodFlower";
import { SymptomPill } from "../../components/symptoms/SymptomPill";
import { SymptomSearchBar } from "../../components/symptoms/SymptomSearchBar";
import { getDefaultSymptomsForMood } from "../../constants/moodSymptomDefaults";
import { getSymptomPillLabel, searchSymptoms } from "../../constants/symptomsCatalog";
import { useSymptomLogDraft } from "../../context/SymptomLogDraftContext";
import { canAddCustomFromSearch } from "../../lib/symptomDisplay";
import { getMoodBucket, isUnpleasantMoodBucket } from "../../lib/moodLabels";
import { getMoodTheme } from "../../lib/moodTheme";
import { saveSymptomLog } from "../../lib/symptomLogsStorage";

const INITIAL_VISIBLE = 12;

export function SymptomSelectPage() {
  const navigate = useNavigate();
  const { draft, toggleSymptom, addCustomSymptom, removeCustomSymptom, resetDraft } =
    useSymptomLogDraft();
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [saving, setSaving] = useState(false);

  const theme = getMoodTheme(draft.mood);
  const moodBucket = getMoodBucket(draft.mood);
  const defaultSymptoms = useMemo(
    () => getDefaultSymptomsForMood(draft.mood),
    [draft.mood],
  );
  const filtered = useMemo(() => {
    if (query.trim()) return searchSymptoms(query);
    return defaultSymptoms;
  }, [query, defaultSymptoms]);
  const visible = showAll || query ? filtered : filtered.slice(0, INITIAL_VISIBLE);
  const hasMore = !query && !showAll && filtered.length > INITIAL_VISIBLE;

  useEffect(() => {
    setShowAll(false);
  }, [draft.mood]);

  const selectHelpTitle = isUnpleasantMoodBucket(moodBucket)
    ? "Select all warning signs that apply. Call your provider for urgent symptoms."
    : "Select all that apply to how you're feeling.";
  const hasSelection =
    draft.symptomIds.length > 0 || draft.customSymptoms.length > 0;
  const canAddCustom = canAddCustomFromSearch(query, draft.customSymptoms);

  function handleSave() {
    if (!hasSelection) return;
    setSaving(true);
    saveSymptomLog({
      kind: draft.kind,
      mood: draft.mood,
      symptomIds: draft.symptomIds,
      customSymptoms:
        draft.customSymptoms.length > 0 ? draft.customSymptoms : undefined,
    });
    resetDraft();
    navigate("/symptoms/log/done", { replace: true });
  }

  function handleQueryChange(value: string) {
    setQuery(value);
    if (value.trim()) setShowAll(true);
  }

  return (
    <section
      className="symptom-journey-screen symptom-journey-bg-smooth flex flex-col"
      style={{ background: theme.background }}
    >
      <JourneyHeader
        backTo="/symptoms/log/mood"
        closeTo="/symptoms"
        ink={theme.ink}
      />
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-5 pb-6 pt-2">
        <div className="shrink-0 text-center">
          <MoodFlower mood={draft.mood} size="md" />
          <p
            className="mt-2 font-display text-xl font-bold"
            style={{ color: theme.ink }}
          >
            {theme.label}
          </p>
        </div>

        <div className="mt-4 shrink-0">
          <div className="flex items-center justify-center gap-2">
            <p
              className="text-center text-sm font-medium"
              style={{ color: theme.ink }}
            >
              What best describes your symptoms?
            </p>
            <span
              className="flex size-5 items-center justify-center rounded-full bg-white/50 text-[10px]"
              style={{ color: theme.ink }}
              title={selectHelpTitle}
            >
              i
            </span>
          </div>
          <hr className="mt-3 border-white/40" />
          <SymptomSearchBar
            value={query}
            onChange={handleQueryChange}
            onAddCustom={addCustomSymptom}
            canAddCustom={canAddCustom}
          />
        </div>

        <div className="mt-4 min-h-0 flex-1 overflow-y-auto pb-4">
          <div className="flex flex-wrap justify-center gap-2">
            {draft.customSymptoms.map((label) => (
              <SymptomPill
                key={`custom-${label}`}
                label={label}
                selected
                onToggle={() => removeCustomSymptom(label)}
              />
            ))}
            {visible.map((s) => (
              <SymptomPill
                key={s.id}
                label={getSymptomPillLabel(s)}
                selected={draft.symptomIds.includes(s.id)}
                onToggle={() => toggleSymptom(s.id)}
              />
            ))}
          </div>
          {hasMore && (
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="mx-auto mt-4 block text-sm font-medium"
              style={{ color: theme.ink, opacity: 0.7 }}
            >
              Show more ›
            </button>
          )}
          {query.trim() && visible.length === 0 && !canAddCustom && draft.customSymptoms.length === 0 && (
            <p className="mt-8 text-center text-sm" style={{ color: theme.ink, opacity: 0.6 }}>
              Already added or matches a listed symptom — select it above.
            </p>
          )}
        </div>

        <button
          type="button"
          disabled={!hasSelection || saving}
          onClick={handleSave}
          className="mood-accent-smooth shrink-0 w-full rounded-full py-4 text-base font-semibold text-white shadow-md disabled:opacity-40 active:opacity-90"
          style={{ backgroundColor: theme.accent }}
        >
          {saving ? "Saving…" : "Next"}
        </button>
      </div>
    </section>
  );
}
