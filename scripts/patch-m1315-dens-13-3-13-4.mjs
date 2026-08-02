/**
 * M1315-DENS soft pass: LT 13.3 + 13.4 density (tools/brand collapse, Trumpai trim).
 * Run: node scripts/patch-m1315-dens-13-3-13-4.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const path = resolve(root, 'src/data/modules.json');
const data = JSON.parse(readFileSync(path, 'utf8'));
const mod = data.modules.find((m) => m.id === 13);
const s33 = mod.slides.find((s) => s.id === 13.3);
const s34 = mod.slides.find((s) => s.id === 13.4);

s33.content.toolsCollapsible = true;
const brand = s33.content.sections.find(
  (s) => s.heading.includes('Brand') || s.heading.includes('Prekės ženklo'),
);
brand.heading = 'Prekės ženklo nuoseklumas';
brand.collapsible = true;
brand.collapsedByDefault = true;

s34.content.sections[0].body =
  'Trumpam vaizdo įrašui reikia aiškaus scenarijaus, tono ir kameros. Geriau 2–4 trumpi klipai (3–5 s) nei vienas ilgas one-shot – stills užrakink prieš brangų video.';

s34.content.sections.find((s) => s.heading === 'Patikra').body =
  'Ar video pradžia panaši į hero? Ar produktas ar personažas neišsikraipė? Jei ne – supaprastink sceną arba stiprink reference (tas pats produktas, stilius ir spalvos).';

const same = s34.content.sections.find((s) => s.heading.startsWith('Ta pati'));
same.body =
  'Tas pats reference + „same product / same style“. Venk realių veidų ar balsų be sutikimo.';

writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`);
console.log('Patched LT 13.3 + 13.4 for M1315-DENS');
