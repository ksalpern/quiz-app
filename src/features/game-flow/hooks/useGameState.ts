"use client";

import { useGameStore } from "@/stores/useGameStore";
import { questionService } from "../services/questionService";
import type { Answer } from "@/types/answer";

export const useGameState = () => {
  const {
    currentQuestion,
    answers,
    currentPrize,
    gameStatus,
    setCurrentQuestion,
    addAnswer,
    setCurrentPrize,
    setGameStatus,
    resetGame,
  } = useGameStore();

  const submitAnswer = (questionId: number, selectedOptions: string[]) => {
    const isCorrect = questionService.checkAnswer(questionId, selectedOptions);

    const answer: Answer = {
      questionId,
      selectedOptions,
      isCorrect,
      timestamp: Date.now(),
    };

    addAnswer(answer);

    if (isCorrect) {
      const prize = questionService.getPrizeForQuestion(currentQuestion);
      setCurrentPrize(prize);
    }

    return isCorrect;
  };

  const nextQuestion = (totalQuestions: number) => {
    const nextQuestionIndex = currentQuestion + 1;

    if (nextQuestionIndex >= totalQuestions) {
      setGameStatus("finished");
      return false;
    }
    setCurrentQuestion(nextQuestionIndex);
    return true;
  };

  const startGame = () => {
    setGameStatus("playing");
    setCurrentQuestion(0);
    setCurrentPrize(0);
  };

  const finishGame = () => {
    setGameStatus("finished");
  };

  const resetGameState = () => {
    resetGame();
  };

  return {
    currentQuestion,
    answers,
    currentPrize,
    gameStatus,

    startGame,
    submitAnswer,
    nextQuestion,
    finishGame,
    resetGameState,
  };
};
