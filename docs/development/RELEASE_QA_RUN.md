# Release QA vykdymas (Faze 0.1, 0.2, 0.4)

> **Tikslas:** Vieno vykdymo dokumentas – automatinės patikros rezultatai + žingsnis po žingsnio rankinė (Faze 0.1, 0.2, 0.4).  
> **Šaltinis:** RELEASE_QA_CHECKLIST §1–6, §5d; planas „Vartotojui paruošta įrankis“.

---

## Automatinės patikros rezultatai (2026-03-11)

| §                         | Patikra                                              | Rezultatas | Pastaba                                                                                                                     |
| ------------------------- | ---------------------------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------- | ----- | --------- | ----------- | ---- | ----------------------- |
| **§1 Skip link**          | `href="#main-content"` ir `<main id="main-content">` | ✅         | App.tsx: skip link su `t('skipToContent')` („Praleisti į turinį“), main id="main-content", role="main".                     |
| **§1 LT/EN skip**         | Tekstas LT/EN                                        | ✅         | lt.json: „Praleisti į turinį“; en.json: „Skip to content“.                                                                  |
| **§4 Rodyklės**           | Skaidrių navigacija ← →                              | ✅         | useSlideNavigation.ts: ArrowLeft/ArrowRight/ArrowUp/ArrowDown – nextSlide/prevSlide; ModuleView naudoja useSlideNavigation. |
| **§5 Lietuviškos (grep)** | Tipinių klaidų nebuvimas                             | ✅         | Grep `perziureti                                                                                                            | Ziniu | zemelapis | Ka ismokote | ypac | reiskia` src – nerasta. |
| **Footer ≤55**            | scripts/audit-footer-length.mjs                      | ✅         | Vykdyta anksčiau – „all ≤55 chars OK“.                                                                                      |

**Kas reikalauja rankinės:** §1 (Tab → Enter skip link veikimas), §2 mobile, §3 dark mode, §5 lietuviškos (vizualinė 1 skaidrė/modulis), §5a paprasta kalba, §5d M5/M6 PDF ir M4/M6 skaidrės.

---

## Faze 0.1 ir 0.2 – Rankinė (žmogus)

### 0.1 M5 / M6 PDF – lietuviškos raidės

1. **M5 PDF**
   - Atidaryti aplikaciją → Moduliai → **Modulis 5**.
   - Baigti testą (atsakyti į klausimus iki pabaigos).
   - Rezultatų skaidrėje paspausti **„Parsisiųsti Modulio 5 atmintinę (PDF)“**.
   - Atsidaryti parsisiųstą PDF.
   - **Patikrinti:** raidės ą, ė, į, š, ų, ū, ž rodomos teisingai (ne □ ar kita subsitucija). Žr. `docs/development/PDF_DOWNLOAD_TESTING.md`, `public/fonts/README.md` (NotoSans).

2. **M6 PDF**
   - Moduliai → **Modulis 6** → atlikti praktiką iki ModuleCompleteScreen.
   - Paspausti **„Parsisiųsti Modulio 6 atmintinę (PDF)“** (arba atitinkamą mygtuką).
   - Atsidaryti PDF – lietuviškos raidės ir turinys atitinka.

**Rezultatą įrašyti:** TEST_REPORT arba šio failo skyriuje „Paskutinio vykdymo rezultatai“.

---

### 0.2 M4 skaidrė 56 ir M6 skaidrė 64

3. **M4 skaidrė 56 (RAG: kas tai ir pabandyk)**
   - Moduliai → Modulis 4 → nueiti į **skaidrę 21** (modulyje: „RAG: kas tai ir pabandyk“ / shortTitle „RAG praktiškai“).
   - **Patikrinti:**
     - Navigacija (← / →) veikia.
     - Sekcija **„Agentinė vizualizacija“** su `image: "llm_arch_diagram"` – tabai (Bazinis, RAG, Įrankiai) veikia.
     - **Kopijuojamas promptas** – mygtukas „Kopijuoti“ veikia, tekstas nukopijuojamas.
     - Jei yra nuoroda **„Peržiūrėti pilname dydyje“** – paspausti ir įsitikinti, kad atsidaro tas pats turinys (diagrama/schema), ne 404.
   - Turinys skaitomas, lietuviškos raidės teisingos.

