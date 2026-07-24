# Turinio plėtra – Moduliai 13, 14, 15 (Turinio inžinerija)

> **Autorinė mokymo medžiaga © 2026**  
> Šis dokumentas yra **turínio SOT** Turinio inžinerijos keliui (Moduliai 13–15). Papildo `turinio_pletra.md` ir modulius 1–12.  
> **Source of truth:** turinio semantika – šis failas; full redagavimo duomenų struktūra – `src/data/modules.json` po sinchronizacijos.  
> **Auditorija:** rinkodaros ir komunikacijos specialistai. Žr. [docs/CONTENT_MODULIU_ATPAZINIMAS.md](CONTENT_MODULIU_ATPAZINIMAS.md) §6, [ROADMAP.md](../ROADMAP.md).

---

## 1. Apimtis ir tikslai (CURRICULUM)

### 1.1 Vieta kurse

| Moduliai 1–6                          | Moduliai 10–12                                 | Moduliai 13–15                                        |
| ------------------------------------- | ---------------------------------------------- | ----------------------------------------------------- |
| 6 blokų sistema, konteksto inžinerija | Agentų inžinerija                              | **Turinio inžinerija** – vaizdai, video, garsas su DI |
| Teorija → Testas → Projektas (M4–M6)  | Teorija (M10) → Testas (M11) → Projektas (M12) | Teorija (M13) → Testas (M14) → Projektas (M15)        |
| Bendras pamatas                       | Softo inžinieriai                              | **Rinkodaros ir komunikacijos specialistai**          |

**Prielaida:** Dalyvis gali pradėti po Modulio 6 (arba lygiagrečiai keliems keliams). Moduliai 13–15 fokusas: **vaizdų, vaizdo įrašų ir garso generavimas** – pipeline, promptų principai, consistency, kokybės patikra ir provenance.

### 1.2 Mokymosi tikslai (po modulių 13–15)

- **Pipeline:** Suprasti generatyvinės medijos grandinę: brief → stills/storyboard → reference lock → trumpi I2V klipai → garsas → montažas → QA / provenance.
- **Vaizdų generavimas:** Formuluoti vaizdo promptus (stilius, proporcijos, kamera); brand consistency; character/product consistency per reference.
- **Video generavimas:** Storyboard prieš brangų generavimą; 3–5 s klipai; image→video; CPI (kaina už tinkamą clipą), ne tik €/s.
- **Garsas (audio-first):** Scenarijus → VO → klipų trukmė pagal audio → bed/SFX; licencijuota vs demo muzika; LUFS.
- **Provenance:** C2PA / SynthID / žmogui matoma DI žyma prieš publikaciją.
- **Testas (M14):** Patikrinti įsisavinimą prieš finalinį Turinio inžinerijos projektą (M15).
- **Projektas (M15):** Privalomas minimumas – hero vaizdas su naudotu promptu ir trumpu brief (skaidrė 150.5). Optional pilnas kelias – video, garsas ir montažas (151–154).

### 1.3 Ryšys su 6 blokais

- **META:** Rolė „specialistas, kuriantis vizualų ar garso turinį su DI“; kontekstas – rinkodara, komunikacija, medija.
- **INPUT:** Ką aprašyti (scena, stilius, nuotaika, trukmė); apribojimai (negalima turinio sąrašas).
- **OUTPUT:** Aiškus formatas (proporcijos vaizdui, vaizdo trukmė, muzikos stilius).

### 1.4 whyBenefit – „Kas man iš to?“ (pirmos skaidrės M13, M14, M15)

Pagal [docs/development/GOLDEN_STANDARD.md](development/GOLDEN_STANDARD.md) §4.1:

| Modulis | Skaidrė / tipas        | whyBenefit (tekstas į JSON)                                                                                                                                                                                                                       |
| ------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **13**  | action-intro (pirmoji) | Po šio modulio mokėsi kurti vaizdus, trumpus vaizdo įrašus ir garsą su DI – nuo pipeline ir promptų iki įrankių, consistency ir kokybės patikros. **Outcomes** (3 punktai) – aukšto lygio kryptys; skaidrėje 13.1 „Trumpai“ – gilesnis sluoksnis. |
| **14**  | test-intro             | Po šio testo žinosi, ar esi pasiruošęs finaliniam Turinio inžinerijos projektui (Modulis 15).                                                                                                                                                     |
| **15**  | practice-intro         | Po projekto turėsi bent vieną paruoštą vizualų ar garso artefaktą ir promptų šablonus tolesniam darbui.                                                                                                                                           |

---

## 2. Turinio inžinerijos kelias – ką rasite (apžvalga)

**Skaidrė: Kelio apžvalga (13.1)**

- **Vaizdų generavimas:** Kaip rašyti vaizdo promptus; stilius, proporcijos (aspect ratio); brand; įrankiai (FLUX, GPT-Image, Midjourney, Ideogram, Leonardo.ai, Adobe Firefly, Imagen ir kt.).
- **Video generavimas:** Storyboard → image-to-video; 3–5 s klipai; įrankiai (Seedance, Kling, Veo, Sora, Runway, Synthesia ir kt.).
- **Garsas:** Audio-first (VO → bed/SFX); licencijos; įrankiai (ElevenLabs, ElevenMusic, Soundraw, Beatoven, Suno/Udio demo).

**Kampanijos tikslai ir vaizdo tipas (MUST – 13.1)**  
Be šito vaizdai būna gražūs, bet atsitiktiniai. Trijų tikslų modelis:

- **Awareness (atpažįstamumas):** Vaizdas pritraukia dėmesį – ryškus, lengvai atpažįstamas, emocija ar intriga. Tinka: viršelio nuotrauka, baneris, social postas.
- **Engagement (įsitraukimas):** Vaizdas skatina sustoti ir sąveikauti – aiškus kontekstas, „kas čia?“ arba naudinga info. Tinka: carousel, video intro, iliustracija straipsniui.
- **Conversion (konversija):** Vaizdas skatina veiksmą – produktas, pasiūlymas, CTA vizualiai paryškintas. Tinka: reklamos maketas, landingo hero, „pirk dabar“ blokas.

**Kada emocija, kada aiškumas:** Awareness dažnai = emocija, kontrastas; Conversion = aiškumas, pasitikėjimas, skaitomumas. Engagement – pusiausvyra.

**Kur pritaikyti:** Rinkodaros vizualai, socialinio turinio vaizdai ir trumpi vaizdo įrašai, VO ir foninė muzika projektams – be būtino dizainerio ar kompozitoriaus.

**modules.json (LT):** Skaidrės 13.1 „Trumpai“ formuluotė nurodo, kad čia – **gilesnis nei 130 įvanga** sluoksnis (kampanijos tikslų modelis + kur pritaikyti), kad nesidubliuotų su outcomes.

### 2.1 Generatyvinės medijos pipeline (13.12) – MUST

**Trumpai:** 2026 praktikoje laimi ne „geriausias modelis“, o **grandinė**. Vienas promptas į video generatorių = brangūs retry. Pipeline sumažina atsitiktinumą.

**modules.json:** interaktyvi schema `m13_media_pipeline` = **6 žingsniai** (brief → stills → refs → I2V → garsas/edit → QA). Skaidrės antraštė „Kaip skaityti schemą“ – ne „4+QA“; checklist = praktika, ne antras žingsnių sąrašas.

**6 žingsniai (schema + SOT):**

1. **Brief + brand lock** – tikslas (A/E/C), auditorija, platforma, spalvos/tonas.
2. **Stills / storyboard** – pigūs kadrai (hero + 1–2 papildomi); užrakink kompoziciją prieš mokėdamas už video.
3. **Reference lock** – 3–5 kampai; „same product / same style“.
4. **Trumpi I2V** – 3–5 s klipai iš keyframe.
5. **Garsas + montažas** – audio-first: VO (arba bed) diktuoja trukmę; CapCut/Premiere cut + mix.
6. **QA + provenance** – brand, žinutė, teisės, C2PA/disclosure.

**Daryk dabar:** Užpildyk checklistą savo temai (nekopijuok į generatorių – tai planas).

**Kopijuojamas šablonas (CopyButton):**

```
Pipeline checklist:
Brief: tikslas [Awareness/Engagement/Conversion], auditorija [kam], platforma [kur].
Brand: spalvos [X], tonas [Y].
Stills: hero + [0–2] papildomi kadrai (užrakinti prieš video).
Refs: [produktas/personažas – 3–5 kampai] / nėra.
Klipai: [2–4] × 3–5 s (I2V), ne vienas ilgas one-shot.
Garsas: [VO pirmiausia / tik bed] + teisės [licensed / demo].
Montažas: cut + grade + mix.
QA: brand | žinutė | formatas | teisės | disclosure (C2PA/žyma).
```

**Patikra:** Ar prieš video turi bent vieną užrakintą still? Ar žinai, ar garsas bus VO-first ar tik bed?

