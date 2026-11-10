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
  rotation?: number; // subtle angle for Polaroid look
}

export interface LoveReason {
  id: string;
  number: number;
  title: string;
  description: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ConstellationMemory {
  id: string;
  title: string;
  note: string;
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
}

export interface BirthdayContent {
  site: {
    title: string;
    recipientName: string;
    senderName: string;
    birthdayDate: string; // YYYY-MM-DD
    relationshipStartDate: string; // YYYY-MM-DD
    showRelationshipCounter: boolean;
    nicknames: string[];
  };
  entrance: {
    eyebrow: string;
    title: string;
    subtext: string;
    buttonLabel: string;
  };
  intro: {
    title: string;
    subtitle: string;
    message: string;
    buttonLabel: string;
  };
  timeline: TimelineMilestone[];
  memories: MemoryPhoto[];
  reasons: LoveReason[];
  quiz: QuizQuestion[];
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

  intro: {
    title: "Happy Birthday, Saiswetha",
    subtitle: "Today is all about you.",
    message: "A little universe created just to celebrate the warmth, laughter, and light you bring into every single day.",
    buttonLabel: "Begin Our Story",
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
      description: "[Bharath: Add your special date, trip, or inside milestone here in birthdayContent.ts]",
      isConfirmed: false,
      tag: "Memory",
    },
    {
      id: "milestone-placeholder-2",
      date: "",
      title: "Little Unforgettable Moments",
      description: "[Bharath: Add another sweet milestone, favourite conversation, or milestone here]",
      isConfirmed: false,
      tag: "Everyday Magic",
    },
  ],

  // Photographs can be placed inside public/images/gallery/ and added here
  memories: [
    {
      id: "memory-1",
      title: "Pure Joy",
      caption: "Your smile that lights up everything around you.",
      date: "",
      image: "/images/gallery/photo1.jpg",
      orientation: "portrait",
      rotation: -2,
    },
    {
      id: "memory-2",
      title: "Little Adventures",
      caption: "The quiet moments that mean the most.",
      date: "",
      image: "/images/gallery/photo2.jpg",
      orientation: "landscape",
      rotation: 3,
    },
    {
      id: "memory-3",
      title: "My Favourite View",
      caption: "Always you, always my favourite person.",
      date: "",
      image: "/images/gallery/photo3.jpg",
      orientation: "portrait",
      rotation: -1,
    },
    {
      id: "memory-4",
      title: "Unfiltered Happiness",
      caption: "Laughter that stays in my heart forever.",
      date: "",
      image: "/images/gallery/photo4.jpg",
      orientation: "square",
      rotation: 2,
    },
  ],

  reasons: [
    {
      id: "reason-1",
      number: 1,
      title: "Your Smile",
      description: "The effortless way your smile instantly turns any ordinary day into something bright and gentle.",
    },
    {
      id: "reason-2",
      number: 2,
      title: "Your Voice",
      description: "Hearing you talk about your day is hands-down the most comforting sound in my whole world.",
    },
    {
      id: "reason-3",
      number: 3,
      title: "Your Expressions",
      description: "The little eyebrow raises, your adorable reactions, and all the faces you make when you are surprised.",
    },
    {
      id: "reason-4",
      number: 4,
      title: "Your Cute Anger",
      description: "Even when you pretend to be mad at me, you are still the cutest human being on this planet.",
    },
    {
      id: "reason-5",
      number: 5,
      title: "The Way You Talk",
      description: "Every sentence, every sweet word, and how you share your thoughts with so much warmth.",
    },
    {
      id: "reason-6",
      number: 6,
      title: "Your Little Habits",
      description: "The tiny quirks and routines that are uniquely yours—things only someone who loves you gets to notice.",
    },
    {
      id: "reason-7",
      number: 7,
      title: "Your Laugh",
      description: "That genuine, uncontrollable laugh that makes everyone else around you instantly smile too.",
    },
    {
      id: "reason-8",
      number: 8,
      title: "Your Kindness",
      description: "How deeply you care for people and the pure empathy you carry in everything you do.",
    },
    {
      id: "reason-9",
      number: 9,
      title: "Your Randomness",
      description: "Spontaneous thoughts, sudden jokes, and the wonderful surprises of your playful mind.",
    },
    {
      id: "reason-10",
      number: 10,
      title: "Your Hugs",
      description: "Feeling safe, at peace, and completely at home whenever I am close to you.",
    },
    {
      id: "reason-11",
      number: 11,
      title: "Your Presence",
      description: "Just knowing you exist in my life makes every challenge smaller and every joy bigger.",
    },
    {
      id: "reason-12",
      number: 12,
      title: "Simply Being You",
      description: "No pretenses, no masks—just the real, genuine, irreplaceable Saiswetha I adore with all my heart.",
    },
  ],

