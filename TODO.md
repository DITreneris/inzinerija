# TODO – Promptų anatomija

**Nuosavybė:** šis repo = **turinys, pedagogika, UI/UX mokymosi patirtyje**, duomenų/authoring kokybė. Marketingas / monetizacija / PostHog / CRO → kitas repo ([`docs/deployment/`](docs/deployment/) handoff).  
**Tikslas:** Open P0/P1 prioritetai (Docs Lean). Done istorija → [`TODO_DONE_SPRINTS_2026-07-28.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-07-28.md) (+ ankstesnis [`2026-07`](docs/archive/development/TODO_DONE_SPRINTS_2026-07.md)). SOT indeksas: `docs/DOCUMENTATION_QUICK_REF.md`.  
**Legenda:** **P0 = mokymosi kokybės blokoriai**, P1 = turinio/authoring kokybė + corporate cut, P2 = polish. MON ≠ P0. **Atnaujinta:** 2026-07-31 (M79 epic Sprint 1–3 **done**; Density DoD = ne; M1315-DENS deferred).

**Dabartinis fokusas:** M79 scheme ROI **uždarytas** · M1315-S5/S6/S7 **uždaryti** · marketing cutover (MON, out of scope) · Horizon D parked · Deferred dens (`M1315-DENS`). Ladder: [`ROADMAP.md`](ROADMAP.md). Automated: **150/924**; `build:corporate12` + `build:corporate15` žali.

**Produktiniai sprendimai (2026-07-31):** (1) skaitomumas keliamas **išlaikant gylį**; (2) **M79-S\*** epic completed; (3) **formalus Density DoD / CI – ne**; (4) M13 **13.3 / 13.4** dens → **M1315-DENS**.

**Learning / corporate vartai (šiame repo):**

- **Open P0:** nėra.
- **Open P1:** nėra (M79 `S0`…`S6` + `A11Y-*` done — §1.2d snapshot).
- **Open P2 / deferred dens:** `M1315-DENS` (13.3/13.4) — §1.2c; `M1315-S6/S7` done 2026-07-31.

---

## 1. Aktualus pipeline (open only)

> **Taisyklės:** [`DOCS_MAINTENANCE.md`](docs/development/DOCS_MAINTENANCE.md) §1c — §1 tik open; done → archive.

### §1.1 P0 – Mokymosi kokybės blokoriai

Open P0: **nėra.** Closeout (CQ-M79 / CQ-PORTAL / M9M): [`TODO_DONE_SPRINTS_2026-07-28.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-07-28.md).

### §1.2 P1 – Horizon C: M13–15 corporate production

**Closed 2026-07-30** (`M1315-C0`…`C4`) — intake [`M13_M15_CORPORATE_PRODUCTION_INTAKE.md`](docs/development/intake/M13_M15_CORPORATE_PRODUCTION_INTAKE.md).  
Repo exit: `build:corporate15` + `*-m1-m15.json` + magic-link tier **15** (€249 provisional) + `audit:m1315` + RELEASE_QA §6b + CI. Marketing env/pin cutover = §1.4.

### §1.2b P1 – Horizon B: M10–12 corporate production

