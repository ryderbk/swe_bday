import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { AnimatePresence, motion } from "framer-motion";

import giftClose from "../../assets/gift-close.webp";
import giftOpen from "../../assets/gift-open.webp";

function GiftBox({ nextStep }) {
  const [isOpened, setIsOpened] = useState(false);

  // ==========================================
  // AUDIO / TIMER REFS
  // ==========================================

  const musicRef = useRef(null);
  const voiceRef = useRef(null);

  const voiceTimerRef = useRef(null);
  const nextTimerRef = useRef(null);
  const fadeIntervalRef = useRef(null);

  const heartSoundTimersRef = useRef([]);

  // ==========================================
  // HEART DATA
  // ==========================================

  const hearts = useMemo(() => {
    return Array.from({ length: 75 }).map(
      (_, index) => ({
        id: index,

        // First burst from gift box
        x1: Math.random() * 200 - 100,

        y1:
          -(Math.random() * 150 + 150),

        // Spread across full viewport
        x2:
          Math.random() *
            window.innerWidth -
          window.innerWidth / 2,

        y2:
          Math.random() *
            window.innerHeight -
          window.innerHeight / 2,

        // Gentle floating
        floatX:
          Math.random() * 70 - 35,

        floatY:
          -(Math.random() * 80 + 30),

        // Heart size
        size:
          Math.random() * 20 + 18,

        // Slight stagger
        delay:
          Math.random() * 1.2,

        // Rotation
        rotate:
          Math.random() * 80 - 40,

        // Different heart styles
        emoji: [
          "❤️",
          "💕",
          "💗",
          "💖",
          "💓",
          "❤️",
        ][Math.floor(Math.random() * 6)],
      })
    );
  }, []);

  // ==========================================
  // SOFT GIFT BACKGROUND MUSIC
  // ==========================================

  useEffect(() => {
    const music = new Audio(
      "/music/gift-soft-music.mp3"
    );

    music.loop = true;

    // Keep background music very soft
    music.volume = 0.12;

    musicRef.current = music;

    music.play().catch((error) => {
      console.log(
        "Gift music autoplay blocked:",
        error
      );
    });

    // ========================================
    // VOICE PROMPT
    // ========================================

    voiceTimerRef.current = setTimeout(() => {
      // Don't speak if gift was already opened
      if (isOpened) return;

      const voice = new Audio(
        "/music/tap-gift-voice.mp3"
      );

      voice.volume = 0.75;

      voiceRef.current = voice;

      voice.play().catch((error) => {
        console.log(
          "Gift voice could not play:",
          error
        );
      });
    }, 1000);

    return () => {
      if (voiceTimerRef.current) {
        clearTimeout(
          voiceTimerRef.current
        );
      }

      music.pause();
      music.currentTime = 0;

      if (voiceRef.current) {
        voiceRef.current.pause();
        voiceRef.current.currentTime = 0;
      }
    };
  }, []);

  // ==========================================
  // GIFT OPEN SOUND
  // ==========================================

  const playGiftOpenSound = () => {
    const sound = new Audio(
      "/music/gift-open.mp3"
    );

    sound.volume = 0.35;

    sound.play().catch(() => {});
  };

  // ==========================================
  // HEART POP SOUNDS
  // ==========================================

  const playHeartBurstSounds = () => {
    /*
      Only a few pop sounds.

      We DON'T play 75 sounds for 75 hearts
      because that would become noisy.
    */

    const timings = [
      180,
      350,
      550,
      780,
      1050,
      1350,
    ];

    timings.forEach((time, index) => {
      const timer = setTimeout(() => {
        const pop = new Audio(
          "/music/heart-pop.mp3"
        );

        // Keep pops soft
        pop.volume =
          0.12 + index * 0.01;

        // Slight pitch variation
        pop.playbackRate =
          0.9 + Math.random() * 0.25;

        pop.play().catch(() => {});
      }, time);

      heartSoundTimersRef.current.push(
        timer
      );
    });
  };

  // ==========================================
  // FADE BACKGROUND MUSIC
  // ==========================================

  const fadeGiftMusic = () => {
    const music = musicRef.current;

    if (!music) return;

    // Prevent multiple fade intervals
    if (fadeIntervalRef.current) return;

    const fadeDuration = 2500;
    const intervalTime = 80;

    const steps =
      fadeDuration / intervalTime;

    const volumeStep =
      music.volume / steps;

    fadeIntervalRef.current =
      setInterval(() => {
        const nextVolume =
          music.volume - volumeStep;

        if (nextVolume > 0.01) {
          music.volume = Math.max(
            0,
            nextVolume
          );
        } else {
          clearInterval(
            fadeIntervalRef.current
          );

          fadeIntervalRef.current = null;

          music.volume = 0;

          music.pause();
          music.currentTime = 0;
        }
      }, intervalTime);
  };

  // ==========================================
  // OPEN GIFT
  // ==========================================

  const handleOpenGift = () => {
    if (isOpened) return;

    // Prevent voice from starting if user
    // opens gift quickly
    if (voiceTimerRef.current) {
      clearTimeout(
        voiceTimerRef.current
      );

      voiceTimerRef.current = null;
    }

    // Stop voice if still speaking
    if (voiceRef.current) {
      voiceRef.current.pause();
      voiceRef.current.currentTime = 0;

      voiceRef.current = null;
    }

    // Gift opening sound
    playGiftOpenSound();

    // Open gift
    setIsOpened(true);

    // Heart pop sequence
    playHeartBurstSounds();

    // Slowly fade background music
    fadeGiftMusic();
  };

  // ==========================================
  // MOVE TO FINAL CELEBRATION
  // ==========================================

  useEffect(() => {
    if (!isOpened) return;

    nextTimerRef.current =
      setTimeout(() => {
        nextStep();
      }, 6500);

    return () => {
      if (nextTimerRef.current) {
        clearTimeout(
          nextTimerRef.current
        );
      }
    };
  }, [isOpened, nextStep]);

  // ==========================================
  // FINAL CLEANUP
  // ==========================================

  useEffect(() => {
    return () => {
      // Voice timer

      if (voiceTimerRef.current) {
        clearTimeout(
          voiceTimerRef.current
        );
      }

      // Next page timer

      if (nextTimerRef.current) {
        clearTimeout(
          nextTimerRef.current
        );
      }

      // Music fade

      if (fadeIntervalRef.current) {
        clearInterval(
          fadeIntervalRef.current
        );
      }

      // Heart pop timers

      heartSoundTimersRef.current.forEach(
        (timer) => {
          clearTimeout(timer);
        }
      );

      heartSoundTimersRef.current = [];

      // Background music

      if (musicRef.current) {
        musicRef.current.pause();
        musicRef.current.currentTime = 0;

        musicRef.current = null;
      }

      // Voice

      if (voiceRef.current) {
        voiceRef.current.pause();
        voiceRef.current.currentTime = 0;

        voiceRef.current = null;
      }
    };
  }, []);

  return (
    <div
      className="
        relative

        h-screen
        w-full

        overflow-hidden

        flex
        justify-center
        items-center

        px-5
      "
    >
      <AnimatePresence mode="wait">

        {/* ======================================
            CLOSED GIFT BOX
        ====================================== */}

        {!isOpened ? (
          <motion.div
            key="closed-gift"

            initial={{
              opacity: 0,
              scale: 0.95,
            }}

            animate={{
              opacity: 1,
              scale: 1,
            }}

            exit={{
              opacity: 0,
              scale: 0.95,
            }}

            transition={{
              duration: 0.4,
            }}

            className="
              relative
              z-10

              flex
              flex-col
              items-center

              text-center
            "
          >
            {/* ==================================
                HEADING
            ================================== */}

            <motion.h1
              initial={{
                opacity: 0,
                y: -20,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                duration: 0.7,
              }}

              className="
                text-4xl
                sm:text-5xl
                md:text-6xl

                font-romantic

                text-pink-600

                mb-4
              "
            >
              One Last Surprise... ❤️
            </motion.h1>

            {/* ==================================
                SUB HEADING
            ================================== */}

            <motion.p
              initial={{
                opacity: 0,
              }}

              animate={{
                opacity: 1,
              }}

              transition={{
                delay: 0.3,
                duration: 0.6,
              }}

              className="
                text-sm
                sm:text-base
                md:text-lg

                text-gray-600

                mb-7
              "
            >
              I saved the best surprise for the end.
            </motion.p>

            {/* ==================================
                CLOSED GIFT BOX
            ================================== */}

            <motion.img
              src={giftClose}

              alt="Gift Box"

              initial={{
                opacity: 0,
                scale: 0.85,
              }}

              animate={{
                opacity: 1,

                scale: 1,

                y: [
                  0,
                  -9,
                  0,
                ],

                rotate: [
                  0,
                  -1,
                  1,
                  0,
                ],
              }}

              transition={{
                opacity: {
                  duration: 0.5,
                },

                scale: {
                  duration: 0.5,
                },

                y: {
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                },

                rotate: {
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}

              whileHover={{
                scale: 1.06,
              }}

              whileTap={{
                scale: 0.94,
              }}

              onClick={handleOpenGift}

              className="
                w-48
                sm:w-56
                md:w-64
                lg:w-72

                cursor-pointer

                mx-auto

                object-contain
                select-none

                drop-shadow-xl
              "
            />

            {/*
              No "tap to open" text here.

              The voice gives the instruction.
            */}
          </motion.div>
        ) : (

          /* ======================================
              OPEN GIFT CELEBRATION
          ====================================== */

          <motion.div
            key="open-gift"

            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            transition={{
              duration: 0.2,
            }}

            className="
              absolute
              inset-0

              flex
              justify-center
              items-center
            "
          >
            {/* ==================================
                OPEN GIFT BOX
            ================================== */}

            <motion.img
              src={giftOpen}

              alt="Gift Box Open"

              initial={{
                scale: 0.75,
                opacity: 0,
                y: 15,
              }}

              animate={{
                scale: [
                  0.75,
                  1.12,
                  1,
                  1,
                  0.92,
                ],

                opacity: [
                  0,
                  1,
                  1,
                  1,
                  0,
                ],

                y: [
                  15,
                  0,
                  0,
                  5,
                  15,
                ],
              }}

              transition={{
                duration: 5,

                times: [
                  0,
                  0.1,
                  0.4,
                  0.72,
                  1,
                ],

                ease: "easeInOut",
              }}

              className="
                absolute

                left-1/2
                top-[58%]

                -translate-x-1/2
                -translate-y-1/2

                w-48
                sm:w-56
                md:w-64
                lg:w-72

                z-20

                object-contain

                pointer-events-none
                select-none

                drop-shadow-xl
              "
            />

            {/* ==================================
                HEART BURST
            ================================== */}

            {hearts.map((heart) => (
              <motion.span
                key={heart.id}

                initial={{
                  x: 0,
                  y: 0,

                  opacity: 0,

                  scale: 0,

                  rotate: 0,
                }}

                animate={{
                  // Burst from gift
                  // Spread across screen
                  // Then gently float upward

                  x: [
                    0,

                    heart.x1,

                    heart.x2,

                    heart.x2 +
                      heart.floatX,

                    heart.x2 +
                      heart.floatX * 1.4,
                  ],

                  y: [
                    0,

                    heart.y1,

                    heart.y2,

                    heart.y2 +
                      heart.floatY,

                    heart.y2 +
                      heart.floatY * 1.5,
                  ],

                  opacity: [
                    0,
                    1,
                    1,
                    0.95,
                    0,
                  ],

                  scale: [
                    0,
                    1.35,
                    1,
                    1.08,
                    0.85,
                  ],

                  rotate: [
                    0,

                    heart.rotate,

                    -heart.rotate,

                    heart.rotate,

                    0,
                  ],
                }}

                transition={{
                  duration: 5.8,

                  delay: heart.delay,

                  times: [
                    0,
                    0.15,
                    0.45,
                    0.8,
                    1,
                  ],

                  ease: "easeOut",
                }}

                style={{
                  position: "absolute",

                  left: "50%",
                  top: "55%",

                  fontSize: `${heart.size}px`,

                  zIndex: 30,
                }}

                className="
                  pointer-events-none
                  select-none
                "
              >
                {heart.emoji}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default GiftBox;