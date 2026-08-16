# M10–M12 testerio intake (2026-08)

> **Fazė B – Batch.** Savininkas: „tvarkom batch“ 2026-08-13. T01–T08 **Must chrome** + **T09** split + hygiene closeout **įdėta**. Hygiene liekana **41** (nevaryti į 0).  
> Live SOT: `docs/turinio_pletra_moduliai_10_11_12.md` + `src/data/modules.json` (M10–12).  
> **Content freeze (gyvas turinys):** [`M10_M12_CONTENT_DEEP_AUDIT_2026-08.md`](../M10_M12_CONTENT_DEEP_AUDIT_2026-08.md) — P0–P2 ✅; hygiene liekana **41**; **nevaryti į 0**.  
> Uždaryti ciklai (ne perrašyti čia): [`M10_M12_PLAIN_PEDAGOGY_INTAKE_2026-08.md`](M10_M12_PLAIN_PEDAGOGY_INTAKE_2026-08.md) · [`M10_M12_TOBULINIMO_INTAKE_2026-07.md`](M10_M12_TOBULINIMO_INTAKE_2026-07.md).  
> **Statusas:** **Phase B Must shipped** 2026-08-13 — T01–T08 + T09 + hygiene **41**. M11 Path Test chrome + item quality ✅. **M11 walked, no RAW** · **M12 walked, no RAW** (2026-08-16). T01 I5 parked. Should 2-as pass — tik po savininko. Training cut **v1.6.3**; live pin kol marketingas neperpins = **v1.6.2**.

---

## 0. Freeze vs intake

| Sluoksnis                          | Būsena                                    | Ką tai reiškia                                                                                    |
| ---------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **Gyvas turinys** (JSON / EN / UI) | **FREEZE** + T01–T08 + T09 Must **įdėta** | Jokio P3 polish, hygiene **ne** į 0 (liekana **41**). Training **v1.6.3**.                        |
| **Šis intake**                     | **OPEN** (naujos pastabos)                | T01–T08 + T09 + M11 chrome + items **apdorota**. **M11 walked, no RAW** · **M12 walked, no RAW**. |
| **Batch (fazė B)**                 | **Must shipped** 2026-08-13               | T01–T08 + T09 + hygiene **41**. T01 I5 parked. Should = 2-as pass.                                |

**Kodėl abu vienu metu:** freeze saugo corporate12 pin ir ROI stop. Intake saugo, kad testerio signalas nedingtų ir nebūtų „tyliai taisoma“ prieš triažą.

---

## 1. Darbo ciklas

| Fazė          | Kas vyksta                                                   | Kas čia rašoma                              |
| ------------- | ------------------------------------------------------------ | ------------------------------------------- |
| **A. Intake** | Pastabos, printscreen’ai, „per žargono / neveikia / neaišku“ | §1.1 žurnalas + §R.\* – **be** JSON keitimų |
| **B. Batch**  | Tik po savininko triažo: Must / Should / Won’t               | Apdorota zona + handoff agentams            |
| **C. Sync**   | EN overlay, auditai, hygiene baseline peržiūra               | `build:modules-en-m10-m12`, `audit:m1012`   |

**Taisyklės intake metu:**

1. Fiksuojame viską – nefiltruoju „ar vėliau pravers“.
2. **Nekeiciu** `modules.json` / EN overlay / React / SOT, kol neprasideda batch.
3. Jei prieštarauja freeze / 2026-08 plain intake / SOT → `[KONFLIKTAS]`, abi versijos.
4. Terminologija: **DI**; „promptas“; kreipinys **tu**.
5. Fokusas: **testerio kelionė** (aiškumas, klaida, žargonas, UX), ne naujas polish epikas.
6. Kartojasi jau uždarytas Must (§898 / deep-audit P0–P2) → vis tiek įrašau, pažymiu `[JAU TAISYTA?]` ir palieku triažui.

### 1.1 Intake žurnalas

| #   | Data       | Modulis / skaidrė                     | Tema                                                           | Kur           | Statusas                                     |
| --- | ---------- | ------------------------------------- | -------------------------------------------------------------- | ------------- | -------------------------------------------- |
| 1   | 2026-08-13 | M10 / `10.45` Gylis ir komandos rolės | Semantinis ryšys L0↔Pokalbis; v02 4 pakeitimai                 | §R.M10-T01    | **apdorota** · dual picker lieka (I5 parked) |
| 2   | 2026-08-13 | M10 / `10.255` Komandos pasirengimas  | Hierarchija / būsenos / rezultato kulminacija; v2 3 sluoksniai | §R.M10-T02    | **apdorota**                                 |
| 3   | 2026-08-13 | M10 / `10.26` Kada tvirtina žmogus?   | Parent konteineriai + selected ≠ severity; v2 locked           | §R.M10-T03    | **apdorota**                                 |
| 4   | 2026-08-13 | M10 / `10.48` 5 darbo eigos šablonai  | Hierarchija; testerio paste vs GOLDEN; v03 locked              | §R.M10-T04    | **apdorota**                                 |
| 5   | 2026-08-13 | M10 / `10.482` orkestravimo schema    | Label ∩ linija; W7 disciplina vs žvaigždė; v03 locked          | §R.M10-T05    | **apdorota**                                 |
| 6   | 2026-08-13 | M10 / `10.15` Darbo eigos grandinė    | Hero + mokymo scena; testerio v2 vs Shell; v03 locked          | §R.M10-T06    | **apdorota**                                 |
| 7   | 2026-08-13 | M10 / `10.35` Įrankių medis           | Sprendimo variklis; Cursor tik su perrašymu; v03 locked        | §R.M10-T07    | **apdorota**                                 |
| 8   | 2026-08-13 | M10 / `10.25` 3A strategija           | Pedagogika 9 / vizualas 5; echo + hierarchija; v02 locked      | §R.M10-T08    | **apdorota**                                 |
| 9   | 2026-08-13 | M10 / `10.65` → `10.655`              | Dvi schemos vienoje optional; split spec vs incident           | T09           | **apdorota**                                 |
| 10  | 2026-08-16 | M10 / `10.8` + `10.15`                | 12 pritaikymo eilučių per vėlai / per mažas svoris             | §R.M10-T10    | **apdorota** · savininko batch 12→4          |
| 11  | 2026-08-16 | M11 / `110.5` + `111` q6 EN           | CTA raktas `finish`; savitikros copy; EN q6 dublikatas         | §R.M11-CHROME | **apdorota** · **M11 walked, no RAW**        |
| 12  | 2026-08-16 | M11 / `111` q1 q3 q6 q7 q8            | q8 raktas vs 10.26; distractoriai; q6 grandinė / RFP           | §R.M11-ITEMS  | **apdorota** · **M11 walked, no RAW**        |
| 13  | 2026-08-16 | M12                                   | Owner walk                                                     | —             | **M12 walked, no RAW**                       |

### 1.2 Triažas (Phase B, 2026-08-13)

| Ticket             | Must (šiame batch)                                                                         | Should (2-as pass)                                                                          | Won’t                                                       |
| ------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| T01 10.45          | Lygis 0 + vardas; brand intensyvumo skalė; ta pati spalva kortelėse                        | Legenda „Pasirink proceso lygį“; aiškus selected. I5 demote pill’us tik jei vis dar neaišku | Rainbow; nuimti L\*; „sudėtingas“ H1                        |
| T02 10.255         | Selected/unselected wash; 1–2–3 hierarchija; rezultatas = silpniausia dim + kitas veiksmas | 0/3; po-pick eilutė; ikonos                                                                 | Balas; „Fragmentuota komanda“; RYG                          |
| T03 10.26          | Parent wells + gutter; selected ≠ severity; juosta = mapa                                  | Grupių antraštės                                                                            | Daugiau hue; nepriklausomas S1/S2/S3 žingsnis               |
| T04 10.48          | Daryk 1 eil.; klausimas H; chips→ChoiceControl; whenHint Tinka/Netinka                     | Oro; picker ≠ copy well                                                                     | Daryk eyebrow; „modelis“; extra CTA; rainbow                |
| T05 10.482         | Lane header po bus; pill∩stroke AABB; caption 17 desktop                                   | Lengvesnis bus; HITL atitrauktas                                                            | Žvaigždė; vienas anchor visoms ašims; Kartoti = flow spalva |
| T06 10.15          | Hero dydis; tipai off-shaft; Shell 3 taktai                                                | Tipų 1 eil. descriptor                                                                      | 4 H3; klikinami tipai; 2 stulpeliai Must; webhook H         |
| T07 10.35          | Hero + brand selected; Shell 3 taktai; Workato = orientyras                                | Truncation; Cursor collapsible                                                              | Workato→Cursor; Langflow 5-a; extra CTA                     |
| T08 10.25          | Kirpti echo; Shell 3 taktai; 5 % punch (plotis lieka)                                      | max-w-5xl po kirpimo                                                                        | Dydis kaip pirmas DoD; vardas 5 % viduje                    |
| T09 10.65 / 10.655 | Vienas herojus per skaidrę; spec vs incident split                                         | —                                                                                           | Abi schemos vienoje skaidrėje; tabs                         |

---

## RAW – pastebėjimai (neatidaryta į pataisas)

### R.M10-T01 – Skaidrė `10.45` lab „Gylis ir komandos rolės“ (mini schema + ChoiceControl)

**Testerio signalas:** spalviškai neaišku; kodėl nėra semantine spalvų sąsaja; `L0` / `L1` per sudėtinga; gal pirmą kartą parodyti **Lygis 0**. OK/FAIL analizė, ne pataisos.

**UI kontekstas (screenshot, nepasirinkta būsena):**

- Lab antraštė: Gylis ir komandos rolės
- Mini schema „Gylio lygiai“: 4 identiški balti pill’ai `L0` `L1` `L2` `L3` (be vardų, be skalės)
- Hint: pagalvok apie procesą; taisyklė „Pradėk nuo Agento…“
- ChoiceControl 2×2: Pokalbis (L0) / Agentas (L1) / Komanda (L2) / Srautas (L3) — irgi vienoda balta šeima
- Artefaktas tuščias: „Pirmiausia pasirink gylį – tada galėsi kopijuoti.“

**JSON / code anchors:**

- Slide `id: 10.45` · image `m10_agent_taxonomy` · Pattern `interactive-control-lab` (Shell = Ne)
- `M10DepthRolesMiniDiagram.tsx` — pill tekstas = `{opt.code}` (`L0`…`L3`); `onDepthSelect` = antras pickeris
- `M10DepthRolesLabBlock.tsx` — ChoiceControl `label: ${d.label} (${d.code})`
- Tokenai: `m10DepthRolesLabTokens.ts` — **brand-only** (sąmoningai, ne 10.26 risk strip)
- SOT: `turinio_pletra_moduliai_10_11_12.md` §3b2 — pill = **vardas + L0–L3 badge**; pirminė kalba = vardas
- GOLDEN §3.1b/c; UI_UX lesson 2026-07-24: schema = **mirror, ne antras CTA**
- Ankstesnis intake: `M10_M12_PLAIN_PEDAGOGY_INTAKE` §R.M10-P01 (L0–L3 tada „OK / soft“) — `[JAU TAISYTA?]` ne; chrome vis dar L\* pirmas

**Statusas:** open · **Netaisyta.** · v02 spec užrakintas žemiau (koreliuoja su testeriu).

---

#### Koreliacija: testeris ↔ T01 diagnozė ↔ v02 spec

**Taip — ta pati problema.** Ne struktūra / ne layout. Semantinis ryšys: viršus `L0–L3` vizualiai **nėra** tie patys keturi lygiai kaip apačios Pokalbis / Agentas / Komanda / Srautas.

| Testeris (screenshot + signalas)          | T01 (ankstesnė diagnozė)                               | v02 (šis tekstas)                                                                               | Koreliacija                                                                 |
| ----------------------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `L0` per techniška; pirmą kartą „Lygis 0“ | FAIL #1–2; Must vardas + badge                         | `Lygis 0` / Pokalbis, mažas `L0`; vėliau tik L0                                                 | **Sutampa**                                                                 |
| Nėra spalvinės semantikos                 | FAIL skalės; OK politikai; brand intensity, ne rainbow | Viena mėlyna šeima, stiprėja su gyliu; **tas pats atspalvis viršuje ir apačioje**               | **Sutampa** (v02 Must’ina spalvą ant kortelių — T01 tai turėjo Should)      |
| 4 balti vienodi                           | Skalė nematoma                                         | Visi lygiai atrodo vienodai svarbūs ir nesusiję su kortelėmis                                   | **Sutampa**                                                                 |
| (neišsakyta tiesiogiai)                   | FAIL dvigubas pickeris                                 | FAIL #3: L0–L3 atrodo kaip neveikiantys mygtukai (spausti? progresas? legenda? kuris selected?) | **Sutampa skausmas**; sprendimas šiek tiek skiriasi — žr. atvirą klausimą A |
| Nelaužyti                                 | Nelaužyti Pattern / Shell / rainbow                    | „Nereikia laužyti layouto“; 4 maži pakeitimai                                                   | **Sutampa**                                                                 |
| —                                         | „Gylis“ paliktas SOT terminu                           | Legendą keisti: ne „gylis“, o „lygis“ / „kiek sudėtingas“                                       | **Nauja ašis** — žr. klausimą B                                             |

**v02 OK (laikytis, neardyti):** 4 lygių logika; Pokalbis → Agentas → Komanda → Srautas progresija; trumpi aprašymai; tas pats ekranas.

