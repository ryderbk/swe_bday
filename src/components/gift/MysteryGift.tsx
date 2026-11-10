import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';

interface MysteryGiftProps {
  gift: {
    enabled: boolean;
    title: string;
    subtitle: string;
    revealTitle: string;
    message: string;
    note?: string;
  };
}

export const MysteryGift: React.FC<MysteryGiftProps> = ({ gift }) => {
  if (!gift.enabled) return null;

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);

    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#D9B887', '#A96E78', '#FAF7F2'],
        disableForReducedMotion: true,
      });
    } catch {
      // Confetti fallback
    }
  };

  const handleReset = () => {
    setIsOpen(false);
  };

  return (
    <section id="gift" className="relative py-20 px-4 sm:px-6 max-w-xl mx-auto w-full">
      <SectionHeading
        eyebrow="A Special Surprise"
        title={gift.title}
        subtitle={gift.subtitle}
        theme="dark"
      />

      <div className="relative flex flex-col items-center justify-center">
        {/* Gift Box Container */}
        <div
          role="button"
          tabIndex={0}
          aria-label={isOpen ? 'Gift opened' : 'Unwrap your surprise gift box'}
          aria-expanded={isOpen}
          onClick={handleOpen}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleOpen();
            }
          }}
          className="relative group cursor-pointer focus:outline-none focus:ring-4 focus:ring-champagne/40 rounded-3xl p-4 transition-transform duration-300"
        >
          {/* Ambient Glow */}
          <div
            className={`absolute inset-0 rounded-3xl bg-gradient-to-r from-champagne/20 via-rose-muted/20 to-champagne/20 blur-xl transition-all duration-700 ${
              isOpen ? 'opacity-80 scale-110' : 'opacity-30 group-hover:opacity-60'
            }`}
          />

          {/* 3D Visual Box */}
          <div className="relative w-64 sm:w-72 h-56 flex flex-col items-center justify-end select-none">
            {/* Box Lid */}
            <motion.div
              animate={{
                y: isOpen ? -75 : 0,
                rotate: isOpen ? -18 : 0,
                opacity: isOpen ? 0.35 : 1,
              }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="absolute top-8 z-30 w-[108%] h-14 bg-gradient-to-r from-rose-deep via-rose-muted to-rosewood rounded-t-xl border-t border-champagne/40 shadow-xl flex items-center justify-center"
            >
              {/* Lid Ribbon Horizontal */}
              <div className="absolute inset-y-0 w-8 bg-gradient-to-r from-champagne via-champagne-light to-champagne shadow-sm" />
              {/* Bow on Top */}
              <div className="absolute -top-6 w-12 h-6 flex items-center justify-center">
                <div className="w-5 h-5 rounded-full border-2 border-champagne bg-champagne-light shadow-md" />
                <div className="absolute -left-2 w-5 h-4 border border-champagne bg-champagne/60 rounded-full -rotate-45" />
                <div className="absolute -right-2 w-5 h-4 border border-champagne bg-champagne/60 rounded-full rotate-45" />
              </div>
            </motion.div>

            {/* Box Body */}
            <div className="relative z-20 w-full h-36 bg-gradient-to-b from-[#2a222f] to-[#1c1622] rounded-b-2xl border-b border-x border-champagne/30 shadow-2xl overflow-hidden flex items-center justify-center">
              {/* Body Vertical Ribbon */}
              <div className="absolute inset-y-0 w-8 bg-gradient-to-r from-champagne via-champagne-light to-champagne shadow-inner" />
              {/* Body Horizontal Ribbon */}
              <div className="absolute inset-x-0 h-7 bg-gradient-to-b from-champagne via-champagne-light to-champagne opacity-80" />

              {!isOpen && (
                <div className="relative z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-midnight/70 border border-champagne/30 text-champagne text-xs font-sans tracking-wide">
                  <Sparkles className="w-3 h-3 text-champagne" />
                  <span>Tap to open</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Revealed Content Card */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 w-full max-w-md p-6 sm:p-8 rounded-3xl bg-[#FAF7F2] border border-champagne/40 shadow-2xl text-midnight text-center relative overflow-hidden"
            >
              {/* Paper corner ribbon */}
              <div className="w-12 h-12 rounded-full bg-rose-muted/15 text-rose-deep mx-auto flex items-center justify-center mb-3">
                <Heart className="w-6 h-6 fill-rose-muted text-rose-muted" />
              </div>

              <h4 className="font-serif text-2xl sm:text-3xl font-normal text-rosewood-dark mb-3">
                {gift.revealTitle}
              </h4>

              <div className="w-12 h-px bg-champagne mx-auto my-3" />

              <p className="font-handwriting text-xl sm:text-2xl text-midnight leading-relaxed mb-4">
                "{gift.message}"
              </p>

              {gift.note && (
                <p className="font-sans text-xs text-rosewood/70 italic border-t border-rosewood/10 pt-3">
                  {gift.note}
                </p>
              )}

              <div className="mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  icon={<RotateCcw className="w-3.5 h-3.5" />}
                >
                  Close & Re-wrap
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
