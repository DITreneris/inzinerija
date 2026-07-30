# M7–M9 schemų ir interaktyvių elementų auditas

> **Data:** 2026-07-30
> **Scope:** 18 gyvų elementų: 10 M7 schemų, 4 M7 interaktyvūs embed'ai, M8 test-scope, 3 M9 elementai.
> **Statusas:** korporatyvinis bundle (tier 9) – kokybės auditas, ne naujas cut.
> **Šaltiniai:** `src/components/slides/shared/*`, `src/components/slides/types/ContentSlides.tsx`, `src/components/slides/types/PracticeQuestIntroSlide.tsx`, `DIAGRAMU_M7_M12_REGISTRY.md`, `teaching-elements-overlay.json`, `DIAGRAM_KIT_STANDARD.md`, `DIAGRAMU_M1_M9_AUDITAS.md` (rubrika).

Šis auditas yra M7–M9 atitikmuo [`M13_M15_SCHEME_AUDIT.md`](M13_M15_SCHEME_AUDIT.md): ta pati rubrika, worst-first ROI eilė. Gyvas inventorius lieka master overlay + [`DIAGRAMU_M7_M12_REGISTRY.md`](DIAGRAMU_M7_M12_REGISTRY.md).

## 0. Produkto sprendimai (2026-07-30)

1. **`toolChoiceBar` auto-select = klaida, ne funkcija.** Auto-select šalinamas 8 M7 skaidrėse; testas, kuris jį įtvirtina, perrašomas.
2. **Compact tipografijos grindys keliamos globaliai** `diagramTokens.ts`, ne per lokalius override'us. W2 etalonų lokalūs `15/13` + `12/11` rodo, kad tokenai atsiliko – ne kad kiekviena schema turi turėti savo dydžius.
3. **Individualumo taisyklė taikoma visoms schemoms, ne tik M13 sibling'ams.** M13 S4-INDIV pamoka išplečiama: kiekviena schema turi turėti savą vizualinę metaforą; mokinys atskiria schemas be step text. Pixel-parity dedupe **nėra** DoD.
4. **Auditas pirmas, kodas paskui.** Ši iteracija = tik dokumentas + registry sync.

## 1. Rubrika

| Ašis              | 5 =                                            | 1 =                             |
| ----------------- | ---------------------------------------------- | ------------------------------- |
| **Korektiškumas** | Geometrija / logika išvedama iš SOT            | Magic numbers; loginis muliažas |
| **A11y**          | Teisingi role/aria; anonsuojami pokyčiai       | ARIA meluoja apie elgesį        |
| **Mobile**        | Compact viewBox arba scroll; skaitomas tekstas | Suspaudžiama iki neįskaitomo    |
| **Pedagogika**    | Interakcija moko sprendimo                     | Dekoracija; atlygis be darbo    |
| **Standartas**    | GOLDEN / DIAGRAM_KIT laikomasi                 | Semantikos kolizija             |
| **Palaikomumas**  | Vienas primityvas, be dublio                   | Copy-paste klonai               |

## 2. Scored registry

