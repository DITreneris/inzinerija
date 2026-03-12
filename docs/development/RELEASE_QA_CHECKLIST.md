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

---

## 4. A11y smoke (~1 min)

- [ ] **Skip link:** Tab nuo puslapio pradžios → matomas „Praleisti į turinį“ (arba panašus) → Enter – fokusas pereina į main turinį.
- [ ] **Klaviatūra:** Skaidrių navigacija veikia rodyklių klavišais (← →).

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
- [ ] **Schemų geriausios praktikos (QA primena):** Jei keista flowchart/diagrama – priminti patikrinti pagal SCHEME_AGENT.md §3.11: ar tekstas telpa į blokus, ar schema centre (ne „pavažiavusi“), ar lygmenys nesuspausti, ar vertikalus tarpas protingas. Referencas: `docs/development/LLM_DIAGRAMOS_VIZUALUS_VERTINIMAS.md`.

---

## 5d. M5 / M6 PDF ir pasirinktų skaidrių rankinė (prieš release, rekomenduojama)

> **Įtraukta:** 2026-03-11. P1 release užduotys – rankinė patikra, kurią atlieka žmogus.

- [ ] **M5 PDF:** Modulio 5 → baigti testą → „Parsisiųsti Modulio 5 atmintinę (PDF)“ → atsidaryti PDF: lietuviškos raidės (ą, ė, į, š, ų, ū, ž) rodomos teisingai (NotoSans). Žr. PDF_DOWNLOAD_TESTING.md, §5.
- [ ] **M6 PDF:** Modulio 6 → atlikti praktiką → ModuleCompleteScreen → parsisiųsti PDF – lietuviškos raidės, turinys atitinka.
- [ ] **M4 skaidrė 56 (RAG: kas tai ir pabandyk):** navigacija, LlmArch tabai, kopijuojamas promptas, „Peržiūrėti pilname dydyje“ – veikia, turinys skaitomas.
- [ ] **M6 skaidrė 64 (Pagalbinis promptas: duomenų tvarkymo sistema):** Kopijuoti mygtukas, lietuviškos raidės, turinys atitinka.

---

## 5c. EN locale (jei palaikomas EN)

> **Įtraukta:** 2026-03-07. Kai vartotojas pasirenka EN (LT | EN perjungiklis), visi matomi ir skelbiami tekstai turi būti anglų kalba.

- [ ] **Perjungimas į EN:** AppNav → EN → visi UI stringai (nav, home, moduliai, žodynėlis, apklausa) – anglų kalba. Nėra maišytos LT/EN viename vaizde.
- [ ] **Raktų paritetas:** `src/locales/lt.json` ir `src/locales/en.json` – tie patys raktai (common, nav, home, module, quiz, glossary, modulesPage); nėra tuščių ar placeholder EN vertimų prieš release.
- [ ] **Terminologija EN:** Vartotojui matomi EN tekstai naudoja „AI“ (ne „DI“). Žr. glossary-en.json ir CONTENT_MODULIU_ATPAZINIMAS; detalės – jei turite lokaliai docs/archive/development/EN_LANGUAGE_STANDARD.md.
- [ ] **Moduliai 1–3 EN:** Jei `modules-en.json` naudojamas – skaidrių pavadinimai ir turinys anglų kalba; jei dar WIP – dokumentuota (pvz. EN_UI_UX_LANGUAGE_AUDIT.md).
- [ ] **Moduliai 4–6 EN:** Jei `modules-en-m4-m6.json` naudojamas – M4, M5, M6 skaidrės ir meta anglų kalba; loader merge’ina į `modules[3]`,`[4]`,`[5]`.
- [ ] **Glossary EN (M4–6):** `glossary-en.json` turi terminus su `moduleId` 4, 5, 6 (ai, ne DI; žr. CONTENT_MODULIU_ATPAZINIMAS). Detalės – lokaliai docs/archive/development/EN_LANGUAGE_STANDARD.md.
- [ ] **Quiz EN:** Kai `locale === 'en'`, loaderis įkelia `quiz-en.json` – pavadinimas „Final Quiz“, 20 klausimų anglų kalba; jei failas nėra – rodomas LT quiz.
- [ ] **Automatiniai EN testai:** Prieš release paleisti `npm run test:run` – EN kelias padengtas: `src/data/__tests__/modulesLoader.test.ts` (loadModules('en') merge M1–M6), `src/utils/__tests__/questionPoolSelector.test.ts` (selectQuestions('en'/'lt')), `src/data/__tests__/glossaryLoader.test.ts` (getGlossary('en'/'lt')), `src/components/__tests__/App.quiz.integration.test.tsx` (describe „App – EN locale smoke“).

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

## Dokumentacijos nuorodos (prieš release, rekomenduojama)

