import type { PatientContext } from "@/types/vitals";

export function VitalsHeader({ patient }: { patient: PatientContext }) {
  const phaseLabel = patient.phase === "pregnant" ? "Pregnant" : "Postpartum";

  return (
    <header className="flex flex-col gap-4">
      <div className="flex justify-end">
        <span className="rounded-full bg-sage-light px-3 py-1 text-xs font-medium text-sage">
          {phaseLabel}
        </span>
      </div>
      <div>
        <h1 className="font-display text-ink text-3xl font-semibold tracking-tight">
          Hi, {patient.name}
        </h1>
        <p className="text-muted mt-1 text-base">{patient.detail}</p>
      </div>
    </header>
  );
}
