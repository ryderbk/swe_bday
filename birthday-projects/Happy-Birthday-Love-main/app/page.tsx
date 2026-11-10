"use client"

import { useState, useEffect } from "react"
import { ParticlesBackground } from "@/components/particles-background"
import { ConfettiEffect } from "@/components/confetti-effect"
import { FloatingBalloons } from "@/components/floating-balloons"
import { HeroSection } from "@/components/hero-section"
import { LoveLetter } from "@/components/love-letter"
import { PhotoGallery } from "@/components/photo-gallery"
import { SecretVaultModal } from "@/components/secret-vault-modal"
import { BalloonGame } from "@/components/balloon-game"
import { FlipCards } from "@/components/flip-cards"
import { FriendshipTimeline } from "@/components/friendship-timeline"
import { BestieQuiz } from "@/components/bestie-quiz"
import { CakeFinale } from "@/components/cake-finale"

export default function BirthdayPage() {
  const [showConfetti, setShowConfetti] = useState(false)
  const [showBalloons, setShowBalloons] = useState(false)
  const [isVaultOpen, setIsVaultOpen] = useState(false)
  const [audioUnlocked, setAudioUnlocked] = useState(false)

  useEffect(() => {
    // Disable right-click and drag for image protection
    const preventContextMenu = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === "IMG") {
        e.preventDefault()
      }
    }

    const preventDrag = (e: DragEvent) => {
      if ((e.target as HTMLElement).tagName === "IMG") {
        e.preventDefault()
      }
    }

    document.addEventListener("contextmenu", preventContextMenu)
    document.addEventListener("dragstart", preventDrag)

    // Trigger entrance effects
    const timer = setTimeout(() => {
      setShowConfetti(true)
      setShowBalloons(true)
    }, 500)

    // Unlock audio context on first user interaction
    const unlockAudio = () => {
      if (!audioUnlocked) {
        setAudioUnlocked(true)
        // Try to trigger the song immediately after unlocking
        setTimeout(() => {
          window.dispatchEvent(new Event("start-birthday-song"))
        }, 100)
      }
    }

    // Listen for any user interaction to unlock audio
    const interactionEvents = ['click', 'touchstart', 'keydown']
    interactionEvents.forEach(event => {
      document.addEventListener(event, unlockAudio, { once: true })
    })

    return () => {
      document.removeEventListener("contextmenu", preventContextMenu)
      document.removeEventListener("dragstart", preventDrag)
      interactionEvents.forEach(event => {
        document.removeEventListener(event, unlockAudio)
      })
      clearTimeout(timer)
    }
  }, [audioUnlocked])

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Background effects */}
      <ParticlesBackground />
      <ConfettiEffect trigger={showConfetti} />
      {showBalloons && <FloatingBalloons count={15} />}

      {/* Main content */}
      <div className="relative z-10">
        <HeroSection />
        <LoveLetter />
        <PhotoGallery onSecretVaultClick={() => setIsVaultOpen(true)} />
        <BalloonGame />
        <FriendshipTimeline />
        <FlipCards />
        <BestieQuiz />
        <CakeFinale />
      </div>

      {/* Secret Vault Modal */}
      <SecretVaultModal isOpen={isVaultOpen} onClose={() => setIsVaultOpen(false)} />
    </main>
  )
}