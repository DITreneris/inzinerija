#!/usr/bin/env node
/**
 * M7 journey overlay index↔copyable audit.
 *
 * Ensures every fieldKey in M7_CONTENT_BLOCK_FIELD_INDICES /
 * M7_PATHSTEP_FIELD_INDICES points at a section that has `copyable`
 * in modules.json. Prevents silent no-op / cross-wire regressions.
 *
 * Keep maps in sync with src/data/m7JourneyCopyRegistry.ts.
 */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const modulesPath = join(root, 'src', 'data', 'modules.json');

/** Must match m7JourneyCopyRegistry.ts M7_CONTENT_BLOCK_FIELD_INDICES */
const CONTENT_BLOCK_FIELD_INDICES = {
  731: {
    'types-descriptive': 3,
    'types-diagnostic': 4,
    'types-predictive': 5,
    'types-prescriptive': 6,
  },
  733: {
    'template-data': 2,
    'template-competitors': 3,
    'template-cfo': 4,
  },
  74: {
    'master-prompt': 4,
  },
  734: {
    'filter-ok-fail': 3,
    'filter-priority': 4,
    'filter-quick-wins': 5,
    'filter-portfolio': 6,
  },
  73: {
    'pipeline-overview': 3,
  },
  732: {
    'sentiment-prompt': 2,
  },
  78: {
    'di-role-prompt': 3,
  },
  78.5: {
    'excel-clean-prompt': 2,
  },
  83: { 'role-activation': 2 },
  84: { 'db-structure': 3 },
  86: { 'viz-prompt': 2 },
  87: { 'forecast-prompt': 2 },
  89: { 'algo-sources': 3 },
  891: { 'prep-clean': 2 },
  90: { 'eda-stats': 2 },
  92: { 'bi-plan': 2 },
};

/** Must match m7JourneyCopyRegistry.ts M7_PATHSTEP_FIELD_INDICES */
const PATHSTEP_FIELD_INDICES = {
  71.1: { 'step-task': 0 },
  71.2: { 'step-task': 0 },
  71.3: { 'step-task': 0 },
  71.4: { 'step-task': 0 },
  71.5: { 'step-task': 0 },
};

function findSlide(module7, slideId) {
  const numeric = Number(slideId);
  return (module7.slides ?? []).find(
    (s) => s.id === numeric || s.id === slideId || String(s.id) === String(slideId)
  );
}

function auditMap(module7, map, label) {
  const errors = [];
  for (const [slideId, fields] of Object.entries(map)) {
    const slide = findSlide(module7, slideId);
    if (!slide) {
      errors.push(`${label}: slide ${slideId} not found in modules.json`);
      continue;
    }
    const sections = slide.content?.sections ?? [];
    for (const [fieldKey, index] of Object.entries(fields)) {
      const section = sections[index];
      if (!section?.copyable?.trim()) {
        const copyableIndexes = sections
          .map((sec, i) => (sec?.copyable ? i : null))
          .filter((i) => i !== null);
        errors.push(
          `${label}: slide ${slideId} field "${fieldKey}" index ${index} has no copyable` +
            ` (copyable sections at [${copyableIndexes.join(', ')}])`
        );
      }
    }
  }
  return errors;
}

const payload = JSON.parse(readFileSync(modulesPath, 'utf8'));
const modules = Array.isArray(payload) ? payload : payload.modules;
const module7 = modules?.find((m) => m.id === 7);

if (!module7) {
  console.error('M7 journey indices audit failed: module 7 not found.');
  process.exit(1);
}

const errors = [
  ...auditMap(module7, CONTENT_BLOCK_FIELD_INDICES, 'content-block'),
  ...auditMap(module7, PATHSTEP_FIELD_INDICES, 'path-step'),
];

if (errors.length > 0) {
  console.error(`M7 journey indices audit FAILED (${errors.length}):`);
  for (const err of errors) {
    console.error(`  - ${err}`);
  }
  process.exit(1);
}

const contentCount = Object.values(CONTENT_BLOCK_FIELD_INDICES).reduce(
  (n, fields) => n + Object.keys(fields).length,
  0
);
const pathCount = Object.values(PATHSTEP_FIELD_INDICES).reduce(
  (n, fields) => n + Object.keys(fields).length,
  0
);
console.log(
  `M7 journey indices audit passed: ${contentCount} content-block + ${pathCount} path-step fields point at copyable sections.`
);
