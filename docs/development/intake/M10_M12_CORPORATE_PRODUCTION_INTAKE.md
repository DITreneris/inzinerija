# M10–M12 corporate production intake

> **Epic:** Horizon B — M10–12 corporate production cut (ROADMAP v4.1).  
> **Status:** **DONE 2026-07-28** (`M1012-P0`…`P4` → archive).  
> **Ticket’ai (istorija):** `TODO.md` §1.2 closed; detail [`TODO_DONE_SPRINTS_2026-07-28.md`](../../archive/development/TODO_DONE_SPRINTS_2026-07-28.md).  
> **Ne scope šiam epic’ui:** M13–15 prod (Horizon C); M16–18 authoring (Horizon D); MON/marketing env kaip learning P0; slide Top-5 / chrome replay (authoring ✅).

---

## 1. Entry

- M10–12 authoring brandumas ✅ (M1012-1 chrome, M1012-2 C1–C6 @375).
- Learning GO tag **v1.4.9**; production šiandien = `VITE_MAX_BUILD_MODULE=9`.
- SOT: `docs/turinio_pletra_moduliai_10_11_12.md` + `MODULIO_10_SKAIDRIU_EILES.md`.
- EN / handout / cert tier 4 jau authoring kataloge.

## 2. Exit (DoD)

1. **Build:** `VITE_MAX_BUILD_MODULE=12` kelias žalias (alias `build:corporate12` jei pridėtas); M10–12 patenka į corporate artefaktą.
2. **Access:** magic-link tier **12** šiame repo (`MAGIC_LINK_TIERS` + unit/gate testai); verify-access kontrakto pastaba marketing repo.
3. **QA:** `npm run audit:m1012` ✅; RELEASE_QA checklist eilutės tier-12; EN + handout M1012 + cert tier 4 smoke.
4. **Docs:** `DEPLOYMENT.md` M1–12 eilutė; ROADMAP Horizon B → done; CHANGELOG; marketing handoff note.

Marketing pin/env / PostHog **ne** exit blokeris šiame repo.

## 3. Milestones ↔ ticket’ai

| Phase | ID       | Deliverable                                     |
| ----- | -------- | ----------------------------------------------- |
| I0    | M1012-P0 | Šis intake (entry/exit/ne-scope)                |
| I1    | M1012-P1 | Build `MAX_BUILD_MODULE=12`                     |
| I2    | M1012-P2 | Magic-link tier 12 + testai                     |
| I3    | M1012-P3 | QA / RELEASE_QA tier-12                         |
| I4    | M1012-P4 | DEPLOYMENT + ROADMAP exit + CHANGELOG + handoff |

## 4. Ne-scope

- Naujas MVP-mode ar `*-m1-m6` perrašymas.
- M10+ premium SaaS diagram redesign.
- M13–15 `MAX_BUILD=15` / access 15 (Horizon C).
- M16–18 F1 eilė / JSON (Horizon D; reikia product call + B exit).
- Slide-level content Top-5 / chrome scrub (uždaryta authoring epic’e).
- MON-1…8 vykdymas marketing repo.

## 5. Default architektūros sprendimai

- Build: `VITE_MAX_BUILD_MODULE=12` ant full/authoring slice (ne naujas MVP profilis), nebent P1 atranda, kad reikia `*-m1-m12.json` core generavimo.
- Access: `VALID_MAX_MODULE_IDS` jau turi `12`; kainoraštis turi tier 12 — įjungti `MAGIC_LINK_TIERS`.
- `15` lieka DEV/authoring preview (Horizon C).

## 6. Related

- Ladder: [`ROADMAP.md`](../../../ROADMAP.md) Horizon B.
- Authoring intake (istorija): [`M10_M12_TOBULINIMO_INTAKE_2026-07.md`](M10_M12_TOBULINIMO_INTAKE_2026-07.md).
- Deploy: [`DEPLOYMENT.md`](../../deployment/DEPLOYMENT.md).
- Pricing / tiers: `src/constants/pricing.ts`.
