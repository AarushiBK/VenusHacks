"use client";

import type { NavigateAction } from "@/ai/types";
import { SCREEN_LABELS, screenToPath } from "@/lib/hera/appKnowledge";

export function HeraMessageBubble({
  role,
  content,
  actions,
  onNavigate,
}: {
  role: "user" | "assistant";
  content: string;
  actions?: NavigateAction[];
  onNavigate: (path: string) => void;
}) {
  const isUser = role === "user";

  return (
    <Bubble isUser={isUser}>
      {!isUser && (
        <p className="text-rose-deep mb-1 text-[10px] font-semibold tracking-wide uppercase">
          Hera
        </p>
      )}
      <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
      {!isUser && actions && actions.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {actions.map((action) => {
            if (action.type !== "navigate") return null;
            const path = screenToPath(action.screen);
            const label = SCREEN_LABELS[action.screen];
            return (
              <button
                key={`${action.screen}-${path}`}
                type="button"
                onClick={() => onNavigate(path)}
                className="bg-rose-deep rounded-full px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
              >
                Go to {label}
              </button>
            );
          })}
        </div>
      )}
    </Bubble>
  );
}

function Bubble({
  children,
  isUser,
}: {
  children: React.ReactNode;
  isUser: boolean;
}) {
  return (
    <div
      className={`max-w-[92%] rounded-2xl px-3.5 py-2.5 ${
        isUser
          ? "bg-rose-deep ml-auto text-white"
          : "border-blush/80 text-ink border bg-white"
      }`}
    >
      {children}
    </div>
  );
}
