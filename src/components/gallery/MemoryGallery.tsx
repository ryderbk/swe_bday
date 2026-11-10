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

// 13 relative coordinate positions forming a balanced heart arrangement
const HEART_OFFSETS = [
  // Top left lobe
  { x: -28, y: -26, r: -4 },
  { x: -14, y: -36, r: 2 },
  // Center dip
  { x: 0, y: -20, r: -1 },
  // Top right lobe
  { x: 14, y: -36, r: -2 },
  { x: 28, y: -26, r: 4 },
  // Descending sides
  { x: -38, y: -8, r: -6 },
  { x: -26, y: 10, r: 3 },
  { x: 26, y: 10, r: -3 },
  { x: 38, y: -8, r: 6 },
  // Lower tapering point
  { x: -14, y: 26, r: -4 },
  { x: 14, y: 26, r: 4 },
  { x: 0, y: 38, r: 1 },
  // Central heart jewel
  { x: 0, y: -2, r: 0 },
];

export const MemoryGallery: React.FC<MemoryGalleryProps> = ({
  memories,
  defaultPhotoCount = 4,
  expandedTitle = 'My Favourite Memories',
  expandedSubtitle = 'Arranged in a heart—thirteen little glimpses of our happiest days together.',
  viewAllLabel = 'View All Memories In A Heart ❤️',
  showLessLabel = 'Show Default Scrapbook ↑',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const hasPhotos = memories && memories.length > 0;
  const canExpand = memories && memories.length > defaultPhotoCount;

  // Primary photos for heart
  const heartPhotos = memories.slice(0, 13);
  const extraPhotos = memories.slice(13);

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
            Drop your photographs into <code className="text-champagne font-mono">public/images/gallery/</code> and configure them in <code className="text-champagne font-mono">birthdayContent.ts</code>.
          </p>
        </motion.div>
      ) : (
        <div>
          <AnimatePresence mode="wait">
            {!isExpanded ? (
              /* DEFAULT 4-POLAROID GRID */
              <motion.div
                key="default-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-4"
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
              /* EXPANDED PROJECT 6 HEART COLLAGE */
              <motion.div
                key="heart-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
              >
                {/* Desktop/Tablet Heart Layout Container */}
                <div className="relative w-full max-w-4xl h-[680px] sm:h-[760px] hidden sm:flex items-center justify-center my-6">
                  {heartPhotos.map((photo, idx) => {
                    const offset = HEART_OFFSETS[idx % HEART_OFFSETS.length];
                    return (
                      <motion.div
                        key={photo.id}
                        layoutId={`photo-${photo.id}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: idx * 0.04 }}
                        style={{
                          position: 'absolute',
                          left: `calc(50% + ${offset.x}%)`,
                          top: `calc(50% + ${offset.y}%)`,
                          transform: `translate(-50%, -50%) rotate(${offset.r}deg)`,
                          width: '180px',
                          zIndex: 10 + idx,
                        }}
                        className="hover:z-50 transition-all duration-300"
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

                {/* Mobile Responsive Grid for Heart Collection (neat staggered masonry) */}
                <div className="grid grid-cols-1 sm:hidden gap-6 w-full pt-4">
                  {heartPhotos.map((photo, idx) => (
                    <motion.div
                      key={photo.id}
                      layoutId={`photo-${photo.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                    >
                      <PolaroidCard
                        photo={photo}
                        index={idx}
                        onClick={() => setSelectedIdx(idx)}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Secondary row for extra photos beyond 13 */}
                {extraPhotos.length > 0 && (
                  <div className="w-full mt-10 pt-8 border-t border-champagne/20">
                    <h4 className="font-serif text-xl text-center text-ivory mb-6">
                      More Treasured Moments
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                      {extraPhotos.map((photo, idx) => (
                        <PolaroidCard
                          key={photo.id}
                          photo={photo}
                          index={idx + 13}
                          onClick={() => setSelectedIdx(idx + 13)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle View All Button */}
          {canExpand && (
            <div className="mt-12 flex justify-center">
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
