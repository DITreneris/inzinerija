# Microcopy QA — DS v0.2 E6 (2026-05-19)

> **Tikslas:** Pažymėti galimas perteklinio teksto vietas. **Jokių JSON / locale pakeitimų** šiame etape.  
> **SOT kriterijai:** `docs/development/GOLDEN_STANDARD.md` §4.4 (trumpi sakiniai ~20 žodžių; content-block sekcijoje max 2 eilutės body).  
> **Agentas vėlesniam darbui:** CONTENT_AGENT (`docs/development/PAPRASTOS_KALBOS_GAIRES.md`).

**Audito komandos:**

```bash
node scripts/audit-footer-length.mjs
node scripts/audit-microcopy-content-blocks.mjs 1,4,6
```

---

## Footers >55 simbolių (E6.1)

**Šaltinis:** `node scripts/audit-footer-length.mjs` ant `src/data/modules.json` (2026-05-19).

**Rezultatas:** Visi „Toliau – skaidrė N“ / „Next – slide N“ footeriai **≤55 simbolių** — **radinių nėra**.

---

## M1 — pertekliniai tekstai (E6.2)

**Kriterijus:** content-block `sections[].body` >20 žodžių (`audit-microcopy-content-blocks.mjs`).  
**Pastaba:** M1 daugelyje blokų „Kodėl tai veikia“ collapsible sekcijos — ilgesnis tekstas sąmoningas; backlog sprendimui ar sutrumpinimui.

| Skaidrė ID | Skaidrės pavadinimas | Sekcijos heading    | ~žodžiai | Lokacija / preview (pradžia)                                        |
| ---------- | -------------------- | ------------------- | -------- | ------------------------------------------------------------------- |
| 8          | Mąstymo modeliai     | Kodėl tai veikia    | 43       | `reasoning-models` — „DI ne „mąsto“ savarankiškai kaip žmogus…“     |
| 11         | Advanced Parameters  | Kodėl tai veikia    | 31       | `advanced` — Temperature / reasoning gylis paaiškinimas             |
| 9          | Reasoning blokas     | Kodėl tai veikia    | 30       | `reasoning` — CoT / ToT sekos paaiškinimas                          |
| 10         | Quality Control      | Kodėl tai veikia    | 29       | `quality` — kokybės kriterijų paaiškinimas                          |
| 14         | Prompting technikos  | (įvairios sekcijos) | 22–28    | Kelios sekcijos viršija 20 žodžių — žr. pilną JSON skaidrė `id: 14` |

**Išvada M1:** ≥4 įrašai; prioritetas — sutrumpinti „Kodėl tai veikia“ body ar palikti tik collapsible santrauką (v0.3).

---

## M4 — pertekliniai tekstai (E6.2)

| Skaidrė ID | Skaidrės pavadinimas | Sekcijos heading                              | ~žodžiai | Lokacija / preview (pradžia)                 |
| ---------- | -------------------- | --------------------------------------------- | -------- | -------------------------------------------- |
| 43         | (teorija)            | 🔽 Nori suprasti detaliau?                    | 112      | Ilgas collapsible body — terminai / grandinė |
| 61         | (įrankiai)           | Patarimai kaip naudoti                        | 104      | Ilgas instrukcijų blokas                     |
| 39         | (terminai)           | 🔽 Terminai (1): DI, mašininis mokymasis      | 103      | Terminų blokas 1                             |
| 48         | (įvadas)             | 1️⃣ Trumpai (30 s)                             | 90       | Intro „Trumpai“ sekcija                      |
| 59         | (duomenys)           | Oficialūs atviri duomenų šaltiniai – 3 blokai | 82       | Šaltinių aprašymas                           |
| 39         | (terminai)           | 🔽 Terminai (2): Gilusis mokymasis…           | 78       | Terminų blokas 2                             |
| 43         | (teorija)            | 2️⃣ Sudaryk grandinę ir gauk įgyvendinimą      | 76       | Workflow instrukcijos                        |
| 65         | (šablonai)           | 🔽 Nori suprasti detaliau? (3 šablonai)       | 76       | Collapsible šablonų blokas                   |

**Išvada M4:** 8+ įrašai; daugiausia collapsible „Terminai“ / „Nori suprasti detaliau?“ — vertinti ar skaidyti į 2 eilutes + „Daryk dabar“ (v0.3).

---

## M6 — pertekliniai tekstai (E6.2)

| Skaidrė ID | Skaidrės pavadinimas      | Sekcijos heading                               | ~žodžiai | Lokacija / preview (pradžia)              |
| ---------- | ------------------------- | ---------------------------------------------- | -------- | ----------------------------------------- |
| 68         | (projektas)               | Prieš kurdami: konteksto inžinerijos schema    | 93       | Ilgas paruošiamasis blokas prieš praktiką |
| 64         | Projektas / dokumentacija | 3. Dokumentacija                               | 37       | Projektų gairės punktas                   |
| 64         | Projektas / dokumentacija | 2. Promptų versijavimas                        | 35       | Projektų gairės punktas                   |
| 64         | Projektas / dokumentacija | 4. Procesai                                    | 35       | Projektų gairės punktas                   |
| 64         | Projektas / dokumentacija | 1. Asmeninė promptų biblioteka                 | 32       | Projektų gairės punktas                   |
| 64         | Projektos / dokumentacija | 5. Duomenų rinkiniai                           | 32       | Projektų gairės punktas                   |
| 64         | Projektas / dokumentacija | Pagalbinis promptas: duomenų tvarkymo sistemos | 30       | Copy blokas                               |
| 67.8       | (pavyzdžiai)              | Pavyzdžiai iš praktikos                        | 29       | Pavyzdžių sekcija                         |

**Išvada M6:** ≥8 įrašai; prioritetas skaidrė **68** (93 žodžiai) ir **64** kelių punktų sutrumpinimas.

---

## Santrauka

| Modulis | Footer >55 | Body >20 žodžiai (content-block)          |
| ------- | ---------- | ----------------------------------------- |
| M1      | OK         | 4+ įrašai (daugiausia „Kodėl tai veikia“) |
| M4      | OK         | 8+ įrašai (collapsible / terminai)        |
| M6      | OK         | 8+ įrašai (projekto gairės)               |

**Kitas žingsnis (v0.3):** CONTENT_AGENT peržiūri sąrašą; sprendimai — sutrumpinti, skaidyti į Trumpai/Daryk dabar/Patikra, ar palikti collapsible su trumpesniu preview.
