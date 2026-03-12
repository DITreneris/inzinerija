# Turinio plėtra – Moduliai 13, 14, 15 (Turinio inžinerija)

> **Autorinė mokymo medžiaga © 2024–2026**  
> Šis dokumentas yra **turínio SOT** Turinio inžinerijos keliui (Moduliai 13–15). Papildo `turinio_pletra.md` ir modulius 1–12.  
> **Source of truth:** turinio semantika – šis failas; full redagavimo duomenų struktūra – `src/data/modules.json` po sinchronizacijos.  
> **Auditorija:** rinkodaros ir komunikacijos specialistai. Žr. [docs/CONTENT_MODULIU_ATPAZINIMAS.md](CONTENT_MODULIU_ATPAZINIMAS.md) §6, [ROADMAP.md](../ROADMAP.md).

---

## 1. Apimtis ir tikslai (CURRICULUM)

### 1.1 Vieta kurse

| Moduliai 1–6 | Moduliai 10–12 | Moduliai 13–15 |
|--------------|----------------|----------------|
| 6 blokų sistema, konteksto inžinerija | Agentų inžinerija | **Turinio inžinerija** – vaizdai, video, muzika su DI |
| Teorija → Testas → Projektas (M4–M6) | Teorija (M10) → Testas (M11) → Projektas (M12) | Teorija (M13) → Testas (M14) → Projektas (M15) |
| Bendras pamatas | Softo inžinieriai | **Rinkodaros ir komunikacijos specialistai** |

**Prielaida:** Dalyvis gali pradėti po Modulio 6 (arba lygiagrečiai keliems keliams). Moduliai 13–15 fokusas: **vaizdų, vaizdo įrašų ir muzikos generavimas** – įrankiai, promptų principai, kokybės patikra.

### 1.2 Mokymosi tikslai (po modulių 13–15)

- **Vaizdų generavimas:** Suprasti, kaip formuluoti vaizdo promptus (stilius, proporcijos, ko vengti); naudoti DI įrankius vaizdų kūrimui.
- **Video generavimas:** Žinoti, kaip aprašyti scenarijų trumpiems vaizdo įrašams; kadrai, trukmė, formatas; įrankiai.
- **Muzikos ir garsų generavimas:** Mokėti aprašyti nuotaiką, stilių ir gauti muzikos ar garsų fragmentą; naudojimo teisės ir ribos.
- **Testas (M14):** Patikrinti įsisavinimą prieš finalinį Turinio inžinerijos projektą (M15).
- **Projektas (M15):** Sukurti bent vieną artefaktą – vaizdas, trumpas vaizdo įrašas arba muzikos fragmentas – su naudotu promptu.

### 1.3 Ryšys su 6 blokais

- **META:** Rolė „specialistas, kuriantis vizualų ar garso turinį su DI“; kontekstas – rinkodara, komunikacija, medija.
- **INPUT:** Ką aprašyti (scena, stilius, nuotaika, trukmė); apribojimai (negalima turinio sąrašas).
- **OUTPUT:** Aiškus formatas (proporcijos vaizdui, vaizdo trukmė, muzikos stilius).

### 1.4 whyBenefit – „Kas man iš to?“ (pirmos skaidrės M13, M14, M15)

Pagal [docs/development/GOLDEN_STANDARD.md](development/GOLDEN_STANDARD.md) §4.1:

| Modulis | Skaidrė / tipas | whyBenefit (tekstas į JSON) |
|---------|------------------|-----------------------------|
| **13** | action-intro (pirmoji) | Po šio modulio mokėsi kurti vaizdus, trumpus vaizdo įrašus ir muziką su DI – nuo promptų iki įrankių ir kokybės patikros. |
| **14** | test-intro | Po šio testo žinosi, ar esi pasiruošęs finaliniam Turinio inžinerijos projektui (Modulis 15). |
| **15** | practice-intro | Po projekto turėsi bent vieną paruoštą vizualų ar garso artefaktą ir promptų šablonus tolesniam darbui. |

---

## 2. Turinio inžinerijos kelias – ką rasite (apžvalga)

**Skaidrė: Kelio apžvalga (13.1)**

- **Vaizdų generavimas:** Kaip rašyti vaizdo promptus; stilius, proporcijos (aspect ratio); ko vengti; įrankiai (DALL·E, Midjourney, Ideogram, Leonardo.ai, Canva AI ir kt.).
- **Video generavimas:** Trumpi vaizdo įrašai iš teksto ar scenarijaus; kadrai, trukmė; įrankiai (Sora, Runway, Pika, Luma, Synthesia, InVideo ir kt.).
- **Muzikos ir garsų generavimas:** Muzikos ir garsų kūrimas iš aprašymo; nuotaika, stilius, naudojimo teisės; įrankiai (Suno, Udio, Mubert, Soundraw, AIVA, ElevenLabs garsams ir kt.).

