# M11/M12 slide ranking audit (Wave3-R)

> **Data:** 2026-07-26  
> **Scope:** Modulis 11 (5) + Modulis 12 (11) = **16** LT skaidrių. M10 = atskiras [`M10_SLIDE_RANKING_AUDIT.md`](M10_SLIDE_RANKING_AUDIT.md) (W3a done).  
> **Šaltiniai:** `src/data/modules.json`, TE overlay (`m12_*`), GOLDEN §3.4a1 / §3.2, [`MODULIO_10_SKAIDRIU_EILES.md`](../MODULIO_10_SKAIDRIU_EILES.md), `turinio_pletra_moduliai_10_11_12.md` §7–8.  
> **Ne SOT:** `PEDAGOGINE_ANALIZE_MODULIAI_10_11_12.md` C-tier – **ne** dabartiniai rangai.  
> **Fazė:** Wave3-R analizė ✅; **Wave3-B Top 5 batch done** (2026-07-26). Lieka browser C1–C6 (`M1012-2`).

---

## 1. Rubrika

Tas pats 5 ašių modelis kaip M10 ([`M10_SLIDE_RANKING_AUDIT.md`](M10_SLIDE_RANKING_AUDIT.md) §1): **UI · UX · Journey · Maturity · TE** (1–5, Avg = vidurkis).  
**Rework** = bet kuri ašis **≤2**, arba TE kind/Pattern neatitinka.

### Wave3 tipo kalibracija

| Tipas                                         | Maturity                                         | Journey fokusas                              |
| --------------------------------------------- | ------------------------------------------------ | -------------------------------------------- |
| `test-intro` / `test-results`                 | 4 jei chrome/CTA OK                              | ≥70 % → M12; failed temos žmogiškai          |
| `warm-up-quiz` / `test-section`               | Diagnostika vs list-echo; remedia be naked ID UI | Sync su M10 po W3a (router≠orch, 3A, ciklas) |
| `practice-intro`                              | ROI šablonas fit                                 | 124.5 first; `minScenariosToComplete: 3`     |
| `practice-scenario`                           | Stage/Flagship; carry 10.64 / 10.26              | Diferenciacija 124.5 / 124 / 121–123         |
| `path-step` / `summary` / bonus content-block | 4 jei chrome OK                                  | Transfer / closer                            |

UI provisional iki browser `M1012-2` C1–C6.

---

## 2. M11 registry + scores (JSON eilė)

| UI  | id    | type          | shortTitle | Signals                     | UI  | UX  | Journey | Maturity | TE  | Avg     | Rework? | Top issue                                                 | Owner                |
| --- | ----- | ------------- | ---------- | --------------------------- | --- | --- | ------- | -------- | --- | ------- | ------- | --------------------------------------------------------- | -------------------- |
| 1   | 110   | test-intro    | —          | whyBenefit; ≥70%; CTA       | 4   | 4   | 4       | 4        | 4   | **4.0** |         | Path Test intro OK                                        | —                    |
| 2   | 110.5 | warm-up-quiz  | Savitikra  | 3Q M10 diagnostika          | 4   | 3   | **3**   | 4        | 4   | **3.6** |         | Nėra forward bridge į M12 projektą                        | CONTENT / CURRICULUM |
| 3   | 111   | test-section  | —          | 9Q; relatedSlideId → M10    | 4   | 4   | 4       | 4        | 4   | **4.0** |         | Shell OK; q1 remedia 10.3 (tools→system) šiek tiek silpna | CONTENT              |
| 4   | 112   | test-results  | —          | failedMessage; reflection   | 4   | 4   | 4       | 4        | 4   | **4.0** |         | W3B: „3A juostos (gylis ir rolės)“                        | —                    |
| 5   | 113   | content-block | —          | bonus; Trumpai→Copy→Patikra | 4   | 4   | 4       | 4        | 4   | **4.0** |         | Stage grandinė OK                                         | —                    |

**M11 Avg:** ~3.92  
**Path Test §3.4a1:** eilė **pass** (intro → warm-up → graded → results → bonus). Warm-up = 3 diagnostiniai, **be** M12 bridge (finding, ne fail).

---

## 3. M12 registry + scores (JSON eilė)

