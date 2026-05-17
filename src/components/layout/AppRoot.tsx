"use client";

import { usePathname } from "next/navigation";
import { AuthGate } from "@/components/auth/AuthGate";
import { AuthProvider } from "@/context/AuthContext";
import { PhoneAppShell } from "./PhoneAppShell";

const AUTH_PATHS = ["/welcome", "/login", "/signup"];

export function AppRoot({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthFlow = AUTH_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );

  return (
    <AuthProvider>
      <AuthGate>
        {isAuthFlow ? (
          <>{children}</>
        ) : (
          <PhoneAppShell>{children}</PhoneAppShell>
        )}
      </AuthGate>
    </AuthProvider>
  );
}
