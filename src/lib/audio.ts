// Central audio & sound effects engine for A Little Universe for Saiswetha
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
  | 'fireworkBurst'
  | 'typing';

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
  private lastTypingSoundTime: number = 0;

  private sfxPaths: Record<SFXType, string> = {
    balloonPop: '/audio/sfx/balloon-pop.mp3',
    heartPop: '/audio/sfx/heart-pop.mp3',
    giftOpen: '/audio/sfx/gift-open.mp3',
    whoosh: '',
    reveal: '',
    fireworkLaunch: '',
    fireworkBurst: '',
    typing: '',
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

    if (this.bgAudio) {
      this.bgAudio.pause();
      this.bgAudio.src = '';
    }

    try {
      this.bgAudio = new Audio(src);
      this.bgAudio.loop = true;
      this.bgAudio.volume = this.isMuted ? 0 : this.volume;

      // Explicit loop fallback ensuring track loops forever
      this.bgAudio.addEventListener('ended', () => {
        if (this.bgAudio) {
          this.bgAudio.currentTime = 0;
          this.bgAudio.play().catch(() => {});
        }
      });

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

  public toggleSFXMute(): void {
    this.sfxMuted = !this.sfxMuted;
    this.state.sfxMuted = this.sfxMuted;
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

  public setSFXVolume(vol: number): void {
    this.sfxVolume = Math.max(0, Math.min(1, vol));
    this.state.sfxVolume = this.sfxVolume;
    this.notify();
  }

  public handleVoiceStart(): void {
    this.wasPlayingBeforeVoice = this.state.isPlaying;
    if (this.bgAudio && this.state.isPlaying) {
      this.bgAudio.pause();
    }
  }

  public handleVoiceEnd(): void {
    if (this.wasPlayingBeforeVoice && this.bgAudio && this.state.hasTrack) {
      this.playBackground();
    }
  }

  /**
   * Plays a short sound effect with automatic local file fallback to Web Audio synthesis
   */
  public playSFX(type: SFXType): void {
    if (this.sfxMuted) return;

    // Rate-limit typing sound
    if (type === 'typing') {
      const now = Date.now();
      if (now - this.lastTypingSoundTime < 80) return;
      this.lastTypingSoundTime = now;
    }

    const filePath = this.sfxPaths[type];
    if (filePath) {
      // Try HTML5 Audio with pool
      let pool = this.sfxPool.get(type);
      if (!pool) {
        pool = [];
        this.sfxPool.set(type, pool);
      }

      let audio = pool.find((a) => a.paused || a.ended);
      if (!audio) {
        if (pool.length < 5) {
          audio = new Audio(filePath);
          pool.push(audio);
        } else {
          audio = pool[0];
        }
      }

      if (audio) {
        audio.volume = this.sfxVolume;
        audio.currentTime = 0;
        audio.play().catch(() => {
          this.synthesizeSFX(type);
        });
        return;
      }
    }

    // Default to clean synthesized Web Audio fallback
    this.synthesizeSFX(type);
  }

  /**
   * Lightweight synthesized Web Audio fallbacks for clicks, whooshes, and chimes
   */
  private synthesizeSFX(type: SFXType) {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(this.sfxVolume * 0.35, now);
      gain.connect(ctx.destination);

      const osc = ctx.createOscillator();

      switch (type) {
        case 'balloonPop':
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(420, now);
          osc.frequency.exponentialRampToValueAtTime(80, now + 0.08);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
          osc.connect(gain);
          osc.start(now);
          osc.stop(now + 0.09);
          break;

        case 'heartPop':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(587.33, now); // D5
          osc.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
          osc.connect(gain);
          osc.start(now);
          osc.stop(now + 0.23);
          break;

        case 'giftOpen':
        case 'reveal':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(440, now);
          osc.frequency.exponentialRampToValueAtTime(880, now + 0.3);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
          osc.connect(gain);
          osc.start(now);
          osc.stop(now + 0.46);
          break;

        case 'typing':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(800, now);
          gain.gain.setValueAtTime(this.sfxVolume * 0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
          osc.connect(gain);
          osc.start(now);
          osc.stop(now + 0.035);
          break;

        case 'fireworkLaunch':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(200, now);
          osc.frequency.exponentialRampToValueAtTime(750, now + 0.4);
          gain.gain.setValueAtTime(this.sfxVolume * 0.2, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
          osc.connect(gain);
          osc.start(now);
          osc.stop(now + 0.46);
          break;

        case 'fireworkBurst':
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(140, now);
          osc.frequency.exponentialRampToValueAtTime(40, now + 0.35);
          gain.gain.setValueAtTime(this.sfxVolume * 0.35, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
          osc.connect(gain);
          osc.start(now);
          osc.stop(now + 0.36);
          break;

        default:
          break;
      }
    } catch {
      // Audio synthesis silenced safely
    }
  }

  private fadeIn(targetVolume?: number): void {
    if (this.fadeInterval) window.clearInterval(this.fadeInterval);
    const target = this.isMuted ? 0 : (targetVolume ?? this.volume);
    let cur = 0;
    const step = 0.05;

    this.fadeInterval = window.setInterval(() => {
      if (!this.bgAudio) {
        if (this.fadeInterval) window.clearInterval(this.fadeInterval);
        return;
      }
      cur = Math.min(target, cur + step);
      this.bgAudio.volume = cur;
      if (cur >= target) {
        if (this.fadeInterval) window.clearInterval(this.fadeInterval);
        this.fadeInterval = null;
      }
    }, 50);
  }

  private fadeOut(callback?: () => void): void {
    if (this.fadeInterval) window.clearInterval(this.fadeInterval);
    if (!this.bgAudio) {
      callback?.();
      return;
    }
    let cur = this.bgAudio.volume;
    const step = 0.08;

    this.fadeInterval = window.setInterval(() => {
      if (!this.bgAudio) {
        if (this.fadeInterval) window.clearInterval(this.fadeInterval);
        callback?.();
        return;
      }
      cur = Math.max(0, cur - step);
      this.bgAudio.volume = cur;
      if (cur <= 0) {
        if (this.fadeInterval) window.clearInterval(this.fadeInterval);
        this.fadeInterval = null;
        callback?.();
      }
    }, 40);
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

  public destroy(): void {
    if (this.fadeInterval) window.clearInterval(this.fadeInterval);
    if (this.bgAudio) {
      this.bgAudio.pause();
      this.bgAudio.src = '';
      this.bgAudio = null;
    }
    this.sfxPool.forEach((pool) => {
      pool.forEach((a) => {
        a.pause();
        a.src = '';
      });
    });
    this.sfxPool.clear();
    if (this.audioCtx) {
      this.audioCtx.close().catch(() => {});
      this.audioCtx = null;
    }
    this.listeners.clear();
  }
}

export const audioManager = new AudioManager();
