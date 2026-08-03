/**
 * Safe EN overlay patch after LT microcopy migration (structure + patikra + M9 UI defaults).
 * Does NOT deep-merge full slides – avoids LT bleed in simulateEnLocale merge.
 * Run: node scripts/patch-en-m7-m9-microcopy.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { translateString } from './m7-m9-en-translate.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const enPath = path.join(root, 'src/data/modules-en-m7-m9.json');
const lt = JSON.parse(
  fs.readFileSync(path.join(root, 'src/data/modules.json'), 'utf8')
);
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

function getEnSlide(moduleId, slideId) {
  const mod = en.modules.find((m) => m.id === moduleId);
  return mod?.slides.find((s) => s.id === slideId);
}

function patikraEn(specificEn) {
  return `• ${specificEn}\n• Does the result match the goal?\n\nIf not — go back to 2️⃣ and copy the correct prompt.`;
}

const PATIKRA = {
  72: 'Can you say in one sentence how analysis differs from a report?',
  73: 'Did you pick the right pipeline stage?',
  731: 'Did you pick the correct analysis type for the question?',
  732: 'Does the result have 5 points and priority actions?',
  733: 'Does the template match the task (data / competitors / finance)?',
  734: 'Did you pick the filter for your situation and get a concrete action?',
  85: 'Did you get relationships, duplication, bottlenecks and 5 KPIs?',
  86: 'Did you get at least 3 of 4 (trends, segments, profitability, insights)?',
  83: 'Does the AI answer show role, systems thinking and data grounding?',
  84: 'Are tables, relationships and KPIs present?',
  87: 'Did you get a forecast with scenarios?',
  89: 'Did you get a research structure with 5 steps?',
  91: 'Does the result have 5 rows, 2 metrics and interpretation?',
  94: 'Did you pick the right agent (Research / EDA / Insight)?',
  95: 'Did you get elements or relationships with optimizations?',
  97: 'Does the result include a plan, metrics and leadership guidelines?',
  90: 'Did you pick the right EDA area (statistics / correlation / anomalies / hypotheses)?',
  92: 'Does the plan cover all 4 BI steps?',
};

function stripExtraEnSections(sections) {
  return sections.filter((sec) => {
    const h = sec.heading ?? '';
    if (h.startsWith('📍 Where to apply')) return false;
    if (h.startsWith('Quick self-check')) return false;
    if (
      (h.startsWith('3️⃣ Copyable prompt') || h.startsWith('3️⃣ Kopijuojami')) &&
      !(sec.copyable ?? '').trim()
    ) {
      return false;
    }
    return true;
  });
}

function pickCopyableSections(oldSections, prefixes) {
  return prefixes.map((prefix) => {
    const sec = oldSections.find((s) => s.heading?.startsWith(prefix));
    if (!sec) return null;
    return {
      heading: sec.heading,
      body: sec.body,
      copyable: sec.copyable,
      blockVariant: sec.blockVariant,
    };
  }).filter(Boolean);
}

function removePromptIntroSections(sections) {
  return stripExtraEnSections(sections);
}

function updatePatikraSections(sections, slideId) {
  const q = PATIKRA[slideId];
  if (!q) return sections;
  return sections.map((sec) => {
    const h = sec.heading ?? '';
    if (h.startsWith('4️⃣ Patikra') || h.startsWith('4️⃣ Check')) {
      return { ...sec, body: patikraEn(q) };
    }
    return sec;
  });
}

function patchSections(slide, slideId) {
  if (!slide?.content?.sections) return;
  let sections = slide.content.sections;
  sections = removePromptIntroSections(sections);
  sections = updatePatikraSections(sections, slideId);
  sections = sections.map((sec) => {
    if (sec.heading?.startsWith('2️⃣') && typeof sec.body === 'string') {
      return {
        ...sec,
        body: sec.body.replace(/\n\n🔘 Copy prompt[^\n]*/gi, '').trim(),
      };
    }
    return sec;
  });
  slide.content.sections = sections;
}

