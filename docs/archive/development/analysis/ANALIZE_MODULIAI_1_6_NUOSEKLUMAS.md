# Moduliai 1–6: nuoseklumo ir kokybės analizė

> **Data:** 2026-03-09  
> **Tikslas:** Terminų nuoseklumas, kreipinio forma (tu/Jūs), žargonas, rizikingos vietos. Pataisyti pagal SOT (`PAPRASTOS_KALBOS_GAIRES.md`, `GOLDEN_STANDARD.md`, `CONTENT_MODULIU_ATPAZINIMAS.md`).

---

## 1. Atlikti pataisymai (modules.json)

### 1.1 Kreipinys: Jūs → tu (PAPRASTOS_KALBOS_GAIRES §4)

Vartotojui matomi tekstai turi būti **tu** forma (2-as asmuo vienaskaita). Pakeista:

| Vieta (modulis) | Buvo | Pataisyta |
|-----------------|------|-----------|
| M1, skaidrė ~9 | Sukurkite savo pilną promptą | Sukurk savo pilną promptą |
| M2, stilių skaidrė | Sukurkite formalią sutartį… [įrašykite produktą] | Sukurk formalią sutartį… [įrašyk produktą] |
| M2 | Parašykite skelbimą / Parašykite mandagų atsakymą | Parašyk skelbimą / Parašyk mandagų atsakymą |
| M2 | [įrašykite produktą] (body) | [įrašyk produktą] |
| M3, scenarijai | Sukurkite pilną promptą… (7 pavadinimai) | Sukurk pilną promptą… |
| M3, situation | matote, kur srityse | matai, kur srityse |
| M3, žingsniai vadovo ataskaitai | Išskirkite KPI… / Nurodykite struktūrą… | Išskirk… / Nurodyk… |
| M4, proceso grandinė | matote rezultatą; gaunate savo grandinę | matai rezultatą; gauni savo grandinę |
| M4, Custom GPT šablonas | ĮRAŠYKITE ROLĘ; pasirinkite arba aprašykite | Įrašyk rolę; pasirink arba aprašyk |
| M4, M5 quiz (explanation) | matote skirtumą; prisiminkite | matai skirtumą; prisimink |
| M4, M5 quiz | orientuojatės; klystate | orientuojiesi; klysti |
| M6, tyrimo ataskaita | Sukurkite pilną promptą… | Sukurk pilną promptą… |
| M6, REASONING žingsnis | Išskaidykite tyrimą… | Išskaidyk tyrimą… |
| M6, ADVANCED žingsnis | Nustatykite temperature… | Nustatyk temperature… |
| M6, Custom GPT | Sukurkite Custom GPT instrukcijas… | Sukurk Custom GPT instrukcijas… |

**Pastaba (2026-03-09 papildyta):** Moduliuose **7+** (M7–M15) taip pat pataisyta Jūs → tu: visi „nukopijuokite“, „įrašykite“, „paleiskite“, „Pakeiskite“, „pridėkite“, „gaukite“, „pažymėkite“, „pritaikėte“ ir kt. M9 scenarijų motivation/description/placeholder – tu forma.

---

## 2. Terminų nuoseklumas

### 2.1 DI vs AI

- **modules.json (LT):** Naudojamas **DI** (duomenų intelektas) – atitinka projekto standartą. AI nesutinkama vartotojui matomame turinyje M1–6.

### 2.2 Numeracija 4.1–4.7

- **CONTENT_MODULIU_ATPAZINIMAS:** 4.1–4.7 = **tik Modulio 4** skaidrės. Skyriaus „Praktinė dalis (Modulis 6)“ poskyriai be numerių (Projekto koncepcija, Scenarijus, Integracija).
- **Tikrinta:** `modules.json` ir nuorodos (footer, explanation) nurodo „4.2“, „4.3“, „4.6“ kaip Modulio 4 skaidres – **OK**.

### 2.3 Žargonas (PAPRASTOS_KALBOS_GAIRES §2)

- **KPI** – naudojamas M1–M6 (promptuose, aprašymuose). Gairės leidžia palikti su paaiškinimu „pagrindiniai rodikliai (KPI)“ pirmą kartą; kopijuojamuose promptuose palikta KPI.
- **Executive Summary** – M3 (vadovo ataskaita) turi „Executive Summary (1–2 puslapiai)“. Rekomenduojama vėlesnėje iteracijoje: „Vadovybės santrauka (1–2 psl.)“ arba palikti su skliaustu „(vadovybės santrauka)“.
- **SWOT, HR, CFO, EBITDA** – M1–M3 kontekste naudojami promptuose arba kaip rolės („HR vadovas“, „CFO asistentas“). Gairės: HR → „personalo“, CFO → „finansų vadovo“; jei keičiama – vienodai visur.
- **Rizika:** Per daug pakeitimų vienu metu gali sulaužyti scenarijų semantiką – rekomenduojama atskira „paprastos kalbos“ iteracija su CONTENT_AGENT.

