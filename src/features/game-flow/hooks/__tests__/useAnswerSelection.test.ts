import { renderHook, act } from "@testing-library/react";
import { useAnswerSelection } from "@/features/game-flow/hooks/useAnswerSelection";

describe("useAnswerSelection", () => {
  it("should select and deselect answers", () => {
    const { result } = renderHook(() => useAnswerSelection());

    act(() => {
      result.current.handleAnswer("option1", false);
    });

    expect(result.current.selectedAnswers).toEqual(["option1"]);

    act(() => {
      result.current.handleAnswer("option1", false);
    });

    expect(result.current.selectedAnswers).toEqual([]);
  });

  it("should not select when showResult is true", () => {
    const { result } = renderHook(() => useAnswerSelection());

    act(() => {
      result.current.handleAnswer("option1", true);
    });

    expect(result.current.selectedAnswers).toEqual([]);
  });

  it("should return correct button states", () => {
    const { result } = renderHook(() => useAnswerSelection());

    act(() => {
      result.current.handleAnswer("option1", false);
    });

    const state = result.current.getButtonState("option1", 0, false, [0]);
    expect(state).toBe("selected");
  });

  it("should set answer states for question", () => {
    const { result } = renderHook(() => useAnswerSelection());

    act(() => {
      result.current.setAnswerStatesForQuestion(
        ["option1", "option2"],
        ["option1"],
        [0],
      );
    });

    expect(result.current.answerStates).toEqual({
      option1: "correct",
    });
  });

  it("should reset selection", () => {
    const { result } = renderHook(() => useAnswerSelection());

    act(() => {
      result.current.handleAnswer("option1", false);
      result.current.setAnswerStatesForQuestion(["option1"], ["option1"], [0]);
    });

    act(() => {
      result.current.resetSelection();
    });

    expect(result.current.selectedAnswers).toEqual([]);
    expect(result.current.answerStates).toEqual({});
  });
});
