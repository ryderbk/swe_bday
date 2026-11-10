"use client"
// Template by Farhan Alam - github.com/FarhanAlam-Official
import { useEffect } from "react"
import { motion } from "framer-motion"
import { Heart, Sparkles } from "lucide-react"
import { config } from "@/lib/config"

interface HeroSectionProps {
  onHeroImagesComplete?: () => void
}

export function HeroSection({ onHeroImagesComplete }: HeroSectionProps) {
  // Try to start the song shortly after the hero mounts (about 3 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      onHeroImagesComplete?.()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onHeroImagesComplete])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
      {/* Decorative hearts */}
      <motion.div
        className="absolute top-20 left-10 text-pink-400"
        animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
      >
        <Heart className="w-8 h-8 fill-current" />
      </motion.div>
      <motion.div
        className="absolute top-40 right-16 text-red-300"
        animate={{ y: [0, -15, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
      >
        <Heart className="w-6 h-6 fill-current" />
      </motion.div>
      <motion.div
        className="absolute bottom-40 left-20 text-pink-500"
        animate={{ y: [0, -8, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 3.5, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
      >
        <Sparkles className="w-10 h-10" />
      </motion.div>

      {/* Main title */}
      <motion.div
        className="text-center z-20"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          type: "spring",
          stiffness: 100,
        }}
      >
        <motion.p
          className="text-lg md:text-xl text-red-600 font-medium mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          ✨ {config.heroTitle} ✨
        </motion.p>
        <motion.h1
          className="text-4xl md:text-6xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-pink-500 to-red-700 mb-4 text-balance"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, type: "spring", stiffness: 80 }}
        >
          {config.heroSubtitle}
        </motion.h1>
        <motion.p
          className="text-4xl md:text-6xl"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, type: "spring", stiffness: 200 }}
        >
          {config.heroEmojis}
        </motion.p>
      </motion.div>

      {/* Polaroid heart formation */}
      <motion.div
        className="mt-16 relative w-full max-w-4xl h-[500px] md:h-[600px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        {/* Heart shape coordinates - 13 photos forming a heart */}
        {[
          // Top left curve (3 photos)
          { x: -60, y: 20, rotate: -18 },
          { x: -120, y: 30, rotate: -25 },
          { x: -160, y: 70, rotate: -15 },
          
          // Top right curve (3 photos)
          { x: 60, y: 20, rotate: 18 },
          { x: 120, y: 30, rotate: 25 },
          { x: 160, y: 70, rotate: 15 },
          
          // Left side going down (2 photos)
          { x: -180, y: 140, rotate: -10 },
          { x: -160, y: 220, rotate: -5 },
          
          // Right side going down (2 photos)
          { x: 180, y: 140, rotate: 10 },
          { x: 160, y: 220, rotate: 5 },
          
          // Bottom point (3 photos)
          { x: -80, y: 300, rotate: -12 },
          { x: 0, y: 360, rotate: 0 },
          { x: 80, y: 300, rotate: 12 },
        ].map((position, index, arr) => (
          <motion.div
            key={index}
            className="absolute left-1/2 top-0 w-24 md:w-32 bg-white p-2 rounded shadow-xl"
            initial={{
              x: "-50%",
              y: -200,
              rotate: position.rotate * 2,
              opacity: 0,
              scale: 0,
            }}
            animate={{
              x: `calc(-50% + ${position.x}px)`,
              y: position.y,
              rotate: position.rotate,
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: 1.8 + index * 0.1,
              type: "spring",
              stiffness: 80,
              damping: 12,
            }}
            // As soon as the first photo in the heart starts animating in,
            // let the parent know so it can try starting the song right away.
            onAnimationStart={() => {
              if (index === 0) {
                setTimeout(() => {
                  onHeroImagesComplete?.()
                }, 50)
              }
            }}
            onAnimationComplete={() => {
              // When the last image finishes its entrance animation,
              // notify the parent so it can start the birthday song.
              if (index === arr.length - 1) {
                // Use setTimeout to ensure this fires after React completes the render cycle
                setTimeout(() => {
                  onHeroImagesComplete?.()
                }, 50)
              }
            }}
            whileHover={{
              scale: 1.15,
              rotate: 0,
              zIndex: 10,
              transition: { duration: 0.2 },
            }}
          >
            <div className="aspect-square bg-gradient-to-br from-rose-200 to-rose-100 rounded overflow-hidden">
              <img
                src={config.heroImages[index % config.heroImages.length] || `/placeholder.svg?height=150&width=150&query=best friends photo ${index + 1}`}
                alt={`Memory ${index + 1}`}
                className="w-full h-full object-cover protected-image"
                onContextMenu={(e) => e.preventDefault()}
                draggable={false}
              />
            </div>
            <p className="text-xs text-center mt-1 text-red-600 font-medium">❤️</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 2.5 },
          y: { duration: 1.5, repeat: Number.POSITIVE_INFINITY },
        }}
      >
        <div className="flex flex-col items-center text-pink-500">
          <p className="text-sm mb-2">Scroll to explore</p>
          <Heart className="w-5 h-5 fill-current animate-heart-beat" />
        </div>
      </motion.div>
    </section>
  )
}
