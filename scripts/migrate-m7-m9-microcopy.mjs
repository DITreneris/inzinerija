/**
 * One-off migration: M7–M9 microcopy trim (3 sprints).
 * Run: node scripts/migrate-m7-m9-microcopy.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const modulesPath = path.join(root, 'src/data/modules.json');

const data = JSON.parse(fs.readFileSync(modulesPath, 'utf8'));

function getModule(id) {
  return data.modules.find((m) => m.id === id);
}

function getSlide(moduleId, slideId) {
  const mod = getModule(moduleId);
  return mod?.slides.find((s) => s.id === slideId);
}

function patikraBody(specific) {
  return `• ${specific}\n• Ar rezultatas atitinka tikslą?\n\nJei ne — grįžk prie 2️⃣ ir nukopijuok teisingą promptą.`;
}

function cleanBody(body) {
  if (typeof body !== 'string') return body;
  return body
    .replace(/\n\n🔘 Kopijuoti promptą[^\n]*/g, '')
    .replace(/\n🔘 Kopijuoti promptą[^\n]*/g, '')
    .replace(/Jei bent 2 „ne“ →[^\n]*/g, 'Jei ne — grįžk prie 2️⃣ ir nukopijuok teisingą promptą.')
    .trim();
}

function updateSections(slide, fn) {
  if (!slide?.content?.sections) return;
  slide.content.sections = fn(slide.content.sections);
}

function removeSection(sections, headingPrefix) {
  return sections.filter((s) => !s.heading?.startsWith(headingPrefix));
}

function setSectionBody(sections, headingMatch, body) {
  return sections.map((s) =>
    s.heading === headingMatch || s.heading?.startsWith(headingMatch)
      ? { ...s, body: typeof body === 'function' ? body(s.body) : body }
      : s
  );
}

function removeEmptyPromptIntro(sections) {
  return sections
    .map((s) => {
      if (
        s.heading?.includes('Kopijuojami promptai') &&
        s.body?.match(/^Kiekvien(am|ai|am tipui|ai sričiai|am agent)/)
      ) {
        const { body, ...rest } = s;
        return rest.body === undefined ? { ...rest } : rest;
      }
      if (
        (s.heading?.includes('Kopijuojami promptai') ||
          s.heading?.includes('Kopijuojamas promptas')) &&
        !s.copyable &&
        !s.body?.trim()
      ) {
        return null;
      }
      if (s.heading?.includes('Kopijuojami promptai') && !s.copyable) {
        return null;
      }
      if (
        s.heading?.includes('Kopijuojamas promptas') &&
        s.copyable &&
        s.body?.match(/^Naudok|^Use when|^Paste|^Įklijuok/i)
      ) {
        return { ...s, body: '' };
      }
      return s;
    })
    .filter(Boolean);
}

// --- Sprint 1: M7 70 ---
const s70 = getSlide(7, 70);
if (s70?.content) {
  s70.content.heroSubText =
    'Pasirink sritį – toliau tie patys šablonai, pritaikyk savo kontekstui.';
  s70.content.confirmMessage =
    'Fokusas: {label}. Naudok tuos pačius promptus – įterpk savo kontekstą.';
  const choices = s70.content.journeyChoices;
  const rink = choices?.find((c) => c.id === 'rinkodara');
  if (rink) rink.subtitle = 'Turinio ir kanalų analizė';
  const it = choices?.find((c) => c.id === 'it-inzinerija');
  if (it) it.subtitle = 'Pipeline ir duomenų struktūros';
}

// --- M7 70.5 ---
const s705 = getSlide(7, 70.5);
if (s705?.content?.revealInsights) {
  for (const ri of s705.content.revealInsights) {
    delete ri.insight;
    delete ri.question;
  }
}

