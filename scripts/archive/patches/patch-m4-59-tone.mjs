#!/usr/bin/env node
/**
 * Patch M4 slide 59 (Atviros duomenų bazės ir RAG) – tonas kaip 4.2a.
 * SOT: docs/turinio_pletra_moduliai_4_5_6.md § 4.2-open.
 * Run: node scripts/patch-m4-59-tone.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const modulesPath = join(__dirname, '..', 'src', 'data', 'modules.json');

const data = JSON.parse(readFileSync(modulesPath, 'utf8'));
const mod = data.modules.find((m) => m.id === 4);
const slide = mod?.slides?.find((s) => s.id === 59);
if (!slide?.content?.sections) {
  console.error('M4 or slide 59 not found');
  process.exit(1);
}

const sections = slide.content.sections;
const updates = [
  {
    heading: '1️⃣ Trumpai (30 s)',
    body:
      'RAG = užklausa → oficialus šaltinis → citavimas → išvada. Nurodyk šaltinius ir prašyk atsakymo su nuorodomis – atsakymai bus pagrįsti, ne „iš galvos“.',
  },
  {
    heading: '2️⃣ Daryk dabar',
    body:
      'Nukopijuok žemiau BVP pavyzdį ir paleisk DI (Eurostat arba data.europa.eu) – gausi atsakymą su datasetų nuorodomis. Tada išbandyk kitus promptus iš šios skaidrės.',
  },
  {
    heading: 'Vienas pavyzdys nuo A iki Z: BVP LT vs LV',
    body:
      'Klausimas: Ar Lietuvoje BVP augo sparčiau nei Latvijoje per 2020–2024 m.? Žingsniai: (1) Dataset nama_10_gdp. (2) Filtras: šalys LT, LV. (3) Metai: 2020–2024. (4) Atsakymas su citata (dataset, rodiklis, nuoroda). Nukopijuok promptą žemiau.',
  },
  {
    heading: 'Oficialūs atviri duomenų šaltiniai – 3 blokai',
    body:
      '**A. ES lygmuo:** Eurostat – ES statistikos (BVP, užimtumas, prekyba, demografija). data.europa.eu – įstatymai, ataskaitos, datasetai. OECD – tarptautinė lyginamoji statistika.\n\n**B. Lietuvos lygmuo:** e-TAR – pagrindinis teisės aktų šaltinis. Seimas – oficialūs įstatymai. Valstybės duomenų agentūra – statistika, API. Registrų centras – juridiniai asmenys, finansinės ataskaitos. VPT – pirkimų duomenys. Lietuvos bankas – finansų statistika.\n\n**Teisės aktų atveju – tik galiojanti redakcija iš e-TAR.**\n\n**C. RAG taisyklės:** Tik oficialūs šaltiniai. Nurodyk dataset ID arba šaltinio pavadinimą. Cituok nuorodas. Patikrink galiojimo datą.',
  },
  {
    heading: '🔽 Kiti tarptautiniai šaltiniai',
    body:
      'data.gov (JAV) – JAV valstybiniai duomenys. Pasaulio banko atviri duomenys – tarptautinė statistika. Baltijos/ES auditorijai dažniau naudojami Eurostat ir data.europa.eu.',
  },
  {
    heading: 'Lentelė „Pavyzdžiai“',
    body:
      'Keturi tipiniai atvejai: ką prašyti ir ką gausi – oficialūs šaltiniai ir nuorodos.',
  },
  {
    heading: 'Mini-promptas: Eurostat šablonas',
    body: 'Naudok tik Eurostat duomenis. Prašyk atsakymo su datasetų pavadinimais ir nuorodomis.',
  },
  {
    heading: 'Mini-promptas: atvirų šaltinių sąrašas',
    body:
      'Geras variantas: suskirstyk į kategorijas (statistika, teisė, verslas, finansai, pirkimai), nurodyk instituciją, nuorodą ir ar turi API.',
  },
  {
    heading: '4️⃣ Patikra: anti-haliucinacijos RAG taisyklė',
    body:
      '**1.** Nėra dataset ar šaltinio nuorodos → atsakymas netinkamas.\n**2.** Nėra metų arba rodiklio kodo (pvz. nama_10_gdp) → atsakymas nepakankamas.\n**3.** Šaltinis neoficialus → atmesti.\n\nPilna tema apie haliucinacijas – vėliau modulyje (skaidrė 4.6a).',
  },
];

for (const u of updates) {
  const sec = sections.find((s) => s.heading === u.heading);
  if (sec) sec.body = u.body;
}

writeFileSync(modulesPath, JSON.stringify(data, null, 2), 'utf8');
console.log('OK: M4 slide 59 – tonas atnaujintas.');
