# SCHEME_AGENT – schemų ir diagramų agentas

> Pavaldus **CONTENT_AGENT**. Tvarko proceso diagramas, schemas (SVG, flowchart, proceso vizualizacijas) pagal projekto geriausias praktikas.

## Agent contract (EN)

- **Role:** Own diagram geometry, arrows, layout model/view split.
- **Does NOT:** Copy semantics (CONTENT_AGENT owns labels).
- **Trigger:** `*Diagram*.tsx`, `ProcessStepper.tsx`, SVG schema.
- **Skill:** `.cursor/skills/scheme-agent/`
- **Handoff:** → CODE_REVIEW_AGENT: Schemu CODE_REVIEW checklist block (§5).
- **Registry:** `AGENTS.md` §Agents.

---

## 1. Rolė ir pavaldumas

- **Rolė:** Schemų ir diagramų (proceso, flowchart, SVG) struktūros, geometrijos ir vizualinės hierarchijos prižiūrėtojas.
- **Pavaldus:** CONTENT_AGENT – turinio (tekstai, žingsnių pavadinimai, CTA) semantiką nustato CONTENT_AGENT; SCHEME_AGENT užtikrina, kad schema atitinka tą turinį ir projekto vizualines taisykles.
- **Nedirba:** Mokymų tekstų redagavimo (tai CONTENT_AGENT), bendro UI komponentų kodo (tai CODING_AGENT) – tik schema/diagramos geometrija, rodyklės, proporcijos, SOT schemai.

---

## 2. Source of Truth schemoms

