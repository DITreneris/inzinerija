#!/usr/bin/env node
/**
 * One-off sync: M10–12 multi-agent business content (plan 2026-06-29).
 * Run: node scripts/sync-m10-12-multi-agent.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = join(__dirname, '..', 'src', 'data', 'modules.json');
const data = JSON.parse(readFileSync(dataPath, 'utf8'));

const m10 = data.modules.find((m) => m.id === 10);
const m11 = data.modules.find((m) => m.id === 11);
const m12 = data.modules.find((m) => m.id === 12);
if (!m10 || !m11 || !m12) throw new Error('Modules 10–12 not found');

const slide10_45 = {
  id: 10.45,
  title: 'DI agentų tipai ir rolės',
  subtitle: 'Gylio lygiai L0–L3 ir multi-agent rolės verslui',
  type: 'content-block',
  content: {
    sections: [
      {
        heading: 'Trumpai',
        body: 'Ne kiekvienai užduočiai reikia DI komandos. Pirmiausia nustatyk **gylio lygį** (L0–L3), tada – ar reikia kelių **rolių** (koordinatorius, specialistas, vertintojas, maršrutizatorius).',
        blockVariant: 'accent',
      },
      {
        heading: 'Gylio lygiai (L0–L3)',
        body: '**L0 – Pokalbis su DI:** vienas klausimas–atsakymas (pvz. el. laiško formulavimas).\n\n**L1 – Vienas DI agentas:** keli žingsniai + įrankiai (tyrimas + santrauka).\n\n**L2 – DI komanda:** skirtingos rolės, perdavimai (RFP: tyrėjas → rašytojas → tikrintojas).\n\n**L3 – Automatizuotas srautas:** trigger → veiksmai (forma → CRM → laiškas).',
        blockVariant: 'brand',
      },
      {
        heading: 'Multi-agent rolės',
        body: '**Koordinatorius** – skaido užduotį, deleguoja, sujungia rezultatus (komandos vadovas).\n\n**Specialistas** – vykdo vieną siaurą darbą: paieška, juodraštis, skaičiavimas.\n\n**Vertintojas** – QC, taisyklės, grąžina pataisymui (redaktorius / compliance).\n\n**Maršrutizatorius** – nukreipia pagal tipą (registratūra / triažas).',
        blockVariant: 'brand',
      },
      {
        heading: '3A susiejimas',
        body: '**Automatize (80 %)** → dažniausiai L3 (srautas, be multi-agent). **Augment (15 %)** → L1 + žmogus (HITL). **Autonomize (5 %)** → L2 su vertintoju ir incident playbook.',
        blockVariant: 'brand',
      },
      {
        heading: 'Daryk dabar',
        body: 'Pasirink vieną savo darbo procesą ir apibrėžk tris roles – koordinatorius, specialistas, vertintojas.',
        blockVariant: 'accent',
      },
      {
        heading: 'Kopijuojamas promptas',
        body: 'Nukopijuok ir užpildyk [X] savo procesu.',
        copyable:
          'Apibrėžk savo procesui [X] tris roles:\n1) Koordinatorius – ką planuoja ir kam deleguoja\n2) Specialistas – ką konkrečiai daro\n3) Vertintojas – ką tikrina prieš pateikiant rezultatą\nKiekvienai rolei – vienas sakinys + įvestis + išvestis.',
      },
      {
        heading: 'Patikra',
        body: 'Ar kiekviena rolė turi aiškų **įvesties** ir **išvesties** aprašymą? Jei ne – per sudėtinga; pradėk nuo L1 (vienas agentas).',
        blockVariant: 'accent',
      },
      {
        heading: 'Kada NENAUDOTI multi-agent',
        body: 'Vienas agentas užtenka paprastai užduočiai. Multi-agent per anksti, jei nėra HITL ar aiškaus „baigta“ kriterijaus. Pradėk paprastai – pridėk roles tik kai vienas agentas nebeužtenka.',
        blockVariant: 'terms',
        collapsible: true,
        collapsedByDefault: true,
      },
    ],
    footer: 'Toliau – skaidrė 6: 5 workflow šablonai',
  },
};

const slide10_48 = {
  id: 10.48,
  title: '5 workflow šablonai verslui',
  subtitle: 'Grandinė, maršrutizavimas, lygiagretus, koordinatorius, vertintojas',
  type: 'content-block',
  content: {
    sections: [
      {
        heading: 'Trumpai',
        body: 'Kai vienas DI agentas nebeužtenka, naudok **workflow šablonus** – ne programavimą, o aiškų vaidmenų ir perdavimų planą.',
        blockVariant: 'accent',
      },
      {
        heading: '5 šablonai',
        body: '**1. Grandinė** – vienas žingsnis po kito (užklausa → klasifikacija → juodraštis → siuntimas).\n\n**2. Maršrutizavimas** – pagal tipą skirtinga šaka (skundas / užklausa / pasiūlymas).\n\n**3. Lygiagretus darbas** – keli specialistai vienu metu, vėliau sujungimas (CRM + el. paštas → viena suvestinė).\n\n**4. Koordinatorius + specialistai** – dinamiškai paskirsto sub-užduotis (savaitės ataskaita: duomenys + tendencijos → 1 puslapis).\n\n**5. Generatorius + vertintojas** – juodraštis → QC → pataisa (laiškas, ataskaita, FAQ).',
        blockVariant: 'brand',
      },
      {
        heading: 'Daryk dabar',
        body: 'Pasirink vieną šabloną savo procesui ir užrašyk, kurios rolės atlieka kiekvieną žingsnį.',
        blockVariant: 'accent',
      },
      {
        heading: 'Kopijuojamas promptas (koordinatorius)',
        body: 'Nukopijuok ir užpildyk [APRAŠYK].',
        copyable:
          'Tu esi koordinatorius. Užduotis: [APRAŠYK].\nSuskaidyk į 2–3 sub-užduotis. Kiekvienai paskirk rolę (specialistas / vertintojas),\nįvestį, išvestį ir perdavimo taisyklę (kada perduoti kitam vaidmeniui).\nPateik planą kaip numeruotą sąrašą.',
      },
      {
        heading: 'Patikra',
        body: 'Ar planas turi aiškų **pabaigos kriterijų**? Ar rizikingi žingsniai turi **HITL** (žmogaus patvirtinimą)?',
        blockVariant: 'accent',
      },
      {
        heading: 'Kada NENAUDOTI multi-agent',
        body: 'Jei užduotis turi 1–2 žingsnius – pakanka L1 (vienas agentas). Multi-agent be vertintojo rizikinga finansams, supportui ir viešam turiniui.',
        blockVariant: 'terms',
        collapsible: true,
        collapsedByDefault: true,
      },
    ],
    footer: 'Toliau – skaidrė 7: Rolė ir sisteminis promptas',
  },
};

function byId(slides, id) {
  const s = slides.find((x) => x.id === id);
  if (!s) throw new Error(`Slide ${id} not found`);
  return s;
}

const order = [100, 10.1, 10.2, 10.25, 10.45, 10.48, 10.3, 10.4, 10.5, 10.6, 10.15, 10.35, 10.65, 10.7, 10.8];
const reordered = order.map((id) => {
  if (id === 10.45) return slide10_45;
  if (id === 10.48) return slide10_48;
  return byId(m10.slides, id);
});
m10.slides = reordered;
m10.duration = '25–30 min';

// Update intro 100
const intro = m10.slides.find((s) => s.id === 100);
intro.content.heroSubText =
  'Projektuosi agentus savo procesams – taksonomija, multi-agent koordinacija, no-code įrankiai. Kontekstas – Modulyje 4.';
intro.content.audience =
  'Skirta verslo specialistams ir inžinieriams, baigusiems Modulius 4–6 (Konteksto inžinerija).';
intro.content.outcomes = [
  'Suprasi agentų taksonomiją (L0–L3) ir multi-agent roles',
  'Naudosi 5 workflow šablonus ir sisteminius promptus',
  'Žinosi, kaip pasirinkti įrankius ir apriboti rizikas',
];

// Update 10.1 overview
const s101 = m10.slides.find((s) => s.id === 10.1);
s101.content.sections[0].body = s101.content.sections[0].body.replace(
  '**3A strategija**, **rolė',
  '**3A strategija**, **DI agentų tipai ir rolės**, **5 workflow šablonai**, **rolė'
);
s101.content.sections[1].body =
  '**Agentų ciklas** → **3A strategija** → **DI agentų tipai ir rolės** → **5 workflow šablonai** → **Rolė ir sisteminis promptas** → **Įrankių pasirinkimas** → **Kada agentas** → **Klaidos ir ribos** → **Workflow sąvokos** → **Verslo automatizavimo įrankiai** → neprivaloma: spec/testai; **Žodynėlis**; **santrauka**.';

// Update 10.5 - add reference to 10.48
const s105 = m10.slides.find((s) => s.id === 10.5);
s105.content.sections[0].body +=
  '\n\n**Multi-agent šablonai** (grandinė, maršrutizavimas ir kt.) – skaidrė **10.48**.';

// Update 10.65 - add DI agent QC tests
const s1065 = m10.slides.find((s) => s.id === 10.65);
const qcSection = {
  heading: '3 DI agento QC testai (papildomai)',
  body: 'Prieš paleidimą patikrink DI agentą: (1) tuščia įvestis – ar grąžina aiškų „Nepavyko“? (2) klaidingas faktas – ar nepatvirtina? (3) per ilgas tekstas – ar nepalūžta be pranešimo?',
  blockVariant: 'accent',
};
const idx1065 = s1065.content.sections.findIndex((s) => s.heading === '10 testavimo scenarijų (prieš paleidžiant į gyvą)');
if (idx1065 >= 0) s1065.content.sections.splice(idx1065 + 1, 0, qcSection);

// Update 10.7 glossary
const s107 = m10.slides.find((s) => s.id === 10.7);
s107.content.terms.push(
  { term: 'Koordinatorius', definition: 'Multi-agent rolė – skaido užduotį, deleguoja specialistams, sujungia rezultatus.' },
  { term: 'Vertintojas', definition: 'Multi-agent rolė – tikrina kokybę ir taisykles; gali grąžinti pataisymui (QC).' },
  { term: 'Maršrutizatorius', definition: 'Multi-agent rolė – nukreipia užklausą tinkamai rolei ar srautui pagal tipą.' },
  { term: 'ReAct', definition: 'Ciklas: suprasti → pasirinkti įrankį → vykdyti → stebėti rezultatą → kartoti arba baigti.' }
);

// Update 10.8 summary
const s108 = m10.slides.find((s) => s.id === 10.8);
s108.content.introBody =
  'Sveikiname! Esminiai laimėjimai: agentų taksonomija (L0–L3, rolės), 5 workflow šablonai, 3A, DI ir no-code įrankiai, promptai ir klaidų tvarkymas.';
s108.content.stats = [
  { label: 'Gylio lygiai + rolės', value: '8' },
  { label: 'Workflow šablonai', value: '5' },
  { label: 'Use case pavyzdžiai', value: '12' },
];
s108.content.sections = [
  {
    heading: 'Taksonomija ir multi-agent',
    icon: 'Users',
    color: 'violet',
    items: ['L0–L3 gylio lygiai', 'Koordinatorius, specialistas, vertintojas, maršrutizatorius', '5 workflow šablonai verslui'],
  },
  {
    heading: '3A ir automatizacija',
    icon: 'Workflow',
    color: 'brand',
    items: ['Automatize 80 % / Augment 15 % / Autonomize 5 %', 'Trigger → Condition → Action', 'Zapier, Make, n8n, Power Automate'],
  },
  {
    heading: 'Promptai ir saugumas',
    icon: 'Target',
    color: 'accent',
    items: ['5 dalių agentinis šablonas', 'Klaidos tvarkymas ir HITL', 'Use case katalogas (12 sričių)'],
  },
];
s108.content.useCaseCatalog = {
  heading: 'Use case katalogas (12)',
  body:
    '**Pardavimai:** lead→CRM; pipeline suvestinė; RFP tyrimas. **HR:** CV filtras; onboarding; atitikimo score. **Finansai:** sąskaitų OCR; closinimo santrauka; biudžeto alert. **Support:** skundo triažas; sentiment→eskalacija; FAQ→vertintojas. Kiekvienam: trigger → veiksmai → rizika → KPI.',
  blockVariant: 'terms',
};

// M11 updates
const testIntro = m11.slides.find((s) => s.id === 110);
testIntro.content.firstActionCTA =
  'Atsakyk į 8 klausimus – temos: agentų ciklas, taksonomija, multi-agent, workflow, 3A.';

const testSection = m11.slides.find((s) => s.id === 111);
testSection.testQuestions[2] = {
  id: 'm11-q3',
  type: 'mcq',
  question: 'Kuo vertintojas skiriasi nuo specialisto multi-agent sistemoje?',
  options: [
    'Vertintojas tikrina kokybę; specialistas vykdo darbą',
    'Vertintojas visada siunčia laiškus; specialistas tik skaito',
    'Jie daro tą patį, tik skirtingais įrankiais',
    'Vertintojas nustato triggerį',
  ],
  correct: 0,
  explanation:
    'Specialistas vykdo siaurą darbą (paieška, juodraštis). Vertintojas tikrina taisykles, kokybę ir gali grąžinti pataisymui – atskira QC rolė.',
  relatedSlideId: 10.45,
};
testSection.testQuestions[4] = {
  id: 'm11-q5',
  type: 'mcq',
  question: 'Kas yra maršrutizatorius DI komandoje?',
  options: [
    'Rolė, kuri nukreipia užklausą tinkamai rolei pagal tipą',
    'Įrankis, kuris siunčia el. laiškus automatiškai',
    'Tas pats kas koordinatorius – sinonimas',
    'DI modelio versija',
  ],
  correct: 0,
  explanation:
    'Maršrutizatorius klasifikuoja įvestį ir nukreipia į tinkamą specialistą ar srautą – kaip registratūra ar triažas.',
  relatedSlideId: 10.45,
};
testSection.testQuestions[5] = {
  id: 'm11-q6',
  type: 'mcq',
  bloomLevel: 3,
  question:
    'Situacija: gaunate RFP dokumentą ir norite: tyrėjas surinktų faktus, rašytojas paruoštų santrauką, vertintojas patikrintų kriterijus. Kuris workflow šablonas geriausiai tinka?',
  options: [
    'Koordinatorius + specialistai (arba grandinė su rolėmis)',
    'Tik vienas promptas be rolės',
    'Maršrutizavimas pagal el. pašto dydį',
    'Lygiagretus darbas be sujungimo',
  ],
  correct: 0,
  explanation:
    'RFP su keliais vaidmenimis – tipinis L2 (DI komanda): koordinatorius planuoja, specialistai vykdo, vertintojas tikrina. Grandinė su rolėmis irgi tinka.',
  relatedSlideId: 10.48,
};

const testResults = m11.slides.find((s) => s.id === 112);
testResults.content.failedMessage =
  'Rekomenduojame peržiūrėti Modulio 10 skaidres: 10.2 (ciklas), 10.15 (workflow), 10.25 (3A), 10.45 (taksonomija), 10.48 (workflow šablonai), 10.3–10.6 (promptai, įrankiai, klaidos), 10.35 (Zapier/Make).';
testResults.content.thresholdExplanation =
  'Kai pasieksi ≥70 %, gali pereiti prie Modulio 12. Mažiau – peržiūrėk skaidres 10.2, 10.15, 10.25, 10.45, 10.48 ir promptų bloką (10.3–10.6).';
testResults.content.useCaseBlock.body =
  'Taksonomija, multi-agent, workflow (trigger, action), 3A ir įrankiai – tyrimai, ataskaitos, support triažas, RFP analizė.';

// M12 updates
const practiceIntro = m12.slides.find((s) => s.id === 120);
practiceIntro.content.recommendedSlideIds = [120.25, 120.5, 121, 122, 123, 124.5];
practiceIntro.content.recommendedStart =
  'Privaloma: 1–3 praktikos (Automatize, Augment, Autonomize). Rekomenduojama: Koordinatorius + 2 specialistai (124.5), Tyrimo agentas, Ataskaitos generatorius.';

const s1205 = m12.slides.find((s) => s.id === 120.5);
delete s1205.optional;
delete s1205.badgeVariant;
s1205.title = 'Verslo multi-agent schema';
s1205.subtitle = 'Įvestis → rolės → vertintojas → išvestis (+ HITL)';
s1205.content = {
  whyBenefit:
    'Suprasi, kada vienam DI neužtenka ir kaip padalinti darbą be programavimo. Praktika – skaidrė Koordinatorius + 2 specialistai (124.5).',
  sections: [
    {
      heading: 'Verslo multi-agent schema',
      body: '**1. Įvestis** – užduotis, duomenys, apribojimai.\n\n**2. Maršrutizatorius** (optional) – klasifikuoja tipą, nukreipia.\n\n**3. Koordinatorius** – suskaido, paskiria 2–3 specialistus.\n\n**4. Specialistai** – vykdo siaurus darbus (tyrimas, juodraštis, skaičiavimas).\n\n**5. Vertintojas** – QC, taisyklės, grąžina pataisymui.\n\n**6. Išvestis** – su **HITL vartu** prieš siuntimą klientui ar vadovui.',
      blockVariant: 'brand',
    },
    {
      heading: 'Handoff (perdavimas)',
      body: 'Perdavimas kitam vaidmeniui – aiški taisyklė: „Kai specialistas baigia X, perduok vertintojui Y formatu.“ Be handoff multi-agent tampa chaotiškas.',
      blockVariant: 'accent',
    },
  ],
  footer: 'Toliau – skaidrė 5: 1 praktika Automatize',
};

const slide124_5 = {
  id: 124.5,
  title: 'Scenarijus: Koordinatorius + 2 specialistai',
  subtitle: 'Multi-agent prompt pipeline be kodo',
  type: 'practice-scenario',
  scenario: {
    narrativeLead:
      'Vykdyti rankiniu pipeline: 3 atskiri DI pokalbiai su handoff taisyklėmis. Kontekstas: savaitės pardavimų suvestinė arba RFP tyrimas.',
    situation: 'SHOULD: multi-agent praktika verslo kalba – koordinatorius, specialistas, vertintojas.',
    context:
      'Pasirink temą (pardavimų suvestinė arba RFP). Naudok 3 promptus atskiruose pokalbiuose. Užfiksuok schemą ir 1 test case.',
    data: 'Artefaktai: schema (roles + handoff), 3 promptai, 1 test case (pvz. trūksta duomenų).',
    constraints: 'Be Zapier/Make – tik promptų orkestravimas. HITL prieš galutinį siuntimą.',
    expectedFormat: 'Schema + 3 nukopijuoti promptai + test case aprašymas.',
  },
  practicalTask: {
    title: 'Multi-agent prompt pipeline',
    placeholder: 'Įklijuok schemą, 3 promptus ir test case santrauką…',
    templateLabel: '3 promptai – koordinatorius, specialistas, vertintojas',
    template:
      'KOORDINATORIUS: Tu esi koordinatorius. Užduotis: [APRAŠYK]. Suskaidyk į 2 sub-užduotis, paskirk roles, handoff taisykles.\n\nSPECIALISTAS: Tu esi [tyrėjas/rašytojas]. Įvestis: [nuo koordinatoriaus]. Atlik [X]. Išvestis: [formatas].\n\nVERTINTOJAS: Patikrink ar atsakyta į visus kriterijus. Jei ne – grąžink pataisymui su konkrečiais punktais.',
    explanation: 'Rankinis pipeline paruošia multi-agent mąstymui be framework.',
    allowMarkWithoutAnswer: true,
    instructions: {
      title: 'Žingsniai',
      steps: [
        { step: 1, title: 'Paleisk koordinatoriaus promptą', description: 'Gauk planą su rolėmis ir handoff.' },
        { step: 2, title: 'Paleisk specialisto promptą', description: 'Perduok koordinatoriaus išvestį kaip įvestį.' },
        { step: 3, title: 'Paleisk vertintojo promptą', description: 'Patikrink ir užfiksuok 1 test case.' },
      ],
    },
  },
  content: {
    scenarioTitle: 'Koordinatorius + 2 specialistai',
    scenarioDescription:
      '3 CopyButton promptai: koordinatorius, specialistas, vertintojas. Vykdyti rankiniu pipeline. Artefaktai: schema + 3 promptai + 1 test case.',
    taskFrame: 'Užduotis',
    template:
      'KOORDINATORIUS: Tu esi koordinatorius. Užduotis: [APRAŠYK]. Suskaidyk į 2 sub-užduotis, paskirk roles, handoff taisykles.\n\nSPECIALISTAS: Tu esi [tyrėjas/rašytojas]. Įvestis: [nuo koordinatoriaus]. Atlik [X]. Išvestis: [formatas].\n\nVERTINTOJAS: Patikrink ar atsakyta į visus kriterijus. Jei ne – grąžink pataisymui su konkrečiais punktais.',
    templateLabel: '3 promptai – koordinatorius, specialistas, vertintojas',
  },
  recommended: false,
};

// Insert 124.5 after 124
const idx124 = m12.slides.findIndex((s) => s.id === 124);
if (idx124 >= 0 && !m12.slides.some((s) => s.id === 124.5)) {
  m12.slides.splice(idx124 + 1, 0, slide124_5);
}

// Fix 122 - add evaluator prompt, DI terminology
function replaceAiModuliu(obj) {
  if (typeof obj === 'string') {
    return obj
      .replace(/Make AI modulys/g, 'Make DI modulis')
      .replace(/su AI moduliu/g, 'su DI moduliu')
      .replace(/ChatGPT\/Make AI/g, 'ChatGPT/Make DI');
  }
  if (Array.isArray(obj)) return obj.map(replaceAiModuliu);
  if (obj && typeof obj === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(obj)) out[k] = replaceAiModuliu(v);
    return out;
  }
  return obj;
}

const s122 = m12.slides.find((s) => s.id === 122);
s122.practicalTask.template +=
  '\n\nVERTINTOJO PROMPTAS: Patikrink santrauką: (1) tonas tinkamas klientui, (2) faktai atitinka originalą, (3) nėra PII pertekliaus. Jei ne – grąžink pataisymų sąrašą.';
if (s122.content?.template) s122.content.template = s122.practicalTask.template;

const s123 = m12.slides.find((s) => s.id === 123);
s123.scenario.context =
  'Srautas (rolės): **Klasifikatorius** → **Sentiment specialistas** → **Eskalacijos koordinatorius** → ticket. Atsiliepimai (CRM/forma) → sentiment DI → eskalacija → ticket (Jira, Trello, Teams).';
s123.content.scenarioDescription = s123.scenario.context.replace('Srautas (rolės):', 'DI agentų rolės:').replace('→ ticket.', '→ ticket/užduotis.');

// Apply AI→DI fix to M12 module
const m12idx = data.modules.findIndex((m) => m.id === 12);
data.modules[m12idx] = replaceAiModuliu(m12);

writeFileSync(dataPath, `${JSON.stringify(data, null, 2)}\n`);
console.log('Synced modules.json M10–12 multi-agent content.');