**v02 FAIL → 4 pakeitimai (locked batch spec, ne kodas):**

1. `L0` → pirmą kartą **Lygis 0** (+ mažas `L0`).
2. Ant kiekvieno lygio iškart vardas: Pokalbis / Agentas / Komanda / Srautas.
3. Viena brand/mėlyna intensyvumo skalė L0 → L3 (šviesus → sodrus). **Ne** keturios atsitiktinės spalvos.
4. Tą pačią spalvinę žymą pakartoti atitinkamoje ChoiceControl kortelėje.

Mentalinis modelis po to: „keturi proceso lygiai, dabar renkuosi vieną.“

---

#### Du atviri produktiniai klausimai (ne blokuojantys v02)

**A. Viršus — pickeris ar veidrodis?**  
v02 palieka tą patį ekraną (pill’ai + kortelės) ir riša juos spalva + vardais. T01 Should #4 siūlė nuimti kliką nuo pill’ų (GOLDEN lesson: schema = mirror).  
**Rekomendacija batch’ui:** pirma v02 (label + spalva + aiškus selected). Jei po to vis dar neaišku „ar galima spausti“, tada demote pill’us į legendą. Nelaužyti dviejų pickerų „iš karto“.

**B. „Gylis“ vs „lygis“ vs „sudėtingumas“.**  
v02: `Pasirink gylį savo procesui` → `Pasirink proceso lygį` **arba** `Kiek sudėtingas tavo procesas?`  
SOT §3b2 ir lab copy kanonas = **gylio lygiai**; artefaktas `Gylio lygis: Komanda (L2)`.  
`Pasirink proceso lygį` — **Should**, nes „Lygis 0“ jau išmoktas viršuje, antras terminas nereikalingas.  
`Kiek sudėtingas…` — **soft / atsargiai**: L3 Srautas ≠ „sudėtingesnis darbas“, o **daugiau automatizacijos**. Gali suklaidinti. `[KONFLIKTAS su SOT semantika]` jei „sudėtingas“ tampa H1.

---

#### Patikra pagal SOT / GOLDEN / §4.2 (diagnozė – ne pataisa)

| #   | Kriterijus                                         | Vertinimas                         | Kodėl                                                                                                                                                                            |
| --- | -------------------------------------------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | SOT §3b2 mini schema: vardas + L\* badge           | **FAIL**                           | Live pill’ai rodo **tik** `L0`…`L3`. SOT ir CONTENT skill: Pokalbis/Agentas/Komanda/Srautas pirmi, L\* antriniai.                                                                |
| 2   | L0–L3 pirmą kartą skaitomi                         | **FAIL**                           | Be žodžio „lygis“ ir be vardo `L0` = kodas, ne mokymas. Testeris teisus.                                                                                                         |
| 3   | Semantinė spalvų sąsaja (testerio klausimas)       | **FAIL skalės; OK politikai**      | 4 balti vienodi blokai nesako „čia kopėčios“. Brand-only **buvo sąmoningas** (ne 10.26 rizika, ne rainbow rolės). Trūksta **ordinalaus** signalo toje pačioje brand šeimoje.     |
| 4   | Rainbow / `optionTone` ×4                          | **Won’t** (ne FAIL)                | 4 skirtingos spalvos mokytų „4 produktų tipai“, ne gylio kopėčias. GOLDEN §3.1c 10.45 = brand-only; §6b rainbow roles draudžiama.                                                |
| 5   | Schema = mirror, ne antras CTA (lesson 2026-07-24) | **FAIL**                           | Pill’ai klikinami (`onDepthSelect`) **ir** ChoiceControl žemiau = du pickeriai tam pačiam sprendimui. Screenshot’e viršus atrodo legenda, apačia — pasirinkimas, bet abu veikia. |
| 6   | Exclusive choice (GOLDEN §3.1b)                    | **OK**                             | ChoiceControl naudojamas; selected = brand.                                                                                                                                      |
| 7   | Vienas dominuojantis CTA (§4.2)                    | **WEAK / FAIL**                    | Iki pick: du gylio pickeriai; po pick: Copy. Job’as (pasirink → kopijuok) geras, chrome konkuruoja.                                                                              |
| 8   | Skenuojamumas                                      | **FAIL** viršuje; **OK** kortelėse | Pirmas vizualas = kodai. Prasmė atsiranda tik 2×2 kortelėse — per vėlai.                                                                                                         |
| 9   | A11y (spalva + tekstas)                            | **OK politikos; WEAK SVG**         | Brand-only + tekstas kortelėse. SVG `role="img"` su hit-area pill’ais — kodas be vardo, silpnas pavadinimas.                                                                     |
| 10  | Lab job (procesas → gylis → copy)                  | **OK**                             | Nelaužyti Pattern / Shell=Ne / Copy lab viduje / be scenarijaus.                                                                                                                 |
| 11  | Ankstesnis P01 „L0 secondary = OK/soft“            | `[KONFLIKTAS]`                     | Tada žargonas (triažas) buvo P0. Dabar testeris įrodo, kad L\* chrome **yra** skausmas.                                                                                          |

**Bendras verdiktas lab chrome:** **FAIL** (vardai vs kodai + skalė nematoma + dvigubas pickeris). **OK** (brand-only politika, ChoiceControl, Pattern). **Nelaužyti** 10.26 risk strip / rainbow / Shell.

---

#### Kodėl nėra „semantinių spalvų“ (ne klaida, o sąmoningas limitas)

10.26 rizikų labas **gali** amber/rose/emerald, nes ten būsenos = pasekmė. 10.45 job = **ordinalus gylis** (mažiau → daugiau), ne rizika ir ne keturios rolės-spalvos.

Jei nudažytume L0 mėlynai, L1 žaliai, L2 violet, L3 rausvai — mokinys skaitytų „keturi produktai“, ne „keturi gyliai“. Todėl brand-only **palikti**. Testerio skausmas vis tiek tikras: **skalė vizualiai lygi**.

Semantika, kurios trūksta = **intensyvumas / kopėčios**, ne keturios hue.

---

#### Siūlomi patobulinimai (batch’ui vėliau — ne dabar)

**Must = v02 keturi pakeitimai** (layout lieka):

1. Pirmą kartą: **Lygis 0** (+ mažas `L0`); vėliau platformoje galima trumpinti iki L0.
2. Ant kiekvieno viršutinio lygio iškart vardas: Pokalbis / Agentas / Komanda / Srautas.
3. Viena brand/mėlyna intensyvumo skalė L0 → L3 (šviesus → sodrus). Ne keturios hue.
4. Tą pačią spalvinę žymą ant atitinkamos ChoiceControl kortelės (viršus ↔ apačia = tas pats kodas).

**Should:**

