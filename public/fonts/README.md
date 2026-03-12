# Šriftai PDF eksportui (lietuviškos raidės)

Kad asmeninių segmentų PDF („Eksportuok PDF“ skaidrėje „Kam žmonės naudoja GPT?“) būtų teisingai rodomos lietuviškos raidės (ą, č, ė, į, š, ų, ū, ž), į šį aplanką įdėkite šriftą **Noto Sans** (Regular).

- **Failo pavadinimas:** `NotoSans-Regular.ttf`
- Jei failo nėra, PDF generuojami su Helvetica (diakritikos gali būti neteisingos).

## Kaip įdėti šriftą

### A) Skriptas (PowerShell)

Iš projekto šaknies paleiskite:

```powershell
.\scripts\download-noto-font.ps1
```

Skriptas atsisiunčia šriftą iš Google Fonts (GitHub) į `public/fonts/NotoSans-Regular.ttf`.

### B) Rankinis atsisiuntimas

1. Eikite į [Google Fonts – Noto Sans](https://fonts.google.com/noto/specimen/Noto+Sans).
2. Paspauskite **„Download family“** (arba „Get font“ → Download).
3. Išarchyvuokite ZIP; iš aplanko `static/` paimkite **NotoSans-Regular.ttf** (arba iš **ofl/notosans/** jei atsisiuntėte iš [Google Fonts GitHub](https://github.com/google/fonts/tree/main/ofl/notosans)).
4. Nukopijuokite failą į **`public/fonts/NotoSans-Regular.ttf`** (šis aplankas).

Žr. [docs/development/PDF_MAKETO_GAIRES.md](../../docs/development/PDF_MAKETO_GAIRES.md) §7.
