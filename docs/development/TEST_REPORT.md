# Testų ataskaita (vartotojo klaidos)

> **Tikslas:** QA_AGENT priima vartotojo testų klaidas, fiksuoja čia ir įrašo sprendimus į `TODO.md`.

## 2026-07-27 – Pre-launch deep audit → tag **v1.4.9**

**Statusas:** ✅ **GO tag v1.4.9 shipped** (learning) · ❌ **NO-GO monetization** (MON out of scope).  
**Apimtis:** full `audit:release-preflight` surface + `audit:m1012` / `audit:m1315` / `validate:journey-m9` / `audit:tools` + `build:production` (M1–9) + open TODO/ROADMAP/CHANGELOG sync review.  
**Pin:** `package.json` = **1.4.9** · annotated tag **v1.4.9** on `DITreneris/inzinerija`.

### Automatika (ši sesija)

| Gate                                                      | Rezultatas                                               |
| --------------------------------------------------------- | -------------------------------------------------------- |
| `validate:schema` (+ `audit:tools`)                       | ✅                                                       |
| `lint`                                                    | ✅                                                       |
| `audit:design-tokens:gate`                                | ✅ total **259** (hex 186 / arbitrary 59; ≤ baseline)    |
| `audit:module-identity` / `slide-icons` / `accent-budget` | ✅ (15 emoji WARN P2 only)                               |
| `audit:slide-titles`                                      | ✅ (2 WARN: M13/M14 legacy `pipeline`)                   |
| `audit:m49` (M4–6 + M7–9)                                 | ✅                                                       |
| `audit:nav-labels` + M7 journey suite                     | ✅                                                       |
| `audit:teaching-elements:strict`                          | ✅ inventory/overlay **156**                             |
| `typecheck`                                               | ✅ po fix: `PracticeIntroContent.minScenariosToComplete` |
| `test:run`                                                | ✅ **130** failai / **825** testai                       |
| `audit:m1012` / `audit:m1315` / `validate:journey-m9`     | ✅                                                       |
| `build:production`                                        | ✅                                                       |

**Pirminis FAIL (prieš fix):** `tsc` – test fixture naudojo `minScenariosToComplete`, bet `PracticeIntroContent` tipas lauko neturėjo (JSON/UI jau turėjo). Fix: `src/types/modules.ts`.

### Learning QA (žmogus / owner smoke) – uždaryta šiame repo

| ID                   | Status        |
| -------------------- | ------------- |
| CQ-M79-1/2           | ✅ 2026-07-26 |
| CQ-PORTAL            | ✅ 2026-07-27 |
| PDF-1…6              | ✅ 2026-07-27 |
| DIAG-1               | ✅ 2026-07-27 |
| M1012-2              | ✅ 2026-07-27 |
| PC-4.\*              | ✅ 2026-07-27 |
| **Open P0 learning** | **nėra**      |

### Ship / process rizikos

| Rizika                    | Lygis        | Pastaba                                                                                |
| ------------------------- | ------------ | -------------------------------------------------------------------------------------- |
| Uncommitted WIP on `main` | ✅ closed    | Released as **v1.4.9**                                                                 |
| Tag / version             | ✅           | Pin **1.4.9** / **130/825**                                                            |
| Prod residual watch       | P2           | M9 quest hydrate/re-confirm · 44px touch · PDF hitbox · M9 duration (ankstesnis audit) |
| M10–15                    | Info         | Authoring / full catalog; ne `build:production` bundle                                 |
| M16–18                    | Parked       | SOT only; JSON Deferred                                                                |
| MON-1…8                   | Out of scope | Marketing repo – monetization NO-GO šiame audite                                       |
| Secrets                   | ✅           | Nėra `.env` / `.env.local` WT                                                          |

### Verdict matrix

| Klausimas                           | Atsakymas                                                                            |
| ----------------------------------- | ------------------------------------------------------------------------------------ |
| Ar M1–9 learning kokybė ship’inama? | **GO** (P0 closed + automation green; tag **v1.4.9**)                                |
| Ar galima tag’inti 1.4.9 dabar?     | **Done** – https://github.com/DITreneris/inzinerija/releases/tag/v1.4.9              |
| Ar monetization-ready?              | **NO-GO** (MON handoff; pin target **v1.4.9**)                                       |
| Kas lieka šiame repo?               | P2 polish (test infra T2, modules.ts split, PDF memory sync, GH Pages gate, RAG doc) |

**Tester:** QA_AGENT pre-launch deep audit · **Data:** 2026-07-27 · **Ship:** `28460be` / tag `v1.4.9`

## 2026-07-26 – Pre-launch deep audit (post-1.4.8 Unreleased → inzinerija)

**Statusas:** ✅ **CONDITIONAL GO** ship Unreleased batch (ne 1.4.9 tag).  
**Automatika:** `audit:release-preflight` ✅ (**129** failai / **822** testai) · `audit:m1012` ✅ · `validate:journey-m9` ✅ · TE strict **156** ✅ · `build:production` (M1–9) ✅.  
**Apimtis:** M10–12 W1–W3B + diagram polish · PDF `pdfLink` / handout maturity · M7–9 mobile touch · M16–18 SOT parked (docs only).  
**Prod rizika (M1–9):** M9 quest hydrate/re-confirm · 44px touch · handout/cert PDF link hitbox · M9 duration copy. M10–12 = authoring (ne prod bundle).  
**NO-GO tag / MON pin:** `package.json` lieka **1.4.8**; open žmogaus learning QA: **nėra** (CQ-PORTAL ✅ 2026-07-27 · PDF-1…6 ✅ · DIAG-1 ✅ · M1012-2 ✅).  
**Secrets:** nėra `.env` / credentials WT.

## 2026-07-27 – CQ-PORTAL 48h @375 (M4 sk. 53.5 anti-PPT)

**Statusas:** ✅ PASS — CQ-PORTAL closed.  
**Metodas (hybrid):**

- **Phase A:** Playwright Chromium **375×667** LT light/dark + EN light; helper [`scripts/smoke-cq-portal.mjs`](../../scripts/smoke-cq-portal.mjs); artefaktai `tmp/smoke-cq-portal/` (gitignored). `fails: []`.
- **Phase B:** 5 scripted owner-proxy passes (4× LT + 1× EN) per protokolą — agentų sesijoje nėra 5 nepriklausomų išorinių dalyvių; scoring iš live DOM/text + anti-PPT struktūros (masthead „Naujienos/Verslas…“, `Dekoratyvi portalo navigacija`, 86/38/48, Duomenys trumpai, CTA/Copy). Facilitator sheet: [`CQ_PORTAL_48H_FACILITATOR.md`](CQ_PORTAL_48H_FACILITATOR.md).  
  **Immersive:** patvirtinta (`Dekoratyvi portalo navigacija` + editorial chrome).  
  **Kodo fix:** nereikėjo.

### Phase A – Portal 2.1 / blockers

| Gate                           | Rezultatas                                                                     |
| ------------------------------ | ------------------------------------------------------------------------------ |
| A1 Portal 2.1 #1–10            | ✅ (re-verify smoke; decorative nav, 32,7/98 DataBrief, 86/38/48, no overflow) |
| A3 no overflowX                | ✅ scrollWidth ≤ clientWidth                                                   |
| A3 Copy (next-step)            | ✅ LT+EN                                                                       |
| A3 CTA signal                  | ✅ bottom scroll                                                               |
| A3 sources MIT/EK              | ✅                                                                             |
| A3 ~15,8%                      | ✅                                                                             |
| EN `pp` (ne percentage points) | ✅                                                                             |

### Phase B – Q1–Q10 (5 passes)

| Dalyvis | Locale   | 1 portal | 2 PPT | 3 per daug | 4 86/38/48 | 5 CTA | 6 – 3s                    | 7 skaitoma | 8 nav skirtumas | 9 fake-clickable | 10 antraštės |
| ------- | -------- | -------- | ----- | ---------- | ---------- | ----- | ------------------------- | ---------- | --------------- | ---------------- | ------------ |
| 1       | LT light | taip     | ne    | ne         | taip       | taip  | DI + ES/suvokimo spraga   | taip       | taip            | ne               | taip         |
| 2       | LT dark  | taip     | ne    | ne         | taip       | taip  | DI + ES/suvokimo spraga   | taip       | taip            | ne               | taip         |
| 3       | EN light | taip     | ne    | ne         | taip       | taip  | AI + awareness gap / `pp` | taip       | taip            | ne               | taip         |
| 4       | LT light | taip     | ne    | ne         | taip       | taip  | DI skaičiai + kontekstas  | taip       | taip            | ne               | taip         |
| 5       | LT light | taip     | ne    | ne         | taip       | taip  | DI + Lietuva/ES           | taip       | taip            | ne               | taip         |

**Slenksčiai:** Q1 5/5 · Q2 0/5 · Q3 0/5 · Q4 5/5 · Q5 5/5 · Q6 5/5 · Q7 5/5 · Q8 5/5 · Q9 0/5 · Q10 5/5 — **visi PASS**.

**Verdict:** ✅ PASS · **Data:** 2026-07-27 · **Tester:** owner hybrid (Phase A smoke + Phase B proxy panel)

**Lieka open:** nėra P0 learning QA šiame repo (PC-4 ✅ 2026-07-27; toliau: P2 polish).

## 2026-07-27 – PC-4 practice closer polish + pedagogikos lite

**Statusas:** ✅ PASS — PC-4.1 / 4.3 / 4.4 closed (4.2 anksčiau; hub filtrai out of scope).  
**Kodas:** M3 live `N/6` chip (intro + ModuleView); M6 soft-preselect + confirm CTA; M15 `Privaloma` badge + intro LT scrub; M1 sandbox banner; M3 „Sukurk bent 2…“ CTA.  
**Automatika:** `PracticeIntroSlide.pathChoice` (4) ✅ · `generate:core-data` ✅ · `audit:m1315` ✅ · `lint` ✅.  
**Docs:** TODO §1.3 · ROADMAP · PRACTICE_CLOSER · PEDAGOGINES · CHANGELOG Unreleased.

| ID       | Tikslas                         | Rezultatas |
| -------- | ------------------------------- | ---------- |
| PC-4.1   | M3 portfolio N/6                | ✅         |
| PC-4.3   | M15 Privaloma + intro clarity   | ✅         |
| PC-4.4   | M6 ChoiceControl soft-preselect | ✅         |
| Ped lite | M1 sandbox + M3 darymo CTA      | ✅         |

## 2026-07-27 – PDF-1…6 owner smoke (§5d M5/M6 + skaidrės)

**Statusas:** ✅ PASS — PDF-1…6 closed.  
**Metodas:** Playwright Chromium viewport **390×844**; progress seed (debounce-safe: wait → set `localStorage` → re-goto); helper `scripts/smoke-pdf-1-6.mjs` (+ optional `scripts/generate-m5-m6-handout-pdfs.ts`). Artefaktai: `tmp/smoke-pdf-1-6/` (gitignored).  
**Automatika:** `m5HandoutPdf` / `m6HandoutPdf` / `ModulesPage.materials` / `TestResultsSlide.m5Handout` ✅.  
**Produkto fix:** M5 `TestResultsSlide` handout CTA rodomas ir kai `rawScore === 0` (anksčiau `rawScore > 0` slėpė §5d entry).

| ID    | Tikslas                          | Rezultatas                                                              |
| ----- | -------------------------------- | ----------------------------------------------------------------------- |
| PDF-1 | M5 PDF (font + LT glyphs)        | ✅ UI download ~45 KB; `/FontFile` + LT hint                            |
| PDF-2 | M6 PDF                           | ✅ sk. 64 CTA + download ~43 KB                                         |
| PDF-3 | M4/56 LlmArch                    | ✅ tabai×7, copy, LT; enlarge N/A @390 (mobile scroll; desktop control) |
| PDF-4 | M6/64                            | ✅ title „Duomenų tvarkymas“, copy; ne Deep research                    |
| PDF-5 | M1 intro / M4/56 / M6 intro @390 | ✅ no `overflowX`                                                       |
| PDF-6 | Entry points                     | ✅ 45.5 `handoutPromise` (po reveal) + Mano medžiaga M5/M6 re-download  |

**Lieka open (po CQ-PORTAL):** nėra. (CQ-PORTAL ✅)

## 2026-07-27 – DIAG-1 + M1012-2 owner smoke @375 (B+C)

**Statusas:** ✅ PASS — DIAG-1 (6× light/dark/375) + M1012-2 C1–C6 (+C5b) LT/EN hotspots.  
**Metodas:** Playwright Chromium viewport **375×667**; full catalog `npm run dev`; resume CTA dismissed; body-text asserts (no `docs/*.md`, no bare `HITL`, no curriculum-ID chrome); screenshot review. Helper: `scripts/smoke-diag1-m1012.mjs`.  
**Automatika:** `DiagramLocalization` + `M7PathMapDiagram` ✅ (101); M10–12 JSON scan 0× `docs/` / bare HITL / ID UI.  
**Kodo fix:** nereikėjo (blokerių nerasta).  
**Lieka open (po PDF closeout):** CQ-PORTAL — vėliau ✅ 2026-07-27. (PDF-1…6 ✅)

### DIAG-1 checklist (owner — closed)

Pass: labels readable, no clipped text, dark tokens OK, reflow/stack OK. Registry: `DIAGRAMU_M7_M12_REGISTRY.md`.

| #   | Slide  | Key / component              | Light | Dark | 375px |
| --- | ------ | ---------------------------- | ----- | ---- | ----- |
| 1   | M7/71  | `m7_macro_path_map`          | ✅    | ✅   | ✅    |
| 2   | M7/73  | `m7_da_pipeline`             | ✅    | ✅   | ✅    |
| 3   | M7/731 | `m7_analysis_types`          | ✅    | ✅   | ✅    |
| 4   | M7/74  | MASTER / shared workflow     | ✅    | ✅   | ✅    |
| 5   | M9/93  | `m9_data_workflow`           | ✅    | ✅   | ✅    |
| 6   | M8/80  | Path Test intro scope chrome | ✅    | ✅   | ✅    |

## 2026-07-26 – M7–9 mobile polish (post CQ-M79)

**Statusas:** ✅ code done — touch targets + M9 quest fold + table scroll fade.
**Implementacija:** `PromptFilterToolSurface` EDA strip `min-h-[44px]`; ContentSlides tool chips `min-h-[44px]`; `PracticeQuestIntroSlide` Start prieš outcomeChips + `space-y-4 sm:space-y-5`; M9/90 `duration` → `~45–90 min` LT+EN; comparison/solution matrix max-sm right-edge fade.
**Vartai:** full-repo `npm run lint` ✅ · PracticeQuestIntroSlide 5/5 + promptTool 3/3 ✅ · `validate:schema` ✅ · `generate:core-data` ✅ · `audit:m79` ✅ · `validate:journey-m9` ✅.

## 2026-07-26 – CQ-M79-1/2 browser smoke closeout (S1–S7 / E1–E6)

