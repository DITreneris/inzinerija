# TODO – Promptų anatomija

**Nuosavybė:** šis repo = **turinys, pedagogika, UI/UX mokymosi patirtyje**, duomenų/authoring kokybė. Marketingas / monetizacija / PostHog / CRO → kitas repo ([`docs/deployment/`](docs/deployment/) handoff).  
**Tikslas:** Open P0/P1 prioritetai (Docs Lean). Done istorija → [`TODO_DONE_SPRINTS_2026-07-31.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-07-31.md) · [`2026-07-28`](docs/archive/development/TODO_DONE_SPRINTS_2026-07-28.md) · ankstesnis [`2026-07`](docs/archive/development/TODO_DONE_SPRINTS_2026-07.md). SOT indeksas: `docs/DOCUMENTATION_QUICK_REF.md`.  
**Legenda:** **P0 = mokymosi kokybės blokoriai**, P1 = turinio/authoring kokybė + corporate cut, P2 = polish. MON ≠ P0. **Atnaujinta:** 2026-08-04 (M16–18 learner plain ✅ §1.2i–l; M13 plain ✅ + `M13P-TRIM` ✅ §1.2j; TE-M1618 C1 won’t-now; C2 done; C3–C5 won’t-now; Must/Should/R\* done; Density DoD = ne).

**Dabartinis fokusas:** Wave D3 corporate18 Deferred · marketing cutover (MON, out of scope). Ladder: [`ROADMAP.md`](ROADMAP.md). Automated: **160/966**; `build:corporate12` + `build:corporate15` žali.

**Produktiniai sprendimai (2026-07-31 + 2026-08-01):** (1) skaitomumas keliamas **išlaikant gylį**; (2) **M79-S\*** epic completed; (3) **formalus Density DoD / CI – ne**; (4) M13 **13.3 / 13.4** dens soft pass → **M1315-DENS done**; (5) UJ-MUST done; (6) **Horizon D un-park** — kitas kelias = Kodo inžinerija; (7) M16–18 TE = MoSCoW individual metaphors (S4-INDIV), ne thin VerticalFlow facades; (8) **Authoring+TE ≠ learner plain** — M16–18 plain/EN body ✅ (§1.2i–l); (9) **M13 TE/corporate ✅ + learner plain ✅ + M13P-TRIM ✅** — chrome/outcomes/EN + copyable fit (`M13_MATURITY_PLAN` / `M13_PROMPT_MATURITY`).

**Learning / corporate vartai (šiame repo):**

- **Open P0:** nėra.
- **Open P1:** nėra (learning). D3 corporate18 Deferred §1.5 (CAV-C2 intake parked). TE-M1618 Could C1–C5 all won’t-now / done; `M1618-R*` done §1.2h; M16–18 plain ✅; M13 plain + `M13P-TRIM` ✅.
- **Open P2:** nėra.
- **Caveats Closure (2026-08-04):** tracking §1.6 — A automated ✅ · B marketing handoff sync ✅ · C1 handout ✅ · C2/D parked.

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
> **Closed** `M1315-S0`…`S7` + **`M1315-DENS`** (13.3/13.4 soft pass 2026-07-31) → archive [`TODO_DONE_SPRINTS_2026-07-31.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-07-31.md).

### §1.2d P1 – M7–9 schemes / interactive ROI ← **done 2026-07-31**

