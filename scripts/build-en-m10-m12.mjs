#!/usr/bin/env node
/**
 * Build src/data/modules-en-m10-m12.json – full EN overlay for modules 10–12.
 * Run: node scripts/build-en-m10-m12.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outPath = join(root, 'src', 'data', 'modules-en-m10-m12.json');

/** LT shortTitle / title → EN label for footers, titles, player chrome. */
const SHORT_TITLE_EN = {
  'Kelias modulyje': 'Path in this module',
  'Kelias – ką čia rasi': 'Path in this module',
  'Agentų ciklas': 'Agent cycle',
  'Kontrolinis taškas: ciklas': 'Checkpoint: agent cycle',
  'Savitikra: ciklas': 'Warm-up: cycle',
  '3A strategija': '3A strategy',
  'Komandos pasirengimas': 'Team readiness',
  'Ar komanda pasirengusi agentiniam darbui?':
    'Is the team ready for agentic work?',
  'Kada tvirtina žmogus?': 'When does a human approve?',
  'Rolės ir sisteminis promptas': 'Role and system prompt',
  'DI agentų tipai ir rolės': 'Agent types and roles',
  'Agento gylis ir rolės': 'Agent depth and roles',
  'Kontrolinis taškas: rolės': 'Checkpoint: roles',
  '5 darbo eigos šablonai': '5 workflow patterns',
  'Keli agentai → darbo eiga': 'Multi-agent → workflow',
  'Orkestravimo simuliacija': 'Orchestration walkthrough',
  'Savitikra: darbo eiga': 'Warm-up: workflow',
  'Uždaro mokymosi ciklas': 'Closed learning loop',
  'Įrankių pasirinkimas': 'Tool selection',
  'Agentas ar paprastas promptas': 'Agent or plain prompt',
  'Kontrolinis taškas: promptas': 'Checkpoint: agent prompt',
  'Klaidos tvarkymas ir ribos': 'Errors and limits',
  'Savitikra: saugikliai': 'Quick check: safeguards',
  'Pagrindinės sąvokos': 'Core concepts',
  'Pagrindinės sąvokos: trigger…webhook': 'Core concepts',
  'Darbo eiga → automatizavimas': 'Workflow → automation',
  'Automatizavimo įrankiai': 'Automation tools',
  'Paleidimas: PaaS': 'Hosting: PaaS',
  'Kur paleisti': 'Where it runs',
  'Kur paleisti programą ar agentą': 'Where your app or agent runs',
  'GitHub kaip kodo šaltinis': 'GitHub as a code source',
  'Minimalus eigos aprašymas': 'Minimal workflow brief',
  'Specifikacija ir testai': 'Spec and tests',
  'Gilesnė eigos specifikacija': 'Deeper workflow specification',
  'Incidentų planas': 'Incident playbook',
  'Kai eiga lūžta': 'When the workflow breaks',
  'Testavimas ir saugumas': 'Testing and security',
  'QC vertintojas': 'QC evaluator',
  'Kokybės vertintojas': 'Quality evaluator',
  Žodynėlis: 'Glossary',
  'Modulio 10 santrauka': 'Module 10 summary',
  Savitikra: 'Warm-up',
  'Savitikra prieš testą': 'Warm-up before the test',
  'Modulio 11 testas': 'Module 11 test',
  Klausimai: 'Questions',
  Rezultatai: 'Results',
  'Papildomai: agento grandinė per 5 min': 'Bonus: agent chain in 5 minutes',
  'Trys praktikos (3A)': 'Three practices (3A)',
  'Kelių agentų schema': 'Multi-agent schema',
  'Kontrolinis taškas': 'Checkpoint',
  'Greitas startas': 'Quick start',
  'Tyrimo agentas': 'Research agent',
  '1 praktika: Automatizuoti': 'Practice 1: Automate',
  '2 praktika: Asistuoti': 'Practice 2: Augment',
  '3 praktika: Autonomizuoti': 'Practice 3: Autonomize',
  'Pakartok Modulį 10': 'Revisit Module 10',
  'Projekto santrauka': 'Project summary',
};

