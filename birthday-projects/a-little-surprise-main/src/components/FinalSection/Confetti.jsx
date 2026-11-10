import { useMemo } from "react";
import { motion } from "framer-motion";

const colors = [
  "#ff69b4",
  "#ffc0cb",
  "#ffffff",
  "#f9a8d4",
  "#fbcfe8",
  "#fde68a",
];

function Confetti() {
  const confettiPieces = useMemo(() => {
    return Array.from(
      { length: 55 },
      (_, index) => ({
        id: index,

        left: Math.random() * 100,

        startY:
          -(Math.random() * 700 + 100),

        width:
          Math.random() * 5 + 4,

        height:
          Math.random() * 8 + 7,

        duration:
          Math.random() * 4 + 5,

        delay:
          Math.random() * 4,

        drift:
          Math.random() * 80 - 40,

        rotation:
          Math.random() * 720 + 360,

        color:
          colors[
            Math.floor(
              Math.random() *
                colors.length
            )
          ],
      })
    );
  }, []);

  return (
    <>
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}

          initial={{
            y: piece.startY,
            x: 0,
            opacity: 0,
          }}

          animate={{
            y:
              window.innerHeight +
              150,

            x: [
              0,
              piece.drift,
              -piece.drift * 0.5,
              piece.drift * 0.7,
            ],

            rotate: [
              0,
              piece.rotation,
            ],

            opacity: [
              0,
              1,
              1,
              0.8,
            ],
          }}

          transition={{
            duration:
              piece.duration,

            delay:
              piece.delay,

            repeat: Infinity,

            ease: "linear",
          }}

          style={{
            left: `${piece.left}%`,

            width:
              `${piece.width}px`,

            height:
              `${piece.height}px`,

            backgroundColor:
              piece.color,
          }}

          className="
            fixed
            top-0

            rounded-sm

            pointer-events-none

            z-30
          "
        />
      ))}
    </>
  );
}

export default Confetti;