| Skaidrė         | Elementas                                 | Avg     | Verdiktas     | Pagrindinė problema                                                                   |
| --------------- | ----------------------------------------- | ------- | ------------- | ------------------------------------------------------------------------------------- |
| **67, 67.8**    | `preCopyCheckBlock`                       | **2.5** | **FAIL**      | „Patikra prieš kopijavimą“ nei eina prieš kopijavimą, nei jo blokuoja                 |
| **M8/80**       | `test-knowledge-scope`                    | **2.7** | **FAIL**      | Temų žemėlapis hardcoded TSX; `contentSot: null`; du burbulai veda į tą pačią skaidrę |
| **×9 skaidrės** | `toolChoiceBar` default chips             | **2.8** | **FAIL**      | Auto-select 0 eilutės; 8 iš 9 be `whenHint`                                           |
| **74 + M9/93**  | `m9_data_workflow` / `m7_master_workflow` | **2.8** | **FAIL**      | Interaktyvios kortelės `role="img"` viduje; 16 tab stop'ų 8 žingsniams                |
| **100**         | `m7_data_story_cycle`                     | **3.0** | PARTIAL       | Compact stack išsilieja 2u; ciklas telefone išnyksta                                  |
| **94**          | `m7_three_agents_flow`                    | **3.2** | PARTIAL       | Mobile sub label netelpa (8px); tone spalvos ignoruoja dark mode                      |
| **92**          | `m7_bi_schema`                            | **3.5** | PARTIAL       | Plona mokymo grąža; 32 % tuščio kadro; nėra matomo hint                               |
| **71**          | `m7_macro_path_map`                       | **3.5** | PARTIAL       | Focus ring ant nefokusuojamo div – klaviatūros fokusas nematomas                      |
| **M9/93**       | `m9_workflow_step_prompts`                | **3.5** | PARTIAL       | Step sync per modulio lygio mutable singleton                                         |
| **731**         | `m7_analysis_types`                       | **3.8** | PARTIAL       | Raw `strokeWidth={3}` + `feDropShadow` glow (stop list)                               |
| **67.7**        | `hallucination-pipeline`                  | **3.8** | PARTIAL       | Du `aria-live` regionai kas 2.8 s autoplay tiką                                       |
| **M9/90**       | `practice-quest-intro`                    | **3.8** | PARTIAL       | Quest map = `role="navigation"` iš neinteraktyvių `<span>`                            |
| 89              | `m7_data_prep_workflow`                   | **4.0** | OK            | Korektiška, bet vizualiai neatskiriama nuo sk. 73                                     |
| 73              | `m7_da_pipeline`                          | **4.2** | OK / etalonas | W2 linear etalonas; geometry SOT eksportuota ir testuota                              |
| 90              | `prompt-tool` surface                     | **4.3** | OK / etalonas | Geriausias interaktyvus elementas M7–M9                                               |
| 67              | `manipulation-contrast` surface           | **4.3** | OK / etalonas | Tikras Blogas/Geras sprendimas; ChoiceControl; lokalizuota                            |

Sk. 95 (`da_schema_entity_example`) – statinė iliustracija su `DiagramImageFrame`; korektiška, į ranking'ą neįtraukta (overlay maturity 2, `contentSot: null`). M8 kitų schemų neturi.

## 3. FAIL detalizacija

### 3.1 `preCopyCheckBlock` (67, 67.8)

`preCopyCheckAnswer` yra write-only būsena: už `renderPreCopyCheck` (`ContentSlides.tsx` ~617–678) ji niekur nenuskaitoma, todėl nė vienas Copy mygtukas nėra išjungiamas, paslepiamas ar atidedamas. Sk. 67.8 blokas užduoda „prieš kopijuojant“ klausimą skaidrėje, kurioje **nėra nė vieno** `copyable` – nėra ko eiti prieš. Sk. 67 jis renderinamas per bottom fallback, t. y. **po** linked copy sekcijų DOM'e.

Papildomai: nėra `role`, nėra `aria-live` ant rezultato, nėra `aria-pressed`, nėra focus ring; blokas hand-rolled, ne per `ChoiceControl`; tas pats pattern dubliuotas su `briefCheckBlock`.

Prioritetinis fix: arba realus copy gate, arba pervadinti ir perkelti; `ChoiceControl` + `aria-live` + focus ring; sk. 67.8 – arba copyable, arba kito tipo patikra.

### 3.2 `test-knowledge-scope` (M8/80)

Visi burbulų labeliai, koordinatės ir deep-link tikslai hardcoded TSX (`contentSot: null`). Matomas kodo rūdis: `void moduleId;` išmeta parametrą `titleFor` (`:199`); pirmasis `canDeepLink` sąlygos narys visada `true` esant prop tipui `8 | 11 | 14` (`:222–224`); „Valymas“ ir „Seka“ burbulai abu veda į `slideId: 891` (`:60–61`, `:72–77`) – dvi skirtingos temos į vieną vietą. SVG fallback apeina tokenus: `#334e68` / `#102a43`, `fontSize="10"` (`:281–291`). Slide index'as skaičiuojamas runtime per `getModulesSync` + `findIndex`, todėl failas priklauso nuo gyvos modulių eilės.

Prioritetinis fix: content SOT ištraukimas, tokenai, unikalūs deep-link tikslai, mirusių šakų šalinimas.

### 3.3 `toolChoiceBar` default chips (731, 733, 734, 76, 77, 84, 861, 88, 71.35)

Effect'as `ContentSlides.tsx` ~546–564 mount metu nustato pirmą eilutę (`bar.choices?.[0]?.rowIndex ?? 0`), nebent `autoSelect === false`. Nė viena M7 skaidrė to nenustato, todėl pirmas linked promptas atsiskleidžia mokiniui nieko nepasirinkus – **atlygis be darbo**, ta pati klasė kaip M13 13.47 readiness meter. Aštuonios iš devynių neturi `whenHint`, todėl chip paspaudimas pakeičia promptą nepaaiškinęs, kodėl tas pasirinkimas teisingas; hint'us turi tik sk. 84.

