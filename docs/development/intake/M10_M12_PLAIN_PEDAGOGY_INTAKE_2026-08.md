# M10–M12 plain / pedagogika intake (2026-08)

> **Fazė A – Intake.** Tu meta skaidres; aš tikrinu prieš SOT + `PAPRASTOS_KALBOS_GAIRES.md` + GOLDEN §3.2 / §4.2.  
> Live SOT: `docs/turinio_pletra_moduliai_10_11_12.md` + `src/data/modules.json` (M10–12).  
> **Turinio deep audit (2026-08-12):** [`M10_M12_CONTENT_DEEP_AUDIT_2026-08.md`](../M10_M12_CONTENT_DEEP_AUDIT_2026-08.md) — 47 sk. LT+EN; P0 ir P1 batch’ai pritaikyti (EN filler / `taskFrame` / `123` / glossary / kalba / hint ladder / kanonas).  
> Ankstesnis tobulinimo ciklas (Wave1–2): `M10_M12_TOBULINIMO_INTAKE_2026-07.md`.  
> **Statusas:** **CLOSED / FREEZE** 2026-08-12 — 11 M10 intake Must (§898) ✅; deep-audit P0/P1/P2 ✅; hygiene baseline 71. **NEXT = stop** (ne naujas polish ciklas).

---

## 0. Darbo ciklas

| Fazė          | Kas vyksta                              | Kas čia rašoma                |
| ------------- | --------------------------------------- | ----------------------------- |
| **A. Intake** | Pastebėjimai, copy paste, „per žargono“ | §0.1 + §R.\* – **be** keitimų |
| **B. Batch**  | Sutvarkome pagal prioritetą             | Apdorota zona + handoff       |
| **C. Sync**   | EN overlay, auditai                     | `build:modules-en-m10-m12`    |

**Taisyklės:**

1. Fiksuojame viską; nefiltruoju.
2. Nekeiciu live failų, kol neprasideda batch.
3. Konfliktas su 2026-07 intake / SOT → `[KONFLIKTAS]`, abi versijos.
4. Terminologija: **DI**; „promptas“; kreipinys **tu**.
5. Fokusas: **žargonas LT**, **pedagogika** (vienas sprendimas → lab → Patikra), ne naujas slide tipas.

### 0.1 Intake žurnalas

| #   | Data       | Modulis / skaidrė                                      | Tema                                                               | Kur        | Statusas                                   |
| --- | ---------- | ------------------------------------------------------ | ------------------------------------------------------------------ | ---------- | ------------------------------------------ |
| 1   | 2026-08-12 | M10 / `10.45` DI agentų tipai ir rolės (UI: 10/31)     | Per daug žargono; „triažas“; pedagogika                            | §R.M10-P01 | **done** · §898 OK                         |
| 2   | 2026-08-12 | M10 / `10.4` Įrankių pasirinkimas (UI: 17/31)          | Keista kelionė → „Verslo automatizavimo…“; ar reikia linko?        | §R.M10-P02 | **done** · §898 OK                         |
| 3   | 2026-08-12 | M10 / `10.5` Agentas ar paprastas promptas (UI: 18/31) | Ar kelionė siūlo eiti **atgal** į 10.48?                           | §R.M10-P03 | **done** · §898 OK                         |
| 4   | 2026-08-12 | M10 / `10.15` Pagrindinės sąvokos (UI: 22/31)          | **Atskiras darbas:** terminai LT/EN + schema kokybė                | §R.M10-P04 | **done** · intake OK; kanonas P1           |
| 5   | 2026-08-12 | M10 / `10.35` Automatizavimo įrankiai (UI: 24/31)      | Jau nebloga; **aiškumas** + schema → **srities etalonas**          | §R.M10-P05 | **done** · §898 OK                         |
| 6   | 2026-08-12 | M10 / `10.36` Kur paleisti (UI: 25/31)                 | Režimai + terminija – dar padirbėti aiškumo                        | §R.M10-P06 | **done** · §898 OK                         |
| 7   | 2026-08-12 | M10 / `10.37` GitHub kaip kodo šaltinis (UI: 26/31)    | UJ/UI/UX/tekstas – schematinis, „nebaigtas authoring“              | §R.M10-P07 | **done** · §898 OK                         |
| 8   | 2026-08-12 | M10 / `10.64` Minimalus eigos aprašymas (UI: 27/31)    | Žargonas + authoring klaidos → **atskiras perrašymas**             | §R.M10-P08 | **done** · §898 OK                         |
| 9   | 2026-08-12 | M10 / `10.65` Testavimas ir saugumas (UI: 28/31)       | Kam „neprivaloma“ jei yra trumpas/ilgas kelias? + neaiškus tekstas | §R.M10-P09 | **done** · optional OK; pointeriai taisyti |
| 10  | 2026-08-12 | M10 / `10.66` QC vertintojas (UI: 29/31)               | **QC** antraštėje – kas tai? Plain rename                          | §R.M10-P10 | **done** · §898 OK                         |
| 11  | 2026-08-12 | M10 / `10.7` Žodynėlis (UI: ~30/31)                    | Vėl „neprivaloma“; sync su bendru glossary; praktika               | §R.M10-P11 | **done** · EN P0 ✅; kanonas P1            |
| —   | 2026-08-12 | M10–12 cross                                           | EN build filler / `taskFrame` / `123` pointeriai / `128` claim     | deep audit | **P0 done**                                |

---

## RAW – pastebėjimai

### R.M10-P01 – Skaidrė `10.45` „DI agentų tipai ir rolės“ (UI: 10/31)

**Testerio signalas:** per daug žargono; neatitinka pedagogikos; LT „**Triazas???**“.

**UI kontekstas (iš copy paste):**

- Title: DI agentų tipai ir rolės · subtitle: Gylio lygiai ir kelių agentų rolės verslui
- Progress: 10 / 31 · Ankstesnė / Tęsti
- Blokai: Trumpai → lab „Gylis ir komandos rolės“ → Daryk dabar → Patikra → „Kada nenaudoti kelių agentų“
- Lab: L0–L4 pill’ai (L0–L3) · ChoiceControl Pokalbis/Agentas/Komanda/Srautas · artefaktas „Promptas tavo procesui“

**JSON / code anchors:**

- `modules.json` slide `id: 10.45`
- Lab copy SOT: `src/components/slides/shared/m10DepthRolesContent.ts` (`getDepthRolesUiLabels`, `getDepthOptions`, `formatDepthRolesArtefact`)
- Image key: `m10_agent_taxonomy` · Pattern `interactive-control-lab` (Shell = Ne)
- Turinio SOT: `turinio_pletra_moduliai_10_11_12.md` §3b2 (metafora „Registratūra / triažas“)

---

#### Patikra pagal SOT / gaires (diagnozė – ne pataisa)

| Kriterijus                          | Vertinimas | Pastaba                                                                       |
| ----------------------------------- | ---------- | ----------------------------------------------------------------------------- |
| Paprasta kalba (PAPRASTOS)          | **FAIL**   | `triažas`, `trigger`/`Trigger`, `RFP`, `CRM` be paaiškinimo UI                |
| Primariniai gylio vardai (SOT §3b2) | OK         | Pokalbis / Agentas / Komanda / Srautas – atitinka CONTENT skill 10.45         |
| L0–L3 kaip antrinis kodas           | OK / soft  | Badge OK; chrome vis tiek „Gylis + L\*“ – ne pagrindinė skausmo vieta         |
| Be „taksonomija“ UI                 | OK         | Laikytis                                                                      |
| Copy lab viduje (GOLDEN §3.1c)      | OK         | Laikytis                                                                      |
| Viena sprendimo ašis (pedagogika)   | **WEAK**   | Taisyklė ×3 (Trumpai + lab + Daryk); optional router/triažas per anksti Daryk |
| Anti-L2/L3 matomumas                | soft       | Collapsible „Kada nenaudoti…“ – geras turinys, silpnas signalas               |
| Title vs mokymo job                 | soft       | Title „tipai“, body/lab = **gylio pasirinkimas** – framing nesutampa          |

---

#### Žargono inventorius (LT, vartotojui matoma)

