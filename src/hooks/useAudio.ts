import { useState, useEffect } from 'react';
import { audioManager, AudioState, SFXType } from '../lib/audio';

export function useAudio() {
  const [audioState, setAudioState] = useState<AudioState>({
    isPlaying: false,
    isMuted: false,
    volume: 0.6,
    hasTrack: false,
    trackLabel: '',
    sfxMuted: false,
    sfxVolume: 0.5,
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
    toggleSFXMute: () => audioManager.toggleSFXMute(),
    setVolume: (v: number) => audioManager.setVolume(v),
    setSFXVolume: (v: number) => audioManager.setSFXVolume(v),
    playSFX: (type: SFXType) => audioManager.playSFX(type),
  };
}
