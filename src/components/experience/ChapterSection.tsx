import React from 'react';

interface ChapterSectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export const ChapterSection: React.FC<ChapterSectionProps> = ({
  id,
  children,
  className = '',
}) => {
  return (
    <section id={id} className={`relative w-full ${className}`}>
      {children}
    </section>
  );
};
