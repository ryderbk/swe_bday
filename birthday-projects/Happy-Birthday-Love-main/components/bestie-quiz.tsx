"use client"
// Built by Farhan Alam | github.com/FarhanAlam-Official
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { config } from "@/lib/config"

export function BestieQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const questions = config.quizQuestions

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    const correct = answerIndex === questions[currentQuestion].correct
    setIsCorrect(correct)

    if (correct) {
      setScore((prev) => prev + 1)
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1)
        setSelectedAnswer(null)
        setIsCorrect(null)
      } else {
        setShowResult(true)
      }
    }, 1500)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowResult(false)
    setSelectedAnswer(null)
    setIsCorrect(null)
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-red-700 mb-2">How Well Does My Love Know Me? 🤔</h2>
          <p className="text-red-600">
            {showResult ? "Your final score:" : `Question ${currentQuestion + 1} of ${questions.length}`}
          </p>
        </motion.div>

        <div className="glass rounded-3xl p-8">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-xl font-bold text-red-700 mb-6 text-center">
                  {questions[currentQuestion].question}
                </h3>

                <div className="grid gap-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      className={`w-full p-4 rounded-xl text-left transition-all ${
                        selectedAnswer === null
                          ? "bg-white/50 hover:bg-red-100 text-red-700"
                          : selectedAnswer === index
                            ? isCorrect
                              ? "bg-green-400 text-white"
                              : "bg-red-400 text-white"
                            : index === questions[currentQuestion].correct && selectedAnswer !== null
                              ? "bg-green-400 text-white"
                              : "bg-white/30 text-pink-400"
                      }`}
                      onClick={() => selectedAnswer === null && handleAnswer(index)}
                      disabled={selectedAnswer !== null}
                      whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
                      whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>

                {/* Progress dots */}
                <div className="flex justify-center gap-2 mt-8">
                  {questions.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentQuestion
                            ? "bg-red-600"
                            : index < currentQuestion
                            ? "bg-pink-400"
                            : "bg-red-200"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="text-6xl mb-4">
                  {score === questions.length ? "🎉" : score >= questions.length / 2 ? "❤️" : "🥺"}
                </div>
                <h3 className="text-2xl font-bold text-red-700 mb-2">
                  {score}/{questions.length} Correct!
                </h3>
                <p className="text-red-600 mb-6">
                  {score === questions.length
                    ? "You really are my love! You know me so well! ❤️"
                    : score >= questions.length / 2
                      ? "Not bad! We definitely need more time together ❤️"
                      : "We need to make more memories together, but I still love you ❤️"}
                </p>
                <Button onClick={resetQuiz} className="bg-red-600 hover:bg-red-700 text-white">
                  Try Again
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