Lentelinis variantas (84, 71.35) eilėms naudoja `role="button"` + `tabIndex={0}` be `aria-pressed` / `aria-selected`. Nė vienas variantas neanonsuoja turinio pasikeitimo.

Prioritetinis fix: auto-select šalinimas + testo perrašymas (sprendimas §0.1), `whenHint` visoms, `aria-live` ant linked turinio.

### 3.4 `m9_data_workflow` / `m7_master_workflow` (74, M9/93)

Vienintelis kietas a11y blocker'is M7–M9. Wrapper'is yra `role="img"` (`M9DataWorkflowDiagram.tsx:176–180`), o ARIA `img` vaikus laiko prezentaciniais – tačiau viduje aštuonios kortelės turi `role="button"`, `tabIndex={0}`, `aria-pressed`, `aria-label` (`:102–105`). Rezultatas: aštuoni fokusuojami elementai be atskleisto role/name (WCAG 4.1.2), plius dubliuotas klaviatūros kelias su aštuoniais Shell nav mygtukais (`M9DataWorkflowBlock.tsx:75–102`) – **16 tab stop'ų aštuoniems žingsniams**.

Sibling'as tai daro teisingai: `HallucinationPipelineDiagram` kortelėms naudoja `tabIndex={-1}` + `aria-hidden`, kaip reikalauja `DIAGRAM_KIT_STANDARD` HTML checklist (Shell nav = keyboard primary). Komponentas renderinamas **dviejose** skaidrėse, o `M9DataWorkflowDiagram.test.tsx` korteles klikina, bet nieko iš to nesaugo.

Prioritetinis fix: kortelės → `tabIndex={-1}` + `aria-hidden`; `role="img"` kolizijos sprendimas; guard testas dubliuotiems tab stop'ams.

## 4. PARTIAL detalizacija

### 4.1 `m7_data_story_cycle` (100)

Du defektai. Pirma, compact stack'as išsilieja iš savo viewBox: `74 + 4 × (54 + 22) + 54 = 432` prieš `COMPACT_VIEWBOX_H = 430` (`:32–38`), todėl penktoji dėžė nukerpama 2u. Compact dėžės pozicionuojamos ranka, ne per `resolveVerticalFlowGeometry`. Antra, feedback U path'as uždarytas už `!isCompactDiagram` (`:203`), todėl telefone mokinys mato paprastą vertikalų stulpelį, o `aria-label` vis dar skelbia penkių žingsnių **ciklą**. 2026-06 auditas jau fiksavo „vadina ciklu, bet atrodo kaip tiesinė seka“ – desktop pataisyta, mobile liko atvira.

Desktop label „3. Vizualizacija“ ≈110u prieš 108u dėžę – tekstas be padding'o iki kraštų.

### 4.2 `m7_three_agents_flow` (94)

Naudoja statinį `DIAGRAM_TONE_COLORS` (`:95`, `:184`), o roles-hub sibling'as 731 – dark-aware `getDiagramToneColors(isDark)` (`M7AnalysisTypesDiagram.tsx:56`). Tone užpildai neprisitaiko prie dark mode. Compact dėžė 92u, o sub label „Šaltiniai ir struktūra“ ≈96u – netelpa, ir dar 8px šriftu. Apatiniai 78u iš 220 (35 %) tušti.

### 4.3 `m7_bi_schema` (92)

Compact telpa (4u marža), bet 10/8px tekstas žemiau grindų. Keturi žingsniai turi vienažodžius desc („Duomenys“, „Įžvalgos“, „Vadovybei“, „Toliau“) – plona mokymo grąža. Matomo hint teksto nėra (tik title `:153–165`), nors `aria-label` žada „Paspausk žingsnį“; sibling'ai hint rodo. Apatiniai 70u iš 220 (32 %) tušti. Neaktyvios dėžės dimminamos dukart: soft fill + `opacity.inactive`.

### 4.4 `m7_macro_path_map` (71)

`focus-visible:ring-*` klasės gyvena vidiniame `panel` div (`:96`), o fokusą gauna išorinis `<button>` (`:138–140`), kuris focus stilių neturi. `:focus-visible` niekada nesumatchina → klaviatūros fokusas nematomas (WCAG 2.4.7).

### 4.5 `m7_analysis_types` (731)

Raw `strokeWidth={isActive ? 3 : ...}` (`:186`) vietoj `DIAGRAM_TOKENS.stroke.active` (2.5); `feDropShadow` filtras aktyviai dėžei (`:103–117`) yra glow – LMS stop list punktas. Kitaip stipri: keturi semantiniai tonai, rolesHub tipografija atitinka grindis.