const en = {
  modules: [
    {
      id: 10,
      title: 'Agent engineering with AI',
      subtitle: 'Tools, prompts, systems – design and execution',
      description:
        'Agent engineering: cycle, tools, prompts, integrations. AI as agent system builder.',
      duration: '25–30 min',
      slides: [
        {
          id: 100,
          title: 'Agent engineering path',
          subtitle: 'Tools, prompts, systems',
          content: {
            whyBenefit:
              'After this module you will understand how to design AI agents – from the cycle and tools to integrations and prompt architecture.',
            heroStat: 'You already know the 6 blocks and context engineering.',
            heroText: 'Now – agent engineering.',
            heroSubText:
              'You will design agents for your processes – depth levels and roles, multi-agent coordination, no-code tools. You will apply context engineering from Modules 4–6 to agents.',
            firstActionCTA:
              'On the next slide, copy the quick check: in one sentence, tell an agent apart from a simple question-and-answer exchange.',
            outcomes: [
              'Understand agent taxonomy (L0–L3) and multi-agent roles',
              'Use 5 workflow patterns and system prompts',
              'Know how to choose tools and limit risks',
            ],
            duration: '~25–30 min',
            audience:
              'For business specialists and engineers who have completed Modules 4–6 (Context engineering).',
            howToUseModule: {
              heading: 'Choose a path',
              short: {
                label: 'Short path',
                description:
                  'Skip extra slides (GitHub, deeper spec and incident playbook, glossary).',
              },
              full: {
                label: 'Long path',
                description: 'All slides, including optional ones.',
              },
            },
          },
        },
        {
          id: 10.1,
          title: 'Agent engineering path – what you will find here',
          shortTitle: 'Path in this module',
          subtitle: 'Short overview; details on later slides',
          content: {
            sections: [
              {
                heading: 'In short',
                body: '**MUST path:** agent cycle → 3A strategy → depth and roles → 5 workflow patterns → role and system prompt → tools → when to choose an agent → errors and limits → workflow concepts → automation platforms → launch.\n\n**Optional:** GitHub, deeper spec and incident playbook, glossary. Term definitions – on the **Key concepts** slide.',
              },
              {
                heading: 'Quick win in 60 sec.',
                body: 'Before deeper theory, do one small check: can you already tell an agent from a simple question–answer?',
              },
              {
                heading: 'Copyable prompt',
                body: 'Copy it into AI and adapt the example to your work.',
                copyable:
                  'Explain in one sentence how an AI agent differs from a simple question–answer. Give one example from my work where an agent is needed, not a single simple prompt.',
              },
              {
                heading: 'Check',
                body: 'If the answer shows neither multiple steps nor tool use, it is still a simple prompt. On the next slide you will see the full agent cycle.',
              },
            ],
          },
        },
        {
          id: 10.2,
          title: 'Agent cycle and architecture',
          subtitle:
            'Agent → Planning → Tools → Environment → Result → Feedback',
          content: {
            sections: [
              {
                heading: 'In short',
                body: 'The diagram below – **five cycle steps**. Unlike in a simple chat, the agent **autonomously** chooses actions and can call tools.',
              },
              {
                heading: 'How an AI agent works',
                body: 'Click a step – explanation below.',
              },
              {
                heading: 'API and looping',
                body: '**API** – a program’s “door” to data or actions: the agent calls your CRM, email or another system through it, because it does not “have” that data itself.\n\n**Looping:** after the result the agent decides – repeat a step, call another tool, or finish. That is the feedback at the end of the cycle.',
              },
              {
                heading: 'When to choose an agent',
                body: 'More detail on when to use an agent instead of a simple prompt – with examples – on **When to choose an agent vs. a simple prompt**.',
              },
              {
                heading: 'Do this now',
                body: 'Apply the cycle to your process – copy the task into AI.',
              },
              {
                heading: 'Copyable prompt',
                body: 'Fill [DESCRIBE] with your work.',
                copyable:
                  'My process: [DESCRIBE, e.g. customer email sorting].\nWalk the agent cycle: (1) what is the task, (2) what is the plan, (3) which tool you will call, (4) what environment / data you read, (5) what is the result and whether to loop.\nIn one sentence: where in this process is a tool required (not only a text answer)?',
              },
              {
                heading: 'Check',
                body: 'Can you show in your process **where the cycle calls a tool** and **where feedback** may repeat a step? If not – go back to the diagram.',
              },
            ],
          },
        },
        {
          id: 10.22,
          title: 'Quick check: agent cycle',
          subtitle: '3 questions about agents, tools and failure messages',
          content: {
            questions: [
              {
                id: 'm10-warm-cycle-1',
                question:
                  'Which sign best shows that this is an agent-style task?',
                options: [
                  'Several steps, tool use or a decision whether to repeat an action',
                  'One simple question and one answer',
                  'Only a nicer tone in the answer',
                  'Only a longer prompt without tools',
                ],
                correct: 0,
                explanation:
                  'An agent-style task has multi-step logic, tool use or a decision whether to repeat an action. Without that, a simple prompt is often enough.',
              },
              {
                id: 'm10-warm-cycle-2',
                question: 'When is a simple prompt enough instead of an agent?',
                options: [
                  'When you need one clear answer without search, files or several steps',
                  'When you need search with sources',
                  'When you need several roles and handoff rules',
                  'When you need a workflow with a trigger and actions',
                ],
                correct: 0,
                explanation:
                  'A simple prompt fits one clear question. Choose an agent when you need tools, several steps or decisions between steps.',
              },
              {
                id: 'm10-warm-cycle-3',
                question:
                  'What should an agent return if it cannot use a tool?',
                options: [
                  'A short reason and a suggestion for what to fix',
                  'An empty answer',
                  'Invented data',
                  'Only a generic motivational phrase',
                ],
                correct: 0,
                explanation:
                  'A safe agent explains why it failed and says what to fix. This is part of error handling.',
              },
            ],
            footer: 'Next slide',
          },
        },
        {
          id: 10.25,
          title: '3A strategy',
          subtitle: 'Automate 80 % / Augment 15 % / Autonomize 5 %',
          content: {
            sections: [
              {
                heading: 'In short',
                body: '3A is a **decision portfolio**: automate 80 %, augment 15 %, autonomize 5 %.',
              },
              {
                heading: '3A strategy (diagram)',
                body: 'Choose a band – when it fits and when it does not.',
              },
              {
                heading: 'Example',
                body: '**Same process – two bands.** Customer email → reply: if a template reply (“received / ticket #”) is enough → **Automate**. If AI drafts the reply and a human approves the tone and facts → **Augment**. Choose Autonomize only with clear limits and escalation.',
              },
              {
                heading: 'Do this now',
                body: 'List **three work processes** and assign each to one 3A band. Copy the template into AI or write it down.',
              },
              {
                heading: 'Copyable template',
                body: 'Fill three processes.',
                copyable:
                  'Process 1: [PROCESS]. 3A band: Automate / Augment / Autonomize. Why (1 sentence): [REASON]. Human approval: [YES/NO + when].\n\nProcess 2: [PROCESS]. 3A band: … Why: … Human approval: …\n\nProcess 3: [PROCESS]. 3A band: … Why: … Human approval: …',
              },
              {
                heading: 'Check',
                body: 'Can you explain why at least one process is **not** in the Autonomize band (5 %) if you chose Automate or Augment? Can you name a process that **requires** a human? If not – go back to the diagram or example.',
              },
              {
                heading: 'Where to apply',
                body: '**Portfolio rule:** first inventory ~10 processes – keep most on rules (**Automate**); use agents only where the value clearly outweighs the cost of an error.\n\n**Band rule:** need a sign-off or tone/fact approval → **Augment**; stable template and cheap errors → **Automate**; **Autonomize** – only with a limit, escalation and audit.\n\n**Next step:** when a human must approve – slide **When does a human approve?**',
                collapsible: true,
                collapsedByDefault: false,
              },
            ],
          },
        },
        {
          id: 10.255,
          title: 'Is the team ready for agentic work?',
          subtitle: 'A quick team AI-practice snapshot before control rules',
          shortTitle: 'Team readiness',
          content: {
            sections: [
              {
                heading: 'In short',
                body: 'This is a **moment-in-time team practice snapshot**, not a formal maturity test. Choose how the team uses AI, how it structures prompts and how it learns from outcomes. The weakest dimension points to the one action to take before you increase autonomy.',
                blockVariant: 'accent',
              },
              {
                heading: 'Do this now',
                body: 'Pick one state in each of the three dimensions. The lab generates a team readiness profile you can use before choosing a human-control rule on the next slide.',
                image: 'm10_team_readiness_lab',
                imageAlt: 'Lab: team readiness for agentic work',
                blockVariant: 'brand',
              },
              {
                heading: 'Check',
                body: 'Can you name the **one habit** the team needs to strengthen before agentic work? If you chose “systematic” everywhere, do you have evidence: a shared template, an owner and a review rhythm? If not – mark “fragmented”.',
                blockVariant: 'accent',
              },
            ],
          },
        },
        {
          id: 10.45,
          title: 'Choose agent depth and roles',
          subtitle: 'Chat, agent, team or automated flow',
          shortTitle: 'Agent depth and roles',
          content: {
            sections: [
              {
                heading: 'In short',
                body: 'Choose the simplest depth that can complete your process. Start with **Agent**; choose **Team** when you need several distinct roles, and **Flow** when an event starts actions automatically.',
                blockVariant: 'accent',
              },
              {
                heading: 'Depth and team roles',
                body: '**Team** reveals the roles below. Inputs / outputs – at the next checkpoint.',
                blockVariant: 'brand',
              },
              {
                heading: 'Do this now',
                body: 'Choose a depth below. If you choose **Team**, define a coordinator, specialist, and evaluator; add a router only when requests must first be sorted by type. Copy the resulting artifact.',
                blockVariant: 'brand',
              },
              {
                heading: 'Check',
                body: 'Can you explain your choice in one sentence? If you chose Team, does each role have a distinct job and clear output?',
                blockVariant: 'accent',
              },
              {
                heading: 'When not to use multi-agent',
                body: '**Do not pick Team or Flow** if the task is simple, there is no human approval, or there is no clear “done” criterion. Add roles only when one agent is no longer enough.',
                blockVariant: 'terms',
                collapsible: true,
                collapsedByDefault: false,
              },
            ],
            footer: 'Next – slide 10: Checkpoint: roles',
          },
        },
        {
          id: 10.451,
          title: 'Checkpoint: roles and handoff',
          subtitle: 'Agent engineering path – step 2',
          shortTitle: 'Checkpoint: roles',
          content: {
            title: 'Roles – I defined inputs and outputs',
            pathLabel: 'Agent engineering path',
            stepNumber: 2,
            stepTotal: 3,
            body: 'You already chose a depth on “Choose agent depth and roles.” Here – only **input, output, and handoff rules** for three roles (if Team). If you stayed at Agent – mark the step and continue.',
            sections: [
              {
                heading: 'Check',
                body: 'Is it clear when the specialist hands work to the evaluator? Does the evaluator have a done criterion?',
                copyable:
                  'Process: [DESCRIBE] (depth already: Team).\nFor each role (coordinator / specialist / evaluator):\n– input\n– output\n– handoff rule: when work moves to the next role.',
              },
              {
                heading: 'If it fails',
                body: 'Drop to Agent: one agent, one tool, one result.',
              },
            ],
            unlockedGlossaryTerms: ['Coordinator', 'Evaluator', 'Router'],
            footer: 'Next – slide 12: 5 workflow patterns',
          },
        },
        {
          id: 10.48,
          title: '5 workflow patterns for business',
          subtitle: 'Chain, routing, parallel work, coordinator, evaluator',
          content: {
            sections: [
              {
                heading: 'In short',
                body: 'When one AI agent is no longer enough – pick a **workflow pattern** (not programming). Choose **one** – you will see a plan.',
              },
              {
                heading: 'Do this now',
                body: 'Pick one pattern. After you choose, you get that pattern’s plan.',
                toolChoiceBar: {
                  variant: 'choice',
                  question: 'Choose a process pattern',
                  choices: [
                    {
                      label: 'Chain',
                      rowIndex: 0,
                      description: 'Steps in order',
                      whenHint:
                        'Fits: steps run one after another. Does not fit: types differ or several work in parallel.',
                    },
                    {
                      label: 'Routing',
                      rowIndex: 1,
                      description: 'Path by type',
                      whenHint:
                        'Fits: a different branch by type (complaint / inquiry). Does not fit: every case follows the same sequence.',
                    },
                    {
                      label: 'Parallel',
                      rowIndex: 2,
                      description: 'At once, then merge',
                      whenHint:
                        'Fits: several sources / specialists at once, then merge. Does not fit: the result depends on a prior step.',
                    },
                    {
                      label: 'Coordinator',
                      rowIndex: 3,
                      description: 'Splits to specialists',
                      whenHint:
                        'Fits: you need to split sub-tasks dynamically. Does not fit: a fixed chain without assignment is enough.',
                    },
                    {
                      label: 'Generator + evaluator',
                      rowIndex: 4,
                      description: 'Draft and check',
                      whenHint:
                        'Fits: draft + quality check (email, FAQ, report). Does not fit: quality risk is low – an Agent is enough.',
                    },
                  ],
                },
              },
              {
                heading: 'Copyable plan – Chain',
                body: 'Copy and fill [DESCRIBE].',
                copyable:
                  'Process: [DESCRIBE]. Pattern: Chain.\nList 3–5 steps in order (input → action → output).\nFor each step: who does it (human / AI / rule) and a done criterion.\nMark human approval on risky steps.',
                linkedRowIndex: 0,
              },
              {
                heading: 'Copyable plan – Routing',
                body: 'Copy and fill [DESCRIBE].',
                copyable:
                  'Process: [DESCRIBE]. Pattern: Routing.\nInput types: [e.g. complaint / inquiry / proposal].\nFor each branch: who runs it, what output, when to escalate to a human.\nDone criterion for all branches.',
                linkedRowIndex: 1,
              },
              {
                heading: 'Copyable plan – Parallel',
                body: 'Copy and fill [DESCRIBE].',
                copyable:
                  'Process: [DESCRIBE]. Pattern: Parallel work.\nParallel streams (2–3): [e.g. CRM + email].\nFor each: input, output.\nMerge rule: how they become one summary + who approves.',
                linkedRowIndex: 2,
              },
              {
                heading: 'Copyable plan – Coordinator',
                body: 'Copy and fill [DESCRIBE].',
                copyable:
                  'You are the coordinator. Task: [DESCRIBE].\nBreak it into 2–3 subtasks. For each assign a role (specialist / evaluator),\ninput, output and handoff rule (when to pass to the next role).\nPresent the plan as a numbered list.',
                linkedRowIndex: 3,
              },
              {
                heading: 'Copyable plan – Generator + evaluator',
                body: 'Copy and fill [DESCRIBE].',
                copyable:
                  'Process: [DESCRIBE]. Pattern: Generator + evaluator.\nGenerator: what it creates (draft) and which sources.\nEvaluator: QC criteria (facts, tone, risk) and when to send back for fixes.\nHuman approval: [when YES / NO].',
                linkedRowIndex: 4,
              },
              {
                heading: 'Check',
                body: 'Does the plan have a clear **completion criterion**? Do risky steps have **human approval**?',
              },
              {
                heading: 'When NOT to use multi-agent',
                body: 'If the task has 1–2 steps – one agent (Agent) is enough. Patterns without an evaluator are risky for finance, support and public content.',
                collapsible: true,
                collapsedByDefault: true,
              },
            ],
            footer: 'Next – slide 12: Quick check: workflow',
          },
        },
        {
          id: 10.485,
          title: 'Quick check: workflow patterns',
          subtitle: '3 questions about the chain, routing and evaluator patterns',
          content: {
            questions: [
              {
                id: 'm10-warm-workflow-1',
                question:
                  'Which workflow pattern fits when one step must happen after another?',
                options: [
                  'Chain',
                  'Routing',
                  'Parallel work',
                  'Only one question without a pattern',
                ],
                correct: 0,
                explanation:
                  'A chain fits when one step clearly follows another: query → classification → draft → send.',
              },
              {
                id: 'm10-warm-workflow-2',
                question:
                  'Which pattern fits when a request is routed by type?',
                options: [
                  'Routing',
                  'Chain',
                  'Generator + evaluator',
                  'Only the 3A strategy',
                ],
                correct: 0,
                explanation:
                  'Routing directs a request by type or category: complaint, inquiry, proposal and similar.',
              },
              {
                id: 'm10-warm-workflow-3',
                question:
                  'Which pattern is safest when you need a draft and a quality check?',
                options: [
                  'Generator + evaluator',
                  'Only a generator, without a check',
                  'Only a router',
                  'Only manual copy-paste',
                ],
                correct: 0,
                explanation:
                  'Generator + evaluator creates a draft first, then checks quality and returns it for fixes.',
              },
            ],
            footer: 'Next slide',
          },
        },
        {
          id: 10.3,
          title: 'Role and system prompt',
          shortTitle: 'Role and system prompt',
          subtitle: 'How to set the role and limits for an agent',
          content: {
            sections: [
              {
                heading: 'In short',
                body: 'The role defines how AI behaves – in a simple chat and in agent systems. System prompt – where you set **role, limits, tools** and what to do when data is missing. Here – a simple one-agent template; multi-agent roles – on **AI agent types and roles**.',
              },
              {
                heading: 'What goes into a system prompt',
                body: '1. **Role** – who you are and what you do.\n2. **Limits** – what you do not do / when to escalate to a human.\n3. **Tools** – what you may call (search, files, API).\n4. **Missing data** – if facts are missing: search or write “I don’t know” (do not invent).',
              },
              {
                heading: 'Do this now',
                body: 'Copy the template into your AI “system settings” field (if none – paste it as the **first** message). Fill `[ROLE]` and `[LIMITS]`. Then ask: “Search for [X] and provide a summary with sources.”',
              },
              {
                heading: 'Copyable prompt',
                body: 'System template – replace fields in brackets.',
                copyable:
                  'Your role – [ROLE, e.g. customer support assistant].\nLimits: [LIMITS, e.g. do not offer discounts without a human; escalate sensitive complaints].\nUse tools (search, files, etc.) when they help with the task.\nIf the task is unclear or fails – briefly say why and what to fix.\nDo not invent data – if facts are needed, use search or write “I don’t know”.',
              },
              {
                heading: 'Check',
                body: 'A good answer shows: steps or a tool trace, sources (if you searched), or a clear “I don’t know.” If AI does not use tools – check Browse / Tools settings.',
              },
              {
                heading: 'Where to apply',
                body: 'Anywhere you need more than just an answer – search, calculations or external data. The same context-engineering idea as in Modules 4–6 – applied to an agent: role, limits, tools, output.',
                collapsible: true,
                collapsedByDefault: true,
              },
            ],
          },
        },
        {
          id: 10.4,
          title: 'Tool selection and limits',
          subtitle:
            'What AI can use – search, files, API; platforms (ChatGPT, Claude, Gemini)',
          content: {
            sections: [
              {
                heading: 'In short',
                body: 'Not all AI platforms have the same tools. An **API** is a defined connector to another system; **MCP** is a common way to expose connectors and actions to AI. Before writing a prompt, check whether search, files, and the needed connectors are enabled. We will cover workflow platforms later in this module.',
              },
              {
                heading: 'Popular AI platforms – what they offer',
                body: 'Think in **3 layers**, not one button: (1) platform features – search, files, memory; (2) connectors – API, integrations, MCP servers; (3) agentic modes – AI chooses a tool, takes action, and records the result. Before writing an agent prompt, check which layers are enabled on your platform.',
              },
              {
                heading: 'Do this now',
                body: 'Open your AI settings and note which tools you allow. Then in one task write: “Use search and provide sources.”',
              },
              {
                heading: 'Copyable prompt',
                body: 'Copy and fill [DESCRIBE TASK].',
                copyable:
                  'Task: [DESCRIBE TASK].\nUse only enabled tools: [search / files / API / connector / MCP]. If up-to-date facts are needed – use search and provide sources. If an action in a system is needed, first state which connector or API you would use. If you cannot find it or the tool is unavailable – write “Not found / Failed” and briefly explain why.',
              },
              {
                heading: 'Check',
                body: 'If the answer has no sources – did you say “use search”? Is the tool enabled on the platform?',
              },
            ],
          },
        },
        {
          id: 10.5,
          title: 'When to choose an agent vs. a simple prompt',
          subtitle:
            'Complex tasks with tools – agent; one question – simple prompt',
          content: {
            sections: [
              {
                heading: 'In short',
                body: 'Choose an agent when the task needs several actions, external data, or tools. A simple prompt is enough for one clear question and answer. You already saw multi-agent patterns earlier; here you decide between **one agent** and a simple prompt.',
              },
              {
                heading: 'Do this now',
                body: 'Copy the main 5-part template, adapt it to your task, and run it in your AI tool. Check whether the answer shows tool use and error handling.',
              },
              {
                heading: 'Copyable 5-part prompt',
                body: 'This is the main agent prompt template before Module 12 practice: role, task, tools, format, and error handling.',
                copyable:
                  'ROLE\nYou are [domain / role]. Your responsibility is [what you do]. You have access to [search / calculator / API]. Do not do the following: [limits, e.g. do not invent data].\n\nTASK (step by step)\n(1) [First step, e.g. search X]\n(2) [Second step, e.g. pick 3–5 sources]\n(3) [Third step, e.g. write a summary]\n\nTOOLS\nUse [search / tool] when [when]. If facts are needed – use search or write “I don’t know”. List sources at the end.\n\nFORMAT\n[Table / list / report]. Language: English. Sources: cite them.\n\nERROR HANDLING\nIf the task cannot be completed (missing data, timeout): write “Failed: [reason]” and suggest what to fix. Do not write an empty answer.',
              },
              {
                heading: 'Check',
                body: 'Does your agent prompt include **error handling** and a **tool instruction**? If not – add them before the checkpoint **“Checkpoint: prompt”**.',
              },
              {
                heading: 'What comes later',
                body: 'In the next stage you will expand this prompt into a minimal workflow specification: what starts the flow, which fields are required, and when human approval is required.',
                collapsible: true,
                collapsedByDefault: true,
              },
            ],
          },
        },
        {
          id: 10.51,
          title: 'Checkpoint: agent prompt',
          subtitle: 'Agent engineering path – step 3',
          content: {
            title: 'Agent prompt – I have a template before practice',
            body: 'Before Module 12 practice, have one 5-part agent prompt and one golden check (edge case). You will fill in the workflow specification skeleton later, once you know the trigger, condition, and action concepts.',
            sections: [
              {
                heading: 'Minimal artifact',
                body: 'Role, task in steps, tools, output format, and error handling. It is enough if you can show how the prompt behaves in an edge case.',
              },
              {
                heading: 'Check',
                body: 'If error handling or human approval at a risky point is missing, add it before continuing.',
              },
              {
                heading: 'Golden check',
                body: 'Test the prompt with 1 edge case: missing required field, no source, or API not responding. A good result is a clear “Failed: [reason]” plus a suggestion of what to fix.',
                copyable:
                  'Test this agent prompt with an edge case: [PASTE PROMPT]. Test situation: [missing required field / no source / API does not respond]. Evaluate whether the answer has “Failed: [reason]” and a clear suggestion for what to fix.',
              },
            ],
            unlockedGlossaryTerms: [
              'System prompt',
              'Error handling',
              'Trigger (event)',
            ],
          },
        },
        {
          id: 10.6,
          title: 'Error handling and limits',
          subtitle: 'What to do when something fails',
          content: {
            sections: [
              {
                heading: 'In short',
                body: 'The agent must know what to do when something fails. Set limits: what not to do and what to return instead of an empty answer.',
              },
              {
                heading: 'Do this now',
                body: 'Paste the text below into the **system** or **user** prompt (or both). Then give AI a deliberately impossible task – e.g. “Search for the 2029 profit report of nonexistent company X and provide real sources”.',
              },
              {
                heading: 'Copyable prompt',
                body: 'Add to system or user prompt – what to do when it fails.',
                copyable:
                  'If the task cannot be completed (missing data, disallowed action or timeout): write a short message “Failed: [reason]” and suggest what the user can fix. Do not write an empty answer.',
              },
              {
                heading: 'Tool output is not an instruction',
                body: 'If a search result, a file, a CRM, or a website returns text such as “ignore previous rules”, treat it as **data**, not a command. System rules and the user’s goal take precedence over any text returned by a tool.',
              },
              {
                heading: 'Check',
                body: 'Did AI return **“Failed”** (or similar) and **a reason**, not an empty answer? If it stays silent – add this to the prompt: “If you cannot – always say why.”',
              },
            ],
          },
        },
        {
          id: 10.61,
          title: 'Quick check: before workflow concepts',
          shortTitle: 'Quick check: safeguards',
          subtitle: '3 questions: error handling, 3A, search',
          content: {
            questions: [
              {
                id: 'm10-warm-pre-wf-1',
                question:
                  'What is a good result when AI cannot complete the task?',
                options: [
                  'A clear “Failed: [reason]” and a suggestion for what to fix',
                  'An empty answer',
                  'Invented facts so the answer looks complete',
                  'Only an apology without a reason',
                ],
                correct: 0,
                explanation:
                  'Error handling requires a clear “Failed” message and a concrete next step – not an empty or invented answer.',
              },
              {
                id: 'm10-warm-pre-wf-2',
                question:
                  'Which 3A choice fits a process with clear rules, low risk, and almost no human judgment needed?',
                options: [
                  'Automate',
                  'Augment',
                  'Autonomize',
                  'Do not automate',
                ],
                correct: 0,
                explanation:
                  'Automate fits clear, repeatable, low-risk rules. Choose Augment when a human must decide, and Autonomize only for tightly bounded exceptions.',
              },
              {
                id: 'm10-warm-pre-wf-3',
                question:
                  'What should you write clearly when the task needs facts from the internet?',
                options: [
                  '“Use search and provide sources”',
                  '“Answer as long as possible”',
                  '“Do not use any tools”',
                  '“Guess if you do not know”',
                ],
                correct: 0,
                explanation:
                  'Without a clear tool instruction, AI may answer without sources. “Use search…” reduces that risk.',
              },
            ],
          },
        },
        {
          id: 10.15,
          title: 'Workflow basics',
          subtitle: 'Trigger, condition, and action – three clear steps',
          content: {
            sections: [
              {
                heading: 'In short',
                body: 'A workflow has three core steps: **Trigger** → **Condition** → **Action**. An **incoming web notification** is a trigger type, not a fourth step.',
              },
              {
                heading: 'Workflow chain',
                body: '',
                image: 'm10_trigger_flow',
              },
              {
                heading: 'Worked example',
                body: '**Form:** Trigger – form submitted → Condition – if email is valid → Action – CRM record + email.\n\n**Payment:** a PayPal event arrives as a webhook (a trigger type) → the sales system updates the order.',
              },
              {
                heading: 'Concepts – contrast',
                body: '**Trigger** – event that starts the flow (form, email, schedule).\n\n**Condition** – a rule or branch (if the amount > X); optional in the first flow.\n\n**Action** – what the **system** does (CRM, email) – not the trigger itself.\n\n**Webhook** – a Trigger type: real-time data from another system (event → API). Not an Action.',
              },
              {
                heading: 'Where to apply',
                body: 'Pick one process that matches your work. Each row: trigger → action → risk → metric.\n\n**Sales.** Inquiry form → CRM and email. Risk: duplicates. Metric: conversion.\n**People ops.** CV received → filter, then a person approves. Risk: uneven screening. Metric: time to hire.\n**Finance.** Invoice → scan and check. Risk: wrong numbers. Metric: processing time.\n**Customer service.** Complaint → sort and draft. Risk: the wrong tone. Metric: first response time.\n\nStart with the trigger and the action; add a condition only when you truly need it.',
              },
              {
                heading: 'Do this now',
                body: 'Describe your process using the example. Copy the template and fill the fields.',
              },
              {
                heading: 'Copyable template',
                body: 'Fill in the [ ] fields.',
                copyable:
                  'Trigger: [EVENT]. Condition (if needed): [RULE]. Action 1: [ACTION]. Action 2: [ACTION]. Webhook? [YES/NO – from where]. Error step: [what to do if it fails].',
              },
              {
                heading: 'Check',
                body: 'Is the trigger an **event** (not a task), and the action a **system step**? Did you name an error step? Can you name the **risk** and the **metric** for your process? If not – go back to the example and template.',
              },
              {
                heading: 'Extra concepts (if needed)',
                body: 'You may later need a delay, filter, loop, or error handler. Add them only after the core flow works.',
                collapsible: true,
                collapsedByDefault: true,
              },
            ],
          },
        },
        {
          id: 10.35,
          title: 'Business automation tools',
          subtitle: 'Zapier, Make, n8n, Power Automate – when to choose what',
          content: {
            sections: [
              {
                heading: 'In short',
                body: 'First compare five tools in the tree, then choose one of the four common starting options below. **Workato** stays in the tree as an enterprise option, so it is not in the quick choice bar.',
              },
              {
                heading: 'Tool selection tree',
                body: 'Choose a situation – you will see why it fits, where it is strong, and when to pick another.',
                image: 'm10_tool_decision_tree',
              },
              {
                heading: 'Do this now',
                body: 'The tree helps you explore; the choice below locks one tool into your process. Choose one and copy only its template.',
                toolChoiceBar: {
                  question: 'Which tool will you use for your process?',
                  autoSelect: false,
                  choices: [
                    {
                      label: 'Zapier',
                      rowIndex: 0,
                      whenHint:
                        '**Yes:** non-technical team, quick start. **No:** complex logic or data on your servers. E.g., Calendly → calendar → reminder email.',
                    },
                    {
                      label: 'Make.com',
                      rowIndex: 1,
                      whenHint:
                        '**Yes:** conditions, loops, better price. **No:** a simple two- or three-step flow is enough. E.g. Shopify order → stock → supplier alert.',
                    },
                    {
                      label: 'n8n',
                      rowIndex: 2,
                      whenHint:
                        '**Yes:** technical team, data on your side. **No:** no IT team, or you need a quick SaaS option. E.g. payment webhook → DB → Slack alert.',
                    },
                    {
                      label: 'Power Automate',
                      rowIndex: 3,
                      whenHint:
                        '**Yes:** daily Teams / Outlook / SharePoint. **No:** your main stack is not Microsoft. E.g. Outlook PDF → SharePoint → Teams.',
                    },
                  ],
                },
              },
              {
                heading: 'Copyable template – Zapier',
                body: 'This prompt generates a platform-ready implementation guide you can hand to Zapier later.',
                copyable:
                  'You are a Zapier workflow architect.\n\nPROCESS: [PROCESS]\nGOAL: [RESULT TO CREATE]\nTOOLS / SYSTEMS: [FORM, CRM, EMAIL, SLACK / TEAMS]\nLIMITS: [DATA, ACCESS, WHO APPROVES]\n\nCreate a Zapier implementation guide:\n1) Trigger – what event starts the flow.\n2) Required fields – field | source | destination.\n3) Zap steps – app | action | input | output.\n4) Errors – missing field, unavailable API, or duplicate.\n5) Tests – success path + 2 failures.\n6) Human approval – when to stop and who the task is handed to.\n7) Alternative – explain in one sentence why Make.com is not the better fit.\n\nReturn tables. If information is missing, ask up to 3 questions first.',
                linkedRowIndex: 0,
              },
              {
                heading: 'Copyable template – Make.com',
                body: 'This prompt generates a Make scenario document with modules, conditions, and tests.',
                copyable:
                  'You are a Make.com scenario architect.\n\nPROCESS: [PROCESS]\nGOAL: [RESULT TO CREATE]\nTOOLS / SYSTEMS: [FORM, CRM, EMAIL, SLACK / TEAMS]\nLIMITS: [DATA, ACCESS, WHO APPROVES]\n\nCreate a Make implementation guide:\n1) Scenario trigger and modules in order.\n2) Filters / routes – condition | destination | why.\n3) Field mapping – source | Make field | destination.\n4) Errors – retry, fallback, escalation.\n5) Tests – success path + missing field + unavailable API.\n6) Human approval – where to pause before sending.\n7) Alternative – explain in one sentence why Zapier is not the better fit.\n\nReturn tables. If the process is too complex, propose the first small scenario.',
                linkedRowIndex: 1,
              },
              {
                heading: 'Copyable template – n8n',
                body: 'This prompt generates an n8n workflow document with nodes, data fields, and an error branch.',
                copyable:
                  'You are an n8n workflow architect.\n\nPROCESS: [PROCESS]\nGOAL: [RESULT TO CREATE]\nTOOLS / SYSTEMS: [WEBHOOK, DATABASE, CRM, EMAIL, SLACK / TEAMS]\nLIMITS: [DATA, ACCESS, WHO APPROVES]\n\nCreate an n8n implementation guide:\n1) Node sequence – node | purpose | input | output.\n2) Data structure – JSON field | type | required? | example.\n3) Error branch – what to do if a node fails.\n4) Tests – success path + invalid JSON + timeout.\n5) Security – where keys are stored, what to mask.\n6) Human approval – when to send to a human.\n7) Alternative – explain in one sentence why Make.com is not the better fit.\n\nReturn tables and add a short “what to implement first” list.',
                linkedRowIndex: 2,
              },
              {
                heading: 'Copyable template – Power Automate',
                body: 'This prompt generates a Power Automate implementation guide for a Microsoft environment.',
                copyable:
                  'You are a Power Automate workflow architect.\n\nPROCESS: [PROCESS]\nGOAL: [RESULT TO CREATE]\nTOOLS / SYSTEMS: [OUTLOOK, TEAMS, SHAREPOINT, FORMS]\nLIMITS: [DATA, ACCESS, WHO APPROVES]\n\nCreate a Power Automate implementation guide:\n1) Trigger and actions in order.\n2) Required fields and their purpose.\n3) Errors – missing field or unavailable system.\n4) Tests – success path + 2 failures.\n5) Human approval – where to pause before sending.\n6) Alternative – explain in one sentence why Zapier is not the better fit.\n\nReturn tables and name the first small implementation step.',
                linkedRowIndex: 3,
              },
              {
                heading: 'Check',
                body: 'Does the guide explain why the chosen tool fits and why at least one alternative does not? Does it include a trigger, error path, and tests?',
              },
              {
                heading: 'More about each',
                body: '**Zapier:** many integrations; quick start; weakness – cost at scale.\n\n**Make.com:** drag & drop, conditions and loops; weakness – learning curve.\n\n**n8n:** open source, self-hosted; weakness – needs IT skills.\n\n**Power Automate:** Microsoft security and licensing; weakness – limited outside Microsoft.\n\n**Enterprise governance** (auditors, compliance) → **Workato** – see the tree above.\n\nDeeper material – see the optional slides **Deeper workflow specification** and **When the workflow breaks**.',
                collapsible: true,
                collapsedByDefault: true,
              },
            ],
          },
        },
        {
          id: 10.64,
          title: 'Minimal workflow brief',
          subtitle: '1-page schema + 3 tests + when a human approves',
          content: {
            sections: [
              {
                heading: 'In short',
                body: 'Before Module 12 practice, prepare a one-page workflow brief: the flow itself, three tests, and a rule for when a human decides. You will check the same artifact on the quality evaluator slide and reuse it in practice.',
              },
              {
                heading: 'Minimal brief',
                body: '**A. Flow:** trigger, required input, condition if needed, 3–5 actions, result, and failure path.\n\n**B. Three tests:** a success path, a missing field, and an unavailable or duplicate system event.\n\n**C. Human decision:** when to stop, who approves, and what to record.\n\n**Mini example:** form submitted → email validated → CRM record → email; if the email address is missing, stop and ask for that field.',
              },
              {
                heading: 'Do this now',
                body: 'Copy one template and fill it with your process. Later, the quality evaluator will point to one place worth fixing.',
              },
              {
                heading: 'Copyable template',
                body: 'One page that you can hand to a colleague or an evaluator.',
                copyable:
                  'Minimal workflow brief\n\nA. FLOW\nTrigger: [WHAT STARTS IT]\nRequired input: [FIELDS]\nCondition, if needed: [RULE]\nActions (3–5): [1] → [2] → [3]\nResult: [WHAT IS CREATED AND WHERE]\nIf it fails: [STOP / RETRY / NOTIFY]\n\nB. TESTS\n1) Success path: [INPUT → EXPECTED RESULT]\n2) Missing field: [EXPECTED RESPONSE]\n3) System unavailable or duplicate: [WHAT TO DO]\n\nC. HUMAN DECISION\nWhen to send to a human: [CONDITION]\nWho approves: [ROLE]\nWhat to record: [TIME, DECISION, RESULT]',
              },
              {
                heading: 'Check',
                body: 'Do you have all three parts: **A – flow, B – three tests, C – human decision**? From this page, could a colleague understand what happens and what to do on failure?',
              },
            ],
          },
        },
        {
          id: 10.65,
          title: 'Deeper workflow specification',
          subtitle: 'Eight blocks and three quality tests',
          type: 'content-block',
          optional: true,
          content: {
            sections: [
              {
                heading: 'In short',
                body: 'Deepen the minimal brief to eight blocks. The first five = how the flow works. The last three – SLA, errors, and audit – prepare the next step.',
              },
              {
                heading: 'Eight specification blocks',
                body: 'Click a block.',
                image: 'm10_workflow_spec',
              },
              {
                heading: 'Do this now',
                body: 'Take your **Minimal workflow brief** draft. Copy the checklist and mark the 3 quality tests.',
              },
              {
                heading: 'Copyable checklist',
                body: 'Paste the brief into [ ] and run it in your AI tool.',
                copyable:
                  'Here is my minimal workflow brief:\n[PASTE BRIEF]\n\nCheck three quality tests:\n(1) Empty input – does it return a clear “Failed”?\n(2) False fact – does it refuse to confirm?\n(3) Very long text – does it stay stable and say what went wrong?\n\nAnswer briefly: YES/NO for each + 1 gap if any.',
              },
              {
                heading: 'Check',
                body: 'Do the eight blocks include an **SLA** (how long to wait and how many retries), an **error path**, and an **audit log**? If not – go back to **Minimal workflow brief** and complete the draft.',
              },
              {
                heading: '10 test scenarios',
                body: 'Before going live – walk through the list. **Repeat protection (idempotency):** a unique request ID; if the record already exists – update it, do not create a new one.',
                collapsible: true,
                collapsedByDefault: true,
                table: {
                  headers: ['#', 'Scenario'],
                  rows: [
                    ['1', 'Empty required fields'],
                    ['2', 'Invalid email format'],
                    ['3', 'Duplicates – same record twice'],
                    ['4', 'Timeout – API does not respond'],
                    ['5', 'Webhook duplicates'],
                    ['6', 'Special characters / long text'],
                    ['7', 'Invalid values'],
                    ['8', 'Missing fields (schema changed)'],
                    ['9', 'Rate limit (429)'],
                    ['10', 'Auth error (401/403)'],
                  ],
                },
              },
              {
                heading: 'Cost and model choice',
                body: 'Use a cheaper model for classification, filtering, or duplicate checks. Reserve a stronger model for customer-facing text, complex decisions, or risk assessment. Set a cost threshold: above it, stop or send the work to a human.',
                collapsible: true,
                collapsedByDefault: true,
              },
            ],
          },
        },
        {
          id: 10.655,
          title: 'When the workflow breaks',
          subtitle: 'Five actions, then security rules',
          type: 'content-block',
          optional: true,
          content: {
            sections: [
              {
                heading: 'In short',
                body: 'When the flow is already running and something happens: stop, record, assess the scope, notify, then fix. The spec’s SLA, errors, and audit become five actions here.',
              },
              {
                heading: 'Five actions when the workflow breaks',
                body: 'Click a step.',
                image: 'm10_incident_playbook',
              },
              {
                heading: 'Do this now',
                body: 'Take the SLA, error path, and audit log from the specification. Copy the plan and write who stops it, where you log, and who approves before the fix.',
              },
              {
                heading: 'Copyable plan',
                body: 'Paste it into AI or a team document.',
                copyable:
                  'My workflow incident playbook\n\nFrom the specification:\nSLA (how long to wait, how many retries): [ ]\nError path: [ ]\nAudit log: [ ]\n\n5 actions:\n1. Stop: [who stops it]\n2. Record: [where I write]\n3. Scope: [what I check]\n4. Notify: [whom]\n5. Fix: [who approves before the fix]',
              },
              {
                heading: 'Check',
                body: 'Does the plan have **five actions in order** and **who approves before the fix**? If not – go back to **Deeper workflow specification** and take the SLA, errors, and audit.',
              },
              {
                heading: 'Security and compliance',
                body: '1. **Data:** send only required fields to AI; mask names, contacts, and other personal data when they are not needed.\n2. **Keys and access:** keep API keys in the platform vault, not in code; only assigned people may edit the workflow.\n3. **Human decision:** pause before a financial action, bulk data export, or high-impact decision.\n4. **Record:** log the goal, the data used, the human decision, and the result. This traceability supports company policy and EU AI Act requirements.',
              },
            ],
          },
        },
        {
          id: 10.66,
          title: 'Agent quality evaluator',
          shortTitle: 'Quality evaluator',
          subtitle: 'One prompt checks an agent or workflow specification',
          content: {
            sections: [
              {
                heading: 'In short',
                body: 'One evaluator prompt checks your agent prompt or workflow brief. It finds unclear points and proposes a concrete fix before practice.',
              },
              {
                heading: 'Do this now',
                body: 'Copy the evaluator, paste your agent prompt or workflow specification, and fix at least one point that AI marks as “fix”.',
              },
              {
                heading: 'Copyable prompt (evaluator)',
                body: 'One prompt evaluates another: the evaluator does not create a new workflow; it shows what to fix.',
                copyable:
                  'You are an agent quality evaluator.\nEvaluate the agent or workflow specification below against 5 criteria:\n1) goal and completion criterion,\n2) input fields,\n3) tools and limits,\n4) error handling,\n5) human approval in risky places.\n\nReturn a table: criterion | OK / fix | what is unclear | concrete fix.\nIf data is missing, do not guess – say which field is needed.\nSpecification: [PASTE HERE]',
              },
              {
                heading: 'Check',
                body: 'A good evaluation has at least one concrete fix or a clear “OK” for every criterion. If you only get generic praise, ask for a table with concrete fixes.',
              },
            ],
            practicalTask: {
              title: 'Steps: evaluator checks your specification',
              placeholder: '',
              templateLabel: 'Steps: evaluator checks your specification',
              template:
                '1. Copy the evaluator prompt from the block above.\n2. Paste it into AI.\n3. Paste your agent prompt or workflow specification.\n4. Fix at least one point the evaluator marked as “fix”.\n5. Run the evaluation again and check whether all 5 criteria have clear answers.\n\nThe evaluator and your prompt are not competitors: the evaluator helps improve your artifact before practice.',
            },
            footer: 'Next slide',
          },
        },
        {
          id: 10.7,
          title: 'Glossary',
          subtitle: 'A quick reference for the Agent path terms',
          content: {
            terms: [
              {
                term: 'Agent (AI)',
                definition:
                  'A system that completes tasks in steps and can use tools (search, API, files).',
              },
              {
                term: 'Tool',
                definition:
                  'A function that AI can call (e.g., search, calculator, file reading).',
              },
              {
                term: 'System prompt',
                definition:
                  'A higher-priority instruction that sets the AI role, operating rules, and limits for the whole conversation or agent. It differs from the user’s specific task.',
              },
              {
                term: 'User prompt',
                definition: 'A task that the user enters in the chat.',
              },
              {
                term: 'Integration',
                definition:
                  'A connection between AI and external data or services (API, database).',
              },
              {
                term: 'Execution',
                definition: 'Carrying out a task step by step, including planning and tool calls.',
              },
              {
                term: 'Limits (guardrails)',
                definition:
                  'Rules the agent must not break (e.g., disallowed actions, privacy).',
              },
              {
                term: 'Human-in-the-loop (HITL)',
                definition:
                  'A control design where a human approves, edits, or stops the agent before a high-impact action. Not a maturity ladder to autopilot.',
              },
              {
                term: 'Error handling',
                definition: 'The rule for what to return to the user when the task fails.',
              },
              {
                term: 'Trigger (event)',
                definition:
                  'An event that starts a workflow (e.g., a new email or a form submission).',
              },
              {
                term: 'Action',
                definition:
                  'An action that the system performs (e.g., sending an email or writing to the CRM).',
              },
              {
                term: 'Condition',
                definition:
                  'A rule that decides when to run the next step (e.g., if the value is over €500).',
              },
              {
                term: 'Webhook',
                definition:
                  'A real-time message that another system sends to an address you specify. In a workflow, it can act as a trigger type.',
              },
              {
                term: 'Hosting (PaaS)',
                definition:
                  'Where your app, API, or agent runs continuously (e.g. Railway, Render, Fly.io).',
              },
              {
                term: 'Always-on run',
                definition:
                  'A mode where the program keeps listening for events instead of running only on a schedule.',
              },
              {
                term: 'GitHub (repo)',
                definition:
                  'Where custom code and versions are stored before a hosting platform runs them.',
              },
              {
                term: 'RPA',
                definition:
                  'Robotic clicking of a user interface when there is no usable API.',
              },
              {
                term: 'AI Act / compliance',
                definition:
                  'Rules for high-risk AI use (transparency, human oversight, data protection) in your region.',
              },
              {
                term: 'Coordinator',
                definition:
                  'Breaks the job into sub-tasks, assigns roles, and sets handoff rules.',
              },
              {
                term: 'Evaluator',
                definition:
                  'Checks criteria and sends work back with specific fixes when something fails.',
              },
              {
                term: 'Router',
                definition:
                  'A first step that sorts requests by type before a coordinator or specialist works on them.',
              },
              {
                term: 'ReAct',
                definition:
                  'A loop: think about the next step, call a tool, observe, then decide again.',
              },
            ],
          },
        },
        {
          id: 10.8,
          title: 'Module 10 summary',
          subtitle: 'What you learned – agent cycle, tools, prompts',
          content: {
            introHeading: 'What you learned',
            introBody:
              'Congratulations! Key wins: agent depth (Chat → Flow) and roles, 5 workflow patterns, 3A, a closed learning loop, AI with tools, prompts, and error handling.',
            stats: [
              { label: 'Depth levels + roles', value: '8' },
              { label: 'Workflow patterns', value: '5' },
              { label: 'Workflow brief', value: '1' },
            ],
            sections: [
              {
                heading: 'Depth and multi-agent',
                items: [
                  'Chat → Agent → Team → Flow',
                  'Coordinator, specialist, evaluator, router',
                  '5 workflow patterns for business',
                ],
              },
              {
                heading: '3A, learning loop and safety',
                items: [
                  'Automate 80 % / Augment 15 % / Autonomize 5 %',
                  'Closed learning loop: history → check → lessons → update',
                  'Human approval, error handling and AI agent QC tests',
                ],
              },
              {
                heading: 'Prompts and workflow ticket',
                items: [
                  '5-part agent template + error handling',
                  'Trigger → Condition → Action; tool selection',
                  '1-page workflow brief before practice',
                ],
              },
              {
                heading: 'Where to apply',
                items: [
                  'Sales: inquiry form → CRM and email. Risk: duplicates. Metric: conversion',
                  'People ops: CV received → filter, then a person approves. Risk: uneven screening. Metric: time to hire',
                  'Finance: invoice → scan and check. Risk: wrong numbers. Metric: processing time',
                  'Customer service: complaint → sort and draft. Risk: the wrong tone. Metric: first response time',
                ],
              },
            ],
            reflectionPrompt:
              'META: You are a learning reflection assistant. Goal – help me consolidate what I learned in Module 10.\nINPUT: I just finished training on AI agents – depth (Chat→Flow), multi-agent work, 5 workflow patterns, 3A, closed learning loop and prompts.\nOUTPUT: Ask 3 questions: (1) Which agent scenario could I apply today? (2) Which lesson after a trial would I want to capture? (3) What do I want to try first? After my answers, give one concrete tip (15 minutes or less, named tool or file).',
            reflectionTitle: 'Reflection prompt',
            tagline:
              'Agent = steps + tools + limits – your foundation for automation.',
            nextStepCTA: 'Go to Module 11: Knowledge check (Agent path)',
            firstAction24h:
              'Today open one AI tool with its tools enabled (search or Tools) and run one agent query with “Use search and provide sources”.',
            abilityBefore:
              'You mixed agents with a plain chat that has no tools or limits.',
            abilityAfter:
              'You can choose depth, tools, and human control in an agent workflow.',
          },
        },
      ],
      businessExamples: [
        {
          title: 'Agent cycle and tools',
          description: 'Trigger → action → artifacts with AI',
        },
        {
          title: 'Integrations and automation',
          description: 'AI with search, API, tools',
        },
      ],
    },
    {
      id: 11,
      title: 'Knowledge check (Agent path)',
      subtitle: 'Test before the agent project',
      description:
        'Check agent flow and tools. ≥70 % recommended before Module 12.',
      duration: '10–12 min',
      slides: [
        {
          id: 110,
          title: 'Module 11 test',
          subtitle: 'Agent engineering knowledge',
          content: {
            whyBenefit:
              'After this test, you will know whether you are ready for the final Agent engineering project (Module 12).',
            duration: '~10–12 min',
            firstActionCTA:
              'Press “Continue” – 9 questions with explanations (cycle, 3A, roles, workflow).',
            microWinPhrase:
              'Each correct answer shows you are ready to design agents.',
            thresholdExplanation:
              'When you reach ≥70 %, you can go to Module 12 (project). If your score is lower – review the Module 10 slides.',
          },
        },
        {
          id: 110.5,
          title: 'Warm-up before the test',
          shortTitle: 'Warm-up',
          subtitle: '3 questions: agent vs prompt, 3A, orchestration',
          content: {
            questions: [
              {
                id: 'm11-warm-1',
                question:
                  'When is it worth choosing an agent over a plain prompt?',
                options: [
                  'When you need several steps, tools, or a decision, or when you have to repeat an action',
                  'When you need one short answer with no search',
                  'When you only want a nicer tone',
                  'When the prompt is longer than 2 sentences',
                ],
                correct: 0,
                explanation:
                  'An agent fits complex tasks with steps and tools. For one clear answer, a plain prompt is often enough.',
              },
              {
                id: 'm11-warm-2',
                question: 'Which 3A band means “human decides, AI helps”?',
                options: [
                  'Augment (15 %)',
                  'Automate (80 %)',
                  'Autonomize (5 %)',
                  'Only L0 taxonomy',
                ],
                correct: 0,
                explanation:
                  'Augment – the human stays in charge of the decision; AI provides summaries, recommendations, or drafts before approval.',
              },
              {
                id: 'm11-warm-3',
                question:
                  'What should you prepare first before the Module 12 project?',
                options: [
                  'One 5-part agent prompt and a skeleton of the minimal workflow brief',
                  'Only a tool logo',
                  'Only a long theoretical explanation without a process',
                  'Only a platform account without test cases',
                ],
                correct: 0,
                explanation:
                  'Module 12 needs an artifact: an agent prompt, a workflow skeleton, tests, and a human-control rule. A platform account is not the only path.',
              },
            ],
          },
        },
        {
          id: 111,
          title: 'Questions',
          subtitle: 'Agent cycle, tools, prompts',
          testQuestions: [
            {
              id: 'm11-q1',
              type: 'scenario',
              bloomLevel: 3,
              scenarioContext:
                'An AI agent gives a confident answer but cites no sources, even though the task needed up-to-date facts.',
              question: 'What should you fix first?',
              options: [
                'Clearly specify the tool and the rule: use search and provide sources; if you cannot find any, write “Not found”',
                'Ask the model to judge, before answering, whether the information might be outdated',
                'Add a rule: answer only with what you are completely sure about',
                'Keep the same prompt and just ask again',
              ],
              correct: 0,
              explanation:
                'The agent needs clear context: which tool to use, when to provide sources, and what to return when sources are missing. Confidence is not the same as sources – that lowers the risk of invented facts.',
              relatedSlideId: 10.3,
            },
            {
              id: 'm11-q2',
              type: 'scenario',
              bloomLevel: 3,
              scenarioContext:
                'The process repeats every day: form data moves into a sheet and a confirmation email is sent. The risk is low, and a human almost never decides.',
              question: 'Which 3A band fits best?',
              options: [
                'Automate',
                'Augment',
                'Autonomize',
                'Do not automate',
              ],
              correct: 0,
              explanation:
                'This is a clear, repeatable, low-risk process. The Automate band removes manual work, and a human does not have to approve any step.',
              relatedSlideId: 10.25,
            },
            {
              id: 'm11-q3',
              type: 'mcq',
              question:
                'How does an evaluator differ from a specialist in a multi-agent system?',
              options: [
                'The evaluator checks another agent’s result against criteria; the specialist does the assigned domain task',
                'The evaluator decides which specialist gets the task; the specialist checks final quality',
                'The evaluator changes the workflow at runtime; the specialist only gathers facts',
                'The difference is mostly the model used, not the responsibility',
              ],
              correct: 0,
              explanation:
                'The specialist does a narrow part (search, draft). The evaluator checks the criteria and can send the work back for revision – it does not assign the work.',
              relatedSlideId: 10.45,
            },
            {
              id: 'm11-q4',
              type: 'mcq',
              question:
                'What should you do when the agent cannot complete the task?',
              options: [
                'Nothing – wait',
                'Specify in the system or user prompt: write “Failed” and the reason',
                'Turn off tools',
                'Repeat the same prompt',
              ],
              correct: 1,
              explanation:
                'Error handling – clearly state what to return (e.g. “Failed: [reason]” and a suggestion of what to fix).',
              relatedSlideId: 10.6,
            },
            {
              id: 'm11-q5',
              type: 'scenario',
              bloomLevel: 3,
              scenarioContext:
                'Before the Module 12 practice, you have a process idea, but it is still unclear what starts the flow, which fields are required, and what happens when a step fails.',
              question: 'Which artifact reduces risk first?',
              options: [
                'A minimal workflow brief: trigger, input schema, actions, errors, tests, and human control',
                'Only platform choice without fields',
                'Only a nicer tone in the answer',
                'Only one generic prompt without tests',
              ],
              correct: 0,
              explanation:
                'The minimal brief turns an idea into a testable specification: what starts it, what data moves, what happens on error, and when a human steps in.',
              relatedSlideId: 10.64,
            },
            {
              id: 'm11-q6',
              type: 'scenario',
              bloomLevel: 3,
              scenarioContext:
                'You receive a long purchase request and want a researcher to gather the facts, a writer to prepare a summary, and an evaluator to check the criteria.',
              question: 'Which workflow pattern fits best?',
              options: [
                'A coordinator that dynamically assigns tasks to specialists',
                'A sequential chain: researcher → writer → evaluator',
                'Routing by request type',
                'Parallel work: three roles at once, without merging',
              ],
              correct: 1,
              explanation:
                'The steps run one after another, so a chain fits. A coordinator is needed when the task is split dynamically, not when the sequence is fixed.',
              relatedSlideId: 10.48,
            },
            {
              id: 'm11-q7',
              type: 'mcq',
              bloomLevel: 3,
              question:
                'Scenario: a client fills in a form on your website; you want the new entry to go into Google Sheets and the client to get an email confirmation. What should you do first when designing the flow (Zapier, Make, etc.)?',
              options: [
                'Define the trigger – what starts the flow (e.g. a new form submission) – then the actions (Sheets, email)',
                'First pick a platform (Zapier, Make, or n8n) and define the trigger later',
                'First write the confirmation email in an AI chat, and connect the form later',
                'First map every Sheets column, and only then decide what starts the flow',
              ],
              correct: 0,
              explanation:
                'First – the event that starts the flow (the trigger) and the input schema; then the actions (entry, email). This makes it clear what starts the chain and what data moves.',
              relatedSlideId: 10.15,
            },
            {
              id: 'm11-q8',
              type: 'scenario',
              bloomLevel: 3,
              scenarioContext:
                'A workflow prepares a reply to a client and sometimes handles personal data. A wrong reply would be hard to undo. The flow is not yet validated on real cases.',
              question: 'Which human-control mode fits best?',
              options: [
                'Exception review: standard cases are automatic; risky ones go to a human',
                'Results monitoring only: the human sees just a weekly summary',
                'After-the-fact check: send immediately, then review a sample later',
                'Human approval before sending, until the flow is validated enough',
              ],
              correct: 3,
              explanation:
                'Until the flow is validated, and a mistake is hard to undo and sometimes involves personal data, a human approves before sending. Exception review fits only when the system can reliably separate routine cases from risk.',
              relatedSlideId: 10.26,
            },
            {
              id: 'm11-q9',
              type: 'mcq',
              bloomLevel: 3,
              question:
                'Scenario: the agent completed the task, but the result was inaccurate. After analyzing the error, you see the cause. What do you need to do to close the learning loop instead of only describing the problem?',
              options: [
                'Update the rule, prompt, skill or test based on the root cause – do not only write down what happened',
                'Write a note in a list and continue with the same prompt',
                'Make the agent’s answer longer',
                'Run the same request again without changes',
              ],
              correct: 0,
              explanation:
                'The learning loop closes only when the lesson becomes a concrete update: a rule, prompt, skill or test. Stating the fact alone does not finish the loop.',
              relatedSlideId: 10.49,
            },
          ],
        },
        {
          id: 112,
          title: 'Results',
          subtitle: 'Ready for Module 12?',
          content: {
            passedMessage:
              'Congratulations! You are ready for the Agent engineering project (Module 12).',
            failedMessage:
              'It is worth reviewing the Module 10 topics: the agent cycle, 3A bands (depth and roles), coordinator and specialist roles, workflow patterns, tools, error handling, and Zapier / Make integrations.',
            thresholdExplanation:
              'When you reach ≥70 %, you can go to Module 12. If it is lower – review the agent cycle, 3A, multi-agent roles, workflow patterns, and prompt safeguards.',
            useCaseBlock: {
              heading: 'Where to apply?',
              body: 'Depth and roles, multi-agent work, workflow (trigger, action), 3A and tools – research, reports, support request sorting, RFP analysis.',
              blockVariant: 'accent',
            },
            reflectionTitle: 'Reflection prompt',
            reflectionPrompt:
              'META: You are a learning reflection assistant. Goal – consolidate knowledge after the Agent path test.\nINPUT: I just finished the Module 11 knowledge check – agent cycle, 3A, workflow patterns, tools and prompt safeguards.\nOUTPUT: Ask 3 questions: (1) Which agent step (trigger, action, or human approval) will I do within 24 hours? (2) Which test question would I most likely get wrong at work – what will I review? (3) Which safeguard (limits or approval) will I write down before the project? After my answers, give one concrete tip (15 minutes or less, named tool or file).',
          },
        },
        {
          id: 113,
          title: 'Bonus: agent chain in 5 minutes',
          shortTitle: 'Bonus: agent chain',
          subtitle: 'Coordinator → specialist → evaluator',
          content: {
            sections: [
              {
                heading: 'In short',
                body: 'After the test, you can try a mini agent chain in 5 minutes without Zapier or Make: 3 separate AI chats, a clear handoff, and one quality check.',
                blockVariant: 'accent',
              },
              {
                heading: 'Do this now',
                body: 'Pick a small process: an RFP summary, weekly sales, or a client complaint. Run the prompt pack below and note what you pass from one role to the next.',
                blockVariant: 'brand',
              },
              {
                heading: 'Copyable prompt pack',
                body: 'Use these prompts in 3 separate AI chats.',
                copyable:
                  'COORDINATOR: Task: [DESCRIBE]. Split into 2 sub-tasks, assign a specialist and an evaluator. Specify input, output and the handoff rule.\n\nSPECIALIST: Input: [COORDINATOR PLAN]. Do the assigned work. Output: short summary, facts, unknowns.\n\nEVALUATOR: Check the specialist’s output against the criteria: facts, clarity, risk. If data is missing – return a revision list.',
              },
              {
                heading: 'Check',
                body: 'Do you have a clear handoff rule and 1 test case where data is missing? If yes – you are ready for the Module 12 quick start with prompts only (Coordinator + 2 specialists).',
                blockVariant: 'accent',
              },
            ],
            footer: 'Next – Module 12: Agent project',
          },
        },
      ],
      businessExamples: [
        {
          title: 'Agent cycle and prompts',
          description: 'Questions on flow and result',
        },
        {
          title: 'Tools and integrations',
          description: 'Search and systems with AI',
        },
      ],
      transfer: {
        abilityBefore:
          'Agent ideas stayed theoretical – no clear check before practice.',
        abilityAfter:
          'You can check agent depth, tools, and human control before the project.',
        firstAction24h:
          'Today run one agent-style request with tools and note where a human decision was needed.',
        nextStepCTA:
          'Go to the Module 12 project – build a multi-agent quick start.',
      },
    },
  ],
};

