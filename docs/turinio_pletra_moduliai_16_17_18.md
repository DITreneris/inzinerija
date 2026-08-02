# Turinio plėtra – Moduliai 16, 17, 18 (Kodo inžinerija / vibe-coding)

> **Autorinė mokymo medžiaga © 2026**  
> Šis dokumentas yra **turinio SOT** Kodo inžinerijos keliui (Moduliai 16–18). Papildo `turinio_pletra.md` ir modulius 1–15.  
> **Source of truth:** turinio semantika – **šis failas**; full JSON (`src/data/modules.json`) – vėliau, po skaidrių eilės.  
> **Stack:** **Cursor-first** (vibe coding su DI redaktoriumi). Python/venv/pytest – optional pastabos, ne canonical kelias.  
> **Auditorija:** verslo / produktų žmonės; veikiantis prototipas be gilaus programavimo.  
> Žr. [CONTENT_MODULIU_ATPAZINIMAS.md](CONTENT_MODULIU_ATPAZINIMAS.md), [ROADMAP.md](../ROADMAP.md), [TODO.md](../TODO.md) §1.5.  
> Intake istorija: [archive …/VIBE_CODING_INTAKE_2026-07.md](archive/development/intake/VIBE_CODING_INTAKE_2026-07.md).

---

## 0. Užrakinti sprendimai (consolidation 2026-07-26)

| Sprendimas           | Reikšmė                                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------------- |
| Modulų žemėlapis     | **M16 = D1+D2** (planavimas); **M17 = testas**; **M18 = D3+D4+D5** (packet→build→deploy)          |
| Stack                | **Cursor-first**                                                                                  |
| Triage (user-facing) | `Būtina dabar / Galima vėliau / Nekuriame`; brief laukuose Must/Should/Won’t = tas pats mapinimas |
| Naudotojo ciklas     | Viena schema: `Triggeris → Įvestis → Veiksmas → Rezultatas → Kitas`                               |
| M7 viz               | Lieka M7 optional (sk. 100–106); **M16–18 ≠ viz kelias**                                          |
| DoD                  | Soft: viešas URL **arba** lokalus paleidimo įrodymas + GitHub                                     |
| Deploy               | Platform-agnostic; ne Heroku-only                                                                 |
| Artefaktų grandinė   | D1 kortelė → `01_MVP_BRIEF.md` → BUILD PACKET → paleidžiamas MVP (DoD)                            |
| Framing              | **Vibe coding su disciplina** = brief/PACKET prieš generavimą; ne „pamiršk kodą“                  |
| Tooling floor        | Cursor + PACKET + `PROJECT_RULES.md`; **ne** Spec Kit CLI / MCP kaip privaloma                    |

```text
M16 planavimas          M17 testas         M18 packet → build → deploy
D1 kortelė ──► D2 brief ──► (patikra) ──► PACKET + rules + Cursor + smoke/Git/DoD
```

---

## 1. Apimtis ir tikslai (CURRICULUM)

### 1.1 Vieta kurse

| Ankstesni keliai                                                | Moduliai 16–18                              |
| --------------------------------------------------------------- | ------------------------------------------- |
| 1–6 pamatas · 7–9 DA · 10–12 agentai · 13–15 turinio inžinerija | **Kodo inžinerija** – vibe-coding su Cursor |

**Prielaida:** Dalyvis baigė **Modulius 1–6** (promptų anatomija + kontekstas). M7–15 neprivalomi.  
**Struktūra:** Teorija (M16) → Testas (M17) → Projektas (M18).

### 1.2 Mokymosi tikslai (po modulių 16–18)

- **Siaura užduotis:** Suformuluoti 1 naudotoją, 1 problemą, 1 vertę, 1 pagrindinę funkciją ir sėkmės kriterijų.
- **MVP brief:** Parengti `01_MVP_BRIEF.md` (ribos, Must/Won’t, Now–Next–Later, rizikos).
- **Build packet:** Iš brief’o sudėlioti user flow, minimalų duomenų modelį, Cursor build promptą, `PROJECT_RULES.md` ir priėmimo kriterijus.
- **Projekto taisyklės:** Parašyti trumpą taisyklių failą agentui (ribos, Won’t, Done).
- **Vibe coding higiena:** Paleisti / smoke / `.env` / debug (1 pakeitimas); Git prieš didesnį DI pakeitimą.
- **Diff ritualas:** Prieš commit po DI – perskaityti diff ir paleisti smoke.
- **Paleidimas:** Platform-agnostic deploy arba lokalus proof; Definition of Done.
- **Testas (M17):** Patikrinti planavimo ir brief kokybę prieš M18.
- **Projektas (M18):** Nuo brief’o iki įrodyto paleidžiamo MVP.

