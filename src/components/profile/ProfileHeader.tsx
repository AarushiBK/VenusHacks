"use client";

import { SettingsGearIcon } from "@/components/icons/SettingsGearIcon";
import { profileUser } from "@/lib/profile";

export function ProfileHeader({ onOpenSettings }: { onOpenSettings: () => void }) {
  return (
    <header className="relative flex flex-col items-center pt-2 pb-6">
      <button
        type="button"
        onClick={onOpenSettings}
        className="text-muted hover:text-ink absolute top-0 right-0 flex h-10 w-10 items-center justify-center rounded-full transition-colors"
        aria-label="Open settings"
      >
        <SettingsGearIcon />
      </button>

      <div
        className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-blush bg-linear-to-br from-blush to-white shadow-md shadow-rose/10"
        aria-hidden
      >
        <span className="font-display text-rose-deep text-2xl font-semibold">
          {profileUser.initials}
        </span>
      </div>

      <h1 className="font-display text-ink mt-3 text-2xl font-semibold tracking-tight">
        {profileUser.name}
      </h1>
      <p className="text-muted mt-0.5 text-sm">{profileUser.detail}</p>
    </header>
  );
}
