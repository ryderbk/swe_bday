# Asset Provenance & Rights Record

This document records the origin, local destination, description, and permission status for all media assets used in the **A Little Universe for Swethu** application (Round 2 update).

---

## 1. Visual Artwork & Vector Illustrations

| Asset Path | Origin / Tool | Description | Rights Status |
| :--- | :--- | :--- | :--- |
| `public/images/surprise/rose-bouquet.svg` | Handcrafted Vector SVG | Elegant layered red roses bouquet with gold accents and ribbon | 100% Original SVG. Replaced prior `bouquet.webp` which had a third-party watermark. |
| `public/images/surprise/birthday-teddy.webp` | Cleaned Reference Asset | Bunny & bear celebrating with birthday cake; alpha cleaned (ear-gap background remnants and ghost alpha artifacts removed) | User-selected reference asset with transparent alpha channel |
| `public/images/surprise/couple-left.webp` | Reference Collection | Left silhouette illustration | User-selected reference asset |
| `public/images/surprise/couple-right.webp` | Reference Collection | Right silhouette illustration | User-selected reference asset |
| `public/images/surprise/gift-close.webp` | Reference Collection | Champagne/rose-gold closed gift box with bow & heart tag | User-selected reference asset |
| `public/images/surprise/gift-open.webp` | Reference Collection | Champagne/rose-gold opened gift box with floating heart | User-selected reference asset |
| `public/images/surprise/balloons/*.webp` | Reference Collection | Metallic balloons (gold, green, pink, purple) | User-selected reference asset |
| `public/images/gallery/HER (1-9).jpeg`, `HER (1-3).png` | User Provided | 12 personal photographs for the Scrapbook & Heart Collage | User-provided personal photos (favourites ordered first) |

---

## 2. Audio & Sound Effects

| Asset Path | Origin | Description | Rights Status |
| :--- | :--- | :--- | :--- |
| `public/audio/background-music.mp3` | User-provided (`Rathinamo.mp3`) | Background song playing continuously across all phases | User-provided personal audio |
| `public/audio/sfx/balloon-pop.mp3` | Reference SFX | Soft balloon popping sound | Reference audio |
| `public/audio/sfx/gift-open.mp3` | Reference SFX | Gentle chime/shimmer for gift reveal | Reference audio |
| Web Audio API Fallbacks | Programmatic (`src/lib/audio.ts`) | Synthesized chimes, firework bursts, pop effects | 100% original synthesis |
