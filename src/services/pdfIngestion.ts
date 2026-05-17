/**
 * PDF ingestion service — wire to your backend upload endpoint.
 * On device, extract text via a server API or expo-document-picker + backend OCR.
 */
import { ingestPDFText, ingestDocument } from "@/src/ai/ragEngine";
import type { DocumentChunk } from "@/src/ai/types";

export interface UploadedPDF {
  id: string;
  title: string;
  source: string;
  extractedText: string;
  url?: string;
}

export async function ingestVerifiedPDF(pdf: UploadedPDF): Promise<DocumentChunk[]> {
  return ingestPDFText(pdf.extractedText, {
    id: pdf.id,
    title: pdf.title,
    source: pdf.source,
    url: pdf.url,
    trustLevel: "uploaded",
  });
}

export async function ingestTrustedSource(
  title: string,
  source: string,
  text: string,
  url?: string
): Promise<DocumentChunk[]> {
  return ingestDocument({
    id: `${source.toLowerCase()}-${Date.now()}`,
    title,
    source,
    text,
    url,
    trustLevel: "verified",
  });
}
