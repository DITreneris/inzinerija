# PDF generavimas projekte – santrauka ir agentų atmintis

> **Paskirtis:** Viena vieta, ką išmokome apie PDF generavimą; geriausios praktikos; ką agentas privalo žinoti prieš kurdamas ar keisdamas PDF (atmintinės, eksportai). Nuoroda: [PDF_MAKETO_GAIRES.md](PDF_MAKETO_GAIRES.md), [PDF_DOWNLOAD_TESTING.md](PDF_DOWNLOAD_TESTING.md).

---

## 1. Ką išmokome (santrauka)

| Sritis                    | Išmokta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Biblioteka**            | jsPDF – vienintelė PDF generavimo priemonė projekte (intro segmentai, M1/M4/M5/M6/M7–9 atmintinės, **sertifikatai**).                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **Lietuviškos raidės**    | Helvetica/Times neturi ą, č, ė, į, š, ų, ū, ž. **Sprendimas:** bendras modulis **`src/utils/pdfNotoFont.ts`** – fetch su **`import.meta.env.BASE_URL`**, pageidautinas **`Roboto-Regular.ttf`**, atsarginis **`NotoSans-Regular.ttf`** (migracija); base64 cache; **`registerUnicodePdfFont`** po `addFont` zondina `getTextWidth('ąė')` (apsauga nuo jsPDF 4 „No unicode cmap“ / `widths` klaidų). jsPDF šeima lieka **`NotoSans`** (`setFont('NotoSans', 'normal')`). Jei šriftas neįkeltas arba registracija nepavyko – Helvetica (diakritikos gali būti neteisingos). |
| **Struktūra**             | Turinys – atskiras JSON (pvz. `m1HandoutContent.json`, `m4HandoutContent.json`, `m5HandoutContent.json`, `m6HandoutContent.json`, `m79HandoutContent.json`, `introPiePdfContent.json`, **`certificateContent.json`**). Generavimo logika – atskiras util (`m1HandoutPdf.ts`, `m4HandoutPdf.ts`, `m5HandoutPdf.ts`, `m6HandoutPdf.ts`, `m79HandoutPdf.ts`, `introPiePdf.ts`, **`certificatePdf.ts`**) + bendras `handoutPdfKit.ts`. Entry point routing – `completionArtifacts.json`; bendras veiksmas – `downloadHandout.ts`.                                             |
| **Vietos parsisiuntimui** | Pažadas įvade (handoutPromise) + registry surface ten, kur vartotojas baigia kontekstą (M1/M4/M6/M9 – ModuleCompleteScreen; M5 rezultatų ekranas skaidrė 514; skaidrė 64 M6; skaidrė 92 M9). **Pakartotinis atsisiuntimas:** `ModulesPage` blokas „Mano medžiaga“ rodo jau uždirbtas atmintines ir sertifikatus pagal `completionArtifacts.json`. **Sertifikatai:** hidden treasure ModuleCompleteScreen po M3/M6/M9 → CertificateScreen (vardas + stabilus serial iš localStorage) → `downloadCertificatePdf(tier, content, learnerName, { serialNumber })`.             |
| **Testavimas**            | jsPDF mock (ne tikras `doc.save()`); unit testai tikrina filename, `doc.text` su teisingu turiniu, `addFileToVFS` po ensurePdfFont; komponento testas – mygtuko paspaudimas kviečia download su teisingu payload.                                                                                                                                                                                                                                                                                                                                                         |

---

## 2. Geriausios praktikos (checklist)

