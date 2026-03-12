# Dokumentacijos indeksas – kur kuo remtis

> **Tikslas:** Agentai ir žmonės žino, kuris dokumentas yra tiesa (SOT), kas aktyvus, o kas archyvuota.  
> **Atnaujinta:** 2026-03-11 (architektūra A)
>
> **Agentams (lean, prieinama):** pirmiausia **`docs/DOCUMENTATION_QUICK_REF.md`** (SOT + keliai); **`docs/LEAN_INDEX.md`** – minimalus branduolys (~20 failų). Pilnas sąrašas ir archyvas žemiau.

---

## 1. Source of Truth (SOT) – pagrindinė tiesa

Šiuose failuose – **vienintelė** tiesa savo srityje. Konfliktų atveju laimėti šie.

| Sritis | Failas | Pastaba |
|--------|--------|---------|
| **Turinys Moduliai 1–3** | `turinio_pletra.md` (root) | Pedagogika, terminologija, struktūra |
| **Turinys Moduliai 4–6** | `docs/turinio_pletra_moduliai_4_5_6.md` | Teorija (4), testas (5), projektas (6) |
| **Turinys Moduliai 10–12** | `docs/turinio_pletra_moduliai_10_11_12.md` | Agentų inžinerija: teorija (10), testas (11), projektas (12) |
| **Turinys Moduliai 13–15** | `docs/turinio_pletra_moduliai_13_14_15.md` | Turinio inžinerija: teorija (13), testas (14), projektas (15) |
| **Kur kalbama apie kurį modulį** | `docs/CONTENT_MODULIU_ATPAZINIMAS.md` | 4.1–4.7 = tik Modulio 4; 10.1–10.8 = tik Modulio 10; 13.1–13.9 = tik Modulio 13 |
| **Dizaino etalonas** (šriftai, spalvos, skaidrių schemos) | `docs/development/GOLDEN_STANDARD.md` | Vienas etalonas visiems moduliams (v2.3.0: §3.4c skiriamoji/apibendrinimo; §3.4d path-step kelio žingsnis, badge, žodynėlio atrakinimas) |
| **Duomenys** | `src/data/modules.json`, `src/data/modules-m1-m6.json`, `promptLibrary.json`, `glossary.json`, `glossary-m1-m6.json`, `tools.json`, `tools-m1-m6.json`, `hallucinationRates.ts` | `modules.json` / `glossary.json` / `tools.json` = full redagavimo SOT; `*-m1-m6.json` = core build/runtime profilis |
| **Vartotojo atsiliepimai** | `docs/VARTOTOJU_ATSILIEPIMAI_BENDRAS.md` | Gyvas testavimas, V1/V2, segmentai |
| **Klaidos ir sprendimai** | `docs/development/TEST_REPORT.md` | QA_AGENT priima klaidas čia |

---

## 2. Lean branduolys ir aktyvūs dokumentai

**Lean (pakanka daugumai užduočių):** žr. **`docs/LEAN_INDEX.md`** – SOT, agentai, M4 eilė, kokybė.

### Agentai ir procesas (development/)
| Failas | Paskirtis |
|--------|-----------|
| `docs/development/AGENT_ORCHESTRATOR.md` | Routeris, pipeline, kokybės vartai |
| `docs/development/PLAN_AGENTAI_DARBAI.md` | Kas, seka, Modulio 4 MUST/SHOULD |
| `docs/development/PEDAGOGINES_IZVALGOS_ROADMAP.md` | Pedagoginės įžvalgos, Must/Should/Want |
| `docs/development/CONTENT_AGENT.md` | CONTENT_AGENT spec |
| `docs/development/CURRICULUM_AGENT.md` | Pedagogika, Bloom, santraukos |
| `docs/development/SCHEME_AGENT.md` | Schemų/diagramų gairės |
| `docs/development/DIAGRAMU_GERIAUSIOS_PRAKTIKOS.md` | Diagramų praktikos |
| `docs/development/AGENT_VERIFICATION_NE_MELUOTI.md` | Verifikacija, „padaryta“ vs tikrovė |
| `docs/development/UI_UX_AGENT.md` | UI/UX gairės |
| `docs/development/LENTELIU_STANDARTAS.md` | Lentelių standartas |
| `docs/development/USER_JOURNEY_AGENT.md` | Vartotojo kelionės diagnostika |
| `docs/development/DATA_AGENT_TOOLS.md` | DATA_AGENT įrankiai |
| `docs/development/DATA_AGENT_DUOMENYS_ATNAUJINIMAS.md` | Duomenų atnaujinimo gairės |
| `docs/development/analysis/` | Vienkartinės analizės (CTA auditas, footer, EN UI, UX planas ir kt.) – žr. analysis/README.md |

