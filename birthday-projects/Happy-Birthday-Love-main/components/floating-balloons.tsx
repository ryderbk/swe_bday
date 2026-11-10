"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface Balloon {
  id: number
  x: number
  delay: number
  size: number
  color: string
}

export function FloatingBalloons({ count = 10 }: { count?: number }) {
  const [balloons, setBalloons] = useState<Balloon[]>([])

  useEffect(() => {
    const colors = ["#fecaca", "#fb7185", "#f97373", "#fecdd3", "#fee2e2"]
    const newBalloons = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      size: Math.random() * 30 + 40,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
    setBalloons(newBalloons)
  }, [count])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {balloons.map((balloon) => (
        <motion.div
          key={balloon.id}
          className="absolute"
          style={{
            left: `${balloon.x}%`,
            bottom: -100,
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: -window.innerHeight - 200,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            delay: balloon.delay,
            ease: "easeOut",
          }}
        >
          <svg width={balloon.size} height={balloon.size * 1.5} viewBox="0 0 50 75" fill="none">
            <ellipse cx="25" cy="22" rx="22" ry="22" fill={balloon.color} />
            <path d="M25 44 L25 70" stroke={balloon.color} strokeWidth="1" opacity="0.7" />
            <ellipse cx="25" cy="22" rx="22" ry="22" fill="url(#shine)" opacity="0.3" />
            <defs>
              <radialGradient id="shine" cx="30%" cy="30%" r="50%">
                <stop offset="0%" stopColor="white" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
          </svg>
        </motion.div>
      ))}
    </div>
  )
}