### 1.3 Ryšys su 6 blokais (M1–6)

- **META:** Rolė „žmogus, kuris su DI kuria siaurą prototipą“; ribos ir prioritetai – žmogaus.
- **INPUT:** Brief / flow / duomenys / apribojimai – kontekstas Cursor sesijai (ne „sukurk visą app“).
- **OUTPUT:** Formatas ir Done kriterijai (ką grąžinti, kaip patikrinti).
- **Quality:** Smoke, edge cases, necommitinti paslapčių; planas prieš refaktorių.

**Nuoroda pirmose M16 skaidrėse:** „Promptų ir konteksto pamatai – Moduliuose 1–6. Čia fokusas – produkto užduotis ir vibe-coding su Cursor.“

### 1.4 whyBenefit

| Modulis | Tipas          | whyBenefit (į JSON vėliau)                                                             |
| ------- | -------------- | -------------------------------------------------------------------------------------- |
| **16**  | action-intro   | Po šio modulio turėsi aiškų MVP brief’ą – kam, ką ir kokiomis ribomis kursime su DI.   |
| **17**  | test-intro     | Po testo žinosi, ar brief’as pakankamai siauras ir patikrinamas prieš Cursor projektą. |
| **18**  | practice-intro | Po projekto turėsi BUILD PACKET ir įrodytą paleidžiamą (arba lokaliai veikiantį) MVP.  |

### 1.5 Canonical pavyzdys (visam keliui)

**Dienos prioritetų įrankis** užimtam specialistui: per mažiau nei 2 minutes susidėlioti 3 svarbiausias dienos užduotis.  
Naudojamas M16–18 skaidrių pavyzdžiuose (ne kaip vienintelė leistina idėja).

---

## 2. Modulis 16 – Planavimas (D1 + D2)

**Tikslas:** Nuo miglotos idėjos iki `01_MVP_BRIEF.md`. **Dar ne** Cursor build, ERD, Git, deploy.  
**Biudžetas:** ~18–22 skaidrės outline.

### 2.1 D1 – Nuo problemos iki aiškios MVP užduoties (~9 sk.)

| #     | Antraštė                 | Esminė žinutė                                                                                     |
| ----- | ------------------------ | ------------------------------------------------------------------------------------------------- |
| 16.1  | Kurso / modulio pažadas  | Veikiantis prototipas su DI; rezultatas ≠ prezentacija                                            |
| 16.2  | Ką šiandien padarysi     | 1 problema · 1 naudotojas · 1 užduotis · greitas testas                                           |
| 16.25 | Stack žemėlapis          | Sluoksniai: chat DI (brief) · Cursor (kodas M18) · GitHub (proof) · host vėliau – ne įrankių mugė |
| 16.3  | Proceso schema (kelio)   | PROBLEMA → NAUDOTOJAS → VERTĖ → 1 FUNKCIJA → PROTOTIPAS → TESTAS                                  |
| 16.4  | Problema prieš sprendimą | Blogas: „Noriu app su DI“ · Geras: konkreti naudotojo problema                                    |
| 16.5  | Problemos formulė        | `[Naudotojas] susiduria su [problema] kai [situacija], todėl [pasekmė]`                           |
| 16.6  | Vertė ≠ funkcija         | Vertė = pokytis; funkcija = veiksmas produkte                                                     |
| 16.7  | MVP apimtis              | Būtina dabar / Galima vėliau / Nekuriame · 1 fn + max 1–2 palaikančios                            |
| 16.8  | Praktika: kūrimo kortelė | 5 laukai → įvestis į D2                                                                           |

**D1 artefaktas:**

```text
1. Naudotojas:
2. Problema:
3. Kuriama vertė:
4. Pagrindinė funkcija:
5. Kaip suprasime, kad prototipas veikia:
```

**Tikrinimo klausimai (problema):** dažnis; nepatogumas/sąnaudos; ar prototipas patikrina dalį. Mokėjimas = optional.

**Vizualinė disciplina D1:** principo · schemos · praktikos skaidrės. Be emoji krūvos, logotipų juostų, memų.

