#!/usr/bin/env node
/**
 * Seed modules 16–18 into full authoring SOT (modules.json).
 * Idempotent. Does NOT touch core profiles. generate:core-data N/A.
 *
 * Note: JSON number 16.10 === 16.1 — VSR slide uses id 16.101 (tema 16.10),
 * same pattern as M13 13.101 for tema 13.10.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dataPath = join(root, 'src', 'data', 'modules.json');

const COPY = {
  skeptikas: `Tu esi skeptiškas produkto konsultantas. Mano idėja: [trumpai].
1) Surask nepatikrintas prielaidas.
2) Užduok max 5 klausimus, kurie sumažina riziką.
3) Pasakyk, kas greičiausiai neveiks pirmame prototipe.
Nesiūlyk papildomų funkcijų ir tech stack.`,
  brief: `Padėk parašyti siaurą MVP brief lietuviškai.
Kontekstas: [kortelė / idėja].
Taisyklės: Must ≤4; Won’t ≥3; max 3 spragos klausimais; be tech stack (stack – vėliau).
Grąžink 11 laukų: produkto sakinys, problema, naudotojas, vertė, ciklas, Must/Should/Won’t, ekranai ≤5, duomenys (high-level), Dabar→Toliau→Vėliau, 3 rizikos, sėkmės kriterijus.`,
  cursorSlice: `Dirbk Cursor projekte. Tikslas: vienas vertikalus pjūvis – [1 funkcija iš Must].
Prieš kodą: (1) failų planas, (2) Done kriterijus, (3) Won’t (ko nelieči).
Lauk mano „taip“. Tada generuok mažai, paleisk, patikrink.
Kalba UI: LT. Raktų ne kode ir ne promptuose.`,
  errorCtx: `Simptomas: [ką matau].
Tikėjausi: [rezultatas].
Failai / vieta: [keliai].
Ką jau bandžiau: [1–2].
Užduok 4 tikslinančius klausimus, tada pasiūlyk 1 hipotezę ir 1 pakeitimą.`,
  planBefore: `Prieš generuodamas kodą, surašyk:
1) kuriuos failus kurs/keisi,
2) ką laikysime Done,
3) ko neliesi (Won’t).
Lauk mano „taip“ – tada tik generuok.`,
  projectRules: `Stack: Cursor-first; nekeisk stack be klausimo.
Must: [1–4 punktai iš brief].
Won’t: [auth / mokėjimai / … – ne šiame MVP].
Done: [kaip žinosime, kad veikia].
Kalba: LT UI tekstuose; kodas – aiškūs vardai.
Saugumas: raktų ne kode ir ne promptuose.
Prieš didesnį pakeitimą: failų planas → mano „taip“ → tada kodas.`,
};

function footerNext(n, title) {
  return `Toliau – skaidrė ${n}: ${title}`;
}

function contentBlock({ id, title, subtitle, shortTitle, trumpai, daryk, patikra, footer, copyable }) {
  const sections = [
    { heading: 'Trumpai', body: trumpai, blockVariant: 'accent' },
    { heading: 'Daryk dabar', body: daryk, blockVariant: 'brand' },
  ];
  if (copyable) {
    sections.push({
      heading: copyable.label,
      body: 'Nukopijuok ir pritaikyk savo kontekstui.',
      blockVariant: 'brand',
      copyable: copyable.text,
    });
  }
  sections.push({ heading: 'Patikra', body: patikra, blockVariant: 'accent' });
  return {
    id,
    title,
    shortTitle: shortTitle || title,
    subtitle,
    type: 'content-block',
    content: { sections, footer },
  };
}

function buildM16() {
  const defs = [
    { id: 16.2, title: 'Ką šiandien padarysi', subtitle: '1 problema · 1 naudotojas · 1 užduotis', shortTitle: 'Šiandien',
      trumpai: 'Šiandien: 1 problema, 1 naudotojas, 1 pagrindinė funkcija ir greitas būdas patikrinti, ar prototipas veikia. Rezultatas – ne prezentacija.',
      daryk: 'Pasirink idėją (pvz. dienos prioritetų įrankis) ir užrašyk vienu sakiniu: kam ir ką sprendi.',
      patikra: 'Ar gali paaiškinti užduotį per 20 sekundžių be žodžio „app“?', nextN: 3, nextT: 'Proceso schema' },
    { id: 16.3, title: 'Proceso schema', subtitle: 'Nuo problemos iki testo', shortTitle: 'Proceso schema',
      trumpai: 'Kelias: PROBLEMA → NAUDOTOJAS → VERTĖ → 1 FUNKCIJA → PROTOTIPAS → TESTAS. Cursor build – tik Modulyje 18.',
      daryk: 'Pažymėk, kuriame žingsnyje esi dabar.',
      patikra: 'Ar žinai, kad šiame modulyje baigiame brief’u, ne kodu?', nextN: 4, nextT: 'Problema prieš sprendimą' },
    { id: 16.4, title: 'Problema prieš sprendimą', subtitle: 'Blogas ir geras startas', shortTitle: 'Problema prieš sprendimą',
      trumpai: 'Blogas: „Noriu app su DI.“ Geras: konkreti naudotojo problema situacijoje su pasekme.',
      daryk: 'Perrašyk savo idėją kaip problemą: kas kenčia, kada, kokia pasekmė.',
      patikra: 'Ar sakinys apie žmogų, o ne apie technologiją?', nextN: 5, nextT: 'Problemos formulė' },
    { id: 16.5, title: 'Problemos formulė', subtitle: 'Naudotojas · problema · situacija · pasekmė', shortTitle: 'Problemos formulė',
      trumpai: 'Formulė: [Naudotojas] susiduria su [problema] kai [situacija], todėl [pasekmė]. Tikrink: dažnis, nepatogumas, ar prototipas patikrina dalį.',
      daryk: 'Užpildyk formulę. Mokėjimas – optional.',
      patikra: 'Ar prototipas gali patikrinti bent vieną skausmo dalį?', nextN: 6, nextT: 'Vertė nėra funkcija' },
    { id: 16.6, title: 'Vertė nėra funkcija', subtitle: 'Pokytis vs veiksmas produkte', shortTitle: 'Vertė ≠ funkcija',
      trumpai: 'Vertė = pokytis žmogui (pvz. sutaupo 10 min). Funkcija = veiksmas produkte (pvz. surikiuoja 3 užduotis).',
      daryk: 'Parašyk porą: vertė + funkcija po vieną sakinį.',
      patikra: 'Ar vertė lieka prasminga, jei pakeistum įrankį?', nextN: 7, nextT: 'MVP apimtis' },
    { id: 16.7, title: 'MVP apimtis', subtitle: 'Būtina dabar · Galima vėliau · Nekuriame', shortTitle: 'MVP apimtis',
      trumpai: 'Triage mapinasi į Must / Should / Won’t. Pirmam MVP – 1 fn + max 1–2 palaikančios.',
      daryk: 'Įmesk 5 idėjas į tris stulpelius. Auth ir mokėjimai – greičiausiai Nekuriame.',
      patikra: 'Ar „Būtina“ telpa į vieną trumpą naudotojo ciklą?', nextN: 8, nextT: 'Kūrimo kortelė' },
    { id: 16.8, title: 'Praktika: kūrimo kortelė', subtitle: '5 laukai – tiltas į brief', shortTitle: 'Kūrimo kortelė',
      trumpai: 'Laukai: naudotojas, problema, vertė, pagrindinė funkcija, kaip žinosime, kad prototipas veikia. Tai įvestis į brief.',
      daryk: 'Užpildyk kortelę savo idėjai (arba dienos prioritetų įrankiui).',
      patikra: 'Ar funkcija tikrai viena? Ar sėkmės kriterijus patikrinamas?', nextN: 9, nextT: 'Perėjimas į brief' },
    { id: 16.9, title: 'Perėjimas į brief', subtitle: 'Iš kortelės į koncepciją', shortTitle: 'Perėjimas',
      trumpai: 'Pirmoje dalyje – kortelė. Dabar: kritika, kryptis, ribos ir 01_MVP_BRIEF.md. Dar ne Cursor build.',
      daryk: 'Pasidėk kortelę šalia – jos laukai keliaus į brief.',
      patikra: 'Ar turi visus 5 kortelės laukus?', nextN: 10, nextT: 'Vibe → Skeleton → Refinement' },
    { id: 16.101, title: 'Vibe → Skeleton → Refinement', subtitle: 'Brief brandinimo fazės', shortTitle: 'VSR',
      trumpai: 'Vibe → Skeleton → Refinement – brief fazės, ne antras delivery kelias. (Curriculum tema 16.10; id 16.101 dėl JSON skaičiaus.)',
      daryk: 'Pasakyk, kurioje fazėje tavo idėja dabar.',
      patikra: 'Ar nešoki į Refinement be Skeleton ciklo?', nextN: 11, nextT: 'Produkto sakinys' },
    { id: 16.11, title: 'Produkto sakinys', subtitle: 'Vienas sakinys – kam ir kodėl', shortTitle: 'Produkto sakinys',
      trumpai: 'Kuriu [produktą], kuris padeda [žmogui] išspręsti [problemą], suteikdamas [rezultatą].',
      daryk: 'Parašyk produkto sakinį iš kortelės.',
      patikra: 'Ar sakinys telpa į vieną eilutę?', nextN: 12, nextT: 'Trys atramos ir kritika' },
    { id: 16.12, title: 'Trys atramos ir kritika', subtitle: 'Problema–naudotojas–vertė + Prieš/Po', shortTitle: 'Trys atramos',
      trumpai: 'Trys atramos + skeptiška kritika be funkcijų spill. Prieš/Po: po kritikos sakinys siauresnis.',
      daryk: 'Paleisk Skeptiko promptą ant savo idėjos ir perrašyk sakinį Po.',
      patikra: 'Ar Po sakinys atsisakė bent vienos prielaidos?', nextN: 13, nextT: 'Trys kryptys',
      copyable: { label: 'Skeptikas', text: COPY.skeptikas } },
    { id: 16.14, title: 'Trys kryptys', subtitle: 'A / B / C – kam, ką, rezultatas', shortTitle: 'Trys kryptys',
      trumpai: 'Trys kryptys lentele: kam / ką daro / rezultatas. Ne 30 funkcijų. v1 – lentelė, ne lab.',
      daryk: 'Užpildyk A/B/C po vieną eilutę kiekvienam stulpeliui.',
      patikra: 'Ar kiekviena kryptis vis dar ta pati problema?', nextN: 14, nextT: 'Rinkis patikrinamiausią' },
    { id: 16.15, title: 'Rinkis patikrinamiausią', subtitle: 'Lentelė 1–5, ne radaras', shortTitle: 'Rinkis kryptį',
      trumpai: 'Įvertink kryptis 1–5: greitis patikrinti, aiškumas, rizika. Rinkis patikrinamiausią.',
      daryk: 'Pažymėk nugalėtoją ir vieną sakinį kodėl.',
      patikra: 'Ar nugalėtojas patikrinamas per dieną, o ne per ketvirtį?', nextN: 15, nextT: 'Naudotojo ciklas' },
    { id: 16.16, title: 'Naudotojo ciklas', subtitle: 'Triggeris → Įvestis → Veiksmas → Rezultatas → Kitas', shortTitle: 'Naudotojo ciklas',
      trumpai: 'Viena schema visam keliui. Ciklas aprašo UX, ne funkcijų sąrašą.',
      daryk: 'Užrašyk 5 žingsnius savo nugalėtojai krypčiai.',
      patikra: 'Ar „Rezultatas“ matomas naudotojui per <2 min?', nextN: 16, nextT: 'Ekranai iš srauto' },
    { id: 16.17, title: 'Ekranai iš srauto', subtitle: 'Max 3–5 ekranai', shortTitle: 'Ekranai',
      trumpai: 'Ekranai kyla iš ciklo. Max 3–5. Ne DI fantazija su dešimtimi langų.',
      daryk: 'Išvardyk ekranus iš savo ciklo (≤5).',
      patikra: 'Ar kiekvienas ekranas turi vietą cikle?', nextN: 17, nextT: 'Ribos ir Now–Next–Later' },
    { id: 16.18, title: 'Ribos ir Now–Next–Later', subtitle: 'Must ≤4 · Won’t sąmoningai', shortTitle: 'Ribos',
      trumpai: 'Būtina/Galima/Nekuriame = Must≤4 / Should / Won’t. „Dabar“ = vienas trumpas ciklas – be Q roadmap.',
      daryk: 'Užpildyk Must (≤4), Should, Won’t (≥3) ir Dabar→Toliau→Vėliau.',
      patikra: 'Ar Auth/Stripe/MCP yra Won’t, jei jie neša pirmą ciklą?', nextN: 18, nextT: 'Rizikos' },
    // tema 16.20 → id 16.201 (JSON 16.20 === 16.2)
    { id: 16.201, title: 'Rizikos', subtitle: '3 rizikos + mažinimas', shortTitle: 'Rizikos',
      trumpai: 'Thin rizikos lentelė: 3 rizikos + kaip sumažinsi. Ne 2×2 MUST matrica.',
      daryk: 'Įrašyk 3 rizikas (pvz. per plati apimtis, nėra duomenų, naudotojas negrįžta).',
      patikra: 'Ar kiekviena rizika turi vieną konkrečią mažinimo eilutę?', nextN: 19, nextT: 'MVP brief' },
  ];

  const slides = [
    {
      id: 160,
      title: 'Kodo inžinerijos kelias',
      subtitle: 'Planavimas prieš Cursor',
      type: 'action-intro',
      content: {
        whyBenefit: 'Po šio modulio turėsi aiškų MVP brief’ą – kam, ką ir kokiomis ribomis kursime su DI.',
        heroStat: 'Vibe coding',
        heroText: 'su disciplina.',
        heroSubText: 'Promptų pamatai – Moduliuose 1–6. Čia – produkto užduotis ir siauras brief prieš generavimą.',
        firstActionCTA: 'Per 2 min užrašyk vieną naudotoją ir vieną problemą savo idėjai (arba naudok dienos prioritetų pavyzdį).',
        outcomes: [
          '1+1+1: naudotojas, problema, vertė, 1 funkcija',
          'Kūrimo kortelė → 01_MVP_BRIEF.md',
          'Must / Won’t ir patikrinamas sėkmės kriterijus',
        ],
        duration: '~25–30 min',
        audience: 'Skirta verslo ir produktų žmonėms – veikiantis prototipas be gilaus programavimo.',
        footer: footerNext(2, 'Ką šiandien padarysi'),
      },
    },
    ...defs.map((d) =>
      contentBlock({
        id: d.id,
        title: d.title,
        subtitle: d.subtitle,
        shortTitle: d.shortTitle,
        trumpai: d.trumpai,
        daryk: d.daryk,
        patikra: d.patikra,
        footer: footerNext(d.nextN, d.nextT),
        copyable: d.copyable,
      })
    ),
    contentBlock({
      id: 16.21,
      title: 'Praktika: MVP brief',
      subtitle: 'Užpildyk 01_MVP_BRIEF.md (11 laukų)',
      shortTitle: 'MVP brief',
      trumpai: 'Brief = produkto sakinys, problema, naudotojas, vertė, ciklas, Must/Should/Won’t, ekranai ≤5, duomenys (high-level), Dabar→Toliau→Vėliau, 3 rizikos, sėkmės kriterijus. Alias M18: mvp_brief.md.',
      daryk: 'Užpildyk 11 laukų. Jei užstrigai – nukopijuok Brief pagalbininką.',
      patikra: 'Must≤4? Won’t≥3? Sėkmės kriterijus patikrinamas per <2 min?',
      footer: footerNext(20, 'Modulio 16 santrauka'),
      copyable: { label: 'Brief pagalbininkas', text: COPY.brief },
    }),
    {
      id: 16.22,
      title: 'Modulio 16 santrauka',
      subtitle: 'Brief paruoštas – toliau testas',
      shortTitle: 'Santrauka',
      type: 'summary',
      content: {
        introHeading: 'Ką išmokai',
        introBody: 'Nuo miglotos idėjos iki 01_MVP_BRIEF.md – su Must/Won’t, ciklu ir patikrinamu sėkmės kriterijumi.',
        stats: [
          { label: 'Kortelės laukai', value: '5' },
          { label: 'Brief laukai', value: '11' },
          { label: 'Kelias', value: 'Kodo inž.' },
        ],
        sections: [
          { heading: 'Problema prieš sprendimą', icon: 'Target', color: 'brand', items: ['Formulė ir kortelė', 'Vertė ≠ funkcija'] },
          { heading: 'Triage', icon: 'Layers', color: 'violet', items: ['Būtina / Galima / Nekuriame', 'Must ≤4'] },
          { heading: 'Ciklas ir ekranai', icon: 'Workflow', color: 'emerald', items: ['5 žingsnių ciklas', '≤5 ekranai'] },
          { heading: 'Brief', icon: 'Zap', color: 'amber', items: ['01_MVP_BRIEF.md', '11 privalomų laukų'] },
          { heading: 'Kritika', icon: 'Sparkles', color: 'rose', items: ['Skeptikas', '3 rizikos'] },
        ],
        tagline: 'Vibe coding su disciplina prasideda brief’u – ne generavimu.',
        nextStepCTA: 'Pereik prie Modulio 17: Žinių patikrinimas (Kodo kelias)',
        abilityBefore: 'Idėją laikiau „reikia app“ be ribų.',
        abilityAfter: 'Moku užpildyti MVP brief su Must/Won’t ir ciklu.',
        firstAction24h: 'Šiandien užbaik 01_MVP_BRIEF.md vienai siaurai idėjai.',
        footer: 'Toliau – Modulis 17: Žinių patikrinimas',
      },
    },
  ];

  return {
    id: 16,
    title: 'Kodo inžinerija su DI',
    subtitle: 'Planavimas: nuo idėjos iki MVP brief',
    description: 'Išmoksi suformuluoti siaurą MVP užduotį ir užpildyti aiškų brief prieš Cursor.',
    icon: 'Cpu',
    level: 'learn',
    duration: '25–30 min',
    unlocksAfter: 6,
    accent: 'cyan',
    identityIcon: 'Cpu',
    slides,
    businessExamples: [
      { title: 'MVP brief', description: 'Siaura užduotis su Must/Won’t' },
      { title: 'Naudotojo ciklas', description: 'Triggeris → rezultatas per <2 min' },
    ],
    transfer: {
      abilityBefore: 'Idėją laikiau „reikia app“ be ribų.',
      abilityAfter: 'Moku užpildyti MVP brief su Must/Won’t ir ciklu.',
      firstAction24h: 'Šiandien užbaik 01_MVP_BRIEF.md vienai siaurai idėjai.',
      nextStepCTA: 'Pereik prie Modulio 17 testo',
    },
  };
}

function buildM17() {
  return {
    id: 17,
    title: 'Žinių patikrinimas (Kodo kelias)',
    subtitle: 'Testas: brief ir planavimo kokybė',
    description: 'Patikrink, ar brief’as siauras ir patikrinamas. ≥70% rekomenduojama prieš Modulį 18.',
    icon: 'ClipboardCheck',
    level: 'test',
    duration: '12–15 min',
    unlocksAfter: 16,
    accent: 'cyan',
    identityIcon: 'ClipboardCheck',
    slides: [
      {
        id: 170,
        title: 'Modulio 17 testas',
        subtitle: 'Brief ir planavimo žinios',
        type: 'test-intro',
        content: {
          whyBenefit: 'Po testo žinosi, ar brief’as pakankamai siauras ir patikrinamas prieš Cursor projektą.',
          duration: '~12–15 min',
          firstActionCTA: 'Atsakyk į klausimus apie brief ir planavimą – ne apie kodą ar deploy.',
          microWinPhrase: 'Kiekvienas teisingas atsakymas rodo, kad moki siaurinti užduotį prieš generavimą.',
          thresholds: { pass: 70, fail: 0 },
          thresholdExplanation: 'Kai pasieksi ≥70 %, gali pereiti prie Modulio 18 (projektas). Jei mažiau – peržiūrėk Modulio 16 brief ir triage skaidres.',
          footer: footerNext(2, 'Savitikra'),
        },
      },
      {
        id: 170.5,
        title: 'Savitikra prieš testą',
        shortTitle: 'Savitikra',
        subtitle: '3 klausimai: 1+1+1, vertė, kelias į M18',
        type: 'warm-up-quiz',
        content: {
          questions: [
            {
              id: 'm17-warm-1',
              question: 'Koks geriausias 1+1+1 startas MVP užduočiai?',
              options: [
                'Naudotojas + problema + 1 pagrindinė funkcija (ir sėkmės kriterijus)',
                '10 funkcijų sąrašas + stack pasirinkimas',
                '„Sukurk app su DI“ be naudotojo',
                'Iš karto Auth ir Stripe',
              ],
              correct: 0,
              explanation: 'Siauras startas = žmogus, problema, viena funkcija. Stack ir mokėjimai – vėliau.',
            },
            {
              id: 'm17-warm-2',
              question: 'Kuris teiginys yra vertė, o ne funkcija?',
              options: [
                'Sutaupo 10 minučių rytą susidėliojant prioritetus',
                'Turi drag-and-drop lentelę',
                'Jungiasi prie 5 API',
                'Naudoja Redis cache',
              ],
              correct: 0,
              explanation: 'Vertė = pokytis žmogui. Likę – funkcijos ar infra.',
            },
            {
              id: 'm17-warm-3',
              question: 'Po testo ką darysi pirmiausia Modulyje 18?',
              options: [
                'Sudėliosi BUILD PACKET iš brief’o (flow, rules, Cursor promptas) – ne „sukurk visą app“',
                'Iš karto prašysi DI parašyti visą sistemą be PACKET',
                'Praleisi brief ir eisi į multi-agent setup',
                'Pradėsi nuo Heroku blue-green kurso',
              ],
              correct: 0,
              explanation: 'M18 ašis: brief → PACKET → Cursor pjūvis → proof. Ne chaotiškas generate.',
            },
          ],
          footer: footerNext(3, 'Klausimai'),
        },
      },
      {
        id: 171,
        title: 'Klausimai',
        subtitle: 'Planavimas ir brief kokybė',
        type: 'test-section',
        testQuestions: [
          { id: 'm17-q1', type: 'mcq', question: 'Kurį startą laikyti blogu?',
            options: ['„Noriu app su DI“', 'Konkreti naudotojo problema su situacija', '1 naudotojas + 1 problema', 'Vertė vienu sakiniu'],
            correct: 0, explanation: 'Be problemos – tik technologijos troškimas.', relatedSlideId: 16.4 },
          { id: 'm17-q2', type: 'mcq', question: '„Surikiuoja 3 užduotis“ – kas tai?',
            options: ['Vertė', 'Funkcija', 'Rizika', 'Won’t'],
            correct: 1, explanation: 'Tai produkto veiksmas = funkcija. Vertė būtų laiko / streso pokytis.', relatedSlideId: 16.6 },
          { id: 'm17-q3', type: 'mcq', question: 'Auth ir Stripe pirmame MVP triage – kur?',
            options: ['Būtina dabar', 'Galima vėliau arba Nekuriame (Won’t pirmam ciklui)', 'Must visada', 'Ignoruoti triage'],
            correct: 1, explanation: 'Mokėjimai/auth retai būtini pirmajam siauram ciklui.', relatedSlideId: 16.18 },
          { id: 'm17-q4', type: 'mcq', question: 'Teisinga VSR tvarka brief brandinimui?',
            options: ['Refinement → Vibe → Skeleton', 'Vibe → Skeleton → Refinement', 'Skeleton → Deploy → Vibe', 'Tik Refinement'],
            correct: 1, explanation: 'Kryptis → karkasas → ribos/brief.', relatedSlideId: 16.101 },
          { id: 'm17-q5', type: 'mcq', question: 'Ko dažniausiai trūksta silpname brief’e?',
            options: ['Must/Won’t ir sėkmės kriterijaus', 'Tik logo failo', 'Heroku pipeline', '80% coverage'],
            correct: 0, explanation: 'Ribos ir patikrinamas Done – brief branduolys.', relatedSlideId: 16.21 },
          { id: 'm17-q6', type: 'mcq', question: 'Kas geriau aprašo UX?',
            options: ['Triggeris→Įvestis→Veiksmas→Rezultatas→Kitas', '20 funkcijų bullet list', 'Tik ERD', 'Tik stack lentele'],
            correct: 0, explanation: 'Ciklas aprašo naudotojo patirtį.', relatedSlideId: 16.16 },
          { id: 'm17-q7', type: 'mcq', question: 'Kas „per anksti“ prieš siaurą MVP?',
            options: ['Redis + AWS + 10 ekranų + Auth', '1 ciklas ir ≤5 ekranai', '3 rizikos', 'Must ≤4'],
            correct: 0, explanation: 'Infra ir plotis be pirmo ciklo – per anksti.', relatedSlideId: 16.18 },
          { id: 'm17-q8', type: 'mcq', question: 'Ką duoti Cursor prieš generate?',
            options: ['PACKET / rules / vertikalų pjūvį', 'Tik „sukurk app“', 'Tik memą', 'Tik kainų anekdotą'],
            correct: 0, explanation: 'Kontekstas ir ribos prieš generavimą.', relatedSlideId: 16.21 },
          { id: 'm17-q9', type: 'mcq', question: 'Po DI pakeitimo prieš commit ko negalima praleisti?',
            options: ['Diff skaitymo (ir smoke)', 'Ištrinti testus', 'Commit be žinutės ir be peržiūros', 'Įdėti .env su raktais'],
            correct: 0, explanation: 'Diff ritualas – disciplina po generavimo.', relatedSlideId: 16.21 },
          { id: 'm17-q10', type: 'mcq', question: 'MCP serveriai brief fazėje?',
            options: ['Per anksti branduoliui – neprivaloma', 'Privaloma visada', 'Vienintelis kelias', 'Keičia Must/Won’t'],
            correct: 0, explanation: 'MCP/Spec Kit – ne privalomas kelias šiame kurse.', relatedSlideId: 16.18 },
        ],
        content: { footer: footerNext(4, 'Rezultatai') },
      },
      {
        id: 172,
        title: 'Rezultatai',
        subtitle: 'Ar brief’as paruoštas Moduliui 18?',
        type: 'test-results',
        content: {
          useCaseBlock: {
            heading: 'Kitas žingsnis: Modulis 18',
            body: 'Jei ≥70 % – eik į projektą: BUILD PACKET, Cursor vertikalus pjūvis ir soft DoD. Jei mažiau – grįžk prie kortelės ir brief’o Modulio 16.',
          },
          footer: footerNext(5, 'Bonus: brief checklist'),
        },
      },
      {
        id: 173,
        title: 'Bonus: brief checklist per 5 min',
        subtitle: 'Optional prieš Modulį 18',
        shortTitle: 'Bonus checklist',
        type: 'content-block',
        optional: true,
        badgeVariant: 'bonus',
        content: {
          sections: [
            { heading: 'Trumpai', body: 'Patikrink: produkto sakinys, Must≤4, Won’t≥3, ciklas, ≤5 ekranai, sėkmės kriterijus.', blockVariant: 'accent' },
            { heading: 'Daryk dabar', body: 'Pažymėk žaliai/raudonai kiekvieną punktą savo 01_MVP_BRIEF.md.', blockVariant: 'brand' },
            { heading: 'Patikra', body: 'Ar gali pradėti PACKET be „sukurk visą app“?', blockVariant: 'accent' },
          ],
          footer: 'Toliau – Modulis 18: Finalinis projektas',
        },
      },
    ],
    businessExamples: [
      { title: 'Brief kokybė', description: 'Siaurumas ir patikrinamumas' },
      { title: 'Triage', description: 'Must vs Won’t prieš Cursor' },
    ],
  };
}

function m18Slide(id, title, subtitle, shortTitle, trumpai, daryk, patikra, nextN, nextT, copyable) {
  return contentBlock({
    id, title, subtitle, shortTitle, trumpai, daryk, patikra,
    footer: footerNext(nextN, nextT),
    copyable,
  });
}

function buildM18() {
  const slides = [
    {
      id: 180,
      title: 'Kodo inžinerijos projektas',
      subtitle: 'PACKET → Cursor → soft DoD',
      type: 'practice-intro',
      content: {
        whyBenefit: 'Po projekto turėsi BUILD PACKET ir įrodytą paleidžiamą (arba lokaliai veikiantį) MVP.',
        duration: '~45–90 min',
        firstActionCTA: 'Atidaryk savo 01_MVP_BRIEF.md (arba šabloną) ir pažymėk Must / Won’t.',
        outcomes: [
          'BUILD PACKET (brief, flow, rules, Cursor promptas)',
          'Vertikalus pjūvis Cursor su planu prieš kodą',
          'Soft DoD: URL arba lokalus proof + GitHub',
        ],
        minScenariosToComplete: 1,
        recommendedSlideIds: [18.12, 18.23],
        taskOneLiner: 'Sudėliok PACKET, padaryk vieną Cursor pjūvį ir surink soft DoD įrodymą.',
        footer: footerNext(2, 'Refresh: brief → PACKET'),
      },
    },
    m18Slide(18.05, 'Refresh: brief → PACKET', 'Vienintelis 1+1+1 priminimas', 'Refresh',
      'Turi brief. Čia nekartojame viso M16. Primename: 1 naudotojas, 1 problema, 1 fn – ir pereiname į PACKET.',
      'Atidaryk brief ir patvirtink Must (≤4) bei sėkmės kriterijų.',
      'Ar gali eiti į flow be naujo „noriu app“?', 3, 'Kodėl ne visa app'),
    m18Slide(18.1, 'Kodėl ne visa app', 'Chaosas vs kontroliuojamas kūrimas', 'Ne visa app',
      'DI siūlo daug. Žmogus riboja. Kontroliuojamas kūrimas = PACKET + vienas pjūvis.',
      'Užrašyk, ką DI greičiausiai pasiūlys per daug tavo temoje.',
      'Ar turi sakinį, kuo atsakysi į „o gal dar…“?', 4, 'Anti-pavyzdys'),
    m18Slide(18.2, 'Anti-pavyzdys', 'Task Manager + Redis/Auth/Stripe', 'Anti-pavyzdys',
      'Pilnas Task Manager su Redis, WebSocket, AWS, Auth, Stripe – ne pirmas MVP.',
      'Išbrauk iš savo listo viską, kas neša pirmą ciklą.',
      'Ar liko vienas vertikalus pjūvis?', 5, 'User flow'),
    m18Slide(18.3, 'User flow', '5–7 žingsniai + klaidos atšakos', 'User flow',
      'Flow = 5–7 žingsniai su klaidos atšakomis. Ekranai – iš srauto.',
      'Užrašyk flow failui user_flow.md (arba brief skyriui).',
      'Ar yra bent viena klaidos atšaka?', 6, 'Minimalūs duomenys'),
    m18Slide(18.4, 'Minimalūs duomenys', '2–4 esybės, plain LT', 'Duomenys',
      '2–4 esybės su atributais paprasta kalba. Ne SQL vs NoSQL kursas. schema.dbml – optional.',
      'Išvardyk esybes (pvz. Užduotis, Prioritetas).',
      'Ar apsieisi be sudėtingos DB pirmam pjūviui?', 7, 'Build brief'),
    m18Slide(18.5, 'Build brief (6 laukai)', 'Projektas · naudotojas · tikslas · kontekstas · apribojimai · Done', 'Build brief',
      'Tie patys 6: intent · acceptance · constraints. Tai tiltas į Cursor promptą.',
      'Užpildyk 6 laukus viename bloke.',
      'Ar Done patikrinamas be DI interpretacijos?', 8, 'PROJECT_RULES'),
    m18Slide(18.6, 'PROJECT_RULES.md', '8–12 eilučių agentui', 'PROJECT_RULES',
      'Trumpos taisyklės: stack hint, Must/Won’t, Done, LT, saugumas, approve gate.',
      'Nukopijuok šabloną ir užpildyk savo Must/Won’t.',
      'Ar failas tilptų į repo šaknį?', 9, 'Cursor vertikalus pjūvis',
      { label: 'PROJECT_RULES.md', text: COPY.projectRules }),
    m18Slide(18.7, 'Cursor vertikalus pjūvis', 'Viena funkcija / vienas pjūvis', 'Cursor pjūvis',
      'Viena Must funkcija. Failų planas prieš kodą. Priėmimo kriterijai.',
      'Nukopijuok Cursor pjūvio promptą ir įrašyk savo 1 fn.',
      'Ar pjūvis telpa į vieną ciklą?', 10, 'Planas prieš kodą',
      { label: 'Cursor vertikalus pjūvis', text: COPY.cursorSlice }),
    m18Slide(18.8, 'Planas → patvirtinimas → kodas', 'Žmogus sako „taip“ prieš generate', 'Planas prieš kodą',
      'Agentas grąžina failų planą; tu patvirtini; tada kodas. Tas pats pattern kaip saugus refaktorius.',
      'Nukopijuok „Planas prieš kodą“ ir paleisk prieš pirmą generate.',
      'Ar turi rašytinį „taip“ momentą?', 11, 'Composer vs Chat',
      { label: 'Planas prieš kodą', text: COPY.planBefore }),
    m18Slide(18.9, 'Composer vs Chat', 'Viena mintis – ne mastery kursas', 'Composer vs Chat',
      'Multi-file agent = PACKET įvestis. Chat = klaidos/debug. Ne abu chaotiškai vienu metu.',
      'Pasirink: pirmam pjūviui – agentas su PACKET; debug – Chat su kontekstu.',
      'Ar žinai, kurį režimą naudosii pirmam žingsniui?', 12, 'Iteracijos ciklas'),
    m18Slide(18.101, 'Iteracijos ciklas', 'Aprašyk → Generuok mažai → Paleisk → Patikrink → Pataisyk', 'Iteracija',
      'Maži ciklai. Klaida + kontekstas. Ne „pergeneruok viską“. (Tema 18.10; id 18.101 dėl JSON skaičiaus.)',
      'Užrašyk savo pirmo pjūvio iteracijos 5 žingsnius.',
      'Ar „Generuok“ eina po plano?', 13, 'Klaidos promptas'),
  ];

  slides.push(
    m18Slide(18.11, 'Klaidos promptas', 'Blogas: „Neveikia“ · Geras: kontekstas', 'Klaidos promptas',
      'Geras klaidos promptas: simptomas, tikėtasi, failai, ką bandei, 4 klausimai.',
      'Nukopijuok Klaidos konteksto šabloną ir užpildyk paskutine klaida (arba hipotetine).',
      'Ar vengi vieno žodžio „neveikia“?', 14, 'BUILD PACKET',
      { label: 'Klaidos kontekstas', text: COPY.errorCtx }),
    m18Slide(18.12, 'Praktika: BUILD PACKET', 'mvp_brief · user_flow · schema? · build_prompt · PROJECT_RULES', 'BUILD PACKET',
      'PACKET failai: mvp_brief.md (alias 01_MVP_BRIEF.md), user_flow.md, optional schema, build_prompt.md, PROJECT_RULES.md.',
      'Surašyk checklist: kas yra / ko trūksta. Tai privalomas projekto minimumas.',
      'Ar Cursor gali dirbti be „sukurk visą app“?', 15, 'Kodas nėra produktas'),
    m18Slide(18.13, 'Kodas nėra produktas', 'DI generuoja – žmogus tikrina', 'Kodas ≠ produktas',
      'Žmogus tikrina paleidimą, funkciją, saugumą, regresiją. Kodas be proof – ne produktas.',
      'Įvardyk, ką tu asmeniškai patikrinsii po pirmo generate.',
      'Ar turi bent 1 patikros veiksmą?', 16, '3 vibe-debt spąstai'),
    m18Slide(18.14, '3 vibe-debt spąstai', 'Testai pagal kodą · perteklius · „atrodo veikia“', '3 spąstai',
      '(1) Testai, kuriuos DI parašė pagal kodą, ne pagal brief ciklą. (2) Dubliuotos fn / perteklinės abstrakcijos. (3) „Atrodo veikia“, bet praleistas verslo kraštas.',
      'Pažymėk, kuris spąstas tau rizikingiausias.',
      'Ar turi planą, kaip jo išvengsi?', 17, '5 rizikos'),
    m18Slide(18.15, '5 rizikos', 'Deps → Env → Tests → Security → Deploy', '5 rizikos',
      'Navigacija: priklausomybės, aplinka, testai/smoke, saugumas, paleidimas. Thin deps.',
      'Eik per 5 punktus savo projektui – žalia / geltona / raudona.',
      'Ar yra raudona prieš pirmą smoke?', 18, 'Smoke ir kritinis kelias'),
    m18Slide(18.16, 'Smoke ir kritinis kelias', 'Pasileidžia + pagrindinė fn', 'Smoke',
      'Smoke: ar pasileidžia; UI/API; pagrindinė fn. 1 raudona = nestartuojame giliau. Kritinis kelias = brief ciklas.',
      'Aprašyk 3 smoke žingsnius savo pjūviui.',
      'Ar žinai, kas yra „raudona“?', 19, 'Edge ir .env'),
    m18Slide(18.17, 'Edge ir .env', 'Normalu / Riba / Klaida · raktai ne promptuose', 'Edge ir .env',
      'Edge: Normalu / Riba / Klaida. .env ne kode, ne GitHub. Tikro rakto nerodyk promptuose ir skaidrėse.',
      'Užrašyk po 1 pavyzdį Normalu / Riba / Klaida. Patikrink, kad .env.example be slaptų.',
      'Ar promptuose nėra tikrų raktų?', 20, 'Debug: 1 pakeitimas'),
    m18Slide(18.18, 'Debug: 1 pakeitimas', 'Klaida → įrodymai → hipotezė → 1 change → testas', 'Debug',
      'Nedaryk: 5 failai vienu metu, trinti testus, slėpti klaidas. Daryk: 1 pakeitimas.',
      'Paimk vieną klaidą ir suformuluok 1 hipotezę + 1 pakeitimą.',
      'Ar keiti tik vieną dalyką?', 21, 'Paleidimo vartai'),
    m18Slide(18.19, 'Paleidimo vartai', 'VEIKIA → PATIKRINTA → APSAUGOTA → PALEISTA → STEBIMA', 'Paleidimo vartai',
      'Vartai padeda nestumti „veikia lokalai“ tiesiai į viešą be patikros.',
      'Pažymėk, kuriame vartuose esi dabar.',
      'Ar nešoki per APSAUGOTA (raktai, .gitignore)?', 22, 'Git ir diff'),
    m18Slide(18.201, 'Git sauga ir diff ritualas', 'status → diff → smoke → commit → push', 'Git ir diff',
      'Prieš didesnį DI pakeitimą – commit veikiančios versijos. Po DI: perskaityk diff, tada smoke, tada commit. (Tema 18.20; id 18.201.)',
      'Surašyk savo ritualą 5 žodžiais.',
      'Ar diff eina prieš commit?', 23, 'Deploy-ready'),
  );

  slides.push(
    m18Slide(18.21, 'Deploy-ready checklist', 'README · deps · gitignore · env.example', 'Deploy-ready',
      'README paleidimui, deps failas, .gitignore, .env.example, paleidimo komanda.',
      'Pažymėk checklist savo repo (ar planuojamam).',
      'Ar svetimas žmogus galėtų paleisti pagal README?', 24, 'Publish'),
    m18Slide(18.22, 'Publish', 'Platform-agnostic – ne Heroku-only', 'Publish',
      'GitHub → host → build → start → URL → logs. Platforma – tavo pasirinkimas.',
      'Pasirink viešą URL kelią arba lokalų proof kelią.',
      'Ar DoD leidžia lokalų įrodymą, jei viešo dar nėra?', 25, 'Soft DoD'),
    m18Slide(18.23, 'Soft DoD ir proof', 'Įrodymas vartotojui arba lokaliai', 'Soft DoD',
      'DoD: GitHub + commit’ai · gitignore · README · PROJECT_RULES · ≥1 kritinės fn patikra · viešas URL arba lokalus proof · 1 pataisyta problema · rollback mintis.',
      'Pažymėk checklist ir pridėk proof (URL arba lokalus paleidimo aprašas). Tai own-work closer.',
      'Ar vibe coding baigiasi įrodymu, o ne generavimu?', 26, 'Modulio 18 santrauka'),
    {
      id: 18.24,
      title: 'Modulio 18 santrauka',
      subtitle: 'PACKET + įrodytas MVP',
      shortTitle: 'Santrauka',
      type: 'summary',
      content: {
        introHeading: 'Ką išmokai',
        introBody: 'Sudėliojai BUILD PACKET, dirbai Cursor su planu prieš kodą ir surinkai soft DoD įrodymą.',
        stats: [
          { label: 'PACKET', value: '5 failai' },
          { label: 'DoD', value: 'soft' },
          { label: 'Stack', value: 'Cursor' },
        ],
        sections: [
          { heading: 'PACKET', icon: 'Layers', color: 'brand', items: ['mvp_brief + flow + rules', 'Cursor build promptas'] },
          { heading: 'Disciplina', icon: 'Target', color: 'violet', items: ['Planas prieš kodą', 'Diff prieš commit'] },
          { heading: 'Higiena', icon: 'Workflow', color: 'emerald', items: ['Smoke', '.env be raktų'] },
          { heading: 'DoD', icon: 'Zap', color: 'amber', items: ['URL arba lokalus proof', 'GitHub'] },
          { heading: 'Toliau', icon: 'Compass', color: 'rose', items: ['Siaurink kitą idėją', 'Kartok PACKET ritualą'] },
        ],
        tagline: 'Vibe coding su disciplina baigiasi, kai sistema patikimai veikia vartotojui (arba įrodytai lokaliai).',
        nextStepCTA: 'Pritaikyk PACKET kitai siaurai idėjai per 7 dienas.',
        abilityBefore: 'DI kodą paleisdavau be PACKET ir proof.',
        abilityAfter: 'Turiu PACKET ir soft DoD įrodymą (URL arba lokalus).',
        firstAction24h: 'Padaryk 1 commit + 1 smoke / proof savo MVP.',
        footer: 'Kelias „Kodo inžinerija“ – brief → testas → įrodytas MVP.',
      },
    }
  );

  return {
    id: 18,
    title: 'Finalinis projektas (Kodo kelias)',
    subtitle: 'BUILD PACKET → Cursor → soft DoD',
    description: 'Sudėliosi BUILD PACKET ir įrodysi paleidžiamą (arba lokalų) MVP su disciplina.',
    icon: 'Rocket',
    level: 'practice',
    duration: '45–90 min',
    unlocksAfter: 17,
    accent: 'cyan',
    identityIcon: 'Rocket',
    slides,
    businessExamples: [
      { title: 'BUILD PACKET', description: 'Brief, flow, rules, Cursor promptas' },
      { title: 'Soft DoD', description: 'URL arba lokalus proof + GitHub' },
    ],
    transfer: {
      abilityBefore: 'DI kodą paleisdavau be PACKET ir proof.',
      abilityAfter: 'Turiu PACKET ir soft DoD įrodymą (URL arba lokalus).',
      firstAction24h: 'Padaryk 1 commit + 1 smoke / proof savo MVP.',
      nextStepCTA: 'Pritaikyk PACKET kitai siaurai idėjai',
    },
  };
}

function main() {
  const data = JSON.parse(readFileSync(dataPath, 'utf8'));
  const m16 = buildM16();
  const m17 = buildM17();
  const m18 = buildM18();

  // Validate no duplicate slide ids within each module
  for (const mod of [m16, m17, m18]) {
    const ids = mod.slides.map((s) => s.id);
    const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
    if (dup.length) {
      console.error(`Duplicate slide ids in module ${mod.id}:`, dup);
      process.exit(1);
    }
  }

  data.modules = data.modules.filter((m) => m.id < 16 || m.id > 18);
  data.modules.push(m16, m17, m18);
  data.modules.sort((a, b) => a.id - b.id);

  writeFileSync(dataPath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  console.log(
    `Seeded modules 16–18: slides ${m16.slides.length} / ${m17.slides.length} / ${m18.slides.length}`
  );
}

main();