| Vieta                        | Tekstas dabar                                               | Problema                                                                | Siūloma kryptis batch’ui (ne pritaikyta)                                                                                                                                      |
| ---------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Daryk (`modules.json`)       | „maršrutizatorius – tik jei reikia **triažo**“              | **Triazas** – medicininis / ops skolinys; nepaaiškintas; testeris „???“ | Pakeisti verslo kalba: „tik jei reikia **pirmiausia išskirstyti** (pvz. pagal tipą)“ / „rūšiavimo prieš koordinatorių“                                                        |
| Lab `teamRolesNote`          | „…tik jei reikia **triažo** prieš koordinatorių“            | Tas pats                                                                | Sutapatinti su Daryk plain                                                                                                                                                    |
| Lab `routerToggle`           | „Pridėti maršrutizatorių (**triažas** prieš koordinatorių)“ | Toggle label krauna žargoną                                             | „Pridėti maršrutizatorių (pirmiausia **išskirsto** pagal tipą)“                                                                                                               |
| Artefaktas (Komanda+router)  | „kaip **triažuoja** prieš koordinatorių“                    | Veiksmažodis dar blogiau                                                | „kaip **išskirsto / nukreipia** prieš koordinatorių“                                                                                                                          |
| Trumpai + lab `decisionRule` | „reikia **triggerio**“                                      | EN loanword LT chrome                                                   | „reikia **paleidiklio**“ / „automatinio starto (pvz. nauja forma)“ – sutapatinti su M10 „paleidiklis“ kalba kitur                                                             |
| Srautas (L3) description     | „**Trigger** → veiksmai (automatizavimas)“                  | EN + abstraktus „automatizavimas“                                       | „**Įvykis / paleidiklis** → veiksmai (pvz. forma → CRM)“                                                                                                                      |
| Lab `examples`               | „laiškas · tyrimas · **RFP** · forma → **CRM**“             | Akronimai be gloss                                                      | „laiškas · tyrimas · **pasiūlymo užklausa (RFP)** · forma → **CRM**“ **arba** be RFP: „laiškas · tyrimas · sutartis · forma → klientų sistema“                                |
| SOT §3b2 lentelė             | Maršrutizatorius metafora „Registratūra / **triažas**“      | SOT pats maitina UI žargoną                                             | `[KONFLIKTAS su SOT]` – batch’e atnaujinti SOT metaforą → „Registratūra / skirstymas pagal tipą“; žodynėlyje `Maršrutizatorius` jau plain (be triažo) – **laikytis glossary** |

**Pastaba:** `Maršrutizatorius` pats savaime – **mokomas terminas** (glossary + unlock 10.451). Problema ne rolės vardas, o jo paaiškinimas per **triažą**.

---

#### Pedagogikos neatitikimas (kodėl „ne mūsų“)

1. **Job = vienas sprendimas (gylis), ne terminų siena.**  
   Lab geras (procesas → pasirink → copy). Chrome aplink jį **kartojasi** ir į Daryk įkiša optional ketvirtą rolę + triažą – per anksti, kai dalyvis dar renkasi L0–L3.

2. **„Pradėk nuo Agentas“** – gera taisyklė (SOT + CONTENT skill).  
   Bet ji kartojama Trumpai + lab + echo Daryk; Patikra vėl „lik prie Agentas“. Batch’e: **vieną kartą** stipriai (Trumpai arba lab), kitur – tik CTA.

3. **Title „tipai ir rolės“ vs mokymas „pasirink gylį“.**  
   Dalyvis girdi „tipai“, UI moko „gylį“ – lengvas framing friction. Batch’e: subtitle / Trumpai aiškiau „pasirink gylį; jei Komanda – rolės“ (be naujo Pattern).

4. **L3 / Srautas** įvedamas su Trigger/automatizavimas **prieš** 10.48 darbo eigos šablonus.  
   Rizika: L3 skamba „galingai“ be verslo pavyzdžio paprasta kalba. Anti-pattern collapsible – per silpnas.

5. **Kas jau gerai (neardyti batch’e):**  
   Pattern lab + Shell=Ne; plain Pokalbis/Agentas/Komanda/Srautas; Copy lab viduje; tiltelis į 10.451; be „taksonomija“ UI; 3 bazinės rolės (koordinatorius / specialistas / vertintojas).

---

#### Darbinė hipotezė batch’ui

- **Must:** išimti / pakeisti **triaž\*** visur LT UI + lab TS + artefaktas; sutapatinti su glossary „nukreipia / išskirsto“.
- **Must:** `trigger`/`Trigger` → plain LT (`paleidiklis` / `įvykis`) chrome + L3 aprašas.
- **Should:** RFP/CRM gloss arba paprastesni pavyzdžiai.
- **Should:** sutraukti chrome kartojimą; Daryk be router/triaž jargon – router tik lab’e kai Komanda.
- **Could:** SOT §3b2 metaforos eilutė be „triažas“; title/subtitle framing „gylis“, ne „tipai“.
- **Ne:** Pattern keitimas / Shell grąžinimas / 3A siena (→ 10.25).

**Siūlomas batch savininkas:** CONTENT (LT copy) → DATA (`modules.json` + `m10DepthRolesContent.ts` + EN `build-en-m10-m12.mjs` / EN labels) → QA (`audit:lt-address` smoke; rankinis 10.45). SOT §3b2 – CONTENT kartu su copy.

**Statusas:** open · **Netaisyta.**

---

### R.M10-P02 – Skaidrė `10.4` „Įrankių pasirinkimas“ (UI: 17/31)

**Testerio signalas:** keista kelionė – Trumpai nurodo skaidrę **„Verslo automatizavimo įrankiai“**; klausimas: **ar čia reikia linko?**

**UI kontekstas (iš copy paste):**

- Title: Įrankių pasirinkimas · subtitle: Ką gali naudoti DI – paieška, failai, API; platformos (ChatGPT, Claude, Gemini)
- Progress: 17 / 31
- Blokai: Trumpai → Populiarios DI platformos – ką turi → Daryk → Kopijuojamas promptas → Patikra
- Trumpai pabaiga: „Darbo eigos platformos (Zapier, Make, n8n, Power Automate) – skaidrė **Verslo automatizavimo įrankiai**.“

**JSON / eilės anchors:**

- `modules.json` slide `id: 10.4` (Trumpai body – tik **bold title**, be `relatedSlideId` / CTA / deepen)
- Tikslinė skaidrė: `id: 10.35` „Verslo automatizavimo įrankiai“
- Live eilė (`MODULIO_10_SKAIDRIU_EILES.md` + JSON):  
  `… → 10.49 → **10.4** → 10.5 → 10.51 → 10.6 → 10.61 → 10.15 → 10.151 → **10.35** → …`  
  → nuo 10.4 iki 10.35 dar **~6–7 skaidrės** (agentas vs promptas, path-step, klaidos, warm-up, trigger/action, section-break).

---

#### Ar reikia linko? (diagnozė)

| Variantas                               | Vertinimas | Kodėl                                                                                                                                                                                                        |
| --------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **A. Nuimti pointerį** (rekomenduojama) | ★★★★★      | 10.4 job = DI Tools/Browse (SOT §4.2); Zapier/Make – **kito** skaidrės darbas. Forward-by-title be veiksmo = „mirusi“ nuoroda → keista kelionė.                                                              |
| **B. Soft „vėliau“** be skaidrės vardo  | ★★★★       | „Darbo eigos platformas (Zapier…) – **vėliau šiame modulyje**.“ – nekviečia ieškoti neegzistuojančio mygtuko.                                                                                                |
| **C. Tikras deep-link į 10.35**         | ★★         | Techniškai įmanoma (kaip test remediation `relatedSlideId`), bet **laužo linear path**: šoka per 10.5–10.15; GOLDEN / kelionė = pirmyn, ne šokinėti. EcosystemDeepen = blog/ecosystem, ne intra-module jump. |
| **D. Perkelti 10.35 arčiau 10.4**       | ★          | Curriculum scope; ne šio intake default – SOT sąmoningai: workflow medis **po** trigger/action (10.15).                                                                                                      |

**Atsakymas testeriui:** **Ne – linko čia nereikia.** Reikia **nebūti mirusia nuoroda**: arba išimti, arba „vėliau“ be skaidrės title kaip CTA.

SOT pats įrašė pointerį (`§4.2` Trumpai) – `[KONFLIKTAS su SOT copy]`: SOT sako „skaidrė Verslo…“, bet 10.35 pastaba „Be pointerio atgal į 10.4“ – vienakryptis forward pointer be navigacijos = UX skylė.

---

#### Pedagogika / kelionė

1. **Du skirtingi job’ai** (SOT teisingai): 10.4 = ChatGPT/Claude/Gemini įrankiai; 10.35 = Zapier/Make/n8n/PA medis. Pointeris Trumpai **sumaišo** ribą – dalyvis galvoja „turėčiau dabar rinktis Zapier“.
2. **Laikas:** 10.35 ateina tik po workflow terminų (10.15) – teisinga seka; blogai yra **reklamuoti vardu** prieš laiką.
3. Tas pats anti-pattern echo: `10.5` Trumpai → „5 darbo eigos šablonai“ (atgalinė nuoroda – OK, jau matyta); `10.4` → ateitis be linko – **ne** OK.

---

#### Papildomas žargonas šioje skaidrėje (antrinis, jei batch’e)

| Tekstas           | Pastaba                                                                               |
| ----------------- | ------------------------------------------------------------------------------------- |
| Tools / MCP / API | Tools EN; MCP be gloss (PAPRASTOS neturi MCP eilutės – batch’e plain arba skliaustai) |
| 3 sluoksniai body | Gera pedagogika, bet tanku Trumpai+brand – soft trim                                  |

**Kas gerai:** job Daryk (nustatymai + „naudok paiešką“); Patikra konkreti; be sprendimų medžio ant 10.4.

---

#### Darbinė hipotezė batch’ui

