import type { IntentRouteLog } from "./types";

export function logIntentRoute(log: IntentRouteLog): void {
  console.log(
    `[Vena Intent] selected=${log.intent} route=${log.route} rag=${log.ragUsed} chunks=${log.chunkCount} gemini=${log.geminiCalled} reason=${log.reason}`
  );
}