**Kampanijos tikslai ir vaizdo tipas (MUST – 13.1 arba atskira skaidrė 13.2)**  
Be šito vaizdai būna gražūs, bet atsitiktiniai. Trijų tikslų modelis:
- **Awareness (atpažįstamumas):** Vaizdas pritraukia dėmesį – ryškus, lengvai atpažįstamas, emocija ar intriga. Tinka: viršelio nuotrauka, baneris, social postas.
- **Engagement (įsitraukimas):** Vaizdas skatina sustoti ir sąveikauti – aiškus kontekstas, „kas čia?“ arba naudinga info. Tinka: carousel, video intro, iliustracija straipsniui.
- **Conversion (konversija):** Vaizdas skatina veiksmą – produktas, pasiūlymas, CTA vizualiai paryškintas. Tinka: reklamos maketas, landingo hero, „pirk dabar“ blokas.

**Kada emocija, kada aiškumas:** Awareness dažnai = emocija, kontrastas; Conversion = aiškumas, pasitikėjimas, skaitomumas. Engagement – pusiausvyra.

**Kur pritaikyti:** Rinkodaros vizualai, socialinio turinio vaizdai ir trumpi vaizdo įrašai, foninė muzika ar garsai projektams – be būtino dizainerio ar kompozitoriaus.

---

## 3. Blokas 1 – Vaizdų generavimas

**Strateginė struktūra (5 sluoksniai):** Šis blokas apima (1) promptų struktūrą, (2) įrankių ekosistemą, (3) stiliaus valdymą, (4) kompoziciją ir kadravimą (neprivaloma), (5) naratyvo konstravimą per aprašymą. Tai ne tik „kaip sugeneruoti vaizdą“, bet vizualinės komunikacijos pagrindai su DI.

### 3.1 Vaizdo prompto pagrindai (13.2)

**TL;DR:** Geras vaizdo promptas apima: ką rodoma (subjektas, vieta, veiksmas), stilių (fotorealistiškas, iliustracija, minimalistinis), proporcijas (pvz. 16:9, 1:1) ir ko vengti (negalima turinio sąrašas platformoje).

**Minimalūs reikalavimai:** Bent 3–7 žodžių; vengti abstrakcijų („gražu“, „įdomu“ be konteksto); naudoti konkrečius daiktavardžius. Estetikos raktinis žodis (stilius) vainikuoja idėją.

**Esminė formulė:** Vaizdas = Objektas + Kontekstas + Estetika (stilius).

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

**TL;DR:** Stilius nustato išvaizdą (fotorealistiškas, akrilas, 3D, piešinys). Proporcijos (aspect ratio) – vaizdo formátas: 1:1 kvadratas, 16:9 platus, 9:16 vertikalus (stories).

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

**Įrankių pozicionavimas (cheat sheet, optional):** DALL·E 3 – balansas (tikroviški + koncepciniai, gera teksto integracija, ChatGPT); Midjourney – aukštas meninis lygis, daug stilių, Discord; Leonardo.ai – creator/pro, fotorealizmas, galima mokyti modelius, žaidimų/produktų dizainas; Ideogram – labai geras tekstas vaizduose (logo, plakatai, LinkedIn); Stable Diffusion (DreamStudio) – atviras, lankstus; Adobe Firefly – korporacinė integracija (CC, Generative Fill), „teisiškai saugi“ šaltiniai, mažesnė autorinių teisių rizika. Google (Imagen 3 / „Nano Banana“): objektų išlaikymas per scenas, išplėstinis redagavimas tekstu, SynthID atsekamumas, stiprūs saugumo filtrai – tinka saugiai reklamai, katalogams.

### 3.3 Kompozicija ir kadras (neprivaloma, 13.3 optional)

**TL;DR:** Kompozicija ir kadravimas pakelia rezultatą į „profi“ lygį: kur dėti pagrindinį objektą, kokį kadrą ir kameros kampą nurodyti.

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

### 3.4 DI vaizdų generavimo workflow (5 žingsniai, optional)

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

| Use-case | Prompt (įklijuoti ir užpildyti) |
|----------|---------------------------------|
| **Logotipas** | Sukurk logotipą [verslo sritis] įmonei [pavadinimas]. Stilius [minimalistinis/modernus], spalvos [x], fonas skaidrus/baltas, pateik 3 variantus. |
| **Produkto maketas** | Sukurk fotorealistinį [produktas] maketą. Aplinka [studija/virtuvė], medžiagos [x], šviesa softbox, 3 kampai. |
| **Social post** | Pagal šį tekstą [įklijuoti], sukurk iliustraciją LinkedIn/Facebook. Įvaizdis [korporatyvus], spalvos [x], formatas 1:1 ar 4:5, be teksto / su CTA tekstu [jei reikia]. |
| **Reklaminė kampanija** | Sugeneruok 5 vizualines kryptis reklamai [produktas/paslauga], tema [x], auditorija [x], stiliai [x], formatas Stories/Feed. |
| **Naujienlaiškio hero** | Sukurk naujienlaiškio hero antraštės vizualą. Turinys: [įklijuoti]. Palik vietos tekstui viršuje 30% ploto, fonas švarus. |
| **Brošiūra** | Sukurk viršelio vizualą brošiūrai: pristatome [produktas/paslauga]. Stilius [x], aiški hierarchija, vieta logotipui. |
| **Plakatas** | Sukurk ryškų plakatą renginiui [pavadinimas], data/vieta [x], stilius [x], įtrauk tikslų tekstą: '…'. |
| **Blogo vizualas** | Sugeneruok blogo cover image temai [x]. Stilius [x], be teksto, palik „negative space“ antraštei. |