- **Must (CONTENT):** Trumpai – nuimti „skaidrė **Verslo automatizavimo įrankiai**“ **arba** pakeisti į „vėliau – darbo eigos platformos (Zapier…)“ be mirusio title.
- **Should:** SOT §4.2 Trumpai sinchronizuoti su tuo pačiu.
- **Ne:** deep-link CTA į 10.35 iš 10.4; nekeisti eilės be CURRICULUM sprendimo.

**Siūlomas batch savininkas:** CONTENT → DATA (LT + EN build) → QA. Jei eilės klausimas – CURRICULUM (out of default).

**Statusas:** open · **Netaisyta.**

---

### R.M10-P03 – Skaidrė `10.5` „Agentas ar paprastas promptas“ (UI: 18/31)

**Testerio signalas:** ar vartotojo kelionė siūlo eiti **atgal**? Kodėl?

**UI kontekstas (iš copy paste):**

- Title: Agentas ar paprastas promptas · subtitle: Sudėtingos užduotys su įrankiais – agentas; vienas klausimas – paprastas promptas
- Progress: 18 / 31
- Trumpai pabaiga: „**Multi-agent šablonai** (grandinė, maršrutizavimas ir kt.) – skaidrė **„5 darbo eigos šablonai“**.“
- Taip pat: Patikra → „Kontrolinis taškas: promptas“ (pirmyn); collapsible „Kas bus vėliau“ (pirmyn)

**JSON / eilės anchors:**

- `modules.json` slide `id: 10.5`
- Nurodyta skaidrė: `id: 10.48` „5 darbo eigos šablonai verslui“
- Live eilė: `… → **10.48** → 10.485 → 10.482 → 10.481 → 10.49 → 10.4 → **10.5** → 10.51 → …`  
  → 10.48 jau **praeita** (~6 skaidrės anksčiau). Nuoroda = **atgalinė**, ne pirmyn.

---

#### Ar kelionė siūlo eiti atgal?

| Klausimas                                  | Atsakymas                                                                                                                                        |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Ar yra mygtukas / deep-link „eik į 10.48“? | **Ne** – tik bold title tekste (kaip 10.4 → 10.35 miręs pointeris).                                                                              |
| Ar semantika = „grįžk peržiūrėti“?         | **Taip, jaučiasi taip** – „skaidrė X“ skamba kaip navigacijos CTA.                                                                               |
| Ar tai ketinta pedagogika?                 | **Iš dalies:** ribos brėžimas – „čia = 1 agentas vs paprastas promptas; kelių agentų topologijos – **jau** buvo 10.48“.                          |
| Ar UJ tai laiko geru?                      | **Ne kaip dabar parašyta.** Atgalinis title-pointer be konteksto „jau matei“ = trintis: dalyvis ieško mygtuko arba abejoja, ar praleido skaidrę. |

**Kodėl taip atsirado (hipotezė):** po multi-agent klasterio (10.45–10.48) kelias eina į DI Tools (10.4) ir tik tada į „kada agentas vs promptas“ (10.5). Autorius bijo painiavos su L2 Komanda / 5 šablonais → Trumpai įdeda „ne čia – ten“. Bet **laikas** (po 10.48) reikalauja **recall**, ne **redirect** formuluotės.

---

#### UJ diagnozė (trumpai)

1. **Job 10.5** = sprendimas: agentas vs paprastas promptas + 5 dalių šablonas → path-step 10.51. Tai **pirmyn**.
2. **Atgalinė eilutė** Trumpai konkuruoja su job’u – skatina mintį „gal turėčiau grįžti“, nors CTA = Tęsti / kopijuoti.
3. **Gera kryptis kitur toje pačioje skaidrėje:** Patikra → 10.51; „Kas bus vėliau“ → darbo eigos spec – **pirmyn**. Palikti.
4. Poros su R.M10-P02: tas pats anti-pattern šeima – **skaidrės title kaip pseudo-nuoroda** (čia atgal, ten pirmyn į dar nematyta).

---

#### Batch kryptys (ne pataisa)

| Variantas                        | Vertinimas | Copy kryptis                                                                                                                        |
| -------------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **A. Nuimti** multi-agent eilutę | ★★★★       | Trumpai lieka tik agentas vs promptas + M4–M6 tiltelis. 10.48 jau praeita – nereikia kartoti.                                       |
| **B. Recall be „skaidrė“**       | ★★★★★      | „Tai **ne** kelių agentų šablonai (grandinė, maršrutas) – juos jau matei anksčiau. Čia – **vienas** agentas vs paprastas promptas.“ |
| **C. Deep-link atgal į 10.48**   | ★          | Dar blogiau – skatintų šokinėti; nekurti.                                                                                           |
| **D. Perkelti 10.5 prieš 10.48** | ★          | Curriculum; keistų SOT seką – ne default.                                                                                           |

**Papildoma pastaba (antrinė):** du copyable vienoje skaidrėje (pavyzdys + 5 dalių) – GOLDEN §3.2 „vienas copy“ įtampa; ne šio klausimo branduolys, bet batch’e galima pažymėti soft.

**Siūlomas batch savininkas:** CONTENT (UJ-aware recall) → DATA → QA. Ne CODING (nėra linko).

**Statusas:** open · **Netaisyta.**

---

### R.M10-P04 – Skaidrė `10.15` „Pagrindinės sąvokos“ (UI: 22/31) · **ATSKIRAS DARBAS**

**Testerio signalas:** reikia **atskirai** nusimatyti darbą (1) su **terminais** (pirmą kartą EN/LT), (2) su **schema** – kol kas neatitinka kokybės standartų.

**UI kontekstas (iš copy paste):**

- Title: Pagrindinės sąvokos · subtitle: Darbo eigos struktūra ir pavyzdžiai  
  (JSON title: `Pagrindinės sąvokos: trigger, action, condition, webhook`)
- Progress: 22 / 31 · CTA: Tęsti: Darbo eiga →
- Blokai: Trumpai → schema „Darbo eigos grandinė“ (`m10_trigger_flow`) → Veikiantis pavyzdys → Sąvokos – kontrastas → Kur pritaikyti → Daryk → Copy šablonas → Patikra → Papildomos sąvokos (collapsible)
- Schema UI: Shell 1/3 Trigger · box’ai Trigger / Condition / Action · tipų juosta Forma / Laikas / Webhook

**Anchors:**

- Slide `id: 10.15` · image `m10_trigger_flow`
- Pattern: `linear-process` · Shell = Taip · render `M10TriggerFlowBlock` / `M10TriggerFlowDiagram`
- Layout: `m10TriggerFlowLayout.ts` · labels: `m10DiagramContent.ts` (`getM10TriggerFlowLabels`)
- SOT: `turinio_pletra_moduliai_10_11_12.md` §3a
- Glossary: `Trigger`, `Action`, `Condition`, `Webhook` (EN term + LT def)
- Etalonas palyginimui: M10.2 `agent_workflow_diagram` (LMS polish) – ne tas pats job, bet tip/shaft/air checklist

---

#### Kodėl **atskiras** epic (ne „quick copy trim“)

| Sluoksnis       | Kodėl neįeina į P0/P1 chrome batch                                                                                                                                                            |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **A. Terminai** | Čia **pirmas oficialus** Trigger/Condition/Action/Webhook mokymas; sprendimas liečia title, schema labels, kontrastą, copyable, glossary, SOT, ir **upstream** 10.45 L3 „Trigger“ (R.M10-P01) |
| **B. Schema**   | Shell geometrija + tipų juosta + Webhook-as-type pedagogika; SCHEME §5 / DiagramKit – ne CONTENT-only                                                                                         |

**Batch izoliacija:** P04 **ne** maišyti su P01–P03 „plain chrome“ banga, nebent P01 trigger-replace **laukti** P04 produkto sprendimo (`[KONFLIKTAS]` žemiau).

---

#### A. Terminai – EN/LT pirmas pasirodymas (diagnozė)

**Dabar LT UI:** box labeliai = grynas EN (`Trigger`, `Condition`, `Action`, `Webhook`); subtitle LT (`paleidžia srautą`…); title H1 krauna EN sąrašą; „Sąvokos – kontrastas“ moko EN → LT prasmė; Action eilutėje kartą **„paleidiklis“** (LT), kitur Trigger.

| Vieta            | Problema                                                                                     |
| ---------------- | -------------------------------------------------------------------------------------------- |
| Title            | `trigger, action, condition, webhook` H1 – PAPRASTOS §2a / slide-titles: EN krūva antraštėje |
| Schema LT labels | EN be bilingual pirmo mokymo (`Trigger (paleidiklis)` ar pan.)                               |
| Trumpai / body   | EN terms OK jei **pirmą kartą su LT gloss**; dabar gloss silpnas / netolygus                 |
| Patikra          | „triggeris“ (LT morfologija) + „action“ – mišinys                                            |
| Collapsible      | Delay, filter, loop, error handler – vėl EN be LT; + miręs pointeris į 10.65 title           |
| Glossary         | Term = EN, def = LT – OK kaip SOT; UI turi **atvesti** į tą pačią porą                       |