// Module 12 – appended in second part due to size
en.modules.push({
  id: 12,
  title: 'Final project (Agent path)',
  subtitle: 'One full agent or automation scenario',
  description:
    'Build one agent or automation scenario – continuation of M10 and M11 (Agent path).',
  duration: '20–30 min',
  slides: [
    {
      id: 120,
      title: 'Agent engineering project',
      subtitle: 'Prompt start + 3 full practices with artifacts',
      content: {
        whyBenefit:
          'Choose how to start Module 12 and build one agent workflow with clear artifacts: a schema, a test case, and the required 3A practices.',
        duration: '~20–30 min start; ~60–90 min for all 3 practices',
        minScenariosToComplete: 3,
        requiredSlideIds: [121, 122, 123],
        recommendedPathId: 'guided',
        pathChoices: [
          {
            id: 'guided',
            label: 'Recommended: guided path',
            description:
              '3A orientation → schema → checkpoint → quick start → 3 required practices.',
            statusHint:
              'Best for starting: press “Start selected path” or the top “Continue” button. Both take you to the 3A orientation.',
            recommended: true,
            slideId: 120.25,
          },
          {
            id: 'promptStart',
            label: 'Quick start with prompts only',
            description:
              'Coordinator + 2 specialists → Research agent. After the examples, return to the 3 required 3A practices.',
            statusHint:
              'Use this if you first want to see an agent role setup without extra tools.',
            slideId: 124.5,
          },
          {
            id: 'threePractices',
            label: 'Have a process: go to 3A practices',
            description:
              'If you already have a clear process and tool, start with the Automate practice.',
            statusHint:
              'Use this if you already know what you will automate and want to build the required artifact now.',
            slideId: 121,
          },
        ],
        roiTemplate: {
          heading: 'Return on investment (ROI) mini calculator',
          body:
            'If you need to decide whether automation is worth it, calculate the monthly value: tasks per week × minutes saved ÷ 60 × hourly rate × 4.33 − monthly tool and maintenance cost.',
          copyable:
            'Return on investment (ROI) calculation:\nProcess: [e.g. RFP summary]\nTasks per week: [number]\nMinutes saved per task: [number]\nHourly rate: [$]\nMonthly tool and maintenance cost: [$]\n\nMonthly value: tasks per week × minutes saved ÷ 60 × hourly rate × 4.33 − monthly cost.\n\nNow: [savings]\nAfter 3 months: [savings]\nAfter 12 months: [savings]\n\nDecision: is it worth automating, augmenting, or keeping it manual?',
        },
      },
    },
    {
      id: 120.25,
      title: 'Three practices: Automate, Augment, Autonomize',
      subtitle: 'Diagram – where human approval is needed',
      content: {
        preCopyCheckBlock: {
          question:
            'In the Augment band (Email → AI → Approve → Send) – which point needs a human?',
          options: [
            'Every step',
            'Only Approve (before Send)',
            'Only the final Slack / notification',
            'Nowhere – no human is needed',
          ],
          correct: 1,
          explanation:
            'Augment = AI drafts and a human approves before sending. Automate – little human decision-making; Autonomize – a human at escalation / QA.',
        },
        sections: [
          {
            heading: 'In short',
            body: 'The three M12 practices match 3A: **Automate (80 %)** – rules; **Augment (15 %)** – human + AI; **Autonomize (5 %)** – limited autonomy. Pick a band below – then copy the template.',
            blockVariant: 'accent',
          },
          {
            heading: 'Comparison',
            body: 'Three flows side by side – the **highlighted point** is where a human is needed (Augment / Autonomize).',
            image: 'm12_three_labs',
            blockVariant: 'brand',
          },
          {
            heading: 'Do this now',
            body: 'Pick **one** 3A band for your process. After you pick, you will see only that band’s template.',
            blockVariant: 'brand',
            toolChoiceBar: {
              question: 'Which 3A band fits your process?',
              autoSelect: false,
              choices: [
                {
                  label: 'Automate',
                  rowIndex: 0,
                  whenHint:
                    '**Yes:** clear rules, few decisions. **No:** you need human approval before an action.',
                },
                {
                  label: 'Augment',
                  rowIndex: 1,
                  whenHint:
                    '**Yes:** AI draft + human approves. **No:** pure rules with no review.',
                },
                {
                  label: 'Autonomize',
                  rowIndex: 2,
                  whenHint:
                    '**Yes:** limited autonomy + escalation / QA. **No:** a human approves every step.',
                },
              ],
            },
          },
          {
            heading: 'Template – Automate',
            body: 'Fill the [ ] fields – then go to **Practice 1** (Automate).',
            copyable:
              'My process: [e.g. Form → CRM → email → Slack]\n3A band: Automate\nHuman point: (no gate – little decision)\nWhy (1 sentence): [ ]\nNext: Practice 1 (Automate)',
            linkedRowIndex: 0,
          },
          {
            heading: 'Template – Augment',
            body: 'Fill the [ ] fields – then go to **Practice 2** (Augment).',
            copyable:
              'My process: [e.g. customer email summary]\n3A band: Augment\nHuman point: Approve (before Send)\nWhy (1 sentence): [ ]\nNext: Practice 2 (Augment)',
            linkedRowIndex: 1,
          },
          {
            heading: 'Template – Autonomize',
            body: 'Fill the [ ] fields – then go to **Practice 3** (Autonomize).',
            copyable:
              'My process: [e.g. reviews → sentiment → escalation]\n3A band: Autonomize\nHuman point: Escalation / QA\nWhy (1 sentence): [ ]\nNext: Practice 3 (Autonomize)',
            linkedRowIndex: 2,
          },
          {
            heading: 'Check',
            body: '1) Can you name the **human point** in your band?\n2) Which M12 practice (1 / 2 / 3) do you open next?\n\nIf the band is unclear – go back to M10 **3A strategy** before the practice.',
            blockVariant: 'accent',
          },
        ],
        footer: 'Next – slide 3: Multi-agent schema',
      },
    },
    {
      id: 120.5,
      title: 'Business multi-agent schema',
      shortTitle: 'Multi-agent schema',
      subtitle: 'Input → roles → evaluator → output (+ human approval)',
      content: {
        whyBenefit:
          'You will understand when one AI is not enough and how to split work without coding. You saw the full orchestration walkthrough in the **Agent orchestration simulation** slide – here are only the practice map and the handoff rule and handoff rule. Practice – Coordinator + 2 specialists (quick start).',
        sections: [
          {
            heading: 'In short',
            body: 'When one model is not enough, split work across roles and close it with a quality gate.',
            blockVariant: 'accent',
          },
          {
            heading: 'Business multi-agent schema',
            body: 'The coordinator does not do the work — it assigns specialists, merges their output, and hands it to the evaluator.',
            image: 'm12_multi_agent_schema',
            blockVariant: 'brand',
          },
          {
            heading: 'Handoff',
            body: 'Passing to the next role needs a clear rule: “When the specialist finishes X, pass it to the evaluator in format Y.” Without a handoff rule, a multi-agent setup becomes chaotic.',
            blockVariant: 'brand',
          },
          {
            heading: 'Do this now',
            body: 'Write **one handoff rule** for your scenario. Copy the template.',
            blockVariant: 'brand',
          },
          {
            heading: 'Copyable template',
            body: 'Handoff rule.',
            copyable:
              'From role: [ROLE A]. To role: [ROLE B].\nI pass: [WHAT]. Format: JSON / table / text.\n\nIf you choose JSON, use fields:\n{\n  "task_id": "[ID]",\n  "source_role": "[ROLE A]",\n  "target_role": "[ROLE B]",\n  "payload": "[WHAT I PASS]",\n  "quality_gate": "[WHAT TO CHECK]",\n  "human_review": "[WHEN TO HUMAN]"\n}\n\nReturn to evaluator / human when: [CONDITION].',
          },
          {
            heading: 'Check',
            body: 'Is it clear **what** the next role gets and **when** to escalate to a human? If not – tighten the rule.',
            blockVariant: 'accent',
          },
        ],
        footer: 'Next – slide 4: Checkpoint',
      },
    },
    {
      id: 120.55,
      title: 'Checkpoint: multi-agent schema',
      shortTitle: 'Checkpoint',
      subtitle: 'Agent practice path – check the schema before practice',
      content: {
        title: 'Do you understand the multi-agent schema?',
        pathLabel: 'Agent practice path',
        stepNumber: 1,
        stepTotal: 1,
        body: 'Before the 3A practices, quickly check that you understand the work split. Mark this step done when you can name which role does what and where human approval is needed.',
        sections: [
          {
            heading: 'What to check',
            body: 'Can you name the chain: **Input → Coordinator → 2 specialists → Evaluator → Output**? Do you know where **human control** sits?',
          },
          {
            heading: 'Mini trial (1 min)',
            body: 'Copy the prompt and run one coordinator + specialist pair for your topic.',
            copyable:
              'You are the coordinator. Task: [DESCRIBE]. 1. Split into 2 parts. 2. Write a separate specialist prompt for each part. 3. Specify how the specialist hands off to the evaluator (format). 4. Add one human-approval point before the final output.',
          },
          {
            heading: 'If unclear',
            body: 'Go back to the **Business multi-agent schema** slide and review the handoff rule again.',
          },
        ],
        footer: 'Next – slide 5: Quick start',
      },
    },
    {
      id: 121,
      title: 'Practice 1: Automate (80 %)',
      subtitle: 'Form → Sheets / CRM → email → Slack / Teams (Zapier or Make)',
      scenario: {
        narrativeLead:
          'Pick a form and destinations (Sheets/CRM, email, Slack or Teams). Build the workflow and record artifacts.',
        situation:
          'Automate (80 %): rule-based flows – form to CRM, email, and team notification without manual decisions at each step.',
        context:
          'Build a workflow: Form (Google Forms / Typeform) → Sheets or CRM → personalized email → Slack / Teams. Tool: Zapier or Make.',
        data: 'Rule-based flows. Task: build a working workflow and record artifacts – diagram, field mapping, tests, log evidence.',
        constraints:
          'Use Zapier or Make (free tier is enough). If you do not have an account, use ChatGPT to generate a platform-ready build guide from the Zapier / Make template in the **Business automation tools** slide. Describe what to do if the API does not respond (error handling).',
        expectedFormat:
          'Artifacts: 1-page workflow spec or platform-ready implementation guide (trigger, input schema, conditions, actions, output, error handling), field mapping, at least 2 test cases, log / screenshot evidence or document excerpts.',
      },
      practicalTask: {
        title: 'Record workflow and artifacts (Automate)',
        placeholder:
          'Enter or paste your workflow description, field mapping and test case summary…',
        templateLabel: 'Workflow specification – template',
        template:
          'Trigger: [e.g. new form submission]\nInput: [required fields]\nCondition: [if needed]\nActions: (1) Sheets/CRM (2) email (3) Slack/Teams\nOutput: [what the team gets]\nErrors: [what to do if the API does not respond]\nTest 1 (happy path): [ ]\nTest 2 (error): [ ]',
        explanation: 'Artifacts prove the workflow was built and tested.',
        instructions: {
          title: 'Steps and artifacts',
          steps: [
            {
              step: 1,
              title: 'Build workflow or prepare an implementation guide',
              description:
                'If you have an account, use Zapier or Make. If not, generate a Zapier / Make specification with ChatGPT.',
              hint:
                'Hint: if you do not have an account, describe the same flow as a modules / nodes specification.',
              partialSolution:
                'Partial skeleton: trigger → fields → actions → errors → tests.',
            },
            {
              step: 2,
              title: 'Fill in the 1-page workflow specification',
              description:
                'Use the same structure as the **Minimal workflow brief** (trigger → errors + 2 tests).',
              hint:
                'Hint: start from the A/B/C parts in the **Minimal workflow brief** slide.',
              partialSolution:
                'Partial skeleton: A. flow; B. success and error tests; C. human-decision rule.',
            },
            {
              step: 3,
              title: 'Field mapping: form field → CRM/Sheets column',
              description: 'Short table or list.',
              hint: 'Hint: list at least 3 fields and where each one goes.',
              partialSolution:
                'Partial example: email → CRM email field; name → CRM name; topic → Slack message.',
            },
            {
              step: 4,
              title: 'Write min. 2 test cases and capture logs/screenshots',
              description: 'Successful run + one error case.',
              hint:
                'Hint: one test should be successful; the other should use a missing field or API error.',
              partialSolution:
                'Partial example: Test 1 – all fields are filled; Test 2 – email is missing, so the flow stops and asks for a fix.',
            },
          ],
        },
      },
      content: {
        scenarioTitle: 'Practice 1: Automate (80 %)',
        scenarioDescription:
          'Rule-based flows. Build a workflow: Form (Google Forms / Typeform) → Sheets or CRM → personalized email → Slack / Teams. Tool: Zapier or Make. Artifacts: workflow diagram (1 p.), field mapping, min. 2 test cases, logs/screenshots.',
        scenario: {
          narrativeLead:
            'Pick a form and destinations (Sheets/CRM, email, Slack or Teams). Build the workflow and record artifacts.',
        },
        template:
          'Trigger: [e.g. new form submission]\nInput: [required fields]\nCondition: [if needed]\nActions: (1) Sheets/CRM (2) email (3) Slack/Teams\nOutput: [what the team gets]\nErrors: [what to do if the API does not respond]\nTest 1 (happy path): [ ]\nTest 2 (error): [ ]',
        templateLabel: 'Workflow specification – template',
        instructions: {
          title: 'Steps and artifacts',
          steps: [
            {
              step: 1,
              title: 'Build workflow or prepare an implementation guide',
              description:
                'If you have an account, use Zapier or Make. If not, generate a Zapier / Make specification with ChatGPT.',
            },
            {
              step: 2,
              title: 'Fill in the 1-page workflow specification',
              description:
                'Use the same structure as the **Minimal workflow brief** (trigger → errors + 2 tests).',
            },
            {
              step: 3,
              title: 'Field mapping: form field → CRM/Sheets column',
              description: 'Short table or list.',
            },
            {
              step: 4,
              title: 'Write min. 2 test cases and capture logs/screenshots',
              description: 'Successful run + one error case.',
            },
          ],
        },
      },
    },
    {
      id: 122,
      title: 'Practice 2: Augment (15 %)',
      subtitle: 'Email → AI summary → human approval → send',
      scenario: {
        narrativeLead:
          'Build a workflow with an AI summary step and human approval. Record the prompt and the rules.',
        situation:
          'Augment (15 %): human decides, AI helps – e.g. email → summary → approval before send.',
        context:
          'Flow: incoming email → AI summary (e.g. ChatGPT or Make AI module) → human approval before send → send.',
        data: 'Task: build workflow and prepare artifacts – a diagram, a summary prompt template, a description of the approval step, and 1–2 test cases.',
        constraints:
          'Use Make or Zapier with an AI module. If you do not have an account or AI module, use ChatGPT to generate a Make / Zapier implementation guide: modules, fields, summary prompt, approval rule, and tests. Clearly describe who sees the summary and who approves exceptions.',
        expectedFormat:
          'Artifacts: workflow diagram or platform-ready implementation guide, summary prompt, approval rule, 1–2 test cases.',
      },
      practicalTask: {
        title: 'Record the Augment workflow and artifacts',
        placeholder:
          'Enter workflow summary, summary prompt and approval rules…',
        templateLabel: 'Summary template and approval rule',
        template:
          'Summary prompt: From this email extract: (1) sender and date, (2) main topic in one sentence, (3) 3–5 bullet points. Human-in-the-loop: before sending, a human approves or edits the draft.\n\nEVALUATOR PROMPT: Check the summary: (1) tone suitable for client, (2) facts match original, (3) no excess personal data. If not – return a list of fixes.',
        explanation: 'Human approval reduces the risk of sending a wrong reply automatically.',
        instructions: {
          title: 'Steps and artifacts',
          steps: [
            {
              step: 1,
              title:
                'Build workflow: trigger (new email) → AI summary → approval step → send',
              description:
                'Use Make or Zapier with an AI module, or prepare the same flow as an implementation guide.',
              hint: 'If you do not have an AI module, generate a platform specification with ChatGPT: modules, prompt, approval, tests.',
              partialSolution:
                'Without an account, a document with trigger, summary prompt, approval rule, and tests is enough.',
            },
            {
              step: 2,
              title:
                'Write the summary prompt template and a description of the approval step',
              description: 'Who sees, who approves, what to do if rejected.',
              hint:
                'Hint: reuse the rule generated on **When does a human approve?** as your starting point.',
              partialSolution:
                'Partial example: mode – exception review; condition – send to a human when the reply goes to a client, contains personal data, or has an unclear fact; rejection – stop sending; audit – approver, time, decision.',
            },
            {
              step: 3,
              title: 'Write 1–2 test cases and a workflow diagram (1 p.)',
              description: 'Happy path + one edge case.',
              hint:
                'Hint: test one standard email and one risky email or one with personal data.',
              partialSolution:
                'Partial example: happy path – summary approved; edge case – summary rejected and returned for revision.',
            },
          ],
        },
      },
      content: {
        scenarioTitle: 'Practice 2: Augment (15 %)',
        scenarioDescription:
          'Human decides, AI helps. Flow: incoming email → AI summary (e.g. ChatGPT/Make AI module) → human approval before send → send. Artifacts: workflow a diagram, a summary prompt template, a description of the approval step, and 1–2 test cases.',
        scenario: {
          narrativeLead:
            'Build a workflow with an AI summary step and human approval. Record the prompt and the rules.',
        },
        template:
          'Summary prompt: From this email extract: (1) sender and date, (2) main topic in one sentence, (3) 3–5 bullet points. Human-in-the-loop: before sending, a human approves or edits the draft.\n\nEVALUATOR PROMPT: Check the summary: (1) tone suitable for client, (2) facts match original, (3) no excess personal data. If not – return a list of fixes.',
        templateLabel: 'Summary template and approval rule',
        instructions: {
          title: 'Steps and artifacts',
          steps: [
            {
              step: 1,
              title:
                'Build workflow: trigger (new email) → AI summary → approval step → send',
              description:
                'Use Make or Zapier with an AI module, or prepare the same flow as an implementation guide.',
            },
            {
              step: 2,
              title:
                'Write the summary prompt template and a description of the approval step',
              description: 'Who sees, who approves, what to do if rejected.',
            },
            {
              step: 3,
              title: 'Write 1–2 test cases and a workflow diagram (1 p.)',
              description: 'Happy path + one edge case.',
            },
          ],
        },
      },
    },
    {
      id: 123,
      title: 'Practice 3: Autonomize (5 %)',
      subtitle: 'Feedback → AI sentiment scoring → escalation → ticket / task',
      scenario: {
        narrativeLead:
          'Build sentiment-based escalation workflow. Define thresholds and what to do in an incident.',
        situation:
          'Autonomize (5 %): An AI agent with limits – feedback, sentiment, escalation to a ticket or a task.',
        context:
          'Flow (roles): **Classifier** → **Sentiment specialist** → **Escalation coordinator** → ticket. Feedback (CRM/form) → sentiment AI → escalation → ticket (Jira, Trello, Teams).',
        data: 'Task: define thresholds and escalation rules, and prepare artifacts – a diagram and a link to the incident playbook.',
        constraints:
          'Use Make, n8n or Zapier with an AI module. If you do not have an account or AI module, use ChatGPT to generate a platform-ready implementation guide from the Make / n8n / Zapier template. State when to create a ticket and which fields to fill.',
        expectedFormat:
          'Artifacts: workflow diagram (1 p.) or platform-ready implementation guide, sentiment threshold definition, escalation rules, link to incident playbook (5 steps) – slide **When the workflow breaks**.',
      },
      practicalTask: {
        title: 'Record autonomous workflow and rules',
        placeholder:
          'Enter sentiment thresholds, escalation rules and workflow summary…',
        templateLabel: 'Sentiment and escalation rules',
        template:
          'First fill **When the workflow breaks**, then this flow.\n\nSentiment thresholds: if the rating is under 3 stars or the sentiment is negative – create a ticket and notify the team. Escalation rule: ticket fields “sentiment”, “original_text” (short).\n\nIncident playbook: stop → record → assess → notify → fix (see **When the workflow breaks**).',
        explanation: 'Clear rules prevent wrong mass escalation.',
        instructions: {
          title: 'Steps and artifacts',
          steps: [
            {
              step: 1,
              title:
                'Build workflow: feedback → sentiment AI → condition (if < threshold) → ticket/task',
              description:
                'Use Make, n8n or Zapier with an AI module, or prepare the same flow as an implementation guide.',
              hint: 'If you do not have an account, generate a platform specification with ChatGPT: nodes / modules, thresholds, escalation, tests.',
              partialSolution:
                'Without an account, a document with trigger, thresholds, fields, escalation, errors and tests is enough.',
            },
            {
              step: 2,
              title: 'Define sentiment thresholds and escalation rules',
              description: 'When to create a ticket and which fields to fill in.',
              hint:
                'Hint: separate two decisions – when to create a ticket and which fields are required.',
              partialSolution:
                'Partial example: create a ticket when the rating is under 3 or the text is negative; fields – sentiment, original text, customer, time.',
            },
            {
              step: 3,
              title:
                'Write workflow diagram (1 p.) and link to incident playbook (5 steps)',
              description:
                '5 steps: stop, record, assess, notify, fix – slide **When the workflow breaks**.',
              hint:
                'Hint: take the incident playbook from **When the workflow breaks**.',
              partialSolution:
                'Partial skeleton: stop → record → assess → notify → fix.',
            },
          ],
        },
      },
      content: {
        scenarioTitle: 'Practice 3: Autonomize (5 %)',
        scenarioDescription:
          'AI agent roles: **Classifier** → **Sentiment specialist** → **Escalation coordinator** → ticket/task. Feedback (CRM/form) → sentiment AI → escalation → ticket (Jira, Trello, Teams).',
        scenario: {
          narrativeLead:
            'Build sentiment-based escalation workflow. Define thresholds and what to do in an incident.',
        },
        template:
          'First fill **When the workflow breaks**, then this flow.\n\nSentiment thresholds: if the rating is under 3 stars or the sentiment is negative – create a ticket and notify the team. Escalation rule: ticket fields “sentiment”, “original_text” (short).\n\nIncident playbook: stop → record → assess → notify → fix (see **When the workflow breaks**).',
        templateLabel: 'Sentiment and escalation rules',
        instructions: {
          title: 'Steps and artifacts',
          steps: [
            {
              step: 1,
              title:
                'Build workflow: feedback → sentiment AI → condition (if < threshold) → ticket/task',
              description:
                'Use Make, n8n or Zapier with an AI module, or prepare the same flow as an implementation guide.',
            },
            {
              step: 2,
              title: 'Define sentiment thresholds and escalation rules',
              description: 'When to create a ticket and which fields to fill in.',
            },
            {
              step: 3,
              title:
                'Write workflow diagram (1 p.) and link to incident playbook (5 steps)',
              description:
                '5 steps: stop, record, assess, notify, fix – slide **When the workflow breaks**.',
            },
          ],
        },
      },
    },
    {
      id: 124,
      title: 'Scenario: Research agent',
      subtitle: 'Search + summary + sources',
      optional: true,
      scenario: {
        narrativeLead:
          'Pick a topic and use the prompt below with search and sources.',
        situation:
          'Optional scenario: research agent – search, summary and sources in one task.',
        context:
          'Task: prepare a source-quality table and a short summary. Copy the prompt into your AI tool and run it with your topic.',
        data: 'Use AI with search enabled. Fill in the placeholders ([TOPIC], [AUDIENCE]).',
        constraints:
          'If there are no sources – write “Not found” and explain why. Do not invent links.',
        expectedFormat:
          'Artifact: a source table, a 5-sentence summary, and a clear “Not found” message if reliable sources are not available.',
      },
      practicalTask: {
        title: 'Complete the research agent task',
        placeholder: 'Paste AI answer summary or your notes on sources…',
        templateLabel: 'Prompt – copy to AI',
        template:
          'You are a research agent with a source-quality rule.\n\nTOPIC: [TOPIC]\nAUDIENCE: [AUDIENCE]\n\nTask:\n1) Find 3–5 reliable sources about the topic.\n2) For each source, return a table: title | link | why to trust it | what the source proves | risk / limitation.\n3) Write a 5-sentence summary in English.\n4) If you cannot find reliable sources, write “Not found” and explain what is missing.\n\nRules: do not invent links; separate fact from interpretation; mark if a source is old or not primary.',
        explanation: 'This prepares you to apply agent thinking without a full workflow tool.',
        instructions: {
          title: 'Steps',
          steps: [
            {
              step: 1,
              title: 'Copy the prompt and paste it into an AI chat with search enabled',
              description:
                'Fill [TOPIC] and [AUDIENCE]. Run it and review the source table.',
              hint:
                'Hint: choose a narrow topic and audience first; review the source table only after the run.',
              partialSolution:
                'Partial example: topic – one process or market; audience – manager / team; after the run, note 3 sources and their risks.',
            },
          ],
        },
      },
      content: {
        scenarioTitle: 'Research agent',
        scenarioDescription:
          'Task: source-quality table + summary. Copy the prompt into your AI tool and run it with your topic.',
        scenario: {
          narrativeLead:
            'Pick a topic and use the prompt below with search and sources.',
        },
        template:
          'You are a research agent with a source-quality rule.\n\nTOPIC: [TOPIC]\nAUDIENCE: [AUDIENCE]\n\nTask:\n1) Find 3–5 reliable sources about the topic.\n2) For each source, return a table: title | link | why to trust it | what the source proves | risk / limitation.\n3) Write a 5-sentence summary in English.\n4) If you cannot find reliable sources, write “Not found” and explain what is missing.\n\nRules: do not invent links; separate fact from interpretation; mark if a source is old or not primary.',
        templateLabel: 'Prompt – copy to AI',
        instructions: {
          title: 'Steps',
          steps: [
            {
              step: 1,
              title: 'Copy the prompt and paste it into an AI chat with search enabled',
              description:
                'Fill [TOPIC] and [AUDIENCE]. Run it and review the source table.',
            },
          ],
        },
      },
    },
    {
      id: 124.5,
      title: 'Scenario: Coordinator + 2 specialists',
      subtitle: 'Multi-agent prompt pipeline without code',
      scenario: {
        narrativeLead:
          'Run a manual pipeline: 3 separate AI chats with handoff rules. Context: weekly sales summary or RFP research.',
        situation:
          'Recommended start: multi-agent practice in business terms – coordinator, specialist, evaluator.',
        context:
          'Pick a topic (a sales summary or an RFP). Use 3 prompts in separate chats. Record the diagram and 1 test case.',
        data: 'Artifacts: diagram (roles + handoff), 3 prompts, 1 test case (e.g. missing data).',
        constraints:
          'Without Zapier/Make – only prompt orchestration. Human approval before final send.',
        expectedFormat: 'Diagram + 3 copied prompts + test case description.',
      },
      practicalTask: {
        title: 'Multi-agent prompt pipeline',
        placeholder: 'Paste the diagram, the 3 prompts, and a test-case summary…',
        templateLabel: '3 prompts – coordinator, specialist, evaluator',
        template:
          'COORDINATOR: You are the coordinator. Task: [DESCRIBE]. Break the task into 2 subtasks, assign roles, and define the handoff rules.\n\nSPECIALIST: You are [researcher/writer]. Input: [from coordinator]. Do [X]. Output: [format].\n\nEVALUATOR: Check that all criteria are met. If not – return for revision with specific points.\n\nSKILL PACK:\nName: [e.g. RFP summary chain]\nWhen to use: [for which task]\nRoles: coordinator, specialist, evaluator\nSteps: [1–5]\nLimits: what AI does not do / when it asks a human\nCheck: 1 test case + expected answer\nLesson after test: what to update next time',
        explanation:
          'A manual pipeline builds multi-agent thinking without a framework.',
        instructions: {
          title: 'Steps',
          steps: [
            {
              step: 1,
              title: 'Run the coordinator prompt',
              description: 'Get plan with roles and handoff.',
            },
            {
              step: 2,
              title: 'Run the specialist prompt',
              description: 'Pass coordinator output as input.',
            },
            {
              step: 3,
              title: 'Run the evaluator prompt',
              description: 'Check and record 1 test case.',
            },
            {
              step: 4,
              title: 'Write the Skill pack',
              description:
                'Combine the 3 prompts into one reusable Skill pack: name, when to use, roles, steps, limits, check, and lesson.',
            },
          ],
        },
      },
    },
    {
      id: 125,
      title: 'Bonus: revisit Module 10',
      subtitle: 'Reports, tools, error handling – pick one',
      content: {
        whyBenefit:
          'Optional: one Module 10 prompt refresh – pick the topic that matters most to you.',
        sections: [
          {
            heading: 'In short',
            body: 'Three short prompts revisit Module 10 basics. **Pick one** – you do not need to do all.',
            blockVariant: 'accent',
          },
          {
            heading: 'Do this now',
            body: 'Pick one topic below; copy it and run it in your AI tool.',
            blockVariant: 'brand',
          },
          {
            heading: 'Report generator',
            body: 'META + INPUT + OUTPUT – several steps: data → analysis → 1-page report.',
            copyable:
              'META: [ROLE]. INPUT: [DATA]. OUTPUT: 1 page, 3–5 bullet points, English.',
            blockVariant: 'terms',
          },
          {
            heading: 'Tool usage',
            body: 'Enable search or the calculator in your platform and check whether AI used the tool in the answer.',
            copyable:
              'Use [tool – search or calculator] and provide result with short explanation. Task: [DESCRIBE].',
            blockVariant: 'terms',
            collapsible: true,
            collapsedByDefault: true,
          },
          {
            heading: 'Error handling and limits',
            body: 'Add this to the system prompt and try a task without data – AI must clearly say when it cannot complete the task.',
            copyable:
              'If the task cannot be completed: write “Failed: [reason]” and suggest what the user can fix. Never return an empty answer.',
            blockVariant: 'terms',
            collapsible: true,
            collapsedByDefault: true,
          },
          {
            heading: 'Check',
            body: 'Did you copy **one** and run it in AI? If not – go back to Do this now.',
            blockVariant: 'accent',
          },
        ],
        footer: 'Next – slide 11: Project summary',
      },
    },
    {
      id: 128,
      title: 'Project summary',
      subtitle: 'What next?',
      content: {
        introHeading: 'What you learned',
        introBody:
          'Congratulations! You finished the Agent path project: the three required practices are Automate / Augment / Autonomize. The quick start and the research agent are extras, not substitutes. You should leave with a workflow diagram, prompts, a test case, a Skill pack, and templates for later work.',
        stats: [
          { label: 'Required practices', value: '3' },
          { label: 'Scenarios', value: '3' },
          { label: 'Artifacts', value: 'diagram + skill' },
        ],
        sections: [
          {
            heading: 'Three practices and 3A',
            items: [
              'Automate – routine steps without manual work',
              'Augment – AI as a helper with approval',
              'Autonomize – limited autonomy cycles with safeguards',
              'Workflow diagram, trigger → action → webhook – as in Module 10',
            ],
          },
          {
            heading: 'Optional scenarios',
            items: [
              'Form → CRM → email, email → summary → approval',
              'Feedback → sentiment → ticket, research / report with tools',
              'System prompt with limits and clear “Failed” messages',
            ],
          },
          {
            heading: 'Where to apply?',
            items: [
              'Automation: form, CRM, notifications',
              'Augmentation: summaries, drafts with human approval',
              'Autonomy: sentiment, escalation, limited tasks',
              'Research, internal reports, integrations with Zapier / Make / n8n',
            ],
          },
          {
            heading: 'Next step',
            items: [
              'Go to Module 13: Content engineering with AI (images, video, music) – third advanced path.',
              'Or return to module list and repeat agent project with another form or process.',
            ],
          },
        ],
        reflectionTitle: 'Reflection prompt',
        reflectionPrompt:
          'META: You are a learning reflection assistant. Goal – consolidate Agent engineering project results.\nINPUT: I just finished Module 12: a prompt-only multi-agent start or the full 3-practice path. I have a diagram, prompts, one trial, and a skill pack.\nOUTPUT: Ask 3 questions: (1) Which agent or workflow step will I apply within 24 hours? (2) Which lesson do I lock after the first trial? (3) What will I update: a rule, a prompt, a skill, or a test? After my answers, give one concrete tip (15 minutes or less, named tool or file).',
        tagline: '3 practices + artifacts + a lesson learned = a result that improves next time.',
        nextStepCTA: 'Go to Module 13: Content engineering with AI',
        firstAction24h:
          'Within 24–48 hours, run one workflow in your project (Zapier / Make / AI with tools) or repeat the same scenario with another form.',
        abilityBefore:
          'You mixed agents with a plain chat that has no tools or limits.',
        abilityAfter:
          'You have a quick-start pack or a full practice set and you know what to ship next.',
        ownWorkLabel: 'Your company / process',
        ownWorkPlaceholder: 'e.g. lead qualification, content calendar…',
        ownWorkTemplate:
          'META: You are an agent architect.\nINPUT: My process: {{content}}\nTASK: Propose depth (Conversation / Agent / Team / Flow), roles if needed, and the next artifact to build.\nOUTPUT: 5 bullets + one risk.',
      },
    },
  ],
  businessExamples: [
    {
      title: 'Automation scenarios',
      description: '3 required practices + 4 optional scenarios',
    },
    {
      title: 'Capstone – Agent path',
      description: 'Integrated project after M10–M11',
    },
  ],
});