### 3.7 Vaizdo generatorius – sugeneruok savo promptą (interaktyvus, 13.37)

**TL;DR:** Interaktyvus įrankis, kuris padeda sudėlioti vaizdo promptą žingsnis po žingsnio: kampanijos kontekstas (tikslas, platforma, auditorija, tonas), vizualo esmė (objektas, stilius, apšvietimas, kamera, spalva) ir tekstų integracija (antraštė, CTA, šriftas). Rezultatas – vienas paruoštas promptas, kurį galima nukopijuoti ir įklijuoti į bet kurį vaizdų generavimo įrankį.

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

**Kodėl DI video verta dėmesio (trumpai):** Mažiau įrangos, aktorių ir montažo; greitis ir mastelis (dešimtys variantų per valandą); personalizavimas rinkoms/kalboms/segmentams. Tinka: vidiniai mokymai, saugos instrukcijos, reklamos kampanijos. *Procentų (pvz. „sutaupykite 90%“) vengti be šaltinio – žr. §5a „Verslo argumentai“.*

**Video workflow (sutrumpintas):** Koncepcija → idėja/scenarijus → promptų generavimas → optimizacija → generavimas (Sora, Runway, Veo3, Synthesia, InVideo).

### 4.1 Scenarijus trumpam vaizdo įrašui (13.4)

**TL;DR:** Trumpas vaizdo įrašas reikalauja aiškaus scenarijaus: kas vyksta, kiek sekundžių, kokiu tonu (dramatiškas, ramus, informatyvus). Kadravimas ir kameros kampas (lygus akims, iš viršaus, iš apačios, POV) keičia emociją – nurodyk prompte, jei nori kontroliuoti išvaizdą. DI gali generuoti vaizdo įrašą iš teksto arba kadrų aprašymo.

**Daryk dabar:** Parašyk 2–3 sakinius: kas matoma vaizdo įraše, nuo pradžios iki pabaigos. Nukopijuok žemiau esantį šabloną į vaizdo generavimo įrankį.

**Kopijuojamas promptas (CopyButton):**

```
Trumpas vaizdo įrašas, 5–10 sekundžių.
Scenarijus: [APRAŠYK – pvz. „Atidaroma duris, įėjimas į šviesų biurą. Kamera juda lėtai į priekį. Galas: ekrane logotipas.“].
Tonas: [profesionalus / dinamiškas / ramus]. Be garso arba paprasta foninė muzika.
```

**Patikra:** Ar įrankis palaiko vaizdo generavimą? Ar trukmė ir kadrai atitinka aprašymą? Jei ne – sutrumpink scenarijų arba pasirink kitą įrankį.

**Kur pritaikyti:** Trumpi reklaminiai vaizdo įrašai, socialinio turinio vaizdeliai, pristatymų intros.

### 4.2 Įrankiai ir formatas (13.5)

**TL;DR:** Skirtingi įrankiai duoda skirtingą kokybę ir trukmę. Nurodyk formatą (horizontalus / vertikalus) ir maksimalią trukmę pagal įrankio galimybes.

**Daryk dabar:** Pasirink vieną įrankį (žr. sąrašą žemiau), atidaryk ir sugeneruok vieną trumpą vaizdo įrašą pagal savo scenarijų.

**Kopijuojamas promptas (CopyButton):**

```
Vaizdo įrašas: [TRUMPAS SCENARIJUS – 1–2 sakiniai].
Formatas: [horizontalus 16:9 / vertikalus 9:16]. Trukmė: 5–10 sek. Stilius: [nurodyk].
```

**Patikra:** Ar failas atsisiuntėmas? Ar galima naudoti komerciniu tikslu (patikrink naudojimo teises).

**Įrankiai (tools.json, category: „Video generavimas“, moduleId: 13):** Sora (OpenAI) – aukšta kokybė, realistinė judesio fizika; Runway, Pika, Luma Dream Machine, Synthesia (avatarai), InVideo (šablonai, socialiniam turiniui). **Google Veo 3:** 1080p, kinematografinė kokybė, tikroviškas apšvietimas, dinamiškas judesys – tinka prototipams, trumpiems reklaminiams klipams, architektūrinei vizualizacijai; reikia tikslių užklausų, sudėtinga >1 min scenoms.

**Video prompt .json šablonas (optional, pipeline/agentams):** Laukai: id, use_case, tags, mode, duration_s, genre, mood, main_subject, scene, visual_style, camera_movement, lighting, composition. Papildomai galima: aspect_ratio, fps, seed, negative, audio, text_overlay, brand_guidelines, safety_flags, deliverables. Struktūruota – lengva versijuoti ir naudoti automatiškai.

---

## 5. Blokas 3 – Muzikos ir garsų generavimas

