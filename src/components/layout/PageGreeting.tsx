"use client";

import { HeraHeaderButton } from "@/components/hera/HeraHeaderButton";
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
      <TopActions onOpenSettings={onOpenSettings} />
      <div className={onOpenSettings ? "pr-24" : "pr-12"}>
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

function TopActions({
  onOpenSettings,
}: {
  onOpenSettings?: () => void;
}) {
  return (
    <div className="absolute top-0 right-0 flex items-center gap-1.5">
      <HeraHeaderButton />
      {onOpenSettings && (
        <button
          type="button"
          onClick={onOpenSettings}
          className="text-muted hover:text-ink flex h-10 w-10 items-center justify-center rounded-full transition-colors"
          aria-label="Open settings"
        >
          <SettingsGearIcon />
        </button>
      )}
    </div>
  );
}
