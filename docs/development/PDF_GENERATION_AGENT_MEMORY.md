# PDF generavimas projekte – santrauka ir agentų atmintis

> **Paskirtis:** Viena vieta, ką išmokome apie PDF generavimą; geriausios praktikos; ką agentas privalo žinoti prieš kurdamas ar keisdamas PDF (atmintinės, eksportai). Nuoroda: [PDF_MAKETO_GAIRES.md](PDF_MAKETO_GAIRES.md), [PDF_DOWNLOAD_TESTING.md](PDF_DOWNLOAD_TESTING.md).

---

## 1. Ką išmokome (santrauka)

| Sritis                    | Išmokta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Biblioteka**            | jsPDF – vienintelė PDF generavimo priemonė projekte (intro segmentai, M5/M6 atmintinė, **sertifikatai**).                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **Lietuviškos raidės**    | Helvetica/Times neturi ą, č, ė, į, š, ų, ū, ž. **Sprendimas:** bendras modulis **`src/utils/pdfNotoFont.ts`** – fetch su **`import.meta.env.BASE_URL`**, pageidautinas **`Roboto-Regular.ttf`**, atsarginis **`NotoSans-Regular.ttf`** (migracija); base64 cache; **`registerUnicodePdfFont`** po `addFont` zondina `getTextWidth('ąė')` (apsauga nuo jsPDF 4 „No unicode cmap“ / `widths` klaidų). jsPDF šeima lieka **`NotoSans`** (`setFont('NotoSans', 'normal')`). Jei šriftas neįkeltas arba registracija nepavyko – Helvetica (diakritikos gali būti neteisingos). |
| **Struktūra**             | Turinys – atskiras JSON (pvz. `m5HandoutContent.json`, `m6HandoutContent.json`, `introPiePdfContent.json`, **`certificateContent.json`**). Generavimo logika – atskiras util (`m5HandoutPdf.ts`, `m6HandoutPdf.ts`, `introPiePdf.ts`, **`certificatePdf.ts`**). UI tik kviečia `downloadXxxPdf(content)` (ir pasirinktinai `ensurePdfFont()` prieš pirmą eksportą).                                                                                                                                                                                                       |
| **Vietos parsisiuntimui** | Pažadas įvade (handoutPromise) + mygtukas ten, kur vartotojas baigia kontekstą (rezultatų ekranas M5 skaidrė 514; skaidrė 64 M6; ModuleCompleteScreen M6). **Sertifikatai:** mygtukas „Parsisiųsti sertifikatą“ tik ModuleCompleteScreen, kai baigtas 3. arba 6. modulis (hidden treasure) → CertificateScreen (vardas iš localStorage) → `downloadCertificatePdf(tier, content, learnerName)`. **Po finalinio testo (QuizResultsView):** hidden treasure – nuoroda į DI Operacinį centrą (Spin-off Nr. 5, CEO), etiketė „Jei neaišku – klausk“.                          |
| **Testavimas**            | jsPDF mock (ne tikras `doc.save()`); unit testai tikrina filename, `doc.text` su teisingu turiniu, `addFileToVFS` po ensurePdfFont; komponento testas – mygtuko paspaudimas kviečia download su teisingu payload.                                                                                                                                                                                                                                                                                                                                                         |

---

## 2. Geriausios praktikos (checklist)

- **Maketas:** Marginai 18 mm; tarpas tarp sekcijų 6–8 mm; H1 14–16 pt, H2 14–15 pt, H3 11–12 pt, body 9–10 pt, footer 7–8 pt. Spalvos: brand #627d98, accent #d4a520 (GOLDEN_STANDARD §2.1). Sekcijos – kairysis vertikalus border (brand) arba šviesus fonas.
- **Lietuviškos raidės (privaloma):** Naudoti **`pdfNotoFont.ts`** (`loadPdfUnicodeFont`, `registerUnicodePdfFont`, `ensurePdfFont` intro sluoksnyje). Statinis failas: pageidautina **`public/fonts/Roboto-Regular.ttf`**, atsarginis **`NotoSans-Regular.ttf`**. Prieš bet kurį `doc.text()` su lietuviškais žodžiais – `applyFont(doc, useCustomFont)`. GitHub URL: **[PDF_FONTS_GITHUB_SOURCES.md](PDF_FONTS_GITHUB_SOURCES.md)**; skriptas: `scripts/download-noto-font.ps1`.
- **Duomenys:** Atskiras JSON failas (content), ne hardcodintas turinys util faile. Tipas (interface) exportuotas iš util arba types/modules.
- **Pavadinimas failo:** Numatytas filename pvz. `Promptu_anatomija_Modulio5_atmintine.pdf` – nuoseklus, su diakritika pavadinime jei vartotojui matomas.
- **UI:** Viena ar dvi vietos parsisiuntimui (pagrindinė + optional, pvz. skaidrė + completion screen). Etiketė iš content (handoutDownloadLabel) arba fiksuota.

