#!/usr/bin/env node
/**
 * Build src/data/modules-en-m16-m18.json – EN overlay for modules 16–18.
 * Structure mirrors LT; user-facing strings replaced for EN merge.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { applyM16EnPlainOverrides } from './lib/m16-en-plain-overrides.mjs';
import { applyM17EnPlainOverrides } from './lib/m17-en-plain-overrides.mjs';
import { applyM18EnPlainOverrides } from './lib/m18-en-plain-overrides.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const lt = JSON.parse(readFileSync(join(root, 'src', 'data', 'modules.json'), 'utf8'));
const outPath = join(root, 'src', 'data', 'modules-en-m16-m18.json');

const moduleMeta = {
  16: {
    title: 'Code engineering with AI',
    subtitle: 'Planning: from idea to MVP brief',
    description: 'Learn to frame a narrow MVP task and fill a clear brief before Cursor.',
    duration: '25–30 min',
  },
  17: {
    title: 'Knowledge check (Code path)',
    subtitle: 'Quiz: brief and planning quality',
    description: 'Check that your brief is narrow and testable. ≥70% recommended before Module 18.',
    duration: '12–15 min',
  },
  18: {
    title: 'Final project (Code path)',
    subtitle: 'BUILD PACKET → Cursor → soft DoD',
    description: 'Assemble a BUILD PACKET and prove a runnable (or local) MVP with discipline.',
    duration: '45–90 min',
  },
};

const slideMeta = {
  160: ['Code engineering path', 'Planning before Cursor'],
  16.2: ['What you will do today', '1 problem · 1 user · 1 feature'],
  16.25: ['Stack map', 'Which layer when – not a tool fair'],
  16.3: ['Process map', 'From problem to test'],
  16.4: ['Problem before solution', 'Bad vs good start'],
  16.5: ['Problem formula', 'User · problem · situation · consequence'],
  16.6: ['Value is not a feature', 'Outcome vs product action'],
  16.7: ['MVP scope', 'Must now · Can later · Won’t build'],
  16.8: ['Practice: creation card', '5 fields – bridge to the brief'],
  16.85: ['Card ready', 'Card → brief'],
  16.101: ['Vibe → Skeleton → Refinement', 'Three brief maturity steps'],
  16.11: ['Product sentence', 'One line – for whom and why'],
  16.12: ['Three pillars and critique', 'Problem–user–value + Before/After'],
  16.14: ['Three directions', 'A / B / C – who, what, result'],
  16.15: ['Pick the most testable', 'Pick the most testable direction in the lab'],
  16.16: ['User cycle', 'Trigger → Input → Action → Result → Next'],
  16.17: ['Screens from the flow', 'Max 3–5 screens'],
  16.18: ['Bounds and Now–Next–Later', 'Must ≤4 · Won’t on purpose'],
  16.201: ['Risks', '3 risks + mitigation'],
  16.205: ['Ready check before the brief', '2–3 questions – ready for the brief?'],
  16.21: ['Practice: MVP brief', 'Fill 01_MVP_BRIEF.md (11 fields)'],
  16.22: ['Module 16 summary', 'Brief ready – next is the quiz'],
  170: ['Module 17 quiz', 'Brief and planning knowledge'],
  170.5: ['Warm-up before the quiz', '3 questions: 1+1+1, value, path to M18'],
  171: ['Questions', 'Planning and brief quality'],
  172: ['Results', 'Is the brief ready for Module 18?'],
  173: ['Bonus: brief checklist in 5 min', 'Optional before Module 18'],
  180: ['Code engineering project', 'PACKET → Cursor → soft DoD'],
  18.05: ['Refresh: brief → PACKET', 'Single 1+1+1 reminder'],
  18.1: ['Why not the whole app', 'Chaos vs controlled build'],
  18.2: ['Anti-example', 'Task Manager + Redis/Auth/Stripe'],
  18.3: ['User flow', '5–7 steps + error branches'],
  18.4: ['Minimal data', '2–4 entities, plain language'],
  18.5: ['Build brief (6 fields)', 'Project · user · goal · context · constraints · Done'],
  18.6: ['PROJECT_RULES.md', '8–12 lines for the agent'],
  18.7: ['Cursor vertical slice', 'One function / one slice'],
  18.8: ['Plan → approve → code', 'Human says “yes” before generate'],
  18.9: ['Composer vs Chat', 'One idea – not a mastery course'],
  18.101: ['Iteration loop', 'Describe → Generate little → Run → Check → Fix'],
  18.11: ['Error prompt', 'Bad: “Broken” · Good: context'],
  18.12: ['Practice: BUILD PACKET', 'mvp_brief · user_flow · schema? · build_prompt · PROJECT_RULES'],
  18.13: ['Code is not the product', 'AI generates – you verify'],
  18.14: ['3 vibe-debt traps', 'Tests from code · bloat · “looks fine”'],
  18.15: ['5 risks', 'Deps → Env → Tests → Security → Deploy'],
  18.16: ['Smoke and critical path', 'Starts + core function'],
  18.17: ['Edge and .env', 'Normal / Edge / Error · no keys in prompts'],
  18.18: ['Debug: 1 change', 'Error → evidence → hypothesis → 1 change → test'],
  18.19: ['Launch gates', 'WORKS → CHECKED → PROTECTED → LIVE → WATCHED'],
  18.201: ['Git safety and diff ritual', 'status → diff → smoke → commit → push'],
  18.21: ['Deploy-ready checklist', 'README · deps · gitignore · env.example'],
  18.22: ['Publish', 'Platform-agnostic – not Heroku-only'],
  18.23: ['Soft DoD and proof', 'Proof for a user or locally'],
  18.24: ['Module 18 summary', 'PACKET + proven MVP'],
};

const headingMap = new Map([
  ['Trumpai', 'In short'],
  ['Daryk dabar', 'Do this now'],
  ['Patikra', 'Check'],
  ['Skeptikas', 'Skeptic'],
  ['Brief pagalbininkas', 'Brief helper'],
  ['PROJECT_RULES.md', 'PROJECT_RULES.md'],
  ['Cursor vertikalus pjūvis', 'Cursor vertical slice'],
  ['Planas prieš kodą', 'Plan before code'],
  ['Klaidos kontekstas', 'Error context'],
  ['Ką išmokai', 'What you learned'],
  ['Triage zonos', 'Triage zones'],
  ['Stack sluoksniai', 'Stack layers'],
  ['Must / Should / Won’t ir NNL', 'Must / Should / Won’t and NNL'],
  ['3 rizikos', '3 risks'],
  ['6 laukai', '6 fields'],
  ['Deploy-ready checklist', 'Deploy-ready checklist'],
  ['Blogas vs geras startas', 'Bad vs good start'],
  ['Ekranas ← ciklo žingsnis', 'Screen ← cycle step'],
  ['Anti vs MVP', 'Anti vs MVP'],
  ['Publish žingsniai', 'Publish steps'],
  ['Brief checklist', 'Brief checklist'],
  ['Trys kryptys A / B / C', 'Three directions A / B / C'],
  ['Įvertinimas 1–5', 'Score 1–5'],
  ['3 vibe-debt spąstai', '3 vibe-debt traps'],
  ['Smoke indikatoriai', 'Smoke indicators'],
  ['Chaosas vs kontrolė', 'Chaos vs control'],
  ['Minimalios esybės', 'Minimal entities'],
  ['Delivery vartai', 'Delivery gates'],
  ['Šeši žingsniai iki brief’o', 'Six steps to the brief'],
  ['VSR brandos kopėčios', 'VSR maturity ladder'],
  ['Brief brandinimo žingsniai', 'Brief maturity steps'],
  ['Užpildytas pavyzdys', 'Filled example'],
  ['Blogas vs geras', 'Bad vs good'],
  ['Trys atramos (iš kortelės)', 'Three pillars (from the card)'],
  ['Prieš / Po', 'Before / After'],
  ['Užpildytas ciklas (dienos prioritetai)', 'Filled cycle (daily priorities)'],
  ['11 brief laukų', '11 brief fields'],
  ['Pavyzdys (dienos prioritetai)', 'Example (daily priorities)'],
  ['Orientyras 1–5 (pavyzdys)', 'Guide 1–5 (example)'],
  ['Krypties lab', 'Direction lab'],
  ['Naudotojo ciklas', 'User cycle'],
  ['Naudotojo ciklas (flow)', 'User cycle (flow)'],
  ['BUILD PACKET sluoksniai', 'BUILD PACKET layers'],
  ['Diff ritualas', 'Diff ritual'],
  ['Pasirink nutekėjimo tipą', 'Pick a leak path'],
  ['Kopijuok gerą – Git', 'Copy the good – Git'],
  ['Kopijuok gerą – Promptas', 'Copy the good – Prompt'],
  ['Kopijuok gerą – Commit', 'Copy the good – Commit'],
]);

const phraseMap = [
  [/Toliau – skaidrė (\d+): /g, 'Next – slide $1: '],
  [/Toliau – Modulis (\d+)/g, 'Next – Module $1'],
  [/\bDI\b/g, 'AI'],
  [/promptas/g, 'prompt'],
  [/promptą/g, 'prompt'],
  [/promptų/g, 'prompts'],
  [/Modulyje/g, 'in Module'],
  [/Modulio/g, 'Module'],
  [/Modulį/g, 'Module'],
  [/lietuviškai/g, 'in English'],
  [/Lietuvių kalba/g, 'English'],
  [/Kalba UI: LT/g, 'UI language: EN'],
  [/Kalba: LT UI tekstuose/g, 'Language: EN in UI copy'],
];

function translateText(s) {
  if (typeof s !== 'string') return s;
  let out = s;
  for (const [re, rep] of phraseMap) out = out.replace(re, rep);
  return out;
}

function walk(value) {
  if (Array.isArray(value)) return value.map(walk);
  if (value && typeof value === 'object') {
    const next = {};
    for (const [k, v] of Object.entries(value)) {
      if (k === 'heading' && typeof v === 'string' && headingMap.has(v)) {
        next[k] = headingMap.get(v);
      } else if (typeof v === 'string') {
        next[k] = translateText(v);
      } else {
        next[k] = walk(v);
      }
    }
    return next;
  }
  return value;
}

const modules = lt.modules
  .filter((m) => m.id >= 16 && m.id <= 18)
  .map((mod) => {
    const meta = moduleMeta[mod.id];
    const base = structuredClone(mod);
    // Exact LT→EN map must run before mechanical DI→AI walk (keys are LT).
    if (base.id === 18) applyM18EnPlainOverrides(base);
    const cloned = walk(base);
    Object.assign(cloned, meta);
    cloned.slides = cloned.slides.map((slide) => {
      const pair = slideMeta[slide.id];
      if (pair) {
        slide.title = pair[0];
        slide.subtitle = pair[1];
        if (slide.shortTitle) slide.shortTitle = pair[0];
      }
      return slide;
    });
    return cloned;
  });

/** Hand-tuned EN for M16 action-intro – walk leaves LT body / DI→AI only. */
const slide160En = {
  whyBenefit:
    'After this module you will have a clear MVP brief – who, what, and the limits for building with AI.',
  heroStat: 'Vibe coding',
  heroText: 'with discipline.',
  heroSubText:
    'Prompt foundations – Modules 1–6. Here vibe coding = fast building with AI, but a narrow brief first before Cursor generation.',
  firstActionCTA:
    'In 2 min write one user and one problem for your idea (first step; value and 1 feature come later). Or use the daily-priorities example.',
  outcomes: [
    'User, problem, value, and 1 feature',
    'Build card → 01_MVP_BRIEF.md',
    'Must / Won’t and a testable success criterion',
  ],
  duration: '~25–30 min',
  audience:
    'For business and product people – a working prototype without deep programming.',
};

