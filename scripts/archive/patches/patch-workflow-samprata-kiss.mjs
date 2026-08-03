#!/usr/bin/env node
/**
 * Workflow Samprata (id 15) Kiss/Marry/Kill – intro ir examples.
 * Naudojimas: node scripts/patch-workflow-samprata-kiss.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const path = `${__dirname}/../src/data/modules.json`;
let json = readFileSync(path, 'utf8');

// 1) Intro – sutrumpinti iki framing sakinio
const oldIntro = 'Ar tavo DI atsakymas – pokalbis ar darbo rezultatas? Skirtumas – vienas žodis: struktūra. Perjunk į Workflow (darbo eigą) ir įrašyk 3–5 žodžius – pamatysi, kaip keičiasi rezultato forma.';
const newIntro = 'Skirtumas paprastas: Pokalbis = laisvas atsakymas. Workflow = struktūruotas rezultatas.';
if (json.includes(oldIntro)) {
  json = json.replace(oldIntro, newIntro);
} else {
  console.warn('Intro string not found – check modules.json id 15');
}

// 2) Examples – palikti tik Workflow (1 pavyzdys)
json = json.replace(
  /"examples": \[\s*\{\s*"title": "Pokalbis",\s*"prompt": "Paaiškink, kas yra promptų inžinerija, trumpai ir aiškiai."\s*\},\s*\{\s*"title": "Workflow \(darbo eiga\)",\s*"prompt": "Sukurk 5 punktų paaiškinimą apie promptų inžineriją\. Formatas: numeruotas sąrašas\. Tonas: profesionalus\. Maks\. 120 žodžių\."\s*\}\s*\]/,
  '"examples": [\n              {\n                "title": "Workflow (darbo eiga)",\n                "prompt": "Sukurk 5 punktų paaiškinimą apie promptų inžineriją. Formatas: numeruotas sąrašas. Tonas: profesionalus. Maks. 120 žodžių."\n              }\n            ]'
);

writeFileSync(path, json);
console.log('Workflow Samprata (id 15): intro sutrumpintas, examples – 1 (Workflow).');
