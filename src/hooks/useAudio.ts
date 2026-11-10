import { useState, useEffect } from 'react';
import { audioManager, AudioState } from '../lib/audio';

export function useAudio() {
  const [audioState, setAudioState] = useState<AudioState>({
    isPlaying: false,
    isMuted: false,
    volume: 0.6,
    hasTrack: false,
    trackLabel: '',
  });

  useEffect(() => {
    const unsubscribe = audioManager.subscribe((state) => {
      setAudioState(state);
    });
    return unsubscribe;
  }, []);

  return {
    ...audioState,
    play: () => audioManager.playBackground(),
    pause: () => audioManager.pauseBackground(),
    togglePlay: () => audioManager.togglePlay(),
    toggleMute: () => audioManager.toggleMute(),
    setVolume: (v: number) => audioManager.setVolume(v),
  };
}

