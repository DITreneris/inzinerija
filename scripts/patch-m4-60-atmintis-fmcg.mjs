#!/usr/bin/env node
/**
 * Patch M4 slide 60 + SOT: FMCG → paprasta frazė (be akronimo), Memory → Atmintis.
 * Paprasta kalba (PAPRASTOS_KALBOS_GAIRES): ne angliškas terminas, ne sudėtingas FMCG.
 * Run: node scripts/patch-m4-60-atmintis-fmcg.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const modulesPath = join(root, 'src', 'data', 'modules.json');
const sotPath = join(root, 'docs', 'turinio_pletra_moduliai_4_5_6.md');

const data = JSON.parse(readFileSync(modulesPath, 'utf8'));
const mod = data.modules.find((m) => m.id === 4);
const slide = mod?.slides?.find((s) => s.id === 60);
if (!slide?.content?.sections) {
  console.error('M4 or slide 60 not found');
  process.exit(1);
}

// —— FMCG: visiškai pašalinti akronimą, tik paprasta frazė
const fmcgSimple = 'greitai gaminamų vartotojų produktų';
function replaceFMCG(text) {
  if (typeof text !== 'string') return text;
  return text
    .replace(/FMCG \(greitai gaminami vartotojų produktai\) distribucijoje/g, fmcgSimple + ' distribucijoje')
    .replace(/FMCG distribucijoje/g, fmcgSimple + ' distribucijoje');
}

// —— Memory → Atmintis (konceptas; produktų pavadinimus paliekame kaip „ChatGPT, Claude“)
function replaceMemoryWithAtmintis(text) {
  if (typeof text !== 'string') return text;
  return text
    .replace(/ChatGPT Memory, Claude Projects/g, 'ChatGPT, Claude')
    .replace(/Platformos atmintis \(ChatGPT, Claude\)/g, 'Platformos atmintis (pvz. ChatGPT, Claude)')
    .replace(/\bMemory\b/g, 'Atmintis');
}

// —— modules.json: slide 60 (title, shortTitle, subtitle, sections)
slide.title = slide.title.replace(/\bMemory\b/g, 'Atmintis').replace(/memory,/g, 'Atmintis,');
slide.shortTitle = slide.shortTitle ? slide.shortTitle.replace(/memory/g, 'Atmintis') : slide.shortTitle;
slide.subtitle = replaceMemoryWithAtmintis(slide.subtitle);

for (const sec of slide.content.sections) {
  sec.heading = replaceMemoryWithAtmintis(sec.heading);
  if (sec.body) {
    sec.body = replaceFMCG(sec.body);
    sec.body = replaceMemoryWithAtmintis(sec.body);
  }
  if (sec.table) {
    if (sec.table.headers) sec.table.headers = sec.table.headers.map(replaceMemoryWithAtmintis);
    if (sec.table.rows) {
      sec.table.rows = sec.table.rows.map((row) =>
        Array.isArray(row) ? row.map((cell) => (typeof cell === 'string' ? replaceMemoryWithAtmintis(cell) : cell)) : row
      );
    }
    if (sec.table.rowMeta) {
      sec.table.rowMeta = sec.table.rowMeta.map((m) => ({
        ...m,
        strengthBadge: m.strengthBadge ? replaceMemoryWithAtmintis(m.strengthBadge) : m.strengthBadge,
      }));
    }
  }
}

writeFileSync(modulesPath, JSON.stringify(data, null, 2), 'utf8');
console.log('OK: modules.json – skaidrė 60: FMCG → paprasta frazė, Memory → Atmintis.');

// —— SOT: docs/turinio_pletra_moduliai_4_5_6.md (4.2a skyrius)
let sot = readFileSync(sotPath, 'utf8');

sot = sot
  .replace(/Darbas su RAG: memory,/g, 'Darbas su RAG: Atmintis,')
  .replace(/Memory \(foninis kontekstas\)/g, 'Atmintis (foninis kontekstas)')
  .replace(/Kada Memory, o kada dokumentus/g, 'Kada Atmintis, o kada dokumentus')
  .replace(/kontekstą \(Memory\)/g, 'kontekstą (Atmintis)')
  .replace(/1\. Memory – ilgalaikis/g, '1. Atmintis – ilgalaikis')
  .replace(/ChatGPT Memory, Claude Projects/g, 'ChatGPT, Claude')
  .replace(/FMCG distribucijoje Baltijos/g, 'greitai gaminamų vartotojų produktų distribucijoje Baltijos')
  .replace(/Memory nėra dokumentų/g, 'Atmintis nėra dokumentų')
  .replace(/4\. Kada naudoti Memory,/g, '4. Kada naudoti Atmintis,')
  .replace(/→ Memory\. Reikia/g, '→ Atmintis. Reikia')
  .replace(/→ Memory \+ dokumentai/g, '→ Atmintis + dokumentai')
  .replace(/1\) \*\*Memory:\*\*/g, '1) **Atmintis:**')
  .replace(/Memory = kontekstas apie verslą/g, 'Atmintis = kontekstas apie verslą')
  .replace(/→ Memory \(brand\)/g, '→ Atmintis (brand)')
  .replace(/DARBAS SU RAG: MEMORY,/g, 'DARBAS SU RAG: ATMINTIS,');

writeFileSync(sotPath, sot, 'utf8');
console.log('OK: docs/turinio_pletra_moduliai_4_5_6.md – 4.2a: Atmintis, FMCG → paprasta frazė.');
console.log('Baigta.');