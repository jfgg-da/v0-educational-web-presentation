"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import type { ContentConfig } from "@/lib/content.config";

interface ReferencesScreenProps {
  references: ContentConfig["references"];
}

function renderReference(ref: string) {
  // Render markdown-style italics and links
  return ref
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline break-all">$1</a>');
}

export default function ReferencesScreen({ references }: ReferencesScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl w-full"
      >
        <div className="flex items-center gap-3 mb-8 justify-center">
          <BookOpen className="h-6 w-6 text-primary" />
          <h2 className="fluid-text-2xl font-bold text-foreground">Referencias</h2>
        </div>

        <div className="glass-card p-6">
          <ol className="space-y-4 list-none">
            {references.map((ref, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="text-sm text-foreground/80 leading-relaxed pl-8 relative"
              >
                <span className="absolute left-0 top-0 text-xs text-muted-foreground font-mono w-6 text-right">
                  {i + 1}.
                </span>
                <span dangerouslySetInnerHTML={{ __html: renderReference(ref) }} />
              </motion.li>
            ))}
          </ol>
        </div>
      </motion.div>
    </div>
  );
}