const ltData = JSON.parse(
  readFileSync(join(root, 'src', 'data', 'modules.json'), 'utf8')
);
const fallback = {
  modules: ltData.modules
    .filter((module) => [10, 11, 12].includes(module.id))
    .map(toEnglishFallback),
};
en.modules = mergeArraysById(fallback.modules, en.modules);

/** M10 UX batch (nav/API/3A/HITL/recap) – quality EN overlay; order follows LT via merge. */
const m10UxBatchPath = join(
  root,
  'scripts',
  'data',
  'm10-ux-batch-en-overlay.json'
);
try {
  const m10UxBatch = JSON.parse(readFileSync(m10UxBatchPath, 'utf8'));
  en.modules = mergeArraysById(en.modules, m10UxBatch.modules);
} catch {
  /* optional patch file */
}

/** Sync EN shortTitles + numbered footers from LT §3.6. */
function syncEnFootersFromLt() {
  for (const modId of [10, 11, 12]) {
    const ltMod = ltData.modules.find((m) => m.id === modId);
    const enMod = en.modules.find((m) => m.id === modId);
    if (!ltMod || !enMod) continue;
    for (let i = 0; i < ltMod.slides.length; i++) {
      const ltSlide = ltMod.slides[i];
      const enSlide = enMod.slides[i];
      if (!enSlide) continue;
      if (ltSlide.shortTitle) {
        enSlide.shortTitle =
          SHORT_TITLE_EN[ltSlide.shortTitle] ||
          enSlide.shortTitle ||
          ltSlide.shortTitle;
      }
      // Prefer mapped LT title over generic fallback "AI agent step"
      if (
        typeof ltSlide.title === 'string' &&
        (enSlide.title === 'AI agent step' || !enSlide.title)
      ) {
        enSlide.title =
          SHORT_TITLE_EN[ltSlide.title] ||
          fallbackTitle(ltSlide.title) ||
          enSlide.title;
      }
      const ltFooter = ltSlide?.content?.footer;
      if (typeof ltFooter !== 'string') continue;
      const m = ltFooter.match(/^Toliau – skaidrė (\d+):\s*(.+)$/);
      if (!m) continue;
      const n = Number(m[1]);
      const nextLt = ltMod.slides[i + 1];
      const nextEn = enMod.slides[i + 1];
      if (!nextEn || !nextLt) continue;
      const label =
        (nextLt.shortTitle && SHORT_TITLE_EN[nextLt.shortTitle]) ||
        nextEn.shortTitle ||
        nextEn.title ||
        m[2];
      const prefix = `Next – slide ${n}: `;
      const maxLabel = 55 - prefix.length;
      let L = String(label);
      if (L.length > maxLabel) L = `${L.slice(0, maxLabel - 1).trimEnd()}…`;
      if (!enSlide.content || typeof enSlide.content !== 'object') {
        enSlide.content = {};
      }
      enSlide.content.footer = prefix + L;
    }
  }
}
function toEnglishFallback(value, ctx = {}) {
  if (Array.isArray(value)) {
    return value.map((item, index) =>
      toEnglishFallback(item, {
        ...ctx,
        index,
        path: `${ctx.path ?? ''}[${index}]`,
      })
    );
  }
  if (value && typeof value === 'object') {
    const out = {};
    for (const [key, child] of Object.entries(value)) {
      out[key] = toEnglishFallback(child, {
        ...ctx,
        key,
        path: `${ctx.path ?? ''}.${key}`,
      });
    }
    return out;
  }
  if (typeof value === 'string') return fallbackString(value, ctx);
  return value;
}

