import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
  decay: number;
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  vx: number;
  vy: number;
  color: string;
}

interface GrandBirthdayBlastProps {
  active: boolean;
}

const PALETTE = ['#D9B887', '#A96E78', '#FAF7F2', '#EAD5B5', '#FFD1DC', '#F5F0E8', '#FFB703', '#E0A96D'];

export const GrandBirthdayBlast: React.FC<GrandBirthdayBlastProps> = ({ active }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [showPeakText, setShowPeakText] = useState(false);

  useEffect(() => {
    if (!active) return;

    // Show peak text after 1.5s
    const textTimer = setTimeout(() => {
      setShowPeakText(true);
    }, 1500);

    const prefersReducedMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return () => clearTimeout(textTimer);
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const rockets: Rocket[] = [];
    const particles: Particle[] = [];
    let animId: number;
    let lastLaunch = 0;

    const createExplosion = (x: number, y: number, color: string) => {
      const count = width < 640 ? 45 : 80;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 7 + 2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color,
          size: Math.random() * 2.5 + 1.5,
          decay: Math.random() * 0.015 + 0.01,
        });
      }
    };

    const loop = (timestamp: number) => {
      ctx.clearRect(0, 0, width, height);

      // Periodically launch rockets
      if (timestamp - lastLaunch > 450) {
        lastLaunch = timestamp;
        const startX = width * 0.15 + Math.random() * width * 0.7;
        const targetY = height * 0.15 + Math.random() * height * 0.4;
        const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
        rockets.push({
          x: startX,
          y: height,
          targetY,
          vx: (Math.random() - 0.5) * 2.5,
          vy: -12 - Math.random() * 4,
          color,
        });
      }

      // Update rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.x += r.vx;
        r.y += r.vy;

        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = r.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = r.color;
        ctx.fill();

        if (r.y <= r.targetY || r.vy >= 0) {
          createExplosion(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      // Update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.07;
        p.vx *= 0.985;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      clearTimeout(textTimer);
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center select-none overflow-hidden">
      {/* Dark overlay backdrop with subtle burgundy glow */}
      <div className="absolute inset-0 bg-midnight/80 backdrop-blur-xs transition-opacity duration-1000" />
      <div className="absolute inset-0 bg-gradient-radial from-rose-deep/20 via-transparent to-transparent pointer-events-none" />

      {/* Fireworks Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Grand Birthday Message Typography */}
      <div className="relative z-10 text-center px-4 max-w-3xl flex flex-col items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-ivory tracking-wide drop-shadow-[0_0_30px_rgba(217,184,135,0.6)] leading-tight"
        >
          HAPPY BIRTHDAY
        </motion.h1>

        <AnimatePresence>
          {showPeakText && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="mt-6 flex flex-col items-center"
            >
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-champagne to-transparent mb-5" />
              <p className="font-handwriting text-3xl sm:text-5xl md:text-6xl text-champagne drop-shadow-[0_0_25px_rgba(217,184,135,0.8)]">
                I Love You Infinity🤍
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

