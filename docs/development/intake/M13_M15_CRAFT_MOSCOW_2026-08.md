# M13–15 craft MoSCoW (2026-08-18)

> **Status:** Banga 1 **C-M1–M3** + Banga 2 **C-S1/S3** + Banga 3 **C-S2/C-S4 shipped** 2026-08-18. Could lieka OPEN (parked).  
> **Po:** I2-M13 (kalba) ✅. **Ne** TRIM/TE/S4 reopen. Could C-C* tik po savininko.  
> **Epic:** 2026-08 vaizdo / video / garso *craft\* spragos vs gyvas kelias (grandinė jau yra).  
> **SOT:** [`turinio_pletra_moduliai_13_14_15.md`](../../turinio_pletra_moduliai_13_14_15.md) §11 MUST/SHOULD lieka. Šis failas = **antrinis sluoksnis** (kontrolės ciklas), ne pakaitalas.  
> **Walk / kalba:** [`M13_M15_LEARNER_WALK_INTAKE.md`](M13_M15_LEARNER_WALK_INTAKE.md) — atskira eilė.  
> **Branda:** [`M13_PROMPT_MATURITY.md`](../M13_PROMPT_MATURITY.md) — Must = Stage / Patikra, **ne** Flagship siena.

---

## 0. Verdiktas

M13–15 jau moko **2026 stuburą**, kurio dauguma tutorialių vis dar neturi: grandinė prieš modelį, I2V ne T2V, referencų užraktas, pirma garsas, CPI, licencijos, C2PA, DI = žaliava, A/E/C, M15 promptas į įrankį.

Trūksta **kontrolės ciklo**: užrakinti artefaktus → įvardyti kas _neturi_ keistis → keisti **vieną** kintamąjį → žiūrėti **paskutinį** kadrą / 3 balso eilutes → tada lock arba fresh.

| Sluoksnis                             | Būsena                                  | Šis MoSCoW                      |
| ------------------------------------- | --------------------------------------- | ------------------------------- |
| Grandinė / teisės / A/E/C / I2V 3–5 s | **shipped**                             | Out of scope (KEEP)             |
| M15 paste-into-tool                   | **shipped** 2026-08-18                  | KEEP; Must kabinasi ant Patikra |
| I2-M13 kalba                          | **shipped** 2026-08-18                  | **Neliečia** šio failo          |
| Craft ciklas                          | **Banga 1–3 shipped** (C-M\* + C-S1–S4) | Could parked                    |

**Taisyklės (užrakinta, kol savininkas nekeičia):**

1. Jokio naujo Pattern / Feature Doc Must bangai (Patikra + Stage copy).
2. Jokios naujos skaidrės Must bangai (kabinti ant `13.3` / `13.4` / `13.6` / `150.5` / `152` / `153`).
3. M13 gyvas TRIM/TE **FREEZE**, kol atidaromas šis pack.
4. EN = `build:modules-en-m13-m15` + durable override. **Ne** `generate:core-data`.
5. Fit-for-purpose: 3–7 eil. Stage, ne MASTER siena.
6. 12 M14 stem’ų pedagoginis perrašymas = **Won’t** (nebent vienas naujas warm / bonus eilutė).
7. Curriculum ID — tik navigacijoje.

---

## 1. Jau turime (KEEP — ne MoSCoW darbas)

| Tema                            | Kur                        | Kodėl KEEP                      |
| ------------------------------- | -------------------------- | ------------------------------- |
| A/E/C tikslas                   | `13.1`                     | Be darbo vaizdai atsitiktiniai  |
| 6 žingsnių grandinė             | `13.12`                    | 2026 „pipeline before model“    |
| Stilius + proporcijos + ženklas | `13.3`                     | Brand laukai yra                |
| 3–5 refs + drift lab            | `13.32` / `13.325`         | Teisinga consistency _idėja_    |
| Vaizdo / I2V builderiai         | `13.37` / `13.47`          | Promptas sudedamas, ne siena    |
| I2V 3–5 s + CPI + matrica       | `13.4` / `13.5`            | Trumpas klipas, ne one-shot T2V |
| Post-prod + LUFS hint           | `13.52` / `154`            | DI = žaliava                    |
| Pirma garsas + licensed vs demo | `13.6` / `13.7`            | Verslo taisyklė teisinga        |
| C2PA / žyma / A/B               | `13.101` / `13.11`         | Rinkodaros MUST                 |
| M15 4 problemos + promptai      | `150.5` / `152`–`154` + I3 | Įklijuoji ir dirbi              |

