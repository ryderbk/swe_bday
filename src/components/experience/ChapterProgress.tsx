import React, { useState, useEffect } from 'react';
import { Compass, Menu, X, RotateCcw } from 'lucide-react';

export interface ChapterItem {
  id: string;
  title: string;
  shortName: string;
}

interface ChapterProgressProps {
  chapters: ChapterItem[];
  onReplay: () => void;
}

export const ChapterProgress: React.FC<ChapterProgressProps> = ({
  chapters,
  onReplay,
}) => {
  const [activeChapterId, setActiveChapterId] = useState<string>(chapters[0]?.id || '');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate overall page scroll progress
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }

      // Determine active chapter by section offset
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      for (let i = chapters.length - 1; i >= 0; i--) {
        const el = document.getElementById(chapters[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveChapterId(chapters[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [chapters]);

  const scrollToChapter = (id: string) => {
    setIsMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeChapter = chapters.find((c) => c.id === activeChapterId) || chapters[0];

  return (
    <>
      {/* Top Floating Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-40 h-1 bg-white/5 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-rose-muted via-champagne to-rose-muted transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Navigator Header */}
      <div className="fixed top-3 left-4 sm:left-6 z-40 select-none">
        <div className="flex items-center gap-2 p-1.5 px-3 rounded-full bg-midnight-surface/85 border border-champagne/30 shadow-xl backdrop-blur-md">
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Open chapter navigation"
            aria-expanded={isMenuOpen}
            className="flex items-center gap-2 text-xs font-sans text-ivory hover:text-champagne transition-colors focus:outline-none"
          >
            <Compass className="w-3.5 h-3.5 text-champagne" />
            <span className="font-serif text-sm tracking-wide text-champagne-light">
              {activeChapter?.shortName || 'Chapters'}
            </span>
            {isMenuOpen ? (
              <X className="w-3 h-3 text-champagne/70" />
            ) : (
              <Menu className="w-3 h-3 text-champagne/70" />
            )}
          </button>
        </div>

        {/* Chapter Jump Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-12 left-0 w-64 p-3 rounded-2xl bg-midnight-surface/95 border border-champagne/30 shadow-2xl backdrop-blur-xl flex flex-col gap-1 z-50">
            <div className="px-2 py-1 text-[10px] font-sans uppercase tracking-widest text-champagne/80 border-b border-white/10 mb-1 flex items-center justify-between">
              <span>Chapters</span>
              <button
                type="button"
                onClick={onReplay}
                className="inline-flex items-center gap-1 text-[10px] text-rose-soft hover:text-white"
              >
                <RotateCcw className="w-2.5 h-2.5" />
                <span>Replay</span>
              </button>
            </div>

            {chapters.map((chapter, idx) => {
              const isActive = chapter.id === activeChapterId;
              return (
                <button
                  key={chapter.id}
                  type="button"
                  onClick={() => scrollToChapter(chapter.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-sans transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-champagne/15 text-champagne font-medium border border-champagne/30'
                      : 'text-ivory-dark/80 hover:bg-white/5 hover:text-ivory'
                  }`}
                >
                  <span className="truncate">
                    {idx + 1}. {chapter.title}
                  </span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-champagne" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
