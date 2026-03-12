# Integracijos apžvalga: mokymo app kaip subproject (Vercel + marketingo repo)

> **Tikslas:** Išoriniams agentams ir integratoriams – viena vieta suprasti, kas yra šis repo, kur production, kaip integruoti į marketingo monorepo ir ką marketingo pusė turi įgyvendinti.  
> **Atnaujinta:** 2026-03-11

---

## Kas yra šis repo

Šis repozitorijus – **mokymo turinio ir UI šaltinis** (Promptų anatomija): moduliai 1–6, skaidrės, žodynėlis, įrankiai, apklausa, sertifikatai, PDF atmintinės. Turinys ir duomenys – čia (`src/data/*`, JSON).

**Architektūra A:** full redagavimo SOT lieka `src/data/modules.json`, `glossary.json`, `tools.json`. Jei integracijos build naudoja `VITE_MVP_MODE=1`, runtime persijungia į `*-m1-m6.json` failus, bet tai nėra atskiras authoring modelis.

**Autentifikacija, mokėjimai ir prieiga:** valdo **marketingo repo** (promptanatomy.app). Stripe, magic link, DB – ten. Šiame repo yra tik **API kontrakto aprašas** ir reference implementacija (`api/verify-access.ts`), kad marketingas galėtų eksponuoti tą patį endpoint'ą.

---

## Produkcija

- **Domenas:** [https://promptanatomy.app/](https://promptanatomy.app/)
- **Hospitingas:** Vercel (marketingo projektas).
- **Mokymo app:** servinamas po keliu, pvz. `/academy` arba `/anatomija` (konfigūruojama per `VITE_BASE_PATH`).

---

## Integracijos modelis: subproject monorepo

Šis repo integruojamas į marketingo monorepo kaip **subproject**:

- **Rekomenduojama vieta:** `apps/prompt-anatomy/` arba `apps/training/` (arba `packages/prompt-anatomy/` jei monorepo jau naudoja `packages/`).
- **Kas perkeliama:** visas turinys – `src/`, `public/`, `index.html`, `vite.config.ts`, `package.json`, `tailwind.config.js`, `postcss.config.js`, `tsconfig.json`, `scripts/` (validacija), reikalingi `docs/`.
- **Build išvestis:** `dist/` – statinis SPA (`index.html` + `assets/`). Marketingo build scriptas kviečia training build ir patalpina `dist/` į savo static serving path (pvz. `public/academy/`).

---

## Kas reikalinga iš šio repo

| Kas | Aprašymas |
|-----|------------|
| **Build output** | `npm run build` → `dist/` (index.html, assets). |
| **Base path** | Env `VITE_BASE_PATH` – kelias, po kurio servinamas app (pvz. `/academy/`). Default šiame repo: `/anatomija/`. |
| **Env lentelė** | Žr. [docs/deployment/DEPLOYMENT.md](DEPLOYMENT.md) skyrių „Integracija kaip subproject“ – `VITE_BASE_PATH`, `VITE_MVP_MODE`, `VITE_MAX_ACCESSIBLE_MODULE`, `VITE_VERIFY_ACCESS_URL` (origin/base URL). |

---

## Kas reikalinga iš marketingo repo

| Užduotis | Aprašymas |
|----------|------------|
| **Servuoti training statiką** | Po pasirinktu path (pvz. `/academy`). SPA fallback: `/academy` ir `/academy/*` → training `index.html`. Statiniai failai (`assets/*`) – tiesiogiai iš dist. |
| **Eksponuoti verify-access API** | `GET /api/verify-access` pagal kontraktą (žr. žemiau). Rekomenduojama – **domain root** `/api/verify-access`, ne po `/academy`. |
| **Magic link redirect** | Po sėkmingo Stripe / magic link nukreipti vartotoją į training URL su query: `https://promptanatomy.app/academy?access_tier=6&expires=...&token=...`. |

**Auth ir verify-access atsakomybė – marketingo app.** Šiame repo – tik kontrakto aprašas ir reference kodas.

---

## Verify-access API (kontraktas)

Kad marketingas galėtų realizuoti tą patį elgesį.

### Endpoint

- **Method/URL:** `GET /api/verify-access`
- **Query params:** `access_tier` (Phase 1: `3` arba `6`), `expires` (Unix timestamp), `token` (Base64url HMAC).

### Validacija

- Payload: `access_tier:expires` (string).
- HMAC-SHA256 su slaptuoju (`ACCESS_TOKEN_SECRET`), rezultatas – Base64url (be padding).
- Leidžiami tier: 3, 6. Jei ateityje plėsite į 9 ar 12, reikia vienu metu atnaujinti frontend, docs ir reference implementaciją.

### Response

- **200:** `{ "access_tier": number }` (validus tier).
- **400:** `{ "error": "Missing access_tier, expires, or token" }` arba `{ "error": "Invalid access_tier" }` / `"Invalid expires"`.
- **401:** `{ "error": "Link expired" }` arba `{ "error": "Invalid token" }`.
- **500:** `{ "error": "Server configuration error" }` (jei nėra slaptojo).

### Reference implementacija

- Šiame repo: [api/verify-access.ts](../../api/verify-access.ts). Slaptasis – env `ACCESS_TOKEN_SECRET` (min. 16 simbolių).

---

## Greitos nuorodos

| Tikslas | Dokumentas |
|---------|------------|
| SOT, duomenys, agentai | [docs/DOCUMENTATION_QUICK_REF.md](../DOCUMENTATION_QUICK_REF.md) |
| Kas įgyvendinta (duomenys, i18n, testai) | [docs/development/CODEBASE_WHAT_IS_DONE.md](../development/CODEBASE_WHAT_IS_DONE.md) |
| Deploy, env, base path, production | [docs/deployment/DEPLOYMENT.md](DEPLOYMENT.md) |
| API kontraktas (verify-access) | Šis dokumentas, skyrius „Verify-access API“ |
