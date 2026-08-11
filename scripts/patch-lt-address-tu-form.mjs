#!/usr/bin/env node
/**
 * LT kreipinys → `tu` forma (AGENTS.md universalios taisyklės).
 *
 * Šios liekanos praslydo, nes `audit:en-language-m7-m9` LT pusėje tikrino tik
 * penkis šablonus (`JŪSŲ`, `jūsų`, `galite`, `Paspauskite`, `Įrašykite`) ir
 * skaitė vien `modules.json` – žodynėlis, promptų biblioteka, atmintinės ir
 * `lt.json` liko nepatikrinti. Vartai: `npm run audit:lt-address`.
 *
 * Tekstinis keitimas, ne JSON.parse/stringify: round-trip perrašytų kiekvieną
 * kompaktišką masyvą ir paskandintų tikrą pakeitimą formatavimo triukšme.
 */
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dataDir = join(root, 'src', 'data');

/** [failas, [[iš, į, kiek tikimės]]] – neatitikęs kiekis stabdo skriptą. */
const EDITS = [
  [
    join(dataDir, 'modules.json'),
    [
      ['dažniau nei manytumėte', 'dažniau nei manytum', 1],
      ['apibendrinti, kas sutarėte', 'apibendrinti, kas sutarta', 1],
      // „atsako anglai“ = korektūros klaida (turi būti „angliškai“).
      [
        'Kai DI atsako anglai, nors prašėte lietuviškai',
        'Kai DI atsako angliškai, nors prašei lietuviškai',
        1,
      ],
      ['kelias – ką čia rasite', 'kelias – ką čia rasi', 1],
    ],
  ],
  [
    join(dataDir, 'glossary.json'),
    [
      ['ką turite prieš pradedant', 'ką turi prieš pradedant', 1],
      ['Rolė (kas esate)', 'Rolė (kas esi)', 1],
      ['ko norite gauti', 'ko nori gauti', 1],
    ],
  ],
  [
    join(dataDir, 'promptLibrary.json'),
    [
      // Vienodinam su `modules.json` konvencija: [APRAŠYK], [ĮRAŠYK].
      ['[APRAŠYKITE UŽDUOTĮ]', '[APRAŠYK UŽDUOTĮ]', 1],
      ['[ĮRAŠYKITE]', '[ĮRAŠYK]', 7],
    ],
  ],
  [
    join(dataDir, 'm6HandoutContent.json'),
    [
      [
        'Kai pakeičiate promptą – išsaugokite kopiją su data arba v1, v2; vėliau matysite, kas veikė geriau.',
        'Kai pakeiti promptą – išsaugok kopiją su data arba v1, v2; vėliau matysi, kas veikė geriau.',
        1,
      ],
      [
        'pakeitėte promptą ir per 1 min patikrinate',
        'pakeitei promptą ir per 1 min patikrini',
        1,
      ],
      [
        'Kurį įgūdį naudosite pirmiausia darbe? (3) Ką dar norėtumėte išmokti',
        'Kurį įgūdį naudosi pirmiausia darbe? (3) Ką dar norėtum išmokti',
        1,
      ],
    ],
  ],
  [
    join(root, 'src', 'locales', 'lt.json'),
    [
      ['medžiagos. Pabandykite iš naujo.', 'medžiagos. Pabandyk iš naujo.', 1],
      [
        'klaida. Bandykite atnaujinti puslapį arba grįžti atgal.',
        'klaida. Bandyk atnaujinti puslapį arba grįžti atgal.',
        1,
      ],
      ['Slinkite horizontaliai', 'Slink horizontaliai', 1],
      ['turinys. Slenkite į kairę', 'turinys. Slink į kairę', 1],
      ['Paskutinį kartą buvote skaidrėje', 'Paskutinį kartą buvai skaidrėje', 1],
      [
        'Norėdami naudoti mokymus, įsigykite prieigą.',
        'Nori naudoti mokymus? Įsigyk prieigą.',
        1,
      ],
      ['{{n}}: pasirinkite pasitikėjimą', '{{n}}: pasirink pasitikėjimą', 1],
      ['{{n}}: atsakykite', '{{n}}: atsakyk', 1],
      ['{{n}}: sujunkite visas poras', '{{n}}: sujunk visas poras', 1],
      ['(META) – ką kuriate, kam', '(META) – ką kuri, kam', 1],
      ['kokius duomenis naudojate.', 'kokius duomenis naudoji.', 1],
      [
        'Sveikiname! Esate pasiruošę Duomenų analizės kelio projektui',
        'Sveikiname! Esi pasiruošęs Duomenų analizės kelio projektui',
        1,
      ],
      ['Praktikuokite kasdien', 'Praktikuok kasdien', 1],
      ['Kurkite šablonų biblioteką', 'Kurk šablonų biblioteką', 1],
      ['Iteruokite ir tobulinkite', 'Iteruok ir tobulink', 1],
      ['Kas esate ir ką darote?', 'Kas esi ir ką darai?', 1],
      ['kurias rasite šiuose mokymuose', 'kurias rasi šiuose mokymuose', 1],
      ['Naudokite taisykles „Kaip naudoti?“', 'Naudok taisykles „Kaip naudoti?“', 1],
      [
        'Naudokite juos turinio patikimumui vertinti',
        'Naudok juos turinio patikimumui vertinti',
        1,
      ],
      ['nerasta. Pabandykite pakeisti paieškos', 'nerasta. Pabandyk pakeisti paieškos', 1],
      ['rezultatus vertinkite kritiškai', 'rezultatus vertink kritiškai', 1],
      ['Aplankykite svetainę', 'Aplankyk svetainę', 1],
      // „sekančioje“ → „kitoje“ (sekantis = einantis iš paskos, ne „next“).
      [
        'pavyzdžius rasite **sekančioje skaidrėje**',
        'pavyzdžius rasi **kitoje skaidrėje**',
        1,
      ],
    ],
  ],
];

let total = 0;
for (const [file, edits] of EDITS) {
  let text = readFileSync(file, 'utf8');
  for (const [from, to, expected] of edits) {
    const count = text.split(from).length - 1;
    if (count === 0 && text.includes(to)) continue; // jau pritaikyta
    if (count !== expected) {
      throw new Error(
        `${file}: "${from}" rasta ${count}×, tikėta ${expected}× – nutraukiama`
      );
    }
    text = text.split(from).join(to);
    total += count;
  }
  writeFileSync(file, text);
  console.log(`${file.replace(root, '.')}: ${edits.length} pakeitimų grupė(s)`);
}

console.log(`\nIš viso pakeista: ${total}. Toliau: npm run audit:lt-address`);
