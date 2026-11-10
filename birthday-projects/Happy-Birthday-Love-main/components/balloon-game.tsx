"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { config } from "@/lib/config"

interface Balloon {
  id: number
  x: number
  y: number
  color: string
  popped: boolean
  message: string
}

export function BalloonGame() {
  const [balloons, setBalloons] = useState<Balloon[]>([])
  const [showMessage, setShowMessage] = useState<string | null>(null)
  const [poppedCount, setPoppedCount] = useState(0)

  useEffect(() => {
    const colors = ["#fecaca", "#fb7185", "#f97373", "#fecdd3", "#fee2e2"]
    const newBalloons = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: 5 + (i % 5) * 18 + Math.random() * 5,
      y: 20 + Math.floor(i / 5) * 25 + Math.random() * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      popped: false,
      message: config.balloonMessages[i] || `Memory #${i + 1}`,
    }))
    setBalloons(newBalloons)
  }, [])

  const popBalloon = (id: number) => {
    setBalloons((prev) => prev.map((b) => (b.id === id ? { ...b, popped: true } : b)))
    const balloon = balloons.find((b) => b.id === id)
    if (balloon) {
      setShowMessage(balloon.message)
      setPoppedCount((prev) => prev + 1)
      setTimeout(() => setShowMessage(null), 3000)
    }
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-red-700 mb-2">Pop the Balloons! 🎈</h2>
          <p className="text-red-600">Each balloon holds a special memory. Popped: {poppedCount}/15</p>
        </motion.div>

        <div className="relative h-[400px] glass rounded-3xl overflow-hidden">
          {balloons.map((balloon) => (
            <AnimatePresence key={balloon.id}>
              {!balloon.popped && (
                <motion.button
                  className="absolute cursor-pointer"
                  style={{ left: `${balloon.x}%`, top: `${balloon.y}%` }}
                  initial={{ scale: 0, y: 50 }}
                  animate={{
                    scale: 1,
                    y: [0, -10, 0],
                  }}
                  exit={{ scale: 1.5, opacity: 0 }}
                  transition={{
                    scale: { duration: 0.3 },
                    y: { duration: 2 + Math.random(), repeat: Number.POSITIVE_INFINITY },
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => popBalloon(balloon.id)}
                >
                  <svg width="50" height="65" viewBox="0 0 50 75" fill="none">
                    <ellipse cx="25" cy="22" rx="22" ry="22" fill={balloon.color} />
                    <path d="M25 44 L25 70" stroke={balloon.color} strokeWidth="1.5" opacity="0.7" />
                    <ellipse cx="25" cy="22" rx="22" ry="22" fill="url(#balloonShine)" opacity="0.3" />
                    <defs>
                      <radialGradient id="balloonShine" cx="30%" cy="30%" r="50%">
                        <stop offset="0%" stopColor="white" />
                        <stop offset="100%" stopColor="transparent" />
                      </radialGradient>
                    </defs>
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>
          ))}

          {/* Pop effect particles */}
          <AnimatePresence>
            {showMessage && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="glass bg-white/90 rounded-2xl p-6 max-w-xs text-center shadow-xl">
                  <p className="text-red-700 font-medium">{showMessage}</p>
                  <button className="mt-2 text-pink-400 hover:text-red-600" onClick={() => setShowMessage(null)}>
                    <X className="w-5 h-5 mx-auto" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {poppedCount === 15 && (
          <motion.p
            className="text-center mt-6 text-red-600 font-medium"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            🎉 You found all our memories! You really are my love ❤️
          </motion.p>
        )}
      </div>
    </section>
  )
}
