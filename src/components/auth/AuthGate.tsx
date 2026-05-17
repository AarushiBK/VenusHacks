"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { isAuthenticated } from "@/lib/authSession";
const PUBLIC_PATHS = ["/welcome", "/login", "/signup"];

export function AuthGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, firebaseEnabled } = useAuth();

  const isPublic = PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );

  useEffect(() => {
    if (loading && firebaseEnabled) return;

    if (firebaseEnabled) {
      if (!user && !isPublic) {
        router.replace("/welcome");
      }
      if (user && isPublic) {
        router.replace("/");
      }
      return;
    }

    if (!isAuthenticated() && !isPublic) {
      router.replace("/welcome");
    }
    if (isAuthenticated() && isPublic) {
      router.replace("/");
    }
  }, [user, loading, firebaseEnabled, isPublic, pathname, router]);

  if (firebaseEnabled && loading) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-cream">
        <p className="text-muted text-sm">Loading…</p>
      </div>
    );
  }

  return <>{children}</>;
}
