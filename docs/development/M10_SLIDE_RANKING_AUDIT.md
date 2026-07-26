# M10 slide ranking audit (post–Wave1/2)

> **Data:** 2026-07-26  
> **Scope:** Modulis 10 only (30 skaidrės). M11/M12 = Wave3 – out of scope.  
> **Šaltiniai:** `src/data/modules.json` (live), `docs/MODULIO_10_SKAIDRIU_EILES.md`, TE overlay, GOLDEN §3.2/3.6/3.8, UI_UX §4.2, USER_JOURNEY §3.  
> **Ne SOT istorijai:** `docs/PEDAGOGINE_ANALIZE_MODULIAI_10_11_12.md` C-tier (pre-Wave) – **nenaudoti** kaip dabartinius rangus.  
> **Fazė:** analizė + **W3a Top-5 batch done** (2026-07-26).

---

## 1. Rubrika (užšaldyta)

Kiekviena skaidrė: **1–5** penkiose ašyse. **Avg** = aritmetinis vidurkis.  
**Rework** = bet kuri ašis **≤2**, arba TE kind/Pattern neatitinka (lab vs embed vs wall-of-text).

| Ašis         | Kas vertinama                                                                                                                   | 5 =                                                         | 1 =                                                                         |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | --------------------------------------------------------------------------- |
| **UI**       | Chrome: title/shortTitle, footer N (§3.6), CTA, accent biudžetas, lentelių skaitomumas; be curriculum ID / `docs/` learner copy | Chrome švarus; accent ≤2; skenuojamas pirmas viewport       | Sulaužytas footer/CTA, accent flood, jargon chrome                          |
| **UX**       | Vienas darbas / vienas primary action; lab ar `toolChoiceBar` uždirba vietą; be Trumpai≈takeaway echo; wall vs picker           | Aiškus veiksmas; embed/lab padeda pasirinkti                | Siena teksto, konkuruojantys CTA, neveikiantis picker, dubliuotas messaging |
| **Journey**  | Vieta kelyje (zonos I–V): vertė, kognityvinė apkrova, micro-win, progresas, transfer į kitą / M12                               | Vertė + micro-win + „kur esu“ + transfer                    | Friction dump, be veiksmo, energy drop, dead-end                            |
| **Maturity** | Copyable / lab artefaktas fit-for-purpose (Micro/Stage/Flagship/Lab); verslo konkretumas; ne list-echo                          | Teisinga klasė; placeholders; paste-and-run                 | Generic assistant, atpasakojimas, „ilgesnis = brandesnis“                   |
| **TE**       | Kind (diagram/lab/embed/table/slide-type); Pattern+Shell; GOLDEN ciklas MUST skaidrėse; registry 0–4                            | Teisingas kind; TE≥3; Trumpai→Daryk→Copy→Patikra kai reikia | Wrong Pattern, orphan image, skylė cikle                                    |

### Type-aware taisyklės

| Tipas                                                                               | Maturity                                                  | TE pastaba                          |
| ----------------------------------------------------------------------------------- | --------------------------------------------------------- | ----------------------------------- |
| `path-step`, `warm-up-quiz`, `section-break`, `action-intro`, `glossary`, `summary` | N/A → **4**, jei chrome OK (nebausti už „nėra Flagship“)  | `slide-type:*`                      |
| `content-block` / lab / embed                                                       | Vertinti copyable klasę + ciklo užbaigtumą                | image/lab/embed iš overlay          |
| `evaluator-prompt-block`                                                            | Flagship vertintojas = aukšta Maturity, jei QC job aiškus | `slide-type:evaluator-prompt-block` |

### Kalibracija (post-Wave)

- Wave1/2 paliestos skaidrės startuoja **neutral-high** Maturity/TE, nebent lieka tankis / Journey.
- Dense: `10.36`, `10.48`, `10.25`, `10.35`, `10.37` – griežtesnis UX/Journey.
- **UI provisional** iki browser C1–C6 (`M1012-2`) – JSON green ≠ @375px green.

---

## 2. Mechanical registry (JSON eilė = UI 1…30)

