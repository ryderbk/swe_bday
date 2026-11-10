import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BirthdayContent } from '../../data/birthdayContent';
import { audioManager } from '../../lib/audio';
import { EnvelopeIntro } from '../entrance/EnvelopeIntro';
import { BirthdayChatPrelude } from '../prelude/BirthdayChatPrelude';
import { BirthdayReveal } from '../entrance/BirthdayReveal';
import { BouquetScene } from '../bouquet/BouquetScene';
import { BalloonGame } from '../balloon/BalloonGame';
import { RelationshipTimeline } from '../story/RelationshipTimeline';
import { MemoryGallery } from '../gallery/MemoryGallery';
import { ReasonsGrid } from '../reasons/ReasonsGrid';
import { RomanticQuestion } from '../question/RomanticQuestion';
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

export type ExperiencePhase = 'cover' | 'chat-prelude' | 'birthday-intro' | 'experience';

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
    // Start background music via user gesture if enabled
    if (content.music.enabled) {
      audioManager.playBackground();
    }
    setPhase('chat-prelude');
  };

  const handleCompleteChat = () => {
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

  // Build centralized, typed chapter registry from enabled chapters
  const chapters: ChapterItem[] = useMemo(() => {
    const list: ChapterItem[] = [];

    if (content.bouquet.enabled) {
      list.push({ id: 'bouquet', title: 'A Bouquet for You', shortName: 'Bouquet' });
    }

    if (content.balloonGame.enabled) {
      list.push({ id: 'balloons', title: 'Pop a Balloon, Find a Memory', shortName: 'Balloons' });
    }

    list.push({ id: 'story', title: 'The Story of Us', shortName: 'Story' });
    list.push({ id: 'memories', title: 'Our Little Scrapbook', shortName: 'Scrapbook' });
    list.push({ id: 'reasons', title: '12 Little Reasons', shortName: 'Reasons' });

    if (content.romanticQuestion.enabled) {
      list.push({ id: 'question', title: 'One Little Question', shortName: 'Question' });
    }

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

  // Helper to determine next chapter target from the registry
  const getNextChapter = (currentId: string): ChapterItem | undefined => {
    const idx = chapters.findIndex((c) => c.id === currentId);
    if (idx !== -1 && idx < chapters.length - 1) {
      return chapters[idx + 1];
    }
    return undefined;
  };

  return (
    <div className="relative min-h-screen bg-midnight text-ivory selection:bg-rose-muted selection:text-white">
      <AnimatePresence mode="wait">
        {/* Phase 1: Envelope Cover */}
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

        {/* Phase 2: Project 4 Scripted Smartphone Chat Prelude */}
        {phase === 'chat-prelude' && (
          <motion.div
            key="chat-phase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <BirthdayChatPrelude
              contactName={content.chatPrelude.contactName}
              statusText={content.chatPrelude.statusText}
              messages={content.chatPrelude.messages}
              continueLabel={content.chatPrelude.continueLabel}
              onComplete={handleCompleteChat}
            />
          </motion.div>
        )}

        {/* Phase 3: Project 2 Bunny+Bear Birthday Reveal */}
        {phase === 'birthday-intro' && (
          <motion.div
            key="intro-phase"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
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
              teddyImage={content.intro.teddyImage}
              onContinue={handleStartExperience}
            />
          </motion.div>
        )}

        {/* Phase 4: Guided Ordered Chapters */}
        {phase === 'experience' && (
          <motion.div
            key="experience-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
            className="w-full relative"
          >
            {/* Top Chapter Progress & Quick Navigation */}
            <ChapterProgress chapters={chapters} onReplay={handleReplay} />

            {/* Persistent Audio Controls */}
            <AudioController />

            {/* Chapter: Bouquet Scene */}
            {content.bouquet.enabled && (
              <ChapterSection
                id="bouquet"
                nextSectionId={getNextChapter('bouquet')?.id}
                nextSectionLabel={getNextChapter('bouquet')?.shortName}
              >
                <BouquetScene
                  title={content.bouquet.title}
                  subtitle={content.bouquet.subtitle}
                  supportingMessage={content.bouquet.supportingMessage}
                  imageSrc={content.bouquet.imageSrc}
                  leftDecorationSrc={content.bouquet.leftDecorationSrc}
                  rightDecorationSrc={content.bouquet.rightDecorationSrc}
                  petalsEnabled={content.bouquet.petalsEnabled}
                />
              </ChapterSection>
            )}

            {/* Chapter: Balloon Mini-Game */}
            {content.balloonGame.enabled && (
              <ChapterSection
                id="balloons"
                nextSectionId={getNextChapter('balloons')?.id}
                nextSectionLabel={getNextChapter('balloons')?.shortName}
              >
                <BalloonGame
                  title={content.balloonGame.title}
                  subtitle={content.balloonGame.subtitle}
                  completionTitle={content.balloonGame.completionTitle}
                  completionMessage={content.balloonGame.completionMessage}
                  balloons={content.balloonGame.balloons}
                />
              </ChapterSection>
            )}

            {/* Chapter: Timeline & Relationship Counter */}
            <ChapterSection
              id="story"
              nextSectionId={getNextChapter('story')?.id}
              nextSectionLabel={getNextChapter('story')?.shortName}
            >
              <RelationshipTimeline
                milestones={content.timeline}
                relationshipStartDate={content.site.relationshipStartDate}
                showRelationshipCounter={content.site.showRelationshipCounter}
              />
            </ChapterSection>

            {/* Chapter: Polaroid Scrapbook & Heart Collage */}
            <ChapterSection
              id="memories"
              nextSectionId={getNextChapter('memories')?.id}
              nextSectionLabel={getNextChapter('memories')?.shortName}
            >
              <MemoryGallery
                memories={content.memories}
                defaultPhotoCount={content.galleryConfig.defaultPhotoCount}
                expandedTitle={content.galleryConfig.expandedTitle}
                expandedSubtitle={content.galleryConfig.expandedSubtitle}
                viewAllLabel={content.galleryConfig.viewAllLabel}
                showLessLabel={content.galleryConfig.showLessLabel}
              />
            </ChapterSection>

            {/* Chapter: 12 Little Reasons */}
            <ChapterSection
              id="reasons"
              nextSectionId={getNextChapter('reasons')?.id}
              nextSectionLabel={getNextChapter('reasons')?.shortName}
            >
              <ReasonsGrid reasons={content.reasons} />
            </ChapterSection>

            {/* Chapter: Project 3 Romantic Yes Question */}
            {content.romanticQuestion.enabled && (
              <ChapterSection
                id="question"
                nextSectionId={getNextChapter('question')?.id}
                nextSectionLabel={getNextChapter('question')?.shortName}
              >
                <RomanticQuestion
                  title={content.romanticQuestion.title}
                  subtitle={content.romanticQuestion.subtitle}
                  buttonLabel={content.romanticQuestion.buttonLabel}
                  helperText={content.romanticQuestion.helperText}
                  revealedTitle={content.romanticQuestion.revealedTitle}
                  revealedMessage={content.romanticQuestion.revealedMessage}
                />
              </ChapterSection>
            )}

            {/* Chapter: Voice Message (Optional) */}
            {content.voiceMessage.enabled && content.voiceMessage.audioSrc && (
              <ChapterSection
                id="voice"
                nextSectionId={getNextChapter('voice')?.id}
                nextSectionLabel={getNextChapter('voice')?.shortName}
              >
                <VoiceMessage voiceMessage={content.voiceMessage} />
              </ChapterSection>
            )}

            {/* Chapter: Mystery Gift */}
            {content.gift.enabled && (
              <ChapterSection
                id="gift"
                nextSectionId={getNextChapter('gift')?.id}
                nextSectionLabel={getNextChapter('gift')?.shortName}
              >
                <MysteryGift gift={content.gift} />
              </ChapterSection>
            )}

            {/* Chapter: Birthday Cake & Grand Celebration */}
            {content.cake.enabled && (
              <ChapterSection
                id="cake"
                nextSectionId={getNextChapter('cake')?.id}
                nextSectionLabel={getNextChapter('cake')?.shortName}
              >
                <BirthdayCake cake={content.cake} recipientName={content.site.recipientName} />
              </ChapterSection>
            )}

            {/* Chapter: Finale Letter & Starlit Constellation */}
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