// --- M7 71 ---
const s71 = getSlide(7, 71);
if (s71) {
  s71.subtitle = 'Valdyk DI kaip analitiką – ne leisk spėlioti.';
  updateSections(s71, (sections) => {
    let s = sections.map((sec) => ({
      ...sec,
      body: sec.body ? cleanBody(sec.body) : sec.body,
    }));
    s = setSectionBody(
      s,
      'Kodėl tai svarbu?',
      'Dauguma klausia per abstrakčiai, neįvardija šaltinių ir formato – gauna gražų tekstą be vertės. Čia išmoksi gauti sprendimui tinkamą išvadą su patikrinamais šaltiniais.'
    );
    s = setSectionBody(
      s,
      'Kada tai naudosi?',
      'Kai reikia 1 puslapio vadovybei, tendencijų analizės ar prognozės – ne fantazijos.'
    );
    s = setSectionBody(
      s,
      'O Modulyje 4?',
      'Šaltinius ir tikrinimą jau matei M4 – čia fokusas analizės užklausoms ir išvadoms.'
    );
    s = setSectionBody(
      s,
      'Daryk dabar – pirmas analitiko promptas',
      'Nukopijuok promptą žemiau į DI, paleisk ir palygink su „paprastu klausimu“.'
    );
    return s;
  });
  if (s71.content) {
    s71.content.toolsIntro =
      'Principai veikia bet kuriame įrankyje – sąrašas žemiau (pasirinktinai).';
    const shortTools = {
      'ChatGPT (OpenAI)': 'CSV/Excel, grafikai, greita EDA.',
      'Claude (Anthropic)': 'Ilgas kontekstas, dokumentų sintezė, išvados.',
      'Gemini (Google)': 'Sheets, Drive, paieška – duomenys vienoje vietoje.',
      'Copilot (Microsoft)': 'Excel, Power BI, Teams – be perjungimų.',
      'Grok (xAI)': 'Realaus laiko tendencijos ir sentimentas.',
      'DeepSeek': 'Statistika, Python/R skriptai, geras kainos/kokybės santykis.',
    };
    for (const tool of s71.content.tools ?? []) {
      if (shortTools[tool.name]) tool.description = shortTools[tool.name];
      if (tool.useCases?.length > 3) tool.useCases = tool.useCases.slice(0, 3);
    }
  }
}

// --- M7 726 ---
const s726 = getSlide(7, 726);
if (s726?.content) {
  s726.content.sections = [
    {
      heading: '1️⃣ Kaip skaityti kartu su skaidre 725',
      body: 'Infografikoje (725) – skaičiai ir diagramos. Čia – problemos ir veiksmai be skaičių kartojimo.',
      blockVariant: 'accent',
    },
    {
      heading: '2️⃣ Trys problemos',
      body: '• **Investicijų kryptis** – daug lėšų eina į „wow“, o grąža dažniausiai – rutininėse operacijose.\n• **Pilotų spąstai** – projektai lieka demo, nepereina į gamybą.\n• **Duomenų kultūra** – nestruktūruoti duomenys (ypač LT) blokuoja automatizavimą.',
      blockVariant: 'terms',
    },
    {
      heading: '3️⃣ Keturi veiksmai verslui',
      body: '**1. Įteisinti šešėlinį DI** – taisyklės, licencijos, mokymai.\n**2. Keisti kultūrą** – standartizuok struktūras ir duomenų higieną.\n**3. Automatizuoti rutiną** – dokumentai, sąskaitos, ataskaitos.\n**4. DI kaip infrastruktūra** – duomenys → integracija → taisyklės → DI.',
      blockVariant: 'brand',
    },
    {
      heading: '4️⃣ Esminė išvada',
      body: 'DI problema nėra technologinė – ji kultūrinė ir organizacinė. Asmeniniame lygmenyje DI jau laimėjo; organizaciniame – dar pradžia.',
      blockVariant: 'accent',
    },
  ];
}

