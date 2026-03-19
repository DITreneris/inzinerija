# 🗺️ Promptų anatomija – Plėtros roadmap

> **Atnaujinta:** 2026-03-10 | **Versija:** 2.1  
> **Principas:** Stabilumas ir turinys pirmiausia; deploy paruošimas → paleidimas → post-deploy monitoring ir iteracijos.

---

## 1. Gilaus analizės santrauka (2026-03-10)

### Kas įgyvendinta ir stabilu

| Sritis                                                                  | Būsena               | Pastabos                                                                                                                              |
| ----------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Moduliai 1–6**                                                        | ✅ Pilnai            | Teorija (M1), testas (M2), praktika (M3), pažangus (M4–M6). Duomenys: `modules.json`; EN: `modules-en.json`, `modules-en-m4-m6.json`. |
| **LT/EN (i18n)**                                                        | ✅ Pilnas UI + M1–M6 | 16 namespace; loaderiai merge pagal locale; schemos, AiDetectorsSlide, ProcessStepper – lokalizuoti.                                  |
| **Žodynėlis, apklausa, sertifikatai, PDF (M5/M6), įrankiai, progresas** | ✅                   | Path-step žodynėlio atrakinimas (M7); certificate + handout PDF su NotoSans.                                                          |
| **Access tier ir MVP režimas**                                          | ✅                   | `accessTier.ts`: DEV→sessionStorage→URL→env→VITE_MVP_MODE; magic link `api/verify-access.ts`; užrakinimas modulių.                    |
| **Build ir CI**                                                         | ✅                   | `prebuild` → `validate:schema`; test.yml: lint, test:run, VITE_MVP_MODE=1 build; Node 18/20.                                          |
| **Dokumentacija**                                                       | ✅                   | DOCUMENTATION_QUICK_REF, LEAN_INDEX, DEPLOYMENT, INTEGRATION_OVERVIEW; archyvas išvalytas (pre-launch).                               |

### Žinomi trūkumai / sprendžiami

| Sritis                        | Kas                                                                                                                                                   | Prioritetas              |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **Navigacija (Pirmyn/Atgal)** | ✅ Įgyvendinta – viena sticky juosta viršuje, primary „Tęsti“, Atgal ghost (CHANGELOG 2026-02-26, 2026-02-28).                                        | —                        |
| **GitHub Pages deploy**       | `.github/workflows/deploy.yml` build su `VITE_MVP_MODE=1` – **moduliai 1–6**, bet komentaras sako „1–3“; production 1–6 reikalauja env arba monorepo. | Patikrinti / sutapatinti |
| **M5/M6 PDF**                 | Rankinė lietuviškų raidžių ir parsisiuntimo patikra; NotoSans production.                                                                             | Prieš release            |
| **Footer numeriai M4**        | 65.8, 66.9 – prieš release pagal `footer-slide-numbers.mdc`.                                                                                          | Release gate             |
| **E2E**                       | Nėra; kritiniai flow (registracija → M1 → M3 → apklausa) – rekomenduojama 1–2 testai.                                                                 | Aukštas (post-MVP)       |
| **Monitoring**                | Sentry/GA4/PostHog neįdiegti; analytics eventai aprašyti (ANALYTICS_EVENT_TAXONOMY, ANALYTICS_DASHBOARD_MVP).                                         | Post-deploy              |

### Testai ir kokybė

- **~26 testų failų:** unit (loaders, progress, PDF, accessTier), component (QuizPage, CertificateScreen, ToolsPage, ErrorBoundary), integration (App.quiz, progress), a11y smoke (axe-core), mvp.gating.
- **Validacija:** `validate-schema.mjs` – modules, glossary, tools, certificateContent, sot_index ir kt. – vykdoma `prebuild`.
- **Release vartas:** rankinė peržiūra pagal `docs/development/RELEASE_QA_CHECKLIST.md` (§1–5, 5a–5c, §6 MVP, §7 turinys/UX).

---

