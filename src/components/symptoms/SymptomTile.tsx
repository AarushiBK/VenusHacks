import type { SymptomDefinition } from "../../types/symptoms";

interface SymptomTileProps {
  symptom: SymptomDefinition;
  selected?: boolean;
  compact?: boolean;
  onToggle: () => void;
}

export function SymptomTile({ symptom, selected, compact, onToggle }: SymptomTileProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={[
        "flex w-full flex-col items-center gap-2 rounded-2xl border p-3 text-center transition active:scale-[0.98]",
        compact ? "min-h-[72px]" : "min-h-[100px]",
        selected
          ? "border-burgundy bg-burgundy/10 shadow-sm"
          : "border-border bg-white hover:border-burgundy/30",
      ].join(" ")}
      aria-pressed={selected}
    >
      <span className="text-2xl leading-none" aria-hidden>
        {symptom.icon}
      </span>
      <span
        className={[
          "font-semibold leading-snug text-ink",
          compact ? "text-[10px]" : "text-xs",
        ].join(" ")}
      >
        {symptom.label}
      </span>
    </button>
  );
}
