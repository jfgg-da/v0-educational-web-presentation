"use client";

import { motion } from "framer-motion";
import { Play, Pause, FileText, CheckCircle2, ArrowRight, ListCheck  } from "lucide-react";
import type { ContentConfig } from "@/lib/content.config";
import { Avatar, AvatarHandle } from "@/components/odc/Avatar";
import { useEffect, useState, useRef } from "react";

interface ConclusionScreenProps {
  conclusion: ContentConfig["conclusion"];
}

function renderMarkdown(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="text-accent/80 font-semibold">$1</em>')
    .split("\n\n")
    .map((p) => `<p class="mb-3 last:mb-0">${p}</p>`)
    .join("");
}

export default function ConclusionScreen({ conclusion }: ConclusionScreenProps) {
  const avatarRef = useRef<AvatarHandle>(null);
  const [avatarPlaying, setAvatarPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const DEFAULT_AVATAR_IMAGE = "/screenshots/Vídeo de Avatar IV.mp4";

  // Scroll to top when the module changes
  useEffect(() => {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "auto" });
   }
  }, [conclusion]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto space-y-6"
      >
        <div className="flex items-center gap-3 mb-8 justify-center">
          <ListCheck className="h-6 w-6 text-primary" />
          <h2 className="fluid-text-2xl font-bold text-foreground text-center">{conclusion.title}</h2>
        </div>        

        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-6">
            <div className="spacey-4">
              <div className="glass-card p-6 mb-4">
                <div className="text-base text-foreground/90 leading-relaxed text-justify"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(conclusion.synthesis_1 || "") }}
                />
              </div>

              <div className="glass-card p-6 mb-4">
                <div className="text-base text-foreground/90 leading-relaxed text-justify"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(conclusion.synthesis_2 || "") }}
                />
              </div>

              <div className="glass-card p-6 mb-4">
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
                <div className="text-base text-foreground/90 leading-relaxed text-justify"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(conclusion.nextSteps || "") }}
                />
              </div>
            </div>
            
            <div className="glass-card p-6 flex flex-col gap-5 h-fit">
                            
              {/* Avatar */}
              <div
                className="
                  w-full
                  h-[260px]
                  lg:h-[320px]
                  rounded-xl
                  overflow-hidden
                  bg-black/20
                  flex items-center justify-center
                  flex-shrink-0
                "
              >
                <Avatar
                  ref={avatarRef}
                  transcript={conclusion.avatarTranscript}
                  videoSrc={DEFAULT_AVATAR_IMAGE}
                />
              </div>
                            
              {/* Botones */}
              <div className="grid grid-cols-[35%_65%] gap-3 items-center w-full">
                            
                {/* Play */}
                <button
                  onClick={() => {
                    if (!avatarRef.current) return;
                  
                    if (avatarPlaying) {
                      avatarRef.current.pause();
                      setAvatarPlaying(false);
                    } else {
                      avatarRef.current.play();
                      setAvatarPlaying(true);
                    }
                  }}
                  className="
                    inline-flex items-center justify-center gap-2
                    px-4 py-1.5
                    rounded-full
                    text-sm font-semibold
                    bg-border/20
                    text-foreground/70
                    border border-border/50
                    transition-all
                    focus-ring
                    min-h-[34px]
                  "
                >
                  {avatarPlaying ? (
                    <Pause className="h-3.5 w-3.5" />
                  ) : (
                    <Play className="h-4 w-4 fill-current opacity-80" />
                  )}
            
                  Avatar
                </button>
                
                {/* Transcript */}
                <button
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="
                    inline-flex items-center justify-center gap-2
                    px-4 py-1.5
                    rounded-full
                    text-sm font-semibold
                    bg-border/20
                    text-foreground/70
                    border border-border/50
                    transition-all
                    focus-ring
                    min-h-[34px]
                  "
                >
                  <FileText className="h-3.5 w-3.5" />
                
                  {showTranscript
                    ? "Ocultar transcripción"
                    : "Ver transcripción"}
                </button>
                  
              </div>
                  
              {/* Transcript */}
              {showTranscript && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.25 }}
                  className="
                    w-full
                    rounded-2xl
                    bg-white/5
                    border border-white/10
                    p-4
                    text-sm
                    text-foreground/80
                    leading-relaxed
                    italic
                    text-justify
                  "
                >
                  {conclusion.avatarTranscript}
                </motion.div>
              )}
            
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
