import type { Citation, DocumentChunk, RAGResult } from "./types";
import { generateEmbeddings } from "./embeddings";
import { mergeIntoLocalIndex } from "./vectorSearch";
import { classifyChatMode } from "./intent/modeClassifier";
import { runMedicalRagPipeline } from "./pipeline/medicalRagPipeline";

const CHUNK_SIZE = 480;
const CHUNK_OVERLAP = 80;

const TRUSTED_SOURCES = [
  "CDC",
  "NIH",
  "AHA",
  "WHO",
  "Mayo Clinic",
  "PubMed",
  "ACOG",
];

export interface IngestDocumentInput {
  id: string;
  title: string;
  source: string;
  text: string;
  url?: string;
  trustLevel?: "verified" | "uploaded";
}

export type { RAGResult };

export async function ingestDocument(
  doc: IngestDocumentInput
): Promise<DocumentChunk[]> {
  if (!TRUSTED_SOURCES.includes(doc.source) && doc.trustLevel !== "uploaded") {
    throw new Error(`Source "${doc.source}" is not in the trusted sources list.`);
  }

  const chunks = chunkText(doc.text, doc.id);
  const texts = chunks.map((c) => c.content);
  const embeddings = await generateEmbeddings(texts);

  const enriched: DocumentChunk[] = chunks.map((chunk, i) => ({
    ...chunk,
    embedding: embeddings[i],
    metadata: {
      ...chunk.metadata,
      source: doc.source,
      title: doc.title,
      url: doc.url,
      trustLevel: doc.trustLevel ?? "verified",
    },
  }));

  await mergeIntoLocalIndex(enriched);
  return enriched;
}

export async function ingestPDFText(
  pdfText: string,
  metadata: Omit<IngestDocumentInput, "text">
): Promise<DocumentChunk[]> {
  const cleaned = pdfText.replace(/\s+/g, " ").trim();
  return ingestDocument({ ...metadata, text: cleaned });
}

function chunkText(text: string, docId: string): DocumentChunk[] {
  const chunks: DocumentChunk[] = [];
  let start = 0;
  let index = 0;

  while (start < text.length) {
    const end = Math.min(start + CHUNK_SIZE, text.length);
    const content = text.slice(start, end).trim();
    if (content.length > 40) {
      chunks.push({
        id: `${docId}-chunk-${index}`,
        content,
        metadata: {
          source: "",
          title: "",
          trustLevel: "verified",
        },
      });
      index++;
    }
    start = end - CHUNK_OVERLAP;
    if (end >= text.length) break;
  }

  return chunks;
}

/** RAG_MEDICAL only — use assistantPipeline for full 3-mode routing. */
export async function queryRAG(userQuestion: string): Promise<RAGResult> {
  const { classification } = classifyChatMode(userQuestion);
  const result = await runMedicalRagPipeline(userQuestion, classification);
  return {
    answer: result.answer,
    citations: result.citations,
    hasSufficientContext: result.hasSufficientContext,
  };
}

export function isMedicalQuestion(message: string): boolean {
  const medicalPatterns = [
    /\b(what|why|how|explain|tell me|is it normal|should i|do i have)\b/i,
    /\b(heart|cardio|pregnancy|postpartum|blood pressure|preeclampsia|pcos)\b/i,
    /\b(symptom|pain|medication|treatment|risk|hair|stomach|sad)\b/i,
  ];
  return medicalPatterns.some((p) => p.test(message));
}

export {
  NO_CONTEXT_MESSAGE,
  LOW_CONFIDENCE_MESSAGE,
  RETRIEVAL_MIN_SCORE,
} from "./ragConfig";
