import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import { ChatMessage } from '../../data/birthdayContent';
import { audioManager } from '../../lib/audio';
import { Button } from '../ui/Button';

interface BirthdayChatPreludeProps {
  contactName: string;
  statusText: string;
  messages: ChatMessage[];
  continueLabel: string;
  onComplete: () => void;
}

export const BirthdayChatPrelude: React.FC<BirthdayChatPreludeProps> = ({
  contactName,
  statusText,
  messages,
  continueLabel,
  onComplete,
}) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (visibleCount < messages.length) {
      const nextMessage = messages[visibleCount];
      const timer = setTimeout(() => {
        setIsTyping(true);
        audioManager.playSFX('typing');
        const showTimer = setTimeout(() => {
          setVisibleCount((prev) => prev + 1);
          setIsTyping(false);
        }, 700);
        return () => clearTimeout(showTimer);
      }, nextMessage.delayMs);

      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
    }
  }, [visibleCount, messages]);

  const allShown = visibleCount >= messages.length;

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 bg-midnight text-ivory overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-rose-muted/10 blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-sm flex flex-col items-center"
      >
        {/* Smartphone Mockup Frame */}
        <div className="w-full bg-[#1A1622] rounded-[38px] border-4 border-[#3D3447] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col h-[560px] sm:h-[600px] relative">
          {/* Top Speaker Notch & Camera */}
          <div className="w-full bg-[#1A1622] pt-3 pb-2 flex justify-center items-center relative z-20">
            <div className="w-24 h-4 bg-[#100D16] rounded-full flex items-center justify-center gap-2 px-3">
              <div className="w-2 h-2 rounded-full bg-[#201C2B]" />
              <div className="w-8 h-1 bg-[#201C2B] rounded-full" />
            </div>
          </div>

          {/* Chat Header */}
          <div className="bg-[#241F2F] px-4 py-3 flex items-center gap-3 border-b border-champagne/15 z-10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-muted to-champagne flex items-center justify-center text-midnight font-bold shadow-md">
              <Heart className="w-5 h-5 fill-midnight text-midnight" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-lg text-ivory font-medium truncate">
                {contactName}
              </h3>
              <p className="text-[11px] text-champagne/80 flex items-center gap-1.5 font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{statusText}</span>
              </p>
            </div>
          </div>

          {/* Chat Bubble Scrollable Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 flex flex-col justify-end bg-gradient-to-b from-[#15121C] to-[#1C1826]">
            {messages.slice(0, visibleCount).map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.35 }}
                className={`flex ${
                  msg.sender === 'bharath' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-md font-sans ${
                    msg.sender === 'bharath'
                      ? 'bg-rose-muted text-white rounded-br-xs'
                      : 'bg-[#2A2436] text-ivory-light rounded-bl-xs border border-champagne/20'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
              </motion.div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-[#2A2436] px-3.5 py-2 rounded-2xl rounded-bl-xs flex items-center gap-1.5 border border-champagne/15 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </motion.div>
            )}
          </div>

          {/* Bottom Decorative Input Bar / Continue Bar */}
          <div className="bg-[#241F2F] p-3 border-t border-champagne/15 flex items-center gap-2">
            <div className="flex-1 bg-[#1A1622] rounded-full px-4 py-2 text-xs text-ivory-dark/60 font-sans truncate">
              Special message for you...
            </div>
            <div className="w-8 h-8 rounded-full bg-rose-muted/30 text-champagne flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Action Button - Appears when messages complete */}
        <div className="mt-8 flex justify-center w-full">
          <AnimatePresence>
            {allShown ? (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Button
                  variant="gold"
                  size="lg"
                  onClick={onComplete}
                  icon={<ArrowRight className="w-4 h-4 text-midnight" />}
                  iconPosition="right"
                >
                  {continueLabel}
                </Button>
              </motion.div>
            ) : (
              <button
                type="button"
                onClick={onComplete}
                className="text-xs text-champagne/60 hover:text-champagne font-sans transition-colors py-2"
              >
                Skip chat &rarr;
              </button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

