interface SymptomPillProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
}

export function SymptomPill({ label, selected, onToggle }: SymptomPillProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={[
        "rounded-full px-4 py-2.5 text-sm font-semibold transition active:scale-[0.97]",
        selected
          ? "bg-ink/75 text-white shadow-sm"
          : "bg-white/90 text-ink shadow-sm",
      ].join(" ")}
      aria-pressed={selected}
    >
      {label}
    </button>
  );
}
