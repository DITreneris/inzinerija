# Pedagoginės įžvalgos – atitiktis ir planas (Must–Should–Want)

> **Paskirtis:** Lyginame 8 pedagogines įžvalgas su dabartiniu produktu; nustatome, kas jau padaryta, o kas lieka open.  
> **Atnaujinta:** 2026-07-26 (turinio ambicijos flip) · Būklė prieš [`CODEBASE_WHAT_IS_DONE.md`](CODEBASE_WHAT_IS_DONE.md).  
> **Open vykdymas:** [`TODO.md`](../../TODO.md) §1 (P0 = mokymosi kokybė). Marketing / CRO – ne čia.

---

## Palyginimas su kodu (2026-07)

| Įžvalga                          | Dabartinė būklė                                                                                                               | Atitiktis                                                                                                               |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| 1. Mokyti darymo, ne supratimo   | PracticalTask, copyable promptai, M9 practice-scenario, Practice closer PC-0…3, M4P/M7P branda, ModuleCompleteScreen use-case | ⚠️ Dalinai – dauguma modulių baigiasi kūriniu; nuoseklus „Sukurk / rezultatas“ CTA ir §4.6 residual (CQ-M79-3) dar open |
| 2. Safe-to-fail sandbox          | localStorage; niekas neišlekia į produkciją; Path Test warm-up + remediation chips                                            | ✅ Architektūra + lukštas OK; sandėlio „treniruoklis“ pranešimas vis dar low-effort gap                                 |
| 3. Skaidrumas = sprendimo kelias | Nėra DI CoT UI; process/schema žingsniai (DiagramKit, M7 path map, MASTER)                                                    | ✅ Nėra klaidinančio „minčių“ skaidrumo; gairė lieka jei bus live DI feedback                                           |
| 4. Role-first                    | M7 `journeyChoices` (6 keliai) + Lygis C overlay; branduolys be globalaus „pasirink rolę“ įėjimo                              | ⚠️ Dalinai M7 kelionėje; nėra product-wide role-first onboarding                                                        |
| 5. Vertinimas padėti, ne teisti  | Path Test Shell (M2/M8/M11/M14): intro → warm-up → graded → results + remediation; Ready check soft po M3                     | ✅ Path Test lukštas diagnostinis; branduolio Quiz explanation OK; tonas „čia stipru / rizika“ – tobulinti copy         |
| 6. Per anksti per daug           | M1–9 production; M10–15 authoring; Docs Lean; ambicija = turinio kokybė, ne feature flood                                     | ✅ Atitinka                                                                                                             |
| 7. Organizacijos atmintis        | Progresas: unlocked / completed / test scores; nėra bandymų istorijos ar „kas suveikė“ žurnalo                                | ❌ Tik completion metadata                                                                                              |
| 8. Teisinė/etinė by design       | Lokalu; M7 etikos blokai; M13 provenance/Legal skaidrės authoring                                                             | ⚠️ Turinys yra; runtime apsaugos su realiu DI API – Want                                                                |

---

## Kas jau padengta (ne kartoti kaip Must)

- Path Test Shell homogenizuotas lukštas (GOLDEN §3.4a1).
- Practice closer branduolys PC-0…3; Teaching Elements registry + Feature Doc.
- Branduolio pasitikrinimas = readiness (ne hard gate).
- M7 makro kelio žemėlapis (sk. 71), journey copy Lygis C.
- Safe-to-fail: viskas lokalu + warm-up prieš graded.

---

## Low effort (kai liečia open P0/P1)

- **Sandbox pranešimas:** trumpas „treniruoklis – klysk ir grįžk“ (pirmas modulis / praktika).
- **„Darymo“ CTA nuoseklumas:** PracticalTask / closer – „Sukurk…“ / „Rezultatas: …“, ne tik „Peržiūrėjai“.
- **§4.6 #6–9** microcopy (TODO **CQ-M79-3**).

## Must (open – `TODO.md` §1 P0/P1)

- **M7–9 learning QA:** browser smoke S1–S7 / E1–E6; CONTENT residual §4.6 #6–9.
- **Portal 48h** anti-PPT retest.
- **PDF rankinė** M5/M6 (+ §5d) kaip learning artifact.
- **M10–12 authoring brandumas:** chrome / footer / CTA; `audit:m1012` + rankinė UI.

## Should (po P0/P1)

- Role-first įėjimas platesniu produktu (ne tik M7 journey).
- Organizacijos atmintis (bandymų / „kas suveikė“ istorija).
- PC-4.\* practice closer polish.
- Diagnostinis Quiz tonas visur (ne tik Path Test lukšte).

## Want (vėliau)

- Teisinė/etinė by design su realiu DI API.
- Pilna role-first patirtis visuose keliuose.
- M13–15 production release (dabar authoring).

---

## TOP įžvalgos kūrėjams (esmė – ne standartas)

1. **Mokyti darymo, ne supratimo** – modulis baigiasi rezultatu (promptas, eskizas), ne „aišku“.
2. **Safe-to-fail sandbox** – galima klysti; niekas neišlekia į produkciją; UI turi aiškinti.
3. **Skaidrumas ≠ visko rodymas** – rodyti sprendimo kelią (žingsniai, bandymai), ne „mintis“.
4. **Role-first, ne AI-first** – skirtingos rolės = skirtinga pirmoji patirtis.
5. **Vertinimas padėti, ne teisti** – diagnostinis tonas.
6. **Didžiausia rizika – per anksti per daug** – branduolys nuobodus bet veikiantis; plėtra = kokybė.
7. **Organizacijos atmintis** – vertė: kas bandyta, kas suveikė, kaip evoliucionavo.
8. **Teisinė/etinė by design** – architektūra, ne pamokslas.

**Geriau nei „dar viena LMS“:** Kurti **treniruoklį** – kartoti, klysti, matyti progresą, grąžinti naudą į darbą.

**Top 3 pavojai:** (1) Per daug teorijos, per mažai veiksmo. (2) Bandymas patikti visiems. (3) Vertinimas, kuris gąsdina.

---

## Nuorodos

| Kas                    | Kur                                                    |
| ---------------------- | ------------------------------------------------------ |
| Open backlog           | [`TODO.md`](../../TODO.md) §1                          |
| Kas padaryta           | [`CODEBASE_WHAT_IS_DONE.md`](CODEBASE_WHAT_IS_DONE.md) |
| M7–9 residual          | [`07_08_09_backlog.md`](07_08_09_backlog.md) §4.6      |
| USER_JOURNEY (baigtis) | [`USER_JOURNEY_AGENT.md`](USER_JOURNEY_AGENT.md)       |
