# Rinkodaros planas – Promptų anatomija

> **Paskirtis:** Vienas rinkodaros dokumentas – auditorija, žinutės, kanalai, funnel (LinkedIn lead magnet → vieša Telegram grupė), monetizacija (Modulis 4 mokamai), integracijos ir MUST–SHOULD–WANT.
> **Šaltiniai:** `docs/VARTOTOJU_ATSILIEPIMAI_BENDRAS.md`, ROADMAP.md, modulių struktūra. **Atnaujinta:** 2026-02-18 (Telegram grupė, funnel, M4); 2026-02-25 (spin-off Nr. 2 SOT_Marketingas, LinkedIn postas numatytas 2026-02-25); 2026-03-01 (spin-off Nr. 3 Personalas – HR atrankos sistema).
> **Supersedes:** `docs/archive/marketing_plan.md`, `docs/archive/MARKETING_MUST_SHOULD_WANT.md`. Ankstesnė „tik funnel“ versija archyvuota: `docs/archive/MARKETING_FUNNEL_PLAN.md` (turinys sulietas čia). Ankstesnės versijos – lokaliai docs/archive/, ne repo.

---

## 1. Produkto santrauka

| Aspektas           | Turinys                                                                                         |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| **Pavadinimas**    | Promptų anatomija                                                                               |
| **Kas tai**        | DI (dialoginės inteligencijos) promptų inžinerijos mokymas – 6 blokų sistema, praktika, testas. |
| **Trukmė**         | ~45 min (3 moduliai MVP) arba 6 moduliai pilnai.                                                |
| **Formatas**       | Skaidrės + praktinės užduotys + žinių patikrinimas + apklausa.                                  |
| **Pozicionavimas** | Starter lygis – pradedantiesiems ir pusžaliams; „sistema nuo A iki Z“.                          |

**Stipriosios pusės (iš atsiliepimų):** aiški struktūra, loginis dėstymas, praktika ir testas, profesionalus tonas, tinka B2B kontekstui.