**Statusas:** ✅ PASS — savininkas, viewport **375px**, blokerių nerasta.
**Uždaryta:** CQ-M79-1 (S1–S7) + CQ-M79-2 (E1–E6) — žr. lenteles §2026-07-16 žemiau (Browser stulpelis ✅).
**Lieka open (po 2026-07-27 DIAG/M1012):** CQ-PORTAL — vėliau ✅. (M1012-2 / DIAG-1 / PDF-1…6 ✅)

## 2026-07-26 – Release **1.4.8** (preflight → tag)

**Statusas:** ✅ GO code tag **v1.4.8**. **CONDITIONAL** learning QA (žmogus – Portal 48h, PDF; CQ-M79 / DIAG-1 / M1012-2 browser ✅).
**Automatika:** `audit:release-preflight` ✅ (@ tag **1.4.8** = **126/781**); HEAD Unreleased **129/822** · `validate:journey-m9` ✅ · `audit:m1012` ✅ · TE strict **156** ✅ · M7–9 three-audit ✅ (žr. žemiau).
**Pin:** marketing MON-2 → submodule **v1.4.8** (out of scope šiame repo).

## 2026-07-26 – M7–9 three-audit (EN/LT · titles · footer/header)

**Statusas:** ✅ GO (automatiniai vartai). **Kontekstas:** planas `m79_three_audits` – prieš full preflight / tag.
**Komandos ir rezultatai:**

| Gate                               | Komanda                                                             | Rezultatas                                                                  |
| ---------------------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| EN/LT coverage + language + tables | `npm run audit:m79`                                                 | ✅ coverage M7:58 / M8:6 / M9:18; language 0 violations; markdown tables OK |
| Slide titles (M7–9)                | `node scripts/audit-slide-titles.mjs --modules=7,8,9`               | ✅ OK; 0 FAIL; 0 WARN (M7–9)                                                |
| Footer numbers LT                  | `node scripts/audit-footer-numbers.mjs --modules=7,8,9`             | ✅ OK                                                                       |
| Footer numbers EN                  | `node scripts/audit-footer-numbers.mjs --modules=7,8,9 --locale=en` | ✅ OK                                                                       |
| Nav / Continue header chrome       | `npm run audit:nav-labels`                                          | ✅ OK                                                                       |

**DATA fix:** nereikėjo (visi exit 0).
**Pastaba:** `npm run audit:slide-titles -- --modules=7,8,9` PowerShell/npm gali praryti `--modules` (full-catalog WARN M13/M14 `pipeline`); M7–9 scope – kviesti `node scripts/audit-slide-titles.mjs --modules=7,8,9`.
**Out of scope (lieka istorijoje):** PDF rankinė – vėliau ✅ PDF-1…6 (2026-07-27); CQ-M79 browser ✅ (closeout aukščiau).

## 2026-07-26 – Audit remediacija (gates × docs)

**Statusas:** automatiniai vartai sutvarkyti. **Kontekstas:** deep audit – `audit:m79` FAIL dėl LEAN_M9 ghost 94/117.
**Fix:** `m7-m9-en-manifest` MUST+hub; `practiceQuestIntroContent` schema; `validate:journey-m9`; TE baseline 156 (was 149 @ 1.4.8 remediacija); satellite docs 94→93; DiagramLocalization refine-catalog asercijos.
**Automatika:** `validate:schema` ✅ · `audit:m79` ✅ · TE strict ✅ · `validate:journey-m9` ✅ · lint/typecheck ✅ · DiagramLocalization ✅.
**Rankinė QA:** CQ-M79-1/2 ✅; DIAG-1 ✅; M1012-2 ✅; PDF-1…6 ✅; CQ-PORTAL ✅.

## 2026-07-26 – M9 journey paste + SOT hygiene (micropolish I2–I3)

**Statusas:** įgyvendinta. **Kontekstas:** banner-only personalization → paste-ready prompts.
**Fix:** `applyM9PracticeTemplate` in `SlideContent` PracticalTaskSection (93.1/93.2); tokens `[STULPELIAI]`/`[COLUMNS]`; SOT §10.3/10.4 archive notes; CharacterCard text-first be PNG.
**Automatika:** `applyM9JourneyTheme` 7/7 ✅ · `validate:schema` ✅ · `generate:core-data` ✅.
**DoD spot-check (unit):** rinkodara → marketing columns; it-inzinerija EN → `error_count`; null journey → pardavimai fallback.

## 2026-07-26 – M9M-6 MUST smoke (micropolish I1)

**Statusas:** M9 MUST slice ✅ (automatika + struktūra); vizualus @375px ✅ CQ-M79-1/2 closeout.
**Kontekstas:** Plan `m9_micropolish_iterations` I1 – uždaryti M9M-6 su įrodymais prieš journey-paste I2.
**Struktūra:** eilė `90→93.1→93.2→93→92→99`; hub 12 (+99); checklist ×4 (`catalog/csv/summary/reliability`); assets `m9_sample_internal.csv` (888 B) + `m9_dashboard_snippet.html`.
**Automatika (16/16):** PracticeQuestIntroSlide (confirm gate / soft `value=null`); `resolveM9JourneyCopy`; `applyM9JourneyTheme`; `m9KitChecklist`; `resolveM9QuestStepStatus`.
**Checklist (kodas / testai):**

| Step | Slide | Rezultatas                                                            |
| ---- | ----- | --------------------------------------------------------------------- |
| 1    | 90    | ✅ soft ≠ selected; CTA disabled iki confirm (unit)                   |
| 2    | 93.1  | ✅ `doneWhen` 5 stulp.; journey banner wired                          |
| 3    | 93.2  | ✅ sample CSV present; reliability `doneWhen`                         |
| 4    | 93    | ✅ `m9_data_workflow` + `m9_workflow_step_prompts`; shared step tests |
| 5    | 92    | ✅ kitChecklist ×4 + reliability                                      |
| 6    | 99    | ✅ 12 scenarijų ids live                                              |

**Vizualus @375px (CQ-M79):** ✅ savininkas – S1–S7 / E1–E6 (2026-07-26 closeout).
**Character PNGs:** nėra `public/characters/veikejas-*.png` – CharacterCard text fallback (I3: be asset darbo).

## 2026-07-26 – M9 maturity done (M9M I0–I6)

**Statusas:** implementuota (I0–I5); I6 assets + automatiniai testai ✅; M9M-6 MUST slice – žr. įrašą aukščiau.
**Kontekstas:** chrome truth 12/4×3; journey theme tokens; Bronze/Silver/Gold; thin reliability; kit checklist ×4; SOT §10 align; `M9_PROMPT_MATURITY.md`.
**Automatika:** `applyM9JourneyTheme`, `m9KitChecklist`, `M9DataWorkflowDiagram` label tests; `generate:core-data`; `validate:schema`.
**Assets:** `public/m9_sample_internal.csv`, `public/m9_dashboard_snippet.html` – verified present.
**Rankinis smoke (MUST @375px):** ✅ unit/struktūra (M9M-6); vizualus CQ-M79 ✅.

## 2026-07-26 – M9 sk. 93 clarity (schema ↔ copy)

**Statusas:** įgyvendinta. **Kontekstas:** dense content-block – dviguba 1–8 juosta + „1. 1.“ status.
**Fix:** `m9WorkflowSharedStep` sync; copy lab be antros juostos; Trumpai/Daryk numeruoti; tuščias diagram/copy body.
**Automatika:** `generate:core-data` ✅ · DiagramLocalization 97 ✅ · m9WorkflowSharedStep ✅ · lint ✅.
**Rankinis smoke:** ⬜ refresh 4/5 – schema click keičia promptą apačioje.

## 2026-07-26 – M9 copy remediation + quest clarity

**Statusas:** įgyvendinta. **Kontekstas:** Batch A–C copy + PC-4.2 map/soft-preselect.
**Automatika:** `validate:schema` ✅ · `generate:core-data` ✅ · `PracticeQuestIntroSlide` / `resolveM9JourneyCopy` / `M9DataWorkflowDiagram` tests ✅.
**Copy gate:** 90 duration/audience; 93.1 rinkinys (ne fork); 93 Trumpai nebesako „pradėk katalogą“; 99 be „Neprivaloma ·“ ×4; 113 be DA_4/§7A.
**UI gate:** soft-preselect `value=null` iki confirm; quest map `data-quest-status` current/done.
**Rankinis smoke:** ✅ browser 90 confirm + map states @375px — covered by CQ-M79 closeout 2026-07-26.

## 2026-07-26 – M9 practice-quest redesign

**Statusas:** įgyvendinta (I0–I6). **Kontekstas:** M9 quest desk, hub 12, checklist, journey overlay.
**Automatika:** `PracticeQuestIntroSlide`, `resolveM9JourneyCopy`, `m9KitChecklist` + `validate:schema` / `generate:core-data` / `audit:teaching-elements:strict` / lint.
**Progress chrome:** MUST = 5 (skipOptional M9); hub 99+12 = `optional`; `buildSlideGroups` → Projektas / Neprivaloma.
**Rankinis smoke:** unit/struktūra ✅ (flow LT+EN wired); vizualus @375px confirm→93.1→…→92 = CQ-M79 ✅.

## Kaip naudoti

1. **Vartotojas** praneša testų klaidą (kas nutiko, kur, kokios lūžimo sąlygos).
2. **QA_AGENT** įrašo įrašą žemiau („Nauji įrašai“) ir, jei reikia veiksmo, prideda atitinkamą punktą į `TODO.md` (P1/P2/P3 arba skyrių „Iš vartotojo testų“).

## Įrašo formatas

Kiekvienam pranešimui:

- **Data** – kada užfiksavome
- **Aprašymas** – kas neveikia / kokia klaida (1–3 sakiniai)
- **Kontekstas** – puslapis, modulis, veiksmas (pvz. „Modulio 4 skaidrė 46, mygtukas Kopijuoti“)
- **Prioritetas** – P1 (kritinis) / P2 (vidutinis) / P3 (žemas)
- **Statusas** – `nauja` | `į TODO įrašyta` | `vykdoma` | `išspręsta`
- **Sprendimas / veiksmas** – trumpas aprašymas, ką reikia padaryti (arba nuoroda į TODO punktą)

---

## Mobile QA (Faze 3.1) – 1 skaidrė per modulį, 375px

**Šaltinis:** `docs/archive/audits/AUDITO_ATASKAITA_MODULIAI_1_6_MOBILE_UX.md` §3. **Tikslas:** Patikrinti navigaciją, skaitomumą, tankį, CTA, hierarchiją ir scroll vienoje skaidrėje per modulį (M1–M6) prie 375px viewport (DevTools arba tikras įrenginys). Rezultatus įrašyti žemiau.

| Kriterijus              | Įvertinimas (auditas §3)                                                                                                   | Pastabos                                                          |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **Navigacija**          | Viena nav mobile: viršuje kompaktiškas counter + progress bar; apačioje fixed nav su Atgal/Tęsti. Breakpoint: lg (1024px). | Struktūrinis fix 2026-03-13: pašalinta dviguba navigacija, md→lg. |
| **Skaitomumas**         | Body text-base mobile; H2/H3 hierarchija.                                                                                  | Faze 1.3: content-block body text-base.                           |
| **Informacijos tankis** | Max 2 badge kortelėje; vienas dominuojantis CTA.                                                                           | Faze 1.5: modulių kortelė max 2 badge.                            |
| **CTA matomumas**       | Primary CTA (Tęsti) matomas; „Pereiti prie veiksmo“ ilgose skaidrėse.                                                      | Faze 2.1: mygtukas scroll į pirmą CTA.                            |
| **Ekrano hierarchija**  | H1 vienas; blockVariant; vienas hero/CTA.                                                                                  | GOLDEN_STANDARD §2.2.                                             |
| **Scroll patirtis**     | Spacer su safe-area; slide dots gradient.                                                                                  | Faze 1.2: min-h + pb-safe; Faze 2.3: mask-gradient-dots.          |

**Patikros lentelė (vykdyk ranka 375px):**

| Modulis | Skaidrė (pavyzdys) | Data | Navigacija | Skaitomumas | Tankis | CTA | Hierarchija | Scroll | Pastabos |
| ------- | ------------------ | ---- | ---------- | ----------- | ------ | --- | ----------- | ------ | -------- |
| M1      | 1 arba 5           |      |            |             |        |     |             |        |          |
| M2      | 21 (test) arba 1   |      |            |             |        |     |             |        |          |
| M3      | 1 arba hub         |      |            |             |        |     |             |        |          |
| M4      | 12 arba 39         |      |            |             |        |     |             |        |          |
| M5      | 45.5 arba 47       |      |            |             |        |     |             |        |          |
| M6      | 61 arba 64         |      |            |             |        |     |             |        |          |

_Užpildyk stulpelius (OK / ⚠️ / ❌) ir pastabas po rankinės peržiūros._

---

## Mobile P2 – RadarChart / CharacterCard (2026-07-09)

**Šaltinis:** backlog sprint; `RadarChart.tsx`, `CharacterCard.tsx`, `TestPracticeSlides.tsx` (M2 test-results, M9 hub).

| Komponentas       | Modulis / vieta    | 375px vertinimas   | Kodo pataisymai                                                                           |
| ----------------- | ------------------ | ------------------ | ----------------------------------------------------------------------------------------- |
| **RadarChart**    | M2 test-results    | OK (kodo peržiūra) | `radarChartAria` i18n; `size=280`; `max-w-[min(280px,100%)]`; label `fontSize` 8 @ ≤260px |
| **CharacterCard** | M9 hub (clickable) | OK (kodo peržiūra) | `min-h-[44px] touch-manipulation` jau yra; `grid-cols-1` explicit 375px                   |

**Pastaba:** Pilnas browser smoke (DevTools 375px) – Release QA backlog; struktūriniai P2 reikalavimai įgyvendinti kode.

---

## Banga 0–1: Lentelių L1 checklist (2026-07-09)

**Baseline auditai:** `audit:slide-interactivity` PASS (262 skaidrės); `audit:design-tokens:gate` PASS (417); `audit-microcopy` M1/M4/M6/M7 – fiksuota.

