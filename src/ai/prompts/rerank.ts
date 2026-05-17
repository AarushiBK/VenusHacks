export const RERANK_PROMPT = `You score medical passage relevance for a women's health question.

Return ONLY valid JSON array (max 5 items), sorted by relevance descending:
[{"id":"<passage id>","score":0.0-1.0,"reason":"brief"}]

Score higher when passage directly addresses symptoms, condition, organ system, pregnancy, or women's health context.
Score near 0 for unrelated epidemiology, violence research, or unrelated diseases when the question is about something else.`;