**Kur pritaikyti:** Reklamos klipai, social Reels, produktų demo, vidiniai explaineriai.

---

## 3. Blokas 1 – Vaizdų generavimas

**Strateginė struktūra (5 sluoksniai):** Šis blokas apima (1) promptų struktūrą, (2) įrankių ekosistemą, (3) stiliaus valdymą, (4) kompoziciją ir kadravimą (neprivaloma), (5) naratyvo konstravimą per aprašymą. Tai ne tik „kaip sugeneruoti vaizdą“, bet vizualinės komunikacijos pagrindai su DI.

### 3.1 Vaizdo prompto pagrindai (13.2)

**Trumpai:** Geras vaizdo promptas apima: ką rodoma (subjektas, vieta, veiksmas), stilių (fotorealistiškas, iliustracija, minimalistinis), proporcijas (pvz. 16:9, 1:1) ir ko vengti (negalima turinio sąrašas platformoje).

**Minimalūs reikalavimai:** Bent 3–7 žodžių; vengti abstrakcijų („gražu“, „įdomu“ be konteksto); naudoti konkrečius daiktavardžius. Estetikos raktinis žodis (stilius) vainikuoja idėją.

**Formulė ir trys sluoksniai (vienas blokas + diagrama modules.json):** Vaizdas = Objektas + Kontekstas + Estetika (stilius); viename bloke – ir trys sluoksniai (objektas, kontekstas, estetika), kad mažiau kartotųsi antraštės.

**Pravartu:** Užklausa startuoja nuo „generuok vaizdą“ (arba „sukurk vaizdą“) + konkreti užklausa – taip įrankis aiškiai supranta užduotį.

**Daryk dabar:** Atidaryk vieną vaizdų generavimo įrankį (pvz. ChatGPT su DALL·E, Ideogram arba Leonardo.ai) ir nukopijuok žemiau esantį promptą. Pakeisk [APRAŠYMAS] savo tema.

**Kopijuojamas promptas (CopyButton):**

```
Sukurk vaizdą: [APRAŠYMAS – pvz. „verslininkas prie stalo su nešiojamu kompiuteriu, šviesus biuras“].
Stilius: profesionalus, šviesus, minimalistinis. Proporcijos: 16:9. Nenaudok tekstų vaize.
```

**Patikra:** Ar vaizdas atitiko aprašymą? Jei ne – pridėk daugiau detalių (vieta, apšvietimas, stilius) arba nurodyk „be teksto vaize“.

**Kur pritaikyti:** Reklamų baneriai, socialinio turinio nuotraukos, prezentacijų iliustracijos.

### 3.2 Stilius ir proporcijos (13.3)

**Trumpai:** Stilius nustato išvaizdą (fotorealistiškas, akrilas, 3D, piešinys). Proporcijos (aspect ratio) – vaizdo formátas: 1:1 kvadratas, 16:9 platus, 9:16 vertikalus (stories).

**Pamoka:** Tas pats aprašymas (pvz. „namelis miške“) su skirtingu stiliaus žodžiu (impresionizmas, ekspresionizmas, minimalistinė grafika) duoda labai skirtingą rezultatą. Stilius = rezultato architektūra.

**Kada rinktis kurį įrankį:** Tikroviškumas ir tekstas vaize – DALL·E, Ideogram; meninė kokybė ir stilių įvairovė – Midjourney; fotorealizmas ir kontrolė – Leonardo.ai. Nemokamas startas – Ideogram, Craiyon (kokybė kintamesnė).

**Brand consistency (MUST – 13.3):** Kad DI negeneruotų chaotiško „brando“, prompte nurodyk: **spalvų sistemą** (pvz. „pagrindinė spalva tamsiai mėlyna, akcentas oranžinis“), **tipografijos kontrolę** („minimalistinė, be dekoratyvų šriftų“ arba „klasikinis serifas“), **toną** (profesionalus, draugiškas, prabangus) ir **vizualinį identitetą** (pvz. „stilius: korporatyvinis, švarus fonas, vienas pagrindinis objektas“). Tai verslo pasaulyje būtina.

**Daryk dabar:** Pasirink vieną stilių ir proporcijas. Nukopijuok žemiau esantį šabloną ir užpildyk.

**Kopijuojamas promptas (CopyButton):**

```
Vaizdas: [KĄ RODOMI].
Stilius: [fotorealistiškas / akrilo tapyba / minimalistinė vektorinė grafika / 3D renderis].
Proporcijos: [1:1 / 16:9 / 9:16]. Kalba: lietuviška scena arba neutrali, be tekstų vaize.
```

**Patikra:** Ar platforma palaiko nurodytas proporcijas? Jei vaizdas „nukirpto“ – pakeisk proporcijas arba papildyk aprašymą.

**Įrankiai (tools.json, category: „Vaizdų generavimas“, moduleId: 13):** DALL·E (OpenAI), Midjourney, Ideogram, Leonardo.ai, Canva AI, Stable Diffusion (pvz. per įrankius).

**Įrankių pozicionavimas (cheat sheet, optional):** GPT-Image / ChatGPT – natūrali kalba, greitas brief→vaizdas; FLUX – fotorealizmas ir multi-reference consistency; Midjourney – aukštas meninis lygis, `--cref` character ref; Leonardo.ai – fotorealizmas, produktų/žaidimų dizainas; Ideogram – tekstas vaizduose (logo, plakatai, LinkedIn); Adobe Firefly – CC integracija, teisiškai saugesni šaltiniai, C2PA; Google Imagen – objektų išlaikymas, SynthID – saugi reklama, katalogai. Stable Diffusion / DreamStudio – atviras, lankstus (advanced).

### 3.2b Character / product consistency (13.32) – MUST

**Trumpai:** Promptas vienas neužrakina tapatybės. Marketinge reikia **reference lock**: 3–5 reference vaizdai (skirtingi kampai), tada „same product / same character / same style / same color palette“. Be to kampanijos setas „plaukioja“.

**Brand / product sheet (minimumas):**

1. Hero / priekinis vaizdas
2. ¾ arba šonas
3. Flatlay arba detalė (etiketė, medžiaga)
4. (Optional) stiliaus ref (apšvietimas / mood)

**Daryk dabar:** Surink arba sugeneruok 3 reference savo produktui/personažui. Nukopijuok taisyklę į kitą generavimą.

**Kopijuojamas šablonas (CopyButton):**

```
Reference lock: naudok tuos pačius 3–5 reference vaizdus.
Taisyklė: same product, same proportions, same label/logo placement, same color palette, same style.
Nauja scena: [APLINKA / VEIKSMAS]. Kamera: [kampas]. Formatas: [1:1 / 16:9 / 9:16].
Be teksto vaizde (nebent etiketė ant produkto).
```

**Patikra (failure modes):** Ar produktas „išsipūtė“ / pakeitė spalvą / prarado etiketę? Jei taip – sumažink scenos sudėtingumą, padidink ref svorį, arba inpaint tik probleminę zoną. Venk realių žmonių veidų be sutikimo.

**Kur pritaikyti:** Produktų katalogai, serijiniai social postai, video storyboard su tuo pačiu hero.

### 3.2a Savitikra: stilius ir proporcijos (13.31)

**Tikslas:** Trumpas „ar supratau?“ momentas po 13.3, prieš kompozicijos skaidrę. Dalyvis patikrina, ar atskiria stilių, proporcijas ir prekės ženklo pastovumą.

**Klausimai (warm-up-quiz):**

1. **Ką geriausia nurodyti vaizdo prompte, jei nori kvadratinio socialinio įrašo?**  
   Teisinga: proporcijas 1:1.
2. **Kuris žodis ar frazė labiausiai valdo vaizdo išvaizdą?**  
   Teisinga: stilius, pvz. fotorealistiškas, 3D arba minimalistinė vektorinė grafika.
3. **Kaip sumažinti atsitiktinį „chaotiško brando“ rezultatą?**  
   Teisinga: nurodyti spalvas, toną, tipografijos kryptį ir švarų vizualinį identitetą.

**Remediation:** Jei klysti – grįžk į 13.3 ir perrašyk vieną promptą taip, kad jame būtų subjektas, stilius ir proporcijos.

### 3.3 Kompozicija ir kadras (neprivaloma, 13.3 optional)

**Trumpai:** Kompozicija ir kadravimas pakelia rezultatą į „profi“ lygį: kur dėti pagrindinį objektą, kokį kadrą ir kameros kampą nurodyti. **Ryšys su video:** tie patys principai kaip trumpo vaizdo įrašo skaidrėje – čia pritaikymas **statinio vaizdo** promptui (modules.json – vienas sakinys „Trumpai“).

