# 🗺️ Promptų anatomija – Plėtros roadmap

> **Atnaujinta:** 2026-06-30 | **Roadmap dokumento versija:** 2.4 (ne `package.json` semver)  
> **App release:** 1.4.1 (2026-06-30) – žr. `CHANGELOG.md` `[1.4.1]`.
> **Principas:** Stabilumas ir turinys pirmiausia; produkcija paleista ([www.promptanatomy.app](https://www.promptanatomy.app)) – post-deploy monitoring, iteracijos ir release QA.  
> **Production audit (2026-06):** **CONDITIONAL GO** — M1–6 shippable; monetizacija ~45% ready. Prioritetai: `TODO.md` §1.1 MON-\*; santrauka: `docs/development/AUDIT_2026-06_SUMMARY.md`.

---

## 1. Gilaus analizės santrauka

### Kas įgyvendinta ir stabilu

| Sritis                                                                  | Būsena                | Pastabos                                                                                                                              |
| ----------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Produkcija (Vercel)**                                                 | ✅ Veikia             | [www.promptanatomy.app](https://www.promptanatomy.app) – submodulis; `npm run build:production` (M1–9). Žr. `CHANGELOG.md` `[1.4.1]`. |
| **Moduliai 1–6**                                                        | ✅ Pilnai             | Teorija (M1), testas (M2), praktika (M3), pažangus (M4–M6). Duomenys: `modules.json`; EN: `modules-en.json`, `modules-en-m4-m6.json`. |
| **Moduliai 7–9**                                                        | ✅ Production bundle  | Duomenų analizės kelias; tier 9; `modules-m1-m9.json`; `build:production`.                                                            |
| **Moduliai 10–12**                                                      | ✅ Authoring kataloge | Agentų kelias; ne production bundle; EN `modules-en-m10-m12.json`. Monetizacija M10+ – Deferred.                                      |
| **LT/EN (i18n)**                                                        | ✅ UI + M1–M12        | 16 namespace; loaderiai merge pagal locale; M10–12 EN kai `maxModuleId >= 10`.                                                        |
| **Žodynėlis, apklausa, sertifikatai, PDF (M5/M6), įrankiai, progresas** | ✅                    | Path-step žodynėlio atrakinimas (M7); certificate + handout PDF su NotoSans.                                                          |
| **Access tier ir MVP režimas**                                          | ✅                    | Magic link tier 3 / 6 / 9; `build:production` M1–9; MVP `VITE_MVP_MODE=1` M1–6.                                                       |
| **Build ir CI**                                                         | ✅                    | `prebuild` → `validate:schema`; test.yml: lint, test:run, `VITE_MAX_BUILD_MODULE=9` build; Node 18/20.                                |
| **Dokumentacija**                                                       | ✅                    | DOCUMENTATION_QUICK_REF, LEAN_INDEX, DEPLOYMENT, INTEGRATION_OVERVIEW; archyvas išvalytas (pre-launch).                               |

### Žinomi trūkumai / sprendžiami

| Sritis                        | Kas                                                                                                                                                                                                                                 | Prioritetas                   |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| **Navigacija (Pirmyn/Atgal)** | ✅ Įgyvendinta – viena sticky juosta viršuje, primary „Tęsti“, Atgal ghost (CHANGELOG 2026-02-26, 2026-02-28). Papildomai: in-content CTA į kitą skaidrę – `news-portal` `ctaBlock`, `section-break` footer (CHANGELOG 2026-03-28). | —                             |
| **GitHub Pages deploy**       | `.github/workflows/deploy.yml` build su `VITE_MVP_MODE=1` — **M1–6** statinis preview `/inzinerija/`. **Rizika:** viešas demo gali rodyti pilną turinį be auth, jei gate neaktyvus — žr. `AUDIT_2026-06_SUMMARY.md`.                | Patikrinti gate / demo policy |
| **Paywall scope**             | Home, quiz, tools pasiekiami kai `maxAccessible === 0`; moduliai gated. Client-side bundle – dokumentuota (MON-6 ✅).                                                                                                               | —                             |
| **M5/M6 PDF**                 | Rankinė lietuviškų raidžių ir parsisiuntimo patikra; NotoSans production.                                                                                                                                                           | Prieš release (TODO #1–#2)    |
| **Footer numeriai M4**        | 65.8, 66.9 – prieš release pagal `footer-slide-numbers.mdc`.                                                                                                                                                                        | Release gate                  |
| **E2E**                       | Gate smoke vitest (`gate.smoke.test.tsx`) ✅; Playwright – roadmap.                                                                                                                                                                 | P1 (post MON-\*)              |
| **Monitoring**                | PostHog/GA4 neįdiegti production; eventai aprašyti. **P0 prieš mokamą srautą** — TODO MON-4.                                                                                                                                        | P0 (MON-4)                    |

### Testai ir kokybė

- **43 testų failai, 266 testai:** unit, component, integration, a11y smoke, gate tier 9.
- **Validacija:** `validate-schema.mjs` – modules, glossary, tools, certificateContent, sot_index ir kt. – vykdoma `prebuild`.
- **Release vartas:** rankinė peržiūra pagal `docs/development/RELEASE_QA_CHECKLIST.md` (§1–5, 5a–5c, §6 MVP, §7 turinys/UX).

---

## 2. Pasiruošimas deploy (pre-deploy ir nauji release)

**Tikslas:** Kiekvienam naujam **production** deploy (šiuo metu pagrindinis kelias – **Vercel** + [www.promptanatomy.app](https://www.promptanatomy.app), submodulis) – kritiniai punktai ir release checklist. **GitHub Pages** lieka statiniam preview (`/inzinerija/`); pilnas production modelis – monorepo / marketing + training app.

### 2.1 Privaloma (blokuoja deploy)

| #   | Užduotis                                                                                                                                                    | Šaltinis                  | Agentas  |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | -------- |
| 1   | **RELEASE_QA_CHECKLIST** – perbėgti §1–5, 5a–5c, §6 (MVP), §7 (vienas modulis + CTA).                                                                       | RELEASE_QA_CHECKLIST.md   | QA_AGENT |
| 2   | **Build ir testai** – `npm run validate:schema`, `npm run lint`, `npm run test:run`, `npm run build` (ir su `VITE_MVP_MODE=1`) – visi žali.                 | CI, lokaliai              | —        |
| 3   | **Lietuviškos raidės** – bent 1 skaidrė/modulį + QuizPage + HomePage + sertifikato/PDF atsisiuntimas (NotoSans).                                            | RELEASE_QA_CHECKLIST §5   | QA_AGENT |
| 4   | **EN locale (jei palaikomas)** – perjungimas LT↔EN, raktų paritetas lt.json/en.json, automatiniai testai (`npm run test:run`).                              | RELEASE_QA_CHECKLIST §5c  | QA_AGENT |
| 5   | **Deploy workflow** – nuspręsti: GitHub Pages (env VITE_MVP_MODE=1 → 6 moduliai) arba Vercel/monorepo; atitinkamai atnaujinti deploy.yml komentarus ir env. | deploy.yml, DEPLOYMENT.md | —        |

### 2.2 Rekomenduojama (prieš pirmą deploy)

| #   | Užduotis                                                                                                                                                                                    | Pastaba                   |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| 6   | **M5/M6 PDF rankinė** – parsisiuntimas, atidaryti PDF – ą, ė, į, š, ų, ū, ž; `public/fonts/Roboto-Regular.ttf` (pageidautina) arba atsarginis `NotoSans-Regular.ttf` servinamas production. | PDF_DOWNLOAD_TESTING.md   |
| 7   | **Broken links** – skip link, 1–2 išorinės nuorodos, AI detektoriai / Prompt biblioteka.                                                                                                    | RELEASE_QA_CHECKLIST §1   |
| 8   | **Mobile sanity** – 375×667, viena skaidrė, navigacija; dark mode perjungimas.                                                                                                              | RELEASE_QA_CHECKLIST §2–3 |
| 9   | **DOCUMENTATION_INDEX** – nuorodos neį neegzistuojančius failus; README → INTEGRATION_OVERVIEW.                                                                                             | PRE_LAUNCH                |

### 2.3 Pasirinktinai (gali likti po deploy)

- Footer numeriai M4 (65.8, 66.9) – globali patikra prieš release pagal `footer-slide-numbers.mdc`.
- Pirmyn/Atgal – jau viena sticky juosta (viršuje); tolesnis poliravimas pagal atsiliepimus.
- A11y axe-core automatizacija kelioms skaidrėms (SHOULD S2).

---

## 3. Deploy (paleidimas)

### 3.1 Dabartinė CI/CD būklė

- **Testai:** push/PR į main, develop → validate:schema, lint, test:run, VITE_MVP_MODE=1 build (Node 18, 20).
- **GitHub Pages:** push į main (arba workflow_dispatch) → build su `VITE_MVP_MODE=1`, upload `dist/`, deploy-pages. **Pastaba:** build išvestis – tik 6 produkciniai moduliai; `7–15` į core profilį nebepatenka.

### 3.2 Production scenarijai

| Scenarijus                       | Env                                                                                       | Rezultatas                                                                             |
| -------------------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **GitHub Pages (demo preview)**  | VITE_MVP_MODE=1                                                                           | Core profilis M1–6. Base path `/inzinerija/`.                                          |
| **Vercel / marketingo monorepo** | `VITE_MAX_BUILD_MODULE=9`, `build:production`, `VITE_BASE_PATH`, `VITE_VERIFY_ACCESS_URL` | Production M1–9; verify-access API – marketingo atsakomybė.                            |
| **Demo (visi 1–6 be pirkimo)**   | VITE_MAX_ACCESSIBLE_MODULE=6                                                              | **Tik staging/demo.** Production build neturi šio env.                                 |
| **Magic link (apmokėjimas)**     | —                                                                                         | `access_tier=3` \| `6` \| `9`; frontend → `/api/verify-access`; tier → `localStorage`. |

### 3.3 Veiksmai deploy metu

1. Įsitikinti, kad main (arba release šaka) pereina CI.
2. Paleisti deploy (auto per push arba workflow_dispatch).
3. Patikrinti production URL: moduliai, kalbos perjungiklis, apklausa, sertifikatas, PDF atsisiuntimas.
4. Jei monorepo – marketingo pusė: build:training, Vercel rewrites, verify-access endpoint.

---

## 4. Post-deploy

### 4.1 P0 prieš mokamą srautą (MON-\*)

| #   | Užduotis                           | Tikslas                                                                  | TODO ID      |
| --- | ---------------------------------- | ------------------------------------------------------------------------ | ------------ |
| 1   | **PostHog / GA4 production**       | Funnel, completion, drop-off; dashboard pagal ANALYTICS_DASHBOARD_MVP.md | MON-4        |
| 2   | **Verify-access production smoke** | Magic link + API 200/401; tier unlock                                    | MON-3        |
| 3   | **Env audit (marketing)**          | No `VITE_MAX_ACCESSIBLE_MODULE=6`; correct `VITE_VERIFY_ACCESS_URL`      | MON-1, MON-2 |
| 4   | **Gate regression**                | Unpaid → AccessGateScreen                                                | MON-5        |

Žr. `docs/deployment/MARKETING_HANDOFF_CHECKLIST.md`.

### 4.2 Pirmos 1–2 savaites (po P0)

| #   | Užduotis                        | Tikslas                                                                    |
| --- | ------------------------------- | -------------------------------------------------------------------------- |
| 5   | **Smoke**                       | Po deploy: Home → Moduliai (gate arba tier) → 1 skaidrė; konsolės klaidos. |
| 6   | **Dokumentacijos atnaujinimas** | CHANGELOG, README, ROADMAP sinchronas su production URL.                   |
| 7   | **Sentry (optional)**           | Production klaidų sekimas — jei PostHog neužtenka operaciniam debug.       |

### 4.3 Po 2–4 savaičių (duomenų surinkimas)

| #   | Užduotis                        | Šaltinis                                                                             |
| --- | ------------------------------- | ------------------------------------------------------------------------------------ |
| 8   | **Baseline metrikos**           | M1/M3 completion, drop-off, CTA conversion (ANALYTICS_DASHBOARD_MVP §2). TODO MON-7. |
| 9   | **Target ranges**               | Koreguoti KPI interpretacijas pagal realius skaičius.                                |
| 10  | **Vartotojų grįžtamasis ryšys** | VARTOTOJU_ATSILIEPIMAI_BENDRAS.md; prioritetai → TODO.md.                            |

### 4.4 Tolesni roadmap etapai (realistiškai)

| Etapas                        | Ką darome                                                                       | Prioritetas      |
| ----------------------------- | ------------------------------------------------------------------------------- | ---------------- |
| **Monetization pilot**        | €39–€99 / €149 tier 9; CONV-1..5 ✅ in-app upsell; marketing funnel (MON-8 env) | P0–P1            |
| **Stabilumas**                | Gate smoke vitest ✅ (CONV-3).                                                  | P1               |
| **Turinys ir duomenys**       | M4–6 JSON ↔ SOT; Release QA PDF (#1–#2).                                        | P1               |
| **UX poliravimas**            | Sertifikato/PDF; a11y; mobile UX-1.                                             | P2               |
| **Pedagogika**                | Sandbox, quiz feedback (PEDAGOGINES_IZVALGOS_ROADMAP).                          | P2               |
| **B2B / marketing**           | B2B pitch; homepage CRO (TODO §3).                                              | P3               |
| **Korporatyvinis kelias 7–9** | M7–9 + `build:production` (tier 9) — **release 1.4.0** (2026-06-30).            | **Aktyvu**       |
| **M10–12 authoring**          | Turinys full kataloge; monetizacija tier 12+ – Deferred.                        | Aktyvu (turinys) |
| **Pasirinktinai (vėliau)**    | PWA; M13–15 pilnas release; monetizacija M10+ po MON-\* + baseline.             | Deferred         |

**Ko dabar nedaryti:** M13–15 pilnas release brandumas; backend rewrite; advanced gamification.

---

## 5. Turinio plėtra: moduliai 7–15

> **Gate monetizacijai M10+:** po MON-\* (P0) ir baseline (MON-7). **7–9 aktyvu** (tier 9, `build:production`). **M10–12 turinys** – authoring kataloge (release 1.4.0); **monetizacija M10+** – vis dar Deferred (`TODO.md` §1.5 DEF-1b).

**Trys keliai:** Duomenų analizė (7–9) — **aktyvu production (tier 9)**; Agentų inžinerija (10–12) — **turinys authoring kataloge**; Turinio inžinerija (13–15) — Deferred monetizacijai.

**SOT:** `docs/turinio_pletra_moduliai_7_8_9.md`, `docs/turinio_pletra_moduliai_10_11_12.md`, `docs/turinio_pletra_moduliai_13_14_15.md`.  
**Įgyvendinimas:** CONTENT_AGENT (SOT semantika) → DATA_AGENT (modules.json id 7–15, atrakinimo logika) → CODING_AGENT (navigacija, hybrid). Skaidrių eilės: MODULIO_7_SKAIDRIU_EILES.md, MODULIO_10_SKAIDRIU_EILES.md, MODULIO_13_SKAIDRIU_EILES.md.

---

## 6. Nuorodos

| Kas                                    | Kur                                                                                       |
| -------------------------------------- | ----------------------------------------------------------------------------------------- |
| Kas kokiam agentui, SOT                | docs/development/AGENT_ORCHESTRATOR.md, docs/DOCUMENTATION_INDEX.md                       |
| Dabartinės užduotys                    | TODO.md                                                                                   |
| Vartotojų atsiliepimai, V2 prioritetai | docs/VARTOTOJU_ATSILIEPIMAI_BENDRAS.md                                                    |
| Release QA                             | docs/development/RELEASE_QA_CHECKLIST.md                                                  |
| Deploy, env, monorepo                  | docs/deployment/DEPLOYMENT.md, docs/deployment/INTEGRATION_OVERVIEW.md                    |
| Kas įgyvendinta, changelog             | docs/development/CODEBASE_WHAT_IS_DONE.md, CHANGELOG.md, README.md (startas)              |
| Analytics MVP                          | docs/development/ANALYTICS_EVENT_TAXONOMY.md, docs/development/ANALYTICS_DASHBOARD_MVP.md |
| Production audit (2026-06)             | docs/development/AUDIT_2026-06_SUMMARY.md                                                 |
| Marketing handoff                      | docs/deployment/MARKETING_HANDOFF_CHECKLIST.md                                            |

---

**Roadmap atnaujinimas:** Kas mėnesį – prioritetų peržiūra; po release – įgyvendintų punktų pažymėjimas. Paskutinė sinchronizacija su TODO / audit — 2026-06-29.
