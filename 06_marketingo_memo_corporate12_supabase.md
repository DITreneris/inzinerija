# Memo: Marketingo komandai – corporate12 (M1–12) per Supabase, be Stripe

**Kam:** Pagrindinės platformos (promptanatomy monorepo, Supabase + Vercel) komanda  
**Nuo:** Mokymų app (Prompt Anatomy / inzinerija) kūrėjai  
**Data:** 2026-08-06  
**Tema:** Horizon B cutover – vienas production build su moduliais 1–12 (`build:corporate12`), magic link `access_tier=12`, Phase 1 per Supabase (be Stripe).

**Susiję dokumentai:**

- [docs/deployment/MARKETING_HANDOFF_CHECKLIST.md](docs/deployment/MARKETING_HANDOFF_CHECKLIST.md)
- [docs/deployment/MARKETING_SUBMODULE_PIN_CORPORATE12.md](docs/deployment/MARKETING_SUBMODULE_PIN_CORPORATE12.md)
- [docs/deployment/INTEGRATION_OVERVIEW.md](docs/deployment/INTEGRATION_OVERVIEW.md)
- [05_marketingo_memo_tier9_vienas_build.md](05_marketingo_memo_tier9_vienas_build.md) (M1–9 / tier 9 – lieka galioti)

---

## 1. Trumpa santrauka

- **Training repo jau ready:** `npm run build:corporate12`, `*-m1-m12.json`, magic-link tier **12** (`MAGIC_LINK_TIERS` + `api/verify-access`).
- **Cutover = jūsų pusė:** Vercel build → `build:corporate12` **ir** Supabase / `generate-access-link` siunčia `access_tier=12` (ne cap į 9).
- **Prieiga** = HMAC magic link (kaip M7–9). Supabase saugo entitlement (`user_access`); **ne** login į mokymų SPA.
- **Phase 1 (dabar):** upsert el. paštui `highest_plan=12` → `generate-access-link` → redirect į `/anatomy/` su token.
- **Phase 2 (ne dabar):** Stripe Agentų SKU €199 → tas pats `access_tier=12`.
- **Pin:** submodule `apps/prompt-anatomy` → app **1.5.0** (ne learning freeze `v1.4.9`).

---

## 2. Kodėl du žingsniai (abu privalomi)

| Sluoksnis        | Kas valdo                           | Be cutover (šiandien)                             | Po cutover                         |
| ---------------- | ----------------------------------- | ------------------------------------------------- | ---------------------------------- |
| **Build**        | Vercel / `vercel-build.sh`          | `MAX_BUILD_MODULE=9`                              | `build:corporate12` → M1–12 bundle |
| **Runtime tier** | Magic link / `generate-access-link` | tipiniai 3/6/9; plan 12 gali būti mapintas **→9** | `access_tier=12` → M1–12 atrakinti |

- Tik `access_tier=12`, build lieka 9 → localStorage = 12, bet M10–12 **nėra** JS kataloge.
- Tik build 12, map lieka →9 → bundle turi M10–12, korporatyvas lieka M1–9.

---

## 3. Vercel env cutover (kritinis)

| Kintamasis               | Iki cutover (M1–9)         | Po cutover (M1–12)              |
| ------------------------ | -------------------------- | ------------------------------- |
| `VITE_MVP_MODE`          | nėra                       | **nėra**                        |
| `VITE_MAX_BUILD_MODULE`  | `9`                        | **`12`**                        |
| Build komanda            | `npm run build:production` | **`npm run build:corporate12`** |
| `VITE_BASE_PATH`         | `/anatomy/`                | `/anatomy/` (be pakeitimų)      |
| `VITE_VERIFY_ACCESS_URL` | domain root / tuščia       | Be pakeitimų                    |

**Draudžiama production:**

- `VITE_MAX_ACCESSIBLE_MODULE=6`, `9` arba **`12`** – atrakina modulius visiems be tokeno.
- `VITE_MVP_MODE=1` – senas 1–6 profilis.

**Rekomenduojama:** Preview deploy su `build:corporate12`, smoke (§8), tada prod.

Detalus pin → env → smoke runbook: [MARKETING_SUBMODULE_PIN_CORPORATE12.md](docs/deployment/MARKETING_SUBMODULE_PIN_CORPORATE12.md).

---

## 4. Supabase Phase 1 (be Stripe)

Stripe Agentų kelias **neblokuoja** paleidimo. Kol nėra Stripe SKU:

1. **Upsert** Supabase `user_access` (ar ekvivalentas): el. paštas + `highest_plan = 12` (arba jūsų enum „agent_path“ = 12).
2. **`GET /api/generate-access-link?email=...`** skaito `highest_plan` ir generuoja magic link.
3. **Map privalo būti 12 → `access_tier=12`.** Pašalinkite istorinį cap **12→9** (jis buvo saugus, kol prod bundle buvo tik M1–9).
4. Redirect:

```
https://www.promptanatomy.app/anatomy/?access_tier=12&expires=UNIX_TIMESTAMP&token=BASE64URL_HMAC
```

| Parametras    | Reikšmė                                                            |
| ------------- | ------------------------------------------------------------------ |
| `access_tier` | `12` (moduliai 1–12)                                               |
| `expires`     | Unix timestamp (sekundės)                                          |
| `token`       | HMAC-SHA256 payload `12:expires`, Base64url, `ACCESS_TOKEN_SECRET` |

