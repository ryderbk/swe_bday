import React, { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { MemoryPhoto } from '../../data/birthdayContent';
import { IconButton } from '../ui/IconButton';

interface LightboxProps {
  photos: MemoryPhoto[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}) => {
  const currentPhoto = photos[currentIndex];
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    } else {
      onNavigate(photos.length - 1); // Loop around
    }
  }, [currentIndex, photos.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex < photos.length - 1) {
      onNavigate(currentIndex + 1);
    } else {
      onNavigate(0); // Loop around
    }
  }, [currentIndex, photos.length, onNavigate]);

  // Lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartXRef.current;
    const diffY = e.changedTouches[0].clientY - touchStartYRef.current;

    // Ensure horizontal swipe is dominant
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 45) {
      if (diffX > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  if (!isOpen || !currentPhoto) return null;

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Photo Lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-midnight/95 backdrop-blur-xl p-4 sm:p-6"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top Controls */}
        <div className="absolute top-4 right-4 z-50">
          <IconButton
            aria-label="Close photo view"
            variant="glass"
            size="md"
            onClick={onClose}
          >
            <X className="w-5 h-5 text-ivory" />
          </IconButton>
        </div>

        {/* Counter indicator */}
        <div className="absolute top-5 left-6 text-xs text-ivory-dark/70 font-mono tracking-wider">
          {currentIndex + 1} / {photos.length}
        </div>

        {/* Previous Button */}
        {photos.length > 1 && (
          <div className="absolute left-3 sm:left-6 z-40">
            <IconButton
              aria-label="Previous photo"
              variant="glass"
              size="lg"
              onClick={handlePrev}
            >
              <ChevronLeft className="w-6 h-6 text-ivory" />
            </IconButton>
          </div>
        )}

        {/* Next Button */}
        {photos.length > 1 && (
          <div className="absolute right-3 sm:right-6 z-40">
            <IconButton
              aria-label="Next photo"
              variant="glass"
              size="lg"
              onClick={handleNext}
            >
              <ChevronRight className="w-6 h-6 text-ivory" />
            </IconButton>
          </div>
        )}

        {/* Photo Container */}
        <div className="relative max-w-2xl w-full max-h-[85vh] flex flex-col items-center justify-center p-2">
          <motion.div
            key={currentPhoto.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative bg-[#FAF7F2] p-3 sm:p-5 pb-6 sm:pb-8 rounded-sm shadow-2xl max-w-full text-center"
          >
            {/* Image */}
            <div className="relative max-h-[60vh] overflow-hidden rounded-xs bg-midnight/5">
              <img
                src={currentPhoto.image}
                alt={currentPhoto.title || currentPhoto.caption}
                className="max-h-[60vh] w-auto max-w-full object-contain mx-auto"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            {/* Caption */}
            <div className="mt-4 px-2">
              {currentPhoto.title && (
                <h4 className="font-serif text-xl sm:text-2xl text-midnight font-normal mb-1">
                  {currentPhoto.title}
                </h4>
              )}
              <p className="font-handwriting text-xl sm:text-2xl text-rosewood-dark">
                {currentPhoto.caption}
              </p>
              {currentPhoto.date && (
                <span className="inline-flex items-center gap-1 font-mono text-xs text-rosewood/70 mt-2">
                  <Calendar className="w-3 h-3" />
                  {currentPhoto.date}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

