# Marketingo repo handoff checklist (Promptų anatomija)

> **Tikslas:** Copy-paste užduotys marketingo monorepo komandai (Vercel, Stripe, Supabase). Mokymo turinys ir UI — **šis repo** (`inzinerija`); auth, mokėjimai, production env — **marketingo repo** (promptanatomy.app).  
> **Susiję TODO ID:** MON-1, MON-2, MON-3, MON-4, MON-8 (žr. `TODO.md` §1.1).  
> **Atnaujinta:** 2026-06-30  
> **Tier 9 memo:** [05_marketingo_memo_tier9_vienas_build.md](../../05_marketingo_memo_tier9_vienas_build.md)

---

> **Canonical training kelias:** `/anatomy/` (prod monorepo, `vercel.json`). Senas `/anatomija/` veikia tik per **301 redirect** — naujose nuorodose nebenaudoti.

## 1. Stripe → magic link redirect

Po sėkmingo apmokėjimo nukreipti vartotoją į mokymo app URL su query parametrais:

```
https://www.promptanatomy.app/anatomy/?access_tier=6&expires=UNIX_TIMESTAMP&token=BASE64URL_HMAC
```

| Parametras    | Reikšmė                                                                            |
| ------------- | ---------------------------------------------------------------------------------- |
| `access_tier` | `3` (1–3), `6` (1–6) arba `9` (1–9, Duomenų analizės kelias)                       |
| `expires`     | Unix timestamp (sekundės); link galioja iki šio laiko                              |
| `token`       | HMAC-SHA256 payload `access_tier:expires`, Base64url, secret `ACCESS_TOKEN_SECRET` |

**Upgrade 6→9 (€49) ir pilnas 1–9 (€149):** abu siunčia `access_tier=9` (kumuliatyvus tier). Stripe Phase 2 – žr. memo 05 §9.

Kontraktas: [INTEGRATION_OVERVIEW.md](INTEGRATION_OVERVIEW.md) § Verify-access API. Reference: [api/verify-access.ts](../../api/verify-access.ts).

---

## 2. Verify-access API (domain root)

| Reikalavimas       | Detalė                                                           |
| ------------------ | ---------------------------------------------------------------- |
| **Endpoint**       | `GET /api/verify-access` — **domain root**, ne po `/anatomy/`    |
| **Secret**         | Env `ACCESS_TOKEN_SECRET` (min. 16 simbolių; rekomenduojama ≥32) |
| **Leidžiami tier** | `3`, `6`, `9` (Phase 2)                                          |
| **Responses**      | 200 `{ access_tier }`, 400, 401, 500 — pagal kontraktą           |

---

## 3. Vercel build env (training submodule)

| Kintamasis               | Production reikšmė                                                          | Pastaba                                   |
| ------------------------ | --------------------------------------------------------------------------- | ----------------------------------------- |
| `VITE_BASE_PATH`         | `/anatomy/`                                                                 | Atitinka SPA base path (prod monorepo)    |
| `VITE_VERIFY_ACCESS_URL` | `https://www.promptanatomy.app` arba tuščia (relative `/api/verify-access`) | Frontend: `App.tsx`                       |
| `VITE_MAX_BUILD_MODULE`  | **`9`**                                                                     | Vienas production build – M1–9 bundle     |
| Build komanda            | **`npm run build:production`**                                              | Ne `VITE_MVP_MODE=1`                      |
| `VITE_POSTHOG_KEY`       | PostHog project key                                                         | MON-4; snippet marketing shell arba index |
| `VITE_POSTHOG_HOST`      | (optional) PostHog host                                                     | Jei self-hosted                           |

**Pašalinti iš production:**

- `VITE_MVP_MODE=1` – senas profilis (tik 6 moduliai bundle, M7–9 nematomi).

**Draudžiama production:**

- `VITE_MAX_ACCESSIBLE_MODULE=6` arba `9` – atrakina visus modulius be apmokėjimo.

---

## 4. Submodule pin (inzinerija)

