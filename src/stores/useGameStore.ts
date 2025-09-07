import type { Answer } from "@/types/answer";
import { create } from "zustand";

interface GameState {
  // UI state
  currentQuestion: number;
  loading: boolean;
  error: string | null;

  // Game progress
  answers: Answer[];
  currentPrize: number;
  gameStatus: "idle" | "playing" | "finished";

  // Actions
  setCurrentQuestion: (question: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addAnswer: (answer: Answer) => void;
  setCurrentPrize: (prize: number) => void;
  setGameStatus: (status: "idle" | "playing" | "finished") => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  currentQuestion: 0,
  loading: false,
  error: null,

  answers: [],
  currentPrize: 0,
  gameStatus: "idle",

  setCurrentQuestion: (question: number) => set({ currentQuestion: question }),
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
  addAnswer: (answer: Answer) =>
    set((state) => ({
      answers: [...state.answers, answer],
    })),
  setCurrentPrize: (prize: number) => set({ currentPrize: prize }),
  setGameStatus: (status: "idle" | "playing" | "finished") =>
    set({ gameStatus: status }),

  resetGame: () =>
    set({
      currentQuestion: 0,
      answers: [],
      currentPrize: 0,
      gameStatus: "idle",
      error: null,
    }),
}));
