"use client";

import { usePathname } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";

export function SymptomsShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const inJourney = pathname.includes("/symptoms/log");

  if (inJourney) {
    return (
      <div className="flex min-h-dvh w-full flex-col overflow-hidden bg-cream">
        {children}
      </div>
    );
  }

  return (
    <PageShell active="symptoms" showHeader={false}>
      {children}
    </PageShell>
  );
}
