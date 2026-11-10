import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RotateCcw, CheckCircle2 } from 'lucide-react';
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
  const [activeNote, setActiveNote] = useState<BalloonItem | null>(null);

  const handlePop = (balloon: BalloonItem) => {
    if (poppedSet.has(balloon.id)) return;

    // Pop sound
    audioManager.playSFX('balloonPop');

    setPoppedSet((prev) => {
      const next = new Set(prev);
      next.add(balloon.id);
      return next;
    });

    setActiveNote(balloon);
  };

  const handleReset = () => {
    setPoppedSet(new Set());
    setActiveNote(null);
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

      {/* Progress pill */}
      <div className="mb-6 flex items-center gap-2 px-4 py-1.5 rounded-full bg-midnight-surface/80 border border-champagne/30 text-xs font-mono text-champagne backdrop-blur-md">
        <span>Balloons Popped:</span>
        <span className="font-bold text-white">
          {poppedSet.size} / {balloons.length}
        </span>
      </div>

      {/* Balloon Grid Stage */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-6 w-full max-w-4xl py-4 place-items-center">
        {balloons.map((b, idx) => {
          const isPopped = poppedSet.has(b.id);
          const imgSrc = BALLOON_IMAGES[b.color] || BALLOON_IMAGES.gold;

          return (
            <div
              key={b.id}
              className="relative w-24 sm:w-28 h-32 sm:h-36 flex flex-col items-center justify-center"
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
                      y: [0, -6, 0],
                    }}
                    exit={{
                      scale: [1, 1.35, 0],
                      opacity: [1, 1, 0],
                      filter: 'brightness(1.5)',
                    }}
                    transition={{
                      y: {
                        duration: 3 + (idx % 3),
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: (idx % 5) * 0.3,
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
                ) : (
                  <motion.div
                    key={`popped-${b.id}`}
                    initial={{ scale: 0.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-12 h-12 rounded-full bg-champagne/15 border border-champagne/30 flex items-center justify-center text-champagne"
                  >
                    <CheckCircle2 className="w-5 h-5 text-champagne/80" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Active Balloon Note Modal / Bottom Card */}
      <AnimatePresence>
        {activeNote && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="mt-6 w-full max-w-md p-5 sm:p-6 rounded-2xl bg-[#FAF7F2] border border-champagne/40 shadow-2xl text-midnight text-center"
          >
            <span className="font-mono text-xs uppercase tracking-wider text-rose-deep font-semibold">
              ✨ Secret Message
            </span>
            <h4 className="font-serif text-2xl text-rosewood-dark mt-1 mb-2 font-medium">
              {activeNote.title}
            </h4>
            <div className="w-12 h-px bg-champagne mx-auto mb-3" />
            <p className="font-handwriting text-xl sm:text-2xl text-midnight leading-relaxed">
              "{activeNote.note}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>

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