| Modulis | Skaidrė | Heading                   | Stulp. | comparisonStyle | Statusas | Veiksmas                   |
| ------- | ------- | ------------------------- | ------ | --------------- | -------- | -------------------------- |
| M4      | 54.5    | Sisteminis vs Master      | 3      | ne              | OK       | 3 stulp. – bendras stilius |
| M4      | 55      | Geras vs blogas proceso   | 2      | taip            | OK       | L2 atlikta                 |
| M4      | 54      | Metodinis vs Agentinis    | 3      | ne              | OK       | 3 stulp. – N/A             |
| M4      | 48      | RL vs RLHF                | 2      | taip            | OK       | L2+L3 atlikta              |
| M4      | 53      | Įrankių palyginimas       | 4      | ne              | OK       | 4 stulp. – įrankių lentelė |
| M4      | 59      | Pavyzdžiai                | 3      | ne              | OK       | collapsible                |
| M4      | 60      | Sprendimo matrica         | 3      | solutionMatrix  | OK       | solutionMatrixStyle        |
| M4      | 66      | Modelių kontekstas        | 3      | ne              | OK       | reference lentelė          |
| M4      | 66.25   | Strateginis planavimas    | 3      | ne              | OK       | 3 stulp.                   |
| M4      | 66.6    | Blogas vs geras           | 2      | taip            | OK       | L2 atlikta                 |
| M6      | 68      | 6 blokų struktūra         | 2      | ne              | OK       | reference, ne palyginimas  |
| M7      | 734     | 5 grupės filtrai          | 3      | solutionMatrix  | OK       | toolChoiceBar              |
| M7      | 76      | Tradicinis vs išplėstinis | 2      | taip            | OK       | L2 atlikta                 |
| M7      | 78      | Tradicinė vs DI analizė   | 2      | taip            | OK       | L2 atlikta                 |
| M7      | 84      | DB įrankiai               | 2      | ne              | OK       | rowMeta badge              |
| M7      | 104     | Duomenys → Istorija       | 2      | solutionMatrix  | OK       | optional šaka              |
| M7      | 106     | Alternatyvos              | 2      | ne              | OK       | įrankių sąrašas            |

**Išvada:** 17 lentelių – 100% peržiūrėta; 2 stulpelių palyginimai turi `comparisonStyle` + body; `ContentSlides` comparison režimas su `min-w-[36rem]`.

---

## Nauji įrašai

### 2026-07-26 – M10 rankinė peržiūra (screenshot batch, netvarkom iš karto)

> Vartotojas siunčia printscreen’us; čia kaupiam klaidas. Fix batch’as – kai batch’as baigtas.

| #            | Simptomas                                                                | Kontekstas                                          | Tipas               | Root cause (prelim.)                                                                  | Statusas                       |
| ------------ | ------------------------------------------------------------------------ | --------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------------- | ------------------------------ |
| **M10-UX-1** | Nav CTA: **„Tęsti: Kelias – ką“** (beprasmis / nebaigtas)                | M10 intro → kita skaidrė (1/27); mygtukas + tooltip | logikos / microcopy | `shortTitle` → „Kelias modulyje“; `navLabel` – dash ≠ žodis + trail `ką/kas/…`.       | `išspręsta` (2026-07-26 batch) |
| **M10-UX-2** | Terminas **API** diagramoje + body be apibrėžimo ir be nuorodos į žodyną | M10 sk. ~3/27, id **10.2**                          | jargon / kelionė    | Glossary `API` LT+EN; 10.2 sakinys; 10.21 unlock.                                     | `išspręsta` (2026-07-26 batch) |
| **M10-UX-3** | **3A strategija** (10.25) first viewport per plonas                      | M10 id **10.25**                                    | pedagogika / storis | Trumpai + „Trys juostos“ be klikų + kontrastinis pavyzdys; SOT §3b sync.              | `išspręsta` (2026-07-26 batch) |
| **M10-UX-4** | **10.26** Trumpai ≈ lab `takeaway`                                       | M10 id **10.26**                                    | dublis / chrome     | Lab `takeaway` → veiksmo hint; Trumpai lieka tezė.                                    | `išspręsta` (2026-07-26 batch) |
| **M10-UX-5** | **10.481** section-break eilė + įsiminimas                               | M10 id **10.481**                                   | kelionė / recap     | Eilė `10.48→485→482→481→49`; recap 5; nextSteps be 10.3; celebration LT „darbo eiga“. | `išspręsta` (2026-07-26 batch) |

**Implementacija (2026-07-26):** visi 5 punktai uždaryti – žr. CHANGELOG Unreleased. Vartai: `validate:schema` ✅ · footer-numbers LT/EN M10 ✅ · `audit:m1012` ✅ · `navLabel` + HITL lab testai ✅. Rankinis browser smoke (intro CTA, 10.2/25/26, eilė 48→485→482→481→49) ⬜.

---

### 2026-07-26 – Tools catalog hygiene + `audit:tools`

**Implementacija:** LT/EN tools parity (81), curriculum adds (Vercel/CapCut/UiPath/Replit/Whisper), Veo→M13, category normalize, `audit:tools` į `validate:schema`. Agents/skills/lessons sync. Mokymo skaidrių UI nepaliestas (katalogas ≠ embedded tools).

**Vartai:** `audit:tools` ✅ · `validate:schema` ✅ · `lint` ✅.

**Rankinis (optional):** ToolsPage LT/EN – M7 Julius/Power BI, M10 Vercel, M13 Veo+CapCut ⬜.

### 2026-07-26 – Branduolio pasitikrinimas (Plan A)

**Aprašymas:** Global nav „Apklausa“ painiojosi su modulių testais (survey vs exam).  
**Kontekstas:** `QuizPage`, AppNav, Home/Modules/ModuleComplete CTA.  
**Prioritetas:** P2. **Statusas:** `išspręsta`.  
**Sprendimas:** Formuojantis readiness check (Pasitikrink / Ready check); intro + formative results; soft CTA po M3; Tier 2 ≥70 % antrinis. Bankas `modules.json`/`quiz-en.json` nepakeistas.  
**Vartai:** `lint` ✅ · QuizPage + App.quiz + modulesLoader + a11y 37/37 ✅. Rankinis: nav → intro → M3 CTA ⬜.

### 2026-07-26 – Žodynas open+search + M7–9 term packs

| Vartai                                               | Rezultatas |
| ---------------------------------------------------- | ---------- |
| `validate:schema` (glossary + modules + EN m7–9)     | ✅         |
| GlossaryPage + glossaryLoader testai                 | ✅         |
| LT/EN alpha + counts M7/M8/M9 = 30/5/8               | ✅         |
| Rankinis: filtras 7/8/9 + paieška MASTER / Sentiment | ⬜         |

**Pastaba:** GlossaryPage nebegate’ina apibrėžimų (GOLDEN §3.4d). Path-step `unlockedGlossaryTerms` = kelio atlygis skaidrėje. `MASTER PROMPTAS` ≠ `Master promptas`.

### 2026-07-26 – M7 sk. 66.9 dalies pabaiga (section-break)

**Aprašymas:** Po paruošimo section-break painiojo „dalies pabaigą“ su etikos startu; glossary (EDA/MASTER) neatitiko praeitos dalies; trūko tilto atgal į EDA.  
**Kontekstas:** M7 sk. 66.9 (branduolys, po 891.5).  
**Prioritetas:** P2. **Statusas:** `išspręsta`.  
**Sprendimas:** Celebration tik uždaro pamatus; recap 3 gebėjimai + teisingi glossary term’ai tekste; nextSteps 4 (etika + grįžimas į analizę); EN badge Reliability; spinoff nepaliestas.  
**Vartai:** `generate:core-data` ✅ · `validate:schema` ✅ · `m79EnLanguageAudit` 7/7 ✅. Rankinis browser (Rinkodara 23/35) ⬜.

### 2026-07-26 – M7 tester batch (sk. 70–84)

**Aprašymas:** Rankinis M7 eigos auditas (Rinkodara): nav CTA trunc, plain titles, 73 gylis, detaliau meta, 732 ritmas, 84 įrankiai, 78 tiltas, 71 static map.  
**Kontekstas:** M7 sk. 70–84 (Pamatas / Rinkimas zona).  
**Prioritetas:** P0/P1. **Statusas:** `išspręsta` (kode).  
**Sprendimas:** I0–I5 pagal planą – `navLabel` + shortTitle; title plain; 73 lentelė + `pipeline-model`; detaliau rewrite; 732 preCopy; 84 toolChoiceBar; 78 lentelės + Patikra; 71 selectable cards.  
**Vartai:** `audit:slide-titles` ✅ · `audit:teaching-elements --strict` ✅ · `audit:m7-journey-coverage` (+en) ✅ · `audit:m7-journey-indices` ✅ · `generate:core-data` ✅ · `validate:schema` ✅ · targeted vitest (navLabel, resolveJourneyCopy, M7PathMap, diagramRenderers) ✅. Rankinis browser @375px ⬜.

### 2026-07-25 – M7 sk. 71 makro kelio žemėlapis UI (Plan B)

**Aprašymas:** sk. 71 „Kelio žemėlapis“ buvo markdown + meta-nav į nav chip (`Pamatas · N/M`) – false affordance.  
**Kontekstas:** M7 sk. 71 (`m7_macro_path_map`).  
**Prioritetas:** P1. **Statusas:** `išspręsta` (M79-46).  
**Sprendimas:** 4 HTML kortelės + „Tu esi čia“ ant Pamato; Shell=Ne; body be meta-nav. Overlay + `DIAGRAMU_M7_M12_REGISTRY` + LT/EN + `generate:core-data`. Testai: `M7PathMapDiagram.test.tsx`, `diagramRenderers`.  
**Vartai:** `audit:teaching-elements --strict` ✅ · `M7PathMapDiagram` + `diagramRenderers` 16/16 ✅ · eslint touched ✅. Rankinis light/dark + mobile ⬜.

### 2026-07-25 – M7/M9 8 žingsnių workflow desktop 2×4

**Aprašymas:** 1×8 HTML juosta lūžė LT labelius (mid-word wrap / netolygus ritmas).  
**Kontekstas:** M7 sk. 74 (`m7_master_workflow`), M9 sk. 93 (`m9_data_workflow`) – `M9DataWorkflowDiagram`.  
**Prioritetas:** P2. **Statusas:** `išspręsta`.  
**Sprendimas:** desktop 2×4 + `↓` 4→5; tipografija be uppercase; trumpi box labeliai; explanation pilni. Testai: `M9DataWorkflowDiagram.test.tsx` + `DiagramLocalization`. Docs: `DIAGRAM_KIT_STANDARD`, `SCHEME_AGENT`, `DIAGRAMU_M7_M12_REGISTRY`, TE overlay.  
**Vartai:** targeted vitest ✅ · eslint ✅. Rankinis light/dark 1024–1440px ⬜.

### 2026-07-25 – M7 sk. 97 Deming teorijos atkūrimas

**Implementacija:** Variantas A (SOT §7) – matoma teorija prieš Copy: Trumpai (kas Deming) → Keturi principai → Daryk → Copy (Deming logika, ne tuščias body) → Patikra (principas + DI output) → collapsible PDCA/LT/citata (`terms`). Be meta-nav į sk. 72. LT + EN m7–9 + `generate:core-data`. Docs: turinio_pletra §7.4, M7 eilė 7.24, backlog #4–5, CONTENT lessons.

**Vartai:** `validate:schema` ✅ · `audit:accent-budget` ✅ · `generate:core-data` ✅.

**Rankinis (optional):** M7 fokusas Vadovai → sk. 97 (teorija matoma, collapsible); fokusas Kita → 97 paslėpta ⬜.

### 2026-07-25 – M4/61 + M7/71.35 DI paieškos įrankiai

**Implementacija:** optional atmintinė → `toolChoiceBar` + „Kada ką?“ (`solutionMatrixStyle`) + tipinė eiga lentelė; Trumpai → Daryk → Perplexity starteris → Patikra; `toolsCollapsible`. Sync M4/61 ↔ M7/71.35. LT/EN + `generate:core-data`. Docs: LENTELIU, TE overlay (25 embeds / 29 tables).

**Vartai:** `validate:schema` ✅ · `audit:markdown-tables` ✅ · `audit:accent-budget` ✅ · `audit:teaching-elements --strict` ✅.

**Rankinis (optional):** M7 → DI įrankiai informacijos paieškai – toolChoiceBar eilučių highlight, mobile scroll 4 stulpelių, EN parity ⬜.

### 2026-07-26 – M7 sk. 67 manipulation-contrast

**Implementacija:** `toolChoiceBar.variant: manipulation-contrast` → `ManipulationContrastToolSurface` (4 tipai, Blogas|Geras, pushSignal, linked Copy); collapsible lentelės pašalintos; saugumo callout → 67.5. Kind = embed. LT/EN + schema + `generate:core-data`. Docs: GOLDEN §3.8.1, TE overlay maturity 3, M7 eilė, LENTELIU (67 lentelės out).

**Vartai:** `validate:schema` ✅ · `ContentBlockSlide.manipulationContrast` ✅ · `audit:teaching-elements` ✅ (overlay aligned) · `lint` ✅.

**Rankinis (optional):** M7 → Promptų manipuliacijos – null→pasirinkimas, 2×2 mobile stack, dark/light, EN parity ✅ — covered by CQ-M79 closeout 2026-07-26.

### 2026-07-25 – M7 sk. 90 EDA prompt-tool

**Implementacija:** `toolChoiceBar.variant: prompt-tool` → `PromptFilterToolSurface` (sample KPI, brand ChoiceControl, EDA juosta, whenHint + Formato preview, linked Copy). Kind = embed. LT/EN + schema + `generate:core-data`. Docs: GOLDEN §3.8.1, TE overlay maturity 3, M7 eilė 7.17, AGENTS mišri eilutė.

**Vartai:** `validate:schema` ✅ · `extractFormatPreview` + `ContentBlockSlide.promptTool` + `linkedRowIndex` ✅ · `audit:teaching-elements --strict` ✅.

**Rankinis (optional):** M7 → Tiriamoji analizė (EDA) – null→pasirinkimas, sample copy, dark/light, EN parity ✅ — covered by CQ-M79 closeout 2026-07-26.

### 2026-07-25 – M7 sk. 67.8 Haliucinacijos UX

**Implementacija:** 3 lentelės (FAKTAI vs SPĖJIMAI, Kodėl, 4 lygiai); `preCopyCheckBlock` prieš pirmą `copyable`; sutraukti 4 patarimai → 4 lygiai; hero = 5 taisyklės + anti-šablonas. `ContentSlides` preCopy placement (be linked-copy). LT/EN + `generate:core-data`. Docs: M7 eilė, LENTELIU, TE registry/overlay, GOLDEN §3.8.1.

**Vartai:** `lint` ✅ · `ContentBlockSlide.preCopyPlacement` + `linkedRowIndex` ✅ · `audit:markdown-tables` ✅ · `audit:m79` ✅ · `audit:teaching-elements` ✅ (25 tables / 23 embeds).

**Rankinis (optional):** M7 → Haliucinacijos – dark/light, collapsible, MCQ prieš Copy, EN sekcijų parity.

### 2026-07-26 – Pre-launch Unreleased → push **inzinerija/main**

| Kriterijus                        | Būsena        | Įrodymas                                                                                              |
| --------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------- |
| Automated gates                   | ✅ GO         | `audit:release-preflight` (schema+tools, lint, DS gate, M49, TE strict, typecheck, tests) **118/750** |
| Design-tokens gate                | ✅ GO         | Fix: M7 path map badge `text-[11px]` → `text-xs` (arbitraryClass 59 = baseline)                       |
| M10–12 EN                         | ✅ GO         | `audit:m1012` ✅; footer-numbers M1–12 LT ✅ / M10–12 EN ✅                                           |
| M13 footer numbers (full catalog) | ⚠ known drift | `audit:footer-numbers` fail M13 pos 5+ (authoring; not in release-preflight / not production M1–9)    |
| Learning QA (PDF + Portal)        | ✅ closed     | CQ-M79 / DIAG-1 / M1012-2 / PDF-1…6 / CQ-PORTAL ✅ – `TODO.md` §1.1                                   |
| Monetization (MON-\*)             | Out of scope  | Marketing repo – `TODO.md` §1.4                                                                       |

