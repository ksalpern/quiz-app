import React from "react";
import styles from "./option-button.module.css";

interface OptionButtonProps {
  variant: string;
  answer: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function OptionButton({
  className,
  variant,
  answer,
  onClick,
  disabled = false,
}: OptionButtonProps) {
  return (
    <button
      className={`${styles.optionButton} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <strong>{variant}</strong>
      <p>{answer}</p>
    </button>
  );
}
