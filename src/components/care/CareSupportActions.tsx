"use client";

import { useCallback, useState } from "react";
import { loadEmergencyContacts } from "@/lib/profileStorage";
import type { WellnessLevel } from "@/lib/demo/wellnessAssessment";

function phoneDigits(phone: string) {
  return phone.replace(/\D/g, "");
}

export function CareSupportActions({
  level,
  compact = false,
}: {
  level: WellnessLevel;
  compact?: boolean;
}) {
  const [toast, setToast] = useState<string | null>(null);
  const contacts = loadEmergencyContacts();
  const showActions = level === "caution" || level === "critical";

  const flash = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 4200);
  }, []);

  if (!showActions && compact) return null;

  function alertSupporter() {
    const body = encodeURIComponent(
      "Hi — Maya's VitaCore app flagged cardiovascular symptoms that may need attention. " +
        "This is an automated supporter alert from a demo health app (not a diagnosis). " +
        "Please check in with her.",
    );
    const sms = `sms:${phoneDigits(contacts.family.phone)}?body=${body}`;
    window.open(sms, "_blank", "noopener,noreferrer");
    flash(`Supporter alert opened for ${contacts.family.name}`);
  }

  function connectProvider() {
    const subject = encodeURIComponent("VitaCore — cardiovascular follow-up requested");
    const body = encodeURIComponent(
      `Hello ${contacts.provider.name},\n\n` +
        "Maya's longitudinal mirror scans and symptom logs suggest elevated cardiovascular load. " +
        "She would like to discuss results at your earliest availability.\n\n" +
        "— Sent via VitaCore (demo)",
    );
    const tel = `tel:${phoneDigits(contacts.provider.phone)}`;
    if (level === "critical") {
      window.open(tel, "_self");
    }
    const mail = `mailto:?subject=${subject}&body=${body}`;
    window.open(mail, "_blank", "noopener,noreferrer");
    flash(`Connecting to ${contacts.provider.name} · ${contacts.provider.clinic}`);
  }

  return (
    <div className={compact ? "mt-3" : ""}>
      {showActions && (
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={alertSupporter}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-rose/25 bg-white px-4 py-3 text-left shadow-sm transition active:scale-[0.99]"
          >
            <span className="text-lg" aria-hidden>
              💬
            </span>
            <span>
              <span className="text-ink block text-sm font-semibold">Alert supporter</span>
              <span className="text-muted block text-[11px]">
                SMS {contacts.family.name} · partner
              </span>
            </span>
          </button>
          <button
            type="button"
            onClick={connectProvider}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-rose-deep px-4 py-3 text-left text-white shadow-md transition active:scale-[0.99]"
          >
            <span className="text-lg" aria-hidden>
              🩺
            </span>
            <span>
              <span className="block text-sm font-semibold">Connect to provider</span>
              <span className="block text-[11px] text-white/85">
                {contacts.provider.name}
              </span>
            </span>
          </button>
        </div>
      )}

      {!showActions && !compact && (
        <p className="text-muted text-[11px] leading-relaxed">
          Supporter alerts and provider outreach appear when vitals or symptoms enter
          elevated ranges.
        </p>
      )}

      {toast && (
        <p
          role="status"
          className="bg-ink/90 text-cream mt-2 rounded-xl px-3 py-2 text-center text-xs"
        >
          {toast}
        </p>
      )}
    </div>
  );
}
