"use client";

import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";

interface LucideIconProps extends LucideProps {
  name: string;
}

export function LucideIcon({ name, ...props }: LucideIconProps) {
  // Get the icon component from lucide-react
  const IconComponent = (LucideIcons as Record<string, React.ComponentType<LucideProps>>)[name];

  if (!IconComponent) {
    // Fallback to a default icon if not found
    return <LucideIcons.HelpCircle {...props} />;
  }

  return <IconComponent {...props} />;
}