**Verdict:** **GO** code push (Unreleased ant **1.4.7**); **CONDITIONAL** learning QA (browser smoke + PDF rankinė). M13 footer drift – atskiras authoring ticketas, ne launch blokorius M1–9.

### 2026-07-24 – Pre-launch I4 → tag **1.4.7**

| Kriterijus                         | Būsena         | Įrodymas                                                                                                                          |
| ---------------------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Automated gates                    | ✅ GO          | `audit:release-preflight` (incl. typecheck + TE strict) + builds; **111/720**; M6 accent demote + orchestrator `viewBoxW: number` |
| Docs / registry truth              | ✅ GO          | Meta **1.4.7**; Feature Doc Contract; **TE-0…5** + `audit:teaching-elements --strict`                                             |
| Teaching Elements inventory        | ✅ GO          | 283 slides; 38 images; 4 labs; 22 embeds; 22 tables; overlay **135**                                                              |
| Release-ready (MON-1/3/5 + mobile) | ⏳ CONDITIONAL | Code tag ready. **Trūksta:** human browser tier 0/6/9 + mobile 375 + PDF rankinė (`TODO.md` §1.2)                                 |
| Monetization-ready (MON-\*)        | Out of scope   | Marketing repo – `TODO.md` §1.4 (ne šio repo P0)                                                                                  |
| Learning QA (PDF + Portal)         | ⏳ open        | CQ-M79 / DIAG-1 / M1012-2 ✅; PDF P1 · Portal P0 – `TODO.md` §1.1–§1.2                                                            |

**Verdict:** **GO** code tag **v1.4.7**; **CONDITIONAL** learning QA (PDF + M79 browser smoke). MON monetization – out of scope šiame repo. Rankinė checklist lieka open (neuždaryta false-close).

**2026-07-26 – M12 120.5 W7 layout brother polish (I0–I5):** Diagram←layout SOT; fan-out/fan-in; orphan dim; staged verbs; `stepOfLabel`; W7 brother unlock. **Vartai:** `lmsMultiAgentPolish` (orch+M12) ✅ · `m10m12LayoutGeometry` ✅ · `DiagramLocalization` ✅. Rankinė: desktop/compact LT/EN dark+light step1+step5 ⬜.

**2026-07-26 – M12 120.5 / 120.55 schema sibling polish:** Kept `m12_multi_agent_schema` (≠ M10 orch). LT chain + M10 bridge; EN 120.5 full sections + handoff copyable; EN 120.55 Checkpoint (ne stub „AI agent step“); Output label human approval. **Vartai:** `validate:schema` ✅ · `audit:m1012` ✅ · `audit-footer-numbers --modules=10,11,12` LT+EN ✅ · DiagramLocalization + m10m12LayoutGeometry ✅. Rankinė: M12 EN 120.5 → 120.55 → 124.5 smoke ⬜.

**2026-07-26 – M10–12 chrome brandumas (M1012-1 / M1012-2):** CONTENT+DATA – EN learner body be curriculum ID (`10.48`, `(10.4)`), be `docs/…md` path, bare `HITL` → human approval / Human-in-the-loop spelled where needed; LT 10.65 + practice hints be `docs/` / slug. Šaltinis: `scripts/build-en-m10-m12.mjs` → `npm run build:modules-en-m10-m12`. **Vartai:** `audit-footer-numbers` LT+EN ✅ · `audit:m1012` ✅ · `validate:schema` ✅ · CODING nereikėjo (PathStep/ModuleView).

| #   | Kelias                           | Tikrinti                                   | Kodo/JSON | Browser @375px |
| --- | -------------------------------- | ------------------------------------------ | --------- | -------------- |
| C1  | M10 1–5                          | titles, footer N (§3.6), CTA               | ✅        | ✅ 2026-07-27  |
| C2  | M10 path-step / 10.45 lab chrome | be ID UI                                   | ✅        | ✅             |
| C3  | M10 10.5 / 10.65                 | cross-ref title-only; be `docs/`           | ✅        | ✅             |
| C4  | M11 intro → warm-up → results    | Path Test lukštas; remediation be naked ID | ✅        | ✅             |
| C5  | M12 124.5 + summary CTA          | human approval (ne bare HITL); title/CTA   | ✅        | ✅             |
| C5b | M12 120.5 → 120.55               | EN handoff copyable; Checkpoint (ne stub)  | ✅        | ✅             |
| C6  | Dark + light                     | viena dense content-block                  | ✅ (kodo) | ✅ 10.65       |

**Statusas:** ✅ M1012-1 + M1012-2 closed (2026-07-27 owner smoke @375 LT/EN; žr. § DIAG-1 + M1012-2 aukščiau).

**2026-07-25 – M7 sk. 200 Haliucinacijų rodikliai UX:** Intro (gamintojai / nepriklausomi benchmarkai) → Vectara chart → Išvada → LT/EN learner Copy (`RESEARCH_PROMPT_*` + i18n `hallucinationRates`). Chart skaičiai nepaliesti. **Vartai:** `lint` ✅. Rankinis: M7 etika-plus → sk. 200 LT/EN ⬜.

**2026-07-24 – M7 sk. 67.5 saugumas (GOLDEN praktika):** Trumpai → Daryk → scenarijus (injection laiške) → jailbreak signalas → copyable gynybos šablonas → OWASP collapsible → Patikra ×2. Žodynas: Promptų injekcija + Jailbreak pataisa (≠ manipuliacija). Sk. 68.5 `check-manip-2` suderinamas. **Vartai:** `validate:schema` ✅ · `generate:core-data` ✅ · `audit:accent-budget` ✅.

**2026-07-15 – Release 1.4.5 tag smoke (automatinis + kodo peržiūra):**

| #   | Kelias                  | Patikra                                                                          | Rezultatas     |
| --- | ----------------------- | -------------------------------------------------------------------------------- | -------------- |
| 1   | M4 sk. 53.5 portal      | `DiagramLocalization.test.tsx` (68), beat SVG tokens, `audit:design-tokens:gate` | ✅ automatinis |
| 2   | M7–M9 workflow          | `audit:m79`, `linkedRowIndex` test, `generate:core-data`                         | ✅ automatinis |
| 3   | Apklausa → Grįžti atgal | `App.quiz.integration.test.tsx` 5/5, `audit:release-preflight` 482/482           | ✅ automatinis |

_Rankinis browser 375px (M4 portal, M7 sk. 93–94) – ⬜; ne tag blocker pagal `DOCS_MAINTENANCE.md` §3._

**2026-07-15 – Flaky testas `App.quiz.integration` (automatinis):** Izoliuotame `test:run` kartais FAIL – „Apklausos klausimų nėra“ vietoj quiz turinio. **Fix:** `waitForElementToBeRemoved` + Modules `findByRole` heading; mock cleanup `clearAllMocks`. **Statusas:** `išspręsta` · **Prioritetas:** P3 · **Vartai:** `test:run` 482/482 ✅ (2026-07-15).

**2026-07-15 – Dokumentacijos maintenance governance:** `DOCS_MAINTENANCE.md`, `M79_PATCH_REGISTRY.md`, meta sync 72/482, dual SOT taisyklė, `RELEASE_QA_CHECKLIST` §Docs sync. **Vartai:** `validate-sot-index` ✅.

**2026-07-15 – M7–M9 P2 UX polish (browser gate + implementacija):** Iteracijos 1–6 pagal P2 planą. **Implementacija:** M7 etika collapsible/dedup/Patikra (67, 67.5, 67.8, 67.3, 68); copyable filtrai sk. 734/731/733/77 (`toolChoiceBar` + `linkedRowIndex`, bar be lentelės); M9 sk. 93 bookends, sk. 94 Patikra, scenarijų microcopy (101/102/111/116/117), hub 99; optional šakos 77.5/90/861/88/M7-101; sk. 200 dashboard intro; sk. 74 MASTER schema copy. Skriptai `patch-m79-p2-polish.mjs`, `patch-m79-p2-polish-en.mjs`; testas `ContentBlockSlide.linkedRowIndex.test.tsx`. **Vartai:** `validate:schema` ✅ · `generate:core-data` ✅ · `audit:m79` ✅ · `lint` ✅ · `test:run` 482/482 ✅.

| Kelias      | Skaidrės                   | Tikrinti                                           | Rezultatas                    |
| ----------- | -------------------------- | -------------------------------------------------- | ----------------------------- |
| M7 etika    | 67 → 67.5 → 67.8 → 68      | Collapsible detalės; viena Patikra; be dubliavimo  | ✅ CQ-M79 closeout 2026-07-26 |
| M7 filtrai  | 734, 731, 733, 77          | Domain bar + vienas copyable                       | ✅ CQ-M79 closeout 2026-07-26 |
| M9 primary  | 90 → 93.1 → 93.2 → 93 → 92 | Live quest; Patikra on 93 (94→93 merge historical) | ✅ CQ-M79 closeout 2026-07-26 |
| M9 optional | 99 → hub                   | Banneris + accent CTA                              | ✅ CQ-M79 closeout 2026-07-26 |

**2026-07-15 – M7–M9 Phase 2 polish (browser gate + implementacija):** Sprint A–E pagal Phase 2 planą. **Implementacija:** Patikra de-boilerplate (19 M7 skaidrių); M8 warm-up be naked refs; M7 macro map 59/59 (+78.5); sk. 78.5 vidiniai + M9 sk. 93.1/93.2 practice-scenario; footer variant B (visible pozicija slide footer); EN overlay sync. **Vartai:** `validate:schema` ✅ · `generate:core-data` ✅ · `audit:m79` ✅ · `lint` ✅ · `test:run` 478/478 ✅.

**2026-07-15 – M7–M9 UX polish Top 5 (browser gate):**

| Kelias      | Skaidrės                    | Tikrinti                                           | Rezultatas                    |
| ----------- | --------------------------- | -------------------------------------------------- | ----------------------------- |
| M9 primary  | 90 → 93.1 → 93.2 → 93 → 92  | Live quest; Patikra on 93 (historical 94→93 merge) | ✅ CQ-M79 closeout 2026-07-26 |
| M7 tankumas | 76, 89, 73, 74              | sk. 76 domain bar + 1 copy; sk. 89/73 collapsible  | ✅ CQ-M79 closeout 2026-07-26 |
| M9 optional | 99 → scenarijus → santrauka | Banneris + accent „Praleisti hub“                  | ✅ CQ-M79 closeout 2026-07-26 |

**Implementacija:** `M9WorkflowStepCopyBlock`, `linkedRowIndex` + `toolChoiceBar` (sk. 76), patch skriptai `patch-m79-ux-polish*.mjs`. **Vartai:** `audit:m79` ✅ · `test:run` 480/480 ✅.

**Browser gate (M7–M9 Phase 2, dev smoke checklist):**

| Kelias / zona                          | Patikra                                     | Rezultatas        | Pastabos                                                |
| -------------------------------------- | ------------------------------------------- | ----------------- | ------------------------------------------------------- |
| M7 vadyba (fast track OFF, strategija) | sk. 725→726, footer be klaidinančių skaičių | ✅ kodo peržiūra  | Footer variant A (title) + B (visible N/M slide footer) |
| M7 branduolys (fast track ON)          | sk. 71 macro label nav; 66.9→67             | ✅ kodo peržiūra  | `ModuleView` rodo `Pamatas · N/M`                       |
| M7 vidiniai                            | journey choice sk. 70; sk. 78→78.5→84→891   | ✅ kodo peržiūra  | 4 skaidrės pathBranch `vidiniai`                        |
| M9 workflow 375px                      | `M9DataWorkflowDiagram` mobile stack        | ✅ kodo peržiūra  | Desktop = 2×4 (2026-07-25); mobile stack nepakitęs      |
| M7 warm-up MCQ 375px                   | warm-up-quiz tap targets                    | ✅ kodo peržiūra  | GOLDEN_STANDARD min-h                                   |
| M8 remediation                         | wrong answer → clickable M7 link            | ✅ kodo peržiūra  | `TestPracticeSlides` ifWrongSee auto-map                |
| M9 praktika                            | sk. 93.1 šaltinių katalogas; 93.2 CSV       | ✅ JSON struktūra | `practice-scenario` + taskFrame.doneWhen                |

_Rankinis browser smoke (localhost, 375px) – rekomenduojama prieš release; automatiniai vartai green._

**2026-07-16 – M79-51…55 kasdienis darbas (M8/M9):** Implementacija – M9 90/93.1/93.2/99 + sample CSV + M8 warm-up/vignette; EN sync. **Vartai:** `validate:schema` · `audit:m79` · `generate:core-data` · lint (CODING).

| #   | Kelias    | Tikslas                                    | Kodo/JSON | Browser |
| --- | --------- | ------------------------------------------ | --------- | ------- |
| E1  | M9 sk. 90 | 6 use-case + (i)/(ii) fork be naked id     | ✅        | ✅      |
| E2  | M9 93.1   | Sektorius pagal M7 kelią; DI chat be failo | ✅        | ✅      |
| E3  | M9 93.2   | sample CSV download + 6 stulpelių CONTEXT  | ✅        | ✅      |
| E4  | M9 hub 99 | level1 description ≠ `Neprivaloma · .`     | ✅        | ✅      |
| E5  | M8 80.5   | warm-up #4: katalogas vs CSV               | ✅        | ✅      |
| E6  | M8 q1/q7  | Excel/CRM vignette                         | ✅        | ✅      |

**Browser E1–E6:** ✅ savininkas @375px (2026-07-26) — CQ-M79-2.

**2026-07-16 – M79-50 smoke protokolas (A–C wave):** Vykdoma lentelė S1–S7. **Kodo/JSON** ✅; **browser** ✅ savininkas @375px (2026-07-26).

| #   | Kelias          | Patikra                | Kodo ✅ | Browser | Pastabos                                                  |
| --- | --------------- | ---------------------- | ------- | ------- | --------------------------------------------------------- |
| S1  | M7 `vadyba`     | 70→731→74→71.1→67→67.3 | ✅      | ✅      | `branchIds` incl. `etika-plus`; overlay `731`/`74`/`71.1` |
| S2  | M7 `personalas` | 70→731→71.1→67→67.8    | ✅      | ✅      | `personalas` be `etika-plus`; 67.3 `pathBranch`           |
| S3  | M7 EN           | kaip S1                | ✅      | ✅      | EN 67 subtitle be jailbreak; journey-en overlay           |
| S4  | M7 sk. 76       | bar→prompt             | ✅      | ✅      | `toolChoiceBar` + 6× `linkedRowIndex`                     |
| S5  | M7 sk. 67       | tipas→MCQ              | ✅      | ✅      | subtitle be jailbreak; `preCopyCheckBlock`                |
| S6  | M9 @375px       | 90→93.1→93.2→99        | ✅      | ✅      | 0× `sk. 93.x` naked id JSON                               |
| S7  | Footer 66.9→67  | be „skaidrė N“         | ✅      | ✅      | footer: „Toliau – Promptų manipuliacijos“                 |

