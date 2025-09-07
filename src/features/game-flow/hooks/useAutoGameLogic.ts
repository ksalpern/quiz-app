"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useGameLogic } from "./useGameLogic";
import { useTimer } from "./useTimer";
import type { Question } from "@/types/question";
import { RESULT_SHOW_DURATION, TIMER_DURATION } from "@/utils/constants";
import type { AnswerState } from "@/types/answer";

export const useAutoGameLogic = (
  question: Question,
  totalQuestions: number,
) => {
  const { submitAnswer, nextQuestion, finishGame } = useGameLogic();

  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [answerStates, setAnswerStates] = useState<Record<string, AnswerState>>(
    {},
  );
  const selectedAnswersRef = useRef<string[]>([]);

  const autoSubmitAnswers = useCallback(() => {
    const currentAnswers = selectedAnswersRef.current;

    if (currentAnswers.length === 0) {
      finishGame();
      return;
    }

    const correct = submitAnswer(question.id, currentAnswers);
    setShowResult(true);

    const newStates: Record<string, AnswerState> = {};
    question.options.forEach((option, index) => {
      if (currentAnswers.includes(option)) {
        newStates[option] = question.correctAnswers.includes(index)
          ? "correct"
          : "wrong";
      }
    });
    setAnswerStates(newStates);

    setTimeout(() => {
      if (correct) {
        if (question.id < totalQuestions) {
          nextQuestion(totalQuestions);
        } else {
          finishGame();
        }
      } else {
        finishGame();
      }
    }, RESULT_SHOW_DURATION);
  }, [question, totalQuestions, submitAnswer, nextQuestion, finishGame]);

  const { progress } = useTimer({
    duration: TIMER_DURATION,
    onComplete: autoSubmitAnswers,
    questionId: question.id,
  });

  useEffect(() => {
    setSelectedAnswers([]);
    setShowResult(false);
    setAnswerStates({});
    selectedAnswersRef.current = [];
  }, [question.id]);

  const handleAnswer = useCallback(
    (option: string) => {
      if (showResult) return;

      setSelectedAnswers((prev) => {
        let newAnswers;
        if (prev.includes(option)) {
          newAnswers = prev.filter((answer) => answer !== option);
        } else {
          newAnswers = [...prev, option];
        }
        selectedAnswersRef.current = newAnswers;
        return newAnswers;
      });
    },
    [showResult],
  );

  const getButtonState = useCallback(
    (option: string, index: number) => {
      if (!showResult) {
        return selectedAnswers.includes(option) ? "selected" : "";
      }

      if (answerStates[option]) {
        return answerStates[option];
      }

      if (question.correctAnswers.includes(index)) {
        return "correct";
      }

      return "";
    },
    [showResult, selectedAnswers, answerStates, question.correctAnswers],
  );

  return {
    selectedAnswers,
    showResult,
    handleAnswer,
    autoSubmitAnswers,
    getButtonState,
    progress,
  };
};
