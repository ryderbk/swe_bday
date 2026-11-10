"use client";
// Original template by Farhan Alam (github.com/FarhanAlam-Official)
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Lock, Grid3X3, RotateCcw } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { config } from "@/lib/config"
import { ThreeDImageRing } from "@/components/3d-image-ring"

interface Photo {
  src: string
  caption: string
}

export function PhotoGallery({ onSecretVaultClick }: { onSecretVaultClick: () => void }) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentGallery, setCurrentGallery] = useState<Photo[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "3d">("grid") // New state for view mode

  const openLightbox = (photo: Photo, gallery: Photo[]) => {
    setSelectedPhoto(photo)
    setCurrentGallery(gallery)
    setCurrentIndex(gallery.findIndex((p) => p.src === photo.src))
  }

  const navigate = (direction: "prev" | "next") => {
    const newIndex =
      direction === "prev"
        ? (currentIndex - 1 + currentGallery.length) % currentGallery.length
        : (currentIndex + 1) % currentGallery.length
    setCurrentIndex(newIndex)
    setSelectedPhoto(currentGallery[newIndex])
  }

  // Flatten all gallery photos for the 3D ring
  const allPhotos = Object.values(config.publicGalleries).flat()
  const allPhotoUrls = allPhotos.map(photo => photo.src || "/placeholder.svg")

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center text-red-700 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our Memories 📸
        </motion.h2>

        {/* View mode toggle */}
        <div className="flex justify-center mb-6">
          <div className="flex bg-white/50 rounded-full p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                viewMode === "grid" 
                  ? "bg-pink-500 text-white" 
                  : "text-red-700 hover:bg-white/80"
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
              Grid View
            </button>
            <button
              onClick={() => setViewMode("3d")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                viewMode === "3d" 
                  ? "bg-pink-500 text-white" 
                  : "text-red-700 hover:bg-white/80"
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              3D Ring
            </button>
          </div>
        </div>

        {viewMode === "grid" ? (
          <>
            <Tabs defaultValue="funny" className="w-full">
              <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent mb-8">
                <TabsTrigger
                  value="funny"
                  className="data-[state=active]:bg-pink-500 data-[state=active]:text-white rounded-full px-4 py-2 bg-white/50"
                >
                  Funny 😭
                </TabsTrigger>
                <TabsTrigger
                  value="emotional"
                  className="data-[state=active]:bg-pink-500 data-[state=active]:text-white rounded-full px-4 py-2 bg-white/50"
                >
                  Emotional 🥹
                </TabsTrigger>
                <TabsTrigger
                  value="trips"
                  className="data-[state=active]:bg-pink-500 data-[state=active]:text-white rounded-full px-4 py-2 bg-white/50"
                >
                  Trips ✈️
                </TabsTrigger>
                <TabsTrigger
                  value="chaos"
                  className="data-[state=active]:bg-pink-500 data-[state=active]:text-white rounded-full px-4 py-2 bg-white/50"
                >
                  Chaos 😂
                </TabsTrigger>
                <button
                  onClick={onSecretVaultClick}
                  className="flex items-center gap-2 rounded-full px-4 py-2 bg-red-700 text-white hover:bg-red-800 transition-colors"
                >
                  <Lock className="w-4 h-4" />
                  Secret Vault ❤️
                </button>
              </TabsList>

              {Object.entries(config.publicGalleries).map(([key, photos]) => (
                <TabsContent key={key} value={key}>
                  <GalleryGrid photos={photos} onPhotoClick={openLightbox} />
                </TabsContent>
              ))}
            </Tabs>
          </>
        ) : (
          // 3D Ring View
          <div className="flex flex-col items-center">
            <div className="w-full h-[600px] flex justify-center items-center mb-8">
              <ThreeDImageRing 
                images={allPhotoUrls}
                width={450}
                imageDistance={700}
                perspective={2000}
                draggable={true}
                containerClassName="rounded-2xl"
                imageClassName="rounded-xl shadow-lg"
                hoverOpacity={0.7}
              />
            </div>
            <p className="text-red-600 text-center mb-6">
              Drag to rotate the memory ring. Each image represents a special moment we've shared.
            </p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              className="absolute top-4 right-4 text-white p-2 hover:bg-white/20 rounded-full"
              onClick={() => setSelectedPhoto(null)}
            >
              <X className="w-8 h-8" />
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/20 rounded-full"
              onClick={(e) => {
                e.stopPropagation()
                navigate("prev")
              }}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <motion.div
              className="max-w-4xl max-h-[80vh] relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="image-container">
                <img
                  src={selectedPhoto.src || "/placeholder.svg"}
                  alt={selectedPhoto.caption}
                  className="max-h-[70vh] w-auto rounded-lg protected-image"
                  onContextMenu={(e) => e.preventDefault()}
                  draggable={false}
                />
                {/* Watermark overlay */}
                <div className="absolute bottom-2 right-2 text-white/30 text-xs font-medium pointer-events-none">
                  {config.watermarkText}
                </div>
              </div>
              <p className="text-white text-center mt-4 text-lg">{selectedPhoto.caption}</p>
            </motion.div>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/20 rounded-full"
              onClick={(e) => {
                e.stopPropagation()
                navigate("next")
              }}
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function GalleryGrid({
  photos,
  onPhotoClick,
}: {
  photos: Photo[]
  onPhotoClick: (photo: Photo, gallery: Photo[]) => void
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {photos.map((photo, index) => (
        <motion.div
          key={index}
          className="group cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          onClick={() => onPhotoClick(photo, photos)}
        >
          <div className="glass rounded-xl overflow-hidden">
            <div className="aspect-[3/4] relative image-container">
              <img
                src={photo.src || "/placeholder.svg"}
                alt={photo.caption}
                className="w-full h-full object-cover protected-image group-hover:scale-105 transition-transform duration-300"
                onContextMenu={(e) => e.preventDefault()}
                draggable={false}
              />
              {/* Watermark */}
              <div className="absolute bottom-1 right-1 text-white/20 text-[8px] pointer-events-none">❤️</div>
            </div>
            <p className="p-3 text-sm text-red-700 text-center line-clamp-2">{photo.caption}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}