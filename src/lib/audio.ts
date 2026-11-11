// Central audio & sound effects engine for A Little Universe for Swethu
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

class AudioManager {
  private bgAudio: HTMLAudioElement | null = null;
  private sfxPool: Map<string, HTMLAudioElement[]> = new Map();
  private listeners: Set<AudioEventListener> = new Set();
  private volume: number = 0.6;
  private sfxVolume: number = 0.5;
  private isMuted: boolean = false;
  private sfxMuted: boolean = false;
  private wasPlayingBeforeVoice: boolean = false;
  private fadeInterval: number | null = null;
  private audioCtx: AudioContext | null = null;

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
    volume: 0.6,
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
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  public initBackgroundMusic(src: string, label?: string) {
    if (!src) {
      this.state.hasTrack = false;
      this.notify();
      return;
    }

    // Keep existing audio element alive if same track is already initialized
    if (this.bgAudio && this.bgAudio.src.endsWith(src)) {
      return;
    }

    if (this.bgAudio) {
      this.bgAudio.pause();
      this.bgAudio.src = '';
    }

    try {
      this.bgAudio = new Audio(src);
      this.bgAudio.loop = true;
      this.bgAudio.volume = this.isMuted ? 0 : this.volume;

      this.bgAudio.addEventListener('play', () => {
        this.state.isPlaying = true;
        this.notify();
      });

      this.bgAudio.addEventListener('pause', () => {
        this.state.isPlaying = false;
        this.notify();
      });

      this.bgAudio.addEventListener('error', () => {
        this.state.isPlaying = false;
        this.state.hasTrack = false;
        this.notify();
      });

      this.state.hasTrack = true;
      this.state.trackLabel = label || 'Background Music';
      this.notify();
    } catch {
      this.state.hasTrack = false;
      this.notify();
    }
  }

  public configureSFXPaths(paths: Partial<Record<SFXType, string>>) {
    this.sfxPaths = { ...this.sfxPaths, ...paths };
  }

  public async playBackground(): Promise<void> {
    if (!this.bgAudio || !this.state.hasTrack) return;
    // Idempotent: don't restart or reset volume if already playing
    if (this.state.isPlaying && !this.bgAudio.paused) return;

    try {
      this.bgAudio.volume = 0;
      await this.bgAudio.play();
      this.fadeIn();
    } catch {
      this.state.isPlaying = false;
      this.notify();
    }
  }

  public pauseBackground(): void {
    if (!this.bgAudio) return;
    this.fadeOut(() => {
      this.bgAudio?.pause();
    });
  }

  public pauseForVoice(): void {
    if (!this.bgAudio) return;
    this.wasPlayingBeforeVoice = this.state.isPlaying && !this.bgAudio.paused;
    if (this.wasPlayingBeforeVoice) {
      this.pauseBackground();
    }
  }

  public resumeAfterVoice(): void {
    if (this.wasPlayingBeforeVoice) {
      this.playBackground().catch(() => {});
      this.wasPlayingBeforeVoice = false;
    }
  }

  public togglePlay(): void {
    if (!this.bgAudio || !this.state.hasTrack) return;
    if (this.state.isPlaying) {
      this.pauseBackground();
    } else {
      this.playBackground();
    }
  }

  public toggleMute(): void {
    this.isMuted = !this.isMuted;
    this.state.isMuted = this.isMuted;
    if (this.bgAudio) {
      this.bgAudio.volume = this.isMuted ? 0 : this.volume;
    }
    this.notify();
  }

  public setVolume(vol: number): void {
    this.volume = Math.max(0, Math.min(1, vol));
    this.state.volume = this.volume;
    if (this.bgAudio && !this.isMuted) {
      this.bgAudio.volume = this.volume;
    }
    this.notify();
  }

  public toggleSFXMute(): void {
    this.sfxMuted = !this.sfxMuted;
    this.state.sfxMuted = this.sfxMuted;
    this.notify();
  }

  private fadeIn(durationMs: number = 1000): void {
    if (!this.bgAudio || this.isMuted) return;
    if (this.fadeInterval) clearInterval(this.fadeInterval);

    const targetVolume = this.volume;
    const steps = 20;
    const stepTime = durationMs / steps;
    const volumeStep = targetVolume / steps;
    let currentVol = 0;
    this.bgAudio.volume = 0;

    this.fadeInterval = window.setInterval(() => {
      currentVol = Math.min(targetVolume, currentVol + volumeStep);
      if (this.bgAudio) {
        this.bgAudio.volume = currentVol;
      }
      if (currentVol >= targetVolume) {
        if (this.fadeInterval) clearInterval(this.fadeInterval);
        this.fadeInterval = null;
      }
    }, stepTime);
  }

  private fadeOut(callback?: () => void, durationMs: number = 600): void {
    if (!this.bgAudio) {
      callback?.();
      return;
    }
    if (this.fadeInterval) clearInterval(this.fadeInterval);

    const initialVolume = this.bgAudio.volume;
    const steps = 15;
    const stepTime = durationMs / steps;
    const volumeStep = initialVolume / steps;
    let currentVol = initialVolume;

    this.fadeInterval = window.setInterval(() => {
      currentVol = Math.max(0, currentVol - volumeStep);
      if (this.bgAudio) {
        this.bgAudio.volume = currentVol;
      }
      if (currentVol <= 0) {
        if (this.fadeInterval) clearInterval(this.fadeInterval);
        this.fadeInterval = null;
        callback?.();
      }
    }, stepTime);
  }

  public playSFX(type: SFXType): void {
    if (this.sfxMuted) return;

    const path = this.sfxPaths[type];
    if (path) {
      this.playSFXFromPool(path);
      return;
    }

    // Programmatic Web Audio API synthesizers
    this.playSynthesizedSFX(type);
  }

  private playSFXFromPool(path: string): void {
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

    const available = pool.find((a) => a.paused || a.ended) || pool[0];
    available.volume = this.sfxVolume;
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
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
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
      // Audio synthesis fallback
    }
  }

  public subscribe(listener: AudioEventListener): () => void {
    this.listeners.add(listener);
    listener(this.state);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener({ ...this.state }));
  }

  public getState(): AudioState {
    return { ...this.state };
  }

  public destroy(): void {
    if (this.fadeInterval) clearInterval(this.fadeInterval);
    if (this.bgAudio) {
      this.bgAudio.pause();
      this.bgAudio.src = '';
      this.bgAudio = null;
    }
    this.sfxPool.clear();
    this.listeners.clear();
    if (this.audioCtx && this.audioCtx.state !== 'closed') {
      this.audioCtx.close().catch(() => {});
      this.audioCtx = null;
    }
  }
}

export const audioManager = new AudioManager();