4. **M6 skaidrė 64 (Duomenų tvarkymas – Pagalbinis promptas)**
   - Moduliai → Modulis 6 → nueiti į skaidrę su **„Pagalbinis promptas: duomenų tvarkymo sistema“** (section heading) arba pavadinimu **„Duomenų tvarkymas (praktinė atmintinė)“**.
   - **Patikrinti:**
     - Mygtukas **„Kopijuoti“** (prie copyable prompto) veikia.
     - Lietuviškos raidės tekste teisingos.
     - Turinys atitinka (5 punktų atmintinė, biblioteka, versijavimas ir kt.).

**Rezultatą įrašyti:** TEST_REPORT arba žemiau „Paskutinio vykdymo rezultatai“.

---

## Faze 0.4 – RELEASE_QA_CHECKLIST §1–6 (rankinė)

Vykdyti eilės tvarka; pažymėti kiekvieną punktą.

### §1 Broken links (~2 min)

- [ ] **Skip link:** Home → Tab (kelis kartus) → matomas „Praleisti į turinį“ → Enter. Fokusas turi pereiti į main turinį (ne į meniu).
- [ ] **Išorinė nuoroda (1–2 spot check):** Pvz. App footer GitHub nuoroda arba ContentSlides nuoroda į šaltinį – atsidaro naujame lange, nėra 404.
- [ ] **AI detektoriai / Prompt biblioteka:** Jei naudojami – nuorodos atsidaro.

### §2 Mobile sanity (~1 min)

- [ ] **Viewport:** DevTools → Mobile (375×667 arba iPhone SE) – puslapis nesusilūžęs.
- [ ] **Modulio skaidrė:** Moduliai → Modulis 1 → 1 skaidrė – tekstas skaitomas, mygtukai paspaudžiami, navigacija (← / →) veikia.
- [ ] (Rekomenduojama) Modulis 2 ir 3 – bent viena skaidrė (test-intro arba practice).

### §3 Dark mode (~1 min)

- [ ] Tema perjungiama (light ↔ dark) – išsaugoma (refresh išlieka).
- [ ] Bent viena skaidrė (M1 arba M4) – tekstas skaitomas, kontrastas pakankamas, nėra baltų „dėmių“.

### §4 A11y smoke (~1 min)

- [ ] Skip link: Tab → „Praleisti į turinį“ → Enter – fokusas į main.
- [ ] Skaidrių navigacija: Modulio skaidrė – rodyklės ← → keičia skaidres.

### §5 Lietuviškos raidės (~1 min)

- [ ] Prioritetinės vietos: HomePage, bent 1 skaidrė iš kiekvieno modulio (M1–M6), Testo rezultatai, žodynėlis.
- [ ] Greitas patikrinimas: nėra „išlindusių“ ASCII vietoj ž, ė, ą, ų, ū, š, č, į (žr. RELEASE_QA_CHECKLIST §5 dažnas klaidų sąrašas).
- [ ] Sertifikato PDF (jei įdiegta): baigus M3 → „Parsisiųsti sertifikatą“ → vardas su diakritika → PDF atsidaro su teisingomis raidėmis.

### §5a Paprasta kalba (~1 min)

- [ ] Bent vienas modulis (rekomenduojama M3/M9): antraštėse ir aprašymuose nėra žargono be paaiškinimo (ROI, CFO, EBITDA, NPS, SWOT, influencer ir kt.) arba yra vienas sakinio paaiškinimas. Žr. `docs/development/PAPRASTOS_KALBOS_GAIRES.md`.

### §5d M5/M6 PDF ir skaidrės (0.1, 0.2)

- [ ] M5 PDF – atsisiųstas, lietuviškos raidės teisingos (0.1).
- [ ] M6 PDF – atsisiųstas, turinys atitinka (0.1).
- [ ] M4 skaidrė 56 – navigacija, LlmArch tabai, copyable, „Peržiūrėti pilname dydyje“ (0.2).
- [ ] M6 skaidrė 64 – Kopijuoti, lietuviškos raidės (0.2).

### §6 MVP release (jei deploy su VITE_MVP_MODE=1)

- [ ] 6 moduliai atidaryti, 7+ su „Moduliai 7–15 ateityje“.
- [ ] Glossary – filtre Moduliai 1–6.
- [ ] HomePage CTA po 6 modulių – „Į apklausą“.

---