| UI  | id     | type                   | shortTitle                    | Pattern / kind                                    | Signals                       | Opt     |
| --- | ------ | ---------------------- | ----------------------------- | ------------------------------------------------- | ----------------------------- | ------- |
| 1   | 100    | action-intro           | —                             | `slide-type:action-intro`                         | howToUse short/full           | —       |
| 2   | 10.1   | content-block          | Kelias modulyje               | content-block                                     | copy×1, cycle                 | —       |
| 3   | 10.2   | content-block          | Agentų ciklas                 | `diagram:agent_workflow_diagram` Shell            | copy×1                        | —       |
| 4   | 10.21  | path-step              | Kontrolinis taškas: ciklas    | `slide-type:path-step`                            | path 1/3, copy×1              | —       |
| 5   | 10.22  | warm-up-quiz           | Savitikra: ciklas             | `slide-type:warm-up-quiz`                         | 3Q                            | —       |
| 6   | 10.25  | content-block          | 3A strategija                 | `diagram:m10_three_a_strategy` Shell              | copy×1; 8 sec                 | —       |
| 7   | 10.26  | content-block          | Kada tvirtina žmogus?         | `lab:m10_human_control_simulator` Shell=Ne        | interactive-control-lab       | —       |
| 8   | 10.3   | content-block          | Rolės ir sisteminis promptas  | content-block                                     | copy×1                        | —       |
| 9   | 10.45  | content-block          | DI agentų tipai ir rolės      | `lab:m10_agent_taxonomy` Shell=Ne                 | depth/roles lab               | —       |
| 10  | 10.451 | path-step              | Kontrolinis taškas: rolės     | `slide-type:path-step`                            | path 2/3                      | —       |
| 11  | 10.48  | content-block          | 5 darbo eigos šablonai        | `embed:toolChoiceBar:m10:10.48:s1`                | TCB + copy×5                  | —       |
| 12  | 10.485 | warm-up-quiz           | Savitikra: workflow           | `slide-type:warm-up-quiz`                         | 3Q (šablonai)                 | —       |
| 13  | 10.482 | content-block          | Orkestravimo simuliacija      | `diagram:m10_agent_orchestrator` Shell            | multi-agent                   | —       |
| 14  | 10.481 | section-break          | Keli agentai → darbo eiga     | `slide-type:section-break`                        | spinoffCta                    | —       |
| 15  | 10.49  | content-block          | Uždaro mokymosi ciklas        | `diagram:m10_learning_loop` Shell                 | copy×1                        | —       |
| 16  | 10.4   | content-block          | Įrankių pasirinkimas          | content-block                                     | DI platformos; copy×1         | —       |
| 17  | 10.5   | content-block          | Agentas ar paprastas promptas | content-block                                     | copy×2                        | —       |
| 18  | 10.51  | path-step              | Kontrolinis taškas: promptas  | `slide-type:path-step`                            | path 3/3                      | —       |
| 19  | 10.6   | content-block          | Klaidos tvarkymas ir ribos    | content-block                                     | copy×1                        | —       |
| 20  | 10.61  | warm-up-quiz           | Savitikra: saugikliai         | `slide-type:warm-up-quiz`                         | 3Q                            | —       |
| 21  | 10.15  | content-block          | Pagrindinės sąvokos           | `diagram:m10_trigger_flow` Shell                  | copy×1; 9 sec                 | —       |
| 22  | 10.151 | section-break          | Darbo eiga → automatizavimas  | `slide-type:section-break`                        | spinoffCta                    | —       |
| 23  | 10.35  | content-block          | Automatizavimo įrankiai       | `diagram:m10_tool_decision_tree` + `embed:…10.35` | TCB + copy×4                  | —       |
| 24  | 10.36  | content-block          | Kur paleisti                  | `embed:…10.36` + `table:m10:10.36` ×2             | TCB + preCopy + copy×3        | —       |
| 25  | 10.37  | content-block          | GitHub kaip kodo šaltinis     | `table:m10:10.37:s1`                              | copy×1; 7 sec                 | **opt** |
| 26  | 10.64  | content-block          | Minimalus eigos aprašymas     | content-block                                     | MUST (docs); copy×1           | —       |
| 27  | 10.65  | content-block          | Testavimas ir saugumas        | `m10_workflow_spec` + `m10_incident_playbook`     | 2× Shell; **be** Copy/Patikra | **opt** |
| 28  | 10.66  | evaluator-prompt-block | QC vertintojas                | `slide-type:evaluator-prompt-block`               | copy×1                        | —       |
| 29  | 10.7   | glossary               | Žodynėlis                     | `slide-type:glossary`                             | terms                         | **opt** |
| 30  | 10.8   | summary                | Modulio 10 santrauka          | `slide-type:summary`                              | nextStepCTA → M11             | —       |

---

## 3. Scored registry

> UI balai **provisional** (browser C1–C6 dar ⬜).

