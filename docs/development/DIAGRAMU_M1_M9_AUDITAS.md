# M1-M9 schemu auditas ir suvienodinimo kelias

> Tikslas: paversti aktyvias M1-M9 schemas viena produkto sistema: vienodas karkasas, skirtinga semantika, aiskus interaktyvumas ir priziurima geometrija.

## Vertinimo kriterijai

| Kriterijus            | Klausimas                                                             | Kokybes riba                                                                        |
| --------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Mokymosi aiskumas     | Ar per 5-10 s aisku, ka schema paaiskina?                             | Pavadinimas + pirmas vizualus srautas turi atsakyti i klausima.                     |
| Vizualine hierarchija | Ar matosi pagrindinis srautas, aktyvus zingsnis ir salutiniai rysiai? | Aktyvus elementas ryskesnis, bet neuzgozia teksto.                                  |
| Readability           | Ar tekstas telpa, nera per mazas, nera perkrovos?                     | SVG tekstas >= 10 px, pagrindiniai labeliai >= 12 px.                               |
| Geometrija            | Ar rodykles eina krastas-i-krasta ir nekerta bloku?                   | Markerio ilgis sutampa su path skaiciavimu.                                         |
| Interaktyvumas        | Ar clickable schema turi orientacija ir keyboard kelia?               | `Tu esi cia`, step nav, `aria-label`, `role`, `tabIndex`, Enter/Space.              |
| Consistency           | Ar vienodi frame, spalvos, spacing, active/inactive busenos?          | Bendras `DiagramKit` wrapperis ir `diagramTokens`.                                  |
| Mobile                | Ar schema turi nuoseklu reflow/scroll sprendima?                      | `mobileBehavior=\"reflow\"` arba `MobileDiagramScroller`, ne atsitiktinis overflow. |
| Prieziura             | Ar yra layout SOT arba aiskios konstantos?                            | Koordinates vienoje vietoje, be dubliuotu magic numbers view'e.                     |

## Aktyviu schemu inventorius