## MON-5 – Production gate check (rankinė, prieš mokamą srautą)

> **Tikslas:** patvirtinti, kad neapmokėtas lankytojas production mato `AccessGateScreen`, o magic link atrakina tik apmokėtą tier. Automatinė dalis: `src/components/__tests__/gate.smoke.test.tsx` (tier 0/3/6/9, EN locale, `pricing_click`).

1. **Neapmokėtas (tier 0):** incognito langas → `https://www.promptanatomy.app/anatomy/` → matomas „Prieiga ribota“ (AccessGateScreen), **ne** modulių sąrašas. CTA „Įsigyti prieigą“ veda į kainodarą (domain root).
2. **Tier 6 magic link:** atidaryti tier 6 nuorodą → M1–M6 kortelės atidaromos, M7–M9 užrakintos (tier lock), M10–12 nerodomos.
3. **Tier 9 magic link:** M1–M9 atidaromos; M10–12 rodomos tik kaip neaktyvios „Ruošiama“ kortelės (be nuorodų).
4. **Refresh:** po atrakinimo perkrauti puslapį – tier išlieka (`verified_access_tier` localStorage), gate negrįžta.
5. **Klaidingas token:** magic link su pasibaigusiu/netikru token → gate lieka, konsolėje 401 iš `/api/verify-access` (ne `/anatomy/api/...`).

**Rezultatą įrašyti:** lentelė žemiau arba `TEST_REPORT.md`. Susiję: `TODO.md` §1.1 MON-5, `docs/deployment/MON_P0_EXECUTION_PLAN.md` §Savaitė 1.

---

## Paskutinio vykdymo rezultatai

### 2026-07-15 Docs maintenance catch-up

| Patikra                                  | Rezultatas | Įrodymas                                                                                                                        |
| ---------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `npm run test:run`                       | ✅         | **72 testų failai / 482 testai**, exit 0 (M7–M9 P2 + linkedRowIndex test)                                                       |
| `node scripts/validate-sot-index.mjs`    | ✅         | `m79_patch_registry`, `docs_maintenance` registry įrašai                                                                        |
| Docs meta sync                           | ✅         | `DOCS_MAINTENANCE.md`, `M79_PATCH_REGISTRY.md`, `CODEBASE_WHAT_IS_DONE`, `ROADMAP`, `LEAN_INDEX`, `DOCS_SYNC_CHECKLIST`       |

### 2026-07-09 Cross-repo pre-launch (Faze 0 + dalinė Faze 3)

| Patikra                                  | Rezultatas | Įrodymas                                                                                                                        |
| ---------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `npm run audit:release-preflight`        | ✅         | Schema, lint, DS gate (417/59), module-identity 15/15, audit:m49, nav-labels, m7-pathbranch, **71 failai / 465 testai**, exit 0 |
| `npm run audit:slide-interactivity`      | ✅         | 262 skaidrės; warm-up=15, path=12; no warnings                                                                                  |
| `npm run audit:embed-catalog`            | ✅         | 10 embedded pattern'ai (M2/M4/M5/M6/M13)                                                                                        |
| `npm run audit:test-scenario-share`      | ✅         | M11 33%, M14 38% scenario share                                                                                                 |
| **Prod** `/anatomy/` HTTP                | ✅         | 200                                                                                                                             |
| **Prod** `verify-access` invalid token   | ✅         | `{"error":"Link expired"}` (endpoint gyvas)                                                                                     |
| **Prod** `verify-access` be param        | ✅         | 400                                                                                                                             |
| **Prod** `generate-access-link` be email | ✅         | 400                                                                                                                             |
| **Prod** tier 0 gate (browser)           | ⏳ Ranka   | Incognito → AccessGateScreen – reikia žmogaus                                                                                   |
| **Prod** Stripe tier 6 unlock            | ⏳ Ranka   | Checkout → magic link → M1–6                                                                                                    |
| **Prod** Supabase tier 9 unlock          | ⏳ Ranka   | Email → generate-access-link → M1–9                                                                                             |

### 2026-07-09 Rankinė QA (Faze 4) – reikia žmogaus prod `/anatomy/`

