import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    // Smooth transition delay for envelope opening animation
    setTimeout(() => {
      onOpen();
    }, 1500);
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

      {/* Ambient background glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-champagne/5 blur-[120px] pointer-events-none" />

      {/* Content wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
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

        <p className="font-sans text-xs sm:text-sm text-ivory-dark/70 max-w-sm mb-12">
          {subtext}
        </p>

        {/* Dedicated Responsive Envelope Stage with ample headroom for the emerging letter */}
        <div
          role="button"
          tabIndex={0}
          aria-label={`Open envelope for ${recipientName}`}
          onClick={handleOpen}
          onKeyDown={handleKeyDown}
          className="relative group cursor-pointer focus:outline-none focus:ring-4 focus:ring-champagne/40 rounded-2xl p-2 transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] w-72 sm:w-80 h-56 flex items-end justify-center mb-6"
        >
          {/* Ambient Glow behind envelope */}
          <div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-champagne/20 via-rose-muted/20 to-champagne/20 blur-xl transition-opacity duration-700 pointer-events-none ${
              isOpen ? 'opacity-100 scale-125' : 'opacity-40 group-hover:opacity-75'
            }`}
          />

          {/* Envelope Body Container */}
          <div className="relative w-full h-48 sm:h-52 rounded-xl shadow-2xl flex items-center justify-center">
            {/* LAYER 1 (z-0): Back Interior of Envelope */}
            <div className="absolute inset-0 bg-[#251f2b] rounded-xl border border-champagne/30 overflow-hidden" />

            {/* LAYER 2 (z-10): The Letter Sheet - starts completely inside, slides upward smoothly */}
            <motion.div
              initial={false}
              animate={{
                y: isOpen ? -85 : 0,
                opacity: isOpen ? 1 : 0.85,
                scale: isOpen ? 1.04 : 0.96,
              }}
              transition={{ duration: 0.9, delay: isOpen ? 0.35 : 0, ease: 'easeOut' }}
              className="absolute z-10 w-[90%] h-[82%] bg-[#FAF7F2] rounded-lg shadow-lg border border-champagne/30 p-4 flex flex-col items-center justify-center text-midnight pointer-events-none"
            >
              <span className="font-handwriting text-rose-muted text-xl sm:text-2xl">
                For My Dearest
              </span>
              <span className="font-serif text-2xl sm:text-3xl font-medium tracking-wide text-rosewood-dark">
                {recipientName}
              </span>
              <div className="w-14 h-px bg-champagne my-2" />
              <span className="font-sans text-[11px] tracking-widest uppercase text-rosewood/75 font-semibold">
                From {senderName} 🤍
              </span>
            </motion.div>

            {/* LAYER 3 (z-20): Left & Right & Bottom Front Pockets (keeps lower half of letter tucked inside) */}
            <svg
              className="absolute inset-0 w-full h-full z-20 pointer-events-none"
              viewBox="0 0 320 208"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Bottom pocket flap */}
              <path
                d="M0 208 L160 115 L320 208 Z"
                fill="#2c2434"
                stroke="rgba(217, 184, 135, 0.3)"
                strokeWidth="1.2"
              />
              {/* Left fold */}
              <path
                d="M0 0 L160 115 L0 208 Z"
                fill="#221b29"
                stroke="rgba(217, 184, 135, 0.25)"
                strokeWidth="1"
              />
              {/* Right fold */}
              <path
                d="M320 0 L160 115 L320 208 Z"
                fill="#241d2b"
                stroke="rgba(217, 184, 135, 0.25)"
                strokeWidth="1"
              />
            </svg>

            {/* LAYER 4 (z-30 when closed, flips to back): Top Flap */}
            <motion.div
              animate={{
                rotateX: isOpen ? -180 : 0,
                zIndex: isOpen ? 0 : 30,
              }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none preserve-3d origin-top"
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
                  fill="#362d40"
                  stroke="rgba(217, 184, 135, 0.4)"
                  strokeWidth="1.5"
                />
              </svg>
            </motion.div>

            {/* LAYER 5 (z-40): Wax Seal (centered over closed flaps, fades on open) */}
            <AnimatePresence>
              {!isOpen && (
                <motion.div
                  initial={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.3, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="absolute z-40 w-14 h-14 rounded-full bg-gradient-to-br from-rose-deep via-rose-muted to-rosewood border-2 border-champagne/70 shadow-lg flex items-center justify-center text-champagne cursor-pointer"
                >
                  <Heart className="w-6 h-6 fill-champagne/80 text-champagne" />
                  <div className="absolute inset-0 rounded-full border border-white/20 animate-pulse-glow" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Warm light bloom when opened */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: isOpen ? 1 : 0,
                scale: isOpen ? 1.6 : 0.5,
              }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 z-15 bg-radial-light rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(234, 213, 181, 0.6) 0%, transparent 70%)',
              }}
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-4">
          <Button
            variant="gold"
            size="lg"
            onClick={handleOpen}
            icon={<Sparkles className="w-5 h-5 text-midnight" />}
          >
            {buttonLabel}
          </Button>
        </div>

        <p className="mt-4 font-handwriting text-lg text-champagne/70">
          To {recipientName} · From {senderName}
        </p>
      </motion.div>
    </div>
  );
};
