/**
 * Quick check that EXPO_PUBLIC_GEMINI_API_KEY works (does not print the key).
 */
require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });

const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
const model = process.env.EXPO_PUBLIC_GEMINI_MODEL ?? "gemini-2.5-flash";

if (!apiKey) {
  console.error("FAIL: EXPO_PUBLIC_GEMINI_API_KEY is missing in .env");
  process.exit(1);
}

async function main() {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: "Reply with exactly: ok" }] }],
        generationConfig: { maxOutputTokens: 16, temperature: 0 },
      }),
    }
  );

  const body = await res.text();
  if (!res.ok) {
    console.error(`FAIL: Gemini HTTP ${res.status}`);
    console.error(body.slice(0, 500));
    process.exit(1);
  }

  const data = JSON.parse(body);
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  console.log(`OK: Gemini responded (${model})`);
  console.log(`Sample: ${text.trim().slice(0, 80)}`);
}

main().catch((e) => {
  console.error("FAIL:", e.message);
  process.exit(1);
});
