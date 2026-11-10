# ✨ A Little Universe for Saiswetha

An intimate, art-directed interactive birthday experience created with love by **Bharath** for **Saiswetha**. Built as a guided single-page story combining cinematic midnight moments, tactile paper scrapbooks, personalized memories, and heartfelt surprises.

---

## 🌟 The 10-Chapter Experience Flow

1. **The Secret Entrance**: A midnight opening scene with an animated wax-sealed envelope that opens on click/tap, initializing the ambient music experience via a real user gesture.
2. **Happy Birthday, Saiswetha**: A cinematic introduction celebrating her special day.
3. **The Story of Us**: A chronological relationship timeline with special emphasis on **July 7, 2025 (The Day We Became Us)** and a dynamic live counter calculating exact elapsed years, months, and days.
4. **Our Little Scrapbook**: Tactile Polaroid memories with handwritten captions, washi-tape accents, and a full-featured lightbox (supporting touch swipe, keyboard navigation, and scroll-lock).
5. **12 Little Reasons**: Interactive 3D flip cards sharing twelve personal things Bharath loves about her.
6. **How Well Do You Know Us?**: A sweet, affectionate 5-question relationship quiz with positive-only celebrations.
7. **A Voice Message From Bharath**: A vintage cassette player with spinning spools, animated waveform, progress controls, transcript drawer, and automatic background music ducking.
8. **The Mystery Gift**: A 3D wrapped gift box with ribbon and bow that unties and lifts its lid to reveal a personal promise note.
9. **Make a Wish, Chellam!**: An artisanal SVG birthday cake with glowing flickers. She can blow out the candles via button or optional microphone detection, triggering celebratory confetti.
10. **Our Little Universe & The Final Letter**: A warm unfolding letter against a starlit sky, accompanied by an interactive memory constellation. Concludes with the personal message:
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

All personal text, dates, memories, quiz questions, and secrets are managed in a single, typed file:
📁 `src/data/birthdayContent.ts`

### 1. Adding / Replacing Photographs
- Place your image files inside:
  - `public/images/gallery/` (for Polaroid scrapbook photos)
  - `public/images/timeline/` (for optional milestone pictures)
- In `src/data/birthdayContent.ts`, update the `memories` array:
  ```typescript
  {
    id: "memory-1",
    title: "Pure Joy",
    caption: "Your smile that lights up everything around you.",
    date: "July 2025",
    image: "/images/gallery/photo1.jpg",
    orientation: "portrait",
    rotation: -2,
  }
  ```
- *Note:* If photos are missing or empty, the gallery displays an elegant development placeholder and will never crash.

### 2. Adding Background Music & Voice Recording
- Place your audio files inside `public/audio/`:
  - `public/audio/background-music.mp3` (romantic background melody)
  - `public/audio/voice-message.mp3` (Bharath's personal voice note)
- In `src/data/birthdayContent.ts`:
  - Enable music: `music.enabled: true`
  - Enable voice note: `voiceMessage.enabled: true`, specify `audioSrc`, and optionally paste the transcript in `voiceMessage.transcript`.

### 3. Editing Timeline Milestones
- The confirmed milestone (**July 7, 2025 — The Day We Became Us**) is already set and highlighted with special badges.
- You can customize additional memories, trips, or inside moments by editing `timeline` in `src/data/birthdayContent.ts`.

### 4. Customizing the 12 Reasons
- Edit the `reasons` list in `src/data/birthdayContent.ts`. You can change titles, card numbers, and the heartfelt messages revealed on the back of each card.

### 5. Customizing the Quiz
- Edit `quiz` in `src/data/birthdayContent.ts`. Customize questions, choices, `correctIndex`, and the affectionate explanation displayed upon answer.

### 6. Customizing the Mystery Gift & Cake
- In `gift`: change `title`, `revealTitle`, and `message` to your real gift, date invitation, or secret promise.
- In `cake`: change `message` or `finalMessage`.

### 7. Editing the Final Letter & Constellation
- In `letter`: add or edit the paragraphs written in your own words.
- In `constellation`: add interactive memory stars with customized x/y positions and short notes.

---

## 👁️ Optional Content & Graceful Hiding

The application is engineered with defensive rendering:
- **Voice Message chapter**: Automatically hidden if `voiceMessage.enabled: false` or if `voiceMessage.audioSrc` fails to load.
- **Background Music**: Remains completely silent and unobtrusive if no audio file is provided. Never blocks interaction.
- **Microphone Blowing**: Completely optional. Candle extinguishing always works reliably with the tap/click button.
- **Empty Scrapbook / Constellation**: Gracefully renders tasteful fallbacks without console errors or broken layouts.

---

## ☁️ Deployment to Vercel (100% Static)

This project is a 100% static React + Vite application with zero server runtime, zero database, and zero secrets required.

### Quick Deploy via Vercel CLI:
```bash
npx vercel
```

### Deploy via GitHub / Vercel Dashboard:
1. Push your repository to GitHub / GitLab.
2. In Vercel, click **Add New Project** and import your repository.
3. Vercel will automatically detect the **Vite** framework preset:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**. Your custom birthday website will be live in seconds with HTTPS!

