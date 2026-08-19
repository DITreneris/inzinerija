# Docs sync checklist

> Tikslas: viena vieta po release ar didesnio Unreleased sprinto patikrinti, ar agentų įėjimo dokumentai, release/ops dokumentai ir techniniai registry atitinka faktinę kodo bazę.

**Baseline:** training **1.6.3** + Unreleased 08-19 (kiss + gate-green · corp15 slice · hygiene **40** · v4.36) · live pin **v1.6.2** · **12 live per Supabase**  
**Testai:** tag **1.6.3** = **171/1056**; Unreleased HEAD = **176/1078**  
**Data:** 2026-08-19 (docs meta sync v4.36; ne 1.6.4 / ne re-pin)  
**Šaltiniai:** `package.json`, `CHANGELOG.md`, `docs/development/RELEASE_QA_RUN.md`, `docs/development/RELEASE_QA_CHECKLIST.md`, `docs/development/DOCS_MAINTENANCE.md`.

## Sync lentelė

### Unreleased kiss + gate-green – 2026-08-19

| #   | Failas                                       | Laukas     | Buvo                      | Turi būti                                              | Done |
| --- | -------------------------------------------- | ---------- | ------------------------- | ------------------------------------------------------ | ---- |
| 1   | `TODO.md` / `ROADMAP.md`                     | version    | v4.35 · hygiene 41        | **v4.36** · hygiene **40**                             | [x]  |
| 2   | `modules-m1-m15.json`                        | 13.31      | footer `Consistency`      | `Tas pats vaizdas` via `generate:core-data`; max id 15 | [x]  |
| 3   | QUICK_REF / LEAN / INDEX / CODEBASE / AGENTS | open/meta  | kiss missing · hygiene 41 | kiss + slice · hygiene 40 · v4.36                      | [x]  |
| 4   | `tsc` + isolated RTL + preflight             | gates      | 3 tsc · pool timeout      | typecheck OK · 8/36 · preflight **176/1078**           | [x]  |
| 5   | `CHANGELOG` / `TEST_REPORT`                  | Unreleased | kiss be slice             | gate-green Fixed + Docs v4.36                          | [x]  |

### Unreleased corp15 + C-S2/C-S4 – 2026-08-18

| #   | Failas                              | Laukas  | Buvo                   | Turi būti                                | Done |
| --- | ----------------------------------- | ------- | ---------------------- | ---------------------------------------- | ---- |
| 1   | `TODO.md` §1.3b                     | C-S\*   | C-S2/C-S4 `[ ]`        | C-S1–S4 `[x]`; Could parked              | [x]  |
| 2   | `ROADMAP.md`                        | version | v4.34                  | **v4.35** Horizon C                      | [x]  |
| 3   | `modules-m1-m15.json`               | 151–158 | Optional / Quick start | sync via `generate:core-data`; max id 15 | [x]  |
| 4   | QUICK_REF / LEAN / INDEX / CODEBASE | open    | C-S2/C-S4              | I5 · Should · TOOL-5                     | [x]  |
| 5   | craft + walk intakes                | close   | C-S2/C-S4 open         | Banga 3 shipped                          | [x]  |
| 6   | `TEST_REPORT.md`                    | gates   | v4.34                  | Wave corp15 + C-S2/C-S4                  | [x]  |

### Unreleased Walk RAW + C-S1/S3 + M17 analog – 2026-08-18

| #   | Failas                                              | Laukas     | Buvo                               | Turi būti                                                  | Done |
| --- | --------------------------------------------------- | ---------- | ---------------------------------- | ---------------------------------------------------------- | ---- |
| 1   | `TODO.md` §1.3a / §1.3b                             | late stack | Walk RAW `152–158` · C-S\* open    | Walk RAW + M17-ANALOG + C-S1/S3 `[x]`; C-S2/C-S4 open      | [x]  |
| 2   | `ROADMAP.md`                                        | version    | v4.33                              | **v4.34** Horizon C/D                                      | [x]  |
| 3   | `DOCUMENTATION_QUICK_REF.md` / `LEAN_INDEX` / INDEX | open       | `152–158` + C-S\*                  | C-S2/C-S4 · I5 · TOOL-5                                    | [x]  |
| 4   | `CODEBASE_WHAT_IS_DONE.md`                          | M13–18     | Walk RAW liekana                   | Walk RAW + C-S1/S3 + M17 analog ✅; corporate15 158 caveat | [x]  |
| 5   | `CHANGELOG` Unreleased TOC                          | tree       | v4.33                              | M15 honesty · C-S1/S3 · M17 analog · **v4.34**             | [x]  |
| 6   | intakes walk + craft                                | close      | `152–158` gali tęstis · C-S\* open | §R.M15 close · craft §9 C-S1/S3 shipped                    | [x]  |
| 7   | `TEST_REPORT.md`                                    | gates      | v4.33 docs-only                    | Wave 4 vartai + M17 analog                                 | [x]  |

### Unreleased 08-17/18 + docs meta sync – 2026-08-18

| #   | Failas                                 | Laukas      | Buvo                                    | Turi būti                                                             | Done |
| --- | -------------------------------------- | ----------- | --------------------------------------- | --------------------------------------------------------------------- | ---- |
| 1   | `TODO.md` §1.3a / §1.3b / §2           | late stack  | Walk RAW vague · be M5                  | M14-ITEMS / I2-M13 / C-M1–M3 / M15 FAIL / M5 ✅; Walk RAW = `152–158` | [x]  |
| 2   | `ROADMAP.md`                           | version     | v4.32                                   | **v4.33** docs meta sync                                              | [x]  |
| 3   | `DOCUMENTATION_QUICK_REF.md`           | ROADMAP     | v4.25                                   | **v4.33** + open liekana                                              | [x]  |
| 4   | `LEAN_INDEX.md`                        | header      | 08-16 · open = tik MON/D3               | 08-18 · late stack + TOOL-5                                           | [x]  |
| 5   | `CODEBASE_WHAT_IS_DONE.md`             | HEAD vs tag | HEAD = 171/1056                         | tag 1.6.3 = 171/1056; HEAD Unreleased = daugiau kontraktų             | [x]  |
| 6   | `CHANGELOG` Unreleased TOC             | tree        | „Po 1.6.3.“                             | 08-17/18 scope + docs sync; ne 1.6.4                                  | [x]  |
| 7   | archive `TODO_DONE_SPRINTS_2026-08.md` | 08-17/18    | baigiasi 08-16                          | Unreleased 08-17/18 blokas                                            | [x]  |
| 8   | `DOCUMENTATION_INDEX.md` header        | open/date   | 2026-08-01 · Could open · release 1.4.9 | 2026-08-18 · late stack · training 1.6.3 / pin 1.6.2                  | [x]  |

