"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import type { ActivityOption } from "@/lib/content.config";

interface MultipleChoiceProps {
  question: string;
  options: ActivityOption[];
  points: number;
  onComplete: (correct: boolean, points: number) => void;
  completed: boolean;
}

export default function MultipleChoice({
  question,
  options,
  points,
  onComplete,
  completed,
}: MultipleChoiceProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSelect = (optionId: string) => {
    if (completed || showFeedback) return;
    setSelected(optionId);
  };

  const handleSubmit = () => {
    if (!selected || completed) return;
    setShowFeedback(true);
    const option = options.find((o) => o.id === selected);
    if (option) {
      onComplete(option.correct, option.correct ? points : 0);
    }
  };

  const selectedOption = options.find((o) => o.id === selected);
  const isCorrect = selectedOption?.correct ?? false;

  return (
    <div className="space-y-4">
      <h4 className="fluid-text-base font-semibold text-foreground">{question}</h4>
      <div className="space-y-2.5" role="radiogroup" aria-label={question}>
        {options.map((option) => {
          const isSelected = selected === option.id;
          const showResult = showFeedback || completed;
          let borderClass = "border-white/10 hover:border-white/20";
          if (showResult && option.correct) borderClass = "border-green-500/60 bg-green-500/10";
          else if (showResult && isSelected && !option.correct) borderClass = "border-red-500/60 bg-red-500/10";
          else if (isSelected) borderClass = "border-primary/60 bg-primary/10";

          return (
            <motion.button
              key={option.id}
              whileHover={!showResult ? { scale: 1.01 } : {}}
              whileTap={!showResult ? { scale: 0.99 } : {}}
              onClick={() => handleSelect(option.id)}
              disabled={showResult}
              className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 min-h-[44px] focus-ring ${borderClass} disabled:cursor-default`}
              role="radio"
              aria-checked={isSelected}
            >
              <span className="flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold mt-0.5"
                style={{
                  borderColor: isSelected ? "var(--color-primary)" : "rgba(255,255,255,0.2)",
                  backgroundColor: isSelected ? "var(--color-primary)" : "transparent",
                  color: isSelected ? "var(--color-primary-foreground)" : "var(--color-foreground)",
                }}
              >
                {option.id.toUpperCase()}
              </span>
              <span className="flex-1 text-sm leading-relaxed">{option.text}</span>
              {showResult && option.correct && <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />}
              {showResult && isSelected && !option.correct && <XCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />}
            </motion.button>
          );
        })}
      </div>

      {!showFeedback && !completed && (
        <button
          onClick={handleSubmit}
          disabled={!selected}
          className="w-full py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm
            hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all focus-ring min-h-[44px]"
        >
          Verificar respuesta
        </button>
      )}

      {(showFeedback || completed) && selectedOption && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl border text-sm leading-relaxed ${
            isCorrect ? "border-green-500/30 bg-green-500/10 text-primary" : "border-red-500/30 bg-red-500/10 text-red-600"
          }`}
        >
          <div className="flex items-start gap-2">
            {isCorrect ? <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" /> : <XCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />}
            <p>{selectedOption.feedback}</p>
          </div>
          {isCorrect && <p className="mt-2 font-semibold text-accent">+{points} puntos</p>}
        </motion.div>
      )}
    </div>
  );
}