| UI  | id     | UI  | UX  | Journey | Maturity | TE  | Avg     | Rework? | Top issue                                      | Owner           |
| --- | ------ | --- | --- | ------- | -------- | --- | ------- | ------- | ---------------------------------------------- | --------------- |
| 1   | 100    | 4   | 4   | 4       | 4        | 4   | **4.0** |         | Onboarding OK                                  | —               |
| 2   | 10.1   | 4   | 4   | 4       | 4        | 4   | **4.0** |         | Wave1 žemėlapis OK                             | —               |
| 3   | 10.2   | 4   | 4   | 4       | 4        | 4   | **4.0** |         | Ciklas + apply OK                              | —               |
| 4   | 10.21  | 4   | 4   | 4       | 4        | 4   | **4.0** |         | Path-step 1/3                                  | —               |
| 5   | 10.22  | 4   | 4   | 4       | 4        | 4   | **4.0** |         | Warm-up po ciklo                               | —               |
| 6   | 10.25  | 3   | 3   | 3       | 4        | 4   | **3.4** |         | 8 sec + 4 long; ankstyvas tankis               | CONTENT         |
| 7   | 10.26  | 4   | 5   | 5       | 4        | 5   | **4.6** |         | Lab etalonas po 3A                             | —               |
| 8   | 10.3   | 4   | 4   | 4       | 4        | 4   | **4.0** |         | Wave1 anatomija OK                             | —               |
| 9   | 10.45  | 4   | 5   | 4       | 4        | 4   | **4.2** |         | Depth/roles lab OK                             | —               |
| 10  | 10.451 | 4   | 4   | 4       | 4        | 4   | **4.0** |         | Path-step 2/3                                  | —               |
| 11  | 10.48  | 4   | 4   | 4       | 4        | 4   | **4.0** |         | Trumpai/Daryk „vienas planas“ (W3a)            | —               |
| 12  | 10.485 | 4   | 4   | 4       | 4        | 4   | **4.0** |         | Po šablonų prieš orch; eilė sync (W3a)         | —               |
| 13  | 10.482 | 4   | 4   | 3       | 4        | 5   | **4.0** |         | Schema polish ✅; seka odd                     | CURRICULUM      |
| 14  | 10.481 | 4   | 4   | 4       | 4        | 4   | **4.0** |         | Epilogas po orch; eilė = live (W3a)            | —               |
| 15  | 10.49  | 4   | 4   | 4       | 4        | 4   | **4.0** |         | Learning loop OK                               | —               |
| 16  | 10.4   | 4   | 4   | 3       | 4        | 3   | **3.6** |         | Plonas po medis→10.35                          | CONTENT         |
| 17  | 10.5   | 4   | 4   | 4       | 4        | 4   | **4.0** |         | 2 copy + decision OK                           | —               |
| 18  | 10.51  | 4   | 4   | 4       | 4        | 4   | **4.0** |         | Path-step 3/3                                  | —               |
| 19  | 10.6   | 4   | 4   | 4       | 4        | 4   | **4.0** |         | Saugikliai OK                                  | —               |
| 20  | 10.61  | 4   | 4   | 4       | 4        | 4   | **4.0** |         | Warm-up prieš sąvokas                          | —               |
| 21  | 10.15  | 4   | 3   | 3       | 4        | 4   | **3.6** |         | 9 sec; vėlai modulyje                          | CONTENT         |
| 22  | 10.151 | 4   | 4   | 4       | 4        | 4   | **4.0** |         | Section-break OK                               | —               |
| 23  | 10.35  | 3   | 3   | 3       | 4        | 4   | **3.4** |         | Medis+TCB+4 copy; Trumpai trim (W3a)           | —               |
| 24  | 10.36  | 4   | 4   | 4       | 4        | 4   | **4.0** |         | Orientacija collapsible; Patikra=preCopy (W3a) | —               |
| 25  | 10.37  | 4   | 4   | 4       | 4        | 4   | **4.0** |         | Slim 6 sec; eiga → Trumpai/Daugiau (W3a)       | —               |
| 26  | 10.64  | 4   | 4   | 4       | 4        | 4   | **4.0** |         | MUST bilietas OK (flag tik docs)               | DATA (optional) |
| 27  | 10.65  | 3   | 4   | 4       | 4        | 4   | **3.8** |         | Micro-cycle Daryk/Copy/Patikra (W3a)           | —               |
| 28  | 10.66  | 4   | 4   | 5       | 5        | 4   | **4.4** |         | QC Flagship                                    | —               |
| 29  | 10.7   | 4   | 4   | 4       | 4        | 4   | **4.0** |         | Optional glossary                              | —               |
| 30  | 10.8   | 4   | 4   | 4       | 4        | 4   | **4.0** |         | Santrauka + CTA M11                            | —               |

**Modulio Avg (visi 30):** ~3.95 (po W3a)  
**Rework flag:** none (cleared W3a).

---

## 4. Worst-first Top 8

