# TODO – Promptų anatomija

**Nuosavybė:** šis repo = **turinys, pedagogika, UI/UX mokymosi patirtyje**, duomenų/authoring kokybė. Marketingas / monetizacija / PostHog / CRO → kitas repo ([`docs/deployment/`](docs/deployment/) handoff).  
**Tikslas:** Open P0/P1 prioritetai (Docs Lean). Done istorija → [`TODO_DONE_SPRINTS_2026-07-28.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-07-28.md) (+ ankstesnis [`2026-07`](docs/archive/development/TODO_DONE_SPRINTS_2026-07.md)). SOT indeksas: `docs/DOCUMENTATION_QUICK_REF.md`.  
**Legenda:** **P0 = mokymosi kokybės blokoriai**, P1 = turinio/authoring kokybė + corporate cut, P2 = polish. MON ≠ P0. **Atnaujinta:** 2026-07-30 (Horizon **C** M1315-C\* ✅; B-V verify/lock ✅).

**Dabartinis fokusas:** marketing cutover handoff (MON, out of scope) · product next (Horizon D / quiet). Ladder: [`ROADMAP.md`](ROADMAP.md). Automated: **142/903** (`test:run` po 10.255 order guard fix); `build:corporate12` + `build:corporate15` žali.

**Learning / corporate vartai (šiame repo):**

- **Open P0:** nėra.
- **Open P1:** `M1315-S*` schemų / interaktyvių elementų ROI fix'ai (Deferred production; žr. §1.2c).
- **Open P2:** nėra (Horizon A CORP-M\* ✅ → archive).

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

| ID              | Užduotis                                | Status   | Pastaba                                                        |
| --------------- | --------------------------------------- | -------- | -------------------------------------------------------------- |
| **M1315-S0**    | Audit SOT + docs sync                   | [x]      | `M13_M15_SCHEME_AUDIT.md` + indeksai                           |
| **M1315-S1**    | 13.47 I2V readiness meter               | [x]      | Realūs checks; testų perrašymas                                |
| **M1315-S2**    | 13.37 Vaizdo generatoriaus a11y         | [x]      | Fake tablist, labeliai, i18n tips                              |
| **M1315-S3**    | 150.25 practice loop mobile             | [x]      | Scroll mobile; feedback path iš layout                         |
| **M1315-S4**    | 13.325 rose semantika                   | [x]      | After-lock → emerald; GOLDEN sync                              |
| **M1315-S5**    | Browser smoke vartai                    | [x]      | 13.37/13.47/13.325 shots; overflowX gate                       |
| **M1315-S6/S7** | Process form individuality + 13.33 lift | Deferred | S4-INDIV (metaforos) + S5-THIRDS; ne VerticalFlow pixel dedupe |

### §1.2d P1 – M7–9 schemes / interactive ROI

> Auditas: [`M7_M9_SCHEME_AUDIT.md`](docs/development/M7_M9_SCHEME_AUDIT.md). Korporatyvinis bundle (tier 9) – kokybės remontas, ne naujas cut.  
> Sprendimai §0: chips auto-select = klaida; compact tipografijos grindys keliamos **globaliai**; individualumo taisyklė – **visoms** schemoms.

| ID             | Užduotis                                           | Status | Pastaba                                                                                                     |
| -------------- | -------------------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------- |
| **M79-S0**     | Audit SOT + docs sync                              | [x]    | `M7_M9_SCHEME_AUDIT.md` + indeksai + registry                                                               |
| **M79-S1a**    | A1-GATE: `preCopyCheckBlock` (67, 67.8)            | [ ]    | Realus copy gate arba pervadinti; ChoiceControl + `aria-live`                                               |
| **M79-S1b**    | A1-CHIPS: `toolChoiceBar` default ×9               | [ ]    | Auto-select šalinimas + testo perrašymas; `whenHint`; `aria-live`                                           |
| **M79-S2a**    | A2-CARDS: `m9_data_workflow` (74 + M9/93)          | [ ]    | `tabIndex={-1}` + `aria-hidden`; `role="img"` kolizija; guard test                                          |
| **M79-S2b**    | A2-SCOPE: M8/80 test-knowledge-scope               | [ ]    | Content SOT + tokenai; dublis `slideId: 891`; mirusios šakos                                                |
| **A11Y-SWEEP** | `role="img"` + interaktyvūs SVG internals          | [ ]    | Cross-module: Schema3Interactive / RagDuomenu / WorkflowComparison / ContextEngineering / LlmAutoregressive |
| **A11Y-GUARD** | Registry-driven `role="img"` descendant guard      | [ ]    | Per `getDiagramRendererKeys()` renderinti schemas; drausti focusable vaikus `[role="img"]` viduje           |
| **M79-S3**     | A3-TYPE: compact tipografijos grindys + 92/94/100  | [ ]    | `diagramTokens` globaliai → cross-modulinis re-fit; sk. 100 2u clip                                         |
| **M79-S4**     | A4-CANVAS: miręs kadras 94 / 92 / 100              | [ ]    | viewBox kirpimas (ne BOX↑)                                                                                  |
| **M79-S5**     | A5-INDIV: formos individualumas (73 vs 89 + visos) | [ ]    | Metafora matoma be step text; ne pixel-parity dedupe                                                        |
| **M79-S6**     | A6-REGISTRY: overlay dublių šalinimas              | [ ]    | Hallucination ×2 įrašai; `contentSot` korekcijos                                                            |

### §1.3 P2 – Horizon A: corporate micro (M1–9)

**Closed 2026-07-28** (`CORP-M1` done · `CORP-M2` won’t-now · `CORP-M3` deferred-with-date) → archive [`TODO_DONE_SPRINTS_2026-07-28.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-07-28.md).  
Open learning P2 šiame repo: **nėra**.

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

| Kas                  | Kur                                                              |
| -------------------- | ---------------------------------------------------------------- |
| Production ladder    | [`ROADMAP.md`](ROADMAP.md)                                       |
| Klaidos / release QA | `docs/development/TEST_REPORT.md`, `RELEASE_QA_CHECKLIST.md`     |
| M7–9 kokybė          | `docs/development/07_08_09_backlog.md`                           |
| Pedagogika           | `docs/development/PEDAGOGINES_IZVALGOS_ROADMAP.md`               |
| M10–12 corp intake   | `docs/development/intake/M10_M12_CORPORATE_PRODUCTION_INTAKE.md` |
| M13–15 corp intake   | `docs/development/intake/M13_M15_CORPORATE_PRODUCTION_INTAKE.md` |
| Marketing handoff    | `docs/deployment/MON_P0_EXECUTION_PLAN.md`                       |
| Docs lean            | `docs/development/DOCS_MAINTENANCE.md` §1c                       |
| Agent start          | `docs/DOCUMENTATION_QUICK_REF.md`                                |
| Done snapshot        | `docs/archive/development/TODO_DONE_SPRINTS_2026-07-28.md`       |
