# SEO / crawlers / GEO – mokymų submodulis

> **Paskirtis:** Kas daroma **šiame** repo (`060_promptu_anatomija`), kas – marketingo monorepo (`promptanatomy.app`), ir kaip patikrinti prieš release.

---

## Kontekstas

- Mokymų app servinamas po subpath (pvz. `/anatomija/` ar `/inzinerija/`).
- Prieiga – **kliento gate** (magic link + `localStorage`), ne serverio auth visam HTML.
- Organinis SEO ir GEO – **marketingo LP**, ne modulių/skaidrių URL.

---

## Šio repo atsakomybė

| Elementas           | Vieta                                                                    | Elgesys                               |
| ------------------- | ------------------------------------------------------------------------ | ------------------------------------- |
| `noindex, nofollow` | `index.html`, `App.tsx` Helmet                                           | Visada – app neindeksuojamas          |
| OG / canonical URL  | `VITE_PUBLIC_SITE_URL` + `VITE_BASE_PATH`, `src/utils/publicSiteMeta.ts` | Teisingas domenas build metu          |
| `public/robots.txt` | `Disallow: /`                                                            | Papildoma subpath politika            |
| `public/llms.txt`   | Orientacija AI crawleriams                                               | Nuorodos tik į LP ir snippets         |
| GEO eksportas       | `npm run export:seo-snippets`                                            | Viešos modulių santraukos be skaidrių |

**Ne šio repo:** root `https://www.promptanatomy.app/robots.txt`, `sitemap.xml`, Course schema, WAF AI bot taisyklės.

---

## Marketingo repo (integratorius)

1. Root `robots.txt`: `Disallow: /anatomija/` (arba jūsų `VITE_BASE_PATH` be trailing slash).
2. `sitemap.xml` – **be** app subpath URL.
3. Build env submoduliui:
   - `VITE_PUBLIC_SITE_URL=https://www.promptanatomy.app`
   - `VITE_BASE_PATH=/anatomija/`
4. Patikrinti, kad edge/WAF neblokuoja retrieval botų visam domenui (žr. marketingo Cloudflare/Vercel).

---

## Build profiliai

| Deploy        | `VITE_PUBLIC_SITE_URL`          | `VITE_BASE_PATH` |
| ------------- | ------------------------------- | ---------------- |
| Monorepo prod | `https://www.promptanatomy.app` | `/anatomija/`    |
| GitHub Pages  | `https://ditreneris.github.io`  | `/inzinerija/`   |

Žr. [`.env.example`](../../.env.example), [DEPLOYMENT.md](DEPLOYMENT.md).

---

## Patikra po submodule atnaujinimo (~3 min)

1. **Incognito** atidaryti app URL be prieigos → gate, ne moduliai.
2. **View Source** (Ctrl+U): `<meta name="robots" content="noindex, nofollow">`.
3. OG `og:url` / `og:image` – `promptanatomy.app` (arba GH Pages origin), ne senas hardcoded `github.io` be env.
4. `npm run export:seo-snippets` → `public/seo-public-snippets.json` egzistuoja; JSON neturi `slides` / `copyable`.
5. Marketingo root `robots.txt` vis dar disallow app kelią.

---

## Įspėjimai

- **Client gate ≠ turinio slaptumas:** `modules.json` gali būti JS bundle – rimtai jautriam turiniui reikia server-side/API.
- **Subpath `robots.txt`** nekeičia root domeno politikos – būtinas marketingo root failas.
- **GEO:** marketingas naudoja `seo-public-snippets.json`, ne pilną `modules.json`.

---

## Nuorodos

- [INTEGRATION_OVERVIEW.md](INTEGRATION_OVERVIEW.md)
- [DEPLOYMENT.md](DEPLOYMENT.md)
- `src/utils/publicSiteMeta.ts`
