# M13–M15 slide ranking audit

> **Data:** 2026-07-28  
> **Scope:** Moduliai 13–15 (38 skaidrės). Authoring brandumas – ne production release.  
> **Šaltiniai:** `src/data/modules.json`, `docs/MODULIO_13_SKAIDRIU_EILES.md`, `DIAGRAMU_M13_M15_REGISTRY.md`, GOLDEN §3.2/3.6, intake `M13_M15_TOBULINIMO_INTAKE_2026-07.md`.  
> **Rubrika:** ta pati kaip [`M10_SLIDE_RANKING_AUDIT.md`](M10_SLIDE_RANKING_AUDIT.md) §1 (UI / UX / Journey / Maturity / TE).  
> **UI provisional** iki browser C1–C6 (`M1315-2`).

---

## 1. Rubrika (santrauka)

| Ašis         | 5 =                                       | 1 =                        |
| ------------ | ----------------------------------------- | -------------------------- |
| **UI**       | Chrome švarus; footer N; be curriculum ID | Sulaužytas chrome          |
| **UX**       | Vienas darbas; skenuojamas viewport       | Siena teksto / ciklo skylė |
| **Journey**  | Vertė + micro-win + transfer              | Friction dump              |
| **Maturity** | Fit-for-purpose copyable                  | List-echo                  |
| **TE**       | Teisingas Pattern/Shell + ciklas          | Wrong kind / orphan        |

**Type-aware:** `action-intro` / `warm-up-quiz` / `section-break` / `glossary` / `summary` / Path Test lukštas / `practice-intro` → Maturity N/A→**4**, jei chrome OK.

---

## 2. Mechanical registry

| UI    | id      | type                | shortTitle                    | Signals                                              | Opt |
| ----- | ------- | ------------------- | ----------------------------- | ---------------------------------------------------- | --- |
| 1     | 130     | action-intro        | Turinio inžinerijos kelias    | howToUse                                             | —   |
| 2     | 13.1    | content-block       | Kelias – ką čia rasi          | AEC funnel; Trumpai→Daryk→Patikra; collapsible guide | —   |
| 3     | 13.12   | content-block       | Medijos grandinė              | Shell pipeline; cycle OK                             | —   |
| 4     | 13.15   | section-break       | Vaizdo generavimas            | —                                                    | —   |
| 5     | 13.2    | content-block       | Vaizdo prompto pagrindai      | stack schema; cycle                                  | —   |
| 6     | 13.3    | content-block       | Stilius ir proporcijos        | sec×7; cycle                                         | —   |
| 7     | 13.31   | warm-up-quiz        | Savitikra: stilius            | 3Q                                                   | —   |
| 8     | 13.32   | content-block       | Consistency                   | Shell lock; cycle                                    | —   |
| 9     | 13.33   | content-block       | Kompozicija ir kadras         | sec×8; **3116 B; be Patikra**                        | —   |
| 10    | 13.34   | content-block       | Atpažink stilių               | sec×2; **be Copy/Patikra**                           | —   |
| 11    | 13.35   | content-block       | Darbo eiga ir MASTER          | sec×9; **3642 B; be Trumpai**                        | opt |
| 12    | 13.37   | vaizdo-generatorius | Vaizdo generatorius           | interactive                                          | —   |
| 13    | 13.36   | section-break       | Video generavimas             | —                                                    | —   |
| 14    | 13.4    | content-block       | Trumpas vaizdo scenarijus     | sec×8; copy×2                                        | —   |
| 15    | 13.5    | content-block       | Video įrankiai ir CPI         | sec×7; **be Trumpai**                                | —   |
| 16    | 13.51   | warm-up-quiz        | Savitikra: video              | 3Q                                                   | —   |
| 17    | 13.52   | content-block       | Post-prod                     | Shell; cycle                                         | —   |
| 18    | 13.56   | section-break       | Garsas                        | —                                                    | —   |
| 19    | 13.6    | content-block       | Audio-first ir muzika         | cycle                                                | —   |
| 20    | 13.7    | content-block       | Licencijos ir loudness        | cycle                                                | —   |
| 21    | 13.101  | content-block       | Verslas ir rizikos            | sec×8; **3111 B; be Patikra**                        | —   |
| 22    | 13.11   | content-block       | Darbo eiga: brief–publikacija | Shell workflow; cycle                                | —   |
| 23    | 13.8    | glossary            | Žodynėlis                     | terms                                                | opt |
| 24    | 13.9    | summary             | Modulio 13 santrauka          | —                                                    | —   |
| 25    | 140     | test-intro          | Modulio 14 testas             | Path Test                                            | —   |
| 26    | 140.5   | warm-up-quiz        | Savitikra                     | 3Q                                                   | —   |
| 27    | 141     | test-section        | Klausimai                     | 12Q                                                  | —   |
| 28    | 142     | test-results        | Rezultatai                    | —                                                    | —   |
| 29    | 143     | content-block       | Grandinės checklist           | bonus cycle                                          | opt |
| 30    | 150     | practice-intro      | Turinio projektas             | Greitas/Pilnas                                       | —   |
| 31    | 150.5   | practice-scenario   | Greitas startas: hero         | MUST                                                 | —   |
| 32    | 150.25  | content-block       | Projekto ciklas               | Shell loop; be Copy                                  | —   |
| 33    | 150.26  | path-step           | Kontrolinis taškas            | —                                                    | —   |
| 34–37 | 151–154 | practice-scenario   | Optional scenarijus           | —                                                    | opt |
| 38    | 158     | summary             | Projekto santrauka            | —                                                    | —   |

