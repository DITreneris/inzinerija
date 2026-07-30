# M13 Gen meter + I2V intake (2026-07)

> **Epic A:** 13.37 quality meter / proporcijos / preset’ai (be Feature Doc).  
> **Epic B:** 13.47 I2V klipo builder (`type: i2v-generatorius`, Pattern `special`, Shell=Ne) — Feature Doc §1b.  
> **Ne scope:** Create spin-off CTA, audio-first builder, shared npm su vaizdas, M13–15 production release.  
> Live SOT: `docs/turinio_pletra_moduliai_13_14_15.md`. Vaizdas = sibling UX šaltinis.

---

## 0. Darbo ciklas

| Iteracija | Ticket’ai | Kas                                           |
| --------- | --------- | --------------------------------------------- |
| **I0**    | M13GEN-0  | Intake + TODO/ROADMAP (be React)              |
| **I1**    | M13GEN-1  | Quality meter + readiness hint                |
| **I2**    | M13GEN-2  | aspectRatio + A/E/C + meter N/9 + patikra     |
| **I3**    | M13GEN-3  | 4 preset’ai (e-com / events / brand / social) |
| **I4**    | M13GEN-4  | @375 QA + util unit test + CHANGELOG          |
| **I5**    | M13I2V-0  | Feature Doc + TE overlay                      |
| **I6**    | M13I2V-1  | Curriculum eilė 13.47 + DATA/schema/footers   |
| **I7**    | M13I2V-2  | `I2vGeneratoriusSlide` + i18n                 |
| **I8**    | M13I2V-3  | TE strict + browser + docs close              |

**Taisyklės:**

1. Terminologija: **DI**; „promptas“; kreipinys **tu**.
2. M13 keitimai → `modules.json` + EN overlay; **ne** core `*-m1-m6` / `*-m1-m9`.
3. Epic A = enhancement `vaizdo-generatorius` (be naujo Pattern).
4. Epic B = Feature Doc prieš runtime „done“.

---

## 1. Epic A DoD

- [x] Meter sticky kolonėlėje (N/tracked + level + hint, `aria-live`)
- [x] Tracked I1: object, goal, audience, color, style, lighting, camera (7)
- [x] Tracked I2+: + aspectRatio, campaignGoal (9)
- [x] Compose: proporcijos + A/E/C
- [x] 4 preset’ai užpildo formą
- [x] `13.37` patikra sync LT/EN
- [x] Unit: `vaizdoGenQuality` helper

## 2. Epic B DoD

- [x] Feature Doc `M13_I2V_CLIP_BUILDER.md`
- [x] Overlay `slide-type:i2v-generatorius` Pattern `special` Shell Ne
- [x] Skaidrė **13.47** po 13.4, prieš 13.5
- [x] `I2vGeneratoriusSlide` + copy/open + mini readiness
- [x] `audit:teaching-elements --strict` + footer numbers

---

## 3. Handoff

I0 → I1…I4 (CONTENT → CODING → QA). Po I4 → I5 Feature Doc → I6 DATA → I7 CODING → I8 QA.
