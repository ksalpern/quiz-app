"use client";

import type { Question } from "@/types/question";
import { useGameLogic } from "@/features/game-flow/hooks/useGameLogic";
import { useGameState } from "@/features/game-flow/hooks/useGameState";
import { getOptionLabel } from "@/utils/gameUtils";

import OptionButton from "@/components/ui/option-button/option-button";

import styles from "./game-content.module.css";

interface GameContentProps {
  question: Question;
  totalQuestions: number;
}

export default function GameContent({
  question,
  totalQuestions,
}: GameContentProps) {
  const { submitAnswer, nextQuestion, finishGame } = useGameLogic();
  const {
    selectedAnswers,
    setSelectedAnswers,
    showResult,
    setShowResult,
    isCorrect,
    setIsCorrect,
    getButtonState,
  } = useGameState(question);

  const handleAnswer = (option: string) => {
    if (selectedAnswers.includes(option)) {
      setSelectedAnswers(selectedAnswers.filter((answer) => answer !== option));
    } else {
      setSelectedAnswers([...selectedAnswers, option]);
    }
  };

  const submitAnswers = () => {
    if (selectedAnswers.length === 0) return;

    const correct = submitAnswer(question.id, selectedAnswers);
    setIsCorrect(correct);
    setShowResult(true);
  };

  const handleNext = () => {
    if (isCorrect) {
      nextQuestion(totalQuestions);
    } else {
      finishGame();
    }
    setSelectedAnswers([]);
    setShowResult(false);
  };

  return (
    <div className={styles.gameContent}>
      <h2>{question.question}</h2>

      <div className={styles.options}>
        {question.options.map((option, index) => (
          <OptionButton
            key={index}
            variant={getOptionLabel(index)}
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
