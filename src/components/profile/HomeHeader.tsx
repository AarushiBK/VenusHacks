"use client";

import { PageGreeting } from "@/components/layout/PageGreeting";
import type { PatientContext } from "@/types/vitals";

export function HomeHeader({
  patient,
  onOpenSettings,
}: {
  patient: PatientContext;
  onOpenSettings: () => void;
}) {
  return (
    <PageGreeting
      name={patient.name}
      detail={patient.detail}
      onOpenSettings={onOpenSettings}
    />
  );
}
