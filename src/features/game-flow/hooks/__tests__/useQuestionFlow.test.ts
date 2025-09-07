import { renderHook, act } from "@testing-library/react";
import { useQuestionFlow } from "../useQuestionFlow";
import { useGameState } from "../useGameState";
import { useGameNavigation } from "../useGameNavigation";
import { useAnswerSelection } from "../useAnswerSelection";
import { useTimer } from "../useTimer";

jest.mock("../useGameState");
jest.mock("../useGameNavigation");
jest.mock("../useAnswerSelection");
jest.mock("../useTimer");

describe("useQuestionFlow", () => {
  const mockQuestion = {
    id: 1,
    prize: 100,
    question: "Test?",
    options: ["A", "B"],
    correctAnswers: [0],
  };

  const mockSubmitAnswer = jest.fn();
  const mockNextQuestion = jest.fn();
  const mockNavigateToResult = jest.fn();
  const mockHandleAnswer = jest.fn();
  const mockGetButtonState = jest.fn();
  const mockSetAnswerStatesForQuestion = jest.fn();
  const mockResetSelection = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useGameState as jest.Mock).mockReturnValue({
      submitAnswer: mockSubmitAnswer,
      nextQuestion: mockNextQuestion,
    });

    (useGameNavigation as jest.Mock).mockReturnValue({
      navigateToResult: mockNavigateToResult,
    });

    (useAnswerSelection as jest.Mock).mockReturnValue({
      selectedAnswers: [],
      handleAnswer: mockHandleAnswer,
      getButtonState: mockGetButtonState,
      setAnswerStatesForQuestion: mockSetAnswerStatesForQuestion,
      resetSelection: mockResetSelection,
    });

    (useTimer as jest.Mock).mockReturnValue({
      progress: 50,
    });
  });

  it("should reset selection when question changes", () => {
    const { rerender } = renderHook(
      ({ question }) => useQuestionFlow(question, 5),
      { initialProps: { question: mockQuestion } },
    );

    const newQuestion = { ...mockQuestion, id: 2 };
    rerender({ question: newQuestion });

    expect(mockResetSelection).toHaveBeenCalled();
  });

  it("should handle answer selection", () => {
    const { result } = renderHook(() => useQuestionFlow(mockQuestion, 5));

    act(() => {
      result.current.handleAnswer("A");
    });

    expect(mockHandleAnswer).toHaveBeenCalledWith("A", false);
  });

  it("should get button state", () => {
    const { result } = renderHook(() => useQuestionFlow(mockQuestion, 5));

    result.current.getButtonState("A", 0);

    expect(mockGetButtonState).toHaveBeenCalledWith("A", 0, false, [0]);
  });

  it("should return progress from timer", () => {
    const { result } = renderHook(() => useQuestionFlow(mockQuestion, 5));

    expect(result.current.progress).toBe(50);
  });
});
