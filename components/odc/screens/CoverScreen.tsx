"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ContentConfig } from "@/lib/content.config";

interface CoverScreenProps {
  meta: ContentConfig["meta"];
  onStart: () => void;
}

export default function CoverScreen({ meta, onStart }: CoverScreenProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={meta.coverImage}
          alt=""
          className="w-full h-full object-cover opacity-20"
          crossOrigin="anonymous"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center px-6 max-w-3xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-xs font-semibold tracking-wider uppercase border border-primary/30">
            {meta.version} &middot; {meta.date}
          </span>
        </motion.div>

        <h1 className="fluid-text-4xl font-bold text-foreground leading-tight text-balance mb-4">
          {meta.title}
        </h1>

        <p className="fluid-text-lg text-muted-foreground leading-relaxed mb-3 text-pretty">
          {meta.subtitle}
        </p>

        <div className="mb-8 space-y-1">
          {meta.authors.map((author) => (
            <p key={author.name} className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground/80">{author.name}</span>
              <span className="text-muted-foreground/70"> &mdash; {author.role}</span>
            </p>
          ))}
          <p className="text-xs text-muted-foreground/60 mt-2">{meta.institution}</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-primary/80
            text-primary-foreground font-semibold fluid-text-base shadow-lg shadow-primary/20
            hover:shadow-primary/30 transition-all focus-ring min-h-[44px]"
        >
          Comenzar
          <ArrowRight className="h-5 w-5" />
        </motion.button>
      </motion.div>
    </div>
  );
}
