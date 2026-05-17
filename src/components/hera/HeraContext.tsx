"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type HeraContextValue = {
  open: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
};

const HeraContext = createContext<HeraContextValue | null>(null);

export function HeraProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const openChat = useCallback(() => setOpen(true), []);
  const closeChat = useCallback(() => setOpen(false), []);
  const toggleChat = useCallback(() => setOpen((v) => !v), []);

  const value = useMemo(
    () => ({ open, openChat, closeChat, toggleChat }),
    [open, openChat, closeChat, toggleChat],
  );

  return (
    <HeraContext.Provider value={value}>{children}</HeraContext.Provider>
  );
}

export function useHera() {
  const ctx = useContext(HeraContext);
  if (!ctx) {
    throw new Error("useHera must be used within HeraProvider");
  }
  return ctx;
}

export function useHeraOptional() {
  return useContext(HeraContext);
}