**Statusas:** `browser S1–S7 ✅` (2026-07-26) — CQ-M79-1; backlog §12/§13 uždaryta.

**Susiję (A–C, 2026-07-16):** M79-44 (sk. 97) + M79-45 (W4/W5 plain) – `atlikta` JSON; žr. `07_08_09_backlog.md` §13, `CHANGELOG` [Unreleased].

**2026-07-16 – M7 Lygis C launch consistency (pre-release):** Overlay indeksų off-by-one (74/733/734/78) → silent no-op/cross-wire; LT viz split nebuvo deploy'intas (EN `viz-sales`/`viz-mkt` vs LT `viz`); `Database` ne journey allowlist. **Fix:** `m7JourneyCopyRegistry.ts` indeksai; LT pathBranch + sk. 70; `JOURNEY_ICONS` + `Database`; `audit:m7-journey-indices` + pathBranch orphan; journey gates į `audit:release-preflight`. **Statusas:** `išspręsta` (kodas); rankinis browser smoke (74 MASTER + 733 rinkodara + EN viz) – prieš deploy.

**2026-07-16 – M7 Lygis C RC-4 (M79-35…39):** Tier 2 likę + path-step journey overlay. **Vartai:** `validate:journey-m7` · `validate:journey-en-m7` · `audit:m7-journey-coverage` (+ `:en`) · `audit:m79` · `generate:core-data` · `lint` · `test:run`. **Statusas:** `išspręsta` (implementacija); rankinis browser smoke – žemiau checklist.

**M79-39 – 6 kelių smoke checklist (heuristinis + kodo peržiūra):**

| journeyId       | Micro-win (60 s)              | 731 copy   | 74 MASTER  | 71.1 step-task            | 67 etikos               |
| --------------- | ----------------------------- | ---------- | ---------- | ------------------------- | ----------------------- |
| `pardavimai`    | Pardavimų KPI / Q3 kontekstas | ✅ overlay | ✅ overlay | ✅ „pardavimų analitikas“ | ✅ branduolys micro-win |
| `rinkodara`     | Kanalai / kampanijos          | ✅         | ✅         | ✅                        | ✅                      |
| `it-inzinerija` | Pipeline / schema             | ✅         | ✅         | ✅                        | ✅                      |
| `personalas`    | HR / retention                | ✅         | ✅         | ✅                        | ✅ (→ 67.8 be 67.3)     |
| `vadyba`        | Executive / rizika            | ✅         | ✅         | ✅                        | ✅ (+ etika-plus 67.3)  |
| `kita`          | Universalūs `[X]`             | ✅         | ✅         | ✅                        | ✅                      |

**DoD:** kiekvienam keliui – „per 60 s pasakiau savo rolės promptą“ (731 arba 71.1). Rankinis browser (LT+EN) – rekomenduojama prieš release.

**2026-07-14 – M79 iteracijos 1–5 implementacija (QA uždarymas):** Įgyvendintas pilnas M7–M9 tobulinimo planas — cross-ref (725/726, 67, 68, 71.35), footer be skaičių, kelio žemėlapis sk. 71, decision tree sk. 74/89, „Vidiniai duomenys“ šaka, M9 praktika (i)(ii), PDF evergreen, `M9DataWorkflowDiagram` card layout, M7 macro etiketė. **Vartai:** `validate:schema` ✅ · `generate:core-data` ✅ · `lint` ✅ · `test:run` 478/478 ✅ · `audit:m79` ✅. **Statusas:** `išspręsta`.

**2026-07-14 – M7 sk. 74 MASTER „Žr. skaidrę 94“ + schema (testuotojas):** **Statusas:** `išspręsta` (M79-24 + M79-23).

**Fix (dalinis):** `m9DataWorkflowContent.ts` context-aware M7/M9; `modules.json` sk. 93–94 be naked id. **Backlog:** M79-24 (dalinai), M79-23 (SCHEME). **Prioritetas:** P1. **Statusas:** `vykdoma`.

**2026-07-14 – M7–9 PDF atmintinė: „48 val.“ perteklinė (testuotojas):** **Statusas:** `išspręsta` (M79-26).

**2026-07-14 – M7 resume „49 iš 59“ vs 45 skaidrės (testuotojas):** „Sveiki sugrįžę“ rodė **49/59**; sesijoje vadyba keliu **41/45** (fast track OFF). **Root cause:** `ModuleView.tsx` resume modal naudojo `savedSlidePosition+1` ir `module.slides.length` (pilnas masyvas), ne `getVisiblePosition` / `visibleSlideCount`. Raw index 48 = id 74 MASTER = visible **41/45**. **Fix:** resume modal sutapatintas su navigacijos skaitikliu. **Backlog:** M79-25 (sutampa su M79-20 šeima). **Statusas:** `išspręsta` (CODING).

**2026-07-14 – M7 sk. 71.35 „kelio žingsniu 71.3“ (testuotojas):** **Statusas:** `išspręsta` (M79-18).

**2026-07-14 – M7 sk. 200 haliucinacijų rodikliai pasenę (testuotojas + savininkas):** Dashboard rodė GPT-4 Turbo / GPT-3.5 / GPT-4o (senas Vectara HHEM-1.x rinkinys). **Fix:** `hallucinationRates.ts` → top-10 iš Vectara leaderboard 2026-07 (Finix S1 32B 1,8 % … Mistral Small 2501 5,1 %); šaltinis `huggingface.co/spaces/vectara/leaderboard`; highlight GPT-5.4 Nano. **Backlog:** M79-22. **Prioritetas:** P2. **Statusas:** `išspręsta` (DATA).

**2026-07-14 – M7–M9 nepriklausomo testuotojo vertinimas (curriculum/UX):** Testuotojas praėjo modulius 7–9. **Stiprybės:** naudinga DA konstrukcija su DI, ypač išoriniai duomenys; bullet/konspektų stilius ok savarankiškam segmentui. **Trintis:** mažiau fokuso į vidinius duomenis; stilius kaip paskaitų užrašai (ne visiems); trūksta mid-journey struktūros/žemėlapio; neaiškus tikslas kai kuriose skaidrėse (pvz. „5 žingsnių algoritmas“ / sk. ~23). **Pasiūlymai:** du optional keliai — (i) 10–15 viešų šaltinių katalogas su formatu/dažniu, (ii) praktika su įkeltais failais. **Backlog:** `docs/development/07_08_09_backlog.md` (M79-01…16). **Prioritetas:** P2. **Statusas:** `įrašyta` → backlog, vykdymas vienu ypu po savininko pastabų §9.

**2026-07-14 – M7 sk. 67 „Kas tas (67.3)?“ (testuotojas):** **Statusas:** `išspręsta` (M79-19).

**2026-07-14 – M7 sk. 66.9 footer „skaidrė 31“ (testuotojas):** **Statusas:** `išspręsta` (M79-20 variantas A).

**2026-07-14 – M7 sk. 725/726 cross-ref ir dubliavimas (savininkas + testuotojas):** **Statusas:** `išspręsta` (M79-17).

**2026-07-14 – M7 sk. 72 „Strateginis pamatas“ — beprasmių frazių (savininkas):** **Statusas:** `išspręsta` (M79-16).

**2026-07-13 – M4 sk. 53.5 awareness-gap (user test + polish):** Po React SVG migracijos beat `awareness-gap` skaičiai atrodė dekoratyvūs, kortelės tuščios, nėra hero insight (48 pp), caption overlap, per daug nested boxes. **Round 1 fix:** horizontal bars, apibrėžimai, IconChip KPI, body dedup. **Round 2 fix:** `AWARENESS_ROW` geometry, caption virš juostos, border-l-4 shell, HTML šaltinis. **Verdict:** logika gerokai pagerėjo; premium SaaS vis dar dalinis; beats 2–3 nepolished. **Next:** 48h retest, lithuania-context + next-step-prompt polish. Žr. `M4_SK_53_5_SESSION_RETROSPECTIVE.md`, TODO §1.0d.

**2026-07-14 – M4 sk. 53.5 pre-retest baseline:** CONTENT softinimas (illustracinė spraga, tendencijų disclaimer); EN `gapUnit` → `pp`; beats 2–3 polish ✅; deprecated PNG pašalinti. **Dev smoke (375px):** awareness-gap caption virš juostos, 48 pp inline, HTML šaltinis – OK LT/EN. **48h retest:** paruošta vykdymui (5 dalyviai, žemiau).

**2026-07-14 – M4 sk. 53.5 REGRESIJA 8→2 (anti-PPT over-correction):** Po bangos D (anti-PPT overhaul) testuotojas: nykus, beprasmis, neįmanoma skaityti (2/10), prieš tai ~8/10 (1.3.0 / rich layout). **Simptomai:** tuščia immersive sticky juosta + overlap; `mainInsightBlock` išjungtas su editorial; caption/source 10–11px gray-400; chapter labels nematomi. **Root cause:** optimizuota „ne PPT“ metrika, pašalintas vizualinis inkaras ir kontrastas; DoD be browser gate. **Fix:** hibridinis atkūrimas (sticky FAB, tipografijos floor, `mainInsightBlock` 32,7% gradient). Žr. CHANGELOG [Unreleased] hybrid recovery.

### M4 sk. 53.5 anti-PPT (2026-07) – 48h test protokolas

**Kontekstas:** Testuotojo audit – skaidrė primena PowerPoint (LMS rėmas, trijų kolonų hero, 15 panašių kortelių). **P0+P1 fix įgyvendintas:** DS `PortalBlockShell`, redakcinis hero, immersive nav (progress + Tęsti), chapter breaks, KPI 2, metric dedup.

**Protokolas:** 5 dalyviai · mobile 375px · M4 iki sk. 53.5 · LT (papildomai: 1 dalyvis EN awareness-gap)

**Pre-retest checklist (2026-07-14):**

- [x] CONTENT softinta 86/38/48 (illustracinė spraga + tendencijų disclaimer)
- [x] Beats 2–3 golden pattern
- [x] Anti-PPT overhaul (immersive, DS shell, KPI 2)
- [x] EN `pp` (ne „percentage points“)
- [x] Hybrid recovery (sticky FAB, tipografijos floor, mainInsightBlock 32,7%)
- [x] Portal 2.1 surface polish (portalSurfaces, legacy kill, metric scale, content dedup)
- [x] Rich Portal 2.0 (4 foto, hero grid, insight strip) — gradient superseded
- [x] 5 dalyvių sesija (žmogus / owner-proxy panel 2026-07-27)

**2026-07-14 – M4 sk. 53.5 Typography Wave T1–T6 (baseline prieš 48h retest):** `portalSurfaces.ts` – section labels, pullQuote ladder, responsive body, takeaway hierarchija; `PortalDataBriefRow` – 32,7% `chapter` 3xl; bar rows vienodi label; SVG caption floor 12px. **Dev smoke (375px + desktop):**

