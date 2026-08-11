# Promptų anatomija – Plėtros roadmap

> **Atnaujinta:** 2026-08-11 | Roadmap **v4.21** (M1012-DEEP ✅ · M16–18 learner plain ✅ · M13 plain + M13P-TRIM ✅ · Horizon D TE Could closed)  
> **App:** 1.5.0 · **Open fokusas:** marketing cutover (MON out of scope) · Wave D3 corporate18 Deferred.  
> **Done santrauka:** [`CODEBASE_WHAT_IS_DONE.md`](docs/development/CODEBASE_WHAT_IS_DONE.md) · [`CHANGELOG.md`](CHANGELOG.md) · archive [`TODO_DONE_SPRINTS_2026-07-31.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-07-31.md) · [`2026-07-28`](docs/archive/development/TODO_DONE_SPRINTS_2026-07-28.md)  
> **Open darbai:** [`TODO.md`](TODO.md) §1.4 MON · §1.5 Deferred (D3 + M19–21) · §1.6 Caveats. M1618 handout CAV-C1 ✅. Authoring F1–F8 + TE Must/Should/ritmas + C2 done; Could C1 won’t-now; **M16–18 learner plain ✅**; **M13 TE/corporate ✅ · learner plain ✅ · M13P-TRIM ✅**.

**Nuosavybė:** šis repo = turinio / pedagogikos / UI kokybės OS. Marketingas (env, PostHog, CRO) → kitas repo.  
**Principas:** M1–9 production ([promptanatomy](https://github.com/DITreneris/promptanatomy)); **M10–12 corporate cut repo-ready** (`build:corporate12`); **M13–15 corporate cut repo-ready** (`build:corporate15`); M16–18 authoring + TE Must/Should + ritmas done · **M16–18 learner plain / EN body ✅** · **M13 learner plain ✅ + M13P-TRIM ✅** (§1.2j) · TE Could C1–C5 closed (won’t-now / C2 done).  
**Production:** RC **1.6.0** (+ corporate15 / tier 15 repo-ready); learning pin **v1.4.9** until marketing cutover; automated **161/982**; default `build:production` = M1–9.

---

## 1. Būsena (trumpai)

M1–6 pilnai · M7–9 production tier 9 · M10–15 authoring brandumas ✅ · M10–12 corporate production cut ✅ · M13–15 corporate production cut ✅ · LT/EN · sertifikatai/PDF/handout · DiagramKit / TE registry · Path Test Shell. Detaliau → `CODEBASE_WHAT_IS_DONE.md`.

### Open gaps (production ladder)

| Horizon | Scope                          | Status                                                                                                                                                                                                            | Prioritetas  |
| ------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| **A**   | M1–9 corporate micro polish    | **done** (triage 2026-07-28)                                                                                                                                                                                      | —            |
| **B**   | M10–12 corporate production    | **done** (repo exit + B-V lock + **M1012-DEEP** audit remediation 2026-08-11)                                                                                                                                     | —            |
| **C**   | M13–15 corporate production    | **done** (repo exit 2026-07-30) · **learner plain ✅** · **M13P-TRIM ✅** ([`M13_MATURITY_PLAN.md`](docs/development/M13_MATURITY_PLAN.md) / [`M13_PROMPT_MATURITY.md`](docs/development/M13_PROMPT_MATURITY.md)) | —            |
| **M79** | M7–9 scheme / skaitomumo ROI   | **done** (Sprint 1–3 2026-07-31)                                                                                                                                                                                  | TODO §1.2d   |
| **E**   | Transfer & Retention (UJ-MUST) | **done** (S1–S5 2026-07-31)                                                                                                                                                                                       | TODO §1.2e   |
| **D**   | M16–18 Kodo inžinerija         | authoring+TE+ritmas+C2 ✅ · **learner plain M16–18 ✅** · D3 future                                                                                                                                               | TODO §1.2i–l |
| **MON** | marketing (env, PostHog, CRO)  | out of scope                                                                                                                                                                                                      | TODO §1.4    |

> Horizon A+B closeout → [`TODO_DONE_SPRINTS_2026-07-28.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-07-28.md). Horizon C → intake [`M13_M15_CORPORATE_PRODUCTION_INTAKE.md`](docs/development/intake/M13_M15_CORPORATE_PRODUCTION_INTAKE.md).  
> Mid-path handout / skills-QR → **won’t-now** ([`HANDOUT_MATURITY.md`](docs/development/HANDOUT_MATURITY.md) Horizon A).

