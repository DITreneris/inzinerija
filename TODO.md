# TODO – Promptų anatomija

**Tikslas:** Open P0/P1 prioritetai (Docs Lean). Done istorija → [`docs/archive/development/TODO_DONE_SPRINTS_2026-07.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-07.md). SOT indeksas: `docs/DOCUMENTATION_QUICK_REF.md`.  
**Legenda:** P0 = monetizacija, P1 = release/kokybė, P2 = backlog. **Atnaujinta:** 2026-07-24 (DL).

**Dabartinis fokusas:** **MON P0 + rankinė RELEASE_QA** po code tag **1.4.7**. Automated gates ✅ (111/720, preflight + typecheck). Blokoriai: browser MON-1/3/5/8 + PDF QA + MON-4.

**Release vartai:**

- **Release-ready:** MON-1, MON-3, MON-5 + Release QA #6 (mobile spot-check).
- **Monetization-ready:** visi P0 MON-\* + Release QA #1–#2 (PDF) + MON-4 dashboard.

---

## 1. Aktualus pipeline (open only)

### §1.0h Docs Lean (DL)

> **Taisyklės:** [`DOCS_MAINTENANCE.md`](docs/development/DOCS_MAINTENANCE.md) §1c.

| ID       | Iteracija | Užduotis                                         | Status         |
| -------- | --------- | ------------------------------------------------ | -------------- |
| **DL-0** | I0        | Kontraktas §1c + ticketai                        | [x] 2026-07-24 |
| **DL-1** | I1        | TODO/ROADMAP slim + archive snapshot + always-on | [x] 2026-07-24 |
| **DL-2** | I2        | LEAN ≤25 + QUICK_REF purge                       | [x] 2026-07-24 |
| **DL-3** | I3        | Archive frozen PLAN/AUDIT; M1–9 AUDITAS demote   | [x] 2026-07-24 |
| **DL-4** | I4        | Empty skills + INDEX/DOCS_SYNC/CHANGELOG         | [x] 2026-07-24 |

### §1.0e Practice closer – open backlog (po PC-1…3 ✅)

> Planas: [`PRACTICE_CLOSER_PLAN.md`](docs/development/PRACTICE_CLOSER_PLAN.md). PC-0…3 ✅ → archive snapshot.

| ID         | Užduotis                                  | Prioritetas | Status |
| ---------- | ----------------------------------------- | ----------- | ------ |
| **PC-4.1** | M3 portfolio progress chip (2/6)          | P2          | [ ]    |
| **PC-4.2** | M9 hub filtrai / quest clarity            | P2          | [ ]    |
| **PC-4.3** | M15 optional badgeVariant clarity         | P2          | [ ]    |
| **PC-4.4** | M6 intro ChoiceControl auditas (61 vs 67) | P2          | [ ]    |

### §1.0d Portal – open

| Užduotis                              | Status      |
| ------------------------------------- | ----------- |
| 48h anti-PPT retest (5 mobile, 375px) | ⬜ paruošta |

### §1.1 P0 – Monetizacija (MON-\*)

| ID        | Užduotis                                                                | Status | Pastaba                                                              |
| --------- | ----------------------------------------------------------------------- | ------ | -------------------------------------------------------------------- |
| **MON-1** | Prod env: nėra `VITE_MAX_ACCESSIBLE_MODULE=6`; `VITE_VERIFY_ACCESS_URL` | [ ]    | Marketing Vercel                                                     |
| **MON-2** | Submodule pin **v1.4.7** + deploy                                       | ⏳     | Runbook → pin 1.4.7                                                  |
| **MON-3** | Verify-access smoke (magic link → tier)                                 | ⏳     | Browser ⏳                                                           |
| **MON-4** | PostHog/GA4 production + funnel dashboard                               | [ ]    | [`MON-4_POSTHOG_DEPLOY.md`](docs/deployment/MON-4_POSTHOG_DEPLOY.md) |
| **MON-5** | Gate regression browser (tier 0 → AccessGate)                           | ⏳     | Auto ✅; browser ⏳                                                  |
| **MON-7** | Baseline KPI po MON-4 (2–4 sav.)                                        | [ ]    | Po MON P0                                                            |
| **MON-8** | Marketing prod: `build:production` M1–9 env                             | ⏳     | Vercel env rankinė                                                   |

MON-6 ✅ (client-side paywall riba) – žr. archive / CHANGELOG.

### §1.2 P1 – Release QA (rankinė)

| #   | Užduotis                            | Pastaba                     |
| --- | ----------------------------------- | --------------------------- |
| 1   | M5 PDF rankinė (lietuviškos raidės) | RELEASE_QA_CHECKLIST §5d    |
| 2   | M6 PDF rankinė                      | §5d                         |
| 4   | Rankinė M4 sk. 56 (RAG / LlmArch)   | §5d                         |
| 5   | Rankinė M6 sk. 64                   | §5d                         |
| 6   | Browser spot-check M1/M4/M6 @390px  | Bug bundle matrix (archive) |
| 7   | PDF/handout entry point M5/M6       |                             |

### §1.3 Open P2 / optional (plonas)

| ID     | Užduotis                                              | Status          |
| ------ | ----------------------------------------------------- | --------------- |
| P2 #2  | Testų infrastruktūra T2 (App/Quiz/progress)           | [ ]             |
| P2 #3  | S-R4 optional: `modules.ts` padalinti                 | [ ]             |
| P2 #16 | PDF_GENERATION_AGENT_MEMORY sync                      | [ ]             |
| §3 RAG | M7–9 docs: RAG/tyrimų nuoroda kelio aprašyme          | [ ]             |
| CRO    | Landing positioning / Hero CTA / trust / Pricing eilė | [ ] (marketing) |

### §1.4 Deferred (ne pradėti dabar)

- M10–15 monetizacija – po MON P0 + MON-7.
- M13–15 pilnas production release – Deferred.

---

## 2. Padaryta (santrauka)

Pilnos lentelės: [`TODO_DONE_SPRINTS_2026-07.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-07.md). Metrika: [`CODEBASE_WHAT_IS_DONE.md`](docs/development/CODEBASE_WHAT_IS_DONE.md).

- UX Banga 0–4 + M5 Apply+Gate ✅ · Practice closer PC-0…3 ✅ · M7P ✅ · Teaching Elements TE-0…5 ✅
- Portal 2.1 polish ✅ (liko anti-PPT retest) · DS hardening + W6–W10 ✅ · CONV-1…5 ✅
- Path Test Shell M2/M8/M11/M14 ✅ · LMS diagram polish W1–W7 ✅ · Release 1.4.6

---

## 3. Nuorodos

| Kas                  | Kur                                                           |
| -------------------- | ------------------------------------------------------------- |
| Klaidos / release QA | `docs/development/TEST_REPORT.md`, `RELEASE_QA_CHECKLIST.md`  |
| Monetizacija         | `ROADMAP.md` §4.1, `docs/deployment/MON_P0_EXECUTION_PLAN.md` |
| Docs lean            | `docs/development/DOCS_MAINTENANCE.md` §1c                    |
| Agent start          | `docs/DOCUMENTATION_QUICK_REF.md`                             |
| Done snapshot        | `docs/archive/development/TODO_DONE_SPRINTS_2026-07.md`       |
