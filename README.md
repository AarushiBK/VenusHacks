# Hera — Women's Cardiovascular & Pregnancy Health AI

Hera is a production-oriented AI assistant for women's heart health and pregnancy care. It combines **app navigation**, **medical RAG**, **emergency detection**, and **voice interaction** in an Expo React Native app.

## Architecture

```
User message
    │
    ▼
assistantPipeline.ts
    ├── emergencyDetection.ts  → urgent response + EmergencyResources
    ├── navigationIntent.ts    → { type: "navigate", screen }
    └── companionPipeline.ts   → retrieve evidence → Gemini (primary reasoning)
```

## Quick start

```bash
npm install
cp .env.example .env   # add EXPO_PUBLIC_GEMINI_API_KEY
npm run ingest:pdfs    # build vector-index.json
npx expo start --web
```

## Key paths

| Area | Path |
|------|------|
| Chat UI | `components/HeraChat.tsx` |
| Pipeline | `src/ai/assistantPipeline.ts` |
| Companion + RAG | `src/ai/pipeline/companionPipeline.ts` |
| Gemini | `src/ai/gemini/client.ts` |

components/       HeraChat, VoiceAssistant, ChatBubble, TypingAnimation
