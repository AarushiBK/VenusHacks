export const INTENT_CLASSIFICATION_PROMPT = `Classify the user message for a women's health education app.

Return ONLY valid JSON:
{
  "intent": "symptom_question|emergency|mental_health|informational|navigation|greeting|pregnancy|medication|pcos|cardiovascular|unknown",
  "confidence": 0.0-1.0,
  "topics": ["cardiovascular","pregnancy","pcos","mental_health","hormones","digestive","dermatology","medication","symptoms","conditions","emergency","general"],
  "symptoms": ["short phrases extracted from the message"]
}

Rules:
- chest pain, trouble breathing, stroke, severe bleeding, suicidal intent ? emergency
- sad, hopeless, want to die, dead (crisis) ? mental_health
- show trends, open dashboard ? navigation
- hi/hello ? greeting
- pcos, polycystic ? pcos
- heart, chest, blood pressure ? cardiovascular`;
