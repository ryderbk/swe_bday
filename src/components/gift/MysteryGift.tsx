import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Play, Pause, RotateCcw, Volume2, VolumeX, Mic } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioManager } from '../../lib/audio';
import { SectionHeading } from '../ui/SectionHeading';
import { VoiceMessageConfig, LetterConfig } from '../../data/birthdayContent';

interface MysteryGiftProps {
  gift: {
    enabled: boolean;
    title: string;
    subtitle: string;
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
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

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
      audioManager.resumeAfterVoice();
      setIsPlaying(false);
    } else {
      audioManager.pauseForVoice();
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
          audioManager.resumeAfterVoice();
        });
    }
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
    audioManager.pauseForVoice();
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
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
        {/* Gift Box - Whole artwork is the accessible tap target, no label pill */}
        <div
          role="button"
          tabIndex={0}
          aria-label={isOpen ? 'Birthday gift opened' : 'Open your birthday gift'}
          aria-expanded={isOpen}
          onClick={handleOpen}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleOpen();
            }
          }}
          className="relative group cursor-pointer focus:outline-none focus:ring-4 focus:ring-champagne/40 rounded-3xl p-4 transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          {/* Ambient Glow */}
          <div
            className={`absolute inset-0 rounded-3xl bg-gradient-to-r from-champagne/20 via-rose-muted/20 to-champagne/20 blur-xl transition-all duration-700 pointer-events-none ${
              isOpen ? 'opacity-90 scale-115' : 'opacity-35 group-hover:opacity-75'
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
                    alt="Open your birthday gift box"
                    className="w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] animate-float-subtle"
                  />
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

        {/* Unified Keepsake: Voice Message Player + Love Letter in one seamless panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 w-full max-w-lg rounded-3xl bg-[#FAF7F2] border border-champagne/40 shadow-2xl text-midnight relative overflow-hidden"
            >
              {/* Keepsake Header */}
              <div className="text-center pt-8 pb-3 px-6 sm:px-8">
                <div className="w-12 h-12 rounded-full bg-rose-muted/15 text-rose-deep mx-auto flex items-center justify-center mb-3">
                  <Heart className="w-6 h-6 fill-rose-muted text-rose-muted" />
                </div>
                <h4 className="font-serif text-2xl sm:text-3xl font-normal text-rosewood-dark">
                  {gift.keepsakeTitle}
                </h4>
              </div>

              <div className="w-16 h-px bg-champagne/50 mx-auto mb-2" />

              {/* Upper Section: Voice Message Player */}
              {gift.voiceMessage.enabled && gift.voiceMessage.audioSrc ? (
                <div className="px-6 sm:px-8 pt-4 pb-4">
                  <p className="text-xs uppercase tracking-widest text-rosewood/60 font-sans font-semibold mb-3 text-center">
                    {gift.voiceMessage.title}
                  </p>

                  <audio
                    ref={audioRef}
                    src={gift.voiceMessage.audioSrc}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => {
                      setIsPlaying(false);
                      audioManager.resumeAfterVoice();
                    }}
                    onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime ?? 0)}
                    onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
                    onEnded={() => {
                      setIsPlaying(false);
                      audioManager.resumeAfterVoice();
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

                  {/* Player Controls */}
                  <div className="flex items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => handleSkip(-10)}
                      aria-label="Rewind 10 seconds"
                      className="text-rosewood/60 hover:text-rosewood transition-colors text-xs font-mono px-2 py-1 cursor-pointer"
                    >
                      -10s
                    </button>

                    <button
                      type="button"
                      onClick={handlePlayPause}
                      aria-label={isPlaying ? 'Pause voice note' : 'Play voice note'}
                      className="w-12 h-12 rounded-full bg-rosewood flex items-center justify-center text-white shadow-lg hover:bg-rosewood-dark transition-colors cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSkip(10)}
                      aria-label="Skip 10 seconds"
                      className="text-rosewood/60 hover:text-rosewood transition-colors text-xs font-mono px-2 py-1 cursor-pointer"
                    >
                      +10s
                    </button>

                    <button
                      type="button"
                      onClick={handleReplay}
                      aria-label="Replay from start"
                      className="text-rosewood/50 hover:text-rosewood transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={handleMute}
                      aria-label={isMuted ? 'Unmute' : 'Mute'}
                      className="text-rosewood/50 hover:text-rosewood transition-colors cursor-pointer"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              ) : (
                /* Polished inactive placeholder inside the keepsake panel */
                <div className="px-6 sm:px-8 pt-3 pb-3 text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-muted/10 text-rosewood/70 text-xs font-sans">
                    <Mic className="w-3.5 h-3.5 text-rose-muted" />
                    <span>Personal voice message coming soon</span>
                  </div>
                </div>
              )}

              {/* Ornamental Divider */}
              <div className="mx-6 sm:mx-8 my-4 h-px bg-rosewood/15" />

              {/* Lower Section: The Love Letter */}
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