---

## 2. Production ladder (forward)

### Done context (ne open)

- M7–9 learning QA (CQ-M79 / Portal) ✅ · M10–12 authoring (M1012-1/2) ✅ · **M10–12 corporate production (M1012-P0…P4)** ✅ · M13–15 authoring (M1315-F…DIAG) ✅ · M13 gen→I2V ✅ · **M13–15 corporate production (M1315-C0…C4)** ✅ · Practice closer PC-0…4 ✅.
- Archive: [`TODO_DONE_SPRINTS_2026-07-28.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-07-28.md). Metrika: `CODEBASE_WHAT_IS_DONE.md`.

### Horizon A – Corporate micro (M1–9) (DONE)

- **Entry:** v1.4.9 learning GO.
- **Delivered (2026-07-28 triage):**
  1. **CORP-M1 done** — `07_08_09_backlog` formal close (§15; open residual = none).
  2. **CORP-M2 won’t-now** — mid-path handout / skills-QR deferred; keep earn-on-complete (`HANDOUT_MATURITY`).
  3. **CORP-M3 deferred-with-date** — role-first / org memory / quiz tonas visur → revisit po MON cutover arba Horizon D seed.
  4. Day 0: DS 0.3.2 soft close + tokens baseline **250**.
- **Exit:** triaged ✅; nėra naujų learning P0/P2 šiame repo.
- **Detail:** archive [`TODO_DONE_SPRINTS_2026-07-28.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-07-28.md).

### Horizon B – M10–12 corporate production (DONE)

- **Entry:** authoring brandumas ✅ (M1012-1/2).
- **Intake:** [`M10_M12_CORPORATE_PRODUCTION_INTAKE.md`](docs/development/intake/M10_M12_CORPORATE_PRODUCTION_INTAKE.md).
- **Delivered (2026-07-28):**
  1. Build: `VITE_MAX_BUILD_MODULE=12` + `build:corporate12` + `*-m1-m12.json`.
  2. Access: magic-link tier **12** (`MAGIC_LINK_TIERS` + `api/verify-access` + testai).
  3. QA: `audit:m1012` + RELEASE_QA §6a + CI corporate12 step.
  4. Docs: `DEPLOYMENT.md` + marketing handoff note + CHANGELOG.
- **Exit:** šiame repo žalias corporate12 build + gate testai ✅; marketing verify-access/env cutover = handoff (TODO §1.4).
- **B-V verify/lock (2026-07-30):** preflight + `build:corporate12` + tier-12 tests + `audit:m1012` re-locked; handoff docs match code.
- **M1012-DEEP remediation (2026-08-11):** Batch A–F applied; content gaps (MCP/connectors, injection, cost/model, JSON handoff, AI Act), M11 coverage, tools catalog, `m12_three_labs`, picker and renderer debt closed; `audit:release-preflight` green.
- **SOT:** `turinio_pletra_moduliai_10_11_12.md`.

### Horizon C – M13–15 corporate production (DONE)

- **Entry:** B repo exit ✅ **ir** authoring journey/UX gaps ✅ (`M1315-J*` — [`M13_M15_JOURNEY_UX_INTAKE_2026-07.md`](docs/development/intake/M13_M15_JOURNEY_UX_INTAKE_2026-07.md) I8 readiness).
- **Intake:** [`M13_M15_CORPORATE_PRODUCTION_INTAKE.md`](docs/development/intake/M13_M15_CORPORATE_PRODUCTION_INTAKE.md).
- **Delivered (2026-07-30):**
  1. Build: `VITE_MAX_BUILD_MODULE=15` + `build:corporate15` + `*-m1-m15.json`; Vaizdo/I2V live (ne stub).
  2. Access: magic-link tier **15** (`MAGIC_LINK_TIERS` + `api/verify-access`); `ACCESS_TIERS` +15 @ €249 provisional.
  3. QA: `audit:m1315` + RELEASE_QA §6b + CI corporate15 step.
  4. Docs: `DEPLOYMENT.md` + marketing handoff note + CHANGELOG + ROADMAP exit.
