# PDF maketo gairės – atmintinių serija ir intro-action-pie PDF

> **Paskirtis:** Vienas etalonas atsisiunčiamiems PDF: M1/M4/M5/M6/M7–9/M10–12/M13–15 atmintinių serijai ir 7 asmeninių intro-action-pie PDF („Generuok patarimus sau“ / „Eksportuok PDF“) maketui. Implementaciją atlieka CODING_AGENT pagal šias gaires. Šaltinis spalvų: [GOLDEN_STANDARD.md](GOLDEN_STANDARD.md) §2.1.

---

## 1. Tikslas ir auditorija

- **Tikslas (atmintinių serija):** M1, M4, M5, M6, M7–9, M10–12 ir M13–15 PDF turi atrodyti kaip vienas rinkinys: tas pats brand header, tipografija, sekcijų border, footer ir mygtukų kalba. Turinys skiriasi pagal mokymosi momentą.
- **Pakopinis CTA modelis:** M1/M4 = value-only (be outbound nuorodų); M5/M6 = minimalus website footer; M7–9/M10–12/M13–15 = pilnas 2 psl. funnel su `utm_medium=handout`.
- **Tikslas (intro-action-pie):** Kiekvienas iš 7 segmentų (Rašymas, Praktiniai patarimai, Informacijos paieška, Techninė pagalba, Multimedija, Kita/Nežinoma, Saviraiška) turi savo PDF – vienas atsisiunčiamas failas su Top 5 patarimais, įrankiais, workflow, 5 sąvokomis, sisteminiu promptu ir palinkėjimu.
- **Auditorija:** Vartotojas, kuris nori išsaugoti praktinę medžiagą po modulio arba pasirinktą asmeninį intro-action-pie segmentą.
- **Implementacija:** [src/utils/introPiePdf.ts](../../src/utils/introPiePdf.ts) (jsPDF).
- **Atmintinių serijos implementacija:** bendras maketo branduolys [src/utils/handoutPdfKit.ts](../../src/utils/handoutPdfKit.ts); konkretūs util'ai – `m1HandoutPdf.ts`, `m4HandoutPdf.ts`, `m5HandoutPdf.ts`, `m6HandoutPdf.ts`, `m79HandoutPdf.ts`, `m1012HandoutPdf.ts`, `m1315HandoutPdf.ts`.
- **Žinomas ribotumas:** Jei `public/fonts/Roboto-Regular.ttf` (pageidautina) ir atsarginis `NotoSans-Regular.ttf` neįkelti, PDF naudoja Helvetica – lietuviškos diakritikos gali būti neteisingos. Šriftų kelias ir registracija: [pdfNotoFont.ts](../../src/utils/pdfNotoFont.ts); atsisiuntimas: `scripts/download-noto-font.ps1`.

---

## 2. Tipografijos hierarchija

Viena šriftų šeima (custom font su lietuviškais simboliais). Skiriasi **dydis** ir **svoris**.

| Lygis     | Paskirtis              | Dydis (pt) | Svoris | Pavyzdys                              |
| --------- | ---------------------- | ---------- | ------ | ------------------------------------- |
| **H1**    | Brand antraštė         | 14–16      | bold   | „Promptų anatomija“                   |
| **H2**    | Segmento pavadinimas   | 14–15      | bold   | „Kaip pasitelkti DI rašymui?“         |
| **H3**    | Sekcijos antraštė      | 11–12      | bold   | „1. Top 5 patarimai“, „2. Įrankiai“   |
| **Body**  | Pagrindinis tekstas    | 9–10       | normal | Patarimai, aprašymai, sąvokos         |
| **Small** | Footer, papildoma info | 7–8        | normal | „Promptų anatomija – kurso medžiaga.“ |

- **Tarp eilutės:** apie 1,2–1,4× fonto dydis (line height).
- **Tarp pastraipų / sąrašo punktų:** mažiausiai 3–4 mm.
- **Atmintinių serija:** bazinė skalė valdoma `handoutPdfKit.ts` (`regular`); tankiems 2 psl. M7–9/M10–12/M13–15 PDF leidžiama `compact`, bet header, footer ir spalvos lieka tos pačios.

---

## 3. Marginai ir tarpai

- **Puslapio marginai:** ne mažesni kaip 15–18 mm (visomis pusėmis). Rekomenduojama 18 mm.
- **Tarpas tarp sekcijų:** 6–8 mm (aiškus vizualus atskyrimas).
- **Tarpas po H1/H2:** 4–6 mm prieš kitą bloką.
- **Whitespace:** Nedeginti visos vietos – laisva vieta padeda skaitomumui (Practical Typography, Butterick).

---

## 4. Spalvos

Pagal [GOLDEN_STANDARD.md](GOLDEN_STANDARD.md) §2.1:

