"use client";

import { HeraChatPanel } from "./HeraChatPanel";
import { HeraFab } from "./HeraFab";
import { HeraProvider } from "./HeraContext";

/** Global Hera chat — floating button on every authenticated screen. */
export function HeraAssistant({ children }: { children: React.ReactNode }) {
  return (
    <HeraProvider>
      {children}
      <HeraFab />
      <HeraChatPanel />
    </HeraProvider>
  );
}
