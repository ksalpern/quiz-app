import { renderHook, act } from "@testing-library/react";
import { useTimer } from "@/features/game-flow/hooks/useTimer";

jest.useFakeTimers();

describe("useTimer", () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  it("should start with 0 progress and complete after duration", () => {
    const mockOnComplete = jest.fn();

    const { result } = renderHook(() =>
      useTimer({
        duration: 1000,
        onComplete: mockOnComplete,
        questionId: 1,
      }),
    );

    expect(result.current.progress).toBe(0);

    act(() => {
      jest.advanceTimersByTime(1000);
      jest.runOnlyPendingTimers();
    });

    expect(result.current.progress).toBeGreaterThanOrEqual(99);
    expect(mockOnComplete).toHaveBeenCalledTimes(1);
  });

  it("should reset when questionId changes", () => {
    const mockOnComplete = jest.fn();

    const { result, rerender } = renderHook(
      ({ questionId }) =>
        useTimer({
          duration: 1000,
          onComplete: mockOnComplete,
          questionId,
        }),
      { initialProps: { questionId: 1 } },
    );

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current.progress).toBeGreaterThan(40);
    expect(result.current.progress).toBeLessThan(60);

    rerender({ questionId: 2 });

    expect(result.current.progress).toBe(0);
  });

  it("should clean up on unmount", () => {
    const clearIntervalSpy = jest.spyOn(global, "clearInterval");

    const { unmount } = renderHook(() =>
      useTimer({
        duration: 1000,
        onComplete: jest.fn(),
        questionId: 1,
      }),
    );

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();

    clearIntervalSpy.mockRestore();
  });
});