## 2. Pasiruošimas deploy (pre-deploy)

**Tikslas:** Prieš pirmą production deploy į promptanatomy.app (arba GitHub Pages) – užbaigti kritinius punktus ir perbėgti release checklist.

### 2.1 Privaloma (blokuoja deploy)

| #   | Užduotis                                                                                                                                                    | Šaltinis                  | Agentas  |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | -------- |
| 1   | **RELEASE_QA_CHECKLIST** – perbėgti §1–5, 5a–5c, §6 (MVP), §7 (vienas modulis + CTA).                                                                       | RELEASE_QA_CHECKLIST.md   | QA_AGENT |
| 2   | **Build ir testai** – `npm run validate:schema`, `npm run lint`, `npm run test:run`, `npm run build` (ir su `VITE_MVP_MODE=1`) – visi žali.                 | CI, lokaliai              | —        |
| 3   | **Lietuviškos raidės** – bent 1 skaidrė/modulį + QuizPage + HomePage + sertifikato/PDF atsisiuntimas (NotoSans).                                            | RELEASE_QA_CHECKLIST §5   | QA_AGENT |
| 4   | **EN locale (jei palaikomas)** – perjungimas LT↔EN, raktų paritetas lt.json/en.json, automatiniai testai (`npm run test:run`).                              | RELEASE_QA_CHECKLIST §5c  | QA_AGENT |
| 5   | **Deploy workflow** – nuspręsti: GitHub Pages (env VITE_MVP_MODE=1 → 6 moduliai) arba Vercel/monorepo; atitinkamai atnaujinti deploy.yml komentarus ir env. | deploy.yml, DEPLOYMENT.md | —        |

### 2.2 Rekomenduojama (prieš pirmą deploy)

| #   | Užduotis                                                                                                                                | Pastaba                   |
| --- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| 6   | **M5/M6 PDF rankinė** – parsisiuntimas, atidaryti PDF – ą, ė, į, š, ų, ū, ž; `public/fonts/NotoSans-Regular.ttf` servinamas production. | PDF_DOWNLOAD_TESTING.md   |
| 7   | **Broken links** – skip link, 1–2 išorinės nuorodos, AI detektoriai / Prompt biblioteka.                                                | RELEASE_QA_CHECKLIST §1   |
| 8   | **Mobile sanity** – 375×667, viena skaidrė, navigacija; dark mode perjungimas.                                                          | RELEASE_QA_CHECKLIST §2–3 |
| 9   | **DOCUMENTATION_INDEX** – nuorodos neį neegzistuojančius failus; README → INTEGRATION_OVERVIEW.                                         | PRE_LAUNCH                |

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

| Scenarijus                       | Env                                                   | Rezultatas                                                                                                    |
| -------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **GitHub Pages (dabartinis)**    | VITE_MVP_MODE=1                                       | Core profilis: buildinami tik moduliai 1–6. Base path: `/anatomija/` (arba repo nustatymas).                  |
| **Vercel / marketingo monorepo** | VITE_BASE_PATH, VITE_MVP_MODE, VITE_VERIFY_ACCESS_URL | Tas pats turinys; verify-access API – marketingo atsakomybė; SPA fallback po `/academy` (arba kitas path).    |
| **Demo (visi 1–6 be pirkimo)**   | VITE_MAX_ACCESSIBLE_MODULE=6                          | Visi 1–6 atrakinti be magic link.                                                                             |
| **Magic link (apmokėjimas)**     | —                                                     | Redirect į `?access_tier=6&expires=...&token=...`; frontend kreipiasi į `/api/verify-access`; sessionStorage. |

### 3.3 Veiksmai deploy metu

1. Įsitikinti, kad main (arba release šaka) pereina CI.
2. Paleisti deploy (auto per push arba workflow_dispatch).
3. Patikrinti production URL: moduliai, kalbos perjungiklis, apklausa, sertifikatas, PDF atsisiuntimas.
4. Jei monorepo – marketingo pusė: build:training, Vercel rewrites, verify-access endpoint.

