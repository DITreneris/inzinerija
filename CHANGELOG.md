# Changelog

Visi reikšmingi pakeitimai šiame projekte dokumentuojami šiame faile.

**Formatas:** [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) (angl.). **Versijų politika:** [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html).

### Kaip naršyti šį failą

Failas didelis (keli tūkstančiai eilučių). **Naujausia istorija** prasideda skiltyje **[Unreleased]**; toliau eina **pažymėti leidimai** nuo naujausių (**[1.4.3]**, **[1.4.2]**, **[1.4.1]**, **[1.4.0]**, **[1.3.0]**). **Failo pabaigoje** paliktas ankstesnis **2.x** ir **1.0.0** žymėjimas – tai istorinis sluoksnis iš ankstesnės kūrimo fazės (prieš dabartinę **1.x** produkcijos liniją; žr. poskyrį _Ankstesnis versijų žymėjimas (2.x ir 1.0.0)_).

**Greita paieška:** redaktoriuje ieškokite `## [` – atsiras visos versijų antraštės.

### Versijų antraštės (turinio medis)

| Skiltis                     | Ką rasite                                                                |
| --------------------------- | ------------------------------------------------------------------------ |
| **[Unreleased]**            | Pakeitimai po **[1.4.5]** release.                                       |
| **[1.4.5] – 2026-07-15**    | M7–M9 P2 polish, M4 portal 2.1, preflight gates green, tag release.      |
| **[1.4.4] – 2026-07-09**    | P2 PDF/sertifikatai, DS W7–W10, cross-repo pre-launch docs ir vartai.    |
| **[1.4.3] – 2026-07-07**    | UX Banga 1, M13–15 EN overlay, M7–M12 consistency, audit gates.          |
| **[1.4.2] – 2026-07-01**    | DiagramKit M1–9, design tokens, M7–9 EN sweep, startup stabilumas.       |
| **[1.4.1] – 2026-06-30**    | M1–9 audit gates, LT/EN fixes, diagram i18n, M7–9 data sync (patch).     |
| **[1.4.0] – 2026-06-30**    | Tier 9, production M1–9, M10–12 authoring, ecosystem M7–12, CONV funnel. |
| **[1.3.0] – 2026-03-16**    | Production release: deploy, mokėjimai, pirmas pirkimas.                  |
| **[1.2.0] – 2026-02-11**    | Ankstesnis pažymėtas leidinys (V1.2).                                    |
| **Ankstesnis 2.x ir 1.0.0** | Archyvas failo pabaigoje.                                                |

---

## Kas įgyvendinta (santrauka)

**Gilaus analizės dokumentas:** [docs/development/CODEBASE_WHAT_IS_DONE.md](docs/development/CODEBASE_WHAT_IS_DONE.md)

- **Moduliai 1–6:** Pilnai (teorija, testas, praktika, pažangus). Duomenys + EN merge.
- **Moduliai 7–9:** Korporatyvinis kelias (Duomenų analizės kelias); production bundle per `npm run build:production` (`VITE_MAX_BUILD_MODULE=9`); **EN overlay** `modules-en-m7-m9.json` (branduolys + šakos + M8 testas + M9 scenarijai).
- **Moduliai 10–12:** Agentų kelias full authoring kataloge (ne production bundle); EN overlay `modules-en-m10-m12.json`; P2 artefaktai – `m1012` atmintinė ir tier 4 sertifikatas.
- **Moduliai 13–15:** Turinio inžinerijos kelias full authoring kataloge; EN overlay `modules-en-m13-m15.json`; P2 artefaktai – `m1315` atmintinė ir tier 5 sertifikatas.
- **LT/EN (i18n):** Pilnas UI; turinys M1–M15 per loader merge; 16 namespace; schemos/diagramos lokalizuoti.
- **Sertifikatai, PDF atmintinės (M1/M4/M5/M6/M7–9/M10–12/M13–15), žodynėlis, apklausa, įrankiai, progresas:** Įgyvendinta. **Access tier** 3 / 6 / 9; sertifikatai tier 1–5, įskaitant tier 4 po M10–12 + M11 ≥ 70 % ir tier 5 po M13–15 + M14 ≥ 70 %.
- **Ekosistema M7–12:** `ECOSYSTEM_MAP.md`, blog deepen, spinoff analytics.
- **Testai:** 74 failai, 512 testai (2026-07-16 HEAD). Validacija: prebuild schema; release gate `npm run audit:release-preflight` (M1–9 EN/LT + M7 pathBranch + testai), M10–12 vartai `npm run audit:m1012`, M13–15 `audit:m1315`.
- **Produkcija:** [www.promptanatomy.app](https://www.promptanatomy.app) – Vercel submodulis ([DITreneris/promptanatomy](https://github.com/DITreneris/promptanatomy)); release **1.4.5** (2026-07-15). Stripe M1–6 + Supabase→magic link M7–9; marketing env: [`05_marketingo_memo_tier9_vienas_build.md`](05_marketingo_memo_tier9_vienas_build.md); vykdymas: [`MON_P0_EXECUTION_PLAN.md`](docs/deployment/MON_P0_EXECUTION_PLAN.md), [`MARKETING_SUBMODULE_PIN_1.4.4.md`](docs/deployment/MARKETING_SUBMODULE_PIN_1.4.4.md).

---

## [Unreleased]

_Įrašai po 1.4.5 release._

### Added

- **M10–12 P2 warm-up + honesty UX (2026-07-17):** M11 pre-test **110.5** (agentas vs promptas, 3A, router ≠ orkestratorius); M10 formuojanti savitikra **10.61** po 10.6, prieš 10.15; `PracticalTask` empty-mark – inline amber banner (Įrašyti santrauką / Vis tiek pažymėti), ne `window.confirm`; i18n `practicalMarkEnterSummary` / `practicalMarkAnyway`; testas `PracticalTask.emptyMark.test.tsx`. SOT §4.4a / §7.1a + `MODULIO_10_SKAIDRIU_EILES.md`.
- **M10 sk. 10.482 Agentų orkestravimo simuliacija (2026-07-16):** Guided DiagramKit walkthrough (`m10_agent_orchestrator`) – 6 makro žingsniai, Router≠orkestratorius, tikrinimas≠vertinimas, tikslinis retry. Failai: `m10OrchestratorContent.ts`, `m10OrchestratorLayout.ts`, `M10OrchestratorDiagram/Block`. SOT: `turinio_pletra_moduliai_10_11_12.md` §3b3b. Ne legacy `AgentOrchestratorBlock`; skirtumas nuo 120.5 (verslo schema).
- **M10 sk. 10.49 Learning Loop P1 (2026-07-16):** `m10_learning_loop` – paaiškinime pavyzdys + dažna klaida (LT/EN); rodyklės paryškinamos pagal makro žingsnį (`M10_LEARNING_LOOP_STEP_EDGE_IDS`).
- **M10–12 schemų polish I1–I3 (2026-07-16):** Priartinimas prie M7–M9 etalono – marker inset + `DIAGRAM_TOKENS`; layout SOT (`m12MultiAgentSchemaLayout`, Trigger/Spec/Incident/ThreeLabs); ToolTree → shell + HitArea; `m10m12LayoutGeometry.test.ts`; registry Pilnas process diagramoms.
- **M8/M9 artumas kasdieniam darbui (M79-51…55, 2026-07-16):** M9 sk. 90 – 6 use-case + fork (i) šaltiniai / (ii) CSV; 93.1 sektoriai pagal M7 kelią; 93.2 įrankiai + 6× stulpeliai + `content.sampleFile` download; `public/m9_sample_internal.csv`; hub 99 level1 aprašymai; M8 warm-up (+1) ir vignette (CRM/Excel). UI: `PracticeScenarioSlide` sample nuoroda. Skriptai: `patch-m79-everyday-closeness*.mjs`. SOT §10.
- **M7 Lygis C RC-1 (M79-32–34):** `modules-journey-m7.json` overlay — 14 Tier 1 laukų × 6 keliai (sk. 731, 733, 74, 734, 75). `resolveJourneyCopy.ts` + `m7JourneyCopyRegistry.ts`; UI integracija `SlideContent.tsx`. Validacija: `validate:journey-m7`, `audit:m7-journey-coverage`. Registry: `docs/development/M7_JOURNEY_COPY_REGISTRY.md`.
- **M7 LT/EN parity banga (RC-2–RC-4 dalinis):** `modules-journey-en-m7.json` — Tier 1 (84× AI) + Tier 2 dalinis (73, 732, 78, 78.5). Locale-aware resolver (`locale: 'lt' | 'en'`). Validacija: `validate:journey-en-m7`, `audit:m7-journey-coverage:en`.
- **M7 viz split (M79-40):** `viz` → `viz-sales` / `viz-mkt`; sk. 70 `branchIds`, pathBranch žemėlapis (100/103 → mkt, 104 → sales). Spec: `docs/development/M7_VIZ_BRANCH_SPLIT.md`.
- **M7 sk. 70 framing:** LT+EN `heroSubText` / `confirmMessage` — aiškina, kad promptai pritaikomi keliui.

### Added

- **Icon system P1 (central registry):** `src/icons/` — `types.ts`, `registry.ts`, `resolveIcon.ts`, `iconSizes.ts`, `SlideLucideIcon.tsx`; `npm run audit:slide-icons` + release-preflight vartas; DESIGN_SYSTEM §4b.

### Added

- **M7 Lygis C RC-4 (2026-07-16):** Tier 2 likę (sk. 83/84/86/87/89/891/90/92) + path-step **71.1–71.5** `step-task` × 6 keliai LT/EN; `applyJourneyOverlayToPathStep`; `audit:m7-journey-coverage` 31×6; M79-35…39.

### Fixed

- **M7 Lygis C launch consistency (2026-07-16):** `M7_CONTENT_BLOCK_FIELD_INDICES` off-by-one (sk. 74 MASTER, 733 templates, 734 filters, 78 role) — overlay dabar taikomas teisingoms `copyable` sekcijoms; `Database` pridėtas į `JOURNEY_ICONS` (sk. 70 `vidiniai`); LT M79-40 viz split užbaigtas (`viz-sales`/`viz-mkt` sk. 70 + pathBranch 861/99.9/100–106) + `generate:core-data`; nauji vartai `audit:m7-journey-indices` + pathBranch orphan check; journey validate/coverage įtraukti į `audit:release-preflight`.
- **M7 sk. 67 UX (2026-07-15):** 11 blokų siena → interaktyvus micro-win: `toolChoiceBar` (įrėminimas/kontekstas/rolė) + `linkedRowIndex` + `preCopyCheckBlock` MCQ; collapsible `comparisonStyle` + „Verslas vs saugumas“; subtitle be jailbreak; pašalintas „Praktika: kur daryti“. EN overlay ta pati struktūra (AI). `ContentSlides` — `preCopyCheckBlock` po linked sekcijų, optional `heading`.
- **M7 sk. 76 UX (2026-07-15):** „domenas“ → „sritis“; pašalinta klaidinanti `comparisonStyle` lentelė virš fold; `toolChoiceBar` be dubliuojančios lentelės; 6 sričių žemėlapis collapsible; EN overlay `area` terminologija. `ContentSlides` — scroll į `linkedRowIndex` promptą, klikuojamos lentelės eilutės, hint po bar.
- **SCHEME vertical flow connectors (2026-07-15):** `verticalFlowGeometry.ts` — `getVerticalFlowConnector`, `VERTICAL_FLOW_MIN_GAP=24`, stem gate testai; M7 pipeline/prep (`GAP` 14→24), M7 BI/story compact (`GAP` 22), M13 `TurinioWorkflowDiagram` — `palette.flow` + `flowStrong`; `diagramTokens.verticalFlow`.
- **Icon system P0:** `SectionIcon` — `Workflow`→Lucide Workflow (ne Repeat); pridėti `Repeat`, `Briefcase`, `Users`; intro-pie fallback → `HelpCircle` (ne raw tekstas).
- **M7 sk. 70.5 warm-up ikonos:** centralizuotas `resolveIcon('introPie')` — `Target`, `Database`, `BarChart3`, `Workflow`.

### Changed

- **M10–12 P2 EN + kelias + QA (2026-07-17 / commit 2026-07-20):** EN overlay be stub („Use this step…“ / „AI agent workflow step.“); LT seka sinchronizuota su EN (`10.481→10.482→10.485`, warm-up **10.61** / **110.5**, M12 `124.5→124→121–123`); M12 intro/i18n prompt-first; Release QA §5b1 + automated diagram/path smoke. Vartai: `validate:schema`, `audit:m1012`, `audit:markdown-tables`, m11/m12 + PracticalTask + DiagramLocalization vitest.
- **M10–12 P0+P1 journey/content (2026-07-16):** M12 seka `120.55 → 124.5 → 124 → 121–123` (`minScenariosToComplete: 3` ant 121–123); M10 `10.481` prieš `10.482`; **120.5** GOLDEN shell; **10.5** sutrauktas (ilgas šablonas → Neprivaloma); **10.485** orkestravimo klausimas; **10.48** aiškesnis 5 šablonų palyginimas; footers pagal pavadinimą; LT „pritaikymo katalogas“. Soft-complete honesty hint (vėliau P2 → inline banner). SOT + `MODULIO_10_SKAIDRIU_EILES.md`.
- **M10–12 deep audit (2026-07-16):** Ataskaita `docs/archive/audits/AUDITO_ATASKAITA_MODULIAI_10_11_12.md`. Top silpniausios skaidrės: GOLDEN remontas (10.2, 10.25, 120.25, 125); kognityvinė apkrova; M12 kelio aiškumas + **kelias tik su promptais** 121–123. EN orphanai 126/127 pašalinti.
- **Docs sync A–C residual (2026-07-16):** `07_08_09_backlog.md` §13 DoD; `M79_PATCH_REGISTRY` + `patch-m79-plain-w4-w5.mjs`; `DOCUMENTATION_QUICK_REF` / `DOCS_SYNC_CHECKLIST` / `CODEBASE_WHAT_IS_DONE` / `LEAN_INDEX` / `ROADMAP` / `TODO` – 74/512 HEAD; `sot_index` m79_patch_registry.

- **Icon system P2:** Emoji `icon` laukai M1/M4/M7 infographics → Lucide raktai; `SlideLucideIcon` renderers; M9 `practice-scenario-hub` level1Choices ikonos; `IconChip` dydžiai iš `iconSizes.ts`; schema enum intro-pie / scenario-hub; `sync-module-icons` apima `modules-m1-m6.json` ir `modules-m1-m9.json`.
- **Icon system docs/agents:** `docs/development/ICON_SYSTEM.md` (checklist); `AGENTS.md` + data/coding skills + `sot_index.json` → `iconRegistry`; `audit:slide-icons` data-validate kontrakte.

- **M7–M9 plain language W1–W2 (M79-41b, M79-42):** Pašalintos JSON skaidrių id nuorodos (`sk. 93.1` ir pan.) iš M9 intro (sk. 90), hub (sk. 99) ir M7 santraukos (sk. 75) – vietoje temų pavadinimų (Šaltinių katalogas, CSV valymas ir t. t.). Modulių metadata M7–M9 LT+EN: plain language subtitle/description (duomenų kelias, pilnas analizės šablonas; ne „pipeline / MASTER PROMPT“ hub kortelėje).

- **M7–M9 plain language W3 (M79-43):** Antraštės ir intro microcopy M7–M8 (sk. 70, 73, 73.5, 733, 84, 85, 66.9, 80, 80.5, 81) – žargonas (`pipeline`, `MASTER PROMPT`, `KPI`, `CFO`, `HR`, `BI`) pakeistas plain language pagal `PAPRASTOS_KALBOS_GAIRES.md` §2–§4; LT+EN overlay sinchronizuotas. Ne scope: quiz klausimai, body (W5), sk. 66.9 `content.subtitle` (W4).

- **M7 plain language W4–W5 + sk. 97 (M79-44, M79-45, 2026-07-16):** Sk. **97** collapsible – inline 4 Deming principai, be „Strateginis pamatas“ meta-nav (LT+EN). Sk. **66.9** W4: `subtitle` / `content.subtitle` / `celebrationText` / `recap` – „analizės eiga“, „pilnas analizės šablonas“. W5 body batch (70, 71, 73, 74, 78, 78.5, 84, 89, 92 + 66.9): pipeline→eiga, MASTER→šablonas, KPI/BI gloss. Skriptas: `scripts/patch-m79-plain-w4-w5.mjs`.

- **M79-50 smoke protokolas:** `TEST_REPORT.md` S1–S7 lentelė (kodo ✅; browser ⬜ savininkas); backlog §12.

- **M7 Lygis C epic (planavimas):** Patvirtinti sprendimai M79-32–40 — 6 adaptuoti branduolio promptų rinkiniai; fallback į bendrinį pardavimų tekstą; warm-up ne 6×; M79-40 viz split tas pats epic, release po Faze 1. Spec: `docs/development/M7_LYGIS_C_JOURNEY_EPIC.md`; backlog §P0.

- **M7 kelionės pasirinkimas (6 keliai):** Skaidrė 70 – pašalintas atskiras 7-as kelias „Vidiniai duomenys“; semantika sujungta į „Kita sritis ar vidiniai duomenys“. Sk. **78.5** perkelta į branduolį (matoma visiems fokusams). Sk. 78 cross-link išvalytas (forward hint į 78.5). Progreso migracija `vidiniai` → `kita` (`moduleJourneyFocus.ts`). EN overlay sinchronizuotas.
- **M4 sk. 45 pipeline diagrama:** `ContextEngineeringPipelineDiagram` – rodyklės nebekerta blokų (L-forma Prompt→LLM dešinėje, pašalinta LLM→Output per Tools); etiketės (Įvestis, LLM↔Tools) perkeltos į dešinę overlay; LT toggle „Promptų inžinerija“ / „Konteksto inžinerija“ (`contextEngineeringPipelineConfig.ts`, `modules.json` sk. 45).
- **CI typecheck:** `@testing-library/jest-dom` pridėtas kaip devDependency; Vitest matcher tipai (`toBeInTheDocument`, `toHaveAttribute`, …) per `src/test/vitest-env.d.ts` – `npm run typecheck` praeina švarioje `npm ci` aplinkoje.

---

## [1.4.5] – 2026-07-15

### Fixed

- **Release gate – design tokens (2026-07-15):** `PORTAL_BEAT_COLORS` perkeltas į `diagramTokens.ts` (re-export per `portalBeatLayout.ts`); `HallucinationRatesDashboard` ir `M9DataWorkflowDiagram` – pašalinti hardcoded hex / arbitrary klasės. **Vartas:** `audit:design-tokens:gate` ✅ (406 ≤ 417).

- **Release gate – flaky quiz test (2026-07-15):** `App.quiz.integration` – `waitForElementToBeRemoved` + stabilūs Modules heading assert'ai; mock'ų cleanup per `clearAllMocks`. **Vartas:** `test:run` 482/482 ✅ · `audit:release-preflight` ✅.

- **M13–15 EN summary heading (2026-07-15):** `modules-en-m13-m15.json` – „Ka ismokai“ → „What you learned“ (2× summary).

### Changed

- **Release 1.4.5 tag:** `generate:core-data` sinchronizuotas po `modules.json` pakeitimų; `audit:m79` + `audit:m46` ✅; `npm run build` ✅.

_Žemiau – Unreleased sprinto turinys (M7–M9 polish, M4 portal), įtrauktas į šį release._

- **M4 sk. 61 – įrankių atmintinė grąžinta (2026-07-15):** Pašalintas stub „perkelta į Modulį 7“; atkurtas pilnas optional turinys (6 įrankiai, whyBenefit, patarimai, tipinė eiga) pagal SOT 4.2a-academic. MVP 1–6 vartotojai vėl turi atmintinę RAG bloke. M7 sk. 71.35 lieka kontekstinė kopija; cross-ref atnaujintas abiejose pusėse. **Failai:** `modules.json`, `modules-en-m4-m6.json`, `modules-en-m7-m9.json`, `turinio_pletra_moduliai_7_8_9.md` §1.1.

- **M7–M9 P2 UX polish (2026-07-15):** Antras polish sluoksnis po Top 5 — **Iter 1** M7 etika (sk. 67, 67.5, 67.8, 67.3, 68: collapsible, dedup, Patikra); **Iter 2** copyable filtrai (`toolChoiceBar` + `linkedRowIndex`) sk. 734, 731, 733, 77; `ContentSlides` leidžia bar be `table`; **Iter 3** M9 sk. 93 bookends, sk. 94 Patikra, scenarijai 101/102/111/116/117, hub 99; **Iter 4** optional šakos sk. 77.5, 90, 861, 88, M7 sk. 101; **Iter 5** sk. 200 dashboard intro (`HallucinationRatesDashboard`), sk. 74 MASTER schema copy. Skriptai `patch-m79-p2-polish.mjs` + `patch-m79-p2-polish-en.mjs`. **Vartai:** `validate:schema` ✅ · `generate:core-data` ✅ · `audit:m79` ✅ · `lint` ✅ · `test:run` 482/482 ✅.

- **M7–M9 UX polish Top 5 (2026-07-15):** Sumažintas scroll ir promptų siena — M9 sk. **93** (be tekstinio 8 žingsnių dubliavimo, collapsible pavyzdys), sk. **94** (`M9WorkflowStepCopyBlock` + `m9_workflow_step_prompts` — vienas aktyvus promptas per žingsnį), M7 sk. **76** (`toolChoiceBar` + `linkedRowIndex` filtras), sk. **89**/**73** (collapsible 3a–3e, pipeline diagrama viršuje), M9 sk. **99**/**90** (neprivalomo kelio banneris, CTA → 93.1); GOLDEN §3.2 sk. **77**/**861**/**88**/**801**/**802**; hub accent CTA „Praleisti hub“. **Vartai:** `validate:schema` ✅ · `generate:core-data` ✅ · `audit:m79` ✅ · `lint` ✅ · `test:run` 480/480 ✅.

- **M7–M9 Phase 2 polish (2026-07-15):** Po M79 iteracijų — Patikra de-boilerplate (19 M7 skaidrių, 0× „grįžk prie 2️⃣“); M8 warm-up be naked `M7 sk.` refs; M7 macro map 59/59 (`m7MacroBlocks.ts`); sk. **78.5** vidinių duomenų šaka; M9 **93.1** (šaltinių katalogas) ir **93.2** (CSV valymas) `practice-scenario`; footer variant B (visible N/M slide footer M7); EN overlay sync. **Vartai:** `validate:schema` ✅ · `generate:core-data` ✅ · `audit:m79` ✅ · `lint` ✅ · `test:run` 478/478 ✅.

- **M7–M9 tobulinimo iteracijos 1–5 (2026-07-14):** Įgyvendintas M79 planas — cross-ref rewrite (725/726 dedup, be naked id), M7 footer be skaičių (variantas A), microcopy (sk. 72, 97, 67, 71.35), kelio žemėlapis sk. 71, decision tree sk. 74/89, optional „Vidiniai duomenys“ šaka, M9 praktika (i)(ii), PDF evergreen (be 48 val.), `M9DataWorkflowDiagram` horizontal card layout, M7 macro-block etiketė `ModuleView`, EN overlay sync. **Vartai:** `validate:schema` ✅ · `generate:core-data` ✅ · `lint` ✅ · `test:run` 478/478 ✅ · `audit:m79` ✅.

- **M4 sk. 53.5 Bang L Readability – dark mode SVG (2026-07-14):** Beat diagramų etiketės/caption dark fone beveik nematomos (`PORTAL_BEAT_COLORS.ink` #111827) — pataisyta per `PORTAL_BEAT_SVG` (`dark:fill-gray-100/300`) ir bendrą `portalBeatBarRow.tsx`; secondary tekstai (`muted`, kicker, source footer) → `dark:text-gray-300`. **Vartai:** `lint` ✅ · `test:run` 478/478 ✅. JSON nekeistas. Žr. `PORTAL_BEAT_DIAGRAMS.md`, `TEST_REPORT.md` § Bang L smoke.

- **M4 sk. 53.5 Portal 2.1 Wave 4–5 UI polish (2026-07-14):\*\*** Post-audit pataisymai – dekoratyvus `portalNav` be fake hover (`PortalMastheadNav`: `navDecor`, `aria-hidden`, `pointer-events-none`); chapter label dark kontrastas (`getPortalSectionLabelClasses('break')` → `dark:text-gray-300`); funkcinis `PortalChapterNav` atskirtas `border-t`; DataBrief šaltiniai skaitomesni (`bodySm`); breaking ticker paslėptas mobile (`hidden sm:block`). JSON nekeistas. Žr. `PORTAL_2_1_IMPROVEMENT_GUIDE.md` §3–4.

### Changed

- **Dokumentacijos maintenance governance (2026-07-15):** Nauji `DOCS_MAINTENANCE.md` (sluoksniai, dual SOT, release cadence) ir `M79_PATCH_REGISTRY.md` (patch skriptai, EN index-merge taisyklė). Meta sync: testai **72/482** (`CODEBASE_WHAT_IS_DONE`, `ROADMAP`, `LEAN_INDEX`, `DOCS_SYNC_CHECKLIST`, `RELEASE_QA_RUN`). `modules.schema.json` – `toolChoiceBar`, `linkedRowIndex`; GOLDEN + LENTELIU M7 pavyzdžiai. Backlog §12 P2 DoD; `RELEASE_QA_CHECKLIST` §Docs sync. **Vartai:** `validate-sot-index` ✅.

- **M7 sk. 74 / M9 workflow paaiškinimai – be „skaidrė 94“ (2026-07-14):** `m9DataWorkflowContent.ts` — context-aware tekstai M7 MASTER vs M9; pašalinti naked id (`94`, `7.16a`); `modules.json` sk. 93–94 + EN overlay. **SCHEME modernizacija** — backlog M79-23. **Vartai:** `validate:schema` ✅ · `generate:core-data` ✅ · `lint` ✅ · `test:run` 66/66 (DiagramLocalization) ✅.

- **M7 sk. 200 haliucinacijų benchmark duomenys (2026-07-14):** `hallucinationRates.ts` atnaujintas iš Vectara LLM Hallucination Leaderboard (top-10, HHEM-2.x) — seni GPT-4/GPT-3.5 modeliai pakeisti 2026 modeliais (Finix S1 32B, GPT-5.4 Nano, Gemini 2.5 Flash-Lite ir kt.); šaltinio URL → `vectara/leaderboard`; `asOfDate: 2026-07-14`; dashboard rodo \* žemai atsakymų aprėptį (Phi-4, Snowflake Arctic). **Vartai:** `lint` ✅ · `test:run` 478/478 ✅.
  `PORTAL_TEXT.body` / `bodySm` light → `gray-700`; `PortalDataBriefRow` source per `PORTAL_TEXT.mutedXs` (be hardcoded override). Papildoma Bang L dalis — žr. Fixed (SVG dark).

- **M4 sk. 53.5 Bang J+K polish (2026-07-14):** `sources[]` + MIT/Europos Komisija; ~15,8% sync; `portal-beat-awareness` anchor + teaser dedup; LT 69%/9,8% aiškintojas; ribbon/insight dedup; next-step beat body sutrumpintas; P3 masthead + bar row token. **Vartai:** `validate:schema` ✅ · `generate:core-data` ✅ · `audit:m46` ✅ · `lint` ✅ · `test:run` 478/478 ✅. 48h retest – ⬜.

- **M4 sk. 53.5 next-step-prompt B+C hybrid (2026-07-14):** `next-step-prompt` beat — 2 eil. tiltas į sk. 43 + copyable promptas (verslo analitikas → 5 punktų komandos santrauka); naujas `PortalNextStepPromptBlock.tsx`; `PromptFlowDiagram.tsx` pašalintas; copy SOT `portalBeatContent.ts` → `nextStepPrompt`. JSON title/body nekeistas. Žr. `PORTAL_BEAT_DIAGRAMS.md`.

- **M4 sk. 53.5 Portal 2.1 UI audit + tobulinimo gairės (2026-07-14):** `PORTAL_2_1_UI_AUDIT.md`, `PORTAL_2_1_IMPROVEMENT_GUIDE.md`, skill `portal-21-audit.md`; Wave 4–5 implementuota (žr. Fixed). 48h retest – ⬜.

- **M4 sk. 53.5 Typography Wave T1–T6 (2026-07-14):\*\*** Tipografijos suvienodinimas pagal gilaus audito planą – pašalinta „padrika“ hierarchija (tos pačios rolės skirtingi dydžiai). **SOT:** `portalSurfaces.ts` – naujas `getPortalSectionLabelClasses('break'|'nav')` (xs; break = UPPERCASE bold, nav = sentence semibold); `getPortalKickerClasses('chapter'|'rail')` deprecated alias. **T1** skyriaus etiketės: `PortalChapterBreak`, `PortalChapterNav`, `PortalHeroSidebar` („Svarbiausia“). **T2** `pullQuote` → `text-lg lg:text-xl font-semibold` (ribbon nebe „nukritusi“ po beat). **T3** hero subline `bodySm`; `takeawayCta` `text-base` (klausimas ne mažesnis už takeaway). **T4** `PortalHorizontalBarRow` – visi label `bodySm`, #1 tik semibold. **T5** `PORTAL_TEXT.body` `text-sm lg:text-base` (GOLDEN §1); `PORTAL_FOOTER.brand` size token. **T6** `PortalDataBriefRow` – 1-as stat (32,7%) `chapter` 3xl, likę `inline` 2xl. JSON nekeistas. Žr. GOLDEN §3.2d, `NEWS_PORTAL_SLIDE_53_5.md` § Typography, `M4_SK_53_5_SESSION_RETROSPECTIVE.md`, `TEST_REPORT.md` § Typography smoke (375px ⬜).

- **M4 sk. 53.5 in-page anchors (2026-07-14):** `PortalChapterNav` (Duomenys · Giliau · Santrauka); sidebar „Svarbiausia“ teaser jump per `scrollTarget`; `portalSectionAnchors.ts`. Žr. NEWS_PORTAL § In-page anchors.

- **M4 sk. 53.5 PromptFlow A+C hybrid (2026-07-14):** _(superseded B+C hybrid)_ Įvestis → Promptas → Rezultatas SVG; pakeista `PortalNextStepPromptBlock`. Žr. PORTAL_BEAT_DIAGRAMS.

- **M4 sk. 53.5 Portal 2.1 wave 3 (2026-07-14):** Depth act – abu card'ai `PORTAL_DEPTH_CARD_VARIANT` (brand); violet tik metric/segment/kicker. Žr. GOLDEN §3.2d, PORTAL_BEAT_DIAGRAMS.

- **M4 sk. 53.5 Portal 2.1 consistency polish wave 2 (2026-07-14):** Ribbon2 variant brand (Depth act budget); DataBrief inline metric + 98% violet; token'ai masthead/bullet/source footer/gap spacing; bar row tipografija; pašalintas `PortalFeaturedStat`, supaprastintas `NewsPortalPromoRibbon`; `metric.hero` removed. Žr. GOLDEN §3.2d.

- **M4 sk. 53.5 Portal 2.1 DS consistency (2026-07-14):** promo ribbons + CTA → editorial surface (`getPortalEditorialSurfaceClasses`); nauji `PortalSlideCta`, `PortalInsightCard`, `portalCardShell.ts`; `portalSurfaces.ts` – `PORTAL_HEADING`, `PORTAL_FOOTER`, `getPortalInteractiveCtaClasses`; tipografijos migracija beats/sidebar/hero KPI; GOLDEN §3.2d; spalvų biudžeto išimtis per chapter act. Žr. `NEWS_PORTAL_SLIDE_53_5.md` § Portal Surface System.

- **M4 sk. 53.5 Portal 2.1 surface polish (2026-07-14):** `portalSurfaces.ts` (editorial vs card surface, metric scale, spacing); `PortalImageFrame` unified foto; legacy render kelias pašalintas; `PortalBlockShell` be `readable` override; tipografijos cap youth KPI; Lietuva secondary `brand`; sidebar teaser be 98% dubliavimo; tools/youth labels be 03/04; redakcinis footerSub. Žr. `NEWS_PORTAL_SLIDE_53_5.md` § Portal Surface System.

- **M4 sk. 53.5 Portal 2.1 (2026-07-14):** portalo signalai – `PortalMastheadNav`, `breakingTicker`, `heroSidebarTeasers`, `portalMeta`; hero be inline 98%; Lead gradient pašalintas; `PortalDataBriefRow` (32,7% · 20% · 98%); ribbon pull-quote; secondary foto viršuje; CONTENT redakcinis tonas. Žr. `NEWS_PORTAL_SLIDE_53_5.md` § Portal 2.1.

- **M4 sk. 53.5 Rich Portal 2.0 (2026-07-14):** selective restore – 4 foto slotai (`heroImageVertical`, secondary×2, `insightCard.illustrationHorizontal`); 2-col hero editorial + gradient 32,7% virš fold; beats flat shell; editorial + React SVG + hybrid sticky lieka. Žr. `NEWS_PORTAL_SLIDE_53_5.md` § Rich Portal 2.0. _(Lead gradient superseded Portal 2.1.)_

- **M4 sk. 53.5 hybrid recovery (2026-07-14):** anti-PPT over-correction fix – immersive nav be tuščios sticky juostos (slim progress + desktop FAB „Tęsti“); tipografijos floor (caption 12px, chapter/source gray-600); `mainInsightBlock` 32,7% gradient atstatytas editorial režime; ribbon `afterKpi` be stat dedup; EN overlay sinchronizuotas. Žr. TEST_REPORT regresija 8→2.

- **M7–M9 mikrocopy trumpinimas (3 sprintai, 2026-07-14):** `modules.json` – sutrumpinti intro/branduolys/viz šaka tekstai; trumpas „4 Patikra“ šablonas; M9 sk. 90 intro; M9 scenarijų `reflectionPromptAfter` / `motivation` / `narrativeLead` perkelti į UI (`TestPracticeSlides` + `PracticalTask` i18n `m9Default*`); M8 801–802 bonus prompt dedupe; EN overlay sinchronizuotas per `scripts/patch-en-m7-m9-microcopy.mjs` (index-align sk. 73, 74, 92, 97, 101); migracija `scripts/migrate-m7-m9-microcopy.mjs`; **`npm run audit:m79` OK**.

- **Dokumentacijos archyvas (2026-07-14):** vienkartinės analizės perkeltos į `docs/archive/development/analysis/`; UX/mobile auditai → `docs/archive/audits/`; atnaujinti `DOCUMENTATION_INDEX.md`, `DOCUMENTATION_QUICK_REF.md`, `LEAN_INDEX.md`, `docs/README.md`, `docs/archive/README.md`; nuorodos iš aktyvių doc pataisytos; `docs/development/analysis/README.md` – redirect į archyvą.

### Added

- **M4 sk. 53.5 React SVG editorial beats:** `beat-diagrams/` (AwarenessGap, LithuaniaContext, `portalBeatBarRow`, `PortalNextStepPromptBlock` + `portalBeatLayout.ts` / `PORTAL_BEAT_SVG`); KPI strip – Lucide `IconChip` + JSON `iconKey`; docs `PORTAL_BEAT_DIAGRAMS.md`, `PORTAL_2_1_UI_AUDIT.md`.
- **M4 sk. 53.5 anti-PPT komponentai:** `PortalBlockShell` + `portalBlockShellUtils` (DS `blockVariantClasses`); `PortalChapterBreak`; `PortalFeaturedStat` (inline hero stat).
- **M4 sk. 53.5 Satori beat pipeline:** `scripts/generate-portal-beats.mjs`, `data/satori/portal-beats.yaml`, 3 editorial templates; planas `PORTAL_BEAT_SATORI_PLAN.md`.
- **M4 sk. 53.5 news-portal editorial scroll:** `immersive` režimas (ModuleView slepia course H1/badge); `editorialBeats` (3) + `promoRibbons` (2); nauji komponentai `NewsPortalEditorialBeat`, `NewsPortalPromoRibbon`, refactor į `src/components/slides/news-portal/`; 3 meme PNG (`di_portal_meme_01–03`); storyboard docs `NEWS_PORTAL_SLIDE_53_5.md`; GOLDEN_STANDARD §3.5 papildymas.
- **M7 lentelių migracija (6 sekcijos):** Markdown pipes `body` → canonical `section.table` skaidrėse 734 (sprendimų filtrai + `toolChoiceBar`), 78, 84, 76, 104, 106; EN overlay `modules-en-m7-m9.json` sinchronizuotas; `npm run audit:markdown-tables` prevencijos vartas; `LENTELIU_STANDARTAS.md` §2/§5 atnaujinti.
- **Turinys + DS backlog sprint (Banga 0–4):** L1 lentelių checklist `TEST_REPORT.md`; M5 sk.47 `artifactDownload` + `DownloadTemplateButton.tsx` (.txt šablonas LT/EN); M4 sk.61 `optional: true` (RAG įrankiai) + sk.63.7 „Papildomas skaitymas“; refleksijos META/INPUT/OUTPUT M8 sk.82, M10.8, M11 sk.112, M13.9, M14 sk.142 (`TestResultsReflectionBlock`); M14 `TestKnowledgeScopeDiagram` deep-link į M13; `ContentSlides` i18n (`tableComparisonAria`, `choiceSelected`, `strengthBadge`); UX-MOB-1 `scrollToFirstAction` išplėtimas; W7d `getContentBlockVariantClasses` help tabs / whyBenefit.
- **Backlog sprint 2 (DIA-04, Mobile P2, DEF-2, RAG):** M10 `ThreeAStrategy` 5% juosta, `ThreeLabs` connector rodyklės + `diagramTokens`; `TriggerFlow` webhook polish; `RadarChart` i18n aria + 375px; M1 sk.8–11 „Kodėl tai veikia“ sutrumpinta; RAG sk.61 → M7 **71.35** (optional), M4:61 stub nukreipimas; M8:82 EN reflection overlay.

### Changed

- **M4 sk. 53.5 anti-PPT overhaul (P0+P1):** `PortalBlockShell` visiems storyboard blokams; redakcinis hero (`PortalFeaturedStat`, pašalintas `heroImageVertical`); immersive sticky nav (desktop: progress + Tęsti; mobile: be top counter); `PortalChapterBreak` (Duomenys/Giliau/Santrauka); KPI strip 4→2 (56% + 20%); metric dedup (32,7% ribbon, ne KPI); secondary 02 be foto; `NEWS_PORTAL_SLIDE_53_5.md` Anti-PPT taisyklės.
- **M4 sk. 53.5 03/04 component split (Variant B):** `PortalRankingBlock` + `PortalHeroKpiBlock`; hero ~15,8% darbe; `youthSegmentsLabel` + `youthClosingInsight`; insight point 02 atnaujintas; EN overlay sinchronizuotas.
- **M4 sk. 53.5 03/04 polish:** `toolsInsight` + `youthHeroInsight` derived insights; 04 stacked hero be foto; `PortalHorizontalBarRow` komponentas.
- **M4 sk. 53.5 pilnas slide polish (2026-07-13):** beats 2–3 golden pattern (lithuania horizontal bars +36,3 pp, next-step be pageBg); SecondaryCards/Tools/Darbuotojai/InsightCard `border-l-4` + IconChip tools; copy dedup, insight Santrauka 3 punktai, footer be emoji.
- **M4 sk. 53.5 awareness-gap polish:** SVG row geometry (caption virš juostos), `border-l-4` beat shell, pašalintas vidinis diagram chrome, inline 48 proc. punktų, HTML šaltinio footer, body dedup.
- **M4 sk. 53.5 CONTENT softinimas (2026-07-14):** awareness-gap 86/38/48 – „illustracinė suvokimo spraga“, tendencijų disclaimer; EN `gapUnit` → `pp`.
- **M4 sk. 53.5 beats:** PNG/Satori → React SVG; pašalinti `editorialBeats[].image` ir KPI emoji; Satori planas pažymėtas deprecated.
- **Microcopy (DEF-2 dalinai):** M4 sk.61 Trumpai/Patarimai sutrumpinti; M6 sk.68 schema body sutrumpintas; M4 sk.63.7 papildomas skaitymas atskirtas nuo branduolio.
- **EN overlay sinchronas:** `modules-en-m4-m6.json` (sk.61 optional, 63.7, 47 artifactDownload); `modules-en-m10-m12.json` (M11:112 reflection); `modules-en-m13-m15.json` (M14:142 reflection).

### Docs / lessons learned (M4 sk. 53.5, 2026-07-13)

- **Typography Wave (2026-07-14):** pilna tipografijos matrica `NEWS_PORTAL_SLIDE_53_5.md`; GOLDEN §3.2d ladder + metric `chapter` naudojimas; regresijos guardrail – min matomas tekstas ≥12px, section label kontrastas gray-600.
- **Bang L Readability (2026-07-14):** `PORTAL_BEAT_SVG` dark-aware fill; secondary text floor; `M4_SK_53_5_SESSION_RETROSPECTIVE.md` Bang L.
- **Retrospektyva:\*\*** `docs/development/M4_SK_53_5_SESSION_RETROSPECTIVE.md` – 3 bangos (editorial scroll → React SVG → user-test polish), failų mapa, atviri darbai, DoD.
- **Anti-PPT sesija (2026-07-13):** testuotojo audit (LMS rėmas + ad-hoc kortelės + trijų kolonų hero) → P0+P1 planas; `NEWS_PORTAL_SLIDE_53_5.md` §Anti-PPT; `TEST_REPORT.md` §48h anti-PPT protokolas (portal ≥70%, PPT ≤30%).
- **Agentų pamokos:** atnaujinti `.cursor/skills/{orchestrator,ui-ux-agent,user-journey-agent,coding-agent,content-agent,data-agent,qa-agent,code-review-agent}/lessons.md` (2026-07-13 anti-PPT).
- **TEST_REPORT:** awareness-gap round 1–2 + anti-PPT 48h protokolas (verdict ⬜ pending; pre-retest baseline 2026-07-14).
- **TODO:** §1.0d – CONTENT softinimas ✅; PNG cleanup ✅; 48h retest ⬜ paruošta.
- **sot_index.json:** `m4_sk_53_5_news_portal` content SOT entry.
- **AGENTS.md:** nuoroda į news-portal feature docs ir mixed-task pipeline šiam slide.

### Removed

- **M4 sk. 53.5 PromptFlowDiagram (2026-07-14):** `PromptFlowDiagram.tsx` — pakeistas `PortalNextStepPromptBlock` (B+C hybrid).
- **M4 sk. 53.5 deprecated Satori PNG:\*\*** pašalinti `public/di_portal_meme_01–03.png` (pakeisti React SVG `beat-diagrams/`).

### Fixed

- **M4/44 LLM diagram routing:** skaidrės 44 sekcija „Kaip veikia LLM?“ naudoja kanoninį `image: llm_autoregressive` (vietoj legacy `/llm_autoregressive_rytas_zalgiris.svg`), kad `diagramRenderers` registry vėl rodytų interaktyvų `LlmAutoregressiveBlock` (8 žingsniai, EN/LT), o ne statinį LT SVG fallback su „Open in new tab“. Sinchronizuoti `modules-m1-m6.json`, `modules-m1-m9.json`, `modules-en-m4-m6.json`; regresija: `diagramRenderers.test.tsx`, `DiagramLocalization.test.tsx`.
- **M4/43 ir M4/56 diagram routing:** kanoniniai raktai `strukturuotas_procesas` ir `llm_arch` (vietoj `strukturuotas_procesas_3_zingsniai`, `llm_arch_diagram`) – atkurti `StrukturuotasProcesasBlock` ir `LlmArchDiagramBlock`; sisteminis vartas `diagramRenderers.test.tsx` tikrina visus M1–15 `section.image` prieš registry.

---

## [1.4.4] – 2026-07-09

P2 PDF/sertifikatų artefaktai, DS Next Waves W7–W10, cross-repo pre-launch vartai ir dokumentacija (inzinerija + promptanatomy marketing monorepo).

### Added

- **PDF / sertifikatų P2 M10–15 artefaktai:** pridėti tier 4 / tier 5 sertifikatai (Agentų kelias M10–12 su M11 ≥70 %, Turinio kelias M13–15 su M14 ≥70 %) ir naujos PDF atmintinės `m1012` / `m1315` su LT/EN content JSON, schemomis, PDF utilais, registry įrašais ir guard testais.
- **PDF / handout / sertifikatų P1 registry:** pridėtas `completionArtifacts.json` registry su schema ir guard testu, 5 handout content JSON schemos prijungtos prie `validate:schema`, o `downloadHandout.ts` centralizuoja M1/M4/M5/M6/M7–9 atmintinių atsisiuntimą, analytics ir klaidų log'inimą.
- **M4 PDF atmintinė ir „Mano medžiaga“:** pridėta Modulio 4 value-only PDF atmintinė (`m4HandoutContent*.json`, `m4HandoutPdf.ts`) su RAG, giliojo tyrimo, tokenų, haliucinacijų ir patikros checklist santrauka; Modulio 4 užbaigimo ekranas rodo atsisiuntimo mygtuką, o `ModulesPage` gavo „Mano medžiaga“ bloką pakartotiniam M1/M4/M5/M6/M7–9 atmintinių ir uždirbtų sertifikatų atsisiuntimui.
- **UX Banga 4 (etalonų dokumentacija ir EN sync) užbaigta:** `GOLDEN_STANDARD.md` papildytas §3.8 „Modulio interaktyvumo ritmas“, `MODULIO_4_SKAIDRIU_EILES.md` gavo M4 pattern katalogą, pridėtas `UX_BANGA_1_2_EN_SYNC.md` su Banga 1–2 EN overlay sign-off, o `audit:slide-interactivity` papildytas informaciniu `--embed-catalog` režimu (`npm run audit:embed-catalog`).
- **UX Banga 3 (M1/M2/M11/M14) užbaigta:** M1 micro-win patvirtintas (`path-step` 1.1 + `warm-up-quiz` 16.5), M2 bonus skaidrės 51–52 sutrauktos mobile UX (sk.51 `briefCheckBlock`, sk.52 dvi collapsible copy grupės), M11/M14 testuose pasiektas ≥30 % scenario klausimų share (M11 3/9, M14 3/8). Pridėtas `audit:test-scenario-share` gate ir M14 data-contract testas.
- **UX Banga 2 (M5/M6/M8/M12/M15) užbaigta:** pridėti formative check'ai per esamus skaidrių tipus (be naujo React kodo). **M8** – `warm-up-quiz` 80.5 (3 klausimai: pipeline / MASTER / analizės tipai; remediation → M7 73/74/731). **M12** – `path-step` 120.55 „Kontrolinis taškas: multi-agent schema“ po 120.5, prieš 3A praktikas. **M15** – `path-step` 150.26 „Kontrolinis taškas: projekto kelias“ po 150.25, prieš scenarijus. **M6** – `correctPromptPractice` skaidrėje 68 (HTML 6 blokų prompto pataisymo praktika). Visi su LT/EN overlay; M6 sinchronizuotas su core M1–6/M1–9 profiliais. UX-2.4 patvirtinta kaip jau įgyvendinta (M5 warm-up 511). Interaktyvumo metrikos: warm-up 15, path-step 12, embedded 8.
- **M6 UX-2.1 path-step:** pridėta skaidrė 65.5 „Duomenų tvarkymo checklist“ tarp Modulio 6 refleksijos ir Duomenų tvarkymo atmintinės; žingsnis atrakina „Promptų biblioteka“ ir „Promptų versijavimas“ terminus žodynėlyje.
- **Design System hardening (DS v0.3 pilot):** `surfaceGlass` tokenai (`shell`/`panel`/`overlay`) AppNav, ModuleView ir TestPracticeSlides sticky sluoksniuose; `<Banner>` migracija ContentSlides, BlockSlides, TestPracticeSlides ir VaizdoGeneratoriusSlide; `<CTAButton>` / `<Card>` HomePage, ModulesPage, ModuleView; `SlideWorkspace` wrapper M4+M10 `content-block` pilotas; `getContentBlockVariantClasses()` ContentSlides; `audit:design-tokens:gate` (regresija vs 2026-07 baseline) ir `audit:module-identity` (M1–15 `accent` + `identityIcon`); GOLDEN_STANDARD §2.2 `emerald`/`violet` + §6 pilna modulių identiteto lentelė; diagramų P2 (M10ThreeAStrategy, M12ThreeLabs, M13AecFunnel).

### Changed

- **Sertifikatų serial numeriai:** CertificateScreen dabar perduoda stabilų per-tier serial numerį iš localStorage, todėl pakartotinai atsisiųstas tas pats sertifikato tier rodo tą patį `PA-2026-...` numerį.
- **Docs sync po P2 artefaktų:** agentų įėjimo dokumentai, DATA registry, PDF testavimo gairės ir skills sinchronizuoti su tier 4/5 sertifikatais bei `m1012` / `m1315` atmintinėmis.
- **DS Next Waves W7–W10:** `BlockSlides`, `TestPracticeSlides`, `AdvancedBlockSlide`, `ActionIntroSlide` ir `RecognitionExerciseBlock` callout'ai migruoti į `<Banner>`; `SlideWorkspace` išplėstas į M1/M7/M13 ir `evaluator-prompt-block`; TestPractice / shell CTA migruoti į `<CTAButton>`, o shell kortelės į `<Card>`; M13/M15 diagramų P2 paletės ir dark-mode polish; `audit:release-preflight` papildytas DS vartais, design-token baseline sumažintas iki 417 (`arbitraryClass` 59).
- **Design tokens:** targeted arbitrary-class cleanup (`text-[11px]` → `text-xs` VaizdoGeneratoriusSlide); blockVariant sekcijos per bendrą helperį vietoj inline ternary.
- **DS W6 QA closure:** sticky offset baseline sinchronizuotas (GlossaryPage, TestPracticeSlides); automated gates žali (lint, 416 testai, audit total 469, module-identity 15/15); TODO §1.0c W6–W10 planas.

### Fixed

- **M11/M14 EN scenario polish:** M11 q9 ir M14 q7/q8 EN overlay tekstai pakeisti iš generic placeholder copy į konkrečias situacijas, kurios atitinka LT mokymosi ciklo, conversion hero vizualo ir image→video grandinės semantiką.
- **M12 EN footer numeris (120.5):** ištaisytas pre-existing neatitikimas – EN overlay footer rodė „slide 5“ vietoj teisingos pozicijos; po `path-step` 120.55 įterpimo LT/EN footeriai perskaičiuoti ir `AUDIT_MODULES=12 audit-footer-numbers --locale=en` praeina.
- **M7–M9 LT/EN locale maišymo apsauga:** `ModuleView` next CTA logika iškelta į `navLabel` helperį su EN fallback, pridėtas `audit:nav-labels` release gate, M9 praktikos CTA ir M8→M9 rezultatų mygtukai perkelti į i18n raktus; pataisyti M7 EN reliability bloko footer numeriai.
- **M7 intro-action-pie closure:** skaidrė 70.5 dabar slepia M4 segmentams skirtus „Generuok patarimus sau“ / „Eksportuok PDF“ veiksmus ir naudoja „Profilių pasiskirstymas“ grafiko antraštę; M7 branduolio dokumentacija atnaujinta iki 34 skaidrių.

### Docs

- **Cross-repo pre-launch:** `INTEGRATION_OVERVIEW.md` – Supabase→`generate-access-link` tiltas; `MARKETING_SUBMODULE_PIN_1.4.4.md`, `MON-4_POSTHOG_DEPLOY.md`; `RELEASE_QA_RUN.md` – pilnas preflight + prod API smoke (2026-07-09); `TODO.md` / `AUDIT_2026-06_SUMMARY.md` – monetizacija live per marketing repo.

---

## [1.4.3] – 2026-07-07

UX Banga 1 (M1/M7/M10/M13 interaktyvumas), M13–15 Turinio inžinerijos kelias su EN overlay, M7–M12 LT/EN consistency ir kelių navigacija, audit toolchain (M10–15 + slide interactivity).

### Gate

- `npm run validate:schema`, `npm run audit:m49`, `npm run audit:m1012`, `npm run audit:m1315`, `npm run audit:slide-interactivity`, `npm run lint`, `npm run test:run` (410 testų) – žali (2026-07-07).

### Added

- **M1–15 skaidrių UX / interaktyvumo planas:** `docs/development/SLIDE_UX_INTERACTIVITY_PLAN_M1_M15.md` – bangos M7/M10/M13 (P0), practice path-step (P1), M4 etalonas; prioritetas virš MON full sprint.
- **Interaktyvumo audit:** `scripts/audit-slide-interactivity.mjs`, `npm run audit:slide-interactivity` – warm-up/path-step skaičiai, content-block streak, learn modulių įspėjimai.
- **M7 warm-up savitikros:** pridėtos 4 branduolio `warm-up-quiz` skaidrės (73.5, 731.5, 891.5, 74.5) su LT/EN turiniu, o 68.5 perkelta iš `etika-plus` šakos į bendrą branduolį. M7 dabar turi 5 warm-up ir branch-aware content-block streak 7.
- **M13–15 Turinio inžinerijos kelias:** M13 papildytas image → video grandine, kameros prompto bloku ir 3 kriterijų vertinimo rubrika; M14 išplėstas iki 8 klausimų su scenarijų MCQ; M15 gavo quick start skaidrę 150.5 ir optional pilną mini kampanijos kelią (hero vaizdas → video → muzika).
- **M13–15 EN overlay ir vartai:** pridėtas `modules-en-m13-m15.json`, `build:modules-en-m13-m15`, `extract:modules-en-m13-m15` ir `audit:m1315` (coverage + language), o `modulesLoader.ts` merge'ina EN M13–15, kai kataloge yra 13+ modulių.
- **M7 DB įrankių matrica:** skaidrė 84 papildyta PostgreSQL, MySQL, SQLite, MongoDB, Redis / Valkey ir Supabase pasirinkimo lentele bei CopyButton promptu; žodynėlis papildytas ER / 3NF / KPI ir SQL / NoSQL / cache sąvokomis, o įrankių kataloge pridėta kategorija „Duomenų bazės“ (LT/EN + M1–9 core sync).
- **M7–12 schemų registry:** pridėtas `DIAGRAMU_M7_M12_REGISTRY.md` su image key policy, pattern taksonomija, shell/layout/test coverage matrica ir M7–12 priėmimo vartais; `SCHEME_AGENT.md` nukreipia į registry kaip aktyvų inventorių.
- **M10/M12 schemų testų tvora:** `DiagramLocalization.test.tsx` papildytas M10 taxonomy, trigger flow, 3A, workflow spec, incident playbook, tool decision tree ir M12 three labs LT/EN bei dark-palette kontraktais; M10 tool tree dokumentuotas kaip spatial SVG keyboard exception.
- **M7 step-count pedagoginė diagnozė:** pridėtas `M7_STEP_COUNT_CURRICULUM_REVIEW_2026-07.md`, rekomenduojantis M7 schemų skaičius aiškinti kaip skirtingus mokymosi sluoksnius (6 pipeline, 5 mini-procesai, 4 tipai, 8 MASTER), ne suvienodinti priverstinai.
- **M10–12 LT/EN kalbos vartai:** pridėtas `audit:en-language-m10-12` ir bendras `audit:m1012` (coverage + language), su M10–12 taisyklių moduliu ir regresijos testu `m1012EnLanguageAudit.test.ts`; vartai tikrina EN LT reliktus, DI→AI terminologiją, LT `tu` formą ir matomus EN reliktus.
- **M10–12 schemų P1 sprintas:** pridėti `m10_workflow_spec` ir `m10_incident_playbook` React diagramų blokai; `m10TaxonomyLayout.ts` + `m10LearningLoopLayout.ts` geometrijos SOT; `M10LearningLoopBlock` – 4 makro žingsniai per `InteractiveDiagramShell`; `M12MultiAgentSchemaBlock` – 6 žingsnių interaktyvus kelias su HTML nav ir pointer-only SVG hit zonomis; `diagramRenderers.test.tsx` + `DiagramLocalization.test.tsx` regresija naujiems raktams.
- **M10–12 Max-ROI agentų kelio atnaujinimas:** M10 papildytas uždaro mokymosi ciklo skaidre ir React diagrama (`m10_learning_loop`), o M12 prompt-first kelias papildytas Įgūdžio paketu ir grąžos iš investicijų (ROI) mini skaičiuokle. M11 `m11-q1` pakeistas į diagnostinį situacinį klausimą apie šaltinių / įrankių taisykles.
- **M7 skaidrė 734 „Sprendimų filtrai“:** naujas branduolio (core) turinys – 5 sprendimų filtrų grupės (Tinka/Netinka, Būtina/Svarbu/Norima/Ne dabar, Greiti laimėjimai, Testuok/Investuok/Atmesk, nuorodos į SWOT/80-20/„Kodėl?“/Rizika-Nauda) su 4 CopyButton promptais. SOT: `docs/turinio_pletra_moduliai_7_8_9.md` §8.1a; seka: `docs/MODULIO_7_SKAIDRIU_EILES.md` (branduolys 27→28); žodynėlis +4 terminai (`glossary.json`, `glossary-m1-m9.json`); M9 scenarijų 6/7 kontekstas susietas su 734.
- **M10–12 ROI track:** pridėtas marketingo turinio panaudojimo brief (`docs/archive/development/analysis/M10_12_CONTENT_REUSE_BRIEF.md`), `comingSoonModules.ts` + neaktyvios M10–12 „Ruošiama“ kortelės tier-9 bundle (kai realūs M10–12 moduliai nėra įkelti), ir M11/M12 regresijos testai (`TestPracticeSlides.m11/m12.test.tsx`) agentų kelio klausimų bei praktikos vartams.
- **M10 agentų kelio checkpoint'ai:** pridėti 3 `path-step` micro-win žingsniai (agentų ciklas, rolės / handoff, agentinis promptas) ir `pathLabel` palaikymas, kad M10 rodytų „Agentų inžinerijos kelias“, o M7 default liktų nepakitęs.
- **M11 bonus mini-praktika:** po testo pridėta optional bonus skaidrė „agento pipeline per 5 min“ (koordinatorius → specialistas → vertintojas), su promptų rinkiniu ir pasiruošimu M12 prompt-first startui.
- **M12 120.5 React diagrama:** `M12MultiAgentSchemaDiagram` + `M12MultiAgentSchemaBlock` + `m12MultiAgentSchemaContent.ts`; registruota per `diagramRenderers.tsx` (`m12_multi_agent_schema`); skaidrė 120.5 LT/EN – `sections[].image`.
- **M11 9-as klausimas:** `m11-q9` apie uždaro mokymosi ciklą (10.49); intro CTA „8“→„9“ klausimai (LT/EN).
- **UX Banga 1 M7/M10/M13:** M7 gavo `intro-action-pie` 70.5, M10 – 2 `warm-up-quiz` skaidres ir `evaluator-prompt-block`, M13 – 2 `warm-up-quiz` skaidres ir `recognitionExercise`; sinchronizuoti SOT dokumentai, EN overlay, core M1–9 profilis ir footer auditai.
- **M1 interaktyvumo baseline:** Modulis 1 papildytas `path-step` 1.1 („Pirmas 6 blokų bandymas“) ir `warm-up-quiz` 16.5 („META / INPUT / OUTPUT“); LT/EN ir core profiliai sinchronizuoti, kad `audit:slide-interactivity` nebeturėtų M1 warning.

### Changed

- **M7–M12 LT/EN kalbos auditas:** M7 EN overlay papildytas trūkusia 734 skaidre „Decision filters“, sutvarkyti 66.9 ir senieji M7 EN hibridai (`Skyrius:`, `promptai`, `vedantys questions`, `su columnss` ir kt.), M8/M11 LT threshold tekstai suvienodinti į `tu` formą; `m7-m9-en-manifest.mjs`, `m79-language-rules.mjs` ir regresijos testas papildyti, kad `audit:m79` tikrintų 734, warm-up branduolio skaidres ir LT prefix regresijas.
- **M15 praktikos schema:** `m15_practice_loop` dabar rodo du režimus – greitą kelią iki vieno artefakto ir optional pilną kelią per vaizdą, video, muziką, QA; pridėta LT/EN diagramos lokalizacijos regresija.
- **Interaktyvumo audito streak skaičiavimas:** `audit:slide-interactivity` dabar skaičiuoja content-block streak pagal matomą branduolio kelią ir ignoruoja `pathBranch` šakines skaidres, kurios M7 navigacijoje nerodomos kartu.
- **Vitest pilno rinkinio stabilumas:** `vitest.config.ts` pervestas į `forks` pool su 30 s test/hook timeout ir ribotu worker skaičiumi; `App.quiz.integration.test.tsx` sutvirtintas lokaliu `userEvent.setup()` ir teigiamu `ModulesPage` grįžimo assert'u; `a11y.smoke.test.tsx` izoliuoja sunkius preload importus ir naudoja mažą tools fixture, kad pilnas `npm run test:run` nebekristų per worker RPC timeout'us.
- **Docs sync baseline:** `README`, `CODEBASE_WHAT_IS_DONE`, dokumentacijos indeksai, roadmap, marketing handoff, versijavimo analizė, M7–12 diagramų registry ir legacy techninis indeksas suderinti su 1.4.2 + Unreleased HEAD baseline (60 testų failų / 403 testai); pridėtas `DOCS_SYNC_CHECKLIST.md`.
- **M7–12 schema-consistency sprintas:** `AgentWorkflowBlock` pervestas į bendrą `InteractiveDiagramShell`, paliekant `AgentWorkflowDiagram` geometriją ir pointer-only hit zonas; `M10ToolDecisionTreeDiagram` paliktas spatial exception, bet title/rodyklės/tekstas remiasi dark-aware `useDiagramPalette()`.
- **M8 test scope deep-link:** `TestKnowledgeScopeDiagram` M8 režime, kai perduotas `onGoToModule`, rodo native HTML mygtukus į M7 remediation skaidres; M11/M14 lieka statiški scope vaizdai.
- **M7 canonical image keys:** full SOT ir EN/core data naudoja `m7_da_pipeline` ir `m7_bi_schema`; `diagramRenderers.tsx` palaiko naujus raktus ir legacy `/da_pipeline_6.svg`, `/da_bi_schema_4.svg` aliasus.
- **M10 schema backlog statusas:** `TODO.md` pažymi M7–12 schema-consistency kaip patvirtintą išimtį nuo bendro M10+ Deferred monetizacijos backlog'o, o M10-DIA-01..04 perkelti į aktyvų schema backlog'ą.
- **M10–12 LT/EN UI/UX suderinimas:** M10/M11/M12 full SOT ir `modules.json` perrašyti taip, kad LT režime matomuose heading/body/footer/praktikos laukuose neliktų nereikalingų EN reliktų (`handoff`, `test case`, `prompt-only`, `delivery-first`, `Human-in-the-loop`); EN overlay coverage išlaikytas, o M10/M12 glossary terminai papildyti LT/EN.
- **M10 progress fazės ir M12 i18n:** M10 progreso juostoje LT `Multi-agent` / `Optional` pakeista į „Keli agentai“ / „Neprivaloma“, EN lokalizacija lieka `Multi-agent` / `Optional`; M12 privalomo kelio tekstas LT paaiškina 3A praktikas.
- **Santraukų `tu` forma ir M10–12 LT copy:** `SUMMARY_SLIDE_SPEC.md` ir full SOT suvienodinti į „Ką išmokai“; M10 kontroliniai taškai, M11 rezultatų žinutės, M12 startas su promptais ir LT ecosystem copy perrašyti be vartotojui matomų EN reliktų (`Micro-win`, `checkpoint`, `prompt-only`, `delivery-first`, `audit trail`).
- **M12 practice-intro hierarchija:** M12 įvade pridėtas atskiras privalomo kelio blokas („Privalomas kelias“), kuris aiškiai atskiria 121–123 praktikas nuo 124.5 greito starto su promptais.
- **M7–M12 consistency sprintas:** `ModulesPage` sugrupuotas į bazės, Duomenų analizės, Agentų ir Turinio kelius; `unlocksAfter` dabar naudojamas užrakinime, todėl M10 gali būti pasirenkamas po M6 pagal SOT. M6 completion ekranas rodo tier-aware kelio pasirinkimą, M7/M9/M10/M12 aprašymai ir summary/practice copy suvienodinti pagal „vienas privalomas kelias + optional“ modelį.
- **M7 production trintis:** prieš vizualizacijos šaką pridėta optional `section-break` skaidrė 99.9, M7 santrauka paaiškina, kad branduolys baigtas, o vizualizacija yra papildoma šaka; M7/M9 EN overlay sinchronizuotas.
- **M10–M12 navigation and remediation:** M10 progress fazės suskaidytos į ciklą, multi-agent, promptus/saugumą, integracijas, optional ir santrauką; M11 failedMessage perrašytas žmogiškomis temomis; M12 intro aiškiau aprašo 3 pagrindines praktikas kaip privalomą užbaigimo kelią.
- **M10+ diagramų routing ir dark-mode chrome:** `agent_workflow_diagram` perkeltas iš `ContentSlides.tsx` special-case į `diagramRenderers.tsx`; M10.65 vietoje vienos tankios `m10_spec_incident` schemos – dvi sekcijos (`m10_workflow_spec`, `m10_incident_playbook`); `M10AgentTaxonomyDiagram`, `M10TriggerFlowDiagram`, `M10ThreeAStrategyDiagram`, `M12ThreeLabsDiagram`, `AgentWorkflowDiagram` – title/border/bg per `useDiagramPalette()` (semantinės tone spalvos lokaliai).
- **M12 uodegos konsolidacija (B-a):** scenarijai 125–127 sujungti į vieną neprivalomą `content-block` skaidrę 125 („Papildomai: pakartok M10“) su 3 CopyButton sekcijomis; `practice-scenario` kortelių tinklelis sumažėjo nuo 8 iki 5; intro `recommendedStart` ir santraukos 128 stats/businessExamples atnaujinti (3 scenarijai); SOT: `docs/turinio_pletra_moduliai_10_11_12.md` §8.2c, `docs/MODULIO_10_SKAIDRIU_EILES.md`.
- **M12 prompt-first intro render:** `practice-intro` dabar rodo jau paruoštą `primaryPathIntro`, `taskOneLiner`, grąžos iš investicijų (ROI) skaičiuoklę ir „Pradėk čia“ šuolį į 124.5; `path-step` checkpoint'ai palaiko CopyButton promptus (LT/EN).
- **M12 praktikos duomenys:** pašalinti nenaudojami `content.*` dublikatai iš M12 practice-scenario skaidrių 121–127 ir 124.5; renderinimas remiasi root `scenario` / `practicalTask` (scoped M12-only cleanup, ne viso katalogo dedupe).
- **M10 įrankių medis:** `M10ToolDecisionTreeDiagram` gavo atskirą klaviatūros fokusavimo kontūrą (SVG paliktas; focus ring atskirtas nuo `isSel`), o `M10PLUS_DIAGRAM_VISUAL_BACKLOG_2026-07.md` pažymėjo P0 a11y sprendimą kaip užbaigtą.
- **M10–12 user journey:** M10 intro nukreipia į 60 sek. micro-win, M10.8 santrauka sutraukta iki 3 žinių kortelių, o M12 intro dabar veda per prompt-first `124.5` startą prieš pilną 3 lab'ų delivery-first kelią.
- **M10 MUST workflow spec:** 1 puslapio workflow specifikacijos CopyButton perkeltas į pagrindinį M10 kelią, kad spec/saugumo pradmuo nebūtų tik optional 10.65 skaidrėje.
- **M10–12 EN overlay:** `modules-en-m10-m12.json` sinchronizuotas su naujais M10 checkpoint'ais, M11 bonus skaidre ir M12 prompt-first copy.

### Fixed

- **M8 scope deep-link testų stabilumas:** `TestKnowledgeScopeDiagram` slide index lookup turi `modules.json` fallback'ą, todėl isolated component testuose M8 burbulai naviguoja į M7 skaidrę net kai `modulesLoader` cache dar neužpildytas.
- **M10 legacy schemų triukšmas:** pašalinti neaktyvūs `AgentOrchestratorBlock` / `AgentOrchestratorDiagram` ir po split'o nebewired `M10SpecIncidentBlock` / `M10SpecIncidentDiagram`; barrel exportas išvalytas, o registry testas toliau saugo, kad `m10_spec_incident` negrįžtų kaip aktyvus raktas.
- **M10–12 kalbos audito aklos zonos:** `audit:en-language-m10-12` dabar tikrina `reflectionPrompt`, `template` ir matomus instruction laukus, o ne tik pagrindinius body tekstus; pridėtos taisyklės `Human-in-the-loop`, `prompt-first`, `prompt-only`, `delivery-first`, `edge case`, `error handling`, `test case(s)`.
- **M10–12 LT/EN reliktai:** sutvarkyti M10/M12 diagramų LT hibridai (`gali būti trigger`, `Handoff`, `multi-agent`), EN overlay glossary leak `DI agentas` → `AI agent`, M10 įrankių medžio LT tekstai ir M12 privalomo kelio regresijos testas.
- **M10+ schemų sprinto regresijos:** `AgentWorkflowDiagram` palette pass paliko `TEXT_DARK` referencas (runtime + testai) – pakeista į `palette.brandDark`; `m12MultiAgentSchemaContent.ts` – `M12MultiAgentSchemaLabels` su `DiagramLabelPair` tuple tipu (typecheck TS2322).
- **M10+ sprinto užbaigimas (2026-07-05):** `M10SpecIncidentBlock` / `Diagram` pažymėti `@deprecated`; automated gates (schema, lint, 48 diagram testai, EN audit, typecheck, build) – PASS; rankinė browser smoke – Release QA #6.
- **M12 footer 120.5 po B-a:** po 126/127 pašalinimo footer numeris „5“→„4“ (121 Automatize); `AUDIT_MODULES=12 node scripts/audit-footer-numbers.mjs` (+ `--locale=en`) PASS.
- **M12/M11 regresijos testai:** `TestPracticeSlides.m12.test.tsx` – scenarijų ID `[121–124.5]` + optional 125 kaip `content-block`; `TestPracticeSlides.m11.test.tsx` – 9 klausimai, 70 % slenkstis 7/9; `diagramRenderers.test.tsx` – `m12_multi_agent_schema`.
- **M10 EN section-break overlay:** `modules-en-m10-m12.json` papildytas trūkstamomis skaidrėmis `10.481` ir `10.151`; `npm run audit:en-coverage-m10-12` vėl PASS.

### Added – MON P0 hardening (2026-07-05)

- **Gate smoke išplėtimas (MON-5/MON-3/MON-4 auto dalis):** `gate.smoke.test.tsx` +5 testai – tier 6 matrica (M6 open / M7 locked), tier 9 „Ruošiama“ kortelės be interaktyvių elementų, tier 3 be coming-soon sekcijos, EN locale gate, `pricing_click` su `cta_id: access_gate_pricing`. Testas simuliuoja production M1–9 bundle (getModulesSync filtras).
- **`npm run audit:release-preflight`:** viena komanda prieš deploy – `validate:schema` + `lint` + `audit:m49` + `audit:m7-pathbranch` + `test:run`; aprašyta `RELEASE_QA_CHECKLIST.md`.
- **MON-5 rankinis gate check:** naujas skyrius `RELEASE_QA_RUN.md` (tier 0/6/9 production smoke, refresh, klaidingas token); `TODO.md` MON-5 auto dalis pažymėta.

### Gate (Plan A – M7/M10 ROI + MON P0 hardening)

- Phase 1 gates: `npm run validate:schema`, `npm run lint`, `npm run audit:m49`, `npm run audit:en-coverage-m10-12`, `npm run audit:m7-pathbranch` – žali (2026-07-05).
- Phase 2 gates: `npx vitest run src/components/__tests__/gate.smoke.test.tsx` (10 testų), `npm run lint`, `npm run test:run` (59 failai, 378 testai) – žali (2026-07-05).
- Naujas preflight: `npm run audit:release-preflight` dokumentuotas kaip prieš-deploy komanda (`validate:schema` + `lint` + `audit:m49` + `audit:m7-pathbranch` + `test:run`).
- M10–12 B-a + diagrama + M11 q9 gates: `validate:schema`, `AUDIT_MODULES=12 audit-footer-numbers` (LT+EN), `audit:en-coverage-m10-12`, `lint`, pilnas `test:run` (378) – žali (2026-07-05).

---

## [1.4.2] – 2026-07-01

M1–9 DiagramKit, design system revision, M7–9 EN editorial sweep, app startup stabilumas. **Prioritetas:** M1–9; M10+ vizualinis polish – atidėtas.

### Gate

- `npm run validate:schema`, `npm run lint`, `npm run test:run` (367 testų), `npm run build:production` – žali.
- Rankinis diagramų browser smoke: `pending manual` (RELEASE_QA §5d, TODO QA #6).

### Changed – Design system revision

- **A11y/sticky remontas:** sticky elementai po AppNav pervesti į `--app-nav-height` offsetą, o slide dots, diagramų step nav, testų pasirinkimai ir modal close keliai suvienodinti pagal 44px / `focus-visible` standartą.
- **Token ownership:** `src/design-tokens.ts` papildytas touch target, focus ring, sticky ir z-index helperiais; `ContentSlides` blockVariant klasės pradėtos kelti į bendrą `blockVariantClasses` helperį.
- **UI primityvų pilotas:** `PracticalTask` pradėjo naudoti `CTAButton` su aiškesne primary / secondary / tertiary veiksmų hierarchija; `Banner` nebeturi LT hardcoded `aria-label`, o `Table` default stilius pagerintas pagal lentelių skaitomumo standartą.
- **Leftovers sprintas:** `AccessGateScreen` ir `CertificateScreen` pradėjo naudoti `Card` / `CTAButton` pilotus, o sertifikato HTML preview atsisakė dalies inline style tokenų.
- **Diagram kit pilotas:** `RlProcessBlock` pervestas į `InteractiveDiagramShell`, `RlProcessDiagram` SVG paspaudžiamos zonos tapo pointer-only per `DiagramStepHitArea`, o dark SVG fonas tikrinamas testu.
- **SVG keyboard migracija:** `DiPrezentacijosWorkflowDiagram`, `TurinioWorkflowDiagram`, `AgentWorkflowDiagram` ir `CustomGptProcessDiagram` hit zonos perkeltos į pointer-only `DiagramStepHitArea`; HTML `nav button` liko vienintelis klaviatūros kelias ir papildytas testų guard'ais.
- **Premium diagramų polish:** M7 analizės tipų schema gavo roles-hub skaitomumo tokenus, didesnę tipografiją, dark-aware tonus ir aiškesnį active ring/glow; `DiagramKit` status badge, step nav ir explanation panel sustiprinti kaip nuoseklus product chrome, o interaktyvių diagramų slide shell nebenaudoja dominuojančios kairės linijos.
- **Auditai ir QA:** `audit-design-tokens` papildytas Tailwind arbitrary class radiniais; pridėti 2026-07 design-token baseline ir release QA vartai sticky, focus, diagramų dark mode ir SVG keyboard trap patikrai; `ContentSlides` targeted cleanup ir primitive pilotai sumažino arbitrary class radinius `80 → 66`, inline style `13 → 12`, total `539 → 521`.
- **Backlog'ai:** `LlmArch` patvirtintas kaip atskiras B3 DOM-matavimo trackas, o M10+ diagramoms pridėtas premium SaaS vizualinės kokybės backlog.

### Fixed – App starto stabilumas

- **Pirmo vaizdo mirgėjimas:** stabilizuotas app startas – rezervuojama scrollbar vieta (`scrollbar-gutter: stable`), dark mode klasė pritaikoma prieš React užsikrovimą, o Google Fonts perkeltas iš CSS `@import` į `index.html` su `display=optional`, kad sumažėtų teksto reflow ir vaizdo poslinkis į kairę.
- **Starto fallback:** app lygio `Suspense` spinneris gauna aukštesnį pradinį konteinerį (`min-h-[60vh]`), todėl perėjimas iš loading būsenos į pagrindinį puslapį nebeatrodo kaip staigus vertikalus šuolis.
- **Regresijos apsauga:** pridėti `themeInit` ir startup guard testai, saugantys ankstyvą `.dark` pritaikymą, scrollbar stabilizaciją ir fontų krovimo kontraktą.

### Changed – M1–M9 schemų suvienodinimas

- **DiagramKit MVP:** pridėtas bendras interaktyvių schemų karkasas (`status badge`, žingsnių navigacija, paaiškinimo kortelė) ir bendri diagramų tokenai.
- **M7–M9 A grupė:** M7 analizės tipai, duomenų paruošimas, trys agentai, duomenų istorijos ciklas ir M9 workflow naudoja nuoseklesnį wrapperį; roles/hub schemos gavo semantinius tonus, o duomenų istorijos schema – aiškų ciklo grįžtamąjį ryšį.
- **M7 statiniai SVG:** `/da_pipeline_6.svg` ir `/da_bi_schema_4.svg` per registry renderina interaktyvius React pakaitalus (`M7DaPipelineBlock`, `M7BiSchemaBlock`) su LT/EN paaiškinimais ir žingsnių navigacija.
- **B1 token sprint:** `RlProcessDiagram`, `LlmAutoregressiveDiagram` ir context engineering pipeline config naudoja bendrus `diagramTokens` brand/bg/border/text/flow/radius/opacity reikšmėms, nekeičiant layout ar interaktyvumo; lint, typecheck, targeted diagram testai ir `git diff --check` praėjo.
- **B2 schemų sistema:** `StrukturuotasProcesasBlock` naudoja `InteractiveDiagramShell`, `WorkflowComparison` shared chrome tokenizuotas, M10/M12/M13/M15 diagramos perkeltos į registry, o `/da_schema_entity_example.svg` gauna bendrą statinės iliustracijos rėmą.
- **B2.5 visual guard:** pridėtas `diagramRenderers` registry test guard known keys, unknown fallback, body placement ir static illustration frame kontraktams; rankinis naršyklinis smoke pažymėtas `pending manual` audite.
- **B2.6 M7–M9 geometry & semantics:** M7/M9 vertikalios 5/6/8 žingsnių schemos naudoja bendrą `verticalFlowGeometry` helperį, `M7DataStoryCycleDiagram` gavo aiškesnį desktop feedback ciklą, o M7 roles-hub schemos suvienodintos per `diagramTokens` font/marker kontraktus; M10 kokybės remontas sąmoningai atidėtas atskiram trackui.
- **M7–M9 UI/UX polish:** M7/M9 interaktyvios diagramos naudoja bendrą pointer-only `DiagramStepHitArea`, klaviatūros navigaciją palieka `DiagramStepNav`, gauna dark-mode SVG paletę per `useDiagramPalette`, o registry ir M7 `pathBranch` invariantai papildyti automatiniais guard'ais.
- **LlmArch B3 planas:** pridėtas atskiras `docs/development/LLMARCH_B3_REFAKTORIAUS_RIZIKOS_PLANAS.md`, nes schema remiasi DOM matavimu (`ResizeObserver`, `getBoundingClientRect`) ir turi būti refaktoruojama izoliuotai.
- **Routing:** M1–M9 diagramų registry sluoksnis aptarnauja aktyvius M1–M9 raktus; dubliuotos `ContentSlides.tsx` fallback šakos tiems raktams pašalintos.
- **Auditas:** pridėtas `docs/development/DIAGRAMU_M1_M9_AUDITAS.md` su inventoriaus matrica, patternų taksonomija, statinių SVG sprendimo kriterijais ir QA vartais.

### Fixed – M7–9 EN/LT editorial sweep

- **M7–9 EN overlay:** `modules-en-m7-m9.json` pilnai peržiūrėtas pagal hardened auditą – pašalinti hybrid LT/EN likučiai (`duomenis`, `generavimas`, `pakeisk`, `Tinka`, `Nori suprasti detaliau?`, `rgoia`, `segmenthat` ir pan.) M7 branduolyje, šakose ir M9 intro.
- **Audit rules:** `scripts/lib/m79-language-rules.mjs` papildytas `en_lt_token`, `en_broken_phrase`, `en_lt_heading` patikromis ir `unlockedGlossaryTerms` skip'u; `m79EnLanguageAudit.test.ts` prisega rizikingas M7/M9 skaidres ir nulinius LT tokenų / broken phrase / LT heading skaitiklius.
- **Source map sync:** `scripts/m7-m9-en-string-map.json` ir `scripts/m79-part2-manual.json` sutvarkyti, kad rebuild'ai negrąžintų žinomų M7–9 EN šiukšlių.
- **LT Tu forma:** `modules.json` M7 haliucinacijų savitikros paaiškinimas ir M9 scenarijų 103/105/109 placeholderiai perrašyti į Tu formą; `npm run generate:core-data` pergeneravo core profilius.

### Changed – Dokumentacijos sinchronizacija (post-audit 2026-06-30)

- **M7–9 production:** `DOCUMENTATION_INDEX.md` §3 – pašalinta „ateities turinys“ klaida; pridėtas tier 9 / `build:production` kontekstas.
- **Trūkstamas SOT stub:** `docs/development/DUOMENU_ANALIZES_GERIAUSIOS_PRAKTIKOS.md` – nuorodų stubas → `turinio_pletra_moduliai_7_8_9.md`.
- **Lean branduolys:** `LEAN_INDEX.md` – M7–9, m1-m9 profiliai, handout PDF, 2026-06-30.
- **Kas įgyvendinta:** `CODEBASE_WHAT_IS_DONE.md` – 1.4.1, M1/M79 handout, 53/323 testai, navigacija ✅.
- **Release QA:** `RELEASE_QA_CHECKLIST.md` §5d – M1 PDF rankinė + test guard; §5b – SCHEME_AGENT (be LLM_DIAGRAMOS nuorodos).
- **Versija:** `VERSION_ANALIZE.md` → 1.4.1.
- **Deploy:** `DEPLOYMENT.md` – base path politika (`/anatomy/` vs `/inzinerija/`); `.env.example` – production vs demo komentarai.
- **Registry:** `sot_index.json` – `productionRuntimeProfile` (\*-m1-m9.json).

### Changed – Leader repo best practices pilot

- **Ecosystem UTM:** pridėtas `buildEcosystemUrl()` ir pritaikytas bare ekosistemos nuorodoms (Gate, quiz fail, M5 test results, ModuleComplete) – `utm_source=training`, `utm_medium=spinoff`, `utm_campaign=m{module}_{touchpoint}`.
- **PDF atsisiuntimo klaidos:** M1/M5/M6/M7–9 atmintinių mygtukai dabar turi `try/catch`, `logError` kontekstą ir LT/EN inline žinutę „Nepavyko sukurti PDF. Bandyk dar kartą.“.
- **M1 output-shape pilot:** skaidrėje „Gero Prompto Šablonas“ pridėta `LAUKIAMO ATSAKO FORMA` / `EXPECTED OUTPUT SHAPE` eilutė kopijuojamam šablonui ir pilnam pavyzdžiui.
- **SOT sinchronizacija:** `turinio_pletra.md`, `modules-en.json`; po M1 keitimo – `generate:core-data`.
- **Testai:** `QuizPage.test.tsx` href su UTM; `ModuleCompleteScreen.test.tsx` – PDF reject + `logError`; `ecosystemUrls.test.ts` – `buildEcosystemUrl`.
- **Scope:** JSON `spinoffCta` (M4 section-break info/space/map) – ne MUST batch; likęs SHOULD darbas.

### Added – PDF atmintinių serija

- **M1 first-win PDF:** pridėta Modulio 1 value-only atmintinė su 6 blokų šablonu, checklist ir starter promptu; mygtukas rodomas Modulio 1 užbaigimo ekrane be outbound CTA.
- **Bendras maketo kit:** M1/M5/M6/M7–9 atmintinės naudoja bendrą `handoutPdfKit` header, footer, tipografijos, sekcijų ir `textWithLink` helperių sluoksnį.
- **UI nuoseklumas:** M1/M5/M6/M7–9 atmintinių mygtukai naudoja bendrą `HandoutDownloadButton` komponentą su vienodu Download icon, `aria-label` ir focus stiliumi.
- **Testai ir QA:** pridėti M1 turinio pariteto ir PDF smoke testai, atnaujinti M5/M6/M7–9 PDF testai po bendro maketo refaktoringo; patikros praėjo per tikslinius testus, lint, typecheck ir schema validation.

### Added – M7–9 DA kelio PDF atmintinė

- **M9 handout PDF:** pridėta Duomenų analizės kelio (M7–9) 2 puslapių atmintinė: pipeline, MASTER PROMPTAS, M9 8 žingsnių workflow, 48 val. refleksija ir ekosistemos grįžimo CTA (`utm_medium=handout`).
- **UI touchpoints:** mygtukas „Parsisiųsti DA kelio atmintinę (PDF)“ rodomas M9 santraukos skaidrėje (92) ir Modulio 9 užbaigimo ekrane; atmintinė nepriklauso nuo tier 3 sertifikato slenksčio.
- **Testai ir dokumentacija:** pridėtas `m79HandoutPdf` unit testas, M9 completion komponento testas, M79 LT/EN turinio pariteto drift guard (`m79HandoutContent.test.ts`), atnaujinti PDF testavimo, ecosystem ir release QA dokumentai.

---

## [1.4.1] – 2026-06-30

Post-1.4.0 patch: Production M1–9 LT/EN audit gates (`audit:m49`), Tu-form harmonization, shared diagram locale, M7–9 data sync.

### Changed – M7 stubų ir viz šakos užpildymas

- **`modules.json` / `modules-en-m7-m9.json` (M7):** skaidrės 76, 78 ir 98 išplėstos iš plonų/stub blokų į pilnas mokymo skaidres su CopyButton promptais; 98 nebėra roadmap tekstas.
- **M7 viz šaka 100–106:** pilnai užpildytas DA_4 turinys (data storytelling, 10/20/80, Geštalto principai, dashboard'ai, super promptas, alternatyvos); 100 prijungta nauja interaktyvi `m7_data_story_cycle` schema.
- **Dokumentacija:** suderinti `docs/turinio_pletra_moduliai_7_8_9.md` ir `docs/MODULIO_7_SKAIDRIU_EILES.md`; pridėtas lokalizacijos testas naujai M7 diagramai.

### Added – M4–6 EN kalbos audit tooling + M1–9 taisyklių apjungimas

- **`npm run audit:m46`:** `audit:en-coverage-m4-m6` (skaidrių ID paritetas + LT diakritikų liekanos po merge) + `audit:en-language-m4-m6` (hybrid tokenai, LT žodžiai, DI→AI, LT „tu“ forma). Nauji skriptai [`scripts/audit-en-coverage-m4-m6.mjs`](scripts/audit-en-coverage-m4-m6.mjs), [`scripts/audit-en-language-m4-m6.mjs`](scripts/audit-en-language-m4-m6.mjs).
- **`npm run audit:m49`:** `audit:m46` + `audit:m79` – bendras Production M1–9 EN/LT kalbos vartas.
- **`scripts/lib/m79-language-rules.mjs`:** `auditLtString` nebeapribota M7–9 (apima M1–9, modulių apimtį valdo `auditLtModules`); pridėti LT-žodžių šablonai (`Rezultatas`, `Kada naudoti`, `Metodinis/Agentinis promptas`); leidžiamas LT „DI (AI)“ gloss; praleidžiami išorinių šaltinių pavadinimai (`sources[N].title`).
- **Ataskaita:** [`docs/archive/development/analysis/AUDIT_M1-M9_LT_EN_2026-06.md`](docs/archive/development/analysis/AUDIT_M1-M9_LT_EN_2026-06.md).
- **Docs:** `AGENTS.md`, `RELEASE_QA_CHECKLIST.md` §5c – `audit:m46` / `audit:m49`.

### Fixed – M1/M4–6 LT/EN kalba (audit follow-up)

- **`modules-en-m4-m6.json` (M4):** EN locale rodė LT likučius (deep-merge spragos) – slide 43 `Promptas`→`Prompt`; slide 54 lentelė (`Metodinis/Agentinis promptas`, `Įrankiai`, `Rezultatas`, `Kada naudoti`)→EN; slide 61 – pridėta trūkusi 4-a EN sekcija („Where else to apply this?“).
- **`modules.json` (M4 slide 60):** „NoteLM – **AI** užrašų“ → „**DI** užrašų“ (LT terminologija).
- **`modules.json` (M1 slide 12):** `motivation` Jūs-imperatyvai (`Panaudokite/sukurkite`) → Tu (`Panaudok/sukurk`), suderinta su broliais laukais.
- **`src/locales/lt.json`:** `m5IntroBodyDefault` mišrus Jūs/Tu → Tu (`Tu ką tik atlikai … sukūrei`).
- **Core profiliai:** `npm run generate:core-data` (`modules-m1-m6.json`, `modules-m1-m9.json`).

### Fixed – Modulis 3: Tu forma ir scenarijų šablonai

- **`modules.json` (M3):** visų 6 scenarijų žingsnių antraštės ir aprašymai – **Tu** forma (`Pradėk`, `Surink`, `Apibrėžk`, ne `Pradėkite`); modulio `description` – `sukurk` (ne `sukurkite`).
- **Scenarijai 32–33:** pataisyti `template`, `hint` ir `partialSolution` – pardavimų Q3 analizė (ne marketingo Q1) ir SmartFlow kampanija (ne HR apklausa); duomenys atitinka `scenario.data`.
- **`turinio_pletra.md` (M3):** situacijos ir struktūros punktai sinchronizuoti su Tu forma.
- **`sixBlockStructure.ts`:** trūkstamo META bloko pavyzdys – `Tavo rolė` (ne `Jūsų rolė`).
- **`lt.json`:** navigacija – `Atlik praktinę užduotį…`, `Naudok ← → klavišus`, `Pabaik mini testą…`.
- **Core profiliai:** `npm run generate:core-data` – `modules-m1-m6.json`, `modules-m1-m9.json`.

### Fixed – M7–9 žodynėlis, įrankiai ir LT/EN kalba

- **`glossary.json`:** pašalintas klaidingas `Master promptas` → `unlockedBy` M7:71.2 (M4 terminas lieka tik Modulyje 4).
- **`modules.json` / `modules-en-m7-m9.json`:** path-step 71.2 – `unlockedGlossaryTerms` tik `Deep research`; M7:75, M8 testas, M9:9226 – „Master prompt“ → **MASTER PROMPTAS**; M7:74 – vienas sakinys, kad tai ne M4 Master promptas.
- **`modules.json` (M7 LT):** pirmo karto gloss – pipeline, dashboard, data storytelling, workflow (skaidrės 71, 73, 891).
- **`tools.json` / `tools-en-m1-m9.json`:** 4 M7 įrankiai (Julius AI, Echobase, DataLab, Power BI); ChatGPT ir kt. lieka Modulyje 1 – pilnas sąrašas vis tiek skaidrėje 70.
- **`modules.json` / `modules-en-m7-m9.json` (M7–9):** LT „tu“ forma; M9 EN overlay daliniai pataisymai.

### Fixed – schemų LT/EN lokalizacija

- **Problema:** EN režime 3 aktyvios diagramos rodė hardcoded LT tekstą (blokų pavadinimai, aria, antraštės), nors blokų apvalkalas jau buvo lokalizuotas.
- **M10.2** [`AgentWorkflowDiagram`](src/components/slides/shared/AgentWorkflowDiagram.tsx) + [`AgentWorkflowBlock`](src/components/slides/shared/AgentWorkflowBlock.tsx): naujas [`agentWorkflowContent.ts`](src/components/slides/shared/agentWorkflowContent.ts) (`getAgentWorkflowLabels`, `getAgentWorkflowStepExplanations`); `locale` prop + `useLocale()`.
- **M4 s43** [`StrukturuotasProcesasDiagram`](src/components/slides/shared/StrukturuotasProcesasDiagram.tsx): `getStrukturuotasProcesasDiagramLabels()` [`strukturuotasProcesasStepExplanations.ts`](src/components/slides/shared/strukturuotasProcesasStepExplanations.ts) – diagramos blokai (title + items) LT/EN.
- **M13 s13.11** [`TurinioWorkflowDiagram`](src/components/slides/shared/TurinioWorkflowDiagram.tsx): `getTurinioWorkflowDiagramLabels()` [`stepExplanations.ts`](src/components/slides/shared/stepExplanations.ts) – 7 žingsnių label/desc, title, hint, aria LT/EN.
- **M7** [`M7DataStoryCycleDiagram`](src/components/slides/shared/M7DataStoryCycleDiagram.tsx) – nauja lokalizuota schema.
- **Testai:** [`DiagramLocalization.test.tsx`](src/components/slides/shared/__tests__/DiagramLocalization.test.tsx) – 11 testų (LT/EN render, interaktyvumo badge).

### Gate

- `npm run validate:schema`, `npm run audit:m49`, `npm run lint`, `npm run test:run` (298 testų), `npm run build:production` – žali prieš release.

---

## [1.4.0] – 2026-06-30

Corporate path (M7–9), access tier 9, production build M1–9, M10–12 authoring catalog, ecosystem M7–12, conversion funnel (CONV-1–5), M7 adaptive paths (Lygis B).

### Added (2026-06-30) – Tier 9 vienas production build + marketing memo

- **Magic link Phase 2:** `api/verify-access.ts` ir `App.tsx` – tier `9`; `MAGIC_LINK_TIERS` / `isMagicLinkTier()` – [`src/constants/pricing.ts`](src/constants/pricing.ts); `UPGRADE_FROM_TIER_6_EUR = 49`.
- **Production build:** `npm run build:production` (`VITE_MAX_BUILD_MODULE=9`); CI step [`.github/workflows/test.yml`](.github/workflows/test.yml); `build:corporate` → alias.
- **CONV-5 M6 upsell:** `ModuleCompleteScreen` – Duomenų analizės kelias (M7–9) kai `maxAccessible < 9`; `pricing_click` `cta_id: m6_upsell_tier9`; LT/EN locales.
- **Testai:** `magicLinkTier.test.ts`; `gate.smoke.test.tsx` tier 9 (M7 open, M10 locked).
- **Docs:** [`05_marketingo_memo_tier9_vienas_build.md`](05_marketingo_memo_tier9_vienas_build.md); [`MARKETING_HANDOFF_CHECKLIST.md`](docs/deployment/MARKETING_HANDOFF_CHECKLIST.md) §3/§7a; [`INTEGRATION_OVERVIEW.md`](docs/deployment/INTEGRATION_OVERVIEW.md), [`DEPLOYMENT.md`](docs/deployment/DEPLOYMENT.md).

### Added (2026-06-30) – Blog / ecosystem integracija M7–12 (training repo)

- **Ekosistema M7–12:** `docs/ECOSYSTEM_MAP.md` § Moduliai 7–12; curriculum registry `docs/development/BLOG_CURRICULUM_LINKS.yaml`; `sot_index.json` scope M1–M12.
- **JSON:** M7 `66.9` spinoffCta → blog `grounding-ai-outputs`; M4 `65.8` deep link → `rag-in-production`; M10 section-break skaidrės `10.481`, `10.151` su blog spinoff.
- **Kodas:** `blogArticleUrl()`, `BLOG_ARTICLE_SLUGS`, `EcosystemDeepenBlock`, `moduleEcosystemComplete.ts`; M8/M11 test-fail deepen; ModuleComplete M9/M10/M12; EN overlay `modules-en-m7-m9.json` + loader merge.
- **Analytics:** `ANALYTICS_EVENT_TAXONOMY.md` §4a papildyta M7–12 touchpointais.

### Added (2026-06-29) – M7 adaptyvūs keliai: branduolys + teminės šakos + rerun (Lygis B)

- **Adaptyvi navigacija:** Modulis 7 dabar turi **vieną branduolį visiems** (27 skaidrės) + **4 temines šakas** (`viz`, `etika-plus`, `technika`, `strategija`; 24 skaidrės), filtruojamas pagal skaidrėje 70 pasirinktą fokusą. Skirtingi fokusai mato skirtingas skaidres → padidina mokymų _rerun_ vertę.
- **Tipai/schema:** `Slide.pathBranch?: string[]` ir `JourneyChoice.branchIds?: string[]` ([`src/types/modules.ts`](src/types/modules.ts), [`scripts/schemas/modules.schema.json`](scripts/schemas/modules.schema.json)).
- **Navigacijos filtras:** [`useSlideNavigation.ts`](src/utils/useSlideNavigation.ts) – `isSlideHiddenForNav`, `getAdjacentVisibleIndex`, `resolveVisibleIndex`, `countVisibleSlides`, `getVisiblePosition`. Filtruojama **navigacijos sluoksnyje** (pilnas `slides` masyvas nekeičiamas → M8 remediation deep-link'ai stabilūs). Progreso skaitiklis „X / N" rodo **matomas** skaidres.
- **ModuleView:** `activeBranchIds` apskaičiuojamas iš `moduleJourneyFocus[7]`; visi skaitikliai ir progreso juosta naudoja `visiblePosition` / `visibleSlideCount`.
- **Rerun:** santraukoje (75) CTA „Grįžk su kitu fokusu" → skaidrė 70; `ActionIntroJourneySlide` leidžia perrinkti fokusą net po užduoties (pasirinkus kitą kortelę vėl rodomas patvirtinimo CTA). i18n: `module.rerunWithNewFocus`, `module.rerunHint` (LT/EN).
- **Duomenys:** [`modules.json`](src/data/modules.json) – `pathBranch` 24 šakų skaidrėms, `branchIds` 6 fokuso pasirinkimams; `modules-m1-m9.json` regeneruotas (`npm run generate:core-data`). M8 remediation auditas: nei vienas `relatedSlideId` (73, 74, 86, 92, 731, 732, 733, 891) neturi `pathBranch`.
- **Testai:** [`useSlideNavigation.branches.test.ts`](src/utils/__tests__/useSlideNavigation.branches.test.ts) – matomumas, gretima skaidrė, resolve, skaičiavimas.
- **Docs:** [`MODULIO_7_SKAIDRIU_EILES.md`](docs/MODULIO_7_SKAIDRIU_EILES.md) §Branduolys + teminės šakos; [`AGENTS.md`](AGENTS.md) §Architecture A.

### Added (2026-06-29) – Agent spine: ekosistemos M1–M6 žinios

- **Spine:** [`AGENTS.md`](AGENTS.md) §Ecosystem integration; trigeriai CONTENT/DATA/CODING/QA/CODE_REVIEW/USER_JOURNEY; [`sot_index.json`](docs/development/context-engineering/sot_index.json) → `ecosystem`.
- **Orchestrator:** doc-loading triggers + Special case Ecosystem/spin-off; [`orchestrator/lessons.md`](.cursor/skills/orchestrator/lessons.md).
- **Skills + lessons:** ecosystem bullet'ai ir sesijų pamokos (`data`, `coding`, `content`, `qa`, `code-review`, `user-journey` agents).
- **QA/DATA/Analytics:** [`RELEASE_QA_CHECKLIST.md`](docs/development/RELEASE_QA_CHECKLIST.md) §5f outbound smoke; [`ANALYTICS_EVENT_TAXONOMY.md`](docs/development/ANALYTICS_EVENT_TAXONOMY.md) §4a `spinoff_*` cta_id lentelė.

### Changed (2026-06-29) – Agentų docs sinchronas (M1–9 profilis, M10–12)

- **DATA_AGENT:** `docs/development/DATA_AGENT_DUOMENYS_ATNAUJINIMAS.md` – du build profiliai (`*-m1-m6`, `*-m1-m9`), EN partial overlay `modules-en-m10-m12.json`, trigeriai M10+, dažnos klaidos §.
- **CONTENT/CURRICULUM:** M10–12 SOT keliai, M10 turinio gairės, curriculum precedentas (10.45/10.48 seka).
- **Orkestratorius:** `AGENT_ORCHESTRATOR.md`, `.cursorrules`, `DOCUMENTATION_QUICK_REF.md` – Architecture A atnaujinta.
- **Registras:** `sot_index.json` M10–12 descriptions; `CODEBASE_WHAT_IS_DONE.md`, `GOLD_LEGACY_STANDARD.md` §9 EN merge; `RELEASE_QA_CHECKLIST.md` EN M10–12 punktas.

### Added (2026-06-29) – Ekosistemos integracija M1–M6

- **SOT:** `docs/ECOSYSTEM_MAP.md`, `src/constants/ecosystemUrls.ts` – modulis ↔ fazė ↔ URL ↔ analytics.
- **M4 section-break spin-off:** 52.5 → `promptanatomy.space`; 65.8 → blog; 66.95 → site map; 40.5 label patikslintas (Use).
- **UI:** ModuleCompleteScreen ekosistemos secondary links (M1/M3/M6); AccessGate → cloud; footer → Ekosistema; M5 TestResults → CEO (Manage); QuizPage → Deepen kai &lt;70 %.
- **Analytics:** `trackSpinoffClick`, section-break `spinoffCta` onClick.

### Added (2026-06-29) – Agent docs sync (M10–12 pamokos)

- **Lessons:** `scheme-agent`, `qa-agent` (tuščia→užpildyta); papildyta `data-agent`, `orchestrator`, `coding-agent`, `content-agent`.
- **Spine:** [`AGENTS.md`](AGENTS.md) — deep-merge EN M10–12, validation scripts, `data-validate` subagent, LT DI / EN AI.
- **Skills:** M10 diagram pipeline (`scheme-agent`), M10–12 release gate (`qa-agent`), EN handoff (`content-agent`), mixed task eiga (`orchestrator`).
- **Specs:** [`SCHEME_AGENT.md`](docs/development/SCHEME_AGENT.md) §2.2 checklist; M12 120.5 legacy; [`sot_index.json`](docs/development/context-engineering/sot_index.json) `modulesEnM1012`; [`CONTENT_AGENT.md`](docs/development/CONTENT_AGENT.md) §3.1.2 EN M10+.

### Added (2026-06-29) – M10–12 NEXT: taksonomija, EN, footer QA

- **M10 10.45:** `M10AgentTaxonomyDiagram` + `M10AgentTaxonomyBlock` – L0–L3 ladder + multi-agent rolės; `section.image: m10_agent_taxonomy`; etiketės `m10DiagramContent.ts` (LT/EN).
- **EN M10–12:** Pilnas `modules-en-m10-m12.json` (30 skaidrių body, M11 testas, glossary 10.7, footers); `scripts/build-en-m10-m12.mjs`, `extract-modules-m10-m12.mjs`, `audit-en-coverage-m10-12.mjs`; `validateModulesEnM1012()` schema gate.
- **Footer QA M10:** `AUDIT_MODULES=10` PASS (10.45→6, 10.48→7); EN footers merge audit `--locale=en`; ilgis ≤55 simb.

### Added (2026-06-29) – M10–12 verslo multi-agent turinys

- **M10:** Naujos skaidrės **10.45** (DI agentų tipai ir rolės – L0–L3 taksonomija) ir **10.48** (5 workflow šablonai verslui); skaidrių eilė perrikiuota (workflow sąvokos 10.15 – po agentų mąstymo); žodynėlis +4 terminai; santrauka su use case katalogu (4 sritys); 10.65 – 3 DI agento QC testai.
- **M11:** q3/q5/q6 pakeisti į taksonomijos ir multi-agent klausimus; remediation naudoja slide ID (10.45, 10.48).
- **M12:** **120.5** perrašyta į verslo multi-agent schemą (privaloma); naujas scenarijus **124.5** (Koordinatorius + 2 specialistai); Lab #2 vertintojo promptas; Lab #3 rolės etiketės; „AI moduliu“ → „DI moduliu“ LT tekste.
- **SOT:** `docs/turinio_pletra_moduliai_10_11_12.md`, `docs/MODULIO_10_SKAIDRIU_EILES.md` – auditorija platinta į verslo specialistus.
- **EN:** `src/data/modules-en-m10-m12.json` + `modulesLoader.ts` merge (M10–12 EN override).
- **UX:** `TestRemediationChips` – M11 chip'ai 10.45, 10.48.
- **Script:** `scripts/sync-m10-12-multi-agent.mjs` (JSON sinchronizacija iš plano).

### Added (2026-06-29) – DS v0.3: modulių takų stilistika (M7-15)

- **Modulio identitetas per taką (M7-15):** trims specializacijos takams suteiktas savitas `accent`: Duomenų analizė (M7-9) = `sky`, Agentai (M10-12) = `fuchsia`, Turinys (M13-15) = `rose`. Spalva žymi taką; lygis (learn/test/practice) toliau skiriasi kūno gradientu, badge ir kortelės ikona. M1-6 spektras nekeičiamas. Laukai pridėti `src/data/modules.json` (SOT), profiliai pergeneruoti (`npm run generate:core-data`).
- **`identityIcon` M7-15:** intro/section-break eyebrow ikonos (`BarChart3`, `Cpu`, `Image`, `ClipboardCheck`, `Rocket`).
- **Tipų/token'ų plėtra:** `ModuleAccent` += `sky|fuchsia|rose`; `ModuleIcon` ir `ModuleIdentityIcon` += `BarChart3|Cpu|Image`; `EyebrowAccent` += `sky|fuchsia|rose`. Papildyti `accentTopBarClasses`, `sectionBreakBadgeByAccent`, `IDENTITY_ICON_MAP`, `Eyebrow`/`SectionDivider` klasių žemėlapiai, `tailwind.config.js` safelist, `scripts/schemas/modules.schema.json` enum.

### Fixed (2026-06-29)

- **M10/M13 tuščios kortelių ikonos:** `ModulesPage.tsx` 6-ių hardcoded `if` ikonų grandinė pakeista dinamišku `MODULE_ICON_MAP` žemėlapiu (`src/utils/moduleIdentity.ts`). M10 (`Cpu`) ir M13 (`Image`) ikonos dabar renderinamos.
- **Typecheck: pasenęs `McqQuestion` confidence testas:** `src/components/slides/shared/questions/__tests__/McqQuestion.confidence.test.tsx` `renderMcq` parametras suderintas su dabartiniu `ConfidenceLevel` string union (`'sure'|'guess'|'unsure'`) vietoj senos skaitinės skalės `1|2|3`. Pašalina pre-existing `tsc --noEmit` TS2322 klaidą; produkcinis kodas nepaliestas.

### Added (2026-06-29) – Konversijos track (CONV-1..4) + MON-6 paywall riba

- **CONV-4 `pricing_click` event:** naujas analytics event (`src/utils/analytics.ts` `AnalyticsEventName`), dokumentuotas `docs/development/ANALYTICS_EVENT_TAXONOMY.md` §1. Triggerina M3 upsell ir `AccessGateScreen` kainodaros CTA (`cta_id`: `m3_upsell_pricing`, `access_gate_pricing`; `destination: external`).
- **CONV-1 M3 completion upsell:** `ModuleCompleteScreen.tsx` – po Modulio 3, kai `getMaxAccessibleModuleId() < 6`, rodomas upsell blokas su CTA į kainodarą (`https://www.promptanatomy.app/#pricing`). Nauji `module` namespace raktai (`upsellM3Title`, `upsellM3Body`, `upsellM3Cta`, `upsellM3Aria`) LT + EN.
- **CONV-2 quiz gate:** `App.tsx` quiz route renderina `AccessGateScreen`, kai `maxAccessible === 0` (suvienodina su `ModulesPage` tier-0 gate); neapmokėtas vartotojas nebepasiekia testo.
- **CONV-3 gate smoke test:** `src/components/__tests__/gate.smoke.test.tsx` – tier 0 → `AccessGateScreen` (modulių sąrašas užrakintas), tier 3 → sąrašas matomas + `getModule(4) === null`. Playwright neįdiegtas, todėl vitest variantas.
- **MON-6 client-side paywall riba:** `docs/development/AUDIT_2026-06_SUMMARY.md` – naujas skyrius „Client-side paywall riba (MON-6 — priimta MVP rizika)“ (localStorage tier + JSON bundle bypass, mažinimo priemonės, peržiūros kriterijus).
- **TODO sinchronas:** `TODO.md` §1.1 MON-6 ir §1.3 CONV-1..4 pažymėti įgyvendintais.

### Added (2026-06-29) – Korporatyvinis build profilis (M1–9, tier 9)

- **Build profilis M1–9:** `scripts/generate-core-data.mjs` dabar generuoja **du** profilius – core `*-m1-m6.json` (viešas MVP) ir korporatyvinį `*-m1-m9.json` (Duomenų analizės kelias, tier 9). Generuojama iš full SOT (`modules.json` / `glossary.json` / `tools.json`).
- **`vite.config.ts`:** naujas `VITE_MAX_BUILD_MODULE=9` (BE `VITE_MVP_MODE=1`) → `@modules-data`/`@glossary-data`/`@tools-data`/`@tools-en-data` rodo į `*-m1-m9.json`; bundle'e tik moduliai **1–9** (M10–15 turinys neįtraukiamas). M9 veikėjai ir AI detektorių skaidrė įtraukti; Vaizdo generatorius (M15) – stub.
- **`package.json`:** `npm run build:corporate` (`VITE_MAX_BUILD_MODULE=9 vite build`).
- **`scripts/validate-schema.mjs`:** korporatyvinio profilio validacija (`modules-m1-m9.json`/`glossary`/`tools` su `id/moduleId ≤ 9` patikra).
- **Testai:** `mvp.gating.test.tsx` – tier 9 blokas (M7–9 prieinami, M10+ užrakinti); pilnas test:run 240/240.
- **Docs:** `MARKETING_HANDOFF_CHECKLIST.md` §7a (tier 9 korporatyvinis build), support playbook tier `3 / 6 / 9`.

### Changed (2026-06-29) – M7–9 turinio tobulinimas + M4–6 mikropataisos

- **M7 (Duomenų analizės kelias):** MUST/SHOULD klasifikacija (`docs/MODULIO_7_SKAIDRIU_EILES.md`), DA_4 vizualizacija lieka `optional` (Fast track); paradokso tekstas (726) ir paprastos vizualizacijos (861) → `optional`. „📍 Kur pritaikyti?“ blokai prie 73 (pipeline), 731 (4 tipai), 97 (Deming), 74 (MASTER).
- **M8 testas:** q6 (Geštalto MCQ → optional skaidrė 101) → scenarijaus klausimas apie vizualizacijos generavimą (relatedSlideId 86, MUST) – pataisytas remediation tarpas; iš viso 5 scenarijaus tipo klausimai.
- **M9 capstone:** pridėtas „📄 Pavyzdinis rezultatas (MASTER PROMPT)“ blokas (slide 93); rekomenduojami scenarijai išlaikyti.
- **Reflection prompts M7/M9:** META+INPUT+OUTPUT formatas (kaip M1–M6).
- **M4:** slide 61 (tyrimų įrankiai) → „📍 Kur dar pritaikyti? (Duomenų analizės kelias)“ cross-reference; slide 48 „Trumpai (30 s)“ sutrumpinta (~90 → ~55 žodžių). Self-check remediation („Jei klaidingai – žr. skaidrę X“) ir CoVe/chunk sinchronas patikrinti.

### Notes (2026-06-29) – Deferred vartas: korporatyvinis pardavimas (tier 9)

- **Kontekstas:** korporatyvinis klientas (50 licencijų) įsigijo kelią 7–9 → Deferred vartas (`TODO.md` §1.5) **M7–9 turiniui praeitas**.
- **`TODO.md` §1.5:** DEF-1 padalintas į **DEF-1a** (M7–9 – aktyvu / iš esmės padaryta) ir **DEF-1b** (M10–15 – vis dar Deferred); DEF-2 microcopy → dalinai; P3 #1, #2 pažymėti ✓.
- **`ROADMAP.md` §4.4/§5:** pridėtas „Korporatyvinis kelias 7–9 (aktyvu)“ etapas; §5 gate – išimtis 7–9 (tier 9), 10–15 lieka Deferred.
- **`docs/development/AUDIT_2026-06_SUMMARY.md`:** Deferred sekcija – 7–9 aktyvūs (korporatyvinis build), tik 10–15 Deferred.

### Notes (2026-06-29) – TODO/ROADMAP sinchronas su production audit

- **Verdict:** CONDITIONAL GO (M1–6 shippable; monetizacija ~45% ready). Santrauka: `docs/development/AUDIT_2026-06_SUMMARY.md`.
- **`TODO.md`:** naujas P0 track MON-1–MON-7 (monetizacija/integracija); P1 CONV-1–CONV-4 (konversija); Release vs Monetization gate apibrėžimai; M13/M7–15 → §1.5 Deferred; DS v0.2 perkeltas į Padaryta; Post-release analytics → MON-4/MON-7.
- **`ROADMAP.md` v2.3:** audit reference; localStorage (ne sessionStorage) tier; GitHub Pages demo rizika; PostHog/verify-access → P0; monetization pilot etapas; M7–15 gate note.
- **Nauji docs:** `docs/deployment/MARKETING_HANDOFF_CHECKLIST.md` (marketing komandai); cross-links `DOCUMENTATION_QUICK_REF.md`, `INTEGRATION_OVERVIEW.md`.

### Changed (2026-06-11) – Agentų sistemos refaktoras: AGENTS.md spine + skills visiems agentams

- **`AGENTS.md` (naujas, repo šaknyje, EN):** vienas agentų registras – 9 agentų kontraktai (rolė, „does NOT“, trigeriai, skill, handoff), mišrios užduoties pipeline, 3 subagentų rolės (explore-diagnosis, data-validate, content-spellcheck), Architecture A, output gate, validacijos skriptai.
- **`.cursor/rules/agent-orchestrator.mdc`:** sutrumpintas iš ~126 iki ~36 eil. (EN spine); router/pipeline perkelti į naują `.cursor/skills/orchestrator/SKILL.md`.
- **`.cursorrules`:** deprecated – tik nuoroda į `AGENTS.md`; kodo kokybės gairės perkeltos į `coding-agent` skill, doc sinchrono – į `qa-agent` skill.
- **Skills 3 → 10 (visi aktyvūs):** nauji `orchestrator/`, `curriculum-agent/`, `scheme-agent/`, `coding-agent/`, `ui-ux-agent/`, `qa-agent/`, `user-journey-agent/`; esamų 3 skill frontmatter `description` perrašyti į EN (auto-apply trigeriai). Indeksas: `.cursor/skills/README.md`.
- **Rules konsolidacija:** `content-agent.mdc`, `curriculum-agent.mdc`, `scheme-agent.mdc` – ploni trigerio stub'ai (EN, rodo į skill); `content-agent-summary-slide.mdc` pašalintas (turinys – `SUMMARY_SLIDE_SPEC.md` + content-agent skill); naujas `modules-data.mdc` – vienas `modules.json` glob router pagal užduoties raktažodį. Nuorodos į pašalintą rule atnaujintos 8 docs failuose → `docs/development/SUMMARY_SLIDE_SPEC.md`.
- **EN agent contract blokai:** `CONTENT_AGENT.md`, `CURRICULUM_AGENT.md`, `SCHEME_AGENT.md`, `UI_UX_AGENT.md`, `USER_JOURNEY_AGENT.md`, `DATA_AGENT_DUOMENYS_ATNAUJINIMAS.md` viršuje – `## Agent contract (EN)` (rolė, trigeris, skill, handoff); pilni LT spec nepakeisti.
- **Deterministiniai vartai:** `.husky/pre-commit` (lint-staged) + `lint-staged` taisyklė `src/data/*.json` → `validate:schema`; dokumentuota `AGENTS.md`.
- **Doc sinchronas:** `docs/DOCUMENTATION_QUICK_REF.md` §2 (AGENTS.md nuoroda), `context_budget.md` §0 hierarchija, `AGENT_ORCHESTRATOR.md` §7 (pašalinta nuoroda į neegzistuojantį `CODING_AGENT_ZINIU_PATIKRINIMO_MODULIAI.md`).

### Added (2026-06-11) – Definition of Done indeksas ir agentų skills (pilotas)

- **`docs/development/dod_01.md`:** DoD indeksas – globalus DoD (§1), mixed-task pipeline handoff kriterijai (§2), 9 agentų checkbox su nuorodomis į pilnus checklist (§3), release gate nuoroda (§4), skill evolution / `lessons.md` formatas (§5). Be checklist kopijavimo – tik kriterijai + SOT nuorodos.
- **`.cursor/skills/` (lokaliai, ne repo – `.gitignore` `.cursor/`):** `README.md` indeksas + `_template/`; 3 pilot skills – `content-agent/`, `data-agent/`, `code-review-agent/` (SKILL.md workflow + `lessons.md` pamokų kaupimui).
- **Integracija:** DoD nuorodos `agent-orchestrator.mdc` §4, `AGENT_ORCHESTRATOR.md` §5, `DOCUMENTATION_QUICK_REF.md` §2, `DOCUMENTATION_INDEX.md`, `context-engineering/README.md` (pašalinta nutrūkusi `CONTEXT_ENGINEERING_AGENT_SKILLS_IMPLEMENTATION.md` nuoroda).

### Fixed (2026-06-11) – SUMMARY_SLIDE_SPEC kelias rules failuose

- **`.cursor/rules/` (lokaliai):** `content-agent.mdc`, `content-agent-summary-slide.mdc`, `curriculum-agent.mdc`, `agent-orchestrator.mdc` – nutrūkęs kelias `docs/archive/development/SUMMARY_SLIDE_SPEC.md` → `docs/development/SUMMARY_SLIDE_SPEC.md` (failas egzistuoja tik ten).

### Added (2026-05-25) – SEO / crawlers / GEO (submodulis)

- **`src/utils/publicSiteMeta.ts`:** `VITE_PUBLIC_SITE_URL` + `BASE_URL` – canonical / OG URL; build helper `resolvePublicAppUrlsForBuild`.
- **`index.html` + `vite.config.ts`:** statinis `noindex`; OG placeholder `%VITE_OG_URL%` / `%VITE_OG_IMAGE%` transform build metu.
- **`App.tsx` Helmet:** `noindex, nofollow`, canonical, `og:url`, `og:image`, `twitter:image`.
- **`public/robots.txt`:** `Disallow: /` (subpath); **`public/llms.txt`** – AI crawler orientacija.
- **`npm run export:seo-snippets`:** `public/seo-public-snippets.json` + `.md` (moduliai 1–6, be skaidrių).
- **Docs:** `docs/deployment/SEO_SUBMODULE.md`; `RELEASE_QA_CHECKLIST.md` §5e; atnaujinti `INTEGRATION_OVERVIEW`, `DEPLOYMENT`, `README`, `.env.example`.
- **Testai:** `publicSiteMeta.test.ts`, `App.seo.test.tsx`.

### Changed (2026-05-25)

- **QuizResultsView:** CEO spin-off nuoroda `https://ditreneris.github.io/ceo/` → `https://www.promptanatomy.ceo/` (DI Operacinis centras / AI Operations Center).
- **App footer + SOT:** © metai `2024-2026` → `2026` (`App.tsx`, `turinio_pletra.md`, `docs/turinio_pletra_moduliai_*.md`, `README.md`, `GOLD_LEGACY_STANDARD.md`).

### Fixed (2026-06-11) – Modulio 2 ir test-section regresija

- **Atsakymų flow (M2, M5, M8, M11, M14):** pašalintas F3-1 confidence gate MCQ/T/F/Scenario komponentuose – variantai aktyvūs iš karto; pasitikėjimas privalomas tik submit metu (`TestPracticeSlides` `allAnswered`).
- **Matching auto-check (M2):** `MatchingQuestion` automatiškai tikrina poras, kai visos susietos – submit nebeblokuojamas dėl pamiršto „Patikrinti poras“.
- **M2 pool + locale:** `ModuleView` – `poolRef` pakeistas į `useMemo(selectQuestions(locale))`; LT↔EN perjungimas modulio viduje regeneruoja klausimus.
- **Resume clamp (visi moduliai):** `clampSlideIndex` + `handleResumeFromSaved` / `useSlideNavigation` – sena localStorage pozicija > skaidrių skaičiaus nebekelia loading loop (ypač M2 po suspaudimo).
- **Submit hint:** disabled „Patikrinti atsakymus“ rodo amber bloką su trūkstamais žingsniais (`getIncompleteReasons`, i18n `testPractice`).

### Fixed (2026-05-25)

- **M3 Apšilimas (skaidrė 30.5):** `whyBenefit` – „išmausi“ → „išmoksi“ (`modules.json`, `modules-m1-m6.json`, `turinio_pletra.md`).

### Fixed (2026-05-19)

_(Palikta būsimiems pataisymams — žr. git istoriją virš [v0.2.0].)_

---

## [v0.2.0] – 2026-05-19 – Design System konsolidacija ir modulio identitetas

**Apimtis:** Design System v0.1 → v0.2 — token baseline, dublikatų žemėlapis, 3 UI primitive'ai, modulio identitetas M1–M6, microcopy audit (be turinio keitimo), release dokumentacija. **Produkto `package.json` versija lieka 1.3.0** — v0.2.0 žymi dizaino sistemos sluoksnį.

### Added

- **E2 Token inventory:** `scripts/audit-design-tokens.mjs` (`--verbose`), `npm run audit:design-tokens`, `DESIGN_TOKENS_BASELINE_2026-05.md` (TOTAL **480**), `RELEASE_QA_CHECKLIST.md` §8.
- **E3 Style map:** `DESIGN_SYSTEM_DUPLICATES_2026-05.md`; `Banner` variantas `terms`; `@deprecated` CSS komentarai `.btn-*`, `.card`, `.badge-*` (`src/index.css`).
- **E4 Primitives:** `Eyebrow`, `IconChip`, `SectionDivider` + smoke testai + `src/components/ui/README.md`; proof ModulesPage, ModuleCompleteScreen, SummarySlide.
- **E5 Module identity:** `module.accent` + `module.identityIcon` (schema, JSON M1–M6); `moduleIdentity.ts`; ModulesPage top stripe; ActionIntroSlide Eyebrow; SectionBreakSlide badge.
- **E6 Microcopy QA:** `MICROCOPY_LENGTHS_2026-05.md` (footers OK; M1/M4/M6 body >20 žodžių sąrašas); `audit-microcopy-content-blocks.mjs`.
- **E7 Release docs:** `docs/development/DESIGN_SYSTEM.md`; `DESIGN_SYSTEM_V0_2_VISUAL_DIFF/README.md`; `MODULE_IDENTITY_VISUAL_REGRESS_2026-05.md`; screenshot katalogai.

### Changed

- **ModulesPage:** `practice` level → emerald diferenciacija; top stripe ir Eyebrow iš `module.accent` (M1–M6).
- **SlideContent:** perduoda `moduleAccent`, `identityIcon`, `levelLabel` į `action-intro` ir `section-break`.

### Deprecated

- Tiesioginis `.btn-primary` / `.btn-secondary` / `.btn-accent` / `.card` / `.badge-*` naudojimas naujame JSX — canonical: `<CTAButton />`, `<Card />` (migracija **v0.3**).
- CSS klasės **lieka** kaip `CTAButton` backend ir legacy skaidrėms.

### Not changed

- Skaidrių **tekstai** (`modules.json` body, `lt.json` / `en.json`) — išskyrus struktūrinius laukus `accent` / `identityIcon`.
- Diagramų hex refactor (backlog **B1** v0.3).
- `package.json` semver (1.3.0).

### Migration notes

- **Autoriai:** M1–M6 moduliams galima nurodyti `accent` + `identityIcon` — žr. `DESIGN_SYSTEM.md` §4.
- **QA prieš release:** `npm run audit:design-tokens` (≤480); įkelti screenshot'us pagal `MODULE_IDENTITY_VISUAL_REGRESS_2026-05.md` ir `DESIGN_SYSTEM_V0_2_VISUAL_DIFF/README.md`.
- **Microcopy:** pertekliniai tekstai — `MICROCOPY_LENGTHS_2026-05.md` (CONTENT_AGENT v0.3).

---

#### Išsamus etapų žurnalas (E2–E5)

### Added (2026-05-19) – Design System v0.2 – Etapas E5 (Module identity layer)

**Modulio savitumas M1–M6 per `accent` + `identityIcon` duomenis ir 3 UI vietas. Skaidrių tekstai neliesti.**

- **`scripts/schemas/modules.schema.json`** (E5.1): optional `module.accent` (enum 6 spalvų), `module.identityIcon` (6 Lucide pavadinimai).
- **`src/types/modules.ts`**: `ModuleAccent`, `ModuleIdentityIcon`, laukai `Module` interface.
- **`src/data/modules.json`**, **`modules-m1-m6.json`**, **`modules-en.json`**, **`modules-en-m4-m6.json`** (E5.2–E5.3): M1–M6 žemėlapis (brand/BookOpen … accent/Rocket); M7–M15 be laukų.
- **`src/utils/moduleIdentity.ts`**: `resolveModuleAccent`, `resolveModuleIdentityIcon`, `accentTopBarClasses`, `sectionBreakBadgeByAccent`.
- **`ModulesPage.tsx`** (E5.4): top stripe iš `module.accent`; `practice` level → emerald; Eyebrow naudoja `moduleAccent`.
- **`SlideContent.tsx` + `ActionIntroSlide.tsx`** (E5.5): Eyebrow virš intro hero su modulio ikona ir accent.
- **`ContentSlides.tsx` `SectionBreakSlide`** (E5.6): `sectionNumber` badge iš `moduleAccent`; hero/spinoff nepakeisti.
- **`docs/archive/development/analysis/MODULE_IDENTITY_VISUAL_REGRESS_2026-05.md`** (E5.7): 12 screenshot checklist + WCAG / GOLDEN_STANDARD §2.2 patikra.
- **Helper:** `scripts/sync-module-identity-fields.mjs` — JSON sinchronas (pakartotiniems atnaujinimams).

### Added (2026-05-19) – Design System v0.2 – Etapas E4 (Component normalization)

**Trys UI primitive'ai su smoke testais, proof-of-usage ir katalogu. Turinys (`modules.json`, locale) neliestas. SOT: [`docs/development/DESIGN_SYSTEM_V0_2.md`](docs/development/DESIGN_SYSTEM_V0_2.md) §7.**

- **`src/components/ui/Eyebrow.tsx`** (E4.1): maža uppercase antraštė; `accent` ×6 (`brand`, `accent`, `slate`, `emerald`, `violet`, `cyan`); optional Lucide ikona; pilni `Record` Tailwind klasės.
- **`src/components/ui/IconChip.tsx`** (E4.2): apvalus piktogramos chip; 5 `role` (`cta`→accent, `info`→brand, `warn`→amber, `success`→emerald, `error`→rose); 3 dydžiai (28/36/44 px).
- **`src/components/ui/SectionDivider.tsx`** (E4.3): horizontali skiriamoji linija su/be `label`; accent spektras kaip Eyebrow.
- **Smoke testai:** `src/components/ui/__tests__/Eyebrow.test.tsx`, `IconChip.test.tsx`, `SectionDivider.test.tsx`.
- **Proof of usage:** `ModulesPage.tsx` (desktop Eyebrow vietoj level badge); `ModuleCompleteScreen.tsx` (IconChip prie use-case `h3`); `ContentSlides.tsx` `SummarySlide` (SectionDivider prieš refleksiją).
- **Katalogas:** `src/components/ui/index.ts` (9 export'ai su tipais); naujas `src/components/ui/README.md`.
- **Patikra:** `npm run lint`, `typecheck`, `test:run`, `build`, `audit:design-tokens` — TOTAL ≤ 480.

### Added (2026-05-19) – Design System v0.2 – Etapai E2 (Token inventory) ir E3 (Style inconsistencies map)

**Pamatas v0.2 konsolidacijai – baseline auditui, dublikatų lentelei ir `@deprecated` JSDoc/CSS komentarams. Turinys nelietamas; senas kodas veikia. SOT: [`docs/development/DESIGN_SYSTEM_V0_2.md`](docs/development/DESIGN_SYSTEM_V0_2.md) §5–§6.**

- **`scripts/audit-design-tokens.mjs`** (E2.1, CODING_AGENT): pridėtas `--verbose` flag'as – atspausdina per-finding eilutes formatu `path:line  [category]  preview` (atitinka plano §5 E2.1 exit-kriterijų #2). Skripto detekcija nepakitusi (hex `#abc`/`#abcdef`/`#aabbccdd`, inline `style={{ color/background/boxShadow/fill/stroke }}`, SVG `fill="#..."`/`stroke="#..."`); warn-only (`exit 0`); skenuoja `src/components/**` ir `src/utils/**`, praleidžia `*.test.tsx`, `*.d.ts`.
- **`package.json`** (E2.1): pridėtas `"audit:design-tokens": "node scripts/audit-design-tokens.mjs"` script alias – aktyvuoja `RELEASE_QA §8` paskutinę checkbox eilutę (`npm run audit:design-tokens`).
- **`docs/archive/development/analysis/DESIGN_TOKENS_BASELINE_2026-05.md`** (E2.2, QA_AGENT, naujas): užfiksuotas v0.2 pradinės būklės token inventory – **TOTAL 480 findings** (351 hex + 13 inline style + 116 SVG fill/stroke) **164 failuose**, **41 failas** su radiniais > 0. Pagal direktorijas: `slides/shared/` 91.7 % (440/480), `slides/types/` 4.2 %, `components/` 2.1 %, `utils/` 2.1 %. Top-5 „dirtiest" failai: `CustomGptProcessDiagram.tsx` (42), `LlmArchDiagramDiagram.tsx` (25), `M10SpecIncidentDiagram.tsx` (24), `LlmAutoregressiveDiagram.tsx` (23), `M13RuleOfThirdsDiagram.tsx` (20) – sudaro 27.9 % visų radinių; konsolidacija planuojama v0.3 (Backlog **B1** – `diagramTokens.ts`). Dokumentas naudojamas **E7.4** release regression patikrai.
- **`docs/development/RELEASE_QA_CHECKLIST.md`** (E2.3, QA_AGENT): pridėtas naujas **§8 „Design tokens baseline regression"** (~1 min, automatinis) – 4 checkbox eilutės (paleisti audit'ą, palyginti su baseline ≤480, top-5 nepakitę, npm script alternatyva). Nuoroda į `DESIGN_TOKENS_BASELINE_2026-05.md`. Skriptas warn-only – NEblokuoja `npm run build` ar CI.
- **`docs/archive/development/analysis/DESIGN_SYSTEM_DUPLICATES_2026-05.md`** (E3.1, CODE_REVIEW_AGENT, naujas): 5 dublikatų lentelė su canonical sprendimais – Kortelė (`<Card />`), CTA mygtukas (`<CTAButton />`), Badge (CSS kol kas, JSX primitive – v0.3 backlog'as), Banner/Callout (`<Banner />`, po E3.3 – 4 variantai), Input (CSS kol kas, 1 naudotojas). Naudotojų skaičiaus apytiksliai (`rg`-based, reproducibilumo komandos pateikiamos): `card-hover` ×5, `btn-primary` ~26, `btn-secondary` ~27, `badge-{brand,accent,success,slate}` ~9, inline `border-l-4` 161 atvejis 28 failuose, `.input` 1 atvejis. **Esminis radinys:** visi 3 JSX primitive'ai (`<Card />`, `<CTAButton />`, `<Banner />`) šiandien turi **0 vartotojų** – v0.2 yra konsolidacijos pradžia, ne pabaiga; migracija – v0.3.
- **`src/index.css`** (E3.2, CODING_AGENT): 8 utility'ams pridėti `/* @deprecated v0.2 — ... */` komentarai – `.btn-primary`, `.btn-secondary`, `.btn-accent` (canonical: `<CTAButton variant="..." />`; klasės **lieka kaip canonical primitive bekendas** – `CTAButton.tsx` vidiniai per `variantClasses` jas naudoja); `.card`, `.card-hover` (canonical: `<Card />`); `.badge`, `.badge-brand`, `.badge-accent` (canonical: laukti Badge primitivo v0.3 arba inline Tailwind). **Kodas NEšalinamas** – egzistuojantys ~50+ `.btn-*` ir `.card*` naudotojai veikia toliau. NEpalietama: `.glass-card`, `.hover-card`, `.input`, `.badge-success`, `.badge-slate`, `.mono`, `.btn-hero-cta`.
- **`src/components/ui/Banner.tsx`** (E3.3, UI_UX_AGENT): `BannerVariant` papildytas opt-in `terms` variantu (slate paletė: `bg-slate-50 dark:bg-slate-900/20 border-l-4 border-slate-500 text-slate-900 dark:text-slate-100`) – atitinka GOLDEN_STANDARD §2.2 blockVariant `terms`. Egzistuojantys 3 variantai (`info`/`success`/`warning`) nepakeisti. JSDoc pažymėtas `@since v0.2`. NEbūtina taikyti existing slide'uose (opt-in); pre-flight `rg "BannerVariant"` patvirtino, kad nėra exhaustive switch'ų, kurie sulaužytų TS strict.
- **Patikra (Iter 1 + Iter 2):** `npm run lint` OK; `npm run typecheck` OK; `npm run test:run` 30 file/218 testai ✓; `npm run build` sėkmingas; `npm run audit:design-tokens` TOTAL=480 (nepakitęs po visų pakeitimų – CSS komentarai ir TS tipo praplėtimas neprideda hex/inline/svg literalų); `npm run validate:schema` OK (13 JSON failų). Fail-safe rule §1 (≤5 failų): Iter 1 = 3 failai, Iter 2 = 2 failai. Rule §2 (turinio neliečimo): jokių `modules.json`/`lt.json`/`en.json`/`turinio_pletra*.md` keitimų. Rule §6 (veikia—nelaužti): `summary`, `section-break recap`, `Diagram+Block`, `lazyWithRetry`, `validate:schema` neliečiama.
- **TODO.md (DS-E2 ir DS-E3 statusas):** ~~DS-E2.1~~, ~~DS-E2.2~~, ~~DS-E2.3~~, ~~DS-E3.1~~, ~~DS-E3.2~~, ~~DS-E3.3~~ – baigti. Sekantys etapai: E4 (Eyebrow/IconChip/SectionDivider primitive'ai – paraleliai), E5 (modulio identitetas, sekos darbas), E6 (microcopy QA, paraleliai su E5), E7 (release dokumentacija + baseline regression).

### Fixed (2026-05-19)

**Kopijos pataisymai (LT) – Modulis 1 QC šablonas ir Modulis 3 praktikos įvadas**

- **`src/locales/lt.json`:** `contentSlides.blockQualityInlineTemplate` – **„patikrink loginę nuoseklumą“** → **„patikrink logiką“** (M1 skaidrė 15, Quality Control – Inline QC kopijuojamas šablonas).
- **`src/data/modules.json`**, **`src/data/modules-m1-m6.json`:** Modulio 3 `practice-intro` (`id: 30`) `optionalInstruction` – **„rolę arba dominą“** → **„rolę / veiklos sritį“** (geltonas info blokas „Pasirink bent 2 scenarijus…“).

### Fixed (2026-04-24)

**Modulis 1 (EN): skaidrė „Prompting techniques“ rodė LT turinį EN režime – dubliuotas `id: 14`**

- **Priežastis:** Modulio 1 `slides` masyve du slaidai turėjo tą patį `id: 14` – „Prompting'o Technikos“ (`prompt-techniques`, ~335 eil.) ir „Modulio Santrauka“ (`summary`, ~818 eil. LT / 805 eil. EN). `src/data/modulesLoader.ts` funkcija `mergeArraysById` raktuoja `baseIndexById` pagal `id`, todėl antrasis `id: 14` perrašydavo pirmąjį – EN override'o slaidai atsidurdavo Santraukos pozicijoje, o pirmasis LT slaidas likdavo neperrašytas. Rezultatas: EN režime skaidrė „Prompting'o Technikos“ rodė LT antraštę, `logicSteps`, `techniques[]` ir `footer`. Pažeidė `src/utils/progress.ts` 134 eil. kontraktą („`slide.id` unikalu modulio viduje“).
- **`src/data/modules-m1-m6.json`**, **`src/data/modules.json`**, **`src/data/modules-en.json`:** Modulio 1 santraukos slaido `id: 14` → **`id: 19`**. Pirmasis `id: 14` (Prompting techniques) nekeistas, todėl `relatedSlideId: 14` nuorodos (`questionPool.ts`, `questionPool.en.ts`, `TestPracticeSlides.tsx` `CATEGORY_META.bendra.slideId`) sprendžiasi lygiai taip pat, kaip iki pataisos (per `Array.find/findIndex` – pirmojo atitikmens). `id: 19` anksčiau nebuvo naudotas Modulyje 1 (1–18, 20–21 + dublikatas).
- **Patikra:** `node scripts/validate-schema.mjs` – OK (13 failų). `npx vitest run src/data/__tests__/modulesLoader.test.ts` – 17/17 ✓ (įskaitant EN merge fixtures).
- **Pastaba apie esamą localStorage progresą:** Vartotojams, kurie jau pažymėję Modulio 1 Santrauką kaip baigtą, `completedTasks[1]` masyve yra `14` – po pataisos tai atitinka tik „Prompting techniques“ slaidą. Naujasis Santraukos slaidas (`id: 19`) rodomas kaip nebaigtas, kol dar kartą apsilankoma – jokio duomenų praradimo, savaime išsitaiso per kitą peržiūrą.

### Changed (2026-04-13)

**Footeriai ir trumpos etiketės moduliuose 7, 12, 13 (LT) + saugumo sąvokų pavadinimas**

- **`src/data/modules.json` (M7):** etikos / patikimumo blokas (**66.9** → **90**) – `content.footer` su formatu **„Toliau – skaidrė N: …“** (GOLDEN_STANDARD §3.6, ≤55 simb.); pridėti / suderinti **`shortTitle`** skaidrėse **67.5**, **200**, **201**, **68.5**, **90** (footeryje ir navigacijai). Skaidrė **67** footeris – **„Pataisyk promptą“** (atitinka **67.3** `shortTitle`).
- **`src/data/modules.json` (M7) – skaidrė 67.5:** **`shortTitle`** ir ankstesnės skaidrės footeris – **„Promptų injekcija ir ribų apėjimas“** (vietoj „įskiepimas / apeijimas“); **66.9** `nextSteps` ir **67.5** „Takoskyra“ tekstas suderinti su ta pačia terminologija.
- **`src/data/modules.json` (M12):** **120.25** footeris – be perteklinio „(neprivaloma)“ (žyma lieka skaidrėje).
- **`src/data/modules.json` (M13):** trumpesni footeriai ir **`shortTitle`** – **13.3**, **13.33**, **13.4**, **13.7** (stilius/kompozicija/video scenarijus/muzikos teisės).
- **Patikra:** `node scripts/audit-footer-length.mjs`, `AUDIT_MODULES=7,8,9,10,11,12,13,14,15 node scripts/audit-footer-numbers.mjs`, `node scripts/validate-schema.mjs` – OK.

### Notes

**Produkcinė aplinka:** mokymosi aplikacija pasiekiama adresu **[www.promptanatomy.app](https://www.promptanatomy.app)**. Diegimas vyksta per **Vercel**; šis repo prijungtas prie didesnio projekto kaip **git submodulis** (`www`). Stabili eksploatacija produkcijoje – **maždaug 14 dienų** (įrašymo į changelog metu).

**Dokumentacijos sinchronas:** `README.md` ir `ROADMAP.md` atnaujinti pagal tą patį produkcijos URL ir deploy modelį (2026-04-11).

### Changed (2026-04-12)

**Moduliai 13–14 (LT): M13–M14 tobulinimo planas – mažiau kartojimosi, perkrovos kontrolė, testas ir techninis `id`**

- **`src/data/modules.json` (M13):** **130** – outcomes aukštesnio lygio (mažiau dubliavimo su 13.1). **13.1** – „Trumpai“ kaip gilesnis nei įvanga sluoksnis. **13.2** – vienas blokas „Formulė ir trys sluoksniai“ + `m13_prompt_stack`. **13.33** – ryšys su video (tie patys principai statiniam vaizdui). **13.35** – „Kaip naudotis šia skaidre“; trumpesni ready antraščių tekstai. **13.5** – vienas accent „Kodėl verta ir ką nurodyti“; ilgi video įrankiai – **collapsible** „Visi video įrankiai“. **13.6** – paprastesnis „Trumpai“ blokas; **Angliškas MASTER** su LT paaiškinimu; collapsible „Papildomi pavyzdžiai…“. **Verslas ir rizikos** – trumpas „Trumpai“; KPI/A/B, teisės/verslas, QA/versijos – **collapsible**; matomi „Top 3 pitfalls“. **13.11** – „Trumpai“ su nuoroda į optional **13.35**. **13.9** – `introBody` „išmokai“; statistika **„Šablonai ir generatoriai: 5+“**. **Techninis `id`:** „Verslas ir rizikos“ → **`13.101`** (JSON **`13.10`** JS suparsinamas kaip **`13.1`** ir sutapdindavo su skaidre 13.1 – navigacija/remediation klaidinga).
- **`src/data/modules.json` (M14):** **140** – `thresholdExplanation` / gramatika (**peržiūrėti**, **skaidres**); `firstActionCTA` – rizikos ir workflow. **141** – **m14-q5** (veidas/balsas, `relatedSlideId` **13.101**), **m14-q6** (workflow po brief, **13.11**). **142** – `useCaseBlock` **„Kitas žingsnis: Modulis 15“** (vietoj trečio „Kur pritaikyti?“); `failedMessage` / `thresholdExplanation` – „skaidres“.
- **`src/utils/slidePhaseConfig.ts`**, **`src/components/slides/shared/TestRemediationChips.tsx`:** M13 verslo fazė / remediation – **`13.101`**.
- **`src/locales/lt.json`:** `vaizdoGen.tldr` – ryšys su optional MASTER (13.35).
- **Dokumentacija:** `docs/turinio_pletra_moduliai_13_14_15.md` (§5a techninis id, §5c M14 testas, sinchronas su JSON); `docs/MODULIO_13_SKAIDRIU_EILES.md` (13.101 vs teminė 13.10, M13/M14 eilės aprašymai).

### Changed (2026-04-11)

**Modulis 7: UX tiltai, mažesnis dubliavimas, path-step ir įrankių blokas**

- **`src/data/modules.json` (M7):** santraukos (**75**) pipeline kortelė – **6** etapai (įtrauktas **Modeliai**, suderinta su skaidre 73); „Kitas žingsnis“ – **„tu“** forma (`PAPRASTOS_KALBOS_GAIRES`). **66.9** – aiškesni `subtitle` / `nextSteps` (po etikos – EDA, lentelės, BI, MASTER). **90** (EDA) – tiltas „grįžtame prie analitinės dalies“. **726** – pirmoji sekcija su nuoroda į **725** (mažiau skaičių kartojimo); **ROI** → paprastesnė formulė. **67** – ilga praktika pakeista nuoroda į **67.3**. **68** – CoVe tik nuoroda į **67.8**; „Ką prisiminti“ nurodo anti-haliucinacinį šabloną skaidrėje **67.8**. **76** – sekcija **„Kodėl čia?“** (ryšys su DB ir KPI). Visi **path-step** (71.1–71.5): **`stepTotal: 5`**. Skaidrė **71:** **`toolsCollapsible: true`**.
- **`src/components/slides/types/ContentSlides.tsx`:** **PathStepSlide** – žyma **„Žingsnis n iš total“** (kai `stepTotal`); **ContentBlockSlide** – pasirenkamas **details/summary** įrankių blokui (`toolsCollapsible`), **aria-label**, **focus-visible**.
- **`src/types/modules.ts`:** `PathStepContent.stepTotal`, `ContentBlockContent.toolsCollapsible`.
- **`scripts/schemas/modules.schema.json`:** `path-step.content.stepTotal`; `content-block` – `tools`, `toolsIntro`, `toolsCollapsible`.
- **`src/locales/lt.json`, `en.json`:** `contentSlides.pathStepOfTotal`; `testPractice.toolsCollapsibleAria`.
- **Dokumentacija:** `docs/MODULIO_7_SKAIDRIU_EILES.md` (UX tiltas, santrauka); `docs/turinio_pletra_moduliai_7_8_9.md` (726 + 725 skaitymo tvarka, ROI).

### Changed (2026-04-09)

**LT content-block: antraštė „Trumpai“ be anglų santrumpų vartotojo UI**

- **`src/data/modules.json`**, **`src/data/modules-m1-m6.json`:** skaidrės **62**, **63**, **64** (Modulis 6) – pirmos content-block sekcijos `heading` **„Trumpai“** (buvo „Trumpai (TL;DR)“).
- **`docs/development/GOLDEN_STANDARD.md` v2.3.8:** §3.2 / §3.2a – LT `heading` ir matoma kopija be TL;DR; schema žymėjimas Trumpai (LT) / In short (EN).
- **`docs/development/PAPRASTOS_KALBOS_GAIRES.md` §2:** eilutė apie TL;DR → „Trumpai“.
- **Agentų doc:** `CONTENT_AGENT.md`, `AGENT_ORCHESTRATOR.md`, `.cursor/rules/agent-orchestrator.mdc` – patikros seka su „Trumpai“.
- **SOT / modulių eilės / auditai:** `turinio_pletra*.md`, `turinio_pletra.md`, `MODULIO_*_SKAIDRIU_EILES.md`, `AUDIT_SKAIDRE_63_*`, `SKAIDRIU_TIPU_ANALIZE.md`, `UX_AUDIT_MICRO_IMPROVEMENTS.md`, `KURSO_1_IKI_15_ANALIZE_APIBENDRINIMAS.md`, `AUDITO_ATASKAITA_MODULIAI_1_6_MOBILE_UX.md` – schemose ir etiketėse „Trumpai“ vietoj TL;DR.
- **Patikra:** `node scripts/validate-schema.mjs` – OK; `npm run build` – OK; Vitest – 218 testų – OK.

**Modulis 10: mažesnis turinio dubliavimas, GOLDEN hierarchija, aiškesnė vartotojo kelionė**

- **`src/data/modules.json` (M10):** **100** – pirmas `outcomes` punktas nebekartoja „agentas vs promptas“ detalės. **10.1** – pašalinta ilga workflow proza; kelio žemėlapis + nuoroda į **10.15**. **10.2** – sujungtas agento veikimo paaiškinimas; **copyable** – DI užduotis (ne tas pats paragrafas); trumpa „kada agentas“ + nuoroda į **10.5**. **10.15** – sąvokos ir pavyzdžiai viename **`terms`** bloke, diagrama **`brand`**, vienas **`accent`** CTA (`GOLDEN_STANDARD` §2.2). **10.35** – skirtingi Zapier / Make / n8n scenarijai (vengiant kartojimo su 10.25 / 10.15). **10.5** – „Taisyklės ir patarimai“ – **`terms`** + **`collapsible`** / **`collapsedByDefault`**. **10.6** – **Daryk dabar** ir **Patikra**. **10.65** – įrankių medis pakeistas nuoroda į **10.4**; **idempotency** – paaiškinimas paprasta kalba. **10.8** – trumpesnis `introBody`.
- **`src/data/modules.json` (M11):** `failedMessage` – skaidrei 2 pašalinta klaidinanti „sąvokų santrauka“ (10.1 nebekartoja sąvokų).
- **Dokumentacija:** `docs/turinio_pletra_moduliai_10_11_12.md` (§2, §3, §3a–3d, §4 – skaidrių numeracija 10.4/10.5/10.6; SOT sutampa su JSON); `docs/MODULIO_10_SKAIDRIU_EILES.md` (lentelė 10.1 / 10.65, GOLDEN pastaba 10.15).

### Added (2026-04-07)

**Tier 3 sertifikatas (Duomenų analizės kelias 7–9)**

- **Sąlyga:** baigti modulius 7, 8, 9 ir Modulio 8 testas ≥ 70 %; CTA – Modulio 9 užbaigimo ekrane (`ModuleCompleteScreen` – `activeCertificateTier`, analytics `request_certificate_tier3`).
- **`src/utils/certificateEligibility.ts`:** `canRequestCertificateTier3(progress)`; unit testai `certificateEligibility.test.ts`; `ModuleCompleteScreen.test.tsx` – tier 3 rodymo / slenksčio scenarijai.
- **`src/locales/lt.json`, `en.json`:** `unlockCertBodyTier3`, `certAriaPart3`.
- **`src/data/certificateContent.json`, `certificateContent-en.json`:** tier 3 tekstai – kelias 7–9 (ne „9 moduliai“ be konteksto).
- **`docs/development/CERTIFICATE_CONTENT_SOT.md`:** lygių atrakinimo lentelė.

### Changed (2026-04-07)

**Moduliai 12 ir 15: paskutinė skaidrė kaip `summary` (SUMMARY_SLIDE_SPEC paritetas)**

- **`src/data/modules.json`:** skaidrės **128** (M12) ir **158** (M15) – `type: "summary"`, turinys su hero statistikomis, žinių kortelėmis (`items` + `icon` + `color`), refleksijos promptu (META/INPUT/OUTPUT), `nextStepCTA`, `firstAction24h`, „Kitas Žingsnis“ kortele.
- **`src/components/slides/types/ContentSlides.tsx`:** `SectionIcon` – palaikomos ikonos **Image**, **Video**, **Music** (M15 santraukai).
- **`src/components/ModuleView.tsx`:** komentaras apie tier 3 atrakinimą prie `onRequestCertificate`.
- **Dokumentacija:** `docs/MODULIO_10_SKAIDRIU_EILES.md`, `docs/MODULIO_13_SKAIDRIU_EILES.md` – tipas `summary` vietoj `practice-summary`.

### Fixed (2026-04-07)

**Modulis 12: practice-scenario skaidrės (121–127) rodė tuščią turinį**

`PracticeScenarioSlide` ir `PracticalTask` skaitė tik **`slide.scenario`** ir **`slide.practicalTask`** (šaknyje), o M12 duomenys buvo tik **`content.*`** – scenarijaus blokas grąžindavo `null`, praktinės užduoties sekcija nerodė.

- **`src/data/modules.json`:** kiekvienai M12 `practice-scenario` (121–127) pridėti šaknies **`scenario`** (kontekstas, duomenys, apribojimai, tikėtina išvestis, `narrativeLead`, `situation`) ir **`practicalTask`** (šablonas, žingsniai, `allowMarkWithoutAnswer`).

**Practice-intro: Moduliui 12 (ir kitiems ne M3) rodė „6 blokų sistemą“**

Bendras `PracticeIntroSlide` tekstas ne M9 buvo skirtas Moduliui 3 – netiko Agentų keliui (M12) ir kitiems practice moduliams (pvz. M15).

- **`src/components/slides/types/TestPracticeSlides.tsx`:** atskiras įvadinis tekstas **`moduleId === 12`**; neutrali praktika **ne M3** (be 6 blokų frazės); **M12** progreso eilutė su **`minScenariosToComplete`** (kaip M3), kai nurodyta JSON.

**Moduliai 13–14: „Verslas ir rizikos“ skaidrės `id` dublikatas; LT „tu“ forma**

Antroji skaidrė su pavadinimu „Verslas ir rizikos“ buvo su **`id: 13.1`** – sutapdino su „Turinio inžinerijos kelias – ką čia rasite“ ir su `completedTasks[13]` progresu; `slidePhaseConfig` verslo fazei tikėjosi **`13.10`**. Atkurta sutartis su SOT (`docs/MODULIO_13_SKAIDRIU_EILES.md`).

- **`src/data/modules.json`:** „Verslas ir rizikos“ → **`"id": 13.10`**; **13.9** santraukos `nextStepCTA` – **„Pereik prie Modulio 14…“** (`PAPRASTOS_KALBOS_GAIRES` – tu forma); **142** `passedMessage` – **„Dabar gali pereiti prie Modulio 15…“** (vietoj „Esate pasiruošę“).

**Footeriai M12 / M15 – vartotojo skaidrės numeris (ne vidinis `id`)**

Po įterptų skaidrių **120.25** ir **150.25** footeriai dalinai rodė **vidinius `id`** (120.5, 121, 151…) – neatitinka `.cursor/rules/footer-slide-numbers.mdc` (vartotojui rodoma pozicija modulyje 1, 2, 3…).

- **`src/data/modules.json` — Modulis 12:** **120.25** → **„Toliau – skaidrė 3: Agentų orkestratorius (neprivaloma)“**. **120.5** → pridėtas **`footer`:** **„Toliau – skaidrė 4: 1 praktika: Automatize (80 %)“**.
- **`src/data/modules.json` — Modulis 15:** **150.25** → **„Toliau – skaidrė 3: Scenarijus: Vaizdas“**.
- **Patikra:** `node scripts/audit-footer-numbers.mjs --modules=12,15` – OK.

**Dokumentacija – M12 / M15 skaidrių eilės lentelės**

- **`docs/MODULIO_10_SKAIDRIU_EILES.md`:** M12 – **120.25**, **120.5**, stulpelis „Eilė (UI 1…N)“.
- **`docs/MODULIO_13_SKAIDRIU_EILES.md`:** M15 – **150.25**, UI eilės 1…6; taisyklėje M15 – schema po įvado.

### Added (2026-04-07)

**Interaktyvios schemos moduliuose 7–15 (planas „Schemų plėtra M7–M15“)**

- **M7:** `m7_analysis_types`, `m7_data_prep_workflow`, `m7_three_agents_flow`, `m7_master_workflow` (bendras 8 žingsnių vaizdas su `M9DataWorkflowBlock` / `diagramContext`); komponentai `M7*Block`, `m7DiagramContent.ts`; skaidrės **731, 89, 94, 74** – `modules.json`.
- **M9:** **93** – `m9_data_workflow` (`M9DataWorkflowBlock` / `M9DataWorkflowDiagram`, `EnlargeableDiagram`).
- **M10:** **10.15, 10.25, 10.4, 10.65** – `m10_trigger_flow`, `m10_three_a_strategy`, `m10_tool_decision_tree`, `m10_spec_incident`.
- **M12:** nauja skaidrė **120.25** – `m12_three_labs`; **120.5** lieka optional orkestratorius.
- **M13:** **13.1, 13.2, 13.33** – `m13_aec_funnel`, `m13_prompt_stack`, `m13_rule_of_thirds`; **13.11** – `turinio_workflow` (kaip ir buvo).
- **M15:** nauja skaidrė **150.25** – `m15_practice_loop`.
- **Testai M8 / M11 / M14:** `TestKnowledgeScopeDiagram`, `TestRemediationChips` – `TestPracticeSlides.tsx`; Modulio **8** test-intro papildytas (trukmė, CTA, slenkstis).
- **Dokumentacija:** `docs/development/SCHEME_AGENT.md` §2 lentelė – naujos eilutės (M7–M15, testai).

### Changed (2026-04-07)

**Moduliai 10–12: turinys, testas, įvadas, santrauka (UI/UX / curriculum sinchronas)**

- **`src/data/modules.json` — M12:** įvadas **120** – `minScenariosToComplete: 3`, lietuvinta kopija (praktikos vietoj „lab“, privaloma/rekomenduojama), ROI santrauka + nuoroda į doc §22; **120.5** – `optional`, `badgeVariant: optional`, sutrumpintas `whyBenefit`; skaidrės **121–123** pavadinimai „1/2/3 praktika“; **128** ir modulio `businessExamples` – be angl. žargono „delivery-first“ / „lab“. _(Vėliau tą pačią dieną skaidrė **128** pervesta į `type: "summary"` – žr. **[Unreleased] Changed (2026-04-07)** aukščiau.)_
- **`src/data/modules.json` — M10:** **10.1** – sąvokų blokas (įskaitant integraciją, API, polling, klaidas, logus), kelio apžvalga be vidinių `10.x` id; **10.15** – papildomi blokai (Integracija, API, Polling, Klaidų tvarkymas, Logai); **10.25** – antraštė „Trys juostos (80 / 15 / 5)“ vietoj klaidinančios „Lentelė“; **10.5** – antras ilgas `copyable` – **`collapsible`**, iš pradžių uždarytas; **10.2** – sumažintas `accent` pasikartojimas („Trumpai“ → `brand`).
- **`src/data/modules.json` — M11:** **112** – remediation tekstai su **modulio skaidrių eilės numeriais** (ne `10.1` ir pan.); **test-section** – du nauji situaciniai MCQ (**m11-q7**, **m11-q8**, `bloomLevel: 3`); **110** – `firstActionCTA` atnaujinta į **8 klausimus**.
- **Dokumentacija:** `docs/turinio_pletra_moduliai_10_11_12.md` (§4.1 skaidrė **10.3**; §7.1–7.2 – 8 MCQ ir situaciniai); `docs/MODULIO_10_SKAIDRIU_EILES.md` (M11 klausimų aprašas).

**Modulis 9: dominuojantis 8 žingsnių workflow (93–94); hub ir 17 scenarijų – papildomai**

- **`src/data/modules.json` (M9):** įvadas **90** – `primaryPathIntro`, kopija ir CTA pirmiausia į **Tęsti → 93–94**; santrauka **92** – workflow kaip pakankamas rezultatas, scenarijai kaip „daugiau praktikos“; **93–94** subtitle – pagrindinis projektas; modulio `description` suderinta su fokusu.
- **`docs/turinio_pletra_moduliai_7_8_9.md`:** §10.3 – supaprastintas variantas B (pagrindinis kelias 93–94; hub + scenarijai optional; nuoroda į skip į santrauką).
- **`src/components/slides/types/TestPracticeSlides.tsx`:** `PracticeIntroSlide` (M9) – viršuje pagrindinio kelio blokas; veikėjai / hub / kortelės **`details`** „Papildomai“; dinaminis skaičius **17** scenarijų; i18n raktai `testPractice.*`.
- **`src/components/SlideContent.tsx`:** `practice-summary` (M9) – `totalScenarioCount` iš `practiceScenarioSlides.length` (atsarginis **17**); `content-block` / `evaluator-prompt-block` – `onGoToSummary` tik **M9 skaidrei 94**.
- **`src/components/slides/types/ContentSlides.tsx`:** `ContentBlockSlide` – prop `onGoToSummary`; antrinis regionas **„Į santrauką (praleisti papildomus scenarijus)“** (tik M9, id 94), `ContentBlockSlide` pabaigoje (ne kitame komponente).
- **`src/locales/lt.json`, `en.json`:** `m9SkipToSummaryAria` / `Hint` / `Cta` ir susiję M9 įvado raktai.
- **`src/types/modules.ts`:** `PracticeSummaryContent.stats` komentaras – 17 scenarijų.

### Documentation (2026-04-07)

**Moduliai 10–12: gilaus UI/UX ir ugdymo kelio audito suvestinė**

Analizės rėmas: turinio SOT (`docs/turinio_pletra_moduliai_10_11_12.md`, `docs/MODULIO_10_SKAIDRIU_EILES.md`), `GOLDEN_STANDARD`, `UI_UX_AGENT`, `CURRICULUM_AGENT`. **2026-04-07** įrašyta **[Unreleased]** pradžioje: **Added / Changed** – M12/M15 `summary` + tier 3 sertifikatas; toliau taip pat **Fixed (2026-04-07)** ir **Changed (2026-04-07)** – M10–M12, M9 ir kt.

- **Skaidrė 128 (M12) ir 158 (M15):** vizualus paritetas su `SUMMARY_SLIDE_SPEC` – įgyvendinta 2026-04-07 (`type: "summary"`, žr. **[Unreleased] Changed (2026-04-07)**). **Vis dar atskiras etapas:** pilnas EN turinio sinchronas M10–M12 (ir naujų santraukų vertimas).

### Fixed (2026-03-28)

**Modulis 4, infografika „news-portal“: apačios CTA „Pirmyn →“ neperėjo į kitą skaidrę**

`ctaBlock` (pvz. „Toliau: Metodinis ir agentinis promptas…“ / „Pirmyn →“) buvo tik dekoratyvinis tekstas – vizualiai kaip kvietimas eiti toliau, bet be valdiklio. Dabar, kai skaidrė atidaroma per modulį, visas blokas yra paspaudžiamas mygtukas ir kviečia tą patį `nextSlide`, kaip viršuje „Tęsti“.

- **`src/components/slides/types/ContentSlides.tsx`:** `NewsPortalInfographicSlide` – optional `onNextSlide`; su `ctaBlock` ir callback – `<button>`, hover/fokusas, `aria-label`, `min-h-[44px]`; be callback – ankstesnis statinis variantas (pvz. preview).
- **`src/components/SlideContent.tsx`:** `infographic` + `variant: news-portal` perduoda `ctx.onNextSlide`.

**Modulis 4 ir kiti: `section-break` footer „Toliau – skaidrė N…“ – navigacija ir dublikato pašalinimas**

Violetinė juosta su rodykle (pvz. M4 skaidrė 40.5 → „skaidrė 11: DI skaičiai ir kontekstas“) buvo neinteraktyvi; tas pats tekstas dubliuotas italic footeriu `SlideContent` apačioje. Dabar su `onNextSlide` juosta yra paspaudžiamas mygtukas tiek su `recap`, tiek supaprastintoje šakoje be `recap` (M7+ skyrių įvadai); išorinis `SlideContent` footeris `section-break` tipui išjungtas.

- **`src/components/slides/types/ContentSlides.tsx`:** `SectionBreakSlide` – optional `onNextSlide`; bendras `footerNavBlock` (mygtukas arba ankstesnis `<section>` be callback).
- **`src/components/SlideContent.tsx`:** `section-break` perduoda `onNextSlide`; `showOuterFooter` – `false`, kai `slide.type === 'section-break'` (nėra dubliato).

### Added (2026-03-27)

**Modulis 7: haliucinacijų mažinimo pipeline skaidrė (67.7)**

Po skaidrės 67.5 (Saugumas), prieš 67.8 (Haliucinacijos) – vizuali 5 žingsnių schema (šaltiniai → patikra → struktūra → rizika → žmogaus peržiūra), adaptuota prie **GOLDEN_STANDARD** (brand / accent / slate, šviesi kortelė, be išorinių URL), LT ir EN etiketės komponente, `prefers-reduced-motion` palaikymas.

- **`src/components/HallucinationPipelineSlide.tsx`:** naujas komponentas; antraštė tik iš **ModuleView** (be vidinio dubliavimo).
- **Naujas skaidrės tipas `hallucination-pipeline`:** `src/types/modules.ts`, `scripts/schemas/modules.schema.json`, `src/components/SlideContent.tsx`, `src/utils/slidePhaseConfig.ts`.
- **`src/data/modules.json`:** skaidrė **id 67.7**; **Patikrumas ir etika** bloke atnaujinti „Toliau – skaidrė N“ footeriai (67.5 → 67.8 ir toliau +1).
- **Dokumentacija:** `docs/MODULIO_7_SKAIDRIU_EILES.md`, `docs/turinio_pletra_moduliai_7_8_9.md`, `docs/SKAIDRIU_TIPU_ANALIZE.md`.

### Fixed (2026-03-26)

**LT locale ir susiję šaltiniai: Input blokas (KONKREČIUS), Quality hero, praktikos hint**

- **`src/locales/lt.json`:** `blockInputBody` – **KONKRETIUS** → **KONKREČIUS** (galininkas prie „duomenis“); `blockQualityHero3` – **nuodyti** → **nurodyti**; `practiceTasksHint` – sutvarkytas linksnių derinimas ir **generatyvinio** → **generatyvinį** (prie „įrankį“).
- **`docs/archive/development/analysis/MODULIO_1_EN_UI_DIAGNOZE.md`:** citata sinchronizuota su **KONKREČIUS**.
- **`scripts/block_slides_extract.txt`:** ekstrakte **KONKREČIUS** (sinchronas su UI).

### Fixed (2026-03-22)

**jsPDF 4: visi PDF (sertifikatas, intro „Eksportuok PDF“, M5/M6 atmintinės) – „No unicode cmap“ ir `TypeError: ... widths`**

Produkcijoje `addFont(NotoSans-Regular.ttf)` su kai kuriais Noto TTF build’ais kėlė PubSub klaidą „No unicode cmap for font“; `useCustomFont` likdavo įjungtas, o `doc.text` krisdavo dėl `widths`. Papildomai `fetch('/fonts/...')` ignoravo Vite `base` (subpath deploy).

- **`src/utils/pdfNotoFont.ts`:** bendras cache, `import.meta.env.BASE_URL` + `fonts/Roboto-Regular.ttf` (pageidautina), atsarginis `NotoSans-Regular.ttf`; `registerUnicodePdfFont` – zondas su `getTextWidth('ąė')`, kad nebūtų pusiau užregistruoto šrifto.
- **`src/utils/introPiePdf.ts`, `certificatePdf.ts`, `m5HandoutPdf.ts`, `m6HandoutPdf.ts`:** naudoja `loadPdfUnicodeFont` / `registerUnicodePdfFont`; pašalinti dubliuoti cache.
- **`src/components/CertificateScreen.tsx`:** pašalintas `setCertificatePdfFontCache` (pakanka vieno modulio cache).
- **`scripts/download-noto-font.ps1`:** atsisiunčia **Roboto-Regular.ttf** į `public/fonts/` (Apache 2.0).
- **Testai:** `clearPdfUnicodeFontCache` beforeEach; CertificateScreen – `ensurePdfFont` assert vietoj font cache sinchronizacijos.

### Fixed (2026-03-22)

**LT ortografija: 6 blokų praktika, REASONING `partialSolution` („konkrečius žingsnius“)**

Neteisinga forma „konkretius“ kopijuojamame tekste (turėjo būti galininkas _konkrečius_, derinant su _žingsnius_).

- **`src/data/modules.json`, `src/data/modules-m1-m6.json`:** „Nurodyti konkretius žingsnius“ → „Nurodyti konkrečius žingsnius“.

### Fixed (2026-03-20)

**iOS Safari: įrankių nuorodos neatsidaro (window.open blokavimas)**

iPhone Safari blokuodavo `window.open()` naują skirtuką, nes prieš tai buvo kviečiamas asinchroninis `handleCopy()` (`await navigator.clipboard.writeText(…)`), ir iOS prarasdavo „user gesture" kontekstą. Android ir desktop naršyklės buvo atlaidesnės ir atidarydavo normaliai.

- **`src/components/VaizdoGeneratoriusSlide.tsx`:** `handleOpenTool` — pakeista veiksmų tvarka: pirma sinchroniškai `window.open(url, '_blank', 'noopener,noreferrer')`, fallback per `<a>` elementą jei `window.open` grąžina `null`, galiausiai `void handleCopy()` (asinchroninis kopijavimas neblokuoja gesto).

**EN mobili CTA etiketė sutrumpinta („Start scen…")**

Mobili apačios navigacijos juosta turėjo `truncate max-w-[140px]` — ilgesni EN vertimai (pvz. „Start scenario 3") buvo apkarpomi.

- **`src/components/ModuleView.tsx`:** Pakeista į `line-clamp-2 break-words hyphens-auto` su `flex-1 min-w-0` — dabar tekstas padalinamas į 2 eilutes, ne apkarpomas.

**Sisteminis EN lokalizacijos pataisymas (~50 hardcoded LT eilučių)**

EN vartotojai skaidrėse matė lietuvišką tekstą (pvz. „Įvesk visą promptą į lauką žemiau…", „Šaltiniai ir gairės", „Kas toliau", „Rezultatų palyginimas:" ir kt.). Priežastis — hardcoded Lithuanian strings komponentuose be `locale` patikros.

- **`src/components/slides/types/ContentSlides.tsx`:** Pridėta `isEn` 9 funkcijose (ActionIntroJourneySlide, ContentBlockSlide, WarmUpQuizSlide, AiWorkflowSlide, NewsPortalInfographicSlide, PracticeSummarySlide, PathStepSlide, HierarchyBlocksList, DiModalityCard); lokalizuota ~25 matomų tekstų ir ~10 aria-label; pridėta `DEFAULT_PRACTICE_SUMMARY_EN` (fallback kai EN content fields trūksta); ištaisyti 4× `rel="noreferrer"` → `"noopener noreferrer"`.
- **`src/components/slides/shared/PracticalTask.tsx`:** Lokalizuotas inputHint fallback, blokų pavyzdžiai, žingsnių skaičiuoklė, hint aria-label per `locale === 'en'` ternary.
- **`src/utils/sixBlockStructure.ts`:** Pridėta `BLOCK_EXAMPLES_EN` ir `getBlockExample(block, locale)` funkcija.
- **`src/components/slides/types/content/IntroActionPieSlide.tsx`:** Lokalizuota 12 hardcoded LT eilučių (sekcijų antraštės, aria-labels, CTA fallback, modal pavadinimas); `locale` prop pridėtas `HorizontalBarChartViz` ir `IntroActionPieTipsModal`.
- **`src/components/slides/types/shared/RecognitionExerciseBlock.tsx`:** Pridėta `useLocale`; lokalizuoti 3 tekstai (aria-label, „Teisingas atsakymas:", „Tikslas:").
- **`src/components/slides/shared/CharacterCard.tsx`:** Pridėta `useLocale`; lokalizuoti 2 aria-labels.
- **`src/components/slides/shared/WorkflowComparisonDiagram.tsx`:** Lokalizuotas „DI naudojimo schema:" aria-label prefix.

**`rel="noopener noreferrer"` suvienodinimas**

5 vietose buvo `rel="noreferrer"` be `noopener` — saugesnė ir konsistentiška praktika reikalauja abiejų.

- **`src/components/slides/types/ContentSlides.tsx`:** 4 vietos.
- **`src/components/HallucinationRatesDashboard.tsx`:** 1 vieta.
- **`src/components/slides/types/content/ActionIntroSlide.tsx`:** 1 vieta (ankstesnis taisymas).
- **`src/components/AiDetectorsSlide.tsx`:** 1 vieta (ankstesnis taisymas).

**TypeScript: trūkstamas `isEn` kintamasis `SectionBreakSlide` ir `DefinitionsSlide`**

Lokalizacijos pakeitimų metu `isEn` buvo naudojamas 2 funkcijose, bet nebuvo apibrėžtas, kas sukėlė 8 TypeScript klaidas CI.

- **`src/components/slides/types/ContentSlides.tsx`:** Pridėta `useLocale()` ir `isEn` apibrėžimas `SectionBreakSlide` (7 klaidos: 1854, 1884, 1920, 2002, 2026, 2045, 2048) ir `DefinitionsSlide` (1 klaida: 2789).

### Fixed (2026-03-19)

**Stale chunks auto-recovery — „Something went wrong" klaida po deploy**

Po naujo deploy Vite sugeneruoja JS chunk failus su naujais hash vardais, o seni failai ištrinami. Vartotojai su cached `index.html` bandydavo parsiųsti senus chunk failus (404) ir matydavo „Something went wrong" klaidą. Dabar aplikacija automatiškai atpažįsta chunk load klaidą ir perkrauna puslapį, kad gautų naują `index.html` su teisingomis chunk nuorodomis.

- **`src/utils/lazyWithRetry.ts`:** Pridėta `isChunkLoadError()` detekcija (atpažįsta `Failed to fetch dynamically imported module`, `ChunkLoadError` ir pan.). Po 3 nesėkmingų retry, jei klaida yra chunk load failure, automatiškai iškviečiamas `window.location.reload()`. `sessionStorage` flag (`chunk-reload-attempted`) apsaugo nuo begalinių reload ciklų. Eksportuota `clearChunkReloadFlag()` — iškviečiama iš `main.tsx` po sėkmingo app load.
- **`src/main.tsx`:** Iškviečiama `clearChunkReloadFlag()` po sėkmingo puslapio įkrovimo — atstato apsaugos flag kitam deploy ciklui.
- **`index.html`:** Pridėti `cache-control`, `pragma`, `expires` meta tags — nurodo naršyklei nekešinti HTML failo (JS/CSS assets kešinami pagal hash).
- **`src/components/ui/ErrorBoundary.tsx`:** `componentDidCatch` papildytas chunk error detekcija — backup auto-reload, jei `lazyWithRetry` nepagavo klaidos (ta pati `isChunkLoadError` + `sessionStorage` apsauga).

**Prieigos vartai (access gate) — mokamas turinys uždarytas lankytojams be prieigos**

Iki šiol `VITE_MVP_MODE=1` produkcijos build'e automatiškai atrakindavo visus 6 modulius kiekvienam lankytojui, nepriklausomai nuo apmokėjimo. Dabar turinys pagal nutylėjimą užrakintas (`maxAccessible = 0`), kol vartotojas patvirtina prieigą per magic link arba turi išsaugotą tier localStorage.

- **`src/utils/accessTier.ts`:** Pašalintas `VITE_MVP_MODE=1` fallback (`return 6`); default dabar `return 0` (užrakinta). `sessionStorage` pakeistas į `localStorage` su vienkartine migracija iš sessionStorage (esami patikrinti vartotojai nepraranda prieigos).
- **`src/App.tsx`:** Magic link verifikacijos rezultatas saugomas į `localStorage` (buvo `sessionStorage`), kad prieiga išliktų uždarius tab'ą.
- **`src/components/AccessGateScreen.tsx`:** Naujas gate komponentas — rodomas kai `maxAccessible === 0`. Lock ikona, „Prieiga ribota" pranešimas, CTA mygtukas į kainodarą (`promptanatomy.app/#pricing`).
- **`src/components/ModulesPage.tsx`:** Integruotas gate ekranas — kai `maxAccessible === 0`, vietoj modulių sąrašo rodomas `AccessGateScreen`.
- **`src/locales/lt.json`, `src/locales/en.json`:** Pridėti gate vertimo raktai (`gateTitle`, `gateMessage`, `gateCta`).
- **`src/utils/__tests__/accessTier.test.ts`:** Testai atnaujinti: `sessionStorage` → `localStorage`, pridėti testai default=0, migracija, localStorage prioritetas (13 testų, visi praeina).

---

## [1.3.0] – 2026-03-16

Production release: deploy veikia, integruoti mokėjimai marketingo tinklalapyje, pirmas pirkimas. Šis release apima visus pakeitimus nuo 2026-03-12 iki 2026-03-16.

### Changed (2026-03-14)

**CI workflow atnaujinimas Node 24 perspėjimams mažinti**

Saugiai atnaujintos oficialių GitHub Actions versijos workflow lygyje, neliečiant aplikacijos dependency grandinės ar integracijos su didesniu `promptanatomy` projektu.

- **`.github/workflows/test.yml`:** `actions/checkout` atnaujintas `v4` → `v6`, `actions/setup-node` `v4` → `v6`; paliktas `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24=true`.
- **`.github/workflows/deploy.yml`:** `actions/checkout` atnaujintas `v4` → `v6`, `actions/setup-node` `v4` → `v6`, `actions/configure-pages` `v4` → `v5`, `actions/upload-pages-artifact` `v3` → `v4`.
- **`codecov/codecov-action@v3`:** Sąmoningai nejudintas šiame žingsnyje, kad nekiltų papildoma rizika dabartinei CI ir didesnio projekto integracijai.

### Added (2026-03-14)

**Production hardening + brand assetai**

CI/CD, a11y, SEO, developer experience ir brand tapatumo pagerinimai -- saugūs, nepriklausomi pakeitimai.

- **`.nvmrc`:** Naujas failas (`18`) -- Node.js versijos fiksavimas.
- **`public/robots.txt`:** Naujas failas -- leidžia indeksavimą, nurodo sitemap.
- **`public/favicon.svg`:** Naujas failas -- geltonas žaibas tamsiame fone (brand sync su promptanatomy.app).
- **`public/apple-touch-icon.png`:** Naujas failas (180×180) -- iOS home screen ikona su žaibu.
- **`public/og-image.png`:** Naujas failas (1200×630) -- OG socialinio dalinimosi paveikslas su „PROMPTŲ ANATOMIJA" tekstu.
- **`index.html`:** Favicon pakeistas iš Vite į brand žaibą; pridėti `apple-touch-icon`, `theme-color` (#0d0d0d), OG ir Twitter meta žymės (title, description, image).
- **`src/App.tsx`:** `<Helmet>` papildytas dinaminėmis `og:title` ir `og:description` meta žymėmis.
- **`package.json`:** Pridėti `typecheck`, `analyze`, `prepare` scriptai; `lint-staged` konfigūracija.
- **`.github/workflows/test.yml`, `deploy.yml`:** Pridėtas `tsc --noEmit` type check žingsnis CI pipeline.
- **`vite.config.ts`:** Pridėtas `rollup-plugin-visualizer` (sąlyginis, tik su `ANALYZE=true`).
- **Husky + lint-staged:** Pre-commit hook su ESLint + Prettier.
- **`src/index.css`:** Pridėta `prefers-reduced-motion: reduce` media query (WCAG 2.1 a11y).

### Changed (2026-03-14)

**Brand identity ir logo UI derinimas**

Brand ženklas suvienodintas su `promptanatomy.app`, o vėlesnėse iteracijose jo pateikimas UI sušvelnintas nekeičiant žaibo idėjos ar gold akcento.

- **`tailwind.config.js`:** Pridėta `gold: '#f3cc30'` spalva -- leidžia naudoti `text-gold`, `bg-gold/10`, `shadow-gold/5` vietoj hardcoded `[#f3cc30]`.
- **`src/index.css`:** Pridėta `:root { --brand-gold: #f3cc30; }` CSS custom property; `gradient-text-hero` ir hero CTA pervesti į centralizuotą gold gradientą; dark mode fonas `bg-gray-900` → `#0d0d0d`.
- **`src/components/AppNav.tsx`:** Nav logo ikona `Sparkles` → `Zap`; `text-[#f3cc30]` → `text-gold`; logotipo badge fonas pakeistas iš beveik juodo į švelnesnį `brand` toną su lengvu ring ir minkštesniu šešėliu.
- **`src/components/HomePage.tsx`:** Hero ikona `Target` → `Zap`; hero mesh orbs, duration badge, trust checkmarks ir kiti gold akcentai suderinti su brand sistema; hero ženklo konteineris vėliau sušvelnintas per ramesnį `brand` toną, mažesnį glow ir kuklesnį hover scale.

### Fixed (2026-03-14)

**M1-M6 bug bundle – shared locale leak'ai, Custom GPT schema, mobile reflow**

Uždarytas sisteminis M1-M6 bug bundle, kuris taiso ne pavienes skaidres, o bendrus renderer'ius ir diagramų wrapper'ius.

- **`src/components/slides/shared/CustomGptProcessDiagram.tsx`:** Visi vartotojui matomi `Custom GPT` schemos tekstai perkelti į `stepper` i18n; pridėtas `COMPACT_LAYOUT`, kad siaurame mobile view schema persidėliotų be priverstinio horizontal scroll.
- **`src/components/slides/shared/ProcessStepper.tsx`:** Pašalintas atskiras mobile scroller wrapperis `Custom GPT` schemai; diagrama dabar remiasi savo reflow logika ir turi `data-slide-swipe-lock`.
- **`src/components/slides/shared/MobileDiagramScroller.tsx`, `src/components/slides/shared/EnlargeableDiagram.tsx`:** Įvestas bendras kontraktas `behavior="scroll" | "reflow"` mobiliosioms diagramoms.
- **`src/components/slides/shared/DiPrezentacijosWorkflowBlock.tsx`:** `DI prezentacijos` schema mobile režime perjungta į `reflow`, o ne bendrą horizontal scroll.
- **`src/components/slides/types/ContentSlides.tsx`:** Išvalyti M1 EN UI hardcode `Prompt types` / `Prompt techniques` ir solution reveal šakose: `Rezultatas`, `Praktinis patarimas`, `Technikų logika`, `Vengti`, `Kokie principai pažeidžiami?`, `Pataisytas variantas`, `Kas pasikeitė?`.
- **`src/components/slides/types/ContentSlides.tsx` (2 banga):** Papildomai išvalyti likę locale fallback tekstai bendruose `content` rendererio keliuose: `Choose your journey`, `Expand all`, `Collapse all`, `When and how to use`, `Open in new tab`, `View tools`, `Practice: fix the prompt`, `Your corrected version`, `Context engineering pipeline diagram`.
- **`src/components/slides/shared/InstructGptQualityBlock.tsx`, `WorkflowChainsBlock.tsx`, `FigmaEmbed.tsx`:** Uždaryti likę shared locale leak'ai, įskaitant `aria-label` ir fallback tekstus.
- **`src/locales/lt.json`, `src/locales/en.json`:** Pridėti nauji raktai `stepper` ir `contentSlides` namespace'ams (`diagramTitle`, `diagramStep*`, `promptTypesHeroTitle`, `promptTechniquesLogicTitle`, `figmaDiagramTitle`, `mainTakeawaySummaryAria`, `journeyHeading`, `expandAllLabel`, `presentationToolsHint`, `openInNewTabLabel`, `viewToolsLabel` ir kt.).
- **`docs/archive/development/analysis/M1_M6_BUG_BUNDLE_AUDIT_MATRIX.md`:** Nauja M1-M6 audit coverage matrica su `audited / partial / missing` būsena ir po-bundle snapshot.
- **`docs/development/TEST_REPORT.md`:** Dokumentuotas bug bundle rezultatas ir automatinės patikros įrodymai.

### Added (2026-03-14)

**Locale/mobile regresijos saugikliai bug bundle šakoms**

- **`src/components/slides/shared/__tests__/ProcessStepper.locale.test.tsx`:** Smoke testas EN locale + compact mobile layout `Custom GPT` schemai.
- **`src/components/slides/types/content/__tests__/ContentSlides.locale.test.tsx`:** Smoke testai M1 `PromptTypesSlide` ir `PromptTechniquesSlide`, kad EN režime neliktų LT helper tekstų.

### Changed (2026-03-14)

**Sisteminė mobile UI iteracija – swipe guard, compact schemos, landscape nav**

Atliktas ne pavienis mobile fix, o bendras gesture + wrapper + compact layout sluoksnis, kad schemos mobiliame režime būtų stabilesnės ir skaitomesnės.

- **`src/utils/useSlideNavigation.ts`:** Įvestas centralizuotas `swipe-lock` mechanizmas – swipe ignoruojamas, jei touch prasideda interaktyvioje zonoje (`data-slide-swipe-lock`, `button`, `a`, `input`, `[role="button"]` ir pan.). Mobile swipe threshold padidintas iki 80px; pridėtas `handleTouchCancel()`.
- **`src/components/ModuleView.tsx`:** Skaidrės wrapper dabar naudoja `onTouchCancel`; mobile viršutinis counter, bottom nav shell, mygtukų aukštis ir spaceris kompaktiškėja landscape / low-height režime.
- **`src/utils/useCompactViewport.ts`:** Naujas bendras hook diagramų compact režimui ir mažo aukščio navigacijai (`isCompactDiagram`, `isCompactNav`).
- **`src/components/slides/shared/MobileDiagramScroller.tsx`:** Naujas bendras mobile diagramų scroller wrapperis su `data-slide-swipe-lock`, horizontaliu scroll ir optional fade/hint.
- **Suvienodinti wrapperiai:** `EnlargeableDiagram.tsx`, `ProcessStepper.tsx`, `DiPrezentacijosWorkflowBlock.tsx`, `WorkflowComparisonInteractiveBlock.tsx`, `LlmAutoregressiveBlock.tsx` perkelti ant bendro mobile scroller kontrakto vietoj pavienių `overflow-x-auto + minWidth` blokų.
- **Compact schemos (1 banga):**
  - `ContextFlowDiagram.tsx` – horizontalus 3 blokų flow mobile/compact režime perstatomas į vertikalų.
  - `TurinioWorkflowDiagram.tsx` – pilna 7 žingsnių schema mobile režime susiaurinta be horizontalaus scroll kaip vienas stulpelis.
  - `AgentWorkflowDiagram.tsx` – horizontalus agentų ciklas mobile režime perstatytas į vertikalų stulpelį su kairiniu feedback path.

### Fixed (2026-03-14)

**EN mobile UI reliktas + touch regresijos apsauga**

- **`src/components/slides/types/ContentSlides.tsx`:** Hardcoded LT antraštės `Ar brief pilnas? (savitikra)` ir `Prieš kopijuojant: ar brief pilnas?` perkeltos į locale-aware tekstus per `contentSlides` i18n.
- **`src/locales/lt.json`, `src/locales/en.json`:** Pridėti `briefCheckHeading` ir `preCopyCheckHeading` raktai; EN režime rodoma „Is the brief complete? (self-check)“ ir „Before copying: is the brief complete?“.
- **`src/utils/__tests__/useSlideNavigation.touch.test.tsx`:** Nauji 3 regresiniai testai – swipe veikia paprastoje zonoje, neveikia `data-slide-swipe-lock` zonoje ir neveikia ant interaktyvaus `button`.
- **`docs/development/TEST_REPORT.md`:** Dokumentuotas naujas sisteminis mobile UI incidentas ir atlikta automatinė patikra (`test:run`, `lint`, `typecheck`, `build`).

### Fixed (2026-03-14)

**Sertifikato PDF atsisiuntimas po Modulio 3 (Tier 1)**

- **`src/utils/introPiePdf.ts`:** Pridėta `getCachedPdfFontBase64()` – šrifto cache getter, kad kiti moduliai galėtų pakartotinai naudoti jau užkrautą šriftą.
- **`src/components/CertificateScreen.tsx`:** Po `ensurePdfFont()` šrifto cache perduodamas `certificatePdf` moduliui per `setCertificatePdfFontCache()` – eliminuotas dvigubas async šrifto krovimas iš tinklo, dėl kurio naršyklė galėjo blokuoti `doc.save()` (prarastas vartotojo gesto kontekstas). Pridėtas `catch` blokas su `downloadError` state ir vartotojui matomu klaidos pranešimu (`role="alert"`).
- **`src/components/__tests__/CertificateScreen.test.tsx`:** Pridėti 2 nauji testai: šrifto cache sinchronizacija tarp modulių ir klaidos pranešimas kai atsisiuntimas nepavyksta.

### Fixed (2026-03-14)

**LoadingSpinner build warning**

- **`src/components/ui/LoadingSpinner.tsx`:** Ištaisytas duplicate key `lg` -- pirmas `lg` pakeistas į `md` (build warning dingo).

### Fixed (2026-03-14)

**TypeScript regresijos – typecheck ir testai žali**

- **`src/utils/lazyWithRetry.ts`:** `ComponentType<unknown>` → `ComponentType<any>` (lazy komponentai priima skirtingus props; ESLint no-explicit-any leidžiamas su komentaru).
- **`src/utils/analytics.ts`:** Į `destination` tipą pridėta reikšmė `'download'` (CertificateScreen, ModuleCompleteScreen).
- **`src/components/SlideContent.tsx`:** `onComplete` parametras `(score?: number)`; **App.quiz.integration.test.tsx:** `timeout` perkeltas į trečią argumentą (`findByRole`/`findByText` waitForOptions).
- **`src/i18n.ts`:** `getT()` options tipas pataisytas (be `i18n.TOptions`).
- **`src/types/modules.ts`:** `blockVariant` papildytas `'emerald' | 'violet'`. **ContentSlides.tsx:** `onGoToGlossaryTerm?.(term)`; pašalintas nenaudojamas `_KPI_COLORS`.
- **Nenaudojami kintamieji pašalinti:** AgentWorkflowDiagram, LlmAutoregressiveBlock, RlProcessDiagram, Schema3InteractiveDiagram, schema3Layout, analytics, m5HandoutPdf.
- **`src/data/__tests__/modulesLoader.test.ts`:** `minimalModule()`, pilni Module/Quiz tipai, content assertions su type cast; **modulesLoader.ts:** merge cast `as unknown as Partial<ModulesData>`.
- **IntroActionPieSlide.pdf.test.tsx:** `revealInsights` naudoja `insight` ir `question` (ne `heading`/`body`). **validate-schema.integration.test.ts:** `@ts-nocheck` (Node built-ins ne pagrindiniame tsconfig); **setup.ts:** `processStub.cwd = () => '.'`, `NodeJS.ProcessEnv` → `Record<string, string | undefined>`.
- **`package.json`:** Pridėta `@types/node` (devDependency).

### Changed (2026-03-14)

**CI: package-lock sinchronizacija, lint-staged su Node 18**

- **`package.json`:** `lint-staged` ^16.3.3 → ^15.2.10 (Node 18 palaikymas; 16.x reikalauja Node ≥20.17).
- **`package-lock.json`:** Atnaujintas po `npm install` – sutampa su package.json (išvengiama „Missing from lock file“ per `npm ci`).

### Fixed (2026-03-14)

**ESLint – pateisinti disable komentarai**

- **`src/test/validate-schema.integration.test.ts`:** `eslint-disable @typescript-eslint/ban-ts-comment` (Node-only testas, be Node tipų pagrindiniame tsconfig).
- **`src/utils/lazyWithRetry.ts`:** `eslint-disable-next-line @typescript-eslint/no-explicit-any` (generic turi priimti bet kokius props lazy registry).

### Changed (2026-03-14)

**GitHub Actions – Node 24 opt-in JS actions**

- **`.github/workflows/test.yml`, `deploy.yml`:** Pridėtas `env: FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: 'true'` – JavaScript actions (checkout, setup-node, configure-pages, deploy-pages) naudoja Node 24; išvengiamas „Node.js 20 actions are deprecated“ įspėjimas. Projekto build/test Node versija (18.x, 20.x) nepakeista.

### Changed (2026-03-13)

**Struktūrinis mobile UI fix – viena navigacija, lg: breakpoint, diagramų scrollable režimas**

Pilnas mobile UI perstatymas: ne dar vienas `hidden` sluoksnis, o architektūrinis pokytis. Visas projektas dabar naudoja vieną breakpoint'ą `lg:` (1024px) vietoj buvusio `md:` (768px).

- **Navigacija (ModuleView):** Mobile (<1024px) – viršuje tik kompaktiškas counter „M1 · 7/21" + progress bar (~24px); apačioje fixed nav su Atgal/Tęsti mygtukais. Desktop (lg+) – pilna top nav su Atgal/counter/Tęsti. Pašalinta dviguba navigacija (buvo sticky top + fixed bottom = ~21-24% viewport).
- **Atgal mygtukas:** `whitespace-nowrap` + `shrink-0` – nebewrappina vertikaliai. Bottom nav Atgal su `whitespace-nowrap`. Tęsti CTA – `max-w-[60%]` + `truncate`.
- **Breakpoint migracija md: → lg: (visas src/):** 140+ `md:` Tailwind klasių pakeistos į `lg:` – navigacija, visibility, grid layout, padding, text size, width/height, gap, divider direction. 24 komponentų failai + `design-tokens.ts` + `index.css`. Nulinis `md:` likutis visame `src/`.
- **Landscape fix:** Samsung S24 landscape (915px) dabar gauna mobile layout (915 < 1024), ne desktop nav.
- **Diagramos mobile (EnlargeableDiagram):** Mobile – diagrama renderinama horizontaliai scrollable konteineryje su `minWidth: 600px` (pilno dydžio, skaitoma); fade gradient hint. Desktop – be pakeitimų.
- **Standalone diagramos:** `WorkflowComparisonInteractiveBlock` (M1), `LlmAutoregressiveBlock` (M4), `ProcessStepper`/CustomGPT (M4), `DiPrezentacijosWorkflowBlock` (M5) – mobile scrollable wrapper.
- **Shared hook:** `src/utils/useIsMobile.ts` – `matchMedia(<1024px)`.
- **HomePage hero:** Mobile kompaktiškesnis – `py-10` (buvo `py-16`), `text-5xl` (buvo `text-6xl`), `mb-6`/`mb-8` (buvo `mb-10`/`mb-14`). ~90-100px sutaupyta viewport aukščio.
- **Quiz padding:** `QuizPage` ir `QuizResultsView` – `p-4 sm:p-6 lg:p-8/12` (buvo `p-8`). 375px turinio plotis padidėjo ~64px.
- **TEST_REPORT.md:** Atnaujinta Mobile QA kriterijų lentelė su nauja navigacijos architektūra.

### Fixed (2026-03-13)

**EN UI/UX bug bundle – skaidrės, diagramos, PDF**

Ištaisyti EN UI/UX trūkumai pagal bug bundle: refleksijos skaidrė, RL diagrama, ActionIntroSlide, M5 handout PDF, footer/nav tekstai.

- **modules-en-m4-m6.json:** Skaidrė 66.97 (refleksija) – `title` pakeistas iš „3 klausimai sau“ į „3 questions for yourself“; section „Next step“ – `body` sutrumpintas į „Pick one option below.“
- **modules-en-us-overrides.json:** Tas pats „Next step“ body – „Pick one option below.“
- **ActionIntroSlide:** Keturi hardcoded LT stringai („Tuščias promptas“, „Neaiškus tikslas…“, „6 blokų promptas“, „Aiškus kontekstas…“) pakeisti į i18n – pridėti `emptyPromptLabel`, `emptyPromptNote`, `structuredPromptLabel`, `structuredPromptNote` į `src/locales/lt.json` ir `en.json`; komponentas naudoja `t()`.
- **RlProcessDiagram:** Pilna EN lokalizacija – `STEPS_ROW_EN` / `STEPS_GRID_EN` (Agent, Environment, Action, Reward), `FORWARD_LABELS_EN`, `FEEDBACK_LABEL_EN`, diagramos antraštė („RL process structure“ / „RL structure“), `aria-label` ir click rect aria-label EN, feedback path `<title>` EN; `useLocale()` naudojamas pasirinkimui.
- **RlProcessBlock:** „You are here“ eilutei pridėtas `whitespace-nowrap`, kad „1. Agent“ nesulipėtų į „Agent1“.
- **M5 handout PDF:** Po footer teksto pridėta antra eilutė su spaudžiama nuoroda – „More: “ / „Daugiau: “ + `textWithLink('www.promptanatomy.app', …, { url: 'https://www.promptanatomy.app/' })` (`src/utils/m5HandoutPdf.ts`).
- **M5 handout PDF testai:** `doc.getTextWidth is not a function` – testų mockas papildytas `getTextWidth`; `m5HandoutPdf.ts` naudoja helperį `getWidth(doc, text)`, kuris palaiko ir `getTextWidth`, ir `getTextDimensions` (jsPDF versijų suderinamumui). `src/utils/__tests__/m5HandoutPdf.test.ts` – mock įtraukia `getTextWidth`.

### Fixed (2026-03-13)

**Pre-deploy auditas – README ir LlmArchDiagramDiagram**

Gili kodo bazės analizė prieš deploy: schema, lint, testai, build – visi praeina. Atlikti pataisymai:

- **README.md:** GitHub Pages prieiga pakeista iš `ditreneris.github.io/anatomija/` į `ditreneris.github.io/inzinerija/`; pastaba apie base path – production default `/inzinerija/`.
- **LlmArchDiagramDiagram.tsx:** ResizeObserver naudojamas per guard (kaip AppNav) – tik jei `window.ResizeObserver` egzistuoja; išvengiama klaidos senose naršyklėse arba edge testuose.
- **docs/development/PRE_DEPLOY_AUDIT_2026-03-13.md:** Naujas dokumentas – audito santrauka, kas anksčiau nepavyko (CHANGELOG/TEST_REPORT), šios analizės pataisymai, rekomenduojami žingsniai ir žemos rizikos darbai.

### Changed (2026-03-13)

**Mobilaus UI sumažinimas (de-clutter) – mažiau detalių, aiškesnė esmė**

Mažame ekrane sumažintas informacijos tankis (~10–20 %): pašalintas dubliavimas, paslėpti antriniai elementai, išlaikyta viena aiški navigacija ir CTA. Tikslas – neprarasti mobile vartotojų.

- **AppNav:** Mobile rodomas trumpesnis pavadinimas (`appTitleShort`: „P. anatomija“ / „Prompt Anatomy“); progreso procentas mobile paslėptas – lieka tik juosta. **i18n:** `src/locales/lt.json`, `src/locales/en.json` – pridėtas `nav.appTitleShort`.
- **ModuleView – fixed bottom bar:** Centro blokas „Modulis 4 · 3/41“ mobile paslėptas (`hidden md:flex`) – lieka tik Atgal + Tęsti.
- **ModuleView – SlideGroupProgressBar:** Fazių etiketės mobile paslėptos (`hidden md:inline`) – rodomos tik spalvotos juostos.
- **ModuleView – Progress info (po turiniu):** Visas blokas (modulių taškai, skaidrės skaitiklis, fazių juosta) mobile paslėptas (`hidden md:block`).
- **ModuleView – Slide dots:** Visų skaidrių taškų eilutė mobile paslėpta (`hidden md:flex`).
- **ModuleView – Subtitle:** Skaidrės subtitle mobile paslėptas (`hidden md:block`) – rodomas tik H1.

### Changed (2026-03-12)

**Deploy į DITreneris/inzinerija – base path ir repo nuorodos**

Kad deploy į [GitHub inzinerija](https://github.com/DITreneris/inzinerija/) veiktų (GitHub Pages: `https://ditreneris.github.io/inzinerija/`), base path turi būti `/inzinerija/`, ne `/anatomija/`.

- **.github/workflows/deploy.yml:** Visiems build step'ams pridėtas `VITE_BASE_PATH: '/inzinerija/'`.
- **vite.config.ts:** Numatytasis production base pakeistas į `/inzinerija/`.
- **package.json:** repository.url, bugs.url, homepage – nurodo į `DITreneris/inzinerija` ir `ditreneris.github.io/inzinerija/`.
- **.env.example:** `VITE_BASE_PATH=/inzinerija/` + komentaras.
- **README.md:** clone URL → `github.com/DITreneris/inzinerija.git`.
- **docs/deployment/PRE_DEPLOY_INZINERIJA.md:** Naujas dokumentas – pre-deploy analizė ir checklist.
- **docs/deployment/DEPLOYMENT.md:** Lentelėje default base path nurodyta `/inzinerija/`.

### Changed (2026-03-13)

**Golden ir Gold Legacy dokumentų pertvarka – atsakomybės ir SOT**

GOLDEN_STANDARD ir GOLD_LEGACY_STANDARD aiškiai suskirstyti: turinio/dizaino SOT – tik GOLDEN; GOLD_LEGACY – techninė atspirties būsena. Priskirti dokumentų savininkai agentams.

- **.cursor/rules/agent-orchestrator.mdc:** SOT lentelėje pridėta GOLD_LEGACY_STANDARD.md; pastaba „Turinio ir dizaino taisyklės – tik GOLDEN_STANDARD.md; GOLD_LEGACY – tik techninė būsena“.
- **docs/DOCUMENTATION_QUICK_REF.md, docs/LEAN_INDEX.md, docs/DOCUMENTATION_INDEX.md:** GOLD_LEGACY įtrauktas į SOT/indeksus (techninė atspirties būsena; savininkas QA_AGENT).
- **docs/development/AGENT_ORCHESTRATOR.md:** SOT eilutė GOLD_LEGACY; naujas skyrius „Dokumentų savininkai“ (GOLD_LEGACY → QA_AGENT; GOLDEN → UI_UX_AGENT, CONTENT_AGENT; release peržiūra → QA_AGENT).
- **docs/development/GOLD_LEGACY_STANDARD.md:** Įvade nuoroda į GOLDEN_STANDARD kaip turinio/dizaino SOT; §22.2 ir §22.3 sutrumpinti – tik nuoroda į GOLDEN, be dubliavimo.
- **docs/development/GOLDEN_STANDARD.md:** Įvade nuoroda į GOLD_LEGACY (techninė apžvalga, inventorius).

### Changed (2026-03-13)

**Haliucinacijos Modulyje 7 – SOT, standartai ir kodo sinchronizavimas**

Haliucinacijų ir žinių patikrinimo tema perkelta į Modulį 7 (blokas „Patikrumas ir etika“). Atnaujinti SOT, JSON ir kodas, kad nuorodos rodytų į M7, ne į Modulio 4 (4.6).

- **SOT:** `docs/turinio_pletra_moduliai_4_5_6.md` – SUPER PROMPTAI skyrius (perėjimas prie haliucinacijų → Modulio 7, skaidrės 67.8, 68). `docs/turinio_pletra_moduliai_7_8_9.md` – nuorodos 4.6 → M7. `docs/CONTENT_MODULIU_ATPAZINIMAS.md` – Modulio 4 aprašas patikslintas (pilnas haliucinacijų blokas – M7). `docs/development/AUDIT_SKAIDRE_63_SUPER_PROMPTAI.md` – nuorodos į M7.
- **Duomenys:** `modules.json`, `modules-m1-m6.json` – skaidrė 63 (SUPER PROMPTAI) body M4→M7; „Daryk dabar“ blockVariant violet→brand; RAG/quiz/label/path-step ir M7 vidinės nuorodos (4.6/4.6a) pakeistos. `modules-en-us-overrides.json`, `modules-en-m4-m6.json` – atitinkami EN pakeitimai (Module 7, Hallucinations, Fact-checking).
- **Kodas:** `src/data/aiDetectors.ts` – komentaras „Modulis 4, sekcija 4.6“ → „Modulio 7, Patikrumas ir etika“.

### Fixed (2026-03-13)

**DiPrezentacijosWorkflowDiagram – ARROW_MARKER_LEN neapibrėžtas (skaidrė 47)**

Skaidrė „Kas yra 15 min sprintas ir ką daryti pirmiausia“ (id: 47, Modulis 5) mėtė `ReferenceError: ARROW_MARKER_LEN is not defined` – rodyklės linijos pabaigoje naudojama konstanta nebuvo apibrėžta faile.

- **src/components/slides/shared/DiPrezentacijosWorkflowDiagram.tsx:** Pridėta `const ARROW_MARKER_LEN = 6;` (atitinka markerio refX ir path), rodyklės edge-to-edge geometrija išlaikyta.

### Fixed (2026-03-12)

**ResizeObserver neapibrėžtas testuose (jsdom) – CI failina**

Vitest/jsdom aplinkoje `ResizeObserver` nėra; AppNav naudojo jį tiesiogiai, todėl integraciniai testai (App.quiz.integration) mėtdavo `ReferenceError: ResizeObserver is not defined` ir CI failindavo.

- **src/test/setup.ts:** Pridėtas **ResizeObserver** mock – `vi.stubGlobal('ResizeObserver', ResizeObserverMock)` ir priskyrimas į `globalThis`, `window`, `global`, kad būtų prieinamas visuose Vitest workeriuose. IntersectionObserver perkeliamas į `vi.stubGlobal` dėl vienodumo.
- **src/components/AppNav.tsx:** ResizeObserver naudojamas tik per **`window.ResizeObserver`** ir guard `if (!el || !Ctor) return` – jei API nėra (pvz. senas jsdom be mock), efektas tiesiog nevykdomas, komponentas nebekrenta.
- **docs/development/VERSION_ANALIZE.md:** Versijavimo analizė – kur identifikuoti versiją (package.json), ar galima keisti (1.3.0), kada „dar anksti“.

**PNG vaizdai nerodomi po deploy (base path)**

Production build naudoja `base: '/anatomija/'` (Vite). Vaizdų keliai iš JSON (`/Dante_visata.png`, `/DI_visata.png`, `workflowImages`, `character.imagePath`) buvo naudojami be `import.meta.env.BASE_URL`, todėl naršyklė kreipėsi į svetainės šaknį vietoj `/anatomija/...` – 404.

- **ContentSlides.tsx:** `comparisonImages.left.src` ir `comparisonImages.right.src` – pridedamas BASE_URL prieš kelį; `workflowImages[].src` – tas pats.
- **CharacterCard.tsx:** `character.imagePath` (veikėjų PNG) – pridedamas BASE_URL.

**EN UI: `AdvancedBlockSlide` data-driven refactor – ~40 hardcoded LT stringų**

`AdvancedBlockSlide.tsx` (skaidrė 16/21 „6 Advanced Parameters") turėjo ~40 hardcoded lietuviškų stringų (temperature skalė, reasoning lygiai, cheat sheet lentelė, copy pavyzdžiai, klaidų sąrašas). Perjungus UI į EN – visas turinys likdavo lietuviškai (išskyrus `veiksmoIntro`).

- **modules.ts:** Nauja `AdvancedSlideContent` interface su ~20 laukų (heroTitle, temperatureLevels, cheatSheetRows, examples, errors ir t.t.).
- **modules.json (id 11):** Visi LT tekstai perkelti į `content` laukus – komponentas tapo pure renderer.
- **modules-en.json (id 11):** Pilni EN vertimai visų naujų laukų.
- **AdvancedBlockSlide.tsx:** Perrašytas – skaito visą turinį iš `slide.content`, nulinis hardcoded stringų kiekis. Vizualinis output'as nepakito.

**EN UI: `prompt-template` skaidrėje hardcoded LT tekstai**

`PromptTemplateSlide` komponentas (skaidrė 7/21 „Good prompt template") turėjo 4 hardcoded lietuviškus stringus, kurie neėjo per i18n. Perjungus UI į EN – intro, sub-headline ir template label'ai likdavo lietuviškai.

- **ContentSlides.tsx:** 4 hardcoded stringai (`"3 blokai. 1 šablonas…"`, `"META + INPUT + OUTPUT = minimalus…"`, `"Nukopijuok šabloną"`, `"Pilnas pavyzdys"`) pakeisti į `t()` kvietimus su naujais raktais.
- **lt.json / en.json:** Pridėti 4 nauji raktai `contentSlides` namespace: `promptTemplateIntro`, `promptTemplateSub`, `copyTemplateLabel`, `fullExampleLabel`.

**Desktop sticky navigacija palenda po AppNav – P1 UX fix**

Desktop ekranuose (~1024-1280px) AppNav meniu persilaužia į 2 eilutes (`flex-wrap`), todėl aukštis tampa ~110px vietoj 64px. ModuleView skaidrių navigacija turėjo hardcoded `sticky top-16` (64px) ir `z-20`, todėl palįsdavo po AppNav (`z-40`) – vartotojas negalėdavo naviguoti tarp skaidrių.

- **AppNav.tsx:** Pridėtas `ResizeObserver`, kuris matuoja nav aukštį ir nustato `--app-nav-height` CSS kintamąjį ant `<html>`.
- **ModuleView.tsx:** `sticky top-16` pakeistas į `sticky top-[var(--app-nav-height,4rem)]` – dinamiškai prisitaiko prie realaus AppNav aukščio.
- **GOLDEN_STANDARD.md v2.3.5:** Nauja §5.5 „Sticky stacking" taisyklė – draudžia hardcoded `top-16`, dokumentuoja z-index hierarchiją.

**Modulis 5: turinio dubliavimas ir hardcoded slide 47 blokas**

Action-intro skaidrėse (M1, M4, M5) ModuleView header (title + subtitle) dubliavosi su ActionIntroSlide hero sekcija (heroStat + heroText) – vartotojas matė tą patį tekstą du kartus. Slide 47 turėjo hardcoded `slide?.id === 47` bloką su lietuviškais label'ais ir dubliuotu sekcijų turiniu.

- **ModuleView.tsx:** Header paslėptas kai `type === 'action-intro'` – ActionIntroSlide hero sekcija perima header funkciją.
- **ContentSlides.tsx:** Pašalintas hardcoded `slide?.id === 47` blokas (duration + firstActionCTA + download) – ši informacija jau egzistuoja sekcijose ir action-intro skaidrėje.

**Mobile nav: `moduleN???` raw key + „Atgal" mygtuko iššokimas**

ModuleView.tsx naudojo neegzistuojantį i18n raktą `t('moduleN')` vietoj `t('moduleLabel')` – vartotojas matė raw key „moduleN" vietoj „Modulis 4". Mobile bottom nav centro sekcija dubliavo skaidrės numerį dviem eilutėm ir `min-w-[80px]` spaudė „Atgal" mygtuką kai „Tęsti" label ilgas.

- **ModuleView.tsx:** 2 vietos `t('moduleN', { n })` → `t('moduleLabel', { n })` (desktop ir mobile nav).
- **ModuleView.tsx:** Mobile bottom nav centro sekcija supaprastinta į vieną eilutę, `min-w-[80px]` → `min-w-[60px]` + `shrink-0`.

**Skaidrės crash mobiliam tinkle – lazy chunk retry (slide id: 47)**

Mobiliam Chrome demonstracijos metu skaidrė (id: 47, type: content-block) rodė „Nepavyko užkrauti skaidrės" – ErrorBoundary pagavo lazy chunk loading klaidą. ContentSlides chunk = 375 KB (90 KB gzip) – per didelis nestabiliam mobiliam ryšiui be retry logikos.

- **`src/utils/lazyWithRetry.ts`:** Naujas utility – apgaubia `React.lazy()` su automatiniais retry (3 bandymai, 1.5 s tarpas). Mobiliam tinkle chunk download failure nebegriūna iškart.
- **SlideContent.tsx:** Visi 40+ `lazy()` importai pakeisti į `lazyWithRetry()` – ContentSlides, BlockSlides, TestPracticeSlides chunkai.

### Added (2026-03-12)

**Gold Legacy Standard – išsami kodo bazės dokumentacija v1.3.0**

Sukurtas `docs/development/GOLD_LEGACY_STANDARD.md` (~750 eilučių) – visapusiška production deploy būsenos dokumentacija, skirta apsaugoti esamą kodą tobulinant sistemą toliau.

- **22 skyriai:** projekto apžvalga, technologijų krūva, architektūra, duomenų SOT, komponentų inventorius, utility/hooks, skaidrių sistema, diagramų sistema, loaderiai/i18n, progresas, PDF generavimas, access tier, testai, build, CI/CD, deployment, JSON schemos, skriptai, stiliai, konfigūracija, kritiniai keliai, konvencijos.
- **Komponentų inventorius:** 7 pagrindiniai puslapiai, ~50+ skaidrių tipų, 16 diagramų, 6 UI primityvai, 6 klausimų tipai.
- **Duomenų architektūra:** 37 duomenų failai, dviejų profilių sistema (Full/Core), EN merge strategija (4 overlay lygiai), 6 JSON schemų.
- **Utilities:** 11 utility failų, 6 custom hooks, 4 PDF generatoriai, 26 testų failų.
- **Appendix:** failų dydžiai (top 20), runtime dependency graph, localStorage raktų registras (8 raktai).

---

### Added (2026-03-12)

**Clean production repo `DITreneris/inzinerija` – subproject šaltinis marketingo repo (Vercel)**

Sukurtas švarus production-ready repo su tik build-critical failais, skirtas integruoti kaip subproject į marketingo monorepo (promptanatomy.app, Vercel).

- **Repo:** [github.com/DITreneris/inzinerija](https://github.com/DITreneris/inzinerija) – 254 failai (src/, public/, scripts/validate+schemas, api/verify-access.ts, CI).
- **Pašalinta iš clean repo:** `docs/` (development dokumentacija), `sales-os/`, `.cursor/`, `ROADMAP.md`, `TODO.md`, `turinio_pletra.md`, audit/patch/extract scripts, `deploy.yml` (deploy valdo marketingo repo).
- **Adaptuota:** `package.json` (repository → inzinerija, pašalinti audit scripts), naujas `README.md` (build, env, subproject integracija, verify-access API kontraktas), švarus `.gitignore`, `.env.example` (`VITE_BASE_PATH=/academy/`), CI `test.yml` (be deploy, be codecov).
- **Patikrinta izoliuotai:** `npm ci` + `validate:schema` OK + `lint` 0 warnings + 203 testai OK + default build OK + `VITE_MVP_MODE=1` build OK – viskas naujame kataloge.
- **`di_portal_*.png`:** 7 iš 10 naudojami `modules.json` skaidrių `image` laukuose – visi nukopijuoti. Standalone HTML failai (banner, strategija, dashboard) – pašalinti.
- **NotoSans:** `public/fonts/NotoSans-Regular.ttf` įtrauktas (PDF lietuviškos raidės).

### Fixed (2026-03-11)

**EN UI kokybė – sisteminis lietuviškų reliktų šalinimas (Moduliai 1–6)**

Vartotojas EN režime matė dešimtis lietuviškų žodžių skaidrėse, teste, PDF atmintinėse ir bendruose komponentuose. Atliktas 4 fazių planas, apimantis tik M1–6 aktualų turinį.

- **Faze 1 – Kritiniai duomenų trūkumai:**
  - `questionPool.en.ts` – išversta visos 39 testo klausimų (24 nauji vertimai, 15 pakartoti iš modules-en.json).
  - `modules-en.json` – Modulio 3 skaidrė 31: 27 trūkstami EN laukai (template, explanation, 6 instrukcijų žingsniai).
  - `modules-en-m4-m6.json` – Modulio 6: workflowChains etiketės, `[TEMA]→[TOPIC]`, `Trumpai→In short`, lietuviškos kabutės `„"` → `""`.

- **Faze 2 – Bendri komponentai (shared):**
  - `PracticalTask.tsx` – 21 hardcoded LT eilutė (mygtukai, progreso etiketės, aria-label).
  - `CopyButton.tsx`, `TemplateBlock.tsx` – fallback „Kopijuoti"/„Nukopijuota!" → locale-conditional.
  - 5 klausimų komponentai (`McqQuestion`, `TrueFalseQuestion`, `ScenarioQuestion`, `OrderingQuestion`, `MatchingQuestion`) – užuominos, pasitikėjimo etiketės, patikros mygtukai.
  - `confidenceLabels.ts` + `ConfidenceSelector.tsx` – `LABELS_LT`/`LABELS_EN` + `getConfidenceLabels(locale)`.
  - `slidePhaseConfig.ts` – progreso juostos fazių pavadinimai (`phaseLabelsEn`, `localizePhase()`); `ModuleView.tsx` – locale perduodamas `buildSlideGroups()`.

- **Faze 3 – Modulių komponentai:**
  - `TestPracticeSlides.tsx` – ~48 LT eilutės: testo intro (M2/M5), rezultatai (M2/M5/M11/M14), kategorijų radaras, M6 praktikos intro, M9 hub, scenarijų kortelės.
  - `ContentSlides.tsx` – `DEFAULT_HIERARCHY`, `DEFAULT_SUMMARY`, `DEFAULT_COMPARISON`, `DEFAULT_INTRO` konvertuoti į `getDefault*(locale)` funkcijas; DI Modalities; ~30 eilučių.
  - `HallucinationRatesDashboard.tsx` – 9 LT eilutės (antraštė, rikiavimas, šaltinis).
  - `ProcessStepper.tsx` – jau buvo lokalizuotas, pakeitimų nereikėjo.

- **Faze 4 – PDF ir edge cases (tik M1–6):**
  - `m5HandoutPdf.ts` – 8 sekcijų pavadinimai (`Pagrindiniai įrankiai`, `Promptai`, `Seka`, `Savokos` ir kt.).
  - `m6HandoutPdf.ts` – 4 sekcijų pavadinimai (`Projekto etapai`, `Duomenų tvarkymas`, `Refleksija`).
  - `introPiePdf.ts` – 6 sekcijų pavadinimai (`Top 5 patarimai`, `Įrankiai`, `Svarbios sąvokos`, `Sisteminis promptas`, `Palinkėjimas`).
  - `certificatePdf.ts` – 5 fallback eilutės jau buvo locale-aware.
  - `CertificateScreen.tsx`, `GlossaryPage.tsx`, `ModuleCompleteScreen.tsx` – jau buvo locale-aware.

### Fixed (2026-03-11)

**Sisteminė content-block skaidrių pločio klaida**

- **ContentBlockSlide layout:** pašalintas `max-w-prose mx-auto` apribojimas iš `ContentBlockSlide` wrapper div (`ContentSlides.tsx`). Ši klasė ribojo visas `content-block` tipo skaidres iki ~580px pločio, todėl turinys (paveikslėliai, lentelės, collapsible sekcijos) buvo rodomas tik ~pusėje ekrano. Dabar turinys užima visą kortelės plotį (ribojamą `max-w-7xl` tėvinio konteinerio).

### Changed (2026-03-11)

**Tikras production `1–6` modulių splitas (be `7–15` bundle)**

- **Duomenų splitas:** pridėti production core failai `src/data/modules-m1-m6.json`, `src/data/glossary-m1-m6.json`, `src/data/tools-m1-m6.json`, `src/data/tools-en-m1-m6.json` ir `src/data/m9Characters-empty.json`. Jie reprezentuoja realų `1–6` katalogą, skirtą core build profiliui.
- **Build kelias:** `vite.config.ts` įvesti aliasai `@modules-data`, `@glossary-data`, `@tools-data`, `@tools-en-data`, `@m9-characters-data`, `@ai-detectors-slide`, `@vaizdo-generatorius-slide`. Kai `VITE_MVP_MODE=1`, production build fiziškai naudoja tik core failus ir nebebundle'ina `7–15` modulių duomenų.
- **Loaderiai ir bendri importai:** `modulesLoader.ts`, `glossaryLoader.ts`, `toolsLoader.ts`, `SlideContent.tsx`, `TestPracticeSlides.tsx`, `VaizdoGeneratoriusSlide.tsx` perjungti į alias-based importus, kad shared runtime nebesitemptų vėlyvųjų modulių duomenų per statinius importus.
- **Generatorius ir validacija:** pridėtas `scripts/generate-core-data.mjs` ir `npm run generate:core-data`; `scripts/validate-schema.mjs` išplėstas taip, kad validuotų ir core split failus.
- **Testai ir konfigūracija:** `vitest.config.ts` suderintas su tais pačiais aliasais kaip build; atnaujinti `modulesLoader`, `QuizPage`, `CertificateScreen`, `App.quiz.integration` testai, kad nesiremtų tik LT locale ir veiktų su nauju core profiliu.
- **Dokumentacija ir deploy:** `README.md`, `docs/deployment/DEPLOYMENT.md`, `.env.example`, `.github/workflows/deploy.yml`, `.github/workflows/test.yml`, `docs/development/RELEASE_QA_CHECKLIST.md`, `ROADMAP.md` pakeisti taip, kad `VITE_MVP_MODE=1` būtų aprašytas kaip core `1–6` production profilis, o ne „6 atviri + 7–15 užrakinti“ scenarijus.

### Fixed (2026-03-11)

**Testų stabilumas – locale, PDF ir one-shot Vitest**

- **IntroActionPie PDF testas:** `src/components/slides/types/content/__tests__/IntroActionPieSlide.pdf.test.tsx` dabar eksplicitiškai nustato `prompt-anatomy-locale=lt`, todėl „Eksportuok PDF“ testas nebepriklauso nuo aplinkos naršyklės kalbos. Patvirtintas kelias: paspaudus CTA kviečiami `ensurePdfFont()` ir `downloadIntroPiePdf(...)` su teisingu segmentu.
- **IntroActionPieSlide telemetry šalutinis efektas:** iš `src/components/slides/types/content/IntroActionPieSlide.tsx` pašalintas lokalus debug `fetch()` į `127.0.0.1`, kuris testų aplinkoje kūrė nereikalingą asinchroninį triukšmą ir sunkino diagnostiką.
- **Deterministinis testų locale:** `src/test/setup.ts` po kiekvieno testo atstato `prompt-anatomy-locale` į `lt`, o `ToolsPage.test.tsx` ir `ModuleCompleteScreen.test.tsx` papildomai prieš kiekvieną testą eksplicitiškai nustato LT režimą. Taip pašalintos klaidos, kai komponentai renderindavosi EN, o testai tikėdavosi LT tekstų.
- **Quiz/App integracinis testas:** `src/components/__tests__/App.quiz.integration.test.tsx` empty-state testas pakeistas taip, kad pirmiausia laukia stabilaus „Grįžti atgal / Back to home / Go back“ mygtuko signalo, o tik tada tikrina tuščios apklausos tekstą. Tai sumažino flakiness lazy-loaded `QuizPage` kelyje.
- **CertificateScreen act() įspėjimas:** `src/components/__tests__/CertificateScreen.test.tsx` EN scenarijuje parsisiuntimo paspaudimas apgaubtas `act(...)`, todėl nebelieka React test warning apie state update už `act`.
- **Pilnas vienkartinis testų paleidimas:** po šių pataisų `npm run test:run` baigiasi sėkmingai: **26 test files passed, 203 tests passed**.

**Lokalizacija lazy-loaded skaidrėse (moduliai 1–6) – sisteminis sprendimas**

- **Problema:** Lazy-loaded skaidrėse (action-intro, content-block, test-intro ir kt.) kartais rodė vertimų raktus vietoj tekstų (pvz. `toolsHeading`, `popularUseCases`, `showAllToolsCount`, `toolsPrincipleNote`), nes `useTranslation('namespace')` kontekstas lazy chunke ne visada pririšdavo namespace.
- **Sprendimas:** Įvestas bendras helperis **`getT(ns)`** (`src/i18n.ts`) – grąžina funkciją, kuri naudoja globalų i18n su aiškia `ns`, nepriklausomai nuo React konteksto. Visuose lazy skaidrių komponentuose vertimai imami per `getT('module')`, `getT('contentSlides')` arba `getT('testPractice')`; `useTranslation()` paliekamas tik re-render ui kai keičiasi kalba.
- **Pakeisti failai:** `ActionIntroSlide.tsx`, `IntroActionPieSlide.tsx` (module); `ContentSlides.tsx` (contentSlides, quiz, common kur reikia); `BlockSlides.tsx` (contentSlides); `TestPracticeSlides.tsx` (testPractice); `VeiksmoIntroBlock.tsx` (contentSlides).

**ActionIntroSlide – neteisingas i18n namespace (angliški reliktai LT UI)**

- **Problema:** `ActionIntroSlide.tsx` naudojo `getT('module')`, bet visi komponento raktai (`forAudienceDuration`, `toolsHeading`, `showAllToolsCount`, `toolsPrincipleNote`, `popularUseCases`, `hideExtraTools` ir kt.) yra `testPractice` namespace. LT vartotojas mate neapdorotus raktu pavadinimus vietoj lietuvisku vertimu.
- **Paveiktos skaidres:** Visos `action-intro` tipo – Modulis 1 skaidre 1, Modulis 4 skaidre 1, Modulis 5 skaidre 1 ir kt.
- **Sprendimas:** `ActionIntroSlide.tsx` pakeista `getT('module')` -> `getT('testPractice')`.

**Navigacija – „EN“ šalia „Atgal į modulius“**

- **AppNav.tsx:** Kalbos perjungiklis (LT | EN) modulio vaizde neberodomas – rodomas tik ant Pagrindinio, Modulių, Žodynėlio, Įrankių, Apklausos. Taip išvengiama painiavos, kai lietuviškame režime viršuje matėsi „EN“ šalia mygtuko „Atgal į modulius“.
- **ModuleView.tsx:** Atgal mygtukams naudojamas aiškus namespace `module:backToModules`, `module:backShort` (fallback ir pagrindiniame header).

### Added (2026-03-11)

**Vartotojui paruošta įrankis – Faze 2 ir Faze 3** (planas: `.cursor/plans/vartotojui_paruošta_įrankis_cfe90c31.plan.md`)

**Faze 2 – Didelio poveikio UX:** (2.1) Content-block skaidrėse su >3 sekcijomis ir copyable – mobile-only mygtukas „Pereiti prie veiksmo“ (smooth scroll į pirmą CTA/Kopijuoti). TemplateBlock – `data-action="copy"` skirta scroll taikiniui. i18n: contentSlides.gotoActionLabel, gotoActionAria (LT/EN). (2.2) Lentelės mobile: pirmas stulpelis (th/td) `sticky left-0 z-10` + fonas pagal eilutę + dešinės šešėlis (ContentSlides.tsx – comparisonStyle, solutionMatrix, paprastos lentelės). (2.3) Slide dots mask-gradient-dots – Safari iOS palaikymas jau per -webkit-mask-image (index.css). (2.4) Bottom nav „Tęsti“ label: jei kontekstinė etiketė >20 simb., rodomas tik „Tęsti“ (ModuleView nextSlideContextLabel).

**Faze 3 – Kokybės vartai ir dokumentacija:** (3.1) TEST_REPORT.md – skyrius „Mobile QA (Faze 3.1)“: audito §3 kriterijai (navigacija, skaitomumas, tankis, CTA, hierarchija, scroll) ir patikros lentelė 1 skaidrei per modulį (M1–M6), 375px. (3.2) UX_AUDIT_IMPLEMENTATION_PLAN.md – skyrius „Mobile-specific ir QA“, nuoroda į AUDITO_ATASKAITA_MODULIAI_1_6_MOBILE_UX.md, Faze 1.7 pastaba. (3.3) TODO.md – UX-1 nuoroda į planą ir mobile „Dabar“ bloką; Mobile P2 susieta su Faze 1–2; P1 pastaba apie 0.1/0.2 rankinę.

---

**UX audito įgyvendinimas – visos fazės (UX_AUDIT_IMPLEMENTATION_PLAN.md)**

**Faze 1 – Greičiausi 10:** 1.1 Body content-block `text-base`; 1.2 body wrapper `max-w-prose` + `mx-auto`; 1.3 Sticky juosta „Skaidrė 12/41“ + 2px progress line; 1.4 Tarpai `space-y-6` content-block ir section-break; 1.5 Modulių kortelė badge max 2–3 (Modulis N, level/Rekomenduojama, Baigta); 1.6 Slide dots gradient mask dešinėje; 1.8 Callout visiems blockVariant `border-l-4` + `p-4 md:p-5`; 1.9 H2 `text-lg md:text-xl font-bold`, H3 `text-base font-semibold`; 1.10 Mobile sticky „12/41“. (1.7 Footer ≤55 simb. – žr. atskirą „Footerių sutrumpinimas“.)

**Faze 2 – Kiti micro-UX:** 2.2 Sticky bar aukštis py-2 (ModuleView); 2.3 Footer ≤55 validacija/skriptas; 2.4 Dark mode gray-400 → gray-300 (WCAG AA); 2.5 Rekomenduojama kortelė shadow accent (ModulesPage); 2.6 Quiz rezultatai – pirmas klaidingas border-left rose (QuizResultsView); 2.7 Section-break hero dominuoja, kiti kompaktiški; 2.8 TemplateBlock „Kopijuoti“ min-h 44px, accent/brand; 2.9 Lentelės pirmas stulpelis min-w, align-top, py-3.5; 2.10 Collapsible open – border-l-4, švelnus fonas; 2.11 ModuleComplete vienas primary CTA, kiti secondary; 2.12 Empty state ikona, brand-50, vienas CTA; 2.13 Mobile modulių kontekstas (M4 badge / „Modulis 4 · 12/41“). (2.1 CTA hierarchija – peržiūrėta, jau atitinka.)

**Faze 3 – Modulių specifiniai (M1–M6):** M1 – „Kas čia?“ blokas, body + max-w-prose, vienas CTA, santrauka space-y-8; M2 – test-intro, progresas virš klausimo, rezultatų klaidingi, remediacija vienas mygtukas; M3 – hub vienas CTA per scenarijų, Copy virš CTA, nextSlideContextLabel, santraukos mygtukas; M4 – slide dots + fade, section-break hero, content-block space-y-6, DiModalities legend, lentelės; M5 – test-intro laukai, rezultatų scroll + remediacija, <70% pranešimas + CTA; M6 – practice-intro atskyrimas, vienas CTA, completion „Kur pritaikyti?“ kompaktiškai.

**Faze 4 – Premium SaaS polish:** 4.1 Progress juostos transition-all duration-500 (ModuleView, CircularProgress); 4.2 Šešėlių konsistencija shadow-md/shadow-lg pagal GOLDEN_STANDARD §5.3 (patikra, be pakeitimų); 4.3 Focus-visible ring visiems interaktyviems (index.css – button, a, [role=button], input, select, textarea, [tabindex=0]); 4.4 Spalvų ribojimas 2–3 per skaidrę – spot-check M4 (content-block, section-break atitinka §2.2).

**M4 pirmos skaidrės supaprastinimas ir „Po šio modulio galėsi:“ (audito Faze 3)**

- **modules.json, modules-en-m4-m6.json:** Modulio 4 pirmos skaidrės (action-intro, id 38) outcomes atnaujinti pagal SOT §1.3 – 6 punktai (RAG, Deep research, tokenai, manipuliacijos, haliucinacijos + Quality, Modulis 6). Pridėtas laukas **outcomesHeading** (LT: „Po šio modulio galėsi:“, EN: „After this module you'll be able to:“). heroSubText sutrumpintas pagal SOT („RAG, haliucinacijos – kaip dirbti protingiau“).
- **ActionIntroContent (types/modules.ts):** Neprivalomas laukas **outcomesHeading** – antraštė virš outcomes sąrašo.
- **ActionIntroSlide.tsx:** Jei nurodyta **content.outcomesHeading**, virš outcomes rodoma h3 antraštė; region aria-label naudoja outcomesHeading, jei yra. Hook/reveal elgesys (pirmas ekranas – tik whyBenefit + CTA, po paspaudimo – pilnas turinys) jau buvo įgyvendintas.

**„Kur pritaikyti?“ blokas (MUST M5, audito Faze 2) – ModuleCompleteScreen po M1 ir M3**

- **ModuleCompleteScreen.tsx:** Naujas blokas „Kur pritaikyti?“ – rodomas po Modulio 1 ir po Modulio 3 užbaigimo. Antraštė + 4 use-case pagal rolę (projektų vadovas, marketingas, HR, analitikas). M1 – 6 blokų šablono pritaikymas; M3 – praktinių scenarijų (ataskaitos, kampanijos, apklausos, analizė) pritaikymas.
- **SOT:** turinio_pletra.md – skyrius „Kur pritaikyti?“ blokas: kur rodoma (M1, M3), lentelės M1 ir M3 turiniui, implementacija (i18n raktai).
- **i18n (lt.json, en.json):** module.useCaseHeading („Kur pritaikyti?“ / „Where to apply?“), useCaseM1_1–4, useCaseM3_1–4. Paprasta kalba, LT – DI, EN – AI.
- **TEST_REPORT.md, VARTOTOJU_ATSILIEPIMAI_BENDRAS.md, TODO.md:** M5 (MUST) pažymėtas įgyvendintas; Faze 2 ir M3 išplėtimas dokumentuoti.

**EN UI, PDF ir schemų skaidrės – pilnas planas (en_ui_pdf_and_schema_fixes)**

- **Dokumento pavadinimas ir meta (App.tsx):** Naujas `seo` namespace (lt.json, en.json) – baseTitle, titleHome, titleModules, titleGlossary, titleTools, titleQuiz, titleCertificate, titleDefault, descDefault, descDefaultWithModules, descModules, descGlossary, descTools, descQuiz. Tab pavadinimas ir meta description pagal locale (EN: „Prompt Anatomy“, „Modules – Prompt Anatomy“ ir t. t.).
- **Sertifikato analytics:** CertificateScreen – `cta_label` analytics įvykyje per `t('certificateDownloadCta')` (lt/en: „Parsisiųsti sertifikatą (PDF)“ / „Download certificate (PDF)“).
- **EnlargeableDiagram:** Mygtukas „Peržiūrėti visą dydį“, modalo aria ir uždarymo mygtukas per `useTranslation('common')` – viewFullSize, viewFullSizeAria, diagramFullSizeAria, close.
- **Schemų blokai – enlargeLabel ir ContextFlowDiagram:** diagrams namespace – agentOrchestratorEnlargeLabel, agentWorkflowEnlargeLabel, contextFlowEnlargeLabel (LT/EN). AgentOrchestratorBlock, AgentWorkflowBlock, ContextFlowBlock – t(); TurinioWorkflowBlock – enlargeLabel į TURINIO_BLOCK_LABELS (lt/en). ContextFlowDiagram – naujas `contextFlowDiagramLabels.ts` (getContextFlowBoxes, getContextFlowHeading, getContextFlowAriaLabel pagal locale); būgnai ir antraštė EN.
- **M5/M6 PDF – failo pavadinimas EN:** m5HandoutPdf.ts, m6HandoutPdf.ts – trečias argumentas `locale`; default filename EN: `Prompt_Anatomy_Module5_handout.pdf` / `Prompt_Anatomy_Module6_handout.pdf`. Kvietėjai (TestPracticeSlides, ModuleCompleteScreen, ContentSlides) perduoda locale.
- **ContentSlides .txt šablonas:** Failo pavadinimas pagal locale (EN: presentation-template-module5.txt); mygtuko tekstas per contentSlides.downloadTemplateLabel (LT/EN).
- **Intro Action Pie – EN turinys ir locale:** Naujas `introPiePdfContent-en.json` (7 segmentai EN), `introPiePdfContentLoader.ts` (getIntroPiePdfContent(locale)). IntroActionPieSlide – useLocale(), pdfContent iš loaderio, mygtukai „Eksportuok PDF“ / „Generuok patarimus sau“ per module.exportPdf, generateTipsForYourself, exportPdfAria, generateTipsAria. introPiePdf.ts – parametras locale; EN: brand title „Prompt Anatomy“, footer EN, default filename `Prompt_Anatomy_${safeTitle}.pdf`. Validacija: introPiePdfContent-en.json į validate-schema.mjs.
- **ActionIntroSlide – aria ir vietiniai tekstai:** useTranslation('module'); visi hardcoded eilutės pakeisti į t(): firstStepLabel, pdfHandoutAria, firstStepAria, sandboxMessageAria, outcomesRegionAria, hideResults, showAllResults, forAudienceDuration, durationLabel, forAudienceLabel, toolsHeading, openToolNewTab, popularUseCases, hideExtraTools, showAllToolsCount, toolsPrincipleNote. Įrankio cikle kintamasis `tool` (kad nesikirstų su t).

**EN Intro Pie PDF – žodynas pagal locale; ActionIntroSlide CTA fallback**

- **IntroActionPieSlide:** Žodynas imamas iš `getGlossary(locale)` vietoj statinio glossary.json; `glossaryByTerm` priklauso nuo locale – EN režime PDF rodo terminus iš glossary-en.json.
- **introPiePdfContent-en.json:** Visų 7 segmentų glossaryTermNames pakeisti į anglų terminus, esančius glossary-en.json (Meta block, Input, Output, Master prompt, RAG, Deep research, Context window, Tool Use, Agent (in AI context), Brief, AI universe ir kt.), kad EN vartotojas matytų angliškus žodyno pavadinimus ir apibrėžimus PDF.
- **ActionIntroSlide CTA fallback:** module.actionIntroCtaReveal („Pamatyk skirtumą per 30 sekundžių!“ / „See the difference in 30 seconds!“), actionIntroCtaDefault („Sužinok daugiau“ / „Learn more“). ctaLabel = content.ctaText || (hasReveal ? t('actionIntroCtaReveal') : t('actionIntroCtaDefault')).

**Testai**

- **IntroActionPieSlide.pdf.test.tsx:** renderWithProviders (LocaleProvider); segmentai iš getIntroPiePdfContent('lt'); downloadIntroPiePdf tikrinamas su 5 argumentais (įsk. locale 'lt').

### Added (2026-03-11) – P1 release paruošimas

- **M4 footeriai (34, 35, 36):** Skaidrei 66 (Tokenų ekonomika) pridėtas footer „Toliau – skaidrė 35: Konteksto degradacija…“, skaidrei 66.25 – „Toliau – skaidrė 36: Savitikra: Tokenai“. 65.8 jau turėjo „34: Tokenų ekonomika“. Pagal `.cursor/rules/footer-slide-numbers.mdc`.
- **RELEASE_QA_CHECKLIST §5d:** Naujas skyrius – M5 PDF, M6 PDF rankinė patikra (lietuviškos raidės); M4 skaidrės 56 ir M6 skaidrės 64 rankinė peržiūra (navigacija, Kopijuoti, „Peržiūrėti pilname dydyje“). TEST_REPORT – įrašai P1 footer sprendimas ir §5d dokumentavimas. TODO – #3 pažymėtas atliktas.
- **M4 EN footeriai (modules-en-m4-m6.json):** Skaidrei 66 (Token economy) pridėtas `content.footer`: „Next – slide 35: Context degradation: why do models \"forget\"?“; skaidrei 66.25 – „Next – slide 36: Self-check: Tokens“. Loaderis EN režime visiškai naudoja modules-en-m4-m6.json M4, todėl footeriai turi būti EN faile.

**Footerių „Toliau – skaidrė N“ / „Next – slide N“ sutrumpinimas (≤55 simb.)**

- Pagal [FOOTER_NEXT_SLIDE_ANALIZE.md](docs/development/FOOTER_NEXT_SLIDE_ANALIZE.md) (variantas D): visi footeriai ilgesni nei 55 simb. sutrumpinti. **modules.json:** 26 pakeitimai (M1, M2, M3, M4, M5, M6, M7, M13) – naudota shortTitle kur buvo (Jungiamoji praktika, Sprintas, HTML praktika, RAG atmintis ir kt.) arba rankinis sutrumpinimas (pvz. „Scenarijus 2: Pardavimų…“ → „Pardavimų analizė ir veiksmų planas“, „Konteksto degradacija: kodėl modeliai…“ → „Konteksto degradacija“). **modules-en-m4-m6.json:** 3 pakeitimai (M4 slide 15, 26, 35). Po pakeitimų nė vienas toks footer neviršija 55 simb. GOLDEN_STANDARD §3.6 ir footer-slide-numbers.mdc – rekomenduojamas ilgis jau dokumentuotas.

### Fixed (2026-03-11) – papildomi pataisymai

**Quiz rezultatų ekranas – scroll ir pirmas klaidingas atsakymas (audito Faze 1.1)**

- **QuizResultsView.tsx:** Scroll į pirmą klaidingą atsakymą – `requestAnimationFrame` + fallback `setTimeout(150)`, kad po mount būtų užtikrintas scroll. Pirmam klaidingam blokui pridėta a11y: `id="quiz-first-wrong"`, `aria-live="polite"`. TEST_REPORT ir TODO – Faze 1.1 pažymėta išspręsta (scroll / M2, M5 rezultatai).

**Testai – useLocale / LocaleProvider**

- **ToolsPage.test.tsx, ModuleCompleteScreen.test.tsx, a11y.smoke.test.tsx:** Komponentai naudoja `useLocale()`; testai renderino be `LocaleProvider`, dėl to 12 testų mėtė „useLocale must be used within LocaleProvider“. Pakeista į `renderWithProviders()` iš `src/test/test-utils.tsx` (wrapper su `LocaleProvider`). Visi 194 testai (26 failai) praeina.

### Added (2026-03-11) – Audito planas Faze 1.2

**CTA auditas M1/M4 (vienas dominuojantis CTA per skaidrę)**

- **docs/development/CTA_AUDIT_M1_M4.md:** Naujas audito dokumentas – 6 skaidrės (M1: 1, 2, 5; M4: 39, 42, 45) patikrintos pagal GOLDEN_STANDARD §4.2. Visos OK; pataisymų nereikia. TEST_REPORT – įrašas Faze 1.2 išspręsta.

### Added (2026-03-11) – Audito planas Faze 4

**„Minimalus kelias“ M4 (PEDAGOGINE_ANALIZE §2.8)**

- **docs/turinio_pletra_moduliai_4_5_6.md:** §1.4 papildytas bloku „Kaip naudoti šį modulį“ – minimalus (4.1, 4.2, 4.3, 4.5, 4.6, 4.7), pilnas, papildomai; laukas `howToUseModule` (heading, items/body), terms blokas.
- **types/modules.ts:** `ActionIntroContent` – neprivalomas `howToUseModule?: { heading?, body?, items? }`.
- **modules.json, modules-en-m4-m6.json:** M4 pirmai skaidrei (id 38) pridėtas `howToUseModule` (LT/EN: 3 punktai).
- **ActionIntroSlide.tsx:** Po reveal rodomas terms blokas (slate), kai yra `content.howToUseModule` – antraštė + sąrašas.

**M6 projekto etapai (scaffolding) – „Gali sustoti čia“**

- **TestPracticeSlides.tsx:** M6 intro – 6 etapų sąraše kiekvienam žingsniui pridėta „Gali sustoti čia“ (Tu forma); paskutinis – „Kada toliau: paleisk promptą ir gauk ataskaitą.“ Antraštė ir aprašas per `t('projectStepsTitle')`, `t('projectStepsDesc')` (lt.json jau turėjo „Gali sustoti ir išsaugoti…“).

### Changed (2026-03-11) – papildomi pakeitimai

**M6 etapai i18n ir LT Jūs→Tu**

- **TestPracticeSlides.tsx (LT Jūs→Tu):** „Galite sustoti čia“ → „Gali sustoti čia“ (5 žingsniai); vietoj hardcoded „Galite sustoti ir išsaugoti…“ – `t('projectStepsDesc')`.
- **lt.json, en.json (testPractice):** Pridėti `projectStep1`–`projectStep6` – 6 M6 projekto etapų tekstai (LT: Tu forma; EN: „You can stop here“, „When ready: run the prompt and get the report.“).
- **TestPracticeSlides.tsx:** Vietoj hardcoded `stages` masyvo – `[t('projectStep1'), …, t('projectStep6')]`. M6 intro skaidrėje „Projekto etapai (6 žingsniai)“ sąrašas rodomas pagal locale (LT/EN).

**P2 – turinys ir doc (TODO #6–#13)**

- **docs/MODULIO_4_SKAIDRIU_EILES.md:** Viena skaidrė id 56 (4.1c+4.2 suliesta) – pašalinta atskira 4.2 eilutė; atnaujintos taisyklės (56 → 4.2-open → 4.3).
- **M5 skaidrė 47 (KISS-MARRY-KILL):** Viršuje vienas dominuojantis copyable (8 skaidrių struktūra). „Master promptas“ ir „Promptas pilnam turiniui“ perkelti į vieną collapsible „Nori suprasti detaliau?“; proceso diagrama – atskiras collapsible.
- **M5 paprasta kalba:** brief → „trumpa užduotis (brief)“ arba paaiškinta; draft → juodraštis; sprint → „15 min (intensyvus darbas)“; use case → panaudojimo atvejis (8 skaidrių šablone); introBody, heroSubText, explanation – Tu forma ir paaiškinimai.
- **65.8 / 66.9 section-break:** subtitle, recap.lead, nextSteps – paprasta kalba (max_tokens pašalinta iš nextSteps; leading questions → vedantys klausimai; injection/jailbreak → ko vengti).
- **modules.json Jūs→Tu:** Prisiminkite → Prisimink (hint 2×); skaidrė 67 „Prisiminkite situaciją“ → „Prisimink“, pabandykite/palyginkite → pabandyk/palygink.
- **docs/development/TEST_REPORT.md:** Pridėta sekcija „P2 peržiūros (2026-03-11)“ – M4 section-break (40.5, 52.5, 65.8, 66.9), M5 rankinė peržiūra, Path-step žodynėlio patikra (M7 71.1–71.5, 10 terminų).

### Changed (2026-03-10)

**LT kreipinys Jūs→Tu (PAPRASTOS_KALBOS_GAIRES §4)**

- **modules.json:** 12 vietų – formalus kreipinys pakeistas į Tu formą (Vartotojas (jūs)→(tu), suprantate→supranti, pastebėjote→pastebėjai, jūs paleidžiate/paleisite/gausite→tu paleidi/paleisi/gausi, nukopijavote/gavote/surinkote→nukopijavai/gavai/surinkai, esate pasiruošę→esi pasiruošęs, KAS esate/KĄ turite/KO norite→esi/turi/nori, Atpažinkite/perrašykite→Atpažink/perrašyk, turite paruošti→turi paruošti).
- **ProcessStepper.tsx:** CUSTOM_GPT_STEPS LT – visi description, tip ir actionChecklist pereiti į Tu formą (Nuspręskite→Nuspręsk, Įveskite/įklijuokite/parašykite→Įvesk/įklijuok/parašyk, Pridėkite/įkelkite/prijunkite→Pridėk/įkelk/prijunk, Išbandykite/Užduokite/publikuokite→Išbandyk/Užduok/publikuok, Naudokite/stebėkite/tobulinkite→Naudok/stebėk/tobulink).
- **stepExplanations.ts:** DI_PREZENTACIJOS_STEP_EXPLANATIONS LT – Apibrėžkite, Naudokite, nukopijuokite, Įveskite, Pridėkite, patikrinkite pakeisti į vienaskaitos 2-as asmuo.
- **Locale (lt.json, en.json):** vaizdoGen.checkText (grįžkite/pakeiskite→grįžk/pakeisk), testPractice.passedMessageDefault (Galite→Gali), selfAssessmentDesc (pažymėkite, pritaikėte→pažymėk, pritaikei), naujas testPractice.tipUnknownAnswer (LT/EN).
- **TestPracticeSlides.tsx:** Patarimo tekstas per t('testPractice:tipUnknownAnswer'); „Jūsų pasirinkimas“ per t('testPractice:yourChoiceLabel'). Planas: docs/archive/development/PLAN_JUS_TU_DI_AI_SLIDES.md.

### Added (2026-03-10)

**Finalinio testo (apklausos) hidden treasure – nuoroda į DI Operacinį centrą (CEO)**

- **QuizResultsView.tsx:** Po mygtukų „Pradėti iš naujo“ / „Grįžti į pradžią“ – papildoma sekcija su nuoroda į https://www.promptanatomy.ceo/ (Spin-off Nr. 5), etiketė „Jei neaišku – klausk“, stilius pagal spinoff CTA (accent border, ExternalLink, min-h-[44px], target="\_blank", rel="noopener noreferrer", aria-label).
- **Lokalizacija:** `quiz.ceoSpinoffLabel`, `quiz.ceoSpinoffAria` (lt.json, en.json). Rezultatų ekrano tekstai per i18n: `resultsTitlePass`/`resultsTitleFail`, `resultsScoreBefore`/`resultsScoreAfter`, `wrongFirstHint`, `explanationStrong`/`explanationTryAgain`, `btnRestart`, `btnBack`.
- **docs/development/PDF_GENERATION_AGENT_MEMORY.md:** Pastaba – po finalinio testo hidden treasure = nuoroda į DI Operacinį centrą (CEO).
- **QuizPage.test.tsx:** Smoke testas – rezultatų ekrane rodomas CEO nuorodos linkas su teisingu href ir aria-label (LT/EN).

**Quiz LT/EN ir kreipinys (Jūs→Tu, EN DI→AI)**

- **LT quiz (lt.json):** Kreipinys **Tu** – `emptyStateHint` („Grįžk vėliau arba peržiūrėk modulius“), `selectOptionAria` („Pasirink atsakymą:“), `selectAnswerHint` („Pasirink… galėsi“), `wrongFirstHint` („peržiūrėk, ką pataisyti“).
- **EN quiz (en.json):** Technologija **AI** – `ceoSpinoffAria` („Open AI Operations Centre in a new tab“).
- **QuizPage.test.tsx:** Aria assertions atnaujinti – „Pasirink atsakymą“, CEO link priima „AI Operations Centre“ / „DI Operacinį centrą“.

**Planas Jūs→Tu ir DI/AI skaidrėse**

- **docs/archive/development/PLAN_JUS_TU_DI_AI_SLIDES.md:** Konkretus planas – konfigų failai (workflowComparisonConfig, stepExplanations, diagramų aria ir kt.) in-place pakeitimai; ProcessStepper CUSTOM_GPT_STEPS lentelė; nauji/pataisyti locale raktai (stepper, testPractice, contentSlides, celebration); komponentai (ContentSlides, TestPracticeSlides, TrueFalseQuestion/McqQuestion/ScenarioQuestion, Celebration, PracticalTask); įgyvendinimo fazės ir grep patikra. Pagal PAPRASTOS_KALBOS_GAIRES §4.

**Įgyvendinta (Fazės 1–4):** Fazė 1 – konfigai (workflowComparisonConfig, stepExplanations, ragDuomenuRuosimasLayout, diPrezentacijosWorkflowConfig, LlmAutoregressiveDiagram, TurinioWorkflowDiagram, RlProcessDiagram, MatchingQuestion, ProcessStepper CUSTOM*GPT_STEPS LT). Fazė 2 – locale (stepper, testPractice, contentSlides, celebration) lt.json/en.json. Fazė 3 – komponentai (ContentSlides, TestPracticeSlides, quiz/Celebration/PracticalTask). Fazė 4 – grep patikra. **Detalus įrašas:** žr. \_Changed (2026-03-10) – LT kreipinys Jūs→Tu* aukščiau.

**Toliau:** Grep visiems šaltiniams (components/slides, data); prireikus – PracticalTask, Celebration, ContentSlides hardcoded eilutės (plan §4.4–4.6).

### Added (2026-03-10)

**Integracija kaip subproject (Vercel + marketingo monorepo)**

- **docs/deployment/INTEGRATION_OVERVIEW.md:** Naujas dokumentas išoriniams integratoriams – repo rolė (mokymo turinys; auth/Stripe/DB – marketinge), produkcija (promptanatomy.app), subproject modelis, reikalavimai iš šio repo ir iš marketingo, Verify-access API kontraktas (endpoint, validacija, atsakymai), reference į `api/verify-access.ts`, greitos nuorodos.
- **docs/DOCUMENTATION_QUICK_REF.md:** Skyrius „4. Išoriniams integratoriams“ – nuorodos į INTEGRATION_OVERVIEW, DEPLOYMENT, CODEBASE_WHAT_IS_DONE.
- **docs/deployment/DEPLOYMENT.md:** Pastaba Production skyriuje apie deploy per monorepo; skyrius „Integracija kaip subproject (monorepo)“ – subproject vieta, root build pavyzdys, env lentelė (VITE_BASE_PATH, VITE_MVP_MODE, VITE_MAX_ACCESSIBLE_MODULE, VITE_VERIFY_ACCESS_URL), Vercel rewrites/SPA fallback, verify-access kaip marketingo atsakomybė.
- **README.md:** Nuoroda – integracija į kitą repo / subproject → pradėti nuo docs/deployment/INTEGRATION_OVERVIEW.md.
- **vite.config.ts:** Base path iš env – `base: process.env.VITE_BASE_PATH ?? (process.env.NODE_ENV === 'production' ? '/anatomija/' : '/')`.
- **src/App.tsx:** Magic link verify – naudojamas `import.meta.env.VITE_VERIFY_ACCESS_URL` kaip API bazė; fetch į `${apiBase}/api/verify-access?${query}` (tuščias = same-origin).

### Added (2026-03-10)

**Roadmap – pre-deploy, deploy, post-deploy**

- **ROADMAP.md (v2.1):** Gili kodo bazės analizės santrauka; skyrius „Pasiruošimas deploy“ (privaloma, rekomenduojama, pasirinktinai); „Deploy“ (CI/CD būklė, production scenarijai, veiksmai); „Post-deploy“ (1–2 sav. monitoring, 2–4 sav. baseline, tolesni etapai). Nuorodos į RELEASE_QA_CHECKLIST, DEPLOYMENT, INTEGRATION_OVERVIEW, CODEBASE_WHAT_IS_DONE, ANALYTICS_DASHBOARD_MVP.

### Fixed (2026-03-10)

- **.github/workflows/deploy.yml:** Build step komentaras pataisytas – „tik moduliai 1–3“ → „moduliai 1–6, 7–15 užrakinti“ (su VITE_MVP_MODE=1 rodomi 6 moduliai).

- **EN režimas – skaidrės 13–21 (Reasoning/Quality/Advanced):** VeiksmoIntroBlock – etiketės „Trumpai“, „Daryk“, „Patikra“, „Peržiūrėti žingsnius“ per `contentSlides` (EN: 1. Benefit, 2. Do, 3. Check, View steps). DiModalitiesSlide – takeaway „Trumpai: “ per `takeawayLabel`. AiDetectorsSlide – antraštės per `tldrHeading`, `doNowHeading`.
- **AiDetectorsSlide – pilnas EN (P2 i18n):** Namespace `aiDetectors`; visi tekstai (antraštė, intro, TL;DR/Do now, prompt blokas, Kaip naudoti, paieška, statistikos, empty, etika, „Aplankykite svetainę“) + duomenys per `getAiDetectors(locale)`, `getDetectorFilters(locale)`, `getDetectorTypeLabels(locale)`, `getSixBlockPrompt(locale)`. EN režime skaidrė pilnai anglų kalba.

### Added (2026-03-10)

- **EN UI – schemų/diagramų blokai (P1–P8):** LlmArch, Schema3, DiPrezentacijosWorkflow, StrukturuotasProcesas, RagDuomenuRuosimas, AgentOrchestrator, RlProcess, TurinioWorkflow – visi tekstai pagal locale (config getteriai arba i18n). Žr. `LT_EN_UI_KOKYBES_VERSTIMO_RIZIKOS_ANALIZE.md`.
- **EN UI – Faze A–D:** ContextEngineeringPipeline (config + diagrama) locale; ModuleCompleteScreen, ContentSlides, TestPracticeSlides, PracticeSummarySlide, SummarySlide – i18n raktai; M5/M6 handout loaderiai pagal locale; skaidrių fazių etiketės (phaseBasics, phaseTemplate, …) – EN rodoma „Basics“, „Template“, „6 Blocks“ ir t. t.

### Added (2026-03-09)

**Moduliai 1–15: nuoseklumo analizė ir kreipinio forma**

- **docs/development/ANALIZE_MODULIAI_1_6_NUOSEKLUMAS.md:** Naujas dokumentas – M1–6 nuoseklumo auditas (terminai, 4.1–4.7, blockVariant violet, rizikos). Papildyta: M7–M15 Jūs→tu pataisymų aprašymas; RISKS/NEXT atnaujinti.

### Fixed

**2026-03-09 (App.quiz.integration testai – lazy QuizPage ir empty-state laukimas)**

- **App.quiz.integration.test.tsx:** Pridėtas `beforeAll` su `await import('../QuizPage')`, kad lazy QuizPage būtų įkeltas prieš testus ir Suspense greitai išspręstų. Empty-state laukimas pakeistas į `screen.findByText(/Apklausos klausimų nėra/, { timeout: 10000 })`; po „Grįžti atgal“ – `waitFor`, kol empty-state tekstas išnyksta. Testų limitai 15s / 20s. Visi 4 integraciniai testai (navigacija į Apklausą, back, progress, EN locale) dabar praeina.

**2026-03-09 (Kreipinys Jūs → tu – visi moduliai, PAPRASTOS_KALBOS_GAIRES)**

- **src/data/modules.json:** Vartotojui matomi tekstai – kreipinys **tu** forma (2-as asmuo vienaskaita). M1–6: „Sukurkite“, „Parašykite“, „matote“, „gaunate“, „orientuojatės“, „klystate“, „Išskaidykite“, „Nustatykite“, „Įrašyk produktą“, Custom GPT šablono „ĮRAŠYKITE ROLĘ“ / „pasirinkite“ → „Įrašyk rolę“ / „pasirink“, žingsnių description/hint. M7–M15 (M9 scenarijai ir kt.): visi „nukopijuokite“, „įrašykite“, „paleiskite“, „Pakeiskite“, „pridėkite“, „gaukite“, „pažymėkite“, „pritaikėte“, „įklijuokite“, „aprašykite“, „nurodykite“ – motivation, description, placeholder – pakeisti į tu formą. M3 viena body: „gavote“ / „pridėkite“ → „gavai“ / „pridėk“. Žargonas (KPI, Executive Summary, HR, CFO) paliktas kitai iteracijai.

---

### Added

**2026-03-09 (Dokumentacijos lean ir pre-launch išvalymas)**

- **docs/DOCUMENTATION_QUICK_REF.md:** Greita nuoroda agentams – SOT lentelė, kritiniai keliai; pirmiausia naudoti vietoj pilno indekso (mažiau tokenų).
- **docs/LEAN_INDEX.md:** Lean branduolys – ~20 failų (SOT, agentai, M4 eilė, kokybė); pakanka daugumai užduočių; visa kita – pagal poreikį arba archyve.
- **Archyvas – development:** Perkelta ~49 failų iš `docs/development/` į `docs/archive/development/`: User Journey analizės (MODULIO*\*\_USER_JOURNEY_ANALIZE, AGENT_SEQUENCE_USER_JOURNEY_MVP), ANALIZE*_ (UI/UX, kalbos mikro), M4*SKAIDRE*_ auditai, planai ir ataskaitos; papildomai – SUMMARY_SLIDE_SPEC.md, EN_LANGUAGE_STANDARD.md, MOBILE_UI_UX_AUDIT.md. Nuorodos atnaujintos: .cursor/rules (agent-orchestrator, content-agent, content-agent-summary-slide, curriculum-agent), AGENT_ORCHESTRATOR, CONTENT_AGENT, CURRICULUM_AGENT, GOLDEN_STANDARD, RELEASE_QA_CHECKLIST, DOCUMENTATION_INDEX, LEAN_INDEX, TODO.
- **Archyvas – root ir docs .txt:** Perkelta 6 failų iš repo šaknies į `docs/archive/root/` (20260220_Testas.txt, 20260213_testo_metodologija.txt, 20260309_test_report.txt, portalas.txt, duomenu_ruosimas.txt, vaizdo_generatorius.txt) ir `docs/20260221_Linkedin_analize.txt` į `docs/archive/`. Nuorodos: VARTOTOJU_ATSILIEPIMAI_BENDRAS, LinkedIn_audience_insights_2026-02-21, DOCUMENTATION_INDEX, GOLDEN_STANDARD, ContentSlides.tsx (komentaras); ARCHIVE_README papildytas.
- **Indeksai:** DOCUMENTATION_INDEX – lean-first (LEAN_INDEX viršuje), sutrumpintos §2–4; agent-orchestrator.mdc – SOT: QUICK_REF → LEAN_INDEX → DOCUMENTATION_INDEX. docs/development/ dabar ~30 .md failų (buvo 82).

**2026-03-09 (EN locale testai – Moduliai 1–6 production)**

- **glossaryLoader.test.ts:** Naujas failas – `getGlossary('en')` ir `getGlossary('lt')` grąžina atitinkamus terminus (EN: „6-block system“, LT: „A/B testavimas“).
- **questionPoolSelector.test.ts:** Describe „selectQuestions with locale“ – `selectQuestions('en')` naudoja EN pool (iki 15 klausimų, visi id iš QUESTION_POOL_EN), `selectQuestions('lt')` – LT pool.
- **modulesLoader.test.ts:** Fixture `fakeModulesDataWith6` (6 moduliai); testas `loadModules("en") merges EN content for M1–M6` – tikrina merge iš modules-en.json ir modules-en-m4-m6.json (M1 title „6-Block System“, M4 „Context engineering“).
- **App.quiz.integration.test.tsx:** Describe „App – EN locale smoke“ – su `localStorage` locale `en` rodomi EN nav stringai (Home, Modules).
- **Dokumentacija:** RELEASE_QA_CHECKLIST §5c – pastaba apie automatinius EN testus ir nuorodos į testų failus; TESTING_CHECKLIST – sekcija „EN locale (Moduliai 1–6)“; TEST_REPORT – įrašas apie pridėtus EN locale unit ir smoke testus.

**2026-03-09 (P3.2 – EN M4–M6: ilgi copyable/template blokai)**

- **modules-en-m4-m6.json:** Pavieniai LT žodžiai ir ilgi copyable/template blokai išversti į EN – 100 % EN skaidrėms (M4–M6). Metodinis vs agentinis (slide ~45): pavyzdžiai, „Kaip atskirti?“; Custom GPT Instructions template (46.5); 5 principai – ROLE/TASK įvertinimo promptas, collapsible, correctPromptPractice (slide 49); M6 research report template (61); M6 HTML lentelė ir copyable (62); SUPER PROMPTS body/copyable/template (63); practice-scenario Custom GPT (67) – context, data, constraints, practicalTask, instructions (6 steps); businessExamples „Tyrimo ataskaita arba strategija“. Žr. ANALIZE_MODULIAI_4_5_6_KALBOS_MIKRO_AUDITAS.md §9.

**2026-03-09 (EN M4–M6 schema validacija ir plano patikra)**

- **validate-schema.mjs:** Pridėta `validateModulesEnM46()` – tikrinamas `modules-en-m4-m6.json` (3 moduliai, ta pati modulių/skaidrių schema). Prebuild/build naudoja tą patį skriptą.
- **LT_EN_M4-6_PLAN_VERIFICATION.md:** Įgyvendinimo patikra pagal LT→EN M4–6 agentų planą – failų strategija, loaderis, turinys, glossary, quiz, QA checklist, schema validacija.

**2026-03-09 (Spinoff premium UI ir 52.5 → marketingas)**

- **ContentSlides.tsx (SectionBreakSlide):** Spinoff CTA rodomas kaip premium mygtukas – accent border/spalva (`border-accent-400/500`, `text-accent-700/300`), hover `bg-accent-50`, `shadow-sm` / `hover:shadow-md`; ikonos Sparkles + ExternalLink; `min-h-[44px]`, aria-label ir focus-visible ring palikti.
- **modules.json:** Skaidrė 52.5 `spinoffCta` pakeista į marketingą – label „Turinio DI sistema rinkodaros vadovams (~45 min)“, url `https://ditreneris.github.io/marketingas/`. Skaidrė 40.5 lieka su biblioteka.
- **GOLDEN_STANDARD.md:** §3.4b ir §3.4c – spinoff aprašytas kaip premium mygtukas (accent, Sparkles + ExternalLink, shadow); M4 40.5 = biblioteka, 52.5 = marketingas.

**2026-03-09 (Sertifikatų ir artefaktų nuoroda + CTA – privaloma tvarka)**

- **certificateContent.json:** Root lygyje privalomi laukai `websiteUrl` (`https://www.promptanatomy.app/`) ir `websiteCta` („Kursas ir daugiau: promptanatomy.app“). Schema: `certificateContent.schema.json` – `websiteUrl`, `websiteCta` įtraukti į `required`.
- **certificatePdf.ts:** PDF footeryje po pagrindinio teksto – papildoma eilutė su CTA; jei jsPDF turi `textWithLink`, nuoroda spaudžiama (hyperlink). `DownloadCertificateOptions` papildyti `websiteUrl`, `websiteCta`.
- **CertificateScreen:** Perduoda `websiteUrl` ir `websiteCta` į PDF generavimą; po mygtukų – nuoroda su ExternalLink ikona į promptanatomy.app. Maketo peržiūroje rodoma ta pati CTA eilutė.
- **ModuleCompleteScreen:** Kai rodomi sertifikato mygtukai (tier 1 arba 2), po mygtukų bloku – nuoroda „Kursas: promptanatomy.app“.
- **Lokalizacija:** `certificate.websiteCta`, `certificate.websiteCtaAria` (lt.json, en.json).
- **Dokumentacija:** CERTIFICATE_CONTENT_SOT.md – privalomi laukai ir PDF maketo eilė; naujas `docs/development/SERTIFIKATU_NUORODA_CTA_IVYKDYMAS.md`.
- **Testai:** certificatePdf.test.ts – mock `getTextWidth`, `textWithLink`.

**2026-03-09 (Sertifikatų multikalbiškumas LT/EN)**

- **Duomenys:** `certificateContent.json` – root lygyje pridėti `programTitle`, `certificateLabel`, `authorByLabel`, `authorProductLabel`, `serialLabel` (LT). Naujas `certificateContent-en.json` – ta pati struktūra anglišku tekstu (Prompt Anatomy, CERTIFICATE, Certificate No. ir kt.).
- **Loaderis:** `src/data/certificateContentLoader.ts` – `getCertificateContent(locale: 'lt' | 'en')` su statiniais importais abiejų JSON; tipas `CertificateContentRoot` su tiers ir root laukais.
- **certificatePdf.ts:** `DownloadCertificateOptions` – `locale`, `programTitle`, `certificateLabel`, `authorByLabel`, `authorProductLabel`, `serialLabel`. Data pagal locale (`toLocaleDateString(locale === 'en' ? 'en-GB' : 'lt-LT', …)`). Viršus PDF ir autoriaus eilutės iš options; serijinis numeris – `formatSerialForDisplay(serial, options.serialLabel)`. Failo vardas: EN – `Prompt_Anatomy_Certificate_Tier_${tier}_${safeName}.pdf`, LT – kaip anksčiau.
- **CertificateScreen:** Naudoja `useLocale()` ir `getCertificateContent(locale)` vietoje tiesioginio importo; preview rodo `content.programTitle` ir `content.certificateLabel`; į `downloadCertificatePdf` perduodami `locale` ir visi label options. Nuorodos `href` – iš `certificateContent.websiteUrl`.
- **Schema ir validacija:** `certificateContent.schema.json` – properties `programTitle`, `certificateLabel`, `authorByLabel`, `authorProductLabel`, `serialLabel`. `validate-schema.mjs` – validuoja ir `certificateContent.json`, ir `certificateContent-en.json`.
- **Dokumentacija:** CERTIFICATE_CONTENT_SOT.md – turinys pagal kalbą, loaderis, nauji root laukai.
- **Testai:** certificatePdf.test.ts – testai su `locale: 'en'`, options.programTitle/certificateLabel, EN filename, serialLabel, datos formatas. CertificateScreen.test.tsx – `renderWithProviders`, LT/EN preview, download su locale ir content options, atskiras testas su localStorage `en` (EN turinys ir `locale: 'en'` options). a11y.smoke.test.tsx – CertificateScreen naudoja `renderWithProviders`.
- **UX:** Po sėkmingo PDF parsisiuntimo – pranešimas „Sertifikatas atsisiųstas“ / „Certificate downloaded“ ir nuoroda „Daugiau kursų: promptanatomy.app“ (`certificate.downloadSuccess`, `downloadSuccessCta` lt/en). Maketo peržiūros kortelė – `border-l-4 border-l-accent-500` (GOLDEN §2).

### Fixed

**2026-03-09 (validate:schema – Ajv $id konfliktas per build)**

- **validate-schema.mjs:** `validateModulesEnM46()` naudoja schemą iš to paties `modules.schema.json`; Ajv jau buvo registravęs schemą su tuo pačiu `$id` (validateModules), todėl antrajame `compile(enSchema)` mėtė „schema with key or id already exists“. Prieš `compile` įtrauktas `delete enSchema.$id` – EN schema kompiliuojama be ID, prebuild ir `npm run build` praeina.

**2026-03-09 (CertificateScreen EN locale testas)**

- **CertificateScreen.test.tsx:** Testas „with locale en shows EN content in preview and passes locale to download“ – mygtuko paieška pataisyta: accessible name yra aria-label „Save name and download certificate as PDF“, ne „Save and download PDF“. Naudojamas `getByRole('button', { name: /save name and download certificate as pdf/i })`. Visi 25 testų failai, 185 testai – praeina.

**2026-03-09 (Testų ataskaitos planas – 25 failę testai → 179 praeina)**

- **ModuleCompleteScreen:** Pridėtas trūkstamas `const { t } = useTranslation(['module', 'common']);` – komponentas naudojo `t()` be hook kvietimo (ReferenceError: t is not defined). Dabar visi 6 ModuleCompleteScreen testai praeina.
- **modulesLoader:** Kai `loadModules()` atmeta (reject), `promise.catch()` dabar nustato `modulesLoadError`, todėl `getModulesLoadError()` ir `clearModulesLoadError()` testai praeina.
- **Testų infrastruktūra:** `src/test/setup.ts` – įtrauktas `import '../i18n'`, kad ErrorBoundary ir CertificateScreen matytų LT vertimus. Naujas `src/test/test-utils.tsx` – `renderWithProviders(ui)` apgaubia `LocaleProvider`, kad komponentai su `useLocale()` nebekristų testuose.
- **Testų pakeitimai:** QuizPage.test.tsx, a11y.smoke.test.tsx (HomePage, ModulesPage, QuizPage), App.quiz.integration.test.tsx – naudoja `renderWithProviders` vietoj `render`. App.quiz – pataisyta viena likusi `render()` vietoj `renderWithProviders()`; testo teksto atitikmuo i18n („Apklausos klausimų nėra“).
- **Rezultatas:** 25 testų failai, 179 testai – visi praeina. Žr. planą `docs/development/CODE_REVIEW_ANALIZE_2026-03-09.md` ir test report fix plan.

### Added

**2026-03-08 (Paprastos kalbos gairės: Jūs→Tu, AI↔DI; mikro copy audit)**

- **PAPRASTOS_KALBOS_GAIRES.md §4:** Kreipinys ir terminologija (LT vs EN) – LT: **tu** forma (tavo, gali, paspausk, įrašyk, pasirink; vengti Jūs, -ite). EN: you. Terminologija: LT = DI, EN = AI. §5 – CONTENT_AGENT/QA_AGENT tikrina tu formą ir DI/AI.
- **MIKRO_UI_UX_COPY_AUDIT.md:** Naujas dokumentas – mikro UI/UX copy audit: taisyklės, atlikta (locale lt.json, modules.json), liko/checklist prieš release.

**2026-03-08 (EN a11y – testPractice, vaizdoGen, contentSlides, diagrams)**

- **i18n:** Nauji namespace: `testPractice`, `vaizdoGen`, `contentSlides`, `diagrams` (`lt.json`, `en.json`, `i18n.ts`).
- **TestPracticeSlides.tsx:** Visi kreipiniai ir aria per `useTranslation('testPractice')` (TestIntroSlide, TestSectionSlide, TestResultsSlide, PracticeIntroSlide, RemediationRetryBlock, CategoryBreakdownWithLinks) – durationLabel, thresholdPassHint, checkAnswers/checkShort, resultMeaningAria/Heading, whereToApply*, viewModule*/startModule*/retry* aria, radarTitle/Desc, knowledgeMapTitle/Hint\*, close, backToResultAria, M5 fallbacks ir kt.
- **VaizdoGeneratoriusSlide.tsx:** Pilnas UI per `useTranslation('vaizdoGen')` – tldr, žingsniai, sekcijos, laukai, placeholders, copy/copied, eksperto patarimai, chooseGenerator, checkTitle/checkText.
- **Schema3InteractiveDiagram.tsx:** `useTranslation('diagrams')` – schema3Aria, schema3InteractiveHint, schema3NodeAria.
- **ContentSlides.tsx (ContentBlockSlide):** `useTranslation('contentSlides')` – bonusSlideAria, whyBenefitAria, downloadTemplateAria, helpCardsTablistAria, expandAllAria, collapseAllAria, solutionAria, pdfHandoutAria, optionalSlideAria/Label.
- **EN_UI_UX_LANGUAGE_AUDIT.md:** §2.2 atnaujintas – Fixed (TestPracticeSlides, VaizdoGeneratoriusSlide, Schema3InteractiveDiagram, ContentSlides).

**2026-03-08 (Rizikos ir modulių 1–6 skaidrių seka)**

- **Naujas dokumentas:** `docs/development/RISKS_IR_MODULIU_1_6_SKAIDRIU_SEKA.md` – release QA nuoroda: aprašytos rizikos (ifWrongSee, M5 footer), pataisymai, pilna M1–M6 skaidrių eilė (pozicija | id | pavadinimas), patikros prieš release pagal `footer-slide-numbers.mdc`.

**2026-03-08 (WWW nuorodos integracija – footer ir README)**

- **Footer:** Pridėta nuoroda „Svetainė“ → https://www.promptanatomy.app/ (`src/App.tsx`) – prieš Telegram ir GitHub; tas pats stilius, `target="_blank"`, `rel="noopener noreferrer"`, `aria-label="Oficialus projekto puslapis (atidaryti naujame lange)"`.
- **README § Kontaktai:** Pridėta eilutė **Svetainė:** [promptanatomy.app](https://www.promptanatomy.app/) – pagal EDU/GitHub geriausias praktikas (docs/development/WWW_NUORODOS_INTEGRACIJA_KISS_MARRY_KILL.md).

**2026-03-07 (LT/EN lokalizacija – moduliai 1–3, pilnas UI)**

- **i18n infrastruktūra:** `i18next`, `react-i18next`; `src/i18n.ts`, `src/locales/lt.json`, `src/locales/en.json`; `LocaleContext` + `useLocale()`; kalbos perjungiklis LT | EN navigacijoje (`AppNav`); locale išsaugojimas `localStorage`.
- **Duomenų apkrovimas pagal locale:** `modulesLoader` – atskiri cache LT/EN, `modules-en.json` (moduliai 1–3) prijungiamas, kai `locale === 'en'`; `glossaryLoader` (`glossary-en.json`); `questionPoolSelector` – `QUESTION_POOL_EN` / locale; `getModulesSync(locale)`, `getGlossary(locale)` ir kt. per visą app.
- **UI stringai per `t()`:** HomePage (hero, stats, features, quick prompts, how-to), ModulesPage (header, progress, badges, CTA, lock, completion), QuizPage (empty state, loading), GlossaryPage (title, subtitle, filter, unlock), ModuleView (back, slide counter, resume blokas, Fast track, ErrorBoundary fallback, next/complete mygtukai), ModuleCompleteScreen (complete title, badge, module N of total), ErrorBoundary default ekranas (`i18n.t()`).
- **Kontekstiniai „Tęsti“ mygtukai locale-aware:** `nextToPracticeSummary`, `nextSelectScenario`, `nextStartScenarioN`, `nextSelectOtherTask`, `nextContinueWith` – naudojami `nextSlideLabel` / `nextSlideContextLabel` (Moduliai 3 ir 9).
- **EN versijoje DI → AI:** Visi vartotojui matomi EN tekstai naudoja „AI“ (AI Prompt Engineering Training, AI prompts, AI communication system, AI tool, Turn AI into your work system).
- **Papildomi modulio raktai:** resumeWelcome, resumeFromSlide, resumeModuleLabel, resumeContinueFrom, resumeStartOver, fastTrackAria, fastTrackLabel, slideLoadError, slideLoadErrorHint, refresh; common: errorTitle, errorHint, retry, refreshPage, techInfo.
- **Failai:** `src/i18n.ts`, `src/contexts/LocaleContext.tsx`, `src/locales/lt.json`, `src/locales/en.json`, `src/data/modulesLoader.ts`, `src/data/glossaryLoader.ts`, `src/data/modules-en.json`, `src/data/glossary-en.json`, `src/data/questionPool.en.ts`, `src/utils/questionPoolSelector.ts`, `src/App.tsx`, `src/components/AppNav.tsx`, `src/components/HomePage.tsx`, `src/components/ModulesPage.tsx`, `src/components/ModuleView.tsx`, `src/components/QuizPage.tsx`, `src/components/GlossaryPage.tsx`, `src/components/ModuleCompleteScreen.tsx`, `src/components/ui/ErrorBoundary.tsx`, ir susiję slide/components.
- **ProcessStepper pilnas EN turinys:** `CUSTOM_GPT_STEPS_EN` – visi 8 žingsniai (Goal, Role, Connection, Configuration, Extra features, Testing, Publishing, Improvement) su description, actionChecklist, tip, externalLink; `steps` per locale (`locale === 'en'` → EN). Žingsnio 4 nuoroda į šabloną ir žingsnio 8 santrauka per `stepper.templateHint`, `summaryHeading`, `summaryBullet1–4` (en.json / lt.json). Kortelė, diagramos aria-labels ir „You are here“ – angliškai, kai pasirinkta EN.

**2026-03-04 (Skaidrė 45 „4 dedamosios": viena progresinė pipeline schema)**

- **Nauja diagrama:** `ContextEngineeringPipelineDiagram.tsx` + `contextEngineeringPipelineConfig.ts` (`src/components/slides/shared/`) – vertikali 6 mazgų SVG schema rodanti dviejų kelių evoliuciją: Prompt engineering (brand/navy) vs Konteksto inžinerija (emerald). Mazgai: Vartotojo tikslas → Prompt → Kontekstas → LLM → Įrankiai/Duomenys → Output. Be `EnlargeableImage`.
- **modules.json (id 45):** `workflowImages` (du neegzistuojantys PNG) pakeisti į `pipelineDiagram: "context-engineering"` + atnaujinta `workflowImagesHeading`; visos sekcijos, practicalTask, copyable promptas lieka nepakeisti.
- **modules.ts:** pridėtas optional laukas `pipelineDiagram?: 'context-engineering'` prie `ContentBlockContent`.
- **ContentSlides.tsx:** render logika po section index 1 – jei `content.pipelineDiagram === 'context-engineering'`, rodomas `<ContextEngineeringPipelineDiagram />`; kitaip – esama `workflowImages` grid logika (nepaveiktos kitos skaidrės).
- **shared/index.ts:** eksportuojamas `ContextEngineeringPipelineDiagram`.
- **docs/turinio_pletra_moduliai_4_5_6.md:** atnaujinta 4.1a2 sekcija – dokumentuota nauja pipeline diagrama (SOT).
- **Schema validacija:** `node scripts/validate-schema.mjs` – OK.

**2026-03-03 (M4–M6 testų rinkinio praplėtimas: 122 → 174 testai)**

- **6 nauji testų failai:**
  - `slidePhaseConfig.test.ts` (20 testų) – `getPhaseLabel()` ir `buildSlideGroups()` M4/M5/M6 fazių logika.
  - `m5HandoutPdf.test.ts` (4) – Modulio 5 PDF atmintinės generavimas (jsPDF mock, smoke su tikru JSON).
  - `m6HandoutPdf.test.ts` (4) – Modulio 6 PDF atmintinės generavimas.
  - `ModuleCompleteScreen.test.tsx` (6) – sertifikatų tier 1/tier 2 gating, handout PDF mygtukas, „Pradėti apklausą" sąlyga.
  - `ToolsPage.test.tsx` (5) – filtravimas pagal modulį, tuščia būsena, `initialFilter` prop.
  - `CertificateScreen.test.tsx` (4) – vardo įvedimas, disabled mygtukas, PDF atsisiuntimas.
- **4 esami failai papildyti:**
  - `progress.test.ts` (+4 testai) – `moduleTestScores` save/load round-trip, validacija.
  - `mvp.gating.test.tsx` (+3 testai) – non-MVP režimas: M4, M5, M6 pasiekiami.
  - `a11y.smoke.test.tsx` (+2 testai) – ToolsPage ir CertificateScreen axe-core smoke.
  - `App.quiz.integration.test.tsx` – pridėtas per-test timeout (15 s) testams 2 ir 3; ištirta priežastis (Vitest default 5 s < vidinis `waitFor` 10 s).
- **Rezultatas:** 24 testų failai, 174 testai – visi praeina. M4–M6 padengimas nuo 0 iki ~52 testų.
- **Failai:** `src/utils/__tests__/slidePhaseConfig.test.ts`, `src/utils/__tests__/m5HandoutPdf.test.ts`, `src/utils/__tests__/m6HandoutPdf.test.ts`, `src/utils/__tests__/progress.test.ts`, `src/components/__tests__/ModuleCompleteScreen.test.tsx`, `src/components/__tests__/ToolsPage.test.tsx`, `src/components/__tests__/CertificateScreen.test.tsx`, `src/components/__tests__/mvp.gating.test.tsx`, `src/components/__tests__/a11y.smoke.test.tsx`, `src/components/__tests__/App.quiz.integration.test.tsx`.

### Changed

**2026-03-08 (Jūs→Tu, -ite→-i: locale ir modules.json)**

- **lt.json:** Kreipinys į dalyvį – Jūsų/jūsų→Tavo/tavo (home.progressLabel, certificate.\*, stepper.summaryHeading/diagramAria/selectStep, testPractice.radarDesc/whatYouLearned/yourTaskAria/yourChoiceLabel/selfAssessmentDesc/projectStepsDesc ir kt.). Veiksmažodžiai: Paspauskite→Paspausk, Įrašykite→Įrašyk, Pasirinkite→Pasirink, Peržiūrėkite→Peržiūrėk, Tęskite→Tęsk (home, certificate, stepper, testPractice, module, quiz, vaizdoGen, contentSlides, diagrams). thresholdPassHint: „Kai pasieksi ≥{{pass}} %, gali pereiti…“.
- **modules.json:** Visi moduliai (1–15) – galite/Galite→gali/Gali, galėsite→galėsi, Įrašykite→Įrašyk, Pasirinkite→Pasirink, Peržiūrėkite→Peržiūrėk; jūsų/Jūsų→tavo/Tavo (organizacijoje, projekte, pagrindas, duomenys, duomenų sritis); atidarykite→atidaryk, atsispausdinsite→atsispausdinsi; žinote→žinai, Turite→Turi, Užbaigėte→Užbaigei, Turėte→Turi, Norite→Nori; pasirinkite/naudokite/peržiūrėkite→pasirink/naudok/peržiūrėk; Pasiekę ≥70 % gali→Kai pasieksi ≥70 %, gali; rekomenduojame peržiūrėti→rekomenduojame peržiūrėk. Schema validacija po pakeitimų – OK.
- **MIKRO_UI_UX_COPY_AUDIT.md §3.1:** Pažymėta, kad modules.json Jūs→Tu atlikta.

**2026-03-08 (Magic link Phase 1: access_tier tik 3 ir 6)**

- **API:** `api/verify-access.ts` – `VALID_TIERS` apribotas iki `[3, 6]`; užklausos su `access_tier=9` arba `12` grąžina 400 „Invalid access_tier“. JSDoc patikslinamas: Phase 1 tik 3|6.
- **Frontend:** `src/App.tsx` – po sėkmingos magic link verifikacijos į sessionStorage įrašomas tik tier 3 arba 6 (`[3, 6].includes(tier)`).
- **Dokumentacija:** `docs/development/ACCESS_MAGIC_LINK_INTEGRATION.md` – tokeno kontrakte nurodyta: Phase 1 tik `3` arba `6`, kitos reikšmės – 400. Atitinka `mokymu_komanda_memo.md`.

**2026-03-08 (Executive ataskaita – skaičiai ir lietuvių kalba)**

- **Programos apimtis (skaičiais):** Pridėta lentelė po „Įėjimo logika“: 97 žodyno terminai, 57 DI įrankiai, 15 paruoštų promptų šablonų (bibliotekoje), 100 kopijuojamų promptų moduliuose, ~115 iš viso paruoštų promptų; santraukoje – trumpa nuoroda į tuos pačius skaičius.
- **Stilistika ir gramatika:** Paskirtis – „Pilnas programos apžvalga“ → „Pilna programos apžvalga“, „visi moduliai nuo 1 iki 15“ → „visi 15 modulių“. Pirmoji pastraipa perrašyta paprastesne kalba: „struktūruotas mokymasis… per promptų inžineriją: nuo… iki išvesties“ → „programa, kur mokomasi dirbti su DI: kaip formuluoti užklausas (promptus) taip, kad atsakymas būtų aiškus, nuspėjamas ir patikrinamas“.
- **Failas:** `docs/EXECUTIVE_ATASKAITA_PROGRAMOS_1_IKI_15.md`.

**2026-03-08 (Rizikų pataisymai – M5 ifWrongSee ir footer)**

- **ifWrongSee (M5 testai):** Po skaidrės 47 skirstymo į 47 + 47.5 – nuorodos „jei neteisingai, peržiūrėk“ atnaujintos: `slideId` 47 → 47.5, `label` „Prezentacijos workflow“ / „Prezentacijos workflow (įrankiai)“ → „Pilnas turinys ir įrankiai“ (2 vietos: warm-up 511, mini testas 512).
- **M5 skaidrė 515 footer:** „Toliau – skaidrė 5“ → „Toliau – skaidrė 6: Pasiruošimo savitikra“ (kita skaidrė eilėje – 511, 6-oji pozicija). Atitinka `footer-slide-numbers.mdc` (1-based pozicija).
- **Failas:** `src/data/modules.json`.

**2026-03-08 (EN M1–M3 pilnas vertimas, LT M4–M6 Jūs→TU)**

- **EN – modules-en.json (Moduliai 1–3):** Visur pakeista **DI → AI**. Vartotojui matomi tekstai išversti į anglų kalbą pagal EN_LANGUAGE_STANDARD: modulio title/subtitle/description, skaidrės (action-intro, infographic, definitions, workflow-summary, prompt-types, prompt-techniques, prompt-template, transition, hierarchy, meta/input/output/reasoning/quality/advanced, full-example, comparison, glossary, summary), Modulio 2 test-intro ir visi testQuestions (question, options, explanation, hint) + bonus slides 51–52, Modulio 3 practice-intro, warm-up, **visi 6 scenarijai** (situation, context, data, constraints, expectedFormat, practicalTask, instructions su 6 steps, template, templateLabel) ir abu summary slides (37, 38). Kopijuojami promptai EN: „You are…“, „Your goal…“. Antroji osoba (you/your), CTA veiksmažodžiai.
- **LT – modules.json (Moduliai 4, 5, 6):** Kreipinys **Jūs → TU** tik M4–M6: Apibrėžkite/Nurodykite→Apibrėžk/Nurodyk, Turite/galite/suprantate→Turi/gali/supranti, rekomenduojame/peržiūrėkite→rekomenduoju/peržiūrėk, pasirinkite/įrašykite/sukurkite/Laikykite/pakeičiate/Saugokite/laikote/Vizualizuokite/aprašykite ir kt. → atitinkamos TU formos. Moduliai 7–15 nekeisti.
- **Validacija:** `node scripts/validate-schema.mjs` – modules.json OK.
- **Failai:** `src/data/modules-en.json`, `src/data/modules.json`.

**2026-03-08 (Skaidrių navigacijos taškai – viena eilutė, horizontalus scroll ilgiems moduliams)**

- **Problema:** Ilguose moduliuose (M4 ~41, M7 ~50 skaidrių) taškai po skaidrėmis dėl `flex-wrap` ir `max-w-md` persidėliojo į 4+ eilutes – prasta UX ir vizualus triukšmas.
- **Sprendimas:** Skaidrių taškai visada **viena eilutė** – `flex-nowrap` + horizontalus scroll (`overflow-x-auto`, `scroll-smooth`). Ilgiems moduliams (>24 skaidrės) – mažesni taškai (36px touch target, mažesnis aktyvus taškas), kad daugiau tilptų be perteklinio scroll.
- **A11y:** Konteineriui pridėtas `aria-label` su skaidrių skaičiumi; vertimai `slideDotsAria` (lt/en).
- **Failai:** `src/components/ModuleView.tsx`, `src/locales/lt.json`, `src/locales/en.json`. Geriausios praktikos: `docs/development/GOLDEN_STANDARD.md` §8.5.

**2026-03-04 (M4 skaidrė 45 – user journey copy polish + premium tono mikro pataisa)**

- **`src/data/modules.json` (id 45 „4 gero prompto dedamosios“):** atliktas turinio glaustinimas pagal „mažiau yra daugiau“ be struktūros keitimo – perrašyti blokai „1️⃣ Trumpai“, „Kodėl čia?“, 1–4 dedamųjų aprašymai, „2️⃣ Daryk dabar“, „3️⃣ Kopijuojamas promptas“ ir `practicalTask.template`.
- **Terminų nuoseklumas:** pašalintas 3/4 konfliktas („3 elementai“), dabar aiškiai komunikuojamos **4 dedamosios** (tikslas, kontekstas, struktūra, formatas).
- **UI mikro tonavimas (optional):** `src/components/slides/shared/ContextEngineeringPipelineDiagram.tsx` toggle mygtukuose pašalintos emoji (`⚡`, `🧠`) – santūresnis premium SaaS tonas, nekeičiant elgsenos ar schemos geometrijos.
- **Patikra:** redaguotos vietos peržiūrėtos pagal `PAPRASTOS_KALBOS_GAIRES.md` ir `GOLDEN_STANDARD.md` §3.2 / §3.2b; linter klaidų naujai neįvesta.

**2026-03-03 (M1–M6 „Tęsti:" etikečių mikro lietuvių kalbos auditas)**

- **Logika `ModuleView.tsx`:** Perkurta „Tęsti:" etiketės generavimo logika – dabar šalina emoji iš pradžios, šalina skliaustų turinį (pvz. „(RL / RLHF)", „(HTML)"), nupjauna kabančius jungtukus/prielinksnius (ir, su, iš, kaip, savo, kurios, kodėl…) ir galinę skyrybą (?,.:,–…). Fallback: jei po valymo < 3 simboliai – pirmi 2 žodžiai.
- **`modules.json` – title:** „Prieš vs Po" → „Prieš ir Po" (M1 id 13; „vs" anglicizmas).
- **`modules.json` – 7 shortTitle pridėta/pataisyta:** „Prieš ir Po" (M1 id 13), „RAG praktiškai" (M4 id 56), „RAG atmintis" (M4 id 60), „Paskatinamasis mokymas" (M4 id 48), „Sprintas" (M5 id 510), „HTML praktika" (M6 id 68), „Custom GPT schema" (M6 id 66).
- **Rezultatas:** 0 problemų visose 101 etiketėje (M1–M6) – be kabančių žodžių, skyrybos, skliaustų.
- **Failai:** `src/components/ModuleView.tsx`, `src/data/modules.json`.

**2026-03-03 (M4–M6 TITLE / SUBTITLE mikro lietuvių kalbos redagavimas)**

- **Prioritetas 1 (12 pakeitimų):** „Optional:" → „Papildoma:", „vs" → „ir… skirtumai" / „ir blogai", „Ar suprantate?" → „Ar supranti?", „formatinis grįžtamasis ryšys" → „greitas patikrinimas", pašalinta vidinė ID nuoroda „(4.4-degradation)".
- **Prioritetas 2 (17 pakeitimų):** „Basic" → „Pradinis", „Memory" → „Atmintis", „no prompts" → „ko vengti", „Brief" → „Brief (trumpoji užduotis)" (pirmas kartas), „Bridžinė" → „Jungiamoji", „versatiliai" → „universalūs", „atspaudas" → „apžvalga", „recap" → „apžvalga". Sinchronizuoti footeriai ir shortTitle.
- **Prioritetas 3 (13 pakeitimų):** Sutrumpinti ilgi subtitle, paaiškinti dviprasmiai pavadinimai (4 dedamosios, HTML tinklalapis, Custom GPT, workflow → darbo eigos), „neskaityti į rezultatą" → „nevertinama į rezultatą", „matėte M4" → „matei Modulyje 4", pašalintas žargonas M6 subtitle.
- **Footeriai (17 pakeitimų):** 8 footer sinchronizuoti su atnaujintais title; 9 M4 footeriai konvertuoti iš seno formato į standartinį „Toliau – skaidrė N: [pavadinimas]".
- **Failai:** `src/data/modules.json`.

### Fixed

**2026-03-02 (Deep research skaidrė 64 – turinio sutvarkymas)**

- **64 (Deep research):** Sutvarkytas turinys – integruota, mažiau dubliacijos. „Kada to reikia?“ + „Kas tai iš esmės?“ (4 etapai). Pridėti linkai į Perplexity, ChatGPT, Claude, Gemini, Elicit, Consensus. Quick win promptas pabaigoje: „Sukurk promptą giliam tyrimui apie [tema]“. Esmė – vienas sakinys. Paprasta kalba (daugiapakopis). Footer „Toliau – Promptų sekos (65)“.
- **65 (Promptų sekos):** Pridėtas copyable šablonas „Parašyk man promptų seką, kuri padėtų išspręsti [PROBLEMA].“ Paprasta kalba – „multi-step“ → „daugiapakopiams“. Footer „Toliau – Bridžinė praktika (65.5)“.
- **65.5 (Bridžinė praktika):** Rašybos – „trukšmai“ → „trūkumai“, „nepavžiko“ → „nepavyko“. Footer „Toliau – Savitikra: Deep research (65.7)“.
- **65.7 (Savitikra):** Subtitle „2 klausimai – formatinis grįžtamasis ryšys“ → „5 klausimai – greitas patikrinimas“. Paprasta kalba – „multi-step“ → „daugiapakopis“ (options).
- **Failai:** `src/data/modules.json`.
- **Analizė:** `docs/development/MODULIO_4_DEEP_RESEARCH_USER_JOURNEY.md` (USER_JOURNEY + CURRICULUM).

**2026-03-02 (RAG duomenų paruošimas – diagramos blyksnio bug'as)**

- **Problema:** Paspaudus diagramos ikoną, virš jos blykdavo didesnis ovalas/stačiakampis (tap highlight, focus ring).
- **Sprendimas:** Tik apskritimas (56×56) paspaudžiamas – etiketė su `pointer-events-none`; `div` su `role="button"` vietoj `<button>`; pašalintas `cursor: pointer` (SO #20853238); `scale-110` pakeistas į `ring-2 ring-inset`; `index.css` – `.rag-duomenu-step` su `-webkit-tap-highlight-color: transparent !important` ir `outline: none` focus/active būsenoms.
- **Failai:** `RagDuomenuRuosimasDiagram.tsx`, `RagDuomenuRuosimasBlock.tsx`, `index.css`.

### Added

**2026-03-02 (RAG duomenų paruošimas – Kiss-Marry-Kill supaprastinimas)**

- **Kill:** Pašalintas blokas „Kopijuojami promptai“ – schema kortelė jau turi promptus ir Copy; trikartinis kartojimas pašalintas.
- **Kill:** Generinis sakinys „Šis žingsnis padeda DI modeliui…“ iš „Kodėl tai svarbu?“ – paliktas tik step.benefit.
- **Collapsible:** „5 patarimai patikimumui“ → „Ką dar darau?“ (collapsible, collapsedByDefault, terms).
- **Trumpai:** Sutrumpintas – „5 žingsniai: metaduomenys → išvalymas → antraštės → fragmentai → santrauka. Pasirink žingsnį – pamatysi promptą ir nukopijuok.“
- **Subtitle:** Pridėtas „fragmentai“ – atitinka 5 punktus.
- **Failai:** `modules.json`, `RagDuomenuRuosimasBlock.tsx`, `turinio_pletra_moduliai_4_5_6.md`.

**2026-03-02 (RAG duomenų paruošimas – Kiss-Marry-Kill planas įgyvendintas)**

- **Visa paruošimas promptas (P1):** Pridėtas 6-as promptas į skaidrės 62 „Kopijuojami promptai“ – „Paruošk šį tekstą RAG naudojimui: 1) išvalyk, 2) pridėk santrauką pradžioje, 3) antraštės ir anonsas, 4) metaduomenys (šaltinis, data, tipas). Pateik vienu bloku.“ SOT atitiktis. _(Pakeista: blokas pašalintas 2026-03-02 supaprastinime.)_
- **Schema sekcija blockVariant (P2):** „RAG ruošimo magistralė“ sekcijai pridėtas `blockVariant: brand` – vizualinė hierarchija.
- **5 patarimų skenuojamumas (P3):** Body išskaidytas į bullet points su **bold** antraštėmis kiekvienam punktui – geresnis skenuojamumas.
- **SCHEME_AGENT §5 checklist (P4):** Sukurtas `docs/development/M4_SKAIDRE_62_SCHEMA_CHECKLIST.md` – RAG ruošimo magistralės vizualinė patikra (rodyklės N/A, path OK, interaktyvumas OK).
- **Dark mode layout (P5):** `ragDuomenuRuosimasLayout.ts` – pridėti `bgLightDark` variantai per žingsnį (brand, emerald, violet, amber, slate); `RagDuomenuRuosimasBlock.tsx` – ikonų konteineris naudoja semantinius dark fonus.
- **Footer numeriai (P6):** Patikrinta pagal `footer-slide-numbers.mdc` – skaidrė 62 footer „Toliau – skaidrė 26“ atitinka (63 = 26 pozicija M4). Dokumentuota `M4_SKAIDRE_62_RAG_DUOMENU_PARUOSIMAS_PARUOSTI_TVIRKYMUI.md` §9.
- **Failai:** `src/data/modules.json`, `src/components/slides/shared/ragDuomenuRuosimasLayout.ts`, `src/components/slides/shared/RagDuomenuRuosimasBlock.tsx`, `docs/development/M4_SKAIDRE_62_SCHEMA_CHECKLIST.md`, `docs/development/M4_SKAIDRE_62_RAG_DUOMENU_PARUOSIMAS_PARUOSTI_TVIRKYMUI.md` §9.
- **Planas:** `docs/development/WORKFLOW_SAMPRATA_KISS_MARRY_KILL.md` metodologija; `docs/development/M4_SKAIDRE_62_RAG_DUOMENU_PARUOSIMAS_PARUOSTI_TVIRKYMUI.md`.

**2026-02-28 (Sales OS – minimalus pardavimų paketas)**

- **sales-os/** – minimalus pardavimų paketas pagal Sales OS spec: `product_snapshot.md` (kam, problema, rezultatas, kaina), `marketing_plan.md` (ICP, pasiūlymas, kanalas, 30d tikslas, KPI, A/B/C segmentai, 3 pitch'ai), `crm_active.md` (Top 20 iš `dalyviu_sarasas.md`, A segmentas, Next Action, statusai), `README.md` (Kiss–Marry–Kill lentelė – kas įtraukta, kas ne).
- **CRM:** Top 20 kontaktai su vardais, įmonėmis, segmentu A – šaltinis `dalyviu_sarasas.md` (root, 132 asmenys). 3 pitch'ai pagal rolę: HR / IT / Vadovams.
- **Kiss–Marry–Kill:** Įtraukta – Top 20, segmentacija, pitch'ai; neįtraukta – pilnas sąrašas, src/, docs/, workflow, roadmap.

**2026-02-28 (Workflow Samprata – promptų palyginimas, Pirmyn → Tęsti)**

- **Workflow Samprata – promptų blokai:** Pridėtas Pokalbis pavyzdys („Papasakok apie promptų inžineriją“) – vienas sakinys be struktūros. Workflow pavyzdys pagerintas: rolė, formatas, tonas, apimtis atskirose eilutėse. Vietoj generic TemplateBlock – spalvotos kortelės (amber = Pokalbis, emerald = Workflow), badge viršuje, didesnis tekstas (15px), sekcijos antraštė „Palygink promptus“. Failai: `ContentSlides.tsx` (WorkflowSummarySlide), `modules.json`.
- **ModuleView – navigacijos mygtukas:** „Pirmyn“ pakeistas į **„Tęsti“** (desktop ir mobile). Kontekstinė etiketė: „Tęsti: [kitos skaidrės pavadinimas]“. Failas: `ModuleView.tsx`.

**2026-02-28 (Workflow Samprata – gili analizė įgyvendinimas)**

- **Kill:** Intro blokas – pašalintas gradient ir emoji; paliktas vienas sakinys viršuje. Collapsible „Nori daugiau?“ ir „Kada rinktis?“ – pašalinti. „Techniška detalė“ (LLM Info) – pašalinta. Stepper 1→2→3 – pašalintas.
- **Schema:** LAYER_LABELS (3 sluoksnių etiketės) – pašalintos. LLM bloke Basic režime – „kalbos modelis“ (paprasta kalba). Rodyklių etiketės (klausimas, atsakymas, nurodymai) – pašalintos.
- **CTA:** „Paspausk Workflow – pamatysi skirtumą.“
- **Layout:** Vienodas max-w 800px visiems blokams (schema, CTA, input, output).
- **Failai:** `ContentSlides.tsx` (WorkflowSummarySlide), `WorkflowComparisonInteractiveBlock.tsx`, `WorkflowComparisonDiagram.tsx`, `workflowComparisonConfig.ts`. SOT: `docs/development/WORKFLOW_SAMPRATA_GILI_ANALIZE_2026_02.md`.

**2026-02-28 (Workflow Samprata – Kiss/Marry/Kill įgyvendinimas)**

- **Turinys:** Intro sutrumpintas iki framing sakinio („Skirtumas paprastas: Pokalbis = laisvas atsakymas. Workflow = struktūruotas rezultatas.“). Pavyzdžiai – 1 (Workflow). CTA vienas: „Perjunk į Workflow ir įrašyk kelis žodžius – pamatysi, kaip keičiasi rezultatas.“
- **UI supaprastinimas:** Explanation card ir Decision block (6 bullet) – collapsible „Nori daugiau?“ ir „Kada rinktis Pokalbį, kada Workflow?“. LLM Info – collapsible „Techniška detalė“. Section 3 Workflow – vienas input „Įrašyk kelis žodžius“, fiksuotas output tipas Dokumentas (be 3 tab).
- **Vizualinis patrauklumas:** „Tu esi čia“ badge („Dabar matote: Pokalbis/Workflow“). Workflow mygtukas nepasirinktas – outline emerald (ne pilkas). Schema Workflow režime – emerald ring/glow.
- **Failai:** `WorkflowComparisonInteractiveBlock.tsx`, `workflowComparisonConfig.ts` (CTA_SENTENCE, INPUT_PLACEHOLDERS), `modules.json` (patch-workflow-samprata-kiss.mjs), `turinio_pletra.md`. SOT: `docs/development/WORKFLOW_SAMPRATA_KISS_MARRY_KILL.md`.

**2026-02-28 (Workflow Samprata – UX auditas)**

- **Auditas:** `docs/development/WORKFLOW_SAMPRATA_UX_AUDITAS.md` – „Workflow Samprata“ skaidrės (Modulis 1, skaidrė id 15) UI/UX auditas iš pirmo karto vartotojo perspektyvos: aiškumas per 60–120 s, trintis, micro-win, paprasta kalba (prieš/po), Golden standard patikra.

**2026-02-28 (Workflow Samprata – sprendimo UX įgyvendinimas)**

- **Interaktyvus blokas (WorkflowComparisonInteractiveBlock):** Įrėminimo sakinys virš schemos („Skirtumas paprastas: Pokalbis = laisvas atsakymas. Workflow = struktūruotas rezultatas.“); pasekmės eilutė po pasirinkimo (Pokalbis / Workflow); sprendimo blokas „Kada rinktis Pokalbį?“ ir „Kada rinktis Workflow?“ (6 bullet); mikro-užduotis apačioje (accent blokas). Vizualinė hierarchija: schemos wrapper su šviesesniu fonu, LLM centrinis blokas diagramoje ~10 % tamsesnis. Konfigūracija: `workflowComparisonConfig.ts` (consequenceLine, FRAMING_SENTENCE, DECISION_BLOCK, MICRO_TASK_LABEL, brandDarker, emeraldDarker). A11y: region, aria-labelledby sąrašams. Dokumentacija: `WORKFLOW_SAMPRATA_UX_AUDITAS.md` §5.

**2026-02-26 (M4 skaidrė 60: Atmintis, paprasta kalba, collapsible, lentelės wrapper)**

- **Paprasta kalba (PAPRASTOS_KALBOS_GAIRES):** Skaidrė „RAG: Atmintis ir įrankiai“ (id 60) – **FMCG** pašalintas; naudojama tik lietuviška frazė **„greitai gaminamų vartotojų produktų distribucijoje“** (be akronimo). **Memory → Atmintis** visur vartotojui matomame tekste: skaidrės title, shortTitle, subtitle, sekcijų antraštės ir body, lentelės langeliai ir badge’ai („Atmintis“, „Atmintis + dokumentai“), įspėjimas „⚠ Atmintis gali būti netikslus“. Produktų pavadinimai – „pvz. ChatGPT, Claude“ (be angliško „Memory“).
- **Collapsible (GOLDEN_STANDARD §3.2):** Sekcijoms **Atmintis**, **Išoriniai šaltiniai**, **Duomenų paruošimas** ir lentelės sekcijai („Kada naudoti Atmintis, o kada dokumentus?“ / „Sprendimo matrica“) – `collapsible: true`, `collapsedByDefault: true`; sumažintas pradinis scroll ir kognityvinė apkrova.
- **Lentelės vizualas (ContentSlides.tsx):** Sekcijoms su `blockVariant: terms` ir lentele – wrapper gavo **vizualų atskyrimą** (`bg-white dark:bg-slate-900/40`, `border-l-4 border-slate-400 dark:border-slate-500`). Dviejų stulpelių (ne solution matrix) lentelėse antram stulpeliui – `min-w-[10rem]` (mažiau laužymo).
- **SOT:** `docs/turinio_pletra_moduliai_4_5_6.md` – §4.2a ir nuorodos: Atmintis, FMCG → paprasta frazė; terminų bloke **„Atmintis (Memory)“** → **„Atmintis“** (be angliško termino).
- **Skriptai:** `scripts/patch-m4-60-collapsible-fmcg.mjs` (collapsible + FMCG paaiškinimas), `scripts/patch-m4-60-atmintis-fmcg.mjs` (Memory→Atmintis, FMCG→paprasta frazė; modules.json + SOT).
- **Auditas:** `docs/development/M4_SKAIDRE_60_RAG_MEMORY_UI_UX_AUDITAS_DETALUS.md` §9 – prioritetizuotas veiksmų sąrašas su statusais (įgyvendinta).

**2026-02-26 (UI/UX: navigacija, LlmArch diagrama, dark mode, Pirmyn/Atgal)**

- **Navigacija (AppNav):** Aktyvus tabas (Moduliai, Pagrindinis, Žodynėlis, Įrankiai, Apklausa) – stipresnis kontrastas (`bg-brand-600`, `font-semibold`), **2px apatinis accent** (`border-b-2 border-accent-500`); neaktyvus – `border-transparent`. Taikoma desktop ir mobile meniu.
- **ModuleView – Pirmyn/Atgal (layout):** Viena navigacijos vieta desktop – pašalintos kairė/dešinė kolonos; liko tik viršutinė juosta kortelėje. Juosta **sticky** (`sticky top-16 z-20`) su fonu (`bg-white/95 backdrop-blur-md`), kad ilgose skaidrėse mygtukai būtų visada pasiekiami. Grid – viena kolona (`grid-cols-1`). Vizualinė analizė – `docs/development/M4_SKAIDRE_56_RAG_UI_UX_AUDITAS.md` §7.
- **ModuleView – Pirmyn/Atgal (vizualinė hierarchija):** „Atgal“ – ghost mygtukas (be fono, `bg-transparent`, pilka tekstas, švelnus hover), kad nekonkuruotų su primary CTA. „Pirmyn“ – vienintelis primary: didesnis blokas (`min-h-[48px]`, `px-5`, `py-3`, `rounded-xl`), ryškesnis brand (`bg-brand-600`), `shadow-md hover:shadow-lg`, **hover lift** (`transition-all duration-200`, `hover:-translate-y-0.5`). Progresas prie CTA: desktop sticky nav dešinėje rodomas „Skaidrė X / N“ (`text-xs`) prieš mygtuką. Mobile – Pirmyn tas pats lift; Atgal ghost. Tikslas – aiškus „važiuoju toliau“ ir progreso jausmas.
- **LlmArch diagrama (Sistemos srautas):** Įvestis – šviesiai mėlynas gradientas, label „Žmogus“; Išvestis – šviesiai žalias, label „Sistema“. LLM blokas – gradient + glow, badge „Branduolys“; plotis +8–10 % (`w-[242px] md:w-[292px]`). Rodyklės – į LLM solid, iš LLM storesnė (3px); 200ms hover. Duomenų bazė – taškų pattern, viršuje „RAG sluoksnis“, microcopy „Papildo modelį kontekstu“. Vertikalus tarpas tarp blokų sumažintas (~12px: rodyklės h-6, mt-1 Architektūros logikai). Premium SaaS: konteineris – `shadow-[0_8px_24px_rgba(0,0,0,0.06)]`, `border-black/[0.04]`, `hover:-translate-y-0.5`.
- **LlmArch dark mode:** Konteineris `bg-slate-50 dark:bg-slate-900`. Įvestis/Išvestis – Tailwind gradientai su `dark:from-*-900/40 dark:to-slate-800/80`, `dark:border-*-700/60`, `dark:text-*`. Įrankiai ir DB – `dark:bg-slate-800`, DB su overlay uždengia taškų pattern. Architektūros logika – `dark:bg-slate-800/60`, kortelės `dark:bg-slate-800` / aktyvi `dark:bg-slate-700`, tag’ai su dark variantais. Schema dark režime nebelieka balta.
- **Dokumentacija:** `docs/development/M4_SKAIDRE_56_RAG_UI_UX_AUDITAS.md` – UI/UX auditas Modulio 4 skaidrės „RAG: kas tai ir pabandyk“ (id 56), §7 vizualinė analizė Pirmyn/Atgal bloko.

**2026-02-24 (Modulio 4 testuotojo pastabos – RAG, VDA, neprivaloma, Rek., Pirmyn/Atgal)**

- **Turinys (CONTENT_AGENT + SOT):** RAG – pirmą kartą minimas su trumpu paaiškinimu (heroSubText, aboutText: „RAG (atsakymai iš tavo šaltinių – paaiškinsime toliau)“). Valstybės duomenų agentūra (anksčiau Statistikos departamentas) – `docs/turinio_pletra_moduliai_4_5_6.md` ir `modules.json` (structuredPrompt, atviros duomenų bazės body, M7 copyable). Skaidrė 39.5 (Praktika: DI visata) – „neprivaloma“ sumažinta: subtitle „Pasirinktina“, body „Pasirinktina praktika“, heading „Gali praleisti“.
- **Navigacija (Plan §0 – Canada.ca + UX SE):** ModuleView – dubliuota „Atgal“ / „Pirmyn“ viršuje (po antrašte, prieš turinį); min 44px tap target, `aria-label` (Ankstesnė skaidrė / Kita skaidrė). Apačioje palikta esama (desktop dešinėje, mobile fixed bar).
- **Rek. (DiModalitiesSlide):** Legenda „Rek. = rekomenduojamas įrankis šiai kategorijai“ perkelta virš intro teksto; badge `aria-label`; legendai `role="status"` ir `aria-label`.
- **TEST_REPORT:** Įrašytos 2026-02-22 Modulio 4 testuotojo pastabos ir sprendimai (išspręsta). Planas: M4 tester feedback agent sequence.

**2026-02-24 (Gili kodo analizė – bug'ai, fallback practice-scenario-hub)**

- **CODE_REVIEW_AGENT diagnozė:** Atlikta gili kodo analizė (App, SlideContent, ModuleView, Quiz, progress, modulesLoader, useSlideNavigation ir kt.). Ataskaita – `docs/development/GILI_KODO_ANALIZE_2026_02_24.md`: patikrinta NaN apsauga (CircularProgress, useQuizState), null modules handling, initialSlideIndex ribos, slide registry atitikmenys, progress migracijos, retry po klaidos; schema – quiz.questions[].id jau number.
- **Pataisyta (P1):** `SlideContent.tsx` – skaidrės tipas `practice-scenario-hub`: kai trūksta `content` arba `onNavigateToSlideById`, vietoj `return null` (tuščia skaidrė) naudojamas `ctx.fallbackMissingContent()` – rodoma antraštė, subtitulas ir DEV įspėjimas.
- **Rekomendacijos:** Prieš release paleisti lint, test:run, validate:schema iki galo; dokumentuoti rezultatą. clearModulesLoadError nevalo cache (retry po klaidos veikia korektiškai).

**2026-02-21 (Sertifikatų PDF – 3 lygiai, hidden treasure, vardas iš localStorage)**

- **Sertifikatai:** Trys lygiai (tier 1 po 3 mod., tier 2 po 6 mod. + testas ≥70%, tier 3 rezervuota 9 mod.). Turinys – `src/data/certificateContent.json` (title, subtitle, badgeLabel, footerText); SOT – `docs/development/CERTIFICATE_CONTENT_SOT.md`. Tonas paprastas, ne patetiškas.
- **PDF:** `src/utils/certificatePdf.ts` – `downloadCertificatePdf(tier, content, learnerName, options?)`. NotoSans, maketai pagal PDF_MAKETO_GAIRES; pre-release serijinis numeris client-side random (#PA-2026-xxxx). `src/utils/certificateStorage.ts` – vardas tik localStorage (`getCertificateName` / `setCertificateName`).
- **UI:** `CertificateScreen.tsx` – maketo peržiūra, vardo laukas, „Išsaugoti ir parsisiųsti PDF“. **Hidden treasure:** mygtukas „Parsisiųsti sertifikatą“ rodomas tik ModuleCompleteScreen, kai baigtas 3. arba 6. modulis (tier 2 – tik jei quiz ≥70%). Nėra nuorodos į sertifikatus meniu.
- **Navigacija:** App.tsx – puslapis `certificate`, lazy `CertificateScreen`; ModuleView/ModuleCompleteScreen – `onRequestCertificate(tier)`.
- **Validacija:** `scripts/schemas/certificateContent.schema.json`, `validate-schema.mjs` – certificateContent.json.
- **Testai:** `certificatePdf.test.ts` (jsPDF mock, serial number, filename); `certificateStorage.test.ts` (get/set localStorage).
- **Doc:** PDF_GENERATION_AGENT_MEMORY – sertifikatų failai ir flow; RELEASE_QA_CHECKLIST – sertifikato PDF ir lietuviškų raidžių patikra.

**2026-02-21 (Modulio 6 – PDF atmintinė: parsisiuntimas skaidrėje 64 ir ModuleCompleteScreen)**

- **M6 PDF atmintinė:** Naujas `src/data/m6HandoutContent.json` (title, subtitle, projectSteps, dataManagementPoints su practicalMeaning, reflectionSummary, footerText) ir `src/utils/m6HandoutPdf.ts` – generuoja PDF (6 žingsniai, 5 punktai duomenų tvarkymo, refleksija). NotoSans, applyFont prieš tekstą (lietuviškos raidės). Maketas pagal PDF_MAKETO_GAIRES.md.
- **UI:** Skaidrė 64 (Duomenų tvarkymas) – content-block su `handoutDownloadLabel`; ContentSlides.tsx rodo mygtuką „Parsisiųsti Modulio 6 atmintinę (PDF)“ kai `moduleId === 6 && slide.id === 64`. ModuleCompleteScreen – kai `module.id === 6`, rodomas mygtukas „Parsisiųsti atmintinę (PDF)“ (secondary). types/modules.ts – `ContentBlockContent.handoutDownloadLabel?`.
- **SOT:** docs/turinio_pletra_moduliai_4_5_6.md §4.4 (Modulio 6 PDF atmintinės turinys ir vietos). docs/development/MODULIO_6_USER_JOURNEY_ANALIZE.md – §7 Įgyvendinta M6 PDF atmintinė.

**2026-02-21 (Modulio 6 – pažadas apie PDF atmintinę, CTA)**

- **handoutPromise (Modulio 6 intro):** Skaidrė 60 (practice-intro) – naujas turinio laukas `handoutPromise`: „Po šio modulio galėsite parsisiųsti Modulio 6 atmintinę (PDF): projekto 6 žingsniai, duomenų tvarkymo 5 punktai ir refleksijos santrauka – atsispausdinsite ir naudosite prie darbo.“ Rodomas kaip atskiras blokas su Download ikona (slate fonas), CTA prieš „Ką gausi“. `getPracticeIntroContent` (TestPracticeSlides.tsx) – naujas laukas `handoutPromise`; M6 intro rodo bloką po „Pirmas žingsnis“. modules.json – Modulio 6 skaidrė 60 content.handoutPromise. SOT: docs/turinio_pletra_moduliai_4_5_6.md §4.0 – handoutPromise privalomas įvado skaidrėje.

**2026-02-21 (Modulio 6 – skaidrė 64 pagalbinis copyable promptas duomenų tvarkymui)**

- **Skaidrė 64 (Duomenų tvarkymas):** Pridėtas **kopijuojamas pagalbinis promptas** – blokas „Pagalbinis promptas: duomenų tvarkymo sistema“ su `heading`, `body` (instrukcija nukopijuoti ir naudoti su DI) ir `copyable`. Promptas prašo DI pasiūlyti duomenų/promptų tvarkymo ir archyvavimo sistemą pagal geriausias praktikas: 5–6 žingsniai (biblioteka, versijavimas, dokumentacija, procesai, testiniai duomenys), kur pradėti šiandien, įrankiai; konteksto laukas `[ką dažniausiai darau su DI…]`. `src/data/modules.json` – nauja section skaidrėje 64.
- **SOT:** `docs/turinio_pletra_moduliai_4_5_6.md` – skyriuje „Duomenų tvarkymas“ įrašyta, kad skaidrėje privalo būti copyable pagalbinis promptas, ir aprašyti reikalavimai (žingsniai, pirmi veiksmai, įrankiai, kontekstas).
- **TODO.md:** Rytoj – punktas 9: rankinė peržiūra M6 skaidrės 64 (blokas, mygtukas „Kopijuoti“, lietuviškos raidės).

**2026-02-21 (LinkedIn auditorijos analizė ir marketingo duomenų papildymas)**

- **docs/LinkedIn_audience_insights_2026-02-21.md:** Naujas dokumentas – LinkedIn įrašo („Promptų anatomija“) auditorijos santrauka (įmonių dydis, pareigos, seniority, lokacija, industrijos), validacija su rinkodaros planu, įžvalgos, Kiss–Marry–Kill prioritizacija (Kiss: testuoti formatą/Entry postą; Marry: LinkedIn kanalas, B2B žinutė, Vilnius/LT, IT+Finance+HR use-case; Kill: vienas pitch visiems, didelė investicija tik į Entry, reklama prieš matavimus). Nuoroda į šaltinį `docs/20260221_Linkedin_analize.txt`.
- **docs/marketing_plan.md:** §2 Tikslinė auditorija – pridėta „LinkedIn įrašo auditorija (2026-02-21)“ (61% Senior/Director/Manager/CXO, CEO+Founder ~4%, Vilnius 17.5%, IT+Financial); §10 Santrauka – nuoroda į prioritetus pagal LinkedIn (Kiss–Marry–Kill) ir `LinkedIn_audience_insights_2026-02-21.md`.
- **docs/DOCUMENTATION_INDEX.md:** Skiltyje „Marketingas ir funnel“ įrašytas `docs/LinkedIn_audience_insights_2026-02-21.md` su paskirtimi ir šaltiniu.
- **docs/20260221_Linkedin_analize.txt:** Šaltinis perkeltas iš root į `docs/` (viena vieta su kitais analizės dokumentais).

**2026-02-21 (Modulio 5 PDF atmintinė – parsisiuntimas, lietuviškos raidės)**

- **M5 PDF atmintinė:** Naujas `src/data/m5HandoutContent.json` (title, toolsIntro, structure8, masterPrompt, briefDefinition, qualityCheckPoints, footerText) ir `src/utils/m5HandoutPdf.ts` – generuoja PDF (sprintas, brief, 8 skaidrių šablonas, mini testas). Naudoja `ensurePdfFont()` iš introPiePdf; visur prieš `doc.text()` su lietuviškais simboliais kviečiama `applyFont(doc, useCustomFont)` (tas pats principas kaip introPiePdf po 2026-02-21 pataisos – žr. „PDF lietuviškos raidės“). Maketas pagal PDF_MAKETO_GAIRES.md.
- **UI:** Skaidrė 45.5 (ActionIntroSlide) – po reveal rodomas blokas `handoutPromise` su „Parsisiųsti atmintinę“; skaidrė 514 (TestPracticeSlides) – passed/failed rezultatų ekrane mygtukas „Parsisiųsti Modulio 5 atmintinę (PDF)“, kviečia `downloadM5HandoutPdf(m5HandoutContent)`. modules.json: 45.5 `outcomes`, `handoutPromise`; 514 `handoutDownloadLabel`. types/modules.ts – `ActionIntroContent.handoutPromise?`.
- **SOT:** turinio_pletra_moduliai_4_5_6.md §3.0a (outcome + handoutPromise), §3.3 (Modulio 5 PDF atmintinės turinys); MODULIO_5_USER_JOURNEY_ANALIZE.md §1.7 (vieta PDF kelionėje). DOCUMENTATION_INDEX, PDF_DOWNLOAD_TESTING.md – M5 skyrelis.
- **IntroActionPieSlide.tsx (88 eil.):** Pataisyta `??` operatoriaus naudojimo išraiška (barCol.querySelector → atskiras kintamasis, `?? 56` tik offsetWidth), kad esbuild build praeitų be įspėjimo.
- **Liko (TODO.md):** Rankinė M5 PDF parsisiuntimo ir lietuviškų raidžių patikra (RELEASE_QA_CHECKLIST); įsitikinti, kad `public/fonts/NotoSans-Regular.ttf` yra production; optional – m5HandoutPdf unit testas, M5 PDF mygtuko testas (PDF_DOWNLOAD_TESTING.md).

**PDF lietuviškos raidės (spausdinimas / eksportas):** M5 atmintinė ir intro segmentų PDF generuojami su **NotoSans-Regular.ttf** (jsPDF): prieš kiekvieną `doc.text()` su lietuviškais simboliais (ą, ė, į, š, ų, ū, ž) kviečiama `applyFont(doc, useCustomFont)`. Šriftas kraunamas iš `public/fonts/NotoSans-Regular.ttf`; jei failas nepasiekiamas – naudojama Helvetica (diakritikos gali būti neteisingos). Production reikia įsitikinti, kad `public/fonts/NotoSans-Regular.ttf` yra įdiegtas (žr. `public/fonts/README.md`, `scripts/download-noto-font.ps1`). RELEASE_QA_CHECKLIST – rankinė PDF atsisiuntimo ir spausdinimo patikra su lietuviškais teksto pavyzdžiais.

**2026-02-21 (Modulio 5 gili analizė – intro su reveal, preCopyCheckBlock, fazių juosta)**

- **M5 intro skaidrė (action-intro su reveal):** Nauja pirmoji Modulio 5 skaidrė (id 45.5) – hook (whyBenefit + ctaText), po paspaudimo atsiranda hero, firstActionCTA, duration, outcomes. Sumažina onboarding trintį per 60–120 s. SOT: `docs/turinio_pletra_moduliai_4_5_6.md` §3.0a.
- **preCopyCheckBlock skaidrėje 47:** Mini checkpoint prieš „Nukopijuok šabloną“ – 1 klausimas „Ką būtina įtraukti į brief?“ su options, correct, explanation. ContentSlides.tsx – naujas blokas (tas pats UI kaip briefCheckBlock); types/modules.ts – `ContentBlockContent.preCopyCheckBlock`.
- **Fazių juosta M5:** buildSlideGroups atnaujintas – Sprintas (0–2: intro, 47, 510), Pagalba (3: 515), Testas (4–7). Footer skaidrės 47: „Toliau – skaidrė 3: 15 min prezentacijos sprintas“; intro footer: „Toliau – skaidrė 2: Per 15 min – 8 skaidrių prezentacija su DI“.
- **SOT ir User Journey:** MODULIO_5_USER_JOURNEY_ANALIZE.md atnaujintas (energijos kritimai su intro ir preCopyCheckBlock, 5 zonų santrauka, nauji sprendimai §5). turinio_pletra_moduliai_4_5_6.md §3.0b – preCopyCheckBlock turinys; §3.0 – firstActionCTA sutrumpintas (be „diagramą 1 min“).
- **515 Pagalba:** „Kai prireikia“ paryškintas pirmoje sekcijoje (body).

**2026-02-21 (Duomenų analizės kelias – path-step, badge, žodynėlio atrakinimas)**

- **Naujas skaidrių tipas `path-step`:** Kelio žingsnis (Duomenų analizės kelias pramaišytas su M7 teorija). PathStepContent: title, stepNumber, body/sections, unlockedGlossaryTerms. PathStepSlide – „Duomenų analizės kelias“ identitetas (MapPin), žingsnio badge, CTA „Pažymėjau kaip atliktą“; užbaigimas įrašomas į progress.completedTasks. GOLDEN_STANDARD §3.4d, types/modules.ts, modules.schema.json, ContentSlides.tsx, SlideContent.tsx.
- **Žodynėlio atrakinimas:** glossary.json termai gali turėti optional `unlockedBy: { moduleId, slideId }`. GlossaryPage su `progress`: užrakinti terminai rodomi pilkai, Lock ikona, „Atrakink per Modulio X kelio žingsnį“; atrakinti – pilnai matomi. App.tsx perduoda progress į GlossaryPage.
- **SOT ir dokumentacija:** turinio_pletra_moduliai_7_8_9.md §8.2 (5 path-step 71.1–71.5, įterpimo vietos), MODULIO_7_SKAIDRIU_EILES.md (path-step id ir pozicijos), DOCUMENTATION_INDEX, SKAIDRIU_TIPU_ANALIZE §3.8, slidePhaseConfig path-step → „Kelias“. modules.json M7 path-step skaidrės jau įgyvendintos. **glossary.json unlockedBy:** pridėta 3 terminams – Deep research, Master promptas (71.2), RAG (71.3); GlossaryPage MODULE_LABELS[7] „Modulis 7 – Duomenų analizės kelias“. **Pilnas path-step žodynėlis:** pridėti 7 terminai su apibrėžimais (paprasta kalba) ir unlockedBy: Dashboard (71.5), Duomenų analizės pipeline, EDA (71.1), Duomenų valymas, Sintetinimas (71.4), Šaltinių nurodymas (71.3), Vizualizacija (71.5); abecėlė pagal locale „lt“.

**2026-02-21 (RAG 6 skaidrės – suliejimas 56+58, optional → TODO ir Duomenų analizės kelias)**

- **Sulieta skaidrė „RAG: kas tai ir pabandyk“ (id 56):** Modulio 4 skaidrės 56 ir 58 sujungtos į vieną (5 turinio + 1 patikra = 6 skaidrės RAG bloke). Turinys: whyBenefit, Trumpai, Agentinė vizualizacija (LlmArchDiagramBlock), Kas yra RAG (3 žingsniai), Daryk dabar, Kopijuojamas promptas (RAG mini-šablonas), Patikra, Optional (multimodal + RAG detaliau). Skaidrė 58 pašalinta iš `modules.json`.
- **SOT:** `docs/turinio_pletra_moduliai_4_5_6.md` – lentelėje 4.1c+4.2 viena eilutė; pridėtas blokas „Sulieta skaidrė …“ su sekcijų tekstais. Duomenų analizės kelias: `docs/turinio_pletra_moduliai_7_8_9.md` ir `docs/development/DUOMENU_ANALIZES_GERIAUSIOS_PRAKTIKOS.md` – 1–2 sakiniai apie RAG/tyrimų įrankių turinio (pvz. id 61) integravimą į M7–M9 arba „Papildomas skaitymas“.
- **M4 footeriai:** Perskaičiuoti pagal `.cursor/rules/footer-slide-numbers.mdc` (1-based pozicija modulyje); „Toliau – skaidrė 22: Atviros duomenų bazės ir RAG“ ir t.t. (23…48).
- **TODO.md:** Skyrius „RAG skyrius (M4) – optional turinys ir Duomenų analizės kelias“ – 3 užduotys (id 61, 63/63.7, Duomenų analizės kelias). Sekcija „Rytoj (liko nepadaryta po RAG suliejimo)“ – rankinė peržiūra skaidrės 56, MODULIO_4_SKAIDRIU_EILES.md atnaujinimas, RAG optional įgyvendinimas.

**Liko nepadaryta (rytoj):** (1) Rankinė peržiūra M4 skaidrės 56 (navigacija, footeriai, LlmArch, kopijuojamas promptas). (2) `docs/MODULIO_4_SKAIDRIU_EILES.md` – atnaujinti eilę (4.1c+4.2 viena skaidrė). (3) RAG optional užduotys (61, 63/63.7) – backlog arba atskiri žingsniai.

**2026-02-21 (Skaidrė 53 – Svarbiausi DI įrankiai: analizė, tipai, interaktyvus pasirinkimas)**

- **SKaidre_53_PAGRINDINIAI_IRANKIAI_ANALIZE.md:** Gili skaidrės 53 analizė – kas lūžta (hero dubliavimas, lentelė akademinė, „Kaip rinktis?“ paslėpta), agentų užduočių paskirstymas, Phase 1 ir Phase 2 (įgyvendinta).
- **Tipai (modules.ts):** `ContentBlockTableRowMeta` (strengthBadge, bestFor, badgeVariant); `ContentBlockTable.rowMeta`; `ContentBlockSection.toolChoiceBar` (question, choices: label + rowIndex) – pasirinkimo juosta virš lentelės ir highlight eilutėje.

**2026-02-21 (PDF maketo tobulinimas – intro-action-pie segmentų PDF)**

- **PDF_MAKETO_GAIRES.md:** Naujas dokumentas `docs/development/PDF_MAKETO_GAIRES.md` – PDF dizaino gairės (tipografijos hierarchija H1/H2/H3/body, marginai 18 mm, tarpai 6–8 mm, spalvos brand/accent pagal GOLDEN_STANDARD, sekcijų atskyrimas, footer, lietuviškos raidės – custom font). Žinomas ribotumas: be `public/fonts/NotoSans-Regular.ttf` naudojama Helvetica (diakritikos gali būti neteisingos).
- **introPiePdf.ts refaktoras:** Tipografija FONT_H1 15 pt, H2 14 pt, H3 11 pt, body 10 pt, footer 8 pt; SECTION_GAP 7 mm, PARAGRAPH_GAP 3.5 mm; kairysis vertikalus border (brand) kiekvienai sekcijai; Palinkėjimas – accent border; footer pilka (128,128,128). Optional lietuviškoms raidėms: `ensurePdfFont()` įkrauna `NotoSans-Regular.ttf` iš `/fonts/`, registruoja jsPDF; IntroActionPieSlide „Eksportuok PDF“ prieš generavimą kviečia `ensurePdfFont()`.
- **public/fonts/README.md:** Instrukcija įdėti NotoSans-Regular.ttf (Google Fonts) lietuviškų raidžių palaikymui.
- **TEST_REPORT:** Įrašas – gyvas testavimas, PDF maketas prastas → išspręsta (spec + refaktoras + optional LT font).

**2026-02-21 (PDF testų infrastruktūra – introPiePdf, komponento testas, schema, doc)**

- **introPiePdf.test.ts:** Unit testai – jsPDF mock, failo pavadinimas (default/custom), brand/segment tekstas PDF, `ensurePdfFont` (fetch fail/success), 7 segmentų smoke; ESM import, `toMatch(/\.pdf$/)`.
- **IntroActionPieSlide.pdf.test.tsx:** Komponento testas „Eksportuok PDF“ – pasirinkimas → Palyginti su statistika → Eksportuok PDF; assertina `ensurePdfFont` ir `downloadIntroPiePdf` su teisingu segmentu; mock per factory (vi.mock).
- **introPiePdfContent.schema.json:** Neprivaloma schema `scripts/schemas/introPiePdfContent.schema.json`; `scripts/validate-schema.mjs` – `validateIntroPiePdfContent()`.
- **PDF_DOWNLOAD_TESTING.md:** `docs/development/PDF_DOWNLOAD_TESTING.md` – kas testuojama, kaip pridėti PDF į kitą skaidrę. TEST_REPORT atnaujintas.

**2026-02-21 (QA_AGENT – lentelių standartas, atsakomybė, auditas, TODO)**

- **LENTELIU_STANDARTAS.md:** Naujas dokumentas `docs/development/LENTELIU_STANDARTAS.md` – atsakomybė (UI_UX_AGENT standartas/vizualinė hierarchija, DATA_AGENT JSON/comparisonStyle/body, CODING_AGENT renderinimas, CODE_REVIEW patikra), bendros geriausios praktikos, palyginimo lentelė (§3: comparisonStyle, min-width, header fonai, micro-UX body), audito kriterijai (§4), projekto lentelių sąrašas (§5, 9 sekcijos).
- **TODO.md:** Nauja sekcija **Lentelių patobulinimai** – L1 (UI_UX_AGENT auditas pagal §4), L2 (DATA_AGENT comparisonStyle/body 2 stulpelių lentelėms), L3 (CODING_AGENT min-width/header), L4 (CODE_REVIEW spot-check). §4 Nuorodos – eilutė į LENTELIU_STANDARTAS.md.

**2026-02-21 (QA_AGENT – path-step žodynėlis užbaigtas, TODO rytoj)**

- **TODO.md Rytoj:** Skyrius „Rytoj“ papildytas – punktas 4 **Path-step žodynėlio rankinė patikra** (Modulis 7, žingsniai 71.1–71.5, „Pažymėjau kaip atliktą“, Žodynėlis: 10 terminų atrakinti; ne-MVP režimas). Antraštė atnaujinta: „po RAG suliejimo 2026-02-21 ir path-step žodynėlio 2026-02-21“.
- **Changelog:** Path-step blokas (Unreleased) – pilnas path-step žodynėlis (7 terminai + unlockedBy) ir rytoj patikra įtraukti į vieną dokumentavimo eigą.

### Changed

**2026-02-28 (M1 skaidrė 15 – Workflow Samprata: terminai + micro-win)**

- **Paprasta kalba:** `src/data/modules.json` – terminai paaiškinti pirmą kartą: „Workflow (darbo eiga)“, „LLM (kalbos modelis)“, „Įvestis (Input)“ / „Išvestis (Output)“; suvienodinti pavadinimai „Pokalbis (Basic)“ vs „Workflow (darbo eiga)“; pavyzdžių label'ai suvienodinti.
- **Micro-win:** Intro papildytas 1 sakiniu „Perjunk į Workflow…“ – kad vartotojas iškart pamatytų „struktūros“ efektą.
- **SOT:** `turinio_pletra.md` – skyrius „Skaidrė 3: Workflow Samprata“ atnaujintas pagal runtime (id 15, `workflow-summary`, interaktyvumas) ir terminų nuoseklumą; santraukos bloke sulyginta formuluotė.

**2026-02-21 (Skaidrė 53 – „Kaip rinktis?“: 5 klausimai + taisyklė)**

- **Nauja sekcija:** „Kokius klausimus sau užduoti renkantis įrankį?“ – 5 numeruoti klausimai (užduoties tipas, ilgas kontekstas, ekosistema, multimodalumas, prezentacija/pasiūlymas), blockVariant terms, collapsible (pagal nutylėjimą suskleista). Paprasta kalba pagal PAPRASTOS_KALBOS_GAIRES.
- **„Kaip rinktis?“ body:** Struktūruotas – Taisyklė (Užduotis → Įrankis → Workflow); mapping eilutėmis (Rašymas → ChatGPT ir t.t.); „Galima jungti kelis įrankius vienoje grandinėje“ su pvz. (Claude → ChatGPT → Gamma). modules.json.

**2026-02-21 (Skaidrė 53 – Svarbiausi DI įrankiai: hero, lentelė, pasirinkimo juosta, Pro tip)**

- **Skaidrė 53 (Modulio 4):** Title „Svarbiausi DI įrankiai“, subtitle „Pasirink įrankį pagal užduoties tipą“. Hero (accent): vienas blokas, DI terminologija, „Įrankį rinkis pagal užduoties tipą… taupo laiką ir mažina klaidų tikimybę“. Greita orientacija (30 s) ⚡ – collapsible, emojis (✍️📄📊🔎📑), „Pagal užduotį pasirink tinkamą įrankį:“ + 5 atitikmenys.
- **Lentelė:** rowMeta – stiprybės badge su spalva (blue/green/violet/yellow/orange), „Best for“ po įrankio pavadinimu; vizualinė hierarchija – Kaina pilkesnė, Stiprybė bold/badge. ContentSlides.tsx – lentelės renderinimas su rowMeta.
- **Pasirinkimo juosta:** „Ką darai dabar?“ – 5 mygtukai (Rašau, Analizuoju, Dirbu su Office, Tiriu / Vaizdai, Ruošiu skaidres); paspaudus – paryškinama atitinkama lentelės eilutė (ring + accent fonas) ir smooth scroll į eilutę. State ir refs ContentBlockSlide.
- **Sekcijos:** „Kaip rinktis?“ (accent, taisyklė Užduotis → Įrankis); „Pavyzdinė grandinė (workflow)“ – WorkflowChainsBlock (Claude→ChatGPT→Gamma, Gemini→ChatGPT); „Praktinė rekomendacija“ – Pro tip 80 % atvejų 1 pagrindinis + 1 specializuotas.
- **modules.json:** skaidrė 53 – title, subtitle, sections (hero, collapsible, table+toolChoiceBar+rowMeta, Kaip rinktis?, workflowChains, Pro tip).

**2026-02-21 (Skaidrė 50 – praktinė užduotis ir Ką prisiminti toje pačioje skaidrėje)**

- **Skaidrė 50 „Parametrų laukas“:** Toje pačioje skaidrėje po 6 blokų – tikra praktinė užduotis (antraštė, body, kopijuojamas promptas META+INPUT+OUTPUT – parametrų išvardijimas pagal 6 grupes) ir atskiras blokas „Ką prisiminti“ (tip). modules.json: `practiceHeading`, `practiceBody`, `practiceCopyable`, `tip` (Ką prisiminti).
- **HierarchyContent (types):** Neprivalomi laukai `practiceHeading?`, `practiceBody?`, `practiceCopyable?`. HierarchySlide: kai `practiceCopyable` – rodomas praktikos blokas (CopyButton + promptas) ir po to „Ką prisiminti“ (terms); kai nėra – senas elgesys (vienas blokas „Praktinė užduotis:“ + tip). src/types/modules.ts, ContentSlides.tsx.
- **SOT:** docs/turinio_pletra_moduliai_4_5_6.md – skaidrė 50 aprašas papildytas praktikos ir „Ką prisiminti“ blokais toje pačioje skaidrėje.

**2026-02-21 (Lentelių atsakomybė ir gairės – orkestratorius, UI_UX, DOCUMENTATION_INDEX)**

- **AGENT_ORCHESTRATOR.md:** Po agentų lentelės pridėta pastraipa – lentelės (content-block): standartas/vizualinė hierarchija → UI_UX_AGENT (LENTELIU_STANDARTAS.md), JSON/comparisonStyle/body → DATA_AGENT, renderinimas → CODING_AGENT, patikra → CODE_REVIEW_AGENT.
- **UI_UX_AGENT.md §3.6:** Papildyta: palyginimo lentelė (comparisonStyle: true, min-width, micro-UX body), nuoroda į `docs/development/LENTELIU_STANDARTAS.md`.
- **DOCUMENTATION_INDEX.md:** Aktyvių dokumentų lentelėje – nauja eilutė `LENTELIU_STANDARTAS.md` (lentelių standartas, atsakomybė, comparisonStyle, auditas).

**2026-02-21 (Skaidrė 4.2 – 5 promptų tipai, celebration „Šaunu!“, Kas toliau, Struktūruotas procesas)**

- **Skaidrė 52.5 (section-break 4.2):** 5 promptų tipų pills (Sisteminis, Master, Procesas, Metodinis, Agentinis) su žodyno nuorodomis; badge 5/5 ir 100 % progreso juosta. Celebration: „Šaunu! Tu jau įvaldei 5 promptų tipus – nesustok!“ – „Šaunu!“ rodomas accent spalva pagal GOLDEN_STANDARD. Recap: lead „Konteksto inžinerija – kaip vaizdo žaidimas“, 5 narrative punktai; itemGlossaryTerms – 5 promptų tipai; recap ikonos veda į žodynėlį. nextSteps atnaujinti: RAG (haliucinacijos, manipuliacijos), Atviros duomenų bazės + atmintis, Patikrintos strategijos, COMBO (naujas tekstas). modules.json.
- **Celebration hero (ContentSlides.tsx):** Bendras „X! “ formatas – bet koks tekstas su „! “ (pvz. „Puiku! “, „Šaunu! “) rodo pirmą dalį iki „! “ accent, likusį – antraštė; ne tik fiksuotas „Puiku! “.
- **Struktūruotas procesas (skaidrė 43):** Schema sekcijos antraštė „Schema: nuo užklausos iki rezultato.“, body „Paimk bet kurią savo užduotį ir suskirstyk ją į šiuos 3 žingsnius.“ modules.json.
- **GOLDEN_STANDARD.md §3.4c:** 5 konceptai – 5 promptų tipai (etiketės, ikonos); pills aria-label „Promptų tipai – žodyno nuorodos“ ir 3, ir 5 atveju.

**2026-02-21 (MVP Analytics ir Completion Rate – instrumentacija)**

- **Analytics modulis:** `src/utils/analytics.ts` – anon*id, session_id (30 min inactivity), `track(eventName, properties)` su dedupe (1x per session slide_view, slide_complete, practice*\*, collapse_open). Optional PostHog: `VITE_POSTHOG_KEY`, `VITE_POSTHOG_HOST`; `$process_person_profile: false`.
- **Event taxonomy:** `docs/development/ANALYTICS_EVENT_TAXONOMY.md` – 6 eventai (slide_view, slide_complete, practice_start, practice_complete, cta_click, collapse_open), required/optional properties, dedupe, funnel apibrėžimai.
- **Instrumentacija:** ModuleView – slide_view / slide_complete (su time_on_slide_sec); PracticalTask – practice_start (onFocus), practice_complete (submit/mark); SlideContent – wrappedOnGoToModule (cta_click internal); ModuleCompleteScreen – cta_click (back_to_modules, next_module); ContentBlockSlide – collapse_open.
- **Progreso juosta:** Desktop header „X / Y skaidrių“, mobile counter; aria-label.
- **Practice feedback:** Po užduoties atlikimo – „Gerai padirbėta!“ (2.5 s), emerald blokas.
- **Nudge prieš išeinant:** beforeunload kai modulyje peržiūrėta 1+ skaidrė ir < 80 % (D4).
- **Dashboard doc:** `docs/development/ANALYTICS_DASHBOARD_MVP.md` – 4 blokai (Completion %, Drop-off %, CTA conversion %, Practice success %), KPI interpretacijos, PostHog setup. DOCUMENTATION_INDEX atnaujintas.

**2026-02-20 (Skaidrė 52.5 – section-break su recap, Golden Standard §3.4b)**

- **Skyriaus riba 52.5 „RAG ir gilusis tyrimas“:** Skaidrė atnaujinta pagal GOLDEN_STANDARD.md §3.4b (skiriamoji / įsiminimo skaidrė). Pridėta: `celebrationText` („Puiku! Konteksto pamatai – toliau šaltiniai ir gilusis tyrimas.“), `recap` („Ką jau žinai?“ su 4 punktais ir `itemGlossaryTerms`: Tool Use, Metodinis promptas, Proceso promptas, Įrankis (tool)), `nextSteps` (4 punktai – RAG, atviros DB, strategijos ir gilusis tyrimas, COMBO), `spinoffCta` (8 promptų biblioteka). Subtitle sutrumpintas; footer „Toliau – skaidrė 19“ paliktas (1-based pozicija). modules.json.
- **SOT:** docs/turinio_pletra_moduliai_4_5_6.md – naujas §1.6 „Skyriaus riba 52.5 (RAG ir gilusis tyrimas)“ su pilnu turiniu kopijuojamam į JSON. Schema validacija – OK.

**2026-02-20 (Skaidrė 49 + 49.5 integracija – viena skaidrė, textarea, Parodyti sprendimą)**

- **Sujungta skaidrė 49 ir 49.5:** Skaidrė 49 dabar apima ir „įvertink savo promptą“ (vertinimo promptas + žingsniai), ir praktiką „pataisyk promptą“ (blogas pavyzdys, textarea, mygtukas „Parodyti sprendimą“, paslėptas sprendimas). Skaidrė 49.5 pašalinta iš modulio – seka sumažinta viena skaidre.
- **content.correctPromptPractice:** Naujas optional laukas content-block skaidrėms – intro, badPrompt, revealButtonLabel, solutionAnalysis, solutionCopyable, solutionSummary. Skaidrėje 49 rodomas textarea „Tavo pataisytas variantas“ ir mygtukas „Parodyti sprendimą“, atidarantis analizę, pataisytą variantą (CopyButton) ir „Kas pasikeitė?“.
- **Tipai:** src/types/modules.ts – ContentBlockContent.correctPromptPractice. **UI:** ContentBlockSlide – praktikos blokas su textarea ir reveal. **Optional „Toliau“:** „Skaidrė 48 (RL/RLHF)“ (be nuorodos į 49.5).

### Changed

**2026-02-21 (Skaidrė 50 – lietuvių kalba: Kokią modelį → Kokį modelį)**

- **Skaidrė 50 „Parametrų laukas“:** Pataisyta lietuvių kalba – „Kokią modelį/įrankį naudoji?“ → „Kokį modelį/įrankį naudoji?“ (vyriškos giminės galininkas: modelis, įrankis). modules.json, docs/turinio_pletra_moduliai_4_5_6.md (SOT).
- **HierarchyBlocksList (ContentSlides):** Priority badge – truncate siaurame ekrane (min-w-0 max-w-[14rem] truncate); mygtukas – aria-label (blokas, priority, Išskleisti/Suskleisti) a11y. ContentSlides.tsx.

**2026-02-21 (QA_AGENT – Parametrų laukas: hierarchy, collapsible, kategorijų klausimai)**

- **Skaidrė 50 „Parametrų laukas“ (Modulis 4):** Pakeista iš content-block į type hierarchy (vizualus šablonas kaip Modulio 1 „Hierarchinė Struktūra“). Intro (introHeading, introBody), 6 blokai su priority žymomis – klausimai: Kokią modelį/įrankį naudoji?, Kokius metodus naudoji?, Kokį turinį užkrauni?, Kokią įtaką darai?, Kokio rezultato nori?, Ką valdai techniškai? Kiekvienas blokas collapsible: concepts (papildomos sąvokos) ir tip (patarimas). modules.json.
- **HierarchyBlock (types):** Optional laukai concepts (string[]) ir tip (string). HierarchyBlocksList (ContentSlides): išskleidžiamas blokas – sąvokos ir patarimas (accent). src/types/modules.ts, ContentSlides.tsx.
- **Lietuvių kalba / kategorijos:** Priority žymos – vienodas 2 asmuo (tu), genityvas „Kokio rezultato nori?“, „Kokį turinį užkrauni?“ (vietoj „Ką įdedi?“), „Ką valdai techniškai?“ (vietoj „valdo“). SOT: docs/turinio_pletra_moduliai_4_5_6.md § Parametrų laukas atnaujintas.

**2026-02-21 (Skaidrė 48 – vartotojo kelionė: vienas intro RL blokui)**

- **RlProcessBlock:** Neprivalomas prop `showHero` (default `true`). Kai `showHero === false`, nerenderinamas geltonas intro blokas („Išmok, kaip DI…“, „Suprasi RL per 4 žingsnius“, mygtukas „Pradėti 1 žingsnį“). Skaidrėje 48 sekcija „2️⃣ RL – paskatinamasis mokymas“ turi vieną įėjimo tašką – tik section heading, be dubliavimo (Kiss–Marry–Kill planas).
- **ContentSlides:** Kai `section.image === 'rl_process_diagram'`, į RlProcessBlock perduodama `showHero={false}`. RlProcessBlock.tsx, ContentSlides.tsx.

**2026-02-21 (RL vs RLHF lentelė – verslo kalba, comparisonStyle, micro-UX)**

- **Turinys (modules.json skaidrė 48):** Sekcija „4️⃣ RL vs RLHF – palyginimas“ – lentelė atnaujinta verslo kalba: headers „RL (optimizuoja skaičius)“ / „RLHF (optimizuoja kokybę)“; 5 eilučių (KPI, komunikacija, konversija/tonas, kainodara/HR, „Kaip pasiekti daugiau?“ / „Kaip atrodyti geriau?“). `section.body` nustatytas į micro-UX eilutę: „RL = skaičių optimizacija. RLHF = žmogaus vertinimo optimizacija.“
- **Schema:** ContentBlockTable papildytas neprivalomu lauku `comparisonStyle?: boolean`. Šiai sekcijai įjungta `comparisonStyle: true`. modules.ts, modules.json.
- **ContentSlides (lentelės stiliai):** Kai `section.table.comparisonStyle === true`: skirtingi thead fonai (pirmas stulpelis brand, antras slate); didesnis padding (px-5 py-5), leading-loose; švelnesnė wrapper border; paskutinė eilutė paryškinta (font-semibold, bg-brand-50/50). Body rodomas po lentele (esama logika). ContentSlides.tsx.

**2026-02-21 (RL proceso diagrama – gražios rodyklės, EnlargeableDiagram, a11y)**

- **RlProcessDiagram (SCHEME_AGENT):** Horizontalūs trikampiai pakeisti į gražias, verslo SaaS stiliaus rodykles (path-based chevron su stroke, round caps); forward linija edge-to-edge (`toX = n.x - ARROW_MARKER_LEN`); mobile vertical edge etiketė – TEXT_DARK kontrastas; feedback antgalis – chevron (suderintas su forward), ne užpildytas trikampis.
- **RlProcessBlock (CODING_AGENT):** Pridėtas EnlargeableDiagram – „Peržiūrėti pilname dydyje“ atidaro tą patį React komponentą modale (AGENT_VERIFICATION_NE_MELUOTI). Žingsnių mygtukai – min 44px touch target (h-11 w-11, min-h-[44px] min-w-[44px]). Vertikalus tarpas tarp sekcijų – space-y-6 (UI_UX_AGENT §3.7).
- **CODE_REVIEW (§5):** Rodyklės kraštas į kraštą OK; proporcingumas OK; path nekerta blokų OK; interaktyvumas (aria-label, role, tabIndex, onKeyDown) OK. Skaidrėje rodomas RlProcessBlock; „Peržiūrėti pilname dydyje“ atidaro tą patį RlProcessDiagram modale.

**2026-02-21 (QA_AGENT – TODO.md post-release)**

- **TODO.md:** Naujas skyrius **§3. Post-release (MVP Analytics – next)** su 3 punktais: (1) PostHog/GA4 snippet ir dashboard, (2) Micro-win M1 (turinys), (3) baseline ir target ranges po 2–4 sav. §2. PADARYTA papildytas MVP Analytics 2026-02-21 santrauka. §4. Nuorodos – analitikos dokumentų eilutė.

### Fixed

**2026-02-21 (PDF lietuviškos raidės – ą, ė, ų antraštėse ir footer)**

- **introPiePdf.ts:** Visur prieš `doc.text()` su lietuviškais simboliais kviečiama `applyFont(doc, useCustomFont)` – H1 „Promptų anatomija“, H2 segment.title, sekcijų antraštės (addSectionTitle), „Pagrindinis:“ + mainTool.name, įrankių sąrašas, žodyno terminas g.term, „Palinkėjimas“, footer. Kai NotoSans įkeltas, visas PDF tekstas piešiamas NotoSans; Helvetica naudojama tik kai custom font nepasiekiamas. Pašalinta klaida, kai ą, ė, ų rodėsi kaip a, e, u. TEST_REPORT, PDF_MAKETO_GAIRES §7 atnaujinti.

**2026-02-21 (IntroActionPieSlide PDF test – React act() įspėjimas)**

- **IntroActionPieSlide.pdf.test.tsx:** Vartotojo veiksmai (pasirinkimas, Palyginti su statistika, Eksportuok PDF) apgaubti `await act(async () => { await user.click(...) })`, kad React state atnaujimai ir asinchroninis `handlePdf` būtų vykdomi per act(). Pašalintas įspėjimas „An update to IntroActionPieSlide inside a test was not wrapped in act(...)“.

**2026-02-21 (Gili kodo bazės analizė – M4 footer)**

- **Footer auditas:** M4 skaidrė id 40.5 turėjo „Toliau – skaidrė 12: DI galimybės praktiškai“ – neteisinga (kitos skaidrės 1-based pozicija = 11). Pataisyta į „Toliau – skaidrė 11: DI skaičiai ir kontekstas: vienu žvilgsniu“. `scripts/audit-footer-numbers.mjs --modules=1,2,3,4,5,6` – OK. modules.json. Žr. ANALIZE_MODULIAI_1_6_GILI_KODO_BAZES.md, TEST_REPORT.

**2026-02-20 (Skaidrė 46.5 – Optional: Gerai vs Blogai – footer, body, SOT)**

- **CONTENT_AGENT / DATA_AGENT:** Skaidrei 46.5 pridėtas `content.footer`: „Toliau – 5 principai (49): įvertink savo promptą“. Section 1 body be redundancijos („Čia – pavyzdžiai ir šablonas žemiau“). Section 3 body su [ ] pavyzdžiu (pvz. [verslo rašymo asistentas], [iki 200 žodžių]). modules.json.
- **SOT:** docs/turinio_pletra_moduliai_4_5_6.md – skaidrės 46.5 aprašas (paskirtis, struktūra, footer privalomas). Schema validacija – OK.
- **QA_AGENT:** TEST_REPORT įrašas (46.5 planas įgyvendintas).

**2026-02-20 (Skaidrė 46 – Optional: Custom GPT kūrimo procesas – User Journey)**

- **USER_JOURNEY_AGENT:** Ataskaita `docs/development/SKAIDRES_46_USER_JOURNEY_ANALIZE.md` – 5 zonų analizė, Top 5 patobulinimai, micro-win, 48h testas.
- **CONTENT_AGENT / DATA_AGENT:** Skaidrei 46 pridėtas `content.footer`: „Toliau – Gerai vs Blogai (46.5): instrukcijų šablonas ir pavyzdžiai“. Naujas 0️⃣ Trumpai (15 s) accent blokas su whyBenefit. 1️⃣ bloko body be redundancijos („atlik veiksmą“ vietoj „Ką padaryti dabar“). modules.json.
- **CODING_AGENT:** Nuoroda į statinę schemą (atsarginė kopija) pašalinta – skaidrėje 46 rodomas tik interaktyvus ProcessStepper, be nuorodos į `/custom_gpt_process.svg`. ContentSlides.tsx.
- **CODE_REVIEW_AGENT:** CustomGptProcessDiagram §5 checklist – rodyklės, proporcingumas, path, interaktyvumas OK.
- **QA_AGENT:** TEST_REPORT įrašas; lietuviškos raidės patikrintos (nauji tekstai – OK).

**2026-02-20 (Skaidrė 54 – Metodinis vs Agentinis: KISS-MARRY-KILL, footer, paprasta kalba)**

- **CONTENT_AGENT / DATA_AGENT:** Skaidrė 54 (Metodinis vs Agentinis promptas): subtitle sutrumpintas; sekcija „Du požiūriai“ – 1 sakinys; TL;DR pabaiga – „Žemiau – kaip atskirti ir kada ką rinktis.“; lentelės pirmas stulpelis – `headers[0] = "Aspektas"` (a11y); metodinis copyable – „4) SWOT analizę“ → „4) SWOT (stiprybės, silpnybės, galimybės, grėsmės) analizę“ (PAPRASTOS_KALBOS_GAIRES); footer „Toliau – skaidrė 12“ → „Toliau – skaidrė 13: Custom GPT kūrimo procesas“ (footer-slide-numbers – kita skaidrė = 13-oji Modulyje 4). modules.json. Schema validacija – OK.

**2026-02-20 (Skaidrė 53.5 – img rounded-xl block, kartojanti nuotrauka)**

- **Nuotrauka nebe„suvalgo“ rėmelio (NEWS_PORTAL §10):** Prie visų 8 vaizdų **img** NewsPortalInfographicSlide pridėta `block rounded-xl` (hero, bannerImageHorizontal, bannerBetweenKpiAndSections, mainInsightBlock, secondaryCards, legacy section cards, toolsAndYouth.youth, insightCard.illustrationHorizontal), kad vaizdo kampai vizualiai sutaptų su rėmeliu. ContentSlides.tsx.
- **Kartojanti nuotrauka pakeista:** toolsAndYouth.youthImageVertical.src iš `di_portal_youth_vertical.png` → `di_portal_section02_vertical.png` (alt „Jaunimas ir technologijos“), kad toje pačioje skaidrėje nebūtų to paties vaizdo kaip secondaryCards[0]. modules.json id 53.5.

**2026-02-20 (Skaidrė 53.5 – paveikslėlių rėmeliai, Variant B)**

- **Paveikslėlių rėmeliai viena sistema (NEWS_PORTAL §10):** Visi vaizdų wrapperiai NewsPortalInfographicSlide – rounded-xl (ne rounded-lg), be antro border ant vidinio rėmelio (secondaryCards, toolsAndYouth.youth, legacy section cards); secondaryCards ir youth grid – items-stretch. mainInsightBlock.imageVertical, insightCard.illustrationHorizontal – rounded-xl. Legacy section cards – vaizdo wrapper rounded-xl overflow-hidden, be p-2, img be rounded-lg. ContentSlides.tsx.

**2026-02-20 (Skaidrė 53.5 – turinio deduplikacija, Kiss–Marry–Kill)**

- **Turinio tobulinimas (NEWS_PORTAL §9):** Sumažinti faktų pasikartojimai – „kas trečias / kas penkta“ palikta tik takeaway; mainInsightBlock.label → „ES ir įmonės – skaičiais.“; insightCard.headline → „Pagrindinės išvados: ES, verslas, jaunimas, Lietuva.“; insight 01 be 64% („žr. viršuje“); insight 03 be 44%/39%/16% (vienas sakinys); youthFootnote be (32,7%); subline → „Eurostat ir Stat.gov.lt, 2025“; secondaryCards[0].label → „Jaunimo adopcija ES 2025 m.“ modules.json id 53.5.

**2026-02-20 (Skaidrė 53.5 – Row 2 Variantas C: 3 zonos)**

- **Trečia dalis (NEWS_PORTAL §8.3 Variantas C):** Row 2 (Tools + Youth | Insight) pakeistas į **3 atskiras vertikalias zonas:** (1) Įrankių zona – pilno pločio kortelė „Populiariausi DI įrankiai“; (2) Jaunimo zona – pilno pločio kortelė „Jaunesnė karta – DI pionieriai“; (3) Insight zona – pilno pločio „Pagrindinė žinutė“. Tarp zonų `space-y-5`. JSON nekeistas; keista tik ContentSlides.tsx renderinimas.

**2026-02-20 (Skaidrė 53.5 – dviejų lygių sistema, struktūrinis layout)**

- **2 lygių layout (NEWS_PORTAL §8.2 Sprendimas 2):** Vietoj 3 vienodo svorio section cards – **1 lygis:** platus pagrindinio insight blokas (`mainInsightBlock`: 32,7% + „Kas trečias ES gyventojas ir kas penkta įmonė jau naudoja DI.“); **2 lygis:** 2 mažesnės vienodo tipo KPI kortelės (`secondaryCards`: Jaunimas 63,8%, Lietuva 69%). Skirtingas informacijos svoris → skirtingas plotis; informacijos architektūra atitinka komponentų architektūrą.
- **Duomenys:** `mainInsightBlock`, `secondaryCards` (2 elem.); `sectionCards` šioje skaidrėje pašalinti. Tipai: `NewsPortalMainInsightBlock`, `NewsPortalSecondaryCard`; schema atnaujinta. Atgalinis suderinamumas: jei nėra mainInsightBlock + secondaryCards, rodomas senas sectionCards layout.
- **Dokumentacija:** NEWS_PORTAL_INFOGRAFIC_UI_UX_ANALIZE.md §7 papildyta – dviejų lygių sistema.

**2026-02-20 (News-portal skaidrė 53.5 – maketas, teksto laužymas, turinys, šaltiniai, KPI)**

- **Section cards maketas:** Turinio stulpelis `minmax(200px,1fr)` → **`minmax(260px,1fr)`** – žodžiai nebelūžta per vidurį. Grid **`2xl:grid-cols-3`** (3 kortelės tik nuo 1536px). **`break-normal`** vietoj `break-words` (split, business, lithuania); procentams/skaičiams **`whitespace-nowrap`** (sectorTiles, calloutValue, Lithuania stats, barų pct). Barų eilutėms `gap-2`, procentas `shrink-0`. ContentSlides.tsx – NewsPortalInfographicSlide.
- **Turinys:** Verslas callout – pirmas sakinys sutrumpintas („augimas +6,5 pp nuo 2024“); 20% rodoma atskirai. modules.json.
- **Šaltiniai:** Sąraše rodomi metai – pvz. „Eurostat (2025)“ (render naudoja `s.year`). ContentSlides.tsx.
- **KPI:** Tik 2 spalvos – brand ir emerald (violet/amber pakeisti). modules.json kpiCards.
- **Dokumentacija:** NEWS_PORTAL_INFOGRAFIC_UI_UX_ANALIZE.md – naujas §7 „Kas padaryta“.

**2026-02-20 (News-portal section cards – layout, skaidrė 53.5)**

- **Section cards (01/02/03):** Turinio kolona nebesutraukia – grid pakeistas į `minmax(200px, 1fr)`, kad tekstas nelūštų po raide (ypač 02 – Verslas). Section cards eilutė: `lg:grid-cols-2 xl:grid-cols-3` (lg – dvi plačesnės kortelės, xl – trys). Kortelėje su paveikslu: `sm:grid-cols-[minmax(80px,120px)_minmax(200px,1fr)]`, mobiliajame – vienas stulpelis (paveikslas viršuje). Pridėta `min-w-0` ir `break-words` leftLabel/rightLabel (split), callout (business), stat.sub (lithuania); turinio blokas `overflow-x-auto`. ContentSlides.tsx – NewsPortalInfographicSlide.

**2026-02-20 (News-portal UI/UX ir vartotojo kelionė – skaidrė 53.5)**

- **Tipografija:** Headline H2 – `text-lg md:text-xl font-bold` (GOLDEN_STANDARD H2 atitikmuo). Featured hero skaičiaus etiketė – `opacity-90` → `opacity-95` skaitomumui.
- **8pt grid:** Section cards eilutė `gap-4` → `gap-5`; Row 2 (tools + youth | insight) `gap-4` → `gap-5`.
- **Vartotojo kelionė:** Takeaway blokas – `mt-3` → `mt-4`, `aria-label` papildytas „vienos eilutės takeaway“. Šaltinių mygtukas jau turi min-h-[44px], aria-label, aria-expanded, focus-visible (Must atlikta). Pagal NEWS_PORTAL_INFOGRAFIC_UI_UX_ANALIZE ir UI_UX_AGENT.

**2026-02-20 (News-portal UI/UX tobulinimai – KPI, callout, stagger)**

- **KPI strip:** Visoms kortelėms vienoda `border-t-brand-500` (mažesnis vizualinis triukšmas, Donato feedback); skaičiai lieka spalvoti (NUM_COLORS). Pridėta `animate-fade-in` su stagger (80ms vėlavimas tarp kortelių).
- **Verslas callout:** Ilgas calloutText skirstomas į 2 eilutes pagal „**Pagal dydį:**“ – pirmas sakinys ir „Pagal dydį: …“ atskirai (mažiau skaičių vienoje eilutėje). Komponente, be JSON pakeitimų.
- **Eyebrow pill:** `py-1.5` → `py-2` (touch/8pt).
- **Section cards:** `animate-fade-in` su stagger (100ms vėlavimas), kad skaidrė ne„šoktų“ visa iš karto.

### Added

**2026-02-20 (Infografika „DI galimybės praktiškai“ – verslo portalo vizualė ir iliustracijų slotai)**

- **Iliustracijų slotai (optional):** Skaidrei 53.5 pridėti optional stačios (vertical) ir gulsčios (horizontal) iliustracijų slotai – heroImageVertical, bannerImageHorizontal, bannerBetweenKpiAndSections, sectionCards[].imageVertical, toolsAndYouth.youthImageVertical, insightCard.illustrationHorizontal. Be paveikslų skaidrė atrodo kaip anksčiau; su paveikslais – portalo jausmas.
- **Tipai ir schema:** `NewsPortalImageSlot` (src, alt); plėtini `NewsPortalInfographicContent` ir section/youth/insight tipai; modules.schema.json – portalImageSlot ir infographic allOf su optional image laukais.
- **Takeaway:** Vienos eilutės sakinys „Kas trečias ES gyventojas ir kas penkta įmonė jau naudoja DI.“ (content.takeaway) rodomas po subline.
- **ContentSlides.tsx:** NewsPortalInfographicSlide – conditional header grid su heroImageVertical; horizontalūs banneriai tarp header/KPI ir KPI/section cards; section cards su optional vertical image; youth blokas su optional youthImageVertical; insight kortelė su optional illustrationHorizontal. Nuorodos: `import.meta.env.BASE_URL` + src (reliatyvus į public/).
- **Dokumentacija:** NEWS_PORTAL_INFOGRAFIC_UI_UX_ANALIZE.md – naujas §4 Iliustracijų slotai (stačios/gulsčios, JSON laukai, rekomenduojami public/ vardai, layout 8pt). GOLDEN_STANDARD § infographic – nuoroda į iliustracijų slotus ir NEWS_PORTAL doc.

**2026-02-20 (Agentų seka, diagramų praktikos, KISS-Marry-Kill vs react-diagrams)**

- **Agentų seka ir diagramų analizė:** Įgyvendintas planas – gili analizė schemų, DATA ribų, react-diagrams palyginimas; dokumentuotos geriausios praktikos; KISS-Marry-Kill sąrašas (neprieštarauja dabartiniam kodui).
- **DIAGRAMU_SCHEMU_DATA_ANALIZES_ATASKAITA.md:** CODE_REVIEW ataskaita – layout failų inventorizacija, Diagram/Block sąrašas, ContentSlides mapping, DATA_AGENT ribos, KISS-Marry-Kill su failais.
- **DIAGRAMU_GERIAUSIOS_PRAKTIKOS.md:** Konsoliduotas gidas – layout SOT, anchor/rodyklės, interaktyvumas, palyginimas su react-diagrams, KISS-Marry-Kill (Keep / Marry / Kill).
- **SCHEME_AGENT.md:** Naujas §2.1 „Mūsų požiūris vs react-diagrams“ – Model/View atitikmuo (layout = model, Diagram = view), vienas SOT, TypeScript, kodėl nenaudojame bibliotekos; nuoroda į DIAGRAMU_GERIAUSIOS_PRAKTIKOS.md; §7 nuorodos papildytos.
- **DATA_AGENT_DUOMENYS_ATNAUJINIMAS.md:** §6 papildytas – „Schemų skaidrėse – kas keičia ką“ (DATA_AGENT vs SCHEME_AGENT), nuorodos į DIAGRAMU_GERIAUSIOS_PRAKTIKOS ir SCHEME_AGENT §2.1.
- **Cursor rules:** scheme-agent.mdc – description papildytas (geometrijos tiesa, layout = model, react-diagrams praktikos); data-agent-glossary-tools-order.mdc – Susiję failai + DIAGRAMU_GERIAUSIOS_PRAKTIKOS.md; agent-orchestrator.mdc – schema/diagrama: atidaryti SCHEME_AGENT.md ir, jei naudinga, DIAGRAMU_GERIAUSIOS_PRAKTIKOS.md.
- **DOCUMENTATION_INDEX.md:** Aktyviems dokumentams pridėti DIAGRAMU_GERIAUSIOS_PRAKTIKOS.md ir DIAGRAMU_SCHEMU_DATA_ANALIZES_ATASKAITA.md.

**2026-02-20 (Golden Standard §3.4c – skiriamoji / apibendrinimo skaidrė)**

- **GOLDEN_STANDARD.md v2.3.0:** Naujas skyrius **§3.4c Skiriamoji / apibendrinimo skaidrė (section-break su 3 konceptais)** – etalonas skaidrėms su įsiminimu 3 konceptų (pvz. M4 skaidrė 40.5 „3 pagrindiniai promptų tipai“). Aprašyta: paskirtis, kada naudoti, privalomi/rekomenduojami laukai (celebrationText, recap.heading/lead/items/itemGlossaryTerms, nextSteps, footer), vizualės eilė (section badge → hero → pills → recap → Kas toliau → footer → spinoff), pastaba apie fiksuotas pills etiketes ir badge „3/5“, nuoroda į `SectionBreakSlide` (ContentSlides.tsx), A11y/UI_UX atitiktis (min 44px, aria-label, focus ring, dark mode).
- **DOCUMENTATION_INDEX.md:** Dizaino etalono eilutė atnaujinta – v2.3.0, §3.4c skiriamoji skaidrė.
- **QA (patikra):** modules.schema.json – section-break šakoje patvirtinti `recap.lead`, `recap.itemGlossaryTerms`; SectionBreakSlide – UI_UX_AGENT §4.2 (pills min 44px, aria-label hero/pills/recap/Kas toliau, focus ring, dark variantai) atitinka; DOCUMENTATION_INDEX ir GOLDEN_STANDARD sinchronizuoti.

**2026-02-19 (Agentų Orkestratoriaus schema – M12, praktinė dalis / projektai)**

- **Agentų orkestratoriaus diagrama:** Statinė schema (Router, agentai, pipeline, SOT) įtraukta į kursą – Modulio 12 (Finalinis projektas, Agentų kelias), skaidrė id 120.5 po practice-intro.
- **public/agent_orchestrator_v2.svg:** Standalone SVG (viewBox 1120×860) – 4 lygiai (INPUT, ROUTER, AGENTS, CONTROL/PIPELINE/OUTPUT), core agentai (CONTENT, CURRICULUM, SCHEME, DATA, CODING, UI_UX), control (CODE_REVIEW, QA, USER_JOURNEY), SOT blokas, mixed-task pipeline, rezultatas. Darbinė versija; pilną SVG galima atnaujinti iš originalaus HTML.
- **AgentOrchestratorDiagram.tsx, AgentOrchestratorBlock.tsx:** Diagrama rodoma per `<img src="agent_orchestrator_v2.svg">`; Block naudoja EnlargeableDiagram – „Peržiūrėti visą dydį“ atidaro tą patį turinį modale (SCHEME_AGENT, AGENT_VERIFICATION_NE_MELUOTI).
- **ContentSlides:** Šaka `section.image.includes('agent_orchestrator')` → `<AgentOrchestratorBlock />`.
- **modules.json:** Nauja content-block skaidrė (id 120.5) „Agentų orkestratorius“ su whyBenefit, sections[].image `agent_orchestrator_v2`, blockVariant accent.
- **SCHEME_AGENT.md:** SOT lentelėje eilutė „Agentų orkestratorius (M12)“ – failai, „Peržiūrėti pilname dydyje“ = tas pats React (img).
- **TODO.md:** Optional/Backlog įrašas „Orch“ – žingsniai (SVG→React, Block, skaidrė M10/M12/M6, agentai CONTENT→SCHEME→DATA→CODING→CODE_REVIEW→QA), SOT nuorodos.
- **Patikra:** `node scripts/validate-schema.mjs` – OK. Planas: `agentų_orkestratoriaus_schemos_integravimas_34be96d2.plan.md`.

**2026-02-19 (Skaidrė 43 – Struktūruotas procesas: vizualus debug – rodyklė ir apvadas)**

- **Rodyklė siekia bloko:** Antram ir trečiam blokui pridėtas `lg:-ml-4` (pirmam `lg:first:ml-0`), kad Connector dešinys kraštas vizualiai sutaptų su matomo (pilko) bloko kairiu kraštu – pašalintas ~16px tarpas dėl `pl-4` ant article (runtime getBoundingClientRect patvirtino gapArrowToVisibleBlockPx ≈ 16).
- **Mėlynas apvadas tik aplink turinį:** Ring perkeltas iš `article` į vidinį `div` (pilkas blokas); `ring-2 ring-brand-500 ring-inset` brėžiamas tik aplink turinio bloką, ne aplink `pl-4` zoną – apvadas nebeišeina už bloko rėmų (SCHEME_AGENT geriausios praktikos §3.11).
- **Connector SVG:** Linija iki viewBox dešinio krašto (x2=48), `markerUnits="userSpaceOnUse"` – antgalio smailė liečia kraštą. Failas: `StrukturuotasProcesasDiagram.tsx`.
- **DATA_AGENT:** Jokių `modules.json` pakeitimų – tik UI/komponento layout.

**2026-02-19 (Skaidrė 43 – Struktūruotas procesas: interaktyvumas, turinys, SOT)**

- **SOT (4.1b):** `docs/turinio_pletra_moduliai_4_5_6.md` – 4.1b aprašas atnaujintas: skaidrėje 43 **3 žingsnių modelis** (Įvestis → Apdorojimas → Rezultatas), interaktyvi schema; 8 žingsnių workflow – 4.1b2 arba optional collapsible.
- **Turinys:** „grandinės“ → „grandines“ (Trumpai) skaidrėje 43; Patikra (4️⃣) – `collapsedByDefault: false`, kad būtų matoma iš karto.
- **Interaktyvus Struktūruotas procesas:** StrukturuotasProcesasBlock – „Tu esi čia“ badge, žingsnių mygtukai (1–3), paaiškinimų blokas apačioje; StrukturuotasProcesasDiagram – props `currentStep`, `onStepClick`, clickable kortelės (aria-label, role="button", tabIndex, onKeyDown); `strukturuotasProcesasStepExplanations.ts` – 3 žingsnių paaiškinimai.
- **Peržiūrėti pilname dydyje:** EnlargeableDiagram wrapper – atidaro tą patį React modale (SCHEME_AGENT §5.5).
- **Patikra:** SCHEME_AGENT §5 – rodyklės kraštas į kraštą, interaktyvumas, „Peržiūrėti pilname dydyje“ = tas pats React.

**2026-02-19 (Proceso prompt 4.1b2 – Kiss-Marry-Kill poliravimas)**

- **Skaidrė id 55 (Proceso prompt: savo profesinio workflow sudarymas):** (1) **whyBenefit** – vienas sakinys virš turinio („Procesas suteikia aiškumą komandoms ir sprendimų priėmėjams; apibrėžtas workflow – „bėgiai lokomotyvui“ vėlesnėms grandinėms ir įrankiams.“). (2) **Pirmas veiksmas per 60 s** ir **Ką gausi** – įtraukta į pirmą bloką (1️⃣ Kam tai? Ką gausi?). (3) **2️⃣ Apibrėžk** sutrumpintas (K1) – be pakartojimo, aiškus veiksmas, „įklijuok į lauką CONTEXT žemiau“. (4) **optional: true** ir subtitle papildymas „Neprivaloma.“ (M5). (5) **Papildomai: 3 pavyzdžiai sritims** – antraštė sutrumpinta, sekcija collapsible, collapsedByDefault: true (K2). (6) Lentelė „Geras vs blogas“ – „Output gairių“ → „išvesties gairių“, „KPI“ → „pagrindiniai rodikliai (KPI)“ (PAPRASTOS_KALBOS_GAIRES). (7) SOT: `docs/turinio_pletra_moduliai_4_5_6.md` – 4.1b2 blokas papildytas whyBenefit, pirmuoju veiksmu, „Ką gausi“. CTA ir lentelė (M3, M4) – jau atitinka UI_UX_AGENT (accent mygtukas, renderBodyWithBold). Planas: Proceso prompt KMK ir poliravimas.

**2026-02-19 (Autoregresinis LLM – feedback rodyklė žemyn)**

- **Feedback path rodyklė:** Punktyrinės linijos „Pridedama prie naujos įvesties“ trikampio rodyklė prie Įvestis N+1 bloko pasukta 180° – dabar rodo **žemyn** (į bloką), atitinkant srauto kryptį. Failai: `LlmAutoregressiveDiagram.tsx` (polygon points: smailė apačioje, pagrindas viršuje), `llmAutoregressiveLayout.ts` (komentaras atnaujintas). Statinis SVG `public/llm_autoregressive_rytas_zalgiris.svg` – polygon suderintas (points 94,211 90,204 98,204). SCHEME_AGENT §5: rodyklė kraštas į kraštą, path nekerta blokų, trikampis neperšoka.

**2026-02-19 (Autoregresinis LLM – 8 žingsnių (4+4) state-driven plėtra, skaidrė 44)**

- **8 žingsnių modelis:** 4 pirmo lygio (Žingsnis N: Įvestis, LLM, Išvestis, Pasirinkta) + 4 antro lygio (Žingsnis N+1: tie patys blokai). State `currentStep` 0..7; paryškinamas vienas blokas (opacity + border), 8 paspaudžiamos zonos diagramoje.
- **LlmAutoregressiveDiagram.tsx:** Props `currentStep` 0..7, `getRowAndPhase(step)`; 8 hit areas (rect) su aria-label „Žingsnis X: …“, role="button", tabIndex, onKeyDown. Rodyklės ir feedback path be pakeitimų.
- **LlmAutoregressiveBlock.tsx:** 8 mygtukų (1–8), „Atgal“ / „Pirmyn“, „Tu esi čia: X/8“, paaiškinimų blokas iš 8 tekstų. Touch targets min 44px, nav aria-label „Žingsnių pasirinkimas (1–8)“.
- **Paaiškinimai:** `LLM_AUTOREGRESSIVE_STEP_EXPLANATIONS` išplėsti į 8 elementus (1. Įvestis (N) … 8. Pasirinkta (N+1)); paprasta kalba (PAPRASTOS_KALBOS_GAIRES).
- **SOT:** docs/turinio_pletra_moduliai_4_5_6.md – „Kaip veikia LLM?“ blokas aprašytas kaip 8 žingsnių interaktyvus.

**2026-02-19 (Autoregresinis LLM – state-driven interaktyvus komponentas, skaidrė 44)**

- **LlmAutoregressiveDiagram.tsx:** React SVG diagrama – dvi eilutės (Žingsnis N, N+1), keturi blokai eilutėje (Įvestis → LLM → Išvestis → Pasirinkta). Forward rodyklės į dešinę (linijos kairė→dešinė, marker-end), feedback path „Pridedama prie naujos įvesties“. Props: `currentStep` (0 | 1), `onStepClick`. Aktyvus žingsnis paryškintas (opacity), paspaudžiamos eilutės (aria-label, role="button", tabIndex, onKeyDown).
- **LlmAutoregressiveBlock.tsx:** State `currentStep`, „Tu esi čia“ badge, žingsnių mygtukai (1, 2), paaiškinimo blokas apačioje (role="status", aria-live="polite"). `EnlargeableDiagram` – „Peržiūrėti visą dydį“ atidaro tą patį React modale (AGENT_VERIFICATION_NE_MELUOTI). Touch targets: min-h-[44px] min-w-[44px] žingsnių mygtukams.
- **Paaiškinimai:** `LLM_AUTOREGRESSIVE_STEP_EXPLANATIONS` (stepExplanations.ts) – Žingsnis N ir N+1 (kas vyksta, kodėl kontekstas pereina).
- **ContentSlides:** Šaka `section.image?.includes('llm_autoregressive')` → `<LlmAutoregressiveBlock />`; skaidrė 44 naudoja `/llm_autoregressive_rytas_zalgiris.svg` (URL atitinka, blokas rodomas).
- **SCHEME_AGENT §5 patikra:** Rodyklės kraštas į kraštą (x1/x2 iš originalo SVG); path nekerta blokų (feedback aplink); interaktyvumas – aria-label, role, tabIndex, onKeyDown, 3.6 („Tu esi čia“, mygtukai). Esamas statinis SVG neliestas – pilkos rodyklės jau į dešinę.

**2026-02-19 (Skaidrė 44 – Konteksto inžinerija: schema, kartojimo pašalinimas, iliustracijos rėmas)**

- **Skaidrė id 44 tobulinimas:** (1) Kartojimas pašalintas – „Kodėl čia?“ vienintelė vieta su „kontekstas = valdymo svirtis“; „Trumpai (15 s)“ – veiksmo forma („Pabandyk šabloną žemiau“), be pakartotos frazės. (2) Schema: esama „Kaip veikia LLM?“ perkelta į viršų po „Trumpai“ kaip pagrindinė vizualizacija; atskira „Kaip veikia kontekstas?“ pašalinta. (3) InstructGPT blokas performuluotas kaip **iliustracija** – įvadinis sakinys prieš diagramą: „Tyrimas iliustruoja: geresnis kontekstas = geresni įvertinimai. Žemiau – OpenAI eksperimento rezultatai.“; blokas rodomas po 6-os sekcijos (InstructGPT įrodymas). (4) SOT: `docs/turinio_pletra_moduliai_4_5_6.md` – 4.1a blokų seka ir aprašas atnaujinti. (5) USER_JOURNEY + UI_UX: `docs/development/MODULIO_4_USER_JOURNEY_ANALIZE.md` – naujas skyrius „7. Skaidrė 44 – gili analizė“ (5 zonos, trinties vietos, atitikties lentelė).
- **ContentSlides:** `context_flow` šaka pašalinta (schema skaidrėje 44 – tik „Kaip veikia LLM?“). ContextFlowDiagram/ContextFlowBlock lieka repozitorijoje, bet skaidrėje 44 nenaudojami.
- **Patikra:** `npm run build` – OK. Footer numeriai teisingi.

**2026-02-19 (Modulio 4: Konteksto inžinerija + InstructGPT sujungta į vieną skaidrę – variantas B)**

- **Sujungta skaidrė id 44:** „Konteksto inžinerija: kaip valdyti DI“ dabar apima ir buvusios skaidrės 40.8 (InstructGPT: instrukcijų laikymasis) turinį: Kodėl čia?, Trumpai, Kas yra, Ką sudaro, InstructGPT įrodymas (Trumpai tyrimo, Kaip veikia LLM + image, Kas matuota? Rezultatas), Esmė, Kuo padeda (collapsible), Pabandyk dabar (copyable + pavyzdys laužtiniams skliaustams), Veiksmas, Šaltiniai (collapsible); išlaikytas `instructGptQuality` (stats, chartData, deltaRows, insight). Subtitle: „Kas tai, kodėl svarbu – ir OpenAI tyrimo įrodymai“.
- **Pašalinta skaidrė id 40.8** iš Modulio 4 `slides` masyvo.
- **Modulio 4 footeriai:** Visi „Toliau – skaidrė N:“ (N ≥ 5) sumažinti vienetu (N-1), kad atitiktų naują skaidrių skaičių; merged skaidrės footer: „Toliau – skaidrė 4: DI įrankiai pagal formą“. footer-slide-numbers.mdc.
- **SOT:** `docs/turinio_pletra_moduliai_4_5_6.md` – 4.1a aprašas atnaujintas (sujungta su InstructGPT); 4.8 lentelėje pažymėta kaip sujungta su 4.1a; §2.2 4.1a blokų sąrašas išplėstas. `docs/MODULIO_4_SKAIDRIU_EILES.md` – eilė 2 aprašas (4.1a + InstructGPT), trumpos taisyklės papildytos.
- **Komentarai:** `src/types/modules.ts`, `InstructGptQualityBlock.tsx` – JSDoc nuorodos „skaidrė 40.8“ pakeistos į „content-block, pvz. skaidrė id 44“.
- **Patikra:** `node scripts/validate-schema.mjs` – OK.

**2026-02-19 (Modulio 4 pirmos skaidrės action-intro – „mažiau, bet geriau“, QA)**

- **M4 intro skaidrė (id 38) – hook ir progresyvus atskleidimas:** Pirmame ekrane rodomas tik **whyBenefit** (vienas sakinys) + vienas CTA mygtukas („Pamatyk, kas laukia – per 1 minutę!“). Hero (heroStat, heroText, heroSubText) ir firstActionCTA blokas **nerodomi** prieš CTA paspaudimą – tik po reveal. Pašalintas dubliavimas su H1; sumažinta informacijos perteklius ir „išgasdinantis“ pirmas įspūdis. Planas: `m4_intro_skaidrės_analizė_b2f9bf56.plan.md`.
- **ActionIntroSlide.tsx:** (1) Fono dekoratyvūs ?, ! opacity sumažinta 0.06 → 0.03. (2) Hook fazė (`showHookOnly`): kai `hasReveal && !revealed` – tik whyBenefit + CTA; hero ir firstActionCTA – tik po reveal. (3) Po reveal: palyginimas → firstActionCTA (accent blokas) → outcomes (4 punktai + „Rodyti visus (N)“) + collapsible „Kam skirta / Trukmė“ (aboutText, duration, audience) → įrankiai (3 + „Rodyti visus“). Vienas dominuojantis CTA; antriniai antro plano. GOLDEN_STANDARD §3.1, UI_UX_AGENT §4.2.
- **SOT:** `docs/turinio_pletra_moduliai_4_5_6.md` §1.4 – aprašytas Hook (pirmas ekranas tik whyBenefit + ctaText), Hero ir firstActionCTA rodomi tik po reveal, aboutText collapsible, outcomes „Rodyti visus“. modules.json (id 38) – turinys be pakeitimų; rodymo logika komponente.
- **Patikra:** Lint ActionIntroSlide – OK. Hook = vienas naudos sakinys + vienas CTA; firstActionCTA „žemiau sąrašas“ atitinka UI (sąrašas matomas po reveal).

**2026-02-18 / 2026-02-25 (Dalyvių sąrašas, segmentacija A/B/C, spin-off funnel – QA/doc)**

- **Dalyvių sąrašas ir privatumas:** Galutinis sąrašas – `dalyviu_sarasas.md` (root, neįkeliamas į GitHub). 132 asmenys (2026-02-18 cohort 43 + 2026-02-13 cohort 89), dubliatų nėra. Visur kitur – tik nuoroda į šį failą; `.gitignore` – `dalyviu_sarasas.md`, `*pirmoji_testo_savaite*`, `*testo_dalyviai*`. Žr. `docs/VARTOTOJU_ATSILIEPIMAI_BENDRAS.md` §12, `docs/marketing_plan.md`.
- **Analizė ir Top 20:** `dalyviu_sarasas.md` – sąrašas pagal pavardės abėcėlę, gili analizė (auditorija, įžvalgos), Top 20 kontaktai su „kodėl, kaip, ko prašyti“.
- **Integruota strategija (A/B/C + 3 pitch'ai):** `dalyviu_sarasas.md` §1a – segmentai A (C-level/Head, B2B pilotas), B (middle management, testimonial + intro į vadovą), C (amplifikacija + beta); ne masinė komunikacija (A: 15 min call; B: 2–3 sakiniai + rekomenduoti HR/vadovui); 3 skirtingi pitch'ai (HR, IT/Data, Vadovams). §2 lentelė – stulpelis „Segmentas“ (A/B/C). Top 20 ir §3.1 suderinti su segmentais. `docs/marketing_plan.md` – poskyris „Segmentuota B2B ir lead follow-up strategija“ ir „Spin-off kaip funnel dalis“. `docs/VARTOTOJU_ATSILIEPIMAI_BENDRAS.md` §12 – nuoroda į integruotą strategiją.
- **Spin-off kaip funnel dalis:** `docs/marketing_plan.md` – Spin-off Nr. 1 [8 promptų biblioteka](https://ditreneris.github.io/biblioteka/) (~30 min); Spin-off Nr. 2 [SOT_Marketingas](https://ditreneris.github.io/marketingas/) (~45–60 min, 10 promptų rinkodaros vadovams). Fase 1 veiksmai – dalintis abiem nuorodomis gyvu mokymu ir LinkedIn. **LinkedIn postas antram spin-off numatytas 2026-02-25.** §6 „Spin-off kaip funnel dalis“, §7 Awareness atnaujinti.

**2026-02-18 (Modulių puslapis – paprasta kalba, Golden, be dubliavimo)**

- **Modulių puslapis (ModulesPage):** H1 – **„Paversk DI savo darbo sistema“**. Subtitle – **„Kiekvienas modulis – realios užduotys, verslo scenarijai ir šablonai.“** (H1 ir subtitle nesidubliuoja). Badge virš H1 pašalintas. Pirmam nebaigtam moduliui – „Toliau rekomenduojama“ + ring. Atitikmuo: PAPRASTOS_KALBOS_GAIRES, GOLDEN_STANDARD (vienas H1, vienas dominuojantis CTA).
- **GOLDEN_STANDARD v2.2.1:** §8.4 Modulių puslapis – legacy idea (H1 ir subtitle etalonas), taisyklė „nesidubliuoti“. `docs/development/GOLDEN_STANDARD.md`.
- **modules.json:** Modulio 4 pavadinimas „Konteksto inžinerija“ paliktas; M4 subtitle be „RAG, Deep research“ – „Šaltiniai, tokenai, manipuliacijos, haliucinacijos“. Dokumentuota `MODULIU_PUSLAPIO_ANALIZE_UX_CTA.md` §6.

**2026-02-18 (Modulių 4–6 Golden Standard agentų seka – pre-release)**

- **M4 Golden Standard auditas:** Naujas dokumentas `docs/development/M4_GOLDEN_STANDARD_AUDIT.md` – skaidrė-po-skaidrės atitiktis GOLDEN_STANDARD v2.2.0, MUST/SHOULD (MODULIO_4_TOBULINIMAI), footerių lentelė ir prioritizuotas veiksmų sąrašas.
- **M4 footeriai (DATA_AGENT):** Pataisyti trys footer N skaidrėse – id 41 („Toliau – skaidrė 6“), id 43 („Toliau – skaidrė 10“), id 42 („Toliau – skaidrė 21“). N = kitos skaidrės 1-based pozicija modulyje (footer-slide-numbers.mdc).
- **SOT M2 (CONTENT_AGENT):** `docs/turinio_pletra_moduliai_4_5_6.md` – 4.2 lentelėje pridėtas aiškus MUST M2 reikalavimas: visose RAG skaidrėse būtina „Jei nėra kontekste – parašyk Nežinau“ ir citavimas.
- **M5, M6:** Footerių patikra – M5 ir M6 skaidrių footer N atitinka pozicijas; M5 skaidrė 514 jau turi thresholdExplanation ir useCaseBlock (ANALIZE rekomendacija įgyvendinta).
- **Patikra:** `node scripts/validate-schema.mjs` – OK.

**2026-02-18 (Golden Standard 2.2.0 – apšilimas, warm-up-quiz, section-break – QA)**

- **GOLDEN_STANDARD §3.2a:** Apšilimo skaidrė (content-block variantas) – schema TL;DR → Daryk dabar → Copy → Patikra (be Optional), 2–3 min, pavyzdys M3 id 30.5. SOT: turinio_pletra.md § „Apšilimas (Warming-up)“.
- **GOLDEN_STANDARD §3.4a:** warm-up-quiz (savitikra) – 3 klausimai, diagnostinis feedback, vietos M4 (63.5, 65.7, 66.5, 68.5). Skirtumas nuo apšilimo: quiz vs praktinis pavyzdys.
- **GOLDEN_STANDARD §3.4b:** section-break – skyriaus skiriamoji skaidrė, content: title, subtitle.
- **SKAIDRIU_TIPU_ANALIZE:** Pridėti warm-up-quiz, section-break į §1.1; §3.6 apšilimas vs warm-up-quiz lentelė; §4 rekomenduojama seka atnaujinta (moduliai 1–3 įgyvendinta).
- **Versija:** GOLDEN_STANDARD 2.1.0 → 2.2.0.

**2026-02-18 (Data scraping – Duomenų analizės kelio SOT, skaidrė 7.7a, M9 scenarijus – QA)**

- **SOT – Data scraping:** `docs/turinio_pletra_moduliai_7_8_9.md` – naujas §3.4 „Data scraping (duomenų siurbimas)“, §1.2 mokymosi tikslas, §8.1 lentelė skaidrei 7.7a. Paprasčiausi būdai (rankinis, naršyklė, DI skriptas, API), etika/teisė, CopyButton promptas skriptui generuoti.
- **M9 Scenarijus 5a:** „Data scraping su paprastu Python skriptu“ – bibliotekos (requests, BeautifulSoup), promptas, 5 žingsnių instrukcija paleisti, optional vizualizacijos pratimas. SOT §10.2.
- **Skaidrė 7.7a:** `docs/MODULIO_7_SKAIDRIU_EILES.md` – eilė 5a, skaidrė „Data scraping – paprasčiausi būdai“ po 7.6–7.
- **Modulio 7 skaidrė (id 77.5):** `modules.json` – nauja content-block skaidrė tarp 77 ir 78: Trumpai, Daryk dabar, Kopijuojamas promptas (ROLE/TASK), Etika, Kaip paleisti (5 žingsniai). GOLDEN_STANDARD §3.2.
- **Modulio 9 scenarijus (id 117):** „Data scraping su Python skriptu“ – practice-scenario, recommended: true, characterId: 1 (Jūratė). Pridėtas į recommendedSlideIds, recommendedStart. M9 santrauka: 16→17 scenarijai.
- **Patikra:** `npm run validate:schema` – OK.

**2026-02-18 (P1–P3 sesija – M3 apšilimas, Situacija, CTA, M1 collapsible, pasirenkamos praktikos, DI mąstymo skaidrė – QA)**

- **P1 – M3 apšilimas (buv. įkaitinimas):** Nauja skaidrė Modulio 3 po „Praktikos Įvadas“ (id 30.5): „Apšilimas“ – paprastas pirmas praktinis pavyzdys (2–3 min) su vienu kopijuojamu promptu, TL;DR → Daryk dabar → Copy → Patikra. SOT: `turinio_pletra.md` (skyrius „Apšilimas (Warming-up)“). M3 footeriai perskaičiuoti (1–9 pozicijos). Terminologija: „įkaitinimas“ → „apšilimas“ (modules.json, turinio_pletra.md).
- **P1 – M3 „Situacija“ blokas:** Kiekvienam iš 6 M3 scenarijų (id 31–36) pridėtas `scenario.situation` (2–3 sakiniai: persona, problema, kontekstas). Tipas: `Scenario.situation?: string` (modules.ts); schema atnaujinta. TestPracticeSlides.tsx – virš „Scenarijaus Aprašymo“ skirtukų rodomas blokas „Situacija“ (brand stilius), kai `slide.scenario?.situation` nurodyta.
- **P2 – M3 nuoroda į promptų biblioteką:** M3 santraukoje (id 37) sekcijoje „Kitas Žingsnis“ pridėtas antras punktas: CTA į promptų biblioteką („Peržiūrėkite promptų biblioteką – paruošti šablonai pagal temą…“). content-agent-summary-slide, GOLDEN_STANDARD §3.3.
- **P2 – M1 collapsible „Kodėl tai veikia“:** M1 skaidrėse 9 (Reasoning), 10 (Quality), 11 (Advanced) pridėta viena optional sekcija `content.sections`: heading „Kodėl tai veikia“, body, collapsible, collapsedByDefault, blockVariant terms. BlockSlides.tsx – OptionalWhySections; AdvancedBlockSlide.tsx – toks pat pattern. GOLDEN_STANDARD §3.2.
- **P3 – M3 pasirenkamos praktikos:** Practice-intro (id 30) content: `minScenariosToComplete: 2`, `optionalInstruction`: „Pasirinkite bent 2 scenarijus pagal savo rolę arba dominą – galite praleisti likusius.“ TestPracticeSlides.tsx – getPracticeIntroContent grąžina šiuos laukus; įvade rodoma instrukcija (amber blokas) ir progresas „X iš 6 scenarijų užbaigta (bent 2 privaloma)“. Modulio „baigtumas“ vis dar pagal paskutinę skaidrę (ne pagal bent 2 scenarijus).
- **P3 – M1 DI mąstymo logikos skaidrė:** Skaidrė „Mąstymo Modeliai“ (id 8) – pridėtas collapsible „Kodėl tai veikia“ (content.sections): kodėl DI mąstymas (CoT/ToT) veikia taip – seka instrukcijas, ne „natūralus mąstymas“. SOT: turinio_pletra.md (pastraipa „Kodėl DI mąstymas veikia taip“). BlockSlides.tsx ReasoningModelsSlide – OptionalWhySections(slide) prieš „Svarbi pastaba“.
- **Patikra:** npm run validate:schema, npm run build – OK. Paprasta kalba, GOLDEN_STANDARD §3.2, lietuviškos raidės – spot check atliktas.

**2026-02-18 (UX analizė M1–3, TODO prioritetai – QA)**

- **UX analizė:** Naujas dokumentas `docs/UX_ANALIZE_MODULIAI_1_3_V1_SURVEY_16.md` – kokybinė analizė pagal 16 respondentų tyrimą (6 klausimai). Executive insight (3 signalai), pasikartojantys modeliai (praktika 4×, teorijos aiškumas 5+×), 5 frikcijos vietos su citatomis, modulių 1–3 mini-diagnostika, prioritetų matrica, 30 dienų testavimo planas. Nėra pseudo-statistikos – tik signalai ir temas.
- **TODO prioritetai:** P1 – M3 warming-up (pirmas praktinis pavyzdys), M3 „Situacija“ blokas scenarijams. P2 – M3 nuoroda į promptų biblioteką, M1 collapsible „Kodėl tai veikia“. P3 – M3 pasirenkamos praktikos, M1 DI mąstymo logikos skaidrė. Nuorodos skyriuje – `UX_ANALIZE_MODULIAI_1_3_V1_SURVEY_16.md`.

**2026-02-16 (Modulio 4 – manipuliacijos ir haliucinacijos skaidrės, SOT atitiktis)**

- **67.3 rašybos:** „šalisku“→„šališką“, „Īrodyk“→„Įrodyk“, „Viešpušis“→„vienpusis“, „praksšymas“→„prašymas“, „dalelį“→„dalį“, „Išankstine“→„Išankstinė“. `modules.json`.
- **67 leading questions:** subtitle „leading questions“→„vedantys klausimai“ (PAPRASTOS_KALBOS_GAIRES). 67.5 „Takoskyra“ – tas pats.
- **67.8, 68 blockVariant:** „Kas yra haliucinacija?“ brand; „5 taisyklės“, „Anti-haliucinacinis“ terms; „Kaip tikrinti“ brand; „Trikampis“ accent; „Ką prisiminti“ terms. 67.5 – Prompt injection, Jailbreak, Takoskyra terms; Gynybos principai accent.
- **68.5:** „slėptinė instrukcija“→„slapta instrukcija“ (check-manip-2 options).
- **Footeriai:** 67, 67.3, 67.5, 67.8, 68 – pridėtas `content.footer` su 1-based pozicija (42–46). 200, 201 – pataisytas footer numeris (47, 48). footer-slide-numbers.mdc, GOLDEN_STANDARD §3.6.
- **Patikra:** `npm run validate:schema`, `npm run build` – OK.

**2026-02-16 (Modulio 4 – skaidrė Konteksto degradacija)**

- **Nauja skaidrė 4.4-degradation:** „Konteksto degradacija: kodėl modeliai „pamiršta“?“ įterpta tarp Tokenų ekonomikos (4.4) ir Savitikra: Tokenai (4.4-check). Turinys: Lost in the Middle, dėmesio sklaida, FIFO; verslo pavyzdys (lentelė); tyrimų duomenys (Liu et al. 2023); 3 praktikos (checkpoint, izoliavimas, prioritetų kartojimas); collapsible šaltiniai. Tipas: content-block, id 66.25. SOT: `docs/turinio_pletra_moduliai_4_5_6.md` (2.1 lentelė, 2.2 skyrius, žodynėlis Konteksto degradacija / Lost in the Middle), `docs/MODULIO_4_SKAIDRIU_EILES.md` (27b, trumpos taisyklės). `src/data/modules.json` – nauja skaidrė su 6 sekcijomis, lentele ir collapsible.
- **Footeriai M4:** Po įterptos skaidrės 66.25 perskaičiuoti „Toliau – skaidrė N“ numeriai pagal `.cursor/rules/footer-slide-numbers.mdc`: 45→46 (Haliucinacijų rodikliai → DI turinio detektoriai), 46→47 (DI turinio detektoriai → Savitikra: Manipuliacijos ir haliucinacijos). N = kitos skaidrės 1-based pozicija modulyje.

**2026-02-16 (Modulio 13 – trys skiriamosios skaidrės, tipas, doc)**

- **Trys section-break skaidrės M13:** Įterptos skiriamosios skaidrės – **13.15 „Vaizdo generavimas“** (po 13.1), **13.36 „Video generavimas“** (po 13.35), **13.56 „Muzikos generavimas“** (po 13.5). Tipas `section-break`; turinys: title, subtitle, sectionNumber, footer. Vizualiai skiria modulio skyrius (Vaizdai / Video / Muzika). `modules.json`.
- **Footeriai section-break:** Kiekvienai section-break skaidrei pridėtas `content.footer` („Toliau – skaidrė N: …“). Visi M13 footeriai perskaičiuoti pagal naują eilę (2–17); 13.9 be „Toliau“. footer-slide-numbers.mdc.
- **Tipas:** `src/types/modules.ts` – į `SectionBreakContent` pridėtas `footer?: string`, kad atitiktų JSON ir SlideContent naudojimą.
- **Fazės:** `slidePhaseConfig.ts` – 13.15→„Vaizdai“, 13.36→„Video“, 13.56→„Muzika“.
- **Doc:** `docs/MODULIO_13_SKAIDRIU_EILES.md` – oficialioje skaidrių eilėje įrašytos 13.15, 13.36, 13.56; atnaujinti eilės numeriai (2–14); „Trumpos taisyklės“ – taisyklė apie section-break skaidres.
- **Patikra:** `npm run validate:schema`, `npm run build` – OK.

**2026-02-16 (M13 SOT turinys į skaidres – formulė, įrankiai, 13.33, video, workflow)**

- **13.2:** Pridėta formulė „Vaizdas = Objektas + Kontekstas + Estetika“, sekcija „Minimalūs reikalavimai“ (3–7 žodžiai, estetikos žodis); collapsible „Kodėl tai veikia“ (terms).
- **13.3:** Collapsible „Kuris įrankis kam“ – DALL·E, Midjourney, Leonardo.ai, Ideogram, Adobe Firefly, Google Imagen (1–2 sakiniai kiekvienam); collapsedByDefault: false.
- **13.33 (nauja optional skaidrė):** „Kompozicija ir kadras“ – TL;DR, trečdalių taisyklė ir planai, kameros kampas ir kadro tipai (ELS, MLS, CU, ECU), Daryk dabar, CopyButton (kompozicija+kadras), collapsible „Naratyvinis vaizdas“ su CopyButton. Įterpta tarp 13.3 ir 13.35.
- **13.35:** Išplėstas „DI vaizdų workflow“ (SOT kategorijos: objektai, stilius, kompozicija, apšvietimas, spalvos, techniniai parametrai); 3 ready prompts atvirai (Logotipas, Social post, Plakatas) su copyable; collapsible „Visi 8 verslo scenarijai“; Patikra (accent).
- **13.4:** Sekcija „Kadravimas ir kameros kampas“ (brand) – lygus akims, iš viršaus, iš apačios, POV keičia emociją.
- **13.5:** „Kodėl DI video verta dėmesio“ (accent); į „Įrankiai“ įrašytas Google Veo 3; collapsible „Video prompt laukai“ (terms).
- **slidePhaseConfig.ts:** 13.33 pridedamas prie fazės „Vaizdai“.
- **Doc:** `docs/MODULIO_13_SKAIDRIU_EILES.md` – įtraukta 13.33, atnaujinti 13.2–13.5 aprašymai; `docs/development/MODULIAI_13_14_15_TURINIO_SPRAGOS_IR_ATSAKOMYBE.md` – skyrius „4. Įgyvendinta (2026-02-16)“.
- **Patikra:** `npm run validate:schema`, `npm run build` – OK.

**2026-02-16 (Modulio 13 UI/UX planas – id 13.10, footeriai, KPI, paprasta kalba)**

- **Kritinė pataisa:** Skaidrė „Verslas ir rizikos“ `id` pakeistas iš `13.1` į `13.10` (modules.json), kad nebūtų dublikato su skaidre „Turinio inžinerijos kelias – ką čia rasite“. SOT: MODULIO_13_SKAIDRIU_EILES.md.
- **Footeriai M13:** Visoms Modulio 13 skaidrėms (1–13) pridėtas `content.footer` su nuosekliu pozicijos numeriu („Toliau – skaidrė N: [pavadinimas]“). Skaidrė 14 (13.9 santrauka) be „Toliau“. GOLDEN_STANDARD §3.6, footer-slide-numbers.mdc.
- **Paprasta kalba ir žodynėlis:** 13.10 „Trumpai“ – KPI, CTR, CVR, CPM paaiškinti (nuoroda į žodynėlį); „Use-cases“ pakeista į „Naudojimo atvejai“. Į žodynėlį (13.8) pridėtas terminas „KPI (pagrindiniai rodikliai)“ su apibrėžimu. PAPRASTOS_KALBOS_GAIRES.
- **Patikra:** 13.11 TurinioWorkflowDiagram – rodyklės kraštas į kraštą, interaktyvumas („Tu esi čia“, žingsnių mygtukai), EnlargeableDiagram atidaro tą patį React. SCHEME_AGENT §5.
- **Build/lint:** `npm run validate:schema`, `npm run build`, `npm run lint` – OK.

**2026-02-16 (Footer UI ir modulių progreso etiketė – UX)**

- **Footer vienoje vietoje:** Skaidrių footeriai (`content.footer`) dabar rodomi **visiems** skaidrių tipams iš vienos vietos – `SlideContent.tsx` po turinio prideda footer bloką, kai `content.footer` nurodytas. Anksčiau footer rodė tik content-block, pie-chart, infographic, hallucination-dashboard, ai-detectors; definitions, workflow-summary, prompt-types, transition, block slides, comparison, summary ir kt. turėjo footer duomenyse, bet nerodė. Dubliavimas pašalintas iš ContentSlides.tsx (ContentBlockSlide, PieChartSlide, ProductivityInfographicSlide) ir iš SlideContent „hallucination-dashboard“ / „ai-detectors“ rendererių.
- **Modulių progresas – aiški etiketė (UI/UX):** Apačioje esantys apskritimai (skaičiai / žalia varnelė) dabar turi viršutinę etiketę **„Moduliai (žalia ✓ = baigta)“**, kad vartotojai iš karto suprastų, ką reiškia eilutė. Pridėtas `aria-label` grupei („Modulių progresas: kuris modulis baigtas“) ir `title` ant kiekvieno apskritimo (dabartinis / baigtas / modulio nr.). `ModuleView.tsx`.

**2026-02-16 (Plano „Kodo bazės analizė“ įgyvendinimas – P1/P2)**

- **P1 – Rašyba:** `modules.json`: pataisyta `perršykite` → `perrašykite` (3 vietos: M4 skaidrės principai ir „Pataisyk promptą“).
- **P1 – Nuorodos:** Nutrūkusios nuorodos į `ANALIZES_VERDIKTAS_MUST_SHOULD_WANT.md` pakeistos į egzistuojančius dokumentus: `TODO.md`, `docs/VARTOTOJU_ATSILIEPIMAI_BENDRAS.md`, `ROADMAP.md`, `CHANGELOG.md` – nuorodos dabar į `PLAN_AGENTAI_DARBAI.md`, `MODULIO_4_TOBULINIMAI_GERIAUSIOS_PRAKTIKOS.md`.
- **P2 – M4 MUST M4:** Skaidrė 67.5 „Saugumas: prompt injection ir jailbreak“ jau pilna (modules.json) – patikrinta, pakeitimų nereikėjo.
- **P2 – M5 skaidrė 47:** Pridėtas mygtukas „Atsisiųsti šabloną (.txt)“ – atsisiunčia 8 skaidrių struktūrą, Master promptą ir pilno turinio promptą kaip vieną .txt failą. ContentSlides.tsx – slide.id === 47, Download iš lucide-react.
- **P2 – Footer auditas:** Moduliai 5, 6, 10–15 – „Toliau – skaidrė N“ naudoja 1-based indeksą; patikra atlikta, neatitikimų nerasta.
- **P2 – Mobile touch (P2):** TestResultsSlide, PracticeScenarioHubSlide, PracticeScenarioSlide – mygtukams pridėta `min-h-[44px]` arba `min-w-[44px]` ir `touch-manipulation` (Uždaryti, Patikrinti, Grįžti, Baigti ir į santrauką, scenarijų pasirinkimai, šakotos užduoties mygtukai). CharacterCard – paspaudžiamai kortelei pridėta `min-h-[44px]` ir `touch-manipulation`. Žr. MOBILE_UI_UX_AUDIT §2.6 P2.
- **Patikra:** `npm run validate:schema`, `npm run build`, `npm run test:run` – praeina (104 testai).

**2026-02-16 (Žodynėlis ir įrankiai – abecėlinė tvarka, DATA_AGENT taisyklė)**

- **Žodynėlis ir įrankiai abecėline tvarka:** GlossaryPage ir ToolsPage rodo terminus/įrankius rūšiuotus pagal lietuvišką locale (`localeCompare(…, 'lt')`): žodynėlis pagal `term`, įrankiai pagal `name`. `glossary.json` ir `tools.json` masyvai surūšiuoti atitinkamai (duomenų tiesa atitinka rodinį).
- **Taisyklė:** `.cursor/rules/data-agent-glossary-tools-order.mdc` – redaguojant glossary/tools laikytis abecėlinės tvarkos, naujus įrašus įterpti pagal abecėlę; patikros instrukcija.
- **DATA_AGENT doc:** `docs/development/DATA_AGENT_DUOMENYS_ATNAUJINIMAS.md` – §5 „Žodynėlis ir įrankiai – abecėlinė tvarka“ su nuoroda į taisyklę.
- **Patikra:** `npm run validate:schema` – OK.

**2026-02-16 (P2 tuščios body + P3 atvirkštinis collapsible auditas)**

- **P2 – M2 skaidrė 51 (tuščios body):** Keturioms sekcijoms su tuščiu `body` ir tik `copyable` pridėtas vieno sakinio body (GOLDEN_STANDARD §3.2, paprasta kalba): „Profesionalus stilius“, „Formalus apibendrinimas“, „Kompaktiškas stilius“, „Formatavimas“. Skaidrė 52 patikrinta – tuščių body nėra.
- **P3 – atvirkštinis collapsible auditas:** Naujas skriptas `scripts/audit-long-without-collapsible.mjs` – randa ilgą body be collapsible ir skirsto pagal semantiką (GOLDEN_STANDARD, CONTENT_AGENT, UI_UX_AGENT, CURRICULUM_AGENT) į **REKOMENDUOJAMA_COLLAPSIBLE** (optional/terms/vėlesnė pozicija) ir **PERZIURETI_PALIKTI_ATVERTA** (TL;DR, Daryk dabar, pirmos sekcijos). Taisyklė: **nedėti collapsible** (a) svarbiems promptams (`copyable` arba antraštė su promptas/promptai/kopijuojami), (b) praktinėms užduotims (antraštė: praktika, užduotis, patikra, daryk dabar ir pan.). npm script: `audit:long-no-collapsible`.
- **12 sekcijų pažymėtos collapsible:** Pagal audito rekomendaciją – M4 (44 Kuo tai padeda?, 54 Kaip atskirti?, 60 Išoriniai įrankiai + Duomenų paruošimas, 64 Ryšys su RAG, 67.5 Prompt injection + Gynybos principai, 67.8 CoVe, 68 Ką prisiminti), M6 (68 Prieš kurdami…), M13 (13.35 Ready prompts, 13.6 Neprivaloma ready prompts). Visoms pridėta `collapsible: true`, `collapsedByDefault: true`.
- **Patikra:** `npm run validate:schema`, `npm run audit:collapsible` – OK; `audit-long-without-collapsible` – 0 REKOMENDUOJAMA_COLLAPSIBLE po pakeitimų.

**2026-02-16 (Collapsible auditas – GOLDEN_STANDARD §3.2)**

- **P1 – collapsible pašalinimas:** 46 sekcijų su per trumpu turiniu (<180 simb. arba 1 eilutė <280 simb.) – pašalintas `collapsible: true` pagal `scripts/audit-collapsible-sections.mjs`. Moduliai: M2 (51, 52), M4 (39, 40.8, 43, 54.5, 55, 66.6), M5 (47, 515), M7 (73, 731, 733, 89, 92, 95), M13 (13.10).
- **Skaidrė 43 (Schema):** Collapsible pašalintas – pagrindinis vizualas (StrukturuotasProcesasDiagram) dabar visada matomas (ne suskleistas).
- **Patikra:** `npm run audit:collapsible` exit 0; validate-schema; build – OK.

**2026-02-16 (Lentelių auditas – antraštė skaidrei 56, BlockSlides/AdvancedBlockSlide stiliai)**

- **CONTENT_AGENT / DATA_AGENT:** Skaidrė 56 – sekcijos antraštė pakeista iš „Palyginimas“ į „Metodinis vs Agentinis promptas – palyginimas“ (savarankiška be skaidrės pavadinimo). `modules.json` atnaujintas; `npm run validate:schema` – OK.
- **UI_UX_AGENT / CODING_AGENT:** Lentelių įskaitomumas pagal UI_UX_AGENT §3.6. BlockSlides.tsx (Max tokens lentelė) ir AdvancedBlockSlide.tsx (Temperature/Reasoning lentelė) – `text-sm` → `text-base`, `p-3`/`p-2.5` → `px-4 py-3.5`, pridėta `leading-relaxed`, `align-top` langeliams, thead `align-top`. ContentSlides content-block lentelės jau buvo atnaujintos anksčiau.
- **CODE_REVIEW_AGENT:** Lint ir build – praeina. Lentelių checklist atitiktis – OK.

**2026-02-16 (QA – testų bazė, coverage, NaN ir a11y stderr pataisymai)**

- **Testų planas įgyvendintas:** P1: `src/data/__tests__/modulesLoader.test.ts` (ne-MVP, edge cases, getModulesLoadError/clearModulesLoadError); `src/utils/__tests__/questionPoolSelector.test.ts` (selectQuestions, selectQuestionsByCategory, assignToSlides). P2: QuizPage – pass/fail (≥70% / <70%), paaiškinimas po atsakymo; `ErrorBoundary.test.tsx` (fallback, retry); `useSlideNavigation.position.test.ts` (saveSlidePosition, getSavedSlidePosition); a11y smoke – ModulesPage, QuizPage; `src/test/validate-schema.integration.test.ts` (node scripts/validate-schema.mjs exit 0). P3: `App.integration.test.tsx` pervadintas į `progress.integration.test.tsx`; `docs/development/TEST_COVERAGE.md` – kas padengta, kaip paleisti, sąmoningai nepadengta.
- **CircularProgress / ModulesPage NaN:** `CircularProgress.tsx` – `safeProgress = Number.isFinite(progress) ? Math.min(100, Math.max(0, progress)) : 0`; visur naudojamas safeProgress (offset, rodmenys). `ModulesPage.tsx` – bendra pažanga: `totalModules === 0 ? 0 : (completedCount / totalModules) * 100`. Įspėjimas „Received NaN for the strokeDashoffset“ pašalintas.
- **Coverage tik src:** `vitest.config.ts` – `coverage.include: ['src/**']`; scripts, archive, config neįeina į ataskaitą – bendras % atspindėti tik aplikacijos kodą.
- **A11y testų stderr:** `src/test/setup.ts` – mock `HTMLCanvasElement.prototype.getContext('2d')` (minimalus stub su getImageData, clearRect); axe-core daugiau nekrenta į „Not implemented“ jsdom. Testai 104 praeina, stderr švarus.

**2026-02-16 (Kodo refaktoringas – fazių util, registras, ContentSlides/BlockSlides skaidymas)**

- **Etapas A (fazių logika):** `src/utils/slidePhaseConfig.ts` – `getPhaseLabel(moduleId, slideId?, slideType?)`, `buildSlideGroups(slides, moduleId)`, tipas `SlideGroup`. SOT atitiktis: MODULIO_4_SKAIDRIU_EILES, M6, MODULIO_10_SKAIDRIU_EILES, MODULIO_13_SKAIDRIU_EILES. `ModuleView.tsx` – fazių logika išskirta į utilą; pašalintos lokalios getM4Phase, getM6Phase, getM10Phase, getM13Phase, typeToPhase.
- **Etapas B (SlideContent registras):** `SlideContent.tsx` – vietoj ~40 case `switch` naudojamas `slideRegistry` (slide type → render funkcija), `SlideRenderContext`, bendras fallback ir defaultFallback. Elgesys nepakeistas; vėliau lengviau įvesti lazy load per tipą.
- **Etapas C (ContentSlides skaidymas):** `src/components/slides/types/content/ActionIntroSlide.tsx` – išskirtas ActionIntroSlide ir ActionIntroSlideProps. `ContentSlides.tsx` – import ir re-export iš `./content/ActionIntroSlide`; pašalinta ~295 eilučių vietinio kodo.
- **Etapas D (BlockSlides skaidymas):** `src/components/slides/types/block/VeiksmoIntroBlock.tsx` – bendras VeiksmoIntroBlock; `block/AdvancedBlockSlide.tsx` – AdvancedBlockSlide ir AdvancedBlockSlideProps. `BlockSlides.tsx` – import ir re-export iš `./block/`; pašalinta vietinė VeiksmoIntroBlock ir AdvancedBlockSlide (~200 eil.). Etapas E (lazy slide tipai) neįgyvendintas – optional, aukštesnė rizika.
- **Patikra:** npm run build, npm run test:run (65 testai) – praeina; lint be klaidų.

**2026-02-16 (Gili kodo analizė – schema ir optional badge)**

- **Schema (DATA_AGENT):** `modules.schema.json` – slide `properties`: `recommended` (boolean), `badgeVariant` (enum: bonus | optional); module `properties`: `unlocksAfter` (number). Dokumentuoja esamą kontraktą.
- **Optional badge (CODING_AGENT):** `ModuleView.tsx` – badge tipas („Bonusas“ / „Neprivaloma“ / „Papildoma“) nustatomas iš `slide.badgeVariant` ir `slide.optional`, ne iš hardcoded skaidrių id (51, 52, 801, 802, 66, 67, 13.35, 13.8).
- **Duomenys:** `modules.json` – skaidrėms 51, 52, 801, 802 pridėta `badgeVariant: "bonus"`; 66, 67, 13.35, 13.8 – `badgeVariant: "optional"`. `src/types/modules.ts` – `Slide` tipas papildytas `badgeVariant?: 'bonus' | 'optional'`.
- **Footer spot-check:** Moduliai 1 ir 4 – „Toliau – skaidrė X“ atitinka nuoseklų 1-based indeksą; pakeitimų nereikėjo.
- **Validacija:** validate-schema.mjs, validate-sot-index.mjs, npm run build – praeina. Žr. TEST_REPORT 2026-02-16.

**2026-02-16 (Footeriai – nuoseklūs skaidrių numeriai, Golden Standard §3.6)**

- **Principas:** Footeryje rodomas **nuoseklus skaidrės numeris modulyje** (1, 2, 3, …), ne skaidrės `id` (pvz. 40.8, 63.7). Vartotojas mato „Skaidrė 5/48“ – footeryje „Toliau – skaidrė 6: …“.
- **M4–M6:** Visi „Toliau – skaidrė X“ pakeisti į nuoseklius numerius (`modules.json` – 25 footerių).
- **M1–M3:** Pridėti footeriai pagal tą pačią logiką (M1: 16, M2: 10, M3: 8).
- **Taisyklė:** `.cursor/rules/footer-slide-numbers.mdc` – kai skaidrė perkeliama, privaloma tikrinti ir atnaujinti footerių numerius. Agent-orchestrator §7 – nuoroda į taisyklę.
- **GOLDEN_STANDARD.md §3.6:** Footerių principai (formatas, teisingi/neteisingi pavyzdžiai, procedūra po perkėlimo); §9 nuoroda; §10 checklist punktas.
- **ux_todo.md:** Skyrius „Kas padaryta 2026-02-16 (footeriai)“; A2 lentelėje principas ir nuoroda į §3.6; agentų nuorodos – Footeriai.

**2026-02-16 (Skaidrė 38 – Modulio 4 action-intro UI/UX patobulinimai)**

- **whyBenefit:** Pakeista iš „40%“ į paprastesnę formuluotę: „Po šio modulio mažiau klaidų ir haliucinacijų DI atsakymuose – jūs kontroliuosite šaltinius ir patikrinimą.“
- **outcomes:** Sumažinta iki 5 grupuotų punktų (RAG, Deep research, Tokenai ir patikrinimas, Manipuliacijos ir haliucinacijos, Projektas).
- **firstActionCTA viršuje:** Kai `hasReveal`, „Pirmas žingsnis“ blokas (firstActionCTA) rodomas hero sekcijoje lygiagrečiai su CTA mygtuku – ne tik po reveal.
- **Tools 2–3 iš karto:** Pirmi 3 įrankiai (ChatGPT, Claude, Gemini) rodomi iš karto; likę – po „Rodyti visus (6)“ paspaudimo.
- **Hero hierarchija:** heroStat mažesniu šriftu (text-base/lg), heroText didesniu (text-xl/2xl) – vizualinė hierarchija pagal GOLDEN_STANDARD.

**2026-02-15 (Low-hanging fruits – kokybės pagerinimai)**

- **LHF 4 (M9 recommended):** `modules.json` – `recommended: true` tik 4 scenarijams (101 Sentimentų analizė, 102 Duomenų valymas, 111 Finansų įžvalgos, 116 Python vizualizacijos); 104, 105 → `false`. `recommendedSlideIds` ir `recommendedStart` atnaujinti.
- **LHF 1 (M4 santrauka):** firstAction24h patobulintas – pirmas sakinys „Šiandien atidaryk DI ir užduok vieną RAG klausimą su šaltiniais.“; SOT `docs/turinio_pletra_moduliai_4_5_6.md` §4.7 sinchronizuotas.
- **LHF 2 (Kur pritaikyti? po 1 dalies):** 1 dalies santraukoje (skaidrė 38) pridėta sekcija „Kur pritaikyti?“ su 2 sakiniais (6 blokų naudojimas kasdien, Modulio 4 pagrindas).
- **LHF 3 (Sandbox pranešimas):** Modulio 1 pirmoje skaidrėje (action-intro) – `sandboxMessage`: „Tai treniruoklis – galite bandyti, klysti ir grįžti atgal.“ Tipas `ActionIntroContent.sandboxMessage`; rodymas ContentSlides.tsx (slate blokas).
- **LHF 5 (M5 thresholdExplanation):** Tekstas aiškinamas „≥70% reiškia: …“; TestPracticeSlides – blokas paryškintas accent (border-accent, bg-accent); antraštė „Ką reiškia ≥70%?“.
- **LHF 7, 6, 8:** M4 žodynėlis (id 69), M10 10.7 Žodynėlis (optional), Kampanijos tikslai 13.1 – jau įgyvendinti; patikrinta.
- **LHF 9 (Diagnostinis quiz tonas):** QuizResultsView – atsakymų paaiškinimų etiketė pakeista į „Čia stipru – “ (teisingi) ir „Pabandyk kitaip – “ (klaidingi) vietoj „Paaiškinimas:“.
- **LHF 10 (Vienas dominuojantis CTA):** GOLDEN_STANDARD.md §4.2 – pridėta taisyklė „Vienas dominuojantis CTA“ (vienos eilutės principas). UI_UX_AGENT.md – checklist papildytas kriterijumi „Vienas dominuojantis CTA“.

**2026-02-15 (Moduliai 13–14–15 – Turinio inžinerija)**

- **Turinio SOT:** `docs/turinio_pletra_moduliai_13_14_15.md` – pilnas turinys M13 (teorija: vaizdai, video, muzika), M14 (testas), M15 (praktika); 3 blokai su CopyButton promptais, žodynėlis, whyBenefit, „Kur pritaikyti?“.
- **Skaidrių eilė:** `docs/MODULIO_13_SKAIDRIU_EILES.md` – oficiali M13/M14/M15 skaidrių seka (130, 13.1–13.11, 13.35 optional, 140–142, 150–153, 158).
- **modules.json:** Moduliai 13, 14, 15 – M13 (learn): action-intro 130, skaidrės 13.1–13.11 (įsk. 13.10 Verslas ir rizikos, 13.11 Workflow), optional 13.35 (Workflow ir MASTER šablonai), glossary 13.8, summary 13.9; unlocksAfter 6; M14 (test): test-intro 140, test-section 141 (6 klausimų), test-results 142; M15 (practice): practice-intro 150, 3 practice-scenario (151–153), practice-summary 158.
- **Core metodikos integracija (M13):** SOT ir modules.json – 5 žingsnių DI vaizdų workflow, #1000Books (knygos iliustracijos pipeline), MASTER prompt šablonas + ready prompts (8 scenarijų), įrankių pozicionavimas, video workflow + .json šablonas, Veo 3; Verslas ir rizikos (13.10): KPI/A/B, Legal, QA checklist, versijavimas, Top 3 pitfalls, įspėjimas dėl procentų be šaltinio; optional skaidrė 13.35 (workflow + MASTER).
- **DI muzikos kontekstas ir promptai (M13):** SOT §5 – technologinė evoliucija (fonografas → DAW → DI), tezė „DI = demokratizacijos etapas“, žinutė „Muziką kurti gali visi“, ekosistema (tekstas/vizualai/muzika/platinimas), TOP 5 generatoriai (Suno, Boomy, Soundraw, Udio, Beatoven) su pozicionavimu, industrinės implikacijos ir rizikos, strateginė išvada (distribution + branding); MASTER muzikos promptas + ready prompts (Suno, Boomy, Soundraw, Udio, Beatoven, ChatGPT tekstams, DALL·E viršelis, video); tools.json – Boomy, Beatoven.ai; 13.6 – MASTER copyable, ready prompts blokas.
- **tools.json:** 18 įrankių moduleId 13 – kategorijos „Vaizdų generavimas“, „Video generavimas“, „Muzikos generavimas“ (DALL·E, Midjourney, Ideogram, Leonardo.ai, Canva AI, Runway, Pika, Luma, Synthesia, InVideo, Suno, Udio, Mubert, Soundraw, AIVA, ElevenLabs ir kt.).
- **sot_index.json:** contentSOT moduliai_10_12, moduliai_13_15; publicModules 10–15; unlocksAfter 10→6, 11→10, 12→11, 13→6, 14→13, 15→14; nextStepAfterModule; modules 10–15.
- **CONTENT_MODULIU_ATPAZINIMAS.md:** §6 papildytas – 13.1–13.9 = tik Modulio 13, M14 skaidrės 140–142, M15 skaidrės 150–153, 158.
- **ToolsPage:** MODULE_LABELS 10–15 (Modulis 10–15 pavadinimai).
- **validate-sot-index.mjs:** expectedModuleCount 9→15.
- **DOCUMENTATION_INDEX:** SOT lentelė – Turinys Moduliai 13–15; skyrius „Moduliai 13–15 (Turinio inžinerija)“ su MODULIO_13_SKAIDRIU_EILES.

**2026-02-15 (Skaidrė 13.10 – collapsible sekcijos)**

- **13.10 Verslas ir rizikos:** Sekcijos Legal / Risk, Verslo argumentai, QA checklist (prieš publikavimą), Versijavimas, Top 3 pitfalls (ko vengti) – collapsible pagal GOLDEN_STANDARD (optional → terms). `modules.json`: kiekvienai sekcijai pridėta `collapsible: true`, `collapsedByDefault: true`; Legal ir QA `blockVariant` nustatytas į `terms`. Renderinimas jau palaikomas `ContentSlides.tsx` (openSections, collapsibleStateCache).

**2026-02-15 (M13–15 agentų seka – planas įgyvendintas)**

- **ANALIZE_MODULIAI_13_14_15_UI_UX_USABILITY.md:** USER_JOURNEY_AGENT, CURRICULUM_AGENT – integruota kelionė, neatitikimų lentelė, agentų seka, prioritetai.
- **MODULIO_13_USER_JOURNEY_ANALIZE.md:** UX balas 72/100, Top 5 trinties taškai, micro-win vietos, 48h testas.
- **TurinioWorkflowDiagram.tsx, TurinioWorkflowBlock.tsx:** 13.11 workflow – 7 žingsnių diagrama (Brief→Prompt→Variantai→Iteracija→Adaptacija→Testavimas→Optimizacija); „Tu esi čia“, EnlargeableDiagram.
- **ModuleView getM13Phase:** Fazių juosta M13 – Įvadas | Vaizdai | Video | Muzika | Verslas | Santrauka (pagal MODULIO_13_SKAIDRIU_EILES).
- **TestResultsSlide M14:** thresholdExplanation ir useCaseBlock rodymas (142).
- **modules.json content-block schema:** 13.1–13.11 – TL;DR→Daryk dabar→Copy→Patikra; 13.3 brand consistency, įrankių nuorodos; glossary 13.8 terminai.

**2026-02-15 (M10–M12: 10.1 UI/UX pataisa pagal GOLDEN_STANDARD)**

- **Problema:** Skaidrė 10.1 turėjo **12 content-block sekcijų** vienoje skaidrėje – pažeidžiamas GOLDEN_STANDARD §3.2 (TL;DR → Daryk dabar → Copy → Patikra → Optional) ir §4.2 (vienas dominuojantis CTA).
- **Pataisa:** 10.1 sumažinta iki **3 sekcijų:** (1) Trumpai (accent), (2) Ką rasite – eilė (brand, vienas blokas su nuorodomis į 10.15, 10.2, 10.25, 10.3–10.6, 10.35, 10.65), (3) Daryk dabar (accent) – vienas CTA „Pereik prie skaidrės Agentų ciklas (10.2)“.
- **Turinys neprarastas:** Workflow/trigger/webhook/lentelė – skaidrė **10.15**. 3A – **10.25**. Zapier/Make/n8n/Power Automate ir įrankių medis – **10.35**, **10.4**. Rolė, promptai, klaidos – **10.3, 10.5, 10.6**.
- **UI atvaizdavimas:** content-block `blockVariant` (accent/brand/terms) jau įgyvendintas `ContentSlides.tsx` (eil. ~742–757); papildomo komponento kodo M10–12 neprireikė.

**2026-02-15 (Agentų inžinerija – M10–M12 duomenys)**

- **Turinio SOT:** `docs/turinio_pletra_moduliai_10_11_12.md` – §3 ReAct, §3a–3d workflow/3A/įrankiai/spec/testavimas/saugumas.
- **modules.json:** 10.2 ReAct ir „Kada naudoti“; naujos skaidrės 10.15, 10.25, 10.35; 10.4 įrankių medis matomas; 10.65 pilnas turinys; 10.8 santrauka – workflow/3A/įrankiai; M11 failedMessage su slide refs; M12 practice-intro CTA. 10.1 – lean apžvalga (3 blokai), ne 12.

**2026-02-15 (Moduliai 10–11–12 – Agentų inžinerija, pradinis)**

- **Turinio SOT:** `docs/turinio_pletra_moduliai_10_11_12.md` – pilnas turinys M10 (teorija), M11 (testas), M12 (praktika); whyBenefit, content-block skaidrės, CopyButton promptai, „Kur pritaikyti?“.
- **Skaidrių eilė:** `docs/MODULIO_10_SKAIDRIU_EILES.md` – oficiali M10/M11/M12 skaidrių seka (100, 10.1–10.8, 110–112, 120–125).
- **modules.json:** Moduliai 10, 11, 12 – M10 (learn): 8 skaidrių, unlocksAfter 6; M11 (test): test-intro, test-section (6 klausimų), test-results su useCaseBlock; M12 (practice): 4 rekomenduojami scenarijai + practice-summary; businessExamples [].
- **Agentų ciklo diagrama (M10.2):** AgentWorkflowDiagram.tsx, AgentWorkflowBlock.tsx – horizontali schema (Agentas → Planavimas → Įrankiai → Aplinka → Rezultatas + grįžtamasis ryšys); SCHEME_AGENT geometrija; „Peržiūrėti pilname dydyje“ per EnlargeableDiagram (tas pats React modale). ContentSlides: section.image.includes('agent_workflow') → AgentWorkflowBlock.
- **ModuleView:** buildSlideGroups M10 – fazės Įvadas, Kelias, Teorija, Santrauka; M11 – „Testas“, M12 – „Praktika“. getM10Phase: 10.2–10.7 = Teorija (10.15, 10.25, 10.35, 10.65 įeina).
- **TestPracticeSlides:** M11 rezultatų blokas – passedMessage, failedMessage, thresholdExplanation, useCaseBlock (heading/body, blockVariant).
- **Dokumentacija:** DOCUMENTATION_INDEX – Turinys Moduliai 10–12 SOT; CONTENT_MODULIU_ATPAZINIMAS – 10.1–10.8 taisyklė, MODULIO_10_SKAIDRIU_EILES nuoroda.

**2026-02-15 (Gili kodo analizė – planas įgyvendintas)**

- **Lietuviškų raidžių taisymai modules.json:** scenarioContext (q12), explanation (q12), scenarioContext ir options (q13) – lenteleje→lentelėje, uzsakymu→užsakymų, Rasote→Rašote, sugeneruotu→sugeneruotų, turetu→turėtų, Ieskoti→Ieškoti, parase→parašė, Parasyk→Parašyk, Prideti→Pridėti (RELEASE_QA_CHECKLIST §5).
- **modules.schema.json:** testQuestion – pridėti scenarioContext, matchPairs, correctOrder, items, isTrue, ifWrongSee; scenario – pridėti narrativeLead, branching (M9).
- **ToolsPage:** MODULE_LABELS išplėsti iki modulių 5–9 (sot_index.json atitiktis).

**2026-02-15 (Modulio 5 usability, UI ir UX analizė – planas įgyvendintas)**

- **MODULIO_5_USER_JOURNEY_ANALIZE.md:** USER_JOURNEY_AGENT (5 zonos, UX balas 72/100, Top 5, 48h testas) + UI_UX_AGENT audito lentelė M5 skaidrėms + prioritetizuotas taisymų sąrašas.
- **SOT:** `docs/turinio_pletra_moduliai_4_5_6.md` §3.1 – pridėtas „Ką tai reiškia?“ (slenksčių aiškumas), useCaseBlock blokas nurodytas kaip vizualiai paryškintas (accent).
- **modules.json (514):** `thresholdExplanation` laukas – slenksčių paaiškinimas rezultatų ekrane.
- **TestResultsSlide M5:** useCaseBlock rodomas kaip accent blokas (prieš CTA); thresholdExplanation – slate blokas „Ką tai reiškia?“; CTA mygtukas po blokų.
- **DOCUMENTATION_INDEX:** nuoroda į `docs/development/MODULIO_5_USER_JOURNEY_ANALIZE.md` (Moduliai 4–6).

### Changed

**2026-02-15 (Modulio 4 UX / User Journey – planas įgyvendintas)**

- **M4 firstActionCTA:** Jau pataisyta anksčiau – tekstas atitinka M4 (DI įrankio pasirinkimas), ne M9 (veikėjai/scenarijai). SOT §1.4 atnaujintas.
- **M4 santrauka (id 70):** Pridėta sekcija „Kur pritaikyti?“ (RAG/žinių patikrinimas, haliucinacijų mažinimas, manipuliacijų atpažinimas). SummarySlide rodo iki 4 žinių kortelių; SectionIcon – Compass ikona.
- **M4 optional žymė:** Skaidrė 61 (DI įrankiai informacijos paieškai) pavadinime pridėta „Optional:“.
- **M4 fazių grupės:** ModuleView buildSlideGroups – Moduliui 4 atskiros fazės: Įvadas, RAG, Deep research, Tokenai, Manipuliacijos, Santrauka (pagal skaidrių id diapazonus, SOT MODULIO_4_SKAIDRIU_EILES).
- **SOT:** `docs/turinio_pletra_moduliai_4_5_6.md` – 4.7 Pastaba UI: „Kur pritaikyti?“ blokas; santraukos turinys.
- **Dokumentacija:** `docs/development/MODULIO_4_USER_JOURNEY_ANALIZE.md` – USER_JOURNEY išvestis (UX balas, silpnumai, Top 5, 48h testas). Planas: `modulio_4_ux_ui_user_journey_analizė` (nekeistas).

**2026-02-15 (4.1c – Schema pašalinimas, UI/UX tobulinimai)**

- **Skaidrė 56 (4.1c):** Schema3 sekcija pašalinta; liko tik Agentinė vizualizacija (LlmArch). Trumpai: „Schema rodo“ → „Diagrama rodo“. Agentinė vizualizacija – blockVariant „brand“ (pagrindinė info).
- **LlmArchDiagramDiagram:** Kontrastas – border-gray-300, rodyklės from-gray-400, return path opacity 0.75, kampo etiketė text-gray-600, kortelių border-gray-300, kortelių tekstas text-gray-700.
- **LlmArchDiagramBlock:** Neaktyvūs tab'ai text-gray-600 (geresnis kontrastas).
- **SOT:** `docs/turinio_pletra_moduliai_4_5_6.md` – 4.1c sekcijų eilė be Schema; Vizualas – tik Agentinė vizualizacija.

### Added

**2026-02-15 (4.1c – Agentinė vizualizacija, LlmArch diagrama React integracija)**

- **LlmArchDiagramBlock, LlmArchDiagramDiagram:** Naujas vizualas skaidrėje 56 – interaktyvi diagrama su režimais (Bazinis | RAG | Tool Use). Bazinis: Input → DI → Output; RAG: su Duomenų baze, return path (punktyrinė); Tool Use: su įrankiu, return path. Projekto spalvos (brand, accent, emerald); Plus Jakarta Sans, JetBrains Mono; DI terminologija.
- **llmArchLayout.ts:** Layout SOT – nodes, edges, LLM_ARCH_MODES, LLM_ARCH_CARDS. „Peržiūrėti pilname dydyje“ – EnlargeableDiagram atidaro tą patį React modale.
- **ContentSlides:** `section.image?.includes('llm_arch')` → LlmArchDiagramBlock. modules.json – nauja sekcija „Agentinė vizualizacija“ po Schema.
- **SOT:** `docs/turinio_pletra_moduliai_4_5_6.md` – 4.1c aprašyme pridėta „Agentinė vizualizacija“, ryšys Schema3 (abstrakti) + LlmArch (vizualūs režimai).

**2026-02-15 (4.1c skaidrės tobulinimas – turinys, pedagogika, vartotojo kelionė)**

- **Skaidrė 56 (4.1c):** whyBenefit „Suprasi, kodėl DI gali atsakyti iš tavo dokumentų, ne tik iš savo žinių“; Trumpai supaprastintas; Patikra – 2 konkrečūs self-check klausimai (duomenų bazė, punktyrinė rodyklė); tiltelis į RAG.
- **schema3StepExplanations.ts:** LLM → DI visur; Control/Execution/Data sluoksniai → Pagrindinis srautas, Įrankiai, Duomenys (paprastesnė kalba).
- **Schema3InteractiveBlock:** instrukcija virš diagramos „Paspausk mazgą diagramoje arba skaičių 1–6 – paaiškinimas rodomas apačioje“.
- **SOT:** `docs/turinio_pletra_moduliai_4_5_6.md` – 4.1c Trumpai, Patikra, whyBenefit atnaujinti.

**2026-02-15 (Schema 3+4 sujungimas – viena skaidrė „DI sistema su įrankiais, RAG ir atmintimi“, 4.1c)**

- **Suvienyta skaidrė (id 56):** Dvi skaidrės (Schema 3, Schema 4) sujungtos į vieną. Pavadinimas: „DI sistema su įrankiais, RAG ir atmintimi“. Sekcijos: Trumpai (accent) → Schema (suvienyta diagrama) → Daryk dabar + copyable → Patikra (accent) → Pasirinktinai: multimodalinė įvestis ir išvestis (terms, collapsible).
- **Diagrama:** `schema3Layout.ts` – pridėta punktyrinė briauna (modelis → saugykla, pasirinktinis įrašymas). `Schema3InteractiveDiagram.tsx` – pavadinimas „DI sistema su įrankiais ir atmintimi“, etiketės „DI“, „Informacijos gavimas“, „Duomenų bazė / saugykla“. „Peržiūrėti pilname dydyje“ – `EnlargeableDiagram` atidaro tą patį React modale (`Schema3InteractiveBlock`).
- **Duomenys:** `modules.json` – skaidrė 57 pašalinta; skaidrė 56 atnaujinta (title, subtitle, sections pagal SOT).
- **SOT:** `docs/turinio_pletra_moduliai_4_5_6.md` – 4.1c ir 4.1d sujungti į vieną skyrių; CURRICULUM rekomendacija; lentelė 2.1 – viena eilutė 4.1c. `docs/MODULIO_4_SKAIDRIU_EILES.md` – viena eilutė 4.1c prieš 4.2 RAG.
- **Doc:** `docs/development/SCHEME_AGENT.md` – SOT lentelė atnaujinta (suvienyta schema; Schema 4 kaip archyvas).

**2026-02-14 (Schema 4: Multi-Modal LLM workflow – įgyvendinimas, 4.1d)**

- **Skaidrė 57 (4.1d):** SOT patikra – turinys atitinka `docs/turinio_pletra_moduliai_4_5_6.md`; `modules.json` skaidrė 57 – jau sinchronizuota, pakeitimų nereikėjo.
- **Schema 4 diagrama:** `public/schema4_multimodal.svg` – pataisytas teksto encoding: „Įvestis“, „Išvestis“ (vietoj ?vestis / I?vestis); `<title>` ir komentaruose rodyklės „→“. Vertikalios rodyklės – linijos baigiasi 8px prieš bloko viršų, kad antgalis tik liestų kraštą (SCHEME_AGENT §5 vizualinė patikra).
- **Agentų seka:** CONTENT_AGENT (SOT) → SCHEME_AGENT (SVG) → CODE_REVIEW_AGENT (schemos checklist) → DATA_AGENT (validacija) → QA_AGENT (changelog, lietuviškos).

**2026-02-14 (Q_A – 4.2a-academic: DI įrankiai – tobulinimas, audit, paprasta kalba)**

- **Skaidrė id 61 (4.2a-academic):** Perrašyta pagal Golden Standard – verslo kontekstui (ne studentams). whyBenefit „Atlik bet kokį tyrimą mažiau nei per 30 minučių!“. shortTitle „DI įrankiai informacijos paieškai“. useCases: Verslo tyrimas, Rinkos analizė, Faktų tikrinimas; Ataskaitų analizė; Citavimo tikrinimas; Sintezė, Tendencijų paieška.
- **Paprasta kalba (PAPRASTOS_KALBOS_GAIRES):** Angliški terminai pakeisti – Extract Data → duomenų ištraukimas, Reference Manager → šaltinių tvarkymas, Reference Check → šaltinio patikrinimas, Concept mapping → temų susiejimas, DOI → straipsnio nuorodą. PaperGuide: „mokslinį straipsnį“ → „ataskaitą ar tyrimą“. Tipinė eiga: „straipsnius“ → „dokumentus (ataskaitas, tyrimus)“.
- **Dubliavimo pašalinimas:** 4 atskiros „Patarimai: X“ sekcijos sujungtos į vieną collapsible „Patarimai kaip naudoti“ – įrankiai rodomi tik kortelėse (su nuorodomis), patarimai viename bloke.
- **SOT:** `docs/turinio_pletra_moduliai_4_5_6.md`, `docs/MODULIO_4_SKAIDRIU_EILES.md` – sinchronizuota.
- **UI:** ContentBlockSlide – whyBenefit accent bloke; tool links aria-label, focus:ring a11y.

**2026-02-14 (Q_A – DI detektoriai: 6 blokų promptas, Golden Standard, tools.json)**

- **AiDetectorsSlide:** TL;DR (accent), Daryk dabar (brand), kopijuojamas 6 blokų promptas „Tu esi DI turinio patikrinimo asistentas“ (CopyButton), „Kaip naudoti detektorių“ (4 žingsniai), etikos pastaba (terms). Vieta: po haliucinacijų ir manipuliacijų, prieš savitikrą 68.5.
- **di_detektoriai.html:** Golden Standard spalvos – brand (#627d98), accent (#d4a520); Plus Jakarta Sans; type badge spalvos brand/accent/slate; pavadinime AI → DI.
- **tools.json:** 5 DI detektorių įrašai, kategorija „DI turinio detektoriai“ – Winston AI, GPTZero, Isgen.ai (LT), MyDetector.ai, ZeroGPT (DATA_AGENT procedūra).
- **SOT:** `docs/turinio_pletra_moduliai_4_5_6.md` – skaidrės 201 aprašymas papildytas 6 blokų promptu ir naudojimo žingsniais; `docs/MODULIO_4_SKAIDRIU_EILES.md` – į eilę įtraukti 200 (benchmark), 201 (detektoriai), 68.5 (savitikra).

**2026-02-14 (Modulio 4 nuo 2 dalies – planas modulio_4_2_dalies_analizė_ir_tobulinimai)**

- **SOT:** `docs/turinio_pletra_moduliai_4_5_6.md` – Schema 4 CopyButton prompto aprašymas; 4.5 Manipuliacijos – statistikos gairė (60–70 % incidentų); 4.5-safety – OWASP LLM Top 10 (2024): Prompt Injection #1; 4.1a2, 4.1b – „Kodėl čia?“ max 1–2 sakiniai, collapsible gairės.
- **Duomenys:** `src/data/modules.json` – skaidrė 57 (Schema 4) – naujas copyable blokas „Parodyk man Schema 4 paaiškinimą“; skaidrė 67 (4.5 Manipuliacijos) – body papildytas skaičiais „dauguma (apie 60–70 %) DI susijusių saugumo incidentų“; skaidrė 67.5 (4.5-safety) – OWASP LLM Top 10 #1 pažeidžiamumas.
- **Santrauka (4.7):** firstAction24h jau įgyvendintas; Schema 3 (56) copyable – patvirtintas.

**2026-02-14 (Q_A – Modulio 4: atskira skaidrė Haliucinacijos 4.6a)**

- **Pradiniame plane numatyta:** SOT aprašė du atskirus blokus (Haliucinacijos, Žinių patikrinimas), bet rekomendavo vieną skaidrę; įgyvendinimas turėjo tik vieną 4.6. Atkurta atskira skaidrė Haliucinacijos.
- **SOT:** `docs/turinio_pletra_moduliai_4_5_6.md` – 2.1 lentelėje pridėta **4.6a Haliucinacijos** (atskira skaidrė), 4.6 – tik **Žinių patikrinimas**; skyrius „Žinių patikrinimas (4.6)“ – rekomendacija dviem atskiroms skaidrėms.
- **Skaidrių eilė:** `docs/MODULIO_4_SKAIDRIU_EILES.md` – 4.6a į oficialią eilę (29); 4.5 → 4.6a → 4.6.
- **Duomenys:** `src/data/modules.json` – nauja skaidrė **id 67.8 „Haliucinacijos“** (4.6a): kas yra haliucinacija, 4 patarimai, 5 taisyklės, anti-haliucinacinis šablonas, CoVe. Skaidrė **id 68** pervadinta į **„Žinių patikrinimas“** (4.6): kaip tikrinti, trikampis, Ką prisiminti. Santrauka (4.7) ir firstAction24h/ifWrongSee atnaujinti.

**2026-02-14 (Modulio 5 – USER_JOURNEY, CONTENT, UI_UX agentai)**

- **M5 User Journey analizė:** `docs/development/MODULIO_5_USER_JOURNEY_ANALIZE.md` – 5 zonos, UX balas 78/100, Top 5 patobulinimai, micro-win, energijos kritimo aprašymas, 48h deployment testas.
- **Kur pritaikyti a11y:** TestResultsSlide (M5) – „Kur pritaikyti?“ blokui pridėta `role="region"`, `aria-label="Kur pritaikyti per 24–48 val."`, antraštė išplėsta iki „Kur pritaikyti? (Pirmas veiksmas per 24–48 val.)“.
- **Collapsible a11y:** ContentSlides – collapsible mygtukams pridėta `aria-label` („Išskleisti/Suskleisti: [pavadinimas]“).

**2026-02-14 (Q_A – paprasta kalba, žargono auditas, M9 perrašymas)**

- **Žargono auditas ir planas:** `docs/development/M9_ZARGONO_AUDITAS_IR_PLANAS_PAPRASTAI_KALBAI.md` – diagnozė (kodėl M9 turėjo ROI, HR, CFO, EBITDA, NPS, SWOT, influencer ir kt. be paaiškinimo), agentų atsakomybės spraga, planas (gairės, QA vartas, turinio perrašymas).
- **Paprastos kalbos gairės:** `docs/development/PAPRASTOS_KALBOS_GAIRES.md` – principas „rašyti paprastai, paprastam žmogui“; žargono sąrašas (ROI, HR, CFO, EBITDA, NPS, SWOT, Senior, influencer, KPI, DAX, EDA, Geštaltas ir kt.) su paprastais atitikmenimis arba vieno sakinio paaiškinimais; pavyzdžiai prieš/po; atsakomybės CONTENT_AGENT, QA_AGENT.
- **QA checklist – paprasta kalba:** `docs/development/RELEASE_QA_CHECKLIST.md` – naujas §5a „Paprasta kalba / žargono patikra“ (bent vieno modulio, rekomenduojama M9, patikra pagal PAPRASTOS_KALBOS_GAIRES).

**2026-02-14 (Q_A – M9 žaidimo aprašo diagnozė, framing, changelog)**

- **Diagnozė ir dokumentacija:** `docs/development/M9_ZAIDIMO_APRASO_DIAGNOZE_IR_TAISYMAI.md` – problema (veikėjai nepaspaudžiami, dviguba logika, per daug blokų), rekomendacijos, įgyvendinti taisymai; nuoroda: M9 = Modulių 7–8 tęsinys, ne 6 blokai (M1), ne „MASTER PROMPT“ kaip pagrindinis kabliukas.
- **Turinio prasmė:** `docs/development/M9_TURINIO_PRASME_AIŠKINIMAS.md` – prasmė aiškumo, naudos, užduočių, įtraukimo, praktiškumo, pedagogikos, dalyvio naudos prasme; kodėl dabar nematau; ką pakeisti; santrauka vienu sakiniu. Framing: M9 = M7–M8 (duomenų analizės kelias), ne 6 blokai, ne MASTER PROMPT centras.

### Changed

**2026-02-14 (Modulio 5 – pašalinta dubliuojanti skaidrė 511)**

- **Šalinta skaidrė 511** „Įrankių pasirinkimas“ – įrankiai jau skaidrėje 47. Remediation nuorodos (test-results, ifWrongSee) nukreiptos į 47.
- **ModuleView:** M5 slide groups – Sprintas, Pagalba, Testas (be atskiros „Įrankiai“ grupės).
- **SOT:** `docs/turinio_pletra_moduliai_4_5_6.md` – formatas, įrankių logika (47 vienintelis šaltinis).

**2026-02-14 (Modulio 5 – CONTENT pataisymai pagal User Journey)**

- **firstActionCTA (47):** „Nukopijuok 8 skaidrių šabloną žemiau…“ – pirmas variantas (šablonas), workflow kaip alternatyva.
- **„gausite“ → „gausi“:** Skaidrė 47 – Rezultatas ir tavo kelionė (tu forma).
- **3️⃣ Kopijuojamas šablonas (510):** Body supaprastintas – „Nukopijuok šabloną žemiau…“.
- **SOT:** `docs/turinio_pletra_moduliai_4_5_6.md` §3.0 – firstActionCTA sinchronas.

**2026-02-14 (Modulio 5 įrankių logika – 6 įrankiai, dviejų fazių seka)**

- **Įrankių logika:** 1) Pirmiausia DI (ChatGPT, Claude, Gemini, Copilot) – karkasas ir turinys; 2) Paskui prezentacijų įrankiai (Gamma, SlidesAI, Canva, Prezent.ai, Visme, Beautiful.ai) – formatas. Visi 6 prezentacijų įrankiai grąžinti.
- **Tipai:** ContentBlockSection – pridėtas `presentationTools?: ContentBlockPresentationTool[]` (section-level įrankiai).
- **ContentSlides:** presentationToolsBlock naudoja `section.presentationTools ?? content.presentationTools`.
- **modules.json:** 47 – įrankių blokai (DI + prez.) vienoje skaidrėje (511 pašalinta 2026-02-14).
- **SOT:** `docs/turinio_pletra_moduliai_4_5_6.md` §3.0 – įrankių logikos aprašymas.

**2026-02-14 (Paprasta kalba – CONTENT_AGENT, orkestratorius, M9 turinys, M9 description)**

- **CONTENT_AGENT:** `docs/development/CONTENT_AGENT.md` – §3.0 „Paprasta kalba (paprastam žmogui)“ + nuoroda į PAPRASTOS_KALBOS_GAIRES; §9 nuorodos – pridėtas PAPRASTOS_KALBOS_GAIRES.
- **Orkestratorius:** `.cursor/rules/agent-orchestrator.mdc` §5 – papildytas punktas „Paprasta kalba“ (vengti žargono, rašyti paprastam žmogui, nuoroda į PAPRASTOS_KALBOS_GAIRES).
- **M9 turinys (paprasta kalba):** `src/data/modules.json` – intro useCaseBlock (NPS → klientų atsiliepimai ir apklausos), characterMeaning (HR → darbuotojų mokymų įvertinimas); hub Giedrė (CFO, HR analitika → finansų įžvalgos, mokymų naudingumo įvertinimas); skaidrės 107, 110, 111, 112, 115 – title, subtitle, scenarioTitle, scenarioDescription, taskFrame, scenario, template, instructions perrašyti be nepaaiškinto žargono (influenceriai → įtakoję žmonės; SWOT → stiprybės, silpnybės, galimybės; CFO/EBITDA → finansų įžvalgos, pagrindiniai rodikliai; HR/ROI → mokymų naudingumas; DAX/Geštaltas → Power BI formulės, dizaino principai). SOT `docs/turinio_pletra_moduliai_7_8_9.md` – §10 paprastos kalbos pastraipa, §10.1 HR → darbuotojų mokymų įvertinimas.
- **M9 description (validacija):** Modulio 9 `description` sutrumpintas iki ≤120 simbolių (schema maxLength), kad `npm run validate:schema` praeitų.

**2026-02-14 (M9 – įvado turinys, paspaudžiami veikėjai, framing)**

- **Turinys (modules.json M9):** practice-intro (id 90) – sutrumpintas storyBlock, firstActionCTA (vienas CTA), pašalintas recommendedNote; taskOneLiner, recommendedStart, useCaseBlock, learningOutcomes atnaujinti; siužeto parašas po veikėjų: „Paspausk veikėją – atsidarys jo 4 užduotys“.
- **UI – paspaudžiami veikėjai:** CharacterCard – optional `onSelect`; įvade (M9) paspaudus veikėją → navigacija į hub (id 99) su `initialLevel1` (tą veikėją). ModuleView: `onNavigateToHubWithCharacter(characterIndex)`; SlideContent, PracticeIntroSlide – prop perduodamas.
- **M9 framing:** M9 aprašymas ir auditorija be „6 blokų“ (tai M1) ir be „MASTER PROMPT“ kaip pagrindinio kabliuko (sąvoka M4). description: „Modulių 7 ir 8 (duomenų analizės kelias) tęsinys. Pritaikyk verslo analizės scenarijus savo temai.“; subtitle: „Vienas pilnas projektas (DA kelias)“; audience: „baigė Modulius 7 ir 8 … pritaikyti verslo analizės scenarijus“; businessExamples Capstone – „Modulių 7–8 tęsinys (duomenų analizės kelias)“.
- **PracticeIntroSlide (M9):** „Praktinis Pritaikymas“ pastraipa – M9 atveju: „verslo analizės scenarijus (Modulių 7–8 tęsinys, duomenų analizės kelias)“ vietoj „6 blokų sistemą“.
- **JSON pataisymai:** modules.json – firstActionCTA reikšmė, kuri buvo sulipusi su „tools“ (apie 1693), atskirta; M9 learningOutcomes – pašalinta dubliuota sugedusi eilutė.

**2026-02-14 (CONTENT_AGENT – pilna specifikacija ir Cursor taisyklė)**

- **Dokumentacija:** Naujas `docs/development/CONTENT_AGENT.md` – turinio rašytojo rolė, SOT, geriausios praktikos visoms skaidrėms (terminologija, CTA, kopijuojami promptai, whyBenefit, veiksmo skaidrės), skaidrių tipų fokusas, workflow (kūrimas, tobulinimas, santraukos), anti-patternai, agentų seka, kokybės vartai.
- **Cursor taisyklė:** Naujas `.cursor/rules/content-agent.mdc` – aktyvuojama dirbant su `turinio_pletra*.md` ir `docs/CONTENT_MODULIU_ATPAZINIMAS.md`; trumpos gairės ir nuoroda į pilną spec.
- **Orkestratorius:** `docs/development/AGENT_ORCHESTRATOR.md` – CONTENT_AGENT skyriuje pridėta nuoroda į `docs/development/CONTENT_AGENT.md`.

**2026-02-14 (Modulio 9 – viso modulio perrašymas pagal agentų seką ir geriausias praktikas)**

- **Agentų seka:** CURRICULUM_AGENT → CONTENT_AGENT → DATA_AGENT → CODING_AGENT → CODE_REVIEW_AGENT → QA_AGENT. Dokumentacija: `docs/development/M9_CURRICULUM_AGENT_REKOMENDACIJOS.md`, `docs/development/M9_AGENT_SEQUENCE_IMPLEMENTATION_VERIFICATION.md`.
- **SOT:** `docs/turinio_pletra_moduliai_7_8_9.md` §10.3, §10.4 – viena dominuojanti mintis įvade, užduoties rėmas (Užduotis / Užbaigta, kai) kiekvienam scenarijui, veikėjų prasmė vienu sakiniu, „Kur pritaikyti?“ su triggeriais; §10.4 – veikėjų kortelės įvade paspaudžiamos → hub su pasirinktu veikėju. Naujas §10.3.1 – tekstai į JSON (meaningParagraph, storyBlock, characterMeaning, firstActionCTA, useCaseBlock, taskFrame 101–116, reflectionPromptAfter, practice-summary 5 blokai).
- **Duomenys:** `modules.json` M9 – practice-intro (id 90): meaningParagraph, characterMeaning, atnaujinti storyBlock, firstActionCTA, useCaseBlock; 16 scenarijų (101–116): taskFrame { task, doneWhen }; practice-summary (id 92): introHeading, introBody, stats, tagline, nextStepCTA.
- **Tipai:** `PracticeSummaryContent` – introHeading?, introBody?, stats?, tagline?, nextStepCTA?; `TaskFrame` { task, doneWhen }.
- **UI:** PracticeIntroSlide (M9) – meaningParagraph viršuje, characterMeaning po storyBlock (su \*\* paryškinimu); PracticeScenarioSlide – taskFrame blokas (Užduotis / Užbaigta, kai); PracticeSummarySlide – introHeading, introBody, stats, nextStepCTA, tagline kai pateikti. Hub initialLevel1 jau veikė (paspaudus veikėją įvade – hub su to veikėjo 4 scenarijais).

**2026-02-14 (Modulio 5 User Journey – 5 zonų analizė ir įgyvendinimas)**

- **Analizė:** USER_JOURNEY_AGENT – 5 zonų analizė Moduliui 5 (Prezentacijos sprintas + mini testas). Dokumentacija: `docs/development/MODULIO_5_USER_JOURNEY_ANALIZE.md`. UX balas 76/100; didžiausias silpnumas – modulio įvadas ir „Kur pritaikyti?“ (M5 MUST); Top 5 patobulinimai, micro-win, energijos aprašymas, 48h testas.
- **SOT:** `docs/turinio_pletra_moduliai_4_5_6.md` – §3.0 Modulio 5 įvadas (vertė, trukmė, firstActionCTA); §3.1 test-intro micro-win frazė ir rezultatų ekrano „Kur pritaikyti?“ / „Pirmas veiksmas per 24–48 val.“ blokas.
- **Duomenys:** `src/data/modules.json` M5 – skaidrė 47 content: duration, firstActionCTA; skaidrė 512 (test-intro) content: introTitle, introBody, microWinPhrase, thresholdsText, ctaLabel; skaidrė 514 (test-results) content: passedTitle, passedMessage, useCaseBlock, passedCtaLabel, failedTitle, failedMessage, failedCtaRetry, failedCtaReview.
- **UI:** TestIntroSlide (M5) – content-driven iš slide.content su fallback; TestResultsSlide (M5) – content-driven, „Kur pritaikyti?“ blokas kai passed ir useCaseBlock; ContentBlockSlide – skaidrė 47 rodo duration ir firstActionCTA (hero). Tipai: ContentBlockContent.duration?, firstActionCTA?.

**2026-02-14 (Modulio 4 User Journey – 5 zonų analizė ir įgyvendinimas)**

- **Analizė:** USER_JOURNEY_AGENT – 5 zonų analizė Moduliui 4 (onboarding, trintis, energija, navigacija, rezultatas). Dokumentacija: `docs/development/MODULIO_4_USER_JOURNEY_ANALIZE.md`. UX balas 72/100; didžiausias silpnumas – progreso rodymas ir „pirmas veiksmas per 24–48 val.“; Top 5 patobulinimai, micro-win, energijos aprašymas, 48h testas.
- **SOT:** `docs/turinio_pletra_moduliai_4_5_6.md` – Modulio 4 action-intro: audience, firstActionCTA; santrauka 4.7: blokas „Pirmas veiksmas per 24–48 val.“ (1–2 sakiniai).
- **Duomenys:** `src/data/modules.json` – Modulio 4 intro (id 38): audience, firstActionCTA, duration; santrauka (id 70): firstAction24h.
- **UI:** ActionIntroSlide – rodoma trukmė, auditorija, pirmas žingsnis (kai pateikta). SummarySlide – naujas blokas „Pirmas veiksmas per 24–48 val.“ kai firstAction24h pateikta. Modulio 4 progresas jau rodomas kaip „Skaidrė X/Y“ (ModuleView).
- **Tipai:** `ActionIntroContent.audience?`, `ActionIntroContent.firstActionCTA?`; `SummaryContent.firstAction24h?`.

**2026-02-14 (Modulio 9 User Journey – 4 rekomenduojami, intro, sample output)**

- **Analizė:** USER_JOURNEY_AGENT – 5 zonų analizė (15 kritinių klausimų). Dokumentacija: `docs/development/MODULIO_9_USER_JOURNEY_ANALIZE.md`. UX balas 62/100; didžiausias silpnumas – pasirinkimo paralyžius (16 scenarijų be prioriteto); Top 5 patobulinimai, micro-win, energijos aprašymas, 48h testas.
- **SOT:** `docs/turinio_pletra_moduliai_7_8_9.md` §10.2.1, §10.3 – 4 rekomenduojami scenarijai (101, 102, 105, 104); sample output (MASTER PROMPT pavyzdys) summary; „Kur pritaikyti?“ intro; 48h CTA summary; intro duration, audience, recommendedStart.
- **Duomenys:** `modules.json` M9 – intro (id 90) content: duration, audience, recommendedStart, useCaseBlock, recommendedSlideIds [101, 102, 105, 104]; skaidrės 101, 102, 105, 104 – recommended: true; practice-summary (92) – nauja sekcija „Pavyzdinis rezultatas (MASTER PROMPT)“ ir 48h CTA.
- **UI:** PracticeIntroSlide (M9) – trukmė, auditorija, „Rekomenduojami pradedantiesiems“ blokas, „Kur pritaikyti?“ blokas; scenarijų kortelės – badge „Rekomenduojama“ ir vizualinis paryškinimas (ring) 4 rekomenduojamų scenarijų.
- **Tipai:** `Slide.recommended?: boolean`; `getPracticeIntroContent` – useCaseBlock, recommendedSlideIds.

**2026-02-14 (Modulio 9 role-quest W1 W2 – šakotas scenarijus, „atlikta“ + feedback)**

- **W1 – Šakotas scenarijus:** Skaidrė 105 (4 analizės tipai) – optional `scenario.branching`: `question` ir `choices[]` (label, consequence). UI: pirmiausia rodomi 3 pasirinkimai (Aprašomoji, Diagnostinė, Nuspėjamoji); pasirinkus – pasekmės blokas ir toliau scenarijaus aprašymas + užduotis. Tipai: `ScenarioBranching`, `ScenarioBranchingChoice`.
- **W2 – „Pažymėjau kaip atliktą“ + feedback:** `PracticalTask.allowMarkWithoutAnswer`, `PracticalTask.feedbackPrompt`. Kai `allowMarkWithoutAnswer` – rodomas mygtukas „Pažymėjau kaip atliktą“ (užduotį galima uždaryti be teksto). Po atliktos užduoties, kai yra `feedbackPrompt` – rodoma sekcija „Ką gavai iš DI?“ su kopijuojamu promptu. Skaidrės 101 ir 105 – practicalTask papildytas šiais laukais.

**2026-02-14 (Modulio 9 role-quest SHOULD – S1 S2 S3)**

- **SOT:** `docs/turinio_pletra_moduliai_7_8_9.md` §10.4 – bendro siužeto blokas įvade (`content.storyBlock`), naratyvinis sakinys per scenarijų (`scenario.narrativeLead` 16 skaidrėms), refleksija po scenarijaus (`content.reflectionPromptAfter`). Lentelė 101–116 → narrativeLead tekstai.
- **Duomenys:** `modules.json` M9 – practice-intro (id 90) `content.storyBlock`; skaidrės 101–116 – kiekvienoje `scenario.narrativeLead` ir `content.reflectionPromptAfter` (vienas kopijuojamas refleksijos promptas).
- **Tipai:** `Scenario.narrativeLead?: string`; `getPracticeIntroContent` + `storyBlock?: string`.
- **UI:** PracticeIntroSlide – kai `moduleId === 9` ir `introContent.storyBlock`, rodomas „Bendras siužetas“ blokas. PracticeScenarioSlide – `narrativeLead` virš „Scenarijaus aprašymo“ (italic, border-l); po užduoties – „Trumpa refleksija“ sekcija su CopyButton.
- **Doc:** `docs/development/AGENT_SEQUENCE_M9_ROLE_QUEST_SHOULD.md` – agentų seka ir veiksmų planas; MUST_SHOULD_WANT – S1–S3 pažymėti įgyvendinta.

**2026-02-14 (Modulio 9 mini role-quest – 4 veikėjai ir asmens kortelės)**

- **SOT:** `docs/turinio_pletra_moduliai_7_8_9.md` §10.4 – 4 veikėjai (Jūratė, Martynas, Giedrė, Lukas) su vardu, amžiumi, profesija, patirtimi, hobiu; bendras siužetas (komanda „Duomenų kelias“, Q1 projektas); priskyrimas skaidrės 101–116 → characterId 1–4. PNG: `public/characters/veikejas-1.png` … `veikejas-4.png` (vartotojas įkels atskirai).
- **Duomenys:** `src/data/m9Characters.json` – 4 įrašai (id, name, age, profession, experience, hobby, imagePath). `modules.json` M9 skaidrėse 101–116 – laukas `characterId` (1–4). Schema: `scripts/schemas/modules.schema.json` – optional `characterId` skaidrėms.
- **Tipai:** `src/types/modules.ts` – `Slide.characterId?: number`, `M9Character` interfeisas.
- **UI:** `CharacterCard` komponentas (`src/components/slides/shared/CharacterCard.tsx`) – asmens kortelė su nuotrauka (fallback be paveikslėlio jei PNG nėra), vardas, amžius, profesija, patirtis, hobis; a11y (aria-label, alt). `PracticeScenarioSlide` – optional prop `character`; kai nustatytas, viršuje rodoma `CharacterCard`. `SlideContent` – M9 practice-scenario atveju įkrauna `m9Characters.json`, pagal `slide.characterId` perduoda atitinkamą veikėją į `PracticeScenarioSlide`.

**2026-02-14 (Modulio 9 low-hanging fruits – santrauka ir refleksija)**

- **M9 santraukoje „X iš 16“:** `PracticeSummarySlide` priima `completedScenarioCount` ir `totalScenarioCount`; `SlideContent` M9 atveju perduoda `progress.completedTasks[9]?.length` ir 16 – rodoma „Užbaigta X iš 16 scenarijų“.
- **Practice-summary sections:** `PracticeSummaryContent` palaiko `sections` (heading, body, blockVariant); M9 summary atvaizduojamas per sections vietoj learnedItems/nextStepsItems.
- **Refleksijos blokas:** SOT §10.3 – refleksijos blokas (kopijuojamas promptas + 3 klausimai). `modules.json` M9 practice-summary – trečia sekcija „Refleksija“, `content.reflectionPrompt`; `PracticeSummarySlide` rodo refleksijos promptą su `ReflectionCopyButton`.

**2026-02-14 (Modulio 9: 4×4 scenarijų pasirinkimai – 16 pabaigų)**

- **SOT:** `docs/turinio_pletra_moduliai_7_8_9.md` – §10.2.1 „4×4 scenarijų medis“: 4 pirmos kryptys (Sentimentai ir duomenų valdymas, 4 analizės tipai ir rizikos, Verslo taikymas, Vizualizacija ir istorija), po 4 antro lygio scenarijus, susiejimas su skaidrėmis id 101–116.
- **Duomenys:** `src/data/modules.json` M9 – nauja skaidrė `practice-scenario-hub` (id 99) su `level1Choices` ir `level2Choices`; 16 skaidrių `practice-scenario` (id 101–116) pagal SOT scenarijus 1–16 (sentimentai, valymas, metaduomenys, pilnas workflow, 4 tipai, rizikos, social media, kombinuotas, duomenų kūrimas, konkurentai, CFO, HR, vizualizacijos tipas, istorija, Power BI, Python).
- **Tipai ir schema:** `src/types/modules.ts` – `SlideType` + `'practice-scenario-hub'`; `PracticeScenarioHubContent`, `PracticeScenarioHubChoiceLevel1`, `PracticeScenarioHubChoiceLevel2`. `scripts/schemas/modules.schema.json` – enum ir `practiceScenarioHubContent` validacija.
- **UI:** `PracticeScenarioHubSlide` – 4 kortelės 1 lygyje, pasirinkus – 4 kortelės 2 lygyje; navigacija pagal `targetSlideId`; mygtukas „Grįžti prie pasirinkimo“. `SlideContent` – case `practice-scenario-hub`; `ModuleView` – `onNavigateToSlideById`, etiketė „Pasirinkite scenarijų (4×4)“, `onGoToSummary` M9. PracticeIntroSlide – 16 scenarijų atveju rodoma „16 scenarijų (4×4)“ ir 4 stulpelių tinklelis.
- **Progresas:** `completedTasks[9]` – užbaigtų scenarijų id (101–116); „X iš 16 scenarijų užbaigta“.

**2026-02-14 (Modulio 6 User Journey – MVP 15 klausimų įgyvendinimas)**

- **Analizė:** Gili Modulio 6 User Journey analizė pagal 15 kritinių klausimų (onboarding, kognityvinė trintis, įsitraukimas, navigacija, rezultatas). Planas: `modulio_6_user_journey_analizė_80130a41.plan.md`; dokumentacija: `docs/development/MODULIO_6_USER_JOURNEY_ANALIZE.md`.
- **SOT:** `docs/turinio_pletra_moduliai_4_5_6.md` §4 – auditorija, trukmė įvade, pirmas veiksmas (CTA), rekomenduojama skaidrių eilė (61 pirmas, 66/67 optional); žingsnių „Kada toliau:“; temos pavyzdžiai ir šaltinio šablonas; Refleksija prieš Duomenų tvarkymą; „Modulio rezultatas“ ir „24–48 val.“ CTA. Terminologija: Kokybė (ne Kokybe).
- **Duomenys:** `src/data/modules.json` M6 – skaidrių eilė 60→61→62→67.8→68→63→65→64, 66–67 optional; intro content: duration, audience, firstActionCTA, recommendedStart; scenarijus 61: recommendedTopics, whenToProceed prie žingsnių; Refleksija (65) ir Duomenų tvarkymas (64) papildyti CTA sekcijomis.
- **UI:** PracticeIntroSlide (M6) – trukmė, auditorija, rekomenduojama pradžia, CTA „Pirmas žingsnis“, progresas „X iš Y scenarijų užbaigta“; Savęs vertinimo kortelė ir Projekto etapai – collapsible (details/summary). PracticalTask – žingsnio breadcrumb (X/N), whenToProceed rodymas. Tipas InstructionStep: whenToProceed optional.

**2026-02-14 (Modulio 9: 8 žingsnių workflow, pagalbiniai promptai, dashboard snippet)**

- **SOT:** `docs/turinio_pletra_moduliai_7_8_9.md` – naujas §10.0 Modulio 9 workflow (duomenų valdymo ciklas): 8 žingsnių lentelė ir 8 CopyButton promptai (surinkimas, metodika, deep research 4 įrankiams, valymas, integracija, atvaizdavimas sandbox, .html dashboard). Nuorodos į `m9_workflow.svg` ir `m9_dashboard_snippet.html`.
- **Duomenys:** `src/data/modules.json` – Moduliui 9 pridėtos 2 skaidrės: id 93 (workflow schema, content-block su workflowImages), id 94 (Pagalbiniai promptai – 8 sekcijų su copyable). practice-intro recommendedNote papildytas „pilnas workflow (8 žingsnių ciklas)“.
- **Schema:** `public/m9_workflow.svg` – 8 žingsnių workflow diagrama (surinkimas → metodika → deep research → 4× research → valymas → integracija → atvaizdavimas → dashboard).
- **Dashboard pavyzdys:** `public/m9_dashboard_snippet.html` – minimalus veikiantis .html: antraštė, 3 KPI blokai, Chart.js linijinė diagrama; komentaras „Modulio 9 pavyzdys – galite pakeisti duomenis ir spalvas“.
- **Atpažinimas:** `docs/CONTENT_MODULIU_ATPAZINIMAS.md` – Modulio 9 eilutė papildyta aprašu apie 8 žingsnių ciklą, workflow schema ir dashboard snippet.

**2026-02-14 (DI paradoksas – interaktyvus infografikas, skaidrė 725)**

- **Skaidrė 725:** Pilna interaktyvi infografika – hero stats (95 %, >40 mlrd$, 5 %) su hover tooltip (paaiškinimas ir tendencija), 4 paradokso kortelės (FAKTAS 01–04), „Šešėlinis DI“ bar chart, pilotų piltuvas, kur vertė, 4 žingsnių sprendimas, 3 veiksmai, išvada.
- **Interaktyvumas:** Užvedus ant skaičiaus – tooltip su paaiškinimu ir tendencija (StatWithTooltip); a11y: aria-label, cursor-help, tabIndex.
- **Tipas:** `DiParadoxInfographicContent` (variant `di-paradox`); route: infographic + content.variant → DiParadoxInfographicSlide.
- **SOT:** `docs/turinio_pletra_moduliai_7_8_9.md` – implementacijos aprašas atnaujintas.
- **Agentų seka:** CONTENT → DATA → CODING → UI_UX → CODE_REVIEW → QA.

**2026-02-14 (Modulio 7 veiksmo kompozicija – P3 skaidrės 85, 86, 90, 91, 94)**

- **P3:** Bent 1️⃣ Kam tai?, 2️⃣ Ką daryti, 3️⃣ copyable, 4️⃣ Patikra – 5 skaidrėms (mažesnė apimtis).
- **85 Duomenų ryšių analizė:** 1️⃣–4️⃣ (ryšiai, dubliavimas, butelio kakliukai, KPI). Copyable: „išvestum“ → „išvesti“.
- **86 Vizualizacijų generavimas:** 1️⃣–4️⃣ (4 outputai: tendencijos, segmentai, pelningumas, įžvalgos).
- **90 EDA praktiškai:** 1️⃣–4️⃣; 4 copyable 3a–3d (statistika, koreliacija, anomalijos, hipotezės).
- **91 Lentelių kūrimo metodika:** 1️⃣–4️⃣ (Tikslas→Stulpeliai→Pavyzdžiai→Validacija).
- **94 DI agentų koncepcija:** 1️⃣–4️⃣; 3 copyable 3a–3c (Data Research, EDA, Insight).
- **Planas:** P3 pažymėtas įgyvendintu. Validacija: modules.json OK.

**2026-02-14 (Modulio 7 veiksmo kompozicija – P2 skaidrės 73, 89, 732, 733, 891, 95)**

- **P2:** Tas pats 5-bloko modelis (1️⃣ Kam tai? → 2️⃣ Ką daryti → 3️⃣ Kopijuojamas promptas → 4️⃣ Patikra → 🔽 optional) pritaikytas 6 skaidrėms.
- **73 Pipeline:** 1️⃣–4️⃣ + 🔽 (pipeline schema collapsible); 5 copyable grupuoti 3a–3e.
- **89 5 žingsnių algoritmas:** 1️⃣–4️⃣ + 🔽; 5 copyable 3a–3e.
- **732 Sentimentų analizė:** 1️⃣–4️⃣ (be 🔽); verslo vertė + 5 punktų Patikra.
- **733 Verslo šablonai:** 1️⃣–4️⃣ + 🔽; 3 copyable 3a–3c.
- **891 Duomenų paruošimas:** 1️⃣–4️⃣ + 🔽 (checklist + metaduomenys 3 tipai collapsible).
- **95 DI įvesties (nuotrauka ir schema):** 1️⃣–4️⃣ + 🔽 (schema image collapsible); 2 copyable 3a–3b.
- **Planas:** `MODULIO_7_VEIKSMO_KOMPOZICIJOS_IGYVENDINIMO_PLANAS.md` – P2 pažymėtas įgyvendintu.
- **Validacija:** modules.json – validate-schema OK.

**2026-02-14 (Modulio 7 veiksmo kompozicija – P1 skaidrės 74, 731, 92, 97)**

- **Golden standard:** Pagal `docs/development/MODULIO_7_VEIKSMO_KOMPOZICIJOS_ANALIZE.md` – 5 blokų modelis (1️⃣ Kam tai? → 2️⃣ Ką daryti → 3️⃣ Kopijuojamas promptas → 4️⃣ Patikra → 🔽 Nori suprasti detaliau?).
- **74 MASTER PROMPTAS:** Pridėti 1️⃣ Kam tai?, 2️⃣ Ką daryti, 4️⃣ Patikra (ar pakeitei [X], ar 8 blokai?), 🔽 8 žingsnių priminimas (collapsible).
- **731 4 analizės tipai:** Pridėti 1️⃣ Kam tai?, 2️⃣ Ką daryti, 4️⃣ Patikra; 4 copyable grupuoti po 3a–3d; 🔽 „Kur panaudosi?“ (collapsible).
- **92 BI schema:** Pridėti 1️⃣ Kam tai?, 2️⃣ Ką daryti, 4️⃣ Patikra; 🔽 schema vaizdas + paaiškinimas (collapsible).
- **97 Deming:** Perstruktūruota į 1️⃣ Kam tai?, 2️⃣ Ką daryti, 3️⃣ copyable vadovybei, 4️⃣ Patikra, 🔽 Kontekstas: Lietuva + citata (collapsible).
- **Planas:** `docs/development/MODULIO_7_VEIKSMO_KOMPOZICIJOS_IGYVENDINIMO_PLANAS.md` – agentų seka (CONTENT → DATA → CODE_REVIEW → QA), P2/P3 eilė.
- **Validacija:** modules.json – validate-schema OK.

**2026-02-14 (M7 skaidrė 71 – interaktyvumas: promptas + įrankiai, kaip M4)**

- **Interakcija:** Skaidrė 71 papildyta dviem sekcijomis pagal interaktyvumo ir intuityvaus mokymo reikalavimus (INTERAKTYVUS_INTUITYVUS_MOKYMAS, DUOMENU_ANALIZES_GERIAUSIOS_PRAKTIKOS). M4 turi promptą + įrankius; M7 anksčiau – tik tekstas.
- **„Daryk dabar: pirmas analitiko promptas“** – copyable promptas (META verslo analitikas + INPUT šaltiniai + OUTPUT), accent blokas; micro-veiksmas „nukopijuok ir išbandyk“.
- **„DI įrankiai (duomenų analizei)“** – collapsible sekcija (sutraukiama pagal nutylėjimą) su įrankių sąrašu (ChatGPT, Claude, Gemini, Copilot, DeepSeek) ir naudojimo kontekstu duomenų analizei.
- **Dokumentacija:** `docs/development/MODULIO_7_SKAIDRES_71_ATVAIZDAVIMO_ANALIZE.md` – skyrius 8 (M4 vs M7 spraga ir pataisa).

**2026-02-14 (M7 skaidrė 71 – ne mokyklos tonas, UI/UX atitiktis)**

- **Turinio refreimavimas:** Skaidrė 71 – title „Įvadas į Duomenų analizės kelią“ → **„Duomenų analizės kelias – ką čia rasite“**; subtitle be „Kas bus mokoma“ → **„Ryšys su 6 blokais ir Moduliu 4 (RAG); fokusas – analizės užklausos ir išvados“**; pirmos sekcijos heading „Kas bus modulyje“ → **„Ką čia rasite“**. Projekto principas: ne mokykla/akademija – orientacija į rezultatą ir kontekstą.
- **SOT:** `docs/turinio_pletra_moduliai_7_8_9.md` §8.1 – 7.1 eilutė atnaujinta (kelio apžvalga, fokusas).
- **Duomenys:** `src/data/modules.json` – slide 71 atnaujintas; validate:schema – OK.
- **Dokumentacija:** `docs/development/MODULIO_7_SKAIDRES_71_ANALIZE_IR_PLANAS.md` – skyrius 7 „Ne mokyklos“ tono pataisos; aprašymas suderintas su dabartine būkle. `docs/MODULIO_7_SKAIDRIU_EILES.md` – 7.1 eilutė atnaujinta.
- **UI/UX:** Accent blokas „Kur pritaikyti?“ patikrintas – atitinka UI_UX_AGENT (border-l-4 border-accent-500, bg-accent-50 dark:bg-accent-900/20).

**2026-02-14 (Low hanging fruits – 6 CopyButton pildymai M7)**

- **73 Pipeline:** 5 copyable operacinei lentelėi (rinkimas, paruošimas, EDA, vizualizacija, publikavimas).
- **77 Duomenų tipai:** 8 copyable – 5 tipai (kiekybiniai, kokybiniai, struktūruoti, nestruktūruoti, pusiau) + 3 rinkimo būdai (pirminiai, antriniai, automatiniai).
- **Nauja skaidrė 733:** „Verslo analizės šablonai“ – Duomenų kūrimas, Konkurentai, CFO (3 CopyButton iš M9).
- **94 DI agentai:** 3 CopyButton – Data Research, EDA, Insight.
- **92 BI schema:** Pridėtas copyable – BI plano promptas.
- **103 Vizualizacija:** Sulyginta su SOT – pilnesni ROLE/TASK/CONTEXT/OUTPUT promptai.

**2026-02-14 (Duomenų analizės turinio grąžinimas M7 – planas įgyvendintas)**

- **Problema:** M8 teste tikrinami konceptai (sentimentų analizė, 4 analizės tipai, valymo checklist, promptų sekos), kurie nebuvo mokomi M7.
- **SOT:** `docs/turinio_pletra_moduliai_7_8_9.md` – pridėtos temos 7.4a (4 analizės tipai), 7.4b (Sentimentų analizė), 7.16a (Valymas ir metaduomenys), 7.16b (Promptų sekos).
- **Skaidrių eilė:** `docs/MODULIO_7_SKAIDRIU_EILES.md` – įtraukti 731, 732, 891, 892 su motyvacija.
- **modules.json:** 4 naujos skaidrės – 731 (4 analizės tipai, 4 CopyButton), 732 (Sentimentų analizė – 5 punktų OUTPUT), 891 (Valymo checklist + metaduomenys 3 tipai), 892 (Promptų sekos workflow).
- **M8 relatedSlideId:** m8-q4→732, m8-q5→731, m8-q7→891, m8-q8→892 – remediation į tinkamas mokomas skaidres.
- validate:schema – OK.

**2026-02-13 (QA_AGENT: Modulio 7 killer intro – kelionės pasirinkimo skaidrė)**

- **Naujas skaidrės tipas `action-intro-journey`:** Modulio 7 pirmoji skaidrė (id 70) – vartotojas pasirenka kelionę (personalinį fokusą). Hero blokas (whyBenefit, heroStat, heroText, heroSubText) + 6 pasirinkimų kortelės: Pardavimai (Duomenų analitikas), Rinkodara (Vaizdas, video, garsas), IT ir inžinerija (DI Agentų inžinieriai), Personalas (HR), Vadovai ir specialistai (Vadyba), Kita sritis (bendras kelias). Po pasirinkimo – patvirtinimo tekstas ir mygtukas „Pradėti kelionę“; „Toliau“ atsiranda tik po užduoties užbaigimo.
- **Tipai:** `src/types/modules.ts` – `JourneyChoice`, `ActionIntroJourneyContent`; `SlideType` ir `SlideContent` papildyti `action-intro-journey`.
- **Komponentas:** `ContentSlides.tsx` – `ActionIntroJourneySlide` (hero, 6 kortelių su Lucide ikonų žemėlapiu, patvirtinimas, CTA). Eksportai: `AllSlides.tsx`, `slides/types/index.ts`.
- **Virtuvė:** `SlideContent.tsx` – case `action-intro-journey`, `onJourneyComplete` → `handleTaskComplete(slide.id)`. `useSlideNavigation.ts` – `hasIncompletePracticalTask` apima `action-intro-journey` (blokuoja „Toliau“ kol nepasirinkta kelionė). `ModuleView.tsx` – `typeToPhase['action-intro-journey'] = 'Kelionė'`.
- **Duomenys:** `modules.json` – skaidrė 70 pakeista į `action-intro-journey` su `journeyChoices` (6 variantai), `confirmMessage`, `ctaContinue`. `scripts/schemas/modules.schema.json` – enum papildytas `action-intro-journey`.
- Build ir validate:schema – OK. QA_AGENT.

**2026-02-13 (QA_AGENT: Modulio 7 schemų atvaizdavimas – pipeline, BI schema, ER pavyzdys, EnlargeableImage)**

- **da_pipeline_6.svg:** Pataisytos lietuviškos raidės (Duomenų, žingsniai, Paruošimas, analizė, Ką, Prognozės, Sprendimų priėmimas, Iš kur); „raw → insight → decision“; numeracija 1.–6.
- **ContentSlides.tsx:** Generic `section.image` atvejis (content-block su schema/diagrama) naudoja **EnlargeableImage** vietoj `<img>` – vienodas „Išdidinti“ UX su kitomis skaidrėmis; palikta figcaption ir nuoroda „Peržiūrėti pilname dydyje“.
- **BI schema (skaidrė 92):** Naujas vizualas `public/da_bi_schema_4.svg` – 4 žingsniai horizontaliai (Surink → Analizuok → Ataskaita → Prognozė); `modules.json` – skaidrei 92 pridėta `image` ir `imageAlt`.
- **Schema paaiškinimo skaidrė (96):** Naujas ER pavyzdys `public/da_schema_entity_example.svg` (Klientas, Užsakymas, Produktas, ryšiai 1–N); `modules.json` – skaidrei 96 pridėta `image` ir `imageAlt`.
- **Planas įgyvendintas:** A (da_pipeline lietuviškos raidės), D (EnlargeableImage), B (BI schema), C (ER vizualas). Build ir validate:schema – OK.
- QA_AGENT.

**2026-02-13 (Modulio 7 planas – gap analizė, santrauka, CopyButton, veiksmo modelis, QA)**

- **Gap analizė:** `docs/development/MODULIO_7_GAP_ANALIZE.md` – SOT vs JSON atitikmuo, trūkstami CopyButton (88, 89, 90, 93, 103), santraukos 5 blokų patikrinimas.
- **Santrauka (id 75):** 5 blokų modelis – introBody pradžia „Sveikiname!“, refleksijos promptas pagal 3-klausimų šabloną (ką pritaikysi, kas naujausia, ką išbandysi) + 1 patarimas.
- **CopyButton/copyable:** Skaidrės 88 (3 šablonai – prekės ženklas, lojalumas, pardavimai), 89 (5 žingsnių algoritmas – 5 copyable), 90 (EDA – 4 copyable), 93 (rinkos tendencijos), 103 (4 vizualizacijos promptai).
- **Veiksmo skaidrių modelis (pilotas):** Skaidrės 83 (Rolės aktyvavimas) ir 84 (DB struktūra) – struktūra: Trumpai → Daryk dabar → Kopijuojamas promptas → Patikra (4 klausimai + „Jei bent 2 ne – grįžk prie prompto“).
- **UI/UX auditas:** `docs/development/MODULIO_7_UI_UX_AUDITAS.md` – Must atitiktis (a11y, touch targets, dark mode, 2–3 spalvos, vienas CTA); papildomų M7 pakeitimų nereikia.
- **QA:** CONTENT_MODULIU_ATPAZINIMAS jau apima 7.1–7.35; lietuviškos raidės naujuose tekstuose patikrintos.

**2026-02-13 (Moduliai 7–9 – Duomenų analizės kelias)**

- **Turinys (SOT):** `docs/turinio_pletra_moduliai_7_8_9.md` – §1.4 whyBenefit (M7, M8, M9 pirmos skaidrės); aiškus nuorodas į 4.2/4.6 pirmose M7 skaidrėse.
- **Skaidrių eilė:** `docs/MODULIO_7_SKAIDRIU_EILES.md` – oficiali Modulio 7 skaidrių seka su sujungtomis skaidrėmis (7.3+7.4, 7.6+7.7, 7.28+7.29).
- **Diagramos:** `public/da_pipeline_6.svg` (6 žingsnių pipeline), `public/da_bi_schema_4.svg` (BI schema: Surink→Analizuok→Ataskaita→Prognozė).
- **Duomenys:** `src/data/modules.json` – Moduliai 7, 8, 9: M7 (learn) – action-intro, content-block, summary, 6 skaidrės; M8 (test) – test-intro, test-section su 3 klausimais, test-results; M9 (practice) – practice-intro, practice-scenario (MASTER PROMPT projektas), practice-summary. `unlocksAfter`: 7→6, 8→7, 9→8.
- **Tipai:** `ModuleIcon` – BarChart3, ClipboardCheck, Rocket; `Module` – optional `unlocksAfter`. `ModulesPage` – ikonos M7/M8/M9.
- **ModuleView:** practiceScenarioSlides ir practiceSummarySlideIndex skaičiuojami bet kuriam moduliui su practice-scenario (M3, M9); onViewPart1Summary palaiko M9.
- **Atpažinimas:** `docs/CONTENT_MODULIU_ATPAZINIMAS.md` – 7.1–7.35 = tik Modulio 7; nuoroda į MODULIO_7_SKAIDRIU_EILES.md.
- **SOT indeksas:** `docs/development/context-engineering/sot_index.json` – contentSOT moduliai_7_9; publicModules 7,8,9; unlocksAfter ir nextStepAfterModule; modules 7,8,9.
- Planas: 07_08_09 turinio plėtra (pedagogika, MUST-SHOULD-WANT, agentai).

**2026-02-13 (M7 pilna skaidrių seka, M8 klausimų pool, SOT validacija)**

- **M7 skaidrės:** `src/data/modules.json` – pilna seka pagal `docs/MODULIO_7_SKAIDRIU_EILES.md`: po 73 (pipeline) pridėtos 76–79 (Verslo duomenų išplėtimas, Duomenų tipai ir rinkimo strategija, Kaip DI keičia analizę, Ką DI gali), 83–98 (Rolės aktyvavimas, DB struktūra, Ryšių analizė, Vizualizacijos, Prognozė, Tyrimų sistema, 5 žingsnių algoritmas, EDA, Lentelių metodika, Tikslinė paieška, Rinkos tendencijos, DI agentai, Screenshot, Schema, Deming, Silpnosios vietos), po 74–75 (MASTER PROMPT, santrauka) – 100–106 (Vizualizacija ir ciklas, Psichologija, Geštalto principai, Sustiprinti promptai, Duomenys→Istorija, Dashboard pavyzdžiai, DI pagalba + super promptas + alternatyvos). SOT: `turinio_pletra_moduliai_7_8_9.md`.
- **M8 klausimų pool:** Modulio 8 test-section – pridėti 5 klausimai (m8-q4–m8-q8): 3 scenarijų tipo (sentimentų analizės OUTPUT, 4 analizės tipai, duomenų valymo checklist) ir 2 MCQ (Geštalto principas Artumas, promptų sekos workflow). Visi su `category` (output, analysis_types, visualization, data_quality, workflow) ir `relatedSlideId` (remediation į M7 skaidres). Iš viso 8 klausimai.
- **Validacija:** `scripts/validate-sot-index.mjs` – priimami 6–9 moduliai (ne tik 6); išvesties pranešime rodomas modulių skaičius.
- **ROADMAP:** § Vėlesni žingsniai – M7 skaidrių ir M8 klausimų pool statusas; paskutinio atnaujinimo data 2026-02-13.

### Fixed

**2026-02-13 (QA_AGENT: lint – react/no-unescaped-entities)**

- **ScenarioQuestion.tsx:** Kabutė `"` mygtuko tekste „Jei klaidingai – žr. skaidrę „…“" pakeista į `&quot;` – išspręsta ESLint klaida `react/no-unescaped-entities`. `npm run lint` – 0 klaidų.

### Added

**2026-02-13 (Gili 1-2-3 kodo analizė – sanity, dokumentacija, versioning)**

- **Sanity:** validate:schema, build, lint – visi praeina; regresijų nerasta.
- **Versioning:** `src/data/tools.json` ir `scripts/schemas/tools.schema.json` įtraukti į git (staged).
- **Dokumentacija:** `docs/CONTENT_MODULIU_ATPAZINIMAS.md` – pastaba apie skaidrių id 51 ir 52 kaip „magic“ (ModuleView, ContentBlockSlide).
- **Patikrinimas:** Skaidrė 43 – `image` su `strukturuotas_procesas` atitinka; TEST_REPORT – sanity įrašas.
- QA_AGENT.

**2026-02-13 (Modulio 2 bonus skaidrės – collapsible, pavadinimas, kalbos pataisa)**

- **Collapsible:** Skaidrės 51 ir 52 – visos sekcijos dabar `collapsible: true`, `collapsedByDefault: true`. Turinys matomas tik paspaudus ant atitinkamos antraštės („klikina, norėdamas pamatyti“).
- **Pavadinimas:** Skaidrė 52 – „Bonusas: Praktinės užduotys“ (pašalinta „(po Stilių)“).
- **Kalbos pataisa:** Skaidrė 52 – „Mandagus, profesionalus, pagarbas“ → „pagarbus“ (būdvardis pagal mandagus, profesionalus).
- **Duomenys:** `modules.json` – skaidrės 51, 52 sekcijos; skaidrė 52 title, body.
- QA_AGENT.

**2026-02-13 (Modulio 2 bonus skaidrės – išskirtinumas, patetikos, premijos jausmas)**

- **Badge:** Skaidrėms 51, 52 – „Bonusas“ su Sparkles ikona ir accent gradient (ne „Papildoma“).
- **Bonus hero:** ContentBlockSlide viršuje – „Tu įveikei testą. Čia – papildoma nauda.“ (gradientas, Sparkles, su saiku).
- **Turinys:** whyBenefit – šiltesnis tonas: skaidrė 51 „Įveikei žinių patikrinimą – štai premija…“; skaidrė 52 „Antra premija: praktika…“. Pirmos sekcijos heading „Kas padarys tavo promptus išskirtinius“ + intro „Tai ne teorija – tai verslo praktika.“
- **UI:** ModuleView – bonus badge sąlyga (id 51, 52); SlideContent – perduoda `slide` į ContentBlockSlide; ContentBlockSlide – `slide` prop, bonus hero blokas.
- Agentų seka: CONTENT_AGENT → DATA_AGENT → CODING_AGENT → UI_UX_AGENT → QA_AGENT.

**2026-02-13 (Modulio 2 bonus skaidrės – stilius, collapsible, tipografija)**

- **Collapsible:** Skaidrė 51 (Bonusas: Stilių naudojimas) – sekcija „Ryšys su 6 blokais“ dabar suskleidžiama (`collapsible: true`, `collapsedByDefault: true`), antraštė „🔽 Nori suprasti detaliau? Ryšys su 6 blokais“. „Atidaryti visus“ / „Suskleisti visus“ mygtukai rodomi.
- **Tipografija:** ContentBlockSlide – body tekstas visur su `text-sm` (buvęs skirtumas tarp optional ir ne-optional ištaisytas).
- **Tuščios body sekcijos:** Body div nerenderinamas, kai `section.body` tuščias – išvengiamas perteklinis tarpas skaidrėse su tik `copyable` blokais.
- **Duomenys:** `modules.json` – skaidrė 51, sekcija „Ryšys su 6 blokais“ – `collapsible`, `collapsedByDefault`.
- **UI:** `ContentSlides.tsx` – body div sąlyga `section.body`; body klasėms pridėtas `text-sm`.
- Agentų seka: CODE_REVIEW_AGENT → CONTENT_AGENT → DATA_AGENT → CODING_AGENT → UI_UX_AGENT → QA_AGENT.

**2026-02-13 (QA: Rinkodaros planas – integracijos MUST–SHOULD–WANT)**

- **Integracijos į MUST–SHOULD–WANT:** `docs/MARKETING_MUST_SHOULD_WANT.md` – naujas skyrius „Integracijos ir įrankiai“; M5 (MUST): Brevo, GA4, UTM – 0€, Fase 1; S7 (SHOULD): Brevo formos ir apklausos automatas – Fase 2; W5 (WANT): Buttondown, Plausible/Fathom, Zapier – Fase 3. Fazių lentelė atnaujinta (M5, S7, W5).
- **Rinkodaros planas:** `docs/marketing_plan.md` – §6 Kanalai su integracijų nuorodomis (Brevo, GA4, UTM, Zapier); §7 Sekti – GA4, UTM, Brevo metrikos; §8 Santrauka – M5 integracijų eilutė, žingsnis „Įdiegti M5 integracijas“; nuorodos į `MARKETING_MUST_SHOULD_WANT.md`.
- **QA_AGENT:** Changelog atnaujintas pagal agent-orchestrator QA gaires.

**2026-02-13 („Kas man iš to?“ gold standard – Moduliai 1–6 ir tolesni)**

- **LXD / intuityvus mokymas:** Kiekvieno modulio pirmoje skaidrėje – vienas aiškus naudos sakinys (whyBenefit). Gold standard tekstai: M1 „Po šio modulio rašysi promptus 6x geriau nei anksčiau.“; M2 „Po šio testo tavo žinios išaugs dar 60%.“; M3 „Po praktinės dalies turėsi 6 paruoštus šablonus kasdieniam darbui.“; M4 „Po šio modulio promptuose naudosi šaltinius ir mažinsi klaidas – RAG, žinių patikrinimas, tokenai.“; M5 „Po šio sprinto tu kursi verslo prezentacijas per 15 minučių!“; M6 „Po projekto turėsi vieną paruoštą artefaktą (tyrimo ataskaitą arba Custom GPT) ir šablonus tolesniam darbui.“
- **Duomenys:** `modules.json` – M1 action-intro (whyBenefit); M2 test-intro, M3 practice-intro (content.whyBenefit); M4 action-intro (id 38) whyBenefit; M5 content-block (id 47) whyBenefit; M6 practice-intro (id 60) content.whyBenefit.
- **Tipai ir UI:** `ActionIntroContent.whyBenefit?` (jau buvo); `ContentBlockContent.whyBenefit?` – naujas; `ContentBlockSlide` rodo whyBenefit viršuje; `TestPracticeSlides.tsx` – `getWhyBenefit(slide)`, TestIntroSlide ir PracticeIntroSlide rodo virš antraštės.
- **Dokumentacija:** `docs/development/GOLD_STANDARD_MODULIAI_1_2_3.md` §2.1a – lentelė M1–M6, taisyklė „tolesni moduliai (7–15) taikyti tą patį etaloną“; §10 – nuoroda į whyBenefit pirmoje skaidrėje. Versija 1.3.0, changelog įrašas.

**2026-02-13 (Testo rezultatų ekrane – pirmas klaidingas atsakymas matomas, M3)**

- **QuizResultsView:** Klaidingi atsakymai rodomi pirmi (orderedQuestions – wrong, tada correct); virš sąrašo – tekstas „Klaidingi atsakymai rodomi pirmi – peržiūrėkite, ką pataisyti.“; scroll į pirmą klaidingą su `block: 'start'` po `requestAnimationFrame`. INTERAKTYVUS_INTUITYVUS_MOKYMAS_MUST_SHOULD_WANT M3 įgyvendintas.

**2026-02-13 (Modulio 2 bonusas po testo – Stilių naudojimas ir Praktinės užduotys)**

- **Perkėlimas:** Dvi optional skaidrės („Stilių naudojimas promptuose“, „Praktinės užduotys po Stilių“) perkeltos iš Modulio 4 į **Modulio 2 kaip bonusas po testo** – rodomos tiems, kas atliko žinių patikrinimą. Pavadinimai pakeisti į „Bonusas: …“.
- **Duomenys:** `modules.json` – skaidrės id 51 ir 52 pašalintos iš Modulio 4; į Modulio 2 `slides` po `test-results` (id 26) įterptos dvi skaidrės (51, 52) su `optional: true`.
- **UI:** `ModuleView.tsx` – Modulio 2 build įtraukia `bonusSlides` (raw.slides su id 51 arba 52) po testResults, kad seka būtų: test-intro → test-section → test-results → bonus 1 → bonus 2 → Modulis baigtas.
- **SOT:** `docs/turinio_pletra_moduliai_4_5_6.md` – 4.1a5-style ir 4.1a5-practice pažymėti kaip perkelti į Modulio 2 bonusą; vietos atnaujintos. `docs/CONTENT_MODULIU_ATPAZINIMAS.md` – įrašas, kad šios skaidrės yra Modulio 2 bonusas. `docs/MODULIO_4_SKAIDRIU_EILES.md` – eilės 9 ir 10 išbrauktos, pastaba „Perkelta į Modulio 2“.
- Agentų seka: CONTENT_AGENT → DATA_AGENT → CODING_AGENT → CODE_REVIEW_AGENT → QA_AGENT.

**2026-02-13 (1 dalies santrauka ir mobile UI – gyvo testavimo atsakas)**

- **Santraukos po 1 dalies:** Testuotojams sunku rasti santraukos po 1 dalies; atrodo, kad „reikia du kartus grįžti“. Pridėta **„1 dalies santrauka“** skaidrė (Modulio 3, id 38) po „Praktikos Santrauka“ – viena vieta, kur apibendrinami Moduliai 1+2+3 (celebration hero, žinių kortelės, refleksija, CTA į M4). M3 completion ekrane – nuoroda „Peržiūrėti 1 dalies santrauką“, grįžti į tą skaidrę be papildomos navigacijos. SOT: `docs/CONTENT_MODULIU_ATPAZINIMAS.md` §7; duomenys: `modules.json` M3 skaidrė 38; `ModuleCompleteScreen` – prop `onViewPart1Summary`; `ModuleView` – callback ir perdavimas.
- **Mobile (senesni iPhone):** Vaizdas per didelis, žodžiai nukarpyti. Pataisyta: `index.css` – html `-webkit-text-size-adjust: 100%`, body `overflow-wrap: break-word` / `word-break: break-word`; `ModuleView.tsx` SlideGroupProgressBar – etiketės be `truncate`, su `break-words` ir `title` (tooltip).
- **QA:** `docs/VARTOTOJU_ATSILIEPIMAI_BENDRAS.md` – skyrius „Atsakas į gyvo testavimo feedback (2026-02-13)“; `docs/development/TEST_REPORT.md` – įrašas 2026-02-13. Changelog peržiūrėtas QA_AGENT (lietuviškos raidės, formatas, agentų seka).
- Agentų seka: CONTENT_AGENT → DATA_AGENT → CODING_AGENT → UI_UX_AGENT → QA_AGENT.

**2026-02-13 (Modulio 5 patobulinimai – golden standard)**

- **P1 – „Ką pakartoti“ blokas:** TestResultsSlide Moduliui 5 (<70%) – naujas blokas „Rekomenduojame peržiūrėti:“ su nuorodomis į skaidres: Struktūruotas procesas (4.1b), Prezentacijos workflow, Įrankių pasirinkimas, Žinių patikrinimas ir haliucinacijos (4.6). Mygtukai su `onGoToModule(moduleId, slideIndex)`; a11y: `aria-label`, `min-h-[44px]`.
- **P2 – 4‑as klausimas:** `modules.json` Modulio 5 test-section – pridėtas klausimas m5-sprint-q4 „Kuris įrankio pasirinkimas logiškiausias 15 min prezentacijos draftui?“ (teisingas: Gamma arba DI su šablonu); ifWrongSee → skaidrė 511 (Įrankių pasirinkimas).
- **P2 – Motyvacija:** TestIntroSlide M5 – tekstas pakeistas į „Šis mini testas patikrina, ar esi pasiruošęs Moduliui 6 projektui“; testo struktūra atnaujinta į „4 klausimai (brief, struktūra, įrankis, kokybės patikra)“.
- **QA:** `docs/development/MODULIO_5_INTERAKTYVUMO_ANALIZE.md` §8 – įgyvendinimo statusas atnaujintas (P2 4 kl., motyvacija; P3 „Ką pakartoti“). A11y ir lietuviškų raidžių spot check M5 – be klaidų.

**2026-02-13 (5 banerių strategija – lead gen / pozicionavimas)**

- **Strategija:** `docs/development/BANNER_5_VARIANTU_STRATEGIJA.md` – viena pagrindinė žinutė (M2), 5 skirtingi tekstai (≤12 žodžių, CTA), Design/Coding rekomendacijos, animacijos keyframes, agentų workflow.
- **Content:** 5 atrinkti banerių tekstai (headline + subline + CTA): pagrindinė žinutė, struktūra/ne chaosas, nuspėjami rezultatai, praktika, B2B komandos apmokymui.
- **HTML:** `public/banner_5_variantai.html` – peržiūra variantams 1..5 ir dydžiams 1200×628 / 1080×1080; 3 fazių animacija (fadeIn, ctaPulse).
- **Skriptas:** `scripts/generate_banner_gif.py` – `--variant 1..5`, `--size 1200x628|1080x1080`, `--png` (fallback), `--gif` (3 fazės).
- **README-BANNER:** nuoroda į BANNER_5_VARIANTU_STRATEGIJA.md ir 5 variantų komandas.

**2026-02-13 (Modulio 6 geriausios praktikos – MUST/SHOULD/WANT įgyvendinta)**

- **SOT:** `docs/turinio_pletra_moduliai_4_5_6.md` – Scenarijus (tyrimo ataskaita), Refleksijos skaidrė, Custom GPT, Savęs vertinimo kortelė, „Ką toliau?“.
- **Duomenys:** `modules.json` – **MUST:** skaidrė id 61 (Projektas: Tyrimo ataskaita su DI) – pridėtas `practicalTask` su 6 žingsnių instrukcijomis (META→ADVANCED), `partialSolution` kiekvienam žingsniui, pilnas `template` (tyrimo ataskaita su RAG + Deep research). **SHOULD:** skaidrė id 65 (Modulio 6 refleksija) – nauja sekcija „Refleksijos promptas“ su `copyable` (CopyButton); nauja sekcija „Ką toliau?“ (nuorodos į modulių sąrašą, Modulius 7–15). Skaidrė id 67 (Custom GPT) – pridėtas `practicalTask` su 6 žingsnių instrukcijomis ir pilnu pavyzdžiu.
- **UI:** `TestPracticeSlides.tsx` – **WANT:** Modulio 6 savęs vertinimo kortelė: interaktyvūs mygtukai „Taip“ / „Dar ne“ / „Netaikau“ kiekvienam kriterijui; būsena išsaugoma į `localStorage` (`prompt-anatomy-modulio6-self-assessment`). A11y: `role="group"`, `aria-pressed`, `min-h-[44px]`.
- **CODE_REVIEW:** SOT→JSON→UI grandinė patikrinta; lietuviškos raides – pataisyta `modules.json` (reiskia→reiškia, pavyzdzius→pavyzdžius) skaidrėse Modulio 3.
- **Dokumentacija:** `docs/development/GILI_ANALIZE_MODULIS_3_VS_6.md` – §3.2, §5, §7 ir NEXT atnaujinti (MUST/SHOULD/WANT įgyvendinta). TODO.md – įrašas „Modulio 6 geriausios praktikos“.
- Agentų seka: CONTENT_AGENT → DATA_AGENT → CODING_AGENT → CODE_REVIEW_AGENT → QA_AGENT.

**2026-02-13 (Modulio 4 giluminė analizė – WANT fazė)**

- **SOT:** `docs/turinio_pletra_moduliai_4_5_6.md` – 4.2a: naujas blokas „Kada naudoti Memory vs išorinius įrankius?“ (Memory = tas pats įrankis, tarp sesijų, iki kelių tūkstančių žodžių/dešimčių įrašų; išoriniai = savi dokumentai; santrauka). 4.2a-academic: „4 įrankiai = pilna eiga“, tipinė eiga su laikais (5–10 min, 10–15 min, ~5 min, 10–15 min, 30–45 min). 4.2-check, 4.3-check: lentelėse – gairės gilesniems diagnostiniams paaiškinimams ir „Jei klaidingai – žr. skaidrę [X]“. 4.8: „Kas matuota?“ ir „Rezultatas“ – skaičiai iš OpenAI tyrimo (175B ~5,0 vs GPT-3 ~2,5; 1,3B InstructGPT geriau nei 175B GPT-3).
- **Duomenys:** `modules.json` – id 60 (4.2a): sekcija „Kada naudoti Memory vs išorinius?“ su skaičiumi (kelių tūkstančių žodžių / dešimčių įrašų). Id 61 (4.2a-academic): „4 įrankiai = pilna eiga“, tipinė eiga su laikais (30–45 min). Id 40.8 (4.8): „Kas matuota?“ ir „Rezultatas“ – konkretūs skaičiai. Savitikros (4.2-check, 4.3-check, 4.4-check): paaiškinimuose „grįžk prie skaidrės“ pakeista į „žr. skaidrę“ (nuoseklumas).
- Agentų seka: CONTENT_AGENT → DATA_AGENT → CODE_REVIEW_AGENT → QA_AGENT. Build sėkmingas.

**2026-02-13 (Modulio 4 giluminė analizė – įgyvendinimas, MUST + SHOULD)**

- **SOT:** `docs/turinio_pletra_moduliai_4_5_6.md` – MUST: 4.1c (praktinis pavyzdys, CopyButton promptas „Parodyk man Schema 3 paaiškinimą“), 4.1d (pavyzdys „Įkelk paveikslėlį + klausimas“, blokas „Skirtumas nuo Schema 3“), 4.5 (skaičius apie incidentus, savitikra 2 klausimais, antras šališkas pavyzdys „Pataisyk promptą“), 4.7 (konkretus „3 klausimų“ sąrašas, „Kas toliau?“ su nuorodomis į Modulį 5/6). SHOULD: 4.3 (orientacinis laikas 5–15 min, konkretus Deep research promptas su laukais), 4.3a (pavyzdinės problemos – rinkos analizė, segmentavimas, CTA „Pabandyk su šia problema“), 4.4-check (3 klausimai, „Jei klaidingai – grįžk prie skaidrės 4.4“), 4.5-safety (OWASP/incidentų skaičiai, „Kaip atpažinti?“ pavyzdys).
- **Schemos:** `public/schema3_llm_rag.svg`, `public/schema4_multimodal.svg` – Schema 3 ir 4 vizualizacijos (įvestis→LLM→išvestis, Tool Use, Retrieval, Memory, Saugykla). SOT geometrija pagal SCHEME_AGENT gaires.
- **Duomenys:** `modules.json` – skaidrės 56, 57 (Schema 3/4): diagramos nuotraukos, praktinis pavyzdys, copyable promptas, „Skirtumas nuo Schema 3“. Skaidrės 64, 65 (Deep research, 4.3a): orientacinis laikas, konkretus promptas, pavyzdinės problemos, CTA. Skaidrė 66.5 (Savitikra: Tokenai): paaiškinimuose „Jei klaidingai – grįžk prie skaidrės 4.4“, subtitle 3+ klausimai. Skaidrės 67, 67.5 (Manipuliacijos, 4.5-safety): incidentų skaičius, savitikra 2 klausimai, OWASP/„Kaip atpažinti?“ blokai. Skaidrė 70 (Santrauka): introBody papildytas „3 klausimais sau“ ir „Kas toliau?“.
- **Validacija:** content-block sekcijoms su `image` pridėtas reikalingas `body` (schema atitiktis). Build ir schema validacija – sėkmingi.
- Agentų seka: CONTENT_AGENT → SCHEME_AGENT → DATA_AGENT → CODING_AGENT (duomenų tvarka) → CODE_REVIEW_AGENT → QA_AGENT.

**2026-02-13 (Modulio 4 giluminė analizė – po Skyriaus ribos)**

- **MODULIO_4_GILI_ANALIZE.md:** Naujas dokumentas `docs/development/MODULIO_4_GILI_ANALIZE.md` – ugdymo turinio, faktų, užduočių analizė dalyvio akimis. Apimtis: tik skaidrės **po Skyriaus ribos** („Pirma dalis baigta“). Išimtos: DI visata, konteksto pamatai (4.0, 4.0-praktika, 4.1a–4.1b, 4.1a2–4.1a5, 4.1-system-master, 4.1b2, 4.1-tools, 4.1-prompts, action-intro 38). Stipriausios: RAG (4.2), Tokenų ekonomika (4.4), Haliucinacijos (4.6), 4.2-open, 4.2b, 4.2c. Silpniausios (MUST): 4.1c Schema 3, 4.1d Schema 4, 4.5 Manipuliacijos, 4.7 Santrauka. Lentelės MUST–SHOULD–WANT, agentų paskirstymas (CONTENT, SCHEME, DATA, CODING, UI_UX, CODE_REVIEW, QA).

**2026-02-13 (Praktika DI visata – trumpas žinių patikrinimas, Variantas B)**

- **SOT:** `docs/turinio_pletra_moduliai_4_5_6.md` – 4.0-praktika aprašytas kaip „trumpas žinių patikrinimas“; lentelėje ir detaliame skyriuje – subtitle „Trumpas žinių patikrinimas: atpažink DI visatos sluoksnius (2–3 min). Neprivaloma.“; diagnostinių paaiškinimų gairės (rodomi ir po teisingo, ir po neteisingo atsakymo).
- **Duomenys:** `modules.json` skaidrė 39.5 – subtitle, framing body („trumpas žinių patikrinimas“), recognitionExercise.title „Žinių patikrinimas: atpažink DI visatos sluoksnį“; korekcija „suprasit“ → „suprasi“.
- **UI:** `RecognitionExerciseBlock.tsx` – paaiškinimas rodomas ir po teisingo atsakymo (formatinis grįžtamasis ryšys pagal M4 savitikrų praktikas).
- Agentų seka: CONTENT_AGENT → DATA_AGENT → CODING_AGENT → CODE_REVIEW_AGENT → QA_AGENT.
- **QA:** CHANGELOG atnaujintas; build sėkmingas; vartotojo matomuose tekstuose (39.5) lietuviškos raidės patikrintos (ž, ė, į, ų, ū, š, č, ą).

**2026-02-12 (Skaidrė 43 – struktūruotas procesas, vizuali schema)**

- **StrukturuotasProcesasDiagram:** Naujas 3 žingsnių proceso diagramos komponentas (Įvestis → Apdorojimas → Rezultatas) – horizontali SVG schema su brand spalva ir rodyklėmis. `StrukturuotasProcesasBlock` – wrapper skaidrei 43. `ContentSlides.tsx` – `section.image.includes('strukturuotas_procesas')` → rodoma diagrama vietoj lentelės. `modules.json` skaidrė 43 – „Schema: 3 žingsniai“ sekcijoje pridėtas `image: "strukturuotas_procesas_3_zingsniai"`, pašalinta lentelė. Planas: `docs/development` agentų schema (CONTENT → SCHEME → DATA → CODING → UI_UX → CODE_REVIEW → QA).

**2026-02-13 (Skaidrė 43 – ProcessSteps redesign, Variantas A)**

- **StrukturuotasProcesasDiagram:** Pilnas redizainas – SVG su trikampiais pakeistas į ProcessSteps komponentą. Jungtis: plonos linijos (2px) tarp kortelių, be trikampių. Hierarchija: badge (28px apskritimas) + pavadinimas + 2–3 punktai su bullet'ais. Sumažintas triukšmas: vientisa spalva (be gradiento), lengvas šešėlis, vienas konteineris. Responsive: desktop – 3 kortelės horizontaliai su connector linijomis; mobile – vertikali stack su border-left timeline.

### Fixed

**2026-02-12 (Atidaryti visus / Suskleisti visus – content-block)**

- **ContentBlockSlide:** „Atidaryti visus“ ir „Suskleisti visus“ dabar veikia patikimai. Priežastis: komponentas kartais permontuodavosi, todėl `openSections` būsena prarandavo. Pataisa: modulio lygio `collapsibleStateCache` (Map pagal sekcijų signature) – po remount būsena atstatoma; pavadinimo mygtuko toggle taip pat atnaujina cache. Papildomai: collapsible turiniui pridedamas `style={{ display: 'none' }}` kai suskleista, kad vizualiai būtų garantuota. Debug instrumentacija pašalinta iš `ContentSlides.tsx`.

**2026-02-12 (Skaidrė 40.8 – suskleidžiama apatinė dalis)**

- **modules.json 40.8:** Suskleidžiama apatinė skaidrės dalis (ne viršutinė): sekcijoms „Rezultatas“, „Veiksmas: ką daryti“ pridėta `collapsible: true`, `collapsedByDefault: false`. „Šaltiniai“ jau buvo collapsible. Viršutinės sekcijos (Kodėl tai svarbu, Kaip veikia LLM?, Kodėl ši skaidrė…, Kas matuota?) lieka visada atidarytos. „Suskleisti visus“ dabar suskleidžia Rezultatas + Veiksmas + Šaltiniai.

**2026-02-12 (Modulio 2 – skaidrė neatsidaro, gyvas testas)**

- **Modulis 2 (Žinių patikrinimas):** Skaidrė daugiau nebekraunama be galo. Priežastis: `SlideContent` buvo įkeliamas per `lazy()` – chunk kartais neįsikraudavo, Suspense fallback „Kraunama skaidrė…“ likdavo. Pataisa: tiesioginis `import SlideContent` vietoj `lazy(() => import('./SlideContent'))` (`ModuleView.tsx`). Papildomai: `useSlideNavigation` – išsaugota skaidrės pozicija ribojama pagal skaidrių skaičių (`clampedSlide`), kad senesnė išsaugota pozicija niekada nebeliktų už diapazono. Šaltinis: vartotojo atsiliepimas (gyvas testas), `docs/VARTOTOJU_ATSILIEPIMAI_BENDRAS.md`.

### Added

**2026-02-12 (UI/UX tobulinimai – content-block, a11y, hierarchija)**

- **ContentBlockSlide:** Sekcijų antraštės – `h3` su `font-bold text-lg md:text-xl` (vizualinė hierarchija pagal DESIGN_GUIDE); practicalTask blokas – `<section>` su `role="region"`, `aria-labelledby`, padding `p-6`, atotrūkis `mt-8`; workflow tooltip – Info ikona pakeista į `<button>` (min 44×44px, focus-visible ring, aria-describedby), tooltip matomas ir ant klaviatūros fokusavimo (`group-focus-within`). Collapsible mygtukai – `focus-visible:ring-2` vietoj `focus:ring-2`.
- **TemplateBlock:** Pasirinktinas `id` (region aria-labelledby); label – `text-sm font-bold`, padding `p-4 md:p-5`.
- **CopyButton:** `type="button"`, `focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2` (a11y pagal UI_UX_AGENT).

**2026-02-12 (Skaidrė „4 dedamosios“ – turinio peržiūra ir tobulinimas, CONTENT_AGENT)**

- **4 dedamųjų apibrėžimai:** Atnaujinti pagal šviežius šaltinius (Anthropic – aiškumas, kontekstas, sėkmės kriterijai, „golden rule“; konteksto inžinerija; clarity/specificity/context/format). Inžinerija – sėkmės kriterijai, iteracijos, struktūra; Kalbos filosofija – aiškumas, specifiškumas, kontekstas; Psichologija – įrėminimas, auditorija; Komunikacija – tiesiogumas, žingsniai, išvesties formatas. Skaidrė 45: „Kodėl čia?“ ir „Esmė“ blokai patikslinti; užduotis ir vertinimo promptas – 4 konkrečius kriterijus (Tikslas, Kontekstas/auditorija, Struktūra, Formatas) + 1–2 veiksmus nurodančius patarimus. SOT: `docs/turinio_pletra_moduliai_4_5_6.md` (4.1a2).

**2026-02-12 (Skaidrė „4 dedamosios“ – action skaidrė su promptu ir veiksmu)**

- **Skaidrė id 45 (4 dedamosios):** Pridėtas veiksmas pagal golden standard: sekcijos „2️⃣ Daryk dabar (1–2 min)“ (brand) ir „3️⃣ Kopijuojamas promptas“ (terms, copyable) + `content.practicalTask` (TemplateBlock apačioje). Prompto esmė: DI kaip „4 dedamųjų“ vertintojas – vartotojas įklijuoja savo promptą, gauna įvertinimą pagal Inžineriją, Kalbą, Psichologiją, Komunikaciją ir 1–2 patarimus. SOT: `docs/turinio_pletra_moduliai_4_5_6.md` – skaidrei 4.1a2 pridėtas „Veiksmas (action)“ punktas. Agentų seka: CONTENT_AGENT (SOT + prompto tekstas) → DATA_AGENT (modules.json) → CODE_REVIEW_AGENT → QA_AGENT (CHANGELOG, MODULIO_4_4_DEDAMOSIOS_ANALIZE).

**2026-02-12 (Skaidrė 40.8 – InstructGPT kokybės vizualizacija)**

- **InstructGPT Quality viz blokas:** Pridėta stats strip (4 modeliai), linijinė diagrama (kokybė vs modelio dydis), delta lentelė (1.5B → 175B pokytis), Key Finding callout. `src/components/slides/shared/InstructGptQualityBlock.tsx` – naujas komponentas; `ContentBlockContent.instructGptQuality` – tipai `modules.ts`; `modules.json` skaidrė 40.8 – pilni duomenys (stats, chartData, deltaRows, insight, scaleNote). CONTENT_AGENT: lietuviški tekstai; DATA_AGENT: JSON struktūra; SCHEME_AGENT: chart geometrija (viewBox, Y_PX_PER_UNIT); CODING_AGENT: InstructGptQualityBlock + ContentBlockSlide integracija. QA: build, lint sėkmingi.

**2026-02-12 (Skaidrė 40.8 – LLM schemos tobulinimas)**

- **LLM autoregresinė schema (RBC palyginimas):** Žingsnis N įvestis be „m.“ („Vilniaus Rytas tapo čempionais 2024“), Žingsnis N+1 – pilnas praplėstas sakinys („Vilniaus Rytas tapo čempionais 2024 m.“). Išvesties bloke antraštė „Tokenas · Tikimybė“ (lentelės įspūdis). Atnaujinti: `public/llm_autoregressive_rytas_zalgiris.svg` (tekstai, `<desc>`), `modules.json` 40.8 (body, imageAlt). Doc: `docs/development/LLM_SCHEMA_VS_ORIGINAL_RBC.md` – santraukoje pažymėta įgyvendinta.

**2026-02-12 (Skaidrė 40.8 – auksinis standartas: veiksmas, aiškumas, pirmą kartą)**

- **Skaidrė 40.8 (InstructGPT: instrukcijų laikymasis):** Pertvarkyta pagal auksinį standartą: nauda pirmiausia („Kodėl tai svarbu“), trumpesnis subtitle, sutrumpintas „Kaip veikia LLM?“ body, nauja sekcija „Veiksmas: ką daryti“ (accent) su CTA. Sekcijų tvarka: Kodėl tai svarbu → Kaip veikia LLM? → Kodėl ši skaidrė Modulio 4 tema? → Kas matuota? → [InstructGptQualityBlock] → Rezultatas → Veiksmas → Šaltiniai (collapsible). SOT: `docs/turinio_pletra_moduliai_4_5_6.md` – pridėtas skaidrės 4.8 aprašas ir lentelės eilutė. DATA_AGENT: `modules.json` 40.8 – subtitle, 7 sekcijų, heading/body. CODING_AGENT: `ContentSlides.tsx` – InstructGptQualityBlock inject po sekcijos index 3 („Kas matuota?“). SCHEME_AGENT: `public/llm_autoregressive_rytas_zalgiris.svg` – komentaro rašybos pataisa (semantiškai aiški). QA: lietuviškos raidės 40.8 tekstuose patikrintos.

**2026-02-12 (Skaidrė 40.8 InstructGPT – golden standard)**

- **Skaidrė 40.8 (InstructGPT: instrukcijų laikymasis):** Turinys ir šaltiniai suderinti su SOT; pridėta LLM autoregresinė schema (Rytas, Žalgiris, LKL) – `public/llm_autoregressive_rytas_zalgiris.svg`. Šaltiniai sekcija rodoma kaip collapsible (suskleista pagal nutylėjimą). CONTENT_AGENT: Šaltiniai collapsible + lietuviškos; SCHEME_AGENT: naujas SVG pagal DATA_AGENT_PLAN ir SCHEME_AGENT.md; DATA_AGENT: `modules.json` 40.8 – pirmajai sekcijai pridėti `image`, `imageAlt`. CODING_AGENT: `renderBodyWithBold` apsauga nuo `undefined` (content-block sekcijos). QA: build, lint – sėkmingi.

**2026-02-12 (Plano įgyvendinimas: CE, Design Must, A-S1, A-S4, testai, a11y)**

- **Context Engineering (CE-2, CE-3, CE-4):** MEMORY.md – long-term sprendimų failas pagal memory_schema; RELEASE_QA_CHECKLIST §7 – skyrius „Turinio/UX kokybė“ su nuoroda į eval_rubric ir „vienas modulis per release pagal rubric“; `scripts/validate-sot-index.mjs` – sot_index.json validacija (6 moduliai, keliai); context-engineering/README ir AGENT_ORCHESTRATOR – taisyklė „prieš redaguojant modulį atidaryk sot_index; pilną SOT krauk tik ten, kur task scope“.
- **Design Must (M-DS2, M-DS3, M-DS4):** Mokymo trukmė blokas (action-intro) – violet → slate (M-DS2); Summary hero emoji 🏆 → Lucide Trophy (M-DS4); ModuleView – spacing/radius iš design-tokens (M-DS3).
- **A-S1 (6 blokų struktūra):** `src/utils/sixBlockStructure.ts` – detectBlocks() pagal sekcijas (META:, INPUT:, …), BLOCK_EXAMPLES; PracticalTask – checklist pagal struktūrą, „Trūksta blokų“ su pavyzdžiu; unit testai sixBlockStructure.test.ts.
- **A-S4 (Fast track):** useSlideNavigation – skipOptional, getNextNonOptionalIndex(); ModuleView – Fast track checkbox (localStorage), praleidžia optional skaidrės Pirmyn/Atgal; unit testai useSlideNavigation.fastTrack.test.ts.
- **A-S2 (a11y smoke):** axe-core dev dependency; `src/components/__tests__/a11y.smoke.test.tsx` – HomePage axe smoke (0 serious/critical). TEST_REPORT – Vitest eilutė atnaujinta (išspręsta, 64 testai).

**2026-02-12 (Modulio 4 pirmoji skaidrė – action-intro)**

- **Modulio 4 itraukianti skaidrė:** Pridėta nauja pirmoji skaidrė (id 38) tipo `action-intro`, panaši į Modulio 1 pirmąją – hero („Jau moki kurti promptus. Dabar – kontekstas ir patikimumas.“), CTA („Pamatyk, kas laukia – per 1 minutę!“), palyginimas be konteksto vs su šaltiniais (RAG pavyzdys), aboutText, outcomes (6 punktai), tools, duration (~30–35 min). SOT: `docs/turinio_pletra_moduliai_4_5_6.md` §1.4; duomenys: `src/data/modules.json` – skaidrė įterpta pirmoje Modulio 4 `slides` pozicijoje. `docs/MODULIO_4_SKAIDRIU_EILES.md` – eilė 0 (id 38), taisyklė „38 visada pirmas“. Komponentas: esamas `ActionIntroSlide`; navigacija pagal masyvo eilę.

**2026-02-12 (Gold standard Modulio 4 – opcional užbaigtas)**

- **QA_AGENT:** Lietuviškų raidžių peržiūra Moduliui 4 – skaidrės 70 (4.7) ir 67.5 (Saugumas) patikrintos pagal RELEASE_QA_CHECKLIST §5; pataisymų nereikėjo. M4 identitetas (brand, kaip M1) oficialiai dokumentuotas: DESIGN_GUIDE_MODULIAI_1_2_3.md §5 – pridėta Modulio 4 eilutė; MODULIO_4_ANALIZE_DIZAINO_GIDAS_GOLD_STANDARD.md §2.5 jau turėjo. GOLD_STANDARD_MODULIAI_4_5_6_GAP_ANALIZE.md §2 – prioritetas Moduliui 4 atnaujintas: opcional užbaigtas. RELEASE_QA_CHECKLIST – statusas M4 lietuviškos (4.7, 67.5) peržiūrėtos.
- **UI_UX_AGENT:** Fazių etiketės auditas Moduliui 4 – SlideGroupProgressBar (Įvadas, Skyrius, Teorija, Savitikra, Santrauka) pakanka aiškios. ModuleView.tsx typeToPhase – pridėtas `ai-detectors` → „Teorija“ (anksčiau „Kita“). MODULIO_4_ANALIZE_DIZAINO_GIDAS_GOLD_STANDARD.md §4 – opcional punktai pažymėti atliktais.
- **CODE_REVIEW_AGENT:** `npm run build`, `npm run lint` – sėkmingi; regresijos neaptiktos.

**2026-02-12 (QA: Design System Should/Nice + Gold Standard)**

- **Design System – Should (2 sprintas), DESIGN_GUIDE S-DS1–S-DS4:** Tipografijos skalė (S-DS1) – vienas H1 per skaidrę (ModuleView), turinyje H2 `text-lg md:text-xl font-bold` (Action intro, SectionBreak, Summary, practice-summary). Modulių identitetas (S-DS2) – M2 badge/kortelė slate; M3 badge/kortelė slate, accent tik CTA (ModuleView badge-slate; ModulesPage M3 kortelė slate, mygtukas accent). Kortelių skaičius (S-DS3) – Summary max 3 žinių kortelės (`knowledgeSections.slice(0, 3)`). Šešėliai (S-DS4) – default `shadow-md`, hover `shadow-lg` (index.css card/btn; ContentSlides, HomePage, ModuleView, ModulesPage, Celebration). Badge-slate klasė (index.css).
- **Design System – Nice (N-DS1, N-DS2):** Float išjungtas ant secondary badge „~45 min“ (HomePage – be `animate-float`). Design tokens failas `src/design-tokens.ts` – spacing (px + Tailwind klasės), radius (px + klasės), spacingClasses, radiusClasses; nuoroda DESIGN_GUIDE §4.3, §4.4.
- **Gold Standard 1.1.0 (2026-02-12):** `docs/development/GOLD_STANDARD_MODULIAI_1_2_3.md` atnaujintas pagal Design System: §3.2 Modulio identitetas (M2 slate, M3 accent tik CTA); naujas §3.5 Design System (tipografija, Summary kortelės, šešėliai, float, tokens); §1.3 Summary – max 3 žinių kortelės; §9 nuorodos į DESIGN_GUIDE ir design-tokens.ts; §10 pritaikymas 4–6 su Design System; Changelog skyrius (1.0.0, 1.1.0). Versija 1.1.0, data 2026-02-12.
- **DESIGN_GUIDE:** N-DS1, N-DS2 pažymėti įgyvendintais; §8 nuoroda į `src/design-tokens.ts`. TODO.md – S-DS1–S-DS4, N-DS1, N-DS2 pažymėti atliktais (2026-02-12).

**2026-02-11 (Mobile UI – Moduliai 2 ir 3)**

- **Mobile UI auditas ir pataisymai:** Dokumentas `docs/development/MOBILE_UI_AUDIT_MOD2_MOD3.md` – CODE_REVIEW diagnozė, UI_UX checklist, įgyvendintos rekomendacijos. TestResultsSlide: radar wrapper su `overflow-hidden`, `p-4 sm:p-6`. CategoryBreakdownWithLinks: mygtukai „Peržiūrėti skaidrę“ / „Pakartok 3 kl.“ – `min-h-[44px] py-2` (touch targets); konteineris `p-4 sm:p-6`. PracticeScenarioSlide: tab mygtukai `min-h-[44px]`. RemediationRetryBlock: mygtukas „Grįžti į rezultatą“ – `min-h-[44px] py-2`, `aria-label`. MatchingQuestion: porų tekstas su `min-w-0 break-words` (overflow mobile). PracticalTask: root `p-4 sm:p-6`. RELEASE_QA_CHECKLIST.md skyrius 2 – rekomendacija tikrinti Modulius 2 ir 3 mobile (test-results, practice-scenario), nuoroda į audito doc.

---

## [1.2.0] – 2026-02-11

Pakeitimai nuo 2026-02-07; release – 2026-02-11 (V1.2).

### Fixed

**2026-02-11 (Release prep – AGENT_SEQUENCE_RELEASE_PREP)**

- **Lint (rules-of-hooks):** `PracticeScenarioSlide` – `useState` perkeltas prieš `if (!slide.scenario) return null`, kad hookai būtų kviečiami nepriklausomai nuo sąlygos (`TestPracticeSlides.tsx`).
- **Lint (react-refresh):** `confidenceLabel` ir `LABELS` išskirti į `confidenceLabels.ts`, kad `ConfidenceSelector.tsx` eksportuotų tik komponentą; importai atnaujinti (`McqQuestion`, `MatchingQuestion`, `OrderingQuestion`, `TrueFalseQuestion`, `ScenarioQuestion`, `index.ts`).
- **Lint (exhaustive-deps):** `MatchingQuestion` – `pairs` apgaubtas `useMemo`; `OrderingQuestion` – `correctOrder` apgaubtas `useMemo`.
- **Lietuviškos raidės:** `questionPoolSelector.ts` – „prioriteta“ → „prioritetą“, „6 Bloku Sistema“ → „6 Blokų sistema“.

### Added

**2026-02-11 (Vartotojų atsiliepimai – bendri)**

- **Bendri atsiliepimai:** Naujas dokumentas `docs/VARTOTOJU_ATSILIEPIMAI_BENDRAS.md` – vienas šaltinis gyvo testavimo ir vartotojų feedback analizei. Įtraukta V1 Testavimo feedback analizė (4 testuotojai: 54 m. teisininkė, 25 m. media planuotoja, 48 m. konsultantas, 56 m. vadovas); segmentų signalai, horizontalios įžvalgos, segmentų žemėlapis, strateginė išvada, rekomenduojami veiksmai V2, statusas. Šaltiniai: GYVAS_TESTAVIMAS_2025-05-02, TEST_REPORT, V1 analizė. Agentų SOT: `.cursor/rules/agent-orchestrator.mdc` ir `docs/development/AGENT_ORCHESTRATOR.md` – pridėta eilutė „Bendri atsiliepimai“; RELEASE_QA_CHECKLIST – nuoroda į bendrus atsiliepimus.

**2026-02-11 (MVP Release – Moduliai 1–3 testuotojams)**

- **MVP mode:** `VITE_MVP_MODE=1` build rodo tik modulius 1–3; moduliai 4–6 nepasiekiami (nei per UI, nei per tiesioginius URL, nei per būsenos manipulaciją).
- **Module gating:** `src/utils/mvpMode.ts` – `getIsMvpMode()`; `modulesLoader.ts` – filtravimas `loadModules()`, `getModule(id > 3)` → null; `App.tsx` – guard'ai `handleModuleSelect`, `handleGoToModule`, redirect `useEffect`; `GlossaryPage.tsx` – terminai su `moduleId > 3` paslėpti.
- **HomePage CTA:** Kai 3/3 moduliai baigti (MVP) – CTA „Į apklausą“ (navigacija į quiz); `onGoToQuiz` prop.
- **Testai:** `mvp.gating.test.tsx` – 4 negatyvūs testai (loadModules, getModule(4), getModule(1), getModulesSync).
- **CI:** `.github/workflows/test.yml` – Build MVP step (`VITE_MVP_MODE=1 npm run build`).
- **Planas:** `docs/development/RELEASE_PLAN_MVP_MODULIAI_1_3.md`.

**2026-02-11 (Modulių aprašymai: tokenų riba + UI/UX)**

- **Modulio aprašymų kriterijai:** `.cursor/rules/module-description-criteria.mdc` – max 120 simbolių (~25 tokenų), 1–2 sakiniai. Schema `modules.schema.json` – `description` maxLength: 120.
- **Agentų seka:** `docs/development/AGENT_SEQUENCE_MODULIU_APRASYMAI_UI_UX.md` – CONTENT → DATA → CODING pipeline modulių kortelėms.
- **Turinio sutrumpinimas:** Modulių 2, 4, 5, 6 aprašymai sutrumpinti ≤120 simbolių (modules.json).
- **ModulesPage UI:** Aprašymo blokas – `min-h-[4.5rem] line-clamp-3` vienodam kortelių aukščiui grid'e.

**2026-02-11 (A-M4: Release QA gate)**

- **Content QA gate prieš release (TODO A-M4):** Naujas dokumentas `docs/development/RELEASE_QA_CHECKLIST.md` – 5 min sanity prieš release. 4 skyriai: broken links (internos + išorinės), mobile sanity (1 viewport + 1 kelionė), dark mode sanity (perjungimas + kontrastas), a11y smoke (skip link + klaviatūra). TODO.md A-M4 pažymėtas įgyvendintu.

**2026-02-11 (A-M3: Remediation uždara kilpa + „pakartok“)**

- **Remediation grįžimas (TODO A-M3):** Kai vartotojas iš Modulio 2 testo rezultatų eina į Modulio 1 skaidrę („Peržiūrėti skaidrę X“), Modulyje 1 rodomas skydelis su mygtuku **„Grįžti į testo rezultatą“** – grąžina į Modulio 2 rezultatų skaidrę. Būsena `remediationFrom` ir `onReturnToRemediation` perduodama per App → ModuleView; `handleGoToModule(moduleId, slideIndex?, fromRemediationSourceModuleId?)`.
- **„Pakartok 3 klausimus“:** Žinių žemėlapyje (Modulio 2 rezultatai) prie kiekvienos kategorijos – mygtukas **„Pakartok 3 kl.“**, atidarantis įterptą mini-quiz (3 klausimai iš tos kategorijos, MCQ/true-false). Rezultatas rodomas inline; „Grįžti į rezultatą“ uždarantis bloką. `selectQuestionsByCategory(category, n)` – `src/utils/questionPoolSelector.ts`; komponentas `RemediationRetryBlock` – `TestPracticeSlides.tsx`.
- **Kategorijos kortelės:** „Peržiūrėti skaidrę“ ir „Pakartok 3 kl.“ atskiri mygtukai kiekvienoje kategorijos kortelėje.
- **TODO.md:** A-M3 pažymėtas įgyvendintu (2026-02-11).

**2026-02-11 (A-M2: KPI + event tracking)**

- **Vienas mokymosi KPI + minimalus event tracking (TODO A-M2):** Naujas `src/utils/learningEvents.ts` – eventų tipai `module_completed`, `first_action_success` (pirmas praktinės užduoties įvykdymas). Log į localStorage (`prompt-anatomy-learning-events`), max 500 įrašų. Funkcijos: `logLearningEvent()`, `getLearningEvents()`, `exportEventsAsJson()`, `downloadEventsExport()`; KPI: `getModuleCompletedCount()`, `getFirstActionSuccessTimestamp()`. Integracija: modulio užbaigimas ir pirmas užduoties įvykdymas loguojami iš `App.tsx`. Mixpanel nenaudojamas.

**2026-02-11 (A-M1: JSON Schema + CI validacija)**

- **Turinio kontraktas (TODO A-M1):** JSON Schema validacija prieš build. Schemos: `scripts/schemas/modules.schema.json` (modules + quiz, slide type enum, content-block → content.sections[] required), `promptLibrary.schema.json`, `glossary.schema.json`. Skriptas `scripts/validate-schema.mjs` (Ajv) validuoja visus tris JSON; klaidos išvedamos, exit 1 jei nevalidu. `npm run validate:schema`, `prebuild` – build nepradeda be sėkmingos validacijos. Žr. TODO.md A-M1, prioritetai – docs/development/PLAN_AGENTAI_DARBAI.md.

**2026-02-11 (QA: analizės verdiktas, TODO MUST/SHOULD)**

- **Analizės verdiktas:** Gili analizė pagal CHANGELOG (kas lūžta pirmiausia, kas padaryta gerai, MUST/SHOULD/WANT prioritetai). Nuorodos: turinio kontraktas (JSON Schema + CI), vienas KPI + event tracking, remediation uždara kilpa, content QA gate, 6 blokų structure check, a11y automatika, Design system, Fast track optional. (Vėlesni prioritetai – TODO.md, docs/development/PLAN_AGENTAI_DARBAI.md.)
- **TODO.md:** Naujas blokas „Analizės verdiktas – MUST / SHOULD“; lentelės A-M1–A-M4 (MUST), A-S1–A-S4 (SHOULD), rekomenduojama seka. Nuorodos – TODO.md Nuorodos skyrius.

**2026-02-11 (P2: Pirmos skaidrės hook ir 30 s CTA – Moduliai 1–2–3 UX strategija)**

- **Modulio 1 pirmoji skaidrė (action-intro):** Pridėtas diskomforto pažadas hero bloke – „Dauguma rašo promptus, kurie duoda nenuspėjamus rezultatus.“ CTA pakeistas į **„Pamatyti skirtumą per 30 s“** (laiko pažadas). SOT atnaujintas: `turinio_pletra.md` Skaidrė 1 v3; `modules.json` – `heroSubText`, `ctaText`. Default CTA komponente ir `ActionIntroContent` JSDoc – „Pamatyti skirtumą per 30 s“. Žr. TODO.md P2, MODULIAI_1_2_3_UX_STRATEGIJA_ATASKAITA.md.

**2026-02-11 (PracticalTask: Redaguoti + Kopijuoti – visi moduliai, įsk. Modulį 3)**

- **Redaguoti:** Po užduoties pabaigimo – mygtukas leidžia vėl redaguoti promptą. Turinys saugomas `task-completed-${moduleId}-${slideId}`. Taikoma visiems moduliams su practicalTask (M1, M3, M4, M6).
- **Kopijuoti:** Mygtukas kopijuoja išsaugotą promptą į iškarpinę. Rodo „Nukopijuota!“ po paspaudimo.
- **Modulio 3:** 4 practice-scenario skaidrės naudoja tą patį PracticalTask – Redaguoti ir Kopijuoti veikia automatiškai.

**2026-02-11 (P3: Modulio 3 emerald cover + Modulio 2 X iš 15 – Moduliai 1–2–3 UX strategija)**

- **Modulio 3 practice-intro emerald cover (P3):** Modulio 3 Praktikos Įvade – emerald gradientas ir border (from-emerald-50, border-emerald-300), badge „4 scenarijai“, scenarijų kortelės su emerald hover/ring ir border. `TestPracticeSlides.tsx` – `PracticeIntroSlide` kai `moduleId === 3`.
- **Modulio 2 „X iš 15“ sticky mini-progress (P3):** Virš klausimų – sticky juosta „X iš 15 klausimų atsakyta“ su progress bar (brand→accent gradientas). Rodoma tik kol nerodomi rezultatai. `TestSectionSlide` – `answeredCount`, a11y `progressbar`, `aria-label`.

### Changed

**2026-02-11 (Modulio 3: 4 → 6 verslo scenarijai – AGENT_SEQUENCE_MODULIO_3_6_SCENARIJAI)**

- **6 verslo scenarijai:** Modulio 3 (Praktinis Pritaikymas) perdarytas iš 4 į 6 scenarijus pagal specifikaciją. Nauji: 1) Vadovo Strateginė Ataskaita, 2) Pardavimų Analizė ir Veiksmų Planas, 3) Marketingo Kampanijos Planas, 4) Vidaus Komunikacijos Dokumentas, 5) Personalo Sprendimų Analizė, 6) Kliento Skundo Valdymas. Pašalintas: Produkto Aprašymas (SaaS).
- **modules.json:** Skaidrės 31–36 (scenarijai), 37 (practice-summary). Kiekvienas scenarijus turi `scenario`, `practicalTask` su 6 žingsnių instrukcijomis ir template.
- **turinio_pletra.md:** § Modulis 3 atnaujintas su 6 scenarijais.
- **TestPracticeSlides.tsx:** 6 kortelės, ikonos (BarChart2, TrendingUp, Megaphone, MessageSquare, Users, AlertCircle), grid `lg:grid-cols-3`, badge „6 scenarijai“.
- **progress.ts:** Migracija `migrateModule3SlideIds` – 35→37 (summary), pašalina 34 (Produkto).
- **CONTENT_MODULIU_ATPAZINIMAS.md:** Modulis 3 = 6 scenarijai.

**2026-02-11 (Modulio 2 testo tekstai – Žinių patikrinimas)**

- **Test-intro ir test-section:** Pavadinimas „Žinių patikrinimas“, subtitle „15 atsitiktinių klausimų iš nuolat atnaujinamo banko.“ `ModuleView.tsx` – enrichedIntro, singleTestSection, modulio subtitle; `modules.json` – Modulio 2 kortelės subtitle. Pašalintas dinaminis poolSize iš atvaizduojamo teksto.

**2026-02-11 (Ikonų patobulinimas – emoji → Lucide)**

- **Emoji pakeistos Lucide ikonais:** TestIntroSlide, PracticeIntroSlide (ListChecks, Target, Lightbulb, ClipboardCheck, Briefcase, BarChart2, TrendingUp, Users, Rocket); ModulesPage (badge: BookOpen, ClipboardList, Briefcase; completion: PartyPopper); PracticalTask, HomePage (Lightbulb, Sparkles); ContentSlides, BlockSlides (FileText, Lightbulb, BarChart2, Target, Sparkles). Dekoratyviniai elementai (🎯) – Target w-20 h-20.
- **Stilius:** `strokeWidth={1.5}` – plonesnės linijos; ikonų konteineriai `rounded-lg bg-*-500/10`; vienoda vizualinė hierarchija. AppNav, ModulesPage – navigacijos ir modulio ikonai su strokeWidth.

**2026-02-11 (Action-intro turinio ir UI patobulinimai)**

- **Hero tekstas:** „Tas pats klausimas“ → „Ta pati užduotis“; „Du visiškai skirtingi DI atsakymai“ → „Du skirtingi atsakymai“.
- **Hook (Variant A):** „Problema – ne DI. Problema – tavo promptas.“ – 1. eilutė 60% opacity, 2. bold + accent (geltona); line-height 1.5, 8–12px tarpas.
- **CTA:** „Pamatyk skirtumą per 30 sekundžių!“ (su šauktuku).
- **Pašalinta:** „Vienas sakinys → chaosas. 6 blokai → veikiantis atsakymas.“ (perteklinis).
- **Palyginimas:** „Chaotiškas promptas“ → „Tuščias promptas“; „Aiškus kontekstas, struktūra, laukiamas rezultatas“ → „Aiškus kontekstas, struktūra, rezultatas“.
- **Turinys:** „Šiame mokyme“ → „Šiuose mokymuose“; **Mąstymo modeliai:** „Linijinis (CoT) vs šakotas (ToT)“ → „Grandinės (CoT) vs Medžio (ToT) mąstymo modelis“.
- **DI įrankiai:** Pridėtas DeepSeek (6 kortelė – užpildo gridą, be „balto lopo“).

### Fixed

**2026-02-11 (ContentSlides.tsx – JSX sintaksė)**

- **Build klaida:** Action-intro skaidrėje (DALIS C) po `{revealed && (` buvo du vaikiniai elementai (grid div ir `{showTools && (...)}`) be wrapper – JSX reikalauja vieno šaknies elemento. Pridėtas React fragment `<>...</>` apgaubiant abu blokus. Build ir lint – OK.

**2026-02-11 (CODE_REVIEW: duomenys – dubliuotas id, rašyba)**

- **Dubliuotas skaidrės id Modulyje 4:** Dvi skaidrės turėjo `id: 66.5` („Savitikra: Tokenai“ ir „Neigiami promptai“). Progresas būtų žymėjęs abi užbaigtas vienu paspaudimu. Antrajai skaidrei („Neigiami promptai“) priskirtas `id: 66.6` (`src/data/modules.json`).
- **Rašybos klaida (warm-up-quiz, Tokenai):** Klausimas „Kiek apytiksliai simbolių ą 1 tokeną (anglų k.)?“ pataisytas į „Kiek apytiksliai simbolių yra 1 tokenas (anglų k.)?“ (`modules.json`).
- **CODE_REVIEW_ANALYSIS.md:** Atnaujinta data 2026-02-11, pridėta §1.3 „Gili analizė 2026-02-11“, P3 lentelėje įrašyti punktai 6–7 (dubliuotas id, rašyba).

### Added

**2026-02-10 (Modulio 1 skaidrė 1 – DI įrankiai blokas)**

- **DI įrankiams daugiau dėmesio:** Vietoj mažų nuorodų (text-xs) – apačioje aiškiai išskleidžiamas blokas „DI įrankiai – kur pradėti“. Intro tekstas (`toolsIntro`), kortelės kiekvienam įrankiui: pavadinimas kaip nuoroda (ryškus, ne mažomis raidėmis), trumpas aprašymas, „Populiariausi naudojimo atvejai“ (use cases tag’ai). Įrankiai: ChatGPT, Claude, Gemini, Copilot, Grok – su nuorodomis, aprašymais ir naudojimo atvejais.
- **Duomenys:** `ActionIntroContent` išplėstas: `tools[].description?`, `tools[].useCases?`, `toolsIntro?` (`src/types/modules.ts`). `modules.json` – Modulio 1 skaidrė 1: pilni įrankių aprašymai ir use cases.
- **UI:** Mygtukas „DI įrankiai – peržiūrėti“ dešiniajame stulpelyje (Trukmė + įrankių trigger); paspaudus – pilno pločio sekcija apačioje su grid kortelėmis. SOT: `turinio_pletra.md` Skaidrė 1 – skyrius D ir techninė implementacija atnaujinti.

**2026-02-10 (Modulio 3 UI/UX – Top praktikos #8, #10, #9, #1, #6)**

- **#8 Scenarijų lentelė su progresu:** Praktikos Įvado skaidrėje (Modulis 3) – 4 scenarijų kortelės su statusu (Užbaigta / Dar nepridėta), skaitiklis „X iš 4 scenarijų užbaigta“, paspaudus kortelę – navigacija į tą skaidrę. `PracticeIntroSlide` gauna `scenarioSlides`, `progress`, `onNavigateToSlide`; `ModuleView` skaičiuoja `practiceScenarioSlides` ir perduoda į `SlideContent`.
- **#10 Konkretūs CTA:** Modulio 3 „Pirmyn“ mygtukas rodo konkretų tikslą: „Pereiti prie Scenarijaus 2/3/4“ arba „Į Praktikos santrauką“ (desktop ir mobile). `nextSlideLabel` skaičiuojamas iš kitos skaidrės tipo.
- **#9 Hint tooltip:** Prie kiekvieno žingsnio (PracticalTask) – „Užuomina“ ikonėlė (HelpCircle) su `title={step.hint}` ir `aria-label` (hover/focus rodo užuominą).
- **#1 Tabs scenarijui:** Scenarijaus aprašymas – Kontekstas | Duomenys | Apribojimai | Rezultatas kaip skirtukai (viena sekcija vienu metu), mažesnė kognityvinė apkrova. `PracticeScenarioSlide` – `useState` activeTab, role="tablist"/tab/tabpanel, a11y.
- **#6 6 blokų checklist:** Virš PracticalTask textarea – 6 badge (META, INPUT, OUTPUT, REASONING, QUALITY, ADVANCED); užpildyti pažymimi CheckCircle ir emerald spalva pagal to, ar atsakyme yra atitinkamas žodis. Rodo tik kai užduotis turi 6 žingsnius (6 blokų užduotys).

**2026-02-10 (Modulio 1 ir 2 vizualinio stiliaus suvienodinimas)**

- **TestIntroSlide (Moduliai 2 ir 5):** „Testo struktūra“ ir „Tikslas“ kortelės perstylizuotos pagal Modulio 1 blokų sistemą: brand blokas (border-l-4 border-brand-500, bg-brand-50) ir accent blokas (border-l-4 border-accent-500, bg-accent-50). Žr. `docs/MODULIO_1_IR_2_VIZUALINIU_STILIU_IVERTINIMAS.md`.
- **Klausimų kortelės (Modulio 2 testas):** Prieš rezultatus – švelnus brand fonas (bg-brand-50/50, border-brand-200) vietoj baltos/pilkos; po rezultatų – emerald/rose lieka. Taikoma visiems 5 klausimų tipams (MCQ, True/False, Scenario, Matching, Ordering).
- **CTA „Patikrinti atsakymus“:** Gradientas (from-brand-500 to-accent-500) ir shadow, vizualiai atitinka Modulio 1 CTA stilių.
- **Skyriklis:** Plonas gradientinis skyriklis virš mygtuko „Patikrinti atsakymus“.
- **Tailwind safelist:** Pridėta bg-brand-50/50, dark:bg-brand-900/10.

**2026-02-10 (Modulio 2 F3-1 – confidence indicator)**

- **Pasitikėjimo pasirinkimas (F3-1):** Prieš atsakant į kiekvieną Modulio 2 testo klausimą rodomas metakognityvinis klausimas „Kaip esate tikri?" su trimis pasirinkimais: Tikras / Spėju / Nežinau. Atsakymo mygtukai įjungiami tik pasirinkus pasitikėjimą. Rezultatų ekrane prie kiekvieno klausimo rodoma „Pasitikėjimas: …". Naujas komponentas `ConfidenceSelector`, atnaujinti visi 5 klausimų tipai (MCQ, True/False, Matching, Ordering, Scenario).

**2026-02-10 (Modulio 2 F2-3 – remediation deep links)**

- **Remediation deep links:** Mygtukai „Peržiūrėti skaidrę X" Modulio 2 rezultatų ekrane dabar atidaro Modulį 1 tiesiai toje skaidrėje (be „Tęsti nuo X skaidrės?" dialogo). Įgyvendinta: `onGoToModule(moduleId, slideIndex?)`, App būsena `initialSlideIndex`, ModuleView prop `initialSlideIndex` ir `useSlideNavigation` parametras `initialSlideIndex`.

**2026-02-09 (v2.5.0 – Modulio 2 interaktyvaus testo pertvarka: 5 klausimų tipai)**

Remiantis 2025-2026 e-learning geriausių praktikų tyrimu (Retrieval Practice, Bloom taksonomija, Gamification, Adaptive Scaffolding):

- **5 klausimų tipai:** MCQ (standartinis), True/False (tiesa/netiesa), Matching (porų sujungimas), Ordering (rikiavimas), Scenario-based (verslo scenarijus) – vietoj vienodo MCQ formato.
- **15 klausimų** (buvo 12): padidinta įvairovė, kiekvienas klausimas turi Bloom lygį (1-4), kategoriją (meta/input/output/...) ir nuorodą į Modulio 1 skaidrę.
- **Progressive Hints sistema:** kiekvienas klausimas turi užuominą. Neteisingai atsakius – mygtukas „Rodyti užuominą". Užuomina sumažina balą (0.5 vietoj 1 taško).
- **Gamifikacija:** Streak indikatorius (3+ teisingi iš eilės), „Puikiai!" ženklelis (visas testas teisingai), per-sekcijų animacijos.
- **Per-bloko žinių žemėlapis:** rezultatų ekrane rodomas 8 kategorijų žemėlapis su nuorodomis į konkrečias Modulio 1 skaidres (remediation).
- **Nauji komponentai:** `McqQuestion`, `TrueFalseQuestion`, `MatchingQuestion`, `OrderingQuestion`, `ScenarioQuestion` (`src/components/slides/shared/questions/`).
- **Tipų sistema:** `QuestionType = 'mcq' | 'matching' | 'ordering' | 'true-false' | 'scenario'`; `TestQuestion` išplėstas su `type?`, `hint?`, `bloomLevel?`, `relatedSlideId?`, `category?`, `matchPairs?`, `correctOrder?`, `items?`, `isTrue?`, `scenarioContext?`.
- **Backward compatible:** Modulio 5 ir WarmUpQuiz klausimai veikia be pakeitimų (klausimai be `type` = MCQ).
- **A11y:** visi komponentai turi aria-label, dark mode, min 44px touch targets.

### Fixed

**2026-02-09 (Mobile UI responsiveness + UI/UX konsistencija)**

- **P1 – 7 neresponsyvių gridų taisymas (mobile):** Visos `grid-cols-2` vietos be mobilaus breakpoint pakeistos į `grid-cols-1 sm:grid-cols-2` arba `grid-cols-1 md:grid-cols-2`. Paveikti komponentai: ActionIntroSlide outcomes/topics (ContentSlides.tsx:824), ComparisonSlide (ContentSlides.tsx:1794), SummarySlide learned/next (ContentSlides.tsx:2315), OutputBlockSlide (BlockSlides.tsx:139), TestIntroSlide (TestPracticeSlides.tsx:20,56), TestResultsSlide (TestPracticeSlides.tsx:311). Mobiliajame – vienas stulpelis, nuo `sm:`/`md:` – du stulpeliai.
- **T1 – Blokų antraščių hierarchija standartizuota:** 6 vidinių H3 heading'ų (`text-xl` → `text-lg`) spalvotų blokų viduje: ModuleIntroSlide „Po šio modulio galėsite" ir „Kodėl konteksto inžinerija?", IntroSlide „Apie šį mokymą" ir „Kokius DI įrankius naudoti?", WarmUpQuizSlide „Pasiruošimo savitikra baigta", PracticeIntroSlide „Projekto tikslai". Pagrindiniai slide pavadinimai lieka `text-xl`.
- **T2 – Dark mode subtitle kontrastas pagerintas:** Visos `text-gray-600 dark:text-gray-300` instancijos pakeistos į `dark:text-gray-200` (ryškesnis kontrastas tamsoje). Paveikti: HomePage (hero subtitle, tag badges), PromptLibrary (copy button), HallucinationRatesDashboard (rate label).

### Added

**2026-02-09 (v2.4.2 – DefinitionsSlide: veiksmo modelis)**

- **DefinitionsSlide perstruktūruotas:** Vietoj pasyvaus teksto -- interaktyvus click-to-reveal modelis. Tamsus provokuojantis hook ("Kiekvieną kartą rašydami DI -- jūs rašote promptą. Klausimas: ar darote tai struktūriškai?"). Dvi kortelės (Promptas + Promptų Inžinerija) -- paspaudus atskleidžia apibrėžimus su animacija. 3 dedamosios (Specifikacija, Struktūra, Iteracija) rodomos tik po Inžinerijos atskleidimo su slide-in animacija. Key Insight banner su bounce-in efektu pasirodo tik kai abu terminai atskleisti. Šaltiniai collapsible.

**2026-02-09 (v2.4.1 – ActionIntroSlide v2: provokacija + emocinis hook)**

Remiantis vartotojo kelionės analize (`vartotojo_kelione.md`): emocinis hook buvo 5/10, CTA per švelnus, veiksmas per lėtas (30s vs tikslas 5-7s).

- **ActionIntroSlide v2:** Visiškai perrašyta pirmos skaidrės semantika. Hero blokas: provokuojanti antraštė ("Tas pats klausimas. Du visiškai skirtingi DI atsakymai.") + konflikto eilutė ("Skirtumas – ne modelis. Skirtumas – prompto struktūra.") + CTA mygtukas hero viduje ("Parodyk skirtumą") su pulse animacija. Tamsus fonas (gray-900) vietoj brand gradiento – didesnis vizualinis kontrastas.
- **CTA hero viduje:** Mygtukas perkeltas iš atskiros micro-action sekcijos tiesiai į hero bloką. Pirmas veiksmas per 5-7 sek (buvo ~30 sek).
- **Side-by-side reveal:** Po CTA paspaudimo animuotai atsiskleidžia blogas vs geras promptas. Geresni anotaciniai tekstai: "DI spėlioja" vs "Aiškus kontekstas, struktūra, laukiamas rezultatas."
- **Nauji TypeScript laukai:** `heroSubText?: string` (konflikto eilutė), `ctaText?: string` (konfigūruojamas CTA) – `ActionIntroContent` interface.
- **Outcomes perrašyti:** Konkretesni, veiksmingesni ("Rašyti promptus, kurie duoda nuspėjamą rezultatą" vietoj "Struktūruoti promptus profesionaliai").

**2026-02-09 (v2.4.0 – Vartotojų testų atsakas: UX patobulinimai)**

Remiantis vartotojų testais su 2 dalyviais (Moduliai 1-3): `20260209_user_tests.md`

- **Pirma veiksmo skaidrė (`action-intro` v1):** Hero blokas (2x statistika) + micro-action (nestruktūruotas vs struktūruotas promptas su reveal mygtuku) + sutrumpintas kontekstas su collapsible įrankiais. Naujas `ActionIntroSlide` komponentas, `ActionIntroContent` TypeScript tipas.
- **Resume / State Save:** Slide pozicija persisted localStorage (`prompt-anatomy-slide-pos`). Naujas „Sveiki sugrįžę!" resume prompt su „Tęsti" / „Nuo pradžios" mygtukais. `useSlideNavigation` grąžina `savedSlidePosition`.
- **Praktinės užduoties apsauga:** `beforeunload` perspėjimas kai vartotojas turi neišsaugotą darbą. Persistent „Juodraštis išsaugotas" indikatorius `PracticalTask` komponente.
- **Grupuotas progreso indikatorius:** `SlideGroupProgressBar` su etapų pavadinimais (Pagrindai / Šablonas / 6 Blokai / Santrauka). Spalvų kodavimas pagal aktyvią/praėjusią/būsimą grupę.
- **Kognityvinės apkrovos mažinimas:** Supaprastinti Modulio 1 skaidrių 2-3 tekstai (definitions, workflow intro).

### Changed

**2026-02-09 (Modulio 4 skaidrė 4.0 – veiksmo modelis + 4.0-praktika optional)**

- **Skaidrė 39 (4.0 „DI Visata: kaip viskas susiję"):** Pritaikytas veiksmo skaidrės modelis (Trumpai → Daryk dabar → Kopijuojamas promptas → Patikra → Nori suprasti detaliau?). comparisonImages lieka viršuje. practicalTask perkeltas į section su `copyable`. Esminė žinutė + Terminai – collapsible sekcijoje. Informacija neprarasta, tik pertvarkyta.
- **Skaidrė 39.5 (4.0-praktika „Praktika: DI visata"):** Subtitle pakeistas į „Neprivaloma: ..."; pridėta pirma sekcija su aiškiu „Ši praktika neprivaloma" framing.
- **SOT atnaujinta:** `docs/turinio_pletra_moduliai_4_5_6.md` – 4.0 ir 4.0-praktika skyriai atnaujinti pagal naują struktūrą.
- **Planas:** `.cursor/plans/modulio_4.0_veiksmo_skaidrė_+_praktika_optional_9b87251a.plan.md` – agentų seka (CONTENT → DATA → CODING → CODE_REVIEW → QA).

### Fixed

**2026-02-09**

- **ContentSlides.tsx:** Pridėtas trūkstamas `useEffect` importas
- **ContentSlides.tsx:** Apsauga nuo trūkstamo `content.terms` (GlossarySlide) ir `content.learningOutcomes` (ModuleIntroSlide) – `?? []` prieš .map (gili analizė: `docs/development/CODE_REVIEW_2026-02-09_ANALIZE_PALEIDIMAS.md`)

### Changed

**2026-02-09 (Modulio 1 Advanced skaidrės – veiksmo intro)**

- **Variantas B įgyvendintas:** Skaidrėms 11 (Advanced Parameters) ir 18 (Advanced Parameters II) pridėtas viršutinis veiksmo blokas (Trumpai, Daryk dabar, Patikra) iš JSON. Tipai: `AdvancedVeiksmoIntro`, `AdvancedVeiksmoIntroContent` (`modules.ts`). `content.veiksmoIntro` skaidrėms 11 ir 18 – `modules.json`. `BlockSlides.tsx`: `VeiksmoIntroBlock`, abu Advanced komponentai priima `slide` ir rodo intro viršuje; esamas turinys (lentelės, pavyzdžiai, details) nepakeistas. Analizė: `docs/archive/MODULIO_1_ADVANCED_SKAIDRIU_VEIKSMO_PRAKTIKOS_ANALIZE.md`.

**2026-02-09 (Dar 3 skaidrės – veiksmo modelis: 49, 65.5, 58)**

- **Planavimas:** `docs/development/PLAN_AGENTAI_3_SKAIDRES_VEIKSMAS.md` – parinktos skaidrės 49 (5 principai), 65.5 (Bridžinė praktika), 58 (RAG); agentų seka CONTENT → DATA → CODE_REVIEW → QA.
- **Skaidrės 49, 65.5, 58** perdarytos pagal 5 blokų veiksmo modelį (Trumpai → Daryk dabar → Kopijuojamas promptas → Patikra → 🔽 Nori suprasti detaliau?). 49: vertinimo promptas copyable, 5 principai + Kodėl svarbu + Toliau – optional. 65.5: 2 promptų šablonas (RAG + Deep research), 3 žingsniai + Savirefleksija – optional. 58: RAG mini-šablonas (kontekstas + klausimas), teorija (Kas yra RAG, Nauda, Kaip veikia, tokenai, Pagalvok apie darbą) – optional. Esmė išlaikyta.

**2026-02-09 (Skaidrės 54.5, 55, 43 – tobulinimas pagal agentų seką)**

- **Agentų seka:** Sukurtas `docs/development/AGENT_SEQUENCE_SKAIDRES_SYSTEM_PROCESO_STRUKTURUOTAS.md` – CONTENT_AGENT → DATA_AGENT → CODE_REVIEW → QA pipeline trijų skaidrių turiniui tobulinti be esmės keitimo.
- **System prompt (54.5), Proceso prompt (55), Struktūruotas procesas (43):** Vienodinta Quality check formuluotė („Jei bent 2 „ne“ → grįžk prie…“), optional antraštė „🔽 Nori suprasti detaliau? (optional)“, CTA „Kopijuoti promptą (žemiau)“ skaidrėje 55, taisoma „Pradinis užklausas“ → „Pradinis užklausa“ (43), „ką daryti pirmu žingsniu“ visur. Esmė nekeista.

**2026-02-08 (Modulio 4 visapusė analizė ir tobulinimas – 5 fazių planas)**

- **FAZĖ 1 – Struktūra ir eiliškumas:** `module-intro` (id 40) perkeltas iš 18-os pozicijos į 1-ą – mokinys mato mokymosi tikslus iš karto. Pridėtos 3 naujos `section-break` skaidrės (id 40.5, 52.5 atnaujinta, 65.8) – navigaciniai orientyrai po kiekvienos loginės dalies. 6 skaidrės pažymėtos `optional: true` (id 46, 46.5, 47, 51, 52, 61). `Slide` tipas papildytas `optional?: boolean` lauku.
- **FAZĖ 2 – Pedagoginis sustiprinimas:** 3 savitikros (id 63.5, 65.7, 66.5) išplėstos nuo 2 iki 5 klausimų. Pridėta nauja savitikra po haliucinacijų (id 68.5 – 4 klausimai: manipuliacijos, injection vs jailbreak, haliucinacijos, jų mažinimas). 2 naujos „Pataisyk šį promptą" skaidrės (id 49.5 po 5 principų, id 67.3 po manipuliacijų). Bridžinė praktika (id 65.5) išplėsta iki 6 sekcijų su 3 žingsnių struktūra ir savirefleksija.
- **FAZĖ 3 – UI/UX tobulinimai:** Desktop progress indikatorius „Skaidrė X/Y" header zonoje. „Papildoma" badge optional skaidrėms (amber spalvos, tamsaus režimo palaikymas). Per-slide `ErrorBoundary` su graceful fallback (galimybė pereiti prie kitos skaidrės, jei viena sugenda).
- **FAZĖ 4 – Silpniausių skaidrių turinio kokybės pakėlimas:** id 41 (di-modalities) – patobulinti intro/takeaway su prioritetais; id 53 (Pagrindiniai įrankiai) – pridėta 5×4 palyginimo lentelė su kainomis ir stiprybėmis; id 66 (Tokenų ekonomika) – pridėta lentelė su modelių konteksto langais, konkretūs pavyzdžiai (A4 = 500 tokenų); id 56, 57 (Schemos 3, 4) – pridėti praktiniai taikymo pavyzdžiai.

**2026-02-08 (Promptų inžinerijos skaidrių perkėlimas ir tobulinimas)**

- **Modulio 4 skaidrių eilė – promptų inžinerija prieš GPT kūrimą:** 3 skaidrės (System prompt vs Master prompt, Proceso prompt, Metodinis vs Agentinis) perkeltos prieš Custom GPT kūrimo procesą (id 46). Nauja eilė: 4 dedamosios → System vs Master → Proceso prompt → Metodinis vs Agentinis → Custom GPT. Pedagoginė logika: pirmiausia sąvokos, tada taikymas.
- **Skaidrė 54.5 (System prompt vs Master prompt) – visiškai perrašyta:** 5 plain sections → 7 sections su vizualine hierarchija. Pridėta: 5×3 palyginimo lentelė (System vs Master), blockVariant (brand/terms/accent), 2 copyable blokai (Prieš vs Po), practicalTask (Master Prompt generatorius – DI užduoda 10 klausimų). SOT atitiktis.
- **Skaidrė 55 (Proceso prompt) – perrašyta, pašalintas „Optional:":** Pavadinimas „Proceso prompt ir workflow sudarymas" (ne Optional). Pridėta: „Geras vs blogas" palyginimo lentelė (2×4), blockVariant brand kiekvienam šablonui, situacijos kontekstas prie kiekvieno šablono, accent „Esmė" blokas. copyable: boolean → string (teisingas tipas).
- **Skaidrė 54 (Metodinis vs Agentinis) – patobulinta:** 4 → 6 sections. Pridėta: 5×3 palyginimo lentelė, accent „Esmė" blokas su key insight (abu tipai kartu), terms „Kaip atskirti?" su 4 patikros klausimais. Copyable promptai patobulinti (formatuoti, su kalba).

**2026-02-08 (Modulio 4 tobulinimo planas)**

- **Diagnostinis quiz feedback:** 3 warm-up-quiz (id 63.5, 65.7, 66.5) atsakymai perrasyti diagnostiniu tonu ("Cia stipru", "Puiku", "Jei supainiojote – prisiminkite") vietoj neutralaus "Teisinga/Neteisinga".
- **UI heading hierarchy:** ContentBlockSlide sekciju antrastes (h4) pakeistos is `font-bold` i `font-semibold` – aiski vizualine skirtis nuo bloku antrasciu (h3 `font-bold text-xl`).
- **Dark mode subtitle kontrastas:** 3 vietos su `dark:text-gray-500` pakeistos i `dark:text-gray-400` (ContentSlides – comparisonImages source, journal); PracticalTask Chevron ikonos – pridetas `dark:text-gray-400`.
- **Tap highlight:** `summary` elementai itraukti i mobile touch target taisykles; CSS details/summary disclosure marker paslepstas.

### Added

**2026-02-08 (Modulio 4 tobulinimo planas)**

- **Skaidre 55 (Proceso prompt) – pilnas turinys:** 6 sekcijos: kas yra proceso promptas, geras vs blogas pavyzdys, 3 copyable sablonai (strateginis, projektu valdymo, operaciju tobulinimo), accent takeaway.
- **Asmeninio konteksto miniuzduotys:** Skaidre 58 (RAG) – accent blokas "Pagalvokite apie savo darba" (kokie dokumentai kartojasi, kaip naudoti RAG). Skaidre 67 (Manipuliacijos) – accent blokas "Pagalvokite apie savo patirti" (situacija su salisku atsakymu).
- **"Pataisyk prompta" praktika:** Skaidre 67 – 2 saliski promptai su problemomis + pataisyti neutralus variantai (verslo manipuliacija, leading question).
- **Progressive disclosure (AdvancedParameters2Slide):** 4 parametru sekcijos (Max Tokens, Top-p, Frequency Penalty, Presence Penalty) apvilktos `<details>/<summary>` – Max Tokens open by default, kiti collapsible. CSS stiliai details/summary.
- **Bug fix:** TestPracticeSlides.tsx – pridetas trukstamas `useEffect` importas.

**2026-02-08**

- **Skaidrė 4.1a3 (RL/RLHF) – antraščių valymas ir žodyno sinchronas:** Pašalintos vidinės pastabos iš antraščių: "(be žmonių)", "(privaloma palyginimo dalis)", "(su žmonėmis)" – distinkcijos perkeltos į body tekstą kaip bold teiginiai. Diagramos pavadinimas "RL struktūra (labai svarbu parodyti)" → "RL proceso struktūra". Žodyne (glossary.json) pridėti 4 nauji terminai: RL, Paskatinamasis mokymas, Atlygis (reward), Agentas (DI kontekste); pataisytas RLHF apibrėžimas ("with" → "from Human Feedback").

### Added

**2026-02-08**

- **Skaidrės 4.1a5, 4.1a5-style, 4.1a5-practice – pilnas turinys pagal SOT:** Skaidrė 50 (Parametrų laukas promptų inžinieriui) – 8 sekcijų: brand įvadas, 6 parametrų grupės (sisteminiai, metodiniai, turinio, manipuliacijų, kokybiniai, techniniai), accent takeaway. Skaidrė 51 (Stilių naudojimas) – 12 sekcijų: 5 stiliaus dimensijos (tonas, stilius, auditorija, kalba, struktūra), accent „kaip nurodyti", 4 copyable pavyzdžiai, terms ryšys su 6 blokais. Skaidrė 52 (Praktinės užduotys) – 13 sekcijų: 3 stilių promptai, 3 el. laiškų promptai, HTML kūrimo 5 blokų lentelė + copyable pilnas promptas, terms ryšys su Moduliu 1. SOT sinchronizuotas.
- **Skaidrė 4.1a3 (RL/RLHF) – verslo situacijos ir promptų pavyzdžiai:** 2 verslo situacijos (RL: el. parduotuvės kainų optimizavimas; RLHF: klientų el. laiškų rašymas) pridėtos į esamus 1️⃣ ir 2️⃣ blokus. 2 nauji blokai su `copyable` promptais: 4️⃣ RL prompto pavyzdys (3 variantai + savęs atranka pagal KPI), 5️⃣ RLHF prompto pavyzdys (3 variantai + žmogaus feedback + galutinis laiškas). Sekcijos pernumeruotos 1–7. SOT (`turinio_pletra_moduliai_4_5_6.md`) sinchronizuotas.
- **Promptų porų atvaizdavimas:** Dokumentas `docs/development/PROMPTU_PORU_ATVAIZDAVIMAS.md` (checklist, referencinė skaidrė id 54). Skaidrė 54 (Metodinis vs Agentinis) – 4 sekcijos, copyable pavyzdžiai, blokas „Ką analizuoti“ (terms).
- **Skaidrė 4.1a3 (RL/RLHF):** Pilnas turinys (5 blokai, lentelė RL vs RLHF), content-block lentelės palaikymas (`ContentBlockTable`, semantinė `<table>`); interaktyvi RL proceso diagrama (`RlProcessBlock`, clickable žingsniai, „Tu esi čia“, SCHEME_AGENT 3.6). Agentų seka `SLIDE_4_1a3_RL_RLHF_AGENT_SEQUENCE.md`.
- **Skaidrė 4.1a4 (5 principai):** Outcome-driven skaidrė (5 principai veiksmo forma, „Kodėl tai svarbu?“, practicalTask vertinimo promptas), user journey (subtitle, „kur paleisti“, sekcija „Toliau“). Prompt library – „Prompto kokybės patikrinimas“. Dokumentacija: `USER_JOURNEY_4_1a4_5_PRINCIPAI.md`, `AGENT_SEQUENCE_PATARIMAI_INZINIERIUI.md`.
- **Refaktoringo analizė:** `docs/development/CODEBASE_REFACTORING_ANALYSIS.md` – eilučių skaičiai, MUST/SHOULD prioritetai; TODO skyrius „Refaktoringas ir konsolidacija“.
- **SlideContent apsauga:** Fallback UI ir logWarning, kai trūksta `content` (module-intro, content-block, section-break, warm-up-quiz, glossary). Išplėsta `fallbackMissingContent()` 11 tipams (definitions, di-modalities, pie-chart, ai-workflow, prompt-types, prompt-techniques, workflow-summary, prompt-template, transition, summary, infographic).
- **ContentSlides apsaugos:** `?? []` prieš `.map()` ten, kur JSON gali neturėti masyvo (sections, table.headers/rows, questions, aspects, cards/stats/insights) – išvengiama „cannot read map of undefined“.

**2026-02-07**

- **Modulio 4 – DI prezentacijos workflow (skaidrė 47):** 5 žingsnių diagrama (Tikslas → … → Poliravimas), `DiPrezentacijosWorkflowBlock` (clickable, „Tu esi čia“, žingsnių mygtukai), atskiri blokai workflow + įrankiai (6 kortelės su nuorodomis). SCHEME_AGENT 3.6 interaktyvumo UX. Prezentacijos artefaktas/atsisiuntimas – fiksuota (funkcija ateityje); TODO/ROADMAP.
- **Skaidrė „4 dedamosios“:** UI/UX T1–T3 (accent „Esmė“, workflow tooltips, „Praktiškai:“ paryškinimas); `ContentBlockWorkflowImage.tooltip`.
- **Modulio 4 DI visata ir pradžia:** EnlargeableImage (lightbox), skaidrė „Praktika: DI visata“ (id 39.5), recognitionExercise.explanations, žodynėlio raktažodžiai, „4 dedamosios“ workflowImages (2 .png), analizės dokumentai.
- **Modulio 4 SHOULD S1–S6:** S1 kontekstas/tokenai (id 58); S4 bridžinė praktika (id 65.5); S5 „Optional:“ prie 6 skaidrių; S6 `shortTitle` (6 skaidrėms). PLAN_MODULIO_4_SHOULD_S1_S6.md, MODULIO_4_SKAIDRIU_EILES atnaujinta.
- **Modulio 4 S3 (CoVe):** SOT 4.6 „Verifikacijos grandinė (CoVe)“; skaidrė 68 – sekcija „Giluminiam: CoVe“.
- **Modulio 4 MUST M4:** Skaidrė „Saugumas: prompt injection ir jailbreak“ (id 67.5); SOT 4.5.
- **Content-driven skaidrės (P2):** intro, hierarchy (id 4), comparison (id 13), summary (id 14), practice-summary (id 35) – turinys iš JSON, default reikšmės.
- **4.6 CopyButton (M3):** `ContentBlockSection.copyable` – skaidrė 68 anti-haliucinacinis šablonas ir 5 taisyklės.
- **SCHEME_AGENT:** `docs/development/SCHEME_AGENT.md` – schemų agentas, geriausios praktikos (geometrija, rodyklės); prijungtas prie orkestratoriaus.
- **Custom GPT proceso diagrama:** Interaktyvus stepperis (1 žingsnis = 1 ekranas), clickable diagrama, žingsnių mygtukai, patarimai, copyable šablonas, refleksija.
- **Dokumentacija:** MODULIO_4_TURINIO_ANALIZE.md, MODULIO_4_SKAIDRIU_EILES.md, PLAN_AGENTAI_DARBAI.md; README (SOT 4–6, treniruoklis); ROADMAP (Pedagoginės įžvalgos).

**Anksčiau (konfigūracija ir docs)**

- ESLint, Prettier, EditorConfig, Cursor rules (`.cursorrules`), dokumentacijos reorganizacija (`docs/`), CHANGELOG formatas, code evaluation dokumentas.

### Changed

**2026-02-08**

- **RL proceso diagrama (SCHEME_AGENT):** Aiškus ciklas – pagrindinė seka (Agentas → Aplinka → Veiksmas → Atlygis) + atskira solid grįžtamoji rodyklė (Atlygis → Agentas), be punktyro. Rodyklės su 12px tarpu nuo box kraštų; „Atlygis“ vizualiai akcentuotas (accent gradientas, shadow). Mintinis modelis po schema: viena eilutė „Padarau → gaunu rezultatą → koreguoju elgesį“ (be kabučių) – `RlProcessBlock`. Responsive: desktop viena eilė, mobile 2×2 grid (`useIsCompact()`). **UI/UX perstatymas:** 2 rodyklių tipai (Forward #7B8794 solid 3px vs Feedback ACCENT dashed); feedback kilpa su rankiniu polygon arrowhead (ne SVG marker), start circle, rounded corners (Q bezier R=16); forward etiketės virš rodyklių su punktyriniu connector ir TEXT_DARK kontrastu; viewbox 280→330, ARROW_GAP_FWD 12→5; SCHEME_AGENT doc §3.7 horizontalaus layout pamokos.
- **Skaidrė 4.1a3 (RL/RLHF) – pateikimas:** blockVariant (brand/terms/accent) sekcijoms; lentelės `aria-label` „Palyginimo lentelė: RL ir RLHF“; `SLIDE_4_1a3_RL_RLHF_AGENT_SEQUENCE.md` §3 (pateikimo tobulinimo seka, checklist).
- **Modulio 4 skaidrių eilė:** 5 principai (4.1a4) prieš RL/RLHF (4.1a3) – `modules.json` 47→49→48→50; SOT, MODULIO_4_SKAIDRIU_EILES, TODO sinchronizuoti.
- **progress.ts:** Pastaba apie trupmeninius `slide.id` (0.5, 13.5); dokumentacija completedTasks.
- **CODE_REVIEW_ANALYSIS.md:** Skyrius 1.2 – SlideContent fallback, progress.

**2026-02-07**

- **Skaidrė 47 (prezentacijos):** Workflow ir įrankiai atskiri blokai; clickable diagrama, „Tu esi čia“, žingsnių mygtukai; SCHEME_AGENT 3.6.
- **Skaidrė „4 dedamosios“:** blockVariant accent (ne brand); workflow tooltips; „Praktiškai:“ accent.
- **UI/UX (Modulio 4):** Įvado accent „Kodėl konteksto inžinerija?“; content-block default/terms; **bold** → font-bold; H3 text-xl; subtitle dark; mobilus tap highlight.
- **RAG (4.2) ir 4.6 (M2/M3):** SOT ir modules.json – „Nežinau“, citavimas; 4.6 copyable blokai.
- **Vartotojo testavimas:** Quiz (2 mod.) – grįžus rodomas paaiškinimas/teisingas atsakymas; Modulio 3 – „Pirmyn“ blokuojamas kol neįvykdyta praktinė užduotis.
- **Orkestratorius:** SCHEME_AGENT į routerį; QA_AGENT leidžiamas (`.cursor/rules/agent-orchestrator.mdc`, AGENT_ORCHESTRATOR.md).
- **Custom GPT diagrama:** Rodyklės kraštas į kraštą, proporcingi antgaliai; Quiz scroll į pirmą klaidingą atsakymą.
- **SOT Modulio 4:** 4.7 „Ryšiai tarp temų“; 4.2 „Kontekstas ir tokenai“; nuoroda į MODULIO_4_SKAIDRIU_EILES.
- **package.json:** author, repository, bugs, homepage.
- **Dokumentacija:** Nuorodos `.cursorrules`, `project.md`; root – tik aktualūs dokumentai.

### Removed

- Originalūs dokumentacijos failai root kataloge (perkelti į `docs/`).

---

## Ankstesnis versijų žymėjimas (2.x ir 1.0.0)

Žemiau – senesnis changelog įrašas, kai projektas naudojo **2.x** (2026-02 pradžia) ir **1.0.0** (2024). **Dabartinė produkcijos eilė** aprašyta aukščiau: **[Unreleased]**, **[1.3.0]**, **[1.2.0]**. Oficiali versija – `package.json` ir `README.md`.

---

## [2.1.0] – 2026-02-02

### Added

- Error Boundary komponentas su retry funkcija
- Loading states su LoadingSpinner komponentu
- Lazy loading visiems dideliems komponentams
- TypeScript tipai centralizuoti `src/types/modules.ts`
- localStorage validacija su versijavimu (v1/v2)
- Automatinė migracija senų duomenų formatui
- Testų infrastruktūra (Vitest + React Testing Library)
- 21 unit testas progress.ts (100% coverage)
- 6 integration testai
- CI workflow (GitHub Actions)
- Klaidų logavimas su context (`src/utils/logger.ts`)

### Changed

- SlideContent.tsx refaktorintas į mažesnius komponentus
- CopyButton fix – individualus state kiekvienam mygtukui
- Tailwind safelist – dinaminės spalvų klasės veikia produkcijoje

---

## [2.0.0] – 2026-02

### Added

- Skaidrė "Ką Reiškia Promptas?" su apibrėžimais
- Skaidrė "Pagrindiniai Promptų Tipai" (sisteminiai, kontekstiniai, vaidmens)
- Promptų biblioteka su instrukcijomis
- 13 skaidrių vietoj 11 pirmame modulyje

### Changed

- AI → DI (Dirbtinis Intelektas)
- Pataisyta lietuvių kalbos gramatika
- Atnaujinta spalvų schema (Navy/Gold)

---

## [1.0.0] – 2024

### Added

- Pradinė versija su 3 moduliais
- Progreso sekimas (localStorage)
- Automatinis juodraščių išsaugojimas
- Tamsusis/šviesusis režimas
- Responsive dizainas
- Klaviatūros navigacija
- Šventimo animacijos (confetti)
