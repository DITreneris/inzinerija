#!/usr/bin/env node
/**
 * LT kreipinys `tu` komponentų / content modulių stringuose.
 *
 * Antra banga: pirmasis praėjimas tikrino tik JSON ir `lt.json`, o komponentai
 * turi hardcoded LT fallback'us prie EN dvynio (`locale === 'en' ? … : …`), tad
 * `Esate pasiruošę`, `Dalinkitės su komanda` ir visas M10 lab tekstas liko
 * `Jūs` forma. Vartai dabar skaito ir `src/**` string literalus.
 */
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = (...p) => join(root, 'src', ...p);

const EDITS = [
  [
    src('locales', 'lt.json'),
    [
      ['Mokykitės kurti efektyvius', 'Mokykis kurti efektyvius', 2],
      ['Dalinkitės su komanda', 'Dalinkis su komanda', 1],
    ],
  ],
  [
    src('components', 'CertificateScreen.tsx'),
    [['nepavyko. Bandykite dar kartą.', 'nepavyko. Bandyk dar kartą.', 1]],
  ],
  [
    src('components', 'slides', 'shared', 'm10TeamReadinessContent.ts'),
    [
      ['Pirma sutarkite bendrą bazę', 'Pirma sutark bendrą bazę', 1],
      ['Pradėkite nuo vieno bendro naudojimo atvejo', 'Pradėk nuo vieno bendro naudojimo atvejo', 1],
      ['nevadinkite to brandos lygiu', 'nevadink to brandos lygiu', 1],
      ['Sutarkite vieną bendrą naudojimo atvejį', 'Sutark vieną bendrą naudojimo atvejį', 1],
      ['Sukurkite vieną prompto šabloną', 'Sukurk vieną prompto šabloną', 1],
      ['Naudokite jį pasirinktam procesui', 'Naudok jį pasirinktam procesui', 1],
      [
        'Paleiskite vieną rolių praktiką, palyginkite rezultatus ir užrašykite vieną taisyklę',
        'Paleisk vieną rolių praktiką, palygink rezultatus ir užrašyk vieną taisyklę',
        1,
      ],
      ['Pasirinkite vieną bendrą procesą', 'Pasirink vieną bendrą procesą', 1],
      // „didindami“ = daugyb. dalyvis → vienaskaita kartu su `tu`.
      ['Tai padarykite prieš didindami autonomiją.', 'Tai padaryk prieš didindamas autonomiją.', 1],
    ],
  ],
  [
    src('components', 'slides', 'shared', 'm7DiagramContent.ts'),
    [
      // Sudėtinis subjektas („DI ir tu“) visada reikalauja 2 asm. daugiskaitos,
      // todėl formuluojama iš naujo, o ne keičiamas veiksmažodis.
      [
        'kad DI ir tu naudotumėte tą pačią schemą',
        'kad DI naudotų tą pačią schemą kaip ir tu',
        1,
      ],
    ],
  ],
  [
    src('components', 'slides', 'shared', 'questions', 'OrderingQuestion.tsx'),
    [
      [
        'Naudokite rodykles, kad surikiuotumėte elementus',
        'Naudok rodykles, kad surikiuotum elementus',
        1,
      ],
    ],
  ],
  [
    src('components', 'slides', 'shared', 'questions', 'ConfidenceSelector.tsx'),
    [['Kaip esate tikri?', 'Kiek esi tikras?', 3]],
  ],
  [
    src('components', 'slides', 'shared', 'ProcessStepper.tsx'),
    [['šabloną rasite šios skaidrės apačioje', 'šabloną rasi šios skaidrės apačioje', 1]],
  ],
  [
    src('components', 'slides', 'shared', 'stepExplanations.ts'),
    [['Karkasą rasite žemiau šio bloko', 'Karkasą rasi žemiau šio bloko', 1]],
  ],
  [
    src('components', 'slides', 'shared', 'workflowComparisonConfig.ts'),
    [['DI spėlioja, ką norite', 'DI spėlioja, ką nori', 2]],
  ],
  [
    src('components', 'slides', 'shared', 'm9DataWorkflowContent.ts'),
    [['„Nežinau“, ne spėliok', '„Nežinau“, nespėliok', 2]],
  ],
  [
    src('components', 'slides', 'news-portal', 'beat-diagrams', 'portalBeatContent.ts'),
    [['Skaidrėje matėte skaičius', 'Skaidrėje matei skaičius', 1]],
  ],
  [
    src('components', 'slides', 'types', 'content', 'ModuleIntroSlide.tsx'),
    [['Po šio modulio galėsite:', 'Po šio modulio galėsi:', 1]],
  ],
  [
    src('components', 'slides', 'types', 'ContentSlides.tsx'),
    [
      [
        'Pagalvokite apie vieną verslo užduotį, kurią norėtumėte automatizuoti',
        'Pagalvok apie vieną verslo užduotį, kurią norėtum automatizuoti',
        1,
      ],
      [
        'Pabandykite sukurti promptą be struktūros (kaip paprastai darote). Išsaugokite',
        'Pabandyk sukurti promptą be struktūros (kaip paprastai darai). Išsaugok',
        1,
      ],
      ['Po šio mokymo galėsite:', 'Po šio mokymo galėsi:', 1],
      ['Išmoksite hierarchinę struktūrą', 'Išmoksi hierarchinę struktūrą', 1],
      ['Sveikiname! Dabar žinote, kaip profesionaliai', 'Sveikiname! Dabar žinai, kaip profesionaliai', 1],
      ['(kas esate ir ką darote)', '(kas esi ir ką darai)', 1],
      ['(ką turite)', '(ką turi)', 1],
      ['(ko norite)', '(ko nori)', 1],
    ],
  ],
  [
    join(root, 'src', 'data', 'questionPool.ts'),
    [
      ['Palyginkite: kas jau yra', 'Palygink: kas jau yra', 1],
      ['Output = KO norite', 'Output = KO nori', 1],
      [
        'Ar norite, kad DI sprendžia už jus, koks bus rezultato formatas?',
        'Ar nori, kad DI spręstų už tave, koks bus rezultato formatas?',
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
      throw new Error(`${file}: "${from}" rasta ${count}×, tikėta ${expected}× – nutraukiama`);
    }
    text = text.split(from).join(to);
    total += count;
  }
  writeFileSync(file, text);
  console.log(`${file.replace(root, '.')}: ${edits.length} grupė(s)`);
}

console.log(`\nIš viso pakeista: ${total}. Toliau: npm run audit:lt-address`);
