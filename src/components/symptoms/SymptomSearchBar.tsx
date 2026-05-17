import { normalizeCustomSymptom } from "../../lib/symptomDisplay";

interface SymptomSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onAddCustom: (text: string) => boolean;
  canAddCustom: boolean;
}

export function SymptomSearchBar({
  value,
  onChange,
  onAddCustom,
  canAddCustom,
}: SymptomSearchBarProps) {
  const trimmed = normalizeCustomSymptom(value);

  function handleAdd() {
    if (!canAddCustom || !trimmed) return;
    const added = onAddCustom(trimmed);
    if (added) onChange("");
  }

  return (
    <div className="mt-3">
      <label htmlFor="symptom-search" className="sr-only">
        Search or add symptoms
      </label>
      <div className="flex gap-2">
        <input
          id="symptom-search"
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && canAddCustom) {
              e.preventDefault();
              handleAdd();
            }
          }}
          placeholder="Search or add a symptom…"
          maxLength={120}
          className="min-w-0 flex-1 rounded-full border-0 bg-white/70 px-4 py-2.5 text-sm outline-none ring-1 ring-white/50 focus:ring-2 focus:ring-white"
        />
        <button
          type="button"
          onClick={handleAdd}
          disabled={!canAddCustom}
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/90 text-xl font-medium text-ink shadow-sm transition active:scale-[0.96] disabled:opacity-35"
          aria-label={
            trimmed
              ? `Add ${trimmed} as a symptom`
              : "Add symptom from search"
          }
          title={canAddCustom ? `Add "${trimmed}"` : "Type a symptom to add"}
        >
          +
        </button>
      </div>
    </div>
  );
}