### 4.6 `hallucination-pipeline` (67.7)

Autoplay padarytas teisingai: `prefers-reduced-motion` išjungia interval'ą ir particles, pin pauzuoja, Play/Pause turi `aria-pressed`. Bet du `aria-live="polite"` regionai (`HallucinationPipelineBlock.tsx:88–90` + `diagramKit.tsx:178–179`) atsinaujina kas ~2.8 s tiką – screen reader spam. `usePrefersReducedMotion` dubliuotas lokaliai. Overlay turi **du** įrašus tam pačiam elementui (žr. §5.4).

### 4.7 `practice-quest-intro` (M9/90)

Geriausia pedagogika M7–M9: confirm gate realus, pasirinkimas persistuojamas į `moduleJourneyFocus[9]` ir suvartojamas sk. 93. Bet quest map deklaruotas `role="navigation"` (`:203–206`), o žingsniai yra neinteraktyvūs `<span>` (`:241–260`) – navigacija be navigavimo. `statusHint` renderinamas be `aria-live`. JSON `branchIds` šiame komponente nenaudojami.

### 4.8 `m9_workflow_step_prompts` (M9/93)

Step sync per modulio lygio mutable singleton (`m9WorkflowSharedStep.ts`), be subscription; `resetM9SharedWorkflowStep()` egzistuoja tik testams. `LABELS` LT/EN dubliuoti komponente atskirai nuo prompt SOT.

## 5. Sisteminiai radiniai

### 5.1 Mobile tipografijos grindys pažeistos token lygyje

`DIAGRAM_TOKENS.typography` (`diagramTokens.ts:54–61`) nustato `stepSub.compact: 8`, `subtitle.compact: 9`, `stepLabel.compact: 10`, o šio projekto rubrika (`DIAGRAMU_M1_M9_AUDITAS.md`, Readability) reikalauja SVG tekstas ≥10px, pagrindiniai labeliai ≥12px. Kiekviena M7 schema, kuri compact režime naudoja token defaults, telefone rodo per mažą tekstą (92, 94, 100). Du W2 etalonai (73, 89) išsigelbėjo tik todėl, kad lokaliai hardcode'ino `15/13` ir `12/11`. Tai ir yra diagnozė: etalonai tyliai pasidarė opt-out, o skola nuėjo sibling'ams. Sprendimas §0.2 – kelti tokenus.

### 5.2 HTML kortelių klaviatūros kontraktas išsiskyrė

`tabIndex={0}` M9 prieš `tabIndex={-1}` + `aria-hidden` hallucination pipeline. Registry priėmimo vartai #3 tikrina tik `svg [role="button"]` / `svg [tabindex="0"]`, todėl **HTML** kortelių diagramos pro vartus pralenda netikrintos. Ta pati klasė kaip M13 `smoke-diag1-m1315.mjs`, kur `overflowX` buvo matuojamas, bet neįtrauktas į `ok`.

2026-07-30 `role="img"` sweep: M7–M9 blocker'is lieka `M9DataWorkflowDiagram` (74 + M9/93) – wrapper `role="img"` turi interaktyvias korteles. M7–M9 kiti `role="img"` atvejai yra SVG / statiniai: `M7DataStoryCycleDiagram`, `M7ThreeAgentsDiagram`, `M7BiSchemaDiagram`, `M7DaPipelineDiagram`, `M7DataPrepWorkflowDiagram`, `M7AnalysisTypesDiagram`, `TestKnowledgeScopeDiagram` SVG fallback – OK. Priority candidates už M7–M9 ribų: `PortalBeatDiagram` ir `AppNav` wrapper'iai statiniai – OK; `LlmArchDiagramDiagram` uždaro `role="img"` prieš mygtukų grupę – OK. Rastas atskiras **cross-module FAIL** su SVG internals: `Schema3InteractiveDiagram`, `RagDuomenuRuosimasDiagram`, `WorkflowComparisonDiagram`, `ContextEngineeringPipelineDiagram`, `LlmAutoregressiveDiagram` turi `role="button"` / `tabIndex={0}` SVG viduje; tai ne M79-S2a, todėl įrašyta kaip `A11Y-SWEEP` TODO.

### 5.3 Miręs kadras

Sk. 94 – 78 iš 220u (35 %); sk. 92 – 70 iš 220u (32 %); sk. 100 – ~77 iš 268u (29 %) tuščia po turiniu. Tai LMS polish brief'o „PowerPoint gestalt“ ir pigiausiai taisoma viewBox kirpimu (I3 pamoka: kirpti orą, ne didinti BOX ir viewBox kartu).

