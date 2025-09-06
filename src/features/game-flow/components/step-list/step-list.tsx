import Step from "@/components/ui/step/step";
import { formatPrize } from "@/utils/formatPrize";
import type { Step as StepType } from "@/types/step";
import styles from "./step-list.module.css";

interface StepListProps {
  steps: StepType[];
  currentStep: number;
  isOpenMenu: boolean;
}

export default function StepList({
  steps,
  currentStep,
  isOpenMenu,
}: StepListProps) {
  const reversedSteps = [...steps].reverse();

  const getStepState = (
    originalIndex: number,
  ): "inactive" | "current" | "finished" => {
    const reversedIndex = steps.length - 1 - originalIndex;

    if (reversedIndex < currentStep) return "finished";
    if (reversedIndex === currentStep) return "current";
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
