# Pedagoginės įžvalgos – atitiktis ir planas (Must–Should–Want)

> **Paskirtis:** Lyginame 8 pedagogines įžvalgas su dabartiniu produktu; nustatome, kas jau padaryta, o kas lieka open.  
> **Atnaujinta:** 2026-07-27 (PC-4 closed) · Būklė prieš [`CODEBASE_WHAT_IS_DONE.md`](CODEBASE_WHAT_IS_DONE.md).  
> **Open vykdymas:** learning P0/P2 uždaryta (Horizon A CORP-M3 Should → deferred). Marketing / CRO – [`TODO.md`](../../TODO.md) §1.4.

---

## Palyginimas su kodu (2026-07)

| Įžvalga                          | Dabartinė būklė                                                                                                  | Atitiktis                                                                                                       |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| 1. Mokyti darymo, ne supratimo   | PracticalTask, copyable promptai, M9 practice-scenario, Practice closer PC-0…4, M4P/M7P branda; M3 CTA „Sukurk…“ | ✅ Closer + darymo CTA spot-check (M3)                                                                          |
| 2. Safe-to-fail sandbox          | localStorage; Path Test warm-up; M1 intro „treniruoklis“ banner                                                  | ✅ Architektūra + UI pranešimas                                                                                 |
| 3. Skaidrumas = sprendimo kelias | Nėra DI CoT UI; process/schema žingsniai (DiagramKit, M7 path map, MASTER)                                       | ✅ Nėra klaidinančio „minčių“ skaidrumo; gairė lieka jei bus live DI feedback                                   |
| 4. Role-first                    | M7 `journeyChoices` (6 keliai) + Lygis C overlay; branduolys be globalaus „pasirink rolę“ įėjimo                 | ⚠️ Dalinai M7 kelionėje; nėra product-wide role-first onboarding                                                |
| 5. Vertinimas padėti, ne teisti  | Path Test Shell (M2/M8/M11/M14): intro → warm-up → graded → results + remediation; Ready check soft po M3        | ✅ Path Test lukštas diagnostinis; branduolio Quiz explanation OK; tonas „čia stipru / rizika“ – tobulinti copy |
| 6. Per anksti per daug           | M1–9 production; M10–15 authoring; Docs Lean; ambicija = turinio kokybė, ne feature flood                        | ✅ Atitinka                                                                                                     |
| 7. Organizacijos atmintis        | Progresas: unlocked / completed / test scores; nėra bandymų istorijos ar „kas suveikė“ žurnalo                   | ❌ Tik completion metadata                                                                                      |
| 8. Teisinė/etinė by design       | Lokalu; M7 etikos blokai; M13 provenance/Legal skaidrės authoring                                                | ⚠️ Turinys yra; runtime apsaugos su realiu DI API – Want                                                        |

---

## Kas jau padengta (ne kartoti kaip Must)

- Path Test Shell homogenizuotas lukštas (GOLDEN §3.4a1).
- Practice closer branduolys PC-0…4; Teaching Elements registry + Feature Doc.
- Branduolio pasitikrinimas = readiness (ne hard gate).
- M7 makro kelio žemėlapis (sk. 71), journey copy Lygis C.
- Safe-to-fail: viskas lokalu + warm-up prieš graded.
- **Learning QA P0 (2026-07-27):** CQ-M79-1/2/3 · CQ-PORTAL 48h · PDF-1…6 · M1012-1/2 · DIAG-1.

---

## Low effort (P2)

- **Sandbox pranešimas:** ✅ M1 intro banner (2026-07-27).
- **„Darymo“ CTA:** ✅ M3 `firstActionCTA` „Sukurk bent 2…“ (2026-07-27); platesnis spot-check – optional.

## Must (open – learning P0)

- **Nėra.** Learning P0 uždaryta 2026-07-27.

## Should (P2 / vėliau)

- **PC-4.\*** ✅ (4.1 / 4.3 / 4.4 2026-07-27; 4.2 anksčiau).
- Role-first įėjimas platesniu produktu (ne tik M7 journey) — **deferred** (Horizon A CORP-M3 ✅ 2026-07-28; revisit po MON cutover arba Horizon C seed).
- Organizacijos atmintis (bandymų / „kas suveikė“ istorija) — **deferred** (tas pats trigger).
- Diagnostinis Quiz tonas visur (ne tik Path Test lukšte) — **deferred** (branduolys: Quiz formative + GOLDEN §3.7; platesnis = epic).

> **CORP-M3:** smallest slice dabar nedaromas; M7 journey + Quiz formative dengia branduolį.

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
| Open backlog           | [`TODO.md`](../../TODO.md) §1.3                        |
| Kas padaryta           | [`CODEBASE_WHAT_IS_DONE.md`](CODEBASE_WHAT_IS_DONE.md) |
| M7–9 residual          | [`07_08_09_backlog.md`](07_08_09_backlog.md) §4.6      |
| USER_JOURNEY (baigtis) | [`USER_JOURNEY_AGENT.md`](USER_JOURNEY_AGENT.md)       |
| Practice closer        | [`PRACTICE_CLOSER_PLAN.md`](PRACTICE_CLOSER_PLAN.md)   |