1. Po kiekvieno mokymo repo release — atnaujinti git submodule commit marketing monorepo.
2. Patikrinti, kad submodule commit turi:
   - `AccessGateScreen` kai `maxAccessible === 0`
   - Tier 9 magic link (`api/verify-access.ts`, `App.tsx`)
   - Nėra MVP fallback, kuris suteiktų tier 6 visiems
3. Vercel build log — submodule SHA atitinka tikėtiną release; build naudoja `build:production`.

Žr. [05_marketingo_memo_tier9_vienas_build.md](../../05_marketingo_memo_tier9_vienas_build.md) §11.

---

## 5. PostHog / analytics shell

1. Įkelti PostHog snippet į marketing layout (arba training `index.html` per monorepo build).
2. Nustatyti `VITE_POSTHOG_KEY` build metu.
3. Sukurti 1 dashboard pagal [ANALYTICS_DASHBOARD_MVP.md](../development/ANALYTICS_DASHBOARD_MVP.md) (M1 completion, M3 completion, drop-off, CTA).
4. Eventai jau instrumentuoti šiame repo: `src/utils/analytics.ts` (`pricing_click`: `m3_upsell_pricing`, `m6_upsell_tier9`, `access_gate_pricing`).

---

## 6. Support playbook (1 puslapis)

| Problema                             | Veiksmas                                                                                                               |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| **„Link expired“**                   | Generuoti naują magic link; patikrinti `expires` UTC                                                                   |
| **„Locked after payment“**           | Patikrinti verify-access 200; ar SPA gauna `VITE_VERIFY_ACCESS_URL`; ar localStorage `verified_access_tier` nustatytas |
| **„M7 locked after tier 9 payment“** | Patikrinti ar link buvo `access_tier=9` (ne 6); ar marketing API priima tier 9; ar localStorage = `"9"`                |
| **„Lost access“**                    | Patikrinti ar vartotojas neišvalė localStorage / kitas browser                                                         |
| **Wrong tier**                       | Patikrinti Stripe produktas → `access_tier` redirect (3 / 6 / 9)                                                       |

**Neprašyti** vartotojo redaguoti localStorage rankiniu būdu — tik support debug.

---

## 7. Smoke test (rankinis + curl)

### 7.1 API (curl)

```bash
# Tier 6
curl -s "https://www.promptanatomy.app/api/verify-access?access_tier=6&expires=EXPIRES&token=TOKEN"
# Tier 9
curl -s "https://www.promptanatomy.app/api/verify-access?access_tier=9&expires=EXPIRES&token=TOKEN"
# Tikėtina: 200 {"access_tier":6} arba {"access_tier":9}; 401 jei expired/invalid
```

### 7.2 Browser

1. Atidaryti `https://www.promptanatomy.app/anatomy/` **be** query — tikėtina: **AccessGateScreen** (užrakinimas), ne modulių kortelės.
2. Atidaryti su validžiu magic link tier 6 — moduliai 1–6 atrakinti; **M7–9 kortelės matomos, užrakintos**.
3. Atidaryti su validžiu magic link tier 9 — moduliai 1–9 atrakinti; URL params išvalyti po verify.
4. Moduliai → M1 → bent 1 skaidrė; LT/EN perjungimas.
5. Network tab: PostHog requests (po MON-4).

---

## 7a. Vienas production build (M1–9, tier 9)

Vienas Vercel production deploy – **be atskiro corporate** projekto.

