# Repo dokumentacijos auditas – 2026

> **Data:** 2026-03-11  
> **Tikslas:** Švarus, aiškus repo dokumentacijos paveldas – pašalinti pasenusias analizes, nutrūkusias nuorodas ir perteklinę dokumentaciją; tinkama struktūra tolimesniam AI mokymų ir SaaS vystymui.

---

## 1. Executive summary

**Sprendimas (įgyvendinta):** archive lieka .gitignore (lokalus); nuorodos pataisytos į `docs/archive/README.md`, pridedamas disclaimer „archyvas ne repo“; sukurti trūkstami SOT failai repo (`CERTIFICATE_CONTENT_SOT.md`, `SUMMARY_SLIDE_SPEC.md`); nuorodos į archive visur pažymėtos „lokaliai“ arba nukreiptos į repo alternatyvas.

### Pagrindinės problemos (buvo)

| Problema | Apimtis | Poveikis |
|----------|---------|----------|
| **Nutrūkusios nuorodos** | Daug dokumentų nurodo į `docs/archive/ARCHIVE_README.md`, `docs/archive/development/SUMMARY_SLIDE_SPEC.md`, sertifikatų SOT, M4_BADGE_PILLS ir kt. – dalis failų neegzistuoja arba yra `archive/`, kuris **pilnai ignoruojamas** `.gitignore`. | Klaidinanti navigacija, agentai negali pasiekti archyvo. |
| **Archive vs repo tiesa** | `archive/` yra `.gitignore` – viskas, kas „perkelta į archive“, faktiškai **nėra repozitorijoje**. Dokumentacija aprašo `archive/development/`, `archive/root/`, `archive/moduliai_7_8_9/`, bet šie katalogai nėra commitinami. | Skirtumas tarp „kas parašyta“ ir „kas yra repo“. |
| **Vardų neatitikimas** | Indeksai cituoja **ARCHIVE_README.md**, o archyve yra tik **README.md**. | Nuorodos į ARCHIVE_README – nutrūkusios. |
| **Trūkstami SOT failai** | `CERTIFICATE_CONTENT_SOT.md`, `SERTIFIKATU_NUORODA_CTA_IVYKDYMAS.md`, `M4_BADGE_PILLS_HIDDEN_TREASURE_ANALIZE.md` – cituojami GOLDEN_STANDARD ir kituose doc, bet failų nėra. | Neaiški sertifikatų ir „hidden treasure“ tiesa. |
| **Vienkartinės analizės docs/development** | ~45 .md failų `docs/development/` – dalis yra vienkartinės analizės (BROWSER_CONSOLE_ERRORS, CTA_AUDIT_M1_M4, FOOTER_NEXT_SLIDE, EN_UI_RYTAS_ROCKETS, LT_EN_M4-6_PLAN_VERIFICATION ir kt.), kurios logiškai priklauso archyvui. | Didesnis „triukšmas“, sunkesnė priežiūra. |
| **Kelio dubliavimas (Windows)** | Kai kurie dokumentai rodomi dvigubai: `docs/development/TEST_REPORT.md` ir `docs\development\TEST_REPORT.md` – tas pats failas, skirtingas kelio formatas. | Gali klaidinti paieškas ir indeksus. |

### Kur daugiausia techninio „triukšmo“

