#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(readFileSync(join(root, 'src/data/modules.json'), 'utf8'));
const rows = [];
for (const mod of data.modules) {
  for (const slide of mod.slides || []) {
    for (const s of slide.content?.sections || []) {
      if (s?.table) {
        rows.push({
          m: mod.id,
          id: slide.id,
          heading: (s.heading || '').slice(0, 48),
          cols: (s.table.headers || []).length,
          cmp: Boolean(s.table.comparisonStyle),
          tool: Boolean(s.toolChoiceBar),
        });
      }
    }
  }
}
const slideCount = new Set(rows.map((r) => `${r.m}:${r.id}`)).size;
let md = `Lentelės apibrėžtos \`modules.json\` sekcijose su \`section.table\`. Renderinimas – \`ContentSlides.tsx\` (vienas bendras blokas \`section.table && !section.workflowChains\`).

> Atnaujinta TE-3 (2026-07-24) iš live SOT: **${rows.length}** table / **${slideCount}** skaidrių. Master: \`TEACHING_ELEMENTS_REGISTRY.md\`.

| Skaidrė | Heading (trumpai) | Stulpeliai | comparisonStyle | Pastabos |
| ------- | ----------------- | ---------: | --------------- | -------- |
`;
for (const r of rows) {
  const h = (r.heading || '—').replace(/\|/g, '/');
  md += `| M${r.m} / ${r.id} | ${h} | ${r.cols} | ${r.cmp ? '**taip**' : 'ne'} | ${r.tool ? 'toolChoiceBar' : ''} |\n`;
}
md += `\n**Patobulinimai:** žr. \`TEACHING_ELEMENTS_REGISTRY.md\` scorecard; auditas \`npm run audit:teaching-elements\`.\n`;

const path = join(root, 'docs/development/LENTELIU_STANDARTAS.md');
let t = readFileSync(path, 'utf8');
const a = t.indexOf('Lentelės apibrėžtos');
const b = t.indexOf('\n---\n\n## 6. Nuorodos');
if (a < 0 || b < 0) throw new Error(`markers ${a} ${b}`);
writeFileSync(path, t.slice(0, a) + md + t.slice(b));
console.log('LENTELIU §5 rows', rows.length, 'slides', slideCount);
