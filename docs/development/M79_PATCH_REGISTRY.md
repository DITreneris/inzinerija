# M7–M9 patch skriptų registras

> **Tikslas:** Vienas sąrašas idempotentinių M79 patch skriptų, paleidimo tvarka ir EN overlay taisyklės.
> **Operacinis SOT:** iteraciniai UX polish pakeitimai fiksuojami čia + [`TEST_REPORT.md`](TEST_REPORT.md) + [`CHANGELOG.md`](../../CHANGELOG.md).
> **Atnaujinta:** 2026-08-04

**M7–M9 EN language polish (2026-08-04):** `patch-m79-en-language-polish.mjs` – Must/Should grammar + US spelling (`modules-en-m7-m9.json`, `m79HandoutContent-en.json`, `glossary-en.json` Kiss-Marry Kill→Drop). LT SOT neliečia. **Nenaudoti** `build:modules-en-m7-m9`. → `generate:core-data`.

**Rankinis turinio polish (ne patch skriptas):** M7 sk. **67.5** (2026-07-24) – GOLDEN §3.2: scenarijus + copyable gynybos promptas; žodynas Promptų injekcija / Jailbreak. Failai: `modules.json`, `modules-en-m7-m9.json`, `glossary.json`, `glossary-en.json` → `generate:core-data`.

**M7 sk. 67 manipulation-contrast (2026-07-26, rankinis):** `ManipulationContrastToolSurface` + `variant: manipulation-contrast` (4 tipai, be collapsible lentelių). Failai: `modules.json`, `modules-en-m7-m9.json`, `ContentSlides.tsx`, surface komponentas, schema, locales → `generate:core-data`.

**M9 practice-quest redesign (2026-07-26):** `patch-m9-quest-redesign.mjs` – tipas `practice-quest-intro`, merge 94→93, hub 12, optional hub path, checklist/badges; journey `modules-journey-m9.json` (+EN). UI: `PracticeQuestIntroSlide`, ModuleView skipOptional M9. → `generate:core-data`.

**M8 kelionės UX (2026-07-24, rankinis):** sk. 80 SOT copy; intro chips secondary + return aria; App remediation return `{8→7,11→10,14→13}`; results retry/CTA; ModuleView test badge. Failai: `App.tsx`, `TestPracticeSlides.tsx`, `TestKnowledgeScopeDiagram.tsx`, `ModuleView.tsx`, `modules.json` (+ EN + m1-m9), `lt.json`/`en.json`.

---

## 1. Skriptų lentelė

| Skriptas                              | Paskirtis                                                                  | Kada paleisti                          | Priklausomybės                                     |
| ------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------- | -------------------------------------------------- |
| `patch-m79-iterations.mjs`            | Ankstyvos M79 iteracijos (cross-ref, footer, kelio žemėlapis)              | Vienkartinis / legacy                  | `modules.json`                                     |
| `patch-m79-en-overlay.mjs`            | EN overlay bazinis sync                                                    | Po didelių LT pakeitimų                | `modules-en-m7-m9.json`                            |
| `patch-m79-patikra-batch2.mjs`        | M7 Patikra de-boilerplate (batch 2)                                        | Vienkartinis                           | `modules.json`                                     |
| `patch-m79-phase2.mjs`                | Phase 2 LT (78.5, 93.1/93.2, footer B, macro)                              | Vienkartinis                           | `modules.json`                                     |
| `patch-m79-phase2-en.mjs`             | Phase 2 EN overlay                                                         | Po `patch-m79-phase2.mjs`              | `modules-en-m7-m9.json`                            |
| `patch-m79-phase2-audit.mjs`          | Phase 2 audit batch (M8/M9/M7 targeted)                                    | Po phase2                              | Abu JSON                                           |
| `patch-m79-ux-polish.mjs`             | Top 5 UX polish LT (93, 94, 76, 89/73, 99/90)                              | Vienkartinis                           | `modules.json`                                     |
| `patch-m79-ux-polish-en.mjs`          | Top 5 EN overlay                                                           | Po ux-polish LT                        | `modules-en-m7-m9.json`                            |
| `patch-m79-p2-polish.mjs`             | P2 polish LT (etika, filtrai, M9, optional, sk. 74)                        | Vienkartinis                           | `modules.json`                                     |
| `patch-m79-p2-polish-en.mjs`          | P2 polish EN overlay                                                       | Po p2-polish LT                        | `modules-en-m7-m9.json`                            |
| `patch-m79-plain-w4-w5.mjs`           | A–C: sk. 97 inline principai + W4 (66.9) + W5 body batch (M79-44/45) LT+EN | Vienkartinis (jau paleista 2026-07-16) | Abu JSON; ne paleisti pakartotinai be diff review  |
| `patch-m79-everyday-closeness.mjs`    | M79-51…54 LT: M9 90/93.1/93.2/99 + M8 warm-up/vignette + sampleFile        | Vienkartinis (jau paleista 2026-07-16) | `modules.json`; `public/m9_sample_internal.csv`    |
| `patch-m79-everyday-closeness-en.mjs` | M79-51…54 EN overlay veidrodis                                             | Po LT patch                            | `modules-en-m7-m9.json`                            |
| `patch-m79-46-section46-residual.mjs` | CQ-M79-3 §4.6: EN 891 when-first + M7 #9 phrase batch LT+EN (#6/#8 verify) | Vienkartinis (jau paleista 2026-07-26) | `modules.json` + `modules-en-m7-m9.json`           |
| `patch-m9-quest-redesign.mjs`         | M9 quest intro + merge 94→93 + hub 12 + checklist (LT+EN)                  | Vienkartinis (jau paleista 2026-07-26) | `modules.json` + `modules-en-m7-m9.json`           |
| `patch-m79-en-language-polish.mjs`    | EN Must/Should grammar + US spelling + glossary Kiss-Marry Drop            | Vienkartinis (jau paleista 2026-08-04) | `modules-en-m7-m9.json` + handout EN + glossary-en |

