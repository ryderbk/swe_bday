import React from 'react';

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  theme?: 'dark' | 'light';
  alignment?: 'center' | 'left';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  theme = 'dark',
  alignment = 'center',
  className = '',
}) => {
  const isDark = theme === 'dark';
  const alignClass = alignment === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <div className={`flex flex-col mb-10 max-w-2xl mx-auto px-4 ${alignClass} ${className}`}>
      {eyebrow && (
        <span
          className={`font-handwriting text-xl md:text-2xl mb-2 tracking-wide ${
            isDark ? 'text-champagne' : 'text-rose-muted'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-tight ${
          isDark ? 'text-ivory' : 'text-midnight'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 text-sm sm:text-base leading-relaxed ${
            isDark ? 'text-ivory-dark/80 font-light' : 'text-rosewood/85'
          }`}
        >
          {subtitle}
        </p>
      )}
      <div className="flex items-center gap-2 mt-4">
        <span className={`h-px w-8 ${isDark ? 'bg-champagne/30' : 'bg-rose-muted/30'}`} />
        <span className={`text-xs ${isDark ? 'text-champagne/70' : 'text-rose-muted'}`}>✦</span>
        <span className={`h-px w-8 ${isDark ? 'bg-champagne/30' : 'bg-rose-muted/30'}`} />
      </div>
    </div>
  );
};