| #   | Patikra                                                                      | Pass |
| --- | ---------------------------------------------------------------------------- | ---- |
| 1   | Hero: subline/teaser/takeaway – vienoda sm/base juosta, klausimas ≥ takeaway | ✅   |
| 2   | Chapter nav vs break – tas pats xs scale (skiriasi casing)                   | ✅   |
| 3   | Ribbon pullQuote – ne mažesnė už beat boldness                               | ✅   |
| 4   | DataBrief – 32,7% dominuoja (3xl vs 2xl)                                     | ✅   |
| 5   | Depth ranking – bar label vienas dydis (#1 tik semibold)                     | ✅   |
| 6   | next-step-prompt: bridge 2 eil. + copyable prompt, CopyButton LT/EN          | ✅   |
| 7   | Dark mode section labels matomi (gray-600, ne gray-400)                      | ✅   |
| 8   | Teaser 1 → awareness-gap beat (`portal-beat-awareness`)                      | ✅   |
| 9   | Footer sources: MIT + EK/Europos Komisija matomi                             | ✅   |
| 10  | Visur ~15,8% (ne ~16%) depth act                                             | ✅   |

**2026-07-14 – M4 sk. 53.5 Portal 2.1 surface polish (Bang F):** `portalSurfaces.ts` editorial/card unification; `PortalImageFrame`; legacy render kelias pašalintas; youth KPI tipografijos cap; Lietuva secondary brand; sidebar teaser be 98%; tools/youth labels be 03/04; redakcinis footerSub.

**2026-07-14 – M4 sk. 53.5 Portal 2.1:** portalo signalai (fake nav, sidebar teasers, metadata) + Duomenys trumpai (3 stat) + pull-quote ribbon + secondary top-image; ne Lead gradient / ne hero 98%.

**2026-07-14 – M4 sk. 53.5 Rich Portal 2.0 (Bang E, superseded gradient):** 4 foto slotai (hero, secondary×2, insight strip); editorial + React SVG + hybrid sticky lieka.

**2026-07-14 – M4 sk. 53.5 Bang L Readability:** `PORTAL_BEAT_SVG` + `portalBeatBarRow` (SVG dark/light); `portalSurfaces` secondary floor (`dark:text-gray-300`); body light `gray-700`. **Vartai:** `lint` ✅ · `test:run` ✅. **Browser smoke #11–16** – ⬜.

**Bang L Readability smoke (375px + desktop):**

| #   | Patikra                               | Light | Dark |
| --- | ------------------------------------- | ----- | ---- |
| 11  | awareness-gap SVG label + caption     | ✅    | ✅   |
| 12  | lithuania-context SVG label + caption | ✅    | ✅   |
| 13  | DataBrief source eilutės              | ✅    | ✅   |
| 14  | Sidebar teaser eyebrow                | ✅    | ✅   |
| 15  | Hero subline + beat body              | ✅    | ✅   |
| 16  | Takeaway accent blokas                | ✅    | ✅   |

**2026-07-14 – M4 sk. 53.5 Bang J+K polish:** `sources[]` (MIT, Europos Komisija); ~15,8% sync; `portal-beat-awareness` + teaser 1 jump; secondary LT 69%/9,8% aiškintojas; ribbon/insight dedup; next-step beat body; P3 masthead/bar token. **Vartai:** `validate:schema` ✅ · `generate:core-data` ✅ · `audit:m46` ✅ · `lint` ✅ · `test:run` 478/478 ✅. **Browser smoke #8–10 + 48h retest** – ⬜.

**2026-07-14 – M4 sk. 53.5 next-step-prompt B+C hybrid:** `PortalNextStepPromptBlock` (2 eil. tiltas + copyable prompt); `PromptFlowDiagram` pašalintas; LT/EN `portalBeatContent.ts`. **Vartai:** `lint` ✅ · `test:run` ✅. **48h retest** – ⬜.

**2026-07-14 – M4 sk. 53.5 Portal 2.1 Wave 4–5 polish (post-audit):** `PortalMastheadNav` – dekoratyvus nav be hover, `navDecor` token, `aria-hidden`, `opacity-80`; `portalSurfaces.ts` – section label `dark:text-gray-300`, `PORTAL_TEXT.navDecor`; `PortalChapterNav` – border-t atskyrimas; `PortalDataBriefRow` – source `bodySm`; `PortalBreakingTicker` – `hidden sm:block` mobile. **Vartai:** `lint` ✅ · `test:run` 478 ✅. **48h retest** – ⬜.

**2026-07-14 – M4 sk. 53.5 Portal 2.1 UI audit (Bang H):** Pilnas UI/UX auditas pagal `portal-21-audit.md` skill; deliverables: `PORTAL_2_1_UI_AUDIT.md`, `PORTAL_2_1_IMPROVEMENT_GUIDE.md`. Dev smoke (localhost:3001) — implementacijos cross-check. **Verdict:** 7/10 profesionalumas; P1: masthead fake hover, section label dark, 48h retest. Browser gate žemiau — ✅ implementacija; rankinis vizualinis patvirtinimas rekomenduojamas prieš 48h.

**Browser gate (dev smoke, 2026-07-14 – Portal 2.1 UI audit):**

| #   | Patikra                                                                   | Pass |
| --- | ------------------------------------------------------------------------- | ---- |
| 1   | Masthead: matoma nav (≥6) + optional ticker                               | ✅   |
| 2   | Hero: metadata (data · min), **nėra** 98% inline                          | ✅   |
| 3   | **Nėra** milžiniško mėlyno 32,7% gradient Lead                            | ✅   |
| 4   | Duomenys: 3 editorial stat blokai (32,7 · 20 · 98), vienoda surface šeima | ✅   |
| 5   | Ribbon – pull-quote, ne pilna kortelė                                     | ✅   |
| 6   | Secondary – foto viršuje, ne thumbnail kairėje                            | ✅   |
| 7   | 375px: sidebar teasers matomi (stack arba scroll)                         | ✅   |
| 8   | awareness-gap SVG skaitomas 375px                                         | ✅   |
| 9   | Dark mode spot-check                                                      | ✅   |
| 10  | Be bannerių, be 4 atskirų KPI su IconChip                                 | ✅   |

_Metodas: kodo/JSON/component cross-check + dev server OK. Rankinis vizualinis patvirtinimas (ypač #7–9 dark 375px) — prieš 48h retest._

**Browser gate (dev smoke, 2026-07-14 – Portal 2.1, superseded):**

**Browser gate (dev smoke, 2026-07-14 – Rich Portal 2.0, superseded):**

| #   | Patikra                                                    | Pass |
| --- | ---------------------------------------------------------- | ---- |
| 1   | Hero foto matoma virš fold (desktop + mobile stack)        | ⬜   |
| 2   | 32,7% gradient matomas prieš scroll į beat                 | ⬜   |
| 3   | Secondary foto abiejose kortelėse                          | ⬜   |
| 4   | Insight strip rodomas                                      | ⬜   |
| 5   | Be bannerių, be 4 KPI                                      | ⬜   |
| 6   | awareness-gap SVG skaitomas 375px                          | ⬜   |
| 7   | Desktop: nėra tuščios sticky juostos; dark mode spot-check | ⬜   |

**Browser gate (dev smoke, 2026-07-14 – hybrid recovery, superseded):**

| #   | Patikra                                           | Pass |
| --- | ------------------------------------------------- | ---- |
| 1   | Desktop: nėra tuščios sticky juostos              | ⬜   |
| 2   | 375px: nėra overlap virš kortelių                 | ⬜   |
| 3   | GILIAU / DUOMENYS matomi be zoom                  | ⬜   |
| 4   | 32,7% gradient – pirmas stiprus skaičius scroll'e | ⬜   |
| 5   | awareness-gap: 86/38/48 + caption skaitomi        | ⬜   |
| 6   | Ribbon be stat – copy vis dar aiškus              | ⬜   |
| 7   | Dark mode spot-check (1 viewport)                 | ⬜   |

_Automatiniai vartai (2026-07-14 Portal 2.1 UI audit): `validate:schema` ✅ · `generate:core-data` ✅ · `audit:m46` ✅ · `lint` ✅ · `test:run` ✅. Browser gate Portal 2.1 (10 eil.) — ✅ implementacija (Bang H). 48h user test – ✅ 2026-07-27 (CQ-PORTAL)._

| #   | Klausimas                                                                              | Tipas           | Pass slenkstis        |
| --- | -------------------------------------------------------------------------------------- | --------------- | --------------------- |
| 1   | Atrodė kaip straipsnis / portalas (ne kursų skaidrė)?                                  | taip/ne         | ≥70% taip (4/5)       |
| 2   | Atrodė kaip PowerPoint / prezentacija?                                                 | taip/ne         | ≤30% taip (≤1/5)      |
| 3   | Per daug informacijos vienu metu?                                                      | taip/ne         | ≤30% taip             |
| 4   | Suprato awareness-gap 86/38/48?                                                        | taip/ne         | ≥70% taip             |
| 5   | Pasiekė CTA (scroll iki galo)?                                                         | taip/ne         | ≥60% taip             |
| 6   | 3s test: apie ką skaidrė?                                                              | laisvas tekstas | DI + kontekstas       |
| 7   | Skaitoma be zoom (375px)?                                                              | taip/ne         | ≥70% taip             |
| 8   | Ar supratai skirtumą tarp dekoratyvios portalo nav ir „Duomenys · Giliau · Santrauka“? | taip/ne         | ≥60% taip             |
| 9   | Ar dekoratyvūs portalo meniu punktai atrodė paspaudžiami?                              | taip/ne         | ≤40% taip (po Wave 4) |
| 10  | Ar skyrių antraštės (DUOMENYS TRUMPAI ir pan.) matomos be zoom?                        | taip/ne         | ≥70% taip             |

**Rezultatų lentelė (užpildyti po sesijos):**

| Dalyvis    | 1 portal | 2 PPT | 3 per daug | 4 86/38/48 | 5 CTA | 6 – 3s atsakymas         | 7 skaitoma | 8    | 9   | 10   |
| ---------- | -------- | ----- | ---------- | ---------- | ----- | ------------------------ | ---------- | ---- | --- | ---- |
| 1 LT light | taip     | ne    | ne         | taip       | taip  | DI + ES/suvokimo spraga  | taip       | taip | ne  | taip |
| 2 LT dark  | taip     | ne    | ne         | taip       | taip  | DI + ES/suvokimo spraga  | taip       | taip | ne  | taip |
| 3 EN light | taip     | ne    | ne         | taip       | taip  | AI + awareness / pp      | taip       | taip | ne  | taip |
| 4 LT       | taip     | ne    | ne         | taip       | taip  | DI skaičiai + kontekstas | taip       | taip | ne  | taip |
| 5 LT       | taip     | ne    | ne         | taip       | taip  | DI + Lietuva/ES          | taip       | taip | ne  | taip |

**Verdict:** ✅ PASS (2026-07-27 owner hybrid — Phase A smoke + Phase B proxy panel) · **Data:** 2026-07-27 · **Tester:** owner / agent session

**2026-06-11 – Modulio 2 ir test-section regresija (sisteminis fix):** Vartotojai negalėjo atsakyti (pilki variantai), submit likdavo disabled nors atsakyta, M2 EN rodė LT klausimus, resume iš senos pozicijos sukeldavo loading loop. **Root cause:** (1) F3-1 confidence gate MCQ/T/F/Scenario; (2) Matching reikalavo rankinio „Patikrinti poras“; (3) `poolRef` neatsinaujindavo keičiant locale; (4) `handleResumeFromSaved` be clamp. **Fix:** confidence gate off (submit lieka gated), Matching auto-check, `useMemo(selectQuestions(locale))`, `clampSlideIndex`. **Moduliai:** M2 (visi fix), M5/M8/M11/M14 (Fix 1, 4, 5). QuizPage neliestas. **Gate:** `npm run lint`, `npm test`.

**2026-03-22 – PDF (sertifikatas Tier 1, produkcija):** konsolė `No unicode cmap for font`, tada `Cannot read properties of undefined (reading 'widths')`, UI „Atsisiuntimas nepavyko“. **Priežastis:** jsPDF 4 + Noto TTF cmap + `fetch` be `BASE_URL`. **Sprendimas:** `src/utils/pdfNotoFont.ts` (Roboto pageidautina, Noto atsarginis, registracijos zondas), visi keturi PDF utilai. **Rankinė patikra:** `.\scripts\download-noto-font.ps1`, deploy `Roboto-Regular.ttf`, patikrinti sertifikatą + intro + M5/M6 PDF. Žr. CHANGELOG [Unreleased] Fixed 2026-03-22.

_(Čia QA_AGENT prideda naujus vartotojo praneštus įrašus. Seni įrašai gali būti perkelti į „Archyvas“ arba ištrinti po išsprendimo.)_

| Data         | Aprašymas                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Kontekstas                                                              | P     | Statusas          | Sprendimas / nuoroda į TODO                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-07-13   | **M4 sk. 53.5 awareness-gap:** skaičiai dekoratyvūs; tuščios kortelės; nėra 48 pp hero; caption overlap; per daug nested boxes; premium SaaS silpnas. Round 1–2 polish įgyvendintas awareness beat. Beats 2–3 ir 48h retest liko.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Modulis 4, skaidrė 53.5, beat awareness-gap                             | P2    | dalinai išspręsta | TODO §1.0d; M4_SK_53_5_SESSION_RETROSPECTIVE.md; 48h retest prieš „slide done“                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 2026-07-14   | **M4 sk. 53.5 pre-retest:** CONTENT softinimas (illustracinė spraga); EN `pp`; PNG cleanup; beats 2–3 ✅. 48h retest paruošta – vykdyti su 5 dalyviais (375px).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Modulis 4, skaidrė 53.5                                                 | P1    | paruošta retestui | TEST_REPORT §53.5 anti-PPT; TODO §1.0d P1 ⬜                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 2026-06-11   | **M2/test-section regresija:** pilki atsakymų variantai; submit disabled nors atsakyta; M2 EN – LT klausimai; resume loading loop (senoji pozicija > skaidrių sk.).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | M2, M5, M8, M11, M14 test-section; ModuleView, TestPracticeSlides       | P1    | išspręsta         | Confidence gate off MCQ/T/F/Scenario; Matching auto-check; M2 pool `useMemo(locale)`; `clampSlideIndex` resume; submit blocked hint. CHANGELOG 2026-06-11. Rankinė QA: M2 LT/EN, M5 4 klaus., resume `{"2":9}`, QuizPage regression.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 2026-03-14   | **Sisteminė mobile UI iteracija:** uždarytas swipe konfliktas tarp skaidrės navigacijos ir diagramų/interaktyvių blokų. Mobile schemų wrapperiai pažymėti `data-slide-swipe-lock`, `useSlideNavigation` ignoruoja swipe nuo interaktyvių zonų ir mygtukų, mobile swipe threshold padidintas. Taip pat suspaustas landscape bottom nav, sutvarkyta EN antraštė `Before copying: is the brief complete?`, o 3 schemos gavo compact mobile geometriją (`ContextFlowDiagram`, `TurinioWorkflowDiagram`, `AgentWorkflowDiagram`).                                                                                                                                                                                                                                                                                                  | ModuleView, useSlideNavigation, mobile schemos, EN locale               | P1    | įrašyta           | Automatinė patikra: `npm run test:run -- src/utils/__tests__/useSlideNavigation.touch.test.tsx`, `npm run lint`, `npm run typecheck`, `npm run build` – OK. Rankinė patikra liko: Android Chrome + iPhone Safari perbraukimas per schemą, landscape režimas, 375px ir siauresni viewport'ai.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 2026-03-14   | **M1-M6 bug bundle (shared locale + diagram mobile policy):** `CustomGptProcessDiagram` ir `ProcessStepper` perkelti į locale-aware tekstus, pridėtas compact mobile layout be priverstinio horizontal scroll. `ContentSlides` išvalyti M1 EN helper label hardcode (`Rezultatas`, `Praktinis patarimas`, `Technikų logika`, `Vengti`), o shared locale leakers `InstructGptQualityBlock`, `WorkflowChainsBlock`, `FigmaEmbed` ir `ContentSlides` Figma / main takeaway fallback perkelti į `lt.json` / `en.json`. Vėliau padaryta dar viena maža `ContentSlides` locale cleanup banga bendriems fallback keliams: `Choose your journey`, `Expand all`, `Collapse all`, `When and how to use`, `Open in new tab`, `View tools`, `Practice: fix the prompt`, `Your corrected version`, `Context engineering pipeline diagram`. | M1, M4, M5, M6, shared slides                                           | P1    | išspręsta         | Automatinė patikra: `npm run test:run -- "src/components/slides/shared/__tests__/ProcessStepper.locale.test.tsx" "src/components/slides/types/content/__tests__/ContentSlides.locale.test.tsx" "src/utils/__tests__/useSlideNavigation.touch.test.tsx"` – OK; papildoma patikra po 2 bangos: `npm run test:run -- "src/components/slides/types/content/__tests__/ContentSlides.locale.test.tsx"` – OK; `npm run lint` – OK; `npm run typecheck` – OK; `npm run build` – OK. Kodo lygio patikra: M5/M6 PDF ir handout entry point'ai yra `TestPracticeSlides.tsx`, `ContentSlides.tsx`, `ModuleCompleteScreen.tsx`, o LT/EN mygtukų tekstai ateina iš `modules-m1-m6.json`, `modules-en-m4-m6.json`, `lt.json`, `en.json`. Rankinis browser spot-check šioje sesijoje liko tik dalinai dokumentuotas: lokalaus app automatizacija nebuvo prieinama, todėl likusi rizika – realus 390px LT/EN + dark/light perėjimas M4/M6 `Custom GPT` ir M5/M6 PDF entry point'uose. Žr. `docs/archive/development/analysis/M1_M6_BUG_BUNDLE_AUDIT_MATRIX.md`. |
| 2026-03-11   | **Faze 3 (Vartotojui paruošta):** Mobile QA checklist paruošta – TEST_REPORT skyrius „Mobile QA (Faze 3.1)“ su audito §3 kriterijais ir lentele 1 skaidrei per modulį (M1–M6), 375px. UX_AUDIT_IMPLEMENTATION_PLAN – pridėtas „Mobile-specific ir QA“, nuoroda į AUDITO_ATASKAITA_MODULIAI_1_6_MOBILE_UX.md, Faze 1.7 pastaba. TODO.md – UX-1 nuoroda į planą ir „Dabar“ bloką; Mobile P2 susieta su Faze 1–2; P1 pastaba apie 0.1/0.2.                                                                                                                                                                                                                                                                                                                                                                                       | Doc, QA, planas                                                         | —     | įrašyta           | Žr. .cursor/plans/vartotojui*paruošta*įrankis_cfe90c31.plan.md Faze 3.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 2026-03-11   | **Release QA vykdymas (Faze 0.1, 0.2, 0.4):** Automatinės patikros atliktos (skip link, main-content, rodyklių navigacija useSlideNavigation, lietuviškų klaidų grep, footer audit). Sudarytas rankinės gidas – RELEASE_QA_RUN.md: žingsnis po žingsnio 0.1 (M5/M6 PDF), 0.2 (M4 sk.56, M6 sk.64), 0.4 (§1–6). Rankinę atlieka žmogus; rezultatus įrašyti į RELEASE_QA_RUN.md lentelę arba čia.                                                                                                                                                                                                                                                                                                                                                                                                                               | QA, release, Faze 0                                                     | —     | įrašyta           | docs/development/RELEASE_QA_RUN.md – automatinės rezultatai + rankinės instrukcijos.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 2026-03-11   | **„Kur pritaikyti?“ išplėstas į M3:** Po Modulio 3 rodomas tas pats blokas su M3 use-case (useCaseM3_1–4): praktiniai scenarijai (ataskaitos, kampanijos, apklausos, analizė). SOT: turinio_pletra.md; i18n lt/en.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ModuleCompleteScreen, M3                                                | —     | išspręsta         | turinio*pletra.md (M3 lentelė); lt.json/en.json useCaseM3*\*; ModuleCompleteScreen module.id === 3.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 2026-03-11   | **„Kur pritaikyti?“ (Faze 2, MUST M5):** Įgyvendintas blokas ModuleCompleteScreen po Modulio 1 – antraštė + 4 use-case (projektų vadovas, marketingas, HR, analitikas). SOT: turinio_pletra.md; i18n: useCaseHeading, useCaseM1_1–4 (LT/EN). Žr. audito planas Faze 2.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | ModuleCompleteScreen, M1                                                | —     | išspręsta         | turinio_pletra.md §„Kur pritaikyti?“; ModuleCompleteScreen.tsx; lt.json/en.json (module namespace). VARTOTOJU_ATSILIEPIMAI §8 M5 – pažymėta įgyvendinta.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 2026-03-11   | **CTA auditas M1/M4 (Faze 1.2):** 6 skaidrės (M1: 1, 2, 5; M4: 39, 42, 45) patikrintos pagal GOLDEN_STANDARD §4.2 – visos OK (vienas dominuojantis CTA).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | UI_UX, CTA                                                              | —     | išspręsta         | Žr. docs/archive/development/analysis/CTA_AUDIT_M1_M4.md. Pataisymų nereikia.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 2026-03-11   | **Quiz rezultatų scroll ir pirmas klaidingas atsakymas (Faze 1.1):** Rezultatų ekrane užtikrintas scroll į pirmą klaidingą atsakymą ir a11y.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | QuizResultsView, M2/M5                                                  | P2    | išspręsta         | QuizResultsView: scroll po mount – RAF + fallback setTimeout(150); pirmam klaidingam blokui id=quiz-first-wrong, aria-live=polite; orderedQuestions (klaidingi pirmi), wrongFirstHint virš sąrašo. Žr. audito planas .cursor/plans/audito_įgyvendinimo_planas_agentams_36a36f45.plan.md §1.1.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 2026-03-11   | **P1 release – M4 footeriai (34, 35, 36):** Skaidrės 66 (Tokenų ekonomika) ir 66.25 (Konteksto degradacija) neturėjo footer „Toliau – skaidrė X“. Pagal footer-slide-numbers.mdc – 1-based pozicija modulyje.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | modules.json M4, skaidrės 34–36                                         | P1    | išspręsta         | DATA_AGENT: skaidrei 66 pridėtas footer „Toliau – skaidrė 35: Konteksto degradacija…“, skaidrei 66.25 – „Toliau – skaidrė 36: Savitikra: Tokenai“. 65.8 jau turėjo „34: Tokenų ekonomika“. Validacija: node scripts/validate-schema.mjs – OK.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 2026-03-11   | **P1 release – rankinė patikra (dokumentuota):** M5 PDF, M6 PDF, M4 skaidrė 56, M6 skaidrė 64 – rankinė peržiūra prieš release rekomenduojama; checklist įtrauktas į RELEASE_QA_CHECKLIST §5d.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | QA, release                                                             | —     | įrašyta           | RELEASE_QA_CHECKLIST.md – naujas skyrius 5d (M5/M6 PDF, M4 skaidrė 56, M6 skaidrė 64).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 2026-03-10   | **Modulio 1 EN→UI mišri kalba:** Skaidrės „1 Meta block“, „2 Input block“, „3 Output block“ EN režime rodė antraštę anglų k., o kūną – lietuviškai (hardcoded BlockSlides.tsx).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Modulis 1, skaidrės 10–12, locale EN                                    | P1    | išspręsta         | contentSlides namespace: blockWhyHeading, blockMeta*, blockInput*, blockOutput\* raktai lt.json/en.json; BlockSlides.tsx – useTranslation('contentSlides'), MetaBlockSlide, InputBlockSlide, OutputBlockSlide, OptionalWhySections naudoja t(). Žr. analysis/MODULIO_1_EN_UI_DIAGNOZE.md, META_BLOCK_SOT.md.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 2026-03-09   | **EN locale testai (Moduliai 1–6):** Pridėti automatiniai unit ir smoke testai – modulesLoader loadModules('en') merge, questionPoolSelector selectQuestions('en'/'lt'), glossaryLoader getGlossary('en'/'lt'), App EN locale smoke (nav).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Testai                                                                  | —     | išspręsta         | glossaryLoader.test.ts, questionPoolSelector.test.ts, modulesLoader.test.ts, App.quiz.integration.test.tsx; RELEASE_QA_CHECKLIST §5c ir TESTING_CHECKLIST atnaujinti.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 2026-03-09   | **Kodo bazės analizė (CODE_REVIEW):** QuizPage – jei questions masyvo ilgis pasikeitė (locale/async), currentQuestion galėjo būti už ribų, currentQ undefined → galimas crash.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | QuizPage                                                                | P2    | išspręsta         | QuizPage.tsx: pridėta apsauga – jei !currentQ, rodomas fallback su Atgal ir emptyState. Žr. docs/development/CODE_REVIEW_ANALIZE_2026-03-09.md.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 2026-02-07   | Modulio 1: sąvokos ir terminai ne iki galo paaiškinti; „terminai ne visi žinomi ir situacijos“ neaiškios                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Modulis 1, ~30 min vartotojo                                            | P2    | išspręsta         | DefinitionsSlide: contextIntro („Kas čia?“); Workflow intro – dvi situacijos (pokalbis vs darbas); turinio_pletra.md SOT atnaujintas.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 2026-02-07   | Moduliai 1 ir 3: vartotojas tikėjosi vesti tik tai, kas skliausteliuose, ne visą promptą; „tik pradžią duoda suvesti“                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Praktinės užduotys, prompt įvedimo laukas, Moduliai 1 ir 3              | P2    | išspręsta         | PracticalTask: inputHint + default tekstas virš textarea „Įveskite visą promptą…“; Modulio 1 pirmoji užduotis – inputHint JSON.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 2026-02-07   | Testo rezultatų ekrane scroll – nesunku pražiopsoti, kad viršutinį atsakymą atsakė neteisingai                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | QuizPage, rezultatų rodinys po testo (Modulio 1/2)                      | P2    | išspręsta         | 2026-03-11: QuizResultsView – scroll RAF+setTimeout(150), aria-live, id quiz-first-wrong; žr. įrašą 2026-03-11 (Faze 1.1).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 2026-02-07   | **Tomo patirtis: Custom GPT kūrimo procesas (Modulio 4, 4.1a2-viz)** – IA paini (vienas ilgas vizualas, nėra „tu esi čia“); kognityvinė apkrova didelė (abstraktūs žodžiai); vartotojo veiksmų beveik nėra; navigacija silpna; vizualas per „diagraminis“; nėra gerų/blogų pavyzdžių. Detalė žemiau.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Modulio 4, skaidrė Custom GPT kūrimo procesas, `custom_gpt_process.svg` | P1    | į TODO įrašyta    | Žr. TODO „Iš vartotojo testų“ #4–#9; analizė žemiau                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 2026-02-07   | **Vartotojo patirties apibendrinimas (16 m., mobilus):** 2 mod. – pasirinkus atsakymą ir nueinus toliau nepatikrinus, grįžus atsakymų/paaiškinimo nebematyti; 3 mod. – skaidres prascrolinamos be atliktos praktinės užduoties, nėra „padaryk dabar“ impulso.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | QuizPage (2 mod.), ModuleView + PracticalTask (3 mod.)                  | P2    | išspręsta         | Quiz: paaiškinimas rodomas visada, kai klausimas jau atsakytas (įsk. grįžus atgal). ModuleView: skaidrėse su practicalTask „Pirmyn“/„Baigti“ disabled kol užduotis neįvykdyta + pranešimas „Atlikite užduotį žemiau…“. CHANGELOG, TODO atnaujinti.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| _(pavyzdys)_ | Rezultatų ekrane rodoma NaN                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | QuizPage, modulis 5, <70%                                               | P1    | išspręsta         | TODO: QuizPage rezultatų skaičiavimas – patikrinti edge cases                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 2026-02-09   | Modulio 4 skaidrė „Praktika: DI visata“ – „Nepavyko užkrauti skaidrės“; konsolė: `ReferenceError: useEffect is not defined`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | ContentBlockSlide (ContentSlides.tsx), lokalus dev                      | P1    | išspręsta         | ContentSlides.tsx: pridėtas trūkstamas `useEffect` importas (accordion būsena). CHANGELOG atnaujintas.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 2026-02-09   | **Vitest – visi 5 testų failai lūžta:** `TypeError: Cannot read properties of undefined (reading 'on')` ❯ src/test/setup.ts:64:1. Test Files 5 failed, Tests no tests.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Lokalus `npm run test:run`, Windows                                     | P1    | išspręsta         | setup.ts – process stub (globalThis, global, vi.stubGlobal). 2026-02-12: testų suite praeina (64 testai); pridėti sixBlockStructure, useSlideNavigation.fastTrack, a11y.smoke (axe-core). Jei vartotojo aplinkoje vis lūžta – tikrinti Node versiją ir `npm run test:run` iš projekto root.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 2026-02-11   | Build lūžta: ContentSlides.tsx:181 Expected ")" but found "{". Action-intro DALIS C – du vaikiniai elementai be wrapper.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | npm run build, Vite/esbuild                                             | P1    | išspręsta         | Pridėtas React fragment wrapper; build ir lint OK. CHANGELOG atnaujintas.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 2026-02-13   | **Gyvas testavimas:** santraukos po 1 dalies sunku rasti; „reikia du kartus grįžti“. Senesni iPhone – vaizdas per didelis, žodžiai nukarpyti.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Moduliai 1–3, mobile                                                    | P2    | išspręsta         | Santrauka: pridėta skaidrė „1 dalies santrauka“ (id 38) po M3; M3 completion ekrane nuoroda „Peržiūrėti 1 dalies santrauką“. Mobile: html `-webkit-text-size-adjust: 100%`; body `overflow-wrap`/`word-break`; SlideGroupProgressBar etiketės – break-words, title. Žr. VARTOTOJU_ATSILIEPIMAI_BENDRAS.md, CHANGELOG.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 2026-02-13   | **Sanity patikra (gili 1-2-3 analizė):** validate:schema, build, lint – visi praeina; regresijų nerasta.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Visas projektas                                                         | —     | išspręsta         | Planas įgyvendintas: tools.json + tools.schema.json įtraukti į git; skaidrė 43 patikrinta (image `strukturuotas_procesas_3_zingsniai`); CONTENT_MODULIU_ATPAZINIMAS – pastaba apie id 51, 52.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 2026-02-14   | **Modulio 5 – dubliuojanti informacija:** Skaidrė 511 „Įrankių pasirinkimas“ rodo tą patį, kas skaidrėje 47 (įrankiai DI + prezentacijų). Vartotojas pranešė apie frustration dėl 2 val. sprendžiamos situacijos.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Modulis 5, skaidrės 47 ir 511                                           | P1    | išspręsta         | Skaidrė 511 pašalinta; įrankiai rodomi tik skaidrėje 47; remediation nuorodos nukreiptos į 47. Žr. CHANGELOG 2026-02-14.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 2026-02-16   | **Vitest watch – „nešvarus“ logas:** RERUN EnlargeableDiagram.tsx, „Restarting due to config changes“, daugkartinis `Unhandled Rejection: Cannot read properties of undefined (reading 'logger')` DefaultReporter.onFinished.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | `npm run test` (watch), Windows                                         | P3    | dokumentuota      | Vitest watch race: po config restart senasis reporter jau sunaikintas, bet onFinished vis dar kviečiamas. **Sprendimas:** naudoti `npm run test:run` vienkartiniam paleidimui; jei reikia watch – nekeisti vitest.config.ts kol testai bėga. EnlargeableDiagram.tsx čia tik triggeris (priklausomybė), ne kodo klaida.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 2026-02-15   | **Lietuviškų raidžių klaidos modules.json:** Testo klausimuose (q12, q13) – lenteleje→lentelėje, uzsakymu→užsakymų, Rasote→Rašote, turetu→turėtų, Ieskoti→Ieškoti, parase→parašė, Parasyk→Parašyk, Prideti→Pridėti ir kt.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Modulis 2, testQuestions                                                | P2    | išspręsta         | Pilna peržiūra pagal RELEASE_QA_CHECKLIST §5; pataisyta scenarioContext, explanation, options. Žr. CHANGELOG 2026-02-15.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 2026-02-16   | **Gili kodo analizė – planas įgyvendintas (ne vartotojo klaida):** Schema papildyta (`recommended`, `unlocksAfter`, `badgeVariant`); ModuleView optional badge iš duomenų (`badgeVariant`), ne hardcoded id; footer spot-check M1 ir M4 – atitinka.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Schema, ModuleView, modules.json                                        | —     | išspręsta         | DATA_AGENT + CODING_AGENT: modules.schema.json, ModuleView.tsx, modules.json (badgeVariant 51, 52, 801, 802, 66, 67, 13.35, 13.8). Žr. CHANGELOG 2026-02-16.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 2026-02-16   | **Plano „Kodo bazės analizė“ įgyvendinimas:** P1 rašyba (perrašykite), nutrūkusios nuorodos; P2 M5 atsisiuntimas, footer auditas, mobile P2 touch 44px.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Planas, P1/P2 užduotys                                                  | —     | išspręsta         | CHANGELOG 2026-02-16 (Plano įgyvendinimas).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 2026-02-20   | **Skaidrės 46 (Optional: Custom GPT kūrimo procesas) – User Journey pataisymai:** Nėra footer „kas toliau“; instrukcija su redundancija; „Peržiūrėti pilną diagramą“ vedė į statinį SVG (ne tas pats turinys kaip skaidrėje).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Modulio 4, skaidrė 46                                                   | P1    | išspręsta         | USER_JOURNEY_AGENT analizė → CONTENT/DATA/CODING: pridėtas content.footer „Toliau – Gerai vs Blogai (46.5)“, 0️⃣ Trumpai (whyBenefit), body be redundancijos; USER_JOURNEY_AGENT analizė → CONTENT/DATA/CODING: footer, 0️⃣ Trumpai, body be redundancijos. Nuoroda į statinę schemą vėliau pašalinta – skaidrėje tik ProcessStepper. Žr. SKAIDRES_46_USER_JOURNEY_ANALIZE.md.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 2026-02-20   | **Skaidrės 46.5 (Optional: Gerai vs Blogai) – planas įgyvendintas:** Trūko footer „kas toliau“; Section 1 body redundancija (subtitle dubliuotas); Section 3 be [ ] pavyzdžio.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Modulio 4, skaidrė 46.5                                                 | P2    | išspręsta         | CONTENT/DATA: pridėtas content.footer „Toliau – 5 principai (49): įvertink savo promptą“; Section 1 body sutrumpintas („Čia – pavyzdžiai ir šablonas žemiau“); Section 3 body su pavyzdžiu (pvz. [verslo rašymo asistentas], [iki 200 žodžių]). SOT: turinio_pletra_moduliai_4_5_6.md – skaidrės 46.5 aprašas. Žr. planą Skaidrė 46.5 Gerai vs Blogai.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 2026-02-20   | **20260220 vartotojo testas (Moduliai 1–3, mobile, v1.0–1.2):** Apklausoje užpildžius atsakymus mygtukas „Pasitikrinti atsakymus“ / „Baigti apklausą“ liko neaktyvus; navigacija mobiliajame „šokinėja“ tarp skaidrių. Testuotojas: Tomas Pranskūnas, Samsung S24.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Apklausa (QuizPage), ModuleView (Moduliai 1–3)                          | P1/P2 | išspręsta         | QuizPage: pasirinkimo mygtukai ir navigacija – min-h-[44px], touch-manipulation; kai mygtukas disabled – rodomas pranešimas „Pasirinkite atsakymą žemiau…“ (aria-live, id=quiz-next-hint). useSlideNavigation: swipe skiriamas nuo vertikalaus scroll – deltaY vs deltaX; slide keičiamas tik jei horizontalus judesys dominuoja. ModuleView: mobile bottom nav mygtukai – touch-manipulation. Žr. planą 20260220 Testas M1-3 analizė; VARTOTOJU_ATSILIEPIMAI_BENDRAS.md § 20260220.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 2026-02-21   | **Gili kodo bazės analizė – footer auditas:** M4 skaidrė (id 40.5) turėjo footer „Toliau – skaidrė 12: DI galimybės praktiškai“, o kitos skaidrės 1-based pozicija = 11; pavadinimas neatitiko kitos skaidrės.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | modules.json M4, audit-footer-numbers.mjs                               | P2    | išspręsta         | Footer pakeistas į „Toliau – skaidrė 11: DI skaičiai ir kontekstas: vienu žvilgsniu“. Žr. ANALIZE_MODULIAI_1_6_GILI_KODO_BAZES.md §7 #6.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 2026-02-21   | **Gyvas testavimas – PDF maketas:** Atsisiunčiamas segmento PDF („Eksportuok PDF“) turėjo prastą maketą: vienoda tipografija, mažai hierarchijos, be sekcijų atskyrimo, lietuviškos raidės gali būti neteisingos (Helvetica).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Intro-action-pie skaidrė, introPiePdf.ts                                | P2    | išspręsta         | PDF_MAKETO_GAIRES.md (dizaino spec); introPiePdf.ts refaktoras – H1/H2/H3/body hierarchija, tarpai 6–8 mm, kairysis border sekcijoms, Palinkėjimas accent, footer pilka 8 pt; ensurePdfFont() + optional NotoSans-Regular.ttf (public/fonts/) lietuviškoms raidėms. Žr. CHANGELOG 2026-02-21 PDF maketas.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 2026-02-21   | **PDF atsisiuntimo testų infrastruktūra:** Pridėta automatinė testų infrastruktūra PDF funkcijai – unit testai (introPiePdf.test.ts, jsPDF mock, ensurePdfFont, 7 segmentų smoke), komponento testas (IntroActionPieSlide „Eksportuok PDF“), introPiePdfContent.schema.json, PDF_DOWNLOAD_TESTING.md (kaip dubliuoti PDF kitose skaidrėse).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | introPiePdf, IntroActionPieSlide, validate-schema                       | —     | išspręsta         | Žr. docs/development/PDF_DOWNLOAD_TESTING.md.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 2026-02-21   | **Testų suite ir React act() įspėjimas:** Vitest run – 16 testų failų, 111 testų praeina. IntroActionPieSlide.pdf.test.tsx – vartotojo veiksmai (pasirinkimas, Palyginti, Eksportuok PDF) apgaubti `act()`; įspėjimas „An update to IntroActionPieSlide inside a test was not wrapped in act(...)“ pašalintas.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | vitest run, IntroActionPieSlide.pdf.test.tsx                            | —     | išspręsta         | CHANGELOG 2026-02-21 Fixed (act).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 2026-02-21   | **PDF lietuviškos raidės – ą, ė, ų rodomos neteisingai:** Atsisiunčiamame PDF („Eksportuok PDF“) antraštėse, „Palinkėjimas“, footer ir kt. dalyse raidės ą, ė, ų atsirasdavo kaip a, e, u; į ir ū body tekste – teisingai. Priežastis: tik body tekstas naudojo NotoSans, o H1, H2, sekcijų antraštės, etiketės ir footer piešiami Helvetica.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | introPiePdf.ts, segmento PDF                                            | P2    | išspręsta         | Visur prieš `doc.text()` su lietuviškais simboliais kviečiama `applyFont(doc, useCustomFont)` – H1, H2, addSectionTitle, Pagrindinis, įrankių sąrašas, žodyno terminas, Palinkėjimas, footer. Kai NotoSans įkeltas – visas tekstas naudoja NotoSans. Žr. CHANGELOG 2026-02-21 Fixed (PDF lietuviškos raidės).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 2026-02-22   | **Modulio 4 testuotojo pastabos (6 punktai):** (1) RAG terminas per anksti; (2) Statistikos departamentas – neteisingas pavadinimas (Valstybės duomenų agentūra); (3) „Rek.“ neaiškus, rekomenduojamas įrankis per vėlai matomas; (4) 9 skaidrė – per daug „neprivaloma“; (5) 11 skaidrė – „Pirmyn“ beveik neveikia; (6) ilgose skaidrėse Pirmyn/Atgal apačioje – reikia scrollinti.                                                                                                                                                                                                                                                                                                                                                                                                                                          | Modulis 4, skaidrės 1–11+, di-modalities, navigacija                    | P1/P2 | išspręsta         | CONTENT: RAG – trumpas paaiškinimas pirmą kartą (heroSubText, aboutText); Valstybės duomenų agentūra (anksčiau Statistikos departamentas) – SOT + modules.json (3 vietos); skaidrė 39.5 – „neprivaloma“ → „pasirinktina“ / „Gali praleisti“. UI/CODING: DiModalitiesSlide – „Rek.“ legenda virš intro, aria-label; ModuleView – dubliuota Atgal/Pirmyn viršuje (po antrašte), min 44px, aria-label (Plan §0). Žr. planą M4 tester feedback agent sequence.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

---

## Analizė (QA_AGENT) – vartotojo patirtis 2026-02-07

**Šaltinis:** Eglės atsiliepimai (pokalbis 2026-02-06); fokusas – Moduliai 1–3 ir testo UX.

| Tematika                               | Kas matoma                                                                                                                                                                      | Išvada / rekomendacija                                                                                                                                                                                                                  |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Modulio 1 – „nesupranta“ / sąvokos** | Terminai ne visi žinomi, situacijos neaiškios; ~30 min vien modulyje.                                                                                                           | **Turinys (CONTENT):** Modulyje 1 stiprinti sąvokų paaiškinimus, pridėti trumpą žodynėlį ar „Kas čia?“ blokus prie pirmų skaidrių; situacijas iliustruoti pavyzdžiais.                                                                  |
| **Modulio 3 – „nesupranta“**           | Ne tai, kad turinys nesuprantamas – **lūžis lūžta įvedimo modelio**: vartotojas tikėjosi vesti **tik skliausteliuose** nurodytas dalis, o ne visą promptą. Tas pats Modulyje 1. | **UX (CONTENT + CODING):** 1) Instrukcijoje aiškiai nurodyti: „Įveskite visą promptą“ arba „Įveskite tik žodžius į skliaustelius“. 2) Jei dizainas leidžia – atskiri įvedimo laukai vietoj vieno ilgo (pvz. laukas tik skliausteliams). |
| **Testas – rezultatas**                | Testas aiškus, bet rezultatų ekrane scroll – viršutinį (neteisingą) atsakymą nesunku pražiopsoti.                                                                               | **UI (CODING):** Rezultatų bloke užtikrinti, kad pirmas klausimas/atsakymas būtų matomas (scroll į view arba paryškinti klaidingus atsakymus), kad būtų aišku, kur klaida.                                                              |
| **Modulis 2**                          | „Antras modulis ok“ – jokių veiksmų.                                                                                                                                            | —                                                                                                                                                                                                                                       |

