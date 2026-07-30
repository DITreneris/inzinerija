# M13-M15 schemu ir interaktyviu elementu auditas

> **Data:** 2026-07-30  
> **Scope:** 12 elementu: 8 SVG schemos, 3 interaktyvus elementai ir M14 be schemu.  
> **Statusas:** authoring kokybe; production release **Deferred**.  
> **Saltiniai:** `src/components/slides/shared/*`, `src/components/VaizdoGeneratoriusSlide.tsx`, `src/components/I2vGeneratoriusSlide.tsx`, `DIAGRAMU_M13_M15_REGISTRY.md`, `GOLDEN_STANDARD.md` §3.1b/§3.1c/§6b, `scripts/smoke-diag1-m1315.mjs`.

Sis auditas papildo `M13_M15_SLIDE_RANKING_AUDIT.md`: ten vertintos skaidres, cia vertinamos schemos ir interaktyvus elementai.

## 1. Rubrika

| Asis              | 5 =                                            | 1 =                             |
| ----------------- | ---------------------------------------------- | ------------------------------- |
| **Korektiskumas** | Geometrija / logika isvedama is SOT            | Magic numbers; loginis muliazas |
| **A11y**          | Teisingi role/aria; anonsuojami pokyciai       | ARIA meluoja apie elgesi        |
| **Mobile**        | Compact viewBox arba scroll; skaitomas tekstas | Suspaudziama iki neiskaitomo    |
| **Pedagogika**    | Interakcija moko sprendimo                     | Dekoracija; atlygis be darbo    |
| **Standartas**    | GOLDEN §6b / DIAGRAM_KIT laikomasi             | Semantikos kolizija             |
| **Palaikomumas**  | Vienas primityvas, be dublio                   | Copy-paste klonai               |

## 2. Scored registry

| id         | Elementas             | Avg     | Verdiktas     | Pagrindine problema                                                                 |
| ---------- | --------------------- | ------- | ------------- | ----------------------------------------------------------------------------------- |
| **13.47**  | I2V generatorius      | **2.2** | **FAIL**      | Readiness meter turejo konstantinius check'us; vienas keyframe simbolis rode Ready. |
| **13.37**  | Vaizdo generatorius   | **2.6** | **FAIL**      | Fake `tablist`; LT UI formos laukai turejo EN `aria-label`.                         |
| **150.25** | M15 practice loop     | **2.8** | **FAIL**      | Fiksuotas 620 viewBox su `reflow` telefone smulkino tekstus iki neiskaitomu.        |
| **13.325** | Consistency drift lab | **3.4** | PARTIAL       | Rose reiske ir gera After-lock busena, ir Simptomas/error.                          |
| **13.33**  | Rule of thirds        | **3.4** | PARTIAL       | Techniskai tvarkinga, bet maziausia mokymo graza.                                   |
| 13.11      | Turinio workflow      | **4.0** | OK            | 7 zingsniu vertikali schema; didelis aukstis, bet naudinga.                         |
| 13.52      | Post-prod             | **4.2** | OK            | W2 linear etalonas, bet klonas.                                                     |
| 13.32      | Consistency lock      | **4.2** | OK            | W2 linear etalonas, bet klonas.                                                     |
| 13.12      | Media pipeline        | **4.2** | OK            | W2 linear etalonas, bet klonas.                                                     |
| 13.2       | Prompt stack          | **4.2** | OK            | Tinkamas stack etalonas.                                                            |
| 13.1       | AEC funnel            | **4.4** | OK / etalonas | Geriausias M13-15 schema patternas.                                                 |

M14 turi tik Path Test luksta; schemu nera.

## 3. FAIL detalizacija

### 3.1 13.47 I2V generatorius

Pries taisyma `readiness` buvo beveik visas konstantinis: duration visada validus, motion uzpildomas automatiskai, o lock default buvo `true`. Mokinys realiai valde tik `keyframe`, todel badge galejo rodyti Ready po vieno simbolio. Tai pedagoginis bugas, ne polish.

Prioritetinis fix: motion be default pasirinkimo, lock checkbox'ai neaktyvus pagal nutylejima, Ready tik kai yra keyframe + motion + bent vienas lock + valid duration. Testai turi drausti `medium`/`ready` busena be keyframe.

