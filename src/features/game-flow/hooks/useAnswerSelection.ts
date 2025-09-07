"use client";

import { useState, useCallback } from "react";
import type { AnswerState } from "@/types/answer";

export const useAnswerSelection = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [answerStates, setAnswerStates] = useState<Record<string, AnswerState>>(
    {},
  );

  const handleAnswer = useCallback((option: string, showResult: boolean) => {
    if (showResult) return;

    setSelectedAnswers((prev) => {
      if (prev.includes(option)) {
        return prev.filter((answer) => answer !== option);
      } else {
        return [...prev, option];
      }
    });
  }, []);

  const getButtonState = useCallback(
    (
      option: string,
      index: number,
      showResult: boolean,
      correctAnswers: number[],
    ) => {
      if (!showResult) {
        return selectedAnswers.includes(option) ? "selected" : "";
      }

      if (answerStates[option]) {
        return answerStates[option];
      }

      if (correctAnswers.includes(index)) {
        return "correct";
      }

      return "";
    },
    [selectedAnswers, answerStates],
  );

  const setAnswerStatesForQuestion = useCallback(
    (
      questionOptions: string[],
      selectedAnswers: string[],
      correctAnswers: number[],
    ) => {
      const newStates: Record<string, AnswerState> = {};
      questionOptions.forEach((option, index) => {
        if (selectedAnswers.includes(option)) {
          newStates[option] = correctAnswers.includes(index)
            ? "correct"
            : "wrong";
        }
      });
      setAnswerStates(newStates);
    },
    [],
  );

  const resetSelection = useCallback(() => {
    setSelectedAnswers([]);
    setAnswerStates({});
  }, []);

  return {
    selectedAnswers,
    answerStates,
    handleAnswer,
    getButtonState,
    setAnswerStatesForQuestion,
    resetSelection,
  };
};
