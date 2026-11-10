"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  rotation: number
  rotationSpeed: number
}

export function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Initialize particles
    const particleCount = 50
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 15 + 10,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: -Math.random() * 0.5 - 0.2,
      opacity: Math.random() * 0.5 + 0.3,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
    }))

    const drawHeart = (x: number, y: number, size: number, rotation: number, opacity: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.globalAlpha = opacity

      ctx.beginPath()
      ctx.moveTo(0, size * 0.3)
      ctx.bezierCurveTo(-size * 0.5, -size * 0.3, -size, size * 0.3, 0, size)
      ctx.bezierCurveTo(size, size * 0.3, size * 0.5, -size * 0.3, 0, size * 0.3)
      ctx.closePath()

      const gradient = ctx.createRadialGradient(0, size * 0.3, 0, 0, size * 0.3, size)
      gradient.addColorStop(0, "rgba(248, 113, 113, 0.9)") // soft red center
      gradient.addColorStop(1, "rgba(244, 114, 182, 0.5)") // pink edge
      ctx.fillStyle = gradient
      ctx.fill()

      ctx.restore()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle) => {
        drawHeart(particle.x, particle.y, particle.size, particle.rotation, particle.opacity)

        particle.x += particle.speedX
        particle.y += particle.speedY
        particle.rotation += particle.rotationSpeed

        // Reset particle when it goes off screen
        if (particle.y < -particle.size * 2) {
          particle.y = canvas.height + particle.size
          particle.x = Math.random() * canvas.width
        }
        if (particle.x < -particle.size * 2) {
          particle.x = canvas.width + particle.size
        }
        if (particle.x > canvas.width + particle.size * 2) {
          particle.x = -particle.size
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "linear-gradient(180deg, #fff1f2 0%, #ffe4e6 50%, #fee2e2 100%)" }}
    />
  )
}