function fallbackString(value, ctx) {
  const key = ctx.key ?? '';
  const path = ctx.path ?? '';
  if (key === 'id') return value;
  if (
    [
      'type',
      'icon',
      'color',
      'blockVariant',
      'image',
      'badgeVariant',
      'accent',
      'identityIcon',
      'level',
    ].includes(key)
  ) {
    return value;
  }
  if (key === 'url' || path.includes('.url')) return value;
  if (key === 'footer') return 'Next slide';
  if (key === 'pathLabel') return 'Agent engineering path';
  if (key === 'title' || key === 'shortTitle') return fallbackTitle(value);
  if (key === 'subtitle') return fallbackSubtitle(value);
  if (key === 'heading') return fallbackHeading(value);
  if (key === 'term') return fallbackTerm(value);
  if (key === 'unlockedGlossaryTerms' || path.includes('unlockedGlossaryTerms')) {
    return fallbackTerm(value);
  }
  if (key === 'definition') return enMissing(key, path);
  if (key === 'copyable' || key === 'template' || key === 'reflectionPrompt') {
    return enMissing(key, path);
  }
  if (key === 'templateLabel') return 'Template';
  if (key === 'question')
    return 'Choose the best answer for this agent engineering situation.';
  if (path.includes('.options[')) return fallbackOption(value);
  if (key === 'explanation')
    return 'The best answer keeps the agent goal, tools, limits and error handling clear.';
  if (key === 'passedMessage') return 'Great work! You are ready to continue.';
  if (key === 'failedMessage')
    return 'Review the recommended agent engineering topics before continuing.';
  if (key === 'thresholdExplanation')
    return 'At 70% or more, continue to the next module. Below 70%, review the recommended slides.';
  if (key === 'whyBenefit') return enMissing(key, path);
  if (key === 'firstActionCTA') return enMissing(key, path);
  if (key === 'microWinPhrase') return enMissing(key, path);
  if (
    key === 'abilityBefore' ||
    key === 'abilityAfter' ||
    key === 'firstAction24h' ||
    key === 'nextStepCTA' ||
    key === 'tagline' ||
    key === 'introHeading' ||
    key === 'reflectionTitle'
  ) {
    return enMissing(key, path);
  }
  if (key === 'duration') return value.replace('min', 'min');
  if (key === 'label') return fallbackLabel(value);
  if (key === 'value') return fallbackValue(value);
  if (
    key === 'body' ||
    key === 'description' ||
    key === 'introBody' ||
    key === 'narrativeLead'
  ) {
    return enMissing(key, path);
  }
  if (key === 'scenarioTitle') return fallbackTitle(value);
  if (
    key === 'scenarioDescription' ||
    key === 'situation' ||
    key === 'context' ||
    key === 'data' ||
    key === 'constraints' ||
    key === 'expectedFormat'
  ) {
    return enMissing(key, path);
  }
  if (key === 'taskFrame') {
    // Must be { task, doneWhen } or omitted – a string renders an empty acceptance box.
    return undefined;
  }
  if (key === 'placeholder') return 'Enter your answer here...';
  if (key === 'hint' || key === 'partialSolution')
    return 'Keep the goal, tools and output format explicit.';
  if (
    path.includes('.items[') ||
    path.includes('.outcomes[') ||
    path.includes('.nextSteps[') ||
    path.includes('.recommendedSlideIds[')
  ) {
    return enMissing(key || 'item', path);
  }
  return enMissing(key || 'string', path);
}

