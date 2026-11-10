"use client"
/* Built by Farhan Alam | github.com/FarhanAlam-Official */
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { config } from "@/lib/config"
import { Heart, Sparkles, Star } from "lucide-react"

export function CakeFinale() {
  const [stage, setStage] = useState<"intro" | "wishing" | "blowing" | "fireworks" | "message">("intro")
  const [wishText, setWishText] = useState("")
  const [currentWishIndex, setCurrentWishIndex] = useState(0)
  const [isCardFlipped, setIsCardFlipped] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const birthdaySongRef = useRef<HTMLAudioElement | null>(null)
  const finalVideoRef = useRef<HTMLVideoElement | null>(null)
  const wasSongPlayingBeforeVideoRef = useRef(false)
  const candleCount = 5

  const wishingPhrases = [
    "Close your eyes...",
    "Think of everything we've been through...",
    "All the laughs, the tears, the chaos...",
    "Now make a wish...",
    "Make it a good one...",
  ]

  useEffect(() => {
    if (stage === "wishing") {
      const interval = setInterval(() => {
        setCurrentWishIndex((prev) => {
          if (prev < wishingPhrases.length - 1) {
            return prev + 1
          }
          return prev
        })
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [stage])

  const startWishing = () => {
    setStage("wishing")
    setCurrentWishIndex(0)

    // Start birthday song when user is ready to make a wish (fallback if autoplay was blocked)
    if (birthdaySongRef.current) {
      birthdaySongRef.current.currentTime = 0
      birthdaySongRef.current
        .play()
        .catch(() => {
          // Song will play on user interaction
        })
    }
  }

  // Listen for a global "start-birthday-song" event (fired from the main page on first real interaction)
  useEffect(() => {
    const handleStart = () => {
      const audio = birthdaySongRef.current
      if (!audio) return

      // If it's already playing, don't restart
      if (!audio.paused && !audio.ended) return

      audio.currentTime = 0
      audio.play().catch(() => {
        // If the browser still blocks it, the song will start from a direct user click later.
      })
    }

    window.addEventListener("start-birthday-song", handleStart as EventListener)

    return () => {
      window.removeEventListener("start-birthday-song", handleStart as EventListener)
      const audio = birthdaySongRef.current
      if (audio) {
        audio.pause()
        audio.currentTime = 0
      }
    }
  }, [])

  const blowCandles = () => {
    setStage("blowing")
    setTimeout(() => {
      setStage("fireworks")
      setTimeout(() => {
        setStage("message")
      }, 4000)
    }, 1500)
  }

  useEffect(() => {
    if (stage !== "fireworks" || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    interface Particle {
      x: number
      y: number
      vx: number
      vy: number
      color: string
      life: number
      size: number
      type: "circle" | "heart" | "star"
    }

    const particles: Particle[] = []
    const colors = ["#fecaca", "#fb7185", "#f97373", "#fecdd3", "#fbbf24", "#f472b6", "#ec4899", "#fee2e2"]

    const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath()
      ctx.moveTo(x, y + size / 4)
      ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + size / 4)
      ctx.bezierCurveTo(x - size / 2, y + size / 2, x, y + size * 0.75, x, y + size)
      ctx.bezierCurveTo(x, y + size * 0.75, x + size / 2, y + size / 2, x + size / 2, y + size / 4)
      ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + size / 4)
      ctx.fill()
    }

    const createFirework = (x: number, y: number) => {
      const particleCount = 80
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount
        const speed = 2 + Math.random() * 4
        const types: Particle["type"][] = ["circle", "heart", "star"]
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 120,
          size: 3 + Math.random() * 4,
          type: types[Math.floor(Math.random() * types.length)],
        })
      }
    }

    const intervals = [0, 400, 800, 1200, 1600, 2000, 2400, 2800]
    intervals.forEach((delay) => {
      setTimeout(() => {
        createFirework(100 + Math.random() * (canvas.width - 200), 50 + Math.random() * (canvas.height * 0.4))
      }, delay)
    })

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.04
        p.life -= 1

        if (p.life <= 0) {
          particles.splice(i, 1)
          continue
        }

        ctx.globalAlpha = p.life / 120
        ctx.fillStyle = p.color

        if (p.type === "heart") {
          drawHeart(ctx, p.x, p.y, p.size * 2)
        } else if (p.type === "star") {
          ctx.beginPath()
          for (let j = 0; j < 5; j++) {
            const angle = (j * 4 * Math.PI) / 5 - Math.PI / 2
            const r = j % 2 === 0 ? p.size : p.size / 2
            ctx.lineTo(p.x + Math.cos(angle) * r, p.y + Math.sin(angle) * r)
          }
          ctx.closePath()
          ctx.fill()
        } else {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.globalAlpha = 1
      }

      if (particles.length > 0) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }, [stage])

  // Generate fireworks particles for animation
  const generateFireworks = (count: number, centerX: number, centerY: number) => {
    const colors = ["#fecaca", "#fb7185", "#f97373", "#fecdd3", "#fbbf24", "#f472b6", "#ec4899", "#fee2e2", "#f59e0b", "#f97316"]
    const particles = []
    const types = ["circle", "star", "sparkle"] as const
    
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3
      const distance = 100 + Math.random() * 200
      const x = Math.cos(angle) * distance
      const y = Math.sin(angle) * distance
      const size = 4 + Math.random() * 6
      const color = colors[Math.floor(Math.random() * colors.length)]
      const delay = Math.random() * 0.3
      const type = types[Math.floor(Math.random() * types.length)]
      
      particles.push({
        id: `${centerX}-${centerY}-${i}`,
        x,
        y,
        size,
        color,
        delay,
        type,
        centerX,
        centerY,
      })
    }
    
    return particles
  }

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Hidden birthday song audio */}
      <audio
        ref={birthdaySongRef}
        src="/songs/happy-birthday.mp3"
        preload="auto"
      />

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-red-300/30"
            initial={{ y: "100vh", x: Math.random() * 100 + "%" }}
            animate={{ y: "-10vh" }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          >
            {i % 3 === 0 ? (
              <Heart size={12 + Math.random() * 12} />
            ) : i % 3 === 1 ? (
              <Sparkles size={12 + Math.random() * 12} />
            ) : (
              <Star size={12 + Math.random() * 12} />
            )}
          </motion.div>
        ))}
      </div>

      {/* Fireworks canvas */}
      <AnimatePresence>
        {stage === "fireworks" && (
          <motion.canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6 flex justify-center gap-2">
            {[...Array(3)].map((_, i) => (
              <motion.span
                key={i}
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.3 }}
              >
                <Sparkles className="w-6 h-6 text-pink-400" />
              </motion.span>
            ))}
          </div>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 via-pink-500 to-pink-500 bg-clip-text text-transparent mb-4">
            Make a Wish
          </h2>
          <p className="text-pink-400 text-lg mb-12">This is your moment, my Love ❤️</p>
        </motion.div>

        <motion.div
          className="relative inline-block mb-12"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Glow effect behind cake */}
          <div className="absolute inset-0 blur-3xl bg-gradient-to-t from-pink-500/30 via-pink-500/20 to-transparent scale-150" />

          <svg width="280" height="260" viewBox="0 0 280 260" className="relative drop-shadow-2xl">
            {/* Cake plate */}
            <ellipse cx="140" cy="240" rx="130" ry="15" fill="#b91c1c" opacity="0.35" />

            {/* Bottom tier */}
            <rect x="30" y="160" width="220" height="70" rx="12" fill="url(#cakeGradient1)" />
            <rect x="30" y="160" width="220" height="70" rx="12" fill="url(#cakeShine)" opacity="0.5" />

            {/* Middle tier */}
            <rect x="55" y="100" width="170" height="65" rx="10" fill="url(#cakeGradient2)" />
            <rect x="55" y="100" width="170" height="65" rx="10" fill="url(#cakeShine)" opacity="0.4" />

            {/* Top tier */}
            <rect x="80" y="50" width="120" height="55" rx="8" fill="url(#cakeGradient3)" />
            <rect x="80" y="50" width="120" height="55" rx="8" fill="url(#cakeShine)" opacity="0.3" />

            {/* Frosting drips - bottom */}
            <path
              d="M30 160 Q45 175, 50 160 Q60 180, 70 160 Q85 178, 95 160 Q110 175, 125 160 Q140 180, 155 160 Q170 175, 185 160 Q200 180, 210 160 Q225 175, 240 160 Q250 175, 250 160"
              fill="#fdf4ff"
              opacity="0.9"
            />

            {/* Frosting drips - middle */}
            <path
              d="M55 100 Q68 115, 75 100 Q88 118, 100 100 Q115 115, 130 100 Q145 118, 160 100 Q175 115, 190 100 Q205 115, 215 100 Q225 112, 225 100"
              fill="#fdf4ff"
              opacity="0.9"
            />

            {/* Heart decorations */}
            <g fill="#ec4899">
              <path d="M60 190 c0-5 5-10 10-10 s10 5 10 10 c0 8-10 15-10 15 s-10-7-10-15z" opacity="0.8" />
              <path d="M130 200 c0-4 4-8 8-8 s8 4 8 8 c0 6-8 12-8 12 s-8-6-8-12z" opacity="0.8" />
              <path d="M200 190 c0-5 5-10 10-10 s10 5 10 10 c0 8-10 15-10 15 s-10-7-10-15z" opacity="0.8" />
            </g>

            {/* Star decorations */}
            <g fill="#fbbf24">
              <polygon points="95,130 97,136 103,136 98,140 100,146 95,142 90,146 92,140 87,136 93,136" />
              <polygon points="185,130 187,136 193,136 188,140 190,146 185,142 180,146 182,140 177,136 183,136" />
              <polygon points="140,70 142,76 148,76 143,80 145,86 140,82 135,86 137,80 132,76 138,76" />
            </g>

            {/* Candles with enhanced flames */}
            {[...Array(candleCount)].map((_, i) => {
              const x = 100 + i * 20
              return (
                <g key={i}>
                  {/* Candle body */}
                  <rect x={x} y="20" width="8" height="32" rx="2" fill="url(#candleGradient)" />
                  <rect x={x + 1} y="20" width="2" height="32" fill="white" opacity="0.3" />

                  {/* Flame */}
                  <AnimatePresence>
                    {(stage === "intro" || stage === "wishing") && (
                      <motion.g
                        initial={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0, y: -10 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                      >
                        {/* Outer glow */}
                        <motion.ellipse
                          cx={x + 4}
                          cy="12"
                          rx="10"
                          ry="14"
                          fill="#fbbf24"
                          opacity="0.3"
                          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
                          transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, delay: i * 0.1 }}
                        />
                        {/* Main flame */}
                        <motion.path
                          d={`M${x + 4} 2 Q${x - 2} 10 ${x + 4} 20 Q${x + 10} 10 ${x + 4} 2`}
                          fill="url(#flameGradient)"
                          animate={{
                            d: [
                              `M${x + 4} 2 Q${x - 2} 10 ${x + 4} 20 Q${x + 10} 10 ${x + 4} 2`,
                              `M${x + 4} 0 Q${x - 3} 8 ${x + 4} 18 Q${x + 11} 8 ${x + 4} 0`,
                              `M${x + 4} 2 Q${x - 2} 10 ${x + 4} 20 Q${x + 10} 10 ${x + 4} 2`,
                            ],
                          }}
                          transition={{ duration: 0.5 + Math.random() * 0.3, repeat: Number.POSITIVE_INFINITY }}
                        />
                        {/* Inner flame */}
                        <motion.ellipse
                          cx={x + 4}
                          cy="14"
                          rx="3"
                          ry="5"
                          fill="#fff7ed"
                          animate={{ scale: [1, 0.8, 1], opacity: [1, 0.8, 1] }}
                          transition={{ duration: 0.4, repeat: Number.POSITIVE_INFINITY, delay: i * 0.1 }}
                        />
                      </motion.g>
                    )}
                  </AnimatePresence>
                </g>
              )
            })}

            {/* SVG Gradients */}
            <defs>
              <linearGradient id="cakeGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fee2e2" />
                <stop offset="100%" stopColor="#fb7185" />
              </linearGradient>
              <linearGradient id="cakeGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fb7185" />
                <stop offset="100%" stopColor="#f97373" />
              </linearGradient>
              <linearGradient id="cakeGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f97373" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
              <linearGradient id="cakeShine" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="white" stopOpacity="0.4" />
                <stop offset="50%" stopColor="white" stopOpacity="0" />
                <stop offset="100%" stopColor="white" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="candleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fcd34d" />
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
              <linearGradient id="flameGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#fef3c7" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        <AnimatePresence mode="wait">
          {stage === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <p className="text-lg leading-relaxed max-w-md mx-auto font-medium text-white-100" style={{ textShadow: "0 2px 8px rgba(0, 0, 0, 0.6), 0 0 20px rgba(114, 18, 210, 0.4), 0 0 40px rgba(217, 22, 119, 0.3)" }}>
                Before you blow out the candles, take a moment. Think about everything you want for this next year of
                your beautiful life.
              </p>
              <Button
                onClick={startWishing}
                className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white text-lg px-10 py-6 rounded-full shadow-lg shadow-pink-500/30 transition-all hover:scale-105"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                I'm Ready to Make a Wish
              </Button>
            </motion.div>
          )}

          {stage === "wishing" && (
            <motion.div
              key="wishing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <div className="h-24 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentWishIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-2xl md:text-3xl font-bold italic bg-gradient-to-r from-red-600 via-pink-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg"
                  >
                    {wishingPhrases[currentWishIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>

              {currentWishIndex >= wishingPhrases.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    onClick={blowCandles}
                    className="bg-gradient-to-r from-red-600 via-pink-600 to-red-600 hover:from-red-700 hover:via-pink-700 hover:to-red-700 text-white text-xl px-12 py-7 rounded-full shadow-xl shadow-pink-500/40 transition-all hover:scale-105 animate-pulse"
                  >
                    <span className="mr-2">🌬️</span>
                    Blow the Candles
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}

          {stage === "blowing" && (
            <motion.div
              key="blowing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-3xl text-red-200"
            >
              <motion.span
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              >
                ✨
              </motion.span>
            </motion.div>
          )}

          {stage === "fireworks" && (
            <motion.div
              key="fireworks"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4 relative min-h-[400px]"
            >
              {/* Fireworks bursts */}
              <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                {[
                  { delay: 0, x: "50%", y: "30%" },
                  { delay: 0.2, x: "30%", y: "50%" },
                  { delay: 0.4, x: "70%", y: "50%" },
                  { delay: 0.6, x: "50%", y: "70%" },
                  { delay: 0.8, x: "20%", y: "40%" },
                  { delay: 1.0, x: "80%", y: "40%" },
                  { delay: 1.2, x: "35%", y: "65%" },
                  { delay: 1.4, x: "65%", y: "65%" },
                  { delay: 1.6, x: "50%", y: "50%" },
                ].map((burst, burstIndex) => {
                  const particles = generateFireworks(40, 0, 0)
                  return (
                    <div key={burstIndex} className="absolute" style={{ left: burst.x, top: burst.y, transform: "translate(-50%, -50%)" }}>
                      {particles.map((particle) => (
                        <motion.div
                          key={particle.id}
                          className="absolute"
                          style={{
                            width: particle.size,
                            height: particle.size,
                            left: "50%",
                            top: "50%",
                          }}
                          initial={{ 
                            x: 0, 
                            y: 0, 
                            scale: 0,
                            opacity: 0,
                            rotate: 0,
                          }}
                          animate={{ 
                            x: particle.x, 
                            y: particle.y, 
                            scale: [0, 1, 0.8, 0],
                            opacity: [0, 1, 1, 0],
                            rotate: particle.type === "star" ? 360 : particle.type === "sparkle" ? 180 : 0,
                          }}
                          transition={{
                            duration: 1.5,
                            delay: burst.delay + particle.delay,
                            ease: "easeOut",
                          }}
                        >
                          {particle.type === "circle" ? (
                            <div
                              className="rounded-full w-full h-full"
                              style={{
                                backgroundColor: particle.color,
                                boxShadow: `0 0 ${particle.size * 2}px ${particle.color}, 0 0 ${particle.size * 4}px ${particle.color}`,
                              }}
                            />
                          ) : particle.type === "star" ? (
                            <Star
                              size={particle.size}
                              className="fill-current"
                              style={{
                                color: particle.color,
                                filter: `drop-shadow(0 0 ${particle.size}px ${particle.color})`,
                              }}
                            />
                          ) : (
                            <Sparkles
                              size={particle.size}
                              className="fill-current"
                              style={{
                                color: particle.color,
                                filter: `drop-shadow(0 0 ${particle.size}px ${particle.color})`,
                              }}
                            />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )
                })}
              </div>
              <div className="relative z-10">
                <motion.h3
                  className="text-6xl md:text-5xl drop-shadow-2xl font-bold bg-gradient-to-r from-red-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-4 text-center drop-shadow-sm flex-shrink-0"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5, repeat: 3 }}
                >
                  HAPPY BIRTHDAY MY LOVE ❤️
                </motion.h3>
                <div className="text-5xl">🎉🎊❤️🎊🎉</div>
              </div>
            </motion.div>
          )}

          {stage === "message" && (
            <motion.div
              key="message"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 relative min-h-[800px]"
            >
              {/* Continuous fireworks bursts for message area */}
              <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                {Array.from({ length: 12 }).map((_, burstIndex) => {
                  const x = 15 + Math.random() * 70
                  const y = 15 + Math.random() * 70
                  const delay = burstIndex * 1.5 + Math.random() * 0.5
                  const particles = generateFireworks(30, 0, 0)
                  return (
                    <div key={burstIndex} className="absolute" style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}>
                      {particles.map((particle) => (
                        <motion.div
                          key={particle.id}
                          className="absolute"
                          style={{
                            width: particle.size,
                            height: particle.size,
                            left: "50%",
                            top: "50%",
                          }}
                          initial={{ 
                            x: 0, 
                            y: 0, 
                            scale: 0,
                            opacity: 0,
                            rotate: 0,
                          }}
                          animate={{ 
                            x: particle.x, 
                            y: particle.y, 
                            scale: [0, 1, 0.8, 0],
                            opacity: [0, 1, 1, 0],
                            rotate: particle.type === "star" ? 360 : particle.type === "sparkle" ? 180 : 0,
                          }}
                          transition={{
                            duration: 1.5,
                            delay: delay + particle.delay,
                            ease: "easeOut",
                            repeat: Number.POSITIVE_INFINITY,
                            repeatDelay: 3,
                          }}
                        >
                          {particle.type === "circle" ? (
                            <div
                              className="rounded-full w-full h-full"
                              style={{
                                backgroundColor: particle.color,
                                boxShadow: `0 0 ${particle.size * 2}px ${particle.color}, 0 0 ${particle.size * 4}px ${particle.color}`,
                              }}
                            />
                          ) : particle.type === "star" ? (
                            <Star
                              size={particle.size}
                              className="fill-current"
                              style={{
                                color: particle.color,
                                filter: `drop-shadow(0 0 ${particle.size}px ${particle.color})`,
                              }}
                            />
                          ) : (
                            <Sparkles
                              size={particle.size}
                              className="fill-current"
                              style={{
                                color: particle.color,
                                filter: `drop-shadow(0 0 ${particle.size}px ${particle.color})`,
                              }}
                            />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )
                })}
              </div>
              <div className="relative z-10 w-full">
              {/* Container for card and video */}
              <div className="flex flex-col gap-8 w-full items-center">
                {/* Flip Card Container */}
                <div className="flex justify-center w-full max-w-6xl" style={{ perspective: "1000px" }}>
                  <motion.div
                    className="relative w-full max-w-2xl h-[850px] cursor-pointer"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                    onHoverStart={() => setIsCardFlipped(true)}
                    onHoverEnd={() => setIsCardFlipped(false)}
                    onClick={() => setIsCardFlipped(!isCardFlipped)}
                  >
                  <motion.div
                    className="relative w-full h-full"
                    animate={{ rotateY: isCardFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Front - Image Side */}
                    <div
                      className="absolute inset-0 w-full h-full bg-gradient-to-br from-pink-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl border-2 border-red-300/30 shadow-2xl overflow-hidden"
                      style={{ backfaceVisibility: "hidden", transform: "rotateY(0deg)" }}
                    >
                      <div className="w-full h-full relative bg-red-900/20">
                        <img
                          src={config.birthdayCardImage || "/placeholder.svg?height=600&width=800&query=birthday celebration best friends"}
                          alt="Birthday Memory"
                          className="w-full h-full object-cover protected-image"
                          onContextMenu={(e) => e.preventDefault()}
                          draggable={false}
                          onError={(e) => {
                            console.error('Birthday card image failed to load:', config.birthdayCardImage);
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5, type: "spring" }}
                            className="text-6xl mb-4"
                          >
                          </motion.div>
                          <h3 className="text-3xl md:text-4xl font-bold text-white mb-8 drop-shadow-lg flex-shrink-0">
                            Happy Birthday, {config.herName} ❤️
                          </h3>
                          <p className="text-red-200 text-lg">Tap or hover to read your message...</p>
                        </div>
                      </div>
                    </div>

                    {/* Back - Message Side */}
                    <div
                      className="absolute inset-0 w-full h-full bg-white/20 backdrop-blur-xl rounded-3xl p-8 md:p-10 lg:p-12 border border-red-300/30 shadow-2xl flex flex-col"
                      style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className="text-5xl mb-4 text-center flex-shrink-0"
                      >
                        ❤️
                      </motion.div>

                      <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-4 text-center drop-shadow-sm flex-shrink-0">
                        Happy Birthday, {config.herName}
                      </h3>

                      <div className="space-y-3 text-red-900 text-base md:text-lg leading-relaxed max-w-2xl mx-auto flex-grow font-medium">
                        <p>Even after all these years, nothing about what we share has faded. Distance changed many things, but it never changed <em>us</em>. Every laugh, every deep conversation, every memory we built long before you left for Australia still stays warm in my heart.</p>
                        <p>You're not just my best friend. You're my constant. My person. The one who understands me in a way no one else ever has or ever will. Even from thousands of kilometers away, your presence still feels close, somehow.</p>
                        <p>I won't lie — I miss you. I miss the random moments, the chaos, the comfort, the "you." But I'm also so proud of how far you've come and everything you're becoming out there.</p>
                        <p className="text-red-700 font-semibold">I hope this year brings you love, gentleness, and every good thing you've been waiting for. You deserve the softest, brightest, and most beautiful life, my Love. Until we meet again, keep shining the way you always do. ❤️</p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-pink-400/40 text-center flex-shrink-0">
                        <p className="text-red-700 text-sm font-medium">With all my love, forever and always</p>
                        <p className="text-lg font-bold text-red-800 mt-2">Yours Forever</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
                </div>

                {/* Video message embed */}
                {config.finalVideoUrl && (
                  <div className="flex justify-center w-full max-w-4xl">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="space-y-4 w-full"
                    >
                      <p className="text-red-300 text-center">I recorded something special for you...</p>
                      <div className="aspect-video rounded-2xl overflow-hidden bg-white/5 backdrop-blur border border-red-300/20 shadow-xl w-full">
                        {config.finalVideoUrl.endsWith('.mp4') || config.finalVideoUrl.endsWith('.webm') || config.finalVideoUrl.endsWith('.ogg') ? (
                          // Use video element for local files
                          <video
                            ref={finalVideoRef}
                            src={config.finalVideoUrl}
                            title="Birthday Message"
                            className="w-full h-full"
                            controls
                            controlsList="nodownload noplaybackrate noremoteplayback"
                            onContextMenu={(e) => e.preventDefault()}
                            draggable={false}
                            preload="metadata"
                            playsInline
                            muted={false}
                            onPlay={() => {
                              const audio = birthdaySongRef.current
                              if (!audio) return

                              // Only pause if it was actually playing; remember that state
                              if (!audio.paused && !audio.ended) {
                                wasSongPlayingBeforeVideoRef.current = true
                                audio.pause()
                              } else {
                                wasSongPlayingBeforeVideoRef.current = false
                              }
                            }}
                            onPause={() => {
                              const audio = birthdaySongRef.current
                              if (!audio) return

                              if (wasSongPlayingBeforeVideoRef.current) {
                                audio
                                  .play()
                                  .catch(() => {
                                    // Failed to resume
                                  })
                              }
                            }}
                            onEnded={() => {
                              const audio = birthdaySongRef.current
                              if (!audio) return

                              if (wasSongPlayingBeforeVideoRef.current) {
                                audio
                                  .play()
                                  .catch(() => {
                                    // Failed to resume
                                  })
                              }
                              wasSongPlayingBeforeVideoRef.current = false
                            }}
                            onError={(e) => console.error('Video failed to load:', e)}
                          >
                            <source src={config.finalVideoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          // Use iframe for external embeds (YouTube, Vimeo, etc.)
                          <iframe
                            src={config.finalVideoUrl}
                            title="Birthday Message"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        )}
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>
              </div>

              <motion.div
                className="flex justify-center gap-4 pt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="text-3xl"
                    animate={{
                      y: [-5, 5, -5],
                      rotate: [-5, 5, -5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.2,
                    }}
                  >
                    ❤️
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}