# „Toliau – skaidrė N“ / „Next – slide N“ footerių analizė

> **Tikslas:** Sisteminė peržiūra – ar footeriai nėra per ilgi vartotojo požiūriu; sistemiški sprendimai.
> **Data:** 2026-03-11. **SOT:** `.cursor/rules/footer-slide-numbers.mdc`, `docs/development/GOLDEN_STANDARD.md` §3.6.

---

## 1. Dabartinė būklė

### 1.1 Formatas (Golden Standard §3.6)

- **LT:** `"Toliau – skaidrė N: [kitos skaidrės pavadinimas]"`
- **EN:** `"Next – slide N: [next slide title]"`
- **Principas:** N = 1-based pozicija modulyje (ne skaidrės `id`). Pavadinimas = kitos skaidrės title (pilnas).

### 1.2 Ilgių statistika (modules.json + modules-en-m4-m6.json)

| Ribotuvas      | Footerių skaičius (ilgesnių nei N simbolių) |
|----------------|---------------------------------------------|
| > 40 simbolių  | 98                                          |
| > 50 simbolių  | 48                                          |
| > 60 simbolių  | **17**                                      |
| Maksimumas     | **70** simbolių (1 atvejis)                 |

**Ilgiausi pavyzdžiai (70–61 simb.):**

| Ilgis | Locale | Pavyzdys |
|------|--------|----------|
| 70   | LT M4  | Toliau – skaidrė 35: Konteksto degradacija: kodėl modeliai „pamiršta"? |
| 69   | LT M3  | Toliau – skaidrė 4: Scenarijus 2: Pardavimų Analizė ir Veiksmų Planas |
| 69   | LT M4  | Toliau – skaidrė 26: 4 strategijos, kurios pakelia DI atsakymų kokybę |
| 68   | EN M4  | Next – slide 15: Is your prompt good… or does it just look that way? |
| 65   | LT M3  | Toliau – skaidrė 6: Scenarijus 4: Vidaus Komunikacijos Dokumentas |
| 64   | LT M7  | Toliau – skaidrė 46: Savitikra: Manipuliacijos ir haliucinacijos |
| 61   | LT M4  | Toliau – skaidrė 15: Tavo promptas geras… ar tik taip atrodo? |
| 61   | EN M4  | Next – slide 35: Context degradation: why do models "forget"? |

### 1.3 Kur rodoma

- **SlideContent.tsx:** `footer` rodomas apačioje, `text-[11px]`, `flex flex-wrap` – **ilgas tekstas laisvai wrap’ina** į kelias eilutes.
- **ContentSlides.tsx** (section-break ir kt.): footer bloke su `text-sm font-semibold`, `p-4` – **taip pat wrap’ina**, be sutrumpinimo.

**Išvada:** Nėra nei `line-clamp`, nei `max-width` – ilgi footeriai užima 2–3 eilutes, ypač siaurame viewport (mobilus).

---

## 2. Vartotojo požiūris

### 2.1 Kas svarbu

- **Skaitomumas:** Footer – antrinė informacija („ką toliau“). Per ilgas tekstas atitraukia dėmesį nuo pagrindinio turinio.
- **Mobilus:** Skaidrėje jau yra H1, blokai, CTA; ilgas footer padidina scroll ir vizualinį triukšmą.
- **Nuoseklumas:** Vartotojas išmoksta formatą „Toliau – skaidrė N: …“. Pavadinimas padeda prisiminti temą, bet **per ilgas pavadinimas** nebesuteikia papildomos naudos – pakanka numerio ir trumpo žodžio.

### 2.2 Rizikos

- **2–3 eilutės** footeryje – ne kritinė klaida, bet silpnesnė UX.
- **70 simb.** – ribinis atvejis; 50–55 simb. būtų saugus orientyras vienai eilutei tipiniame ekrane (apie 40–50 simbolių matoma be wrap’o priklausomai nuo šrifto).

---

## 3. Sistemiški sprendimai

### 3.1 Variantai

| Variantas | Aprašymas | Privalumai | Trūkumai |
|-----------|-----------|------------|----------|
| **A. Riboti ilgį duomenyse** | Golden Standard + DATA_AGENT: footer max **55 simb.** (arba 50); naudoti `shortTitle`, jei skaidrė turi – kitaip sutrumpinti pavadinimą. | Vienoda UX, aiškūs kriterijai. | Reikia peržiūrėti ~17 ilgiausių ir pataisyti. |
| **B. Tik numeris** | Formatas: „Toliau – skaidrė 35“ (be pavadinimo). | Trumpiausia, nuoseklu. | Prarandama konteksto užuomina („kas toliau“). |
| **C. UI sutrumpinimas** | Duomenyse palikti pilną tekstą; UI rodo sutrumpintą (pvz. `line-clamp-1` arba max 45 simb. + „…“), pilnas tekstas – `title` / `aria-label`. | Duomenys pilni (SEO, a11y). | Sudėtingiau (truncation logika, locale). |
| **D. Hibridas (rekomenduojama)** | **(1)** Golden Standard papildyti rekomendacija: **„Rekomenduojama footer ilgis ≤ 55 simbolių“**; **(2)** ten, kur skaidrė turi **shortTitle**, naudoti jį footeryje vietoj pilno title; **(3)** jei vis tiek per ilga – CONTENT_AGENT sutrumpina pavadinimą (ne keičiant skaidrės title). | Balansas tarp skaitomumo ir konteksto; mažai pakeitimų. | Reikia pataisyti ~17 atvejų ir laikytis taisyklės toliau. |