- **Exit:** šiame repo žalias corporate15 build + gate testai ✅; marketing env/pin cutover = handoff (TODO §1.4).
- **SOT:** `turinio_pletra_moduliai_13_14_15.md`.

### Horizon D – M16–18 Kodo inžinerija (development)

- **Status:** **Wave D2 authoring done** + **TE Must + Should S1–S4 done** + **ritmas `M1618-R1`…`R6` done** + **`TE-M1618-C2` done** (2026-08-01) — M16=22 · M17 Path Test · M18=28. **Learner plain M16–18 ✅** 2026-08-04 — [`M16_MATURITY_PLAN.md`](docs/development/M16_MATURITY_PLAN.md) · [`M17_MATURITY_PLAN.md`](docs/development/M17_MATURITY_PLAN.md) · [`M18_MATURITY_PLAN.md`](docs/development/M18_MATURITY_PLAN.md) (`TODO` §1.2i–l; M18 dens C deferred). **Could:** C1 won’t-now (2026-08-03); C3–C5 won’t-now. Backlog [`16_17_18_backlog.md`](docs/development/16_17_18_backlog.md); eilė [`MODULIO_16_SKAIDRIU_EILES.md`](docs/MODULIO_16_SKAIDRIU_EILES.md); registry [`DIAGRAMU_M16_M18_REGISTRY.md`](docs/development/DIAGRAMU_M16_M18_REGISTRY.md).
- **Entry:** product call „kitas kelias = Kodo inžinerija“ + capacity ✅. CQ-M79 / Portal ✅.
- **Delivered (D0–D2 + TE Must + Should + ritmas + C2 + M16–18 plain):** eilės M16–18 · LT/EN overlay · Cursor tools · Path Test M17 · cyan track · DEV ceiling 18 · lentelės/embeds · 5+1 signature schemos · direction picker lab · launch gates · dens soft pass · TE overlay · M18 own-work · §3.8 breath · 18.17 `.env` contrast · **M16–18 learner plain + EN body gate (modules 16–18)**. Corporate18 = Wave D3 future only.
- **Exit D2 (authoring):** ✅. Core profiliai be M16+ spill. **Exit learner plain:** ✅ M16 (C merge) · M17 shell/bank · M18 bridges+EN (optional dens C deferred).
- **Open TE (Could):** nėra — C1 won’t-now 2026-08-03 (TODO §1.2g).
- **M19–21** DI politikos inžinerija — už horizonto (nėra SOT).

### Nedaryti dabar

M19–21; M10+ premium SaaS diagram redesign; Wave D3 corporate18 be pricing call; backend rewrite; marketing MON kaip šio repo learning P0; **formalus Density DoD / CI** (gylis lieka; soft checklist tik). `M1315-DENS` soft pass **done** 2026-07-31.

---

## 3. Pasiruošimas deploy

### 3.1 Privaloma

| #   | Užduotis                                                                            | Šaltinis      |
| --- | ----------------------------------------------------------------------------------- | ------------- |
| 1   | RELEASE_QA_CHECKLIST §1–5, 5a–5c, §6–7 (+ §6a jei corporate12; §6b jei corporate15) | QA            |
| 2   | `validate:schema`, lint, `test:run`, build (+ MVP / corporate12 / corporate15)      | CI            |
| 3   | Lietuviškos raidės (skaidrė + PDF)                                                  | QA            |
| 4   | EN locale smoke                                                                     | QA            |
| 5   | Deploy kelias: Pages vs Vercel/monorepo                                             | DEPLOYMENT.md |

### 3.2 Rekomenduojama

PDF M5/M6 rankinė · broken links · mobile 375px · docs index nuorodos.

---

## 4. Deploy

