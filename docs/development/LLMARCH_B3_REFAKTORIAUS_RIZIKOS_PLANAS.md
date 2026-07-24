# LlmArch B3 Refaktoriaus Rizikos Planas

> Tikslas: suplanuoti `LlmArch` schemos refaktorių atskirai nuo B2, nes return path priklauso nuo DOM matavimo, modalinio vaizdo ir režimų perjungimo.

## Kodėl tai atskiras darbas

`LlmArchDiagramDiagram.tsx` nėra paprasta SVG schema. Return path apskaičiuojamas runtime pagal `getBoundingClientRect()`, `ResizeObserver` ir aktyvų režimą (`basic`, `rag`, `tool`). Tai reiškia, kad net mažas layout, padding, modal ar resize pakeitimas gali pakeisti rodyklės kelią.

## Rizikos

| Rizika                                     | Kur                                               | Ką tikrinti                                                      |
| ------------------------------------------ | ------------------------------------------------- | ---------------------------------------------------------------- |
| Return path pasislenka po resize           | `LlmArchDiagramDiagram.tsx` `computeReturnPath()` | Desktop, mobile width, modal open/close                          |
| Modal rodo kitokį path nei skaidrė         | `LlmArchDiagramBlock.tsx` + `EnlargeableDiagram`  | Skaidrė ir pilnas dydis turi rodyti tą patį režimą               |
| Režimo perjungimas palieka seną path       | `returnFrom`, `useLayoutEffect`                   | `basic` → `rag` → `tool` → `basic`                               |
| DOM matavimas nevyksta be `ResizeObserver` | fallback šaka `if (!Ctor) return`                 | Naršyklės / test env, kur nėra `ResizeObserver`                  |
| Tokenizavimas pakeičia semantiką           | lokalūs `TOKENS`                                  | Mėlynas LLM, žalias output, pilkas return line turi likti aiškūs |

## B3 Siūloma Seka

1. Parašyti vizualinį smoke checklist prieš kodą:
   - desktop skaidrė;
   - mobile / siauras viewport;
   - `Peržiūrėti pilname dydyje`;
   - režimai `basic`, `rag`, `tool`;
   - LT ir EN.
2. Išskirti return path skaičiavimą į mažą testuojamą helperį tik jei galima išlaikyti tą pačią formulę.
3. Tik po to tokenizuoti shared chrome:
   - frame bg / border;
   - muted text;
   - return line;
   - radius / shadow, jei vizualiai nesikeičia.
4. Po kiekvieno žingsnio atlikti SCHEME checklist:
   - rodyklės kraštas į kraštą;
   - path nekerta blokų;
   - proporcijos;
   - interaktyvumas ir modal parity.

## 2026-07 Discovery Status

Atlikta read-only peržiūra prieš bendros design-system revizijos tęsinį. Sprendimas: `LlmArch` lieka atskiras B3 trackas ir nėra migruojamas kartu su paprastesnėmis `DiagramStepHitArea` diagramomis.

Patvirtintos priklausomybės:

- `LlmArchDiagramDiagram.tsx` naudoja `useLayoutEffect`, `getBoundingClientRect()` ir `ResizeObserver`, kad perskaičiuotų `returnPath`.
- `returnFrom` keičiasi pagal režimą: `basic` neturi grįžtamojo kelio, `rag` grįžta iš DB, `tool` grįžta iš įrankių.
- `LlmArchDiagramBlock.tsx` perduoda tą patį `mode` į `EnlargeableDiagram`, todėl modal parity turi būti tikrinama per režimų perjungimą prieš ir po modalinio vaizdo atidarymo.
- Dabartiniai arbitrary class / inline style radiniai šiame komponente laikomi B3 radiniais, ne bendro token-hotspot sprinto taikiniu.

**Statusas 2026-07-24:** B3 įgyvendinta kaip Type Etalon W6. `computeReturnPath` → `llmArchReturnPath.ts` + unit tests; mode-absent placeholders; brand active; Agentinis rename. Naršyklinis smoke vis dar rekomenduojamas release QA (`basic → rag → tool → basic`).

## Kas Neįeina Į B3

- Mokymosi tekstų ir režimų semantikos perrašymas.
- `modules.json` raktų keitimas.
- Didelis `EnlargeableDiagram` refaktorius.

## Priėmimo Kriterijai

- `basic` režime return path nerodomas.
- `rag` režime return path eina iš DB į LLM.
- `tool` režime return path eina iš įrankių į LLM.
- Modalinis vaizdas po režimo pakeitimo rodo tą patį aktyvų režimą ir perskaičiuotą path.
- Jei `ResizeObserver` nepasiekiamas, schema nelūžta ir pagrindinis horizontalus srautas lieka skaitomas.
