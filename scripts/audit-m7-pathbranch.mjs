#!/usr/bin/env node
/**
 * M7 pathBranch invariant audit.
 *
 * M8 remediation deep-link targets must stay in the M7 core path. If any of
 * these slides gets `pathBranch`, it can become hidden after a journey focus is
 * selected and remediation links can land on an unreachable slide.
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

const violations = (module7.slides ?? [])
  .filter((slide) => PROTECTED_M7_SLIDE_IDS.has(slide.id))
  .filter((slide) => Array.isArray(slide.pathBranch) && slide.pathBranch.length > 0)
  .map((slide) => ({
    id: slide.id,
    title: slide.title,
    pathBranch: slide.pathBranch,
  }));

if (violations.length > 0) {
  console.error('M7 pathBranch audit failed: protected remediation targets have pathBranch.');
  for (const violation of violations) {
    console.error(
      `- slide ${violation.id} "${violation.title}": ${violation.pathBranch.join(', ')}`
    );
  }
  process.exit(1);
}

console.log(
  `M7 pathBranch audit passed: ${PROTECTED_M7_SLIDE_IDS.size} protected remediation targets are core slides.`
);
