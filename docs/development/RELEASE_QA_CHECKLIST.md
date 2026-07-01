# Release QA Checklist (A-M4)

> **Paskirtis:** 5 min sanity prieš release. Kritinės regresijos aptikimas.
> **Kada:** Prieš kiekvieną deploy / versijavimą.
> **Agentas:** QA_AGENT (dokumentas), atliekama ranka.

---

**Vykdymo gidas (rankinė + automatinė):** Žr. `docs/development/RELEASE_QA_RUN.md` – automatinės patikros rezultatai ir žingsnis po žingsnio 0.1, 0.2, 0.4.

---

## 1. Broken links (~2 min)

- [ ] **Internos nuorodos:** Skip link `#main-content` veikia (Home → klaviatūra Tab → Enter).
- [ ] **Išorinės nuorodos (1–2 spot check):** GitHub (App.tsx footer), bent viena ContentSlides nuoroda (įrankiai, šaltiniai) – atsidaro naujame lange, nėra 404.
- [ ] **AI detektoriai / Prompt biblioteka:** Jei naudojami – nuorodos atsidaro.

---

## 2. Mobile sanity (1 skaidrė / 1 kelionė, ~1 min)

- [ ] **Viewport:** DevTools → Mobile (375×667 arba iPhone SE) – puslapis nesusilūžęs.
- [ ] **Modulio skaidrė:** Pirmas modulis → 1 skaidrė – tekstas skaitomas, mygtukai paspaudžiami, navigacija (← / →) veikia.
- [ ] **Moduliai 2 ir 3 (rekomenduojama):** Modulis 2 – bent test-intro arba test-results (radaras, kategorijų mygtukai); Modulis 3 – practice-intro arba practice-scenario (tab’ai, praktinė užduotis). Išsami mobile patikra – žr. [docs/AUDITO_ATASKAITA_MODULIAI_1_6_MOBILE_UX.md](../AUDITO_ATASKAITA_MODULIAI_1_6_MOBILE_UX.md). Detalės (MOBILE_UI_UX_AUDIT, EN_LANGUAGE_STANDARD) – jei turite lokaliai docs/archive/development/.

---

## 3. Dark mode sanity (1 kelionė, ~1 min)

- [ ] **Perjungimas:** Tema (light ↔ dark) perjungiama – išsaugoma (refresh išlieka).
- [ ] **Skaidrė:** Bent viena skaidrė (pvz. Modulio 1 ar 4) – tekstas skaitomas, kontrastas pakankamas, nėra baltų „dėmių“.
- [ ] **Diagramos:** Bent viena `useDiagramPalette()` diagrama (pvz. M7/M9 arba RL) naudoja tamsų SVG foną, ne šviesų rėmą dark mode aplinkoje.

---

## 4. A11y smoke (~1 min)

- [ ] **Skip link:** Tab nuo puslapio pradžios → matomas „Praleisti į turinį“ (arba panašus) → Enter – fokusas pereina į main turinį.
- [ ] **Klaviatūra:** Skaidrių navigacija veikia rodyklių klavišais (← →).
- [ ] **Touch/focus:** Slide dots, diagramų step nav, testų pasirinkimai ir modal close turi matomą `focus-visible` ring ir ne mažesnį nei 44px interaktyvų taikinį.
- [ ] **Sticky po AppNav:** Sticky elementai po AppNav naudoja `top-[var(--app-nav-height,4rem)]`; `sticky top-0` leidžiamas tik pačiam AppNav arba modalinio turinio viduje.

---

## 5. Lietuviškų raidžių patikrinimas (~1 min)

> **Įtraukta:** 2026-02-11. Tikrinti, kad vartotojui matomieji tekstai naudoja teisingas lietuviškas raides.

