"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchScanSummary, type ScanSummary } from "@/lib/demo/wellnessAssessment";
import {
  buildHealthReportOptions,
  buildReportDocument,
  buildReportPreviewLines,
  defaultSelectedReportIds,
  type HealthReportOption,
} from "@/lib/healthReport";
import { loadEmergencyContacts } from "@/lib/profileStorage";

type Step = "select" | "confirm" | "sent";

function ReportOptionRow({
  opt,
  checked,
  onToggle,
}: {
  opt: HealthReportOption;
  checked: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <li>
      <label
        className={`flex cursor-pointer items-start gap-3 rounded-xl border border-blush/70 px-3 py-2.5 transition-colors ${
          opt.disabled ? "cursor-not-allowed opacity-55" : "hover:border-rose/40"
        }`}
      >
        <input
          type="checkbox"
          checked={checked}
          disabled={opt.disabled}
          onChange={() => onToggle(opt.id)}
          className="accent-rose-deep mt-0.5 h-4 w-4 shrink-0 rounded"
        />
        <span className="min-w-0 flex-1">
          <span className="text-ink block text-sm">{opt.label}</span>
          {opt.detail ? (
            <span className="text-muted mt-0.5 block text-xs leading-snug">
              {opt.detail}
            </span>
          ) : null}
        </span>
      </label>
    </li>
  );
}

