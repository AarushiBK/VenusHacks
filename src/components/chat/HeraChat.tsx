"use client";

import { useCallback, useRef, useState } from "react";
import { ChatBubble } from "./ChatBubble";
import type { AssistantResponse, ChatMessage } from "@/ai/types";

const WELCOME: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi, I'm Hera — your companion for heart and pregnancy wellness in VitaCor. Ask me anything, or say things like \"show my metrics\" or \"log my symptoms.\"",
  timestamp: Date.now(),
};

export function HeraChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const scrollToEnd = useCallback(() => {
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth",
      });
    });
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      const userMsg: ChatMessage = {
        id: `u_${Date.now()}`,
        role: "user",
        content: trimmed,
        timestamp: Date.now(),
      };

      const history = [...messages, userMsg];
      setMessages(history);
      setInput("");
      setLoading(true);

      const streamId = `a_${Date.now()}`;
      setMessages((prev) => [
        ...prev,
        {
          id: streamId,
          role: "assistant",
          content: "",
          timestamp: Date.now(),
        },
      ]);
      scrollToEnd();

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: trimmed,
            history: history.filter((m) => m.id !== "welcome"),
          }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(
            (err as { error?: string }).error ?? "Could not reach Hera"
          );
        }

        const data = (await res.json()) as AssistantResponse;

        setMessages((prev) =>
          prev.map((m) =>
            m.id === streamId
              ? {
                  ...m,
                  content: data.response,
                  type: data.type,
                  citations: data.citations,
                  actions: data.actions,
                }
              : m
          )
        );
      } catch (e) {
        const msg =
          e instanceof Error ? e.message : "Something went wrong. Try again.";
        setMessages((prev) =>
          prev.map((m) =>
            m.id === streamId
              ? {
                  ...m,
                  content: msg,
                  type: "conversational",
                }
              : m
          )
        );
      } finally {
        setLoading(false);
        scrollToEnd();
      }
    },
    [loading, messages, scrollToEnd]
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div
        ref={listRef}
        className="min-h-0 flex-1 space-y-1 overflow-y-auto overscroll-contain py-3"
      >
        {messages.map((m) => (
          <ChatBubble
            key={m.id}
            role={m.role}
            content={m.content}
            type={m.type}
            citations={m.citations}
            actions={m.actions}
            isStreaming={loading && m.id.startsWith("a_") && !m.content}
          />
        ))}
        {loading && messages[messages.length - 1]?.content === "" && (
          <div className="text-muted px-4 py-2 text-sm">
            Hera is thinking…
          </div>
        )}
      </div>

      <form
        className="border-t border-blush/60 bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
        onSubmit={(e) => {
          e.preventDefault();
          void sendMessage(input);
        }}
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Hera anything…"
            disabled={loading}
            maxLength={2000}
            className="border-blush/80 text-ink placeholder:text-muted focus:border-rose/50 focus:ring-rose/20 min-h-[44px] flex-1 rounded-full border bg-white px-4 text-[15px] outline-none focus:ring-2 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="bg-rose-deep hover:bg-rose-deep/90 min-h-[44px] shrink-0 rounded-full px-5 text-sm font-semibold text-white transition disabled:opacity-40"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
