"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

interface TrueFalseProps {
  statement: string;
  answer: boolean;
  feedbackTrue: string;
  feedbackFalse: string;
  points: number;
  onComplete: (correct: boolean, points: number) => void;
  completed: boolean;
}

export default function TrueFalse({
  statement,
  answer,
  feedbackTrue,
  feedbackFalse,
  points,
  onComplete,
  completed,
}: TrueFalseProps) {
  const [selected, setSelected] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSelect = (value: boolean) => {
    if (completed || showFeedback) return;
    setSelected(value);
    setShowFeedback(true);
    const correct = value === answer;
    onComplete(correct, correct ? points : 0);
  };

  const isCorrect = selected === answer;

  return (
    <div className="space-y-4">
      <h4 className="fluid-text-base font-semibold text-foreground">{statement}</h4>
      <div className="flex gap-3">
        {[
          { label: "Verdadero", value: true },
          { label: "Falso", value: false },
        ].map((opt) => {
          const isSelected = selected === opt.value;
          const showResult = showFeedback || completed;
          const isAnswer = opt.value === answer;
          let btnClass = "border-white/10 hover:border-white/20";
          if (showResult && isAnswer) btnClass = "border-green-500/60 bg-green-500/10";
          else if (showResult && isSelected && !isAnswer) btnClass = "border-red-500/60 bg-red-500/10";

          return (
            <motion.button
              key={String(opt.value)}
              whileHover={!showResult ? { scale: 1.02 } : {}}
              whileTap={!showResult ? { scale: 0.98 } : {}}
              onClick={() => handleSelect(opt.value)}
              disabled={showResult}
              className={`flex-1 py-4 rounded-xl border font-semibold text-sm transition-all focus-ring min-h-[44px] ${btnClass} disabled:cursor-default`}
            >
              {opt.label}
              {showResult && isAnswer && <CheckCircle2 className="inline ml-2 h-4 w-4 text-green-400" />}
              {showResult && isSelected && !isAnswer && <XCircle className="inline ml-2 h-4 w-4 text-red-400" />}
            </motion.button>
          );
        })}
      </div>

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
            <p>{selected ? feedbackTrue : feedbackFalse}</p>
          </div>
          {isCorrect && <p className="mt-2 font-semibold text-accent">+{points} puntos</p>}
        </motion.div>
      )}
    </div>
  );
}