- **Trečdalių taisyklė:** Įsivaizduok 3×3 tinklelį; pagrindinis objektas ar fokusas – sankirtos taškuose (ne centre). Tai suteikia balansą ir nukreipia žvilgsnį.
- **Pirmas ir antras planas:** Pirmas planas – ryškesnis, labiau apšviestas objektas; antras planas (fonas) – gylis ir atmosfera. Nurodyk prompte: „pirmame plane…“, „fone…“.
- **Kameros kampas:** Lygus akims (eye level) – neutralu; iš viršaus (high angle) – silpnina; iš apačios (low angle) – suteikia galios; oberžas (bird view) – struktūrinis matymas; „Dutch“ (pakreiptas kadras) – įtampa. Kadro tipai: labai tolimas (ELS), vidutinis (MLS), artimas (CU), labai artimas (ECU). Kadras = emocijos kontrolė.

**Kopijuojamas šablonas (kompozicija + kadras):**

```
Vaizdas: [OBJEKTAS ir VEIKSMAS]. Aplinka: [KONTEKSTAS].
Kompozicija: trečdalių taisyklė, pagrindinis objektas dešinėje sankirtoje. Pirmas planas: [aprašymas]. Fonas: [gylis, atmosfera].
Kadras: [artimas CU / vidutinis MLS / tolimas ELS]. Kameros kampas: [lygus akims / iš viršaus / iš apačios].
Stilius: [nurodyk]. Proporcijos: 16:9.
```

**Naratyviniai šablonai (optional):** Vaizdas gali pasakoti istoriją – „kas čia buvo?“ Pavyzdžiai: mitologija + moderni aplinka; fantastika + realybė; emocija per metaforą (gamtos reiškinys per menininko stilių); istorija + futurizmas. Vienas kopijuojamas šablonas:

```
Naratyvinis vaizdas: [TEMA arba EMOCIJA].
Konceptas: [mitologija / fantastika / istorinė epocha] susietas su [moderni aplinka / realybė / futurizmas].
Pavyzdys: [pvz. „Senovės dievas kavos puoduko scenoje, minimalistinė kompozicija“ arba „Lietuviška pasaka – miškas ir būdelė – bet stilius: film noir“].
Stilius: [nurodyk]. Proporcijos: 16:9.
```

**Kamera prompte (optional):** Jei nori labiau kinematografinio rezultato, pridėk 1–2 kameros detales. Pvz. „85mm lens“ (portretinis kadras), „f/1.8“ (minkštas fonas), „soft studio light“ (švelnus apšvietimas), „cinematic rim light“ (šviesa iš nugaros, kontūras), „wide establishing shot“ (platus aplinkos kadras). Venk tuščių kokybės žodžių kaip „8K masterpiece“ – geriau aprašyk realią šviesą, kadrą ir nuotaiką.

**Kopijuojamas kameros pavyzdys:**

```
Vaizdas: [OBJEKTAS] [APLINKA].
Kamera: 85mm lens, f/1.8, soft studio light, shallow depth of field.
Kompozicija: pagrindinis objektas dešinėje trečdalio sankirtoje, švarus fonas, vieta antraštei kairėje.
Stilius: [nurodyk]. Proporcijos: 16:9.
```

### 3.3a Praktika: atpažink stilių ir proporcijas (13.34)

**Tikslas:** Viena atpažinimo užduotis po kompozicijos skaidrės. Dalyvis turi ne kurti naują promptą, o atpažinti, kokio lauko trūksta ar koks formatas tinkamiausias.

**Užduotis (recognitionExercise):** Perskaityk 5 trumpas situacijas ir pasirink tinkamiausią atsakymą: stilius, proporcijos, kompozicija arba prekės ženklo pastovumas.

**Pavyzdžiai:**

1. „Reikia kvadratinio LinkedIn įrašo su produkto nuotrauka.“ → **Proporcijos: 1:1**
2. „Tas pats produktas turi atrodyti kaip premium katalogo nuotrauka.“ → **Stilius**
3. „Hero vaizde reikia palikti vietos antraštei kairėje.“ → **Kompozicija**
4. „Visi kampanijos vaizdai turi naudoti tas pačias spalvas ir toną.“ → **Prekės ženklo pastovumas**
5. „Stories formatui reikia vertikalaus kadro.“ → **Proporcijos: 9:16**

**Tikslas dalyviui:** Prieš pereidamas prie generatoriaus, jis atskiria, ką valdo stilius, ką valdo proporcijos, ir kada reikia kompozicijos ar prekės ženklo taisyklės.

### 3.4 DI vaizdų generavimo workflow (5 žingsniai, optional)

**Kaip naudotis skaidre (modules.json):** Jei užtenka vieno sprendimo – rinkis tik MASTER šabloną arba vieną ready šabloną; visa kita – gilinimuisi.

Karkasas, kurį galima naudoti nuo koncepcijos iki rezultato:

1. **Koncepcija:** Tikslas, kontekstas, stilius, nuotaika, auditorija.
2. **Prompt formulavimas (kategorijos):** objektai/subjektai; stilius (fotorealizmas / piešinys / animacija); kompozicija (kadro planas, kampas, perspektyva); apšvietimas (natūralus, dirbtinis, „aukso valanda“); spalvų paletė + nuotaika; techniniai parametrai (raiška, formatas).
3. **Optimizavimas:** Struktūra pagal svarbą, negative prompts (ko vengti), parametrai, 3–5 test variantai.
4. **Generavimas + iteracijos:** Bazinis promptas → analizė → korekcijos („šviesesnis“, „mažiau teksto“) → kartoti.
5. **Post-processing:** Upscaling, spalvų korekcija, retušas, formato optimizavimas.

**Kas dar padaro profesionalų lygį:** Acceptance criteria (priėmimo kriterijai – kompozicija, personažo tęstinumas, žinutės aiškumas, brand safety); A/B test protokolas (jau §5a.1); promptų biblioteka pagal use-case (žr. §3.5 MASTER ir ready prompts).

### 3.5 Praktika: #1000Books – knygos iliustracijos pipeline (optional)

**Seka (divergence → convergence):** (1) Knygos pavadinimas + autorius + santrauka (iki ~4096 tokenų). (2) Rolė: dailininkas → sugeneruok 5 iliustracijos koncepcijas. (3) Išrink geriausią. (4) Rolė: promptų inžinierius → sukurk text-to-image prompt. (5) Copy–paste į Gemini/ChatGPT/Ideogram/Leonardo ir pan. Vertė: teisingas „pirma idėjos, tada promptas“ procesas.

**Kas trūksta, kad veiktų profesionaliai:** Vertinimo kriterijai (kompozicija, personažo tęstinumas, žinutės aiškumas, brand safety); failų naming ir versijavimas (V1/V2/V3 + kas pasikeitė); teisių ir panaudojimo gairės (žr. §5a.2 Legal).

### 3.6 MASTER prompt šablonas ir ready prompts (optional)

**MASTER (universalus) – CopyButton:**

```
Subjektas: [ką rodoma].
Tikslas/use-case: [Awareness / Engagement / Conversion; pvz. social post, plakatas].
Auditorija: [kam].
Stilius: [fotorealistiškas / minimalistinis / …].
Kompozicija/kamera: [kadras, kampas].
Apšvietimas: [natūralus / studija / aukso valanda].
Spalvos/nuotaika: [paletė, jausmas].
Tekstas vizuale (jei reikia): tikslus tekstas + šriftas + vieta.
Format/ratio: [1:1 / 16:9 / 9:16].
Negative prompts: [ko vengti – pvz. be teksto, be veidų].
```

**Ready prompts (8 verslo scenarijų) – trumpi šablonai:**

| Use-case                | Prompt (įklijuoti ir užpildyti)                                                                                                                                        |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Logotipas**           | Sukurk logotipą [verslo sritis] įmonei [pavadinimas]. Stilius [minimalistinis/modernus], spalvos [x], fonas skaidrus/baltas, pateik 3 variantus.                       |
| **Produkto maketas**    | Sukurk fotorealistinį [produktas] maketą. Aplinka [studija/virtuvė], medžiagos [x], šviesa softbox, 3 kampai.                                                          |
| **Social post**         | Pagal šį tekstą [įklijuoti], sukurk iliustraciją LinkedIn/Facebook. Įvaizdis [korporatyvus], spalvos [x], formatas 1:1 ar 4:5, be teksto / su CTA tekstu [jei reikia]. |
| **Reklaminė kampanija** | Sugeneruok 5 vizualines kryptis reklamai [produktas/paslauga], tema [x], auditorija [x], stiliai [x], formatas Stories/Feed.                                           |
| **Naujienlaiškio hero** | Sukurk naujienlaiškio hero antraštės vizualą. Turinys: [įklijuoti]. Palik vietos tekstui viršuje 30% ploto, fonas švarus.                                              |
| **Brošiūra**            | Sukurk viršelio vizualą brošiūrai: pristatome [produktas/paslauga]. Stilius [x], aiški hierarchija, vieta logotipui.                                                   |
| **Plakatas**            | Sukurk ryškų plakatą renginiui [pavadinimas], data/vieta [x], stilius [x], įtrauk tikslų tekstą: '…'.                                                                  |
| **Blogo vizualas**      | Sugeneruok blogo cover image temai [x]. Stilius [x], be teksto, palik „negative space“ antraštei.                                                                      |