const SLIDES_WITH_PATIKRA = Object.keys(PATIKRA).map(Number);
for (const slideId of SLIDES_WITH_PATIKRA) {
  const slide = getEnSlide(7, slideId);
  patchSections(slide, slideId);
}

// M7 targeted EN copy updates (trimmed LT mirror)
const s70 = getEnSlide(7, 70);
if (s70?.content) {
  s70.content.heroSubText =
    'Pick a focus area – same templates ahead; adapt to your context.';
  s70.content.confirmMessage =
    'Focus: {label}. Use the same prompts – insert your context.';
  const jc = s70.content.journeyChoices;
  if (jc?.[1]) jc[1].subtitle = 'Content and channel analysis';
  if (jc?.[2]) jc[2].subtitle = 'Pipeline and data structures';
}

const s705 = getEnSlide(7, 70.5);
if (s705?.content) s705.content.chartHeading = 'Profile distribution';

const s71 = getEnSlide(7, 71);
if (s71) {
  s71.subtitle = 'Control AI like an analyst – do not let it guess.';
  if (s71.content) {
    s71.content.toolsIntro =
      'Principles work in any tool – list below (optional).';
  }
}

const s726 = getEnSlide(7, 726);
if (s726?.content?.sections) {
  s726.content.sections = [
    {
      heading: '1️⃣ How to read this with slide 725',
      body: 'Slide 725 has numbers and charts. Here – problems and actions without repeating the stats.',
      blockVariant: 'accent',
    },
    {
      heading: '2️⃣ Three problems',
      body: '• **Investment direction** – lots of spend on “wow”, return often in routine work.\n• **Pilot trap** – many pilots, few reach production.\n• **Data culture** – decisions still driven by opinion, not facts.',
      blockVariant: 'brand',
    },
    {
      heading: '3️⃣ Four actions for business',
      body: '• **Align investment with return cycle** – measure ROI, not hype.\n• **Move from pilots to production** – one process end-to-end.\n• **Build data culture** – ask for data before decisions.\n• **Train people** – prompts and checks, not only tools.',
      blockVariant: 'terms',
    },
    {
      heading: '4️⃣ Key takeaway',
      body: 'AI creates value when investment, data and people work as one system – not when you buy another tool.',
      blockVariant: 'accent',
    },
  ];
}

const s669 = getEnSlide(7, 66.9);
if (s669) {
  s669.subtitle = 'What is next in the Data Analysis path';
  if (s669.content?.nextSteps?.length > 3) {
    s669.content.nextSteps = s669.content.nextSteps.slice(0, 3);
  }
}

// M8 intro trim
const s80 = getEnSlide(8, 80);
if (s80?.content) {
  s80.content.firstActionCTA = 'Press Continue → start the test.';
  s80.content.thresholdExplanation =
    '≥70% means you can move on; below that we recommend review.';
}

const s90eda = getEnSlide(7, 90);
if (s90eda?.content?.sections) {
  let sections = s90eda.content.sections;
  sections = removePromptIntroSections(sections);
  sections = updatePatikraSections(sections, 90);
  sections = sections.map((sec) => {
    if (sec.heading?.startsWith('1️⃣')) {
      return {
        ...sec,
        body: '**After the ethics block – back to EDA** (same path). 4 areas: statistics, correlation, anomalies, hypotheses.',
      };
    }
    if (sec.heading?.startsWith('2️⃣')) {
      return {
        ...sec,
        body: 'Pick an area: statistics, correlation, anomalies or hypotheses. Copy the matching prompt below and paste into AI with your data.',
      };
    }
    return sec;
  });
  s90eda.content.sections = sections;
}

// M9 intro + core path
const s90 = getEnSlide(9, 90);
if (s90?.content) {
  Object.assign(s90.content, {
    primaryPathIntro:
      '**8-step cycle** (slides 93–94): schema and copyable prompts. Enough to finish the module.',
    duration: '~25–35 min',
    audience: 'You finished M7–M8 and want one full analysis run with AI.',
    recommendedStart: 'Optional scenarios: slide 99 (hub).',
    firstActionCTA: 'Press Continue → schema and prompts.',
    storyBlock:
      '4 characters, up to 17 optional tasks – not required; use the hub (slide 99).',
    useCaseBlock:
      '• Quarterly report for leadership\n• Customer feedback and surveys',
    learningOutcomes: [
      'You will complete the 8-step cycle with copyable prompts.',
      'You will have a summary or .html dashboard; scenarios are optional.',
    ],
  });
  delete s90.content.meaningParagraph;
  delete s90.content.taskOneLiner;
  delete s90.content.characterMeaning;
}

