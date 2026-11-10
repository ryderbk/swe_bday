import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BirthdayContent } from '../../data/birthdayContent';
import { audioManager } from '../../lib/audio';
import { EnvelopeIntro } from '../entrance/EnvelopeIntro';
import { BirthdayReveal } from '../entrance/BirthdayReveal';
import { RelationshipTimeline } from '../story/RelationshipTimeline';
import { MemoryGallery } from '../gallery/MemoryGallery';
import { ReasonsGrid } from '../reasons/ReasonsGrid';
import { RelationshipQuiz } from '../quiz/RelationshipQuiz';
import { VoiceMessage } from '../audio/VoiceMessage';
import { MysteryGift } from '../gift/MysteryGift';
import { BirthdayCake } from '../birthday/BirthdayCake';
import { FinalLetter } from '../finale/FinalLetter';
import { AudioController } from '../audio/AudioController';
import { ChapterProgress, ChapterItem } from './ChapterProgress';
import { ChapterSection } from './ChapterSection';

interface ExperienceShellProps {
  content: BirthdayContent;
}

export type ExperiencePhase = 'cover' | 'birthday-intro' | 'experience';

export const ExperienceShell: React.FC<ExperienceShellProps> = ({ content }) => {
  const [phase, setPhase] = useState<ExperiencePhase>('cover');

  // Initialize audio controller with configured track
  useEffect(() => {
    if (content.music.enabled && content.music.audioSrc) {
      audioManager.initBackgroundMusic(content.music.audioSrc, content.music.label);
    }
    return () => {
      audioManager.destroy();
    };
  }, [content.music]);

  const handleOpenEnvelope = () => {
    // Start background music via user gesture
    if (content.music.enabled) {
      audioManager.playBackground();
    }
    setPhase('birthday-intro');
  };

  const handleStartExperience = () => {
    setPhase('experience');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReplay = () => {
    setPhase('cover');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Build chapter list for progress indicator
  const chapters: ChapterItem[] = useMemo(() => {
    const list: ChapterItem[] = [
      { id: 'story', title: 'The Story of Us', shortName: 'Story' },
      { id: 'memories', title: 'Our Little Scrapbook', shortName: 'Scrapbook' },
      { id: 'reasons', title: '12 Little Reasons', shortName: 'Reasons' },
      { id: 'quiz', title: 'How Well Do You Know Us?', shortName: 'Quiz' },
    ];

    if (content.voiceMessage.enabled && content.voiceMessage.audioSrc) {
      list.push({ id: 'voice', title: 'A Voice Note', shortName: 'Voice' });
    }

    if (content.gift.enabled) {
      list.push({ id: 'gift', title: 'The Mystery Gift', shortName: 'Gift' });
    }

    if (content.cake.enabled) {
      list.push({ id: 'cake', title: 'Birthday Cake', shortName: 'Cake' });
    }

    list.push({ id: 'finale', title: 'Our Little Universe', shortName: 'Finale' });

    return list;
  }, [content]);

  return (
    <div className="relative min-h-screen bg-midnight text-ivory selection:bg-rose-muted selection:text-white">
      <AnimatePresence mode="wait">
        {phase === 'cover' && (
          <motion.div
            key="cover-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <EnvelopeIntro
              onOpen={handleOpenEnvelope}
              recipientName={content.site.recipientName}
              senderName={content.site.senderName}
              eyebrow={content.entrance.eyebrow}
              title={content.entrance.title}
              subtext={content.entrance.subtext}
              buttonLabel={content.entrance.buttonLabel}
            />
          </motion.div>
        )}

        {phase === 'birthday-intro' && (
          <motion.div
            key="intro-phase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <BirthdayReveal
              recipientName={content.site.recipientName}
              senderName={content.site.senderName}
              title={content.intro.title}
              subtitle={content.intro.subtitle}
              message={content.intro.message}
              buttonLabel={content.intro.buttonLabel}
              onContinue={handleStartExperience}
            />
          </motion.div>
        )}

        {phase === 'experience' && (
          <motion.div
            key="experience-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
            className="w-full relative"
          >
            {/* Chapter Navigator and Progress Bar */}
            <ChapterProgress chapters={chapters} onReplay={handleReplay} />

            {/* Persistent Audio Controls */}
            <AudioController />

            {/* Chapter 3: Timeline & Relationship Counter */}
            <ChapterSection
              id="story"
              nextSectionId="memories"
              nextSectionLabel="Our Memories"
            >
              <RelationshipTimeline
                milestones={content.timeline}
                relationshipStartDate={content.site.relationshipStartDate}
                showRelationshipCounter={content.site.showRelationshipCounter}
              />
            </ChapterSection>

            {/* Chapter 4: Polaroid Scrapbook */}
            <ChapterSection
              id="memories"
              nextSectionId="reasons"
              nextSectionLabel="12 Little Reasons"
            >
              <MemoryGallery memories={content.memories} />
            </ChapterSection>

            {/* Chapter 5: 12 Little Reasons */}
            <ChapterSection
              id="reasons"
              nextSectionId="quiz"
              nextSectionLabel="Relationship Quiz"
            >
              <ReasonsGrid reasons={content.reasons} />
            </ChapterSection>

            {/* Chapter 6: Relationship Quiz */}
            <ChapterSection
              id="quiz"
              nextSectionId={
                content.voiceMessage.enabled && content.voiceMessage.audioSrc
                  ? 'voice'
                  : content.gift.enabled
                  ? 'gift'
                  : 'cake'
              }
              nextSectionLabel={
                content.voiceMessage.enabled && content.voiceMessage.audioSrc
                  ? 'Voice Message'
                  : content.gift.enabled
                  ? 'Mystery Gift'
                  : 'Birthday Cake'
              }
            >
              <RelationshipQuiz
                quiz={content.quiz}
                recipientName={content.site.recipientName}
              />
            </ChapterSection>

            {/* Chapter 7: Voice Message (Optional) */}
            {content.voiceMessage.enabled && content.voiceMessage.audioSrc && (
              <ChapterSection
                id="voice"
                nextSectionId={content.gift.enabled ? 'gift' : 'cake'}
                nextSectionLabel={content.gift.enabled ? 'Mystery Gift' : 'Birthday Cake'}
              >
                <VoiceMessage voiceMessage={content.voiceMessage} />
              </ChapterSection>
            )}

            {/* Chapter 8: Mystery Gift */}
            {content.gift.enabled && (
              <ChapterSection
                id="gift"
                nextSectionId="cake"
                nextSectionLabel="Birthday Cake"
              >
                <MysteryGift gift={content.gift} />
              </ChapterSection>
            )}

            {/* Chapter 9: Birthday Cake */}
            {content.cake.enabled && (
              <ChapterSection
                id="cake"
                nextSectionId="finale"
                nextSectionLabel="Our Little Universe"
              >
                <BirthdayCake cake={content.cake} recipientName={content.site.recipientName} />
              </ChapterSection>
            )}

            {/* Chapter 10: Finale Letter & Constellation */}
            <ChapterSection id="finale">
              <FinalLetter
                letter={content.letter}
                constellation={content.constellation}
                recipientName={content.site.recipientName}
                senderName={content.site.senderName}
                onReplay={handleReplay}
              />
            </ChapterSection>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