**User Journey seka ir modulio analizės:** `docs/archive/development/` (AGENT_SEQUENCE_USER_JOURNEY_MVP_MODULIO_ANALIZE, MODULIO_*_USER_JOURNEY_ANALIZE, M4_SKAIDRE_*, ANALIZE_* ir kt.) – žr. `docs/archive/README.md` (lokaliai).

### Bendra kursų analizė (1–15)
| Failas | Paskirtis |
|--------|-----------|
| `docs/EXECUTIVE_ATASKAITA_PROGRAMOS_1_IKI_15.md` | **Executive ataskaita klientams/partneriams** – pilna „Promptų anatomijos“ programa 1–15: temos nuodugniai ir konkrečiai, visi moduliai |
| `docs/KURSO_1_IKI_15_ANALIZE_APIBENDRINIMAS.md` | **Visa kursų 1–15 analizė** – kas gerai/negerai, ko trūksta/per daug, SWOT, pasiūlymai pagal dalis, low-hanging fruits |

### Kokybė ir release
| Failas | Paskirtis |
|--------|-----------|
| `docs/development/RELEASE_QA_CHECKLIST.md` | 5 min prieš release (a11y, lietuviškos raidės, MVP) |
| `docs/development/PAPRASTOS_KALBOS_GAIRES.md` | Paprasta kalba, žargonas |
| **Archyvas** | Mobile auditas, EN standartas, santraukos spec – `docs/archive/development/` (MOBILE_UI_UX_AUDIT, EN_LANGUAGE_STANDARD, SUMMARY_SLIDE_SPEC) |
| `docs/development/TESTING_CHECKLIST.md` | Testavimo sąrašas |
| `docs/development/ANALYTICS_EVENT_TAXONOMY.md` | MVP Analytics (eventai, funnel) |
| `docs/development/ANALYTICS_DASHBOARD_MVP.md` | Dashboard wireframe, PostHog |
| `docs/development/PDF_MAKETO_GAIRES.md` | PDF maketas (tipografija, NotoSans) |
| `docs/development/PDF_DOWNLOAD_TESTING.md` | PDF atsisiuntimo testai |
| `docs/development/PDF_GENERATION_AGENT_MEMORY.md` | PDF geriausios praktikos, checklist |
| **Archyvas** | LT/EN analizės, multikalbiškumas, WWW nuorodos – `docs/archive/development/` |

### Moduliai 4–6 (struktūra ir tobulinimai)
| Failas | Paskirtis |
|--------|-----------|
| `docs/MODULIO_4_SKAIDRIU_EILES.md` | Oficiali Modulio 4 skaidrių eilė (4.0→4.7) |
| `docs/MODULIO_4_TOBULINIMAI_GERIAUSIOS_PRAKTIKOS.md` | MUST/SHOULD prioritetai (PLAN_AGENTAI remiasi) |
| `docs/PEDAGOGINE_ANALIZE_MODULIAI_4_5_6.md` | Pedagoginė analizė |
| `docs/SKAIDRIU_TIPU_ANALIZE.md` | Skaidrių tipai (content-driven) |
| **Archyvas** | User Journey analizės, M4 skaidrių 56/59/63 auditai, gilios analizės – `docs/archive/development/` |

### Moduliai 10–12 (Agentų inžinerija)
| Failas | Paskirtis |
|--------|-----------|
| `docs/turinio_pletra_moduliai_10_11_12.md` | Turinio SOT M10–M12 |
| `docs/MODULIO_10_SKAIDRIU_EILES.md` | Oficiali M10/M11/M12 skaidrių eilė |
| `docs/AUTOMATIZAVIMO_IRANKIAI_VERSLUI.md` | Verslo automatizavimo gidas (papildomas skaitymas M10–12) |
| **Archyvas** | MODULIO_10_USER_JOURNEY_ANALIZE, ANALIZE_*_10_11_12, MODULIAI_10_11_12_TURINIO_SPRAGOS – `docs/archive/development/` |

### Moduliai 13–15 (Turinio inžinerija)
| Failas | Paskirtis |
|--------|-----------|
| `docs/turinio_pletra_moduliai_13_14_15.md` | Turinio SOT M13–M15 |
| `docs/MODULIO_13_SKAIDRIU_EILES.md` | Oficiali M13/M14/M15 skaidrių eilė |
| **Archyvas** | MODULIO_13_USER_JOURNEY_ANALIZE, ANALIZE_*_13_14_15, MODULIAI_13_14_15_TURINIO_SPRAGOS – `docs/archive/development/` |

### Konteksto inžinerija (agentams)
| Failas | Paskirtis |
|--------|-----------|
| `docs/development/context-engineering/` | sot_index.json, context_budget.md, memory_schema, eval_rubric |
| `docs/development/CONTEXT_ENGINEERING_AGENT_SKILLS_IMPLEMENTATION.md` | Planas konteksto biudžetui |

