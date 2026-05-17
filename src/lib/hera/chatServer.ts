import { routeChatMessage } from "@/ai/chatRouter";
import type { AssistantResponse, ChatMessage } from "@/ai/types";

export interface ChatRequestBody {
  message: string;
  history?: ChatMessage[];
}

export async function processChatRequest(
  body: ChatRequestBody
): Promise<AssistantResponse> {
  const message = body.message?.trim();
  if (!message) {
    throw new Error("Message is required");
  }

  const history = (body.history ?? []).filter(
    (m) => m.role === "user" || m.role === "assistant"
  );

  return routeChatMessage(message, history);
}