- [ ] **Prioritetinės vietos:** HomePage, Testo Rezultatai skaidrė, QuizPage, modulių skaidrės, žodynėlis.
- [ ] **Dažnos klaidos:** `perziureti` → `peržiūrėti`, `Moduli` → `Modulį`, `Ziniu` → `Žinių`, `zemelapis` → `žemėlapis`, `Skaidre` → `Skaidrė`, `Ka ismokote` → `Ką išmokote`, `ypac` → `ypač`, `bloku` → `blokų`, `role` → `rolė`, `struktura` → `struktūra`, `parametru` → `parametrų`, `reiskia` → `reiškia`.
- [ ] **Greitas patikrinimas:** Peržiūrėti bent 1 skaidrę iš kiekvieno modulio + Testo Rezultatus + Pagrindinį – ar nėra „išlindusių“ ASCII raidžių vietoj ž, ė, ą, ų, ū, š, č, į.
- [ ] **Sertifikato PDF (jei įdiegta):** Baigus 3. modulį → „Parsisiųsti sertifikatą“ → įrašyti vardą su diakritika (pvz. „Jonas Žilinskas“) → parsisiųsti PDF – atsidaryti PDF ir patikrinti, kad vardas ir tekstas („Užbaigė 1 dalį“, „Promptų anatomija“) rodomi su lietuviškomis raidėmis (ž, ė, ų ir kt.). Žr. `public/fonts/README.md` – NotoSans turi būti įdiegtas.

---

## 5a. Paprasta kalba / žargono patikra (~1 min)

> **Įtraukta:** 2026-02-14. Vartotojui matomi pavadinimai ir aprašymai – be nepaaiškinto vadybinio/techninio žargono (ROI, HR, CFO, EBITDA, NPS, SWOT, influencer, Senior ir kt.) arba su vienu sakinio paaiškinimu. Žr. `docs/development/PAPRASTOS_KALBOS_GAIRES.md`.

- [ ] **Bent vienas modulis (rekomenduojama M9):** Atidaryti modulio skaidres (intro, hub, 2–3 scenarijų korteles) – ar antraštėse ir aprašymuose nėra žargono be paaiškinimo (pvz. „CFO (finansai)“ be konteksto, „HR analitika“, „Mokymų ROI“, „influenceriai“, „EBITDA“ be paprasto atitikmens)?
- [ ] Jei randama – pataisyti pagal PAPRASTOS_KALBOS_GAIRES.md arba įrašyti į TEST_REPORT / TODO kaip sekantį darbą.

---

## 5b. Schemų / diagramų vizualinė patikra (jei buvo SCHEME_AGENT darbas)

> **Įtraukta:** 2026-02-14. Schemų vizualinę kokybę pagal dizainą tikrina **CODE_REVIEW_AGENT**, ne QA_AGENT. QA čia tik primena vykdyti šį žingsnį.

- [ ] **Po bet kokio SCHEME_AGENT darbo:** Įsitikinti, kad **CODE_REVIEW_AGENT** atliko schemų vizualinę patikrą (`docs/development/SCHEME_AGENT.md` §5 – rodyklės kraštas į kraštą, proporcijos, path nekerta blokų). Jei ne – prašyti atlikti: „Atlik CODE_REVIEW pagal SCHEME_AGENT.md §5“.
- [ ] **Schemų geriausios praktikos (QA primena):** Jei keista flowchart/diagrama – priminti patikrinti pagal `docs/development/SCHEME_AGENT.md` §3.11 ir §5 (vizualinė patikra): ar tekstas telpa į blokus, ar schema centre, ar rodyklės kraštas į kraštą.
- [ ] **Diagram kit a11y:** Migruotos interaktyvios diagramos turi HTML `nav button` keyboard kelią ir neturi dubliuotų `svg [role="button"]` / `svg [tabindex="0"]` taikinių.
- [ ] **Design-token baseline:** Paleisti `npm run audit:design-tokens`; nauji hardcoded hex / arbitrary class atvejai turi būti sumažinti arba dokumentuoti kaip išimtis `DESIGN_TOKENS_BASELINE_2026-07.md` kontekste.

---

## 5d. M1 / M5 / M6 / M7–9 PDF ir pasirinktų skaidrių rankinė (prieš release, rekomenduojama)

> **Įtraukta:** 2026-03-11. P1 release užduotys – rankinė patikra, kurią atlieka žmogus.

