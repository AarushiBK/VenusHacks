import type { ComponentPropsWithoutRef } from "react";

/** Main content area with standard 16px horizontal inset on every screen. */
export function Screen({ className = "", ...props }: ComponentPropsWithoutRef<"main">) {
  return <main className={`px-4 pb-8 ${className}`.trim()} {...props} />;
}
