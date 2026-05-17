"use client";

import { useEffect, useMemo, useState } from "react";
import { EMERGENCY_CONTACTS, REPORT_OPTIONS } from "@/lib/profile";

type Step = "select" | "confirm" | "sent";

export function SendReportPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const defaultSelected = useMemo(
    () => new Set(REPORT_OPTIONS.filter((o) => o.group === "data").map((o) => o.id)),
    [],
  );
  const [step, setStep] = useState<Step>("select");
  const [selected, setSelected] = useState<Set<string>>(defaultSelected);
  const [recipientName, setRecipientName] = useState(
    EMERGENCY_CONTACTS.provider.name,
  );
  const [recipientClinic, setRecipientClinic] = useState(
    EMERGENCY_CONTACTS.provider.clinic,
  );
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!open) return;
    setStep("select");
    setSelected(new Set(REPORT_OPTIONS.filter((o) => o.group === "data").map((o) => o.id)));
    setRecipientName(EMERGENCY_CONTACTS.provider.name);
    setRecipientClinic(EMERGENCY_CONTACTS.provider.clinic);
    setNote("");
  }, [open]);

  if (!open) return null;

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleConfirmSend() {
    setStep("sent");
  }

  const dataOptions = REPORT_OPTIONS.filter((o) => o.group === "data");
  const symptomOptions = REPORT_OPTIONS.filter((o) => o.group === "symptoms");
  const selectedLabels = REPORT_OPTIONS.filter((o) => selected.has(o.id)).map(
    (o) => o.label,
  );

  const inputClass =
    "text-ink mt-1 w-full rounded-lg border border-blush bg-cream px-3 py-2 text-sm outline-none focus:border-rose/60 focus:ring-2 focus:ring-rose/15";

  return (
    <div
      className="phone-fixed-layer fixed inset-0 z-50 flex items-end justify-center"
      role="dialog"
      aria-modal
      aria-labelledby="send-report-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-ink/35 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Close send report"
      />
      <div className="relative max-h-[90vh] w-full overflow-y-auto rounded-t-3xl bg-white px-5 pt-5 pb-8 shadow-2xl">
        {step === "select" && (
          <>
            <h2 id="send-report-title" className="font-display text-ink text-lg font-semibold">
              Send report
            </h2>
            <p className="text-muted mt-1 text-sm leading-relaxed">
              Choose which data and symptoms to include.
            </p>

            <fieldset className="mt-5">
              <legend className="text-muted mb-2 text-[11px] font-semibold tracking-wide uppercase">
                Vitals & data
              </legend>
              <ul className="space-y-2">
                {dataOptions.map((opt) => (
                  <li key={opt.id}>
                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-blush/70 px-3 py-2.5">
                      <input
                        type="checkbox"
                        checked={selected.has(opt.id)}
                        onChange={() => toggle(opt.id)}
                        className="accent-rose-deep h-4 w-4 rounded"
                      />
                      <span className="text-ink text-sm">{opt.label}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </fieldset>

            <fieldset className="mt-4">
              <legend className="text-muted mb-2 text-[11px] font-semibold tracking-wide uppercase">
                Symptoms
              </legend>
              <ul className="space-y-2">
                {symptomOptions.map((opt) => (
                  <li key={opt.id}>
                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-blush/70 px-3 py-2.5">
                      <input
                        type="checkbox"
                        checked={selected.has(opt.id)}
                        onChange={() => toggle(opt.id)}
                        className="accent-rose-deep h-4 w-4 rounded"
                      />
                      <span className="text-ink text-sm">{opt.label}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </fieldset>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="text-muted flex-1 rounded-xl border border-blush py-3 text-sm font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setStep("confirm")}
                disabled={selected.size === 0}
                className="bg-rose-deep flex-1 rounded-xl py-3 text-sm font-semibold text-white disabled:opacity-40"
              >
                Continue
              </button>
            </div>
          </>
        )}

        {step === "confirm" && (
          <>
            <h2 className="font-display text-ink text-lg font-semibold">
              Confirm recipient
            </h2>
            <p className="text-muted mt-1 text-sm leading-relaxed">
              Review who receives this report. You can edit details before sending.
            </p>

            <div className="mt-5 space-y-4 rounded-xl border border-blush/80 bg-cream/40 p-4">
              <label className="block">
                <span className="text-muted text-[10px] font-semibold tracking-[0.12em] uppercase">
                  Provider name
                </span>
                <input
                  className={inputClass}
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                />
              </label>
              <label className="block">
                <span className="text-muted text-[10px] font-semibold tracking-[0.12em] uppercase">
                  Clinic / practice
                </span>
                <input
                  className={inputClass}
                  value={recipientClinic}
                  onChange={(e) => setRecipientClinic(e.target.value)}
                />
              </label>
              <label className="block">
                <span className="text-muted text-[10px] font-semibold tracking-[0.12em] uppercase">
                  Note (optional)
                </span>
                <textarea
                  className={`${inputClass} min-h-[4.5rem] resize-none`}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add context for your care team…"
                />
              </label>
            </div>

            <div className="mt-4 rounded-xl border border-blush/70 bg-white p-3">
              <p className="text-muted text-[10px] font-semibold tracking-[0.12em] uppercase">
                Included in report
              </p>
              <ul className="text-ink mt-2 space-y-1 text-sm">
                {selectedLabels.map((label) => (
                  <li key={label}>· {label}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setStep("select")}
                className="text-muted flex-1 rounded-xl border border-blush py-3 text-sm font-medium"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleConfirmSend}
                disabled={!recipientName.trim()}
                className="bg-rose-deep flex-1 rounded-xl py-3 text-sm font-semibold text-white disabled:opacity-40"
              >
                Confirm send
              </button>
            </div>
          </>
        )}

        {step === "sent" && (
          <>
            <h2 className="font-display text-ink text-lg font-semibold">
              Report sent
            </h2>
            <p className="text-sage mt-6 text-center text-sm leading-relaxed">
              Your report was sent to{" "}
              <span className="font-semibold">{recipientName.trim()}</span>
              {recipientClinic.trim() ? ` · ${recipientClinic.trim()}` : ""}.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="bg-rose-deep mt-8 w-full rounded-xl py-3 text-sm font-semibold text-white"
            >
              Done
            </button>
          </>
        )}
      </div>
    </div>
  );
}