**Konteksas – technologinė evoliucija:** DI muzika – istorinio progreso etapas. Trumpa lentelė: 1877 fonografas (muzika įrašoma) → XX a. analoginė/skaitmeninė (profesionalizacija) → 1990–2000 CD/MP3 (demokratizacija) → DAW namų studijos (decentralizacija) → **DI generatyvinė muzika (kūrybos automatizacija)**. **Tezė:** DI = naujas muzikos demokratizacijos etapas.

**Pagrindinė žinutė:** „Muziką kurti gali visi.“ Argumentai: (1) technologija sumažina įgūdžių barjerą, (2) gamyba greita ir pigi, (3) platinimas globalus (YouTube, Spotify, DistroKid). **Strateginė išvada:** DI muzikos įrankiai – produktyvumo multiplikatorius ir content velocity įrankis; bet tik tie, kurie supras distribution + branding + storytelling, laimės – vien generavimas nėra konkurencinis pranašumas.

**Ekosistema (pilnas AI kūrybos pipeline):** Tekstui – ChatGPT, Copilot, Rytr; vizualams – DALL·E, Ideogram, Leonardo; muzikai – Suno, Udio, Soundraw, Boomy, Beatoven; platinimui – YouTube, Spotify, DistroKid.

### 5.1 Muzikos aprašymas (13.6)

**TL;DR:** Muzikos generavimui reikia aprašyti: nuotaiką (linksma, įtempta, rami), stilių (pop, elektroninė, akustinė), tempo (lėtas, vidutinis, greitas) ir, jei reikia, instrumentus ar vokalą. **Prompt struktūra:** Mood + Genre + Tempo + Instrumentation + Vocal type + Structure + Platform use case.

**TOP 5 DI muzikos generatoriai – pozicionavimas:**

| Įrankis | Stiprybės | Kaina (apytiksliai) | Kam tinka |
|---------|-----------|----------------------|-----------|
| **Suno** | Tekstas → pilna daina, integracija su Copilot, greitis (~5 min) | Free su limitais; ~24 €/mėn | YouTube testai, viral hook, demo |
| **Boomy** | Paprasta UI, daug šablonų, greitas publikavimas | 25 dainos free; 10–30 €/mėn | Naujokams, lo-fi, social content |
| **Soundraw** | Nuotaika + trukmė, Pro – instrumentų mixas, autorių teisių saugumas | ~17–30 €/mėn | Podcast intro, reklama, brand content |
| **Udio** | Įkelti savo audio, redaguoti tekstus, miksuoti – gili kontrolė | 0–30 €/mėn | Rimtesni projektai, albumo prototipas, remix |
| **Beatoven.ai** | Royalty-free, emocijų kontrolė, optimizacija video fonui | ~6–20 € (minutės pagrindu) | YouTube monetizacija, vlog, reklamos |

**Industrinės implikacijos:** Demokratizacija (barjeras krenta); produkcijos pagreitis (kūrinys per minučių); industrijos pokyčiai (kompozitoriai – viena iš galimybių). **Rizikos (neaptartos plačiai):** autorių teisių konfliktai (modelių treniravimo duomenys), platformų politikos/banai, muzikos saturacija, AI turinio nuvertėjimas, YouTube monetizacijos pokyčiai – prieš skalavimą verta įvertinti.

**Daryk dabar:** Nukopijuok žemiau esantį promptą į muzikos generavimo įrankį. Pakeisk [APRAŠYMAS] pagal savo projektą.

**Kopijuojamas promptas (CopyButton):**

```
Sukurk muzikos fragmentą, 30–60 sekundžių.
Nuotaika: [ramus / energingas / nostalgijos]. Stilius: [akustinė gitara / elektroninė / pianinas].
Tempo: [lėtas / vidutinis]. Be vokalo. Tinka foninei muzikai pristatymams ar vaizdo įrašams.
```

**MASTER muzikos promptas (universalus) – CopyButton:**

```
Create a [genre] track,
mood: [emotion],
tempo: [bpm or speed],
instruments: [list],
vocal: [male/female/none],
structure: intro – verse – chorus – drop,
target platform: [YouTube/TikTok/Spotify],
goal: [viral / background / branding],
production quality: professional.
```

**Patikra:** Ar gautas failas atitinka nuotaiką? Jei per greitas ar per lėtas – nurodyk tempo (pvz. BPM – taktų per minutę) arba „lėtesnis / greitesnis“.

**Kur pritaikyti:** Foninė muzika prezentacijoms, podcastams, vaizdo įrašams; garsų efektai (pvz. perėjimai, pranešimai).

### 5.2 Garsai ir naudojimo teisės (13.7)

**TL;DR:** Kai kurie įrankiai leidžia naudoti sugeneruotą muziką ar garsus komerciniu tikslu; kiti – tik asmeniniam. Visada patikrink paslaugos taisykles ir licenciją.

**Daryk dabar:** Prieš naudodamas sugeneruotą muziką viešai ar projekte – atidaryk įrankio puslapį apie naudojimo teises ir įsitikink, kad gali naudoti.

**Kopijuojamas promptas (CopyButton) – garsų efektai:**

