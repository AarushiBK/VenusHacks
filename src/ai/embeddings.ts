/**
 * TypeScript entry (Metro uses embeddings.web.ts / embeddings.native.ts at runtime).
 */
export * from "./embeddings.shared";
export { generateEmbeddings } from "./embeddings.native";