### 5.4 Overlay drift

- `off:hallucination-pipeline` (maturity 3, realus SOT) ir `slide-type:hallucination-pipeline` (maturity 2, `contentSot: null`) – **du įrašai tam pačiam gyvam elementui**.
- `off:test-knowledge-scope` – `moduleId: null`, `slideId: null`, `contentSot: null`.
- `lab:m9_workflow_step_prompts` – `contentSot` rodo į komponentą, nors promptai gyvena `m9DataWorkflowContent.ts`.

### 5.5 Dvyniai spine'ai viename modulyje

`M7_DA_PIPELINE_GEOMETRY` ir `M7_DATA_PREP_GEOMETRY` skiriasi tik `stepCount` (6 vs 5) ir `viewBoxH`; `boxH`, `gap`, `startY`, `colW`, `stepLabel`, `stepSub`, baseline'ai identiški. Du ~275 eilučių failai, dvi skaidrės (73 ir 89) tame pačiame modulyje, vizualiai neatskiriamos. Pagal §0.3 – metaforos diferenciacija, ne pixel-parity dedupe.

### 5.6 Pasirinkimas be anonso

Nė vienas `toolChoiceBar` variantas ir `preCopyCheckBlock` neanonsuoja turinio pasikeitimo po pasirinkimo. Moduliui, kurio visa interakcija yra „pasirink – promptas pasikeičia“, screen reader vartotojas negauna jokio signalo.

### 5.7 Testai matuoja buvimą, ne kokybę

Chips auto-select **įtvirtintas** praeinančiu testu; `M9DataWorkflowDiagram.test.tsx` klikina korteles nesaugodamas dubliuotų tab stop'ų; nė vienas testas netikrina sk. 100 compact viewBox fit; `PromptFilterToolSurface` / `ManipulationContrastToolSurface` / `useAutoplaySteps` neturi dedikuotų testų.

## 6. Max-ROI iteracijos

| #   | Batch           | Skaidrės            | Veiksmas                                                                                |
| --- | --------------- | ------------------- | --------------------------------------------------------------------------------------- |
| 1   | **A1-GATE**     | 67, 67.8            | Realus copy gate arba pervadinimas + perkėlimas; ChoiceControl, `aria-live`, focus ring |
| 2   | **A1-CHIPS**    | ×9                  | Auto-select šalinimas + testo perrašymas; `whenHint`; `aria-live`                       |
| 3   | **A2-CARDS**    | 74, M9/93           | `tabIndex={-1}` + `aria-hidden`; `role="img"` kolizija; guard testas                    |
| 4   | **A2-SCOPE**    | M8/80               | Content SOT, tokenai, unikalūs deep-link tikslai, mirusių šakų šalinimas                |
| 5   | **A3-TYPE**     | tokenai + 92/94/100 | Compact grindys `diagramTokens`; re-fit; sk. 100 2u clip; mobile ciklo užuomina         |
| 6   | **A4-CANVAS**   | 94, 92, 100         | Miręs kadras – viewBox kirpimas                                                         |
| 7   | **A5-INDIV**    | 73 vs 89 (+ visos)  | Metaforos individualumas pagal §0.3                                                     |
| 8   | **A6-REGISTRY** | overlay             | Dublių šalinimas, `contentSot` korekcijos                                               |

A1–A2 yra mokiniui matomi korektiškumo ir prieinamumo defektai; A3–A4 yra apdailos kokybė. A3 keičia bendrus tokenus, todėl reikalauja cross-modulinio re-fit ir `lmsCaptionTokenPolish` / geometry testų peržiūros.

## 7. Rizikos

- A1-CHIPS laužia praeinantį testą – tai laukiama pagal §0.1, bet testo perrašymas turi būti diff'e, ne tyliai `skip`.
- A3-TYPE paliečia M1–M15 diagramas, ne tik M7–M9; kiekviena schema, kuri compact režime pasikliauja token defaults, turi būti re-fit'inta ir patikrinta dėl naujų overflow'ų.
- A2-CARDS keičia dviejų skaidrių a11y vienu komponentu – reikia LT/EN + dark smoke abiejose (74 ir M9/93).
- A5-INDIV yra didžiausio scope batch'as; pagal M13 pamoką jis neturi degeneruoti į shared renderer refactor.
- M7–M9 yra korporatyvinis bundle – nė vienas batch'as neturi įjungti naujo cut ar keisti atrakinimo logikos.