---

## 3. Rizikingos vietos ir pastabos

### 3.1 blockVariant „violet“

- **GOLDEN_STANDARD §2.2** išvardija tik: accent, brand, terms, default.
- **Faktas:** UI (`ContentSlides.tsx`, `BlockSlides.tsx`) **palaiko** `blockVariant: "violet"` (violet-50, violet-500 ir kt.).
- **Išvada:** Dizaino doc ne atnaujintas – violet naudojamas M4 (section-break, quiz). Nekeista, kad nepalūžtų vizualas; rekomenduojama papildyti GOLDEN_STANDARD arba palikti kaip „semantinė spalva“ (pvz. Modulio 2 / testas).

### 3.2 Skaidrių id ir footer numeracija

- **footer-slide-numbers.mdc:** Skaidrės numeris footeryje = **1-based pozicija modulyje**, ne `slide.id` (pvz. ne 40.5, o „5“ jei tai 5-oji skaidrė).
- **Tikrinta:** Nepatikrinta visų M1–6 footer tekstų – rekomenduojama prieš release paleisti release QA (footer numeracijos patikra).

### 3.3 Glossary ir tools moduleId

- **glossary.json / tools.json:** Termai ir įrankiai turi `moduleId` (1–6 ir 7+). M1–6 terminų atitiktis su turiniu nebuvo pilnai audituota – galima kita iteracija: ar visi M1–6 terminai įeina į `glossary.json` su teisingu moduleId.

### 3.4 Modulio 6 žingsnių žingsniai

- M6 tyrimo ataskaitos scenarijus: žingsniai 1–6 (META → INPUT → OUTPUT → REASONING → QUALITY → ADVANCED). „whenToProceed“, „hint“ – nuosekliai **tu** forma po pataisymų.

---

## 4. Kas nebuvo keista (sąmoningai)

- **Moduliai 7–15:** Visi „nukopijuokite“, „įrašykite“, „pažymėkite“ ir pan. palikti – užduotis buvo **tik M1–6**.
- **„Peržiūrėti pilną pavyzdį“** (templateLabel): Laikoma infinitive mygtuko etiketė, ne kreipinys – nekeista.
- **Placeholder tekstai** tipu „[įrašyk…]“ – pakeista į tu formą ten, kur tai vartotojo instrukcija.

---

## 5. Validacija

- `node scripts/validate-schema.mjs` – **praeina** (modules.json, glossary, tools, promptLibrary ir kt.).
- Lint: didelių JSON failų lint įprastai nevykdomas; struktūra tikrinta per schema.

---

## 6. CHANGES / CHECKS / RISKS / NEXT

**CHANGES:**
- `src/data/modules.json` – 20+ pataisymų: Jūs→tu (Sukurkite→Sukurk, nukopijuokite→nukopijuok, matote→matai, orientuojatės→orientuojiesi, Išskaidykite/Nustatykite žingsniuose, įrašykite→įrašyk vietose, pasirinkite→pasirink, ĮRAŠYKITE→Įrašyk). Tik moduliai 1–6.

**CHECKS:**
- Atidaryta `docs/development/PAPRASTOS_KALBOS_GAIRES.md` – kreipinys tu forma patikrintas.
- Atidaryta `docs/CONTENT_MODULIU_ATPAZINIMAS.md` – 4.1–4.7 = tik M4; Modulio 6 poskyriai be 4.x – OK.
- Schema: `scripts/validate-schema.mjs` – modules.json OK.

**RISKS:**
- ~~Moduliuose 7–9 (ir toliau) vis dar daug „nukopijuokite“ / „įrašykite“~~ – **pataisyta:** M7–M15 taip pat naudoja tu formą (motivation, description, placeholder).
- Executive Summary, KPI, HR, CFO – jei vėliau tvarkomas žargonas, reikia vienu metu atnaujinti ir SOT (`turinio_pletra.md`, `turinio_pletra_moduliai_4_5_6.md`).

**NEXT:**
1. Prieš release – footer skaidrių numerių patikra (M1–6) pagal `.cursor/rules/footer-slide-numbers.mdc`.
2. Atskira „paprastos kalbos“ iteracija (žargonas): Executive Summary → vadovybės santrauka, KPI pirmas atsiradinimas, HR/CFO pagal PAPRASTOS_KALBOS_GAIRES (jei norima).
3. ~~Moduliai 7–15: Jūs→tu~~ – atlikta (motivation, description, placeholder).
