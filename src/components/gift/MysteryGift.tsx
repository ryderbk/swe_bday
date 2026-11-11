import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioManager } from '../../lib/audio';
import { SectionHeading } from '../ui/SectionHeading';
import { VoiceMessageConfig, LetterConfig } from '../../data/birthdayContent';

interface MysteryGiftProps {
  gift: {
    enabled: boolean;
    title: string;
    subtitle: string;
    openLabel: string;
    keepsakeTitle: string;
    giftCloseImage?: string;
    giftOpenImage?: string;
    voiceMessage: VoiceMessageConfig;
    letter: LetterConfig;
  };
}

export const MysteryGift: React.FC<MysteryGiftProps> = ({ gift }) => {
  if (!gift.enabled) return null;

  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);

    audioManager.playSFX('giftOpen');

    try {
      confetti({
        particleCount: 50,
        spread: 65,
        origin: { y: 0.65 },
        colors: ['#D9B887', '#A96E78', '#FAF7F2', '#EAD5B5'],
        disableForReducedMotion: true,
      });
    } catch {
      // Confetti fallback
    }
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      // Restore bg music
      audioManager.playBackground().catch(() => {});
    } else {
      // Duck bg music
      audioManager.pauseBackground();
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const t = parseFloat(e.target.value);
    audioRef.current.currentTime = t;
    setCurrentTime(t);
  };

  const handleSkip = (secs: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(0, Math.min(duration, currentTime + secs));
  };

  const handleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleReplay = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
    setIsPlaying(true);
  };

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  const closeImg = gift.giftCloseImage || '/images/surprise/gift-close.webp';
  const openImg = gift.giftOpenImage || '/images/surprise/gift-open.webp';

  return (
    <div className="relative py-20 px-4 sm:px-6 max-w-xl mx-auto w-full">
      <SectionHeading
        eyebrow="A Special Surprise"
        title={gift.title}
        subtitle={gift.subtitle}
        theme="dark"
      />

      <div className="relative flex flex-col items-center justify-center">
        {/* Gift Box */}
        <div
          role="button"
          tabIndex={0}
          aria-label={isOpen ? 'Gift opened' : 'Unwrap your surprise gift box'}
          aria-expanded={isOpen}
          onClick={handleOpen}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleOpen();
            }
          }}
          className="relative group cursor-pointer focus:outline-none focus:ring-4 focus:ring-champagne/40 rounded-3xl p-4 transition-transform duration-300"
        >
          {/* Ambient Glow */}
          <div
            className={`absolute inset-0 rounded-3xl bg-gradient-to-r from-champagne/20 via-rose-muted/20 to-champagne/20 blur-xl transition-all duration-700 pointer-events-none ${
              isOpen ? 'opacity-90 scale-115' : 'opacity-35 group-hover:opacity-70'
            }`}
          />

          <div className="relative w-64 sm:w-72 aspect-square flex items-center justify-center select-none">
            <AnimatePresence mode="wait">
              {!isOpen ? (
                <motion.div
                  key="closed-gift"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full flex flex-col items-center justify-center"
                >
                  <img
                    src={closeImg}
                    alt="Champagne gift box with rose gold ribbon"
                    className="w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] animate-float-subtle"
                  />
                  <div className="absolute bottom-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-midnight/80 border border-champagne/30 text-champagne text-xs font-sans tracking-wide shadow-md">
                    <Sparkles className="w-3 h-3 text-champagne" />
                    <span>{gift.openLabel || 'Tap to open'}</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="opened-gift"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <img
                    src={openImg}
                    alt="Opened champagne gift box with floating heart"
                    className="w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Keepsake Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 w-full max-w-md rounded-3xl bg-[#FAF7F2] border border-champagne/40 shadow-2xl text-midnight relative overflow-hidden"
            >
              {/* Keepsake Header */}
              <div className="text-center pt-8 pb-4 px-6 sm:px-8">
                <div className="w-12 h-12 rounded-full bg-rose-muted/15 text-rose-deep mx-auto flex items-center justify-center mb-3">
                  <Heart className="w-6 h-6 fill-rose-muted text-rose-muted" />
                </div>
                <h4 className="font-serif text-2xl sm:text-3xl font-normal text-rosewood-dark">
                  {gift.keepsakeTitle}
                </h4>
              </div>

              <div className="w-12 h-px bg-champagne/50 mx-auto" />

              {/* Voice Message Player */}
              {gift.voiceMessage.enabled && gift.voiceMessage.audioSrc ? (
                <div className="px-6 sm:px-8 pt-5 pb-4">
                  <p className="text-xs uppercase tracking-widest text-rosewood/60 font-sans font-semibold mb-3 text-center">
                    {gift.voiceMessage.title}
                  </p>

                  <audio
                    ref={audioRef}
                    src={gift.voiceMessage.audioSrc}
                    onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime ?? 0)}
                    onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
                    onEnded={() => {
                      setIsPlaying(false);
                      audioManager.playBackground().catch(() => {});
                    }}
                  />

                  {/* Seek bar */}
                  <div className="mb-3">
                    <input
                      type="range"
                      min={0}
                      max={duration || 0}
                      step={0.1}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full accent-rosewood h-1.5 rounded-full cursor-pointer"
                      aria-label="Audio seek"
                    />
                    <div className="flex justify-between text-[10px] text-rosewood/50 font-mono mt-1">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => handleSkip(-10)}
                      aria-label="Rewind 10 seconds"
                      className="text-rosewood/60 hover:text-rosewood transition-colors text-xs font-mono px-2 py-1"
                    >
                      -10s
                    </button>

                    <button
                      type="button"
                      onClick={handlePlayPause}
                      aria-label={isPlaying ? 'Pause voice note' : 'Play voice note'}
                      className="w-12 h-12 rounded-full bg-rosewood flex items-center justify-center text-white shadow-lg hover:bg-rosewood-dark transition-colors"
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSkip(10)}
                      aria-label="Skip 10 seconds"
                      className="text-rosewood/60 hover:text-rosewood transition-colors text-xs font-mono px-2 py-1"
                    >
                      +10s
                    </button>

                    <button
                      type="button"
                      onClick={handleReplay}
                      aria-label="Replay from start"
                      className="text-rosewood/50 hover:text-rosewood transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={handleMute}
                      aria-label={isMuted ? 'Unmute' : 'Mute'}
                      className="text-rosewood/50 hover:text-rosewood transition-colors"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="px-6 sm:px-8 pt-5 pb-4 text-center">
                  <p className="font-handwriting text-lg text-rosewood/60 italic">
                    Voice note coming soon...
                  </p>
                </div>
              )}

              {/* Divider */}
              <div className="mx-6 sm:mx-8 my-4 h-px bg-rosewood/10" />

              {/* Letter */}
              <div className="px-6 sm:px-8 pb-8">
                <h5 className="font-serif text-xl sm:text-2xl text-rosewood-dark font-normal mb-4">
                  {gift.letter.title}
                </h5>
                <div className="space-y-4 font-handwriting text-lg sm:text-xl text-rosewood-dark leading-relaxed">
                  {gift.letter.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-rosewood/10 text-right">
                  <span className="font-handwriting text-xl sm:text-2xl text-rose-deep whitespace-pre-line">
                    {gift.letter.signature}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
