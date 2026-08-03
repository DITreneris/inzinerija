/**
 * One-shot: tools.json / tools-en.json hygiene (B pack).
 * - EN M7 parity, Veo moduleId, category normalize, curriculum adds, sort, ChatGPT URLs
 * - Canonical shared names (ElevenLabs without locale suffix for LT↔EN parity)
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'src', 'data');

function read(file) {
  return JSON.parse(readFileSync(join(dataDir, file), 'utf8'));
}

function write(file, data) {
  writeFileSync(join(dataDir, file), `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

function upsert(byName, tool) {
  const prev = byName.get(tool.name);
  byName.set(tool.name, prev ? { ...prev, ...tool } : tool);
}

function renameKey(byName, from, to) {
  if (!byName.has(from)) return;
  const row = byName.get(from);
  byName.delete(from);
  byName.set(to, { ...row, name: to });
}

const CHATGPT_URL = 'https://chatgpt.com';

const ltAdds = [
  {
    name: 'CapCut',
    url: 'https://www.capcut.com',
    description:
      'Social video montažas ir DI šablonai – 3–5 s klipų sudėjimas, overlay, export pagal platformą.',
    moduleId: 13,
    category: 'Video generavimas',
  },
  {
    name: 'DataLab (DataCamp)',
    url: 'https://www.datacamp.com/datalab',
    description:
      'Analitikoje: SQL + Python, notebook aplinka, enterprise – duomenų tyrimai ir kodas vienoje vietoje.',
    moduleId: 7,
    category: 'Duomenų analizė',
  },
  {
    name: 'Echobase',
    url: 'https://www.echobase.ai',
    description:
      'Analitikoje: DI agentai, failų sinchronizacija – automatizuotas duomenų darbas su kontekstu.',
    moduleId: 7,
    category: 'Duomenų analizė',
  },
  {
    name: 'Julius AI',
    url: 'https://julius.ai',
    description:
      'Analitikoje: NLP analizė, paprasta naudoti – greita eksploracinė duomenų analizė be sudėtingo setup.',
    moduleId: 7,
    category: 'Duomenų analizė',
  },
  {
    name: 'Power BI',
    url: 'https://www.microsoft.com/power-platform/products/power-bi',
    description:
      'Analitikoje: vizualizacijos, integracijos, enterprise – verslo ataskaitos ir dashboard iš struktūruotų duomenų.',
    moduleId: 7,
    category: 'Duomenų analizė',
  },
  {
    name: 'Replit',
    url: 'https://replit.com',
    description:
      'Greitas kodo prototipas naršyklėje – mokymų demonstracijoms; ne tas pats kas gamybinis Railway/Render.',
    moduleId: 10,
    category: 'Debesijos paleidimas',
  },
  {
    name: 'UiPath',
    url: 'https://www.uipath.com',
    description:
      'RPA – botas spaudo UI, kai nėra API. Kai API yra – rinkis workflow (Zapier/Make/n8n), ne RPA.',
    moduleId: 10,
    category: 'Verslo automatizavimas',
  },
  {
    name: 'Vercel',
    url: 'https://vercel.com',
    description:
      'Debesijos paleidimas – front-end ir svetainės (pvz. Next.js) iš GitHub; GitHub saugo, PaaS paleidžia.',
    moduleId: 10,
    category: 'Debesijos paleidimas',
  },
  {
    name: 'Whisper (OpenAI)',
    url: 'https://openai.com/index/whisper/',
    description:
      'Kalbos į tekstą (STT) – transkripcija iš audio; poruojama su VO/montažo eiga.',
    moduleId: 13,
    category: 'Garsas',
  },
];

const enAdds = [
  {
    name: 'CapCut',
    url: 'https://www.capcut.com',
    description:
      'Social video editing and AI templates – assemble 3–5 s clips, overlays, export per platform.',
    moduleId: 13,
    category: 'Video generation',
  },
  {
    name: 'DataLab (DataCamp)',
    url: 'https://www.datacamp.com/datalab',
    description:
      'Analytics: SQL + Python, notebook environment, enterprise – data exploration and code in one place.',
    moduleId: 7,
    category: 'Data analysis',
  },
  {
    name: 'Echobase',
    url: 'https://www.echobase.ai',
    description:
      'Analytics: AI agents, file sync – automated data work with context.',
    moduleId: 7,
    category: 'Data analysis',
  },
  {
    name: 'Julius AI',
    url: 'https://julius.ai',
    description:
      'Analytics: NLP analysis, easy to use – fast exploratory data analysis without heavy setup.',
    moduleId: 7,
    category: 'Data analysis',
  },
  {
    name: 'Power BI',
    url: 'https://www.microsoft.com/power-platform/products/power-bi',
    description:
      'Analytics: visualizations, integrations, enterprise – business reports and dashboards from structured data.',
    moduleId: 7,
    category: 'Data analysis',
  },
  {
    name: 'Replit',
    url: 'https://replit.com',
    description:
      'Fast in-browser code prototype – for demos and learning; not the same as production Railway/Render.',
    moduleId: 10,
    category: 'Cloud hosting',
  },
  {
    name: 'UiPath',
    url: 'https://www.uipath.com',
    description:
      'RPA – bots click the UI when there is no API. When an API exists, prefer workflow (Zapier/Make/n8n), not RPA.',
    moduleId: 10,
    category: 'Business automation',
  },
  {
    name: 'Vercel',
    url: 'https://vercel.com',
    description:
      'Cloud hosting – front-end and sites (e.g. Next.js) from GitHub; GitHub stores, PaaS runs.',
    moduleId: 10,
    category: 'Cloud hosting',
  },
  {
    name: 'Whisper (OpenAI)',
    url: 'https://openai.com/index/whisper/',
    description:
      'Speech-to-text (STT) – transcription from audio; pairs with VO / edit workflows.',
    moduleId: 13,
    category: 'Audio',
  },
];

function patchLt() {
  const data = read('tools.json');
  const byName = new Map(data.tools.map((t) => [t.name, { ...t }]));

  renameKey(byName, 'ElevenLabs (garsai)', 'ElevenLabs');

  for (const t of byName.values()) {
    if (t.name === 'Veo 3 (Google)') {
      t.moduleId = 13;
      t.category = 'Video generavimas';
    }
    if (t.name === 'Zapier' && t.category === 'Automatizacija') {
      t.category = 'Verslo automatizavimas';
    }
    if (t.name === 'ElevenLabs') {
      t.category = 'Garsas';
      t.description =
        'VO (voiceover), balsų sintezė ir SFX – audio-first workflow naracijai ir perėjimams.';
    }
    if (
      t.name === 'ChatGPT (OpenAI)' ||
      t.name === 'DALL·E (OpenAI)' ||
      t.name === 'GPT-Image (OpenAI)'
    ) {
      t.url = CHATGPT_URL;
    }
  }

  for (const t of ltAdds) upsert(byName, t);

  data.tools = [...byName.values()].sort((a, b) => a.name.localeCompare(b.name, 'lt'));
  write('tools.json', data);
  console.log(`LT tools: ${data.tools.length}`);
}

function patchEn() {
  const data = read('tools-en.json');
  const byName = new Map(data.tools.map((t) => [t.name, { ...t }]));

  renameKey(byName, 'ElevenLabs (voices)', 'ElevenLabs');

  for (const t of byName.values()) {
    if (t.name === 'Veo 3 (Google)') {
      t.moduleId = 13;
      t.category = 'Video generation';
    }
    if (t.name === 'Zapier' && (t.category === 'Automation' || t.category === 'Automatizacija')) {
      t.category = 'Business automation';
    }
    if (t.name === 'ElevenLabs') {
      t.category = 'Audio';
      t.description =
        'VO (voiceover), voice synthesis and SFX – audio-first narration and transitions.';
    }
    if (
      t.name === 'ChatGPT (OpenAI)' ||
      t.name === 'DALL·E (OpenAI)' ||
      t.name === 'GPT-Image (OpenAI)'
    ) {
      t.url = CHATGPT_URL;
    }
  }

  for (const t of enAdds) upsert(byName, t);

  data.tools = [...byName.values()].sort((a, b) => a.name.localeCompare(b.name, 'lt'));
  write('tools-en.json', data);
  console.log(`EN tools: ${data.tools.length}`);
}

patchLt();
patchEn();

const lt = read('tools.json');
const en = read('tools-en.json');
const ltNames = new Set(lt.tools.map((t) => t.name));
const enNames = new Set(en.tools.map((t) => t.name));
const missingEn = [...ltNames].filter((n) => !enNames.has(n));
const missingLt = [...enNames].filter((n) => !ltNames.has(n));
console.log('Parity missing EN:', missingEn);
console.log('Parity missing LT:', missingLt);
console.log('Sort LT OK', lt.tools.every((x, i, a) => !i || a[i - 1].name.localeCompare(x.name, 'lt') <= 0));
console.log('Sort EN OK', en.tools.every((x, i, a) => !i || a[i - 1].name.localeCompare(x.name, 'lt') <= 0));
