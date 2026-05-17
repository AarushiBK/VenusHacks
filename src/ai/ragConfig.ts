/** Grounded RAG thresholds and copy — single source of truth */

export const LOCAL_EMBEDDING_MODEL_NAME = "all-MiniLM-L6-v2";
export const EMBEDDING_DIMENSION = 384;

/** Max chunks passed to synthesis after rerank */
export const RETRIEVAL_TOP_K = 5;

/** Candidate pool before metadata filter + rerank */
export const RETRIEVAL_CANDIDATE_K = 15;

/** Minimum cosine / hybrid score at retrieval stage */
export const RETRIEVAL_MIN_SCORE = 0.72;

/** Web hybrid scores are scaled differently */
export const RETRIEVAL_MIN_SCORE_WEB = 0.28;

/** Minimum rerank score (0–1) to keep a chunk */
export const RERANK_MIN_SCORE = 0.55;

/** Top score after rerank must meet this or we return safe fallback */
export const CONFIDENCE_MIN_TOP_SCORE = 0.62;

export const NO_CONTEXT_MESSAGE =
  "I could not find this information in the verified medical database.";

export const LOW_CONFIDENCE_MESSAGE =
  "I couldn't find enough reliable information related to your question in our verified sources.";

export const SAFETY_DISCLAIMER =
  "This information is educational and not a medical diagnosis.";

/** Softer one-line disclaimer for companion replies */
export const COMPANION_DISCLAIMER =
  "I'm here for education and support—not to replace your care team.";

export const CHROMA_COLLECTION =
  process.env.EXPO_PUBLIC_CHROMA_COLLECTION ?? "vena_medical";

export const GROUNDED_SYSTEM_PROMPT = `You are Vena, a medical education assistant for women's cardiovascular and pregnancy health.

STRICT RULES:
1. Answer ONLY using facts explicitly written in VERIFIED CONTEXT.
2. Do NOT diagnose or claim certainty.
3. If context is insufficient, respond with EXACTLY: "${NO_CONTEXT_MESSAGE}"
4. End with: "${SAFETY_DISCLAIMER}"`;
