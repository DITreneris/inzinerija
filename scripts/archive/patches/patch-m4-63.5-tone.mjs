#!/usr/bin/env node
/**
 * Patch M4 slide 63.5 (Savitikra: RAG) – trumpesni paaiškinimai, vienodas tonas.
 * Plan: jei per ilgi ar žargoniški – vienas trumpas sakinys; kitaip palikti.
 * Run: node scripts/patch-m4-63.5-tone.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const modulesPath = join(__dirname, '..', 'src', 'data', 'modules.json');

const data = JSON.parse(readFileSync(modulesPath, 'utf8'));
const mod = data.modules.find((m) => m.id === 4);
const slide = mod?.slides?.find((s) => s.id === 63.5);
if (!slide?.content?.questions) {
  console.error('M4 or slide 63.5 not found');
  process.exit(1);
}

const explanations = {
  'check-rag-1': 'Supranti RAG esmę: atsakymas iš tavo šaltinių (dokumentai, duomenys), ne iš atminties. Jei klaidingai – žr. skaidrę RAG (4.2), „Kas yra RAG?“',
  'check-rag-2': 'Teisingai – „Nežinau“ mažina haliucinacijų riziką. Jei klaidingai – žr. skaidrę RAG (4.2) ir mini-šabloną su „Nežinau“.',
  'check-rag-3': 'RAG: paieška šaltiniuose → atranka fragmentų → generavimas atsakymo. Jei klaidingai – žr. skaidrę 4.2, „Kaip veikia (3 žingsniai)“.',
  'check-rag-4': 'RAG „inkaruoja“ atsakymą šaltiniuose – mažiau išgalvojimų. Jei klaidingai – žr. skaidres 4.2 ir 4.6.',
  'check-rag-5': 'Prasenę ar netikslūs šaltiniai = neįtikimi atsakymai; todėl duomenų paruošimas svarbus. Jei klaidingai – žr. skaidrę 4.2b.',
};

for (const q of slide.content.questions) {
  if (q.id && explanations[q.id]) q.explanation = explanations[q.id];
}

writeFileSync(modulesPath, JSON.stringify(data, null, 2), 'utf8');
console.log('OK: M4 slide 63.5 – savitikros paaiškinimai sutrumpinti.');
