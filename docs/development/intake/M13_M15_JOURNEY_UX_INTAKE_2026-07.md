# M13–M15 Journey / UX gap closure intake (2026-07)

> **Epic:** M1315-J\* — authoring UX/journey gaps po M1315-F…DIAG.  
> **Statusas:** ✅ Closed 2026-07-28 (I0–I8).  
> **Ne scope:** Horizon C `MAX_BUILD=15` + access 15 (`TODO.md` §1.5 Deferred). I8 = readiness checklist only.  
> **M15 lukštas:** `practice-intro` (M12 forma); **ne** M9 quest / hub.  
> Live SOT: `docs/turinio_pletra_moduliai_13_14_15.md` + `src/data/modules.json` (M13–15).  
> EN: `modules-en-m13-m15.json` via `npm run build:modules-en-m13-m15` (ne `generate:core-data`).

---

## 0. Darbo ciklas

| Fazė   | Ticket’ai | Kas                                                 | Statusas |
| ------ | --------- | --------------------------------------------------- | -------- |
| **I0** | M1315-J0  | Intake + ticket freeze                              | ✅       |
| **I1** | M1315-J1  | 13.1 Patikra (+ Daryk)                              | ✅       |
| **I2** | M1315-J2  | 13.3 / 13.4 density                                 | ✅       |
| **I3** | M1315-J3  | Consistency lab Feature Doc + overlay + eilė 13.325 | ✅       |
| **I4** | M1315-J4  | Lab LT+EN JSON + footers                            | ✅       |
| **I5** | (J4 wire) | `M13ConsistencyLockLabBlock` + TE strict            | ✅       |
| **I6** | M1315-J5  | M15 Greitas polish + `M13_PROMPT_MATURITY.md`       | ✅       |
| **I7** | M1315-J6  | QA smoke + audits                                   | ✅       |
| **I8** | M1315-J7  | Horizon C readiness note (docs only)                | ✅       |

### 0.1 Residual lentelė

| #   | Skaidrė / tema | Problema                             | Ticket | Statusas              |
| --- | -------------- | ------------------------------------ | ------ | --------------------- |
| 1   | 13.1           | Be Patikra                           | J1     | ✅                    |
| 2   | 13.3 / 13.4    | Density 7–8 sec                      | J2     | ✅ (collapse)         |
| 3   | M13 learn      | 0× interactive-control-lab           | J3–J4  | ✅ 13.325             |
| 4   | M15            | Greitas/Pilnas polish + 48h transfer | J5     | ✅                    |
| 5   | Copyables      | Nėra M13_PROMPT_MATURITY             | J5     | ✅ doc                |
| 6   | Horizon C      | Prod cut Deferred — readiness only   | J7     | ✅ checklist          |
| 7   | Soft           | Handout body vs 2026 audio/video SOT | —      | backlog (ne epic DoD) |

---

## 2. Horizon C readiness (I8 — ne implementacija)

Kai J1–J6 ✅:

- [x] Authoring UX gaps closed
- [x] `audit:m1315` + `audit:teaching-elements --strict`
- [x] Handout PDF-FIT (jau ✅)
- [x] Product cut: `MAX_BUILD=15` + access tier 15 (repo) — Horizon C `M1315-C*` ✅ 2026-07-30; marketing pin / tier-5 prod smoke = MON handoff

**Un-defer:** completed via [`M13_M15_CORPORATE_PRODUCTION_INTAKE.md`](M13_M15_CORPORATE_PRODUCTION_INTAKE.md).

---

## 3. Deliverables

- Feature Doc: `docs/development/M13_CONSISTENCY_LOCK_LAB.md`
- Lab: `M13ConsistencyLockLabBlock` + `m13ConsistencyLabContent.ts` + `diagramRenderers` key `m13_consistency_lab`
- Maturity: `docs/development/M13_PROMPT_MATURITY.md`
- Patch: `scripts/archive/patches/patch-m1315-journey-ux.mjs`