### 3.2 Rekomenduojamas sprendimas: **D (Hibridas)**

1. **Dokumentuoti**  
   - **GOLDEN_STANDARD.md §3.6** – pridėti punktą: „Rekomenduojama: footer tekstas (visas) **iki 55 simbolių**; jei skaidrė turi `shortTitle`, naudoti jį footeryje.“

2. **Duomenys (DATA_AGENT / CONTENT_AGENT)**  
   - Skaidrėse, kur yra **shortTitle**, footeryje naudoti: `Toliau – skaidrė N: [shortTitle]`.  
   - Jei footer vis dar > 55 simb. – sutrumpinti tik *pavadinimo dalį* (pvz. „Konteksto degradacija: kodėl modeliai „pamiršta"?“ → „Konteksto degradacija“ arba „Kodėl modeliai „pamiršta"?“), nekeičiant pačios skaidrės title.

3. **UI (optional)**  
   - Jei norima dar sumažinti vizualinį ilgį: SlideContent.tsx footeryje galima naudoti `line-clamp-1` su `title={footer}` (pilnas tekstas tooltip), arba palikti kaip dabar – wrap. Pirmu etapu **pakanka duomenų lygio** taisymo.

4. **Patikra prieš release**  
   - **footer-slide-numbers.mdc** arba RELEASE_QA_CHECKLIST – pridėti: „Jei footer > 55 simb., svarstyti shortTitle arba sutrumpinimą.“

---

## 4. Konkretūs pataisymų kandidatai (ilgiausi)

Pirmiausia pataisyti footerus, kurie **> 60 simb.** (17 atvejų), naudojant `shortTitle` arba sutrumpintą pavadinimą:

| # | Modulis | Skaidrė (id) | Dabartinis footer (trumpinys) | Siūlomas variantas |
|---|---------|--------------|-------------------------------|---------------------|
| 1 | M4 LT  | 65.7→65.8    | …35: Konteksto degradacija: kodėl modeliai „pamiršta"? (70) | …35: Konteksto degradacija (45) |
| 2 | M3 LT  | 4            | …4: Scenarijus 2: Pardavimų Analizė ir Veiksmų Planas (69) | …4: Pardavimų analizė ir veiksmų planas (52) arba shortTitle jei yra |
| 3 | M4 LT  | 26           | …26: 4 strategijos, kurios pakelia DI atsakymų kokybę (69) | …26: 4 strategijos (40) |
| 4 | M4 EN  | 15           | …15: Is your prompt good… or does it just look that way? (68) | …15: Is your prompt good… or just looks that way? (57) arba shortTitle |
| 5 | M3 LT  | 6            | …6: Scenarijus 4: Vidaus Komunikacijos Dokumentas (65) | …6: Vidaus komunikacijos dokumentas (48) |
| … | …      | …            | (likusius 12 atvejų 60–64 simb. peržiūrėti pagal tą pačią logiką) | shortTitle / sutrumpinimas |

*Pilnas 17 įrašų sąrašas gali būti išvestas skriptu (`node -e "..."`) iš šio dokumento 1.2 skyriaus.*

**Įgyvendinta (2026-03-11):** Visi footeriai > 55 simb. sutrumpinti – 26 pakeitimų `modules.json` (LT), 3 pakeitimai `modules-en-m4-m6.json` (EN). Naudota shortTitle ten, kur buvo (pvz. Jungiamoji praktika, Sprintas, HTML praktika, RAG atmintis), arba rankinis sutrumpinimas. Po pakeitimų nė vienas „Toliau – skaidrė“ / „Next – slide“ footer neviršija 55 simb.

---

## 5. Santrauka

- **Problema:** 17 footer tekstų viršija 60 simb., 1 – 70 simb.; nėra ribos Golden Standard; ilgi footeriai wrap’ina į 2–3 eilutes.
- **Rekomendacija:** Hibridas (D): **(1)** GS §3.6 – rekomenduojamas max **55 simb.** ir naudoti shortTitle; **(2)** pataisyti ~17 ilgiausių; **(3)** release QA – patikrinti ilgius footerus.
- **Rizika:** Jei nieko nekeičiame – tik estetinė/UX; jei keičiame – reikia sinchronizuoti LT ir EN (modules.json + modules-en-m4-m6.json).

---

## Nuorodos

- `.cursor/rules/footer-slide-numbers.mdc` – footer numeriai prieš release
- `docs/development/GOLDEN_STANDARD.md` §3.6 – footerių formatas
- `src/components/SlideContent.tsx` – bendras footer rodymas
- `src/components/slides/types/ContentSlides.tsx` – section-break footer blokas
