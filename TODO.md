# TODO – Promptų anatomija

**Nuosavybė:** šis repo = **turinys, pedagogika, UI/UX mokymosi patirtyje**, duomenų/authoring kokybė. Marketingas / monetizacija / PostHog / CRO → kitas repo ([`docs/deployment/`](docs/deployment/) handoff).  
**Tikslas:** Open P0/P1 prioritetai (Docs Lean). Done istorija → [`docs/archive/development/TODO_DONE_SPRINTS_2026-07.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-07.md). SOT indeksas: `docs/DOCUMENTATION_QUICK_REF.md`.  
**Legenda:** **P0 = mokymosi kokybės blokoriai**, P1 = turinio/authoring kokybė + learning QA (PDF, smoke), P2 = polish. MON ≠ P0. **Atnaujinta:** 2026-07-26 (turinio ambicijos flip).

**Dabartinis fokusas:** **turinio plėtros OS** — M7–9 kokybė → M10–12 authoring brandumas → pedagogikos OS. Automated gates ✅ (lint + schema + TE strict + typecheck). Blokoriai: M79 browser smoke + Portal 48h; P1: PDF rankinė + M10–12 rankinė UI (chrome turinys ✅ M1012-1). CONTENT §4.6 #6–9 ✅ (CQ-M79-3).

**Learning QA vartai (šiame repo):**

- **P0 uždaryti:** M79 browser S1–S7 / E1–E6 @375px + Portal 48h retest.
- **P1 brandumas:** PDF M5/M6 (+ §5d) + M10–12 rankinė UI C1–C6 (`TEST_REPORT`) + diagram light/dark smoke.

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

### §1.1 P0 – Mokymosi kokybės blokoriai

| ID            | Užduotis                                                                                    | Status         | Pastaba                                                                                          |
| ------------- | ------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------ |
| **CQ-M79-1**  | M7–9 browser smoke S1–S7 @375px                                                             | [ ]            | [`07_08_09_backlog.md`](docs/development/07_08_09_backlog.md) §12–13; `TEST_REPORT` browser ⬜   |
| **CQ-M79-2**  | M7–9 browser smoke E1–E6 @375px (kasdienis artumas)                                         | [ ]            | backlog §14; `TEST_REPORT`                                                                       |
| **CQ-M79-3**  | CONTENT residual §4.6 **#6–9** (sk. 90 nav; 891 „kada“; 74 MASTER vs M4; „vienas promptas“) | [x] 2026-07-26 | #6/#8 verify; EN 891 when-first; M7 #9 phrase batch LT+EN; `patch-m79-46-section46-residual.mjs` |
| **CQ-PORTAL** | 48h anti-PPT retest (5 mobile, 375px)                                                       | ⬜             | Portal 2.1 polish ✅; retest paruošta                                                            |

### §1.2 P1 – Turinio kokybė + authoring brandumas

| ID          | Užduotis                                                             | Status         | Pastaba                                                                           |
| ----------- | -------------------------------------------------------------------- | -------------- | --------------------------------------------------------------------------------- |
| **PDF-1**   | M5 PDF rankinė (lietuviškos raidės)                                  | [ ]            | RELEASE_QA_CHECKLIST §5d                                                          |
| **PDF-2**   | M6 PDF rankinė                                                       | [ ]            | §5d                                                                               |
| **PDF-3**   | Rankinė M4 sk. 56 (RAG / LlmArch)                                    | [ ]            | §5d                                                                               |
| **PDF-4**   | Rankinė M6 sk. 64                                                    | [ ]            | §5d                                                                               |
| **PDF-5**   | Browser spot-check M1/M4/M6 @390px                                   | [ ]            | Bug bundle matrix (archive)                                                       |
| **PDF-6**   | PDF/handout entry point M5/M6                                        | [ ]            |                                                                                   |
| **M1012-1** | M10–12 chrome: titles / footer / CTA brandumas (be curriculum ID UI) | [x] 2026-07-26 | EN cross-ref/HITL/`docs/` fix + LT 10.65; GOLDEN §3.6; `build:modules-en-m10-m12` |
| **M1012-2** | `audit:m1012` + rankinė UI peržiūra (LT/EN)                          | [ ]            | `audit:m1012` ✅; browser C1–C6 @375px – `TEST_REPORT` ⬜                         |
| **DIAG-1**  | Rankinis light/dark diagram smoke M7–9 (TE registry + RELEASE_QA)    | [ ]            |                                                                                   |

### §1.3 Open P2 / polish

> Practice closer: [`PRACTICE_CLOSER_PLAN.md`](docs/development/PRACTICE_CLOSER_PLAN.md). PC-0…3 ✅.

| ID         | Užduotis                                     | Status |
| ---------- | -------------------------------------------- | ------ |
| **PC-4.1** | M3 portfolio progress chip (2/6)             | [ ]    |
| **PC-4.2** | M9 hub filtrai / quest clarity               | [ ]    |
| **PC-4.3** | M15 optional badgeVariant clarity            | [ ]    |
| **PC-4.4** | M6 intro ChoiceControl auditas (61 vs 67)    | [ ]    |
| P2 #2      | Testų infrastruktūra T2 (App/Quiz/progress)  | [ ]    |
| P2 #3      | S-R4 optional: `modules.ts` padalinti        | [ ]    |
| P2 #16     | PDF_GENERATION_AGENT_MEMORY sync             | [ ]    |
| §3 RAG     | M7–9 docs: RAG/tyrimų nuoroda kelio aprašyme | [ ]    |

### §1.4 Out of scope – marketing handoff

> Ne default agentų P0. Vykdymas / env / KPI → marketing repo. Runbook: [`MON_P0_EXECUTION_PLAN.md`](docs/deployment/MON_P0_EXECUTION_PLAN.md).

| ID        | Užduotis                                                                | Status | Pastaba                                                              |
| --------- | ----------------------------------------------------------------------- | ------ | -------------------------------------------------------------------- |
| **MON-1** | Prod env: nėra `VITE_MAX_ACCESSIBLE_MODULE=6`; `VITE_VERIFY_ACCESS_URL` | [ ]    | Marketing Vercel                                                     |
| **MON-2** | Submodule pin **v1.4.7** + deploy                                       | ⏳     | Runbook → pin 1.4.7                                                  |
| **MON-3** | Verify-access smoke (magic link → tier)                                 | ⏳     | Browser ⏳                                                           |
| **MON-4** | PostHog/GA4 production + funnel dashboard                               | [ ]    | [`MON-4_POSTHOG_DEPLOY.md`](docs/deployment/MON-4_POSTHOG_DEPLOY.md) |
| **MON-5** | Gate regression browser (tier 0 → AccessGate)                           | ⏳     | Auto ✅; browser ⏳                                                  |
| **MON-7** | Baseline KPI po MON-4 (2–4 sav.)                                        | [ ]    | Marketing                                                            |
| **MON-8** | Marketing prod: `build:production` M1–9 env                             | ⏳     | Vercel env rankinė                                                   |
| CRO       | Landing positioning / Hero CTA / trust / Pricing eilė                   | [ ]    | Marketing                                                            |

MON-6 ✅ (client-side paywall riba) – žr. archive / CHANGELOG.

### §1.5 Deferred (ne pradėti dabar)

- M13–15 pilnas production release – Deferred (authoring katalogas OK).
- M10–15 marketing monetizacija – marketing repo.
- M16–18 **Kodo inžinerija** (vibe-coding) – Deferred (nėra SOT / katalogo; M7 optional viz sk. 100–106 lieka M7, ne iškelta).
- M19–21 **DI politikos inžinerija** (dokumentacija ir komunikacija) – Deferred (nėra SOT / katalogo).

---

## 2. Padaryta (santrauka)

Pilnos lentelės: [`TODO_DONE_SPRINTS_2026-07.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-07.md). Metrika: [`CODEBASE_WHAT_IS_DONE.md`](docs/development/CODEBASE_WHAT_IS_DONE.md).

