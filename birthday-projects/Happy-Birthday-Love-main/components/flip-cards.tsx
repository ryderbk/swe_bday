"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { config } from "@/lib/config"

export function FlipCards() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Heart className="w-12 h-12 mx-auto text-pink-500 fill-current mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-red-700 mb-2">Why {"You're"} My Soulmate</h2>
          <p className="text-red-600">Tap/hover to reveal each reason ❤️</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {config.soulmateReasons.map((reason, index) => (
            <FlipCard key={index} index={index + 1} reason={reason} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FlipCard({ index, reason }: { index: number; reason: string }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <motion.div
      className="relative h-32 md:h-40 cursor-pointer perspective-1000"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      onClick={() => setIsFlipped(!isFlipped)}
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
    >
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 w-full h-full glass rounded-xl flex items-center justify-center bg-gradient-to-br from-pink-400 to-red-600"
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="text-4xl font-bold text-white">#{index}</span>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 w-full h-full glass rounded-xl flex items-center justify-center p-4 bg-white/80"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="text-red-700 text-center text-sm md:text-base font-medium">{reason}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}