### 3.2 13.37 Vaizdo generatorius

Step pill'ai buvo deklaruoti kaip tabai (`role="tablist"` / `role="tab"`), bet nevalde jokiu `tabpanel`. Sekcijos visada renderinamos, todel ARIA neteisingai aprase UI. Dalis lauku turejo `aria-label={name}` (`goal`, `audience`, `cta`) vietoj lokalizuotu label'iu.

Prioritetinis fix: step pill'ai lieka paprasti button'ai vizualiam fokusui; `FieldLabel` gauna `htmlFor`; inputs/selects/textarea turi `id` ir lokalizuota programini label'i.

### 3.3 150.25 M15 practice loop

Schema naudojo fiksuota 620 viewBox ir `mobileBehavior="reflow"`. Telefonuose ji susitraukdavo vietoj scroll, todel zingsniu label'iai tapdavo neiskaitomi. Feedback lankas buvo hardcoded SVG path, ne isvestas is `m15PracticeLoopLayout.ts`.

Prioritetinis fix: mobile scroll, `stepLabel` dydis box label'iams ir feedback path helperis layout faile.

## 4. PARTIAL detalizacija

### 4.1 13.325 Consistency drift lab

Produkto sprendimas 2026-07-30: **After-lock turi buti emerald; rose lieka Simptomas/error prasmei.** GOLDEN §6b tikslinama, kad Before/After strip nenaudotu rose kaip gero rezultato zenklo tame paciame lab'e.

Papildomi fix'ai: `ui.hint` kelti virs ref checklist, mirror status pills prideti `aria-live="polite"`, pasalinti dead ternary content helperyje.

### 4.2 13.33 Rule of thirds

Techniskai OK, bet mokymo graza zema: tinklelis be objekto ar kontrasto. **S5-THIRDS:** subject motif ant desines sankirtos (+ muted centras); daryti pries / greta S4-INDIV.

## 5. Sisteminiai radiniai

1. `smoke-diag1-m1315.mjs` negalejo pagauti siu problemu: `overflowX` buvo matuojamas, bet neitrauktas i `ok`, o generatoriai 13.37 / 13.47 ir lab 13.325 neturejo browser shot'u.
2. `M13MediaPipelineDiagram`, `M13ConsistencyLockDiagram`, `M13PostprodDiagram` ir `TurinioWorkflowDiagram` dalijasi ta pačia vertical-flow **forma**. Produktinis sprendimas 2026-07-30: epic = **S4-INDIV** (metaforos: linear / lock-artifact / timeline / cycle), ne `VerticalFlowDiagram` pixel-parity dedupe.
3. Dead ternary pattern'ai rode lokalizacijos copy-paste rizika.

## 6. Max-ROI iteracijos

| #   | Batch         | id                      | Veiksmas                                                                        |
| --- | ------------- | ----------------------- | ------------------------------------------------------------------------------- |
| 1   | **S1-METER**  | 13.47                   | Realus readiness meter + testu perrasymas.                                      |
| 2   | **S1-A11Y**   | 13.37                   | Fake tablist salinimas, lokalizuoti formu label'iai, i18n tips.                 |
| 3   | **S2-MOBILE** | 150.25                  | Mobile scroll, label dydis, feedback path is layout.                            |
| 4   | **S2-ROSE**   | 13.325                  | After-lock emerald + GOLDEN/registry sync.                                      |
| 5   | **S3-GATES**  | visi                    | Smoke shots + `overflowX` kaip blocking signalas.                               |
| 6   | **S4-INDIV**  | 13.12/13.32/13.52/13.11 | Vizualinės metaforos (linear / lock / timeline / cycle); ne thin-facade dedupe. |
| 7   | **S5-THIRDS** | 13.33                   | Pedagoginis liftas (subject motif); daryti prieš arba greta S4-INDIV.           |

## 7. Rizikos

- 13.47 testas, kuris leido `medium` be keyframe, turi buti perrasytas.
- 150.25 scroll telefone yra greiciausias ROI, bet ne toks elegantiskas kaip naujas compact viewBox.
- Production release lieka Deferred, todel si iteracija neturi ijungti naujo corporate cut.
