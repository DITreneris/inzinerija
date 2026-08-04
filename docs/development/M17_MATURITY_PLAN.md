# M17 turinio brandos planas (Path Test lukštas + EN)

> **Failas:** `docs/development/M17_MATURITY_PLAN.md`  
> **Data:** 2026-08-04  
> **Statusas:** **done** (SHELL + EN + BANK + QA)  
> **Apimtis:** tik **Modulis 17** (5 skaidrės). Homogenizuoti **lukštą**, ne banką (GOLDEN §3.4a1).  
> **SOT:** [`turinio_pletra_moduliai_16_17_18.md`](../turinio_pletra_moduliai_16_17_18.md) §3 · eilė [`MODULIO_16_SKAIDRIU_EILES.md`](../MODULIO_16_SKAIDRIU_EILES.md)  
> **Tickets:** [`TODO.md`](../../TODO.md) §1.2k `M17-PLAIN-*`  
> **Ne šis planas:** M18 Soft DoD deep teach; bank rewrite; corporate18; Feature Doc.

---

## 0. Diagnostika

| Sluoksnis                 | Būsena                                                        |
| ------------------------- | ------------------------------------------------------------- |
| Path Test shell order     | ✅ intro → warm-up → graded → results → bonus                 |
| 172 results chrome vs M11 | Was ❌ missing passed/failed/threshold/reflection — **fixed** |
| EN body                   | Was ~47% LT spill — **fixed** (body gate module 17)           |
| Bank themes               | ✅ keep; light LT bridges on forward jargon                   |

---

## 1. Rubrika / jargon

| Terminas                  | Politika                           |
| ------------------------- | ---------------------------------- |
| PACKET / soft DoD / smoke | Forward only + LT bridge           |
| VSR                       | Stem: Vibe → Skeleton → Refinement |
| MCP / Redis / coverage    | Wrong/early distractors – keep     |

---

## 2. Sprintai

| ID              | Status |
| --------------- | ------ |
| M17-PLAIN-0     | [x]    |
| M17-PLAIN-SHELL | [x]    |
| M17-PLAIN-EN    | [x]    |
| M17-PLAIN-BANK  | [x]    |
| M17-PLAIN-QA    | [x]    |

---

## 3. Epic DoD

1. [x] 172 lukštas = M11 field set (passed/failed/threshold/reflection)
2. [x] EN body be LT diacritics (audit module 17)
3. [x] Bank bridges; Q IDs / 70% / relatedSlideId intact
4. [x] `TestPracticeSlides.m17` green; CHANGELOG + TODO

---

## 4. WON’T

Bank rewrite · drop 70% · Soft DoD checklist teach · Feature Doc · `generate:core-data` · same PR as M18.