> Auditas: [`M7_M9_SCHEME_AUDIT.md`](docs/development/M7_M9_SCHEME_AUDIT.md).  
> **Vykdymo planas:** [`M79_READABILITY_EXECUTION_PLAN.md`](docs/development/intake/M79_READABILITY_EXECUTION_PLAN.md) (Sprint 1→3) — epic DoD checked.  
> **Closed** `M79-S0`…`S6` + `A11Y-SWEEP` / `A11Y-GUARD` + soft residual cleared → archive [`TODO_DONE_SPRINTS_2026-07-31.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-07-31.md).  
> Sprendimai: chips auto-select = klaida; compact tipografijos grindys **globaliai**; individualumas visoms schemoms; **Density DoD = ne** (soft checklist).

### §1.2e P1 – Horizon E: Transfer & Retention (UJ-MUST)

> Intake: [`UJ_MUST_TRANSFER_RETENTION_INTAKE.md`](docs/development/intake/UJ_MUST_TRANSFER_RETENTION_INTAKE.md). Must-only (MoSCoW). Role-first / Failure Gallery / MON = out.

| ID             | Užduotis                                                                                   | Status |
| -------------- | ------------------------------------------------------------------------------------------ | ------ |
| **UJ-MUST-S1** | Universal transfer closer (`abilityBefore`/`After` + `firstAction24h` / module `transfer`) | [x]    |
| **UJ-MUST-S2** | `resolveModuleTransfer` + ModuleCompleteScreen mirror                                      | [x]    |
| **UJ-MUST-S3** | Own-work slots on M3/M6/M9/M12/M15                                                         | [x]    |
| **UJ-MUST-S4** | Eval-as-habit GOLDEN §3.4g + `retrievalSchedule` + eval deep-link                          | [x]    |
| **UJ-MUST-S5** | Spaced retrieval MVP (D+1/D+7/D+30)                                                        | [x]    |

### §1.2f P1 – Horizon D: M16–18 Kodo inžinerija (authoring)

> Backlog: [`16_17_18_backlog.md`](docs/development/16_17_18_backlog.md). SOT: [`turinio_pletra_moduliai_16_17_18.md`](docs/turinio_pletra_moduliai_16_17_18.md). Eilė: [`MODULIO_16_SKAIDRIU_EILES.md`](docs/MODULIO_16_SKAIDRIU_EILES.md).  
> **D0 ✅ 2026-08-01.** Corporate18 (Wave D3) = Deferred §1.5. v1 be Feature Doc (lentelės / copyables).

| ID           | Užduotis                                                | Status |
| ------------ | ------------------------------------------------------- | ------ |
| **M1618-D0** | Product call + capacity; un-park                        | [x]    |
| **M1618-F1** | M16 skaidrių eilė (~18–22)                              | [x]    |
| **M1618-F2** | M17 Path Test outline (GOLDEN §3.4a1)                   | [x]    |
| **M1618-F3** | M18 skaidrių eilė A→B→C (~22–28)                        | [x]    |
| **M1618-F4** | LT copy + 6 copyables                                   | [x]    |
| **M1618-F5** | LT `modules.json` + EN overlay `modules-en-m16-m18`     | [x]    |
| **M1618-F6** | Cursor `tools.json` + EN + `audit:tools` (moduleId ≤18) | [x]    |
| **M1618-F7** | Reuse Shell / content-block wire                        | [x]    |
| **M1618-F8** | Path Test parity + TEST_REPORT + CHANGELOG              | [x]    |

### §1.2g P1 – Horizon D: M16–18 teaching elements (MoSCoW)

> Po F8 authoring: TE gap vs registry (lentelės / embeds / signature schemos). SOT hint’ai: [`turinio_pletra_moduliai_16_17_18.md`](docs/turinio_pletra_moduliai_16_17_18.md) §5. Registry: [`TEACHING_ELEMENTS_REGISTRY.md`](docs/development/TEACHING_ELEMENTS_REGISTRY.md). Backlog: [`16_17_18_backlog.md`](docs/development/16_17_18_backlog.md).  
> **Principas:** S4-INDIV — ~4–6 signature metaphors, ne 8–10 relabeled process Shell. Feature Doc **tik** naujam Pattern / lab (Should+).  
> Agent route: ORCH intake → CONTENT/DATA (Must lentelės+embeds) → SCHEME/CODING (Must schemos) → UJ/DATA (M18 transfer) → Feature Doc lab (Should).

#### Must

| ID              | Užduotis                                                                                                                                                                      | Status |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **TE-M1618-0**  | Intake freeze: metaphor map + WON’T thin facades + slide anchors                                                                                                              | [x]    |
| **TE-M1618-M1** | Lentelės (SOT): triage 16.7 · A/B/C 16.14 · score 16.15 · vibe-debt 18.14 · smoke 18.16 (`LENTELIU_STANDARTAS`)                                                               | [x]    |
| **TE-M1618-M2** | Embed ritmas GOLDEN §3.8: recognition 16.6 · `briefCheck`+`preCopy` 16.21 · `preCopy` 18.6–18.8 · recognition diff 18.201                                                     | [x]    |
| **TE-M1618-M3** | Signature schemos (unique metaphor): `m16_delivery_gates` · `m16_vsr_maturity` · `m16_user_cycle` (shared 16.16/18.3) · `m18_packet_stack` (+ `m18_diff_ritual` jei capacity) | [x]    |
| **TE-M1618-M4** | `DIAGRAMU_M16_M18_REGISTRY.md` + overlay rows + `audit:teaching-elements`                                                                                                     | [x]    |
| **TE-M1618-M5** | M18 transfer closer + soft DoD / own-work (reuse UJ-MUST chrome; 18.23–18.24)                                                                                                 | [x]    |

#### Should

| ID              | Užduotis                                                                             | Status                                                                                                           |
| --------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| **TE-M1618-S1** | `lab:m16_direction_picker` (16.14–16.15 ChoiceControl) — Feature Doc Contract        | [x] [`M16_DIRECTION_PICKER_LAB.md`](docs/development/M16_DIRECTION_PICKER_LAB.md) + `M16DirectionPickerLabBlock` |
| **TE-M1618-S2** | `diagram:m18_launch_gates` + `m18_diff_ritual` (gates vs magnifier; jei neįėjo į M3) | [x] `m18_diff_ritual` in Must; `m18_launch_gates` tollgate barriers on 18.19                                     |
| **TE-M1618-S3** | Mini entities 18.4 (Shell Ne static) + Chaos\|Control 18.1 comparison                | [x]                                                                                                              |
| **TE-M1618-S4** | `M16_M18_PROMPT_MATURITY.md` — Brief / Rules / Cursor / Klaidos / Planas klasės      | [x]                                                                                                              |

#### Could (Want)

| ID              | Užduotis                                                                           | Status                                                                                                                             |
| --------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **TE-M1618-C1** | Progress-saved PACKET desk (`lab:m18_packet_desk` / M9-like confirm) — Feature Doc | won’t-now — 2026-08-03: not sales/demo moment; no Feature Doc capacity; covered by static `m18_packet_stack` + Soft DoD path-steps |
| **TE-M1618-C2** | `.env` secret contrast surface (manipulation-contrast brother)                     | [x] 18.17 `embed:toolChoiceBar:m18:18.17:s1` (M7/67 reuse)                                                                         |
| **TE-M1618-C3** | Interactive smoke checklist (persisted ticks)                                      | won’t-now — overlaps R6 `18.16` path-step                                                                                          |
| **TE-M1618-C4** | M16–18 Content-track tokens (cyan; kaip M13 §6b) — product call                    | won’t-now — brand polish, ne pedagogy gap                                                                                          |
| **TE-M1618-C5** | Thin debug process 18.18 — tik jei ne redundant su iterate loop                    | won’t-now — S4-INDIV; table + iterate/diff already cover                                                                           |

**C1 decision (2026-08-03 — docs only; no Feature Doc):**

1. PACKET assembly is **not** the sales/demo moment for Kodo kelias (static stack + Soft DoD path suffice).
2. No capacity for full Feature Doc Contract (M9-like confirm lab) in this window.
3. Outcome: **won’t-now** (same class as C3–C5). Open learning P1 = nėra (`M13P-TRIM` ✅); D3 pricing / MON outside.

#### Won’t

| Draudžiama                                      | Kodėl                        |
| ----------------------------------------------- | ---------------------------- |
| 8–10 thin process Shell su swapped labeliais    | M13 pre-S4 clone debt        |
| Live Cursor / IDE-in-app                        | SOT / backlog WON’T          |
| MCP / Spec Kit kaip privalomas TE               | SOT WON’T                    |
| ChoiceControl lab prieš Must lenteles+4 schemas | Feature Doc disciplina       |
| Naujas `SlideType` kiekvienam artefaktui        | Prefer embed / diagram / lab |
| M7 viz 100–106 ar M10 agent labs perkėlimas     | Kitas kelias                 |
| Corporate18 TE bundled čia                      | Wave D3 = §1.5               |

### §1.2h P1 – Horizon D: M16–18 ritmas / journey (GOLDEN §3.8)

> Eilė: [`MODULIO_16_SKAIDRIU_EILES.md`](docs/MODULIO_16_SKAIDRIU_EILES.md). Reuse `section-break` / `warm-up-quiz` / `path-step` — **be** Feature Doc. Budget: M16→22 · M18→27. Ne Could C1–C5.

| ID           | Užduotis                                                                     | Status |
| ------------ | ---------------------------------------------------------------------------- | ------ |
| **M1618-R1** | M16 breath: `16.85` section-break + `16.205` warm-up; footers                | [x]    |
| **M1618-R2** | `16.15` lab-primary; score lentelė antrinė / collapsible                     | [x]    |
| **M1618-R3** | M18: `18.55` warm-up + `18.125` section-break + `18.23` → path-step Soft DoD | [x]    |
| **M1618-R4** | `16.8` → path-step kūrimo kortelė (in place)                                 | [x]    |
| **M1618-R5** | QA: schema · EN build · footer/interactivity · CHANGELOG / TEST_REPORT       | [x]    |
| **M1618-R6** | Stretch: `18.16` → path-step smoke (1/2 su Soft DoD)                         | [x]    |

### §1.2i P1 – M16 learner plain / EN body (authoring+TE ≠ skaitomumas)

> Planas: [`M16_MATURITY_PLAN.md`](docs/development/M16_MATURITY_PLAN.md). Rubrika: pedagogika · nauda · praktiškumas · verslo nauda. Ne Density CI; ne naujas TE Pattern. **Done** 2026-08-04 (C merge ✅). M17/M18 → §1.2k / §1.2l.

| ID               | Užduotis                                                                                    | Status |
| ---------------- | ------------------------------------------------------------------------------------------- | ------ |
| **M16-PLAIN-0**  | Plan freeze + rubrika                                                                       | [x]    |
| **M16-PLAIN-EN** | M16 EN body (23 sk.) + griežtesnis EN language audit                                        | [x]    |
| **M16-PLAIN-B1** | **16.25 · 16.3** (+ optional 160 outcomes[1–2] / 16.2 Daryk pavyzdys; **ne** intro rewrite) | [x]    |
| **M16-PLAIN-B2** | 16.4–16.8 · 16.85 · 16.9 – D1 + kortelės etalonas                                           | [x]    |
| **M16-PLAIN-B3** | 16.101 · 16.11–16.15 – VSR / kryptis plain                                                  | [x]    |
| **M16-PLAIN-B4** | 16.16–16.21 · 16.205 · 16.22 – ciklas / brief 11 / summary                                  | [x]    |
| **M16-PLAIN-C**  | Merge 16.85+16.9; 16.7↔16.18 role sharpen (22 sk.)                                          | [x]    |

### §1.2k P1 – M17 learner plain (Path Test shell + bank bridges)

> Planas: [`M17_MATURITY_PLAN.md`](docs/development/M17_MATURITY_PLAN.md). Shell lukštas ≈ M11; bank bridges (PACKET/VSR/smoke gloss). Ne naujas TE.

| ID                  | Užduotis                                                        | Status |
| ------------------- | --------------------------------------------------------------- | ------ |
| **M17-PLAIN-0**     | Plan freeze + shell gap vs M11                                  | [x]    |
| **M17-PLAIN-SHELL** | 172 results fields + CTA bridges                                | [x]    |
| **M17-PLAIN-BANK**  | Warm/graded/bonus plain bridges (PACKET / VSR / greita patikra) | [x]    |
| **M17-PLAIN-EN**    | Durable `m17-en-plain-overrides` + body audit module 17         | [x]    |
| **M17-PLAIN-QA**    | Vitest shell + `audit:m1618` + CHANGELOG                        | [x]    |

### §1.2l P1 – M18 learner plain (PACKET / Soft DoD earned + EN)

> Planas: [`M18_MATURITY_PLAN.md`](docs/development/M18_MATURITY_PLAN.md). Bridge jargon – **nestripinti**. Optional dens C deferred.

| ID               | Užduotis                                                            | Status   |
| ---------------- | ------------------------------------------------------------------- | -------- |
| **M18-PLAIN-0**  | Bridge freeze (PACKET / Soft DoD / smoke first-use)                 | [x]      |
| **M18-PLAIN-B1** | 180 · 18.05 · 18.1 · 18.2                                           | [x]      |
| **M18-PLAIN-B2** | 18.3–18.12 · 18.55 · 18.125                                         | [x]      |
| **M18-PLAIN-B3** | 18.13–18.19                                                         | [x]      |
| **M18-PLAIN-B4** | 18.201–18.24 · Soft DoD earned 18.23                                | [x]      |
| **M18-PLAIN-EN** | Full EN 28 sk. (`m18-en-lt-map` + overrides) + body audit module 18 | [x]      |
| **M18-PLAIN-C**  | Optional dens soft                                                  | deferred |
| **M18-PLAIN-QA** | `audit:m1618` + CHANGELOG + lessons                                 | [x]      |

### §1.2j P1 – M13 learner plain / chrome (TE+corporate ≠ skaitomumas)

> Planas: [`M13_MATURITY_PLAN.md`](docs/development/M13_MATURITY_PLAN.md). **Etalonai:** [`M7_PROMPT_MATURITY.md`](docs/development/M7_PROMPT_MATURITY.md) · [`M4_PROMPT_MATURITY.md`](docs/development/M4_PROMPT_MATURITY.md) · [`M79_READABILITY_EXECUTION_PLAN.md`](docs/development/intake/M79_READABILITY_EXECUTION_PLAN.md) · ranking Top-N — **ne** M16 plan esė formatas. Copyable lieka [`M13_PROMPT_MATURITY.md`](docs/development/M13_PROMPT_MATURITY.md). Ne Density CI; ne naujas TE.

| ID               | Užduotis                                                                                               | Status |
| ---------------- | ------------------------------------------------------------------------------------------------------ | ------ |
| **M13-PLAIN-0**  | Plan freeze + inventorius + meta wire                                                                  | [x]    |
| **M13-PLAIN-B1** | 130 outcomes/whyBenefit · 13.32/13.52/13.56 titles · 13.11 order · breaks                              | [x]    |
| **M13-PLAIN-B2** | 13.9 summary · 13.8 glossary · 13.101 Trumpai kiss                                                     | [x]    |
| **M13-PLAIN-EN** | Kill EN outcomes stub build’e + hand-tune B1/B2 skaidrėms                                              | [x]    |
| **M13-PLAIN-B3** | Soft gloss 13.3–13.6 / 13.5 / 13.35                                                                    | [x]    |
| **M13P-TRIM**    | M13P copyable trim (−30 % pass): 13.4 chain · 13.6 EN MASTER · 13.35 kiss · 13.1 Micro; keep 13.2/13.3 | [x]    |
| **M13-PLAIN-QA** | Walkthrough DoD + CHANGELOG + lessons + freeze                                                         | [x]    |

### §1.3 P2 – Horizon A: corporate micro (M1–9)

**Closed 2026-07-28** (`CORP-M1` done · `CORP-M2` won’t-now · `CORP-M3` deferred-with-date) → archive [`TODO_DONE_SPRINTS_2026-07-28.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-07-28.md).  
Open learning P2: **nėra** aktyvių ticket’ų.

