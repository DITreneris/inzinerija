# M16–M18 CONTENT draft (F4 handoff → DATA)

> **Status:** Draft for F5 JSON seed · 2026-08-01  
> **Eilė:** [`MODULIO_16_SKAIDRIU_EILES.md`](../../MODULIO_16_SKAIDRIU_EILES.md)  
> **SOT:** [`turinio_pletra_moduliai_16_17_18.md`](../../turinio_pletra_moduliai_16_17_18.md)  
> Kreipinys **tu**; **DI**; „promptas“ be apostrofų. Curriculum ID tik navigacijoje.

---

## 1. Module chrome

| Mod | title                             | subtitle                             | description (≤120)                                                                   | whyBenefit                                                                             | duration  | accent | icon           |
| --- | --------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- | --------- | ------ | -------------- |
| 16  | Kodo inžinerija su DI             | Planavimas: nuo idėjos iki MVP brief | Išmoksi suformuluoti siaurą MVP užduotį ir užpildyti aiškų brief prieš Cursor.       | Po šio modulio turėsi aiškų MVP brief’ą – kam, ką ir kokiomis ribomis kursime su DI.   | 25–30 min | cyan   | Cpu            |
| 17  | Žinių patikrinimas (Kodo kelias)  | Testas: brief ir planavimo kokybė    | Patikrink, ar brief’as siauras ir patikrinamas. ≥70% rekomenduojama prieš Modulį 18. | Po testo žinosi, ar brief’as pakankamai siauras ir patikrinamas prieš Cursor projektą. | 12–15 min | cyan   | ClipboardCheck |
| 18  | Finalinis projektas (Kodo kelias) | BUILD PACKET → Cursor → soft DoD     | Sudėliosi BUILD PACKET ir įrodysi paleidžiamą (arba lokalų) MVP su disciplina.       | Po projekto turėsi BUILD PACKET ir įrodytą paleidžiamą (arba lokaliai veikiantį) MVP.  | 45–90 min | cyan   | Rocket         |

**Unlock:** 16←6 · 17←16 · 18←17.

**firstActionCTA**

- 160: Per 2 min užrašyk vieną naudotoją ir vieną problemą savo idėjai (arba naudok dienos prioritetų pavyzdį).
- 170: Atsakyk į klausimus apie brief ir planavimą – ne apie kodą.
- 180: Atidaryk savo `01_MVP_BRIEF.md` (arba šabloną) ir pažymėk Must / Won’t.

---

## 2. Six copyables (SOT §5.2)

### 2.1 Skeptikas (16.12)

```text
Tu esi skeptiškas produkto konsultantas. Mano idėja: [trumpai].
1) Surask nepatikrintas prielaidas.
2) Užduok max 5 klausimus, kurie sumažina riziką.
3) Pasakyk, kas greičiausiai neveiks pirmame prototipe.
Nesiūlyk papildomų funkcijų ir tech stack.
```

### 2.2 Brief pagalbininkas (16.21)

```text
Padėk parašyti siaurą MVP brief lietuviškai.
Kontekstas: [kortelė / idėja].
Taisyklės: Must ≤4; Won’t ≥3; max 3 spragos klausimais; be tech stack (stack – vėliau).
Grąžink 11 laukų: produkto sakinys, problema, naudotojas, vertė, ciklas, Must/Should/Won’t, ekranai ≤5, duomenys (high-level), Dabar→Toliau→Vėliau, 3 rizikos, sėkmės kriterijus.
```

### 2.3 Cursor vertikalus pjūvis (18.7)

```text
Dirbk Cursor projekte. Tikslas: vienas vertikalus pjūvis – [1 funkcija iš Must].
Prieš kodą: (1) failų planas, (2) Done kriterijus, (3) Won’t (ko nelieči).
Lauk mano „taip“. Tada generuok mažai, paleisk, patikrink.
Kalba UI: LT. Raktų ne kode ir ne promptuose.
```

### 2.4 Klaidos kontekstas (18.11)

```text
Simptomas: [ką matau].
Tikėjausi: [rezultatas].
Failai / vieta: [keliai].
Ką jau bandžiau: [1–2].
Užduok 4 tikslinančius klausimus, tada pasiūlyk 1 hipotezę ir 1 pakeitimą.
```

### 2.5 Planas prieš kodą (18.8)

