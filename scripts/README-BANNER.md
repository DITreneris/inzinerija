# GIF bankerių generavimas (1200×626 ir 1080×1080)

Geriausios praktikos: **`docs/development/BANNER_BEST_PRACTICES.md`**. **5 konversijai optimizuotų variantų strategija ir tekstai:** **`docs/development/BANNER_5_VARIANTU_STRATEGIJA.md`**.

## Rezultatas

- **Failas:** `public/banner_promptu_anatomija.gif` (arba `public/banner_promptu_anatomija.html`)
- **Tekstas:** 90 proc. DI meluoja → Problema ne tu - promptas → **Pasikeisk 180 laipsnių** (dinamiška) → "Promptų anatomija" ~ 45 min..
- **Stilius:** brand-900 (#102a43), accent (#d4a520), balti/pilki tekstai.
- **Matmenys:** 1200×626 px (landscape) – tinkami social / OG ir GitHub README (GitHub rodo ~830–1012 px pločio).

## 1) Python (GIF failas)

```bash
# Jei naudojate Python 3.11 su pip:
py -3.11 -m pip install Pillow
py -3.11 scripts/generate_banner_gif.py
```

Arba su įprastu `python` (kur yra Pillow):

```bash
pip install Pillow
python scripts/generate_banner_gif.py
```

GIF bus išsaugotas į `public/banner_promptu_anatomija.gif`. Skriptas naudoja `loop=0` (begalinis ciklas, seamless loop).

### Optimizacija (mažesnis failas)

Po generavimo galite sumažinti failo dydį:

```bash
gifsicle -O3 -o public/banner_opt.gif public/banner_promptu_anatomija.gif
```

## 2) HTML (naršyklė + įrašas kaip GIF)

1. Atidarykite **`public/banner_promptu_anatomija.html`** naršyklėje.
2. Naudokite įrankį ekrano įrašui (pvz. **ScreenToGif**, **ShareX** arba „Snipping Tool“ vaizdo režimas).
3. Pasirinkite tik bankerio plotą (1200×626) ir įrašykite kaip GIF.

HTML versijoje trečia eilutė „Pasikeisk 180 laipsnių“ sukasi 0°→180°→360° ciklu (~3,6 s).

## 3) 5 variantai (lead gen)

- **HTML peržiūra:** `public/banner_5_variantai.html?v=1&size=1200x628` (v=1..5, size=1200x628 arba 1080x1080).
- **PNG (fallback):** `py -3.11 scripts/generate_banner_gif.py --variant 1 --size 1200x628 --png`
- **GIF (3 fazės):** `py -3.11 scripts/generate_banner_gif.py --variant 1 --size 1200x628 --gif`

## 4) Naudojimas GitHub README

```markdown
![Promptų anatomija – 90% DI meluoja, problema promptas, mokymas ~45 min](public/banner_promptu_anatomija.gif)
```

Su nuoroda į svetainę:

```markdown
[![Promptų anatomija](public/banner_promptu_anatomija.gif)](https://ditreneris.github.io/anatomija/)
```

## Geriausios praktikos (trumpai)

| Principas | Atitikmuo |
|-----------|-----------|
| Teisingi matmenys | 1200×626 px |
| Aukštas kontrastas | Baltas / accent ant #102a43 |
| Minimalus skaitomas tekstas | 4 eilutės, viena dinaminė |
| Prekės ženklas | tailwind brand/accent |
| Seamless loop | loop=0, animacija 0°→360°→0° |
| Saugoti repo | public/ |
| 5 variantai | BANNER_5_VARIANTU_STRATEGIJA.md, banner_5_variantai.html |
