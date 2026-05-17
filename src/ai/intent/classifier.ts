import { classifyChatMode } from "./modeClassifier";
import type { IntentClassification } from "./types";

/** @deprecated Use classifyChatMode for routing. Returns intent details only. */
export async function classifyIntent(message: string): Promise<IntentClassification> {
  return classifyChatMode(message).classification;
}
