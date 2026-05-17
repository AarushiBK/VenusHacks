import type { ReactNode } from "react";

interface MobileShellProps {
  children: ReactNode;
  className?: string;
}

export function MobileShell({ children, className = "" }: MobileShellProps) {
  return (
    <div
      className={`relative flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden bg-cream ${className}`}
    >
      {children}
    </div>
  );
}
