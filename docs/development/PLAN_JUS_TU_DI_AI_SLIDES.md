# Planas: Jūs→Tu ir DI/AI skaidrėse bei susijusiuose komponentuose

> **Tikslas:** LT – kreipinys **Tu** (ne Jūs); vartotojui matomi tekstai – **DI**. EN – **AI** (ne DI), **you/your**.  
> **Šaltinis:** `docs/development/PAPRASTOS_KALBOS_GAIRES.md` §4 (Kreipinys, Technologija).

---

## 1. Principai

| Kalba | Kreipinys | Technologija |
|-------|-----------|--------------|
| **LT** | Tu, tavo, gali, pasirink, peržiūrėk, paspausk, įrašyk, nustatyk, grįžk. **Vengti:** Jūs, jūsų, galite, pasirinkite, peržiūrėkite, paspauskite. | **DI** (duomenų intelektas) |
| **EN** | You, your, you can, select, review, click, enter. | **AI** (artificial intelligence) |

---

## 2. Konfigūracijos failai (be locale – tiesioginis pakeitimas)

Šie failai turi **tik LT** arba jau turi atskirą EN variantą. Keisti **tekstą vietoje** (jūsų→tavo, Paspauskite→Paspausk).

### 2.1 `src/components/slides/shared/workflowComparisonConfig.ts`

| Vieta | Dabar (LT) | Pakeisti į |
|-------|------------|------------|
| `WORKFLOW_MODES.workflow.noteText` | `'Pagal jūsų planą.'` | `'Pagal tavo planą.'` |
| `WORKFLOW_MODES.workflow.outputExample` | `'... pagal jūsų nurodymus ir pateiktus duomenis.'` | `'... pagal tavo nurodymus ir pateiktus duomenis.'` |
| `OUTPUT_TYPES.document.previewLines` fallback | `'jūsų nurodymas'` | `'tavo nurodymas'` |
| `OUTPUT_TYPES.plan.previewLines` fallback | `'jūsų nurodymas'` | `'tavo nurodymas'` |
| `OUTPUT_TYPES.analysis.previewLines` fallback | `'jūsų nurodymas'` | `'tavo nurodymas'` |
| `LLM_INFO.workflow.items` Atmintis | `'Kontekstas iš jūsų pateiktų duomenų'` | `'Kontekstas iš tavo pateiktų duomenų'` |
| `LLM_INFO.workflow.items` Žinių bazė | `'... jungtis prie jūsų dokumentų'` | `'... jungtis prie tavo dokumentų'` |
| `DIAGRAM_LABELS_LT.workflow.bottomNoteWorkflow` | `'... pagal jūsų planą'` | `'... pagal tavo planą'` |
| `DIAGRAM_LABELS_LT.workflow.llmClickAria` | `'... paspauskite daugiau'` | `'... paspausk daugiau'` |

**EN blokai** (`WORKFLOW_MODES_EN`, `DIAGRAM_LABELS_EN`) – jau naudoja "AI" ir "your"; nieko keisti.

---

### 2.2 `src/components/slides/shared/stepExplanations.ts`

| Vieta | Dabar | Pakeisti į |
|-------|--------|------------|
| `body` (Gamma/Canva) | `'... Jūs tik patikrinkite ir koreguokite ...'` | `'... Tu tik patikrink ir koreguok pagal poreikį.'` |

---

### 2.3 `src/components/slides/shared/ragDuomenuRuosimasLayout.ts`

| Vieta | Dabar | Pakeisti į |
|-------|--------|------------|
| `diagramHint` | `' Paspauskite žingsnį, kad pamatytumėte promptą.'` | `' Paspausk žingsnį, kad pamatytum promptą.'` |
| `diagramStepAria` | `'... Paspauskite promptui.'` | `'... Paspausk promptui.'` |

---

### 2.4 `src/components/slides/shared/diPrezentacijosWorkflowConfig.ts`

| Vieta | Dabar | Pakeisti į |
|-------|--------|------------|
| `interactiveHint` | `' Paspauskite žingsnį, kad pamatytumėte paaiškinimą.'` | `' Paspausk žingsnį, kad pamatytum paaiškinimą.'` |
| `stepAria` | `'... Paspauskite paaiškinimui.'` | `'... Paspausk paaiškinimui.'` |

---

### 2.5 `src/components/slides/shared/LlmAutoregressiveDiagram.tsx`