| UI  | id     | type              | shortTitle          | Signals                               | UI  | UX  | Journey | Maturity | TE  | Avg     | Rework? | Top issue                                             | Owner   |
| --- | ------ | ----------------- | ------------------- | ------------------------------------- | --- | --- | ------- | -------- | --- | ------- | ------- | ----------------------------------------------------- | ------- |
| 1   | 120    | practice-intro    | —                   | ROI; minScenarios=3; rec. 124.5…      | 4   | 3   | 4       | 4        | 4   | **3.8** |         | ROI + path – tankus first viewport                    | CONTENT |
| 2   | 120.25 | content-block     | Trys praktikos (3A) | `m12_three_labs`; Choice+Stage Copy   | 4   | 4   | 4       | 5        | 4   | **4.2** |         | Stage A+B+C: bar + linked ×3 + preCopy                | —       |
| 3   | 120.5  | content-block     | Kelių agentų schema | `m12_multi_agent_schema` Shell; cycle | 4   | 4   | 4       | 4        | 4   | **4.0** |         | Pilnas ciklas + diagrama                              | —       |
| 4   | 120.55 | path-step         | Kontrolinis taškas  | copy×1                                | 4   | 4   | 4       | 4        | 4   | **4.0** |         | Path-step OK                                          | —       |
| 5   | 124.5  | practice-scenario | Greitas startas     | 3 promptai + Įgūdžio paketas          | 4   | 5   | 5       | 5        | 4   | **4.6** |         | Flagship greitas startas                              | —       |
| 6   | 124    | practice-scenario | Tyrimo agentas      | Micro template                        | 4   | 4   | 3       | 3        | 4   | **3.6** |         | Plonas; diferenciacija nuo M10 OK, bet silpnas tiltas | CONTENT |
| 7   | 121    | practice-scenario | Automatize          | template ≈ 10.64 Stage                | 4   | 4   | 4       | 4        | 4   | **4.0** |         | W3B: Stage template + title-only 10.64                | —       |
| 8   | 122    | practice-scenario | Augment             | HITL taisyklė; pointer 10.26          | 4   | 4   | 4       | 4        | 4   | **4.0** |         | Carry iš „Kada tvirtina žmogus?“ OK                   | —       |
| 9   | 123    | practice-scenario | Autonomize          | title-only incident + 10.64 carry     | 4   | 4   | 4       | 4        | 4   | **4.0** |         | W3B: be `doc §`; **Testavimas ir saugumas**           | —       |
| 10  | 125    | content-block     | Pakartok M10        | opt; GOLDEN cycle; 2/3 collapsible    | 4   | 4   | 4       | 4        | 4   | **4.0** |         | W3B: ciklas; EN 126/127 deleted                       | —       |
| 11  | 128    | summary           | Projekto santrauka  | reflection + nextStepCTA              | 4   | 4   | 4       | 4        | 4   | **4.0** |         | Closer OK                                             | —       |

**M12 Avg:** ~4.0  
**TE:** `diagram:m12_three_labs` (120.25, Shell=Ne); `diagram:m12_multi_agent_schema` (120.5, Shell=Taip) – kind OK; 120.25 ciklas W3B uždarytas.

---

## 4. Path Test / practice journey findings

### M11 Path Test

| Check                | Status                                                     |
| -------------------- | ---------------------------------------------------------- |
| Eilė §3.4a1          | **Pass**                                                   |
| Warm-up 3Q           | **Pass** (agentas vs prompt, 3A Augment, router≠orch)      |
| Forward bridge → M12 | **Gap** – nėra ketvirto / trečio Q apie projektą           |
| Graded remedia IDs   | Live M10 IDs OK; human chips priklauso nuo UI (C4 browser) |
| Results copy         | **Pass** (W3B): „3A juostos (gylis ir rolės)“              |
| Bonus 113            | **Pass** §3.2                                              |

### M12 practice journey

| Check                         | Status                                             |
| ----------------------------- | -------------------------------------------------- |
| Eilė vs MODULIO_10            | **Pass** 1:1                                       |
| Intro → 124.5 first win       | **Pass** (CTA + recommendedSlideIds)               |
| 120.25 map → labs             | **Pass** (W3B Copy Micro)                          |
| 120.5 schema → 120.55 → 124.5 | **Pass**                                           |
| 121–123 MUST artefacts        | **Pass** (W3B: 121 Stage template; 123 title-only) |
| Optional 125                  | **Pass** (W3B GOLDEN cycle; EN orphans gone)       |

