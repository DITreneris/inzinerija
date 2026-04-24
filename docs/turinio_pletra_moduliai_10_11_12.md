# Turinio plėtra – Moduliai 10, 11, 12 (Agentų inžinerija)

> **Autorinė mokymo medžiaga © 2024–2026**  
> Šis dokumentas yra **turínio SOT** Agentų inžinerijos keliui (Moduliai 10–12). Papildo `turinio_pletra.md` ir modulius 1–9.  
> **Source of truth:** turinio semantika – šis failas; full redagavimo duomenų struktūra – `src/data/modules.json` po sinchronizacijos.  
> **Auditorija:** softo inžinieriai. **Įėjimui būtini** Moduliai 4–6 (Konteksto inžinerija). Žr. [docs/CONTENT_MODULIU_ATPAZINIMAS.md](CONTENT_MODULIU_ATPAZINIMAS.md) §6, [ROADMAP.md](../ROADMAP.md).

---

## 1. Apimtis ir tikslai (CURRICULUM)

### 1.1 Vieta kurse

| Moduliai 1–6                               | Moduliai 7–9                         | Moduliai 10–12                                         |
| ------------------------------------------ | ------------------------------------ | ------------------------------------------------------ |
| 6 blokų sistema, konteksto inžinerija, RAG | Duomenų analizės kelias              | **Agentų inžinerija** – DI kaip agentų sistemų kūrėjas |
| Teorija → Testas → Projektas (M4–M6)       | Teorija → Testas → Projektas (M7–M9) | Teorija (M10) → Testas (M11) → Projektas (M12)         |
| Bendras pamatas                            | Analitikai                           | **Softo inžinieriai**                                  |

**Prielaida:** Dalyvis baigė **Modulius 4–6** (konteksto inžinerija, RAG, žinių patikrinimas). Moduliai 10–12 fokusas: **agentų projektavimas, vykdymas, integracijos** – įrankiai, promptai, sistemos.

### 1.2 Mokymosi tikslai (po modulių 10–12)

- **Agentų sąvoka:** Suprasti, kas yra DI agentas (sistema, kuri atlieka žingsnius, naudoja įrankius, grąžina rezultatą); skirtumas nuo paprasto pokalbio su DI.
- **Agentų ciklas:** Žinoti ciklą: Steigti kontekstą → Gauti įvestį → Planuoti / vykdyti → Naudoti įrankius → Grąžtamasis ryšys → Rezultatas.
- **Įrankiai ir integracijos:** Suprasti, kaip DI gali naudoti įrankius (paieška, API, failai, skaičiuoklės); kada projektavime rinktis „agentas su įrankiais“ vs „vienas promptas“.
- **Promptų architektūra agentams:** Mokėti struktūruotai formuluoti sisteminius ir vartotojo promptus agentų sistemoms (rolė, apribojimai, žingsnių seka, klaidos tvarkymas).
- **Projektavimo gairės:** Žinoti, kada agentas padeda (sudėtingos užduotys, kelios veiklos, išoriniai duomenys) ir kada per daug (paprastas Q&A).
- **Testas (M11):** Patikrinti įsisavinimą prieš finalinį Agentų inžinerijos projekto modulį (M12).
- **Projektas (M12):** Sukurti vieną paruoštą agentų / automatizacijos artefaktą arba scenarijų (pvz. workflow su įrankiais, integracijos eskizas).

### 1.3 Ryšys su 6 blokais ir Moduliais 4–6

- **META:** Rolė „inžinierius, kuriantis DI agentų sistemas“; sisteminis principas (saugumas, ribos).
- **INPUT:** Duomenų šaltiniai, API, failai – nuoroda į Modulį 4 (RAG, šaltiniai); konteksto ribos (tokenai, 4.4).
- **OUTPUT:** Struktūruotas atsakymas, žingsnių ataskaita, klaidos pranešimai; „jei nepavyksta – grąžink aiškų priežasties pranešimą“.
- **Quality:** Žinių patikrinimas (4.6), haliucinacijų mažinimas – taikoma ir agentų išėjimams.

**Aiškus nuorodas (pirmose M10 skaidrėse):** „Konteksto ir šaltinių nurodymas – Modulyje 4; atsakymų tikrinimas – 4.6. Čia fokusas – agentų projektavimas, vykdymas ir integracijos.“

### 1.4 whyBenefit – „Kas man iš to?“ (pirmos skaidrės M10, M11, M12)

Pagal [docs/development/GOLDEN_STANDARD.md](development/GOLDEN_STANDARD.md) §4.1:

| Modulis | Skaidrė / tipas        | whyBenefit (tekstas į JSON)                                                                                          |
| ------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **10**  | action-intro (pirmoji) | Po šio modulio suprasi, kaip projektuoti DI agentus – nuo ciklo ir įrankių iki integracijų ir promptų architektūros. |
| **11**  | test-intro             | Po šio testo žinosi, ar esi pasiruošęs finaliniam Agentų inžinerijos projektui (Modulis 12).                         |
| **12**  | practice-intro         | Po projekto turėsi vieną paruoštą agentų arba automatizacijos scenarijų ir šablonus tolesniam darbui.                |

---

## 2. Agentų inžinerijos kelias – ką rasite (apžvalga)

**Skaidrė: Kelio apžvalga (10.1)**

