# Intake: Wave D3 corporate18 (M16–18 production cut)

> **Status:** Parked — entry requires product/pricing call.  
> **Ticket:** CAV-C2 · backlog outline [`16_17_18_backlog.md`](../16_17_18_backlog.md) §4 · [`TODO.md`](../../../TODO.md) §1.5.  
> **Atnaujinta:** 2026-08-04 (Caveats Closure Program).

## Entry criteria (all required)

1. M16–18 authoring + TE Must/Should brandumas ✅ (already done).
2. Path handout `m1618` earn-on-complete ✅ (CAV-C1).
3. **Product/pricing call** for tier **18** SKU (price, Stripe `access_tier=18`, marketing copy).
4. Capacity for build + CI + marketing handoff in the same window.

## Deliverables (when un-parked)

| ID       | Deliverable                                                               |
| -------- | ------------------------------------------------------------------------- |
| M1618-C0 | This intake freeze (entry/exit/ne-scope)                                  |
| M1618-C1 | `VITE_MAX_BUILD_MODULE=18` + `build:corporate18` + `*-m1-m18.json`        |
| M1618-C2 | Magic-link tier **18** (`MAGIC_LINK_TIERS` + `api/verify-access` + tests) |
| M1618-C3 | `audit:m1618` in CI + RELEASE_QA §6c                                      |
| M1618-C4 | DEPLOYMENT + ROADMAP exit + CHANGELOG + marketing handoff                 |

## Exit

- Green corporate18 build + gate tests in this repo.
- Marketing env/pin cutover tracked under TODO §1.4 (not learning P0).

## Ne-scope

- Live Cursor / IDE-in-app
- PACKET desk Feature Doc (TE-M1618-C1 won’t-now)
- M19–21
- Formal Density DoD/CI