### Owner status – 2026-08-16

| #   | Failas                                                  | Laukas   | Buvo                        | Turi būti                                              | Done |
| --- | ------------------------------------------------------- | -------- | --------------------------- | ------------------------------------------------------ | ---- |
| 1   | `TODO.md` §1.4 / §1.5 / §1.6                            | MON/CAV  | live verify ⏳ · MON-2/3 ⏳ | 12 live; MON-2/3 `[x]`; MON-8 superseded; CAV-B1 `[x]` | [x]  |
| 2   | `DEPLOYMENT` + `INTEGRATION_OVERVIEW` + `ROADMAP` §4    | kanonas  | Vercel now = M1–9           | prod = `corporate12` / M1–12                           | [x]  |
| 3   | `MON_P0_EXECUTION_PLAN`                                 | vykdymas | pin 1.4.2 / HEAD 1.5.0      | superseded banner                                      | [x]  |
| 4   | memo 06 + HANDOFF + PIN runbook + README + VERSION      | pin/live | v1.4.9 until cutover        | v1.6.2 current; 12 live; v1.4.9 istorinis              | [x]  |
| 5   | `CHANGELOG` / `TEST_REPORT` / `CODEBASE` / `LEAN_INDEX` | status   | cutover open                | owner status 2026-08-16                                | [x]  |

### Unreleased visual QA + metric sync – 2026-08-14

| #   | Failas                                 | Laukas      | Buvo             | Turi būti                                                 | Done |
| --- | -------------------------------------- | ----------- | ---------------- | --------------------------------------------------------- | ---- |
| 1   | `TODO.md` antraštė                     | tests/data  | 165/1005 · 08-13 | **168/1033** · visual QA PASS · 08-14                     | [x]  |
| 2   | `CODEBASE_WHAT_IS_DONE.md`             | tests/HEAD  | 165/1005         | HEAD **168/1033**; tag 1.6.2 lieka 165/1005               | [x]  |
| 3   | `DOCUMENTATION_QUICK_REF.md`           | header      | 08-13            | 08-14 · visual QA · **168/1033**                          | [x]  |
| 4   | `CHANGELOG` Unreleased TOC + santrauka | tests       | 165 HEAD         | Unreleased **168/1033**; tagged 1.6.2 eilutė nepaliečiama | [x]  |
| 5   | `TEST_REPORT.md`                       | 08-14 block | —                | jau įrašyta (Must-contract PASS; ne 1.6.3)                | [x]  |
| 6   | `ROADMAP.md`                           | open gaps   | 08-13            | visual QA PASS eilutė (v4.25)                             | [x]  |

### M10 testerio Must + T09 + hygiene closeout – 2026-08-13

| #   | Failas                                    | Laukas      | Buvo                | Turi būti                                            | Done |
| --- | ----------------------------------------- | ----------- | ------------------- | ---------------------------------------------------- | ---- |
| 1   | `TODO.md` §1.3                            | pipeline    | T0–T3 [x] lentelė   | Must shipped → archive; open = I5 / Should / M11–M12 | [x]  |
| 2   | `ROADMAP.md`                              | v4.24       | T01–T08 only        | **v4.25** T09 + hygiene **41**                       | [x]  |
| 3   | hygiene baseline                          | count       | 70 / 69             | **41** (linter + copy; `--write-baseline`)           | [x]  |
| 4   | `CHANGELOG` Unreleased TOC                | tree        | T01–T08 + T09 + 41  | + AppNav / hinge / prompt Micro                      | [x]  |
| 5   | `intake/M10_M12_TESTER_INTAKE_2026-08.md` | T09 / 70    | T01–T08; hygiene 70 | T09 apdorota; liekana **41**                         | [x]  |
| 6   | archive `TODO_DONE_SPRINTS_2026-08.md`    | 08-13 block | nėra                | T0–T3 / T09 / hygiene / hinge / AppNav / Micro       | [x]  |

### M10 testerio batch T01–T08 closeout – 2026-08-13

| #   | Failas                                        | Laukas     | Buvo              | Turi būti                                  | Done |
| --- | --------------------------------------------- | ---------- | ----------------- | ------------------------------------------ | ---- |
| 1   | `TODO.md` §1.3                                | M1012-T3   | [ ] Wave pipeline | [x] Must chrome shipped; I5 parked         | [x]  |
| 2   | `intake/M10_M12_TESTER_INTAKE_2026-08.md`     | T01–T08    | open / netaisyta  | apdorota; Phase B shipped                  | [x]  |
| 3   | hygiene baseline                              | count      | 71                | **70** (echo kirpimas; `--write-baseline`) | [x]  |
| 4   | `CHANGELOG` / `TEST_REPORT` / `ROADMAP` v4.24 | Unreleased | Phase B open      | T01–T08 Must chrome ✅; pin v1.6.2         | [x]  |

### M10–12 testerio intake OPEN – 2026-08-13

