# PDF atsisiuntimo testai ir pernaudojamumas

> Testų infrastruktūra skirta PDF atsisiuntimo funkcijai (intro-action-pie skaidrė) ir kitose skaidrėse naudojimui.

**Būsena (2026-02-21):** Vitest run – 16 testų failų, 111 testų praeina. IntroActionPieSlide PDF komponento testas vykdomas su `act()` (React state atnaujimai apgaubti) – be act() įspėjimų.

---

## Kas testuojama

- **Unit testai** ([src/utils/__tests__/introPiePdf.test.ts](../../src/utils/__tests__/introPiePdf.test.ts)):
  - **jsPDF mock** – tikras `doc.save()` nevykdomas; naudojamas mock su `save`, `text`, `setFontSize`, `setTextColor`, `splitTextToSize` ir kt.
  - **downloadIntroPiePdf:** `doc.save` iškvietimas vieną kartą; filename atitinka segmento pavadinimą (`Promptu_anatomija_*.pdf`); galima perduoti custom `filename`; `doc.text` kviečiamas su „Promptų anatomija“ ir segmento `title`.
  - **ensurePdfFont:** kai `fetch` nepavyksta – funkcija nemeta klaidos; kai `fetch` sėkmingas – vėlesnis `downloadIntroPiePdf` naudoja šriftą (`addFileToVFS` iškvietimas).
  - **7 segmentų smoke:** visi segmentai iš `introPiePdfContent.segments` su tikrais `tools` / `glossary` Map’ais – `downloadIntroPiePdf` kviečiamas 7 kartus be exception.

- **Komponento testas** ([src/components/slides/types/content/__tests__/IntroActionPieSlide.pdf.test.tsx](../../src/components/slides/types/content/__tests__/IntroActionPieSlide.pdf.test.tsx)):
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

## Modulio 5 atmintinė (PDF)

- **Vieta:** Skaidrė 514 (Testo rezultatai) – mygtukas „Parsisiųsti Modulio 5 atmintinę (PDF)“ abiejuose rezultatuose (passed ir failed). Pažadas – skaidrė 45.5 (handoutPromise po reveal).
- **API:** [src/utils/m5HandoutPdf.ts](../../src/utils/m5HandoutPdf.ts) – `downloadM5HandoutPdf(content, filename?)`. Duomenys – [src/data/m5HandoutContent.json](../../src/data/m5HandoutContent.json). Maketas pagal [PDF_MAKETO_GAIRES.md](PDF_MAKETO_GAIRES.md).
- **Testas (optional):** Galima pridėti unit testą `m5HandoutPdf.test.ts` (mock jsPDF) ir komponento testą TestResultsSlide M5 – mygtuko paspaudimas kviečia `downloadM5HandoutPdf`.

---

## Susiję failai

| Failas | Paskirtis |
|--------|-----------|
| [src/utils/introPiePdf.ts](../../src/utils/introPiePdf.ts) | API: `ensurePdfFont()`, `downloadIntroPiePdf(segment, toolsByName, glossaryByTerm, filename?)` |
| [src/utils/m5HandoutPdf.ts](../../src/utils/m5HandoutPdf.ts) | Modulio 5 PDF atmintinė: `downloadM5HandoutPdf(content, filename?)` |
| [src/data/introPiePdfContent.json](../../src/data/introPiePdfContent.json) | 7 segmentų turinys (validuojamas [scripts/schemas/introPiePdfContent.schema.json](../../scripts/schemas/introPiePdfContent.schema.json)) |
| [src/data/m5HandoutContent.json](../../src/data/m5HandoutContent.json) | M5 atmintinės turinys (sveikinimas, įrankiai, promptai, sekos, savokos) |
| [docs/development/PDF_MAKETO_GAIRES.md](PDF_MAKETO_GAIRES.md) | PDF maketo gairės (tipografija, spalvos, sekcijos) |
