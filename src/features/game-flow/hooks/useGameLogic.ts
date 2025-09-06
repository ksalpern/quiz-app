"use client";

import { useGameStore } from "@/app/stores/useGameStore";
import { questionService } from "../services/questionService";
import type { Answer } from "@/types/answer";
import { useRouter } from "next/navigation";

export const useGameLogic = () => {
  const router = useRouter();

  const {
    currentQuestion,
    answers,
    currentPrize,
    gameStatus,
    setCurrentQuestion,
    addAnswer,
    setCurrentPrize,
    setGameStatus,
  } = useGameStore();

  const startGame = () => {
    setGameStatus("playing");
    setCurrentQuestion(0);
    setCurrentPrize(0);
  };

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
      finishGame();
      return;
    }
    setCurrentQuestion(nextQuestionIndex);
  };

  const finishGame = () => {
    setGameStatus("finished");
    router.push("/result");
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
  };
};
