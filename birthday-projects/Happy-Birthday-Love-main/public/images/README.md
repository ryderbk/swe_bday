# Images Setup Guide

This directory contains all the images for your birthday website. Follow this guide to add your own photos.

## Directory Structure

```bash
public/images/
├── hero/              # Hero section images (polaroid heart formation)
├── timeline/          # Timeline event images
├── secret/            # Password-protected secret vault images
├── gallery/
│   ├── funny/        # Funny moments gallery
│   ├── emotional/    # Emotional moments gallery
│   ├── trips/        # Adventures and trips gallery
│   └── chaos/        # Pure chaos moments gallery
├── birthday-card.jpg  # Birthday card image (shown after blowing candles)
└── birthday-video.mp4 # Optional birthday video message
```

## How to Add Your Images

### 1. Hero Section Images

- Add 13+ images to `public/images/hero/`
- These form the heart shape on the landing page
- Tip: Use a mix of portrait and landscape photos for best effect

### 2. Gallery Images

Add images to respective categories:

- `gallery/funny/` - Hilarious moments 😂
- `gallery/emotional/` - Touching memories 🥹❤️
- `gallery/trips/` - Travel adventures 🗺️
- `gallery/chaos/` - Wild and chaotic moments 🎉

### 3. Timeline Images

- Add images to `public/images/timeline/`
- Each timeline event needs an image
- Update the paths in `lib/config.ts`

### 4. Secret Vault Images

- Add special images to `public/images/secret/`
- These are password-protected
- Make these extra special! ❤️

### 5. Birthday Card & Video

- Replace `birthday-card.jpg` with your own birthday card image
- Optionally add `birthday-video.mp4` for a video message

## Image Recommendations

- **Format**: JPG, PNG, or WebP
- **Size**: Optimize images to 1-2MB max for web performance
- **Resolution**: 1920x1080 or smaller is perfect
- **Naming**: Use descriptive names (e.g., `beach-trip-2023.jpg`)

## After Adding Images

1. Update `lib/config.ts` with your image paths
2. Test locally: `pnpm dev`
3. Check all galleries and the hero section
4. Verify timeline images display correctly

## Git & Privacy

Personal images are gitignored by default. Only the `.gitkeep` files and placeholder images are tracked in version control. Your personal photos remain private!
