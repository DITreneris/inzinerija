#!/usr/bin/env python3
"""
Generates 1200x626 (or 1080x1080) GIF/PNG banners for "Promptų anatomija" marketing.
Uses project colors: brand-900 (#102a43), accent-500 (#d4a520), white text.
Default: original 4-line banner with rotation. With --variant 1..5: 5 copy variants (3 lines), PNG or GIF.
"""
import argparse
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    raise SystemExit("Reikia: pip install Pillow")

# Project palette (tailwind.config.js)
BG = "#102a43"           # brand-900
TEXT_WHITE = "#ffffff"
TEXT_MUTED = "#e2e8f0"    # light gray
ACCENT = "#d4a520"        # accent-500 gold

W, H = 1200, 626
OUT_DIR = Path(__file__).resolve().parent.parent / "public"
OUT_FILE = OUT_DIR / "banner_promptu_anatomija.gif"

# 5 variants: (line1, line2, cta) – docs/development/BANNER_5_VARIANTU_STRATEGIJA.md
BANNER_VARIANTS = [
    ("90 % rašo neteisingai. Čia išmoksi sistemą.", "6 blokų mokymas ~45 min.", "Pradėti"),
    ("DI promptai – ne chaosas. Aiški sistema.", "Promptų anatomija. ~45 min.", "Išbandyti"),
    ("Nuspėjami rezultatai – išmok 6 blokų sistemą.", "Starter lygis. ~45 min.", "Išmokti"),
    ("Promptų inžinerija – ne teorija. Praktika.", "6 blokai, testas, ~45 min.", "Pradėti"),
    ("Komandos apmokymui: promptų sistema per 45 min.", "Dėstymas, praktika, testas.", "Sužinoti daugiau"),
]

# Font sizes (approximate for 1200px width)
FONT_TITLE = 52
FONT_LINE2 = 42
FONT_DYNAMIC = 48
FONT_CTA = 38
# For 1080x1080 scale down ~0.85
FONT_TITLE_SQ = 44
FONT_LINE2_SQ = 36
FONT_CTA_SQ = 40


def get_font(size: int, bold: bool = False):
    """Try Plus Jakarta Sans, then system sans (Windows: Segoe UI / Arial)."""
    roots = [
        Path(__file__).resolve().parent.parent / "public" / "fonts",
        Path(__file__).resolve().parent.parent / "scripts" / "fonts",
        Path("/usr/share/fonts/truetype"),
    ]
    names = ["PlusJakartaSans-Bold.ttf", "PlusJakartaSans-SemiBold.ttf", "PlusJakartaSans-Medium.ttf"]
    if not bold:
        names = ["PlusJakartaSans-Medium.ttf", "PlusJakartaSans-SemiBold.ttf"] + names
    for root in roots:
        if not root.is_dir():
            continue
        for n in names:
            p = root / n
            if p.is_file():
                try:
                    return ImageFont.truetype(str(p), size)
                except OSError:
                    pass
    # Windows fallbacks (bold variant for headings)
    fallbacks = [
        "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
        "arial.ttf",
    ]
    for path in fallbacks:
        try:
            return ImageFont.truetype(path, size)
        except (OSError, TypeError):
            pass
    raise SystemExit(
        "Nerastas tinkamas šriftas (reikia Arial arba Segoe UI). "
        "Naudokite: atidarykite public/banner_promptu_anatomija.html naršyklėje ir įrašykite ekrano įrašą kaip GIF."
    )


def draw_frame(angle_deg: float) -> Image.Image:
    im = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(im)

    font1 = get_font(FONT_TITLE, bold=True)
    font2 = get_font(FONT_LINE2, bold=False)
    font3 = get_font(FONT_DYNAMIC, bold=True)
    font4 = get_font(FONT_CTA, bold=False)

    y = 100
    line_height = 72

    # 1) "90 proc. iš mūsų DI meluoja."
    draw.text((80, y), "90 proc. iš mūsų DI meluoja.", fill=TEXT_WHITE, font=font1)
    y += line_height

    # 2) "Problema ne tu - promptas."
    draw.text((80, y), "Problema ne tu - promptas.", fill=TEXT_MUTED, font=font2)
    y += line_height + 20

    # 3) "Pasikeisk 180 laipsnių" – dynamic (rotated)
    text3 = "Pasikeisk 180 laipsnių"
    # Draw rotated text on a separate image, then paste
    tmp = Image.new("RGBA", (600, 80), (0, 0, 0, 0))
    dt = ImageDraw.Draw(tmp)
    dt.text((0, 0), text3, fill=ACCENT, font=font3)
    rotated = tmp.rotate(-angle_deg, expand=True, resample=Image.BICUBIC)
    # Center the rotated text roughly at (W/2, y + 30)
    rw, rh = rotated.size
    px = (W - rw) // 2
    py = y
    im.paste(rotated, (px, py), rotated)
    y += max(rh, 70) + 24

    # 4) «"Promptų anatomija" ~ 45 min..»
    draw.text((80, y), '"Promptų anatomija" ~ 45 min..', fill=TEXT_MUTED, font=font4)

    return im


