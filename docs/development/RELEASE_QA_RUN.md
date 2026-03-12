# Release QA vykdymas (Faze 0.1, 0.2, 0.4)

> **Tikslas:** Vieno vykdymo dokumentas – automatinės patikros rezultatai + žingsnis po žingsnio rankinė (Faze 0.1, 0.2, 0.4).  
> **Šaltinis:** RELEASE_QA_CHECKLIST §1–6, §5d; planas „Vartotojui paruošta įrankis“.

---

## Automatinės patikros rezultatai (2026-03-11)

| § | Patikra | Rezultatas | Pastaba |
|---|---------|------------|---------|
| **§1 Skip link** | `href="#main-content"` ir `<main id="main-content">` | ✅ | App.tsx: skip link su `t('skipToContent')` („Praleisti į turinį“), main id="main-content", role="main". |
| **§1 LT/EN skip** | Tekstas LT/EN | ✅ | lt.json: „Praleisti į turinį“; en.json: „Skip to content“. |
| **§4 Rodyklės** | Skaidrių navigacija ← → | ✅ | useSlideNavigation.ts: ArrowLeft/ArrowRight/ArrowUp/ArrowDown – nextSlide/prevSlide; ModuleView naudoja useSlideNavigation. |
| **§5 Lietuviškos (grep)** | Tipinių klaidų nebuvimas | ✅ | Grep `perziureti|Ziniu|zemelapis|Ka ismokote|ypac|reiskia` src – nerasta. |
| **Footer ≤55** | scripts/audit-footer-length.mjs | ✅ | Vykdyta anksčiau – „all ≤55 chars OK“. |

**Kas reikalauja rankinės:** §1 (Tab → Enter skip link veikimas), §2 mobile, §3 dark mode, §5 lietuviškos (vizualinė 1 skaidrė/modulis), §5a paprasta kalba, §5d M5/M6 PDF ir M4/M6 skaidrės.

---

## Faze 0.1 ir 0.2 – Rankinė (žmogus)

### 0.1 M5 / M6 PDF – lietuviškos raidės

1. **M5 PDF**
   - Atidaryti aplikaciją → Moduliai → **Modulis 5**.
   - Baigti testą (atsakyti į klausimus iki pabaigos).
   - Rezultatų skaidrėje paspausti **„Parsisiųsti Modulio 5 atmintinę (PDF)“**.
   - Atsidaryti parsisiųstą PDF.
   - **Patikrinti:** raidės ą, ė, į, š, ų, ū, ž rodomos teisingai (ne □ ar kita subsitucija). Žr. `docs/development/PDF_DOWNLOAD_TESTING.md`, `public/fonts/README.md` (NotoSans).

2. **M6 PDF**
   - Moduliai → **Modulis 6** → atlikti praktiką iki ModuleCompleteScreen.
   - Paspausti **„Parsisiųsti Modulio 6 atmintinę (PDF)“** (arba atitinkamą mygtuką).
   - Atsidaryti PDF – lietuviškos raidės ir turinys atitinka.

**Rezultatą įrašyti:** TEST_REPORT arba šio failo skyriuje „Paskutinio vykdymo rezultatai“.

---

### 0.2 M4 skaidrė 56 ir M6 skaidrė 64

3. **M4 skaidrė 56 (RAG: kas tai ir pabandyk)**
   - Moduliai → Modulis 4 → nueiti į **skaidrę 21** (modulyje: „RAG: kas tai ir pabandyk“ / shortTitle „RAG praktiškai“).
   - **Patikrinti:**
     - Navigacija (← / →) veikia.
     - Sekcija **„Agentinė vizualizacija“** su `image: "llm_arch_diagram"` – tabai (Bazinis, RAG, Įrankiai) veikia.
     - **Kopijuojamas promptas** – mygtukas „Kopijuoti“ veikia, tekstas nukopijuojamas.
     - Jei yra nuoroda **„Peržiūrėti pilname dydyje“** – paspausti ir įsitikinti, kad atsidaro tas pats turinys (diagrama/schema), ne 404.
   - Turinys skaitomas, lietuviškos raidės teisingos.

4. **M6 skaidrė 64 (Duomenų tvarkymas – Pagalbinis promptas)**
   - Moduliai → Modulis 6 → nueiti į skaidrę su **„Pagalbinis promptas: duomenų tvarkymo sistema“** (section heading) arba pavadinimu **„Duomenų tvarkymas (praktinė atmintinė)“**.
   - **Patikrinti:**
     - Mygtukas **„Kopijuoti“** (prie copyable prompto) veikia.
     - Lietuviškos raidės tekste teisingos.
     - Turinys atitinka (5 punktų atmintinė, biblioteka, versijavimas ir kt.).

