/**
 * TE-M1618-M3/M5: wire diagram image keys + M18 own-work closer.
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

function upsertDiagramSection(slide, section) {
  const sections = slide.content.sections;
  const existing = sections.findIndex((s) => s.image === section.image);
  if (existing >= 0) {
    sections[existing] = { ...sections[existing], ...section };
    return;
  }
  const trumpai = sections.findIndex((s) => s.heading === 'Trumpai');
  const insertAt = trumpai >= 0 ? trumpai + 1 : 0;
  // Prefer after any table that follows Trumpai
  let at = insertAt;
  while (sections[at]?.table) at += 1;
  sections.splice(at, 0, section);
}

const diagrams = [
  [
    16,
    16.3,
    {
      heading: 'Delivery vartai',
      body: 'Šeši vartai iki brief/testo – Cursor build tik Modulyje 18. Spausk vartą diagramoje.',
      blockVariant: 'brand',
      image: 'm16_delivery_gates',
      imageAlt:
        'Delivery vartai: problema, naudotojas, vertė, 1 funkcija, prototipas, testas',
    },
  ],
  [
    16,
    16.101,
    {
      heading: 'VSR brandos kopėčios',
      body: 'Vibe → Skeleton → Refinement – brief fazės. Spausk pakopą.',
      blockVariant: 'brand',
      image: 'm16_vsr_maturity',
      imageAlt: 'VSR brandos kopėčios: Vibe, Skeleton, Refinement',
    },
  ],
  [
    16,
    16.16,
    {
      heading: 'Naudotojo ciklas',
      body: 'Triggeris → įvestis → veiksmas → rezultatas → kitas (su grįžimu). Spausk žingsnį.',
      blockVariant: 'brand',
      image: 'm16_user_cycle',
      imageAlt: 'Naudotojo ciklas su grįžimu',
    },
  ],
  [
    18,
    18.3,
    {
      heading: 'Naudotojo ciklas (flow)',
      body: 'Ta pati ciklo schema – dabar įrašyk į user_flow.md su klaidos atšaka.',
      blockVariant: 'brand',
      image: 'm16_user_cycle',
      imageAlt: 'Naudotojo ciklas su grįžimu',
    },
  ],
  [
    18,
    18.12,
    {
      heading: 'BUILD PACKET sluoksniai',
      body: 'Penki failų sluoksniai – checklist prieš Cursor. Spausk failą.',
      blockVariant: 'brand',
      image: 'm18_packet_stack',
      imageAlt: 'BUILD PACKET failų sluoksniai',
    },
  ],
  [
    18,
    18.201,
    {
      heading: 'Diff ritualas',
      body: 'Status → **diff** → smoke → commit → push. Spausk žingsnį – diff pabrėžtas.',
      blockVariant: 'brand',
      image: 'm18_diff_ritual',
      imageAlt: 'Git diff ritualas su pabrėžtu diff žingsniu',
    },
  ],
];

for (const [modId, slideId, section] of diagrams) {
  upsertDiagramSection(getSlide(modId, slideId), section);
}

const closer = getSlide(18, 18.24);
closer.content.ownWorkLabel = 'Tavo PACKET / proof kontekstas';
closer.content.ownWorkPlaceholder =
  'Pvz. dienos prioritetų MVP, GitHub URL arba lokalus paleidimo įrodymas…';
closer.content.ownWorkTemplate =
  'META: Tu esi vibe-coding disciplinos partneris.\nINPUT: Mano projektas / PACKET: {{context}}\nOUTPUT: Duok (1) 3 punkų soft DoD checklist (URL arba lokalus proof), (2) 1 trūkstamą PACKET failą, (3) 1 konkretų kitą commit/smoke žingsnį.';

const soft = getSlide(18, 18.23);
const daryk = soft.content.sections.find((s) => s.heading === 'Daryk dabar');
if (daryk) {
  daryk.body =
    'Pažymėk soft DoD checklist ir užrašyk proof (URL arba lokalus paleidimo aprašas). Santraukoje – own-work slot PACKET kontekstui.';
}

writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
console.log('Patched diagram images + M18 own-work');