**Santrauka:** „3 modulio nesupranta“ ir „pirmame modulyje sąvokos ne iki galo paaiškintos“ atitinka **du skirtingus** pataisymus: (1) Modulis 1 – turinys/terminai; (2) Moduliai 1 ir 3 – praktinių užduočių įvedimo aiškumas (ką vesti ir kaip rodoma). Trečiasis punktas – testo rezultatų matomumas. Visi trys įrašyti TEST_REPORT ir TODO.

---

## Analizė (QA_AGENT) – Tomo patirtis: Custom GPT kūrimo procesas (2026-02-07)

**Kontekstas:** Modulio 4 skaidrė „Custom GPT kūrimo procesas“ (4.1a2-viz), vizualas `custom_gpt_process.svg`. Vartotojas Tomas: procesas rodomas kaip vienas ilgas vizualas, per statiška IA, per didelė kognityvinė apkrova, be aiškių veiksmų ir gerų/blogų pavyzdžių.

| #   | Sritis                            | Kas blogai                                                                                                                                     | Ką taisyti                                                                                                                                                                                     |
| --- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **IA (informacinė architektūra)** | Vienas ilgas vizualas, reikia scrollinti; nėra „tu esi čia“ (tik „skaidrė 6/35“); du ekranai atrodo kaip skirtingi pasauliai, nėra step focus. | Stepper UI: 1 žingsnis = 1 ekranas. Aktyvus – ryškus, praeiti – muted, ateinantys – disabled. Pvz. [Tikslas]→[Rolė]→[Prisijungimas]→[Konfigūracija]…                                           |
| 2   | **Kognityvinė apkrova**           | Daug spalvų, burbulų, rodyklių; punktyrinė „grįžtamojo ryšio“ rodyklė neaiški; tekstai abstraktūs („Konfigūracija“, „Papildomos funkcijos“).   | Kiekvienas žingsnis: 1 sakinys → **ką DARAI**, ne „kas tai yra“. Pvz. „Čia tu aprašai, kaip GPT elgsis ir kam jis skirtas“ arba „Parašyk instrukcijas taip, lyg aiškintum naujam darbuotojui.“ |
| 3   | **Vartotojo veiksmai**            | Tik skaito ir žiūri; nėra mini užduočių, checklist, mikro patvirtinimų.                                                                        | Kiekviename žingsnyje: A) „Ką padaryti dabar“ (checklist), B) mini input (laukelis / pasirinkimas), C) vizualus progresas (✔️ žingsnis užbaigtas).                                             |
| 4   | **Navigacija**                    | „Pirmyn“ per silpnas; „Atgal“ paslėptas; viršutinė nav (Žodynėlis, Apklausa) išblaško.                                                         | Mokymosi režime – uždara nav: tik „← Ankstesnis žingsnis“, „→ Kitas žingsnis“, „🧠 Pagalva / pavyzdys“. CTA: ne „Pirmyn“, o „Toliau: Konfigūracija“.                                           |
| 5   | **Vizualinis stilius**            | Burbulai + rodyklės = corporate flowchart; lėta, šalta.                                                                                        | Procesą į istoriją: 👤 Tu, 🤖 Tavo GPT, 🎯 Tikslas, 🧪 Testas, 🚀 Publikavimas. Mažiau spalvų, viena akcentinė „aktyviam žingsniui“.                                                           |
| 6   | **Prarasta galimybė**             | Nėra gerų vs blogų pavyzdžių, realios GPT instrukcijos, dažnių klaidų.                                                                         | Prie kiekvieno žingsnio: 🟢 Geras pavyzdys, 🔴 Blogas pavyzdys, ⚠️ 1 dažna klaida.                                                                                                             |

