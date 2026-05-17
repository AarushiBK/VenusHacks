"use client";

import { useEffect, useState } from "react";

const inputClass =
  "text-ink mt-1 w-full rounded-lg border border-blush bg-cream px-3 py-2 text-sm outline-none focus:border-rose/60 focus:ring-2 focus:ring-rose/15";

type FamilyFields = { name: string; relation: string; phone: string };
type ProviderFields = { name: string; clinic: string; phone: string };

type EmergencyContactCardProps =
  | {
      kind: "family";
      contact: FamilyFields;
      onSave: (contact: FamilyFields) => void;
    }
  | {
      kind: "provider";
      contact: ProviderFields;
      onSave: (contact: ProviderFields) => void;
    };

export function EmergencyContactCard(props: EmergencyContactCardProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(props.contact);

  useEffect(() => {
    if (!editing) setDraft(props.contact);
  }, [props.contact, editing]);

  const title = props.kind === "family" ? "Family" : "Primary health provider";

  function startEdit() {
    setDraft(props.contact);
    setEditing(true);
  }

  function cancel() {
    setDraft(props.contact);
    setEditing(false);
  }

  function save() {
    if (props.kind === "family") {
      const c = draft as FamilyFields;
      if (!c.name.trim() || !c.phone.trim()) return;
      props.onSave({
        name: c.name.trim(),
        relation: c.relation.trim(),
        phone: c.phone.trim(),
      });
    } else {
      const c = draft as ProviderFields;
      if (!c.name.trim() || !c.phone.trim()) return;
      props.onSave({
        name: c.name.trim(),
        clinic: c.clinic.trim(),
        phone: c.phone.trim(),
      });
    }
    setEditing(false);
  }

  return (
    <div className="rounded-xl border border-blush/80 bg-white p-4">
      <div className="flex items-start justify-between gap-2">
        <p className="text-muted text-[10px] font-semibold tracking-[0.12em] uppercase">
          {title}
        </p>
        {!editing ? (
          <button
            type="button"
            onClick={startEdit}
            className="text-rose-deep text-xs font-semibold"
          >
            Edit
          </button>
        ) : null}
      </div>

      {!editing ? (
        <div className="mt-2">
          <p className="text-ink text-sm font-medium">{props.contact.name}</p>
          {"relation" in props.contact ? (
            <p className="text-muted text-xs">{props.contact.relation}</p>
          ) : (
            <p className="text-muted text-xs">{props.contact.clinic}</p>
          )}
          <a
            href={`tel:${props.contact.phone.replace(/\D/g, "")}`}
            className="text-rose-deep mt-2 inline-block text-sm font-medium"
          >
            {props.contact.phone}
          </a>
        </div>
      ) : props.kind === "family" ? (
        <div className="mt-3 space-y-3">
          <label className="block">
            <span className="text-muted text-[10px] font-medium uppercase">Name</span>
            <input
              className={inputClass}
              value={(draft as FamilyFields).name}
              onChange={(e) =>
                setDraft({ ...(draft as FamilyFields), name: e.target.value })
              }
            />
          </label>
          <label className="block">
            <span className="text-muted text-[10px] font-medium uppercase">Relationship</span>
            <input
              className={inputClass}
              value={(draft as FamilyFields).relation}
              onChange={(e) =>
                setDraft({ ...(draft as FamilyFields), relation: e.target.value })
              }
            />
          </label>
          <label className="block">
            <span className="text-muted text-[10px] font-medium uppercase">Phone</span>
            <input
              className={inputClass}
              type="tel"
              value={(draft as FamilyFields).phone}
              onChange={(e) =>
                setDraft({ ...(draft as FamilyFields), phone: e.target.value })
              }
            />
          </label>
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={cancel}
              className="text-muted flex-1 rounded-lg border border-blush py-2 text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={save}
              className="bg-rose-deep flex-1 rounded-lg py-2 text-sm font-semibold text-white"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-3 space-y-3">
          <label className="block">
            <span className="text-muted text-[10px] font-medium uppercase">Name</span>
            <input
              className={inputClass}
              value={(draft as ProviderFields).name}
              onChange={(e) =>
                setDraft({ ...(draft as ProviderFields), name: e.target.value })
              }
            />
          </label>
          <label className="block">
            <span className="text-muted text-[10px] font-medium uppercase">Clinic</span>
            <input
              className={inputClass}
              value={(draft as ProviderFields).clinic}
              onChange={(e) =>
                setDraft({ ...(draft as ProviderFields), clinic: e.target.value })
              }
            />
          </label>
          <label className="block">
            <span className="text-muted text-[10px] font-medium uppercase">Phone</span>
            <input
              className={inputClass}
              type="tel"
              value={(draft as ProviderFields).phone}
              onChange={(e) =>
                setDraft({ ...(draft as ProviderFields), phone: e.target.value })
              }
            />
          </label>
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={cancel}
              className="text-muted flex-1 rounded-lg border border-blush py-2 text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={save}
              className="bg-rose-deep flex-1 rounded-lg py-2 text-sm font-semibold text-white"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
