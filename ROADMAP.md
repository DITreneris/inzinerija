# Promptų anatomija – Plėtros roadmap

> **Atnaujinta:** 2026-08-12 | Roadmap **v4.22** (Docs Lean · M1012 content freeze · CATALOG-HOME ✅ · Unreleased post-v1.6.1)  
> **App:** 1.6.1 (tag = corporate12 pin) · **Training HEAD:** Unreleased (katalogas + content audit + SCHEME-CENTRAL W1 + Home retrieval demote) — **ne** retag 1.6.1.  
> **Done santrauka:** [`CODEBASE_WHAT_IS_DONE.md`](docs/development/CODEBASE_WHAT_IS_DONE.md) · [`CHANGELOG.md`](CHANGELOG.md) · archive [`TODO_DONE_SPRINTS_2026-08.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-08.md)  
> **Open darbai:** [`TODO.md`](TODO.md) §1.4 MON · §1.5 Deferred (D3) · §1.7 TOOL-5 · §1.6 Caveats B1/B2. Learning P0/P1 **nėra**.

**Nuosavybė:** šis repo = turinio / pedagogikos / UI kokybės OS. Marketingas (env, PostHog, CRO) → kitas repo.  
**Principas:** M1–9 production; **M10–12 corporate + content freeze**; **M13–15 corporate + learner plain**; M16–18 authoring + TE + plain ✅ · TE Could closed.  
**Production:** RC **1.6.1** = corporate12 cutover pin (+ corporate15 repo-ready); learning pin **v1.4.9** until marketing cutover; default `build:production` = M1–9.

---

## 1. Būsena (trumpai)

M1–6 pilnai · M7–9 production tier 9 · M10–15 corporate cuts ✅ · M10–12 turinio deep audit **FREEZE** · katalogas next-step + Home retrieval secondary ✅ · M16–18 authoring/TE/plain ✅. Detaliau → `CODEBASE_WHAT_IS_DONE.md`.

### Open gaps (production ladder)

| Horizon | Scope                          | Status                                                                            | Prioritetas   |
| ------- | ------------------------------ | --------------------------------------------------------------------------------- | ------------- |
| **A**   | M1–9 corporate micro polish    | **done**                                                                          | —             |
| **B**   | M10–12 corporate production    | **done** (repo exit + B-V + **M1012-DEEP** + **content audit freeze** 2026-08-12) | —             |
| **C**   | M13–15 corporate production    | **done** · learner plain ✅ · M13P-TRIM ✅                                        | —             |
| **M79** | M7–9 scheme / skaitomumo ROI   | **done**                                                                          | archive       |
| **E**   | Transfer & Retention (UJ-MUST) | **done**                                                                          | archive       |
| **D**   | M16–18 Kodo inžinerija         | authoring+TE+ritmas+plain ✅ · D3 future                                          | Deferred §1.5 |
| **UX**  | Katalogas / Home kelionė       | **done** (CATALOG-HOME 2026-08-12)                                                | —             |
| **MON** | marketing (env, PostHog, CRO)  | out of scope                                                                      | TODO §1.4     |

---

## 2. Production ladder (forward)

### Done context (ne open)

- Corporate12/15 cuts ✅ · M1012-DEEP + content audit freeze ✅ · M13–18 plain ✅ · SCHEME-CENTRAL W1 (governance CI) ✅ · CATALOG-HOME ✅.
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

| Scenarijus               | Env                                              | Rezultatas          |
| ------------------------ | ------------------------------------------------ | ------------------- |
| GitHub Pages preview     | `VITE_MVP_MODE=1`                                | M1–6 `/inzinerija/` |
| Vercel production (now)  | `build:production` / `VITE_MAX_BUILD_MODULE=9`   | M1–9 `/anatomy/`    |
| **Corporate12 (ready)**  | `VITE_MAX_BUILD_MODULE=12` (`build:corporate12`) | M1–12               |
| **Corporate15 (ready)**  | `VITE_MAX_BUILD_MODULE=15` (`build:corporate15`) | M1–15               |
| Authoring / local full   | default `modules.json`                           | M1–18               |
| Magic link (**tier 12**) | repo ✅; marketing cutover pin **v1.6.1**        |                     |
| Magic link (**tier 15**) | repo ✅; marketing cutover                       |                     |

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

**Pin:** cutover target **v1.6.1**. Training Unreleased / būsimas 1.6.2 ≠ automatinis re-pin.

---

## 6. Nuorodos

| Kas                   | Kur                                                                                               |
| --------------------- | ------------------------------------------------------------------------------------------------- |
| Open TODO             | `TODO.md` §1                                                                                      |
| Done / metrikos       | `CODEBASE_WHAT_IS_DONE.md`, `CHANGELOG.md`                                                        |
| Agent start           | `DOCUMENTATION_QUICK_REF.md`                                                                      |
| Docs lean             | `DOCS_MAINTENANCE.md` §1c                                                                         |
| Release QA            | `RELEASE_QA_CHECKLIST.md`, `RELEASE_QA_RUN.md`                                                    |
| M10–12 SOT            | `turinio_pletra_moduliai_10_11_12.md`                                                             |
| M10–12 content freeze | [`M10_M12_CONTENT_DEEP_AUDIT_2026-08.md`](docs/development/M10_M12_CONTENT_DEEP_AUDIT_2026-08.md) |
| M16–18 SOT (D)        | `turinio_pletra_moduliai_16_17_18.md`                                                             |
| Marketing handoff     | `DEPLOYMENT.md`, `MON_P0_EXECUTION_PLAN.md`                                                       |
| Done TODO snapshot    | [`TODO_DONE_SPRINTS_2026-08.md`](docs/archive/development/TODO_DONE_SPRINTS_2026-08.md)           |

**Sinchronas:** open gaps ↔ TODO §1 · **2026-08-12** Docs Lean + CATALOG-HOME ✅.
