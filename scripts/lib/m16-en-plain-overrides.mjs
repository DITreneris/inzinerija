/**
 * Durable EN body overrides for Module 16 learner-plain epic.
 * Applied after mechanical walk in build-en-m16-m18.mjs.
 * Protects 160 / 16.2 hand-tune; replaces LT spill on 16.25–16.22.
 */

export const slide162EnPlain = {
  subtitle: '1 problem · 1 user · 1 feature',
  sections: [
    {
      heading: 'In short',
      body: 'Today: 1 problem, 1 user, 1 main feature, and a quick way to check if the prototype works. The result is not a presentation.',
      blockVariant: 'accent',
    },
    {
      heading: 'Do this now',
      body: 'Pick an idea (e.g. a daily-priorities tool) and write one sentence: who you help and what you solve.\n\nExample: “A manager doesn’t know where to start in the morning → 3 priorities.”\nTemplate: [Who] cannot [do what] when [situation].',
      blockVariant: 'brand',
    },
    {
      heading: 'Check',
      body: 'Can you explain the task in 20 seconds without saying “app”?',
      blockVariant: 'accent',
    },
  ],
};

export const slide1625EnPlain = {
  sections: [
    {
      heading: 'In short',
      body: 'Today you only plan. You will write code in Module 18 with Cursor (an AI coding editor). Leave hosting alone.',
      blockVariant: 'accent',
    },
    {
      heading: 'Stack layers',
      body: 'Not Lovable/Replit as the main path in this course – brief now, code later with Cursor.',
      blockVariant: 'brand',
      table: {
        headers: ['Layer', 'Tool', 'In M16 now', 'Later'],
        rows: [
          ['Brief / plan', 'Chat AI (ChatGPT / Claude)', 'You write the brief and critique', '—'],
          [
            'Code',
            'Cursor',
            'Optional: install; do not generate the whole app',
            'M18 – you will write code',
          ],
          [
            'Proof',
            'GitHub',
            'You will need to show a result (M18)',
            'M18 commit + repo',
          ],
        ],
      },
    },
    {
      heading: 'Do this now',
      body: 'Write down: brief now; Cursor install optional; generate – not today.',
      blockVariant: 'brand',
    },
    {
      heading: 'Check',
      body: 'Are you already putting a tech stack in the brief? (You should not.)',
      blockVariant: 'accent',
    },
  ],
};