- **Maketas:** Marginai 18 mm; tarpas tarp sekcijų 6–8 mm; H1 14–16 pt, H2 14–15 pt, H3 11–12 pt, body 9–10 pt, footer 7–8 pt. Spalvos: brand #627d98, accent #d4a520 (GOLDEN_STANDARD §2.1). Sekcijos – kairysis vertikalus border (brand) arba šviesus fonas.
- **Lietuviškos raidės (privaloma):** Naudoti **`pdfNotoFont.ts`** (`loadPdfUnicodeFont`, `registerUnicodePdfFont`, `ensurePdfFont` intro sluoksnyje). Statinis failas: pageidautina **`public/fonts/Roboto-Regular.ttf`**, atsarginis **`NotoSans-Regular.ttf`**. Prieš bet kurį `doc.text()` su lietuviškais žodžiais – `applyFont(doc, useCustomFont)`. GitHub URL: **[PDF_FONTS_GITHUB_SOURCES.md](PDF_FONTS_GITHUB_SOURCES.md)**; skriptas: `scripts/download-noto-font.ps1`.
- **Duomenys:** Atskiras JSON failas (content), ne hardcodintas turinys util faile. Tipas (interface) exportuotas iš util arba types/modules. Entry point'ai ir analytics ID – `src/data/completionArtifacts.json`.
- **Pavadinimas failo:** Numatytas filename pvz. `Promptu_anatomija_Modulio5_atmintine.pdf` – nuoseklus, su diakritika pavadinime jei vartotojui matomas.
- **UI:** Viena ar dvi vietos parsisiuntimui (pagrindinė + optional, pvz. skaidrė + completion screen). Etiketė iš content (handoutDownloadLabel) arba registry `ctaI18nKey`; veiksmas per `downloadHandout()`.

---

## 3. Agentų atmintis – ką įtraukti

**Kai užduotis apima naują ar pakeitimą PDF generavimui (atmintinė, eksportas):**

1. **Pirmiausia atidaryti:** [PDF_MAKETO_GAIRES.md](PDF_MAKETO_GAIRES.md) (tipografija, spalvos, §7 lietuviškos raidės) ir [PDF_DOWNLOAD_TESTING.md](PDF_DOWNLOAD_TESTING.md) (kaip pridėti PDF į skaidrę, testai).
2. **Duomenys:** Sukurti ar atnaujinti atskirą JSON (pvz. `src/data/*HandoutContent.json`). Turinį užpildo CONTENT_AGENT; struktūrą – DATA_AGENT.
3. **Kodas:** Naujas util `src/utils/*Pdf.ts` pagal etaloną `m5HandoutPdf.ts` arba `introPiePdf.ts`: `await loadPdfUnicodeFont()`, `registerUnicodePdfFont(doc, getPdfUnicodeFontBase64())`, `applyFont(doc, useCustomFont)` prieš kiekvieną tekstą. Eksportuoti funkciją `downloadXxxPdf(content, filename?)`.
4. **Registry:** Pridėti `completionArtifacts.json` įrašą (`earnOnModuleIds`, `surfaces`, `ctaI18nKey`, `analyticsCtaId`) ir `handoutArtifactActions.ts` map eilutę.
5. **UI:** Mygtukas skaidrėje arba completion ekrane turi skaityti registry ir kviesti `downloadHandout()`, ne naują `module.id === N` handlerį. Jei naudojamas bendras fontas – prieš pirmą eksportą galima kviesti `ensurePdfFont()` (introPiePdf).
6. **Patikra:** CHANGELOG – įrašas apie PDF ir lietuviškų raidžių (NotoSans); RELEASE_QA_CHECKLIST – rankinė PDF atsisiuntimo ir spausdinimo patikra su lietuviškais pavyzdžiais. Build ir schema validacija.

**SOT:** Modulio PDF atmintinės turinys ir vietos – turinio SOT (pvz. `turinio_pletra_moduliai_4_5_6.md` §3.3 M5, §4.4 M6). Konfliktas: pirmiausia SOT, tada JSON, tada kodas.

---

## 4. Esami failai (nuorodos)