const s93 = getEnSlide(9, 93);
if (s93?.content?.sections) {
  s93.content.sections = s93.content.sections.filter(
    (sec) => sec.heading !== 'One clear cycle'
  );
  const schema = s93.content.sections.find((s) =>
    s.heading?.includes('Interactive')
  );
  if (schema) {
    schema.body = 'Pick a step in the diagram – linked to slide 94 (CopyButton).';
  }
}

const s92m9 = getEnSlide(9, 92);
if (s92m9?.content) {
  s92m9.content.introBody =
    'Congratulations! You completed the core path: 8-step cycle, summary or dashboard.';
  s92m9.content.sections = (s92m9.content.sections ?? []).filter(
    (sec) => sec.heading !== 'Congratulations!'
  );
  delete s92m9.content.nextStepCTA;
  delete s92m9.content.firstAction24h;
}

// M8 bonus – practicalTask removed in LT
for (const id of [801, 802]) {
  const sl = getEnSlide(8, id);
  if (sl?.content?.practicalTask) delete sl.content.practicalTask;
}

// M9 scenarios – boilerplate moved to UI/i18n
const enM9 = en.modules.find((m) => m.id === 9);
for (const slide of enM9?.slides ?? []) {
  if (slide.type !== 'practice-scenario') continue;
  if (slide.content?.reflectionPromptAfter && slide.id !== 117) {
    delete slide.content.reflectionPromptAfter;
  }
  if (slide.scenario?.narrativeLead) delete slide.scenario.narrativeLead;
  if (slide.practicalTask?.motivation) delete slide.practicalTask.motivation;
}
const s117 = getEnSlide(9, 117);
if (s117?.content) {
  s117.content.reflectionPromptAfter =
    'META: You are a training reflection assistant. Goal – consolidate the Data scraping scenario experience.\nINPUT: I just completed the Data scraping scenario – data collection with an AI-generated Python script.\nOUTPUT: Ask me one question: what did this scenario give me and what will I apply next time? After my answer give 1 concrete tip.';
}

function syncSectionCopyables(moduleId, slideId) {
  const ltSlide = lt.modules
    .find((m) => m.id === moduleId)
    ?.slides.find((s) => s.id === slideId);
  const enSlide = getEnSlide(moduleId, slideId);
  if (!ltSlide?.content?.sections || !enSlide?.content?.sections) return;
  for (const ltSec of ltSlide.content.sections) {
    if (!(ltSec.copyable ?? '').trim()) continue;
    const translated = translateString(ltSec.copyable);
    if (!translated) continue;
    let enSec = enSlide.content.sections.find(
      (es) => es.heading === ltSec.heading
    );
    if (!enSec && ltSec.heading?.match(/^3[a-d]\./)) {
      const prefix = ltSec.heading.slice(0, 3);
      enSec = enSlide.content.sections.find((es) =>
        es.heading?.startsWith(prefix)
      );
    }
    if (enSec) enSec.copyable = translated;
  }
}

for (const slideId of [731, 100, 732, 733, 734, 85, 86, 90, 91, 94]) {
  syncSectionCopyables(7, slideId);
}

const s731 = getEnSlide(7, 731);
if (s731?.content?.sections) {
  s731.content.sections = s731.content.sections.filter(
    (s) => !s.heading?.startsWith('📍 Where to apply')
  );
  patchSections(s731, 731);
}