function enMissing(key, path) {
  return `__EN_MISSING__:${key}@${path || '(root)'}`;
}

/** Legacy plausible fillers + sentinel – must not ship in modules-en-m10-m12.json. */
const PLAUSIBLE_EN_FILLER_PHRASES = [
  '__EN_MISSING__',
  'Use this step to design, test and improve an AI agent workflow',
  'AI agent workflow step.',
  'A key term used in agent engineering.',
  '"taskFrame": "Task"',
];

function assertNoPlausibleEnFiller(modules) {
  const json = JSON.stringify(modules);
  const hits = PLAUSIBLE_EN_FILLER_PHRASES.filter((phrase) => json.includes(phrase));
  if (hits.length === 0) return;
  const sample = [];
  const walk = (node, path) => {
    if (sample.length >= 8) return;
    if (typeof node === 'string') {
      if (hits.some((h) => node.includes(h) || (h.startsWith('"') && false))) {
        sample.push(`${path}=${node.slice(0, 100)}`);
      } else if (hits.some((h) => !h.startsWith('"') && node.includes(h))) {
        sample.push(`${path}=${node.slice(0, 100)}`);
      }
      return;
    }
    if (Array.isArray(node)) {
      node.forEach((child, i) => walk(child, `${path}[${i}]`));
      return;
    }
    if (node && typeof node === 'object') {
      for (const [k, v] of Object.entries(node)) {
        walk(v, path ? `${path}.${k}` : k);
      }
    }
  };
  walk(modules, '');
  const all = [];
  const walkAll = (node, path) => {
    if (typeof node === 'string') {
      if (node.includes('__EN_MISSING__') || PLAUSIBLE_EN_FILLER_PHRASES.some((h) => !h.startsWith('"') && !h.startsWith('__') && node.includes(h))) {
        all.push(path);
      }
      return;
    }
    if (Array.isArray(node)) {
      node.forEach((child, i) => walkAll(child, `${path}[${i}]`));
      return;
    }
    if (node && typeof node === 'object') {
      for (const [k, v] of Object.entries(node)) {
        walkAll(v, path ? `${path}.${k}` : k);
      }
    }
  };
  walkAll(modules, '');
  writeFileSync(
    join(root, 'tmp', 'en-build-missing.json'),
    JSON.stringify({ hits, count: all.length, paths: all }, null, 2)
  );
  throw new Error(
    `EN build: plausible filler or missing EN left after overlay merge (${hits.join('; ')}). ${all.length} paths → tmp/en-build-missing.json. Examples:\n- ${sample.join('\n- ')}`
  );
}

