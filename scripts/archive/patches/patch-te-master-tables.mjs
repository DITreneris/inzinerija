#!/usr/bin/env node
/** One-shot helper: refresh TEACHING_ELEMENTS_REGISTRY.md inventory tables from overlay. */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const overlay = JSON.parse(
  readFileSync(join(root, 'docs/development/teaching-elements-overlay.json'), 'utf8')
);
const regPath = join(root, 'docs/development/TEACHING_ELEMENTS_REGISTRY.md');
let text = readFileSync(regPath, 'utf8');

const diagramRows = overlay.elements
  .filter((e) => ['diagram', 'lab', 'off-renderer'].includes(e.kind))
  .sort((a, b) => a.elementId.localeCompare(b.elementId));

let diagramMd = `## Diagramos, labai ir off-renderer (TE-2)

| elementId | M/slide | Pattern | Shell | Maturity | Render |
| --------- | ------- | ------- | ----- | --------:| ------ |
`;
for (const e of diagramRows) {
  const loc =
    e.moduleId != null ? `M${e.moduleId}/${e.slideId ?? '—'}` : e.key || '—';
  const render = String(e.render || '').replace(/\|/g, '\\|');
  diagramMd += `| \`${e.elementId}\` | ${loc} | \`${e.pattern}\` | ${e.shell} | ${e.maturity} | ${render} |\n`;
}
diagramMd += `\n> Pilnas overlay: \`teaching-elements-overlay.json\`. Audit: \`npm run audit:teaching-elements --strict\`.\n\n`;

const typeRows = overlay.elements
  .filter((e) => e.kind === 'slide-type')
  .sort((a, b) => (b.count || 0) - (a.count || 0) || a.key.localeCompare(b.key));

const CLASS = {
  'action-intro': 'chrome',
  'action-intro-journey': 'chrome',
  'module-intro': 'chrome',
  'section-break': 'chrome',
  summary: 'chrome',
  glossary: 'chrome',
  'path-step': 'chrome',
  'content-block': 'stuburas',
  'evaluator-prompt-block': 'stuburas',
  'warm-up-quiz': 'assessment',
  'test-intro': 'assessment',
  'test-section': 'assessment',
  'test-results': 'assessment',
  'practice-intro': 'assessment',
  'practice-scenario': 'assessment',
  'practice-scenario-hub': 'assessment',
  'practice-summary': 'assessment',
  'hallucination-pipeline': 'special',
  'hallucination-dashboard': 'special',
  'vaizdo-generatorius': 'special',
  'intro-action-pie': 'special',
  infographic: 'special',
  'workflow-summary': 'special',
};

let typeMd = `## SlideType katalogas (TE-3)

| Tipas | Count | Klasė | Unused |
| ----- | ----: | ----- | ------ |
`;
for (const e of typeRows) {
  const cls = CLASS[e.key] || (e.unused ? 'legacy/reserved' : 'stuburas');
  typeMd += `| \`${e.key}\` | ${e.count ?? 0} | ${cls} | ${e.unused ? 'taip' : ''} |\n`;
}
typeMd += `\n`;

const embedRows = overlay.elements.filter((e) => e.kind === 'embed');
let embedMd = `## Embeds (TE-3)

| elementId | Key | M/slide |
| --------- | --- | ------- |
`;
for (const e of embedRows.sort((a, b) => a.elementId.localeCompare(b.elementId))) {
  embedMd += `| \`${e.elementId}\` | \`${e.key}\` | M${e.moduleId}/${e.slideId} |\n`;
}
embedMd += `\n**Pastaba:** \`audit:embed-catalog\` EMBED_KEYS = 6 top-level; master taip pat skaičiuoja \`toolChoiceBar\`, \`pipelineDiagram\`, \`presentationToolsBlock\` (čia ${embedRows.length} eilutės).\n\n`;

const tableRows = overlay.elements.filter((e) => e.kind === 'table');
let tableMd = `## Lentelės (TE-3)

| elementId | M/slide | comparisonStyle | Heading |
| --------- | ------- | --------------- | ------- |
`;
for (const e of tableRows) {
  tableMd += `| \`${e.elementId}\` | M${e.moduleId}/${e.slideId} | ${e.comparisonStyle ? 'taip' : 'ne'} | ${(e.notes || '').replace(/\|/g, ' ')} |\n`;
}
tableMd += `\n`;

const byKind = {};
for (const e of overlay.elements) {
  const k = e.kind;
  byKind[k] ??= { n: 0, sum: 0, low: 0 };
  byKind[k].n += 1;
  byKind[k].sum += Number(e.maturity) || 0;
  if ((Number(e.maturity) || 0) <= 1) byKind[k].low += 1;
}

let scoreMd = `## Kind × maturity scorecard (TE-4)

| Kind | N | Avg maturity | Maturity ≤1 |
| ---- | -:| ------------:| -----------:|
`;
for (const [k, v] of Object.entries(byKind).sort()) {
  scoreMd += `| \`${k}\` | ${v.n} | ${(v.sum / v.n).toFixed(2)} | ${v.low} |\n`;
}

const p0 = overlay.elements
  .filter(
    (e) =>
      ['diagram', 'lab', 'off-renderer'].includes(e.kind) &&
      (Number(e.maturity) || 0) <= 1
  )
  .map((e) => e.elementId);
scoreMd += `\n**P0 (diagram/lab/off-renderer, maturity ≤1):** ${p0.length ? p0.map((id) => `\`${id}\``).join(', ') : '_nėra_'}.\n\n`;

const start = text.indexOf('## Lentelės (pildoma TE-2…TE-4)');
const alt = text.indexOf('## Diagramos, labai ir off-renderer');
const cut = start >= 0 ? start : alt;
const end = text.indexOf('\n## Nedaryti');
if (cut < 0 || end < 0) throw new Error('markers missing');
text =
  text.slice(0, cut) +
  diagramMd +
  typeMd +
  embedMd +
  tableMd +
  scoreMd +
  text.slice(end);

writeFileSync(regPath, text);
console.log('Updated TEACHING_ELEMENTS_REGISTRY.md tables');
