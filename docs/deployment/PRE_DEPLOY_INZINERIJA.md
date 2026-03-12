# Pre-deploy analizė – deploy į DITreneris/inzinerija

> **Tikslas:** Patikrinti kodo bazę prieš deploy į [GitHub – DITreneris/inzinerija](https://github.com/DITreneris/inzinerija/). GitHub Pages URL: **https://ditreneris.github.io/inzinerija/**.

---

## 1. Kritinis punktas: base path

GitHub Pages servina svetainę pagal **repo pavadinimą**: `https://<user>.github.io/<repo>/`. Šiam repozitorijui (`inzinerija`) kelias yra **`/inzinerija/`**, ne `/anatomija/`.

- **Problema:** Jei build naudoja `base: '/anatomija/'`, visi asset'ai (JS, CSS, vaizdai) ir SPA maršrutai būtų prašomi iš `https://ditreneris.github.io/anatomija/` → 404 (tas path neegzistuoja šiame deploy).
- **Sprendimas:** Build'e nustatyti `VITE_BASE_PATH=/inzinerija/` (ir quality-gates, ir build-and-deploy job'ai).

**Atlikti pakeitimai:**

| Failas | Pakeitimas |
|--------|------------|
| `.github/workflows/deploy.yml` | Visiems `npm run build` step'ams pridėtas `VITE_BASE_PATH: '/inzinerija/'` |
| `vite.config.ts` | Numatytasis production base pakeistas iš `/anatomija/` į `/inzinerija/` |
| `.env.example` | `VITE_BASE_PATH=/inzinerija/` + komentaras apie repo pavadinimą |
| `package.json` | `repository.url` → `https://github.com/DITreneris/inzinerija.git`, `homepage` → `https://ditreneris.github.io/inzinerija/`, `bugs.url` → inzinerija/issues |

---

## 2. CI/CD (deploy.yml) – santrauka

- **Triggery:** `push` į `main`, `workflow_dispatch`.
- **Quality gates:** checkout → Node 18, `npm ci` → `validate:schema` → `lint` → `test:run` → 2× build (default + core VITE_MVP_MODE=1), abu su **VITE_BASE_PATH=/inzinerija/**.
- **Deploy:** build-and-deploy naudoja core profilį (VITE_MVP_MODE=1), `dist/` → GitHub Pages artifact → deploy-pages.

**Reikalavimai GitHub:** Repo Settings → Pages → Source: **GitHub Actions** (ne “Deploy from a branch”). Tai leidžia naudoti “Deploy to GitHub Pages” workflow.

---

## 3. Asset'ai ir vaizdai

- **Public:** Vite kopijuoja `public/` į `dist/` šaknį. GitHub Pages servina `dist/` po `/inzinerija/`, todėl pvz. `public/Dante_visata.png` → `https://ditreneris.github.io/inzinerija/Dante_visata.png`.
- **Vaizdų keliai:** `ContentSlides.tsx` ir `CharacterCard.tsx` jau naudoja `import.meta.env.BASE_URL` prieš JSON kelius (comparisonImages, workflowImages, character.imagePath), todėl po deploy vaizdai turi būti teisingi, jei build'as su `VITE_BASE_PATH=/inzinerija/`.

---

## 4. Pre-deploy checklist

Prieš push į `main` (arba prieš manual deploy):

- [ ] **Base path:** `VITE_BASE_PATH=/inzinerija/` nustatytas deploy workflow ir vietinis production build (vite default).
- [ ] **Repo nuorodos:** `package.json` – repository, homepage, bugs nurodo į `DITreneris/inzinerija`.
- [ ] **Schema:** `npm run validate:schema` – praeina.
- [ ] **Lint:** `npm run lint` – be klaidų.
- [ ] **Testai:** `npm run test:run` – visi žali.
- [ ] **Lokalus production build:**  
  `VITE_BASE_PATH=/inzinerija/ npm run build` (arba tik `npm run build`, jei default jau `/inzinerija/`), tada `npm run preview` – atidaryti `http://localhost:4173/inzinerija/` ir patikrinti, kad UI ir vaizdai rodomi.
- [ ] **GitHub repo:** Pages šaltinis = GitHub Actions; jei reikia – environment `github-pages` sukurtas.

---

## 5. Po deploy patikrinimas

1. Atidaryti **https://ditreneris.github.io/inzinerija/**.
2. Įsitikinti, kad kraunasi JS/CSS (DevTools → Network – 200, ne 404).
3. Atidaryti skaidrę su palyginimo vaizdais (pvz. DI visata) – PNG turi būti matomi.
4. Perjungti LT/EN – turinys ir navigacija veikia.
5. Jei naudojamas verify-access – patikrinti, kad `VITE_VERIFY_ACCESS_URL` (jei nustatytas) atitinka tikėtą domeną (GitHub Pages neturi custom serverio, todėl `/api/verify-access` same-origin veiks tik jei API implementuotas per serverless/redirect).

---

## 6. Nuorodos

- Workflow: [.github/workflows/deploy.yml](../../.github/workflows/deploy.yml)
- Deployment: [DEPLOYMENT.md](DEPLOYMENT.md)
- Integracija: [INTEGRATION_OVERVIEW.md](INTEGRATION_OVERVIEW.md)
