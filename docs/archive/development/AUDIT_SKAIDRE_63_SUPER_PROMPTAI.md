# UI/UX ir vartotojo kelionės auditas: skaidrė 63 „SUPER PROMPTAI“

**Skaidrė:** Modulis 6, id 63  
**Pavadinimas:** SUPER PROMPTAI  
**Subtitle:** MOKYTIS, EKSPERIMENTUOTI ir PERŽIŪRĖTI – 3 universalūs šablonai  
**Tipas:** content-block

**Audito data:** 2026-03-13  
**Šaltiniai:** GOLDEN_STANDARD.md §2.2, §3.2; UI_UX_AGENT.md §4.2; PAPRASTOS_KALBOS_GAIRES.md; USER_JOURNEY_AGENT; turinio_pletra_moduliai_4_5_6.md § SUPER PROMPTAI.

---

## 1. Rezultatų santrauka (OK / FAIL)

| Kriterijus                                                             | Rezultatas | Pastaba                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ---------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **blockVariant content-block**                                         | **FAIL**   | „Daryk dabar“ naudoja `blockVariant: "violet"`. Golden Standard §2.2 leidžia tik **brand**, **accent**, **terms**, **default** content-block sekcijoms. Violet nėra etalone.                                                                                                                                                                                                                                             |
| **Sekcijų schema (Trumpai → Daryk dabar → Copy → Patikra → Optional)** | **FAIL**   | Klasikinės content-block sekos nėra: yra Trumpai + Daryk dabar + 3 šablonų blokai, bet nėra vieno aiškaus „Copy-paste prompt“ bloko, nėra „Patikra“, nėra „Optional“. Skaidrė – 3 šablonų kortelės, ne viena veiksmo eilė.                                                                                                                                                                                               |
| **SOT turinys (dvi kortelės MOKYTIS \| EKSPERIMENTUOTI)**              | **FAIL**   | SOT (turinio_pletra_moduliai_4_5_6): „dvi kortelės (MOKYTIS \| EKSPERIMENTUOTI) su CopyButton; po antra kortele – trumpas tekstas… haliucinacijų“. Dabartyje: 3 blokai (MOKYTIS, EKSPERIMENTUOTI, PERŽIŪRĖTI); **EKSPERIMENTUOTI neturi kopijuojamo šablono** (SOT turi ekstremalų promptą copy-paste). Trūksta teksto bloko po EKSPERIMENTUOTI: „Šis promptas gali paskatinti nerealų… → perėjimas prie haliucinacijų“. |
| **Vienas dominuojantis CTA**                                           | **WARN**   | Du kopijuojami blokai (MOKYTIS per practicalTask, PERŽIŪRĖTI per section copyable). UI_UX_AGENT §4.2 – „vienas aiškiai dominuojantis CTA“. Vartotojas gali neaiškiai, ką daryti pirmiausia.                                                                                                                                                                                                                              |
| **Sekcijų antraštės savarankiškos**                                    | **OK**     | „Trumpai“, „Daryk dabar“, „1. MOKYTIS…“, „2. EKSPERIMENTUOTI…“, „3. PERŽIŪRĖTI…“ – suprantami be skaidrės pavadinimo.                                                                                                                                                                                                                                                                                                    |
| **Numeracija (1, 2, 3)**                                               | **OK**     | 1️⃣ 2️⃣ 3️⃣ prasideda nuo 1.                                                                                                                                                                                                                                                                                                                                                                                                |
| **Paprasta kalba / žargonas**                                          | **WARN**   | „20/80“ – nepaaiškinta (Pareto principas). „Haliucinacijos“ – naudinga vienas sakinys (jau yra „nerealų atsakymą“). „SUPER“ – pavadinime ok, bet ne „super“ kaip hype; subtitle „3 universalūs šablonai“ gerai.                                                                                                                                                                                                          |
| **Lietuviškos raidės**                                                 | **OK**     | peržiūrėti, haliucinacijų, šabloną – teisingai.                                                                                                                                                                                                                                                                                                                                                                          |
| **Onboarding / pirmas veiksmas**                                       | **WARN**   | „Daryk dabar“ sako „Nukopijuok MOKYTIS arba PERŽIŪRĖTI“ – du pasirinkimai be prioriteto. Pirmą žingsnį galima paryškinti („Pradėk nuo MOKYTIS“).                                                                                                                                                                                                                                                                         |
| **Vartotojo kelionė (trintis)**                                        | **WARN**   | Ilgas skaidrės turinys (5 sekcijų + practicalTask); EKSPERIMENTUOTI tik skaitomas, be veiksmo – energija gali kristi. SOT siūlo dviejų kortelių layout (MOKYTIS \| EKSPERIMENTUOTI) su Copy – aiškesnė struktūra.                                                                                                                                                                                                        |

---

## 2. Ar čia tikrai „SUPER“?

