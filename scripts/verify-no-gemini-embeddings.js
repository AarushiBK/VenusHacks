#!/usr/bin/env node
/**
 * Verifies no Gemini embedding API usage remains in source code.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SKIP = new Set(["node_modules", ".git", ".expo", "dist"]);
const PATTERNS = [
  /embedContent/,
  /batchEmbedContents/,
  /GEMINI_EMBEDDING/,
  /text-embedding-004/,
  /gemini-embedding/,
];

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, files);
    else if (/\.(ts|tsx|js|py|md|example)$/.test(name) && !name.endsWith(".lock"))
      files.push(full);
  }
  return files;
}

const hits = [];
for (const file of walk(ROOT)) {
  if (file.includes("verify-no-gemini-embeddings")) continue;
  const text = fs.readFileSync(file, "utf8");
  for (const pattern of PATTERNS) {
    if (pattern.test(text)) {
      hits.push(`${path.relative(ROOT, file)}: matches ${pattern}`);
    }
  }
}

if (hits.length) {
  console.error("? Gemini embedding references found:\n" + hits.join("\n"));
  process.exit(1);
}

console.log("? No Gemini embedding API references in source.");
console.log(
  "  Embeddings: Python sentence-transformers (ingest) + Transformers.js (app queries)"
);
console.log("  Gemini: generateContent only — answer_synthesis (src/ai/synthesis/answerSynthesizer.ts)");
