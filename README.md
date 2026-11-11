# ✨ A Little Universe for Swethu

An intimate, art-directed interactive birthday experience created with love by **Bharath** for **Swethu**. Built as a guided single-page story combining cinematic midnight moments, tactile paper scrapbooks, personalized memories, and heartfelt surprises.

---

## 🌟 The Connected Narrative Flow

### Entrance & Preludes
1. **The Secret Envelope**: An animated wax-sealed envelope that unseals with a staged reveal sequence (wax seal dissolves, top flap opens, letter smoothly emerges with a warm golden bloom, holds for 800ms, then transitions). Initializes persistent background music (`Rathinamo.mp3`) and enters fullscreen mode.
2. **Smartphone Chat Prelude**: A fast, quiet messaging simulation (250–450ms delays) with typing indicators, zero sound clutter, and an immediate skip option leading to `Step Into Your Universe ✨`.
3. **Birthday Introduction**: `Happyy Birthdayy Swethu ma🤍` paired with the transparent bunny-and-bear celebration artwork, leading into the main guided chapters via `Discover Your Surprise ✨`.

### Guided Chapters
1. **A Bouquet For You**: Romantic bouquet scene featuring `flower.png`, drifting rose petals, and couple silhouettes.
2. **Pop a Balloon, Find a Surprise**: Interactive 10-balloon mini-game featuring 10 distinct birthday-surprise missions and in-place note card reveals.
3. **The Story of Us**: Chronological timeline with 8 milestones anchored by **July 7, 2025: The Day We Became Us**, personal birth dates (Bharath: 10/10/2005, Swethu: 11/11/2005), and a live ticking clock (years, months, days, hours, minutes, seconds) calculated in `Asia/Kolkata` time. Features a grid-aligned central rail system.
4. **Our Little Scrapbook**: Tactile 4-Polaroid default gallery (the 4 exact favourites in order) with smooth expansion into a 12-photo heart collage featuring desktop hover-to-front and touch lightbox support. The *Show Less* button sits comfortably in normal document flow below the collage.
5. **Little Things I Notice About You**: 11 equal-sized flip cards (#01 to #10 plus **#11 YOU**) in one consistent grid. Every card shares the same styling, dimensions, desktop hover-flip and mobile tap-toggle behavior.
6. **Birthday Cake**: Artisanal SVG two-tier connected cake with button-only candle blowing (no microphone prompts or permissions), extinguishing flames with a gentle breeze, confetti burst, and sweet birthday wish.
7. **The Mystery Gift**: Positioned after the cake. The gift box opens into a unified keepsake containing a unified voice-message player and the heartfelt letter. Background music starts at 100%, smoothly ducks to 40% while the voice recording plays at 100%, then fades back to 100% on pause or completion. The balloon-pop sound is capped at 60%.
8. **11 Reasons Why I Want You Forever**: Scroll-revealed numbered reasons culminating in a starlit finale card.
9. **Grand Birthday Blast**: Full-screen cinematic fireworks display unveiling **`HAPPYY BIRTHDAYY BANGARAM`** and the grand declaration **`I Love You Infinity🤍`** (the only occurrence of "I Love You" across the website).

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation & Launch
```bash
# Install dependencies
npm install

# Start the local development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Quality Checks & Testing
```bash
# Run unit tests (Vitest)
npm test

# Type-check TypeScript code
npm run typecheck

# Production build
npm run build
```

---

## 📝 Personalizing Content

All personal text, dates, memories, balloon messages, and secrets are configured in:  
📁 `src/data/birthdayContent.ts`

- **Bouquet**: Stored at `public/images/surprise/flower.png`.
- **Photographs**: Stored in `public/images/gallery/` (`HER (1-9).jpeg`, `HER (1-3).png`).
- **Background Music**: Canonical file at `public/audio/background-music.mp3` (loops automatically).
- **Voice Recording**: The supplied recording is already included at `public/audio/saiswetha-voice-message.mp3`; replace this file to update it. `gift.voiceMessage.enabled` is already `true`.

---

## ☁️ Deployment

This project is a 100% static React + Vite application with zero server, zero database, zero secrets, and zero backend dependencies. It builds to `dist/` ready for instant deployment to Vercel, Netlify, or GitHub Pages.
