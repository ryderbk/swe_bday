import { motion } from "framer-motion";

import butterflyPink from "../../assets/butterfly-pink.webp";
import butterflyGold from "../../assets/butterfly-gold.webp";
import butterflyRed from "../../assets/butterfly-red.webp";
import butterflyBlue from "../../assets/butterfly-blue.webp";
import butterflyPurple from "../../assets/butterfly-purple.webp";

const butterflies = [
  {
    image: butterflyPink,
    size: "w-8 sm:w-10",
    top: "8%",
    direction: "right",
    duration: 16,
    delay: 0,
  },

  {
    image: butterflyGold,
    size: "w-10 sm:w-12",
    top: "18%",
    direction: "left",
    duration: 19,
    delay: 2,
  },

  {
    image: butterflyRed,
    size: "w-9 sm:w-11",
    top: "30%",
    direction: "right",
    duration: 18,
    delay: 4,
  },

  {
    image: butterflyBlue,
    size: "w-8 sm:w-10",
    top: "42%",
    direction: "left",
    duration: 21,
    delay: 1,
  },

  {
    image: butterflyPurple,
    size: "w-10 sm:w-12",
    top: "55%",
    direction: "right",
    duration: 20,
    delay: 5,
  },

  {
    image: butterflyPink,
    size: "w-8 sm:w-10",
    top: "68%",
    direction: "left",
    duration: 17,
    delay: 3,
  },

  {
    image: butterflyGold,
    size: "w-9 sm:w-11",
    top: "78%",
    direction: "right",
    duration: 22,
    delay: 6,
  },

  {
    image: butterflyBlue,
    size: "w-8 sm:w-10",
    top: "88%",
    direction: "left",
    duration: 20,
    delay: 7,
  },

  {
    image: butterflyRed,
    size: "w-9 sm:w-12",
    top: "23%",
    direction: "right",
    duration: 24,
    delay: 8,
  },

  {
    image: butterflyPurple,
    size: "w-8 sm:w-10",
    top: "63%",
    direction: "left",
    duration: 23,
    delay: 9,
  },
];

function Butterflies() {
  return (
    <>
      {butterflies.map(
        (item, index) => {
          const movingRight =
            item.direction === "right";

          return (
            <motion.img
              key={index}

              src={item.image}

              alt="Butterfly"

              initial={{
                x: movingRight
                  ? "-15vw"
                  : "115vw",

                y: 0,

                opacity: 0,
              }}

              animate={{
                x: movingRight
                  ? [
                      "-15vw",
                      "20vw",
                      "45vw",
                      "70vw",
                      "115vw",
                    ]
                  : [
                      "115vw",
                      "80vw",
                      "55vw",
                      "30vw",
                      "-15vw",
                    ],

                y: [
                  0,
                  -45,
                  25,
                  -35,
                  10,
                ],

                rotate: movingRight
                  ? [
                      -8,
                      8,
                      -5,
                      8,
                      0,
                    ]
                  : [
                      8,
                      -8,
                      5,
                      -8,
                      0,
                    ],

                scale: [
                  1,
                  1.08,
                  0.95,
                  1.08,
                  1,
                ],

                opacity: [
                  0,
                  1,
                  1,
                  1,
                  0,
                ],
              }}

              transition={{
                duration:
                  item.duration,

                delay:
                  item.delay,

                repeat: Infinity,

                repeatDelay: 1,

                ease: "linear",
              }}

              style={{
                top: item.top,
              }}

              className={`
                fixed

                ${item.size}

                left-0

                pointer-events-none
                select-none

                z-20
              `}
            />
          );
        }
      )}
    </>
  );
}

export default Butterflies;