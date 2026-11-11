// ============================================================
//  A Little Universe for Swethu — Birthday Content Configuration
//  Edit this file to personalise every chapter of the experience.
//  Keep all personal copy here; components must not contain
//  scattered hard-coded strings.
// ============================================================

// ─── Shared interfaces ──────────────────────────────────────

export interface TimelineMilestone {
  id: string;
  date?: string;
  title: string;
  description: string;
  isConfirmed?: boolean;
  tag?: string;
}

export interface MemoryPhoto {
  id: string;
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

export interface SpecialYouCard {
  id: string;
  number?: number;
  title: string;
  description: string;
}

export interface ForeverReason {
  id: string;
  number: number;
  title: string;
  paragraph: string;
}

export interface ChatMessage {
  id: string;
  sender: 'bharath' | 'swethu';
  text: string;
  delayMs: number;
}

export interface BalloonItem {
  id: string;
  color: 'gold' | 'pink' | 'purple' | 'green';
  note: string;
  title: string;
}

export interface VoiceMessageConfig {
  enabled: boolean;
  title: string;
  audioSrc: string;
}

export interface LetterConfig {
  title: string;
  paragraphs: string[];
  signature: string;
}

export interface BirthdayContent {
  site: {
    title: string;
    recipientName: string;
    senderName: string;
    senderBirthDate: string;
    recipientBirthDate: string;
    birthdayDate: string;
    relationshipStartDate: string;
    timeZone: string;
    showRelationshipCounter: boolean;
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
  };
  balloonGame: {
    enabled: boolean;
    title: string;
    subtitle: string;
    completionTitle: string;
    completionMessage: string;
    balloons: BalloonItem[];
  };
  timeline: TimelineMilestone[];
  galleryConfig: {
    defaultPhotoCount: number;
    expandedTitle: string;
    expandedSubtitle: string;
    viewAllLabel: string;
    showLessLabel: string;
  };
  memories: MemoryPhoto[];
  reasons: LoveReason[];
  specialYouCard: SpecialYouCard;
  cake: {
    enabled: boolean;
    title: string;
    message: string;
    blowButtonLabel: string;
    finalMessage: string;
  };
  gift: {
    enabled: boolean;
    title: string;
    subtitle: string;
    keepsakeTitle: string;
    giftCloseImage: string;
    giftOpenImage: string;
    voiceMessage: VoiceMessageConfig;
    letter: LetterConfig;
  };
  foreverReasons: ForeverReason[];
  music: {
    enabled: boolean;
    audioSrc: string;
    label: string;
  };
}

// ─── Main content object ────────────────────────────────────

export const birthdayContent: BirthdayContent = {
  site: {
    title: 'A Little Universe for Swethu',
    recipientName: 'Swethu',
    senderName: 'Bharath',
    senderBirthDate: '2005-10-10',
    recipientBirthDate: '2005-11-11',
    birthdayDate: '2026-11-11',
    relationshipStartDate: '2025-07-07',
    timeZone: 'Asia/Kolkata',
    showRelationshipCounter: true,
  },

  entrance: {
    eyebrow: 'A little something for someone very special...',
    title: 'Made with love, just for you.',
    subtext: 'Touch the wax seal to unlock your surprise.',
    buttonLabel: 'Open your surprise',
  },

  chatPrelude: {
    enabled: true,
    contactName: 'Swethu 🤍',
    statusText: 'Active now',
    messages: [
      { id: 'c1', sender: 'bharath', text: 'Hey Chellam... ❤️', delayMs: 250 },
      { id: 'c2', sender: 'bharath', text: 'Do you know what today is?', delayMs: 350 },
      { id: 'c3', sender: 'bharath', text: "It's the most special day in the universe ✨", delayMs: 400 },
      { id: 'c4', sender: 'bharath', text: 'I built a whole little world just for you...', delayMs: 400 },
      { id: 'c5', sender: 'bharath', text: 'Ready to see your birthday surprise? 🥰', delayMs: 450 },
    ],
    continueLabel: 'Step Into Your Universe ✨',
  },

  intro: {
    title: 'Happyy Birthdayy Swethu ma🤍',
    subtitle: 'Today is all about you.',
    message: 'A little universe created just to celebrate the warmth, laughter, and light you bring into every single day.',
    buttonLabel: 'Discover Your Surprise ✨',
    teddyImage: '/images/surprise/birthday-teddy.webp',
  },

  bouquet: {
    enabled: true,
    title: 'A Bouquet For You ❤️',
    subtitle: 'Just like these flowers, my love for you blooms brighter every day.',
    supportingMessage: 'Every petal carries a wish for your happiness.',
    imageSrc: '/images/surprise/flower.png',
    leftDecorationSrc: '/images/surprise/couple-left.webp',
    rightDecorationSrc: '/images/surprise/couple-right.webp',
    petalsEnabled: true,
  },

  balloonGame: {
    enabled: true,
    title: 'Pop a Balloon, Find a Surprise',
    subtitle: 'Every balloon holds a little birthday surprise written just for you.',
    completionTitle: 'You Found All 10 Surprises! 🎈',
    completionMessage: 'You found all 10 little surprises! Your birthday mission is complete. 🎈',
    balloons: [
      { id: 'b1',  color: 'pink',   title: 'Birthday Wish',    note: 'Today, the whole universe celebrates you. ✨' },
      { id: 'b2',  color: 'gold',   title: 'Secret Wish',      note: 'Make one wish. Keep it just between you and the stars. 🤫' },
      { id: 'b3',  color: 'purple', title: 'Tiny Mission',     note: 'Your mission: give the biggest smile you can. 😊' },
      { id: 'b4',  color: 'green',  title: 'Music Choice',     note: 'You get to choose our next song. 🎶' },
      { id: 'b5',  color: 'pink',   title: 'Birthday Rule',    note: 'Birthday rule: dessert comes before everything today. 🍰' },
      { id: 'b6',  color: 'gold',   title: 'Silly Challenge',  note: 'Show me your funniest birthday expression. 😂' },
      { id: 'b7',  color: 'purple', title: 'Dance Break',      note: "You've unlocked a tiny dance break. Move those shoulders! 💃" },
      { id: 'b8',  color: 'green',  title: 'Future Adventure', note: "Choose our next little adventure. I'll bring the snacks. 🌷" },
      { id: 'b9',  color: 'pink',   title: 'Photo Mission',    note: 'Our next photo needs the most ridiculous pose. 📸' },
      { id: 'b10', color: 'gold',   title: 'Secret Pass',      note: "One question, any question. I'll answer honestly. 💌" },
    ],
  },

  timeline: [
    {
      id: 'tl-01',
      title: 'Where It All Began: Just Friends',
      description:
        'Before everything else, we were friends. We started with a simple friendship, never knowing that one day we would become such an important part of each other\'s lives. Little did I know that the person I called my friend would eventually become my favourite person.',
      tag: 'Chapter 01',
    },
    {
      id: 'tl-02',
      title: 'Somewhere Along the Way: I Fell for You',
      description:
        'Somewhere along our journey, my feelings for you started becoming something more. Without even realising it, I began seeing you differently. You slowly became someone incredibly special to me, someone I wanted closer to my heart. And just like that, I fell for you.',
      tag: 'Chapter 02',
    },
    {
      id: 'tl-03',
      title: 'Then Your Heart Found Mine',
      description:
        'And then came the most beautiful turn in our story — you started developing feelings for me too. What had once been something I felt on my own slowly became something we both shared. The feeling I had been holding close finally found its way back to me.',
      tag: 'Chapter 03',
    },
    {
      id: 'tl-04',
      date: '2025-07-07',
      title: 'The Day We Became Us',
      description:
        'July 7, 2025. A date I\'ll always carry in my heart. The day we finally confessed our feelings and gave them a name. The day our story changed from yours and mine to ours. It wasn\'t just another date on the calendar; it was the beginning of my favourite chapter — US.',
      isConfirmed: true,
      tag: '07 · 07 · 2025',
    },
    {
      id: 'tl-05',
      title: 'Every Little Moment Became a Memory',
      description:
        'Since then, we\'ve experienced so much together. Beautifully happy moments, endless smiles, silly arguments, disagreements, fights, sad days and moments when things weren\'t easy. Our journey hasn\'t always been perfect, but it has always been ours. We\'ve laughed, cried, disagreed, made up and continued creating memories. And every little part of this journey has become a piece of our story that I\'ll always treasure.',
      tag: 'Chapter 05',
    },
    {
      id: 'tl-06',
      date: '2025-11-11',
      title: 'Our First Birthday Together',
      description:
        'Then came the first birthday we got to celebrate together. Another beautiful milestone, another memory to keep close to my heart. Getting to be part of your special day made it even more meaningful to me. It was one more reminder of how lucky I am to share these moments with you.',
      tag: '11 · 11 · 2025',
    },
    {
      id: 'tl-07',
      date: '2026-11-11',
      title: 'Your Second Birthday With Me: Here We Are Again!',
      description:
        "And here we are, celebrating your second birthday together! Another year, another birthday, and another beautiful memory we're adding to our story. I hope today brings you all the happiness your heart deserves. More than anything, I'm grateful that I get to be here, celebrating another year of YOU.",
      isConfirmed: true,
      tag: '11 · 11 · 2026',
    },
    {
      id: 'tl-08',
      title: 'Every Birthday, For As Long As We Live',
      description:
        "I was born on 10/10, you on 11/11, and on 7/7, we became us. Three dates with repeating numbers, each holding a special place in our story. Maybe the universe was leaving little signs of us even before we met. And after celebrating two birthdays together, I hope these are just the beginning of countless birthdays we'll share — growing, laughing, and making memories side by side for as long as we live. 🤍✨",
      tag: 'Forever',
    },
  ],

  galleryConfig: {
    defaultPhotoCount: 4,
    expandedTitle: 'My Favourite Memories',
    expandedSubtitle: 'Arranged in a heart — glimpses of our happiest days together.',
    viewAllLabel: 'View All Memories In A Heart 🤍',
    showLessLabel: 'Show Default Scrapbook ↑',
  },

  // Favourite four first (in order), then remaining unique photos.
  // Photos placed in public/images/gallery/
  memories: [
    { id: 'm1',  image: '/images/gallery/HER (2).png',    orientation: 'portrait',   rotation: -2 },
    { id: 'm2',  image: '/images/gallery/HER (4).jpeg',   orientation: 'portrait',   rotation:  3 },
    { id: 'm3',  image: '/images/gallery/HER (3).jpeg',   orientation: 'portrait',   rotation: -1 },
    { id: 'm4',  image: '/images/gallery/HER (7).jpeg',   orientation: 'portrait',   rotation:  2 },
    { id: 'm5',  image: '/images/gallery/HER (1).png',    orientation: 'portrait',   rotation: -3 },
    { id: 'm6',  image: '/images/gallery/HER (1).jpeg',   orientation: 'portrait',   rotation:  1 },
    { id: 'm7',  image: '/images/gallery/HER (2).jpeg',   orientation: 'portrait',   rotation: -2 },
    { id: 'm8',  image: '/images/gallery/HER (3).png',    orientation: 'portrait',   rotation:  2 },
    { id: 'm9',  image: '/images/gallery/HER (5).jpeg',   orientation: 'portrait',   rotation: -1 },
    { id: 'm10', image: '/images/gallery/HER (6).jpeg',   orientation: 'portrait',   rotation:  3 },
    { id: 'm11', image: '/images/gallery/HER (8).jpeg',   orientation: 'portrait',   rotation: -2 },
    { id: 'm12', image: '/images/gallery/HER (9).jpeg',   orientation: 'portrait',   rotation:  1 },
  ],

  reasons: [
    { id: 'r1',  number:  1, title: 'Your Smile',         description: 'The effortless way your smile instantly turns any ordinary day into something bright and gentle.' },
    { id: 'r2',  number:  2, title: 'Your Voice',         description: 'Hearing you talk about your day is hands-down the most comforting sound in my whole world.' },
    { id: 'r3',  number:  3, title: 'Your Expressions',   description: 'The little eyebrow raises, your adorable reactions, and all the faces you make when you are surprised.' },
    { id: 'r4',  number:  4, title: 'Your Cute Anger',    description: 'Even when you pretend to be mad at me, you are still the cutest human being on this planet.' },
    { id: 'r5',  number:  5, title: 'The Way You Talk',   description: 'Every sentence, every sweet word, and how you share your thoughts with so much warmth.' },
    { id: 'r6',  number:  6, title: 'Your Little Habits', description: 'The tiny quirks and routines that are uniquely yours — things only someone who loves you gets to notice.' },
    { id: 'r7',  number:  7, title: 'Your Laugh',         description: 'That genuine, uncontrollable laugh that makes everyone else around you instantly smile too.' },
    { id: 'r8',  number:  8, title: 'Your Kindness',      description: 'How deeply you care for people and the pure empathy you carry in everything you do.' },
    { id: 'r9',  number:  9, title: 'Your Randomness',    description: 'Spontaneous thoughts, sudden jokes, and the wonderful surprises of your playful mind.' },
    { id: 'r10', number: 10, title: 'Your Presence',      description: 'Just knowing you exist in my life makes every challenge smaller and every joy bigger.' },
  ],

  specialYouCard: {
    id: 'you-card',
    number: 11,
    title: 'YOU',
    description: 'No pretenses, no masks — just the real, genuine, irreplaceable Swethu I adore with all my heart.',
  },

  cake: {
    enabled: true,
    title: 'Make a Wish, Swethu!',
    message: 'Close your eyes, make the sweetest wish in the universe, and blow out the candles.',
    blowButtonLabel: 'Blow out the candles',
    finalMessage: 'May every wish you whisper today find its way home to your heart. ✨',
  },

  gift: {
    enabled: true,
    title: 'The Mystery Gift',
    subtitle: 'A little keepsake wrapped with care, just for you.',
    keepsakeTitle: 'A Little Message for You',
    giftCloseImage: '/images/surprise/gift-close.webp',
    giftOpenImage: '/images/surprise/gift-open.webp',
    voiceMessage: {
      enabled: false,
      title: 'A Voice Note for Swethu',
      audioSrc: '/audio/saiswetha-voice-message.mp3',
    },
    letter: {
      title: 'My Dearest Swethu,',
      paragraphs: [
        'Happy Birthday. Watching another year begin for you fills my heart with so much gratitude that I get to walk beside you.',
        'From July 7, 2025, every single memory we have built has become a treasured part of my life. Thank you for your warmth, your laughter, your patience, and for being the wonderful soul that you are.',
        'On this special day, I hope you feel how deeply you are cherished and appreciated. No matter where life takes us, I promise to celebrate you, stand by you, and remind you every single day of how special you are to me.',
        'You are my Panda kutti, my Chellam, and my whole heart.',
      ],
      signature: 'With all my love,\nBharath 🤍',
    },
  },

  foreverReasons: [
    {
      id: 'fr1',
      number: 1,
      title: 'Your Beautiful Smile',
      paragraph: 'You make my heart melt when your eyes glow as you smile.',
    },
    {
      id: 'fr2',
      number: 2,
      title: 'Your Voice',
      paragraph: 'You have a voice that I love, especially when you call me by my name.',
    },
    {
      id: 'fr3',
      number: 3,
      title: 'The Way You Care',
      paragraph: "You show your love through actions, caring for me even when you don't express it verbally.",
    },
    {
      id: 'fr4',
      number: 4,
      title: 'My Comfort Place',
      paragraph: 'You are my comfort; your presence feels like home every single time.',
    },
    {
      id: 'fr5',
      number: 5,
      title: 'My Peace and My Chaos',
      paragraph: 'You are my peace and my chaos in the cutest balance.',
    },
    {
      id: 'fr6',
      number: 6,
      title: 'My First Person',
      paragraph: 'You are always the first person I want to share everything with.',
    },
    {
      id: 'fr7',
      number: 7,
      title: 'You Make Me Better',
      paragraph: 'You inspire me to grow and become the best version of myself.',
    },
    {
      id: 'fr8',
      number: 8,
      title: 'Your Cute Sorry',
      paragraph: "You make me laugh by saying the harshest things when you're mad, only to come back with your cutest little 'sorry'.",
    },
    {
      id: 'fr9',
      number: 9,
      title: 'Every Little Thing About You',
      paragraph: 'Your cute stubbornness, your pure heart, that unforgettable smile and blush, and even your random nose expression — all these little things make you uniquely YOU.',
    },
    {
      id: 'fr10',
      number: 10,
      title: 'Your Adorable Chubbiness',
      paragraph: 'You possess one of the most charming features of all — your adorable chubbiness.',
    },
    {
      id: 'fr11',
      number: 11,
      title: 'Simply YOU',
      paragraph: "You are just... YOU. And that's why I see my future with you so clearly, so beautifully and so completely. I don't want a perfect person. I want you, with every little thing that makes you who you are.",
    },
  ],

  music: {
    enabled: true,
    audioSrc: '/audio/background-music.mp3',
    label: 'Rathinamo',
  },
};
