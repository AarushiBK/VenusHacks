import type { DocumentChunk, MedicalTopicTag } from "../types";

const TOPIC_KEYWORDS: Record<MedicalTopicTag, RegExp[]> = {
  cardiovascular: [
    /\bheart\b/i,
    /\bcardio/i,
    /\bmyocard/i,
    /\bblood pressure\b/i,
    /\bhypertension\b/i,
    /\bchest pain\b/i,
    /\bischemi/i,
  ],
  pregnancy: [/\bpregnan/i, /\bprenatal\b/i, /\bpostpartum\b/i, /\bmaternal\b/i, /\bfetal\b/i],
  pcos: [/\bpcos\b/i, /\bpolycystic\b/i, /\bovarian\b/i],
  hormones: [/\bhormon/i, /\bestrogen\b/i, /\bthyroid\b/i, /\bmenstrual\b/i, /\bperiod\b/i],
  mental_health: [/\bdepress/i, /\banxiety\b/i, /\bmental health\b/i, /\bpsych/i],
  medication: [/\bmedication\b/i, /\bprescri/i, /\bdrug\b/i, /\bdose\b/i],
  digestive: [/\babdominal\b/i, /\bgastro/i, /\bnausea\b/i, /\bstomach\b/i],
  dermatology: [/\bhair loss\b/i, /\bthinning hair\b/i, /\bskin\b/i, /\bacne\b/i],
  emergency: [/\bemergency\b/i, /\burgent\b/i, /\bcritical\b/i],
  symptoms: [/\bsymptom\b/i, /\bsigns of\b/i],
  conditions: [/\bdisease\b/i, /\bdisorder\b/i, /\bcondition\b/i],
  general: [],
};

const OFF_TOPIC_FOR_SYMPTOM: RegExp[] = [
  /\bfirearm\b/i,
  /\bgun violence\b/i,
  /\bhomicide\b/i,
  /\bhealth equity\b/i,
  /\bbrfss\b/i,
  /\btuberculosis\b/i,
  /\bepidemiolog/i,
];

export function enrichChunkMetadata(chunk: DocumentChunk): DocumentChunk {
  if (chunk.metadata.topics?.length) return chunk;

  const text = `${chunk.metadata.title} ${chunk.content}`;
  const topics: MedicalTopicTag[] = [];

  for (const [tag, patterns] of Object.entries(TOPIC_KEYWORDS) as [
    MedicalTopicTag,
    RegExp[],
  ][]) {
    if (tag === "general") continue;
    if (patterns.some((p) => p.test(text))) topics.push(tag);
  }

  if (topics.length === 0) topics.push("general");

  return {
    ...chunk,
    metadata: {
      ...chunk.metadata,
      topics,
    },
  };
}

export function isOffTopicForIntent(
  chunk: DocumentChunk,
  intentTopics: MedicalTopicTag[],
  userMessage: string
): boolean {
  const text = chunk.content;
  const q = userMessage.toLowerCase();

  const mentionsViolence = /\b(gun|firearm|violence)\b/i.test(q);
  const mentionsTb = /\btuberculosis\b/i.test(q);

  if (!mentionsViolence && OFF_TOPIC_FOR_SYMPTOM.some((p) => p.test(text))) {
    if (intentTopics.includes("mental_health") || intentTopics.includes("digestive")) {
      return true;
    }
    if (
      intentTopics.includes("pcos") ||
      intentTopics.includes("dermatology") ||
      intentTopics.includes("hormones")
    ) {
      return /\b(myocard|ischemi|cardiovascular disease)\b/i.test(text) && !/\bpcos|hair|hormon/i.test(text);
    }
  }

  if (!mentionsTb && /\btuberculosis\b/i.test(text) && /\b(dead|die|sad|hair|stomach|pcos)\b/i.test(q)) {
    return true;
  }

  return false;
}

export function chunkMatchesTopics(
  chunk: DocumentChunk,
  requiredTopics: MedicalTopicTag[]
): boolean {
  const chunkTopics = chunk.metadata.topics ?? ["general"];
  if (requiredTopics.includes("general")) return true;
  return requiredTopics.some((t) => t !== "general" && chunkTopics.includes(t));
}