const s92bi = getEnSlide(7, 92);
if (s92bi?.content?.sections) {
  const old = s92bi.content.sections;
  const prompts = pickCopyableSections(old, ['3a', '3b']);
  const footer = old.find((s) => s.heading?.startsWith('🔽'));
  s92bi.content.sections = [
    {
      heading: '1️⃣ What is this for?',
      body: '**BI schema** – Collect → Analyze → Report → Forecast. Two practical prompts below.',
      blockVariant: 'brand',
    },
    {
      heading: '2️⃣ What to do',
      body: 'Pick: **BI plan** – replace [X] with topic, copy first prompt, get 4-step plan. Or **market trends** – replace [X] with sector.',
      blockVariant: 'terms',
    },
    ...prompts.map((p) =>
      p.heading?.startsWith('3a')
        ? {
            ...p,
            copyable:
              'Based on topic [X], provide a 4-step BI plan:\n1. Collect – which data sources to use\n2. Analyze – which EDA and insight steps to perform\n3. Report – when to visualize and present to leadership\n4. Forecast – what to forecast and which scenarios',
          }
        : p
    ),
    {
      heading: '4️⃣ Check (1 min)',
      body: patikraEn(PATIKRA[92]),
      blockVariant: 'accent',
    },
    footer
      ? {
          ...footer,
          imageAlt: 'BI schema: Collect → Analyze → Report → Forecast',
        }
      : null,
  ].filter(Boolean);
}

// Index-align with LT: 73 pipeline, 74 MASTER, 101 Geštalt merge
const s73en = getEnSlide(7, 73);
if (s73en?.content?.sections) {
  const old = s73en.content.sections;
  const prompts = pickCopyableSections(old, ['3a', '3b', '3c', '3d', '3e']);
  const footer = old.find((s) => s.heading?.startsWith('🔽'));
  s73en.content.sections = [
    {
      heading: '1️⃣ What is this for?',
      body: '**6-step pipeline** – from data to decision. One prompt per stage below.',
      blockVariant: 'brand',
    },
    {
      heading: '2️⃣ What to do',
      body: 'Pick a stage for your task: **collection** (where is data?), **preparation** (cleaning), **EDA** (what to understand?), **visualization** (how to show leadership?), **publishing** (report). Copy the matching prompt below.',
      blockVariant: 'terms',
    },
    ...prompts,
    {
      heading: '4️⃣ Check (1 min)',
      body: patikraEn(PATIKRA[73]),
      blockVariant: 'accent',
    },
    footer
      ? {
          ...footer,
          imageAlt: 'Data analysis pipeline – 6 steps',
        }
      : null,
  ].filter(Boolean);
}

const s74en = getEnSlide(7, 74);
if (s74en?.content?.sections) {
  const old = s74en.content.sections;
  const schema = old.find((s) => s.heading?.includes('Interactive'));
  const copySec = old.find((s) => (s.copyable ?? '').trim());
  s74en.content.sections = [
    {
      heading: '1️⃣ What is this for?',
      body: '**MASTER PROMPT** – 8-step full analysis; M9 template. Not Module 4 Master prompt about context.',
      blockVariant: 'brand',
    },
    {
      heading: 'Interactive 8-step schema',
      body: 'Same sequence as Module 9 workflow – here in MASTER context. Click a step.',
      image: schema?.image,
      imageAlt: 'MASTER: eight analysis steps',
      blockVariant: schema?.blockVariant,
    },
    {
      heading: '2️⃣ What to do',
      body: '**What to do:** Replace [X] with your topic (e.g. "Q4 sales", "customer success"). Copy the prompt below, paste into AI and run. **What you get:** full analysis with 8 blocks.',
      blockVariant: 'terms',
    },
    {
      heading: '3️⃣ Copyable prompt',
      body: '',
      copyable: copySec?.copyable,
      blockVariant: 'accent',
    },
    {
      heading: '4️⃣ Check (1 min)',
      body: patikraEn('Did you replace [X] and get all 8 blocks?'),
      blockVariant: 'accent',
    },
  ];
}