**Rezultatą įrašyti:** TEST_REPORT arba žemiau „Paskutinio vykdymo rezultatai“.

---

## Faze 0.4 – RELEASE_QA_CHECKLIST §1–6 (rankinė)

Vykdyti eilės tvarka; pažymėti kiekvieną punktą.

### §1 Broken links (~2 min)

- [ ] **Skip link:** Home → Tab (kelis kartus) → matomas „Praleisti į turinį“ → Enter. Fokusas turi pereiti į main turinį (ne į meniu).
- [ ] **Išorinė nuoroda (1–2 spot check):** Pvz. App footer GitHub nuoroda arba ContentSlides nuoroda į šaltinį – atsidaro naujame lange, nėra 404.
- [ ] **AI detektoriai / Prompt biblioteka:** Jei naudojami – nuorodos atsidaro.

### §2 Mobile sanity (~1 min)

- [ ] **Viewport:** DevTools → Mobile (375×667 arba iPhone SE) – puslapis nesusilūžęs.
- [ ] **Modulio skaidrė:** Moduliai → Modulis 1 → 1 skaidrė – tekstas skaitomas, mygtukai paspaudžiami, navigacija (← / →) veikia.
- [ ] (Rekomenduojama) Modulis 2 ir 3 – bent viena skaidrė (test-intro arba practice).

### §3 Dark mode (~1 min)

- [ ] Tema perjungiama (light ↔ dark) – išsaugoma (refresh išlieka).
- [ ] Bent viena skaidrė (M1 arba M4) – tekstas skaitomas, kontrastas pakankamas, nėra baltų „dėmių“.

### §4 A11y smoke (~1 min)

- [ ] Skip link: Tab → „Praleisti į turinį“ → Enter – fokusas į main.
- [ ] Skaidrių navigacija: Modulio skaidrė – rodyklės ← → keičia skaidres.

### §5 Lietuviškos raidės (~1 min)

- [ ] Prioritetinės vietos: HomePage, bent 1 skaidrė iš kiekvieno modulio (M1–M6), Testo rezultatai, žodynėlis.
- [ ] Greitas patikrinimas: nėra „išlindusių“ ASCII vietoj ž, ė, ą, ų, ū, š, č, į (žr. RELEASE_QA_CHECKLIST §5 dažnas klaidų sąrašas).
- [ ] Sertifikato PDF (jei įdiegta): baigus M3 → „Parsisiųsti sertifikatą“ → vardas su diakritika → PDF atsidaro su teisingomis raidėmis.

### §5a Paprasta kalba (~1 min)

- [ ] Bent vienas modulis (rekomenduojama M3/M9): antraštėse ir aprašymuose nėra žargono be paaiškinimo (ROI, CFO, EBITDA, NPS, SWOT, influencer ir kt.) arba yra vienas sakinio paaiškinimas. Žr. `docs/development/PAPRASTOS_KALBOS_GAIRES.md`.

### §5d M5/M6 PDF ir skaidrės (0.1, 0.2)

- [ ] M5 PDF – atsisiųstas, lietuviškos raidės teisingos (0.1).
- [ ] M6 PDF – atsisiųstas, turinys atitinka (0.1).
- [ ] M4 skaidrė 56 – navigacija, LlmArch tabai, copyable, „Peržiūrėti pilname dydyje“ (0.2).
- [ ] M6 skaidrė 64 – Kopijuoti, lietuviškos raidės (0.2).

### §6 MVP release (jei deploy su VITE_MVP_MODE=1)

- [ ] 6 moduliai atidaryti, 7+ su „Moduliai 7–15 ateityje“.
- [ ] Glossary – filtre Moduliai 1–6.
- [ ] HomePage CTA po 6 modulių – „Į apklausą“.

---

## Paskutinio vykdymo rezultatai

*(Čia žmogus įrašo, kai atliko rankinę.)*

| Data | Vykdytojas | 0.1 M5 PDF | 0.1 M6 PDF | 0.2 M4 sk.56 | 0.2 M6 sk.64 | §1 | §2 | §3 | §4 | §5 | §5a | §6 (jei taikoma) |
|------|-------------|------------|------------|--------------|--------------|----|----|----|----|-----|-----|-------------------|
| —    | —           | —          | —          | —            | —            | —  | —  | —  | —  | —   | —   | —                 |

---

## Nuorodos

- **Checklist:** `docs/development/RELEASE_QA_CHECKLIST.md`
- **PDF testai:** `docs/development/PDF_DOWNLOAD_TESTING.md`, `docs/development/PDF_MAKETO_GAIRES.md`
- **Paprasta kalba:** `docs/development/PAPRASTOS_KALBOS_GAIRES.md`
- **Planas:** `.cursor/plans/vartotojui_paruošta_įrankis_cfe90c31.plan.md`