- [ ] **M1 PDF:** Modulio 1 → ModuleCompleteScreen → „Parsisiųsti Modulio 1 atmintinę (PDF)“ → atsidaryti PDF: 6 blokai, checklist, starter promptas; **be** outbound nuorodų (value-only); lietuviškos raidės (NotoSans). EN locale – DI→AI terminologija. Žr. PDF_DOWNLOAD_TESTING.md §M1.
- [ ] **M5 PDF:** Modulio 5 → baigti testą → „Parsisiųsti Modulio 5 atmintinę (PDF)“ → atsidaryti PDF: lietuviškos raidės (ą, ė, į, š, ų, ū, ž) rodomos teisingai (NotoSans). Žr. PDF_DOWNLOAD_TESTING.md, §5.
- [ ] **M6 PDF:** Modulio 6 → atlikti praktiką → ModuleCompleteScreen → parsisiųsti PDF – lietuviškos raidės, turinys atitinka.
- [ ] **M7–9 DA kelio PDF:** Modulis 9 → skaidrė 92 arba ModuleCompleteScreen → „Parsisiųsti DA kelio atmintinę (PDF)“ → atsidaryti PDF: 2 puslapiai, lietuviškos raidės, spaudžiamos nuorodos į blog / Decide / Map su `utm_medium=handout`.
- [ ] **M7–9 PDF automatinis guard:** jei keistas M79 handout turinys arba utilas, paleisti `npm run test:run -- src/data/__tests__/m79HandoutContent.test.ts src/utils/__tests__/m79HandoutPdf.test.ts`.
- [ ] **M1 PDF automatinis guard:** jei keistas M1 handout turinys arba utilas, paleisti `npm run test:run -- src/data/__tests__/m1HandoutContent.test.ts src/utils/__tests__/m1HandoutPdf.test.ts`.
- [ ] **M4 skaidrė 56 (RAG: kas tai ir pabandyk):** navigacija, LlmArch tabai, kopijuojamas promptas, „Peržiūrėti pilname dydyje“ – veikia, turinys skaitomas.
- [ ] **M6 skaidrė 64 (Pagalbinis promptas: duomenų tvarkymo sistema):** Kopijuoti mygtukas, lietuviškos raidės, turinys atitinka.

---

## 5c. EN locale (jei palaikomas EN)

> **Įtraukta:** 2026-03-07. Kai vartotojas pasirenka EN (LT | EN perjungiklis), visi matomi ir skelbiami tekstai turi būti anglų kalba.

- [ ] **Perjungimas į EN:** AppNav → EN → visi UI stringai (nav, home, moduliai, žodynėlis, apklausa) – anglų kalba. Nėra maišytos LT/EN viename vaizde.
- [ ] **Raktų paritetas:** `src/locales/lt.json` ir `src/locales/en.json` – tie patys raktai (common, nav, home, module, quiz, glossary, modulesPage); nėra tuščių ar placeholder EN vertimų prieš release.
- [ ] **Terminologija EN:** Vartotojui matomi EN tekstai naudoja „AI“ (ne „DI“). Žr. glossary-en.json ir CONTENT_MODULIU_ATPAZINIMAS; detalės – jei turite lokaliai docs/archive/development/EN_LANGUAGE_STANDARD.md.
- [ ] **Moduliai 1–3 EN:** Jei `modules-en.json` naudojamas – skaidrių pavadinimai ir turinys anglų kalba; jei dar WIP – dokumentuota (pvz. EN_UI_UX_LANGUAGE_AUDIT.md).
- [ ] **Moduliai 4–6 EN:** Jei `modules-en-m4-m6.json` naudojamas – M4, M5, M6 skaidrės ir meta anglų kalba; loader merge’ina į `modules[3]`,`[4]`,`[5]`. Patikra: `npm run audit:m46` (coverage: skaidrių ID paritetas + LT diakritikų liekanos po merge; language: hybrid tokenai, LT žodžiai, DI→AI, LT „tu“ forma). Bendras M4–9 vartas: `npm run audit:m49`.
- [ ] **Moduliai 7–9 EN (lean + expansion):** `modules-en-m7-m9.json` — deep-merge overlay; merge kai `maxModuleId >= 7`. Patikra: `npm run audit:m79` (arba atskirai `npm run audit:en-coverage-m7-m9` lean/`--full` + `npm run audit:en-language-m7-m9`); validacija – `validateModulesEnM79()` per `npm run validate:schema`. Rankinė: M7 slide 70 journey EN, M8 test klausimai EN, M9 workflow 93–94 + hub 99. Po rankinių EN pataisymų overlay **ne** regeneruoti per `build:modules-en-m7-m9`.
- [ ] **Moduliai 10–12 EN:** `modules-en-m10-m12.json` — deep-merge overlay (failas partial struktūra, body pilnas); merge tik kai kataloge `maxModuleId >= 10`. Patikra: `npm run audit:en-coverage-m10-12`; validacija – `validateModulesEnM1012()` per `npm run validate:schema`.
- [ ] **Glossary EN (M4–6):** `glossary-en.json` turi terminus su `moduleId` 4, 5, 6 (ai, ne DI; žr. CONTENT_MODULIU_ATPAZINIMAS). Detalės – lokaliai docs/archive/development/EN_LANGUAGE_STANDARD.md.
- [ ] **Quiz EN:** Kai `locale === 'en'`, loaderis įkelia `quiz-en.json` – pavadinimas „Final Quiz“, 20 klausimų anglų kalba; jei failas nėra – rodomas LT quiz.
- [ ] **Automatiniai EN testai:** Prieš release paleisti `npm run test:run` – EN kelias padengtas: `src/data/__tests__/modulesLoader.test.ts` (loadModules('en') merge M1–M6), `src/utils/__tests__/questionPoolSelector.test.ts` (selectQuestions('en'/'lt')), `src/data/__tests__/glossaryLoader.test.ts` (getGlossary('en'/'lt')), `src/components/__tests__/App.quiz.integration.test.tsx` (describe „App – EN locale smoke“).

