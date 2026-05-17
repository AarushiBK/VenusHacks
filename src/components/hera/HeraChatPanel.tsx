"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { processMessage } from "@/ai/assistantPipeline";
import type { ChatMessage } from "@/ai/types";
import { HeraIcon } from "./HeraIcon";
import { HeraMessageBubble } from "./HeraMessageBubble";
import { useHera } from "./HeraContext";

const WELCOME: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi, I'm Hera — your heart and pregnancy wellness companion. Ask me about symptoms, BP, or say \"take me to Passport\" or \"open face scan.\"",
  timestamp: Date.now(),
};

export function HeraChatPanel() {
  const router = useRouter();
  const { open, closeChat } = useHera();
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, open, loading]);

  const handleNavigate = useCallback(
    (path: string) => {
      closeChat();
      router.push(path);
    },
    [closeChat, router],
  );

  const sendMessage = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      role: "user",
      content: trimmed,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await processMessage(trimmed);
      setMessages((prev) => [
        ...prev,
        {
          id: `a_${Date.now()}`,
          role: "assistant",
          content: response.response,
          timestamp: Date.now(),
          type: response.type,
          citations: response.citations,
          actions: response.actions,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          role: "assistant",
          content:
            "Something went wrong. Please try again, or use the app tabs if you need to log symptoms or run a scan.",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading]);

  if (!open) return null;

  return (
    <ChatOverlay onClose={closeChat}>
      <div className="relative flex max-h-[85vh] w-full flex-col rounded-t-3xl bg-white shadow-2xl">
        <header className="border-blush/70 flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="bg-blush/60 text-rose-deep flex h-9 w-9 items-center justify-center rounded-full">
              <HeraIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-ink text-base font-semibold">
                Hera
              </p>
              <p className="text-muted text-[11px]">
                Heart & pregnancy companion
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeChat}
            className="text-muted hover:text-ink flex h-9 w-9 items-center justify-center rounded-full"
            aria-label="Close Hera"
          >
            ✕
          </button>
        </header>

        <div
          ref={scrollRef}
          className="flex min-h-[200px] flex-1 flex-col gap-3 overflow-y-auto px-3 py-3"
        >
          {messages.map((msg) => (
            <HeraMessageBubble
              key={msg.id}
              role={msg.role}
              content={msg.content}
              actions={msg.actions}
              onNavigate={handleNavigate}
            />
          ))}
          {loading && (
            <p className="text-muted animate-pulse text-center text-xs">
              Hera is thinking…
            </p>
          )}
        </div>

        <form
          className="border-blush/70 flex gap-2 border-t px-3 py-3"
          onSubmit={(e) => {
            e.preventDefault();
            void sendMessage();
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Hera…"
            disabled={loading}
            className="text-ink border-blush focus:border-rose/60 focus:ring-rose/15 min-w-0 flex-1 rounded-xl border bg-cream px-3 py-2.5 text-sm outline-none focus:ring-2"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-rose-deep shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-40"
          >
            Send
          </button>
        </form>
      </div>
    </ChatOverlay>
  );
}

function ChatOverlay({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="phone-overlay-root flex items-end justify-center"
      role="dialog"
      aria-modal
      aria-label="Hera chat"
    >
      <button
        type="button"
        className="absolute inset-0 bg-ink/35 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Close chat"
      />
      {children}
    </div>
  );
}