```text
Prieš generuodamas kodą, surašyk:
1) kuriuos failus kurs/keisi,
2) ką laikysime Done,
3) ko neliesi (Won’t).
Lauk mano „taip“ – tada tik generuok.
```

### 2.6 PROJECT_RULES.md (18.6)

```text
Stack: Cursor-first; nekeisk stack be klausimo.
Must: [1–4 punktai iš brief].
Won’t: [auth / mokėjimai / … – ne šiame MVP].
Done: [kaip žinosime, kad veikia].
Kalba: LT UI tekstuose; kodas – aiškūs vardai.
Saugumas: raktų ne kode ir ne promptuose.
Prieš didesnį pakeitimą: failų planas → mano „taip“ → tada kodas.
```

---

## 3. Priority Trumpai / Daryk / Patikra (stubs)

### 16.8 Kūrimo kortelė

- **Trumpai:** Penki laukai – naudotojas, problema, vertė, 1 funkcija, sėkmės kriterijus – yra tiltas į brief.
- **Daryk:** Užpildyk kortelę savo idėjai (arba dienos prioritetų įrankiui).
- **Patikra:** Ar problema apie žmogų, o ne „noriu app“? Ar 1 funkcija tikrai viena?

### 16.21 Brief

- **Trumpai:** Brief = ribos + ciklas + Must/Won’t. Be stack ir ERD.
- **Daryk:** Užpildyk 11 laukų; nukopijuok Brief pagalbininką jei užstrigai.
- **Patikra:** Must≤4? Won’t≥3? Sėkmės kriterijus patikrinamas per <2 min?

### 18.12 PACKET

- **Trumpai:** PACKET = mvp_brief + user_flow + (schema) + build_prompt + PROJECT_RULES.
- **Daryk:** Surašyk failų sąrašą ir pažymėk, kas jau yra / ko trūksta.
- **Patikra:** Ar Cursor gali dirbti be „sukurk visą app“?

### 18.23 Soft DoD

- **Trumpai:** Baigiasi ne generavimu, o įrodymu vartotojui (arba lokaliai).
- **Daryk:** Pažymėk DoD checklist; pridėk proof (URL arba lokalus paleidimas).
- **Patikra:** Ar žinai, kaip grįžti prie ankstesnio commit?

---

## 4. M17 Q bank draft (10 graded + 3 warm-up)

### Warm-up (170.5)

1. Geriausias 1+1+1 startas? → naudotojas+problema+1 fn (+ sėkmės kriterijus) · related 16.2
2. Vertė vs funkcija: „Sutaupo 10 min rytą“ = vertė · related 16.6
3. Po testo M18 pirmiausia? → BUILD PACKET iš brief, ne „sukurk app“ · forward

### Graded (171) – 10 klausimų

1. Blogas startas: „Noriu app su DI“ → related 16.4
2. Vertė≠fn klasifikacija → 16.6
3. Triage: Auth pirmam MVP = Nekuriame → 16.7 / 16.18
4. VSR tvarka → 16.10
5. Brief trūksta Must/Won’t → 16.21
6. Ciklas vs feature list → 16.16
7. Per anksti: Redis+AWS+10 ekranų → 16.18
8. Prieš generate: PACKET/rules, ne „sukurk app“ → 16.21
9. Po DI pakeitimo trūksta: diff skaitymas → forward M18
10. Stripe/MCP brief fazėje = per anksti → 16.18

---

## 5. Transfer (summary closers)

| Mod | abilityBefore                           | abilityAfter                                         | firstAction24h                                           |
| --- | --------------------------------------- | ---------------------------------------------------- | -------------------------------------------------------- |
| 16  | Idėją laikiau „reikia app“ be ribų.     | Moku užpildyti MVP brief su Must/Won’t ir ciklu.     | Šiandien užbaik `01_MVP_BRIEF.md` vienai siaurai idėjai. |
| 18  | DI kodą paleisdavau be PACKET ir proof. | Turiu PACKET ir soft DoD įrodymą (URL arba lokalus). | Padaryk 1 commit + 1 smoke / proof savo MVP.             |

---

## 6. DATA handoff notes

- Slide types: action-intro / content-block / summary / test-\* / practice-intro – reuse only.
- Footers: „Toliau – skaidrė N: {title}“ per eilės indeksą.
- EN: `modules-en-m16-m18.json` via `build:modules-en-m16-m18`.
- `generate:core-data` N/A.
- Own-work / transfer ant 18.23 / 18.24 – reuse UJ-MUST fields.
