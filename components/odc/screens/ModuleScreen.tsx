"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { LucideIcon } from "@/components/odc/LucideIcon";
import ActivityRenderer from "@/components/odc/ActivityRenderer";
import type { Module } from "@/lib/content.config";

interface ModuleScreenProps {
  module: Module;
  onActivityComplete: (moduleId: string, correct: boolean, points: number) => void;
  activityCompleted: boolean;
}

function renderMarkdown(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="text-accent/80">$1</em>')
    .split("\n\n")
    .map((p) => `<p class="mb-3 last:mb-0">${p}</p>`)
    .join("");
}

export default function ModuleScreen({ module, onActivityComplete, activityCompleted }: ModuleScreenProps) {
  const [showInfo, setShowInfo] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  return (
    <div className="min-h-screen px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        {/* Module header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <LucideIcon name={module.icon} className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="fluid-text-xl font-bold text-foreground">{module.title}</h2>
            <p className="text-xs text-muted-foreground">{module.purpose}</p>
          </div>
        </div>

        {/* Module image + content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden aspect-video">
              <img src={module.image} alt={module.title} className="w-full h-full object-cover" crossOrigin="anonymous" />
            </div>

            {/* Info popup button */}
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold
                bg-accent/20 text-accent border border-accent/30 hover:bg-accent/30 transition-all focus-ring min-h-[44px]"
            >
              <Info className="h-4 w-4" />
              {module.infoPopup.title}
            </button>

            {showInfo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="glass-card p-4 text-sm"
              >
                <p className="text-foreground/90 leading-relaxed">{module.infoPopup.body}</p>
                {module.infoPopup.link && (
                  <a
                    href={module.infoPopup.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-primary hover:underline text-xs font-semibold"
                  >
                    {module.infoPopup.link.label} &rarr;
                  </a>
                )}
              </motion.div>
            )}

            {/* Avatar transcript */}
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold
                bg-secondary text-foreground/70 border border-white/10 hover:bg-white/10 transition-all focus-ring min-h-[44px]"
            >
              {showTranscript ? "Ocultar transcripción" : "Ver transcripción del avatar"}
            </button>

            {showTranscript && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="glass-card p-4 text-sm text-foreground/80 leading-relaxed italic"
              >
                {module.avatarTranscript}
              </motion.div>
            )}
          </div>

          <div className="space-y-6">
            {/* Content */}
            <div
              className="glass-card p-6 text-sm text-foreground/90 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(module.content) }}
            />

            {/* Activity */}
            <div className="glass-card p-6">
              <h3 className="text-xs font-semibold text-accent uppercase tracking-wider mb-4">Actividad interactiva</h3>
              <ActivityRenderer
                activity={module.activity}
                onComplete={(correct, pts) => onActivityComplete(module.id, correct, pts)}
                completed={activityCompleted}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