**Closed 2026-07-28** (`M1012-P0`…`P4`) + **B-V verify/lock 2026-07-30** → archive [`TODO_DONE_SPRINTS_2026-07-28.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-07-28.md).  
Repo exit: `build:corporate12` + magic-link tier 12 + `audit:m1012` + docs. Marketing env/pin cutover = §1.4.

### §1.2c P1 – M13–15 schemes / interactive ROI

> Auditas: [`M13_M15_SCHEME_AUDIT.md`](docs/development/M13_M15_SCHEME_AUDIT.md). Production release lieka Deferred; ne corporate cut.

| ID             | Užduotis                              | Status   | Pastaba                                                                                          |
| -------------- | ------------------------------------- | -------- | ------------------------------------------------------------------------------------------------ |
| **M1315-S0**   | Audit SOT + docs sync                 | [x]      | `M13_M15_SCHEME_AUDIT.md` + indeksai                                                             |
| **M1315-S1**   | 13.47 I2V readiness meter             | [x]      | Realūs checks; testų perrašymas                                                                  |
| **M1315-S2**   | 13.37 Vaizdo generatoriaus a11y       | [x]      | Fake tablist, labeliai, i18n tips                                                                |
| **M1315-S3**   | 150.25 practice loop mobile           | [x]      | Scroll mobile; feedback path iš layout                                                           |
| **M1315-S4**   | 13.325 rose semantika                 | [x]      | After-lock → emerald; GOLDEN sync                                                                |
| **M1315-S5**   | Browser smoke vartai                  | [x]      | 13.37/13.47/13.325 shots; overflowX gate                                                         |
| **M1315-S7**   | 13.33 S5-THIRDS subject motif         | [x]      | Upper-right subject + muted center; `m13RuleOfThirdsS5`                                          |
| **M1315-S6**   | Process form individuality (S4-INDIV) | [x]      | linear / lock-artifact / timeline / cycle; `m13SpineIndividuality`                               |
| **M1315-DENS** | 13.3 / 13.4 content density residual  | Deferred | Po M79 (done); soft checklist (ne CI); **gylis lieka** – collapsible / Trumpai, ne Flagship trim |

### §1.2d P1 – M7–9 schemes / interactive ROI ← **done 2026-07-31**

> Auditas: [`M7_M9_SCHEME_AUDIT.md`](docs/development/M7_M9_SCHEME_AUDIT.md).  
> **Vykdymo planas:** [`M79_READABILITY_EXECUTION_PLAN.md`](docs/development/intake/M79_READABILITY_EXECUTION_PLAN.md) (Sprint 1→3) — epic DoD checked.  
> Soft residual: ✅ cleared 2026-07-31 (71 focus ring · 731 glow · 67.7 dual aria-live · M9 quest nav).  
> Sprendimai: chips auto-select = klaida; compact tipografijos grindys **globaliai**; individualumas visoms schemoms; **Density DoD = ne** (soft checklist).

| ID             | Užduotis                                           | Status | Pastaba                                                                                                       |
| -------------- | -------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------- |
| **M79-S0**     | Audit SOT + docs sync                              | [x]    | `M7_M9_SCHEME_AUDIT.md` + indeksai + registry                                                                 |
| **M79-S1a**    | A1-GATE: `preCopyCheckBlock` (67, 67.8)            | [x]    | Realus Copy gate (teisingas atsakymas); ChoiceControl + `aria-live`; TemplateBlock `copyDisabled`             |
| **M79-S1b**    | A1-CHIPS: `toolChoiceBar` default ×9               | [x]    | Default null iki pick; `whenHint` ×8 (+84); `aria-live`; testai perrašyti                                     |
| **M79-S2a**    | A2-CARDS: `m9_data_workflow` (74 + M9/93)          | [x]    | Kortelės `tabIndex={-1}` + `aria-hidden`; guard test                                                          |
| **M79-S2b**    | A2-SCOPE: M8/80 test-knowledge-scope               | [x]    | `testKnowledgeScopeContent.ts`; Valymas→891 / Seka→89; DIAGRAM_TOKENS SVG fallback; overlay contentSot        |
| **A11Y-SWEEP** | `role="img"` + interaktyvūs SVG internals          | [x]    | Schema3 / Rag / WorkflowComparison / ContextEngineering / LlmAutoregressive → `tabIndex={-1}` + `aria-hidden` |
| **A11Y-GUARD** | Registry-driven `role="img"` descendant guard      | [x]    | `diagramRoleImgFocusableGuard.test.tsx` (registry keys + sweep targets)                                       |
| **M79-S3**     | A3-TYPE: compact tipografijos grindys + 92/94/100  | [x]    | T5 floors + 92/94/100 re-fit; sk.100 compact stack + cycle cue; 94 dark tones                                 |
| **M79-S4**     | A4-CANVAS: miręs kadras 94 / 92 / 100              | [x]    | viewBox kirpimas (ne BOX↑) ant 92/94/100                                                                      |
| **M79-S5**     | A5-INDIV: formos individualumas (73 vs 89 + visos) | [x]    | 73 `station-rail` vs 89 `prep-funnel`; individuality test                                                     |
| **M79-S6**     | A6-REGISTRY: overlay dublių šalinimas              | [x]    | Hallucination slide-type → alias of `off:`; scope/contentSot; `audit:teaching-elements:strict` green          |

### §1.3 P2 – Horizon A: corporate micro (M1–9)

**Closed 2026-07-28** (`CORP-M1` done · `CORP-M2` won’t-now · `CORP-M3` deferred-with-date) → archive [`TODO_DONE_SPRINTS_2026-07-28.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-07-28.md).  
Open learning P2: **nėra** aktyvių ticket’ų (dens residual = Deferred **M1315-DENS** §1.2c, ne open P2 sprintas).

### §1.4 Out of scope – marketing handoff

> Ne default agentų P0. Vykdymas / env / KPI → marketing repo. Runbook: [`MON_P0_EXECUTION_PLAN.md`](docs/deployment/MON_P0_EXECUTION_PLAN.md).  
> **Horizon B cutover:** `build:corporate12` + `access_tier=12` — [`MARKETING_HANDOFF_CHECKLIST.md`](docs/deployment/MARKETING_HANDOFF_CHECKLIST.md).  
> **Horizon C cutover:** `build:corporate15` + `access_tier=15` (provisional €249) — tas pats checklist.

