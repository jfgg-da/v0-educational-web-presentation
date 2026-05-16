"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, ArrowUp, ArrowDown } from "lucide-react";
import type { OrderingStep } from "@/lib/content.config";

interface OrderingProps {
  question: string;
  steps: OrderingStep[];
  points: number;
  onComplete: (correct: boolean, points: number) => void;
  completed: boolean;
}

export default function Ordering({
  question,
  steps,
  points,
  onComplete,
  completed,
}: OrderingProps) {
  const [items, setItems] = useState<OrderingStep[]>(() =>
    [...steps].sort(() => Math.random() - 0.5)
  );
  const [showFeedback, setShowFeedback] = useState(false);

  const moveItem = useCallback(
    (index: number, direction: "up" | "down") => {
      if (completed || showFeedback) return;
      const newItems = [...items];
      const newIndex = direction === "up" ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= newItems.length) return;
      [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];
      setItems(newItems);
    },
    [items, completed, showFeedback]
  );

  const handleSubmit = () => {
    setShowFeedback(true);
    const correct = items.every((item, idx) => item.id === steps[idx].id);
    onComplete(correct, correct ? points : 0);
  };

  return (
    <div className="space-y-4">
      <h4 className="fluid-text-base font-semibold text-foreground">{question}</h4>

      <div className="space-y-2" role="list" aria-label="Ordenar pasos">
        {items.map((item, index) => {
          const showResult = showFeedback || completed;
          const isCorrectPosition = showResult && item.id === steps[index].id;
          const isWrongPosition = showResult && item.id !== steps[index].id;

          let borderClass = "border-white/10";
          if (isCorrectPosition) borderClass = "border-green-500/60 bg-green-500/10";
          else if (isWrongPosition) borderClass = "border-red-500/60 bg-red-500/10";

          return (
            <motion.div
              key={item.id}
              layout
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={`flex items-center gap-2 p-3 rounded-xl border transition-colors ${borderClass}`}
              role="listitem"
            >
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">
                {index + 1}
              </span>
              <span className="flex-1 text-sm">{item.text}</span>
              {!showResult && (
                <div className="flex flex-col gap-0.5">
                  <button
                    onClick={() => moveItem(index, "up")}
                    disabled={index === 0}
                    className="p-1 rounded hover:bg-white/10 disabled:opacity-20 transition-all focus-ring"
                    aria-label={`Mover ${item.text} arriba`}
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => moveItem(index, "down")}
                    disabled={index === items.length - 1}
                    className="p-1 rounded hover:bg-white/10 disabled:opacity-20 transition-all focus-ring"
                    aria-label={`Mover ${item.text} abajo`}
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
              {isCorrectPosition && <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0" />}
              {isWrongPosition && <XCircle className="h-4 w-4 text-red-400 flex-shrink-0" />}
            </motion.div>
          );
        })}
      </div>

      {!showFeedback && !completed && (
        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm
            hover:opacity-90 transition-all focus-ring min-h-[44px]"
        >
          Verificar orden
        </button>
      )}

      {(showFeedback || completed) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl border text-sm leading-relaxed ${
            items.every((item, idx) => item.id === steps[idx].id)
              ? "border-green-500/30 bg-green-500/10 text-green-300"
              : "border-red-500/30 bg-red-500/10 text-red-300"
          }`}
        >
          {items.every((item, idx) => item.id === steps[idx].id) ? (
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div>
                <p>{"El orden es correcto."}</p>
                <p className="mt-2 font-semibold text-accent">+{points} puntos</p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-2">
              <XCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div>
                <p>El orden no es correcto. El orden correcto es:</p>
                <ol className="mt-2 space-y-1 list-decimal list-inside">
                  {steps.map((s) => (
                    <li key={s.id}>{s.text}</li>
                  ))}
                </ol>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
