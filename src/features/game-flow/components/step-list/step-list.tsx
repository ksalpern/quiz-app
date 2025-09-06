"use client";

import { useGameData } from "@/features/game-flow/hooks/useGameData";
import { useGameLogic } from "@/features/game-flow/hooks/useGameLogic";
import { formatPrize } from "@/utils/formatPrize";

import Step from "@/components/ui/step/step";

import styles from "./step-list.module.css";

interface StepListProps {
  isOpenMenu: boolean;
}

export default function StepList({ isOpenMenu }: StepListProps) {
  const { steps } = useGameData();
  const { currentQuestion } = useGameLogic();

  const reversedSteps = [...steps].reverse();

  const getStepState = (
    originalIndex: number,
  ): "inactive" | "current" | "finished" => {
    const reversedIndex = steps.length - 1 - originalIndex;

    if (reversedIndex < currentQuestion) return "finished";
    if (reversedIndex === currentQuestion) return "current";
    return "inactive";
  };

  return (
    <div className={`${styles.wrapper} ${isOpenMenu && styles.open}`}>
      <div className={styles.list}>
        {reversedSteps.map((step, index) => (
          <Step key={step.id} state={getStepState(index)}>
            {formatPrize(step.prize)}
          </Step>
        ))}
      </div>
    </div>
  );
}
