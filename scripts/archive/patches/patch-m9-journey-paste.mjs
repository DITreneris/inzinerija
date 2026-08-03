/**
 * M9 micropolish I2/I3: tokenize 93.1/93.2 templates, slim step-1,
 * soften footers, drop dead recommendedSlideIds on 90.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const LT_93_2 = `Štai mano duomenų failas (CSV/Excel) arba stulpeliai: [STULPELIAI].
Užduotis:
1. Identifikuok stulpelių tipus ir galimas klaidas (datos, dubliavimas, trūkstamos reikšmės).
2. Pateik 5 žingsnių valymo checklist.
3. Pasiūlyk 3 KPI, kuriuos galima skaičiuoti po valymo – tik iš šių stulpelių; jei trūksta duomenų, rašyk „Nežinau“.
Checklist: anonimizacija (jei reikia), formatų suvienodinimas, dublių šalinimas, trūkstamų reikšmių identifikavimas.`;

const EN_93_2 = `Here is my data file (CSV/Excel) or columns: [COLUMNS].
Tasks:
1. Identify column types and likely errors (dates, duplicates, missing values).
2. Provide a 5-step cleaning checklist.
3. Suggest 3 KPIs computable after cleaning – only from these columns; if data is missing, write "I don't know".
Checklist: anonymization (if needed), format alignment, duplicate removal, missing value identification.`;

function patchModule(mod, locale) {
  const isEn = locale === 'en';
  for (const s of mod.slides) {
    if (s.id === 90 && s.content?.recommendedSlideIds) {
      delete s.content.recommendedSlideIds;
      console.log(`${locale} 90: dropped recommendedSlideIds`);
    }
    if (s.id === 90 && s.content) {
      s.content.footer = isEn
        ? 'Next – Practice: source catalog'
        : 'Toliau – Praktika: šaltinių katalogas';
    }
    if (s.id === 93.1) {
      const tmpl = isEn
        ? 'List 10–15 data sources for [company / sector] topic: official, public sources; include update frequency and format (CSV, API, reports). Add a short description for each.'
        : 'Išvardink 10–15 duomenų šaltinių [įmonės / sektoriaus] temai: oficialūs, vieši šaltiniai; nurodyk atnaujinimo dažnį ir formatą (CSV, API, ataskaitos). Pridėk trumpą aprašymą kiekvienam.';
      s.template = tmpl;
      if (s.practicalTask) {
        s.practicalTask.template = tmpl;
        const step = s.practicalTask.instructions?.steps?.[0];
        if (step) {
          if (isEn) {
            step.title = 'Confirm your sector';
            step.description =
              'Your sector was confirmed on the analysis kit desk – see the hint above. The prompt uses your domain instead of [company / sector].';
            step.hint =
              'Need a different domain? Go back and confirm another path.';
          } else {
            step.title = 'Patvirtink sektorių';
            step.description =
              'Sektorius jau pasirinktas analitinio rinkinio stole – žr. užuominą viršuje. Promptas naudos tavo sritį vietoj [įmonės / sektoriaus].';
            step.hint = 'Reikia kitos srities? Grįžk ir patvirtink kitą kelią.';
          }
        }
      }
      if (s.content) {
        s.content.footer = isEn
          ? 'Next – Practice: your CSV / Excel'
          : 'Toliau – Praktika: savo CSV / Excel';
      }
      console.log(`${locale} 93.1 patched`);
    }
    if (s.id === 93.2) {
      s.template = isEn ? EN_93_2 : LT_93_2;
      if (s.practicalTask) s.practicalTask.template = s.template;
      if (s.content) {
        s.content.footer = isEn
          ? 'Next – 8-step cycle and prompts'
          : 'Toliau – 8 žingsnių ciklas ir promptai';
      }
      console.log(`${locale} 93.2 patched`);
    }
  }
}

const ltPath = path.join(root, 'src/data/modules.json');
const enPath = path.join(root, 'src/data/modules-en-m7-m9.json');
const lt = JSON.parse(fs.readFileSync(ltPath, 'utf8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
patchModule(lt.modules.find((m) => m.id === 9), 'lt');
patchModule(en.modules.find((m) => m.id === 9), 'en');
fs.writeFileSync(ltPath, `${JSON.stringify(lt, null, 2)}\n`);
fs.writeFileSync(enPath, `${JSON.stringify(en, null, 2)}\n`);
console.log('OK');