---

## 5. System: EN orphans `126` / `127` — **resolved (W3B)**

| id  | Was                             | Now                                     |
| --- | ------------------------------- | --------------------------------------- |
| 126 | EN-only Tool usage scenario     | **Deleted** from `build-en-m10-m12.mjs` |
| 127 | EN-only Error handling scenario | **Deleted** from `build-en-m10-m12.mjs` |

Themes live in optional `125` (3 copyables + GOLDEN cycle). M12 EN slide list: `…123,125,128`.

---

## 6. Worst-first Top 8 (pre-W3B snapshot → post)

| Rank | id         | Module | Pre | Post    | Status                                    |
| ---- | ---------- | ------ | --- | ------- | ----------------------------------------- |
| 1    | **120.25** | M12    | 2.6 | **4.2** | ✅ W3B + Stage A+B+C (bar/preCopy/linked) |
| 2    | **125**    | M12    | 2.6 | **4.0** | ✅ W3B cycle; EN 126/127 deleted          |
| 3    | **123**    | M12    | 2.8 | **4.0** | ✅ W3B doc scrub + 10.64 carry            |
| 4    | **112**    | M11    | 3.0 | **4.0** | ✅ W3B gylis / 3A juostos                 |
| 5    | **121**    | M12    | 3.0 | **4.0** | ✅ W3B Stage template                     |
| 6    | **110.5**  | M11    | 3.6 | 3.6     | Open P1 – M12 bridge                      |
| 7    | **124**    | M12    | 3.6 | 3.6     | Open – tiltas po 124.5                    |
| 8    | **120**    | M12    | 3.8 | 3.8     | Open – ROI tankis                         |

**Rework flags (W3B):** cleared for Top 5. Open: `110.5` (bridge).

---

## 7. Wave3-B Top 5 — **done** (2026-07-26)

| #   | id         | Tikslas                                              | Status     |
| --- | ---------- | ---------------------------------------------------- | ---------- |
| 1   | **120.25** | Stage Choice + linked Copy + preCopy                 | ✅ Avg 4.2 |
| 2   | **125**    | GOLDEN cycle; collapsible 2/3; **delete EN 126/127** | ✅ Avg 4.0 |
| 3   | **123**    | `doc §20` → **Testavimas ir saugumas**; 10.64 carry  | ✅ Avg 4.0 |
| 4   | **112**    | failedMessage → **gylis / 3A juostos**               | ✅ Avg 4.0 |
| 5   | **121**    | Template ≈ 10.64 Stage; be docs hint                 | ✅ Avg 4.0 |

_(110.5 M12 bridge – P1 po Top 5, jei lieka laiko.)_

---

## 8. Appendix — `M1012-2` browser C1–C6 (human)

JSON chrome ✅ (`TEST_REPORT`). Browser @375px LT→EN:

| #   | Kelias                            | Tikrinti                               | Browser |
| --- | --------------------------------- | -------------------------------------- | ------- |
| C1  | M10 early                         | titles, footer N, CTA                  | ⬜      |
| C2  | M10 path-step / 10.45             | be ID UI                               | ⬜      |
| C3  | M10 10.5 / 10.65                  | title-only cross-ref                   | ⬜      |
| C4  | **M11** intro → warm-up → results | Path Test lukštas; remedia be naked ID | ⬜      |
| C5  | **M12** 124.5 + summary           | human approval; title/CTA              | ⬜      |
| C6  | Dark + light                      | dense content-block                    | ⬜      |

---

## 9. Nuorodos

- M10 audit: [`M10_SLIDE_RANKING_AUDIT.md`](M10_SLIDE_RANKING_AUDIT.md)
- Eilė: [`MODULIO_10_SKAIDRIU_EILES.md`](../MODULIO_10_SKAIDRIU_EILES.md)
- GOLDEN Path Test: §3.4a1
- TODO: `M1012-W3R` ✅ · `M1012-W3B` ✅ · `M1012-2` (browser C1–C6)

```text
CHANGES: Wave3-B Top 5 LT+EN; ranking scores bumped; EN 126/127 removed
CHECKS: audit:m1012 + validate:schema OK; M12 slide list ends 125→128
RISKS: UI provisional until M1012-2 browser
NEXT: C1–C6 @375px; optional 110.5 M12 bridge
```
