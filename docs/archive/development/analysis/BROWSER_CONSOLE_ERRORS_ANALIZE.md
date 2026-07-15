# Naršyklės konsolės klaidų analizė (runtime.lastError, MetaMask, Phantom, ERR_NETWORK_CHANGED)

> **Tikslas:** Giliai išanalizuoti vartotojo matomas konsolės klaidas, iškelti hipotezes ir pateikti sprendimus. **Šis projektas (Promptų anatomija) nenaudoja MetaMask, Phantom ar kripto piniginių** – klaidos kyla iš naršyklės plėtinių ir tinklo.

---

## 1. Klaidų grupavimas

| Grupė | Pavyzdys | Šaltinis |
|-------|----------|----------|
| **A) Extension messaging** | `runtime.lastError: Could not establish connection. Receiving end does not exist` | Naršyklės plėtiniai (MetaMask, Phantom ar kt.) |
| **B) MetaMask** | `Failed to connect to MetaMask` / `MetaMask extension not found` (inpage.js) | MetaMask plėtinys |
| **C) Phantom** | `[PHANTOM] error getting provider injection options` / `Could not establish connection. Receiving end does not exist` (contentScript.js) | Phantom piniginė (plėtinys) |
| **D) Tinklas** | `Failed to load resource: net::ERR_NETWORK_CHANGED` (localhost:3000/...) | Tinklas arba Vite dev serveris |

---

## 2. Kas yra „Receiving end does not exist“

- **Kas vyksta:** Vienas plėtinio komponentas (pvz. **content script**, įleistas į puslapį) siunčia žinutę kitam (pvz. **background script** arba **popup**). Tas kitas komponentas šiuo metu neegzistuoja arba neatsiliepia.
- **Tipinės priežastys:**
  1. Plėtinys išjungtas arba perkrautas.
  2. Naršyklė perkrovė puslapį, bet background scriptas dar nepasileidė.
  3. Plėtinys sugadintas arba per senas (nepalaikomas).
  4. Keli plėtiniai konfliktuoja (pvz. du piniginės injekuojantys skriptai).

**Hipotezė (H1):** MetaMask ir/arba Phantom bandė susisiekti su savo background skriptu, bet ryšys nebuvo užmegztas (plėtinys išjungtas, perkrautas arba neįsikrovė).

---

## 3. MetaMask klaidos (inpage.js)

- **inpage.js** – tai MetaMask į puslapį įleidžiamas skriptas. Jis įsikrauna **bet kuriame** puslapyje (įskaitant localhost:3000), jei MetaMask įdiegtas.
- **„Failed to connect to MetaMask“ / „MetaMask extension not found“** reiškia:
  - MetaMask nėra įdiegtas, **arba**
  - MetaMask išjungtas, **arba**
  - MetaMask įdiegtas, bet extension context invaliduotas (pvz. po naršyklės atnaujinimo be perkrovimo).

**Hipotezė (H2):** Puslapyje (galbūt trečiosios šalies skriptas ar kita lenta) buvo iškviestas `window.ethereum.request({ method: 'eth_requestAccounts' })` arba panašus `connect()`. Kadangi šiame projekte **nėra** MetaMask kodo, klaidą sukėlė:
  - **arba** kitas įdiegtas plėtinys, kuris automatiškai bando prisijungti prie piniginės,
  - **arba** ankstesnis atidarytas skirtukas / senas cache’as su tokia logika.

**Patikrinimas:** Repozitorijoje ieškota: `MetaMask`, `metamask`, `ethereum`, `window.ethereum` – **nėra atitikmenų**. Todėl aplikacija šių klaidų nekuria.

---

## 4. Phantom (contentScript.js, [PHANTOM])

- **contentScript.js** su žinute „[PHANTOM] error getting provider injection options“ būdingas **Phantom** piniginei. Ji taip pat injekuoja savo skriptus į puslapius ir bando susisiekti su savo backend.
- **„Could not establish connection. Receiving end does not exist“** – ta pati messaging logika: content script siunčia žinutę, o gavėjas (background) neatsiliepia.

**Hipotezė (H3):** Phantom plėtinys įjungtas; jis bandė injekuoti providerį į localhost:3000 puslapį ir gauti „injection options“, bet ryšys su background skriptu nepavyko (priežastys panašios kaip H1).

---

## 5. ERR_NETWORK_CHANGED (localhost:3000)

- **Reikšmė:** Užklausa buvo pradėta, bet **pakito tinklo būsena** (pvz. WiFi persijungė, VPN įsijungė / išsijungė, adapteris persijungė). Naršyklė nutraukia užklausas ir grąžina šią klaidą.
- **Ką matote:** Vite dev serverio resursai (lt.json, en.json, lucide-react.js, AppNav.tsx ir kt.) – visi `:3000/...` – negali būti užkrauti.

