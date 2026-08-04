/**
 * Durable EN overrides for Module 17 Path Test plain epic.
 */

export function applyM17EnPlainOverrides(mod) {
  if (mod.id !== 17) return;

  mod.title = 'Knowledge check (Code path)';
  mod.subtitle = 'Quiz: brief and planning quality';
  mod.description =
    'Check that your brief is narrow and testable. ≥70% recommended before Module 18.';
  mod.duration = '12–15 min';
  mod.businessExamples = [
    { title: 'Brief quality', description: 'Narrow and testable' },
    { title: 'Triage', description: 'Must vs Won’t before Cursor' },
  ];
  mod.transfer = {
    abilityBefore:
      'You checked brief quality by gut feel, without clear Must/Won’t gates.',
    abilityAfter:
      'You can check that a brief is narrow and testable before a Cursor project.',
    firstAction24h:
      'Within 24–48h, fix one weak brief spot and go to Module 18 with Must ≤4.',
    nextStepCTA:
      'Go to Module 18 – BUILD PACKET (file pack) and soft DoD (lightweight proof).',
  };

  const byId = Object.fromEntries(mod.slides.map((s) => [s.id, s]));

  Object.assign(byId[170], {
    title: 'Module 17 quiz',
    subtitle: 'Brief and planning knowledge – not code',
    content: {
      whyBenefit:
        'After the quiz you will know whether your brief is narrow and testable enough before a Cursor project.',
      duration: '~12–15 min',
      firstActionCTA:
        'Answer questions about the brief and planning – not about code or deploy.',
      microWinPhrase:
        'Each correct answer shows you can narrow the task before generation.',
      thresholds: { pass: 70, fail: 0 },
      thresholdExplanation:
        'When you reach ≥70%, you can move to Module 18 (project). If less – review Module 16 brief and triage slides.',
      footer: 'Next – slide 2: Ready check',
    },
  });

  Object.assign(byId[170.5], {
    title: 'Ready check before the quiz',
    shortTitle: 'Ready check',
    subtitle: '3 questions: 1+1+1, value, path to M18',
    content: {
      questions: [
        {
          id: 'm17-warm-1',
          question: 'What is the best 1+1+1 start for an MVP task?',
          options: [
            'User + problem + 1 main feature (and a success criterion)',
            'A list of 10 features + stack choice',
            '“Build an app with AI” with no user',
            'Auth and Stripe right away',
          ],
          correct: 0,
          explanation:
            'A narrow start = person, problem, one feature. Stack and payments come later.',
        },
        {
          id: 'm17-warm-2',
          question: 'Which statement is value, not a feature?',
          options: [
            'Saves 10 minutes in the morning lining up priorities',
            'Has a drag-and-drop board',
            'Connects to 5 APIs',
            'Uses Redis cache',
          ],
          correct: 0,
          explanation: 'Value = change for the person. The rest are features or infra.',
        },
        {
          id: 'm17-warm-3',
          question: 'After the quiz, what will you do first in Module 18?',
          options: [
            'Assemble a BUILD PACKET (file pack before AI code: brief, flow, rules, Cursor prompt) – not “build the whole app”',
            'Ask AI to write the whole system with no PACKET',
            'Skip the brief and jump to multi-agent setup',
            'Start with a Heroku blue-green course',
          ],
          correct: 0,
          explanation:
            'M18 axis: brief → PACKET (file pack) → Cursor slice → proof. Not chaotic generate.',
        },
      ],
      footer: 'Next – slide 3: Questions',
    },
  });

  byId[171].title = 'Questions';
  byId[171].subtitle = 'Planning and brief quality';
  byId[171].content = { footer: 'Next – slide 4: Results' };
  byId[171].testQuestions = [
    {
      id: 'm17-q1',
      type: 'mcq',
      question: 'Which start is bad?',
      options: [
        '“I want an app with AI”',
        'A concrete user problem with a situation',
        '1 user + 1 problem',
        'Value in one sentence',
      ],
      correct: 0,
      explanation: 'Without a problem – only a technology wish.',
      relatedSlideId: 16.4,
    },
    {
      id: 'm17-q2',
      type: 'mcq',
      question: '“Ranks 3 tasks” – what is that?',
      options: ['Value', 'Feature', 'Risk', 'Won’t'],
      correct: 1,
      explanation:
        'That is a product action = feature. Value would be a time / stress change.',
      relatedSlideId: 16.6,
    },
    {
      id: 'm17-q3',
      type: 'mcq',
      question: 'Auth and Stripe in the first MVP triage – where?',
      options: [
        'Must now',
        'Can later or Won’t (Won’t for the first cycle)',
        'Must always',
        'Ignore triage',
      ],
      correct: 1,
      explanation: 'Payments/auth are rarely required for the first narrow cycle.',
      relatedSlideId: 16.18,
    },
    {
      id: 'm17-q4',
      type: 'ordering',
      question:
        'Order the brief maturity phases Vibe → Skeleton → Refinement (first to last):',
      items: ['Skeleton', 'Refinement', 'Vibe'],
      correctOrder: ['Vibe', 'Skeleton', 'Refinement'],
      explanation:
        'Vibe (feel of the idea) → Skeleton (cycle + bounds) → Refinement (sharpening).',
      relatedSlideId: 16.101,
    },
    {
      id: 'm17-q5',
      type: 'mcq',
      question: 'What is usually missing in a weak brief?',
      options: [
        'Must/Won’t and a success criterion',
        'Only a logo file',
        'Heroku pipeline',
        '80% coverage',
      ],
      correct: 0,
      explanation: 'Bounds and a testable Done – the brief core.',
      relatedSlideId: 16.21,
    },
    {
      id: 'm17-q6',
      type: 'mcq',
      question: 'What better describes UX?',
      options: [
        'Trigger→Input→Action→Result→Next',
        'A 20-feature bullet list',
        'Only an ERD',
        'Only a stack table',
      ],
      correct: 0,
      explanation: 'The cycle describes the user experience.',
      relatedSlideId: 16.16,
    },
    {
      id: 'm17-q7',
      type: 'mcq',
      question: 'What is “too early” before a narrow MVP?',
      options: [
        'Redis + AWS + 10 screens + Auth',
        '1 cycle and ≤5 screens',
        '3 risks',
        'Must ≤4',
      ],
      correct: 0,
      explanation: 'Infra and width without a first cycle – too early.',
      relatedSlideId: 16.18,
    },
    {
      id: 'm17-q8',
      type: 'mcq',
      question: 'What should you give Cursor before generate?',
      options: [
        'PACKET (file pack) / rules / a vertical slice – context before generate',
        'Only “build an app”',
        'Only a meme',
        'Only a pricing joke',
      ],
      correct: 0,
      explanation: 'Context and bounds before generation.',
      relatedSlideId: 16.21,
    },
    {
      id: 'm17-q9',
      type: 'mcq',
      question: 'What is a good success criterion in an MVP brief?',
      options: [
        'In 2 minutes you can check that the main feature works for the user',
        '“It will be modern” with no measure',
        '10 screens and Auth as the first step',
        '80% coverage before the first run',
      ],
      correct: 0,
      explanation: 'Success criterion = quickly testable Done, not fashion or infra.',
      relatedSlideId: 16.21,
    },
    {
      id: 'm17-q10',
      type: 'mcq',
      question: 'MCP servers in the brief phase?',
      options: [
        'Too early for the core – not required',
        'Always required',
        'The only path',
        'They replace Must/Won’t',
      ],
      correct: 0,
      explanation: 'MCP/Spec Kit – not a required path in this course.',
      relatedSlideId: 16.18,
    },
    {
      id: 'm17-q11',
      type: 'mcq',
      question: 'After an AI change – when do you read the diff?',
      options: [
        'Before commit: read the diff, then a quick check (smoke), then commit',
        'Commit + push immediately without reading',
        'Only after a deploy URL',
        'Not needed if the UI “looks fine”',
      ],
      correct: 0,
      explanation:
        'Diff ritual: status → diff → quick check (smoke) → commit → push. Details in Module 18.',
      relatedSlideId: 18.201,
    },
  ];

  Object.assign(byId[172], {
    title: 'Results',
    subtitle: 'Is the brief ready for Module 18?',
    content: {
      passedMessage:
        'Well done! Your brief looks narrow enough – you can go to the Module 18 project.',
      failedMessage:
        'Worth revisiting Module 16: the 5-field card, triage (Must now / Can later / Won’t), the user cycle, and 01_MVP_BRIEF.md.',
      thresholdExplanation:
        'When you reach ≥70%, you can move to Module 18. If less – review brief bounds, Value ≠ feature, and Vibe → Skeleton → Refinement.',
      useCaseBlock: {
        heading: 'Next step: Module 18',
        body: 'If ≥70% – go to the project: assemble a BUILD PACKET (file pack before AI code), make one Cursor slice, and collect a soft DoD (lightweight proof – Module 18). If less – return to the card and brief in Module 16.',
        blockVariant: 'accent',
      },
      reflectionTitle: 'Reflection prompt',
      reflectionPrompt:
        'META: You are a learning reflection assistant. Goal – lock in brief planning knowledge.\nINPUT: I just finished the Module 17 quiz – brief narrowness, triage, cycle, and success criterion.\nOUTPUT: Ask 3 questions: (1) Which brief field will I strengthen in 24h? (2) What was newest? (3) What is my first M18 PACKET step? After my answers give 1 concrete tip.',
      footer: 'Next – slide 5: Bonus: brief checklist',
    },
  });

  Object.assign(byId[173], {
    title: 'Bonus: brief checklist in 5 min',
    subtitle: 'Optional before Module 18',
    shortTitle: 'Bonus checklist',
    content: {
      sections: [
        {
          heading: 'In short',
          body: 'Check the brief before the PACKET (file pack before AI code) – 5 quick points.',
          blockVariant: 'accent',
        },
        {
          heading: 'Brief checklist',
          body: 'Mark green / red on your 01_MVP_BRIEF.md.',
          blockVariant: 'brand',
          table: {
            headers: ['Point', 'Green if'],
            rows: [
              ['Product sentence', 'Fits on 1 line'],
              ['Must ≤4', 'Narrow scope'],
              ['Won’t ≥3', 'Consciously cut'],
              ['Cycle + ≤5 screens', 'UX, not a feature list'],
              ['Success criterion', 'Testable in under 2 min'],
            ],
          },
        },
        {
          heading: 'Do this now',
          body: 'Mark green/red for each point on your brief.',
          blockVariant: 'brand',
        },
        {
          heading: 'Check',
          body: 'Can you start a PACKET (brief + flow + rules) without “build the whole app”?',
          blockVariant: 'accent',
        },
      ],
      footer: 'Next – Module 18: Final project',
    },
  });
}