### §1.4 Out of scope – marketing handoff

> Ne default agentų P0. Vykdymas / env / KPI → marketing repo. Runbook: [`MON_P0_EXECUTION_PLAN.md`](docs/deployment/MON_P0_EXECUTION_PLAN.md).  
> **Horizon B cutover:** `build:corporate12` + `access_tier=12` — [`MARKETING_HANDOFF_CHECKLIST.md`](docs/deployment/MARKETING_HANDOFF_CHECKLIST.md).  
> **Horizon C cutover:** `build:corporate15` + `access_tier=15` (provisional €249) — tas pats checklist.

| ID        | Užduotis                                                                | Status | Pastaba                                                                                                                  |
| --------- | ----------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------ |
| **MON-1** | Prod env: nėra `VITE_MAX_ACCESSIBLE_MODULE=6`; `VITE_VERIFY_ACCESS_URL` | [ ]    | Marketing Vercel · CAV-B1                                                                                                |
| **MON-2** | Submodule pin **v1.4.9** + deploy                                       | ⏳     | Learning pin **v1.4.9**; app HEAD **1.5.0** (+ corporate15 ready). Choose pin before cutover · CAV-B1                    |
| **MON-3** | Verify-access smoke (magic link → tier)                                 | ⏳     | Browser ⏳; po cutover — tier **12** / **15** (tier **18** = CAV-C2)                                                     |
| **MON-4** | PostHog/GA4 production + funnel dashboard                               | [ ]    | [`MON-4_POSTHOG_DEPLOY.md`](docs/deployment/MON-4_POSTHOG_DEPLOY.md) · CAV-B2; training events already in `analytics.ts` |
| **MON-5** | Gate regression browser (tier 0 → AccessGate)                           | ⏳     | Auto ✅; browser ⏳                                                                                                      |
| **MON-7** | Baseline KPI po MON-4 (2–4 sav.)                                        | [ ]    | Marketing                                                                                                                |
| **MON-8** | Marketing prod: `build:production` M1–9 env                             | ⏳     | Vercel env; optional cutover → `build:corporate12` / `corporate15`                                                       |
| CRO       | Landing positioning / Hero CTA / trust / Pricing eilė                   | [ ]    | Marketing                                                                                                                |

