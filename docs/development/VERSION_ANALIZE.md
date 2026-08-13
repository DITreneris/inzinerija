# Versijavimo analizė – ar galima identifikuoti ir keisti versiją?

> **Data:** 2026-08-13 (procedūra; release truth = `package.json`)  
> **Klausimas:** Ar kodo bazėje galima vienareikšmiškai identifikuoti versiją ir ją pakeisti?

---

## 1. Kur versija nustatyta

| Vieta            | Dabartinė reikšmė                                        | Paskirtis                                                                             |
| ---------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| **package.json** | `"version": "1.6.2"`                                     | NPM/projekto versija; vienintelė vieta, kurią build/tools gali skaityti automatiškai. |
| **CHANGELOG.md** | `[Unreleased]` viršuje; `## [1.6.2] – 2026-08-13` toliau | Žmogaus skaitomas release istorija; Semver + Keep a Changelog.                        |
| **progress.ts**  | `CURRENT_SCHEMA_VERSION = 2`                             | Tik localStorage progreso schema (v1 vs v2), ne produkto versija.                     |
| **Kiti doc**     | Pvz. „GOLDEN_STANDARD 2.3.x“, DS v0.2.0                  | Dokumentų ar modulių vidinė versija, ne release versija.                              |

**Išvada:** Versiją galima vienareikšmiškai identifikuoti: **produkto release versija = `package.json` `version`**. CHANGELOG atspindi, kas į kokią versiją įeina.

---

## 2. Dabartinė būsena

- **Repo versija:** **1.6.2** (2026-08-13) – corporate12 cutover pin target (Docs Lean, katalogas, M10–12 freeze, SCHEME-CENTRAL W1).
- **Marketing pin:** learning produkcija gali likti ties **v1.4.9** iki marketing cutover; Horizon B cutover pin target = **v1.6.2**.
- **Ankstesni:** 1.6.1, 1.6.0, 1.5.0, 1.4.9 … 1.4.0, 1.3.0 – žr. CHANGELOG.

Kitas žingsnis pagal Semver: **1.6.3** (patch) arba **1.7.0** (minor), kai naujas Unreleased branduolys uždaromas.

---

## 3. Release procedūra

1. **package.json:** `"version": "X.Y.Z"`.
2. **CHANGELOG.md:** perkelti `[Unreleased]` turinį į `## [X.Y.Z] – DATA`; palikti tuščią `[Unreleased]`.
3. **README.md:** versijos eilutė sutampa su package.json.
4. CI žalias: `validate:schema`, lint, `test:run`, `build:production` + `audit:release-preflight`.
5. Docs sync: `DOCS_SYNC_CHECKLIST.md`.
6. Commit + tag `vX.Y.Z` (+ marketing submodule pin MON-2).

---

## 4. Santrauka

| Klausimas                              | Atsakymas                                                                         |
| -------------------------------------- | --------------------------------------------------------------------------------- |
| Ar galima **identifikuoti** versiją?   | Taip – **package.json `version`** (dabar **1.6.2**).                              |
| Ar **dar anksti** corporate12 cutover? | Ne – `v1.6.2` yra tagged pin target; marketing pin gali likti v1.4.9 iki cutover. |
| **Kitas release**                      | 1.6.3 (patch) arba 1.7.0 (minor) pagal Unreleased tipą.                           |
