"use client";

import { createElement, useEffect, useMemo, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

interface FillBlankProps {
  sentence: string;
  question?: string;
  correctAnswer?: string;
  correctAnswers?: string[];
  correctAnswersPerBlank?: string[][];
  feedbackCorrect: string;
  feedbackWrong: string;
  points: number;
  onComplete: (correct: boolean, points: number) => void;
  completed: boolean;
}

function renderInlineMarkdown(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="text-accent/80 font-semibold">$1</em>');
}

function renderMarkdownTable(tableText: string) {
  const rows = tableText
    .trim()
    .split(/\r?\n/)
    .map((line) => line.trim().replace(/^\||\|$/g, ""));

  const headerCells = rows[0].split("|").map((cell) => renderInlineMarkdown(cell.trim()));
  const alignCells = rows[1].split("|").map((cell) => cell.trim());
  const bodyRows = rows.slice(2).filter((line) => line.trim().length);

  const getAlignClass = (token: string) => {
    if (token.startsWith(":") && token.endsWith(":")) return "text-center";
    if (token.startsWith(":")) return "text-left";
    if (token.endsWith(":")) return "text-right";
    return "text-left";
  };

  const headerHtml = headerCells
    .map(
      (cell) =>
        `<th class="border border-white/10 px-3 py-2 text-left font-semibold bg-surface">${cell}</th>`
    )
    .join("");

  const bodyHtml = bodyRows
    .map((row) => {
      const cells = row.split("|").map((cell) => cell.trim());
      return `<tr>${cells
        .map(
          (cell, index) =>
            `<td class="border border-white/10 px-3 py-2 ${getAlignClass(
              alignCells[index] || ""
            )}">${renderInlineMarkdown(cell)}</td>`
        )
        .join("")}</tr>`;
    })
    .join("");

  return `<table class="w-full border-collapse text-sm mb-4">` +
    `<thead><tr>${headerHtml}</tr></thead>` +
    `<tbody>${bodyHtml}</tbody></table>`;
}

function renderHtmlToReact(html: string, placeholder: string, renderBlank: (index: number) => ReactNode) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  let blankIndex = 0;

  const walk = (node: ChildNode, path: string): ReactNode[] => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || "";
      if (!text.includes(placeholder)) return [text];

      const parts = text.split(placeholder);
      return parts.flatMap((segment, index) =>
        index === parts.length - 1
          ? [segment]
          : [segment, renderBlank(blankIndex++)]
      );
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      const props: Record<string, unknown> = { key: path };
      for (const attr of Array.from(el.attributes)) {
        props[attr.name === "class" ? "className" : attr.name] = attr.value;
      }

      const children = Array.from(node.childNodes).flatMap((child, index) =>
        walk(child, `${path}.${index}`)
      );
      return [createElement(el.tagName.toLowerCase(), props, ...children)];
    }

    return [];
  };

  return Array.from(doc.body.childNodes).flatMap((child, index) => walk(child, `${index}`));
}

function renderMarkdown(text: string) {
  const tableRegex = /(^\s*\|.*\r?\n\s*\|[ \t]*[:-]+.*\r?\n(?:\s*\|.*\r?\n?)*)/gm;

  return text
    .replace(tableRegex, (tableBlock) => renderMarkdownTable(tableBlock))
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="text-accent/80 font-semibold">$1</em>')
    .replace(/\n\n/g, '<br /><br />')
    .replace(/\n/g, '<br />');
}

export default function FillBlank({
  sentence,
  question,
  correctAnswer,
  correctAnswers,
  correctAnswersPerBlank,
  feedbackCorrect,
  feedbackWrong,
  points,
  onComplete,
  completed,
}: FillBlankProps) {
  const placeholder = "__FILL_BLANK__";
  const blankCount = useMemo(
    () => Math.max((sentence.match(/\[\[blank\]\]/g)?.length ?? 0), 0),
    [sentence]
  );

  const [answers, setAnswers] = useState<string[]>(Array(blankCount).fill(""));
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    setAnswers(Array(blankCount).fill(""));
    setShowFeedback(false);
    setIsCorrect(false);
  }, [blankCount]);

  const normalize = (value: string) => value.trim().toLowerCase();

  const acceptedPerBlank = useMemo(() => {
    if (correctAnswersPerBlank && correctAnswersPerBlank.length === blankCount) {
      return correctAnswersPerBlank.map((answers) => answers.map(normalize));
    }

    if (blankCount === 1) {
      const accepted = correctAnswers?.length
        ? correctAnswers
        : correctAnswer
        ? [correctAnswer]
        : [];
      return [accepted.map(normalize)];
    }

    return Array.from({ length: blankCount }, () => [] as string[]);
  }, [blankCount, correctAnswer, correctAnswers, correctAnswersPerBlank]);

  const handleSubmit = () => {
    if (completed || showFeedback) return;
    if (answers.some((answer) => !answer.trim())) return;

    const correct = answers.every((answer, index) =>
      acceptedPerBlank[index].includes(normalize(answer)),
    );

    setIsCorrect(correct);
    setShowFeedback(true);
    onComplete(correct, correct ? points : 0);
  };

  const sentenceNodes = useMemo(() => {
    const html = renderMarkdown(sentence.replace(/\[\[blank\]\]/g, placeholder));
    return renderHtmlToReact(html, placeholder, (index) =>
      showFeedback || completed ? (
        <span
          key={`blank-${index}`}
          className={`px-2 py-0.5 rounded font-bold ${
            isCorrect
              ? "bg-green-500/20 text-green-800"
              : "bg-red-500/20 text-red-600"
          }`}
        >
          {answers[index] || acceptedPerBlank[index]?.[0] || ""}
        </span>
      ) : (
        <input
          key={`blank-${index}`}
          type="text"
          value={answers[index]}
          onChange={(e) => {
            const next = [...answers];
            next[index] = e.target.value;
            setAnswers(next);
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="escribe aquí..."
          className="w-32 px-3 py-1 rounded-lg bg-input border border-white/20 text-foreground text-center font-semibold focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          aria-label={`Completa el espacio en blanco ${index + 1}`}
        />
      )
    );
  }, [sentence, placeholder, showFeedback, completed, answers, acceptedPerBlank, isCorrect, handleSubmit]);

  const formatCorrectAnswers = () =>
    acceptedPerBlank.map((answers, index) =>
      `Espacio ${index + 1}: ${answers.join(" / ")}`,
    ).join(" • ");

  return (
    <div className="space-y-4">
      {question && (
        <h4 className="fluid-text-base font-semibold text-foreground mb-2">{question}</h4>
      )}
      <div className="fluid-text-sm text-foreground leading-relaxed whitespace-pre-line ">
        {sentenceNodes}
      </div>

      {!showFeedback && !completed && (
        <button
          onClick={handleSubmit}
          disabled={answers.some((answer) => !answer.trim())}
          className="w-full py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all focus-ring min-h-[44px]"
        >
          Verificar respuesta
        </button>
      )}

      {(showFeedback || completed) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl border text-sm leading-relaxed ${
            isCorrect ? "border-green-500/30 bg-green-500/10 text-green-800" : "border-red-500/30 bg-red-500/10 text-red-600"
          }`}>
          <div className="flex items-start gap-2">
            {isCorrect ? <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" /> : <XCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />}
            <div>
              <p>{isCorrect ? feedbackCorrect : feedbackWrong}</p>
              {!isCorrect && (
                <p className="mt-1 font-semibold">Respuesta correcta: {formatCorrectAnswers()}</p>
              )}
            </div>
          </div>
          {isCorrect && <p className="mt-2 font-semibold text-accent">+{points} puntos</p>}
        </motion.div>
      )}
    </div>
  );
}
