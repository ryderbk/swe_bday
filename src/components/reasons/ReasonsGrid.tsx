import React from 'react';
import { motion } from 'framer-motion';
import { LoveReason } from '../../data/birthdayContent';
import { SectionHeading } from '../ui/SectionHeading';
import { FlipCard } from './FlipCard';

interface ReasonsGridProps {
  reasons: LoveReason[];
}

export const ReasonsGrid: React.FC<ReasonsGridProps> = ({ reasons }) => {
  if (!reasons || reasons.length === 0) return null;

  return (
    <section id="reasons" className="relative py-20 px-4 sm:px-6 max-w-6xl mx-auto w-full">
      <SectionHeading
        eyebrow="My Favorite Things"
        title="A Few Little Things I Love About You"
        subtitle="Twelve little reminders of why you are completely and utterly irreplaceable."
        theme="dark"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 pt-4">
        {reasons.map((reason, idx) => (
          <motion.div
            key={reason.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5, delay: idx * 0.04 }}
          >
            <FlipCard reason={reason} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