---

## 3. Agentų atmintis – ką įtraukti

**Kai užduotis apima naują ar pakeitimą PDF generavimui (atmintinė, eksportas):**

1. **Pirmiausia atidaryti:** [PDF_MAKETO_GAIRES.md](PDF_MAKETO_GAIRES.md) (tipografija, spalvos, §7 lietuviškos raidės) ir [PDF_DOWNLOAD_TESTING.md](PDF_DOWNLOAD_TESTING.md) (kaip pridėti PDF į skaidrę, testai).
2. **Duomenys:** Sukurti ar atnaujinti atskirą JSON (pvz. `src/data/*HandoutContent.json`). Turinį užpildo CONTENT_AGENT; struktūrą – DATA_AGENT.
3. **Kodas:** Naujas util `src/utils/*Pdf.ts` pagal etaloną `m5HandoutPdf.ts` arba `introPiePdf.ts`: `await loadPdfUnicodeFont()`, `registerUnicodePdfFont(doc, getPdfUnicodeFontBase64())`, `applyFont(doc, useCustomFont)` prieš kiekvieną tekstą. Eksportuoti funkciją `downloadXxxPdf(content, filename?)`.
4. **UI:** Mygtukas skaidrėje arba completion ekrane; onClick kviečia `downloadXxxPdf(content)`. Jei naudojamas bendras fontas – prieš pirmą eksportą galima kviesti `ensurePdfFont()` (introPiePdf).
5. **Patikra:** CHANGELOG – įrašas apie PDF ir lietuviškų raidžių (NotoSans); RELEASE_QA_CHECKLIST – rankinė PDF atsisiuntimo ir spausdinimo patikra su lietuviškais pavyzdžiais. Build ir schema validacija.

**SOT:** Modulio PDF atmintinės turinys ir vietos – turinio SOT (pvz. `turinio_pletra_moduliai_4_5_6.md` §3.3 M5, §4.4 M6). Konfliktas: pirmiausia SOT, tada JSON, tada kodas.

---

## 4. Esami failai (nuorodos)

| Failas                                                                     | Paskirtis                                                                                                    |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| [src/utils/introPiePdf.ts](../../src/utils/introPiePdf.ts)                 | `ensurePdfFont()`, `downloadIntroPiePdf(segment, tools, glossary, filename?)` – 7 segmentų PDF               |
| [src/utils/m5HandoutPdf.ts](../../src/utils/m5HandoutPdf.ts)               | `downloadM5HandoutPdf(content, filename?)` – M5 atmintinė                                                    |
| [src/utils/m6HandoutPdf.ts](../../src/utils/m6HandoutPdf.ts)               | `downloadM6HandoutPdf(content, filename?)` – M6 atmintinė                                                    |
| [src/data/introPiePdfContent.json](../../src/data/introPiePdfContent.json) | 7 segmentų turinys                                                                                           |
| [src/data/m5HandoutContent.json](../../src/data/m5HandoutContent.json)     | M5 atmintinės turinys                                                                                        |
| [src/data/m6HandoutContent.json](../../src/data/m6HandoutContent.json)     | M6 atmintinės turinys                                                                                        |
| [src/data/certificateContent.json](../../src/data/certificateContent.json) | Sertifikatų turinys (tier 1/2/3: title, subtitle, badgeLabel, footerText)                                    |
| [src/utils/certificatePdf.ts](../../src/utils/certificatePdf.ts)           | `downloadCertificatePdf(tier, content, learnerName, options?)` – 3 lygiai, serijinis nr (pre-release random) |
| [src/utils/certificateStorage.ts](../../src/utils/certificateStorage.ts)   | `getCertificateName()` / `setCertificateName(name)` – tik localStorage                                       |
| [public/fonts/README.md](../../public/fonts/README.md)                     | Šriftų įdiegimas (`public/fonts/`)                                                                           |
| [PDF_FONTS_GITHUB_SOURCES.md](PDF_FONTS_GITHUB_SOURCES.md)                 | **Roboto:** openmaptiles/fonts + google/fonts atsarginis; **Noto:** google/fonts                             |
| [docs/development/PDF_MAKETO_GAIRES.md](PDF_MAKETO_GAIRES.md)              | Maketo gairės, §7 lietuviškos raidės, checklist                                                              |
| [docs/development/CERTIFICATE_CONTENT_SOT.md](CERTIFICATE_CONTENT_SOT.md)  | Sertifikatų turinio SOT (titulai, tonas paprastas, ne patetiškas)                                            |
