"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Heart } from "lucide-react"
import { config } from "@/lib/config"

export function LoveLetter() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section className="py-20 px-4" ref={containerRef}>
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Heart className="w-12 h-12 mx-auto text-pink-500 fill-current mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-red-700">A Letter For You</h2>
        </motion.div>

        <div className="glass rounded-3xl p-8 md:p-12 space-y-6">
          {config.letterText.map((paragraph, index) => (
            <LetterParagraph key={index} text={paragraph} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function LetterParagraph({ text, index }: { text: string; index: number }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.p
      ref={ref}
      className="text-red-800 text-lg leading-relaxed"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      {text}
    </motion.p>
  )
}