| Modulis / skaidre | Schema                    | Render kelias                                                                | Tipas                           | Busena                            | Rizika                                                             |
| ----------------- | ------------------------- | ---------------------------------------------------------------------------- | ------------------------------- | --------------------------------- | ------------------------------------------------------------------ |
| M1 / 15           | Workflow Samprata         | `WorkflowSummarySlide` -> `WorkflowComparisonInteractiveBlock`               | `comparison`                    | Gera kryptis                      | Reikia laikyti comparison etalonu, ne kopijuoti senus PNG.         |
| M4 / 44           | Autoregresinis LLM        | `llm_autoregressive` -> `LlmAutoregressiveBlock`                             | `cycle-feedback`                | Stipriausias mokomasis modelis    | Tankus desktop SVG; reikia bendro frame/nav su kitomis schemomis.  |
| M4 / 45           | Konteksto pipeline        | `pipelineDiagram=context-engineering` -> `ContextEngineeringPipelineDiagram` | `comparison` + `linear-process` | Ambicinga                         | Daug busenu vienoje schemoje, galima vizualine perkrova.           |
| M4 / 43           | Strukturuotas procesas    | `strukturuotas_procesas_3_zingsniai` -> `StrukturuotasProcesasBlock`         | `linear-process`                | Gera HTML korteliu schema         | Skiriasi nuo SVG schemu kalbos, bet turi gera readability.         |
| M4 / 46           | Custom GPT procesas       | `custom_gpt_process` -> `ProcessStepper`                                     | `linear-process`                | Gera praktikos schema             | Kai kur JSON mini SVG/full-size, bet render kelias jau React.      |
| M4 / RL skaidre   | RL procesas               | `rl_process_diagram` -> `RlProcessBlock`                                     | `cycle-feedback`                | Gera semantika                    | Horizontalus feedback turi likti atskirtas nuo forward flow.       |
| M4 / 56           | Agentine vizualizacija    | `llm_arch_diagram` -> `LlmArchDiagramBlock`                                  | `comparison` / mode switch      | Reikia izoliuoto refaktoriaus     | DOM matuojamas return path jautrus resize.                         |
| M4 / RAG ruosimas | RAG ruosimo magistrale    | `rag_duomenu_ruosimas` -> `RagDuomenuRuosimasBlock`                          | `linear-process` / timeline     | Gera, bet kitokia                 | HTML/timeline kalba skiriasi nuo M7-M9 SVG.                        |
| M6                | DI prezentacijos workflow | `di_prezentacijos_workflow` -> `DiPrezentacijosWorkflowBlock`                | `linear-process`                | Referencinis interaktyvumo kelias | Gali tapti wrapper standartu.                                      |
| M7 / 70           | DA pipeline 6             | `/da_pipeline_6.svg` -> `M7DaPipelineBlock` per registry                     | `linear-process`                | Migruota i React                  | Naudoja seną image key, bet renderina interaktyvų React pakaitalą. |
| M7 / 731          | 4 analizės tipai          | `m7_analysis_types` -> `M7AnalysisTypesBlock`                                | `roles-hub`                     | A prioriteto refaktorius          | 2x2 grid vizualiai per vienodas.                                   |
| M7 / 71.2         | Duomenu paruosimas        | `m7_data_prep_workflow` -> `M7DataPrepWorkflowBlock`                         | `linear-process`                | A prioriteto refaktorius          | Dubliuoja M9 8 zingsniu schema; reikia bendro patterno.            |
| M7 / 71.2-71.3    | BI schema                 | `/da_bi_schema_4.svg` -> `M7BiSchemaBlock` per registry                      | `linear-process`                | Migruota i React                  | Naudoja seną image key, bet renderina interaktyvų React pakaitalą. |
| M7 / 94           | Trys agentai              | `m7_three_agents_flow` -> `M7ThreeAgentsBlock`                               | `roles-hub`                     | A prioriteto refaktorius          | Trys vienodi blokai nepakankamai skiria roles.                     |
| M7 / 74           | MASTER workflow           | `m7_master_workflow` -> `M9DataWorkflowBlock context=\"m7_master\"`          | `linear-process`                | Geras reuse                       | Reikia islaikyti bendra M9 geometrija.                             |
| M7 / 95           | Duomenu schema pavyzdys   | `/da_schema_entity_example.svg` -> fallback `<img>`                          | `illustration`                  | Palikti arba migracija veliau     | Labiau pavyzdys nei mokomasis procesas.                            |
| M7 / 71.4         | Duomenu istorijos ciklas  | `m7_data_story_cycle` -> `M7DataStoryCycleBlock`                             | `cycle-feedback`                | A prioriteto refaktorius          | Vadina ciklu, bet desktop atrodo kaip tiesine seka.                |
| M9 / 93           | 8 zingsniu workflow       | `m9_data_workflow` -> `M9DataWorkflowBlock`                                  | `linear-process`                | Pagrindinis DA etalonas           | Turi tapti 5/8 zingsniu vertikaliu flow standartu.                 |

## Patternu taksonomija

### `comparison`

Naudoti, kai mokinys turi palyginti du rezimus arba du darbo budus.

Standartas:

- vienas toggle arba du rezimo mygtukai;
- trumpas `Tu esi cia` / rezimo badge;
- schema rodo tik esmini skirtuma, o ne visa teorija;
- `WorkflowComparisonDiagram` laikomas etalonu.

### `linear-process`

Naudoti 3, 5 arba 8 zingsniu sekoms.

Standartas:

- vertikali seka, kai zingsniu > 4;
- horizontalus srautas tik kai telpa desktop ir nereikia ilgu labeliu;
- aktyvus zingsnis + numeruoti mygtukai + paaiskinimas po schema;
- M7 5 zingsniai ir M9 8 zingsniai turi naudoti ta pacia vizualine kalba.

### `cycle-feedback`

Naudoti, kai yra griztamasis rysys arba ciklas.

Standartas:

- forward flow ir feedback vizualiai atskirti;
- feedback naudoti dashed/accent arba ciklo rodykle;
- jei pavadinime yra „ciklas“, desktop neturi atrodyti tik kaip paprasta linija.

