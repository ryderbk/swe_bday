import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff } from 'lucide-react';

interface MicrophoneIntroProps {
  content: {
    enabled: boolean;
    heading: string;
    body: string;
    enableLabel: string;
    skipLabel: string;
    successNote: string;
    deniedNote: string;
  };
  onGranted: (granted: boolean) => void;
}

export const MicrophoneIntro: React.FC<MicrophoneIntroProps> = ({ content, onGranted }) => {
  const calledRef = useRef(false);

  const complete = (granted: boolean) => {
    if (calledRef.current) return;
    calledRef.current = true;
    onGranted(granted);
  };

  const handleEnable = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Stop all tracks immediately — we just wanted permission
      stream.getTracks().forEach((t) => t.stop());
      complete(true);
    } catch {
      complete(false);
    }
  };

  const handleSkip = () => {
    complete(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-midnight px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.7 }}
        className="max-w-md w-full text-center"
      >
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-champagne/10 border border-champagne/30 flex items-center justify-center mx-auto mb-6">
          <Mic className="w-7 h-7 text-champagne" />
        </div>

        {/* Heading */}
        <h2 className="font-serif text-2xl sm:text-3xl text-ivory font-light mb-4">
          {content.heading}
        </h2>

        {/* Body */}
        <p className="font-sans text-sm sm:text-base text-ivory-dark/70 leading-relaxed mb-8 max-w-sm mx-auto">
          {content.body}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleEnable}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-champagne text-midnight font-sans font-semibold text-sm shadow-lg hover:bg-champagne-light transition-colors focus:outline-none focus:ring-2 focus:ring-champagne focus:ring-offset-2 focus:ring-offset-midnight"
          >
            <Mic className="w-4 h-4" />
            {content.enableLabel}
          </button>

          <button
            type="button"
            onClick={handleSkip}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-ivory-dark/70 font-sans text-sm hover:text-ivory hover:border-white/40 transition-colors focus:outline-none focus:ring-2 focus:ring-champagne/40 focus:ring-offset-2 focus:ring-offset-midnight"
          >
            <MicOff className="w-4 h-4" />
            {content.skipLabel}
          </button>
        </div>

        {/* Note */}
        <p className="mt-6 text-xs text-ivory-dark/40 font-sans">
          {content.deniedNote}
        </p>
      </motion.div>
    </div>
  );
};

