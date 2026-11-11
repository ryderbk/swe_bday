import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Wind, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioManager } from '../../lib/audio';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';

interface BirthdayCakeProps {
  cake: {
    enabled: boolean;
    title: string;
    message: string;
    blowButtonLabel: string;
    finalMessage: string;
  };
  recipientName?: string;
}

export const BirthdayCake: React.FC<BirthdayCakeProps> = ({ cake }) => {
  if (!cake.enabled) return null;

  const [isExtinguished, setIsExtinguished] = useState(false);

  const handleExtinguish = () => {
    if (isExtinguished) return;
    setIsExtinguished(true);

    audioManager.playSFX('fireworkBurst');

    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D9B887', '#A96E78', '#F5F0E8', '#FFD1DC', '#FAF7F2'],
        disableForReducedMotion: true,
      });
    } catch {
      // Fallback
    }
  };

  const handleRelight = () => {
    setIsExtinguished(false);
  };

  return (
    <div className="relative py-20 px-4 sm:px-6 max-w-xl mx-auto w-full text-center">
      <SectionHeading
        eyebrow="Make A Wish"
        title={cake.title}
        subtitle={cake.message}
        theme="dark"
      />

      {/* SVG Cake Container */}
      <div className="relative my-8 flex flex-col items-center justify-center">
        {/* Cake Illumination */}
        <div
          className={`absolute w-64 h-64 rounded-full transition-opacity duration-1000 blur-3xl pointer-events-none ${
            isExtinguished ? 'opacity-10 bg-champagne/10' : 'opacity-60 bg-champagne/25'
          }`}
        />

        {/* Handcrafted Coherent Two-Tier Connected Cake */}
        <div className="relative w-64 sm:w-72 h-64 select-none">
          <svg viewBox="0 0 300 270" className="w-full h-full drop-shadow-[0_12px_28px_rgba(0,0,0,0.55)]">
            {/* Cake Plate Stand */}
            <ellipse cx="150" cy="248" rx="125" ry="12" fill="#2c2432" stroke="#D9B887" strokeWidth="1.5" />
            <path d="M40 248 Q150 262 260 248" stroke="#D9B887" strokeWidth="2" fill="none" opacity="0.6" />

            {/* Bottom Tier Body (y: 165 to 240) */}
            <path
              d="M35 175 C35 162 265 162 265 175 L265 235 C265 248 35 248 35 235 Z"
              fill="#F2EBE0"
              stroke="#D9B887"
              strokeWidth="2"
            />
            {/* Bottom Tier Frosting Trim */}
            <path
              d="M35 175 Q55 190 75 175 Q95 192 115 175 Q135 190 155 175 Q175 192 195 175 Q215 190 235 175 Q250 192 265 175"
              fill="#A96E78"
            />
            {/* Bottom Tier Decorative Swirl */}
            <path
              d="M50 215 C80 225 110 210 140 220 C170 230 200 215 230 222 C245 225 255 218 255 218"
              stroke="#A96E78"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
            />

            {/* Top Tier Body (y: 105 to 175 - connects directly onto bottom tier with zero gap) */}
            <path
              d="M80 115 C80 102 220 102 220 115 L220 178 C220 188 80 188 80 178 Z"
              fill="#F9F6F0"
              stroke="#D9B887"
              strokeWidth="2"
            />
            {/* Top Tier Frosting Drips */}
            <path
              d="M80 120 Q95 136 110 120 Q125 138 140 120 Q155 136 170 120 Q185 138 200 120 Q210 136 220 120"
              fill="#A96E78"
            />

            {/* Candle 1 (Left) */}
            <rect x="105" y="70" width="8" height="40" rx="3" fill="#D9B887" />
            <line x1="109" y1="70" x2="109" y2="63" stroke="#55414C" strokeWidth="2" />

            {/* Candle 2 (Center) */}
            <rect x="146" y="60" width="8" height="50" rx="3" fill="#A96E78" />
            <line x1="150" y1="60" x2="150" y2="53" stroke="#55414C" strokeWidth="2" />

            {/* Candle 3 (Right) */}
            <rect x="187" y="70" width="8" height="40" rx="3" fill="#D9B887" />
            <line x1="191" y1="70" x2="191" y2="63" stroke="#55414C" strokeWidth="2" />

            {/* Flames or Smoke */}
            {!isExtinguished ? (
              <g className="animate-flame">
                <ellipse cx="109" cy="55" rx="5" ry="9" fill="#FFC845" filter="drop-shadow(0 0 6px #FFA500)" />
                <ellipse cx="109" cy="56" rx="2.5" ry="5" fill="#FFF7CC" />

                <ellipse cx="150" cy="44" rx="6" ry="11" fill="#FFC845" filter="drop-shadow(0 0 8px #FFA500)" />
                <ellipse cx="150" cy="45" rx="3" ry="6" fill="#FFF7CC" />

                <ellipse cx="191" cy="55" rx="5" ry="9" fill="#FFC845" filter="drop-shadow(0 0 6px #FFA500)" />
                <ellipse cx="191" cy="56" rx="2.5" ry="5" fill="#FFF7CC" />
              </g>
            ) : (
              <g className="animate-smoke">
                <path d="M109 60 Q106 50 112 40 Q116 32 110 25" stroke="rgba(245, 240, 232, 0.6)" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M150 50 Q154 40 148 30 Q144 22 152 14" stroke="rgba(245, 240, 232, 0.7)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M191 60 Q194 50 188 40 Q184 32 192 25" stroke="rgba(245, 240, 232, 0.6)" strokeWidth="2" fill="none" strokeLinecap="round" />
              </g>
            )}
          </svg>
        </div>

        {/* Action Controls - Button Only (No microphone) */}
        <div className="mt-6 flex flex-col items-center gap-3">
          {!isExtinguished ? (
            <Button
              variant="gold"
              size="lg"
              onClick={handleExtinguish}
              icon={<Wind className="w-5 h-5 text-midnight" />}
            >
              {cake.blowButtonLabel}
            </Button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <div className="p-6 rounded-2xl bg-midnight-surface/90 border border-champagne/30 shadow-xl max-w-md mb-4 text-center">
                <Sparkles className="w-6 h-6 text-champagne mx-auto mb-2" />
                <p className="font-serif text-2xl text-ivory mb-2 font-light">
                  Wish Made! ✨
                </p>
                <p className="font-handwriting text-xl sm:text-2xl text-champagne leading-snug">
                  "{cake.finalMessage}"
                </p>
              </div>

              <Button
                variant="secondary"
                size="sm"
                onClick={handleRelight}
                icon={<RotateCcw className="w-3.5 h-3.5" />}
              >
                Relight Candles
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
