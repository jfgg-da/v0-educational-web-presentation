"use client";

import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ScoreWidgetProps {
  currentScore: number;
  maxScore: number;
  className?: string;
}

export function ScoreWidget({ currentScore, maxScore, className }: ScoreWidgetProps) {
  const percentage = maxScore > 0 ? Math.round((currentScore / maxScore) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "fixed top-4 right-4 z-40",
        "glass-card px-4 py-2",
        "flex items-center gap-3",
        className
      )}
      role="status"
      aria-live="polite"
      aria-label={`Puntaje actual: ${currentScore} de ${maxScore} puntos`}
    >
      <div className="relative">
        <Trophy className="w-5 h-5 text-accent" />
        <AnimatePresence>
          {currentScore > 0 && (
            <motion.div
              key={currentScore}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"
            />
          )}
        </AnimatePresence>
      </div>
      
      <div className="flex flex-col">
        <span className="text-xs text-muted-foreground">Puntaje</span>
        <div className="flex items-baseline gap-1">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={currentScore}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              className="font-bold text-foreground"
            >
              {currentScore}
            </motion.span>
          </AnimatePresence>
          <span className="text-muted-foreground text-sm">/ {maxScore}</span>
        </div>
      </div>

      {/* Mini progress circle */}
      <div className="relative w-10 h-10">
        <svg className="w-10 h-10 transform -rotate-90">
          <circle
            cx="20"
            cy="20"
            r="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-muted"
          />
          <motion.circle
            cx="20"
            cy="20"
            r="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="text-primary"
            initial={{ strokeDasharray: "0 100" }}
            animate={{ strokeDasharray: `${percentage} 100` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
          {percentage}%
        </span>
      </div>
    </motion.div>
  );
}