export function SendReportPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState<Step>("select");
  const [options, setOptions] = useState<HealthReportOption[]>([]);
  const [scan, setScan] = useState<ScanSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [recipientName, setRecipientName] = useState("");
  const [recipientClinic, setRecipientClinic] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [note, setNote] = useState("");

  const selectableOptions = useMemo(
    () => options.filter((o) => !o.disabled),
    [options],
  );

  const metricsOptions = useMemo(
    () => options.filter((o) => o.group === "metrics"),
    [options],
  );
  const symptomOptions = useMemo(
    () => options.filter((o) => o.group === "symptoms"),
    [options],
  );

  const refreshOptions = useCallback(async () => {
    setLoading(true);
    const scanSummary = await fetchScanSummary();
    setScan(scanSummary);
    const built = buildHealthReportOptions(scanSummary);
    setOptions(built);
    setSelected(defaultSelectedReportIds(built));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const contacts = loadEmergencyContacts();
    setStep("select");
    setRecipientName(contacts.provider.name);
    setRecipientClinic(contacts.provider.clinic);
    setRecipientPhone(contacts.provider.phone);
    setNote("");
    void refreshOptions();
  }, [open, refreshOptions]);

  const previewLines = useMemo(
    () => buildReportPreviewLines(selected, scan),
    [selected, scan],
  );

  if (!open) return null;

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function selectAll() {
    setSelected(new Set(selectableOptions.map((o) => o.id)));
  }

  function clearAll() {
    setSelected(new Set());
  }

  const allSelected =
    selectableOptions.length > 0 &&
    selectableOptions.every((o) => selected.has(o.id));

  function handleConfirmSend() {
    const doc = buildReportDocument({
      selectedIds: selected,
      scan,
      note,
      recipientName: recipientName.trim(),
      recipientClinic: recipientClinic.trim(),
      recipientPhone: recipientPhone.trim(),
    });
    if (typeof window !== "undefined") {
      console.info("[VitaCor demo] Care report prepared for provider:\n", doc);
    }
    setStep("sent");
  }

  const inputClass =
    "text-ink mt-1 w-full rounded-lg border border-blush bg-cream px-3 py-2 text-sm outline-none focus:border-rose/60 focus:ring-2 focus:ring-rose/15";

  return (
    <ReportOverlay onClose={onClose}>
      <div className="relative max-h-[90vh] w-full overflow-y-auto rounded-t-3xl bg-white px-5 pt-5 pb-8 shadow-2xl">
        {step === "select" && (
          <>
            <h2
              id="send-report-title"
              className="font-display text-ink text-lg font-semibold"
            >
              Send report
            </h2>
            <p className="text-muted mt-1 text-sm leading-relaxed">
              Pulls live data from{" "}
              <span className="text-ink font-medium">Metrics</span> and logged
              symptoms from the{" "}
              <span className="text-ink font-medium">Symptoms</span> tab to your
              primary health provider.
            </p>

            {loading ? (
              <p className="text-muted mt-6 animate-pulse text-center text-sm">
                Loading your latest metrics…
              </p>
            ) : (
              <>
                <div className="mt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={clearAll}
                    className="text-muted text-xs font-medium underline-offset-2 hover:underline"
                  >
                    Clear all
                  </button>
                  <button
                    type="button"
                    onClick={selectAll}
                    className="text-rose-deep text-xs font-semibold underline-offset-2 hover:underline"
                  >
                    {allSelected ? "All selected" : "Select all"}
                  </button>
                </div>

                <fieldset className="mt-4">
                  <legend className="text-muted mb-2 text-[11px] font-semibold tracking-wide uppercase">
                    Metrics tab
                  </legend>
                  <ul className="space-y-2">
                    {metricsOptions.map((opt) => (
                      <ReportOptionRow
                        key={opt.id}
                        opt={opt}
                        checked={selected.has(opt.id)}
                        onToggle={toggle}
                      />
                    ))}
                  </ul>
                </fieldset>

                <fieldset className="mt-4">
                  <legend className="text-muted mb-2 text-[11px] font-semibold tracking-wide uppercase">
                    Symptoms tab
                  </legend>
                  <ul className="space-y-2">
                    {symptomOptions.map((opt) => (
                      <ReportOptionRow
                        key={opt.id}
                        opt={opt}
                        checked={selected.has(opt.id)}
                        onToggle={toggle}
                      />
                    ))}
                  </ul>
                </fieldset>
              </>
            )}

            <ReportActions>
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
                disabled={loading || selected.size === 0}
                className="bg-rose-deep flex-1 rounded-xl py-3 text-sm font-semibold text-white transition-opacity disabled:opacity-40"
              >
                Continue
              </button>
            </ReportActions>
          </>
        )}

        {step === "confirm" && (
          <>
            <h2 className="font-display text-ink text-lg font-semibold">
              Send to primary provider
            </h2>
            <p className="text-muted mt-1 text-sm leading-relaxed">
              Review your care team contact and what will be included.
            </p>

            <div className="mt-5 space-y-4 rounded-xl border border-blush/80 bg-cream/40 p-4">
              <p className="text-muted text-[10px] font-semibold tracking-[0.12em] uppercase">
                Primary health provider
              </p>
              <label className="block">
                <span className="text-muted text-[10px] font-semibold tracking-[0.12em] uppercase">
                  Name
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
                  Phone
                </span>
                <input
                  className={inputClass}
                  type="tel"
                  value={recipientPhone}
                  onChange={(e) => setRecipientPhone(e.target.value)}
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

            <div className="mt-4 max-h-40 overflow-y-auto rounded-xl border border-blush/70 bg-white p-3">
              <p className="text-muted text-[10px] font-semibold tracking-[0.12em] uppercase">
                Report preview
              </p>
              {previewLines.length === 0 ? (
                <p className="text-muted mt-2 text-sm">Nothing selected.</p>
              ) : (
                <ul className="text-ink mt-2 space-y-1 text-xs leading-relaxed">
                  {previewLines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              )}
            </div>

            <ReportActions>
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
                Send to provider
              </button>
            </ReportActions>
          </>
        )}

        {step === "sent" && (
          <>
            <h2 className="font-display text-ink text-lg font-semibold">
              Report sent
            </h2>
            <p className="text-sage mt-4 text-center text-sm leading-relaxed">
              Your report was sent to{" "}
              <span className="text-ink font-semibold">
                {recipientName.trim()}
              </span>
              {recipientClinic.trim() ? (
                <>
                  <br />
                  <span className="text-muted text-xs">
                    {recipientClinic.trim()}
                  </span>
                </>
              ) : null}
              .
            </p>
            <p className="text-muted mt-3 text-center text-xs leading-relaxed">
              Included {selected.size} section
              {selected.size === 1 ? "" : "s"} — metrics, symptoms, and your
              note. Demo mode: nothing leaves this device.
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
    </ReportOverlay>
  );
}

function ReportOverlay({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="phone-overlay-root flex items-end justify-center"
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
      {children}
    </div>
  );
}


function ReportActions({ children }: { children: React.ReactNode }) {
  return <div className="mt-6 flex gap-3">{children}</div>;
}
