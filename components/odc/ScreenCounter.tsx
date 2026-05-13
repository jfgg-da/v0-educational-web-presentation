"use client";

import { cn } from "@/lib/utils";

interface ScreenCounterProps {
  current: number;
  total: number;
  className?: string;
}

export function ScreenCounter({ current, total, className }: ScreenCounterProps) {
  return (
    <div
      className={cn(
        "fixed top-4 left-4 z-40",
        "glass-card px-3 py-1.5",
        "text-sm",
        className
      )}
      role="status"
      aria-live="polite"
      aria-label={`Pantalla ${current} de ${total}`}
    >
      <span className="text-muted-foreground">Pantalla </span>
      <span className="font-semibold text-foreground">{current}</span>
      <span className="text-muted-foreground"> de </span>
      <span className="font-semibold text-foreground">{total}</span>
    </div>
  );
}
