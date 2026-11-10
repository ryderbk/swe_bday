import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import cake from "../../assets/birthdaycake.webp";
import PartyPopper from "../Common/PartyPopper";

function Candle({ nextStep }) {
  const [blown, setBlown] = useState(false);
  const [timer, setTimer] = useState(5);

  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);

  // ==========================================
  // PLAY BIRTHDAY MUSIC
  // ==========================================

  const playBirthdayMusic = () => {
    // Prevent multiple audio instances
    if (audioRef.current) return;

    const audio = new Audio("/music/happy-birthday.mp3");

    audio.volume = 0.5;

    audioRef.current = audio;

    audio.play().catch((error) => {
      console.log("Birthday music couldn't play:", error);
    });
  };

  // ==========================================
  // FADE OUT MUSIC
  // ==========================================

  const fadeOutMusic = () => {
    const audio = audioRef.current;

    if (!audio || fadeIntervalRef.current) return;

    const fadeDuration = 2000;
    const fadeStep = 100;

    const startingVolume = audio.volume;

    const volumeDecrease =
      startingVolume / (fadeDuration / fadeStep);

    fadeIntervalRef.current = setInterval(() => {
      if (!audioRef.current) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
        return;
      }

      const newVolume =
        audioRef.current.volume - volumeDecrease;

      if (newVolume <= 0.01) {
        audioRef.current.volume = 0;
        audioRef.current.pause();
        audioRef.current.currentTime = 0;

        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;

        return;
      }

      audioRef.current.volume = newVolume;
    }, fadeStep);
  };

  // ==========================================
  // COUNTDOWN
  // ==========================================

  useEffect(() => {
    if (!blown) return;

    // Start fading when only 2 seconds remain
    if (timer === 2) {
      fadeOutMusic();
    }

    // Move to next section
    if (timer === 0) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      nextStep();
      return;
    }

    const countdown = setTimeout(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(countdown);
  }, [blown, timer, nextStep]);

  // ==========================================
  // AUDIO CLEANUP
  // ==========================================

  useEffect(() => {
    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, []);

  // ==========================================
  // BLOW CANDLE
  // ==========================================

  const blowCandle = () => {
    if (blown) return;

    playBirthdayMusic();
    setBlown(true);
  };

  return (
    <div
      className="
        min-h-screen
        flex
        flex-col
        justify-center
        items-center
        px-5
        text-center
        relative
        overflow-hidden
      "
    >
      {!blown && (
        <>
          {/* Heading */}

          <motion.h1
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: [1, 1.03, 1],
            }}
            transition={{
              opacity: {
                duration: 0.6,
              },

              y: {
                duration: 0.6,
              },

              scale: {
                repeat: Infinity,
                duration: 1.8,
                ease: "easeInOut",
              },
            }}
            className="
              text-4xl
              sm:text-5xl
              font-cursive
              text-pink-600
              mb-5
            "
          >
            Blow The Candle Baby ❤️
          </motion.h1>

          {/* Wish Message */}

          <motion.p
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.2,
            }}
            className="
              text-lg
              sm:text-xl
              text-gray-500
              mb-10
            "
          >
            Close your eyes and make a wish.
          </motion.p>
        </>
      )}

      {!blown ? (
        /* ======================================
           CANDLE
        ====================================== */

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -10, 0],
          }}
          transition={{
            opacity: {
              duration: 0.5,
            },

            scale: {
              duration: 0.5,
            },

            y: {
              repeat: Infinity,
              duration: 1.8,
              ease: "easeInOut",
            },
          }}
          whileHover={{
            scale: 1.08,
          }}
          whileTap={{
            scale: 0.9,
          }}
          onClick={blowCandle}
          className="
            cursor-pointer
            flex
            flex-col
            items-center
          "
        >
          <motion.div
            animate={{
              filter: [
                "drop-shadow(0 0 3px rgba(251,191,36,0.3))",
                "drop-shadow(0 0 12px rgba(251,191,36,0.7))",
                "drop-shadow(0 0 3px rgba(251,191,36,0.3))",
              ],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            <h1 className="text-8xl">
              🕯️
            </h1>
          </motion.div>

          <p
            className="
              mt-5
              text-base
              sm:text-lg
              font-cursive
              italic
              text-pink-400
            "
          >
            tap the candle to make your wish ✨
          </p>
        </motion.div>
      ) : (
        <>
          {/* ======================================
             PARTY POPPERS
          ====================================== */}

          <div className="fixed top-5 left-5 z-50">
            <PartyPopper position="left" />
          </div>

          <div className="fixed bottom-5 right-5 z-50">
            <PartyPopper position="right" />
          </div>

          {/* ======================================
             CELEBRATION CONTENT
          ====================================== */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.5,
            }}
            className="
              flex
              flex-col
              items-center
              relative
              z-10
            "
          >
            {/* Birthday Cake */}

            <motion.img
              src={cake}
              alt="Birthday Cake"
              initial={{
                opacity: 0,
                scale: 0.5,
                y: 30,
              }}
              animate={{
                opacity: 1,
                scale: [0.5, 1.08, 1],
                y: [30, -5, 0],
              }}
              transition={{
                duration: 1,
                ease: "easeOut",
              }}
              className="
                w-44
                sm:w-52
                md:w-56
                mx-auto
                drop-shadow-xl
              "
            />

            {/* Birthday Message */}

            <motion.h2
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.5,
              }}
              className="
                text-3xl
                md:text-4xl
                font-cursive
                text-pink-600
                mt-5
              "
            >
              Happy Birthday Baby 🎉
            </motion.h2>

            {/* Wish Message */}

            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.6,
                delay: 0.8,
              }}
              className="
                text-base
                md:text-lg
                text-pink-500
                font-medium
                mt-3
              "
            >
              I hope all your wishes come true. ❤️
            </motion.p>

            {/* ======================================
               COUNTDOWN
            ====================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 1,
              }}
              className="
                mt-6
                text-center
              "
            >
              <p
                className="
                  text-base
                  sm:text-lg
                  text-gray-500
                "
              >
                Opening your surprise in...
              </p>

              <motion.h1
                key={timer}
                initial={{
                  scale: 0.5,
                  opacity: 0,
                  y: 5,
                }}
                animate={{
                  scale: [0.5, 1.15, 1],
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.45,
                  ease: "easeOut",
                }}
                className="
                  text-4xl
                  md:text-5xl
                  font-cursive
                  text-pink-500
                  mt-2
                "
              >
                {timer}
              </motion.h1>
            </motion.div>
          </motion.div>
        </>
      )}
    </div>
  );
}

export default Candle;