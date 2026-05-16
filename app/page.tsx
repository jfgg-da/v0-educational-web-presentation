"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import contentConfig from "@/lib/content.config";
import { NavBar } from "@/components/odc/NavBar";
import { ScoreWidget } from "@/components/odc/ScoreWidget";
import { ScreenCounter } from "@/components/odc/ScreenCounter";
import CoverScreen from "@/components/odc/screens/CoverScreen";
import LearningEntryScreen from "@/components/odc/screens/LearningEntryScreen";
import MenuScreen from "@/components/odc/screens/MenuScreen";
import ModuleScreen from "@/components/odc/screens/ModuleScreen";
import AssessmentScreen from "@/components/odc/screens/AssessmentScreen";
import ConclusionScreen from "@/components/odc/screens/ConclusionScreen";
import ReferencesScreen from "@/components/odc/screens/ReferencesScreen";
import CreditsScreen from "@/components/odc/screens/CreditsScreen";

// Screen layout:
// 0 = Cover
// 1 = REA / Learning Entry
// 2 = Menu
// 3 ... 3+N-1 = Modules (N = modules.length)
// 3+N = Assessment
// 3+N+1 = Conclusion
// 3+N+2 = References
// 3+N+3 = Credits

const MODULES_START = 3;

export default function Home() {
  const config = contentConfig;
  const totalModules = config.modules.length;
  const totalScreens = MODULES_START + totalModules + 4;

  const [currentScreen, setCurrentScreen] = useState(0);
  const [score, setScore] = useState(0);
  const [completedActivities, setCompletedActivities] = useState<Set<string>>(new Set());
  const [assessmentScore, setAssessmentScore] = useState<number | null>(null);

  const maxModuleScore = config.modules.reduce((s, m) => s + m.activity.points, 0);
  const maxAssessmentScore = config.assessment.questions.reduce((s, q) => s + q.points, 0);
  const maxScore = maxModuleScore + maxAssessmentScore;

  const handleActivityComplete = useCallback(
    (moduleId: string, _correct: boolean, points: number) => {
      if (completedActivities.has(moduleId)) return;
      setCompletedActivities((prev) => new Set(prev).add(moduleId));
      setScore((prev) => prev + points);
    },
    [completedActivities]
  );

  const handleAssessmentComplete = useCallback(
    (aScore: number, _maxScore: number, _passed: boolean) => {
      if (assessmentScore !== null) return;
      setAssessmentScore(aScore);
      setScore((prev) => prev + aScore);
    },
    [assessmentScore]
  );

  const handleAssessmentRetry = useCallback(() => {
    if (assessmentScore !== null) {
      setScore((prev) => prev - assessmentScore);
    }
    setAssessmentScore(null);
  }, [assessmentScore]);

  const goTo = (screen: number) => {
    if (screen >= 0 && screen < totalScreens) {
      setCurrentScreen(screen);
    }
  };

  const renderScreen = () => {
    if (currentScreen === 0) {
      return <CoverScreen meta={config.meta} onStart={() => goTo(1)} />;
    }
    if (currentScreen === 1) {
      return <LearningEntryScreen rea={config.rea} />;
    }
    if (currentScreen === 2) {
      return (
        <MenuScreen
          config={config}
          completedModules={completedActivities}
          onNavigate={goTo}
        />
      );
    }

    const moduleIndex = currentScreen - MODULES_START;
    if (moduleIndex >= 0 && moduleIndex < totalModules) {
      const mod = config.modules[moduleIndex];
      return (
        <ModuleScreen
          key={mod.id}
          module={mod}
          onActivityComplete={handleActivityComplete}
          activityCompleted={completedActivities.has(mod.id)}
        />
      );
    }

    const afterModules = currentScreen - MODULES_START - totalModules;
    if (afterModules === 0) {
      return (
        <AssessmentScreen
          assessment={config.assessment}
          passingScore={config.meta.passingScore}
          onComplete={handleAssessmentComplete}
          onRetry={handleAssessmentRetry}
        />
      );
    }
    if (afterModules === 1) {
      return <ConclusionScreen conclusion={config.conclusion} />;
    }
    if (afterModules === 2) {
      return <ReferencesScreen references={config.references} />;
    }
    if (afterModules === 3) {
      return <CreditsScreen credits={config.credits} meta={config.meta} />;
    }

    return null;
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Score widget - visible after cover */}
      {currentScreen > 0 && (
        <ScoreWidget currentScore={score} maxScore={maxScore} />
      )}

      {/* Screen counter - visible after cover */}
      {currentScreen > 0 && (
        <ScreenCounter current={currentScreen + 1} total={totalScreens} />
      )}

      {/* Main content with page transitions */}
      <AnimatePresence mode="wait">
        <motion.main
          key={currentScreen}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35 }}
          className="pb-20"
        >
          {renderScreen()}
        </motion.main>
      </AnimatePresence>

      {/* Navigation bar - visible after cover */}
      {currentScreen > 0 && (
        <NavBar
          onBack={() => goTo(currentScreen - 1)}
          onForward={() => goTo(currentScreen + 1)}
          onMenu={() => goTo(2)}
          canGoBack={currentScreen > 0}
          canGoForward={currentScreen < totalScreens - 1}
          currentScreen={currentScreen + 1}
          totalScreens={totalScreens}
        />
      )}
    </div>
  );
}
