/** EN overlay polish for M1618 ritmas slides after build-en. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const enPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '../src/data/modules-en-m16-m18.json'
);
const data = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const m16 = data.modules.find((m) => m.id === 16);
const m18 = data.modules.find((m) => m.id === 18);

function slide(mod, id) {
  const s = mod.slides.find((x) => x.id === id);
  if (!s) throw new Error('missing ' + id);
  return s;
}

{
  const s = slide(m16, 16.8);
  s.title = 'Practice: creation card';
  s.shortTitle = 'Creation card';
  s.subtitle = '5 fields – bridge to the brief';
  s.content = {
    title: 'Creation card – 5 fields written',
    pathLabel: 'Creation card',
    stepNumber: 1,
    stepTotal: 1,
    body: 'Fill the card for your idea (or the daily priorities tool). Mark done when all 5 fields are written – this feeds the brief.',
    sections: [
      { heading: '1. User', body: 'Who uses it and in what context?' },
      {
        heading: '2. Problem',
        body: 'A concrete problem (not “I want an app”).',
      },
      {
        heading: '3. Value created',
        body: 'What changes for the user – not a feature list.',
      },
      {
        heading: '4. Core function',
        body: 'One main function (+ max 1–2 supporting).',
      },
      {
        heading: '5. How we know it works',
        body: 'A checkable success criterion (ideally under 2 minutes).',
      },
      {
        heading: 'Check',
        body: 'Is there really one function? Is the success criterion checkable?',
      },
    ],
    footer: 'Next – slide 9: Card ready',
  };
}

{
  const s = slide(m16, 16.85);
  s.title = 'Card ready';
  s.shortTitle = 'Card ✓';
  s.subtitle = 'D1 done – next the brief';
  s.content = {
    title: 'Card ready',
    subtitle:
      'Next: VSR, direction, cycle, and 01_MVP_BRIEF.md. Still no Cursor build.',
    sectionNumber: 'D1→D2',
    celebrationText: 'Nice! 5 card fields – your bridge into the brief.',
    recap: {
      heading: 'What you already know',
      lead: 'Part one – from problem to card.',
      items: [
        'Problem before solution – a concrete user and consequence.',
        'Value ≠ function; triage: Must now / Later / Won’t build.',
        'Creation card: 5 fields as brief input.',
      ],
    },
    nextSteps: [
      'Vibe → Skeleton → Refinement – brief phases.',
      'Product sentence, critique, and three directions A/B/C.',
      'User cycle, screens, limits, and risks.',
      'Practice: 01_MVP_BRIEF.md (11 fields).',
    ],
    footer: 'Next – slide 10: Transition to the brief',
  };
}

{
  const s = slide(m16, 16.15);
  s.subtitle = 'Pick the most testable direction in the lab';
  s.content.sections = [
    {
      heading: 'In short',
      body: 'Pick the most testable direction – not the prettiest. Guide: speed to test, clarity, risk (example A≈11, B≈10, C≈9).',
      blockVariant: 'accent',
    },
    {
      heading: 'Direction lab',
      body: 'Choose A, B, or C. After the pick – score mirror and a copyable “why most testable”.',
      blockVariant: 'brand',
      image: 'm16_direction_picker',
      imageAlt: 'Direction picker lab: A/B/C, scores, and copyable why',
    },
    {
      heading: '1–5 guide (example)',
      body: 'Open if you want the table. The lab already shows scores after you pick.',
      blockVariant: 'default',
      collapsible: true,
      table: {
        headers: ['Criterion', 'A', 'B', 'C'],
        rows: [
          ['Speed to test (1–5)', '5', '3', '2'],
          ['Clarity for the user (1–5)', '4', '4', '3'],
          ['Risk / complexity (1=low)', '2', '3', '4'],
          ['Sum (guide)', '11', '10', '9'],
        ],
      },
    },
    {
      heading: 'Check',
      body: 'Can the winner be tested in a day – not a quarter?',
      blockVariant: 'accent',
    },
  ];
}

{
  const s = slide(m16, 16.205);
  s.title = 'Quick check before the brief';
  s.shortTitle = 'Quick check';
  s.subtitle = '2–3 questions – ready for the brief?';
  s.content = {
    questions: [
      {
        id: 'm16-wu-must',
        question: 'How many Must items should fit in a first MVP brief?',
        options: [
          'Must ≤4 – keep scope narrow',
          'Must ≥10 – so you forget nothing',
          'Unlimited Must – write everything',
          'Must is only the tech stack',
        ],
        correct: 0,
        explanation:
          'Narrow brief: Must ≤4. If wrong – revisit “Limits and Now–Next–Later”.',
      },
      {
        id: 'm16-wu-value',
        question: 'What separates value from a function?',
        options: [
          'Value = change for the user; function = action in the product',
          'Value and function are the same',
          'Value = tech stack; function = design',
          'Value = how many screens you have',
        ],
        correct: 0,
        explanation:
          'Value = change; function = how the product acts. See “Value ≠ function”.',
      },
      {
        id: 'm16-wu-cycle',
        question: 'How does a user cycle differ from a feature list?',
        options: [
          'The cycle describes UX flow (trigger → result → next), not a feature list',
          'The cycle is an ERD diagram',
          'The cycle is a deploy checklist',
          'The cycle is only needed after GitHub',
        ],
        correct: 0,
        explanation: 'Cycle = UX sequence. See “User cycle”.',
      },
    ],
    footer: 'Next – slide 21: MVP brief',
  };
}

{
  const s = slide(m18, 18.55);
  s.title = 'Quick check: plan before code';
  s.shortTitle = 'Quick check';
  s.subtitle = '2 questions before Cursor generate';
  s.content = {
    questions: [
      {
        id: 'm18-wu-plan',
        question: 'What should come before a larger Cursor generate session?',
        options: [
          'A short plan / approval, then code',
          'The whole app immediately with no brief',
          'Only a deploy URL',
          'MCP and Spec Kit as mandatory',
        ],
        correct: 0,
        explanation:
          'Plan before code – discipline. See “Plan → approval → code”.',
      },
      {
        id: 'm18-wu-rules',
        question: 'What is PROJECT_RULES.md for in a vibe-coding session?',
        options: [
          'Short agent limits: Won’t, Done, what not to generate',
          'A full SysEng handbook',
          'Only a color palette',
          'Heroku-only deploy instructions',
        ],
        correct: 0,
        explanation:
          'PROJECT_RULES – short Cursor limits. See the PROJECT_RULES.md slide.',
      },
    ],
    footer: s.content.footer,
  };
}

{
  const s = slide(m18, 18.125);
  s.title = 'PACKET ready';
  s.shortTitle = 'PACKET ✓';
  s.subtitle = 'Block A done – next hygiene and proof';
  s.content = {
    title: 'PACKET ready',
    subtitle: 'Next: vibe-debt, smoke, gates, diff, and soft DoD.',
    sectionNumber: 'A→B',
    celebrationText: 'PACKET assembled – next hygiene and proof.',
    recap: {
      heading: 'What you already have',
      lead: 'Build packet – context for the Cursor session.',
      items: [
        'mvp_brief.md (alias 01_MVP_BRIEF.md) – a narrow brief.',
        'user_flow.md + PROJECT_RULES.md + Cursor build prompt.',
        'Plan before code; iteration cycle and error context.',
      ],
    },
    nextSteps: [
      'Code ≠ product – a human checks.',
      'Smoke + critical path; edge and .env.',
      'Launch gates and the diff ritual before commit.',
      'Soft DoD: URL or local proof + GitHub.',
    ],
    footer: s.content.footer,
  };
}

{
  const s = slide(m18, 18.16);
  s.title = 'Smoke and critical path';
  s.shortTitle = 'Smoke';
  s.subtitle = 'Starts + core function';
  s.content = {
    title: 'Smoke – critical path green',
    pathLabel: 'Soft DoD path',
    stepNumber: 1,
    stepTotal: 2,
    body: 'Write and run 3 smoke steps. Mark done when launch, UI/API, and core function are green (1 red = do not go deeper).',
    sections: [
      {
        heading: '1. Launch',
        body: 'Green: app / server starts without error. Red: crash / blank screen.',
      },
      {
        heading: '2. UI or API',
        body: 'Green: main screen / endpoint responds. Red: 404 / empty state with no explanation.',
      },
      {
        heading: '3. Core function',
        body: 'Green: brief-cycle result is visible. Red: function fails or wrong result.',
      },
      {
        heading: 'Critical path',
        body: 'Critical path = brief cycle: trigger → result for the user. 1 red = do not go deeper.',
      },
      {
        heading: 'Check',
        body: 'Do you know what “red” means for your slice?',
      },
    ],
    footer: s.content.footer,
  };
}

{
  const s = slide(m18, 18.23);
  s.title = 'Soft DoD and proof';
  s.shortTitle = 'Soft DoD';
  s.subtitle = 'Proof for a user or locally';
  s.content = {
    title: 'Soft DoD – proof for a user or locally',
    pathLabel: 'Soft DoD path',
    stepNumber: 2,
    stepTotal: 2,
    body: 'Mark done when you have soft DoD proof: GitHub + commits, gitignore, README, PROJECT_RULES, ≥1 critical-fn check, public URL or local proof, 1 fixed issue, rollback thought.',
    sections: [
      {
        heading: 'Soft DoD checklist',
        body: 'GitHub + commits · .gitignore · README · PROJECT_RULES.md · ≥1 critical-fn check · public URL or local proof · 1 fixed issue · rollback thought.',
      },
      {
        heading: 'Do this now',
        body: 'Write your proof (URL or local launch note). The summary has an own-work slot for PACKET context.',
      },
      {
        heading: 'Check',
        body: 'Does vibe coding end with proof – not generation?',
      },
    ],
    footer: s.content.footer,
  };
}

// Fix known LT/AI leak on M18 transfer chrome
for (const mod of [m18]) {
  if (mod.transfer?.abilityBefore?.includes('AI kodą') || mod.transfer?.abilityBefore?.includes('DI kodą')) {
    mod.transfer.abilityBefore =
      'I used to run DI-generated code without a PACKET and proof.';
    mod.transfer.abilityAfter =
      'I have a PACKET and soft DoD proof (URL or local).';
    mod.transfer.firstAction24h =
      'Make 1 commit + 1 smoke / proof on your MVP.';
  }
  const summary = mod.slides.find((s) => s.id === 18.24);
  if (summary?.content) {
    if (
      summary.content.abilityBefore?.includes('AI kodą') ||
      summary.content.abilityBefore?.includes('DI kodą') ||
      summary.content.abilityBefore?.includes('paleisdavau')
    ) {
      summary.content.abilityBefore =
        'I used to run DI-generated code without a PACKET and proof.';
      summary.content.abilityAfter =
        'I have a PACKET and soft DoD proof (URL or local).';
      summary.content.firstAction24h =
        'Make 1 commit + 1 smoke / proof on your MVP.';
    }
    if (summary.content.ownWorkLabel?.includes('Tavo')) {
      summary.content.ownWorkLabel = 'Your PACKET / proof context';
      summary.content.ownWorkPlaceholder =
        'e.g. daily priorities MVP, GitHub URL, or local launch proof…';
      summary.content.ownWorkTemplate =
        'META: You are a vibe-coding discipline partner.\nINPUT: My project / PACKET: {{context}}\nOUTPUT: Give (1) a 3-point soft DoD checklist (URL or local proof), (2) 1 missing PACKET file, (3) 1 concrete next commit/smoke step.';
    }
  }
}

fs.writeFileSync(enPath, JSON.stringify(data, null, 2) + '\n');
console.log('Patched EN ritmas slides');
