# Modulio 16–18 skaidrių eilė (oficiali)

> **Paskirtis:** Kodo inžinerijos kelio (M16 planavimas → M17 testas → M18 projektas) skaidrių seka.  
> **SOT:** `docs/turinio_pletra_moduliai_16_17_18.md`. Atpažinimas: `docs/CONTENT_MODULIU_ATPAZINIMAS.md` §6.  
> **Backlog:** `docs/development/16_17_18_backlog.md` (`M1618-F*` done; ritmas `M1618-R*`).  
> **UI:** content-block + process Shell + path-step checkpoints + section-break/warm-up ritmas; lab on 16.15; soft DoD path-step on 18.23.  
> **Alias:** M16 `01_MVP_BRIEF.md` = M18 PACKET `mvp_brief.md` (tas pats artefaktas).

---

## Pilna seka (Modulis 16) – D1 + D2 · 22 sk.

**Biudžetas:** ~18–22 (ši versija = **22** po `M16-PLAIN-C`). D1 = 160 + 16.2–16.8 + 16.25 + 16.85 (10). D2 = 16.101–16.22 su 16.205 warm-up (12). Merge: 16.12+16.13 → 16.12; 16.18+16.19 → 16.18; **16.9 → 16.85** (PLAIN-C).

| Eilė | ID                          | Skaidrė / tema                      | Tipas hint    | Kodėl čia?                                                    |
| ---- | --------------------------- | ----------------------------------- | ------------- | ------------------------------------------------------------- |
| 0    | 160                         | Modulio 16 įvadas – Kodo inžinerija | action-intro  | whyBenefit SOT §1.4; hook; firstActionCTA; pažadas iš 16.1    |
| 1    | 16.2                        | Ką šiandien padarysi                | content-block | 1+1+1 + greitas testas                                        |
| 1a   | **16.25**                   | Stack žemėlapis – ką naudosime      | content-block | LENTELIU stack roles (ne įrankių mugė); prieš proceso         |
| 2    | 16.3                        | Proceso schema                      | content-block | PROBLEMA → … → TESTAS (process Shell)                         |
| 3    | 16.4                        | Problema prieš sprendimą            | content-block | Blogas\|Geras                                                 |
| 4    | 16.5                        | Problemos formulė                   | content-block | Formulė + tikrinimo klausimai                                 |
| 5    | 16.6                        | Vertė ≠ funkcija                    | content-block | Pokytis vs veiksmas                                           |
| 6    | 16.7                        | MVP apimtis (triage)                | content-block | Būtina / Galima / Nekuriame                                   |
| 7    | 16.8                        | Praktika: kūrimo kortelė            | **path-step** | **MUST** 5 laukai; pažymėk kai užrašyta (1/1)                 |
| 8    | **16.85**                   | Kortelė paruošta – į brief          | section-break | D1→D2 breath + checklist (PLAIN-C; 16.9 deleted); `M1618-R1`  |
| 9    | **16.101** (tema **16.10**) | Vibe → Skeleton → Refinement        | content-block | VSR process Shell; id 16.101 dėl JSON `16.10`≡`16.1`          |
| 10   | 16.11                       | Produkto sakinys                    | content-block | Formulė                                                       |
| 11   | 16.12                       | Trys atramos + kritika (Prieš/Po)   | content-block | Merge 16.12+16.13; Skeptikas copyable                         |
| 12   | 16.14                       | Trys kryptys A/B/C                  | content-block | Lentelė (ne lab)                                              |
| 13   | 16.15                       | Rinkis patikrinamiausią             | content-block | Lab primary; score lentelė antrinė / collapsible (`M1618-R2`) |
| 14   | 16.16                       | Naudotojo ciklas                    | content-block | Triggeris→…→Kitas                                             |
| 15   | 16.17                       | Ekranai iš srauto                   | content-block | Max 3–5                                                       |
| 16   | 16.18                       | Ribos + Now–Next–Later              | content-block | Brief labels + NNL (vs 16.7 LT zones); Must≤4                 |
| 17   | **16.201** (tema **16.20**) | Rizikos (thin)                      | content-block | 3 + mažinimas; id 16.201 dėl JSON `16.20`≡`16.2`              |
| 18   | **16.205**                  | Savitikra prieš brief               | warm-up-quiz  | 2–3 unscored prieš 16.21 (`M1618-R1`)                         |
| 19   | 16.21                       | Praktika: `01_MVP_BRIEF.md`         | content-block | **MUST** 11 laukų; Brief copyable + embeds                    |
| 20   | 16.22                       | Modulio 16 santrauka                | summary       | CTA → M17; abilityBefore/After                                |

### D1 artefaktas – kūrimo kortelė (16.8)

```text
1. Naudotojas:
2. Problema:
3. Kuriama vertė:
4. Pagrindinė funkcija:
5. Kaip suprasime, kad prototipas veikia:
```

