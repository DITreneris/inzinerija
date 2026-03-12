# Automatizavimo įrankiai verslui

> **Išsamus automatizavimo sprendimų gidas šiuolaikinio verslo poreikiams.**  
> Papildomas skaitymas, susijęs su **Moduliais 10–12 (Agentų inžinerija)** – integracijos, workflow, įrankių pasirinkimas. SOT modulių turiniui: [docs/turinio_pletra_moduliai_10_11_12.md](turinio_pletra_moduliai_10_11_12.md).

---

## 1. Įvadas

Šiame gide – kodėl verslui reikia automatizacijos, kokios jėgos ją spartina, pagrindinės sąvokos (trigger, action, workflow, webhook) ir įrankių palyginimas (Zapier, Make.com, n8n, Power Automate). Taikoma tiek agentų inžinerijos kontekstui (M10–12), tiek platesniam verslo automatizavimo planavimui.

---

## 2. Kodėl automatizacija tapo būtinybe?

### 2.1 Drastiškas produktyvumo augimas

- **Rankinio darbo sumažinimas iki 70 %**
- Daugiau laiko strategijai
- Mažiau rutinos

### 2.2 Kokybė ir tikslumas

- Mažėja klaidų skaičius
- Nuoseklus kokybės lygis

### 2.3 Konkurencinis pranašumas

- Mažos komandos veikia kaip didelės
- Greitesnė reakcija į rinkos pokyčius
- Aukštesnė paslaugų kokybė

---

## 3. 3 jėgos, kurios spartina automatizavimą

### 3.1 Technologijų branda

- No-code / low-code platformos
- 7000+ integracijų ekosistemos
- Įtaisyti DI moduliai: RAG, ML, Copilot ir kt.

### 3.2 Ekonominis pranašumas

- Vienos užduoties kaina: &lt; 1 €
- ROI: 10–50× sutaupytos valandos
- Greitai atsiperkančios investicijos

### 3.3 Organizacinis pasirengimas

- Auga vadovų DI raštingumas
- Komandų atvirumas
- Eksperimentavimo kultūra
- Sėkmės istorijos

**Paprastas automatizavimas:** PRINT SCREEN → CHATGPT → IŠANALIZUOK

---

## 4. Zapier

### 4.1 Aprašymas

- 7000+ integracijų (Gmail, Slack, Salesforce, Google Workspace ir kt.)
- No-code sprendimas
- Idealu mažoms komandoms
- Greitas startas

### 4.2 Tipinis workflow

Naujas klientas (Google Forms) → Įrašas CRM → Personalizuotas laiškas → Slack pranešimas komandai

### 4.3 Stiprybės

- Milžiniška integracijų biblioteka
- Minimalus mokymosi laikas
- Patikimumas
- Dokumentacija + bendruomenė

### 4.4 Silpnybės

- Brangu didelėms apimtims
- Ribotas klaidų valdymas
- Sulėtėja sudėtinguose workflow
- Ribotas duomenų apdorojimas

### 4.5 AI promptas

„Sukurk workflow: Google Forms → Sheets → Gmail → Slack su kliento prioritetu.“

---

## 5. Workflow ir Webhook

**Workflow** – automatizuotų veiksmų seka, paleidžiama trigger.  
Struktūra: **Trigger → Condition → Action**

**Webhook** – realaus laiko duomenų perdavimas tarp sistemų.  
Pvz.: PayPal apmokėjimas → webhook → pardavimų sistema

---

## 6. Pagrindinės sąvokos

| Sąvoka | Apibrėžimas |
|--------|-------------|
| **Trigger** | Įvykis, kuris paleidžia workflow (pvz. naujas el. laiškas, formos pateikimas). |
| **Action** | Veiksmas, kurį atlieka sistema (pvz. siųsti laišką, įrašyti į CRM). |
| **Condition** | Sąlyga – kada vykdyti kitą žingsnį (pvz. jei vertė &gt; 500 €). |
| **Integration** | Ryšys tarp sistemų – API arba webhook. |
| **API** | Sistemų sąsaja – programinis būdas duomenims keistis. |
| **Polling** | Tikrinimas kas X minučių – ar atsirado nauji duomenys. |
| **Error handling** | Klaidų logika – ką daryti, kai žingsnis nepavyksta. |
| **Logs / Audit trail** | Veiksmų istorija – kas, kada, ką atliko. |

---

## 7. Praktinis pavyzdys (gamybos įmonė)

Workflow turi turėti:

- **Trigger** – nauja užsakymo forma
- **Condition** – jei vertė &gt; 500 €
- **Action** – ERP įrašas + gamybos užduotis
- **Integration** – ERP + sandėlis + el. paštas

**Reikalavimas:** Aiškus, vizualus workflow aprašymas.  
**Rekomendacija:** ChatGPT – procesui; Claude – vizualizacijai.

---

## 8. Make.com

### 8.1 Charakteristikos

- Drag &amp; drop vizualus kūrimas
- Sudėtingesnė logika nei Zapier
- Vidutinio dydžio verslui

### 8.2 E-komercijos pavyzdys

Shopify → DB → atsargos → tiekėjai → logistika

### 8.3 Privalumai

- Sąlygos, ciklai, duomenų transformacijos
- Geresnis nemokamas planas

### 8.4 Silpnybės

- Mokymosi kreivė
- Sunkiau valdyti daug scenarijų

### 8.5 AI užduotis

Užsakymo forma → duomenų patikra → Sheets → el. paštas vadovui → PDF užduotis → Drive

---

## 9. n8n

### 9.1 Open-source

- Pilna kontrolė
- Duomenų vietos kontrolė
- Saugumo lankstumas

### 9.2 DI agentų palaikymas

- Custom nodes
- AI integracijos

### 9.3 Tinka

- Techninėms komandoms
- Daug API integracijų

### 9.4 Sentimentų analizės pavyzdys

CRM + atsiliepimai → sentimentų analizė → ataskaita → kokybės užduotis

### 9.5 Privalumai

- Neriboti workflow
- Galima rašyti kodą
- Enterprise auditas, monitoringas
- Pažangus error handling

### 9.6 Silpnybės

- Reikia IT žinių
- Serverių administravimas
- Sudėtinga su labai dideliais failais

### 9.7 AI promptas

„Jei &lt; 3 žvaigždutės → sentimentų DI → santrauka → užduotis komandai“

---

## 10. Power Automate

### 10.1 Microsoft integracija

Excel, Teams, Outlook, SharePoint, Office 365

### 10.2 Tinka

- Administracijai
- Pardavimams
- Projektų valdymui

### 10.3 Pavyzdys

Outlook + PDF → SharePoint → Teams → duomenų ištraukimas → Excel

### 10.4 Privalumai

- Enterprise saugumas
- Integruotas licencijavimas
- Sklandus veikimas

### 10.5 Silpnybės

- Ribota už MS ribų
- Sudėtingiau nei Make / n8n
- Priklausomybė nuo MS

### 10.6 AI promptas

„Outlook + PDF → SharePoint → Teams → Excel su laiko žyma“

---

## 11. 3A strategija

| Lygis | Dalis | Aprašymas |
|-------|-------|-----------|
| **AUTOMATIZE** | 80 % | Taisyklėmis paremti srautai |
| **AUGMENT** | 15 % | Žmogus sprendžia, DI padeda (santraukos, klasifikacija) |
| **AUTONOMIZE** | 5 % | DI agentai, RAG, QA kontrolė, eskalacija |

**Taisyklė 80/15/5** – optimali vertės ir saugumo proporcija.

---

## 12. Verslo automatizavimo kelrodis

Įrankiai pagal segmentą:

- **Zapier** – greitam startui
- **Make.com** – lankstumas + kaina
- **n8n** – techninėms komandoms
- **Power Automate** – Microsoft ekosistemai
- **Workato** – enterprise masteliui

---

## 13. Transformacijos nauda

- Mažiau rutinos
- Daugiau kūrybos
- Geresnė klientų patirtis
- Konkurencinis pranašumas

---

## 14. Veiksmų planas

1. **Šią savaitę:** Identifikuoti 10 užduočių; apskaičiuoti laiką; įvertinti potencialą.
2. **1–3 mėn.:** Pasirinkti įrankį; 1–2 paprasti srautai; ROI matavimo sistema.
3. **Kiti 3 mėn.:** Duomenų procesai; Centre of Excellence; integracija į strategiją.

**Tikslas:** Automatizavimas kaip konkurencinis pranašumas.

---

## 15. KPI ir vertės matavimas

5 grupės:

- **Našumas:** Sutaupytos valandos, % automatizuotų užduočių
- **Kokybė:** Klaidų dažnis, žmogaus peržiūros santykis
- **Greitis:** Apdorojimo trukmė, SLA %
- **Finansai:** Kaina per 1000 veiksmų, aptarnavimo savikaina
- **Rizika:** Incidentai, duomenų nutekėjimas (0)

---

## 16. Įrankio pasirinkimo matrica

