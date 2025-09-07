"use client";

import type { Question } from "@/types/question";
import { useQuestionFlow } from "@/features/game-flow/hooks/useQuestionFlow";
import { getOptionLabel } from "@/utils/gameUtils";

import OptionButton from "@/components/ui/option-button/option-button";
import ProgressBar from "@/components/ui/progress-bar/progress-bar";

import styles from "./game-content.module.css";

interface GameContentProps {
  question: Question;
  totalQuestions: number;
}

export default function GameContent({
  question,
  totalQuestions,
}: GameContentProps) {
  const { showResult, handleAnswer, getButtonState, progress } =
    useQuestionFlow(question, totalQuestions);

  return (
    <>
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
        </div>
      </div>

      <ProgressBar progress={progress} />
    </>
  );
}