**Produkto sprendimas batch’e (pasirinkti 1):**

| Opcija | Modelis                                                                          | Pastaba                                                 |
| ------ | -------------------------------------------------------------------------------- | ------------------------------------------------------- |
| **T1** | EN kanonas UI + pirmas paminėjimas `Trigger (paleidiklis / įvykis)`              | Artimiausia SOT + Zapier/Make kalbai; glossary lieka EN |
| **T2** | LT pirmas (`Paleidiklis`, `Sąlyga`, `Veiksmas`) + EN skliaustuose                | Paprastesnė pedagogika; rizika vs industrijos UI        |
| **T3** | Hibridas: schema EN+sub LT (kaip dabar) + **privalomas** kontrastas bilingviškai | Mažiausias diff; vis tiek reikia title/Trumpai drausmės |

`[KONFLIKTAS su R.M10-P01]:` P01 siūlo 10.45 išmesti `trigger` → `paleidiklis`. Jei P04 = T1 (EN kanonas čia), P01 turi sakyti „vėliau mokysi 10.15“ / vengti EN **arba** soft „įvykis (trigger)“ – **ne** priešingus kanonus skirtingose skaidrėse.

**Scope A savininkai:** CONTENT (poros + title + chrome) → DATA (JSON + `m10DiagramContent` LT labels + glossary sync jei reikia + EN build) → QA.

---

#### B. Schema – neatitinka kokybės (diagnozė, ne pataisa)

Testeris: schema **kol kas ≠** mūsų standartai.

**Kas jau teisinga (neardyti Pattern):**

- Shell **3** (T→C→A); Webhook = tipų juosta, ne 4-asis žingsnis (SOT §3a, CHANGELOG 2026-07-26)
- Condition „jei reikia“ / optional semantika
- Interactive Shell walkthrough

**Kokybės skolos (SCHEME checklist vs 10.2 etalonas):**

1. Vizualinis brandumas / densumas / tip hierarchy (LMS polish I0–I7 skolos – TriggerFlow buvo „roll-out density=hero“, bet testeris vis dar mato atotrūkį).
2. Tipų juosta (Forma / Laikas / Webhook) – ar skaitosi kaip **Trigger vaikai**, ne ketvirtas grandinės narys (hit target, caption air, clearance).
3. Selected state „Pasirinktas žingsnis: Trigger 1/3“ + body echo – ar ne **sumalta** su section body „Trigger → Condition…“.
4. RELEASE_QA eilutė vis dar `✓ (4)` vs live Shell 3 – **docs drift** (QA sync).
5. Enlarge: default OFF (SCHEME §3.11) – netraukti enlarge kaip „fix“.

**Scope B savininkai:** SCHEME (+ UI_UX auditas) → CODING (layout/diagram) → QA. CONTENT tik jei keičiasi label semantika po T1/T2/T3.

---

#### Antrinis (ta pati skaidrė, ne epic branduolys)

- Collapsible pointeris „Darbo eigos testavimas…“ (10.65) – ta pati title-pseudo-nuoroda šeima (P02/P03).
- Patikra „grįžk į pavyzdį“ – **in-slide** recall, OK (ne modulio atgal).
- Dense brand stack (pavyzdys + kontrastas + kur pritaikyti) prieš Daryk – soft trim CONTENT.

---

#### DoD (kai sakysi „tvarkom 10.15“)

- [ ] Produkto pasirinkimas T1 / T2 / T3 užfiksuotas intake’e
- [ ] LT title be EN krūvos **arba** bilingvinis pirmas gloss visur vienodai
- [ ] Schema labels = pasirinktas kanonas; EN overlay sync
- [ ] SCHEME auditas vs 10.2 checklist – testerio „neatitinka“ uždarytas arba sąmoningas Won’t
- [ ] P01 trigger copy suderintas su P04 kanonu
- [ ] `audit:teaching-elements` / DiagramLocalization smoke; footer-numbers neliesti be reikalo

**Statusas:** open · **epic** · **Netaisyta.**

---

### R.M10-P05 – Skaidrė `10.35` „Automatizavimo įrankiai“ (UI: 24/31) · **ATSKIRAS DARBAS (aiškumas + schema etalonas)**

**Testerio signalas:** skaidrė **jau nebloga**, bet reikia padirbėti **aiškumo** vardu; atskirai tobulinti **schemą** – **individuali schemos analizė**, kad taptų **savo srities etalonu** (`decision-tree` / įrankių pasirinkimo medis).

**UI kontekstas (iš copy paste):**

- shortTitle: Automatizavimo įrankiai · title JSON: Verslo automatizavimo įrankiai · subtitle: Zapier, Make, n8n, Power Automate – kada ką rinktis
- Progress: 24 / 31 · CTA: Tęsti: paleisti
- Trumpai → medis (`m10_tool_decision_tree`, pvz. Workato 5/5) → Daryk + Choice (4) → linked copy → Patikra → Daugiau (collapsible)

**Anchors:**

- Slide `id: 10.35` · image `m10_tool_decision_tree`
- Pattern: `decision-tree` · Shell = Taip · `M10ToolDecisionTreeBlock` / `M10ToolDecisionTreeDiagram`
- Labels: `m10DiagramContent.ts` · SOT §3c
- Kind: embed Choice brother (GOLDEN §3.8.1); Feature Doc nereikia
- Changelog: spatial exception (ne LinearFlow facade); home čia (ne 10.4)
- Ryšys: P02 miręs pointeris **į** šią skaidrę

**Kas jau gerai (neardyti):**

- Job aiškus: pasirink Automate įrankį + juodraštis
- Medis explore (5, įsk. Workato) ≠ Choice commit (4) – SOT ownership teisingas
- `autoSelect: false`; Patikra „kodėl ne“
- Be 4× accent kortelių; tiltas į 10.36 Trumpai

---

#### A. Aiškumas (CONTENT) – padirbėti, ne perrašyti

| #   | Problema                                                                                | Kodėl trina aiškumą                                                                                                                                                                      |
| --- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Dvi sąveikos** (medis 5 šakos vs Choice 4) be aiškaus „explore → commit“ sakinio      | Dalyvis pasirenka Workato medyje, o Daryk neturi Workato – jausmas „sulūžo“                                                                                                              |
| 2   | Trumpai krauna **3A** („Automate 80 %“) + **Trigger → Action** + tiltas 10.36           | Trys idėjos viename bloke; 3A recall ne visiems šviežias                                                                                                                                 |
| 3   | Medžio šakų labeliai **nukirpti** UI („Netechninė komanda, …“, „Sudėtinga logika + k…“) | Sprendimo ašis neperskaitoma be hover/tap                                                                                                                                                |
| 4   | **Linked copyable asimetrija**                                                          | Zapier/Make/n8n = ilgi „architekto“ promptai; Power Automate = trumpas SOT šablonas su „kodėl ne“. Patikra tikrina „kodėl ne“ – **3 iš 4** keliai neatitinka Patikros / SOT §3c lentelės |
| 5   | „stackas“, „enterprise Workato“, Make vs Make.com                                       | Soft LT / naming drausmė                                                                                                                                                                 |
| 6   | Collapsible → 10.65 title pointer                                                       | Ta pati pseudo-nuoroda šeima (P02/P03/P04)                                                                                                                                               |

**Batch kryptys A:**

- Must: suvienodinti linked copy prie SOT (§3c trumpas šablonas + ALT poros) **arba** sąmoningai dvi pakopos (juodraštis → gilūs promptai) su aiškiu chrome – dabar = netyčinė asimetrija.
- Should: Trumpai – viena mintis (4 įrankiai + pasirink vieną); 3A/24/7 – antra eilutė ar soft.
- Should: vienas sakinys tarp medžio ir Choice: „Medis – orientyras; žemiau – **įsipareigok** vienam iš keturių (Workato – tik enterprise, žr. medį / Daugiau).“
- Soft: šakų full text / tip truncation; „stackas“ → „įrankių rinkinys“ / „Microsoft aplinka“.

**Savininkas A:** CONTENT → DATA (choices/whenHint/copyables + EN build) → QA.

---

#### B. Schema – individuali analizė → **srities etalonas**

**Ambicija (testeris):** ne „šiek tiek polish“, o `m10_tool_decision_tree` = **decision-tree etalonas** M10–12 (ir vėlesniems pickeriams).

**Kodėl atskiras SCHEME track (ne su 10.15 linear):**

|              | 10.15 `m10_trigger_flow` | 10.35 `m10_tool_decision_tree`                       |
| ------------ | ------------------------ | ---------------------------------------------------- |
| Pattern      | `linear-process`         | `decision-tree`                                      |
| Job          | mokyti T/C/A grandinę    | rinktis įrankį pagal kontekstą                       |
| Etalono pora | vs 10.2 AgentWorkflow    | **pats sau** srities etalonas (spatial tree)         |
| Išimtis      | —                        | changelog: spatial exception + Shell/HitArea/StepNav |

**Individualios schemos analizės checklist (kai „audituojam 10.35 schema“ – dar ne dabar):**