### 3.7 Vaizdo generatorius – sugeneruok savo promptą (interaktyvus, 13.37)

**UI copy SOT:** `modules.json` skaidrės `13.37.content.tldr` ir `content.patikra` (EN – `modules-en-m13-m15.json`); forma lieka React komponente.

**Trumpai:** Interaktyvus įrankis, kuris padeda sudėlioti vaizdo promptą žingsnis po žingsnio: kampanijos kontekstas (tikslas, platforma, auditorija, tonas), vizualo esmė (objektas, stilius, apšvietimas, kamera, spalva) ir tekstų integracija (antraštė, CTA, šriftas). Rezultatas – vienas paruoštas promptas, kurį galima nukopijuoti ir įklijuoti į bet kurį vaizdų generavimo įrankį.

**Ryšys su 13.35 (MASTER):** MASTER šablonas (§3.6) – universalus, bet reikalauja pačiam užpildyti laukus tekstu. Generatorius (13.37) – interaktyvūs laukai su dropdown pasirinkimais ir laisvais tekstais; promptas sudedamas automatiškai. Tai „Daryk dabar" skaidrė: vartotojas išbando visus principus (stilius, proporcijos, kompozicija) viename įrankyje.

**Kaip veikia:**

1. **Kampanijos kontekstas:** Kampanijos tikslas (laisvas laukas), platforma (Instagram, LinkedIn, Facebook, Web, Print), auditorija (laisvas), prekės ženklo tonas (Premium, Bold, Minimalistinis, Žaismingas, Ekspertiškas).
2. **Vizualo esmė:** Kas vaizduojama (laisvas), stilius (tikroviška nuotrauka, 3D, kinematografinis, mados žurnalo, minimalistinė iliustracija), apšvietimas (cinematic, minkšta dienos, auksinė valanda, studija, neonas), kameros kampas (close-up, akių lygis, flatlay, platus, hero shot), dominuojanti spalva (laisvas).
3. **Tekstų integracija (neprivaloma):** Antraštė, kvietimas veikti (CTA), teksto pozicija (centras, viršus, apačia, dinaminis), šrifto stilius (modernus, prabangus, minimalistinis, rankraštinis), kontrastas.

**Rezultatas:** Vienas sugeneruotas promptas – nukopijuok ir įklijuok į Ideogram, Leonardo.ai, Midjourney, ChatGPT (DALL·E), Adobe Firefly arba Canva AI. Paspaudus ant įrankio kortelės – promptas nukopijuojamas automatiškai ir atsidaro naujas skirtukas.

**Patikra:** Ar sugeneruotas promptas apima bent 3 elementus (objektas, stilius, proporcijos)? Ar rezultatas atitiko lūkesčius? Jei ne – grįžk ir pakeisk parametrus.

**Kur pritaikyti:** Socialinių tinklų vizualai, reklamos maketai, pristatymų iliustracijos, blogo viršeliai, naujienlaiškių hero vaizdai.

---

## 4. Blokas 2 – Video generavimas

**Kodėl DI video verta dėmesio (trumpai):** Mažiau įrangos ir aktorių; greitis ir mastelis; personalizavimas. Tinka: vidiniai mokymai, saugos instrukcijos, reklamos. _Procentų be šaltinio vengti – žr. §5a._

**Video workflow (2026):** Brief → storyboard stills → reference lock → **3–5 s I2V klipai** → (audio-first VO) → montažas. Ne: vienas ilgas text-to-video one-shot be plano.

### 4.1 Scenarijus trumpam vaizdo įrašui (13.4)

**Trumpai:** Trumpas vaizdo įrašas reikalauja aiškaus scenarijaus: kas vyksta, kiek sekundžių, tonas, kamera. Geriau **2–4 trumpi klipai (3–5 s)** nei vienas 20–30 s bandymas – kokybė ir kontrolė aukštesnė.

**Storyboard prieš mokėjimą (MUST):** Pirma užrakink still/keyframe (žr. 13.12). Video modelis geriausiai atlieka **judesį ir laiką**, ne vizualinį turinį iš nulio.

**Image → video grandinė (MUST):** Hero / keyframe → I2V (Runway, Kling, Veo, Seedance, Sora) → montažas. **Audio-first hint:** jei bus VO, pirmiausia užfiksuok VO trukmę – tada kirpk klipus pagal audio, ne atvirkščiai.

**Daryk dabar:** Parašyk 2–3 sakinius scenarijui **vienam** 3–5 s kadrui. Nukopijuok šabloną.

**Kopijuojamas promptas (CopyButton):**

```
Klipas 3–5 s (ne ilgesnis).
Scenarijus: [kas vyksta šiame kadre].
Kamera: [lėtai į priekį / šonu / stabiliai / crane up].
Tonas: [profesionalus / dinamiškas / ramus].
Startas: image-to-video iš hero keyframe. Same style, same colors.
```

**Kopijuojama grandinė – vaizdas → video (CopyButton):**

```
1) Sukurk hero vaizdą: [OBJEKTAS], aplinka [KONTEKSTAS], stilius [STILIUS], proporcijos 16:9 arba 9:16, be teksto vaizde.
2) Animacija iš šio vaizdo: 3–5 sekundės. Kamera juda […], objektas [ką daro]. Same character/product, same style, same color palette.
3) (Jei reikia ilgesnio) Pakartok 2) su antru keyframe – vėliau sumontuok.
```

**Patikra image → video:** Ar pradžia panaši į hero? Ar produktas/personažas neišsikraipė? Jei ne – supaprastink sceną arba stiprink reference.

**Kur pritaikyti:** Reklaminiai klipai, Reels/TikTok, pristatymų intros.

**Consistency keliuose kadruose:** Tas pats reference + „same product / same style“ (žr. 13.32). Venk realių veidų/balsų be sutikimo (13.101).

### 4.2 Įrankiai, formatas ir CPI (13.5)

**UI (modules.json):** Accent „Kodėl verta ir ką nurodyti“; collapsible „2026 video įrankių matrica“; collapsible „Visi video įrankiai“.

**Trumpai:** Skirtingi modeliai priima skirtingą inputų skaičių (1–2 vs daug refs). Matuok **CPI** (cost per usable clip) = visos generavimo + retry kainos / tinkamų klipų skaičius – ne tik €/sekundę.

**2026 tool matrix (MUST lentelė):**

| Use case                          | Įrankis             | Kodėl                                              |
| --------------------------------- | ------------------- | -------------------------------------------------- |
| Directed motion + daug refs       | Seedance 2.0        | Daug image/video/audio inputų vienoje generacijoje |
| Balance kokybė/kaina              | Kling 3.0           | Stiprus I2V mokymuisi ir reklamoms                 |
| Aukščiausia kokybė + native audio | Veo 3.1             | Kinematografija, sinchronizuotas garsas            |
| OpenAI ekosistema                 | Sora 2              | Realistiška fizika, 1–2 image refs                 |
| Avatarai / mokymai                | Synthesia           | Kalbantys avatarai                                 |
| Social šablonai                   | InVideo / CapCut AI | Greitas montažas                                   |

**Daryk dabar:** Pasirink vieną įrankį, sugeneruok **vieną** 3–5 s I2V klipą.

**Kopijuojamas promptas (CopyButton):**

```
Vaizdo klipas iš keyframe: [1–2 sakiniai veiksmo].
Formatas: [16:9 / 9:16]. Trukmė: 3–5 sek. Stilius: [nurodyk].
CPI pastaba: kiek retry prireikė iki usable? [N]
```

**Patikra:** Ar failas atsisiuntėmas? Ar komercinės teisės OK? Koks CPI (retry įskaičiuoti)?

**Įrankiai (tools.json):** Seedance, Kling, Veo 3.1, Sora 2, Runway, Pika, Luma, Synthesia, InVideo.

**Video prompt .json šablonas (optional):** id, use_case, duration_s (3–5), main_subject, scene, visual_style, camera_movement, lighting, aspect_ratio, reference_ids, negative, audio, brand_guidelines, safety_flags, cpi_note.

### 4.2a Savitikra: video promptas ir formatas (13.51)

**Tikslas:** Patikra po 13.5, prieš post-prod / garsą.

**Klausimai (warm-up-quiz):**

1. **Kas būtina trumpam vaizdo promptui?** → scenarijus, trukmė (3–5 s), formatas, tonas.
2. **Kada rinktis 9:16?** → Stories / Reels / TikTok.
3. **Ką patikrinti prieš viešą publikaciją?** → teisės, veidų/balsų sutikimas, brand.

