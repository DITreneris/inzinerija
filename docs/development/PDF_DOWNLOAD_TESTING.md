# PDF atsisiuntimo testai ir pernaudojamumas

> Testų infrastruktūra skirta PDF atsisiuntimo funkcijai (intro-action-pie skaidrė) ir kitose skaidrėse naudojimui.

**Būsena (2026-07-09):** Pilnas `npm run test:run` – 71 testų failas, 465 testai praeina. PDF serija dengia intro-action-pie, M1/M4/M5/M6/M7–9/M10–12/M13–15 atmintines, completion artefaktų registry ir sertifikatų atsisiuntimo smoke testus.

**„Mano medžiaga“ (ModulesPage):** pakartotinis atmintinių/sertifikatų atsisiuntimas. **Pozicija (2026-07-23):** juosta grid’e **po paskutinio** modulio su `id <= maxAccessible`, **prieš** tier-locked track’us ir coming-soon – ne puslapio apačioje po visų užrakintų kortelių. SOT: `GOLDEN_STANDARD.md` §8.4; regresija: `ModulesPage.materials.test.tsx`.

---

## Kas testuojama

- **Unit testai** ([src/utils/**tests**/introPiePdf.test.ts](../../src/utils/__tests__/introPiePdf.test.ts)):
  - **jsPDF mock** – tikras `doc.save()` nevykdomas; naudojamas mock su `save`, `text`, `setFontSize`, `setTextColor`, `splitTextToSize` ir kt.
  - **downloadIntroPiePdf:** `doc.save` iškvietimas vieną kartą; filename atitinka segmento pavadinimą (`Promptu_anatomija_*.pdf`); galima perduoti custom `filename`; `doc.text` kviečiamas su „Promptų anatomija“ ir segmento `title`.
  - **ensurePdfFont:** kai `fetch` nepavyksta – funkcija nemeta klaidos; kai `fetch` sėkmingas – vėlesnis `downloadIntroPiePdf` naudoja šriftą (`addFileToVFS` iškvietimas).
  - **7 segmentų smoke:** visi segmentai iš `introPiePdfContent.segments` su tikrais `tools` / `glossary` Map’ais – `downloadIntroPiePdf` kviečiamas 7 kartus be exception.

- **Komponento testas** ([src/components/slides/types/content/**tests**/IntroActionPieSlide.pdf.test.tsx](../../src/components/slides/types/content/__tests__/IntroActionPieSlide.pdf.test.tsx)):
  - **Mock:** `introPiePdf` modulis – `ensurePdfFont` ir `downloadIntroPiePdf` kaip `vi.fn()`.
  - **Scenarijus:** renderinamas `IntroActionPieSlide` su minimaliu `content` (1 segmentas), pasirenkamas segmentas, paspaudžiama „Palyginti su statistika“, tada „Eksportuok PDF“.
  - **Patikrinimas:** `ensurePdfFont` iškvietimas 1 kartą; `downloadIntroPiePdf` iškvietimas su segmentu, atitinkančiu pirmą įrašą iš `introPiePdfContent.segments`, ir su `toolsByName` / `glossaryByTerm` (Map).

**CODE_REVIEW pastaba:** Testai nepriklauso nuo tikro tinklo ar fontų failo; jsPDF pilnai mock’inamas. 7 segmentų testas naudoja tikrus JSON duomenis, bet ne tikrą jsPDF – greitas ir deterministinis.

---

## Kaip pridėti PDF atsisiuntimą į kitą skaidrę

1. **Duomenys:** Turėkite payload’ą tipo `IntroActionPiePdfSegment` ([src/types/modules.ts](../../src/types/modules.ts)) (arba tokią pačią struktūrą): `title`, `top5Tips`, `mainToolName`, `additionalToolNames`, `workflowSteps`, `glossaryTermNames`, `systemPrompt`, `motivationWish`. Įrankiai ir žodynas – iš [tools.json](../../src/data/tools.json) / [glossary.json](../../src/data/glossary.json) arba atitinkamo JSON; Map’ai pagal `name` ir `term`.

