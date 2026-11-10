import { motion } from "framer-motion";

function FloatingHearts() {
  const hearts = Array.from({ length: 15 });

  return (
    <>
      {hearts.map((_, index) => (
        <motion.div
          key={index}
          className="absolute text-pink-300 text-3xl pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.4, 1, 0.4],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          ❤️
        </motion.div>
      ))}
    </>
  );
}

export default FloatingHearts;