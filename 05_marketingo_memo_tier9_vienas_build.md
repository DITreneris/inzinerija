# Memo: Marketingo komandai – tier 9, vienas production build (M1–9)

**Kam:** Pagrindinės platformos (059_home_page, Stripe + Supabase) komanda  
**Nuo:** Mokymų app (Prompt Anatomy / inzinerija) kūrėjai  
**Data:** 2026-06-30  
**Tema:** Vienas Vercel production build su moduliais 1–9, tier 9 magic link, kainodara ir Phase 1 (rankinis) / Phase 2 (Stripe) planas.

**Susiję dokumentai:** [docs/deployment/MARKETING_HANDOFF_CHECKLIST.md](docs/deployment/MARKETING_HANDOFF_CHECKLIST.md), [02_mokymu_komanda_memo.md](02_mokymu_komanda_memo.md) (Phase 1: tier 3|6), [04_atsakymas-marketingo-komandai-memo.md](04_atsakymas-marketingo-komandai-memo.md) (gate fix).

---

## 1. Trumpa santrauka

- **Atskiro „corporate“ deploy nebereikia** – vienas production build servina visus (M1–9 bundle).
- **Prieiga tier 9** – magic link `access_tier=9` (ne Supabase login į mokymų SPA).
- **Phase 1 (dabar):** rankinis magic link generavimas (korporatyvinės licencijos, beta, support).
- **Phase 2 (planuojama):** Stripe produktai €149 (pilnas 1–9) ir €49 (upgrade 6→9); abu redirect su `access_tier=9`.
- **Tier 6 vartotojai** mato modulių korteles 7–9 **užrakintas** (su kainos CTA); negali atidaryti be tier 9 link.

---

## 2. Vercel env pakeitimas (kritinis)

| Kintamasis               | Sena reikšmė    | Nauja reikšmė                         |
| ------------------------ | --------------- | ------------------------------------- |
| `VITE_MVP_MODE`          | `1`             | **Pašalinti / ne nustatyti**          |
| `VITE_MAX_BUILD_MODULE`  | –               | **`9`**                               |
| Build komanda            | `npm run build` | **`npm run build:production`**        |
| `VITE_BASE_PATH`         | `/anatomy/`     | Canonical (senas `/anatomija/` → 301) |
| `VITE_VERIFY_ACCESS_URL` | domain root     | Be pakeitimų                          |

**Draudžiama production:**

- `VITE_MAX_ACCESSIBLE_MODULE=6` arba `9` – atrakina modulius visiems be apmokėjimo.

**Rekomenduojama:** pirmą kartą deploy'inti per **Vercel Preview**, tada prod.

---

## 3. Verify-access API – Phase 2 (tier 9)

Jūsų `GET /api/verify-access` turi priimti **`access_tier=9`** (kartu su 3 ir 6).

Reference implementacija (submodulyje): [api/verify-access.ts](api/verify-access.ts) – `VALID_TIERS = [3, 6, 9]`.

### curl smoke

```bash
# Pakeiskite EXPIRES, TOKEN – generuoti su ACCESS_TOKEN_SECRET
curl -s "https://www.promptanatomy.app/api/verify-access?access_tier=9&expires=EXPIRES&token=TOKEN"
# Tikėtina: 200 {"access_tier":9}
```

---

## 4. Magic link tier 9

**URL pavyzdys:**

```
https://www.promptanatomy.app/anatomy/?access_tier=9&expires=UNIX_TIMESTAMP&token=BASE64URL_HMAC
```

| Parametras    | Reikšmė                                              |
| ------------- | ---------------------------------------------------- |
| `access_tier` | `9` (moduliai 1–9 atrakinti)                         |
| `expires`     | Unix timestamp (sekundės)                            |
| `token`       | HMAC-SHA256 payload `access_tier:expires`, Base64url |

**Po sėkmingo verify (200):**

- SPA išsaugo `localStorage` raktą `verified_access_tier` = `"9"`.
- Moduliai 1–9 atrakinti; M7–M9 atidaromi.
- URL query parametrai išvalomi.

