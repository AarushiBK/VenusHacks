/**
 * Run: npx tsx scripts/test-intents.ts
 * Validates rule-based intent classification against labeled examples.
 */
import { classifyChatMode } from "../src/ai/intent/modeClassifier";
import { INTENT_TEST_CASES } from "../src/ai/intent/intentTestCases";

let passed = 0;
let failed = 0;
const failures: string[] = [];

for (const { message, expected, note } of INTENT_TEST_CASES) {
  const { mode, reason } = classifyChatMode(message);
  if (mode === expected) {
    passed++;
  } else {
    failed++;
    failures.push(
      `FAIL: "${message}"\n  expected=${expected} got=${mode} reason=${reason}${note ? ` (${note})` : ""}`
    );
  }
}

console.log(`\nIntent test results: ${passed}/${INTENT_TEST_CASES.length} passed, ${failed} failed\n`);

if (failures.length > 0) {
  console.log(failures.join("\n\n"));
  process.exit(1);
}

console.log("All intent tests passed.");
