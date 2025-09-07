import { renderHook } from "@testing-library/react";
import { useGameState } from "../useGameState";
import { useGameStore } from "@/stores/useGameStore";
import { questionService } from "../../services/questionService";

jest.mock("../../../../stores/useGameStore");
jest.mock("../../services/questionService");

describe("useGameState", () => {
  const mockSetCurrentQuestion = jest.fn();
  const mockAddAnswer = jest.fn();
  const mockSetCurrentPrize = jest.fn();
  const mockSetGameStatus = jest.fn();
  const mockResetGame = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useGameStore as unknown as jest.Mock).mockReturnValue({
      currentQuestion: 0,
      answers: [],
      currentPrize: 0,
      gameStatus: "idle",
      setCurrentQuestion: mockSetCurrentQuestion,
      addAnswer: mockAddAnswer,
      setCurrentPrize: mockSetCurrentPrize,
      setGameStatus: mockSetGameStatus,
      resetGame: mockResetGame,
    });
  });

  it("should submit correct answer and update prize", () => {
    (questionService.checkAnswer as jest.Mock).mockReturnValue(true);
    (questionService.getPrizeForQuestion as jest.Mock).mockReturnValue(100);

    const { result } = renderHook(() => useGameState());

    const isCorrect = result.current.submitAnswer(1, ["A"]);

    expect(questionService.checkAnswer).toHaveBeenCalledWith(1, ["A"]);
    expect(mockAddAnswer).toHaveBeenCalled();
    expect(mockSetCurrentPrize).toHaveBeenCalledWith(100);
    expect(isCorrect).toBe(true);
  });

  it("should submit wrong answer without prize update", () => {
    (questionService.checkAnswer as jest.Mock).mockReturnValue(false);

    const { result } = renderHook(() => useGameState());

    const isCorrect = result.current.submitAnswer(1, ["B"]);

    expect(mockAddAnswer).toHaveBeenCalled();
    expect(mockSetCurrentPrize).not.toHaveBeenCalled();
    expect(isCorrect).toBe(false);
  });

  it("should move to next question", () => {
    const { result } = renderHook(() => useGameState());

    const gameContinues = result.current.nextQuestion(5);

    expect(mockSetCurrentQuestion).toHaveBeenCalledWith(1);
    expect(gameContinues).toBe(true);
  });

  it("should finish game when no more questions", () => {
    (useGameStore as unknown as jest.Mock).mockReturnValue({
      currentQuestion: 4,
      setCurrentQuestion: mockSetCurrentQuestion,
      setGameStatus: mockSetGameStatus,
      resetGame: mockResetGame,
    });

    const { result } = renderHook(() => useGameState());

    const gameContinues = result.current.nextQuestion(5);

    expect(mockSetGameStatus).toHaveBeenCalledWith("finished");
    expect(gameContinues).toBe(false);
  });

  it("should start game", () => {
    const { result } = renderHook(() => useGameState());

    result.current.startGame();

    expect(mockSetGameStatus).toHaveBeenCalledWith("playing");
    expect(mockSetCurrentQuestion).toHaveBeenCalledWith(0);
    expect(mockSetCurrentPrize).toHaveBeenCalledWith(0);
  });

  it("should reset game state", () => {
    const { result } = renderHook(() => useGameState());

    result.current.resetGameState();

    expect(mockResetGame).toHaveBeenCalled();
  });
});
