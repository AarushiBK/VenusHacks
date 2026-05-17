import { useEffect, useId, useRef, useState } from "react";

export type SelectOption = string | { value: string; label: string };

function normalizeOptions(options: readonly SelectOption[]) {
  return options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 text-muted/80 transition-transform ${open ? "rotate-180" : ""}`}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const triggerClassName =
  "flex w-full items-center justify-between gap-2 rounded-xl border border-border bg-white px-4 py-3 text-left text-sm outline-none transition focus:border-burgundy focus:ring-2 focus:ring-burgundy/15 disabled:cursor-not-allowed disabled:opacity-60";

export interface SelectInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly SelectOption[];
  placeholder: string;
  error?: boolean;
  disabled?: boolean;
}

export function SelectInput({
  id,
  value,
  onChange,
  options,
  placeholder,
  error,
  disabled,
}: SelectInputProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const items = normalizeOptions(options);
  const selected = items.find((o) => o.value === value);
  const isEmpty = !value;

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

  const errorClass = error
    ? "border-coral focus:border-coral focus:ring-coral/15"
    : "";

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        id={id}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => !disabled && setOpen((prev) => !prev)}
        className={`${triggerClassName} ${isEmpty ? "text-muted" : "text-ink"} ${errorClass}`}
      >
        <span className="truncate">{selected?.label ?? placeholder}</span>
        <Chevron open={open} />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={id}
          className="absolute z-50 mt-1.5 max-h-60 w-full overflow-auto rounded-xl border border-border bg-white py-1 shadow-lg shadow-ink/8"
        >
          {items.map((opt) => {
            const isSelected = value === opt.value;
            return (
              <li key={opt.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`w-full px-4 py-2.5 text-left text-sm transition ${
                    isSelected
                      ? "bg-burgundy/8 font-medium text-ink"
                      : "text-muted hover:bg-cream-dark/60 hover:text-ink"
                  }`}
                >
                  {opt.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
