# Auditas: M1–9 LT/EN kalbos kokybė (2026-06)

> **Profilis:** vienas Production build (`npm run build:production`, `VITE_MAX_BUILD_MODULE=9`) → runtime `modules-m1-m9.json`.
> **Fokusas:** M4–9 (gilus); M1–3 (lengva regresija – neseniai taisyti / gyvai testuoti).
> **Agentai:** CODE_REVIEW (diagnozė) → CONTENT → DATA → CODING → QA.
> **Šaltinis:** [PAPRASTOS_KALBOS_GAIRES.md](../PAPRASTOS_KALBOS_GAIRES.md) §4 (LT=Tu, DI; EN=AI, you), [RELEASE_QA_CHECKLIST.md](../RELEASE_QA_CHECKLIST.md) §5.

## Severity skalė

- **P0** – release blocker: EN locale rodo LT body; schema fail; broken merge; DI/AI klaida hero/CTA.
- **P1** – Tu/Jūs vartotojo instrukcijose; EN hybrid token; trūkstamas EN slide stub.
- **P2** – SOT lag; stilistika; žargonas be paaiškinimo; pavienis standalone „AI“ LT aprašyme.

---

## 0. Bazinė linija (deterministiniai vartai)

| Vartas                  | Komanda                                                           | Rezultatas                                    |
| ----------------------- | ----------------------------------------------------------------- | --------------------------------------------- |
| Schema                  | `npm run validate:schema`                                         | OK                                            |
| EN coverage M7–9 (lean) | `npm run audit:en-coverage-m7-m9`                                 | OK (M7=51, M8=5, M9=22)                       |
| EN coverage M7–9 (full) | `node scripts/audit-en-coverage-m7-m9.mjs --full`                 | OK                                            |
| EN language M7–9        | `npm run audit:en-language-m7-m9`                                 | OK (0 violations)                             |
| Footer M4–9             | `AUDIT_MODULES=4,5,6,7,8,9 node scripts/audit-footer-numbers.mjs` | OK                                            |
| Footer visi (M10–12)    | `node scripts/audit-footer-numbers.mjs`                           | FAIL: M12 pos 3 (id 120.5) – **ne 1–9 scope** |
| Testai                  | `npm run test:run`                                                | OK (48 files / 292 tests)                     |

**Nauji vartai (šis auditas):**

| Vartas           | Komanda                           | Rezultatas (prieš taisymą / po)    |
| ---------------- | --------------------------------- | ---------------------------------- |
| EN coverage M4–6 | `npm run audit:en-coverage-m4-m6` | FAIL (M4 diakritikų likučiai) → OK |
| EN language M4–6 | `npm run audit:en-language-m4-m6` | FAIL (10 EN + 1 LT) → OK           |
| Bendras M4–9     | `npm run audit:m49`               | FAIL → OK                          |

Nauji failai: [`scripts/audit-en-coverage-m4-m6.mjs`](../../../scripts/audit-en-coverage-m4-m6.mjs), [`scripts/audit-en-language-m4-m6.mjs`](../../../scripts/audit-en-language-m4-m6.mjs). Bendros taisyklės ([`scripts/lib/m79-language-rules.mjs`](../../../scripts/lib/m79-language-rules.mjs)) išplėstos į M1–9: `auditLtString` nebeapribota M7–9; pridėti LT-žodžių šablonai (Rezultatas, Kada naudoti, Metodinis/Agentinis promptas); LT „DI (AI)“ gloss leidžiamas.

---

## 1. M4–6 (gilus)

### 1.1 EN overlay LT likučiai (`modules-en-m4-m6.json`)

Visi M4; deep-merge praleido šiuos raktus, todėl EN locale rodė LT tekstą:

| Slide | Path                                               | LT likutis               | EN taisymas        | Severity |
| ----- | -------------------------------------------------- | ------------------------ | ------------------ | -------- |
| 43    | `sections[2].workflowChains[5].flow[0]`            | `Promptas`               | `Prompt`           | P1       |
| 54    | `sections[2].table.headers[1]`                     | `Metodinis promptas`     | `Method prompt`    | P1       |
| 54    | `sections[2].table.headers[2]`                     | `Agentinis promptas`     | `Agentic prompt`   | P1       |
| 54    | `sections[2].table.rows[2][0]`                     | `Įrankiai`               | `Tools`            | P1       |
| 54    | `sections[2].table.rows[3][0]`                     | `Rezultatas`             | `Result`           | P1       |
| 54    | `sections[2].table.rows[4][0]`                     | `Kada naudoti`           | `When to use`      | P1       |
| 61    | `sections[3].heading` + `body` (trūko EN sekcijos) | LT „Kur dar pritaikyti?“ | pridėta EN sekcija | P1       |

### 1.2 LT Tu/DI (modules.json M4–6)

| Slide | Path                | Rule                | LT taisymas                                | Severity |
| ----- | ------------------- | ------------------- | ------------------------------------------ | -------- |
| 60    | `sections[10].body` | `lt_uses_AI_not_DI` | „NoteLM – **AI** užrašų“ → „**DI** užrašų“ | P2       |

LT Tu-kreipinys M4–6: švarus (nėra `jūsų`/`galite`/`Paspauskite`/`Įrašykite`). Targeted `-kite` imperatyvai (tooltipai „Įkelkite“ 2573, „Įjunkite“ 3466) – nepatenka į projekto Tu-rule apimtį, paliekami kaip stilistinis P2 (neblokuoja).

### 1.3 Rankinė smoke (RELEASE_QA §5d/§5f) — reikia žmogaus/naršyklės

- [ ] M4 sk. 56 (RAG): navigacija, tabai, kopijavimas
- [ ] M5 PDF, M6 PDF
- [ ] M4 section-break spinoff (ecosystem)

---

## 2. M7–9 (gilus)

### 2.1 EN coverage + kalba (automatinis)

`audit:m79` – OK (0 violations) tiek lean+expansion, tiek `--full` (production) režime. Coverage: M7=51, M8=5, M9=22 (full).

### 2.2 LT Tu/DI + paprasta kalba

`auditLtModules([7,8,9])` – 0 targeted findings (nėra `jūsų`/`galite`/`Paspauskite`/`Įrašykite`/standalone `AI`).

| Slide             | Path                    | Pastaba                                                           | Severity        |
| ----------------- | ----------------------- | ----------------------------------------------------------------- | --------------- |
| M9 9194/9306/9487 | `placeholder`           | „Aprašykite/Įklijuokite“ – `-kite` imperatyvai (ne targeted rule) | P2 (neblokuoja) |
| M7 ~7999          | haliucinacijų principai | „prašykite/kryžminkite/leiskite“ – tas pats                       | P2 (neblokuoja) |

### 2.3 Rankinė smoke — reikia žmogaus/naršyklės

- [ ] M7 slide 70 journey EN, `pathBranch` navigacija
- [ ] M8 test klausimai EN
- [ ] M9 workflow 93–94, hub 99

### 2.4 Follow-up sweep (2026-06-30)

Po rankinio EN UI bug'o skaidrėje 86 išplėstas M7–9 auditas, nes senas `audit:m79` neaptiko ASCII LT likučių be diakritikų. Naujos taisyklės gaudo `en_lt_token`, `en_broken_phrase` ir `en_lt_heading`.

| Patikra                                                             | Rezultatas |
| ------------------------------------------------------------------- | ---------- |
| `node scripts/audit-en-language-m7-m9.mjs --full --json` po taisymo | 0 findings |
| Grep sweep `modules-en-m7-m9.json` pagal hybrid tokenų sąrašą       | 0 matches  |
| `src/data/__tests__/m79EnLanguageAudit.test.ts`                     | 6/6 passed |

Pataisyta:

- **M7 EN:** skaidrės 85, 861, 87, 88, 89, 891, 90, 91, 94, 75 ir likę `🔽 Nori suprasti detaliau?` heading'ai – pilna EN kopija, placeholderiai suderinti (`[DATA]`, `[PASTE]`).
- **M9 EN:** slide 90 intro (`taskOneLiner`, `useCaseBlock`) – pilna EN, be LT fragmentų.
- **LT Tu:** M9 scenarijų 103/105/109 placeholderiai ir M7 haliucinacijų savitikros paaiškinimas perrašyti į Tu formą.