### 2.2 D2 – Nuo idėjos iki MVP brief’o (~10–12 sk.)

**Transformacija:** Neaiški idėja → patikrinta koncepcija → apibrėžtos ribos → `01_MVP_BRIEF.md`.  
**Karkasas:** Vibe → Skeleton → Refinement (brief brandinimo fazės; ne antras delivery kelias).

| #     | Antraštė                     | Esminė žinutė                                                                         |
| ----- | ---------------------------- | ------------------------------------------------------------------------------------- |
| 16.9  | Perėjimas                    | D1 padaryta (kortelė) → D2: kritika, kryptis, ribos, brief                            |
| 16.10 | Vibe → Skeleton → Refinement | Metodinė schema; active-step                                                          |
| 16.11 | Produkto sakinys             | Kuriu [produktą], kuris padeda [žmogui] išspręsti [problemą], suteikdamas [rezultatą] |
| 16.12 | Trys atramos + kritika       | Problema–naudotojas–vertė; skeptiškas promptas (be funkcijų spill)                    |
| 16.13 | Praktika: išgrynink          | Prieš/Po sakinys                                                                      |
| 16.14 | Trys kryptys                 | A/B/C: kam / ką daro / rezultatas; ne 30 funkcijų                                     |
| 16.15 | Rinkis patikrinamiausią      | Lentelė 1–5; ne radaras                                                               |
| 16.16 | Naudotojo ciklas             | Triggeris→…→Kitas (ta pati schema kaip M18)                                           |
| 16.17 | Ekranai iš srauto            | Max 3–5; ne DI fantazija                                                              |
| 16.18 | Ribos                        | Būtina/Galima/Nekuriame = Must≤4 / Should / Won’t sąmoningai                          |
| 16.19 | Now–Next–Later               | Be Q roadmap; „Dabar“ = vienas trumpas ciklas                                         |
| 16.20 | Rizikos (thin)               | 3 rizikos + mažinimas (lentelė; ne 2×2 MUST)                                          |
| 16.21 | Praktika: brief              | Užpildyk `01_MVP_BRIEF.md`                                                            |

**D2 sk. „Pirmoje dalyje…“:** tik pagal naują D1 (kortelė), ne „mokėmės vibe coding“.

### 2.3 `01_MVP_BRIEF.md` – privalomi laukai

1. Produkto sakinys
2. Problema
3. Tikslinis naudotojas
4. Vertės pažadas
5. Pagrindinis naudotojo ciklas
6. MVP ribos (Must / Should / Won’t)
7. Pagrindiniai ekranai (≤5)
8. Duomenys (high-level; detalus modelis – M18)
9. Dabar → Toliau → Vėliau
10. 3 rizikos
11. Sėkmės kriterijus

### 2.4 Copyable (M16) – eskizas

**Skeptiškas produkto konsultantas:** nepatikrintos prielaidos · 5 klausimai · kas gali neveikti · nesiūlyk papildomų funkcijų.

**Brief pagalbininkas:** siauras MVP brief; max 3 spragos; klausimai tik būtini; Must≤4; Won’t≥3; be tech stack spill (stack – M18).

### 2.5 M16 WON’T

Design Thinking / Lean / Agile teorija · multi-model mugė · Gamma kaip deliverable · roadmap Q2–Q4 · Cursor build · ERD · Git/deploy · auth / mokėjimai kaip pirmo MVP branduolys (ne „niekada“ – **ne dabar**).

---

## 3. Modulis 17 – Testas

**Tikslas:** Ar brief’as ir planavimo principai pakankamai geri eiti į M18?  
**Ne:** kodo rašymas, DB tipai, deploy.

### 3.1 Aprėptis (klausimų temos)

| Tema                          | Pavyzdinis tipas                                   |
| ----------------------------- | -------------------------------------------------- |
| 1+1+1 MVP                     | Pasirink geriausią formulę / atpažink blogą startą |
| Vertė ≠ funkcija              | Klasifikuok teiginius                              |
| Triage                        | Kas Būtina / Nekuriame                             |
| VSR / proceso tvarka          | Surikiuok etapus                                   |
| Brief kokybė                  | Ko trūksta brief’e                                 |
| Ciklas vs funkcijų sąrašas    | Kuris aprašo UX                                    |
| Kas priklauso M18             | Atpažink „per anksti“ (Redis, AWS, 10 ekranų)      |
| Kontekstas prieš generate     | Rules / PACKET vs „sukurk app“                     |
| Diff prieš commit             | Kuris žingsnis trūksta po DI pakeitimo             |
| Per anksti (saugumas / stack) | Auth / Stripe / MCP vs brief ribos                 |

