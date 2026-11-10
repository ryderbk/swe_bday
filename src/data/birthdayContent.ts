export interface TimelineMilestone {
  id: string;
  date?: string;
  title: string;
  description: string;
  image?: string;
  isConfirmed?: boolean;
  tag?: string;
}

export interface MemoryPhoto {
  id: string;
  title?: string;
  caption: string;
  date?: string;
  image: string;
  orientation?: 'portrait' | 'landscape' | 'square';
  rotation?: number;
}

export interface LoveReason {
  id: string;
  number: number;
  title: string;
  description: string;
}

export interface ConstellationMemory {
  id: string;
  title: string;
  note: string;
  x: number;
  y: number;
}

export interface ChatMessage {
  id: string;
  sender: 'bharath' | 'saiswetha';
  text: string;
  delayMs: number;
}

export interface BalloonItem {
  id: string;
  color: 'gold' | 'pink' | 'purple' | 'green';
  note: string;
  title: string;
}

export interface BirthdayContent {
  site: {
    title: string;
    recipientName: string;
    senderName: string;
    birthdayDate: string;
    relationshipStartDate: string;
    showRelationshipCounter: boolean;
    nicknames: string[];
  };
  entrance: {
    eyebrow: string;
    title: string;
    subtext: string;
    buttonLabel: string;
  };
  chatPrelude: {
    enabled: boolean;
    contactName: string;
    statusText: string;
    messages: ChatMessage[];
    continueLabel: string;
  };
  intro: {
    title: string;
    subtitle: string;
    message: string;
    buttonLabel: string;
    teddyImage: string;
  };
  bouquet: {
    enabled: boolean;
    title: string;
    subtitle: string;
    supportingMessage: string;
    imageSrc: string;
    leftDecorationSrc: string;
    rightDecorationSrc: string;
    petalsEnabled: boolean;
    continueLabel: string;
  };
  balloonGame: {
    enabled: boolean;
    title: string;
    subtitle: string;
    completionTitle: string;
    completionMessage: string;
    continueLabel: string;
    balloons: BalloonItem[];
  };
  timeline: TimelineMilestone[];
  memories: MemoryPhoto[];
  galleryConfig: {
    defaultPhotoCount: number;
    expandedTitle: string;
    expandedSubtitle: string;
    viewAllLabel: string;
    showLessLabel: string;
  };
  reasons: LoveReason[];
  romanticQuestion: {
    enabled: boolean;
    title: string;
    subtitle: string;
    buttonLabel: string;
    helperText: string;
    revealedTitle: string;
    revealedMessage: string;
    continueLabel: string;
  };
  voiceMessage: {
    enabled: boolean;
    title: string;
    audioSrc: string;
    transcript?: string;
  };
  music: {
    enabled: boolean;
    audioSrc: string;
    label: string;
  };
  gift: {
    enabled: boolean;
    title: string;
    subtitle: string;
    revealTitle: string;
    message: string;
    note?: string;
    giftCloseImage: string;
    giftOpenImage: string;
  };
  cake: {
    enabled: boolean;
    title: string;
    message: string;
    blowButtonLabel: string;
    micPrompt: string;
    finalMessage: string;
  };
  letter: {
    title: string;
    paragraphs: string[];
    signature: string;
    footerAffection: string;
  };
  constellation: {
    title: string;
    subtitle: string;
    memories: ConstellationMemory[];
  };
}