1. **Skaitymo ašis:** ar šakos skaitosi kaip klausimas → įrankis (ne dekoratyvus ladder)?
2. **Truncation / tip:** full condition text, tip floors, clearance (vs LMS 10.2 checklist adapted for tree).
3. **Workato lapas:** vizualiai „optional / enterprise“ vs lean 4 – ar hierarchija aiški?
4. **Shell sync:** selected 5/5 + tip panel + body – ar ne sumalta su Daryk Choice state (du selected pasauliai)?
5. **HitArea / a11y:** focus ring vs isSel (jau buvo P0) – regresijos testas.
6. **Dark / tokens:** `useDiagramPalette` – brand-only, ne rainbow.
7. **Mobile:** scroller / reflow; enlarge default OFF.
8. **Registry:** `DIAGRAMU_M7_M12_REGISTRY` + overlay – po polish pažymėti „etalonas: decision-tree“ jei DoD ✓.

**Savininkas B:** SCHEME (individuali analizė + planas) → UI_UX → CODING → QA. CONTENT neliečia geometrijos.

**DoD B (vėliau):** testerio „tobulinti schemą“ uždarytas; registry pastaba „srities etalonas“ **tik** po sąmoningo SCHEME sign-off (ne iš anksto).

---

#### Ryšiai su kitais intake punktais

- **P02:** 10.4 pointeris → čia; kai P02 nuims mirusį linką, 10.35 lieka natūralus „pirmas kartas“ Automate įrankiams.
- **P04:** Trigger žodis Trumpai / copyable – laikytis P04 kanono.
- **Ne:** kelti Workato į Choice ketvertą be CURRICULUM (SOT: lean 4 + medis explore).

**Statusas:** open · **epic** · **Netaisyta** (A aiškumas + B schema etalonas).

---

### R.M10-P06 – Skaidrė `10.36` „Kur paleisti“ (UI: 25/31)

**Testerio signalas:** ar **režimai** aiškūs? ar **terminologija** aiški? Matyt, dar padirbėti ties šia skaidre.

**UI kontekstas (iš copy paste):**

- shortTitle: Kur paleisti · subtitle: Darbo eiga sudėlioja – paleidimo vieta paleidžia
- Progress: 25 / 31 · CTA: Tęsti: GitHub kodo šaltinis
- Trumpai → Keturi sluoksniai (lentelė) → **Patikra** (preCopy gate, n8n vs Railway) → Kur paleisti orientacija (collapsible) → Daryk režimai (Always-on / Pagal laiką (cron) / Webhook + worker) → linked copy → Daugiau

**Anchors:**

- Slide `id: 10.36` · be diagramos · `toolChoiceBar` + `preCopyCheckBlock`
- SOT §3c1 · glossary: `Always-on paleidimas` (yra); cron / webhook+worker kaip režimai – silpna

---

#### Verdict (trumpai)

| Klausimas                                                  | Vertinimas                                                             |
| ---------------------------------------------------------- | ---------------------------------------------------------------------- |
| Ar **sluoksnių** mintis (eiga ≠ paleidimas) aiški?         | **Gera bazė** – Trumpai + lentelė + Patikra gate                       |
| Ar **režimai** (Always-on / cron / Webhook+worker) aiškūs? | **Silpna** – EN labeliai, asimetriška LT, Webhook painiojamas su 10.15 |
| Ar **terminologija** visur drausminga?                     | **Dar padirbėti** – RPA, worker, hostą, dvi ašys (kur vs kaip)         |

Sutinku su testeriu: **taip, reikia padirbėti** – ne perrašyti job’ą, o išaiškinti režimus + sutvarkyti terminų pirmą pasirodymą.

---

#### A. Režimai – ar aiškūs?

| Režimas (UI)           | Kas OK                                        | Kas neaišku                                                                                                                      |
| ---------------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Always-on**          | whenHint (Telegram botas) geras               | Label grynas EN; glossary = „Always-on paleidimas“, Choice = „Always-on“ – neatitinka                                            |
| **Pagal laiką (cron)** | Geriausias bilingvinis modelis šioje juostoje | „cron“ vis tiek žargonas – OK su skliaustais, jei Trumpai/Daryk paaiškina vienu sakiniu                                          |
| **Webhook + worker**   | whenHint (PDF / ilga užduotis)                | **Sunkiausias:** `Webhook` ką tik = Trigger tipas (10.15); čia = paleidimo **režimas** + `worker` be LT. Didelė painiavos rizika |

**Pedagoginė skylė:** Daryk klausia „Kaip turi veikti tavo **programa**?“ – po 10.35 daugelis dar galvoja tik Zapier SaaS (be „programos“). Trūksta vieno sakinio: „Jei naudoji tik Zapier/Make debesyje – režimas dažnai jau sutvarkytas ten; čia – kai **pats** paleidi API / agentą.“

**Dvi ašys vienoje skaidrėje:**

1. **Kur** – Railway / Render / Fly (collapsible)
2. **Kaip / kada** – Always-on / cron / webhook+worker (Choice)

Šablonas prašo **abiejų** (+ darbo eiga) po to, kai Choice praktikuoja tik režimą → kognityvinė perkrova. Batch’e: aiškiai atskirti „vietą“ vs „režimą“ Daryk intro (2 eilutės).

---

#### B. Terminologija – inventorius

| Terminas                                                    | Problema                                                                       |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **RPA** / UiPath                                            | Pirmas pasirodymas lentelėje be gloss (PAPRASTOS)                              |
| **worker**                                                  | EN Render eilutėje + Webhook+worker – be „foninė užduotis / fono procesas“     |
| **hostą**                                                   | „renkiesi konkretų hostą“ – barbarizmas → „hostingo vietą“ / „paleidimo vietą“ |
| **Webhook** (režimas) vs **Webhook** (Trigger tipas, 10.15) | Homonym – Must paaiškinti kontrastu                                            |
| **Always-on**                                               | EN; geriau kaip glossary: „Nuolat veikia (always-on)“                          |
| **24/7** Paleidimas eilutėje                                | OK, bet siejasi su Always-on – rizikuojama, kad „paleidimas = always-on“       |
| Analogija (vadovas / darbuotojas / biuras)                  | Gera mintis; RPA neįeina – OK jei analogija tik eiga vs paleidimas             |

**Kas gerai (laikyti):** viena mintis Trumpai; Patikra gate prieš copy; sluoksnių lentelės klausimai; be kainų.

---

#### C. UX / kelionė (antrinis)

- preCopy Patikra po sluoksnių – pedagogiškai teisinga; testerio „Nepataikei“ + copy lock – frikcija OK jei explanation aiški (dabar OK).
- „grįžk į Trumpai“ – in-slide, gerai.
- Collapsible orientacija by default – SOT OK first viewport; rizikuojama, kad Railway/Render/Fly lieka nematoma prieš režimus.

---

#### Batch kryptys (ne pataisa)

| Prioritetas | Veiksmas                                                                                                                                                                                              |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Must**    | Režimų labeliai bilingviškai / plain (etalonas = „Pagal laiką (cron)“ forma): pvz. „Nuolat veikia (always-on)“, „Pagal laiką (cron)“, „Webhook + fono užduotis (worker)“ + 1 sakinys vs 10.15 Webhook |
| **Must**    | Daryk intro: atskirti **paleidimo vietą** vs **režimą**; SaaS-only soft path                                                                                                                          |
| **Should**  | RPA gloss lentelėje („robotizuotas UI spaudimas (RPA)“)                                                                                                                                               |
| **Should**  | „hostą“ → plain LT; worker → LT gloss                                                                                                                                                                 |
| **Could**   | Trumpai analogiją palikti; optional 4-ojo sluoksnio (RPA) nekimšti į analogiją                                                                                                                        |
| **Ne**      | Nauja diagrama (SOT: be); nekelti Patikros po copy be produkto sprendimo                                                                                                                              |

**Savininkas:** CONTENT → DATA (choices/whenHint/copy + glossary jei reikia + EN build) → QA. Scheme netaikoma.

**Statusas:** open · **Netaisyta.**

---

### R.M10-P07 – Skaidrė `10.37` „GitHub kaip kodo šaltinis“ (UI: 26/31)

**Testerio signalas:** jausmas, lyg **nebaigta vartotojo kelionė**, UI/UX, tekstas **schematinis**, lyg **nepadarytas authoring**. **Kodėl?**

**UI kontekstas (iš copy paste):**

- Title: GitHub kaip kodo šaltinis · subtitle: GitHub saugo – PaaS paleidžia
- Progress: 26 / 31 (po 10.36, prieš MUST 10.64)
- Trumpai → lentelė „Kada ką – platformos“ → Daryk (tekstas Taip/Ne) → Copy → Patikra → Daugiau
- Be schemos, be ChoiceControl, be preCopy

**Anchors:**

- Slide `id: 10.37` · `optional: true` · SOT §3c2 **Tikslas B+**: orientacija; _Be git tutorialio, be M11 MCQ, be naujos diagramos_
- Footer → 10.64 Minimalus eigos aprašymas

---

#### Kodėl taip jaučiasi (šakninės priežastys)