/** Hand-tuned EN for 18.17 (.env manipulation-contrast) – mechanical walk leaves LT. */
const slide1817En = {
  sections: [
    {
      heading: 'In short',
      body: 'Edge cases: Normal / Edge / Error. Real keys – never in a committed .env on GitHub, never in prompts.',
      blockVariant: 'accent',
    },
    {
      heading: 'Pick a leak path',
      body: 'Three paths – Bad|Good opens after you pick. Examples use PLACEHOLDER only (not a real key).',
      blockVariant: 'brand',
      toolChoiceBar: {
        variant: 'manipulation-contrast',
        question: 'Where do keys leak most often?',
        sequenceHint: 'Pick a type – you will see Bad vs Good.',
        choices: [
          {
            label: 'Git',
            rowIndex: 0,
            pushSignal: 'The key ends up in repo history.',
            badExample:
              'API_KEY=sk-live-EXAMPLE_NOT_REAL in a file that goes into Git',
          },
          {
            label: 'Prompt',
            rowIndex: 1,
            pushSignal: 'The key ends up in chat history or logs.',
            badExample:
              'Here is my key sk-live-EXAMPLE_NOT_REAL – add it to the fetch header.',
          },
          {
            label: 'Commit',
            rowIndex: 2,
            pushSignal: 'Secret files enter the commit without a check.',
            badExample:
              'git add . && git commit -m "fix" – without status and diff',
          },
        ],
      },
    },
    {
      heading: 'Copy the good – Git',
      body: 'Use .env.example without real keys.',
      copyable:
        '.env – gitignore.\n.env.example:\nAPI_KEY=YOUR_API_KEY_HERE\n# PLACEHOLDER – not a real key',
      linkedRowIndex: 0,
      blockVariant: 'terms',
    },
    {
      heading: 'Copy the good – Prompt',
      body: 'Ask for an env variable – do not show the key.',
      copyable:
        'Use process.env.API_KEY (or the matching env).\nDo not paste the key value into the prompt and do not commit .env.',
      linkedRowIndex: 1,
      blockVariant: 'terms',
    },
    {
      heading: 'Copy the good – Commit',
      body: 'Before commit – status and diff.',
      copyable:
        'Before commit:\n1) git status – is .env absent?\n2) git diff – no sk- / API_KEY= real values?\nOnly then commit.',
      linkedRowIndex: 2,
      blockVariant: 'terms',
    },
    {
      heading: 'Do this now',
      body: 'Write one Normal / Edge / Error example for your Must function. Check .env.example has no secrets.',
      blockVariant: 'brand',
    },
    {
      heading: 'Check',
      body: 'If someone saw your last prompt – is there a real key in it?',
      blockVariant: 'accent',
    },
  ],
  footer: 'Next – slide 22: Debug',
};

