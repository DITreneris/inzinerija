# PDF šriftai – GitHub šaltiniai

> **Roboto (pageidautina atsisiuntimui):** [openmaptiles/fonts](https://github.com/openmaptiles/fonts) – `master/roboto/Roboto-Regular.ttf` (dažnai naudojamas kartografijos stack'e; tinka ir jsPDF).  
> **Atsarginis Roboto:** [google/fonts](https://github.com/google/fonts) – `apache/roboto`.

Skriptas [`scripts/download-noto-font.ps1`](../../scripts/download-noto-font.ps1) pirmiausia bando **openmaptiles**, tada **google/fonts**. Logiką aprašo [`src/utils/pdfNotoFont.ts`](../../src/utils/pdfNotoFont.ts).

---

## Roboto (pageidautina – jsPDF 4)

### OpenMapTiles (pirmas bandymas skripte)

| Tipas                                   | URL                                                                                   |
| --------------------------------------- | ------------------------------------------------------------------------------------- |
| **Failas repozitorijoje (blob)**        | https://github.com/openmaptiles/fonts/blob/master/roboto/Roboto-Regular.ttf           |
| **Raw TTF (tiesioginis atsisiuntimas)** | https://raw.githubusercontent.com/openmaptiles/fonts/master/roboto/Roboto-Regular.ttf |

- Repozitorija: [openmaptiles/fonts](https://github.com/openmaptiles/fonts).
- Vietinis kelias po atsisiuntimo: `public/fonts/Roboto-Regular.ttf`.

### Google Fonts (atsarginis skripte)

| Tipas                       | URL                                                                       |
| --------------------------- | ------------------------------------------------------------------------- |
| **Aplankas repozitorijoje** | https://github.com/google/fonts/tree/main/apache/roboto                   |
| **Raw TTF**                 | https://github.com/google/fonts/raw/main/apache/roboto/Roboto-Regular.ttf |

- Licencija: Apache 2.0 (`apache/roboto`).

---

## Noto Sans (atsarginis – OFL)

| Tipas                            | URL                                                                        |
| -------------------------------- | -------------------------------------------------------------------------- |
| **Aplankas repozitorijoje**      | https://github.com/google/fonts/tree/main/ofl/notosans                     |
| **Raw TTF (tiesioginis failas)** | https://github.com/google/fonts/raw/main/ofl/notosans/NotoSans-Regular.ttf |

- Licencija: SIL Open Font License (`ofl/notosans`).
- Vietinis kelias: `public/fonts/NotoSans-Regular.ttf`.

---

## Rankinis atsisiuntimas

1. Atidarykite **raw** nuorodą naršyklėje arba naudokite `curl` / `Invoke-WebRequest`.
2. Įrašykite failą į `public/fonts/` su tiksliais vardais (`Roboto-Regular.ttf` / `NotoSans-Regular.ttf`).

Arba paleiskite iš projekto šaknies:

```powershell
.\scripts\download-noto-font.ps1
```
