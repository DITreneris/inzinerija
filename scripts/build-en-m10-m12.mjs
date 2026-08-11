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
  'Savitikra: saugikliai': 'Warm-up: safeguards',
  'Pagrindinės sąvokos': 'Core concepts',
  'Pagrindinės sąvokos: trigger…webhook': 'Core concepts',
  'Darbo eiga → automatizavimas': 'Workflow → automation',
  'Automatizavimo įrankiai': 'Automation tools',
  'Paleidimas: PaaS': 'Hosting: PaaS',
  'Kur paleisti': 'Where it runs',
  'Kur paleisti programą ar agentą': 'Where your app or agent runs',
  'GitHub kaip kodo šaltinis': 'GitHub as code source',
  'Minimalus eigos aprašymas': 'Minimal workflow brief',
  'Testavimas ir saugumas': 'Testing and security',
  'QC vertintojas': 'QC evaluator',
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
  '1 praktika: Automatize': 'Practice 1: Automatize',
  '2 praktika: Augment': 'Practice 2: Augment',
  '3 praktika: Autonomize': 'Practice 3: Autonomize',
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
              'Design agents for your processes – taxonomy, multi-agent coordination, no-code tools. Context – Module 4.',
            firstActionCTA:
              'On the next slide, copy the quick check: in one sentence, tell an agent apart from a simple question–answer.',
            outcomes: [
              'Understand agent taxonomy (L0–L3) and multi-agent roles',
              'Use 5 workflow patterns and system prompts',
              'Know how to choose tools and limit risks',
            ],
            duration: '~20–25 min',
            audience:
              'For business specialists and engineers who completed Modules 4–6 (Context engineering).',
          },
        },
        {
          id: 10.1,
          title: 'Agent engineering path – what you will find here',
          shortTitle: 'Path in this module',
          subtitle: 'Short overview; detail on later slides',
          content: {
            sections: [
              {
                heading: 'In short',
                body: '**MUST path:** agent cycle → 3A strategy → depth and roles → 5 workflow patterns → role and system prompt → tools → when to choose an agent → errors and limits → workflow concepts → automation platforms → launch.\n\n**Optional:** GitHub, deeper spec, glossary, summary. Term definitions – on the **Key concepts** slide.',
              },
              {
                heading: 'Quick win in 60 sec.',
                body: 'Before deeper theory, do one small check: can you already tell an agent from a simple question–answer?',
              },
              {
                heading: 'Copyable prompt',
                body: 'Copy into AI and adapt the example to your work.',
                copyable:
                  'Explain in one sentence how an AI agent differs from a simple question–answer. Give one example from my work where an agent is needed, not a single simple prompt.',
              },
              {
                heading: 'Check',
                body: 'If the answer has no multiple steps or tools, it is still a simple prompt. On the next slide you will see the full agent cycle.',
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
                body: 'The diagram below – **five cycle steps**. Unlike a simple chat: the agent **autonomously** chooses actions and can call tools.',
              },
              {
                heading: 'How an AI agent works',
                body: 'Click a step – explanation below.',
              },
              {
                heading: 'API and looping',
                body: '**API** – a program’s “door” to data or actions: the agent calls CRM, email or another system through it, because it does not “have” that data itself.\n\n**Looping:** after the result the agent decides – repeat a step, call another tool, or finish. That is the feedback at the end of the cycle.',
              },
              {
                heading: 'When to choose an agent',
                body: 'More detail on when an agent vs a simple prompt – with examples – on **When to choose an agent vs a simple prompt**.',
              },
              {
                heading: 'Do this now',
                body: 'Apply the cycle to your process – copy the task into AI.',
              },
              {
                heading: 'Copyable prompt',
                body: 'Fill [DESCRIBE] with your work.',
                copyable:
                  'My process: [DESCRIBE, e.g. customer email triage].\nWalk the agent cycle: (1) what is the task, (2) what is the plan, (3) which tool will you call, (4) what environment / data do you read, (5) what is the result and whether to loop.\nIn one sentence: where in this process is a tool required (not only a text answer)?',
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
                  'Only a nicer answer tone',
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
          subtitle: 'Automatize 80 % / Augment 15 % / Autonomize 5 %',
          content: {
            sections: [
              {
                heading: 'In short',
                body: '3A is a **decision portfolio**, not “more agents = better”. Most work – rules (**fewer errors**, predictable); a smaller share – human + AI (judgment and ownership); the smallest – agents with limits (costly and risky). **80/15/5** protects speed and safety – not a maturity ladder to autopilot.',
              },
              {
                heading: 'Three bands – when to choose',
                body: '**Automatize (80 %)** – how much: rules without a human at every step. Why: fewer errors, predictable. E.g.: form → CRM → email.\n\n**Augment (15 %)** – how much: human decides, AI helps. Why: ownership or context needed. E.g.: AI draft → human approves → send.\n\n**Autonomize (5 %)** – how much: agent with limits and escalation. Why: narrow band – higher risk. E.g.: feedback → sentiment → escalate to a human.',
              },
              {
                heading: '3A strategy (diagram)',
                body: 'Click a band – when to choose. Then assign your processes below.',
              },
              {
                heading: 'Example',
                body: '**Same process – two bands.** Customer email → reply: if a template “received / ticket #” → **Automatize**. If AI drafts and a human approves tone and facts → **Augment**. Choose Autonomize only with clear limits and escalation.',
              },
              {
                heading: 'Do this now',
                body: 'List **three work processes** and assign each to one 3A band. Copy the template into AI or write it down.',
              },
              {
                heading: 'Copyable template',
                body: 'Fill three processes.',
                copyable:
                  'Process 1: [PROCESS]. 3A band: Automatize / Augment / Autonomize. Why (1 sentence): [REASON]. Human approval: [YES/NO + when].\n\nProcess 2: [PROCESS]. 3A band: … Why: … Human approval: …\n\nProcess 3: [PROCESS]. 3A band: … Why: … Human approval: …',
              },
              {
                heading: 'Check',
                body: 'Can you explain why at least one process is **not** Autonomize (5 %) if you chose Automatize or Augment? Can you name a process that **requires** a human? If not – go back to the diagram or example.',
              },
              {
                heading: 'Where to apply',
                body: '**Portfolio rule:** first inventory ~10 processes – keep most on rules (**Automatize**); use agents only where value clearly outweighs error cost.\n\n**Band rule:** need a sign-off or tone/fact approval → **Augment**; stable template and cheap errors → **Automatize**; **Autonomize** – only with a limit, escalation and audit.\n\n**Next step:** when a human must approve – slide **When does a human approve?**',
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
                body: 'This is a **moment-in-time team practice snapshot**, not a formal maturity test. Choose how the team uses AI, how it structures prompts and how it learns from outcomes. The weakest dimension shows one next action before increasing autonomy.',
                blockVariant: 'accent',
              },
              {
                heading: 'Do this now',
                body: 'Pick one state in each of the three dimensions. The lab generates a team readiness profile you can use before choosing a human-control rule on the next slide.',
                image: 'm10_team_readiness_lab',
                imageAlt: 'Team readiness for agentic work lab',
                blockVariant: 'brand',
              },
              {
                heading: 'Check',
                body: 'Can you name the **one habit** the team needs to strengthen before agentic work? If you chose “systematic” everywhere, do you have evidence: a shared template, owner and review rhythm? If not – mark “fragmented”.',
                blockVariant: 'accent',
              },
            ],
          },
        },
        {
          id: 10.45,
          title: 'AI agent types and roles',
          subtitle: 'Depth levels and multi-agent roles for business',
          shortTitle: 'Agent types and roles',
          content: {
            sections: [
              {
                heading: 'In short',
                body: 'Not every task needs an AI team. In the lab pick **depth** for your process; **Team** reveals roles. **Rule:** start from **Agent** – pick Team or Flow only when one agent is not enough or you need a trigger.',
                blockVariant: 'accent',
              },
              {
                heading: 'Depth and team roles',
                body: 'Team reveals roles below. Inputs / outputs – on the next checkpoint.',
                blockVariant: 'brand',
              },
              {
                heading: 'Do this now',
                body: 'If **Team** – three roles (coordinator, specialist, evaluator); router only if you need triage. Copy the artifact in the lab.',
                blockVariant: 'brand',
              },
              {
                heading: 'Check',
                body: 'Did you choose a **depth** and can you say why in one sentence? If Team – are the three roles clear? If unsure – stay on **Agent**.',
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
          id: 10.48,
          title: '5 workflow patterns for business',
          subtitle: 'Chain, routing, parallel, coordinator, evaluator',
          content: {
            sections: [
              {
                heading: 'In short',
                body: 'When one AI agent is no longer enough – pick a **workflow pattern** (not programming). Choose **one** – you will see a plan.',
              },
              {
                heading: 'Do this now',
                body: 'Pick **one** pattern for your process. After you choose, you see only that plan – copy and fill it. After the warm-up – orchestration walkthrough (HOW, not only the pattern).',
                toolChoiceBar: {
                  question: 'Which pattern will you apply to your process?',
                  choices: [
                    {
                      label: 'Chain',
                      rowIndex: 0,
                      whenHint:
                        '**Yes:** steps run one after another. **No:** types differ or several work in parallel.',
                    },
                    {
                      label: 'Routing',
                      rowIndex: 1,
                      whenHint:
                        '**Yes:** different branch by type (complaint / inquiry). **No:** every case follows the same sequence.',
                    },
                    {
                      label: 'Parallel',
                      rowIndex: 2,
                      whenHint:
                        '**Yes:** several sources / specialists at once, then merge. **No:** the result depends on a prior step.',
                    },
                    {
                      label: 'Coordinator',
                      rowIndex: 3,
                      whenHint:
                        '**Yes:** you need to split sub-tasks dynamically. **No:** a fixed chain without assignment is enough.',
                    },
                    {
                      label: 'Generator + evaluator',
                      rowIndex: 4,
                      whenHint:
                        '**Yes:** draft + QC (email, FAQ, report). **No:** low quality risk – Agent (L1) is enough.',
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
                  'You are the coordinator. Task: [DESCRIBE].\nBreak into 2–3 sub-tasks. For each assign a role (specialist / evaluator),\ninput, output and handoff rule (when to pass to the next role).\nPresent the plan as a numbered list.',
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
          subtitle: '3 questions about chain, routing and evaluator',
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
                  'Routing sends a request by type or category: complaint, inquiry, proposal and similar branches.',
              },
              {
                id: 'm10-warm-workflow-3',
                question:
                  'Which pattern is safest when you need a draft and a quality check?',
                options: [
                  'Generator + evaluator',
                  'Only generator without checking',
                  'Only router',
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
          subtitle: 'How to set role and limits for an agent',
          content: {
            sections: [
              {
                heading: 'In short',
                body: 'Role defines how AI behaves – in simple chat and in agent systems. System prompt – where you set **role, limits, tools** and what to do when data is missing. Here – a simple one-agent template; multi-agent roles – on **AI agent types and roles**.',
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
                  'Your role – [ROLE, e.g. customer support assistant].\nLimits: [LIMITS, e.g. do not offer discounts without a human; escalate sensitive complaints].\nUse tools (search, files, etc.) when they help the task.\nIf the task is unclear or fails – briefly say why and what to fix.\nDo not invent data – if facts are needed, use search or write “I don’t know”.',
              },
              {
                heading: 'Check',
                body: 'A good answer shows: steps or a tool trace, sources (if you searched), or a clear “I don’t know”. If AI does not use tools – check Browse / Tools settings.',
              },
              {
                heading: 'Where to apply',
                body: 'Anywhere you need more than one answer – search, calculations or external data. Same context-engineering idea as Modules 4–6 – applied to an agent: role, limits, tools, output.',
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
                body: 'Not all AI **platforms** have the same tools (search, files, API). In the task clearly write: “Use search and provide sources”. Before an agent prompt, check settings: is search or Tools enabled.\n\nWorkflow platforms (Zapier, Make, n8n, Power Automate) – slide **Business automation tools**.',
              },
              {
                heading: 'Popular AI platforms – what they offer',
                body: 'Think in **3 layers**, not one button: (1) platform features – search, files, memory; (2) connectors – API, integrations, MCP servers; (3) agentic modes – AI chooses a tool, takes action, and records the result. Before writing an agent prompt, check which layers are enabled on your platform.',
              },
              {
                heading: 'Do this now',
                body: 'Open your AI settings and note which tools you allow. Then in one task write: “Use search and provide sources”.',
              },
              {
                heading: 'Copyable prompt',
                body: 'Copy and fill [DESCRIBE TASK].',
                copyable:
                  'Task: [DESCRIBE TASK].\nUse only enabled tools: [search / files / API / connector / MCP]. If up-to-date facts are needed – use search and provide sources. If action in a system is needed – first state which connector or API you would use. If you cannot find it or the tool is unavailable – write “Not found / Failed” and briefly explain why.',
              },
              {
                heading: 'Check',
                body: 'If the answer has no links – did you say “use search”? Is the tool enabled on the platform?',
              },
            ],
          },
        },
        {
          id: 10.5,
          title: 'When to choose an agent vs a simple prompt',
          subtitle:
            'Complex tasks with tools – agent; one question – simple prompt',
          content: {
            sections: [
              {
                heading: 'In short',
                body: 'Agent – when the task is complex (several actions, external data, tools). Simple prompt – when one question, one answer, no external tools.\n\nThis continues M4–M6 context engineering: before running, decide what information, tools and limits AI needs.\n\n**Multi-agent patterns** (chain, routing, etc.) – slide **“5 workflow patterns”**.',
              },
              {
                heading: 'Do this now',
                body: 'Copy the example below, fill [ROLE] and [X], run it in AI. Does the answer include error handling and sources?',
              },
              {
                heading: 'Copyable prompt (example)',
                body: 'Below – agent task example; fill [ROLE] and [X].',
                copyable:
                  'Role: [ROLE]. Task: (1) Search [X], (2) pick 3–5 key sources, (3) write a summary in English with links. If not found – write “Not found” and why.',
              },
              {
                heading: 'Copyable prompt: 5-part template',
                body: 'This is the main agent prompt template before Module 12 practice: role, task, tools, format, and error handling.',
                copyable:
                  'ROLE\nYou are [domain / role]. Your responsibility – [what you do]. You have access to [search / calculator / API]. Do not: [limits, e.g. do not invent data].\n\nTASK (step by step)\n(1) [First step, e.g. search X]\n(2) [Second step, e.g. pick 3–5 sources]\n(3) [Third step, e.g. write summary]\n\nTOOLS\nUse [search / tool] when [when]. If facts are needed – use search or write “I don’t know”. List sources at the end.\n\nFORMAT\n[Table / list / report]. Language: English. Sources: cite them.\n\nERROR HANDLING\nIf the task cannot be completed (missing data, timeout): write “Failed: [reason]” and suggest what to fix. Do not write an empty answer.',
              },
              {
                heading: 'Check',
                body: 'Does your agent prompt include **error handling** and a **tool instruction**? If not – add them before the checkpoint **“Checkpoint: prompt”**.',
              },
              {
                heading: 'What comes later',
                body: 'In the next stage you will expand this prompt into a minimal workflow specification: what starts the flow, which fields are required, and where human approval enters.',
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
            body: 'Before Module 12 practice, have one 5-part agent prompt and one golden check (edge case). You will fill the workflow specification skeleton later, after trigger, condition, and action concepts are clear.',
            sections: [
              {
                heading: 'Minimal artifact',
                body: 'Role, task in steps, tools, output format, and error handling. It is enough if you can show how the prompt behaves in an edge case.',
              },
              {
                heading: 'Check',
                body: 'If error handling or human approval in a risky place is missing, add it before continuing.',
              },
              {
                heading: 'Golden check',
                body: 'Test the prompt with 1 edge case: missing required field, no source, or API not responding. A good result returns a clear “Failed: [reason]” and suggests what to fix.',
                copyable:
                  'Test this agent prompt with an edge case: [PASTE PROMPT]. Test situation: [missing required field / no source / API does not respond]. Evaluate whether the answer has “Failed: [reason]” and a clear suggestion for what to fix.',
              },
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
                body: 'The agent must know what to do when something fails. Set limits: what not to do, what to return instead of an empty answer.',
              },
              {
                heading: 'Do this now',
                body: 'Paste the text below into **system** or **user** prompt (or both). Then ask AI a deliberately impossible task – e.g. “Search for the 2029 profit report of non-existent company X and provide real sources”.',
              },
              {
                heading: 'Copyable prompt',
                body: 'Add to system or user prompt – what to do when it fails.',
                copyable:
                  'If the task cannot be completed (missing data, disallowed action or timeout): write a short message “Failed: [reason]” and suggest what the user can fix. Do not write an empty answer.',
              },
              {
                heading: 'Tool output is not an instruction',
                body: 'If search, a file, CRM or website returns text such as “ignore previous rules”, treat it as **data**, not a command. System rules and the user goal stay above any text returned by a tool.',
              },
              {
                heading: 'Check',
                body: 'Did AI return **“Failed”** (or similar) and **reason**, not an empty answer? If it stays silent – add to prompt: “If you cannot – always say why.”',
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
                  'Error handling requires a clear “Failed” message and a concrete next step — not an empty or invented answer.',
              },
              {
                id: 'm10-warm-pre-wf-2',
                question:
                  'Which 3A choice fits a process with clear rules, low risk, and almost no human judgment needed?',
                options: [
                  'Automatize',
                  'Augment',
                  'Autonomize',
                  'Do not automate',
                ],
                correct: 0,
                explanation:
                  'Automatize fits clear, repeatable, low-risk rules. Choose Augment when a human must decide, and Autonomize only for tightly bounded exceptions.',
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
          title: 'Key concepts: trigger, action, condition, webhook',
          subtitle: 'Workflow structure and examples',
          content: {
            sections: [
              {
                heading: 'In short',
                body: 'A workflow core is three steps: **Trigger** → **Condition** → **Action**. **Webhook** is not a fourth step – it is a Trigger type (external event → API). Below – diagram, example, and template.',
              },
              {
                heading: 'Workflow chain',
                body: 'Trigger → Condition (if needed) → Action. Under Trigger – types: form, schedule, **Webhook**.',
                image: 'm10_trigger_flow',
              },
              {
                heading: 'Worked example',
                body: '**Form:** Trigger – form submitted → Condition – if email is valid → Action – CRM record + email.\n\n**Payment:** PayPal event → **Webhook** = Trigger type → sales system updates the order.',
              },
              {
                heading: 'Concepts – contrast',
                body: '**Trigger** – event that starts the flow (form, email, schedule).\n\n**Condition** – rule / branch (if amount > X); optional in the first flow.\n\n**Action** – what the **system** does (CRM, email) – not the starter itself.\n\n**Webhook** – a Trigger type: real-time data from another system (event → API). Not an Action.',
              },
              {
                heading: 'Where to apply',
                body: '**Sales:** T: form → A: CRM entry + reminder email.\n**Support:** T: email → C: if high priority → A: ticket + Slack.\n**Ops:** T: daily file → A: check + team report.\n\nOne rule: start with Trigger + Action; add Condition and Webhook once the process already works.',
              },
              {
                heading: 'Do this now',
                body: 'Describe your process using the example. Copy the template and fill the fields.',
              },
              {
                heading: 'Copyable template',
                body: 'Fill the [ ] fields.',
                copyable:
                  'Trigger: [EVENT]. Condition (if needed): [RULE]. Action 1: [ACTION]. Action 2: [ACTION]. Webhook? [YES/NO – from where]. Error step: [what to do if it fails].',
              },
              {
                heading: 'Check',
                body: 'Is the trigger an **event** (not a task), and the action a **system step**? Did you name an error step? If not – go back to the example and template.',
              },
              {
                heading: 'Extra concepts (if needed)',
                body: 'Delay, filter, loop, error handler – when the flow grows. More detail – optional slide **Workflow testing and security**.',
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
                body: 'Four Automate (80%) tools: **Zapier** – quick start; **Make** – richer logic; **n8n** – control on your servers; **Power Automate** – Microsoft. Pick **one** – Trigger → Action draft. For 24/7 app / API – next slide.',
              },
              {
                heading: 'Tool selection tree',
                body: 'Tap a branch – see which tool fits your context (including enterprise Workato).',
                image: 'm10_tool_decision_tree',
              },
              {
                heading: 'Do this now',
                body: 'Pick **one** tool for your process. Below – when yes / when no, then copy the template.',
                toolChoiceBar: {
                  question: 'Which tool will you use for your process?',
                  autoSelect: false,
                  choices: [
                    {
                      label: 'Zapier',
                      rowIndex: 0,
                      whenHint:
                        '**Yes:** non-technical team, quick start. **No:** complex logic or data on your servers. E.g. Calendly → calendar → reminder email.',
                    },
                    {
                      label: 'Make.com',
                      rowIndex: 1,
                      whenHint:
                        '**Yes:** conditions, loops, better price. **No:** a simple 2–3 step flow is enough. E.g. Shopify order → stock → supplier alert.',
                    },
                    {
                      label: 'n8n',
                      rowIndex: 2,
                      whenHint:
                        '**Yes:** technical team, data on your side. **No:** no IT or you need quick SaaS. E.g. payment webhook → DB → Slack alert.',
                    },
                    {
                      label: 'Power Automate',
                      rowIndex: 3,
                      whenHint:
                        '**Yes:** daily Teams / Outlook / SharePoint. **No:** main stack is not Microsoft. E.g. Outlook PDF → SharePoint → Teams.',
                    },
                  ],
                },
              },
              {
                heading: 'Copyable template – Zapier',
                body: 'This prompt generates a platform-ready leading document for later Zapier implementation.',
                copyable:
                  'You are a Zapier workflow architect.\n\nPROCESS: [PROCESS]\nGOAL: [RESULT TO CREATE]\nTOOLS / SYSTEMS: [FORM, CRM, EMAIL, SLACK / TEAMS]\nLIMITS: [DATA, ACCESS, WHO APPROVES]\n\nCreate a leading document for Zapier implementation:\n1) Trigger – what event starts the flow.\n2) Required fields – field | source | destination.\n3) Zap steps – app | action | input | output.\n4) Errors – what to do if a field is missing, API does not respond, or a duplicate appears.\n5) Tests – happy path + 2 failures.\n6) Human approval – when to stop and who gets it.\n\nReturn tables. If information is missing, ask up to 3 questions first.',
                linkedRowIndex: 0,
              },
              {
                heading: 'Copyable template – Make.com',
                body: 'This prompt generates a Make scenario document with modules, conditions, and tests.',
                copyable:
                  'You are a Make.com scenario architect.\n\nPROCESS: [PROCESS]\nGOAL: [RESULT TO CREATE]\nTOOLS / SYSTEMS: [FORM, CRM, EMAIL, SLACK / TEAMS]\nLIMITS: [DATA, ACCESS, WHO APPROVES]\n\nCreate a leading document for Make implementation:\n1) Scenario trigger and modules in order.\n2) Filters / routers – condition | where it routes | why.\n3) Field mapping – source | Make field | destination.\n4) Errors – retry, fallback, escalation.\n5) Tests – happy path + missing field + API timeout.\n6) Human approval – where to pause before sending.\n\nReturn tables. If the process is too complex, propose the first small scenario.',
                linkedRowIndex: 1,
              },
              {
                heading: 'Copyable template – n8n',
                body: 'This prompt generates an n8n workflow document with nodes, data fields, and an error branch.',
                copyable:
                  'You are an n8n workflow architect.\n\nPROCESS: [PROCESS]\nGOAL: [RESULT TO CREATE]\nTOOLS / SYSTEMS: [WEBHOOK, DB, CRM, EMAIL, SLACK / TEAMS]\nLIMITS: [DATA, ACCESS, WHO APPROVES]\n\nCreate a leading document for n8n implementation:\n1) Node sequence – node | purpose | input | output.\n2) Data structure – JSON field | type | required? | example.\n3) Error branch – what to do if a node fails.\n4) Tests – happy path + invalid JSON + timeout.\n5) Security – where keys are stored, what to mask.\n6) Human approval – when to send to a human.\n\nReturn tables and add a short “what to implement first” list.',
                linkedRowIndex: 2,
              },
              {
                heading: 'Copyable template – Power Automate',
                body: 'Fill the [ ] fields.',
                copyable:
                  'Process: [PROCESS].\nChosen tool: Power Automate.\nWhy this (1 sentence): [REASON].\nWhy not Zapier: [ ].\nTrigger → Action (brief): [SCHEMA].',
                linkedRowIndex: 3,
              },
              {
                heading: 'Check',
                body: 'Does your template include **why not** (an alternative)? If not – go back to the choice and fill it in.',
              },
              {
                heading: 'More about each',
                body: '**Zapier:** many integrations; quick start; weakness – cost at scale.\n\n**Make.com:** drag & drop, conditions and loops; weakness – learning curve.\n\n**n8n:** open-source, self-host; weakness – needs IT skills.\n\n**Power Automate:** Microsoft security and licensing; weakness – limited outside Microsoft.\n\n**Enterprise governance** (auditors, compliance) → **Workato** – see the tree above.\n\nDeeper material – optional slide **Workflow testing and security**.',
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
                body: 'Before Module 12 practices, fill a **minimal workflow brief**: 1-page schema + 3 test cases + a rule for when a human approves. You will take the same brief to the QC evaluator and practices.',
              },
              {
                heading: 'Minimal brief',
                body: '**(A)** 1-page specification: Trigger → error handling.\n**(B)** 3 test cases: happy path, missing field, API/timeout or webhook duplicate.\n**(C)** Human-control rule – mode, condition / threshold, rejection or escalation, audit record.',
              },
              {
                heading: 'Do this now',
                body: 'Copy the template and fill it with your process. Later – slide **Agent QC evaluator**.',
              },
              {
                heading: 'Copyable template',
                body: 'Minimal workflow brief.',
                copyable:
                  'Minimal workflow brief:\n1) Trigger – what starts the flow.\n2) Input schema – which fields are required.\n3) Condition – which rule changes the flow.\n4) Actions – 3–5 actions with tools.\n5) Output – what result must be created.\n6) Error handling – what to do if a step fails.\n7) Audit record – what to log: time, step, result.\n8) Human-control rule – mode: [all cases / exceptions / after the fact / monitoring]; condition or threshold: […]; rejection / escalation: […]; audit record: […].\n\nTest cases:\nB1 happy path: …\nB2 missing field: …\nB3 timeout / duplicate: …',
              },
              {
                heading: 'Incident playbook (5 steps)',
                body: 'Add these steps to your brief if the workflow touches customers, money, or personal data: **stop** the flow → **record** what happened → **assess** impact → **notify** the responsible person → **fix** the rule or prompt.',
              },
              {
                heading: 'Cost and model choice',
                body: 'Write which step can be cheap and which must be strong: **cheap model** – classification, filtering, duplicate checks; **stronger model** – customer-facing text, complex decisions, or risk assessment. If the task crosses the cost limit, stop or send it to a human.',
              },
              {
                heading: 'Check',
                body: 'Do you have **B** and **C** (not only happy path)? Does the human-control rule include mode, condition, escalation, and audit record? If finance / personal data is marked “never” – go back to “When does a human approve?”.',
              },
            ],
          },
        },
        {
          id: 10.65,
          title: 'Workflow testing and security',
          subtitle: 'Optional: 8-block spec, tests, security',
          content: {
            sections: [
              {
                heading: 'In short',
                body: '**Optional deep-dive** slide. When you connect systems or an agent with external data – you need tests and security. The MUST brief is already on **Minimal workflow brief**.',
              },
              {
                heading: 'Workflow specification (diagram)',
                body: '**8 blocks** from Trigger to audit log. Detail – collapsible below.',
                image: 'm10_workflow_spec',
              },
              {
                heading: 'Incident playbook (diagram)',
                body: '**5 steps:** stop → record → assess → notify → fix.',
                image: 'm10_incident_playbook',
              },
              {
                heading: '8-block specification',
                body: '**Trigger** – what starts it. **Input schema** – required fields. **Condition** – rules. **Actions** – steps + tools. **Output** – result. **SLA / limits** – wait, retries. **Error handling** – retry, alert, escalate. **Audit log** – run_id, time, step, result.',
                collapsible: true,
                collapsedByDefault: true,
              },
              {
                heading: 'Do this now',
                body: 'Take your **Minimal workflow brief** draft. Copy the checklist and mark the 3 quality tests.',
              },
              {
                heading: 'Copyable checklist',
                body: 'Paste the brief into [ ] and run in AI.',
                copyable:
                  'Here is my minimal workflow brief:\n[PASTE BRIEF]\n\nCheck three quality tests:\n(1) Empty input – clear "Failed"?\n(2) False fact – does it refuse to confirm?\n(3) Very long text – does it fail without a message?\n\nAnswer briefly: YES/NO for each + 1 gap if any.',
              },
              {
                heading: 'Check',
                body: 'Does the brief have at least **3 trials** and a rule for **when a human approves**? If not – go back to **Minimal workflow brief**.',
              },
              {
                heading: '10 test scenarios',
                body: 'Before going live – walk the list. **Idempotency:** unique request ID; if the record already exists – update, do not create new.',
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
                heading: '3 AI agent QC tests',
                body: '(1) Empty input – clear "Failed"? (2) False fact – does it refuse to confirm? (3) Very long text – does it fail without a message?',
                collapsible: true,
                collapsedByDefault: true,
              },
              {
                heading: 'Security and compliance',
                body: '**PII:** what may go to AI, what to mask. **Access:** who edits the workflow; API keys in the platform vault, not in code. **Incident playbook:** stop → record → assess → notify → fix. **Human approval:** finance above X, bulk personal-data export. **Compliance:** if the flow affects people’s rights, money, or work decisions, record the goal, data sources, human review, and decision log – this is the kind of governance the AI Act expects.',
              },
            ],
          },
        },
        {
          id: 10.66,
          title: 'Agent QC evaluator',
          subtitle: 'One prompt checks an agent or workflow specification',
          content: {
            sections: [
              {
                heading: 'In short',
                body: 'One evaluator prompt checks another artifact: your agent prompt or workflow specification. The goal is to find unclear points before practice.',
              },
              {
                heading: 'Do this now',
                body: 'Copy the evaluator, paste your agent prompt or workflow specification, and fix at least one point that AI marks as “fix”.',
              },
              {
                heading: 'Copyable prompt (evaluator)',
                body: 'One prompt evaluates another: the evaluator does not create a new workflow, it shows what to fix.',
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
                '1. Copy the evaluator prompt from the block above.\n2. Paste it into AI.\n3. Paste your agent prompt or workflow specification.\n4. Fix at least one point the evaluator marked as “fix”.\n5. Run the evaluation again and check whether all 5 criteria have a clear answer.\n\nThe evaluator and your prompt are not competitors: the evaluator helps improve your artifact before practice.',
            },
            footer: 'Next slide',
          },
        },
        {
          id: 10.7,
          title: 'Glossary',
          subtitle: 'Agent engineering terms – want more detail?',
          content: {
            terms: [
              {
                term: 'Agent (AI)',
                definition:
                  'System that completes tasks in steps and can use tools (search, API, files).',
              },
              {
                term: 'Tool',
                definition:
                  'Function AI can call (e.g. search, calculator, file read).',
              },
              {
                term: 'System prompt',
                definition:
                  'Setting “who you are” and “how to behave” – visible to AI, not the user.',
              },
              {
                term: 'User prompt',
                definition: 'Task entered by the user.',
              },
              {
                term: 'Integration',
                definition:
                  'Connection between AI and external data or services (API, database).',
              },
              {
                term: 'Execution',
                definition: 'Step completion – planning and tool calls.',
              },
              {
                term: 'Guardrails',
                definition:
                  'Rules the agent does not break (e.g. disallowed actions, privacy).',
              },
              {
                term: 'Error handling',
                definition: 'What to return to the user when the task fails.',
              },
              {
                term: 'Trigger',
                definition:
                  'Event that starts a workflow (e.g. new email, form submission).',
              },
              {
                term: 'Action',
                definition:
                  'Action the system performs (e.g. send email, write to CRM).',
              },
              {
                term: 'Condition',
                definition:
                  'Rule – when to run the next step (e.g. if value > €500).',
              },
              {
                term: 'Webhook',
                definition:
                  'Real-time data transfer between systems (event → API call).',
              },
              {
                term: 'Coordinator',
                definition:
                  'Multi-agent role – breaks down task, delegates to specialists, merges results.',
              },
              {
                term: 'Evaluator',
                definition:
                  'Multi-agent role – checks quality and rules; can return for revision (QC).',
              },
              {
                term: 'Router',
                definition:
                  'Multi-agent role – routes the request to the right role or flow by type.',
              },
              {
                term: 'ReAct',
                definition:
                  'Cycle: understand → choose tool → execute → observe result → repeat or finish.',
              },
              {
                term: 'AI Act / compliance',
                definition:
                  'Governance rules for AI systems: know the goal, data sources, human review, risk level, and decision log, especially when people, money, or work decisions are affected.',
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
              'Congratulations! Key wins: agent depth (Chat → Flow) and roles, 5 workflow patterns, 3A, closed learning loop, AI with tools, prompts and error handling.',
            stats: [
              { label: 'Depth levels + roles', value: '8' },
              { label: 'Workflow patterns', value: '5' },
              { label: 'Use case examples', value: '12' },
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
                  'Automatize 80 % / Augment 15 % / Autonomize 5 %',
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
                heading: '12 applied examples',
                items: [
                  'Sales: lead form → CRM → email → duplicate risk → conversion',
                  'Sales: weekly pipeline → AI summary → stale data → manager time',
                  'Sales: RFP received → research + summary → missed criteria → response time',
                  'HR: CV received → filter → recruiter approval → bias risk → hiring time',
                  'HR: new employee → onboarding checklist → missed step → completion rate',
                  'HR: candidate profile → fit score → personal data risk → shortlist accuracy',
                  'Finance: invoice → OCR → checking → wrong numbers → processing time',
                  'Finance: month close → AI summary → unapproved numbers → close days',
                  'Finance: budget variance → alert → too much noise → accurate alerts',
                  'Support: complaint → triage → draft → wrong tone → first response time',
                  'Support: feedback → sentiment → escalation → too early autonomy → ticket SLA',
                  'Support: FAQ request → draft → evaluator → wrong fact → self-service rate',
                ],
              },
            ],
            reflectionPrompt:
              'META: You are a training reflection assistant. Goal – consolidate what you learned after Module 10.\nINPUT: I just finished training on AI agents – depth (Chat→Flow), multi-agent work, 5 workflow patterns, 3A, closed learning loop and prompts.\nOUTPUT: Ask 3 questions: (1) Which agent scenario could I apply today? (2) Which lesson after a trial would I want to capture? (3) What do I want to try first? After my answers, give one concrete tip.',
            reflectionTitle: 'Reflection prompt',
            tagline:
              'Agent = steps + tools + limits – your foundation for automation.',
            nextStepCTA: 'Go to Module 11: Knowledge check (Agent path)',
            firstAction24h:
              'Today open one AI tool with tools enabled (search or Tools) and ask one agent query with “Use search and provide sources”.',
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
        'Check agent flow and tools. ≥70% recommended before Module 12.',
      duration: '10–12 min',
      slides: [
        {
          id: 110,
          title: 'Module 11 test',
          subtitle: 'Agent engineering knowledge',
          content: {
            whyBenefit:
              'After this test you will know if you are ready for the final Agent engineering project (Module 12).',
            duration: '~10–12 min',
            firstActionCTA:
              'Press Continue — 9 questions with explanations (cycle, 3A, roles, workflow).',
            microWinPhrase:
              'Each correct answer shows you are ready to design agents.',
            thresholdExplanation:
              'When you reach ≥70 %, you can go to Module 12 (project). If less – we recommend reviewing Module 10 slides.',
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
                  'When you need several steps, tools or a decision, or to repeat an action',
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
                question: 'Which 3A lane means “human decides, AI helps”?',
                options: [
                  'Augment (15 %)',
                  'Automatize (80 %)',
                  'Autonomize (5 %)',
                  'Only L0 taxonomy',
                ],
                correct: 0,
                explanation:
                  'Augment – the human stays in the decision; AI provides summaries, recommendations or drafts before approval.',
              },
              {
                id: 'm11-warm-3',
                question:
                  'What should you prepare first before the Module 12 project?',
                options: [
                  'One 5-part agent prompt and a minimal workflow brief skeleton',
                  'Only a tool logo',
                  'Only a long theoretical explanation without a process',
                  'Only a platform account without test cases',
                ],
                correct: 0,
                explanation:
                  'Module 12 needs an artifact: agent prompt, workflow skeleton, tests, and a human-control rule. A platform account is not the only path.',
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
                'Clearly specify the tool and rule: use search, provide sources; if you cannot find them – write “Not found”',
                'Increase the answer length to 2000 words',
                'Delete the error-handling sentence',
                'Keep the same prompt and just ask again',
              ],
              correct: 0,
              explanation:
                'The agent needs clear context: which tool to use, when to provide sources, and what to return when sources are missing. That lowers the risk of invented facts.',
              relatedSlideId: 10.3,
            },
            {
              id: 'm11-q2',
              type: 'scenario',
              bloomLevel: 3,
              scenarioContext:
                'The process repeats every day: form data moves into a sheet, a confirmation email is sent, risk is low, and the human almost never decides.',
              question: 'Which 3A lane fits best?',
              options: [
                'Automatize',
                'Augment',
                'Autonomize',
                'Do not automate',
              ],
              correct: 0,
              explanation:
                'This is a clear, repeatable, low-risk process. Automatize removes manual work, and human approval is not needed at every step.',
              relatedSlideId: 10.25,
            },
            {
              id: 'm11-q3',
              type: 'mcq',
              question:
                'How does an evaluator differ from a specialist in a multi-agent system?',
              options: [
                'Evaluator checks quality; specialist does the work',
                'Evaluator always sends emails; specialist only reads',
                'They do the same, just with different tools',
                'Evaluator sets the trigger',
              ],
              correct: 0,
              explanation:
                'Specialist does narrow work (search, draft). Evaluator checks rules, quality and can return for revision – separate QC role.',
              relatedSlideId: 10.45,
            },
            {
              id: 'm11-q4',
              type: 'mcq',
              question:
                'What should you do when the agent cannot complete the task?',
              options: [
                'Nothing – wait',
                'Specify in system or user prompt: write “Failed” and the reason',
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
                'Before Module 12 practice, you have a process idea, but it is still unclear what starts the flow, which fields are required, and what happens when a step fails.',
              question: 'Which artifact reduces risk first?',
              options: [
                'Minimal workflow brief: trigger, input schema, actions, errors, tests, and human control',
                'Only platform choice without fields',
                'Only a nicer answer tone',
                'Only one generic prompt without tests',
              ],
              correct: 0,
              explanation:
                'The minimal brief turns an idea into a testable specification: what starts it, which data moves, what happens on error, and when a human steps in.',
              relatedSlideId: 10.64,
            },
            {
              id: 'm11-q6',
              type: 'scenario',
              bloomLevel: 3,
              scenarioContext:
                'You receive an RFP document and want: a researcher to gather facts, a writer to prepare a summary, an evaluator to check the criteria.',
              question: 'Which workflow pattern fits best?',
              options: [
                'Coordinator + specialists (or a chain with roles)',
                'Only one prompt without a role',
                'Routing by email size',
                'Parallel work without merging',
              ],
              correct: 0,
              explanation:
                'RFP with several roles – typical L2 (AI team): coordinator plans, specialists execute, evaluator checks. A chain with roles also works.',
              relatedSlideId: 10.48,
            },
            {
              id: 'm11-q7',
              type: 'mcq',
              bloomLevel: 3,
              question:
                'Scenario: a client fills a form on the website; you want the new entry to go into Google Sheets and the client to get email confirmation. What should you do first when designing the flow (Zapier, Make, etc.)?',
              options: [
                'Define the trigger – what starts the flow (e.g. new form submission), then actions (Sheets, email)',
                'First write only a long AI chat text with no link to form or email',
                'Only pick Slack channel name and color for the notification',
                'Launch to production and then think about errors',
              ],
              correct: 0,
              explanation:
                'First – the event that starts the flow (trigger) and the input schema; then actions (entry, email). Clear what starts the chain and what data moves.',
              relatedSlideId: 10.15,
            },
            {
              id: 'm11-q8',
              type: 'scenario',
              bloomLevel: 3,
              scenarioContext:
                'A workflow prepares a reply to a client and sometimes sees personal data. Standard replies repeat, but a wrong reply to the client would be hard to undo.',
              question: 'Which human-control mode fits best?',
              options: [
                'Exception review: standard cases are automatic; risky or unclear ones go to a human',
                'Results monitoring only: the human sees only a weekly summary',
                'After-the-fact check: send to the client immediately, later sample a few cases',
                'A human approves every case, even though only part of the flow is risky',
              ],
              correct: 0,
              explanation:
                'Exception review matches Augment logic: AI speeds up standard cases, but risk, personal data or ambiguity go to a human before sending.',
              relatedSlideId: 10.26,
            },
            {
              id: 'm11-q9',
              type: 'mcq',
              bloomLevel: 3,
              question:
                'Scenario: the agent completed the task, but the result was inaccurate. After analyzing the error you see the cause. What do you need to do so the learning loop closes, instead of only describing the problem?',
              options: [
                'Update the rule, prompt, skill or test based on the root cause – do not only write down what happened',
                'Write a note in a list and continue with the same prompt',
                'Make the agent answer longer',
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
              'Worth reviewing Module 10 topics: agent cycle, 3A bands (depth and roles), coordinator and specialist roles, workflow patterns, tools, error handling, and Zapier / Make integrations.',
            thresholdExplanation:
              'When you reach ≥70 %, you can go to Module 12. Less – review the agent cycle, 3A, multi-agent roles, workflow patterns and prompt safeguards.',
            useCaseBlock: {
              heading: 'Where to apply?',
              body: 'Depth and roles, multi-agent work, workflow (trigger, action), 3A and tools – research, reports, support triage, RFP analysis.',
              blockVariant: 'accent',
            },
            reflectionTitle: 'Reflection prompt',
            reflectionPrompt:
              'META: You are a training reflection assistant. Goal – consolidate knowledge after the Agent path test.\nINPUT: I just finished the Module 11 knowledge check – agent cycle, 3A, workflow patterns, tools and prompt safeguards.\nOUTPUT: Ask 3 questions: (1) Which agent step will I apply within 24 hours? (2) What was newest? (3) What do I want to try in Module 12? After my answers, give 1 concrete tip.',
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
                body: 'After the test you can try a mini agent chain in 5 minutes without Zapier or Make: 3 separate AI chats, a clear handoff, and one quality check.',
                blockVariant: 'accent',
              },
              {
                heading: 'Do this now',
                body: 'Pick a small process: RFP summary, weekly sales, or a client complaint. Run the prompt pack below and note what you pass from one role to the next.',
                blockVariant: 'brand',
              },
              {
                heading: 'Copyable prompt pack',
                body: 'Use in 3 separate AI chats.',
                copyable:
                  'COORDINATOR: Task: [DESCRIBE]. Split into 2 sub-tasks, assign a specialist and an evaluator. Specify input, output and the handoff rule.\n\nSPECIALIST: Input: [COORDINATOR PLAN]. Do the assigned work. Output: short summary, facts, unknowns.\n\nEVALUATOR: Check the specialist output against criteria: facts, clarity, risk. If data is missing – return a revision list.',
              },
              {
                heading: 'Check',
                body: 'Do you have a clear handoff rule and 1 trial case where data is missing? If yes – you are ready for the M12 quick start with prompts only (Coordinator + 2 specialists).',
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
      subtitle:
        '3 required practices (trigger → action → artifacts) + 4 optional scenarios',
      content: {
        whyBenefit:
          'After the project you will have ready artifacts: a multi-agent schema with prompts only, or a full workflow (trigger, condition, actions), field mapping, test cases, log evidence, and one Skill pack for reuse. Quick start – Coordinator + 2 specialists; full path – 3 practices per 3A.',
        duration: '~20–30 min start; ~60–90 min for all 3 practices',
        minScenariosToComplete: 3,
        firstActionCTA:
          'Press Continue → quick start (Coordinator + 2 specialists), then 3 practices per 3A.',
        recommendedStart:
          'Quick start: Coordinator + 2 specialists. Required path: 3 practices per 3A – Automatize, Augment, Autonomize. Extra: Research agent and M10 revisit scenarios.',
        primaryPathIntro:
          'Quick start – Coordinator + 2 specialists: 3 separate AI chats, a schema, and 1 test case. Required path – 3 main practices: Automatize, Augment, and Autonomize. Completing them finishes the module; extra scenarios are for deeper practice.',
        taskOneLiner:
          'Start with the quick start → then complete the 3 main practices. Extra scenarios only if you want more examples.',
        recommendedSlideIds: [124.5, 120.25, 120.5, 121, 122, 123],
      },
    },
    {
      id: 120.25,
      title: 'Three practices: Automatize, Augment, Autonomize',
      subtitle: 'Diagram – where human approval is needed',
      content: {
        preCopyCheckBlock: {
          question:
            'In the Augment band (Email → LLM → Approve → Send) – which point needs a human?',
          options: [
            'Every step',
            'Only Approve (before Send)',
            'Only the final Slack / notification',
            'No human is needed',
          ],
          correct: 1,
          explanation:
            'Augment = AI drafts, a human approves before send. Automatize – little human decision; Autonomize – human at escalation / QA.',
        },
        sections: [
          {
            heading: 'In short',
            body: 'Three M12 practices match 3A: **Automatize (80 %)** – rules; **Augment (15 %)** – human + AI; **Autonomize (5 %)** – limited autonomy. Pick a band below – then copy the template.',
            blockVariant: 'accent',
          },
          {
            heading: 'Comparison',
            body: 'Three flows side by side – the **highlighted point** is where a human is needed (Augment / Autonomize).',
            image: 'm12_three_labs',
            blockVariant: 'brand',
          },
          {
            heading: 'Do it now',
            body: 'Pick **one** 3A band for your process. After you pick, you will see only that band’s template.',
            blockVariant: 'brand',
            toolChoiceBar: {
              question: 'Which 3A band fits your process?',
              autoSelect: false,
              choices: [
                {
                  label: 'Automatize',
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
            heading: 'Template – Automatize',
            body: 'Fill the [ ] fields – then go to **Practice 1** (Automatize).',
            copyable:
              'My process: [e.g. Form → CRM → email → Slack]\n3A band: Automatize\nHuman point: (no gate – little decision)\nWhy (1 sentence): [ ]\nNext: Practice 1 (Automatize)',
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
            body: '1) Can you name the **human point** on your band?\n2) Which M12 practice (1 / 2 / 3) do you open next?\n\nIf the band is unclear – go back to M10 **3A strategy** before the practice.',
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
          'Understand when one AI is not enough and how to split work without coding. You saw the full orchestration walkthrough on **Agent orchestration simulation** – here is only the practice map and handoff rule. Practice – Coordinator + 2 specialists (quick start).',
        sections: [
          {
            heading: 'In short',
            body: 'Business multi-agent schema without coding: input → router (optional) → coordinator → specialists → evaluator → output (+ human approval).',
            blockVariant: 'accent',
          },
          {
            heading: 'Business multi-agent schema',
            body: 'The diagram shows roles and handoffs.',
            image: 'm12_multi_agent_schema',
            blockVariant: 'brand',
          },
          {
            heading: 'Handoff',
            body: 'Passing to the next role – clear rule: “When specialist finishes X, pass to evaluator in Y format.” Without handoff multi-agent becomes chaotic.',
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
        body: 'Before the 3A practices, quickly check that you understand the work split. Mark done when you can name which role does what and where human approval is needed.',
        sections: [
          {
            heading: 'What to check',
            body: 'Can you name the chain: **Input → Coordinator → 2 specialists → Evaluator → Output**? Do you know where the **human-approval gate** sits?',
          },
          {
            heading: 'Mini trial (1 min)',
            body: 'Copy the prompt and run one coordinator + specialist pair for your topic.',
            copyable:
              'You are the coordinator. Task: [DESCRIBE]. 1) Split into 2 parts. 2) Write a separate specialist prompt for each part. 3) Specify how the specialist hands off to the evaluator (format). 4) Add one human-approval point before the final output.',
          },
          {
            heading: 'If unclear',
            body: 'Go back to **Business multi-agent schema** and review the handoff rule again.',
          },
        ],
        footer: 'Next – slide 5: Quick start',
      },
    },
    {
      id: 121,
      title: 'Practice 1: Automatize (80 %)',
      subtitle: 'Form → Sheets/CRM → Email → Slack/Teams (Zapier or Make)',
      scenario: {
        narrativeLead:
          'Pick a form and destinations (Sheets/CRM, email, Slack or Teams). Build the workflow and record artifacts.',
        situation:
          'Automatize (80 %): rule-based flows – form to CRM, email and team notification without manual decision at each step.',
        context:
          'Build workflow: Form (Google Forms / Typeform) → Sheets or CRM → personalized email → Slack/Teams. Tool: Zapier or Make.',
        data: 'Rule-based flows. Task: build a working workflow and record artifacts – diagram, field mapping, tests, log evidence.',
        constraints:
          'Use Zapier or Make (free tier is enough). If you do not have an account, use ChatGPT to generate a platform-ready leading document from the Zapier / Make template on **Business automation tools**. Describe what to do if API does not respond (error handling).',
        expectedFormat:
          'Artifacts: 1-page workflow spec or platform-ready leading document (trigger, input schema, conditions, actions, output, error handling), field mapping, at least 2 test cases, log / screenshot evidence or document excerpts.',
      },
      practicalTask: {
        title: 'Record workflow and artifacts (Automatize)',
        placeholder:
          'Enter or paste your workflow description, field mapping and test case summary…',
        templateLabel: 'Workflow specification – template',
        template:
          'Trigger: [e.g. new form submission]\nInput: [required fields]\nCondition: [if needed]\nActions: (1) Sheets/CRM (2) email (3) Slack/Teams\nOutput: [what the team gets]\nErrors: [what to do if API does not respond]\nTest 1 (happy path): [ ]\nTest 2 (error): [ ]',
        explanation: 'Artifacts prove the workflow was built and tested.',
        instructions: {
          title: 'Steps and artifacts',
          steps: [
            {
              step: 1,
              title: 'Build workflow or prepare a leading document',
              description:
                'If you have an account, use Zapier or Make. If not, generate a Zapier / Make specification with ChatGPT.',
              hint: 'If you have an account, use Zapier or Make. If not, generate a Zapier / Make specification with ChatGPT.',
              partialSolution:
                'Without an account, a platform-ready document is enough: trigger, fields, steps, errors, tests.',
            },
            {
              step: 2,
              title: 'Fill 1-page workflow specification',
              description:
                'Use the structure like **Minimal workflow brief** (trigger → errors + 2 tests).',
              hint: 'Use the structure like **Minimal workflow brief** (trigger → errors + 2 tests).',
              partialSolution:
                'Use the structure like **Minimal workflow brief** (trigger → errors + 2 tests).',
            },
            {
              step: 3,
              title: 'Field mapping: form field → CRM/Sheets column',
              description: 'Short table or list.',
              hint: 'Short table or list.',
              partialSolution: 'Short table or list.',
            },
            {
              step: 4,
              title: 'Write min. 2 test cases and capture logs/screenshots',
              description: 'Successful run + one error case.',
              hint: 'Successful run + one error case.',
              partialSolution: 'Successful run + one error case.',
            },
          ],
        },
      },
      content: {
        scenarioTitle: 'Practice 1: Automatize (80 %)',
        scenarioDescription:
          'Rule-based flows. Build workflow: Form (Google Forms / Typeform) → Sheets or CRM → personalized email → Slack/Teams. Tool: Zapier or Make. Artifacts: workflow diagram (1 p.), field mapping, min. 2 test cases, logs/screenshots.',
        taskFrame: 'Task',
        scenario: {
          narrativeLead:
            'Pick a form and destinations (Sheets/CRM, email, Slack or Teams). Build the workflow and record artifacts.',
        },
        template:
          'Trigger: [e.g. new form submission]\nInput: [required fields]\nCondition: [if needed]\nActions: (1) Sheets/CRM (2) email (3) Slack/Teams\nOutput: [what the team gets]\nErrors: [what to do if API does not respond]\nTest 1 (happy path): [ ]\nTest 2 (error): [ ]',
        templateLabel: 'Workflow specification – template',
        instructions: {
          title: 'Steps and artifacts',
          steps: [
            {
              step: 1,
              title: 'Build workflow or prepare a leading document',
              description:
                'If you have an account, use Zapier or Make. If not, generate a Zapier / Make specification with ChatGPT.',
            },
            {
              step: 2,
              title: 'Fill 1-page workflow specification',
              description:
                'Use the structure like **Minimal workflow brief** (trigger → errors + 2 tests).',
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
      subtitle: 'Email → AI summary → human approve → send',
      scenario: {
        narrativeLead:
          'Build workflow with AI summary step and human approval. Record prompt and rules.',
        situation:
          'Augment (15 %): human decides, AI helps – e.g. email → summary → approval before send.',
        context:
          'Flow: incoming email → AI summary (e.g. ChatGPT or Make AI module) → human approval before send → send.',
        data: 'Task: build workflow and prepare artifacts – diagram, summary prompt template, approval step description, 1–2 test cases.',
        constraints:
          'Use Make or Zapier with an AI module. If you do not have an account or AI module, use ChatGPT to generate a Make / Zapier leading document: modules, fields, summary prompt, approval rule, and tests. Clearly describe who sees the summary and who approves exceptions.',
        expectedFormat:
          'Artifacts: workflow diagram or platform-ready leading document, summary prompt, approval rule, 1–2 test cases.',
      },
      practicalTask: {
        title: 'Record augment workflow and artifacts',
        placeholder:
          'Enter workflow summary, summary prompt and approval rules…',
        templateLabel: 'Summary template and approval rule',
        template:
          'Summary prompt: From this email extract: (1) sender and date, (2) main topic in one sentence, (3) 3–5 bullet points. Human-in-the-loop: before sending human approves or edits.\n\nEVALUATOR PROMPT: Check the summary: (1) tone suitable for client, (2) facts match original, (3) no excess PII. If not – return list of fixes.',
        explanation: 'Human approval reduces risk of wrong automatic send.',
        instructions: {
          title: 'Steps and artifacts',
          steps: [
            {
              step: 1,
              title:
                'Build workflow: trigger (new email) → AI summary → approval step → send',
              description:
                'Use Make or Zapier with an AI module, or prepare the same flow as a leading document.',
              hint: 'If you do not have an AI module, generate a platform specification with ChatGPT: modules, prompt, approval, tests.',
              partialSolution:
                'Without an account, a document with trigger, summary prompt, approval rule, and tests is enough.',
            },
            {
              step: 2,
              title:
                'Write summary prompt template and approval step description',
              description: 'Who sees, who approves, what to do if rejected.',
              hint: 'Who sees, who approves, what to do if rejected.',
              partialSolution:
                'Who sees, who approves, what to do if rejected.',
            },
            {
              step: 3,
              title: 'Write 1–2 test cases and workflow diagram (1 p.)',
              description: 'Happy path + one edge case.',
              hint: 'Happy path + one edge case.',
              partialSolution: 'Happy path + one edge case.',
            },
          ],
        },
      },
      content: {
        scenarioTitle: 'Practice 2: Augment (15 %)',
        scenarioDescription:
          'Human decides, AI helps. Flow: incoming email → AI summary (e.g. ChatGPT/Make AI module) → human approval before send → send. Artifacts: workflow diagram, summary prompt template, approval step description, 1–2 test cases.',
        taskFrame: 'Task',
        scenario: {
          narrativeLead:
            'Build workflow with AI summary step and human approval. Record prompt and rules.',
        },
        template:
          'Summary prompt: From this email extract: (1) sender and date, (2) main topic in one sentence, (3) 3–5 bullet points. Human-in-the-loop: before sending human approves or edits.\n\nEVALUATOR PROMPT: Check the summary: (1) tone suitable for client, (2) facts match original, (3) no excess PII. If not – return list of fixes.',
        templateLabel: 'Summary template and approval rule',
        instructions: {
          title: 'Steps and artifacts',
          steps: [
            {
              step: 1,
              title:
                'Build workflow: trigger (new email) → AI summary → approval step → send',
              description:
                'Use Make or Zapier with an AI module, or prepare the same flow as a leading document.',
            },
            {
              step: 2,
              title:
                'Write summary prompt template and approval step description',
              description: 'Who sees, who approves, what to do if rejected.',
            },
            {
              step: 3,
              title: 'Write 1–2 test cases and workflow diagram (1 p.)',
              description: 'Happy path + one edge case.',
            },
          ],
        },
      },
    },
    {
      id: 123,
      title: 'Practice 3: Autonomize (5 %)',
      subtitle: 'Feedback → sentiment AI → escalation → ticket/task',
      scenario: {
        narrativeLead:
          'Build sentiment-based escalation workflow. Define thresholds and what to do in an incident.',
        situation:
          'Autonomize (5 %): AI agent with limits – feedback, sentiment, escalation to ticket or task.',
        context:
          'Flow (roles): **Classifier** → **Sentiment specialist** → **Escalation coordinator** → ticket. Feedback (CRM/form) → sentiment AI → escalation → ticket (Jira, Trello, Teams).',
        data: 'Task: define thresholds, escalation rules and prepare artifacts – diagram, link to incident playbook.',
        constraints:
          'Use Make, n8n or Zapier with an AI module. If you do not have an account or AI module, use ChatGPT to generate a platform-ready leading document from the Make / n8n / Zapier template. State when to create a ticket and which fields to fill.',
        expectedFormat:
          'Artifacts: workflow diagram (1 p.) or platform-ready leading document, sentiment threshold definition, escalation rules, link to incident playbook (5 steps) – slide **Minimal workflow brief**.',
      },
      practicalTask: {
        title: 'Record autonomous workflow and rules',
        placeholder:
          'Enter sentiment thresholds, escalation rules and workflow summary…',
        templateLabel: 'Sentiment and escalation rules',
        template:
          'First fill **Minimal workflow brief**, then this flow.\n\nSentiment thresholds: if < 3 stars or negative – create ticket and notify team. Escalation rule: ticket fields “sentiment”, “original_text” (short).\n\nIncident playbook: stop → record → assess → notify → fix (see **Minimal workflow brief**).',
        explanation: 'Clear rules prevent wrong mass escalation.',
        instructions: {
          title: 'Steps and artifacts',
          steps: [
            {
              step: 1,
              title:
                'Build workflow: feedback → sentiment AI → condition (if < threshold) → ticket/task',
              description:
                'Use Make, n8n or Zapier with an AI module, or prepare the same flow as a leading document.',
              hint: 'If you do not have an account, generate a platform specification with ChatGPT: nodes / modules, thresholds, escalation, tests.',
              partialSolution:
                'Without an account, a document with trigger, thresholds, fields, escalation, errors and tests is enough.',
            },
            {
              step: 2,
              title: 'Define sentiment thresholds and escalation rules',
              description: 'When to create ticket, which fields to fill.',
              hint: 'When to create ticket, which fields to fill.',
              partialSolution: 'When to create ticket, which fields to fill.',
            },
            {
              step: 3,
              title:
                'Write workflow diagram (1 p.) and link to incident playbook (5 steps)',
              description:
                '5 steps: stop, record, assess, notify, fix – slide **Minimal workflow brief**.',
              hint: '5 steps: stop, record, assess, notify, fix – slide **Testing and security**.',
              partialSolution:
                '5 steps: stop, record, assess, notify, fix – slide **Testing and security**.',
            },
          ],
        },
      },
      content: {
        scenarioTitle: 'Practice 3: Autonomize (5 %)',
        scenarioDescription:
          'AI agent roles: **Classifier** → **Sentiment specialist** → **Escalation coordinator** → ticket/task. Feedback (CRM/form) → sentiment AI → escalation → ticket (Jira, Trello, Teams).',
        taskFrame: 'Task',
        scenario: {
          narrativeLead:
            'Build sentiment-based escalation workflow. Define thresholds and what to do in an incident.',
        },
        template:
          'First fill **Minimal workflow brief**, then this flow.\n\nSentiment thresholds: if < 3 stars or negative – create ticket and notify team. Escalation rule: ticket fields “sentiment”, “original_text” (short).\n\nIncident playbook: stop → record → assess → notify → fix (see **Minimal workflow brief**).',
        templateLabel: 'Sentiment and escalation rules',
        instructions: {
          title: 'Steps and artifacts',
          steps: [
            {
              step: 1,
              title:
                'Build workflow: feedback → sentiment AI → condition (if < threshold) → ticket/task',
              description:
                'Use Make, n8n or Zapier with an AI module, or prepare the same flow as a leading document.',
            },
            {
              step: 2,
              title: 'Define sentiment thresholds and escalation rules',
              description: 'When to create ticket, which fields to fill.',
            },
            {
              step: 3,
              title:
                'Write workflow diagram (1 p.) and link to incident playbook (5 steps)',
              description:
                '5 steps: stop, record, assess, notify, fix – slide **Minimal workflow brief**.',
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
          'Task: prepare a source-quality table and a short summary. Copy prompt into AI and run with your topic.',
        data: 'Use AI with search enabled. Fill placeholders ([TOPIC], [AUDIENCE]) with your topic.',
        constraints:
          'If no sources – write “Not found” and why. Do not invent links.',
        expectedFormat:
          'Artifact: source table, 5-sentence summary and clear “Not found” message if reliable sources are not available.',
      },
      practicalTask: {
        title: 'Complete research agent task',
        placeholder: 'Paste AI answer summary or your notes on sources…',
        templateLabel: 'Prompt – copy to AI',
        template:
          'You are a research agent with a source-quality rule.\n\nTOPIC: [TOPIC]\nAUDIENCE: [AUDIENCE]\n\nTask:\n1) Find 3–5 reliable sources about the topic.\n2) For each source, return a table: title | link | why to trust it | what the source proves | risk / limitation.\n3) Write a 5-sentence summary in English.\n4) If you cannot find reliable sources, write “Not found” and explain what is missing.\n\nRules: do not invent links; separate fact from interpretation; mark if a source is old or not primary.',
        explanation: 'Prepares agent thinking without a full workflow tool.',
        instructions: {
          title: 'Steps',
          steps: [
            {
              step: 1,
              title: 'Copy prompt and paste into AI with search enabled',
              description:
                'Fill [TOPIC] and [AUDIENCE]. Run it and review the source table.',
              hint: 'Fill [TOPIC] and [AUDIENCE]. Run it and review the source table.',
              partialSolution:
                'Fill [TOPIC] and [AUDIENCE]. Run it and review the source table.',
            },
          ],
        },
      },
      content: {
        scenarioTitle: 'Research agent',
        scenarioDescription:
          'Task: source-quality table + summary. Copy prompt into AI and run with your topic.',
        taskFrame: 'Task',
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
              title: 'Copy prompt and paste into AI with search enabled',
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
          'Run manual pipeline: 3 separate AI chats with handoff rules. Context: weekly sales summary or RFP research.',
        situation:
          'SHOULD: multi-agent practice in business terms – coordinator, specialist, evaluator.',
        context:
          'Pick topic (sales summary or RFP). Use 3 prompts in separate chats. Record diagram and 1 test case.',
        data: 'Artifacts: diagram (roles + handoff), 3 prompts, 1 test case (e.g. missing data).',
        constraints:
          'Without Zapier/Make – only prompt orchestration. Human approval before final send.',
        expectedFormat: 'Diagram + 3 copied prompts + test case description.',
      },
      practicalTask: {
        title: 'Multi-agent prompt pipeline',
        placeholder: 'Paste diagram, 3 prompts and test case summary…',
        templateLabel: '3 prompts – coordinator, specialist, evaluator',
        template:
          'COORDINATOR: You are the coordinator. Task: [DESCRIBE]. Break into 2 sub-tasks, assign roles, handoff rules.\n\nSPECIALIST: You are [researcher/writer]. Input: [from coordinator]. Do [X]. Output: [format].\n\nEVALUATOR: Check all criteria are met. If not – return for revision with specific points.',
        explanation:
          'Manual pipeline prepares multi-agent thinking without a framework.',
        instructions: {
          title: 'Steps',
          steps: [
            {
              step: 1,
              title: 'Run coordinator prompt',
              description: 'Get plan with roles and handoff.',
            },
            {
              step: 2,
              title: 'Run specialist prompt',
              description: 'Pass coordinator output as input.',
            },
            {
              step: 3,
              title: 'Run evaluator prompt',
              description: 'Check and record 1 test case.',
            },
          ],
        },
      },
      content: {
        scenarioTitle: 'Coordinator + 2 specialists',
        scenarioDescription:
          '3 CopyButton prompts: coordinator, specialist, evaluator. Run manual pipeline. Artifacts: diagram + 3 prompts + 1 test case.',
        taskFrame: 'Task',
        template:
          'COORDINATOR: You are the coordinator. Task: [DESCRIBE]. Break into 2 sub-tasks, assign roles, handoff rules.\n\nSPECIALIST: You are [researcher/writer]. Input: [from coordinator]. Do [X]. Output: [format].\n\nEVALUATOR: Check all criteria are met. If not – return for revision with specific points.',
        templateLabel: '3 prompts – coordinator, specialist, evaluator',
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
            heading: 'Do it now',
            body: 'Pick one topic below; copy and run it in AI.',
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
            body: 'Enable search or calculator on the platform and check whether AI used the tool in the answer.',
            copyable:
              'Use [tool – search or calculator] and provide result with short explanation. Task: [DESCRIBE].',
            blockVariant: 'terms',
            collapsible: true,
            collapsedByDefault: true,
          },
          {
            heading: 'Error handling and limits',
            body: 'Add this to the system prompt and try a task without data – AI must clearly say when it cannot complete.',
            copyable:
              'If the task cannot be completed: write “Failed: [reason]” and suggest what the user can fix. Never return an empty answer.',
            blockVariant: 'terms',
            collapsible: true,
            collapsedByDefault: true,
          },
          {
            heading: 'Check',
            body: 'Did you copy **one** and run it in AI? If not – go back to Do it now.',
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
          'Congratulations! You completed at least one of 3 required practices (Automatize / Augment / Autonomize) or optional scenarios. You have workflow diagram, artifacts and templates for further work.',
        stats: [
          { label: 'Required practices', value: '3' },
          { label: 'Scenarios', value: '4' },
          { label: 'Artifacts', value: 'diagram + tests' },
        ],
        sections: [
          {
            heading: 'Three practices and 3A',
            items: [
              'Automatize – routine steps without manual work',
              'Augment – AI as helper with approval',
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
          'META: You are a training reflection assistant. Goal – consolidate Agent engineering project results.\nINPUT: I just finished Module 12: at least one of 3 required practices (Automatize / Augment / Autonomize) and maybe optional scenarios – I have workflow diagram and artifacts.\nOUTPUT: Ask 3 questions: (1) Which agent or workflow step will I apply in 24 hours? (2) What was newest? (3) What do I want to try first with a real process? After my answers, give one concrete tip.',
        tagline: '3 practices + artifacts = working result first.',
        nextStepCTA: 'Go to Module 13: Content engineering with AI',
        firstAction24h:
          'In 24–48 hours run one workflow in your project (Zapier / Make / AI with tools) or repeat the same scenario with another form.',
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
syncEnFootersFromLt();

writeFileSync(outPath, JSON.stringify(en, null, 2) + '\n', 'utf8');
const lines = readFileSync(outPath, 'utf8').split('\n').length;
console.log('Written:', outPath, 'lines:', lines);
console.log(
  'Slides:',
  en.modules
    .map((m) => `M${m.id}:${m.slides.map((s) => s.id).join(',')}`)
    .join('; ')
);

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
  if (key === 'definition') return 'A key term used in agent engineering.';
  if (key === 'copyable' || key === 'template' || key === 'reflectionPrompt') {
    return 'Role: agent assistant. Task: review the process, use tools only when needed, return a clear result and say what failed if data is missing.';
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
  if (key === 'whyBenefit')
    return 'After this step you will have a clearer AI agent workflow.';
  if (key === 'firstActionCTA')
    return 'Start with one small agent task and check the result.';
  if (key === 'microWinPhrase')
    return 'Each correct answer shows that you can apply agent engineering.';
  if (key === 'duration') return value.replace('min', 'min');
  if (key === 'label') return fallbackLabel(value);
  if (key === 'value') return fallbackValue(value);
  if (
    key === 'body' ||
    key === 'description' ||
    key === 'introBody' ||
    key === 'narrativeLead'
  ) {
    return 'Use this step to design, test and improve an AI agent workflow with clear tools, limits and human approval where needed.';
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
    return 'Design one AI agent or workflow scenario, define the inputs, tools, output, tests and error handling.';
  }
  if (key === 'taskFrame') return 'Task';
  if (key === 'placeholder') return 'Enter your answer here...';
  if (key === 'hint' || key === 'partialSolution')
    return 'Keep the goal, tools and output format explicit.';
  if (
    path.includes('.items[') ||
    path.includes('.outcomes[') ||
    path.includes('.nextSteps[') ||
    path.includes('.recommendedSlideIds[')
  ) {
    return 'Define goal, tools, limits and output.';
  }
  return 'AI agent workflow step.';
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
  if (text.includes('GitHub')) return 'GitHub as code source';
  if (text.includes('Minimalus darbo')) return 'Minimal workflow brief';
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
    'Ribos (guardrails)': 'Guardrails',
    'Klaidos tvarkymas': 'Error handling',
    Koordinatorius: 'Coordinator',
    Vertintojas: 'Evaluator',
    Maršrutizatorius: 'Router',
    'Kelių agentų sistema': 'Multi-agent system',
  };
  return map[value] ?? 'Agent engineering term';
}

function fallbackOption(value) {
  const text = String(value);
  if (text.includes('Atnaujinti taisyklę'))
    return 'Update the rule, prompt, skill or test based on the root cause';
  if (text.includes('Užrašyti pastabą'))
    return 'Write a note and keep using the same prompt';
  if (text.includes('Padidinti')) return 'Make the agent answer longer';
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
