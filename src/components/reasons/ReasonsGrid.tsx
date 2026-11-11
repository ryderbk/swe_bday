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

      {/* 10 Numbered Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pt-4">
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
      </div>

      {/* Special YOU Card - Centered below */}
      {specialYouCard && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 max-w-sm mx-auto w-full"
        >
          <div
            role="button"
            tabIndex={0}
            aria-label={`Special card: ${specialYouCard.title}. Flip card.`}
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
            className="perspective-1000 group w-full h-64 cursor-pointer focus:outline-none focus:ring-2 focus:ring-champagne rounded-3xl select-none"
          >
            <div
              className={`relative w-full h-full transition-transform duration-600 preserve-3d rounded-3xl ${
                isYouFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* Front of YOU card */}
              <div className="absolute inset-0 backface-hidden rounded-3xl bg-gradient-to-br from-[#2a1b24] via-[#1f1728] to-[#251820] border-2 border-champagne/60 p-6 flex flex-col justify-between shadow-[0_0_30px_rgba(217,184,135,0.2)] group-hover:border-champagne transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-champagne bg-champagne/20 px-3 py-1 rounded-full border border-champagne/40">
                    SPECIAL
                  </span>
                  <Sparkles className="w-5 h-5 text-champagne animate-pulse" />
                </div>

                <div className="my-auto text-center">
                  <h3 className="font-serif text-4xl sm:text-5xl text-champagne font-normal tracking-wider">
                    {specialYouCard.title}
                  </h3>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-xs text-champagne font-sans tracking-wider uppercase">
                  <RotateCw className="w-3.5 h-3.5 text-champagne" />
                  <span className="hidden sm:inline">Hover to reveal</span>
                  <span className="sm:hidden">Tap to reveal</span>
                </div>
              </div>

              {/* Back of YOU card */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl bg-gradient-to-br from-[#FAF7F2] to-[#F5ECE1] border-2 border-rose-muted/60 p-6 flex flex-col justify-between shadow-2xl text-midnight text-center">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-rose-deep bg-rose-muted/20 px-3 py-1 rounded-full">
                    YOU 🤍
                  </span>
                  <Heart className="w-5 h-5 text-rose-muted fill-rose-muted" />
                </div>

                <div className="my-auto px-2">
                  <p className="font-handwriting text-2xl sm:text-3xl text-rosewood-dark leading-snug">
                    "{specialYouCard.description}"
                  </p>
                </div>

                <div className="flex items-center justify-center gap-1 text-xs text-rosewood/70 font-sans tracking-wider uppercase">
                  <RotateCw className="w-3.5 h-3.5 text-rose-muted" />
                  <span className="hidden sm:inline">Move away to flip back</span>
                  <span className="sm:hidden">Tap to flip back</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
