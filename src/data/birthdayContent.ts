// ============================================================
//  A Little Universe for Swethu — Birthday Content Configuration
//  Edit this file to personalise every chapter of the experience.
//  Keep all personal copy here; components must not contain
//  scattered hard-coded strings.
// ============================================================

// ─── Shared interfaces ───────────────────────────────────────

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
  microphoneIntro: {
    enabled: boolean;
    heading: string;
    body: string;
    enableLabel: string;
    skipLabel: string;
    successNote: string;
    deniedNote: string;
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
    micButtonLabel: string;
    finalMessage: string;
    breathSensitivity: number;
  };
  gift: {
    enabled: boolean;
    title: string;
    subtitle: string;
    openLabel: string;
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

// ─── Main content object ──────────────────────────────────────

export const birthdayContent: BirthdayContent = {
  site: {
    title: 'A Little Universe for Swethu',
    recipientName: 'Swethu',
    senderName: 'Bharath',
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

  microphoneIntro: {
    enabled: true,
    heading: 'One Little Thing Before Your Surprise',
    body: 'Later, you can make your birthday wish by blowing out the candles. Would you like to enable your microphone for that moment? Your microphone will only be used when you choose to blow out the candles.',
    enableLabel: 'Enable Microphone',
    skipLabel: 'Maybe Later',
    successNote: 'Microphone enabled. You can blow out the candles when you reach that moment!',
    deniedNote: "No worries — you can still blow out the candles using the button when you get there.",
  },

  chatPrelude: {
    enabled: true,
    contactName: 'Swethu 🤍',
    statusText: 'Active now',
    messages: [
      { id: 'c1', sender: 'bharath', text: 'Hey Chellam... ❤️', delayMs: 150 },
      { id: 'c2', sender: 'bharath', text: 'Do you know what today is?', delayMs: 500 },
      { id: 'c3', sender: 'bharath', text: "It's the most special day in the universe ✨", delayMs: 900 },
      { id: 'c4', sender: 'bharath', text: 'I built a whole little world just for you...', delayMs: 1350 },
      { id: 'c5', sender: 'bharath', text: 'Ready to see your birthday surprise? 🥰', delayMs: 1750 },
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
    subtitle: 'Just like these roses, my love for you blooms brighter every day.',
    supportingMessage: 'Every petal carries a wish for your happiness.',
    imageSrc: '/images/surprise/rose-bouquet.svg',
    leftDecorationSrc: '/images/surprise/couple-left.webp',
    rightDecorationSrc: '/images/surprise/couple-right.webp',
    petalsEnabled: true,
  },

  balloonGame: {
    enabled: true,
    title: 'Pop a Balloon, Find a Memory',
    subtitle: 'Every balloon holds a little secret message written just for you.',
    completionTitle: 'You Found Every Little Secret! 🎈✨',
    completionMessage: 'Every single one of these thoughts lives in my heart every day.',
    balloons: [
      { id: 'b1', color: 'pink',   title: 'Sweet Smile',     note: 'The effortless smile that turns my whole day around.' },
      { id: 'b2', color: 'gold',   title: 'July 7, 2025',    note: 'The unforgettable day our journey as us officially started.' },
      { id: 'b3', color: 'purple', title: 'Panda kutti',     note: 'The cutest, most affectionate name in my world.' },
      { id: 'b4', color: 'green',  title: 'Your Voice',      note: 'Hearing you talk about your day is pure peace.' },
      { id: 'b5', color: 'pink',   title: 'Cute Anger',      note: 'Even when you pretend to be mad, you are utterly adorable.' },
      { id: 'b6', color: 'gold',   title: 'Chellam 🤍',      note: 'Forever my favourite person to hold close.' },
      { id: 'b7', color: 'purple', title: 'Your Laugh',      note: 'That genuine laugh that makes everything brighter.' },
      { id: 'b8', color: 'green',  title: 'Late Night Talks', note: 'Conversations where hours pass by like seconds.' },
      { id: 'b9', color: 'pink',   title: 'Pure Kindness',   note: 'The gentle empathy you carry in everything you do.' },
      { id: 'b10', color: 'gold',  title: 'Simply You',      note: 'Never changing for anyone — just being the Swethu I adore.' },
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
        "And you know what, my girl? I don't want this to be just two birthdays together. I want this to be the first of countless birthdays we'll celebrate side by side. I want to be there for your smiles, your wishes, your cake-cutting moments and every little celebration. Year after year, growing together, making memories together and choosing each other through every season of life.\n\nHere's to every birthday we've celebrated, every birthday we're celebrating now, and every birthday we'll celebrate together for as long as we live.\n\nI hope our story never runs out of chapters.",
      tag: 'Forever',
    },
  ],

  galleryConfig: {
    defaultPhotoCount: 4,
    expandedTitle: 'My Favourite Memories',
    expandedSubtitle: 'Arranged in a heart — little glimpses of our happiest days together.',
    viewAllLabel: 'View All Memories ❤️',
    showLessLabel: 'Show Scrapbook',
  },

  // Favourite four first (in order), then remaining photos.
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
    title: 'YOU',
    description: 'No pretenses, no masks — just the real, genuine, irreplaceable Swethu I adore with all my heart.',
  },

  cake: {
    enabled: true,
    title: 'Make a Wish, Swethu!',
    message: 'Close your eyes, make the sweetest wish in the universe, and blow out the candles.',
    blowButtonLabel: 'Blow out the candles',
    micButtonLabel: 'Blow with Microphone',
    finalMessage: 'May all your dreams come true this year! You deserve every drop of happiness in this universe.',
    breathSensitivity: 0.18, // RMS threshold multiplier — tune if needed
  },

  gift: {
    enabled: true,
    title: 'The Mystery Gift',
    subtitle: 'A little keepsake wrapped with care, just for you.',
    openLabel: 'Tap to open',
    keepsakeTitle: 'A Little Message for You',
    giftCloseImage: '/images/surprise/gift-close.webp',
    giftOpenImage: '/images/surprise/gift-open.webp',
    voiceMessage: {
      enabled: false, // set to true once the recording is added
      title: 'A Voice Note for Swethu',
      audioSrc: '/audio/saiswetha-voice-message.mp3',
    },
    letter: {
      title: 'My Dearest Swethu,',
      paragraphs: [
        'Happy Birthday. Watching another year begin for you fills my heart with so much gratitude that I get to walk beside you.',
        'From July 7, 2025, every single memory we have built has become a treasured part of my life. Thank you for your warmth, your laughter, your patience, and for being the wonderful soul that you are.',
        'On this special day, I hope you feel how deeply you are cherished, appreciated, and loved. No matter where life takes us, I promise to celebrate you, stand by you, and remind you every single day of how special you are to me.',
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
      paragraph: 'You show your love through actions, caring for me even when you don\'t express it verbally.',
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