---

## 3. Scored registry (santrauka + silpniausi)

Chrome po I1/I2: UI bazė **4** visoms, nebent pažymėta. Path Test / intro tipai = 4.0.

| id         | UI  | UX    | Journey | Maturity | TE  | Avg     | Rework? | Top issue                                         | Owner   |
| ---------- | --- | ----- | ------- | -------- | --- | ------- | ------- | ------------------------------------------------- | ------- |
| 130        | 4   | 4     | 4       | 4        | 4   | **4.0** |         | Intro OK                                          | —       |
| 13.1       | 4   | 4     | 4       | 4        | 4   | **4.0** |         | Patikra ✅; LT A/E/C labels; EN sections override | —       |
| 13.12      | 4   | 4     | 4       | 4        | 5   | **4.2** |         | MUST grandinė OK                                  | —       |
| 13.15      | 4   | 4     | 4       | 4        | 4   | **4.0** |         | Break                                             | —       |
| 13.2       | 4   | 4     | 4       | 4        | 4   | **4.0** |         | Prompt stack OK                                   | —       |
| 13.3       | 4   | 3     | 4       | 4        | 3   | **3.6** |         | 7 sec tankis                                      | CONTENT |
| 13.31      | 4   | 4     | 4       | 4        | 4   | **4.0** |         | Warm-up                                           | —       |
| 13.32      | 4   | 4     | 4       | 4        | 5   | **4.2** |         | Consistency Shell                                 | —       |
| **13.33**  | 4   | **2** | 3       | 3        | 3   | **3.0** | **Y**   | 8 sec / 3kB; be Patikra                           | CONTENT |
| **13.34**  | 4   | **2** | 3       | 2        | 2   | **2.6** | **Y**   | Ciklo skylė (be Copy/Patikra)                     | CONTENT |
| **13.35**  | 3   | **2** | 2       | 3        | 2   | **2.4** | **Y**   | 9 sec / 3.6kB; be Trumpai; opt tankis             | CONTENT |
| 13.37      | 4   | 4     | 4       | 4        | 4   | **4.0** |         | Generatorius                                      | —       |
| 13.36      | 4   | 4     | 4       | 4        | 4   | **4.0** |         | Break                                             | —       |
| 13.4       | 4   | 3     | 4       | 4        | 3   | **3.6** |         | 8 sec + 2 copy; skaitoma                          | CONTENT |
| **13.5**   | 4   | **2** | 3       | 3        | 3   | **3.0** | **Y**   | Be Trumpai; CPI lentelė tanki                     | CONTENT |
| 13.51      | 4   | 4     | 4       | 4        | 4   | **4.0** |         | Warm-up                                           | —       |
| 13.52      | 4   | 4     | 4       | 4        | 5   | **4.2** |         | Post-prod Shell                                   | —       |
| 13.56      | 4   | 4     | 4       | 4        | 4   | **4.0** |         | Break                                             | —       |
| 13.6       | 4   | 4     | 4       | 4        | 3   | **3.8** |         | Audio cycle OK                                    | —       |
| 13.7       | 4   | 4     | 4       | 4        | 3   | **3.8** |         | Licencijos OK                                     | —       |
| **13.101** | 4   | **2** | 3       | 3        | 2   | **2.8** | **Y**   | 8 sec / 3kB; be Patikra                           | CONTENT |
| 13.11      | 4   | 4     | 4       | 4        | 5   | **4.2** |         | Verslo workflow                                   | —       |
| 13.8       | 4   | 4     | 4       | 4        | 4   | **4.0** |         | Glossary                                          | —       |
| 13.9       | 4   | 4     | 4       | 4        | 4   | **4.0** |         | Summary                                           | —       |
| 140–142    | 4   | 4     | 4       | 4        | 4   | **4.0** |         | Path Test lukštas                                 | —       |
| 143        | 4   | 4     | 4       | 4        | 4   | **4.0** |         | Bonus checklist                                   | —       |
| 150        | 4   | 4     | 4       | 4        | 4   | **4.0** |         | Practice intro (PC-4.3)                           | —       |
| 150.5      | 4   | 4     | 5       | 4        | 4   | **4.2** |         | MUST hero                                         | —       |
| 150.25     | 4   | 3     | 4       | 3        | 4   | **3.6** |         | Loop; be Copy (OK diagram-first)                  | —       |
| 150.26     | 4   | 4     | 4       | 4        | 4   | **4.0** |         | Path-step                                         | —       |
| 151–154    | 4   | 4     | 4       | 4        | 4   | **4.0** |         | Optional scenarios                                | —       |
| 158        | 4   | 4     | 4       | 4        | 4   | **4.0** |         | Summary                                           | —       |

