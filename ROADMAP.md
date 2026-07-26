# Promptų anatomija – Plėtros roadmap

> **Atnaujinta:** 2026-07-26 | Roadmap v3.0 (turinio ambicijos flip)  
> **App:** 1.4.8 · **Open blokoriai:** Portal 48h; P1 PDF + M10–12 rankinė UI (chrome ✅) + DIAG-1. CQ-M79-1/2 ✅ · CONTENT §4.6 ✅.  
> **Done santrauka:** [`CODEBASE_WHAT_IS_DONE.md`](docs/development/CODEBASE_WHAT_IS_DONE.md) · [`CHANGELOG.md`](CHANGELOG.md)  
> **Open darbai:** [`TODO.md`](TODO.md) §1 (open only).

**Nuosavybė:** šis repo = turinio / pedagogikos / UI kokybės OS. Marketingas (env, PostHog, CRO) → kitas repo.  
**Principas:** M1–9 production ([promptanatomy](https://github.com/DITreneris/promptanatomy)); M10+ – authoring brandumas šiame repo.  
**Production:** CONDITIONAL GO — automated gates green (`audit:release-preflight`; HEAD tests **129/822**, `@ tag 1.4.8` freeze 126/781; `audit:m79`, `validate:journey-m9`, `audit:m1012`); tag **v1.4.8**; learning QA blokuoja Portal 48h + PDF rankinė (CQ-M79 browser ✅; ne monetization-ready).

---

## 1. Būsena (trumpai)

M1–6 pilnai · M7–9 production tier 9 · M10–15 authoring · LT/EN · sertifikatai/PDF/handout · DiagramKit / TE registry · Path Test Shell. Detaliau → `CODEBASE_WHAT_IS_DONE.md`.

### Open gaps

| Sritis                | Kas                                                                                | Prioritetas  |
| --------------------- | ---------------------------------------------------------------------------------- | ------------ |
| **M7–9 kokybė**       | Browser S1–S7 / E1–E6 @375px ✅ (CQ-M79-1/2; CONTENT §4.6 ✅)                      | ✅ done      |
| **Portal**            | 48h anti-PPT retest @375px                                                         | P0           |
| **PDF rankinė**       | M5/M6 (+ release checklist §5d); link maturity P0–P2 ✅ (`PDF-LINK-1`)             | P1           |
| **Handout backlog**   | Mid-path M2/M3/… individualūs handout’ai; sertifikatų skills/QR                    | Backlog      |
| **M10–12 brandumas**  | Chrome ✅; M10 W1–2+W3a ✅; W3R ✅; **W3B Top-5** ✅; lieka C1–C6 @375px (M1012-2) | P1 (browser) |
| **Diagram smoke**     | Rankinis light/dark M7–9 (TE registry + RELEASE_QA)                                | P1           |
| **PC-4.\***           | PC-4.2 quest clarity ✅; likę PC-4.1 / 4.3 / 4.4                                   | P2           |
| **GitHub Pages**      | MVP preview `/inzinerija/` – gate policy (ne learning P0)                          | P2 / check   |
| **Marketing handoff** | MON-1…8, PostHog, CRO — ne šio repo P0                                             | Out of scope |

---

## 2. Turinio plėtra M7–15 (pirminis)

1. **M7–9 kokybė:** browser smoke S1–S7 / E1–E6 ✅ (CQ-M79-1/2) + CONTENT §4.6 ✅ — [`07_08_09_backlog.md`](docs/development/07_08_09_backlog.md); SOT `turinio_pletra_moduliai_7_8_9.md`. Kitas žmogaus P0 = Portal 48h.
2. **M10–12 authoring brandumas (P1):** chrome turinys ✅ (M1012-1); lieka rankinė UI C1–C6 @375px (M1012-2). SOT `turinio_pletra_moduliai_10_11_12.md` + `MODULIO_10_SKAIDRIU_EILES.md`.
3. **M13–15 authoring:** katalogas OK; pilnas production release – Deferred. SOT `turinio_pletra_moduliai_13_14_15.md`.
4. **Practice closer:** [`PRACTICE_CLOSER_PLAN.md`](docs/development/PRACTICE_CLOSER_PLAN.md) (PC-4.2 ✅; PC-4.1/4.3/4.4 open).
5. **Pedagogikos OS:** [`PEDAGOGINES_IZVALGOS_ROADMAP.md`](docs/development/PEDAGOGINES_IZVALGOS_ROADMAP.md) — open vykdymas = `TODO.md` §1.
6. **M16–21 (Deferred):** Kodo inžinerija (16–18, vibe-coding; **SOT parked §8** `turinio_pletra_moduliai_16_17_18.md`; authoring po un-defer gates; JSON/eilė Deferred) + DI politikos inžinerija (19–21). Open: `TODO.md` §1.5.

**Etapai:** Portal 48h (P0) → PDF + M10–12 brandumas (P1) → PC-4 / polish (P2).

**Nedaryti dabar:** M10+ premium SaaS diagram redesign; M13–15 pilnas release; M16–21 turinio authoring; backend rewrite; marketing MON kaip šio repo P0.

---

## 3. Pasiruošimas deploy

### 3.1 Privaloma

| #   | Užduotis                                           | Šaltinis      |
| --- | -------------------------------------------------- | ------------- |
| 1   | RELEASE_QA_CHECKLIST §1–5, 5a–5c, §6–7             | QA            |
| 2   | `validate:schema`, lint, `test:run`, build (+ MVP) | CI            |
| 3   | Lietuviškos raidės (skaidrė + PDF)                 | QA            |
| 4   | EN locale smoke                                    | QA            |
| 5   | Deploy kelias: Pages vs Vercel/monorepo            | DEPLOYMENT.md |

### 3.2 Rekomenduojama

PDF M5/M6 rankinė · broken links · mobile 375px · docs index nuorodos.

---

## 4. Deploy

| Scenarijus           | Env                                            | Rezultatas             |
| -------------------- | ---------------------------------------------- | ---------------------- |
| GitHub Pages preview | `VITE_MVP_MODE=1`                              | M1–6 `/inzinerija/`    |
| Vercel production    | `build:production` / `VITE_MAX_BUILD_MODULE=9` | M1–9 `/anatomy/`       |
| Magic link           | tier 3/6/9                                     | `verified_access_tier` |

CI: push/PR → schema, lint, test, MVP build. Deploy checklist: CI žalias → deploy → smoke URL.

---

## 5. Marketing handoff (out of scope šiame repo)

Nuorodos marketing repo / env darbams (ne open P0 čia):

| Tema                        | Kur                                                                    |
| --------------------------- | ---------------------------------------------------------------------- |
| MON vykdymo planas          | [`MON_P0_EXECUTION_PLAN.md`](docs/deployment/MON_P0_EXECUTION_PLAN.md) |
| PostHog                     | [`MON-4_POSTHOG_DEPLOY.md`](docs/deployment/MON-4_POSTHOG_DEPLOY.md)   |
| Deploy                      | [`DEPLOYMENT.md`](docs/deployment/DEPLOYMENT.md)                       |
| Ticketų statusai (istorija) | [`TODO.md`](TODO.md) §1.4                                              |

---

## 6. Nuorodos

| Kas                | Kur                                                     |
| ------------------ | ------------------------------------------------------- |
| Open TODO          | `TODO.md` §1                                            |
| Done / metrikos    | `CODEBASE_WHAT_IS_DONE.md`, `CHANGELOG.md`              |
| Agent start        | `DOCUMENTATION_QUICK_REF.md`                            |
| Docs lean          | `DOCS_MAINTENANCE.md` §1c                               |
| Release QA         | `RELEASE_QA_CHECKLIST.md`, `RELEASE_QA_RUN.md`          |
| M7–9 backlog       | `07_08_09_backlog.md`                                   |
| Marketing handoff  | `DEPLOYMENT.md`, `MON_P0_EXECUTION_PLAN.md`             |
| Done TODO snapshot | `docs/archive/development/TODO_DONE_SPRINTS_2026-07.md` |

**Sinchronas:** open gaps ↔ TODO §1 · **2026-07-26** turinio ambicijos flip ✅.
