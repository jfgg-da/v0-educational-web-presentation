"use client";

import { motion } from "framer-motion";
import { Target, Users } from "lucide-react";
import type { ContentConfig } from "@/lib/content.config";

interface LearningEntryScreenProps {
  rea: ContentConfig["rea"];
}

export default function LearningEntryScreen({ rea }: LearningEntryScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl w-full space-y-6"
      >
        <div className="text-center mb-8">
          <h2 className="fluid-text-2xl font-bold text-foreground mb-2">{rea.title}</h2>
        </div>

        <div className="glass-card p-6 space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Objetivo de aprendizaje</h3>
              <p className="text-sm text-foreground/90 leading-relaxed">{rea.statement}</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Users className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">{"Población objetivo"}</h3>
              <p className="text-sm text-foreground/90 leading-relaxed">{rea.targetAudience}</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Transcripción del avatar</h3>
          <p className="text-sm text-foreground/80 leading-relaxed italic">{rea.avatarTranscript}</p>
        </div>
      </motion.div>
    </div>
  );
}
