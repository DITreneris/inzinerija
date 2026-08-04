#!/usr/bin/env node
/**
 * M13 learner plain (M13-PLAIN-B1/B2/B3) – patch full SOT modules.json.
 * EN via build:modules-en-m13-m15 + scripts/lib/m13-en-plain-overrides.mjs.
 * Ne generate:core-data.
 */
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const path = join(root, 'src', 'data', 'modules.json');
const data = JSON.parse(readFileSync(path, 'utf8'));
const mod = data.modules.find((m) => m.id === 13);
if (!mod) throw new Error('Module 13 not found');

function slide(id) {
  const s = mod.slides.find((x) => x.id === id);
  if (!s) throw new Error(`Slide ${id} not found`);
  return s;
}

// ——— B1: 130 ———
const s130 = slide(130);
s130.content.whyBenefit =
  'Po šio modulio gebėsi kurti vaizdus, trumpus vaizdo įrašus ir garsą su DI – nuo užduoties aprašo iki kokybės ir teisių patikros.';
s130.content.outcomes = [
  'Suprasi 6 žingsnių medijos grandinę – nuo užduoties aprašo (brief) iki patikros prieš publikaciją',
  'Gebėsi išlaikyti tą patį produktą ar stilių serijoje ir planuoti garsą pirmiau už kirpimus',
  'Žinosi, ką matuoti ir ką tikrinti prieš publikaciją (teisės, DI žyma)',
];

// ——— B1: 13.15 nextSteps ———
const s15 = slide(13.15);
s15.content.nextSteps = [
  'Vaizdo prompto formulė: objektas + kontekstas + stilius',
  'Stilius, proporcijos ir kada rinktis kurį įrankį',
  'Tas pats produktas serijoje – 3–5 pavyzdžių nuotraukos (reference lock)',
  'Interaktyvus vaizdo generatorius praktikai',
];
s15.content.subtitle =
  'Toliau: promptų formulė, stilius ir proporcijos, tas pats produktas serijoje, tada generatorius. Įrankius rinksimės pagal užduotį — po stiliaus skaidrės.';

// ——— B1: 13.32 titles + Trumpai kiss ———
const s32 = slide(13.32);
s32.title = 'Produktas ir personažas – tas pats vaizdas';
s32.shortTitle = 'Tas pats vaizdas';
s32.subtitle = '3–5 pavyzdžių nuotraukos + taisyklė „tas pats produktas“';
const t32 = s32.content.sections.find((s) => s.heading === 'Trumpai');
if (t32) {
  t32.body =
    'Vienas promptas neužrakina tapatybės. Marketinge reikia 3–5 pavyzdžių nuotraukų (reference) – skirtingi kampai – ir taisyklės „tas pats produktas / stilius / spalvos“, kitaip serija „plaukioja“.';
}
const d32 = s32.content.sections.find((s) => s.heading === 'Daryk dabar');
if (d32) {
  d32.body =
    'Surink arba sugeneruok bent 3 pavyzdžių nuotraukas savo produktui ar personažui. Kitame Consistency lab pažymėk refs ir diagnozuok, kur „plaukioja“.';
}

// ——— B1: 13.36 nextSteps ———
const s36 = slide(13.36);
s36.content.nextSteps = [
  'Trumpas scenarijus – 3–5 s klipai, ne vienas ilgas bandymas',
  'Video iš kadro (I2V) – generatorius praktikai',
  'Video įrankiai, formatas ir kaina už tinkamą klipą (CPI)',
  'Montažas po generavimo',
];
s36.content.subtitle =
  'Toliau: trumpas scenarijus, video iš kadro (I2V), formatas ir kaina už tinkamą klipą. Įrankius rinksimės video įrankių skaidrėje.';
if (s36.content.recap?.items) {
  s36.content.recap.items = [
    'Vaizdo promptas = objektas + kontekstas + stilius.',
    'Stilius, proporcijos ir tas pats produktas serijoje.',
    'Pavyzdžių nuotraukos – same product / same style serijai.',
  ];
}

// ——— B1: 13.47 subtitle gloss ———
const s47 = slide(13.47);
s47.subtitle = 'Video iš kadro (image-to-video): keyframe → 3–5 s → kamera → tas pats stilius';

// ——— B1: 13.52 titles ———
const s52 = slide(13.52);
s52.title = 'Montažas po generavimo';
s52.shortTitle = 'Montažas';
s52.subtitle = 'DI = žalia medžiaga; kirpimas, spalvos, garsas';
const h52 = s52.content.sections.find((s) => s.heading === 'Post-production schema');
if (h52) {
  h52.heading = 'Montažo schema';
  if (h52.imageAlt) h52.imageAlt = 'Montažas: kirpimas, spalvos, garsas, eksportas';
}

// ——— B1: 13.56 chrome ———
const s56 = slide(13.56);
s56.subtitle = 'Skyrius: balsas, efektai, muzika – pirma garsas';
s56.content.subtitle =
  'Toliau: pirma garsas (balsas ar fonas), tada kirpimai; balsas / efektai / muzika ir licencijos komerciniam darbui.';
