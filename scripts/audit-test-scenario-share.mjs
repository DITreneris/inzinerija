#!/usr/bin/env node
/**
 * Audit: selected test modules should use rendered scenario questions.
 * A scenario question must have type="scenario" and scenarioContext.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const modulesPath = join(root, 'src/data/modules.json');

const THRESHOLDS = new Map([
  [11, 0.3],
  [14, 0.3],
]);

const data = JSON.parse(readFileSync(modulesPath, 'utf8'));
let hasError = false;

console.log('Test scenario share audit\n');

for (const moduleId of [2, 5, 8, 11, 14]) {
  const mod = data.modules.find((m) => m.id === moduleId);
  const questions = (mod?.slides ?? [])
    .flatMap((slide) => slide.testQuestions ?? [])
    .filter(Boolean);
  const scenarioCount = questions.filter(
    (q) => q.type === 'scenario' && typeof q.scenarioContext === 'string'
  ).length;
  const share = questions.length > 0 ? scenarioCount / questions.length : 0;
  const percent = Math.round(share * 100);
  const threshold = THRESHOLDS.get(moduleId);

  console.log(
    `M${moduleId}: ${scenarioCount}/${questions.length} scenario (${percent}%)`
  );

  if (threshold != null && share < threshold) {
    console.error(
      `  FAIL: expected at least ${Math.round(threshold * 100)}% scenario questions`
    );
    hasError = true;
  }
}

process.exit(hasError ? 1 : 0);
