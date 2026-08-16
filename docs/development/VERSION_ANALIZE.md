# Versijavimo analizė – ar galima identifikuoti ir keisti versiją?

> **Data:** 2026-08-16 (procedūra; release truth = `package.json`)  
> **Klausimas:** Ar kodo bazėje galima vienareikšmiškai identifikuoti versiją ir ją pakeisti?

---

## 1. Kur versija nustatyta

| Vieta            | Dabartinė reikšmė                                        | Paskirtis                                                                             |
| ---------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| **package.json** | `"version": "1.6.3"`                                     | NPM/projekto versija; vienintelė vieta, kurią build/tools gali skaityti automatiškai. |
| **CHANGELOG.md** | `[Unreleased]` viršuje; `## [1.6.3] – 2026-08-16` toliau | Žmogaus skaitomas release istorija; Semver + Keep a Changelog.                        |
| **progress.ts**  | `CURRENT_SCHEMA_VERSION = 2`                             | Tik localStorage progreso schema (v1 vs v2), ne produkto versija.                     |
| **Kiti doc**     | Pvz. „GOLDEN_STANDARD 2.3.x“, DS v0.2.0                  | Dokumentų ar modulių vidinė versija, ne release versija.                              |

**Išvada:** Versiją galima vienareikšmiškai identifikuoti: **produkto release versija = `package.json` `version`**. CHANGELOG atspindi, kas į kokią versiją įeina.

---

## 2. Dabartinė būsena

- **Repo versija:** **1.6.3** (2026-08-16) – testerio Must + M11 items + sertifikatai/PDF + walk close.
- **Marketing pin:** live **v1.6.2** / `c35a1f5` kol neperpinsi; target **v1.6.3**. **12 live per Supabase.** `v1.4.9` = istorinis learning freeze, ne current pin.
- **Ankstesni:** 1.6.2, 1.6.1, 1.6.0, 1.5.0, 1.4.9 … 1.4.0, 1.3.0 – žr. CHANGELOG.

Kitas žingsnis pagal Semver: **1.6.4** (patch) arba **1.7.0** (minor) **tik paprašius**.

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

| Klausimas                              | Atsakymas                                                                    |
| -------------------------------------- | ---------------------------------------------------------------------------- |
| Ar galima **identifikuoti** versiją?   | Taip – **package.json `version`** (dabar **1.6.3**).                         |
| Ar **dar anksti** corporate12 cutover? | Ne – **12 live per Supabase**; live pin = **v1.6.2**; training = **v1.6.3**. |
| **Kitas release**                      | 1.6.4 (patch) arba 1.7.0 (minor) tik paprašius.                              |
