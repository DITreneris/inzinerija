/**
 * EN sync for M4/61 (modules-en-m4-m6) and M7/71.35 (modules-en-m7-m9).
 * Manual edit – do not run build:modules-en-m7-m9 after this without re-applying.
 * Run: node scripts/patch-en-m4-61-m7-71-35-tools-table.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dataDir = join(root, 'src', 'data');

const decisionSection = {
  heading: 'When to use which?',
  body: '**First 4 = typical 30–45 min run.** Consensus and Connected Papers – when you need research depth.',
  blockVariant: 'terms',
  toolChoiceBar: {
    question: 'What are you doing now?',
    choices: [
      { label: 'Sources', rowIndex: 0 },
      { label: 'PDF', rowIndex: 1 },
      { label: 'Synthesis', rowIndex: 2 },
      { label: 'Citation', rowIndex: 3 },
      { label: 'Science', rowIndex: 4 },
      { label: 'Network', rowIndex: 5 },
    ],
  },
  table: {
    headers: ['Situation', 'Tool', 'Input → result', 'Time'],
    solutionMatrixStyle: true,
    rows: [
      [
        'Quick sources with links',
        'Perplexity',
        'Question → answer + URL',
        '5–10 min',
      ],
      [
        'I have a PDF / report',
        'PaperGuide',
        'PDF + question → summary',
        '10–15 min',
      ],
      [
        'Trends across several studies',
        'Elicit',
        'Question / PDF → synthesis',
        '10–15 min',
      ],
      [
        'Does the citation support the claim?',
        'Scite',
        'DOI / title → Supported vs Contradicted',
        '~5 min',
      ],
      [
        '"What does science say?"',
        'Consensus',
        'Claim → support view',
        'As needed',
      ],
      [
        'Paper network / seminal work',
        'Connected Papers',
        'Paper → clusters',
        'As needed',
      ],
    ],
  },
};

const eigaSection = {
  heading: 'Typical run (30–45 min)',
  body: 'Four steps for one topic – times are approximate.',
  blockVariant: 'brand',
  table: {
    headers: ['#', 'Step', 'Tool', 'Min'],
    rows: [
      ['1', 'Sources', 'Perplexity', '5–10'],
      ['2', 'PDF', 'PaperGuide / Elicit', '10–15'],
      ['3', 'Citation', 'Scite', '~5'],
      ['4', 'Synthesis', 'Elicit', '10–15'],
    ],
  },
};

const copyable =
  'ROLE: You are a business researcher.\nTASK: Find 5–7 reliable sources on: [X].\nOUTPUT: Table – claim | source (URL) | why reliable.\nRULE: Every claim needs a source; if you do not know – write "I don\'t know".';

const patikra = {
  heading: '4️⃣ Quality check (1 min)',
  body: 'If at least 2 answers are "no" – go back to "When to use which?".\n\n1. Do you have sources with URLs?\n2. If you used a PDF – did you ask a concrete question (not just "summary")?\n3. Did you check a key claim in Scite (Supported vs Contradicted)?',
  blockVariant: 'accent',
};

const starter = {
  heading: 'Starter: Perplexity',
  body: 'Paste into Perplexity (web mode). Replace [X] with your topic.',
  blockVariant: 'default',
  copyable,
};

function applyEnSlide(slide, { trumpai, toolsIntro, daryk, context, whyBenefit }) {
  const tools = slide.content.tools;
  const footer = slide.content.footer;
  slide.content = {
    whyBenefit,
    toolsIntro,
    toolsCollapsible: true,
    tools,
    sections: [
      { heading: '1️⃣ In short (20 s)', body: trumpai, blockVariant: 'accent' },
      decisionSection,
      eigaSection,
      { heading: '2️⃣ Do now', body: daryk, blockVariant: 'brand' },
      starter,
      patikra,
      context,
    ],
    footer,
  };
}

// M4 EN
const en46 = JSON.parse(readFileSync(join(dataDir, 'modules-en-m4-m6.json'), 'utf8'));
const m4 = en46.modules.find((m) => m.id === 4);
const s61 = m4.slides.find((s) => s.id === 61 && s.type === 'content-block');
if (!s61) throw new Error('EN M4/61 content-block not found');
applyEnSlide(s61, {
  whyBenefit:
    'You can do any research in 30–45 min – enter a question or upload a PDF, get answers with sources.',
  toolsIntro:
    'Enter a question or upload a PDF – you will get answers with sources. Useful for RAG source search and Deep research tasks.',
  trumpai:
    'Optional cheat sheet: pick an AI tool by situation (search → PDF → citation → synthesis). Typical run – 30–45 min. Use with RAG sources.',
  daryk:
    'Take a topic you are already researching (or your RAG sources). Run at least **1 step** from the table – Perplexity is enough to start. 🔘 **Copy prompt (below)**',
  context: {
    heading: 'Where to apply?',
    body: 'Use after you cite sources in your prompt (RAG) or prepare documents for research. Later in the module – **Deep research**.',
    blockVariant: 'brand',
  },
});
writeFileSync(
  join(dataDir, 'modules-en-m4-m6.json'),
  `${JSON.stringify(en46, null, 2)}\n`,
  'utf8'
);
console.log('Patched EN M4/61');

// M7 EN
const en79 = JSON.parse(readFileSync(join(dataDir, 'modules-en-m7-m9.json'), 'utf8'));
const m7 = en79.modules.find((m) => m.id === 7);
const s7135 = m7.slides.find((s) => s.id === 71.35);
if (!s7135) throw new Error('EN M7/71.35 not found');
applyEnSlide(s7135, {
  whyBenefit:
    'You can do any research in 30–45 min – enter a question or upload a PDF, get answers with sources.',
  toolsIntro:
    'Enter a question or upload a PDF – you will get answers with sources. Useful after parallel research (2–4 sources).',
  trumpai:
    'Optional cheat sheet: after parallel research, pick an AI tool by situation (search → PDF → citation → synthesis). Typical run – 30–45 min.',
  daryk:
    'Take the topic from the previous step (2–4 sources). Run at least **1 step** from the table – Perplexity is enough to start. 🔘 **Copy prompt (below)**',
  context: {
    heading: 'Where this sits on the path',
    body: 'You will find the same cheat sheet in **Module 4** (optional, after RAG memory). Here – practice on the Data analysis path after parallel research (Deep research).',
    blockVariant: 'brand',
  },
});
writeFileSync(
  join(dataDir, 'modules-en-m7-m9.json'),
  `${JSON.stringify(en79, null, 2)}\n`,
  'utf8'
);
console.log('Patched EN M7/71.35');
