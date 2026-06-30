# Versijavimo analizė – ar galima identifikuoti ir keisti versiją?

> **Data:** 2026-06-30 (atnaujinta release **1.4.1**)  
> **Klausimas:** Ar kodo bazėje galima vienareikšmiškai identifikuoti versiją ir ją pakeisti?

---

## 1. Kur versija nustatyta

| Vieta            | Dabartinė reikšmė                                        | Paskirtis                                                                              |
| ---------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **package.json** | `"version": "1.4.1"`                                     | NPM/projekto versija; vienintelis vieta, kurią build/tools gali skaityti automatiškai. |
| **CHANGELOG.md** | `[Unreleased]` viršuje; `## [1.4.1] – 2026-06-30` toliau | Žmogaus skaitomas release istorija; Semver + Keep a Changelog.                         |
| **progress.ts**  | `CURRENT_SCHEMA_VERSION = 2`                             | Tik localStorage progreso schema (v1 vs v2), ne produkto versija.                      |
| **Kiti doc**     | Pvz. „GOLDEN_STANDARD 2.3.5“, DS v0.2.0                  | Dokumentų ar modulių vidinė versija, ne release versija.                               |

**Išvada:** Versiją galima vienareikšmiškai identifikuoti: **produkto release versija = `package.json` `version`**. CHANGELOG atspindi, kas į kokią versiją įeina.

---

## 2. Dabartinė būsena

- **Release versija:** **1.4.1** (2026-06-30). Patch po 1.4.0: audit gates M1–9, handout serija, LT/EN fixes.
- **Ankstesnis release:** **1.4.0** (2026-06-30) – tier 9, production M1–9, M10–12 authoring.
- **Ankstesnis release:** **1.3.0** (2026-03-16) – deploy, mokėjimai, pirmas pirkimas.
- **Nepaskelbta (Unreleased):** pakeitimai po 1.4.1 – žr. CHANGELOG viršų.

Kitas žingsnis pagal Semver: **1.4.2** (patch) arba **1.5.0** (minor).

---

## 3. Release procedūra

1. **package.json:** `"version": "X.Y.Z"`.
2. **CHANGELOG.md:** perkelti `[Unreleased]` turinį į `## [X.Y.Z] – DATA`; palikti tuščią `[Unreleased]`.
3. **README.md:** versijos eilutė sutampa su package.json.
4. CI žalias: `validate:schema`, `lint`, `test:run`, `build:production`.
5. Commit + tag `vX.Y.Z` (+ marketing submodule pin).

---

## 4. Santrauka

| Klausimas                            | Atsakymas                                    |
| ------------------------------------ | -------------------------------------------- |
| Ar galima **identifikuoti** versiją? | Taip – **package.json `version`** (1.4.1).   |
| Ar **dar anksti** release 1.4.1?     | Ne – išleista 2026-06-30 (žr. CHANGELOG).    |
| **Kitas release**                    | 1.4.2 (patch) arba 1.5.0 (minor) pagal tipą. |