  quiz: [
    {
      id: "quiz-1",
      question: "When did our story officially begin as us?",
      options: ["July 7, 2025", "August 15, 2025", "January 1, 2025", "November 11, 2025"],
      correctIndex: 0,
      explanation: "July 7, 2025 — The unforgettable date that brought us together forever.",
    },
    {
      id: "quiz-2",
      question: "Who is Bharath's absolute favourite person in the entire world?",
      options: ["Saiswetha (Panda kutti!)", "A secret mystery person", "Nobody else", "Definitely Chellam"],
      correctIndex: 0,
      explanation: "Always you, Saiswetha! No one else even comes close.",
    },
    {
      id: "quiz-3",
      question: "What is Bharath's favourite nickname for you?",
      options: ["Panda kutti / Chellam", "Troublemaker", "Stranger", "Boss"],
      correctIndex: 0,
      explanation: "Panda kutti and Chellam will always be the sweetest names for you.",
    },
    {
      id: "quiz-4",
      question: "What happens when Saiswetha smiles?",
      options: ["Bharath's entire day lights up", "Time stands still", "Everything feels peaceful", "All of the above!"],
      correctIndex: 3,
      explanation: "Every single one of the above—your smile is pure magic.",
    },
    {
      id: "quiz-5",
      question: "How long does Bharath want to stay by your side?",
      options: ["Just this year", "Through every tomorrow and forever", "A couple of seasons", "Until tomorrow"],
      correctIndex: 1,
      explanation: "Every tomorrow, through every season, and forever.",
    },
  ],

  voiceMessage: {
    enabled: false, // Turn to true once voice-message.mp3 is added
    title: "A Voice Note From Bharath",
    audioSrc: "/audio/voice-message.mp3",
    transcript: "[Bharath's personal voice message transcript can be placed here.]",
  },

  music: {
    enabled: true,
    audioSrc: "/audio/background-music.mp3",
    label: "A song for you",
  },

  gift: {
    enabled: true,
    title: "The Mystery Gift",
    subtitle: "A little promise wrapped with care, just for you.",
    revealTitle: "For My Chellam 🤍",
    message: "[Bharath: Write your real gift, personal promise, or date invitation here inside birthdayContent.ts]",
    note: "P.S. Redeemable anytime, anywhere, with zero expiration date.",
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
      "[Bharath: Add any personal memories, private jokes, and words from the bottom of your heart here in birthdayContent.ts]"
    ],
    signature: "With all my love,\nBharath 🤍",
    footerAffection: "Happy Birthday, my Saiswetha. Your Panda kutti. Your Chellam. My favourite person.",
  },

  constellation: {
    title: "Our Constellation of Memories",
    subtitle: "Touch each star to unveil a little thought written in the sky.",
    memories: [
      {
        id: "star-1",
        title: "The First Spark",
        note: "July 7, 2025 — The date that changed my life for the better.",
        x: 20,
        y: 35,
      },
      {
        id: "star-2",
        title: "Your Laughter",
        note: "The sound that instantly makes everything alright.",
        x: 40,
        y: 20,
      },
      {
        id: "star-3",
        title: "Panda kutti",
        note: "My sweetest nickname for my sweetest person.",
        x: 60,
        y: 25,
      },
      {
        id: "star-4",
        title: "Every Tomorrow",
        note: "Looking forward to every single adventure waiting for us.",
        x: 80,
        y: 40,
      },
      {
        id: "star-5",
        title: "Chellam 🤍",
        note: "Always in my heart, always my favourite person.",
        x: 50,
        y: 60,
      },
    ],
  },
};