### `roles-hub`

Naudoti analizės tipams, agentu rolėms, kategorijoms.

Standartas:

- mazgai skiriasi semantiskai: spalva, pozicija arba forma;
- aktyvus mazgas paaiskina, kada ji rinktis;
- venkti vienodo tamsaus bloko visoms skirtingoms rolėms.

### `illustration`

Naudoti tik pavyzdiniams vaizdams arba statiniams assetams, kurie nera mokomasis procesas.

Standartas:

- rodyti kaip iliustracija, ne kaip interaktyvi schema;
- vienodas rėmas per `DiagramImageFrame` arba routing registry;
- jei assetas moko procesa, planuoti migracija i React.

## M7-M9 refaktoriaus priemimo kriterijai

1. Visi A grupes blokai naudoja bendra `InteractiveDiagramShell`.
2. `M7DataPrepWorkflowDiagram` ir `M9DataWorkflowDiagram` naudoja bendra tokenu palete ir panasia vertical-flow geometrija.
3. `M7AnalysisTypesDiagram` nebera keturi identiski tamsus blokai: kiekvienas tipas turi subtilu semantini tona.
4. `M7ThreeAgentsDiagram` roles vizualiai skiriasi ir turi vienoda horizontalu arrow standarta.
5. `M7DataStoryCycleDiagram` turi ciklo/feedback uzuomina desktop rezime, ne vien linear row.
6. Visi clickable rect islaiko `aria-label`, `role=\"button\"`, `tabIndex`, Enter/Space.
7. `EnlargeableDiagram` renderina ta pati React turini modale.

## Statiniu SVG sprendimo kriterijai

Migruoti i React, jei:

- schema moko procesa arba zingsniu seka;
- reikia aktyvaus zingsnio, paaiskinimo, EN/LT lokalizacijos;
- tekstai turi keistis su turiniu.

Palikti kaip iliustracija, jei:

- tai pavyzdinis screenshot/assetas;
- nera zingsniu navigacijos poreikio;
- uztenka alt teksto ir vienodo image frame.

Migruota i React:

- `/da_pipeline_6.svg` kaip M7 DA pipeline linear-process (`M7DaPipelineBlock`);
- `/da_bi_schema_4.svg` kaip 4 zingsniu BI linear-process (`M7BiSchemaBlock`).

Palikti iliustracija bent kol kas:

- `/da_schema_entity_example.svg`, nes tai duomenu schemos pavyzdys, ne mokymosi workflow.

## M4-M6 B grupes stabilizavimo backlog

CODE_REVIEW read-only assessment (2026-06-30) rekomenduoja nedaryti vieno didelio M4-M6 refaktoriaus. Prioritetai:

| Prioritetas | Failai                                                                         | Veiksmas                                                                                                                                       | Rizika / priėmimo kriterijus                                                                                |
| ----------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| P1          | `RlProcessDiagram.tsx`                                                         | B1 atlikta: bendri brand/bg/border/text/flow/radius/opacity tokenai per `diagramTokens`; vėliau svarstyti wrapper chrome `RlProcessBlock.tsx`. | Išlaikyta forward ir feedback semantika; mobile 2x2 geometrija nekeista.                                    |
| P1          | `LlmAutoregressiveDiagram.tsx`                                                 | B1 atlikta: frame, border, flow, muted text, active/inactive opacity per `diagramTokens`.                                                      | `llmAutoregressiveLayout.ts` nekeistas; input/output/chosen semantinės spalvos paliktos lokalios.           |
| P1          | `StrukturuotasProcesasBlock.tsx`                                               | B2 atlikta: status/nav/explanation sluoksnis per `InteractiveDiagramShell`.                                                                    | `StrukturuotasProcesasDiagram.tsx` geometrija nekeista; modalinis React turinys paliktas tas pats.          |
| P2          | `ContextEngineeringPipelineDiagram.tsx`, `contextEngineeringPipelineConfig.ts` | B1 atlikta: pasikartojančios brand/bg/border/text/arrow reikšmės config'e remiasi `diagramTokens`.                                             | Prompt vs context režimai išlieka skirtingi; emerald niuansai palikti lokalūs.                              |
| P2          | `WorkflowComparisonDiagram.tsx`, `workflowComparisonConfig.ts`                 | B2 atlikta: shared chrome tokenizuotas per `diagramTokens`.                                                                                    | Layout, mode switch, animacijos ir output preview neliečiami – tai comparison etalonas.                     |
| P3          | `RagDuomenuRuosimasBlock.tsx`                                                  | Galima dalinė `InteractiveDiagramShell` integracija status/nav sluoksniui.                                                                     | Neišardyti prompt + CopyButton kortelės UX.                                                                 |
| Atskirai    | `LlmArchDiagramDiagram.tsx`, `LlmArchDiagramBlock.tsx`, `llmArchLayout.ts`     | B3 planas: `docs/development/LLMARCH_B3_REFAKTORIAUS_RIZIKOS_PLANAS.md`.                                                                       | DOM matavimas (`ResizeObserver`, `getBoundingClientRect`) jautrus resize, modal ir mode switch scenarijams. |

