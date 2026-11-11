import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Mic, Wind, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioManager } from '../../lib/audio';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';

interface BirthdayCakeProps {
  cake: {
    enabled: boolean;
    title: string;
    message: string;
    blowButtonLabel: string;
    micButtonLabel: string;
    finalMessage: string;
    breathSensitivity: number;
  };
  recipientName?: string;
}

export const BirthdayCake: React.FC<BirthdayCakeProps> = ({ cake }) => {
  if (!cake.enabled) return null;

  const [isExtinguished, setIsExtinguished] = useState(false);
  const [isListeningMic, setIsListeningMic] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const [breathLevel, setBreathLevel] = useState(0); // 0–1

  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const ambientBaselineRef = useRef<number>(0);
  const breathTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stopMicrophone = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (breathTimerRef.current) {
      clearTimeout(breathTimerRef.current);
      breathTimerRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    setIsListeningMic(false);
    setBreathLevel(0);
  };

  useEffect(() => {
    return () => {
      stopMicrophone();
    };
  }, []);

  const handleExtinguish = () => {
    if (isExtinguished) return;
    stopMicrophone();
    setIsExtinguished(true);

    audioManager.playSFX('fireworkBurst');

    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D9B887', '#A96E78', '#F5F0E8', '#FFD1DC', '#FAF7F2'],
        disableForReducedMotion: true,
      });
    } catch {
      // Confetti fallback
    }
  };

  const handleStartMic = async () => {
    if (isExtinguished || isListeningMic) return;
    setMicError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      audioContextRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 2048;
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const bufferLength = analyser.fftSize;
      const dataArray = new Float32Array(bufferLength);
      setIsListeningMic(true);

      // Measure ambient baseline for 500ms
      let baselineSamples: number[] = [];
      const baselineEnd = Date.now() + 500;

      let sustainedAboveThreshold = false;
      let sustainTimerFired = false;

      const checkAudioLevel = () => {
        if (!analyser) return;
        analyser.getFloatTimeDomainData(dataArray);

        // Calculate RMS
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i] * dataArray[i];
        }
        const rms = Math.sqrt(sum / bufferLength);

        const now = Date.now();

        if (now < baselineEnd) {
          baselineSamples.push(rms);
          animFrameRef.current = requestAnimationFrame(checkAudioLevel);
          return;
        }

        if (ambientBaselineRef.current === 0 && baselineSamples.length > 0) {
          ambientBaselineRef.current =
            baselineSamples.reduce((a, b) => a + b, 0) / baselineSamples.length;
        }

        const baseline = ambientBaselineRef.current || 0.005;
        const sensitivity = cake.breathSensitivity ?? 3;
        const threshold = baseline * (1 + sensitivity);

        // Visual level meter (normalize relative to threshold)
        const level = Math.min(1, rms / (threshold * 2));
        setBreathLevel(level);

        const isBlow = rms > threshold;

        if (isBlow && !sustainedAboveThreshold && !sustainTimerFired) {
          sustainedAboveThreshold = true;
          breathTimerRef.current = setTimeout(() => {
            if (sustainedAboveThreshold && !sustainTimerFired) {
              sustainTimerFired = true;
              handleExtinguish();
            }
          }, 400);
        } else if (!isBlow && sustainedAboveThreshold) {
          sustainedAboveThreshold = false;
          if (breathTimerRef.current) {
            clearTimeout(breathTimerRef.current);
            breathTimerRef.current = null;
          }
        }

        if (!sustainTimerFired) {
          animFrameRef.current = requestAnimationFrame(checkAudioLevel);
        }
      };

      checkAudioLevel();
    } catch {
      setMicError("Microphone access unavailable. Tap the button below to blow out candles!");
      stopMicrophone();
    }
  };

  const handleRelight = () => {
    setIsExtinguished(false);
    setMicError(null);
    ambientBaselineRef.current = 0;
  };

  return (
    <div className="relative py-20 px-4 sm:px-6 max-w-xl mx-auto w-full text-center">
      <SectionHeading
        eyebrow="Make A Wish"
        title={cake.title}
        subtitle={cake.message}
        theme="dark"
      />

      {/* SVG Cake Container */}
      <div className="relative my-8 flex flex-col items-center justify-center">
        {/* Cake Illumination */}
        <div
          className={`absolute w-64 h-64 rounded-full transition-opacity duration-1000 blur-3xl pointer-events-none ${
            isExtinguished ? 'opacity-10 bg-champagne/10' : 'opacity-60 bg-champagne/25'
          }`}
        />

        {/* SVG Handcrafted Tiered Cake */}
        <div className="relative w-64 sm:w-72 h-64 select-none">
          <svg viewBox="0 0 300 280" className="w-full h-full drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
            {/* Bottom Tier */}
            <path
              d="M30 230 C30 215 270 215 270 230 L270 265 C270 280 30 280 30 265 Z"
              fill="#F2EBE0"
              stroke="#D9B887"
              strokeWidth="2"
            />
            {/* Bottom Tier Frosting */}
            <path
              d="M30 230 Q50 245 70 230 Q90 248 110 230 Q130 246 150 230 Q170 248 190 230 Q210 246 230 230 Q250 248 270 230"
              fill="#A96E78"
            />
            {/* Bottom Tier decoration */}
            <path
              d="M50 255 C75 265 100 250 125 260 C150 270 175 255 200 265 C225 275 250 255 250 255"
              stroke="#A96E78"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />

            {/* Top Tier */}
            <path
              d="M80 125 C80 112 220 112 220 125 L220 175 C220 188 80 188 80 175 Z"
              fill="#F2EBE0"
              stroke="#D9B887"
              strokeWidth="2"
            />
            {/* Top Tier Frosting Drips */}
            <path
              d="M80 132 Q95 145 110 132 Q125 148 140 132 Q155 146 170 132 Q185 148 200 132 Q210 145 220 132"
              fill="#A96E78"
            />

            {/* Candle 1 (Left) */}
            <rect x="105" y="80" width="8" height="35" rx="3" fill="#D9B887" />
            {/* Candle 2 (Center) */}
            <rect x="146" y="70" width="8" height="45" rx="3" fill="#A96E78" />
            {/* Candle 3 (Right) */}
            <rect x="187" y="80" width="8" height="35" rx="3" fill="#D9B887" />

            {/* Candle Wicks */}
            <line x1="109" y1="80" x2="109" y2="73" stroke="#55414C" strokeWidth="2" />
            <line x1="150" y1="70" x2="150" y2="63" stroke="#55414C" strokeWidth="2" />
            <line x1="191" y1="80" x2="191" y2="73" stroke="#55414C" strokeWidth="2" />

            {/* Flames or Smoke */}
            {!isExtinguished ? (
              <g className="animate-flame">
                <ellipse cx="109" cy="65" rx="5" ry="9" fill="#FFC845" filter="drop-shadow(0 0 6px #FFA500)" />
                <ellipse cx="109" cy="66" rx="2.5" ry="5" fill="#FFF7CC" />

                <ellipse cx="150" cy="54" rx="6" ry="11" fill="#FFC845" filter="drop-shadow(0 0 8px #FFA500)" />
                <ellipse cx="150" cy="55" rx="3" ry="6" fill="#FFF7CC" />

                <ellipse cx="191" cy="65" rx="5" ry="9" fill="#FFC845" filter="drop-shadow(0 0 6px #FFA500)" />
                <ellipse cx="191" cy="66" rx="2.5" ry="5" fill="#FFF7CC" />
              </g>
            ) : (
              <g className="animate-smoke">
                <path d="M109 70 Q106 60 112 50 Q116 42 110 35" stroke="rgba(245, 240, 232, 0.6)" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M150 60 Q154 50 148 40 Q144 32 152 22" stroke="rgba(245, 240, 232, 0.7)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M191 70 Q194 60 188 50 Q184 42 192 35" stroke="rgba(245, 240, 232, 0.6)" strokeWidth="2" fill="none" strokeLinecap="round" />
              </g>
            )}
          </svg>
        </div>

        {/* Mic level meter */}
        {isListeningMic && !isExtinguished && (
          <div className="mt-2 w-40 h-2 rounded-full bg-midnight/40 overflow-hidden border border-champagne/20">
            <motion.div
              className="h-full rounded-full bg-champagne"
              animate={{ width: `${breathLevel * 100}%` }}
              transition={{ duration: 0.05 }}
            />
          </div>
        )}

        {/* Action Controls */}
        <div className="mt-6 flex flex-col items-center gap-3">
          {!isExtinguished ? (
            <>
              <Button
                variant="gold"
                size="lg"
                onClick={handleExtinguish}
                icon={<Wind className="w-5 h-5 text-midnight" />}
              >
                {cake.blowButtonLabel}
              </Button>

              <button
                type="button"
                onClick={handleStartMic}
                disabled={isListeningMic}
                className="inline-flex items-center gap-1.5 text-xs text-champagne/70 hover:text-champagne transition-colors mt-2 disabled:opacity-50"
              >
                <Mic className="w-3.5 h-3.5" />
                <span>
                  {isListeningMic
                    ? 'Listening — blow gently now...'
                    : cake.micButtonLabel}
                </span>
              </button>

              {micError && (
                <p className="text-xs text-rose-soft mt-1 max-w-xs">{micError}</p>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <div className="p-6 rounded-2xl bg-midnight-surface/90 border border-champagne/30 shadow-xl max-w-md mb-4 text-center">
                <Sparkles className="w-6 h-6 text-champagne mx-auto mb-2" />
                <p className="font-serif text-2xl text-ivory mb-2 font-light">
                  Wish Made! ✨
                </p>
                <p className="font-handwriting text-xl sm:text-2xl text-champagne leading-snug">
                  "{cake.finalMessage}"
                </p>
              </div>

              <Button
                variant="secondary"
                size="sm"
                onClick={handleRelight}
                icon={<RotateCcw className="w-3.5 h-3.5" />}
              >
                Relight Candles
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
