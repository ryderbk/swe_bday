import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

import teddy from "../../assets/birthday-teddy.webp";

import Confetti from "./Confetti";
import Butterflies from "./Butterflies";
import ReplayButton from "../Common/ReplayButton";

function FinalCelebration() {
  const musicRef = useRef(null);
  const fadeRef = useRef(null);

  // ==========================================
  // HAPPY BIRTHDAY MUSIC
  // ==========================================

  useEffect(() => {
    const music = new Audio(
      "/music/happy-birthday-final.mp3"
    );

    // Keep playing until Replay or page/component closes
    music.loop = true;

    // Start silent so we can fade in
    music.volume = 0;

    musicRef.current = music;

    music
      .play()
      .then(() => {
        let volume = 0;

        fadeRef.current = setInterval(() => {
          volume += 0.01;

          if (volume >= 0.4) {
            volume = 0.4;

            clearInterval(fadeRef.current);
            fadeRef.current = null;
          }

          music.volume = volume;
        }, 70);
      })
      .catch((error) => {
        console.log(
          "Happy Birthday music could not play:",
          error
        );
      });

    // ========================================
    // CLEANUP
    // ========================================

    return () => {
      if (fadeRef.current) {
        clearInterval(fadeRef.current);
        fadeRef.current = null;
      }

      music.pause();
      music.currentTime = 0;

      musicRef.current = null;
    };
  }, []);

  // ==========================================
  // STOP MUSIC
  // ==========================================

  const stopBirthdayMusic = () => {
    if (fadeRef.current) {
      clearInterval(fadeRef.current);
      fadeRef.current = null;
    }

    if (musicRef.current) {
      musicRef.current.pause();
      musicRef.current.currentTime = 0;

      musicRef.current = null;
    }
  };

  // ==========================================
  // REPLAY
  // ==========================================

  const handleReplay = () => {
    // Stop Happy Birthday song immediately
    stopBirthdayMusic();

    /*
      ReplayButton will perform the actual replay.
      We pass this function to it.
    */
  };

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

        px-4
        sm:px-5
      "
    >
      {/* Confetti */}

      <Confetti />

      {/* Butterflies */}

      <Butterflies />

      {/* Main Content */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
        }}
        className="
          relative
          z-10

          w-full

          flex
          flex-col
          items-center

          text-center

          mt-5
          sm:mt-8
        "
      >
        {/* ====================================
            TEDDY CARD
        ==================================== */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.75,
            y: 30,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.4,
            ease: "easeOut",
          }}
          className="
            relative

            bg-gradient-to-br
            from-white
            via-pink-50
            to-rose-100

            rounded-[35px]

            border-4
            border-pink-100

            shadow-2xl
            shadow-pink-200

            p-4
            sm:p-5
            md:p-6

            mb-4
          "
        >
          {/* Teddy Movement */}

          <motion.div
            animate={{
              y: [0, -7, 0],
              rotate: [-1, 1, -1],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img
              src={teddy}
              alt="Birthday Teddy"
              className="
                w-44
                sm:w-52
                md:w-60
                lg:w-64

                object-contain
              "
            />
          </motion.div>

          {/* ==================================
              PUMPING HEART
          ================================== */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: 1,

              scale: [
                1,
                1.25,
                1,
              ],
            }}
            transition={{
              opacity: {
                duration: 0.4,
                delay: 1,
              },

              scale: {
                duration: 0.9,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="
              absolute
              top-3
              right-3

              w-9
              h-9

              sm:w-10
              sm:h-10

              rounded-full

              bg-pink-500

              text-white
              text-lg

              flex
              justify-center
              items-center

              shadow-lg
              shadow-pink-300
            "
          >
            ❤️
          </motion.div>
        </motion.div>

        {/* ====================================
            HEADING
        ==================================== */}

        {/* <motion.h1
          initial={{
            opacity: 0,
            y: 15,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.6,
            delay: 1.2,
          }}
          className="
            text-3xl
            sm:text-4xl
            md:text-5xl

            font-romantic

            text-pink-600

            leading-tight

            mb-2
          "
        >
          LOTS OF LOVE FOR YOU ❤️
        </motion.h1> */}
        <motion.h1
          initial={{
            opacity: 0,
            y: 15,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.6,
            delay: 1.2,
          }}
          className="
            text-3xl
            sm:text-4xl
            md:text-5xl

            font-romantic
            font-semibold

            text-pink-600

            tracking-wide
            leading-relaxed

            mb-4

            text-center
          "
        >
          LOTS OF LOVE FOR YOU ❤️
        </motion.h1>
        {/* ====================================
            HAPPY BIRTHDAY
        ==================================== */}

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
            delay: 1.8,
          }}
          className="
            text-lg
            sm:text-xl
            md:text-2xl

            font-cursive
            font-semibold

            text-pink-500

            mb-1
          "
        >
          Happy Birthday Baby! 🎂❤️
        </motion.p>

        {/* ====================================
            MESSAGE 1
        ==================================== */}

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
            duration: 0.7,
            delay: 2.4,
          }}
          className="
            text-sm
            sm:text-base
            md:text-lg

            text-gray-700

            leading-6
            sm:leading-7
          "
        >
          May your life always be filled
          <br />
          with love, happiness and beautiful memories.
        </motion.p>

        {/* ====================================
            MESSAGE 2
        ==================================== */}

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
            duration: 0.7,
            delay: 3.1,
          }}
          className="
            text-sm
            sm:text-base
            md:text-lg

            text-gray-700

            mt-1
            mb-4

            leading-6
            sm:leading-7
          "
        >
          I hope all your dreams come true. ❤️
        </motion.p>

        {/* ====================================
            REPLAY
        ==================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.6,
            delay: 3.8,
          }}
        >
          <ReplayButton
            onBeforeReplay={handleReplay}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default FinalCelebration;