/**
 * TE-M1618-M1/M2 (+ S3 tables): tables + embeds on M16/M18 slides.
 * Run: node scripts/patch-te-m1618-tables-embeds.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const path = join(root, 'src', 'data', 'modules.json');
const data = JSON.parse(readFileSync(path, 'utf8'));
const mods = data.modules;

function getSlide(modId, slideId) {
  const mod = mods.find((m) => m.id === modId);
  const slide = mod?.slides.find((s) => s.id === slideId);
  if (!slide) throw new Error(`Missing ${modId}/${slideId}`);
  return slide;
}

function insertTableAfterTrumpai(slide, tableSection) {
  const sections = slide.content.sections;
  const existing = sections.findIndex(
    (s) => s.heading === tableSection.heading && s.table
  );
  if (existing >= 0) sections.splice(existing, 1);
  const trumpai = sections.findIndex((s) => s.heading === 'Trumpai');
  if (trumpai < 0) throw new Error(`No Trumpai on ${slide.id}`);
  sections.splice(trumpai + 1, 0, tableSection);
}

insertTableAfterTrumpai(getSlide(16, 16.7), {
  heading: 'Triage zonos',
  body: 'Must = Būtina dabar. Should = Galima vėliau. Won’t = Nekuriame šiame MVP.',
  blockVariant: 'brand',
  table: {
    headers: ['Zona', 'Ką dedame', 'Pavyzdys'],
    rows: [
      ['Būtina dabar', '1 pagrindinė fn + max 1–2 palaikančios', 'Surikiuoti 3 dienos užduotis'],
      ['Galima vėliau', 'Naudinga, bet neblokuojanti pirmo testo', 'Priminimai el. paštu'],
      ['Nekuriame', 'Per anksti ar per platu pirmam MVP', 'Auth, mokėjimai, admin panelė'],
    ],
  },
});

insertTableAfterTrumpai(getSlide(16, 16.14), {
  heading: 'Trys kryptys A / B / C',
  body: 'Užpildyk savo eilutes – ne 30 funkcijų.',
  blockVariant: 'brand',
  table: {
    headers: ['Kryptis', 'Kam', 'Ką daro', 'Rezultatas'],
    rows: [
      ['A', 'Užsiėmęs profesionalas', 'Rodo 3 dienos prioritetus', 'Žino, nuo ko pradėti per 1 min'],
      ['B', 'Komandos narys', 'Dalijasi vienu prioritetų sąrašu', 'Visi mato tą patį „dabar“'],
      ['C', 'Vadovas', 'Matuoja, kiek užduočių baigta', 'Trumpa dienos santrauka'],
    ],
  },
});

insertTableAfterTrumpai(getSlide(16, 16.15), {
  heading: 'Įvertinimas 1–5',
  body: 'Rinkis patikrinamiausią – ne „gražiausią“.',
  blockVariant: 'brand',
  table: {
    headers: ['Kriterijus', 'A', 'B', 'C'],
    rows: [
      ['Greitis patikrinti (1–5)', '5', '3', '2'],
      ['Aiškumas naudotojui (1–5)', '4', '4', '3'],
      ['Rizika / sudėtingumas (1=maža)', '2', '3', '4'],
      ['Suma (orientyras)', '11', '10', '9'],
    ],
  },
});

insertTableAfterTrumpai(getSlide(18, 18.14), {
  heading: '3 vibe-debt spąstai',
  body: 'Pažymėk rizikingiausią sau ir kaip jo išvengsi.',
  blockVariant: 'brand',
  table: {
    headers: ['Spąstas', 'Simptomas', 'Kaip išvengti'],
    rows: [
      [
        'Testai iš kodo',
        'DI rašo testus pagal sugeneruotą kodą, ne pagal brief ciklą',
        'Pirmiausia ciklas / Done – tada testas',
      ],
      ['Bloat', 'Dubliuotos fn, perteklinės abstrakcijos', '1 pjūvis; Won’t sąrašas gyvas'],
      [
        '„Atrodo veikia“',
        'UI šypsosi, bet praleistas verslo kraštas',
        'Smoke + 1 kritinis kelias prieš „done“',
      ],
    ],
  },
});

insertTableAfterTrumpai(getSlide(18, 18.16), {
  heading: 'Smoke indikatoriai',
  body: '1 raudona = nestartuojame giliau.',
  blockVariant: 'brand',
  table: {
    headers: ['Žingsnis', 'Žalia', 'Raudona'],
    rows: [
      ['Paleidimas', 'App / serveris pasileidžia be klaidos', 'Crash / blank screen'],
      ['UI arba API', 'Pagrindinis ekranas / endpoint atsako', '404 / tuščia būsena be paaiškinimo'],
      [
        'Pagrindinė fn',
        'Brief ciklo rezultatas matomas',
        'Fn neveikia arba klaidingas rezultatas',
      ],
    ],
  },
});

getSlide(16, 16.6).content.recognitionExercise = {
  title: 'Atpažink: vertė ar funkcija?',
  task: 'Perskaityk 4 fraizes ir kiekvienai pasirink – **vertė** ar **funkcija**.',
  examples: [
    'Sutaupo 10 minučių ryto planavimui.',
    'Surikiuoja 3 dienos užduotis pagal prioritetą.',
    'Žmogus žino, nuo ko pradėti, be streso.',
    'Siunčia priminimą 9:00.',
  ],
  choices: ['Vertė (pokytis žmogui)', 'Funkcija (veiksmas produkte)'],
  correctAnswers: [0, 1, 0, 1],
  explanations: [
    'Pokytis žmogui – tai vertė, ne mygtukas.',
    'Surikiavimas – produkto veiksmas (funkcija).',
    'Mažiau streso / aiškumas – vertė.',
    'Priminimas – funkcija; vertė būtų „nepamiršta pradėti“.',
  ],
  goal: 'Vertė lieka prasminga, jei pakeistum įrankį; funkcija – konkretus veiksmas produkte.',
};

const s1621 = getSlide(16, 16.21);
s1621.content.briefCheckBlock = {
  question:
    'Kurio brief lauko trūksta, jei negali pasakyti, ar MVP „veikia“ per <2 min?',
  options: [
    'Sėkmės kriterijus (patikrinamas)',
    'Tech stack ir hostingas',
    'Q2–Q4 roadmap',
    'Dizaino sistemos spalvos',
  ],
  correct: 0,
  explanation:
    'Be patikrinamo sėkmės kriterijaus brief’as lieka idėja. Stack ir roadmap – vėliau.',
};
s1621.content.preCopyCheckBlock = {
  question: 'Prieš kopijuodamas Brief pagalbininką – kas privaloma MVP brief’e?',
  options: [
    'Must ≤4, Won’t ≥3, patikrinamas sėkmės kriterijus',
    'Bent 10 ekranų ir pilnas ERD',
    'Auth + mokėjimai kaip Must',
    'Tik produkto sakinys be ribų',
  ],
  correct: 0,
  explanation:
    'Siauras brief: Must/Won’t ir sėkmės kriterijus. Auth/mokėjimai greičiausiai Won’t pirmam MVP.',
};

const preCopies = {
  18.6: {
    question: 'Prieš kopijuodamas PROJECT_RULES – kas privalo būti faile?',
    options: [
      'Must/Won’t, Done, saugumas (raktų ne kode), approve gate',
      'Tik stack pavadinimas be ribų',
      'Pilnas Agile ceremonijų aprašas',
      'Heroku deploy žingsniai',
    ],
    correct: 0,
    explanation:
      'Trumpos taisyklės agentui: ribos, Done, saugumas ir „taip“ prieš didesnį pakeitimą.',
  },
  18.7: {
    question: 'Prieš kopijuodamas Cursor pjūvio promptą – ką privalai turėti?',
    options: [
      'Viena Must funkcija + failų planas prieš kodą',
      'Visos 30 funkcijų sąrašas',
      'Redis ir Auth kaip pirmas žingsnis',
      'Tik „sukurk visą app“',
    ],
    correct: 0,
    explanation:
      'Vertikalus pjūvis = viena fn, planas prieš generate, ne visas produktas.',
  },
  18.8: {
    question: 'Kada leidžiama generuoti kodą pagal „Planas prieš kodą“?',
    options: [
      'Po rašytinio „taip“ į failų planą, Done ir Won’t',
      'Iškart po pirmo DI pasiūlymo',
      'Kai UI atrodo gražiai',
      'Tik po deploy',
    ],
    correct: 0,
    explanation: 'Approve gate: planas → tavo „taip“ → tada kodas.',
  },
};

for (const [sid, block] of Object.entries(preCopies)) {
  getSlide(18, Number(sid)).content.preCopyCheckBlock = block;
}

getSlide(18, 18.201).content.recognitionExercise = {
  title: 'Atpažink diff ritualo tvarką',
  task: 'Perskaityk 4 situacijas ir pasirink, kuris žingsnis trūksta arba eina neteisingai.',
  examples: [
    'Po DI pakeitimo iškart commit + push be skaitymo.',
    'Prieš didesnį DI pakeitimą nėra veikiančios versijos commit’o.',
    'Perskaitė diff, padarė smoke, tada commit.',
    'Push padarė prieš smoke, nes „skubėjo“.',
  ],
  choices: [
    'Trūksta: perskaityti diff prieš commit',
    'Trūksta: commit veikiančios versijos prieš DI',
    'Tvarka teisinga',
    'Trūksta: smoke prieš push',
  ],
  correctAnswers: [0, 1, 2, 3],
  explanations: [
    'Diff eina prieš commit – kitaip rizikuoji aklu DI diff’u.',
    'Saugus startas: commit veikiančios būsenos prieš didesnį DI pakeitimą.',
    'status → diff → smoke → commit → push – teisinga seka.',
    'Smoke prieš push – kitaip laužtum nuotolinę šaką.',
  ],
  goal: 'Ritualas: status → **diff** → smoke → commit → push.',
};

insertTableAfterTrumpai(getSlide(18, 18.1), {
  heading: 'Chaosas vs kontrolė',
  body: 'Kontroliuojamas kūrimas = PACKET + vienas pjūvis.',
  blockVariant: 'brand',
  table: {
    comparisonStyle: true,
    headers: ['Chaosas', 'Kontrolė'],
    rows: [
      ['„Sukurk visą app“ be ribų', 'PACKET + 1 vertikalus pjūvis'],
      ['DI pats renka scope', 'Tu renki Must / Won’t'],
      ['Commit be diff', 'Diff → smoke → commit'],
      ['Done = „sugeneravo“', 'Done = proof (URL arba lokalus)'],
    ],
  },
});

insertTableAfterTrumpai(getSlide(18, 18.4), {
  heading: 'Minimalios esybės',
  body: '2–4 esybės paprasta kalba – ne SQL kursas.',
  blockVariant: 'brand',
  table: {
    headers: ['Esybė', 'Pagrindiniai atributai', 'Kam reikia MVP'],
    rows: [
      ['Užduotis', 'pavadinimas, prioritetas, būsena', 'Pagrindinė fn'],
      ['Diena', 'data, sąrašo id', 'Rodyti „šiandien“'],
      ['Naudotojas (optional)', 'vardas / lokalus id', 'Tik jei reikia asmeninio sąrašo'],
    ],
  },
});

writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
console.log('Patched TE-M1618 tables + embeds (+ S3 18.1/18.4)');