2. **Skaidrėje:** Mygtukas (pvz. „Eksportuok PDF“), kurio `onClick`:

   ```ts
   const handlePdf = async () => {
     if (!segment) return;
     await ensurePdfFont();
     downloadIntroPiePdf(segment, toolsByName, glossaryByTerm, filename?);
   };
   ```

   Importuoti iš [src/utils/introPiePdf.ts](../../src/utils/introPiePdf.ts): `ensurePdfFont`, `downloadIntroPiePdf`, tipai `ToolInfo`, `GlossaryTermInfo`.

3. **Duomenų šaltinis:** Naujas JSON (pvz. `xyzPdfContent.json`) arba esamas `introPiePdfContent` – pagal tos skaidrės kontekstą. Jei naudojate bendrą introPiePdfContent – skaidrė tiesiog perduoda atitinkamą `segments[i]`.

4. **Teste:** Mock’uokite `introPiePdf`: `vi.mock('@/utils/introPiePdf')` (arba santykinis kelias) su `ensurePdfFont` ir `downloadIntroPiePdf` kaip `vi.fn()`. Po mygtuko paspaudimo patikrinkite: `ensurePdfFont` ir `downloadIntroPiePdf` iškvietimai su teisingu segmentu ir Map’ais.

---

## Atmintinių serijos bendras maketas

- **Kit:** [src/utils/handoutPdfKit.ts](../../src/utils/handoutPdfKit.ts) valdo M1/M4/M5/M6/M7–9/M10–12/M13–15 PDF header, tipografiją, sekcijų border, footer, `textWithLink` ir UTM helperius.
- **CTA pakopos:** M1/M4 – value-only be outbound; M5/M6 – minimalus website footer; M7–9/M10–12/M13–15 – 2 psl. ekosistemos funnel su `utm_medium=handout`.
- **UI:** Completion ir skaidrių mygtukams naudoti [src/components/HandoutDownloadButton.tsx](../../src/components/HandoutDownloadButton.tsx), kad PDF atmintinių serija turėtų vienodą Download ikoną, `aria-label` ir focus stilių.

## Modulio 1 atmintinė (PDF)

- **Vieta:** Modulio 1 užbaigimo ekranas – mygtukas „Parsisiųsti Modulio 1 atmintinę (PDF)“. Tai first-win atmintinė, nepriklausanti nuo testo ar sertifikato.
- **API:** [src/utils/m1HandoutPdf.ts](../../src/utils/m1HandoutPdf.ts) – `downloadM1HandoutPdf(content, filename?, locale?)`. Duomenys – [src/data/m1HandoutContent.json](../../src/data/m1HandoutContent.json) ir [src/data/m1HandoutContent-en.json](../../src/data/m1HandoutContent-en.json).
- **Funnel apsauga:** M1 PDF neturi ekosistemos CTA ar outbound nuorodos; tik praktinis 6 blokų šablonas ir first-win checklist.
- **Testai:** [src/data/**tests**/m1HandoutContent.test.ts](../../src/data/__tests__/m1HandoutContent.test.ts), [src/utils/**tests**/m1HandoutPdf.test.ts](../../src/utils/__tests__/m1HandoutPdf.test.ts) ir [src/components/**tests**/ModuleCompleteScreen.test.tsx](../../src/components/__tests__/ModuleCompleteScreen.test.tsx) dengia turinio paritetą, PDF smoke ir M1 completion mygtuką.

## Modulio 5 atmintinė (PDF)

