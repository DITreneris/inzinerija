# Production audit santrauka (2026-06)

> **Verdict:** **CONDITIONAL GO** — M1–6 produktas realus ir deployintas; monetizacija reikalauja P0 integracijos ir analytics.  
> **Confidence:** Medium–High  
> **Pilna ataskaita:** Cursor chat audit 2026-06-29 (business-technical due diligence).

---

## 3 stipriausi argumentai

1. **Moduliai 1–6 pilnai įgyvendinti** — teorija, testai, praktika, sertifikatai, LT/EN, CI (schema + lint + test + build).
2. **Inžinerinė disciplina** — Architecture A, JSON schema prebuild, ErrorBoundary, integracijos docs. 2026-06 audito metu buvo ~38 testų failų; dabartinis 2026-07-06 HEAD baseline – 60 testų failų / 403 testai (`RELEASE_QA_RUN.md`).
3. **Monetizacijos kabliukai egzistuoja** — tier pricing, HMAC magic link (`api/verify-access.ts`), `AccessGateScreen`, marketing funnel docs.

---

## 3 didžiausi blockeriai

1. **Client-side paywall** — JSON bundle + `localStorage` tier; techninis bypass įmanomas (MON-6 — priimta MVP rizika, žr. žemiau).
2. **Auth/Stripe ne šiame repo** — priklausomybė nuo marketing monorepo (MON-1–MON-3).
3. **PostHog/GA4 ne production** — negalima matuoti konversijos (MON-4).

---

## Client-side paywall riba (MON-6 — priimta MVP rizika)

> **Statusas:** Dokumentuota / priimta (2026-06-29).

- **Kas:** Prieigos lygis (`verified_access_tier`) saugomas `localStorage`; modulių turinys (`modules*.json`) patenka į kliento bundle'ą. Techniškai pažengęs vartotojas gali (a) rankiniu būdu nustatyti `localStorage` reikšmę arba (b) ištraukti JSON turinį iš bundle'o, apeidamas mokėjimą.
- **Kodėl priimama MVP fazėje:** Tikslinė auditorija — verslo profesionalai, ne reverse-engineering aktoriai; tikroji vertė yra mokymo eiga, sertifikatai ir bendruomenė, ne vien skaidrių tekstas. Server-side gating reikalautų backend perrašymo (ne šio repo atsakomybė).
- **Mažinimo priemonės:** (1) Production `npm run build:production` (`VITE_MAX_BUILD_MODULE=9`) – bundle tik M1–9 (M10–15 neeksponuojami); (2) magic link HMAC (`api/verify-access.ts`); (3) production env draudžia `VITE_MAX_ACCESSIBLE_MODULE`.
- **Kada peržiūrėti:** Po MON-\* + ≥5 mokamų konversijų — vertinti server-side turinio tiekimą (signed content API), jei bypass faktiškai daro įtaką pajamoms.

---

## Readiness procentai (apytiksliai)

| Metrika                                    | %    |
| ------------------------------------------ | ---- |
| Launch readiness (free lead magnet + gate) | ~75% |
| Monetization readiness (paid M4+ scale)    | ~45% |

---

## Release 1.4.0 (2026-06-30)

Po tier 9 ir `build:production` release readiness monetizacijai ~55% (tier 9 rankinis link Phase 1 veikia; Stripe €149/€49 – Phase 2). Marketing prod turi atitikti **MON-8** (žr. žemiau).

## Prioritetų ID (TODO / ROADMAP)

### P0 — Monetizacija (`TODO.md` §1.1)

| ID    | Užduotis                                                 |
| ----- | -------------------------------------------------------- |
| MON-1 | Production env audit (no `VITE_MAX_ACCESSIBLE_MODULE=6`) |
| MON-2 | Submodule pin dokumentacija                              |
| MON-3 | Verify-access smoke (Stripe → link → unlock)             |
| MON-4 | PostHog production + dashboard                           |
| MON-5 | Gate regression (unpaid → AccessGateScreen)              |
| MON-6 | Dokumentuoti client-side paywall limitą                  |
| MON-7 | Baseline metrics po 2–4 sav.                             |

### P1 — Konversija (`TODO.md` §1.3)

| ID     | Užduotis                  |
| ------ | ------------------------- |
| CONV-1 | M3 completion upsell CTA  |
| CONV-2 | Gate quiz when tier=0     |
| CONV-3 | Playwright gate smoke     |
| CONV-4 | `pricing_click` analytics |

### Release gates

- **Release-ready:** MON-1, MON-3, MON-5 + Release QA #6.
- **Monetization-ready:** visi MON-\* + Release QA #1–#2 + MON-4.

---

## Atidėta (Deferred)

Moduliai **10–15**, M13 EN/footer — **tik po** MON-\* + ≥5 mokamų konversijų. Žr. `TODO.md` §1.5.

**Atnaujinta 2026-06-30 (release 1.4.0):** M7–9 production bundle (`build:production`); M10–12 authoring kataloge. Monetizacija M10+ – Deferred (`TODO.md` §1.5 DEF-1b).

---

## Marketing handoff

Copy-paste checklist: [MARKETING_HANDOFF_CHECKLIST.md](../deployment/MARKETING_HANDOFF_CHECKLIST.md).

---

## Rekomenduojamas kitas eksperimentas

€39–€99 M4 unlock pilotas — 10–20 warm LinkedIn leads; matuoti M4 slide 1 per 72h po pirkimo (MON-4).
