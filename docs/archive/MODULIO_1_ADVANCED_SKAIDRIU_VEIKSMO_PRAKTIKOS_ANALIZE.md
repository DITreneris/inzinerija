# Modulio 1 Advanced skaidrių peržiūra: ar tinka veiksmo praktika?

> **Tikslas:** Atidžiai įvertinti, ar Modulio 1 „Advanced“ skaidrėms (id 11, id 18) tinka ta pati veiksmo skaidrių praktika (Trumpai → Daryk dabar → Kopijuojamas promptas → Patikra → Optional), **neprarandant informacijos ir išlaikant kodą**.

---

## 1. Kas yra Modulio 1 Advanced skaidrės?

| ID  | Pavadinimas                       | Tipas        | Komponentas              | Turinio vieta      |
|-----|-----------------------------------|--------------|--------------------------|--------------------|
| **11** | 6️⃣ Advanced Parameters           | `advanced`   | `AdvancedBlockSlide`     | **100% komponente** |
| **18** | 6️⃣ Advanced Parameters (II)       | `advanced-2` | `AdvancedParameters2Slide` | **100% komponente** |

Abi skaidrės **neturi** `content` `modules.json` – visas tekstas, lentelės, Copy blokai ir vizualai užkoduoti `BlockSlides.tsx`.

---

## 2. Dabartinė struktūra (be informacijos praradimo)

### Skaidrė 11 (AdvancedBlockSlide)

- **Tikslas** – Advanced Parameters (tikslumas vs kūryba)
- **Kas yra** – neprivalomas, galingas blokas (mažiau fantazijų, gilesnė analizė, tono valdymas)
- **Temperature** – vizualus skalės pavyzdys (Tikslumas ↔ Kūrybiškumas), 3 diapazonai (0–0.3, 0.4–0.7, 0.8–1.0) su spalvotais blokais
- **Reasoning gylis** – Greitas / Normalus / Gilus
- **Business cheat sheet** – lentelė (Užduotis × Temperature × Reasoning): ataskaitos, SOP, el. laiškai, marketingas, strategija
- **Safe default** – 0.4–0.6, Normal; kada naudoti
- **Ready-to-copy pavyzdžiai** – 3 blokai su CopyButton: Verslo analizė, Marketingo tekstas, SOP/instrukcija
- **Dažniausios klaidos** – 3 punktai
- **Mini taisyklė** – Temperature = KŪRYBA, Reasoning = MĄSTYMAS
- **TemplateBlock** – kopijuojamas šablonas „ADVANCED: Temperature: [0.2–0.7]. Reasoning: [normal/extended].“

### Skaidrė 18 (AdvancedParameters2Slide)

- **Tikslas** – atsakymo kontrolė (ilgis, fokusas, pasikartojimai); įspėjimas: parametrai neišgelbės blogos užduoties
- **Max Tokens** – `<details>` atidarytas; lentelė (50–100, 150–300, 400–800, 1000+); verslo pavyzdys (CopyButton); klaida
- **Top-p** – `<details>`; 3 diapazonai; verslo pavyzdys; taisyklė (Temperature + Top-p)
- **Frequency Penalty** – `<details>`; verslo pavyzdys; kada naudinga
- **Presence Penalty** – `<details>`; NENAUDOTI / TINKA; verslo pavyzdys

Kiekvienas parametras turi **kopijuojamą pavyzdį** (CopyButton). Informacijos **neprarasta** – viskas lieka aprašyta.

---

## 3. Ar pedagogiškai tinka veiksmo praktika?

**Taip.** Abi skaidrės jau turi:

- **Naudą** (tikslas – valdyti atsakymus)
- **Kopijuojamus elementus** (3 pavyzdžiai + šablonas skaidrėje 11; 4 parametrai su pavyzdžiais skaidrėje 18)
- **Aiškų „ką daryti“** – pasirink pavyzdį, nukopijuok, paleisk DI

