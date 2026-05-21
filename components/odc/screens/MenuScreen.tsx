"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { LucideIcon } from "@/components/odc/LucideIcon";
import type { ContentConfig } from "@/lib/content.config";

interface MenuScreenProps {
  config: ContentConfig;
  completedModules: Set<string>;
  onNavigate: (screenIndex: number) => void;
}

const SCREENS_BEFORE_MODULES = 3;

export default function MenuScreen({ config, completedModules, onNavigate }: MenuScreenProps) {
  const sections = [
    { label: "Portada", screen: 0 },
    { label: config.rea.title, screen: 1 },
    ...config.modules.map((m, i) => ({
      label: m.title,
      screen: SCREENS_BEFORE_MODULES + i,
      icon: m.icon,
      completed: completedModules.has(m.id),
    })),
    { label: config.assessment.title, screen: SCREENS_BEFORE_MODULES + config.modules.length },
    { label: config.conclusion.title, screen: SCREENS_BEFORE_MODULES + config.modules.length + 1 },
    { label: "Referencias", screen: SCREENS_BEFORE_MODULES + config.modules.length + 2 },
    { label: "Créditos", screen: SCREENS_BEFORE_MODULES + config.modules.length + 3 },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        <h2 className="fluid-text-3xl font-bold text-foreground text-center mb-8">{"Menú de navegación"}</h2>
        <div className="space-y-2">
          {sections.map((section, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onNavigate(section.screen)}
              className="w-full text-left p-4 rounded-xl glass-card hover:bg-white/10 transition-all flex items-center gap-3 focus-ring min-h-[44px] group"
            >
              {"icon" in section && section.icon ? (
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center">
                  <LucideIcon name={section.icon as string} className="h-4 w-4 text-primary" />
                </div>
              ) : (
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center">
                  <span className="text-lg font-bold text-foreground">{index + 1}</span>
                </div>
              )}
              <span className="flex-1 text-lg font-medium group-hover:text-primary transition-colors">
                {section.label}
              </span>
              {"completed" in section && section.completed && (
                <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0" />
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
