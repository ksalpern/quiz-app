"use client";

import { useRouter } from "next/navigation";
import { useGameState } from "./useGameState";

export const useGameNavigation = () => {
  const router = useRouter();
  const { startGame, finishGame, resetGameState } = useGameState();

  const navigateToGame = () => {
    startGame();
    router.push("/game");
  };

  const navigateToResult = () => {
    finishGame();
    router.push("/result");
  };

  const navigateToStart = () => {
    router.push("/");
    resetGameState();
  };

  return {
    navigateToGame,
    navigateToResult,
    navigateToStart,
  };
};
