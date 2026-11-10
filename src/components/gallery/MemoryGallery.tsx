import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { MemoryPhoto } from '../../data/birthdayContent';
import { SectionHeading } from '../ui/SectionHeading';
import { PolaroidCard } from './PolaroidCard';
import { Lightbox } from './Lightbox';

interface MemoryGalleryProps {
  memories: MemoryPhoto[];
}

export const MemoryGallery: React.FC<MemoryGalleryProps> = ({ memories }) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const hasPhotos = memories && memories.length > 0;

  return (
    <section id="memories" className="relative py-20 px-4 sm:px-6 max-w-6xl mx-auto w-full">
      <SectionHeading
        eyebrow="Scrapbook of Us"
        title="Our Little Scrapbook"
        subtitle="Polaroids of moments frozen in time, laughter shared, and memories kept safe."
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
            Drop your photographs into <code className="text-champagne font-mono">public/images/gallery/</code> and configure them in <code className="text-champagne font-mono">birthdayContent.ts</code> to display your Polaroid memories.
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-4">
          {memories.map((photo, idx) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <PolaroidCard
                photo={photo}
                index={idx}
                onClick={() => setSelectedIdx(idx)}
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {hasPhotos && selectedIdx !== null && (
        <Lightbox
          photos={memories}
          currentIndex={selectedIdx}
          isOpen={selectedIdx !== null}
          onClose={() => setSelectedIdx(null)}
          onNavigate={(newIdx) => setSelectedIdx(newIdx)}
        />
      )}
    </section>
  );
};
