import React from "react";
import styles from "./option-button.module.css";

interface OptionButtonProps {
  variant: string;
  answer: string;
  state: "correct" | "wrong" | "selected" | "";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function OptionButton({
  className,
  variant,
  answer,
  state,
  onClick,
  disabled = false,
}: OptionButtonProps) {
  return (
    <button
      className={`${styles.optionButton} ${className} ${styles[state]}`}
      onClick={onClick}
      disabled={disabled}
    >
      <strong>{variant}</strong>
      <span>{answer}</span>
    </button>
  );
}
