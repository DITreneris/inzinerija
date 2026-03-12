#!/usr/bin/env node
/**
 * Patch M4 slide 52.5 (Skyrius: RAG ir gilusis tyrimas) – tonas kaip 4.2a.
 * SOT: docs/turinio_pletra_moduliai_4_5_6.md §1.6.
 * Run: node scripts/patch-m4-52.5-tone.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const modulesPath = join(__dirname, '..', 'src', 'data', 'modules.json');

const data = JSON.parse(readFileSync(modulesPath, 'utf8'));
const mod = data.modules.find((m) => m.id === 4);
const slide = mod?.slides?.find((s) => s.id === 52.5);
if (!slide?.content) {
  console.error('M4 or slide 52.5 not found');
  process.exit(1);
}

slide.content.celebrationText =
  'Puiku! Pamatai paruošti – dabar atsakymai iš tavo šaltinių ir dokumentų.';
slide.content.recap = {
  heading: 'Ką jau žinai?',
  lead: 'Prieš RAG ir gilusį tyrimą – šie žingsniai jau įveikti.',
  items: [
    'Moki, kaip DI naudoja įrankius ir paima duomenis iš šaltinių (suvienyta schema).',
    'Supranti skirtumą: kada liepi „padaryk pats“, kada „ieškok ir atsakyk“.',
    'Turi 8 žingsnių procesą – pagrindą tolesniems metodams.',
    'Žinai pagrindinius įrankius (ChatGPT, Claude, Gemini) – gali pereiti prie darbų su šaltiniais.',
  ],
  itemGlossaryTerms: ['Tool Use', 'Metodinis promptas', 'Proceso promptas', 'Įrankis (tool)'],
};
slide.content.nextSteps = [
  'RAG – kaip nurodyti šaltinius prompte ir gauti atsakymus iš dokumentų.',
  'Atviros duomenų bazės ir DI atmintis – oficialūs šaltiniai ir įrankiai.',
  'Patikrintos strategijos – žingsnis po žingsnio ir gilusis tyrimas.',
  'COMBO – sujungti kelis metodus viename prompte praktiškai.',
];

writeFileSync(modulesPath, JSON.stringify(data, null, 2), 'utf8');
console.log('OK: M4 slide 52.5 – tonas atnaujintas.');