### Pradžia ir deployment
| Failas | Paskirtis |
|--------|-----------|
| `docs/getting-started/QUICK_START.md` | Greitas pradžios gidas |
| `docs/deployment/DEPLOYMENT.md` | Deployment instrukcijos |
| `docs/deployment/GITHUB_SETUP.md` | GitHub Pages setup |

### Marketingas ir funnel
| Failas | Paskirtis |
|--------|-----------|
| `docs/marketing_plan.md` | **Rinkodaros planas (vienas dokumentas)** – auditorija, žinutės, kanalai (LinkedIn lead magnet, WhatsApp), funnel, monetizacija (Modulis 4 mokamai), integracijos (Brevo, GA4, UTM), MUST–SHOULD–WANT. Sąsaja: `VARTOTOJU_ATSILIEPIMAI_BENDRAS.md` §11. Supersedes: `docs/archive/marketing_plan.md`, `docs/archive/MARKETING_MUST_SHOULD_WANT.md`. |
| `docs/LinkedIn_audience_insights_2026-02-21.md` | **LinkedIn įrašo auditorijos analizė** – kas pamatė postą (2026-02-21), validacija su rinkodaros planu, įžvalgos, Kiss–Marry–Kill prioritizacija. Šaltinis: `docs/archive/20260221_Linkedin_analize.txt`. |

### Projekto šaknis
| Failas | Paskirtis |
|--------|-----------|
| `README.md` | Projekto aprašas, struktūra, komandos |
| `TODO.md` | Dabartinės užduotys |
| `ROADMAP.md` | Plėtros planas |
| `CHANGELOG.md` | Versijų istorija |

---

## 3. Moduliai 7–8–9 (ateities turinys)

Produkcijoje **nėra** modulių 7–8–9. Šie dokumentai – planavimui ir būsimam turiniui.

| Failas | Paskirtis |
|--------|-----------|
| `docs/turinio_pletra_moduliai_7_8_9.md` | Turinio SOT moduliams 7–9 (planuojamas) |
| `docs/development/MODULIU_7_8_9_GILI_ANALIZE_VERDIKTAS.md` | Gili analizė ir verdiktas (2026-02-14) |
| `docs/MODULIO_7_SKAIDRIU_EILES.md` | Skaidrių eilė Moduliui 7; path-step ids 71.1–71.5, įterpimo vietos tarp teorijos (žr. SOT turinio_pletra_moduliai_7_8_9.md §8.2) |

Visi kiti **M7/M8/M9** analizės, planai ir ataskaitos – **docs/archive/moduliai_7_8_9/** (žr. `docs/archive/README.md`, lokaliai).

---

## 4. Archyvas – pasenę / neaktualūs

**Įspėjimas:** `docs/archive/` nėra repozitorijoje (.gitignore). Šie keliai tinka tik jei lokaliai turite archyvą; nauji nariai jo nemato.

Perkelta į **`docs/archive/`** (ir poaplankius, lokaliai). **Nenaudoti** kaip šaltinio tiesos – tik istorinei informacijai.

- **docs/archive/README.md** – sąrašas perkeltų failų ir priežastis (lokaliai).
- **docs/archive/development/DOKUMENTACIJOS_ARCHYVAVIMO_PLANAS.md** – archyvavimo planas (2026-03-02, lokaliai).
- **docs/archive/development/** – pasenę development planai, vienkartinės analizės (lokaliai).
- **docs/archive/development/M4_M5_M6_FINAL_QA_SUVESTINE.md** – finalizuota M4–M6 QA suvestinė (KISS-MARRY-KILL), lokaliai.
- **docs/archive/moduliai_7_8_9/** – M7/M8/M9 detalesnės analizės (lokaliai; verdictas lieka docs/).
- **docs/archive/root/** – failai perkelti iš projekto šaknies (lokaliai).

---

## 5. Greita taisyklė agentams

1. **Turinys / terminologija** → `turinio_pletra.md`, `docs/turinio_pletra_moduliai_4_5_6.md`, `docs/CONTENT_MODULIU_ATPAZINIMAS.md`.
2. **Dizainas / skaidrių išdėstymas** → `docs/development/GOLDEN_STANDARD.md`.
3. **Duomenys** → `src/data/*.json`, `src/data/hallucinationRates.ts`.
4. **Kas kokiam agentui / seka** → `docs/development/AGENT_ORCHESTRATOR.md`, `docs/development/PLAN_AGENTAI_DARBAI.md`.
5. **Klaidos / atsiliepimai** → `docs/VARTOTOJU_ATSILIEPIMAI_BENDRAS.md`, `docs/development/TEST_REPORT.md`.
6. **Jei abejoji** → pirmiausia **CODE_REVIEW_AGENT** (diagnozė) arba **CONTENT_AGENT** (reikalavimų sugryninimas). Neremti archyvuotais dokumentais.
