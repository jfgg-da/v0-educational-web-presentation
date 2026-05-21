"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Target, Users, Play, Pause, FileText } from "lucide-react";
import type { ContentConfig } from "@/lib/content.config";
import { Avatar, AvatarHandle } from "@/components/odc/Avatar";

interface LearningEntryScreenProps {
  rea: ContentConfig["rea"];
}

export default function LearningEntryScreen({ rea }: LearningEntryScreenProps) {

  const avatarRef = useRef<AvatarHandle>(null);
  const [avatarPlaying, setAvatarPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  const DEFAULT_AVATAR_VIDEO = "/screenshots/Vídeo de Avatar IV.mp4";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl w-full space-y-6"
      >
        <div className="text-center mb-8">
          <h2 className="fluid-text-3xl font-bold text-foreground mb-2">{rea.title}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-6">
          <div className="space-y-6">
            <div className="glass-card p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-primary tracking-wider mb-2">REA (Resultado Esperado de Aprendizaje)</h3>
                <p className="text-lg text-foreground/90 text-justify">{rea.statement}</p>
              </div>
            </div>        
          </div>

        <div className="glass-card p-6 space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Users className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-accent tracking-wider mb-2">{"Población Objetivo"}</h3>
              <p className="text-lg text-foreground/90 text-justify">{rea.targetAudience}</p>
            </div>
          </div>
        </div>
       </div> 

        <div className="glass-card p-6 flex flex-col gap-5">
          {/* Avatar */}
          <div className="h-[260px] lg:h-[320px] w-full overflow-hidden rounded-xl bg-black/20">
            <Avatar
              ref={avatarRef}
              transcript={rea.avatarTranscript}
              videoSrc={DEFAULT_AVATAR_VIDEO}
              alt={`Avatar explicativo de ${rea.title}`}
            />
          </div>

          {/* Botones */}
          <div className="grid grid-cols-[35%_65%] gap-2 items-start w-full justify-center">

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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold justify-center
                    bg-border/20 text-foreground/70 border border-border/50 transition-all focus-ring min-h-[25px]"
            >
              {avatarPlaying ? (
                <Pause className="h-3.5 w-3.5" />
              ) : (
                <Play className="h-4 w-4 fill-current opacity-80" />
              )}

              {avatarPlaying ? "Pausar avatar" : "Iniciar avatar"}
            </button>
            
            {/* Transcript */}
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold
                        bg-border/20 text-foreground/70 border border-border/50 transition-all focus-ring min-h-[25px]"
            >
              <FileText className="h-3.5 w-3.5" />
            
              {showTranscript
                ? "Ocultar transcripción"
                : "Ver transcripción"}
            </button>
          </div>
              
          {/* Texto transcripción */}
          {showTranscript && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="p-4 text-sm text-foreground/80 leading-relaxed italic text-justify"
            >
              {rea.avatarTranscript}
            </motion.div>
          )}
        </div>
        </div>
      </motion.div>
    </div>
  );
}