```
Sukurk trumpą garsą: [APRAŠYK – pvz. „švelnus perėjimo garsas, 1 sekunda“ / „pranešimo signalas, optimistiškas“].
Formatas: MP3 arba WAV. Be muzikos – tik garsas.
```

**Patikra:** Ar failas atsisiuntėmas? Ar licencija leidžia naudoti jūsų projekte (reklama, YouTube, podcast)?

**Įrankiai (tools.json, category: „Muzikos generavimas“, moduleId: 13):** Suno, Boomy, Soundraw, Udio, Beatoven.ai, Mubert, AIVA, ElevenLabs (garsų efektai).

### 5.3 Ready prompts – muzika, tekstai, viršeliai, video (optional)

**Suno:** Viral lietuviškas hit – *Modern techno trap, melancholic but powerful, male vocal, Lithuanian lyrics, theme: summer ending, strong catchy chorus, TikTok hook in first 15 seconds, professional mix, radio ready.* Gaming kanalui – *Aggressive rap trap, dark cyberpunk mood, 140 bpm, lyrics about leveling up, epic drop at 0:40, YouTube gaming intro style.* Podcast intro – *Minimal ambient electronic intro, inspiring, futuristic, no vocals, 20 seconds, soft build up.*

**Boomy:** Lo-fi fonas – *Lo-fi chillhop instrumental, rain background, soft piano, nostalgic but calming, study YouTube stream.* Corporate video – *Upbeat corporate instrumental, clean modern synth, light percussion, optimistic, 2 minutes, tech presentation.*

**Soundraw:** Reklamos takelis – *Mood: energetic and inspiring. Genre: electronic pop. Length: 45 seconds. Use case: startup product launch. Dynamic build up, climax at 0:30.* Meditacija – *Mood: calm, deep relaxation. Genre: ambient. Length: 10 minutes. Slow evolving pads, no percussion.*

**Udio:** Remix – *Take uploaded melody, transform into modern deep house, groovy bassline, female vocal hook, club energy, 4 minutes.* Albumo prototipas – *Alternative electronic rock, moody atmosphere, live drum feeling, expressive male vocal, concept album about digital loneliness.*

**Beatoven.ai:** YouTube vlog – *Emotion: uplifting and adventurous. Tempo: medium. Instruments: acoustic guitar + light percussion. Use case: travel vlog. Subtle cinematic feel.*

**Tekstų generavimas (ChatGPT):** Lietuviškas rap – *Parašyk lietuvišką rap tekstą apie DI revoliuciją, agresyvus bet motyvuojantis, aiškus priedainis, 4 posmai, šiuolaikinis slangas.* Pop hitas – *Write catchy pop lyrics, theme: digital love, simple repetitive chorus, radio friendly, modern 2026 vibe.*

**Albumo viršelis (DALL·E):** *Futuristic Lithuanian rapper, cyberpunk Vilnius skyline, neon lights, album cover design, dark purple and electric blue, high detail, cinematic lighting.*

**Muzikos video (bendrai):** *Cinematic music video, dark urban setting, slow motion, neon reflections, moody atmosphere, professional lighting, 4K.*

**Ko šis modulis dar neturi (tolimesnė plėtra):** Neigiami promptai („be X“), tikslūs parametrai (apšvietimo reikšmės, aspect ratio skaičiai), iteracijos metodika (kaip gerinti per kelis ciklus), QA modelis sugeneruotam turiniui – dalis įtraukta į 13.10 ir 13.11 žemiau.

---

## 5a. Verslas ir rizikos (13.10) – MUST

**Kampanijos vaizdams būtina:** KPI matavimas, A/B testavimas, teisės ir rizikos. Be šito nėra verslo mokymo.

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

**Daryk dabar:** Prieš naudodamas sugeneruotą vaizdą ar video reklamoje – atidaryk įrankio naudojimo ir autorinių teisių puslapį; jei vaizde yra žmonių veidai – įvertink deepfake ir GDPR rizikas.

### 5a.3 Verslo argumentai ir use-cases

**Kur pritaikyti:** A/B testai, produktų vizualizacija, prototipai ir katalogai, prezentacijos, iliustracijos ir infografikai, socialinio turinio nuoseklumas. Vizualus turinys dažnai pritraukia daugiau dėmesio nei vien tekstas – naudok tai kampanijų ir postų planavime.

**Įspėjimas (reputacinė rizika):** Dokumentuose ir skaidrėse kartais cituojami procentai (pvz. „laiko sutaupymas 90%“, „vizualas pritraukia 94% daugiau dėmesio“) **be šaltinių**. Mokymuose ir klientams geriau rašyti „iki X%“, „tipiškai“ arba pridėti šaltinį – kitaip gali kilti abejonių dėl patikimumo.

### 5a.4 QA checklist (prieš publikavimą)

Patikrink: (1) Tekstas vaize be klaidų ir keistų šriftų. (2) Brand spalvos ir tonas atitinka. (3) Teisingas formatas (proporcijos, platforma). (4) Aiški žinutė – atitinka kampanijos tikslą. (5) Nėra rizikingo ar netinkamo turinio (brand safety). (6) Naudojimo teisės ir teisės riskai įvertinti (§5a.2).