### 3.2 Shell

Kaip kiti Path Testai (GOLDEN §3.4a1): intro → warm-up → graded → results. Domain stuburas = planavimas / brief, ne coding.

### 3.3 whyBenefit / CTA

Po testo – soft CTA į M18; moduliai neužrakinti pagal tą pačią logiką kaip kiti keliai (detalės – JSON metu).

---

## 4. Modulis 18 – Projektas (D3 + D4 + D5)

**Įvestis:** `01_MVP_BRIEF.md` iš M16.  
**Išeitis:** BUILD PACKET + įrodytas paleidžiamas (arba lokaliai veikiantis) MVP pagal DoD.  
**Biudžetas:** ~22–28 sk. po merge (pjauti overlap pirmiausia).

### 4.1 Blokas A – Spec → BUILD PACKET (iš D3, be D1/D2 pakartojimo)

**Ne kartoti:** ilgas MVP 1+1+1 kursas (max 1 refresh skaidrė).  
**Ašis:** brief → flow → duomenys → rules → Cursor promptas → Done kriterijai.

| Tema                           | Turinys                                                                                                                       |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| Kodėl ne visa app              | Chaosas vs kontroliuojamas kūrimas; DI siūlo, žmogus riboja                                                                   |
| Anti-pavyzdys                  | Task Manager + Redis/WebSocket/AWS / Auth / Stripe – ne pirmam MVP                                                            |
| User flow                      | 5–7 žingsniai; klaidos atšakos; ekranai iš srauto                                                                             |
| Minimalūs duomenys             | 2–4 esybės; atributai plain LT; 1:N jei reikia; **ne** SQL vs NoSQL kursas                                                    |
| Build brief (6)                | Projektas · naudotojas · tikslas · kontekstas · apribojimai · Done (= intent · acceptance · constraints – tie patys 6 laukai) |
| `PROJECT_RULES.md`             | 8–12 eilučių: stack hint (Cursor-first), Must/Won’t, Done, kalba LT, nerodyk raktų                                            |
| Cursor vertikalus pjūvis       | Viena funkcija / vienas pjūvis; failų planas prieš kodą; priėmimo kriterijai                                                  |
| Planas → patvirtinimas → kodas | Agentas grąžina failų planą; žmogus sako „taip“ prieš generuoti                                                               |
| Composer vs Chat (1 mintis)    | Multi-file agent = PACKET įvestis; Chat = klaidos/debug; ne abu chaotiškai vienu metu                                         |
| Iteracija                      | Aprašyk → Generuok mažai → Paleisk → Patikrink → Klaida+kontekstas → Pataisyk                                                 |
| Klaidos promptas               | Blogas: „Neveikia“ · Geras: simptomas, tikėtasi, failai, 4 klausimai                                                          |

**BUILD PACKET failai:**

```text
mvp_brief.md      ← iš M16 / atnaujintas
user_flow.md
schema.dbml       ← optional; arba lentelė brief’e
build_prompt.md   ← Cursor-first
PROJECT_RULES.md  ← SHOULD: trumpos taisyklės agentui
```

### 4.2 Blokas B – Lokalus įrodymas (iš D4)

| Tema                       | Turinys                                                                                                                                                            |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Kodas ≠ produktas          | DI generuoja; žmogus tikrina paleidimą, funkciją, saugumą, regresiją                                                                                               |
| 3 spąstai (vibe debt lite) | (1) Testai, kuriuos DI parašė pagal kodą, ne pagal brief ciklą · (2) Dubliuotos fn / perteklinės abstrakcijos · (3) „Atrodo veikia“, bet praleistas verslo kraštas |
| 5 rizikos (nav)            | Deps → Env → Tests → Security → Deploy                                                                                                                             |
| Deps / aplinka             | Thin; Cursor projekto kontekste; ne poetry/maven katalogas                                                                                                         |
| Smoke                      | Ar pasileidžia; UI/API; pagrindinė fn; 1 raudona = nestartuojame                                                                                                   |
| Kritinis kelias            | Brief ciklas su laukiamu rezultatu / gedimu                                                                                                                        |
| Edge                       | Normalu / Riba / Klaida (thin)                                                                                                                                     |
| `.env`                     | Ne kode; ne GitHub; **nerodyk tikro rakto promptuose / skaidrėse**                                                                                                 |
| Debug                      | Klaida → įrodymai → hipotezė → **1 pakeitimas** → testas; nedaryk: 5 failai, trinti testus, slėpti klaidas                                                         |
| Paleidimo vartai           | VEIKIA → PATIKRINTA → APSAUGOTA → PALEISTA → STEBIMA                                                                                                               |