- **Trumpai:** Tik **kelio žemėlapis** – ką modulyje rasite ir kokia tvarka. Išsamūs workflow terminai (trigger, action, condition, webhook ir kt.) – **tik skaidrėje 10.15**; čia jų **nebekartoti** (vengti dublio su 10.15).
- **Įrankiai:** Kokius įrankius DI gali naudoti (paieška, skaičiuoklės, API, failai); populiarios platformos (ChatGPT, Claude, Gemini – agentinės funkcijos).
- **Promptai:** Kaip rašyti sisteminius ir vartotojo promptus agentams (rolė, žingsniai, klaidos tvarkymas).
- **Sistemos:** Agentų ciklas (Steigti → Gauti įvestį → Vykdyti → Įrankiai → Grąžtamasis ryšys → Rezultatas).
- **Projektavimas:** Kada rinktis agentą, kada – paprastą promptą.
- **Vykdymas:** Kaip vykdomi žingsniai ir kaip apriboti rizikas.
- **Integracijos:** Trumpas įžvilgsnis – kaip agentas gali kreiptis į išorinius duomenis ir paslaugas.

**Kur pritaikyti:** Kai reikia automatizuoti kelis veiksmus (paieška + santrauka + ataskaita), naudoti išorinius duomenis arba įrankius – ne tik vieną atsakymą į klausimą.

### 2.1 Integracijos ir verslo automatizavimo įrankiai (papildomas skaitymas)

Verslo automatizavimas (workflow tarp sistemų) glaudžiai susijęs su agentų inžinerija: agentas naudoja įrankius ir integracijas (API, webhook). **Kodėl automatizacija:** produktyvumo augimas, mažesnė klaidų dalis, konkurencinis pranašumas. **3 jėgos:** technologijų branda (no-code, 7000+ integracijų, DI moduliai), ekonominis pranašumas (ROI 10–50×), organizacinis pasirengimas. **Įrankiai pagal segmentą:** Zapier – greitam startui; Make.com – lankstumas ir kaina; n8n – techninėms komandoms (open-source); Power Automate – Microsoft ekosistemai. **Išsamus gidas:** [docs/AUTOMATIZAVIMO_IRANKIAI_VERSLUI.md](AUTOMATIZAVIMO_IRANKIAI_VERSLUI.md) – kodėl automatizacija, workflow sąvokos (trigger, action, condition), įrankių palyginimas, 3A strategija (Automate 80 % / Augment 15 % / Autonomize 5 %), KPI ir įrankio pasirinkimo matrica.

---

## 3. Agentų ciklas ir architektūra

**Tikslas:** Vizualiai parodyti agentų veikimo ciklą – viena skaidrė su proceso diagrama.

**Turinys (skaidrė 10.2):**

- **Vienas sujungtas blokas „Kaip veikia agentas“:** DI agentas (1) gauna užduotį, (2) planuoja žingsnius, (3) naudoja įrankius (paieška, API, failai – jei platforma leidžia), (4) grąžina rezultatą su grįžtamuoju ryšiu. **Ciklas (ReAct stiliumi):** suprasti → pasirinkti įrankį → vykdyti → pagal rezultatą spręsti, ar kartoti, ar baigti. Skirtumas nuo paprasto pokalbio – agentas **savarankiškai** renkasi veiksmus ir gali kviesti išorinius įrankius.
- **Kada naudoti agentą (trumpai skaidrėje 10.2):** 3–4 bullet’ai + sakinys „Išsamiau ir su pavyzdžiais – skaidrė **10.5** (Kada rinktis agentą, kada paprastą promptą)“.

**Vizualizacija:** Proceso diagrama (React komponentas pagal [docs/development/SCHEME_AGENT.md](development/SCHEME_AGENT.md)) – pvz. Agent → Planavimas → Įrankiai → Aplinka → Rezultatas → Grįžtamasis ryšys. „Peržiūrėti pilname dydyje“ – tas pats React per EnlargeableDiagram.

**CopyButton:** **ne** dubliuoti ankstesnio „Trumpai“ paragrafo. Naudoti **užduotį DI**, pvz.: „Paaiškink savo žodžiais 4 žingsniais, kaip veikia DI agentas, ir vienu sakiniu – kuo jis skiriasi nuo vieno klausimo ir vieno atsakymo be įrankių.“

---

## 3a. Workflow, trigger, action, condition, webhook (skaidrė 10.15; apžvalga 10.1)

**10.1** – be sąvokų lentelės / ilgos prozos; nuoroda į **10.15**.

**Workflow** – automatizuotų veiksmų seka, kurią paleidžia **trigger**. Struktūra: **Trigger → Condition → Action**.

**Webhook** – realaus laiko duomenų perdavimas tarp sistemų (įvykis įvyksta → sistema iškviečia kitos sistemos adresą su duomenimis). Pvz.: apmokėjimas atliktas → webhook → pardavimų sistema atnaujina užsakymą.

**UI (GOLDEN_STANDARD §2.2) – skaidrė 10.15:** dauguma sekcijų **`brand`** arba **`terms`**; **`accent`** ne daugiau kaip **1–2** (pvz. vienas CTA arba paryškinimas). Venkti 8+ `accent` juostų iš eilės.

**Pagrindinės sąvokos (lentelė / sąrašas – skaidrė 10.15):**

