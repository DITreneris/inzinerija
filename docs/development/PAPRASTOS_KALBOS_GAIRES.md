# Paprastos kalbos gairės – vengti žargono, rašyti paprastam žmogui

> **Paskirtis:** Vartotojui matomi tekstai (antraštės, aprašymai, CTA, kortelių pavadinimai) rašomi **paprastai** – kad paprastam žmogui būtų aišku ir suprantama. Vengiama vadybinio ir techninio žargono be paaiškinimo.
> **Kada taikyti:** Visiems moduliams, ypač Moduliams 7–9. CONTENT_AGENT ir QA_AGENT naudoja šį sąrašą.
> **Nuoroda:** `docs/development/M9_ZARGONO_AUDITAS_IR_PLANAS_PAPRASTAI_KALBAI.md`

---

## 1. Principas

- **Rašyti paprastai, paprastam žmogui** – kad būtų aišku ir suprantama be žargono.
- Jei terminas **būtinas** (pvz. kopijuojamame prompte) – vienas sakinys paaiškinimo arba paprastas atitikmuo skliausteliuose.
- **Vartotojui matomi** tekstai (pavadinimai, aprašymai, „Ką darysi“, kortelės) – **be** nepaaiškinto žargono. Kopijuojamuose promptuose (ROLE, TASK) techniniai žodžiai gali likti, bet **antraštės ir aprašymai** dalyviui – paprasta kalba.

---

## 2. Žargono „vengti arba paaiškinti“ sąrašas

| Žargonas / terminas | Paprastas atitikmuo arba paaiškinimas (vienas sakinys) |
|---------------------|--------------------------------------------------------|
| **ROI** | Grąža iš investicijų (kiek pinigų grįžta, palyginus su išleistais). Jei reikia palikti – „grąža iš investicijų (ROI)“ |
| **HR** | Personalas, darbuotojai, darbuotojų. Pvz. „HR analitika“ → „Darbuotojų / mokymų naudingumo įvertinimas“ |
| **CFO** | Finansų vadovas, finansų įžvalgos. Pvz. „CFO (finansai)“ → „Finansų įžvalgos (pajamos, sąnaudos, rizikos)“ |
| **EBITDA** | Pelnas prieš palūkanas, mokesčius ir nusidėvėjimą (pagrindinis pelno rodiklis). Jei reikia – „pagrindiniai pelno rodikliai (EBITDA, marža)“ |
| **NPS** | Klientų pasitenkinimo apklausa (NPS – „ar rekomenduotum mus?“). Arba tiesiog „klientų atsiliepimai ir apklausos“ |
| **SWOT** | Stiprybės, silpnybės, galimybės, grėsmės. Galima palikti su paaiškinimu: „konkurentų analizė (stiprybės, silpnybės, galimybės, grėsmės)“ |
| **Senior** / **vyresnysis** (rolėje) | Gali palikti kontekste „patyręs analitikas“ arba „analitikas su patirtimi“; vengti „Senior“ be konteksto |
| **influencer** / **influenceriai** | Įtakoję žmonės, žmonės su dideliu atpažimumu (daug sekėjų / skaitančių). Pvz. „Temos, sentimentas, įtakoję žmonės“ |
| **KPI** | Pagrindiniai veiklos rodikliai (ką matuojame). Jei būtina – „pagrindiniai rodikliai (KPI)“ |
| **DAX** | Power BI skaičiavimų kalba (formulės lentelėms). Galima „Power BI formulės (DAX)“ arba „skaičiavimai Power BI“ |
| **EDA** | Tiriamoji duomenų analizė (pažiūrėti, kas duomenyse, prieš modelius). Galima „tiriamoji analizė (EDA)“ arba „duomenų apžvalga“ |
| **Geštaltas** | Vizualinio suvokimo principai (grupavimas, kontrastas). Galima „dizaino principai (Geštaltas)“ arba „vizualinio skaidrumo principai“ |
| **Executive Summary** | Vadovybės santrauka (1–2 puslapiai). Arba „vadovybės santrauka“ |
| **segmentacija** | Skirstymas į grupes (pvz. pagal poveikį). Galima „skirstymas į grupes“ |
| **data model** | Duomenų struktūra (kaip lentelės susijusios). Galima „duomenų struktūra“ |
| **sentimentas** | Nuotaika, tonas (teigiamas / neutralus / neigiamas). Gali likti; jei reikia – „nuotaika (sentimentas)“ |

---

## 3. Pavyzdžiai – prieš ir po

| Vieta | Prieš (žargonas) | Po (paprasta kalba) |
|-------|-------------------|---------------------|
| Hub kortelė | „CFO (finansai)“ | „Finansų įžvalgos (pajamos, sąnaudos, rizikos)“ |
| Hub kortelė | „HR analitika“ | „Darbuotojų mokymų naudingumo įvertinimas“ |
| Hub kortelė | „Mokymų ROI, segmentacija“ | „Mokymų naudingumas, skirstymas į grupes“ |
| Skaidrės antraštė | „Social media monitoring“ | „Stebėjimas socialiniuose tinkluose“ |
| Aprašymas | „influenceriai, reputacijos rizika“ | „įtakoję žmonės, reputacijos rizika“ |
| Intro | „atsiliepimus ar NPS“ | „klientų atsiliepimus ir apklausas“ |
| Scenarijus | „EBITDA, marža, rizikos“ | „pagrindiniai pelno rodikliai, marža, rizikos“ |
| Scenarijus | „SWOT, silpnos vietos, 30 d. planas“ | „stiprybės ir silpnybės, galimybės, 30 dienų planas“ |

---

## 4. Kreipinys ir terminologija (LT vs EN)

| Sritis | LT | EN |
|--------|----|-----|
| **Kreipinys į dalyvį** | **Tu** (ne Jūs). Vartoti: tavo, tu, gali, išmokai, paspausk, įrašyk, pasirink, peržiūrėk, tęsk. Vengti: Jūs, jūsų, galite, paspauskite, įrašykite, peržiūrėkite. | You (you, your). |
| **Technologija** | **DI** (duomenų intelektas / generatyvus DI). Vartotojui matomi tekstai – „DI“, „DI sistema“, „DI įrankis“. | **AI** (artificial intelligence). Vartotojui matomi tekstai – „AI“, „AI system“, „AI tool“. |
| **Veiksmažodžiai (LT)** | Vienaskaita, 2-as asmuo: Paspausk (ne Paspauskite), Įrašyk (ne Įrašykite), Pasirink (ne Pasirinkite), Peržiūrėk (ne Peržiūrėkite), Tęsk (ne Tęskite), pažymėk (ne pažymėkite). |

**Kada tikrinti:** Švieži pakeitimai (locale, nauji komponentai), frontpage (home), modulių puslapis, skaidrės moduliuose 1–6. Prieš release – mikro UI/UX copy audit: ar LT naudoja tu formą ir DI; ar EN naudoja AI.

---

## 5. Kas atsakingas

- **CONTENT_AGENT:** Rašant ar redaguojant turinį – tikrinti pagal šį sąrašą; vartotojui matomus tekstus rašyti paprasta kalba; LT – tu forma ir DI; EN – AI.
- **QA_AGENT:** Prieš release – bent vieno modulio (pvz. M9) patikra: ar pavadinimuose ir aprašymuose nėra nepaaiškinto žargono (žr. RELEASE_QA_CHECKLIST §8); mikro copy audit: LT Jūs→Tu, AI↔DI pagal kalbą (§4).
