"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import type { ContentConfig, AssessmentQuestion } from "@/lib/content.config";

interface AssessmentScreenProps {
  assessment: ContentConfig["assessment"];
  passingScore: number;
  onComplete: (score: number, maxScore: number, passed: boolean) => void;
  onRetry: () => void;
}

export default function AssessmentScreen({ assessment, passingScore, onComplete, onRetry }: AssessmentScreenProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const confettiRef = useRef(false);

  const questions = assessment.questions;
  const question = questions[currentQ];
  const maxScore = questions.reduce((sum, q) => sum + q.points, 0);

  const handleConfirm = () => {
    if (!selected) return;
    setConfirmed(true);
    setAnswers((prev) => ({ ...prev, [question.id]: selected }));
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((prev) => prev + 1);
      setSelected(null);
      setConfirmed(false);
    } else {
      setShowResults(true);
    }
  };

  const calcScore = () => {
    let score = 0;
    for (const q of questions) {
      const ans = answers[q.id];
      if (q.options) {
        const option = q.options.find((o) => o.id === ans);
        if (option?.correct) score += q.points;
      }
    }
    return score;
  };

  const score = showResults ? calcScore() : 0;
  const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  const passed = percentage >= passingScore;

  useEffect(() => {
    if (showResults && !confettiRef.current) {
      confettiRef.current = true;
      onComplete(score, maxScore, passed);
      if (passed) {
        import("canvas-confetti").then((mod) => {
          const confetti = mod.default;
          confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
        });
      }
    }
  }, [showResults, score, maxScore, passed, onComplete]);

  const selectedOption = question?.options?.find((o) => o.id === selected);

  if (showResults) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full space-y-6"
        >
          <div className={`glass-card p-8 text-center ${passed ? "border-green-500/30" : "border-red-500/30"}`}>
            <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${passed ? "bg-green-500/20" : "bg-red-500/20"}`}>
              {passed ? <CheckCircle2 className="h-10 w-10 text-green-400" /> : <XCircle className="h-10 w-10 text-red-400" />}
            </div>
            <h2 className="fluid-text-2xl font-bold text-foreground mb-2">
              {passed ? "Aprobado" : "No aprobado"}
            </h2>
            <p className="text-3xl font-bold mb-2">
              <span className={passed ? "text-green-400" : "text-red-400"}>{percentage}%</span>
            </p>
            <p className="text-base font-semibold text-foreground mb-4">
              {score} de {maxScore} puntos
            </p>
            <p className="text-base text-foreground leading-relaxed">
              {passed ? assessment.passingMessage : assessment.failingMessage}
            </p>
          </div>

          {/* Per-question review */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-muted-foreground uppercase tracking-wider">Revisión de respuestas</h3>
            {questions.map((q, i) => {
              const ans = answers[q.id];
              const opt = q.options?.find((o) => o.id === ans);
              const correct = opt?.correct ?? false;
              return (
                <div key={q.id} className={`glass-card p-4 text-base border ${correct ? "border-green-500/20" : "border-red-500/20"}`}>
                  <div className="flex items-start gap-2">
                    {correct ? <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" /> : <XCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />}
                    <div>
                      <p className="font-semibold text-foreground/90">Pregunta {i + 1}: {q.question}</p>
                      <p className="text-foreground/80 italic mt-1">{opt?.feedback}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {!passed && (
            <button
              onClick={onRetry}
              className="w-full py-3 rounded-full bg-primary text-primary-foreground font-semibold text-base
                hover:opacity-90 transition-all focus-ring min-h-[44px] flex items-center justify-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Intentar de nuevo (Reiniciar puntaje)
            </button>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div
        key={currentQ}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl w-full space-y-6"
      >
        <div className="text-center">
          <h2 className="fluid-text-xl font-bold text-foreground mb-2">{assessment.title}</h2>
          <p className="text-sm text-muted-foreground">{assessment.instructions}</p>
          <div className="flex items-center justify-center gap-2 mt-3">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`w-8 h-1.5 rounded-full transition-colors ${
                  i < currentQ ? "bg-primary" : i === currentQ ? "bg-accent" : "bg-secondary"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Pregunta {currentQ + 1} de {questions.length} &middot; {question.points} puntos
          </p>
        </div>

        <div className="glass-card p-6 space-y-4">
          <h3 className="fluid-text-base font-semibold text-foreground">{question.question}</h3>

          <div className="space-y-2.5" role="radiogroup">
            {question.options?.map((option) => {
              const isSelected = selected === option.id;
              const showResult = confirmed;
              let borderClass = "border-white/10 hover:border-white/20";
              if (showResult && option.correct) borderClass = "border-green-500/60 bg-green-500/10";
              else if (showResult && isSelected && !option.correct) borderClass = "border-red-500/60 bg-red-500/10";
              else if (isSelected) borderClass = "border-primary/60 bg-primary/10";

              return (
                <motion.button
                  key={option.id}
                  whileHover={!confirmed ? { scale: 1.01 } : {}}
                  onClick={() => !confirmed && setSelected(option.id)}
                  disabled={confirmed}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 min-h-[44px] focus-ring ${borderClass} disabled:cursor-default`}
                  role="radio"
                  aria-checked={isSelected}
                >
                  <span
                    className="flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold mt-0.5"
                    style={{
                      borderColor: isSelected ? "var(--color-primary)" : "rgba(255,255,255,0.2)",
                      backgroundColor: isSelected ? "var(--color-primary)" : "transparent",
                      color: isSelected ? "var(--color-primary-foreground)" : "var(--color-foreground)",
                    }}
                  >
                    {option.id.toUpperCase()}
                  </span>
                  <span className="flex-1 text-base leading-relaxed">{option.text}</span>
                  {showResult && option.correct && <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />}
                  {showResult && isSelected && !option.correct && <XCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />}
                </motion.button>
              );
            })}
          </div>

          {confirmed && selectedOption && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl border text-base leading-relaxed ${
                selectedOption.correct ? "border-green-500/30 bg-green-500/10 text-green-800" : "border-red-500/30 bg-red-500/10 text-red-600"
              }`}
            >
              <p>{selectedOption.feedback}</p>
            </motion.div>
          )}
        </div>

        {!confirmed ? (
          <button
            onClick={handleConfirm}
            disabled={!selected}
            className="w-full py-3 rounded-full bg-primary text-primary-foreground font-semibold text-base
              hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all focus-ring min-h-[44px]"
          >
            Confirmar respuesta
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full py-3 rounded-full bg-accent text-accent-foreground font-semibold text-base
              hover:opacity-90 transition-all focus-ring min-h-[44px]"
          >
            {currentQ < questions.length - 1 ? "Siguiente pregunta" : "Ver resultados"}
          </button>
        )}
      </motion.div>
    </div>
  );
}