## Routing cleanup kryptis

Dabartine rizika: `[ContentSlides.tsx](../../src/components/slides/types/ContentSlides.tsx)` turi ilga `section.image.includes(...)` grandine. Tai apsunkina nauju schemu pridejima ir fallback kontrole.

Siulomas registry:

```ts
const diagramRenderers = {
  m7_analysis_types: { render: () => <M7AnalysisTypesBlock />, body: 'after' },
  m9_data_workflow: { render: () => <M9DataWorkflowBlock />, body: 'after' },
  llm_arch_diagram: { render: () => <LlmArchDiagramBlock />, body: 'before' },
};
```

B2 statusas: `diagramRenderers.tsx` apima M1-M9 ir saugius M10/M12/M13/M15 raktus; `ContentSlides.tsx` fallback paliktas legacy / special cases.

## QA vartai

Po schemu refaktoriaus:

1. `npm run lint`
2. `npm test -- --run src/components/slides/shared/__tests__/DiagramLocalization.test.tsx`
3. `npm run validate:schema`, jei keistas JSON
4. Vizualus smoke:
   - LT ir EN;
   - desktop ir mobile;
   - dark mode;
   - modale per `Perziureti pilname dydyje`, jei yra `EnlargeableDiagram`.
5. SCHEME_AGENT patikra:
   - rodykles edge-to-edge;
   - proporcijos;
   - path nekerta bloku;
   - interaktyvumas/a11y.

## B2.5 visual smoke ir registry guard

Statusas: automatinis guard atliktas; agent-side dev/render smoke atliktas B2.6 metu. Reali naršyklinė peržiūra lieka user-side patikra, nes agentas neturi browser valdymo įrankio.

| Sritis                                            | Statusas                                | Įrodymas / pastaba                                                                                                                                        |
| ------------------------------------------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Registry known keys                               | OK                                      | `diagramRenderers.test.tsx` tikrina M10 `m10_trigger_flow` ir M13 `m13_prompt_stack`, kad jie renderina React komponentą, ne `<img>` fallback.            |
| Unknown image fallback                            | OK                                      | `diagramRenderers.test.tsx` tikrina, kad nežinomas raktas grąžina `null`, todėl `ContentSlides.tsx` fallback lieka aktyvus.                               |
| Body placement                                    | OK                                      | `diagramRenderers.test.tsx` tikrina `before`, `after` ir `none` elgesį.                                                                                   |
| Static illustration frame                         | OK                                      | `da_schema_entity_example` renderinamas per `DiagramImageFrame`, turi alt text ir neturi step nav.                                                        |
| `StrukturuotasProcesasBlock` visual smoke         | Agent-side OK / user visual recommended | Dev serveris veikia; `DiagramLocalization.test.tsx` tikrina LT/EN ir step nav kontraktą. Reali modal/keyboard naršyklinė peržiūra lieka žmogaus patikrai. |
| `WorkflowComparisonInteractiveBlock` visual smoke | Agent-side unchanged                    | B2.6 šio komponento nelietė; po B2 token pass rekomenduojama žmogui peržiūrėti toggle, output preview, mobile scroller ir kontrastą.                      |
| M10+ registry visual smoke                        | Registry OK / quality deferred          | `diagramRenderers.test.tsx` saugo M10+ React routing kontraktą; M10 vizualinė kokybė sąmoningai atidėta post-M1–9 trackui.                                |
| Dark mode / mobile                                | Agent-side scoped                       | B2.6 pakeitimai apsiribojo M7–M9 SVG tokenais ir geometrija; dark/mobile reikalinga žmogaus peržiūra representative schemoms.                             |