### 5a.5 Versijavimas

Failų naming ir versijavimas: V1, V2, V3 + viena eilutė „kas pasikeitė prompte“ (pvz. „V2: pridėtas aukso valandos apšvietimas“). Tai palengvina A/B analizę ir pakartotinį naudojimą.

### 5a.6 Top 3 pitfalls (ko vengti)

1. **Per abstraktūs promptai** → gauni atsitiktinį stilių ir mažą nuspėjamumą. Sprendimas: konkrečius daiktavardžius, aiškų stilių, struktūrą (žr. §3.1, MASTER šablonas §3.6).
2. **Tekstas vizuale be kontrolės** → klaidos, keisti šriftai, netelpa. Sprendimas: Ideogram arba DALL·E + aiški tipografijos užduotis; mažiau teksto vaize arba „negative space“ antraštei.
3. **Video įrankių ribojimai** (trukmė, kompleksiniai veiksmai) → reikia trumpų scenų ir labai tikslių užklausų; neplanuok ilgų filmukų vienu promptu.

---

## 5b. Workflow: nuo brief iki publikacijos (13.11) – MUST

**Dabar to nėra – turi būti.** Pilnas ciklas:

1. **Marketing brief** – kam, kokiam tikslui (Awareness / Engagement / Conversion), kokia auditorija.
2. **Prompt generavimas** – pagal brief ir brand consistency (spalvos, tonas, stilius).
3. **Variantai** – 3–5 vaizdų ar video variantų testui.
4. **Iteracija** – gerinimas pagal grįžtamąjį ryšį („šviesesnis“, „mažiau teksto“, „veidas į kamerą“).
5. **Adaptacija platformoms** – skirtingi kadrai ir formatai (LinkedIn, Instagram, TikTok, Meta Ads, Google Display – skiriasi proporcijos, teksto kiekis, fokusas).
6. **Testavimas** – A/B, hipotezė, KPI (CTR, CVR, scroll stop).
7. **Optimizacija** – remiantis rezultatais, pakartoti ciklą.

**Kopijuojamas šablonas – brief į promptą:**

```
Brief: Tikslas [Awareness / Engagement / Conversion]. Auditorija: [aprašyk]. Platforma: [pvz. Instagram 1:1].
Vaizdo promptas: [subjektas] + [veiksmas/kontekstas] + [aplinka]. Stilius: [brand – spalvos, tonas].
Brand: [1–2 sakiniai – spalvos, tipografija, nuotaika]. Variantų skaičius: 3–5 (skirtingi kampai ar kompozicijos).
```

### 5b.1 SHOULD – stipriai pakelia lygį

| # | Elementas | Kur / kaip |
|---|-----------|------------|
| **6** | **Social platform adaptacija** | LinkedIn, Instagram, TikTok, Meta Ads, Google Display – skiriasi kadras, teksto kiekis, fokusas, kontrastas, emocija. Nurodyk prompte platformą arba formatą (pvz. „vertikalus 9:16, stiprus pirmas kadras – TikTok“). |
| **7** | **Funnel thinking** | TOFU (viršutinis – atpažįstamumas) / MOFU (vidurys – įsitraukimas) / BOFU (apatinis – konversija). Awareness vizualas ≠ Conversion vizualas – skirtingi tikslai, skirtingas vaizdo pasirinkimas. |
| **8** | **Data-driven promptavimas** | Kaip naudoti praeitos kampanijos duomenis, heatmap analizę, scroll analizę – promptas pagrįstas duomenimis, ne tik intuicija. |
| **9** | **Automation** | Integracijos: GPT → Canva → Zapier → Ads manager; variantų generavimas masiškai. Marketingui svarbus mastelis. |
| **10** | **Storyselling** | Vaizdas integruojamas su antrašte, hook'u, CTA – ne izoliuotas nuo copywriting. Mokymas: kaip vaizdas „parduoda“ kartu su tekstu. |

---

## 6. Žodynėlis (optional skaidrė 13.8)

Viena skaidrė arba collapsible „Nori suprasti detaliau?“ – 8–10 terminų:

