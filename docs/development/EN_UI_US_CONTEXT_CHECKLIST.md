# EN UI US context checklist

**Tikslas:** Aprašyti `US (EN)` override taisykles: ką turi matyti tik JAV vartotojai, kai browser locale yra `en-US`.  
**Taikoma:** `src/data/modules-en-us-overrides.json`, susijusi EN dokumentacija ir vartotojui matomas EN copy JAV variante.  
**Pastaba:** Bazinis EN lieka `LT (EN)` / Europos kontekstas, todėl šis checklist netaikomas visam EN turiniui pagal nutylėjimą.

---

## 1. Leidžiamos reikšmės

| Sritis | Leidžiama EN-US | Vengti EN-US |
|--------|------------------|--------------|
| GDP / ekonomika | US GDP, BEA, FRED | Lithuania GDP, Latvia GDP, Eurostat kaip default |
| Oficialūs šaltiniai | Census Bureau (`census.gov`), BEA (`bea.gov`), FRED (`fred.stlouisfed.org`), `data.gov`, Congress.gov, SEC EDGAR, SAM.gov | Stat.gov.lt, Statistics Lithuania, e-TAR kaip default, Seimas |
| Regionai / rinkos | US, Midwest, Northeast, Texas, California, Chicago, Austin, Florida | Baltics, Lithuania, Latvija, Vilnius kaip default EN pavyzdžiai |
| Valiuta | USD | EUR, kai rodoma konkreti suma |
| Terminologija | AI | DI |

---

## 2. Patikros lentelė

| Modulis / skaidrė | Laukas | Taisyklė |
|-------------------|--------|----------|
| M1 intro | `structuredPrompt` | Biudžetas USD, rinka = US (ne Baltics) |
| M1 praktiniai scenarijai | `data`, `scenarioContext`, `template`, `partialSolution`, `hint`, `explanation` | Konkrečios sumos rodomos USD tik `US (EN)` override |
| M4 intro (id 38) | `unstructuredPrompt`, `structuredPrompt` | US GDP; šaltiniai = BEA / Census / FRED |
| M4 konteksto pavyzdžiai | `examplePrompt`, `solutionCopyable`, `solutionSummary` | US market / US regionai, ne Lithuania |
| M4 AI adopcijos skaidrė | `sectionLabel`, `title`, `label`, `source`, `insightCard`, `sources` | Naudoti vieną pagrindinę US business statistiką: about 5–7% (Census Bureau BTOS, 2024) |
| M4 RAG skaidrės | `heading`, `body`, `copyable`, `subtitle` | Default pavyzdžiai = BEA / FRED / data.gov; ne Eurostat kaip pagrindinis variantas |
| M4 atvirų šaltinių skaidrės | `body`, `table`, `copyable` | Rodyti US federal/state sources pagal pavadinimą ir, kai reikia, URL |
| M4 memory / follow-up | `body`, `copyable` | US regionai ir US šaltinių pavyzdžiai |
| M6 HTML / projektų pavyzdžiai | `copyable`, `template` | US vietovės ar neutralus US kontekstas |

---

## 3. Release checklist

- [ ] `US (EN)` aktyvuojamas tik kai browser locale yra `en-US`.
- [ ] Bazinis `LT (EN)` turinys nėra perrašytas tiesiogiai; visi JAV pakeitimai gyvena override faile.
- [ ] Visi GDP pavyzdžiai `US (EN)` variante naudoja US arba aiškiai pasirenkamą šalį, bet ne Lithuania kaip default.
- [ ] `US (EN)` šaltiniai pagal nutylėjimą yra `census.gov`, `bea.gov`, `fred.stlouisfed.org`, `data.gov`.
- [ ] `US (EN)` vartotojui matomuose pavyzdžiuose nėra `Stat.gov.lt`, `Statistics Lithuania`, `e-TAR`, `Baltics`, `Lithuania` kaip default.
- [ ] Visos konkrečios sumos `US (EN)` pavyzdžiuose rodomos USD.
- [ ] EN vartotojui matomuose tekstuose vartojama `AI`, ne `DI`.
- [ ] Jei šaltinis minimas copy ar body, kai naudinga vartotojui pateikiamas ir pavadinimas, ir URL.
- [ ] AI adopcijos skaidrėje pagrindinis US benchmark rodomas kaip `about 5–7% of US businesses use AI (Census Bureau BTOS, 2024)`.

---

## 4. Būsimos lokales

- `EN-US` = USA kontekstas, USA šaltiniai, AI terminologija, taikoma per override sluoksnį.
- `EN-GB` = atskiras default regionas ir atskiri šaltiniai, pvz. ONS ir `gov.uk`.
- Kitos EN lokales neturi paveldėti `EN-US` pavyzdžių automatiškai be aiškios taisyklės dokumentacijoje.
