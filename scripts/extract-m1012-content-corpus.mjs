#!/usr/bin/env node
/**
 * Extracts the learner-visible LT+EN text of M10-M12 into review bundles.
 *
 * Pairs every LT string with the EN string at the identical JSON path so a
 * reviewer sees exact copy instead of raw JSON. Output is scratch (tmp/),
 * not a repo deliverable.
 *
 * Usage: node scripts/extract-m1012-content-corpus.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outDir = join(root, 'tmp', 'm1012-audit');

/** Keys that carry configuration, not learner-visible prose. */
const TECHNICAL_KEYS = new Set([
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

const MODULES = [10, 11, 12];

/** Reviewer batches: [label, moduleId, sliceStart, sliceEndExclusive] over UI order. */
const BATCHES = [
  ['A1', 10, 0, 8],
  ['A2', 10, 8, 16],
  ['A3', 10, 16, 23],
  ['A4', 10, 23, 28],
  ['A5', 10, 28, 32],
  ['A6', 11, 0, 5],
  ['A7', 12, 0, 6],
  ['A8', 12, 6, 11],
];

const lt = JSON.parse(readFileSync(join(root, 'src', 'data', 'modules.json'), 'utf8'));
const en = JSON.parse(
  readFileSync(join(root, 'src', 'data', 'modules-en-m10-m12.json'), 'utf8')
);
const ltModules = Array.isArray(lt) ? lt : lt.modules;
const enModules = Array.isArray(en) ? en : en.modules;

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

function escapeForReview(text) {
  return text.replace(/\r/g, '\\r').replace(/\n/g, '\\n').replace(/\t/g, '\\t');
}

function slideRows(ltSlide, enSlide) {
  const ltFlat = new Map();
  const enFlat = new Map();
  flatten(ltSlide, '', ltFlat);
  if (enSlide) flatten(enSlide, '', enFlat);
  const paths = [...new Set([...ltFlat.keys(), ...enFlat.keys()])];
  return paths.map((path) => ({
    path,
    lt: ltFlat.get(path) ?? null,
    en: enFlat.get(path) ?? null,
  }));
}

const catalog = [];
mkdirSync(outDir, { recursive: true });

for (const [label, moduleId, from, to] of BATCHES) {
  const ltModule = ltModules.find((m) => String(m.id) === String(moduleId));
  const enModule = enModules.find((m) => String(m.id) === String(moduleId));
  const slides = (ltModule.slides || []).slice(from, to);
  const lines = [
    `# Batch ${label} - M${moduleId} slides ${from + 1}-${to} (LT + EN paired)`,
    '',
    `Source of truth: \`src/data/modules.json\` (LT) and \`src/data/modules-en-m10-m12.json\` (EN).`,
    'Newlines are escaped as \\n so trailing spaces and line breaks stay visible.',
    'Paths are relative to the slide object. `EN: (none)` means the path exists only in LT.',
    '',
  ];

  slides.forEach((slide, i) => {
    const uiIndex = from + i + 1;
    const enSlide = (enModule.slides || []).find((s) => String(s.id) === String(slide.id));
    const rows = slideRows(slide, enSlide);
    const ltChars = rows.reduce((n, r) => n + (r.lt?.length || 0), 0);
    const enChars = rows.reduce((n, r) => n + (r.en?.length || 0), 0);

    catalog.push({
      batch: label,
      moduleId,
      uiIndex,
      slideId: String(slide.id),
      type: slide.type || '',
      title: slide.title || '',
      optional: Boolean(slide.optional),
      fields: rows.length,
      ltChars,
      enChars,
      enMissing: !enSlide,
    });

    lines.push(
      '',
      '---',
      '',
      `## M${moduleId} / UI ${uiIndex} of ${(ltModule.slides || []).length} / slide id \`${slide.id}\``,
      '',
      `- type: \`${slide.type || '?'}\`${slide.optional ? ' | **optional: true**' : ''}`,
      `- LT title: ${slide.title || '(none)'}`,
      `- EN title: ${enSlide?.title || '(EN SLIDE MISSING)'}`,
      `- text fields: ${rows.length} | LT ${ltChars} chars | EN ${enChars} chars`,
      ''
    );

    for (const row of rows) {
      lines.push(`### \`${row.path}\``);
      lines.push(`LT: ${row.lt === null ? '(none)' : escapeForReview(row.lt)}`);
      lines.push(`EN: ${row.en === null ? '(none)' : escapeForReview(row.en)}`);
      lines.push('');
    }
  });

  writeFileSync(join(outDir, `batch-${label}.md`), lines.join('\n'), 'utf8');
}

writeFileSync(join(outDir, 'catalog.json'), JSON.stringify(catalog, null, 2), 'utf8');

const indexLines = [
  '# M10-M12 content audit corpus',
  '',
  '| Batch | M | UI | slide id | type | opt | fields | LT chars | EN chars | title |',
  '| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |',
  ...catalog.map(
    (c) =>
      `| ${c.batch} | ${c.moduleId} | ${c.uiIndex} | \`${c.slideId}\` | ${c.type} | ${c.optional ? 'yes' : ''} | ${c.fields} | ${c.ltChars} | ${c.enChars} | ${c.title} |`
  ),
  '',
  `Total: ${catalog.length} slides | LT ${catalog.reduce((n, c) => n + c.ltChars, 0)} chars | EN ${catalog.reduce((n, c) => n + c.enChars, 0)} chars | fields ${catalog.reduce((n, c) => n + c.fields, 0)}`,
];
writeFileSync(join(outDir, 'index.md'), indexLines.join('\n'), 'utf8');

console.log(`Wrote ${BATCHES.length} batch files + index + catalog to tmp/m1012-audit/`);
console.log(
  `Slides: ${catalog.length} | fields: ${catalog.reduce((n, c) => n + c.fields, 0)} | EN missing: ${catalog.filter((c) => c.enMissing).length}`
);
