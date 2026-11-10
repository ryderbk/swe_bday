import { motion } from "framer-motion";

const particles = [
  { x: -70, y: -60 },
  { x: 70, y: -80 },
  { x: -90, y: -30 },
  { x: 90, y: -40 },
  { x: -60, y: -90 },
  { x: 60, y: -70 },
  { x: -100, y: -50 },
  { x: 100, y: -80 },
];

const colors = [
  "#FF69B4",
  "#FFD700",
  "#00CFFF",
  "#FF6347",
  "#A855F7",
  "#22C55E",
  "#FF1493",
  "#FFA500",
];

function BalloonConfetti() {
  return (
    <>
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          initial={{
            opacity: 1,
            x: 0,
            y: 0,
            scale: 0,
            rotate: 0,
          }}
          animate={{
            opacity: 0,
            x: particle.x,
            y: particle.y,
            scale: 1,
            rotate: 360,
          }}
          transition={{
            duration: 0.7,
          }}
          className="absolute w-4 h-2 rounded-sm"
          style={{
            backgroundColor: colors[index],
          }}
        />
      ))}
    </>
  );
}

export default BalloonConfetti;