- **Vieta:** Skaidrė 514 (Testo rezultatai) – mygtukas „Parsisiųsti Modulio 5 atmintinę (PDF)“ abiejuose rezultatuose (passed ir failed). Pažadas – skaidrė 45.5 (handoutPromise po reveal).
- **API:** [src/utils/m5HandoutPdf.ts](../../src/utils/m5HandoutPdf.ts) – `downloadM5HandoutPdf(content, filename?, locale?)`. Duomenys – [src/data/m5HandoutContent.json](../../src/data/m5HandoutContent.json) ir [src/data/m5HandoutContent-en.json](../../src/data/m5HandoutContent-en.json). Maketas per [src/utils/handoutPdfKit.ts](../../src/utils/handoutPdfKit.ts).
- **Testai:** [src/utils/**tests**/m5HandoutPdf.test.ts](../../src/utils/__tests__/m5HandoutPdf.test.ts) tikrina filename, brand tekstą ir realaus JSON smoke; M5 mygtukas naudoja bendrą [src/components/HandoutDownloadButton.tsx](../../src/components/HandoutDownloadButton.tsx).

## Modulio 6 atmintinė (PDF)

- **Vieta:** Modulio 6 užbaigimo ekranas ir skaidrė 64 – mygtukas „Parsisiųsti Modulio 6 atmintinę (PDF)“.
- **API:** [src/utils/m6HandoutPdf.ts](../../src/utils/m6HandoutPdf.ts) – `downloadM6HandoutPdf(content, filename?, locale?)`. Duomenys – [src/data/m6HandoutContent.json](../../src/data/m6HandoutContent.json) ir [src/data/m6HandoutContent-en.json](../../src/data/m6HandoutContent-en.json). Maketas per [src/utils/handoutPdfKit.ts](../../src/utils/handoutPdfKit.ts).

## Modulių 7–9 DA kelio atmintinė (PDF)

- **Vieta:** Modulio 9 santraukos skaidrė 92 ir Modulio 9 užbaigimo ekranas – mygtukas „Parsisiųsti DA kelio atmintinę (PDF)“. Tai praktinis darbo lapas, atskiras nuo tier 3 sertifikato.
- **API:** [src/utils/m79HandoutPdf.ts](../../src/utils/m79HandoutPdf.ts) – `downloadM79HandoutPdf(content, { locale }, filename?)`. Duomenys – [src/data/m79HandoutContent.json](../../src/data/m79HandoutContent.json) ir [src/data/m79HandoutContent-en.json](../../src/data/m79HandoutContent-en.json).
- **Ekosistema:** 2 puslapis turi spaudžiamas nuorodas į `ai-workflow-canvas-template`, `promptanatomy.pro` ir `promptanatomy.site#ecosystem`; URL naudoja `utm_source=training`, `utm_medium=handout`, `utm_campaign=m9_*`.
- **Drift guard:** pakeitus [src/data/m79HandoutContent.json](../../src/data/m79HandoutContent.json) arba [src/data/m79HandoutContent-en.json](../../src/data/m79HandoutContent-en.json), privalo praeiti [src/data/**tests**/m79HandoutContent.test.ts](../../src/data/__tests__/m79HandoutContent.test.ts) (LT/EN struktūra, masyvų ilgiai, DI/AI terminologija) ir [src/utils/**tests**/m79HandoutPdf.test.ts](../../src/utils/__tests__/m79HandoutPdf.test.ts) (LT/EN smoke, filename, `textWithLink`, `utm_medium=handout`, `utm_campaign=m9_handout`).
- **Testai:** [src/components/**tests**/ModuleCompleteScreen.test.tsx](../../src/components/__tests__/ModuleCompleteScreen.test.tsx) tikrina M9 completion mygtuką. CI naujus M79 testus dengia per bendrą `npm run test:run`.

## Modulių 10–12 Agentų kelio atmintinė (PDF)

