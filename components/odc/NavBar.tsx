"use client";

import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavBarProps {
  onBack: () => void;
  onForward: () => void;
  onMenu: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
  currentScreen: number;
  totalScreens: number;
}

export function NavBar({
  onBack,
  onForward,
  onMenu,
  canGoBack,
  canGoForward,
  currentScreen,
  totalScreens,
}: NavBarProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/10"
      role="navigation"
      aria-label="Navegacion principal"
    >
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="lg"
          onClick={onBack}
          disabled={!canGoBack}
          className={cn(
            "flex items-center gap-2 rounded-full transition-all duration-200",
            "hover:bg-white/10 hover:scale-105",
            "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
          )}
          aria-label="Pantalla anterior"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Anterior</span>
        </Button>

        {/* Menu Button */}
        <Button
          variant="ghost"
          size="lg"
          onClick={onMenu}
          className={cn(
            "flex items-center gap-2 rounded-full transition-all duration-200",
            "hover:bg-white/10 hover:scale-105"
          )}
          aria-label="Abrir menu de navegacion"
        >
          <Menu className="w-5 h-5" />
          <span className="hidden sm:inline">Menu</span>
        </Button>

        {/* Forward Button */}
        <Button
          variant="ghost"
          size="lg"
          onClick={onForward}
          disabled={!canGoForward}
          className={cn(
            "flex items-center gap-2 rounded-full transition-all duration-200",
            "hover:bg-white/10 hover:scale-105",
            "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
          )}
          aria-label="Pantalla siguiente"
        >
          <span className="hidden sm:inline">Siguiente</span>
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Progress indicator */}
      <div className="h-1 bg-muted">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out"
          style={{ width: `${(currentScreen / totalScreens) * 100}%` }}
          role="progressbar"
          aria-valuenow={currentScreen}
          aria-valuemin={1}
          aria-valuemax={totalScreens}
          aria-label={`Progreso: pantalla ${currentScreen} de ${totalScreens}`}
        />
      </div>
    </nav>
  );
}
