#!/usr/bin/env node
/**
 * M7–M9 EN overlay manifest: lean-core, expansion (phase 6), and full slide ID sets.
 * Source of truth for build-en-m7-m9.mjs and audit-en-coverage-m7-m9.mjs.
 */
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const modulesPath = join(root, 'src', 'data', 'modules.json');

/** @typedef {{ title: string; subtitle: string; description: string; duration?: string }} LeanModuleMeta */

/** @type {Record<7|8|9, LeanModuleMeta>} */
export const LEAN_MODULE_META = {
  7: {
    title: 'Data analysis with AI',
    subtitle: 'Pipeline, prompt architecture, MASTER PROMPT',
    description:
      'Data analysis path: from strategic foundation to visualizations and the final project. AI as analyst.',
    duration: '45–60 min',
  },
  8: {
    title: 'Knowledge check (DA path)',
    subtitle: 'Test: pipeline, prompts, visualization',
    description:
      'Check your mastery before the final Data Analysis path project (Module 9).',
    duration: '15 min',
  },
  9: {
    title: 'Capstone project (DA path)',
    subtitle: 'One full project (DA path)',
    description:
      '8-step path to a dashboard; up to 17 additional scenarios. Continuation of the Data Analysis path (M7–M8).',
    duration: '25–35 min',
  },
};

export const LEAN_M7_SLIDE_IDS = [
  70, 70.5, 71, 72, 73, 73.5, 71.1, 731, 731.5, 732, 733, 734, 71.2, 78, 83, 84, 86, 87, 89, 891,
  891.5, 66.9, 67, 67.8, 68, 68.5, 90, 92, 71.3, 74, 74.5, 71.4, 71.5, 75,
];

export const LEAN_M8_SLIDE_IDS = [80, 80.5, 81, 82, 801, 802];

export const LEAN_M9_SLIDE_IDS = [90, 93, 94, 92, 99, 101, 102, 111, 116, 117];

function loadModules() {
  return JSON.parse(readFileSync(modulesPath, 'utf8')).modules;
}

function slideIdsForModule(moduleId) {
  const mod = loadModules().find((m) => m.id === moduleId);
  if (!mod) throw new Error(`Module ${moduleId} not found in modules.json`);
  return mod.slides.map((s) => s.id);
}

/** All M7 slides with pathBranch (adaptive path branches). */
export const EXPANSION_M7_SLIDE_IDS = (() => {
  const mod = loadModules().find((m) => m.id === 7);
  return mod.slides.filter((s) => Array.isArray(s.pathBranch) && s.pathBranch.length > 0).map((s) => s.id);
})();

/** M9 practice-scenario slides not in lean set. */
export const EXPANSION_M9_SLIDE_IDS = (() => {
  const mod = loadModules().find((m) => m.id === 9);
  const lean = new Set(LEAN_M9_SLIDE_IDS);
  return mod.slides
    .filter((s) => s.type === 'practice-scenario' && !lean.has(s.id))
    .map((s) => s.id);
})();

export const FULL_M7_SLIDE_IDS = slideIdsForModule(7);

/** All M9 slide ids except duplicates that also exist in M7 (same id, different slide). */
export const FULL_M9_SLIDE_IDS = (() => {
  const m7Ids = new Set(slideIdsForModule(7));
  return slideIdsForModule(9).filter((id) => !m7Ids.has(id));
})();

export const FULL_M8_SLIDE_IDS = slideIdsForModule(8);

/** Lean + expansion (phase 5). */
export function getLeanBuildSlideIds() {
  return {
    7: [...new Set([...LEAN_M7_SLIDE_IDS, ...EXPANSION_M7_SLIDE_IDS])],
    8: [...LEAN_M8_SLIDE_IDS],
    9: [...new Set([...LEAN_M9_SLIDE_IDS, ...EXPANSION_M9_SLIDE_IDS])],
  };
}

/** Full overlay (lean + phase 6 expansion). */
export function getFullBuildSlideIds() {
  return {
    7: FULL_M7_SLIDE_IDS,
    8: FULL_M8_SLIDE_IDS,
    9: [...FULL_M9_SLIDE_IDS, ...LEAN_M9_SLIDE_IDS.filter((id) => FULL_M9_SLIDE_IDS.includes(id) || !FULL_M7_SLIDE_IDS.includes(id))],
  };
}

/** Default build set: full M7–M9 coverage in one overlay file. */
export function getBuildSlideIds(full = true) {
  if (full) {
    const m7 = FULL_M7_SLIDE_IDS;
    const m8 = FULL_M8_SLIDE_IDS;
    const m9All = slideIdsForModule(9);
    return { 7: m7, 8: m8, 9: m9All };
  }
  return getLeanBuildSlideIds();
}
