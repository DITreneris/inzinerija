# Pedagoginė analizė – Moduliai 10, 11, 12 (Agentų inžinerija)

> **Tikslas:** Įvertinti visas M10–12 skaidres pagal stiprumą, pedagoginį potencialą, naudą ir praktiškumą; nustatyti silpniausias ir max ROI tobulinimus.  
> **Šaltiniai:** `docs/turinio_pletra_moduliai_10_11_12.md`, `docs/MODULIO_10_SKAIDRIU_EILES.md`, `src/data/modules.json`.  
> **Data:** 2026-07-20.  
> **Metodas:** content scorecard (S/P/N/R) pagal GOLDEN_STANDARD §3.2 veiksmo ciklą.

---

## 1. Trumpa įžanga

Moduliai 10–12 turi **aiškų kelią**: teorija (10) → testas (11) → projektas (12), su path-step, warm-up-quiz ir practice-scenario. Branduolys (taksonomija, workflow šablonai, agentinis promptas, M12 lab'ai) stiprus. Silpnybės – skaidrės **be GOLDEN veiksmo ciklo** (Trumpai → Daryk → Copy → Patikra) ir ploni orientaciniai ekranai, kurie dubliuoja gretimą turinį.

---

## 2. Vertinimo kriterijai (1–5)

| #     | Kriterijus              | Klausimas                                                                 |
| ----- | ----------------------- | ------------------------------------------------------------------------- |
| **S** | Stiprumas               | Ar idėja aiški, unikali, pilna? Ar laikosi GOLDEN ciklo?                  |
| **P** | Pedagoginis potencialas | Ar kelia Bloom lygį (ne tik atsiminti)? Ar yra savitikra / scaffolding?   |
| **N** | Nauda                   | Ar veda link M10–12 tikslų (ciklas, 3A, rolės, įrankiai, M12 artefaktas)? |
| **R** | Praktiškumas            | Ar per 5–15 min galima padaryti / nukopijuoti / gauti artefaktą?          |

**Silpna** = vidurkis **≤ 2.8** arba trūksta ≥2 iš: Daryk / Copy / Patikra / unikalumo.

---

## 3. Silpniausios skaidrės (prieš max ROI sprintą)

| Rangas | ID         | Vid. | Problema                                            |
| ------ | ---------- | ---- | --------------------------------------------------- |
| 1      | **120.25** | 1.8  | Tik diagrama; nėra Trumpai / Daryk / Patikra        |
| 2      | **10.35**  | 2.3  | 4 produktų kortelės be sprendimo veiksmo; 4× accent |
| 3      | **10.25**  | 2.5  | Stipri koncepcija, nėra veiksmo ciklo               |
| 4      | **124**    | 2.6  | Beveik tas pats promptas kaip 10.5                  |
| 5      | **10.15**  | 2.7  | Nėra Copy / Patikra                                 |
| 6      | 120.5      | 2.8  | Schema be Copy (gelbsti 120.55) – P2                |
| 7      | 125        | 2.8  | Optional kartojimas – by design                     |

---

## 4. Reitingas pagal modulį

### 4.1 Modulis 10 (26 skaidrės)

| Lygis              | Skaidrės                                                                  | Pastaba                                       |
| ------------------ | ------------------------------------------------------------------------- | --------------------------------------------- |
| **A**              | 10.45, 10.5, 10.51, 10.48, 10.66, 10.2+10.21, 10.6, 10.482                | Pilnas ciklas, artefaktai, QC                 |
| **B**              | 100, 10.1, 10.49, 10.4, 10.3, 10.65\*, 10.8, 10.22, 10.485, 10.61, 10.451 | Gera funkcija; 10.65 turiningas, bet optional |
| **C → A (po ROI)** | **10.25, 10.15, 10.35**                                                   | Max ROI sprintas                              |
| **C (reference)**  | 10.7, 10.481, 10.151                                                      | Glossary / section-break                      |

### 4.2 Modulis 11 (5)

| ID    | Lygis | Pastaba                           |
| ----- | ----- | --------------------------------- |
| 110   | B+    | whyBenefit / CTA                  |
| 110.5 | B     | Pre-test; router ≠ orkestratorius |
| 111   | A−    | 9 klausimai + remediation         |
| 112   | B+    | Žmogiškos temos                   |
| 113   | A−    | Bonus grandinė                    |

### 4.3 Modulis 12 (11)

| ID         | Lygis               | Pastaba                 |
| ---------- | ------------------- | ----------------------- |
| 120        | A−                  | Keliai + ROI            |
| **120.25** | **C → A (po ROI)**  | Max ROI                 |
| 120.5      | C+                  | P2 later                |
| 120.55     | B+                  | Gelbsti 120.5           |
| 124.5      | A                   | Greitas startas         |
| **124**    | **C → B+ (po ROI)** | Diferenciacija nuo 10.5 |
| 121–123    | A                   | MUST lab'ai             |
| 125        | C                   | Optional                |
| 128        | B+                  | 5 blokų santrauka       |

---

## 5. Sisteminės spragos

1. **Veiksmo ciklo skylės** – 10.25, 10.35, 10.15, 120.25 (sprendžiama šiame sprinte).
2. **Dubliavimas** – 124≈10.5 (sprendžiama); 120.25≈10.25 (120.25 tampa tiltu į lab'us); įrankių medis 10.4↔10.65.
3. **Sekos įtampa** – multi-agent (10.45–10.49) prieš paprastą sisteminį promptą (10.3) – **out of scope**.
4. **Optional branduolys** – 10.65 optional, nors M12 lab'ai naudoja spec/test – **out of scope**.
5. **Savitikros tipas** – 10.485 daugiausia Remember; Apply vėlesniam sprintui.

---

## 6. Max ROI backlog

| Prioritetas | ID            | Fix                                                                 | Statusas         |
| ----------- | ------------- | ------------------------------------------------------------------- | ---------------- |
| **P0**      | 120.25        | Trumpai + Daryk + Patikra; diagrama lieka                           | ✅ šiame sprinte |
| **P0**      | 10.25         | Daryk + Copy + Patikra                                              | ✅ šiame sprinte |
| **P1**      | 10.15         | Copy + Patikra                                                      | ✅ šiame sprinte |
| **P1**      | 10.35         | Trumpai + sprendimas + Daryk + Copy + Patikra; accent biudžetas     | ✅ šiame sprinte |
| **P1**      | 124           | Golden test + įrankio pėdsakas; narrativeLead skiria nuo 10.5       | ✅ šiame sprinte |
| **P2**      | **120.5**     | Copy „perdavimo taisyklė“ + Daryk/Patikra                           | ✅ 2026-07-20    |
| **P2**      | **10.3 seka** | Po 10.25, prieš 10.45                                               | ✅ 2026-07-20    |
| **P2**      | **10.64**     | MUST įėjimo bilietas (spec + 3 testai + HITL); 10.65 lieka optional | ✅ 2026-07-20    |

---

## 7. Santrauka

| Sritis           | Pagrindinis trūkumas                        | Pirmas žingsnis (max ROI)            |
| ---------------- | ------------------------------------------- | ------------------------------------ |
| Veiksmo ciklas   | Orientacinės skaidrės be Daryk/Copy/Patikra | 10.25, 120.25, 10.15, 10.35          |
| Diferenciacija   | 124 ≈ 10.5                                  | Golden test + tool trace             |
| M12 pasiruošimas | Testavimas/HITL buvo optional 10.65         | **10.64 MUST bilietas** (10.65 deep) |
| Seka             | 10.3 buvo po multi-agent                    | **10.3 po 10.25, prieš 10.45** ✅    |

**Runtime sinchronizacija:** `src/data/modules.json` + `src/data/modules-en-m10-m12.json`.  
**Turinio SOT:** `docs/turinio_pletra_moduliai_10_11_12.md`.
