# Versijavimo analizė – ar galima identifikuoti ir keisti versiją?

> **Data:** 2026-03-12  
> **Klausimas:** Ar kodo bazėje galima vienareikšmiškai identifikuoti versiją ir ją pakeisti, ar dar per anksti?

---

## 1. Kur versija nustatyta

| Vieta | Dabartinė reikšmė | Paskirtis |
|-------|-------------------|-----------|
| **package.json** | `"version": "1.2.0"` | NPM/projekto versija; vienintelis vieta, kurią build/tools gali skaityti automatiškai. |
| **CHANGELOG.md** | `[Unreleased]` viršuje; `## [1.2.0] – 2026-02-11` toliau | Žmogaus skaitomas release istorija; Semver + Keep a Changelog. |
| **progress.ts** | `CURRENT_SCHEMA_VERSION = 2` | Tik localStorage progreso schema (v1 vs v2), ne produkto versija. |
| **Kiti doc** | Pvz. „Versija 1.0“, „GOLDEN_STANDARD 2.3.5“ | Dokumentų ar modulių vidinė versija, ne release versija. |

**Išvada:** Versiją galima vienareikšmiškai identifikuoti: **produkto release versija = `package.json` `version`**. CHANGELOG tik atspindi, kas į kokią versiją įeina.

---

## 2. Dabartinė būsena

- **Release versija:** **1.2.0** (atitinka CHANGELOG `[1.2.0] – 2026-02-11`).
- **Nepaskelbta (Unreleased):** 2026-03-12 pakeitimai:
  - Deploy inzinerija (base path, repo nuorodos)
  - PNG vaizdai po deploy (BASE_URL)
  - EN UI (AdvancedBlockSlide, prompt-template)
  - Sticky nav (ResizeObserver, ModuleView)
  - Modulis 5 / slide 47, mobile nav, lazy retry
  - ResizeObserver testų mockas, AppNav apsauga
  - Gold Legacy Standard doc

Tai – **minor** pakeitimai (nauja funkcija, pataisymai, jokio breaking change). Pagal Semver tinkamas žingsnis būtų **1.2.0 → 1.3.0**.

---

## 3. Ar galima pakeisti versiją dabar?

**Taip – techniškai galima.**

- Versija aiškiai apibrėžta `package.json`.
- CHANGELOG jau paruoštas: pakanka įvesti naują release bloką ir perkelti į jį „Unreleased“ turinį.
- Semver taisyklės laikomasi; 1.3.0 atitiktų dabartinius pakeitimus.

**Procedūra, jei sprendi daryti release:**

1. **package.json:** `"version": "1.3.0"`.
2. **CHANGELOG.md:**  
   - Pridėti `## [1.3.0] – 2026-03-12`.  
   - Visą dabartinį `[Unreleased]` turinį (Changed, Fixed, Added) perkelti po `[1.3.0]`.  
   - `[Unreleased]` palikti tuščią arba su „No changes yet“.
3. (Rekomenduotina) Patikrinti, kad CI žalias (testai, lint), paskui commit + tag `v1.3.0` + push.

---

## 4. Kada būtų „dar anksti“

Versiją **keisti būtų per anksti**, jei:

- **CI nesėkmingas** – testai ar lint failina (pvz. dar neįdiegtas ResizeObserver fix).
- **Nepilna QA** – norima prieš 1.3.0 dar kartą patikrinti deploy, PNG, EN, mobile.
- **Sąmoningai laikomi „Unreleased“** – planuojami dar pakeitimai tą pačią „sąnaudą“ įtraukti į 1.3.0.

T. y. „versijos keitimas“ nėra per anksti; **release datos / žymės (tag) per anksti** – tik jei dar nepatenkinti kokybės / QA kriterijai.

---

## 5. Santrauka

| Klausimas | Atsakymas |
|-----------|-----------|
| Ar galima **identifikuoti** versiją? | Taip – **package.json `version`** (dabar **1.2.0**). |
| Ar galima ją **pakeisti**? | Taip – pakeisti į **1.3.0** ir atnaujinti CHANGELOG. |
| Ar **dar anksti**? | **Ne**, jei CI žalias ir esi patenkintas QA. **Taip**, jei dar lauki testų/QA ar papildomų pataisymų prieš release. |

**Rekomendacija:** Versiją **galima** ir **verta** identifikuoti bei keisti (1.3.0). Ar daryti release dabar – priklauso nuo to, ar CI žalias ir ar laikai 1.3.0 „done“ savo release kriterijams.
