"use client";

import { PageGreeting } from "@/components/layout/PageGreeting";
import { getDisplayName } from "@/lib/authSession";
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
      name={getDisplayName()}
      detail={patient.detail}
      onOpenSettings={onOpenSettings}
    />
  );
}
