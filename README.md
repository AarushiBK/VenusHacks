# Vena — Women's Cardiovascular & Pregnancy Health AI

Vena is a production-oriented AI assistant for women's heart health and pregnancy care. It combines **app navigation**, **medical RAG**, **emergency detection**, and **voice interaction** in an Expo React Native app.

## Architecture

```
User message
    │
    ▼
assistantPipeline.ts
    ├── emergencyDetection.ts  → urgent response + EmergencyResources
    ├── navigationIntent.ts    → { type: "navigate", screen }
    └── ragEngine.ts           → vectorSearch → LLM (context-only)
```

## Quick start

```bash
npm install
pip install -r requirements.txt
cp .env.example .env
# Add EXPO_PUBLIC_GEMINI_API_KEY for chat answers only (not embeddings)
npm run ingest:pdfs   # local embeddings → Chroma + vector-index.json
npm start
```

## Modes

| Mode | Trigger | Output |
|------|---------|--------|
| Navigation | "Show my heart trends" | `type: "navigation"` + screen action |
| Medical RAG | Health questions | `type: "medical"` + citations |
| Emergency | Chest pain, severe swelling, etc. | `type: "emergency"` + navigate |

## RAG pipeline

1. **PDF ingestion** — `ingestPDFText()` in `ragEngine.ts`
2. **Chunking** — 512 tokens with 64 overlap
3. **Embeddings** — Local `all-MiniLM-L6-v2` (sentence-transformers / Transformers.js — no API)
4. **Vector search** — Supabase pgvector or local index
5. **Context injection** — LLM answers only from retrieved chunks
6. **Citations** — `Source: CDC — Maternal Heart Health Report 2025`

Run the Supabase migration in `supabase/migrations/001_medical_rag.sql` for production vector search.

## Safety

- Never prescribes medication
- Never invents sources
- Always includes educational disclaimer
- Emergency keywords trigger immediate safety messaging

## Project structure

```
src/ai/           Core AI pipeline
components/       VenaChat, VoiceAssistant, ChatBubble, TypingAnimation
app/              Expo Router screens
supabase/         pgvector migration
```

## Voice

- **STT**: OpenAI Whisper (requires API key)
- **TTS**: Expo Speech with tone-aware rate/pitch
- **Interrupt**: Tap orb while speaking to stop

## Extra features (hooks ready)

- Emotional support mode (heart toggle in header)
- Conversation memory (`assistantMemory.ts`)
- Multilingual via `locale` in pipeline options
- Wearable / Health integrations — scaffold screen routes in `app/index.tsx`
