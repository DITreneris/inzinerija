/**
 * M16–18 glossary pack: fix VSR (≠ vertical slice), upsert pedagogy terms, sort LT/EN.
 * Does NOT run generate:core-data (moduleId 16/18 stay full SOT only).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ltPath = path.join(root, 'src/data/glossary.json');
const enPath = path.join(root, 'src/data/glossary-en.json');

const ltVsrDef =
  'Vibe → Skeleton → Refinement – brief brandinimo fazės; ne antras delivery kelias ir ne „vertical slice“.';

const enVsrDef =
  'Vibe → Skeleton → Refinement – brief maturity phases; not a second delivery path and not a “vertical slice”.';

/** @type {Array<{ term: string; definition: string; moduleId: number; unlockedBy?: { moduleId: number; slideId: number } }>} */
const ltUpsert = [
  {
    term: 'VSR',
    definition: ltVsrDef,
    moduleId: 16,
  },
  {
    term: 'Brief (MVP)',
    definition:
      'Siauras 01_MVP_BRIEF.md – kam, ką, Must/Won’t ir patikrinamas Done prieš Cursor build (ne marketing brief).',
    moduleId: 16,
  },
  {
    term: 'Triage (Būtina dabar / Galima vėliau / Nekuriame)',
    definition:
      'Trys apimties zonos MVP – ką darai dabar, ką atidedi ir ko nekuri; mapinimas į Must / Should / Won’t brief laukuose.',
    moduleId: 16,
  },
  {
    term: 'Vertikalus pjūvis',
    definition:
      'Vienas paleidžiamas Must kelias / viena funkcija prieš platų „viską iš karto“ generavimą Cursor projekte.',
    moduleId: 18,
  },
  {
    term: 'PROJECT_RULES.md',
    definition:
      'Trumpas (8–12 eil.) ribų failas Cursor sesijai: stack hint, Must/Won’t, Done, kalba, raktai ne kode.',
    moduleId: 18,
  },
  {
    term: 'Smoke',
    definition:
      'Greita patikra: pasileidžia, UI/API atsako, pagrindinė fn veikia; 1 raudona = nestartuojame giliau.',
    moduleId: 18,
    unlockedBy: { moduleId: 18, slideId: 18.16 },
  },
  {
    term: 'Diff ritualas',
    definition: 'Po DI pakeitimo: perskaityti diff → paleisti smoke → tada commit.',
    moduleId: 18,
    unlockedBy: { moduleId: 18, slideId: 18.23 },
  },
  {
    term: 'Soft DoD',
    definition:
      'Minkštas baigties kriterijus Kodo kelyje: GitHub + commit’ai, README, bent vienos kritinės funkcijos patikra ir URL arba lokalus paleidimo įrodymas.',
    moduleId: 18,
    unlockedBy: { moduleId: 18, slideId: 18.23 },
  },
  {
    term: 'Vibe debt',
    definition:
      'Skola po greito DI generavimo be PACKET ir proof – veikia „kažkaip“, bet sunku taisyti, kartoti ar paleisti kitam žmogui.',
    moduleId: 18,
    unlockedBy: { moduleId: 18, slideId: 18.23 },
  },
  {
    term: 'BUILD PACKET',
    definition:
      'Failų rinkinys prieš DI kodą: brief, flow, taisyklės ir Cursor promptas – kad generavimas turėtų ribas ir įrodymą.',
    moduleId: 18,
  },
  {
    term: 'Cursor',
    definition:
      'DI kodavimo IDE / agentas mokymuose – planuoji, redaguoji ir tikrini diff prieš commit; ne „parašyk visą app“ mygtukas.',
    moduleId: 16,
  },
];

/** @type {Array<{ term: string; definition: string; moduleId: number; unlockedBy?: { moduleId: number; slideId: number } }>} */
const enUpsert = [
  {
    term: 'VSR',
    definition: enVsrDef,
    moduleId: 16,
  },
  {
    term: 'Brief (MVP)',
    definition:
      'A narrow 01_MVP_BRIEF.md – who, what, Must/Won’t, and a testable Done before a Cursor build (not a marketing brief).',
    moduleId: 16,
  },
  {
    term: 'Triage (Must now / Later / Won’t)',
    definition:
      'Three MVP scope zones – what you build now, what you defer, and what you will not build; maps to Must / Should / Won’t in the brief.',
    moduleId: 16,
  },
  {
    term: 'Vertical slice',
    definition:
      'One runnable Must path / one function before a wide “build everything” generation in a Cursor project.',
    moduleId: 18,
  },
  {
    term: 'PROJECT_RULES.md',
    definition:
      'A short (8–12 line) rules file for a Cursor session: stack hint, Must/Won’t, Done, language, no secrets in code.',
    moduleId: 18,
  },
  {
    term: 'Smoke',
    definition:
      'A quick check: it starts, UI/API responds, the core function works; one red = do not go deeper yet.',
    moduleId: 18,
    unlockedBy: { moduleId: 18, slideId: 18.16 },
  },
  {
    term: 'Diff ritual',
    definition: 'After an AI change: read the diff → run smoke → then commit.',
    moduleId: 18,
    unlockedBy: { moduleId: 18, slideId: 18.23 },
  },
  {
    term: 'Soft DoD',
    definition:
      'A soft definition of done on the Code path: GitHub + commits, README, at least one critical-function check, and a URL or local run proof.',
    moduleId: 18,
    unlockedBy: { moduleId: 18, slideId: 18.23 },
  },
  {
    term: 'Vibe debt',
    definition:
      'Debt after fast AI generation without a PACKET and proof – it “kind of works,” but is hard to fix, repeat, or hand to someone else.',
    moduleId: 18,
    unlockedBy: { moduleId: 18, slideId: 18.23 },
  },
  {
    term: 'BUILD PACKET',
    definition:
      'A file set before AI coding: brief, flow, rules, and a Cursor prompt – so generation has bounds and proof.',
    moduleId: 18,
  },
  {
    term: 'Cursor',
    definition:
      'An AI coding IDE / agent in this course – you plan, edit, and read the diff before commit; not a “write the whole app” button.',
    moduleId: 16,
  },
];

function upsertSort(filePath, locale, upserts) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const byTerm = new Map(data.terms.map((t) => [t.term, t]));
  let updated = 0;
  let added = 0;
  for (const u of upserts) {
    const prev = byTerm.get(u.term);
    if (prev) {
      prev.definition = u.definition;
      prev.moduleId = u.moduleId;
      if (u.unlockedBy) prev.unlockedBy = u.unlockedBy;
      else delete prev.unlockedBy;
      updated += 1;
    } else {
      byTerm.set(u.term, { ...u });
      added += 1;
    }
  }
  data.terms = [...byTerm.values()].sort((a, b) => a.term.localeCompare(b.term, locale));
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
  const byMod = {};
  for (const t of data.terms) {
    byMod[t.moduleId] = (byMod[t.moduleId] || 0) + 1;
  }
  console.log(path.basename(filePath), { added, updated, byMod16: byMod[16], byMod18: byMod[18] });
}

upsertSort(ltPath, 'lt', ltUpsert);
upsertSort(enPath, 'en', enUpsert);
