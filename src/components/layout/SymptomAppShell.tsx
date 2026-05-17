import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { MobileShell } from "./MobileShell";
import { BottomNav } from "./BottomNav";

interface SymptomAppShellProps {
  children: ReactNode;
}

export function SymptomAppShell({ children }: SymptomAppShellProps) {
  const { pathname } = useLocation();
  const inJourney = pathname.includes("/symptoms/log");

  return (
    <MobileShell
      className={inJourney ? "overflow-hidden !bg-transparent" : "overflow-hidden"}
    >
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div
          className={[
            "flex min-h-0 flex-1 flex-col",
            inJourney ? "overflow-hidden" : "overflow-y-auto",
          ].join(" ")}
        >
          {children}
        </div>
        <BottomNav />
      </div>
    </MobileShell>
  );
}
