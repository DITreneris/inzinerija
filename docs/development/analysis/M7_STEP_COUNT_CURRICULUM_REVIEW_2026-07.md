# M7 step-count curriculum review – 2026-07

> Scope: pedagoginė diagnozė dėl M7 schemų žingsnių skaičiaus. Tai nėra galutinė kopija ir nekeičia `docs/turinio_pletra_moduliai_7_8_9.md`, `modules.json` ar React schemų.

## Klausimas

Ar M7 penki skirtingi schemų modeliai (6 pipeline, 5 paruošimas, 4 analizės tipai, 8 MASTER, 5 data story ciklas) yra pedagogiškai pagrįsti, ar reikia suvienodinti į 2-3 kanoninius modelius?

## Diagnozė

M7 turi ne vieną procesą, o tris skirtingus mokymosi sluoksnius:

1. **Orientacija:** 6 žingsnių duomenų analizės pipeline (nuo rinkimo iki publikavimo).
2. **Darbo paruošimas:** 5 žingsnių algoritmas ir 5 žingsnių data story ciklas.
3. **Taikymas / capstone:** 8 žingsnių MASTER promptas, kuris pereina į M9 praktiką.

4 analizės tipai nėra proceso seka – tai sprendimo kategorijos, todėl jų nereikėtų versti į pipeline žingsnius.

## Rekomendacija

Nepriverstinai suvienodinti skaičių. Vietoje to CONTENT_AGENT turėtų SOT vietose aiškiai įvardinti hierarchiją:

- **6 žingsniai = bendras kelias.**
- **5 žingsniai = pasiruošimo arba istorijos mini-procesas.**
- **4 tipai = analizės klausimų pasirinkimas, ne workflow.**
- **8 žingsniai = pilnas MASTER / M9 projekto vykdymas.**

Taip išlaikomas turinio tikslumas ir sumažinama M8 testų painiava.

## Handoff CONTENT_AGENT

Jei daromas turinio pataisymas, rekomenduojamos SOT vietos:

- `docs/turinio_pletra_moduliai_7_8_9.md` §8.1 skaidrės 7.3 / 7.4a / 7.16 / 7.26 / 7.28-29 – pridėti po vieną sakinį, paaiškinantį, kokio lygio schema tai yra.
- `docs/MODULIO_7_SKAIDRIU_EILES.md` §Trumpos taisyklės – pridėti trumpą „schemų hierarchijos“ punktą.
- M8 testų paaiškinimuose vengti klausimų, kurie tik tikrina skaičių atmintį be konteksto; jei skaičius tikrinamas, visada nurodyti, apie kurį modelį kalbama (pipeline, 4 tipai, MASTER).

## 2026-07-07 papildymas – warm-up savitikros

M7 branduolyje įterpiamos warm-up savitikros turi laikytis tos pačios hierarchijos:

- **73.5** tikrina 6 žingsnių pipeline – rinkimas, paruošimas, EDA, modeliai, vizualizacija, publikavimas.
- **731.5** tikrina 4 analizės tipus – aprašomoji, diagnostinė, nuspėjamoji, nurodomoji.
- **891.5** tikrina 5 žingsnių paruošimo / workflow logiką – valymas, metaduomenys, seka prieš analizę.
- **74.5** tikrina 8 žingsnių MASTER PROMPTĄ – pilnos analizės šabloną M9 projektui.

Klausimų tekstuose būtina įvardyti modelį, pvz. „6 žingsnių pipeline“, „4 analizės tipai“, „5 žingsnių paruošimas“, „8 žingsnių MASTER“. Taip savitikra stiprina orientaciją, o ne kuria papildomą skaičių painiavą.

## Rizikos

- Jei visas M7 schemas suvienodintume į vieną žingsnių skaičių, būtų prarastas skirtumas tarp orientacinio pipeline, analizės kategorijų ir capstone projekto.
- Jei nieko nepaaiškinsime, M8 klausimai apie 6 ir 8 žingsnius gali atrodyti kaip prieštara.
- Jei šią diagnozę paversime JSON pakeitimais be CONTENT_AGENT, bus pažeista SOT tvarka.
