import type { StepState } from "@/types/step";

import styles from "./step.module.css";

interface StepProps {
  children: React.ReactNode;
  className?: string;
  state: StepState;
}

export default function Step({ children, className, state }: StepProps) {
  return (
    <div className={`${styles.step} ${className || ""} ${styles[state]}`}>
      {children}
    </div>
  );
}
