import React from 'react';
import { ChevronDown } from 'lucide-react';

interface ChapterSectionProps {
  id: string;
  children: React.ReactNode;
  nextSectionId?: string;
  nextSectionLabel?: string;
  className?: string;
}

export const ChapterSection: React.FC<ChapterSectionProps> = ({
  id,
  children,
  nextSectionId,
  nextSectionLabel,
  className = '',
}) => {
  const handleScrollToNext = () => {
    if (!nextSectionId) return;
    const el = document.getElementById(nextSectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id={id} className={`relative w-full ${className}`}>
      {children}

      {nextSectionId && (
        <div className="flex justify-center pb-12 pt-4">
          <button
            type="button"
            onClick={handleScrollToNext}
            aria-label={`Scroll to ${nextSectionLabel || 'next chapter'}`}
            className="group flex flex-col items-center gap-1 text-xs text-champagne/70 hover:text-champagne transition-colors focus:outline-none focus:ring-2 focus:ring-champagne rounded-full p-2 cursor-pointer"
          >
            {nextSectionLabel && (
              <span className="font-sans text-[11px] tracking-wider uppercase opacity-80 group-hover:opacity-100">
                Continue to {nextSectionLabel}
              </span>
            )}
            <ChevronDown className="w-4 h-4 animate-bounce text-champagne group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      )}
    </section>
  );
};