| Sritis                                                                                            | SOT / failai                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Proceso diagramos (Custom GPT ir pan.)**                                                        | `src/components/slides/shared/CustomGptProcessDiagram.tsx`, `ProcessStepper.tsx`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **RL proceso diagrama (Agentas→Aplinka→Veiksmas→Atlygis)**                                        | `RlProcessDiagram.tsx`, `RlProcessBlock.tsx` – 2 rodyklių tipai (forward grey, feedback ACCENT dashed), etiketės virš rodyklių                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| **DI prezentacijos workflow (interaktyvus)**                                                      | `DiPrezentacijosWorkflowDiagram.tsx`, `DiPrezentacijosWorkflowBlock.tsx` – 3.6 interaktyvumo UX kelias                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Suvienyta schema (DI sistema su įrankiais ir atmintimi)**                                       | **ARCHYVUOTA (2026-06): nebewired, `modules.json` neturi „schema3" rakto; skaidrė 56 dabar `llm_arch_diagram` (žr. eilutę „Agentinė vizualizacija").** Istorinė: `Schema3InteractiveBlock.tsx` + `Schema3InteractiveDiagram.tsx` – interaktyvi suvienyta schema (pagrindinis srautas + atminties sluoksnis, punktyrinė „pasirinktinis įrašymas“); `schema3Layout.ts` – geometrijos SOT; `Schema3Diagram.tsx` – statinė kopija. „Peržiūrėti pilname dydyje“ – `EnlargeableDiagram` atidaro **tą patį React** modale. Multimodalinė įvestis/išvestis – tik tekste (optional collapsible skaidrėje), ne ant diagramos.                                                                                                                                                                                                                                                                                                                       |
| **Schema 4 (archyvas / atskiras komponentas)**                                                    | `Schema4Diagram.tsx`, `schema4Layout.ts` – nebenaudojami skaidrėse; suvienyta į vieną skaidrę (id 56) su schema3.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **DI sistemos veikimo režimai (4.1c, LlmArch W6)**                                                | `LlmArchDiagramBlock.tsx` + `LlmArchDiagramDiagram.tsx` – Pattern `comparison-mode-architecture` (Shell=Ne): Bazinis/RAG/Agentinis; `llmArchLayout.ts` + `llmArchReturnPath.ts`. Mode-absent = dashed + „Neaktyvu“. „Peržiūrėti pilname dydyje" – `EnlargeableDiagram`. Premium key `llm_arch`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **Modulis 4 – promptų režimo lab (54)**                                                           | **Lab (no Shell):** `M4PromptModeSimulatorBlock` (`m4_prompt_mode_simulator`, Pattern `interactive-control-lab`) – `m4PromptModeContent.ts` + `m4PromptModeModel.ts` + `m4PromptModeLabTokens.ts` (W1.1 axis strip: duomenys × metodika). Registry: `DIAGRAMU_M1_M9_AUDITAS.md`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **Agentų orkestratorius (M12) – legacy**                                                          | `AgentOrchestratorDiagram.tsx`, `AgentOrchestratorBlock.tsx` – **ne wired** learner skaidrėms. M12 **120.5** naudoja aktyvią verslo multi-agent React diagramą `M12MultiAgentSchemaBlock` per `m12_multi_agent_schema`; tai nėra meta AGENTS.md orkestratoriaus schema.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **Modulis 7 – analizės tipai, paruošimas, 3 agentai, MASTER, haliucinacijų grandinė**             | `m7DiagramContent.ts`; `M7AnalysisTypesDiagram/Block`, `M7DataPrepWorkflowDiagram/Block`, `M7ThreeAgentsBlock`; bendras 8 žingsnių vaizdas – `M9DataWorkflowBlock` (`context="m7_master"`) + `M9DataWorkflowDiagram` (`diagramContext="m7_master"`). **67.7** `hallucination-pipeline` – `HallucinationPipelineBlock` / `HallucinationPipelineDiagram` + `hallucinationPipelineContent.ts` + `useAutoplaySteps` (HTML icon-chain + autoplay etalon, Shell=Taip). `modules.json` image raktai: `m7_analysis_types`, `m7_data_prep_workflow`, `m7_three_agents_flow`, `m7_master_workflow`.                                                                                                                                                                                                                                                                                                                                                 |
| **Modulis 9 – 8 žingsnių duomenų ciklas**                                                         | `M9DataWorkflowDiagram.tsx`, `M9DataWorkflowBlock.tsx`, `m9DataWorkflowContent.ts`. Skaidrė id 93 – `m9_data_workflow`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **Modulis 10 – trigger, 3A, žmogaus kontrolė, depth/roles, medis, spec/incident, orkestratorius** | Shell: `AgentWorkflowBlock` (10.2, LMS etalonas density=hero + agentWorkflowLayout.ts), `M10ThreeAStrategyBlock` (10.25, horizontal 100% stacked 80/15/5 + `m10ThreeAStrategyLayout.ts`), `M10TriggerFlowBlock` (10.15), `M10LearningLoopBlock` (10.49, 4 makro), `M10OrchestratorBlock` (10.482, Pattern `multi-agent-flow` Type Etalon W7 + `orchestratorRetryPath.ts`), `M10WorkflowSpecBlock` / `M10IncidentPlaybookBlock` (10.65), `M10ToolDecisionTreeBlock` (10.4, HitArea+StepNav). **Lab (no Shell):** `M10HumanControlSimulatorBlock` (10.26, `m10_human_control_simulator`, Pattern `interactive-control-lab`) – risk strip; `M10DepthRolesLabBlock` (10.45, `m10_agent_taxonomy`, Pattern `interactive-control-lab`, static mini SVG – W5 dual-taxonomy Shell superseded). M12 `m12_multi_agent_schema` – W7 tokens brother (own layout). Content: `m10DiagramContent.ts` + `m10*Layout.ts`. `M10SpecIncidentBlock` – legacy. |
| **Modulis 12 – verslo multi-agent ir trys praktikos**                                             | `M12MultiAgentSchemaDiagram.tsx`, `M12MultiAgentSchemaBlock.tsx`, `m12MultiAgentSchemaContent.ts` (skaidrė 120.5 – `m12_multi_agent_schema`) ir `M12ThreeLabsDiagram.tsx`, `M12ThreeLabsBlock.tsx`, `m12ThreeLabsContent.ts` (skaidrė 120.25 – `m12_three_labs`).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Modulis 13 – Turinio kelias (procesai + iliustracijos)**                                        | Shell: `M13AecFunnelBlock` (13.1, `m13_aec_funnel`), `M13PromptStackBlock` (13.2, `m13_prompt_stack`), `M13MediaPipelineBlock` (13.12, `m13_media_pipeline`), `M13ConsistencyLockBlock` (13.32, `m13_consistency_lock`), `M13PostprodBlock` (13.52, `m13_postprod_steps`), `TurinioWorkflowBlock` (13.11, `turinio_workflow`). Static: `M13RuleOfThirdsBlock` (13.33). Content SOT: `m13DiagramContent.ts`, `m13MediaPipelineContent.ts`, `m13ConsistencyLockContent.ts`, `m13PostprodContent.ts`, `m13BusinessWorkflowContent.ts` (Turinio labels – ne `stepExplanations` hardcode). Routing: `diagramRenderers.tsx` (ne ContentSlides special). M14 – schemų nėra.                                                                                                                                                                                                                                                                      |
| **Modulis 15 – praktikos ciklas**                                                                 | `M15PracticeLoopDiagram/Block`, `m15PracticeLoopContent.ts`, `m15PracticeLoopLayout.ts`. Skaidrė 150.25 – `m15_practice_loop` (shell ×5, quick/full; focus = viena aktyvi eilė).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **Testai M8 / M11 / M14 – apimtis ir remediacija**                                                | `TestKnowledgeScopeDiagram.tsx`, `TestRemediationChips.tsx` – įterpta per `TestPracticeSlides.tsx` (test-intro / test-results). Bubbles/chips **turi** atspindėti graded `relatedSlideId` aibę + Path Test temos (M14: pipeline/audio-first/licencijos/C2PA, ne senas „Muzika“-only). Shell: Ne (ne registry `image` key).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| **Statinis SVG (atsarginė kopija)**                                                               | `public/schema3_llm_rag.svg` – nuoroda leidžiama kaip atsarginė; **geometrijos tiesa – React** (`Schema3InteractiveDiagram`). Pilname dydyje pagrindinis būdas – modalas su React per `EnlargeableDiagram`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **Projekto vizualinė paletė**                                                                     | `tailwind.config.js` (brand, accent, slate); diagramose – brand (#334e68 ir pan.), accent grįžtamajam ryšiui.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

Aktyvūs schemų inventoriai (image key policy + test coverage):

- Master: `docs/development/TEACHING_ELEMENTS_REGISTRY.md` + `teaching-elements-overlay.json` (**pirmiausia**)
- M7–12: `docs/development/DIAGRAMU_M7_M12_REGISTRY.md`
- M13–15: `docs/development/DIAGRAMU_M13_M15_REGISTRY.md` (`m13_*`, `m15_*`, `turinio_workflow`)

**LMS polish (1A):** ambicija = mokymų platformos gestalts (ne premium SaaS redesign). Pilot etalonas M10.2 – `docs/development/LMS_DIAGRAM_POLISH_10_2.md`; Type Etalon W1–W3 + W4 residual caption tokens + **W5** (`m10_agent_taxonomy` – dual-taxonomy Shell superseded by interactive-control-lab hybrid) + **W6 comparison-mode-architecture** (`llm_arch`) + **W7 multi-agent-flow** (`m10_agent_orchestrator`) – track **complete**; vykdymo taisyklės + pamokos – `.cursor/skills/scheme-agent/` (`SKILL.md` §LMS polish, `lessons.md`).

**Comparison (mode-absent steps):** kai žingsnis _nepriklauso_ aktyviam režimui (pvz. M4 sk. 45 Prompt: mazgai 3/5), naudoti dashed **placeholder slot** (outline + trumpas `+` label), ne ghost-filled box. LMS `opacity.inactive` ≥0.88 lieka aktyvaus kelio diminimui. Žr. `DIAGRAM_KIT_STANDARD.md` (comparison exception) + `DIAGRAMU_M1_M9_AUDITAS.md` §comparison.

Konfliktas: jei turinys (žingsnių pavadinimai, skaičius) keičiasi – pirmiausia CONTENT_AGENT / turinio SOT, tada SCHEME_AGENT atnaujina schemos struktūrą ir geometriją. **Draudžiama:** skaidrės body skaičiuoti žingsnius kitaip nei schema (pvz. „4 žingsniai“ vs 6-step `m13_media_pipeline`) – naudoti skaitymo gidą arba sinchronizuoti SOT.

### 2.2 M10 naujos diagramos checklist

Naujai Modulio 10 **procesinei** schemai (Shell = Taip):

1. **Labels LT/EN** – `m10DiagramContent.ts` ar `m10*Content.ts` (`getM10*Labels(locale)`); CONTENT_AGENT patvirtina semantiką.
2. **Geometrija** – `*Diagram.tsx` + `*Layout.ts` (precedentai: `M10ThreeAStrategyDiagram`, `M10OrchestratorDiagram`).
3. **Wrapper** – `*Block.tsx` + `InteractiveDiagramShell` (+ Enlargeable kai tanku).
4. **Routing** – `diagramRenderers.tsx`; export `shared/index.ts`.
5. **JSON** – `modules.json` — `sections[].image`; EN – `build:modules-en-m10-m12`.
6. **Registry** – master overlay + `DIAGRAMU_M7_M12_REGISTRY.md` prieš merge; forward tips – `getProcessArrowMarkerGeom`.

**10.45 `m10_agent_taxonomy`:** ne procesinė schema – žr. §2.2c (hybrid lab + static mini SVG; `M10DepthRolesLabBlock` / `m10DepthRoles*`).

**Anti-pattern:** never wire `AgentOrchestratorBlock` to active learner slides.

### 2.2d ContentSlides exception (ne `sections[].image` raktas)

**M4 sk. 45 – `ContextEngineeringPipelineDiagram`:** jungiamas per `content.pipelineDiagram: 'context-engineering'` (`ContentSlides.tsx`), **ne** per `diagramRenderers` / `sections[].image`. Feature Doc Contract „image key“ kelias čia netaikomas; dokumentuoti [`DIAGRAMU_M1_M9_AUDITAS.md`](DIAGRAMU_M1_M9_AUDITAS.md) eilutėje M4/45. Naujiems procesams preferuoti `diagramRenderers` + registry.

### 2.2c interactive-control-lab (form-like decision lab)

Kai registry **Pattern** = `interactive-control-lab` ir **Shell** = Ne (pvz. M10 `m10_human_control_simulator` / skaidrė 10.26; M4 `m4_prompt_mode_simulator` / skaidrė 54; M10 `m10_agent_taxonomy` / skaidrė 10.45):

1. **Registry** – Master overlay eilutė + satelitas: Pattern = `interactive-control-lab`, Shell = Ne, render kelias = `*Block` (be `InteractiveDiagramShell`). M4 – `DIAGRAMU_M1_M9_AUDITAS.md`; M7–12 – `DIAGRAMU_M7_M12_REGISTRY.md`.
2. **Routing** – tik `diagramRenderers.tsx` (ne ContentSlides special-case).
3. **UI** – `ChoiceControl` (+ optional `optionTone`) + `CopyButton`. Risk/axis strip + trade meters – kai job = pasekmė/rizika (10.26, M4/54). **10.45 depth-roles:** brand-only Choice (be scenarijaus, be risk strip); **static mini SVG** iliustracija lab surface viduje OK – be Shell / be `DiagramStepNav` / be 8-step spine.
4. **Labels** – atskiras `*Content.ts` (LT/EN getters); deterministinės taisyklės – `*Model.ts` (ne layout geometrija); risk spalvos – `*LabTokens.ts` (GOLDEN §3.1c) kai taikoma; 10.45 – brand `m10DepthRolesLabTokens.ts`.
5. **Lab visual (W1 / W1.1)** – gradient lab shell; risk labs: **strip** (3 scenarios, no empty cell); stake chips; timing; fit/mismatch/error; recommendation po režimo; 2 trade meteriai. M10 10.26: greitis + žmogaus krūvis. M4: greitis + haliucinacijos rizika. Mikro-motion. Be purple glow / run-agent sim.
6. **Netaikyti** LMS shell / `density=hero` process checklists – tai ne proceso schema. Chrome/a11y → CODING + UI_UX; semantiką → CONTENT.

### 2.2b M13–15 naujos diagramos checklist

1. **Semantika** – neatkartoti 13.12 / 13.11 / 13.35; žr. registry „Semantinis skirtumas“.
2. **Labels LT/EN** – atskiras `m13*Content.ts` / `m15*Content.ts` (`get*Labels(locale)`); CONTENT_AGENT patvirtina.
3. **Procesinė schema** – `InteractiveDiagramShell` + `DiagramStepHitArea` + `useStepDiagram`; geometrija – `verticalFlowGeometry` arba `*Layout.ts`.
4. **Routing** – tik `diagramRenderers.tsx` (ne ContentSlides special-case).
5. **JSON** – `modules.json` + `modules-en-m13-m15.json` (`image` + caption); **ne** core `*-m1-m6` / `*-m1-m9`.
6. **Registry** – master overlay + `DIAGRAMU_M13_M15_REGISTRY.md` prieš JSON.

### 2.1 Mūsų požiūris vs react-diagrams

Projektas **nenaudojame** bibliotekos [@projectstorm/react-diagrams](https://github.com/projectstorm/react-diagrams); principus pritaikome savo stack'e:

- **Model vs View atitikmuo:** Layout failas (pvz. `schema3Layout.ts`) = „modelis“ (nodes, edges, anchor); Diagram komponentas (pvz. `Schema3InteractiveDiagram.tsx`) = „view“ – tik skaito iš layout ir piešia SVG. Geometriją keisti **tik** layout faile; komponentas nerašo koordinačių.
- **Vienas SOT:** Visos koordinatės ir rodyklės kyla iš vieno šaltinio (layout arba diagramos konstantos). Eksportas į SVG/PNG ar ataskaitos turi kilti iš to paties layout arba būti aiškiai pažymėtas kaip atsarginė kopija (žr. §2 statinis SVG).
- **TypeScript:** Layout tipai (Schema3Node, Schema3Edge, Anchor) – standartas visiems naujiems layout failams.
- **Kodėl ne biblioteka:** Mūsų reikmėms SVG + React pakanka; rodyklės kraštas į kraštą, 4 anchor, deterministiškas renderinimas valdomi tiesiogiai. Mažesnis priklausomybių skaičius ir pilna atitiktis SCHEME_AGENT §3.

Išsamios diagramų praktikos ir KISS-Marry-Kill santrauka: **docs/development/DIAGRAMU_GERIAUSIOS_PRAKTIKOS.md**. Horizontalios rodyklės ir blokų užrašai (analizė + checklist įgyvendinimui): **DIAGRAMU_GERIAUSIOS_PRAKTIKOS.md §6**.

---

## 3. Svarbiausios pamokos iš diagramos (geriausios praktikos)

Šias taisykles laikytis kurdami ar taisant proceso/flowchart diagramas.

### 3.1 Viena geometrijos tiesa

- **Visos koordinatės ir atstumai kyla iš konstantų.** Pvz. `STEP_BOXES`, `GAP`, `BOX_H`, `COLS_X`, `COLS_W`, `CX`, `HORIZ_Y`. Dėžučių `rect` ir rodyklių `line`/`path` naudoja tą patį masyvą/konstantas – nėra dubliuojamų „magic numbers".
- Pasekmė: pakeitus vieną konstantą (pvz. GAP), automatiškai pasikeičia ir tarpai, ir rodyklių ilgiai.

### 3.2 Rodyklės – kraštas į kraštą, be persidengimo

- **Linija prasideda** prie ištekančio bloko išorės krašto (pvz. `boxBottom`).
- **Linija baigiasi** prieš įeinančio bloko kraštą: `nextEdge - tipLen`, kad su **`refX=0`** antgalio smailė liestų kraštą – neįsibraukiant į bloką.
- **LMS process tipas:** `DIAGRAM_TOKENS.arrow.processTipLen` (≥10) + `getProcessArrowMarkerGeom()` (`processArrowMarker.ts`), **`refX=0`** (tipas už line end). `arrow.markerLen` (=6) = **legacy inset**, ne process etalon – nekeisti globaliai; niekada assertinti `processTipLen === markerLen`.
- **markerUnits:** process markeriai su `stroke.flow` / `flowStrong` (≥ 3.5) **privalo** `markerUnits="userSpaceOnUse"` (`DIAGRAM_TOKENS.arrow.markerUnits`). SVG default `strokeWidth` scaling išpučia antgalį ir praryja kotą (GAP ≈ 24–32 → lieka pliki trikampiai).
- **DRAUDŽIAMA:** trikampiai **neperšoka** blokų ribų; rodyklės **neįlenda** į bloko vidų; rodyklės **neišlenda** už blokų taip, kad antgalis būtų „ore"; rodyklės **neuždengia** teksto (path ir etiketės – laisvoje erdvėje ar virš/po blokais, ne ant teksto). Testai **neturi** assertinti `localTip === DIAGRAM_TOKENS.arrow.markerLen`.

### 3.3 Proporcingos rodyklės

- **Antgalis ne didesnis už tarpą tarp blokų.** Process LMS: tip ≥10 su GAP ≥28 (pvz. 32) – kotas lieka matomas (`GAP − tip ≥ ~20` horizontal cycle etalonuose).
- **Vienodos vertikalios rodyklės:** vienodas GAP tarp blokų → vienodo ilgio linijos ir vienoda vizualinė hierarchija.

### 3.4 Grįžtamojo ryšio (feedback) path

- **Nekirsti kitų blokų.** Path maršrutas eina aplink (pvz. apačion į kairę), o ne per bloko koordinates.
- **Pabaiga:** path **baigiasi ties tikslo bloko kraštu** – taip linija ir marker vizualiai sujungti, nėra „floating" trikampio. Pvz. vertikaliam segmentui į viršų: paskutinis path taškas = `firstBottom` (bloko apačia), paskutinis segmentas nukreiptas **į bloką** (mažesnė y = į viršų). `orient="auto"` nukreips antgalį teisinga kryptimi.
- **RL diagrama:** Atlygis → Agentas path eina: Atlygio centras apačioje → žemyn → horizontaliai į kairę → į viršų iki Agento apačios. Punktyrinė linija (strokeDasharray) + ACCENT spalva – semantika „mokymasis laikui bėgant".

### 3.5 Interaktyvumas (jei reikia)

- **Paspaudžiamos zonos:** virš vizualaus bloko – transparentus `<rect>` su tais pačiais x, y, width, height; `onClick` → callback (pvz. `onStepClick(index)`).
- **Prieinamumas:** kiekvienam tokiam rect – `aria-label` (pvz. „Žingsnis 1: Tikslas"), `role="button"`, `tabIndex={0}`, `onKeyDown` (Enter / tarpas).
- **Rekomenduojama:** schemos, kuriose dalyvis gali pasirinkti žingsnį arba matyti paaiškinimą – padaryti **interaktyvias** (3.6 „Tu esi čia“, žingsnių mygtukai), ne tik statines – sumažina „per mažai interaktyvumo“ problemą.

### 3.6 Interaktyvumo UX kelias (workflow su paaiškinimais apačioje)

Kai schema yra **clickable** ir rodo paaiškinimą po paspaudimu – vartotojui „sunku sekti", jei turinys tiesiog keičiasi. **Įsiminti kitam kartui:**

| Elementas                         | Kodėl                                                                               | Implementacija                                          |
| --------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------- |
| **„Tu esi čia" badge**            | Nuolatinė orientacija – vartotojas žino, kur yra (Nielsen: recognition over recall) | Badge virš diagramos: „Tu esi čia: 1. Tikslas" + „1/5"  |
| **Žingsnių mygtukai (1–N)**       | Perjungti be scroll atgal į diagramą – sumažina disorientaciją                      | Numeruoti mygtukai po diagrama, prieš paaiškinimo bloką |
| **Stabili paaiškinimo struktūra** | Pavadinimas be perteklinio kartojimo – numeris jau „Tu esi čia"                     | Paaiškinime tik `step.title`, ne „1. Tikslas"           |

**UX kelias (principai):** „Tu esi čia“ + 1–N nav + stabili paaiškinimo struktūra – lieka privalomi.

**Chrome implementacijos etalonas (LMS 1A):** `InteractiveDiagramShell` (`density="hero"`) + `EnlargeableDiagram` – žr. `M7DaPipelineBlock` / `DIAGRAM_KIT_STANDARD.md`. Po 2026-07 M5 migrate: `DiPrezentacijosWorkflowBlock` naudoja DiagramKit Shell (ne rankinį badge/nav). Process diagrams su practice lab (`ProcessStepper` / `custom_gpt_process`) – Shell = Ne; own stepper + Enlargeable.

### 3.7 Horizontalus proceso layout (pamokos iš RL diagramos)

Kai blokai išdėstyti **horizontaliai vienoje eilėje** (pvz. Agentas → Aplinka → Veiksmas → Atlygis):

#### 3.7.1 Viewbox ir erdvė

- **Viewbox aukštis ≥ 330px** (desktop), kad tilptų blokai + feedback kilpa + etiketės + kvėpavimo tarpas.
- **ROW_Y** (blokų eilutės y): centruoti viewbox'e, palikti ~30px virš blokų etiketėms ir ~80px po blokais feedback kilpai.
- **START_X**: apskaičiuoti, kad paskutinis blokas tilptų viewbox'e: `START_X + (BOX_W + GAP) × (N-1) + BOX_W < viewbox_width`.

#### 3.7.2 Forward rodyklės (tarp blokų)

| Parametras        | Reikšmė                        | Kodėl                                                             |
| ----------------- | ------------------------------ | ----------------------------------------------------------------- |
| **ARROW_GAP_FWD** | 0–5px                          | Su GAP=32, didesnis gap (pvz. 12) palieka per trumpą kotą         |
| **Spalva**        | #7B8794 (tamsesnė pilka)       | #9AA3AF per blyški ant šviesaus fono – nepakankamas kontrastas    |
| **Storis**        | `stroke.flow` ≥ 3.5            | Plonesnis horizontalioje schemoje – silpna vizualinė hierarchija  |
| **Marker**        | `processTipLen` + **`refX=0`** | `getProcessArrowMarkerGeom()`; tipas už line end; ne `markerPath` |

#### 3.7.3 Etiketės ant forward rodyklių

**Pozicija: VIRŠ rodyklės**, laisvoje erdvėje tarp title ir blokų viršaus. **NE ant rodyklės** (centered-on-edge negalimas, kai GAP < etiketės plotis).

| Taisyklė                 | Specifikacija                                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| **Y pozicija**           | `box.y - 6` (teksto baseline, 6px virš bloko viršaus)                                                              |
| **X pozicija**           | `rightEdge + GAP / 2` (gap centras, ne rodyklės centras)                                                           |
| **Teksto spalva**        | TEXT_DARK (#102a43), ne rodyklės spalva – stiprus kontrastas                                                       |
| **Font**                 | 11px, weight 700 (bold) – mažas fizinis dydis, todėl reikia bold                                                   |
| **Bg rect**              | Nereikalingas ant šviesaus fono; jei fone yra elementų – naudoti `rgba(255,255,255,0.88)` pill (rx=10)             |
| **Connector**            | Vertikali punktyrinė linija (1px, 50% opacity, dasharray 2 2) nuo etiketės apačios iki rodyklės – vizualinis ryšys |
| **Individualūs pločiai** | `LABEL_WIDTHS` per label (pvz. 72, 58, 64) – ne fiksuotas plotis visiems                                           |

**Kodėl NE centered-on-edge:** Su BOX_W=200 ir GAP=28, etiketė (60–72px) platesnė už gap'ą. Centravimas ant rodyklės = etiketė persidengia su abiejų blokų kraštais (tamsus tekstas ant tamsaus box = neskaitoma). Industrijos standartas (yWorks „Centered") veikia kai gap > etiketės plotis.

#### 3.7.4 Feedback kilpa (grįžtamasis ryšys)

| Taisyklė            | Specifikacija                                                                                                                                                          |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Stilius**         | Punktyrinė (strokeDasharray 8 4) + ACCENT spalva – semantika „mokymasis laikui bėgant"                                                                                 |
| **Path**            | 1 eilutė (cycle): `feedbackUPath` – žemyn → horizontaliai → **į viršų**. 2 eilutės: `feedbackInterRowPath` – žemyn → horizontaliai → **žemyn** į tipą (ne įstrižas Q). |
| **Rounded corners** | Q (quadratic bezier) su R=16px kampuose – sklandus vizualinis kelias                                                                                                   |
| **Arrowhead**       | **Rankinis polygon** (ne SVG marker). Cycle: tipas į viršų. Inter-row: tipas žemyn, oras iki bloko ~**3** (ne 8 – floating).                                           |
| **Start indicator** | Cycle U: **be** start circle (skaito kaip „2 galai“ / underline). Etalonas: RlProcess / AgentWorkflow – tik polygon į start box.                                       |
| **Etiketė**         | **Po** horizontaliu segmentu (`troughY + ~12` / fbY + 16), ACCENT_DARK – ne virš linijos (liejasi su viršutine eile)                                                   |

**Kodėl rankinis polygon, ne SVG marker:** `orient="auto"` su path, kurio paskutinis segmentas eina į viršų, teoriškai turėtų nukreipti marker į viršų. Praktikoje: marker vizualiai atrodė atskirtas nuo linijos, kryptis neaiški dėl mažo dydžio. Rankinis polygon = 0 dviprasmybių, visada rodo ten, kur nupiešei.

### 3.8 Dvi rodyklių semantikos (RL ir pan.)

Kai diagramoje yra **forward flow** ir **feedback loop**, vizualiai atskirti:

- **Forward:** #7B8794 (tamsesnė pilka), solid, 3px, etiketės virš rodyklių su connector.
- **Feedback:** ACCENT spalva (ta pati kaip paryškintas blokas), punktyrinė (strokeDasharray), rankinis polygon arrowhead, etiketė po kilpa. Punktyras = „mokymasis laikui bėgant".

### 3.9 Spalvos ir šriftai

- Viena pagrindinė spalva srautui (brand), accent – grįžtamajam ryšiui ar paryškinimui.
- Šriftas: projekto (Plus Jakarta Sans); tekstas diagramoje lietuvių kalba, terminologija – kaip CONTENT_AGENT (DI, ne AI kur tinka).

### 3.10 Kodėl React diagrama nesutampa su ataskaita ir SVG (ir kaip išvengti)

**Priežastys:**

| #   | Priežastis                                                                                                                                                     | Pasekmė                                                      |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| 1   | **Skirtingos koordinačių sistemos** – SVG viewBox vs CSS/DOM px; skaičiavimai „pagal dizaino px“ vienur ir „pagal realų DOM“ kitu – poslinkiai garantuoti.     | Rodyklės / blokai vizualiai „beveik“, bet tiksliai nesueina. |
| 2   | **Skirtingi anchor taškai** – vienur rodyklė į bloko **centrą**, kitu į **viršutinį kairį** (arba kraštą). Tada linijos baigiasi skirtingose vietose.          | Persidengimas arba per trumpa/ilga rodyklė.                  |
| 3   | **Tekstas ir šriftai** – skirtingi fontai, line-height, letter-spacing; labeliai keičia dėžutės aukštį/plotį, o rodyklės taškai lieka seni.                    | 2–6 px per elementą dauginasi per visą schemą.               |
| 4   | **Stroke/marker matematika** – SVG `marker-end` turi savo „užėjimą“ (refX, markerUnits); kitaip skaičiuojant linijos galą gaunamas persidengimas arba tarpas.  | Antgalis „plūsta“ į bloką arba atsiranda tarpas.             |
| 5   | **Responsive / zoom / devicePixelRatio** – SVG skaluojasi sklandžiai, DOM apvalinama kitaip.                                                                   | „Iš akies“ OK, matuojant – nesutampa.                        |
| 6   | **Rankinis redagavimas vs generavimas** – ataskaita tekstu, SVG ranka (Figma/Illustrator), React – iš kodo. Jei bet kuris taisomas atskirai, sinchronas miręs. | React, SVG ir ataskaita skiriasi.                            |

**Geriausias variantas (vienas layout SOT):**

- **Vienas šaltinis tiesos** – pvz. `layout.json` arba `schema4Layout.ts`: **nodes** (id, x, y, w, h), **edges** (from, to, fromAnchor, toAnchor).
- **React** renderina tik pagal tą patį layout (koordinatės ir rodyklės iš tų pačių skaičių).
- **SVG eksportas** (jei reikia) generuojamas iš to paties layout arba rankinį SVG laikyti sinchronizuotą su layout (geometrijos tiesa – layout, ne atskiri failai).
- **Ataskaitoje** – embed'intas vaizdas iš to paties SOT (sugeneruotas SVG arba PNG).

**Anchor taškai – tik 4 standartiniai:**

- Naudoti tik **top | right | bottom | left** (su offset, jei reikia). Rodyklės prasideda/baigiasi **krašte**, ne centre.
- **Venk** „center“ įėjimų/išėjimų, kol nesusitvarkęs SOT – centre lengva susipainioti su skirtingais koordinačių skaičiavimais.
- Linijos: pradžia = `nodeA[fromAnchor]` (pvz. `bottom` → x = node.x + node.w/2, y = node.y + node.h); pabaiga = `nodeB[toAnchor] - ARROW_MARKER_LEN` kad antgalis liestų kraštą.

**Debug metodas (kur lūžta):**

- React: uždėti **debug overlay** – rodyti kiekvieno mazgo bounding box ir anchor taškus (maži apskritimai).
- SVG: įjungti tą patį – rodyti anchor taškus.
- Palyginti: ar anchor'ai tie patys? Jei ne – problema 2/3/4.

**Projekte:** Schema 4 naudoja layout SOT (`schema4Layout.ts`) su nodes/edges ir anchor funkcija; rodyklės skaičiuojamos tik iš kraštų (top/right/bottom/left). Žr. `src/components/slides/shared/schema4Layout.ts`.

### 3.11 Schemų UI/UX geriausios praktikos (flowchart blokai)

Iš LLM ir kitų diagramų patirties – kad vartotojo kelionė būtų pateisinama ir schema ne „darželio lygio“:

| Praktika                                   | Specifikacija                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Centravimas viewBox**                    | Turinys horizontaliai centre: `START_X = (VIEWBOX_W - turinio_plotis) / 2`. Kairėje ir dešinėje vienodos maržos – schema ne „pavažiavusi“ į vieną pusę.                                                                                                                                                                                                                                                    |
| **Tekstas telpa į blokus**                 | Ilgas tekstas – laužyti į kelias eilutes (`<tspan>` dy); Išvesties bloke naudoti PAD_TOP_OUTPUT / LINE_HEIGHT_OUTPUT, kad 4 eilutės tilptų į BOX_H; ne viena ilga eilutė, kuri „lenda“ už rect.                                                                                                                                                                                                            |
| **Lygmenų kvėpavimas**                     | Tarpas tarp dviejų eilučių (pvz. Žingsnis N ir N+1) ne per mažas: ~40 viewBox vienetų arba daugiau, ne 24 – vizualiai „susispaudę“ lygmenys = prastas UX.                                                                                                                                                                                                                                                  |
| **Vertikalus grid bloke**                  | Wrapper sekcijoms: 32px tarp sekcijų, 24px antraštė–turinys, 12–16px maži blokai (žr. UI_UX_AGENT §3.7). Diagramos wrapper: pt-8 pb-4 arba panašiai – ne per daug erdvės apačioje.                                                                                                                                                                                                                         |
| **„Peržiūrėti visą dydį“**                 | Naudoti tik ten, kur skaidrėje tikrai reikia pilno dydžio; kai default vaizdas pakankamai skaitomas – galima rodyti diagramą tiesiogiai be EnlargeableDiagram. **Interaktyvios schemos** (toggle, įvestys, dinamiška vizualizacija – pvz. WorkflowComparison) **nereikalauja** Enlarge: tai ne statinis .png/vaizdas, o interaktyvus blokas – išdidinimas nėra būtinas. Žr. AGENT_VERIFICATION_NE_MELUOTI. |
| **Šaltinis**                               | Oro virš „Šaltinis“ teksto (VIEWBOX_H pakankamas, SOURCE_LABEL_Y – ne priklijuotas prie diagramos apačios).                                                                                                                                                                                                                                                                                                |
| **Flex + padding: rodyklė siekia turinio** | Kai blokai turi horizontalų padding (pvz. `pl-4`) nuo Connector krašto – rodyklė vizualiai „nesiekia“ pilko bloko. Sprendimas: antram ir tolesniems blokams `-ml-4` (pirmam `first:ml-0`), kad turinio kairys kraštas sutaptų su Connector dešiniu. Žr. StrukturuotasProcesasDiagram.                                                                                                                      |
| **Aktyvus blokas: ring ant turinio**       | Paryškinimui naudoti `ring-inset` ant **turinio** elemento (vidinis div), ne ant wrapper su padding – kitaip ring „išlenda“ už matomo bloko. Žr. StrukturuotasProcesasDiagram (ring ant inner div).                                                                                                                                                                                                        |

**Nuorodos:** `docs/development/LLM_DIAGRAMOS_VIZUALUS_VERTINIMAS.md`, `docs/development/UI_UX_AGENT.md` §3.7, `llmAutoregressiveLayout.ts` (layout SOT pavyzdys).

---

## 4. Kada naudoti SCHEME_AGENT

| Situacija                                                     | Agentas                                                                                                                             |
| ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Pridėti / pakeisti žingsnius proceso diagramoje (turinyje)    | CONTENT_AGENT → SCHEME_AGENT (geometrija, STEP_BOXES, rodyklės)                                                                     |
| Rodyklės persikerta su blokais, neproporcingos                | SCHEME_AGENT                                                                                                                        |
| Nauja schema (flowchart, proceso schema) į skaidrę            | CONTENT_AGENT (ką rodyk, kokius žingsnius) → SCHEME_AGENT (struktūra, konstanta, rodyklės) → CODING_AGENT (komponentas, jei reikia) |
| **Interaktyvus workflow** (clickable + paaiškinimai apačioje) | SCHEME_AGENT: taikyti **3.6 Interaktyvumo UX kelias** – „Tu esi čia", žingsnių mygtukai, stabili struktūra                          |
| **Horizontalus procesas** (blokai vienoje eilėje)             | SCHEME_AGENT: taikyti **3.7 Horizontalus layout** – viewbox erdvė, forward gap, etiketės virš, feedback polygon                     |
| Tik teksto pakeitimas diagramoje (žingsnio pavadinimas)       | CONTENT_AGENT (arba DATA_AGENT jei tekstas JSON)                                                                                    |

---

## 5. Vizualinė patikra ir iteracijos

**Kas tikrina schemų vizualinę kokybę:** **CODE_REVIEW_AGENT** (ne CONTENT_AGENT). CONTENT_AGENT nustato turinį (ką rodyk); geometriją ir rodykles daro SCHEME_AGENT; **vizualinį įvertinimą** (ar trikampiai neperšoka blokų, ar rodyklės neuždengia teksto) atlieka CODE_REVIEW_AGENT pagal šį checklist.

**Checklist (CODE_REVIEW_AGENT taiko po SCHEME_AGENT):**

| Kriterijus                     | Klausimas                                                                                                                                        |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Rodyklės kraštas į kraštą      | Ar linija prasideda/baigiasi prie bloko krašto? Ar antgalio smailė tik **liečia** kraštą, o trikampis **neįeina** į bloką ir **neperšoka** ribų? |
| Proporcingumas                 | Ar refX atitinka ARROW_MARKER_LEN path'e? Ar antgalis ne didesnis už tarpą (GAP) tarp blokų?                                                     |
| Path nekerta blokų             | Ar grįžtamasis ryšys eina aplink blokus? Ar rodyklės ir etiketės **neuždengia** teksto?                                                          |
| Interaktyvumas (jei clickable) | Ar yra aria-label, role, tabIndex, onKeyDown? Ar taikomas 3.6 („Tu esi čia“, žingsnių mygtukai)?                                                 |

**Iteracijos:** rekomenduojama **2 iteracijos** schemoms: (1) SCHEME_AGENT atlieka pakeitimus → (2) CODE_REVIEW_AGENT atlieka schemų vizualinę patikrą (checklist). Jei randamos klaidos – SCHEME_AGENT pataisymas (konkretus failas, konstanta, eilutė) → vėl CODE_REVIEW. Orkestratorius: `docs/development/AGENT_ORCHESTRATOR.md` (skyrius 4 – proceso diagramą / schemą; skyrius 7 – CODE_REVIEW_AGENT).

---

## 5.5 Privaloma verifikacija – nemeluoti

**Problema:** Agentas gali raportuoti „Schema X įgyvendinta kaip React, statinis SVG tik fallback“, bet vartotojas, paspaudęs „Peržiūrėti pilname dydyje“, mato tik statinį SVG ir mano, kad darbas neapdarytas. Žr. `docs/development/AGENT_VERIFICATION_NE_MELUOTI.md`.

**Privaloma po schemos / React diagramos pakeitimų:**

| Patikra                         | Klausimas                                                                                                                                                                                                                                                                                                                                                  |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Skaidrėje**                   | Ar tikrai renderinamas React komponentas (ne `<img src="...svg">`)? Failas: `ContentSlides.tsx` – `section.image.includes('schema3')` → `<Schema3InteractiveBlock />` (viduje `EnlargeableDiagram` + `Schema3InteractiveDiagram`).                                                                                                                         |
| **„Peržiūrėti pilname dydyje“** | Ar vartotojas gauna **tą patį** turinį (React)? Jei nuoroda veda į statinį SVG – ar ataskaitoje aiškiai parašyta: „Pilname dydyje nuoroda atidaro statinį SVG (atsarginė kopija); geometrijos tiesa skaidrėje ir pilname dydyje – React (modalas).“ **Draudžiama** raportuoti „SVG tik fallback“, jei vienintelis pilno dydžio vaizdas vartotojui yra SVG. |

**Suvienyta schema (4.1c) – ARCHYVUOTA (2026-06):** Schema3 (`Schema3InteractiveBlock`/`Schema3InteractiveDiagram`) nebewired; skaidrė 56 naudoja `llm_arch_diagram` (`LlmArchDiagramBlock`). Istorinis aprašymas: „Peržiūrėti pilname dydyje“ (iš `Schema3InteractiveBlock` per `EnlargeableDiagram`) atidarydavo **tą patį React** komponentą (`Schema3InteractiveDiagram`) modale. Nuoroda į statinį SVG leidžiama kaip „Atidaryti SVG failą (atsarginė kopija)“ tik jei ji aiškiai pažymėta.

---

## 6. Išvestis ir kokybės vartai

- **Išvestis:** Atnaujintos schemos konstantos ir/ar SVG/React diagramos kodas (`CustomGptProcessDiagram.tsx`, `ProcessStepper.tsx`, ar atitinkami failai); užtikrinta edge-to-edge rodyklių, proporcingi antgaliai, path nekerta blokų.
- **Privaloma** atsakymo pabaigoje: CHANGES, CHECKS, RISKS, NEXT (kaip ir kiti agentai orkestratoriuje).

---

## 7. Nuorodos

- Diagramų geriausios praktikos ir KISS-Marry-Kill: `docs/development/DIAGRAMU_GERIAUSIOS_PRAKTIKOS.md`
- Orkestratorius ir router: `docs/development/AGENT_ORCHESTRATOR.md`, `.cursor/rules/agent-orchestrator.mdc`
- Turinio SOT: `turinio_pletra.md`, `docs/turinio_pletra_moduliai_4_5_6.md`, `docs/CONTENT_MODULIU_ATPAZINIMAS.md`
- Referencinė diagrama (pamokos iš čia): `src/components/slides/shared/CustomGptProcessDiagram.tsx`
- RL horizontali diagrama (3.7 pamokos): `src/components/slides/shared/RlProcessDiagram.tsx`
- Interaktyvumo UX kelias (3.6): `DiPrezentacijosWorkflowBlock.tsx`, `DiPrezentacijosWorkflowDiagram.tsx`
- Suvienyta schema (Modulio 4, 4.1c): `Schema3InteractiveBlock.tsx`, `Schema3InteractiveDiagram.tsx`, `schema3Layout.ts` – geometrijos tiesa; `EnlargeableDiagram` – „Peržiūrėti pilname dydyje“ atidaro tą patį React modale; `ContentSlides.tsx` – `section.image.includes('schema3')` → Schema3InteractiveBlock.
- **Layout SOT (Schema 4):** `schema4Layout.ts` – nodes (id, x, y, w, h), edges (from, to, fromAnchor, toAnchor), `getAnchorPoint`, `getLineEndPoint`; rodyklės tik anchor'ai top/right/bottom/left. Žr. §3.10.
- Verifikacija (nemeluoti): `docs/development/AGENT_VERIFICATION_NE_MELUOTI.md`; SCHEME_AGENT §5.5.