---

## 4. Top 8 (worst-first)

| #   | id         | Avg               | Diagnozė                                     | Owner   |
| --- | ---------- | ----------------- | -------------------------------------------- | ------- |
| 1   | **13.35**  | 2.4               | Optional MASTER wall; be Trumpai; 9 sekcijos | CONTENT |
| 2   | **13.34**  | 2.6               | Atpažinimo praktika be Copy/Patikra ciklo    | CONTENT |
| 3   | **13.101** | 2.8               | Legal/rizikos tankis; be Patikra             | CONTENT |
| 4   | **13.33**  | 3.0               | Kompozicija 8 sec; be Patikra                | CONTENT |
| 5   | **13.5**   | 3.0               | Video CPI be Trumpai                         | CONTENT |
| 6   | ~~13.1~~   | ~~3.4~~ → **4.0** | Patikra + LT labels + EN override ✅         | —       |
| 7   | 13.3       | 3.6               | Stilius 7 sec                                | CONTENT |
| 8   | 13.4       | 3.6               | Video scenarijus 8 sec                       | CONTENT |

---

## 5. Top 5 freeze → I4 `M1315-W1`

| #   | id         | Batch veiksmas                                           |
| --- | ---------- | -------------------------------------------------------- |
| 1   | **13.35**  | Trumpai + collapsible tankioms sekcijoms; ciklas GOLDEN  |
| 2   | **13.34**  | Daryk + Patikra (micro-win); sutrumpinti body            |
| 3   | **13.101** | Patikra + collapsible legal detalės; Trumpai skenuojamas |
| 4   | **13.33**  | Patikra; sutraukti / collapsible perteklių               |
| 5   | **13.5**   | Trumpai (CPI + formatas); accent biudžetas               |

**Iš scope Top-5:** nauji lab’ai; 13.1/13.3/13.4 (Top 8 residual po W1).

---

## 6. Post-batch scores (I4 `M1315-W1` done 2026-07-28)

| id     | Pre Avg | Post Avg | Done | Kas                                           |
| ------ | ------- | -------- | ---- | --------------------------------------------- |
| 13.35  | 2.4     | **3.6**  | ✅   | Trumpai; #1000Books collapse; EN stub rebuild |
| 13.34  | 2.6     | **3.8**  | ✅   | Patikra + Daryk clarity; EN exercise labels   |
| 13.101 | 2.8     | **3.6**  | ✅   | Patikra; Top-3 collapse                       |
| 13.33  | 3.0     | **3.8**  | ✅   | Patikra; theory collapse; EN copyables        |
| 13.5   | 3.0     | **3.8**  | ✅   | Heading → Trumpai (CPI)                       |

Scripts: `patch-m1315-w1-top5.mjs`, `patch-m1315-w1-en-copyables.mjs`.

---

## 7. NEXT

I5 `M1315-2` / `M1315-DIAG` ✅ 2026-07-28 (`smoke-diag1-m1315.mjs` 25/25). Epic closed; production release Deferred.

## 8. Journey/UX gap closure (M1315-J\* 2026-07-28)

| id          | Post note                                         | Avg (est.) |
| ----------- | ------------------------------------------------- | ---------- |
| 13.1        | +Daryk +Patikra; accent ≤2                        | **3.8**    |
| 13.3 / 13.4 | Tools / framing / I2V theory collapsed by default | **≥3.8**   |
| **13.325**  | New consistency lab (TE Pattern)                  | **4.2**    |

Horizon C readiness: intake I8 checklist (be `MAX_BUILD=15`).