/** LT → EN exact glossary term names (itemGlossaryTerms / unlockedGlossaryTerms). */
const glossaryTermMap = new Map([
  ['Triage (Būtina dabar / Galima vėliau / Nekuriame)', 'Triage (Must now / Later / Won’t)'],
  ['BUILD PACKET', 'BUILD PACKET'],
  ['PROJECT_RULES.md', 'PROJECT_RULES.md'],
  ['Vertikalus pjūvis', 'Vertical slice'],
  ['Smoke', 'Smoke'],
  ['Soft DoD', 'Soft DoD'],
  ['Diff ritualas', 'Diff ritual'],
  ['Vibe debt', 'Vibe debt'],
]);

function mapGlossaryTerms(arr) {
  if (!Array.isArray(arr)) return arr;
  return arr.map((t) => {
    if (typeof t !== 'string' || t === '') return t;
    return glossaryTermMap.get(t) ?? t;
  });
}

/** Hand-tuned EN transfer chrome – mechanical walk leaves LT diacritics. */
const transferEnByModule = {
  16: {
    abilityBefore: 'I treated the idea as “need an app” with no bounds.',
    abilityAfter: 'I can fill an MVP brief with Must/Won’t and a user cycle.',
    firstAction24h: 'Finish 01_MVP_BRIEF.md for one narrow idea today.',
    nextStepCTA: 'Go to Module 17 quiz',
  },
  17: {
    abilityBefore:
      'You checked brief quality by gut feel, without clear Must/Won’t gates.',
    abilityAfter:
      'You can check that a brief is narrow and testable before a Cursor project.',
    firstAction24h:
      'Within 24–48h, fix one weak brief spot and go to Module 18 with Must ≤4.',
    nextStepCTA: 'Go to Module 18 – BUILD PACKET and soft DoD.',
  },
  18: {
    abilityBefore: 'I used to run AI-generated code without a PACKET and proof.',
    abilityAfter: 'I have a PACKET and soft DoD proof (URL or local).',
    firstAction24h: 'Make 1 commit + 1 smoke / proof on your MVP.',
    nextStepCTA: 'Apply PACKET to another narrow idea',
  },
};