// --- M9 90 ---
const s90 = getSlide(9, 90);
if (s90?.content) {
  s90.content.primaryPathIntro =
    '**8 žingsnių ciklas** (sk. 93–94): schema ir kopijuojami promptai. Užtenka moduliui užbaigti.';
  delete s90.content.meaningParagraph;
  delete s90.content.taskOneLiner;
  s90.content.firstActionCTA = 'Spausk „Tęsti“ → schema ir promptai.';
  s90.content.audience =
    'Baigei M7–M8 ir nori vieną kartą praeiti pilną analizę su DI.';
  s90.content.recommendedStart = 'Papildomi scenarijai: sk. 99 (hub).';
  s90.content.storyBlock =
    '4 veikėjai, iki 17 papildomų užduočių – neprivaloma, per hub (sk. 99).';
  delete s90.content.characterMeaning;
  s90.content.useCaseBlock =
    '• Ketvirčio ataskaita valdybai\n• Klientų atsiliepimai ir apklausos';
  s90.content.learningOutcomes = [
    'Atliksi 8 žingsnių ciklą su kopijuojamais promptais.',
    'Turėsi suvestinę arba .html dashboard; scenarijai – neprivalomi.',
  ];
}

// --- Patikra updates for specific slides ---
const patikraMap = {
  732: 'Ar rezultatas turi 5 punktus ir prioritetinius veiksmus?',
  733: 'Ar šablonas atitinka užduotį (duomenys / konkurentai / finansai)?',
  734: 'Ar pasirinkai filtrą pagal situaciją ir gavai konkretų veiksmą?',
  85: 'Ar gavai ryšius, dubliavimą, butelio kakliukus ir 5 KPI?',
  86: 'Ar gavai bent 3 iš 4 (tendencijos, segmentai, pelningumas, įžvalgos)?',
  83: 'Ar DI atsakyme matosi rolė, sisteminis mąstymas ir duomenų pagrindas?',
  84: 'Ar pateiktos lentelės, ryšiai ir KPI?',
  87: 'Ar gavai prognozę su scenarijais?',
  89: 'Ar gavai tyrimo struktūrą su 5 žingsniais?',
  91: 'Ar rezultatas turi 5 eilutes, 2 rodiklius ir interpretaciją?',
  94: 'Ar pasirinkai teisingą agentą (Research / EDA / Insight)?',
  95: 'Ar gavai elementus arba ryšius su optimizacijomis?',
  97: 'Ar rezultatas apima planą, rodiklius ir vadovų gaires?',
  90: 'Ar pasirinkai tinkamą EDA sritį (statistika / koreliacija / anomalijos / hipotezės)?',
};

for (const [id, q] of Object.entries(patikraMap)) {
  const slide = getSlide(7, Number(id));
  updateSections(slide, (sections) => {
    let s = sections.map((sec) => ({
      ...sec,
      body: sec.body ? cleanBody(sec.body) : sec.body,
    }));
    s = setSectionBody(s, '4️⃣ Patikra', patikraBody(q));
    return removeEmptyPromptIntro(s);
  });
}

// Trim 732-734 kam tai
const s732 = getSlide(7, 732);
updateSections(s732, (sections) =>
  setSectionBody(
    sections,
    '1️⃣ Kam tai?',
    '**Verslo sentimentų analizė** – temos, intensyvumas, veiksmai; ne tik teigiamas/neigiamas.'
  )
);

// --- M9 scenarios cleanup (101-117) ---
const m9 = getModule(9);
for (const slide of m9?.slides ?? []) {
  if (slide.type !== 'practice-scenario') continue;
  if (slide.content?.reflectionPromptAfter) delete slide.content.reflectionPromptAfter;
  if (slide.scenario?.narrativeLead) delete slide.scenario.narrativeLead;
  if (slide.practicalTask?.motivation) delete slide.practicalTask.motivation;
}