Trūksta tik:

- Aiškaus **Trumpai (30 s)** bloko viršuje (nauda vienu akimirksniu)
- Aiškaus **Daryk dabar (2–7 min)** su CTA („Pasirink vieną pavyzdį žemiau, nukopijuok, paleisk“)
- **Patikros** bloko (4 klausimai + „Jei bent 2 ne“)
- **Optional** grupavimo – „Nori suprasti detaliau?“ su likusia teorija (lentelės, skalė, klaidos)

Taigi **veiksmo modelio logika** čia tinka: pirmiau nauda + vienas konkretus veiksmas, po to detali informacija.

---

## 4. Iššūkis: kodas ir turinys

- **Pilnas perėjimas prie `content-block`** (kaip Modulio 4 skaidrėse 49, 58, 65.5) reikštų:
  - Visą turinį perkelti į `modules.json` `sections`
  - Nebenaudoti `AdvancedBlockSlide` / `AdvancedParameters2Slide`
  - **Prarandamas** unikalus UI: gradient skalė, spalvoti blokai, kelios CopyButton kortelės, `<details>`, lentelės – nebent `ContentSlides` būtų žymiai išplėstas (lentelės, vizualai, details). Tai didelis refaktoras ir rizika.

- **Vartotojo reikalavimas:** „atidžiai, neprarandant info, išlaikant koda“. Todėl **neteiksime** pilno tipo pakeitimo į `content-block`.

---

## 5. Rekomenduojamas variantas: papildyti viršų (Variantas B)

**Idėja:** Skaidrės **lieka** tipų `advanced` ir `advanced-2`, komponentai **tie patys**. Į **JSON** pridedamas neprivalomas `content` su „veiksmo“ intro bloku; komponentai **viršuje** atvaizduoja šį bloką, visa kita – kaip dabar (hardcoded).

**Kas pasiekiama:**

- **Informacija neprarandama** – visi skalės, lentelės, pavyzdžiai, klaidos, details lieka.
- **Kodas išlaikomas** – tie patys `AdvancedBlockSlide` ir `AdvancedParameters2Slide`, tik + skaitymas `content.veiksmoIntro` (arba `content.sections` su 2–3 elementais) ir renderinimas viršuje.
- **Praktika pritaikoma** – atsiranda Trumpai, Daryk dabar, (galima) Patikra vienu bloku viršuje.

### 5.1. Duomenų struktūra (pasiūlymas)

`modules.json` skaidrėms 11 ir 18 galima pridėti neprivalomą `content`:

```json
"content": {
  "veiksmoIntro": {
    "trumpai": "**Nauda:** Temperature valdo kūrybą, Reasoning – mąstymo gylį. Gali iš karto pabandyti: pasirink vieną pavyzdį žemiau, nukopijuok ir paleisk DI.",
    "darykDabar": "**Ką daryti:** Pasirink vieną iš 3 pavyzdžių žemiau (verslo analizė, marketingas, SOP). Nukopijuok bloką su ADVANCED parametrais ir savo užduotimi, paleisk DI. 🔘 Pavyzdžiai žemiau.",
    "patikra": "Ar atsakymas atitiko nustatymus (trumpas / ilgas, kūrybiškas / tikslus)? Ar next time keistum temperature/reasoning?"
  }
}
```

Skaidrei 18 – analogiškai (trumpai apie ilgį/fokusą/pasikartojimus, daryk dabar su Max Tokens arba Top-p pavyzdžiu, patikra).

### 5.2. Kodo pakeitimai (minimalūs)