| #   | Failas                                      | Laukas        | Buvo                 | Turi būti                                       | Done |
| --- | ------------------------------------------- | ------------- | -------------------- | ----------------------------------------------- | ---- |
| 1   | `TODO.md` §1.3                              | open pipeline | freeze = stop        | freeze gyvam turiniui + testerio intake Phase A | [x]  |
| 2   | `intake/M10_M12_TESTER_INTAKE_2026-08.md`   | naujas        | nėra                 | Phase A žurnalas OPEN                           | [x]  |
| 3   | `M10_M12_CONTENT_DEEP_AUDIT` + plain intake | status        | CLOSED / FREEZE only | FREEZE + pointeris į testerio intake            | [x]  |

### Parent pin observed – 2026-08-13

| #   | Failas                                                    | Laukas     | Buvo                      | Turi būti                                            | Done |
| --- | --------------------------------------------------------- | ---------- | ------------------------- | ---------------------------------------------------- | ---- |
| 1   | `TODO.md` MON-2 / CAV-B1                                  | status     | execute in marketing repo | GitHub pin ✅ PR #92; live `/anatomy/` ⏳            | [x]  |
| 2   | `MARKETING_SUBMODULE_PIN_CORPORATE12` + memo 06 + HANDOFF | pin status | future cutover wording    | GitHub done `c35a1f5`; prod verify open              | [x]  |
| 3   | `TEST_REPORT.md` / `CHANGELOG` Unreleased                 | evidence   | tag-only                  | parent PR #92 + live HomePage still RetrievalDueCard | [x]  |

### Release 1.6.2 – 2026-08-13

| #   | Failas                                                                               | Laukas             | Buvo                  | Turi būti                                        | Done |
| --- | ------------------------------------------------------------------------------------ | ------------------ | --------------------- | ------------------------------------------------ | ---- |
| 1   | `package.json` / `package-lock.json` / `README.md` / `CHANGELOG.md`                  | release truth      | 1.6.1 + Unreleased    | **1.6.2** release cut                            | [x]  |
| 2   | `06_marketingo_memo_corporate12_supabase.md`                                         | cutover pin        | v1.6.1                | tag **v1.6.2**                                   | [x]  |
| 3   | `DEPLOYMENT` + `MARKETING_HANDOFF_CHECKLIST` + `MARKETING_SUBMODULE_PIN_CORPORATE12` | marketing handoff  | pin v1.6.1            | pin **v1.6.2**, build `corporate12`, tier **12** | [x]  |
| 4   | `VERSION_ANALIZE.md` / `TODO.md` / `TEST_REPORT.md` / `ROADMAP.md`                   | release/QA summary | Unreleased post-1.6.1 | **v1.6.2** Horizon B pin                         | [x]  |

### Unreleased post-1.6.1 / Docs Lean – 2026-08-12

| #   | Failas                                                    | Laukas         | Buvo                    | Turi būti                                       | Done |
| --- | --------------------------------------------------------- | -------------- | ----------------------- | ----------------------------------------------- | ---- |
| 1   | `TODO.md` / archive `TODO_DONE_SPRINTS_2026-08.md`        | §1 open-only   | full done tables in §1  | lean §1; done → 2026-08 archive                 | [x]  |
| 2   | `ROADMAP.md`                                              | version / gaps | v4.21 · „P1 nėra“ stale | **v4.22** · CATALOG-HOME done · content freeze  | [x]  |
| 3   | `CODEBASE_WHAT_IS_DONE.md` / `DOCUMENTATION_QUICK_REF.md` | meta           | 1.6.0 / 08-11           | 2026-08-12 Unreleased + pin 1.6.1               | [x]  |
| 4   | `CHANGELOG.md`                                            | Unreleased     | mixed                   | Home demote + Docs Lean; **ne** merge į [1.6.1] | [x]  |
| 5   | M10–12 content audit + intake                             | status         | P2 open wording         | **CLOSED / FREEZE**                             | [x]  |
| 6   | Marketing pin docs                                        | version        | v1.6.1                  | **lieka v1.6.1** (no retag)                     | [x]  |

### Corporate12 cutover pin – 2026-08-12

| #   | Failas                                                                               | Laukas             | Buvo                         | Turi būti                                        | Done |
| --- | ------------------------------------------------------------------------------------ | ------------------ | ---------------------------- | ------------------------------------------------ | ---- |
| 1   | `package.json` / `package-lock.json` / `README.md` / `CHANGELOG.md`                  | release truth      | 1.6.0 + Unreleased toolchain | **1.6.1** release cut                            | [x]  |
| 2   | `06_marketingo_memo_corporate12_supabase.md`                                         | cutover pin        | app 1.5.0                    | tag **v1.6.1** + copy-paste checklist            | [x]  |
| 3   | `DEPLOYMENT` + `MARKETING_HANDOFF_CHECKLIST` + `MARKETING_SUBMODULE_PIN_CORPORATE12` | marketing handoff  | pin 1.5.0                    | pin **v1.6.1**, build `corporate12`, tier **12** | [x]  |
| 4   | `VERSION_ANALIZE.md` / `TODO.md` / `TEST_REPORT.md`                                  | release/QA summary | stale 1.5.0 / 1.6.0 wording  | **v1.6.1** Horizon B handoff                     | [x]  |

### Corporate12 Supabase handoff – 2026-08-06