| Reikalavimas        | Detalė                                                                                                                      |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Build env**       | `VITE_MAX_BUILD_MODULE=9`, **be** `VITE_MVP_MODE`. Komanda: `npm run build:production`.                                     |
| **Bundle profilis** | `@modules-data` → `modules-m1-m9.json` (generuojamas `npm run generate:core-data`); analogiškai glossary/tools.             |
| **Magic link**      | `access_tier=9` → moduliai 1–9; sertifikatas tier 3 po M7+M8+M9 ir M8 testo ≥70 %.                                          |
| **Kainodara**       | €149 pilnas 1–9; €49 upgrade 6→9 (abu → `access_tier=9`). Žr. [`src/constants/pricing.ts`](../../src/constants/pricing.ts). |
| **Phase 1**         | Rankinis tier 9 link (korporatyvinės licencijos, beta).                                                                     |
| **Phase 2**         | Stripe €149 / €49 – ne launch blocker.                                                                                      |
| **Sinchronas**      | Po `modules.json` redagavimo: `npm run generate:core-data`; `npm run validate:schema`.                                      |

**GitHub Pages** (`/inzinerija/`) gali likti `VITE_MVP_MODE=1` demo – ne prod.

---

## 8. Release 1.4.0 – marketing submodule pin (MON-8)

Po training repo tag **`v1.4.0`**:

1. **Submodule:** marketing monorepo `apps/prompt-anatomy` → commit su tag `v1.4.0`.
2. **Vercel env:** nuimti `VITE_MVP_MODE`; `VITE_MAX_BUILD_MODULE=9`; build komanda `npm run build:production`.
3. **Preview smoke** (memo 05 §8): tier 0 gate, tier 6 locked M7, tier 9 M7 open, curl `access_tier=9` → 200.
4. **Prod deploy** po žalių preview; patikrinti submodule SHA build log'e.

Žr. [05_marketingo_memo_tier9_vienas_build.md](../../05_marketingo_memo_tier9_vienas_build.md) §11.

---

## 8.1. Release 1.4.1 – patch (2026-06-30)

Po training repo tag **`v1.4.1`** (LT/EN audit gates, Tu-forma, diagram i18n, M7–9 data sync):

1. **Submodule pin:** `apps/prompt-anatomy` → commit su tag `v1.4.1`.
2. **Build:** `npm run build:production`; release gate `npm run audit:m49`.
3. **Smoke:** M4 EN (be LT leak), M7 `m7_data_story_cycle` LT/EN, Tu-forma M1/M3.

---

## 8.2. Release 1.4.2 – DiagramKit + M7–9 EN (2026-07-01)

Po training repo tag **`v1.4.2`** (DiagramKit M1–9, design tokens, M7–9 EN sweep, startup stabilumas):

1. **Submodule pin:** `apps/prompt-anatomy` → commit su tag `v1.4.2`.
2. **Build:** `npm run build:production`; production env be `VITE_MVP_MODE`, su `VITE_MAX_BUILD_MODULE=9`.
3. **Smoke:** tier 0 gate, tier 6 M7 locked, tier 9 M1–9 open; `gate.smoke.test.tsx` dengia tier 0/3/6/9 auto dalį.

---

## 8.3. Unreleased po 1.4.2 – M7–12 schema sprint (2026-07-06)

Kol nėra naujo tag (`v1.4.3` arba `v1.5.0`), MON-2 submodule pin turi remtis konkrečiu **HEAD SHA**, ne tik `v1.4.2` tag. Šiame HEAD yra M7–12 schema-consistency, `audit:m1012`, M10–12 diagramų ir release QA docs pakeitimai – žr. `CHANGELOG.md` `[Unreleased]`.

---

## 9. Nuorodos

| Dokumentas                | Kelias                                                                                     |
| ------------------------- | ------------------------------------------------------------------------------------------ |
| Tier 9 memo (marketingui) | [05_marketingo_memo_tier9_vienas_build.md](../../05_marketingo_memo_tier9_vienas_build.md) |
| Integracijos apžvalga     | [INTEGRATION_OVERVIEW.md](INTEGRATION_OVERVIEW.md)                                         |
| Deploy, env               | [DEPLOYMENT.md](DEPLOYMENT.md)                                                             |
| TODO MON-\*               | [TODO.md](../../TODO.md) §1.1                                                              |
| Audit santrauka           | [AUDIT_2026-06_SUMMARY.md](../development/AUDIT_2026-06_SUMMARY.md)                        |