| ID        | Užduotis                                                                | Status | Pastaba                                                               |
| --------- | ----------------------------------------------------------------------- | ------ | --------------------------------------------------------------------- |
| **MON-1** | Prod env: nėra `VITE_MAX_ACCESSIBLE_MODULE=6`; `VITE_VERIFY_ACCESS_URL` | [ ]    | Marketing Vercel                                                      |
| **MON-2** | Submodule pin **v1.4.9** + deploy                                       | ⏳     | Marketing → pin tag **v1.4.9** (was 1.4.8); later 1.5.x + corporate15 |
| **MON-3** | Verify-access smoke (magic link → tier)                                 | ⏳     | Browser ⏳; po cutover — tier **12** / **15**                         |
| **MON-4** | PostHog/GA4 production + funnel dashboard                               | [ ]    | [`MON-4_POSTHOG_DEPLOY.md`](docs/deployment/MON-4_POSTHOG_DEPLOY.md)  |
| **MON-5** | Gate regression browser (tier 0 → AccessGate)                           | ⏳     | Auto ✅; browser ⏳                                                   |
| **MON-7** | Baseline KPI po MON-4 (2–4 sav.)                                        | [ ]    | Marketing                                                             |
| **MON-8** | Marketing prod: `build:production` M1–9 env                             | ⏳     | Vercel env; optional cutover → `build:corporate12` / `corporate15`    |
| CRO       | Landing positioning / Hero CTA / trust / Pricing eilė                   | [ ]    | Marketing                                                             |

MON-6 ✅ (client-side paywall riba) – žr. archive / CHANGELOG.

### §1.5 Deferred (Horizon D – ne pradėti dabar)

- M10–15 marketing monetizacija – marketing repo (tier 12/15 cutover = §1.4).
- **Horizon D:** M16–18 **Kodo inžinerija** (vibe-coding) – Deferred JSON/katalogas / skaidrių eilė; **SOT parked** (`turinio_pletra_moduliai_16_17_18.md` §8 freeze + F1–F8). Un-defer: product call „kitas kelias = Kodo inžinerija“. Tada F1 eilė. Ne open P0. M7 optional viz sk. 100–106 lieka M7.
- M19–21 **DI politikos inžinerija** – Deferred (nėra SOT / katalogo).

---

## 2. Padaryta (santrauka)

Pilnos lentelės: [`TODO_DONE_SPRINTS_2026-07-28.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-07-28.md) · ankstesnis: [`TODO_DONE_SPRINTS_2026-07.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-07.md). Metrika: [`CODEBASE_WHAT_IS_DONE.md`](docs/development/CODEBASE_WHAT_IS_DONE.md).

- UX Banga 0–4 + M5 Apply+Gate ✅ · Practice closer PC-0…4 ✅ · M7P / M9M ✅ · Teaching Elements TE-0…5 ✅
- Learning QA P0 ✅ (CQ-M79 + CQ-PORTAL) · PDF-1…6 / PDF-FIT-1 / DIAG-1 / M1012 authoring / M1315 ✅
- M13 gen meter → I2V (13.37 + 13.47) ✅ · P2 residual (T2 / S-R4 / GP / RAG / PDF memory) ✅ 2026-07-28
- M13–15 journey/UX (`M1315-J0`…`J7`) ✅ 2026-07-28 — 13.325 lab · M13P · M15 polish
- Path Test Shell M2/M8/M11/M14 ✅ · LMS W1–W7 ✅ · Docs Lean DL-0…4 ✅ · Release 1.4.6–1.4.9
- **Horizon B M10–12 corporate production** (`M1012-P0`…`P4`) ✅ 2026-07-28 + B-V lock 2026-07-30
- **Horizon C M13–15 corporate production** (`M1315-C0`…`C4`) ✅ 2026-07-30 — `build:corporate15`, magic-link tier 15
- **Horizon A CORP-M1…M3** ✅ 2026-07-28 — M7–9 backlog formal close; mid-path handout won’t-now; pedagogikos Should deferred

---

## 3. Nuorodos

| Kas                    | Kur                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------ |
| Production ladder      | [`ROADMAP.md`](ROADMAP.md)                                                                       |
| Klaidos / release QA   | `docs/development/TEST_REPORT.md`, `RELEASE_QA_CHECKLIST.md`                                     |
| M7–9 kokybė            | `docs/development/07_08_09_backlog.md`                                                           |
| M7–9 skaitomumo planas | [`M79_READABILITY_EXECUTION_PLAN.md`](docs/development/intake/M79_READABILITY_EXECUTION_PLAN.md) |
| Pedagogika             | `docs/development/PEDAGOGINES_IZVALGOS_ROADMAP.md`                                               |
| M10–12 corp intake     | `docs/development/intake/M10_M12_CORPORATE_PRODUCTION_INTAKE.md`                                 |
| M13–15 corp intake     | `docs/development/intake/M13_M15_CORPORATE_PRODUCTION_INTAKE.md`                                 |
| Marketing handoff      | `docs/deployment/MON_P0_EXECUTION_PLAN.md`                                                       |
| Docs lean              | `docs/development/DOCS_MAINTENANCE.md` §1c                                                       |
| Agent start            | `docs/DOCUMENTATION_QUICK_REF.md`                                                                |
| Done snapshot          | `docs/archive/development/TODO_DONE_SPRINTS_2026-07-28.md`                                       |
