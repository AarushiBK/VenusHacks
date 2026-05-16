import type { ReactNode } from "react";

interface MobileShellProps {
  children: ReactNode;
  className?: string;
}

export function MobileShell({ children, className = "" }: MobileShellProps) {
  return (
    <div className="min-h-dvh bg-cream-dark">
      <div
        className={`relative mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-cream shadow-[0_0_60px_rgba(123,45,78,0.08)] ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
