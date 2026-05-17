import type { IntentClassification } from "../intent/types";

const RULE_REWRITES: { pattern: RegExp; query: string }[] = [
  {
    pattern: /\bhair\s*(thin|loss|falling)\b/i,
    query:
      "hair loss women hormonal imbalance iron deficiency thyroid PCOS pregnancy nutrition",
  },
  {
    pattern: /\bstomach\s*pain\b|\babdominal\s*pain\b/i,
    query:
      "abdominal pain women digestive menstrual gastrointestinal pregnancy cardiovascular warning signs",
  },
  {
    pattern: /\b(pcos|polycystic)\b/i,
    query: "PCOS polycystic ovary syndrome symptoms diagnosis hormones irregular periods infertility",
  },
  {
    pattern: /\b(chest\s*pain|heart\s*pain)\b/i,
    query: "chest pain women heart attack symptoms shortness of breath pregnancy cardiovascular",
  },
  {
    pattern: /\bpreeclampsia\b/i,
    query: "preeclampsia pregnancy high blood pressure symptoms treatment women",
  },
  {
    pattern: /\b(sad|depressed|hopeless)\b/i,
    query: "depression anxiety women mental health support symptoms",
  },
];

/** Rule-based only   no Gemini. */
export async function rewriteRetrievalQuery(
  userMessage: string,
  classification: IntentClassification
): Promise<string> {
  const trimmed = userMessage.trim();
  if (/^pcos$/i.test(trimmed)) {
    return "PCOS polycystic ovary syndrome symptoms diagnosis hormones women";
  }
  if (/^cardiovascular$/i.test(trimmed) || /^heart disease$/i.test(trimmed)) {
    return "cardiovascular disease women heart health pregnancy risk";
  }

  for (const { pattern, query } of RULE_REWRITES) {
    if (pattern.test(userMessage)) return query;
  }

  const symptomPart = classification.symptoms.length
    ? classification.symptoms.join(" ")
    : "";
  const topicPart = classification.topics.filter((t) => t !== "general").join(" ");
  const ruleBase = [userMessage, symptomPart, topicPart, "women health"]
    .filter(Boolean)
    .join(" ");

  return ruleBase.slice(0, 200);
}