MON-6 ✅ (client-side paywall riba) – žr. archive / CHANGELOG.

### §1.5 Deferred

- M10–15 marketing monetizacija – marketing repo (tier 12/15 cutover = §1.4).
- **Horizon D Wave D3 / CAV-C2:** corporate18 (`build:corporate18`, magic-link tier 18, `audit:m1618`) — po pricing call. Intake [`docs/development/intake/M16_M18_CORPORATE18_INTAKE.md`](docs/development/intake/M16_M18_CORPORATE18_INTAKE.md). Authoring F1–F8 = §1.2f; TE MoSCoW = §1.2g; path handout CAV-C1 ✅.
- M19–21 **DI politikos inžinerija** – Deferred (nėra SOT / katalogo).
- M7 optional viz sk. 100–106 lieka M7 (≠ M16–18).
- **CAV-D1 Progress / org memory:** localStorage sandbox stays; no sync backend. Revisit after MON-4 analytics (CORP-M3 class) — export/import or learningEvents journal lite only.

### §1.6 Caveats Closure Program (2026-08-04)

| ID         | Item                                     | Owner               | Status                                                                               |
| ---------- | ---------------------------------------- | ------------------- | ------------------------------------------------------------------------------------ |
| **CAV-A1** | EN automated audits + RELEASE_QA §5c log | QA                  | [x] gates green; owner visual EN spot optional                                       |
| **CAV-A2** | Mobile @375 owner residual               | QA / owner          | [x] `smoke-diag1-m1315` 40/40 PASS (see TEST_REPORT)                                 |
| **CAV-A3** | PDF LT glyphs / links pre-release        | QA                  | [x] handout unit + schema (+ m1618); owner open-PDF visual still recommended §5d     |
| **CAV-B1** | Magic link cutover                       | Marketing           | [ ] handoff docs synced (pin 1.4.9 vs 1.5.0 / tier 12–15); execute in marketing repo |
| **CAV-B2** | PostHog MON-4                            | Marketing           | [ ] training `analytics.ts` wired; env/snippet/dashboard = marketing                 |
| **CAV-C1** | M1618 path handout                       | CONTENT→DATA→CODING | [x] `m1618` earn-on-complete path-funnel                                             |
| **CAV-C2** | corporate18 + tier 18                    | Product + stack     | won’t-now until pricing call (intake parked)                                         |
| **CAV-D1** | Progress lite / org memory               | Product             | deferred after B (no accounts rewrite)                                               |

