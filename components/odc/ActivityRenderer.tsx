"use client";

import type { Activity } from "@/lib/content.config";
import MultipleChoice from "./activities/MultipleChoice";
import TrueFalse from "./activities/TrueFalse";
import FillBlank from "./activities/FillBlank";
import DragDrop from "./activities/DragDrop";
import Ordering from "./activities/Ordering";

interface ActivityRendererProps {
  activity: Activity;
  onComplete: (correct: boolean, points: number) => void;
  completed: boolean;
}

export default function ActivityRenderer({ activity, onComplete, completed }: ActivityRendererProps) {
  switch (activity.type) {
    case "multiple-choice":
      return (
        <MultipleChoice
          question={activity.question!}
          options={activity.options!}
          points={activity.points}
          onComplete={onComplete}
          completed={completed}
        />
      );
    case "true-false":
      return (
        <TrueFalse
          statement={activity.statement!}
          answer={activity.answer!}
          feedbackTrue={activity.feedbackTrue!}
          feedbackFalse={activity.feedbackFalse!}
          points={activity.points}
          onComplete={onComplete}
          completed={completed}
        />
      );
    case "fill-blank":
      return (
        <FillBlank
          sentence={activity.sentence!}
          question={activity.question!}
          correctAnswer={activity.correctAnswer}
          correctAnswers={activity.correctAnswers}
          correctAnswersPerBlank={activity.correctAnswersPerBlank}
          feedbackCorrect={activity.feedbackCorrect!}
          feedbackWrong={activity.feedbackWrong!}
          points={activity.points}
          onComplete={onComplete}
          completed={completed}
        />
      );
    case "drag-drop":
      return (
        <DragDrop
          question={activity.question!}
          pairs={activity.pairs!}
          points={activity.points}
          onComplete={onComplete}
          completed={completed}
        />
      );
    case "ordering":
      return (
        <Ordering
          question={activity.question!}
          steps={activity.steps!}
          points={activity.points}
          onComplete={onComplete}
          completed={completed}
        />
      );
    default:
      return <p className="text-muted-foreground">Tipo de actividad no soportado.</p>;
  }
}
