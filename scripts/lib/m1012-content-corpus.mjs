/**
 * Shared M10-M12 learner-text corpus loader.
 *
 * Both the review-corpus extractor and the content hygiene audit read slides
 * through this module so the field denylist and path notation cannot drift
 * apart between them.
 */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..', '..');

/** Keys that carry configuration, not learner-visible prose. */
export const TECHNICAL_KEYS = new Set([
  'id',
  'type',
  'image',
  'imageKey',
  'icon',
  'color',
  'accent',
  'identityIcon',
  'level',
  'badgeVariant',
  'blockVariant',
  'recommendedPathId',
  'elementId',
  'relatedSlideId',
  'moduleId',
  'slideId',
  'variant',
  'tone',
  'layout',
  'correctAnswer',
  'unlockedGlossaryTerms',
  'itemGlossaryTerms',
  'recommendedSlideIds',
]);

/** Reviewer batches over UI order: [label, moduleId, sliceStart, sliceEndExclusive]. */
export const BATCHES = [
  ['A1', 10, 0, 8],
  ['A2', 10, 8, 16],
  ['A3', 10, 16, 23],
  ['A4', 10, 23, 28],
  ['A5', 10, 28, 31],
  ['A6', 11, 0, 5],
  ['A7', 12, 0, 6],
  ['A8', 12, 6, 11],
];

/** Paths whose value is prompt code rather than prose (relaxed typography rules). */
export function isPromptField(path) {
  return /(copyable|template|ownWorkTemplate|reflectionPrompt|partialSolution)/i.test(path);
}

/** Paths that carry running prose (terminal punctuation is expected). */
export function isProseField(path) {
  return /(\.body|definition|explanation|description|whyBenefit|scenarioContext|situation|constraints|expectedFormat|hint|whenHint|introBody|heroSubText|thresholdExplanation|failedMessage|passedMessage|abilityBefore|abilityAfter|firstAction24h|statusHint)$/.test(
    path
  );
}

/** Paths that are user-facing chrome (headings, navigation, labels). */
export function isChromeField(path) {
  return /(^title$|^subtitle$|^shortTitle$|^footer$|^pathLabel$|heading|^label$|templateLabel|reflectionTitle|introHeading|^term$)/.test(
    path
  );
}

function flatten(node, path, sink) {
  if (typeof node === 'string') {
    if (node.trim()) sink.set(path, node);
    return;
  }
  if (Array.isArray(node)) {
    node.forEach((item, i) => flatten(item, `${path}[${i}]`, sink));
    return;
  }
  if (node && typeof node === 'object') {
    for (const [key, value] of Object.entries(node)) {
      if (TECHNICAL_KEYS.has(key)) continue;
      flatten(value, path ? `${path}.${key}` : key, sink);
    }
  }
}

/**
 * @returns {{slides: Array<{batch:string, moduleId:number, uiIndex:number, uiTotal:number,
 *   slideId:string, type:string, title:string, enTitle:string, optional:boolean,
 *   rows:Array<{path:string, lt:string|null, en:string|null}>}>}}
 */
export function loadCorpus() {
  const lt = JSON.parse(readFileSync(join(root, 'src', 'data', 'modules.json'), 'utf8'));
  const en = JSON.parse(
    readFileSync(join(root, 'src', 'data', 'modules-en-m10-m12.json'), 'utf8')
  );
  const ltModules = Array.isArray(lt) ? lt : lt.modules;
  const enModules = Array.isArray(en) ? en : en.modules;

  const slides = [];
  for (const [batch, moduleId, from, to] of BATCHES) {
    const ltModule = ltModules.find((m) => String(m.id) === String(moduleId));
    const enModule = enModules.find((m) => String(m.id) === String(moduleId));
    const all = ltModule?.slides || [];
    all.slice(from, to).forEach((slide, i) => {
      const enSlide = (enModule?.slides || []).find((s) => String(s.id) === String(slide.id));
      const ltFlat = new Map();
      const enFlat = new Map();
      flatten(slide, '', ltFlat);
      if (enSlide) flatten(enSlide, '', enFlat);
      const paths = [...new Set([...ltFlat.keys(), ...enFlat.keys()])];
      slides.push({
        batch,
        moduleId,
        uiIndex: from + i + 1,
        uiTotal: all.length,
        slideId: String(slide.id),
        type: slide.type || '',
        title: slide.title || '',
        enTitle: enSlide?.title || '',
        optional: Boolean(slide.optional),
        rows: paths.map((path) => ({
          path,
          lt: ltFlat.get(path) ?? null,
          en: enFlat.get(path) ?? null,
        })),
      });
    });
  }
  return { slides };
}
