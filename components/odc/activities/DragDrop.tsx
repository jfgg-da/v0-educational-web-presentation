"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, GripVertical } from "lucide-react";
import type { DragDropPair } from "@/lib/content.config";

interface DragDropProps {
  question: string;
  pairs: DragDropPair[];
  points: number;
  onComplete: (correct: boolean, points: number) => void;
  completed: boolean;
}

export default function DragDrop({
  question,
  pairs,
  points,
  onComplete,
  completed,
}: DragDropProps) {
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [activeTerm, setActiveTerm] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [shuffledDefs] = useState(() =>
    [...pairs.map((p) => p.definition)].sort(() => Math.random() - 0.5)
  );

  const handleTermClick = useCallback(
    (term: string) => {
      if (completed || showFeedback) return;
      setActiveTerm(activeTerm === term ? null : term);
    },
    [activeTerm, completed, showFeedback]
  );

  const handleDefClick = useCallback(
    (def: string) => {
      if (completed || showFeedback || !activeTerm) return;
      // Check if def is already assigned to another term, remove it
      const newMatches = { ...matches };
      for (const key in newMatches) {
        if (newMatches[key] === def) delete newMatches[key];
      }
      newMatches[activeTerm] = def;
      setMatches(newMatches);
      setActiveTerm(null);
    },
    [activeTerm, matches, completed, showFeedback]
  );

  const handleSubmit = () => {
    if (Object.keys(matches).length !== pairs.length) return;
    setShowFeedback(true);
    const allCorrect = pairs.every((p) => matches[p.term] === p.definition);
    onComplete(allCorrect, allCorrect ? points : 0);
  };

  const usedDefs = new Set(Object.values(matches));

  return (
    <div className="space-y-4">
      <h4 className="fluid-text-base font-semibold text-foreground">{question}</h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Terms column */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Términos</p>
          {pairs.map((pair) => {
            const isActive = activeTerm === pair.term;
            const isMatched = pair.term in matches;
            const showResult = showFeedback || completed;
            const correctMatch = showResult && matches[pair.term] === pair.definition;
            const wrongMatch = showResult && isMatched && matches[pair.term] !== pair.definition;

            let borderClass = "border-white/10 hover:border-white/25";
            if (correctMatch) borderClass = "border-green-500/60 bg-green-500/10";
            else if (wrongMatch) borderClass = "border-red-500/60 bg-red-500/10";
            else if (isActive) borderClass = "border-primary/60 bg-primary/10";
            else if (isMatched) borderClass = "border-accent/40 bg-accent/5";

            return (
              <motion.button
                key={pair.term}
                whileTap={!showResult ? { scale: 0.98 } : {}}
                onClick={() => handleTermClick(pair.term)}
                disabled={showResult}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-center gap-2 text-sm focus-ring min-h-[44px] ${borderClass} disabled:cursor-default`}
              >
                <GripVertical className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="font-semibold">{pair.term}</span>
                {correctMatch && <CheckCircle2 className="h-4 w-4 text-green-400 ml-auto flex-shrink-0" />}
                {wrongMatch && <XCircle className="h-4 w-4 text-red-400 ml-auto flex-shrink-0" />}
              </motion.button>
            );
          })}
        </div>

        {/* Definitions column */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Definiciones</p>
          {shuffledDefs.map((def) => {
            const isUsed = usedDefs.has(def);
            const showResult = showFeedback || completed;

            let borderClass = "border-white/10 hover:border-white/25";
            if (isUsed && !activeTerm) borderClass = "border-accent/40 bg-accent/5 opacity-60";
            if (activeTerm) borderClass = "border-white/10 hover:border-primary/40 cursor-pointer";

            return (
              <motion.button
                key={def}
                whileTap={activeTerm && !showResult ? { scale: 0.98 } : {}}
                onClick={() => handleDefClick(def)}
                disabled={showResult || !activeTerm}
                className={`w-full text-left p-3 rounded-xl border transition-all text-sm focus-ring min-h-[44px] ${borderClass} disabled:cursor-default`}
              >
                {def}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Current matches display */}
      {Object.keys(matches).length > 0 && !showFeedback && !completed && (
        <div className="space-y-1.5 p-3 rounded-xl bg-secondary/50 border border-white/5">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tus emparejamientos:</p>
          {Object.entries(matches).map(([term, def]) => (
            <div key={term} className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-primary">{term}</span>
              <span className="text-muted-foreground">→</span>
              <span className="text-foreground">{def}</span>
            </div>
          ))}
        </div>
      )}

      {!showFeedback && !completed && (
        <button
          onClick={handleSubmit}
          disabled={Object.keys(matches).length !== pairs.length}
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
            pairs.every((p) => matches[p.term] === p.definition)
              ? "border-green-500/30 bg-green-500/10 text-green-300"
              : "border-red-500/30 bg-red-500/10 text-red-300"
          }`}
        >
          {pairs.every((p) => matches[p.term] === p.definition) ? (
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div>
                <p>{"Todos los emparejamientos son correctos."}</p>
                <p className="mt-2 font-semibold text-accent">+{points} puntos</p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-2">
              <XCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div>
                <p>Algunos emparejamientos son incorrectos. Las respuestas correctas son:</p>
                <ul className="mt-2 space-y-1">
                  {pairs.map((p) => (
                    <li key={p.term}>
                      <span className="font-semibold">{p.term}</span> → {p.definition}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