### 4.3 Blokas C – Git + publish + DoD (iš D5, be D4 dublikato)

| Tema               | Turinys                                                                         |
| ------------------ | ------------------------------------------------------------------------------- |
| Git sauga          | Prieš didesnį DI pakeitimą – commit veikiančios versijos                        |
| Terminai           | Repo / Commit (praktika); Branch/Merge – tik „egzistuoja“                       |
| Procesas           | status → **diff skaitymas** → smoke/test → commit → push                        |
| Deploy-ready       | README, deps failas, `.gitignore`, `.env.example`, paleidimo komanda            |
| Aplinkos           | Lokalus vs viešas; Staging optional žodis; Rollback                             |
| Publish            | GitHub → host → build → start → URL → logs (platform-agnostic)                  |
| Po deploy          | Atidaryti → veiksmas → rezultatas → logai (nesudvigubinti smoke teorijos)       |
| 3 signalai (NICE)  | God Object / copy-paste / Shotgun – optional gale; pirminiai spąstai = Blokas B |
| Saugus refaktorius | Commit → test → 1 problema → **planas prieš kodą** → diff → test → commit       |

### 4.4 Definition of Done (soft)

- [ ] GitHub repo + keli aiškūs commit
- [ ] `.gitignore`; raktai ne kode
- [ ] README paleidimui
- [ ] Yra `PROJECT_RULES.md` (ar ekvivalentas) repo šaknyje
- [ ] Bent 1 kritinės fn patikra (testas arba dokumentuotas smoke)
- [ ] Viešas URL **arba** lokalus paleidimo įrodymas
- [ ] Viena pataisyta problema su proof
- [ ] Žinai, kaip grįžti prie ankstesnės versijos (commit / rollback mintis)

**Baigiamoji mintis:** Vibe coding su disciplina baigiasi ne tada, kai DI sugeneruoja kodą – o kai sistema patikimai veikia vartotojui (arba įrodytai lokaliai).

### 4.5 M18 WON’T

SysEng profesija · Heroku-only · blue-green/CD kursas · coverage 80% · wellness · kainų anekdotai · multi-model mugė · „priklausomybių injekcija“ kaip „DI“ · antras pilnas smoke/debug kursas (jei Blokas B jau padengė) · MCP serveriai · Spec Kit CLI kaip privalomas įrankis · multi-agent / Mission Control · Composer mastery kursas.

---

## 5. Schemos ir teaching hint’ai (ne Feature Doc dar)

> Dabar – inventorizacija. Naujas Pattern / `image` key / lab – tik po eilės stabilumo + Feature Doc Contract.

### 5.1 MUST schemos / UI

