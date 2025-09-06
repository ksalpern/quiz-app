"use client";

import { useState } from "react";

import type { Question } from "@/types/question";
import OptionButton from "@/components/ui/option-button/option-button";

import styles from "./game-content.module.css";

interface GameContentProps {
  question: Question;
  totalQuestions: number;
  onAnswer: (questionId: number, selectedOptions: string[]) => boolean;
  onNext: (totalQuestions: number) => void;
  onFinish: () => void;
}

export default function GameContent({
  question,
  totalQuestions,
  onAnswer,
  onNext,
  onFinish,
}: GameContentProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswer = (option: string) => {
    if (selectedAnswers.includes(option)) {
      setSelectedAnswers(selectedAnswers.filter((answer) => answer !== option));
    } else {
      setSelectedAnswers([...selectedAnswers, option]);
    }
  };

  const submitAnswers = () => {
    if (selectedAnswers.length === 0) return;

    const correct = onAnswer(question.id, selectedAnswers);
    setIsCorrect(correct);
    setShowResult(true);
  };

  const handleNext = () => {
    if (isCorrect) {
      onNext(totalQuestions);
    } else {
      onFinish();
    }
    setSelectedAnswers([]);
    setShowResult(false);
  };

  const getVariant = (index: number) => {
    const variants = ["A", "B", "C", "D", "E"];
    return variants[index] || "A";
  };

  const getButtonState = (option: string, index: number) => {
    if (!showResult) {
      return selectedAnswers.includes(option) ? "selected" : "";
    }

    const isSelected = selectedAnswers.includes(option);
    if (!isSelected) {
      return "";
    }

    const isCorrectAnswer = question.correctAnswers.includes(index);
    return isCorrectAnswer ? "correct" : "wrong";
  };

  return (
    <div className={styles.gameContent}>
      <h2>{question.question}</h2>

      <div className={styles.options}>
        {question.options.map((option, index) => (
          <OptionButton
            key={index}
            variant={getVariant(index)}
            answer={option}
            state={getButtonState(option, index)}
            onClick={() => handleAnswer(option)}
            disabled={showResult}
          />
        ))}

        {selectedAnswers.length > 0 && !showResult && (
          <button onClick={submitAnswers} className={styles.submitButton}>
            Submit Answer{selectedAnswers.length > 1 ? "s" : ""}
          </button>
        )}
      </div>

      {showResult && (
        <div className={styles.result}>
          <p className={isCorrect ? styles.correct : styles.incorrect}>
            {isCorrect ? "✅ Correct!" : "❌ Wrong!"}
          </p>
          <button onClick={handleNext} className={styles.nextButton}>
            {isCorrect ? "Next question" : "Finish game"}
          </button>
        </div>
      )}
    </div>
  );
}
