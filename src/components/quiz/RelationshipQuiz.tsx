import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Heart, Sparkles, RotateCcw, ArrowRight } from 'lucide-react';
import { QuizQuestion } from '../../data/birthdayContent';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';

interface RelationshipQuizProps {
  quiz: QuizQuestion[];
  recipientName: string;
}

export const RelationshipQuiz: React.FC<RelationshipQuizProps> = ({
  quiz,
  recipientName,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!quiz || quiz.length === 0) return null;

  const currentQ = quiz[currentIdx];

  const handleSelect = (idx: number) => {
    if (selectedOption !== null) return; // Prevent double select
    setSelectedOption(idx);
    if (idx === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < quiz.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <section id="quiz" className="relative py-20 px-4 sm:px-6 max-w-2xl mx-auto w-full">
      <SectionHeading
        eyebrow="Playful Memories"
        title="How Well Do You Know Us?"
        subtitle="A quick, sweet little quiz made with love. No wrong answers in my heart!"
        theme="dark"
      />

      <div className="relative rounded-3xl bg-midnight-surface/80 border border-champagne/25 p-6 sm:p-8 shadow-xl backdrop-blur-md">
        <AnimatePresence mode="wait">
          {!isCompleted ? (
            <motion.div
              key={currentQ.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col"
            >
              {/* Progress Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs uppercase tracking-widest text-champagne">
                  Question {currentIdx + 1} of {quiz.length}
                </span>
                <div className="flex items-center gap-1">
                  {quiz.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === currentIdx
                          ? 'w-6 bg-champagne'
                          : i < currentIdx
                          ? 'w-3 bg-rose-muted'
                          : 'w-2 bg-white/10'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Question Text */}
              <h3 className="font-serif text-2xl sm:text-3xl text-ivory font-light leading-snug mb-6">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="space-y-3 mb-6" role="radiogroup">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = selectedOption === optIdx;
                  const isAnswered = selectedOption !== null;
                  const isCorrect = optIdx === currentQ.correctIndex;

                  let optionStyle =
                    'border-white/10 bg-midnight/60 text-ivory-dark hover:border-champagne/40 hover:bg-midnight/90';

                  if (isAnswered) {
                    if (isCorrect) {
                      optionStyle = 'border-champagne bg-champagne/15 text-champagne-light shadow-glow-champagne';
                    } else if (isSelected) {
                      optionStyle = 'border-rose-muted bg-rose-muted/15 text-rose-soft';
                    } else {
                      optionStyle = 'border-white/5 bg-midnight/30 text-ivory-dark/40';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={isAnswered}
                      onClick={() => handleSelect(optIdx)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3 text-sm sm:text-base font-sans min-h-[48px] focus:outline-none focus:ring-2 focus:ring-champagne ${optionStyle}`}
                    >
                      <span className="font-medium">{opt}</span>
                      {isAnswered && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-champagne shrink-0" />
                      )}
                      {isAnswered && isSelected && !isCorrect && (
                        <Heart className="w-5 h-5 text-rose-muted shrink-0 fill-rose-muted" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback and Explanation */}
              {selectedOption !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-champagne/10 border border-champagne/20 mb-6"
                >
                  <p className="font-handwriting text-xl text-champagne-light leading-relaxed">
                    {currentQ.explanation}
                  </p>
                </motion.div>
              )}

              {/* Next Button */}
              {selectedOption !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-end"
                >
                  <Button
                    variant="gold"
                    size="md"
                    onClick={handleNext}
                    icon={<ArrowRight className="w-4 h-4 text-midnight" />}
                    iconPosition="right"
                  >
                    {currentIdx < quiz.length - 1 ? 'Next Question' : 'See Results'}
                  </Button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            /* Quiz Completed View */
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-6 flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-champagne/20 text-champagne flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8" />
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-ivory font-light mb-2">
                You scored {score} of {quiz.length}!
              </h3>

              <p className="font-handwriting text-2xl text-champagne mb-4">
                You know us so beautifully, {recipientName} 🤍
              </p>

              <p className="font-sans text-sm sm:text-base text-ivory-dark/80 max-w-md mx-auto mb-8 font-light leading-relaxed">
                No matter what the numbers say, you will always be Bharath's favourite person in every lifetime. Thank you for making every memory so precious.
              </p>

              <Button
                variant="secondary"
                size="md"
                onClick={handleReset}
                icon={<RotateCcw className="w-4 h-4" />}
              >
                Play Again
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