| Modulis | Elementas                   | UI hint                           | Etalonas / Pattern   | Naujas?            |
| ------- | --------------------------- | --------------------------------- | -------------------- | ------------------ |
| M16     | Delivery 6 žingsniai        | Process Shell                     | M13-like pipeline    | Greičiausiai ne    |
| M16     | VSR 3 fazės                 | Process Shell                     | process              | Ne                 |
| M16     | Problema–naudotojas–vertė   | Static / 3 blokai                 | content-block        | Ne                 |
| M16     | Triage 3 zonos              | Lentelė                           | LENTELIU_STANDARTAS  | Ne                 |
| M16     | Naudotojo ciklas 5          | Process Shell                     | M13-like             | Ne                 |
| M16     | Brief layout                | Dense card / copyable template    | content-block        | Ne (ne lab)        |
| M16     | 3 kryptys A/B/C             | Lentelė; vėliau gal ChoiceControl | ChoiceControl        | Gal – po UI_UX     |
| M17     | Path Test shell             | TestPracticeSlides                | GOLDEN §3.4a1        | Ne                 |
| M18     | Chaosas vs kontrolė         | 2 kolonos                         | content-block        | Ne                 |
| M18     | Flow + klaidos              | Process Shell + branches          | Shell                | Gal layout only    |
| M18     | Min. ERD / lentelės         | Static diagram / lentelė          | Shell Ne arba static | Gal `image` vėliau |
| M18     | Build brief 6               | Kortelės                          | content-block        | Ne                 |
| M18     | `PROJECT_RULES.md` šablonas | Dense card / copyable             | content-block        | Ne (ne lab)        |
| M18     | Planas → patvirtinimas      | 2 kolonos Blogas\|Geras           | content-block        | Ne                 |
| M18     | 3 spąstai (vibe debt lite)  | Lentelė / 3 blokai                | content-block        | Ne                 |
| M18     | Diff ritualas               | Process (pabrėžtas žingsnis)      | process              | Ne                 |
| M18     | Iteracijos ciklas           | Process Shell                     | process              | Ne                 |
| M18     | 5 rizikos nav               | Process / steps                   | process              | Ne                 |
| M18     | Smoke indikatoriai          | Lentelė / checklist               | ne lab               | Ne                 |
| M18     | `.env` blogas/geras         | 2 kolonos                         | content-block        | Ne                 |
| M18     | Debug ciklas                | Process Shell                     | process              | Ne                 |
| M18     | Paleidimo vartai            | 5 steps                           | process              | Ne                 |
| M18     | Git procesas                | Process                           | process              | Ne                 |
| M18     | Deploy pipeline             | Process                           | process              | Ne                 |
| M18     | DoD checklist               | Checklist                         | content-block        | Ne                 |

### 5.2 Copyable klasės (vėliau brandinti)

Skeptikas · Brief · Cursor vertikalus pjūvis · Klaidos kontekstas · **Planas prieš kodą** (approve gate; tas pats pattern kaip saugus refaktorius) · **Projektų taisyklės** (`PROJECT_RULES.md`).

**Projektų taisyklės – eskizas (8–12 eil.):**

```text
Stack: Cursor-first; nekeisk stack be klausimo.
Must: [1–4 punktai iš brief].
Won’t: [auth / mokėjimai / … – ne šiame MVP].
Done: [kaip žinosime, kad veikia].
Kalba: LT UI tekstuose; kodas – aiškūs vardai.
Saugumas: raktų ne kode ir ne promptuose.
Prieš didesnį pakeitimą: failų planas → mano „taip“ → tada kodas.
```

**Planas prieš kodą – eskizas:**

```text
Prieš generuodamas kodą, surašyk:
1) kuriuos failus kurs/keisi,
2) ką laikysime Done,
3) ko neliesi (Won’t).
Lauk mano „taip“ – tada tik generuok.
```

### 5.3 Feature Doc trigger (ateityje)

Tik jei: progress-saved brief/packet (M9-like confirm), arba naujas ChoiceControl lab (3 kryptys) su Shell=Ne Pattern. Lentelės ir paprasti Shell – **be** naujo Feature Doc.

### 5.4 Žodynas (M16–18)

> JSON SOT: `glossary.json` / `glossary-en.json` (`moduleId` 16/18). Exact `term` match. **VSR** = Vibe → Skeleton → Refinement (brief fazės) — **≠** vertikalus pjūvis (M18). **Brief (MVP)** ≠ Brief@5 ≠ Brief (marketing)@13. Triage 3 zonos ≠ M7 MoSCoW 4 etiketės. Wire: 16.85 / 18.125 `itemGlossaryTerms`; 18.16 / 18.23 `unlockedGlossaryTerms`. GlossaryPage apibrėžimai visada skaitomi (GOLDEN §3.4d).

