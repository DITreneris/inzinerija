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
  'Kelias – ką čia rasi': 'Path – what you will find',
  'Agentų ciklas': 'Agent cycle',
  'Kontrolinis taškas: ciklas': 'Checkpoint: agent cycle',
  'Savitikra: ciklas': 'Warm-up: cycle',
  '3A strategija': '3A strategy',
  'Kada tvirtina žmogus?': 'When does a human approve?',
  'Rolės ir sisteminis promptas': 'Role and system prompt',
  'DI agentų tipai ir rolės': 'Agent types and roles',
  'Kontrolinis taškas: rolės': 'Checkpoint: roles',
  '5 darbo eigos šablonai': '5 workflow patterns',
  'Keli agentai → darbo eiga': 'Multi-agent → workflow',
  'Orkestravimo simuliacija': 'Orchestration walkthrough',
  'Savitikra: workflow': 'Warm-up: workflow',
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
  'GitHub kaip kodo šaltinis': 'GitHub as code source',
  'Minimalus eigos aprašymas': 'Minimum workflow brief',
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
          shortTitle: 'Path – what you will find',
          subtitle: 'Short overview; detail on later slides',
          content: {
            sections: [
              {
                heading: 'In short',
                body:
                  'In this module, in order: **agent cycle** (diagram), **workflow concepts** (trigger, condition, action, webhook and more – full table and examples on another slide), **3A strategy**, **AI agent types and roles**, **5 workflow patterns**, **role and system prompt**, **AI tool selection**, **business automation platforms** (Zapier, Make, n8n, Power Automate), **when to choose an agent**, **errors and limits**. Optional: spec and testing; glossary; summary.\n\nWe **do not repeat** term definitions here – find them on the **Key concepts** slide.',
              },
              {
                heading: 'What you will find (order)',
                body:
                  '**Agent cycle** → **3A strategy** → **AI agent types and roles** → **5 workflow patterns** → **Role and system prompt** → **Tool selection** → **When to use an agent** → **Errors and limits** → **Workflow concepts** → **Business automation tools** → optional: spec/tests; **Glossary**; **summary**.',
              },
              {
                heading: 'Do this now',
                body: 'On the next slide open **Agent cycle and architecture** – process diagram and cycle explanation there.',
              },
            ],
          },
        },
        {
          id: 10.2,
          title: 'Agent cycle and architecture',
          subtitle: 'Agent → Planning → Tools → Result → Feedback',
          content: {
            sections: [
              {
                heading: 'Process diagram',
                body:
                  'Agent cycle: from task to result and feedback. View full size – the same image opens in a modal.',
              },
              {
                heading: 'How an agent works',
                body:
                  'An AI agent **(1)** receives a task, **(2)** plans steps, **(3)** uses tools (search, API, files – if the platform allows), **(4)** returns a result with feedback.\n\n**Cycle in practice:** understand → choose tool → execute → based on the result, decide whether to repeat the step or finish. Unlike a simple chat – the agent **autonomously** chooses actions and can call external tools.',
              },
              {
                heading: 'When to use an agent (brief)',
                body:
                  '- You need **several steps**, not one answer.\n- Hard to describe everything with **pure rules**.\n- There is **unstructured data** (text, emails, feedback) that must be interpreted.\n\nA **simple prompt** is enough when one clear question and one answer – no search or external systems.\n\n**More detail** – with examples and an agent template – on **When to choose an agent vs a simple prompt**.',
              },
              {
                heading: 'Do this now',
                body: 'Copy the task below into AI and run it.',
              },
              {
                heading: 'Copyable AI task',
                body:
                  'Task for AI (paste into chat): “Explain in your own words **in four steps** how an AI agent works, and **in one sentence** – how it differs from one question and one answer without tools.”',
                copyable:
                  'Explain in your own words in four steps how an AI agent works, and in one sentence – how it differs from one question and one answer without tools.',
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
                question: 'Which sign best shows that this is an agent-style task?',
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
                question: 'What should an agent return if it cannot use a tool?',
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
                heading: '3A strategy (diagram)',
                body:
                  'Visually: the largest share – **Automatize (80 %)**, smaller – **Augment (15 %)**, smallest – **Autonomize (5 %)**. Balance of value and safety. **View full size** – same image in a modal.',
              },
              {
                heading: 'Three bands (80 / 15 / 5)',
                body:
                  '**AUTOMATIZE (80 %)** – rule-based flows, no human decision. E.g.: form → CRM → email → Slack.\n\n**AUGMENT (15 %)** – human decides, AI helps (summaries, classification, recommendations). E.g.: email → AI summary → human approval → send.\n\n**AUTONOMIZE (5 %)** – AI agents with limits: RAG, quality control, escalation. E.g.: feedback → sentiment AI → escalation → ticket.',
              },
              {
                heading: 'Where to apply',
                body:
                  'When planning business automation: which processes need only rules (80), which need human approval (15), where an agent can act with limits (5). The 80/15/5 rule – optimal value and safety ratio.',
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
                body:
                  'Not every task needs an AI team. First choose **depth** (Chat → Agent → Team → Flow), then whether you need **roles**. Below – schema and lab; start from your process.',
                blockVariant: 'accent',
              },
              {
                heading: 'Depth and team roles',
                body:
                  'Choose depth in the lab – the schema highlights the same choice. Team reveals the roles.',
                blockVariant: 'brand',
              },
              {
                heading: 'Do this now',
                body:
                  'Choose depth for your process. If **Team** – three roles (coordinator, specialist, evaluator); router only if you need triage. Copy the artefact in the lab.',
                blockVariant: 'brand',
              },
              {
                heading: 'Check',
                body:
                  'Did you choose a **depth**? If Team – are the three roles clear? If not – start from **Agent** (one agent).',
                blockVariant: 'accent',
              },
              {
                heading: 'When not to use multi-agent',
                body:
                  'One agent is enough for a simple task. A multi-agent system is too early if there is no human approval or a clear “done” criterion. Start simple – add roles only when one agent is no longer enough.',
                blockVariant: 'terms',
                collapsible: true,
                collapsedByDefault: true,
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
                body:
                  'When one AI agent is no longer enough, use **workflow patterns** – not programming, but a clear plan of roles and handoffs.',
              },
              {
                heading: '5 patterns',
                body:
                  '**1. Chain** – one step after another (query → classification → draft → send).\n\n**2. Routing** – different branch by type (complaint / inquiry / proposal).\n\n**3. Parallel work** – several specialists at once, then merge (CRM + email → one summary).\n\n**4. Coordinator + specialists** – dynamically assigns sub-tasks (weekly report: data + trends → 1 page).\n\n**5. Generator + evaluator** – draft → QC → fix (email, report, FAQ).',
              },
              {
                heading: 'Do this now',
                body:
                  'Pick one pattern for your process and note which roles perform each step.',
              },
              {
                heading: 'Copyable prompt (coordinator)',
                body: 'Copy and fill [DESCRIBE].',
                copyable:
                  'You are the coordinator. Task: [DESCRIBE].\nBreak into 2–3 sub-tasks. For each assign a role (specialist / evaluator),\ninput, output and handoff rule (when to pass to the next role).\nPresent the plan as a numbered list.',
              },
              {
                heading: 'Check',
                body:
                  'Does the plan have a clear **completion criterion**? Do risky steps have **HITL** (human approval)?',
              },
              {
                heading: 'When NOT to use multi-agent',
                body:
                  'If the task has 1–2 steps – L1 (one agent) is enough. Multi-agent without an evaluator is risky for finance, support and public content.',
              },
            ],
            footer: 'Next – slide 7: Role and system prompt',
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
                question: 'Which workflow pattern fits when one step must happen after another?',
                options: ['Chain', 'Routing', 'Parallel work', 'Only one question without a pattern'],
                correct: 0,
                explanation:
                  'A chain fits when one step clearly follows another: query → classification → draft → send.',
              },
              {
                id: 'm10-warm-workflow-2',
                question: 'Which pattern fits when a request is routed by type?',
                options: ['Routing', 'Chain', 'Generator + evaluator', 'Only the 3A strategy'],
                correct: 0,
                explanation:
                  'Routing sends a request by type or category: complaint, inquiry, proposal and similar branches.',
              },
              {
                id: 'm10-warm-workflow-3',
                question: 'Which pattern is safest when you need a draft and a quality check?',
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
          title: 'Role and system prompt template',
          subtitle: 'How to set role and limits for an agent',
          content: {
            sections: [
              {
                heading: 'In short',
                body:
                  'Role defines how AI behaves – in simple chat and in agent systems. System prompt – where role, limits and principles are set.',
              },
              {
                heading: 'Do this now',
                body:
                  'Copy the prompt below into your AI tool’s “system settings” field (if available). Then ask one agent-style query.',
              },
              {
                heading: 'Copyable prompt',
                body: 'Below – system prompt you can copy into AI tool settings.',
                copyable:
                  'Your role – assistant that completes tasks step by step.\nUse tools (search, calculators, etc.) when they help the answer.\nIf the task is unclear or fails – briefly say why and what to fix.\nDo not invent data – if facts are needed, use search or write “I don’t know”.',
              },
              {
                heading: 'Check',
                body:
                  'If AI does not use tools when needed – check whether the platform has agent features enabled (Browse, Tools). If the answer has no sources – ask “provide sources” or specify sources in the input.',
              },
            ],
          },
        },
        {
          id: 10.4,
          title: 'Tool selection and limits',
          subtitle: 'What AI can use – search, files, API; platforms (ChatGPT, Claude, Gemini)',
          content: {
            sections: [
              {
                heading: 'In short',
                body:
                  'Not all AI tools have the same tools. In the task clearly write: “Use search and provide sources”. Tell the user (or yourself) what is available on the chosen platform.',
              },
              {
                heading: 'Popular platforms – what they offer',
                body:
                  '**ChatGPT** (OpenAI): web search (Browse), image generation (DALL·E), calculator. **Claude** (Anthropic): Tools – can connect search, API, custom functions. **Gemini** (Google): search, Workspace integration (Docs, Sheets, Gmail). Each platform differs – before writing an agent prompt check settings: is search or tools enabled.',
              },
              {
                heading: 'Do this now',
                body:
                  'Open your AI tool settings and note which tools you allow (search, files, API). Then in one task clearly write: “Use search and provide sources”.',
              },
              {
                heading: 'Copyable prompt',
                body: 'Below – prompt with search instruction; copy and fill [DESCRIBE TASK].',
                copyable:
                  'Task: [DESCRIBE TASK].\nUse search to find the latest information. If you find sources – list them at the end of the answer. If not – write “Not found” and briefly explain what you searched for.',
              },
              {
                heading: 'Check',
                body:
                  'If the answer has no links – did you say “use search”? Is the tool enabled on the platform?',
              },
              {
                heading: 'Tool selection tree (interactive diagram)',
                body:
                  'Pick a branch in the diagram – confirmation at the bottom. Full description – in **Business automation tools**, §21.',
              },
              {
                heading: 'Tool selection tree (for workflow tools)',
                body:
                  '**Office 365 heavy** (Teams, Outlook, SharePoint daily) → **Power Automate**. **Non-tech team, quick start** → **Zapier**. **Complex logic + good price** → **Make.com**. **Full control, self-host, data on our side** → **n8n**. **Enterprise governance, auditors, compliance** → **Workato**. Full comparison – in “Business automation tools”, §21.',
              },
            ],
          },
        },
        {
          id: 10.5,
          title: 'When to choose an agent vs a simple prompt',
          subtitle: 'Complex tasks with tools – agent; one question – simple prompt',
          content: {
            sections: [
              {
                heading: 'In short',
                body:
                  'Agent – when the task is complex (several actions, external data, tools). Simple prompt – when one question, one answer, no external tools.\n\n**Multi-agent patterns** (chain, routing, etc.) – slide **10.48**.',
              },
              {
                heading: 'Copyable prompt (example)',
                body: 'Below – agent task example; fill [ROLE] and [X].',
                copyable:
                  'Role: [ROLE]. Task: (1) Search [X], (2) pick 3–5 key sources, (3) write a summary in English with links. If not found – write “Not found” and why.',
              },
              {
                heading: 'Agent prompt template (5 parts)',
                body:
                  'A clear agent prompt has 5 parts: (1) Role – who you are, limits; (2) Task in steps – what to do in order; (3) Tools – what to use (search, API); (4) Output format – table, language, sources; (5) Error handling – what to return when it fails. Longer full template – expandable block below.',
              },
              {
                heading: 'Full template – copy',
                body: 'Use this template for any agent task. Fill the [ ] fields.',
                copyable:
                  'ROLE\nYou are [domain / role]. Your responsibility – [what you do]. You have access to [search / calculator / API]. Do not: [limits, e.g. do not invent data].\n\nTASK (step by step)\n(1) [First step, e.g. search X]\n(2) [Second step, e.g. pick 3–5 sources]\n(3) [Third step, e.g. write summary]\n\nTOOLS\nUse [search / tool] when [when]. If facts needed – use search or write “I don’t know”. List sources at the end.\n\nFORMAT\n[Table / list / report]. Language: English. Sources: cite them.\n\nERROR HANDLING\nIf the task cannot be completed (missing data, timeout): write “Failed: [reason]” and suggest what to fix. Never return an empty answer.',
              },
              {
                heading: 'Rules and tips',
                body:
                  'Rules: be clear (steps, not just goal); specify tools (“use search”, “provide sources”); error handling required; system prompt ideally up to ~1000 tokens; state limits (what not to do). Tips: before writing list 3–5 steps; if possible add 1 example (few-shot); test when data is missing – does AI return clear “Not found” / “Failed”.',
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
                body:
                  'The agent must know what to do when something fails. Set limits: what not to do, what to return instead of an empty answer.',
              },
              {
                heading: 'Do this now',
                body:
                  'Paste the text below into **system** or **user** prompt (or both). Then ask AI a deliberately impossible task – e.g. “Search for the 2029 profit report of non-existent company X and provide real sources”.',
              },
              {
                heading: 'Copyable prompt',
                body: 'Add to system or user prompt – what to do when it fails.',
                copyable:
                  'If the task cannot be completed (missing data, disallowed action or timeout): write a short message “Failed: [reason]” and suggest what the user can fix. Never return an empty answer.',
              },
              {
                heading: 'Check',
                body:
                  'Did AI return **“Failed”** (or similar) and **reason**, not an empty answer? If it stays silent – add to prompt: “If you cannot – always say why.”',
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
                heading: 'Workflow chain (diagram)',
                body:
                  'Main sequence: **Trigger → Condition → Action**. **Webhook** – event from another system; often **starts** the same type of flow as a trigger (e.g. payment). **View full size** – same image in a modal.',
              },
              {
                heading: 'Concepts and examples',
                body:
                  '**Trigger** – event that starts the workflow (new email, form submission, file in folder, payment).\n\n**Condition** – rule for the next step (e.g. if value > €500 – send to manager; if email valid – write to CRM).\n\n**Action** – action in a system (email, CRM entry, task, table update).\n\n**Webhook** – real-time data transfer: event → call to another system’s URL with data (e.g. PayPal payment → webhook → order update).\n\n**Integration** – how systems connect (Zapier/Make, API, file exchange) so data is not copied by hand.\n\n**API** – agreed way for programs to exchange data over the network. AI agents often call APIs as tools.\n\n**Polling** – periodic check “are there new data yet?” (different from webhook).\n\n**Error handling (workflow)** – what to do when a step fails: retry, notify human, log, stop flow.\n\n**Logs** – what ran, when, success or error (for debugging and audit; more – optional slide on spec and testing).\n\n**Example 1:** form (trigger) → email check (condition) → CRM (action) → email (action) → Slack to team (action).\n\n**Example 2:** payment (webhook) → order update → confirmation to customer.',
              },
              {
                heading: 'Do this now',
                body:
                  'Write down **one real trigger** from your work (e.g. “new lead in form”) and **two actions** you would want to run automatically next.',
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
                heading: 'Zapier',
                body:
                  '7000+ integrations (Gmail, Slack, Salesforce, Google Workspace). No-code, quick start – fits small teams. **Example:** new meeting (e.g. Calendly) → calendar entry → reminder email to participant. **Strengths:** large integration library, low learning curve. **Weaknesses:** expensive at scale, limited error handling.',
              },
              {
                heading: 'Make.com',
                body:
                  'Visual builder (drag & drop), more complex logic than Zapier – fits mid-size business. **Example:** Shopify order → stock sheet → if stock low → email supplier. **Strengths:** conditions, loops, data transforms; better free tier. **Weaknesses:** learning curve, many scenarios harder to manage.',
              },
              {
                heading: 'n8n',
                body:
                  'Open-source, full control, data on your servers. Fits technical teams. **Example:** payment platform webhook → validation and DB entry → on error notify alert channel (Slack). **Strengths:** unlimited workflows, custom code, advanced error handling. **Weaknesses:** IT skills, server administration.',
              },
              {
                heading: 'Power Automate',
                body:
                  'Microsoft ecosystem – Excel, Teams, Outlook, SharePoint, Office 365. Fits admin, sales, project management. **Example:** Outlook + PDF → SharePoint → Teams → data extraction → Excel. **Strengths:** enterprise security, integrated licensing. **Weaknesses:** limited outside Microsoft ecosystem.',
              },
            ],
          },
        },
        {
          id: 10.65,
          title: 'Workflow testing and security',
          subtitle: 'Specification, 10 test scenarios, security, tool tree – visible content',
          content: {
            sections: [
              {
                heading: 'Why here?',
                body:
                  'When you build **workflows between systems** (Zapier, Make, n8n) or agents with external data – you need consistent specification, testing and security rules. Below – full visible content; more detail – in **Business automation tools** (docs/AUTOMATIZAVIMO_IRANKIAI_VERSLUI.md).',
              },
              {
                heading: 'Spec and incident playbook (diagram)',
                body:
                  'Top – **8 spec blocks** (one-page structure). Bottom – **5 incident steps** (security). More text – sections below. **View full size** – same image in a modal.',
              },
              {
                heading: 'Workflow specification (8 blocks)',
                body:
                  '**Trigger** – what starts it (event, frequency). **Input schema** – fields, formats, required/optional. **Condition** – rules (e.g. if field X > 500). **Actions** – step list with tools. **Output** – what we get (CRM entry, email, ticket). **SLA, retries, rate limits** – max wait, retry count, API limits. **Error handling** – on failure (retry, alert, human escalation). **Audit log** – what we record (run_id, time, step, result).',
              },
              {
                heading: '10 test scenarios (before going live)',
                body:
                  '(1) Empty fields (required empty). (2) Invalid email format. (3) Duplicates – same record twice. (4) Timeout – API does not respond in time. (5) Webhook duplicates – same webhook twice. (6) Special characters / long text in fields. (7) Invalid values (non-number where number expected). (8) Missing fields (schema changed). (9) Rate limit hit (429). (10) Auth error (401/403).\n\n**Idempotency (simply):** rules so **the same action does not run twice** from repeated webhook or double click – e.g. unique request ID; if record with that ID exists – **update**, do not create new.',
              },
              {
                heading: '3 AI agent QC tests (additionally)',
                body:
                  'Before launch check the AI agent: (1) empty input – does it return clear “Failed”? (2) false fact – does it not confirm? (3) very long text – does it not break without notice?',
              },
              {
                heading: 'Security and compliance',
                body:
                  '**PII:** What may be sent to AI, what to mask (name, email – per GDPR and company policy). **Access:** Who can edit workflow (viewer, editor, admin); API keys – not in code, use secrets manager or platform vault. **Incident playbook (5 steps):** (1) Stop workflow / disconnect integration. (2) Record – logs, who, when, what. (3) Assess scope. (4) Notify – DPO, manager, authorities if needed. (5) Fix and deploy safeguards. **Human-in-the-loop:** When human approval is mandatory – e.g. financial ops above amount X, bulk personal data export.',
              },
              {
                heading: 'Tool selection tree',
                body:
                  'We **do not repeat** the table here – same tree and interactive diagram on **Tool selection and limits (10.4)**. More – in **Business automation tools** (§21).',
              },
              {
                heading: 'Full guide',
                body:
                  'All material – **Business automation tools** (docs/AUTOMATIZAVIMO_IRANKIAI_VERSLUI.md): §18 spec, §19 testing, §20 security, §21 tool tree and more.',
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
                body:
                  'One evaluator prompt checks another artefact: your agent prompt or workflow specification. The goal is to find unclear points before practice.',
              },
              {
                heading: 'Do this now',
                body:
                  'Copy the evaluator, paste your agent prompt or workflow specification, and fix at least one point that AI marks as “fix”.',
              },
              {
                heading: 'Copyable prompt (evaluator)',
                body:
                  'One prompt evaluates another: the evaluator does not create a new workflow, it shows what to fix.',
                copyable:
                  'You are an agent quality evaluator.\nEvaluate the agent or workflow specification below against 5 criteria:\n1) goal and completion criterion,\n2) input fields,\n3) tools and limits,\n4) error handling,\n5) human approval in risky places.\n\nReturn a table: criterion | OK / fix | what is unclear | concrete fix.\nIf data is missing, do not guess – say which field is needed.\nSpecification: [PASTE HERE]',
              },
              {
                heading: 'Check',
                body:
                  'A good evaluation has at least one concrete fix or a clear “OK” for every criterion. If you only get generic praise, ask for a table with concrete fixes.',
              },
            ],
            practicalTask: {
              title: 'Steps: evaluator checks your specification',
              placeholder: '',
              templateLabel: 'Steps: evaluator checks your specification',
              template:
                '1. Copy the evaluator prompt from the block above.\n2. Paste it into AI.\n3. Paste your agent prompt or workflow specification.\n4. Fix at least one point the evaluator marked as “fix”.\n5. Run the evaluation again and check whether all 5 criteria have a clear answer.\n\nThe evaluator and your prompt are not competitors: the evaluator helps improve your artefact before practice.',
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
              'Congratulations! Key wins: agent taxonomy (L0–L3, roles), 5 workflow patterns, 3A, AI and no-code tools, prompts and error handling.',
            stats: [
              { label: 'Depth levels + roles', value: '8' },
              { label: 'Workflow patterns', value: '5' },
              { label: 'Use case examples', value: '12' },
            ],
            sections: [
              {
                heading: 'Taxonomy and multi-agent',
                items: [
                  'L0–L3 depth levels',
                  'Coordinator, specialist, evaluator, router',
                  '5 workflow patterns for business',
                ],
              },
              {
                heading: '3A and automation',
                items: [
                  'Automatize 80 % / Augment 15 % / Autonomize 5 %',
                  'Trigger → Condition → Action',
                  'Zapier, Make, n8n, Power Automate',
                ],
              },
              {
                heading: 'Use case catalogue',
                items: [
                  'Sales: lead→CRM; pipeline; RFP',
                  'HR: CV filter; onboarding; score',
                  'Finance: OCR; closing; alert',
                  'Support: triage; sentiment; FAQ+QC',
                ],
              },
              {
                heading: 'Prompts and security',
                items: [
                  '5-part agent template',
                  'Error handling and HITL',
                  'AI agent QC tests',
                ],
              },
            ],
            reflectionPrompt:
              'META: You are a training reflection assistant. Goal – consolidate what you learned about AI agents.\nINPUT: I just finished training on AI agents – taxonomy, multi-agent, workflow, prompts.\nOUTPUT: Ask 3 questions: (1) Which agent scenario could I apply today? (2) What was newest? (3) What do I want to try first? After my answers, give one concrete tip.',
            reflectionTitle: 'Reflection prompt',
            tagline: 'Agent = steps + tools + limits – your foundation for automation.',
            nextStepCTA: 'Go to Module 11: Knowledge check (Agent path)',
            firstAction24h:
              'Today open one AI tool with tools enabled (search or Tools) and ask one agent query with “Use search and provide sources”.',
          },
        },
      ],
      businessExamples: [
        {
          title: 'Agent cycle and tools',
          description: 'Trigger → action → artefacts with AI',
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
                question: 'When is it worth choosing an agent over a plain prompt?',
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
                question: 'How does a router differ from an orchestrator?',
                options: [
                  'Router = where to go; orchestrator = how to manage plan, state and retry',
                  'They do the same thing',
                  'Orchestrator only classifies the type',
                  'Router always restarts the whole flow',
                ],
                correct: 0,
                explanation:
                  'Router routes by type (WHERE). Orchestrator manages the active plan and targeted retry (HOW).',
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
              type: 'mcq',
              question: 'Where are AI role and limits set in an agent system?',
              options: [
                'Only in user prompt',
                'In system prompt',
                'Only in tool list',
                'Nowhere',
              ],
              correct: 1,
              explanation:
                'System prompt sets role, principles and limits – visible to AI, not the user.',
              relatedSlideId: 10.3,
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
              question: 'What should you do when the agent cannot complete the task?',
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
              type: 'mcq',
              question: 'What is a router in an AI team?',
              options: [
                'A role that routes the request to the right role by type',
                'A tool that sends emails automatically',
                'Same as coordinator – a synonym',
                'AI model version',
              ],
              correct: 0,
              explanation:
                'Router classifies input and routes to the right specialist or flow – like reception or triage.',
              relatedSlideId: 10.45,
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
                'Only pick Slack channel name and colour for the notification',
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
                'Scenario: the agent completed the task, but the result was inaccurate. After analysing the error you see the cause. What do you need to do so the learning loop closes, instead of only describing the problem?',
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
              'Worth reviewing Module 10 topics: agent cycle, 3A taxonomy, coordinator and specialist roles, workflow patterns, tool use, error handling, and Zapier / Make integrations.',
            thresholdExplanation:
              'When you reach ≥70 %, you can go to Module 12. Less – review the agent cycle, 3A, multi-agent roles, workflow patterns and prompt safeguards.',
            useCaseBlock: {
              heading: 'Where to apply?',
              body:
                'Taxonomy, multi-agent work, workflow (trigger, action), 3A and tools – research, reports, support triage, RFP analysis.',
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
                body:
                  'After the test you can try a mini agent chain in 5 minutes without Zapier or Make: 3 separate AI chats, a clear handoff, and one quality check.',
                blockVariant: 'accent',
              },
              {
                heading: 'Do this now',
                body:
                  'Pick a small process: RFP summary, weekly sales, or a client complaint. Run the prompt pack below and note what you pass from one role to the next.',
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
                body:
                  'Do you have a clear handoff rule and 1 trial case where data is missing? If yes – you are ready for the M12 quick start with prompts only (Coordinator + 2 specialists).',
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
      subtitle: '3 required practices (trigger → action → artefacts) + 4 optional scenarios',
      content: {
        whyBenefit:
          'After the project you will have ready artefacts: a multi-agent schema with prompts only, or a full workflow (trigger, condition, actions), field mapping, test cases, log evidence, and one Skill pack for reuse. Quick start – Coordinator + 2 specialists; full path – 3 practices per 3A.',
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
        sections: [
          {
            heading: 'Comparison',
            body:
              'Three labs – different automation levels. Green label – where human approval is usually needed.',
            imageAlt:
              'Three agent practices: Automatize, Augment, Autonomize',
          },
        ],
        footer: 'Next – slide 3: Business multi-agent schema',
      },
    },
    {
      id: 120.5,
      title: 'Business multi-agent schema',
      subtitle: 'Input → roles → evaluator → output (+ human approval)',
      content: {
        whyBenefit:
          'Understand when one AI is not enough and how to split work without coding. Practice – Coordinator + 2 specialists (quick start).',
        sections: [
          {
            heading: 'Business multi-agent schema',
            body:
              '**1. Input** – task, data, constraints.\n\n**2. Router** (optional) – classifies type, routes.\n\n**3. Coordinator** – breaks down, assigns 2–3 specialists.\n\n**4. Specialists** – narrow work (research, draft, calculation).\n\n**5. Evaluator** – QC, rules, returns for revision.\n\n**6. Output** – with **HITL gate** before sending to client or manager.',
          },
          {
            heading: 'Handoff',
            body:
              'Passing to the next role – clear rule: “When specialist finishes X, pass to evaluator in Y format.” Without handoff multi-agent becomes chaotic.',
          },
        ],
        footer: 'Next – slide 5: Practice 1 – Automatize',
      },
    },
    {
      id: 121,
      title: 'Practice 1: Automatize (80 %)',
      subtitle: 'Form → Sheets/CRM → Email → Slack/Teams (Zapier or Make)',
      scenario: {
        narrativeLead:
          'Pick a form and destinations (Sheets/CRM, email, Slack or Teams). Build the workflow and record artefacts.',
        situation:
          'Automatize (80 %): rule-based flows – form to CRM, email and team notification without manual decision at each step.',
        context:
          'Build workflow: Form (Google Forms / Typeform) → Sheets or CRM → personalised email → Slack/Teams. Tool: Zapier or Make.',
        data:
          'Rule-based flows. Task: build a working workflow and record artefacts – diagram, field mapping, tests, log evidence.',
        constraints:
          'Use Zapier or Make (free tier is enough). Describe what to do if API does not respond (error handling).',
        expectedFormat:
          'Artefacts: 1-page workflow spec (trigger, input schema, conditions, actions, output, error handling), field mapping, at least 2 test cases, log or screenshot evidence.',
      },
      practicalTask: {
        title: 'Record workflow and artefacts (Automatize)',
        placeholder:
          'Enter or paste your workflow description, field mapping and test case summary…',
        templateLabel: 'Workflow specification – template',
        template:
          'Trigger: new form submission. Actions: (1) Write to Sheets/CRM with field mapping, (2) send personalised email, (3) notify team Slack/Teams. Error handling: what to do if API does not respond.',
        explanation: 'Artefacts prove the workflow was built and tested.',
        instructions: {
          title: 'Steps and artefacts',
          steps: [
            {
              step: 1,
              title: 'Build workflow in Zapier or Make (Form → Sheets/CRM → Email → Slack/Teams)',
              description: 'Use free account tier.',
              hint: 'Use free account tier.',
              partialSolution: 'Use free account tier.',
            },
            {
              step: 2,
              title: 'Fill 1-page workflow specification',
              description:
                'Trigger, input schema, condition, actions, output, error handling (see AUTOMATIZAVIMO_IRANKIAI_VERSLUI §18).',
              hint: 'Trigger, input schema, condition, actions, output, error handling (see AUTOMATIZAVIMO_IRANKIAI_VERSLUI §18).',
              partialSolution:
                'Trigger, input schema, condition, actions, output, error handling (see AUTOMATIZAVIMO_IRANKIAI_VERSLUI §18).',
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
          'Rule-based flows. Build workflow: Form (Google Forms / Typeform) → Sheets or CRM → personalised email → Slack/Teams. Tool: Zapier or Make. Artefacts: workflow diagram (1 p.), field mapping, min. 2 test cases, logs/screenshots.',
        taskFrame: 'Task',
        scenario: {
          narrativeLead:
            'Pick a form and destinations (Sheets/CRM, email, Slack or Teams). Build the workflow and record artefacts.',
        },
        template:
          'Trigger: new form submission. Actions: (1) Write to Sheets/CRM with field mapping, (2) send personalised email, (3) notify team Slack/Teams. Error handling: what to do if API does not respond.',
        templateLabel: 'Workflow specification – template',
        instructions: {
          title: 'Steps and artefacts',
          steps: [
            {
              step: 1,
              title: 'Build workflow in Zapier or Make (Form → Sheets/CRM → Email → Slack/Teams)',
              description: 'Use free account tier.',
            },
            {
              step: 2,
              title: 'Fill 1-page workflow specification',
              description:
                'Trigger, input schema, condition, actions, output, error handling (see AUTOMATIZAVIMO_IRANKIAI_VERSLUI §18).',
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
        data:
          'Task: build workflow and prepare artefacts – diagram, summary prompt template, approval step description, 1–2 test cases.',
        constraints:
          'Use Make or Zapier with AI module. Clearly describe who sees the summary and who approves.',
        expectedFormat:
          'Artefacts: workflow diagram, summary prompt, approval rule, 1–2 test cases.',
      },
      practicalTask: {
        title: 'Record augment workflow and artefacts',
        placeholder: 'Enter workflow summary, summary prompt and approval rules…',
        templateLabel: 'Summary template and approval rule',
        template:
          'Summary prompt: From this email extract: (1) sender and date, (2) main topic in one sentence, (3) 3–5 bullet points. Human-in-the-loop: before sending human approves or edits.\n\nEVALUATOR PROMPT: Check the summary: (1) tone suitable for client, (2) facts match original, (3) no excess PII. If not – return list of fixes.',
        explanation: 'Human approval reduces risk of wrong automatic send.',
        instructions: {
          title: 'Steps and artefacts',
          steps: [
            {
              step: 1,
              title: 'Build workflow: trigger (new email) → AI summary → approval step → send',
              description: 'Use Make or Zapier with AI module.',
              hint: 'Use Make or Zapier with AI module.',
              partialSolution: 'Use Make or Zapier with AI module.',
            },
            {
              step: 2,
              title: 'Write summary prompt template and approval step description',
              description: 'Who sees, who approves, what to do if rejected.',
              hint: 'Who sees, who approves, what to do if rejected.',
              partialSolution: 'Who sees, who approves, what to do if rejected.',
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
          'Human decides, AI helps. Flow: incoming email → AI summary (e.g. ChatGPT/Make AI module) → human approval before send → send. Artefacts: workflow diagram, summary prompt template, approval step description, 1–2 test cases.',
        taskFrame: 'Task',
        scenario: {
          narrativeLead:
            'Build workflow with AI summary step and human approval. Record prompt and rules.',
        },
        template:
          'Summary prompt: From this email extract: (1) sender and date, (2) main topic in one sentence, (3) 3–5 bullet points. Human-in-the-loop: before sending human approves or edits.\n\nEVALUATOR PROMPT: Check the summary: (1) tone suitable for client, (2) facts match original, (3) no excess PII. If not – return list of fixes.',
        templateLabel: 'Summary template and approval rule',
        instructions: {
          title: 'Steps and artefacts',
          steps: [
            {
              step: 1,
              title: 'Build workflow: trigger (new email) → AI summary → approval step → send',
              description: 'Use Make or Zapier with AI module.',
            },
            {
              step: 2,
              title: 'Write summary prompt template and approval step description',
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
        data:
          'Task: define thresholds, escalation rules and prepare artefacts – diagram, link to incident playbook.',
        constraints:
          'Use Make, n8n or Zapier with AI module. State when to create ticket and which fields to fill.',
        expectedFormat:
          'Artefacts: workflow diagram (1 p.), sentiment threshold definition, escalation rules, link to incident playbook (5 steps, see doc §20).',
      },
      practicalTask: {
        title: 'Record autonomous workflow and rules',
        placeholder: 'Enter sentiment thresholds, escalation rules and workflow summary…',
        templateLabel: 'Sentiment and escalation rules',
        template:
          'Sentiment thresholds: if < 3 stars or negative – create ticket and notify team. Escalation rule: ticket fields “sentiment”, “original_text” (short). Incident playbook: see AUTOMATIZAVIMO_IRANKIAI_VERSLUI §20.',
        explanation: 'Clear rules prevent wrong mass escalation.',
        instructions: {
          title: 'Steps and artefacts',
          steps: [
            {
              step: 1,
              title: 'Build workflow: feedback → sentiment AI → condition (if < threshold) → ticket/task',
              description: 'Use Make, n8n or Zapier with AI module.',
              hint: 'Use Make, n8n or Zapier with AI module.',
              partialSolution: 'Use Make, n8n or Zapier with AI module.',
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
              title: 'Write workflow diagram (1 p.) and link to incident playbook (5 steps)',
              description: 'See doc §20 – stop, record, assess, notify, fix.',
              hint: 'See doc §20 – stop, record, assess, notify, fix.',
              partialSolution: 'See doc §20 – stop, record, assess, notify, fix.',
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
          'Sentiment thresholds: if < 3 stars or negative – create ticket and notify team. Escalation rule: ticket fields “sentiment”, “original_text” (short). Incident playbook: see AUTOMATIZAVIMO_IRANKIAI_VERSLUI §20.',
        templateLabel: 'Sentiment and escalation rules',
        instructions: {
          title: 'Steps and artefacts',
          steps: [
            {
              step: 1,
              title: 'Build workflow: feedback → sentiment AI → condition (if < threshold) → ticket/task',
              description: 'Use Make, n8n or Zapier with AI module.',
            },
            {
              step: 2,
              title: 'Define sentiment thresholds and escalation rules',
              description: 'When to create ticket, which fields to fill.',
            },
            {
              step: 3,
              title: 'Write workflow diagram (1 p.) and link to incident playbook (5 steps)',
              description: 'See doc §20 – stop, record, assess, notify, fix.',
            },
          ],
        },
      },
    },
    {
      id: 124,
      title: 'Scenario: Research agent',
      subtitle: 'Search + summary + sources',
      scenario: {
        narrativeLead:
          'Pick a topic and use the prompt below with search and sources.',
        situation:
          'Optional scenario: research agent – search, summary and sources in one task.',
        context:
          'Task: search + summary + sources. Copy prompt into AI and run with your topic.',
        data:
          'Use AI with search enabled. Fill placeholders ([X], [ROLE]) with your topic.',
        constraints:
          'If no sources – write “Not found” and why. Do not invent links.',
        expectedFormat:
          'Artefact: summary with links or clear “Not found” message.',
      },
      practicalTask: {
        title: 'Complete research agent task',
        placeholder: 'Paste AI answer summary or your notes on sources…',
        templateLabel: 'Prompt – copy to AI',
        template:
          'Role: [ROLE]. Task: (1) Search [X], (2) pick 3–5 key sources, (3) write summary in English with links. If not found – write “Not found” and why.',
        explanation: 'Prepares agent thinking without a full workflow tool.',
        instructions: {
          title: 'Steps',
          steps: [
            {
              step: 1,
              title: 'Copy prompt and paste into AI with search enabled',
              description: 'Fill [X] with your topic. Run and review sources.',
              hint: 'Fill [X] with your topic. Run and review sources.',
              partialSolution: 'Fill [X] with your topic. Run and review sources.',
            },
          ],
        },
      },
      content: {
        scenarioTitle: 'Research agent',
        scenarioDescription:
          'Task: search + summary + sources. Copy prompt into AI and run with your topic.',
        taskFrame: 'Task',
        scenario: {
          narrativeLead:
            'Pick a topic and use the prompt below with search and sources.',
        },
        template:
          'Role: [ROLE]. Task: (1) Search [X], (2) pick 3–5 key sources, (3) write summary in English with links. If not found – write “Not found” and why.',
        templateLabel: 'Prompt – copy to AI',
        instructions: {
          title: 'Steps',
          steps: [
            {
              step: 1,
              title: 'Copy prompt and paste into AI with search enabled',
              description: 'Fill [X] with your topic. Run and review sources.',
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
        situation: 'SHOULD: multi-agent practice in business terms – coordinator, specialist, evaluator.',
        context:
          'Pick topic (sales summary or RFP). Use 3 prompts in separate chats. Record diagram and 1 test case.',
        data: 'Artefacts: diagram (roles + handoff), 3 prompts, 1 test case (e.g. missing data).',
        constraints:
          'Without Zapier/Make – only prompt orchestration. HITL before final send.',
        expectedFormat: 'Diagram + 3 copied prompts + test case description.',
      },
      practicalTask: {
        title: 'Multi-agent prompt pipeline',
        placeholder: 'Paste diagram, 3 prompts and test case summary…',
        templateLabel: '3 prompts – coordinator, specialist, evaluator',
        template:
          'COORDINATOR: You are the coordinator. Task: [DESCRIBE]. Break into 2 sub-tasks, assign roles, handoff rules.\n\nSPECIALIST: You are [researcher/writer]. Input: [from coordinator]. Do [X]. Output: [format].\n\nEVALUATOR: Check all criteria are met. If not – return for revision with specific points.',
        explanation: 'Manual pipeline prepares multi-agent thinking without a framework.',
        instructions: {
          title: 'Steps',
          steps: [
            { step: 1, title: 'Run coordinator prompt', description: 'Get plan with roles and handoff.' },
            { step: 2, title: 'Run specialist prompt', description: 'Pass coordinator output as input.' },
            { step: 3, title: 'Run evaluator prompt', description: 'Check and record 1 test case.' },
          ],
        },
      },
      content: {
        scenarioTitle: 'Coordinator + 2 specialists',
        scenarioDescription:
          '3 CopyButton prompts: coordinator, specialist, evaluator. Run manual pipeline. Artefacts: diagram + 3 prompts + 1 test case.',
        taskFrame: 'Task',
        template:
          'COORDINATOR: You are the coordinator. Task: [DESCRIBE]. Break into 2 sub-tasks, assign roles, handoff rules.\n\nSPECIALIST: You are [researcher/writer]. Input: [from coordinator]. Do [X]. Output: [format].\n\nEVALUATOR: Check all criteria are met. If not – return for revision with specific points.',
        templateLabel: '3 prompts – coordinator, specialist, evaluator',
      },
    },
    {
      id: 125,
      title: 'Scenario: Report generator',
      subtitle: 'Several steps – data → analysis → report',
      scenario: {
        narrativeLead:
          'Fill META, INPUT, OUTPUT and get one page of structured report.',
        situation:
          'Optional scenario: several steps – data → analysis → one-page report with AI.',
        context: 'Use structured prompt with role, input and desired output.',
        data:
          'Task: several steps (data → analysis → 1-page report). Use META + INPUT + OUTPUT blocks.',
        constraints: 'Language: English. 3–5 bullet points, clearly separated.',
        expectedFormat: 'Artefact: 1-page report or draft with prompt used.',
      },
      practicalTask: {
        title: 'Generate report from template',
        placeholder: 'Paste report or summary from AI…',
        templateLabel: 'Prompt – copy to AI',
        template: 'META: [ROLE]. INPUT: [DATA]. OUTPUT: 1 page, 3–5 bullet points, English.',
        instructions: {
          title: 'Steps',
          steps: [
            {
              step: 1,
              title: 'Fill META, INPUT, OUTPUT and run AI',
              description: 'Get 1-page report.',
              hint: 'Get 1-page report.',
              partialSolution: 'Get 1-page report.',
            },
          ],
        },
      },
      content: {
        scenarioTitle: 'Report generator',
        scenarioDescription:
          'Task: several steps (data → analysis → 1-page report). Use META + INPUT + OUTPUT.',
        taskFrame: 'Task',
        scenario: {
          narrativeLead:
            'Fill META, INPUT, OUTPUT and get one page of structured report.',
        },
        template: 'META: [ROLE]. INPUT: [DATA]. OUTPUT: 1 page, 3–5 bullet points, English.',
        templateLabel: 'Prompt – copy to AI',
        instructions: {
          title: 'Steps',
          steps: [
            {
              step: 1,
              title: 'Fill META, INPUT, OUTPUT and run AI',
              description: 'Get 1-page report.',
            },
          ],
        },
      },
    },
    {
      id: 126,
      title: 'Scenario: Tool usage',
      subtitle: 'Use search or calculator',
      scenario: {
        narrativeLead:
          'Enable tool on platform and check whether AI used it in the answer.',
        situation:
          'Optional scenario: AI uses a tool (search or calculator) in your task.',
        context:
          'Task: use search and calculator (or one tool). Result with explanation.',
        data: 'Fill [tool] and [DESCRIBE] per your need.',
        constraints:
          'If platform does not support tool – pick another AI environment or note what blocked you.',
        expectedFormat:
          'Artefact: answer with tool trace (sources, numbers) or short diagnosis why it failed.',
      },
      practicalTask: {
        title: 'Verify tool usage',
        placeholder: 'Describe which tool you used and what you got…',
        templateLabel: 'Prompt – copy to AI',
        template:
          'Use [tool – search or calculator] and provide result with short explanation. Task: [DESCRIBE].',
        instructions: {
          title: 'Steps',
          steps: [
            {
              step: 1,
              title: 'Enable tool on platform and run prompt',
              description: 'Check whether AI used the tool.',
              hint: 'Check whether AI used the tool.',
              partialSolution: 'Check whether AI used the tool.',
            },
          ],
        },
      },
      content: {
        scenarioTitle: 'Tool usage',
        scenarioDescription:
          'Task: use search and calculator (or one tool). Result with explanation.',
        taskFrame: 'Task',
        template:
          'Use [tool – search or calculator] and provide result with short explanation. Task: [DESCRIBE].',
        templateLabel: 'Prompt – copy to AI',
        instructions: {
          title: 'Steps',
          steps: [
            {
              step: 1,
              title: 'Enable tool on platform and run prompt',
              description: 'Check whether AI used the tool.',
            },
          ],
        },
      },
    },
    {
      id: 127,
      title: 'Scenario: Error handling and limits',
      subtitle: 'System prompt with limits',
      scenario: {
        narrativeLead:
          'Add this text to system prompt and try a task without data.',
        situation:
          'Optional scenario: limits and errors – AI must clearly say when it cannot complete.',
        context:
          'Task: system prompt with limits; test what AI answers when data is missing.',
        data:
          'Use sentence about “Failed” and reason. Try deliberately empty or invalid input.',
        constraints: 'Never return empty answer – clear message for user.',
        expectedFormat:
          'Artefact: screen summary or copied AI answer with “Failed” logic.',
      },
      practicalTask: {
        title: 'Test error handling',
        placeholder: 'Enter what AI answered when data was missing…',
        templateLabel: 'Add to system prompt',
        template:
          'If the task cannot be completed: write “Failed: [reason]” and suggest what the user can fix. Never return an empty answer.',
        instructions: {
          title: 'Steps',
          steps: [
            {
              step: 1,
              title: 'Add this text to system prompt and try task without data',
              description: 'Check whether AI returns clear “Failed” message.',
              hint: 'Check whether AI returns clear “Failed” message.',
              partialSolution: 'Check whether AI returns clear “Failed” message.',
            },
          ],
        },
      },
      content: {
        scenarioTitle: 'Error handling and limits',
        scenarioDescription:
          'Task: system prompt with limits; test what AI answers when data is missing.',
        taskFrame: 'Task',
        template:
          'If the task cannot be completed: write “Failed: [reason]” and suggest what the user can fix. Never return an empty answer.',
        templateLabel: 'Add to system prompt',
        instructions: {
          title: 'Steps',
          steps: [
            {
              step: 1,
              title: 'Add this text to system prompt and try task without data',
              description: 'Check whether AI returns clear “Failed” message.',
            },
          ],
        },
      },
    },
    {
      id: 128,
      title: 'Project summary',
      subtitle: 'What next?',
      content: {
        introHeading: 'What you learned',
        introBody:
          'Congratulations! You completed at least one of 3 required practices (Automatize / Augment / Autonomize) or optional scenarios. You have workflow diagram, artefacts and templates for further work.',
        stats: [
          { label: 'Required practices', value: '3' },
          { label: 'Scenarios', value: '4' },
          { label: 'Artefacts', value: 'diagram + tests' },
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
          'META: You are a training reflection assistant. Goal – consolidate Agent engineering project results.\nINPUT: I just finished Module 12: at least one of 3 required practices (Automatize / Augment / Autonomize) and maybe optional scenarios – I have workflow diagram and artefacts.\nOUTPUT: Ask 3 questions: (1) Which agent or workflow step will I apply in 24 hours? (2) What was newest? (3) What do I want to try first with a real process? After my answers, give one concrete tip.',
        tagline: '3 practices + artefacts = working result first.',
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

const ltData = JSON.parse(readFileSync(join(root, 'src', 'data', 'modules.json'), 'utf8'));
const fallback = {
  modules: ltData.modules.filter((module) => [10, 11, 12].includes(module.id)).map(toEnglishFallback),
};
en.modules = mergeArraysById(fallback.modules, en.modules);

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
  en.modules.map((m) => `M${m.id}:${m.slides.map((s) => s.id).join(',')}`).join('; ')
);

function toEnglishFallback(value, ctx = {}) {
  if (Array.isArray(value)) {
    return value.map((item, index) => toEnglishFallback(item, { ...ctx, index, path: `${ctx.path ?? ''}[${index}]` }));
  }
  if (value && typeof value === 'object') {
    const out = {};
    for (const [key, child] of Object.entries(value)) {
      out[key] = toEnglishFallback(child, { ...ctx, key, path: `${ctx.path ?? ''}.${key}` });
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
  if (['type', 'icon', 'color', 'blockVariant', 'image', 'badgeVariant', 'accent', 'identityIcon', 'level'].includes(key)) {
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
  if (key === 'question') return 'Choose the best answer for this agent engineering situation.';
  if (path.includes('.options[')) return fallbackOption(value);
  if (key === 'explanation') return 'The best answer keeps the agent goal, tools, limits and error handling clear.';
  if (key === 'passedMessage') return 'Great work! You are ready to continue.';
  if (key === 'failedMessage') return 'Review the recommended agent engineering topics before continuing.';
  if (key === 'thresholdExplanation') return 'At 70% or more, continue to the next module. Below 70%, review the recommended slides.';
  if (key === 'whyBenefit') return 'After this step you will have a clearer AI agent workflow.';
  if (key === 'firstActionCTA') return 'Start with one small agent task and check the result.';
  if (key === 'microWinPhrase') return 'Each correct answer shows that you can apply agent engineering.';
  if (key === 'duration') return value.replace('min', 'min');
  if (key === 'label') return fallbackLabel(value);
  if (key === 'value') return fallbackValue(value);
  if (key === 'body' || key === 'description' || key === 'introBody' || key === 'narrativeLead') {
    return 'Use this step to design, test and improve an AI agent workflow with clear tools, limits and human approval where needed.';
  }
  if (key === 'scenarioTitle') return fallbackTitle(value);
  if (key === 'scenarioDescription' || key === 'situation' || key === 'context' || key === 'data' || key === 'constraints' || key === 'expectedFormat') {
    return 'Design one AI agent or workflow scenario, define the inputs, tools, output, tests and error handling.';
  }
  if (key === 'taskFrame') return 'Task';
  if (key === 'placeholder') return 'Enter your answer here...';
  if (key === 'hint' || key === 'partialSolution') return 'Keep the goal, tools and output format explicit.';
  if (path.includes('.items[') || path.includes('.outcomes[') || path.includes('.nextSteps[') || path.includes('.recommendedSlideIds[')) {
    return 'Define goal, tools, limits and output.';
  }
  return 'AI agent workflow step.';
}

function fallbackTitle(value) {
  const text = String(value);
  if (SHORT_TITLE_EN[text]) return SHORT_TITLE_EN[text];
  if (text.includes('Kontrolinis taškas') && text.includes('agentų ciklas')) return 'Checkpoint: agent cycle';
  if (text.includes('rolės ir perdavimas')) return 'Checkpoint: roles and handoff';
  if (text.includes('Kada tvirtina žmogus')) return 'When does a human approve?';
  if (text.includes('keli agentai') || text.includes('Keli agentai')) return 'Multi-agent to workflow';
  if (text.includes('Uždaro mokymosi ciklas')) return 'Closed learning loop';
  if (text.includes('agentinis promptas')) return 'Checkpoint: agent prompt';
  if (text.includes('Workflow') || text.includes('automatizavimas')) return 'Workflow to automation';
  if (text.includes('Savitikra prieš testą')) return 'Warm-up before the test';
  if (text.includes('Bonus') || text.includes('Papildomai')) return 'Bonus: agent chain in 5 minutes';
  if (text.includes('Agentų ciklas')) return 'Agent cycle and architecture';
  if (text.includes('Rolės ir sisteminio')) return 'Role and system prompt template';
  if (text.includes('Įrankių pasirinkimas')) return 'Tool selection and limits';
  if (text.includes('Kada rinktis agentą')) return 'When to choose an agent';
  if (text.includes('Klaidos tvarkymas')) return 'Error handling and limits';
  if (text.includes('Pagrindinės sąvokos')) return 'Core concepts: trigger, action, condition, webhook';
  if (text.includes('Verslo automatizavimo')) return 'Business automation tools';
  if (text.includes('Paleidimas')) return 'Hosting: where the agent and API run';
  if (text.includes('GitHub')) return 'GitHub as code source';
  if (text.includes('Minimalus darbo')) return 'Minimum workflow brief';
  if (text.includes('testavimas ir saugumas') || text.includes('Testavimas')) return 'Workflow testing and security';
  if (text.includes('QC vertintojas') || text.includes('Agentų QC')) return 'Agent QC evaluator';
  if (text.includes('Žodynėlis')) return 'Glossary';
  if (text.includes('santrauka')) return 'Module 10 summary';
  return 'AI agent step';
}

function fallbackSubtitle(value) {
  const text = String(value);
  if (text.includes('žingsnis')) return 'Agent engineering path step';
  if (text.includes('Koordinatorius')) return 'Coordinator -> specialist -> evaluator';
  return 'Agent engineering';
}

function fallbackHeading(value) {
  const text = String(value);
  if (text.includes('Trumpai')) return 'In short';
  if (text.includes('Daryk')) return 'Do this now';
  if (text.includes('Kopijuojamas')) return 'Copyable prompt pack';
  if (text.includes('Patikra') || text.includes('Ką patikrinti')) return 'Check';
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
    'Maršrutizatorius': 'Router',
    'Kelių agentų sistema': 'Multi-agent system',
  };
  return map[value] ?? 'Agent engineering term';
}

function fallbackOption(value) {
  const text = String(value);
  if (text.includes('Atnaujinti taisyklę')) return 'Update the rule, prompt, skill or test based on the root cause';
  if (text.includes('Užrašyti pastabą')) return 'Write a note and keep using the same prompt';
  if (text.includes('Padidinti')) return 'Make the agent answer longer';
  if (text.includes('Paleisti')) return 'Run the same request again without changes';
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
  return String(value).replaceAll('DI', 'AI').replace(/[ąčęėįšųūžĄČĘĖĮŠŲŪŽ]/g, '');
}

function mergeArraysById(fallbackArray, overlayArray) {
  const overlayById = new Map(overlayArray.filter((item) => item && typeof item === 'object' && 'id' in item).map((item) => [item.id, item]));
  const merged = fallbackArray.map((fallbackItem) => {
    const overlayItem = overlayById.get(fallbackItem.id);
    return overlayItem ? mergeDeep(fallbackItem, overlayItem) : fallbackItem;
  });
  for (const overlayItem of overlayArray) {
    if (!overlayById.has(overlayItem.id) || !fallbackArray.some((item) => item.id === overlayItem.id)) {
      merged.push(overlayItem);
    }
  }
  return merged;
}

function mergeDeep(fallbackValue, overlayValue) {
  if (Array.isArray(fallbackValue) && Array.isArray(overlayValue)) {
    const keyed =
      fallbackValue.every((item) => item && typeof item === 'object' && 'id' in item) &&
      overlayValue.every((item) => item && typeof item === 'object' && 'id' in item);
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