| #   | Priežastis                        | Paaiškinimas                                                                                                                         |
| --- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | **Sąmoningai plonas SOT (B+)**    | Authoring = „orientacija / one-liner“, ne pilnas interactive beat. Live = **outline, išleistas kaip skaidrė**.                       |
| 2   | **Ritmo lūžis po 10.35–10.36**    | Kaimynai: medis + Choice / sluoksniai + Patikra gate + režimai. Čia: pasyvi lentelė + fill-in. Energija krenta → „nebaigta kelionė“. |
| 3   | **Daryk be UI**                   | „Taip arba ne“ pažadėta tekstu, bet **nėra** Choice – tik copyable `taip / ne`. Interakcija nepaduota = unfinished UX.               |
| 4   | **Echo / trečias kartas**         | 10.36 jau Railway/Render + eiga≠paleidimas. 10.37 vėl „saugo vs paleidžia“ + tie patys hostai (+ Vercel).                            |
| 5   | **Skeleton copy**                 | „Skirtingos vietos – skirtingas darbas.“ – placeholder. PaaS / auto-deploy be verslo pavyzdžio.                                      |
| 6   | **Optional pagrindiniame kelyje** | `optional: true`, bet 26/31 tarp paleisti ir MUST 10.64 – atrodo kaip filleris, ne „jei koduoji – užsuk“.                            |
| 7   | **Plonas artefaktas**             | Copy checklist + 3 eilutės DI – plonesnis už 10.35/10.36 linked šablonus; nėra Taip/Ne hint juostos.                                 |

**Verdict:** jausmas teisingas. Ne render bug – **plonas B+ authoring + kelionės vieta** po turtingų kaimynų.

---

#### Batch opcijos (ne pataisa)

| Opcija                       | Kryptis                                                                                                                |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **A. Brandinti**             | Choice Taip/Ne + whenHint · 1 worked example (Zapier-only vs bot+Railway) · PaaS gloss · sumažinti Railway/Render echo |
| **B. Sumažinti kelio svorį** | Stiprinti optional/skip · perkelti į 10.36 „Daugiau“                                                                   |
| **C. Sulieti į 10.36**       | CURRICULUM – 10.37 deprecate                                                                                           |

**Hipotezė:** A arba B – ne palikti kaip yra.

**Savininkas:** UJ (opcija) → CONTENT → DATA → QA. Be schemos.

**Statusas:** open · **Netaisyta.**

---

### R.M10-P08 – Skaidrė `10.64` „Minimalus eigos aprašymas“ (UI: 27/31) · **ATSKIRAS PERRAŠYMAS**

**Testerio signalas:** žargonas, authoring klaidos; **spręsti atskirai – perrašyti** (ne chrome trim).

**UI kontekstas (iš copy paste):**

- shortTitle: Minimalus eigos aprašymas · subtitle: 1 psl. schema + 3 bandymai + kada tvirtina žmogus
- Progress: 27 / 31 · CTA: Tęsti: Testavimas saugumas
- Trumpai → Minimalus aprašymas (A/B/C) → Daryk → Copy (8+B1–B3) → **Incidentų planas** → **Kaina ir modelio pasirinkimas** → Patikra

**Anchors:**

- Slide `id: 10.64` · MUST · neša artefaktą į 10.66 + M12
- SOT §3d0 schema: Trumpai → Minimalus aprašymas → Daryk → Copy → Patikra (**be** Incident / Kaina blokų)
- Ryšys: 10.26 HITL lab · 10.51 juodraštis · 10.65 optional dense · 10.66 QC

---

#### Kodėl **atskiras perrašymas** (ne P1 polish)

|             |                                                                                                 |
| ----------- | ----------------------------------------------------------------------------------------------- |
| Job         | MUST artefaktas visam M12 – negalima „šiek tiek pataisyti EN žodžių“                            |
| Scope creep | Live turi **Incidentų planas** + **Kaina ir modelio** – SOT §3d0 jų **nėra** (10.65 teritorija) |
| Terminai    | Trigger/Condition/happy path/timeout/webhook + režimų EN – susieta su P04 kanonu                |
| Pedagogika  | „Minimalus“ vs 8 punktai + 3B + incident + kaina = **ne** minimalu                              |

---

#### A. Žargono inventorius (LT UI / copyable)

| Terminas / frazė                                       | Problema                                                     |
| ------------------------------------------------------ | ------------------------------------------------------------ |
| Trigger, Condition                                     | EN be gloss (po 10.15 – priklauso nuo P04 T1/T2/T3)          |
| happy path                                             | EN copyable B1                                               |
| timeout / dublikatas / webhook                         | EN + techninis                                               |
| API                                                    | be gloss                                                     |
| eskalacija, audito įrašas                              | vadybinis / ops                                              |
| režimas: visi atvejai / išimtys / po faktų / stebėsena | sutraukta iš 10.26 be recall                                 |
| pigus modelis / stipresnis modelis                     | abstraktu be pavyzdžio                                       |
| Specifikacija 1 psl.                                   | schematinis                                                  |
| A/B/C + B1/B2/B3                                       | OK struktūrai, bet be plain antraščių skaitosi kaip spec doc |

---

#### B. Authoring klaidos (diagnozė)

1. **SOT vs live scope:** §3d0 = 5 blokai; live + Incident + Kaina = 10.65 spill į MUST → dense, „nebaigtas / sumaltas“ jausmas.
2. **A vs copyable mismatch:** A sako „Trigger → klaidų tvarkymas“ (2 poliai); copy = **8** punktai – dalyvis nežino, ar A santrauka, ar checklist.
3. **„Minimalus“ netiesa:** po spill – arti optional deep.
4. **Daryk pointeris** „Vėliau – Agentų QC“ – OK pirmyn; Patikra „grįžk į Kada tvirtina žmogus?“ – atgalinis title (P03 šeima); geriau recall be „skaidrė“.
5. **Copyable body** „Minimalus darbo eigos aprašymas.“ – tuščia antraštė / dublikatas.
6. **Trumpai „Modulio 12 praktikas“** – OK moduliui; venkti curriculum ID; OK.
7. Nėra **worked example** (užpildytas mini procesas) – tik tušti `[…]` – authoring skylė prieš MUST transferą.

---

#### C. Perrašymo DoD (kai „tvarkom 10.64“)

- [ ] Grąžinti GOLDEN/SOT lukštą: Trumpai → A/B/C plain → Daryk → **vienas** copyable → Patikra
- [ ] Incident + Kaina → **10.65** (ar collapsible „jei klientai/pinigai“) – ne brand viewport
- [ ] Plain LT pagal P04 kanoną + happy path → „sėkmės kelias“
- [ ] Copyable tikrai **minimalus** (A sutampa su checklist ilgiu) + 1 mini filled pavyzdys _arba_ micro-win eilutė
- [ ] HITL režimai – plain + nuoroda į 10.26 be mirusio CTA
- [ ] EN build + SOT §3d0 sync
- [ ] 10.66 / M12 vis dar priima tą patį artefaktą (laukų kontrakto testas)

**Savininkas:** CONTENT (perrašymas) → DATA → QA; sync 10.65 jei spill grąžinamas. CURRICULUM tik jei keičiasi MUST riba. Ne Scheme (be diagramos).

`[KONFLIKTAS]:` P04 terminų kanonas – 10.64 perrašymas **po** arba **kartu** su P04.

**Statusas:** open · **epic · perrašymas** · **Netaisyta.**

---

### R.M10-P09 – Skaidrė `10.65` „Testavimas ir saugumas“ (UI: 28/31)

**Testerio signalas:** _Kam dėti skaidrę ir rašyti „neprivaloma“???_ Juk turime **trumpą / ilgą** kelią. Be to – ar tekstas tinkamas? **Neaišku** (ypač saugumo / DI akto eilutė).

**UI kontekstas (iš copy paste):**

- Badge: Papildoma · Title: Testavimas ir saugumas · subtitle: **Neprivaloma:** 8 blokų spec, testai, saugumas
- Progress: 28 / 31 · Trumpai prasideda „**Neprivaloma gilinimosi** skaidrė…“
- 2 diagramos (8 blokų spec + incidentų planas) → Daryk checklist → Patikra → collapsibles → Saugumas ir atitiktis (ilga pastraipa su „DI akto tipo valdymas“)

**Anchors:**

- `id: 10.65` · `optional: true`
- M10 intro `howToUseModule`: **Trumpas kelias** = „Be papildomų skaidrių (GitHub deep, **testavimo/saugumo deep**, žodynėlis)“; **Ilgas** = visos
- Nav: `skipOptional` / `fastTrack` slepia `optional` (ModuleView)
- SOT §3d · GOLDEN: antraštėje be „(neprivaloma)“ – badge

---

#### Atsakymas į „kam dėti + rašyti neprivaloma?“