/** Full EN content overrides keyed by slide id (numbers). */
export const m16EnSlideOverrides = {
  16.3: {
    shortTitle: 'Process map',
    content: {
      sections: [
        {
          heading: 'In short',
          body: 'We go: problem → person → value → 1 feature → brief → check. Code is Module 18.',
          blockVariant: 'accent',
        },
        {
          heading: 'Six steps to the brief',
          body: 'Six steps to the brief and a check. Tap a step on the diagram.',
          blockVariant: 'brand',
          image: 'm16_delivery_gates',
          imageAlt: 'Path steps: problem, user, value, 1 feature, prototype, test',
        },
        {
          heading: 'Do this now',
          body: 'On the diagram, tap the step you are on now and say its name out loud.',
          blockVariant: 'brand',
        },
        {
          heading: 'Check',
          body: 'Do you know that in this module you finish with a brief, not code?',
          blockVariant: 'accent',
        },
      ],
    },
  },
  16.4: {
    content: {
      sections: [
        {
          heading: 'In short',
          body: 'Bad: “I want an app with AI.” Good: a concrete user problem in a situation with a consequence.',
          blockVariant: 'accent',
        },
        {
          heading: 'Bad vs good start',
          body: 'Start from the person, not the technology.',
          blockVariant: 'brand',
          table: {
            comparisonStyle: true,
            headers: ['Bad', 'Good'],
            rows: [
              [
                '“I want an app with AI”',
                '“A manager spends 20 minutes sorting tasks in the morning and still starts with the wrong one.”',
              ],
              [
                'Focus – stack and features',
                'Focus – situation and consequence (wastes the morning / the team waits)',
              ],
              [
                'Unclear what you will test',
                'Clear what the prototype checks',
              ],
            ],
          },
        },
        {
          heading: 'Do this now',
          body: 'Rewrite your idea: who hurts, when, and what business/personal consequence.',
          blockVariant: 'brand',
        },
        {
          heading: 'Check',
          body: 'Is the sentence about a person, not about technology?',
          blockVariant: 'accent',
        },
      ],
    },
  },
  16.5: {
    content: {
      sections: [
        {
          heading: 'In short',
          body: 'Formula: [User] faces [problem] when [situation], so [consequence]. Payments are not required in this MVP.',
          blockVariant: 'accent',
        },
        {
          heading: 'Filled example',
          body: 'A manager faces priority chaos when the morning starts with email, so they waste 20 minutes and the team waits.',
          blockVariant: 'brand',
        },
        {
          heading: 'Do this now',
          body: 'Fill the template: [User] faces [problem] when [situation], so [consequence].',
          blockVariant: 'brand',
        },
        {
          heading: 'Check',
          body: 'Is the problem frequent? Is the pain clear? Can a prototype check at least one part?',
          blockVariant: 'accent',
        },
      ],
    },
  },
  16.6: {
    content: {
      sections: [
        {
          heading: 'In short',
          body: 'Value = change for the person (e.g. saves 10 min). Feature = action in the product (e.g. ranks 3 tasks).',
          blockVariant: 'accent',
        },
        {
          heading: 'Do this now',
          body: 'Write a pair: value + feature in one sentence each.\n\nExample: value – “knows where to start”; feature – “ranks 3 tasks”.',
          blockVariant: 'brand',
        },
        {
          heading: 'Check',
          body: 'Does the value still make sense if you swapped the tool?',
          blockVariant: 'accent',
        },
      ],
      recognitionExercise: {
        title: 'Spot it: value or feature?',
        task: 'Read 4 phrases and for each choose – **value** or **feature**.',
        examples: [
          'Saves 10 minutes of morning planning.',
          'Ranks 3 daily tasks by priority.',
          'The person knows where to start, without stress.',
          'Sends a reminder at 9:00.',
        ],
        choices: [
          'Value (change for the person)',
          'Feature (action in the product)',
        ],
        correctAnswers: [0, 1, 0, 1],
        explanations: [
          'Change for the person – that is value, not a button.',
          'Ranking – a product action (feature).',
          'Less stress / clarity – value.',
          'Reminder – a feature; value would be “doesn’t forget to start”.',
        ],
        goal: 'Value still makes sense if you swap the tool; a feature is a concrete product action.',
      },
    },
  },
  16.7: {
    subtitle: 'Must now · Can later · Won’t build',
    content: {
      sections: [
        {
          heading: 'In short',
          body: 'Three columns: Must now / Can later / Won’t build. For the first MVP – 1 main feature (+ at most 1–2 helpers).',
          blockVariant: 'accent',
        },
        {
          heading: 'Triage zones',
          body: 'Later in the brief – Must / Should / Won’t (same zones in English).',
          blockVariant: 'brand',
          table: {
            headers: ['Zone', 'What goes here', 'Example'],
            rows: [
              [
                'Must now',
                '1 main feature + at most 1–2 helpers',
                'Rank 3 daily tasks',
              ],
              [
                'Can later',
                'Useful, but does not block the first test',
                'Email reminders',
              ],
              [
                'Won’t build',
                'Too early or too wide for the first MVP',
                'Login (Auth), payments, admin panel',
              ],
            ],
          },
        },
        {
          heading: 'Do this now',
          body: 'Drop 5 of your ideas into the three columns (Must now / Can later / Won’t build).\nExample (daily priorities): Must now – Top 3; Can later – reminder; Won’t build – login, payments, admin.',
          blockVariant: 'brand',
        },
        {
          heading: 'Check',
          body: 'Does “Must now” fit into one short user cycle?',
          blockVariant: 'accent',
        },
      ],
    },
  },
  16.8: {
    content: {
      title: 'Creation card – 5 fields written down',
      pathLabel: 'Creation card',
      body: 'Write in Docs or a notebook. Mark here when all 5 fields are written – that bridges to the brief.',
      sections: [
        {
          heading: 'Example (daily priorities)',
          body: '1. User: a manager who assigns team tasks in the morning.\n2. Problem: spends 20 minutes sorting and still starts with the wrong one.\n3. Value: knows Top 3 in 2 minutes – the team does not wait.\n4. Main feature: rank 3 daily tasks.\n5. How we know it works: in 2 minutes the person sees Top 3.',
        },
        { heading: '1. User', body: 'Who uses it and in what context?' },
        { heading: '2. Problem', body: 'Concrete problem (not “I want an app”).' },
        {
          heading: '3. Value created',
          body: 'What changes for the user – not a feature list.',
        },
        {
          heading: '4. Main feature',
          body: 'One main feature (+ at most 1–2 helpers).',
        },
        {
          heading: '5. How we know it works',
          body: 'A testable success criterion (e.g. “In 2 minutes the person sees Top 3.”).',
        },
        {
          heading: 'Check',
          body: 'Is there really one feature? Is the success criterion testable?',
        },
      ],
    },
  },
  16.85: {
    subtitle: 'Card → brief',
    content: {
      title: 'Card ready',
      subtitle:
        'Next you will sharpen the idea and write the brief (one document). Still not code.',
      sectionNumber: 'Part 1',
      celebrationText:
        'Great! 5 card fields – bridge to the brief. Checklist: user · problem · value · 1 feature · how you know it works.',
      recap: {
        heading: 'What you already know?',
        lead: 'Part one – from problem to card.',
        items: [
          'Problem before solution – a concrete user and consequence.',
          'Value ≠ feature; triage: Must now / Can later / Won’t build.',
          'Creation card: 5 fields as input to the brief.',
          'Checklist: user · problem · value · 1 feature · how you know it works.',
        ],
        itemGlossaryTerms: [
          '',
          'Triage (Must now / Later / Won’t)',
          '',
          '',
        ],
      },
      nextSteps: [
        'Three brief maturity steps (Vibe → Skeleton → Refinement).',
        'Sentence + critique + 3 directions.',
        'Flow and screens.',
        '11-field brief.',
      ],
    },
  },
  16.101: {
    shortTitle: 'Brief phases',
    subtitle: 'Three brief maturity steps',
    content: {
      sections: [
        {
          heading: 'In short',
          body: 'First lock the direction (Vibe – the feel of the idea), then the frame – cycle and bounds (Skeleton), then sharpen the brief (Refinement). This is not a second product path – only brief maturity.',
          blockVariant: 'accent',
        },
        {
          heading: 'Brief maturity steps',
          body: 'Vibe → Skeleton → Refinement. Tap a rung.',
          blockVariant: 'brand',
          image: 'm16_vsr_maturity',
          imageAlt: 'Brief maturity steps: Vibe, Skeleton, Refinement',
        },
        {
          heading: 'Do this now',
          body: 'Say: my idea is now at Vibe / Skeleton / Refinement – and why in one sentence.',
          blockVariant: 'brand',
        },
        {
          heading: 'Check',
          body: 'Do you already have a cycle before polishing the text?',
          blockVariant: 'accent',
        },
      ],
    },
  },
  16.11: {
    content: {
      sections: [
        {
          heading: 'In short',
          body: 'I build [product] that helps [person] solve [problem], giving [result].',
          blockVariant: 'accent',
        },
        {
          heading: 'Bad vs good',
          body: 'Bad: “I build an AI app for priorities.”\nGood: “I build a daily-priorities tool that helps a manager see Top 3 fast, giving clarity in 2 minutes.”',
          blockVariant: 'brand',
        },
        {
          heading: 'Do this now',
          body: 'Fill the formula from your 5 fields.',
          blockVariant: 'brand',
        },
        {
          heading: 'Check',
          body: 'Does the sentence fit on one line?',
          blockVariant: 'accent',
        },
      ],
    },
  },
  16.12: {
    content: {
      sections: [
        {
          heading: 'In short',
          body: 'Three pillars: problem, user, value. Then critique – the sentence should get narrower.',
          blockVariant: 'accent',
        },
        {
          heading: 'Three pillars (from the card)',
          body: '• Problem: morning priority chaos\n• User: manager\n• Value: Top 3 in 2 minutes',
          blockVariant: 'brand',
        },
        {
          heading: 'Before / After',
          body: 'Before: “I build an AI app for priorities for everyone.”\nAfter: “I build a narrow tool for a manager – Top 3 daily priorities in 2 minutes.”',
          blockVariant: 'brand',
        },
        {
          heading: 'Do this now',
          body: 'Run the Skeptic prompt on your idea and write After next to it.',
          blockVariant: 'brand',
        },
        {
          heading: 'Skeptic',
          body: 'Copy and adapt to your context.',
          blockVariant: 'brand',
          copyable:
            'You are a skeptical product consultant. My idea: [briefly].\n1) Find untested assumptions.\n2) Ask at most 5 questions that reduce risk.\n3) Say what is most likely to fail in the first prototype.\nDo not suggest extra features or a tech stack.',
        },
        {
          heading: 'Check',
          body: 'Did the After sentence drop at least one assumption?',
          blockVariant: 'accent',
        },
      ],
      preCopyCheckBlock: {
        question: 'Before copying the Skeptic – what must it not do?',
        options: [
          'Suggest extra features and a tech stack',
          'Add Auth and Stripe as Must',
          'Rewrite the whole product from scratch',
          'Propose 20 new screens',
        ],
        correct: 0,
        explanation:
          'The Skeptic narrows assumptions – it does not add features or stack.',
      },
    },
  },
  16.14: {
    content: {
      sections: [
        {
          heading: 'In short',
          body: 'Three narrow directions for the same problem – not 30 features.',
          blockVariant: 'accent',
        },
        {
          heading: 'Three directions A / B / C',
          body: 'Example (daily priorities). Below – your own A/B/C.',
          blockVariant: 'brand',
          table: {
            headers: ['Direction', 'For whom', 'What it does', 'Result'],
            rows: [
              [
                'A',
                'Busy professional',
                'Shows 3 daily priorities',
                'Knows where to start in 1 minute',
              ],
              [
                'B',
                'Teammate',
                'Shares one priority list',
                'Everyone sees the same “now”',
              ],
              [
                'C',
                'Manager',
                'Measures how many tasks finished',
                'Short daily summary (clarity)',
              ],
            ],
          },
        },
        {
          heading: 'Do this now',
          body: 'Rewrite 3 lines for your idea (for whom / what it does / result).',
          blockVariant: 'brand',
        },
        {
          heading: 'Check',
          body: 'Is each direction still the same problem?',
          blockVariant: 'accent',
        },
      ],
    },
  },
  16.15: {
    content: {
      sections: [
        {
          heading: 'In short',
          body: 'Pick the direction you can validate fastest – not the prettiest. Scores are a guide, not an exam.',
          blockVariant: 'accent',
        },
        {
          heading: 'Direction lab',
          body: 'Pick A, B, or C. After you pick you see scores and can copy why.',
          blockVariant: 'brand',
          image: 'm16_direction_picker',
          imageAlt: 'Direction picker lab: A/B/C, scores, and copyable why',
        },
        {
          heading: 'Guide 1–5 (example)',
          body: 'Three criteria in plain language: (1) Speed to test – can you try it in a day? (2) Clarity – does the user get it without a lecture? (3) Risk – how much complexity (1 = low).',
          blockVariant: 'default',
          collapsible: true,
          table: {
            headers: ['Criterion', 'A', 'B', 'C'],
            rows: [
              ['Speed to test (1–5)', '5', '3', '2'],
              ['Clarity for user (1–5)', '4', '4', '3'],
              ['Risk / complexity (1=low)', '2', '3', '4'],
              ['Sum (guide)', '11', '10', '9'],
            ],
          },
        },
        {
          heading: 'Do this now',
          body: 'Pick A/B/C in the lab. Write the winner next to your card.',
          blockVariant: 'brand',
        },
        {
          heading: 'Check',
          body: 'Is the winner testable in a day, not in a quarter?',
          blockVariant: 'accent',
        },
      ],
    },
  },
  16.16: {
    content: {
      sections: [
        {
          heading: 'In short',
          body: 'Describe how a person goes from need to result – 5 steps. This is not a feature list.',
          blockVariant: 'accent',
        },
        {
          heading: 'User cycle',
          body: 'Trigger → input → action → result → next (with a loop back). Tap a step.',
          blockVariant: 'brand',
          image: 'm16_user_cycle',
          imageAlt: 'User cycle with a return loop',
        },
        {
          heading: 'Filled cycle (daily priorities)',
          body: '1. Trigger: morning, need to know Top 3.\n2. Input: enters 3–5 tasks.\n3. Action: the system ranks them.\n4. Result: sees Top 3.\n5. Next: starts with the first / returns tomorrow.',
          blockVariant: 'brand',
        },
        {
          heading: 'Do this now',
          body: 'Empty template for your winning direction: Trigger → Input → Action → Result → Next.',
          blockVariant: 'brand',
        },
        {
          heading: 'Check',
          body: 'Is “Result” visible to the user in under 2 minutes? (Fast check = lower risk.)',
          blockVariant: 'accent',
        },
      ],
    },
  },
  16.17: {
    content: {
      sections: [
        {
          heading: 'In short',
          body: 'Each screen = a cycle step. Max 3–5 – otherwise the MVP is too wide.',
          blockVariant: 'accent',
        },
        {
          heading: 'Screen ← cycle step',
          body: 'Example (daily priorities) – max 5.',
          blockVariant: 'brand',
          table: {
            headers: ['Screen', 'Cycle step'],
            rows: [
              ['Start / today', 'Trigger'],
              ['Enter 3 tasks', 'Input'],
              ['Rank priorities', 'Action'],
              ['Top 3 list', 'Result'],
              ['Tomorrow reminder (optional)', 'Next'],
            ],
          },
        },
        {
          heading: 'Do this now',
          body: 'List screens from your cycle (≤5).',
          blockVariant: 'brand',
        },
        {
          heading: 'Check',
          body: 'Does each screen have a place in the cycle?',
          blockVariant: 'accent',
        },
      ],
    },
  },
  16.18: {
    content: {
      sections: [
        {
          heading: 'In short',
          body: 'The same three columns in brief language: Must (≤4) = Must now · Should = Later · Won’t = Won’t. “Now” = one short cycle – not a quarterly plan.',
          blockVariant: 'accent',
        },
        {
          heading: 'Must / Should / Won’t and NNL',
          body: 'Example for a daily-priorities tool – rewrite for your idea.',
          blockVariant: 'brand',
          table: {
            headers: ['Zone', 'Example', 'Now → Next → Later'],
            rows: [
              [
                'Must (≤4)',
                'Rank 3 daily tasks',
                'Now: one cycle <2 min',
              ],
              [
                'Should',
                'Morning reminder',
                'Next: after the first quick check (M18)',
              ],
              [
                'Won’t (≥3)',
                'Login, payments (Stripe)',
                'Later / never in this MVP',
              ],
            ],
          },
        },
        {
          heading: 'Do this now',
          body: 'Fill the brief fields: Must (≤4) / Should / Won’t (≥3) and Now→Next→Later.\nExample: Must – Top 3 in under 2 min; Should – reminder after the first check; Won’t – login / payments.',
          blockVariant: 'brand',
        },
        {
          heading: 'Check',
          body: 'Are login/payments Won’t if they do not carry the first cycle?',
          blockVariant: 'accent',
        },
      ],
    },
  },
  16.201: {
    content: {
      sections: [
        {
          heading: 'In short',
          body: 'Three risks + how you will reduce them. Not a wide risk matrix – one line each.',
          blockVariant: 'accent',
        },
        {
          heading: '3 risks',
          body: 'Examples – rewrite for your idea.',
          blockVariant: 'brand',
          table: {
            headers: ['Risk', 'How you reduce it'],
            rows: [
              [
                'Scope too wide',
                'Must ≤4; login/payments → Won’t',
              ],
              [
                'No real data / tasks',
                'Put in 3 sample tasks before the first try',
              ],
              [
                'User does not return',
                'Success criterion <2 min in the first cycle',
              ],
            ],
          },
        },
        {
          heading: 'Do this now',
          body: 'Write 3 of your risks. Template: “Risk → I reduce it by:”',
          blockVariant: 'brand',
        },
        {
          heading: 'Check',
          body: 'Does each risk have one concrete mitigation line?',
          blockVariant: 'accent',
        },
      ],
    },
  },
  16.205: {
    content: {
      questions: [
        {
          id: 'm16-wu-must',
          question:
            'Does “Must now” (Must) fit into ≤4 points in the first MVP brief?',
          options: [
            'Yes – Must ≤4, narrow scope',
            'No – you need ≥10 so you forget nothing',
            'Must is unlimited – write everything',
            'Must is only the tech stack',
          ],
          correct: 0,
          explanation:
            'Narrow brief: Must ≤4. If wrong – go back to “Bounds and Now–Next–Later”.',
        },
        {
          id: 'm16-wu-value',
          question: 'What separates value from a feature?',
          options: [
            'Value = change for the user; feature = action in the product',
            'Value and feature are the same',
            'Value = tech stack; feature = design',
            'Value = how many screens you have',
          ],
          correct: 0,
          explanation:
            'Value = change; feature = how the product acts. See “Value is not a feature”.',
        },
        {
          id: 'm16-wu-cycle',
          question: 'Do you have a 5-step flow (not a feature list)?',
          options: [
            'Yes – trigger → input → action → result → next',
            'A feature list without a flow is enough',
            'A hosting plan is enough',
            'A flow is only needed after GitHub',
          ],
          correct: 0,
          explanation: 'The cycle = UX sequence. See “User cycle”.',
        },
      ],
    },
  },
  16.21: {
    content: {
      sections: [
        {
          heading: 'In short',
          body: 'A brief is one document before code. Below are 11 fields. Stack and ERD are not here. You will use the same document in the Module 18 project.',
          blockVariant: 'accent',
        },
        {
          heading: '11 brief fields',
          body: '1. Product sentence\n2. Problem\n3. Target user\n4. Value promise\n5. Main user cycle\n6. MVP bounds (Must / Should / Won’t)\n7. Main screens (≤5)\n8. Data (high-level; detailed model – M18)\n9. Now → Next → Later\n10. 3 risks\n11. Success criterion',
          blockVariant: 'brand',
        },
        {
          heading: 'Do this now',
          body: 'Create a Docs file `01_MVP_BRIEF.md` (or a notebook page). Fill all 11. If stuck – use the Brief helper.',
          blockVariant: 'brand',
        },
        {
          heading: 'Brief helper',
          body: 'Copy and adapt to your context.',
          blockVariant: 'brand',
          copyable:
            'Help me write a narrow MVP brief in English.\nContext: [card / idea].\nRules: Must ≤4; Won’t ≥3; at most 3 gap questions; no tech stack (stack comes later).\nReturn 11 fields:\n1) product sentence\n2) problem\n3) user\n4) value\n5) cycle\n6) Must/Should/Won’t\n7) screens ≤5\n8) data (high-level)\n9) Now→Next→Later\n10) 3 risks\n11) success criterion.',
        },
        {
          heading: 'Check',
          body: 'Must≤4? Won’t≥3? Success criterion testable in under 2 minutes?',
          blockVariant: 'accent',
        },
      ],
      briefCheckBlock: {
        question:
          'Which brief field is missing if you cannot say whether the MVP “works” in under 2 minutes?',
        options: [
          'Success criterion (testable)',
          'Tech stack and hosting',
          'Q2–Q4 roadmap',
          'Design system colors',
        ],
        correct: 0,
        explanation:
          'Without a testable success criterion the brief stays an idea. Stack and roadmap come later.',
      },
      preCopyCheckBlock: {
        question: 'Before copying the Brief helper – what is required in an MVP brief?',
        options: [
          'Must ≤4, Won’t ≥3, a testable success criterion',
          'At least 10 screens and a full ERD',
          'Auth + payments as Must',
          'Only a product sentence with no bounds',
        ],
        correct: 0,
        explanation:
          'Narrow brief: Must/Won’t and a success criterion. Auth/payments are usually Won’t for the first MVP.',
      },
    },
  },
  16.22: {
    content: {
      introHeading: 'What you learned',
      introBody:
        'From a vague idea to a narrow brief with bounds and a check – before any generation.',
      stats: [
        { label: '5 fields', value: '5' },
        { label: '11 brief fields', value: '11' },
        { label: 'Before code', value: '✓' },
      ],
      sections: [
        {
          heading: 'Problem before solution',
          icon: 'Target',
          color: 'brand',
          items: ['Formula and card', 'Value ≠ feature'],
        },
        {
          heading: 'Triage',
          icon: 'Layers',
          color: 'violet',
          items: ['Must now / Later / Won’t', 'Bounds: what we do / don’t'],
        },
        {
          heading: 'Cycle and screens',
          icon: 'Workflow',
          color: 'emerald',
          items: ['5-step cycle', '≤5 screens'],
        },
        {
          heading: 'Brief',
          icon: 'Zap',
          color: 'amber',
          items: ['01_MVP_BRIEF.md', '11 required fields'],
        },
        {
          heading: 'Critique',
          icon: 'Sparkles',
          color: 'rose',
          items: ['Skeptic', '3 risks'],
        },
      ],
      tagline: 'Discipline starts with the brief – not with generation.',
      nextStepCTA: 'Go to Module 17: Knowledge check (Code path)',
      abilityBefore: 'I treated the idea as “need an app” with no bounds.',
      abilityAfter: 'I can fill an MVP brief with Must/Won’t and a user cycle.',
      firstAction24h: 'Finish 01_MVP_BRIEF.md for one narrow idea today.',
      footer: 'Next – Module 17: Knowledge check',
    },
  },
};

export function applyM16EnPlainOverrides(mod) {
  if (mod.id !== 16) return;

  mod.businessExamples = [
    {
      title: 'Narrow task / brief',
      description: 'Narrow task with Must/Won’t',
    },
    {
      title: 'User cycle',
      description: 'Trigger → result in under 2 min',
    },
  ];

  const today = mod.slides.find((s) => s.id === 16.2);
  if (today) {
    today.subtitle = slide162EnPlain.subtitle;
    if (today.content) today.content.sections = slide162EnPlain.sections;
  }

  const stack = mod.slides.find((s) => s.id === 16.25);
  if (stack?.content) {
    stack.content.sections = slide1625EnPlain.sections;
  }

  for (const [idKey, override] of Object.entries(m16EnSlideOverrides)) {
    const id = Number(idKey);
    const s = mod.slides.find((x) => x.id === id);
    if (!s) continue;
    if (override.subtitle) s.subtitle = override.subtitle;
    if (override.shortTitle) s.shortTitle = override.shortTitle;
    if (override.content && s.content) {
      Object.assign(s.content, override.content);
    }
  }
}