| Rank | id         | Avg | Diagnozė (1 eilutė)                                                                                                        | Owner                |
| ---- | ---------- | --- | -------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| 1    | **10.36**  | 2.6 | Tankiausia MUST skaidrė: 2 lentelės + TCB + preCopy + 3 copyable; GOLDEN ciklas be **Patikra**; prieš GitHub/MUST bilietą. | CONTENT → DATA       |
| 2    | **10.65**  | 2.6 | Optional deep = referencinė siena (2 Shell + 8 blokų + 10 scenarijų); nėra Copy/Patikra – silpna Maturity.                 | CONTENT / CURRICULUM |
| 3    | **10.37**  | 3.0 | Optional GitHub deep vis dar 7 sec prieš 10.64; short path gali praleisti, full path – friction.                           | CONTENT              |
| 4    | **10.25**  | 3.4 | Wave1 pagerino „Kur pritaikyti“, bet 8 sekcijos / 4 long body – ankstyvas cognitive dump.                                  | CONTENT              |
| 5    | **10.48**  | 3.4 | Embed picker ✅, bet 5 linked copy + Patikra + collapsible vis dar katalogo jausmas.                                       | CONTENT / UI_UX      |
| 6    | **10.35**  | 3.4 | Medis namuose + TCB + 4 copy + „Daugiau“ – antras platformų tankio pikas greta 10.36.                                      | CONTENT / UI_UX      |
| 7    | **10.481** | 3.4 | Section-break **po** orch (JSON); eilė SOT: tiltas po 10.48 **prieš** orch – Journey ≤2.                                   | CURRICULUM → DATA    |
| 8    | **10.485** | 3.4 | Warm-up **prieš** orch; live Q tik apie šablonus (ne orch) – eilė docs vs JSON drift.                                      | CURRICULUM           |

**Honorable (Avg 3.6, stebėti):** `10.15`, `10.4`.

---

## 5. System findings

### 5.1 Sekos klasteris `10.481 / 10.482 / 10.485` — **resolved W3a**

Live JSON order kept: **10.48 → 10.485 → 10.482 → 10.481 → 10.49**.  
Eilė + `turinio_pletra` §3b3a + 10.481 epilogue copy synced (2026-07-26).

### 5.2 `10.64` MUST

MUST tik docs / Trumpai kalboje; JSON `optional` nėra (teisingai ne-optional). Encoding OK; jei reikia machine flag – vėliau DATA (ne P0 šiam auditui).

### 5.3 Browser gate

`M1012-2` C1–C6 @375px LT→EN – **open**. Šio audito UI stulpelis = struktūrinis / JSON chrome, ne vizualus smoke.

### 5.4 Wave1/2 vs šis re-rank

Wave1/2 uždarė intake copy/schema temas. **Naujas** silpniausias sluoksnis = **tankis + ciklo skylės** (`10.36`, `10.65`) ir **sekos drift**, ne senas pedagoginis C-tier (`10.25/10.15/10.35` jau pakelti, bet vis dar Top 8 dėl density).

---

## 6. Top-5 batch (W3a) — **done 2026-07-26**

| #   | id                         | Kas padaryta                                                       | Post Avg |
| --- | -------------------------- | ------------------------------------------------------------------ | -------- |
| 1   | **10.36**                  | Orientacija collapsible; Daryk „vienas režimas“; Patikra = preCopy | 4.0      |
| 2   | **10.65**                  | Micro-cycle Daryk + Copy checklist + Patikra; 8 blokų collapsed    | 3.8      |
| 3   | **10.37**                  | Eiga → Trumpai/Daugiau; 6 sec; trumpesnis copyable                 | 4.0      |
| 4   | **Cluster**                | Eilė = live; 10.481 epilogas                                       | 4.0      |
| 5   | **10.48** (+10.35 Trumpai) | „Vienas planas“ framing                                            | 4.0      |

Lieka atskirai: browser C1–C6 (`M1012-2`); M11/M12 Wave3.

---

## 7. Nuorodos

- Eilė: [`docs/MODULIO_10_SKAIDRIU_EILES.md`](../MODULIO_10_SKAIDRIU_EILES.md)
- Intake (Wave1/2 themes): [`docs/development/intake/M10_M12_TOBULINIMO_INTAKE_2026-07.md`](intake/M10_M12_TOBULINIMO_INTAKE_2026-07.md)
- TE: [`TEACHING_ELEMENTS_REGISTRY.md`](TEACHING_ELEMENTS_REGISTRY.md)
- Chrome gate: [`TEST_REPORT.md`](TEST_REPORT.md) M1012 C1–C6
- Open TODO: `M1012-2` (browser); W3a/`M1012-R` done

```text
CHANGES: W3a Top-5 LT+EN+SOT; ranking scores bumped; rework cleared
CHECKS: audit:m1012 OK; validate:schema OK; LT/EN section parity
RISKS: UI still provisional until M1012-2 browser @375px
NEXT: M1012-2 browser; M11/M12 Wave3
```