| Spalva                | Hex                | Naudojimas PDF                                                                    |
| --------------------- | ------------------ | --------------------------------------------------------------------------------- |
| **brand**             | #627d98            | H1 „Promptų anatomija“, H3 sekcijų antraštės, kairysis sekcijų border (optional). |
| **accent**            | #d4a520            | Palinkėjimo bloko antraštė arba fono akcentas; CTA pabrėžimas.                    |
| **Neutral (tekstas)** | #1a1a1a / juoda    | Body tekstas.                                                                     |
| **Footer**            | RGB(128, 128, 128) | Pilka, mažas šriftas.                                                             |

- **60-30-10 taisyklė (referencui):** ~60 % neutralus (balta/fonis), ~30 % pagrindinė (brand), ~10 % akcentas (accent) – laikytis projekto identiteto.

---

## 5. Sekcijų vizualus atskyrimas

Kiekviena turinio sekcija (1. Top 5 patarimai, 2. Įrankiai, 3. Workflow, 4. Svarbios sąvokos, 5. Sisteminis promptas) turi būti **vizualiai atskirta**:

- **Variantas A:** Šviesus fono stačiakampis – `setFillColor` šviesiai pilka (pvz. RGB 248, 248, 250), `rect` su padding (tekstas pradėti keliais mm į dešinę nuo stačiakampio krašto).
- **Variantas B:** Kairysis vertikalus „border“ – plonas (1–2 mm) brand spalvos stačiakampis kairėje sekcijos pusėje; tekstas prasideda į dešinę nuo jo.

**Palinkėjimas:** Atskirti **accent** spalva – šviesus accent fonas (pvz. RGB 212, 165, 32 su maža opacity) arba kairysis accent border; antraštė „Palinkėjimas“ – accent arba bold.

---

## 6. Footer

- Viena eilutė puslapio apačioje (pvz. y = 290 mm A4).
- Tekstas: „Promptų anatomija – promptų struktūros mokymas. © Kurso medžiaga.“
- Šriftas: 7–8 pt, pilka (128, 128, 128).
- Atmintinių serijoje footer turi būti pridedamas per `addFooter()` iš `handoutPdfKit.ts`, kad kelių puslapių PDF (M7–9) ir vieno puslapio PDF elgtųsi vienodai.
- Jei PDF yra value-only (M1), footer neturi outbound nuorodos; M5/M6 gali turėti tik neutralų website footer; M7–9 turi pilną ecosystem CTA atskirame puslapyje.

---

## 7. Lietuviškos raidės (privaloma)

- Standartiniai PDF šriftai (Helvetica, Times) **neturi** lietuviškų diakritikų (ą, č, ė, į, š, ų, ū, ž). Rezultatas – klaidingi simboliai arba „?“.
- **Sprendimas:** Naudoti **custom TTF šriftą**, kuris turi lietuviškus glyph. Pavyzdžiai: Noto Sans, Source Sans 3, Open Sans (su LT palaikymu).
- **Technika (jsPDF):** Šriftą konvertuoti į base64 (pvz. [jsPDF font converter](https://rawgit.com/MrRio/jsPDF/master/fontconverter/fontconverter.html)), `addFileToVFS`, `addFont`, `setFont` prieš rašant tekstą. Naudoti tą patį šriftą visame dokumente (normal ir bold variantus jei reikia).
- **Būtina:** Prieš **kiekvieną** tekstą (įskaitant H1, H2, sekcijų antraštes, etiketes „Pagrindinis:“, „Palinkėjimas“, footer) nustatyti custom šriftą – t. y. kviesti `applyFont(doc, useCustomFont)` arba `doc.setFont('NotoSans', 'normal')` kai šriftas įkeltas. Jei kur nors lieka `setFont('helvetica', ...)`, tas tekstas bus piešiamas be lietuviškų diakritikų.

---

## 8. Checklist implementacijai (CODING_AGENT)

- [ ] H1 brand antraštė (14–16 pt, brand spalva).
- [ ] H2 segmento pavadinimas (14–15 pt, bold).
- [ ] H3 sekcijų antraštės (11–12 pt, brand arba juoda).
- [ ] Body 9–10 pt; tarpai tarp punktų 3–4 mm; tarp sekcijų 6–8 mm.
- [ ] Sekcijos vizualiai atskirtos (fonas arba kairysis border).
- [ ] Palinkėjimo blokas – accent (fonas arba border).
- [ ] Footer pilka, 7–8 pt.
- [ ] Custom font su LT diakritika įtrauktas ir naudojamas visame tekste.
- [ ] Atmintinių serijai naudotas `handoutPdfKit.ts`, o ne kopijuoti lokaliniai PDF helper'iai.
- [ ] CTA intensyvumas atitinka modulio vietą: M1 value-only, M5/M6 minimalus, M7–9 funnel.
