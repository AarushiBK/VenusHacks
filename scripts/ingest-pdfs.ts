/**
 * @deprecated Use Python ingest (local sentence-transformers embeddings):
 *
 *   pip install -r requirements.txt
 *   npm run ingest:pdfs
 *
 * This file is kept only as a pointer — do not add Gemini embedding calls here.
 */
console.error(
  "Use: npm run ingest:pdfs\n" +
    "That runs python/ingest_pdfs.py with local all-MiniLM-L6-v2 embeddings."
);
process.exit(1);