SOT §11 SHOULD (funnel, heatmap, Zapier, storyselling) **lieka** SOT SHOULD — čia nebekartojame.

---

## 2. Skalė

| Etiketė    | Ką reiškia čia                                                                | Fail, jei praleidi                        |
| ---------- | ----------------------------------------------------------------------------- | ----------------------------------------- |
| **Must**   | Be to mokinys baigia M15 su vienu gražiu one-shot ir negali pakartoti serijos | Kampanijos setas „plaukioja“              |
| **Should** | 2026 dialektas / šakutė; kelias veikia ir be to                               | Blogesnis CPI, neteisingas modelis kadrui |
| **Could**  | Komercinis priedas ar gilesnė slotų anatomija                                 | Silpnesnis rinkos fit; ne blokas          |
| **Won’t**  | Jau P2 SOT, netinka rinkodaros keliui, arba gadina freeze                     | Scope creep / naujas Pattern              |

---

## 3. Must

> Kabinti ant esamų Patikra / Stage. CONTENT → DATA. Jokio Feature Doc.

| ID       | Darbas                                                                                                       | Kur                                                    | Artefaktas mokiniui                                                | Agentai        |
| -------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------------------ | -------------- |
| **C-M1** | I2V ciklas: invariantai + **viena** kamera + **vienas** veiksmas + 3 s testas + **paskutinio kadro** patikra | `13.4` Patikra · `13.47` meter hint · `152` `doneWhen` | 4 eil. Stage blokas (invariantai / kamera / veiksmas / last-frame) | CONTENT → DATA |
| **C-M2** | Stiliaus antraštė **pažodžiui** + „vienas modelis visai serijai“                                             | `13.3` Daryk/Patikra · `150.5` žingsnis                | 15+ žodžių lock sakinys; neperrašinėti                             | CONTENT → DATA |
| **C-M3** | Balso studija: rašyk ausiai + žodynėlis (pavadinimai) + 3 inkaro eilutės + fonas **po** balsu                | `13.6` · `153`                                         | Trumpa VO kortelė; bed „palik vietos balsui“                       | CONTENT → DATA |

### C-M1 — kodėl Must

2026 I2V praktika (SurePrompts, Magic Hour, DEV I2V walkthrough): drift matosi **paskutiniame** kadre (etiketė, pirštai, crop), ne pirmajame. `152` dabar klausia „ar stilius liko“ — per plona.

**Stage (įklijuoti, ne Flagship):**

```text
Pradžia: pridedamas raktinis kadras. Laikyk tapatybę ir kadravimą.
Kas nekinta: [produktas / etiketė / spalvos / šviesa iš kairės].
Objektas daro: [vienas veiksmažodis].
Kamera: [vienas judesys]. Be orbitos, be tilt, be kelių judesių.
Trukmė: 3 s pirma. Paskutinis kadras: etiketė skaitoma, nėra naujų objektų.
```

**Patikra (3 klausimai):** Ar invariantai parašyti? Ar keitei tik vieną dalyką? Ar žiūrėjai **paskutinę** sekundę?

### C-M2 — kodėl Must

2026 serijos taisyklė: fiksuota 15+ žodžių antraštė + tas pats modelis. Dabar ženklas = laukai, kuriuos mokinys kaskart perrašo → drift.

**Stage:**

```text
Stiliaus užraktas (nekaitaliok žodžių): švarus katalogo kadras, šviesa iš kairės,
baltas fonas, tikros produkto spalvos, raiški etiketė, be teksto viršuje.
Tas pats produktas, tos pačios proporcijos, ta pati etiketės vieta.
Modelis šiai serijai: [vienas]. Nekelk į kitą viduryje.
```

### C-M3 — kodėl Must

2026 VO (ElevenLabs studio playbook): drift = ne „blogas balsas“, o skirtingas tempo / tarimas per klipus. `153` dabar = nuotaika + teisės.

**Stage:**

