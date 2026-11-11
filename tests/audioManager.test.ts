import { describe, it, expect } from 'vitest';
import { audioManager } from '../src/lib/audio';

describe('audioManager', () => {
  it('starts background music at full volume by default', () => {
    expect(audioManager.getState().volume).toBe(1);
  });

  it('manages subscription and initial state correctly', () => {
    let capturedState: unknown = null;
    const unsubscribe = audioManager.subscribe((state) => {
      capturedState = state;
    });

    expect(capturedState).toBeDefined();
    expect(typeof (capturedState as { isPlaying: boolean }).isPlaying).toBe('boolean');
    expect(typeof (capturedState as { isMuted: boolean }).isMuted).toBe('boolean');

    unsubscribe();
  });

  it('clamps volume safely between 0 and 1', () => {
    let currentVol = 0;
    const unsub = audioManager.subscribe((s) => {
      currentVol = s.volume;
    });

    audioManager.setVolume(0.8);
    expect(currentVol).toBe(0.8);

    audioManager.setVolume(1.5);
    expect(currentVol).toBe(1);

    audioManager.setVolume(-0.5);
    expect(currentVol).toBe(0);

    // Reset back
    audioManager.setVolume(1);
    unsub();
  });

  it('toggles mute flag', () => {
    let isMuted = false;
    const unsub = audioManager.subscribe((s) => {
      isMuted = s.isMuted;
    });

    const initial = isMuted;
    audioManager.toggleMute();
    expect(isMuted).toBe(!initial);

    // Toggle back
    audioManager.toggleMute();
    expect(isMuted).toBe(initial);

    unsub();
  });
});

