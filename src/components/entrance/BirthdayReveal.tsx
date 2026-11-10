import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowDown, Heart } from 'lucide-react';
import { BackgroundDust } from '../ui/BackgroundDust';
import { Button } from '../ui/Button';

interface BirthdayRevealProps {
  recipientName: string;
  senderName: string;
  title: string;
  subtitle: string;
  message: string;
  buttonLabel: string;
  onContinue: () => void;
}

export const BirthdayReveal: React.FC<BirthdayRevealProps> = ({
  recipientName,
  senderName,
  title,
  subtitle,
  message,
  buttonLabel,
  onContinue,
}) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 bg-midnight text-ivory overflow-hidden">
      <BackgroundDust count={30} />

      {/* Atmospheric lighting */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-rose-muted/10 blur-[150px] pointer-events-none" />
      <div className="absolute -top-32 right-1/4 w-[400px] h-[400px] rounded-full bg-champagne/10 blur-[130px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 max-w-xl w-full text-center flex flex-col items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-champagne/30 bg-midnight-surface/60 backdrop-blur-md mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-champagne" />
          <span className="font-handwriting text-lg text-champagne tracking-wide">
            {subtitle}
          </span>
          <Sparkles className="w-3.5 h-3.5 text-champagne" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-ivory leading-tight mb-4"
        >
          {title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 80 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="h-px bg-gradient-to-r from-transparent via-champagne to-transparent mb-6"
        />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="font-sans text-base sm:text-lg text-ivory-dark/90 leading-relaxed font-light max-w-lg mb-8"
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-12 flex items-center gap-2 text-xs text-ivory-dark/50"
        >
          <span>Created with</span>
          <Heart className="w-3.5 h-3.5 text-rose-muted fill-rose-muted inline" />
          <span>by {senderName} for {recipientName}</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

