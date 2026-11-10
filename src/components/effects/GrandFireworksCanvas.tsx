import React, { useEffect, useRef } from 'react';

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

interface GrandFireworksCanvasProps {
  active: boolean;
  onFinish?: () => void;
  durationMs?: number;
}

const PALETTE = ['#D9B887', '#A96E78', '#FAF7F2', '#EAD5B5', '#FFD1DC', '#F5F0E8', '#FFB703'];

export const GrandFireworksCanvas: React.FC<GrandFireworksCanvasProps> = ({
  active,
  onFinish,
  durationMs = 4500,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;

    // Check reduced motion
    const prefersReducedMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      const timer = setTimeout(() => {
        onFinish?.();
      }, 500);
      return () => clearTimeout(timer);
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
    const startTime = Date.now();
    let lastLaunch = 0;

    const createExplosion = (x: number, y: number, color: string) => {
      const count = width < 640 ? 35 : 65;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 1.5;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color,
          size: Math.random() * 2.5 + 1.5,
          decay: Math.random() * 0.02 + 0.015,
        });
      }
    };

    const loop = () => {
      const elapsed = Date.now() - startTime;
      ctx.clearRect(0, 0, width, height);

      // Launch rockets periodically during the first part of the duration
      if (elapsed < durationMs - 1200 && elapsed - lastLaunch > 400) {
        lastLaunch = elapsed;
        const startX = width * 0.2 + Math.random() * width * 0.6;
        const targetY = height * 0.18 + Math.random() * height * 0.35;
        const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
        rockets.push({
          x: startX,
          y: height,
          targetY,
          vx: (Math.random() - 0.5) * 2,
          vy: -11 - Math.random() * 4,
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
        p.vy += 0.08; // gravity
        p.vx *= 0.98; // drag
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

      if (elapsed >= durationMs && rockets.length === 0 && particles.length === 0) {
        onFinish?.();
        return;
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [active, durationMs, onFinish]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-50 select-none"
    />
  );
};

