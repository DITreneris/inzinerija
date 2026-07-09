# UX Banga 1–2 EN overlay sync

> **Paskirtis:** Vienoje vietoje užfiksuoti, kad UX Banga 1–2 LT skaidrės turi atitinkamus EN overlay įrašus ir praeina deterministinius audit vartus.
> **Data:** 2026-07-09
> **Statusas:** verified

---

## Baseline vartai

| Vartas                              | Rezultatas                                                                                   |
| ----------------------------------- | -------------------------------------------------------------------------------------------- |
| `npm run audit:slide-interactivity` | OK: 262 skaidrės; warm-up=15; path=12; intro-action-pie=2; evaluator=2; embed=9; No warnings |
| `npm run audit:test-scenario-share` | OK: M11 3/9 (33 %), M14 3/8 (38 %)                                                           |
| `npm run audit:m49`                 | OK: M4–M6 ir M7–M9 coverage + language                                                       |
| `npm run audit:m1012`               | OK: M10–M12 coverage + language                                                              |
| `npm run audit:m1315`               | OK: M13–M15 coverage + language                                                              |

---

## Banga 1–2 inventorius

| Banga | Modulis | Slide ID                 | Pattern                  | LT / eilės SOT                          | EN overlay                         | Papildomas vartas                 |
| ----- | ------- | ------------------------ | ------------------------ | --------------------------------------- | ---------------------------------- | --------------------------------- |
| 1     | M7      | 70.5                     | `intro-action-pie`       | `docs/MODULIO_7_SKAIDRIU_EILES.md`      | `src/data/modules-en-m7-m9.json`   | `LEAN_M7_SLIDE_IDS`               |
| 1     | M7      | 73.5, 731.5, 891.5, 74.5 | `warm-up-quiz`           | `docs/turinio_pletra_moduliai_7_8_9.md` | `src/data/modules-en-m7-m9.json`   | `audit:m79`                       |
| 1     | M10     | 10.22, 10.485            | `warm-up-quiz`           | `docs/MODULIO_10_SKAIDRIU_EILES.md`     | `src/data/modules-en-m10-m12.json` | `audit:m1012`                     |
| 1     | M10     | 10.66                    | `evaluator-prompt-block` | `docs/MODULIO_10_SKAIDRIU_EILES.md`     | `src/data/modules-en-m10-m12.json` | `audit:m1012`                     |
| 1     | M13     | 13.31, 13.51             | `warm-up-quiz`           | `docs/MODULIO_13_SKAIDRIU_EILES.md`     | `src/data/modules-en-m13-m15.json` | `audit:m1315`                     |
| 1     | M13     | 13.34                    | `recognitionExercise`    | `docs/MODULIO_13_SKAIDRIU_EILES.md`     | `src/data/modules-en-m13-m15.json` | `audit:m1315`                     |
| 2     | M5      | 511                      | `warm-up-quiz`           | `docs/turinio_pletra_moduliai_4_5_6.md` | `src/data/modules-en-m4-m6.json`   | `audit:m46`                       |
| 2     | M6      | 65.5                     | `path-step`              | `docs/turinio_pletra_moduliai_4_5_6.md` | `src/data/modules-en-m4-m6.json`   | `generate:core-data`, `audit:m46` |
| 2     | M6      | 68                       | `correctPromptPractice`  | `docs/turinio_pletra_moduliai_4_5_6.md` | `src/data/modules-en-m4-m6.json`   | `generate:core-data`, `audit:m46` |
| 2     | M8      | 80.5                     | `warm-up-quiz`           | `docs/turinio_pletra_moduliai_7_8_9.md` | `src/data/modules-en-m7-m9.json`   | `LEAN_M8_SLIDE_IDS`, `audit:m79`  |
| 2     | M12     | 120.55                   | `path-step`              | `docs/MODULIO_10_SKAIDRIU_EILES.md`     | `src/data/modules-en-m10-m12.json` | `audit:m1012`                     |
| 2     | M15     | 150.26                   | `path-step`              | `docs/MODULIO_13_SKAIDRIU_EILES.md`     | `src/data/modules-en-m13-m15.json` | `audit:m1315`                     |

---

## Kokybės patikra

| Sritis                     | Statusas | Pastaba                                                                                               |
| -------------------------- | -------- | ----------------------------------------------------------------------------------------------------- |
| EN coverage                | OK       | Visi Banga 1–2 slide ID yra atitinkamuose EN overlay failuose.                                        |
| EN language                | OK       | `audit:m49`, `audit:m1012`, `audit:m1315` nerado LT reliktų ar DI/AI terminologijos klaidų.           |
| M7–M9 manifestas           | OK       | M8 80.5 įtrauktas į `LEAN_M8_SLIDE_IDS`; M7 branduolio slide ID praeina `audit:m79`.                  |
| M1–6 core profiliai        | OK       | M5/M6 pakeitimai sinchronizuoti per `npm run generate:core-data` ankstesnėje bangoje.                 |
| Banga 3 EN scenario polish | OK       | M11 q9 ir M14 q7/q8 EN tekstai praturtinti pagal LT situacijas, kad neliktų generic placeholder copy. |

## Residual P2 pastabos

- Rankinis 390px smoke lieka release QA veikla: M4 sk. 49/53, M6 sk. 68, M7 sk. 70.5, M10 sk. 10.66, M13 sk. 13.34.