### D2 artefaktas – `01_MVP_BRIEF.md` (16.21) – 11 laukų

1. Produkto sakinys · 2. Problema · 3. Tikslinis naudotojas · 4. Vertės pažadas · 5. Pagrindinis naudotojo ciklas · 6. MVP ribos (Must/Should/Won’t) · 7. Pagrindiniai ekranai (≤5) · 8. Duomenys (high-level) · 9. Dabar→Toliau→Vėliau · 10. 3 rizikos · 11. Sėkmės kriterijus

### M16 WON’T (eilėje neatidaryti)

DT/Lean/Agile teorija · Cursor build · ERD · Git/deploy · auth/mokėjimai kaip pirmo MVP branduolys · Q2–Q4 roadmap.

---

## Modulis 17 (testas) – Path Test shell

Path Test Contract (`GOLDEN_STANDARD.md` §3.4a1) – lukštas kaip M14. Domain stuburas = planavimas / brief (SOT §3.1), **ne** coding / DB / deploy.

| Eilė | ID    | Skaidrė / tipas       | Kodėl čia?                                               |
| ---- | ----- | --------------------- | -------------------------------------------------------- |
| 0    | 170   | test-intro            | whyBenefit §1.4; ≥70% soft CTA → M18; **11** graded      |
| 0a   | 170.5 | warm-up-quiz          | 3 unscored: 1+1+1; vertė≠fn; forward bridge → M18 PACKET |
| 1    | 171   | test-section          | Temų bankas žemiau; remediation `relatedSlideId` → M16   |
| 2    | 172   | test-results          | useCaseBlock – „Kitas žingsnis: Modulis 18“              |
| 3    | 173   | content-block (bonus) | Optional: brief checklist 5 min prieš M18                |

### M17 temos × klausimų tipai (SOT §3.1)

| Tema                      | Tipas                                    | relatedSlideId (hint) |
| ------------------------- | ---------------------------------------- | --------------------- |
| 1+1+1 MVP                 | Geriausia formulė / blogas startas       | 16.2                  |
| Vertė ≠ funkcija          | Klasifikuok                              | 16.6                  |
| Triage                    | Būtina / Nekuriame                       | 16.7                  |
| VSR tvarka                | Surikiuok                                | 16.10                 |
| Brief kokybė              | Ko trūksta                               | 16.21                 |
| Ciklas vs feature list    | UX aprašas                               | 16.16                 |
| Per anksti (M18)          | Redis/AWS/10 ekranų                      | 16.18                 |
| Kontekstas prieš generate | Rules/PACKET vs „sukurk app“             | 16.21 → M18           |
| Diff prieš commit         | Trūkstamas žingsnis (`m17-q11` → 18.201) | 18.201                |
| Auth/Stripe/MCP vs ribos  | Per anksti                               | 16.18                 |

---

## Modulis 18 (projektas) – Blokas A → B → C · 28 sk.

**Biudžetas:** ~22–28 (ši versija = **28** = max). Max **1** refresh skaidrė (18.05). Pjauti D1/D2 overlap. Block B owns smoke/debug; Block C neperpasakoja smoke teorijos. Mid-A warm-up = `18.55`; A→B breath = `18.125`.

