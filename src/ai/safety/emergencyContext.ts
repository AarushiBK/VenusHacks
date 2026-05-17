/**
 * Distinguishes acute emergencies from prevention, hypotheticals, and emotional phrasing.
 */

export function isNonAcuteEmergencyMention(message: string): boolean {
  const lower = message.toLowerCase().trim();

  if (isExplicitlyNotHavingSymptoms(lower)) return true;
  if (isPreventionOrRiskReduction(lower)) return true;
  if (isHypotheticalFutureRisk(lower)) return true;
  if (isEducationalSignsQuestion(lower)) return true;
  if (isEmotionalHeartWorry(lower)) return true;

  return false;
}

function isExplicitlyNotHavingSymptoms(lower: string): boolean {
  if (/\bi'?m\s+not\s+having\b/i.test(lower)) return true;
  if (/\b(not|n't)\s+(having|experiencing)\s+(one|a|an|any)\b/i.test(lower)) return true;
  if (/\bno\s+(chest\s+pain|symptoms?|shortness)\b/i.test(lower)) return true;
  if (/\bdon'?t\s+have\s+(chest\s+pain|symptoms?)\b/i.test(lower)) return true;
  return false;
}

function isPreventionOrRiskReduction(lower: string): boolean {
  const prevention =
    /\b(prevent|prevention|avoid|lower\s+(my\s+)?risk|reduce\s+(my\s+)?risk|how\s+(can|do)\s+i\s+(prevent|avoid|lower)|what\s+(can|should)\s+i\s+do\s+to\s+(prevent|avoid))\b/i;
  const cardio =
    /\b(heart\s*attack|stroke|cardiovascular|heart\s+disease|heart\s+health)\b/i;
  return prevention.test(lower) && cardio.test(lower);
}

function isHypotheticalFutureRisk(lower: string): boolean {
  const hypothetical =
    /\b(will|could|might|may|am\s+i\s+going\s+to)\s+(i\s+)?(get|have|develop|suffer)\b/i;
  const cardioEvent = /\b(heart\s*attacks?|heartattack|stroke|heart\s+disease)\b/i;
  const presentAcute =
    /\b(right\s+now|currently|at\s+the\s+moment|today|this\s+(minute|moment)|hurts?|aching|painful|can'?t\s+breathe)\b/i;

  if (hypothetical.test(lower) && cardioEvent.test(lower) && !presentAcute.test(lower)) {
    return true;
  }

  if (
    /\b(worried|afraid|scared)\s+(about|of|that)\s+(getting|having)\b/i.test(lower) &&
    cardioEvent.test(lower) &&
    !/\b(chest\s+pain|shortness|faint)\b/i.test(lower)
  ) {
    return true;
  }

  return false;
}

function isEducationalSignsQuestion(lower: string): boolean {
  const educational =
    /\b(what\s+are|signs?\s+of|symptoms?\s+of|warning\s+signs?|difference\s+between|how\s+to\s+recognize)\b/i;
  const event = /\b(heart\s*attack|stroke|chest\s+pain)\b/i;
  const personalAcute =
    /\b(i\s+have|i'?m\s+having|my\s+chest|hurts|aching|severe|can'?t\s+breathe)\b/i;

  return educational.test(lower) && event.test(lower) && !personalAcute.test(lower);
}

function isEmotionalHeartWorry(lower: string): boolean {
  const emotional =
    /\b(broke\s+up|breakup|break\s+up|dumped|left\s+me|ex\s+(boy|girl)friend|heartbroken|broken\s+heart)\b/i;
  const heartAttackPhrase =
    /\b(heart\s*attacks?|heartattack|die\s+from\s+a\s+broken)\b/i;
  const physicalAcute =
    /\b(chest\s+pain|shortness\s+of\s+breath|can'?t\s+breathe|left\s+arm|jaw\s+pain|sweating|faint)\b/i;

  return emotional.test(lower) && heartAttackPhrase.test(lower) && !physicalAcute.test(lower);
}

/** Present-tense personal acute symptoms  should still escalate. */
export function hasPresentAcuteSymptoms(message: string): boolean {
  const lower = message.toLowerCase();
  if (isNonAcuteEmergencyMention(message)) return false;

  return (
    /\b(i'?m|i\s+am|i\s+have|my)\s+(having|getting|experiencing)\b/i.test(lower) ||
    /\b(i\s+think\s+i'?m\s+having)\b/i.test(lower) ||
    /\b(chest\s+pain|chest\s+hurts|heart\s+pain)\b/i.test(lower) ||
    /\b(can'?t\s+breathe|trouble\s+breathing|shortness\s+of\s+breath)\b/i.test(lower) ||
    /\b(passed\s+out|faint(ing|ed)?)\b/i.test(lower) ||
    (/\b(heart\s*attack)\b/i.test(lower) &&
      /\b(having|happening|now|right\s+now)\b/i.test(lower))
  );
}
