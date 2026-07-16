#!/usr/bin/env node
/**
 * M7 pathBranch invariant audit.
 *
 * 1) M8 remediation deep-link targets must stay in the M7 core path.
 * 2) Every pathBranch token must appear in slide 70 journeyChoices.branchIds
 *    (no orphan viz vs viz-sales/viz-mkt drift).
 */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const modulesPath = join(root, 'src', 'data', 'modules.json');
const PROTECTED_M7_SLIDE_IDS = new Set([73, 74, 86, 92, 731, 732, 733, 891]);

function readModules() {
  return JSON.parse(readFileSync(modulesPath, 'utf8'));
}

const payload = readModules();
const modules = Array.isArray(payload) ? payload : payload.modules;

if (!Array.isArray(modules)) {
  console.error('M7 pathBranch audit failed: modules array not found.');
  process.exit(1);
}

const module7 = modules.find((module) => module.id === 7);

if (!module7) {
  console.error('M7 pathBranch audit failed: module 7 not found.');
  process.exit(1);
}

const errors = [];

const protectedViolations = (module7.slides ?? [])
  .filter((slide) => PROTECTED_M7_SLIDE_IDS.has(slide.id))
  .filter((slide) => Array.isArray(slide.pathBranch) && slide.pathBranch.length > 0)
  .map((slide) => ({
    id: slide.id,
    title: slide.title,
    pathBranch: slide.pathBranch,
  }));

for (const violation of protectedViolations) {
  errors.push(
    `protected remediation target slide ${violation.id} "${violation.title}" has pathBranch: ${violation.pathBranch.join(', ')}`
  );
}

const slide70 = (module7.slides ?? []).find((s) => s.id === 70);
const choices = slide70?.content?.journeyChoices ?? [];
if (!slide70 || choices.length === 0) {
  errors.push('slide 70 journeyChoices missing');
}

const knownBranchIds = new Set();
for (const choice of choices) {
  for (const branchId of choice.branchIds ?? []) {
    knownBranchIds.add(branchId);
  }
}

const usesVizSales = knownBranchIds.has('viz-sales');
const usesVizMkt = knownBranchIds.has('viz-mkt');
const usesLegacyViz = knownBranchIds.has('viz');

if ((usesVizSales || usesVizMkt) && usesLegacyViz) {
  errors.push(
    'slide 70 mixes legacy "viz" with viz-sales/viz-mkt in journeyChoices.branchIds'
  );
}

const slidesWithBranch = (module7.slides ?? []).filter(
  (slide) => Array.isArray(slide.pathBranch) && slide.pathBranch.length > 0
);

for (const slide of slidesWithBranch) {
  for (const token of slide.pathBranch) {
    if (!knownBranchIds.has(token)) {
      errors.push(
        `slide ${slide.id} pathBranch token "${token}" is not referenced by any slide 70 branchIds`
      );
    }
  }
}

if (usesVizSales || usesVizMkt) {
  const legacyVizSlides = slidesWithBranch.filter((s) =>
    (s.pathBranch ?? []).includes('viz')
  );
  for (const slide of legacyVizSlides) {
    errors.push(
      `slide ${slide.id} still uses legacy pathBranch "viz" while choices use viz-sales/viz-mkt`
    );
  }
}

if (errors.length > 0) {
  console.error(`M7 pathBranch audit FAILED (${errors.length}):`);
  for (const err of errors) {
    console.error(`  - ${err}`);
  }
  process.exit(1);
}

console.log(
  `M7 pathBranch audit passed: ${PROTECTED_M7_SLIDE_IDS.size} protected core slides; ` +
    `${knownBranchIds.size} known branchIds; ${slidesWithBranch.length} branched slides.`
);