// --- Sprint 2: M7 bulk ---
const s72 = getSlide(7, 72);
updateSections(s72, (sections) => {
  let s = removeSection(sections, '📍 Kur pritaikyti');
  s = setSectionBody(
    s,
    '1️⃣ Kam tai?',
    '**Strateginis pamatas** – 4 principai, ant kurių stovi pipeline ir MASTER PROMPTAS.'
  );
  s = setSectionBody(
    s,
    '2️⃣ Ką čia įsisavinsi',
    '👉 **Duomenų analizė** = rinkimas + tvarkymas + interpretavimas → sprendimai.\n\n👉 **Duomenys > nuomonė** – faktai laimi hierarchiją.\n\n👉 **Variacija egzistuoja** – ne kiekvienas svyravimas = problema.\n\n👉 **Tobulinti sistemą, ne kaltinti žmones** (Deming).\n\n🔘 Kopijuoti promptą (žemiau)\n\n**Uždarymas:** Sistema + duomenys = prognozuojami rezultatai.'
  );
  s = setSectionBody(
    s,
    '4️⃣ Patikra',
    patikraBody('Ar gali vienu sakiniu pasakyti, kuo analizė skiriasi nuo ataskaitos?')
  );
  return s.map((sec) => ({ ...sec, body: sec.body ? cleanBody(sec.body) : sec.body }));
});

const s73 = getSlide(7, 73);
updateSections(s73, (sections) => {
  let s = sections.filter(
    (sec) => !sec.heading?.includes('Greita savitikra')
  );
  s = setSectionBody(
    s,
    '1️⃣ Kam tai?',
    '**6 žingsnių pipeline** – nuo duomenų iki sprendimo. Kiekvienam etapui – promptas žemiau.'
  );
  s = removeSection(s, '📍 Kur pritaikyti');
  s = setSectionBody(s, '4️⃣ Patikra', patikraBody('Ar pasirinkai tinkamą pipeline etapą?'));
  s = removeEmptyPromptIntro(s);
  return s.map((sec) => ({ ...sec, body: sec.body ? cleanBody(sec.body) : sec.body }));
});

const s731 = getSlide(7, 731);
updateSections(s731, (sections) => {
  let s = removeSection(sections, '📍 Kur pritaikyti');
  s = setSectionBody(
    s,
    '1️⃣ Kam tai?',
    '**Keturi tipai** – Kas įvyko? Kodėl? Kas bus? Ką daryti? Pasirink tipą pagal klausimą.'
  );
  s = setSectionBody(
    s,
    '4️⃣ Patikra',
    patikraBody('Ar pasirinkai teisingą analizės tipą pagal klausimą?')
  );
  return removeEmptyPromptIntro(s.map((sec) => ({
    ...sec,
    body: sec.body ? cleanBody(sec.body) : sec.body,
  })));
});

const s78 = getSlide(7, 78);
updateSections(s78, (sections) =>
  sections.map((sec) => {
    if (sec.heading === '2️⃣ Tradicinė analizė vs analizė su DI') {
      return { ...sec, body: 'Palyginimas:' };
    }
    if (sec.heading === '1️⃣ Trumpai') {
      return {
        ...sec,
        body: 'DI pagreitina kelią iki sprendimo: surinkti, paaiškinti, palyginti, pavaizduoti, patikrinti.',
      };
    }
    return { ...sec, body: sec.body ? cleanBody(sec.body) : sec.body };
  })
);

const s891 = getSlide(7, 891);
updateSections(s891, (sections) =>
  setSectionBody(
    sections.map((s) => ({ ...s, body: s.body ? cleanBody(s.body) : s.body })),
    '1️⃣ Kam tai?',
    '**Seka:** Surink → išvalyk → metaduomenys → 4 tipai → veiksmų planas.'
  )
);

const s669 = getSlide(7, 66.9);
if (s669?.content) {
  s669.subtitle =
    'Patikimumas ir etika – po to grįžtame prie EDA ir MASTER PROMPTAS.';
  s669.content.nextSteps = [
    'Promptų manipuliacijos – šališkumas ir neutralūs promptai.',
    'Haliucinacijos – kaip mažinti ir tikrinti.',
    'Žinių patikrinimas – šaltiniai ir „nežinau“ taisyklė.',
  ];
}

