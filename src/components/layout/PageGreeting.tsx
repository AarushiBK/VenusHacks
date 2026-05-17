"use client";

import { SettingsGearIcon } from "@/components/icons/SettingsGearIcon";

/** Shared top offset so Home and Health greet in the same place */
export const PAGE_GREETING_TOP = "pt-14";
export const PAGE_GREETING_BOTTOM = "mb-8";

export function PageGreeting({
  name,
  detail,
  onOpenSettings,
}: {
  name: string;
  detail?: string;
  onOpenSettings?: () => void;
}) {
  return (
    <header
      className={`relative ${PAGE_GREETING_TOP} ${PAGE_GREETING_BOTTOM}`}
    >
      {onOpenSettings && (
        <button
          type="button"
          onClick={onOpenSettings}
          className="text-muted hover:text-ink absolute top-0 right-0 flex h-10 w-10 items-center justify-center rounded-full transition-colors"
          aria-label="Open settings"
        >
          <SettingsGearIcon />
        </button>
      )}
      <div className={onOpenSettings ? "pr-12" : undefined}>
        <h1 className="font-display text-ink text-3xl font-semibold tracking-tight">
          Hi, {name}
        </h1>
        {detail && (
          <p className="text-muted mt-1 text-base">{detail}</p>
        )}
      </div>
    </header>
  );
}
