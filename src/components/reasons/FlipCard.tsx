import React, { useState } from 'react';
import { Sparkles, Heart, RotateCw } from 'lucide-react';
import { LoveReason } from '../../data/birthdayContent';

interface FlipCardProps {
  reason: LoveReason;
}

export const FlipCard: React.FC<FlipCardProps> = ({ reason }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleToggle = () => {
    setIsFlipped((prev) => !prev);
  };

  const handlePointerClick = () => {
    // Hover is the desktop interaction; taps toggle the card on touch-first devices.
    const touchFirst = typeof window !== 'undefined' &&
      window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (touchFirst) handleToggle();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Reason ${reason.number}: ${reason.title}. Hover to reveal, or use Enter to flip.`}
      aria-pressed={isFlipped}
      onClick={handlePointerClick}
      onKeyDown={handleKeyDown}
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') setIsFlipped(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === 'mouse') setIsFlipped(false);
      }}
      className="perspective-1000 group w-full h-56 sm:h-64 cursor-pointer focus:outline-none focus:ring-2 focus:ring-champagne focus:ring-offset-2 focus:ring-offset-midnight rounded-2xl select-none"
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 preserve-3d rounded-2xl ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* FRONT OF CARD */}
        <div className="absolute inset-0 backface-hidden rounded-2xl bg-gradient-to-br from-[#231F2A] to-[#1a1720] border border-champagne/25 p-6 flex flex-col justify-between shadow-lg group-hover:border-champagne/50 transition-colors">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-semibold text-champagne bg-champagne/10 px-2.5 py-1 rounded-full border border-champagne/20">
              #{String(reason.number).padStart(2, '0')}
            </span>
            <Sparkles className="w-4 h-4 text-champagne/60 group-hover:text-champagne transition-colors" />
          </div>

          <div className="my-auto text-center">
            <h3 className="font-serif text-2xl sm:text-3xl text-ivory font-light tracking-wide group-hover:text-champagne-light transition-colors">
              {reason.title}
            </h3>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-ivory-dark/60 font-sans tracking-wider uppercase">
            <RotateCw className="w-3 h-3 text-champagne/70" />
            <span className="hidden sm:inline">Hover to reveal</span>
            <span className="sm:hidden">Tap to reveal</span>
          </div>
        </div>

        {/* BACK OF CARD */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl bg-gradient-to-br from-[#FAF7F2] to-[#F2EBE0] border border-rose-muted/40 p-6 flex flex-col justify-between shadow-xl text-midnight">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-semibold text-rose-deep bg-rose-muted/15 px-2.5 py-1 rounded-full">
              #{String(reason.number).padStart(2, '0')}
            </span>
            <Heart className="w-4 h-4 text-rose-muted fill-rose-muted" />
          </div>

          <div className="my-auto text-center px-1">
            <p className="font-handwriting text-xl sm:text-2xl text-rosewood-dark leading-snug">
              "{reason.description}"
            </p>
          </div>

          <div className="flex items-center justify-center gap-1 text-[11px] text-rosewood/70 font-sans tracking-wider uppercase">
            <RotateCw className="w-3 h-3 text-rose-muted" />
            <span className="hidden sm:inline">Move away to flip back</span>
            <span className="sm:hidden">Tap to flip back</span>
          </div>
        </div>
      </div>
    </div>
  );
};