---

## 2. Padaryta (santrauka)

Pilnos lentelės: [`TODO_DONE_SPRINTS_2026-07-31.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-07-31.md) · [`TODO_DONE_SPRINTS_2026-07-28.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-07-28.md) · ankstesnis: [`TODO_DONE_SPRINTS_2026-07.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-07.md). Metrika: [`CODEBASE_WHAT_IS_DONE.md`](docs/development/CODEBASE_WHAT_IS_DONE.md).

- UX Banga 0–4 + M5 Apply+Gate ✅ · Practice closer PC-0…4 ✅ · M7P / M9M ✅ · Teaching Elements TE-0…5 ✅
- Learning QA P0 ✅ (CQ-M79 + CQ-PORTAL) · PDF-1…6 / PDF-FIT-1 / DIAG-1 / M1012 authoring / M1315 ✅
- M13 gen meter → I2V (13.37 + 13.47) ✅ · P2 residual (T2 / S-R4 / GP / RAG / PDF memory) ✅ 2026-07-28
- M13–15 journey/UX (`M1315-J0`…`J7`) ✅ 2026-07-28 — 13.325 lab · M13P · M15 polish
- Path Test Shell M2/M8/M11/M14 ✅ · LMS W1–W7 ✅ · Docs Lean DL-0…4 ✅ · Release 1.4.6–1.4.9
- **Horizon B M10–12 corporate production** (`M1012-P0`…`P4`) ✅ 2026-07-28 + B-V lock 2026-07-30
- **Horizon C M13–15 corporate production** (`M1315-C0`…`C4`) ✅ 2026-07-30 — `build:corporate15`, magic-link tier 15
- **Horizon A CORP-M1…M3** ✅ 2026-07-28 — M7–9 backlog formal close; mid-path handout won’t-now; pedagogikos Should deferred
- **M79 scheme / skaitomumo ROI** (`M79-S*` + `A11Y-*`) ✅ 2026-07-31 · **M1315-S5/S6/S7** ✅ · **M1315-DENS** ✅ 2026-07-31 — archive 2026-07-31

---

## 3. Nuorodos

| Kas                    | Kur                                                                                                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Production ladder      | [`ROADMAP.md`](ROADMAP.md)                                                                                                                                               |
| Klaidos / release QA   | `docs/development/TEST_REPORT.md`, `RELEASE_QA_CHECKLIST.md`                                                                                                             |
| M7–9 kokybė            | `docs/development/07_08_09_backlog.md`                                                                                                                                   |
| M7–9 skaitomumo planas | [`M79_READABILITY_EXECUTION_PLAN.md`](docs/development/intake/M79_READABILITY_EXECUTION_PLAN.md)                                                                         |
| Pedagogika             | `docs/development/PEDAGOGINES_IZVALGOS_ROADMAP.md`                                                                                                                       |
| M10–12 corp intake     | `docs/development/intake/M10_M12_CORPORATE_PRODUCTION_INTAKE.md`                                                                                                         |
| M13–15 corp intake     | `docs/development/intake/M13_M15_CORPORATE_PRODUCTION_INTAKE.md`                                                                                                         |
| M16–18 TE / authoring  | [`16_17_18_backlog.md`](docs/development/16_17_18_backlog.md) · TE §1.2g · [`TEACHING_ELEMENTS_REGISTRY.md`](docs/development/TEACHING_ELEMENTS_REGISTRY.md)             |
| Marketing handoff      | `docs/deployment/MON_P0_EXECUTION_PLAN.md`                                                                                                                               |
| Docs lean              | `docs/development/DOCS_MAINTENANCE.md` §1c                                                                                                                               |
| Agent start            | `docs/DOCUMENTATION_QUICK_REF.md`                                                                                                                                        |
| Done snapshot          | [`TODO_DONE_SPRINTS_2026-07-31.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-07-31.md) · [`2026-07-28`](docs/archive/development/TODO_DONE_SPRINTS_2026-07-28.md) |
