export interface ExtractedVitals {
  bloodPressure?: string;
  heartRateBpm?: number;
}

export function extractVitals(message: string): ExtractedVitals {
  const vitals: ExtractedVitals = {};

  const bp = message.match(/\b(\d{2,3})\s*\/\s*(\d{2,3})\b/);
  if (bp) vitals.bloodPressure = `${bp[1]}/${bp[2]}`;

  const bpm =
    message.match(/\b(\d{2,3})\s*bpm\b/i) ??
    message.match(/\b(?:heart\s*rate|pulse)\s*(?:is|was|of|at)?\s*(\d{2,3})\b/i);
  if (bpm) vitals.heartRateBpm = parseInt(bpm[1], 10);

  return vitals;
}
