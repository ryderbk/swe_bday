import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Heart as HeartIcon } from 'lucide-react';
import { MemoryPhoto } from '../../data/birthdayContent';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { PolaroidCard } from './PolaroidCard';
import { Lightbox } from './Lightbox';

interface MemoryGalleryProps {
  memories: MemoryPhoto[];
  defaultPhotoCount?: number;
  expandedTitle?: string;
  expandedSubtitle?: string;
  viewAllLabel?: string;
  showLessLabel?: string;
}

// 12 relative coordinate positions forming a balanced, mathematically centred heart arrangement
const HEART_OFFSETS_12 = [
  // Top left lobe
  { x: -24, y: -28, r: -4 },
  { x: -12, y: -38, r: 2 },
  // Center top dip
  { x: 0, y: -24, r: 0 },
  // Top right lobe
  { x: 12, y: -38, r: -2 },
  { x: 24, y: -28, r: 4 },
  // Descending sides
  { x: -34, y: -8, r: -6 },
  { x: 34, y: -8, r: 6 },
  { x: -24, y: 12, r: 3 },
  { x: 24, y: 12, r: -3 },
  // Lower tapering point
  { x: -13, y: 28, r: -4 },
  { x: 13, y: 28, r: 4 },
  // Bottom tip
  { x: 0, y: 38, r: 1 },
];

export const MemoryGallery: React.FC<MemoryGalleryProps> = ({
  memories,
  defaultPhotoCount = 4,
  expandedTitle = 'My Favourite Memories',
  expandedSubtitle = 'Arranged in a heart — twelve little glimpses of our happiest days together.',
  viewAllLabel = 'View All Memories In A Heart 🤍',
  showLessLabel = 'Show Default Scrapbook ↑',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const hasPhotos = memories && memories.length > 0;
  const canExpand = memories && memories.length > defaultPhotoCount;

  return (
    <div className="relative py-20 px-4 sm:px-6 max-w-6xl mx-auto w-full">
      <SectionHeading
        eyebrow={isExpanded ? 'All Our Memories' : 'Scrapbook of Us'}
        title={isExpanded ? expandedTitle : 'Our Little Scrapbook'}
        subtitle={
          isExpanded
            ? expandedSubtitle
            : 'Polaroids of moments frozen in time, laughter shared, and memories kept safe.'
        }
        theme="dark"
      />

      {!hasPhotos ? (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="p-10 rounded-2xl bg-midnight-surface/50 border border-champagne/20 text-center max-w-md mx-auto"
        >
          <div className="w-14 h-14 rounded-full bg-champagne/10 text-champagne mx-auto flex items-center justify-center mb-4">
            <Camera className="w-7 h-7" />
          </div>
          <h3 className="font-serif text-xl text-ivory mb-2">Memories will go here</h3>
          <p className="font-sans text-xs sm:text-sm text-ivory-dark/70 leading-relaxed">
            Photographs are loaded from <code className="text-champagne font-mono">public/images/gallery/</code>.
          </p>
        </motion.div>
      ) : (
        <div className="flex flex-col items-center w-full">
          <AnimatePresence mode="wait">
            {!isExpanded ? (
              /* DEFAULT 4-POLAROID GRID */
              <motion.div
                key="default-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 pt-4 w-full"
              >
                {memories.slice(0, defaultPhotoCount).map((photo, idx) => (
                  <motion.div
                    key={photo.id}
                    layoutId={`photo-${photo.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                  >
                    <PolaroidCard
                      photo={photo}
                      index={idx}
                      onClick={() => setSelectedIdx(idx)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              /* EXPANDED HEART COLLAGE */
              <motion.div
                key="heart-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center w-full"
              >
                {/* Heart Layout Container with generous height to clear the tip */}
                <div className="relative w-full max-w-3xl sm:max-w-4xl h-[720px] sm:h-[800px] md:h-[860px] flex items-center justify-center my-4 overflow-visible">
                  {memories.slice(0, 12).map((photo, idx) => {
                    const offset = HEART_OFFSETS_12[idx % HEART_OFFSETS_12.length];
                    const isHovered = hoveredId === photo.id;

                    return (
                      <motion.div
                        key={photo.id}
                        layoutId={`photo-${photo.id}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                          opacity: 1,
                          scale: isHovered ? 1.15 : 1,
                          zIndex: isHovered ? 60 : 10 + idx,
                          rotate: isHovered ? 0 : offset.r,
                        }}
                        transition={{ duration: 0.3 }}
                        onHoverStart={() => setHoveredId(photo.id)}
                        onHoverEnd={() => setHoveredId(null)}
                        style={{
                          position: 'absolute',
                          left: `calc(50% + ${offset.x}%)`,
                          top: `calc(50% + ${offset.y}%)`,
                          transform: 'translate(-50%, -50%)',
                          width: 'clamp(100px, 17vw, 180px)',
                        }}
                        className="cursor-pointer select-none"
                      >
                        <PolaroidCard
                          photo={photo}
                          index={idx}
                          onClick={() => setSelectedIdx(idx)}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle View Button in its own normal document flow container below */}
          {canExpand && (
            <div className="mt-8 sm:mt-10 flex justify-center w-full z-20">
              <Button
                variant={isExpanded ? 'secondary' : 'gold'}
                size="md"
                onClick={() => setIsExpanded((prev) => !prev)}
                icon={<HeartIcon className="w-4 h-4 text-rose-muted fill-rose-muted" />}
              >
                {isExpanded ? showLessLabel : viewAllLabel}
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {hasPhotos && selectedIdx !== null && (
        <Lightbox
          photos={memories}
          currentIndex={selectedIdx}
          isOpen={selectedIdx !== null}
          onClose={() => setSelectedIdx(null)}
          onNavigate={(newIdx) => setSelectedIdx(newIdx)}
        />
      )}
    </div>
  );
};