**Hipotezės:**
- **H4a:** Tinklas tikrai pasikeitė (Wi‑Fi, Ethernet, VPN) per sesiją – tuomet visi localhost:3000 užklausos gali „lūžti“.
- **H4b:** Dev serveris (Vite) buvo sustabdytas arba perkrautas (pvz. failo išsaugojimas sukėlė HMR, o tarpu laiku nutrūko TCP ryšys).
- **H4c:** Antivirusas arba firewallas trumpam blokavo localhost ryšį (kai kurie saugumo įrankiai tai daro).

**Pasekmė:** Jei resursai neužsikrauna, aplikacija gali būti sulūžusi arba rodomi tušti/langai – tai **nėra** kodo klaida, o **tinklo / aplinkos** problema.

---

## 6. Kaip tai susiję (scenarijus)

Gali būti viena iš šių sekų:

1. **Tinklas pasikeitė** → ERR_NETWORK_CHANGED → puslapis / Vite HMR sulūžo → kai kurie plėtinių skriptai liko senoje būsenoje → bandė siųsti žinutes → „Receiving end does not exist“.
2. **Plėtiniai pirmi:** MetaMask/Phantom bandė connect/inject → background neatsiliepė → runtime.lastError; **vėliau** tinklas pasikeitė → ERR_NETWORK_CHANGED.
3. **Nepriklausomi:** Extension klaidos vyksta visada (kai plėtiniai įjungti), o ERR_NETWORK_CHANGED – atsitiktinis vienkartinis įvykis.

---

## 7. Sprendimai ir veiksmai

### 7.1 Extension klaidos (A, B, C)

| Veiksmas | Aprašymas |
|----------|-----------|
| **Ignoruoti, jei app veikia** | Šis projektas nenaudoja kripto piniginių. Klaidos neturi įtakos aplikacijos logikai. |
| **Išjungti plėtinius development’ui** | Atidarykite localhost:3000 **Incognito** (daugumoje plėtinių išjungta) arba sukurkite atskirą naršyklės profilį be MetaMask/Phantom. |
| **Atnaujinti / perkrauti plėtinius** | Extensions → MetaMask / Phantom → „Atnaujinti“ arba išjungti ir vėl įjungti. |
| **Tikrinti konfliktus** | Išjunkite vieną piniginę; jei klaidos išnyksta – vienas plėtinys sukeldavo problemą. |

### 7.2 ERR_NETWORK_CHANGED (D)

| Veiksmas | Aprašymas |
|----------|-----------|
| **Hard refresh** | Ctrl+Shift+R (arba Cmd+Shift+R). Pakartoti, jei tinklas jau stabilus. |
| **Patikrinti Vite** | Terminale įsitikinti, kad `npm run dev` (arba atitinkamas) veikia ir rodo `localhost:3000`. Perkrauti dev serverį. |
| **Stabilizuoti tinklą** | Jei naudojate VPN – išjungti arba įjungti **prieš** atidarant localhost. Venkite keisti WiFi/Ethernet per atidarytą dev sesiją. |
| **Firewall / antivirusas** | Jei klaida kartojasi – laikinai leisti localhost (127.0.0.1) arba išjungti blokavimą portui 3000. |

### 7.3 Jei norite „tyrios“ konsolės (be extension triukšmo)

- Naudokite **Incognito** langą (plėtiniai dažnai išjungti).
- Arba **Chromium** profilį be jokių piniginių plėtinių.

---

## 8. Santrauka

| Klaida | Kilmė | Ar reikia taisyti kode? |
|--------|--------|---------------------------|
| `runtime.lastError: Receiving end does not exist` | Plėtinių messaging (MetaMask/Phantom) | **Ne** |
| `Failed to connect to MetaMask` / `MetaMask extension not found` | MetaMask plėtinys; app jo nenaudoja | **Ne** |
| `[PHANTOM] error...` / `Could not establish connection` | Phantom plėtinys | **Ne** |
| `ERR_NETWORK_CHANGED` (localhost:3000) | Tinklo pokytis arba dev serverio būsena | **Ne** (stabilizuoti tinklą / dev serverį) |

**Išvada:** Visos šios klaidos yra **aplinkos / naršyklės plėtinių** kilmės. Projekto kode pakeitimų nereikia; naudinga žinoti, kodėl jos atsiranda ir kaip sumažinti triukšmą (profilis be piniginių, Incognito, stabilus tinklas, veikiantis Vite).