**Remediation:** Grįžk į 13.4–13.5; sutrumpink iki vienos aiškios 3–5 s scenos.

### 4.3 Post-production (13.52) – MUST

**Trumpai:** DI video = **žalia medžiaga (raw)**, ne galutinis deliverable. Profesionali praktika: cut 3–5 s klipus, color grade, tekstas/overlay, audio mix, export.

**Minimalus CapCut / Premiere checklist:**

1. Surink 2–4 klipus chronologija pagal scenarijų / VO.
2. Nukirpk silpnus kadrus; palik hook pirmose 1–2 s.
3. Spalvos / ekspozicija vienoda.
4. Uždėk VO arba bed; SFX perėjimams.
5. Loudness orientyras: ~−14 LUFS (muzika/apps) arba ~−16 (streaming VO mix) – klausyk ausimis, ne tik skaičiais.
6. Export pagal platformą (9:16 / 16:9).

**Daryk dabar:** Parašyk 4 eilučių montažo planą savo mini klipui.

**Kopijuojamas šablonas:**

```
Montažo planas (15–30 s):
0–3 s: [hook klipas]
3–8 s: [produktas / nauda]
8–15 s: [įrodymas / detalė]
Pabaiga: [CTA kadras + tekstas]
Garsas: [VO / bed] | teisės: [licensed]
```

**Patikra:** Ar be DI „magic“ klipas vis dar skaitomas kaip istorija? Ar garsas neslopina VO?

---

## 5. Blokas 3 – Garsas (audio-first)

**Pagrindinė 2026 žinutė:** **Audio-first** – scenarijus ir VO (arba bent bed trukmė) **prieš** brangų video. Jei audio „plaukioja“, video atrodys atsijungęs.

**Trys audio tipai (triada):**

| Tipas              | Paskirtis                       | Tipiniai įrankiai 2026                                                          |
| ------------------ | ------------------------------- | ------------------------------------------------------------------------------- |
| **VO** (voiceover) | Naracija, pacing, emocija       | ElevenLabs                                                                      |
| **SFX**            | Perėjimai, UI garsai, atmosfera | ElevenLabs SFX, Stable Audio                                                    |
| **Music bed**      | Foninė muzika                   | ElevenMusic, Soundraw, Beatoven (komercinė sauga); Suno/Udio – demo / ne-client |

**Komercinė taisyklė:** Klientui / reklamai / monetizacijai → **licensed stack** (ElevenMusic, Soundraw, Beatoven). Asmeniniai testai / viral demo → Suno/Udio OK, bet ne „tikriausiai niekas nepagaus“.

### 5.1 Muzikos ir VO aprašymas (13.6)

**Trumpai (modules.json):** Audio-first: pirma VO arba bed trukmė, tada video kirpimai. Muzikai – nuotaika, stilius, tempas, instrumentai; visada patikrink licenciją.

**Prompt struktūra (muzika):** Mood + Genre + Tempo + Instrumentation + Vocal (none for bed) + Structure + Platform + **license intent (commercial / demo)**.

**TOP įrankiai – pozicionavimas:**

| Įrankis                 | Stiprybės                                        | Kam tinka                     |
| ----------------------- | ------------------------------------------------ | ----------------------------- |
| **ElevenLabs**          | VO, cloning (su sutikimu), SFX                   | Narration, ads VO             |
| **ElevenMusic**         | Licensed training data, vieninga audio platforma | Client / YouTube monetization |
| **Soundraw / Beatoven** | Royalty-friendly beds, video fonas               | Reklama, podcast intro        |
| **Suno / Udio**         | Pilna daina, greitas demo                        | Asmeniniai testai, ne-client  |

**Daryk dabar:** Jei turi VO – pirmiausia sugeneruok / įrašyk VO. Jei tik bed – nukopijuok muzikos promptą.

**Kopijuojamas promptas – bed (CopyButton):**

```
Sukurk foninės muzikos fragmentą, 30–60 sekundžių.
Nuotaika: [ramus / energingas]. Stilius: [akustinė / elektroninė / pianinas].
Tempo: [lėtas / vidutinis]. Be vokalo. Naudojimas: [reklama / prezentacija] – reikia komercinės licencijos.
```

**Kopijuojamas promptas – VO (CopyButton):**

```
Voiceover, [LT/EN], tonas [profesionalus / draugiškas], tempo [ramus].
Tekstas: [įklijuok 2–4 sakinius scenarijaus].
Be foninės muzikos faile – tik balsas. Vėliau sumaišysiu su bed.
```

**MASTER muzikos promptas (EN, CopyButton):**

```
Create a [genre] track,
mood: [emotion],
tempo: [bpm or speed],
instruments: [list],
vocal: none,
structure: intro – bed – soft outro,
target platform: [YouTube/TikTok/ads],
goal: background / branding,
license intent: commercial,
production quality: professional.
```

**Patikra:** Ar bed neslopina VO? Ar licencija leidžia reklamą?

**Kur pritaikyti:** Reklamos VO, podcast intro, video bed, UI SFX.

### 5.2 Garsai, licencijos ir loudness (13.7)

**Trumpai:** Atskirk SFX nuo muzikos. Komerciniam darbui – licensed įrankiai. Orientyras loudness: ~−14 LUFS (muzika) / ~−16 (VO mix) – galutinį sprendimą priimk klausydamas.

**Daryk dabar:** Prieš viešą naudojimą atidaryk ToS / license puslapį; užsirašyk „commercial OK?“ taip/ne.

**Kopijuojamas promptas – SFX:**

```
Sukurk trumpą garsą: [pvz. „švelnus perėjimo whoosh, 1 sekunda“].
Formatas: WAV arba MP3. Be muzikos – tik SFX.
```

**Patikra:** Atsisiuntimas OK? Licencija OK reklamai / YouTube?

**Įrankiai (tools.json):** ElevenLabs (VO/SFX), ElevenMusic, Soundraw, Beatoven, Suno, Udio, Boomy, Mubert, AIVA.

### 5.3 Ready prompts – muzika, tekstai, viršeliai, video (optional)

**Suno:** Viral lietuviškas hit – _Modern techno trap, melancholic but powerful, male vocal, Lithuanian lyrics, theme: summer ending, strong catchy chorus, TikTok hook in first 15 seconds, professional mix, radio ready._ Gaming kanalui – _Aggressive rap trap, dark cyberpunk mood, 140 bpm, lyrics about leveling up, epic drop at 0:40, YouTube gaming intro style._ Podcast intro – _Minimal ambient electronic intro, inspiring, futuristic, no vocals, 20 seconds, soft build up._

**Boomy:** Lo-fi fonas – _Lo-fi chillhop instrumental, rain background, soft piano, nostalgic but calming, study YouTube stream._ Corporate video – _Upbeat corporate instrumental, clean modern synth, light percussion, optimistic, 2 minutes, tech presentation._

**Soundraw:** Reklamos takelis – _Mood: energetic and inspiring. Genre: electronic pop. Length: 45 seconds. Use case: startup product launch. Dynamic build up, climax at 0:30._ Meditacija – _Mood: calm, deep relaxation. Genre: ambient. Length: 10 minutes. Slow evolving pads, no percussion._

**Udio:** Remix – _Take uploaded melody, transform into modern deep house, groovy bassline, female vocal hook, club energy, 4 minutes._ Albumo prototipas – _Alternative electronic rock, moody atmosphere, live drum feeling, expressive male vocal, concept album about digital loneliness._

**Beatoven.ai:** YouTube vlog – _Emotion: uplifting and adventurous. Tempo: medium. Instruments: acoustic guitar + light percussion. Use case: travel vlog. Subtle cinematic feel._

**Tekstų generavimas (ChatGPT):** Lietuviškas rap – _Parašyk lietuvišką rap tekstą apie DI revoliuciją, agresyvus bet motyvuojantis, aiškus priedainis, 4 posmai, šiuolaikinis slangas._ Pop hitas – _Write catchy pop lyrics, theme: digital love, simple repetitive chorus, radio friendly, modern 2026 vibe._

**Albumo viršelis (DALL·E):** _Futuristic Lithuanian rapper, cyberpunk Vilnius skyline, neon lights, album cover design, dark purple and electric blue, high detail, cinematic lighting._

**Muzikos video (bendrai):** _Cinematic music video, dark urban setting, slow motion, neon reflections, moody atmosphere, professional lighting, 4K._

**Tolimesnė plėtra (P2, ne šiame atnaujinime):** Hybrid AI + real B-roll kaip atskira skaidrė; automation Zapier; ComfyUI/LoRA advanced.

---

## 5a. Verslas ir rizikos (13.10) – MUST

**Techninis ID `modules.json`:** skaidrei naudoti **`13.101`** (unikalus JS skaičius). JSON reikšmė **13.10** suparsinama kaip **13.1** ir sutaptų su skaidre „Turinio inžinerijos kelias – ką čia rasite“. Dokumentacijoje temą vis dar galima vadinti **13.10**.