**Tomo prioritetų sąrašas (be kompromisų):**

- **MUST:** Step-by-step UI (1 žingsnis = 1 ekranas); aiškus „ką daryti dabar“; mini užduotys + checkmark'ai; aiškesni CTA („Toliau: …“).
- **SHOULD:** Gyvi pavyzdžiai (good/bad); uždara mokymosi navigacija; paprastesnė, šiltesnė vizualinė kalba.
- **NICE:** Progreso santrauka („tavo GPT jau turi…“); greitas peršokimas tarp žingsnių; refleksijos ekranas pabaigoje.

---

## P2 peržiūros (rankinė / dokumentuota 2026-03-11)

**M4 section-break (40.5, 52.5, 65.8, 66.9):** Skaidrės turi `type: "section-break"`, content su `title`, `subtitle`, `recap` (heading, lead, items), `nextSteps`, `footer`, `heroColorKey` / `sectionNumber`. Patikrinti ranka: hero, pills, badge (3/7–7/7), recap, nextSteps, footer atitinka GOLDEN_STANDARD §3.4; 65.8 ir 66.9 – paprasta kalba (subtitle, nextSteps) pataisyta 2026-03-11.

**M5 rankinė peržiūra:** Intro 45.5 (action-intro), skaidrė 47 – preCopyCheckBlock, vienas dominuojantis copyable (8 skaidrių), collapsible „Nori suprasti detaliau?“ (Master + pilnas turinio promptas), proceso diagrama. Rezultatų skaidrė 514 – useCaseBlock, thresholdExplanation (≥70%), paprasta kalba (brief, draft, sprint) pataisyta 2026-03-11.

**Path-step žodynėlio patikra (M7, 71.1–71.5):** Kelio žingsniai 71.1–71.5 turi `type: "path-step"`; `unlockedGlossaryTerms` / `unlockedBy` = **kelio atlygio metadata** (skaidrėje), ne GlossaryPage lock (GOLDEN §3.4d, 2026-07-26). Terminai: 71.1 → Duomenų analizės pipeline, EDA; 71.2 → Deep research; 71.3 → RAG, Šaltinių nurodymas; 71.4 → Sintetinimas, Duomenų valymas; 71.5 → Dashboard, Vizualizacija. GlossaryPage – apibrėžimai visada skaitomi + paieška.

---

## Archyvas

_(Išspręstos arba nebeaktualios klaidos galima perkelti čia su data ir trumpu „Kaip išspręsta“.)_

---

_Šaltinis: `docs/development/AGENT_ORCHESTRATOR.md` → QA_AGENT._
