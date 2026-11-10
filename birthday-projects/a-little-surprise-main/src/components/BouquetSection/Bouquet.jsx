import { motion } from "framer-motion";

import bouquet from "../../assets/bouquet.webp";
import coupleLeft from "../../assets/couple-left.webp";
import coupleRight from "../../assets/couple-right.webp";

import Petals from "../Common/Petals";

function Bouquet({ nextStep }) {
  return (
    <section
      className="
        relative
        w-full
        h-[100dvh]
        overflow-hidden
        flex
        items-center
        justify-center
        text-center
      "
    >
      <Petals />

      {/* =====================================================
          LEFT LOVE TREE
      ===================================================== */}

      <motion.img
        src={coupleLeft}
        alt=""
        initial={{
          opacity: 0,
          x: -40,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 1,
          delay: 0.4,
          ease: "easeOut",
        }}
        className="
          absolute
          z-[2]

          left-0
          bottom-0
          w-[120px]

          min-[400px]:w-[140px]

          sm:w-[165px]

          md:w-[190px]

          lg:w-[210px]

          xl:w-[230px]

          2xl:w-[250px]

          h-auto
          object-contain

          pointer-events-none
          select-none
        "
      />

      {/* =====================================================
          RIGHT LOVE TREE
      ===================================================== */}

      <motion.img
        src={coupleRight}
        alt=""
        initial={{
          opacity: 0,
          x: 40,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 1,
          delay: 0.6,
          ease: "easeOut",
        }}
        className="
          absolute
          z-[2]

          right-0
          bottom-0
          w-[120px]

          min-[400px]:w-[140px]

          sm:w-[165px]

          md:w-[190px]

          lg:w-[210px]

          xl:w-[230px]

          2xl:w-[250px]

          h-auto
          object-contain

          pointer-events-none
          select-none
        "
      />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10

          w-full
          h-full

          flex
          flex-col
          items-center
          justify-center

          px-4

          pb-[100px]
          sm:pb-[80px]
          md:pb-[40px]
          lg:pb-0
        "
      >
        {/* ================= HEADING ================= */}

        <motion.h1
          initial={{
            opacity: 0,
            y: -15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          className="
            font-romantic
            text-pink-600
            leading-tight

            text-[24px]
            min-[400px]:text-[27px]
            sm:text-4xl
            md:text-5xl
            lg:text-5xl

            mb-4
            lg:mb-3
          "
        >
          A Bouquet For You ❤️
        </motion.h1>

        {/* ================= BOUQUET ================= */}

        <motion.img
          src={bouquet}
          alt="Rose Bouquet"
          initial={{
            opacity: 0,
            scale: 0.7,
            y: 30,
            rotate: -35,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            rotate: -25,
          }}
          transition={{
            duration: 0.9,
            delay: 0.15,
            ease: "easeOut",
          }}
          className="
            w-[150px]
            min-[400px]:w-[170px]
            sm:w-[200px]
            md:w-[220px]
            lg:w-[240px]
            xl:w-[260px]

            max-h-[30dvh]

            h-auto
            object-contain
            drop-shadow-xl

            mb-4
            lg:mb-3
          "
        />

        {/* ================= MAIN MESSAGE ================= */}

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
            delay: 0.7,
          }}
          className="
            font-romantic
            text-pink-600
            leading-snug

            text-[18px]
            min-[400px]:text-[20px]
            sm:text-2xl
            md:text-3xl
            lg:text-2xl
            xl:text-3xl

            mb-3
          "
        >
          Every flower reminds me
          <br />
          of your beautiful smile.
        </motion.p>

        {/* ================= HEART DIVIDER ================= */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.4,
            delay: 1,
          }}
          className="
            flex
            items-center
            justify-center
            gap-2

            text-pink-400

            mb-3
          "
        >
          <span className="w-7 h-px bg-pink-300" />

          <motion.span
            animate={{
              scale: [1, 1.25, 1],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-sm"
          >
            ❤️
          </motion.span>

          <span className="w-7 h-px bg-pink-300" />
        </motion.div>

        {/* ================= SECOND MESSAGE ================= */}

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
            delay: 1.2,
          }}
          className="
            text-gray-600

            text-[12px]
            min-[400px]:text-[13px]
            sm:text-sm
            md:text-base

            leading-[18px]
            sm:leading-5

            max-w-[300px]
            sm:max-w-sm

            mb-4
          "
        >
          You deserve all the happiness,
          <br />
          love and smiles in this world.
        </motion.p>

        {/* ================= CONTINUE ================= */}

        <motion.button
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
            delay: 1.5,
          }}
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={nextStep}
          className="
            bg-pink-500
            hover:bg-pink-600

            text-white
            text-xs
            sm:text-sm

            px-5
            py-2

            rounded-full
            shadow-lg

            transition-colors
            duration-300
          "
        >
          Continue →
        </motion.button>
      </div>
    </section>
  );
}

export default Bouquet;
