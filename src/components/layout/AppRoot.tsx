"use client";

import { usePathname } from "next/navigation";
import { PhoneAppShell } from "./PhoneAppShell";

const AUTH_PATHS = ["/welcome", "/login", "/signup"];

export function AppRoot({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthFlow = AUTH_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );

  if (isAuthFlow) {
    return <>{children}</>;
  }

  return <PhoneAppShell>{children}</PhoneAppShell>;
}
