#!/usr/bin/env node
/**
 * Build src/data/modules-en-m7-m9.json – EN overlay for modules 7–9 (lean + phase 6 expansion).
 * WARNING: Overwrites manual EN edits in modules-en-m7-m9.json. After CONTENT rankinis rewrite,
 * do NOT run this without restoring from git or re-applying fixes.
 * Run: node scripts/build-en-m7-m9.mjs [--lean]
 */
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import {
  LEAN_MODULE_META,
  getBuildSlideIds,
} from './m7-m9-en-manifest.mjs';
import { slideToEnOverlay, translateDeep } from './m7-m9-en-translate.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dataDir = join(root, 'src', 'data');
const outPath = join(dataDir, 'modules-en-m7-m9.json');

const leanOnly = process.argv.includes('--lean');
const buildIds = getBuildSlideIds(!leanOnly);

const lt = JSON.parse(readFileSync(join(dataDir, 'modules.json'), 'utf8'));
const allMissing = [];

const modules = [7, 8, 9].map((moduleId) => {
  const ltMod = lt.modules.find((m) => m.id === moduleId);
  if (!ltMod) throw new Error(`Module ${moduleId} not found`);

  const meta = LEAN_MODULE_META[moduleId];
  const enMod = {
    id: moduleId,
    title: meta.title,
    subtitle: meta.subtitle,
    description: meta.description,
  };
  if (meta.duration) enMod.duration = meta.duration;

  const slideIds = buildIds[moduleId];
  enMod.slides = slideIds.map((slideId) => {
    const ltSlide = ltMod.slides.find((s) => s.id === slideId);
    if (!ltSlide) throw new Error(`M${moduleId} slide ${slideId} not found`);
    const { slide, missing } = slideToEnOverlay(ltSlide);
    missing.forEach((m) => allMissing.push({ moduleId, slideId, ...m }));
    return slide;
  });

  if (ltMod.businessExamples) {
    const { value, missing } = translateDeep({ businessExamples: ltMod.businessExamples });
    enMod.businessExamples = value.businessExamples;
    missing.forEach((m) => allMissing.push({ moduleId, ...m }));
  }

  return enMod;
});

if (allMissing.length > 0) {
  console.error(`Missing ${allMissing.length} translations (first 20):`);
  allMissing.slice(0, 20).forEach((m) => {
    console.error(`  M${m.moduleId} slide ${m.slideId ?? '-'} ${m.path}: ${m.sample}`);
  });
  process.exit(1);
}

const en = { modules };
writeFileSync(outPath, `${JSON.stringify(en, null, 2)}\n`, 'utf8');
console.log('Written:', outPath);
console.log(
  'Slides:',
  modules.map((m) => `M${m.id}:${m.slides.length}`).join('; ')
);
console.log('Mode:', leanOnly ? 'lean' : 'full');