**Pastaba:** Prieiga **kumuliatyvi** – tier 9 atrakina 1–9, ne „tik 7–9“. Upgrade produktas (€49) ir pilnas (€149) abu siunčia **`access_tier=9`**.

---

## 5. Kainodara ir produktai

| Produktas                                | Kaina   | access_tier       | Stripe              |
| ---------------------------------------- | ------- | ----------------- | ------------------- |
| Moduliai 1–3                             | €39     | `3`               | Veikia              |
| Moduliai 1–6                             | €99     | `6`               | Veikia              |
| Moduliai 1–9 (pilnas)                    | €149    | `9`               | **Phase 2**         |
| Upgrade 6→9                              | €49     | `9`               | **Phase 2**         |
| Korporatyvinės licencijos (pvz. 50 vnt.) | sutarta | `9` rankinis link | **Phase 1 – dabar** |

---

## 6. Rankinis tier 9 srautas (Phase 1 – dabar)

Stripe tier 9 **neblokuoja** paleidimo. Kol nėra Stripe produktų:

1. Admin/support script generuoja magic link su `access_tier=9` (tas pats HMAC kaip tier 6).
2. Nuoroda siunčiama el. paštu (Supabase gali saugoti licencijos įrašą, bet **prisijungimas = magic link**, ne Supabase Auth į mokymų SPA).
3. **`expires` rekomendacijos:**
   - Korporatyvinis klientas: 365 d. (arba ilgesnis, pagal sutartį).
   - Retail / upgrade: 30 d. (kaip tier 6).

---

## 7. Elgsena esamiems vartotojams

| Situacija                 | Laukiamas elgesys                                                 |
| ------------------------- | ----------------------------------------------------------------- |
| Tier 0 (neapmokėta)       | `AccessGateScreen` – modulių sąrašo nėra                          |
| Tier 6 (1–6 įsigyta)      | 9 modulių kortelės; M1–6 atrakinti; **M7–9 užrakinti** (€149 CTA) |
| Tier 9                    | M1–9 atrakinti; sertifikatas tier 3 po M7+M8+M9 ir M8 testo ≥70 % |
| Po M6 completion (tier 6) | Upsell blokas → kainodara (Duomenų analizės kelias)               |

---

## 8. Smoke test checklist

- [ ] **Gate tier 0:** `/anatomy/` incognito → „Prieiga ribota“, ne modulių kortelės.
- [ ] **Tier 6:** validus link → 6 moduliai atrakinti; M7 kortelė matoma, bet locked.
- [ ] **Tier 9 curl:** `access_tier=9` → 200 `{"access_tier":9}`.
- [ ] **Tier 9 browser:** validus link → M7 atsidaro; `localStorage verified_access_tier` = `"9"`.
- [ ] **Submodule SHA:** Vercel build log atitinka tikėtiną inzinerija commit.
- [ ] **PostHog** (optional, MON-4): `pricing_click` su `cta_id: m6_upsell_tier9`.

---

## 9. Phase 2 Stripe backlog (ne launch blocker)

1. Stripe produktas **€149** – pilnas kelias 1–9 → redirect `access_tier=9`.
2. Stripe produktas **€49** – upgrade (tikrinama, kad vartotojas jau turi tier 6, arba rankinis support) → redirect `access_tier=9`.
3. Success puslapis – mygtukas „Eiti į mokymus“ su magic link (kaip tier 6).

---

## 10. Ko NELIESTI

- **`ACCESS_TOKEN_SECRET`** – tik jūsų serveryje; SPA jo nenaudoja.
- **Maršrutas `/anatomy/`** (senas `/anatomija/` → 301) – SPA fallback be pakeitimų.
- **Tier 3 ir 6 srautai** – lieka kaip Phase 1; tier 9 yra papildymas.

---

## 11. Submodule atnaujinimas

Po inzinerija release su tier 9 fix:

```bash
cd apps/prompt-anatomy && git fetch && git checkout main && git pull
cd ../.. && git add apps/prompt-anatomy && git commit -m "chore: update prompt-anatomy submodule for tier 9 production build"
```

Tada Vercel env pagal §2 ir redeploy.

---

**Klausimai:** kreiptis į mokymų app atsakingą asmenį.
