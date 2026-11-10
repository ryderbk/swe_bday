# Asset Provenance & Rights Record

This document records the origin, local destination, description, and permission status for all media assets used in the **A Little Universe for Saiswetha** application.

---

## 1. Selected Artwork from Reference Projects

The following image assets were extracted from `birthday-projects/a-little-surprise-main` to fulfill Bharath's creative direction:

| Original Source Path | Application Destination Path | Description | Rights Status |
| :--- | :--- | :--- | :--- |
| `src/assets/birthday-teddy.webp` | `public/images/surprise/birthday-teddy.webp` | Bunny & bear with birthday cake, gift, and HBD sparkles | User selected asset from reference collection |
| `src/assets/bouquet.webp` | `public/images/surprise/bouquet.webp` | Red rose bouquet | User selected asset from reference collection |
| `src/assets/couple-left.webp` | `public/images/surprise/couple-left.webp` | Left side couple/tree silhouette illustration | User selected asset from reference collection |
| `src/assets/couple-right.webp` | `public/images/surprise/couple-right.webp` | Right side couple/tree silhouette illustration | User selected asset from reference collection |
| `src/assets/gift-close.webp` | `public/images/surprise/gift-close.webp` | Champagne/rose-gold closed gift box with bow & heart tag | User selected asset from reference collection |
| `src/assets/gift-open.webp` | `public/images/surprise/gift-open.webp` | Champagne/rose-gold opened gift box with floating heart | User selected asset from reference collection |
| `src/assets/balloons/gold-balloon.webp` | `public/images/surprise/balloons/gold-balloon.webp` | Gold metallic balloon | User selected asset from reference collection |
| `src/assets/balloons/green-balloon.webp` | `public/images/surprise/balloons/green-balloon.webp` | Green metallic balloon | User selected asset from reference collection |
| `src/assets/balloons/pink-balloon.webp` | `public/images/surprise/balloons/pink-balloon.webp` | Pink metallic balloon | User selected asset from reference collection |
| `src/assets/balloons/purple-balloon.webp` | `public/images/surprise/balloons/purple-balloon.webp` | Purple metallic balloon | User selected asset from reference collection |
| `public/images/petal/petal1.webp` | `public/images/surprise/petals/petal1.webp` | Individual rose petal illustration | User selected asset from reference collection |
| `public/images/petal/petal2.webp` | `public/images/surprise/petals/petal2.webp` | Individual rose petal illustration variant | User selected asset from reference collection |

---

## 2. Audio & Sound Effects

| Original Source Path | Application Destination Path | Description | Rights Status |
| :--- | :--- | :--- | :--- |
| `public/music/balloon-pop.mp3` | `public/audio/sfx/balloon-pop.mp3` | Short balloon popping sound | Local reference SFX |
| `public/music/heart-pop.mp3` | `public/audio/sfx/heart-pop.mp3` | Soft romantic heart pop chime | Local reference SFX |
| `public/music/gift-open.mp3` | `public/audio/sfx/gift-open.mp3` | Gentle chime/shimmer for gift reveal | Local reference SFX |
| Synthesized Web Audio API | Internal fallback (`src/lib/audio.ts`) | Soft chime, whoosh, burst, and typing clicks | 100% original programmatic synthesis; zero external dependencies |

### Commercial Music Notice:
- Background music (`public/audio/background-music.mp3`) and voice notes (`public/audio/voice-message.mp3`) remain **disabled by default in configuration** until Bharath places his own licensed music and recorded voice note in `public/audio/`.
- Commercial songs from reference projects (e.g., Hi Nanna / Just the Way You Are) were intentionally **not** bundled into the production app to respect licensing boundaries.

