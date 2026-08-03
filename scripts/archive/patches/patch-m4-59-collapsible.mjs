#!/usr/bin/env node
/**
 * Prideda collapsible prie skaidrės 59 (Atviros duomenų bazės ir RAG) ilgų sekcijų.
 * Naudojimas: node scripts/patch-m4-59-collapsible.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const path = `${__dirname}/../src/data/modules.json`;
let json = readFileSync(path, 'utf8');

// 1) Oficialūs atviri duomenų šaltiniai – 3 blokai (unique: po jo eina "🔽 Kiti tarptautiniai")
json = json.replace(
  '"blockVariant": "brand"\n              },\n              {\n                "heading": "🔽 Kiti tarptautiniai šaltiniai"',
  '"blockVariant": "brand",\n                "collapsible": true,\n                "collapsedByDefault": true\n              },\n              {\n                "heading": "🔽 Kiti tarptautiniai šaltiniai"'
);

// 2) Lentelė „Pavyzdžiai“ (unique: body text then "table")
json = json.replace(
  /"body": "Keturi tipiniai RAG scenarijai su oficialiais šaltiniais – užklausos pavyzdys ir ką gauni\.",\s*\n\s*"blockVariant": "terms",\s*\n\s*"table":/,
  '"body": "Keturi tipiniai RAG scenarijai su oficialiais šaltiniais – užklausos pavyzdys ir ką gauni.",\n                "blockVariant": "terms",\n                "collapsible": true,\n                "collapsedByDefault": true,\n                "table":'
);

// 3) Mini-promptas: Eurostat šablonas
json = json.replace(
  '"heading": "Mini-promptas: Eurostat šablonas",\n                "body": "Naudok tik Eurostat duomenis. Pateik atsakymą su datasetų pavadinimais ir nuorodomis.",\n                "blockVariant": "terms",\n                "copyable":',
  '"heading": "Mini-promptas: Eurostat šablonas",\n                "body": "Naudok tik Eurostat duomenis. Pateik atsakymą su datasetų pavadinimais ir nuorodomis.",\n                "blockVariant": "terms",\n                "collapsible": true,\n                "collapsedByDefault": true,\n                "copyable":'
);

// 4) Mini-promptas: atvirų šaltinių sąrašas
json = json.replace(
  '"heading": "Mini-promptas: atvirų šaltinių sąrašas",\n                "body": "Geras variantas – suskirstyk į kategorijas ir nurodyk instituciją, nuorodą, duomenų tipą, ar turi API.",\n                "blockVariant": "terms",\n                "copyable":',
  '"heading": "Mini-promptas: atvirų šaltinių sąrašas",\n                "body": "Geras variantas – suskirstyk į kategorijas ir nurodyk instituciją, nuorodą, duomenų tipą, ar turi API.",\n                "blockVariant": "terms",\n                "collapsible": true,\n                "collapsedByDefault": true,\n                "copyable":'
);

writeFileSync(path, json);
console.log('Skaidrė 59: 4 sekcijoms pridėta collapsible.');
