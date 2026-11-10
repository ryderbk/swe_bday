"use client"
/* Original by Farhan Alam - github.com/FarhanAlam-Official */
import { useRef, useState } from "react"
import { motion, useScroll } from "framer-motion"
import { config } from "@/lib/config"
import { ThreeDImageRing } from "@/components/3d-image-ring"

export function FriendshipTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollXProgress } = useScroll({ container: containerRef })
  const [show3DRing, setShow3DRing] = useState(false)
  
  // Extract images from timeline events
  const timelineImages = config.timelineEvents.map(event => event.image || "/placeholder.svg")

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-red-700 mb-2">Our Love Story ❤️</h2>
          <p className="text-red-600">Swipe to see our journey together</p>
          
          {/* Toggle button for 3D ring view */}
          <button 
            onClick={() => setShow3DRing(!show3DRing)}
            className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            {show3DRing ? "Show Timeline View" : "Show 3D Memory Ring"}
          </button>
        </motion.div>

        {/* Progress bar */}
        {!show3DRing && (
          <>
            <div className="h-1 bg-red-200 rounded-full mb-6 overflow-hidden">
              <motion.div className="h-full bg-pink-500 origin-left" style={{ scaleX: scrollXProgress }} />
            </div>

            {/* Timeline scroll container */}
            <div ref={containerRef} className="overflow-x-auto no-scrollbar pb-4">
              <div className="flex gap-6 min-w-max px-4">
                {config.timelineEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    className="w-72 flex-shrink-0"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="glass rounded-2xl overflow-hidden h-full flex flex-col">
                      <div className="aspect-video relative image-container overflow-hidden">
                        <img
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          className="w-full h-full object-cover protected-image"
                          onContextMenu={(e) => e.preventDefault()}
                          draggable={false}
                        />
                        <div className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {event.date}
                        </div>
                      </div>
                      <div className="p-4 flex-grow">
                        <h3 className="text-lg font-bold text-red-700 mb-2">{event.title}</h3>
                        <p className="text-red-600 text-sm">{event.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* 3D Image Ring View */}
        {show3DRing && (
          <div className="flex justify-center items-center h-[600px]">
            <ThreeDImageRing 
              images={timelineImages}
              width={450}
              imageDistance={700}
              perspective={2000}
              draggable={true}
              containerClassName="rounded-2xl"
              imageClassName="rounded-xl shadow-lg"
              hoverOpacity={0.7}
            />
          </div>
        )}
      </div>
    </section>
  )
}