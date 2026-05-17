import { GROUNDED_SYSTEM_PROMPT } from "./ragConfig";
import {
  completeGeminiText,
  GEMINI_FAILURE_MARKER,
  isGeminiFailureResponse,
} from "./gemini/client";

export interface StreamCallbacks {
  onToken: (token: string) => void;
  onComplete: (fullText: string) => void;
  onError: (error: Error) => void;
}

export interface ChatCompletionOptions {
  systemPrompt: string;
  messages: { role: "user" | "assistant" | "system"; content: string }[];
  maxTokens?: number;
  temperature?: number;
}

/** @deprecated Use synthesis/answerSynthesizer via medicalRagPipeline */
export async function completeGroundedChat(
  contextBlock: string,
  userQuestion: string
): Promise<string> {
  const systemPrompt = `${GROUNDED_SYSTEM_PROMPT}

VERIFIED CONTEXT (you may ONLY use these passages):
${contextBlock}`;

  try {
    return await completeGeminiText("legacy_grounded_chat", systemPrompt, userQuestion, 0, 700);
  } catch {
    return GEMINI_FAILURE_MARKER;
  }
}

export { GEMINI_FAILURE_MARKER, isGeminiFailureResponse };

export async function streamGroundedTokens(
  fullText: string,
  callbacks: StreamCallbacks
): Promise<void> {
  const words = fullText.split(/(\s+)/);
  let accumulated = "";
  for (const word of words) {
    accumulated += word;
    callbacks.onToken(word);
    await delay(25);
  }
  callbacks.onComplete(accumulated);
}

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