| Eilė | ID                          | Skaidrė / tema                 | Tipas hint     | Blokas | Kodėl čia?                                    |
| ---- | --------------------------- | ------------------------------ | -------------- | ------ | --------------------------------------------- |
| 1    | 180                         | Modulio 18 įvadas – projektas  | practice-intro | —      | whyBenefit §1.4; PACKET + soft DoD            |
| 2    | 18.05                       | Refresh: brief → PACKET        | content-block  | A      | **Vienintelis** 1+1+1/brief refresh           |
| 3    | 18.1                        | Kodėl ne visa app              | content-block  | A      | Chaosas vs kontrolė (2 kol.)                  |
| 4    | 18.2                        | Anti-pavyzdys                  | content-block  | A      | Task Manager + Redis/Auth/Stripe              |
| 5    | 18.3                        | User flow                      | content-block  | A      | 5–7 žingsniai + klaidos                       |
| 6    | 18.4                        | Minimalūs duomenys             | content-block  | A      | 2–4 esybės; ne SQL kursas                     |
| 7    | 18.5                        | Build brief (6 laukai)         | content-block  | A      | intent · acceptance · constraints             |
| 8    | 18.6                        | `PROJECT_RULES.md`             | content-block  | A      | Copyable 8–12 eil.                            |
| 9    | 18.7                        | Cursor vertikalus pjūvis       | content-block  | A      | Copyable; viena fn                            |
| 10   | 18.8                        | Planas → patvirtinimas → kodas | content-block  | A      | Planas prieš kodą copyable                    |
| 11   | **18.55**                   | Savitikra: planas prieš kodą   | warm-up-quiz   | A      | Mid-A breath; streak ≤8 (`M1618-R3+`)         |
| 12   | 18.9                        | Composer vs Chat               | content-block  | A      | Viena mintis; ne mastery kursas               |
| 13   | **18.101** (tema **18.10**) | Iteracijos ciklas              | content-block  | A      | Process Shell; id 18.101 dėl JSON             |
| 14   | 18.11                       | Klaidos promptas               | content-block  | A      | Blogas\|Geras; Klaidos kontekstas copyable    |
| 15   | 18.12                       | Praktika: BUILD PACKET         | content-block  | A      | Failų checklist                               |
| 16   | **18.125**                  | PACKET paruoštas – higiena     | section-break  | —      | A→B breath (`sectionNumber: A→B`); `M1618-R3` |
| 17   | 18.13                       | Kodas ≠ produktas              | content-block  | B      | Žmogus tikrina                                |
| 18   | 18.14                       | 3 vibe-debt spąstai            | content-block  | B      | Lentelė                                       |
| 19   | 18.15                       | 5 rizikos (nav)                | content-block  | B      | Deps→…→Deploy                                 |
| 20   | 18.16                       | Smoke + kritinis kelias        | **path-step**  | B      | Smoke checklist checkpoint (`M1618-R6`; 1/2)  |
| 21   | 18.17                       | Edge + `.env`                  | content-block  | B      | Normalu/Riba/Klaida; nerodyk rakto            |
| 22   | 18.18                       | Debug: 1 pakeitimas            | content-block  | B      | Process                                       |
| 23   | 18.19                       | Paleidimo vartai               | content-block  | B      | VEIKIA→…→STEBIMA                              |
| 24   | **18.201** (tema **18.20**) | Git sauga + diff ritualas      | content-block  | C      | status→**diff**→smoke→commit→push; id 18.201  |
| 25   | 18.21                       | Deploy-ready checklist         | content-block  | C      | README, gitignore, env.example                |
| 26   | 18.22                       | Publish (platform-agnostic)    | content-block  | C      | Ne Heroku-only                                |
| 27   | 18.23                       | Soft DoD + proof               | **path-step**  | C      | Soft DoD checklist (2/2 su 18.16); `M1618-R3` |
| 28   | 18.24                       | Modulio 18 santrauka           | summary        | —      | Transfer; firstAction24h; own-work            |

### BUILD PACKET failai (18.12)

```text
mvp_brief.md      ← alias 01_MVP_BRIEF.md (iš M16 / atnaujintas)
user_flow.md
schema.dbml       ← optional; arba lentelė brief’e
build_prompt.md   ← Cursor-first
PROJECT_RULES.md
```

### Soft DoD (18.23) – SOT §4.4

GitHub + commit’ai · `.gitignore` · README · `PROJECT_RULES.md` · ≥1 kritinės fn patikra · viešas URL **arba** lokalus proof · 1 pataisyta problema · rollback mintis.

### M18 WON’T (eilėje neatidaryti)

SysEng · Heroku-only · blue-green · coverage 80% · MCP/Spec Kit privaloma · multi-agent mastery · Composer kursas · antras pilnas smoke kursas.

---

## Ritmas tickets (`M1618-R*`)

| ID           | Kas                                                               | Status |
| ------------ | ----------------------------------------------------------------- | ------ |
| **M1618-R1** | M16: `16.85` section-break + `16.205` warm-up                     | done   |
| **M1618-R2** | `16.15` lab-primary; score lentelė antrinė                        | done   |
| **M1618-R3** | M18: `18.55` warm-up + `18.125` section-break + `18.23` path-step | done   |
| **M1618-R4** | `16.8` → path-step kūrimo kortelė                                 | done   |
| **M1618-R5** | QA / EN / footers / CHANGELOG                                     | done   |
| **M1618-R6** | Stretch: `18.16` → path-step smoke (1/2)                          | done   |

---

## Trumpos taisyklės

- **160 / 170 / 180** – intro tipai su whyBenefit iš SOT §1.4.
- Curriculum ID (`16.8`, `18.12`) – **tik** navigacijoje; learner body be ID spill (F4).
- Canonical pavyzdys: dienos prioritetų įrankis (ne vienintelė idėja).
- Kreipinys **tu**; **DI** (ne AI); „promptas“ be apostrofų.
- Unlock: M16 po M6 (`unlocksAfter: 6`); M17 po 16; M18 po 17 — soft kaip kiti keliai.
- Core profiliai `*-m1-m15` **be** M16+ spill; corporate18 = Wave D3.
- Nauji tipai tik reuse: `section-break` / `warm-up-quiz` / `path-step` — be Feature Doc.

---

## Footer skaičiai (F4/F5 + ritmas)

M16: **22** skaidrių (eilė 0…21). M17: 5. M18: **28** (eilė 1…28). Atnaujinant eilę – sinchronizuoti footers §3.6.
