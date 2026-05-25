# Design System v0.2 — vizualinis diff (E7.1)

> **Data:** 2026-05-19  
> **Tikslas:** 8 PNG — prieš/po palyginimai pagrindinėms v0.2 vietoms.

## Reikalingi failai (<500 KB each)

| Failas                           | Vieta                               | Kada „prieš“                  | Kada „po“              |
| -------------------------------- | ----------------------------------- | ----------------------------- | ---------------------- |
| `01-modules-page-before.png`     | Moduliai (M1–M6 kortelės)           | Be `module.accent` top stripe | Po E5.4                |
| `02-modules-page-after.png`      | Moduliai                            | —                             | 6 skirtingos juostos   |
| `03-m1-intro-before.png`         | M1, 1-oji skaidrė                   | Be Eyebrow virš hero          | Po E5.5                |
| `04-m1-intro-after.png`          | M1 intro                            | —                             | Eyebrow + BookOpen     |
| `05-m4-intro-before.png`         | M4, 1-oji skaidrė                   | Be modulio Eyebrow            | Po E5.5                |
| `06-m4-intro-after.png`          | M4 intro                            | —                             | Eyebrow violet + Brain |
| `07-m6-section-break-before.png` | M6 section-break su `sectionNumber` | Badge brand                   | Po E5.6                |
| `08-m6-section-break-after.png`  | M6 section-break                    | —                             | Badge accent (gold)    |

**Kaip gauti:** `npm run dev` → naršyklės screenshot (light). „Prieš“ — git checkout tag/commit prieš E5 arba atkurti iš archyvo, jei dar yra.

## Papildoma: modulio identitetas (E5.7)

12 screenshot'ų (6 moduliai × ModulesPage + intro, light + dark):  
[`MODULE_IDENTITY_VISUAL_REGRESS_2026-05.md`](../MODULE_IDENTITY_VISUAL_REGRESS_2026-05.md)  
Katalogas: `screenshots/module-identity-2026-05/` (sukurti prieš release).

## Statusas

| Failas | Statusas                    |
| ------ | --------------------------- |
| 01–08  | **Laukia rankinio įkėlimo** |