```text
Rolė: [kam kalba]. Tonas: [šiltas / ramus]. Tempą laikyk tą patį.
Žodynėlis: [prekės ženklas] = [kaip tarti].
Pirma išbandyk 3 eilutes: kablukas / nauda / kvietimas. Tada visą tekstą.
Fonas: be vokalo, tylus, palik vietos balsui. License: commercial.
```

**Won’t C-M viduje:** Stability sliders UI, SSML pamoka, naujas lab.

---

## 4. Should

| ID       | Darbas                                                                                 | Kur                                               | Kodėl ne Must                           | Feature Doc?                                                            |
| -------- | -------------------------------------------------------------------------------------- | ------------------------------------------------- | --------------------------------------- | ----------------------------------------------------------------------- |
| **C-S1** | Native garsas (Veo) **vs** tylus I2V + balsas atskirai                                 | `13.5` collapsible + `13.47` vienas hint          | Kelias veikia su dabartiniu audio-first | Ne                                                                      |
| **C-S2** | Pirmas + paskutinis kadras (kai įrankis moka)                                          | `152` antras Stage **arba** 13.47 optional laukas | Ne visi įrankiai; C-M1 pakanka startui  | Tik jei 13.47 gauna naują control — tada enhancement, ne naujas Pattern |
| **C-S3** | Viena **užrakto kortelė** (modelis / antraštė / refs / balsas / teisės / žyma) per M15 | `150.25` caption **arba** I3 1 eilutė             | Higiena; Must jau moko dalis            | Ne                                                                      |
| **C-S4** | M14: **ne** 12 stem rewrite. Max 1 bonus / warm eilutė „ką keiti retry #2?“            | `140.5` warm-3 **arba** `143` Patikra             | Walk uždraudė 12 rewrite                | Ne                                                                      |

### C-S1 šakutė (mokinio kalba)

- Reikia dialogo / aplinkos **viename** generate → Veo klasė, garsą rašyk **tame pačiame** prompte.
- Reikia **prekės balso** / licencijos → tylus I2V + ElevenLabs + mix (dabartinis kelias). Klientui saugesnis.
- Niekada nedėk native garso **ir** naujo VO ant to paties klipo, jei nežinai, kurį išmesi.

---

## 5. Could

