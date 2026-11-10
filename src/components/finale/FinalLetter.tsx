import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Share2, Sparkles, Check, BookOpen } from 'lucide-react';
import { ConstellationMemory } from '../../data/birthdayContent';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { MemoryConstellation } from './MemoryConstellation';

interface FinalLetterProps {
  letter: {
    title: string;
    paragraphs: string[];
    signature: string;
    footerAffection: string;
  };
  constellation: {
    title: string;
    subtitle: string;
    memories: ConstellationMemory[];
  };
  recipientName: string;
  senderName: string;
  onReplay: () => void;
}

export const FinalLetter: React.FC<FinalLetterProps> = ({
  letter,
  constellation,
  recipientName,
  senderName,
  onReplay,
}) => {
  const [showAllImmediately, setShowAllImmediately] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: 'A Little Universe for Saiswetha',
      text: 'A birthday story created with love, just for Saiswetha.',
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch {
        // Share dismissed
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (err) {
        console.warn('Clipboard write failed:', err);
      }
    }
  };

  return (
    <section id="finale" className="relative py-20 px-4 sm:px-6 max-w-4xl mx-auto w-full flex flex-col items-center">
      <SectionHeading
        eyebrow="From My Heart"
        title="Our Little Universe"
        subtitle="A quiet letter written under the same stars we share."
        theme="dark"
      />

      {/* Parchment Letter Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl bg-[#FAF7F2] rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl border border-champagne/40 text-midnight relative overflow-hidden"
      >
        {/* Decorative corner flourishes */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-rose-muted/40" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-rose-muted/40" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-rose-muted/40" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-rose-muted/40" />

        {/* Read whole letter instant button */}
        {!showAllImmediately && (
          <div className="flex justify-end mb-4">
            <button
              type="button"
              onClick={() => setShowAllImmediately(true)}
              className="inline-flex items-center gap-1.5 text-xs text-rosewood/70 hover:text-rose-deep font-sans transition-colors p-1"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Read whole letter at once</span>
            </button>
          </div>
        )}

        {/* Letter Salutation */}
        <h3 className="font-serif text-3xl sm:text-4xl text-rosewood-dark font-light mb-6">
          {letter.title}
        </h3>

        {/* Letter Paragraphs */}
        <div className="space-y-5 font-handwriting text-xl sm:text-2xl text-rosewood-dark leading-relaxed">
          {letter.paragraphs.map((paragraph, idx) => (
            <motion.p
              key={idx}
              initial={showAllImmediately ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: showAllImmediately ? 0 : idx * 0.35, duration: 0.6 }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* Handwritten Signature */}
        <div className="mt-10 pt-6 border-t border-rosewood/15 flex flex-col items-end">
          <div className="font-handwriting text-2xl sm:text-3xl text-rose-deep whitespace-pre-line text-right">
            {letter.signature}
          </div>
        </div>
      </motion.div>

      {/* Memory Constellation */}
      <MemoryConstellation
        title={constellation.title}
        subtitle={constellation.subtitle}
        memories={constellation.memories}
      />

      {/* Emotional Finale Card with exact requested copy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-12 text-center max-w-xl mx-auto px-4"
      >
        <div className="w-12 h-12 rounded-full bg-champagne/15 text-champagne mx-auto flex items-center justify-center mb-4">
          <Sparkles className="w-6 h-6" />
        </div>

        <h3 className="font-serif text-3xl sm:text-4xl text-ivory font-light mb-3">
          Happy Birthday, my {recipientName}.
        </h3>

        <p className="font-handwriting text-2xl sm:text-3xl text-champagne mb-2">
          Your Panda kutti. Your Chellam. My favourite person. 🤍
        </p>

        <p className="font-sans text-xs sm:text-sm text-ivory-dark/60 tracking-wider uppercase mt-4 mb-8">
          Made with love, by {senderName}.
        </p>

        {/* Action Buttons: Replay & Share */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            variant="gold"
            size="md"
            onClick={onReplay}
            icon={<RotateCcw className="w-4 h-4 text-midnight" />}
          >
            Replay the Experience
          </Button>

          <Button
            variant="secondary"
            size="md"
            onClick={handleShare}
            icon={copied ? <Check className="w-4 h-4 text-champagne" /> : <Share2 className="w-4 h-4" />}
          >
            {copied ? 'Link Copied!' : 'Share Experience'}
          </Button>
        </div>
      </motion.div>
    </section>
  );
};
