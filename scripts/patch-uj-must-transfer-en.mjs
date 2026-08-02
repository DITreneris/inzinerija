/**
 * UJ-MUST-S1/S3 EN overlays for transfer + own-work.
 * Run after LT patch: node scripts/patch-uj-must-transfer-en.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const EN_MODULE_TRANSFER = {
  2: {
    abilityBefore: 'Answers about prompts were guesswork or inconsistent.',
    abilityAfter:
      'You can check the 6-block and workflow principles and see what to review.',
    firstAction24h:
      'Today fix one weak spot from the test results and run one improved work prompt.',
    nextStepCTA: 'Go to Module 3 practice – apply the 6 blocks to a real task.',
  },
  4: {
    abilityBefore: 'You wrote prompts without clear memory, sources, or quality checks.',
    abilityAfter:
      'You can manage context and sources and verify an answer before using it.',
    firstAction24h:
      'Within 24–48h give AI one work document as a source and ask for a summary with citations.',
    nextStepCTA: 'Go to Module 5 – apply prompts to a presentation and mini test.',
  },
  5: {
    abilityBefore: 'You drafted decks without a clear brief and quality gate.',
    abilityAfter:
      'You can go brief → structure → slides and decide whether to proceed.',
    firstAction24h:
      'Today take one real brief, generate a 5–7 slide structure with AI, then fix one weak spot.',
    nextStepCTA: 'Go to Module 6 – build a full work deliverable.',
  },
  8: {
    abilityBefore: 'Data-analysis path knowledge was fragmented.',
    abilityAfter:
      'You can check the pipeline, MASTER prompt, and analysis templates before the project.',
    firstAction24h:
      'Within 24–48h run one MASTER PROMPT with real (or anonymized) work data.',
    nextStepCTA: 'Go to Module 9 – pick a quest and create an artefact.',
  },
  11: {
    abilityBefore: 'Agent ideas were theoretical, without a clear check.',
    abilityAfter:
      'You can check agent depth, tools, and human control before practice.',
    firstAction24h:
      'Today run one agent query with tools and note where a human decision was needed.',
    nextStepCTA: 'Go to Module 12 – start a multi-agent setup.',
  },
  14: {
    abilityBefore: 'Image/video/audio principles were unchecked.',
    abilityAfter:
      'You can check style, rights, and consistency before a mini campaign.',
    firstAction24h:
      'Within 24–48h generate one image from your brief and note usage rights.',
    nextStepCTA: 'Go to Module 15 – quick start or a full mini campaign.',
  },
};

const EN_SLIDES = {
  // modules-en.json (M1–3)
  'src/data/modules-en.json': {
    1: {
      19: {
        abilityBefore: 'You wrote prompts loosely – results were inconsistent.',
        abilityAfter:
          'You can structure a prompt with 6 blocks and choose Basic vs Workflow.',
        firstAction24h:
          'Today write one work prompt with Meta + Input + Output and run it in an AI tool.',
        nextStepCTA: 'Go to Module 2 – check the 6-block and workflow knowledge.',
      },
    },
    3: {
      37: {
        abilityBefore: 'You knew the theory but lacked your own practice prompt set.',
        abilityAfter:
          'You have hands-on practice with 6 blocks and can repeat the process at work.',
        firstAction24h:
          'Within 24–48h apply one practice prompt to a real work task and save the result.',
        nextStepCTA:
          'If core readiness is clear – continue to Module 4 (advanced tools).',
        ownWorkLabel: 'Your work context',
        ownWorkPlaceholder: 'e.g. weekly sales report, customer complaints, email…',
        ownWorkTemplate:
          'META: You are my work assistant.\nINPUT: My context: {{context}}\nOUTPUT: Give 1 structured prompt (Meta/Input/Output) for this task and 3 quality criteria.',
      },
      38: {
        abilityBefore: 'You used AI without a clear 6-block system.',
        abilityAfter:
          'You finished part 1: structure, check, and practice – ready for the advanced path.',
        firstAction24h:
          'Today pick one work task and repeat a 6-block prompt without the training slides.',
        nextStepCTA: 'Open the core readiness check or Module 4.',
      },
    },
  },
  'src/data/modules-en-m4-m6.json': {
    6: {
      69: {
        abilityBefore: 'You lacked a finished project with a prompt set and checks.',
        abilityAfter:
          'You have a project artefact and know how to repeat the process for another topic.',
        firstAction24h:
          'Within 24–48h use the project result in real work (email, slide, or report).',
        nextStepCTA:
          'Pick another path (e.g. Data analysis – Module 7) or repeat the project.',
        ownWorkLabel: 'Your project topic',
        ownWorkPlaceholder: 'e.g. Q3 report for leadership, onboarding plan…',
        ownWorkTemplate:
          'META: You are a project quality assistant.\nINPUT: My project topic: {{context}}\nOUTPUT: Give a 5-point checklist for work-ready output and 1 improvement.',
      },
    },
  },
  'src/data/modules-en-m7-m9.json': {
    7: {
      75: {
        abilityBefore:
          'You gave data to AI without a clear pipeline and MASTER template.',
        abilityAfter:
          'You can go from data to insight with a MASTER prompt and analysis templates.',
      },
    },
    9: {
      92: {
        abilityBefore: 'You lacked a quest artefact with a clear finish line.',
        abilityAfter:
          'You can pick a scenario, create a result, and mark what is done.',
        firstAction24h:
          'Within 24–48h use at least one quest artefact in a real process or meeting.',
        nextStepCTA:
          'Return to the hub for another scenario or go to the Agents path (Module 10).',
        ownWorkLabel: 'Your quest context',
        ownWorkPlaceholder: 'e.g. call summary, pricing table…',
        ownWorkTemplate:
          'META: You are an analytics partner.\nINPUT: My situation: {{context}}\nOUTPUT: Suggest 1 concrete next step and 3 questions I should ask AI.',
      },
    },
  },
  'src/data/modules-en-m10-m12.json': {
    10: {
      10.8: {
        abilityBefore:
          'You mixed agents with plain chat – no tools or boundaries.',
        abilityAfter:
          'You can choose depth, tools, and human control in an agent workflow.',
      },
    },
    12: {
      128: {
        abilityBefore: 'You lacked a multi-agent start with clear artefacts.',
        abilityAfter:
          'You have a quick-start or full practice pack and know what to improve next.',
        ownWorkLabel: 'Your process',
        ownWorkPlaceholder: 'e.g. lead qualification, content calendar…',
        ownWorkTemplate:
          'META: You are an agent architect.\nINPUT: My process: {{context}}\nOUTPUT: Propose Coordinator + 2 specialist roles (1 sentence each) and 1 human risk point.',
      },
    },
  },
  'src/data/modules-en-m13-m15.json': {
    13: {
      13.9: {
        abilityBefore:
          'You wrote image/video prompts without style, ratios, or rights.',
        abilityAfter:
          'You can craft image, video, and music prompts with consistency and rights awareness.',
      },
    },
    15: {
      158: {
        abilityBefore:
          'You lacked a mini campaign or hero image with saved prompts.',
        abilityAfter:
          'You have a quick-start or mini-campaign artefact and can repeat it for another topic.',
        ownWorkLabel: 'Your campaign / channel context',
        ownWorkPlaceholder: 'e.g. LinkedIn announcement, product landing hero…',
        ownWorkTemplate:
          'META: You are a content director.\nINPUT: My channel and goal: {{context}}\nOUTPUT: Give 1 hero image prompt (style, ratios, on-image text) and 3 check points.',
      },
    },
  },
};

function patchFile(rel, moduleMap) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) {
    console.warn('skip missing', rel);
    return;
  }
  const data = JSON.parse(fs.readFileSync(full, 'utf8'));
  const modules = data.modules ?? data;
  let n = 0;
  const list = Array.isArray(modules) ? modules : [];
  for (const mod of list) {
    const slideMap = moduleMap[mod.id];
    if (slideMap) {
      for (const slide of mod.slides ?? []) {
        const patch = slideMap[slide.id];
        if (!patch || !slide.content) continue;
        Object.assign(slide.content, patch);
        n += 1;
      }
    }
    if (EN_MODULE_TRANSFER[mod.id]) {
      mod.transfer = { ...EN_MODULE_TRANSFER[mod.id] };
      n += 1;
    }
  }
  // Also patch module.transfer on full SOT EN? overlays may only have partial modules
  fs.writeFileSync(full, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  console.log(`${rel}: patched ${n}`);
}

// Module.transfer for path-test/M4 lives on LT SOT; EN merge may need transfer on overlays that include those modules.
// Patch modules-en for M2 if present; M4/M5 in m4-m6; M8 in m7-m9; M11 in m10-m12; M14 in m13-m15.
const EXTRA_MODULE_TRANSFER_FILES = {
  'src/data/modules-en.json': [2],
  'src/data/modules-en-m4-m6.json': [4, 5],
  'src/data/modules-en-m7-m9.json': [8],
  'src/data/modules-en-m10-m12.json': [11],
  'src/data/modules-en-m13-m15.json': [14],
};

for (const [rel, map] of Object.entries(EN_SLIDES)) {
  patchFile(rel, map);
}

for (const [rel, ids] of Object.entries(EXTRA_MODULE_TRANSFER_FILES)) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) continue;
  const data = JSON.parse(fs.readFileSync(full, 'utf8'));
  const list = data.modules ?? [];
  let n = 0;
  for (const mod of list) {
    if (ids.includes(mod.id) && EN_MODULE_TRANSFER[mod.id]) {
      mod.transfer = { ...EN_MODULE_TRANSFER[mod.id] };
      n += 1;
    }
  }
  if (n) {
    fs.writeFileSync(full, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
    console.log(`${rel}: module.transfer ×${n}`);
  }
}

console.log('UJ-MUST EN transfer patch done');