- **Pavadinimas „SUPER PROMPTAI“** – projekte įsitvirtinęs (SOT, modulio aprašymai). Rekomenduojama **palikti**, bet:
  - Subtitle „3 universalūs šablonai“ jau atlieka paaiškinimo vaidmenį.
  - Jei norima sumažinti „hype“ – galima antraštę palikti, o Trumpai pirmame sakinyje naudoti „Trys universalūs promptų šablonai“ (be „super“), arba palikti kaip yra.
- **Išvada:** Nėra būtina keisti pavadinimo; verta užtikrinti, kad turinys atitinka SOT ir Golden Standard, o ne priedą „super“.

---

## 3. Low hanging fruits (greiti pataisymai)

1. **Pakeisti `blockVariant` „Daryk dabar“ iš `violet` į `brand`**
   - Failas: `src/data/modules.json` (ir `modules-m1-m6.json` jei core).
   - Priežastis: Golden Standard §2.2 – content-block naudoja tik brand/accent/terms/default.

2. **Paryškinti pirmą žingsnį**
   - „Daryk dabar“ tekste: pirmiausia rekomenduoti vieną variantą, pvz. „Pradėk nuo MOKYTIS šablono žemiau: nukopijuok, įrašyk [X] ir [TEMA], paleisk DI. Norint peržiūrėti savo darbą – naudok PERŽIŪRĖTI.“

3. **Pridėti trumpą 20/80 paaiškinimą** (paprasta kalba)
   - Sekcijoje „1. MOKYTIS“ body pradžioje vienas sakinys: „20/80 principas: mažai informacijos (apie 20 %) gali duoti didelę dalį supratimo (apie 80 %).“

4. **SOT atitiktis – EKSPERIMENTUOTI ir haliucinacijų tekstas**
   - SOT reikalauja: (a) EKSPERIMENTUOTI kortelė su **CopyButton** (ekstremalus promptas, pvz. 72 val. / 1 mln. verslas); (b) po antra kortele atskiras blokas: „Šis promptas gali paskatinti nerealų arba perdėtą atsakymą → perėjimas prie haliucinacijų (žr. Modulio 7, skaidrė Haliucinacijos / 67.8).“
   - Low-hanging: bent **tekstą** po EKSPERIMENTUOTI įdėti į section body arba naują section (terms). Pilna atitiktis – pridėti EKSPERIMENTUOTI copyable į JSON (SOT promptas turinio_pletra_moduliai_4_5_6).

---

## 4. Gilesni tobulinimai (prioritetas)

| Prioritetas | Veiksmas                                                                                                                                                                             | SOT / dokumentas                               |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------- |
| 1           | Pridėti EKSPERIMENTUOTI copyable šabloną (ekstremalus promptas) ir Copy mygtuką                                                                                                      | turinio_pletra_moduliai_4_5_6 § SUPER PROMPTAI |
| 2           | Pertvarkyti skaidrę į „dvi kortelės“ (MOKYTIS \| EKSPERIMENTUOTI) + po EKSPERIMENTUOTI blokas apie haliucinacijas (nuoroda į Modulio 7); PERŽIŪRĖTI – trečia kortelė arba „Optional“ | SOT UI pastaba; Golden §3.2                    |
| 3           | Sumažinti kognityvinę apkrovą: vienas aiškius „Pirmas žingsnis“ (MOKYTIS), kiti – „Tada gali…“ / „Optional“                                                                          | USER_JOURNEY_AGENT, vienas dominuojantis CTA   |
| 4           | Patikrinti footer ir skaidrių eilę (SUPER PROMPTAI → Refleksija → Duomenų tvarkymas)                                                                                                 | turinio_pletra_moduliai_4_5_6                  |

---

## 5. Checklist (UI_UX_AGENT §4.2) – santrauka

| Kriterijus                                 | Statusas                                                  |
| ------------------------------------------ | --------------------------------------------------------- |
| Vizualinė hierarchija (brand/accent/terms) | FAIL – violet naudojamas                                  |
| Vienas dominuojantis CTA                   | WARN – du copy blokai                                     |
| A11y (aria-label, role, tabIndex)          | Nepatikrinta (TemplateBlock/CopyButton – atskira patikra) |
| Touch targets, dark mode                   | Nepatikrinta (bendras ContentSlides)                      |
| Skenuojamumas, lentelės                    | OK – lentelių nėra                                        |

---

## 6. CHANGES / NEXT (sugestijos)

- **CHANGES (minimalūs):** `modules.json` skaidrė 63: section „Daryk dabar“ → `blockVariant: "brand"` vietoj „violet“; papildyti „Daryk dabar“ arba Trumpai pirmu rekomenduojamu žingsniu; optional – vienas sakinys 20/80 paaiškinimui; optional – tekstas po EKSPERIMENTUOTI apie haliucinacijas (SOT).
- **NEXT:** (1) DATA_AGENT: EKSPERIMENTUOTI copyable į sections arba practicalTask; (2) CONTENT_AGENT: SOT teksto bloko „Šis promptas gali paskatinti…“ įtraukimas; (3) Release prieš – footer skaidrių numeriai (jei keista eilė).
