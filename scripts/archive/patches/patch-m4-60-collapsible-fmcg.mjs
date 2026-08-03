#!/usr/bin/env node
/**
 * Patch M4 slide 60: FMCG paaiškinimas + collapsible Memory, Išoriniai, Duomenų paruošimas, Lentelė.
 * Auditas: docs/development/M4_SKAIDRE_60_RAG_MEMORY_UI_UX_AUDITAS_DETALUS.md §9.
 * Run: node scripts/patch-m4-60-collapsible-fmcg.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const modulesPath = join(__dirname, '..', 'src', 'data', 'modules.json');

const data = JSON.parse(readFileSync(modulesPath, 'utf8'));
const mod = data.modules.find((m) => m.id === 4);
const slide = mod?.slides?.find((s) => s.id === 60);
if (!slide?.content?.sections) {
  console.error('M4 or slide 60 not found');
  process.exit(1);
}

const sections = slide.content.sections;
let changed = 0;

for (const sec of sections) {
  if (sec.heading === '2️⃣ Memory – ilgalaikis kontekstas apie verslą') {
    if (sec.body && !sec.body.includes('FMCG (greitai gaminami')) {
      sec.body = sec.body.replace(
        'FMCG distribucijoje',
        'FMCG (greitai gaminami vartotojų produktai) distribucijoje'
      );
      changed++;
    }
    sec.collapsible = true;
    sec.collapsedByDefault = true;
    changed++;
  } else if (sec.heading === '3️⃣ Išoriniai šaltiniai – tikras RAG versle') {
    sec.collapsible = true;
    sec.collapsedByDefault = true;
    changed++;
  } else if (sec.heading === '4️⃣ Duomenų paruošimas – 80% rezultato') {
    sec.collapsible = true;
    sec.collapsedByDefault = true;
    changed++;
  } else if (
    sec.heading === 'Sprendimo matrica: Memory vs Dokumentai' ||
    sec.heading === 'Kada naudoti Memory, o kada dokumentus?'
  ) {
    sec.collapsible = true;
    sec.collapsedByDefault = true;
    changed++;
  }
}

writeFileSync(modulesPath, JSON.stringify(data, null, 2), 'utf8');
console.log('OK: M4 slide 60 – FMCG + collapsible (Memory, Išoriniai, Duomenų paruošimas, Lentelė).');
