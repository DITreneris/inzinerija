# Marketing submodule pin – release 1.4.4

> **Repo:** [DITreneris/promptanatomy](https://github.com/DITreneris/promptanatomy)  
> **Training šaltinis:** [DITreneris/inzinerija](https://github.com/DITreneris/inzinerija) → submodule `apps/prompt-anatomy/`  
> **Atnaujinta:** 2026-07-09  
> **Susiję:** `MARKETING_HANDOFF_CHECKLIST.md` §4, §8; `MON_P0_EXECUTION_PLAN.md` §Savaitė 1

---

## Tikslas

Po inzinerija release **v1.4.4** atnaujinti marketing monorepo submodule ir deploy'inti production M1–9 bundle į `https://www.promptanatomy.app/anatomy/`.

---

## 1. Patvirtinti training release (inzinerija)

```bash
cd inzinerija
git fetch --tags
git checkout v1.4.4   # arba konkretus SHA po tag
npm run audit:release-preflight
```

**Exit kriterijus:** exit code 0 (schema, lint, DS gate, M1–9 EN auditai, 465 testai).

---

## 2. Atnaujinti submodule (promptanatomy)

```bash
cd promptanatomy
git submodule update --init --recursive
cd apps/prompt-anatomy
git fetch origin
git checkout v1.4.4
cd ../..
git add apps/prompt-anatomy
git commit -m "chore: pin prompt-anatomy submodule to v1.4.4"
git push origin main
```

**Patikra commit message:** submodule SHA = `git rev-parse v1.4.4` inzinerija repo.

---

## 3. Vercel env audit (MON-1, MON-8)

| Kintamasis                                   | Production                          | Draudžiama     |
| -------------------------------------------- | ----------------------------------- | -------------- |
| `VITE_MVP_MODE`                              | **nėra**                            | `1`            |
| `VITE_MAX_ACCESSIBLE_MODULE`                 | **nėra**                            | `6`, `9`       |
| `VITE_MAX_BUILD_MODULE`                      | `9` (per `scripts/vercel-build.sh`) | —              |
| `VITE_BASE_PATH`                             | `/anatomy/` (build script)          | —              |
| `ACCESS_TOKEN_SECRET`                        | ≥32 chars, shared su verify         | —              |
| `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` | nustatyti                           | —              |
| `STRIPE_*`                                   | live keys                           | test keys prod |

Build komanda marketing repo: `npm run build:vercel` (kviečia `scripts/vercel-build.sh`).

---

## 4. Preview smoke (prieš prod)

Vykdyti [`RELEASE_QA_RUN.md`](../development/RELEASE_QA_RUN.md) §MON-5 ant **Preview URL**:

1. Tier 0: `/anatomy/` be query → AccessGateScreen
2. Stripe tier 6 magic link → M1–6 open, M7–9 locked
3. Supabase email → `GET /api/generate-access-link?email=...` → tier 9 redirect → M1–9 open

---

## 5. Prod deploy

1. Merge/push submodule commit → Vercel auto deploy
2. Build log: patvirtinti `apps/prompt-anatomy` SHA = v1.4.4
3. Pakartoti §4 smoke ant `https://www.promptanatomy.app`

---

## Kas nauja 1.4.4 (vs v1.4.3)

- Tier 4/5 sertifikatai + `m1012` / `m1315` PDF atmintinės (full catalog; ne prod M1–9 bundle)
- `completionArtifacts.json` registry + M4 PDF handout + stabilūs sertifikato serial numeriai
- DS Next Waves W7–W10 (`Banner`, `SlideWorkspace`, design-token gate 417)
- Cross-repo docs: `INTEGRATION_OVERVIEW.md` Supabase tiltas

---

## Nuorodos

| Dokumentas        | Kelias                                     |
| ----------------- | ------------------------------------------ |
| Handoff checklist | `MARKETING_HANDOFF_CHECKLIST.md`           |
| Tier 9 memo       | `05_marketingo_memo_tier9_vienas_build.md` |
| Prod smoke        | `RELEASE_QA_RUN.md` §MON-5                 |
| PostHog           | `MON-4_POSTHOG_DEPLOY.md`                  |