s56.content.nextSteps = [
  'Pirma garsas – balsas arba foninės muzikos trukmė, tada kirpimai',
  'Balsas, efektai ir muzika – trys sluoksniai',
  'Licencijos komerciniam darbui',
  'Garsumo orientyras ir klausymosi patikra',
];
if (s56.content.recap?.items) {
  s56.content.recap.items = [
    'Video = trumpi klipai + formatas + kaina už tinkamą klipą.',
    'Vaizdas → video grandinė su keyframe.',
    'Montažas – kirpimas / spalvos / garsas po generavimo.',
  ];
}

// ——— B1: 13.11 Trumpai before diagram ———
const s11 = slide(13.11);
const secs11 = s11.content.sections;
const iDiagram = secs11.findIndex((s) => s.image === 'turinio_workflow');
const iTrumpai = secs11.findIndex((s) => s.heading === 'Trumpai');
if (iDiagram >= 0 && iTrumpai >= 0 && iDiagram < iTrumpai) {
  const [diagram] = secs11.splice(iDiagram, 1);
  diagram.heading = 'Darbo eigos schema';
  const newTrumpaiIdx = secs11.findIndex((s) => s.heading === 'Trumpai');
  secs11.splice(newTrumpaiIdx + 1, 0, diagram);
} else if (iDiagram >= 0) {
  secs11[iDiagram].heading = 'Darbo eigos schema';
}
const t11 = secs11.find((s) => s.heading === 'Trumpai');
if (t11) {
  t11.body =
    'Pilnas verslo ciklas: (1) Marketing brief (užduoties aprašas). (2) Prompt + brand + pavyzdžių nuotraukos. (3) 3–5 variantų / trumpi video iš kadro. (4) Iteracija. (5) Platforma. (6) Testas. (7) Optimizacija.';
}

// ——— B2: 13.101 Trumpai ———
const s101 = slide(13.101);
const t101 = s101.content.sections.find((s) => s.heading === 'Trumpai');
if (t101) {
  t101.body =
    'Prieš publikaciją žinosi, ką tikrinsi: rezultatus (KPI), teises, DI žymą (C2PA / disclosure) ir bent vieną A/B hipotezę. Detalės – žemiau.';
}

// ——— B2: 13.8 glossary ———
const s8 = slide(13.8);
const extraTerms = [
  {
    term: 'CPI (kaina už tinkamą klipą)',
    definition:
      'Kiek kainuoja vienas tinkamas klipas, kai įskaičiuoji generavimą ir bandymus iš naujo (retry) – ne tik kaina už sekundę.',
  },
  {
    term: 'C2PA / DI žyma (Content Credentials)',
    definition:
      'Žyma ar įrodymas, kad turinys sukurtas ar redaguotas su DI – prieš publikaciją patikrink provenance ir, kur reikia, žmogui matomą DI žymą.',
  },
  {
    term: 'I2V (video iš kadro)',
    definition:
      'Image-to-video: iš vieno ar kelių užrakintų kadrų generuoji 3–5 s klipą, o ne ilgo „vienu šūviu“ video.',
  },
  {
    term: 'Audio-first (pirma garsas)',
    definition:
      'Pirma planuoji balsą (VO) arba foninės muzikos trukmę, tada kirpi video pagal ritmą – ne atvirkščiai.',
  },
  {
    term: 'Reference lock (pavyzdžių užraktas)',
    definition:
      '3–5 pavyzdžių nuotraukos skirtingais kampais + taisyklė „tas pats produktas / stilius“, kad serija neplaukiotų.',
  },
];
const existing = new Set(s8.content.terms.map((t) => t.term));
for (const t of extraTerms) {
  if (!existing.has(t.term)) s8.content.terms.push(t);
}

// ——— B2: 13.9 summary ———
const s9 = slide(13.9);
s9.subtitle = 'Ką išmokai – grandinė, tas pats vaizdas, video, garsas, teisės';
s9.content.introBody =
  'Sveikiname! Dabar moki 2026 turinio kelią: medijos grandinę, tą patį produktą serijoje, trumpus video iš kadro, garsą pirmiau ir patikrą prieš publikaciją (teisės, DI žyma).';
s9.content.abilityAfter =
  'Moki sudėlioti grandinę nuo užduoties iki patikros, išlaikyti tą patį vaizdą serijoje ir patikrinti teises bei DI žymą prieš publikaciją.';
s9.content.abilityBefore =
  'Vaizdus ar video generavai be aiškios grandinės, be pavyzdžių nuotraukų ir be teisių / DI žymos patikros.';
