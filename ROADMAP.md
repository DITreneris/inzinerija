# Promptų anatomija – Plėtros roadmap

> **Atnaujinta:** 2026-07-27 | Roadmap v3.0 (turinio ambicijos flip)  
> **App:** 1.4.9 · **Open blokoriai:** nėra learning P0. CQ-PORTAL ✅ · PDF-1…6 ✅ · M10–12 C1–C6 ✅ · DIAG-1 ✅. CQ-M79-1/2 ✅ · CONTENT §4.6 ✅.  
> **Done santrauka:** [`CODEBASE_WHAT_IS_DONE.md`](docs/development/CODEBASE_WHAT_IS_DONE.md) · [`CHANGELOG.md`](CHANGELOG.md)  
> **Open darbai:** [`TODO.md`](TODO.md) §1 (open only) — P2 polish (PC-4.\* ✅).

**Nuosavybė:** šis repo = turinio / pedagogikos / UI kokybės OS. Marketingas (env, PostHog, CRO) → kitas repo.  
**Principas:** M1–9 production ([promptanatomy](https://github.com/DITreneris/promptanatomy)); M10+ – authoring brandumas šiame repo.  
**Production:** GO learning — tag **v1.4.9**; automated gates green (130/825); learning QA P0 closed; ne monetization-ready.

---

## 1. Būsena (trumpai)

M1–6 pilnai · M7–9 production tier 9 · M10–15 authoring · LT/EN · sertifikatai/PDF/handout · DiagramKit / TE registry · Path Test Shell. Detaliau → `CODEBASE_WHAT_IS_DONE.md`.

### Open gaps

| Sritis                | Kas                                                                          | Prioritetas  |
| --------------------- | ---------------------------------------------------------------------------- | ------------ |
| **M7–9 kokybė**       | Browser S1–S7 / E1–E6 @375px ✅ (CQ-M79-1/2; CONTENT §4.6 ✅)                | ✅ done      |
| **Portal**            | 48h anti-PPT @375 ✅ (CQ-PORTAL 2026-07-27; Phase A smoke + Phase B proxy)   | ✅ done      |
| **PDF rankinė**       | M5/M6 + §5d M4/56·M6/64·@390·entry ✅ (PDF-1…6 2026-07-27); link maturity ✅ | ✅ done      |
| **Handout backlog**   | Mid-path M2/M3/… individualūs handout’ai; sertifikatų skills/QR              | Backlog      |
| **M10–12 brandumas**  | Chrome ✅; W1–2+W3a/W3R/W3B ✅; **C1–C6 @375** ✅ (M1012-2 2026-07-27)       | ✅ done      |
| **Diagram smoke**     | Rankinis light/dark M7–9 @375 ✅ (DIAG-1 2026-07-27)                         | ✅ done      |
| **PC-4.\***           | PC-4.1…4.4 ✅ (2026-07-27); hub filtrai out of scope                         | ✅ done      |
| **GitHub Pages**      | MVP preview `/inzinerija/` – gate policy (ne learning P0)                    | P2 / check   |
| **Marketing handoff** | MON-1…8, PostHog, CRO — ne šio repo P0                                       | Out of scope |

---

## 2. Turinio plėtra M7–15 (pirminis)

1. **M7–9 kokybė:** browser smoke S1–S7 / E1–E6 ✅ (CQ-M79-1/2) + CONTENT §4.6 ✅ — [`07_08_09_backlog.md`](docs/development/07_08_09_backlog.md); SOT `turinio_pletra_moduliai_7_8_9.md`. Learning P0 Portal ✅.
2. **M10–12 authoring brandumas (P1):** chrome ✅ (M1012-1) + browser C1–C6 @375 ✅ (M1012-2). SOT `turinio_pletra_moduliai_10_11_12.md` + `MODULIO_10_SKAIDRIU_EILES.md`.
3. **M13–15 authoring:** katalogas OK; pilnas production release – Deferred. SOT `turinio_pletra_moduliai_13_14_15.md`.
4. **Practice closer:** [`PRACTICE_CLOSER_PLAN.md`](docs/development/PRACTICE_CLOSER_PLAN.md) (PC-0…PC-4 ✅).
5. **Pedagogikos OS:** [`PEDAGOGINES_IZVALGOS_ROADMAP.md`](docs/development/PEDAGOGINES_IZVALGOS_ROADMAP.md) — Should = role-first / org memory / Quiz tonas.
6. **M16–21 (Deferred):** Kodo inžinerija (16–18, vibe-coding; **SOT parked §8** `turinio_pletra_moduliai_16_17_18.md`; authoring po un-defer gates; JSON/eilė Deferred) + DI politikos inžinerija (19–21). Open: `TODO.md` §1.5.

**Etapai:** P2 polish. (Learning P0 + PC-4 ✅)

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

**Sinchronas:** open gaps ↔ TODO §1 · **2026-07-27** DIAG-1 + M1012-2 smoke ✅.
