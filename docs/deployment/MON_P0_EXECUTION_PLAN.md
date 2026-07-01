# MON P0 vykdymo planas – monetizacijos unlock

> **Tikslas:** Uždaryti mokamą srautą M1–9 (tier 3 / 6 / 9). **Prioritetas:** M1–9 production; M10+ – ne šiame cikle.  
> **SOT:** `TODO.md` §1.1, `MARKETING_HANDOFF_CHECKLIST.md`, `AUDIT_2026-06_SUMMARY.md`  
> **Atnaujinta:** 2026-07-01 | **Po release:** training repo **1.4.2** (diagram kit, M7–9 EN)

---

## Release vartai (priminti)

| Vartas                 | Reikalavimai                                                      |
| ---------------------- | ----------------------------------------------------------------- |
| **Lead magnet ready**  | MON-1 + MON-3 + MON-5 + Release QA #6                             |
| **Monetization ready** | Visi MON-\* (išskyrus MON-7) + Release QA #1–#2 + MON-4 dashboard |

---

## Savaitė 1 – Marketing env + smoke (DevOps / QA)

### Marketing repo (promptanatomy.app monorepo)

| #   | ID        | Veiksmas                                                                                                            | Patikra                                                                             | Įvert. |
| --- | --------- | ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------ |
| 1   | **MON-8** | Vercel Production env: `VITE_MAX_BUILD_MODULE=9`, build `npm run build:production`, **pašalinti** `VITE_MVP_MODE=1` | Build log rodo M1–9 bundle; preview `/anatomy/` atidaro M7 kortelę (locked be tier) | 2h     |
| 2   | **MON-1** | Env audit: **nėra** `VITE_MAX_ACCESSIBLE_MODULE=6` ar `9` production                                                | `grep`/Vercel UI – tik staging/demo gali turėti                                     | 30m    |
| 3   | **MON-1** | `VITE_VERIFY_ACCESS_URL` = `https://www.promptanatomy.app` (arba tuščia → relative `/api/verify-access`)            | Network tab: verify eina į domain root, ne `/anatomy/api/...`                       | 30m    |
| 4   | **MON-2** | Submodule pin: atnaujinti `inzinerija` commit → **1.4.2** SHA; deploy runbook pastaba                               | Vercel build log SHA = `git rev-parse HEAD` šiame repo                              | 1h     |
| 5   | **MON-2** | Deploy runbook: reikalaujamas commit turi tier 9, `AccessGateScreen`, be MVP tier fallback                          | Checklist §4 MARKETING_HANDOFF                                                      | 30m    |
| 6   | **MON-3** | API smoke (curl): tier 6 ir tier 9 valid token → 200 `{"access_tier":N}`; expired → 401                             | MARKETING_HANDOFF §7.1                                                              | 1h     |
| 7   | **MON-3** | Browser smoke: be query → gate; tier 6 link → M1–6 open, M7–9 locked; tier 9 → M1–9 open                            | MARKETING_HANDOFF §7.2                                                              | 1h     |

### Šis repo (inzinerija) – QA

| #   | ID          | Veiksmas                                                                          | Failai / komanda                          | Įvert. |
| --- | ----------- | --------------------------------------------------------------------------------- | ----------------------------------------- | ------ |
| 8   | **MON-5**   | Gate regression: neapmokėtas `/anatomy/` → `AccessGateScreen`, ne modulių sąrašas | Ranka prod; auto: `gate.smoke.test.tsx`   | 30m    |
| 9   | **QA #6**   | Mobile 390px spot-check M1 EN, M4/M6 Custom GPT LT/EN, light/dark                 | `M1_M6_BUG_BUNDLE_AUDIT_MATRIX.md`        | 2h     |
| 10  | **QA #1–2** | M5/M6 PDF lietuviškos raidės production                                           | `PDF_DOWNLOAD_TESTING.md`, RELEASE_QA §5d | 1h     |

---

## Savaitė 2 – Analytics + pilot

### Marketing repo

