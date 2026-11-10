import { motion } from "framer-motion";

function ReplayButton({ onBeforeReplay }) {
  const handleReplay = () => {
    // Stop final birthday music first
    onBeforeReplay?.();

    // Restart website from beginning
    window.location.reload();
  };

  return (
    <motion.button
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{
        scale: 1.07,
      }}
      whileTap={{
        scale: 0.95,
      }}
      onClick={handleReplay}
      className="
        bg-pink-500
        hover:bg-pink-600

        text-white

        px-6
        py-2

        rounded-full

        font-semibold

        shadow-lg
        shadow-pink-200

        transition-colors
        duration-300
      "
    >
      Replay ❤️
    </motion.button>
  );
}

export default ReplayButton;