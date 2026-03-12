# Modulio 4 turinio analizė ir tobulinimo galimybės (Must–Should–Could)

> **Data:** 2026-02-07  
> **SOT:** `docs/turinio_pletra_moduliai_4_5_6.md`  
> **Susiję:** SOT `docs/turinio_pletra_moduliai_4_5_6.md`, `docs/MODULIO_4_SKAIDRIU_EILES.md`, `docs/CONTENT_MODULIU_ATPAZINIMAS.md`. Istorinis turinio aprašas – `docs/archive/MODULIO_4_TURINIO_ANALIZE.md`.  
> **Šaltiniai:** internetinė paieška – prompt engineering kursai, RAG/haliucinacijų/manipuliacijų geriausios praktikos, MoSCoW prioritizacija.

---

## 1. Trumpa Modulio 4 turinio analizė

**Modulis 4** – „Konteksto inžinerija“ (pažangusis teorijos modulis). Apima: konteksto inžinerijos sąvoką, 4 dedamąsias, RL/RLHF, parametrų lauką, struktūruotą procesą (8 žingsniai), LLM schemas (RAG, multi-modal), **RAG**, atvirus duomenis, RAG įrankius ir duomenų paruošimą, **Deep research**, **tokenų ekonomiką**, **promptų manipuliacijas**, **žinių patikrinimą ir haliucinacijas**, santrauką su ryšiais tarp temų ir CTA į Modulį 5.

**Stiprybės (sutampa su SOT ir istoriniu MODULIO_4_TURINIO_ANALIZE, archyve):**
- Aiški prielaida (Moduliai 1–3 baigti), nuosekli tema po temos, ryšiai su 6 blokais.
- Kopijuojami šablonai (CopyButton), kartojimo skaidrė, „3 klausimai sau“ prieš testą.
- Oficiali skaidrių eilė dokumentuota (`MODULIO_4_SKAIDRIU_EILES.md`), RAG įvade – nuoroda į tokenus (4.4).

