# M7 Journey Copy Registry — Tier 1 (RC-1)

> **Backlog:** M79-32  
> **Overlay:** `src/data/modules-journey-m7.json`  
> **Kodas:** `src/data/m7JourneyCopyRegistry.ts`  
> **Fallback:** `activeJourneyId` → `pardavimai` overlay → `modules.json` bazė

---

## 6 kelių signature (North Star)

| `journeyId`     | Signature                                             | Pagrindinis OUTPUT                |
| --------------- | ----------------------------------------------------- | --------------------------------- |
| `pardavimai`    | DI padeda skaičiuoti pardavimus ir prognozuoti        | KPI + tendencija + forecast       |
| `rinkodara`     | DI padeda suprasti kanalus, turinį ir reakcijas       | Sentimentas + kanalai + kampanija |
| `it-inzinerija` | DI padeda tvarkyti duomenis ir automatizuoti pipeline | Schema + valymas + ETL            |
| `personalas`    | DI padeda analizuoti žmones, ne tik skaičius          | Funnel + retention + pulse        |
| `vadyba`        | DI padeda priimti sprendimą su patikimu pagrindu      | Executive summary + rizika        |
| `kita`          | DI padeda su bet kokiais vidiniais duomenimis         | Universalūs `[X]` šablonai        |

---

## Tier 1 laukų registras (14 laukų × 6 keliai = 84)

### Skaidrė 731 — 4 analizės tipai

| fieldKey             | JSON kelias                    | Adaptacijos taisyklė                                                                                                                                                                        |
| -------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `types-descriptive`  | `content.sections[3].copyable` | Aprašomoji: KPI pagal kelią (pardavimai=produktai/regionai; rinkodara=kanalai/turinys; IT=duomenų apimtys; personalas=įdarbinimas/atskyrimas; vadyba=verslo rodikliai; kita=`[X]` metrikos) |
| `types-diagnostic`   | `content.sections[4].copyable` | Diagnostinė: „kodėl“ pagal kelią (pardavimai=kainos/sezonas; rinkodara=kampanijos/reakcijos; IT=duomenų kokybė; personalas=atskyrimas/įdarbinimas; vadyba=rizikos; kita=priežastys `[X]`)   |
| `types-predictive`   | `content.sections[5].copyable` | Nuspėjamoji: prognozė pagal kelią (pardavimai=Q4 pardavimai; rinkodara=reach/engagement; IT=apkrova/ETL; personalas=headcount; vadyba=scenarijai; kita=`[X]` tendencija)                    |
| `types-prescriptive` | `content.sections[6].copyable` | Nurodomoji: veiksmai pagal kelią (pardavimai=atsargos/kainos; rinkodara=budget/kanalai; IT=automatizacija; personalas=retention; vadyba=prioritetai; kita=3 veiksmai `[X]`)                 |

### Skaidrė 733 — Verslo analizės šablonai

| fieldKey               | JSON kelias                    | Adaptacijos taisyklė                                                                                                                                                              |
| ---------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `template-data`        | `content.sections[2].copyable` | Duomenų kūrimas: pardavimai=pardavimų eilutės; rinkodara=kampanijų duomenys; IT=logų/įvykių duomenys; personalas=HR įrašai; vadyba=KPI lentelė; kita=universalūs stulpeliai `[X]` |
| `template-competitors` | `content.sections[3].copyable` | Konkurentai: pardavimai=rinkos dalis; rinkodara=kanalų/turinio palyginimas; IT=stack/alternatyvos; personalas=talentų rinka; vadyba=strateginis SWOT; kita=`[X]` palyginimas      |
| `template-cfo`         | `content.sections[4].copyable` | CFO: pardavimai=EBITDA/marža; rinkodara=ROAS/CAC; IT=infra kaštai; personalas=žmogiškųjų išteklių kaštai; vadyba=finansinė rizika; kita=`[X]` finansinė apžvalga                  |

### Skaidrė 74 — MASTER PROMPTAS

| fieldKey        | JSON kelias                    | Adaptacijos taisyklė                                                                                                                                                                                                                           |
| --------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `master-prompt` | `content.sections[4].copyable` | 8 žingsnių pilna analizė: `[X]` tema ir rolė pagal kelią (pardavimai=duomenų analitikas pardavimams; rinkodara=rinkos analitikas; IT=duomenų inžinierius; personalas=HR analitikas; vadyba=strateginis analitikas; kita=universali rolė `[X]`) |

### Skaidrė 734 — Sprendimų filtrai

