#!/usr/bin/env node
/**
 * M16-PLAIN-C: delete 16.9 into 16.85; sharpen 16.7 vs 16.18; renumber footers.
 * Usage: node scripts/patch-m16-plain-c.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const path = join(root, 'src', 'data', 'modules.json');
const data = JSON.parse(readFileSync(path, 'utf8'));
const mod = data.modules.find((m) => m.id === 16);
if (!mod) {
  console.error('Module 16 not found');
  process.exit(1);
}

function slide(id) {
  const s = mod.slides.find((x) => x.id === id);
  if (!s) throw new Error(`Slide ${id} not found`);
  return s;
}

// —— 16.7 role sharpen ——
{
  const s = slide(16.7);
  s.content.sections[1].body =
    'Brief’e vėliau – Must / Should / Won’t (tos pačios zonos angliškai).';
  s.content.sections[2].body =
    'Įmesk 5 savo idėjas į tris stulpelius (Būtina / Galima / Nekuriame).\nPavyzdys (dienos prioritetai): Būtina – Top 3; Galima – priminimas; Nekuriame – prisijungimas, mokėjimai, admin.';
}

// —— 16.85 absorb 16.9 ——
{
  const s = slide(16.85);
  s.content.subtitle =
    'Toliau išgryninsi idėją ir surašysi brief’ą (vienas dokumentas). Dar ne kodas.';
  s.content.celebrationText =
    'Puiku! 5 kortelės laukai – tiltas į brief. Checklist: naudotojas · problema · vertė · 1 funkcija · kaip žinosi.';
  s.content.recap.items = [
    'Problema prieš sprendimą – konkretus naudotojas ir pasekmė.',
    'Vertė ≠ funkcija; triage: Būtina / Galima / Nekuriame.',
    'Kūrimo kortelė: 5 laukai kaip įvestis į brief.',
    'Checklist: naudotojas · problema · vertė · 1 funkcija · kaip žinosi.',
  ];
  s.content.recap.itemGlossaryTerms = [
    '',
    'Triage (Būtina dabar / Galima vėliau / Nekuriame)',
    '',
    '',
  ];
}

// —— Delete 16.9 ——
const before = mod.slides.length;
mod.slides = mod.slides.filter((s) => s.id !== 16.9);
if (mod.slides.length !== before - 1) {
  console.error('Failed to delete 16.9');
  process.exit(1);
}

// —— 16.18 role sharpen ——
{
  const s = slide(16.18);
  s.content.sections[2].body =
    'Užpildyk brief laukus: Must (≤4) / Should / Won’t (≥3) ir Dabar→Toliau→Vėliau.\nPavyzdys: Must – Top 3 per <2 min; Should – priminimas po pirmos patikros; Won’t – prisijungimas / mokėjimai.';
}

// —— Footer renumber (1-based next index) ——
for (let i = 0; i < mod.slides.length; i++) {
  const s = mod.slides[i];
  if (!s.content?.footer) continue;
  const next = mod.slides[i + 1];
  if (!next) {
    if (s.id === 16.22) {
      s.content.footer = 'Toliau – Modulis 17: Žinių patikrinimas';
    }
    continue;
  }
  s.content.footer = `Toliau – skaidrė ${i + 2}: ${next.title}`;
}

writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
console.log(`M16-PLAIN-C: deleted 16.9; slides now ${mod.slides.length}`);
console.log('order:', mod.slides.map((s) => s.id).join(', '));