| Term (exact)                                      | Apibrėžimas (1 sakinys)                                                                                  | moduleId | Anchor         |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------- | -------------- |
| VSR                                               | Vibe → Skeleton → Refinement – brief brandinimo fazės; ne antras delivery kelias ir ne „vertical slice“. | 16       | 16.101         |
| Brief (MVP)                                       | Siauras `01_MVP_BRIEF.md` – kam, ką, Must/Won’t ir patikrinamas Done prieš Cursor build.                 | 16       | 16.21          |
| Triage (Būtina dabar / Galima vėliau / Nekuriame) | Trys apimties zonos MVP; mapinimas į Must / Should / Won’t brief laukuose.                               | 16       | 16.7 / 16.85   |
| Cursor                                            | DI kodavimo IDE – planuoji, redaguoji ir tikrini diff prieš commit; ne „parašyk visą app“ mygtukas.      | 16       | katalogas      |
| Vertikalus pjūvis                                 | Vienas paleidžiamas Must kelias / viena funkcija prieš platų „viską iš karto“ generavimą.                | 18       | 18.7           |
| BUILD PACKET                                      | Failų rinkinys prieš DI kodą: brief, flow, taisyklės ir Cursor promptas.                                 | 18       | 18.12 / 18.125 |
| PROJECT_RULES.md                                  | Trumpas (8–12 eil.) ribų failas Cursor sesijai: stack, Must/Won’t, Done, kalba, raktai.                  | 18       | 18.6 / 18.125  |
| Smoke                                             | Greita patikra: pasileidžia, UI/API atsako, pagrindinė fn veikia; 1 raudona = nestartuojame giliau.      | 18       | 18.16          |
| Diff ritualas                                     | Po DI pakeitimo: perskaityti diff → paleisti smoke → tada commit.                                        | 18       | 18.201 / 18.23 |
| Soft DoD                                          | Minkštas baigties kriterijus: GitHub + commit’ai, README, kritinės fn patikra, URL arba lokalus proof.   | 18       | 18.23          |
| Vibe debt                                         | Skola po greito DI generavimo be PACKET ir proof – veikia „kažkaip“, bet sunku taisyti ar perduoti.      | 18       | 18.14 / 18.23  |

**EN twin (`term`):** VSR · Brief (MVP) · Triage (Must now / Later / Won’t) · Cursor · Vertical slice · BUILD PACKET · PROJECT_RULES.md · Smoke · Diff ritual · Soft DoD · Vibe debt.

---

## 6. MUST / SHOULD / WON’T (turinio apimtis)

### MUST

- Artefaktų grandinė D1 → brief → PACKET → DoD
- Cursor-first build promptas M18
- Triage LT plain + mapinimas į Must/Won’t
- Viena ciklo schema
- `.env` + nerodyk rakto promptuose
- Soft DoD

### SHOULD

- Canonical dienos prioritetų pavyzdys
- 3 kryptys prieš brief
- Scoped 2–4 esybės
- `PROJECT_RULES.md`
- Planas → patvirtinimas → kodas
- Diff skaitymas prieš commit
- 3 spąstai (vibe debt lite)
- Auth / mokėjimai = Won’t pirmam MVP
- Optional 3 kodo signalai (NICE)

### WON’T (branduolys)

- DT/Lean/Agile teorija · įrankių mugė · Gamma · SysEng/wellness · Heroku-only · blue-green · M7 viz perkėlimas · „DI“=injekcija · pilnas SQL kursas · live minučių kaip LMS įstatymas · MCP kaip privaloma · Spec Kit CLI kursas · multi-agent tooling

---

## 7. Sinchronizacija

| Etapas                        | Būsena                                                                                                                |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Turinio SOT (šis failas)      | **Konsoliduotas + market SHOULD patch** 2026-07-26                                                                    |
| Parking lot (§8)              | **Un-parked 2026-08-01** (`M1618-D0`) – F1–F8 authoring                                                               |
| Intake RAW                    | Archyvas `docs/archive/development/intake/VIBE_CODING_INTAKE_2026-07.md`                                              |
| Skaidrių eilė `MODULIO_16_…`  | ✅ [`MODULIO_16_SKAIDRIU_EILES.md`](MODULIO_16_SKAIDRIU_EILES.md)                                                     |
| LT `modules.json`             | ✅ modules 16–18                                                                                                      |
| EN overlay                    | ✅ `modules-en-m16-m18` (`build:modules-en-m16-m18`)                                                                  |
| TE overlay / diagram registry | Must + Should + C2 ✅ 2026-08-01 (`DIAGRAMU_M16_M18_REGISTRY` + overlay); open Could = C1 park only (`TODO.md` §1.2g) |
| Core profiliai                | Netaikoma (M16+ authoring; be spill)                                                                                  |

---

## 8. Parking lot → un-parked (2026-08-01)

