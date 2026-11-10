import { motion } from "framer-motion";

const petalImages = [
  "/images/petal/petal1.webp",
  "/images/petal/petal2.webp",
];

const PETAL_COUNT = 22;

/*
  Generate petal properties once when this file loads.

  left      -> position across entire screen
  size      -> different petal sizes
  duration  -> different falling speeds
  delay     -> petals don't all start together
  drift     -> gentle left/right movement
  rotate    -> different starting rotation
  image     -> randomly choose one of the two PNGs
*/
const petals = Array.from({ length: PETAL_COUNT }, (_, index) => ({
  id: index,

  left: Math.random() * 100,

  size: Math.random() * 18 + 16,

  duration: Math.random() * 5 + 8,

  delay: Math.random() * 8,

  drift: Math.random() * 80 - 40,

  rotate: Math.random() * 180,

  image:
    petalImages[
      Math.floor(Math.random() * petalImages.length)
    ],
}));

function Petals() {
  return (
    <div
      className="
        fixed
        inset-0
        w-screen
        h-screen
        overflow-hidden
        pointer-events-none
        z-20
      "
    >
      {petals.map((petal) => (
        <motion.img
          key={petal.id}
          src={petal.image}
          alt=""
          initial={{
            y: "-15vh",
            x: 0,
            rotate: petal.rotate,
            opacity: 0,
          }}
          animate={{
            y: "115vh",

            x: [
              0,
              petal.drift,
              -petal.drift * 0.5,
              petal.drift * 0.7,
              0,
            ],

            rotate: [
              petal.rotate,
              petal.rotate + 90,
              petal.rotate + 180,
              petal.rotate + 270,
              petal.rotate + 360,
            ],

            opacity: [
              0,
              0.9,
              1,
              0.9,
              0,
            ],
          }}
          transition={{
            y: {
              duration: petal.duration,
              repeat: Infinity,
              delay: petal.delay,
              ease: "linear",
            },

            x: {
              duration: petal.duration,
              repeat: Infinity,
              delay: petal.delay,
              ease: "easeInOut",
            },

            rotate: {
              duration: petal.duration,
              repeat: Infinity,
              delay: petal.delay,
              ease: "linear",
            },

            opacity: {
              duration: petal.duration,
              repeat: Infinity,
              delay: petal.delay,
              ease: "linear",
            },
          }}
          style={{
            position: "absolute",

            // 0% - 100% of viewport
            left: `${petal.left}%`,

            width: `${petal.size}px`,

            height: "auto",
          }}
          className="
            top-0
            object-contain
            pointer-events-none
            select-none
          "
        />
      ))}
    </div>
  );
}

export default Petals;