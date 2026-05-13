"use client";

import { useState } from "react";
import { Info, ExternalLink, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import type { InfoPopup as InfoPopupType } from "@/lib/content.config";

interface InfoPopupProps {
  data: InfoPopupType;
  className?: string;
}

export function InfoPopup({ data, className }: InfoPopupProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("relative", className)}>
      {/* Trigger Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "rounded-full gap-2 transition-all duration-200",
          "border-accent/50 text-accent hover:bg-accent/10 hover:border-accent",
          isOpen && "bg-accent/10 border-accent"
        )}
        aria-expanded={isOpen}
        aria-controls="info-popup-content"
      >
        <Info className="w-4 h-4" />
        <span>+Info</span>
      </Button>

      {/* Popup Content */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Popup Card */}
            <motion.div
              id="info-popup-content"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={cn(
                "fixed md:absolute",
                "inset-x-4 bottom-24 md:inset-auto",
                "md:top-full md:left-0 md:mt-2",
                "md:w-80 lg:w-96",
                "z-50",
                "glass-card p-4 md:p-5",
                "border-accent/30"
              )}
              role="dialog"
              aria-labelledby="info-popup-title"
            >
              {/* Close button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 w-8 h-8 rounded-full hover:bg-white/10"
                aria-label="Cerrar"
              >
                <X className="w-4 h-4" />
              </Button>

              {/* Title */}
              <h4
                id="info-popup-title"
                className="font-semibold text-accent mb-2 pr-8"
              >
                {data.title}
              </h4>

              {/* Body */}
              <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                {data.body}
              </p>

              {/* Link (if provided) */}
              {data.link && (
                <a
                  href={data.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center gap-2",
                    "text-sm font-medium text-primary",
                    "hover:text-primary/80 hover:underline",
                    "transition-colors"
                  )}
                >
                  {data.link.label}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
