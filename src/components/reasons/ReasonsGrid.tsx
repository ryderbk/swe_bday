import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, RotateCw } from 'lucide-react';
import { LoveReason, SpecialYouCard } from '../../data/birthdayContent';
import { SectionHeading } from '../ui/SectionHeading';
import { FlipCard } from './FlipCard';

interface ReasonsGridProps {
  reasons: LoveReason[];
  specialYouCard: SpecialYouCard;
}

export const ReasonsGrid: React.FC<ReasonsGridProps> = ({ reasons, specialYouCard }) => {
  const [isYouFlipped, setIsYouFlipped] = useState(false);

  if (!reasons || reasons.length === 0) return null;

  return (
    <div className="relative py-20 px-4 sm:px-6 max-w-6xl mx-auto w-full">
      <SectionHeading
        eyebrow="My Favorite Things"
        title="Little Things I Notice About You"
        subtitle="Ten little reasons that make you who you are, and one special reason at the heart of it all."
        theme="dark"
      />

      {/* Grid: 2 cols on mobile, 3 on tablet, 4 on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pt-4">
        {reasons.map((reason, idx) => (
          <motion.div
            key={reason.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5, delay: idx * 0.04 }}
          >
            <FlipCard reason={reason} />
          </motion.div>
        ))}

        {/* #11 YOU Card - integrated directly in the same grid, spans 2 columns */}
        {specialYouCard && (
          <motion.div
            key="you-card-11"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="col-span-2"
          >
            <div
              role="button"
              tabIndex={0}
              aria-label={`Card #11: ${specialYouCard.title}. Press Enter or click to flip card.`}
              aria-pressed={isYouFlipped}
              onClick={() => setIsYouFlipped((prev) => !prev)}
              onMouseEnter={() => setIsYouFlipped(true)}
              onMouseLeave={() => setIsYouFlipped(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsYouFlipped((prev) => !prev);
                }
              }}
              className="perspective-1000 group w-full h-56 sm:h-64 cursor-pointer focus:outline-none focus:ring-2 focus:ring-champagne focus:ring-offset-2 focus:ring-offset-midnight rounded-2xl select-none"
            >
              <div
                className={`relative w-full h-full transition-transform duration-500 preserve-3d rounded-2xl ${
                  isYouFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front of YOU card */}
                <div className="absolute inset-0 backface-hidden rounded-2xl bg-gradient-to-br from-[#2a1b24] via-[#1f1728] to-[#251820] border-2 border-champagne/60 p-6 flex flex-col justify-between shadow-[0_0_25px_rgba(217,184,135,0.15)] group-hover:border-champagne transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-champagne bg-champagne/20 px-3 py-1 rounded-full border border-champagne/40">
                      #11
                    </span>
                    <Sparkles className="w-5 h-5 text-champagne animate-pulse" />
                  </div>

                  <div className="my-auto text-center">
                    <h3 className="font-serif text-3xl sm:text-4xl text-champagne font-normal tracking-wider">
                      {specialYouCard.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-champagne/80 font-sans tracking-wider uppercase">
                    <RotateCw className="w-3 h-3 text-champagne" />
                    <span className="hidden sm:inline">Hover to reveal</span>
                    <span className="sm:hidden">Tap to reveal</span>
                  </div>
                </div>

                {/* Back of YOU card */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl bg-gradient-to-br from-[#FAF7F2] to-[#F5ECE1] border-2 border-rose-muted/60 p-6 flex flex-col justify-between shadow-2xl text-midnight text-center">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-rose-deep bg-rose-muted/20 px-3 py-1 rounded-full">
                      #11 · YOU 🤍
                    </span>
                    <Heart className="w-4 h-4 text-rose-muted fill-rose-muted" />
                  </div>

                  <div className="my-auto px-2">
                    <p className="font-handwriting text-xl sm:text-2xl text-rosewood-dark leading-snug">
                      "{specialYouCard.description}"
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-1 text-[11px] text-rosewood/70 font-sans tracking-wider uppercase">
                    <RotateCw className="w-3 h-3 text-rose-muted" />
                    <span className="hidden sm:inline">Move away to flip back</span>
                    <span className="sm:hidden">Tap to flip back</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
