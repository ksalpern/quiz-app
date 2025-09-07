"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface UseTimerProps {
  duration: number; // milliseconds
  onComplete: () => void;
  questionId: number; // for resetting when question changes
}

export const useTimer = ({
  duration,
  onComplete,
  questionId,
}: UseTimerProps) => {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const isCompletedRef = useRef<boolean>(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const startTimer = useCallback(() => {
    setProgress(0);
    isCompletedRef.current = false;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    startTimeRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      if (isCompletedRef.current) return;

      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.min((elapsed / duration) * 100, 100);

      setProgress(newProgress);

      if (newProgress >= 100) {
        isCompletedRef.current = true;
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        onCompleteRef.current();
      }
    }, 16); // ~60fps
  }, [duration]);

  useEffect(() => {
    startTimer();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startTimer, questionId]);

  return { progress };
};