- **Vieta:** Modulio 12 užbaigimo ekranas ir `ModulesPage` blokas „Mano medžiaga“ – mygtukas „Parsisiųsti Agentų kelio atmintinę (PDF)“. Tai praktinis agentų darbo lapas, atskiras nuo tier 4 sertifikato.
- **API:** [src/utils/m1012HandoutPdf.ts](../../src/utils/m1012HandoutPdf.ts) – `downloadM1012HandoutPdf(content, { locale }, filename?)`. Duomenys – [src/data/m1012HandoutContent.json](../../src/data/m1012HandoutContent.json) ir [src/data/m1012HandoutContent-en.json](../../src/data/m1012HandoutContent-en.json).
- **Ekosistema:** 2 puslapis turi funnel CTA ir spaudžiamas nuorodas su `utm_source=training`, `utm_medium=handout`, `utm_campaign=m1012_*`.
- **Drift guard:** pakeitus [src/data/m1012HandoutContent.json](../../src/data/m1012HandoutContent.json) arba [src/data/m1012HandoutContent-en.json](../../src/data/m1012HandoutContent-en.json), privalo praeiti [src/data/**tests**/m1012HandoutContent.test.ts](../../src/data/__tests__/m1012HandoutContent.test.ts) ir [src/utils/**tests**/m1012HandoutPdf.test.ts](../../src/utils/__tests__/m1012HandoutPdf.test.ts).
- **Testai:** [src/components/**tests**/ModuleCompleteScreen.test.tsx](../../src/components/__tests__/ModuleCompleteScreen.test.tsx) tikrina M12 completion paviršių; [src/components/**tests**/ModulesPage.materials.test.tsx](../../src/components/__tests__/ModulesPage.materials.test.tsx) tikrina uždirbtos atmintinės pakartotinį atsisiuntimą.

## Modulių 13–15 Turinio kelio atmintinė (PDF)

- **Vieta:** Modulio 15 užbaigimo ekranas ir `ModulesPage` blokas „Mano medžiaga“ – mygtukas „Parsisiųsti Turinio kelio atmintinę (PDF)“. Tai praktinis vaizdo, video ir muzikos kūrimo darbo lapas, atskiras nuo tier 5 sertifikato.
- **API:** [src/utils/m1315HandoutPdf.ts](../../src/utils/m1315HandoutPdf.ts) – `downloadM1315HandoutPdf(content, { locale }, filename?)`. Duomenys – [src/data/m1315HandoutContent.json](../../src/data/m1315HandoutContent.json) ir [src/data/m1315HandoutContent-en.json](../../src/data/m1315HandoutContent-en.json).
- **Ekosistema:** 2 puslapis turi funnel CTA ir spaudžiamas nuorodas su `utm_source=training`, `utm_medium=handout`, `utm_campaign=m1315_*`.
- **Drift guard:** pakeitus [src/data/m1315HandoutContent.json](../../src/data/m1315HandoutContent.json) arba [src/data/m1315HandoutContent-en.json](../../src/data/m1315HandoutContent-en.json), privalo praeiti [src/data/**tests**/m1315HandoutContent.test.ts](../../src/data/__tests__/m1315HandoutContent.test.ts) ir [src/utils/**tests**/m1315HandoutPdf.test.ts](../../src/utils/__tests__/m1315HandoutPdf.test.ts).
- **Testai:** [src/components/**tests**/ModuleCompleteScreen.test.tsx](../../src/components/__tests__/ModuleCompleteScreen.test.tsx) tikrina M15 completion paviršių; [src/components/**tests**/ModulesPage.materials.test.tsx](../../src/components/__tests__/ModulesPage.materials.test.tsx) tikrina uždirbtos atmintinės pakartotinį atsisiuntimą.

---

## Susiję failai

