import { motion } from "framer-motion";

const colors = [
  "#FF0080",
  "#FFD700",
  "#00D4FF",
  "#FF6600",
  "#A855F7",
  "#22C55E",
];

function PartyPopper({ position }) {
  const papers = Array.from({ length: 18 });

  return (
    <>
      {papers.map((_, index) => (
        <motion.div
          key={index}
          initial={{
            x: 0,
            y: 0,
            opacity: 1,
            rotate: 0,
          }}
          animate={{
            x:
              position === "left"
                ? Math.random() * 220 + 50
                : -(Math.random() * 220 + 50),

            y:
              position === "left"
                ? Math.random() * 180 + 30
                : -(Math.random() * 180 + 30),

            opacity: [1, 1, 0],
            rotate: 1080,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: Math.random(),
          }}
          className="absolute w-4 h-8 rounded-sm"
          style={{
            backgroundColor: colors[index % colors.length],
          }}
        />
      ))}
    </>
  );
}

export default PartyPopper;