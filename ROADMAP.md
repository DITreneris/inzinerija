# Promptų anatomija – Plėtros roadmap

> **Atnaujinta:** 2026-08-19 | Roadmap **v4.38** (live pin **v1.6.3** verified GitHub · M13-WALK · Wave F/G/H · reflections · hygiene **39**)  
> **App live:** **1.6.3** (pin) · **Training release:** **1.6.3**. Unreleased HEAD ≠ re-pin. **Ne** 1.6.4.  
> **Done santrauka:** [`CODEBASE_WHAT_IS_DONE.md`](docs/development/CODEBASE_WHAT_IS_DONE.md) · [`CHANGELOG.md`](CHANGELOG.md) · archive [`TODO_DONE_SPRINTS_2026-08.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-08.md)  
> **Open darbai:** [`TODO.md`](TODO.md) T01 I5 parked · Should 2-as pass · §1.4 MON · §1.5 D3 · §1.7 TOOL-5 · §1.6 B2. Open P0/P1 learning = nėra.

**Nuosavybė:** šis repo = turinio / pedagogikos / UI kokybės OS. Marketingas (env, PostHog, CRO) → kitas repo.  
**Principas:** M1–9 production; **M10–12 corporate + content freeze**; **M13–15 corporate + learner plain**; M16–18 authoring + TE + plain ✅ · TE Could closed.  
**Production:** Release + live pin **1.6.3** (`7e4c3bf`, [PR #96](https://github.com/DITreneris/promptanatomy/pull/96)). Unreleased HEAD ≠ automatinis re-pin. **12 live per Supabase**. Viešas Stripe = M1–6. M7–18 = corporate grant iki **2027-01**. `build:corporate12` = gyvas kanonas (M1–12); `build:production` = M1–9 **profilis**, ne live. `v1.4.9` = istorinis learning freeze, ne current pin.

---

## 1. Būsena (trumpai)

M1–6 pilnai · M7–9 production tier 9 · M10–15 corporate cuts ✅ · M10–12 turinio deep audit **FREEZE** · katalogas next-step + Home retrieval secondary ✅ · M16–18 authoring/TE/plain ✅. Detaliau → `CODEBASE_WHAT_IS_DONE.md`.

### Open gaps (production ladder)

| Horizon | Scope                          | Status                                                                                                                          | Prioritetas             |
| ------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| **A**   | M1–9 corporate micro polish    | **done**                                                                                                                        | —                       |
| **B**   | M10–12 corporate production    | **done** + testerio Must T01–T08 + T09 ✅ (I5 parked; hygiene **39**)                                                           | TODO §1.3               |
| **C**   | M13–15 corporate production    | **done** · learner plain ✅ · M14/M15 walk ✅ · craft ✅ · **M13-WALK SYS-A…H done** · Wave F/G/H kalba ✅ · Could C-C\* parked | archive / §1.3b / §1.3c |
| **M79** | M7–9 scheme / skaitomumo ROI   | **done**                                                                                                                        | archive                 |
| **E**   | Transfer & Retention (UJ-MUST) | **done**                                                                                                                        | archive                 |
| **D**   | M16–18 Kodo inžinerija         | authoring+TE+ritmas+plain ✅ · **M17 analog ✅** · D3 future                                                                    | Deferred §1.5           |
| **UX**  | Katalogas / Home kelionė       | **done** (CATALOG-HOME 2026-08-12)                                                                                              | —                       |
| **MON** | marketing (env, PostHog, CRO)  | out of scope                                                                                                                    | TODO §1.4               |

---

## 2. Production ladder (forward)

### Done context (ne open)

- Corporate12/15 cuts ✅ · M1012-DEEP + content audit freeze (hygiene **40**) ✅ · M13–18 plain ✅ · M14 Path Test items ✅ · SCHEME-CENTRAL W1 ✅ · CATALOG-HOME ✅ · M10 testerio Must T01–T08 + T09 ✅.
- Archive: [`TODO_DONE_SPRINTS_2026-08.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-08.md).

### Horizon D – M16–18 Kodo inžinerija

- **Status:** Wave D2 + TE + plain ✅. **Could** won’t-now. **Corporate18 = Wave D3** future only.
- **Open TE:** nėra.

### Nedaryti dabar

M19–21; Wave D3 be pricing call; M10–12 turinio P3 / hygiene→0; SCHEME W2 be intake; formalus Density DoD/CI; marketing MON kaip learning P0; Vite 8 / React 19 / Tailwind 4.

---

## 3. Pasiruošimas deploy

### 3.1 Privaloma

| #   | Užduotis                                                                            | Šaltinis      |
| --- | ----------------------------------------------------------------------------------- | ------------- |
| 1   | RELEASE_QA_CHECKLIST §1–5, 5a–5c, §6–7 (+ §6a jei corporate12; §6b jei corporate15) | QA            |
| 2   | `validate:schema`, lint, `test:run`, build (+ MVP / corporate12 / corporate15)      | CI            |
| 3   | `audit:governance` (CI blocking) + `audit:release-preflight`                        | CI / QA       |
| 4   | Lietuviškos raidės (skaidrė + PDF)                                                  | QA            |
| 5   | EN locale smoke                                                                     | QA            |
| 6   | Deploy kelias: Pages vs Vercel/monorepo                                             | DEPLOYMENT.md |