const summaryTransferSlide = { 16: 16.22, 17: null, 18: 18.24 };

for (const mod of modules) {
  if (mod.id === 16) {
    const intro = mod.slides.find((s) => s.id === 160);
    if (intro?.content) {
      Object.assign(intro.content, slide160En);
    }
    applyM16EnPlainOverrides(mod);
    for (let i = 0; i < mod.slides.length; i++) {
      const s = mod.slides[i];
      const f = s.content?.footer;
      if (!f || (!f.includes('Next – slide') && !f.includes('Toliau – skaidrė'))) continue;
      const next = mod.slides[i + 1];
      if (!next) continue;
      s.content.footer = `Next – slide ${i + 2}: ${next.title}`;
    }
  }
  if (mod.id === 17) {
    applyM17EnPlainOverrides(mod);
  }
  if (mod.id === 18) {
    // Durable map covers 18.17; keep hand-tuned block as final authority.
    const slide = mod.slides.find((s) => s.id === 18.17);
    if (slide?.content) {
      slide.content.sections = slide1817En.sections;
      slide.content.footer = slide1817En.footer;
    }
    for (let i = 0; i < mod.slides.length; i++) {
      const s = mod.slides[i];
      const f = s.content?.footer;
      if (!f || (!f.includes('Next – slide') && !f.includes('Toliau – skaidrė'))) continue;
      const next = mod.slides[i + 1];
      if (!next) continue;
      s.content.footer = `Next – slide ${i + 2}: ${next.title}`;
    }
  }

  const transferEn = transferEnByModule[mod.id];
  if (transferEn) {
    mod.transfer = { ...mod.transfer, ...transferEn };
    const summaryId = summaryTransferSlide[mod.id];
    if (summaryId != null) {
      const summary = mod.slides.find((s) => s.id === summaryId);
      if (summary?.content) {
        Object.assign(summary.content, {
          abilityBefore: transferEn.abilityBefore,
          abilityAfter: transferEn.abilityAfter,
          firstAction24h: transferEn.firstAction24h,
        });
        if (mod.id === 16) {
          summary.content.nextStepCTA =
            'Go to Module 17: Knowledge check (Code path)';
        }
        if (mod.id === 18) {
          summary.content.nextStepCTA =
            'Apply PACKET to another narrow idea within 7 days.';
          summary.content.ownWorkLabel = 'Your PACKET / proof context';
          summary.content.ownWorkPlaceholder =
            'e.g. daily priorities MVP, GitHub URL, or local launch proof…';
          summary.content.ownWorkTemplate =
            'META: You are a vibe-coding discipline partner.\nINPUT: My project / PACKET: {{context}}\nOUTPUT: Give (1) a 3-point soft DoD checklist (URL or local proof), (2) 1 missing PACKET file, (3) 1 concrete next commit/smoke step.';
        }
      }
    }
  }

  for (const slide of mod.slides) {
    const c = slide.content;
    if (!c) continue;
    if (c.recap?.itemGlossaryTerms) {
      c.recap.itemGlossaryTerms = mapGlossaryTerms(c.recap.itemGlossaryTerms);
    }
    if (c.unlockedGlossaryTerms) {
      c.unlockedGlossaryTerms = mapGlossaryTerms(c.unlockedGlossaryTerms);
    }
  }
}

writeFileSync(outPath, `${JSON.stringify({ modules }, null, 2)}\n`, 'utf8');
console.log(`Wrote ${outPath} (${modules.length} modules)`);
