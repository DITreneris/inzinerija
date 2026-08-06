# Marketing submodule pin – corporate12 (M1–12)

> **Repo:** [DITreneris/promptanatomy](https://github.com/DITreneris/promptanatomy)  
> **Training šaltinis:** [DITreneris/inzinerija](https://github.com/DITreneris/inzinerija) → submodule `apps/prompt-anatomy/`  
> **Atnaujinta:** 2026-08-06  
> **Susiję:** [06_marketingo_memo_corporate12_supabase.md](../../06_marketingo_memo_corporate12_supabase.md), [MARKETING_HANDOFF_CHECKLIST.md](MARKETING_HANDOFF_CHECKLIST.md) §4 / §7a–corporate12, `TODO.md` §1.4 CAV-B1

---

## Tikslas

Po inzinerija app **1.5.0** (corporate12 repo-ready) atnaujinti marketing monorepo submodule ir deploy'inti **M1–12** bundle (`build:corporate12`) į `https://www.promptanatomy.app/anatomy/`, su Supabase Phase 1 `access_tier=12` (be Stripe).

**Ne šis runbook:** learning freeze pin `v1.4.9` (lieka M1–9); corporate15 / tier 15; Stripe €199.

---

## 1. Patvirtinti training release (inzinerija)

```bash
cd inzinerija
git fetch --tags
git checkout 1.5.0   # arba tag/SHA sutartas su marketing; package.json version 1.5.0
npm run audit:m1012
npm run build:corporate12
```

**Exit kriterijus:** `audit:m1012` exit 0; `build:corporate12` exit 0; kataloge M1–12.

---

## 2. Atnaujinti submodule (promptanatomy)

```bash
cd promptanatomy
git submodule update --init --recursive
cd apps/prompt-anatomy
git fetch origin
git checkout 1.5.0
cd ../..
git add apps/prompt-anatomy
git commit -m "chore: pin prompt-anatomy submodule to 1.5.0 for corporate12"
git push origin main
```

**Patikra:** submodule SHA = `git rev-parse 1.5.0` (arba sutartas commit) inzinerija repo.

---

## 3. Vercel env audit (Horizon B)

| Kintamasis                                   | Production (po cutover)     | Draudžiama                      |
| -------------------------------------------- | --------------------------- | ------------------------------- |
| `VITE_MVP_MODE`                              | **nėra**                    | `1`                             |
| `VITE_MAX_ACCESSIBLE_MODULE`                 | **nėra**                    | `6`, `9`, **`12`**              |
| `VITE_MAX_BUILD_MODULE`                      | **`12`**                    | `9` (po cutover)                |
| Build komanda / script                       | **`build:corporate12`**     | `build:production` only         |
| `VITE_BASE_PATH`                             | `/anatomy/`                 | —                               |
| `VITE_VERIFY_ACCESS_URL`                     | domain root / tuščia        | wrong path under `/anatomy/api` |
| `ACCESS_TOKEN_SECRET`                        | ≥32 chars, shared su verify | —                               |
| `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` | nustatyti                   | —                               |

Jei marketing `scripts/vercel-build.sh` hardcodina `MAX_BUILD_MODULE=9`, atnaujinkite scriptą arba env, kad Preview/Prod naudotų **12**.

---

## 4. Parent API prieš Preview smoke

1. `GET /api/verify-access` priima `access_tier=12` (whitelist kaip training `VALID_TIERS`).
2. `GET /api/generate-access-link?email=...`: `highest_plan=12` → redirect su **`access_tier=12`** (ne 12→9).

---

## 5. Preview smoke (prieš prod)

Pagal [06 memo](../../06_marketingo_memo_corporate12_supabase.md) §8:

1. Tier 0: `/anatomy/` be query → AccessGateScreen
2. Tier 9 magic link → M1–9 open; M10+ locked
3. Supabase email (`highest_plan=12`) → `generate-access-link` → tier 12 → M10 opens; `localStorage.verified_access_tier` = `"12"`
4. Build log: submodule SHA = 1.5.0; `VITE_MAX_BUILD_MODULE=12`

---

## 6. Prod deploy

1. Merge/push submodule + env cutover → Vercel prod deploy
2. Build log: patvirtinti `apps/prompt-anatomy` SHA ir `MAX_BUILD_MODULE=12`
3. Pakartoti §5 smoke ant `https://www.promptanatomy.app`

---

## Kas nauja vs M1–9 pin (1.4.4 / production)

- Bundle `*-m1-m12.json` – M10–12 client-side
- Magic link tier **12**; chapter start M10 kai tier ≥ 12
- Agentų kelio sertifikatas (tier 4) + `m1012` handout (kai unlocked)
- Training handoff: memo **06** + šis pin runbook

---

## Nuorodos

| Dokumentas                | Kelias                                       |
| ------------------------- | -------------------------------------------- |
| Corporate12 Supabase memo | `06_marketingo_memo_corporate12_supabase.md` |
| Handoff checklist         | `MARKETING_HANDOFF_CHECKLIST.md`             |
| Integracijos apžvalga     | `INTEGRATION_OVERVIEW.md`                    |
| Tier 9 memo (regresija)   | `05_marketingo_memo_tier9_vienas_build.md`   |
| Ankstesnis M1–9 pin       | `MARKETING_SUBMODULE_PIN_1.4.4.md`           |
