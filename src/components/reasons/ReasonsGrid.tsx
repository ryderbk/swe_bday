import React from 'react';
import { motion } from 'framer-motion';
import { LoveReason, SpecialYouCard } from '../../data/birthdayContent';
import { SectionHeading } from '../ui/SectionHeading';
import { FlipCard } from './FlipCard';

interface ReasonsGridProps {
  reasons: LoveReason[];
  specialYouCard: SpecialYouCard;
}

export const ReasonsGrid: React.FC<ReasonsGridProps> = ({ reasons, specialYouCard }) => {
  if (!reasons || reasons.length === 0) return null;

  // Treat #11 YOU as a normal reason card: same dimensions, styling and interaction.
  const allReasons: LoveReason[] = [
    ...reasons,
    {
      id: specialYouCard.id,
      number: specialYouCard.number ?? 11,
      title: specialYouCard.title,
      description: specialYouCard.description,
    },
  ].sort((a, b) => a.number - b.number);

  return (
    <div className="relative py-20 px-4 sm:px-6 max-w-6xl mx-auto w-full">
      <SectionHeading
        eyebrow="My Favorite Things"
        title="Little Things I Notice About You"
        subtitle="Eleven little things that make you who you are."
        theme="dark"
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pt-4">
        {allReasons.map((reason, idx) => (
          <motion.div
            key={reason.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5, delay: Math.min(idx * 0.04, 0.32) }}
            className="min-w-0"
          >
            <FlipCard reason={reason} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