| Vieta | Dabar | Pakeisti į |
|-------|--------|------------|
| `ariaClick` | `' Paspauskite bloką, kad pamatytumėte paaiškinimą.'` | `' Paspausk bloką, kad pamatytum paaiškinimą.'` |
| `ariaStep` | `'. Paspauskite paaiškinimui.'` | `'. Paspausk paaiškinimui.'` |

---

### 2.6 `src/components/slides/shared/TurinioWorkflowDiagram.tsx`

| Vieta | Dabar | Pakeisti į |
|-------|--------|------------|
| `aria-label` (apie žingsnį) | `'... Paspauskite žingsnį ...'` | `'... Paspausk žingsnį ...'` |
| Žingsnio aria | `'... Paspauskite paaiškinimui.'` | `'... Paspausk paaiškinimui.'` |

---

### 2.7 `src/components/slides/shared/RlProcessDiagram.tsx`

| Vieta | Dabar | Pakeisti į |
|-------|--------|------------|
| `aria-label` | `'... Paspauskite žingsnį ...'` | `'... Paspausk žingsnį ...'` |
| Žingsnio aria | `'... Paspauskite paaiškinimui.'` | `'... Paspausk paaiškinimui.'` |

---

### 2.8 `src/components/slides/shared/questions/MatchingQuestion.tsx`

| Vieta | Dabar | Pakeisti į |
|-------|--------|------------|
| Instrukcija | `'Paspauskite kairėje, tada dešinėje – sujunkite teisingas poras.'` | `'Paspausk kairėje, tada dešinėje – sujunk teisingas poras.'` |

---

## 3. ProcessStepper – Custom GPT žingsniai (LT masyvas)

**Failas:** `src/components/slides/shared/ProcessStepper.tsx`  
**Konstanta:** `CUSTOM_GPT_STEPS` (eil. 19–72). EN variantas `CUSTOM_GPT_STEPS_EN` jau teisingas.

Pakeitimai **in-place** (Jūs → Tu, veiksmažodžiai vienaskaita):

| Žingsnis | Laukas | Dabar | Pakeisti į |
|----------|--------|--------|------------|
| 1 | actionChecklist[0] | `'Užrašykite vienu sakiniumi...'` | `'Užrašyk vienu sakiniumi: kam bus naudojamas asistentas.'` |
| 1 | actionChecklist[1] | `'Pasirinkite 1–2 konkrečius...'` | `'Pasirink 1–2 konkrečius naudojimo atvejus (pvz. „santraukos“, „atsakymai klientams“).'` |
| 2 | actionChecklist[0] | `'Parašykite: „Tu esi [rolė]“.'` | (jau Tu formoje) |
| 2 | actionChecklist[1] | `'Nustatykite toną...'` | `'Nustatyk toną: profesionalus / draugiškas / glaustas.'` |
| 2 | actionChecklist[2] | `'Apribokite temas...'` | `'Apribok temas: ką asistentas moka ir ko ne.'` |
| 3 | description | `'... Atidarykite Custom GPT...'` | `'... Atidaryk Custom GPT kūrimo langą.'` |
| 3 | actionChecklist[0] | `'Prisijunkite prie ChatGPT...'` | `'Prisijunk prie ChatGPT (Plus būtina).'` |
| 3 | actionChecklist[2] | `'Pasirinkite „Configure“ ir pradėkite...'` | `'Pasirink „Configure“ ir pradėk nuo pavadinimo.'` |
| 6 | actionChecklist[2] | `'... grįžkite į Instructions...'` | `'... grįžk į Instructions ir pataisyk.'` |
| 7 | actionChecklist[0] | `'Pasirinkite: Only me...'` | `'Pasirink: Only me / Anyone with link / Public.'` |
| 7 | actionChecklist[1] | `'Nustatykite (jei reikia)...'` | `'Nustatyk (jei reikia) kategoriją ir žymes.'` |
| 7 | actionChecklist[2] | `'Paspauskite Publish.'` | `'Paspausk Publish.'` |
| 8 | actionChecklist[0] | `'Stebėkite, kokios užklausos...'` | `'Stebėk, kokios užklausos dažnos ir ar atsakymai tinka.'` |
| 8 | actionChecklist[1] | `'... atidarykite Configure...'` | `'... atidaryk Configure ir pataisyk Instructions.'` |

---