### 3.2 Rekomenduojama

PDF M5/M6 rankinė · broken links · mobile 375px · docs index nuorodos.

---

## 4. Deploy

| Scenarijus                   | Env                                              | Rezultatas          |
| ---------------------------- | ------------------------------------------------ | ------------------- |
| GitHub Pages preview         | `VITE_MVP_MODE=1`                                | M1–6 `/inzinerija/` |
| M1–9 profilis (fallback)     | `build:production` / `VITE_MAX_BUILD_MODULE=9`   | M1–9                |
| **Vercel production (now)**  | `VITE_MAX_BUILD_MODULE=12` (`build:corporate12`) | M1–12 `/anatomy/`   |
| **Corporate15 (repo-ready)** | `VITE_MAX_BUILD_MODULE=15` (`build:corporate15`) | M1–15               |
| Authoring / local full       | default `modules.json`                           | M1–18               |
| Magic link (**tier 12**)     | **live** per Supabase; pin **v1.6.3**            |                     |
| Magic link (**tier 15**)     | repo ✅; corporate grant / later cutover         |                     |

CI: schema, lint, test, **governance**, MVP + M1–9 + corporate12 + corporate15 build.

---

## 5. Marketing handoff (out of scope šiame repo)

| Tema                         | Kur                                                                                |
| ---------------------------- | ---------------------------------------------------------------------------------- |
| MON vykdymo planas           | [`MON_P0_EXECUTION_PLAN.md`](docs/deployment/MON_P0_EXECUTION_PLAN.md)             |
| PostHog                      | [`MON-4_POSTHOG_DEPLOY.md`](docs/deployment/MON-4_POSTHOG_DEPLOY.md)               |
| Deploy + corporate12/15      | [`DEPLOYMENT.md`](docs/deployment/DEPLOYMENT.md)                                   |
| Tier 12/15 cutover checklist | [`MARKETING_HANDOFF_CHECKLIST.md`](docs/deployment/MARKETING_HANDOFF_CHECKLIST.md) |
| Ticketų statusai             | [`TODO.md`](TODO.md) §1.4                                                          |

**Pin:** GitHub `promptanatomy` submodule = **v1.6.3** / `7e4c3bf` ([PR #96](https://github.com/DITreneris/promptanatomy/pull/96)). **12 live per Supabase.** Unreleased ≠ automatinis re-pin.

---

## 6. Nuorodos

| Kas                   | Kur                                                                                                                                                        |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Open TODO             | `TODO.md` §1                                                                                                                                               |
| Done / metrikos       | `CODEBASE_WHAT_IS_DONE.md`, `CHANGELOG.md`                                                                                                                 |
| Agent start           | `DOCUMENTATION_QUICK_REF.md`                                                                                                                               |
| Docs lean             | `DOCS_MAINTENANCE.md` §1c                                                                                                                                  |
| Release QA            | `RELEASE_QA_CHECKLIST.md`, `RELEASE_QA_RUN.md`                                                                                                             |
| M10–12 SOT            | `turinio_pletra_moduliai_10_11_12.md`                                                                                                                      |
| M10–12 content freeze | [`M10_M12_CONTENT_DEEP_AUDIT_2026-08.md`](docs/development/M10_M12_CONTENT_DEEP_AUDIT_2026-08.md)                                                          |
| M13 owner walk        | [`M13_OWNER_WALK_INTAKE_2026-08.md`](docs/development/intake/M13_OWNER_WALK_INTAKE_2026-08.md) · SYS-A…H **done** · [`TODO.md`](TODO.md) **§1.3c**         |
| M13–15 learner walk   | [`M13_M15_LEARNER_WALK_INTAKE.md`](docs/development/intake/M13_M15_LEARNER_WALK_INTAKE.md)                                                                 |
| M13–15 craft MoSCoW   | [`M13_M15_CRAFT_MOSCOW_2026-08.md`](docs/development/intake/M13_M15_CRAFT_MOSCOW_2026-08.md) · C-M1–M3 + C-S1–S4 ✅ · Could [`TODO.md`](TODO.md) **§1.3b** |
| M16–18 SOT (D)        | `turinio_pletra_moduliai_16_17_18.md`                                                                                                                      |
| Marketing handoff     | `DEPLOYMENT.md`, `MON_P0_EXECUTION_PLAN.md`                                                                                                                |
| Done TODO snapshot    | [`TODO_DONE_SPRINTS_2026-08.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-08.md)                                                                    |

**Sinchronas:** open gaps ↔ TODO §1 · **2026-08-19** GitHub verified live pin **v1.6.3** (PR #96) · M13-WALK + Wave F/G/H + reflections · kiss + gate-green + corp15 sync ✅ · 12 live per Supabase · M7–18 corporate iki 2027-01 · hygiene liekana **39** (ROADMAP **v4.38**).