| Kelias      | Kas vyksta su 10.65                                                                                                                                                                      |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Trumpas** | Skaidrė **paslepiama** (`skipOptional`) – dalyvis jos **nemato**. Rašyti „neprivaloma“ UI **nereikia**.                                                                                  |
| **Ilgas**   | Skaidrė **matoma** kaip pasirinkto kelio dalis. Kartoti „neprivaloma“ Trumpai/subtitle = **meta / prieštaravimas**: „pasirinkai ilgą kelią, bet mes vis kartojame, kad čia neprivaloma“. |

**Verdict:** Taip – logika turėtų būti **kelio pasirinkimas**, ne skaidrės copy.  
`optional: true` = techninė Fast-track vėliava.  
Learner copy turėtų sakyti **job** („pagilink testus ir saugumą“), ne „ši skaidrė neprivaloma“.  
Badge „Papildoma“ užtenka (jei išvis rodoma ilgame kelyje).

**Kodėl dabar blogai:**

1. Subtitle + Trumpai **triukšmauja** „Neprivaloma“ (GOLDEN/PAPRASTOS – ne antraštėje).
2. Ilgame kelyje energija: po MUST 10.64 vėl dense deep + savęs menkinimas.
3. **P08 spill:** dalis 10.65 (incident / kaina) jau 10.64 → 10.65 atrodo dar labiau kaip dubliuotas „optional dump“.
4. Poros su **P07** (10.37): ta pati optional-in-path + „neprivaloma“ meta šeima.

---

#### Teksto aiškumas (Saugumas / atitiktis)

Dabartinė pabaiga:

> „…to prašo **DI akto tipo valdymas**.“

| Problema       |                                                                        |
| -------------- | ---------------------------------------------------------------------- |
| **Neaišku**    | Kas yra „DI akto tipo valdymas“? ES AI Act? Įmonės politika? Soft law? |
| **Per krauta** | Viena pastraipa: PII + prieiga + incident + HITL + atitiktis + aktas   |
| **Pedagogika** | Optional deep neturi baigtis teisiniu žargonu be 1 plain sakinio       |

**Batch kryptis copy:** 3–4 bullet plain („ką maskuoti / kur raktai / kada žmogus / ką fiksuoti žurnale“); „DI aktas“ – tik jei glossary + vienas sakinys _arba_ išimti iš learner chrome.

Diagramos / 8 blokų / checklist – atskiras polish (žargonas Trigger/SLA/run_id – P04); ne šio klausimo branduolys, bet pažymėti soft.

---

#### Batch opcijos

| Opcija                 | Kryptis                                                                                                          |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **A. Copy fix (Must)** | Nuimti „Neprivaloma“ iš subtitle + Trumpai; ilgame kelyje = gilinimosi job; badge OK                             |
| **B. UJ**              | Ilgame kelyje aiškesnis „Papildoma gilinimosi“ framing _be_ savęs menkinimo; Trumpame – tyliai skip (jau veikia) |
| **C. Curriculum**      | Jei 10.64 perrašius (P08) absorbuoja mini testus – 10.65 dar labiau deep-only / hub; nekeisti be CURRICULUM      |
| **D. Saugumas**        | Perrašyti atitikties bloką plain; DI aktas → gloss arba out                                                      |

**Hipotezė:** **A + D** greitai; C po P08.

**Savininkas:** UJ/CONTENT → DATA → QA. Scheme – tik jei liečiame 8-blokų labels (po P04).

**Statusas:** open · **Netaisyta.**

---

### R.M10-P10 – Skaidrė `10.66` „QC vertintojas“ (UI: 29/31)

**Testerio signalas:** net **skaidrės pavadinime** „QC vertintojas“ – **kas tai?**

**UI kontekstas:**

- `title`: Agentų QC vertintojas · `shortTitle`: **QC vertintojas** (nav / footer / progress)
- subtitle: Vienas promptas patikrina agento ar darbo eigos specifikaciją
- Tipas: `evaluator-prompt-block` (GOLDEN §3.2b) – Pattern OK
- Progress: 29 / 31

**Anchors:** `modules.json` 10.66; pointeriai iš 10.64 Daryk („Agentų QC vertintojas“), 10.65 footer („QC vertintojas“); EN overlay; SOT §3d1

---

#### Verdict

|                              |                                                                                   |
| ---------------------------- | --------------------------------------------------------------------------------- |
| **QC**                       | EN santrumpa (_Quality Control_) – **nepaaiškinta** antraštėje                    |
| PAPRASTOS §2a / slide-titles | Antraštė = dalyvio tema, ne infra žargonas → **FAIL**                             |
| Body / job                   | Iš esmės **aiškus**: vienas vertintojo promptas tikrina tavo artefaktą – plain OK |
| Pattern                      | §3.2b etalonas – **neardyti** tipo; taisyti **vardą + chrome**                    |

**Atsakymas testeriui:** QC = kokybės kontrolė (angliškai). Mūsų UI neturi to krauti į H1 / shortTitle. Geriau: **„Kokybės vertintojas“** / **„Agentų kokybės vertintojas“** / **„Patikrink specifikaciją“** (pasirinkti vieną).

---

#### Kur QC / netinkamas vardas nuteka

| Vieta              | Dabar                                                         |
| ------------------ | ------------------------------------------------------------- |
| title / shortTitle | Agentų QC / QC vertintojas                                    |
| 10.64 Daryk        | „Agentų QC vertintojas“                                       |
| 10.65 footer       | „QC vertintojas“                                              |
| Copyable viduje    | „agentų kokybės vertintojas“ – **jau plain** (geras etalonas) |

Antrinis (soft): Trumpai „Šioje skaidrėje…“ – meta; Patikra OK; practicalTask žingsniai OK; kriterijus 5 žargonas (eskalacija, auditas) – po P08 sync.

---

#### Batch (ne pataisa)

- **Must:** pervadinti title + shortTitle be QC; sync footeriai / 10.64 pointer; EN (Quality check / Spec reviewer – American, ne „QC“ jei vengiama).
- **Should:** Trumpai be „Šioje skaidrėje“.
- **Ne:** keisti `evaluator-prompt-block` tipo ar 5 kriterijų job’ą be P08 kontrakto.

**Savininkas:** CONTENT → DATA (LT + EN build + footer audit) → QA (`audit:slide-titles` jei taikoma).

**Statusas:** open · **Netaisyta.**

---

### R.M10-P11 – Skaidrė `10.7` „Žodynėlis“ (UI: ~30/31)

**Testerio signalas:** vėl **„neprivaloma“**? Kaip integruota su **bendru žodynu**? Kokia **praktika**?

**UI kontekstas:**

- Title: Žodynėlis · badge Papildoma / Neprivaloma · tipas `glossary` · `optional: true`
- ~22 terminai in-slide (Agentas → ReAct)
- Trumpas kelias (intro): žodynėlis **praleidžiamas**; Ilgas – rodomas

**Anchors:** `modules.json` 10.7 · SOT `glossary.json` (moduleId 10) · GlossaryPage · GOLDEN §3.4d · path-step `unlockedGlossaryTerms` / `unlockedBy`

---

#### 1) „Neprivaloma“ – tas pats verdict kaip P09

| Kelias  | 10.7                                                                                                     |
| ------- | -------------------------------------------------------------------------------------------------------- |
| Trumpas | Paslepiama – nereikia sakyti „neprivaloma“                                                               |
| Ilgas   | Matoma – „Neprivaloma“ meta **kenkia**; badge „Papildoma“ + job („greitai susigrąžink terminus“) užtenka |

---

#### 2) Praktika projekte (kaip **turėtų** veikti)

| Sluoksnis                                            | Rolė                                                                                                                               |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **`glossary.json` (+ EN)**                           | **Bendras SOT** – GlossaryPage visada skaitomas (paieška, filtro pagal modulį).                                                    |
| **`unlockedBy` / path-step `unlockedGlossaryTerms`** | Kelio **atlygio metadata** – **ne** lock UI (GOLDEN §3.4d). M10: pvz. API ← 10.21; Žmogaus kontrolė ← 10.26; rolės ← 10.451.       |
| **Modulio skaidrė `type: glossary`**                 | **In-module recap** – greitas sąrašas kelio gale; turėtų **rodyti tą pačią tiesą** kaip `glossary.json`, ne antrą autorinę kopiją. |
| **Mokymas skaidrėse**                                | Pirmas pasirodymas (pvz. 10.15 Trigger) – ten pedagogika; žodynas = atrama.                                                        |

**Santrauka:** Bendras žodynas = šaltinis. Skaidrė 10.7 = veidrodis / greitas kelias, ne atskiras authoring dump. Optional = Fast-track vėliava, ne „šis turinys antrarūšis“.

---

#### 3) Integracijos auditas (live) – **drift**

