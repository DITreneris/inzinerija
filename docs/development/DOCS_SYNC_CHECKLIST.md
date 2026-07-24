# Docs sync checklist

> Tikslas: viena vieta po release ar didesnio Unreleased sprinto patikrinti, ar agentų įėjimo dokumentai, release/ops dokumentai ir techniniai registry atitinka faktinę kodo bazę.

**Baseline:** 1.4.6 (tag release) + Unreleased pre-launch  
**Testai:** 103 failai / 686 testai (HEAD 2026-07-24)  
**Data:** 2026-07-24  
**Šaltiniai:** `package.json`, `CHANGELOG.md`, `docs/development/RELEASE_QA_RUN.md`, `docs/development/RELEASE_QA_CHECKLIST.md`, `docs/development/DOCS_MAINTENANCE.md`.

## Deploy / env matrica (viena tiesa)

| Artefaktas                      | Env / komanda                                                                              | Moduliai     | Base path      |
| ------------------------------- | ------------------------------------------------------------------------------------------ | ------------ | -------------- |
| **GitHub Pages preview**        | `VITE_MVP_MODE=1` (deploy.yml)                                                             | M1–6         | `/inzinerija/` |
| **Production (Vercel)**         | `npm run build:production` / `VITE_MAX_BUILD_MODULE=9`                                     | M1–9         | `/anatomy/`    |
| **Authoring / full CI default** | be MVP cap; full `modules.json`                                                            | M1–15        | `/` (dev)      |
| **Prieiga (runtime)**           | magic link → `verified_access_tier`; **draudžiama** prod `VITE_MAX_ACCESSIBLE_MODULE=6\|9` | tier 0/3/6/9 | —              |

CI (`test.yml`) stato MVP + M1–9; Pages shipina tik MVP. Preflight (`audit:release-preflight`) platesnis už CI (DS gate, journey, M1–9 EN).

## Sync lentelė

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
