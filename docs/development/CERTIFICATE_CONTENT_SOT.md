# Sertifikatų turinio SOT (Source of Truth)

> **Tikslas:** Vienas šaltinis tiesos sertifikatų tekstams (titulai, subtitulai, tonas). Duomenys – `src/data/certificateContent.json`; UI – CertificateScreen, ModuleCompleteScreen.

---

## 1. Principai

- **Tonas:** Paprasta kalba, ne patetiška. Sertifikatas patvirtina įgūdžius – trumpai ir aiškiai.
- **Lokalizacija:** Titulai ir tekstai – per `certificateContent.json` (tiers) ir i18n `certificate.*` (lt.json, en.json) – nameLabel, websiteCta ir kt.

---

## 2. Turinio struktūra (certificateContent.json)

| Laukas         | Aprašymas                                                                                                            |
| -------------- | -------------------------------------------------------------------------------------------------------------------- |
| **tiers**      | Kiekvienam lygiui (1, 2, 3): title, subtitle, badgeLabel, footerText, introLine, completionLine, programName, label. |
| **websiteUrl** | Root lygyje – nuoroda į kursą (pvz. promptanatomy.app).                                                              |
| **websiteCta** | Tekstas nuorodos mygtukui (pvz. „Kursas: promptanatomy.app“).                                                        |

---

## 3. Vietos UI

- **ModuleCompleteScreen** – mygtukas „Parsisiųsti sertifikatą“ (aria-label su lygio aprašymu); po mygtukų – nuoroda su websiteUrl.
- **CertificateScreen** – maketo peržiūra, vardo laukas, mygtukai „Grįžti“ ir „Išsaugoti ir parsisiųsti PDF“; po mygtukų – websiteCta su ExternalLink ikona.

---

## 4. Lygių (tier) atrakinimas (produktas)

| Tier | Sąlyga (UI)                                                                                                                                                         |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Baigti modulius 1, 2, 3; sertifikato CTA – Modulio 3 užbaigimo ekrane.                                                                                              |
| 2    | Baigti modulius 1–6, baigiamasis testas ≥ 70 %; CTA – Modulio 6 užbaigimo ekrane.                                                                                   |
| 3    | Baigti modulius 7, 8, 9 ir Modulio 8 testas ≥ 70 %; CTA – Modulio 9 užbaigimo ekrane. Logika: `src/utils/certificateEligibility.ts` (`canRequestCertificateTier3`). |

**Tier 3** PDF tekstai (`programName`, `label`, `completionLine`) aprašo **Duomenų analizės kelią (7–9)**, ne visą 15 modulių programą.

---

## 5. Nuorodos

- **PDF maketas ir lietuviškos raidės:** `docs/development/PDF_MAKETO_GAIRES.md`, `docs/development/PDF_GENERATION_AGENT_MEMORY.md`.
- **Kada išduoti, hidden treasure:** `docs/development/GOLDEN_STANDARD.md` §3.7.