5. **`expires` rekomendacijos:**
   - Korporatyvinis / beta: 365 d. (arba pagal sutartį).
   - Trumpas support debug: 1–7 d.

**Prisijungimas = magic link**, ne Supabase Auth į `/anatomy/` SPA.

---

## 5. Verify-access API – tier 12

Jūsų `GET /api/verify-access` (domain root) turi priimti **`access_tier=12`** kartu su 3, 6, 9 (ir 15 jei jau whitelist’inta Horizon C).

Reference (submodulyje): [api/verify-access.ts](api/verify-access.ts) – `VALID_TIERS = [3, 6, 9, 12, 15]`.

Jei parent’e sena kopija tik `[3,6,9]` → `access_tier=12` grąžins **400** `Invalid access_tier` ir SPA neatidarys M10+.

### curl smoke

```bash
# Pakeiskite EXPIRES, TOKEN – generuoti su ACCESS_TOKEN_SECRET (payload 12:EXPIRES)
curl -s "https://www.promptanatomy.app/api/verify-access?access_tier=12&expires=EXPIRES&token=TOKEN"
# Tikėtina: 200 {"access_tier":12}
```

---

## 6. Elgsena po cutover

| Situacija             | Laukiamas elgesys                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------------------- |
| Tier 0 (be tokeno)    | `AccessGateScreen` – modulių sąrašo nėra                                                          |
| Tier 9                | M1–9 atrakinti; M10–12 **užrakinti** (kortelės gali matytis locked) arba nėra UI according to CTA |
| Tier 12               | M1–12 atrakinti; M10 = chapter start (`minTier: 12`) be M7–9 sekos privalomybės                   |
| Sertifikatas Agentų   | Tier 4 PDF po M10+M11+M12 ir M11 testo ≥70 %                                                      |
| Senas tier 9 klientas | Regresija OK: lieka M1–9; M10+ locked                                                             |

Po sėkmingo verify (200):

- SPA rašo `localStorage.verified_access_tier` = `"12"`.
- URL magic-link parametrai išvalomi.
- Prieiga **kumuliatyvi** – tier 12 atrakina 1–12, ne „tik 10–12“.

---

## 7. Support playbook

| Problema                        | Veiksmas                                                                               |
| ------------------------------- | -------------------------------------------------------------------------------------- |
| **„Link expired“**              | Naujas magic link; patikrinti `expires` UTC                                            |
| **„Locked after access grant“** | `verify-access` 200? `VITE_VERIFY_ACCESS_URL`? `verified_access_tier`?                 |
| **„M10 locked after plan 12“**  | Ar redirect buvo `access_tier=12` (ne 9)? Ar map dar **12→9**? Ar build = corporate12? |
| **„M10 missing entirely“**      | Build vis dar `MAX_BUILD=9` – M10–12 nėra bundle’e                                     |
| **„Lost access“**               | Naujas link atkuria tier; `completedModules` **neatsikuria**                           |
| **Wrong tier**                  | Supabase `highest_plan` + generator map → turėtų būti 12                               |

**Neprašyti** vartotojo redaguoti localStorage rankiniu būdu — tik support debug.

---

## 8. Smoke test checklist

### 8.1 API

- [ ] `access_tier=9` → 200 `{"access_tier":9}` (regresija)
- [ ] `access_tier=12` → 200 `{"access_tier":12}`
- [ ] Expired / bad token → 401

### 8.2 Browser (Preview, tada Prod)

- [ ] `/anatomy/` incognito be query → AccessGate
- [ ] Valid tier 9 link → M1–9 open; M10+ locked / neatrakinami
- [ ] Supabase email (`highest_plan=12`) → `generate-access-link` → URL su `access_tier=12`
- [ ] Tier 12 browser → M10 atsidaro; `localStorage.verified_access_tier` = `"12"`
- [ ] Submodule SHA build log’e = **1.5.0** (arba sutartas SHA)
- [ ] Build log: `VITE_MAX_BUILD_MODULE=12` / `build:corporate12`

---

## 9. Phase 2 Stripe backlog (ne launch blocker)

1. Stripe produktas **€199** – Agentų kelias (M1–12) → redirect `access_tier=12`.
2. Success puslapis – „Eiti į mokymus“ su magic link (kaip tier 6/9).
3. Kainodaros LP / CRO – marketing scope; ne šio memo DoD.

---

## 10. Ko NELIESTI

- **`ACCESS_TOKEN_SECRET`** – tik jūsų serveryje; SPA jo nenaudoja.
- **Maršrutas `/anatomy/`** (senas `/anatomija/` → 301) – SPA fallback be pakeitimų.
- **Tier 3 / 6 / 9 srautai** – lieka; tier 12 yra papildymas.
- **corporate15 / tier 15** – atskiras Horizon C cutover (ne šis memo).
- **PostHog / MON-4** – naudinga, bet ne M10–12 unlock blokeris.

---

## 11. Vykdymo seka (copy-paste)

1. Pin submodule → **1.5.0** ([pin runbook](docs/deployment/MARKETING_SUBMODULE_PIN_CORPORATE12.md)).
2. Preview env: `build:corporate12` / `VITE_MAX_BUILD_MODULE=12`.
3. Parent: `verify-access` whitelist +12; `generate-access-link` map **12→12**.
4. Supabase upsert test email `highest_plan=12`.
5. Smoke Preview (§8) → Prod.
6. Stripe €199 – vėliau (§9).

---

**Klausimai:** kreiptis į mokymų app atsakingą asmenį.