5 kriterijai:

1. **Valdymo komanda** – techninė vs netechninė
2. **Paprastumas vs lankstumas**
3. **Integracijų poreikis** – kiek sistemų, ekosistemos dydis
4. **Kainos modelis** – veiksmai / minutės / sprendimai, mastelio ekonomika
5. **Saugumas** – GDPR, AI Act, DORA
6. **DI galimybės** – GPT, RAG, ML, RL

**Rekomendacija:** Simuliuoti 3 scenarijus – Dabar, +3 mėn., +12 mėn.

---

## 17. MUST – 3 lab'ai su rezultatu (artefaktais)

**Be šito mokymai nėra „delivery-first“.** Modulio 12 branduolys – 3 realūs lab'ai su konkrečiais artefaktais.

### Lab #1 „Automatize (80 %)“

- **Srautas:** Form (Google Forms / Typeform) → Sheets arba CRM → Email (personalizuotas laiškas) → Slack/Teams (pranešimas komandai).
- **Įrankis:** Zapier arba Make.
- **Artefaktai:** workflow schema (1 pusl.), laukų mappingas (formos laukas → CRM laukas), min. 2 test cases, logų/screenshot'ai (sėkmingas run + 1 klaidos atvejis).

### Lab #2 „Augment (15 %)“

- **Srautas:** Gautas laiškas → DI santrauka (pvz. ChatGPT/Make AI modulys) → žmogaus approve (patvirtinimas prieš siuntimą) → išsiuntimas.
- **Artefaktai:** workflow schema, santraukos prompto šablonas, approval žingsnio aprašymas, 1–2 test cases.

### Lab #3 „Autonomize (5 %)“

- **Srautas:** Atsiliepimai (CRM / form) → sentiment DI (klasifikacija: pozityvus/neutralus/negatyvus) → eskalacija (jei &lt; slenksčio) → ticket arba užduotis (Jira, Trello, Teams).
- **Artefaktai:** workflow schema, sentiment slenksčių apibrėžimas, eskalacijos taisyklės, nuoroda į incident playbook (§20).

**Bendri reikalavimai visiems lab'ams:** Standartinė workflow specifikacija (1 p.) pagal §18; kur įmanoma – error handling ir audit log nuoroda.

---

## 18. Standartinė workflow specifikacija (1 puslapis)

Šablonas sujungia §6–7 sąvokas į vieną deliverable. Kiekvienas lab'as turi turėti tokį 1-puslapio aprašą.

| Blokas | Turinys |
|--------|---------|
| **Trigger** | Kas paleidžia (įvykis, dažnumas). |
| **Input schema** | Kokie laukai, formatai, privalomi/optional. |
| **Condition** | Sąlygos (pvz. jei laukas X &gt; 500). |
| **Actions** | Žingsnių sąrašas (1, 2, 3…) su įrankiais. |
| **Output** | Ką gauname (įrašas CRM, laiškas, ticket). |
| **SLA, retries, rate limits** | Max laukimo laikas, kiek kartų bandyti, API limitai. |
| **Error handling** | Ką darom fail'o atveju (retry, alert, žmogaus eskalacija). |
| **Audit log** | Ką log'inam ir kur (run_id, laikas, žingsnis, rezultatas). |

---

## 19. Testavimo rinkinys (minimalus)

**10 edge-case scenarijų** – bent šie turi būti patikrinti prieš production:

1. Tušti laukai (privalomi laukai tušti).
2. Neteisingas email formatas.
3. Dublikatai (tas pats įrašas du kartus).
4. Timeout (išorinis API neatsako laiku).
5. Webhook duplikatai (tas pats webhook gaunamas du kartus).
6. Specialieji simboliai / ilgas tekstas laukuose.
7. Neleistinos reikšmės (pvz. ne skaičius ten, kur tikimasi skaičiaus).
8. Trūkstami laukai (schema pasikeitė, senas payload).
9. Rate limit pasiektas (429).
10. Autentifikacijos klaida (401/403).

**Idempotency taisyklė:** Kaip išvengti dvigubo siuntimo/sukūrimo – pvz. unikalus request_id, „jei įrašas su šiuo ID jau egzistuoja – atnaujink, ne kurk naują“.

---

## 20. Saugumo ir atitikties mini-modulis (praktinis)

**PII taisyklės:** Ką leidžiama siųsti į LLM, ką maskuoti (vardas, pavardė, el. paštas, telefono nr. – pagal GDPR ir įmonės politiką).

