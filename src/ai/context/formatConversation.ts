import type { ChatMessage } from "../types";

/** Format prior turns for Gemini (excludes the latest user message if it matches current). */
export function formatConversationHistory(
  messages: ChatMessage[],
  currentUserMessage: string
): string {
  const trimmedCurrent = currentUserMessage.trim();
  let prior = messages;

  const last = messages[messages.length - 1];
  if (
    last?.role === "user" &&
    last.content.trim() === trimmedCurrent
  ) {
    prior = messages.slice(0, -1);
  }

  const recent = prior.slice(-8);
  if (recent.length === 0) {
    return "CONVERSATION HISTORY:\n(none — first message in this session)";
  }

  const lines = recent.map((m) => {
    const who = m.role === "user" ? "User" : "Vena";
    const text = m.content.trim().replace(/\n{3,}/g, "\n\n");
    return `${who}: ${text}`;
  });

  return `CONVERSATION HISTORY:\n${lines.join("\n\n")}`;
}