s9.content.tagline = 'Grandinė + tas pats vaizdas + garsas pirmiau + teisės = vienas turinio kelias.';
s9.content.stats = [
  { label: 'Blokai', value: '5' },
  { label: 'Šablonai ir generatoriai', value: '5+' },
  { label: 'Įrankiai', value: '6+' },
];
s9.content.sections = [
  {
    heading: 'Medijos grandinė',
    icon: 'Image',
    color: 'brand',
    items: [
      '6 žingsniai: užduotis → kadrai → referencai → video → garsas → patikra',
      'Pirma planas ir kadrai, tada brangus generavimas',
    ],
  },
  {
    heading: 'Tas pats vaizdas serijoje',
    icon: 'Image',
    color: 'brand',
    items: [
      '3–5 pavyzdžių nuotraukos skirtingais kampais',
      'Taisyklė „tas pats produktas / stilius“ + Consistency lab',
    ],
  },
  {
    heading: 'Trumpas video (I2V)',
    icon: 'Video',
    color: 'violet',
    items: [
      '3–5 s klipai iš užrakinto kadro, ne vienas ilgas bandymas',
      'Formatas, įrankiai ir kaina už tinkamą klipą (CPI)',
    ],
  },
  {
    heading: 'Pirma garsas',
    icon: 'Music',
    color: 'amber',
    items: [
      'Balsas arba fonas pirmiau – tada kirpimai',
      'Licencijos komerciniam darbui',
    ],
  },
  {
    heading: 'Verslas ir teisės',
    icon: 'Image',
    color: 'brand',
    items: [
      'KPI, A/B, teisės ir DI žyma (C2PA) prieš publikaciją',
      'Darbo eiga nuo brief iki patikros',
    ],
  },
];
s9.content.reflectionPrompt =
  'META: Tu esi mokymų refleksijos asistentas. Tikslas – padėti įtvirtinti žinias po Modulio 13.\nINPUT: Ką tik baigiau mokymą apie turinio inžineriją – medijos grandinė, tas pats produktas serijoje, video iš kadro, pirma garsas, teisės ir DI žyma.\nOUTPUT: Užduok 3 klausimus: (1) Kurį grandinės žingsnį pritaikysiu šiandien? (2) Kas buvo naujausia? (3) Ką noriu išbandyti pirmiausia? Po mano atsakymų duok vieną konkretų patarimą.';
s9.content.firstAction24h =
  'Šiandien: (1) užrašyk 6 žingsnių grandinę savo temai arba (2) surink 3 pavyzdžių nuotraukas produktui – tada vieną vaizdą generuok su ta taisykle.';

// ——— B3: soft gloss Trumpai ———
const gloss = {
  13.12: {
    Trumpai:
      'Laimi ne „geriausias modelis“, o aiški darbo grandinė (eiga nuo užduoties iki patikros). Vienas promptas tiesiai į video dažnai = brangūs bandymai – pirmiausia užrakink planą, kadrus ir pavyzdžių nuotraukas, tada trumpus klipus, garsą ir patikrą.',
  },
  13.3: {
    Trumpai:
      'Stilius: fotorealistiškas, akrilas, 3D, piešinys. Proporcijos (kadro plotis×aukštis, aspect ratio): 1:1 kvadratas, 16:9 platus, 9:16 vertikalus (stories).',
  },
  13.4: {
    Trumpai:
      'Trumpam vaizdo įrašui reikia aiškaus scenarijaus, tono ir kameros. Geriau 2–4 trumpi klipai (3–5 s) nei vienas ilgas bandymas – kadrus (stills) užrakink prieš brangų video.',
  },
  13.5: {
    Trumpai:
      'Video: formatas (16:9 / 9:16), trukmė 3–5 s. Matuok kainą už tinkamą klipą (CPI) = generavimas + bandymai iš naujo / tinkami klipai – ne tik €/s. Matrica – greitam pasirinkimui.',
  },
  13.6: {
    Trumpai:
      'Pirma garsas (audio-first): pirma balsas arba foninės muzikos trukmė, tada video kirpimai pagal ritmą. Muzikai aprašyk nuotaiką, stilių, tempą, instrumentus. Klientui / reklamai – licensed stack; Suno/Udio – demo, ne klientui.',
  },
  13.35: {
    Trumpai:
      'Papildoma biblioteka: jei užtenka vieno sprendimo – rinkis MASTER šabloną arba vieną paruoštą promptą. Darbo eiga ir 8 scenarijai – gilinimuisi (išskleisk).',
    subtitle: '5 žingsnių darbo eiga, #1000Books, paruošti promptai',
  },
};

for (const [idStr, patch] of Object.entries(gloss)) {
  const id = Number(idStr);
  const s = slide(id);
  if (patch.subtitle) s.subtitle = patch.subtitle;
  if (patch.Trumpai) {
    const t = s.content.sections.find((x) => x.heading === 'Trumpai');
    if (t) t.body = patch.Trumpai;
  }
}

// 13.325 Patikra – pointer to new 13.32 title
const s325 = slide(13.325);
const p325 = s325.content.sections.find((s) => s.heading === 'Patikra');
if (p325) {
  p325.body =
    'Ar pažymėjai refs, pasirinkai režimą ir nukopijavai taisyklę? Jei trūksta refs – grįžk į „Produktas ir personažas – tas pats vaizdas“ ir surink 3–5 kampus.';
}

writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`);
console.log('Patched M13 plain B1+B2+B3 in', path);
