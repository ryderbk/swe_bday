# ✨ A Little Universe for Saiswetha

An intimate, art-directed interactive birthday experience created with love by **Bharath** for **Saiswetha**. Built as a guided single-page story combining cinematic midnight moments, tactile paper scrapbooks, personalized memories, and heartfelt surprises.

---

## 🌟 The Connected Narrative Flow

1. **The Secret Entrance**: A midnight opening scene with an animated wax-sealed envelope that opens on click/tap, initializing the ambient music experience via a real user gesture.
2. **Cinematic Chat Prelude**: A smartphone-framed messaging prelude with typing indicators and delayed bubble entrances.
3. **Happy Birthday Reveal**: Cinematic birthday typography combined with the charming bunny-and-bear birthday artwork.
4. **A Bouquet For You**: Red rose bouquet with couple silhouettes and drifting petals.
5. **Pop a Balloon, Find a Memory**: Interactive mini-game featuring 15 balloons, progress counter, pop sounds, and personal secret notes.
6. **The Story of Us**: Chronological relationship timeline with special emphasis on **July 7, 2025 (The Day We Became Us)** and a dynamic live counter.
7. **Our Little Scrapbook**: Tactile 4-Polaroid default gallery with an interactive **"View All Memories In A Heart ❤️"** button that smoothly transforms into a 13-photo heart collage with a full-featured lightbox.
8. **12 Little Reasons**: Interactive 3D flip cards sharing twelve personal things Bharath loves about her.
9. **One Little Question**: Romantic affirmative question (*"Would you choose me all over again? ❤️"* with *"YES, A THOUSAND TIMES! 🥰 ✨"*).
10. **A Voice Message From Bharath (Optional)**: Vintage cassette player with spinning spools, progress controls, and automatic background music ducking.
11. **The Mystery Gift**: Champagne and rose-gold gift box artwork that unties and opens to reveal your personal promise note.
12. **Make a Wish, Chellam!**: Artisanal SVG birthday cake with glowing flickers, candle-blow detection, and a grand Canvas 2D fireworks celebration.
13. **Our Little Universe & The Final Letter**: Warm unfolding parchment letter and starlit memory constellation concluding with:
    > *Happy Birthday, my Saiswetha.*  
    > *Your Panda kutti. Your Chellam. My favourite person. 🤍*  
    > *Made with love, by Bharath.*

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

## 📝 How to Personalize the Content

All personal text, dates, memories, balloon messages, and secrets are managed in a single, typed file:  
📁 `src/data/birthdayContent.ts`

### 1. Adding / Replacing Photographs
- Place your image files inside `public/images/gallery/` (`photo1.jpg`, `photo2.jpg`, etc.).
- Update the `memories` array in `src/data/birthdayContent.ts`.
- The first 4 appear in the default view; clicking **"View All Memories In A Heart ❤️"** arranges all 13 photos into a heart shape.

### 2. Adding Background Music & Voice Recording
- Place your audio files inside `public/audio/`:
  - `public/audio/background-music.mp3`
  - `public/audio/voice-message.mp3`
- In `src/data/birthdayContent.ts`:
  - Set `music.enabled: true` to enable background melody.
  - Set `voiceMessage.enabled: true` to show the cassette player.

### 3. Balloon Mini-Game Notes
- Customize the 15 secret messages under `balloonGame.balloons` in `src/data/birthdayContent.ts`.

### 4. Editing the Timeline, Gift & Final Letter
- Milestone **July 7, 2025** is highlighted automatically.
- Edit `gift.message` for your personal gift or date invitation.
- Edit `letter.paragraphs` to speak directly from your heart.
- Edit `constellation.memories` to customize the notes hidden inside the stars.

---

## ☁️ Deployment to Vercel (100% Static)

This project is a 100% static React + Vite application with zero server runtime, zero database, and zero secrets required.

### Deploy via Vercel CLI:
```bash
npx vercel
```
Or import into Vercel dashboard: preset **Vite**, build command `npm run build`, output directory `dist`.