**Access kontrolė:** Kas gali redaguoti workflow (rolės: viewer, editor, admin); kaip saugomi API raktai (ne į kode, – secrets manager arba platformos vault).

**Incident playbook – 5 žingsniai**, jei „nusiunčia ne tam“ arba nutekėjo duomenys:
1. Sustabdyti workflow / atjungti integraciją.
2. Fiksuoti (log'ai, kas, kada, ką).
3. Įvertinti apimtį (kiek įrašų, kokių duomenų).
4. Pranešti (DPO, vadovui, jei reikia – valstybinėms).
5. Ištaisyti ir įdiegti apsaugas (masking, access review).

**Human-in-the-loop kada privalomas:** Pasiūlymai: finansinės operacijos virš X sumos, asmens duomenų masinis eksportas, eskalacija į išorę – visada žmogaus patvirtinimas prieš vykdymą.

---

## 21. Įrankių pasirinkimo sprendimų medis

**Algoritmas (ne tik sąrašas):** Pasirink pagal atsakymus.

| Jei… | Tuomet pasirink |
|------|------------------|
| **Office 365 heavy** (Teams, Outlook, SharePoint kasdien) | **Power Automate** |
| **Non-tech komanda + greitai startuoti** | **Zapier** |
| **Reikia sudėtingos logikos + gera kaina** | **Make.com** |
| **Reikia pilnos kontrolės + savihost / duomenys pas mus** | **n8n** |
| **Enterprise governance, auditoriai, compliance** | **Workato** |

---

## 22. SHOULD – ROI skaičiuoklės šablonas

**(Užduotys per savaitę) × (laikas vienai užduočiai val.) × (valandos kaina €) – (įrankio kaina per mėn. + priežiūros laikas)**

- **3 scenarijai:** Dabar (1–2 srautai), +3 mėn. (5 srautai), +12 mėn. (pilna nauda).
- Atitinka §14–15 (veiksmų planas ir KPI).

---

## 23. SHOULD – Use case katalogas (20 pavyzdžių)

Pagal skyrius: **Pardavimai, HR, Finansai, Klientų aptarnavimas, Gamyba, E-komercija.**

Kiekvienam pavyzdžiui: **trigger → actions → rizika → KPI.** Pvz. Pardavimai: „Naujas lead (form) → CRM įrašas → DI kvalifikacija → pardavimų pranešimas“; rizika – neteisinga kvalifikacija; KPI – laikas iki atsakymo, konversija.

*(Pilnas katalogas gali būti išplėstas atskiru dokumentu arba skaidrėse kaip „Kur pritaikyti“ pavyzdžiai.)*

---

## 24. SHOULD – Duomenų modeliavimas non-tech

**Kas yra:** laukas (field), rekordas (record), ID (unikalus identifikatorius), ryšiai (tarp lentelių / sistemų).

**Kodėl be ID atsiranda dublikatai:** Lab'o klaida #1 – tas pats formos pateikimas apdorojamas du kartus, nes nėra unikalaus ID; antrajame run'e sukuriamas dubliuotas įrašas. Sprendimas: idempotency key (request_id arba form_submission_id) – „jei toks ID jau yra, atnaujink, ne kurk naują“.

---

## 25. SHOULD – Observability

**Dashboard:** Kiek run'ų (sėkmingų / nesėkmingų), kiek klaidų, **top 5 fail step'ų** – kad greitai matytum, kur trūksta.

**SLA matavimas (§15)** į praktiką: apdorojimo trukmė (pvz. „90 % užklausų per 5 min“), žmogaus peržiūros santykis (Augment lab'uose).

---

## 26. SHOULD – Promptų standartas automatizacijai

**Vienas „master prompt“ + 3 variantai** (Zapier / Make / n8n kontekstui):

- Ką turi sugeneruoti DI: **žingsniai** (trigger → condition → actions), **laukai** (input/output mapping), **klaidos** (ką daryti fail'o atveju), **testai** (2–3 edge-case scenarijai).
- Naudojamas kuriant ar dokumentuojant lab'us – nuoseklus formatas visiems.

---

## Nuorodos

- **Moduliai 10–12 (Agentų inžinerija):** [docs/turinio_pletra_moduliai_10_11_12.md](turinio_pletra_moduliai_10_11_12.md)
- **Delivery-first MUST/SHOULD:** šio dokumento §17–26; vietos moduliuose – SOT §11.
- **Skaidrių eilė M10:** [docs/MODULIO_10_SKAIDRIU_EILES.md](MODULIO_10_SKAIDRIU_EILES.md)
- **Dokumentacijos indeksas:** [docs/DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)
