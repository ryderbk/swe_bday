import { motion } from "framer-motion";

import pinkBalloon from "../../assets/balloons/pink-balloon.webp";
import greenBalloon from "../../assets/balloons/green-balloon.webp";
import goldBalloon from "../../assets/balloons/gold-balloon.webp";
import purpleBalloon from "../../assets/balloons/purple-balloon.webp";

const balloonImages = {
  pink: pinkBalloon,
  green: greenBalloon,
  gold: goldBalloon,
  purple: purpleBalloon,
};

function Balloon({ color, onClick, isActive }) {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
        rotate: isActive ? [-1, 1, -1] : 0,
        scale: isActive ? [1, 1.03, 1] : 1,
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={
        isActive
          ? {
              scale: 1.05,
            }
          : {}
      }
      whileTap={
        isActive
          ? {
              scale: 0.9,
            }
          : {}
      }
      onClick={() => {
        if (isActive) {
          onClick();
        }
      }}
      className={`
        relative
        flex
        items-center
        justify-center
        select-none
        ${
          isActive
            ? "cursor-pointer"
            : "opacity-40 cursor-not-allowed"
        }
      `}
    >
      {/* Glow behind active balloon */}
      {isActive && (
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            w-20
            h-24
            sm:w-24
            sm:h-28
            rounded-full
            bg-pink-300/40
            blur-2xl
            pointer-events-none
          "
        />
      )}

      {/* Balloon PNG */}
      <img
        src={balloonImages[color]}
        alt={`${color} balloon`}
        draggable={false}
        className="
          relative
          z-10

          w-24
          sm:w-28
          md:w-32
          lg:w-36

          h-auto
          object-contain

          drop-shadow-lg
          pointer-events-none
        "
      />

      {/* Tap hand */}
      {isActive && (
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            z-20

            top-[38%]
            left-1/2
            -translate-x-1/2
            -translate-y-1/2

            w-8
            h-8
            sm:w-9
            sm:h-9

            flex
            items-center
            justify-center

            rounded-full
            bg-white/80
            shadow-md

            text-base
            sm:text-lg

            pointer-events-none
          "
        >
          👆
        </motion.div>
      )}
    </motion.div>
  );
}

export default Balloon;