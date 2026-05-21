"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Info, Play, Pause, FileText } from "lucide-react";
import { LucideIcon } from "@/components/odc/LucideIcon";
import ActivityRenderer from "@/components/odc/ActivityRenderer";
import type { Module } from "@/lib/content.config";
import { Avatar, AvatarHandle } from "@/components/odc/Avatar";

interface ModuleScreenProps {
  module: Module;
  onActivityComplete: (moduleId: string, correct: boolean, points: number) => void;
  activityCompleted: boolean;
}

function renderMarkdown(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="text-accent/80 font-semibold">$1</em>')
    .split("\n\n")
    .map((p) => `<p class="mb-3 last:mb-0">${p}</p>`)
    .join("");
}

export default function ModuleScreen({ module, onActivityComplete, activityCompleted }: ModuleScreenProps) {
  const [showInfo, setShowInfo] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const avatarRef = useRef<AvatarHandle>(null);
  const [avatarPlaying, setAvatarPlaying] = useState(false);
  const DEFAULT_AVATAR_IMAGE = "/screenshots/Vídeo de Avatar IV.mp4";

  // Scroll to top when the module changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [module.id]);

  return (
    <div className="min-h-screen px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto space-y-6"
      >
        {/* Module header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <LucideIcon name={module.icon} className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h2 className="fluid-text-2xl font-bold text-foreground">{module.title}</h2>
            <p className="text-base text-muted-foreground">{module.purpose}</p>
          </div>
        </div>

        {/* Module image + info/avatar */}
        <div className="grid grid-cols-1 gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-6">
            <div className="spacey-4">
              <div className="rounded-xl overflow-hidden aspect-video">
                {isYouTubeUrl(module.image) ? (
                  <iframe
                    src={getYouTubeEmbedUrl(module.image)}
                    title={module.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                ) : (
                  <img
                    src={module.image}
                    alt={`Imagen ilustrativa del módulo ${module.title}`}
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                  />
                )}
              </div>
                {module.mediaSource && (
                <div className="mt-2 px-1 text-xs text-foreground/70 leading-relaxed">
                  Fuente:{" "}

                  {module.mediaSource.url ? (
                    <a
                      href={module.mediaSource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-primary transition-colors"
                    >
                      {module.mediaSource.label}
                    </a>
                  ) : (
                    <span>{module.mediaSource.label}</span>
                  )}

                
                  {module.mediaSource.author && (
                    <span> — {module.mediaSource.author}</span>
                  )}
                </div>
              )}
            </div>

            <div className="glass-card p-6 flex flex-col h-full gap-6">
              {/* Avatar grande */}
              <div className="flex-1 min-h-[260px] rounded-xl overflow-hiddenh-[260px] lg:h-[320px] w-full overflow-hidden rounded-xl flex items-center justify-center bg-black/20">
                <Avatar
                  ref={avatarRef}
                  transcript={module.avatarTranscript}
                  videoSrc={DEFAULT_AVATAR_IMAGE}
                />
              </div>

              <div className="grid grid-cols-[35%_65%] gap-2 items-start w-full justify-center">
              {/* Play Avatar */}
              
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
                    <>
                      {avatarPlaying ? (
                        <Pause className="h-3.5 w-3.5" />
                      ) : (
                        <Play className="h-4 w-4 fill-current opacity-80" />
                      )}

                      {avatarPlaying ? "Avatar" : "Avatar"}
                    </>
                  </button>


              {/* Transcripción */}
              
                  <button
                    onClick={() => setShowTranscript(!showTranscript)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold
                        bg-border/20 text-foreground/70 border border-border/50 transition-all focus-ring min-h-[25px]"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    {showTranscript ? "Ocultar transcripción" : "Ver transcripción"}
                  </button>
              </div>
              {showTranscript && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="p-4 text-sm text-foreground/80 leading-relaxed italic text-justify"
                    >
                      {module.avatarTranscript}
                    </motion.div>
                  )}

              {/* Información */}
              <div className="space-y-4">
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => setShowInfo(!showInfo)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold
                      bg-accent/20 text-accent border border-accent/30 hover:bg-accent/30 transition-all focus-ring min-h-[35px]"
                  >
                    <Info className="h-4 w-4" />
                    {module.infoPopup.title}
                  </button>

                  {showInfo && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-accent/20 text-accent p-4 text-sm rounded-xl"
                    >
                      <p className="text-foreground/80 leading-relaxed italic">{module.infoPopup.body}</p>
                      {module.infoPopup.link && (
                        <a
                          href={module.infoPopup.link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-2 text-accent hover:underline text-xs font-semibold"
                        >
                          {module.infoPopup.link.label} &rarr;
                        </a>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
            
          {/* Content en dos columnas + activity */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-6">
              <div
                className="glass-card p-6 text-base text-foreground/90 leading-relaxed text-justify"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(module.content) }}
              />

              <div
                className="glass-card p-6 text-base text-foreground/90 leading-relaxed text-justify"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(module.contentDetail || "") }}
              />
            </div>

            <div className="glass-card p-6">
              <h3 className="text-base font-semibold text-accent uppercase tracking-wider mb-4">
                Actividad interactiva
              </h3>
              {module.activity.description && (
                <p className="text-sm text-foreground/80 leading-relaxed mb-4">
                  {module.activity.description}
                </p>
              )}
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

function isYouTubeUrl(url: string): boolean {
  return /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)/.test(url);
}

function getYouTubeEmbedUrl(url: string): string {
  const match = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}?rel=0` : url;
}
