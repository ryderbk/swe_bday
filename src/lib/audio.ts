// Central audio & sound-effects engine for A Little Universe for Swethu.
// Background music remains one persistent audio element throughout the experience.
// Voice playback gently ducks music to 40% and restores it to its normal level on pause/end.

type AudioEventListener = (state: AudioState) => void;

export interface AudioState {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  hasTrack: boolean;
  trackLabel?: string;
  sfxMuted: boolean;
  sfxVolume: number;
}

export type SFXType =
  | 'balloonPop'
  | 'heartPop'
  | 'giftOpen'
  | 'whoosh'
  | 'reveal'
  | 'fireworkLaunch'
  | 'fireworkBurst';

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

class AudioManager {
  private bgAudio: HTMLAudioElement | null = null;
  private sfxPool: Map<string, HTMLAudioElement[]> = new Map();
  private listeners: Set<AudioEventListener> = new Set();
  private volume = 1;
  private sfxVolume = 0.5;
  private isMuted = false;
  private sfxMuted = false;
  private voiceActive = false;
  private fadeFrame: number | null = null;
  private audioCtx: AudioContext | null = null;

  private readonly voiceDuckVolume = 0.4;
  private readonly duckFadeDuration = 550;
  private readonly restoreFadeDuration = 650;

  private sfxPaths: Record<SFXType, string> = {
    balloonPop: '/audio/sfx/balloon-pop.mp3',
    heartPop: '/audio/sfx/heart-pop.mp3',
    giftOpen: '/audio/sfx/gift-open.mp3',
    whoosh: '',
    reveal: '',
    fireworkLaunch: '',
    fireworkBurst: '',
  };