## 4. Nauji locale raktai ir pakeitimai

### 4.1 Namespace `stepper` (lt.json / en.json)

| Raktas | LT (dabar → pataisyti) | EN (palikti arba patikrinti) |
|--------|-------------------------|------------------------------|
| `summaryHeading` | `"Santrauka: ką jūsų GPT jau turi"` → **`"Santrauka: ką tavo GPT jau turi"`** | "Summary: what your GPT already has" (OK) |

---

### 4.2 Namespace `testPractice` (lt.json / en.json)

| Raktas | LT dabar | LT naujas | EN (patikrinti) |
|--------|----------|-----------|------------------|
| `yourTaskAria` | "Jūsų užduotis" | **"Tavo užduotis"** | "Your task" |
| `radarDesc` | "Kiekviena ašis rodo jūsų rezultatą..." | **"Kiekviena ašis rodo tavo rezultatą atitinkamoje kategorijoje."** | "Each axis shows your result..." |
| `selectScenarioTitle` | "Pasirinkite scenarijų (4×4)" | **"Pasirink scenarijų (4×4)"** | "Select scenario (4×4)" |
| `m6ProgressLabel` | (naujas) | **"Tavo progresas: {{done}} iš {{total}} scenarijų užbaigta"** | "Your progress: {{done}} of {{total}} scenarios completed" |
| `m6JourneyHeading` | (naujas) | **"Tavo kelionė modulyje"** | "Your journey in the module" |
| `selectScenarioHintA` | (naujas) | **"Pasirink vieną iš 4 rekomenduojamų – arba peržiūrėk visus 16 hub skaidrėje."** | (EN atitikmuo) |
| `selectScenarioHintB` | (naujas) | **"Pasirink scenarijų žemiau – rekomenduojami pradedantiesiems rodomi pirmi."** | (EN atitikmuo) |
| `selectOneOf4OrHub` | (naujas) | **"Pasirink vieną iš 4 žemiau arba atidaryk hub – visi 16 scenarijų (4×4)."** | (EN atitikmuo) |
| `selectOneScenarioBelow` | (naujas) | **"Pasirink vieną scenarijų žemiau (rekomenduojami pirmi) arba Pirmyn – atsidarys 4×4 lentelė."** | (EN atitikmuo) |
| `scenarioGridTitle` | (naujas) | **"Pasirink scenarijų (4×4)"** | "Select scenario (4×4)" |
| `scenarioGridDesc` | (naujas) | **"4 komandos veikėjai – kiekvienas atlieka po 4 užduotis. Pasirink veikėją, paskui – vieną iš jo 4 scenarijų."** | (EN atitikmuo) |
| `step1SelectCharacter` | (naujas) | **"1/2 – Pasirink veikėją (po 4 scenarijus kiekvienas)"** | (EN atitikmuo) |
| `step2SelectScenario` | (naujas) | **"2/2 – Pasirink vieną iš šio veikėjo 4 scenarijų"** | (EN atitikmuo) |
| `wellDoneNextHint` | (naujas) | **"Puikiai! Dabar gali pereiti prie praktinių užduočių."** | "Well done! You can now go to practical tasks." |
| `artefactDesc` | (naujas) | **"Vienas paruoštas artefaktas (tyrimo ataskaita arba strategijos santrauka), kurį gali naudoti darbe."** | "One ready artefact... that you can use at work." |
| `selfAssessmentAria` | (naujas) | **"{{label}} – pasirink"** (vietoj "pasirinkite") | "{{label}} – select" |
| `yourChoiceLabel` | jau "Tavo pasirinkimas" | (OK) | (OK) |

---

### 4.3 Namespace `contentSlides` (lt.json / en.json)

