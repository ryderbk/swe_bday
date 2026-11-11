# ✨ A Little Universe for Swethu

An intimate, art-directed interactive birthday experience created with love by **Bharath** for **Swethu**. Built as a guided single-page story combining cinematic midnight moments, tactile paper scrapbooks, personalized memories, and heartfelt surprises.

---

## 🌟 The Connected Narrative Flow

### Entrance & Preludes
1. **The Secret Entrance**: A midnight opening scene with an animated wax-sealed envelope that opens on click/tap, initializing the ambient music (`Rathinamo.mp3`) and entering fullscreen mode.
2. **Microphone Permission Intro**: A dedicated, elegant prompt explaining the candle-blowing experience before requesting microphone access (with zero-pressure "Maybe Later" fallback).
3. **Smartphone Chat Prelude**: A messaging simulation with fast typing animation and a skip option.
4. **Happy Birthday Reveal**: Birthday typography paired with the cleaned bunny-and-bear celebration artwork.

### Guided Chapters
1. **A Bouquet For You**: Handcrafted SVG red rose bouquet with drifting petals and couple silhouettes.
2. **Pop a Balloon, Find a Memory**: Interactive 10-balloon game with in-place note card reveals.
3. **The Story of Us**: Chronological timeline with 8 milestones (anchored by **July 7, 2025: The Day We Became Us**) and a real-time ticking counter showing years, months, days, hours, minutes, and seconds.
4. **Our Little Scrapbook**: Tactile 4-Polaroid default gallery with smooth expansion into a 12-photo heart collage featuring desktop hover-to-front and touch lightbox support.
5. **Little Things I Notice About You**: 10 interactive 3D flip cards (hover on desktop, tap on mobile) followed by a prominent, distinct **YOU** card.
6. **Birthday Cake**: SVG tiered cake with candle blow detection using real-time RMS acoustic breath analysis and small celebration confetti.
7. **The Mystery Gift**: Champagne and rose-gold gift box that unboxes into a unified keepsake containing the voice message player and the heartfelt love letter.
8. **11 Reasons Why I Want You Forever**: Scroll-revealed numbered reasons culminating in a starlit finale reason.
9. **Grand Birthday Blast**: Full-screen cinematic fireworks display unveiling *"HAPPY BIRTHDAY"* and the grand declaration *"I Love You Infinity🤍"*.

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

- **Photographs**: Stored in `public/images/gallery/` (`HER (1-9).jpeg`, `HER (1-3).png`).
- **Music**: Background music is configured to `/audio/background-music.mp3` (loops automatically).
- **Voice Message**: Placed at `public/audio/saiswetha-voice-message.mp3` or customized in `birthdayContent.ts`.

---

## ☁️ Deployment

This project is a 100% static React + Vite application with zero backend or external API dependencies. Deployable to GitHub Pages, Vercel, or Netlify with `npm run build`.
