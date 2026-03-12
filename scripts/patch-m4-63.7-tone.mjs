#!/usr/bin/env node
/**
 * Patch M4 slide 63.7 (Praktika: COMBO) – tonas kaip 4.2a.
 * SOT: docs/turinio_pletra_moduliai_4_5_6.md § 4.2c-combo.
 * Run: node scripts/patch-m4-63.7-tone.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const modulesPath = join(__dirname, '..', 'src', 'data', 'modules.json');

const data = JSON.parse(readFileSync(modulesPath, 'utf8'));
const mod = data.modules.find((m) => m.id === 4);
const slide = mod?.slides?.find((s) => s.id === 63.7);
if (!slide?.content?.sections) {
  console.error('M4 or slide 63.7 not found');
  process.exit(1);
}

const sections = slide.content.sections;
const updates = [
  {
    heading: '1️⃣ Trumpai (30 s)',
    body: 'COMBO = vaidmuo + žingsnis po žingsnio + palyginimas + konkreti išvestis viename prompte. Paruošta M6 projektui – Modulyje 6 pritaikysi tą patį principą.',
  },
  {
    heading: 'PRAKTIKA: COMBO',
    body: 'Sujunk kelis metodus, kad gautum kokybišką rezultatą. Metodologinis pavyzdys – Modulyje 6 pritaikysi projekte.',
  },
  {
    heading: 'Tai apima:',
    body: '1. **Vaidmens priskyrimas** – pvz. „Elkis kaip programinės įrangos inžinierius“. 2. **Žingsnis po žingsnio instrukcija** – „Pateik vadovą, kaip įdiegti…“. 3. **Palyginimas** – „Palygink su tradiciniais…“. 4. **Konkreti išvestis** – „Sukurk Python kodą“ arba ataskaitos formatas.',
  },
  {
    heading: 'Tokenų valdymas',
    body: 'COMBO promptai gali būti ilgi – gerbk tokenų limitą (promptas + atsakymas); planuok max_tokens arba skaidyk į kelis promptus. Ryšys su Modulio 4 tokenų ekonomika (4.4).',
  },
];

for (const u of updates) {
  const sec = sections.find((s) => s.heading === u.heading);
  if (sec) sec.body = u.body;
}

writeFileSync(modulesPath, JSON.stringify(data, null, 2), 'utf8');
console.log('OK: M4 slide 63.7 – tonas atnaujintas.');
