import React, { useMemo } from 'react';

interface BackgroundDustProps {
  count?: number;
}

export const BackgroundDust: React.FC<BackgroundDustProps> = ({ count = 28 }) => {
  const stars = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: (i * 37) % 98 + 1,
      y: (i * 53) % 96 + 2,
      size: (i % 3) + 1.2,
      delay: (i % 7) * 0.6,
      duration: 3 + (i % 4),
      opacity: 0.15 + (i % 5) * 0.15,
    }));
  }, [count]);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
    >
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-champagne-light animate-twinkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            opacity: s.opacity,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-radial-vignette opacity-40" />
    </div>
  );
};

