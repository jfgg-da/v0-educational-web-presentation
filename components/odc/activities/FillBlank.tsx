"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

interface FillBlankProps {
  sentence: string;
  correctAnswer: string;
  feedbackCorrect: string;
  feedbackWrong: string;
  points: number;
  onComplete: (correct: boolean, points: number) => void;
  completed: boolean;
}

export default function FillBlank({
  sentence,
  correctAnswer,
  feedbackCorrect,
  feedbackWrong,
  points,
  onComplete,
  completed,
}: FillBlankProps) {
  const [answer, setAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    if (!answer.trim() || completed || showFeedback) return;
    const correct = answer.trim().toLowerCase() === correctAnswer.toLowerCase();
    setIsCorrect(correct);
    setShowFeedback(true);
    onComplete(correct, correct ? points : 0);
  };

  const parts = sentence.split("_____");

  return (
    <div className="space-y-4">
      <div className="fluid-text-base font-semibold text-foreground leading-relaxed">
        {parts[0]}
        {showFeedback || completed ? (
          <span className={`px-2 py-0.5 rounded font-bold ${isCorrect ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}`}>
            {answer || correctAnswer}
          </span>
        ) : (
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="escribe aquí..."
            className="inline-block w-40 mx-1 px-3 py-1 rounded-lg bg-input border border-white/20 text-foreground
              text-center font-semibold focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            aria-label="Completa el espacio en blanco"
          />
        )}
        {parts[1]}
      </div>

      {!showFeedback && !completed && (
        <button
          onClick={handleSubmit}
          disabled={!answer.trim()}
          className="w-full py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm
            hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all focus-ring min-h-[44px]"
        >
          Verificar respuesta
        </button>
      )}

      {(showFeedback || completed) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl border text-sm leading-relaxed ${
            isCorrect ? "border-green-500/30 bg-green-500/10 text-green-300" : "border-red-500/30 bg-red-500/10 text-red-300"
          }`}
        >
          <div className="flex items-start gap-2">
            {isCorrect ? <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" /> : <XCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />}
            <div>
              <p>{isCorrect ? feedbackCorrect : feedbackWrong}</p>
              {!isCorrect && <p className="mt-1 font-semibold">Respuesta correcta: {correctAnswer}</p>}
            </div>
          </div>
          {isCorrect && <p className="mt-2 font-semibold text-accent">+{points} puntos</p>}
        </motion.div>
      )}
    </div>
  );
}
