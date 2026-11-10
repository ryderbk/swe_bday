import { motion } from "framer-motion";

const petals = Array.from({ length: 20 });

function RosePetals() {
  return (
    <>
      {petals.map((_, index) => (
        <motion.div
          key={index}
          initial={{
            y: -100,
            x: Math.random() * window.innerWidth,
            opacity: 0,
          }}
          animate={{
            y: window.innerHeight + 100,
            rotate: 360,
            opacity: 1,
          }}
          transition={{
            duration: Math.random() * 4 + 5,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
          className="
          fixed
          top-0
          text-2xl
          pointer-events-none
          z-50
          "
        >
          🌹
        </motion.div>
      ))}
    </>
  );
}

export default RosePetals;