**Kampanijos vaizdams būtina:** KPI matavimas, A/B testavimas, teisės ir rizikos. Be šito nėra verslo mokymo.

**Struktūra UI (modules.json):** trumpas accent „Trumpai“; **matoma** brand sekcija „Teisės ir rizikos (privaloma)“ (4 punktai); collapsible „Rodikliai ir A/B testas (plačiau)“; matomas A/B CopyButton; collapsible „Teisės, rizikos ir verslas (plačiau)“; collapsible „Prieš publikuojant (QA ir versijos)“; matomas „Top 3 pitfalls“.

### 5a.1 KPI ir A/B testavimo sistema (MUST)

**Privalomi rodikliai:** CTR (paspaudimų dalis nuo parodymų), CVR (konversijų dalis nuo lankytojų), CPM (kaina už 1000 parodymų), scroll stop rate (kur sustoja slinkti), heatmap logika (kur žiūri, kur spaudžia).

**Mokyti:** Kaip generuoti **3–5 variantus** vienam testui (skirtingi vaizdai ar antraštės). Kaip formuluoti **testavimo hipotezę** (pvz. „Manau, kad variantas A su veidu gaus didesnį CTR nei variantas B su produktu“).

**Kopijuojamas šablonas – A/B hipotezė:**

```
Testas: [A vs B – pvz. „Vaizdas A: žmogus naudoja produktą / Vaizdas B: tik produktas ant balto fono“].
Hipotezė: [pvz. „Variantas A gaus didesnį paspaudimų skaičių (CTR), nes rodo naudojimą“].
Metrika: CTR (arba CVR, scroll stop). Trukmė: [pvz. 7 dienos]. Auditorija: [kam rodoma].
```

### 5a.2 Legal / Risk (MUST)

**Marketinge būtina:** Autorinių teisių rizika (sugeneruotas turinys – kieno autorius?; trečiųjų šalių stilius/veidus); deepfake rizika (veidas, balsas – atpažimumas ir sutikimas); prekės ženklų naudojimas (logotipai, prekės pavadinimai – nepažeisti); GDPR vaizduose (žmonių atpažimumas, sutikimas publikavimui). Verslo pasaulyje kritiška – prieš publikavimą patikrinti paslaugos taisykles ir, jei reikia, teisininką.

**Provenance / disclosure (MUST, 2026):** EU AI Act Art. 50 reikalauja, kad sintetinį turinį būtų galima atpažinti. Praktinis stack:

1. **C2PA Content Credentials** – pasirašytas metadata manifestas (kas sukūrė, koks modelis, ar DI).
2. **Neišnykstantis watermark** (pvz. SynthID ar ekvivalentas) – kai social platformos nuima metadata.
3. **Žmogui matoma žyma** – kur reikalaujama (reklama, politinis turinys, platformos politika).

**Soft Binding:** watermark + remote manifest lookup, kai C2PA failas „nuplėštas“ re-encode metu. Mokiniui užtenka checklisto: ar įrankis žymi output? ar brief’e yra disclosure eilutė?

**Daryk dabar:** Prieš reklamą – ToS + veidai/balsai + **disclosure** (C2PA/žyma). Užsirašyk vieną sakinį: „Šis vizualas / video sukurtas su DI; įrankis: [X].“

### 5a.3 Verslo argumentai ir use-cases

**Kur pritaikyti:** A/B testai, produktų vizualizacija, prototipai ir katalogai, prezentacijos, iliustracijos ir infografikai, socialinio turinio nuoseklumas. Vizualus turinys dažnai pritraukia daugiau dėmesio nei vien tekstas – naudok tai kampanijų ir postų planavime.

**Įspėjimas (reputacinė rizika):** Dokumentuose ir skaidrėse kartais cituojami procentai (pvz. „laiko sutaupymas 90%“, „vizualas pritraukia 94% daugiau dėmesio“) **be šaltinių**. Mokymuose ir klientams geriau rašyti „iki X%“, „tipiškai“ arba pridėti šaltinį – kitaip gali kilti abejonių dėl patikimumo.

### 5a.4 QA checklist (prieš publikavimą)

Patikrink: (1) Tekstas vaize be klaidų. (2) Brand spalvos ir tonas. (3) Formatas. (4) Žinutė / kampanijos tikslas. (5) Brand safety. (6) Teisės (§5a.2). (7) **Disclosure / C2PA / watermark** jei reikalaujama. (8) Reference lock išlaikytas (produktas/personažas).

**Vertinimo rubrika (MUST):** Prieš publikuodamas įvertink rezultatą pagal 3 kriterijus: (1) brand atitikimas – ar spalvos, tonas ir stilius dera su prekės ženklu; (2) žinutės aiškumas – ar per 2–3 sekundes suprantama, ką nori pasakyti; (3) platformos tinkamumas – ar formatas, teksto kiekis ir pirmas kadras tinka pasirinktai platformai. Tai paprastas „generatorius + vertintojas“ principas: sugeneruoji, tada paprašai DI įvertinti pagal taisykles.

**Kopijuojamas vertintojo promptas:**

```
Įvertink šį turinio artefaktą pagal 3 kriterijus: brand atitikimas, žinutės aiškumas, platformos tinkamumas.
Kontekstas: [kampanijos tikslas, auditorija, platforma].
Artefaktas / aprašymas: [įklijuok promptą arba aprašyk gautą rezultatą].
Grąžink lentelę: kriterijus, balas 1–5, kas gerai, 1–2 konkretūs pataisymai.
```

### 5a.5 Versijavimas

Failų naming ir versijavimas: V1, V2, V3 + viena eilutė „kas pasikeitė prompte“ (pvz. „V2: pridėtas aukso valandos apšvietimas“). Tai palengvina A/B analizę ir pakartotinį naudojimą.

### 5a.6 Top 3 pitfalls (ko vengti)

1. **Per abstraktūs promptai** → gauni atsitiktinį stilių ir mažą nuspėjamumą. Sprendimas: konkrečius daiktavardžius, aiškų stilių, struktūrą (žr. §3.1, MASTER šablonas §3.6).
2. **Tekstas vizuale be kontrolės** → klaidos, keisti šriftai, netelpa. Sprendimas: Ideogram arba DALL·E + aiški tipografijos užduotis; mažiau teksto vaize arba „negative space“ antraštei.
3. **Video įrankių ribojimai** (trukmė, kompleksiniai veiksmai) → reikia trumpų scenų ir labai tikslių užklausų; neplanuok ilgų filmukų vienu promptu.

---

## 5b. Workflow: nuo brief iki publikacijos (13.11) – MUST

**Ryšys su 13.35:** Pilname „Trumpai“ tekste (modules.json) – nuoroda į neprivalomą skaidrę **13.35** kaip į techninį 5 žingsnių vaizdų pipeline; čia – **verslo** ciklas nuo brief iki publikacijos.

Pilnas verslo ciklas (techninį medijos pipeline žr. **13.12**):

1. **Marketing brief** – kam, kokiam tikslui (Awareness / Engagement / Conversion), kokia auditorija.
2. **Prompt generavimas** – pagal brief, brand consistency ir reference lock (13.32).
3. **Variantai** – 3–5 vaizdų ar video variantų testui (trumpi I2V klipai).
4. **Iteracija** – gerinimas pagal grįžtamąjį ryšį; matuok CPI video.
5. **Adaptacija platformoms** – LinkedIn, Instagram, TikTok, Meta Ads, Google Display.
6. **Testavimas** – A/B, hipotezė, KPI (CTR, CVR, scroll stop).
7. **Optimizacija** – remiantis rezultatais, pakartoti ciklą + disclosure.

Jei dirbi komandoje, vaizdas, scenarijus ir garsas gali būti ruošiami lygiagrečiai **tik** kai visi remiasi tuo pačiu brief, brand ir (jei reikia) audio-first VO trukme.

**Kopijuojamas šablonas – brief į promptą:**

```
Brief: Tikslas [Awareness / Engagement / Conversion]. Auditorija: [aprašyk]. Platforma: [pvz. Instagram 1:1].
Vaizdo promptas: [subjektas] + [veiksmas/kontekstas] + [aplinka]. Stilius: [brand – spalvos, tonas].
Brand: [1–2 sakiniai – spalvos, tipografija, nuotaika]. Variantų skaičius: 3–5 (skirtingi kampai ar kompozicijos).
```

### 5b.1 SHOULD – stipriai pakelia lygį