| Scenarijus               | Env                                              | Rezultatas                 |
| ------------------------ | ------------------------------------------------ | -------------------------- |
| GitHub Pages preview     | `VITE_MVP_MODE=1`                                | M1–6 `/inzinerija/`        |
| Vercel production (now)  | `build:production` / `VITE_MAX_BUILD_MODULE=9`   | M1–9 `/anatomy/`           |
| **Corporate12 (ready)**  | `VITE_MAX_BUILD_MODULE=12` (`build:corporate12`) | M1–12                      |
| **Corporate15 (ready)**  | `VITE_MAX_BUILD_MODULE=15` (`build:corporate15`) | M1–15                      |
| Authoring / local full   | default `modules.json`                           | M1–18                      |
| Magic link (now)         | tier 3/6/9                                       | `verified_access_tier`     |
| Magic link (**tier 12**) | tier 3/6/9/**12**                                | repo ✅; marketing cutover |
| Magic link (**tier 15**) | tier 3/6/9/12/**15**                             | repo ✅; marketing cutover |

CI: push/PR → schema, lint, test, MVP + M1–9 + **corporate12** + **corporate15** build. Deploy checklist: CI žalias → deploy → smoke URL.

---

## 5. Marketing handoff (out of scope šiame repo)

Nuorodos marketing repo / env darbams (ne open learning P0 čia):

| Tema                         | Kur                                                                                |
| ---------------------------- | ---------------------------------------------------------------------------------- |
| MON vykdymo planas           | [`MON_P0_EXECUTION_PLAN.md`](docs/deployment/MON_P0_EXECUTION_PLAN.md)             |
| PostHog                      | [`MON-4_POSTHOG_DEPLOY.md`](docs/deployment/MON-4_POSTHOG_DEPLOY.md)               |
| Deploy + corporate12/15      | [`DEPLOYMENT.md`](docs/deployment/DEPLOYMENT.md)                                   |
| Tier 12/15 cutover checklist | [`MARKETING_HANDOFF_CHECKLIST.md`](docs/deployment/MARKETING_HANDOFF_CHECKLIST.md) |
| Ticketų statusai             | [`TODO.md`](TODO.md) §1.4                                                          |

---

## 6. Nuorodos

| Kas                | Kur                                                                                                                                                                      |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Open TODO          | `TODO.md` §1                                                                                                                                                             |
| Done / metrikos    | `CODEBASE_WHAT_IS_DONE.md`, `CHANGELOG.md`                                                                                                                               |
| Agent start        | `DOCUMENTATION_QUICK_REF.md`                                                                                                                                             |
| Docs lean          | `DOCS_MAINTENANCE.md` §1c                                                                                                                                                |
| Release QA         | `RELEASE_QA_CHECKLIST.md`, `RELEASE_QA_RUN.md`                                                                                                                           |
| M7–9 backlog (A)   | `07_08_09_backlog.md`                                                                                                                                                    |
| M10–12 SOT         | `turinio_pletra_moduliai_10_11_12.md`                                                                                                                                    |
| M10–12 corp intake | `docs/development/intake/M10_M12_CORPORATE_PRODUCTION_INTAKE.md`                                                                                                         |
| M13–15 corp intake | `docs/development/intake/M13_M15_CORPORATE_PRODUCTION_INTAKE.md`                                                                                                         |
| M16–18 SOT (D)     | `turinio_pletra_moduliai_16_17_18.md` §8                                                                                                                                 |
| M16–18 backlog (D) | [`16_17_18_backlog.md`](docs/development/16_17_18_backlog.md)                                                                                                            |
| Marketing handoff  | `DEPLOYMENT.md`, `MON_P0_EXECUTION_PLAN.md`                                                                                                                              |
| Done TODO snapshot | [`TODO_DONE_SPRINTS_2026-07-31.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-07-31.md) · [`2026-07-28`](docs/archive/development/TODO_DONE_SPRINTS_2026-07-28.md) |

**Sinchronas:** open gaps ↔ TODO §1 · **2026-07-31** M79/M1315 scheme ROI archive closeout ✅.