## B2.6 M7-M9 geometry ir semantics

Statusas: įgyvendinta kaip M1-M9 fokuso iteracija; M10 kokybės remontas neįtrauktas.

| Sritis                                   | Statusas | Įrodymas / pastaba                                                                                                                                                                  |
| ---------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Shared vertical-flow model               | OK       | `M7DataPrepWorkflowDiagram`, `M7DaPipelineDiagram` ir `M9DataWorkflowDiagram` naudoja bendrą `verticalFlowGeometry` helperį 5/6/8 žingsnių dėžutėms, viewBox ir centrui skaičiuoti. |
| 5/6/8 žingsnių ritmas                    | OK       | Bendras `boxHeight`, `gap`, `startY` modelis palieka rodykles kraštas į kraštą per tą patį `DIAGRAM_TOKENS.arrow.markerLen` kontraktą.                                              |
| `M7DataStoryCycleDiagram` cycle-feedback | OK       | Desktop feedback path sustiprintas dashed amber ciklu, start indikatoriumi ir label fonu; mobile lieka vertikalus flow.                                                             |
| Roles-hub semantics                      | OK       | `M7AnalysisTypesDiagram` ir `M7ThreeAgentsDiagram` išlaiko `DIAGRAM_TONE_COLORS`; agentų compact width padidintas, fontai pervesti į `DIAGRAM_TOKENS.font`.                         |
| Guard testai                             | OK       | Pridėtas `verticalFlowGeometry.test.ts`; `DiagramLocalization.test.tsx` išplėstas M7 prep, analysis roles, three agents ir M9 workflow kontraktams.                                 |
| B3 readiness                             | OK       | `LlmArch` neliestas; B3 lieka izoliuotas pagal `LLMARCH_B3_REFAKTORIAUS_RIZIKOS_PLANAS.md`.                                                                                         |

## Pirma iteracija

Si iteracija igyvendina:

- audito dokumenta ir patternu taksonomija;
- minimalu `DiagramKit` wrapperi;
- M7-M9 A grupes wrapper refaktoriu;
- bendrus diagramu tokenus tolesniems vizualiniams pakeitimams;
- routing cleanup krypti ir SVG sprendimo kriterijus;
- `/da_pipeline_6.svg` ir `/da_bi_schema_4.svg` React pakaitalus per registry.
- B1 token sprinta M4-M6 B grupei: `RlProcessDiagram`, `LlmAutoregressiveDiagram` ir `contextEngineeringPipelineConfig` bendri chrome tokenai remiasi `diagramTokens`.
- B2 sistemos sprinta: `StrukturuotasProcesasBlock` wrapper dedup, `WorkflowComparison` shared chrome tokenai, M10+ registry plėtra, `da_schema_entity_example` iliustracijos frame ir atskiras B3 `LlmArch` rizikos planas.
- B2.5 registry guard: `renderDiagramSection()` turi testus known keys, unknown fallback, body placement ir static illustration frame kontraktams.
- B2.6 M7-M9 geometry sprinta: bendras vertical-flow helperis 5/6/8 žingsniams, aiškesnis data story feedback ciklas, roles-hub token/font suvienodinimas ir papildomi guard testai.

Toliau daryti:

- atlikti žmogaus naršyklinį smoke LT/EN, desktop/mobile, dark mode pagal B2.5/B2.6 agent-side įrodymus;
- spręsti `LlmArch` tik pagal B3 rizikos plana.