---

## 3. M1–3 (lengva regresija)

| Patikra                                        | Rezultatas                                                                                     |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| M3 Tu (slide 30–38)                            | OK – 0× `Pradėkite`/`Surinkite`/`Sukurkite`                                                    |
| LT targeted (M1–3)                             | 0 (po citatų skip pataisos; vienas „AI“ buvo tyrimo straipsnio pavadinimas `sources[1].title`) |
| EN M1–3 (`modules-en.json`)                    | OK – 0 EN merged findings                                                                      |
| Locale paritetas lt/en.json                    | OK – 1020/1020 raktų, 0 trūkstamų abiem kryptim                                                |
| M1 slide 12 motivation (`Panaudokite`)         | **Pataisyta** → `Panaudok … sukurk` (suderinta su Tu broliais)                                 |
| `lt.json` `m5IntroBodyDefault` (mišrus Jūs/Tu) | **Pataisyta** → `Tu ką tik atlikai … sukūrei`                                                  |

---

## 4. Backlog (prioritetizuotas)

### P0

Nėra. Schema, merge, EN coverage – švaru.

### P1 — visi pataisyti šiame auditе

- [x] `modules-en-m4-m6.json` M4 slide 43 `flow[0]` → `Prompt`
- [x] `modules-en-m4-m6.json` M4 slide 54 lentelė (headers + 3 eilučių etiketės) → EN
- [x] `modules-en-m4-m6.json` M4 slide 61 – pridėta trūkstama 4-a EN sekcija (anksčiau LT leak per deep-merge)
- [x] `src/locales/lt.json` `m5IntroBodyDefault` – mišrus Jūs/Tu → Tu

### P2 — pataisyti / palikti

- [x] `modules.json` M4 slide 60 `body` – „NoteLM – AI“ → „DI“ (LT terminologija)
- [x] `modules.json` M1 slide 12 `motivation` – Jūs-imperatyvai → Tu
- [x] M7–9 P2 `-kite` imperatyvai iš šio audito scope pataisyti: M9 103/105/109 placeholderiai ir M7 haliucinacijų savitikros paaiškinimas.
- [ ] (palikta, neblokuoja) M4 2573/3466 tooltipų `-kite` imperatyvai – ne M7–9 sweep scope.

### Manual smoke (reikia žmogaus/naršyklės)

- M4 sk. 56 (RAG), M5/M6 PDF, M4 ecosystem spinoff (RELEASE_QA §5d/§5f)
- M7 journey EN, M8 test EN, M9 workflow 93–94 / hub 99 (§5c)

### Iš scope išėmus

- M10–12 EN (`audit:en-coverage-m10-12`) – ne Production 1–9 profilis. Pastaba: `audit-footer-numbers.mjs` be `AUDIT_MODULES` rodo M12 (id 120.5) footer neatitiktį – atskira M10–12 užduotis.

---

## 5. Būsena (Definition of Done)

- [x] M4–9 100% automatinis scan (`audit:m49`) + M1–3 regresija
- [x] `audit:m46` (naujas) ir `audit:m79` – exit 0 (0 violations); jokio allowlist neprireikė
- [x] Visi P0/P1 + clear P2 ištaisyti (žr. §4); likę P2 (`-kite` placeholderiuose) – dokumentuoti, neblokuoja
- [x] Po pataisymų: `validate:schema` OK, `generate:core-data` OK, `lint` OK, `test:run` 292/292 + naujas `m46EnLanguageAudit` 3/3
- [x] `CHANGELOG.md` Unreleased – audit tooling + fix įrašai; `RELEASE_QA_CHECKLIST.md` §5c + `AGENTS.md` validation table atnaujinti

**Regresijos apsauga:** [`src/data/__tests__/m46EnLanguageAudit.test.ts`](../../../src/data/__tests__/m46EnLanguageAudit.test.ts) (mirror M7–9) – fiksuoja, kad M4–6 EN overlay lieka be LT liekanų.