| #      | Elementas                      | Kur / kaip                                                                                                                                                                                                             |
| ------ | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **6**  | **Social platform adaptacija** | LinkedIn, Instagram, TikTok, Meta Ads, Google Display – skiriasi kadras, teksto kiekis, fokusas, kontrastas, emocija. Nurodyk prompte platformą arba formatą (pvz. „vertikalus 9:16, stiprus pirmas kadras – TikTok“). |
| **7**  | **Funnel thinking**            | TOFU (viršutinis – atpažįstamumas) / MOFU (vidurys – įsitraukimas) / BOFU (apatinis – konversija). Awareness vizualas ≠ Conversion vizualas – skirtingi tikslai, skirtingas vaizdo pasirinkimas.                       |
| **8**  | **Data-driven promptavimas**   | Kaip naudoti praeitos kampanijos duomenis, heatmap analizę, scroll analizę – promptas pagrįstas duomenimis, ne tik intuicija.                                                                                          |
| **9**  | **Automation**                 | Integracijos: GPT → Canva → Zapier → Ads manager; variantų generavimas masiškai. Marketingui svarbus mastelis.                                                                                                         |
| **10** | **Storyselling**               | Vaizdas integruojamas su antrašte, hook'u, CTA – ne izoliuotas nuo copywriting. Mokymas: kaip vaizdas „parduoda“ kartu su tekstu.                                                                                      |

**Sutrumpintas blokas UI:** šiuos SHOULD elementus geriausia rodyti kaip vieną collapsible sekciją: „Platforma, funnel ir tekstas kartu“. Viduje – TOFU/MOFU/BOFU paprastai: atpažįstamumas, svarstymas, veiksmas; ir priminimas, kad vizualas turi derėti su antrašte, hook'u ir CTA.

---

## 5c. Modulio 14 testas (LT, modules.json)

- **Intro (140):** `thresholdExplanation` – „rekomenduojame **peržiūrėti** … Modulio 13 **skaidres**“; `firstActionCTA` – **12 klausimų** apie vaizdus, video, garsą, pipeline, rizikas, workflow, image→video, audio-first, licencijas, C2PA.
- **Klausimai (141):** Esami m14-q1…q8 + nauji:
  - **m14-q9** – kodėl pipeline / storyboard prieš brangų video (`relatedSlideId`: **13.12**);
  - **m14-q10** – kas yra audio-first (`relatedSlideId`: **13.6**);
  - **m14-q11** – kada ElevenMusic/Soundraw vs Suno klientui (`relatedSlideId`: **13.7**);
  - **m14-q12** – C2PA / disclosure prieš publikaciją (`relatedSlideId`: **13.101**).
- **Rezultatai (142):** `useCaseBlock` – **„Kitas žingsnis: Modulis 15“**.

---

## 6. Žodynėlis (optional skaidrė 13.8)

Viena skaidrė arba collapsible „Nori suprasti detaliau?“ – 8–10 terminų:

| Terminas                         | Apibrėžimas (vienas sakinys)                                                                                                                                               |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Vaizdo promptas**              | Tekstinis aprašymas, pagal kurį DI sukuria vaizdą (subjektas, stilius, proporcijos).                                                                                       |
| **Aspect ratio (proporcijos)**   | Vaizdo ar vaizdo įrašo santykis (pvz. 16:9 platus, 1:1 kvadratas, 9:16 vertikalus).                                                                                        |
| **Scenarijus vaizdui**           | Trumpas tekstas, aprašantis, kas vyksta vaizde arba vaizdo įraše (kadrai, veiksmas).                                                                                       |
| **Audio-first**                  | Pirma užbaigi VO (arba bed trukmę), tada kirpi / generuoji video pagal audio pacing.                                                                                       |
| **Reference lock**               | 3–5 reference vaizdai + taisyklė „same product/character/style“, kad tapatybė neplaukiotų.                                                                                 |
| **CPI**                          | Cost per usable clip – kaina už tinkamą klipą (įskaitant retry), ne tik € už sekundę.                                                                                      |
| **C2PA**                         | Content Credentials – pasirašytas provenance metadata, kas ir kaip sukūrė turinį.                                                                                          |
| **Soft Binding / SynthID**       | Neišnykstantis watermark, kai social nuima C2PA metadata; leidžia atkurti provenance.                                                                                      |
| **BPM**                          | Taktų per minutę – muzikos tempo matas (lėtas ~60–80, greitas ~120–140).                                                                                                   |
| **Nuotaika (mood)**              | Jausmas, kurį skleidžia vaizdas ar muzika (ramus, energingas, įtemptas).                                                                                                   |
| **Stilius**                      | Vizualus ar garso išvaizdos tipas (fotorealistiškas, akrilas, pop, akustinė).                                                                                              |
| **Naudojimo teisės / licencija** | Ar sugeneruotą turinį galima naudoti komerciniu tikslu (reklama, produktas).                                                                                               |
| **Foninė muzika**                | Muzika fone (prezentacijose, vaizdo įrašuose), dažnai be vokalo.                                                                                                           |
| **Trečdalių taisyklė**           | Kompozicijos principas: įsivaizduok 3×3 tinklelį; pagrindinis objektas – sankirtos taškuose (ne centre).                                                                   |
| **Kameros kampas**               | Iš kur „žiūri“ kamera: lygus akims (neutralu), iš viršaus (silpnina), iš apačios (suteikia galios), oberžas (iš viršaus), POV („tavo“ akimis). Kadras = emocijos kontrolė. |
| **Naratyvinis vaizdas**          | Vaizdas, kuris pasakoja istoriją arba konceptą (pvz. mitologija + modernybė, emocija per metaforą). „Kas čia buvo?“ – klausimas, kurį atsako kompozicija.                  |
| **CTR (paspaudimų dalis)**       | Kiek procentų žmonių, kurie pamatė reklamą ar vaizdą, jį paspaudė. Svarbus rodiklis reklamų ir banerių vertinimui.                                                         |
| **CVR (konversijų dalis)**       | Kiek lankytojų atliko norimą veiksmą (pirkimas, registracija). Skiriasi nuo CTR – matuojamas po paspaudimo.                                                                |
| **CPM (kaina už 1000 parodymų)** | Kiek kainuoja 1000 reklamos ar vaizdo parodymų. Naudinga lyginti skirtingas platformas ir formatus.                                                                        |
| **Demokratizacija (muzikoje)**   | Kūryba tampa prieinama daugiau žmonių – technologija (DI, DAW, streaming) sumažina įgūdžių ir įrangos barjerą.                                                             |

---

## 7. Modulio 13 santrauka (summary, 5 blokų modelis)

Pagal [docs/development/SUMMARY_SLIDE_SPEC.md](development/SUMMARY_SLIDE_SPEC.md):

| #   | Blokas               | Turinys                                                                                                                                                                |
| --- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Celebration Hero     | „Ką išmokote“ – Vaizdų, video ir muzikos generavimas su DI; promptų principai, įrankiai, 3 blokai. 3 statistikos: pvz. „3 blokai“, „3 promptų šablonai“, „6+ įrankių“. |
| 2   | Žinių kortelės       | Max 3: (1) Vaizdų promptai – stilius, proporcijos, (2) Video – scenarijus, formatas, (3) Muzika – nuotaika, stilius, naudojimo teisės.                                 |
| 3   | Refleksijos promptas | Copyable; 3 klausimai (Apply, Analyze, Create) – kur pritaikysi vaizdus/video/muziką, kas buvo naujausia, ką išbandysi pirmiausia.                                     |
| 4   | Kitas žingsnis CTA   | „Pereikite prie Modulio 14: Žinių patikrinimas (Turinio kelias)“ – testas prieš projektą.                                                                              |
| 5   | Motyvacinis footer   | Tagline: „Vaizdas + video + muzika = vienas kelias turinio inžinerijai.“                                                                                               |

**Pirmas veiksmas po modulio:** Šiandien atidaryk vieną vaizdų generavimo įrankį ir sugeneruok vieną vaizdą pagal savo aprašymą (stilius, proporcijos).

---

## 8. Modulis 14 – Testas

### 8.1 test-intro

- **whyBenefit:** Po šio testo žinosi, ar esi pasiruošęs finaliniam Turinio inžinerijos projektui (Modulis 15).
- **duration:** ~12–15 min.
- **firstActionCTA:** Atsakyk į 8 klausimus – apie vaizdų, video ir muzikos promptus, įrankius, rizikas, workflow ir image → video grandinę.
- **microWinPhrase:** „Kiekvienas teisingas atsakymas parodo, kad moki formuluoti turinio promptus.“
- **Slenksčiai:** ≥70 % – rekomenduojama pereiti prie Modulio 15 (projektas). &lt;70 % – peržiūrėk rekomenduojamas M13 skaidres (remediation pagal klausimą).

### 8.2 test-section ir test-results

