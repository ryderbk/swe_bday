import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { ForeverReason } from '../../data/birthdayContent';
import { SectionHeading } from '../ui/SectionHeading';

interface ForeverReasonsProps {
  reasons: ForeverReason[];
  onComplete: () => void;
}

export const ForeverReasons: React.FC<ForeverReasonsProps> = ({ reasons, onComplete }) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const calledRef = useRef(false);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !calledRef.current) {
          calledRef.current = true;
          onComplete();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [onComplete]);

  return (
    <div className="relative py-20 px-4 sm:px-6 max-w-3xl mx-auto w-full">
      <SectionHeading
        eyebrow="Always & Forever"
        title="11 Reasons Why I Want You Forever🤍"
        subtitle="Every one of these is true. Every single one."
        theme="dark"
      />

      <div className="space-y-10 mt-4">
        {reasons.map((reason, idx) => {
          const isLast = idx === reasons.length - 1;

          return (
            <motion.div
              key={reason.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className={`relative rounded-2xl p-6 sm:p-8 border ${
                isLast
                  ? 'bg-gradient-to-br from-[#2a1a22] via-[#1e1428] to-[#1a0f1e] border-champagne/50 shadow-[0_0_40px_rgba(217,184,135,0.15)]'
                  : 'bg-midnight-surface/60 border-white/10'
              }`}
            >
              {isLast && (
                <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full bg-champagne/20 animate-pulse"
                      style={{
                        width: `${8 + i * 4}px`,
                        height: `${8 + i * 4}px`,
                        left: `${10 + i * 15}%`,
                        top: `${20 + (i % 3) * 25}%`,
                        animationDelay: `${i * 0.4}s`,
                        animationDuration: `${2 + i * 0.5}s`,
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Number */}
              <div
                className={`font-serif text-5xl sm:text-6xl font-light mb-3 leading-none ${
                  isLast ? 'text-champagne' : 'text-champagne/40'
                }`}
              >
                {String(reason.number).padStart(2, '0')}
              </div>

              {/* Title */}
              <h3
                className={`font-serif text-xl sm:text-2xl font-light mb-3 ${
                  isLast ? 'text-ivory' : 'text-champagne-light'
                }`}
              >
                {reason.title}
                {isLast && (
                  <Heart className="inline w-5 h-5 text-rose-muted fill-rose-muted ml-2 align-middle" />
                )}
              </h3>

              {/* Paragraph */}
              <p
                className={`font-handwriting text-lg sm:text-xl leading-relaxed ${
                  isLast ? 'text-champagne/90' : 'text-ivory-dark/80'
                }`}
              >
                {reason.paragraph}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Sentinel for onComplete trigger */}
      <div ref={sentinelRef} className="h-4 mt-8" aria-hidden="true" />
    </div>
  );
};

