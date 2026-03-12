# Pedagoginės įžvalgos – atitiktis ir planas (Must–Should–Want)

> **Paskirtis:** Lyginame 8 pedagogines įžvalgas su dabartiniu kodu; nustatome, ką įgyvendinti jau dabar, o ką kelti toliau. **Šaltinis:** ROADMAP.md (perkelta 2026-02-18 dėl roadmap sutrumpinimo).

---

## Palyginimas su kodu

| Įžvalga | Dabartinė būklė | Atitiktis |
|--------|------------------|-----------|
| 1. Mokyti darymo, ne supratimo | PracticalTask yra; modulių pabaigos ne visur aiškiai „rezultatas“ (promptas/eskizas) | ⚠️ Dalinai – CTA ir pabaigos ne visur verčia „ką sukūrei“. |
| 2. Safe-to-fail sandbox | Viskas localStorage, niekas neišlekia į produkciją | ✅ Architektūriškai OK; trūksta aiškaus pranešimo vartotojui. |
| 3. Skaidrumas = sprendimo kelias | Nėra DI chain-of-thought | ✅ Dabar nėra klaidinančio skaidrumo; ateičiai – gairė DI feedback. |
| 4. Role-first | Turinys rolėms panašus; nėra atskiros „pasirink rolę“ kelio | ⚠️ UX ne role-first. |
| 5. Vertinimas padėti, ne teisti | Quiz: „Teisingai/Neteisingai“ + explanation | ⚠️ Framinimas ne diagnostinis („čia stipru / silpna / pabandyk kitaip“). |
| 6. Per anksti per daug | Roadmap riboja: MVP pirmiausia | ✅ Atitinka. |
| 7. Organizacijos atmintis | Progresas – atrakinti, užbaigta; nėra bandymų istorijos | ❌ Sesijos metu veikia; po mokymų lieka tik „completed“. |
| 8. Teisinė/etinė by design | Lokalu, nėra realių API | ⚠️ Kol lokalu – rizika maža; su DI API reikės apsaugų. |

---

## Ką įgyvendinti jau dabar (low effort)

- **Sandbox pranešimas:** Trumpas tekstas (pirmas modulis / praktika): „Tai treniruoklis – galite bandyti, klysti ir grįžti; niekas neišlekia į tikrą sistemą.“
- **„Darymo“ CTA:** Kur yra PracticalTask – aiškiai „Sukurk…“ / „Rezultatas: jūsų promptas/eskizas“, ne tik „Peržiūrėjai“.

## Must (MVP / artimiausia release)

- **Kiekvienas modulis baigiasi kūriniu:** Bent viena užduotis – promptas, workflow eskizas ar fragmentas (patikrinti ir užbaigti).
- **Vertinimas diagnostinis:** Quiz ir praktikos – tonas „čia stipru“, „čia rizika“, „pabandyk kitaip“ + explanation.

## Should (po MVP)

- Role-first įėjimas (pasirink rolę); organizacijos atmintis (bandymų istorija); skaidrumas, kai bus DI (sprendimo kelias, ne „mintys“).

## Want (vėliau)

- Teisinė/etinė by design; pilna role-first patirtis.

---

## TOP įžvalgos kūrėjams (esmė – ne standartas)

1. **Mokyti darymo, ne supratimo** – modulis baigiasi rezultatu (promptas, eskizas), ne „aišku“.
2. **Safe-to-fail sandbox** – galima klysti; niekas neišlekia į produkciją; UI turi aiškinti.
3. **Skaidrumas ≠ visko rodymas** – rodyti sprendimo kelią (žingsniai, bandymai), ne „mintis“.
4. **Role-first, ne AI-first** – skirtingos rolės = skirtinga pirmoji patirtis.
5. **Vertinimas padėti, ne teisti** – diagnostinis tonas.
6. **Didžiausia rizika – per anksti per daug** – MVP nuobodus bet veikiantis.
7. **Organizacijos atmintis** – vertė: kas bandyta, kas suveikė, kaip evoliucionavo.
8. **Teisinė/etinė by design** – architektūra, ne pamokslas.

**Geriau nei „dar viena LMS“:** Kurti **treniruoklį** – kartoti, klysti, matyti progresą, grąžinti naudą į darbą.

**Top 3 pavojai:** (1) Per daug teorijos, per mažai veiksmo. (2) Bandymas patikti visiems. (3) Vertinimas, kuris gąsdina.
