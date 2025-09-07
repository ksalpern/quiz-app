"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useGameState } from "./useGameState";
import { useGameNavigation } from "./useGameNavigation";
import { useAnswerSelection } from "./useAnswerSelection";
import { useTimer } from "./useTimer";
import type { Question } from "@/types/question";
import { RESULT_SHOW_DURATION, TIMER_DURATION } from "@/utils/constants";

export const useQuestionFlow = (question: Question, totalQuestions: number) => {
  const { submitAnswer, nextQuestion } = useGameState();
  const { navigateToResult } = useGameNavigation();
  const {
    selectedAnswers,
    handleAnswer,
    getButtonState,
    setAnswerStatesForQuestion,
    resetSelection,
  } = useAnswerSelection();

  const [showResult, setShowResult] = useState(false);
  const selectedAnswersRef = useRef<string[]>([]);

  const autoSubmitAnswers = useCallback(() => {
    const currentAnswers = selectedAnswersRef.current;

    if (currentAnswers.length === 0) {
      navigateToResult();
      return;
    }

    const correct = submitAnswer(question.id, currentAnswers);
    setShowResult(true);

    setAnswerStatesForQuestion(
      question.options,
      currentAnswers,
      question.correctAnswers,
    );

    setTimeout(() => {
      if (correct) {
        const gameContinues = nextQuestion(totalQuestions);
        if (!gameContinues) {
          navigateToResult();
        }
      } else {
        navigateToResult();
      }
    }, RESULT_SHOW_DURATION);
  }, [
    question,
    totalQuestions,
    submitAnswer,
    nextQuestion,
    navigateToResult,
    setAnswerStatesForQuestion,
  ]);

  const { progress } = useTimer({
    duration: TIMER_DURATION,
    onComplete: autoSubmitAnswers,
    questionId: question.id,
  });

  useEffect(() => {
    resetSelection();
    setShowResult(false);
    selectedAnswersRef.current = [];
  }, [question.id, resetSelection]);

  useEffect(() => {
    selectedAnswersRef.current = selectedAnswers;
  }, [selectedAnswers]);

  const handleAnswerSelection = useCallback(
    (option: string) => {
      handleAnswer(option, showResult);
    },
    [handleAnswer, showResult],
  );

  const getButtonStateForOption = useCallback(
    (option: string, index: number) => {
      return getButtonState(option, index, showResult, question.correctAnswers);
    },
    [getButtonState, showResult, question.correctAnswers],
  );

  return {
    selectedAnswers,
    showResult,
    handleAnswer: handleAnswerSelection,
    getButtonState: getButtonStateForOption,
    progress,
  };
};