- [ ] **Aktyvūs doc'ai nurodo į esamus failus:** `docs/DOCUMENTATION_INDEX.md` – SOT ir aktyvūs dokumentai be nuorodų į neegzistuojančius kelius. Nuorodos į archyvą – pvz. `docs/archive/...` arba `docs/archive/development/...`.
- [ ] **README ir docs/README:** Nuorodos į DOCUMENTATION_INDEX, turinio SOT, RELEASE_QA_CHECKLIST – teisingos.
- [ ] **Footeriai (optional):** Jei naujai pridedamas „Toliau – skaidrė N“ / „Next – slide N“ footer – ilgis rekomenduojama ≤ 55 simb. Žr. GOLDEN_STANDARD §3.6, [analysis/FOOTER_NEXT_SLIDE_ANALIZE.md](analysis/FOOTER_NEXT_SLIDE_ANALIZE.md).

---

## Papildomai (jei laiko)

- `npm run build` – sėkmingas.
- `npm run lint` – be klaidų.
- **Core 1–6 build:** `VITE_MVP_MODE=1 npm run build` – sėkmingas.

---

---

## Statusas (2026-02-12)

| Kas | Statusas |
|-----|----------|
| **A-M4** | ✅ Įgyvendinta – 6 skyriai (links, mobile, dark, a11y, lietuvių raidės, MVP). |
| **§1–5, 5a patikra (2026-02-18)** | §1: Skip link `#main-content` ir `<main id="main-content">` – App.tsx. §2–4: rankinė patikra (viewport, dark, a11y) – rekomenduojama prieš release. §5: grep modules.json – tipinių klaidų (perziureti, Ziniu, reiskia…) nerasta. §5a: SWOT, CFO, EBITDA, NPS, ROI, HR, Senior – naudojami modulių scenarijuose (M3, M9); PAPRASTOS_KALBOS_GAIRES – kontekste su „vadovybė“, „finansai“, „analizė“; jei reikia – papildomas žargonas vienu sakinio paaiškinimu. |
| **M4 lietuviškos (4.7, 67.5)** | ✅ 2026-02-12 – skaidrės 70 (Modulio 4 santrauka) ir 67.5 (Saugumas) peržiūrėtos §5; klaidų nerasta. |
| **M4 action-intro (id 38)** | ✅ 2026-02-12 – nauja pirmoji skaidrė (hero, CTA, outcomes, aboutText, promptai) peržiūrėta §5; lietuviškos raidės teisingos. |
| **HomePage Hero CTA** | ✅ Baigus modulius – „Į apklausą“; kai apklausa baigta – „Peržiūrėti modulius“. |
| **ModulesPage: CTA po completion** | ✅ Mygtukas „Į apklausą“ pridėtas (2026-02-11). |
| **HomePage P0 (quizCompleted)** | ✅ Įgyvendinta – CTA „Peržiūrėti modulius“ kai viskas baigta. |
| **HomePage P1 (progresas virš CTA)** | ✅ Progresas perkeltas virš CTA (2026-02-11). |
| **Mobile UI Moduliai 2 ir 3** | ✅ 2026-02-11 – touch targets, responsive padding, MatchingQuestion overflow; skyrius 2 papildytas rekomendacija Moduliams 2 ir 3. Žr. MOBILE_UI_AUDIT_MOD2_MOD3.md. |
| **Moduliai 13–15 planas** | ✅ 2026-02-15 – getM13Phase fazės juosta, 13.11 workflow diagrama, M14 thresholdExplanation, content-block schema, analizės dokumentai. Prieš release: §5 lietuviškos raidės M13–15; §5b schemų patikra (TurinioWorkflowDiagram). |

---

## 6. Cache: kai pakeitimai duomenų failuose nesimato

Duomenys įkeliami per aliasus ir JSON importus, todėl gali būti cache'inti (Vite + naršyklė). Dev režime Vite naudoja pluginą `no-cache-modules-json`, kad naršyklė nekešintų bent `modules.json`; core `1–6` profilyje aktualūs ir `*-m1-m6.json` failai.

- [ ] **Dev režimas:** Sustabdyk `npm run dev` (Ctrl+C), vėl paleisk `npm run dev`. Atidaryk puslapį **naujame tabe** arba **hard refresh** (Ctrl+Shift+R arba Ctrl+F5). Jei vis dar sena versija – Chrome: DevTools → Application → Storage → „Clear site data“ (localhost:3000).
- [ ] **Production build:** Vykdyk `npm run build` ir atidaryk `dist/` arba peržiūrėk su `npm run preview` – tada refresh.

**Nuorodos:** TODO.md (A-M4), RELEASE_SESSION_PLAN_90_150min.md, RELEASE_PLAN_MVP_MODULIAI_1_3.md, MOBILE_UI_AUDIT_MOD2_MOD3.md, **bendri atsiliepimai** – docs/VARTOTOJU_ATSILIEPIMAI_BENDRAS.md.
