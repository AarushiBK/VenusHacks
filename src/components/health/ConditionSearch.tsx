import { useEffect, useId, useRef, useState } from "react";
import { useConditionSearch } from "../../hooks/useConditionSearch";
import type { PreExistingCondition } from "../../types/condition";
import { TextInput } from "../ui/FormField";

interface ConditionSearchProps {
  selected: PreExistingCondition[];
  onChange: (conditions: PreExistingCondition[]) => void;
}

export function ConditionSearch({ selected, onChange }: ConditionSearchProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const inputId = useId();

  const { results, loading, error } = useConditionSearch(query);
  const selectedIds = new Set(selected.map((c) => c.id));

  const visibleResults = results.filter((r) => !selectedIds.has(r.id));
  const showDropdown = open && query.trim().length >= 2;

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function addCondition(condition: PreExistingCondition) {
    if (selectedIds.has(condition.id)) return;
    onChange([...selected, condition]);
    setQuery("");
    setOpen(false);
  }

  function removeCondition(id: string) {
    onChange(selected.filter((c) => c.id !== id));
  }

  return (
    <div className="min-w-0 space-y-3">
      <div ref={containerRef} className="relative min-w-0">
        <label htmlFor={inputId} className="text-sm font-medium text-ink">
          Search conditions
        </label>
        <p className="mt-1 text-xs text-muted">
          Start typing (e.g. diabetes, endometriosis). Powered by NIH Clinical Tables.
        </p>
        <div className="mt-1.5">
          <TextInput
            id={inputId}
            type="search"
            autoComplete="off"
            role="combobox"
            aria-expanded={showDropdown}
            aria-controls={listId}
            aria-autocomplete="list"
            placeholder="Search for a condition…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
          />
        </div>

        {showDropdown && (
          <ul
            id={listId}
            role="listbox"
            className="absolute left-0 right-0 z-50 mt-1.5 max-h-56 min-w-0 overflow-x-hidden overflow-y-auto rounded-xl border border-border bg-white py-1 shadow-lg shadow-ink/8"
          >
            {loading && (
              <li className="px-4 py-2.5 text-sm text-muted">Searching…</li>
            )}
            {error && !loading && (
              <li className="px-4 py-2.5 text-sm text-coral">{error}</li>
            )}
            {!loading && !error && visibleResults.length === 0 && (
              <li className="px-4 py-2.5 text-sm text-muted">No matching conditions</li>
            )}
            {!loading &&
              !error &&
              visibleResults.map((item) => (
                <li key={item.id} role="presentation">
                  <button
                    type="button"
                    role="option"
                    className="w-full min-w-0 px-4 py-2.5 text-left text-sm transition text-muted hover:bg-cream-dark/60 hover:text-ink"
                    onClick={() => addCondition(item)}
                  >
                    <span className="block font-medium leading-snug break-words whitespace-normal text-ink">
                      {item.name}
                    </span>
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>

      {selected.length > 0 && (
        <ul className="flex flex-wrap gap-2" aria-label="Selected conditions">
          {selected.map((condition) => (
            <li key={condition.id}>
              <span className="inline-flex max-w-full items-start gap-1.5 rounded-2xl border border-burgundy/25 bg-burgundy/5 py-1.5 pl-3 pr-1.5 text-sm text-ink">
                <span className="min-w-0 leading-snug break-words whitespace-normal">
                  {condition.name}
                </span>
                <button
                  type="button"
                  onClick={() => removeCondition(condition.id)}
                  className="shrink-0 rounded-full p-0.5 text-muted transition hover:bg-burgundy/10 hover:text-coral"
                  aria-label={`Remove ${condition.name}`}
                >
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden>
                    <path
                      d="M6 6l8 8M14 6l-8 8"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
