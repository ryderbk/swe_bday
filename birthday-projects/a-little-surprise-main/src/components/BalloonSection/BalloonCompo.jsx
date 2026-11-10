import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import Balloon from "./Balloon";
import BalloonConfetti from "../../components/Common/BalloonConfetti";
import FloatingBalloons from "../../components/Common/FloatingBalloons";

function BalloonCompo({ nextStep }) {
  const [currentBalloon, setCurrentBalloon] = useState(1);
  const [showButton, setShowButton] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const pianoRef = useRef(null);

  const balloons = [
    {
      id: 1,
      word: "You",
      color: "pink",
    },
    {
      id: 2,
      word: "Are",
      color: "green",
    },
    {
      id: 3,
      word: "So",
      color: "gold",
    },
    {
      id: 4,
      word: "Special ❤️",
      color: "purple",
    },
  ];

  const allPopped = currentBalloon > balloons.length;

  // ==========================================
  // SOFT PIANO BACKGROUND MUSIC
  // ==========================================

  useEffect(() => {
    const piano = new Audio(
      "/music/soft-piano-balloon.mp3"
    );

    piano.loop = true;
    piano.volume = 0.2;

    pianoRef.current = piano;

    piano.play().catch((error) => {
      console.log(
        "Piano autoplay blocked:",
        error
      );
    });

    return () => {
      piano.pause();
      piano.currentTime = 0;

      pianoRef.current = null;
    };
  }, []);

  // ==========================================
  // BALLOON POP SOUND
  // ==========================================

  const playPopSound = () => {
    const audio = new Audio(
      "/music/balloon-pop.mp3"
    );

    audio.volume = 0.3;

    audio.play().catch(() => {});
  };

  // ==========================================
  // BALLOON CLICK
  // ==========================================

  const handleClick = (id) => {
    if (id !== currentBalloon) return;

    playPopSound();

    setShowConfetti(true);

    setTimeout(() => {
      setCurrentBalloon((prev) => prev + 1);
      setShowConfetti(false);
    }, 250);
  };

  // ==========================================
  // SHOW CONTINUE BUTTON
  // ==========================================

  useEffect(() => {
    if (!allPopped) return;

    const timer = setTimeout(() => {
      setShowButton(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [allPopped]);

  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        flex
        flex-col
        justify-center
        items-center
        px-5
      "
    >
      {/* Decorative Floating Balloons */}

      <FloatingBalloons />

      {/* Main Content */}

      <div
        className="
          relative
          z-10
          min-h-screen
          w-full
          flex
          flex-col
          justify-center
          items-center
          text-center
          px-5
        "
      >
        {/* Heading */}

        <AnimatePresence mode="wait">
          {!allPopped ? (
            <motion.h1
              key="pop-heading"
              initial={{
                opacity: 0,
                y: -20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -15,
              }}
              transition={{
                duration: 0.4,
              }}
              className="
                text-3xl
                sm:text-4xl
                text-pink-500
                font-cursive
                mb-8
              "
            >
              Pop all 4 balloons 🎈
            </motion.h1>
          ) : (
            <motion.h1
              key="love-heading"
              initial={{
                opacity: 0,
                y: -20,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: [1, 1.06, 1],
              }}
              transition={{
                opacity: {
                  duration: 0.5,
                },

                y: {
                  duration: 0.5,
                },

                scale: {
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="
                text-5xl
                sm:text-6xl
                text-pink-600
                font-romantic
                drop-shadow-sm
                mb-5
              "
            >
              My Love ❤️
            </motion.h1>
          )}
        </AnimatePresence>

        {/* Balloon Grid */}

        <AnimatePresence>
          {!allPopped && (
            <motion.div
              initial={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
              }}
              transition={{
                duration: 0.4,
              }}
              className="
                grid
                grid-cols-2
                gap-5
              "
            >
              {balloons.map((balloon) => (
                <div
                  key={balloon.id}
                  className="
                    relative
                    flex
                    justify-center
                    items-center
                    min-h-[120px]
                    min-w-[120px]
                  "
                >
                  {/* Balloon Confetti */}

                  {showConfetti &&
                    currentBalloon === balloon.id && (
                      <BalloonConfetti />
                    )}

                  {/* Revealed Word */}

                  {currentBalloon > balloon.id ? (
                    <motion.p
                      initial={{
                        scale: 0,
                        opacity: 0,
                        y: 15,
                      }}
                      animate={{
                        scale: [0, 1.15, 1],
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.5,
                      }}
                      className="
                        text-3xl
                        sm:text-4xl
                        text-pink-600
                        font-cursive
                        font-semibold
                      "
                    >
                      {balloon.word}
                    </motion.p>
                  ) : (
                    <Balloon
                      color={balloon.color}
                      isActive={
                        currentBalloon === balloon.id
                      }
                      onClick={() =>
                        handleClick(balloon.id)
                      }
                    />
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Final Message */}

        <AnimatePresence>
          {allPopped && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.7,
                y: 30,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                ease: "easeOut",
              }}
              className="
                flex
                flex-col
                items-center
              "
            >
              {/* You Are So Special */}

              <motion.p
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.15,
                  ease: "easeOut",
                }}
                className="
                  text-4xl
                  sm:text-5xl
                  font-romantic
                  text-pink-600
                  drop-shadow-sm
                  leading-relaxed
                "
              >
                You Are So Special ❤️
              </motion.p>

              {/* Small Heart Celebration */}

              <div
                className="
                  relative
                  h-16
                  w-64
                "
              >
                {[
                  "❤️",
                  "💕",
                  "💗",
                  "❤️",
                  "💖",
                ].map((heart, index) => (
                  <motion.span
                    key={index}
                    initial={{
                      opacity: 0,
                      y: 10,
                      x: 0,
                      scale: 0,
                    }}
                    animate={{
                      opacity: [0, 1, 1, 0],

                      y: [
                        10,
                        -15,
                        -40,
                        -60,
                      ],

                      x: [
                        0,
                        (index - 2) * 15,
                        (index - 2) * 25,
                        (index - 2) * 35,
                      ],

                      scale: [
                        0,
                        1.2,
                        1,
                        0.8,
                      ],
                    }}
                    transition={{
                      duration: 2,
                      delay: index * 0.12,
                      ease: "easeOut",
                    }}
                    className="
                      absolute
                      left-1/2
                      top-8
                      text-xl
                      pointer-events-none
                    "
                  >
                    {heart}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue Button */}

        <AnimatePresence>
          {showButton && (
            <motion.button
              initial={{
                opacity: 0,
                y: 20,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: [1, 1.05, 1],
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                opacity: {
                  duration: 0.5,
                },

                y: {
                  duration: 0.5,
                },

                scale: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
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
                text-white
                px-5
                py-1
                rounded-full
                text-lg
                font-semibold
                shadow-lg
                hover:bg-pink-600
                transition-colors
                duration-300
              "
            >
              Continue →
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default BalloonCompo;