---

## 5e. SEO submodule (gated app, ~2 min)

> **Įtraukta:** 2026-05-25. Mokymų app neindeksuojamas; GEO – per eksportą marketingui. Žr. `docs/deployment/SEO_SUBMODULE.md`.

- [ ] **View Source** (incognito, be prieigos): `<meta name="robots" content="noindex, nofollow">` yra `index.html` arba po JS (Helmet).
- [ ] **OG URL:** `og:url` / `og:image` – teisingas origin (`promptanatomy.app` monorepo arba `ditreneris.github.io` GH Pages), ne pasenęs hardcoded kelias be env.
- [ ] **`npm run export:seo-snippets`:** Sukuria `public/seo-public-snippets.json` – tik `id`, `title`, `subtitle`, `description`, `duration`, `level`; nėra `slides` / `copyable`.
- [ ] **Marketingo root** (jei deploy per monorepo): root `robots.txt` disallow app subpath – patvirtinta integratoriaus.

---

## 5f. Ekosistemos outbound smoke (~2 min)

> **Įtraukta:** 2026-06-29. Spin-off touchpoints M1–M6 MVP. SOT: `docs/ECOSYSTEM_MAP.md`, `src/constants/ecosystemUrls.ts`. Agent spine: `AGENTS.md` §Ecosystem, `sot_index.json` → `ecosystem`.