**Silpnos vietos (sutampa + iš geriausių praktikų):**
- Kognityvinė apkrova: daug sąvokų (RAG, Deep research, CoT, ToT, tokenai, manipuliacijos, haliucinacijos) be vienos „bridžinės“ praktikos, jungiančios kelis blokus.
- RAG: trūksta aiškios „chunk size / dokumentų paruošimo“ gairių pagal šaltinius (balansas tarp konteksto ir retrieval tikslumo).
- Haliucinacijos: nėra nuorodos į **verifikacijos grandinę** (CoVe – chain-of-verification) kaip pažangų būdą.
- Manipuliacijos: **prompt injection** ir **jailbreak** minimi, bet nėra aiškios takoskyros tarp „manipuliacija versle“ (šališkumas) ir **saugumo** (OWASP #1 – prompt injection); gali būti 1–2 skaidrės arba collapsible „Saugumas: prompt injection ir apsauga“.

---

## 2. Geriausios praktikos (iš interneto) – santrauka

### 2.1 Mokymų struktūra ir prioritizacija

- **Kursų struktūra (2024):** progresyvūs moduliai (nuo paprasto prie sudėtingo), hands-on pratimai, aiškūs mokymosi tikslai, įvertinimas ir grįžtamasis ryšys, realaus pasaulio pavyzdžiai (Coursera, DeepLearning.AI, Learn Prompting).
- **MoSCoW:** MUST – būtina sėkmei; SHOULD – svarbu, bet ne kritinė; COULD – norima; WON'T – šį kartą ne (LearningLens, Interaction Design Foundation).

### 2.2 RAG (Retrieval-Augmented Generation)

- **Sėkmės veiksniai:** gerai suprojektuoti promptai (mažina haliucinacijas), dokumentų chunk dydis (balansas tarp konteksto ir retrieval), query expansion, žinių bazės konfigūracija, sentence-level retrieval (ACL Anthology, Medium, arXiv).
- **Edukacinis naudojimas:** modelio pasirinkimas, vektorinė DB, embeddings, pipeline, duomenų privatumas (ACM – RAG aukštajame mokyme).

### 2.3 Haliucinacijos ir žinių patikrinimas

- **Verifikacija:** Chain-of-Verification (CoVe) – modelis planuoja patikrinimo klausimus, atsako į juos atskirai, generuoja patikslintą atsakymą (mažesnės haliucinacijos) (arXiv).
- **Detekcija:** HaluCheck – atomizuoti faktai, šaltinių paieška, vizualizacija patikimumo; adaptyvus routing (mažo rizikos užklausos – greitas atsakymas, didelės – stipresnė verifikacija) (ScienceDirect, arXiv).

### 2.4 Promptų manipuliacijos ir saugumas

- **Prompt injection (OWASP):** kritinė LLM pažeidžiamumo forma – naudotojo įvestis „įskiepija“ instrukcijas, modelis negali patikimai atskirti sistemos ir vartotojo teksto (OWASP Cheat Sheet, Learn Prompting).
- **Tipai:** tiesioginė („Ignore previous instructions“), netiesioginė (nuotolinių šaltinių turinys – el. laiškai, svetainės), obfuskuota (Base64, Unicode), jailbreak (saugumo ribų apeija) (OWASP, Anthropic docs).
- **Gynybos:** įvesties validacija, sanitizacija, aiškus atskyrimas system vs user, konteksto ribos, prompt sandboxing, instrukcijų patikrinimas (Sidechain Security, Anthropic).

---

## 3. Must–Should–Could prioritizacija

Prioritetai apibrėžti taip:
- **MUST** – būtina: be to modulio tikslai nepasiekiami arba didelė kokybės/patikimumo rizika.
- **SHOULD** – labai pageidautina: atitinka geriausias praktikas ir stiprina įsisavinimą.
- **COULD** – norima: gerina patirtį, bet ne kritinė.

---

### MUST (būtina)

| # | Pasiūlymas | Pagrindimas | Kur taikyti |
|---|------------|-------------|-------------|
| M1 | **Santraukoje (4.7) aiškiai išlaikyti ryšius tarp temų** | Bloom „Suprasti“ – dalyvis turi matyti, kaip RAG, tokenai, patikrinimas ir manipuliacijos susiję. | SOT – skaidrė 4.7 (jau įgyvendinta: „Ryšiai tarp temų“). |
| M2 | **RAG skaidrėse (4.2) būtinai reikalauti „Jei nėra kontekste – parašyk Nežinau“ ir citavimo** | Sumažina haliucinacijas; atitinka RAG geriausias praktikas (gerai suprojektuoti promptai). | SOT – 4.2 pristatymas, mini-šablonas; patikrinti, ar visur pateikiama. |
| M3 | **4.6 (haliucinacijos) – anti-haliucinacinis šablonas ir 4–5 taisyklės visada matomi** | Žinių patikrinimas – pagrindinis modulio tikslas; be aiškios „kaip mažinti“ dalyvis neįgyja įgūdžio. | SOT – 4.6; UI – CopyButton ir taisyklės nepaslėpti. |
| M4 | **Manipuliacijų (4.5) skyriuje aiškiai atskirti „verslo manipuliacija“ (šališkumas, įrėminimas) nuo „saugumo“ (prompt injection, jailbreak)** | OWASP: prompt injection – #1 GenAI grėsmė; dalyvis turi žinoti ir etiką, ir pagrindus apsaugos. | SOT – 4.5: pridėti 1 skaidrę arba collapsible „Saugumas: prompt injection ir jailbreak“ su trumpu apibrėžimu ir nuoroda į OWASP/Anthropic. |

---

### SHOULD (labai pageidautina)

| # | Pasiūlymas | Pagrindimas | Kur taikyti |
|---|------------|-------------|-------------|
| S1 | **Prieš RAG (4.2) – 1–2 sakiniai apie konteksto langą/tokenus + nuoroda į 4.4** | Sumažina kognityvinę spragą „kodėl tokenai taip vėlai“. | SOT – 4.2 (jau įgyvendinta; tikrinti, ar rodoma UI). |
| S2 | **RAG duomenų paruošimas (4.2b): įtraukti „chunk size“ / fragmentų dydžio gairę** | Geriausios praktikos: chunk dydis lemia retrieval kokybę. | SOT – 4.2b: pridėti punktą „Logiški fragmentai (chunk), ne per ilgi – retrieval tikslesnis“. |
| S3 | **4.6 (haliucinacijos): viena pastraipa arba „Giluminiam“ blokas apie Chain-of-Verification (CoVe)** | CoVe – tyrimuose įrodytas būdas mažinti haliucinacijas (planuoti klausimus → atsakyti atskirai → galutinis atsakymas). | SOT – 4.6: naujas poskyris „Verifikacijos grandinė (CoVe)“ arba collapsible. |
| S4 | **Viena trumpa „bridžinė“ praktika po 4.3 (arba prieš 4.4): RAG + Deep research + šaltiniai vienoje 5–10 min užduotyje** | Fragmentuota praktika – stiprybė; bet viena jungiamoji užduotis stiprina „Suprasti“ ir „Taikyti“. | SOT – po 4.3a arba kaip 4.3a pratęsimas; užduotis: „Paruošk vieną trumpą atsakymą su šaltiniais naudodamas RAG/Deep research stiliaus promptą“. |
| S5 | **Optional/BONUS skaidres žymėti nuosekliai** | Mažina kognityvinę apkrovą – dalyvis gali pasirinkti gilintis. | SOT – 2.1 lentelė: 4.1a2-viz, 4.1-workflow-ex, 4.1a5-style, 4.1a5-practice, 4.1b2, 4.2a-academic – vienoda žyma (pvz. „Optional“ arba „Giluminiam“). |
| S6 | **Ilgoms skaidrėms – trumpas UI pavadinimas** | UX: skaitomumas ir navigacija. | SOT – 2.1 arba 2.2: pvz. „Darbas su RAG: memory, įrankiai“ → UI: „RAG: memory ir įrankiai“. |

---

### COULD (norima)

| # | Pasiūlymas | Pagrindimas | Kur taikyti |
|---|------------|-------------|-------------|
| C1 | **Pasirinktinai žymėti skaidres „Verslui“ / „Studentams“** | 4.2a-academic – studentams; RAG analitikas – verslui; skirtingi segmentai randa savo. | SOT – 2.1 lentelė: stulpelis arba etiketė. |
| C2 | **Nuorodos į išorinius šaltinius (OWASP, Anthropic, Learn Prompting) 4.5 ir 4.6** | Padidina patikimumą ir leidžia gilintis. | SOT – 4.5 (manipuliacijos), 4.6 (haliucinacijos): collapsible „Šaltiniai“. |
| C3 | **Modulio 4 pradžioje (4.1) – vienas sakinys: „Šiame modulyje visi 6 blokai susieti su RAG, patikrinimu ir tokenais“** | Orientacija ir motyvacija. | SOT – 4.1 blokas „Kodėl konteksto inžinerija?“ |
| C4 | **Tokenų skaidrėse – nuoroda į oficialius modelių konteksto langus (atnaujinti 2025–2026)** | Skaičiai keičiasi; „patikrinkite oficialiuose šaltiniuose“ jau yra – galima nuorodos. | SOT – 4.4 lentelė „Maksimalus konteksto langas“. |

---

## 4. Konkretūs žingsniai įgyvendinimui

### 4.1 SOT (`turinio_pletra_moduliai_4_5_6.md`) – CONTENT_AGENT

1. **4.5 (manipuliacijos):** Pridėti skaidrę arba poskyrį **„Saugumas: prompt injection ir jailbreak“** – apibrėžimas (1–2 sakiniai), takoskyra nuo „verslo manipuliacijos“, 2–3 gynybos principai (įvesties ribos, system vs user atskyrimas), nuorodos: OWASP LLM Cheat Sheet, Anthropic – mitigate jailbreaks.
2. **4.2b:** Pridėti punktą apie **chunk / fragmentų dydį** (logiški fragmentai, ne per ilgi – retrieval tikslesnis).
3. **4.6:** Pridėti **„Verifikacijos grandinė (CoVe)“** – trumpas aprašymas (planuoti patikrinimo klausimus → atsakyti atskirai → galutinis patikslintas atsakymas); galima collapsible „Giluminiam“.
4. **2.1 lentelė:** Nuosekliai pažymėti optional/BONUS skaidres; kur reikia – trumpi UI pavadinimai.
5. **Po 4.3a:** Pridėti **bridžinę praktiką** – viena 5–10 min užduotis: RAG + Deep research + šaltiniai (pavyzdinis promptas ir tikslas).

### 4.2 Duomenys ir UI – DATA_AGENT / CODING_AGENT

- Sinchronizuoti `modules.json` su `MODULIO_4_SKAIDRIU_EILES.md` (jei skiriasi).
- Įvesti naujus turinio blokus (4.5 saugumas, 4.6 CoVe, 4.2b chunk, bridžinė praktika) į atitinkamas skaidres pagal SOT.

### 4.3 Dokumentacija – QA_AGENT

- Atnaujinti SOT (`docs/turinio_pletra_moduliai_4_5_6.md`) ir šį dokumentą – įgyvendintų MUST/SHOULD statusą.
- CHANGELOG – „Modulio 4 tobulinimai pagal geriausias praktikas (Must–Should–Could)“.

---

## 5. Nuorodos į šaltinius (internetas)

- **Prompt engineering kursai:** Coursera (IBM, Vanderbilt, Google), Learn Prompting, DeepLearning.AI „ChatGPT Prompt Engineering for Developers“, Anthropic interactive tutorial.
- **RAG:** ACL Anthology 2024 „Searching for Best Practices in RAG“, Medium „Prompt Engineering Patterns for Successful RAG“, arXiv (RAG komponentų sąveikos).
- **Haliucinacijos:** arXiv – Chain-of-Verification; ScienceDirect – HaluCheck; HALT (Hallucination Assessment via Latent Testing).
- **Manipuliacijos ir saugumas:** OWASP LLM Prompt Injection Prevention Cheat Sheet, OWASP Prompt Injection, Learn Prompting – Prompt Hacking/Injection, Anthropic – Mitigate jailbreaks and prompt injections, Sidechain Security – Defending against prompt injection and jailbreaking.

---

## 6. CHANGES / CHECKS / RISKS / NEXT

**CHANGES:**
- Sukurtas `docs/MODULIO_4_TOBULINIMAI_GERIAUSIOS_PRAKTIKOS.md` – 4 modulio turinio analizė, geriausios praktikos iš interneto, Must–Should–Could prioritizacija ir konkretūs pasiūlymai.

**CHECKS:**
- Skaityta SOT (Modulio 4 skyriai), MODULIO_4_SKAIDRIU_EILES.md.
- Interneto paieška: prompt engineering courses, RAG best practices, hallucination verification (CoVe), prompt injection/jailbreak (OWASP, Anthropic).

**RISKS:**
- Nauji SOT pakeitimai reikalauja CONTENT_AGENT (turinis), vėliau DATA_AGENT (JSON), CODING_AGENT (UI) – laikytis agentų orkestratoriaus.
- Prompt injection skaidrė gali padidinti 4.5 apimtį – geriau trumpas blokas arba collapsible.

**NEXT:**
1. Priimti sprendimą dėl MUST M4 (4.5 – prompt injection/jailbreak blokas) ir SHOULD S2–S4 (chunk, CoVe, bridžinė praktika).
2. CONTENT_AGENT: įgyvendinti pasirinktus pakeitimus SOT faile.
3. DATA_AGENT: sinchronizuoti `modules.json` su nauju turiniu.
4. Atnaujinti SOT (reikalui esant) ir CHANGELOG.
