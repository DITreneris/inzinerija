#!/usr/bin/env node
/**
 * Patch M4 slide 63 (4 strategijos, kurios pakelia DI atsakymų kokybę) – tonas kaip 4.2a.
 * SOT: docs/turinio_pletra_moduliai_4_5_6.md § 4.2c.
 * Run: node scripts/patch-m4-63-tone.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const modulesPath = join(__dirname, '..', 'src', 'data', 'modules.json');

const data = JSON.parse(readFileSync(modulesPath, 'utf8'));
const mod = data.modules.find((m) => m.id === 4);
const slide = mod?.slides?.find((s) => s.id === 63);
if (!slide?.content?.sections) {
  console.error('M4 or slide 63 not found');
  process.exit(1);
}

const sections = slide.content.sections;
const updates = [
  {
    heading: '1️⃣ Trumpai (30 s)',
    body: 'Trys strategijos: žingsnis po žingsnio, mąstymo grandinė (CoT), palyginimai ir analogijos. Tinka RAG ir Deep research – bendros geriausios praktikos. Žemiau – pavyzdžiai ir integracija.',
  },
  {
    heading: '1. Žingsnis po žingsnio',
    body: 'Prašyk DI išskaidyti sudėtingą užduotį į mažesnius, nuoseklius žingsnius. Pvz.: „Pateik žingsnis po žingsnio gidą: kaip įgyvendinti rinkodaros kampaniją socialiniuose tinkluose.“ Sudėtingą klausimą gali išskaidyti prieš perduodant RAG; RAG ištrauką pateik žingsniais.',
  },
  {
    heading: '2. Mąstymo grandinė (CoT)',
    body: 'Prašyk DI mąstyti nuosekliai, ne iš karto pateikti išvadą. Pvz.: „Paaiškink, kaip veikia kainodaros strategijos – nuo produkto pozicionavimo iki galutinės kainos.“ CoT padeda sintezuoti kelis šaltinius ir sudėlioti argumentuotą atsakymą; Deep research naudoja CoT.',
  },
  {
    heading: '3. Palyginimai ir analogijos',
    body: 'Prašyk DI palyginti sąvokas ar naudoti analogijas – sudėtingos idėjos tampa suprantamesnės. Pvz.: „Palygink tradicinę ir skaitmeninę rinkodarą; nurodyk, kada geriausia naudoti kiekvieną.“ RAG atsakymą galima prašyti pateikti palyginimo forma iš kelių šaltinių.',
  },
  {
    heading: 'Integracija',
    body: 'Šios trys strategijos tinka ir RAG (duomenų paruošimas, užklausų formulavimas), ir Deep research (žingsniai, samprotavimas, sintezė) – bendros geriausios praktikos Modulio 4 darbe su DI.',
  },
];

for (const u of updates) {
  const sec = sections.find((s) => s.heading === u.heading);
  if (sec) sec.body = u.body;
}

writeFileSync(modulesPath, JSON.stringify(data, null, 2), 'utf8');
console.log('OK: M4 slide 63 – tonas atnaujintas.');