- **docs/development/** – didžiausia koncentracija: agentų specai (reikalingi), QA/test checklist (reikalingi), bet ir daug vienkartinių analizių (auditai, planai, EN/LT analizės), kurie gali būti perkelti į `docs/archive/development/` arba `docs/analysis/`.
- **Nuorodos į archive/** – DOCUMENTATION_INDEX, LEAN_INDEX, DOCUMENTATION_QUICK_REF, AGENT_ORCHESTRATOR, CONTENT_AGENT, CURRICULUM_AGENT, USER_JOURNEY_AGENT, RELEASE_QA_CHECKLIST, GOLDEN_STANDARD ir kt. nuolat nurodo į `docs/archive/...` failus, kurių repo nežiūri (archive/ ignoruojamas).
- **Root lygis** – `memo.md`, `mokymu_komanda_memo.md` – asmeniniai / komandos memo; galima perkelti į `docs/` arba ignoruoti pagal politiką.

---

## 2. Pasenusios analizės

Sąrašas: failas → kodėl pasenęs → rekomendacija.

| Failas | Kodėl pasenęs | Rekomendacija |
|--------|----------------|---------------|
| `docs/archive/*` (visi 14 failų) | Testų/optimizacijų ataskaitos 2026-02-02, implementation summary – istoriniai. | **Palikti** archyve; **įsitikinti**, kad archive/ yra repo dalis (žr. §5 .gitignore). |
| `docs/development/BROWSER_CONSOLE_ERRORS_ANALIZE.md` | Vienkartinė konsolės klaidų analizė. | **Archyvuoti** → `docs/archive/development/`. |
| `docs/development/CTA_AUDIT_M1_M4.md` | Vienkartinis CTA auditas. | **Archyvuoti** → `docs/archive/development/`. |
| `docs/development/EN_UI_RYTAS_ROCKETS_ANALIZE.md` | Konkretus EN UI analizės atvejis. | **Archyvuoti** → `docs/archive/development/`. |
| `docs/development/FOOTER_NEXT_SLIDE_ANALIZE.md` | Vienkartinė footer analizė; rezultatai gali būti įsilieję į GOLDEN_STANDARD. | **Archyvuoti** arba **konsoliduoti** į GOLDEN_STANDARD, tada ištrinti. |
| `docs/development/LT_EN_M4-6_PLAN_VERIFICATION.md` | Planas nuoroda į `.cursor/plans/` – lokalus, ne repo. | **Archyvuoti** arba **atsieti** nuorodas nuo lokalių planų; palikti tik „kas padaryta“ santrauką. |
| `docs/development/MODULIO_1_EN_UI_DIAGNOZE.md` | Vienkartinė Modulio 1 EN UI diagnozė. | **Archyvuoti** → `docs/archive/development/`. |
| `docs/development/UX_AUDIT_IMPLEMENTATION_PLAN.md` | Įgyvendinimo planas – po įgyvendinimo daugiausia istorinis. | **Palikti** kaip įgyvendinimo istoriją arba **perkelti** į archive po užbaigimo. |
| `docs/AUDITO_ATASKAITA_MODULIAI_1_6_MOBILE_UX.md` | Audito ataskaita – vertė ilgainiui referencui. | **Palikti** arba **perkelti** į `docs/audits/` / `docs/archive/`. |
| `docs/AUDITO_ATASKAITA_MODULIAI_1_6_UI_UX_LEARNING.md` | To paties ciklo auditas. | **Palikti** arba **konsoliduoti** su Mobile UX ataskaita, vienas „Moduliai 1–6 UX auditas“. |
| `docs/UX_AUDIT_MICRO_IMPROVEMENTS.md` | Mikro pataisymų sąrašas. | **Konsoliduoti** su UX_AUDIT_IMPLEMENTATION_PLAN arba **archyvuoti**. |
| `docs/PRE_LAUNCH_DOCUMENTATION_CLEANUP.md` | Pre-launch checklist – atliktas 2026-03-09. | **Palikti** kaip istoriją arba **archyvuoti** → `docs/archive/`. |
| `docs/MODULIO_1_ADVANCED_SKAIDRIU_VEIKSMO_PRAKTIKOS_ANALIZE.md` | Skaidrių veiksmo analizė. | **Archyvuoti** jei nebe naudojama kaip SOT. |
| `docs/development/ANALIZE_MODULIAI_1_6_NUOSEKLUMAS.md` | Nuoseklumo analizė – vienkartinė. | **Archyvuoti** → `docs/archive/development/`. |
| `docs/development/LT_EN_UI_KOKYBES_VERSTIMO_RIZIKOS_ANALIZE.md` | LT/EN vertimo rizikos – referencui naudinga. | **Palikti** arba **archyvuoti** jei superseded. |

**Bendras principas:** Vienkartinės analizės, kurios nebe naudojamos kaip SOT ir neįeina į agentų specą → perkelti į `docs/archive/development/` tik lokaliai (archive ne repo); arba laikyti `docs/development/analysis/` repo.

---

## 3. Dokumentų dubliavimas

| Kas dubliuojasi | Kur | Veiksmas |
|-----------------|-----|----------|
| **Navigacijos sluoksniai** | DOCUMENTATION_QUICK_REF, LEAN_INDEX, DOCUMENTATION_INDEX | **Palikti** – tai sąmoningas trijų lygių dizainas (greita nuoroda → lean core → pilnas sąrašas). |
| **RELEASE_QA_CHECKLIST vs RELEASE_QA_RUN** | development/ | **Palikti abu** – CHECKLIST = ką tikrinti; RUN = kaip vykdyti + rezultatų lentelė. Galima RUN nuorodą į CHECKLIST. |
| **TEST_REPORT** | Vienas failas, rodomas kaip `docs/development/` ir `docs\development\` | **Nėra tikro dublio** – tik kelio atvaizdavimas (Windows). Naudoti visur vienodai `docs/development/`. |
| **turinio_pletra_moduliai_4_5_6.md** | `docs/` ir `docs\` (git status) | **Patikrinti** – ar tik vienas failas (path normalizacija). Jei tik vienas – nuorodose naudoti tik `docs/`. |
| **VARTOTOJU_ATSILIEPIMAI_BENDRAS.md** | docs/ ir docs\ | Tas pats – **vienas failas**. |
| **GOLDEN_STANDARD.md** | docs/development/ (dvigubai išvardintas skirtingu keliu) | **Vienas failas** – normalizuoti nuorodas. |
| **sales-os/marketing_plan.md** ir **docs/marketing_plan.md** | Skirtingi katalogai | **Skirtinga paskirtis** – docs = SOT rinkodarai; sales-os = pardavimų kontekstas. Palikti; galima cross-link. |
| **docs/development/GOLDEN_STANDARD.md** ir **docs/archive/.../GOLDEN_STANDARD** (jei kada buvo) | DOCUMENTATION_INDEX mini „archyvą“ gold standard gap | **Vienas aktyvus** – `docs/development/GOLDEN_STANDARD.md`. Archyve – tik senos versijos, jei yra. |

**Konsolidacijos siūlymai:**

- **Santraukos skaidrės:** Jei `SUMMARY_SLIDE_SPEC` bus atkurtas arba perkeltas iš archyvo – laikyti **vienoje vietoje** (pvz. `docs/development/summary-slide-spec.md` arba `docs/archive/development/SUMMARY_SLIDE_SPEC.md` jei archive sekamas).
- **Sertifikatai:** Sukurti **vieną** SOT: `docs/development/CERTIFICATE_CONTENT_SOT.md` (ir prireikus `SERTIFIKATU_NUORODA_CTA_IVYKDYMAS.md`), kad GOLDEN_STANDARD ir PDF_GENERATION_AGENT_MEMORY nenurodytų į neegzistuojančius failus.

---

## 4. Nuorodų ir struktūros problemos

### Nutrūkusios nuorodos (reikia pataisyti arba pašalinti)

| Nuoroda (iš kur) | Nurodo į | Problema | Veiksmas |
|------------------|----------|----------|----------|
| DOCUMENTATION_INDEX, docs/README, QUICK_REF, LEAN_INDEX, PRE_LAUNCH_CLEANUP | `docs/archive/ARCHIVE_README.md` | Failas neegzistuoja; archyve yra **README.md** | Pakeisti visur į **docs/archive/README.md** arba pridėti **ARCHIVE_README.md** kaip kopiją / redirect. |
| GOLDEN_STANDARD, CONTENT_AGENT, CURRICULUM_AGENT, AGENT_ORCHESTRATOR, MODULIO_4_SKAIDRIU_EILES, turinio_pletra | `docs/archive/development/SUMMARY_SLIDE_SPEC.md` | archive/ gitignore – failas ne repo | Arba **atkurti** failą repo (pvz. `docs/development/SUMMARY_SLIDE_SPEC.md`), arba **nuorodas** pakeisti į „archyve (jei sekamas)“ arba pašalinti. |
| GOLDEN_STANDARD | `docs/development/M4_BADGE_PILLS_HIDDEN_TREASURE_ANALIZE.md` | Failas neegzistuoja | Sukurti trumpą doc arba **nuorodą pašalinti** / pakeisti į „žr. ModuleCompleteScreen“. |
| GOLDEN_STANDARD, PDF_GENERATION_AGENT_MEMORY | `docs/development/CERTIFICATE_CONTENT_SOT.md`, `SERTIFIKATU_NUORODA_CTA_IVYKDYMAS.md` | Failai neegzistuoja | **Sukurti** minimalius SOT failus arba perkelti turinį iš GOLDEN_STANDARD/PDF doc. |
| RELEASE_QA_CHECKLIST | `docs/archive/development/MOBILE_UI_UX_AUDIT.md`, `EN_LANGUAGE_STANDARD.md` | archive/ development ne repo | Nuorodas pakeisti į „jei yra archyve“ arba **atsisiųsti** šiuos failus į repo (pvz. `docs/development/`) ir atnaujinti kelius. |
| USER_JOURNEY_AGENT, AGENT_ORCHESTRATOR | `docs/archive/development/AGENT_SEQUENCE_USER_JOURNEY_MVP_MODULIO_ANALIZE.md` | Tas pats – archive | Tas pats – arba failas į repo, arba nuorodos „archyve“. |
| SKAIDRIU_TIPU_ANALIZE, MODULIU_7_8_9_GILI_ANALIZE | `docs/archive/root/...`, `docs/archive/MODULIO_7_...`, `docs/archive/moduliai_7_8_9/...` | archive/ ignoruojamas | Nurodyti tik jei archive bus sekamas; kitaip – „istoriniai šaltiniai (archyve, ne repo)“. |
| VARTOTOJU_ATSILIEPIMAI | `docs/archive/root/20260220_Testas.txt` | Ne repo | Nuorodą palikti kaip „lokalūs testai“ arba pašalinti. |
| marketing_plan | `docs/archive/marketing_plan.md`, `MARKETING_MUST_SHOULD_WANT.md`, `20260221_Linkedin_analize.txt` | Archyve – ne repo | Jei archive nebus sekamas – nuorodas pakeisti į „superseded; turinys sulietas čia“. |
| GOLDEN_STANDARD | `docs/archive/root/portalas.txt` | Ne repo | Pakeisti į „duomenų šaltinis (archyve)“ arba pašalinti. |
| LT_EN_M4-6_PLAN_VERIFICATION | `.cursor/plans/lt-en_m4-6_agentų_planas_fee5a0dc.plan.md` | Lokalus Cursor planas | **Atsieti** – doc'e nurodyti „šaltinis: Cursor plan (lokalus)“ arba pašalinti nuorodą. |

### Klaidinanti struktūra

- **archive/ kaip „vietovė“ bet ne repo:** Visi doc'ai kalba apie `docs/archive/` ir poaplankius, bet `archive/` yra .gitignore – nauji nariai nemato jokio archyvo. **Rekomendacija:** arba (a) **pašalinti `archive/` iš .gitignore** ir commitinti archyvą, arba (b) **visur dokumentuoti**, kad archyvas yra tik lokaliai / kitoje vietoje, o repo turi tik aktyvią dokumentaciją.
- **Vardas ARCHIVE_README vs README:** Vienodas pavadinimas (ARCHIVE_README.md) visur indeksuose sumažintų klaidų – arba pervadinti `docs/archive/README.md` → `ARCHIVE_README.md`, arba visur nuorodas pakeisti į `README.md`.

---

## 5. .gitignore patikra

### Kas dabar ignoruojama (svarbu dokumentacijai)

| Taisyklė | Poveikis | Rekomendacija |
|----------|----------|---------------|
| `archive/` | **Visa archive/ nėra repo** – dokumentacija į ją nurodo. | **Priimta:** palikti .gitignore; visur doc nuorodos pataisytos – „archyvas lokaliai, ne repo“, disclaimer DOCUMENTATION_INDEX §4. |
| `.cursor/` | Cursor taisyklės ir planai ne commitinami. | **Palikti** – dažnai norima laikyti lokaliai. Jei reikia bendrų taisyklių – naudoti tik ` .cursor/rules/` commitinimus ir ignoruoti `.cursor/plans/` ir kitus laikinus. |
| `*_dienos_planas.md` | Dienos planai ne sekami. | **Palikti**. |
| `*_user_tests.md`, `*testo_dalyviai*`, `dalyviu_sarasas.md` | Konfidencialūs / vartotojų duomenys. | **Palikti**. |
| `docs/di_detektoriai.html` | Vienas HTML. | **Palikti** arba perkelti į public/ jei reikia. |
| `CODE_REVIEW_ANALYSIS.md`, `UI_KOMPONENTU_ANALIZE.md`, `vartotojo_kelione.md` | Root lygio analizės. | Jei jie **reikalingi** komandai – **pašalinti** iš .gitignore ir commitinti; jei asmeniniai – **palikti**. |

### Ar development failai gali būti netyčia ignoruojami?

- **Ne** – nėra taisyklių, kurios ignoruotų `docs/`, `src/`, `scripts/`. Vienintelė rizika – **archive/**: jei kas nors įdeda naujus doc'us į `docs/archive/`, jie nebus commitinami. **Rekomendacija:** jei archive bus naudojamas – išimti iš .gitignore; jei ne – aiškiai dokumentuoti, kad nauji „archyvo“ doc'ai turi būti `docs/archive/` **ne** naudojami arba laikomi tik lokaliai.

### Santrauka .gitignore

| Veiksmas | Taisyklė |
|----------|----------|
| **Palikta** | `archive/` – archyvas lokalus; doc nuorodos ir disclaimer atnaujinti. |
| **Palikti** | `.cursor/`, `*_dienos_planas.md`, konfidencialūs šablonai, `docs/di_detektoriai.html`. |
| **Nepridėti** | Nieko, kas ignoruotų `docs/**/*.md` arba `src/**` – tokios taisyklės nėra ir nereikia. |

---

## 6. Low-hanging repo pagerinimai

1. **Pataisyti ARCHIVE_README nuorodas** – visur pakeisti `docs/archive/ARCHIVE_README.md` → `docs/archive/README.md` (arba pervadinti failą į ARCHIVE_README.md). Failai: DOCUMENTATION_INDEX.md, docs/README.md, DOCUMENTATION_QUICK_REF.md, LEAN_INDEX.md, PRE_LAUNCH_DOCUMENTATION_CLEANUP.md.
2. **Nuspręsti dėl archive/** – pašalinti `archive/` iš .gitignore ir įkomituoti esamą `docs/archive/` turinį (jei norima turėti archyvą repo); arba visur doc'e pažymėti „archyvas ne repo“ ir nurodyti tik aktyvius kelius.
3. **Sukurti trūkstamus SOT failus** – pridėti minimalius `docs/development/CERTIFICATE_CONTENT_SOT.md` ir (jei reikia) `SERTIFIKATU_NUORODA_CTA_IVYKDYMAS.md`, kad GOLDEN_STANDARD ir PDF_GENERATION_AGENT_MEMORY neturėtų nutrūkusių nuorodų.
4. **SUMMARY_SLIDE_SPEC** – arba atkurti failą `docs/development/SUMMARY_SLIDE_SPEC.md` (turinį iš archyvo arba iš CONTENT_AGENT/CURRICULUM_AGENT aprašų), arba visur nuorodas pakeisti į „žr. CONTENT_AGENT / CURRICULUM_AGENT santraukos skaidrės skyrių“.
5. **GOLDEN_STANDARD – M4_BADGE_PILLS nuoroda** – pakeisti į nuorodą į `ModuleCompleteScreen.tsx` arba sukurti trumpą `M4_BADGE_PILLS_HIDDEN_TREASURE_ANALIZE.md` su „žr. ModuleCompleteScreen“.
6. **RELEASE_QA_CHECKLIST – archive/development nuorodos** – pakeisti nuorodas į MOBILE_UI_UX_AUDIT ir EN_LANGUAGE_STANDARD į „docs/development/...“ jei tuos failus perkelsite į development, arba į „(archyve)“ su pastaba.
7. **Root memo failai** – `memo.md`, `mokymu_komanda_memo.md`: perkelti į `docs/memo/` arba įtraukti į .gitignore jei asmeniniai; taip sumažins root triukšmą.
8. **Vienas „Audito ataskaitos“ dokumentas** – galima sujungti AUDITO_ATASKAITA_MODULIAI_1_6_MOBILE_UX ir AUDITO_ATASKAITA_MODULIAI_1_6_UI_UX_LEARNING į vieną `docs/audits/MODULIAI_1_6_UX_AUDITAS.md` su skyriais Mobile + Learning.
9. **Nuorodų formatas** – visur naudoti `docs/` (ne `docs\`) kad būtų nuoseklu visose platformose.
10. **DOCUMENTATION_INDEX §4** – pridėti aiškų įspėjimą: „Jei archive/ yra .gitignore, šie keliai rodo tik lokalią / istorinę struktūrą.“

---

## 7. Siūloma repo dokumentų struktūra

Tinkama tolimesniam vystymui ir mažesniam triukšmui:

```
repo root
├── README.md
├── CHANGELOG.md
├── ROADMAP.md
├── TODO.md
├── turinio_pletra.md                    # SOT M1–3
├── docs/
│   ├── README.md                        # Žinutė: „Navigacija → DOCUMENTATION_INDEX“
│   ├── DOCUMENTATION_QUICK_REF.md       # 1-as sluoksnis (agentams)
│   ├── LEAN_INDEX.md                   # 2-as sluoksnis (~20 failų)
│   ├── DOCUMENTATION_INDEX.md           # Pilnas aktyvus + archyvo sąrašas
│   ├── CONTENT_MODULIU_ATPAZINIMAS.md
│   ├── VARTOTOJU_ATSILIEPIMAI_BENDRAS.md
│   ├── marketing_plan.md
│   ├── LinkedIn_audience_insights_*.md
│   ├── turinio_pletra_moduliai_4_5_6.md
│   ├── turinio_pletra_moduliai_7_8_9.md
│   ├── turinio_pletra_moduliai_10_11_12.md
│   ├── turinio_pletra_moduliai_13_14_15.md
│   ├── MODULIO_*_SKAIDRIU_EILES.md     # Oficialios eilės
│   ├── PEDAGOGINE_ANALIZE_MODULIAI_4_5_6.md
│   ├── SKAIDRIU_TIPU_ANALIZE.md
│   ├── MODULIO_4_TOBULINIMAI_GERIAUSIOS_PRAKTIKOS.md
│   ├── EXECUTIVE_ATASKAITA_PROGRAMOS_1_IKI_15.md
│   ├── KURSO_1_IKI_15_ANALIZE_APIBENDRINIMAS.md
│   ├── AUTOMATIZAVIMO_IRANKIAI_VERSLUI.md
│   ├── PRE_LAUNCH_DOCUMENTATION_CLEANUP.md   # arba → archive
│   ├── getting-started/
│   │   └── QUICK_START.md
│   ├── deployment/
│   │   ├── DEPLOYMENT.md
│   │   ├── GITHUB_SETUP.md
│   │   └── INTEGRATION_OVERVIEW.md
│   ├── development/                     # Aktyvūs specai ir checklist
│   │   ├── GOLDEN_STANDARD.md
│   │   ├── AGENT_ORCHESTRATOR.md
│   │   ├── CONTENT_AGENT.md
│   │   ├── CURRICULUM_AGENT.md
│   │   ├── SCHEME_AGENT.md
│   │   ├── UI_UX_AGENT.md
│   │   ├── USER_JOURNEY_AGENT.md
│   │   ├── DATA_AGENT_*.md
│   │   ├── PAPRASTOS_KALBOS_GAIRES.md
│   │   ├── RELEASE_QA_CHECKLIST.md
│   │   ├── RELEASE_QA_RUN.md
│   │   ├── TEST_REPORT.md
│   │   ├── TESTING_CHECKLIST.md
│   │   ├── PLAN_AGENTAI_DARBAI.md
│   │   ├── CODEBASE_WHAT_IS_DONE.md
│   │   ├── context-engineering/
│   │   ├── CERTIFICATE_CONTENT_SOT.md   # SUKURTI jei trūksta
│   │   ├── SUMMARY_SLIDE_SPEC.md        # atkurti arba nuorodas pakeisti
│   │   └── ... (kiti aktyvūs)
│   ├── archive/                         # Tik jei ĮTRAUKTAS į repo (.gitignore pašalintas)
│   │   ├── README.md                    # arba ARCHIVE_README.md
│   │   ├── development/                 # Vienkartinės analizės, seni planai
│   │   ├── root/                        # Iš root perkelti ataskaitos
│   │   └── moduliai_7_8_9/
│   └── audits/                          # Pasirinktinai – vienas katalogas audito ataskaitoms
│       └── MODULIAI_1_6_UX_*.md
├── src/
├── scripts/
└── sales-os/
```

**Principai:**

- **Vienas įėjimas** – DOCUMENTATION_QUICK_REF → LEAN_INDEX → DOCUMENTATION_INDEX.
- **SOT vienoje vietoje** – turinys, dizainas, duomenys, atsiliepimai – kaip dokumentuota DOCUMENTATION_INDEX.
- **development/** – tik aktyvūs procesai ir specai; vienkartinės analizės → **archive/development/**.
- **archive/** – įtrauktas į repo (be .gitignore) arba aiškiai pažymėtas „ne repo“ visuose indeksuose.

---

**Audito pabaiga.** **Įgyvendinta (2026-03):** (1) archive lieka lokalus; ARCHIVE_README → README visur, (2) nutrūkusios nuorodos pataisytos, (3) sukurti CERTIFICATE_CONTENT_SOT.md, SUMMARY_SLIDE_SPEC.md; M4_BADGE nuoroda → ModuleCompleteScreen, (4) DOCUMENTATION_INDEX §4 – disclaimer „archyvas ne repo“. Toliau: pasirinktinai perkelti vienkartines analizes į docs/development/analysis/ (repo).