function fallbackTitle(value) {
  const text = String(value);
  if (SHORT_TITLE_EN[text]) return SHORT_TITLE_EN[text];
  if (text.includes('Kontrolinis taškas') && text.includes('agentų ciklas'))
    return 'Checkpoint: agent cycle';
  if (text.includes('rolės ir perdavimas'))
    return 'Checkpoint: roles and handoff';
  if (text.includes('Kada tvirtina žmogus'))
    return 'When does a human approve?';
  if (text.includes('keli agentai') || text.includes('Keli agentai'))
    return 'Multi-agent to workflow';
  if (text.includes('Uždaro mokymosi ciklas')) return 'Closed learning loop';
  if (text.includes('agentinis promptas')) return 'Checkpoint: agent prompt';
  if (text.includes('Workflow') || text.includes('automatizavimas'))
    return 'Workflow to automation';
  if (text.includes('Savitikra prieš testą')) return 'Warm-up before the test';
  if (text.includes('Bonus') || text.includes('Papildomai'))
    return 'Bonus: agent chain in 5 minutes';
  if (text.includes('Agentų ciklas')) return 'Agent cycle and architecture';
  if (text.includes('Rolės ir sisteminio'))
    return 'Role and system prompt template';
  if (text.includes('Įrankių pasirinkimas')) return 'Tool selection and limits';
  if (text.includes('Kada rinktis agentą')) return 'When to choose an agent';
  if (text.includes('Klaidos tvarkymas')) return 'Error handling and limits';
  if (text.includes('Pagrindinės sąvokos'))
    return 'Core concepts: trigger, action, condition, webhook';
  if (text.includes('Verslo automatizavimo'))
    return 'Business automation tools';
  if (text.includes('Paleidimas'))
    return 'Hosting: where the agent and API run';
  if (text.includes('GitHub')) return 'GitHub as a code source';
  if (text.includes('Minimalus darbo')) return 'Minimal workflow brief';
  if (text.includes('Gilesnė eigos') || text.includes('specifikacija ir testai'))
    return 'Deeper workflow specification';
  if (text.includes('Kai eiga lūžta')) return 'When the workflow breaks';
  if (text.includes('testavimas ir saugumas') || text.includes('Testavimas'))
    return 'Workflow testing and security';
  if (text.includes('QC vertintojas') || text.includes('Agentų QC'))
    return 'Agent QC evaluator';
  if (text.includes('Žodynėlis')) return 'Glossary';
  if (text.includes('santrauka')) return 'Module 10 summary';
  return 'AI agent step';
}

