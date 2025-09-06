"use client";

import { useState } from "react";

import type { Question } from "@/types/question";

export const useGameState = (question: Question) => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const getButtonState = (option: string, index: number) => {
    if (!showResult) {
      return selectedAnswers.includes(option) ? "selected" : "";
    }
    const isSelected = selectedAnswers.includes(option);
    if (!isSelected) return "";
    return question.correctAnswers.includes(index) ? "correct" : "wrong";
  };

  return {
    selectedAnswers,
    setSelectedAnswers,
    showResult,
    setShowResult,
    isCorrect,
    setIsCorrect,
    getButtonState,
  };
};