const s90eda = getSlide(7, 90);
updateSections(s90eda, (sections) =>
  setSectionBody(
    sections,
    '1️⃣ Kam tai?',
    '**Po etikos bloko – grįžtame prie EDA** (tas pats kelias). 4 sritys: statistika, koreliacija, anomalijos, hipotezės.'
  )
);

const s74 = getSlide(7, 74);
updateSections(s74, (sections) => {
  let s = sections.filter(
    (sec) =>
      !(
        sec.heading === '🔽 Nori suprasti detaliau?' &&
        sec.collapsible &&
        sec.body?.includes('8 žingsnių trumpas priminimas')
      )
  );
  s = setSectionBody(
    s,
    '1️⃣ Kam tai?',
    '**MASTER PROMPTAS** – 8 žingsnių pilna analizė; M9 šablonas. Ne M4 Master promptas apie kontekstą.'
  );
  s = removeSection(s, '📍 Kur pritaikyti');
  s = setSectionBody(
    s,
    '4️⃣ Patikra',
    patikraBody('Ar pakeitei [X] ir gavai visus 8 blokus?')
  );
  s = removeEmptyPromptIntro(s);
  return s.map((sec) => ({ ...sec, body: sec.body ? cleanBody(sec.body) : sec.body }));
});

const s92bi = getSlide(7, 92);
updateSections(s92bi, (sections) => {
  let s = sections.filter((sec) => !sec.heading?.includes('Greita savitikra'));
  s = setSectionBody(
    s,
    '1️⃣ Kam tai?',
    '**BI schema** – Surink → Analizuok → Ataskaita → Prognozė. Du praktiniai promptai žemiau.'
  );
  s = setSectionBody(
    s,
    '4️⃣ Patikra',
    patikraBody('Ar planas apima 4 BI žingsnius?')
  );
  return removeEmptyPromptIntro(s.map((sec) => ({
    ...sec,
    body: sec.body ? cleanBody(sec.body) : sec.body,
  })));
});

const s97 = getSlide(7, 97);
updateSections(s97, (sections) => {
  let s = removeSection(sections, '📍 Kur pritaikyti');
  s = setSectionBody(
    s,
    '4️⃣ Patikra',
    patikraBody('Ar rezultatas apima planą, rodiklius ir vadovų gaires?')
  );
  s = removeEmptyPromptIntro(s);
  return s.map((sec) => ({
    ...sec,
    body: sec.body ? cleanBody(sec.body) : sec.body,
  }));
});

const s75 = getSlide(7, 75);
if (s75?.content?.reflectionPrompt) {
  s75.content.reflectionPrompt = s75.content.reflectionPrompt.replace(
    /INPUT: Ką tik baigiau Duomenų analizės kelio teoriją – pipeline, rolės aktyvavimas, DB struktūra, EDA, BI schema ir MASTER PROMPTAS\./,
    'INPUT: Ką tik baigiau Modulio 7 teoriją (pipeline, MASTER PROMPTAS).'
  );
}

// --- Sprint 2: M8 ---
const s80 = getSlide(8, 80);
if (s80?.content) {
  s80.content.firstActionCTA =
    'Atsakyk – pipeline, MASTER, BI, tipai, sentimentai.';
  s80.content.thresholdExplanation =
    '≥70 % – gali į M9. Mažiau – peržiūrėk M7.';
}

const s805 = getSlide(8, 80.5);
for (const q of s805?.content?.questions ?? []) {
  if (q.id === 'm8-warm-1') {
    q.explanation =
      'Pipeline – 6 žingsniai. MASTER – atskiras 8 žingsnių šablonas. Žr. M7 sk. 73.';
  } else if (q.id === 'm8-warm-2') {
    q.explanation = 'MASTER PROMPTAS – 8 žingsniai. Žr. M7 sk. 74.';
  } else if (q.id === 'm8-warm-3') {
    q.explanation = '„Kodėl?“ = diagnostinė; „Ką daryti?“ = nurodomoji. Žr. M7 sk. 731.';
  }
}

