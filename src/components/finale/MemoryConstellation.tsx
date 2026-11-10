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

      {/* Cinematic Celestial Starlit Sky Container */}
      <div className="relative w-full h-[360px] sm:h-[420px] rounded-3xl bg-gradient-to-b from-[#120F18] via-[#1B1624] to-[#120F18] border border-champagne/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden backdrop-blur-md">
        {/* Soft Radial Ambient Nebula Glows */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-rose-muted/15 blur-[90px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-champagne/15 blur-[90px] pointer-events-none" />

        {/* Background Tiny Stardust Layer */}
        {Array.from({ length: 32 }).map((_, i) => (
          <span
            key={`dust-${i}`}
            className="absolute rounded-full bg-champagne-light animate-twinkle pointer-events-none"
            style={{
              left: `${(i * 29) % 96 + 2}%`,
              top: `${(i * 47) % 92 + 4}%`,
              width: `${(i % 3) + 1}px`,
              height: `${(i % 3) + 1}px`,
              animationDelay: `${(i % 7) * 0.5}s`,
              opacity: 0.2 + (i % 4) * 0.15,
            }}
          />
        ))}

        {/* Elegant Curved / Heart-Inspired Constellation Connectors */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Subtle curved celestial path connecting stars */}
          <path
            d="M 22 38 Q 38 22 62 22 Q 78 38 50 64 Z"
            fill="none"
            stroke="rgba(217, 184, 135, 0.35)"
            strokeWidth="0.6"
            strokeDasharray="2 2"
          />
          {/* Subtle inner connecting diagonals */}
          <line x1="22" y1="38" x2="50" y2="64" stroke="rgba(169, 110, 120, 0.3)" strokeWidth="0.5" strokeDasharray="1.5 1.5" />
          <line x1="78" y1="38" x2="50" y2="64" stroke="rgba(169, 110, 120, 0.3)" strokeWidth="0.5" strokeDasharray="1.5 1.5" />
          <line x1="38" y1="22" x2="62" y2="22" stroke="rgba(217, 184, 135, 0.4)" strokeWidth="0.7" />
        </svg>

        {/* Interactive Glowing Memory Stars */}
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
              className="absolute z-20 group focus:outline-none p-3 -m-3 min-w-[48px] min-h-[48px] flex flex-col items-center justify-center cursor-pointer select-none"
            >
              <div
                className={`relative rounded-full transition-all duration-300 flex items-center justify-center ${
                  isSelected
                    ? 'w-7 h-7 bg-champagne text-midnight shadow-[0_0_25px_#D9B887] scale-125'
                    : 'w-4 h-4 bg-champagne/85 text-midnight group-hover:scale-130 group-hover:bg-champagne shadow-glow-champagne'
                }`}
              >
                <Sparkles className="w-2.5 h-2.5" />
                <span className="absolute inset-0 rounded-full border border-champagne animate-ping opacity-40 pointer-events-none" />
              </div>
              <span
                className={`mt-2 font-handwriting text-xs whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? 'text-champagne font-bold opacity-100 scale-105'
                    : 'text-champagne/80 opacity-75 group-hover:opacity-100'
                }`}
              >
                {star.title}
              </span>
            </button>
          );
        })}

        {/* Desktop Anchored Memory Detail Card */}
        <AnimatePresence>
          {activeStar && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm z-30 p-5 rounded-2xl bg-midnight/95 border-2 border-champagne/50 shadow-2xl backdrop-blur-xl text-left"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-champagne text-xs font-mono font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{activeStar.title}</span>
                </div>
                <button
                  type="button"
                  aria-label="Close star memory note"
                  onClick={() => setActiveStar(null)}
                  className="text-ivory-dark/70 hover:text-ivory p-1 rounded-full focus:outline-none focus:ring-1 focus:ring-champagne"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="font-handwriting text-xl text-ivory leading-relaxed">
                "{activeStar.note}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