| Sąvoka                 | Apibrėžimas                                                                    |
| ---------------------- | ------------------------------------------------------------------------------ |
| **Trigger**            | Įvykis, kuris paleidžia workflow (pvz. naujas el. laiškas, formos pateikimas). |
| **Action**             | Veiksmas, kurį atlieka sistema (pvz. siųsti laišką, įrašyti į CRM).            |
| **Condition**          | Sąlyga – kada vykdyti kitą žingsnį (pvz. jei vertė > 500 €).                   |
| **Integration**        | Ryšys tarp sistemų – API arba webhook.                                         |
| **API**                | Sistemų sąsaja – programinis būdas duomenims keistis.                          |
| **Polling**            | Tikrinimas kas X minučių – ar atsirado nauji duomenys.                         |
| **Error handling**     | Klaidų logika – ką daryti, kai žingsnis nepavyksta.                            |
| **Logs / Audit trail** | Veiksmų istorija – kas, kada, ką atliko.                                       |

**Pavyzdžiai:** (1) Formos pateikimas → trigger → įrašas į CRM (action); sąlyga – jei el. paštas validus. (2) PayPal apmokėjimas → webhook → pardavimų sistema atnaujina užsakymą.

---

## 3b. 3A strategija (skaidrė 10.25)

| Lygis          | Dalis | Aprašymas                                                                                    |
| -------------- | ----- | -------------------------------------------------------------------------------------------- |
| **AUTOMATIZE** | 80 %  | Taisyklėmis paremti srautai – be žmogaus sprendimo (pvz. forma → CRM → laiškas).             |
| **AUGMENT**    | 15 %  | Žmogus sprendžia, DI padeda (santraukos, klasifikacija, rekomendacijos).                     |
| **AUTONOMIZE** | 5 %   | DI agentai, RAG, kokybės kontrolė, eskalacija – sistema gali veikti autonomiškai su ribomis. |

**Taisyklė 80/15/5** – optimali vertės ir saugumo proporcija: didžioji dalis – paprasta automatizacija, maža dalis – žmogaus + DI, mažiausia – pilnai autonomiški agentai su žmogaus priežiūra.

**Kur pritaikyti:** Planuojant verslo automatizavimą – kurių procesų pakanka tik taisyklėms (80), kuriems reikia žmogaus patvirtinimo (15), kur galima leisti agentui veikti su ribomis (5).

---

## 3c. Verslo automatizavimo įrankiai (skaidrė 10.35)

**Skirtingi tipiniai srautai kiekvienam įrankiui** – vengti to paties „forma → CRM → laiškas → Slack“ kartojimo su 10.25 / 10.15.

**Zapier:** 7000+ integracijų (Gmail, Slack, Salesforce, Google Workspace). No-code, greitas startas, idealu mažoms komandoms. **Tipinis workflow (unikalus):** Naujas įrašas kalendoriuje (pvz. Calendly) → įrašas į Google Calendar → priminimo el. laiškas dalyviui. **Stiprybės:** milžiniška integracijų biblioteka, minimalus mokymosi laikas. **Silpnybės:** brangu didelėms apimtims, ribotas klaidų valdymas.

**Make.com:** Drag & drop vizualus kūrimas, sudėtingesnė logika nei Zapier, vidutinio dydžio verslui. **Pavyzdys:** Shopify užsakymas → atsargų lentelė → sąlyga „žema atsarga“ → pranešimas tiekėjui (el. paštas). **Stiprybės:** sąlygos, ciklai, duomenų transformacijos; geresnis nemokamas planas. **Silpnybės:** mokymosi kreivė, sunkiau valdyti daug scenarijų.

**n8n:** Atviro kodo (open-source), pilna kontrolė, duomenų vietos kontrolė. Tinka techninėms komandoms, daug API integracijų. **Pavyzdys:** Mokėjimo platformos webhook → patikra ir įrašas į vidinę DB → klaidos atveju į įspėjimų kanalą (Slack). **Stiprybės:** neriboti workflow, galima rašyti kodą, pažangus error handling. **Silpnybės:** reikia IT žinių, serverių administravimas.

**Power Automate:** Microsoft integracija – Excel, Teams, Outlook, SharePoint, Office 365. Tinka administracijai, pardavimams, projektų valdymui. **Pavyzdys:** Outlook + PDF → SharePoint → Teams → duomenų ištraukimas → Excel. **Stiprybės:** enterprise saugumas, integruotas licencijavimas. **Silpnybės:** ribota už Microsoft ekosistemos, priklausomybė nuo MS.

---

## 3d. Workflow specifikacija, testavimas, saugumas, įrankių medis (skaidrė 10.65)

**Standartinė workflow specifikacija (1 puslapis)** – kiekvienam lab'ui rekomenduojama vieno puslapio specifikacija:

| Blokas                        | Turinys                                                      |
| ----------------------------- | ------------------------------------------------------------ |
| **Trigger**                   | Kas paleidžia (įvykis, dažnumas).                            |
| **Input schema**              | Kokie laukai, formatai, privalomi/optional.                  |
| **Condition**                 | Sąlygos (pvz. jei laukas X > 500).                           |
| **Actions**                   | Žingsnių sąrašas (1, 2, 3…) su įrankiais.                    |
| **Output**                    | Ką gauname (įrašas CRM, laiškas, ticket).                    |
| **SLA, retries, rate limits** | Max laukimo laikas, kiek kartų bandyti, API limitai.         |
| **Error handling**            | Ką darom klaidos atveju (retry, alert, žmogaus eskalacija).  |
| **Audit log**                 | Ką fiksuojame ir kur (run_id, laikas, žingsnis, rezultatas). |

