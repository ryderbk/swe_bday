type AudioEventListener = (state: AudioState) => void;

export interface AudioState {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  hasTrack: boolean;
  trackLabel?: string;
}

class AudioManager {
  private bgAudio: HTMLAudioElement | null = null;
  private listeners: Set<AudioEventListener> = new Set();
  private volume: number = 0.6;
  private isMuted: boolean = false;
  private wasPlayingBeforeVoice: boolean = false;
  private fadeInterval: number | null = null;

  private state: AudioState = {
    isPlaying: false,
    isMuted: false,
    volume: 0.6,
    hasTrack: false,
    trackLabel: '',
  };

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

      this.bgAudio.addEventListener('play', () => {
        this.state.isPlaying = true;
        this.notify();
      });

      this.bgAudio.addEventListener('pause', () => {
        this.state.isPlaying = false;
        this.notify();
      });

      this.bgAudio.addEventListener('error', (e) => {
        console.warn('Background audio failed to load or play:', e);
        this.state.isPlaying = false;
        this.state.hasTrack = false;
        this.notify();
      });

      this.state.hasTrack = true;
      this.state.trackLabel = label || 'Background Music';
      this.notify();
    } catch (err) {
      console.warn('Could not initialize audio:', err);
      this.state.hasTrack = false;
      this.notify();
    }
  }

  public async playBackground(): Promise<void> {
    if (!this.bgAudio || !this.state.hasTrack) return;
    try {
      // Fade in gently
      this.bgAudio.volume = 0;
      await this.bgAudio.play();
      this.fadeIn();
    } catch (err) {
      console.warn('Audio play request blocked or failed:', err);
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

  public setVolume(vol: number): void {
    this.volume = Math.max(0, Math.min(1, vol));
    this.state.volume = this.volume;
    if (this.bgAudio && !this.isMuted) {
      this.bgAudio.volume = this.volume;
    }
    this.notify();
  }

  /**
   * Called when voice message starts playing to duck or pause background music
   */
  public handleVoiceStart(): void {
    this.wasPlayingBeforeVoice = this.state.isPlaying;
    if (this.bgAudio && this.state.isPlaying) {
      // Duck to 15% or pause gently
      this.bgAudio.pause();
    }
  }

  /**
   * Called when voice message ends or pauses
   */
  public handleVoiceEnd(): void {
    if (this.wasPlayingBeforeVoice && this.bgAudio && this.state.hasTrack) {
      this.playBackground();
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
    this.listeners.clear();
  }
}

export const audioManager = new AudioManager();