| ID       | Darbas                                                           | Kur                                  | Pastaba                                                                                                                        |
| -------- | ---------------------------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| **C-C1** | UGC / kalbantis kadras + produktas rankoje                       | Optional M15 šaka arba 13.4 pavyzdys | Didžiausia komercinė skylė; [ai-creator-academy](https://github.com/EjiRYL/ai-creator-academy) Track 1. Ne naujas MUST kelias. |
| **C-C2** | Apšvietimas kaip **pagrindinis** vaizdo slotas (ne tik 13.33)    | `13.2` Micro +1 eil.                 | 2026 šešių slotų anatomija; optional 13.33 jau moko                                                                            |
| **C-C3** | „Pakeisk kadrą, ne promptą“ — rankos / tekstas video / du žmonės | `13.4` pitfalls + `13.101`           | Fail bucket, ne nauja teorija                                                                                                  |
| **C-C4** | Seed lock + keisk vieną lauką (Flux / SD)                        | `13.35` optional                     | Hosted GPT-Image dažnai be seed — ne visiems                                                                                   |
| **C-C5** | Inpaint kaip **pirmas** taisymas (ne tik 13.32 sakinys)          | `13.325` fresh/drift hint            | Lab already; Could = viena eilutė fix cue                                                                                      |

---

## 6. Won’t (šis pack / ši auditorija)

| ID       | Kas                                                     | Kodėl                                                   |
| -------- | ------------------------------------------------------- | ------------------------------------------------------- |
| **C-W1** | LoRA / ComfyUI / ControlNet mokymas                     | SOT §5 P2; ne rinkodaros kelias                         |
| **C-W2** | Zapier / automatų fabrikas                              | SOT §5b.1 SHOULD #9 — palikti SOT, ne šį pack           |
| **C-W3** | 250-term cinematography dictionary / 17-field Suno JSON | Optional 13.33 + bed Stage pakanka                      |
| **C-W4** | Nauja skaidrė / naujas Pattern / Brand Kit              | Freeze + Feature Doc Contract                           |
| **C-W5** | 12 M14 stem pedagoginis perrašymas                      | Walk Won’t                                              |
| **C-W6** | Hybrid real B-roll kaip atskira skaidrė                 | SOT P2                                                  |
| **C-W7** | Sora/Veo savaitinis chase; nauji logotipai kataloge     | Matrica = darbas, ne hype. Versijas šaldyti, ne gaudyti |
| **C-W8** | I2-M13 kalbos eilutes maišyti su craft                  | Kalba pirma; craft po „tvarkom“                         |
| **C-W9** | M13 TRIM/TE/S4, hygiene→0, `generate:core-data`         | AGENTS + intake freeze                                  |

---

## 7. Bangos (jei savininkas atidaro)

| Banga | Ticket’ai                          | Stop                                             | Trukmė (orientyras)                                       |
| ----- | ---------------------------------- | ------------------------------------------------ | --------------------------------------------------------- |
| **0** | I2-M13                             | First-screen + ciklas; TRIM neliesti             | **shipped** 2026-08-18                                    |
| **1** | C-M1 + C-M2 + C-M3                 | Trys Stage + Patikra LT+EN + I3 eilutė jei telpa | **shipped** 2026-08-18                                    |
| **2** | C-S1 + C-S3                        | Šakutė 13.5; užrakto kortelė 150.25/I3           | Be 13.47 UI                                               |
| **3** | C-S2 jei 13.47 optional frame pair | Tik enhancement                                  | Feature Doc **nereikia**, jei tas pats `i2v-generatorius` |
| **—** | Could                              | Tik po Bangos 1 ir savininko                     | —                                                         |

**DoD Bangai 1:** `audit:m1315` · `build:modules-en-m13-m15` · paste-run 3 Stage (vaizdas / I2V / VO) · jokio naujo `image` key · M13P klasė = Stage.

---

## 8. Šaltiniai (2026-08-18)

- Image: [SurePrompts image 2026](https://sureprompts.com/blog/ai-image-prompting-complete-guide-2026) · [style header + seed](https://aitoolsguidebook.com/en/articles/ai-image-style-consistency/)
- Video: [SurePrompts video 2026](https://sureprompts.com/blog/ai-video-prompting-complete-guide-2026) · [I2V refs](https://magichour.ai/blog/how-to-use-reference-images-in-image-to-video) · [I2V pipeline](https://dev.to/yu_ark_4d99e2b62ec81bd91a/build-a-reliable-image-to-video-workflow-before-you-pick-a-model-208j)
- Garsas: [ElevenLabs studio 2026](https://voiceoverstudioai.com/blog/ai-voiceover-2026)
- GitHub: [cliprise/awesome-ai-video-generator-prompts](https://github.com/cliprise/awesome-ai-video-generator-prompts) · [ai9app/AI-Cinematic-Prompt-Director](https://github.com/ai9app/AI-Cinematic-Prompt-Director) · [EjiRYL/ai-creator-academy](https://github.com/EjiRYL/ai-creator-academy)

Įrankių vardai keičiasi (Sora prieinamumas 2026 šaltiniuose nesutampa). C-W7 = ne gaudyti savaitės nugalėtoją.

---

## 9. Handoff

Ticket’ai gyvena **[`TODO.md`](../../../TODO.md) §1.3b** (ne P0/P1). Šis failas = spec (Stage copy, DoD).

| Kada                         | Kas                                                                                                                   |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Dabar                        | Banga 1–3 ✅ (C-M1–M3 + C-S1–S4). Šis failas = spec; lenta = TODO §1.3b.                                              |
| Po savininko                 | Could C-C\* tik jei reikia. CURRICULUM eilės **nekeisti**.                                                            |
| Jei nori UI 13.47 frame pair | Already closed as **copy on 152**; naujas control = atskiras savininko ticket + Feature Doc tik jei Pattern keičiasi. |

```text
CHANGES: Banga 1–3 shipped (13.3 / 13.4 / 13.5 / 13.6 / 13.47 / 143 / 150.25 / 150.5 / 152 / 153 + I3 + corp15 sync). CHECKS: audit:m1315 · build:modules-en-m13-m15 · generate:core-data · validate:schema.
RISKS: Flagship siena; 13.47 control be Pattern; generate:core-data 4-profile churn.
NEXT: Could C-C* parked; complete-screen #16 parked; I5 / Should tik po savininko.
```
