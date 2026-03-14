# M1-M6 Bug Bundle Audit Matrix

> Tikslas: viena vieta, kur matyti, kas Moduliuose 1-6 jau audituota, kas tik dalinai, o kas dar nepatikrinta prieš ir po bug bundle vykdymo.

## Statusų reikšmės

- `audited` - yra konkretus audito arba fix įrašas su aiškiu scope
- `partial` - audituota tik dalis srauto arba kelios reprezentatyvios skaidrės
- `missing` - aiškaus audito įrašo nerasta, reikia spot-check po bundle

## Modulių matrica

| Modulis | Dabartinis statusas | Jau padengta                                                                                                                                                                | Dar rizikinga / trūksta                                                                                                           |
| ------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `M1`    | `partial`           | CTA auditas skaidrėms `1`, `2`, `5`; EN UI diagnozė ir block slides i18n darbai skaidrėms `10-21`; completion `Kur pritaikyti?` blokas                                      | `prompt-types`, `prompt-techniques`, mobile renderis tarp `3-9`, bendras LT/EN spot-check po shared renderer fix                  |
| `M2`    | `partial`           | Quiz flow, rezultatų scroll, paaiškinimų grįžimas, disabled CTA / mobile quiz trintys                                                                                       | Klausimų tipų ekranai, visa remediation eiga, platesnis LT/EN ir mobile spot-check ne vien rezultatams                            |
| `M3`    | `partial`           | Praktinių užduočių įvedimo aiškumas, completion `Kur pritaikyti?`, `1 dalies santrauka`, M1-M3 mobile navigacijos problemos                                                 | Visi 6 scenarijai, scenario selector, gating, mobile praktiškumo patikra per visą modulį                                          |
| `M4`    | `partial`           | CTA auditas `39`, `42`, `45`; user journey pataisos `46`, `46.5`; section-break ir footer salos `40.5`, `52.5`, `65.8`, `66`, `66.25`, `66.9`; release rankinė pastaba `56` | Ilgos RAG / deep research / tokenų skaidrės tarp audituotų salų, kitos content-block diagramos, papildomi EN ir mobile spot-check |
| `M5`    | `partial`           | Intro `45.5`, skaidrė `47`, rezultatai `514`, quiz scroll pataisa, PDF release patikros poreikis                                                                            | Tarpinės testo būsenos, remediation srautas, rankinių PDF rezultatų įrašai, bendras mobile ir EN sweep                            |
| `M6`    | `missing`           | Release rankinė pastaba `64`, M6 PDF patikra kaip checklist punktas, mobile checklist pavyzdžiai `61` arba `64`                                                             | Projekto eiga, `66` schema, completion flow, handout entry point, mobile ir EN/LT diagramos patikra praktiškai visas modulis      |

## Cross-module bug bundle fokusas

### Shared rendereriai

| Sritis                                       | Statusas  | Pastaba                                                                                    |
| -------------------------------------------- | --------- | ------------------------------------------------------------------------------------------ |
| `CustomGptProcessDiagram` / `ProcessStepper` | `missing` | Viena shared šaknis veikia bent M4 ir M6; reikia locale + mobile reflow                    |
| `ContentSlides` hardcoded LT salos           | `partial` | M1 block slides jau tvarkytos, bet liko prompt types / techniques ir solution reveal šakos |
| `InstructGptQualityBlock`                    | `missing` | Tikėtinos LT likučio rizikos M4/M5 tipo skaidrėse                                          |
| `WorkflowChainsBlock`                        | `missing` | A11y locale leak ir galimas M4/M6 shared poveikis                                          |
| `FigmaEmbed`                                 | `missing` | Maža, bet reali locale leak rizika                                                         |

### Mobile QA

| Sritis                                 | Statusas  | Pastaba                                                                               |
| -------------------------------------- | --------- | ------------------------------------------------------------------------------------- |
| `1 slide per module at 375px`          | `missing` | Checklist paruoštas, bet neužpildytas                                                 |
| Swipe konfliktai                       | `partial` | Sisteminiai fixai dokumentuoti, bet reikia po-bundle pakartotinės patikros diagramoms |
| Diagramų `reflow` vs `scroll` politika | `missing` | Šiuo metu per daug vietų remiasi bendru horizontal scroll modeliu                     |

## Po-bundle snapshot (2026-03-14)

| Sritis                                                           | Statusas po bundle | Įrodymas                                                                                                                             |
| ---------------------------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| `CustomGptProcessDiagram` / `ProcessStepper` locale              | `audited`          | Locale tekstai perkelti į `lt.json` / `en.json`, pridėtas smoke testas `ProcessStepper.locale.test.tsx`                              |
| `Custom GPT` mobile reflow                                       | `audited`          | Diagrama turi `COMPACT_LAYOUT`, `ProcessStepper` naudoja swipe-lock vietoj priverstinio horizontal scroll                            |
| `ContentSlides` M1 prompt types / techniques                     | `audited`          | Hero, `Rezultatas`, `Praktinis patarimas`, `Technikų logika`, `Vengti` perkelti į i18n; smoke testas `ContentSlides.locale.test.tsx` |
| `InstructGptQualityBlock` / `WorkflowChainsBlock` / `FigmaEmbed` | `audited`          | Shared aria ir fallback tekstai perkelti į locale failus                                                                             |
| Automated regression net                                         | `audited`          | `vitest` locale smoke testai + esamas swipe-lock testas `useSlideNavigation.touch.test.tsx`                                          |
| Browser spot-check per realų viewport                            | `partial`          | Dokumentuota kaip likusi rizika: šioje sesijoje nebuvo įmanoma atlikti browser automation prie lokalaus app per agentą               |

## Po-bundle privalomi spot-check

- `M1`: `prompt-types`, `prompt-techniques`, viena block slide, LT ir EN
- `M2`: vienas quiz klausimas, results ekranas, remediation grįžimas
- `M3`: scenario pasirinkimas, viena praktinė užduotis, completion
- `M4`: `39`, `42`, `45`, `46`, `46.5`, `56`, viena RAG / tokenų skaidrė
- `M5`: `45.5`, `47`, rezultatai `514`, PDF entry
- `M6`: `61`, `64`, `66`, completion + handout

## Šaltiniai

- `docs/development/TEST_REPORT.md`
- `docs/AUDITO_ATASKAITA_MODULIAI_1_6_MOBILE_UX.md`
- `docs/AUDITO_ATASKAITA_MODULIAI_1_6_UI_UX_LEARNING.md`
- `docs/development/analysis/CTA_AUDIT_M1_M4.md`
- `docs/development/analysis/MODULIO_1_EN_UI_DIAGNOZE.md`
- `docs/development/analysis/LT_EN_UI_KOKYBES_VERSTIMO_RIZIKOS_ANALIZE.md`
