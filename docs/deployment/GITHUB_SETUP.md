# GitHub setup

> Detalus setup – [`README.md`](../../README.md). Deploy lentelė – [`DEPLOYMENT.md`](DEPLOYMENT.md).

## GitHub Pages gate policy

- **URL:** `https://ditreneris.github.io/inzinerija/`
- **Workflow:** [`.github/workflows/deploy.yml`](../../.github/workflows/deploy.yml) – `build-and-deploy` visada su `VITE_MVP_MODE=1` ir `VITE_BASE_PATH=/inzinerija/`.
- **Turinys:** tik moduliai **1–6** (core profilis). M7–9 ir M10–15 **ne** Pages artefakte.
- **Production M1–9:** marketing monorepo / Vercel – ne Pages. Žr. `DEPLOYMENT.md` § Gate policy.

## Checklist prieš Pages deploy

1. `deploy.yml` `build-and-deploy` env: `VITE_MVP_MODE=1`, `VITE_BASE_PATH=/inzinerija/`.
2. Repo Settings → Pages → Source = GitHub Actions.
3. Po deploy: atidaryti `/inzinerija/` – matomi M1–6; M7+ nėra / užrakinti.

Atnaujinta: 2026-07-28 (P2 #GP).
