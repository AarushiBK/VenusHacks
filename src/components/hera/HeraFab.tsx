"use client";

import { HeraIcon } from "./HeraIcon";
import { useHera } from "./HeraContext";

export function HeraFab() {
  const { open, toggleChat } = useHera();

  return (
    <button
      type="button"
      onClick={toggleChat}
      aria-label={open ? "Close Hera chat" : "Open Hera chat"}
      aria-expanded={open}
      className={`hera-fab absolute z-[45] flex h-12 w-12 items-center justify-center rounded-full border-2 shadow-lg transition-all ${
        open
          ? "border-rose-deep bg-rose-deep text-white shadow-rose/30"
          : "border-blush bg-white text-rose-deep shadow-rose/15 hover:border-rose/50 hover:bg-blush/30"
      }`}
      style={{
        right: "1rem",
        bottom: "5.75rem",
      }}
    >
      <HeraIcon className="h-6 w-6" />
    </button>
  );
}
