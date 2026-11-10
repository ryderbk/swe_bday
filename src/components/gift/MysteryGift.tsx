import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioManager } from '../../lib/audio';
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
    giftCloseImage?: string;
    giftOpenImage?: string;
  };
}

export const MysteryGift: React.FC<MysteryGiftProps> = ({ gift }) => {
  if (!gift.enabled) return null;

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Audio SFX
    audioManager.playSFX('giftOpen');

    try {
      confetti({
        particleCount: 50,
        spread: 65,
        origin: { y: 0.65 },
        colors: ['#D9B887', '#A96E78', '#FAF7F2', '#EAD5B5'],
        disableForReducedMotion: true,
      });
    } catch {
      // Confetti fallback
    }
  };

  const handleReset = () => {
    setIsOpen(false);
  };

  const closeImg = gift.giftCloseImage || '/images/surprise/gift-close.webp';
  const openImg = gift.giftOpenImage || '/images/surprise/gift-open.webp';

  return (
    <div className="relative py-20 px-4 sm:px-6 max-w-xl mx-auto w-full">
      <SectionHeading
        eyebrow="A Special Surprise"
        title={gift.title}
        subtitle={gift.subtitle}
        theme="dark"
      />

      <div className="relative flex flex-col items-center justify-center">
        {/* Project 2 Champagne Gift Artwork Container */}
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
            className={`absolute inset-0 rounded-3xl bg-gradient-to-r from-champagne/20 via-rose-muted/20 to-champagne/20 blur-xl transition-all duration-700 pointer-events-none ${
              isOpen ? 'opacity-90 scale-115' : 'opacity-35 group-hover:opacity-70'
            }`}
          />

          {/* Visual Box with Smooth Crossfade & Scale */}
          <div className="relative w-64 sm:w-72 aspect-square flex items-center justify-center select-none">
            <AnimatePresence mode="wait">
              {!isOpen ? (
                <motion.div
                  key="closed-gift"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full flex flex-col items-center justify-center"
                >
                  <img
                    src={closeImg}
                    alt="Champagne gift box with rose gold ribbon"
                    className="w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] animate-float-subtle"
                  />
                  <div className="absolute bottom-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-midnight/80 border border-champagne/30 text-champagne text-xs font-sans tracking-wide shadow-md">
                    <Sparkles className="w-3 h-3 text-champagne" />
                    <span>Tap to open</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="opened-gift"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <img
                    src={openImg}
                    alt="Opened champagne gift box with floating heart"
                    className="w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
                  />
                </motion.div>
              )}
            </AnimatePresence>
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
              className="mt-6 w-full max-w-md p-6 sm:p-8 rounded-3xl bg-[#FAF7F2] border border-champagne/40 shadow-2xl text-midnight text-center relative overflow-hidden"
            >
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
    </div>
  );
};