| fieldKey            | JSON kelias                    | Adaptacijos taisyklė                                                                                                                                               |
| ------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `filter-ok-fail`    | `content.sections[3].copyable` | OK/Fail: kontekstas pagal kelią (pardavimai=pardavimų duomenys; rinkodara=kampanijos; IT=pipeline; personalas=HR procesai; vadyba=sprendimo variantai; kita=`[X]`) |
| `filter-priority`   | `content.sections[4].copyable` | Prioritetai: užduotys/idėjos pagal kelią                                                                                                                           |
| `filter-quick-wins` | `content.sections[5].copyable` | Greiti laimėjimai: metrikos/problemos pagal kelią                                                                                                                  |
| `filter-portfolio`  | `content.sections[6].copyable` | Portfelis: variantai pagal kelią (produktai/kanalai/pipeline/rolės/sprendimai/`[X]`)                                                                               |

### Skaidrė 75 — Modulio santrauka

| fieldKey           | JSON kelias                | Adaptacijos taisyklė                                                                         |
| ------------------ | -------------------------- | -------------------------------------------------------------------------------------------- |
| `reflection`       | `content.reflectionPrompt` | Refleksija: 3 klausimai pritaikyti kelio kontekstui (pardavimai/rinkodara/IT/HR/vadyba/kita) |
| `first-action-24h` | `content.firstAction24h`   | 48h veiksmas: konkretus pirmas žingsnis pagal kelią                                          |

---

## Nekeisti (invariantai)

- `toolChoiceBar`, warm-up (731.5, 74.5), `pathBranch` (žr. `M7_VIZ_BRANCH_SPLIT.md`)
- M8 `relatedSlideId` taikiniai: 73, 74, 86, 92, 731, 732, 733, 891
- `modules.json` bazė — lieka pardavimų semantikos fallback

---

## Tier 2 dalinis (RC-2 parity banga) — 4 skaidrės × 4 laukai = 16 × 6 = 96

| Skaidrė | fieldKey             | JSON kelias                    |
| ------- | -------------------- | ------------------------------ |
| 73      | `pipeline-overview`  | `content.sections[3].copyable` |
| 732     | `sentiment-prompt`   | `content.sections[2].copyable` |
| 78      | `di-role-prompt`     | `content.sections[3].copyable` |
| 78.5    | `excel-clean-prompt` | `content.sections[2].copyable` |

**LT overlay:** `modules-journey-m7.json`  
**EN overlay:** `modules-journey-en-m7.json` (AI, ne DI)

---

## Tier 2 likę (RC-4 / M79-35) — 8 skaidrės × 1 laukas × 6 = 48

| Skaidrė | fieldKey          | JSON kelias                    |
| ------- | ----------------- | ------------------------------ |
| 83      | `role-activation` | `content.sections[2].copyable` |
| 84      | `db-structure`    | `content.sections[3].copyable` |
| 86      | `viz-prompt`      | `content.sections[2].copyable` |
| 87      | `forecast-prompt` | `content.sections[2].copyable` |
| 89      | `algo-sources`    | `content.sections[3].copyable` |
| 891     | `prep-clean`      | `content.sections[2].copyable` |
| 90      | `eda-stats`       | `content.sections[2].copyable` |
| 92      | `bi-plan`         | `content.sections[2].copyable` |

Authoring: `scripts/journey-lt-tier2-remaining.json` / `journey-en-tier2-remaining.json`

---

## Path-step (RC-4 / M79-36) — 5 × 1 × 6 = 30

| Skaidrė   | fieldKey    | JSON kelias                    |
| --------- | ----------- | ------------------------------ |
| 71.1–71.5 | `step-task` | `content.sections[0].copyable` |

Resolver: `applyJourneyOverlayToPathStep()` → `SlideContent` `path-step`.  
Authoring: `scripts/journey-lt-pathstep.json` / `journey-en-pathstep.json` + `patch-m7-pathstep-tasks.mjs`

---

## EN overlay (M79-37)

- Tier 1: 84 variantai (`731`, `733`, `74`, `734`, `75`)
- Tier 2 dalinis: 24 variantai (`73`, `732`, `78`, `78.5`)
- Tier 2 likę: 48 variantai (`83`…`92`)
- Path-step: 30 variantai (`71.1`…`71.5`)
- Resolver: `resolveJourneyCopy.ts` — `locale: 'lt' | 'en'`
- Gate: `audit:m7-journey-coverage` (+ `:en`) — 31 fields × 6

## Optional RC-1 stretch

- `731` `sections[0].body` (Kam tai?) — ne blokuoja release
- Sk. 89/90 likę copyable (ne primary) — P3 stretch
