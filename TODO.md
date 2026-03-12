# TODO – Promptų anatomija

**Tikslas:** Vienas working failas – prioritetai, pipeline, nuorodos. SOT: `docs/DOCUMENTATION_INDEX.md`. Agentai: `docs/development/AGENT_ORCHESTRATOR.md`.  
**Legenda:** P1 = aukštas (release/kokybė), P2 = vidutinis, P3 = žemas. **Atnaujinta:** 2026-03-11 (Faze 2–3 „Vartotojui paruošta“ + Architektūra A docs/rules sync).

---

## 1. Aktualus pipeline (kas toliau)

### Top priority – projekto lygio sprendimas

*(Šiuo metu atvira top-priority užduočių nėra.)*

**P1:** visi atlikti 2026-02-18 (žr. CHANGELOG).

### Artimiausi darbai (prioriteta tvarka)

**P1 – release / kokybė (prieš release būtina)**  
*Po plano „Vartotojui paruošta“ Faze 0.1 ir 0.2 (rankinė M5/M6 PDF, M4 sk.56, M6 sk.64) – pažymėti #1, #2, #4, #5 atlikta.*

| # | Užduotis | Agentas / pastaba |
|---|----------|-------------------|
| 1 | **M5 PDF – rankinė patikra** – M5 baigti testą → „Parsisiųsti Modulio 5 atmintinę (PDF)“ → atsidaryti PDF: ą, ė, į, š, ų, ū, ž teisingai. NotoSans production. Žr. RELEASE_QA_CHECKLIST §5d, PDF_DOWNLOAD_TESTING.md. | QA_AGENT / ranka |
| 2 | **M6 PDF – rankinė patikra** – skaidrė 64 + ModuleCompleteScreen → PDF, lietuviškos raidės. RELEASE_QA_CHECKLIST §5d. | QA_AGENT / ranka |
| ~~3~~ | ~~**M4 footer 65.8 / 66.9**~~ – prieš release: M4 skaidrių eilė, footer numeriai (34, 35). | ✅ 2026-03-11 – pridėti footeriai 66→35, 66.25→36; 65.8 jau 34. |
| 4 | **Rankinė peržiūra M4 skaidrės 56** – „RAG: kas tai ir pabandyk“: navigacija, LlmArch tabai, copyable promptas, „Peržiūrėti pilname dydyje“. Žr. RELEASE_QA_CHECKLIST §5d. | QA_AGENT / ranka |
| 5 | **Rankinė peržiūra M6 skaidrės 64** – „Pagalbinis promptas: duomenų tvarkymo sistema“, Kopijuoti, lietuviškos raidės. Žr. RELEASE_QA_CHECKLIST §5d. | QA_AGENT / ranka |

**P2 – turinys ir dokumentacija**  
| # | Užduotis | Agentas / pastaba |
|---|----------|-------------------|
| ~~6~~ | ~~MODULIO_4_SKAIDRIU_EILES.md~~ – atnaujinta: viena skaidrė id 56 (4.1c+4.2 suliesta), pašalinta 4.2 eilutė. | ✅ 2026-03-11 |
| ~~7~~ | ~~M5 skaidrė 47 KISS-MARRY-KILL~~ – collapsible Master + Pilnas turinys; viršuje 1 copyable (8 skaidrių). | ✅ 2026-03-11 |
| ~~8~~ | ~~M5 paprasta kalba~~ – brief, draft, sprint, use case paaiškinta/pakeista. | ✅ 2026-03-11 |
| ~~9~~ | ~~65.8 ir 66.9 – paprasta kalba~~ – subtitle, recap, nextSteps pataisyta. | ✅ 2026-03-11 |
| ~~10~~ | ~~modules.json – Jūs → Tu~~ – Prisiminkite, pabandykite, palyginkite pataisyta. | ✅ 2026-03-11 |
| ~~11~~ | ~~M4 section-break rankinė peržiūra~~ – dokumentuota TEST_REPORT. | ✅ 2026-03-11 |
| ~~12~~ | ~~Rankinė peržiūra M5~~ – dokumentuota TEST_REPORT. | ✅ 2026-03-11 |
| ~~13~~ | ~~Path-step žodynėlio patikra~~ – 10 terminų (71.1–71.5) patvirtinta, dokumentuota. | ✅ 2026-03-11 |

