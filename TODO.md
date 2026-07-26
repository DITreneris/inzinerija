# TODO – Promptų anatomija

**Nuosavybė:** šis repo = **turinys, pedagogika, UI/UX mokymosi patirtyje**, duomenų/authoring kokybė. Marketingas / monetizacija / PostHog / CRO → kitas repo ([`docs/deployment/`](docs/deployment/) handoff).  
**Tikslas:** Open P0/P1 prioritetai (Docs Lean). Done istorija → [`docs/archive/development/TODO_DONE_SPRINTS_2026-07.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-07.md). SOT indeksas: `docs/DOCUMENTATION_QUICK_REF.md`.  
**Legenda:** **P0 = mokymosi kokybės blokoriai**, P1 = turinio/authoring kokybė + learning QA (PDF, smoke), P2 = polish. MON ≠ P0. **Atnaujinta:** 2026-07-26 (turinio ambicijos flip).

**Dabartinis fokusas:** **turinio plėtros OS** — M7–9 browser ✅ → Portal 48h → M10–12 authoring brandumas → pedagogikos OS. Automated: lint + schema + TE strict + typecheck + `audit:m79` + `validate:journey-m9`. Blokoriai (žmogaus QA): Portal 48h; P1: PDF rankinė + M10–12 rankinė UI (chrome ✅ M1012-1) + DIAG-1. CONTENT §4.6 #6–9 ✅; CQ-M79-1/2 ✅ (2026-07-26).

**Learning QA vartai (šiame repo):**

- **P0 uždaryta:** CQ-M79-1/2/3 (S1–S7 / E1–E6 @375px + §4.6 #6–9 ✅).
- **Open P0:** CQ-PORTAL 48h anti-PPT retest (5 mobile, 375px).
- **P1 brandumas:** PDF M5/M6 (+ §5d) + M10–12 rankinė UI C1–C6 (`TEST_REPORT`) + diagram light/dark smoke (DIAG-1).

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
| **CQ-M79-1**  | M7–9 browser smoke S1–S7 @375px                                                             | [x] 2026-07-26 | `TEST_REPORT` S1–S7 Browser ✅; backlog §12–13                                                   |
| **CQ-M79-2**  | M7–9 browser smoke E1–E6 @375px (kasdienis artumas)                                         | [x] 2026-07-26 | `TEST_REPORT` E1–E6 Browser ✅; backlog §14                                                      |
| **CQ-M79-3**  | CONTENT residual §4.6 **#6–9** (sk. 90 nav; 891 „kada“; 74 MASTER vs M4; „vienas promptas“) | [x] 2026-07-26 | #6/#8 verify; EN 891 when-first; M7 #9 phrase batch LT+EN; `patch-m79-46-section46-residual.mjs` |
| **CQ-PORTAL** | 48h anti-PPT retest (5 mobile, 375px)                                                       | ⬜             | Portal 2.1 polish ✅; retest paruošta                                                            |
| **M9M-0…5**   | M9 maturity I0–I5 (chrome 12/4×3, tokens, tiers, reli, honesty, SOT/M9P)                    | [x] 2026-07-26 | Plan `m9_maturity_iterations`; DoD docs + `M9_PROMPT_MATURITY.md`                                |
| **M9M-6**     | M9 MUST browser smoke @375px (90→93.1→93.2→93→92)                                           | [x] 2026-07-26 | Unit+struktūra ✅; vizualus @375px ✅ CQ-M79-1/2                                                 |

### §1.2 P1 – Turinio kokybė + authoring brandumas

| ID             | Užduotis                                                             | Status         | Pastaba                                                                                                                      |
| -------------- | -------------------------------------------------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **PDF-1**      | M5 PDF rankinė (lietuviškos raidės)                                  | [ ]            | RELEASE_QA_CHECKLIST §5d                                                                                                     |
| **PDF-2**      | M6 PDF rankinė                                                       | [ ]            | §5d                                                                                                                          |
| **PDF-3**      | Rankinė M4 sk. 56 (RAG / LlmArch)                                    | [ ]            | §5d                                                                                                                          |
| **PDF-4**      | Rankinė M6 sk. 64                                                    | [ ]            | §5d                                                                                                                          |
| **PDF-5**      | Browser spot-check M1/M4/M6 @390px                                   | [ ]            | Bug bundle matrix (archive)                                                                                                  |
| **PDF-6**      | PDF/handout entry point M5/M6                                        | [ ]            |                                                                                                                              |
| **PDF-LINK-1** | Handout/certificate PDF nuorodų hitbox + maturity P0–P2              | [x] 2026-07-26 | `pdfLink` + Decide→hub; path CTA; starterPrompt; [`HANDOUT_MATURITY.md`](docs/development/HANDOUT_MATURITY.md); Annots smoke |
| **M1012-1**    | M10–12 chrome: titles / footer / CTA brandumas (be curriculum ID UI) | [x] 2026-07-26 | EN cross-ref/HITL/`docs/` fix + LT 10.65; GOLDEN §3.6; `build:modules-en-m10-m12`                                            |
| **M1012-W1**   | M10 Wave 1 content/schema (10.1–10.48 intake #1–6)                   | [x] 2026-07-26 | Copy dedupe + 10.45 lab polish + 10.48 toolChoiceBar; intake closed Wave1                                                    |
| **M1012-W2**   | M10 Wave 2 content (10.485–10.8 intake #7–11)                        | [x] 2026-07-26 | Orch/tools/workflow/MUST-tail polish; EN dual-source; intake closed Wave2                                                    |
| **M1012-2**    | `audit:m1012` + rankinė UI peržiūra (LT/EN)                          | [ ]            | `audit:m1012` ✅; browser C1–C6 @375px – `TEST_REPORT` ⬜                                                                    |
| **M1012-R**    | M10 slide ranking audit (UI/UX/Journey/Maturity/TE) → Top 8 backlog  | [x] 2026-07-26 | [`M10_SLIDE_RANKING_AUDIT.md`](docs/development/M10_SLIDE_RANKING_AUDIT.md)                                                  |
| **M1012-W3a**  | M10 Top-5 density/cycle batch (10.36/65/37/cluster/10.48)            | [x] 2026-07-26 | LT+EN; eilė sync; rework flags cleared; ranking audit §6 done                                                                |
| **M1012-W3R**  | M11/M12 Wave3 ranking audit (16 slides) → Top 8 / Top 5 frozen       | [x] 2026-07-26 | [`M11_M12_SLIDE_RANKING_AUDIT.md`](docs/development/M11_M12_SLIDE_RANKING_AUDIT.md); batch iki „tvarkom batch“               |
| **M1012-W3B**  | M11/M12 Top-5 batch (120.25/125/123/112/121 + EN 126/127 delete)     | [x] 2026-07-26 | LT+`build-en-m10-m12`; cycle/Copy/doc scrub; `audit:m1012` + schema OK                                                       |
| **DIAG-1**     | Rankinis light/dark diagram smoke M7–9 (TE registry + RELEASE_QA)    | [ ]            |                                                                                                                              |

### §1.3 Open P2 / polish

> Practice closer: [`PRACTICE_CLOSER_PLAN.md`](docs/development/PRACTICE_CLOSER_PLAN.md). PC-0…3 ✅.

| ID         | Užduotis                                     | Status                                                                |
| ---------- | -------------------------------------------- | --------------------------------------------------------------------- |
| **PC-4.1** | M3 portfolio progress chip (2/6)             | [ ]                                                                   |
| **PC-4.2** | M9 hub filtrai / quest clarity               | [x] 2026-07-26 quest clarity (map+hub copy); hub filtrai out of scope |
| **PC-4.3** | M15 optional badgeVariant clarity            | [ ]                                                                   |
| **PC-4.4** | M6 intro ChoiceControl auditas (61 vs 67)    | [ ]                                                                   |
| P2 #2      | Testų infrastruktūra T2 (App/Quiz/progress)  | [ ]                                                                   |
| P2 #3      | S-R4 optional: `modules.ts` padalinti        | [ ]                                                                   |
| P2 #16     | PDF_GENERATION_AGENT_MEMORY sync             | [ ]                                                                   |
| P2 #GP     | GitHub Pages MVP `/inzinerija/` gate policy  | [ ]                                                                   |
| §3 RAG     | M7–9 docs: RAG/tyrimų nuoroda kelio aprašyme | [ ]                                                                   |

### §1.4 Out of scope – marketing handoff

> Ne default agentų P0. Vykdymas / env / KPI → marketing repo. Runbook: [`MON_P0_EXECUTION_PLAN.md`](docs/deployment/MON_P0_EXECUTION_PLAN.md).

| ID        | Užduotis                                                                | Status | Pastaba                                                              |
| --------- | ----------------------------------------------------------------------- | ------ | -------------------------------------------------------------------- |
| **MON-1** | Prod env: nėra `VITE_MAX_ACCESSIBLE_MODULE=6`; `VITE_VERIFY_ACCESS_URL` | [ ]    | Marketing Vercel                                                     |
| **MON-2** | Submodule pin **v1.4.8** + deploy                                       | ⏳     | Runbook → pin 1.4.8                                                  |
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
- M16–18 **Kodo inžinerija** (vibe-coding) – Deferred JSON/katalogas / skaidrių eilė; **SOT parked** (`turinio_pletra_moduliai_16_17_18.md` §8 freeze + F1–F8 checklist; intake → `docs/archive/development/intake/`). Un-defer tik po CQ-PORTAL (CQ-M79-1/2 ✅) (arba override) **ir** product call „kitas kelias = Kodo inžinerija“; tada F1 eilė. Ne open P0. M7 optional viz sk. 100–106 lieka M7.
- M19–21 **DI politikos inžinerija** (dokumentacija ir komunikacija) – Deferred (nėra SOT / katalogo).

---

## 2. Padaryta (santrauka)

Pilnos lentelės: [`TODO_DONE_SPRINTS_2026-07.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-07.md). Metrika: [`CODEBASE_WHAT_IS_DONE.md`](docs/development/CODEBASE_WHAT_IS_DONE.md).

- UX Banga 0–4 + M5 Apply+Gate ✅ · Practice closer PC-0…3 ✅ · M7P ✅ · Teaching Elements TE-0…5 ✅
- Portal 2.1 polish ✅ (liko anti-PPT retest) · DS hardening + W6–W10 ✅ · CONV-1…5 ✅
- Path Test Shell M2/M8/M11/M14 ✅ · LMS diagram polish W1–W7 ✅ · Release 1.4.6–1.4.8
- Docs Lean DL-0…4 ✅ · **Turinio ambicijos flip** ✅ · CQ-M79-1/2 browser @375px ✅ 2026-07-26

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
