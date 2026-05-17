import type { AssistantResponse, ChatMessage } from "./types";
import { buildNavigationResponse } from "./navigationIntent";
import { runSafetyTriage } from "./pipeline/safetyTriageHandler";
import { runCompanionPipeline } from "./pipeline/companionPipeline";
import { classifyChatMode } from "./intent/modeClassifier";
import { logIntentRoute } from "./intent/logging";
import { streamGroundedTokens } from "./aiClient";
import { assistantMemory } from "./assistantMemory";

export interface PipelineOptions {
  userId?: string;
  emotionalSupportMode?: boolean;
  locale?: string;
}

export interface StreamPipelineCallbacks {
  onPartial: (text: string) => void;
  onComplete: (response: AssistantResponse) => void;
  onError: (error: Error) => void;
}

export async function processMessage(
  userMessage: string,
  options: PipelineOptions = {}
): Promise<AssistantResponse> {
  await assistantMemory.load();

  const userMsg: ChatMessage = {
    id: generateId(),
    role: "user",
    content: userMessage,
    timestamp: Date.now(),
  };
  assistantMemory.addMessage(userMsg);

  const response = await routeMessage(userMessage, options);

  const assistantMsg: ChatMessage = {
    id: generateId(),
    role: "assistant",
    content: response.response,
    timestamp: Date.now(),
    type: response.type,
    citations: response.citations,
    actions: response.actions,
  };
  assistantMemory.addMessage(assistantMsg);
  await assistantMemory.save();

  return response;
}

export async function processMessageStreaming(
  userMessage: string,
  callbacks: StreamPipelineCallbacks,
  options: PipelineOptions = {}
): Promise<void> {
  try {
    const response = await routeMessage(userMessage, options);

    let accumulated = "";
    await streamGroundedTokens(response.response, {
      onToken: (token) => {
        accumulated += token;
        callbacks.onPartial(accumulated);
      },
      onComplete: () => callbacks.onComplete(response),
      onError: callbacks.onError,
    });
  } catch (e) {
    callbacks.onError(e instanceof Error ? e : new Error(String(e)));
  }
}

async function routeMessage(
  userMessage: string,
  _options: PipelineOptions
): Promise<AssistantResponse> {
  const { mode, classification, reason } = classifyChatMode(userMessage);

  switch (mode) {
    case "SAFETY_TRIAGE": {
      const { response, geminiCalled } = runSafetyTriage(userMessage, classification);
      logIntentRoute({
        intent: mode,
        route: "safetyTriageHandler",
        reason,
        ragUsed: false,
        chunkCount: 0,
        geminiCalled,
      });
      return response;
    }

    case "NAVIGATION": {
      const screen = classification.navigationScreen ?? "Home";
      logIntentRoute({
        intent: mode,
        route: `navigate:${screen}`,
        reason,
        ragUsed: false,
        chunkCount: 0,
        geminiCalled: false,
      });
      return {
        response: buildNavigationResponse(screen),
        type: "navigation",
        citations: [],
        actions: [{ type: "navigate", screen }],
        voiceTone: "warm",
      };
    }

    default: {
      const companion = await runCompanionPipeline(userMessage, {
        mode,
        classification,
        reason,
      });
      logIntentRoute({
        intent: mode,
        route: "companionPipeline",
        reason,
        ragUsed: companion.ragUsed,
        chunkCount: companion.chunkCount,
        geminiCalled: companion.geminiCalled,
      });
      return companion.response;
    }
  }
}

function generateId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export { assistantMemory };
