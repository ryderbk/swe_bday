"use client"

import { useEffect, useRef } from "react"

interface ConfettiPiece {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  rotation: number
  rotationSpeed: number
  color: string
  shape: "rect" | "circle" | "heart"
}

export function ConfettiEffect({ trigger }: { trigger: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const confettiRef = useRef<ConfettiPiece[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    if (!trigger) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const colors = ["#fecaca", "#fb7185", "#f97373", "#b91c1c", "#fecdd3", "#ffe4e6", "#fef2f2"]
    const shapes: ("rect" | "circle" | "heart")[] = ["rect", "circle", "heart"]

    // Create confetti pieces
    confettiRef.current = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 100,
      size: Math.random() * 10 + 5,
      speedX: (Math.random() - 0.5) * 8,
      speedY: Math.random() * 3 + 2,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    }))

    const drawHeart = (x: number, y: number, size: number) => {
      ctx.beginPath()
      ctx.moveTo(x, y + size * 0.3)
      ctx.bezierCurveTo(x - size * 0.5, y - size * 0.3, x - size, y + size * 0.3, x, y + size)
      ctx.bezierCurveTo(x + size, y + size * 0.3, x + size * 0.5, y - size * 0.3, x, y + size * 0.3)
      ctx.closePath()
      ctx.fill()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      let activeCount = 0

      confettiRef.current.forEach((piece) => {
        if (piece.y < canvas.height + 50) {
          activeCount++
          ctx.save()
          ctx.translate(piece.x, piece.y)
          ctx.rotate(piece.rotation)
          ctx.fillStyle = piece.color

          if (piece.shape === "rect") {
            ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size / 2)
          } else if (piece.shape === "circle") {
            ctx.beginPath()
            ctx.arc(0, 0, piece.size / 2, 0, Math.PI * 2)
            ctx.fill()
          } else {
            drawHeart(0, 0, piece.size / 2)
          }

          ctx.restore()

          piece.x += piece.speedX
          piece.y += piece.speedY
          piece.speedY += 0.1 // gravity
          piece.rotation += piece.rotationSpeed
        }
      })

      if (activeCount > 0) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [trigger])

  if (!trigger) return null

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />
}
