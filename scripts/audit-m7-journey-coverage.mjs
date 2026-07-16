#!/usr/bin/env node
/**
 * M7 journey overlay coverage audit (Tier 1 + Tier 2 + path-step).
 * Each registry field must have all 6 journey keys in LT and EN overlays.
 *
 * Usage:
 *   node scripts/audit-m7-journey-coverage.mjs
 *   node scripts/audit-m7-journey-coverage.mjs --locale=en
 */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const locale = process.argv.includes('--locale=en') ? 'en' : 'lt';
const overlayPath =
  locale === 'en'
    ? join(root, 'src', 'data', 'modules-journey-en-m7.json')
    : join(root, 'src', 'data', 'modules-journey-m7.json');

const REQUIRED_JOURNEY_IDS = [
  'pardavimai',
  'rinkodara',
  'it-inzinerija',
  'personalas',
  'vadyba',
  'kita',
];

/** Keep in sync with src/data/m7JourneyCopyRegistry.ts M7_JOURNEY_COVERAGE_REGISTRY */
const COVERAGE_REGISTRY = {
  731: [
    'types-descriptive',
    'types-diagnostic',
    'types-predictive',
    'types-prescriptive',
  ],
  733: ['template-data', 'template-competitors', 'template-cfo'],
  74: ['master-prompt'],
  734: [
    'filter-ok-fail',
    'filter-priority',
    'filter-quick-wins',
    'filter-portfolio',
  ],
  75: ['reflection', 'first-action-24h'],
  73: ['pipeline-overview'],
  732: ['sentiment-prompt'],
  78: ['di-role-prompt'],
  78.5: ['excel-clean-prompt'],
  83: ['role-activation'],
  84: ['db-structure'],
  86: ['viz-prompt'],
  87: ['forecast-prompt'],
  89: ['algo-sources'],
  891: ['prep-clean'],
  90: ['eda-stats'],
  92: ['bi-plan'],
  71.1: ['step-task'],
  71.2: ['step-task'],
  71.3: ['step-task'],
  71.4: ['step-task'],
  71.5: ['step-task'],
};

const overlay = JSON.parse(readFileSync(overlayPath, 'utf8'));
const fields = overlay.fields ?? {};
const violations = [];

for (const [slideId, fieldKeys] of Object.entries(COVERAGE_REGISTRY)) {
  const slideFields = fields[slideId];
  if (!slideFields) {
    violations.push(`Missing slide ${slideId} in overlay`);
    continue;
  }
  for (const fieldKey of fieldKeys) {
    const variants = slideFields[fieldKey];
    if (!variants) {
      violations.push(`Slide ${slideId}: missing field "${fieldKey}"`);
      continue;
    }
    for (const journeyId of REQUIRED_JOURNEY_IDS) {
      if (!variants[journeyId]?.trim()) {
        violations.push(
          `Slide ${slideId}.${fieldKey}: missing journey "${journeyId}"`
        );
      }
    }
  }
}

if (violations.length) {
  console.error(
    `M7 journey coverage audit FAILED (${locale}): ${violations.length} issue(s)`
  );
  violations.slice(0, 40).forEach((v) => console.error(`  - ${v}`));
  if (violations.length > 40) {
    console.error(`  … +${violations.length - 40} more`);
  }
  process.exit(1);
}

const fieldCount = Object.values(COVERAGE_REGISTRY).reduce(
  (n, keys) => n + keys.length,
  0
);
console.log(
  `M7 journey coverage audit passed (${locale}): ${fieldCount} fields × 6 journeys.`
);