  private state: AudioState = {
    isPlaying: false,
    isMuted: false,
    volume: 1,
    hasTrack: false,
    trackLabel: '',
    sfxMuted: false,
    sfxVolume: 0.5,
  };

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) this.audioCtx = new AudioCtxClass();
    }
    if (this.audioCtx?.state === 'suspended') this.audioCtx.resume().catch(() => {});
    return this.audioCtx;
  }

  private targetMusicVolume(): number {
    if (this.isMuted) return 0;
    return this.voiceActive ? Math.min(this.volume, this.voiceDuckVolume) : this.volume;
  }

  private cancelFade(): void {
    if (this.fadeFrame !== null && typeof window !== 'undefined') {
      window.cancelAnimationFrame(this.fadeFrame);
    }
    this.fadeFrame = null;
  }

  /** Smooth, interruptible volume transition using requestAnimationFrame. */
  private fadeTo(target: number, durationMs: number, onComplete?: () => void): void {
    const audio = this.bgAudio;
    if (!audio || typeof window === 'undefined') {
      onComplete?.();
      return;
    }

    this.cancelFade();
    const startVolume = audio.volume;
    const targetVolume = clamp(target);
    const startTime = performance.now();

    if (durationMs <= 0 || Math.abs(startVolume - targetVolume) < 0.005) {
      audio.volume = targetVolume;
      this.fadeFrame = null;
      onComplete?.();
      return;
    }

    const tick = (now: number) => {
      if (!this.bgAudio) {
        this.fadeFrame = null;
        return;
      }
      const rawProgress = clamp((now - startTime) / durationMs);
      // Smooth ease-in-out curve; avoids audible level jumps.
      const eased = rawProgress < 0.5
        ? 4 * rawProgress * rawProgress * rawProgress
        : 1 - Math.pow(-2 * rawProgress + 2, 3) / 2;
      this.bgAudio.volume = clamp(startVolume + (targetVolume - startVolume) * eased);

      if (rawProgress < 1) {
        this.fadeFrame = window.requestAnimationFrame(tick);
      } else {
        this.bgAudio.volume = targetVolume;
        this.fadeFrame = null;
        onComplete?.();
      }
    };

    this.fadeFrame = window.requestAnimationFrame(tick);
  }

  public initBackgroundMusic(src: string, label?: string): void {
    if (!src) {
      this.state.hasTrack = false;
      this.notify();
      return;
    }

    // Keep the same element alive across React renders and chapter transitions.
    if (this.bgAudio && this.bgAudio.src.endsWith(src)) return;

    this.cancelFade();
    if (this.bgAudio) {
      this.bgAudio.pause();
      this.bgAudio.removeAttribute('src');
      this.bgAudio.load();
    }

    try {
      const audio = new Audio(src);
      audio.loop = true;
      audio.preload = 'auto';
      audio.volume = 0;
      audio.addEventListener('play', () => {
        this.state.isPlaying = true;
        this.notify();
      });
      audio.addEventListener('pause', () => {
        this.state.isPlaying = false;
        this.notify();
      });
      audio.addEventListener('error', () => {
        this.state.isPlaying = false;
        this.state.hasTrack = false;
        this.notify();
      });
      this.bgAudio = audio;
      this.state.hasTrack = true;
      this.state.trackLabel = label || 'Background Music';
      this.notify();
    } catch {
      this.state.hasTrack = false;
      this.notify();
    }
  }

  public configureSFXPaths(paths: Partial<Record<SFXType, string>>): void {
    this.sfxPaths = { ...this.sfxPaths, ...paths };
  }

  /** Call from the first user gesture (the envelope opening) to satisfy browser autoplay policies. */
  public async playBackground(): Promise<void> {
    const audio = this.bgAudio;
    if (!audio || !this.state.hasTrack) return;

    if (!audio.paused && !audio.ended) {
      this.fadeTo(this.targetMusicVolume(), this.restoreFadeDuration);
      return;
    }

    try {
      this.cancelFade();
      // The normal background level is 100% from the moment playback begins.
      // Smooth fades are reserved for voice-message ducking/restoration.
      audio.volume = this.targetMusicVolume();
      await audio.play();
    } catch {
      this.state.isPlaying = false;
      this.notify();
    }
  }

  public pauseBackground(): void {
    const audio = this.bgAudio;
    if (!audio) return;
    this.fadeTo(0, 450, () => audio.pause());
  }

  /** Keep music playing, but smoothly duck it to 40% while the voice message is audible. */
  public duckBackgroundForVoice(): void {
    this.voiceActive = true;
    if (this.bgAudio && !this.bgAudio.paused) {
      this.fadeTo(this.targetMusicVolume(), this.duckFadeDuration);
    }
  }

  /** Restore the background track to its normal 100% level after voice playback pauses or ends. */
  public restoreBackgroundAfterVoice(): void {
    this.voiceActive = false;
    if (this.bgAudio && !this.bgAudio.paused) {
      this.fadeTo(this.targetMusicVolume(), this.restoreFadeDuration);
    }
  }

  public togglePlay(): void {
    if (!this.bgAudio || !this.state.hasTrack) return;
    if (!this.bgAudio.paused) this.pauseBackground();
    else this.playBackground().catch(() => {});
  }

  public toggleMute(): void {
    this.isMuted = !this.isMuted;
    this.state.isMuted = this.isMuted;
    if (this.bgAudio && !this.bgAudio.paused) {
      this.fadeTo(this.targetMusicVolume(), 250);
    } else if (this.bgAudio) {
      this.bgAudio.volume = this.targetMusicVolume();
    }
    this.notify();
  }

  public setVolume(vol: number): void {
    this.volume = clamp(vol);
    this.state.volume = this.volume;
    if (this.bgAudio && !this.bgAudio.paused) {
      this.fadeTo(this.targetMusicVolume(), 220);
    } else if (this.bgAudio) {
      this.bgAudio.volume = this.targetMusicVolume();
    }
    this.notify();
  }

  public toggleSFXMute(): void {
    this.sfxMuted = !this.sfxMuted;
    this.state.sfxMuted = this.sfxMuted;
    this.notify();
  }

  public playSFX(type: SFXType): void {
    if (this.sfxMuted) return;

    const path = this.sfxPaths[type];
    if (path) {
      // Balloon pops are intentionally capped at 60%; other effects keep the global SFX level.
      const level = type === 'balloonPop' ? 0.6 : this.sfxVolume;
      this.playSFXFromPool(path, level);
      return;
    }
    this.playSynthesizedSFX(type);
  }

  private playSFXFromPool(path: string, volume: number): void {
    let pool = this.sfxPool.get(path);
    if (!pool) {
      pool = [];
      for (let i = 0; i < 3; i++) {
        const audio = new Audio(path);
        audio.preload = 'auto';
        pool.push(audio);
      }
      this.sfxPool.set(path, pool);
    }

    const available = pool.find((item) => item.paused || item.ended) || pool[0];
    available.volume = clamp(volume);
    available.currentTime = 0;
    available.play().catch(() => {});
  }

  private playSynthesizedSFX(type: SFXType): void {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      if (type === 'heartPop') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
        gain.gain.setValueAtTime(this.sfxVolume * 0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'fireworkBurst') {
        const bufferSize = ctx.sampleRate * 0.4;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600, now);
        filter.frequency.exponentialRampToValueAtTime(80, now + 0.4);
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(this.sfxVolume * 0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start(now);
      }
    } catch {
      // Sound effects are decorative; never block an interaction if synthesis is unavailable.
    }
  }

  public subscribe(listener: AudioEventListener): () => void {
    this.listeners.add(listener);
    listener(this.state);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener({ ...this.state }));
  }

  public getState(): AudioState {
    return { ...this.state };
  }

  public destroy(): void {
    this.cancelFade();
    if (this.bgAudio) {
      this.bgAudio.pause();
      this.bgAudio.removeAttribute('src');
      this.bgAudio.load();
      this.bgAudio = null;
    }
    this.sfxPool.forEach((pool) => {
      pool.forEach((audio) => {
        audio.pause();
        audio.removeAttribute('src');
        audio.load();
      });
    });
    this.sfxPool.clear();
    this.voiceActive = false;
    this.listeners.clear();
    this.state.isPlaying = false;
    this.state.hasTrack = false;
    if (this.audioCtx && this.audioCtx.state !== 'closed') {
      this.audioCtx.close().catch(() => {});
      this.audioCtx = null;
    }
  }
}

export const audioManager = new AudioManager();