const s101en = getEnSlide(7, 101);
if (s101en?.content?.sections) {
  const old = s101en.content.sections;
  const doNow = old.find(
    (s) => s.heading === 'Do now' || s.heading?.startsWith('Do now')
  );
  const footer = old.find((s) => s.heading?.startsWith('🔽'));
  s101en.content.sections = [
    {
      heading: '1️⃣ Why here?',
      body: 'People understand visuals faster than a long table. A good visualization helps you see a relationship, risk or change – not just decorate the analysis.',
      blockVariant: 'brand',
    },
    {
      heading: '2️⃣ 10 / 20 / 80 principle',
      body: '**10%** – what a person only hears. **20%** – what they read. **80%** – what they see and experience. The numbers are directional – the lesson is clear: if you want a decision, show data so people grasp it quickly.',
      blockVariant: 'terms',
    },
    {
      heading: '3️⃣ Eight visual grouping principles',
      body: '**Proximity** – close elements look related.\n**Similarity** – same color/shape = same meaning.\n**Emphasis** – one highlighted focus.\n**Connection** – lines show relationships.\n**Continuity** – eye follows direction.\n**Closure** – completed shapes.\n**Figure and ground** – key element stands out.\n**Common fate** – same direction = related.',
      blockVariant: 'brand',
    },
    {
      heading: 'Do now',
      body: 'Check one of your dashboards or charts using these principles.',
      copyable: doNow?.copyable,
      blockVariant: 'accent',
    },
    footer ?? {
      heading: '🔽 Want to understand more?',
      body: 'If you are preparing for the Module 8 test, remember two things: the visualization type must match the question, and design principles help the audience see the answer faster.',
      blockVariant: 'terms',
      collapsible: true,
    },
  ];
}

const s97en = getEnSlide(7, 97);
if (s97en?.content?.sections) {
  const old = s97en.content.sections;
  const copySec = old.find((s) => (s.copyable ?? '').trim());
  const footer = old.find((s) => s.heading?.startsWith('🔽'));
  s97en.content.sections = [
    {
      heading: '1️⃣ What is this for?',
      body: '**Practical step for leadership** – one prompt to start a conversation on data-driven culture: plan, metrics, leadership behavior. Broader Deming context is on the "Strategic foundation" slide – here focus on the **copyable template** only.',
      blockVariant: 'accent',
    },
    {
      heading: '2️⃣ What to do',
      body: 'When you need **to start a conversation with leadership** – copy the prompt below, paste into AI. You get: 5-step plan, key metrics system, leadership behavior guidelines.',
      blockVariant: 'brand',
    },
    {
      heading: '3️⃣ Copyable prompt (for leadership)',
      body: '',
      copyable: copySec?.copyable,
      blockVariant: 'terms',
    },
    {
      heading: '4️⃣ Check (1 min)',
      body: patikraEn(PATIKRA[97]),
      blockVariant: 'accent',
    },
    footer ?? {
      heading: '🔽 Want to understand more?',
      body: '**Context: Lithuania.** In many organizations intuition and "we always did it this way" still dominate – building measurement habits matters. **Quote:** "In God we trust, all others bring data." (W. Edwards Deming). **Broader theoretical base** (data and variation, improve the system) – on the "Strategic foundation" slide.',
      blockVariant: 'brand',
      collapsible: true,
    },
  ];
}

const s100en = getEnSlide(7, 100);
if (s100en?.content?.sections) {
  s100en.content.sections = s100en.content.sections.filter(
    (s) => s.heading !== '3️⃣ Link to the pipeline'
  );
  const doNow = s100en.content.sections.find((s) =>
    s.heading?.startsWith('4️⃣')
  );
  if (doNow) {
    doNow.body = doNow.body
      .replace(/\n\n🔘 Copy prompt[^\n]*/i, '')
      .trim();
    doNow.copyable =
      'ROLE: You are a data story designer.\nTASK: Apply the 5-step cycle to my topic.\nCONTEXT: Topic: [enter]. Available data: [enter]. Audience: [leadership / team / clients].\nOUTPUT: 1) What to collect 2) What to prepare 3) Which visualization to choose 4) Which insight to verify 5) Which story to tell.';
  }
}

fs.writeFileSync(enPath, `${JSON.stringify(en, null, 2)}\n`, 'utf8');
console.log('Patched EN overlay:', enPath);
