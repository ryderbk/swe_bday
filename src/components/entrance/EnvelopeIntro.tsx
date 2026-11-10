import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { BackgroundDust } from '../ui/BackgroundDust';
import { Button } from '../ui/Button';

interface EnvelopeIntroProps {
  onOpen: () => void;
  recipientName: string;
  senderName: string;
  eyebrow: string;
  title: string;
  subtext: string;
  buttonLabel: string;
}

export const EnvelopeIntro: React.FC<EnvelopeIntroProps> = ({
  onOpen,
  recipientName,
  senderName,
  eyebrow,
  title,
  subtext,
  buttonLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    // Smooth delay to allow envelope animation and warm light bloom
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOpen();
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 bg-midnight text-ivory overflow-hidden select-none">
      <BackgroundDust count={36} />

      {/* Subtle radial ambient light */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-champagne/5 blur-[120px] pointer-events-none" />

      {/* Content wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center text-center max-w-lg w-full"
      >
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-champagne" />
          <span className="font-handwriting text-xl sm:text-2xl text-champagne tracking-wide">
            {eyebrow}
          </span>
          <Sparkles className="w-4 h-4 text-champagne" />
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-ivory tracking-tight leading-snug mb-3">
          {title}
        </h1>

        <p className="font-sans text-xs sm:text-sm text-ivory-dark/70 max-w-sm mb-8">
          {subtext}
        </p>

        {/* Interactive Envelope Container */}
        <div
          role="button"
          tabIndex={0}
          aria-label={`Open envelope for ${recipientName}`}
          onClick={handleOpen}
          onKeyDown={handleKeyDown}
          className="relative group cursor-pointer focus:outline-none focus:ring-4 focus:ring-champagne/40 rounded-2xl p-2 transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          {/* Ambient Glow */}
          <div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-champagne/20 via-rose-muted/20 to-champagne/20 blur-xl transition-opacity duration-700 ${
              isOpen ? 'opacity-100 scale-125' : 'opacity-40 group-hover:opacity-75'
            }`}
          />

          {/* Envelope Body */}
          <div className="relative w-72 sm:w-80 h-48 sm:h-52 bg-[#2a2431] rounded-xl border border-champagne/30 shadow-2xl overflow-visible flex items-center justify-center">
            {/* Inner letter peek */}
            <motion.div
              animate={{
                y: isOpen ? -65 : 0,
                opacity: isOpen ? 1 : 0.6,
                scale: isOpen ? 1.05 : 0.95,
              }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="absolute w-[88%] h-[80%] bg-[#faf7f2] rounded-lg shadow-md border border-champagne/20 p-4 flex flex-col items-center justify-center text-midnight pointer-events-none"
            >
              <span className="font-handwriting text-rose-muted text-xl">For My Dearest</span>
              <span className="font-serif text-2xl font-medium tracking-wide text-rosewood-dark">
                {recipientName}
              </span>
              <div className="w-12 h-px bg-champagne my-1.5" />
              <span className="font-sans text-[10px] tracking-widest uppercase text-rosewood/70">
                From Bharath 🤍
              </span>
            </motion.div>

            {/* Fold Flaps (SVG Geometry) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 320 208"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Bottom fold */}
              <path
                d="M0 208 L160 115 L320 208 Z"
                fill="#241e2b"
                stroke="rgba(217, 184, 135, 0.25)"
                strokeWidth="1"
              />
              {/* Left fold */}
              <path
                d="M0 0 L160 115 L0 208 Z"
                fill="#1f1a25"
                stroke="rgba(217, 184, 135, 0.2)"
                strokeWidth="1"
              />
              {/* Right fold */}
              <path
                d="M320 0 L160 115 L320 208 Z"
                fill="#201a26"
                stroke="rgba(217, 184, 135, 0.2)"
                strokeWidth="1"
              />
            </svg>

            {/* Top Flap (Animated opening upward) */}
            <motion.div
              animate={{
                rotateX: isOpen ? -180 : 0,
                transformOrigin: 'top center',
              }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none preserve-3d"
              style={{ perspective: 1000 }}
            >
              <svg
                className="w-full h-full drop-shadow-md"
                viewBox="0 0 320 104"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 0 L160 104 L320 0 Z"
                  fill="#332c3c"
                  stroke="rgba(217, 184, 135, 0.35)"
                  strokeWidth="1"
                />
              </svg>
            </motion.div>

            {/* Wax Seal in Centre */}
            <motion.div
              animate={{
                scale: isOpen ? 0.3 : 1,
                opacity: isOpen ? 0 : 1,
              }}
              transition={{ duration: 0.4 }}
              className="absolute z-20 w-14 h-14 rounded-full bg-gradient-to-br from-rose-deep via-rose-muted to-rosewood border-2 border-champagne/60 shadow-lg flex items-center justify-center text-champagne cursor-pointer"
            >
              <Heart className="w-6 h-6 fill-champagne/80 text-champagne" />
              <div className="absolute inset-0 rounded-full border border-white/20 animate-pulse-glow" />
            </motion.div>

            {/* Warm light bloom when opened */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: isOpen ? 1 : 0,
                scale: isOpen ? 1.6 : 0.5,
              }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-radial-light rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(234, 213, 181, 0.6) 0%, transparent 70%)',
              }}
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8">
          <Button
            variant="gold"
            size="lg"
            onClick={handleOpen}
            icon={<Sparkles className="w-5 h-5 text-midnight" />}
          >
            {buttonLabel}
          </Button>
        </div>

        <p className="mt-6 font-handwriting text-lg text-champagne/70">
          To {recipientName} · From {senderName}
        </p>
      </motion.div>
    </div>
  );
};

