#!/usr/bin/env node
/**
 * Patch M4 slide 62 (Basic duomenų paruošimas RAG) – tonas kaip 4.2a.
 * SOT: docs/turinio_pletra_moduliai_4_5_6.md § 4.2b.
 * Run: node scripts/patch-m4-62-tone.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const modulesPath = join(__dirname, '..', 'src', 'data', 'modules.json');

const data = JSON.parse(readFileSync(modulesPath, 'utf8'));
const mod = data.modules.find((m) => m.id === 4);
const slide = mod?.slides?.find((s) => s.id === 62);
if (!slide?.content?.sections) {
  console.error('M4 or slide 62 not found');
  process.exit(1);
}

const sections = slide.content.sections;
const updates = [
  {
    heading: '1️⃣ Trumpai (30 s)',
    body: '5 patarimai: išvalymas, santraukos, anonsavimas, metaduomenys, fragmentai (chunk). Gerai paruošti duomenys = tikslesnis RAG atsakymas. Žemiau – kopijuojami promptai paruošimui.',
  },
  {
    heading: '5 patarimai patikimumui',
    body: '1) Išvalymas – pašalink perteklinius tarpus, sugadintus simbolius, dubliavimus; išlaikyk UTF-8. 2) Santraukos – ilgiems dokumentams pridėk trumpą santrauką (vadovybės santrauka) pradžioje; RAG greičiau randa atitikmenis. 3) Anonsavimas – aiškios antraštės, skyrių pavadinimai, sąrašai; trumpas turinio anonsas – modelis geriau orientuojasi. 4) Metaduomenys – šaltinio pavadinimas, data, tipas prie bloko; RAG gali cituoti ir filtruoti. 5) Fragmentai (chunk) – skirk logiškus fragmentus (pastraipa, skyrius), ne per ilgus; logiški fragmentai = tikslesnė paieška.',
  },
  {
    heading: 'Terminas paprasta kalba: chunk (fragmentas)',
    body: '**Fragmentas** – vienas logiškas teksto gabalas, į kurį skaidai dokumentą RAG sistemai (pvz. viena pastraipa, skyrius arba tema). Vietoj ilgo failo į paiešką – mažesni, prasmingi fragmentai; tada RAG randa tik tą gabalą, kuris atitinka klausimą. **Kaip naudoti:** ribą renk pagal prasmę (viena mintis / pastraipa); vengk per ilgų fragmentų be antraščių; prie kiekvieno – trumpa antraštė arba santrauka.',
  },
  {
    heading: 'Kopijuojami promptai (paruošimui su DI)',
    body: 'Išvalymas: „Išvalyk šį tekstą: pašalink perteklinius tarpus ir dubliavimus, išlaikyk vienodą kodavimą. Išvestį pateik kaip paruoštą RAG šaltiniui.“ Santrauka: „Padaryk 2–3 sakinius santrauką šio dokumento pradžiai. Tikslas – RAG greičiau rastų atitikmenis.“ Anonsavimas: „Pridėk aiškias antraštes ir skyrių pavadinimus; jei reikia – trumpą turinio anonsą pradžioje. Formatas: paruošta RAG kontekstui.“ Metaduomenys: „Prie šio teksto pridėk metaduomenis: šaltinio pavadinimas, data, tipas (pvz. ataskaita/įstatymas). Pateik kaip aiškiai pažymėtą bloką pradžioje.“ Fragmentai (chunking): „Suskirstyk šį dokumentą į logiškus fragmentus (pastraipos arba skyriai); prie kiekvieno pridėk trumpą antraštę. Tikslas – paruošti RAG paieškai.“',
  },
];

for (const u of updates) {
  const sec = sections.find((s) => s.heading === u.heading);
  if (sec) sec.body = u.body;
}

writeFileSync(modulesPath, JSON.stringify(data, null, 2), 'utf8');
console.log('OK: M4 slide 62 – tonas atnaujintas.');