| #   | Failas                                                      | Laukas                  | Buvo                            | Turi būti                                            | Done |
| --- | ----------------------------------------------------------- | ----------------------- | ------------------------------- | ---------------------------------------------------- | ---- |
| 1   | `06_marketingo_memo_corporate12_supabase.md`                | Horizon B Phase 1 memo  | nėra                            | naujas memo (be Stripe)                              | [x]  |
| 2   | `INTEGRATION_OVERVIEW.md`                                   | plan map / verify tiers | 12→9 kaip galutinė; tiers 3/6/9 | 12→12 po cutover; tiers 3/6/9/**12** (+15 Horizon C) | [x]  |
| 3   | `MARKETING_HANDOFF` + `MARKETING_SUBMODULE_PIN_CORPORATE12` | cutover runbook         | tik Stripe/env hint             | §7b + pin 1.5.0 runbook                              | [x]  |
| 4   | `README` / `DEPLOYMENT` / `TODO` CAV-B1 / `CHANGELOG`       | nuorodos                | tik memo 05                     | + memo 06 + pin corporate12                          | [x]  |

### Pre-launch audit remediation – 2026-08-04

| #   | Failas                                                        | Laukas        | Buvo    | Turi būti                                                          | Done |
| --- | ------------------------------------------------------------- | ------------- | ------- | ------------------------------------------------------------------ | ---- |
| 1   | `TEST_REPORT` / `TODO` / `ROADMAP` / `CODEBASE` / `CHANGELOG` | testų metrika | 160/966 | **161/982** po M10–12 remediacijos + kalbos vartų; preflight green | [x]  |

### Docs A + EN B sync – 2026-08-01

| #   | Failas                                                        | Laukas        | Buvo    | Turi būti                         | Done |
| --- | ------------------------------------------------------------- | ------------- | ------- | --------------------------------- | ---- |
| 1   | `TEST_REPORT` / `TODO` / `ROADMAP` / `CODEBASE` / `CHANGELOG` | testų metrika | 154/940 | **155/944** po mobile @375 chrome | [x]  |

### Pre-launch M79/M1315 sync – 2026-07-31

| #   | Failas                                                        | Laukas        | Buvo    | Turi būti                                      | Done |
| --- | ------------------------------------------------------------- | ------------- | ------- | ---------------------------------------------- | ---- |
| 1   | `TEST_REPORT` / `TODO` / `ROADMAP` / `CODEBASE` / `CHANGELOG` | testų metrika | 142/903 | **150/924** po M79/M1315 ROI + typography gate | [x]  |

### Code/doc audit sync – 2026-07-30

| #   | Failas                                                                  | Laukas                    | Buvo                                       | Turi būti                                                        | Done |
| --- | ----------------------------------------------------------------------- | ------------------------- | ------------------------------------------ | ---------------------------------------------------------------- | ---- |
| 1   | `README.md`                                                             | produkto build sluoksniai | 3 sluoksniai; tier 3/6/9                   | 5 sluoksniai; MVP/M1–9/corporate12/corporate15/full + tier 12/15 | [x]  |
| 2   | `TEST_REPORT` / `TODO` / `ROADMAP` / `CODEBASE` / `CHANGELOG`           | testų metrika             | 139/889 arba 139/891                       | **142/903** po `m10SlideOrder` fix                               | [x]  |
| 3   | `DOCUMENTATION_QUICK_REF` / `LEAN_INDEX` / `.cursorrules` / `AGENTS.md` | open fokusas              | Horizon B `M1012-P*` / Horizon A `CORP-M*` | M7–9 `M79-S*` + `A11Y-*`; MON out of scope; Horizon D parked     | [x]  |
| 4   | `VERSION_ANALIZE.md`                                                    | release truth             | package version 1.4.9                      | package version **1.5.0**; v1.4.9 = marketing pin                | [x]  |

### Unreleased post-1.4.9 docs sync – 2026-07-28

| #   | Failas                                       | Laukas                    | Buvo                                   | Turi būti                                                 | Done |
| --- | -------------------------------------------- | ------------------------- | -------------------------------------- | --------------------------------------------------------- | ---- |
| 1   | `ECOSYSTEM_MAP.md`                           | footer deepen UTM         | tik spinoff\|handout; footer = site/TG | `buildFooterDeepenUrl` + `utm_medium=footer` / Skaitiniai | [x]  |
| 2   | `RELEASE_QA_CHECKLIST` / `RELEASE_QA_RUN`    | external link smoke       | tik GitHub footer                      | Skaitiniai / Deep reads + GitHub                          | [x]  |
| 3   | `PDF_MAKETO_GAIRES` / `PDF_DOWNLOAD_TESTING` | M5 density                | compact tik path-funnel                | M5=`compact` + `HANDOUT_CONTENT_BOTTOM`                   | [x]  |
| 4   | `PDF_GENERATION_AGENT_MEMORY.md` (P2 #16)    | handout maturity / fit    | pre-FIT memory                         | HANDOUT_MATURITY + fit + pdfLink                          | [x]  |
| 5   | `GOLDEN_STANDARD` §3.8.1                     | preCopy etalonai          | M5/47, M7 only                         | + M4/59–60, M6/68                                         | [x]  |
| 6   | `DIAGRAMU_M1_M9_AUDITAS`                     | RAG P3                    | Shell backlog                          | maturity 3 / Shell chrome done                            | [x]  |
| 7   | TE overlay + registry                        | updatedAt / RAG / preCopy | 2026-07-26                             | 2026-07-28; RAG maturity 3; preCopy M4/M6                 | [x]  |
| 8   | `CODEBASE` / INDEX / QUICK_REF / LEAN        | Unreleased pointers       | 1.4.9 only / INDEX v1.4.8              | footer + M4–M6 brandos; INDEX **1.4.9**                   | [x]  |
| 9   | `CHANGELOG` Unreleased Docs                  | docs sync note            | PDF-FIT + TE only                      | + meta sync block                                         | [x]  |

### Release 1.4.9 tag – 2026-07-27

| #   | Failas                                         | Laukas           | Buvo                         | Turi būti                          | Done |
| --- | ---------------------------------------------- | ---------------- | ---------------------------- | ---------------------------------- | ---- |
| 1   | `package.json` / CHANGELOG                     | release truth    | 1.4.8 + Unreleased           | **1.4.9** + empty Unreleased       | [x]  |
| 2   | ROADMAP / TODO / CODEBASE / DOCS_SYNC / README | version + tests  | 1.4.8 / 129/822              | **1.4.9** / **130/825**            | [x]  |
| 3   | `TEST_REPORT`                                  | pre-launch audit | CONDITIONAL ship process     | **GO tag v1.4.9** after preflight  | [x]  |
| 4   | Learning QA P0                                 | open blockers    | none (CQ-PORTAL…PC-4 closed) | none                               | [x]  |
| 5   | MON-2 handoff                                  | submodule pin    | v1.4.8                       | target **v1.4.9** (marketing repo) | [x]  |

## Deploy / env matrica (viena tiesa)

| Artefaktas                      | Env / komanda                                                                                  | Moduliai           | Base path      |
| ------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------ | -------------- |
| **GitHub Pages preview**        | `VITE_MVP_MODE=1` (deploy.yml)                                                                 | M1–6               | `/inzinerija/` |
| **Production (Vercel)**         | `npm run build:production` / `VITE_MAX_BUILD_MODULE=9`                                         | M1–9               | `/anatomy/`    |
| **Corporate12 target**          | `npm run build:corporate12` / `VITE_MAX_BUILD_MODULE=12`                                       | M1–12              | `/anatomy/`    |
| **Corporate15 target**          | `npm run build:corporate15` / `VITE_MAX_BUILD_MODULE=15`                                       | M1–15              | `/anatomy/`    |
| **Authoring / full CI default** | be MVP cap; full `modules.json`                                                                | M1–18              | `/` (dev)      |
| **Prieiga (runtime)**           | magic link → `verified_access_tier`; **draudžiama** prod `VITE_MAX_ACCESSIBLE_MODULE=6\|9\|12` | tier 0/3/6/9/12/15 | —              |

CI (`test.yml`) stato MVP + M1–9 + corporate12 + corporate15; Pages shipina tik MVP. Nuo 2026-08-12 `test.yml` turi ir atskirą **`governance`** job'ą (`npm run audit:governance`: core-data drift, tools parity, TE strict + registry skaičių drift, slide titles, accent budget, footer numeriai); tas pats žingsnis yra deploy `quality-gates`. Preflight (`audit:release-preflight`) vis dar platesnis už CI (DS gate, journey, M4–15 EN, pilnas `test:run`).

### Docs Lean Pass DL-0…4 (Unreleased) – 2026-07-24

| #   | Failas                                        | Laukas            | Buvo                | Turi būti                            | Done |
| --- | --------------------------------------------- | ----------------- | ------------------- | ------------------------------------ | ---- |
| 1   | `DOCS_MAINTENANCE.md` §1c + TODO §1.0h        | kontraktas        | nėra                | open-only + LEAN ≤25 + archive ≠ SOT | [x]  |
| 2   | `TODO.md` / `ROADMAP.md`                      | §1 dydis          | ~372 / ~186 eil.    | open only + archive Done snapshot    | [x]  |
| 3   | `.cursorrules` / `AGENTS.md`                  | always-on         | visas ROADMAP+TODO  | open P0/P1 only                      | [x]  |
| 4   | `LEAN_INDEX` / `QUICK_REF`                    | core keliai       | ~35–40 + legacy SOT | ≤25; be ANALIZE/audit-as-SOT         | [x]  |
| 5   | Archive moves + stubs                         | frozen PLAN/AUDIT | `docs/development/` | `docs/archive/development/` + stub   | [x]  |
| 6   | `DIAGRAMU_M1_M9_AUDITAS` + skills + sot_index | inventory SOT     | privalomas load     | TE primary; AUDITAS = rubrika        | [x]  |
| 7   | Empty skills + INDEX/CHANGELOG                | QA/UJ/CR          | 0 B SKILL           | filled; meta sync                    | [x]  |

### Teaching Elements Registry TE-0…5 (Unreleased) – 2026-07-24

| #   | Failas                                    | Laukas           | Buvo                   | Turi būti                     | Done |
| --- | ----------------------------------------- | ---------------- | ---------------------- | ----------------------------- | ---- |
| 1   | `TEACHING_ELEMENTS_REGISTRY.md` + overlay | master SOT       | fragmentuoti satelitai | master + overlay + brandą 0–4 | [x]  |
| 2   | `audit:teaching-elements` / preflight     | drift gate       | nėra                   | `--strict` release-preflight  | [x]  |
| 3   | Feature Doc §1b / SCHEME / AGENTS         | registry entry   | tik satelitai          | master overlay prieš JSON     | [x]  |
| 4   | `DIAGRAMU_M7_M12_REGISTRY.md`             | UTF-8 + slide ID | mojibake; 70/71.2      | clean LT; live 73/89/92       | [x]  |
| 5   | DIAGRAM_KIT / LMS W5                      | dual-taxonomy    | etalon Shell           | superseded → lab hybrid       | [x]  |
| 6   | sot_index / LEAN / DOC indexes            | pointers         | be master              | teaching*elements*\* keys     | [x]  |
| 7   | LENTELIU §5 / SLIDE_UX baseline           | counts           | 17 tables / 262 slides | 21/19 tables / **283** slides | [x]  |

### Unreleased M4/M7 UX meta sync – 2026-07-25

| #   | Failas                                      | Laukas          | Buvo                | Turi būti                        | Done |
| --- | ------------------------------------------- | --------------- | ------------------- | -------------------------------- | ---- |
| 1   | `package.json` / CHANGELOG                  | release truth   | 1.4.7 + Unreleased  | **1.4.7** + Unreleased (no bump) | [x]  |
| 2   | ROADMAP / TODO / CODEBASE / DOCS_SYNC       | test count      | 111/720 ar 103/686  | **117/745**                      | [x]  |
| 3   | `DOCUMENTATION_INDEX`                       | release pointer | v1.4.6 + Unreleased | **v1.4.7 + Unreleased**          | [x]  |
| 4   | Feature surface (TE / GOLDEN / M4 maturity) | inventory       | pre-M4P / path map  | M4P + M7 71/90/67.8/97/200 + 2×4 | [x]  |
| 5   | Browser smoke M79 / MON                     | rankinė         | ⬜                  | Savininkas prieš release         | [ ]  |

### Pre-launch meta sync (Unreleased) – 2026-07-24

| #   | Failas                             | Laukas               | Buvo                                                  | Turi būti                | Done |
| --- | ---------------------------------- | -------------------- | ----------------------------------------------------- | ------------------------ | ---- |
| 1   | `package.json` / CHANGELOG         | release truth        | mixed 1.4.3–1.4.5                                     | **1.4.6** + Unreleased   | [x]  |
| 2   | ROADMAP / CODEBASE / LEAN / README | version + test count | 1.4.5 / 74/512                                        | 1.4.6 / **103/686**      | [x]  |
| 3   | DOCS_SYNC baseline                 | header               | 1.4.5 / 74/512                                        | 1.4.6 / 103/686          | [x]  |
| 4   | RELEASE_QA_RUN                     | automated snapshot   | 71–74 / 465–512                                       | 103/686 + preflight ✅   | [x]  |
| 5   | Registry / patches                 | Feature Doc Contract | `m9_workflow_step_prompts` missing; M13 patches stale | registry + STALE notes   | [x]  |
| 6   | Browser smoke M79 S1–S7 @375px     | rankinė              | ⬜                                                    | Savininkas prieš release | [ ]  |

### M10 10.26 lab W1.1 docs sync (Unreleased) – 2026-07-23

| #   | Failas                                                | Laukas         | Buvo                       | Turi būti                                                    | Done |
| --- | ----------------------------------------------------- | -------------- | -------------------------- | ------------------------------------------------------------ | ---- |
| 1   | `SCHEME_AGENT.md` §2.2c                               | UI checklist   | "risk matrix"              | risk strip (3 chips, no empty)                               | [x]  |
| 2   | `turinio_pletra` §3b1                                 | Simuliatorius  | plonas 3×4                 | W1.1 strip + lab CopyButton artefact; be JSON copyable siena | [x]  |
| 3   | `GOLDEN_STANDARD.md` §3.1c                            | Lab exception  | W1                         | W1.1 strip + artefact note                                   | [x]  |
| 4   | Indexes (DOCUMENTATION/LEAN/CODEBASE/eilės/sot_index) | 10.26 pointers | W1 / matrix                | W1.1 risk strip                                              | [x]  |
| 5   | `CONTENT_AGENT.md`                                    | 10.26 lab      | vague kopijuojama taisyklė | lab viduje, ne content-block Copy siena                      | [x]  |

### M10 10.26 docs/agents sync (Unreleased) – 2026-07-23

| #   | Failas                                     | Laukas                | Buvo                        | Turi būti                                        | Done |
| --- | ------------------------------------------ | --------------------- | --------------------------- | ------------------------------------------------ | ---- |
| 1   | `SCHEME_AGENT.md`                          | M10 inventory + §2.2c | be 10.26 / Shell assumption | Lab no Shell + interactive-control-lab checklist | [x]  |
| 2   | `GOLDEN_STANDARD.md` §3.1b                 | consumers / columns   | path-only 2–3               | 1\|2\|3 + M10HumanControlSimulatorBlock          | [x]  |
| 3   | scheme/content/data/ui-ux/coding lessons   | pitfall lines         | be 10.26                    | 10.26 pattern lessons                            | [x]  |
| 4   | `CODEBASE_WHAT_IS_DONE.md`                 | M10–12 row            | be 10.26 lab                | + human-control lab / interactive-control-lab    | [x]  |
| 5   | `LEAN_INDEX.md` / `DOCUMENTATION_INDEX.md` | M10 pointer / date    | 2026-07-16                  | 10.26 + SCHEME §2.2c                             | [x]  |
| 6   | `sot_index.json`                           | contentSOT            | be control-lab / registry   | m10_human_control + diagram registry pointers    | [x]  |
| 7   | `CHANGELOG.md`                             | Unreleased Changed    | feature Added only          | docs/agents sync note                            | [x]  |
| 8   | `DOCS_MAINTENANCE.md` + orchestrator skill | Feature Doc Contract  | —                           | checklist + DoD pointer                          | [x]  |

### M79 A–C residual (Unreleased) – 2026-07-16

| #   | Failas                                      | Laukas                      | Buvo                  | Turi būti                    | Done |
| --- | ------------------------------------------- | --------------------------- | --------------------- | ---------------------------- | ---- |
| 1   | `CHANGELOG.md`                              | Unreleased W4–W5 / M79-50   | W3 tik                | M79-44/45/50 įrašai          | [x]  |
| 2   | `docs/development/07_08_09_backlog.md`      | §4.6 #4–5, §6, §12–§13      | open / be A–C         | ✅ + M79-44/45/50 + §13 DoD  | [x]  |
| 3   | `docs/development/M79_PATCH_REGISTRY.md`    | `patch-m79-plain-w4-w5.mjs` | be skripto            | Registruotas + §13 nuoroda   | [x]  |
| 4   | `docs/development/TEST_REPORT.md`           | M79-50 S1–S7                | —                     | Kodo ✅ / browser ⬜         | [x]  |
| 5   | `docs/turinio_pletra_moduliai_7_8_9.md`     | sk. 66.9 pastaba            | tik spinoff           | W4/W5 + M79-44 pastaba       | [x]  |
| 6   | `docs/DOCUMENTATION_QUICK_REF.md`           | M7–M9 operacinis SOT        | §12 tik               | §12–§13 + TEST_REPORT M79-50 | [x]  |
| 7   | `docs/development/CODEBASE_WHAT_IS_DONE.md` | M7–9 / testai               | P2 2026-07-15, 72/482 | A–C 2026-07-16, 74/512       | [x]  |
| 8   | `docs/LEAN_INDEX.md` / `ROADMAP.md`         | testų metrika               | 72/482                | 74/512 HEAD                  | [x]  |
| 9   | Browser smoke                               | S1–S7 @375px                | ⬜                    | Savininkas prieš release     | [ ]  |

### Release 1.4.5 tag – 2026-07-15

| #   | Failas                                      | Laukas                  | Buvo          | Turi būti                        | Done |
| --- | ------------------------------------------- | ----------------------- | ------------- | -------------------------------- | ---- |
| 1   | `package.json`                              | version                 | 1.4.4         | 1.4.5                            | [x]  |
| 2   | `CHANGELOG.md`                              | [1.4.5] blokas          | [Unreleased]  | Gate fixes + sprinto turinys     | [x]  |
| 3   | `docs/development/CODEBASE_WHAT_IS_DONE.md` | release data            | 1.4.4         | 1.4.5, preflight green           | [x]  |
| 4   | `ROADMAP.md`                                | App release             | 1.4.4         | 1.4.5                            | [x]  |
| 5   | `docs/development/TEST_REPORT.md`           | flaky quiz + tag smoke  | `nauja`       | `išspręsta` + 1.4.5 smoke įrašas | [x]  |
| 6   | `src/data/modules-m1-m6.json`               | core profilis           | stale         | `generate:core-data` sync        | [x]  |
| 7   | `src/data/modules-m1-m9.json`               | corporate profilis      | stale         | `generate:core-data` sync        | [x]  |
| 8   | Release vartai                              | audit:release-preflight | FAIL (tokens) | exit 0, 482/482                  | [x]  |

### Docs maintenance catch-up – 2026-07-15

| #   | Failas                                      | Laukas                               | Buvo                | Turi būti                                            | Done |
| --- | ------------------------------------------- | ------------------------------------ | ------------------- | ---------------------------------------------------- | ---- |
| 1   | `docs/development/DOCS_MAINTENANCE.md`      | naujas governance doc                | —                   | Sluoksniai, dual SOT, release vartas                 | [x]  |
| 2   | `docs/development/M79_PATCH_REGISTRY.md`    | patch registry                       | —                   | M79 skriptai + EN merge taisyklė                     | [x]  |
| 3   | `docs/development/CODEBASE_WHAT_IS_DONE.md` | testai / data                        | 71/465, 2026-07-09  | 72/482, 2026-07-15, M7–M9 P2                         | [x]  |
| 4   | `ROADMAP.md`                                | testų metrika                        | 71/465              | 72/482 HEAD                                          | [x]  |
| 5   | `CHANGELOG.md`                              | santrauka §Kas įgyvendinta           | 71/476              | 72/482                                               | [x]  |
| 6   | `docs/LEAN_INDEX.md`                        | testai / docs maintenance            | 71/465, 2026-07-14  | 72/482, DOCS_MAINTENANCE, M79 registry               | [x]  |
| 7   | `docs/DOCUMENTATION_QUICK_REF.md`           | data / M79 / M4 portal               | 2026-07-14          | 2026-07-15, M79_PATCH_REGISTRY, portal retrospective | [x]  |
| 8   | `docs/DOCUMENTATION_INDEX.md`               | atnaujinimo data                     | 2026-07-14          | 2026-07-15 + DOCS_MAINTENANCE                        | [x]  |
| 9   | `docs/development/RELEASE_QA_RUN.md`        | preflight eilutė                     | 71/465              | 72/482 (2026-07-15)                                  | [x]  |
| 10  | `docs/development/07_08_09_backlog.md`      | §12 P2 DoD, §4.6 resolved            | diagnozė 2026-07-14 | honest state 2026-07-15                              | [x]  |
| 11  | `context-engineering/sot_index.json`        | m79_patch_registry, docs_maintenance | —                   | Nauji registry įrašai                                | [x]  |
| 12  | `docs/development/dod_01.md`                | §2 dual SOT išimtis                  | tik turinio_pletra  | UX polish → operacinis SOT                           | [x]  |
| 13  | `.cursor/skills/qa-agent/SKILL.md`          | context loading                      | be DOCS_MAINTENANCE | Pirmas žingsnis release sync                         | [x]  |

### P2 artefaktų sync – 2026-07-09

| #   | Failas                                                                                             | Laukas                             | Buvo                                | Turi būti                                                              | Done |
| --- | -------------------------------------------------------------------------------------------------- | ---------------------------------- | ----------------------------------- | ---------------------------------------------------------------------- | ---- |
| 1   | `README.md`                                                                                        | versija / funkcijos                | 1.4.2, tier 1–3, PDF iki M7–9       | 1.4.3 + Unreleased, tier 1–5, PDF M1/M4/M5/M6/M7–9/M10–12/M13–15       | [x]  |
| 2   | `docs/development/CODEBASE_WHAT_IS_DONE.md`                                                        | release / testai / artefaktai      | 2026-07-06, 60/403                  | 2026-07-09, 71/465, tier 4/5 + m1012/m1315                             | [x]  |
| 3   | `docs/DOCUMENTATION_QUICK_REF.md`                                                                  | vartai / data SOT                  | be `audit:m1315` artefaktų SOT      | `audit:m1012`, `audit:m1315`, completion/certificate/handout SOT       | [x]  |
| 4   | `docs/LEAN_INDEX.md`                                                                               | codebase summary / PDF eilutė      | 1.4.2, 60/403, PDF iki M7–9         | 1.4.3 + Unreleased, 71/465, PDF iki M13–15                             | [x]  |
| 5   | `CHANGELOG.md`                                                                                     | viršutinė santrauka / Unreleased   | tier 3, 60/410                      | tier 1–5, 71/465, docs sync įrašas                                     | [x]  |
| 6   | `DATA_AGENT_DUOMENYS_ATNAUJINIMAS.md`                                                              | duomenų failų apžvalga / trigeriai | nėra completion/certificate/handout | artefaktų registry, tier 1–5 copy, m1012/m1315 handout taisyklės       | [x]  |
| 7   | `context-engineering/sot_index.json`                                                               | dataSOT                            | tik modules/tools/glossary/M1012 EN | completionArtifacts, certificateContent, m1012/m1315 + M1315 EN        | [x]  |
| 8   | `GOLD_LEGACY_STANDARD.md`                                                                          | istorinis techninis inventorius    | certificate tier1–3, handout iki M6 | P2 artefaktų pastaba, tier1–5, completion/m1012/m1315 loaderiai        | [x]  |
| 9   | `PDF_DOWNLOAD_TESTING.md`                                                                          | PDF testavimo gidas                | M1/M5/M6/M7–9                       | M1/M4/M5/M6/M7–9/M10–12/M13–15 + drift guards                          | [x]  |
| 10  | `PDF_MAKETO_GAIRES.md`                                                                             | atmintinių serija                  | M1/M4/M5/M6/M7–9                    | M1/M4/M5/M6/M7–9/M10–12/M13–15                                         | [x]  |
| 11  | `RELEASE_QA_CHECKLIST.md`                                                                          | sertifikatų smoke                  | tier 1 pavyzdys                     | tier 4 M12 ir tier 5 M15 smoke + serial stabilumas                     | [x]  |
| 12  | `.cursor/skills/{data,qa,coding,content-agent}/SKILL.md`                                           | agentų pamokos                     | M79 / tier 3 pattern                | registry-driven M1012/M1315, tier 4/5, `audit:m1315`, handout JSON SOT | [x]  |
| 13  | `ROADMAP.md`, `TODO.md`, `DOCUMENTATION_INDEX.md`, `RELEASE_QA_RUN.md`, `AUDIT_2026-06_SUMMARY.md` | ops closure                        | 1.4.2 / 403 baseline                | 1.4.3 + Unreleased P2, 71/465, docs sync closed                        | [x]  |

### 1.4.2 + Unreleased docs sync – 2026-07-06

| #   | Failas                                           | Laukas                             | Buvo                                   | Turi būti                                                     | Done |
| --- | ------------------------------------------------ | ---------------------------------- | -------------------------------------- | ------------------------------------------------------------- | ---- |
| 1   | `README.md`                                      | versija                            | 1.4.1                                  | 1.4.2 + Unreleased nuoroda                                    | [x]  |
| 2   | `docs/development/CODEBASE_WHAT_IS_DONE.md`      | release / testai / backlog         | 1.4.1, 53/323, M4 footer backlog       | 1.4.2, 60/403, MON/PDF/backlog tik aktualus                   | [x]  |
| 3   | `docs/DOCUMENTATION_QUICK_REF.md`                | atnaujinimo data / vartai          | 2026-06-30, be m1012/preflight         | 2026-07-06, `audit:m1012`, `audit:release-preflight`          | [x]  |
| 4   | `docs/LEAN_INDEX.md`                             | codebase summary eilutė            | 1.4.1                                  | 1.4.2 + 60/403                                                | [x]  |
| 5   | `docs/DOCUMENTATION_INDEX.md`                    | release / aktyvūs dokumentai       | 1.4.1                                  | 1.4.2 + docs sync + M7-M12 registry                           | [x]  |
| 6   | `docs/development/VERSION_ANALIZE.md`            | versija                            | 1.4.1                                  | 1.4.2; kitas release 1.4.3 arba 1.5.0                         | [x]  |
| 7   | `docs/development/AUDIT_2026-06_SUMMARY.md`      | testų metrika                      | ~38 testų failų                        | istorinė pastaba + 60/403 dabartinis baseline                 | [x]  |
| 8   | `docs/deployment/MARKETING_HANDOFF_CHECKLIST.md` | submodule pin                      | v1.4.1 paskutinis patch                | v1.4.2 + Unreleased HEAD SHA pastaba                          | [x]  |
| 9   | `ROADMAP.md`                                     | testų metrika / M10-12 gate        | 57/367                                 | 60/403 po Unreleased; `audit:m1012` prieš M10-12 release      | [x]  |
| 10  | `CHANGELOG.md`                                   | santrauka                          | 57/367                                 | 60/403 + docs sync įrašas                                     | [x]  |
| 11  | `docs/development/DIAGRAMU_M7_M12_REGISTRY.md`   | M8/M10 statusai                    | keli pasenę „Reikia“ / „Registry only“ | deep-link/shell/test statusai pagal Unreleased                | [x]  |
| 11b | `docs/development/DIAGRAMU_M13_M15_REGISTRY.md`  | M13–15 image keys / shell          | trūko / incomplete                     | 8 keys: pipeline, consistency, postprod, shell AEC/prompt/M15 | [x]  |
| 12  | `docs/development/GOLD_LEGACY_STANDARD.md`       | release header / AgentOrchestrator | 1.4.1 / aktyvus inventorius            | 1.4.2 / deprecated + M12 multi-agent eilutė                   | [x]  |

## Kartojimo procedūra

1. Paleisti `npm run test:run` ir užrašyti faktinį testų failų / testų skaičių.
2. Patikrinti `package.json` `version` ir naujausią `CHANGELOG.md` release antraštę.
3. Jei yra didelis Unreleased sprintas, atskirti istorinį release skaičių nuo dabartinio HEAD skaičiaus.
4. Atnaujinti agentų įėjimo dokumentus pirmiausia: `README.md`, `DOCUMENTATION_QUICK_REF.md`, `LEAN_INDEX.md`, `DOCUMENTATION_INDEX.md`, `CODEBASE_WHAT_IS_DONE.md`.
5. Tik tada atnaujinti ops ir registry dokumentus: `VERSION_ANALIZE.md`, `AUDIT_2026-06_SUMMARY.md`, `MARKETING_HANDOFF_CHECKLIST.md`, `ROADMAP.md`, `DIAGRAMU_M7_M12_REGISTRY.md`, `DIAGRAMU_M13_M15_REGISTRY.md`, `GOLD_LEGACY_STANDARD.md`.

## Sąmoningai nekeisti

| Tema                                                      | Kodėl                                                                                                    |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `CHANGELOG.md` `[1.4.2]` Gate eilutė su 367 testais       | Tai istorinė release 1.4.2 būsena. Dabartinis HEAD skaičius fiksuojamas santraukoje ir Unreleased įraše. |
| Archyvinės analizės `docs/archive/development/analysis/*` | Vienkartinės dienos auditai – ne runtime SOT; žr. `docs/archive/README.md`.                              |
| `package-lock.json` versija                               | Tai npm artefaktas; keisti tik per versijavimo / install žingsnį, ne docs sync rankiniu edit'u.          |