function fallbackSubtitle(value) {
  const text = String(value);
  if (text.includes('žingsnis')) return 'Agent engineering path step';
  if (text.includes('Koordinatorius'))
    return 'Coordinator -> specialist -> evaluator';
  return 'Agent engineering';
}

function fallbackHeading(value) {
  const text = String(value);
  if (text.includes('Trumpai')) return 'In short';
  if (text.includes('Daryk')) return 'Do this now';
  if (text.includes('Kopijuojamas')) return 'Copyable prompt pack';
  if (text.includes('Patikra') || text.includes('Ką patikrinti'))
    return 'Check';
  if (text.includes('Jei')) return 'If it fails';
  if (text.includes('Schema') || text.includes('diagrama')) return 'Diagram';
  if (text.includes('Kitas žingsnis')) return 'Next step';
  return 'Agent engineering step';
}

function fallbackTerm(value) {
  const map = {
    'Agentas (DI)': 'Agent (AI)',
    'Įrankis (tool)': 'Tool',
    'Sisteminis promptas': 'System prompt',
    'Vartotojo promptas': 'User prompt',
    Integracija: 'Integration',
    'Vykdymas (execution)': 'Execution',
    'Ribos (guardrails)': 'Limits (guardrails)',
    'Žmogaus kontrolė (Human-in-the-loop / HITL)': 'Human-in-the-loop (HITL)',
    'Klaidos tvarkymas': 'Error handling',
    'Paleidiklis (trigger)': 'Trigger (event)',
    'Veiksmas (action)': 'Action',
    'Sąlyga (condition)': 'Condition',
    'Internetinis pranešimas (webhook)': 'Webhook',
    'Paleidimo platforma (hostingas, PaaS)': 'Hosting (PaaS)',
    'Nuolatinis veikimas (always-on)': 'Always-on run',
    'GitHub (repo)': 'GitHub (repo)',
    RPA: 'RPA',
    'DI aktas / atitiktis': 'AI Act / compliance',
    Koordinatorius: 'Coordinator',
    Vertintojas: 'Evaluator',
    Maršrutizatorius: 'Router',
    ReAct: 'ReAct',
    'Kelių agentų sistema': 'Multi-agent system',
  };
  return map[value] ?? value;
}

function fallbackOption(value) {
  const text = String(value);
  if (text.includes('Atnaujinti taisyklę'))
    return 'Update the rule, prompt, skill or test based on the root cause';
  if (text.includes('Užrašyti pastabą'))
    return 'Write a note and keep using the same prompt';
  if (text.includes('Padidinti')) return 'Make the agent’s answer longer';
  if (text.includes('Paleisti'))
    return 'Run the same request again without changes';
  return 'A clear option based on goal, tools, limits and checks';
}

function fallbackLabel(value) {
  const text = String(value);
  if (text.includes('Grąžos')) return 'ROI mini calculator';
  if (text.includes('Gylio')) return 'Depth levels + roles';
  if (text.includes('Workflow')) return 'Workflow patterns';
  return 'Agent metric';
}

function fallbackValue(value) {
  return String(value)
    .replaceAll('DI', 'AI')
    .replace(/[ąčęėįšųūžĄČĘĖĮŠŲŪŽ]/g, '');
}

function mergeArraysById(fallbackArray, overlayArray) {
  const overlayById = new Map(
    overlayArray
      .filter((item) => item && typeof item === 'object' && 'id' in item)
      .map((item) => [item.id, item])
  );
  const merged = fallbackArray.map((fallbackItem) => {
    const overlayItem = overlayById.get(fallbackItem.id);
    return overlayItem ? mergeDeep(fallbackItem, overlayItem) : fallbackItem;
  });
  for (const overlayItem of overlayArray) {
    if (
      !overlayById.has(overlayItem.id) ||
      !fallbackArray.some((item) => item.id === overlayItem.id)
    ) {
      merged.push(overlayItem);
    }
  }
  return merged;
}

function mergeDeep(fallbackValue, overlayValue) {
  if (Array.isArray(fallbackValue) && Array.isArray(overlayValue)) {
    const keyed =
      fallbackValue.every(
        (item) => item && typeof item === 'object' && 'id' in item
      ) &&
      overlayValue.every(
        (item) => item && typeof item === 'object' && 'id' in item
      );
    if (keyed) return mergeArraysById(fallbackValue, overlayValue);
    return fallbackValue.map((item, index) =>
      index < overlayValue.length ? mergeDeep(item, overlayValue[index]) : item
    );
  }
  if (isPlainObject(fallbackValue) && isPlainObject(overlayValue)) {
    const out = { ...fallbackValue };
    for (const [key, value] of Object.entries(overlayValue)) {
      out[key] = key in out ? mergeDeep(out[key], value) : value;
    }
    return out;
  }
  return overlayValue === undefined ? fallbackValue : overlayValue;
}

function isPlainObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value);
}

function applyP2WarmupFixes(modules) {
  const m10 = modules.find((m) => m.id === 10);
  const m11 = modules.find((m) => m.id === 11);
  const m10Warmup = m10?.slides.find((s) => s.id === 10.61);
  const m11Warmup = m11?.slides.find((s) => s.id === 110.5);

  if (m10Warmup?.content?.questions?.[1]) {
    m10Warmup.content.questions[1] = {
      id: 'm10-warm-pre-wf-2',
      question: 'When is a plain prompt enough instead of an agent?',
      options: [
        'When you need one short answer and no tool use',
        'When the task needs several steps and external data',
        'When the result must decide whether to repeat a step',
        'When the workflow needs a trigger and actions',
      ],
      correct: 0,
      explanation:
        'A plain prompt is enough for one clear answer. Choose an agent when the task needs steps, tools, a loop or an external system.',
    };
  }

  if (m10Warmup?.content?.questions?.[2]) {
    m10Warmup.content.questions[2] = {
      id: 'm10-warm-pre-wf-3',
      question: 'What should you add when the answer needs current facts?',
      options: [
        'Name the search tool and ask for source links',
        'Ask for a longer answer',
        'Tell AI not to use tools',
        'Ask AI to guess if it is unsure',
      ],
      correct: 0,
      explanation:
        'The cue is tool use: tell AI to search and show sources. The graded test will later check a fuller source-handling rule.',
    };
  }

  if (m11Warmup?.content?.questions?.[2]) {
    m11Warmup.content.questions[2] = {
      id: 'm11-warm-3',
      question: 'What is the difference between a router and an orchestrator?',
      options: [
        'A router chooses where a request goes; an orchestrator manages the plan and retries',
        'A router writes the final answer; an orchestrator only changes tone',
        'They are the same role with different names',
        'A router is only for search, and an orchestrator is only for email',
      ],
      correct: 0,
      explanation:
        'The router decides the path by request type. The orchestrator owns the broader plan, state and retry loop.',
    };
  }
}

function prunePracticeScenarioMirrorContent(modules) {
  const m12 = modules.find((m) => m.id === 12);
  if (!m12) return;
  const ids = new Set([121, 122, 123, 124, 124.5]);
  for (const slide of m12.slides) {
    if (!ids.has(slide.id) || !isPlainObject(slide.content)) continue;
    for (const key of [
      'scenarioTitle',
      'scenarioDescription',
      'scenario',
      'template',
      'templateLabel',
      'instructions',
    ]) {
      delete slide.content[key];
    }
    if (Object.keys(slide.content).length === 0) delete slide.content;
  }
}

applyP2WarmupFixes(en.modules);
prunePracticeScenarioMirrorContent(en.modules);
syncEnFootersFromLt();
assertNoPlausibleEnFiller(en.modules);

writeFileSync(outPath, JSON.stringify(en, null, 2) + '\n', 'utf8');
const lines = readFileSync(outPath, 'utf8').split('\n').length;
console.log('Written:', outPath, 'lines:', lines);
console.log(
  'Slides:',
  en.modules
    .map((m) => `M${m.id}:${m.slides.map((s) => s.id).join(',')}`)
    .join('; ')
);