def _font_sizes(square: bool):
    if square:
        return FONT_TITLE_SQ, FONT_LINE2_SQ, FONT_CTA_SQ
    return FONT_TITLE, FONT_LINE2, FONT_CTA


def draw_frame_variant(variant_idx: int, w: int, h: int, phase: float = 1.0) -> Image.Image:
    """Draw one frame for variant 1..5. phase 0..1: 0=line1 only, 0.5=+line2, 1=+cta (for GIF)."""
    im = Image.new("RGB", (w, h), BG)
    draw = ImageDraw.Draw(im)
    square = w == 1080 and h == 1080
    fs1, fs2, fs3 = _font_sizes(square)
    font1 = get_font(fs1, bold=True)
    font2 = get_font(fs2, bold=False)
    font3 = get_font(fs3, bold=True)
    line1, line2, cta = BANNER_VARIANTS[variant_idx]
    margin = 56 if square else 80
    y = 80 if square else 100
    line_height = 60 if square else 72

    op1 = 1.0 if phase >= 0.15 else max(0, phase / 0.15)
    op2 = 1.0 if phase >= 0.45 else (max(0, (phase - 0.15) / 0.3) if phase >= 0.15 else 0)
    op3 = 1.0 if phase >= 0.7 else (max(0, (phase - 0.45) / 0.25) if phase >= 0.45 else 0)

    def blend(c, opacity):
        # approximate: blend color with BG
        r = int(int(c[1:3], 16) * opacity + int(BG[1:3], 16) * (1 - opacity))
        g = int(int(c[3:5], 16) * opacity + int(BG[3:5], 16) * (1 - opacity))
        b = int(int(c[5:7], 16) * opacity + int(BG[5:7], 16) * (1 - opacity))
        return (r, g, b)

    if op1 > 0:
        draw.text((margin, y), line1, fill=blend(TEXT_WHITE, op1), font=font1)
    y += line_height + (20 if square else 24)
    if op2 > 0:
        draw.text((margin, y), line2, fill=blend(TEXT_MUTED, op2), font=font2)
    y += line_height + (16 if square else 20)
    if op3 > 0:
        draw.text((margin, y), cta, fill=blend(ACCENT, op3), font=font3)
    return im


def main():
    parser = argparse.ArgumentParser(description="Promptų anatomija banner GIF/PNG")
    parser.add_argument("--variant", type=int, choices=[1, 2, 3, 4, 5], help="Variantas 1..5 (3 eilutės)")
    parser.add_argument("--size", default="1200x628", choices=["1200x628", "1080x1080"], help="Matmenys")
    parser.add_argument("--png", action="store_true", help="Išvesti tik statinį PNG (fallback)")
    parser.add_argument("--gif", action="store_true", help="Kai --variant: generuoti GIF su 3 fazėmis")
    args = parser.parse_args()

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    w, h = (1080, 1080) if args.size == "1080x1080" else (1200, 626)

    if args.variant is not None:
        idx = args.variant - 1
        base = f"banner_promptu_anatomija_v{args.variant}_{w}x{h}"
        if args.png:
            out = OUT_DIR / f"{base}.png"
            draw_frame_variant(idx, w, h, phase=1.0).save(out)
            print(f"Išsaugota: {out}")
            return
        if args.gif:
            n_frames = 24
            duration_ms = 125
            frames = [draw_frame_variant(idx, w, h, phase=(i + 1) / n_frames) for i in range(n_frames)]
            out = OUT_DIR / f"{base}.gif"
            frames[0].save(out, save_all=True, append_images=frames[1:], duration=duration_ms, loop=0)
            print(f"Išsaugota: {out}")
            print("Patarimas: gifsicle -O3 -o opt.gif", out.name)
            return
        # default: PNG
        out = OUT_DIR / f"{base}.png"
        draw_frame_variant(idx, w, h, phase=1.0).save(out)
        print(f"Išsaugota: {out}")
        return

    # Original 4-line banner (rotation)
    n_frames = 30
    duration_ms = 120
    frames = []
    for i in range(n_frames):
        t = i / (n_frames - 1) if n_frames > 1 else 1
        if t <= 0.5:
            angle = 2 * t * 180
        else:
            angle = 180 - 2 * (t - 0.5) * 180
        frames.append(draw_frame(angle))

    frames[0].save(
        OUT_FILE,
        save_all=True,
        append_images=frames[1:],
        duration=duration_ms,
        loop=0,
    )
    print(f"Išsaugota: {OUT_FILE}")
    print("Patarimas: mažesniam failui – gifsicle -O3 -o opt.gif", OUT_FILE.name)


if __name__ == "__main__":
    main()
