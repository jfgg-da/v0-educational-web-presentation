"use client";

import { motion } from "framer-motion";
import { Heart, ExternalLink } from "lucide-react";
import type { ContentConfig } from "@/lib/content.config";

interface CreditsScreenProps {
  credits: ContentConfig["credits"];
  meta: ContentConfig["meta"];
}

export default function CreditsScreen({ credits, meta }: CreditsScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full space-y-6"
      >
        <div className="text-center mb-8">
          <Heart className="h-8 w-8 text-accent mx-auto mb-3" />
          <h2 className="fluid-text-2xl font-bold text-foreground">Créditos</h2>
          <p className="text-sm text-muted-foreground mt-1">{meta.institution}</p>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-base font-semibold text-primary uppercase tracking-wider mb-4">Metadatos del ODC</h3>
          <div className="space-y-3">
            {credits.team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-base font-bold text-primary">
                    {member.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </span>
                </div>
                <div>
                  <p className="text-base font-semibold text-foreground">{member.name}</p>
                  <p className="text-sm text-foreground/70">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6 text-center">
          <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Licencia</h3>
          <a
            href={credits.licenseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-foreground hover:text-primary transition-colors"
          >
            {credits.license}
            <ExternalLink className="h-4 w-4" />
          </a>
          <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
            {credits.licenseNote}
          </p>
        </div>

        <div className="text-center text-xs text-muted-foreground/60">
          <p>{meta.version} &middot; {meta.date}</p>
        </div>
      </motion.div>
    </div>
  );
}
