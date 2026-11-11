import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RotateCcw, X } from 'lucide-react';
import { BalloonItem } from '../../data/birthdayContent';
import { audioManager } from '../../lib/audio';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';

interface BalloonGameProps {
  title: string;
  subtitle: string;
  completionTitle: string;
  completionMessage: string;
  balloons: BalloonItem[];
}

const BALLOON_IMAGES: Record<string, string> = {
  gold: '/images/surprise/balloons/gold-balloon.webp',
  green: '/images/surprise/balloons/green-balloon.webp',
  pink: '/images/surprise/balloons/pink-balloon.webp',
  purple: '/images/surprise/balloons/purple-balloon.webp',
};

export const BalloonGame: React.FC<BalloonGameProps> = ({
  title,
  subtitle,
  completionTitle,
  completionMessage,
  balloons,
}) => {
  const [poppedSet, setPoppedSet] = useState<Set<string>>(new Set());
  const [revealedId, setRevealedId] = useState<string | null>(null);

  const handlePop = (balloon: BalloonItem) => {
    if (poppedSet.has(balloon.id)) {
      setRevealedId(balloon.id);
      return;
    }

    audioManager.playSFX('balloonPop');

    setPoppedSet((prev) => {
      const next = new Set(prev);
      next.add(balloon.id);
      return next;
    });

    setRevealedId(balloon.id);
  };

  const handleReset = () => {
    setPoppedSet(new Set());
    setRevealedId(null);
  };

  const isAllPopped = balloons.length > 0 && poppedSet.size === balloons.length;

  return (
    <div className="relative py-16 px-4 sm:px-6 max-w-5xl mx-auto w-full flex flex-col items-center">
      <SectionHeading
        eyebrow="Interactive Surprise"
        title={title}
        subtitle={subtitle}
        theme="dark"
      />

      {/* Balloon Grid Stage: 3 cols mobile, 5 cols desktop */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-6 w-full max-w-4xl py-6 place-items-center">
        {balloons.map((b, idx) => {
          const isPopped = poppedSet.has(b.id);
          const isRevealed = revealedId === b.id;
          const imgSrc = BALLOON_IMAGES[b.color] || BALLOON_IMAGES.gold;

          const floatDelay = (idx * 0.3) % 2;
          const floatDuration = 3 + (idx % 3) * 0.5;

          return (
            <div
              key={b.id}
              className="relative w-24 sm:w-32 h-36 sm:h-44 flex flex-col items-center justify-center"
            >
              <AnimatePresence mode="wait">
                {!isPopped ? (
                  <motion.button
                    type="button"
                    aria-label={`Pop ${b.color} balloon: ${b.title}`}
                    onClick={() => handlePop(b)}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      y: [0, -8, 0],
                    }}
                    exit={{
                      scale: [1, 1.4, 0],
                      opacity: [1, 1, 0],
                      filter: 'brightness(1.5)',
                    }}
                    transition={{
                      y: {
                        duration: floatDuration,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: floatDelay,
                      },
                      exit: { duration: 0.25 },
                    }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    className="w-full h-full p-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-champagne rounded-2xl flex flex-col items-center justify-center select-none"
                  >
                    <img
                      src={imgSrc}
                      alt={`${b.color} balloon`}
                      className="w-full h-full object-contain drop-shadow-lg"
                    />
                  </motion.button>
                ) : isRevealed ? (
                  /* In-Place Revealed Note Card */
                  <motion.div
                    key={`card-${b.id}`}
                    initial={{ scale: 0.5, opacity: 0, rotate: -3 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="absolute inset-0 z-30 p-2.5 sm:p-3 rounded-xl bg-[#FAF7F2] border border-champagne/60 shadow-xl flex flex-col justify-between text-midnight text-left"
                  >
                    <div className="flex items-center justify-between gap-1 border-b border-rosewood/10 pb-1">
                      <span className="font-mono text-[9px] sm:text-[10px] text-rose-deep font-semibold uppercase tracking-wider truncate">
                        {b.title}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setRevealedId(null);
                        }}
                        aria-label="Minimize note"
                        className="text-rosewood/50 hover:text-rosewood p-0.5 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="font-handwriting text-xs sm:text-sm text-midnight leading-tight my-auto overflow-y-auto max-h-[85px] py-1">
                      "{b.note}"
                    </p>
                    <div className="text-[8px] text-rosewood/50 font-mono text-center pt-1 border-t border-rosewood/10">
                      ✓ popped
                    </div>
                  </motion.div>
                ) : (
                  /* Popped Badge - tap to see note again */
                  <motion.button
                    key={`popped-badge-${b.id}`}
                    type="button"
                    onClick={() => setRevealedId(b.id)}
                    aria-label={`View note for ${b.title}`}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.08 }}
                    className="w-14 sm:w-18 h-14 sm:h-18 rounded-2xl bg-midnight-surface/80 border border-champagne/40 flex flex-col items-center justify-center p-1 text-center cursor-pointer shadow-md hover:border-champagne"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-champagne mb-1" />
                    <span className="font-handwriting text-[10px] sm:text-[11px] text-ivory-dark truncate w-full px-1">
                      {b.title}
                    </span>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* All Popped Celebration Card */}
      {isAllPopped && (
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-8 p-6 sm:p-8 rounded-3xl bg-midnight-surface/90 border-2 border-champagne/40 shadow-2xl text-center max-w-lg"
        >
          <Sparkles className="w-8 h-8 text-champagne mx-auto mb-2" />
          <h3 className="font-serif text-2xl sm:text-3xl text-ivory font-light mb-2">
            {completionTitle}
          </h3>
          <p className="font-sans text-sm sm:text-base text-ivory-dark/80 font-light mb-6">
            {completionMessage}
          </p>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleReset}
            icon={<RotateCcw className="w-4 h-4" />}
          >
            Blow Up Balloons Again
          </Button>
        </motion.div>
      )}
    </div>
  );
};