export const birthdayContent: BirthdayContent = {
  site: {
    title: "A Little Universe for Saiswetha",
    recipientName: "Saiswetha",
    senderName: "Bharath",
    birthdayDate: "2026-11-11",
    relationshipStartDate: "2025-07-07",
    showRelationshipCounter: true,
    nicknames: ["Panda kutti", "Chellam", "my favourite person"],
  },

  entrance: {
    eyebrow: "A little something for someone very special...",
    title: "Made with love, just for you.",
    subtext: "Touch the wax seal to unlock your surprise.",
    buttonLabel: "Open your surprise",
  },

  chatPrelude: {
    enabled: true,
    contactName: "Saiswetha 🤍",
    statusText: "Active now",
    messages: [
      { id: "c1", sender: "bharath", text: "Hey Chellam... ❤️", delayMs: 400 },
      { id: "c2", sender: "bharath", text: "Do you know what today is?", delayMs: 1400 },
      { id: "c3", sender: "bharath", text: "It's the most special day in the universe ✨", delayMs: 2600 },
      { id: "c4", sender: "bharath", text: "I built a whole little world just for you...", delayMs: 4000 },
      { id: "c5", sender: "bharath", text: "Ready to see your birthday surprise? 🥰", delayMs: 5400 },
    ],
    continueLabel: "Step Into Your Universe ✨",
  },

  intro: {
    title: "Happy Birthday, Saiswetha",
    subtitle: "Today is all about you.",
    message: "A little universe created just to celebrate the warmth, laughter, and light you bring into every single day.",
    buttonLabel: "Begin Our Story",
    teddyImage: "/images/surprise/birthday-teddy.webp",
  },

  bouquet: {
    enabled: true,
    title: "A Bouquet For You ❤️",
    subtitle: "Just like these roses, my love for you blooms brighter every day.",
    supportingMessage: "Every petal carries a wish for your happiness, Chellam.",
    imageSrc: "/images/surprise/bouquet.webp",
    leftDecorationSrc: "/images/surprise/couple-left.webp",
    rightDecorationSrc: "/images/surprise/couple-right.webp",
    petalsEnabled: true,
    continueLabel: "Continue to Balloons",
  },

  balloonGame: {
    enabled: true,
    title: "Pop a Balloon, Find a Memory",
    subtitle: "Every balloon holds a little secret message written just for you. Pop them all!",
    completionTitle: "You Found Every Little Secret! 🎈✨",
    completionMessage: "Every single one of these thoughts lives in my heart every day.",
    continueLabel: "Explore Our Story",
    balloons: [
      { id: "b1", color: "pink", title: "Sweet Smile", note: "The effortless smile that turns my whole day around." },
      { id: "b2", color: "gold", title: "July 7, 2025", note: "The unforgettable day our journey as us officially started." },
      { id: "b3", color: "purple", title: "Panda kutti", note: "The cutest, most affectionate name in my world." },
      { id: "b4", color: "green", title: "Your Voice", note: "Hearing you talk about your day is pure peace." },
      { id: "b5", color: "pink", title: "Cute Anger", note: "Even when you pretend to be mad, you're utterly adorable." },
      { id: "b6", color: "gold", title: "Chellam 🤍", note: "Forever my favourite person to hold close." },
      { id: "b7", color: "purple", title: "Unstoppable Laugh", note: "That genuine laugh that makes everything brighter." },
      { id: "b8", color: "pink", title: "Warm Hugs", note: "Feeling completely safe and at home in your arms." },
      { id: "b9", color: "green", title: "Late Night Talks", note: "Conversations where hours pass by like seconds." },
      { id: "b10", color: "gold", title: "Pure Kindness", note: "The gentle empathy you carry in everything you do." },
      { id: "b11", color: "purple", title: "Random Jokes", note: "The spontaneous little quirks that make you so special." },
      { id: "b12", color: "pink", title: "Quiet Moments", note: "Just being beside you in silence is my favourite place." },
      { id: "b13", color: "green", title: "Every Tomorrow", note: "Looking forward to thousands of tomorrows with you." },
      { id: "b14", color: "gold", title: "My Strength", note: "Knowing you believe in me makes me feel invincible." },
      { id: "b15", color: "purple", title: "Simply You", note: "Never changing for anyone—just being the Saiswetha I adore." },
    ],
  },

  timeline: [
    {
      id: "official-relationship-day",
      date: "2025-07-07",
      title: "The Day We Became Us",
      description: "July 7, 2025 — The moment our journey officially started together. The most beautiful chapter written in our stars.",
      isConfirmed: true,
      tag: "Our Milestone",
    },
    {
      id: "milestone-placeholder-1",
      date: "",
      title: "Our Special Memories",
      description: "Every quiet laugh, inside joke, and shared silence that became a treasured cornerstone of our story.",
      isConfirmed: false,
      tag: "Memory",
    },
    {
      id: "milestone-placeholder-2",
      date: "",
      title: "Little Unforgettable Moments",
      description: "From our favourite conversations to everyday adventures, every memory with you is timeless.",
      isConfirmed: false,
      tag: "Everyday Magic",
    },
  ],

  galleryConfig: {
    defaultPhotoCount: 4,
    expandedTitle: "My Favourite Memories",
    expandedSubtitle: "Arranged in a heart—thirteen little glimpses of our happiest days together.",
    viewAllLabel: "View All Memories In A Heart ❤️",
    showLessLabel: "Show Default Scrapbook ↑",
  },

  memories: [
    { id: "m1", title: "Pure Joy", caption: "Your smile that lights up everything around you.", date: "July 2025", image: "/images/gallery/photo1.jpg", orientation: "portrait", rotation: -2 },
    { id: "m2", title: "Little Adventures", caption: "The quiet moments that mean the absolute most.", date: "Aug 2025", image: "/images/gallery/photo2.jpg", orientation: "landscape", rotation: 3 },
    { id: "m3", title: "My Favourite View", caption: "Always you, always my favourite person in the room.", date: "Oct 2025", image: "/images/gallery/photo3.jpg", orientation: "portrait", rotation: -1 },
    { id: "m4", title: "Unfiltered Happiness", caption: "Laughter that stays in my heart forever.", date: "Dec 2025", image: "/images/gallery/photo4.jpg", orientation: "square", rotation: 2 },
    { id: "m5", title: "Gentle Days", caption: "Just holding hands and walking together.", date: "Jan 2026", image: "/images/gallery/photo5.jpg", orientation: "portrait", rotation: -3 },
    { id: "m6", title: "Sweet Serenity", caption: "Peace feels like this right here.", date: "Feb 2026", image: "/images/gallery/photo6.jpg", orientation: "landscape", rotation: 1 },
    { id: "m7", title: "Cherished Hours", caption: "Time stops when I am with you.", date: "Mar 2026", image: "/images/gallery/photo7.jpg", orientation: "square", rotation: -2 },
    { id: "m8", title: "Sunlit Glow", caption: "The brightest light in every room.", date: "Apr 2026", image: "/images/gallery/photo8.jpg", orientation: "portrait", rotation: 2 },
    { id: "m9", title: "Best Days", caption: "Countless reasons to be grateful.", date: "May 2026", image: "/images/gallery/photo9.jpg", orientation: "landscape", rotation: -1 },
    { id: "m10", title: "Warmth", caption: "Home is wherever you are.", date: "Jun 2026", image: "/images/gallery/photo10.jpg", orientation: "portrait", rotation: 3 },
    { id: "m11", title: "Heart to Heart", caption: "Every whispered dream we share.", date: "Jul 2026", image: "/images/gallery/photo11.jpg", orientation: "square", rotation: -2 },
    { id: "m12", title: "Endless Smiles", caption: "You make my soul genuinely happy.", date: "Aug 2026", image: "/images/gallery/photo12.jpg", orientation: "landscape", rotation: 2 },
    { id: "m13", title: "Forever Us", caption: "Through every tomorrow, hand in hand.", date: "Sep 2026", image: "/images/gallery/photo13.jpg", orientation: "portrait", rotation: 1 },
  ],

  reasons: [
    { id: "reason-1", number: 1, title: "Your Smile", description: "The effortless way your smile instantly turns any ordinary day into something bright and gentle." },
    { id: "reason-2", number: 2, title: "Your Voice", description: "Hearing you talk about your day is hands-down the most comforting sound in my whole world." },
    { id: "reason-3", number: 3, title: "Your Expressions", description: "The little eyebrow raises, your adorable reactions, and all the faces you make when you are surprised." },
    { id: "reason-4", number: 4, title: "Your Cute Anger", description: "Even when you pretend to be mad at me, you are still the cutest human being on this planet." },
    { id: "reason-5", number: 5, title: "The Way You Talk", description: "Every sentence, every sweet word, and how you share your thoughts with so much warmth." },
    { id: "reason-6", number: 6, title: "Your Little Habits", description: "The tiny quirks and routines that are uniquely yours—things only someone who loves you gets to notice." },
    { id: "reason-7", number: 7, title: "Your Laugh", description: "That genuine, uncontrollable laugh that makes everyone else around you instantly smile too." },
    { id: "reason-8", number: 8, title: "Your Kindness", description: "How deeply you care for people and the pure empathy you carry in everything you do." },
    { id: "reason-9", number: 9, title: "Your Randomness", description: "Spontaneous thoughts, sudden jokes, and the wonderful surprises of your playful mind." },
    { id: "reason-10", number: 10, title: "Your Hugs", description: "Feeling safe, at peace, and completely at home whenever I am close to you." },
    { id: "reason-11", number: 11, title: "Your Presence", description: "Just knowing you exist in my life makes every challenge smaller and every joy bigger." },
    { id: "reason-12", number: 12, title: "Simply Being You", description: "No pretenses, no masks—just the real, genuine, irreplaceable Saiswetha I adore with all my heart." },
  ],

  romanticQuestion: {
    enabled: true,
    title: "Would you choose me all over again? ❤️",
    subtitle: "You know in your heart there's only one right answer! 💕",
    buttonLabel: "🤍 YES, A THOUSAND TIMES! 🥰 ✨",
    helperText: "Just press Yes! 🥰",
    revealedTitle: "I Knew It! 🥰",
    revealedMessage: "And I would choose you in every lifetime, in every universe, without a moment of hesitation. You are my forever person, Chellam 🤍",
    continueLabel: "Continue To Your Surprise",
  },

  voiceMessage: {
    enabled: false,
    title: "A Voice Note From Bharath",
    audioSrc: "/audio/voice-message.mp3",
    transcript: "A personal voice note spoken directly from Bharath to Saiswetha.",
  },

  music: {
    enabled: false,
    audioSrc: "/audio/background-music.mp3",
    label: "A song for you",
  },

  gift: {
    enabled: true,
    title: "The Mystery Gift",
    subtitle: "A little promise wrapped with care, just for you.",
    revealTitle: "For My Chellam 🤍",
    message: "A golden ticket for an unforgettable birthday celebration, endless laughter, and a promise that I will always stand by your side.",
    note: "P.S. Redeemable anytime, anywhere, with zero expiration date.",
    giftCloseImage: "/images/surprise/gift-close.webp",
    giftOpenImage: "/images/surprise/gift-open.webp",
  },

  cake: {
    enabled: true,
    title: "Make a Wish, Chellam!",
    message: "Close your eyes, make the sweetest wish in the universe, and blow out the candles.",
    blowButtonLabel: "Blow out the candles",
    micPrompt: "Or blow gently into your microphone",
    finalMessage: "May all your dreams come true this year, Saiswetha! You deserve every drop of happiness in this universe.",
  },

  letter: {
    title: "My Dearest Saiswetha,",
    paragraphs: [
      "Happy Birthday, my favourite person. Watching another year begin for you fills my heart with so much gratitude that I get to walk beside you.",
      "From July 7, 2025, every single memory we have built has become a treasured star in my own little universe. Thank you for your warmth, your laughter, your patience, and for being the wonderful soul that you are.",
      "On this special day, I hope you feel how deeply you are cherished, appreciated, and loved. No matter where life takes us, I promise to celebrate you, stand by you, and remind you every single day of how special you are to me.",
      "You are my Panda kutti, my Chellam, and my whole heart. Happy Birthday, my love."
    ],
    signature: "With all my love,\nBharath 🤍",
    footerAffection: "Happy Birthday, my Saiswetha. Your Panda kutti. Your Chellam. My favourite person.",
  },

  constellation: {
    title: "Our Constellation of Memories",
    subtitle: "Touch each glowing star in the night sky to unveil a treasured thought.",
    memories: [
      { id: "star-1", title: "The First Spark", note: "July 7, 2025 — The date that changed my life for the better.", x: 22, y: 38 },
      { id: "star-2", title: "Your Laughter", note: "The sound that instantly makes everything in my world alright.", x: 38, y: 22 },
      { id: "star-3", title: "Panda kutti", note: "My sweetest nickname for my sweetest person.", x: 62, y: 22 },
      { id: "star-4", title: "Every Tomorrow", note: "Looking forward to every single adventure waiting for us ahead.", x: 78, y: 38 },
      { id: "star-5", title: "Chellam 🤍", note: "Always in my heart, always my favourite person in every lifetime.", x: 50, y: 64 },
    ],
  },
};
