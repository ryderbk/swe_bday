import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioManager } from '../../lib/audio';
import { SectionHeading } from '../ui/SectionHeading';

interface RomanticQuestionProps {
  title: string;
  subtitle: string;
  buttonLabel: string;
  helperText?: string;
  revealedTitle: string;
  revealedMessage: string;
}

export const RomanticQuestion: React.FC<RomanticQuestionProps> = ({
  title,
  subtitle,
  buttonLabel,
  helperText,
  revealedTitle,
  revealedMessage,
}) => {
  const [isAnswered, setIsAnswered] = useState(false);

  const handleYes = () => {
    if (isAnswered) return;
    setIsAnswered(true);

    // Audio SFX
    audioManager.playSFX('heartPop');

    // Confetti Heart Burst
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#A96E78', '#D9B887', '#FAF7F2', '#EAD5B5'],
        disableForReducedMotion: true,
      });
    } catch {
      // Fallback
    }
  };

  return (
    <div className="relative py-20 px-4 sm:px-6 max-w-xl mx-auto w-full text-center">
      <SectionHeading
        eyebrow="One Little Question"
        title={title}
        subtitle={subtitle}
        theme="dark"
      />

      <div className="relative flex flex-col items-center justify-center my-6">
        <AnimatePresence mode="wait">
          {!isAnswered ? (
            <motion.div
              key="question-box"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full flex flex-col items-center"
            >
              {/* Pulsing Affectionate Heart Icon */}
              <div className="w-16 h-16 rounded-full bg-rose-muted/20 border-2 border-rose-muted/40 flex items-center justify-center text-rose-muted mb-6 shadow-glow-rose">
                <Heart className="w-8 h-8 fill-rose-muted animate-pulse" />
              </div>

              {/* Sole Affirmative Button */}
              <motion.button
                type="button"
                onClick={handleYes}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.94 }}
                className="w-full max-w-md py-4 px-6 rounded-full bg-gradient-to-r from-rose-muted via-rose-soft to-champagne text-white font-serif text-lg sm:text-xl font-medium tracking-wide shadow-xl shadow-rose-900/30 border border-white/20 focus:outline-none focus:ring-4 focus:ring-rose-muted/50 cursor-pointer select-none transition-shadow hover:shadow-glow-rose"
              >
                {buttonLabel}
              </motion.button>

              {helperText && (
                <p className="font-handwriting text-base sm:text-lg text-champagne/80 mt-4">
                  {helperText}
                </p>
              )}
            </motion.div>
          ) : (
            /* Heartfelt Revealed Response Card */
            <motion.div
              key="response-box"
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full p-6 sm:p-8 rounded-3xl bg-[#FAF7F2] border-2 border-champagne/50 shadow-2xl text-midnight text-center"
            >
              <div className="w-12 h-12 rounded-full bg-rose-muted/15 text-rose-deep mx-auto flex items-center justify-center mb-3">
                <Sparkles className="w-6 h-6 text-champagne-dark" />
              </div>

              <h4 className="font-serif text-2xl sm:text-3xl text-rosewood-dark font-medium mb-3">
                {revealedTitle}
              </h4>

              <div className="w-12 h-px bg-champagne mx-auto my-3" />

              <p className="font-handwriting text-xl sm:text-2xl text-midnight leading-relaxed">
                "{revealedMessage}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