| Terminas | Apibrėžimas (vienas sakinys) |
|----------|------------------------------|
| **Vaizdo promptas** | Tekstinis aprašymas, pagal kurį DI sukuria vaizdą (subjektas, stilius, proporcijos). |
| **Aspect ratio (proporcijos)** | Vaizdo ar vaizdo įrašo santykis (pvz. 16:9 platus, 1:1 kvadratas, 9:16 vertikalus). |
| **Scenarijus vaizdui** | Trumpas tekstas, aprašantis, kas vyksta vaizde arba vaizdo įraše (kadrai, veiksmas). |
| **BPM** | Taktų per minutę – muzikos tempo matas (lėtas ~60–80, greitas ~120–140). |
| **Nuotaika (mood)** | Jausmas, kurį skleidžia vaizdas ar muzika (ramus, energingas, įtemptas). |
| **Stilius** | Vizualus ar garso išvaizdos tipas (fotorealistiškas, akrilas, pop, akustinė). |
| **Naudojimo teisės / licencija** | Ar sugeneruotą turinį galima naudoti komerciniu tikslu (reklama, produktas). |
| **Foninė muzika** | Muzika fone (prezentacijose, vaizdo įrašuose), dažnai be vokalo. |
| **Trečdalių taisyklė** | Kompozicijos principas: įsivaizduok 3×3 tinklelį; pagrindinis objektas – sankirtos taškuose (ne centre). |
| **Kameros kampas** | Iš kur „žiūri“ kamera: lygus akims (neutralu), iš viršaus (silpnina), iš apačios (suteikia galios), oberžas (iš viršaus), POV („tavo“ akimis). Kadras = emocijos kontrolė. |
| **Naratyvinis vaizdas** | Vaizdas, kuris pasakoja istoriją arba konceptą (pvz. mitologija + modernybė, emocija per metaforą). „Kas čia buvo?“ – klausimas, kurį atsako kompozicija. |
| **CTR (paspaudimų dalis)** | Kiek procentų žmonių, kurie pamatė reklamą ar vaizdą, jį paspaudė. Svarbus rodiklis reklamų ir banerių vertinimui. |
| **CVR (konversijų dalis)** | Kiek lankytojų atliko norimą veiksmą (pirkimas, registracija). Skiriasi nuo CTR – matuojamas po paspaudimo. |
| **CPM (kaina už 1000 parodymų)** | Kiek kainuoja 1000 reklamos ar vaizdo parodymų. Naudinga lyginti skirtingas platformas ir formatus. |
| **Demokratizacija (muzikoje)** | Kūryba tampa prieinama daugiau žmonių – technologija (DI, DAW, streaming) sumažina įgūdžių ir įrangos barjerą. |

---

## 7. Modulio 13 santrauka (summary, 5 blokų modelis)

Pagal [.cursor/rules/content-agent-summary-slide.mdc](../.cursor/rules/content-agent-summary-slide.mdc):

| # | Blokas | Turinys |
|---|--------|---------|
| 1 | Celebration Hero | „Ką išmokote“ – Vaizdų, video ir muzikos generavimas su DI; promptų principai, įrankiai, 3 blokai. 3 statistikos: pvz. „3 blokai“, „3 promptų šablonai“, „6+ įrankių“. |
| 2 | Žinių kortelės | Max 3: (1) Vaizdų promptai – stilius, proporcijos, (2) Video – scenarijus, formatas, (3) Muzika – nuotaika, stilius, naudojimo teisės. |
| 3 | Refleksijos promptas | Copyable; 3 klausimai (Apply, Analyze, Create) – kur pritaikysi vaizdus/video/muziką, kas buvo naujausia, ką išbandysi pirmiausia. |
| 4 | Kitas žingsnis CTA | „Pereikite prie Modulio 14: Žinių patikrinimas (Turinio kelias)“ – testas prieš projektą. |
| 5 | Motyvacinis footer | Tagline: „Vaizdas + video + muzika = vienas kelias turinio inžinerijai.“ |

**Pirmas veiksmas po modulio:** Šiandien atidaryk vieną vaizdų generavimo įrankį ir sugeneruok vieną vaizdą pagal savo aprašymą (stilius, proporcijos).

---

## 8. Modulis 14 – Testas

### 8.1 test-intro

- **whyBenefit:** Po šio testo žinosi, ar esi pasiruošęs finaliniam Turinio inžinerijos projektui (Modulis 15).
- **duration:** ~10–12 min.
- **firstActionCTA:** Atsakyk į 6–8 klausimus – apie vaizdų, video ir muzikos promptus, įrankius ir „Kur pritaikyti?“.
- **microWinPhrase:** „Kiekvienas teisingas atsakymas parodo, kad moki formuluoti turinio promptus.“
- **Slenksčiai:** ≥70 % – rekomenduojama pereiti prie Modulio 15 (projektas). &lt;70 % – peržiūrėk rekomenduojamas M13 skaidres (remediation pagal klausimą).

### 8.2 test-section ir test-results

- **Klausimai:** 6–8 klausimų – MCQ ir/ar scenarijų tipas („Duota situacija – kuris promptas tinkamiausias vaizdui / vaizdo įrašui / muzikai?“). Remediation – nuoroda į konkretų M13 slide id.
- **test-results:** passedMessage, failedMessage, **useCaseBlock** („Kur pritaikyti?“ – accent): „Turinio inžinerijos žinias gali pritaikyti: rinkodaros vizualai, socialinio turinio vaizdai ir vaizdo įrašai, foninė muzika projektams.“ thresholdExplanation: „Pasiekę ≥70 % galite pereiti prie Modulio 15 (projektas). Jei mažiau – rekomenduojame peržiūrėti Modulio 13 skaidres.“

---

## 9. Modulis 15 – Praktika (finalinis projektas)

### 9.1 practice-intro

- **whyBenefit:** Po projekto turėsi bent vieną paruoštą vizualų ar garso artefaktą ir promptų šablonus tolesniam darbui.
- **duration:** ~20–40 min (vienam scenarijui); planuoti daugiau laiko, jei atliekami visi trys tipai (vaizdas, video, muzika).
- **firstActionCTA:** Pradėk dabar: pasirink **vaizdą**, **vaizdo įrašą** arba **muziką** ir sukurk vieną artefaktą su naudotu promptu (nukopijuok promptą ir įrašyk, ką gavai).

