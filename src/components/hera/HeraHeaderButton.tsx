"use client";

import { HeraIcon } from "./HeraIcon";
import { useHeraOptional } from "./HeraContext";

/** Compact Hera trigger for page headers (next to settings). */
export function HeraHeaderButton() {
  const hera = useHeraOptional();
  if (!hera) return null;

  return (
    <button
      type="button"
      onClick={hera.openChat}
      className="text-muted hover:text-rose-deep flex h-10 w-10 items-center justify-center rounded-full border border-blush/80 bg-white/90 shadow-sm transition-colors"
      aria-label="Open Hera assistant"
    >
      <HeraIcon className="h-5 w-5" />
    </button>
  );
}