| Failas                                                                       | Paskirtis                                                                                              |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| [src/utils/handoutPdfKit.ts](../../src/utils/handoutPdfKit.ts)               | Bendras M1/M4/M5/M6/M7–9 atmintinių maketo branduolys                                                  |
| [src/utils/introPiePdf.ts](../../src/utils/introPiePdf.ts)                   | `ensurePdfFont()`, `downloadIntroPiePdf(segment, tools, glossary, filename?)` – 7 segmentų PDF         |
| [src/utils/m1HandoutPdf.ts](../../src/utils/m1HandoutPdf.ts)                 | `downloadM1HandoutPdf(content, filename?, locale?)` – M1 first-win atmintinė                           |
| [src/utils/m4HandoutPdf.ts](../../src/utils/m4HandoutPdf.ts)                 | `downloadM4HandoutPdf(content, filename?, locale?)` – M4 konteksto, šaltinių ir patikros atmintinė     |
| [src/utils/m5HandoutPdf.ts](../../src/utils/m5HandoutPdf.ts)                 | `downloadM5HandoutPdf(content, filename?)` – M5 atmintinė                                              |
| [src/utils/m6HandoutPdf.ts](../../src/utils/m6HandoutPdf.ts)                 | `downloadM6HandoutPdf(content, filename?)` – M6 atmintinė                                              |
| [src/utils/m79HandoutPdf.ts](../../src/utils/m79HandoutPdf.ts)               | `downloadM79HandoutPdf(content, { locale })` – M7–9 DA kelio 2 psl. atmintinė                          |
| [src/data/completionArtifacts.json](../../src/data/completionArtifacts.json) | Handout ir sertifikatų entry point registry: uždirbimo moduliai, surfaces, i18n labels, analytics ID   |
| [src/utils/downloadHandout.ts](../../src/utils/downloadHandout.ts)           | Bendras handout atsisiuntimo veiksmas: content loader + PDF util + analytics + error logging           |
| [src/data/introPiePdfContent.json](../../src/data/introPiePdfContent.json)   | 7 segmentų turinys                                                                                     |
| [src/data/m1HandoutContent.json](../../src/data/m1HandoutContent.json)       | M1 first-win atmintinės turinys                                                                        |
| [src/data/m4HandoutContent.json](../../src/data/m4HandoutContent.json)       | M4 konteksto, šaltinių ir patikros atmintinės turinys                                                  |
| [src/data/m5HandoutContent.json](../../src/data/m5HandoutContent.json)       | M5 atmintinės turinys                                                                                  |
| [src/data/m6HandoutContent.json](../../src/data/m6HandoutContent.json)       | M6 atmintinės turinys                                                                                  |
| [src/data/m79HandoutContent.json](../../src/data/m79HandoutContent.json)     | M7–9 DA kelio atmintinės turinys                                                                       |
| [src/data/certificateContent.json](../../src/data/certificateContent.json)   | Sertifikatų turinys (tier 1/2/3: title, subtitle, badgeLabel, footerText)                              |
| [src/utils/certificatePdf.ts](../../src/utils/certificatePdf.ts)             | `downloadCertificatePdf(tier, content, learnerName, options?)` – 3 lygiai, serial priima per `options` |
| [src/utils/certificateStorage.ts](../../src/utils/certificateStorage.ts)     | `getCertificateName()` / `setCertificateName(name)` + stabilūs tier serial numeriai – tik localStorage |
| [public/fonts/README.md](../../public/fonts/README.md)                       | Šriftų įdiegimas (`public/fonts/`)                                                                     |
| [PDF_FONTS_GITHUB_SOURCES.md](PDF_FONTS_GITHUB_SOURCES.md)                   | **Roboto:** openmaptiles/fonts + google/fonts atsarginis; **Noto:** google/fonts                       |
| [docs/development/PDF_MAKETO_GAIRES.md](PDF_MAKETO_GAIRES.md)                | Maketo gairės, §7 lietuviškos raidės, checklist                                                        |
| [docs/development/CERTIFICATE_CONTENT_SOT.md](CERTIFICATE_CONTENT_SOT.md)    | Sertifikatų turinio SOT (titulai, tonas paprastas, ne patetiškas)                                      |
