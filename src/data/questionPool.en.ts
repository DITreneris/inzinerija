/**
 * Module 2 question pool – English (for locale 'en').
 * Same structure as questionPool.ts; used by questionPoolSelector when locale === 'en'.
 */
import type { TestQuestion } from '../types/modules';

export const QUESTION_POOL_EN: TestQuestion[] = [
  // ═══════════════════════════════════════════
  // META (4 questions)
  // ═══════════════════════════════════════════
  {
    id: 'pool-meta-1',
    type: 'mcq',
    question: "What's the best place to start a prompt?",
    options: ['With role and goal (Meta)', 'With output format (Output)', 'With data (Input)', 'With parameters (Advanced)'],
    correct: 0,
    explanation: 'The Meta block is the most important – it sets the context for the rest of the prompt.',
    hint: "Think about what sets the 'who I am' and 'why I'm writing' context.",
    bloomLevel: 1, relatedSlideId: 8, category: 'meta',
  },
  {
    id: 'pool-meta-2',
    type: 'true-false',
    question: "The Meta block only defines the AI's role – audience and experience are in other blocks.",
    isTrue: false,
    explanation: 'The Meta block covers everything: WHO you are (role), WHAT experience, and WHO the result is for (audience).',
    hint: 'Remember: Meta = role + experience + target audience.',
    bloomLevel: 2, relatedSlideId: 8, category: 'meta',
  },
  {
    id: 'pool-meta-3',
    type: 'mcq',
    question: 'What should the Meta block include?',
    options: ['Role, experience, target audience', 'Only numbers and data', 'Only the result format', 'Only quality criteria'],
    correct: 0,
    explanation: 'The Meta block defines WHO you are, WHAT experience you have, and WHO the result is for.',
    hint: 'Meta = who I am, what I know, who I write for.',
    bloomLevel: 1, relatedSlideId: 8, category: 'meta',
  },
  {
    id: 'pool-meta-4',
    type: 'true-false',
    question: 'If the Meta block specifies the role "senior analyst", the AI response will be more expert-level than if you just say "assistant".',
    isTrue: true,
    explanation: "Correct! AI adapts its answer level to the specified role. Expert role = more detailed, deeper answer.",
    hint: "Think: does the answer differ when you ask an expert vs a beginner?",
    bloomLevel: 3, relatedSlideId: 8, category: 'meta',
  },

  // ═══════════════════════════════════════════
  // INPUT (4 questions)
  // ═══════════════════════════════════════════
  {
    id: 'pool-input-1',
    type: 'mcq',
    question: 'What is concrete input?',
    options: ['Exact numbers, dates, metrics', 'General mood', 'Only questions', 'Only desired tone'],
    correct: 0,
    explanation: 'Concrete input = concrete data: 250k EUR, +15%, 1200 orders.',
    hint: 'Input is facts, numbers, and data – not mood or questions.',
    bloomLevel: 1, relatedSlideId: 9, category: 'input',
  },
  {
    id: 'pool-input-2',
    type: 'mcq',
    question: 'Which of these is a good Input block example?',
    options: [
      'Revenue: 250k EUR, growth: +15%, orders: 1200',
      'I would like more data',
      'Data is important',
      'Write about sales',
    ],
    correct: 0,
    explanation: 'Good Input = concrete numbers and metrics, not abstract phrases.',
    hint: 'The Input block requires concrete facts – numbers, dates, metrics.',
    bloomLevel: 2, relatedSlideId: 9, category: 'input',
  },
  {
    id: 'pool-input-3',
    type: 'true-false',
    question: 'The Input block can be left empty if AI has enough general knowledge about the topic.',
    isTrue: false,
    explanation: "Wrong. Without concrete Input, AI will generate generic text without your context. Always provide specific data.",
    hint: "Think: does AI know your sales numbers without Input?",
    bloomLevel: 3, relatedSlideId: 9, category: 'input',
  },
  {
    id: 'pool-input-4',
    type: 'mcq',
    question: 'Which element does NOT belong in the Input block?',
    options: ['Result format (table, list)', 'Sales numbers', 'Customer feedback', 'Budget data'],
    correct: 0,
    explanation: 'Result format (table, list, language) belongs in the Output block, not Input.',
    hint: 'Input = data. Which of these is a format, not data?',
    bloomLevel: 2, relatedSlideId: 9, category: 'input',
  },

  // ═══════════════════════════════════════════
  // OUTPUT (4 questions)
  // ═══════════════════════════════════════════
  {
    id: 'pool-output-1',
    type: 'mcq',
    question: 'You want a 5-point list in English. Which block should you specify?',
    options: ['Output', 'Meta', 'Input', 'Quality Control'],
    correct: 0,
    explanation: "Format (list, 5 points, language) is the Output block's job.",
    hint: "Which block sets the result's format and structure?",
    bloomLevel: 2, relatedSlideId: 10, category: 'output',
  },
  {
    id: 'pool-output-2',
    type: 'mcq',
    question: 'What is the Output block for?',
    options: ['To specify the result format and structure', 'To set the AI role', 'To provide initial data', 'To check for errors'],
    correct: 0,
    explanation: 'The Output block specifies the EXACT format: table, 5 columns, English language.',
    hint: 'Output = WHAT you want (format, structure, language).',
    bloomLevel: 1, relatedSlideId: 10, category: 'output',
  },
  {
    id: 'pool-output-3',
    type: 'true-false',
    question: "In the Output block, specifying only the language is enough – AI will decide the format itself.",
    isTrue: false,
    explanation: "Wrong. Without specifying the format (table, list, report), AI will choose its own format, which may not fit your needs.",
    hint: "Do you want AI to decide what the result format should be?",
    bloomLevel: 3, relatedSlideId: 10, category: 'output',
  },
  {
    id: 'pool-output-4',
    type: 'mcq',
    question: 'Which of these is a good Output block example?',
    options: [
      'Format: table, 5 columns, in English, up to 500 words',
      'Write something good',
      'I want a good result',
      'Answer briefly',
    ],
    correct: 0,
    explanation: 'Good Output defines the format (table), structure (5 columns), language (English), and length (500 words).',
    hint: 'Good Output = specific format + structure + language + length.',
    bloomLevel: 2, relatedSlideId: 10, category: 'output',
  },

  // ═══════════════════════════════════════════
  // REASONING (4 questions)
  // ═══════════════════════════════════════════
  {
    id: 'pool-reasoning-1',
    type: 'mcq',
    question: 'What is the Reasoning block for?',
    options: ['To specify how AI should think before answering', 'Only to add style', 'Only to change language', 'Only to shorten text'],
    correct: 0,
    explanation: 'The Reasoning block specifies the THOUGHT SEQUENCE: 1) Analyse 2) Compare 3) Recommend.',
    hint: 'Reasoning = thought sequence. Think about steps before the answer.',
    bloomLevel: 1, relatedSlideId: 11, category: 'reasoning',
  },
  {
    id: 'pool-reasoning-2',
    type: 'true-false',
    question: 'The Reasoning block is only needed for complex questions – for simple ones Meta + Input + Output is enough.',
    isTrue: true,
    explanation: 'Correct! Minimal prompt = Meta + Input + Output (3 blocks). Add Reasoning when you need more complex thinking.',
    hint: "Think: does a simple 'Translate this sentence' need a reasoning sequence?",
    bloomLevel: 4, relatedSlideId: 11, category: 'reasoning',
  },
  {
    id: 'pool-reasoning-3',
    type: 'mcq',
    question: 'Which of these is a good Reasoning block example?',
    options: [
      '1) Analyse data 2) Compare periods 3) Find trends 4) Recommend actions',
      'Think well',
      'Write thoroughly',
      'Use logic',
    ],
    correct: 0,
    explanation: 'Good Reasoning = a clear thought sequence with numbered steps.',
    hint: 'Reasoning = numbered sequence: analyse, compare, recommend.',
    bloomLevel: 2, relatedSlideId: 11, category: 'reasoning',
  },
  {
    id: 'pool-reasoning-4',
    type: 'mcq',
    question: "Which technique best represents the Reasoning block's principle?",
    options: ['Chain-of-thought', 'Few-shot', 'Zero-shot', 'Copy-paste'],
    correct: 0,
    explanation: "Chain-of-thought tells AI to think step by step – that's the essence of the Reasoning block.",
    hint: 'Which technique encourages step-by-step thinking?',
    bloomLevel: 3, relatedSlideId: 11, category: 'reasoning',
  },

  // ═══════════════════════════════════════════
  // QUALITY (4 questions)
  // ═══════════════════════════════════════════
  {
    id: 'pool-quality-1',
    type: 'mcq',
    question: 'What is the Quality Control block for?',
    options: ['To set quality criteria before providing the answer', 'Only to add style', 'Only to change language', 'Only to shorten text'],
    correct: 0,
    explanation: "Quality Control = check criteria: Is it logical? Is it complete? Are facts accurate?",
    hint: 'Quality = check yourself before answering.',
    bloomLevel: 1, relatedSlideId: 12, category: 'quality',
  },
  {
    id: 'pool-quality-2',
    type: 'true-false',
    question: 'The Quality Control block only checks the result after AI has already generated the answer.',
    isTrue: false,
    explanation: "We set Quality Control criteria BEFORE generation – it's an instruction to AI to 'check yourself'.",
    hint: 'Think: is Quality Control an instruction to AI, or an action after the result?',
    bloomLevel: 4, relatedSlideId: 12, category: 'quality',
  },
  {
    id: 'pool-quality-3',
    type: 'mcq',
    question: 'Which Quality Control criterion helps avoid hallucinations?',
    options: [
      "If you don't know – say 'I don't know', don't make things up",
      'Write longer',
      'Use more emotions',
      'Add more examples',
    ],
    correct: 0,
    explanation: "The 'I don't know' rule is one of the most effective ways to reduce hallucinations.",
    hint: "What happens when AI tries to answer a question it doesn't know the answer to?",
    bloomLevel: 3, relatedSlideId: 12, category: 'quality',
  },
  {
    id: 'pool-quality-4',
    type: 'true-false',
    question: 'The Quality Control block is optional and can be omitted from any prompt.',
    isTrue: true,
    explanation: "Correct – Quality is an 'extra' block. Minimal prompt = Meta + Input + Output. However, Quality is highly recommended for complex prompts.",
    hint: 'Remember: which 3 blocks are the "minimum requirement"?',
    bloomLevel: 2, relatedSlideId: 12, category: 'quality',
  },

  // ═══════════════════════════════════════════
  // ADVANCED (4 questions)
  // ═══════════════════════════════════════════
  {
    id: 'pool-advanced-1',
    type: 'mcq',
    question: "You want a more creative answer. What's best to change?",
    options: ['Temperature (increase it)', 'Amount of Input', 'Language setting', 'Amount of Quality Control'],
    correct: 0,
    explanation: 'Temperature 0.8–1.0 = more creative. Temperature 0.1–0.3 = more precise, factual.',
    hint: 'Which parameter controls creativity vs precision?',
    bloomLevel: 2, relatedSlideId: 13, category: 'advanced',
  },
  {
    id: 'pool-advanced-2',
    type: 'true-false',
    question: 'Temperature 0.1 means a very creative and unexpected AI answer.',
    isTrue: false,
    explanation: 'Wrong. Temperature 0.1 = very precise, factual, predictable. Temperature 0.9 = creative, varied.',
    hint: 'Low temperature = low "creativity" level.',
    bloomLevel: 2, relatedSlideId: 13, category: 'advanced',
  },
  {
    id: 'pool-advanced-3',
    type: 'mcq',
    question: 'What is the max_tokens parameter used for?',
    options: ['To limit the answer length', 'To set the language', 'To change the role', 'To add data'],
    correct: 0,
    explanation: "max_tokens limits the AI answer length in words/tokens. Useful when you need a short answer.",
    hint: 'Token ≈ word. Max tokens = maximum word count.',
    bloomLevel: 1, relatedSlideId: 13, category: 'advanced',
  },
  {
    id: 'pool-advanced-4',
    type: 'mcq',
    question: 'Which two parameters are most commonly used in the Advanced block?',
    options: ['Temperature and max_tokens', 'Language and format', 'Role and audience', 'Data and metrics'],
    correct: 0,
    explanation: 'Temperature (creativity) and max_tokens (length) – the two main Advanced block parameters.',
    hint: 'The Advanced block = technical settings. What are the two main ones?',
    bloomLevel: 1, relatedSlideId: 13, category: 'advanced',
  },

  // ═══════════════════════════════════════════
  // OVERALL SYSTEM (4 questions)
  // ═══════════════════════════════════════════
  {
    id: 'pool-bendra-1',
    type: 'mcq',
    question: 'How many blocks does a full structured prompt have?',
    options: ['3', '4', '5', '6'],
    correct: 3,
    explanation: '6 blocks: Meta, Input, Output, Reasoning, Quality, Advanced.',
    hint: 'Remember: M-I-O-R-Q-A system.',
    bloomLevel: 1, relatedSlideId: 14, category: 'bendra',
  },
  {
    id: 'pool-bendra-2',
    type: 'mcq',
    question: 'What is the minimum prompt for a clear result?',
    options: ['Meta + Input + Output', 'Only Output', 'Only Meta', 'Reasoning + Quality'],
    correct: 0,
    explanation: 'Minimum = 3 blocks: WHO you are (Meta) + WHAT you have (Input) + WHAT you want (Output).',
    hint: 'Which 3 blocks are the "minimum requirement"?',
    bloomLevel: 2, relatedSlideId: 14, category: 'bendra',
  },
  {
    id: 'pool-bendra-3',
    type: 'matching',
    question: 'Match each block to its main function:',
    matchPairs: [
      { left: 'Meta', right: 'Role, experience, audience' },
      { left: 'Input', right: 'Concrete data and facts' },
      { left: 'Output', right: 'Result format and structure' },
      { left: 'Reasoning', right: 'Thought sequence and logic' },
      { left: 'Quality', right: 'Quality check criteria' },
      { left: 'Advanced', right: 'Technical parameters (temperature)' },
    ],
    explanation: 'Each of the 6 blocks has a clear responsibility. When all work together – the result is predictable.',
    hint: 'Which block answers: who am I, what I have, what I want, how to think, is it good, what settings?',
    bloomLevel: 2, relatedSlideId: 14, category: 'bendra',
  },
  {
    id: 'pool-bendra-4',
    type: 'ordering',
    question: 'Order the 6 blocks from most to least important (by priority):',
    correctOrder: [
      'Meta (role and context)',
      'Input (data)',
      'Output (format)',
      'Reasoning (reasoning logic)',
      'Quality (quality criteria)',
      'Advanced (parameters)',
    ],
    items: [
      'Quality (quality criteria)',
      'Advanced (parameters)',
      'Meta (role and context)',
      'Output (format)',
      'Input (data)',
      'Reasoning (reasoning logic)',
    ],
    explanation: 'Meta, Input, Output – required (top 3). Reasoning, Quality, Advanced – optional.',
    hint: 'The first three blocks are the minimum requirement for a clear result.',
    bloomLevel: 3, relatedSlideId: 14, category: 'bendra',
  },

  // ═══════════════════════════════════════════
  // WORKFLOW (3 questions)
  // ═══════════════════════════════════════════
  {
    id: 'pool-workflow-1',
    type: 'mcq',
    question: 'How does basic chat differ from workflow?',
    options: ['Workflow has a clear format and result', 'Basic always has a dataset', 'Workflow is only for creativity', 'Basic always uses a template'],
    correct: 0,
    explanation: 'Workflow defines format, requirements, and expected result.',
    hint: 'Workflow = structured process with a clear end result.',
    bloomLevel: 2, relatedSlideId: 3, category: 'workflow',
  },
  {
    id: 'pool-workflow-2',
    type: 'true-false',
    question: 'Workflow is the same as a basic chat with AI – just longer.',
    isTrue: false,
    explanation: 'Wrong. Workflow has a clear structure, stages, and expected result. Chat = free form.',
    hint: 'Does a chat have a clear plan and expected format?',
    bloomLevel: 2, relatedSlideId: 3, category: 'workflow',
  },
  {
    id: 'pool-workflow-3',
    type: 'mcq',
    question: 'Which of these is a workflow example?',
    options: [
      'Brief > Structure > Content > Formatting > Review',
      'Write me something',
      'Repeat the last answer',
      'Help with homework',
    ],
    correct: 0,
    explanation: 'Workflow = a clear sequence with stages (brief, structure, content, formatting, review).',
    hint: 'Workflow always has a clear step-by-step plan.',
    bloomLevel: 2, relatedSlideId: 3, category: 'workflow',
  },

  // ═══════════════════════════════════════════
  // TECHNIQUES (3 questions)
  // ═══════════════════════════════════════════
  {
    id: 'pool-technikos-1',
    type: 'mcq',
    question: 'Which technique relies on examples?',
    options: ['Few-shot', 'Zero-shot', 'Chain-of-thought', 'Prompt chain'],
    correct: 0,
    explanation: 'Few-shot gives 1–2 examples, then asks for new ones. Zero-shot – no examples.',
    hint: "'Few' means 'a few' – a technique that uses several examples.",
    bloomLevel: 1, relatedSlideId: 5, category: 'technikos',
  },
  {
    id: 'pool-technikos-2',
    type: 'mcq',
    question: 'What does the Zero-shot technique mean?',
    options: [
      'AI performs the task without any examples',
      'AI uses 0 blocks',
      'AI does not answer',
      'AI uses only the Meta block',
    ],
    correct: 0,
    explanation: 'Zero-shot = AI performs the task without any given examples, relying only on the instruction.',
    hint: 'Zero = none, shot = attempt/example. Zero-shot = no examples.',
    bloomLevel: 1, relatedSlideId: 5, category: 'technikos',
  },
  {
    id: 'pool-technikos-3',
    type: 'true-false',
    question: 'Prompt chaining means one very long prompt in a single message.',
    isTrue: false,
    explanation: "Wrong. Prompt chaining = a chain of separate prompts, where each one's result is used in the next.",
    hint: 'Chaining = chain. Is a chain one long element?',
    bloomLevel: 2, relatedSlideId: 5, category: 'technikos',
  },

  // ═══════════════════════════════════════════
  // SCENARIOS (4 questions)
  // ═══════════════════════════════════════════
  {
    id: 'pool-scenario-1',
    type: 'scenario',
    scenarioContext: "You're a marketing lead. You're writing a prompt to AI to generate a quarterly sales report for the board. You have: 250k EUR revenue, 1200 orders, +15% growth. The prompt starts: 'You are a senior business analyst...' and ends: 'Present the result in a table with 5 columns.'",
    question: 'Which block is missing from this prompt?',
    options: [
      'Reasoning – how to analyse the data is not specified',
      'Meta – role not specified',
      'Input – no data',
      'Output – format not specified',
    ],
    correct: 0,
    explanation: "The prompt has Meta (role), Input (data), and Output (table), but no Reasoning – how should AI analyse the data.",
    hint: "Compare: what's already there (role, data, format) and what's missing from the 6 blocks.",
    bloomLevel: 4, relatedSlideId: 11, category: 'reasoning',
  },
  {
    id: 'pool-scenario-2',
    type: 'scenario',
    scenarioContext: "A colleague wrote the prompt: 'Write me an article about AI.' The result – 3 pages of generic text, no structure, no sources, in English (though they wanted another language).",
    question: 'What would improve this prompt the most?',
    options: [
      'Add Meta (role: journalist), Output (1000 words, target language, with sources), and Quality (factual accuracy)',
      "Add only 'write in [language]'",
      'Repeat the same prompt again',
      'Switch to another AI model',
    ],
    correct: 0,
    explanation: 'Bad result = unstructured prompt. Adding Meta, Output, and Quality makes the result predictable.',
    hint: 'Think: how many 6-block elements are missing from this prompt?',
    bloomLevel: 3, relatedSlideId: 16, category: 'bendra',
  },
  {
    id: 'pool-scenario-3',
    type: 'scenario',
    scenarioContext: 'You need a people report on employee satisfaction. You have survey data: 156 employees, overall satisfaction 7.2/10, weakest areas: communication (5.8) and career opportunities (6.1). You want the report in English with recommendations.',
    question: 'Which block would specify that AI first analyses the data, then identifies problem areas, and finally provides recommendations?',
    options: ['Reasoning', 'Meta', 'Output', 'Advanced'],
    correct: 0,
    explanation: 'The Reasoning block specifies the thought sequence: 1) Analyse data, 2) Identify problem areas, 3) Provide recommendations.',
    hint: 'Which block answers the question HOW to think before answering?',
    bloomLevel: 4, relatedSlideId: 11, category: 'reasoning',
  },
  {
    id: 'pool-scenario-4',
    type: 'scenario',
    scenarioContext: 'You\'re writing a prompt for a new SaaS product description. Your prompt: "You are a copywriter. Write a product description for my website. The product costs 49 EUR/month and automates 80% of routine tasks."',
    question: 'Which of these recommendations would LEAST improve this prompt?',
    options: [
      'Switch AI model from GPT-4 to GPT-3.5',
      'Add an Output block: SEO-optimised, 500 words, with CTA buttons',
      'Add a Quality block: accurate facts, no exaggeration',
      'Add a Reasoning block: first analyse competitors, then find unique points',
    ],
    correct: 0,
    explanation: "Changing the AI model (GPT-4 vs GPT-3.5) helps less than adding structural blocks (Output, Quality, Reasoning). Changing the model affects only the tool, not the prompt's structure.",
    hint: 'Which change is about tools, not prompt structure?',
    bloomLevel: 4, relatedSlideId: 16, category: 'bendra',
  },
];

export const POOL_CATEGORIES_EN = [
  'meta', 'input', 'output', 'reasoning', 'quality', 'advanced', 'bendra', 'workflow', 'technikos',
] as const;
