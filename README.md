# 🏡 Penzion U Štěstí — Website

Prémiová webová prezentace penzionu U Štěstí v Českém ráji.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS** (custom palette)
- **Framer Motion** (scroll animations, transitions)
- **GSAP + ScrollTrigger** (advanced scroll effects)
- **Lenis** (smooth scroll)
- **Lucide Icons**

---

## Instalace & spuštění

```bash
npm install
npm run dev
```

Otevřete [http://localhost:3000](http://localhost:3000)

---

## Struktura projektu

```
app/
├── page.tsx          ← Hlavní stránka (všechny sekce)
├── layout.tsx        ← Root layout + SEO metadata
└── globals.css       ← Globální styly + fonty

public/
└── images/           ← ⚠️ Sem nahrajte fotografie!
    ├── hero.jpg          (hlavní foto — úsvit, Prachovské skály)
    ├── exterior.jpg      (exteriér penzionu)
    ├── room1.jpg         (pokoj)
    ├── room2.jpg         (pokoj 2)
    ├── bathroom.jpg      (koupelna)
    ├── dining.jpg        (jídelna)
    ├── bar.jpg           (bar)
    ├── pool.jpg          (bazén)
    ├── garden.jpg        (zahrada)
    └── firepit.jpg       (ohniště)
```

---

## Fotografie

Nahrání fotografií do `public/images/`:

Použijte přiložené fotografie z penzionu a přejmenujte je dle výše uvedené struktury.
Pro hlavní hero fotografii doporučujeme kvalitní záběr Prachovských skal nebo okolní přírody Českého ráje.

---

## Sekce webu

| # | Sekce | Popis |
|---|-------|-------|
| 01 | **Hero** | Fullscreen s cinematic krajinou, parallax efekt |
| 02 | **Editorial** | Dvousloupová story sekce, polaroid fotografie |
| 03 | **Pokoje** | Split layout, slider fotek, seznam vybavení |
| 04 | **Český ráj** | Interaktivní sekce s destinacemi |
| 05 | **Galerie** | Masonry grid, hover efekty |
| 06 | **Citát** | Fullscreen emocionální sekce |
| 07 | **Rezervace** | Formulář pro výběr termínu |
| 08 | **Patička** | Kontakt, menu, sociální sítě |

---

## Barevná paleta

| Název | Hex |
|-------|-----|
| Cream | `#F6F1E8` |
| Warm Beige | `#EFE7DA` |
| Sandstone | `#D7C3A4` |
| Gold | `#B89A6A` |
| Dark Forest | `#0F241D` |
| Deep Moss | `#183128` |

---

## Kontakt & přizpůsobení

Pro aktualizaci kontaktních údajů editujte sekci `Footer` v `app/page.tsx`.
Pro přidání skutečné rezervační funkce napojte formulář na booking API (např. Lodgify, Beds24).
