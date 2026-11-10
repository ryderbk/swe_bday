import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';

interface FallingPetalsProps {
  count?: number;
}

export const FallingPetals: React.FC<FallingPetalsProps> = ({ count = 14 }) => {
  const petals = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: (i * 7) % 95 + 2,
      delay: (i * 0.45) % 4,
      duration: 6 + (i % 5),
      size: 18 + (i % 4) * 5,
      rotation: (i * 35) % 360,
      imageSrc: i % 2 === 0 ? '/images/surprise/petals/petal1.webp' : '/images/surprise/petals/petal2.webp',
    }));
  }, [count]);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
    >
      {petals.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -40, opacity: 0, rotate: p.rotation }}
          animate={{
            y: ['0vh', '110vh'],
            x: ['0px', `${(p.id % 2 === 0 ? 1 : -1) * 35}px`, '0px'],
            opacity: [0, 0.85, 0.85, 0],
            rotate: [p.rotation, p.rotation + 180],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
        >
          <img
            src={p.imageSrc}
            alt=""
            className="w-full h-full object-contain drop-shadow-xs"
          />
        </motion.div>
      ))}
    </div>
  );
};

interface BouquetSceneProps {
  title: string;
  subtitle: string;
  supportingMessage: string;
  imageSrc: string;
  leftDecorationSrc?: string;
  rightDecorationSrc?: string;
  petalsEnabled?: boolean;
}

export const BouquetScene: React.FC<BouquetSceneProps> = ({
  title,
  subtitle,
  supportingMessage,
  imageSrc,
  leftDecorationSrc,
  rightDecorationSrc,
  petalsEnabled = true,
}) => {
  return (
    <div className="relative py-16 px-4 sm:px-6 max-w-4xl mx-auto w-full flex flex-col items-center text-center overflow-hidden">
      {petalsEnabled && <FallingPetals count={16} />}

      <SectionHeading
        eyebrow="Special Delivery"
        title={title}
        subtitle={subtitle}
        theme="dark"
      />

      {/* Main Rose Bouquet Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative my-4 z-10 w-64 sm:w-80 aspect-square flex items-center justify-center"
      >
        <div className="absolute inset-0 rounded-full bg-rose-muted/20 blur-3xl pointer-events-none" />
        <img
          src={imageSrc}
          alt="A romantic red rose bouquet"
          className="w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] animate-float-subtle"
        />
      </motion.div>

      {/* Supporting Romantic Message */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="font-handwriting text-2xl sm:text-3xl text-champagne max-w-lg mt-3 z-10"
      >
        "{supportingMessage}"
      </motion.p>

      {/* Couple Silhouette Illustrations flanking the bottom corners */}
      <div className="w-full flex items-center justify-between mt-6 px-4 pointer-events-none select-none z-10">
        {leftDecorationSrc && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 0.75, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-24 sm:w-36 aspect-square"
          >
            <img
              src={leftDecorationSrc}
              alt=""
              className="w-full h-full object-contain drop-shadow-md"
            />
          </motion.div>
        )}

        {rightDecorationSrc && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 0.75, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-24 sm:w-36 aspect-square"
          >
            <img
              src={rightDecorationSrc}
              alt=""
              className="w-full h-full object-contain drop-shadow-md"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

