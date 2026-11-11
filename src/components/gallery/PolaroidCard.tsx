import React, { useState } from 'react';
import { MemoryPhoto } from '../../data/birthdayContent';
import { Camera } from 'lucide-react';

interface PolaroidCardProps {
  photo: MemoryPhoto;
  onClick: () => void;
  index: number;
}

export const PolaroidCard: React.FC<PolaroidCardProps> = ({ photo, onClick, index }) => {
  const [imgError, setImgError] = useState(false);
  const rotation = photo.rotation ?? (index % 2 === 0 ? -2 : 2.5);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`View memory photo`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      style={{ transform: `rotate(${rotation}deg)` }}
      className="group relative bg-[#FAF7F2] p-3 sm:p-4 pb-4 sm:pb-5 rounded-sm shadow-polaroid hover:shadow-polaroid-lg transition-all duration-300 hover:rotate-0 hover:scale-[1.03] cursor-pointer focus:outline-none focus:ring-2 focus:ring-champagne focus:ring-offset-2 focus:ring-offset-midnight"
    >
      {/* Decorative Washi Tape on Top */}
      <div
        aria-hidden="true"
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-5 bg-champagne/40 border-t border-b border-champagne/60 backdrop-blur-xs opacity-75 shadow-xs pointer-events-none -rotate-1"
      />

      {/* Photo Frame Container */}
      <div className="relative w-full aspect-square bg-midnight/10 rounded-xs overflow-hidden border border-black/5">
        {!imgError && photo.image ? (
          <img
            src={photo.image}
            alt="Memory photograph"
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-ivory-dark/40 text-rosewood/60 text-center">
            <Camera className="w-8 h-8 mb-2 stroke-1" />
            <span className="font-handwriting text-sm">Add your photo here</span>
          </div>
        )}
      </div>
    </div>
  );
};