const s81 = getSlide(8, 81);
for (const q of s81?.testQuestions ?? []) {
  if (q.explanation && q.explanation.length > 80) {
    q.explanation = q.explanation.split('.')[0] + '.';
  }
  if (q.scenarioContext && q.scenarioContext.length > 120) {
    const first = q.scenarioContext.split('.')[0];
    q.scenarioContext = first.endsWith('.') ? first : first + '.';
  }
}

const s82 = getSlide(8, 82);
if (s82?.content?.reflectionPrompt) {
  s82.content.reflectionPrompt = s82.content.reflectionPrompt.replace(
    /INPUT: Ką tik baigiau Modulio 8 žinių patikrinimą – pipeline, MASTER promptas, BI, sentimentas ir 4 analizės tipai\./,
    'INPUT: Ką tik baigiau Modulio 8 testą.'
  );
}

// --- Sprint 2: M9 93, 94, 92 summary ---
const s93 = getSlide(9, 93);
updateSections(s93, (sections) =>
  sections
    .filter((sec) => sec.heading !== 'Vienas aiškus ciklas')
    .map((sec) => {
      if (sec.heading === 'Interaktyvi 8 žingsnių schema') {
        return {
          ...sec,
          body: 'Pasirink žingsnį diagramoje – susietas su sk. 94 (CopyButton).',
        };
      }
      return sec;
    })
);

const s94 = getSlide(9, 94);
updateSections(s94, (sections) =>
  sections.map((sec) => {
    if (sec.heading === 'Žingsnis 3–4 – Deep research (bendras 4 įrankiams)') {
      return { ...sec, body: 'Paleisk tą patį promptą keliuose DI – rezultatus sujungsi vėliau.' };
    }
    if (sec.heading === 'Žingsnis 5 – Duomenų valymas') {
      return { ...sec, body: 'Checklist – žr. M7 duomenų paruošimą (891).' };
    }
    return sec;
  })
);

const s92sum = getSlide(9, 92);
if (s92sum?.content) {
  s92sum.content.introBody =
    'Jei perėjai 8 žingsnių workflow – turi suvestinę arba .html juodraštį. Scenarijai – papildomi šablonai.';
  s92sum.content.sections = (s92sum.content.sections ?? []).filter(
    (sec) => sec.heading !== 'Sveikiname!'
  );
  delete s92sum.content.firstAction24h;
  delete s92sum.content.nextStepCTA;
}

// M9 105 branching shorter
const s105 = getSlide(9, 105);
if (s105?.scenario?.branching?.choices) {
  for (const c of s105.scenario.branching.choices) {
    if (c.consequence.length > 100) {
      c.consequence = c.consequence.split('.')[0] + '.';
    }
  }
}

// --- Sprint 3: viz branch M7 ---
const s100 = getSlide(7, 100);
updateSections(s100, (sections) =>
  sections.filter((sec) => sec.heading !== '3️⃣ Ryšys su pipeline')
);

const s101viz = getSlide(7, 101);
if (s101viz?.content?.sections) {
  const gestaltBullets = [
    '**Artumas** – artimi elementai atrodo susiję.',
    '**Panašumas** – ta pati spalva/forma = ta pati reikšmė.',
    '**Išskyrimas** – vienas paryškintas fokusas.',
    '**Sujungimas** – linijos rodo ryšį.',
    '**Tęstinumas** – akis seka kryptį.',
    '**Uždarymas** – užbaigtos formos.',
    '**Figūra ir fonas** – svarbiausias atsiskiria.',
    '**Bendras judėjimas** – ta pati kryptis = ryšys.',
  ];
  const keep = s101viz.content.sections.filter(
    (sec) =>
      sec.heading === '1️⃣ Kodėl čia?' ||
      sec.heading === '2️⃣ 10 / 20 / 80 principas' ||
      sec.heading === 'Daryk dabar' ||
      sec.heading?.startsWith('🔽')
  );
  keep.splice(2, 0, {
    heading: '3️⃣ Aštuoni vizualinio grupavimo principai',
    body: gestaltBullets.join('\n'),
    blockVariant: 'brand',
  });
  s101viz.content.sections = keep;
}

