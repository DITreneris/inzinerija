#!/usr/bin/env node
/**
 * M16 learner-plain LT patch (M16-PLAIN B1–B4 + P0).
 * Patches src/data/modules.json module 16 only. No core profiles.
 * Usage: node scripts/patch-m16-plain-lt.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const path = join(root, 'src', 'data', 'modules.json');
const data = JSON.parse(readFileSync(path, 'utf8'));
const mod = data.modules.find((m) => m.id === 16);
if (!mod) {
  console.error('Module 16 not found');
  process.exit(1);
}

function slide(id) {
  const s = mod.slides.find((x) => x.id === id);
  if (!s) throw new Error(`Slide ${id} not found`);
  return s;
}

function setSections(id, sections, extra = {}) {
  const s = slide(id);
  s.content = { ...s.content, ...extra, sections };
}

// —— 16.2 Daryk example (triad freeze) ——
{
  const s = slide(16.2);
  s.content.sections[1].body =
    'Pasirink idėją (pvz. dienos prioritetų įrankis) ir užrašyk vienu sakiniu: kam ir ką sprendi.\n\nPavyzdys: „Vadovas rytą nežino, nuo ko pradėti → 3 prioritetai.“\nŠablonas: [Kas] negali [ką], kai [situacija].';
}

// —— 16.25 Stack ——
setSections(16.25, [
  {
    heading: 'Trumpai',
    body: 'Šiandien tik planuoji. Kodą rašysi Modulio 18 su Cursor (DI kodavimo redaktorius). Hostingo nelieči.',
    blockVariant: 'accent',
  },
  {
    heading: 'Stack sluoksniai',
    body: 'Ne Lovable/Replit kaip pagrindinis kelias šiame kurse – čia brief dabar, kodas vėliau su Cursor.',
    blockVariant: 'brand',
    table: {
      headers: ['Sluoksnis', 'Įrankis', 'M16 dabar', 'Vėliau'],
      rows: [
        ['Brief / planas', 'Chat DI (ChatGPT / Claude)', 'Rašai brief’ą ir kritiką', '—'],
        [
          'Kodas',
          'Cursor',
          'Optional: atsisiųsk; ne generuok visą app',
          'M18 – rašysi kodą',
        ],
        [
          'Įrodymas',
          'GitHub',
          'Žinosi, kad reikės parodyti rezultatą (M18)',
          'M18 commit + repo',
        ],
      ],
    },
  },
  {
    heading: 'Daryk dabar',
    body: 'Užsirašyk: brief dabar; Cursor diegimas optional; generate – ne šiandien.',
    blockVariant: 'brand',
  },
  {
    heading: 'Patikra',
    body: 'Ar brief’e jau rašai tech stack? (Turėtų būti ne.)',
    blockVariant: 'accent',
  },
]);

// —— 16.3 Process ——
setSections(16.3, [
  {
    heading: 'Trumpai',
    body: 'Einame: problema → žmogus → nauda → 1 funkcija → brief → patikra. Kodas – M18.',
    blockVariant: 'accent',
  },
  {
    heading: 'Šeši žingsniai iki brief’o',
    body: 'Šeši žingsniai iki brief’o ir patikros. Spausk žingsnį diagramoje.',
    blockVariant: 'brand',
    image: 'm16_delivery_gates',
    imageAlt: 'Kelio žingsniai: problema, naudotojas, vertė, 1 funkcija, prototipas, testas',
  },
  {
    heading: 'Daryk dabar',
    body: 'Diagramoje spausk žingsnį, kuriame esi dabar, ir garsiai pasakyk jo pavadinimą.',
    blockVariant: 'brand',
  },
  {
    heading: 'Patikra',
    body: 'Ar žinai, kad šiame modulyje baigiame brief’u, ne kodu?',
    blockVariant: 'accent',
  },
]);

// —— 16.4 ——
setSections(16.4, [
  {
    heading: 'Trumpai',
    body: 'Blogas: „Noriu app su DI.“ Geras: konkreti naudotojo problema situacijoje su pasekme.',
    blockVariant: 'accent',
  },
  {
    heading: 'Blogas vs geras startas',
    body: 'Pradėk nuo žmogaus, ne nuo technologijos.',
    blockVariant: 'brand',
    table: {
      comparisonStyle: true,
      headers: ['Blogas', 'Geras'],
      rows: [
        [
          '„Noriu app su DI“',
          '„Vadovas rytą 20 min skirsto užduotis ir vis tiek pradeda ne nuo svarbiausio.“',
        ],
        [
          'Fokusas – stack ir funkcijos',
          'Fokusas – situacija ir pasekmė (švaisto rytą / komanda laukia)',
        ],
        ['Neaišku, ką tikrinsi', 'Aišku, ką prototipas patikrina'],
      ],
    },
  },
  {
    heading: 'Daryk dabar',
    body: 'Perrašyk savo idėją: kas kenčia, kada, kokia verslo/asmeninė pasekmė.',
    blockVariant: 'brand',
  },
  {
    heading: 'Patikra',
    body: 'Ar sakinys apie žmogų, o ne apie technologiją?',
    blockVariant: 'accent',
  },
]);

// —— 16.5 ——
setSections(16.5, [
  {
    heading: 'Trumpai',
    body: 'Formulė: [Naudotojas] susiduria su [problema] kai [situacija], todėl [pasekmė]. Mokėjimas – nebūtina šiame MVP.',
    blockVariant: 'accent',
  },
  {
    heading: 'Užpildytas pavyzdys',
    body: 'Vadovas susiduria su prioritetų chaosu kai rytas prasideda nuo el. pašto, todėl švaisto 20 min ir komanda laukia.',
    blockVariant: 'brand',
  },
  {
    heading: 'Daryk dabar',
    body: 'Užpildyk šabloną: [Naudotojas] susiduria su [problema] kai [situacija], todėl [pasekmė].',
    blockVariant: 'brand',
  },
  {
    heading: 'Patikra',
    body: 'Ar problema dažna? Ar skausmas aiškus? Ar galima patikrinti prototipu bent vieną dalį?',
    blockVariant: 'accent',
  },
]);

// —— 16.6 LT polish (EN exercise later) ——
{
  const s = slide(16.6);
  s.content.sections[1].body =
    'Parašyk porą: vertė + funkcija po vieną sakinį.\n\nPavyzdys: vertė – „žino, nuo ko pradėti“; funkcija – „surikiuoja 3 užduotis“.';
}

// —— 16.7 ——
setSections(16.7, [
  {
    heading: 'Trumpai',
    body: 'Trys stulpeliai: Būtina dabar / Galima vėliau / Nekuriame. Pirmam MVP – 1 pagrindinė funkcija (+ max 1–2 pagalbinės).',
    blockVariant: 'accent',
  },
  {
    heading: 'Triage zonos',
    body: 'Brief’e vėliau tai taps Must / Should / Won’t – tie patys stulpeliai angliškomis etiketėmis.',
    blockVariant: 'brand',
    table: {
      headers: ['Zona', 'Ką dedame', 'Pavyzdys'],
      rows: [
        [
          'Būtina dabar',
          '1 pagrindinė funkcija + max 1–2 pagalbinės',
          'Surikiuoti 3 dienos užduotis',
        ],
        [
          'Galima vėliau',
          'Naudinga, bet neblokuojanti pirmo testo',
          'Priminimai el. paštu',
        ],
        [
          'Nekuriame',
          'Per anksti ar per platu pirmam MVP',
          'Prisijungimas (Auth), mokėjimai, admin panelė',
        ],
      ],
    },
  },
  {
    heading: 'Daryk dabar',
    body: 'Pavyzdys (dienos prioritetai): Būtina – surikiuoti Top 3; Galima – priminimas; Nekuriame – prisijungimas, mokėjimai, bendras kalendorius, admin panelė, el. pašto kampanijos.\n\nDabar savo 5 idėjas įmesk į tris stulpelius.',
    blockVariant: 'brand',
  },
  {
    heading: 'Patikra',
    body: 'Ar „Būtina“ telpa į vieną trumpą naudotojo ciklą?',
    blockVariant: 'accent',
  },
]);

// —— 16.8 path-step with example ——
{
  const s = slide(16.8);
  s.content.body =
    'Rašyk Docs ar užrašinėje. Pažymėk čia, kai visi 5 laukai užrašyti – tai tiltas į brief.';
  s.content.sections = [
    {
      heading: 'Pavyzdys (dienos prioritetai)',
      body: '1. Naudotojas: vadovas, kuris rytą skirsto komandos užduotis.\n2. Problema: 20 min skirsto ir vis tiek pradeda ne nuo svarbiausio.\n3. Vertė: per 2 min žino Top 3 – komanda nelaukia.\n4. Pagrindinė funkcija: surikiuoti 3 dienos užduotis.\n5. Kaip žinosime: per 2 min žmogus mato Top 3.',
    },
    { heading: '1. Naudotojas', body: 'Kas naudoja ir kokiame kontekste?' },
    { heading: '2. Problema', body: 'Konkreti problema (ne „noriu app“).' },
    {
      heading: '3. Kuriama vertė',
      body: 'Koks pokytis naudotojui – ne funkcijų sąrašas.',
    },
    {
      heading: '4. Pagrindinė funkcija',
      body: 'Viena pagrindinė funkcija (+ max 1–2 pagalbinės).',
    },
    {
      heading: '5. Kaip žinosime, kad veikia',
      body: 'Patikrinamas sėkmės kriterijus (pvz. „Per 2 min žmogus mato Top 3.“).',
    },
    {
      heading: 'Patikra',
      body: 'Ar funkcija tikrai viena? Ar sėkmės kriterijus patikrinamas?',
    },
  ];
}

// —— 16.85 ——
{
  const s = slide(16.85);
  s.subtitle = 'Kortelė → brief';
  s.content.subtitle =
    'Toliau išgryninsi idėją ir surašysi brief’ą. Dar ne kodas.';
  s.content.sectionNumber = '1 dalis';
  s.content.nextSteps = [
    'Trys brief brandinimo žingsniai (Vibe → Skeleton → Refinement).',
    'Sakinys + kritika + 3 kryptys.',
    'Eiga ir ekranai.',
    '11 laukų brief.',
  ];
}

// —— 16.9 ——
setSections(16.9, [
  {
    heading: 'Trumpai',
    body: 'Turėdamas 5 laukus – eik prie sakinio, kritikos ir ribų. Brief = vienas dokumentas.',
    blockVariant: 'accent',
  },
  {
    heading: 'Daryk dabar',
    body: 'Checklist: ✓ naudotojas · ✓ problema · ✓ vertė · ✓ 1 funkcija · ✓ kaip žinosi, kad veikia.',
    blockVariant: 'brand',
  },
  {
    heading: 'Patikra',
    body: 'Ar turi visus 5 kortelės laukus?',
    blockVariant: 'accent',
  },
]);

// —— 16.101 VSR ——
{
  const s = slide(16.101);
  s.shortTitle = 'Brief fazės';
  s.subtitle = 'Trys brief brandinimo žingsniai';
  setSections(16.101, [
    {
      heading: 'Trumpai',
      body: 'Pirma užfiksuok kryptį (Vibe – idėjos jausmas), tada karkasą – ciklą ir ribas (Skeleton), tada smailink brief’ą (Refinement). Tai ne antras produkto kelias – tik brief brandinimas.',
      blockVariant: 'accent',
    },
    {
      heading: 'Brief brandinimo žingsniai',
      body: 'Vibe → Skeleton → Refinement. Spausk pakopą.',
      blockVariant: 'brand',
      image: 'm16_vsr_maturity',
      imageAlt: 'Brief brandinimo žingsniai: Vibe, Skeleton, Refinement',
    },
    {
      heading: 'Daryk dabar',
      body: 'Pasakyk: mano idėja dabar Vibe / Skeleton / Refinement – ir kodėl vienu sakiniu.',
      blockVariant: 'brand',
    },
    {
      heading: 'Patikra',
      body: 'Ar jau turi ciklą prieš gludinant tekstą?',
      blockVariant: 'accent',
    },
  ]);
}

// —— 16.11 ——
setSections(16.11, [
  {
    heading: 'Trumpai',
    body: 'Kuriu [produktą], kuris padeda [žmogui] išspręsti [problemą], suteikdamas [rezultatą].',
    blockVariant: 'accent',
  },
  {
    heading: 'Blogas vs geras',
    body: 'Blogas: „Kuriu DI app prioritetams.“\nGeras: „Kuriu dienos prioritetų įrankį, kuris padeda vadovui greitai matyti Top 3, suteikdamas aiškumą per 2 min.“',
    blockVariant: 'brand',
  },
  {
    heading: 'Daryk dabar',
    body: 'Užpildyk formulę iš savo 5 laukų.',
    blockVariant: 'brand',
  },
  {
    heading: 'Patikra',
    body: 'Ar sakinys telpa į vieną eilutę?',
    blockVariant: 'accent',
  },
]);

// —— 16.12 ——
{
  const s = slide(16.12);
  setSections(16.12, [
    {
      heading: 'Trumpai',
      body: 'Trys atramos: problema, naudotojas, vertė. Tada kritika – sakinys turi siaurėti.',
      blockVariant: 'accent',
    },
    {
      heading: 'Trys atramos (iš kortelės)',
      body: '• Problema: rytinis prioritetų chaosas\n• Naudotojas: vadovas\n• Vertė: Top 3 per 2 min',
      blockVariant: 'brand',
    },
    {
      heading: 'Prieš / Po',
      body: 'Prieš: „Kuriu DI app prioritetams visiems.“\nPo: „Kuriu siaurą įrankį vadovui – Top 3 dienos prioritetai per 2 min.“',
      blockVariant: 'brand',
    },
    {
      heading: 'Daryk dabar',
      body: 'Paleisk Skeptiko promptą ant savo idėjos ir įrašyk Po greta.',
      blockVariant: 'brand',
    },
    {
      heading: 'Skeptikas',
      body: 'Nukopijuok ir pritaikyk savo kontekstui.',
      blockVariant: 'brand',
      copyable:
        'Tu esi skeptiškas produkto konsultantas. Mano idėja: [trumpai].\n1) Surask nepatikrintas prielaidas.\n2) Užduok max 5 klausimus, kurie sumažina riziką.\n3) Pasakyk, kas greičiausiai neveiks pirmame prototipe.\nNesiūlyk papildomų funkcijų ir tech stack.',
    },
    {
      heading: 'Patikra',
      body: 'Ar Po sakinys atsisakė bent vienos prielaidos?',
      blockVariant: 'accent',
    },
  ]);
  if (s.content.preCopyCheckBlock) {
    s.content.preCopyCheckBlock.explanation =
      'Skeptikas siaurina prielaidas – neprideda funkcijų ir stack.';
  }
}

// —— 16.14 ——
setSections(16.14, [
  {
    heading: 'Trumpai',
    body: 'Trys siauros kryptys tai pačiai problemai – ne 30 funkcijų.',
    blockVariant: 'accent',
  },
  {
    heading: 'Trys kryptys A / B / C',
    body: 'Pavyzdys (dienos prioritetai). Žemiau – savo A/B/C.',
    blockVariant: 'brand',
    table: {
      headers: ['Kryptis', 'Kam', 'Ką daro', 'Rezultatas'],
      rows: [
        [
          'A',
          'Užsiėmęs profesionalas',
          'Rodo 3 dienos prioritetus',
          'Žino, nuo ko pradėti per 1 min',
        ],
        [
          'B',
          'Komandos narys',
          'Dalijasi vienu prioritetų sąrašu',
          'Visi mato tą patį „dabar“',
        ],
        [
          'C',
          'Vadovas',
          'Matuoja, kiek užduočių baigta',
          'Trumpa dienos santrauka (aiškumas)',
        ],
      ],
    },
  },
  {
    heading: 'Daryk dabar',
    body: 'Perrašyk 3 eilutes savo idėjai (kam / ką daro / rezultatas).',
    blockVariant: 'brand',
  },
  {
    heading: 'Patikra',
    body: 'Ar kiekviena kryptis vis dar ta pati problema?',
    blockVariant: 'accent',
  },
]);

// —— 16.15 ——
setSections(16.15, [
  {
    heading: 'Trumpai',
    body: 'Rinkis tą kryptį, kurią gali patikrinti greičiausiai – ne gražiausią. Balai – orientyras, ne egzaminas.',
    blockVariant: 'accent',
  },
  {
    heading: 'Krypties lab',
    body: 'Pasirink A, B arba C. Po pasirinkimo matai balus ir gali nukopijuoti kodėl.',
    blockVariant: 'brand',
    image: 'm16_direction_picker',
    imageAlt: 'Krypties pasirinkimo lab: A/B/C, balai ir kopijuojamas kodėl',
  },
  {
    heading: 'Orientyras 1–5 (pavyzdys)',
    body: 'Trys kriterijai žmonių kalba: (1) Greitis patikrinti – ar gali išbandyti per dieną? (2) Aiškumas – ar naudotojas supranta be paaiškinimo? (3) Rizika – kiek sudėtingumo (1 = maža).',
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
    heading: 'Daryk dabar',
    body: 'Pasirink A/B/C lab’e. Užrašyk nugalėtoją greta kortelės.',
    blockVariant: 'brand',
  },
  {
    heading: 'Patikra',
    body: 'Ar nugalėtojas patikrinamas per dieną, o ne per ketvirtį?',
    blockVariant: 'accent',
  },
]);

// —— 16.16 ——
setSections(16.16, [
  {
    heading: 'Trumpai',
    body: 'Aprašyk, kaip žmogus pereina nuo poreikio iki rezultato – 5 žingsniai. Tai ne funkcijų sąrašas.',
    blockVariant: 'accent',
  },
  {
    heading: 'Naudotojo ciklas',
    body: 'Triggeris → įvestis → veiksmas → rezultatas → kitas (su grįžimu). Spausk žingsnį.',
    blockVariant: 'brand',
    image: 'm16_user_cycle',
    imageAlt: 'Naudotojo ciklas su grįžimu',
  },
  {
    heading: 'Užpildytas ciklas (dienos prioritetai)',
    body: '1. Triggeris: rytas, reikia žinoti Top 3.\n2. Įvestis: įveda 3–5 užduotis.\n3. Veiksmas: sistema surikiuoja.\n4. Rezultatas: mato Top 3.\n5. Kitas: pradeda nuo pirmo / grįžta rytoj.',
    blockVariant: 'brand',
  },
  {
    heading: 'Daryk dabar',
    body: 'Tuščias šablonas nugalėtojai krypčiai: Triggeris → Įvestis → Veiksmas → Rezultatas → Kitas.',
    blockVariant: 'brand',
  },
  {
    heading: 'Patikra',
    body: 'Ar „Rezultatas“ matomas naudotojui per <2 min? (Greita patikra = mažesnė rizika.)',
    blockVariant: 'accent',
  },
]);

// —— 16.17 ——
{
  const s = slide(16.17);
  s.content.sections[0].body =
    'Kiekvienas ekranas = ciklo žingsnis. Max 3–5 – kitaip MVP per platus.';
  s.content.sections[1].body =
    'Pavyzdys (dienos prioritetai) – max 5.';
}

// —— 16.18 ——
setSections(16.18, [
  {
    heading: 'Trumpai',
    body: 'Tie patys trys stulpeliai brief kalba: Must (≤4) = Būtina · Should = Galima · Won’t = Nekuriame. „Dabar“ = vienas trumpas ciklas – be ketvirčio plano.',
    blockVariant: 'accent',
  },
  {
    heading: 'Must / Should / Won’t ir NNL',
    body: 'Pavyzdys dienos prioritetų įrankiui – perrašyk savo idėjai.',
    blockVariant: 'brand',
    table: {
      headers: ['Zona', 'Pavyzdys', 'Dabar → Toliau → Vėliau'],
      rows: [
        [
          'Must (≤4)',
          'Surikiuoti 3 dienos užduotis',
          'Dabar: vienas ciklas <2 min',
        ],
        [
          'Should',
          'Priminimas ryte',
          'Toliau: po pirmos greitos patikros (M18)',
        ],
        [
          'Won’t (≥3)',
          'Prisijungimas, mokėjimai (Stripe)',
          'Vėliau / niekada šiame MVP',
        ],
      ],
    },
  },
  {
    heading: 'Daryk dabar',
    body: 'Užpildyk Must/Should/Won’t + Dabar→Toliau→Vėliau savo idėjai.\nPavyzdys: Must – Top 3; Should – priminimas; Won’t – prisijungimas / mokėjimai.',
    blockVariant: 'brand',
  },
  {
    heading: 'Patikra',
    body: 'Ar prisijungimas/mokėjimai Won’t, jei jie neša pirmą ciklą?',
    blockVariant: 'accent',
  },
]);

// —— 16.201 ——
setSections(16.201, [
  {
    heading: 'Trumpai',
    body: 'Trys rizikos + kaip sumažinsi. Ne plati rizikos matrica – viena eilutė kiekvienai.',
    blockVariant: 'accent',
  },
  {
    heading: '3 rizikos',
    body: 'Pavyzdžiai – perrašyk savo idėjai.',
    blockVariant: 'brand',
    table: {
      headers: ['Rizika', 'Kaip sumažinsi'],
      rows: [
        [
          'Per plati apimtis',
          'Must ≤4; prisijungimas/mokėjimai → Won’t',
        ],
        [
          'Nėra tikrų duomenų / užduočių',
          'Įdėk 3 pavyzdines užduotis prieš pirmą bandymą',
        ],
        [
          'Naudotojas negrįžta',
          'Sėkmės kriterijus <2 min pirmame cikle',
        ],
      ],
    },
  },
  {
    heading: 'Daryk dabar',
    body: 'Įrašyk 3 savo rizikas. Šablonas: „Rizika → Mažinu taip:“',
    blockVariant: 'brand',
  },
  {
    heading: 'Patikra',
    body: 'Ar kiekviena rizika turi vieną konkrečią mažinimo eilutę?',
    blockVariant: 'accent',
  },
]);

// —— 16.205 warm-up ——
{
  const s = slide(16.205);
  s.content.questions = [
    {
      id: 'm16-wu-must',
      question: 'Ar „Būtina dabar“ (Must) telpa į ≤4 punktus pirmame MVP brief’e?',
      options: [
        'Taip – Must ≤4, siaura apimtis',
        'Ne – reikia ≥10, kad nieko nepamirštum',
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
        'Vertė = pokytis; funkcija = kaip produktas veikia. Žr. skaidrę „Vertė nėra funkcija“.',
    },
    {
      id: 'm16-wu-cycle',
      question: 'Ar turi 5 žingsnių eigą (ne funkcijų sąrašą)?',
      options: [
        'Taip – triggeris → įvestis → veiksmas → rezultatas → kitas',
        'Pakanka funkcijų sąrašo be eigos',
        'Užtenka hosting plano',
        'Eiga reikalinga tik po GitHub',
      ],
      correct: 0,
      explanation: 'Ciklas = UX seka. Žr. skaidrę „Naudotojo ciklas“.',
    },
  ];
}

// —— 16.21 brief ——
{
  const s = slide(16.21);
  setSections(
    16.21,
    [
      {
        heading: 'Trumpai',
        body: 'Brief – vienas dokumentas prieš kodą. Žemiau 11 laukų. Stack ir ERD – ne čia. Tą patį dokumentą naudosime Modulio 18 projekte.',
        blockVariant: 'accent',
      },
      {
        heading: '11 brief laukų',
        body: '1. Produkto sakinys\n2. Problema\n3. Tikslinis naudotojas\n4. Vertės pažadas\n5. Pagrindinis naudotojo ciklas\n6. MVP ribos (Must / Should / Won’t)\n7. Pagrindiniai ekranai (≤5)\n8. Duomenys (high-level; detalus modelis – M18)\n9. Dabar → Toliau → Vėliau\n10. 3 rizikos\n11. Sėkmės kriterijus',
        blockVariant: 'brand',
      },
      {
        heading: 'Daryk dabar',
        body: 'Sukurk Docs failą `01_MVP_BRIEF.md` (arba užrašinės puslapį). Užpildyk 11. Jei užstrigai – Brief pagalbininkas.',
        blockVariant: 'brand',
      },
      {
        heading: 'Brief pagalbininkas',
        body: 'Nukopijuok ir pritaikyk savo kontekstui.',
        blockVariant: 'brand',
        copyable:
          'Padėk parašyti siaurą MVP brief lietuviškai.\nKontekstas: [kortelė / idėja].\nTaisyklės: Must ≤4; Won’t ≥3; max 3 spragos klausimais; be tech stack (stack – vėliau).\nGrąžink 11 laukų:\n1) produkto sakinys\n2) problema\n3) naudotojas\n4) vertė\n5) ciklas\n6) Must/Should/Won’t\n7) ekranai ≤5\n8) duomenys (high-level)\n9) Dabar→Toliau→Vėliau\n10) 3 rizikos\n11) sėkmės kriterijus.',
      },
      {
        heading: 'Patikra',
        body: 'Must≤4? Won’t≥3? Sėkmės kriterijus patikrinamas per <2 min?',
        blockVariant: 'accent',
      },
    ],
    {
      briefCheckBlock: s.content.briefCheckBlock,
      preCopyCheckBlock: s.content.preCopyCheckBlock,
    }
  );
}

// —— 16.22 summary ——
{
  const s = slide(16.22);
  s.content.introBody =
    'Nuo miglotos idėjos iki siauro brief’o su ribomis ir patikra – prieš bet kokį generavimą.';
  s.content.stats = [
    { label: '5 laukai', value: '5' },
    { label: '11 brief laukų', value: '11' },
    { label: 'Prieš kodą', value: '✓' },
  ];
  s.content.sections = s.content.sections.map((sec) => {
    if (sec.heading === 'Triage') {
      return {
        ...sec,
        items: ['Būtina / Galima / Nekuriame', 'Ribos: ką darome / nedarome'],
      };
    }
    return sec;
  });
  s.content.tagline =
    'Disciplina prasideda brief’u – ne generavimu.';
}

// Module chrome soft plain
if (Array.isArray(mod.businessExamples)) {
  mod.businessExamples = mod.businessExamples.map((ex) =>
    typeof ex === 'string' && /MVP brief/i.test(ex)
      ? ex.replace(/MVP brief/gi, 'siaura užduotis / brief')
      : ex
  );
}

writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
console.log('Patched M16 LT plain in modules.json');
