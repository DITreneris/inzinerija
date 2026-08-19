# Santraukos skaidrės – 5 blokų modelis (SOT)

> **Tikslas:** Vienas šaltinis tiesos modulio santraukos skaidrės struktūrai. Tekstus užpildo CONTENT_AGENT; pedagoginę struktūrą vertina CURRICULUM_AGENT.

---

## 1. 5 blokų tvarka

| #   | Blokas                   | Turinys                                                                     |
| --- | ------------------------ | --------------------------------------------------------------------------- |
| 1   | **Celebration Hero**     | Gradient brand→accent, introHeading „Ką išmokai“, intro body, 3 statistikos |
| 2   | **Žinių kortelės**       | Max 3 kortelės; ikona + heading + items su CheckCircle                      |
| 3   | **Refleksijos promptas** | Copyable; 3 klausimai (Apply, Analyze, Create)                              |
| 4   | **Kitas žingsnis CTA**   | Konkretus tekstas (pvz. „Pereikite prie Modulio 2“)                         |
| 5   | **Motyvacinis footer**   | Tagline, formulė                                                            |

---

## 2. Laukai (summary skaidrėse)

- **introHeading** – pvz. „Ką išmokai“.
- **stats** – 3 statistikos (Celebration Hero).
- **sections** – žinių kortelės (max 3).
- **M10 išimtis:** 4-a kortelė leidžiama tik kaip **transfer recap** („Kur pritaikyti“ / „Where to apply“) – 4 jau mokyti procesai iš 10.15, ne naujas „Ką išmokai“ katalogas ir ne hero statistika.
- **reflectionPrompt** – refleksijos tekste 3 klausimai + CopyButton.
- **tagline** – motyvacinis footer.
- **CTA** – konkretus kitas žingsnis.

---

## 3. Refleksijos prompto šablonas

- **Struktūra:** 3 klausimai (Apply, Analyze, Create) + 1 patarimas. Max 6–8 eilutės.
- **Q1 Apply:** įvardytas artefaktas + kada (per 24 val. / within 24 hours).
- **Q2 Analyze:** trintis, klaida arba riba. **Draudžiama:** „Kas buvo naujausia?“ / „What was newest?“ (tai kurso atsiliepimas, ne Analyze).
- **Q3 Create:** apribojimas arba kito ciklo atnaujinimas – ne antras Apply.
- **Patarimas:** iki 15 min + konkretus įrankis arba failas. Be bendrų frazių.
  - LT: `Po mano atsakymų duok vieną konkretų patarimą (iki 15 min, konkretus įrankis arba failas).`
  - EN: `After my answers, give one concrete tip (15 minutes or less, named tool or file).`
- **Stilius:** „What – So What – Now What“ (ką padarei, ką tai reiškia, ką darysi toliau).
- **Lukštas:** META / INPUT / OUTPUT summary ir test-results skaidrėse. M4 `66.97` ir M6 `65` lieka be META (esamas formatas).
- **INPUT:** palikti mokomus terminus; taisyti tik gramatiką (pvz. _baigiau Modulį 4_, ne _Modulio 4_).
- **EN balsas:** `learning reflection assistant`; klausimai **I** forma; American English (`artifact`, `license`).
- **Copy mygtukas:** Prominent; feedback „Nukopijuota!“.

---

## 4. Sekcijų ikonos ir spalvos

- Ikonos: Layers, Repeat, Lightbulb, Target, Zap, Sparkles.
- Spalvos pagal modulio temą (brand, accent).

---

## 5. Nuorodos

- **CONTENT_AGENT** – tekstų užpildymas pagal šią spec: `docs/development/CONTENT_AGENT.md`.
- **CURRICULUM_AGENT** – pedagoginė struktūra ir vertinimas: `docs/development/CURRICULUM_AGENT.md`.
- **GOLDEN_STANDARD** – vizualė ir content-block: `docs/development/GOLDEN_STANDARD.md` §3.2, §3.3.