| Raktas | LT dabar | LT naujas | Pastaba |
|--------|----------|-----------|---------|
| `practiceTasksHint` | (naujas) | **"Visas šiuose mokymuose pateiktas praktines užduotis gali atlikti naudodamas bet kurį modernų generatyvinio DI įrankį."** | Vietoj hardcoded ContentSlides 1788 |
| `introBodyRlOrder` | (naujas) | **"DI modeliai skaito ir apdoroja informaciją nuosekliai. Svarbiausia informacija turi būti pateikta pirmiausia, kad rezultatas atitiktų tavo lūkesčius."** | Vietoj 2852 introBody |
| `practiceSummaryDefaultSubtitle` | "Jūs sėkmingai baigėte... galite kurti" | **"Sveikiname! Tu sėkmingai baigei Prompt Anatomijos mokymą ir dabar gali kurti profesionalius, struktūruotus promptus."** | Jūs→Tu, galite→gali |
| `blockMetaBody` | "... interpretuoja jūsų užduotį" | **"... interpretuoja tavo užduotį"** | jūsų→tavo |
| `correctLabelShort` | (naujas) | **"Teisingai!"** | Skaidrėse brief/preCopy check |
| `wrongLabelShort` | (naujas) | **"Neteisingai."** | Skaidrėse brief/preCopy check |
| `checkText` | "... grįžkite ir pakeiskite" | **"... grįžk ir pakeisk parametrus."** | grįžkite→grįžk |
| `clickCardsHint` | "Paspauskite korteles..." | **"Paspausk korteles žemiau ir sužinok."** | |
| `promptPlaceholder` | "Įrašykite čia..." | **"Įrašyk čia pataisytą promptą..."** | |
| `nextStepCtaLabel` | "Pereikite prie kito modulio" | **"Pereik prie kito modulio"** | |
| `whatYouLearnedHeading` | "Ką išmokote:" | **"Ką išmokai:"** | |

**ContentSlides.tsx:**  
- 873: `aria-label="Pasirinkite užduoties tipą"` → `aria-label={t('contentSlides:chooseTaskTypeAria')}` (raktas jau egzistuoja kaip "Pasirink užduoties tipą").  
- 480, 527, 1675: "Teisingai!" / "Neteisingai." → `t('contentSlides:correctLabelShort')` / `t('contentSlides:wrongLabelShort')`.  
- 1788: naudoti `t('contentSlides:practiceTasksHint')`.  
- 2852: naudoti `t('contentSlides:introBodyRlOrder')` (arba per turinio loader, jei stringas ateina iš JSON).  
- 4373: naudoti `t('contentSlides:practiceSummaryDefaultSubtitle')`.

---

### 4.4 Bendri raktai – „Teisingai!“ / „Neteisingai.“ (klausimų komponentai)

Geriau vienas bendras raktas (pvz. `common` arba `quiz` jau turi `correctLabel`/`incorrectLabel`).

- **Variantas A:** Naudoti **`quiz:correctLabel`** ir **`quiz:incorrectLabel`** visur (TrueFalseQuestion, McqQuestion, ScenarioQuestion, ContentSlides).  
- **Variantas B:** Įvesti **`common:correctShort`** / **`common:wrongShort`** („Teisingai!“, „Neteisingai.“) ir naudoti skaidrėse; quiz palikti su pilnais sakiniais.

**Rekomenduojama:** A – quiz raktai jau yra; komponentuose tiesiog naudoti `useTranslation('quiz')` ir `t('correctLabel')` / `t('incorrectLabel')`.

| Failas | Dabar | Pakeisti į |
|--------|--------|------------|
| `TrueFalseQuestion.tsx` | `'✓ Teisingai!'` / `'✗ Neteisingai.'` | `t('quiz:correctLabel')` / `t('quiz:incorrectLabel')` |
| `McqQuestion.tsx` | tas pats | tas pats |
| `ScenarioQuestion.tsx` | tas pats | tas pats |

---

### 4.5 Celebration.tsx

| Pranešimas | Dabar | Raktas (naujas arba common) | LT | EN |
|------------|--------|-----------------------------|----|----|
| module | "Modulis baigtas! 🎉" | `celebration.moduleDone` | (OK) | "Module complete! 🎉" |
| quiz | "Puikiai! 🌟" | `celebration.quizDone` | (OK) | "Well done! 🌟" |
| task | "Užduotis atlikta!" | `celebration.taskDone` | (OK) | "Task complete!" |
| CTA | "Tęskite į kitą modulį →" | `celebration.continueNext` | **"Tęsk į kitą modulį →"** | "Continue to next module →" |

Pridėti namespace **`celebration`** arba į **`common`**: `celebrationModuleDone`, `celebrationQuizDone`, `celebrationTaskDone`, `celebrationContinueNext`. Komponente naudoti `t()`.

---

### 4.6 PracticalTask.tsx

