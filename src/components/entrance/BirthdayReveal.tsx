import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowDown } from 'lucide-react';
import { BackgroundDust } from '../ui/BackgroundDust';
import { Button } from '../ui/Button';

interface BirthdayRevealProps {
  recipientName: string;
  senderName: string;
  title: string;
  subtitle: string;
  message: string;
  buttonLabel: string;
  teddyImage?: string;
  onContinue: () => void;
}

export const BirthdayReveal: React.FC<BirthdayRevealProps> = ({
  title,
  subtitle,
  message,
  buttonLabel,
  teddyImage,
  onContinue,
}) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 bg-midnight text-ivory overflow-hidden">
      <BackgroundDust count={36} />

      {/* Atmospheric lighting */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-rose-muted/15 blur-[150px] pointer-events-none" />
      <div className="absolute -top-32 right-1/4 w-[400px] h-[400px] rounded-full bg-champagne/15 blur-[130px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative z-10 max-w-xl w-full text-center flex flex-col items-center"
      >
        {/* Eyebrow Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-champagne/30 bg-midnight-surface/60 backdrop-blur-md mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-champagne" />
          <span className="font-handwriting text-lg text-champagne tracking-wide">
            {subtitle}
          </span>
          <Sparkles className="w-3.5 h-3.5 text-champagne" />
        </motion.div>

        {/* Bunny + Bear Birthday Artwork */}
        {teddyImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.9, ease: 'easeOut' }}
            className="relative my-2 w-52 sm:w-64 aspect-square flex items-center justify-center"
          >
            <div className="absolute inset-0 rounded-full bg-champagne/15 blur-2xl pointer-events-none" />
            <img
              src={teddyImage}
              alt="Cute bunny and bear celebrating birthday"
              className="w-full h-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)] animate-float-subtle"
            />
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-ivory leading-tight mb-3"
        >
          {title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 80 }}
          transition={{ delay: 0.65, duration: 0.8 }}
          className="h-px bg-gradient-to-r from-transparent via-champagne to-transparent mb-5"
        />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.8 }}
          className="font-sans text-sm sm:text-base text-ivory-dark/90 leading-relaxed font-light max-w-lg mb-8"
        >
          {message}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Button
            variant="gold"
            size="lg"
            onClick={onContinue}
            icon={<ArrowDown className="w-4 h-4 text-midnight animate-bounce" />}
            iconPosition="right"
          >
            {buttonLabel}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};