> **Un-parked:** product call „kitas kelias = Kodo inžinerija“ + capacity (`M1618-D0` ✅).
> Learning QA gates **CQ-M79-1/2** + **CQ-PORTAL** ✅ (archive 2026-07-28).
> Authoring F1–F8 ✅ 2026-08-01. Open: TE MoSCoW `TODO.md` §1.2g. Wave D3 corporate18 = Deferred §1.5.
> Ticketai: [`docs/development/16_17_18_backlog.md`](development/16_17_18_backlog.md).

### 8.1 Freeze

- Curriculum branduolys frozen: §0 sprendimai + §6 MUST/SHOULD/WON’T + market SHOULD patch.
- Nedaryti: naujų D1–D5 merge, MCP/Spec Kit reopen, M7 viz perkėlimo į M16–18.
- Leidžiama parked metu: tipografinės / terminologijos pataisos; **ne** naujos temos.

### 8.2 Un-defer gates (visi prieš eilės sprintą)

1. **CQ-M79-1** ir **CQ-M79-2** ✅ (2026-07-26; arba product override `TODO.md`).
2. **CQ-PORTAL** 48h retest ✅ (2026-07-27; archive Done snapshot).
3. Product call: „kitas kelias = Kodo inžinerija“ ✅ (2026-08-01).

Vartai uždaryti → F1–F8 authoring. JSON tik po F1–F3 eilės lock.

### 8.3 Future phases (checklist – historical; F1–F8 done)

> Statusas: F1–F8 ✅. Open teaching elements = `TODO.md` §1.2g. Wave D3 = §1.5. Live ticketai: [`16_17_18_backlog.md`](development/16_17_18_backlog.md).

Kai §8.2 true – eilė kaip `docs/MODULIO_13_SKAIDRIU_EILES.md` (uždaryta 2026-08-01):

| Phase | Owner         | Deliverable                                                                                              |
| ----- | ------------- | -------------------------------------------------------------------------------------------------------- |
| F1    | CURRICULUM    | `MODULIO_16_SKAIDRIU_EILES.md` iš §2 (~18–22 sk.; ID 16.x)                                               |
| F2    | CURRICULUM    | M17 Path Test outline (`MODULIO_17_*` arba tame pačiame faile); GOLDEN §3.4a1; temos §3.1                |
| F3    | CURRICULUM    | `MODULIO_18_SKAIDRIU_EILES.md` iš §4 (~22–28 sk.; Blokas A→B→C; pjauti D1/D2 overlap)                    |
| F4    | CONTENT       | LT copy + copyables (§5.2); tu; plain LT; be curriculum ID learner UI                                    |
| F5    | DATA          | LT `modules.json` + schema; EN overlay; `generate:core-data` N/A (M16+)                                  |
| F6    | DATA          | Cursor eilutė `tools.json` + `tools-en.json` + `audit:tools`                                             |
| F7    | SCHEME/CODING | Reuse process Shell / content-block; Feature Doc **tik** jei ChoiceControl A/B/C ar progress-saved brief |
| F8    | QA            | Path Test shell parity; footer/CTA; `TEST_REPORT` smoke kai kataloge                                     |

### 8.4 Explicit non-start while parked

- Ne `tools.json` Cursor iki F6.
- Ne TE registry / nauji `image` key iki F7 poreikio.
- Ne M19–21 SOT, kol F1–F3 nėra bent draftų.

---

## Appendix A – Intake žurnalas (santrauka)

| #    | Data       | Šaltinis                                             |
| ---- | ---------- | ---------------------------------------------------- |
| 1–11 | 2026-07-26 | PDF1–5 + testeris D1–D5 + koreliacijos → žr. archyvą |

---

## Appendix B – KILL / atmesta (ne branduolys)

Design Thinking · Lean Startup · Agile ceremonijos · Gamma prototipas · DeepSeek/Grok/… vaidmenų lentelės · 4 PM dokumentai (Dev Plan/Roadmap/TODO/Risk atskirai) · Q2–Q4 roadmap · spekuliatyvus 2040/AR · SysEng profesija · MVP kainų anekdotai · TOP 0.1% / HELL YEAH promptai · debug wellness · Heroku kaip vienintelis kelias · blue-green/CD kursas · coverage 80% · Rabbit Hole theater · morning_ses MD refaktor · promptas.lt CTA · M16–18 kaip viz kelias (viz = M7 optional) · MCP kaip privaloma · Spec Kit CLI kursas · auth / mokėjimai kaip pirmo MVP branduolys · multi-agent / Mission Control / Composer mastery kaip branduolys.
