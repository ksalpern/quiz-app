import { renderHook } from "@testing-library/react";
import { useGameData } from "../useGameData";
import { questionService } from "../../services/questionService";

jest.mock("../../services/questionService");

describe("useGameData", () => {
  const mockQuestions = [
    {
      id: 1,
      prize: 100,
      question: "Test?",
      options: ["A", "B"],
      correctAnswers: [0],
    },
  ];
  const mockSteps = [{ id: 1, prize: 100 }];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should load data successfully", () => {
    (questionService.getQuestions as jest.Mock).mockReturnValue(mockQuestions);
    (questionService.getSteps as jest.Mock).mockReturnValue(mockSteps);

    const { result } = renderHook(() => useGameData());

    expect(result.current.questions).toEqual(mockQuestions);
    expect(result.current.steps).toEqual(mockSteps);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it("should handle loading state", () => {
    (questionService.getQuestions as jest.Mock).mockReturnValue(mockQuestions);
    (questionService.getSteps as jest.Mock).mockReturnValue(mockSteps);

    const { result } = renderHook(() => useGameData());

    expect(result.current.loading).toBe(false);
  });

  it("should handle service errors", () => {
    (questionService.getQuestions as jest.Mock).mockImplementation(() => {
      throw new Error("Service error");
    });
    (questionService.getSteps as jest.Mock).mockImplementation(() => {
      throw new Error("Service error");
    });

    const { result } = renderHook(() => useGameData());

    expect(result.current.questions).toEqual([]);
    expect(result.current.steps).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(
      "The error occured while loading game data. Please check the configuration.",
    );
  });

  it("should call service methods on mount", () => {
    (questionService.getQuestions as jest.Mock).mockReturnValue(mockQuestions);
    (questionService.getSteps as jest.Mock).mockReturnValue(mockSteps);

    renderHook(() => useGameData());

    expect(questionService.getQuestions).toHaveBeenCalledTimes(1);
    expect(questionService.getSteps).toHaveBeenCalledTimes(1);
  });
});
