# M10 Team Readiness Lab

> **Elementas:** `m10_team_readiness_lab`  
> **Skaidrė:** M10 / `10.255`  
> **Pattern:** `interactive-control-lab` · **Shell:** Ne  
> **Tikslas:** greita komandos DI praktikos nuotrauka prieš žmogaus kontrolės sprendimą.

## Kontraktas

Lab'as adaptuoja sibling repo maturity quiz idėją kaip mokymosi refleksiją, ne kaip sertifikuotą brandos testą. Vartotojas pasirenka po vieną būseną trijose dimensijose:

1. **Komandos naudojimas** – ar DI naudojamas atsitiktinai, fragmentuotai, ar sistemiškai.
2. **Promptų struktūra** – ar yra bendras rolės / konteksto / išvesties / ribų šablonas.
3. **Mokymosi ritmas** – ar komanda peržiūri rezultatus ir gerina praktiką.

Nėra bendro balo. Silpniausia dimensija lemia vieną kitą veiksmą; jei kelios dimensijos vienodai silpnos, rodoma „bendros bazės“ rekomendacija, kad nebūtų klaidingo tikslumo.

## UI

- `content-block` sekcija `Daryk dabar` turi `image: m10_team_readiness_lab`.
- Lab'as naudoja `ChoiceControl` trijose radiogrupėse ir `CopyButton` profiliui.
- Kopijuojamas artefaktas yra lab'o viduje, ne atskira JSON „Kopijuojamas promptas“ siena.
- Spalvos brand-only + būsenų chip'ai; tai nėra rizikos matrica, todėl nenaudojamas 10.26 risk strip.

## Carry

- Iš `10.25` ateina 3A portfelio mąstymas.
- Į `10.26` perduodama mintis: pasirengimas nėra leidimas autonomijai; autonomija priklauso nuo rizikos, duomenų jautrumo ir žmogaus kontrolės taisyklių.
- M12 praktikose profilis gali padėti pasirinkti, nuo ko pradėti komandai, bet jis nekeičia M12 privalomų 3A praktikų.

## Draudžiama

- Nenaudoti `3–12` balo, `cloud/info/pro` routing, „AI Operating System Ready“ ar pardavimo CTA.
- Nevadinti rezultato formalia organizacijos branda.
- Nekartoti `10.45` L0–L3 gylio taksonomijos.