**Spin-off (funnel dalis):** (1) **Nr. 1** – [„8 promptų biblioteka“](https://www.promptanatomy.info/lt/) (~30 min). (2) **Nr. 2** – [„SOT_Marketingas“ – rinkodaros vadovo AI operacinė sistema](https://ditreneris.github.io/marketingas/) (~45–60 min, 10 promptų: turinys, lead'ai, metrikos). (3) **Nr. 3** – [„Personalas“ – HR kasdienė atrankos sistema](https://ditreneris.github.io/personalas/) (~30 min, 10 promptų: diagnostika, profilis, pritraukimas, atranka, pasiūlymas, išlaikymas). Visi pristato vertę ir nukreipia į pilną kursą ir viešą Telegram grupę. **LinkedIn:** antro spin-off postas numatytas **2026-02-25**. Žr. §6 „Spin-off kaip funnel dalis“.

---

## 2. Tikslinė auditorija (Target group)

### Pirminė (prioritetas #1)

| Segmentas                  | Aprašymas                                                                                            | Kodėl                                                                                            |
| -------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **Profesionalai 35–55 m.** | Vadovai, konsultantai, specialistai (marketingas, komunikacijos, HR, operacijos, projektų valdymas). | Vertina struktūrą ir sistemą; atsiliepimuose – „labai tvarkingai“, „dėstymas, praktika, testas“. |
| **B2B sprendžiantys**      | Įmonių vadovai, CMO, Head of Comms, Team Lead.                                                       | Gali įsigyti mokymus komandai; reikia aiškaus „kur pritaikyti“ ir verslo use-case.               |
| **Pradedantieji su DI**    | Žali ir pusžaliai – nori sistemos, ne chaoso.                                                        | „Beveik pasimokiau tuo pačiu“, aiškus kognityvinis balansas.                                     |

**Demografinė / rolė (agreguota):** marketingas, komunikacijos, HR, pardavimai, projektų valdymas, kvalitetas, operacijos, konsultantai, vadovai.

**Validacija (2026-02-18):** Testo dalyvių duomenys (sujungti 2026-02-13 ir 2026-02-18 – **132 asmenys**, dubliatų nėra) patvirtina auditoriją: ~40 % IT/Data/PM, ~25 % marketingas ir komunikacijos, ~20 % HR/lyderystė; aukštas vadovų lygis (Head/Manager, C-level, dėstytojai), Telia klasteris, Marketing+IT sankirta. Žr. `docs/VARTOTOJU_ATSILIEPIMAI_BENDRAS.md` §12; pilnas sąrašas – `dalyviu_sarasas.md` (neįkeliamas į GitHub).

**LinkedIn įrašo auditorija (2026-02-21):** Kas pamatė postą – ~61% Senior/Director/Manager/CXO, CEO+Founder ~4%, Vilnius 17.5%, IT 11.1% + Financial 5.2%; atitinka B2B ir patyrusius specialistus. Išsamiau – `docs/LinkedIn_audience_insights_2026-02-21.md`.

### Antrinė (prioritetas #2)

| Segmentas               | Aprašymas                                         | Rizika / galimybė                                                                                                          |
| ----------------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **25–35 m.**            | Jaunesni specialistai, norintys greito rezultato. | Vertina vertę, bet nori trumpesnio formato arba video; „tingi skaityti“ – reikia „Kur pritaikyti?“ ir trumpesnės versijos. |
| **Patyrę konsultantai** | Jau naudoja DI, nori gilinti.                     | Emocinis palaikymas; advanced lygio dar nėra – galimybė vėlesniam moduliui.                                                |

### Ką šiuo metu neprioritetuoti

- Tik „pažintį su DI“ be praktikos norintys (produktas jau praktiškai orientuotas).
- Auditorija, kuriai reikia tik 1 min video be mokymo (formato neatitikimas).

---

## 3. Žinutės (Messages)

### Vienas pagrindinis pranešimas

**„90 % žmonių rašo komandas neteisingai – čia išmoksi sistemą.“**

- **Problema:** Chaotiški promptai, nuspėjami rezultatai, laiko švaistymas.
- **Sprendimas:** 6 blokų sistema – Meta, Input, Output, Reasoning, Quality, Advanced.
- **Rezultatas:** Nuspėjami rezultatai, mažiau iteracijų, praktika realioms verslo situacijoms.

### Pagrindinė vertės proporcija (value proposition)

- **Starter lygis** – nuo A iki Z, be pertekliaus.
- **~45 min** – konkretus laiko įsipareigojimas.
- **3 (arba 6) moduliai** + praktika + testas + apklausa – pilnas mokymo ciklas.

### Pagal kanalą / segmentą

| Auditorija                    | Akcentas žinutėje                                                            |
| ----------------------------- | ---------------------------------------------------------------------------- |
| Vadovai / B2B                 | „Sisteminis mokymas – dėstymas, praktika, testas. Tinka komandos apmokymui.“ |
| Pradedantieji                 | „Išmokite 6 blokų sistemą – ne chaosas, o aiški struktūra.“                  |
| 25–35 m. / greitas rezultatas | „Pirmą rezultatą pamatysi per 30 sekundžių; pilnas kursas ~45 min.“          |

### Ko vengti

- Per techninės kalbos („LLM“, „tokenai“) – naudoti „DI“, „promptas“, „komanda“.
- Pažadų „viską išmoksi per 5 min“ – produktas apie sistemą, ne vieną triuką.

### Segmentuota B2B ir lead follow-up strategija

Lead follow-up ir outreach naudoja **segmentaciją A/B/C** ir **ne masinę komunikaciją**. Pilnas sąrašas ir A/B/C priskyrimas – `dalyviu_sarasas.md` (vietinis, neįkeliamas į GitHub).

| Segmentas                 | Apimtis      | Tikslas                      | Kontaktavimas                                                    |
| ------------------------- | ------------ | ---------------------------- | ---------------------------------------------------------------- |
| **A** – C-level / Head    | 10–15 žmonių | B2B pilotas                  | 15 min skambutis; klausimas: „Ar tai turi prasmė jūsų komandai?“ |
| **B** – middle management | 30–40 žmonių | Testimonial + intro į vadovą | 2–3 sakiniai atsiliepimo; ar gali rekomenduoti HR / vadovui.     |
| **C** – likusieji         | ~80–90       | Amplifikacija + beta         | Beta, apklausa; nenaudoti masinės komunikacijos.                 |

**3 skirtingi pitch'ai** (naudoti pagal rolę, ne vieną visiems):

| Adresatas     | Pitch                                                              |
| ------------- | ------------------------------------------------------------------ |
| **HR**        | „Komandos produktyvumas + AI kompetencijų standartizavimas.“       |
| **IT / Data** | „Efektyvesnis darbas su LLM, mažiau klaidų, aiškesnis kontekstas.“ |
| **Vadovams**  | „AI naudojimo disciplina + rizikų kontrolė.“                       |

_Principas: jei visiems siūlai tą patį – prarandi vertę._

---

## 4. Sistemos parengtumas rinkodarai

| Aspektas              | Būklė                                                               | Ką daryti prieš didesnę rinkodarą                                            |
| --------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **Produktas veikia**  | ✔ Sistema veikia; gyvuose testuose stabiliai.                       | Išspręsti žinomas klaidas (pvz. Modulio 2 – žr. TEST_REPORT).                |
| **Vertės aiškumas**   | ✔ „6 blokų sistema“, „~45 min“, praktika, testas.                   | Įvardinti „Starter lygis“ UI (badge arba vienas sakinys).                    |
| **„Kur pritaikyti?“** | ⚠ Trūksta.                                                          | Pridėti bent 1–2 moduliams – stiprina B2B ir jaunesnę auditoriją.            |
| **B2B argumentas**    | ⚠ Struktūra validuota, bet nėra vieno B2B pitch dokumento.          | Paruošti 1 puslapį / PDF: struktūra, praktika, testas, use-case.             |
| **Social proof**      | ⚠ Atsiliepimai yra, bet ne agreguoti „X žmonių išbandė“ ar citatos. | Surinkus apklausos duomenis – 1–2 agreguotos citatos ar skaičius (be vardų). |

**Išvada:** Galima ramiai pradėti rinkodarą (kvietimai, nuorodos, LinkedIn lead magnet). Prieš didesnę kampaniją – išspręsti kritines klaidas, pridėti „Starter“ žymę ir „Kur pritaikyti?“ bent pavyzdžiu.

---

## 5. Rinkodaros veiksmai (paprasti, pirmieji)

### Fase 1 – Dabar (be didelių išlaidų)

| Veiksmas                           | Aprašymas                                                                                                                                                                                                                                 |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **LinkedIn lead magnet**           | „Nemokami 3 moduliai“ – pritraukti susidomėjusius; CTA – gauti prieigą arba tiesiai į kursą.                                                                                                                                              |
| **Spin-off: 8 promptų biblioteka** | Dalintis nuoroda [promptanatomy.info/lt](https://www.promptanatomy.info/lt/) **gyvų mokymų metu** ir **LinkedIn** – nemokamas trumpas įrankis (~30 min), pritraukia naujus vartotojus ir nukreipia į pilną kursą ir viešą Telegram grupę. |
| **Spin-off: SOT_Marketingas**      | [ditreneris.github.io/marketingas](https://ditreneris.github.io/marketingas/) – rinkodaros vadovams (10 promptų: turinio sistema, repurpose, lead magnet, metrikos). **LinkedIn postas numatytas 2026-02-25.**                            |
| **Spin-off: Personalas**           | [ditreneris.github.io/personalas](https://ditreneris.github.io/personalas/) – personalo vadovams (10 promptų: diagnostika, profilis, pritraukimas, atranka, pasiūlymas, išlaikymas). Veikianti atrankos struktūra per ~30 min.            |
| **Nuorodos ir kvietimai**          | Siųsti testo nuorodą ir apklausą jau surinktai auditorijai; naudoti vieną pagrindinį pranešimą.                                                                                                                                           |
| **Vienas pagrindinis pranešimas**  | Visur: „90 % rašo neteisingai – čia išmoksi sistemą. 6 blokų mokymas ~45 min.“                                                                                                                                                            |
| **Kur skelbti**                    | LinkedIn (asmeninis profilis arba puslapis), el. paštas, vieša Telegram grupė – trumpas tekstas + nuoroda (į kursą arba į spin-off biblioteką).                                                                                           |

### Fase 2 – Po apklausos rezultatų / nurturing

| Veiksmas                         | Aprašymas                                                                                                             |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Social proof**                 | Agreguoti atsiliepimus (segmentai, 1–2 citatos be vardų arba „X iš Y rekomenduoja“) – įtraukti į landing / skelbimus. |
| **Starter žymė**                 | Pridėti į UI (HomePage arba modulių puslapį) – „Starter lygis“.                                                       |
| **B2B pitch**                    | Vienas puslapis: kam skirta, kas įeina, use-case, kontaktas.                                                          |
| **Nurturing (Telegram grupėje)** | Po prisijungimo prie grupės – trumpi pranešimai apie „kas toliau“, pasiūlymas Moduliui 4 (žr. §7).                    |

### Fase 3 – Vėliau (kai bus resursų)

| Veiksmas              | Aprašymas                                                                         |
| --------------------- | --------------------------------------------------------------------------------- |
| **„Kur pritaikyti?“** | Blokas po moduliu – tiesiogiai rinkodarai (B2B ir jaunesnė auditorija).           |
| **Trumpas video**     | 60–120 sek. „Kas yra 6 blokai“ arba vieno modulio įžanga – jaunesnei auditorijai. |
| **Reklama**           | Jei reikės – tik po stabilumo ir social proof.                                    |

---

## 6. Kanalai ir integracijos

| Kanalas                    | Naudojimas dabar                                                                                  | Integracija / pastaba                                                   |
| -------------------------- | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **LinkedIn**               | Lead magnet – „Nemokami 3 moduliai“; trumpi postai – problema, sprendimas (6 blokų sistema), CTA. | Rankiniu būdu Fase 1; Zapier (W5) kai mastelis didesnis.                |
| **Telegram (vieša grupė)** | Bendruomenė ir nurturing po funnel; pasiūlymas Moduliui 4 mokamai.                                | [Prisijungti prie grupės](https://t.me/prompt_anatomy).                 |
| **El. paštas**             | Kvietimai dalyviams, partneriams; pasiūlymai M4 (optional).                                       | **Brevo** (M5) – free 300/dieną.                                        |
| **Svetainė / nuoroda**     | Vienas aiškus CTA; po M3 – CTA į Modulį 4.                                                        | **GA4** (M5) + **UTM** nuorodose.                                       |
| **Apklausa**               | Po naudojimo – rezultatai analizei ir social proof.                                               | Google Forms – ok; Brevo automatas (S7) – apklausos nuoroda po modulio. |

Reklama (Google, Meta ir kt.) – ne pirmoje fazėje; pirmiausia organinis pasiekiamumas, lead magnet ir atsiliepimų surinkimas.

**Integracijų prioritetai:** žr. §9 (M5 Brevo, GA4, UTM; S7 Brevo formos/automatas; W5 Zapier ir kt.).

### Spin-off kaip funnel dalis

**Nr. 1 – [8 promptų biblioteka](https://www.promptanatomy.info/lt/)** – „Leisk DI atlikti 30–50% tavo kasdienių užduočių“. 8 pratimai (~30 min), kopijuoti → ChatGPT/Claude → [ĮMONĖ], [MANO ROLĖ]. Vertė: 3–5 val/savaitę, mažiau klaidų, aiškesnis kontekstas. CTA į viešą Telegram grupę ir pilną kursą.

**Nr. 2 – [SOT_Marketingas](https://ditreneris.github.io/marketingas/)** – „Rinkodaros vadovo AI operacinė sistema“. 10 promptų (~45–60 min): 30 d. turinio sistema, repurpose (1 insight → 7 formatai), LinkedIn postai, 30s video scenarijus, metrikos → sprendimai, objection handling, lead magnet + DM seka, case study, MASTER prompt. Plan → Kurk → Distribuok → Matuok → Spręsk. **LinkedIn postas numatytas 2026-02-25.**

**Nr. 3 – [Personalas](https://ditreneris.github.io/personalas/)** – „HR kasdienė atrankos sistema – personalo vadovui“. 10 promptų (~30 min): 6 fazės – Diagnostika, Profilis, Pritraukimas, Atranka, Pasiūlymas, Išlaikymas. Sprendžia: nulinis srautas, netinkami kandidatai, lėtas tempas, prarandami talentai. Veiksmų fokusas, paprasta kalba.

**Funnel rolė:** Visi trys pritraukia naujus vartotojus; po spin-off – natūralus žingsnis į pilną 6 blokų kursą ir Modulį 4.

| Kur naudoti      | Kaip                                                                                                                                                                                                                                                                                                                             |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Gyvi mokymai** | Dalintis spin-off nuorodas – biblioteka (bendram kontekstui), SOT_Marketingas (rinkodaros auditorijai), **Personalas** (HR / personalo vadovams).                                                                                                                                                                                |
| **LinkedIn**     | Nr. 1 – postai su nuoroda į biblioteką; Nr. 2 – **postas 2026-02-25** su nuoroda į [marketingas](https://ditreneris.github.io/marketingas/); Nr. 3 – postai HR auditorijai su nuoroda į [personalas](https://ditreneris.github.io/personalas/). CTA – išbandyti, prisijungti prie Telegram grupės, toliau – 3 nemokami moduliai. |

Nuorodos: **https://www.promptanatomy.info/lt/** | **https://ditreneris.github.io/marketingas/** | **https://ditreneris.github.io/personalas/**

---

## 7. Funnel ir monetizacija (Modulis 4 mokamai)

### Funnel etapai

| Etapas            | Kas vyksta                                                                                                                                                                                                                 | Kur matuoti (jei įmanoma)                          |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| **1. Awareness**  | LinkedIn turinys (postai, lead magnet); **spin-off Nr. 1** – biblioteka (gyvu mokymu + LinkedIn); **spin-off Nr. 2** – SOT_Marketingas (LinkedIn postas **2026-02-25**); **spin-off Nr. 3** – Personalas (HR auditorijai). | Paspaudimai, pasidalinimai; spin-off apsilankymai. |
| **2. Lead**       | Vartotojas duoda el. paštą / registruojasi arba eina tiesiai į nemokamus 3 modulius.                                                                                                                                       | Registracijų skaičius, prieigos atidarymai.        |
| **3. Nurturing**  | Prieiga prie Modulių 1–3; nuoroda į viešą Telegram grupę („Prisijunk prie bendruomenės“).                                                                                                                                  | Užbaigę M1/M2/M3; prisijungę prie Telegram grupės. |
| **4. Pasiūlymas** | Telegram grupė + (optional) el. paštas: pasiūlymas įsigyti **Modulį 4** (konteksto inžinerija, RAG, haliucinacijos).                                                                                                       | Konversijos į mokamą Modulį 4.                     |

### Kada pasiūlyti Modulį 4

- Po **Modulio 3 užbaigimo** (arba po 1 dalies santraukos peržiūros) – vartotojas jau įvaldė 6 blokų pagrindus.
- Alternatyva: po **prisijungimo prie Telegram grupės** – trumpa serija (1–2 pranešimai) apie „kas toliau“, tada pasiūlymas Moduliui 4.

### Kaip pozicionuoti Modulį 4

- **Vertė:** „Gilinimas“ – konteksto inžinerija, RAG, Deep research, kaip vengti haliucinacijų ir tikrinti šaltinius. Tinka verslo analizei, ataskaitoms, saugiam darbui su DI.
- **Sąsaja su atsiliepimais:** Vartotojai vertina struktūrą ir „ką toliau“; „Kur pritaikyti?“ (M5 turinys) palaiko pasiūlymą – pabrėžti use-case (verslo sprendimai, šaltinių patikimumas).

### Kur pasiūlyti

| Vieta                                | Formatuoti pasiūlymas                                                                   |
| ------------------------------------ | --------------------------------------------------------------------------------------- |
| **Telegram grupė**                   | Trumpas pranešimas: kas yra Modulis 4, kodėl naudinga po 1–3, nuoroda į mokamą prieigą. |
| **Po M3 completion (svetainėje)**    | CTA: „Toliau – Modulis 4: Konteksto inžinerija“ – nuoroda į landinį arba apmokėjimą.    |
| **El. paštas (jei renkami adresai)** | 1–2 laiškai: „Ką išmokote (1–3)“ ir „Modulis 4 – kitas žingsnis“ su nuoroda.            |

### Tekstų pavyzdžiai (skeleton)

- **Telegram grupė:** „Sveiki! Jei jau peržiūrėjote 3 modulius – kitas žingsnis – Modulis 4: konteksto inžinerija, RAG ir kaip saugiai naudoti šaltinius. [nuoroda].“
- **CTA po M3:** „Įvaldėte 6 blokų pagrindus. Toliau – Modulis 4: kaip valdyti kontekstą ir vengti klaidų. [Pradėti Modulį 4].“

---

## 8. Sekti (metrikos)

| Metrika                                | Kaip                                                                      | Tikslas (pirmasis etapas)                                                |
| -------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **Apsilankymai**                       | GA4 (M5) + UTM nuorodose (`?utm_source=linkedin&utm_medium=lead_magnet`). | Suprasti, ar kvietimai / lead magnet veikia.                             |
| **Lead'ai iš LinkedIn**                | Registracijos / paspaudimai į lead magnet.                                | Kiek susidomėjusių pereina į prieigą.                                    |
| **Prisijungimai prie Telegram grupės** | Grupės narių skaičius; nauji nariai po lead magnet.                       | Nurturing ir pasiūlymo pasiekiamumas.                                    |
| **Užbaigę modulius (M1–M3)**           | Progresas (localStorage / GA4 events).                                    | Kiek žmonių baigia bent 1 modulį; M3 completion – trigger pasiūlymui M4. |
| **Konversijos į mokamą M4**            | Apmokėjimai arba landingo konversijos.                                    | Monetizacijos efektas.                                                   |
| **Apklausos atsakymai**                | Google Forms.                                                             | Segmentai, NPS arba rekomendacija, citatos.                              |
| **El. pašto metrikos**                 | Brevo (M5) – atidarymai, paspaudimai.                                     | Matuoti kvietimų / laiškų efektyvumą.                                    |
| **Klaidos**                            | TEST_REPORT.md, vartotojų pranešimai.                                     | Išspręsti kritinius trūkumus prieš mastelio rinkodarą.                   |

_Integracijų detalės – žr. §9 (M5, S7, W5)._

---

## 9. Rinkodaros MUST–SHOULD–WANT (integracijos ir veiksmai)

### Integracijos ir įrankiai

| Lygis           | Įrankiai                                      | Išlaidos | Kada                         |
| --------------- | --------------------------------------------- | -------- | ---------------------------- |
| **MUST (M5)**   | Brevo, GA4, UTM nuorodos                      | 0€       | Fase 1                       |
| **SHOULD (S7)** | Brevo formos, automatas (apklausa po modulio) | 0€       | Fase 2                       |
| **WANT (W5)**   | Buttondown, Plausible/Fathom, Zapier          | mokama   | Fase 3 / didesniam masteliui |

### MUST (būtina – prieš didesnę rinkodarą)

| #   | Veiksmas                                     | Iš kur / kodėl                                                                                                |
| --- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| M1  | **Išspręsti kritines klaidas**               | TEST_REPORT.md – vartotojai nebaigia dėl klaidų.                                                              |
| M2  | **Vienas pagrindinis pranešimas visur**      | „90 % rašo neteisingai – čia išmoksi sistemą. 6 blokų mokymas ~45 min.“ – kvietimuose, LinkedIn, el. pašte.   |
| M3  | **Aiškus vienas CTA**                        | Svetainėje / nuorodoje – vienas aiškus veiksmas („Pradėti mokymą“ arba „Išbandyti“).                          |
| M4  | **Nesiųsti didelės kampanijos be stabilumo** | Ramus startas – kvietimai, lead magnet, vieša Telegram grupė; reklama – tik po M1 ir social proof.            |
| M5  | **Integracijos Fase 1 (0€)**                 | **Brevo** – el. pašto kvietimai (free 300/dieną); **GA4** – apsilankymai; **UTM** – nuorodose. Tech ~2–3 val. |

### SHOULD (pageidaujama – Fase 1–2, artimiausi 1–2 mėn.)

| #   | Veiksmas                                 | Iš kur / kodėl                                                                                      |
| --- | ---------------------------------------- | --------------------------------------------------------------------------------------------------- |
| S1  | **Starter lygio žymė UI**                | Vertės aiškumas – vienas sakinys arba badge: „Starter lygis – nuo A iki Z“.                         |
| S2  | **Social proof po apklausos**            | Agreguoti atsiliepimus: 1–2 citatos (be vardų) arba „X iš Y rekomenduoja“.                          |
| S3  | **B2B pitch vienas puslapis**            | PDF arba puslapis: kam skirta, kas įeina (struktūra, praktika, testas), use-case, kontaktas.        |
| S4  | **„Kur pritaikyti?“ bent 1–2 moduliams** | Stiprina B2B ir 25–35 m. segmentą.                                                                  |
| S5  | **Metrikų sekimas**                      | Apsilankymai (UTM), užbaigę bent 1 modulį, apklausos atsakymai – užfiksuoti ir peržiūrėti.          |
| S6  | **Kvietimų naudojimas**                  | Siųsti testo + apklausos nuorodas esamai auditorijai – tekstai paruošti.                            |
| S7  | **Brevo formos ir automatizacija**       | Embed forma svetainėje (lead rinkimas); automatas: dalyvis baigė modulį → apklausos nuoroda po 2 d. |

### WANT (norima – Fase 3 arba kai bus resursų)

| #   | Veiksmas                                | Iš kur / kodėl                                                                                      |
| --- | --------------------------------------- | --------------------------------------------------------------------------------------------------- |
| W1  | **„Kur pritaikyti?“ visiems moduliams** | Blokas po kiekvienu moduliu.                                                                        |
| W2  | **Trumpas video 60–120 s**              | „Kas yra 6 blokai“ arba vieno modulio įžanga – jaunesnei auditorijai.                               |
| W3  | **Reklama (Google, Meta ir kt.)**       | Tik po stabilumo (M1), social proof (S2) ir pirmų metrikų.                                          |
| W4  | **Atnaujinti planą po 1–2 mėn.**        | Pagal apsilankymus, užbaigimus, apklausos rezultatus – įrašyti į VARTOTOJU_ATSILIEPIMAI_BENDRAS.md. |
| W5  | **Pažangesnės integracijos**            | Buttondown (>500 prenumeratoriai); Plausible/Fathom; Zapier newsletter→LinkedIn.                    |

### Santrauka pagal fazes

| Faze                                  | MUST  | SHOULD         | WANT  |
| ------------------------------------- | ----- | -------------- | ----- |
| **Dabar (Fase 1)**                    | M1–M5 | S1, S5, S6     | –     |
| **Po apklausos / nurturing (Fase 2)** | –     | S2, S3, S4, S7 | –     |
| **Vėliau (Fase 3)**                   | –     | –              | W1–W5 |

---

## 10. Santrauka ir kiti žingsniai

- **Target group:** pirminė – profesionalai 35–55 m., B2B sprendžiantys, pradedantieji su DI; antrinė – 25–35 m. (reikia trumpesnio formato / „Kur pritaikyti?“).
- **Žinutė:** „90 % rašo neteisingai – čia išmoksi sistemą. 6 blokų mokymas ~45 min.“
- **Funnel:** LinkedIn lead magnet (3 nemokami moduliai) → prieiga / registracija → vieša Telegram grupė → nurturing → pasiūlymas Moduliui 4 mokamai.
- **Sistema:** pakanka ramiam startui; prieš didesnę rinkodarą – išspręsti žinomas klaidas, Starter žymė, B2B pitch, social proof iš apklausos.
- **Prioritetai pagal LinkedIn auditorijos duomenis (Kiss–Marry–Kill):** žr. `docs/LinkedIn_audience_insights_2026-02-21.md`.
- **Integracijos Fase 1 (M5):** Brevo + GA4 + UTM – 0€, ~2–3 val. setup.

**Kiti žingsniai:**

1. Įdiegti M5 integracijas (Brevo, GA4, UTM).
2. Naudoti LinkedIn lead magnet ir siųsti nuorodas į viešą Telegram grupę.
3. Surinkus apklausos duomenis – agreguoti ir įrašyti į `VARTOTOJU_ATSILIEPIMAI_BENDRAS.md`, ištraukti 1–2 citatas/skaičių.
4. Atnaujinti šį planą po 1–2 mėn. pagal rezultatus (žr. W4).

---

## Nuorodos

- **Vartotojų atsiliepimai:** `docs/VARTOTOJU_ATSILIEPIMAI_BENDRAS.md` (§11 – funnel ir monetizacija).
- **Klaidos ir sprendimai:** `docs/development/TEST_REPORT.md`.
- **Turinio SOT (Modulis 4):** `docs/turinio_pletra_moduliai_4_5_6.md`.
- **ROADMAP:** `ROADMAP.md` – „User feedback“, iteruoti pagal duomenis.
- **Archyvas (superseded):** `docs/archive/marketing_plan.md`, `docs/archive/MARKETING_MUST_SHOULD_WANT.md`.
