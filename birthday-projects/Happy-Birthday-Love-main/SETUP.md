# 🎨 Setup & Customization Guide

This guide will help you transform this template into a personalized birthday website for your best friend!

## 📋 Quick Start Checklist

- [ ] Clone the repository
- [ ] Install dependencies (`pnpm install`)
- [ ] Add your images to `public/images/`
- [ ] Customize `lib/config.ts`
- [ ] Test locally (`pnpm dev`)
- [ ] Deploy to Vercel or your preferred platform

## 🖼️ Step 1: Add Your Images

### Where to Add Images

All images go in the `public/images/` directory. See the detailed guide at `public/images/README.md`.

**Quick Reference:**

- Hero section: 13+ images in `hero/`
- Galleries: Images in `gallery/funny/`, `gallery/emotional/`, `gallery/trips/`, `gallery/chaos/`
- Timeline: Images in `timeline/`
- Secret vault: Images in `secret/`
- Birthday card: Replace `birthday-card.jpg`
- Video message: Add `birthday-video.mp4` (optional)

### Image Tips

- Optimize images to 1-2MB for best performance
- Use JPG, PNG, or WebP formats
- Recommended resolution: 1920x1080 or smaller
- Mix of portrait and landscape works best

## ⚙️ Step 2: Customize Configuration

Open `lib/config.ts` and personalize everything!

### 2.1 Names & Basic Info

```typescript
herName: "Your Love",      // Birthday person's name
nickname: "My Love",       // Their nickname
yourName: "Your Name",     // Your name
```

### 2.2 Secret Vault Password

```typescript
magicCode: "easypass",     // Change to your secret code
```

### 2.3 Hero Section

```typescript
heroTitle: "Happy Birthday",
heroSubtitle: "My Love!!!",
heroEmojis: "🥹❤️",
```

Update `heroImages` array with your image paths from `public/images/hero/`

### 2.4 Love Letter

Customize the `letterText` array with your personal message:

```typescript
letterText: [
  "Your opening line...",
  "Your heartfelt paragraphs...",
  // Add as many as you like!
  "- Your name ❤️",
],
```

### 2.5 Photo Galleries

Update paths in `publicGalleries`:

```typescript
publicGalleries: {
  funny: [
    { src: "/images/gallery/funny/your-image.jpg", caption: "Your caption" },
  ],
  emotional: [ /* ... */ ],
  trips: [ /* ... */ ],
  chaos: [ /* ... */ ],
}
```

### 2.6 Secret Vault

Update `secretGallery` with special protected images:

```typescript
secretGallery: [
  { src: "/images/secret/special-moment.jpg", caption: "Our secret ❤️" },
]
```

### 2.7 Interactive Elements

**Balloon Messages** - Inside jokes and memories:

```typescript
balloonMessages: [
  "Remember when we...",
  "That time you...",
]
```

**Soulmate Reasons** - Why they're special:

```typescript
soulmateReasons: [
  "You always know when something is wrong",
  "You make me laugh until I can't breathe",
]
```

**Timeline Events** - Your friendship journey:

```typescript
timelineEvents: [
  {
    date: "Day 1",
    title: "The Beginning",
    description: "When we first met...",
    image: "/images/timeline/first-day.jpg",
  },
]
```

**Quiz Questions** - Test their knowledge:

```typescript
quizQuestions: [
  {
    question: "What's my go-to comfort food?",
    options: ["Pizza", "Ice cream", "Pasta", "Biryani"],
    correct: 0, // Index of correct answer (0-3)
  },
]
```

### 2.8 Final Touches

```typescript
birthdayCardImage: "/images/birthday-card.jpg",
finalVideoUrl: "/images/birthday-video.mp4", // or YouTube embed URL
watermarkText: "Made with Love ❤️",
```

## 🎨 Step 3: Customize Theme (Optional)

### Change Color Scheme

Edit `app/globals.css` to change from purple to your preferred colors:

```css
--primary: /* your primary color */
--secondary: /* your secondary color */
```

Update Tailwind classes in components if needed (search for `purple-`, `pink-`, `violet-`).

## 🧪 Step 4: Test Locally

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) and test:

- [ ] Hero section displays correctly
- [ ] All galleries load
- [ ] Secret vault password works
- [ ] Timeline shows your events
- [ ] Quiz has correct answers
- [ ] Balloon game works
- [ ] Cake finale animation plays
- [ ] Mobile responsive design looks good

## 🚀 Step 5: Deploy

### Deploy to Vercel (Recommended)

1. Push your code to GitHub (images are gitignored - you'll need to add them manually on the server or use a different storage solution)
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Next.js and deploy

**Important:** If you want images in your deployed version:

- Remove the images ignore pattern from `.gitignore`, OR
- Use a service like Cloudinary/AWS S3 for image hosting and update paths

### Deploy to Other Platforms

Build the project:

```bash
pnpm build
```

Deploy the `.next` folder to any static hosting service.

## 🔒 Privacy & Security

### Image Protection

- Right-click is disabled on images
- Drag-and-drop is disabled
- Images are gitignored by default

### Secret Vault

- Password-protected gallery
- Change `magicCode` in config to your secret password
- Only someone with the password can access these images

## 🎯 Advanced Customization

### Add More Gallery Categories

1. Create new folder: `public/images/gallery/your-category/`
2. Add to `config.ts`:

```typescript
publicGalleries: {
  yourCategory: [
    { src: "/images/gallery/your-category/img.jpg", caption: "..." },
  ],
}
```

3.Update `photo-gallery.tsx` component to include new category

### Change Animations

Edit components using Framer Motion:

- `components/floating-balloons.tsx` - Balloon animations
- `components/confetti-effect.tsx` - Confetti effects
- `components/cake-finale.tsx` - Cake and fireworks

## 📝 Tips & Best Practices

1. **Test on Mobile**: Use Chrome DevTools to test responsive design
2. **Optimize Images**: Use tools like TinyPNG or ImageOptim
3. **Backup**: Keep a backup of your customized config file
4. **Personal Touch**: Add inside jokes and specific memories
5. **Surprise Factor**: Don't let them see it until it's perfect!

## 🐛 Troubleshooting

### Images Not Showing

- Check file paths match exactly (case-sensitive)
- Ensure images are in `public/images/` folder
- Verify file extensions (.jpg vs .jpeg)

### Build Errors

```bash
rm -rf .next node_modules
pnpm install
pnpm build
```

### Secret Vault Not Working

- Check `magicCode` in config
- Clear browser localStorage: `localStorage.clear()`
- Make sure you're entering the exact password

## 💡 Need Help?

- Check the main `README.md`
- Review example config in `lib/config.ts`
- Ensure Node.js 18+ is installed
- Try clearing `.next` folder and rebuilding

---

**Happy customizing! Your love is going to adore this! ❤️**
