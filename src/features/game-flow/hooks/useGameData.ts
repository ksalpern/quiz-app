"use client";

import { useState, useEffect } from "react";
import { questionService } from "../services/questionService";
import type { Question } from "@/types/question";
import type { Step } from "@/types/step";

export const useGameData = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = () => {
      try {
        setLoading(true);

        const questionsData = questionService.getQuestions();
        const stepsData = questionService.getSteps();

        setQuestions(questionsData);
        setSteps(stepsData);
        setError(null);
      } catch (err) {
        console.error("Game data loading error:", error);
        setError(
          "The error occured while loading game data. Please check the configuration.",
        );

        setQuestions([]);
        setSteps([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return {
    questions,
    steps,
    loading,
    error,
  };
};
