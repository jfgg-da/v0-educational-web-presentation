"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import type { ContentConfig } from "@/lib/content.config";

interface ConclusionScreenProps {
  conclusion: ContentConfig["conclusion"];
}

export default function ConclusionScreen({ conclusion }: ConclusionScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl w-full space-y-6"
      >
        <h2 className="fluid-text-2xl font-bold text-foreground text-center">{conclusion.title}</h2>

        <div className="glass-card p-6">
          <p className="text-sm text-foreground/90 leading-relaxed">{conclusion.synthesis}</p>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Aprendizajes clave</h3>
          <ul className="space-y-3">
            {conclusion.checklist.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 text-sm text-foreground/90"
              >
                <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-3 flex items-center gap-2">
            <ArrowRight className="h-4 w-4" /> Próximos pasos
          </h3>
          <p className="text-sm text-foreground/90 leading-relaxed">{conclusion.nextSteps}</p>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Transcripción del avatar</h3>
          <p className="text-sm text-foreground/80 leading-relaxed italic">{conclusion.avatarTranscript}</p>
        </div>
      </motion.div>
    </div>
  );
}
