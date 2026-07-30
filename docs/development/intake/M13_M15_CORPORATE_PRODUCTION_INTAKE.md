# M13–M15 corporate production intake

> **Epic:** Horizon C — M13–15 corporate production cut (ROADMAP).  
> **Status:** **DONE 2026-07-30** (`M1315-C0`…`C4`).  
> **Ne scope šiam epic’ui:** M16–18 authoring (Horizon D); MON/marketing env kaip learning P0; slide Top-5 / chrome / I2V content replay (authoring ✅); pedagogika CORP-M3.

---

## 1. Entry

- M13–15 authoring brandumas ✅ (M1315-F…DIAG, gen→I2V, journey/UX `M1315-J*`).
- Horizon B repo exit ✅ (`build:corporate12`, magic-link tier 12) + B-V verify/lock 2026-07-30.
- I8 readiness checklist ✅ — product cut un-deferred.
- SOT: `docs/turinio_pletra_moduliai_13_14_15.md` + `MODULIO_13_SKAIDRIU_EILES.md`.
- EN / handout / cert tier 5 jau authoring kataloge.

## 2. Exit (DoD)

1. **Build:** `VITE_MAX_BUILD_MODULE=15` + `build:corporate15` + `*-m1-m15.json`; Vaizdo/I2V **ne** stub.
2. **Access:** magic-link tier **15** (`MAGIC_LINK_TIERS` + `api/verify-access` + testai); `ACCESS_TIERS` +15 @ €249 (provisional).
3. **QA:** `npm run audit:m1315` ✅; RELEASE_QA §6b; CI corporate15 step; EN + handout M1315 + cert tier 5 smoke.
4. **Docs:** `DEPLOYMENT.md` M1–15 eilutė; ROADMAP Horizon C → done; CHANGELOG; marketing handoff note.

Marketing pin/env / PostHog / Stripe **ne** exit blokeris šiame repo.

## 3. Milestones ↔ ticket’ai

| Phase | ID       | Deliverable                                       |
| ----- | -------- | ------------------------------------------------- |
| I0    | M1315-C0 | Šis intake (entry/exit/ne-scope)                  |
| I1    | M1315-C1 | Build `MAX_BUILD_MODULE=15` + `build:corporate15` |
| I2    | M1315-C2 | Magic-link tier 15 + testai                       |
| I3    | M1315-C3 | QA / RELEASE_QA §6b + CI                          |
| I4    | M1315-C4 | DEPLOYMENT + ROADMAP exit + CHANGELOG + handoff   |

## 4. Ne-scope

- Naujas MVP-mode ar `*-m1-m6` perrašymas.
- M13 Top-5 / chrome / I2V content epic replay.
- M16–18 F1 eilė / JSON (Horizon D).
- MON-1…8 vykdymas marketing repo.
- Default Vercel pin pakeitimas į 12/15 (marketing chooses).

## 5. Default architektūros sprendimai

- Build: `VITE_MAX_BUILD_MODULE=15` → `*-m1-m15.json` (generate:core-data); full authoring may equal m1-m15 until M16.
- `isSlicedProductionBuild` = 9 \| 12 only — corporate15 ships real Vaizdo + I2V.
- Access: `MAGIC_LINK_TIERS` += 15; `ACCESS_TIERS` `{ maxModuleId: 15, priceEur: 249 }` provisional.
- Default prod remains `build:production` = M1–9 until marketing cutover.

## 6. Related

- Ladder: [`ROADMAP.md`](../../../ROADMAP.md) Horizon C.
- Journey readiness: [`M13_M15_JOURNEY_UX_INTAKE_2026-07.md`](M13_M15_JOURNEY_UX_INTAKE_2026-07.md) I8.
- B mirror: [`M10_M12_CORPORATE_PRODUCTION_INTAKE.md`](M10_M12_CORPORATE_PRODUCTION_INTAKE.md).
- Deploy: [`DEPLOYMENT.md`](../../deployment/DEPLOYMENT.md).
- Pricing / tiers: `src/constants/pricing.ts`.
