# Promptų anatomija – Plėtros roadmap

> **Atnaujinta:** 2026-07-24 | Roadmap v2.9 (Docs Lean)  
> **App:** 1.4.7 · **Open blokoriai:** MON browser (1/3/5/8) + PDF rankinė QA + MON-4.  
> **Done santrauka:** [`CODEBASE_WHAT_IS_DONE.md`](docs/development/CODEBASE_WHAT_IS_DONE.md) · [`CHANGELOG.md`](CHANGELOG.md)  
> **Open darbai:** [`TODO.md`](TODO.md) §1 (open only).

**Principas:** M1–9 production ([promptanatomy](https://github.com/DITreneris/promptanatomy)); Stripe M1–6, magic link M7–9. M10+ – authoring.  
**Production:** CONDITIONAL GO — automated ✅ (111/720, tag **v1.4.7**); release-ready blokuoja MON browser + PDF.

---

## 1. Būsena (trumpai)

M1–6 pilnai · M7–9 production tier 9 · M10–15 authoring · LT/EN · sertifikatai/PDF/handout · DiagramKit / TE registry · Path Test Shell. Detaliau → `CODEBASE_WHAT_IS_DONE.md`.

### Open gaps

| Sritis            | Kas                                                 | Prioritetas |
| ----------------- | --------------------------------------------------- | ----------- |
| **MON / env**     | MON-1…5, MON-8 browser/env; MON-4 PostHog           | P0          |
| **PDF rankinė**   | M5/M6 (+ release checklist)                         | P1          |
| **Diagram smoke** | Rankinis light/dark M7–9 (TE registry + RELEASE_QA) | P1          |
| **GitHub Pages**  | MVP preview `/inzinerija/` – gate policy            | Patikrinti  |
| **E2E**           | Playwright po MON-\* (vitest gate ✅)               | P1 post-MON |
| **PC-4.\***       | Practice closer polish backlog                      | P2          |

---

## 2. Pasiruošimas deploy

### 2.1 Privaloma

| #   | Užduotis                                           | Šaltinis      |
| --- | -------------------------------------------------- | ------------- |
| 1   | RELEASE_QA_CHECKLIST §1–5, 5a–5c, §6–7             | QA            |
| 2   | `validate:schema`, lint, `test:run`, build (+ MVP) | CI            |
| 3   | Lietuviškos raidės (skaidrė + PDF)                 | QA            |
| 4   | EN locale smoke                                    | QA            |
| 5   | Deploy kelias: Pages vs Vercel/monorepo            | DEPLOYMENT.md |

### 2.2 Rekomenduojama

PDF M5/M6 rankinė · broken links · mobile 375px · docs index nuorodos.

---

## 3. Deploy

| Scenarijus           | Env                                            | Rezultatas             |
| -------------------- | ---------------------------------------------- | ---------------------- |
| GitHub Pages preview | `VITE_MVP_MODE=1`                              | M1–6 `/inzinerija/`    |
| Vercel production    | `build:production` / `VITE_MAX_BUILD_MODULE=9` | M1–9 `/anatomy/`       |
| Magic link           | tier 3/6/9                                     | `verified_access_tier` |

CI: push/PR → schema, lint, test, MVP build. Deploy checklist: CI žalias → deploy → smoke URL.

---

## 4. Post-deploy / MON P0

| #   | Užduotis                         | TODO         |
| --- | -------------------------------- | ------------ |
| 1   | PostHog/GA4 production           | MON-4        |
| 2   | Verify-access smoke              | MON-3        |
| 3   | Env audit + submodule pin        | MON-1, MON-2 |
| 4   | Gate regression browser          | MON-5        |
| 5   | Marketing `build:production` env | MON-8        |
| 6   | Baseline KPI (po 2–4 sav.)       | MON-7        |

Planas: [`MON_P0_EXECUTION_PLAN.md`](docs/deployment/MON_P0_EXECUTION_PLAN.md).

**Etapai:** Monetization pilot (P0) → stabilumas/PDF (P1) → UX/PC-4 (P2) → M10+ monetizacija Deferred.

**Nedaryti dabar:** M10+ premium SaaS diagram redesign; M13–15 pilnas release; backend rewrite.

---

## 5. Turinio plėtra M7–15

- **7–9:** production tier 9 (`build:production`).
- **10–15:** authoring; monetizacija po MON P0 + MON-7.
- SOT: `turinio_pletra_moduliai_7_8_9.md` / `_10_11_12` / `_13_14_15`.
- Practice closer: [`PRACTICE_CLOSER_PLAN.md`](docs/development/PRACTICE_CLOSER_PLAN.md) (PC-4 open).

---

## 6. Nuorodos

| Kas                | Kur                                                     |
| ------------------ | ------------------------------------------------------- |
| Open TODO          | `TODO.md` §1                                            |
| Done / metrikos    | `CODEBASE_WHAT_IS_DONE.md`, `CHANGELOG.md`              |
| Agent start        | `DOCUMENTATION_QUICK_REF.md`                            |
| Docs lean          | `DOCS_MAINTENANCE.md` §1c                               |
| Release QA         | `RELEASE_QA_CHECKLIST.md`, `RELEASE_QA_RUN.md`          |
| Deploy / MON       | `DEPLOYMENT.md`, `MON_P0_EXECUTION_PLAN.md`             |
| Done TODO snapshot | `docs/archive/development/TODO_DONE_SPRINTS_2026-07.md` |

**Sinchronas:** open gaps ↔ TODO §1 · **2026-07-24** Docs Lean Pass DL-0…4 ✅.
