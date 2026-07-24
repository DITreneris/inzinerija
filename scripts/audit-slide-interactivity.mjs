#!/usr/bin/env node
/**
 * Audit: slide interactivity patterns across modules.json (M1–15).
 * Usage: node scripts/audit-slide-interactivity.mjs [--json] [--embed-catalog]
 *
 * Scope: INTERACTIVE_TYPES + top-level EMBED_KEYS (+ toolChoiceBar in --embed-catalog).
 * Diagrams / labs / tables / full SlideType catalog → `npm run audit:teaching-elements`
 * (docs/development/TEACHING_ELEMENTS_REGISTRY.md).
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const modulesPath = join(root, 'src/data/modules.json');

const INTERACTIVE_TYPES = new Set([
  'path-step',
  'warm-up-quiz',
  'intro-action-pie',
  'evaluator-prompt-block',
  'action-intro-journey',
  'practice-scenario-hub',
  'vaizdo-generatorius',
]);

const EMBED_KEYS = [
  'recognitionExercise',
  'interactivePipeline',
  'correctPromptPractice',
  'instructGptQuality',
  'briefCheckBlock',
  'preCopyCheckBlock',
];

const LEARN_MODULE_IDS = new Set([1, 4, 5, 6, 7, 10, 13]);

function maxContentBlockStreak(slides) {
  let max = 0;
  let cur = 0;
  for (const s of slides) {
    // Branch slides are not shown together in M7 navigation; count the core path
    // to avoid reporting a streak users cannot actually see.
    if (Array.isArray(s.pathBranch) && s.pathBranch.length > 0) continue;
    const isBreak =
      s.type === 'content-block'
        ? false
        : INTERACTIVE_TYPES.has(s.type) ||
          s.type === 'section-break' ||
          s.type === 'warm-up-quiz' ||
          s.type === 'summary' ||
          s.type === 'glossary';
    if (s.type === 'content-block') {
      cur += 1;
      max = Math.max(max, cur);
    } else if (isBreak) {
      cur = 0;
    }
  }
  return max;
}

function countPatterns(slides) {
  let interactive = 0;
  let embed = 0;
  const byType = {};
  for (const s of slides) {
    byType[s.type] = (byType[s.type] || 0) + 1;
    if (INTERACTIVE_TYPES.has(s.type)) interactive += 1;
    const c = s.content;
    if (c && typeof c === 'object') {
      for (const k of EMBED_KEYS) {
        if (c[k]) embed += 1;
      }
    }
  }
  return { interactive, embed, byType };
}

function collectEmbedCatalog(data) {
  const rows = [];
  for (const mod of data.modules) {
    for (const slide of mod.slides ?? []) {
      const content = slide.content;
      if (!content || typeof content !== 'object') continue;

      for (const key of EMBED_KEYS) {
        if (content[key]) {
          rows.push({
            moduleId: mod.id,
            slideId: slide.id,
            title: slide.title,
            key,
          });
        }
      }

      for (const [index, section] of (content.sections ?? []).entries()) {
        if (section?.toolChoiceBar) {
          rows.push({
            moduleId: mod.id,
            slideId: slide.id,
            title: slide.title,
            key: `sections[${index}].toolChoiceBar`,
          });
        }
      }
    }
  }
  return rows;
}

const data = JSON.parse(readFileSync(modulesPath, 'utf8'));
const report = {
  generatedAt: new Date().toISOString().slice(0, 10),
  totalSlides: 0,
  totals: {
    warmUpQuiz: 0,
    pathStep: 0,
    introActionPie: 0,
    evaluatorPromptBlock: 0,
    embeddedSubBlocks: 0,
  },
  modules: [],
  warnings: [],
};

for (const mod of data.modules) {
  const slides = mod.slides ?? [];
  report.totalSlides += slides.length;
  const { interactive, embed, byType } = countPatterns(slides);
  const streak = maxContentBlockStreak(slides);

  report.totals.warmUpQuiz += byType['warm-up-quiz'] || 0;
  report.totals.pathStep += byType['path-step'] || 0;
  report.totals.introActionPie += byType['intro-action-pie'] || 0;
  report.totals.evaluatorPromptBlock += byType['evaluator-prompt-block'] || 0;
  report.totals.embeddedSubBlocks += embed;

  const entry = {
    moduleId: mod.id,
    title: mod.title,
    slideCount: slides.length,
    interactiveTypeSlides: interactive,
    embeddedSubBlocks: embed,
    maxContentBlockStreak: streak,
    warmUpQuiz: byType['warm-up-quiz'] || 0,
    pathStep: byType['path-step'] || 0,
  };
  report.modules.push(entry);

  if (LEARN_MODULE_IDS.has(mod.id) && slides.length >= 15) {
    const formative = (byType['warm-up-quiz'] || 0) + (byType['path-step'] || 0);
    if (formative < 2) {
      report.warnings.push(
        `M${mod.id}: learn modulis (${slides.length} sk.) – tik ${formative} warm-up/path-step (tikslas ≥2)`
      );
    }
    if (streak > 8) {
      report.warnings.push(
        `M${mod.id}: ilgiausias content-block streak = ${streak} (tikslas ≤8)`
      );
    }
  }
}

const jsonOut = process.argv.includes('--json');
const embedCatalogOut = process.argv.includes('--embed-catalog');
if (jsonOut) {
  if (embedCatalogOut) report.embedCatalog = collectEmbedCatalog(data);
  console.log(JSON.stringify(report, null, 2));
} else if (embedCatalogOut) {
  console.log('Embedded pattern catalog (M1–15)\n');
  for (const row of collectEmbedCatalog(data)) {
    console.log(
      `M${row.moduleId} slide ${row.slideId}: ${row.key} – ${row.title}`
    );
  }
} else {
  console.log('Slide interactivity audit (M1–15)\n');
  console.log(`Total slides: ${report.totalSlides}`);
  console.log(
    `warm-up-quiz: ${report.totals.warmUpQuiz} | path-step: ${report.totals.pathStep} | intro-action-pie: ${report.totals.introActionPie} | evaluator: ${report.totals.evaluatorPromptBlock} | embed: ${report.totals.embeddedSubBlocks}\n`
  );
  for (const m of report.modules) {
    console.log(
      `M${m.moduleId} (${m.slideCount}): warm-up=${m.warmUpQuiz} path=${m.pathStep} streak=${m.maxContentBlockStreak}`
    );
  }
  if (report.warnings.length) {
    console.log('\nWarnings:');
    for (const w of report.warnings) console.log(`  - ${w}`);
  } else {
    console.log('\nNo warnings.');
  }
}

process.exit(report.warnings.length > 0 ? 1 : 0);