for (const id of [103, 104, 106]) {
  const sl = getSlide(7, id);
  updateSections(sl, (sections) =>
    sections.map((sec) => {
      if (sec.heading === '1️⃣ Kodėl čia?' && sec.body) {
        const first = sec.body.split('.')[0];
        return { ...sec, body: (first.endsWith('.') ? first : first + '.') };
      }
      return sec;
    })
  );
}

const s999 = getSlide(7, 99.9);
if (s999?.content?.nextSteps?.length > 2) {
  s999.content.nextSteps = s999.content.nextSteps.slice(0, 2);
}

const s7135 = getSlide(7, 71.35);
if (s7135?.content) {
  delete s7135.content.whyBenefit;
}

const s775 = getSlide(7, 77.5);
updateSections(s775, (sections) =>
  sections.map((sec) => {
    if (sec.heading === 'Kaip paleisti skriptą (5 žingsniai)' && sec.body) {
      return {
        ...sec,
        body:
          '1. Išsaugok skriptą kaip scrape.py\n2. Atidaryk terminalą\n3. `pip install requests beautifulsoup4`\n4. `python scrape.py`\n5. Atidaryk CSV',
      };
    }
    return sec;
  })
);

const s98 = getSlide(7, 98);
updateSections(s98, (sections) =>
  setSectionBody(
    sections,
    '1️⃣ Kodėl čia?',
    'Kur baigiasi bazinis kelias ir prasideda gilesnė praktika (modeliai, validacija).'
  )
);

// Generic patikra pass for remaining M7 content-blocks with old pattern
for (const mod of data.modules.filter((m) => m.id === 7)) {
  for (const slide of mod.slides) {
    if (slide.type !== 'content-block' || !slide.content?.sections) continue;
    slide.content.sections = slide.content.sections.map((sec) => {
      if (sec.body?.includes('Jei bent 2 „ne“')) {
        return { ...sec, body: cleanBody(sec.body) };
      }
      return sec;
    });
  }
}

// M8 bonus: copyable sekcijoje jau rodomas promptas – practicalTask dubliuoja
for (const id of [801, 802]) {
  const sl = getSlide(8, id);
  if (sl?.content?.practicalTask) delete sl.content.practicalTask;
}

// M9 scraping scenarijus – refleksijos override (kita nei default)
const s117 = getSlide(9, 117);
if (s117?.content) {
  s117.content.reflectionPromptAfter =
    'META: Tu esi mokymų refleksijos asistentas. Tikslas – įtvirtinti Data scraping scenarijaus patirtį.\nINPUT: Ką tik atlikau Data scraping scenarijų – duomenų rinkimą su DI sugeneruotu Python skriptu.\nOUTPUT: Užduok man vieną klausimą: ką šis scenarijus man davė ir ką pritaikysiu kitą kartą? Po mano atsakymo duok 1 konkretų patarimą.';
}

for (const modId of [7, 8, 9]) {
  for (const slide of getModule(modId)?.slides ?? []) {
    if (!slide.content?.sections) continue;
    slide.content.sections = slide.content.sections.map((s) => {
      if (
        (s.copyable ?? '').trim() &&
        (s.body === undefined || s.body === null) &&
        !s.table &&
        !s.image
      ) {
        return { ...s, body: '' };
      }
      return s;
    });
  }
}

fs.writeFileSync(modulesPath, JSON.stringify(data, null, 2) + '\n', 'utf8');
console.log('Updated', modulesPath);
