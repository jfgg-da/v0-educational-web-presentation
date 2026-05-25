"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircleQuestionMark } from "lucide-react";
import type { ContentConfig } from "@/lib/content.config";
import { useState } from "react";

interface CoverScreenProps {
  meta: ContentConfig["meta"];
  onStart: () => void;
}

function renderMarkdown(text: string) {
return text
.replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary font-semibold">$1</strong>')
.replace(/\*(.*?)\*/g, '<em class="text-accent/80 font-semibold">$1</em>')
.split("\n\n")
.map((p) => `<p class="mb-3 last:mb-0">${p}</p>`)
.join("");
}

export default function CoverScreen({ meta, onStart }: CoverScreenProps) {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div className="fixed h-svh w-full flex items-center justify-center overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/screenshots/portada.jpg"
        >
          <source src="/screenshots/medium.mp4" type="video/mp4" />
          Tu navegador no soporta video.
        </video>

        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/80 to-background/80" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto max-h-full overflow-y-auto py-4"
      >
        <motion.img
          src="/screenshots/escudo.png"
          alt="Escudo"
          className="w-48 h-48 mx-auto mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />


        <h1 className="fluid-text-4xl font-bold text-foreground leading-tight text-balance mb-8">
          {meta.title}
        </h1>

        <div className="mb-8 space-y-1">
          {meta.authors.map((author) => (
            <p key={author.name} className="text-xl text-muted-foreground flex flex-col gap-0">
              <span className="text-muted-foreground fluid-text-xl text-pretty">{author.name}</span>
              <span className="text-muted-foreground/90"> {author.role}</span>
            </p>
          ))}
        </div>

        <p className="fluid-text-xl text-muted-foreground leading-relaxed text-pretty">
          {meta.subtitle}
        </p>
        <p className="text-xl text-muted-foreground/90 mb-8">{meta.institution}</p>

        <p className="text-lg text-foreground mb-8">{meta.Resumen}</p>

        <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-primary/80
              text-primary-foreground font-semibold fluid-text-base shadow-lg shadow-primary/20
              hover:shadow-primary/30 transition-all focus-ring min-h-[44px]"
          >
            ¡Iniciemos!
            <ArrowRight className="h-5 w-5" />
          </motion.button>

          <div className="relative inline-block ">

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}  
            onClick={() => setShowInfo(!showInfo)}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-secondary/70 to-secondary/70
              text-primary-foreground font-semibold fluid-text-base shadow-lg shadow-primary/20
              hover:shadow-primary/30 transition-all focus-ring min-h-[44px]"
          >
            <MessageCircleQuestionMark className="h-5 w-5" />
            {meta.infoPopup.title}
          </motion.button>
                
          {showInfo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="
                fixed inset-0 z-[999]
                flex items-center justify-center
                bg-black/50 backdrop-blur-sm
                px-4
              "
              onClick={() => setShowInfo(false)}
            >
            
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="
                  relative
                  w-full
                  max-w-2xl
                  max-h-[80vh]
                  overflow-y-auto
                  rounded-3xl
                  border border-white/10
                  bg-background/95
                  backdrop-blur-2xl
                  shadow-2xl
                  shadow-black/40
                  p-8
                "
              >
              
                {/* Botón cerrar */}
                <button
                  onClick={() => setShowInfo(false)}
                  className="
                    absolute top-4 right-4
                    w-9 h-9
                    rounded-full
                    bg-white/10
                    hover:bg-white/20
                    transition-colors
                    flex items-center justify-center
                    text-foreground/70
                  "
                >
                  ✕
                </button>

                {/* Título */}
                <h3 className="text-2xl font-bold mb-6 text-primary">
                  {meta.infoPopup.title}
                </h3>

                {/* Contenido */}
                <div className="text-foreground/90 leading-relaxed italic space-y-4"
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(meta.infoPopup.body) }}
                />
              </motion.div>

            </motion.div>
          )}
        
        </div>
        </div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-xs font-light tracking-wider uppercase border border-primary/20">
            {meta.version} &middot; {meta.date}
          </span>
        </motion.div>

      </motion.div>
    </div>
  );
}