**P2 – UX audito įgyvendinimas**  
| # | Užduotis | Agentas / pastaba |
|---|----------|-------------------|
| UX-1 | **UX audito planas** – Faze 1 įgyvendinta (UX_AUDIT_IMPLEMENTATION_PLAN Faze 1 [x]). Toliau: mobile „Dabar“ blokas – žr. `docs/AUDITO_ATASKAITA_MODULIAI_1_6_MOBILE_UX.md` §5; bendras planas „Vartotojui paruošta įrankis“ – `.cursor/plans/vartotojui_paruošta_įrankis_cfe90c31.plan.md` (Faze 1–2 padaryta, Faze 3 – Mobile QA checklist TEST_REPORT). | CODING + DATA |

**P2 – optional / backlog**  
| # | Užduotis | Agentas / pastaba |
|---|----------|-------------------|
| 14 | **RAG optional (žr. §3)** – id 61, 63/63.7, Duomenų analizės kelio nuorodos – atskiruose žingsniuose arba backlog. | CONTENT + DATA |
| 15 | **PDF doc** – PDF_GENERATION_AGENT_MEMORY.md, DOCUMENTATION_INDEX, .cursor/rules/pdf-generation.mdc – jei trūksta. Ranks – M5/M6 (#1, #2). | QA_AGENT |

### P2 – darbai eilėje
| # | Užduotis | Agentai |
|---|----------|---------|
| 1 | **M5 skaidrė 47 – artefakto atsisiuntimas** – funkcija fiksuota tekste, įgyvendinti | CODING + DATA |
| 2 | **Testų infrastruktūra T2** – po Vitest `process.on` fix peržiūrėti/atnaujinti testus (App, QuizPage, progress, useAutoSave) | CODING + QA |
| 3 | **S-R4 (optional)** – `src/types/modules.ts` padalinti (modules-core, modules-slide-content, re-export) | CODING |
| 4 | **Mobile P2** – TestPracticeSlides, RadarChart, PracticeScenarioHubSlide, CharacterCard: 375px touch spot check (mygtukai/kategorijos ≥44px). Susieta su planu „Vartotojui paruošta“ Faze 1–2 (sticky kontekstas, spacer safe-area, body text-base, max 2 badge; „Pereiti prie veiksmo“, sticky lentelių stulpelis, slide dots mask, Tęsti label). Žr. `docs/AUDITO_ATASKAITA_MODULIAI_1_6_MOBILE_UX.md` §5, `docs/archive/development/MOBILE_UI_UX_AUDIT.md` §6 P2. | UI_UX / CODING |
| L1 | **Lentelių auditas** – visos lentelės (9 skaidrės/sekcijos) pagal LENTELIU_STANDARTAS.md §4 | UI_UX_AGENT |
| L2 | **comparisonStyle / body** – 2 stulpelių palyginimo lentelėms pridėti `comparisonStyle: true` + trumpą `body` (LENTELIU_STANDARTAS §5) | DATA_AGENT |
| L3 | **Min-width ir header** – palyginimo lentelės: min-width, skirtingi header fonai; Tailwind safelist jei reikia | CODING_AGENT |
| L4 | **Lentelių spot-check** – po L1–L3: nesuspausta, header skiriasi, body rodomas (CODE_REVIEW pagal LENTELIU_STANDARTAS §4) | CODE_REVIEW_AGENT |

### P3 – žemesnis prioritetas
| # | Užduotis | Agentai |
|---|----------|---------|
| 1 | **Savitikros M4** (4.2-check, 4.3-check, 4.4-check) – diagnostika ir nuorodos „Jei klaidingai – žr. skaidrę X“ ne visur | CONTENT + DATA |
| 2 | **CoVe, chunk, bridžinė, „Pataisyk promptą“** – likusio turinio sinchronas su SOT/modules.json | CONTENT + DATA |
| 3 | **Schemų vizualinė patikra** (SCHEME_AGENT §5) – custom_gpt_process, RAG, žinių patikrinimas; tik patikra | CODE_REVIEW / SCHEME_AGENT |
| 4 | **Savitikra 68.5** – 1–2 klausimai apie DI detektorius (po skaidrės 201) | CONTENT + DATA |
| 5 | **Mobile P3** – pilnas mobile audit (1–2 skaidrės/modulį); LlmArchDiagram 375px. MOBILE_UI_UX_AUDIT §6 P3. | UI_UX / CODE_REVIEW |
| 6 | **ProcessStepper duomenys** – optional: perkelti CUSTOM_GPT_STEPS / CUSTOM_GPT_STEPS_EN į bendrą duomenų failą arba i18n, kad vengti dubliavimo struktūroje. | DATA_AGENT / CODING |

### Post-release (MVP Analytics – next)
| # | Užduotis | Agentai |
|---|----------|---------|
| 1 | **PostHog (arba GA4):** snippet index.html, `VITE_POSTHOG_KEY`/`VITE_POSTHOG_HOST`, funnel + 1 dashboard pagal ANALYTICS_DASHBOARD_MVP.md | CODING / QA |
| 2 | **Micro-win M1:** M1 skaidrės 1–2 – trumpas copy/paste arba vienas klausimas (SOT / modules.json) | CONTENT + DATA |
| 3 | **Po 2–4 sav. duomenų:** baseline (M1/M3 completion, drop-off), koreguoti target ranges (ANALYTICS_DASHBOARD_MVP §2) | QA / Product |

---

## 2. Padaryta (santrauka)

- **MVP:** Error Boundary, loading/lazy, TypeScript, progress validacija, ~46 testai, CI, CopyButton, SlideContent refaktoras, Tailwind safelist, Design System (GOLDEN_STANDARD), Emoji→Lucide, HomePage/ModulesPage CTA ir progresas.
- **Moduliai 4–6:** SOT sinchronas, M5 klausimai/įvadas/rezultatai, M6 projekto tikslai/refleksija, section-break, content-block image, warm-up-quiz, SEO, a11y, užrakinimas. User Journey M4/M5/M6. DI detektorių skaidrė (201). MUST/SHOULD M4 (RAG, CoVe, chunk, optional, shortTitle, saugumo 67.5).
- **M4 skaidrės:** 4 dedamosios, RL/RLHF (4.1a3), 5 principai (4.1a4), parametrai/stiliai/praktika (50–52), promptų poros (54), proceso prompt (55), Custom GPT ProcessStepper, M5 skaidrė 47 (8 skaidrių prezentacija). Low-hanging fruits (2026-02-15).
- **Refaktoringas:** M-R1 AllSlides padalintas; S-R1 AppNav/useTheme, S-R2 useSlideNavigation/ModuleCompleteScreen, S-R3 useQuizState/QuizResultsView. A-M1 schema + validate-schema.mjs, A-M2 learningEvents, A-M3 remediation, A-M4 RELEASE_QA_CHECKLIST. A-S1–A-S4 (6 blokai, axe-core, Design system, Fast track).
- **Modulio 2 testas v2.5:** 5 tipai (MCQ, T/F, Matching, Ordering, Scenario), 15 kl., Bloom, hints, gamifikacija, žinių žemėlapis, remediation. F2 (pool, radar, deep links, score), F3-1 (Confidence).
- **P1–P3 sesija (2026-02-18):** M3 apšilimas (30.5), M3 „Situacija“ (6 scenarijai), M3 CTA į promptų biblioteką, M1 collapsible „Kodėl tai veikia“ (9,10,11), M3 pasirenkamos praktikos, M1 DI mąstymo logikos collapsible (8). Terminologija: įkaitinimas→apšilimas.
- **Context Engineering:** context_budget, memory_schema, eval_rubric↔RELEASE_QA, sot_index.json (validate-sot-index.mjs), CE-1–CE-6.
- **Gili analizė (2026-02-16):** badgeVariant, recommended, unlocksAfter; footer spot-check M1/M4.
- **MVP Analytics (2026-02-21):** anon_id, session_id, track(), 6 eventai, progreso juosta, practice feedback, nudge beforeunload, ANALYTICS_EVENT_TAXONOMY.md, ANALYTICS_DASHBOARD_MVP.md.
- **RAG 6 skaidrės suliejimas (2026-02-21):** 56+58 → viena skaidrė „RAG: kas tai ir pabandyk“ (SOT, modules.json, footeriai M4 21→22…48), 58 pašalinta; TODO.md RAG optional skyrius + nuorodos į Duomenų analizės kelį (turinio_pletra_moduliai_7_8_9.md, DUOMENU_ANALIZES_GERIAUSIOS_PRAKTIKOS.md). Liko rytoj: rankinė peržiūra skaidrės 56, MODULIO_4_SKAIDRIU_EILES.md atnaujinimas, RAG optional užduotys (§3).
- **ProcessStepper EN (2026-03-07):** Pilnas EN turinys Custom GPT žingsniams – `CUSTOM_GPT_STEPS_EN` (title, description, actionChecklist, tip, externalLink); `steps` pagal locale; žingsnio 4 šablonų nuoroda ir žingsnio 8 santrauka per `stepper.templateHint`, `summaryHeading`, `summaryBullet1–4`. Kortelė ir aria-labels EN, kai `locale === 'en'`.
- **Modulio 1 EN P2 (2026-03):** Skaidrės 13–21 – ReasoningModelsSlide, ReasoningBlockSlide, QualityBlockSlide, AdvancedParameters2Slide, FullExampleSlide pilnai i18n (lt.json/en.json contentSlides.blockReasoningModels*, blockReasoning*, blockQuality*, blockAdvanced2*, blockFullExample*). VeiksmoIntroBlock turinys – iš modules-en.json, ne iš locale. Žr. docs/development/analysis/MODULIO_1_EN_UI_DIAGNOZE.md §3.1, §5.
- **Audito planas Faze 1.1 (2026-03-11):** Quiz rezultatų ekranas – scroll į pirmą klaidingą atsakymą (RAF + setTimeout 150 ms), aria-live ir id pirmam klaidingam blokui; TEST_REPORT – išspręsta (scroll / M2 M5). Žr. .cursor/plans/audito_įgyvendinimo_planas_agentams_36a36f45.plan.md.
- **Audito planas Faze 2 (2026-03-11):** „Kur pritaikyti?“ (MUST M5) – ModuleCompleteScreen po Modulio 1: blokas su antrašte ir 4 use-case (projektų vadovas, marketingas, HR, analitikas). SOT: turinio_pletra.md; i18n lt/en; VARTOTOJU_ATSILIEPIMAI §8 M5 – pažymėta įgyvendinta.
- **Integracija kaip subproject (2026-03-10):** INTEGRATION_OVERVIEW.md (subproject modelis, API kontraktas verify-access), DOCUMENTATION_QUICK_REF skyrius „Išoriniams integratoriams“, DEPLOYMENT skyrius „Integracija kaip subproject“, README nuoroda; VITE_BASE_PATH (vite.config), VITE_VERIFY_ACCESS_URL (App.tsx). Toliau – marketingo repo: įtraukti šį repo kaip apps/prompt-anatomy, build:training, Vercel rewrites, verify-access endpoint.
- **Vartotojui paruošta – Faze 2 ir Faze 3 (2026-03-11):** Faze 2: „Pereiti prie veiksmo“ (mobile, scroll į CTA), lentelės sticky pirmas stulpelis, bottom nav „Tęsti“ per ilgas → fallback „Tęsti“, slide dots Safari. Faze 3: Mobile QA checklist TEST_REPORT (1 skaidrė/modulis, 375px), UX_AUDIT_IMPLEMENTATION_PLAN Mobile skyrius, TODO sinchronas (UX-1, Mobile P2, P1). Žr. CHANGELOG, .cursor/plans/vartotojui_paruošta_įrankis_cfe90c31.plan.md.
- **Architektūra A (2026-03-11):** Dokumentacija ir agentų taisyklės suvienodintos pagal dabartinę techninę realybę. `modules.json`, `glossary.json`, `tools.json` lieka full redagavimo SOT; `*-m1-m6.json` failai aprašyti kaip core `1–6` build/runtime profilis per `VITE_MVP_MODE=1`. Atnaujinti: architektūros planas, README, indeksai, deployment docs, AGENT_ORCHESTRATOR, DATA_AGENT docs, `sot_index.json`. **Sprendimas B** (atskiri 1–6 / 7–15 redagavimo failai, agreguotas `modules.json`) paliktas kaip atskiras būsimas refaktoringo projektas.
- **Pirmyn/Atgal (TODO #0) – įgyvendinta:** ModuleView – viena viršutinė **sticky** navigacijos juosta (`sticky top-16 z-20`), primary CTA „Tęsti“ (didesnis, brand, hover lift), „Atgal“ – ghost; grid vieno stulpelio, dešinėje atskiros nav kolonos nėra. Žr. CHANGELOG 2026-02-26, 2026-02-28 (Pirmyn→Tęsti).
- **EN UI, PDF ir schemų skaidrės (2026-03-11):** Dokumento title/meta pagal locale (seo namespace); CertificateScreen analytics cta_label per t(); EnlargeableDiagram – viewFullSize, diagramFullSizeAria, close i18n; schemų blokai (AgentOrchestrator, AgentWorkflow, TurinioWorkflow, ContextFlow) enlargeLabel iš diagrams; ContextFlowDiagram LT/EN per contextFlowDiagramLabels.ts; M5/M6 PDF default filename EN; ContentSlides .txt šablonas – pavadinimas ir mygtukas pagal locale; Intro Action Pie – introPiePdfContent-en.json, loaderis, i18n mygtukai, introPiePdf locale (pavadinimas, footer, filename); ActionIntroSlide – visi aria/vietiniai tekstai per t(), CTA fallback (actionIntroCtaReveal/Default); Intro Pie PDF – getGlossary(locale), EN segmentų glossaryTermNames iš glossary-en.json. Žr. CHANGELOG 2026-03-11.

---

## 3. Optional / Backlog

### RAG skyrius (M4) – optional turinys ir Duomenų analizės kelias

- [ ] **RAG optional (id 61):** DI įrankiai informacijos paieškai (Perplexity, PaperGuide, Scite, Elicit) – perkelti į Duomenų analizės kelio kontekstą (M7–M9) arba atskirą skaidrę „Papildomas skaitymas“; nuoroda iš RAG skyriaus.
- [ ] **RAG 63/63.7:** Strategijos (4 strategijos, kurios pakelia DI atsakymų kokybę), COMBO – ryšys su RAG išlaikomas; skaidrių skaičiaus nedidinti; nuoroda iš paskutinės RAG skaidrės arba Deep research įvado.
- [ ] **Duomenų analizės kelias (M7–M9):** Dokumentuose `docs/turinio_pletra_moduliai_7_8_9.md` ir `docs/development/DUOMENU_ANALIZES_GERIAUSIOS_PRAKTIKOS.md` nurodyti, kad papildomas RAG/tyrimų įrankių turinys (pvz. id 61) gali būti integruotas į kelio aprašymą arba „Papildomas skaitymas“.
- [x] **Duomenų analizės kelias: path-step tipas, badge, žodynėlis:** Įgyvendinta – tipas `path-step`, PathStepSlide, progresas, GlossaryPage locked/unlocked; SOT §8.2, GOLDEN_STANDARD §3.4d; glossary.json `unlockedBy` 3 terminams (Deep research, Master promptas 71.2; RAG 71.3); MODULE_LABELS[7]. Optional vėliau: pridėti žodynėlio terminus (EDA, Duomenų analizės pipeline, Sintetinimas, Vizualizacija ir kt.) su unlockedBy 71.1, 71.4, 71.5. Planas: `.cursor/plans/duomenų_analizės_kelias_ir_badge_70d5e403.plan.md`.

- **A1** Moduliai 7+ Jūs vs tu (atskira eiga: GOLDEN_STANDARD §4.2 + grep).
- **A2** Footer „Toliau – skaidrė X“ – **atidėta iki release QA** (ne iteracijų metu). Prieš release atlikti globalią patikrą visiems moduliams pagal `.cursor/rules/footer-slide-numbers.mdc`.
- **A3** blockVariant – likusios sekcijos (accent/brand/terms).
- **Orch** Agentų orkestratoriaus schema į kursą: SVG→React (AgentOrchestratorDiagram), AgentOrchestratorBlock, skaidrei M10 (po 10.2) arba M12 (po 120) arba M6. SOT: AGENT_ORCHESTRATOR.md, SCHEME_AGENT.md.
- **Arch-B** Jei kada nors bus reikalingas modelis B – atskiri `modules-m1-m6.json` + `modules-m7-m15.json` kaip authoring failai ir agreguotas `modules.json` – tai daryti tik kaip atskirą architektūrinį projektą (scripts, validacija, loaderiai, testai, docs), ne šioje iteracijoje.
- **N-DS3** Dizaino gidas → Gamma/Figma. **CE-7, CE-8** gating iš sot_index; eval_rubric heuristikas CI.
- **9a** Favicon. **10** Block skaidrės content-driven. **11** „Kaip naudoti modulį“ M4/M6. **12** Žodynėlis M4 (8–10 terminų). **13** Alternatyvūs kontekstai M6. **14** Monitoring, PWA, Eksportas, Sertifikatas, Multi-language. **15** M2 F3-2–F3-5. **UJ-4, UJ-5** 5 principai: checkbox, collapse.

- [ ] **Reflection prompts M7–M15:** Atnaujinti visų modulių (7, 8, 9, 10, 11, 12, 13, 14, 15) `reflectionPrompt` laukus į META + INPUT + OUTPUT formatą (`modules.json`, `modules-en.json`). M1–M6 jau atnaujinti (id 14, 37, 38).

**Peržiūrai (netraukti):** M7 lean branduolys (~18–20 skaidrių); vizualinis triukšmas (GOLDEN_STANDARD – 2–3 spalvos).

---

## 4. Nuorodos

| Kas | Kur |
|-----|-----|
| Klaidos | `docs/development/TEST_REPORT.md` |
| Release QA | `docs/development/RELEASE_QA_CHECKLIST.md` |
| PDF testavimas (introPie, M5, M6) | `docs/development/PDF_DOWNLOAD_TESTING.md` |
| PDF santrauka ir agentų atmintis | `docs/development/PDF_GENERATION_AGENT_MEMORY.md`, `docs/development/PDF_MAKETO_GAIRES.md` |
| Golden Standard | `docs/development/GOLDEN_STANDARD.md` |
| Turinio SOT M1–3 / M4–6 | `turinio_pletra.md`, `docs/turinio_pletra_moduliai_4_5_6.md` |
| M4 skaidrių eilė, tobulinimai | `docs/MODULIO_4_SKAIDRIU_EILES.md`, `docs/MODULIO_4_TOBULINIMAI_GERIAUSIOS_PRAKTIKOS.md` |
| UX todo M4–6 | `docs/development/ux_todo.md` |
| UX auditas ir įgyvendinimo planas | `docs/UX_AUDIT_MICRO_IMPROVEMENTS.md`, `docs/development/analysis/UX_AUDIT_IMPLEMENTATION_PLAN.md` |
| Mobile P2/P3 | `docs/archive/development/MOBILE_UI_UX_AUDIT.md` |
| Lentelių standartas | `docs/development/LENTELIU_STANDARTAS.md` |
| MUST/SHOULD, agentai | `docs/development/PLAN_AGENTAI_DARBAI.md` |
| SCHEME_AGENT, skaidrių tipai | `docs/development/SCHEME_AGENT.md`, `docs/SKAIDRIU_TIPU_ANALIZE.md` |
| MVP Analytics | `docs/development/ANALYTICS_EVENT_TAXONOMY.md`, `docs/development/ANALYTICS_DASHBOARD_MVP.md` |
| Integracija (subproject, Vercel, marketingo repo) | `docs/deployment/INTEGRATION_OVERVIEW.md`, `docs/deployment/DEPLOYMENT.md` § Integracija kaip subproject |

*Naujos klaidos → TEST_REPORT.md; QA_AGENT atnaujina prioritetus čia.*