| Failas                                                                                                 | Paskirtis                                                                                                                                |
| ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [src/utils/introPiePdf.ts](../../src/utils/introPiePdf.ts)                                             | API: `ensurePdfFont()`, `downloadIntroPiePdf(segment, toolsByName, glossaryByTerm, filename?)`                                           |
| [src/utils/handoutPdfKit.ts](../../src/utils/handoutPdfKit.ts)                                         | Bendras M1/M4/M5/M6/M7–9/M10–12/M13–15 PDF atmintinių maketo branduolys                                                                  |
| [src/utils/m1HandoutPdf.ts](../../src/utils/m1HandoutPdf.ts)                                           | Modulio 1 first-win PDF atmintinė: `downloadM1HandoutPdf(content, filename?, locale?)`                                                   |
| [src/utils/m5HandoutPdf.ts](../../src/utils/m5HandoutPdf.ts)                                           | Modulio 5 PDF atmintinė: `downloadM5HandoutPdf(content, filename?, locale?)`                                                             |
| [src/utils/m6HandoutPdf.ts](../../src/utils/m6HandoutPdf.ts)                                           | Modulio 6 PDF atmintinė: `downloadM6HandoutPdf(content, filename?, locale?)`                                                             |
| [src/utils/m79HandoutPdf.ts](../../src/utils/m79HandoutPdf.ts)                                         | Modulių 7–9 PDF atmintinė: `downloadM79HandoutPdf(content, { locale }, filename?)`                                                       |
| [src/utils/m1012HandoutPdf.ts](../../src/utils/m1012HandoutPdf.ts)                                     | Modulių 10–12 PDF atmintinė: `downloadM1012HandoutPdf(content, { locale }, filename?)`                                                   |
| [src/utils/m1315HandoutPdf.ts](../../src/utils/m1315HandoutPdf.ts)                                     | Modulių 13–15 PDF atmintinė: `downloadM1315HandoutPdf(content, { locale }, filename?)`                                                   |
| [src/utils/downloadHandout.ts](../../src/utils/downloadHandout.ts)                                     | Bendras handout atsisiuntimo veiksmas: content loader + PDF util + analytics + error logging                                             |
| [src/data/introPiePdfContent.json](../../src/data/introPiePdfContent.json)                             | 7 segmentų turinys (validuojamas [scripts/schemas/introPiePdfContent.schema.json](../../scripts/schemas/introPiePdfContent.schema.json)) |
| [src/data/m1HandoutContent.json](../../src/data/m1HandoutContent.json)                                 | M1 first-win atmintinės turinys (6 blokai, checklist, starter promptas)                                                                  |
| [src/data/m5HandoutContent.json](../../src/data/m5HandoutContent.json)                                 | M5 atmintinės turinys (sveikinimas, įrankiai, promptai, sekos, savokos)                                                                  |
| [src/data/m79HandoutContent.json](../../src/data/m79HandoutContent.json)                               | M7–9 DA kelio atmintinės turinys (pipeline, MASTER, workflow, CTA)                                                                       |
| [src/data/m1012HandoutContent.json](../../src/data/m1012HandoutContent.json)                           | M10–12 Agentų kelio atmintinės turinys                                                                                                   |
| [src/data/m1315HandoutContent.json](../../src/data/m1315HandoutContent.json)                           | M13–15 Turinio kelio atmintinės turinys                                                                                                  |
| [src/data/completionArtifacts.json](../../src/data/completionArtifacts.json)                           | Handout ir sertifikatų entry point registry                                                                                              |
| [src/data/**tests**/m1HandoutContent.test.ts](../../src/data/__tests__/m1HandoutContent.test.ts)       | M1 LT/EN handout turinio pariteto testas                                                                                                 |
| [src/data/**tests**/m79HandoutContent.test.ts](../../src/data/__tests__/m79HandoutContent.test.ts)     | M7–9 LT/EN handout turinio pariteto testas                                                                                               |
| [src/data/**tests**/m1012HandoutContent.test.ts](../../src/data/__tests__/m1012HandoutContent.test.ts) | M10–12 LT/EN handout turinio pariteto testas                                                                                             |
| [src/data/**tests**/m1315HandoutContent.test.ts](../../src/data/__tests__/m1315HandoutContent.test.ts) | M13–15 LT/EN handout turinio pariteto testas                                                                                             |
| [docs/development/PDF_MAKETO_GAIRES.md](PDF_MAKETO_GAIRES.md)                                          | PDF maketo gairės (tipografija, spalvos, sekcijos)                                                                                       |