**Testavimo rinkinys (minimalus)** – 10 edge-case scenarijų prieš paleidžiant į „gyvą“ naudojimą: (1) tušti laukai (privalomi tušti), (2) neteisingas el. pašto formatas, (3) dublikatai (tas pats įrašas du kartus), (4) timeout (API neatsako laiku), (5) webhook duplikatai (tas pats webhook gaunamas du kartus), (6) specialieji simboliai / ilgas tekstas laukuose, (7) neleistinos reikšmės (pvz. ne skaičius ten, kur tikimasi skaičiaus), (8) trūkstami laukai (schema pasikeitė), (9) rate limit pasiektas (429), (10) autentifikacijos klaida (401/403). **Idempotency (paprasta kalba):** taisyklės, kad **tas pats veiksmas neįvyktų du kartus** dėl pasikartojančio webhook ar paspaudimo – pvz. unikalus užklausos ID; jei įrašas su tuo ID jau yra – atnaujinti, ne kurti naują.

**Saugumas ir atitiktis:** **PII taisyklės** – ką leidžiama siųsti į DI, ką maskuoti (vardas, pavardė, el. paštas – pagal GDPR ir įmonės politiką). **Access kontrolė** – kas gali redaguoti workflow (peržiūrėtojas, redaktorius, administratorius); API raktai – ne į kode, o secrets manager arba platformos saugykla. **Incident playbook (5 žingsniai):** (1) Sustabdyti workflow / atjungti integraciją, (2) Fiksuoti (log'ai, kas, kada, ką), (3) Įvertinti apimtį, (4) Pranešti (DPO, vadovui, jei reikia – valstybinėms), (5) Ištaisyti ir įdiegti apsaugas. **Human-in-the-loop:** kada privalomas žmogaus patvirtinimas – pvz. finansinės operacijos virš X sumos, asmens duomenų masinis eksportas.

**Įrankių pasirinkimo medis:** **JSON skaidrėje 10.65** – ne kartoti lentelę; trumpa nuoroda: „Žr. skaidrę **Įrankių pasirinkimas ir apribojimai (10.4)** – interaktyvi schema ir tekstas; išsamiau – **Automatizavimo įrankiai verslui**, §21.“

---

## 4. Content-block skaidrės (veiksmo skaidrės)

Schema pagal GOLDEN_STANDARD §3.2: Trumpai (accent) → Daryk dabar (brand) → Kopijuojamas promptas → Patikra (accent) → Optional (terms, collapsible).

### 4.1 Rolės ir sisteminio prompto šablonas (10.3)

**Trumpai:** Rolė nustato, kaip DI elgiasi – ir paprastame pokalyje, ir agentų sistemoje. Sisteminis promptas – kur nurodoma rolė, ribos ir principai.

**Daryk dabar:** Nukopijuok žemiau esantį promptą į savo DI įrankio „sisteminio nustatymo“ lauką (jei toks yra). Tada užduok vieną agentinę užduotį – pvz. „Ieškok [X] ir pateik santrauką su šaltiniais“.

**Kopijuojamas promptas (CopyButton):**

```
Tavo rolė – asistentas, kuris atlieka užduotis žingsnis po žingsnio.
Naudok įrankius (paieška, skaičiuoklės ir kt.), kai tai padės atsakymui.
Jei užduotis neaiški arba nepavyksta – parašyk trumpai kodėl ir ką reikėtų pataisyti.
Neišsivaizduok duomenų – jei reikia faktų, naudok paiešką arba parašyk „Nežinau“.
```

**Patikra:** Jei DI nepasinaudoja įrankiais, kai reikia – patikrink, ar platforma turi įjungtas agentines funkcijas (Browse, Tools). Jei atsakymas be šaltinių – paprašyk „pateik šaltinius“ arba nurodyk šaltinius įvestyje.

**Kur pritaikyti:** Bet kur, kur reikia ne tik vieno atsakymo, bet ir paieškos, skaičiavimų ar išorinių duomenų.

### 4.2 Įrankių pasirinkimas ir apribojimai (10.4)

**Trumpai:** Ne visi DI įrankiai turi tuos pačius įrankius. ChatGPT – Browse, DALL·E, skaičiuoklė; Claude – Tools; Gemini – paieška, „Workspace“. Nurodyk vartotojui, ką gali naudoti.

**Daryk dabar:** Atidaryk savo DI įrankio nustatymus ir pažymėk, kokius įrankius leidi (paieška, failai, API). Tada vienoje užduotyje aiškiai parašyk: „Naudok paiešką ir pateik šaltinius“.

**Kopijuojamas promptas (CopyButton):**

```
Užduotis: [APRAŠYK UŽDUOTĮ].
Naudok paiešką, kad rastum naujausią informaciją. Jei randi šaltinius – nurodyk juos atsakymo pabaigoje. Jei nerandi – parašyk „Nerasta“ ir trumpai paaiškink, ką ieškojai.
```

**Patikra:** Jei atsakymas be nuorodų – ar nurodei „naudok paiešką“? Ar įrankis įjungtas platformoje?

**Kur pritaikyti:** Tyrimai, faktų tikrinimas, naujienų santraukos.

### 4.3 Kada rinktis agentą, kada – paprastą promptą (10.5)

**Trumpai:** Agentas – kai užduotis sudėtinga (kelios veiklos, išoriniai duomenys, įrankiai). Paprastas promptas – kai vienas klausimas, vienas atsakymas, be išorinių įrankių.

**Daryk dabar:** Prieš rašant promptą, paklausk: „Ar reikia paieškos, failų ar kelių žingsnių?“ Jei taip – formuluok kaip agentinę užduotį (žingsniai, įrankiai). Jei ne – pakanka 6 blokų (META, INPUT, OUTPUT).

**Kopijuojamas promptas (CopyButton) – agentinė užduotis:**

```
Rolė: [ROLĖ]. Užduotis: (1) Ieškoti [X], (2) išrinkti 3–5 svarbiausius šaltinius, (3) parašyti santrauką lietuvių kalba su nuorodomis. Jei nerandi – parašyk „Nerasta“ ir kodėl.
```

**Patikra:** Jei gavai tik vieną pastraipą be šaltinių – peržiūrėk, ar užduotyje aiškiai nurodai „ieškoti“ ir „pateikti šaltinius“.

**Kur pritaikyti:** Sudėtingesni tyrimai, ataskaitos iš kelių šaltinių, automatizacija.

### 4.3a Agentinio prompto šablonas ir taisyklės (aiškiai apibrėžta)

**Šaltiniai:** Anthropic (Building Effective AI Agents), Agentic AI Cheatsheet – gerai suformuluoti promptai pagerina agento užduočių įvykdymą 40–60 % lyginant su paviršutiniškais nurodymais.

**Agentinio prompto šablonas (5 dalių):**

| #   | Dalis                       | Ką įrašyti                                                    | Pavyzdys                                                                                                    |
| --- | --------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| 1   | **Rolė**                    | Kas esi, kokių įgūdžių, kokios atsakomybės ir ribos           | „Tu esi [sritis] asistentas. Tavo rolė – [atsakomybės]. Turi prieigą prie [įrankių]. Ko nedaryti: [ribos].“ |
| 2   | **Užduotis žingsniais**     | Aiškūs nuoseklūs žingsniai – ką atlikti pirmiausia, ką paskui | „(1) Ieškoti [X], (2) išrinkti 3–5 šaltinius, (3) parašyti santrauką su nuorodomis.“                        |
| 3   | **Įrankiai / kada naudoti** | Kokius įrankius naudoti ir kada (paieška, API, skaičiuoklė)   | „Naudok paiešką naujausiems duomenims. Jei reikia skaičiavimų – naudok skaičiuoklę.“                        |
| 4   | **Išvesties formatas**      | Ką grąžinti (lentelė, sąrašas, kalba, šaltiniai)              | „Formatas: lentelė. Kalba: lietuvių. Šaltiniai: nurodyk kiekvienam faktui.“                                 |
| 5   | **Klaidos tvarkymas**       | Ką daryti, kai nepavyksta (trūksta duomenų, timeout)          | „Jei nerandi – parašyk „Nerasta“ ir kodėl. Neverk tuščio atsakymo.“                                         |

**Taisyklės:**

- **Būk aiškus:** Nurodyk žingsnius ir rezultatą, ne tik bendrą tikslą.
- **Įrankius nurodyk aiškiai:** Parašyk „naudok paiešką“, „pateik šaltinius“ – kitaip DI gali nepasinaudoti įrankiais.
- **Klaidos tvarkymas privalomas:** Bent vienas sakinys – ką grąžinti, kai užduotis nepavyksta.
- **Sisteminis promptas ne per ilgas:** Optimaliai iki ~1000 tokenų; detales laikyk išoriniame šaltinyje ar vartotojo prompte.
- **Ribos (guardrails):** Nurodyk, ko nedaryti (neišsivaizduoti duomenų, neleistinos veiklos).

**Patarimai:**

- **Žingsniai prieš veiksmus:** Prieš rašant promptą, išrašyk 3–5 žingsnių ranka – tada įformink į promptą.
- **Pavyzdys (few-shot):** Jei įmanoma, įdėk 1–2 pavyzdžius „panašios užduoties → kaip atlikti“ – tai sumažina klaidas.
- **Testuok su ribomis:** Patikrink, ar DI teisingai atsako, kai duomenų nėra arba timeout – klaidos tvarkymas turi veikti.

**Kopijuojamas pilnas šablonas (CopyButton):** žr. skaidrė **10.5** – sekcija „Agentinio prompto šablonas (5 dalių)“.

**Sekcija „Taisyklės ir patarimai“ (skaidrė 10.5):** JSON – `collapsible: true`, `collapsedByDefault: true` (ilgas tekstas pagal nutylėjimą suskleistas).

### 4.4 Klaidos tvarkymas ir ribos (10.6)

**Trumpai:** Agentas turi žinoti, ką daryti, kai kažkas nepavyksta (nėra duomenų, timeout, neleistinas veiksmas). Nurodyk ribas: ko nedaryti, ką grąžinti vietoj tuščio atsakymo.

**Daryk dabar:** Įklijuok copyable tekstą į sisteminį arba vartotojo promptą; tada užduok sąmoningai neįvykdomą užduotį (pvz. neegzistuojantis šaltinis).

**Kopijuojamas promptas (CopyButton):**

```
Jei užduoties atlikti negalima (trūksta duomenų, neleistinas veiksmas arba timeout): parašyk trumpą pranešimą „Nepavyko: [priežastis]“ ir pasiūlyk, ką vartotojas gali pataisyti. Neverk tuščio atsakymo.
```

**Patikra:** Ar DI grąžina „Nepavyko“ ir priežastį, o ne tuščią atsakymą? Jei nutyli – papildyk: „Jei negali – visada parašyk kodėl.“

**Kur pritaikyti:** Visose agentų sistemose – geresnė vartotojo patirtis ir saugesnis elgesys.

---

## 5. Žodynėlis (optional skaidrė arba collapsible)

Viena skaidrė arba collapsible „Nori suprasti detaliau?“ – 8–10 terminų:

| Terminas                 | Apibrėžimas (vienas sakinys)                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------ |
| **Agentas (DI)**         | Sistema, kuri atlieka užduotis žingsniais ir gali naudoti įrankius (paieška, API, failai). |
| **Įrankis (tool)**       | Funkcija, kurią DI gali iškviesti (pvz. paieška, skaičiuoklė, failo skaitymas).            |
| **Sisteminis promptas**  | Nustatymas „kas esi“ ir „kaip elgtis“ – matomas DI, ne vartotojui.                         |
| **Vartotojo promptas**   | Užduotis, kurią įveda vartotojas.                                                          |
| **Integracija**          | Ryšys tarp DI ir išorinių duomenų ar paslaugų (API, duomenų bazė).                         |
| **Vykdymas (execution)** | Žingsnių atlikimas – planavimas ir įrankių kvietimai.                                      |
| **Ribos (guardrails)**   | Taisyklės, ko agentas nedaro (pvz. neleistinos veiklos, privatumas).                       |
| **Klaidos tvarkymas**    | Ką grąžinti vartotojui, kai užduotis nepavyksta.                                           |
| **Trigger**              | Įvykis, kuris paleidžia workflow (pvz. naujas el. laiškas, formos pateikimas).             |
| **Action**               | Veiksmas, kurį atlieka sistema (pvz. siųsti laišką, įrašyti į CRM).                        |
| **Condition**            | Sąlyga – kada vykdyti kitą žingsnį (pvz. jei vertė > 500 €).                               |
| **Webhook**              | Realaus laiko duomenų perdavimas tarp sistemų (įvykis → API kvietimas).                    |

---

## 6. Modulio 10 santrauka (summary, 5 blokų modelis)

Pagal [.cursor/rules/content-agent-summary-slide.mdc](../.cursor/rules/content-agent-summary-slide.mdc):

| #   | Blokas               | Turinys                                                                                                                                                   |
| --- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Celebration Hero     | „Ką išmokote“ – Agentų ciklas, įrankiai, promptų architektūra, ribos. 3 statistikos: pvz. „1 ciklas“, „3 promptų šablonai“, „4 „Kur pritaikyti?“ taškai“. |
| 2   | Žinių kortelės       | Max 3: (1) Agentų ciklas ir įrankiai, (2) Rolė ir sisteminis promptas, (3) Kada agentas, kada paprastas promptas.                                         |
| 3   | Refleksijos promptas | Copyable; 3 klausimai (Apply, Analyze, Create) – kur pritaikysi agentą, kas buvo naujausia, ką išbandysi pirmiausia.                                      |
| 4   | Kitas žingsnis CTA   | „Pereikite prie Modulio 11: Žinių patikrinimas (Agentų kelias)“ – testas prieš projektą.                                                                  |
| 5   | Motyvacinis footer   | Tagline: „Agentas = žingsniai + įrankiai + ribos – jūsų pagrindas automatizacijai.“                                                                       |

**Pirmas veiksmas po modulio:** Šiandien atidaryk vieną DI įrankį su įjungtais įrankiais (paieška arba Tools) ir užduok vieną agentinę užklausą su „Naudok paiešką ir pateik šaltinius“.

---

## 7. Modulis 11 – Testas

### 7.1 test-intro

- **whyBenefit:** Po šio testo žinosi, ar esi pasiruošęs finaliniam Agentų inžinerijos projektui (Modulis 12).
- **duration:** ~10–12 min.
- **firstActionCTA:** Atsakyk į 8 klausimus – dalis su trumpa situacija; temos: agentų ciklas, įrankiai, promptai, workflow.
- **microWinPhrase:** „Kiekvienas teisingas atsakymas parodo, kad esi pasiruošęs projektuoti agentus.“
- **Slenksčiai:** ≥70 % – rekomenduojama pereiti prie Modulio 12 (projektas). &lt;70 % – peržiūrėk rekomenduojamas skaidres (remediation pagal klausimą).

### 7.2 test-section ir test-results

- **Klausimai:** 8 MCQ – šeši žinių klausimai ir du situaciniai (pvz. forma→Sheets→paštas; Augment su žmogaus patvirtinimu). Remediation – `relatedSlideId` į M10 skaidrę.
- **test-results:** passedMessage, failedMessage, **useCaseBlock** („Kur pritaikyti?“ – accent): pvz. „Agentų žinias gali pritaikyti: tyrimų automatizavimas, ataskaitų generavimas iš kelių šaltinių, įrankių naudojimas (paieška, API).“ thresholdExplanation: „Pasiekę ≥70 % parodėte, kad suprantate agentų ciklą ir promptus – galite pereiti prie projekto. &lt;70 % – rekomenduojame dar kartą peržiūrėti Modulio 10 skaidres.“

---

## 8. Modulis 12 – Praktika (finalinis projektas)

### 8.1 practice-intro

- **whyBenefit:** Po projekto turėsi vieną paruoštą agentų arba automatizacijos scenarijų ir šablonus tolesniam darbui. **Delivery-first:** 3 privalomi lab'ai (Automatize / Augment / Autonomize) su artefaktais.
- **duration:** ~20–30 min (vienam lab'ui); visiems 3 lab'ams – planuoti daugiau laiko.
- **firstActionCTA:** Pradėk dabar: pasirink **Lab #1, #2 arba #3** (arba vieną iš 4 papildomų scenarijų) ir atlik su artefaktais (workflow schema, laukų mappingas, test cases, logų screenshot'ai).
- **Projekto apžvalga:** **MUST** – 3 lab'ai (Lab #1 Form→CRM→Email→Slack, Lab #2 Laiškas→DI santrauka→approve→siuntimas, Lab #3 Atsiliepimai→sentiment→eskalacija→ticket). **SHOULD** – 4 papildomi scenarijai (Tyrimo agentas, Ataskaitos generatorius, Įrankių naudojimas, Klaidos tvarkymas) + galimybė savo temos.

### 8.2 Delivery-first: 3 privalomi lab'ai (MUST) + rekomenduojami scenarijai

**MUST – be šito mokymai nėra „delivery-first“.** Modulio 12 branduolys – **3 realūs lab'ai su rezultatu (artefaktais)**:

| #     | Lab                            | 3A lygis   | Trumpas aprašymas                                                                           | Artefaktai                                                                               |
| ----- | ------------------------------ | ---------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **1** | **Lab #1 „Automatize (80 %)“** | Automatize | Form → Sheets/CRM → Email → Slack/Teams (Zapier arba Make). Taisyklėmis paremti srautai.    | Workflow schema, laukų mappingas, test cases, logų screenshot'ai.                        |
| **2** | **Lab #2 „Augment (15 %)“**    | Augment    | Gautas laiškas → DI santrauka → žmogaus approve → išsiuntimas. Žmogus sprendžia, DI padeda. | Workflow schema, santraukos šablonas, approval žingsnio aprašymas, 1–2 test cases.       |
| **3** | **Lab #3 „Autonomize (5 %)“**  | Autonomize | Atsiliepimai → sentiment DI → eskalacija → ticket/užduotis. DI agentas + QA/eskalacija.     | Workflow schema, sentiment slenksčiai, eskalacijos taisyklės, incident playbook nuoroda. |

**Bendri artefaktai visiems lab'ams:** workflow schema (1 pusl.), laukų mappingas, test cases (min. 2), logų/screenshot'ai. Detalus aprašymas ir šablonai – [docs/AUTOMATIZAVIMO_IRANKIAI_VERSLUI.md](AUTOMATIZAVIMO_IRANKIAI_VERSLUI.md) §17.

**Rekomenduojami scenarijai (SHOULD – stiprina vertę),** jei laiko: Tyrimo agentas, Ataskaitos generatorius, Įrankių naudojimas, Klaidos tvarkymas ir ribos (taskFrame, scenario, template, instructions). Scenarijai įgyvendinami kaip **practice-scenario** skaidrės; 3 lab'ai – prioritetas (MUST), 4 scenarijai – papildomai (SHOULD).

### 8.3 practice-summary

- 5 blokų modelis: Celebration Hero, žinių kortelės (ką išmokote M12), refleksijos promptas, **Kitas žingsnis** („Pirmas veiksmas per 24–48 val.“ – pvz. pritaikyk vieną scenarijų savo projekte).
- **useCaseBlock:** „Kur pritaikyti?“ – tyrimai, ataskaitos, įrankių naudojimas, ribų nustatymas.
- **reflectionPrompt:** Copyable; 3 klausimai (Apply, Analyze, Create) + 1 patarimas.

---

## 9. User Journey – pastabos (įtrauktos į SOT)

- **Energija:** M10 pradžioje – hook (whyBenefit, firstActionCTA). Viduryje – content-block su CopyButton (micro-win). Santraukoje – „Kur pritaikyti?“ ir „Pirmas veiksmas po modulio“.
- **firstActionCTA (M10):** „Pasirink DI įrankį su įjungtais įrankiais (paieška arba Tools) ir per 1–2 min užduok vieną agentinę užklausą – pvz. ‚Ieškok [tema] ir pateik santrauką su šaltiniais‘.“
- **48 val. testas:** Po M10 – dalyvis atidaro DI įrankį ir atlieka vieną agentinę užklausą su šaltiniais. Po M12 – dalyvis pritaiko vieną scenarijų savo temai.

---

## 10. Nuorodos

- **Modulių atpažinimas:** [docs/CONTENT_MODULIU_ATPAZINIMAS.md](CONTENT_MODULIU_ATPAZINIMAS.md) §6.
- **Golden standard:** [docs/development/GOLDEN_STANDARD.md](development/GOLDEN_STANDARD.md).
- **Paprasta kalba:** [docs/development/PAPRASTOS_KALBOS_GAIRES.md](development/PAPRASTOS_KALBOS_GAIRES.md).
- **Santraukos 5 blokai:** [.cursor/rules/content-agent-summary-slide.mdc](../.cursor/rules/content-agent-summary-slide.mdc).
- **Skaidrių eilė (M10):** [docs/MODULIO_10_SKAIDRIU_EILES.md](MODULIO_10_SKAIDRIU_EILES.md) (sukuriamas DATA_AGENT / CONTENT_AGENT).
- **Delivery-first MUST/SHOULD:** [docs/AUTOMATIZAVIMO_IRANKIAI_VERSLUI.md](AUTOMATIZAVIMO_IRANKIAI_VERSLUI.md) §17–26.

---

## 11. Ką įtraukti papildomai: MUST / SHOULD / WANT (vietos moduliuose)

Ši lentelė nurodo, **kur** kiekvienas privalomas ar pageidaujamas elementas integruojamas (M10 teorija, M11 testas, M12 praktika arba referencinis dokumentas).

### MUST (be šito mokymai nėra „delivery-first“)

| Elementas                                     | Vieta                                                                                                   | Pastaba                                                                                                                                                                                     |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **3 realūs lab'ai su artefaktais**            | **M12** – 3 practice-scenario (Lab #1 Automatize, Lab #2 Augment, Lab #3 Autonomize)                    | §8.2. Artefaktai: workflow schema, laukų mappingas, test cases, logų screenshot'ai. Pilnas aprašymas: [AUTOMATIZAVIMO_IRANKIAI_VERSLUI.md](AUTOMATIZAVIMO_IRANKIAI_VERSLUI.md) §17.         |
| **Standartinė workflow specifikacija (1 p.)** | **M10** – nuoroda skaidrėje 10.4 arba 10.5 (įrankių / kada agentas); pilnas šablonas – ref. doc         | Trigger, input schema, condition, actions, output; SLA, retries, rate limits; error handling; audit log. Ref.: §18 to paties doc.                                                           |
| **Testavimo rinkinys (minimalus)**            | **M10** – optional skaidrė arba collapsible „Testavimas“ po 10.6; pilnas – ref. doc                     | 10 edge-case scenarijų (tušti laukai, neteisingas email, dublikatai, timeout, webhook duplikatai); idempotency taisyklė. Ref.: §19.                                                         |
| **Saugumo/atitikties mini-modulis**           | **M10** – viena skaidrė arba collapsible „Saugumas ir atitiktis“ (po 10.6 arba 10.7); pilnas – ref. doc | PII taisyklės (ką siųsti į LLM, ką maskuoti); access kontrolė (kas gali redaguoti workflow); incident playbook (5 žingsniai); kada privalomas „human-in-the-loop“. Ref.: §20.               |
| **Įrankių pasirinkimo sprendimų medis**       | **M10** – skaidrė 10.1 (kelio apžvalga) arba 10.4 (įrankių pasirinkimas); pilnas algoritmas – ref. doc  | Jei Office 365 heavy → Power Automate. Jei non-tech + greitai → Zapier. Jei sudėtinga logika + kaina → Make. Jei kontrolė + savihost → n8n. Jei enterprise governance → Workato. Ref.: §21. |

### SHOULD (stipriai pakelia vertę, mažina fail'ų skaičių)

| Elementas                              | Vieta                                                              | Pastaba                                                                                                                                 |
| -------------------------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| **ROI skaičiuoklės šablonas**          | **M12** practice-intro arba ref. doc                               | (Užduotys per savaitę) × (laikas) × (valandos kaina) – (įrankio kaina + priežiūra). 3 scenarijai: dabar / +3 mėn. / +12 mėn. Ref.: §22. |
| **Use case katalogas (20 pvz.)**       | Ref. doc; M10.1 arba santraukoje – nuoroda                         | Pardavimai, HR, finansai, klientų aptarnavimas, gamyba, e-komercija. Kiekvienam: trigger → actions → rizika → KPI. Ref.: §23.           |
| **Duomenų modeliavimas non-tech**      | **M10** – optional skaidrė arba collapsible; ref. doc              | Kas yra laukas, rekordas, ID, ryšiai; kodėl be ID atsiranda dublikatai (lab'o klaida #1). Ref.: §24.                                    |
| **Observability**                      | Ref. doc; M12 arba M10 – nuoroda                                   | Dashboard: kiek run'ų, kiek klaidų, top 5 fail step'ų; SLA matavimas į praktiką. Ref.: §25.                                             |
| **Promptų standartas automatizacijai** | **M10** – skaidrė su CopyButton (pvz. 10.3 arba atskira); ref. doc | Vienas „master prompt“ + 3 variantai (Zapier/Make/n8n): ką sugeneruoti (žingsniai, laukai, klaidos, testai). Ref.: §26.                 |

### WANT (galima vėlesniam išplėtimui)

- Papildomi M12 scenarijai (po 3 lab'ų); „Use case katalogas“ kaip atskiras resursas; observability dashboard šablonas; human-in-the-loop checklist išplėstas.
