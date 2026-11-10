import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { audioManager } from '../../lib/audio';
import { SectionHeading } from '../ui/SectionHeading';
import { IconButton } from '../ui/IconButton';

interface VoiceMessageProps {
  voiceMessage: {
    enabled: boolean;
    title: string;
    audioSrc: string;
    transcript?: string;
  };
}

export const VoiceMessage: React.FC<VoiceMessageProps> = ({ voiceMessage }) => {
  if (!voiceMessage.enabled || !voiceMessage.audioSrc) {
    return null;
  }

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const audio = new Audio(voiceMessage.audioSrc);
    audioRef.current = audio;

    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      setHasError(false);
    };

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    const onEnded = () => {
      setIsPlaying(false);
      audioManager.handleVoiceEnd();
    };

    const onError = () => {
      setHasError(true);
      setIsPlaying(false);
      audioManager.handleVoiceEnd();
    };

    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.pause();
      audioManager.handleVoiceEnd();
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
      audioRef.current = null;
    };
  }, [voiceMessage.audioSrc]);

  if (hasError) {
    // If the audio source failed to load, cleanly hide rather than showing broken player
    return null;
  }

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      audioManager.handleVoiceEnd();
    } else {
      audioManager.handleVoiceStart();
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Voice play blocked:', err);
        setIsPlaying(false);
        audioManager.handleVoiceEnd();
      });
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const time = parseFloat(e.target.value);
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const handleReplay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    setCurrentTime(0);
    if (!isPlaying) {
      togglePlay();
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section id="voice" className="relative py-20 px-4 sm:px-6 max-w-xl mx-auto w-full">
      <SectionHeading
        eyebrow="A Message From Bharath"
        title={voiceMessage.title || 'A Voice Note For You'}
        subtitle="Press play to listen to a few words spoken from the heart."
        theme="dark"
      />

      {/* Cassette Tape / Player Body */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#231F2A] via-[#1A1820] to-[#121016] border border-champagne/30 p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Subtle screw details at corners */}
        <div className="absolute top-3 left-3 w-2 h-2 rounded-full border border-champagne/30 bg-midnight/80" />
        <div className="absolute top-3 right-3 w-2 h-2 rounded-full border border-champagne/30 bg-midnight/80" />
        <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full border border-champagne/30 bg-midnight/80" />
        <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full border border-champagne/30 bg-midnight/80" />

        {/* Cassette Spools */}
        <div className="flex items-center justify-center gap-8 sm:gap-12 py-4 mb-4">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-champagne/30 bg-midnight flex items-center justify-center">
            <div
              className={`w-6 h-6 rounded-full border-2 border-champagne/40 bg-champagne/20 flex items-center justify-center ${
                isPlaying ? 'animate-spin' : ''
              }`}
              style={{ animationDuration: '4s' }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-champagne" />
            </div>
          </div>

          {/* Simple animated waveform */}
          <div className="flex items-end gap-1 h-12 px-2" aria-hidden="true">
            {[40, 75, 55, 90, 30, 85, 60, 95, 45, 80, 50, 70].map((h, i) => (
              <div
                key={i}
                className="w-1 bg-champagne rounded-full transition-all duration-300"
                style={{
                  height: isPlaying ? `${Math.max(15, (h * (0.5 + Math.random() * 0.5)))}%` : '20%',
                  opacity: isPlaying ? 0.9 : 0.3,
                }}
              />
            ))}
          </div>

          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-champagne/30 bg-midnight flex items-center justify-center">
            <div
              className={`w-6 h-6 rounded-full border-2 border-champagne/40 bg-champagne/20 flex items-center justify-center ${
                isPlaying ? 'animate-spin' : ''
              }`}
              style={{ animationDuration: '4s' }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-champagne" />
            </div>
          </div>
        </div>

        {/* Time and Track Info */}
        <div className="flex items-center justify-between text-xs font-mono text-champagne/80 mb-2 px-1">
          <span>{formatTime(currentTime)}</span>
          <span className="font-sans text-[11px] text-ivory-dark/60 tracking-wider uppercase">Voice Note</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Progress Slider */}
        <div className="relative w-full mb-6">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            aria-label="Seek voice message position"
            className="w-full h-1.5 bg-midnight rounded-lg appearance-none cursor-pointer accent-champagne"
          />
        </div>

        {/* Player Controls */}
        <div className="flex items-center justify-center gap-4 sm:gap-6">
          <IconButton
            aria-label="Replay audio"
            variant="glass"
            size="md"
            onClick={handleReplay}
          >
            <RotateCcw className="w-4 h-4 text-ivory" />
          </IconButton>

          <IconButton
            aria-label={isPlaying ? 'Pause voice message' : 'Play voice message'}
            variant="solid"
            size="lg"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-white text-white" />
            ) : (
              <Play className="w-6 h-6 fill-white text-white ml-0.5" />
            )}
          </IconButton>

          <IconButton
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            variant="glass"
            size="md"
            onClick={toggleMute}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-rose-soft" />
            ) : (
              <Volume2 className="w-4 h-4 text-ivory" />
            )}
          </IconButton>
        </div>

        {/* Transcript Accordion */}
        {voiceMessage.transcript && (
          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <button
              type="button"
              onClick={() => setShowTranscript((prev) => !prev)}
              className="inline-flex items-center gap-1.5 text-xs text-champagne/80 hover:text-champagne font-sans tracking-wide transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{showTranscript ? 'Hide transcript' : 'Read transcript'}</span>
              {showTranscript ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>

            {showTranscript && (
              <div className="mt-4 p-4 rounded-xl bg-midnight/70 border border-white/10 text-left">
                <p className="font-handwriting text-lg text-ivory-dark/90 leading-relaxed whitespace-pre-line">
                  {voiceMessage.transcript}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

