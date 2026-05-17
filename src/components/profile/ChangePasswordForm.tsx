"use client";

import { useState } from "react";
import {
  hasStoredPassword,
  savePassword,
  validateNewPassword,
} from "@/lib/profileStorage";

const inputClass =
  "text-ink mt-1 w-full rounded-lg border border-blush bg-cream px-3 py-2 text-sm outline-none focus:border-rose/60 focus:ring-2 focus:ring-rose/15";

export function ChangePasswordForm({ onDone }: { onDone: () => void }) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const needsCurrent = hasStoredPassword();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationError = validateNewPassword(
      next,
      confirm,
      needsCurrent ? current : undefined,
    );
    if (validationError) {
      setError(validationError);
      return;
    }
    savePassword(next);
    setError(null);
    setSuccess(true);
    setCurrent("");
    setNext("");
    setConfirm("");
    window.setTimeout(() => {
      setSuccess(false);
      onDone();
    }, 1200);
  }

  if (success) {
    return (
      <p className="text-sage mt-3 text-sm font-medium">Password updated successfully.</p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3 border-t border-blush/60 pt-4">
      {needsCurrent && (
        <label className="block">
          <span className="text-muted text-[10px] font-medium uppercase">
            Current password
          </span>
          <input
            type="password"
            autoComplete="current-password"
            className={inputClass}
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
          />
        </label>
      )}
      <label className="block">
        <span className="text-muted text-[10px] font-medium uppercase">New password</span>
        <input
          type="password"
          autoComplete="new-password"
          className={inputClass}
          value={next}
          onChange={(e) => setNext(e.target.value)}
        />
      </label>
      <label className="block">
        <span className="text-muted text-[10px] font-medium uppercase">
          Confirm new password
        </span>
        <input
          type="password"
          autoComplete="new-password"
          className={inputClass}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
      </label>
      {error && <p className="text-alert text-xs">{error}</p>}
      <div className="flex gap-2 pt-1">
        <button
          type="button"
          onClick={onDone}
          className="text-muted flex-1 rounded-lg border border-blush py-2 text-sm font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-rose-deep flex-1 rounded-lg py-2 text-sm font-semibold text-white"
        >
          Update password
        </button>
      </div>
    </form>
  );
}
