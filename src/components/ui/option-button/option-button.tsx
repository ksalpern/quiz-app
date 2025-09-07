import type { AnswerState } from "@/types/answer";

import styles from "./option-button.module.css";

interface OptionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: string;
  answer: string;
  state: AnswerState;
  className?: string;
}

export default function OptionButton({
  className,
  variant,
  answer,
  state,
  ...props
}: OptionButtonProps) {
  return (
    <button
      className={`${styles.optionButton} ${className} ${styles[state]}`}
      {...props}
    >
      <strong>{variant}</strong>
      <span>{answer}</span>
    </button>
  );
}
