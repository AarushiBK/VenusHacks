"use client";

import Link from "next/link";
import type { Citation, NavigateAction, ResponseType } from "@/ai/types";

export function ChatBubble({
  role,
  content,
  type,
  citations = [],
  actions = [],
  isStreaming,
}: {
  role: "user" | "assistant";
  content: string;
  type?: ResponseType;
  citations?: Citation[];
  actions?: NavigateAction[];
  isStreaming?: boolean;
}) {
  const isUser = role === "user";
  const isEmergency = type === "emergency" || type === "triage";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[88%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed ${
          isUser
            ? "bg-rose-deep text-white"
            : isEmergency
              ? "border border-red-200 bg-red-50 text-red-950"
              : "border border-blush/80 bg-white text-ink shadow-sm"
        }`}
      >
        {!isUser && (
          <p className="text-rose-deep mb-1 text-[11px] font-bold tracking-wide uppercase">
            Hera
          </p>
        )}
        <p className="whitespace-pre-wrap">
          {content}
          {isStreaming && <span className="animate-pulse"> ▍</span>}
        </p>

        {citations.length > 0 && (
          <div className="text-muted mt-2 space-y-0.5 border-t border-blush/50 pt-2 text-[11px]">
            {citations.slice(0, 2).map((c, i) => (
              <p key={i}>
                {c.source}
                {c.title ? ` · ${c.title}` : ""}
              </p>
            ))}
          </div>
        )}

        {actions.map((action, i) =>
          action.type === "navigate" && action.href ? (
            <Link
              key={i}
              href={action.href}
              className={`mt-3 inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                isEmergency
                  ? "bg-red-700 text-white hover:bg-red-800"
                  : "bg-rose-deep text-white hover:bg-rose-deep/90"
              }`}
            >
              Let&apos;s go!
            </Link>
          ) : null
        )}
      </div>
    </div>
  );
}