- UX Banga 0–4 + M5 Apply+Gate ✅ · Practice closer PC-0…3 ✅ · M7P ✅ · Teaching Elements TE-0…5 ✅
- Portal 2.1 polish ✅ (liko anti-PPT retest) · DS hardening + W6–W10 ✅ · CONV-1…5 ✅
- Path Test Shell M2/M8/M11/M14 ✅ · LMS diagram polish W1–W7 ✅ · Release 1.4.6–1.4.7
- Docs Lean DL-0…4 ✅ · **Turinio ambicijos flip** (TODO/ROADMAP P0 = mokymosi kokybė) ✅ 2026-07-26

---

## 3. Nuorodos

| Kas                  | Kur                                                          |
| -------------------- | ------------------------------------------------------------ |
| Klaidos / release QA | `docs/development/TEST_REPORT.md`, `RELEASE_QA_CHECKLIST.md` |
| M7–9 kokybė          | `docs/development/07_08_09_backlog.md`                       |
| Pedagogika           | `docs/development/PEDAGOGINES_IZVALGOS_ROADMAP.md`           |
| Marketing handoff    | `docs/deployment/MON_P0_EXECUTION_PLAN.md`                   |
| Docs lean            | `docs/development/DOCS_MAINTENANCE.md` §1c                   |
| Agent start          | `docs/DOCUMENTATION_QUICK_REF.md`                            |
| Done snapshot        | `docs/archive/development/TODO_DONE_SPRINTS_2026-07.md`      |