**Paleidimo tvarka (jei reikia iš naujo):** LT patch → `npm run validate:schema` → EN patch → `npm run audit:m79` → `npm run generate:core-data` (jei M1–9 core).

```bash
node scripts/archive/patches/patch-m79-p2-polish.mjs
node scripts/archive/patches/patch-m79-p2-polish-en.mjs
npm run validate:schema
npm run generate:core-data
npm run audit:m79
```

---

## 2. EN overlay deep-merge taisyklė (kritinė)

`modulesLoader` merge'ina EN overlay **pagal sekcijų indeksą** (`deepMerge` by index).

| Veiksmas                                       | Rezultatas                                                    |
| ---------------------------------------------- | ------------------------------------------------------------- |
| Partial EN `body` / `copyable` viename indekse | LT lieka likusiuose laukuose → `audit:m79` LT diacritics FAIL |
| Pilnas `sections[]` masyvas pakeistai skaidrei | Saugu – indeksai sutampa                                      |

**Taisyklė:** keitus `content.sections` EN overlay – **perrašyti visą `sections` masyvą** toje skaidrėje, ne tik vieną lauką.

**Pavyzdys:** [`scripts/archive/patches/patch-m79-p2-polish-en.mjs`](../../scripts/archive/patches/patch-m79-p2-polish-en.mjs) – pilni section veidrodžiai sk. 77.5, 101 (M7), etika, filtrai.

---

## 3. Susiję UI pattern'ai (ne patch, bet registry)

| Pattern                            | Komponentas / laukas                                     | Skaidrės (pavyzdžiai)            |
| ---------------------------------- | -------------------------------------------------------- | -------------------------------- |
| `toolChoiceBar` + `linkedRowIndex` | `ContentSlides.tsx`                                      | M7: 734, 731, 733, 77; Top 5: 76 |
| `M9WorkflowStepCopyBlock`          | `diagramRenderers.tsx`                                   | M9 sk. 93                        |
| `content.sampleFile` download      | `TestPracticeSlides` PracticeScenarioSlide               | M9 sk. 93.2                      |
| Bar be `table`                     | `ContentSlides` – bar render be `presentationToolsBlock` | 734, 731, 733, 77                |

Žr. [`GOLDEN_STANDARD.md`](GOLDEN_STANDARD.md) §3.8.1, [`LENTELIU_STANDARTAS.md`](LENTELIU_STANDARTAS.md).

---

## 4. Vartai po patch

| Vartas         | Komanda                      |
| -------------- | ---------------------------- |
| Schema         | `npm run validate:schema`    |
| M7–M9 EN/LT    | `npm run audit:m79`          |
| Core profiliai | `npm run generate:core-data` |
| Testai         | `npm run test:run`           |

---

## 5. Nuorodos

- Backlog DoD: [`07_08_09_backlog.md`](07_08_09_backlog.md) §11 (Phase 2), §12 (P2 polish), §13 (A–C residual)
- Smoke: [`TEST_REPORT.md`](TEST_REPORT.md) §2026-07-16 M79-50
- Priežiūra: [`DOCS_MAINTENANCE.md`](DOCS_MAINTENANCE.md)
- DATA gairės: [`DATA_AGENT_DUOMENYS_ATNAUJINIMAS.md`](DATA_AGENT_DUOMENYS_ATNAUJINIMAS.md) §3.1 M7–M9 EN

## 5a. M13–15 historical patches (ne M7–9, bet re-run hazard)

| Skriptas                                            | Būsena              | Pastaba                                                                                                                                                                                       |
| --------------------------------------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `scripts/archive/patches/patch-m13-m15-2026.mjs`    | **STALE / APPLIED** | Curriculum refresh one-shot. Po apply rankiniu būdu pridėti `image`: `m13_media_pipeline`, `m13_consistency_lock`, `m13_postprod_steps`. **Nepakartoti** – re-insert numestų diagramų raktus. |
| `scripts/archive/patches/patch-m13-m15-en-2026.mjs` | **STALE / APPLIED** | EN veidrodis; ta pati rizika.                                                                                                                                                                 |
| `scripts/archive/patches/patch-tools-m13-2026.mjs`  | Tools-only          | Nesusijęs su diagram `image` raktais.                                                                                                                                                         |

Live SOT: `modules.json` + `modules-en-m13-m15.json`. Registry: [`DIAGRAMU_M13_M15_REGISTRY.md`](DIAGRAMU_M13_M15_REGISTRY.md).