1. **Tipai** (`src/types/modules.ts`): pridėti `AdvancedVeiksmoIntro` su laukais `trumpai?`, `darykDabar?`, `patikra?`; `Slide` tipo `content` leisti ir šiam tipui skaidrėms su `type: 'advanced' | 'advanced-2'`.
2. **SlideContent.tsx:** perduoti `slide` į `AdvancedBlockSlide` ir `AdvancedParameters2Slide` (pvz. `slide={slide}`).
3. **BlockSlides.tsx:** `AdvancedBlockSlide` ir `AdvancedParameters2Slide` priimtų `slide?: Slide`. Jei `slide?.content?.veiksmoIntro` egzistuoja – viršuje renderinti vieną bloką (pvz. `blockVariant: "accent"` / `"brand"`) su trumpai, darykDabar, patikra. Jei nėra – elgtis kaip dabar (nieko viršuje nedėti).

Taip **neprarandama jokia** esama informacija ir **išlaikomas** esamas komponentų kodas; pridedama tik papildoma viršutinė sekcija iš JSON.

---

## 6. Santrauka

| Klausimas | Atsakymas |
|-----------|-----------|
| Ar veiksmo praktika **pedagogiškai tinka** Modulio 1 Advanced skaidrėms? | **Taip** – nauda, kopijuojami pavyzdžiai ir vienas aiškus veiksmas jau yra; trūksta tik Trumpai / Daryk dabar / Patikra viršuje ir optional grupavimo. |
| Ar galima pritaikyti **neprarandant info**? | **Taip** – visą turinį paliekame komponente; papildome tik viršų iš JSON (Variantas B). |
| Ar galima **išlaikyti kodą**? | **Taip** – tipai `advanced` / `advanced-2` ir komponentai lieka; pridedamas tik skaitymas `content.veiksmoIntro` ir vienas intro blokas viršuje. |
| Ar verta **pilnai konvertuoti** į content-block? | **Ne** – reikėtų perkelti didelį kiekį turinio ir vizualų į JSON/ContentSlides, prarandamas unikalus UI ir didinamas rizikas. |

**Rekomendacija:** Pritaikyti veiksmo praktiką **Variantu B** – į `modules.json` skaidrėms 11 ir 18 įvesti `content.veiksmoIntro` (trumpai, darykDabar, patikra), o `AdvancedBlockSlide` ir `AdvancedParameters2Slide` papildyti tik viršutiniu intro bloku. Esamas turinys ir komponentų logika lieka nepakeisti.

---

## 7. Įgyvendinimas (2026-02-09)

Variantas B **įgyvendintas**:
- **Tipai:** `AdvancedVeiksmoIntro`, `AdvancedVeiksmoIntroContent` – `src/types/modules.ts`; įtraukta į `SlideContent` sąjungą.
- **JSON:** Skaidrėms 11 ir 18 pridėtas `content.veiksmoIntro` su laukais `trumpai`, `darykDabar`, `patikra` (pagal AGENT_ORCHESTRATOR veiksmo gaires).
- **SlideContent:** Perduoda `slide` į `AdvancedBlockSlide` ir `AdvancedParameters2Slide`; importas tiesiogiai iš `BlockSlides.tsx` (korektiška tipų sklaida).
- **BlockSlides:** Pridėtas `VeiksmoIntroBlock` (1️⃣ Trumpai, 2️⃣ Daryk dabar, 4️⃣ Patikra); abu Advanced komponentai priima `slide?: Slide` ir viršuje rodo intro, jei yra `content.veiksmoIntro`. Esamas turinys (Temperature, Reasoning, lentelės, pavyzdžiai, details) nepakeistas.

---

## 8. Nuorodos

- Veiksmo skaidrių geriausios praktikos: `docs/development/AGENT_ORCHESTRATOR.md` (CONTENT_AGENT → „Geros praktikos – veiksmo skaidrės“).
- Modulio 4 pavyzdys (49, 58, 65.5): `docs/development/PLAN_AGENTAI_3_SKAIDRES_VEIKSMAS.md`.
- Komponentai: `src/components/slides/types/BlockSlides.tsx` – `AdvancedBlockSlide`, `AdvancedParameters2Slide`.
- Duomenys: `src/data/modules.json` – skaidrės id 11, 18 (Modulio 1).
