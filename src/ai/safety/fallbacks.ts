import { LOW_CONFIDENCE_MESSAGE, SAFETY_DISCLAIMER } from "../ragConfig";

export function safeLowConfidenceResponse(): string {
  return `${LOW_CONFIDENCE_MESSAGE}\n\n${SAFETY_DISCLAIMER}`;
}

export function safeNoContextResponse(): string {
  return `${LOW_CONFIDENCE_MESSAGE}\n\n${SAFETY_DISCLAIMER}`;
}