### 9.2 Scenarijai (practice-scenario)

**MUST – bent vienas artefaktas:**

| # | Scenarijus | Aprašymas | Artefaktas |
|---|------------|-----------|------------|
| **1** | Vaizdas | Sukurk vieną vaizdą savo temai (rinkodara, prezentacija, socialinis turinys). Nurodyk stilių ir proporcijas. | Sugeneruotas vaizdas + naudotas promptas (tekstas). |
| **2** | Trumpas vaizdo įrašas | Parašyk 2–3 sakinius scenarijų ir sugeneruok 5–10 sek. vaizdo įrašą. | Vaizdo įrašas arba nuoroda + promptas. |
| **3** | Muzikos fragmentas | Aprašyk nuotaiką ir stilių, sugeneruok 30–60 sek. muzikos arba garsą. | Muzikos / garsų failas arba nuoroda + promptas. |

**Delivery-first:** Dalyvis turi turėti bent **vieną** iš trijų artefaktų (vaizdas arba video arba muzika) ir **naudotą promptą** (kopijuojamas į praktinę užduotį arba įrašytas atskirai).

### 9.3 practice-summary

- 5 blokų modelis: Celebration Hero, žinių kortelės (ką išmokote M15), refleksijos promptas, **Kitas žingsnis** („Pirmas veiksmas per 24–48 val.“ – pvz. panaudok vieną promptą savo projekte).
- **useCaseBlock:** „Kur pritaikyti?“ – rinkodaros vizualai, socialinis turinys, foninė muzika, garsų efektai.
- **reflectionPrompt:** Copyable; 3 klausimai (Apply, Analyze, Create) + 1 patarimas.

---

## 10. Nuorodos

- **Modulių atpažinimas:** [docs/CONTENT_MODULIU_ATPAZINIMAS.md](CONTENT_MODULIU_ATPAZINIMAS.md) §6.
- **Golden standard:** [docs/development/GOLDEN_STANDARD.md](development/GOLDEN_STANDARD.md).
- **Paprasta kalba:** [docs/development/PAPRASTOS_KALBOS_GAIRES.md](development/PAPRASTOS_KALBOS_GAIRES.md).
- **Santraukos 5 blokai:** [.cursor/rules/content-agent-summary-slide.mdc](../.cursor/rules/content-agent-summary-slide.mdc).
- **Skaidrių eilė (M13):** [docs/MODULIO_13_SKAIDRIU_EILES.md](MODULIO_13_SKAIDRIU_EILES.md).

---

## 11. MUST / SHOULD (turiniui)

### MUST (be šito marketingo mokymas neveiks)

| # | Elementas | Vieta SOT / skaidrė |
|---|-----------|----------------------|
| **1** | **Kampanijos tikslų modelis** (Objective → Visual Strategy) | §2 – 13.1 (arba atskira 13.2): Awareness / Engagement / Conversion; koks vaizdo tipas kuriems tikslams; kada emocija, kada aiškumas. |
| **2** | **KPI ir A/B testavimo sistema** | §5a.1 (13.10): CTR, CVR, CPM, scroll stop rate, heatmap; kaip generuoti 3–5 variantus testui; kaip formuluoti hipotezę. |
| **3** | **Brand consistency framework** | §3.2 (13.3): Spalvų sistema, tipografijos kontrolė, tonas, vizualinis identitetas – kitaip DI generuos chaotišką brandą. |
| **4** | **Legal / Risk** | §5a.2 (13.10): Autorinių teisių rizika, deepfake rizika, prekės ženklai, GDPR vaizduose. |
| **5** | **Workflow: nuo brief iki publikacijos** | §5b (13.11): Marketing brief → Prompt generavimas → Variantai → Iteracija → Adaptacija platformoms → Testavimas → Optimizacija. |
| **+** | 3 blokai (vaizdai, video, muzika) + M15 artefaktas + M14 testas | Kaip anksčiau. |

### SHOULD (stipriai pakelia lygį)

| # | Elementas | Vieta |
|---|-----------|--------|
| **6** | Social platform adaptacija (LinkedIn, Instagram, TikTok, Meta Ads, Google Display) | §5b.1 – kadras, teksto kiekis, fokusas, kontrastas, emocija. |
| **7** | Funnel thinking (TOFU / MOFU / BOFU) | §5b.1 – Awareness vizualas ≠ Conversion vizualas. |
| **8** | Data-driven promptavimas (kampanijų duomenys, heatmap, scroll) | §5b.1 – promptas pagrįstas duomenimis. |
| **9** | Automation (GPT → Canva → Zapier → Ads; masiški variantai) | §5b.1. |
| **10** | Storyselling (vaizdas + antraštė, hook, CTA) | §5b.1 – ne izoliuotas nuo copywriting. |
| Įrankių nuorodos, žodynėlis, refleksijos promptas | Kaip anksčiau (tools.json, 13.8, santrauka). |