| #   | ID        | Veiksmas                                                                                                | Patikra                          | Įvert. |
| --- | --------- | ------------------------------------------------------------------------------------------------------- | -------------------------------- | ------ |
| 11  | **MON-4** | PostHog: `VITE_POSTHOG_KEY` + `VITE_POSTHOG_HOST` build env                                             | Network: `posthog` requests prod | 2h     |
| 12  | **MON-4** | Snippet marketing layout arba training `index.html` per monorepo                                        | Events matomi PostHog Live       | 1h     |
| 13  | **MON-4** | Dashboard 1 pagal `ANALYTICS_DASHBOARD_MVP.md`: M1 completion, M3 completion, drop-off, `pricing_click` | 4 widgetai gyvi                  | 2h     |

### Šis repo – patvirtinimas

| #   | ID          | Veiksmas                                                                                                    | Pastaba                                                 |
| --- | ----------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| 14  | **MON-4**   | Eventai jau instrumentuoti: `pricing_click` (`m3_upsell_pricing`, `m6_upsell_tier9`, `access_gate_pricing`) | `src/utils/analytics.ts`, `ANALYTICS_EVENT_TAXONOMY.md` |
| 15  | **QA #4–5** | M4 sk. 56, M6 sk. 64 rankinė                                                                                | RELEASE_QA §5d                                          |
| 16  | **QA #7**   | PDF/handout entry points M5/M6/M1/M7–9                                                                      | Po MON-8 deploy                                         |

### Pilot (Product)

| #   | ID        | Veiksmas                                              | KPI                        |
| --- | --------- | ----------------------------------------------------- | -------------------------- |
| 17  | —         | 10–20 warm LinkedIn leads → M4 unlock (€39–€99)       | ≥1 pirkimas per 72h        |
| 18  | **MON-7** | Po 2–4 sav.: baseline M1/M3 completion, drop-off, CTA | ANALYTICS_DASHBOARD_MVP §2 |

---

## Kas neįeina į MON P0 ( sąmoningai atidėta )

- M10+ diagram visual polish (`M10PLUS_DIAGRAM_VISUAL_BACKLOG_2026-07.md`)
- LlmArch B3 refactor (`LLMARCH_B3_REFAKTORIAUS_RIZIKOS_PLANAS.md`)
- M10–15 authoring / monetizacija (`TODO.md` §1.5 DEF-1b)
- Lentelės L1–L4, mobile P2/P3 pilnas audit
- Marketing CRO (Hero, Pricing) – tik po MON-4

---

## Greitas troubleshooting

| Simptomas                          | Tikėtina priežastis                              | Fix                             |
| ---------------------------------- | ------------------------------------------------ | ------------------------------- |
| Visi moduliai atrakinti be pirkimo | `VITE_MAX_ACCESSIBLE_MODULE=6` production        | MON-1: nuimti env               |
| M7–9 nematomi                      | `VITE_MVP_MODE=1` arba `VITE_MAX_BUILD_MODULE=6` | MON-8                           |
| „Locked after payment“             | verify-access 401 / neteisingas URL              | MON-3, `VITE_VERIFY_ACCESS_URL` |
| PostHog tuščias                    | Key ne build metu / adblock                      | MON-4 env + incognito test      |
| Senas UI prod                      | Submodule ne atnaujintas                         | MON-2 pin → 1.4.2               |

---

## Done checklist (copy-paste)

```
[ ] MON-8  build:production, MAX_BUILD_MODULE=9, no MVP_MODE
[ ] MON-1  no MAX_ACCESSIBLE_MODULE prod; VERIFY_ACCESS_URL OK
[ ] MON-2  submodule SHA = 1.4.2; runbook updated
[ ] MON-3  curl 200 tier 6/9; browser gate + unlock smoke
[ ] MON-5  unpaid → AccessGateScreen prod
[ ] MON-4  PostHog key + dashboard live
[ ] QA #1–2  M5/M6 PDF diacritics
[ ] QA #6   mobile 390px spot-check
[ ] QA #4–7  manual slides + handout entry (optional savaitė 2)
[ ] MON-7  baseline scheduled (2–4 sav. po MON-4)
```

**Nuorodos:** [MARKETING_HANDOFF_CHECKLIST.md](MARKETING_HANDOFF_CHECKLIST.md) · [INTEGRATION_OVERVIEW.md](INTEGRATION_OVERVIEW.md) · [DEPLOYMENT.md](DEPLOYMENT.md)
