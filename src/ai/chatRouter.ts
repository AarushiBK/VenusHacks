import type { AssistantResponse, ChatMessage } from "./types";
import { buildNavigationResponse, toNavigateAction } from "./navigationIntent";
import { runAppAction } from "./pipeline/appActionHandler";
import { runSafetyTriage } from "./pipeline/safetyTriageHandler";
import { runCompanionPipeline } from "./pipeline/companionPipeline";
import { classifyChatMode } from "./intent/modeClassifier";
import { logIntentRoute } from "./intent/logging";

/** Server-side chat routing (no AsyncStorage). */
export async function routeChatMessage(
  userMessage: string,
  history: ChatMessage[] = []
): Promise<AssistantResponse> {
  const { mode, classification, reason } = classifyChatMode(userMessage);

  switch (mode) {
    case "SAFETY_TRIAGE": {
      const { response } = runSafetyTriage(userMessage, classification);
      logIntentRoute({
        intent: mode,
        route: "safetyTriageHandler",
        reason,
        ragUsed: false,
        chunkCount: 0,
        geminiCalled: false,
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
        actions: [toNavigateAction(screen)],
        voiceTone: "warm",
      };
    }

    case "APP_ACTION": {
      const { response } = runAppAction(userMessage);
      logIntentRoute({
        intent: mode,
        route: "appActionHandler",
        reason,
        ragUsed: false,
        chunkCount: 0,
        geminiCalled: false,
      });
      return response;
    }

    default: {
      const companion = await runCompanionPipeline(
        userMessage,
        { mode, classification, reason },
        history
      );
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
