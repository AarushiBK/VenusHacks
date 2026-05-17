export const GEMINI_FAILURE_MARKER = "__VENA_GEMINI_UNAVAILABLE__";

export function isGeminiFailureResponse(text: string): boolean {
  return text.includes(GEMINI_FAILURE_MARKER);
}

function getApiKey(): string | undefined {
  return process.env.EXPO_PUBLIC_GEMINI_API_KEY;
}

function isQuotaOrRateLimitError(status: number, body: string): boolean {
  if (status === 429) return true;
  return /RESOURCE_EXHAUSTED|quota|rate.?limit|billing/i.test(body);
}

/**
 * Gemini generateContent ù used ONLY for final answer synthesis.
 * Logs every real API call. Returns failure marker on missing key or quota errors.
 */
export async function completeGeminiText(
  purpose: string,
  systemPrompt: string,
  userPrompt: string,
  temperature = 0,
  maxTokens = 700
): Promise<string> {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn(`[Vena Gemini] SKIP (${purpose}): no EXPO_PUBLIC_GEMINI_API_KEY`);
    return GEMINI_FAILURE_MARKER;
  }

  const model = process.env.EXPO_PUBLIC_GEMINI_MODEL ?? "gemini-2.5-flash";
  console.log(`[Vena Gemini] API call (${purpose}) model=${model} maxTokens=${maxTokens}`);

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: "user", parts: [{ text: userPrompt }] }],
        generationConfig: { maxOutputTokens: maxTokens, temperature },
      }),
    }
  );

  const body = await res.text();

  if (!res.ok) {
    if (isQuotaOrRateLimitError(res.status, body)) {
      console.warn(
        `[Vena Gemini] QUOTA/RATE LIMIT (${purpose}) HTTP ${res.status} ù using local fallback`
      );
      return GEMINI_FAILURE_MARKER;
    }
    console.warn(`[Vena Gemini] ERROR (${purpose}) HTTP ${res.status}: ${body.slice(0, 160)}`);
    return GEMINI_FAILURE_MARKER;
  }

  let data: {
    candidates?: {
      content?: { parts?: { text?: string }[] };
      finishReason?: string;
    }[];
  };
  try {
    data = JSON.parse(body) as typeof data;
  } catch {
    console.warn(`[Vena Gemini] ERROR (${purpose}): invalid JSON response`);
    return GEMINI_FAILURE_MARKER;
  }

  const candidate = data.candidates?.[0];
  const text = candidate?.content?.parts?.[0]?.text?.trim();
  if (!text) {
    console.warn(`[Vena Gemini] ERROR (${purpose}): empty response`);
    return GEMINI_FAILURE_MARKER;
  }

  if (candidate?.finishReason === "MAX_TOKENS") {
    console.warn(`[Vena Gemini] WARN (${purpose}): truncated (MAX_TOKENS)`);
  }

  console.log(`[Vena Gemini] OK (${purpose}) chars=${text.length}`);
  return text;
}

/** @deprecated Gemini JSON helpers disabled to save quota ù use rules/heuristics instead. */
export async function completeGeminiJson<T>(
  _systemPrompt: string,
  _userPrompt: string,
  _temperature = 0
): Promise<T | null> {
  return null;
}
