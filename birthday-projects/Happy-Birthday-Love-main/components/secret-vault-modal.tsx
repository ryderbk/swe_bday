"use client"
// Original template: github.com/FarhanAlam-Official
import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Lock, Unlock, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { config } from "@/lib/config"

interface SecretVaultModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SecretVaultModal({ isOpen, onClose }: SecretVaultModalProps) {
  const [code, setCode] = useState("")
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [error, setError] = useState("")
  const [showHearts, setShowHearts] = useState(false)

  useEffect(() => {
    // Check if already unlocked
    const unlocked = localStorage.getItem("love-vault-unlocked")
    if (unlocked === "true") {
      setIsUnlocked(true)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (code.toLowerCase() === config.magicCode.toLowerCase()) {
      setShowHearts(true)
      setTimeout(() => {
        setIsUnlocked(true)
        localStorage.setItem("love-vault-unlocked", "true")
        setShowHearts(false)
      }, 1500)
    } else {
      setError("Nice try, but this is password protected 👀❤️")
      setTimeout(() => setError(""), 3000)
    }
    setCode("")
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Hearts explosion animation */}
        {showHearts && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-pink-400"
                style={{
                  left: "50%",
                  top: "50%",
                }}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 1],
                  x: (Math.random() - 0.5) * 400,
                  y: (Math.random() - 0.5) * 400,
                  opacity: [1, 1, 0],
                }}
                transition={{ duration: 1.5, delay: i * 0.02 }}
              >
                <Heart className="w-6 h-6 fill-current" />
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          className="glass bg-white/80 rounded-3xl p-8 max-w-md w-full relative"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-pink-500 hover:text-red-700">
            <X className="w-6 h-6" />
          </button>

          {!isUnlocked ? (
            <>
              <div className="text-center mb-6">
                <Lock className="w-16 h-16 mx-auto text-pink-500 mb-4" />
                <h3 className="text-2xl font-bold text-red-700 mb-2">Our Secret Love Vault ❤️</h3>
                <p className="text-red-600">Enter the magic code I sent you</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Enter magic code..."
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="bg-white/50 border-red-300 focus:border-pink-500 text-center text-lg"
                />
                {error && (
                  <motion.p
                    className="text-red-600 text-center text-sm"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {error}
                  </motion.p>
                )}
                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
                  Unlock ❤️
                </Button>
              </form>
            </>
          ) : (
            <>
              <div className="text-center mb-6">
                <Unlock className="w-16 h-16 mx-auto text-pink-500 mb-4" />
                <h3 className="text-2xl font-bold text-red-700 mb-2">Welcome, My Love! ❤️</h3>
                <p className="text-red-600 mb-6">Our most precious memories</p>
              </div>

              <div className="grid grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto no-scrollbar">
                {config.secretGallery.map((photo, index) => (
                  <motion.div
                    key={index}
                    className="glass rounded-xl overflow-hidden"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="aspect-square relative image-container">
                      <img
                        src={photo.src || "/placeholder.svg"}
                        alt={photo.caption}
                        className="w-full h-full object-cover protected-image"
                        onContextMenu={(e) => e.preventDefault()}
                        draggable={false}
                      />
                      <div className="absolute bottom-1 right-1 text-white/30 text-[8px]">{config.watermarkText}</div>
                    </div>
                    <p className="p-2 text-xs text-red-700 text-center">{photo.caption}</p>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