- [ ] **Gate:** secondary link → `promptanatomy.cloud` (LT/EN jei taikoma).
- [ ] **Footer „Ekosistema“:** → `promptanatomy.site/#ecosystem`.
- [ ] **M1 complete:** Enter + Anatomizer (info).
- [ ] **M3 complete:** Use + Hire.
- [ ] **M4:** bent vienas section-break spinoff (space / blog / site#ecosystem).
- [ ] **M2 quiz `<70%`:** Deepen (blog); `≥70%`: nėra spinoff.
- [ ] **M5 test:** CEO spinoff rezultatuose (`TestResultsSlide`).
- [ ] **M6 complete:** Decide + Play + Map.
- [ ] **DevTools / PostHog:** `cta_id` prasideda `spinoff_`; `destination: spin-off`.

---

## 6. MVP release (jei deploy su VITE_MVP_MODE=1)

- [ ] **Core 1–6 build:** `VITE_MVP_MODE=1 npm run build` → atidaryti → Moduliai → matyti tik 6 produkcinės kortelės; `7–15` neatsiranda kataloge.
- [ ] **Glossary:** Žodynėlio filtre – Moduliai 1–6 (terminai su moduleId 7+ paslėpti).
- [ ] **HomePage CTA:** Baigus 6 modulius – „Į apklausą“ (ne „Tęsti mokymą“). Paspaudus – navigacija į Apklausą.

---

## 7. Turinio / UX kokybė (~3 min, rekomenduojama)

> **Šaltinis:** [docs/development/context-engineering/eval_rubric.md](context-engineering/eval_rubric.md) – dimensijos (CTA, tonas, lietuviškos, nuorodos, modulių/skaidrių nuoseklumas).

- [ ] **Vienas modulis per release pagal rubric:** Prieš release atlikti vieną rankinį perbėgimą pagal eval_rubric (bent vienas modulis + HomePage arba vienas CTA kelias). Rezultatą įrašyti į TEST_REPORT arba changelog (pvz. „Modulis X – visos dimensijos ≥2, 4/5 = 3“).
- [ ] **Pirmyn/Atgal CTA (desktop):** Modulio skaidrė – viršutinė juosta sticky (scroll’inant lieka matoma); „Pirmyn“ – vienintelis ryškus CTA (didesnis mygtukas, brand, shadow, hover lift); „Atgal“ – ghost (be fono); dešinėje prie „Pirmyn“ rodomas progresas „Skaidrė X / N“. Klaviatūra ← → veikia. Žr. CHANGELOG 2026-02-26 (ModuleView Pirmyn/Atgal).

---

## 8. Design tokens baseline regression (~1 min, automatinis)

> **Įtraukta:** 2026-05-19 (Design System v0.2, E2.3). **SOT:** [`docs/development/DESIGN_SYSTEM_V0_2.md §5`](DESIGN_SYSTEM_V0_2.md). **Baseline:** [`docs/development/analysis/DESIGN_TOKENS_BASELINE_2026-05.md`](analysis/DESIGN_TOKENS_BASELINE_2026-05.md). **Skriptas:** `node scripts/audit-design-tokens.mjs` (warn-only, exit 0).

- [ ] **Paleisti audit'ą:** `node scripts/audit-design-tokens.mjs` (arba `node scripts/audit-design-tokens.mjs --json` JSON formatu) – skenuoja `src/components/**` ir `src/utils/**`, suskaičiuoja hex literal'us, inline `style={{ ... }}` ir SVG `fill`/`stroke` atvejus.
- [ ] **Palyginti su baseline (2026-05-19):** TOTAL findings **≤ 480** (hex ≤ 351, inline ≤ 13, svg ≤ 116). **Tendencija turi būti ↓ arba lygi.** Jei skaičius **padidėjo** – patikrinti, ar naujas hex'as turi paaiškinimo komentarą (pvz. `// v0.2 — module identity` arba `// jspdf RGB`); kitaip rollback'as task'ui, kuris pridėjo naują hex'ą (žr. plano §10 E7.4).
- [ ] **Top-5 „dirtiest" failai – nepakitę:** Pirmieji 5 (`CustomGptProcessDiagram`, `LlmArchDiagramDiagram`, `M10SpecIncidentDiagram`, `LlmAutoregressiveDiagram`, `M13RuleOfThirdsDiagram`) – pagal v0.3 backlog'ą **B1**, jų konsolidavimas planuojamas vėliau; v0.2 metu jie **nesikeičia**.
- [ ] **Jei `audit:design-tokens` `package.json` script'as pridėtas (E2.1 baigta):** vietoj `node scripts/...` galima naudoti `npm run audit:design-tokens` (žr. plano §5 E2.1 exit-kriterijus).

**Pastaba.** Audit skriptas yra **warn-only** (`exit 0`) – jis NEturi blokuoti `npm run build` ar CI. Pre-commit gate – v0.3 backlog **B7**.

---

## Dokumentacijos nuorodos (prieš release, rekomenduojama)

- [ ] **Aktyvūs doc'ai nurodo į esamus failus:** `docs/DOCUMENTATION_INDEX.md` – SOT ir aktyvūs dokumentai be nuorodų į neegzistuojančius kelius. Nuorodos į archyvą – pvz. `docs/archive/...` arba `docs/archive/development/...`.
- [ ] **README ir docs/README:** Nuorodos į DOCUMENTATION_INDEX, turinio SOT, RELEASE_QA_CHECKLIST – teisingos.
- [x] **Footeriai M10 (2026-06-29):** `AUDIT_MODULES=10 node scripts/audit-footer-numbers.mjs` PASS; EN `--locale=en` merge PASS; ilgis `audit-footer-length.mjs` OK. Skaidrės 10.45 (→6), 10.48 (→7).
- [ ] **Footeriai (optional):** Jei naujai pridedamas „Toliau – skaidrė N“ / „Next – slide N“ footer – ilgis rekomenduojama ≤ 55 simb. Žr. GOLDEN_STANDARD §3.6, [analysis/FOOTER_NEXT_SLIDE_ANALIZE.md](analysis/FOOTER_NEXT_SLIDE_ANALIZE.md).

---

## Papildomai (jei laiko)

- `npm run build` – sėkmingas.
- `npm run lint` – be klaidų.
- **Core 1–6 build:** `VITE_MVP_MODE=1 npm run build` – sėkmingas.

---

---

## Statusas (2026-02-12)

| Kas                                  | Statusas                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **A-M4**                             | ✅ Įgyvendinta – 6 skyriai (links, mobile, dark, a11y, lietuvių raidės, MVP).                                                                                                                                                                                                                                                                                                                                                                                   |
| **§1–5, 5a patikra (2026-02-18)**    | §1: Skip link `#main-content` ir `<main id="main-content">` – App.tsx. §2–4: rankinė patikra (viewport, dark, a11y) – rekomenduojama prieš release. §5: grep modules.json – tipinių klaidų (perziureti, Ziniu, reiskia…) nerasta. §5a: SWOT, CFO, EBITDA, NPS, ROI, HR, Senior – naudojami modulių scenarijuose (M3, M9); PAPRASTOS_KALBOS_GAIRES – kontekste su „vadovybė“, „finansai“, „analizė“; jei reikia – papildomas žargonas vienu sakinio paaiškinimu. |
| **M4 lietuviškos (4.7, 67.5)**       | ✅ 2026-02-12 – skaidrės 70 (Modulio 4 santrauka) ir 67.5 (Saugumas) peržiūrėtos §5; klaidų nerasta.                                                                                                                                                                                                                                                                                                                                                            |
| **M4 action-intro (id 38)**          | ✅ 2026-02-12 – nauja pirmoji skaidrė (hero, CTA, outcomes, aboutText, promptai) peržiūrėta §5; lietuviškos raidės teisingos.                                                                                                                                                                                                                                                                                                                                   |
| **HomePage Hero CTA**                | ✅ Baigus modulius – „Į apklausą“; kai apklausa baigta – „Peržiūrėti modulius“.                                                                                                                                                                                                                                                                                                                                                                                 |
| **ModulesPage: CTA po completion**   | ✅ Mygtukas „Į apklausą“ pridėtas (2026-02-11).                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **HomePage P0 (quizCompleted)**      | ✅ Įgyvendinta – CTA „Peržiūrėti modulius“ kai viskas baigta.                                                                                                                                                                                                                                                                                                                                                                                                   |
| **HomePage P1 (progresas virš CTA)** | ✅ Progresas perkeltas virš CTA (2026-02-11).                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **Mobile UI Moduliai 2 ir 3**        | ✅ 2026-02-11 – touch targets, responsive padding, MatchingQuestion overflow; skyrius 2 papildytas rekomendacija Moduliams 2 ir 3. Žr. MOBILE_UI_AUDIT_MOD2_MOD3.md.                                                                                                                                                                                                                                                                                            |
| **Moduliai 13–15 planas**            | ✅ 2026-02-15 – getM13Phase fazės juosta, 13.11 workflow diagrama, M14 thresholdExplanation, content-block schema, analizės dokumentai. Prieš release: §5 lietuviškos raidės M13–15; §5b schemų patikra (TurinioWorkflowDiagram).                                                                                                                                                                                                                               |

---

## 6. Cache: kai pakeitimai duomenų failuose nesimato

Duomenys įkeliami per aliasus ir JSON importus, todėl gali būti cache'inti (Vite + naršyklė). Dev režime Vite naudoja pluginą `no-cache-modules-json`, kad naršyklė nekešintų bent `modules.json`; core `1–6` profilyje aktualūs ir `*-m1-m6.json` failai.

- [ ] **Dev režimas:** Sustabdyk `npm run dev` (Ctrl+C), vėl paleisk `npm run dev`. Atidaryk puslapį **naujame tabe** arba **hard refresh** (Ctrl+Shift+R arba Ctrl+F5). Jei vis dar sena versija – Chrome: DevTools → Application → Storage → „Clear site data“ (localhost:3000).
- [ ] **Production build:** Vykdyk `npm run build` ir atidaryk `dist/` arba peržiūrėk su `npm run preview` – tada refresh.

**Nuorodos:** TODO.md (A-M4), RELEASE_SESSION_PLAN_90_150min.md, RELEASE_PLAN_MVP_MODULIAI_1_3.md, MOBILE_UI_AUDIT_MOD2_MOD3.md, **bendri atsiliepimai** – docs/VARTOTOJU_ATSILIEPIMAI_BENDRAS.md.
