import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Play, Pause, ChevronUp, ChevronDown } from 'lucide-react';
import { useAudio } from '../../hooks/useAudio';
import { IconButton } from '../ui/IconButton';

export const AudioController: React.FC = () => {
  const { isPlaying, isMuted, volume, hasTrack, trackLabel, togglePlay, toggleMute, setVolume } = useAudio();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!hasTrack) {
    return null; // Cleanly hide if no audio is configured
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 select-none">
      <div className="flex flex-col items-end gap-2">
        {/* Expanded Controls Popover */}
        {isExpanded && (
          <div className="p-3 rounded-2xl bg-midnight-surface/90 border border-champagne/30 shadow-2xl backdrop-blur-xl flex flex-col items-center gap-2 mb-1 w-44 text-xs text-ivory">
            <span className="font-serif text-sm text-champagne truncate max-w-[150px]">
              {trackLabel}
            </span>
            <div className="flex items-center gap-2 w-full px-1">
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                className="text-champagne hover:text-champagne-light p-1"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                aria-label="Volume slider"
                className="w-full h-1.5 bg-midnight rounded-lg appearance-none cursor-pointer accent-champagne"
              />
            </div>
          </div>
        )}

        {/* Floating Mini Pill */}
        <div className="flex items-center gap-1.5 p-1.5 pr-2.5 rounded-full bg-midnight-surface/85 border border-champagne/30 shadow-xl backdrop-blur-md">
          <IconButton
            aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
            variant="glass"
            size="sm"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 text-champagne" />
            ) : (
              <Play className="w-3.5 h-3.5 text-champagne ml-0.5" />
            )}
          </IconButton>

          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-label="Toggle audio volume settings"
            className="flex items-center gap-1 text-xs text-ivory-dark hover:text-ivory px-1 focus:outline-none"
          >
            <Music className="w-3 h-3 text-champagne" />
            <span className="hidden sm:inline font-sans text-[11px] text-ivory-dark/80 max-w-[90px] truncate">
              {isPlaying ? 'Playing' : 'Music'}
            </span>
            {isExpanded ? (
              <ChevronDown className="w-3 h-3 text-champagne/70" />
            ) : (
              <ChevronUp className="w-3 h-3 text-champagne/70" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