| Vieta | Dabar | Pakeisti į |
|-------|--------|------------|
| 336 | `'... įrašykite savo žodžius...'` | **'... įrašyk savo žodžius vietoje jų.'** (arba raktas `contentSlides:inputHintPlaceholder`) |
| 363 | `'Juodraštis išsaugotas – galite grįžti bet kada'` | **'Juodraštis išsaugotas – gali grįžti bet kada'** arba raktas |

Gali būti in-place arba per `contentSlides` / `common` raktą.

---

## 5. TestPracticeSlides.tsx – hardcoded eilutės

Šie tekstai turi būti išvesti į **testPractice** raktus (žr. 4.2) ir komponente pakeisti į `t('testPractice:...')`:

- "Jūsų progresas: ..." → `t('testPractice:m6ProgressLabel', { done, total })`
- "Jūsų kelionė modulyje" → `t('testPractice:m6JourneyHeading')`
- "Pasirinkite vieną iš 4 rekomenduojamų..." / "Pasirinkite scenarijų žemiau..." → atitinkami testPractice raktai
- "Pasirinkite scenarijų (4×4)" (h3) → `t('testPractice:selectScenarioTitle')` (pataisytas į "Pasirink...")
- "4 komandos veikėjai... Pasirinkite veikėją..." → `t('testPractice:scenarioGridDesc')`
- "1/2 – Pasirinkite veikėją..." → `t('testPractice:step1SelectCharacter')`
- "2/2 – Pasirinkite vieną iš šio veikėjo..." → `t('testPractice:step2SelectScenario')`
- "Puikiai! Dabar galite pereiti..." → `t('testPractice:wellDoneNextHint')`
- "Vienas paruoštas artefaktas... kurį galite naudoti" → `t('testPractice:artefactDesc')`
- Savęs vertinimo `aria-label` "{{label}} – pasirinkite" → `t('testPractice:selfAssessmentAria', { label: c.label })` su raktu "{{label}} – pasirink"
- "Jūsų pasirinkimas:" → jau yra `yourChoiceLabel` "Tavo pasirinkimas" – tik įsitikinti, kad naudojamas

---

## 6. Įgyvendinimo eilė

1. **Fazė 1 – Konfigai (be i18n)**  
   workflowComparisonConfig, stepExplanations, ragDuomenuRuosimasLayout, diPrezentacijosWorkflowConfig, LlmAutoregressiveDiagram, TurinioWorkflowDiagram, RlProcessDiagram, MatchingQuestion. ProcessStepper CUSTOM_GPT_STEPS.

2. **Fazė 2 – Locale**  
   Pridėti / pataisyti raktus: stepper, testPractice, contentSlides, celebration (arba common). LT: Jūs→Tu, jūsų→tavo, galite→gali, pasirinkite→pasirink ir t. t.

3. **Fazė 3 – Komponentai**  
   ContentSlides.tsx (aria, Teisingai/Neteisingai, practiceTasksHint, introBody, practiceSummaryDefaultSubtitle). TestPracticeSlides.tsx (visi nauji testPractice raktai). TrueFalseQuestion, McqQuestion, ScenarioQuestion (quiz:correctLabel/incorrectLabel). Celebration (t()). PracticalTask (in-place arba raktai).

4. **Fazė 4 – Patikra**  
   LT: grep Jūs/jūsų/galite/pasirinkite/paspauskite – turėtų likti tik citatos ar specialūs kontekstai. EN: vartotojui matomi „DI“ pakeisti į „AI“, išskyrus produktų pavadinimus (pvz. „DI Operacinis centras“ gali likti pavadinime).

---

## 7. Greita kontrolė (grep)

Po pakeitimų:

```bash
# LT – neturėtų būti (arba tik komentarai/citatos):
grep -rn "Jūs " src/components/slides --include="*.tsx" --include="*.ts"
grep -rn "jūsų " src/components/slides --include="*.tsx" --include="*.ts"
grep -rn "galite " src/components/slides --include="*.tsx" --include="*.ts"
grep -rn "Pasirinkite " src/components/slides --include="*.tsx" --include="*.ts"
grep -rn "Paspauskite " src/components/slides --include="*.tsx" --include="*.ts"
```

---

**CHANGES:** Sukurtas `docs/development/PLAN_JUS_TU_DI_AI_SLIDES.md` – planas su raktais ir pakeitimais.  
**NEXT:** Vykdyti pagal fazes 1–4; pradėti nuo 2.1 (workflowComparisonConfig) ir ProcessStepper.