---

## 4. Post-deploy

### 4.1 Pirmos 1–2 savaites

| #   | Užduotis                           | Tikslas                                                                                                                        |
| --- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| 1   | **Monitoring įdiegimas**           | Sentry (klaidos) arba PostHog/GA4 (funnel, completion, drop-off). Žr. ANALYTICS_EVENT_TAXONOMY.md, ANALYTICS_DASHBOARD_MVP.md. |
| 2   | **Verify-access (jei naudojamas)** | Įsitikinti, kad magic link ir API veikia production; testuoti 200/401/400.                                                     |
| 3   | **Smoke**                          | Kasdien arba po kiekvieno deploy: pagrindinis kelias (Home → Moduliai → 1 skaidrė → Apklausa) atsidaro, nėra konsolės klaidų.  |
| 4   | **Dokumentacijos atnaujinimas**    | CHANGELOG – 1.3.0 released (2026-03-16); README / INTEGRATION_OVERVIEW – jei kas pasikeitė.                                    |

### 4.2 Po 2–4 savaičių (duomenų surinkimas)

| #   | Užduotis                        | Šaltinis                                                                        |
| --- | ------------------------------- | ------------------------------------------------------------------------------- |
| 5   | **Baseline metrikos**           | M1/M3 completion, drop-off taškai, CTA conversion (ANALYTICS_DASHBOARD_MVP §2). |
| 6   | **Target ranges**               | Koreguoti KPI interpretacijas pagal realius skaičius.                           |
| 7   | **Vartotojų grįžtamasis ryšys** | Surenkamas į VARTOTOJU_ATSILIEPIMAI_BENDRAS.md; prioritetai į TODO.md.          |

### 4.3 Tolesni roadmap etapai (realistiškai)

| Etapas                     | Ką darome                                                                                                             | Prioritetas |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------- | ----------- |
| **Stabilumas**             | E2E 1–2 kritiniams flow; modulių užrakinimo įjungimas (DISABLE_MODULE_LOCK tik dev/localhost – jau taip).             | Aukštas     |
| **Turinys ir duomenys**    | Modulių 4–6 turinio sinchronas (JSON ↔ SOT); „Kur pritaikyti?“ blokas (MUST M5); 6 blokų structure check (SHOULD S1). | Aukštas     |
| **UX poliravimas**         | Sertifikato/PDF kokybė; a11y axe-core; Optional → „Fast track“ (S4); Starter lygio įvardijimas (S5).                  | Vidutinis   |
| **Pedagogika**             | Sandbox pranešimas, diagnostinis quiz feedback, modulių pabaigos „kūrinys“ (PEDAGOGINES_IZVALGOS_ROADMAP).            | Vidutinis   |
| **B2B / marketing**        | B2B pitch 1 psl. arba PDF (S6).                                                                                       | Žemas       |
| **Pasirinktinai (vėliau)** | PWA, DI grįžtamasis ryšys praktikoms, moduliai 7–15 pilnai, role-first.                                               | Žemas       |

**Ko dabar nedaryti:** Backend/auth (per anksti), advanced gamification. LT/EN – įdiegta; tolesni žingsniai – papildomi EN turinio/vertimo darbai pagal poreikį.

---

## 5. Turinio plėtra: moduliai 7–15

**Trys keliai:** Duomenų analizė (7–9), Agentų inžinerija (10–12), Turinio inžinerija (13–15). Pamatas 1–6; vienas privalomas kelias + kiti atrakinami po completion.

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
| Kas įgyvendinta                        | docs/development/CODEBASE_WHAT_IS_DONE.md                                                 |
| Analytics MVP                          | docs/development/ANALYTICS_EVENT_TAXONOMY.md, docs/development/ANALYTICS_DASHBOARD_MVP.md |

---

**Roadmap atnaujinimas:** Kas mėnesį – prioritetų peržiūra; po release – įgyvendintų punktų pažymėjimas. Kitas peržiūrėjimas – 2026-04.
