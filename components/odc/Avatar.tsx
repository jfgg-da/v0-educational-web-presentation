"use client";

import { useState } from "react";
import { Volume2, VolumeX, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface AvatarProps {
  transcript: string;
  className?: string;
}

export function Avatar({ transcript, className }: AvatarProps) {
  const [showTranscript, setShowTranscript] = useState(false);

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {/* Avatar Image */}
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-primary to-accent p-0.5">
          <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
            <User className="w-10 h-10 md:w-12 md:h-12 text-primary" />
          </div>
        </div>
        
        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
      </motion.div>

      {/* Toggle Transcript Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowTranscript(!showTranscript)}
        className={cn(
          "rounded-full gap-2 transition-all duration-200",
          "border-white/20 hover:bg-white/10",
          showTranscript && "bg-white/10"
        )}
        aria-expanded={showTranscript}
        aria-controls="avatar-transcript"
      >
        {showTranscript ? (
          <>
            <VolumeX className="w-4 h-4" />
            <span>Ocultar transcripcion</span>
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4" />
            <span>Ver transcripcion</span>
          </>
        )}
      </Button>

      {/* Transcript Panel */}
      <AnimatePresence>
        {showTranscript && (
          <motion.div
            id="avatar-transcript"
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full overflow-hidden"
          >
            <div className="glass-card p-4 md:p-6">
              <p className="text-sm md:text-base leading-relaxed text-foreground/90 italic">
                &ldquo;{transcript}&rdquo;
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
