"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { clearAuthenticated } from "@/lib/authSession";
import { isFirebaseConfigured } from "@/lib/firebase";
import { signOut as firebaseSignOut } from "@/services/authService";
import { BRAND } from "@/lib/carechain";
import {
  loadAccountEmail,
  loadEmergencyContacts,
  saveEmergencyContacts,
  type EmergencyContactsState,
} from "@/lib/profileStorage";
import { ChangePasswordForm } from "./ChangePasswordForm";
import { EmergencyContactCard } from "./EmergencyContactCard";

const NOTIF_STORAGE_KEY = "carechain-notifications-enabled";

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
        checked ? "bg-rose-deep" : "bg-blush"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export function SettingsPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [notificationsOn, setNotificationsOn] = useState(true);
  const [contacts, setContacts] = useState<EmergencyContactsState>(() =>
    loadEmergencyContacts(),
  );
  const [email, setEmail] = useState(() => loadAccountEmail());
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    if (!open) return;
    const stored = window.localStorage.getItem(NOTIF_STORAGE_KEY);
    if (stored !== null) setNotificationsOn(stored === "true");
    setContacts(loadEmergencyContacts());
    setEmail(loadAccountEmail());
    setChangingPassword(false);
  }, [open]);

  function handleNotificationsChange(next: boolean) {
    setNotificationsOn(next);
    window.localStorage.setItem(NOTIF_STORAGE_KEY, String(next));
  }

  function updateFamily(family: EmergencyContactsState["family"]) {
    const next = { ...contacts, family };
    setContacts(next);
    saveEmergencyContacts(next);
  }

  function updateProvider(provider: EmergencyContactsState["provider"]) {
    const next = { ...contacts, provider };
    setContacts(next);
    saveEmergencyContacts(next);
  }

  if (!open) return null;

  return (
    <div
      className="phone-fixed-layer fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal
      aria-labelledby="settings-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-ink/30 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Close settings"
      />
      <aside className="relative flex h-full w-full max-w-full flex-col bg-cream shadow-2xl">
        <div className="flex items-center justify-between border-b border-blush/60 px-5 py-4">
          <h2 id="settings-title" className="font-display text-ink text-lg font-semibold">
            Settings
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-muted hover:text-ink rounded-full px-2 py-1 text-sm font-medium"
          >
            Done
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          <section className="border-blush/70 border-b pb-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-ink text-sm font-semibold">Notifications</p>
                <p className="text-muted mt-1 text-xs leading-relaxed">
                  Allow notifications from {BRAND.name} for vitals alerts, care
                  reminders, and report updates.
                </p>
              </div>
              <Toggle
                checked={notificationsOn}
                onChange={handleNotificationsChange}
                label="App notifications"
              />
            </div>
            <p className="text-muted mt-3 text-[11px]">
              {notificationsOn
                ? "You will receive push and in-app alerts."
                : "Notifications are off. You may miss time-sensitive vitals alerts."}
            </p>
          </section>

          <section className="border-blush/70 border-b py-5">
            <h3 className="text-ink text-sm font-semibold">Emergency contacts</h3>
            <p className="text-muted mt-1 mb-4 text-xs">
              People and providers we can reach if your readings need urgent follow-up.
            </p>

            <div className="space-y-4">
              <EmergencyContactCard
                kind="family"
                contact={contacts.family}
                onSave={updateFamily}
              />
              <EmergencyContactCard
                kind="provider"
                contact={contacts.provider}
                onSave={updateProvider}
              />
            </div>
          </section>

          <section className="py-5">
            <h3 className="text-ink text-sm font-semibold">Email & password</h3>
            <div className="mt-3 rounded-xl border border-blush/80 bg-white p-4">
              <p className="text-muted text-[10px] font-semibold tracking-[0.12em] uppercase">
                Email
              </p>
              <p className="text-ink mt-1 text-sm">{email}</p>

              {!changingPassword ? (
                <button
                  type="button"
                  onClick={() => setChangingPassword(true)}
                  className="text-rose-deep mt-4 text-sm font-medium"
                >
                  Change password
                </button>
              ) : (
                <ChangePasswordForm onDone={() => setChangingPassword(false)} />
              )}
            </div>
          </section>

          <section className="border-t border-blush/60 py-5">
            <button
              type="button"
              onClick={async () => {
                try {
                  if (isFirebaseConfigured) {
                    await firebaseSignOut();
                  }
                } catch {
                  /* still clear local session */
                }
                clearAuthenticated();
                onClose();
                router.replace("/welcome");
              }}
              className="text-alert w-full rounded-xl border border-alert/30 bg-alert-bg py-3 text-sm font-semibold"
            >
              Sign out
            </button>
          </section>
        </div>
      </aside>
    </div>
  );
}
