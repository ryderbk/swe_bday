import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import { ConstellationMemory } from '../../data/birthdayContent';
import { SectionHeading } from '../ui/SectionHeading';

interface MemoryConstellationProps {
  title: string;
  subtitle: string;
  memories: ConstellationMemory[];
}

export const MemoryConstellation: React.FC<MemoryConstellationProps> = ({
  title,
  subtitle,
  memories,
}) => {
  const [activeStar, setActiveStar] = useState<ConstellationMemory | null>(null);

  if (!memories || memories.length === 0) return null;

  return (
    <div className="relative py-12 px-4 sm:px-6 max-w-4xl mx-auto w-full">
      <SectionHeading
        eyebrow="Constellation of Memories"
        title={title}
        subtitle={subtitle}
        theme="dark"
      />

      {/* Interactive Celestial Canvas */}
      <div className="relative w-full h-[320px] sm:h-[400px] rounded-3xl bg-midnight-dark/80 border border-champagne/20 shadow-2xl overflow-hidden backdrop-blur-md">
        {/* Subtle Constellation Lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {memories.map((star, idx) => {
            if (idx === 0) return null;
            const prevStar = memories[idx - 1];
            return (
              <line
                key={`line-${idx}`}
                x1={prevStar.x}
                y1={prevStar.y}
                x2={star.x}
                y2={star.y}
                stroke="rgba(217, 184, 135, 0.3)"
                strokeWidth="0.5"
                strokeDasharray="1.5 1.5"
              />
            );
          })}
          {/* Optional closed link if more than 3 stars */}
          {memories.length > 3 && (
            <line
              x1={memories[memories.length - 1].x}
              y1={memories[memories.length - 1].y}
              x2={memories[0].x}
              y2={memories[0].y}
              stroke="rgba(217, 184, 135, 0.2)"
              strokeWidth="0.5"
              strokeDasharray="1.5 1.5"
            />
          )}
        </svg>

        {/* Stars */}
        {memories.map((star) => {
          const isSelected = activeStar?.id === star.id;

          return (
            <button
              key={star.id}
              type="button"
              aria-label={`Star memory: ${star.title}`}
              onClick={() => setActiveStar(star)}
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute z-20 group focus:outline-none p-3 -m-3 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
            >
              <div
                className={`relative rounded-full transition-all duration-300 flex items-center justify-center ${
                  isSelected
                    ? 'w-6 h-6 bg-champagne text-midnight shadow-glow-champagne scale-125'
                    : 'w-4 h-4 bg-champagne/80 text-midnight group-hover:scale-125 group-hover:bg-champagne'
                }`}
              >
                <Sparkles className="w-2.5 h-2.5" />
                <span className="absolute inset-0 rounded-full border border-champagne animate-ping opacity-40 pointer-events-none" />
              </div>
              <span className="absolute top-6 left-1/2 -translate-x-1/2 font-handwriting text-xs text-champagne/90 whitespace-nowrap opacity-75 group-hover:opacity-100 transition-opacity">
                {star.title}
              </span>
            </button>
          );
        })}

        {/* Active Star Memory Modal */}
        <AnimatePresence>
          {activeStar && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm z-30 p-5 rounded-2xl bg-midnight/90 border border-champagne/40 shadow-2xl backdrop-blur-xl text-left"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-champagne text-xs font-mono">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{activeStar.title}</span>
                </div>
                <button
                  type="button"
                  aria-label="Close star memory note"
                  onClick={() => setActiveStar(null)}
                  className="text-ivory-dark/60 hover:text-ivory p-1 rounded-full focus:outline-none focus:ring-1 focus:ring-champagne"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="font-handwriting text-lg sm:text-xl text-ivory leading-snug">
                "{activeStar.note}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
