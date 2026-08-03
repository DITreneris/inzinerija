/**
 * One-shot: M16–18 ritmas / journey (M1618-R1…R6).
 * Run: node scripts/patch-m1618-ritmas.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const modulesPath = path.join(__dirname, '../src/data/modules.json');
const data = JSON.parse(fs.readFileSync(modulesPath, 'utf8'));
const m16 = data.modules.find((m) => m.id === 16);
const m18 = data.modules.find((m) => m.id === 18);
if (!m16 || !m18) throw new Error('modules 16/18 missing');

function idx(slides, id) {
  const i = slides.findIndex((s) => s.id === id);
  if (i < 0) throw new Error('missing slide ' + id);
  return i;
}

// --- I4: convert 16.8 to path-step ---
{
  const s = m16.slides[idx(m16.slides, 16.8)];
  s.type = 'path-step';
  s.content = {
    title: 'Kūrimo kortelė – 5 laukai užrašyti',
    pathLabel: 'Kūrimo kortelė',
    stepNumber: 1,
    stepTotal: 1,
    body: 'Užpildyk kortelę savo idėjai (arba dienos prioritetų įrankiui). Pažymėk, kai visi 5 laukai užrašyti – tai tiltas į brief.',
    sections: [
      { heading: '1. Naudotojas', body: 'Kas naudoja ir kokiame kontekste?' },
      {
        heading: '2. Problema',
        body: 'Konkreti problema (ne „noriu app“).',
      },
      {
        heading: '3. Kuriama vertė',
        body: 'Koks pokytis naudotojui – ne funkcijų sąrašas.',
      },
      {
        heading: '4. Pagrindinė funkcija',
        body: 'Viena pagrindinė funkcija (+ max 1–2 palaikančios).',
      },
      {
        heading: '5. Kaip žinosime, kad veikia',
        body: 'Patikrinamas sėkmės kriterijus (idealiai <2 min).',
      },
      {
        heading: 'Patikra',
        body: 'Ar funkcija tikrai viena? Ar sėkmės kriterijus patikrinamas?',
      },
    ],
    footer: 'Toliau – skaidrė 9: Kortelė paruošta',
  };
}

// --- I1: insert 16.85 after 16.8 ---
{
  const i = idx(m16.slides, 16.8) + 1;
  if (m16.slides[i]?.id !== 16.85) {
    m16.slides.splice(i, 0, {
      id: 16.85,
      title: 'Kortelė paruošta',
      shortTitle: 'Kortelė ✓',
      subtitle: 'D1 baigta – toliau brief',
      type: 'section-break',
      content: {
        title: 'Kortelė paruošta',
        subtitle:
          'Toliau: VSR, kryptis, ciklas ir 01_MVP_BRIEF.md. Dar ne Cursor build.',
        sectionNumber: 'D1→D2',
        celebrationText: 'Puiku! 5 kortelės laukai – tiltas į brief.',
        recap: {
          heading: 'Ką jau žinai?',
          lead: 'Pirmoji dalis – nuo problemos iki kortelės.',
          items: [
            'Problema prieš sprendimą – konkretus naudotojas ir pasekmė.',
            'Vertė ≠ funkcija; triage: Būtina / Galima / Nekuriame.',
            'Kūrimo kortelė: 5 laukai kaip įvestis į brief.',
          ],
        },
        nextSteps: [
          'Vibe → Skeleton → Refinement – brief fazės.',
          'Produkto sakinys, kritika ir trys kryptys A/B/C.',
          'Naudotojo ciklas, ekranai, ribos ir rizikos.',
          'Praktika: 01_MVP_BRIEF.md (11 laukų).',
        ],
        footer: 'Toliau – skaidrė 10: Perėjimas į brief',
      },
    });
  }
}

// --- I2: simplify 16.15 ---
{
  const s = m16.slides[idx(m16.slides, 16.15)];
  s.subtitle = 'Pasirink patikrinamiausią kryptį lab’e';
  s.content.sections = [
    {
      heading: 'Trumpai',
      body: 'Rinkis patikrinamiausią kryptį – ne gražiausią. Orientyras: greitis patikrinti, aiškumas, rizika (pavyzdys A≈11, B≈10, C≈9).',
      blockVariant: 'accent',
    },
    {
      heading: 'Krypties lab',
      body: 'Pasirink A, B arba C. Po pasirinkimo – balų veidrodis ir kopijuojamas „kodėl patikrinamiausia“.',
      blockVariant: 'brand',
      image: 'm16_direction_picker',
      imageAlt:
        'Krypties pasirinkimo lab: A/B/C, balai ir kopijuojamas kodėl',
    },
    {
      heading: 'Orientyras 1–5 (pavyzdys)',
      body: 'Jei nori lentelės – atverk. Lab’e jau matai balus po pasirinkimo.',
      blockVariant: 'default',
      collapsible: true,
      table: {
        headers: ['Kriterijus', 'A', 'B', 'C'],
        rows: [
          ['Greitis patikrinti (1–5)', '5', '3', '2'],
          ['Aiškumas naudotojui (1–5)', '4', '4', '3'],
          ['Rizika / sudėtingumas (1=maža)', '2', '3', '4'],
          ['Suma (orientyras)', '11', '10', '9'],
        ],
      },
    },
    {
      heading: 'Patikra',
      body: 'Ar nugalėtojas patikrinamas per dieną, o ne per ketvirtį?',
      blockVariant: 'accent',
    },
  ];
}

// --- I1: insert 16.205 after 16.201 ---
{
  const i = idx(m16.slides, 16.201) + 1;
  if (m16.slides[i]?.id !== 16.205) {
    m16.slides.splice(i, 0, {
      id: 16.205,
      title: 'Savitikra prieš brief',
      shortTitle: 'Savitikra',
      subtitle: '2–3 klausimai – ar pasiruošęs brief’ui?',
      type: 'warm-up-quiz',
      content: {
        questions: [
          {
            id: 'm16-wu-must',
            question: 'Kiek Must punktų turėtų tilpti į pirmą MVP brief’ą?',
            options: [
              'Must ≤4 – siaura apimtis',
              'Must ≥10 – kad nieko nepamirštum',
              'Must neribotas – viską įrašyk',
              'Must tik tech stack',
            ],
            correct: 0,
            explanation:
              'Siauras brief: Must ≤4. Jei klaidingai – grįžk prie skaidrės „Ribos ir Now–Next–Later“.',
          },
          {
            id: 'm16-wu-value',
            question: 'Kas skiria vertę nuo funkcijos?',
            options: [
              'Vertė = pokytis naudotojui; funkcija = veiksmas produkte',
              'Vertė ir funkcija – tas pats',
              'Vertė = tech stack; funkcija = dizainas',
              'Vertė = kiek ekranų turi',
            ],
            correct: 0,
            explanation:
              'Vertė = pokytis; funkcija = kaip produktas veikia. Žr. skaidrę „Vertė ≠ funkcija“.',
          },
          {
            id: 'm16-wu-cycle',
            question: 'Kuo naudotojo ciklas skiriasi nuo funkcijų sąrašo?',
            options: [
              'Ciklas aprašo UX eigą (triggeris → rezultatas → kitas), ne feature listą',
              'Ciklas yra ERD diagrama',
              'Ciklas = deploy checklist',
              'Ciklas reikalingas tik po GitHub',
            ],
            correct: 0,
            explanation:
              'Ciklas = UX seka. Žr. skaidrę „Naudotojo ciklas“.',
          },
        ],
        footer: 'Toliau – skaidrė 21: MVP brief',
      },
    });
  }
}

const m16Titles = {
  160: 'Kodo inžinerijos kelias',
  16.2: 'Ką šiandien padarysi',
  16.3: 'Proceso schema',
  16.4: 'Problema prieš sprendimą',
  16.5: 'Problemos formulė',
  16.6: 'Vertė ≠ funkcija',
  16.7: 'MVP apimtis',
  16.8: 'Kūrimo kortelė',
  16.85: 'Kortelė paruošta',
  16.9: 'Perėjimas į brief',
  16.101: 'Vibe → Skeleton → Refinement',
  16.11: 'Produkto sakinys',
  16.12: 'Trys atramos ir kritika',
  16.14: 'Trys kryptys',
  16.15: 'Rinkis patikrinamiausią',
  16.16: 'Naudotojo ciklas',
  16.17: 'Ekranai iš srauto',
  16.18: 'Ribos ir Now–Next–Later',
  16.201: 'Rizikos',
  16.205: 'Savitikra prieš brief',
  16.21: 'MVP brief',
  16.22: 'Modulio 16 santrauka',
};

for (let i = 0; i < m16.slides.length; i++) {
  const s = m16.slides[i];
  const next = m16.slides[i + 1];
  if (!s.content) s.content = {};
  if (!next || s.type === 'summary') {
    s.content.footer = 'Toliau – Modulis 17: Žinių patikrinimas';
    continue;
  }
  const nextNum = i + 2;
  const label = m16Titles[next.id] || next.shortTitle || next.title;
  s.content.footer = `Toliau – skaidrė ${nextNum}: ${label}`;
}

// --- I3: insert 18.125 after 18.12 ---
{
  const i = idx(m18.slides, 18.12) + 1;
  if (m18.slides[i]?.id !== 18.125) {
    m18.slides.splice(i, 0, {
      id: 18.125,
      title: 'PACKET paruoštas',
      shortTitle: 'PACKET ✓',
      subtitle: 'Blokas A baigtas – toliau higiena ir įrodymas',
      type: 'section-break',
      content: {
        title: 'PACKET paruoštas',
        subtitle: 'Toliau: vibe-debt, smoke, vartai, diff ir soft DoD.',
        sectionNumber: 'A→B',
        celebrationText: 'PACKET sudėtas – toliau higiena ir įrodymas.',
        recap: {
          heading: 'Ką jau turi?',
          lead: 'Build packet – kontekstas Cursor sesijai.',
          items: [
            'mvp_brief.md (alias 01_MVP_BRIEF.md) – siauras brief.',
            'user_flow.md + PROJECT_RULES.md + Cursor build promptas.',
            'Planas prieš kodą; iteracijos ciklas ir klaidos kontekstas.',
          ],
        },
        nextSteps: [
          'Kodas ≠ produktas – žmogus tikrina.',
          'Smoke + kritinis kelias; edge ir .env.',
          'Paleidimo vartai ir diff ritualas prieš commit.',
          'Soft DoD: URL arba lokalus proof + GitHub.',
        ],
        footer: 'Toliau – skaidrė 16: Kodas nėra produktas',
      },
    });
  }
}

// --- I6: convert 18.16 to path-step (1/2) ---
{
  const s = m18.slides[idx(m18.slides, 18.16)];
  s.type = 'path-step';
  s.content = {
    title: 'Smoke – kritinis kelias žalias',
    pathLabel: 'Soft DoD kelias',
    stepNumber: 1,
    stepTotal: 2,
    body: 'Aprašyk ir paleisk 3 smoke žingsnius. Pažymėk, kai paleidimas, UI/API ir pagrindinė fn – žali (1 raudona = nestartuojame giliau).',
    sections: [
      {
        heading: '1. Paleidimas',
        body: 'Žalia: app / serveris pasileidžia be klaidos. Raudona: crash / blank screen.',
      },
      {
        heading: '2. UI arba API',
        body: 'Žalia: pagrindinis ekranas / endpoint atsako. Raudona: 404 / tuščia būsena be paaiškinimo.',
      },
      {
        heading: '3. Pagrindinė fn',
        body: 'Žalia: brief ciklo rezultatas matomas. Raudona: fn neveikia arba klaidingas rezultatas.',
      },
      {
        heading: 'Kritinis kelias',
        body: 'Kritinis kelias = brief ciklas: triggeris → rezultatas naudotojui. 1 raudona = nestartuojame giliau.',
      },
      {
        heading: 'Patikra',
        body: 'Ar žinai, kas yra „raudona“ tavo pjūviui?',
      },
    ],
  };
}

// --- I3: convert 18.23 to path-step (2/2) ---
{
  const s = m18.slides[idx(m18.slides, 18.23)];
  s.type = 'path-step';
  s.content = {
    title: 'Soft DoD – įrodymas vartotojui arba lokaliai',
    pathLabel: 'Soft DoD kelias',
    stepNumber: 2,
    stepTotal: 2,
    body: 'Pažymėk, kai turi soft DoD įrodymą: GitHub + commit’ai, gitignore, README, PROJECT_RULES, ≥1 kritinės fn patikra, viešas URL arba lokalus proof, 1 pataisyta problema, rollback mintis.',
    sections: [
      {
        heading: 'Soft DoD checklist',
        body: 'GitHub + commit’ai · .gitignore · README · PROJECT_RULES.md · ≥1 kritinės fn patikra · viešas URL arba lokalus proof · 1 pataisyta problema · rollback mintis.',
      },
      {
        heading: 'Daryk dabar',
        body: 'Užrašyk proof (URL arba lokalus paleidimo aprašas). Santraukoje – own-work slot PACKET kontekstui.',
      },
      {
        heading: 'Patikra',
        body: 'Ar vibe coding baigiasi įrodymu, o ne generavimu?',
      },
    ],
  };
}

for (let i = 0; i < m18.slides.length; i++) {
  const s = m18.slides[i];
  const next = m18.slides[i + 1];
  if (!s.content) s.content = {};
  if (!next || s.type === 'summary') {
    s.content.footer =
      'Kelias „Kodo inžinerija“ – brief → testas → įrodytas MVP.';
    continue;
  }
  const nextNum = i + 2;
  const label = next.shortTitle || next.title;
  s.content.footer = `Toliau – skaidrė ${nextNum}: ${label}`;
}

console.log(
  'M16 slides:',
  m16.slides.length,
  m16.slides.map((s) => s.id).join(', ')
);
console.log(
  'M18 slides:',
  m18.slides.length,
  m18.slides.map((s) => s.id).join(', ')
);

fs.writeFileSync(modulesPath, JSON.stringify(data, null, 2) + '\n');
console.log('Wrote', modulesPath);
