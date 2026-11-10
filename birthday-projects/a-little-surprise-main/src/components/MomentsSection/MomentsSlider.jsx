import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import birthdayData from "../../data/birthdayData";

function MomentsSlider({ nextStep }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const moments = birthdayData.moments;

  // Card 5 = index 4
  const showContinue =
    currentIndex === 4 && currentIndex === moments.length - 1;

  // ==========================================
  // NEXT CARD
  // Swipe RIGHT
  // ==========================================

  const nextCard = () => {
    if (currentIndex >= moments.length - 1) return;

    setDirection(1);
    setCurrentIndex((prev) => prev + 1);
  };

  // ==========================================
  // PREVIOUS CARD
  // Swipe LEFT
  // ==========================================

  const previousCard = () => {
    if (currentIndex <= 0) return;

    setDirection(-1);
    setCurrentIndex((prev) => prev - 1);
  };

  // ==========================================
  // SWIPE BOTH SIDES
  // ==========================================

  const handleDragEnd = (_, info) => {
    const swipeDistance = 70;
    const swipeVelocity = 400;

    // Swipe RIGHT -> Next
    if (
      info.offset.x > swipeDistance ||
      info.velocity.x > swipeVelocity
    ) {
      nextCard();
      return;
    }

    // Swipe LEFT -> Previous
    if (
      info.offset.x < -swipeDistance ||
      info.velocity.x < -swipeVelocity
    ) {
      previousCard();
    }
  };

  // ==========================================
  // CARD ANIMATIONS
  // ==========================================

  const cardVariants = {
    enter: (direction) => ({
      x: direction >= 0 ? -80 : 80,
      opacity: 0,
      scale: 0.92,
      rotate: direction >= 0 ? -2 : 2,
    }),

    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
    },

    exit: (direction) => ({
      x: direction >= 0 ? 100 : -100,
      opacity: 0,
      scale: 0.92,
      rotate: direction >= 0 ? 2 : -2,
    }),
  };

  return (
    <div
      className="
        relative
        h-screen
        w-full
        overflow-hidden

        flex
        flex-col
        justify-center
        items-center

        px-4
        sm:px-5
        py-4

        text-center
      "
    >
      {/* ======================================
          HEADING
      ====================================== */}

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

          leading-tight

          mb-4
          sm:mb-5
        "
      >
        Some Sweet Moments ❤️
      </motion.h1>

      {/* ======================================
          OUTER CARD
      ====================================== */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
          y: 20,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
          delay: 0.15,
        }}
        className="
          bg-white/80
          backdrop-blur-sm

          rounded-[28px]
          shadow-xl

          p-3
          sm:p-4

          w-[88vw]
          max-w-[320px]

          flex
          flex-col
          items-center

          border
          border-white/70
        "
      >
        {/* ====================================
            MEMORY CARD
        ==================================== */}

        <div
          className="
            relative
            w-full
            overflow-hidden
            rounded-3xl
          "
        >
          <AnimatePresence
            mode="wait"
            custom={direction}
          >
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"

              drag="x"

              dragConstraints={{
                left: 0,
                right: 0,
              }}

              dragElastic={0.7}

              onDragEnd={handleDragEnd}

              transition={{
                duration: 0.4,
                ease: "easeOut",
              }}

              whileTap={{
                cursor: "grabbing",
              }}

              className="
                w-full

                min-h-[290px]
                sm:min-h-[320px]

                rounded-3xl

                bg-gradient-to-br
                from-pink-100
                via-white
                to-pink-50

                px-5
                sm:px-6

                py-5

                flex
                flex-col
                justify-center
                items-center

                cursor-grab
                select-none

                shadow-inner

                border
                border-pink-100
              "
            >
              {/* ==================================
                  ICON
              ================================== */}

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.5,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -6, 0],
                }}
                transition={{
                  opacity: {
                    duration: 0.4,
                  },

                  scale: {
                    duration: 0.5,
                  },

                  y: {
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className="
                  text-5xl
                  sm:text-6xl
                  mb-3
                "
              >
                {moments[currentIndex].icon}
              </motion.div>

              {/* ==================================
                  TITLE
              ================================== */}

              <motion.h2
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                }}
                className="
                  text-3xl
                  sm:text-4xl

                  font-romantic
                  text-pink-600

                  leading-tight

                  mb-3
                "
              >
                {moments[currentIndex].title}
              </motion.h2>

              {/* ==================================
                  DIVIDER
              ================================== */}

              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: 55,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                }}
                className="
                  h-px
                  bg-pink-300
                  mb-4
                "
              />

              {/* ==================================
                  MESSAGE
              ================================== */}

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
                  duration: 0.5,
                  delay: 0.2,
                }}
                className="
                  text-gray-600

                  text-sm
                  sm:text-base

                  italic
                  font-medium

                  text-center

                  leading-6
                  sm:leading-7

                  max-w-[260px]
                "
              >
                “{moments[currentIndex].message}”
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ====================================
            PROGRESS DOTS
        ==================================== */}

        <div
          className="
            flex
            justify-center
            items-center
            gap-2

            mt-4
          "
        >
          {moments.map((_, index) => (
            <motion.div
              key={index}
              animate={{
                width:
                  currentIndex === index ? 20 : 7,

                opacity:
                  currentIndex === index ? 1 : 0.4,
              }}
              transition={{
                duration: 0.3,
              }}
              className={`
                h-[7px]
                rounded-full

                ${
                  currentIndex === index
                    ? "bg-pink-500"
                    : "bg-pink-300"
                }
              `}
            />
          ))}
        </div>

        {/* ====================================
            CARD COUNTER
        ==================================== */}

        <p
          className="
            mt-2
            text-xs
            font-medium
            text-pink-500
          "
        >
          {currentIndex + 1} / {moments.length}
        </p>

        {/* Swipe Hint */}

        {!showContinue && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.8,
                duration: 0.6,
              }}
              className="
                mt-2
                flex
                items-center
                justify-center
                gap-2
                text-pink-400
                font-cursive
                text-base
                sm:text-lg
              "
            >
              {/* Left Arrow */}
              <motion.span
                animate={{
                  x: [0, -4, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ←
              </motion.span>

              <span>Swipe to explore</span>

              {/* Right Arrow */}
              <motion.span
                animate={{
                  x: [0, 4, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                →
              </motion.span>
            </motion.div>
        )}
        
        {/* ====================================
            LAST CARD MESSAGE
        ==================================== */}

        {showContinue && (
          <motion.p
            initial={{
              opacity: 0,
              y: 5,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="
              mt-2

              text-lg
              font-romantic

              text-pink-500
            "
          >
            And there are many more to come ❤️
          </motion.p>
        )}
      </motion.div>

      {/* ======================================
          CONTINUE BUTTON
          ONLY CARD 5
      ====================================== */}

      <AnimatePresence>
        {showContinue && (
          <motion.button
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
            exit={{
              opacity: 0,
              y: 10,
              scale: 0.9,
            }}
            transition={{
              duration: 0.5,
              delay: 0.2,
            }}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={nextStep}
            className="
              mt-4

              bg-pink-500
              hover:bg-pink-600

              text-white
              text-sm
              font-semibold

              px-6
              py-1.5

              rounded-full

              shadow-lg

              transition-colors
              duration-300
            "
          >
            Continue →
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MomentsSlider;