| Radinys                                                                                                                                                | Svarba                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| **`DI aktas / atitiktis`** – skaidrėje yra, **`glossary.json` nėra**                                                                                   | Must – dublikatas be SOT / GlossaryPage nematys           |
| **Daug def. nesutampa** slide vs glossary (ilgis / žodžiai)                                                                                            | Must sync – viena tiesa                                   |
| **`Sisteminis promptas`** – **skirtinga prasmė**: slide = „kas esi / kaip elgtis“; glossary = „rinkodaros analitikas…“ (senesnis / kito modulio tonas) | P0 konfliktas                                             |
| Glossary m10 turi **API**, **Kelių agentų sistema** – slide neturi                                                                                     | Should – ar recap turėtų rodyti unlock’intus / visus m10? |
| **Vertintojas** def. baigiasi **(QC)**                                                                                                                 | P10 šeima – išimti QC                                     |
| EN overlay vs `glossary-en.json`                                                                                                                       | CONTENT_AGENT žinoma spraga – QA sync                     |
| Multi-agent / workflow / HITL antraštėse                                                                                                               | Soft plain (P04/P06)                                      |

---

#### 4) Batch kryptys

| Prioritetas | Veiksmas                                                                                                                                                        |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Must**    | Nuimti „Neprivaloma“ iš learner chrome (subtitle/UI copy); palikti `optional: true` Fast-track                                                                  |
| **Must**    | **Single SOT:** 10.7 terms = `glossary.json` moduleId 10 (ar curated subset) – def. identiški; pridėti „DI aktas / atitiktis“ į glossary **ar** išimti iš slide |
| **Must**    | Sutvarkyti **Sisteminis promptas** konfliktą (vienas kanonas visame produkte)                                                                                   |
| **Should**  | Vertintojas be QC; EN twin                                                                                                                                      |
| **Could**   | Skaidrę generuoti iš glossary (script) – kad nebeliktų rankinio drift                                                                                           |
| **Ne**      | Lock’inti GlossaryPage pagal unlock (draudžia GOLDEN §3.4d)                                                                                                     |

**Savininkas:** CONTENT (def. kanonas) → DATA (`glossary.json` + 10.7 + EN) → QA. UJ – optional framing (su P09/P07).

**Statusas:** open · **Netaisyta.**

---

## Batch eilė (kai sakysi „tvarkom“)

### 2026-08-12 produkto sprendimai ir uždarymo registras

**Apimtis:** tik §R.M10-P01–P11 aptartos skaidrės. Kitos M10, M11 ir M12
skaidrės į šį batch neįtraukiamos, išskyrus būtinas footerio, žodynėlio ir EN
sinchronizavimo priklausomybes.

**Produkto sprendimai:**

1. `10.15` terminai mokomi **LT pirmiausia**, o EN terminas pateikiamas
   skliaustuose pirmą kartą: Paleidiklis (trigger), Sąlyga (condition),
   Veiksmas (action), Internetinis pranešimas (webhook).
2. `10.37` lieka atskira `optional` skaidrė. Ji stiprinama Taip / Ne
   pasirinkimu ir vienu kontrastiniu pavyzdžiu; su `10.36` nesujungiama.
3. Esami slide tipai ir Pattern nekeičiami; interaktyvioms schemoms desktop
   enlarge negrąžinamas.

| ID      | Intake verdict | Uždarymo kriterijus                                                                     |
| ------- | -------------- | --------------------------------------------------------------------------------------- |
| `10.45` | **FAIL**       | Be `triaž*` / bare `trigger`; vienas gylio sprendimas; vienas artefaktas lab viduje     |
| `10.4`  | **FAIL**       | Be mirusio pointerio; MCP / API paaiškinti pirmą kartą                                  |
| `10.5`  | **FAIL**       | Atgalinis pointeris pakeistas recall; vienas pagrindinis 5 dalių artefaktas             |
| `10.15` | **FAIL**       | LT-first kanonas visame chrome ir schemoje; 3 žingsniai; Webhook – paleidiklio tipas    |
| `10.35` | **FAIL**       | Explore → commit skirtumas aiškus; 4 linked copy sutampa su Patikra; medis perskaitomas |
| `10.36` | **FAIL**       | Atskirta vieta ir režimas; trys režimai paaiškinti paprastai                            |
| `10.37` | **FAIL**       | Optional beat turi Taip / Ne sprendimą, pavyzdį ir prasmingą artefaktą                  |
| `10.64` | **FAIL**       | Tikrai minimalus A/B/C artefaktas; vienas copy; sutampa su `10.66` ir M12               |
| `10.65` | **FAIL**       | Be „Neprivaloma“ learner copy; saugumas išskaidytas į aiškius veiksmus                  |
| `10.66` | **FAIL**       | Title / shortTitle be QC; evaluator Pattern išlaikytas                                  |
| `10.7`  | **FAIL**       | Be optional meta; terminai ir apibrėžimai sutampa su bendru glossary SOT                |

**Bendras DoD:** visos 11 skaidrių pakartotinėje patikroje turi gauti `OK`.
Jei bent viena lieka `FAIL`, šis intake lieka atviras su konkrečiu blockeriu.

### 2026-08-12 pakartotinis auditas

| ID      | Po pataisų | Įrodymas                                                                                     |
| ------- | ---------- | -------------------------------------------------------------------------------------------- |
| `10.45` | **OK**     | Vienas gylio sprendimas; paprasti pavyzdžiai; išskirstymas pagal tipą; vienas lab artefaktas |
| `10.4`  | **OK**     | API ir MCP paaiškinti; pseudo-nuoroda pašalinta                                              |
| `10.5`  | **OK**     | Recall vietoje title-pointerio; vienas 5 dalių Copy                                          |
| `10.15` | **OK**     | LT-first kanonas; 3 žingsniai; webhook parodytas kaip paleidiklio tipas                      |
| `10.35` | **OK**     | Explore / commit tiltas; Workato statusas; 4 vienodos linked-copy struktūros                 |
| `10.36` | **OK**     | Atskirta vieta ir režimas; SaaS-only kelias; terminai paaiškinti                             |
| `10.37` | **OK**     | Optional Taip / Ne sprendimas; du kontrastiniai pavyzdžiai; vienas artefaktas                |
| `10.64` | **OK**     | Trumpai → A/B/C → Daryk → vienas Copy → Patikra; mini pavyzdys                               |
| `10.65` | **OK**     | Optional meta palikta UI mechanikai; saugumas = 4 veiksmai; gilinimas perkeltas čia          |
| `10.66` | **OK**     | „Kokybės vertintojas“ be QC learner chrome; 5 kriterijų Pattern išlaikytas                   |
| `10.7`  | **OK**     | Kuruota bendro glossary SOT aibė; konfliktiniai apibrėžimai ir EN twin sutvarkyti            |

**Automatiniai vartai:** `audit:m1012`, title / LT address / EN spelling,
LT+EN footeriai, schema, TE strict, lint, typecheck ir 126 tiksliniai diagramų
testai – žali. Rankinio 375 px / desktop light-dark smoke įrodymas lieka
release QA žingsnis, nes ši sesija neturi naršyklės vaizdinio įrankio.

> **Istorinis planas:** žemiau esanti prioritetų lentelė buvo naudota prieš §898 pakartotinį auditą; live turinys ją supersedina. Likę darbai perkelti į deep-audit P1.

| Prioritetas | ID        | Skaidrė | Fokusas                               | Agentai             |
| ----------- | --------- | ------- | ------------------------------------- | ------------------- |
| P0          | R.M10-P01 | 10.45   | triažas + trigger (**po P04**)        | CONTENT → DATA      |
| P1          | R.M10-P02 | 10.4    | miręs pointeris                       | CONTENT → DATA      |
| P1          | R.M10-P03 | 10.5    | atgalinis pointeris                   | CONTENT → DATA      |
| **P0 epic** | R.M10-P04 | 10.15   | terminai + schema                     | CONTENT+SCHEME → …  |
| **P0 epic** | R.M10-P05 | 10.35   | aiškumas + decision-tree              | CONTENT+SCHEME → …  |
| P1          | R.M10-P06 | 10.36   | režimai + terminija                   | CONTENT → DATA      |
| P1          | R.M10-P07 | 10.37   | brandinti / sumažinti                 | UJ → CONTENT        |
| **P0 epic** | R.M10-P08 | 10.64   | perrašymas                            | CONTENT → DATA      |
| P1          | R.M10-P09 | 10.65   | „neprivaloma“ meta + saugumas         | UJ → CONTENT        |
| P1          | R.M10-P10 | 10.66   | QC → plain title                      | CONTENT → DATA      |
| P1          | R.M10-P11 | 10.7    | optional meta + **glossary SOT sync** | CONTENT → DATA → QA |

_(kitos skaidrės – žemiau, kai mesi)_

### 2026-08-12 papildomas M12/120 vizualinis ir turinio auditas

| ID    | Intake verdict | Uždarymo kriterijus                                                                                                   |
| ----- | -------------- | --------------------------------------------------------------------------------------------------------------------- |
| `120` | **FAIL → OK**  | Scenarijų grid pakeistas kelio pasirinkimu; vienas rekomenduojamas default kelias; privalomas progresas tik `121–123` |

**Sprendimas:** M12 `practice-intro` nėra scenarijų katalogas. Skaidrė leidžia pasirinkti pradžios kelią: rekomenduojamas vedamas kelias, greitas startas tik su promptais arba tiesioginis 3A praktikų kelias, jei dalyvis jau turi procesą. ROI lieka vienas suskleistas antrinis blokas su mėnesio formule.
