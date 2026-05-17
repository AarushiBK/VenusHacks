"use client";

import { SymptomsShell } from "@/components/symptoms/SymptomsShell";
import { SymptomLogDraftProvider } from "@/context/SymptomLogDraftContext";

export default function SymptomsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SymptomLogDraftProvider>
      <SymptomsShell>{children}</SymptomsShell>
    </SymptomLogDraftProvider>
  );
}