5. ChoiceControl legenda: **Pasirink proceso lygį** (ne antras terminas „gylis“). Ne „Kiek sudėtingas…“ kaip H1 — L3 ≠ sudėtingesnis darbas.
6. Aiškus selected state ant pill’ų (kad FAIL #3 „kuris dabar?“ užsidarytų). Pill klikas lieka, kol A neįrodyta.

**Could / atviras A:** jei po v02 vis dar neaišku ar pill’ai mygtukai — demote į legendą (nuimti `onDepthSelect`).

**Won’t:**

- Keturios `optionTone` spalvos / 10.26 risk strip klonas
- L0–L3 išmesti visai (artefaktas `Komanda (L2)`)
- Layout perstumdymas / naujas Pattern / Shell
- „Sudėtingumas“ kaip lygio sinonimas

**Siūlomas batch savininkas vėliau:** CONTENT (Lygis 0 + legenda) → SCHEME (pill 2 eilutės + intensyvumo tokenai) → CODING (MiniDiagram + ChoiceControl tone-by-depth, vis dar brand šeima) → UI_UX → QA.

**DoD jei kada batch:** viršus ir apačia skaitosi kaip tie patys 4 lygiai; testeris nebėra „L0 = ???“; skalė vienoje hue; layout tas pats.

---

### R.M10-T02 – Skaidrė `10.255` lab „Komandos pasirengimas“ (Daryk dabar)

**Testerio signalas:** įrankis geras, bet viskas **per blanku ir vienoda**; trūksta patobulinimo. OK/FAIL, ne laužyti 3×3.

**UI kontekstas (screenshot, visos dimensijos tuščios):**

- Slide sekcija: Daryk dabar
- Takeaway: greita komandos praktikos nuotrauka; be balo
- Santrauka „Pasirengimo nuotrauka“: Naudojimas / Struktūra / Mokymasis — visur „Dar neužpildyta“
- Trys klonai: 1. Komandos naudojimas · 2. Promptų struktūra · 3. Mokymosi ritmas
- Kiekviename: 3 kortelės Atsitiktinai / Fragmentuotai / Sistemiškai (plona kairė juostelė)
- Apačia: „Komandos pasirengimo profilis: pirmiausia pasirink visas tris dimensijas.“
- Kartojasi „Pasirinkta: Dar neužpildyta“ prie kiekvienos grupės

**JSON / code anchors:**

- Slide `id: 10.255` · image `m10_team_readiness_lab` · Pattern `interactive-control-lab` (Shell = Ne)
- `M10TeamReadinessLabBlock.tsx` — 3× `ChoiceControl` `columns={3}` + `optionTone={LEVEL_OPTION_TONE}`
- `m10TeamReadinessContent.ts` — `getTeamReadinessLevels()` **vienas** 3 būsenų masyvas visoms dimensijoms
- Tokenai: `LEVEL_OPTION_TONE` slate / amber / brand; `LEVEL_CHIP_CLASSES` tik summary chip’ams
- SOT §3b0: 3 dimensijos × tos pačios 3 būsenos; **ne** L0–L3; **ne** brandos balas; **ne** 10.26 risk strip
- Feature Doc: `M10_TEAM_READINESS_LAB.md`
- GOLDEN §3.1c tekstas sako 10.255 brand-only; **kodas jau turi** `optionTone` — `[KONFLIKTAS docs↔live]` (live teisingesnis šiam labui)

**Koreliacija su T01 (10.45):** tas pats jausmas „blanku / vienoda“, **kita priežastis**. 10.45 = viena kopėčia, viršus nesusietas su apačia. 10.255 = trys dimensijos naudoja **tą patį** 3 būsenų šabloną, todėl ekranas atrodo kaip copy-paste. **Nelipdyti 10.45 v02 čia** (SOT draudžia L0–L3).

**Statusas:** open · **Netaisyta.** · v2 spec užrakintas žemiau (koreliuoja su testeriu).

---

#### Koreliacija: testeris ↔ T02 ↔ v2 spec

**Taip — ta pati problema.** Įrankis tvarkingas; vizualiai viskas vienodo svorio. Akis nemato: kas svarbiausia / kur esu / ką rinktis / kuo skiriasi blokai. Vienas sakinys: _per daug vienodo vizualinio svorio, per mažai sąveikos semantikos._

| Testeris              | T02 (pirma diagnozė)           | v2 (šis tekstas)                                        | Koreliacija                                            |
| --------------------- | ------------------------------ | ------------------------------------------------------- | ------------------------------------------------------ |
| Įrankis geras         | Job OK, 3×3 OK                 | Struktūra / triada / forma OK; neblogas ekranas         | **Sutampa**                                            |
| Per blanku ir vienoda | FAIL hierarchija + blyškumas   | Visa masė vieno tono; wireframe, ne assessment          | **Sutampa**                                            |
| (neišsakyta)          | FAIL 9 bendri aprašai          | **„Problema ne content’e“**; copy revoliucijos nereikia | **`[KONFLIKTAS]`** — žr. žemiau                        |
| —                     | statusHint ×3 + legend dublis  | Būsenos tik tekstas, ne vizualas; 1–2–3 sulygintos      | **Sutampa** (v2 giliau: ritmas, rezultato kulminacija) |
| —                     | optionTone silpnas iki pick    | Selected/unselected = aukščiausias ROI; triad = šerdis  | **Sutampa**                                            |
| Nelaužyti             | Nelaužyti 3×3 / balo / rainbow | Neperdaryti; 3 sluoksniai; ne daugiau spalvų            | **Sutampa**                                            |

**`[KONFLIKTAS]` copy:** T02 Must #1 (9 unikalūs aprašai) vs v2 „turinys jau aiškus“.  
**Sprendimas batch’ui:** copy revoliucija **demote į Could**. Vietoje to — viena eilutė **po pick** („Praktika vyksta pavieniui“). 9 aprašai tik jei po hierarchijos eilutės vis dar atrodo identiškos.

**`[KONFLIKTAS su SOT]` rezultato badge:** v2 siūlo `Profilis: Fragmentuota komanda`. SOT §3b0 + Feature Doc: **ne** brandos sertifikatas, **nėra** bendro balo, silpniausia dimensija → kitas veiksmas. Komandos etiketė = būtent tai, ko draudžiama.  
**Kulminacija vizualiai — taip. Copy = silpniausia dimensija + vienas kitas veiksmas**, ne komandos brandos vardas.

Ikonos: kode **jau yra** (`UsersRound` / `Target` / `ClipboardCheck`) — per mažos ir tos pačios brand-50. v2 „pridėti ikonas“ = **sustiprinti esamas**, ne naujas dekoras.

---

#### Patikra pagal SOT / GOLDEN / §4.2

| #   | Kriterijus                                                   | Vertinimas                     | Kodėl                                                                                                                   |
| --- | ------------------------------------------------------------ | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| 1   | Job (3 dim × būsena → silpniausia → kitas veiksmas, be balo) | **OK**                         | SOT §3b0 laikosi. Nelaužyti.                                                                                            |
| 2   | 3×3 struktūra                                                | **OK**                         | Layout geras. Teserio „per vienoda“ ≠ „perstatyti“.                                                                     |
| 3   | Vizualinė hierarchija / blankumas                            | **FAIL**                       | Nested white-on-brand-50; nepasirinktos kortelės baltos; tone = 4px juostelė. Semantika nematyti, kol nepasirinkta.     |
| 4   | Trys blokai skiriami žvilgsniu                               | **FAIL**                       | Tas pats karkasas + tos pačios 3 kortelės + tas pats aprašas. Unikalus tik klausimas (12px pilkas) ir ikona.            |
| 5   | Būsenų tekstas pagal dimensiją                               | **WEAK** (v2: ne Must)         | Bendras 3 aprašų masyvas vis dar klonuoja eilutes. v2: copy revoliucijos nereikia — Could, jei hierarchija neužtenka.   |
| 6   | Chrome kartojimas                                            | **FAIL / WEAK**                | Klausimas 2× (pilkas po antrašte + ChoiceControl `legend`). `statusHint` „Pasirinkta: Dar neužpildyta“ ×3 + summary ×3. |
| 7   | `optionTone` būsenoms (slate/amber/brand)                    | **OK politika; WEAK vykdymas** | Ordinali įpročio skalė — ne rainbow dimensijoms. Unselected vis tiek `bg-white`.                                        |
| 8   | 10.26 risk strip / balas / L0–L3                             | **OK kad nėra**                | Won’t.                                                                                                                  |
| 9   | Exclusive choice                                             | **OK**                         | Trys radiogrupės, ChoiceControl.                                                                                        |
| 10  | Profilis tuščioje būsenoje                                   | **WEAK**                       | Placeholder geras, bet konkuruoja su 4× „neužpildyta“.                                                                  |

**Bendras verdiktas:** struktūra **OK**. Hierarchinė komunikacija **FAIL**. Wireframe, ne assessment. Nelaužyti 3×3 ir be-balo taisyklės.

---

#### Ką daryti (v2 locked — 3 sluoksniai, ne perstatymas)

v2 teisingai: ne „spalvingiau“, o **spalva = būsena**, **kontrastas = svarba**, **kortelė = sprendimo taškas**.

**3 sluoksniai:**

1. **Hierarchija** — kur pradėti / kas svarbiausia / kur sprendimas / kur išvada. Antraščių svoris, tarpas tarp major blokų, rezultatas ≠ dar viena kortelė.
2. **Semantinės spalvos** — neužpildyta neutralu; pasirinkta brand; rezultatas išryškinta zona; info subtili. Triada: Atsitiktinai blankiau → Fragmentuotai perėjimas → Sistemiškai sodriausia. **Ne** raudona–geltona–žalia.
3. **Kortelių charakteris** — hover / selected (ryškesnis border + tint + check). ChoiceControl dalį to jau turi; unselected vis tiek balta, todėl atrodo kad „stovi“.

**Must (aukščiausias ROI):**

1. Aiškios **selected / unselected** (tint + border); būsenos tonas matomas **prieš** pick (slate/amber/brand plovimas, ne tik 4px).
2. **1–2–3 hierarchija:** numerio badge; klausimas = H; paaiškinimas silpnesnis; daugiau oro tarp sekcijų; vienas klausimas (ne antraštė + legend dublis). Ritmas: numeris → klausimas → pasirinkimas.
3. **Rezultatas = finalas:** atskiras fonas, didesnis padding, mini santrauka. Copy = silpniausia dimensija + kitas veiksmas. **Ne** `Fragmentuota komanda` kaip brandos antspaudas.

**Should:**

4. Viršus = tikras progress: **0/3 … 3/3**; chip’ai neutralūs kol tuščia, spalvinis patvirtinimas po pick.
5. Po pick viena interpretacijos eilutė (`Atsitiktinai → Praktika vyksta pavieniui`).
6. Sustiprinti **esamas** dimensijų ikonas + numerį (orientacija, ne dekoras).
7. Išmesti `statusHint` „Pasirinkta: Dar neužpildyta“ ×3.

**Could:** 9 unikalūs kortelių aprašai; accordion — tik jei po Must eilutės vis dar siena.

**Won’t:** daugiau spalvų / RYG; dekoratyvūs shadow/gradient; viską ryškinti vienodai; 10.26 strip; L0–L3; bendras balas; komandos brandos badge.

**Siūlomas batch savininkas vėliau:** UI_UX (svoriai, state, rezultato zona) → CODING (`ChoiceControl` unselected wash + hide duplicate legend; summary 0/3) → CONTENT (po-pick eilutė + rezultato sakinys, ne 9 rewrite) → QA.

**DoD jei kada batch:** teseris mato 3 diagnostines dimensijas, aktyvų pasirinkimą ir kulminaciją apačioje; vis dar be balo ir be komandos brandos vardo.

---

### R.M10-T03 – Skaidrė `10.26` lab „Kada tvirtina žmogus?“ (Daryk dabar)

**Testerio signalas:** šitas **geresnis**; vis tiek kortelės **maišosi tarpusavyje**; kodėl nėra **ryškių atskyrimų**?

**UI kontekstas (screenshot, scenarijus = Grąžinimas, režimas dar nepasirinktas):**

- Takeaway + shield
- Juosta „Kur tu esi rizikoje“ / PASEKMĖ × ATŠAUKIMAS: S1 Maža · S2 Vidutinė (selected, gintaras) · S3 Kritinė
- Kairė: 3 scenarijų kortelės (mėlyna / gintaras+check / rose)
- Dešinė: 4 režimų kortelės 2×2 (rose / gintaras / brand / slate), visos nepasirinktos
- Po režimais: „Pasirink kontrolės režimą…“
- Feedback / meteriai / artefaktas — žemiau fold (screenshot’e nematyti)

**JSON / code anchors:**

- Slide `id: 10.26` · `m10_human_control_simulator` · GOLDEN §3.1c + W1.1 risk strip
- `M10HumanControlSimulatorBlock.tsx` — `RiskStrip` **ir** `ChoiceControl` scenarijams abu kviečia `setScenarioId` (dvigubas pickeris)
- `RiskStrip` mygtukai: `aria-hidden` + `tabIndex={-1}`, vizualiai vis tiek kortelės
- `optionTone`: scenarijus = stake (brand/amber/rose); režimas = griežtumas (rose/amber/brand/slate)
- Tokenai: `m10HumanControlLabTokens.ts` — visos šeimos naudoja tą patį stripe + selectedBorder rinkinį

**Koreliacija:** geresnis už T02 (čia semantika **yra**). Maišosi dėl tos pačios priežasties kaip T01 dual-picker + T02 „viskas kortelė“ — tik čia trys šeimos, ne trys klonai.

**Statusas:** open · **Netaisyta.** · v2 spec užrakintas žemiau (koreliuoja su testeriu).

---

#### Koreliacija: testeris ↔ T03 ↔ v2 spec

**Taip — ta pati problema.** Semantika jau yra; grupių hierarchija per silpna, kortelių panašumas per didelis. Ne trūksta spalvų. Vienas sakinys: _trūksta ne ryškesnių kortelių, o ryškesnių parent container’ių ir selected ≠ severity._

| Testeris                                | T03                             | v2                                                                                         | Koreliacija                                  |
| --------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------- |
| Geresnis nei 10.255                     | Semantika OK                    | Daugiau įtampos / gradacijos; nebe wireframe                                               | **Sutampa**                                  |
| Kortelės maišosi; nėra ryškių atskyrimų | FAIL: tas pats primityvas × 3   | Similarity + proximity + silpnas common region; vaikai matosi labiau nei tėvai             | **Sutampa** (v2 = gestalt vardai tam pačiam) |
| —                                       | Must: trys paviršiai            | Ryškinti **grupes**, ne korteles; kairė/dešinė = konteineriai                              | **Sutampa**                                  |
| —                                       | Must: selected ≠ rizikos spalva | Variant A: juosta/badge = severity; border+tint+check = selected                           | **Sutampa**                                  |
| —                                       | Dual picker juosta+kairė        | Viršus ir apačia per silpnai kaip žingsniai                                                | **Sutampa skausmas**; žr. SOT pataisą        |
| Nelaužyti / ne daugiau spalvų           | Won’t daugiau hue               | Nedėti atsitiktinių spalvų; nestorinti visų borderių; nespręsti grupavimo kortelių outline | **Sutampa**                                  |

**`[KONFLIKTAS su SOT / W1.1]` trys žingsniai.** v2 kompozicija: `1 rizika → 2 scenarijus → 3 kontrolė`. Live modelis: **scenarijus = rizika** (1:1). Grąžinimas **yra** S2, ne atskiras antras sprendimas po S2. Juosta = pasekmė × atšaukimas **to paties** scenarijaus, ne laisvas pirmas pickeris.  
**Vizualiai atskirti juostą — taip. Mokyti kaip nepriklausomą 1 žingsnį — ne.** Tikra seka: žemėlapis (statusas) → **pasirink scenarijų** → **pasirink režimą** → taisyklė.

v2 5 ROI (locked, su ta pataisa):

1. Didesnis gutter tarp stulpelių.
2. Foniniai konteineriai kairei ir dešinei (common region).
3. Selected atskirti nuo severity.
4. Stipresnės grupių antraštės + subtitle (`ką DI daro` / `kaip prižiūrima`).
5. Juostą atskirti kaip **žemėlapį**, ne kaip 1-ąjį laisvą sprendimą.

---

#### Patikra (diagnozė – ne pataisa)

| #   | Kriterijus                                           | Vertinimas                        | Kodėl                                                                                                                      |
| --- | ---------------------------------------------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| 1   | Job (scenarijus × režimas → fit/mismatch → taisyklė) | **OK**                            | Geresnis assessment nei 10.255. Nelaužyti modelio.                                                                         |
| 2   | Rizikos semantika (brand/amber/rose)                 | **OK**                            | GOLDEN §3.1c čia **leidžiama** ir veikia. Todėl „geresnis“.                                                                |
| 3   | Selected state                                       | **OK** kairėje; **WEAK** dešinėje | Scenarijus turi check + border. Režimai dar tušti — 2×2 atrodo kaip dar viena juosta.                                      |
| 4   | Kortelių atskyrimas tarp zonų                        | **FAIL**                          | Strip + scenarijai + režimai = tas pats primityvas (balta / radius / juostelė / 2px border). Nėra trijų **paviršių**.      |
| 5   | Spalva = dvi prasmės                                 | **FAIL / WEAK**                   | Gintaras vienu metu: S2 juostoje, pasirinktas Grąžinimas, ir režimas „Išimčių peržiūra“. Spalva nebesako „kuri šeima“.     |
| 6   | Dual picker (strip + kairė)                          | **FAIL**                          | Kaip 10.45 pill’ai: juosta klikinama **ir** scenarijų sąrašas. W1.1 norėjo strip (statusas), live = trečias ChoiceControl. |
| 7   | S1/S2/S3 kodai                                       | **WEAK**                          | Tas pats L0 raštas, švelniau: chip „Vidutinė“ gelbsti.                                                                     |
| 8   | Stulpeliai kairė/dešinė                              | **WEAK**                          | `gap-5` be atskirų šulinių. Dešinė 2×2 tankesnė — ritmas lūžta, bet zonos nesuskaitomos.                                   |
| 9   | W1.1 empty cell / risk strip                         | **OK kontrakto**                  | 3 chip’ai, be tuščios celės. Forma vis tiek kortelės, ne juosta.                                                           |
| 10  | A11y strip                                           | **WEAK**                          | `aria-hidden` klikinami mygtukai — ne teserio skausmas, bet paryškina „čia ne pickeris, bet atrodo kaip pickeris“.         |

**Verdiktas:** logika ir semantika **OK** (geresnis). Chromo šeimos **FAIL** — nėra ryškių atskyrimų, nes visos zonos piešiamos tuo pačiu ChoiceControl veidu.

**Kodėl nėra atskyrimų:** ne trūksta dar vienos spalvos. Trūksta **skirtingų komponentų vaidmenų**. Kol juosta, scenarijus ir režimas atrodo kaip tos pačios kortelės, akis skaito vieną sieną.

---

#### Ką daryti (v2 locked — zonos, ne storesnės kortelės)

**Principas:** tu bandai struktūrą spręsti kortelių dizainu; reikia **konteinerių ir hierarchijos**. Ryškinti grupes.

**Must:**

1. Kairė ir dešinė = du parent konteineriai (subtilus skirtingas `bg` / rėmas / vidinis padding). Kortelės priklauso zonai.
2. Didesnis horizontalus tarpas (+ optional gutter). Proximity dabar per silpnas.
3. **Selected ≠ severity:** juosta/badge = pavojus; border + tint + check = ką pasirinkau.
4. Juosta = žemėlapio/statuso blokas (chip’ai, ne ChoiceControl klonai); ne trečias pickeris ir ne „pirmas laisvas rizikos žingsnis“.

**Should:**

5. Antraštės kaip inkarai (svoris + subtitle). Scenarijai = ką procesas daro; kontrolė = kaip prižiūrima.
6. Daugiau margin po juosta, kad mapa ≠ lygiavertis content area.
7. Paaiškinamąjį sakinį kelti arčiau rezultato zonos, ne footnote po visko.

**Won’t:** daugiau atsitiktinių spalvų; storesni borderiai visur; grupavimas vien kortelių outline; nepriklausomas „pirmiausia pasirink S1/S2/S3“; nuimti risk palette; tuščia 2×2 celė.

**Siūlomas batch savininkas vėliau:** UI_UX (common region, selected vs stripe, juosta kaip mapa) → CODING (wells, gutter, RiskStrip chip, ChoiceControl selected ring) → CONTENT (group subtitles) → QA.

**DoD jei kada batch:** teseris mato tėvus (zonas) prieš vaikus (korteles); gintaras nereiškia ir selected, ir severity, ir kitos grupės.

---

### R.M10-T04 – Skaidrė `10.48` „5 darbo eigos šablonai“ (Daryk dabar / toolChoiceBar)

**Testerio signalas:** viskas **vienodo svorio ir nuobodu**. Kodėl? Ką keisti?

**UI kontekstas (screenshot, pasirinkta Grandinė):**

- Daryk dabar + ilgas body (įskaitant „Po savitikros – orkestravimo simuliacija…“)
- Klausimas 12px: „Kurį šabloną taikysi savo procesui?“
- 5 pill’ai vienoje eilėje: Grandinė (accent geltona) · Maršrutizavimas · Lygiagretus · Koordinatorius · Generatorius + vertint… (kertasi)
- Meta: „Pasirinkus – žemiau parodomas tavo promptas“
- whenHint kaip paprastas body: Taip / Ne grandinei

**JSON / code anchors:**

- Slide `id: 10.48` · `toolChoiceBar` **default chips** (ne `prompt-tool`, ne ChoiceControl)
- `ContentBlockSlide.tsx` ~1078: `flex flex-wrap gap-2`; selected = `bg-accent-500` (ne brand)
- `whenHint` po juosta, tas pats `typographyClasses.body` kaip Daryk pastraipa
- Linked copyables `linkedRowIndex` 0–4 — planas žemiau (screenshot’e fold)
- GOLDEN §3.8.1 etalonas ChoiceControl = M7/90; 10.48 paliktas chip’ais
- SOT: 5 **kategoriniai** šablonai, ne L0–L3 skalė

**Koreliacija:** T02 „vienodas svoris“ + T01 „pill’ai be charakterio“. Čia kitaip: ne kopėčios ir ne 3 zonos, o **5 vardai be sprendimo kriterijaus ant paties pasirinkimo**. Prasmė (Taip/Ne) gyvena po juosta, todėl juosta nuobodi.

**Statusas:** open · **Netaisyta.** · v03 locked (testerio paste 2026-08-13 + SOT/GOLDEN filtras).

---

#### Koreliacija: testerio paste ↔ T04 v02 ↔ projektas

**Taip — ta pati problema.** Turinys OK; chrome FAIL. Testeris ir v02 sutampa: vienas konteineris, vienodas teksto svoris, 5 vardai be kriterijaus, apačia konkuruoja su veiksmu, **ne daugiau spalvų**.

Testeris savarankiškai aprašė **ChoiceControl** (label + 1 eilutė + brand border/tint + ✓). Tai jau etalonas GOLDEN §3.1b / M7/90 — 10.48 vis dar default **accent chips**.

| Testeris                                                           | T04 v02                                         | SOT / GOLDEN                                                                                 | Verdiktas                                       |
| ------------------------------------------------------------------ | ----------------------------------------------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| Vienas konteineris = teksto masė                                   | FAIL hierarchija                                | §3.2 Daryk = brand zona; §3.8.1 vienas veiksmas + trumpas feedback                           | **Sutampa**                                     |
| Nėra title → task → choice → feedback                              | Must: klausimas = H                             | Content-block chrome lieka Trumpai → Daryk → Copy                                            | **Sutampa** (H **viduje** Daryk, ne vietoje jo) |
| 6 instrukciniai signalai → max 3                                   | Must: trumpas Daryk; meta hint lauk             | Trumpai jau sako „pasirink vieną – pamatysi planą“; Daryk dubliuoja + spoilina 10.485/10.482 | **Sutampa**                                     |
| Orkestravimo spoileris prieš pirmą pick                            | Must: išimti                                    | Eilė `10.48 → 10.485 → 10.482`                                                               | **Sutampa**                                     |
| Klausimas dabar label                                              | Must: klausimas = H                             | `toolChoiceBar.question` renderinamas `typographyClasses.label`                              | **Sutampa**                                     |
| Pill’ai = navbaras; descriptor 2–4 žodžiai ant kortelės            | Must: ne 5 sulyginti pill’ai + 1 eilutės hintas | ChoiceControl `description`; §3.1b be description dublio `statusHint`                        | **Sutampa** (stipriausias Must)                 |
| Selected = CTA geltona; geriau border+tint+✓                       | Must: selected = **brand**                      | §3.1b selected = brand, ne accent; chip’ai `bg-accent-500`                                   | **Sutampa** (T03: selected ≠ fill-as-CTA)       |
| Taip/Ne → contextual panel po pick                                 | Must: whenHint = atlygis                        | SOT §3b3: pasirink → whenHint (kada taip/ne) → linked planas                                 | **Sutampa**                                     |
| `**` matosi Markdown                                               | _(nauja)_                                       | `section.body` eina per `renderBodyWithBold`; `whenHint` chips = raw `<p>`                   | **Sutampa + UI klaida** (ne tik svoris)         |
| „Pasirinkus… promptas“ antrinis                                    | Must: meta hint išmesti                         | Linked copy ir taip atsiranda; §3.2 „žemiau“ tik jei vizualiai po                            | **Sutampa**                                     |
| Nedėti daugiau spalvų                                              | Won’t rainbow                                   | T01/T03; kategorijos ≠ skalė                                                                 | **Sutampa**                                     |
| „Daryk dabar“ = mažas eyebrow; naujas H „Pasirink proceso šabloną“ | Klausimas = H                                   | §3.2 **Daryk dabar** = sekcijos antraštė visame produkte                                     | **Nesutampa chrome** — žr. Konfliktas A         |
| Padidinti Daryk header ~30–40 %                                    | —                                               | Accent biudžetas; visų content-block vienodas chrome                                         | **Won’t globaliai**                             |
| „Kurį proceso **modelį**“                                          | —                                               | SOT §3b3 / 10.485 / M11 = **šablonas**, ne modelis                                           | **Nesutampa terminas** — Konfliktas B           |
| Extra CTA „Rodyti promptą →“                                       | Copy lieka linked                               | §3.8.1 vienas dominuojantis CTA; T01 dual picker                                             | **Won’t** — Konfliktas C                        |
| Koordinatorius descriptor „Skirsto užduotis“                       | Mini glyph Should                               | SOT: dinamiškai skaidyti specialistams. „Skirsto“ ≈ 10.482 orkestratorius                    | **Nesutampa semantika** — Konfliktas D          |
| 5 kortelės vis dar vienoje eilėje (piešinyje)                      | Wrap / 2 eilės                                  | ChoiceControl `columns` max **3**; 5-as label jau lūžta                                      | **Dalinai** — wrap būtinas, ne navbaras         |

**Koreliacija su T01–T03:**

| Ankstesnis                                      | Čia                                                               |
| ----------------------------------------------- | ----------------------------------------------------------------- |
| T01: pill’ai = kodai be vardo                   | pill’ai = vardai be 1 eilutės prasmės                             |
| T02: vienodas svoris / instruction dump         | tas pats content-block well + 6 signalai                          |
| T03: selected ≠ severity fill; feedback po pick | selected ≠ accent CTA; whenHint = feedback, ne trečia instrukcija |
| Cross-cut                                       | vienas signalas = viena prasmė; progressive disclosure            |

---

#### Konfliktai (testeris teisus dėl skausmo, ne visada dėl chrome)

**A. „Daryk dabar“ → eyebrow.**  
Produktinis chrome visose veiksmo skaidrėse = **Daryk dabar** (brand). Paversti jį mažu eyebrow tik 10.48 = ši skaidrė iškrenta iš ciklo Trumpai → Daryk → Copy → Patikra.  
**Batch:** palikti „Daryk dabar“ kaip sekcijos label. Stipriausias tekstas **viduje** = klausimas (`Pasirink proceso šabloną` / `Kurį šabloną taikysi?`).

**B. „Proceso modelis“.**  
SOT ir savitikra 10.485 klausia **šablono**. „Modelis“ = trečias terminas (šablonas / darbo eiga / modelis).  
**Batch:** `šablonas`. Klausimo H gali būti `Pasirink proceso šabloną` (testerio antraštė be „modelio“).

**C. „Rodyti promptą →“.**  
Po pick linked copyable **jau** atsiranda. Antras CTA = T01 dual-action. GOLDEN §3.8.1: vienas veiksmas, trumpas feedback, vienas CTA (Copy).  
**Batch:** contextual panel + savaime atsiveriantis planas. Jokio extra mygtuko.

**D. Koordinatorius ≠ orkestratorius.**  
Testerio „Skirsto užduotis“ mokytų 10.482. Live whenHint: dinamiškai skaidyti / fiksuota grandinė.  
**Batch descriptoriai (locked, 2–4 žodžiai):**

| Šablonas                   | Ant kortelės              | Ne                                                          |
| -------------------------- | ------------------------- | ----------------------------------------------------------- |
| Grandinė                   | Žingsniai iš eilės        | —                                                           |
| Maršrutizavimas            | Kelias pagal tipą         | —                                                           |
| Lygiagretus                | Vienu metu, tada sujungti | „Veiksmai vienu metu“ OK, jei nepainioja su koordinatoriumi |
| Koordinatorius             | Skaido specialistams      | **Skirsto užduotis** (orkestratorius)                       |
| Generatorius + vertintojas | Juodraštis ir patikra     | „Sukuria ir patikrina“ OK                                   |

---

#### Patikra (diagnozė – ne pataisa)

| #   | Kriterijus                             | Vertinimas        | Kodėl                                                                                                                        |
| --- | -------------------------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| 1   | Job (pasirink 1 šabloną → planas copy) | **OK**            | Linked copy + whenHint logika gera. Nelaužyti 5 šablonų.                                                                     |
| 2   | Hierarchija / svoris                   | **FAIL**          | Daryk body = klausimas = meta hint = Taip/Ne — vienas `body` sluoksnis. Nėra „čia sprendimas“.                               |
| 3   | 5 pill’ai vienoje eilėje               | **FAIL**          | Vienoda forma; 5-as label kertasi; unselected = tuščios kapsulės.                                                            |
| 4   | Prasmė vs valdiklis                    | **FAIL**          | Mokymas yra `whenHint` (Taip/Ne). Jis vizualiai footnote. Pill’as tėra vardas.                                               |
| 5   | Selected = accent geltona              | **WEAK**          | GOLDEN ChoiceControl selected = **brand**. Chip’ai čia `accent-500` — atrodo kaip atsitiktinis highlight, ne M10 sprendimas. |
| 6   | Daryk body apimtis                     | **WEAK**          | „Po savitikros – orkestravimo simuliacija (KAIP…)“ = kitos skaidrės spoileris, lygiavertis svoris su pačia užduotimi.        |
| 7   | Meta „promptas žemiau“                 | **WEAK**          | Konkuruoja su whenHint; jei copy atsiranda, sakinys nereikalingas.                                                           |
| 8   | 5 spalvos šablonams                    | **Won’t**         | Kategorijos, ne ordinali skalė. Rainbow = T03 klaida.                                                                        |
| 9   | Pattern                                | **OK kaip embed** | Ne lab. Galima kilti į ChoiceControl (M7/90) be naujo Pattern / Feature Doc.                                                 |
| 10  | `**` whenHint                          | **FAIL**          | JSON `**Taip:**`; chips renderina raw text. Body naudoja `renderBodyWithBold`.                                               |

**Verdiktas:** įrankio logika **OK**. Chrome **FAIL**. Testerio paste **koreliuoja** su v02; filtras = chrome A/B/C/D.

**Kodėl vienodo svorio:** viskas vienoje brand dėžėje, vienodu šriftu, vienodais tarpais. Vienintelis kontrastas — geltonas pill (dar ir CTA-spalva). To nepakanka hierarchijai.

---

#### Ką keisti (v03 locked, ne perstatymas)

Hierarchija: **Daryk dabar** (chrome) → klausimas H → 1 eilutės secondary → 5 kortelės (vardas + descriptor) → po pick: subtilus feedback (Tinka/Netinka) → linked planas (Copy). Max **3** instrukciniai signalai.

**Must:**

1. Daryk body ~1 eilutė (`Pasirink vieną šabloną. Po pasirinkimo gausi to šablono planą.`). Orkestravimo / savitikros spoilerį išimti (priklauso 10.485 / 10.482).
2. `toolChoiceBar.question` = H (`Pasirink proceso šabloną` arba `Kurį šabloną taikysi?`) — ne `label` dydis. Terminą **šablonas** palikti.
3. Chips → **ChoiceControl** (arba ekvivalentas): vardas + 1 eilutės descriptor (lentelė D); wrap, `columns` 2–3 (ne 5 navbaras). Selected = brand border + tint + ✓ (ne `bg-accent-500`). Unselected = neutralios kortelės.
4. `whenHint` po pick = contextual feedback (Tinka / Netinka), ne trečia pastraipa ir ne raw `**`. Meta `toolChoiceLinkedCopyHint` išmesti.
5. Max 3 signalai: klausimas, kortelės, feedback. Visa kita — progressive disclosure.

**Should:**

6. Tarpas intro → kortelės → feedback (ne vienodi `space-y-3`).
7. Mini topologijos ženklas tik jei descriptoriams vis dar trūksta charakterio — **ne** vietoj 1 eilutės.
8. Pickerio zona vizualiai atskirta nuo copyable plano (T03 parent).

**Won’t:** 5 rainbow; L0–L3; naujas Pattern/Shell; visų 5 planų iš karto; Daryk kaip eyebrow visame produkte; „proceso modelis“; extra CTA „Rodyti promptą“; Koordinatorius = „Skirsto užduotis“; didinti visų skaidrių „Daryk dabar“ 30–40 %.

**Minimalus v2 (jei batch siauras):** teserio 6 punktai, su filtrais A–D: H svoris; −50 % intro; descriptor ant kortelės; ✓ + brand tint; Taip/Ne → feedback box; daugiau oro. Be naujų spalvų.

**Siūlomas batch savininkas vėliau:** CONTENT (Daryk + question + descriptoriai + whenHint be `**` + Tinka/Netinka) → UI_UX/CODING (chips → ChoiceControl brand selected; whenHint per `renderBodyWithBold` jei chips lieka) → DATA (LT + `build:modules-en-m10-m12`) → QA.

**DoD jei kada batch:** teseris pirmiausia mato klausimą ir 5 korteles su 1 eilutės prasme; po pick — feedback, tada planas; `**` nematyti; geltona CTA-pill nebėra selected.

---

### R.M10-T05 – Skaidrė `10.482` „Agentų orkestravimo simuliacija“ (schema, žingsnis 6/6)

**Testerio signalas:** schema vis dar reikalauja peržiūros. **Vykdymo agentai** ir **kviečia** vis dar ant linijos → padrikas įspūdis. Šriftai / dydžiai atrodo skirtingi. Kodėl?

**UI kontekstas (screenshot, Shell 6/6):**

- Caption: Agentų orkestravimo simuliacija
- Fan-out bus per **Vykdymo agentai** (strikethrough)
- Tyrėjas → Įrankiai: **kviečia** ant vertikalaus koto
- Taip pat šeima: **perduoda** / **patvirtina** arti koto (ne pirmas testerio sakinys, bet tas pats gestalts)
- Role juostos: violet orkestratorius, teal specialistai, amber vartai, slate įvestis/įrankiai
- Amber dėžės tamsus rašalas, kitos – baltas

**JSON / code anchors:**

- Slide `id: 10.482` · `m10_agent_orchestrator` · Pattern `multi-agent-flow` · Shell = Taip · W7 etalonas
- `M10OrchestratorDiagram.tsx` + `m10OrchestratorLayout.ts`
- `agentsBand` = nuogas `<text>` **prieš** fan-out `busPath` (paint order)
- `agentsBand.y = busY + 14` (baseline) į 34 px lane header; testas tik y vs busY/research.y — **nėra** text-bbox ∩ lane stroke
- `kviečia`: `research-tools` +4 bump; testas = `bumped.x - base.x === 4`, **ne** pill ∩ stroke
- Title: visada `typography.title.compact` (15), net desktop
- NodeBox: `stepLabel` 12 / 700 + `stepSub` 10 / 500; amber ink vs white
- Pamoka 2026-07-26: pad/bump be AABB = infinite polish

**Koreliacija:** T04/T02 „padrika“ čia **ne** content-block svoris. Čia SCHEME: etiketė ∩ linija + tipografijos kopėčios. T03 spalvų gausa – čia role-band **sąmoninga** (hub/specialist/gate); ne rainbow fix.

**Statusas:** open · **Netaisyta.** · v03 locked (testerio paste 2026-08-13 + W7/Kit filtras).

---

#### Koreliacija: testerio paste ↔ T05 v02 ↔ W7 / DiagramKit

**Taip — ta pati problema.** Logika OK; disciplina FAIL. Testerio sakinys („mazgai / jungtys / jungčių etiketės persidengia“) = T05 label-on-stroke + paint order. Jis savarankiškai aprašė **tris SVG sluoksnius**, kurių 2 ir 3 dabar lipa.

| Testeris                                                                            | T05 v02                              | W7 / Kit / SOT                                                                                                          | Verdiktas                                                                                           |
| ----------------------------------------------------------------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Etiketės ant linijų; 2∩3 sluoksniai                                                 | Must 1–2; bbox ∩ stroke              | Kit: edge pills **off-shaft**; pamoka pad-hell                                                                          | **Sutampa**                                                                                         |
| Vykdymo agentai = rėmas be headerio                                                 | Must 1: header + fonas lane viduje   | W7 P3 „lane header“ jau ketinta; live = naked text plyšyje                                                              | **Sutampa** (ketinta, neįvykdyta)                                                                   |
| kviečia ant koto; perduoda/patvirtina/Kartoti arti                                  | Must 2                               | Off-shaft + retry clearOfShaft                                                                                          | **Sutampa skausmas**                                                                                |
| Viena pozicijos taisyklė visiems (visada virš centro **arba** start **arba** galas) | Off-shaft pagal ašį                  | Tankiame grafe horizontalė ≠ vertikalė (State dešinėn, trunk kairėn)                                                    | **Nesutampa mechanizmas** — Konfliktas E                                                            |
| 4 tekstiniai lygiai A–D; jokių pusiau dydžių                                        | Must 3 caption 17; kopėčios 15/12/10 | Kit jau turi `title` / `stepLabel` / `stepSub` / `edgeLabel`                                                            | **Sutampa tikslas**; live **laužo** kopėčias (caption compact 15; edgeLabel **12 = node title 12**) |
| Įvestis eilė vs Tyrėjas eilė = „kita tipografija“                                   | Amber ink vs white; box H 64 vs 58   | W7 role-band (slate/violet vs teal/amber)                                                                               | **Dalinai** — tai **fill/ink**, ne antras šriftas; alignment vis tiek Should                        |
| Connectoriai: ištisinė / punktyras / stora magistralė neaišku                       | _(nauja)_                            | flow 3.5 solid = valdymas; data 2 dashed = būsena/įrankiai; feedback 3.5 amber U = kartoti; **bus = tas pats flow 3.5** | **Sutampa magistralė**; semantika **jau yra**, bet bus per sunki                                    |
| Magistralę lengvinti **arba** perbraižyti į atskiras orch→agent jungtis             | —                                    | W7 P2/P3: orthogonal trunk/bus/drops; **ne** linear agent pipeline / hypotenuse                                         | **Lengvinti = Should**; **žvaigždė = Won’t** — Konfliktas F                                         |
| Box title/sub ritmas, vertical center                                               | Should 4                             | NodeBox `h*0.38` vs `h-12`                                                                                              | **Sutampa**                                                                                         |
| Apačia dešinė tanku (patvirtina + HITL)                                             | silpnai minėta                       | HITL note po output                                                                                                     | **Sutampa** — kelti į Should                                                                        |
| Role spalvos OK (violet hub, žalias rezultatas)                                     | OK W7                                | Kit §4 role bands                                                                                                       | **Sutampa — palikti**                                                                               |
| Istorija Įvestis→…→Rezultatas skaitosi                                              | Job OK                               | full-map + Shell 1–6                                                                                                    | **Sutampa — nelaužyti**                                                                             |
| Kartoti vizualiai kaip kitos etiketės                                               | —                                    | Retry **privalo** gintaras + dashed U (ne cycle)                                                                        | **Pozicija taip; spalva ne** — Konfliktas G                                                         |
| Redline px sąrašas vs serijos taisyklės                                             | v02 jau taisyklės                    | Intake ≠ kodas                                                                                                          | **Taisyklės (v03)**; redline = batch SCHEME, ne dabar                                               |

---

#### Konfliktai (testeris teisus dėl skausmo, ne visada dėl topologijos)

**E. Viena anchor taisyklė visiems connectoriams.**  
„Visada virš linijos centre“ ant vertikalaus Tyrėjas→Įrankiai vėl uždėtų žodį ant koto (nėra horizontalės). „Visada prie galo“ kirstų rodyklės antgalį.  
**Batch:** viena **clearance** taisyklė (nė vienas label ∩ stroke; 8–16 px oras; nepermatomas chip). Anchor **pagal ašį**: horizontalė — virš koto; vertikalė — šalia koto; retry — virš U kojos. Ne trečias atsitiktinis pad.

**F. Magistralę keisti į atskiras jungtis nuo orkestratoriaus.**  
Tai grąžintų pre-W7 „agentų pipeline“ / įstrižas. Bus **yra** shared execution metafora.  
**Batch:** `busPath` lengvesnis (`stroke.inactive` 1.5 arba data 2), ne žvaigždė.

**G. Kartoti = toks pat pill kaip kviečia.**  
Gintaro U = grįžtamasis ciklas (Kit feedback). Suvienodinti spalvą su flow veiksmažodžiais = paslėpti retry.  
**Batch:** ta pati **clearance** + chip forma; spalva lieka amber.

**H. Nauja 4 lygių sistema nuo nulio.**  
Tokenai jau A–D. FAIL = **vykdymas**: desktop caption 15; group header ir HITL abu `subtitle` 10; edge 12 konkuruoja su node 12.  
**Batch:** laikytis esamų tokenų; group header ≠ HITL; connector chip svoris 500 (ne 700). Ne naujas 14 px „pusiau“.

---

#### Kodėl ant linijos (ne „trūksta +4 px“)

1. Label įspraustas į ~14 px plyšį po bus / lane viršaus. SVG `y` = **baseline**. Šriftas 10 → viršus ≈ `y − 8`.
2. `agentsLane.y = laneTop`; `busY ≈ laneTop − 4`; `agentsBand.y = busY + 14 ≈ laneTop + 10`. Teksto viršus ≈ `laneTop + 2` → **lane stroke kerta žodžius**.
3. Juosta piešiama **po** tekstu → linija vizualiai viršuje.
4. Testas saugo `y ≥ busY+14` ir `research.y − y ≥ 16`, bet **ne** bbox ∩ stroke. Todėl CI žalias, screenshot raudonas.

**kviečia**

1. Vertikalus kotas Tyrėjas→Įrankiai (tas pats `cx`). Pill turėtų būti dešinėn (`pillW/2+14+4`).
2. Testas tikrina tik **+4 deltą**, ne ar pill kerta koto stroke. Trumpas tarpas (~58 px) + dashed data stroke + pusiau permatomas fill → žodis vis tiek „ant rodyklės“.
3. Tas pats pad-hell kaip `paskiria` / `nukreipia` (jau kartoti 5× 2026-07).

**Šriftai — tas pats `DIAGRAM_TOKENS.font`.** Skiriasi kopėčios ir rašalas, ne šeima:

| Paviršius              | Dydis                                     | Svoris | Rašalas                      |
| ---------------------- | ----------------------------------------- | ------ | ---------------------------- |
| SVG caption            | **15 compact visada** (desktop turėtų 17) | 700    | brandDark                    |
| Dėžės vardas           | 12                                        | 700    | baltas **arba** amber tamsus |
| Dėžės sub              | 10                                        | 500    | 88 % baltas / gintaro        |
| Edge pill              | 12                                        | 500    | pagal fill                   |
| Vykdymo agentai / HITL | 10                                        | 500    | muted                        |

Akis skaito „keli šriftai“, nes 15/12/10 + 700/500 + baltas/tamsus viename kadre. Caption `compact` ant desktop = LMS caption taisyklės pažeidimas.

---

#### Patikra (diagnozė – ne pataisa)

| #   | Kriterijus                             | Vertinimas                 | Kodėl                                                                       |
| --- | -------------------------------------- | -------------------------- | --------------------------------------------------------------------------- |
| 1   | Job (6 žingsnių simuliacija, full-map) | **OK**                     | Nelaužyti W7 always-on + Shell 1–6.                                         |
| 2   | Etiketė ∩ linija (band)                | **FAIL**                   | Naked text plyšyje; paint order; testas silpnas.                            |
| 3   | Etiketė ∩ linija (kviečia)             | **FAIL**                   | +4 be stroke AABB.                                                          |
| 4   | Tipografijos kopėčios                  | **FAIL / WEAK**            | 15 vs 12 vs 10; title.compact desktop.                                      |
| 5   | Amber ink vs white                     | **OK politikos**           | Kontrastas ant geltonos, ne antras šriftas.                                 |
| 6   | Role spalvos                           | **OK W7**                  | Hub/gate/specialist. Ne T03 rainbow.                                        |
| 7   | Pad-hell pamoka                        | **FAIL kartojasi**         | Band nėra pill → AABB testas jos nemato.                                    |
| 8   | Connector semantika (solid/dash/amber) | **OK kodo; WEAK mokiniui** | 3 tipai jau yra; bus = flow 3.5 todėl atrodo ketvirtas „magistralės“ tipas. |
| 9   | Viena anchor taisyklė visiems          | **Won’t kaip parašyta**    | Clearance viena; anchor pagal ašį.                                          |

**Verdiktas:** geometrija **FAIL**. Semantika / Pattern / role-band **OK**. Šriftai **tas pats family**, kopėčios **netolygios**. Testerio paste **koreliuoja**; filtras = E–H.

---

#### Ką keisti (v03 locked, ne perstatymas)

W7 disciplina (ne nauja schema): **mazgai** po **jungčių**; **etiketės** niekada ∩ stroke. Tokenai A–D jau yra — vykdyti juos.

**Must:**

1. **Vykdymo agentai** = konteinerio header (fonas, viršutinis kairys / virš rėmo), piešti **po** `busPath`. Ne plyšyje po magistrale. Testas: text-bbox ∩ bus ∩ lane-top = tuščia.
2. Connector label **clearance** (ne +N): pill/text ∩ stroke tuščia; 8–16 px oras; nepermatomas chip. Horizontalė — virš koto; vertikalė (`kviečia`) — šalia; retry (`Kartoti`) — virš U kojos. Tas pats chip **forma**; Kartoti spalva lieka amber.
3. Desktop caption = `title.desktop` (17). Jokio 15 „pusiau“ ant desktop. Group header ≠ HITL (abu dabar `subtitle` 10).

**Should:**

4. NodeBox title/sub: vienodas gap + optinis centras visuose tono dėžėse.
5. Fan-out `busPath` lengvesnis (1.5–2), ne `stroke.flow` 3.5 — vis dar bus, ne žvaigždė.
6. Apačia dešinė: vienas veiksmažodis (`patvirtina`); HITL footnote atitrauktas / Shell hint, ne trečias sluoksnis prie rodyklės.
7. Jei po 1–5 vis dar neaišku dashed vs solid — viena eilutė Shell hint (valdymas / duomenys / kartoti), **ne** legenda ant SVG.

**Won’t:** žvaigždė orch→kiekvienas agentas; vienas anchor visoms ašims; Kartoti nudažyti kaip flow; nauja 14 px kopėčia; nuimti role-band; hide-until-live; naujas Pattern; desktop enlarge; px redline intake’e.

**Siūlomas batch savininkas vėliau:** SCHEME (sluoksniai + clearance testai + bus weight) → CODING → QA (`lmsMultiAgentPolish`). CONTENT tik jei HITL eina į Shell hint.

**DoD jei kada batch:** 6/6 screenshot — nė vienas žodis nekerta koto; grupės header skaitosi kaip zona; teseris neskaito „kelių šriftų“; magistralė nebe dominuoja kaip ketvirtas connectoriaus tipas.

---

### R.M10-T06 – Skaidrė `10.15` „Darbo eigos pagrindai“ / sekcija „Darbo eigos grandinė“ (`m10_trigger_flow`)

**Testerio signalas:** reikia kelių iteracijų; schema **per maža**, **neišsami**, aprašai **skurdūs**. Neatitinka tikslo – kad schema būtų skaidrės centre, o dėstymas suktųsi aplink ją. Ar tas tikslas teisingas?

**UI kontekstas (screenshot, žingsnis 1/3 Paleidiklis):**

- Sekcijos H1 „Darbo eigos grandinė“ + Shell status „Pasirinktas žingsnis: Paleidiklis 1/3“
- 3 maži brand box’ai (Paleidiklis geltonas ring; Sąlyga dashed; Veiksmas)
- Po Paleidikliu: **Paleidiklio tipai** ant vertikalios punktyrinės rodyklės; chip’ai Forma / Laikas / Pranešimas
- Caption: webhook = paleidiklio tipas
- Shell explanation kartoja box: „įvykis pradeda eigą. Tipai: Forma, Laikas, Pranešimas.“
- Sekcijos body dar kartą: „Paleidiklis → Sąlyga → Veiksmas. Paleidiklio tipai: …“
- Daug balto oro; schema viduriniame trečdalyje

**JSON / code anchors:**

- Slide `id: 10.15` · `m10_trigger_flow` · Shell = **3** (T/C/A); webhook = tipo chip (pamoka 2026-07-26)
- Layout: viewBox **640×236**, box **118×52**, `max-w-3xl` — W2 etalonas DA ~600×440, BOX_H 58
- `typesLabelY: 144` ant koto `cx(trigger)` ↑ nuo `typeRowY: 160`
- Box sub: `stepSub.desktop - 1` (**9 px**, žemiau Kit grindų ≥10)
- Caption: `title.compact + 1` = 16 (pusiau dydis, kaip T05)
- Shell body = box sub echo (`getM10TriggerFlowStepExplanations`)
- Sekcijos `body` = ta pati grandinė dar kartą
- SOT §3a: GOLDEN ciklas Trumpai → **diagrama** → pavyzdys → sąvokos → Daryk → Copy → Patikra
- LMS 1A: `density="hero"` jau įjungtas factory; geometrija vis tiek „iliustracija teksto skaidrėje“
- Premium key sąraše (`ContentBlockSlide`) — slim chrome OK, dydis vis tiek 3xl×236

**Koreliacija:** T04/T02 vienodas svoris (tekstas = schema); T05 label ∩ linija (`Paleidiklio tipai`); T05 kopėčios (9/12/16). Čia papildomai: **schema ne hero**, dėstymas slenka į sienas po diagrama.

**Statusas:** open · **Netaisyta.** · v03 locked (testerio paste 2026-08-13 + GOLDEN/Shell filtras).

---

#### Koreliacija: testerio paste ↔ T06 v02 ↔ projektas

**Taip — ta pati problema.** Eskizas, ne mokymosi scena. Testeris ir v02 sutampa: per maža, label ∩ linija, skurdūs echo aprašai, tuščia erdvė ne ten. Modelis (T/C/A + stepper + active ring) **OK**.

| Testeris                                       | T06 v02                      | SOT / GOLDEN / Kit                                                    | Verdiktas                           |
| ---------------------------------------------- | ---------------------------- | --------------------------------------------------------------------- | ----------------------------------- |
| Schema per smulki; 25–40 %                     | I1 viewBox/box + max-w-5xl   | W2 BOX_H 58 vs live 52; 236 px juosta                                 | **Sutampa** (mastelis, ne % magija) |
| Tipai konkuruoja su flow                       | I1 atskirti lygius           | SOT: tipai po Paleidikliu, ne 4 žingsnis                              | **Sutampa**                         |
| Label ∩ linija + webhook caption arti          | I1 off-shaft                 | T05 clearance                                                         | **Sutampa**                         |
| Box sub per silpnas; mazgai trumpi             | I2 SVG trumpi; mokymas Shell | Kit: short box, full in explanation                                   | **Sutampa** (jo paties Won’t #2)    |
| Apačios blokas silpnas / per didelis už turinį | I2 Shell ≠ echo              | `createLinearProcessBlock` explanation = 1 `<p>`                      | **Sutampa skausmas**                |
| 4 laukai: Kas / Pvz / Kada / Klaida            | I2 pvz + kontrastas          | T04 max 3 signalai; §3.8.1 trumpas feedback                           | **Dalinai** — Konfliktas I          |
| Variant B: schema kairė, kortelė dešinė        | I3 viewport                  | Factory = diagrama → nav → explanation apačioje; visos linear schemos | **Nesutampa chrome** — Konfliktas J |
| Tipai = selectable chips                       | —                            | Dabar statiniai; klikas = antras pickeris (T01)                       | **Won’t** — Konfliktas K            |
| 1 eilutės reikšmė ant tipų (Forma = …)         | I2                           | T04 descriptor ant kortelės                                           | **Sutampa Should**                  |
| Stepper 1–3 + geltonas active                  | palikti                      | Shell nav + `stroke.active`                                           | **Sutampa — nelaužyti**             |
| 5 teksto lygių (page/schema/node/sub/step)     | I3; T05 A–D                  | Sekcijos H1 **ir** SVG caption = „Darbo eigos grandinė“               | **Sutampa** — vieną antraštę nuimti |
| Nedėti ilgesnio teksto į node                  | I2                           | Kit                                                                   | **Sutampa**                         |
| Nedidinti visko / ne daugiau linijų            | I1–I2                        | §3.11 enlarge Won’t                                                   | **Sutampa**                         |
| Copy su „webhook“                              | —                            | SOT: **internetinis pranešimas**                                      | **Nesutampa terminas**              |

---

#### Konfliktai

**I. Keturi lygiaverčiai laukai apačioje.**  
Teserio A variantas (Kas tai / Pavyzdžiai / Kada / Klaida) = ketvirta siena — T02 vienodas svoris.  
**Batch:** **3 taktai** vienam žingsniui: kas tai (įskaitant kada) · 1–2 pvz · dažna klaida. Ne 4 H3.

**J. Schema kairė / kortelė dešinė.**  
Keistų `InteractiveDiagramShell` visoms linear schemoms, arba 10.15 išeitų iš factory. Mobile = reflow.  
**Batch:** pirma turtingesnis explanation **apačioje** (I2). 2 stulpeliai = Could, ne Must; ne forkinti 10.15.

**K. Tipai klikinami.**  
Antras pickeris šalia 1–3 Shell (T01).  
**Batch:** statinė klasifikacija + 1 eilutės descriptor. Webhook akcentas (amber) lieka vizualus, ne antras CTA.

**L. „+25–40 %“ kaip DoD.**  
Be AABB ir viewBox SOT vėl pad-hell.  
**Batch:** box ≥ W2 grindų (H≥58, platesnis gap); `max-w-5xl`; schema vizualiai dominuoja pirmame viewport. Ne procentas.

---

#### Ar schema turi būti centre? (produkto klausimas)

**Taip — proceso schemai.** LMS 1A / Kit: `density=hero`, schema = mokymo objektas, Shell paaiškinimas = dėstymas **prie** schemos. Trumpai lieka trumpas įėjimas; Daryk/Copy/Patikra lieka GOLDEN ciklas **po** hero.

**Ne** = ištrinti visą content-block ir palikti tik SVG. SOT §3a sąmoningai nori pavyzdžio, sąvokų, šablono. Tie blokai turi **orbitinti** schemą (Shell žingsnis 1 = Paleidiklis + pavyzdys; 2 = Sąlyga…), ne dubliuoti ją pastraipomis žemiau.

Live 10.15: hero **flag** yra, hero **gestalts** nėra. Todėl teseris teisus.

---

#### Patikra (diagnozė – ne pataisa)

| #   | Kriterijus                         | Vertinimas             | Kodėl                                                             |
| --- | ---------------------------------- | ---------------------- | ----------------------------------------------------------------- |
| 1   | Job (T/C/A; webhook ≠ 4 žingsnis)  | **OK**                 | Nelaužyti 3 Shell žingsnių.                                       |
| 2   | Schema = skaidrės centras (LMS 1A) | **FAIL**               | 236 px juosta + `max-w-3xl` + H1 + echo body = iliustracija.      |
| 3   | Dėstymas aplink schemą             | **FAIL**               | Shell echo; turtingas turinys (pavyzdys, sąvokos) tik slenkant.   |
| 4   | Aprašai skurdūs                    | **FAIL**               | Box sub 1 eilutė; Shell kartoja ją; 9 px sub.                     |
| 5   | Label ∩ linija                     | **FAIL**               | `Paleidiklio tipai` ant ↑ koto (T05 šeima).                       |
| 6   | Triple dublis                      | **FAIL**               | SVG + Shell + section.body.                                       |
| 7   | GOLDEN §3.2 ciklas                 | **OK kaip eilė**       | Trumpai→schema→…→Daryk palikti; pirmas viewport turi būti schema. |
| 8   | Desktop enlarge kaip „padidinti“   | **Won’t**              | §3.11 false affordance.                                           |
| 9   | 4 H3 insight kortelė               | **WEAK kaip parašyta** | Vertė OK; 4 lygiaverčiai laukai = siena (I).                      |
| 10  | Tipai klikinami                    | **Won’t**              | Antras pickeris (K).                                              |
| 11  | 2 stulpeliai Must                  | **Could**              | Factory/mobile (J).                                               |

**Verdiktas:** pedagoginė ašis **OK**. Chrome **FAIL** hero + mokymo režimui. Testerio paste **koreliuoja**; filtras = I–L.

---

#### Ką keisti (v03 locked — 3 iteracijos)

Teserio v2 principas tinka: didesnė schema viršuje · tipai po aktyviu Paleidikliu · mokymas šalia, ne node viduje. Chrome = esamas Shell (ne naujas slide type).

**I1 · SCHEME:** box H≥58, platesnis gap, `max-w-5xl`; pagrindinis flow viršuje, tipai apačioje kaip sub-blokas (header ne ant koto); vienas švarus connectorius; sub ≥10; viena schema antraštė (nuimti SVG caption **arba** sekcijos H1 dublį). Testas: label ∩ ↑ stroke tuščia.

**I2 · CONTENT:** mazgai lieka trumpi. Shell = **3 taktai** (ne echo, ne 4 H3):

| Žingsnis    | Kas tai                                     | Pvz.                                                | Dažna klaida                      |
| ----------- | ------------------------------------------- | --------------------------------------------------- | --------------------------------- |
| Paleidiklis | Įvykis, kuris pradeda eigą                  | Forma / nustatytas laikas / internetinis pranešimas | Painioti su veiksmu               |
| Sąlyga      | Ar eiga turi tęstis (nebūtina pirmai eigai) | Jei naujas klientas; jei suma virš ribos            | Dėti sąlygą, kol T+A dar neveikia |
| Veiksmas    | Ką **sistema** padaro                       | Laiškas, CRM įrašas, užduotis                       | Vadinti veiksmu patį paleidiklį   |

Tipų descriptor (statinis): Forma — pateikia žmogus · Laikas — tvarkaraštis · Pranešimas — kita sistema. Terminą **internetinis pranešimas**, ne bare webhook mokinio H. Sekcijos body po diagrama iškirpti. `typesHint` į Shell 1 arba chip, ne trečia plūduriuojanti eilutė.

**I3 · UI_UX:** Trumpai trumpas; schema hero; explanation nustoja būti tuščia pilka juosta (struktūra, ne plotis). Daryk/Copy palikti. 2 stulpeliai = Could.

**Won’t:** webhook = 4 žingsnis; klikinami tipai; 4 lygiaverčiai H3; ilgas tekstas node viduje; daugiau linijų; desktop enlarge; forkinti 10.15 iš linear factory; naujas Pattern; „+25–40 %“ kaip DoD.

**Siūlomas batch savininkas vėliau:** SCHEME I1 → CONTENT I2 (copy locked aukščiau) → UI_UX I3 → DATA (LT + EN build) → QA.

**DoD jei kada batch:** schema dominuoja; Shell moko 3 taktais; tipai skaitosi kaip klasifikacija, ne tabs; teseris neskaito eskizo.

---

### R.M10-T07 – Skaidrė `10.35` „Įrankių pasirinkimo medis“ (`m10_tool_decision_tree`)

**Testerio signalas:** keisti **Workato → Cursor AI**; daugiau paaiškinimų; viskas **pilka ir nuobodu**; kaip padaryti, kad veiksmas suktųsi **apie schemą**.

**UI kontekstas (screenshot, šaka 1/5 Power Automate):**

- Sekcijos H1 = SVG caption „Įrankių pasirinkimo medis“ / „Darbo eigos įrankio pasirinkimas“
- Šaknis „Tavo kontekstas?“ → 5 pilkos kortelės; 1-a brand (Office 365 kasdien / Power Automate)
- Shell: „Paspausk šaką: Office 365 kasdien“ — instrukcija, ne mokymas
- Sekcijos body: „Paspausk šaką – pamatysi, kuris įrankis… Workato…“
- Daug balto oro; `max-w-3xl`; viewBox 680×300; leaf 118×68
- Žemiau skaidrėje (ne screenshot’e): Daryk Choice **4** (be Workato) + linked copy

**JSON / code anchors:**

- Slide `id: 10.35` · Pattern `decision-tree` · Shell = Taip
- `M10ToolDecisionTreeBlock.tsx` — `steps.body = pick + condition` (echo)
- SOT §3c: medis **5** (įsk. Workato enterprise orientyras) ≠ Choice **4** lean startas
- `tools.json`: **Cursor** `moduleId: 16` (Kodo kelias); **Workato** kataloge kaip automate
- Plain intake **P05** (done A copy; schema etalonas B **atidėtas**) — `[JAU]` explore vs commit
- Kit: decision-tree **brand-only**, ne rainbow (T01/T03)
- LMS 1A: `density=hero` flag; geometrija vis tiek iliustracija (kaip T06)

**Koreliacija:** T06 hero + silpnas Shell; T02 pilkas equal-weight; P05 dvi sąveikos. Nauja ašis: **Cursor ≠ darbo eigos platforma**.

**Statusas:** open · **Netaisyta.** · v03 locked (testerio paste 2026-08-13: ne 1:1; perrašyti medį **arba** palikti automate).

---

#### Koreliacija: testerio paste ↔ T07 v02 ↔ projektas

**Taip — ta pati problema.** Statinis pilkas sąrašas, ne sprendimo variklis. Testeris dabar **pats** sako: Workato→Cursor tik jei keiti visą logiką. Tai patvirtina T07 Won’t kaip 1:1.

| Testeris                                                      | T07 v02                         | SOT / GOLDEN                                     | Verdiktas                                               |
| ------------------------------------------------------------- | ------------------------------- | ------------------------------------------------ | ------------------------------------------------------- |
| Schema ne hero; content-block iliustracija                    | I1 FAIL centras                 | LMS 1A; T06                                      | **Sutampa**                                             |
| 5 šakos vienodo svorio; neargumentuoja                        | I1 Workato orientyras; I2 Shell | §3c 5 vs 4                                       | **Sutampa**                                             |
| Etiketės ≠ paaiškinimai                                       | I2 3 taktai                     | `whenHint` jau turi Taip/Ne+pvz — ne prie medžio | **Sutampa**                                             |
| Pilka; **ne** daugiau spalvų                                  | I1 selected/unselected          | Kit brand-only                                   | **Sutampa**                                             |
| 4 sluoksniai A–D (klausimas / šakos / selected / explanation) | I1 + I2                         | GOLDEN selected = **brand**, ne accent geltona   | **Sutampa A/B/D**; C = brand (T04)                      |
| Medis turi vesti + aiškinti + slopinti kitas                  | dim !selected jau yra silpnas   | `opacity.inactive`                               | **Sutampa** — stiprinti dim + selected                  |
| Cursor tik jei perrašai į „DI + automate“                     | Won’t 1:1                       | M10 ≠ M16; CURRICULUM                            | **Sutampa sąlyga**; perrašymas **Won’t** — Konfliktas M |
| Langflow / Dify / Pipedream kaip 5-a                          | —                               | Katalogas ≠ blogroll; SOT 5 vardai               | **Won’t** — Konfliktas N                                |
| Mikroaprašas ant šakos + ilgas tekstas **ne** viduje          | Should 1 eil.; I2 šalia         | T04 descriptor; Kit short box                    | **Sutampa** (jo rizikos #3)                             |
| 4 laukai arba 2 kolonos                                       | 3 taktai                        | T06 I                                            | **Dalinai** — Variantas **B**                           |
| CTA: Rodyti pavyzdį / promptą / Tęsti                         | Daryk copy jau yra              | T04 extra CTA                                    | **Won’t trečias CTA** — Konfliktas O                    |
| Selected = geltonas accent                                    | brand fill+ring                 | §3.1b; 10.48 mustard FAIL                        | **Nesutampa C** — brand, ne accent                      |
| Copy: „Pasirink situaciją… kodėl tinka…“                      | kirpti echo body                | CONTENT                                          | **Sutampa**                                             |

**Koreliacija su T06:** ta pati scena (hero + Shell moko + mazgai trumpi). Čia decision-tree, ne T/C/A grandinė.

---

#### Konfliktai

**M. Perrašyti medį į „DI darbo sistemos“ (+ Cursor).**  
Tai naujas M10 job ir eilė (Cursor = M16). SOT §3c = automate platformos.  
**Batch:** logika lieka. Workato = orientyras. Cursor ne šaka.

**N. 5-a šaka = Langflow / Dify / …**  
Rinkos blogroll; nėra SOT / Choice / copyable.  
**Batch:** palikti Workato.

**O. „Rodyti promptą“ po medžio.**  
Linked copy jau Daryk po Choice. Trečias CTA = T01 dual.  
**Batch:** medis → Shell „kodėl“ → Choice įsipareigok → Copy. Tęsti = skaidrės CTA.

**P. 4 H3 arba 2 stulpeliai Must.**  
Kaip T06: 3 taktai (kada · kodėl/pvz · netinka). Variantas B. 2 kolonos = Could.

---

#### Workato → Cursor? **Won’t** (kategorijos klaida)

10.35 job = **verslo automatizavimo platforma** (Zapier / Make / n8n / Power Automate / Workato). Cursor = **DI kodo redaktorius**, mokomas M16, ne „jei Office 365 → …“ medis.

Įdėjus Cursor: mokinys painiotų IDE su eigų platforma; Choice 4 neturėtų Cursor; M16 netektų pirmo teisingo įvedimo.

**Batch:** Workato lieka 5-a šaka kaip **orientyras** (ne Choice ketvertas — P05). Cursor — ne čia; optional 1 eilutė collapsible „Kodo redaktorius – Kodo kelyje“, ne medis.

---

#### Patikra (diagnozė – ne pataisa)

| #   | Kriterijus                                    | Vertinimas                    | Kodėl                                                                 |
| --- | --------------------------------------------- | ----------------------------- | --------------------------------------------------------------------- |
| 1   | Job (kontekstas → automate įrankis)           | **OK**                        | Nelaužyti 5 šakų + 4 commit.                                          |
| 2   | Schema = centras                              | **FAIL**                      | 300 px + 3xl + pilkos lapės = eskizas (T06).                          |
| 3   | Veiksmas apie schemą                          | **FAIL**                      | Shell = „Paspausk šaką“; tikras Taip/Ne = Choice žemiau.              |
| 4   | Paaiškinimai                                  | **FAIL**                      | Nėra kada / pvz / kodėl ne prie medžio.                               |
| 5   | Pilka / nuobodu                               | **FAIL chrome; OK politikai** | Brand-only sąmoninga. Trūksta selected vs unselected (T02), ne 5 hue. |
| 6   | Workato vizualiai orientyras                  | **WEAK**                      | P05 #3: 5-a šaka = dar viena pilka kortelė.                           |
| 7   | Workato → Cursor                              | **Won’t**                     | Kita kategorija / kitas modulis.                                      |
| 8   | Rainbow 5 įrankiams / accent geltona selected | **Won’t**                     | 5 produktai, ne skalė; C sluoksnis = brand (T04).                     |
| 9   | 4 H3 / 2 kolonos / extra CTA                  | **WEAK / Won’t**              | B variantas = 3 taktai; Copy lieka Daryk (O, P).                      |
| 10  | Perrašyti medį į DI sistemas                  | **Won’t**                     | CURRICULUM / M16 (M).                                                 |

**Verdiktas:** testerio paste **koreliuoja** ir **patikslina** Cursor (tik su perrašymu). Perrašymas ne šio modulio. Chrome FAIL lieka.

---

#### Ką keisti (v03 locked)

Testerio ašis: klausimas → šakos su prasme → slopinti kitas → iškart „kodėl šitas“. Ne daugiau spalvų, ne daugiau teksto mazge.

**Must:**

1. **I1:** hero dydis; A šaknis brand; B šakos baltos kortelės; C selected **brand** ring/fill (ne accent geltona); kitos stipriau dim; Workato = orientyras. Connectoriai aiškesni, ne rainbow.
2. **I2:** 1 eilutės kriterijus ant šakos (ne ilgas tekstas viduje). Shell = 3 taktai iš `whenHint` (kada · pvz · netinka). Workato: orientyras, įsipareigok iš 4 žemiau. Body: testerio sakinys („Pasirink situaciją… kodėl tinka, kuo stiprus, kada kitą“), ne „Paspausk šaką“.
3. **I3 / P05:** medis explore → Choice commit → Copy. Jokio extra „Rodyti promptą“.

**Should:** truncation fix; collapsible Cursor→M16 eilutė.

**Won’t:** Workato→Cursor be viso medžio perrašymo; perrašyti į DI sistemas šiame batch; Langflow/Dify 5-a; 5 hue; accent mustard selected; 4 H3 siena; desktop enlarge; Workato į Choice 4.

**Siūlomas batch:** SCHEME I1 → CONTENT I2 → DATA → QA.

**DoD:** schema = sprendimo variklis; Shell = kodėl šitas; testeris neskaito stilizuoto sąrašo; Cursor ne šaka.

---

### R.M10-T08 – Skaidrė `10.25` „3A strategija“ (`m10_three_a_strategy`)

**Testerio / savininko signalas:** pedagogiškai auksinė schema, o išpildymas ~5/10? Kodėl schema turi būti didesnė, šriftai įskaitomesni — kas blogai?

**UI kontekstas (screenshot, žingsnis 1/3 Automatizuoti):**

- Trumpai (accent) = 80/15/5 portfelis
- „Trys juostos – kada rinktis“ (brand) = visos 3 juostos Kiek / Kodėl / Pvz. **be klikų**
- Diagrama: stacked juosta 80 | 15 | 5 + vertikali legenda + Shell 1/3 + tas pats Automatizuoti tekstas
- Body po schema: „Paspausk juostą – kada rinktis…“
- Žemiau (ne first viewport): Pavyzdys → Daryk → Copy → Patikra

**JSON / code anchors:**

- Slide `id: 10.25` · Pattern comparison / stacked bar · Shell = Taip · `density=hero`
- `M10ThreeAStrategyDiagram.tsx` · `m10ThreeAStrategyLayout.ts` (viewBox **600×232**, barH **56**, `max-w-3xl`)
- Juostoje tik `%` jei `w ≥ 72` — 5 % **sąmoningai be teksto** (`INNER_PCT_MIN_W`)
- `getM10ThreeAExplanations` = Kiek / Kodėl / Pvz. (tas pats kaip sekcija „Trys juostos“)
- SOT §3b: first viewport **turi** mąstymo sluoksnį be klikų (M10-UX-3, 2026-07-26: „per plonas“)
- GOLDEN §3.2: Trumpai 1–2 sakiniai; default eilė Trumpai → Daryk (10.25 = dokumentuota išimtis)
- Scheme pamoka 2026-07-23: niekada title ant siauro segmento

**Koreliacija:** T06/T07 „hero FAIL“ čia **nėra tas pats job**. 10.15/10.35 mazguose _yra_ mokymas (vardai). 10.25 mokymas = **pločio santykis**.

**Statusas:** open · **Netaisyta.** · v02 locked (testerio paste 2026-08-13: 9 vs 5; hierarchija pirmiau už mastelį).

---

#### Koreliacija: testerio paste ↔ T08 v01 ↔ projektas

**Taip — koreliuoja.** Pedagogika 8.5–9, vizualas 5. Teseris pats sako: ne viena priežastis; dokumentas, ne plakatas. T08 v01 per stipriai pasakė „ne dydis“ — dydis yra **simptomas**, liga = hierarchija + echo.

| Testeris                                              | T08 v01                             | SOT / GOLDEN                      | Verdiktas                                                          |
| ----------------------------------------------------- | ----------------------------------- | --------------------------------- | ------------------------------------------------------------------ |
| Pirma matau 80/15/5, tada tekstą                      | Schema ne hero, nes mokymas viršuje | LMS 1A; §3b perkorekcija          | **Sutampa ašis**                                                   |
| Per daug lygiaverčio teksto                           | 4× echo                             | GOLDEN Trumpai 1–2 sakiniai       | **Sutampa**                                                        |
| Kirpti viršų 40–60 %; Trumpai 1 eil.                  | Must 1                              | §3.2                              | **Sutampa** (jo copy gera)                                         |
| Klikas / apačia = insight, ne recitacija              | Must 2                              | Shell Kiek/Kodėl/Pvz. = dublis    | **Sutampa**                                                        |
| Legenda + juosta = vienas kumštis; active bold        | Should dim                          | `opacity.inactive` silpnas        | **Sutampa**                                                        |
| 3 tonai: brand / teal / gintaras; 5 % maža bet matoma | 3 tonai OK; 5 % plona sąmoninga     | jau brand/emerald/amber           | **Sutampa spalvas**; 5 % = **punch, ne plotis**                    |
| Pilka; **ne** daugiau spalvų                          | —                                   | T02/T04                           | **Sutampa**                                                        |
| Tipografinė skalė A–E                                 | v01: šriftai 7/10 OK                | Kit `stepLabel` 12 / `stepSub` 10 | **Dalinai** — skalė Must; ne „viską padidink“                      |
| Schema +35–50 % **pirmas** pakeitimas                 | Won’t dydis kaip DoD                | jo paties rizika #2               | **Nesutampa eilė** — Konfliktas S                                  |
| 5 % kaip aha objektas                                 | 5 % lieka plona                     | 2026-07-23 be title juostoje      | **Sutampa „maža“**; **Must punch** (stroke/callout), ne infliacija |
| 4 H3: kas / kodėl / pvz / dažna klaida                | 3 taktai                            | T06 I                             | **Dalinai** — Konfliktas T                                         |
| Interaktyvi legenda 1–2–3                             | Dual picker juosta+stepper          | T01                               | **Sutampa vienas pickeris** — ne trečias CTA                       |

**Teserio vienas sakinys ir mūsų:** tas pats — geras modelis per silpną hierarchiją ir per daug konkuruojančio teksto. Mastelis padeda **tik po** kirpimo.

---

#### Konfliktai

**Q.** SOT §3b „Trys juostos be klikų“ vs echo — palikti **vieną** sluoksnį. Variantas A.

**S. „Pirmas pakeitimas = +35–50 % schema“.**  
Teseris pats: jei viršus lieka, schema vis tiek nedominuos.  
**Batch:** DoD = first viewport **dominuoja juosta** (akis per 1–2 s skaito 80/15/5). Svirtis #1 = kirpti viršų. Dydis = **Should** (`max-w-5xl`, aukštesnė juosta), ne izoliuotas Must %. Vardas 5 % viduje vis tiek Won’t.

**T. 4 H3 siena (kas / kodėl / pvz / dažna klaida).**  
Kaip T06: 3 taktai Must (kas+kodėl · pvz · **kada ne**). 4-as = Could.

**U. Platinti 5 % juostą, kad „egzistuotų“.**  
Meluotų portfelį.  
**Batch:** plotis lieka 5 %. Punch = gintaro stroke + `5 %` **šalia** (ne viduje) + selected dim kitas.

---

#### Verdiktas: idėja 9/10, chrome 5/10 — hierarchija, ne „tik dydis“

| Sluoksnis                    | Balas    | Kodėl                                                                                                    |
| ---------------------------- | -------- | -------------------------------------------------------------------------------------------------------- |
| Metafora (80/15/5 juosta)    | **9/10** | Vienintelė teisinga forma. 5 % plonumas = argumentas prieš „daugiau agentų“.                             |
| Skaitomumas / šriftai        | **7/10** | 80 % ir 15 % juostoje skaitosi. Legenda 12/10 px. 5 % _negali_ turėti įskaitomo vardo be melo apie dalį. |
| Pedagogika (ką duoda klikas) | **4/10** | Klikas kartoja jau perskaitytą tekstą.                                                                   |
| First viewport               | **5/10** | Du HTML blokai nukonkuruoja juostą; instrukcija apačioje.                                                |

**Kas blogai (viena eilutė):** hierarchija plokščia — pirmiausia tekstas, schema kaip dar vienas blokas; klikas kartoja tą patį.

Teseris teisus: 80/15/5 turi smogti per 1–2 s. Tai gaunama **kirpant viršų + iškeliant juostą**, ne vienu „+40 % SVG“.

---

#### Dydis vs 10.15 / 10.35 (vis dar skirtingas job)

| 10.15 / 10.35                      | 10.25                                                               |
| ---------------------------------- | ------------------------------------------------------------------- |
| Mazguose unikalūs sprendimo vardai | Mokymas = **plotis** (80 vs 5)                                      |
| Jei maža — neskaitai job           | Aukštesnė juosta padeda **po** kirpimo; viena pati 80/15/5 nekeičia |
| Šriftas mazge = mokymas            | Šriftas 5 % juostoje = **laužo metaforą** (jau FAIL 2026-07-23)     |

5 % ~28 px. Vardas „Autonomizuoti“ ten neturi tilpti. Legenda + callout `5 %` šalia = teisinga. Teseris nori, kad 5 % būtų **aha** (maža, bet matoma) — tai punch, ne infliacija.

---

#### Kas iš tikrųjų 5/10

1. **Keturi kartojimai tos pačios taisyklės** prieš Daryk: Trumpai → Trys juostos → legenda → Shell. Klikas = recitacija, ne naujas sluoksnis.
2. **Instrukcija po fakto.** „Paspausk juostą – kada rinktis“ — „kada rinktis“ jau yra antraštė viršuje.
3. **Dual picker:** juosta **ir** stepperis 1/2/3 tam pačiam turiniui (T01).
4. **Pavyzdys** po fold — ten, kur klikas turėtų vesti.
5. **5 % vizualiai dingsta** — nėra stroke/callout, tik plona dėmelė.
6. **Tipografija plokščia** — legendos 10 px ir HTML body per arti.

M10-UX-3 perkorekcija: tada per plonas first viewport; dabar per storas su echo.

---

#### Patikra (diagnozė – ne pataisa)

| #   | Kriterijus                   | Vertinimas           | Kodėl                                             |
| --- | ---------------------------- | -------------------- | ------------------------------------------------- |
| 1   | Job (portfelis, ne kopėčios) | **OK**               | Trumpai teisingas.                                |
| 2   | Metafora 80/15/5             | **OK**               | Stacked juosta = etalonas.                        |
| 3   | Schema = mokymo centras      | **FAIL**             | Iliustracija po dviejų sienų.                     |
| 4   | Klikas moko                  | **FAIL**             | Shell = „Trys juostos“ dublis.                    |
| 5   | Hierarchija / tipografija    | **FAIL chrome**      | Lygiaverčiai blokai; skalės nėra. Dydis antrinis. |
| 6   | 5 % kaip aha                 | **WEAK**             | Plotis teisingas; punch nėra.                     |
| 7   | Dual picker                  | **WEAK**             | Juosta + 1/2/3.                                   |
| 8   | 3 tonai                      | **OK**               | Kategorijos, ne rainbow.                          |
| 9   | +35–50 % kaip pirmas DoD     | **Won’t izoliuotai** | Konfliktas S.                                     |
| 10  | 4 H3 siena                   | **Won’t Must**       | 3 taktai (T).                                     |

**Verdiktas:** teserio paste **koreliuoja**. 5/10 = dokumentas, ne plakatas. Kirpti + vienas pickeris + 5 % punch. Ne „pirmiausia padidink“.

---

#### Ką keisti (v02 locked)

Teserio v2: 1 eil. santrauka → didelė juosta → vienas pasirinkimas → explanation card. Sutampa su T08, jei dydis eina **po** kirpimo.

**Must:**

1. **CONTENT:** Trumpai teserio eilutė: _„3A – sprendimų portfelis: 80 % automatizuok, 15 % asistuok, 5 % autonomizuok.“_ Mėlyną „Trys juostos“ kirpti arba perkelti į Shell. Vienas Kiek/Kodėl sluoksnis.
2. **CONTENT + SCHEME:** Shell = 3 taktai (kas+kodėl · pvz · **kada ne**). 4-as „dažna klaida“ = Could. Klikas ≠ recitacija. Body ne „Paspausk juostą“.
3. **UI:** vienas pickeris (juosta **arba** klikinama legenda). Stepperis = a11y. Tipografinė skalė: juostos `%` = insight; legenda selected bold; Shell = body; instrukcija = micro.
4. **SCHEME 5 % punch:** plotis lieka 5 %; gintaro stroke + `5 %` šalia; dim kitas.

**Should:** `max-w-5xl` + aukštesnė juosta (ne izoliuotas +35–50 %); legendos sub ne 10 px jei skalė leidžia; 80 % skaitomas per 1–2 s **po** kirpimo.

**Won’t:** dydis kaip pirmas/vienintelis DoD; vardas 5 % viduje; platinti 5 % dalį; 4 H3 siena Must; atsisakyti 3 tonų; daugiau spalvų; desktop enlarge; naujas Pattern.

**Siūlomas batch:** CONTENT (echo) → SCHEME (punch + dim + optional plotis) → DATA → QA.

**DoD:** first viewport smogia 80/15/5; klikas duoda naują sluoksnį; 5 % maža bet matoma; teseris neskaito „dokumento su įdėta diagrama“.

---

### R.M10-T10 – Skaidrės `10.15` / `10.8` pritaikymo katalogas (12→4)

**Testerio signalas:** 12 pritaikymo pavyzdžių modulio pabaigoje – per vėlai ir per mažas svoris. Auditas `X2-18`: katalogas pirmą kartą po „Ką išmokai“ ir skaičiuojamas kaip išmokta statistika.

**JSON anchor:** `10.15` `content.sections` „Kur pritaikyti“ + Patikra; `10.8` `stats[2]` + 4-a sekcija; `10.1` Neprivaloma be santraukos.

**Savininko sprendimas (Must):** 4 procesai (pardavimai / personalas / finansai / aptarnavimas) pirma `10.15`; `10.8` tik recap su etiketėmis Rizika / Rodiklis; hero stat = 1 eigos aprašymas. Naujos skaidrės / Pattern / `10.48` pickerio / diagramos nėra.

**Won’t:** 8 išmestų eilučių live collapsible; `firstAction24h` (A5-10); M12 121–123; hygiene → 0.

**Statusas:** **apdorota** · savininko batch 2026-08-16.

---

### R.M11-CHROME – Skaidrė `110.5` / EN `111` q6 (Path Test lukštas)

**Testerio / ownerio signalas:** LT savitikroje paskutinis mygtukas = `finish`, ne `Baigti`.

**Priežastis:** `WarmUpQuizSlide` `tCommon('finish')`, `common` ns rakto nebuvo — i18next grąžino raktą. Done-state hardcoded sakė, kad testas neįskaitomas. EN `m11-q6` scenarioContext turėjo „an evaluator to check the criteria“ × 2 (`build-en-m10-m12.mjs`).

**Must (shipped 2026-08-16):** `common.finish` · `contentSlides` savitikros copy · builder + overlay rebuild. Shared visiems `warm-up-quiz`.

**I3:** **M11 walked, no RAW** (2026-08-16). Should A3–A6 gated.

**Statusas:** **apdorota** (chrome) · walk uždarytas.

---

### R.M11-ITEMS – Skaidrė `111` (Path Test stuburas)

**Testerio / ownerio signalas:** testas 8/10; q8 raktas nesaugus pagal stiebo riziką; q4 primityvus; ~50 % distractorių absurdiški; q6 suplakta grandinė ir koordinatorius + RFP.

**Must+Should (shipped 2026-08-16):** q8 `correct: 3` = žmogaus patvirtinimas prieš siuntimą (10.26 `every_case`); išimtys lieka [0] temptation. q6 = nuosekli grandinė, be RFP. q1/q3/q7 plausible-but-wrong iš M10.

**Won’t šiame batch:** q4 / 10.6; q2/q5/q9 copy; temperature distractoriai; confidence scoringas; chrome A3–A6.

**I3:** **M11 walked, no RAW** (2026-08-16).

**Statusas:** **apdorota** (item quality) · walk uždarytas.

---

## Šablonas kitam įrašui

```markdown
### R.Mxx-Tnn – Skaidrė `{id}` „{title}“ (UI: n/N)

**Testerio signalas:** …

**UI kontekstas (iš copy paste / screenshot):**

- Title / subtitle
- Progress n/N · CTA
- Blokai

**JSON anchor:** `modules.json` slide `id: …`

**Darbinė hipotezė (ne sprendimas):** …

**Siūlomas batch savininkas vėliau:** CONTENT / CURRICULUM / UI_UX / SCHEME / DATA / CODING

**Statusas:** open · **Netaisyta.**
```

---

```text
CHANGES: R.M10-T01 10.45 — spalva + L0 (FAIL chrome, OK brand-only politika); gyvas turinys FREEZE
CHECKS: SOT §3b2 vs MiniDiagram `opt.code`; GOLDEN §3.1c; UI_UX §4.2
RISKS: rainbow `optionTone` kaip „semantika“; painioti intake su freeze off
NEXT: T01–T08 locked (T08 v02: hierarchija pirmiau už +35%); daugiau pastabų arba „tvarkom batch“
```
