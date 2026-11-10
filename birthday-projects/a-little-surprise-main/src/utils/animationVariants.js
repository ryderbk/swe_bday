// src/utils/animationVariants.js

export const fade = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export const heartbeat = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: [1, 1.08, 1],
    rotate: [0, -2, 2, 0],
    transition: {
      opacity: {
        duration: 0.5,
      },
      scale: {
        delay: 0.2,
        duration: 1.8,
        repeat: Infinity,
        ease: "easeInOut",
      },
      rotate: {
        delay: 0.2,
        duration: 1.8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },
};

export const floatingTitle = {
  hidden: {
    opacity: 0,
    y: -20,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: [0, -3, 0],
    filter: "blur(0px)",
    transition: {
      opacity: {
        duration: 0.8,
      },
      filter: {
        duration: 0.8,
      },
      y: {
        delay: 0.8,
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },
};

export const buttonAnimation = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      delay: 4,
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

export const buttonGlow = {
  animate: {
    boxShadow: [
      "0 0 0px rgba(236,72,153,0.25)",
      "0 0 18px rgba(236,72,153,0.7)",
      "0 0 0px rgba(236,72,153,0.25)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};