- **Klausimai:** 8 klausimai – MCQ ir scenarijų tipas („Duota situacija – kuris promptas tinkamiausias vaizdui / vaizdo įrašui / muzikai?“). Remediation – nuoroda į konkretų M13 slide id. Nauji klausimai: **m14-q7** apie conversion vizualą Instagram 9:16 (`relatedSlideId`: 13.1 arba 13.3); **m14-q8** apie image → video grandinę (`relatedSlideId`: 13.4).
- **test-results:** passedMessage, failedMessage, **useCaseBlock** („Kur pritaikyti?“ – accent): „Turinio inžinerijos žinias gali pritaikyti: rinkodaros vizualai, socialinio turinio vaizdai ir vaizdo įrašai, foninė muzika projektams.“ thresholdExplanation: „Pasiekę ≥70 % galite pereiti prie Modulio 15 (projektas). Jei mažiau – rekomenduojame peržiūrėti Modulio 13 skaidres.“

---

## 9. Modulis 15 – Praktika (finalinis projektas)

### 9.1 practice-intro

- **whyBenefit:** Po projekto turėsi hero vaizdą su naudotu promptu ir brief; jei nori – mini kampanijos paketą (video + garsas + montažas).
- **duration:** ~20 min greitas startas / ~60–90 min pilnas kelias.
- **firstActionCTA:** Pradėk nuo greito starto: sukurk vieną hero vaizdą su naudotu promptu. Jei nori pilno kelio – tęsk į video, garsą ir montažą.
- **minScenariosToComplete:** 1 (privaloma skaidrė **150.5**).
- **recommendedSlideIds:** `[150.5, 150.25]` (core); 151–154 – optional full.
- **primaryPathIntro:** Privalomas minimumas – greitas startas (150.5). Po jo greitame kelyje galima eiti į santrauką (158). Pilnas kelias (optional) – 151 → 152 → 153 → **154**.

### 9.1a Greitas startas: vienas hero vaizdas (150.5)

**Tikslas:** Per ~20 min turėti vieną hero vaizdą, naudotą promptą ir 2 eilučių brief. Tai privalomas minimumas M15 užbaigimui.

**Artefaktas:** Hero vaizdas + promptas + trumpas brief (tikslas, auditorija, platforma).

**Kopijuojamas promptas:**

```
Brief: tikslas [Awareness / Engagement / Conversion], auditorija [kam], platforma [kur bus naudojama].
Sukurk hero vaizdą: [OBJEKTAS ir veiksmas], aplinka [KONTEKSTAS], stilius [STILIUS], proporcijos [1:1 / 16:9 / 9:16].
Brand: spalvos [X], tonas [profesionalus / draugiškas / premium]. Be teksto vaizde, jei jo nereikia.
```

### 9.2 Scenarijai (practice-scenario)

**MUST – privalomas minimumas (150.5):**

| #     | Scenarijus              | Aprašymas                                                                  | Artefaktas                  |
| ----- | ----------------------- | -------------------------------------------------------------------------- | --------------------------- |
| **0** | Greitas startas (150.5) | Hero vaizdas + brief (tikslas, auditorija, platforma) + naudotas promptas. | Vaizdas + promptas + brief. |

**Optional – pilnas mini kampanijos kelias (151–154):**

| #     | Scenarijus                  | Aprašymas                                                  | Artefaktas                              |
| ----- | --------------------------- | ---------------------------------------------------------- | --------------------------------------- |
| **1** | Vaizdas (151)               | Keyframe pilnam keliui (arba reuse 150.5) + optional refs. | Vaizdas + promptas (+ refs).            |
| **2** | Trumpas vaizdo įrašas (152) | 3–5 s I2V iš hero keyframe (arba 2 klipai).                | Vaizdo įrašas / nuoroda + promptas.     |
| **3** | Garsas (153)                | VO arba 30–60 s bed + teisės.                              | Failas / nuoroda + promptas.            |
| **4** | Montažas (154)              | 15–30 s iš 2–4 klipų + VO/bed + CPI pastaba.               | Galutinis export / nuoroda + checklist. |

**Delivery-first:** Dalyvis **privalo** turėti 150.5 artefaktą. Video, garsas ir montažas – optional full kelias.

**Pilnas mini kampanijos kelias (optional):** (1) hero keyframe + refs, (2) 3–5 s I2V klipai, (3) VO/bed + teisės, (4) montažas 15–30 s, (5) disclosure.

**Delivery checklist:** brief; promptas; rezultatas/nuoroda; jei full – V1/V2; teisės; **refs?**; **disclosure?**; **CPI pastaba?** (video).

### 9.3 practice-summary

- 5 blokų modelis: Celebration Hero, žinių kortelės (ką išmokote M15), refleksijos promptas, **Kitas žingsnis** („Pirmas veiksmas per 24–48 val.“ – pvz. panaudok vieną promptą savo projekte).
- **useCaseBlock:** „Kur pritaikyti?“ – rinkodaros vizualai, socialinis turinys, foninė muzika, garsų efektai.
- **reflectionPrompt:** Copyable; 3 klausimai (Apply, Analyze, Create) + 1 patarimas.
- **Completion artefaktai (P2):** po Modulio 15 vartotojas uždirba **Turinio kelio atmintinę (PDF)** ir, jei Modulio 14 testas ≥70 %, **tier 5 sertifikatą – „Turinio inžinerijos kelias“**. Atmintinė turi apimti vaizdo, video ir muzikos promptų šablonus, teisių patikrą, delivery checklist ir 24–48 val. veiksmą. Sertifikatas aprašo tik M13–15 kelią, ne visą 15 modulių programą.

---

## 10. Nuorodos

- **Modulių atpažinimas:** [docs/CONTENT_MODULIU_ATPAZINIMAS.md](CONTENT_MODULIU_ATPAZINIMAS.md) §6.
- **Golden standard:** [docs/development/GOLDEN_STANDARD.md](development/GOLDEN_STANDARD.md).
- **Paprasta kalba:** [docs/development/PAPRASTOS_KALBOS_GAIRES.md](development/PAPRASTOS_KALBOS_GAIRES.md).
- **Santraukos 5 blokai:** [docs/development/SUMMARY_SLIDE_SPEC.md](development/SUMMARY_SLIDE_SPEC.md).
- **Skaidrių eilė (M13):** [docs/MODULIO_13_SKAIDRIU_EILES.md](MODULIO_13_SKAIDRIU_EILES.md).

---

## 11. MUST / SHOULD (turiniui)

### MUST (be šito marketingo mokymas neveiks)

| #     | Elementas                                                       | Vieta SOT / skaidrė                                                                    |
| ----- | --------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **1** | **Kampanijos tikslų modelis** (Objective → Visual Strategy)     | §2 – 13.1: Awareness / Engagement / Conversion.                                        |
| **2** | **KPI ir A/B testavimo sistema**                                | §5a.1 (13.101): CTR, CVR, CPM, scroll stop; 3–5 variantai; hipotezė.                   |
| **3** | **Brand consistency framework**                                 | §3.2 (13.3): Spalvos, tipografija, tonas, vizualinis identitetas.                      |
| **4** | **Legal / Risk + provenance**                                   | §5a.2 (13.101): Autorinės teisės, deepfake, GDPR, C2PA/SynthID/disclosure.             |
| **5** | **Workflow: nuo brief iki publikacijos**                        | §5b (13.11): Brief → Prompt → Variantai → Iteracija → Platformos → A/B → Optimizacija. |
| **6** | **Generatyvinės medijos pipeline**                              | §2.1 (13.12): Brief → stills → refs → I2V → garsas → edit → QA.                        |
| **7** | **Character / product consistency**                             | §3.2b (13.32): 3–5 refs, same-product lock.                                            |
| **8** | **Audio-first + triada**                                        | §5 (13.6–13.7): VO → bed/SFX; licensed vs demo.                                        |
| **9** | **Post-production**                                             | §4.3 (13.52): AI = raw; cut/grade/mix.                                                 |
| **+** | 3 blokai (vaizdai, video, garsas) + M15 artefaktas + M14 testas | + optional montažas 154.                                                               |

### SHOULD (stipriai pakelia lygį)

| #                                                 | Elementas                                                                          | Vieta                                                        |
| ------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| **6**                                             | Social platform adaptacija (LinkedIn, Instagram, TikTok, Meta Ads, Google Display) | §5b.1 – kadras, teksto kiekis, fokusas, kontrastas, emocija. |
| **7**                                             | Funnel thinking (TOFU / MOFU / BOFU)                                               | §5b.1 – Awareness vizualas ≠ Conversion vizualas.            |
| **8**                                             | Data-driven promptavimas (kampanijų duomenys, heatmap, scroll)                     | §5b.1 – promptas pagrįstas duomenimis.                       |
| **9**                                             | Automation (GPT → Canva → Zapier → Ads; masiški variantai)                         | §5b.1.                                                       |
| **10**                                            | Storyselling (vaizdas + antraštė, hook, CTA)                                       | §5b.1 – ne izoliuotas nuo copywriting.                       |
| Įrankių nuorodos, žodynėlis, refleksijos promptas | Kaip anksčiau (tools.json, 13.8, santrauka).                                       |
