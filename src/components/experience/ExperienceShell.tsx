import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BirthdayContent } from '../../data/birthdayContent';
import { audioManager } from '../../lib/audio';
import { enterFullscreen } from '../../lib/fullscreen';
import { EnvelopeIntro } from '../entrance/EnvelopeIntro';
import { MicrophoneIntro } from '../prelude/MicrophoneIntro';
import { BirthdayChatPrelude } from '../prelude/BirthdayChatPrelude';
import { BirthdayReveal } from '../entrance/BirthdayReveal';
import { BouquetScene } from '../bouquet/BouquetScene';
import { BalloonGame } from '../balloon/BalloonGame';
import { RelationshipTimeline } from '../story/RelationshipTimeline';
import { MemoryGallery } from '../gallery/MemoryGallery';
import { ReasonsGrid } from '../reasons/ReasonsGrid';
import { BirthdayCake } from '../birthday/BirthdayCake';
import { MysteryGift } from '../gift/MysteryGift';
import { ForeverReasons } from '../reasons/ForeverReasons';
import { GrandBirthdayBlast } from '../finale/GrandBirthdayBlast';
import { AudioController } from '../audio/AudioController';
import { ChapterProgress, ChapterItem } from './ChapterProgress';
import { ChapterSection } from './ChapterSection';

interface ExperienceShellProps {
  content: BirthdayContent;
}

export type ExperiencePhase =
  | 'cover'
  | 'mic-intro'
  | 'chat-prelude'
  | 'birthday-intro'
  | 'experience';

export const ExperienceShell: React.FC<ExperienceShellProps> = ({ content }) => {
  const [phase, setPhase] = useState<ExperiencePhase>('cover');
  const [, setMicPermission] = useState<boolean | null>(null);
  const [showBlast, setShowBlast] = useState(false);

  // Initialize audio controller with configured track
  useEffect(() => {
    if (content.music.enabled && content.music.audioSrc) {
      audioManager.initBackgroundMusic(content.music.audioSrc, content.music.label);
    }
    return () => {
      audioManager.destroy();
    };
  }, [content.music]);

  // Attempt automatic playback & fullscreen on mount & user gesture
  useEffect(() => {
    // Attempt immediate fullscreen & autoplay on mount
    enterFullscreen().catch(() => {});
    if (content.music.enabled) {
      audioManager.playBackground().catch(() => {});
    }

    const events = ['pointerdown', 'touchstart', 'mousedown', 'click', 'keydown'];

    const handleFirstUserInteraction = () => {
      enterFullscreen();
      if (content.music.enabled) {
        audioManager.playBackground();
      }
      events.forEach((evt) => window.removeEventListener(evt, handleFirstUserInteraction));
    };

    events.forEach((evt) => window.addEventListener(evt, handleFirstUserInteraction, { passive: true }));

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, handleFirstUserInteraction));
    };
  }, [content.music.enabled]);

  const handleOpenEnvelope = () => {
    enterFullscreen();
    if (content.music.enabled) {
      audioManager.playBackground();
    }
    setPhase('mic-intro');
  };

  const handleMicGranted = (granted: boolean) => {
    setMicPermission(granted);
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
    setShowBlast(false);
    setPhase('cover');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleForeverComplete = () => {
    setShowBlast(true);
  };

  // Build centralized, typed chapter registry
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
    list.push({ id: 'reasons', title: '10 Little Reasons & YOU', shortName: 'Reasons' });

    if (content.cake.enabled) {
      list.push({ id: 'cake', title: 'Birthday Cake', shortName: 'Cake' });
    }

    if (content.gift.enabled) {
      list.push({ id: 'gift', title: 'The Mystery Gift', shortName: 'Gift' });
    }

    list.push({ id: 'forever-reasons', title: '11 Reasons Why I Want You Forever', shortName: 'Forever' });

    return list;
  }, [content]);

  return (
    <div className="relative min-h-screen bg-midnight text-ivory selection:bg-rose-muted selection:text-white">
      {/* Persistent Audio Controls on all screens */}
      <AudioController />

      {/* Grand Birthday Blast Overlay (triggered at end of ForeverReasons) */}
      <GrandBirthdayBlast active={showBlast} />

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

        {/* Phase 2: Microphone Permission Prompt */}
        {phase === 'mic-intro' && (
          <motion.div
            key="mic-intro-phase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <MicrophoneIntro
              content={content.microphoneIntro}
              onGranted={handleMicGranted}
            />
          </motion.div>
        )}

        {/* Phase 3: Smartphone Chat Prelude */}
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

        {/* Phase 4: Birthday Reveal Intro */}
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

        {/* Phase 5: Guided Ordered Chapters */}
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

            {/* Chapter 1: Bouquet Scene */}
            {content.bouquet.enabled && (
              <ChapterSection id="bouquet">
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

            {/* Chapter 2: Balloon Mini-Game */}
            {content.balloonGame.enabled && (
              <ChapterSection id="balloons">
                <BalloonGame
                  title={content.balloonGame.title}
                  subtitle={content.balloonGame.subtitle}
                  completionTitle={content.balloonGame.completionTitle}
                  completionMessage={content.balloonGame.completionMessage}
                  balloons={content.balloonGame.balloons}
                />
              </ChapterSection>
            )}

            {/* Chapter 3: Timeline & Relationship Counter */}
            <ChapterSection id="story">
              <RelationshipTimeline
                milestones={content.timeline}
                relationshipStartDate={content.site.relationshipStartDate}
                showRelationshipCounter={content.site.showRelationshipCounter}
              />
            </ChapterSection>

            {/* Chapter 4: Polaroid Scrapbook & Heart Collage */}
            <ChapterSection id="memories">
              <MemoryGallery
                memories={content.memories}
                defaultPhotoCount={content.galleryConfig.defaultPhotoCount}
                expandedTitle={content.galleryConfig.expandedTitle}
                expandedSubtitle={content.galleryConfig.expandedSubtitle}
                viewAllLabel={content.galleryConfig.viewAllLabel}
                showLessLabel={content.galleryConfig.showLessLabel}
              />
            </ChapterSection>

            {/* Chapter 5: 10 Little Reasons + YOU Card */}
            <ChapterSection id="reasons">
              <ReasonsGrid
                reasons={content.reasons}
                specialYouCard={content.specialYouCard}
              />
            </ChapterSection>

            {/* Chapter 6: Birthday Cake (BEFORE Mystery Gift) */}
            {content.cake.enabled && (
              <ChapterSection id="cake">
                <BirthdayCake
                  cake={content.cake}
                  recipientName={content.site.recipientName}
                />
              </ChapterSection>
            )}

            {/* Chapter 7: Mystery Gift (Keepsake with Voice Message + Letter) */}
            {content.gift.enabled && (
              <ChapterSection id="gift">
                <MysteryGift gift={content.gift} />
              </ChapterSection>
            )}

            {/* Chapter 8: 11 Reasons Why I Want You Forever */}
            <ChapterSection id="forever-reasons">
              <ForeverReasons
                reasons={content.foreverReasons}
                onComplete={handleForeverComplete}
              />
            </ChapterSection>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