| ID   | Patikra                   | Tier | Rezultatas | Pastaba                             |
| ---- | ------------------------- | ---- | ---------- | ----------------------------------- |
| QA-1 | M5 PDF lietuviškos raidės | 6    | ⏳         | Test complete → PDF → ą/ė/į/š/ų/ū/ž |
| QA-2 | M6 PDF lietuviškos raidės | 6    | ⏳         | ModuleComplete → PDF                |
| QA-4 | M4 sk. 56 RAG             | 6    | ⏳         | Tabai, copy, fullscreen             |
| QA-5 | M6 sk. 64 copyable        | 6    | ⏳         | Kopijuoti mygtukas                  |
| QA-6 | Mobile 390px M1/M4/M6     | 6+9  | ⏳         | LT/EN, light/dark                   |

**Vykdymo instrukcijos:** §0.1, §0.2, `RELEASE_QA_CHECKLIST.md` §2–5g. Rezultatą įrašyti į lentelę žemiau.

### 2026-07-09 MON-5 prod smoke (browser) – reikia žmogaus

| #   | Scenarijus                                 | Rezultatas | Pastaba                         |
| --- | ------------------------------------------ | ---------- | ------------------------------- |
| 1   | Incognito `/anatomy/` → AccessGateScreen   | ⏳         |                                 |
| 2   | Tier 6 magic link → M1–6 open, M7–9 locked | ⏳         | Stripe kelias                   |
| 3   | Tier 9 magic link → M1–9 open              | ⏳         | Supabase → generate-access-link |
| 4   | Refresh – tier išlieka localStorage        | ⏳         |                                 |
| 5   | Invalid token → 401, gate lieka            | ✅ API     | curl 2026-07-09                 |

### 2026-07-09 P2 artefaktų docs sync baseline

| Patikra            | Rezultatas | Įrodymas                                                                                                    |
| ------------------ | ---------- | ----------------------------------------------------------------------------------------------------------- |
| `npm run test:run` | ✅         | Post-P2 baseline: 71 testų failas, 465 testai, exit code 0. Dengia tier 4/5 eligibility ir M1012/M1315 PDF. |

### 2026-07-06 agento automatinė patikra

| Patikra                           | Rezultatas | Įrodymas                                                                                                                                 |
| --------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run audit:release-preflight` | ✅         | Schema, lint, M4–M9 EN auditai, M7 pathBranch guard ir `test:run` praėjo. Galutinis rezultatas: 60 testų failų, 402 testai, exit code 0. |
| `npm run test:run`                | ✅         | Docs sync baseline 2026-07-06: 60 testų failų, 403 testai, exit code 0.                                                                  |
| M5/M6 PDF guard testai            | ✅         | `m5HandoutPdf.test.ts`, `m6HandoutPdf.test.ts`, `ModuleCompleteScreen.test.tsx` praėjo: 3 failai, 20 testų, exit code 0.                 |
| M5/M6 PDF vizualinis atidarymas   | ⏳ Ranka   | Terminalo testai patvirtina PDF generatorių ir mygtukų guard'us, bet realų PDF atidarymą ir diakritikų vaizdą turi pažymėti žmogus.      |

_(Žmogus įrašo, kai atliko rankinę naršyklės/PDF peržiūrą.)_

| Data | Vykdytojas | 0.1 M5 PDF | 0.1 M6 PDF | 0.2 M4 sk.56 | 0.2 M6 sk.64 | §1  | §2  | §3  | §4  | §5  | §5a | §6 (jei taikoma) |
| ---- | ---------- | ---------- | ---------- | ------------ | ------------ | --- | --- | --- | --- | --- | --- | ---------------- |
| —    | —          | —          | —          | —            | —            | —   | —   | —   | —   | —   | —   | —                |

---

## Nuorodos

- **Checklist:** `docs/development/RELEASE_QA_CHECKLIST.md`
- **PDF testai:** `docs/development/PDF_DOWNLOAD_TESTING.md`, `docs/development/PDF_MAKETO_GAIRES.md`
- **Paprasta kalba:** `docs/development/PAPRASTOS_KALBOS_GAIRES.md`
- **Marketing submodule pin:** `docs/deployment/MARKETING_SUBMODULE_PIN_1.4.4.md`
- **PostHog MON-4:** `docs/deployment/MON-4_POSTHOG_DEPLOY.md`
- **Integracija:** `docs/deployment/INTEGRATION_OVERVIEW.md`
- **Planas:** `.cursor/plans/vartotojui_paruošta_įrankis_cfe90c31.plan.md`
